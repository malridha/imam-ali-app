import { supabase } from './supabase'

const FUNCTION_PATH = '/functions/v1/speak'

// v27 §53 — Voice is locked server-side. Callers no longer supply a
// voice ID; they signal which use case they're in and the Edge
// Function selects the matching voice_settings preset.
export type UseCase =
  | 'salam'        // arrival greeting — maximum stillness
  | 'conversation' // chat replies — slightly more dialogic
  | 'verse'        // verse-card Arabic read-aloud
  | 'dua_intro'    // companion frames a du'a before reciter takes over
  | 'library'      // biography / history narration
  | 'fajr'         // morning Du'a al-Sabah passage
  | 'calendar'     // calendar event companion voice
  | 'ziyarat'      // Digital Ziyarat — most sacred experience

/**
 * Hits the speak Edge Function and returns a playable Blob URL for
 * the audio of `text`. The caller owns the URL — call
 * URL.revokeObjectURL on it when done to release memory.
 *
 * `use_case` selects voice_settings server-side per v27 §53.3.
 * Defaults to 'conversation'.
 */
export async function speak(
  text: string,
  useCase: UseCase = 'conversation',
): Promise<string> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

  const res = await fetch(`${supabaseUrl}${FUNCTION_PATH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${anonKey}`,
    },
    body: JSON.stringify({
      text,
      use_case: useCase,
    }),
  })

  if (!res.ok) {
    const errBody = await res.json().catch(() => null)
    throw new Error(errBody?.error || `Speak failed (${res.status})`)
  }

  const blob = await res.blob()
  return URL.createObjectURL(blob)
}

void supabase
