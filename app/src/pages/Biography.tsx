// v46 §74 — Biography page. Bilingual long-form read with a small
// table-of-contents at the top so the user can jump to a section.
//
// Content lives in src/data/biography.ts. This file is just the
// presentation layer — section header, dateline caption, body with
// preserved line breaks.

import { useNavigate } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'
import { BIOGRAPHY } from '../data/biography'
import ServiceNav from '../components/ServiceNav'
import { useReadAloud } from '../hooks/useReadAloud'

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

              <div style={{ marginTop: 14 }}>
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
