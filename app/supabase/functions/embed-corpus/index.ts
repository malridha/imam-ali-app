// deno-lint-ignore-file no-explicit-any
// One-shot Edge Function: /functions/v1/embed-corpus
//
// Walks every row in public.teachings that does NOT yet have an embedding,
// generates a 384-dim vector using Supabase's built-in `gte-small` model
// from the English text + domain, and writes it back.
//
// Idempotent: rows with existing embeddings are skipped, so re-running
// after adding new teachings just embeds the new ones.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'

// @ts-expect-error — `Supabase` is a runtime-only global in Edge Functions
const session = new Supabase.ai.Session('gte-small')

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

  // Admin-only maintenance endpoint. The anon key ships in the public bundle,
  // so without this anyone could trigger embedding compute on our dime. Require
  // a secret header and fail CLOSED (unlike the user-facing functions): if
  // EMBED_ADMIN_KEY is unset or the header doesn't match, refuse.
  const adminKey = Deno.env.get('EMBED_ADMIN_KEY')
  if (!adminKey || req.headers.get('x-admin-key') !== adminKey) {
    return jsonResponse({ error: 'Forbidden' }, 403)
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  // Find teachings that don't have an embedding yet. Optional ?limit=N caps
  // how many are embedded per invocation so large backfills stay within the
  // function time budget — call repeatedly (it's idempotent) until done.
  const limitParam = parseInt(new URL(req.url).searchParams.get('limit') || '0', 10)
  let query = supabase
    .from('teachings')
    .select('id, english, domain')
    .is('embedding', null)
  if (limitParam > 0) query = query.limit(limitParam)
  const { data: rows, error: fetchErr } = await query

  if (fetchErr) {
    return jsonResponse({ error: fetchErr.message }, 500)
  }

  let embedded = 0
  const failures: Array<{ id: number; error: string }> = []

  for (const row of rows ?? []) {
    // Embed the English text + a domain hint so the vector carries both the
    // literal meaning and the life-area context.
    const text = row.domain
      ? `${row.english} (${row.domain})`
      : row.english

    try {
      const embedding = (await session.run(text, {
        mean_pool: true,
        normalize: true,
      })) as number[]

      const { error: updateErr } = await supabase
        .from('teachings')
        .update({ embedding })
        .eq('id', row.id)

      if (updateErr) {
        failures.push({ id: row.id, error: updateErr.message })
      } else {
        embedded++
      }
    } catch (e: any) {
      failures.push({ id: row.id, error: String(e?.message ?? e) })
    }
  }

  return jsonResponse({
    requested: rows?.length ?? 0,
    embedded,
    failures,
  })
})
