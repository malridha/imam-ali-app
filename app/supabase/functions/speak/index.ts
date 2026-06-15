// Edge Function: /functions/v1/speak
//
// v27 §53 — Companion voice locked. The ElevenLabs voice ID is no
// longer caller-selectable. The function uses the confirmed voice
// (GyRvpxTDRCiU2T93jzNl, overridable via ELEVENLABS_VOICE_ID env var
// for staging) and routes voice_settings through a per-use-case
// preset table.
//
// Request body: { text: string, use_case?: UseCase }
// Response:     audio/mpeg bytes
//
// On a primary-model failure we transparently retry once with the
// turbo model — covers most transient ElevenLabs latency spikes
// without surfacing an error to the user.

const ELEVENLABS_ENDPOINT = 'https://api.elevenlabs.io/v1/text-to-speech'

// v27 §53.1 — Confirmed by the founder through direct voice testing.
// Do NOT change without founder sign-off. May be overridden by env
// var for staging only.
const LOCKED_VOICE_ID = 'GyRvpxTDRCiU2T93jzNl'

// v45.1 — Per-use-case model + latency. Chat replies + calendar +
// library use turbo (~2× faster synthesis) for snappy back-and-forth;
// the sacred deliveries (salam, verse, du'a, ziyarat, fajr) stay on
// multilingual_v2 for maximum quality. v27 §53.5 explicitly approves
// turbo as the real-time conversation model.
const MODEL_MULTILINGUAL = 'eleven_multilingual_v2'
const MODEL_TURBO = 'eleven_turbo_v2_5'

// v27 §53.3 — Voice settings per use case.
// v45 speed bump (Jun 2026): all speeds multiplied by 1.20 per founder
// feedback that the v27 numbers felt too slow. Capped at the
// ElevenLabs max of 1.20. Stability and style unchanged — those
// govern timbre/expressivity, not tempo.
type UseCase =
  | 'salam'        // arrival greeting — maximum stillness
  | 'conversation' // chat replies — slightly more dialogic
  | 'verse'        // verse-card Arabic read-aloud
  | 'dua_intro'    // companion frames a du'a before reciter takes over
  | 'library'      // biography / history narration
  | 'fajr'         // morning Du'a al-Sabah passage
  | 'calendar'     // calendar event companion voice
  | 'ziyarat'      // Digital Ziyarat — most sacred experience

type VoiceSettings = {
  stability: number
  similarity_boost: number
  style: number
  use_speaker_boost: true
  speed: number
}

const SETTINGS: Record<UseCase, VoiceSettings> = {
  salam:        { stability: 0.88, similarity_boost: 0.80, style: 0.10, use_speaker_boost: true, speed: 0.94 },
  conversation: { stability: 0.82, similarity_boost: 0.78, style: 0.13, use_speaker_boost: true, speed: 0.92 },
  verse:        { stability: 0.85, similarity_boost: 0.80, style: 0.10, use_speaker_boost: true, speed: 0.96 },
  dua_intro:    { stability: 0.90, similarity_boost: 0.82, style: 0.06, use_speaker_boost: true, speed: 0.90 },
  library:      { stability: 0.82, similarity_boost: 0.78, style: 0.12, use_speaker_boost: true, speed: 1.02 },
  fajr:         { stability: 0.87, similarity_boost: 0.80, style: 0.09, use_speaker_boost: true, speed: 0.96 },
  calendar:     { stability: 0.82, similarity_boost: 0.78, style: 0.13, use_speaker_boost: true, speed: 0.98 },
  ziyarat:      { stability: 0.91, similarity_boost: 0.82, style: 0.06, use_speaker_boost: true, speed: 0.90 },
}

const MODEL_BY_USECASE: Record<UseCase, string> = {
  salam:        MODEL_MULTILINGUAL,
  conversation: MODEL_TURBO,
  verse:        MODEL_MULTILINGUAL,
  dua_intro:    MODEL_MULTILINGUAL,
  library:      MODEL_TURBO,
  fajr:         MODEL_MULTILINGUAL,
  calendar:     MODEL_TURBO,
  ziyarat:      MODEL_MULTILINGUAL,
}

// 0 = best quality · 4 = best latency. Use 3 for conversational
// turnaround (text→voice gap), 2 for sacred deliveries where
// pronunciation precision still matters.
const LATENCY_BY_USECASE: Record<UseCase, number> = {
  salam:        2,
  conversation: 3,
  verse:        2,
  dua_intro:    2,
  library:      3,
  fajr:         2,
  calendar:     3,
  ziyarat:      2,
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function errorResponse(message: string, status = 400): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  })
}

function isValidUseCase(v: unknown): v is UseCase {
  return typeof v === 'string' && v in SETTINGS
}

async function callElevenLabs(
  voiceId: string,
  apiKey: string,
  text: string,
  modelId: string,
  settings: VoiceSettings,
  latency: number,
): Promise<Response> {
  return await fetch(
    `${ELEVENLABS_ENDPOINT}/${voiceId}/stream?optimize_streaming_latency=${latency}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        voice_settings: settings,
        // v27 §53.4 — high-quality output for the primary model.
        // Turbo callers override via the model argument; we keep the
        // format constant so the client doesn't need to know.
        output_format: 'mp3_44100_128',
      }),
    },
  )
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS })
  }
  if (req.method !== 'POST') {
    return errorResponse('Method not allowed', 405)
  }

  const apiKey = Deno.env.get('ELEVENLABS_API_KEY')
  if (!apiKey) {
    return errorResponse(
      'Server not configured: ELEVENLABS_API_KEY missing',
      500,
    )
  }

  let body: { text?: string; use_case?: unknown }
  try {
    body = await req.json()
  } catch {
    return errorResponse('Invalid JSON body')
  }

  const text = body?.text?.trim()
  if (!text) {
    return errorResponse('Body must include { text: string }')
  }
  if (text.length > 5000) {
    return errorResponse('Text too long (max 5000 characters)')
  }

  const useCase: UseCase = isValidUseCase(body.use_case) ? body.use_case : 'conversation'
  const settings = SETTINGS[useCase]
  const primaryModel = MODEL_BY_USECASE[useCase]
  const latency = LATENCY_BY_USECASE[useCase]
  const voiceId = Deno.env.get('ELEVENLABS_VOICE_ID') || LOCKED_VOICE_ID

  // Primary attempt: the use-case-appropriate model.
  let upstream = await callElevenLabs(voiceId, apiKey, text, primaryModel, settings, latency)

  // v27 §53.5 — On primary failure, transparently retry with the
  // turbo model regardless of which primary we tried. Most failures
  // are transient latency spikes on the multilingual endpoint; turbo
  // recovers quickly. If primary was already turbo, the retry is
  // effectively a re-attempt with the same model.
  if (!upstream.ok) {
    const _ = await upstream.text().catch(() => '')
    upstream = await callElevenLabs(voiceId, apiKey, text, MODEL_TURBO, settings, latency)
  }

  if (!upstream.ok) {
    const errBody = await upstream.text().catch(() => '')
    return errorResponse(
      `ElevenLabs ${upstream.status}: ${errBody.slice(0, 200) || 'upstream error'}`,
      upstream.status,
    )
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'no-store',
    },
  })
})
