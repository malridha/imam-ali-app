import { useLang } from '../contexts/LangContext'
import { T } from '../lib/i18n'
import type { CrisisResource } from '../lib/claude'

type Props = {
  resources: CrisisResource[]
}

export default function CrisisCard({ resources }: Props) {
  const { lang } = useLang()
  return (
    <div
      role="region"
      aria-label={T.crisisHeading[lang]}
      style={{
        background: 'rgba(180, 80, 30, 0.10)',
        border: '1px solid rgba(220, 130, 60, 0.55)',
        borderInlineStart: '3px solid #d97742',
        borderRadius: 10,
        padding: '12px 14px',
        margin: '8px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div
        style={{
          fontSize: 12,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#e89a6b',
          fontWeight: 600,
        }}
      >
        {T.crisisHeading[lang]}
      </div>

      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {resources.map((r, i) => (
          <li
            key={i}
            style={{
              fontSize: 12,
              color: 'var(--text)',
              lineHeight: 1.6,
            }}
          >
            <span style={{ color: 'var(--cream)' }}>{r.name}</span>
            {r.number && (
              <>
                {' — '}
                <a
                  href={`tel:${r.number.replace(/\s+/g, '')}`}
                  style={{
                    color: '#f0c08c',
                    fontWeight: 600,
                    direction: 'ltr',
                    unicodeBidi: 'embed',
                  }}
                >
                  {r.number}
                </a>
              </>
            )}
            {r.url && (
              <>
                {' — '}
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#f0c08c' }}
                >
                  {r.url.replace(/^https?:\/\//, '')}
                </a>
              </>
            )}
            {r.note && (
              <span style={{ color: 'var(--muted)' }}> · {r.note}</span>
            )}
          </li>
        ))}
      </ul>

      <div
        style={{
          fontSize: 10,
          color: 'var(--muted)',
          lineHeight: 1.5,
          marginTop: 2,
        }}
      >
        {T.crisisFooter[lang]}
      </div>
    </div>
  )
}
