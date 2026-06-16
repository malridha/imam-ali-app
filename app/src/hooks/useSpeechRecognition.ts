import { useCallback, useEffect, useRef, useState } from 'react'
import type { Lang } from '../types/lang'

// The browsers we care about (Safari, Chrome) expose this as either
// `SpeechRecognition` or `webkitSpeechRecognition`. We type it loosely.
type RecognitionEventResult = {
  isFinal: boolean
  0: { transcript: string }
}
type RecognitionEvent = {
  resultIndex: number
  results: ArrayLike<RecognitionEventResult>
}
type Recognition = {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((e: RecognitionEvent) => void) | null
  onend: (() => void) | null
  onerror: ((e: { error?: string }) => void) | null
}
type RecognitionCtor = new () => Recognition

function getCtor(): RecognitionCtor | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as {
    SpeechRecognition?: RecognitionCtor
    webkitSpeechRecognition?: RecognitionCtor
  }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

type OnFinal = (chunk: string) => void

export type StartOptions = {
  /**
   * Keep listening across the engine's natural pauses — only stop when the
   * caller invokes stop() (or the safety cap elapses). Used for RECITATION,
   * where the user decides when they're done. When false (the default, used
   * by chat), a short silence auto-stops the session so the caller can
   * auto-submit.
   */
  holdUntilStopped?: boolean
}

// Chat: stop after this much silence so the message can auto-submit.
const SILENCE_TIMEOUT_MS = 2000
// Recitation hold mode: a safety cap so the mic can't stay open forever if
// the user walks away without tapping Stop.
const HOLD_MAX_MS = 180000 // 3 minutes

/**
 * Browser-native speech recognition wrapper. No external API cost.
 *
 *   const { supported, listening, interim, start, stop } = useSpeechRecognition()
 *   start('en', chunk => append(chunk))                     // chat: auto-stops on a pause
 *   start('ar', chunk => append(chunk), { holdUntilStopped: true })  // recitation: until stop()
 *   stop()                                                  // user-initiated end.
 */
export function useSpeechRecognition() {
  const [supported] = useState<boolean>(() => getCtor() !== null)
  const [listening, setListening] = useState(false)
  const [interim, setInterim] = useState('')
  const [error, setError] = useState<string>('')

  const recognitionRef = useRef<Recognition | null>(null)
  const onFinalRef = useRef<OnFinal | null>(null)
  const silenceTimerRef = useRef<number | null>(null)
  const maxTimerRef = useRef<number | null>(null)
  const langRef = useRef<Lang>('en')
  const holdRef = useRef(false) // keep listening until stop()
  const userStoppedRef = useRef(false)
  const fatalRef = useRef(false) // a real error occurred — don't auto-restart

  function clearSilenceTimer() {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current)
      silenceTimerRef.current = null
    }
  }

  function clearMaxTimer() {
    if (maxTimerRef.current) {
      clearTimeout(maxTimerRef.current)
      maxTimerRef.current = null
    }
  }

  function armSilenceTimer() {
    clearSilenceTimer()
    silenceTimerRef.current = window.setTimeout(() => {
      // No fresh speech for SILENCE_TIMEOUT_MS — stop the session. The
      // recognition's onend handler fires, and the chat can auto-submit.
      recognitionRef.current?.stop()
    }, SILENCE_TIMEOUT_MS)
  }

  const finishOff = useCallback(() => {
    clearSilenceTimer()
    clearMaxTimer()
    setListening(false)
    setInterim('')
  }, [])

  const stop = useCallback(() => {
    userStoppedRef.current = true
    clearSilenceTimer()
    clearMaxTimer()
    recognitionRef.current?.stop()
  }, [])

  // Create and start one recognition instance. In hold mode this is called
  // again from onend whenever the engine pauses, so listening is continuous.
  const beginRecognition = useCallback(() => {
    const Ctor = getCtor()
    if (!Ctor) {
      setError('Speech recognition is not supported in this browser.')
      return
    }
    const r = new Ctor()
    r.continuous = true
    r.interimResults = true
    r.lang = langRef.current === 'ar' ? 'ar-SA' : 'en-US'

    r.onresult = (event: RecognitionEvent) => {
      let interimText = ''
      let finalText = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        const transcript = result[0].transcript
        if (result.isFinal) finalText += transcript
        else interimText += transcript
      }
      if (finalText) {
        onFinalRef.current?.(finalText)
        setInterim('')
      } else {
        setInterim(interimText)
      }
      // Only the chat (non-hold) mode auto-stops on silence.
      if (!holdRef.current) armSilenceTimer()
    }

    r.onerror = (e) => {
      const err = e.error
      // 'no-speech' is normal when the user is briefly silent; 'aborted'
      // fires when we stop() on purpose. Anything else is a real failure.
      if (err && err !== 'no-speech' && err !== 'aborted') {
        setError(err)
        fatalRef.current = true
      }
    }

    r.onend = () => {
      clearSilenceTimer()
      recognitionRef.current = null
      // Hold mode: the engine paused on its own but the user hasn't ended —
      // restart so recitation keeps going until they tap Stop.
      if (holdRef.current && !userStoppedRef.current && !fatalRef.current) {
        try {
          beginRecognition()
          return
        } catch {
          // fall through to finish
        }
      }
      finishOff()
    }

    r.start()
    recognitionRef.current = r
    setListening(true)
  }, [finishOff])

  const start = useCallback(
    (lang: Lang, onFinal?: OnFinal, opts?: StartOptions) => {
      if (!getCtor()) {
        setError('Speech recognition is not supported in this browser.')
        return
      }
      if (listening) return

      onFinalRef.current = onFinal ?? null
      langRef.current = lang
      holdRef.current = !!opts?.holdUntilStopped
      userStoppedRef.current = false
      fatalRef.current = false
      setError('')
      setInterim('')

      try {
        beginRecognition()
        if (holdRef.current) {
          // Safety cap so the mic can't stay open indefinitely.
          clearMaxTimer()
          maxTimerRef.current = window.setTimeout(() => stop(), HOLD_MAX_MS)
        } else {
          armSilenceTimer()
        }
      } catch (e) {
        setError(String((e as Error)?.message ?? e))
      }
    },
    [listening, beginRecognition, stop],
  )

  // Best-effort cleanup if the component owning the hook unmounts mid-listen
  useEffect(() => {
    return () => {
      userStoppedRef.current = true
      clearSilenceTimer()
      clearMaxTimer()
      recognitionRef.current?.abort()
    }
  }, [])

  return { supported, listening, interim, error, start, stop }
}
