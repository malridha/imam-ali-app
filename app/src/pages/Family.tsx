// v49 §80 — The Family of Imam Ali. A readable family tree: parents and
// the Prophet who raised him, his wives, and his children — each with
// dates, how they passed, and a line you can take to the companion to
// learn more.

import { useNavigate } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'
import ServiceNav from '../components/ServiceNav'
import {
  IMAM_ALI_SELF,
  PARENTS,
  WIVES,
  CHILDREN,
  type FamilyMember,
} from '../data/family'

export default function Family() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const isAr = lang === 'ar'

  function discuss(m: FamilyMember) {
    const seed = isAr
      ? `أودّ أن أعرف المزيد عن ${m.name.ar} — ${m.relation.ar} للإمام علي (عليه السلام). حدّثني عن حياته/حياتها وما يُذكر عنه/عنها.`
      : `I'd like to learn more about ${m.name.en} — ${m.relation.en}, in the family of Imam Ali. Tell me about their life.`
    navigate(`/chat?q=${encodeURIComponent(seed)}`)
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
          onClick={() => navigate('/biography')}
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
          ↩ {isAr ? 'السيرة' : 'Biography'}
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.4rem' }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: 8,
            }}
          >
            {isAr ? 'العائلة' : 'Family Tree'}
          </div>
          <h1
            style={{
              fontSize: 25,
              color: 'var(--gold)',
              fontWeight: 700,
              margin: 0,
              fontFamily: isAr ? 'var(--font-arabic)' : undefined,
              lineHeight: 1.4,
            }}
          >
            {isAr ? 'آل الإمام علي' : 'The Family of Imam Ali'}
          </h1>
        </div>

        {/* Ali himself */}
        <MemberCard m={IMAM_ALI_SELF} lang={lang} isAr={isAr} onDiscuss={discuss} highlight />

        <GroupTitle isAr={isAr} en="Parents & the Prophet who raised him" ar="الوالدان والنبيّ الذي ربّاه" />
        {PARENTS.map((m) => (
          <MemberCard key={m.id} m={m} lang={lang} isAr={isAr} onDiscuss={discuss} />
        ))}

        <GroupTitle isAr={isAr} en="His Wives" ar="زوجاته" />
        {WIVES.map((m) => (
          <MemberCard key={m.id} m={m} lang={lang} isAr={isAr} onDiscuss={discuss} />
        ))}

        <GroupTitle isAr={isAr} en="His Children" ar="أبناؤه وبناته" />
        {CHILDREN.map((m) => (
          <MemberCard key={m.id} m={m} lang={lang} isAr={isAr} onDiscuss={discuss} />
        ))}

        <div
          style={{
            fontSize: 10.5,
            color: 'var(--muted)',
            lineHeight: 1.7,
            marginTop: '1.5rem',
            fontStyle: 'italic',
            textAlign: 'center',
          }}
        >
          {isAr
            ? 'التواريخ التقريبية مُعلَّمة بعلامة ~. وحين تختلف الروايات بين المذاهب (كتفاصيل وفاة السيدة فاطمة) يُذكر المُتّفق عليه فقط.'
            : 'Approximate dates are marked “~”. Where Sunni and Shia accounts differ (e.g. the cause of Sayyida Fatima’s passing), only what is agreed is stated.'}
        </div>
      </main>
      <ServiceNav />
    </>
  )
}

function GroupTitle({ en, ar, isAr }: { en: string; ar: string; isAr: boolean }) {
  return (
    <h2
      style={{
        fontSize: 13,
        color: 'var(--cream)',
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        margin: '1.8rem 0 0.8rem',
        textAlign: 'center',
        fontFamily: isAr ? 'var(--font-arabic-ui)' : undefined,
      }}
    >
      {isAr ? ar : en}
    </h2>
  )
}

function MemberCard({
  m,
  lang,
  isAr,
  onDiscuss,
  highlight,
}: {
  m: FamilyMember
  lang: 'en' | 'ar'
  isAr: boolean
  onDiscuss: (m: FamilyMember) => void
  highlight?: boolean
}) {
  return (
    <div
      style={{
        background: highlight ? 'rgba(212,179,100,0.10)' : 'var(--surface)',
        border: `1px solid ${highlight ? 'var(--gold)' : 'var(--border)'}`,
        borderInlineStart: '3px solid var(--gold)',
        borderRadius: 10,
        padding: '14px 16px',
        marginBottom: 10,
        direction: isAr ? 'rtl' : 'ltr',
      }}
    >
      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: 'var(--gold)',
          marginBottom: 3,
          fontFamily: isAr ? 'var(--font-arabic)' : undefined,
        }}
      >
        {m.name[lang]}
      </div>
      <div style={{ fontSize: 11.5, color: 'var(--cream)', fontStyle: 'italic', marginBottom: 10, lineHeight: 1.5 }}>
        {m.relation[lang]}
      </div>

      {m.born && <FactRow label={isAr ? 'وُلد' : 'Born'} value={m.born[lang]} isAr={isAr} />}
      {m.died && <FactRow label={isAr ? 'تُوفّي' : 'Died'} value={m.died[lang]} isAr={isAr} />}
      {m.howDied && <FactRow label={isAr ? 'كيف' : 'How'} value={m.howDied[lang]} isAr={isAr} />}
      {m.note && (
        <div style={{ fontSize: 12, color: 'var(--dim)', lineHeight: 1.6, marginTop: 6 }}>
          {m.note[lang]}
        </div>
      )}

      <button
        onClick={() => onDiscuss(m)}
        style={{
          marginTop: 12,
          padding: '5px 12px',
          borderRadius: 6,
          border: '1px solid var(--border)',
          background: 'transparent',
          color: 'var(--gold)',
          cursor: 'pointer',
          fontSize: 10.5,
          letterSpacing: '0.04em',
        }}
      >
        {isAr ? '💬 تعرّف أكثر' : '💬 Learn more'}
      </button>
    </div>
  )
}

function FactRow({ label, value, isAr }: { label: string; value: string; isAr: boolean }) {
  return (
    <div style={{ display: 'flex', gap: 8, fontSize: 12, lineHeight: 1.6, marginBottom: 3 }}>
      <span
        style={{
          flex: '0 0 auto',
          minWidth: 38,
          color: 'var(--muted)',
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          paddingTop: 2,
          textAlign: isAr ? 'right' : 'left',
        }}
      >
        {label}
      </span>
      <span style={{ color: 'var(--cream)' }}>{value}</span>
    </div>
  )
}
