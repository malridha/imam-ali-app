// deno-lint-ignore-file no-explicit-any
// Edge Function: /functions/v1/summarize
//
// Called by the client when a Companion session ends. Distils the
// conversation into a 2-3 sentence summary + 1-4 short theme tags +
// a primary life domain, and writes a row to public.session_summaries.
// The next session for the same user_id can then have this context
// injected by the chat function (Step 7f.4).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'

const ANTHROPIC_ENDPOINT = 'https://api.anthropic.com/v1/messages'
const ANTHROPIC_VERSION = '2023-06-01'
const SUMMARY_MODEL = 'claude-haiku-4-5-20251001' // small, fast, cheap — fine for summarization

// 'open' is the v15 single-conversation mode. The four-path values
// remain accepted for backwards compatibility with old summaries.
const KNOWN_PATHS = new Set(['open', 'wisdom', 'poetry', 'venting', 'counsel'])

type ClaudeMessage = {
  role: 'user' | 'assistant'
  content: string
}

type RequestBody = {
  user_id?: string
  path?: string
  transcript?: ClaudeMessage[]
}

type SummaryShape = {
  summary?: string
  themes?: string[]
  domain?: string
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

const SUMMARY_SYSTEM = `You analyze short spiritual companion conversations and produce a compact JSON description of the session. The conversation is between a user and "Imam Ali", an AI spiritual companion grounded in classical Islamic wisdom.

Return ONLY a valid JSON object — no prose, no markdown, no code fences. The shape must be:

{
  "summary": string,
  "themes": string[],
  "domain": string
}

Field rules:
- summary: 2 to 3 sentences, third-person ("the user", "they"), no quotes, no Arabic. Capture what they were carrying when they arrived and what shifted.
- themes: 1 to 4 short lowercase tags (max 3 words each), e.g. "anxiety", "aging parent", "work pressure", "self-forgiveness".
- domain: EXACTLY ONE of: anxiety, grief, anger, purpose, self-worth, comparison, faith, loneliness, financial, forgiveness, family, relationships, self-knowledge, other

If the transcript is too short or empty to summarize meaningfully, return:
{ "summary": "", "themes": [], "domain": "other" }`

function transcriptToText(messages: ClaudeMessage[]): string {
  return messages
    .map((m) => `${m.role === 'user' ? 'User' : 'Imam Ali'}: ${m.content}`)
    .join('\n\n')
}

async function summarizeWithClaude(
  apiKey: string,
  transcript: ClaudeMessage[],
  path: string,
): Promise<SummaryShape> {
  const upstream = await fetch(ANTHROPIC_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': ANTHROPIC_VERSION,
    },
    body: JSON.stringify({
      model: SUMMARY_MODEL,
      max_tokens: 400,
      temperature: 0.2,
      system: SUMMARY_SYSTEM,
      messages: [
        {
          role: 'user',
          content: `Path: ${path}\n\nTranscript:\n\n${transcriptToText(transcript)}`,
        },
      ],
    }),
  })
  if (!upstream.ok) {
    const err = await upstream.text().catch(() => '')
    throw new Error(`summarizer upstream ${upstream.status}: ${err.slice(0, 200)}`)
  }
  const data = await upstream.json()
  const raw: string = (data?.content ?? [])
    .filter((b: any) => b?.type === 'text')
    .map((b: any) => b.text as string)
    .join('')
    .trim()

  // Strip possible code fences just in case the model wrapped it
  const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '')
  try {
    return JSON.parse(cleaned) as SummaryShape
  } catch {
    return { summary: '', themes: [], domain: 'other' }
  }
}

// ── Abuse rate limiting (NOT a usage cap) ───────────────────────────────
// Same fail-open pattern as /chat and /speak: any limiter error allows the
// request, so real users are never wrongly blocked. See rate_limits migration.
async function isRateLimited(req: Request): Promise<boolean> {
  try {
    const url = Deno.env.get('SUPABASE_URL')
    const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!url || !key) return false
    const sb = createClient(url, key)
    const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown'
    const { data, error } = await sb.rpc('rate_limit_hit', {
      p_bucket: `summarize:ip:${ip}`,
      p_max: 20,
      p_window_seconds: 60,
    })
    if (error) return false // fail-open
    return data === false
  } catch {
    return false
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS })
  }
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405)
  }

  const apiKey = Deno.env.get('CLAUDE_API_KEY')
  if (!apiKey) {
    return jsonResponse({ error: 'CLAUDE_API_KEY missing' }, 500)
  }

  // Reject oversized bodies before parsing them into memory (same guard as
  // /chat). This function forwards the transcript to Claude, so unbounded
  // input is a direct cost vector.
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

  const userId =
    typeof body.user_id === 'string' && body.user_id.trim() && body.user_id.length <= 64
      ? body.user_id.trim()
      : ''
  const path = typeof body.path === 'string' ? body.path.trim() : ''
  const transcript = Array.isArray(body.transcript) ? body.transcript : []

  if (!userId || !path || !KNOWN_PATHS.has(path)) {
    return jsonResponse(
      { error: 'Body must include { user_id, path: open|wisdom|poetry|venting|counsel, transcript[] }' },
      400,
    )
  }

  // Same payload discipline as /chat: bound what we forward to Claude.
  const MAX_MESSAGES = 80
  const MAX_MSG_CHARS = 8000
  const malformed = transcript.some(
    (m) =>
      !m ||
      (m.role !== 'user' && m.role !== 'assistant') ||
      typeof m.content !== 'string' ||
      m.content.length > MAX_MSG_CHARS,
  )
  if (malformed || transcript.length > MAX_MESSAGES) {
    return jsonResponse({ error: 'Transcript malformed or too large' }, 413)
  }

  if (transcript.length < 2) {
    // Not enough to summarize — silently accept, no row written
    return jsonResponse({ ok: true, skipped: 'transcript too short' })
  }

  // Abuse guard (fail-open, same pattern as /chat): one summary per session
  // end is the honest rate — 20/min/IP only ever bites a script.
  if (await isRateLimited(req)) {
    return jsonResponse({ error: 'Too many requests — please slow down a moment.' }, 429)
  }

  let summary: SummaryShape
  try {
    summary = await summarizeWithClaude(apiKey, transcript, path)
  } catch (e: any) {
    return jsonResponse({ error: e?.message ?? String(e) }, 500)
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  // Make sure the user row exists (chat may not have run yet in edge cases)
  await supabase.from('users').upsert({ id: userId }, { onConflict: 'id' })

  const { error: insertErr } = await supabase
    .from('session_summaries')
    .insert({
      user_id: userId,
      path,
      summary: summary.summary ?? '',
      themes: Array.isArray(summary.themes) ? summary.themes.slice(0, 4) : [],
      domain: summary.domain ?? 'other',
    })

  if (insertErr) {
    return jsonResponse({ error: insertErr.message }, 500)
  }

  return jsonResponse({
    ok: true,
    summary: summary.summary,
    themes: summary.themes,
    domain: summary.domain,
  })
})
