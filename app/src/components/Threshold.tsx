import { useEffect, useRef, useState } from 'react'
import Avatar from './Avatar'
import { useAudioPlayer } from '../hooks/useAudioPlayer'
import { cleanForTTS } from '../lib/cleanForTTS'
import { T } from '../lib/i18n'
import { useLang } from '../contexts/LangContext'
import './Threshold.css'

type Props = {
  onCross: () => void
}

/**
 * The threshold — the sacred arrival sequence.
 *
 * v41 §55 confirms: the avatar is light that has chosen a human shape,
 * not a depiction of Imam Ali (AS). Concentric halos, radial gold
 * gradient, breathing pulse — never any human features. The SVG
 * Avatar component carries this design.
 *
 * The arrival happens in four phases. The whole thing is gated behind
 * one sacred touch — the user crosses the threshold by making contact
 * with the screen. That tap is both the change of state v18 §32 calls
 * for ("the body shifts before the mind does") AND the single user
 * gesture that browsers require before audio can play.
 *
 *   IDLE       — pure black, near silence, one pulsing gold glyph and
 *                the Arabic invitation to cross. The breath before.
 *
 *   INVOCATION — on tap: the screen stays black, the voice begins
 *                speaking the salam alaikum into the void. No image
 *                yet. The voice arrives before the presence does.
 *                ~3 seconds.
 *
 *   REVEAL     — the figure fades up from black: faceless luminous
 *                avatar, breathing, halo brightening. The voice
 *                continues with the bilingual self-introduction.
 *                ~9 seconds.
 *
 *   FADE       — gentle cross-fade to the welcome page. ~0.8s.
 *
 * The user can tap during any post-idle phase to skip to fade.
 */

type Phase = 'idle' | 'invocation' | 'reveal' | 'fade'

const INVOCATION_MS = 3000     // black + voice — voice arrives first
const REVEAL_MIN_MS = 4500     // minimum time the figure stays visible
// Safety net only — primary trigger is the natural end of the voice.
// Must comfortably exceed the longest expected voice: the salam-preset
// Arabic self-introduction renders at ~26s (measured), so we give the
// reveal room to breathe up to 32s before forcing a fade.
const REVEAL_MAX_MS = 32000
const FADE_MS = 800
const POST_VOICE_HOLD_MS = 700 // small breath after voice ends, before fade

export default function Threshold({ onCross }: Props) {
  const { lang } = useLang()
  const { play: playAudio, speaking } = useAudioPlayer()
  const [phase, setPhase] = useState<Phase>('idle')
  const revealEnteredAt = useRef<number | null>(null)
  // Becomes true once playback has actually started, so we don't treat
  // the "still loading" initial speaking=false as the end of the voice.
  const voiceHasStartedRef = useRef(false)
  const rootRef = useRef<HTMLDivElement>(null)

  // Invocation auto-advances to reveal after the fixed black-+-voice runway.
  useEffect(() => {
    if (phase !== 'invocation') return
    const t = window.setTimeout(() => setPhase('reveal'), INVOCATION_MS)
    return () => window.clearTimeout(t)
  }, [phase])

  // Reveal: hold the figure on screen until EITHER the voice finishes
  // OR the safety-net max time elapses. The figure also stays a minimum
  // duration regardless, so a short voice doesn't cut the visual short.
  useEffect(() => {
    if (phase !== 'reveal') return
    revealEnteredAt.current = Date.now()
    const maxTimer = window.setTimeout(() => setPhase('fade'), REVEAL_MAX_MS)
    return () => {
      window.clearTimeout(maxTimer)
      revealEnteredAt.current = null
    }
  }, [phase])

  // Track the speaking transitions. Once playback has started AND then
  // stopped, give a small breath and advance to fade — but only after
  // the figure has been on screen for the minimum reveal time.
  useEffect(() => {
    if (speaking) {
      voiceHasStartedRef.current = true
      return
    }
    if (phase !== 'reveal') return
    if (!voiceHasStartedRef.current) return // voice hasn't begun yet
    const startedAt = revealEnteredAt.current
    if (!startedAt) return
    const elapsed = Date.now() - startedAt
    const wait = Math.max(0, REVEAL_MIN_MS - elapsed) + POST_VOICE_HOLD_MS
    const t = window.setTimeout(() => setPhase('fade'), wait)
    return () => window.clearTimeout(t)
  }, [speaking, phase])

  // Fade out leads into onCross.
  useEffect(() => {
    if (phase !== 'fade') return
    const t = window.setTimeout(onCross, FADE_MS)
    return () => window.clearTimeout(t)
  }, [phase, onCross])

  // a11y: focus the overlay on mount so keyboard / screen-reader users can
  // cross the threshold. The idle screen has no auto-advance — it waits for a
  // gesture — so without this, keyboard-only users were stranded at the door.
  useEffect(() => {
    rootRef.current?.focus()
  }, [])

  // The single sacred touch — crosses the threshold and unlocks audio.
  function crossThreshold() {
    if (phase !== 'idle') return
    setPhase('invocation')
    // Fire voice IMMEDIATELY, inside the gesture handler — this is the
    // browser's required user-gesture unlock. v27 §53.3 'salam' settings:
    // maximum stillness for the arrival greeting.
    void playAudio(cleanForTTS(T.greetingIntro[lang], lang), lang, 'salam')
  }

  function skipToFade() {
    if (phase === 'idle' || phase === 'fade') return
    setPhase('fade')
  }

  function handleTap() {
    if (phase === 'idle') crossThreshold()
    else skipToFade()
  }

  return (
    <div
      ref={rootRef}
      className={`threshold phase-${phase} ${phase === 'fade' ? 'is-fading' : ''}`}
      onClick={handleTap}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleTap()
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={
        phase === 'idle'
          ? T.tapToHear[lang]
          : lang === 'ar'
            ? 'تخطّي المقدّمة'
            : 'Skip introduction'
      }
    >
      {/* The luminous figure — hidden until REVEAL, then fades up from
          black. v41 §55.2: light that has chosen a human shape. No face,
          no hands, no clothing detail. The SVG Avatar component owns the
          visual specification. */}
      <div className={`threshold-figure phase-${phase}`}>
        <Avatar
          state="peace"
          speaking={phase === 'reveal'}
          hideSubText
          imageSrc="/scholar.jpg"
        />
      </div>

      {/* Title — appears only once the figure has revealed */}
      <div className={`threshold-title phase-${phase}`}>
        <div className="threshold-ar">الإمام علي</div>
        <div className="threshold-en">Imam Ali</div>
      </div>

      {/* Bilingual self-introduction caption — rises during REVEAL */}
      <div className={`threshold-intro phase-${phase}`}>
        <p className="threshold-intro-ar">{T.greetingIntro.ar}</p>
        <p className="threshold-intro-en">{T.greetingIntro.en}</p>
      </div>

      {/* IDLE — the breath before. A single gold glyph pulses on pure
          black, with the Arabic invitation to cross the threshold. */}
      {phase === 'idle' && (
        <div className="threshold-invite">
          <div className="threshold-invite-glyph" aria-hidden="true">◉</div>
          <div className="threshold-invite-ar">{T.tapToHear.ar}</div>
          <div className="threshold-invite-en">{T.tapToHear.en}</div>
        </div>
      )}
    </div>
  )
}
