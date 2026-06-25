import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLang } from '../contexts/LangContext'
import { useTSP } from '../contexts/TSPContext'
import { useProfile } from '../contexts/ProfileContext'
import ServiceNav from '../components/ServiceNav'
import AppHeader from '../components/AppHeader'
import { supabase } from '../lib/supabase'
import { getOrCreateUserId } from '../lib/userId'
import { T } from '../lib/i18n'
import { PATH_META, type PathKey } from '../types/paths'
import {
  AGE_RANGE_LABELS,
  GENDER_LABELS,
  type AgeRange,
  type Gender,
} from '../types/profile'

type StoredSummary = {
  id: number
  path: PathKey
  summary: string
  themes: string[] | null
  domain: string | null
  ended_at: string
}

export default function MyStory() {
  const { lang } = useLang()
  const isAr = lang === 'ar'
  const { resetTSP } = useTSP()
  const { profile, setProfile, resetProfile } = useProfile()
  const userId = useMemo(() => getOrCreateUserId(), [])

  const [summaries, setSummaries] = useState<StoredSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    const { data, error } = await supabase.functions.invoke<{
      summaries?: StoredSummary[]
      error?: string
    }>('list-summaries', { body: { user_id: userId } })
    if (error || data?.error) {
      setError(error?.message || data?.error || 'Could not load story')
      setLoading(false)
      return
    }
    setSummaries(data?.summaries ?? [])
    setLoading(false)
  }, [userId])

  useEffect(() => {
    load()
  }, [load])

  async function deleteOne(id: number) {
    if (!confirm(T.confirmDelete[lang])) return
    setSummaries((prev) => prev.filter((s) => s.id !== id)) // optimistic
    const { error } = await supabase.functions.invoke('delete-summary', {
      body: { user_id: userId, summary_id: id },
    })
    if (error) {
      setError(error.message || 'Delete failed')
      load()
    }
  }

  async function deleteAll() {
    if (!confirm(T.confirmDeleteAll[lang])) return
    setSummaries([])
    const { error } = await supabase.functions.invoke('delete-summary', {
      body: { user_id: userId, all: true },
    })
    if (error) {
      setError(error.message || 'Delete failed')
      load()
    }
  }

  const dateFmt = useMemo(
    () =>
      new Intl.DateTimeFormat(lang === 'ar' ? 'ar' : 'en', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    [lang],
  )

  return (
    <>
    <AppHeader isSubPage />
    <main
      style={{
        minHeight: '100dvh',
        background: 'var(--bg)',
        color: 'var(--text)',
        maxWidth: 560,
        margin: '0 auto',
        padding: '1.5rem 1.5rem 5rem',
      }}
    >
      <div className="ar" style={{ fontSize: 22, color: 'var(--gold)', marginBottom: '1.5rem' }}>
        {T.myStory[lang]}
      </div>

      {/* About you — optional, local-only context (age range, gender) that
          helps the companion address the person more naturally. Stored only
          on this device; never required to use the app. */}
      <section
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '1rem 1.1rem',
          marginBottom: '1.5rem',
          direction: isAr ? 'rtl' : 'ltr',
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: 4,
          }}
        >
          {isAr ? 'عنك' : 'About you'}
        </div>
        <p style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 12 }}>
          {isAr
            ? 'اختياري ومحفوظ على هذا الجهاز فقط — يساعد الرفيق على التحدّث معك بشكل أنسب.'
            : 'Optional, stored only on this device — helps the companion speak with you more naturally.'}
        </p>

        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10.5, color: 'var(--dim)', marginBottom: 6 }}>
            {isAr ? 'العمر' : 'Age range'}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {(Object.keys(AGE_RANGE_LABELS) as AgeRange[]).map((range) => (
              <button
                key={range}
                onClick={() =>
                  setProfile({ ageRange: profile.ageRange === range ? null : range })
                }
                style={pillStyle(profile.ageRange === range)}
              >
                {AGE_RANGE_LABELS[range][lang]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 10.5, color: 'var(--dim)', marginBottom: 6 }}>
            {isAr ? 'الجنس' : 'Gender'}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {(Object.keys(GENDER_LABELS) as Gender[]).map((g) => (
              <button
                key={g}
                onClick={() => setProfile({ gender: profile.gender === g ? null : g })}
                style={pillStyle(profile.gender === g)}
              >
                {GENDER_LABELS[g][lang]}
              </button>
            ))}
          </div>
        </div>

        {(profile.ageRange || profile.gender) && (
          <button
            onClick={resetProfile}
            style={{
              marginTop: 12,
              fontSize: 10.5,
              color: 'var(--muted)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: 0,
            }}
          >
            {isAr ? 'محو هذه المعلومات' : 'Clear this info'}
          </button>
        )}
      </section>

      <p
        style={{
          fontSize: 12,
          color: 'var(--muted)',
          lineHeight: 1.8,
          marginBottom: '1.5rem',
        }}
      >
        {T.myStoryDesc[lang]}
      </p>

      {loading && (
        <div style={{ fontSize: 12, color: 'var(--muted)' }}>
          {T.storyLoading[lang]}
        </div>
      )}

      {!loading && summaries.length === 0 && !error && (
        <div
          style={{
            fontSize: 12,
            color: 'var(--muted)',
            lineHeight: 1.7,
            padding: '1.5rem 0',
            textAlign: 'center',
            fontStyle: 'italic',
          }}
        >
          {T.myStoryEmpty[lang]}
        </div>
      )}

      {error && (
        <div
          style={{
            fontSize: 12,
            color: '#cc6644',
            padding: '8px 12px',
            background: 'rgba(120,50,20,0.12)',
            borderRadius: 8,
            border: '1px solid rgba(180,80,30,0.3)',
            marginBottom: '1rem',
          }}
        >
          {error}
        </div>
      )}

      {summaries.length > 0 && (
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          {summaries.map((s) => {
            const pathMeta = PATH_META[s.path]
            return (
              <article
                key={s.id}
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  padding: '0.9rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <header
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    flexWrap: 'wrap',
                  }}
                >
                  <span style={{ fontSize: 16 }}>{pathMeta?.icon}</span>
                  <span
                    className="ar"
                    style={{ fontSize: 14, color: 'var(--gold)' }}
                  >
                    {pathMeta?.ar}
                  </span>
                  <span style={{ fontSize: 10, color: 'var(--muted)' }}>
                    · {dateFmt.format(new Date(s.ended_at))}
                  </span>
                  {s.domain && s.domain !== 'other' && (
                    <span
                      style={{
                        fontSize: 9,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--dim)',
                        background: 'var(--gold-d)',
                        padding: '2px 6px',
                        borderRadius: 8,
                      }}
                    >
                      {s.domain}
                    </span>
                  )}
                  <button
                    onClick={() => deleteOne(s.id)}
                    style={{
                      marginInlineStart: 'auto',
                      fontSize: 10,
                      color: 'var(--muted)',
                      background: 'transparent',
                      border: '1px solid var(--border)',
                      borderRadius: 14,
                      padding: '2px 8px',
                      cursor: 'pointer',
                    }}
                  >
                    {T.delete[lang]}
                  </button>
                </header>

                <p
                  style={{
                    fontSize: 13,
                    color: 'var(--text)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {s.summary || '—'}
                </p>

                {s.themes && s.themes.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 4,
                      marginTop: 2,
                    }}
                  >
                    {s.themes.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 10,
                          color: 'var(--dim)',
                          background: 'rgba(255,255,255,0.03)',
                          padding: '2px 8px',
                          borderRadius: 10,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            )
          })}

          <button
            onClick={deleteAll}
            style={{
              marginTop: '1rem',
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
            {T.deleteAll[lang]}
          </button>

          {/* v24 §49 — Silent profile reset. Wipes the inferred TSP back
              to neutral on both client and server. Conversations and
              summaries are untouched. */}
          <button
            onClick={async () => {
              if (!confirm(T.resetProfileConfirm[lang])) return
              resetTSP()
              try {
                await supabase.functions.invoke('reset-tsp', {
                  body: { user_id: userId },
                })
              } catch {
                // Server reset failed — local reset still applied; the
                // server will re-infer from upcoming messages.
              }
              alert(T.resetProfileDone[lang])
            }}
            style={{
              marginTop: '0.6rem',
              fontSize: 11,
              color: 'var(--gold)',
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '10px 14px',
              cursor: 'pointer',
              letterSpacing: '0.05em',
            }}
          >
            {T.resetProfile[lang]}
          </button>
        </div>
      )}
    </main>
    <ServiceNav />
    </>
  )
}

function pillStyle(active: boolean): React.CSSProperties {
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
