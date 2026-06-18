// v51 §83 — "What Was Said About Him."
//
// A dedicated, searchable page of testimonies about Imam Ali (عليه السلام)
// from across the traditions and from other faiths, plus a section of articles
// and books written about him. Content lives in src/data/testimonies.ts.

import { useMemo, useState } from 'react'
import { useLang } from '../contexts/LangContext'
import { useReadAloud } from '../hooks/useReadAloud'
import ServiceNav from '../components/ServiceNav'
import AppHeader from '../components/AppHeader'
import {
  TESTIMONIES,
  WORKS,
  CATEGORY_LABELS,
  type TestimonyCategory,
} from '../data/testimonies'

type Filter = 'all' | TestimonyCategory
const ORDER: TestimonyCategory[] = ['prophet', 'companions', 'sunni', 'shia', 'sufi', 'western', 'other-faiths']

export default function Testimonies() {
  const { lang } = useLang()
  const isAr = lang === 'ar'
  const { speakingId, toggle } = useReadAloud()

  const [q, setQ] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: TESTIMONIES.length }
    for (const t of TESTIMONIES) c[t.category] = (c[t.category] || 0) + 1
    return c
  }, [])

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return TESTIMONIES.filter((t) => {
      if (filter !== 'all' && t.category !== filter) return false
      if (!needle) return true
      return (
        t.author.toLowerCase().includes(needle) ||
        t.text.en.toLowerCase().includes(needle) ||
        t.text.ar.includes(q.trim()) ||
        t.role.en.toLowerCase().includes(needle) ||
        t.source.toLowerCase().includes(needle)
      )
    })
  }, [q, filter])

  const chipStyle = (active: boolean): React.CSSProperties => ({
    padding: '6px 13px',
    borderRadius: 999,
    border: `1px solid ${active ? 'var(--gold)' : 'var(--border)'}`,
    background: active ? 'rgba(212,179,100,0.14)' : 'transparent',
    color: active ? 'var(--gold)' : 'var(--dim)',
    cursor: 'pointer',
    fontSize: 12,
    whiteSpace: 'nowrap',
    fontFamily: isAr ? 'var(--font-arabic)' : undefined,
  })

  return (
    <>
      <AppHeader isSubPage />
      <main
        style={{
          minHeight: '100dvh',
          background: 'var(--bg)',
          color: 'var(--text)',
          maxWidth: 760,
          margin: '0 auto',
          padding: '1rem 1rem 5rem',
          direction: isAr ? 'rtl' : 'ltr',
        }}
      >

        <h1 style={{ fontSize: 25, color: 'var(--gold)', margin: '0 0 4px', fontWeight: 700, fontFamily: isAr ? 'var(--font-arabic)' : undefined }}>
          {isAr ? 'ما قيلَ فيه' : 'What Was Said About Him'}
        </h1>
        <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--dim)', margin: '0 0 18px', fontFamily: isAr ? 'var(--font-arabic-body)' : undefined }}>
          {isAr
            ? 'كلماتٌ في الإمام عليّ (عليه السلام) — من النبيّ والصحابة، ومن أهل السنّة والشيعة، ومن الصوفيّة والشعراء، ومن غير المسلمين عبر العصور. كلُّ شهادةٍ منسوبةٌ إلى مصدرها.'
            : 'Words on Imam Ali (peace be upon him) — from the Prophet and the companions, from Sunni and Shia, from Sufis and poets, and from non-Muslim voices across the centuries. Every testimony is attributed to its source.'}
        </p>

        {/* Search */}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={isAr ? 'ابحث في الشهادات…' : 'Search testimonies, names, sources…'}
          style={{
            width: '100%', boxSizing: 'border-box', fontSize: 16, padding: '11px 14px',
            borderRadius: 12, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.04)',
            color: 'var(--text)', marginBottom: 12, fontFamily: isAr ? 'var(--font-arabic-body)' : undefined,
          }}
        />

        {/* Category filters */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
          <button style={chipStyle(filter === 'all')} onClick={() => setFilter('all')}>
            {isAr ? 'الكلّ' : 'All'} ({counts.all})
          </button>
          {ORDER.map((c) => (
            <button key={c} style={chipStyle(filter === c)} onClick={() => setFilter(c)}>
              {CATEGORY_LABELS[c][lang]} ({counts[c] || 0})
            </button>
          ))}
        </div>

        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14 }}>
          {results.length} {isAr ? 'شهادة' : results.length === 1 ? 'testimony' : 'testimonies'}
        </div>

        {/* Testimony cards */}
        {results.map((t, i) => {
          const id = `tst-${i}-${t.author}`
          const playing = speakingId === id
          return (
            <article
              key={id}
              style={{
                border: '1px solid var(--border)', borderRadius: 14, padding: '14px 16px',
                marginBottom: 12, background: 'rgba(255,255,255,0.02)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                <span style={{ color: 'var(--cream)', fontWeight: 700, fontSize: 15, fontFamily: isAr ? 'var(--font-arabic)' : undefined }}>
                  {t.author}
                </span>
                <span style={{ color: 'var(--muted)', fontSize: 11.5, fontFamily: isAr ? 'var(--font-arabic-body)' : undefined }}>
                  · {t.role[lang]}
                </span>
                <span style={{
                  marginInlineStart: 'auto', fontSize: 10, color: 'var(--gold)',
                  border: '1px solid var(--gold-b)', borderRadius: 999, padding: '2px 9px',
                  letterSpacing: '0.06em', fontFamily: isAr ? 'var(--font-arabic)' : undefined,
                }}>
                  {CATEGORY_LABELS[t.category][lang]}
                </span>
              </div>

              <p style={{
                fontSize: 15.5, lineHeight: 1.8, color: 'var(--text)', margin: '0 0 8px',
                fontStyle: isAr ? 'normal' : 'italic',
                fontFamily: isAr ? 'var(--font-arabic-body)' : undefined,
                direction: isAr ? 'rtl' : 'ltr',
              }}>
                “{t.text[lang]}”
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11.5, color: 'var(--muted)', fontStyle: 'italic' }}>
                  {isAr ? 'المصدر: ' : 'Source: '}{t.source}
                </span>
                <button
                  onClick={() => toggle(id, t.text[isAr ? 'ar' : 'en'], lang, 'verse')}
                  style={{
                    marginInlineStart: 'auto', padding: '4px 11px', borderRadius: 8,
                    border: '1px solid var(--border)', background: playing ? 'rgba(201,74,74,0.18)' : 'transparent',
                    color: playing ? '#ff8a8a' : 'var(--gold)', cursor: 'pointer', fontSize: 11,
                  }}
                >
                  {playing ? (isAr ? '⏹' : '⏹ Stop') : (isAr ? '🔊' : '🔊 Listen')}
                </button>
              </div>

              {t.reviewPending && (
                <div style={{ marginTop: 8, fontSize: 10.5, color: 'var(--muted)', fontStyle: 'italic', fontFamily: isAr ? 'var(--font-arabic-body)' : undefined }}>
                  {isAr ? '⚑ بانتظار مراجعة المصدر' : '⚑ Source pending scholar verification'}
                </div>
              )}
            </article>
          )
        })}

        {results.length === 0 && (
          <div style={{ color: 'var(--muted)', fontSize: 14, padding: '20px 0', textAlign: 'center' }}>
            {isAr ? 'لا نتائج. جرّب كلمةً أخرى.' : 'No results. Try another search.'}
          </div>
        )}

        {/* Articles & books */}
        <h2 style={{ fontSize: 18, color: 'var(--gold)', margin: '34px 0 4px', fontWeight: 700, fontFamily: isAr ? 'var(--font-arabic)' : undefined }}>
          {isAr ? 'ما كُتِب عنه' : 'Articles & Books Written About Him'}
        </h2>
        <p style={{ fontSize: 13.5, lineHeight: 1.7, color: 'var(--dim)', margin: '0 0 16px', fontFamily: isAr ? 'var(--font-arabic-body)' : undefined }}>
          {isAr
            ? 'مؤلَّفاتٌ في الإمام عليّ من تقاليدَ وأديانٍ مختلفة — شيعيّة وسنّيّة، وأكاديميّة غربيّة، ومسيحيّة.'
            : 'Works about Imam Ali from across traditions and religions — Shia and Sunni, Western academic, and Christian.'}
        </p>
        {WORKS.map((w, i) => (
          <div
            key={i}
            style={{
              border: '1px solid var(--border)', borderRadius: 12, padding: '12px 14px',
              marginBottom: 10, background: 'rgba(255,255,255,0.02)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ color: 'var(--cream)', fontWeight: 600, fontSize: 14.5 }}>{w.title}</span>
              {w.year && <span style={{ color: 'var(--muted)', fontSize: 11.5 }}>· {w.year}</span>}
              <span style={{
                marginInlineStart: 'auto', fontSize: 10, color: 'var(--gold)',
                border: '1px solid var(--gold-b)', borderRadius: 999, padding: '2px 9px',
                fontFamily: isAr ? 'var(--font-arabic)' : undefined,
              }}>
                {w.perspective[lang]}
              </span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--dim)', margin: '3px 0 5px' }}>{w.author}</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6, fontFamily: isAr ? 'var(--font-arabic-body)' : undefined }}>
              {w.note[lang]}
            </div>
          </div>
        ))}

        <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 22, lineHeight: 1.6, fontStyle: 'italic', fontFamily: isAr ? 'var(--font-arabic-body)' : undefined }}>
          {isAr
            ? 'هذه مجموعةٌ تنمو. كلُّ شهادةٍ منسوبةٌ ومصدرُها مذكور، وتُراجَع قبل اعتمادها — لا شيء هنا مُختلَق.'
            : 'A growing collection. Every testimony is attributed with a named source and reviewed before it is treated as authoritative — nothing here is invented.'}
        </p>
      </main>
      <ServiceNav />
    </>
  )
}
