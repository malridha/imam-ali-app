import type { EmotionalState } from '../types/paths'
import type { ParsedVerse } from '../lib/parseReply'
import { T } from '../lib/i18n'
import { useLang } from '../contexts/LangContext'
import './Avatar.css'

const STATE_LABELS: Record<EmotionalState, string> = {
  grief: 'grieving · يحزن',
  anxiety: 'present · حاضر',
  peace: 'at peace · في سلام',
  joy: 'grateful · ممتنّ',
}

type Props = {
  state: EmotionalState
  verse?: ParsedVerse
  /** When true, the avatar gently pulses + a hand at the heart fades in. */
  speaking?: boolean
  /** When true, plays the walking-in animation (used by the threshold). */
  walking?: boolean
  /**
   * When true, omit the v21 §41 permanent sub-avatar caption. Defaults to
   * false (caption shown). Set true for places where the caption is
   * already rendered alongside the avatar by the parent — e.g. when the
   * avatar appears inside the cinematic threshold and a separate caption
   * sits beneath the video.
   */
  hideSubText?: boolean
  /**
   * Optional image src. When provided, replaces the SVG figure with a
   * portrait image (inheriting the av-fig classname so breath,
   * speaking, and walking animations still apply). All the surrounding
   * shell — halos, state-coloured glow, sub-avatar caption — stays
   * identical. v44 §73 cinematic portrait variant.
   */
  imageSrc?: string
}

/**
 * The avatar — a full-body robed figure in 7th-century classical Arabian
 * dress (white thobe + dark green bisht with gold trim + multi-layered
 * imamah turban). The face is pure radiant light — no features, no mouth.
 * Per the strategy doc and the brief's reading of Islamic tradition around
 * revered figures.
 *
 * Animations live in Avatar.css:
 *  - ambient breath (always on)
 *  - cloak sway (always on, very subtle)
 *  - hand at heart (fades in when `speaking`)
 *  - walking-in (when `walking` — used in the Threshold)
 *  - state-coloured aura (border + box-shadow on the circle)
 */
export default function Avatar({
  state,
  verse,
  speaking = false,
  walking = false,
  hideSubText = false,
  imageSrc,
}: Props) {
  const { lang } = useLang()
  return (
    <div className="av-zone">
      <div className="av-outer">
        <div className="av-halo" />
        <div className="av-ring" />
        <div
          className={`av-circle s-${state}${speaking ? ' is-speaking' : ''}${
            walking ? ' is-walking' : ''
          }${imageSrc ? ' has-image' : ''}`}
        >
          {imageSrc ? (
            <img
              className="av-fig av-fig-img"
              src={imageSrc}
              alt=""
              aria-hidden="true"
            />
          ) : (
          <svg
            className="av-fig"
            viewBox="0 0 80 120"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="face-light" cx="50%" cy="42%" r="60%">
                <stop offset="0%" stopColor="#fff8e0" stopOpacity="1" />
                <stop offset="35%" stopColor="#ffe8b0" stopOpacity="0.95" />
                <stop offset="75%" stopColor="#f0c980" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#c9a03a" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="face-halo" cx="50%" cy="42%" r="85%">
                <stop offset="0%" stopColor="#fff8e0" stopOpacity="0.40" />
                <stop offset="60%" stopColor="#f0c980" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#c9a03a" stopOpacity="0" />
              </radialGradient>

              {/* Bisht — outer cloak, green deepening into the night sky */}
              <linearGradient id="bisht-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a3a26" stopOpacity="0.97" />
                <stop offset="60%" stopColor="#0e2418" stopOpacity="0.96" />
                <stop offset="100%" stopColor="#08122c" stopOpacity="0.95" />
              </linearGradient>

              {/* Thobe — inner white-cream garment */}
              <linearGradient id="thobe-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff7e0" stopOpacity="0.96" />
                <stop offset="100%" stopColor="#d8c6a0" stopOpacity="0.92" />
              </linearGradient>

              {/* Turban — soft cream wrapped layers */}
              <linearGradient id="turban-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f5edd8" stopOpacity="1" />
                <stop offset="100%" stopColor="#c4b390" stopOpacity="1" />
              </linearGradient>

              {/* Hood (the cloth that wraps around behind the turban) */}
              <linearGradient id="hood-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--green)" stopOpacity="1" />
                <stop offset="100%" stopColor="#0a1f12" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* 1. Outer halo behind everything */}
            <ellipse cx="40" cy="34" rx="34" ry="38" fill="url(#face-halo)" />

            {/* 2. Bisht — outer cloak, sways gently */}
            <g className="av-bisht">
              <path
                d="M 22 56
                   Q 4 70, 2 118
                   L 28 118
                   Q 30 92, 32 70
                   L 32 56 Z
                   M 58 56
                   Q 76 70, 78 118
                   L 52 118
                   Q 50 92, 48 70
                   L 48 56 Z"
                fill="url(#bisht-grad)"
              />
              {/* Gold trim along bisht outer edges */}
              <path
                d="M 22 56 Q 4 70, 2 118"
                stroke="var(--gold)"
                strokeWidth="1"
                opacity="0.75"
                fill="none"
              />
              <path
                d="M 58 56 Q 76 70, 78 118"
                stroke="var(--gold)"
                strokeWidth="1"
                opacity="0.75"
                fill="none"
              />
              {/* Shoulder trim line */}
              <path
                d="M 22 56 L 32 56 M 48 56 L 58 56"
                stroke="var(--gold)"
                strokeWidth="0.7"
                opacity="0.6"
              />
            </g>

            {/* 3. Thobe — inner white-cream garment */}
            <path
              d="M 32 56 L 28 118 L 52 118 L 48 56 Z"
              fill="url(#thobe-grad)"
            />

            {/* 4. Belt — subtle gold band at waist */}
            <rect
              x="29.5"
              y="84"
              width="21"
              height="1.6"
              fill="var(--gold)"
              opacity="0.55"
            />

            {/* 5. Hand at heart — appears when speaking, a gesture of
                 sincerity. Same warm light as the face, kept subtle. */}
            <g className="av-hand">
              <ellipse
                cx="40"
                cy="76"
                rx="5"
                ry="3.5"
                fill="url(#face-light)"
                opacity="0.7"
              />
            </g>

            {/* 6. Hood / headscarf — wraps around the head, frames the face */}
            <path
              d="M 17 36
                 Q 17 7, 40 7
                 Q 63 7, 63 36
                 L 63 60
                 Q 58 62, 53 60
                 L 53 32
                 Q 53 19, 40 19
                 Q 27 19, 27 32
                 L 27 60
                 Q 22 62, 17 60
                 Z"
              fill="url(#hood-grad)"
            />

            {/* 7. Turban — multi-layered imamah, three visible wraps */}
            <g className="av-turban">
              {/* Bottom wrap */}
              <path
                d="M 21 18 Q 40 12, 59 18 L 59 23 Q 40 17, 21 23 Z"
                fill="url(#turban-grad)"
              />
              {/* Middle wrap (slightly forward) */}
              <path
                d="M 23 11 Q 40 6, 57 11 L 57 16 Q 40 10, 23 16 Z"
                fill="url(#turban-grad)"
              />
              {/* Top wrap (smallest, highest) */}
              <path
                d="M 27 5 Q 40 2, 53 5 L 53 9 Q 40 3, 27 9 Z"
                fill="url(#turban-grad)"
              />
              {/* Subtle gold thread accents on the wraps */}
              <path
                d="M 23 13 Q 40 8, 57 13"
                stroke="var(--gold)"
                strokeWidth="0.4"
                opacity="0.55"
                fill="none"
              />
              <path
                d="M 21 20 Q 40 15, 59 20"
                stroke="var(--gold)"
                strokeWidth="0.4"
                opacity="0.45"
                fill="none"
              />
            </g>

            {/* 8. The FACE — pure radiant light. Rendered above the
                 hood so the light glows from inside it. No features. */}
            <ellipse cx="40" cy="34" rx="14" ry="16" fill="url(#face-light)" />
          </svg>
          )}
        </div>
      </div>
      <div className="av-state">{STATE_LABELS[state]}</div>
      {/* v21 §41 — permanent sub-avatar text. Theologically protective
          layer, always present unless the parent renders its own. */}
      {!hideSubText && (
        <div className="av-subtext">{T.subAvatarText[lang]}</div>
      )}
      {verse && (
        <div className="av-verse" key={verse.arabic}>
          <div className="av-ar">{verse.arabic}</div>
          <div className="av-src">{verse.english}</div>
        </div>
      )}
    </div>
  )
}
