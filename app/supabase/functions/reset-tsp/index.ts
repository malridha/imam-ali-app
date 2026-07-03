// Edge Function: /functions/v1/reset-tsp
//
// Resets the silent Tradition Sensitivity Profile back to neutral
// defaults for a single user. Called when the user taps "Reset
// tradition profile" in My Story. Wipes the inferred profile only —
// conversations and session summaries are untouched.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const NEUTRAL_TSP = {
  sr: 50,
  sur: 50,
  smr: 50,
  session_count: 0,
  expansion_active: false,
  self_identified: null,
  lock_attribution: null,
  dominant_axis: 'neutral',
  country_prior_applied: false,
  last_updated: null,
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req) => {
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
    return jsonResponse({ error: 'user_id required' }, 400)
  }

  const sb = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  const { error } = await sb
    .from('users')
    .update({ tsp: NEUTRAL_TSP })
    .eq('id', userId)

  if (error) {
    return jsonResponse({ error: error.message }, 500)
  }
  return jsonResponse({ ok: true })
})
