// v48 — "Reflections" reel: a calm, full-screen, swipe-snap feed of
// authenticated teachings. Engagement without dark patterns — beautiful,
// paced, with natural stopping points, the words of Imam Ali (peace be upon
// him) drawn from the same authenticated corpus the companion quotes.
//
// Each card: theme chip · Arabic · English · source, with a side rail to
// listen (the app's ElevenLabs voice), save, discuss, or share. Audio needs
// one real tap to start (browser autoplay policy); tapping a centred card or
// the listen button is that gesture.

import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'
import { useReadAloud } from '../hooks/useReadAloud'
import { ALL_WISDOM } from '../data/teachings'
import type { BaselineEntry } from '../lib/prompts/baseline-corpus'

const POOL_SIZE = 80
const STORAGE_KEY = 'reels.saved.v1'

// Stable shuffle for the session so the order doesn't jump on re-render.
function shuffled<T>(arr: T[], n: number): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a.slice(0, n)
}

function loadSaved(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
  } catch {
    return new Set()
  }
}

export default function Reels() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const isAr = lang === 'ar'
  const { speakingId, toggle: toggleReadAloud, stop } = useReadAloud()

  const cards = useMemo<BaselineEntry[]>(() => shuffled(ALL_WISDOM, POOL_SIZE), [])
  const [active, setActive] = useState(0)
  const [saved, setSaved] = useState<Set<string>>(loadSaved)

  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])

  // Track the centred card via IntersectionObserver and stop audio when the
  // current reel scrolls out of view (so a card off-screen never keeps talking).
  useEffect(() => {
    const root = containerRef.current
    if (!root) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > 0.6) {
            const idx = Number((e.target as HTMLElement).dataset.idx)
            setActive((prev) => {
              if (prev !== idx) stop()
              return idx
            })
          }
        }
      },
      { root, threshold: [0.6] },
    )
    cardRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [cards, stop])

  function persistSaved(next: Set<string>) {
    setSaved(new Set(next))
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
    } catch {
      /* storage full / disabled — saving is best-effort */
    }
  }

  function keyFor(c: BaselineEntry) {
    return c.arabic.slice(0, 40)
  }

  function onSave(c: BaselineEntry) {
    const k = keyFor(c)
    const next = new Set(saved)
    next.has(k) ? next.delete(k) : next.add(k)
    persistSaved(next)
  }

  function onDiscuss(c: BaselineEntry) {
    const seed = isAr
      ? `أودّ أن أتأمّل هذا التعليم للإمام علي (عليه السلام): «${c.arabic}» (${c.source}). ماذا يعني لي؟`
      : `I'd like to reflect on this teaching of Imam Ali (peace be upon him): "${c.english}" (${c.source}). What does it mean for me?`
    navigate(`/chat?q=${encodeURIComponent(seed)}`)
  }

  async function onShare(c: BaselineEntry) {
    const text = `"${c.english}"\n${c.arabic}\n— Imam Ali · ${c.source}\n\nYa Imam Ali`
    try {
      if (navigator.share) await navigator.share({ text })
      else {
        await navigator.clipboard.writeText(text)
        setToast(isAr ? 'نُسخ إلى الحافظة' : 'Copied to clipboard')
      }
    } catch {
      /* user cancelled share sheet — no-op */
    }
  }

  const [toast, setToastState] = useState<string | null>(null)
  function setToast(m: string) {
    setToastState(m)
    window.setTimeout(() => setToastState(null), 1800)
  }

  const themeTint: Record<string, string> = {
    grief: '1c2f4d', anger: '3a2330', anxiety: '1f3340', purpose: '2a2c1f',
    loneliness: '24243f', faith: '1f3a33', humility: '2e2a1f', gratitude: '24331f',
  }

  return (
    <div
      ref={containerRef}
      dir={isAr ? 'rtl' : 'ltr'}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg)',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Top bar */}
      <div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 20,
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '14px 16px',
          background: 'linear-gradient(to bottom, rgba(8,16,34,0.85), rgba(8,16,34,0))',
        }}
      >
        <button
          onClick={() => navigate('/')}
          aria-label={isAr ? 'رجوع' : 'Back'}
          style={{ background: 'transparent', border: 'none', color: 'var(--cream)', fontSize: 22, cursor: 'pointer', lineHeight: 1 }}
        >
          {isAr ? '›' : '‹'}
        </button>
        <span style={{ color: 'var(--cream)', fontWeight: 700, fontSize: 15, fontFamily: isAr ? 'var(--font-arabic)' : undefined }}>
          {isAr ? 'تأمّلات' : 'Reflections'}
        </span>
        <span style={{ marginInlineStart: 'auto', color: 'var(--muted)', fontSize: 12 }}>
          {active + 1} / {cards.length}
        </span>
      </div>

      {cards.map((c, i) => {
        const id = `reel-${i}`
        const isPlaying = speakingId === id
        const isSaved = saved.has(keyFor(c))
        const tint = themeTint[c.theme] || '14233f'
        return (
          <section
            key={id}
            data-idx={i}
            ref={(el) => { cardRefs.current[i] = el }}
            style={{
              height: '100svh',
              scrollSnapAlign: 'start',
              scrollSnapStop: 'always',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 22px',
              background: `radial-gradient(120% 80% at 50% 30%, #${tint} 0%, var(--bg) 70%)`,
            }}
          >
            {/* Tap anywhere on the verse area to listen */}
            <div
              onClick={() => toggleReadAloud(id, c.arabic, lang, 'verse')}
              style={{ cursor: 'pointer', maxWidth: 680, margin: '0 auto', textAlign: 'center' }}
            >
              <div
                style={{
                  display: 'inline-block', padding: '4px 12px', borderRadius: 999,
                  border: '1px solid rgba(233,201,122,0.4)', color: 'var(--gold)',
                  fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 26,
                }}
              >
                {c.theme}
              </div>
              <p
                lang="ar"
                dir="rtl"
                style={{
                  fontFamily: 'var(--font-arabic), serif',
                  fontSize: 'clamp(24px, 6.4vw, 40px)',
                  lineHeight: 1.7,
                  color: 'var(--cream)',
                  fontWeight: 600,
                  margin: '0 0 22px',
                }}
              >
                {c.arabic}
              </p>
              <p
                style={{
                  fontSize: 'clamp(15px, 3.6vw, 19px)',
                  lineHeight: 1.65,
                  color: 'var(--text)',
                  margin: '0 0 18px',
                  fontFamily: isAr ? 'var(--font-arabic-body)' : undefined,
                }}
              >
                {isAr ? '' : c.english}
              </p>
              <div style={{ color: 'var(--muted)', fontSize: 12.5, letterSpacing: '0.04em' }}>
                — {isAr ? 'الإمام عليّ' : 'Imam Ali'} · {c.source}
              </div>
            </div>

            {/* Action rail */}
            <div
              style={{
                position: 'absolute',
                insetInlineEnd: 14,
                bottom: 96,
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
                alignItems: 'center',
              }}
            >
              <RailButton
                active={isPlaying}
                label={isPlaying ? (isAr ? 'إيقاف' : 'Stop') : (isAr ? 'استمع' : 'Listen')}
                onClick={() => toggleReadAloud(id, c.arabic, lang, 'verse')}
                glyph={isPlaying ? '❙❙' : '►'}
              />
              <RailButton
                active={isSaved}
                label={isAr ? 'حفظ' : 'Save'}
                onClick={() => onSave(c)}
                glyph={isSaved ? '♥' : '♡'}
              />
              <RailButton label={isAr ? 'ناقش' : 'Discuss'} onClick={() => onDiscuss(c)} glyph={'💬'} />
              <RailButton label={isAr ? 'مشاركة' : 'Share'} onClick={() => onShare(c)} glyph={'↗'} />
            </div>

            {/* Swipe hint on the first card only */}
            {i === 0 && (
              <div
                style={{
                  position: 'absolute', bottom: 30, left: 0, right: 0, textAlign: 'center',
                  color: 'var(--muted)', fontSize: 12, animation: 'reelHint 1.8s ease-in-out infinite',
                }}
              >
                {isAr ? 'اسحب للأعلى ↑' : 'Swipe up ↑'}
              </div>
            )}
          </section>
        )
      })}

      {toast && (
        <div
          style={{
            position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 30,
            background: 'rgba(8,16,34,0.92)', color: 'var(--cream)', padding: '10px 18px',
            borderRadius: 10, fontSize: 13, border: '1px solid var(--border)',
          }}
        >
          {toast}
        </div>
      )}

      <style>{`@keyframes reelHint { 0%,100% { opacity: .35; transform: translateY(0) } 50% { opacity: .9; transform: translateY(-4px) } }`}</style>
    </div>
  )
}

function RailButton({
  glyph, label, onClick, active,
}: {
  glyph: string; label: string; onClick: () => void; active?: boolean
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
        background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
        color: active ? 'var(--gold)' : 'var(--cream)',
      }}
    >
      <span
        style={{
          width: 46, height: 46, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: active ? 'rgba(233,201,122,0.18)' : 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.14)', fontSize: 18,
        }}
      >
        {glyph}
      </span>
      <span style={{ fontSize: 10.5, opacity: 0.85 }}>{label}</span>
    </button>
  )
}
