// Settings — the same fields collected once at first launch (Onboarding),
// editable any time after. Reachable from the hamburger menu on every
// screen. Everything here is local-only: no account, no server row.

import { useState, type CSSProperties } from 'react'
import { useLang } from '../contexts/LangContext'
import { useProfile } from '../contexts/ProfileContext'
import AppHeader from '../components/AppHeader'
import ServiceNav from '../components/ServiceNav'
import { GENDER_LABELS, type Gender } from '../types/profile'
import type { Lang } from '../types/lang'

export default function Settings() {
  const { lang, setLang } = useLang()
  const { profile, setProfile, resetProfile } = useProfile()
  const isAr = lang === 'ar'

  const [name, setName] = useState(profile.name ?? '')
  const [dob, setDob] = useState(profile.dob ?? '')

  function saveName() {
    setProfile({ name: name.trim() || null })
  }

  function saveDob(next: string) {
    setDob(next)
    setProfile({ dob: next || null })
  }

  function setGender(g: Gender) {
    setProfile({ gender: profile.gender === g ? null : g })
  }

  return (
    <>
      <AppHeader isSubPage />
      <main
        style={{
          minHeight: '100dvh',
          background: 'var(--bg)',
          color: 'var(--text)',
          maxWidth: 520,
          margin: '0 auto',
          padding: '1.5rem 1.5rem 5rem',
          direction: isAr ? 'rtl' : 'ltr',
        }}
      >
        <div className="ar" style={{ fontSize: 22, color: 'var(--gold)', marginBottom: '0.5rem' }}>
          {isAr ? 'الإعدادات' : 'Settings'}
        </div>
        <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
          {isAr
            ? 'محفوظة على هذا الجهاز فقط. تساعد الرفيق على التحدّث معك بشكل أنسب.'
            : 'Stored only on this device. Helps the companion speak with you more naturally.'}
        </p>

        {/* ── Language ── */}
        <label style={fieldLabel}>{isAr ? 'اللغة' : 'Language'}</label>
        <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem' }}>
          {([
            { code: 'en' as Lang, label: 'English' },
            { code: 'ar' as Lang, label: 'العربية' },
          ]).map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              style={pillStyle(lang === code)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Name ── */}
        <label style={fieldLabel}>{isAr ? 'الاسم' : 'Name'}</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={saveName}
          placeholder={isAr ? 'اختياري' : 'Optional'}
          maxLength={60}
          style={textInput}
        />

        {/* ── Date of birth ── */}
        <label style={fieldLabel}>{isAr ? 'تاريخ الميلاد' : 'Date of birth'}</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => saveDob(e.target.value)}
          max={new Date().toISOString().slice(0, 10)}
          style={textInput}
        />

        {/* ── Gender ── */}
        <label style={fieldLabel}>{isAr ? 'الجنس' : 'Gender'}</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '2rem' }}>
          {(Object.keys(GENDER_LABELS) as Gender[]).map((g) => (
            <button key={g} onClick={() => setGender(g)} style={pillStyle(profile.gender === g)}>
              {GENDER_LABELS[g][lang]}
            </button>
          ))}
        </div>

        {(profile.name || profile.dob || profile.gender) && (
          <button
            onClick={() => {
              resetProfile()
              setName('')
              setDob('')
            }}
            style={{
              fontSize: 11,
              color: '#d97742',
              background: 'transparent',
              border: '1px solid rgba(217,119,66,0.4)',
              borderRadius: 10,
              padding: '10px 14px',
              cursor: 'pointer',
              letterSpacing: '0.05em',
            }}
          >
            {isAr ? 'محو كل المعلومات' : 'Clear all info'}
          </button>
        )}
      </main>
      <ServiceNav />
    </>
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

function pillStyle(active: boolean): CSSProperties {
  return {
    fontSize: 12,
    color: active ? 'var(--bg)' : 'var(--text)',
    background: active ? 'var(--gold)' : 'transparent',
    border: '1px solid var(--border)',
    borderRadius: 16,
    padding: '6px 14px',
    cursor: 'pointer',
    fontWeight: active ? 700 : 400,
  }
}
