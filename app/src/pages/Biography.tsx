// v46 §74 — Biography page. Bilingual long-form read with a small
// table-of-contents at the top so the user can jump to a section.
//
// Content lives in src/data/biography.ts. This file is just the
// presentation layer — section header, dateline caption, body with
// preserved line breaks.

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'
import { BIOGRAPHY } from '../data/biography'
import type { SectionPerspectives } from '../data/biography'
import type { Lang } from '../types/lang'
import ServiceNav from '../components/ServiceNav'
import { useReadAloud } from '../hooks/useReadAloud'

// Expandable Sunni + Shia perspectives panel for contested-event sections.
// Shared ground first, then each tradition in its own voice with its own
// sources — never adjudicating. See src/data/biography.ts (SectionPerspectives).
function PerspectivesPanel({ p, lang, isAr }: { p: SectionPerspectives; lang: Lang; isAr: boolean }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const blocks: { key: 'shared' | 'sunni' | 'shia'; label: string; color: string; src?: string }[] = [
    { key: 'shared', label: isAr ? 'أرضٌ مشترَكة' : 'Shared ground', color: 'var(--gold)' },
    { key: 'sunni', label: isAr ? 'المنظور السنّيّ' : 'Sunni perspective', color: '#7EC1A3', src: p.sources?.sunni },
    { key: 'shia', label: isAr ? 'المنظور الشيعيّ' : 'Shia perspective', color: '#9FB6E8', src: p.sources?.shia },
  ]
  return (
    <div style={{ marginTop: 16 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          textAlign: isAr ? 'right' : 'left',
          padding: '10px 14px',
          borderRadius: 10,
          border: '1px solid var(--border)',
          background: open ? 'rgba(233, 201, 122, 0.08)' : 'transparent',
          color: 'var(--gold)',
          cursor: 'pointer',
          fontSize: 12.5,
          fontWeight: 600,
          letterSpacing: '0.04em',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: isAr ? 'var(--font-arabic)' : undefined,
        }}
      >
        <span style={{ fontSize: 14 }}>⚖︎</span>
        <span style={{ flex: 1 }}>{isAr ? 'منظورا أهل السنّة والشيعة' : 'Sunni & Shia perspectives'}</span>
        <span style={{ opacity: 0.7 }}>{open ? '▲' : '▾'}</span>
      </button>

      {open && (
        <div style={{ marginTop: 8, borderInlineStart: '2px solid var(--border)' }}>
          {blocks.map((b) => (
            <div key={b.key} style={{ padding: '10px 14px' }}>
              <div
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: b.color,
                  marginBottom: 5,
                  fontFamily: isAr ? 'var(--font-arabic)' : undefined,
                }}
              >
                {b.label}
              </div>
              <div
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.8,
                  color: 'var(--text)',
                  whiteSpace: 'pre-line',
                  fontFamily: isAr ? 'var(--font-arabic-body)' : undefined,
                }}
              >
                {p[b.key][lang]}
              </div>
              {b.src && (
                <div style={{ fontSize: 10.5, color: 'var(--muted)', marginTop: 5, fontStyle: 'italic' }}>
                  {(isAr ? 'المصادر: ' : 'Sources: ') + b.src}
                </div>
              )}
            </div>
          ))}

          {p.reviewPending && (
            <div
              style={{
                margin: '4px 14px 6px',
                fontSize: 10.5,
                color: 'var(--muted)',
                fontStyle: 'italic',
                fontFamily: isAr ? 'var(--font-arabic-body)' : undefined,
              }}
            >
              {isAr
                ? '⚑ مسوّدة تنتظر مراجعة عالِمٍ مختصّ قبل اعتمادها.'
                : '⚑ Draft — pending qualified-scholar review before it is treated as authoritative.'}
            </div>
          )}

          <button
            onClick={() => navigate('/unity')}
            style={{
              margin: '2px 14px 8px',
              background: 'transparent',
              border: 'none',
              color: 'var(--gold)',
              cursor: 'pointer',
              fontSize: 11.5,
              padding: 0,
              fontFamily: isAr ? 'var(--font-arabic)' : undefined,
            }}
          >
            {isAr ? 'لماذا نعرض الرأيَين؟ · موقفنا من الوحدة ←' : 'Why we show both → Our stance on unity'}
          </button>
        </div>
      )}
    </div>
  )
}

export default function Biography() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const isAr = lang === 'ar'
  const { speakingId, toggle: toggleReadAloud } = useReadAloud()

  // Narrate biography sections with the app's selected (ElevenLabs) voice
  // via the 'library' preset, not the browser's robotic speechSynthesis.
  function speak(id: string, text: string) {
    toggleReadAloud(id, text, lang, 'library')
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
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: 8,
            }}
          >
            {isAr ? 'سيرة' : 'A Life'}
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
            {isAr ? 'عليّ بن أبي طالب' : 'Ali ibn Abi Talib'}
          </h1>
          <div
            style={{
              fontSize: 13,
              color: 'var(--dim)',
              marginTop: 4,
              fontStyle: 'italic',
            }}
          >
            {isAr ? 'عليه السلام' : '(peace be upon him)'}
          </div>
        </div>

        {/* Family tree entry point */}
        <button
          onClick={() => navigate('/family')}
          style={{
            width: '100%',
            padding: '12px 16px',
            marginBottom: '1.2rem',
            borderRadius: 10,
            border: '1px solid var(--gold)',
            background: 'rgba(212,179,100,0.12)',
            color: 'var(--gold)',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.02em',
            fontFamily: isAr ? 'var(--font-arabic-ui)' : undefined,
          }}
        >
          🌳 {isAr ? 'شجرة العائلة — الوالدان والأزواج والأبناء' : 'Family Tree — parents, wives & children'}
        </button>

        {/* Table of contents */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '14px 16px',
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: 'var(--muted)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            {isAr ? 'الفصول' : 'Contents'}
          </div>
          {BIOGRAPHY.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              style={{
                display: 'flex',
                gap: 10,
                padding: '6px 0',
                fontSize: 13,
                color: 'var(--cream)',
                textDecoration: 'none',
                borderBottom:
                  i < BIOGRAPHY.length - 1
                    ? '1px solid var(--border-soft)'
                    : 'none',
              }}
            >
              <span style={{ color: 'var(--gold)', fontSize: 11, minWidth: 22 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ flex: 1 }}>{s.title[lang]}</span>
            </a>
          ))}
        </div>

        {/* Sections */}
        {BIOGRAPHY.map((s) => {
          const isSpeaking = speakingId === s.id
          return (
            <article
              key={s.id}
              id={s.id}
              style={{
                marginBottom: '2.5rem',
                scrollMarginTop: 12,
              }}
            >
              <h2
                style={{
                  fontSize: 19,
                  color: 'var(--cream)',
                  fontWeight: 700,
                  margin: '0 0 4px',
                  fontFamily: isAr ? 'var(--font-arabic)' : undefined,
                  lineHeight: 1.35,
                }}
              >
                {s.title[lang]}
              </h2>
              <div
                style={{
                  fontSize: 10,
                  color: 'var(--gold)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: 14,
                }}
              >
                {s.dateline[lang]}
              </div>
              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.85,
                  color: 'var(--text)',
                  whiteSpace: 'pre-line',
                  fontFamily: isAr ? 'var(--font-arabic-body)' : undefined,
                }}
                // Markdown-light: bold **...** rendered manually to avoid extra deps
                dangerouslySetInnerHTML={{
                  __html: s.body[lang]
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/\*\*([^*]+)\*\*/g, '<strong style="color: var(--cream)">$1</strong>'),
                }}
              />

              {s.perspectives && <PerspectivesPanel p={s.perspectives} lang={lang} isAr={isAr} />}

              {s.id === 'about-him' && (
                <button
                  onClick={() => navigate('/testimonies')}
                  style={{
                    marginTop: 14, padding: '9px 16px', borderRadius: 10,
                    border: '1px solid var(--gold-b)', background: 'rgba(212,179,100,0.12)',
                    color: 'var(--gold)', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                    fontFamily: isAr ? 'var(--font-arabic)' : undefined,
                  }}
                >
                  {isAr ? 'اقرأ المزيد — ما قيلَ فيه عبر التقاليد والأديان ←' : 'Read more — what was said about him, across traditions & faiths →'}
                </button>
              )}

              <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button
                  onClick={() => speak(s.id, s.body[lang])}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 8,
                    border: '1px solid var(--border)',
                    background: isSpeaking ? 'rgba(201, 74, 74, 0.18)' : 'transparent',
                    color: isSpeaking ? '#ff8a8a' : 'var(--gold)',
                    cursor: 'pointer',
                    fontSize: 11,
                    letterSpacing: '0.06em',
                  }}
                >
                  {isSpeaking
                    ? isAr ? '⏹ إيقاف' : '⏹ Stop'
                    : isAr ? '🔊 استمع' : '🔊 Read aloud'}
                </button>
                <button
                  onClick={() => {
                    const seed = isAr
                      ? `أودّ أن أتحدّث عن هذه المحطّة من حياة الإمام علي (عليه السلام): «${s.title.ar}» (${s.dateline.ar}). حدّثني عنها أكثر وما تُعلّمنا إيّاه.`
                      : `I'd like to talk about this moment in Imam Ali's life: "${s.title.en}" (${s.dateline.en}). Tell me more about it and what it teaches.`
                    navigate(`/chat?q=${encodeURIComponent(seed)}`)
                  }}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 8,
                    border: '1px solid var(--border)',
                    background: 'transparent',
                    color: 'var(--gold)',
                    cursor: 'pointer',
                    fontSize: 11,
                    letterSpacing: '0.06em',
                  }}
                >
                  {isAr ? '💬 ناقش هذه المحطّة' : '💬 Discuss this'}
                </button>
              </div>
            </article>
          )
        })}

        {/* Footer note */}
        <div
          style={{
            fontSize: 10,
            color: 'var(--muted)',
            textAlign: 'center',
            marginTop: '2rem',
            lineHeight: 1.7,
          }}
        >
          {isAr
            ? 'هذه السيرة موجزة. مستقاة من مصادر سنّيّة وشيعيّة عند الاتّفاق، وموضّحة حيث تختلف التقاليد.'
            : 'This biography is a précis. Drawn from Sunni and Shia sources where they agree, and noted where the traditions differ.'}
        </div>
      </main>
      <ServiceNav />
    </>
  )
}
