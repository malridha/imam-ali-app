import { useEffect, useState } from 'react'
import { useAudioPlayer } from './useAudioPlayer'
import type { UseCase } from '../lib/speak'
import type { Lang } from '../types/lang'

/**
 * "Read aloud" for library content (Teachings, Du'as, Biography, Calendar)
 * using the app's SELECTED voice — the same ElevenLabs voice the companion
 * speaks with — instead of the browser's robotic `speechSynthesis`.
 *
 * Tracks which card/entry is currently speaking (`speakingId`) so the UI can
 * show a Stop state, and clears it when playback ends or is toggled off.
 *
 * Note: like all audio in the app, the first play needs one real user
 * gesture to satisfy the browser autoplay policy — the tap that triggers
 * read-aloud is itself that gesture, so it works from the first press.
 */
export function useReadAloud() {
  const { play, stop, speaking, muted, setMuted, error } = useAudioPlayer()
  const [speakingId, setSpeakingId] = useState<string | null>(null)

  // Clear the active id when playback naturally finishes (speaking → false).
  useEffect(() => {
    if (!speaking) setSpeakingId(null)
  }, [speaking])

  // If the voice request fails (e.g. ElevenLabs quota exceeded), playback
  // never starts, so `speaking` never flips — reset the active id on error
  // so the button doesn't stay stuck on "Stop".
  useEffect(() => {
    if (error) setSpeakingId(null)
  }, [error])

  /**
   * Toggle read-aloud for `id`. Tapping the same id again stops it.
   * `useCase` selects the server-side voice preset (e.g. 'verse' for
   * Arabic wisdom, 'library' for English narration, 'dua_intro' for du'as).
   */
  function toggle(
    id: string,
    text: string,
    lang: Lang,
    useCase: UseCase = 'verse',
  ) {
    if (speakingId === id) {
      stop()
      setSpeakingId(null)
      return
    }
    setSpeakingId(id)
    // ElevenLabs caps a single request at 5000 characters; stay well under.
    void play(text.slice(0, 4800), lang, useCase)
  }

  return { speakingId, toggle, stop, muted, setMuted, error }
}
