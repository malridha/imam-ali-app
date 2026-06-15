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
  maxTokens = 500,
  temperature = 0.5,
}: CallArgs): Promise<ClaudeResult> {
  const { data, error } = await supabase.functions.invoke<EdgeResponse>(
    'chat',
    {
      body: {
        system,
        messages,
        lang,
        user_id: userId,
        retrieval_query: retrievalQuery,
        max_tokens: maxTokens,
        temperature,
      },
    },
  )

  if (error) {
    throw new Error(error.message || 'Failed to reach the chat function')
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
