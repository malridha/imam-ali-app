// deno-lint-ignore-file no-explicit-any
// Edge Function: /functions/v1/chat
//
// Pipeline (in this order):
//   0. SAFETY GUARDIAN — scan the user message for crisis signals. If
//      detected, short-circuit: return a hardcoded compassionate message and
//      regional crisis resources. Claude is NOT called.
//   1. RETRIEVER — (optional) pull top-k authenticated teachings from the
//      corpus using gte-small + pgvector cosine similarity.
//   2. AUGMENT — inject retrieved teachings into the system prompt.
//   3. CLAUDE — generate the reply.
//   4. VERIFIER — strip any VERSE::: block whose Arabic doesn't match the
//      corpus at ≥ 0.90 similarity; snap the source label to canonical.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'
import { updateTSP, type TSP } from './tsp.ts'
import { SYSTEM_PROMPTS, isMode, type Mode } from '../_shared/prompts.ts'

const ANTHROPIC_ENDPOINT = 'https://api.anthropic.com/v1/messages'
const ANTHROPIC_VERSION = '2023-06-01'
// v49 — chat model is runtime-configurable via the CHAT_MODEL secret.
// Default is Sonnet, whose large context fits the full baseline-corpus
// system prompt (~203K tokens). Haiku (200K limit) only works once that
// prompt is trimmed — set CHAT_MODEL=claude-haiku-4-5 after trimming.
const CHAT_MODEL =
  // @ts-expect-error Deno global in Edge Functions
  (typeof Deno !== 'undefined' && Deno.env.get('CHAT_MODEL')) ||
  'claude-sonnet-4-6'

const RETRIEVAL_THRESHOLD = 0.5
const RETRIEVAL_LIMIT = 5
const ATTRIBUTION_THRESHOLD = 0.9

// @ts-expect-error — `Supabase` is a runtime-only global in Edge Functions
const embedder = new Supabase.ai.Session('gte-small')

type Lang = 'en' | 'ar'

type ClaudeMessage = {
  role: 'user' | 'assistant'
  content: string
}

type RequestBody = {
  /** v50 (B1): the server owns the system prompt; the client selects one by mode. */
  mode?: Mode
  messages: ClaudeMessage[]
  lang?: Lang
  user_id?: string
  retrieval_query?: string
  max_tokens?: number
  temperature?: number
  /** v49 — when true, proxy Anthropic's token stream straight to the client. */
  stream?: boolean
}

type Match = {
  arabic: string
  english: string
  source: string
  domain: string | null
  context: string | null
  plain_bridge: string | null
  similarity: number
}

type VerificationRecord = {
  arabic_snippet: string
  best_similarity: number
  verified: boolean
  matched_source?: string
}

type CrisisResource = {
  name: string
  number?: string
  url?: string
  note?: string
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  })
}

// ─── Safety Guardian (Agent 4) ─────────────────────────────────────────────
//
// NOTE TO REVIEWERS: the message text and helpline list below are PLACEHOLDERS
// for the testing stage. Per the product brief, all crisis copy and the
// resource list must be reviewed by a UAE-registered mental-health
// professional before any public release. See Section 15.B of the brief.

// English and Arabic crisis signal patterns. Lowercase matching for English;
// raw matching for Arabic. Conservative — favours false-positives over
// missing a real crisis.
const CRISIS_PATTERNS_EN = [
  /\bkill (?:myself|me)\b/i,
  /\bend (?:my|this) life\b/i,
  /\b(?:want(?:ing)?|going) to die\b/i,
  /\bsuicid(?:e|al)\b/i,
  /\b(?:hurt|harm)(?:ing)? myself\b/i,
  /\bself[- ]?harm\b/i,
  /\bcut(?:ting)? myself\b/i,
  /\bno (?:reason|point) (?:to|in) (?:liv|going on)/i,
  /\bcan(?:'|no)t (?:go on|keep going|do this anymore)\b/i,
  /\bgive up on life\b/i,
]

const CRISIS_PATTERNS_AR = [
  /انتحار/,
  /أنهي حياتي/,
  /اقتل نفسي/,
  /أقتل نفسي/,
  /أنهي\s*كل\s*شي/,
  /إيذاء\s*نفسي/,
  /أؤذي نفسي/,
  /لا\s*أريد\s*أن\s*أعيش/,
  /ما\s*في\s*أمل/,
]

function detectCrisis(text: string): boolean {
  if (!text) return false
  for (const re of CRISIS_PATTERNS_EN) if (re.test(text)) return true
  for (const re of CRISIS_PATTERNS_AR) if (re.test(text)) return true
  return false
}

const CRISIS_TEXT: Record<Lang, string> = {
  en: `What you have just shared matters too much to pass over. I hear how heavy this is, and you do not have to carry it alone. Please reach out to a person who is trained to be with you right now — someone whose only job at this moment is to listen.

Below are lines you can call or text. They are free, confidential, and open every hour of every day.

You are not alone tonight.`,
  ar: `ما قُلتَه الآن لا يمكن أن يُمرّ عليه مرور الكرام. أسمعك، وأشعر بثقل ما تحمله. لستَ مضطراً أن تحمل هذا وحدك. أرجو أن تتواصل الآن مع شخص مُدرَّب ليكون معك — شخص مهمته الوحيدة في هذه اللحظة أن يُصغي إليك.

في الأسفل أرقام تستطيع الاتصال بها أو الكتابة إليها. كلها مجانية، سرية، ومتاحة في كل ساعة من ساعات اليوم.

لستَ وحدك الليلة.`,
}

const CRISIS_RESOURCES: CrisisResource[] = [
  { name: 'UAE · National Crisis Line', number: '800-HOPE (4673)' },
  { name: 'Saudi Arabia · Mental Health Helpline', number: '920033360' },
  { name: 'United Kingdom · Samaritans', number: '116 123', note: '24/7, free' },
  { name: 'Egypt · Mental Health Line', number: '08008880700' },
  { name: 'Pakistan · Umang Helpline', number: '0311-7786264' },
  {
    name: 'Worldwide · Befrienders',
    url: 'https://www.befrienders.org',
    note: 'Find a helpline in your country',
  },
]

// ─── Memory Agent (Agent 5) ────────────────────────────────────────────────

type SessionSummary = {
  path: string
  summary: string
  themes: string[] | null
  domain: string | null
  ended_at: string
}

async function fetchRecentSummaries(
  userId: string,
  limit = 3,
): Promise<SessionSummary[]> {
  const sb = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )
  const { data, error } = await sb
    .from('session_summaries')
    .select('path, summary, themes, domain, ended_at')
    .eq('user_id', userId)
    .order('ended_at', { ascending: false })
    .limit(limit)
  if (error) {
    console.error('session_summaries fetch failed:', error)
    return []
  }
  return (data ?? []) as SessionSummary[]
}

function formatMemoryBlock(summaries: SessionSummary[], lang: Lang): string {
  if (summaries.length === 0) return ''

  const lines = summaries
    .map((s, i) => {
      const when = new Date(s.ended_at).toISOString().slice(0, 10)
      const themes = s.themes && s.themes.length ? ` · themes: ${s.themes.join(', ')}` : ''
      const domain = s.domain ? ` · domain: ${s.domain}` : ''
      return `[${i + 1}] ${when} · path: ${s.path}${domain}${themes}
    ${s.summary}`
    })
    .join('\n\n')

  if (lang === 'ar') {
    return `

=== ذاكرة المحادثات السابقة ===
هذا المستخدم تحدّث معك من قبل. فيما يلي ملخصات لآخر ${summaries.length} جلسات بترتيب زمني عكسي (الأحدث أولاً). استخدم هذه الذاكرة بحكمة:
- إذا كانت هذه أول جلسة لهم اليوم بعد فترة، يمكنك الإشارة إلى ذلك بلطف ("لقد عُدتَ — أهلاً بك").
- لا تُكرّر التعليم نفسه الذي قُدِّم سابقاً، ولا تَفترض أنّهم في نفس الحالة العاطفية.
- إذا تكرّر الموضوع نفسه عبر الجلسات، يمكنك تسميته بلطف.
- لا تذكر هذه الذاكرة بشكل مباشر إلا إذا كان طبيعياً.

${lines}
=== نهاية الذاكرة ===`
  }

  return `

=== PRIOR SESSION MEMORY ===
This user has spoken with you before. Below are summaries of their last ${summaries.length} session(s), most recent first. Use this memory with care:
- If this seems to be their first session after a gap, you may gently note it ("you came back — I am glad").
- Do not repeat a teaching you already gave them, and do not assume they are in the same emotional state.
- If a theme keeps returning across sessions, you may name it gently.
- Do not mention this memory directly unless it feels natural to do so.

${lines}
=== END MEMORY ===`
}

// ─── Retrieval (Agent 1) ───────────────────────────────────────────────────

async function retrieveTeachings(query: string): Promise<Match[]> {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )
  const embedding = (await embedder.run(query, {
    mean_pool: true,
    normalize: true,
  })) as number[]

  const { data, error } = await supabase.rpc('match_teachings', {
    query_embedding: embedding,
    match_threshold: RETRIEVAL_THRESHOLD,
    match_count: RETRIEVAL_LIMIT,
  })
  if (error) {
    console.error('match_teachings failed:', error)
    return []
  }
  return (data ?? []).map((row: any) => ({
    arabic: row.arabic,
    english: row.english,
    source: row.source,
    domain: row.domain,
    context: row.context ?? null,
    plain_bridge: row.plain_bridge ?? null,
    similarity: Number(row.similarity),
  }))
}

function buildRetrievalBlock(matches: Match[]): string {
  if (matches.length === 0) return ''

  // Context Explainer (Agent 3): each retrieved teaching carries its
  // historical context and plain-language bridge so the companion frames
  // the wisdom living rather than decorative.
  const blocks = matches
    .map((m, i) => {
      const lines = [
        `[${i + 1}] Arabic: ${m.arabic}`,
        `    English: ${m.english}`,
        `    Source: ${m.source}${m.domain ? ` · Domain: ${m.domain}` : ''}`,
      ]
      if (m.context) lines.push(`    Context: ${m.context}`)
      if (m.plain_bridge) lines.push(`    Bridge: ${m.plain_bridge}`)
      return lines.join('\n')
    })
    .join('\n\n')

  return `=== RETRIEVED AUTHENTICATED TEACHINGS ===
The following verified teachings from the authenticated corpus are most relevant to the user's current message. You may ONLY use these when citing Arabic from Imam Ali (عليه السلام) using the VERSE::: format. The Arabic in your VERSE::: block MUST match one of these EXACTLY. If none truly fits the situation, do NOT invent or paraphrase a source — instead introduce the wisdom with "In the spirit of his wisdom:" and omit the VERSE::: block entirely.

When you do cite a teaching, you MAY draw on its "Context" (when/why it was said) and its "Bridge" (modern, plain-language explanation) to frame the wisdom living rather than decorative — but never copy that text verbatim. Rewrite it for this user, in their words, for their situation.

${blocks}
=== END RETRIEVED TEACHINGS ===`
}

// ─── Verification (Agent 2) ────────────────────────────────────────────────

function normalizeArabic(s: string): string {
  return s
    .replace(/[ً-ٰٟ]/g, '') // tashkeel
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/\s+/g, ' ')
    .trim()
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length

  let prev = new Array<number>(b.length + 1)
  let curr = new Array<number>(b.length + 1)
  for (let j = 0; j <= b.length; j++) prev[j] = j

  for (let i = 1; i <= a.length; i++) {
    curr[0] = i
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost)
    }
    ;[prev, curr] = [curr, prev]
  }
  return prev[b.length]
}

function arabicSimilarity(a: string, b: string): number {
  const na = normalizeArabic(a)
  const nb = normalizeArabic(b)
  const max = Math.max(na.length, nb.length)
  if (max === 0) return 1
  return 1 - levenshtein(na, nb) / max
}

function verifyAndStrip(
  text: string,
  matches: Match[],
): { text: string; verifications: VerificationRecord[] } {
  const records: VerificationRecord[] = []
  if (matches.length === 0) return { text, verifications: records }

  const VERSE_RE = /VERSE:::([^\n]+?):::([^\n]+?):::([^\n]+)/g

  const cleaned = text.replace(
    VERSE_RE,
    (_full, arabicRaw: string, englishRaw: string, sourceRaw: string) => {
      const arabic = arabicRaw.trim()
      let best = { sim: 0, source: undefined as string | undefined }
      for (const m of matches) {
        const sim = arabicSimilarity(arabic, m.arabic)
        if (sim > best.sim) best = { sim, source: m.source }
      }
      const verified = best.sim >= ATTRIBUTION_THRESHOLD
      records.push({
        arabic_snippet: arabic.slice(0, 50),
        best_similarity: Number(best.sim.toFixed(3)),
        verified,
        matched_source: best.source,
      })
      if (!verified) return ''
      const canonicalSource = best.source ?? sourceRaw.trim()
      return `VERSE:::${arabic}:::${englishRaw.trim()}:::${canonicalSource}`
    },
  )

  return { text: cleaned, verifications: records }
}

// ── Abuse rate limiting (NOT a usage cap) ───────────────────────────────
// Thresholds are set far above any real human's pace; the goal is only to
// stop a script that extracted the public anon key from draining the Claude
// bill. FAILS OPEN: any error (incl. the rate_limits table not existing yet)
// allows the request, so real users are never wrongly blocked. When auth +
// paid tiers exist, exempt paying users by returning false before the checks.
async function rlHit(sb: ReturnType<typeof createClient>, bucket: string, max: number, win: number): Promise<boolean> {
  const { data, error } = await sb.rpc('rate_limit_hit', { p_bucket: bucket, p_max: max, p_window_seconds: win })
  if (error) return true // fail-open: treat as allowed if the limiter isn't available
  return data === true
}
async function isRateLimited(req: Request, userId?: string): Promise<boolean> {
  try {
    const url = Deno.env.get('SUPABASE_URL')
    const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!url || !key) return false
    const sb = createClient(url, key)
    const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown'
    const checks = [rlHit(sb, `chat:ip:${ip}`, 150, 60)]
    if (userId) checks.push(rlHit(sb, `chat:u:${userId}`, 40, 60))
    const allowed = await Promise.all(checks)
    return allowed.some((ok) => ok === false)
  } catch {
    return false // fail-open
  }
}

// ─── Handler ───────────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS })
  }
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405)
  }

  const apiKey = Deno.env.get('CLAUDE_API_KEY')
  if (!apiKey) {
    return jsonResponse(
      { error: 'Server is not configured: CLAUDE_API_KEY missing' },
      500,
    )
  }

  // Reject oversized bodies before parsing them into memory.
  const contentLength = parseInt(req.headers.get('content-length') || '0', 10)
  if (contentLength > 1_000_000) {
    return jsonResponse({ error: 'Request too large' }, 413)
  }

  let body: RequestBody
  try {
    body = await req.json()
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400)
  }

  if (!Array.isArray(body?.messages)) {
    return jsonResponse({ error: 'Body must include { messages[] }' }, 400)
  }

  // Payload caps — cost/memory abuse guard (far above any genuine conversation).
  const MAX_MESSAGES = 80
  const MAX_MSG_CHARS = 8000
  const oversize =
    body.messages.length > MAX_MESSAGES ||
    body.messages.some((m) => {
      const c = (m as { content?: unknown }).content
      const len = typeof c === 'string' ? c.length : JSON.stringify(c ?? '').length
      return len > MAX_MSG_CHARS
    })
  if (oversize) {
    return jsonResponse({ error: 'Request payload too large' }, 413)
  }

  const lang: Lang = body.lang === 'ar' ? 'ar' : 'en'
  // v50 (B1) — the server owns the system prompt. The client selects by mode;
  // any client-sent `system` is ignored, so callers can't inject their own
  // prompt (closes the persona-bypass / free-proxy hole).
  const mode: Mode = isMode(body.mode) ? body.mode : 'companion'
  const baseSystem = SYSTEM_PROMPTS[mode][lang]

  // Abuse guard (fail-open) — real users never reach these thresholds.
  if (await isRateLimited(req, body.user_id)) {
    return jsonResponse(
      {
        error:
          lang === 'ar'
            ? 'طلبات كثيرة جدًا. تمهّل لحظةً من فضلك.'
            : 'Too many requests — please slow down a moment.',
      },
      429,
    )
  }

  // ── Memory Agent (Agent 5) · presence ping + TSP update.
  //
  // Read the user's current TSP, apply v24 §49 signal detection to the
  // latest user message, write the result back, and surface the new
  // TSP to the client for L2 (verse-card attribution) and L3 (calendar
  // surfacing) adaptations. We pull the locale hint from accept-language
  // so first-contact country priors work for unauthenticated callers.
  let nextTSP: TSP | null = null
  if (body.user_id) {
    const sb = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )
    // Best-effort: a failed read or write must not break the response.
    try {
      const { data: existing } = await sb
        .from('users')
        .select('tsp')
        .eq('id', body.user_id)
        .maybeSingle()

      const latestUserMessage = [...body.messages]
        .reverse()
        .find((m) => m.role === 'user')?.content ?? ''
      const locale = req.headers.get('accept-language') ?? lang

      nextTSP = updateTSP(existing?.tsp as TSP | null, latestUserMessage, locale)

      // Upsert the user row including the new tsp. Fire-and-forget the
      // write — we already have the value for the response.
      sb.from('users')
        .upsert({ id: body.user_id, lang, tsp: nextTSP }, { onConflict: 'id' })
        .then(({ error }) => {
          if (error) console.error('users upsert failed:', error)
        })
    } catch (err) {
      console.error('TSP update failed (non-fatal):', err)
    }
  }

  // ── Safety Guardian: scan latest user message + retrieval query.
  // Crisis takes priority over everything else.
  const lastUser = [...body.messages]
    .reverse()
    .find((m) => m.role === 'user')?.content
  const crisisInput = `${body.retrieval_query ?? ''} ${lastUser ?? ''}`
  if (detectCrisis(crisisInput)) {
    return jsonResponse({
      text: CRISIS_TEXT[lang],
      crisis: {
        detected: true,
        resources: CRISIS_RESOURCES,
      },
    })
  }

  // ── Normal flow. Build the system prompt as CACHE-AWARE blocks so the huge
  // static baseline corpus (~200K tokens) is billed at ~1/10th the price on
  // repeat calls within the cache window, instead of full price every time:
  //   [0] the static corpus + instructions (server-owned, by mode) — cacheable
  //   [1] per-user memory (variable)        — after the cache breakpoint
  //   [2] per-query retrieved teachings (variable)
  let memoryUsed = 0
  let memoryText = ''
  if (body.user_id) {
    const summaries = await fetchRecentSummaries(body.user_id, 3)
    if (summaries.length > 0) {
      memoryText = formatMemoryBlock(summaries, lang)
      memoryUsed = summaries.length
    }
  }

  let matches: Match[] = []
  if (body.retrieval_query && body.retrieval_query.trim()) {
    matches = await retrieveTeachings(body.retrieval_query.trim())
  }

  const systemParam: Array<Record<string, unknown>> = [
    {
      type: 'text',
      text: baseSystem,
      cache_control: { type: 'ephemeral' },
    },
  ]
  if (memoryText) systemParam.push({ type: 'text', text: memoryText })
  const retrievalText = buildRetrievalBlock(matches)
  if (retrievalText) systemParam.push({ type: 'text', text: retrievalText })

  // ── Streaming path (v49): proxy Anthropic's SSE straight to the client so
  // the first words appear in well under a second. Verse-card verification
  // runs client-side at stream end (verifyAndStrip mostly no-ops given the
  // sparse RAG table, and the baseline corpus already grounds the verses).
  if (body.stream) {
    const upstreamStream = await fetch(ANTHROPIC_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': ANTHROPIC_VERSION,
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        max_tokens: body.max_tokens ?? 350,
        temperature: body.temperature ?? 0.5,
        system: systemParam,
        messages: body.messages,
        stream: true,
      }),
    })
    if (!upstreamStream.ok || !upstreamStream.body) {
      const errData: any = await upstreamStream.json().catch(() => null)
      return jsonResponse(
        { error: errData?.error?.message || `Upstream ${upstreamStream.status}` },
        upstreamStream.status,
      )
    }
    return new Response(upstreamStream.body, {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
    })
  }

  const upstream = await fetch(ANTHROPIC_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': ANTHROPIC_VERSION,
    },
    body: JSON.stringify({
      model: CHAT_MODEL,
      max_tokens: body.max_tokens ?? 500,
      temperature: body.temperature ?? 0.5,
      system: systemParam,
      messages: body.messages,
    }),
  })

  const data: any = await upstream.json().catch(() => null)
  if (!upstream.ok) {
    return jsonResponse(
      { error: data?.error?.message || `Upstream ${upstream.status}` },
      upstream.status,
    )
  }

  const rawText: string = (data?.content ?? [])
    .filter((b: any) => b?.type === 'text' && typeof b?.text === 'string')
    .map((b: any) => b.text as string)
    .join('\n')

  const { text, verifications } = verifyAndStrip(rawText, matches)

  return jsonResponse({
    text,
    retrieval: matches.length
      ? matches.map((m) => ({
          source: m.source,
          domain: m.domain,
          similarity: Number(m.similarity.toFixed(3)),
        }))
      : undefined,
    verifications: verifications.length ? verifications : undefined,
    memory_summaries_used: memoryUsed || undefined,
    tsp: nextTSP ?? undefined,
  })
})
