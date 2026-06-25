// Shared top header used on every screen.
// Left: globe → language dropdown (English / العربية)
// Center: app title
// Right: hamburger → section menu + Home (on sub-pages)

import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'
import type { Lang } from '../types/lang'

interface Props {
  /** When true, the hamburger menu includes a "Home" item. */
  isSubPage?: boolean
}

export default function AppHeader({ isSubPage = false }: Props) {
  const { lang, setLang } = useLang()
  const navigate = useNavigate()
  const isAr = lang === 'ar'

  const [langOpen, setLangOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  // The bottom bar holds the daily-use destinations (Home · Library ·
  // Reflections · Calendar). This menu holds the "learn / about" sections so
  // nothing is duplicated and the bottom bar stays uncluttered.
  const MENU_ITEMS = [
    ...(isSubPage
      ? [{ label: { en: 'Home', ar: 'الرئيسية' }, to: '/', icon: '⌂' }]
      : []),
    { label: { en: 'Life of Imam Ali', ar: 'حياة الإمام علي' }, to: '/biography', icon: '◈' },
    { label: { en: 'His Family', ar: 'عائلته' }, to: '/family', icon: '◉' },
    { label: { en: 'What Was Said of Him', ar: 'ما قيل فيه' }, to: '/testimonies', icon: '◎' },
    { label: { en: 'On Unity', ar: 'في الوحدة' }, to: '/unity', icon: '◇' },
    { label: { en: 'My Story', ar: 'حكايتي' }, to: '/story', icon: '✦' },
    { label: { en: 'Settings', ar: 'الإعدادات' }, to: '/settings', icon: '⚙' },
  ]

  const LANGS: { code: Lang; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
  ]

  function go(to: string) {
    setMenuOpen(false)
    navigate(to)
  }

  return (
    <header
      style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        paddingTop: 'env(safe-area-inset-top)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
        flexShrink: 0,
        position: 'relative',
        zIndex: 100,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          maxWidth: 520,
          margin: '0 auto',
          // Always LTR regardless of UI language — the globe stays left,
          // the hamburger stays right. Without this, document.dir = 'rtl'
          // (set whenever Arabic is selected) mirrors this flex row and
          // the two icons swap sides, which is disorienting on every
          // language switch.
          direction: 'ltr',
        }}
      >
        {/* ── Globe / Language picker ── */}
        <div ref={langRef} style={{ position: 'relative' }}>
          <button
            onClick={() => { setLangOpen((o) => !o); setMenuOpen(false) }}
            aria-label="Select language"
            style={iconBtn}
          >
            {/* Globe SVG */}
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </button>

          {langOpen && (
            <div style={dropdown('left')}>
              {LANGS.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => { setLang(code); setLangOpen(false) }}
                  style={{
                    ...dropdownItem,
                    color: lang === code ? 'var(--gold)' : 'var(--text)',
                    fontWeight: lang === code ? 700 : 400,
                    fontFamily: code === 'ar' ? 'var(--font-arabic-ui)' : undefined,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── App title ── */}
        <div
          className="ar"
          style={{
            fontSize: 17,
            color: 'var(--gold)',
            fontWeight: 600,
            letterSpacing: isAr ? 0 : '0.04em',
            fontFamily: isAr ? 'var(--font-arabic)' : undefined,
            userSelect: 'none',
          }}
        >
          الإمام علي
        </div>

        {/* ── Hamburger menu ── */}
        <div ref={menuRef} style={{ position: 'relative' }}>
          <button
            onClick={() => { setMenuOpen((o) => !o); setLangOpen(false) }}
            aria-label="Menu"
            aria-expanded={menuOpen}
            style={iconBtn}
          >
            {/* 3-line hamburger */}
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>

          {menuOpen && (
            <div style={dropdown('right')}>
              {MENU_ITEMS.map((item) => (
                <button
                  key={item.to + item.label.en}
                  onClick={() => go(item.to)}
                  style={{
                    ...dropdownItem,
                    direction: isAr ? 'rtl' : 'ltr',
                    fontFamily: isAr ? 'var(--font-arabic-ui)' : undefined,
                  }}
                >
                  <span style={{ opacity: 0.6, marginInlineEnd: 8, fontSize: 13 }}>{item.icon}</span>
                  {item.label[lang]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

// ── Shared micro-styles ───────────────────────────────────────────────

const iconBtn: React.CSSProperties = {
  width: 36,
  height: 36,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--gold)',
  background: 'transparent',
  border: '1px solid var(--border)',
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 0,
}

function dropdown(align: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute',
    top: 'calc(100% + 6px)',
    left: align === 'left' ? 0 : undefined,
    right: align === 'right' ? 0 : undefined,
    minWidth: 210,
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 12,
    boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
    zIndex: 200,
    overflow: 'hidden',
  }
}

const dropdownItem: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: '11px 16px',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--border)',
  color: 'var(--text)',
  cursor: 'pointer',
  fontSize: 13,
  textAlign: 'left',
}
