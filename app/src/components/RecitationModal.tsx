// Focused recitation popup with karaoke-style word highlighting.
//
// Opens over a single du'a phrase. On open it recites the phrase in the
// selected voice and highlights each word in time so the person can FOLLOW
// ALONG. Then they can recite it themselves: as the browser recognizes
// their speech, the matched words light up live and a score is shown.
//
// Word timing for the follow-along highlight is ESTIMATED from the audio
// duration weighted by each word's length — it tracks the recitation
// closely enough to follow, without needing per-word timestamps from the
// server.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { speak } from '../lib/speak'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import { scoreRecitation, normalizeArabic, type RecitationScore } from '../lib/arabicCompare'
import type { Lang } from '../types/lang'

type Mode = 'idle' | 'playing' | 'reciting'

export default function RecitationModal({
  phrase,
  lang,
  onClose,
  onScore,
}: {
  phrase: string
  lang: Lang
  onClose: () => void
  onScore?: (score: RecitationScore) => void
}) {
  const isAr = lang === 'ar'
  const words = useMemo(
    () => phrase.trim().split(/\s+/).filter(Boolean),
    [phrase],
  )

  const speech = useSpeechRecognition()
  const [mode, setMode] = useState<Mode>('idle')
  const [highlight, setHighlight] = useState(-1) // karaoke index during playback
  const [liveScore, setLiveScore] = useState<RecitationScore | null>(null)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const urlRef = useRef<string | null>(null)
  const startsRef = useRef<number[]>([])
  const transcriptRef = useRef('')
  const recitingRef = useRef(false)

  // Estimate each word's start time from the audio duration, weighting by
  // the (normalized) letter count so longer words occupy more time.
  const computeStarts = useCallback(
    (duration: number) => {
      const weights = words.map((w) => Math.max(1, normalizeArabic(w).length))
      const total = weights.reduce((a, b) => a + b, 0) || 1
      const starts: number[] = []
      let cum = 0
      for (let i = 0; i < weights.length; i++) {
        starts.push((cum / total) * duration)
        cum += weights[i]
      }
      startsRef.current = starts
    },
    [words],
  )

  const cleanupAudio = useCallback(() => {
    const a = audioRef.current
    if (a) {
      a.pause()
      a.onloadedmetadata = null
      a.ontimeupdate = null
      a.onended = null
      audioRef.current = null
    }
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current)
      urlRef.current = null
    }
  }, [])

  const playFollowAlong = useCallback(async () => {
    cleanupAudio()
    if (speech.listening) speech.stop()
    setLiveScore(null)
    setMode('playing')
    setHighlight(-1)
    try {
      const url = await speak(phrase, 'verse')
      urlRef.current = url
      const audio = new Audio(url)
      audioRef.current = audio
      audio.onloadedmetadata = () => computeStarts(audio.duration || 0)
      audio.ontimeupdate = () => {
        const t = audio.currentTime
        const starts = startsRef.current
        let idx = -1
        for (let i = 0; i < starts.length; i++) {
          if (starts[i] <= t) idx = i
          else break
        }
        setHighlight(idx)
      }
      audio.onended = () => {
        setHighlight(-1)
        setMode('idle')
        cleanupAudio()
      }
      await audio.play()
    } catch {
      setMode('idle')
      setHighlight(-1)
    }
  }, [phrase, cleanupAudio, computeStarts, speech])

  const startReciting = useCallback(() => {
    cleanupAudio()
    setHighlight(-1)
    transcriptRef.current = ''
    setLiveScore(scoreRecitation(phrase, ''))
    recitingRef.current = true
    setMode('reciting')
    speech.start('ar', (chunk) => {
      transcriptRef.current = (transcriptRef.current + ' ' + chunk).trim()
      setLiveScore(scoreRecitation(phrase, transcriptRef.current))
    })
  }, [phrase, cleanupAudio, speech])

  // Auto-start the follow-along recitation when the popup opens (the tap
  // that opened it is the gesture browsers need to allow audio).
  useEffect(() => {
    void playFollowAlong()
    return () => {
      cleanupAudio()
      // stop recognition if still running on unmount
      try {
        speech.stop()
      } catch {
        // ignore
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // When recognition ends, finalize the score and report it upward.
  useEffect(() => {
    if (speech.listening) return
    if (!recitingRef.current) return
    recitingRef.current = false
    const final = scoreRecitation(phrase, transcriptRef.current.trim())
    setLiveScore(final)
    setMode('idle')
    if (final.total > 0) onScore?.(final)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speech.listening])

  // Live score while reciting includes the interim (not-yet-final) words.
  const shownScore: RecitationScore | null =
    mode === 'reciting'
      ? scoreRecitation(
          phrase,
          (transcriptRef.current + ' ' + speech.interim).trim(),
        )
      : liveScore

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(4, 10, 26, 0.86)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.2rem',
        direction: isAr ? 'rtl' : 'ltr',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 560,
          background: 'var(--bg)',
          border: '1px solid var(--gold)',
          borderRadius: 16,
          padding: '1.4rem 1.3rem 1.6rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 18,
          }}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            {mode === 'playing'
              ? isAr ? 'تابِع التلاوة' : 'Follow along'
              : mode === 'reciting'
                ? isAr ? 'تلُ الآن' : 'Your turn'
                : isAr ? 'تلاوة' : 'Recitation'}
          </span>
          <button
            onClick={onClose}
            aria-label={isAr ? 'إغلاق' : 'Close'}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--muted)',
              fontSize: 22,
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* the phrase, word by word */}
        <div
          style={{
            fontFamily: 'var(--font-arabic)',
            fontSize: 26,
            lineHeight: 2.4,
            direction: 'rtl',
            textAlign: 'center',
            marginBottom: 22,
            minHeight: 90,
          }}
        >
          {words.map((w, i) => {
            const playingHi = mode === 'playing' && i === highlight
            const sw = shownScore?.words[i]
            let color = 'var(--gold)'
            let background = 'transparent'
            if (playingHi) {
              color = '#0c1a3a'
              background = 'var(--gold)'
            } else if (mode !== 'playing' && sw) {
              color = sw.ok ? '#7ec1a3' : '#d98a8a'
            }
            return (
              <span
                key={i}
                style={{
                  color,
                  background,
                  borderRadius: 6,
                  padding: '0 6px',
                  margin: '0 2px',
                  transition: 'color 0.15s, background 0.15s',
                }}
              >
                {w}
              </span>
            )
          })}
        </div>

        {/* live interim while reciting */}
        {mode === 'reciting' && (
          <div
            style={{
              fontFamily: 'var(--font-arabic)',
              fontSize: 14,
              color: 'var(--muted)',
              direction: 'rtl',
              textAlign: 'center',
              minHeight: 20,
              marginBottom: 14,
            }}
          >
            {speech.interim || (isAr ? '… أنصت إليك' : '… listening')}
          </div>
        )}

        {/* score line */}
        {shownScore && shownScore.total > 0 && mode !== 'playing' && (
          <div
            style={{
              fontSize: 12,
              color: 'var(--muted)',
              textAlign: 'center',
              marginBottom: 16,
            }}
          >
            {isAr
              ? `${shownScore.matched} من ${shownScore.total} كلمة (${Math.round(
                  shownScore.accuracy * 100,
                )}٪)`
              : `${shownScore.matched} of ${shownScore.total} words (${Math.round(
                  shownScore.accuracy * 100,
                )}%)`}
          </div>
        )}

        {/* controls */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button
            onClick={playFollowAlong}
            disabled={mode === 'playing'}
            style={modalBtn(mode === 'playing')}
          >
            {mode === 'playing'
              ? isAr ? '🔊 يتلو…' : '🔊 Reciting…'
              : isAr ? '🔊 استمع وتابِع' : '🔊 Listen & follow'}
          </button>
          {speech.supported && (
            <button
              onClick={mode === 'reciting' ? () => speech.stop() : startReciting}
              style={modalBtn(false, mode === 'reciting')}
            >
              {mode === 'reciting'
                ? isAr ? '⏹ أوقف' : '⏹ Stop'
                : isAr ? '🎙️ تلُ بنفسك' : '🎙️ Recite it yourself'}
            </button>
          )}
        </div>

        {!speech.supported && (
          <div
            style={{
              fontSize: 11,
              color: 'var(--muted)',
              textAlign: 'center',
              marginTop: 12,
              lineHeight: 1.6,
            }}
          >
            {isAr
              ? 'متصفّحك لا يدعم الاستماع إلى تلاوتك، لكن يمكنك المتابعة مع الصوت.'
              : 'Your browser can\'t listen to your recitation, but you can still follow along with the audio.'}
          </div>
        )}
      </div>
    </div>
  )
}

function modalBtn(playing: boolean, reciting = false): React.CSSProperties {
  return {
    padding: '10px 18px',
    borderRadius: 10,
    border: `1px solid ${reciting ? '#c94a4a' : 'var(--gold)'}`,
    background: reciting
      ? 'rgba(201, 74, 74, 0.15)'
      : playing
        ? 'rgba(212,179,100,0.20)'
        : 'rgba(212,179,100,0.10)',
    color: reciting ? '#ff8a8a' : 'var(--gold)',
    cursor: playing ? 'default' : 'pointer',
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '0.02em',
  }
}
