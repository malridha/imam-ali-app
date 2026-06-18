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
  WISDOM_BY_SOURCE,
  POETRY_SECTION,
  DUA_SECTION,
  LETTERS_SECTION,
  SERMONS_SECTION,
  ALL_WISDOM,
  type TeachingsTheme,
  type LongFormSection,
} from '../data/teachings'
import type {
  BaselineEntry,
  LongFormEntry,
} from '../lib/prompts/baseline-corpus'
import ServiceNav from '../components/ServiceNav'
import AppHeader from '../components/AppHeader'
import { useReadAloud } from '../hooks/useReadAloud'

type ShortSection = TeachingsTheme | typeof POETRY_SECTION | typeof DUA_SECTION

// Quick-jump category chips shown under the search box. Each points at a
// section's anchor id so a tap scrolls straight to that category.
const CATEGORY_CHIPS: { id: string; label: { en: string; ar: string } }[] = [
  { id: 'duas', label: { en: "Du'as", ar: 'أدعية' } },
  { id: 'philosophy', label: { en: 'Philosophy', ar: 'الفلسفة' } },
  { id: TEACHINGS_THEMES[0]?.id ?? 'duas', label: { en: 'By Theme', ar: 'حسب الموضوع' } },
  { id: 'src-ghurar', label: { en: 'Ghurar al-Hikam', ar: 'غرر الحكم' } },
  { id: 'src-nahj-sayings', label: { en: 'Nahj — Sayings', ar: 'نهج — الحكم' } },
  { id: 'src-nahj-sermons', label: { en: 'Nahj — Sermons', ar: 'نهج — الخطب' } },
  { id: 'letters', label: { en: 'Letters', ar: 'الرسائل' } },
  { id: 'sermons', label: { en: 'Sermons', ar: 'الخطب' } },
  { id: 'poetry', label: { en: 'Poetry', ar: 'الشعر' } },
]

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
  const { speakingId, toggle: toggleReadAloud } = useReadAloud()
  // How many entries to render per section (large source sections are
  // paginated so the page stays light — "Show more" extends them).
  const [shown, setShown] = useState<Record<string, number>>({})
  const INITIAL = 15
  const STEP = 30

  const allSections: (ShortSection | LongFormSection)[] = useMemo(
    () => [
      DUA_SECTION,
      ...TEACHINGS_THEMES,
      LETTERS_SECTION,
      SERMONS_SECTION,
      POETRY_SECTION,
      ...WISDOM_BY_SOURCE,
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

  // Read aloud with the app's SELECTED (ElevenLabs) voice — not the
  // browser's robotic speechSynthesis. Arabic uses the 'verse' preset
  // (multilingual model, tuned for Qur'anic-register recitation); English
  // uses the 'library' narration preset.
  function speak(id: string, text: string, useAr = false) {
    toggleReadAloud(id, text, useAr ? 'ar' : lang, useAr ? 'verse' : 'library')
  }

  // Open a focused discussion of a specific teaching: seed the companion
  // chat with the entry so the conversation starts from this text.
  function discussEntry(entry: BaselineEntry) {
    const seed = isAr
      ? `أودّ أن أناقش هذا التعليم من «${entry.source}»: «${entry.arabic}» — «${entry.english}». ما معناه، وكيف أعيشه في حياتي؟`
      : `I'd like to discuss this teaching from ${entry.source}: "${entry.arabic}" — "${entry.english}". What does it mean, and how might I live it?`
    navigate(`/chat?q=${encodeURIComponent(seed)}`)
  }

  // Jump to a category section. Clear any active search first so the
  // target section is guaranteed to be rendered, then scroll to it.
  function jumpTo(sectionId: string) {
    setSearch('')
    requestAnimationFrame(() => {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <>
      <AppHeader isSubPage />
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
            {isAr ? 'تعاليم الإمام علي' : 'The Teachings of Imam Ali'}
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
              ? 'حِكَمه وفلسفته وأدعيته وشِعره ورسائله وخطبه — مصدرها موثّق، مرتّبة لتقرأها أو تتأمّلها أو تتحاور فيها مع الرفيق.'
              : "His wisdom and philosophy, du'as, poetry, letters, and sermons — all authenticated, arranged to read, reflect on, or talk through with the companion."}
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
            marginBottom: '0.85rem',
            outline: 'none',
            direction: isAr ? 'rtl' : 'ltr',
          }}
        />

        {/* Primary actions — recite a du'a or open a discussion */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <button
            onClick={() => navigate('/recite')}
            style={{
              flex: 1,
              padding: '10px 12px',
              borderRadius: 10,
              border: '1px solid var(--gold)',
              background: 'rgba(212,179,100,0.12)',
              color: 'var(--gold)',
              cursor: 'pointer',
              fontSize: 12.5,
              fontWeight: 600,
              letterSpacing: '0.02em',
              fontFamily: isAr ? 'var(--font-arabic-ui)' : undefined,
            }}
          >
            🎙️ {isAr ? 'تلاوة دعاء' : "Recite a Du'a"}
          </button>
          <button
            onClick={() => navigate('/discuss')}
            style={{
              flex: 1,
              padding: '10px 12px',
              borderRadius: 10,
              border: '1px solid var(--gold)',
              background: 'rgba(212,179,100,0.12)',
              color: 'var(--gold)',
              cursor: 'pointer',
              fontSize: 12.5,
              fontWeight: 600,
              letterSpacing: '0.02em',
              fontFamily: isAr ? 'var(--font-arabic-ui)' : undefined,
            }}
          >
            💬 {isAr ? 'حوار' : 'Discuss'}
          </button>
        </div>

        {/* Category quick-jump chips — horizontal scroll on narrow screens */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            paddingBottom: 6,
            marginBottom: '1.4rem',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            direction: isAr ? 'rtl' : 'ltr',
          }}
        >
          {CATEGORY_CHIPS.map((chip) => (
            <button
              key={chip.id + chip.label.en}
              onClick={() => jumpTo(chip.id)}
              style={{
                flex: '0 0 auto',
                padding: '6px 14px',
                borderRadius: 20,
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--gold)',
                cursor: 'pointer',
                fontSize: 12,
                whiteSpace: 'nowrap',
                letterSpacing: '0.02em',
                fontFamily: isAr ? 'var(--font-arabic-ui)' : undefined,
              }}
            >
              {chip.label[lang]}
            </button>
          ))}
        </div>

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

              {(() => {
                const limit = shown[section.id] ?? INITIAL
                const total = section.entries.length
                const remaining = total - Math.min(limit, total)
                const showMore = remaining > 0 && (
                  <button
                    onClick={() =>
                      setShown((s) => ({ ...s, [section.id]: limit + STEP }))
                    }
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '9px 14px',
                      marginTop: 4,
                      borderRadius: 8,
                      border: '1px solid var(--border)',
                      background: 'transparent',
                      color: 'var(--gold)',
                      cursor: 'pointer',
                      fontSize: 12,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {isAr
                      ? `عرض المزيد (${remaining} متبقّية)`
                      : `Show more (${remaining} remaining)`}
                  </button>
                )
                if (isLongForm(section)) {
                  return (
                    <>
                      {section.entries.slice(0, limit).map((entry, i) => (
                        <LongCard
                          key={`${section.id}-${i}`}
                          entry={entry}
                          id={`${section.id}-${i}`}
                          speakingId={speakingId}
                          onSpeak={speak}
                          lang={lang}
                        />
                      ))}
                      {showMore}
                    </>
                  )
                }
                const isDuaSection = section.id === 'duas'
                const isPoetrySection = section.id === 'poetry'
                const openFor = (entry: BaselineEntry) => {
                  const type = isDuaSection ? 'dua' : isPoetrySection ? 'poetry' : 'wisdom'
                  const arr = isDuaSection
                    ? DUA_SECTION.entries
                    : isPoetrySection
                      ? POETRY_SECTION.entries
                      : ALL_WISDOM
                  navigate(`/teaching?type=${type}&i=${arr.indexOf(entry)}`)
                }
                return (
                  <>
                    {section.entries.slice(0, limit).map((entry, i) => (
                      <TeachingCard
                        key={`${section.id}-${i}`}
                        entry={entry}
                        id={`${section.id}-${i}`}
                        speakingId={speakingId}
                        onSpeak={speak}
                        onOpen={() => openFor(entry)}
                        onDiscuss={() => discussEntry(entry)}
                        onRecite={
                          isDuaSection
                            ? () =>
                                navigate(
                                  `/recite?dua=${DUA_SECTION.entries.indexOf(entry)}`,
                                )
                            : undefined
                        }
                        lang={lang}
                      />
                    ))}
                    {showMore}
                  </>
                )
              })()}
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
  onOpen,
  onDiscuss,
  onRecite,
  lang,
}: {
  entry: BaselineEntry
  id: string
  speakingId: string | null
  onSpeak: (id: string, text: string, useAr?: boolean) => void
  onOpen?: () => void
  onDiscuss?: () => void
  onRecite?: () => void
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
      {/* Tap the teaching text to open it on its own page */}
      <div onClick={onOpen} style={{ cursor: onOpen ? 'pointer' : 'default' }}>
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
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {onOpen && (
          <button onClick={onOpen} style={secondaryBtn}>
            {isAr ? 'افتح ›' : 'Open ›'}
          </button>
        )}
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
        {onRecite && (
          <button onClick={onRecite} style={secondaryBtn}>
            {isAr ? '🎙️ تلاوة' : '🎙️ Recite'}
          </button>
        )}
        {onDiscuss && (
          <button onClick={onDiscuss} style={secondaryBtn}>
            {isAr ? '💬 ناقش' : '💬 Discuss'}
          </button>
        )}
      </div>
    </div>
  )
}

const secondaryBtn: React.CSSProperties = {
  padding: '5px 12px',
  borderRadius: 6,
  border: '1px solid var(--border)',
  background: 'transparent',
  color: 'var(--gold)',
  cursor: 'pointer',
  fontSize: 10,
  letterSpacing: '0.04em',
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
