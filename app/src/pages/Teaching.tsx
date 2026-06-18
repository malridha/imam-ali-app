// Single-teaching page. Instead of one long scroll, each teaching opens
// on its own page — read it, hear it, ask the companion to explain it,
// discuss it, or (for du'as) recite it, then flip to the next one.
//
// Addressed by ?type=wisdom|dua|poetry&i=<index> into the matching array.

import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'
import ServiceNav from '../components/ServiceNav'
import { useReadAloud } from '../hooks/useReadAloud'
import { ALL_WISDOM } from '../data/teachings'
import {
  BASELINE_DUAS,
  BASELINE_POETRY,
  type BaselineEntry,
} from '../lib/prompts/baseline-corpus'
import { callClaude } from '../lib/claude'
import { getOrCreateUserId } from '../lib/userId'

type TType = 'wisdom' | 'dua' | 'poetry'

function arrayFor(type: TType): BaselineEntry[] {
  if (type === 'dua') return BASELINE_DUAS
  if (type === 'poetry') return BASELINE_POETRY
  return ALL_WISDOM
}

const KICKER: Record<TType, { en: string; ar: string }> = {
  wisdom: { en: 'Teaching', ar: 'تعليم' },
  dua: { en: "Du'a", ar: 'دعاء' },
  poetry: { en: 'From the Diwan', ar: 'من الديوان' },
}

export default function Teaching() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const isAr = lang === 'ar'
  const [params, setParams] = useSearchParams()

  const rawType = params.get('type')
  const type: TType = rawType === 'dua' || rawType === 'poetry' ? rawType : 'wisdom'
  const list = arrayFor(type)
  const i = Math.max(0, Math.min(list.length - 1, Number(params.get('i') ?? 0) || 0))
  const entry = list[i]

  const { speakingId, toggle: toggleReadAloud } = useReadAloud()
  const userId = useMemo(() => getOrCreateUserId(), [])

  const [explanation, setExplanation] = useState('')
  const [explainBusy, setExplainBusy] = useState(false)
  const [explainErr, setExplainErr] = useState('')

  if (!entry) {
    return (
      <>
        <main style={pageStyle(isAr)}>
          <Back onClick={() => navigate('/teachings')} isAr={isAr} />
          <p style={{ color: 'var(--muted)', textAlign: 'center', marginTop: '2rem' }}>
            {isAr ? 'لم يُعثر على هذا التعليم.' : 'That teaching was not found.'}
          </p>
        </main>
        <ServiceNav />
      </>
    )
  }

  function go(delta: number) {
    const next = i + delta
    if (next < 0 || next >= list.length) return
    setExplanation('')
    setExplainErr('')
    setParams({ type, i: String(next) }, { replace: true })
  }

  function discuss() {
    const seed = isAr
      ? `أودّ أن أناقش هذا التعليم من «${entry.source}»: «${entry.arabic}» — «${entry.english}». ما معناه، وكيف أعيشه؟`
      : `I'd like to discuss this teaching from ${entry.source}: "${entry.arabic}" — "${entry.english}". What does it mean, and how might I live it?`
    navigate(`/chat?q=${encodeURIComponent(seed)}`)
  }

  async function explain() {
    setExplainErr('')
    setExplainBusy(true)
    setExplanation('')
    try {
      const { text } = await callClaude({
        mode: 'teaching',
        messages: [
          {
            role: 'user',
            content: `Teaching:\n${entry.arabic}\n${entry.english}\nSource: ${entry.source}`,
          },
        ],
        lang,
        userId,
        maxTokens: 240,
      })
      setExplanation(text)
    } catch (e) {
      setExplainErr((e as Error).message || String(e))
    } finally {
      setExplainBusy(false)
    }
  }

  return (
    <>
      <main style={pageStyle(isAr)}>
        <Back onClick={() => navigate('/teachings')} isAr={isAr} />

        {/* position + kicker */}
        <div style={{ textAlign: 'center', marginBottom: 18 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            {KICKER[type][lang]} · {i + 1} / {list.length}
          </div>
        </div>

        {/* the teaching */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderInlineStart: '3px solid var(--gold)',
            borderRadius: 12,
            padding: '22px 20px',
            marginBottom: 18,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-arabic)',
              fontSize: 24,
              lineHeight: 2.3,
              color: 'var(--gold)',
              direction: 'rtl',
              textAlign: 'center',
              whiteSpace: 'pre-line',
              marginBottom: 18,
            }}
          >
            {entry.arabic}
          </div>
          <div
            style={{
              fontSize: 15,
              lineHeight: 1.8,
              color: 'var(--cream)',
              fontStyle: 'italic',
              textAlign: 'center',
              marginBottom: 16,
            }}
          >
            {entry.english}
          </div>
          <div style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center', letterSpacing: '0.05em' }}>
            — {entry.source}
          </div>
        </div>

        {/* actions */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 16 }}>
          <button
            onClick={() => toggleReadAloud(`ar`, entry.arabic, 'ar', type === 'dua' ? 'dua_intro' : 'verse')}
            style={actBtn(speakingId === 'ar')}
          >
            {speakingId === 'ar' ? (isAr ? '⏹ إيقاف' : '⏹ Stop') : (isAr ? '🔊 العربية' : '🔊 Arabic')}
          </button>
          <button
            onClick={() => toggleReadAloud(`en`, entry.english, lang, 'library')}
            style={actBtn(speakingId === 'en')}
          >
            {speakingId === 'en' ? (isAr ? '⏹ إيقاف' : '⏹ Stop') : (isAr ? '🔊 الإنجليزية' : '🔊 English')}
          </button>
          <button onClick={explain} disabled={explainBusy} style={actBtn(false)}>
            {explainBusy ? (isAr ? '…' : '…') : (isAr ? '📖 اشرح لي' : '📖 Explain')}
          </button>
          <button onClick={discuss} style={actBtn(false)}>
            {isAr ? '💬 ناقش' : '💬 Discuss'}
          </button>
          {type === 'dua' && (
            <button onClick={() => navigate(`/recite?dua=${i}`)} style={actBtn(false)}>
              {isAr ? '🎙️ تلاوة' : '🎙️ Recite'}
            </button>
          )}
        </div>

        {/* explanation */}
        {explanation && (
          <div
            style={{
              background: 'rgba(212,179,100,0.06)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '14px 16px',
              fontSize: 13.5,
              lineHeight: 1.75,
              color: 'var(--cream)',
              marginBottom: 18,
              direction: isAr ? 'rtl' : 'ltr',
            }}
          >
            <div style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
              {isAr ? 'شرح الرفيق' : "The companion's note"}
            </div>
            {explanation}
          </div>
        )}
        {explainErr && (
          <div style={{ fontSize: 11, color: '#cc6644', textAlign: 'center', marginBottom: 14 }}>{explainErr}</div>
        )}

        {/* prev / next */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between', marginTop: 8 }}>
          <button onClick={() => go(-1)} disabled={i === 0} style={navBtn(i === 0)}>
            {isAr ? 'التالي ←' : '← Previous'}
          </button>
          <button onClick={() => go(1)} disabled={i >= list.length - 1} style={navBtn(i >= list.length - 1)}>
            {isAr ? '→ السابق' : 'Next →'}
          </button>
        </div>
      </main>
      <ServiceNav />
    </>
  )
}

function pageStyle(isAr: boolean): React.CSSProperties {
  return {
    minHeight: '100dvh',
    background: 'var(--bg)',
    color: 'var(--text)',
    maxWidth: 640,
    margin: '0 auto',
    padding: '1rem 1rem 5rem',
    direction: isAr ? 'rtl' : 'ltr',
  }
}

function Back({ onClick, isAr }: { onClick: () => void; isAr: boolean }) {
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
      ↩ {isAr ? 'المكتبة' : 'Library'}
    </button>
  )
}

function actBtn(active: boolean): React.CSSProperties {
  return {
    padding: '7px 14px',
    borderRadius: 8,
    border: '1px solid var(--border)',
    background: active ? 'rgba(201, 74, 74, 0.16)' : 'transparent',
    color: active ? '#ff8a8a' : 'var(--gold)',
    cursor: 'pointer',
    fontSize: 11.5,
    letterSpacing: '0.03em',
  }
}

function navBtn(disabled: boolean): React.CSSProperties {
  return {
    flex: 1,
    padding: '11px 14px',
    borderRadius: 10,
    border: '1px solid var(--border)',
    background: disabled ? 'transparent' : 'var(--surface)',
    color: disabled ? 'var(--muted)' : 'var(--gold)',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    fontSize: 12.5,
    fontWeight: 600,
  }
}
