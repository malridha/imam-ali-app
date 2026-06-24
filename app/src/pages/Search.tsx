// v48 — Global search page.
//
// Single search box that indexes every piece of authored content in
// the app: wisdom sayings, du'as, Diwan poetry, letters, sermons,
// and biography sections. Results land in one scannable list with
// type badges and the matched text shown directly.
//
// Why a dedicated page (not just the Teachings filter):
//   • Teachings only searches the wisdom/du'a/poetry library.
//   • Users looking for "Karbala" or "Hijra" need biography results too.
//   • A global search is the only place where every authored sentence
//     in the app is reachable.
//
// Search behaviour: case-insensitive substring match against Arabic,
// English, source, theme, and biography body. The Arabic field is
// matched with diacritics stripped both sides so users typing
// undecorated Arabic still get hits on voweled corpus text.
//
// Each result card shows the type badge, a one-line source label, the
// Arabic + English (or a snippet from the body for biography hits),
// and a Read-Aloud button using the Web Speech API.

import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'
import {
  ALL_WISDOM,
  POETRY_SECTION,
  DUA_SECTION,
  LETTERS_SECTION,
  SERMONS_SECTION,
} from '../data/teachings'
import { BIOGRAPHY } from '../data/biography'
import type {
  BaselineEntry,
  LongFormEntry,
} from '../lib/prompts/baseline-corpus'
import ServiceNav from '../components/ServiceNav'
import AppHeader from '../components/AppHeader'

// ── Strip Arabic diacritics so a user typing undecorated text still
//    matches the voweled corpus. Covers harakat, tanwin, shadda, sukun,
//    superscript alef, and small high marks.
function stripDiacritics(s: string): string {
  return s.replace(/[ً-ْٰۖ-ۭ]/g, '')
}

type ResultType = 'wisdom' | 'dua' | 'poetry' | 'letter' | 'sermon' | 'biography'

type Result =
  | { kind: 'short'; type: ResultType; entry: BaselineEntry; section: string }
  | { kind: 'long'; type: ResultType; entry: LongFormEntry; section: string }
  | {
      kind: 'bio'
      type: 'biography'
      id: string
      title: { en: string; ar: string }
      dateline: { en: string; ar: string }
      snippet: { en: string; ar: string }
    }

const TYPE_LABELS: Record<ResultType, { en: string; ar: string }> = {
  wisdom: { en: 'Wisdom', ar: 'حكمة' },
  dua: { en: "Du'a", ar: 'دعاء' },
  poetry: { en: 'Diwan', ar: 'ديوان' },
  letter: { en: 'Letter', ar: 'رسالة' },
  sermon: { en: 'Sermon', ar: 'خطبة' },
  biography: { en: 'Biography', ar: 'سيرة' },
}

const TYPE_COLORS: Record<ResultType, string> = {
  wisdom: 'var(--gold)',
  dua: '#7ec1a3',
  poetry: '#c084c7',
  letter: '#e0a86b',
  sermon: '#92b4d4',
  biography: '#d9a87b',
}

// Pull a short biography snippet around the match position.
function makeBioSnippet(body: string, q: string): string {
  if (!q) return body.slice(0, 160) + (body.length > 160 ? '…' : '')
  const idx = body.toLowerCase().indexOf(q.toLowerCase())
  if (idx < 0) return body.slice(0, 160) + (body.length > 160 ? '…' : '')
  const start = Math.max(0, idx - 60)
  const end = Math.min(body.length, idx + q.length + 100)
  return (start > 0 ? '…' : '') + body.slice(start, end) + (end < body.length ? '…' : '')
}

export default function Search() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const isAr = lang === 'ar'
  const [search, setSearch] = useState('')
  const [speakingId, setSpeakingId] = useState<string | null>(null)

  const q = search.trim()
  const qLower = q.toLowerCase()
  const qStripped = stripDiacritics(q)

  // Build a flat result list from every source of content in the app.
  const results = useMemo<Result[]>(() => {
    if (!q) return []
    const out: Result[] = []

    function matchEntry(e: BaselineEntry): boolean {
      return (
        e.english.toLowerCase().includes(qLower) ||
        stripDiacritics(e.arabic).includes(qStripped) ||
        e.source.toLowerCase().includes(qLower) ||
        e.theme.toLowerCase().includes(qLower)
      )
    }

    function matchLong(e: LongFormEntry): boolean {
      return (
        e.english.toLowerCase().includes(qLower) ||
        stripDiacritics(e.arabic).includes(qStripped) ||
        e.source.toLowerCase().includes(qLower) ||
        e.theme.toLowerCase().includes(qLower) ||
        e.title.en.toLowerCase().includes(qLower) ||
        e.title.ar.includes(q)
      )
    }

    // Wisdom — search the ENTIRE corpus (every authenticated saying),
    // not just the curated themes. Dedupe identical entries and cap the
    // number rendered so a very broad query stays responsive.
    const WISDOM_CAP = 150
    const seenWisdom = new Set<string>()
    let wisdomCount = 0
    for (const e of ALL_WISDOM) {
      const key = e.arabic + '|' + e.english
      if (seenWisdom.has(key)) continue
      seenWisdom.add(key)
      if (matchEntry(e)) {
        out.push({
          kind: 'short',
          type: 'wisdom',
          entry: e,
          section: e.source,
        })
        if (++wisdomCount >= WISDOM_CAP) break
      }
    }

    // Du'as
    for (const e of DUA_SECTION.entries) {
      if (matchEntry(e)) {
        out.push({
          kind: 'short',
          type: 'dua',
          entry: e,
          section: DUA_SECTION.title[lang],
        })
      }
    }

    // Diwan poetry
    for (const e of POETRY_SECTION.entries) {
      if (matchEntry(e)) {
        out.push({
          kind: 'short',
          type: 'poetry',
          entry: e,
          section: POETRY_SECTION.title[lang],
        })
      }
    }

    // Letters
    for (const e of LETTERS_SECTION.entries) {
      if (matchLong(e)) {
        out.push({
          kind: 'long',
          type: 'letter',
          entry: e,
          section: LETTERS_SECTION.title[lang],
        })
      }
    }

    // Sermons
    for (const e of SERMONS_SECTION.entries) {
      if (matchLong(e)) {
        out.push({
          kind: 'long',
          type: 'sermon',
          entry: e,
          section: SERMONS_SECTION.title[lang],
        })
      }
    }

    // Biography
    for (const b of BIOGRAPHY) {
      const titleMatch =
        b.title.en.toLowerCase().includes(qLower) ||
        b.title.ar.includes(q)
      const bodyEnMatch = b.body.en.toLowerCase().includes(qLower)
      const bodyArMatch = b.body.ar.includes(q)
      if (titleMatch || bodyEnMatch || bodyArMatch) {
        out.push({
          kind: 'bio',
          type: 'biography',
          id: b.id,
          title: b.title,
          dateline: b.dateline,
          snippet: {
            en: bodyEnMatch ? makeBioSnippet(b.body.en, q) : b.body.en.slice(0, 160) + '…',
            ar: bodyArMatch ? makeBioSnippet(b.body.ar, q) : b.body.ar.slice(0, 160) + '…',
          },
        })
      }
    }

    return out
  }, [q, qLower, qStripped, lang])

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

  // Count results by type for the summary line.
  const counts = useMemo(() => {
    const c: Record<ResultType, number> = {
      wisdom: 0,
      dua: 0,
      poetry: 0,
      letter: 0,
      sermon: 0,
      biography: 0,
    }
    for (const r of results) c[r.type]++
    return c
  }, [results])

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
        <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: 8,
            }}
          >
            {isAr ? 'بحث' : 'Search'}
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
            {isAr ? 'ابحث في كلّ شيء' : 'Search Everything'}
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
              ? 'الحكمة، الأدعية، الشعر، الرسائل، الخطب، والسيرة — كلّها في مكانٍ واحد.'
              : 'Wisdom, du\'as, poetry, letters, sermons, and the biography — all in one place.'}
          </div>
        </div>

        {/* Search input. font-size MUST stay >=16px to avoid iOS auto-zoom. */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={
            isAr ? 'اكتب كلمةً أو موضوعاً…' : 'Type a word, name, or theme…'
          }
          autoFocus
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '12px 16px',
            borderRadius: 10,
            border: '1px solid var(--border-strong)',
            background: 'var(--surface)',
            color: 'var(--text)',
            fontSize: 16,
            marginBottom: '1.2rem',
            outline: 'none',
            direction: isAr ? 'rtl' : 'ltr',
            fontFamily: isAr ? 'var(--font-arabic-ui)' : undefined,
          }}
        />

        {/* Empty / waiting state */}
        {!q && (
          <div
            style={{
              textAlign: 'center',
              padding: '2.5rem 1rem',
              color: 'var(--muted)',
              fontSize: 13,
              lineHeight: 1.6,
            }}
          >
            {isAr
              ? 'جرّب كلمات مثل: الصبر، الفاطمة، كربلاء، التوبة، المغفرة، الموت، الأهل…'
              : 'Try words like: patience, Fatima, Karbala, repentance, mercy, death, family…'}
          </div>
        )}

        {/* No results */}
        {q && results.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '2rem 1rem',
              color: 'var(--muted)',
              fontSize: 13,
            }}
          >
            {isAr ? 'لا نتائج لـ' : 'No results for'}{' '}
            <span style={{ color: 'var(--text)' }}>«{q}»</span>
          </div>
        )}

        {/* Summary line */}
        {q && results.length > 0 && (
          <div
            style={{
              fontSize: 11,
              color: 'var(--muted)',
              marginBottom: '1rem',
              letterSpacing: '0.04em',
            }}
          >
            {isAr ? 'وجدنا' : 'Found'} {results.length}{' '}
            {isAr
              ? results.length === 1
                ? 'نتيجة'
                : 'نتيجة'
              : results.length === 1
                ? 'result'
                : 'results'}
            {' · '}
            {(Object.entries(counts) as [ResultType, number][])
              .filter(([, n]) => n > 0)
              .map(
                ([t, n]) =>
                  `${TYPE_LABELS[t][lang]} ${n}`,
              )
              .join(' · ')}
          </div>
        )}

        {/* Results */}
        {results.map((r, i) => {
          const id = `search-${i}`
          const isSpeaking = speakingId === id
          return (
            <article
              key={id}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '14px 14px 12px',
                marginBottom: 12,
              }}
            >
              {/* Type badge + section */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 10,
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: TYPE_COLORS[r.type],
                    border: `1px solid ${TYPE_COLORS[r.type]}`,
                    padding: '2px 8px',
                    borderRadius: 100,
                    fontWeight: 600,
                  }}
                >
                  {TYPE_LABELS[r.type][lang]}
                </span>
                <span style={{ fontSize: 10, color: 'var(--muted)' }}>
                  {r.kind === 'bio' ? r.dateline[lang] : r.section}
                </span>
              </div>

              {r.kind === 'bio' ? (
                <>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 15,
                      color: 'var(--cream)',
                      fontFamily: isAr ? 'var(--font-arabic)' : undefined,
                      lineHeight: 1.45,
                    }}
                  >
                    {r.title[lang]}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: 'var(--text)',
                      marginTop: 8,
                      marginBottom: 8,
                      lineHeight: 1.6,
                      whiteSpace: 'pre-wrap',
                      fontFamily: isAr ? 'var(--font-arabic-body)' : undefined,
                      direction: isAr ? 'rtl' : 'ltr',
                    }}
                  >
                    {r.snippet[lang]}
                  </p>
                  <button
                    onClick={() => navigate(`/biography#${r.id}`)}
                    style={{
                      fontSize: 11,
                      color: 'var(--gold)',
                      background: 'transparent',
                      border: '1px solid var(--border)',
                      padding: '4px 12px',
                      borderRadius: 100,
                      cursor: 'pointer',
                    }}
                  >
                    {isAr ? 'افتح في السيرة ↗' : 'Open in Biography ↗'}
                  </button>
                </>
              ) : (
                <>
                  {/* Long-form entries have a title above the Arabic */}
                  {r.kind === 'long' && (
                    <h3
                      style={{
                        margin: '0 0 8px',
                        fontSize: 14,
                        color: 'var(--cream)',
                        fontFamily: isAr ? 'var(--font-arabic)' : undefined,
                        lineHeight: 1.45,
                      }}
                    >
                      {r.entry.title[lang]}
                    </h3>
                  )}

                  {/* Arabic */}
                  <div
                    dir="rtl"
                    style={{
                      fontSize: r.kind === 'long' ? 17 : 18,
                      color: 'var(--cream)',
                      fontFamily: 'var(--font-arabic)',
                      lineHeight: 1.95,
                      marginBottom: 10,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {r.entry.arabic}
                  </div>

                  {/* English */}
                  <div
                    style={{
                      fontSize: 13,
                      color: 'var(--text)',
                      lineHeight: 1.6,
                      marginBottom: 10,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {r.entry.english}
                  </div>

                  {/* Source + read-aloud */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        color: 'var(--muted)',
                        fontStyle: 'italic',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {r.entry.source}
                    </div>
                    <button
                      onClick={() => speak(id, r.entry.arabic, true)}
                      aria-label={isSpeaking ? 'Stop' : 'Read aloud'}
                      style={{
                        fontSize: 10,
                        color: isSpeaking ? 'var(--green)' : 'var(--gold)',
                        background: 'transparent',
                        border: '1px solid var(--border)',
                        padding: '4px 10px',
                        borderRadius: 100,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {isSpeaking ? '■ ' + (isAr ? 'إيقاف' : 'Stop') : '▶ ' + (isAr ? 'استمع' : 'Read')}
                    </button>
                  </div>
                </>
              )}
            </article>
          )
        })}
      </main>

      <ServiceNav />
    </>
  )
}
