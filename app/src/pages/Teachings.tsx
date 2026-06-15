// v46 §75 — Teachings page. Themed wisdom + du'as + Diwan poetry.
//
// Content lives in src/data/teachings.ts (combined corpus + baseline).
// This page presents the user-facing library. Each entry shows the
// Arabic with diacritics, the English meaning, the source, and a
// Read-Aloud button using the Web Speech API.

import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'
import {
  TEACHINGS_THEMES,
  POETRY_SECTION,
  DUA_SECTION,
  LETTERS_SECTION,
  SERMONS_SECTION,
  type TeachingsTheme,
  type LongFormSection,
} from '../data/teachings'
import type {
  BaselineEntry,
  LongFormEntry,
} from '../lib/prompts/baseline-corpus'
import ServiceNav from '../components/ServiceNav'

type ShortSection = TeachingsTheme | typeof POETRY_SECTION | typeof DUA_SECTION

function isLongForm(s: ShortSection | LongFormSection): s is LongFormSection {
  return (
    s.id === 'letters' || s.id === 'sermons'
  )
}

export default function Teachings() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const isAr = lang === 'ar'
  const [search, setSearch] = useState('')
  const [speakingId, setSpeakingId] = useState<string | null>(null)

  const allSections: (ShortSection | LongFormSection)[] = useMemo(
    () => [
      DUA_SECTION,
      ...TEACHINGS_THEMES,
      LETTERS_SECTION,
      SERMONS_SECTION,
      POETRY_SECTION,
    ],
    [],
  )

  // Filter entries by search term across Arabic + English + source.
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return allSections
    return allSections
      .map((s) => {
        if (isLongForm(s)) {
          return {
            ...s,
            entries: s.entries.filter(
              (e) =>
                e.english.toLowerCase().includes(q) ||
                e.arabic.includes(search.trim()) ||
                e.source.toLowerCase().includes(q) ||
                e.theme.toLowerCase().includes(q) ||
                e.title.en.toLowerCase().includes(q),
            ),
          }
        }
        return {
          ...s,
          entries: s.entries.filter(
            (e) =>
              e.english.toLowerCase().includes(q) ||
              e.arabic.includes(search.trim()) ||
              e.source.toLowerCase().includes(q) ||
              e.theme.toLowerCase().includes(q),
          ),
        }
      })
      .filter((s) => s.entries.length > 0)
  }, [search, allSections])

  function speak(id: string, text: string, useAr = false) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    if (speakingId === id) {
      setSpeakingId(null)
      return
    }
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = useAr ? 'ar-SA' : lang === 'ar' ? 'ar-SA' : 'en-US'
    utter.rate = 0.92
    utter.pitch = 0.95
    setSpeakingId(id)
    utter.onend = () => setSpeakingId(null)
    utter.onerror = () => setSpeakingId(null)
    window.speechSynthesis.speak(utter)
  }

  return (
    <>
      <main
        style={{
          minHeight: '100dvh',
          background: 'var(--bg)',
          color: 'var(--text)',
          maxWidth: 720,
          margin: '0 auto',
          padding: '1rem 1rem 5rem',
          direction: isAr ? 'rtl' : 'ltr',
        }}
      >
        <button
          onClick={() => navigate('/')}
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
          ↩ {isAr ? 'الرئيسية' : 'Home'}
        </button>

        {/* Header */}
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
            {isAr ? 'مكتبة' : 'A Library'}
          </div>
          <h1
            style={{
              fontSize: 26,
              color: 'var(--gold)',
              fontWeight: 700,
              margin: 0,
              fontFamily: isAr ? 'var(--font-arabic)' : undefined,
              lineHeight: 1.4,
            }}
          >
            {isAr ? 'الحكمة والأدعية والشعر' : 'Wisdom, Du\'as, and Poetry'}
          </h1>
          <div
            style={{
              fontSize: 12,
              color: 'var(--dim)',
              marginTop: 6,
              fontStyle: 'italic',
              maxWidth: 480,
              marginInline: 'auto',
              lineHeight: 1.55,
            }}
          >
            {isAr
              ? 'مكتبة منسّقة من تعاليم الإمام عليّ (عليه السلام). تنمو هذه المكتبة بمرور الوقت — تبدأ صغيرة وتتوسّع باستمرار.'
              : "A curated library from Imam Ali's authenticated teachings. The library grows over time — it begins small and expands as we add more."}
          </div>
        </div>

        {/* Search — font-size MUST stay >=16px so iOS Safari does not auto-zoom on focus. */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={isAr ? 'ابحث في المكتبة…' : 'Search the library…'}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '10px 14px',
            borderRadius: 10,
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            color: 'var(--text)',
            fontSize: 16,
            marginBottom: '1.5rem',
            outline: 'none',
            direction: isAr ? 'rtl' : 'ltr',
          }}
        />

        {/* Sections */}
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              color: 'var(--muted)',
              fontSize: 13,
              padding: '2rem',
            }}
          >
            {isAr ? 'لا نتائج. جرّب كلمة أخرى.' : 'No results. Try another word.'}
          </div>
        ) : (
          filtered.map((section) => (
            <section
              key={section.id}
              style={{ marginBottom: '2.5rem' }}
              id={section.id}
            >
              <h2
                style={{
                  fontSize: 16,
                  color: 'var(--cream)',
                  fontWeight: 700,
                  margin: '0 0 4px',
                  fontFamily: isAr ? 'var(--font-arabic)' : undefined,
                }}
              >
                {section.title[lang]}
              </h2>
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--gold)',
                  marginBottom: 14,
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                }}
              >
                {section.lead[lang]}
              </div>

              {isLongForm(section)
                ? section.entries.map((entry, i) => (
                    <LongCard
                      key={`${section.id}-${i}`}
                      entry={entry}
                      id={`${section.id}-${i}`}
                      speakingId={speakingId}
                      onSpeak={speak}
                      lang={lang}
                    />
                  ))
                : section.entries.map((entry, i) => (
                    <TeachingCard
                      key={`${section.id}-${i}`}
                      entry={entry}
                      id={`${section.id}-${i}`}
                      speakingId={speakingId}
                      onSpeak={speak}
                      lang={lang}
                    />
                  ))}
            </section>
          ))
        )}

        {/* Footer */}
        <div
          style={{
            fontSize: 10,
            color: 'var(--muted)',
            textAlign: 'center',
            marginTop: '1.5rem',
            lineHeight: 1.7,
          }}
        >
          {isAr
            ? 'كلّ المحتوى من مصادر موثّقة. المكتبة تنمو باستمرار.'
            : 'All content from authenticated sources. The library grows over time.'}
        </div>
      </main>
      <ServiceNav />
    </>
  )
}

function TeachingCard({
  entry,
  id,
  speakingId,
  onSpeak,
  lang,
}: {
  entry: BaselineEntry
  id: string
  speakingId: string | null
  onSpeak: (id: string, text: string, useAr?: boolean) => void
  lang: 'en' | 'ar'
}) {
  const isSpeakingAr = speakingId === `${id}-ar`
  const isSpeakingEn = speakingId === `${id}-en`
  const isAr = lang === 'ar'

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderLeft: '3px solid var(--gold)',
        borderRadius: 10,
        padding: '14px 16px',
        marginBottom: 12,
      }}
    >
      {/* Arabic — full diacritics */}
      <div
        style={{
          fontFamily: 'var(--font-arabic)',
          fontSize: 18,
          lineHeight: 2.0,
          color: 'var(--gold)',
          direction: 'rtl',
          textAlign: 'right',
          whiteSpace: 'pre-line',
          marginBottom: 10,
        }}
      >
        {entry.arabic}
      </div>

      {/* English */}
      <div
        style={{
          fontSize: 13,
          lineHeight: 1.7,
          color: 'var(--cream)',
          direction: 'ltr',
          textAlign: 'left',
          fontStyle: 'italic',
          marginBottom: 10,
        }}
      >
        {entry.english}
      </div>

      {/* Source */}
      <div
        style={{
          fontSize: 10,
          color: 'var(--muted)',
          letterSpacing: '0.06em',
          marginBottom: 12,
        }}
      >
        — {entry.source}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <button
          onClick={() => onSpeak(`${id}-ar`, entry.arabic, true)}
          style={{
            padding: '5px 12px',
            borderRadius: 6,
            border: '1px solid var(--border)',
            background: isSpeakingAr ? 'rgba(201, 74, 74, 0.18)' : 'transparent',
            color: isSpeakingAr ? '#ff8a8a' : 'var(--gold)',
            cursor: 'pointer',
            fontSize: 10,
            letterSpacing: '0.04em',
          }}
        >
          {isSpeakingAr
            ? isAr ? '⏹ إيقاف' : '⏹ Stop'
            : isAr ? '🔊 العربية' : '🔊 Arabic'}
        </button>
        <button
          onClick={() => onSpeak(`${id}-en`, entry.english, false)}
          style={{
            padding: '5px 12px',
            borderRadius: 6,
            border: '1px solid var(--border)',
            background: isSpeakingEn ? 'rgba(201, 74, 74, 0.18)' : 'transparent',
            color: isSpeakingEn ? '#ff8a8a' : 'var(--gold)',
            cursor: 'pointer',
            fontSize: 10,
            letterSpacing: '0.04em',
          }}
        >
          {isSpeakingEn
            ? isAr ? '⏹ إيقاف' : '⏹ Stop'
            : isAr ? '🔊 الإنجليزية' : '🔊 English'}
        </button>
      </div>
    </div>
  )
}


// ── Long-form card for letters and sermons. Larger Arabic block, a
// brief description on hover/below, and the same speak controls.
function LongCard({
  entry,
  id,
  speakingId,
  onSpeak,
  lang,
}: {
  entry: LongFormEntry
  id: string
  speakingId: string | null
  onSpeak: (id: string, text: string, useAr?: boolean) => void
  lang: 'en' | 'ar'
}) {
  const isSpeakingAr = speakingId === `${id}-ar`
  const isSpeakingEn = speakingId === `${id}-en`
  const isAr = lang === 'ar'

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderLeft: '3px solid var(--gold)',
        borderRadius: 10,
        padding: '14px 16px',
        marginBottom: 14,
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: 'var(--cream)',
          marginBottom: 4,
          lineHeight: 1.4,
        }}
      >
        {entry.title[lang]}
      </div>
      <div
        style={{
          fontSize: 11,
          color: 'var(--muted)',
          fontStyle: 'italic',
          marginBottom: 14,
          lineHeight: 1.6,
        }}
      >
        {entry.brief[lang]}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-arabic)',
          fontSize: 17,
          lineHeight: 2.0,
          color: 'var(--gold)',
          direction: 'rtl',
          textAlign: 'right',
          whiteSpace: 'pre-line',
          marginBottom: 12,
          background: 'rgba(212, 179, 100, 0.04)',
          padding: '12px 14px',
          borderRadius: 6,
        }}
      >
        {entry.arabic}
      </div>
      <div
        style={{
          fontSize: 13,
          lineHeight: 1.75,
          color: 'var(--cream)',
          direction: 'ltr',
          textAlign: 'left',
          fontStyle: 'italic',
          marginBottom: 12,
        }}
      >
        {entry.english}
      </div>
      <div
        style={{
          fontSize: 10,
          color: 'var(--muted)',
          letterSpacing: '0.06em',
          marginBottom: 12,
        }}
      >
        — {entry.source}
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <button
          onClick={() => onSpeak(`${id}-ar`, entry.arabic, true)}
          style={{
            padding: '5px 12px',
            borderRadius: 6,
            border: '1px solid var(--border)',
            background: isSpeakingAr ? 'rgba(201, 74, 74, 0.18)' : 'transparent',
            color: isSpeakingAr ? '#ff8a8a' : 'var(--gold)',
            cursor: 'pointer',
            fontSize: 10,
            letterSpacing: '0.04em',
          }}
        >
          {isSpeakingAr
            ? isAr ? '⏹ إيقاف' : '⏹ Stop'
            : isAr ? '🔊 العربية' : '🔊 Arabic'}
        </button>
        <button
          onClick={() => onSpeak(`${id}-en`, entry.english, false)}
          style={{
            padding: '5px 12px',
            borderRadius: 6,
            border: '1px solid var(--border)',
            background: isSpeakingEn ? 'rgba(201, 74, 74, 0.18)' : 'transparent',
            color: isSpeakingEn ? '#ff8a8a' : 'var(--gold)',
            cursor: 'pointer',
            fontSize: 10,
            letterSpacing: '0.04em',
          }}
        >
          {isSpeakingEn
            ? isAr ? '⏹ إيقاف' : '⏹ Stop'
            : isAr ? '🔊 الإنجليزية' : '🔊 English'}
        </button>
      </div>
    </div>
  )
}
