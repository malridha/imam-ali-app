// First-time-only setup screen. Asks for Name, Date of Birth, Gender, and
// Language before the person ever sees the threshold/welcome experience.
// Every field except Language is optional and skippable — this never gates
// entry, it just gives the companion a little more context up front. Shown
// exactly once per device; afterwards the same fields live in Settings,
// reachable any time from the hamburger menu.

import { useState, type CSSProperties } from 'react'
import { useLang } from '../contexts/LangContext'
import { useProfile } from '../contexts/ProfileContext'
import { GENDER_LABELS, type Gender } from '../types/profile'
import type { Lang } from '../types/lang'

type Props = {
  onDone: () => void
}

export default function Onboarding({ onDone }: Props) {
  const { lang, setLang } = useLang()
  const { profile, setProfile, completeOnboarding } = useProfile()
  const isAr = lang === 'ar'

  const [name, setName] = useState(profile.name ?? '')
  const [dob, setDob] = useState(profile.dob ?? '')
  const [gender, setGender] = useState<Gender | null>(profile.gender)

  function submit() {
    setProfile({ name: name.trim() || null, dob: dob || null, gender })
    completeOnboarding()
    onDone()
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'var(--bg)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '3rem 1.5rem 2.5rem',
        direction: isAr ? 'rtl' : 'ltr',
      }}
    >
      <div style={{ width: '100%', maxWidth: 380 }}>
        {/* ── Language — the only required choice, always shown first ── */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: '2rem' }}>
          {([
            { code: 'en' as Lang, label: 'English' },
            { code: 'ar' as Lang, label: 'العربية' },
          ]).map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              style={{
                fontSize: 12,
                padding: '6px 16px',
                borderRadius: 20,
                border: `1px solid ${lang === code ? 'var(--gold)' : 'var(--border)'}`,
                background: lang === code ? 'var(--gold-d)' : 'transparent',
                color: lang === code ? 'var(--gold)' : 'var(--muted)',
                fontWeight: lang === code ? 700 : 400,
                cursor: 'pointer',
                fontFamily: code === 'ar' ? 'var(--font-arabic-ui)' : undefined,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <div
            className="ar"
            style={{ fontSize: 22, color: 'var(--gold)', fontWeight: 700, marginBottom: 4 }}
          >
            الإمام علي
          </div>
        </div>

        <p
          style={{
            fontSize: 12.5,
            color: 'var(--muted)',
            lineHeight: 1.75,
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          {isAr
            ? 'قبل أن نبدأ — هذه المعلومات اختيارية تمامًا، ومحفوظة على جهازك فقط. تساعد الرفيق على التحدّث معك بشكل أنسب.'
            : 'Before we begin — all of this is optional and stays only on this device. It helps the companion speak with you a little more naturally.'}
        </p>

        {/* ── Name ── */}
        <label style={fieldLabel}>{isAr ? 'الاسم' : 'Name'}</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={isAr ? 'اختياري' : 'Optional'}
          maxLength={60}
          style={textInput}
        />

        {/* ── Date of birth ── */}
        <label style={fieldLabel}>{isAr ? 'تاريخ الميلاد' : 'Date of birth'}</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          max={new Date().toISOString().slice(0, 10)}
          style={textInput}
        />

        {/* ── Gender ── */}
        <label style={fieldLabel}>{isAr ? 'الجنس' : 'Gender'}</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.75rem' }}>
          {(Object.keys(GENDER_LABELS) as Gender[]).map((g) => (
            <button
              key={g}
              onClick={() => setGender((prev) => (prev === g ? null : g))}
              style={pillStyle(gender === g)}
            >
              {GENDER_LABELS[g][lang]}
            </button>
          ))}
        </div>

        <button onClick={submit} style={continueBtn}>
          {isAr ? 'متابعة' : 'Continue'}
        </button>

        <button
          onClick={submit}
          style={{
            display: 'block',
            margin: '12px auto 0',
            fontSize: 11,
            color: 'var(--muted)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          {isAr ? 'تخطّي الآن' : 'Skip for now'}
        </button>
      </div>
    </div>
  )
}

const fieldLabel: CSSProperties = {
  display: 'block',
  fontSize: 11,
  color: 'var(--dim)',
  marginBottom: 6,
  letterSpacing: '0.04em',
}

const textInput: CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '10px 14px',
  borderRadius: 10,
  border: '1px solid var(--border)',
  background: 'var(--surface)',
  color: 'var(--text)',
  fontSize: 16, // >=16px so iOS doesn't auto-zoom on focus
  marginBottom: '1.25rem',
  outline: 'none',
}

const continueBtn: CSSProperties = {
  width: '100%',
  background: 'var(--green)',
  color: 'var(--cream)',
  border: '1px solid var(--border)',
  borderRadius: 999,
  padding: '13px 20px',
  cursor: 'pointer',
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
}

function pillStyle(active: boolean): CSSProperties {
  return {
    fontSize: 11.5,
    color: active ? 'var(--bg)' : 'var(--text)',
    background: active ? 'var(--gold)' : 'transparent',
    border: '1px solid var(--border)',
    borderRadius: 16,
    padding: '5px 12px',
    cursor: 'pointer',
    fontWeight: active ? 700 : 400,
  }
}
