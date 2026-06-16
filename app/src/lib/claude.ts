import { supabase } from './supabase'
import type { Lang } from '../types/lang'
import type { TSP } from '../types/tsp'

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

type CallArgs = {
  system: string
  messages: ClaudeMessage[]
  /** UI language; the server uses it for the crisis fallback text. */
  lang?: Lang
  /** Anonymous browser user ID — used for cross-session memory. */
  userId?: string
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
  system,
  messages,
  lang,
  userId,
  retrievalQuery,
  // Lower default cap = fewer tokens to generate = faster replies. The
  // companion is instructed to be brief, so this rarely truncates and
  // shaves noticeable time off each turn.
  maxTokens = 350,
  temperature = 0.5,
}: CallArgs): Promise<ClaudeResult> {
  const body = {
    system,
    messages,
    lang,
    user_id: userId,
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
