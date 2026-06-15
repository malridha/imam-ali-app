// v45 — Bottom service navigation hub.
//
// Always-visible bar that surfaces every section of the app. Single
// source of truth for navigation so any future section gets added in
// one place. Active section is highlighted in gold.

import { useNavigate, useLocation } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'

type Item = {
  /** Route path */
  to: string
  /** Inline SVG icon */
  icon: React.ReactNode
  /** Labels per language */
  label: { en: string; ar: string }
  /** Whether this section is matched as "active" when the route starts with this prefix */
  matchPrefix?: string
}

const ITEMS: Item[] = [
  {
    to: '/',
    matchPrefix: '/',
    label: { en: 'Home', ar: 'الرئيسية' },
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 3l9 8h-3v9h-4v-6h-4v6H6v-9H3l9-8z" />
      </svg>
    ),
  },
  {
    to: '/chat',
    matchPrefix: '/chat',
    label: { en: 'Companion', ar: 'الرفيق' },
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM7 9h10v2H7V9zm6 5H7v-2h6v2z" />
      </svg>
    ),
  },
  {
    // v46 §75 — Teachings library
    to: '/teachings',
    matchPrefix: '/teachings',
    label: { en: 'Teachings', ar: 'التعاليم' },
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
      </svg>
    ),
  },
  {
    // v48 §76 — Global search across every authored piece of content
    to: '/search',
    matchPrefix: '/search',
    label: { en: 'Search', ar: 'بحث' },
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>
    ),
  },
  {
    // v46 §74 — Biography of Imam Ali
    to: '/biography',
    matchPrefix: '/biography',
    label: { en: 'Biography', ar: 'السيرة' },
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
  },
  {
    to: '/calendar',
    matchPrefix: '/calendar',
    label: { en: 'Calendar', ar: 'التقويم' },
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 18H5V8h14v13zM7 10h5v5H7v-5z" />
      </svg>
    ),
  },
  {
    to: '/story',
    matchPrefix: '/story',
    label: { en: 'My Story', ar: 'حكايتي' },
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M19 2H6a2 2 0 0 0-2 2v18l4-2 4 2 4-2 4 2V4a2 2 0 0 0-2-2zm0 17l-3-1.5L12 19l-4-1.5L5 19V4h14v15z" />
      </svg>
    ),
  },
]

function isActive(currentPath: string, item: Item): boolean {
  if (item.to === '/') return currentPath === '/'
  if (currentPath === item.to) return true
  if (item.matchPrefix && currentPath.startsWith(item.matchPrefix + '/')) return true
  return false
}

export default function ServiceNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { lang } = useLang()

  return (
    <nav
      aria-label="Sections"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(12, 26, 58, 0.92)',
        borderTop: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        // Respect every iPhone safe area so the bar sits clear of the
        // home indicator (bottom) and rounded display edges (left/right).
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'stretch',
          maxWidth: 600,
          margin: '0 auto',
          padding: '6px 2px',
          direction: 'ltr', // icons always L→R; labels carry their own direction
        }}
      >
        {ITEMS.map((item) => {
          const active = isActive(pathname, item)
          return (
            <button
              key={item.to}
              onClick={() => navigate(item.to)}
              aria-label={item.label[lang]}
              aria-current={active ? 'page' : undefined}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '6px 2px 4px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                color: active ? 'var(--gold)' : 'var(--muted)',
                transition: 'color 0.18s',
                minWidth: 0, // allow labels to truncate gracefully
              }}
            >
              {item.icon}
              <span
                style={{
                  // Fluid label size: shrinks to 8px on iPhone SE,
                  // grows to 11px on iPad. The clamp keeps the seven
                  // nav buttons fitting comfortably at every width.
                  fontSize: 'clamp(8px, 2.3vw, 11px)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: active ? 600 : 500,
                  whiteSpace: 'nowrap',
                  // On the narrowest screens, hide the label entirely
                  // if it would still overflow — icon-only stays usable.
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                  fontFamily: lang === 'ar' ? 'var(--font-arabic-ui)' : undefined,
                }}
              >
                {item.label[lang]}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
