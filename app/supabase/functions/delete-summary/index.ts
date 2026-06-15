// Edge Function: /functions/v1/delete-summary
// Deletes either a single session_summaries row (id + user_id pair) or
// every row for a user_id (when summary_id is omitted).
// Authorization model: callers must supply user_id; we only delete rows
// owned by that user_id. With anon-only auth this is best-effort — the
// brief's full RLS + Supabase Auth migration comes later.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'

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

  let body: { user_id?: string; summary_id?: number; all?: boolean }
  try {
    body = await req.json()
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400)
  }

  const userId = body?.user_id?.trim()
  if (!userId) {
    return jsonResponse({ error: 'Body must include { user_id }' }, 400)
  }

  const sb = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  let query = sb.from('session_summaries').delete().eq('user_id', userId)

  if (!body.all) {
    if (typeof body.summary_id !== 'number') {
      return jsonResponse(
        { error: 'Either pass { summary_id: number } or { all: true }' },
        400,
      )
    }
    query = query.eq('id', body.summary_id)
  }

  const { error, count } = await query.select('id', { count: 'exact' })
  if (error) {
    return jsonResponse({ error: error.message }, 500)
  }
  return jsonResponse({ ok: true, deleted: count ?? 0 })
})
