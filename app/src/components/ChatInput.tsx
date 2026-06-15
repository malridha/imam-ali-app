import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import type { Lang } from '../types/lang'

type Props = {
  disabled?: boolean
  placeholder?: string
  /** UI language — controls the speech-recognition locale (ar-SA / en-US). */
  lang?: Lang
  onSend: (text: string) => void
}

export default function ChatInput({
  disabled = false,
  placeholder = 'What is on your mind tonight…',
  lang = 'en',
  onSend,
}: Props) {
  const [value, setValue] = useState('')
  const ref = useRef<HTMLTextAreaElement>(null)
  const speech = useSpeechRecognition()

  function grow() {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 100) + 'px'
  }

  function send() {
    const text = value.trim()
    if (!text || disabled) return
    if (speech.listening) speech.stop()
    onSend(text)
    setValue('')
    requestAnimationFrame(grow)
  }

  function onKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  function toggleMic() {
    if (speech.listening) {
      speech.stop()
      return
    }
    speech.start(lang, (chunk) => {
      // Append the finalized chunk to the textarea content
      setValue((prev) => {
        const sep = prev && !/\s$/.test(prev) ? ' ' : ''
        return prev + sep + chunk
      })
      requestAnimationFrame(grow)
    })
  }

  // Auto-submit when speech recognition ends with content waiting. Triggered
  // either by the silence detector (~2s quiet) inside the hook, or by the
  // user tapping the mic button to stop.
  const wasListeningRef = useRef(false)
  useEffect(() => {
    const wasListening = wasListeningRef.current
    wasListeningRef.current = speech.listening
    if (!wasListening || speech.listening) return
    // Just transitioned listening → not-listening. If we have text, send it.
    const text = value.trim()
    if (text && !disabled) {
      onSend(text)
      setValue('')
      requestAnimationFrame(grow)
    }
  }, [speech.listening, value, disabled, onSend])

  // Keep the cursor ready: focus on mount, and re-focus every time the
  // textarea becomes enabled again.
  useEffect(() => {
    if (!disabled) {
      ref.current?.focus()
    }
  }, [disabled])

  // Grow the textarea when programmatic transcript chunks land
  useEffect(() => {
    grow()
  }, [value])

  const previewText = speech.interim.trim()

  return (
    <>
      {/* Live-transcript preview — appears above the input while recording */}
      {(speech.listening || previewText) && (
        <div
          aria-live="polite"
          style={{
            margin: '0 14px 6px',
            padding: '8px 12px',
            background: 'var(--gold-d)',
            border: '1px solid var(--gold-b)',
            borderRadius: 10,
            fontSize: 13,
            color: 'var(--text)',
            lineHeight: 1.5,
            display: 'flex',
            gap: 8,
            alignItems: 'center',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#d44',
              animation: 'pulse 1.4s ease-in-out infinite',
              flexShrink: 0,
            }}
          />
          <span style={{ color: 'var(--muted)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {lang === 'ar' ? 'تستمع…' : 'Listening…'}
          </span>
          <span style={{ flex: 1, color: 'var(--text)' }}>
            {previewText || (lang === 'ar' ? 'تحدّث الآن' : 'Speak now')}
          </span>
        </div>
      )}

      <div className="chat-bottom">
        {speech.supported && (
          <button
            type="button"
            className="chat-mic"
            onClick={toggleMic}
            disabled={disabled}
            aria-label={
              speech.listening
                ? lang === 'ar'
                  ? 'إيقاف التسجيل'
                  : 'Stop listening'
                : lang === 'ar'
                  ? 'تحدّث'
                  : 'Speak'
            }
            title={
              speech.listening
                ? lang === 'ar'
                  ? 'إيقاف التسجيل'
                  : 'Stop'
                : lang === 'ar'
                  ? 'تحدّث'
                  : 'Tap to speak'
            }
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              cursor: disabled ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.2s',
              border: '1px solid var(--border)',
              background: speech.listening
                ? 'rgba(217, 119, 66, 0.18)'
                : 'transparent',
              color: speech.listening ? '#d97742' : 'var(--gold)',
              opacity: disabled ? 0.4 : 1,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z" />
            </svg>
          </button>
        )}

        <div className="chat-inp-wrap">
          <textarea
            ref={ref}
            className="chat-inp"
            rows={1}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            autoFocus
            onChange={(e) => {
              setValue(e.target.value)
              grow()
            }}
            onKeyDown={onKey}
          />
        </div>

        <button
          type="button"
          className="chat-send"
          onClick={send}
          disabled={disabled || !value.trim()}
          aria-label="Send"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
          </svg>
        </button>
      </div>
    </>
  )
}
