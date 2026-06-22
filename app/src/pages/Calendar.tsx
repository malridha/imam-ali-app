// v24 §50 — Islamic Religious Calendar page.
//
// Twenty major events across both Sunni and Shia traditions. Each event
// has three layers: History, Rituals, Companion Voice — each with a
// Read Aloud button (Web Speech API). Filter by tradition, search by
// name, toggle language.
//
// TSP-driven home-screen surfacing and automatic shrine-register-shift
// on key dates depend on the §49 Tradition Sensitivity Profile work,
// which is parked as a separate dedicated batch.

import { useState } from 'react'
import { EVENTS, HIJRI_MONTHS, type CalendarEvent, type Tradition } from '../data/calendar'
import { T } from '../lib/i18n'
import { useLang } from '../contexts/LangContext'
import ServiceNav from '../components/ServiceNav'
import AppHeader from '../components/AppHeader'
import { useAudioPlayer } from '../hooks/useAudioPlayer'

type Filter = 'all' | Tradition
type Tab = 'history' | 'rituals' | 'companion'

const TRADITION_STYLE: Record<Tradition, { accent: string; wash: string; label: { en: string; ar: string } }> = {
  both: {
    accent: 'var(--green)',
    wash: 'rgba(58, 148, 102, 0.14)',
    label: { en: 'All Muslims', ar: 'لكل المسلمين' },
  },
  shia: {
    accent: '#5a8cd4',
    wash: 'rgba(90, 140, 212, 0.14)',
    label: { en: 'Shia', ar: 'شيعي' },
  },
  sunni: {
    accent: 'var(--gold)',
    wash: 'rgba(212, 179, 100, 0.14)',
    label: { en: 'Sunni', ar: 'سنّي' },
  },
}

function monthOf(event: CalendarEvent): string {
  const parts = event.hijri.split(' ')
  return parts.length >= 3 ? parts.slice(1).join(' ') : parts[parts.length - 1]
}

// Pick the Gregorian date to show: the soonest upcoming occurrence, or — if
// every listed AH year is already past — the most recent. Avoids displaying a
// stale earlier-year date (the greg map is keyed by AH year, so plain [0] would
// always show the oldest year).
function displayGreg(greg: Record<string, string>): string {
  const vals = Object.values(greg)
  const todayT = new Date().setHours(0, 0, 0, 0)
  const parsed = vals
    .map((g) => ({ g, t: new Date(g).getTime() }))
    .filter((x) => !Number.isNaN(x.t))
  if (parsed.length === 0) return vals[0] ?? ''
  const upcoming = parsed.filter((x) => x.t >= todayT).sort((a, b) => a.t - b.t)
  return (upcoming[0] ?? parsed.sort((a, b) => b.t - a.t)[0]).g
}

export default function Calendar() {
  const { lang } = useLang()
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<CalendarEvent | null>(null)
  const [tab, setTab] = useState<Tab>('history')
  const [search, setSearch] = useState('')
  // Read aloud with the app's selected (ElevenLabs) voice via the
  // 'calendar' preset — not the browser's robotic speechSynthesis.
  const { play, stop, speaking } = useAudioPlayer()

  const visible = EVENTS.filter((e) => {
    if (filter !== 'all' && e.tradition !== 'both' && e.tradition !== filter) return false
    const q = search.trim().toLowerCase()
    if (q && !e.name.en.toLowerCase().includes(q) && !e.name.ar.includes(search.trim()))
      return false
    return true
  })

  const grouped: Record<string, CalendarEvent[]> = {}
  HIJRI_MONTHS.forEach((m) => {
    grouped[m] = []
  })
  visible.forEach((e) => {
    const m = monthOf(e)
    if (grouped[m]) grouped[m].push(e)
  })

  function speak(text: string) {
    // ElevenLabs caps a single request at 5000 characters; stay under it.
    void play(text.slice(0, 4800), lang, 'calendar')
  }

  const sc = selected ? TRADITION_STYLE[selected.tradition] : TRADITION_STYLE.both

  // ── Detail view (an event is selected) ────────────────────────────
  if (selected) {
    const historyText = lang === 'ar' ? selected.history.ar : selected.history.en
    const ritualsList = selected.rituals

    return (
      <>
      <main
        style={{
          minHeight: '100dvh',
          background: 'var(--bg)',
          color: 'var(--text)',
          maxWidth: 660,
          margin: '0 auto',
          padding: '1rem 1rem 5rem',
        }}
      >
        <button
          onClick={() => {
            setSelected(null)
            stop()
          }}
          style={{
            marginBottom: 12,
            padding: '6px 14px',
            borderRadius: 8,
            border: '1px solid var(--border)',
            background: 'transparent',
            color: 'var(--gold)',
            cursor: 'pointer',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.04em',
          }}
        >
          ← {lang === 'ar' ? 'كل الأحداث' : 'All events'}
        </button>

        {/* Header with name + dates */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderLeft: `3px solid ${sc.accent}`,
            borderRadius: '12px 12px 0 0',
            padding: '14px 16px 12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 22 }}>{selected.type === 'celebration' ? '🌟' : '🕯️'}</span>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 9,
                  color: 'var(--dim)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}
              >
                {sc.label[lang]} · {selected.type === 'celebration' ? (lang === 'ar' ? 'احتفال' : 'celebration') : (lang === 'ar' ? 'ذكرى' : 'observance')}
              </div>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: 'var(--cream)',
                  lineHeight: 1.3,
                  marginTop: 2,
                  direction: lang === 'ar' ? 'rtl' : 'ltr',
                }}
              >
                {lang === 'ar' ? selected.name.ar : selected.name.en}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 10, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 9, color: 'var(--muted)' }}>HIJRI</div>
              <div style={{ fontSize: 11, color: 'var(--text)', fontWeight: 600 }}>
                {selected.hijri}
              </div>
            </div>
            {Object.entries(selected.greg).map(([ah, g]) => (
              <div key={ah}>
                <div style={{ fontSize: 9, color: 'var(--muted)' }}>{ah} AH</div>
                <div style={{ fontSize: 11, color: 'var(--text)', fontWeight: 600 }}>{g}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderTop: 'none',
          }}
        >
          {([
            ['history', lang === 'ar' ? '📜 التاريخ' : '📜 History'],
            ['rituals', lang === 'ar' ? '🕌 الشعائر' : '🕌 Rituals'],
            ['companion', lang === 'ar' ? '✨ صوت الرفيق' : '✨ Companion'],
          ] as const).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              style={{
                flex: 1,
                padding: '10px 6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: 11,
                fontWeight: 600,
                background: tab === k ? 'var(--surface)' : 'transparent',
                color: tab === k ? sc.accent : 'var(--dim)',
                borderBottom: tab === k ? `2px solid ${sc.accent}` : '2px solid transparent',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab body */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderTop: 'none',
            borderRadius: '0 0 12px 12px',
            padding: '16px',
            minHeight: 200,
          }}
        >
          {tab === 'history' && (
            <>
              <div
                style={{
                  fontSize: 12,
                  lineHeight: 1.85,
                  color: 'var(--text)',
                  whiteSpace: 'pre-line',
                  direction: lang === 'ar' ? 'rtl' : 'ltr',
                  textAlign: lang === 'ar' ? 'right' : 'left',
                }}
              >
                {historyText}
              </div>
              <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <ReadAloudButton
                  speaking={speaking}
                  onSpeak={() => speak(historyText)}
                  onStop={stop}
                  accent={sc.accent}
                  labelEn="🔊 Read aloud"
                  labelAr="🔊 استمع"
                  lang={lang}
                />
              </div>
            </>
          )}

          {tab === 'rituals' && (
            <>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: sc.accent,
                  textTransform: 'uppercase',
                  letterSpacing: '0.10em',
                  marginBottom: 12,
                }}
              >
                {lang === 'ar' ? 'كيف يُحيا هذا اليوم' : 'How this day is observed'}
              </div>
              {Array.isArray(ritualsList) ? (
                ritualsList.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: 10,
                      padding: '8px 0',
                      borderBottom: '1px solid var(--border-soft)',
                      fontSize: 12,
                      color: 'var(--text)',
                      alignItems: 'flex-start',
                    }}
                  >
                    <span style={{ color: sc.accent, fontWeight: 700, flexShrink: 0 }}>◦</span>
                    {r}
                  </div>
                ))
              ) : (
                (Object.entries(ritualsList) as Array<['sunni' | 'shia', string[]]>).map(
                  ([trad, list]) => (
                    <div key={trad} style={{ marginBottom: 16 }}>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          marginBottom: 6,
                          color: trad === 'sunni' ? 'var(--gold)' : '#5a8cd4',
                          textTransform: 'uppercase',
                          letterSpacing: '0.10em',
                        }}
                      >
                        {trad === 'sunni'
                          ? lang === 'ar' ? '☽ الممارسة السنية' : '☽ Sunni practice'
                          : lang === 'ar' ? '◈ الممارسة الشيعية' : '◈ Shia practice'}
                      </div>
                      {list.map((r, i) => (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            gap: 10,
                            padding: '7px 0',
                            borderBottom: '1px solid var(--border-soft)',
                            fontSize: 12,
                            color: 'var(--text)',
                            alignItems: 'flex-start',
                          }}
                        >
                          <span
                            style={{
                              color: trad === 'sunni' ? 'var(--gold)' : '#5a8cd4',
                              fontWeight: 700,
                              flexShrink: 0,
                            }}
                          >
                            ◦
                          </span>
                          {r}
                        </div>
                      ))}
                    </div>
                  ),
                )
              )}
            </>
          )}

          {tab === 'companion' && (
            <>
              <div
                style={{
                  fontSize: 10,
                  color: 'var(--muted)',
                  fontStyle: 'italic',
                  marginBottom: 12,
                }}
              >
                {lang === 'ar' ? 'ما يقوله الرفيق عن هذا اليوم' : 'What the companion says about this day'}
              </div>
              <div
                style={{
                  background: sc.wash,
                  borderRadius: 10,
                  padding: '14px 16px',
                  fontSize: 13,
                  lineHeight: 1.9,
                  color: 'var(--cream)',
                  borderLeft: `3px solid ${sc.accent}`,
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{selected.companion}&rdquo;
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: 'var(--muted)',
                  marginTop: 6,
                  textAlign: 'right',
                  fontStyle: 'italic',
                }}
              >
                {T.subAvatarText[lang]}
              </div>
              <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
                <ReadAloudButton
                  speaking={speaking}
                  onSpeak={() => speak(selected.companion)}
                  onStop={stop}
                  accent={sc.accent}
                  labelEn="🔊 Hear the companion"
                  labelAr="🔊 استمع للرفيق"
                  lang={lang}
                />
              </div>
              <div
                style={{
                  marginTop: 14,
                  padding: '10px 12px',
                  borderRadius: 8,
                  background: 'var(--bg)',
                  border: '1px solid var(--border-soft)',
                  fontSize: 10,
                  color: 'var(--dim)',
                  lineHeight: 1.6,
                }}
              >
                💡 {lang === 'ar'
                  ? 'افتح المعبد اليوم لتجربة خاصة. سيكون الرفيق بالفعل في النبرة المناسبة عند وصولك.'
                  : 'Open the shrine today for a special experience. The companion will already be in the appropriate register when you arrive.'}
              </div>
            </>
          )}
        </div>
      </main>
      <ServiceNav />
      </>
    )
  }

  // ── List view ──────────────────────────────────────────────────────
  return (
    <>
    <AppHeader isSubPage />
    <main
      style={{
        minHeight: '100dvh',
        background: 'var(--bg)',
        color: 'var(--text)',
        maxWidth: 660,
        margin: '0 auto',
        padding: '1rem 1rem 2rem',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
        <div
          className="ar"
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: 'var(--gold)',
            direction: 'rtl',
            marginBottom: 4,
          }}
        >
          التقويم الإسلامي
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--cream)' }}>
          Islamic Calendar
        </div>
        <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4, lineHeight: 1.5 }}>
          {lang === 'ar'
            ? '٢٠ حدثاً · الشيعة والسنة · تاريخ · شعائر · صوت الرفيق · بالعربية والإنجليزية'
            : '20 events · Both traditions · History · Rituals · Companion voice · Arabic & English'}
        </div>
      </div>

      {/* Filter chips */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 12,
        }}
      >
        {(
          [
            ['all', lang === 'ar' ? 'الكل' : 'All'],
            ['both', lang === 'ar' ? 'مشترك' : 'Universal'],
            ['sunni', lang === 'ar' ? 'سنّي' : 'Sunni'],
            ['shia', lang === 'ar' ? 'شيعي' : 'Shia'],
          ] as const
        ).map(([v, label]) => {
          const active = filter === v
          const colour =
            v === 'sunni' ? 'var(--gold)'
            : v === 'shia' ? '#5a8cd4'
            : v === 'both' ? 'var(--green)'
            : 'var(--border-strong)'
          return (
            <button
              key={v}
              onClick={() => setFilter(v)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: `1px solid ${active ? colour : 'var(--border)'}`,
                cursor: 'pointer',
                fontSize: 11,
                fontWeight: 600,
                background: active ? colour : 'transparent',
                color: active ? 'var(--cream)' : 'var(--dim)',
              }}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Search — keep font-size >=16px so iOS does not auto-zoom on focus. */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={lang === 'ar' ? 'ابحث عن حدث…' : 'Search events…'}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '10px 14px',
          borderRadius: 10,
          border: '1px solid var(--border)',
          background: 'var(--surface)',
          color: 'var(--text)',
          fontSize: 16,
          marginBottom: '1.2rem',
          outline: 'none',
        }}
      />

      {/* Events grouped by Hijri month */}
      {HIJRI_MONTHS.map((m) => {
        const evts = grouped[m]
        if (!evts || !evts.length) return null
        return (
          <div key={m} style={{ marginBottom: '1.3rem' }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: 'var(--gold)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 8,
                paddingLeft: 4,
              }}
            >
              ◈ {m}
            </div>
            {evts.map((e) => {
              const ec = TRADITION_STYLE[e.tradition]
              const firstGreg = displayGreg(e.greg)
              return (
                <div
                  key={e.id}
                  onClick={() => {
                    setSelected(e)
                    setTab('history')
                    stop()
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 14px',
                    marginBottom: 7,
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderLeft: `3px solid ${ec.accent}`,
                    borderRadius: 10,
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: 18 }}>
                    {e.type === 'celebration' ? '🌟' : '🕯️'}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 13,
                        color: 'var(--cream)',
                        direction: lang === 'ar' ? 'rtl' : 'ltr',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {lang === 'ar' ? e.name.ar : e.name.en}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>
                      {e.hijri} · {firstGreg}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 9,
                      padding: '3px 10px',
                      borderRadius: 20,
                      background: ec.wash,
                      color: ec.accent,
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {ec.label[lang]}
                  </span>
                  <span style={{ color: 'var(--muted)', fontSize: 14 }}>›</span>
                </div>
              )
            })}
          </div>
        )
      })}

      <div
        style={{
          textAlign: 'center',
          fontSize: 9,
          color: 'var(--muted)',
          marginTop: '1.5rem',
          lineHeight: 1.6,
        }}
      >
        {lang === 'ar'
          ? 'التواريخ مبنية على التقويم الهجري · قد تختلف ±١ يوم حسب رؤية الهلال'
          : 'Dates based on Hijri lunar calendar · May vary ±1 day by region and moon sighting'}
        <br />
        {lang === 'ar'
          ? 'كل المحتوى من مصادر إسلامية موثّقة'
          : 'All historical content from authenticated Islamic sources'}
      </div>
    </main>
    <ServiceNav />
    </>
  )
}

// ── Helpers ────────────────────────────────────────────────────────────

function ReadAloudButton({
  speaking,
  onSpeak,
  onStop,
  accent,
  labelEn,
  labelAr,
  lang,
}: {
  speaking: boolean
  onSpeak: () => void
  onStop: () => void
  accent: string
  labelEn: string
  labelAr: string
  lang: 'en' | 'ar'
}) {
  return (
    <button
      onClick={speaking ? onStop : onSpeak}
      style={{
        padding: '8px 18px',
        borderRadius: 8,
        border: 'none',
        cursor: 'pointer',
        fontSize: 11,
        fontWeight: 600,
        background: speaking ? '#c94a4a' : accent,
        color: 'var(--cream)',
        letterSpacing: '0.04em',
      }}
    >
      {speaking
        ? lang === 'ar' ? '⏹ إيقاف' : '⏹ Stop'
        : lang === 'ar' ? labelAr : labelEn}
    </button>
  )
}
