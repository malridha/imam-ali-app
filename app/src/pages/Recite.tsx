// Du'a Recitation coach.
//
// Pick a du'a, then learn it phrase by phrase: tap "Listen" to hear the
// companion recite a line in the selected voice, then "Recite" to say it
// yourself. The app listens (browser speech recognition, Arabic), aligns
// what it heard against the correct words, and shows which words matched.
// Finally, the companion can give gentle, encouraging guidance.
//
// HONEST SCOPE: this is a WORD-ACCURACY coach, not a tajweed grader. The
// browser can only return an approximate transcription — it cannot judge
// pronunciation, elongation, or articulation. It helps you learn the
// *words* of a du'a; it is no substitute for a qari.

import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'
import ServiceNav from '../components/ServiceNav'
import AppHeader from '../components/AppHeader'
import RecitationModal from '../components/RecitationModal'
import { BASELINE_DUAS } from '../lib/prompts/baseline-corpus'
import { useAudioPlayer } from '../hooks/useAudioPlayer'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import { splitIntoPhrases, type RecitationScore } from '../lib/arabicCompare'
import { callClaude } from '../lib/claude'
import { cleanForTTS } from '../lib/cleanForTTS'
import { getOrCreateUserId } from '../lib/userId'

export default function Recite() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const isAr = lang === 'ar'
  const [params] = useSearchParams()
  const duaParam = params.get('dua')
  const duaIdx = duaParam !== null ? Number(duaParam) : NaN
  const dua =
    Number.isInteger(duaIdx) && duaIdx >= 0 && duaIdx < BASELINE_DUAS.length
      ? BASELINE_DUAS[duaIdx]
      : null

  if (!dua) {
    return <DuaPicker />
  }

  return <ReciteOne key={duaIdx} dua={dua} onBack={() => navigate('/recite')} lang={lang} isAr={isAr} />
}

// ── Picker: list the du'as to choose one to recite ────────────────────
function DuaPicker() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const isAr = lang === 'ar'
  return (
    <>
      <AppHeader isSubPage />
      <main style={pageStyle(isAr)}>
        <BackButton onClick={() => navigate('/teachings')} label={isAr ? 'التعاليم' : 'Teachings'} />
        <Header
          kicker={isAr ? 'تلاوة' : 'Recitation'}
          title={isAr ? 'تعلّم تلاوة الأدعية' : 'Learn to Recite the Du\'as'}
          sub={
            isAr
              ? 'اختر دعاءً لتتلوه مع الرفيق، عبارةً بعبارة.'
              : 'Choose a du\'a to recite with the companion, phrase by phrase.'
          }
          isAr={isAr}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {BASELINE_DUAS.map((d, i) => (
            <button
              key={i}
              onClick={() => navigate(`/recite?dua=${i}`)}
              style={{
                textAlign: isAr ? 'right' : 'left',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderInlineStart: '3px solid var(--gold)',
                borderRadius: 10,
                padding: '12px 14px',
                cursor: 'pointer',
                color: 'var(--text)',
                direction: isAr ? 'rtl' : 'ltr',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-arabic)',
                  fontSize: 15,
                  color: 'var(--gold)',
                  direction: 'rtl',
                  textAlign: 'right',
                  lineHeight: 1.9,
                  marginBottom: 6,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {d.arabic}
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted)' }}>— {d.source}</div>
            </button>
          ))}
        </div>
      </main>
      <ServiceNav />
    </>
  )
}

// ── Reciting a single du'a ────────────────────────────────────────────
function ReciteOne({
  dua,
  onBack,
  lang,
  isAr,
}: {
  dua: { arabic: string; english: string; source: string }
  onBack: () => void
  lang: 'en' | 'ar'
  isAr: boolean
}) {
  const phrases = useMemo(() => splitIntoPhrases(dua.arabic), [dua.arabic])
  const { play, stop: stopAudio } = useAudioPlayer()
  const speech = useSpeechRecognition()
  const userId = useMemo(() => getOrCreateUserId(), [])

  const [scores, setScores] = useState<Record<number, RecitationScore>>({})
  const [listeningId, setListeningId] = useState<string | null>(null)
  const [modalIdx, setModalIdx] = useState<number | null>(null)

  // Companion guidance state
  const [feedback, setFeedback] = useState('')
  const [feedbackBusy, setFeedbackBusy] = useState(false)
  const [feedbackErr, setFeedbackErr] = useState('')

  function listen(i: number, text: string) {
    stopAudio()
    setListeningId(null)
    const id = `${i}`
    setListeningId(id)
    void play(text, lang, 'verse').finally(() => setListeningId(null))
  }

  // Open the focused recitation popup (follow-along + recite) for a phrase.
  function openRecite(i: number) {
    stopAudio()
    setListeningId(null)
    setModalIdx(i)
  }

  async function getGuidance() {
    setFeedbackErr('')
    setFeedbackBusy(true)
    setFeedback('')
    const heard = phrases
      .map((_, i) => (scores[i] ? scores[i].words.filter((w) => w.ok).map((w) => w.word).join(' ') : ''))
      .filter(Boolean)
      .join(' / ')
    const matched = Object.values(scores).reduce((a, s) => a + s.matched, 0)
    const total = Object.values(scores).reduce((a, s) => a + s.total, 0)
    const pct = total ? Math.round((matched / total) * 100) : 0

    const content =
      `Correct du'a:\n${dua.arabic}\n\n` +
      (heard
        ? `Words I recited correctly (per phrase):\n${heard}\n\n`
        : 'I have not recited any phrases yet.\n\n') +
      `Approximate accuracy so far: ${pct}%.`

    try {
      const { text } = await callClaude({
        mode: 'recite',
        messages: [{ role: 'user', content }],
        lang,
        userId,
        maxTokens: 220,
      })
      setFeedback(text)
      void play(cleanForTTS(text, lang), lang, 'dua_intro')
    } catch (e) {
      setFeedbackErr((e as Error).message || String(e))
    } finally {
      setFeedbackBusy(false)
    }
  }

  const anyScored = Object.keys(scores).length > 0

  return (
    <>
      <AppHeader isSubPage />
      <main style={pageStyle(isAr)}>
        <BackButton onClick={onBack} label={isAr ? 'كل الأدعية' : 'All du\'as'} />

        <Header
          kicker={isAr ? 'تلاوة' : 'Recitation'}
          title={isAr ? 'تلاوة مع الرفيق' : 'Recite with the Companion'}
          sub={dua.source}
          isAr={isAr}
        />

        {/* English meaning */}
        <div
          style={{
            fontSize: 12.5,
            color: 'var(--cream)',
            fontStyle: 'italic',
            lineHeight: 1.6,
            textAlign: 'center',
            margin: '0 auto 1.2rem',
            maxWidth: 520,
          }}
        >
          {dua.english}
        </div>

        {!speech.supported && (
          <Notice isAr={isAr}>
            {isAr
              ? 'متصفّحك لا يدعم الاستماع إلى التلاوة. لا يزال بإمكانك سماع كل عبارة بالضغط على «استمع».'
              : 'Your browser does not support recitation listening. You can still hear each phrase with "Listen".'}
          </Notice>
        )}

        {/* Phrases */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {phrases.map((phrase, i) => {
            const score = scores[i]
            return (
              <div
                key={i}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderInlineStart: `3px solid ${
                    score ? scoreColor(score.accuracy) : 'var(--gold)'
                  }`,
                  borderRadius: 10,
                  padding: '14px 16px',
                }}
              >
                {/* Arabic phrase — colour words after a recitation */}
                <div
                  style={{
                    fontFamily: 'var(--font-arabic)',
                    fontSize: 19,
                    lineHeight: 2.1,
                    direction: 'rtl',
                    textAlign: 'right',
                    marginBottom: 12,
                  }}
                >
                  {score
                    ? score.words.map((w, wi) => (
                        <span
                          key={wi}
                          style={{
                            color: w.ok ? '#7ec1a3' : '#d98a8a',
                            margin: '0 2px',
                          }}
                        >
                          {w.word}{' '}
                        </span>
                      ))
                    : <span style={{ color: 'var(--gold)' }}>{phrase}</span>}
                </div>

                {/* Score line */}
                {score && (
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 10 }}>
                    {isAr
                      ? `${score.matched} من ${score.total} كلمة (${Math.round(score.accuracy * 100)}٪)`
                      : `${score.matched} of ${score.total} words (${Math.round(score.accuracy * 100)}%)`}
                  </div>
                )}

                {/* Controls */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button onClick={() => listen(i, phrase)} style={ctrlStyle(listeningId === `${i}`)}>
                    {listeningId === `${i}`
                      ? isAr ? '🔊 يتلو…' : '🔊 Reciting…'
                      : isAr ? '🔊 استمع' : '🔊 Listen'}
                  </button>
                  {speech.supported && (
                    <button onClick={() => openRecite(i)} style={ctrlStyle(false)}>
                      {isAr ? '🎙️ تلُ الآن' : '🎙️ Recite'}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Companion guidance */}
        {speech.supported && (
          <div style={{ marginTop: '1.6rem' }}>
            <button
              onClick={getGuidance}
              disabled={feedbackBusy || !anyScored}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 10,
                border: '1px solid var(--gold)',
                background: anyScored ? 'rgba(212,179,100,0.12)' : 'transparent',
                color: 'var(--gold)',
                cursor: anyScored && !feedbackBusy ? 'pointer' : 'default',
                opacity: anyScored ? 1 : 0.5,
                fontSize: 13,
                letterSpacing: '0.03em',
              }}
            >
              {feedbackBusy
                ? isAr ? 'الرفيق يستمع…' : 'The companion is listening…'
                : isAr ? '🕊️ اطلب إرشاد الرفيق' : '🕊️ Ask the companion for guidance'}
            </button>

            {!anyScored && (
              <div style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center', marginTop: 8 }}>
                {isAr
                  ? 'تلُ عبارةً واحدة على الأقل لتطلب الإرشاد.'
                  : 'Recite at least one phrase to ask for guidance.'}
              </div>
            )}

            {feedback && (
              <div
                style={{
                  marginTop: 14,
                  padding: '14px 16px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderInlineStart: '3px solid var(--gold)',
                  borderRadius: 10,
                  fontSize: 13.5,
                  lineHeight: 1.7,
                  color: 'var(--cream)',
                  direction: isAr ? 'rtl' : 'ltr',
                }}
              >
                {feedback}
              </div>
            )}
            {feedbackErr && (
              <div style={{ fontSize: 11, color: '#cc6644', textAlign: 'center', marginTop: 8 }}>
                {feedbackErr}
              </div>
            )}
          </div>
        )}
      </main>
      <ServiceNav />

      {modalIdx !== null && (
        <RecitationModal
          phrase={phrases[modalIdx]}
          lang={lang}
          onClose={() => setModalIdx(null)}
          onScore={(score) =>
            setScores((s) => ({ ...s, [modalIdx]: score }))
          }
        />
      )}
    </>
  )
}

// ── small shared bits ─────────────────────────────────────────────────
function pageStyle(isAr: boolean): React.CSSProperties {
  return {
    minHeight: '100dvh',
    background: 'var(--bg)',
    color: 'var(--text)',
    maxWidth: 720,
    margin: '0 auto',
    padding: '1rem 1rem 5rem',
    direction: isAr ? 'rtl' : 'ltr',
  }
}

function BackButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: 11,
        color: 'var(--gold)',
        padding: '6px 12px',
        border: '1px solid var(--border)',
        borderRadius: 20,
        background: 'transparent',
        cursor: 'pointer',
        marginBottom: '1rem',
      }}
    >
      ↩ {label}
    </button>
  )
}

function Header({
  kicker,
  title,
  sub,
  isAr,
}: {
  kicker: string
  title: string
  sub: string
  isAr: boolean
}) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '1.3rem' }}>
      <div
        style={{
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: 8,
        }}
      >
        {kicker}
      </div>
      <h1
        style={{
          fontSize: 24,
          color: 'var(--gold)',
          fontWeight: 700,
          margin: 0,
          fontFamily: isAr ? 'var(--font-arabic)' : undefined,
          lineHeight: 1.4,
        }}
      >
        {title}
      </h1>
      <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6, letterSpacing: '0.04em' }}>
        {sub}
      </div>
    </div>
  )
}

function Notice({ children, isAr }: { children: React.ReactNode; isAr: boolean }) {
  return (
    <div
      style={{
        fontSize: 12,
        color: '#aa6b3a',
        background: 'rgba(217, 119, 66, 0.10)',
        border: '1px solid rgba(217, 119, 66, 0.25)',
        borderRadius: 8,
        padding: '10px 12px',
        marginBottom: '1.2rem',
        lineHeight: 1.6,
        direction: isAr ? 'rtl' : 'ltr',
      }}
    >
      {children}
    </div>
  )
}

function ctrlStyle(active: boolean, activeColor = 'var(--gold)'): React.CSSProperties {
  return {
    padding: '6px 14px',
    borderRadius: 6,
    border: '1px solid var(--border)',
    background: active ? 'rgba(201, 74, 74, 0.15)' : 'transparent',
    color: active ? activeColor : 'var(--gold)',
    cursor: 'pointer',
    fontSize: 11,
    letterSpacing: '0.03em',
  }
}

function scoreColor(accuracy: number): string {
  if (accuracy >= 0.8) return '#7ec1a3'
  if (accuracy >= 0.5) return '#d4b364'
  return '#d98a8a'
}
