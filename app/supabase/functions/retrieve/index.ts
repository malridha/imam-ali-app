// deno-lint-ignore-file no-explicit-any
// Edge Function: /functions/v1/retrieve
//
// Given a user query (free text), returns the top-k most semantically
// similar teachings from the public.teachings corpus.
//
// This is Agent 1 from the brief — the Corpus Retriever. Subsequent steps
// will chain Retriever → Composer → Verifier in the chat function.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'

// @ts-expect-error — `Supabase` is a runtime-only global in Edge Functions
const embedder = new Supabase.ai.Session('gte-small')

const DEFAULT_THRESHOLD = 0.5  // tune up to 0.78 once corpus is fully populated
const DEFAULT_LIMIT = 5

type Body = {
  query: string
  limit?: number
  threshold?: number
}

type Match = {
  id: number
  arabic: string
  english: string
  source: string
  domain: string | null
  similarity: number
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

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS })
  }
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405)
  }

  let body: Body
  try {
    body = await req.json()
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400)
  }

  const query = (body?.query ?? '').trim()
  if (!query) {
    return jsonResponse({ error: 'Body must include { query: string }' }, 400)
  }

  const limit = Math.min(Math.max(body.limit ?? DEFAULT_LIMIT, 1), 20)
  const threshold = Math.min(Math.max(body.threshold ?? DEFAULT_THRESHOLD, 0), 1)

  // 1. Embed the query
  const queryEmbedding = (await embedder.run(query, {
    mean_pool: true,
    normalize: true,
  })) as number[]

  // 2. Cosine-similarity search via the match_teachings SQL function
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  const { data, error } = await supabase.rpc('match_teachings', {
    query_embedding: queryEmbedding,
    match_threshold: threshold,
    match_count: limit,
  })

  if (error) {
    return jsonResponse({ error: error.message }, 500)
  }

  const matches: Match[] = (data ?? []).map((row: any) => ({
    id: row.id,
    arabic: row.arabic,
    english: row.english,
    source: row.source,
    domain: row.domain,
    similarity: Number(row.similarity),
  }))

  return jsonResponse({ query, threshold, limit, matches })
})
