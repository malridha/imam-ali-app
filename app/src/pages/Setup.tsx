import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'
import { useAudioPlayer } from '../hooks/useAudioPlayer'
import { T } from '../lib/i18n'
import { LANG_LABELS } from '../types/lang'
import ChatInput from '../components/ChatInput'
import ServiceNav from '../components/ServiceNav'
import Threshold from '../components/Threshold'
import { useTSP } from '../contexts/TSPContext'
import { findTodaysSurfacedEvent } from '../lib/tsp/calendar-surface'
import '../components/Chat.css'

const THRESHOLD_SHOWN_KEY = 'ya-imam-ali:threshold-crossed'

export default function Setup() {
  const navigate = useNavigate()
  const { lang, setLang } = useLang()
  useAudioPlayer() // mount the audio player so the gesture unlock fires
  const { tsp } = useTSP()
  const surfaced = findTodaysSurfacedEvent(tsp)

  // Show the threshold animation on first visit of the browser session.
  // sessionStorage means: once per tab/session, not on every internal
  // navigation. Crossing the threshold each time the app is opened is the
  // shrine ritual; doing it on every back-and-forth would just be friction.
  //
  // The self-introduction (voice + caption) happens *inside* the threshold,
  // so there is no longer a separate greeting on this page once it lifts.
  const [showThreshold, setShowThreshold] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(THRESHOLD_SHOWN_KEY) !== '1'
    } catch {
      return true
    }
  })

  function crossThreshold() {
    try {
      sessionStorage.setItem(THRESHOLD_SHOWN_KEY, '1')
    } catch {
      // ignore
    }
    setShowThreshold(false)
  }

  // v15 — no path classification. The person walks in and speaks. We
  // hand off to /chat with whatever they said as the first message.
  function handleFreeTextSend(text: string) {
    navigate(`/chat?q=${encodeURIComponent(text)}`)
  }

  function enterChat() {
    navigate('/chat')
  }

  return (
    <>
      {showThreshold && <Threshold onCross={crossThreshold} />}
    <main
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.25rem 1.5rem 5rem',
        background: 'var(--bg)',
        maxWidth: 520,
        margin: '0 auto',
      }}
    >
      {/* Top utility bar — only the language toggle now. All other
          sections live in the bottom service nav. */}
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          display: 'flex',
          gap: 8,
          marginBottom: '1rem',
        }}
      >
        <button
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          title={`Switch to ${LANG_LABELS[lang === 'en' ? 'ar' : 'en']}`}
          style={{
            fontSize: 10,
            color: 'var(--gold)',
            padding: '4px 12px',
            border: '1px solid var(--border)',
            borderRadius: 20,
            background: 'transparent',
            cursor: 'pointer',
            marginInlineEnd: 'auto',
          }}
        >
          {LANG_LABELS[lang === 'en' ? 'ar' : 'en']}
        </button>
      </div>

      {/* Centered welcome content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          flex: 1,
          justifyContent: 'center',
          paddingBottom: '0.5rem',
        }}
      >
        {/* v44 — Welcome figure is the cinematic Soul Conversation
            video at /welcome.mp4 (1080×1920 portrait, 36s). Autoplays
            muted on load (iOS Safari requirement), loops as ambient
            presence. Tap the speaker icon to unmute and hear the
            voice in the video. The v21 §41 sub-avatar attribution
            sits beneath. */}
        <WelcomeVideo />

        {/* v21 §41 / v44 §73.3 — permanent attribution caption.
            Mirrors the Avatar component's built-in caption now that
            the SVG avatar is no longer rendered here. */}
        <div
          style={{
            fontSize: 11,
            color: 'var(--gold)',
            opacity: 0.7,
            textAlign: 'center',
            marginTop: 6,
            maxWidth: 320,
            lineHeight: 1.5,
          }}
        >
          {T.subAvatarText[lang]}
        </div>

        {/* v24 §49.3 + §50.5 — TSP-aware calendar surfacing.
            When today matches a calendar event and the user's TSP
            indicates resonance with it (universal events always pass),
            surface a discreet invitation to the calendar entry. */}
        {surfaced && (
          <button
            onClick={() => navigate(`/calendar`)}
            style={{
              marginTop: '1.25rem',
              padding: '10px 16px',
              maxWidth: 380,
              width: '100%',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderLeft: '3px solid var(--gold)',
              borderRadius: 10,
              color: 'var(--text)',
              cursor: 'pointer',
              textAlign: lang === 'ar' ? 'right' : 'left',
              direction: lang === 'ar' ? 'rtl' : 'ltr',
            }}
          >
            <div
              style={{
                fontSize: 9,
                color: 'var(--gold)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 4,
              }}
            >
              {lang === 'ar' ? 'اليوم' : 'Today'}
              {' · '}
              {surfaced.event.type === 'celebration'
                ? lang === 'ar' ? 'احتفال' : 'Celebration'
                : lang === 'ar' ? 'ذكرى' : 'Observance'}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--cream)', lineHeight: 1.35 }}>
              {lang === 'ar' ? surfaced.event.name.ar : surfaced.event.name.en}
            </div>
            <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4 }}>
              {lang === 'ar'
                ? 'لديّ شيء أقوله لك في هذا اليوم →'
                : 'I have something for you on this day →'}
            </div>
          </button>
        )}

        {/* v15 — no path picker. A single open door. The self-introduction
            (voice + caption) is delivered during the threshold, so there is
            no static greeting block here. */}
        <button
          onClick={enterChat}
          style={{
            marginTop: '1.75rem',
            background: 'var(--green)',
            color: 'var(--cream)',
            border: '1px solid var(--border)',
            borderRadius: 999,
            padding: '12px 28px',
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            boxShadow: '0 0 28px rgba(201, 160, 58, 0.18)',
          }}
        >
          {T.enterCompanion[lang]}
        </button>

        {/* v46 §75 — Featured Teachings + Biography links on home */}
        <div
          style={{
            display: 'flex',
            gap: 10,
            marginTop: '1rem',
            width: '100%',
            maxWidth: 420,
          }}
        >
          <button
            onClick={() => navigate('/teachings')}
            style={{
              flex: 1,
              padding: '10px 14px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderLeft: '3px solid var(--gold)',
              borderRadius: 10,
              color: 'var(--text)',
              cursor: 'pointer',
              textAlign: lang === 'ar' ? 'right' : 'left',
              direction: lang === 'ar' ? 'rtl' : 'ltr',
            }}
          >
            <div
              style={{
                fontSize: 9,
                color: 'var(--gold)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 3,
              }}
            >
              {lang === 'ar' ? 'مكتبة' : 'Library'}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--cream)' }}>
              {lang === 'ar' ? 'الحكمة والأدعية' : 'Wisdom & Du\'as'}
            </div>
            <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>
              {lang === 'ar' ? 'تعاليمه — اقرأها أو استمع' : 'His teachings — read or listen'}
            </div>
          </button>
          <button
            onClick={() => navigate('/biography')}
            style={{
              flex: 1,
              padding: '10px 14px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderLeft: '3px solid var(--gold)',
              borderRadius: 10,
              color: 'var(--text)',
              cursor: 'pointer',
              textAlign: lang === 'ar' ? 'right' : 'left',
              direction: lang === 'ar' ? 'rtl' : 'ltr',
            }}
          >
            <div
              style={{
                fontSize: 9,
                color: 'var(--gold)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 3,
              }}
            >
              {lang === 'ar' ? 'سيرة' : 'A Life'}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--cream)' }}>
              {lang === 'ar' ? 'حياة الإمام عليّ' : 'Imam Ali\'s life'}
            </div>
            <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>
              {lang === 'ar' ? 'مولده وأهله ومسيرته' : 'Birth, family, journey'}
            </div>
          </button>
        </div>

        {/* "or just tell me" divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            width: '100%',
            maxWidth: 420,
            margin: '24px 0 10px',
          }}
        >
          <div style={{ flex: 1, height: 1, background: 'var(--gold-b)' }} />
          <span
            style={{
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            {T.orJustTellMe[lang]}
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--gold-b)' }} />
        </div>

      </div>

      {/* Sticky chat-style input at the bottom */}
      <div
        style={{
          width: '100%',
          maxWidth: 520,
          background: 'var(--bg)',
          marginInline: '-1.5rem',
          paddingInline: '1.5rem',
        }}
      >
        <ChatInput
          onSend={handleFreeTextSend}
          lang={lang}
          placeholder={T.tellMePlaceholder[lang]}
        />
      </div>

      {/* v41 §70.4 — Privacy policy link. Discreet, footer-style. */}
      <button
        onClick={() => navigate('/privacy')}
        style={{
          marginTop: 12,
          fontSize: 10,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {T.privacyLink[lang]}
      </button>
    </main>
    <ServiceNav />
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────
// v44 — Cinematic welcome video. Autoplays muted (iOS Safari rule),
// loops as ambient presence. A small speaker glyph toggles mute on
// user tap so the voice in the video can be heard when wanted.
// ─────────────────────────────────────────────────────────────────────
function WelcomeVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  // Ensure autoplay actually starts on mount even if the browser
  // ignored the autoPlay attribute (some Safari versions).
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().catch(() => {
      // muted autoplay should never fail; if it does we silently
      // surface the first frame and let the user tap to start.
    })
  }, [])

  function toggleMute() {
    const v = videoRef.current
    if (!v) return
    const next = !muted
    v.muted = next
    setMuted(next)
    // Unmuting requires a fresh play() call inside the gesture
    // handler on iOS Safari.
    if (!next) v.play().catch(() => {})
  }

  return (
    <div
      style={{
        position: 'relative',
        width: 'min(320px, 78vw)',
        aspectRatio: '9 / 16',
        borderRadius: 14,
        overflow: 'hidden',
        border: '1px solid var(--border)',
        boxShadow:
          '0 0 40px 6px rgba(212, 179, 100, 0.18), 0 0 120px 24px rgba(0, 0, 0, 0.45)',
        marginBottom: '0.5rem',
        background: '#02050d',
      }}
    >
      <video
        ref={videoRef}
        src="/welcome.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* Subtle vignette so the video integrates into the deep blue surround */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 60%, rgba(12, 26, 58, 0.45) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Speaker control — bottom-right, gentle gold. */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? 'Hear the welcome' : 'Mute'}
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'rgba(12, 26, 58, 0.55)',
          border: '1px solid var(--border)',
          color: 'var(--gold)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="currentColor"
          aria-hidden="true"
        >
          {muted ? (
            <path d="M16.5 12l3.5-3.5-1.4-1.4L15 10.6 11.5 7H7v10h4.5l3.5-3.6 3.6 3.6 1.4-1.4L16.5 12z" />
          ) : (
            <path d="M3 9v6h4l5 4V5L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4-1 7-4.66 7-8.77S18 4.23 14 3.23z" />
          )}
        </svg>
      </button>
    </div>
  )
}
