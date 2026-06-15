// Edge Function: /functions/v1/classify-path
//
// Takes a free-text user message and decides which of the four paths
// (wisdom · poetry · venting · counsel) fits best. Used by the
// PathSelect screen so users can just type what's on their mind
// instead of choosing a path manually.
//
// Uses Claude Haiku 4.5 for speed + cost — this is a tiny classification.

const ANTHROPIC_ENDPOINT = 'https://api.anthropic.com/v1/messages'
const ANTHROPIC_VERSION = '2023-06-01'
const MODEL = 'claude-haiku-4-5-20251001'

const PATHS = ['wisdom', 'poetry', 'venting', 'counsel'] as const
type Path = (typeof PATHS)[number]
const DEFAULT_PATH: Path = 'counsel'

const SYSTEM = `You route a person's message to the right spiritual companion path. Pick ONE of four paths based on what they actually need from this conversation right now.

PATHS:
- wisdom: they want a teaching, a perspective, or guidance for something they're carrying. Phrases like "I need help with...", "what would you say about...", "I'm struggling with..."
- poetry: they want to receive a verse or poem to sit with. They explicitly mention poetry, verse, longing, beauty, recitation, or want something to feel rather than think about.
- venting: they need to be heard and unburdened, NOT advised. They want to express something hard with no fix. Phrases like "I just need to say...", "I had to tell someone...", "I can't take this anymore", or messages that are pure emotional release with no question.
- counsel: they have a specific situation or decision to think through with help. Phrases like "should I...", "I don't know what to do about...", "I need to decide...", "my situation is..."

If the message is ambiguous between wisdom and counsel, prefer counsel (it offers the most active help).
If the message clearly asks for a poem or verse, choose poetry.
If the message is venting without a question, choose venting.

REPLY FORMAT: Exactly one lowercase word — wisdom, poetry, venting, or counsel. No other text, no punctuation, no quotes.`

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

  const apiKey = Deno.env.get('CLAUDE_API_KEY')
  if (!apiKey) {
    return jsonResponse({ error: 'CLAUDE_API_KEY missing' }, 500)
  }

  let body: { query?: string }
  try {
    body = await req.json()
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400)
  }

  const query = body?.query?.trim()
  if (!query) {
    return jsonResponse({ error: 'Body must include { query: string }' }, 400)
  }

  const upstream = await fetch(ANTHROPIC_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': ANTHROPIC_VERSION,
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 10,
      temperature: 0,
      system: SYSTEM,
      messages: [{ role: 'user', content: query }],
    }),
  })

  if (!upstream.ok) {
    return jsonResponse(
      { error: `Upstream ${upstream.status}`, path: DEFAULT_PATH },
      200, // graceful fallback so UI doesn't get stuck
    )
  }

  const data = await upstream.json()
  const raw: string =
    (data?.content ?? [])
      .filter((b: { type?: string }) => b?.type === 'text')
      .map((b: { text?: string }) => (b?.text ?? '').toLowerCase().trim())
      .join('') || ''

  // Find the first known path token in the model's reply; default if none.
  const path = PATHS.find((p) => raw.includes(p)) ?? DEFAULT_PATH

  return jsonResponse({ path, raw })
})
