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

// If no speech is heard for this long, automatically stop the session so
// the caller can auto-submit. Tuned to be long enough to allow brief
// thinking pauses inside a sentence, short enough that the user doesn't
// feel held up at the end of a thought.
const SILENCE_TIMEOUT_MS = 2000

/**
 * Browser-native speech recognition wrapper. No external API cost.
 *
 *   const { supported, listening, interim, start, stop } = useSpeechRecognition()
 *   start('en', chunk => append(chunk))   // streams interim text in `interim`,
 *                                         // commits final chunks via callback.
 *   stop()                                // user-initiated end.
 */
export function useSpeechRecognition() {
  const [supported] = useState<boolean>(() => getCtor() !== null)
  const [listening, setListening] = useState(false)
  const [interim, setInterim] = useState('')
  const [error, setError] = useState<string>('')

  const recognitionRef = useRef<Recognition | null>(null)
  const onFinalRef = useRef<OnFinal | null>(null)
  const silenceTimerRef = useRef<number | null>(null)

  function armSilenceTimer() {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current)
    }
    silenceTimerRef.current = window.setTimeout(() => {
      // No fresh speech for SILENCE_TIMEOUT_MS — stop the session. The
      // recognition's onend handler will fire, and the calling component
      // can auto-submit at that point.
      recognitionRef.current?.stop()
    }, SILENCE_TIMEOUT_MS)
  }

  function clearSilenceTimer() {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current)
      silenceTimerRef.current = null
    }
  }

  const stop = useCallback(() => {
    clearSilenceTimer()
    recognitionRef.current?.stop()
  }, [])

  const start = useCallback(
    (lang: Lang, onFinal?: OnFinal) => {
      const Ctor = getCtor()
      if (!Ctor) {
        setError('Speech recognition is not supported in this browser.')
        return
      }
      if (listening) return

      onFinalRef.current = onFinal ?? null
      setError('')
      setInterim('')

      const r = new Ctor()
      r.continuous = true
      r.interimResults = true
      r.lang = lang === 'ar' ? 'ar-SA' : 'en-US'

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
        // Any new speech resets the silence countdown
        armSilenceTimer()
      }

      r.onerror = (e) => {
        // 'no-speech' is normal when the user is silent — don't surface
        if (e.error && e.error !== 'no-speech') {
          setError(e.error)
        }
      }

      r.onend = () => {
        clearSilenceTimer()
        setListening(false)
        setInterim('')
        recognitionRef.current = null
      }

      try {
        r.start()
        recognitionRef.current = r
        setListening(true)
        armSilenceTimer()
      } catch (e) {
        setError(String((e as Error)?.message ?? e))
      }
    },
    [listening],
  )

  // Best-effort cleanup if the component owning the hook unmounts mid-listen
  useEffect(() => {
    return () => {
      clearSilenceTimer()
      recognitionRef.current?.abort()
    }
  }, [])

  return { supported, listening, interim, error, start, stop }
}
