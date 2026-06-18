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
import AppHeader from '../components/AppHeader'
import { useReadAloud } from '../hooks/useReadAloud'
import { ALL_WISDOM } from '../data/teachings'
import type { BaselineEntry } from '../lib/prompts/baseline-corpus'

const POOL_SIZE = 80
const STORAGE_KEY = 'reels.saved.v1'

type Card = BaselineEntry & { long?: boolean }

// A few longer-form reflections (du'a, letter, poem) interleaved into the feed
// so it isn't only one-line aphorisms. Length comes from genuinely longer
// AUTHENTICATED sources — never from padding a short saying. Marked long: true
// so the card renders the fuller passage at a calmer size.
const LONG_SAMPLES: Card[] = [
  {
    long: true,
    theme: 'humility',
    arabic:
      'النَّاسُ مِنْ جِهَةِ التِّمْثَالِ أَكْفَاءُ\nأَبُوهُمْ آدَمُ وَالأُمُّ حَوَّاءُ\nفَإِنْ يَكُنْ لَهُمُ مِنْ أَصْلِهِمْ شَرَفٌ\nيُفَاخِرُونَ بِهِ فَالطِّينُ وَالمَاءُ',
    english:
      'People, in their making, are equals — their father is Adam and their mother is Eve. If they have in their origin any nobility to boast of, it is but clay and water.',
    source: 'Attributed to the Diwan of Imam Ali',
  },
  {
    long: true,
    theme: 'justice',
    arabic:
      'وَأَشْعِرْ قَلْبَكَ الرَّحْمَةَ لِلرَّعِيَّةِ، وَالمَحَبَّةَ لَهُمْ، وَاللُّطْفَ بِهِمْ، وَلَا تَكُونَنَّ عَلَيْهِمْ سَبُعًا ضَارِيًا تَغْتَنِمُ أَكْلَهُمْ، فَإِنَّهُمْ صِنْفَانِ: إِمَّا أَخٌ لَكَ فِي الدِّينِ، أَوْ نَظِيرٌ لَكَ فِي الخَلْقِ',
    english:
      'Infuse your heart with mercy for the people, and love and gentleness toward them. Do not be a ravenous beast over them, seizing their food — for they are of two kinds: either a brother to you in religion, or your equal in creation.',
    source: 'Nahj al-Balagha, Letter 53 (to Malik al-Ashtar)',
  },
  {
    long: true,
    theme: 'forgiveness',
    arabic:
      'اللَّهُمَّ اغْفِرْ لِيَ الذُّنُوبَ الَّتِي تَهْتِكُ العِصَمَ\nاللَّهُمَّ اغْفِرْ لِيَ الذُّنُوبَ الَّتِي تُنْزِلُ النِّقَمَ\nاللَّهُمَّ اغْفِرْ لِيَ الذُّنُوبَ الَّتِي تُغَيِّرُ النِّعَمَ',
    english:
      'O God, forgive me the sins that tear away protections; O God, forgive me the sins that bring down calamities; O God, forgive me the sins that change blessings.',
    source: "Du'a Kumayl",
  },
]

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

  const cards = useMemo<Card[]>(() => {
    const base = shuffled(ALL_WISDOM, POOL_SIZE) as Card[]
    // Drop a longer reflection in early and then every ~14 cards.
    LONG_SAMPLES.forEach((s, k) => base.splice(2 + k * 14, 0, s))
    return base
  }, [])
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
    const text = `"${c.english}"\n${c.arabic}\n— Imam Ali · ${c.source}\n\nImam Ali`
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
    <>
    <AppHeader isSubPage />
    <div
      ref={containerRef}
      dir={isAr ? 'rtl' : 'ltr'}
      style={{
        position: 'fixed',
        inset: 0,
        top: 'var(--header-h, 57px)',
        background: 'var(--bg)',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        WebkitOverflowScrolling: 'touch',
      }}
    >

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
            className="refl-card"
            style={{
              height: '100svh',
              scrollSnapAlign: 'start',
              scrollSnapStop: 'always',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 30px',
              overflow: 'hidden',
              background: `radial-gradient(72% 50% at 50% 30%, #${tint} 0%, transparent 72%), radial-gradient(140% 120% at 50% 48%, #14233f 0%, #0a1426 60%, #070f1f 100%)`,
            }}
          >
            {/* Atmosphere — soft aurora, faint stars, a breathing glow, a vignette */}
            <div className="refl-aurora" aria-hidden="true" />
            <div className="refl-stars" aria-hidden="true" />
            <div className="refl-glow" aria-hidden="true" />
            <div className="refl-vignette" aria-hidden="true" />

            {/* Tap anywhere on the verse area to listen */}
            <div
              onClick={() => toggleReadAloud(id, c.arabic, lang, 'verse')}
              style={{
                position: 'relative', zIndex: 2,
                cursor: 'pointer', maxWidth: 680, margin: '0 auto', textAlign: 'center',
                maxHeight: '74svh', overflowY: 'auto', paddingTop: c.long ? 44 : 0,
                animation: i === active ? 'reflRise 1s ease both' : undefined,
              }}
            >
              <div
                style={{
                  fontSize: 10.5, letterSpacing: '0.3em', textTransform: 'uppercase',
                  color: 'var(--gold)', opacity: 0.8, marginBottom: 22,
                  fontFamily: isAr ? 'var(--font-arabic)' : undefined,
                }}
              >
                {c.theme}
              </div>
              <div className="refl-hair" />
              <p
                lang="ar"
                dir="rtl"
                style={{
                  fontFamily: 'var(--font-arabic), serif',
                  fontSize: c.long ? 'clamp(17px, 4.3vw, 25px)' : 'clamp(23px, 6.1vw, 38px)',
                  lineHeight: c.long ? 2.0 : 1.95,
                  whiteSpace: 'pre-line',
                  color: '#f6efdd',
                  fontWeight: 500,
                  textShadow: '0 1px 18px rgba(0,0,0,0.35)',
                  margin: '0 0 24px',
                }}
              >
                {c.arabic}
              </p>
              <p
                style={{
                  fontSize: c.long ? 'clamp(13px, 3vw, 16px)' : 'clamp(15px, 3.5vw, 18px)',
                  lineHeight: 1.72,
                  whiteSpace: 'pre-line',
                  color: 'var(--dim)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  opacity: 0.92,
                  margin: '0 0 24px',
                  fontFamily: isAr ? 'var(--font-arabic-body)' : undefined,
                }}
              >
                {isAr ? '' : c.english}
              </p>
              <div style={{ color: 'var(--muted)', fontSize: 11.5, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                {isAr ? 'الإمام عليّ' : 'Imam Ali'} · {c.source}
              </div>
            </div>

            {/* Action rail — dimmed so the verse breathes; brightens on interaction */}
            <div
              className="refl-rail"
              style={{
                position: 'absolute',
                insetInlineEnd: 16,
                bottom: 110,
                zIndex: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 22,
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
                  position: 'absolute', bottom: 28, left: 0, right: 0, textAlign: 'center', zIndex: 3,
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

      <style>{`
        @keyframes reelHint { 0%,100% { opacity:.35; transform:translateY(0) } 50% { opacity:.9; transform:translateY(-4px) } }
        @keyframes reflGlow { 0%,100% { opacity:.5; transform:translate(-50%,-50%) scale(1) } 50% { opacity:.85; transform:translate(-50%,-50%) scale(1.06) } }
        @keyframes reflRise { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
        .refl-aurora { position:absolute; inset:0; pointer-events:none; background:
          radial-gradient(80% 60% at 78% 12%, rgba(60,148,102,0.10), transparent 65%),
          radial-gradient(90% 70% at 18% 88%, rgba(40,70,140,0.16), transparent 70%); }
        .refl-stars { position:absolute; inset:0; pointer-events:none; background-image:
          radial-gradient(1.5px 1.5px at 20% 18%, rgba(205,210,232,0.7), transparent),
          radial-gradient(1.5px 1.5px at 72% 24%, rgba(205,210,232,0.55), transparent),
          radial-gradient(1.5px 1.5px at 44% 32%, rgba(205,210,232,0.5), transparent),
          radial-gradient(1.5px 1.5px at 26% 70%, rgba(205,210,232,0.6), transparent),
          radial-gradient(1.5px 1.5px at 82% 76%, rgba(205,210,232,0.5), transparent),
          radial-gradient(1.5px 1.5px at 88% 14%, rgba(205,210,232,0.55), transparent); }
        .refl-glow { position:absolute; top:42%; left:50%; width:min(430px,92vw); height:min(430px,92vw);
          transform:translate(-50%,-50%); pointer-events:none; filter:blur(8px);
          background:radial-gradient(circle, rgba(212,179,100,0.13), transparent 62%);
          animation:reflGlow 7s ease-in-out infinite; }
        .refl-vignette { position:absolute; inset:0; pointer-events:none;
          background:radial-gradient(75% 60% at 50% 45%, transparent 55%, rgba(4,8,18,0.6) 100%); }
        .refl-hair { width:34px; height:1px; margin:0 auto 26px; opacity:.55;
          background:linear-gradient(to right, transparent, var(--gold), transparent); }
        .refl-rail { opacity:.55; transition:opacity .45s ease; }
        .refl-card:hover .refl-rail, .refl-rail:focus-within { opacity:1; }
        @media (prefers-reduced-motion: reduce) { .refl-glow { animation:none } }
      `}</style>
    </div>
    </>
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
