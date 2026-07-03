// Edge Function: /functions/v1/list-summaries
// Lists session summaries for a given user_id, newest first.
// Powers the "My Story" view in the client.

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

  let body: { user_id?: string }
  try {
    body = await req.json()
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400)
  }

  // user_id is a client-generated UUID (36 chars) — bound it so arbitrary
  // multi-KB strings never reach the query layer.
  const userId =
    typeof body?.user_id === 'string' && body.user_id.length <= 64 ? body.user_id.trim() : ''
  if (!userId) {
    return jsonResponse({ error: 'Body must include { user_id }' }, 400)
  }

  const sb = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  const { data, error } = await sb
    .from('session_summaries')
    .select('id, path, summary, themes, domain, ended_at')
    .eq('user_id', userId)
    .order('ended_at', { ascending: false })
    .limit(50)

  if (error) {
    return jsonResponse({ error: error.message }, 500)
  }

  return jsonResponse({ summaries: data ?? [] })
})
