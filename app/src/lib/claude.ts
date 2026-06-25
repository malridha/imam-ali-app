import { supabase, SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase'
import type { Lang } from '../types/lang'
import type { TSP } from '../types/tsp'
import { computeAgeRange, type UserProfile } from '../types/profile'

export type ClaudeMessage = {
  role: 'user' | 'assistant'
  content: string
}

export type RetrievalHit = {
  source: string
  domain: string | null
  similarity: number
}

export type CrisisResource = {
  name: string
  number?: string
  url?: string
  note?: string
}

export type CrisisInfo = {
  detected: boolean
  resources: CrisisResource[]
}

/** v50 (B1): the server owns the system prompt; the client selects one by mode. */
export type ChatMode = 'companion' | 'teaching' | 'recite'

type CallArgs = {
  mode: ChatMode
  messages: ClaudeMessage[]
  /** UI language; the server uses it for the crisis fallback text. */
  lang?: Lang
  /** Anonymous browser user ID — used for cross-session memory. */
  userId?: string
  /**
   * Locally-stored, user-volunteered context (age range, gender). Optional —
   * undefined fields are simply omitted from the prompt server-side.
   */
  profile?: UserProfile
  /**
   * Free-text query used by the chat function to pull authenticated teachings
   * from the corpus. Pass the user's latest natural-language message; leave
   * undefined for opener calls (which carry meta-prompts, not user content).
   */
  retrievalQuery?: string
  maxTokens?: number
  temperature?: number
}

type EdgeResponse = {
  text?: string
  error?: string
  retrieval?: RetrievalHit[]
  crisis?: CrisisInfo
  tsp?: TSP
}

export type ClaudeResult = {
  text: string
  retrieval?: RetrievalHit[]
  crisis?: CrisisInfo
  /** v24 §49 — updated TSP for this user, surfaced for client adaptations. */
  tsp?: TSP
}

/**
 * supabase-js's FunctionsHttpError carries the failing Response on
 * `.context`. Read its JSON body and return the server's `error` string
 * (e.g. the Anthropic "credit balance is too low" message) if present.
 */
// Number of extra attempts after the first, for transient network errors.
const MAX_CHAT_RETRIES = 2
// Linear backoff base (ms): waits 500ms, then 1000ms between retries.
const RETRY_BASE_MS = 500

async function readEdgeErrorBody(error: unknown): Promise<string> {
  const ctx = (error as { context?: unknown })?.context
  if (ctx instanceof Response) {
    try {
      const body = await ctx.clone().json()
      if (body && typeof body.error === 'string') return body.error
    } catch {
      // body wasn't JSON — fall through to the generic message
    }
  }
  return ''
}

/**
 * True when a thrown chat error is the Anthropic billing-exhaustion case
 * (the account is out of API credits). Lets the UI show calm "temporarily
 * unavailable" copy instead of a raw billing string or a generic network
 * error.
 */
export function isOutOfCreditsError(message: string): boolean {
  return /credit balance is too low|insufficient.*credit|billing.*(hard )?limit|quota (has been )?exceeded/i.test(
    message,
  )
}

/**
 * Calls /functions/v1/chat. The server holds CLAUDE_API_KEY and (when a
 * retrievalQuery is supplied) does corpus retrieval before invoking Claude.
 * If a crisis signal is detected in the user's input, the server short-
 * circuits and returns hardcoded crisis copy + resources — Claude is not
 * called in that case.
 */
export async function callClaude({
  mode,
  messages,
  lang,
  userId,
  profile,
  retrievalQuery,
  // Lower default cap = fewer tokens to generate = faster replies. The
  // companion is instructed to be brief, so this rarely truncates and
  // shaves noticeable time off each turn.
  maxTokens = 350,
  temperature = 0.5,
}: CallArgs): Promise<ClaudeResult> {
  const body = {
    mode,
    messages,
    lang,
    user_id: userId,
    name: profile?.name ?? undefined,
    age_range: computeAgeRange(profile?.dob ?? null) ?? undefined,
    gender: profile?.gender ?? undefined,
    retrieval_query: retrievalQuery,
    max_tokens: maxTokens,
    temperature,
  }

  // Retry transient network failures. supabase-js distinguishes them by
  // shape: a FunctionsHttpError (real non-2xx response, e.g. 400 out of
  // credits) carries a Response on `.context`; a FunctionsFetchError
  // (the request never reached the server — the "Failed to send a request
  // to the Edge Function" case) does not. We retry only the latter, since
  // retrying a definitive HTTP error is pointless.
  let data: EdgeResponse | null = null
  let error: { message?: string; context?: unknown } | null = null
  for (let attempt = 0; attempt <= MAX_CHAT_RETRIES; attempt++) {
    const res = await supabase.functions.invoke<EdgeResponse>('chat', { body })
    data = res.data
    error = res.error
    if (!error) break
    const isHttpError = error.context instanceof Response
    if (isHttpError || attempt === MAX_CHAT_RETRIES) break
    await new Promise((r) => setTimeout(r, RETRY_BASE_MS * (attempt + 1)))
  }

  if (error) {
    // supabase-js wraps a non-2xx response in a FunctionsHttpError whose
    // useful body (e.g. { error: "Your credit balance is too low…" }) lives
    // on error.context (the raw Response), NOT in error.message — which is
    // just the generic "Edge Function returned a non-2xx status code".
    // Surface the real reason so callers can react to it.
    const detail = await readEdgeErrorBody(error)
    throw new Error(detail || error.message || 'Failed to reach the chat function')
  }
  if (!data) {
    throw new Error('Empty response from the chat function')
  }
  if (data.error) {
    throw new Error(data.error)
  }
  if (typeof data.text !== 'string') {
    throw new Error('Malformed response from the chat function')
  }
  return {
    text: data.text,
    retrieval: data.retrieval,
    crisis: data.crisis,
    tsp: data.tsp,
  }
}

export type StreamResult = {
  /** The complete reply text once the stream finishes. */
  full: string
  crisis?: CrisisInfo
  tsp?: TSP
  /** false when the server short-circuited (crisis) with a one-shot JSON body. */
  streamed: boolean
}

/**
 * Streaming variant of callClaude. Proxies the chat function's token stream
 * and invokes `onDelta(fullSoFar, delta)` as text arrives, so the UI can show
 * the reply forming in real time. The server returns plain JSON (not a stream)
 * for the crisis short-circuit; that case is handled transparently here.
 *
 * Throws on transport/HTTP errors (e.g. out-of-credits) — callers may catch
 * and fall back to the non-streaming callClaude().
 */
export async function streamClaude(
  {
    mode,
    messages,
    lang,
    userId,
    profile,
    retrievalQuery,
    maxTokens = 350,
    temperature = 0.5,
  }: CallArgs,
  onDelta: (fullSoFar: string, delta: string) => void,
): Promise<StreamResult> {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      mode,
      messages,
      lang,
      user_id: userId,
      name: profile?.name ?? undefined,
      age_range: computeAgeRange(profile?.dob ?? null) ?? undefined,
      gender: profile?.gender ?? undefined,
      retrieval_query: retrievalQuery,
      max_tokens: maxTokens,
      temperature,
      stream: true,
    }),
  })

  const contentType = res.headers.get('content-type') || ''

  // Crisis short-circuit (and any error) comes back as JSON, not a stream.
  if (contentType.includes('application/json')) {
    const data = await res.json().catch(() => null)
    if (!res.ok || !data || data.error) {
      throw new Error(data?.error || `Chat failed (${res.status})`)
    }
    const text = typeof data.text === 'string' ? data.text : ''
    if (text) onDelta(text, text)
    return { full: text, crisis: data.crisis, tsp: data.tsp, streamed: false }
  }

  if (!res.ok || !res.body) {
    const data = await res.json().catch(() => null)
    throw new Error(data?.error || `Chat stream failed (${res.status})`)
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let full = ''
  let buffer = ''
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? '' // keep any partial trailing line
    for (const line of lines) {
      const l = line.trim()
      if (!l.startsWith('data:')) continue
      const payload = l.slice(5).trim()
      if (!payload || payload === '[DONE]') continue
      try {
        const evt = JSON.parse(payload)
        if (
          evt.type === 'content_block_delta' &&
          evt.delta?.type === 'text_delta' &&
          typeof evt.delta.text === 'string'
        ) {
          full += evt.delta.text
          onDelta(full, evt.delta.text)
        }
      } catch {
        // ignore keep-alive / non-JSON lines
      }
    }
  }
  return { full, streamed: true }
}
