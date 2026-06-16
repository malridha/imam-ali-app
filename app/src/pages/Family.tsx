// v49 §80 — The Family of Imam Ali, drawn as a real tree.
//
// Roots (parents + the Prophet who raised him) at the top, Imam Ali at the
// centre, then his wives branching to their children — joined by gold
// connector lines. Tap any person to see their relationship to Imam Ali,
// their dates, how they passed, and a link to learn more / their life.

import { useState } from 'react'
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
import './Family.css'

function stripHonorific(s: string): string {
  return s.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim()
}
function shortRelation(s: string): string {
  return s.split(/\s+[—·]\s+/)[0].trim()
}

export default function Family() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const isAr = lang === 'ar'
  const [sel, setSel] = useState<FamilyMember | null>(null)

  const Node = ({ m, center }: { m: FamilyMember; center?: boolean }) => (
    <button
      className={`fam-node${center ? ' center' : ''}`}
      onClick={() => setSel(m)}
      style={{ fontFamily: isAr ? 'var(--font-arabic-ui)' : undefined }}
    >
      <span className="nm" style={{ fontFamily: isAr ? 'var(--font-arabic)' : undefined }}>
        {stripHonorific(m.name[lang])}
      </span>
      <span className="rel">{shortRelation(m.relation[lang])}</span>
    </button>
  )

  return (
    <>
      <main
        style={{
          minHeight: '100dvh',
          background: 'var(--bg)',
          color: 'var(--text)',
          maxWidth: 820,
          margin: '0 auto',
          padding: '1rem 0.5rem 5rem',
          direction: isAr ? 'rtl' : 'ltr',
        }}
      >
        <div style={{ padding: '0 0.5rem' }}>
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

          <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
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
                fontSize: 24,
                color: 'var(--gold)',
                fontWeight: 700,
                margin: 0,
                fontFamily: isAr ? 'var(--font-arabic)' : undefined,
              }}
            >
              {isAr ? 'شجرة آل الإمام علي' : 'The Family of Imam Ali'}
            </h1>
            <div style={{ fontSize: 11, color: 'var(--dim)', marginTop: 6, fontStyle: 'italic' }}>
              {isAr ? 'اضغط أيّ اسم لمعرفة صلته بالإمام وسيرته' : 'Tap any name for their relation to the Imam and their life'}
            </div>
          </div>
        </div>

        {/* The tree */}
        <div className="fam-scroll">
          <div className="tree">
            {/* Roots: parents + the Prophet who raised him */}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              {PARENTS.map((p) => (
                <Node key={p.id} m={p} />
              ))}
            </div>
            {/* connector down to Ali */}
            <div style={{ width: 0, height: 20, borderInlineStart: '2px solid rgba(212,179,100,0.55)' }} />

            {/* Descendants tree rooted at Imam Ali */}
            <ul>
              <li className="only">
                <Node m={IMAM_ALI_SELF} center />
                <ul>
                  {WIVES.map((w) => {
                    const kids = CHILDREN.filter((c) => c.motherId === w.id)
                    const onlyWife = WIVES.length === 1
                    return (
                      <li key={w.id} className={onlyWife ? 'only' : ''}>
                        <Node m={w} />
                        {kids.length > 0 && (
                          <ul>
                            {kids.map((c) => (
                              <li key={c.id} className={kids.length === 1 ? 'only' : ''}>
                                <Node m={c} />
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            fontSize: 10.5,
            color: 'var(--muted)',
            lineHeight: 1.7,
            margin: '1.2rem 0.8rem 0',
            fontStyle: 'italic',
            textAlign: 'center',
          }}
        >
          {isAr
            ? 'التواريخ التقريبية مُعلَّمة بعلامة ~. وحين تختلف الروايات بين المذاهب (كتفاصيل وفاة السيدة فاطمة) يُذكر المُتّفق عليه فقط.'
            : 'Approximate dates are marked “~”. Where Sunni and Shia accounts differ (e.g. the cause of Sayyida Fatima’s passing), only what is agreed is stated.'}
        </div>
      </main>

      {/* Person detail modal */}
      {sel && (
        <PersonModal
          m={sel}
          lang={lang}
          isAr={isAr}
          onClose={() => setSel(null)}
          onDiscuss={() => {
            const seed = isAr
              ? `أودّ أن أعرف المزيد عن ${sel.name.ar} — ${sel.relation.ar} في آل الإمام علي (عليه السلام). حدّثني عن سيرته/سيرتها.`
              : `I'd like to learn more about ${sel.name.en} — ${sel.relation.en}, in the family of Imam Ali. Tell me about their life.`
            navigate(`/chat?q=${encodeURIComponent(seed)}`)
          }}
          onBiography={sel.id === 'ali' ? () => navigate('/biography') : undefined}
        />
      )}
      <ServiceNav />
    </>
  )
}

function PersonModal({
  m,
  lang,
  isAr,
  onClose,
  onDiscuss,
  onBiography,
}: {
  m: FamilyMember
  lang: 'en' | 'ar'
  isAr: boolean
  onClose: () => void
  onDiscuss: () => void
  onBiography?: () => void
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(4,10,26,0.82)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.2rem',
        direction: isAr ? 'rtl' : 'ltr',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 520,
          background: 'var(--bg)',
          border: '1px solid var(--gold)',
          borderRadius: 14,
          padding: '1.3rem 1.3rem 1.5rem',
          maxHeight: '85vh',
          overflowY: 'auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
          <h2
            style={{
              fontSize: 19,
              color: 'var(--gold)',
              fontWeight: 700,
              margin: 0,
              fontFamily: isAr ? 'var(--font-arabic)' : undefined,
              lineHeight: 1.35,
            }}
          >
            {m.name[lang]}
          </h2>
          <button
            onClick={onClose}
            aria-label={isAr ? 'إغلاق' : 'Close'}
            style={{ background: 'transparent', border: 'none', color: 'var(--muted)', fontSize: 22, cursor: 'pointer', lineHeight: 1 }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            fontSize: 10,
            color: 'var(--gold)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            margin: '4px 0 14px',
          }}
        >
          {isAr ? 'صلته بالإمام' : 'Relation to the Imam'}
        </div>
        <div style={{ fontSize: 13, color: 'var(--cream)', lineHeight: 1.6, marginBottom: 16 }}>
          {m.relation[lang]}
        </div>

        {m.born && <Fact label={isAr ? 'وُلد' : 'Born'} value={m.born[lang]} />}
        {m.died && <Fact label={isAr ? 'تُوفّي' : 'Died'} value={m.died[lang]} />}
        {m.howDied && <Fact label={isAr ? 'كيف' : 'How'} value={m.howDied[lang]} />}
        {m.note && (
          <div style={{ fontSize: 12.5, color: 'var(--dim)', lineHeight: 1.65, marginTop: 8 }}>
            {m.note[lang]}
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 18 }}>
          <button onClick={onDiscuss} style={modalBtn(true)}>
            {isAr ? '💬 تعرّف أكثر مع الرفيق' : '💬 Learn more with the companion'}
          </button>
          {onBiography && (
            <button onClick={onBiography} style={modalBtn(false)}>
              {isAr ? '📖 السيرة الكاملة' : '📖 Full biography'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', gap: 10, fontSize: 12.5, lineHeight: 1.6, marginBottom: 5 }}>
      <span
        style={{
          flex: '0 0 auto',
          minWidth: 40,
          color: 'var(--muted)',
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          paddingTop: 2,
        }}
      >
        {label}
      </span>
      <span style={{ color: 'var(--cream)' }}>{value}</span>
    </div>
  )
}

function modalBtn(primary: boolean): React.CSSProperties {
  return {
    padding: '9px 14px',
    borderRadius: 8,
    border: '1px solid var(--gold)',
    background: primary ? 'rgba(212,179,100,0.14)' : 'transparent',
    color: 'var(--gold)',
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 600,
  }
}
