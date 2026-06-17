import { useCallback, useEffect, useRef, useState } from 'react'
import { speak, type UseCase } from '../lib/speak'
import type { Lang } from '../types/lang'

const MUTE_KEY = 'ya-imam-ali:muted'

// Client-side voice speed-up for the companion. 1.0 = ElevenLabs default
// (already gentle); 1.18 makes replies noticeably brisker while pitch is
// preserved. Tune here without redeploying the speak function.
const VOICE_PLAYBACK_RATE = 1.18

// 1 frame of silent WAV — used to unlock the audio element during a user
// gesture so later programmatic .play() calls don't get blocked by
// the browser's autoplay policy.
const SILENT_WAV =
  'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA='

function getStoredMute(): boolean {
  try {
    return localStorage.getItem(MUTE_KEY) === '1'
  } catch {
    return false
  }
}

/**
 * Manages a single shared HTMLAudioElement plus a "muted" preference in
 * localStorage. `play(text, lang)` requests audio for the text and plays
 * it, cancelling any previous playback. If the browser's autoplay policy
 * has not yet been unlocked by a user gesture, the request is queued and
 * fired automatically on the user's first interaction.
 *
 * Components subscribe to `speaking` to drive UI (avatar pulse, etc).
 * `error` surfaces the most recent playback failure so the UI can show
 * the user something instead of silently failing.
 */
export function useAudioPlayer() {
  const [muted, setMutedState] = useState<boolean>(() => getStoredMute())
  const [speaking, setSpeaking] = useState(false)
  const [error, setError] = useState<string>('')
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const currentUrlRef = useRef<string | null>(null)
  const generationRef = useRef(0)

  // Audio-autoplay-unlock state: true after the user's first interaction
  // (which we use to prime the audio element).
  const unlockedRef = useRef(false)
  // If a play() request comes in before unlock, store it here and fire it
  // when unlock happens. Keeps the call site simple: just await play().
  // v27 §53 — also remember the use_case so the queued request fires
  // with the right voice settings on unlock.
  const pendingRef = useRef<{ text: string; lang: Lang; useCase: UseCase } | null>(null)

  function getAudio(): HTMLAudioElement {
    if (!audioRef.current) {
      const a = new Audio()
      a.preload = 'auto'
      // Speed up the companion's voice ~18% without raising the pitch, so
      // replies feel livelier and less slow. preservesPitch keeps the timbre.
      a.playbackRate = VOICE_PLAYBACK_RATE
      const ap = a as HTMLAudioElement & { preservesPitch?: boolean; mozPreservesPitch?: boolean }
      ap.preservesPitch = true
      ap.mozPreservesPitch = true
      a.addEventListener('ended', () => setSpeaking(false))
      a.addEventListener('pause', () => setSpeaking(false))
      a.addEventListener('error', () => setSpeaking(false))
      audioRef.current = a
    }
    // Re-assert on every fetch (some browsers reset rate when src changes).
    audioRef.current.playbackRate = VOICE_PLAYBACK_RATE
    return audioRef.current
  }

  function setMuted(next: boolean) {
    setMutedState(next)
    try {
      localStorage.setItem(MUTE_KEY, next ? '1' : '0')
    } catch {
      // ignore
    }
    if (next) stop()
  }

  const stop = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    a.pause()
    a.currentTime = 0
    setSpeaking(false)
    if (currentUrlRef.current) {
      URL.revokeObjectURL(currentUrlRef.current)
      currentUrlRef.current = null
    }
    generationRef.current++
  }, [])

  // The actual play work, separated so we can call it from both the public
  // `play()` and the unlock handler (replaying a queued request).
  const playInternal = useCallback(
    async (text: string, _lang: Lang, useCase: UseCase) => {
      stop()
      setError('')
      const myGeneration = ++generationRef.current
      try {
        const url = await speak(text, useCase)
        if (myGeneration !== generationRef.current) {
          URL.revokeObjectURL(url)
          return
        }
        const a = getAudio()
        currentUrlRef.current = url
        a.src = url
        setSpeaking(true)
        await a.play()
      } catch (e) {
        if (myGeneration === generationRef.current) {
          setSpeaking(false)
          const msg = (e as Error)?.message ?? String(e)
          setError(msg)
          console.error('[audio] play failed:', e)
          // TEMP DIAGNOSTIC (v50.x) — surface the real failure on-device so we
          // can see why voice fails on mobile. Remove once resolved.
          try { window.alert('Voice error: ' + msg) } catch { /* ignore */ }
        }
      }
    },
    [stop],
  )

  const play = useCallback(
    async (text: string, lang: Lang = 'en', useCase: UseCase = 'conversation') => {
      if (!text?.trim()) return
      if (getStoredMute()) return

      if (!unlockedRef.current) {
        // Browser hasn't allowed audio yet — queue it; the unlock handler
        // will fire it once the user makes their first interaction.
        pendingRef.current = { text, lang, useCase }
        return
      }

      return playInternal(text, lang, useCase)
    },
    [playInternal],
  )

  // ── Autoplay unlock + queued replay ────────────────────────────────
  useEffect(() => {
    if (unlockedRef.current) return
    const unlock = () => {
      if (unlockedRef.current) return
      unlockedRef.current = true
      // Prime the audio element with a frame of silence so future plays
      // are allowed by the browser.
      try {
        const a = getAudio()
        a.src = SILENT_WAV
        a.volume = 0
        const primePromise = a.play()
        if (primePromise) {
          primePromise
            .then(() => {
              a.pause()
              a.currentTime = 0
              a.volume = 1
            })
            .catch(() => {
              a.volume = 1
            })
        }
      } catch {
        // ignore
      }
      // Fire any queued request now that we're unlocked
      const pending = pendingRef.current
      pendingRef.current = null
      if (pending) {
        // Small delay to let the prime settle
        window.setTimeout(() => {
          void playInternal(pending.text, pending.lang, pending.useCase)
        }, 150)
      }
    }
    document.addEventListener('pointerdown', unlock, { once: true })
    document.addEventListener('keydown', unlock, { once: true })
    document.addEventListener('touchstart', unlock, { once: true })
    return () => {
      document.removeEventListener('pointerdown', unlock)
      document.removeEventListener('keydown', unlock)
      document.removeEventListener('touchstart', unlock)
    }
  }, [playInternal])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop()
    }
  }, [stop])

  return { muted, setMuted, speaking, error, play, stop }
}
