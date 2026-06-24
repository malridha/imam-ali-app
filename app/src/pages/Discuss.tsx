// Discussion hub — open an exploratory conversation with the companion
// about a chosen domain of Imam Ali's teachings (philosophy, poetry,
// wisdom, or an open thread). Each card simply seeds the existing chat
// via /chat?q=… , so there is no new backend — the companion answers in
// its normal voice, just pointed at a richer, exploratory opening.

import { useNavigate } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'
import ServiceNav from '../components/ServiceNav'
import AppHeader from '../components/AppHeader'

type Topic = {
  id: string
  emoji: string
  title: { en: string; ar: string }
  blurb: { en: string; ar: string }
  /** Seed message sent as the user's first line to the companion. */
  seed: { en: string; ar: string }
}

const TOPICS: Topic[] = [
  {
    id: 'philosophy',
    emoji: '🌌',
    title: { en: 'Philosophy', ar: 'الفلسفة' },
    blurb: {
      en: 'The soul, knowledge, justice, the meaning of a life well-lived.',
      ar: 'النفس، والمعرفة، والعدل، ومعنى الحياة الرشيدة.',
    },
    seed: {
      en: "I'd like to explore the philosophy in Imam Ali's teachings — his thought on the soul, knowledge, justice, and the meaning of life. Could we begin a reflective discussion? Start by offering one idea worth sitting with.",
      ar: 'أودّ أن أستكشف الفلسفة في تعاليم الإمام علي (عليه السلام) — في النفس والمعرفة والعدل ومعنى الحياة. هل نبدأ نقاشاً تأمّلياً؟ ابدأ بفكرة تستحقّ التأمّل.',
    },
  },
  {
    id: 'poetry',
    emoji: '🪶',
    title: { en: 'Poetry', ar: 'الشعر' },
    blurb: {
      en: 'The imagery and themes of the verses attributed to him — and what they teach.',
      ar: 'صور الأبيات المنسوبة إليه ومعانيها — وما تعلّمه.',
    },
    seed: {
      en: "I'd like to discuss the poetry attributed to Imam Ali — its imagery, its themes, and what it teaches about living. Could you share a verse and let's explore it together?",
      ar: 'أودّ أن أناقش الشعر المنسوب إلى الإمام علي (عليه السلام) — صوره ومعانيه وما يعلّمه عن الحياة. هلّا شاركتَ بيتاً ونستكشفه معاً؟',
    },
  },
  {
    id: 'wisdom',
    emoji: '💎',
    title: { en: 'Wisdom', ar: 'الحكمة' },
    blurb: {
      en: 'Take a single saying and understand it deeply — and how to live it.',
      ar: 'خذ حكمةً واحدة وافهمها بعمق — وكيف تُعاش.',
    },
    seed: {
      en: "I'd like to discuss the wisdom of Imam Ali — to take a single saying and understand it deeply, then how to live it day to day. Could you offer one to begin with?",
      ar: 'أودّ أن أناقش حكمة الإمام علي (عليه السلام) — أن نأخذ حكمةً واحدة ونفهمها بعمق، ثم كيف نعيشها يوماً بيوم. هلّا قدّمتَ واحدةً للبداية؟',
    },
  },
  {
    id: 'open',
    emoji: '🗣️',
    title: { en: 'Open Discussion', ar: 'نقاش مفتوح' },
    blurb: {
      en: 'Bring any question — history, ethics, faith, or something you are turning over.',
      ar: 'أحضِر أيّ سؤال — في التاريخ أو الأخلاق أو الإيمان أو ما يشغلك.',
    },
    seed: {
      en: "I'd like to have an open discussion about Imam Ali's life, teachings, and the questions they raise. I'm ready to begin — ask me what's on my mind, or offer a thread to pull.",
      ar: 'أودّ نقاشاً مفتوحاً عن حياة الإمام علي (عليه السلام) وتعاليمه والأسئلة التي تثيرها. أنا مستعدّ للبدء — اسألني عمّا يشغلني، أو اطرح خيطاً نتتبّعه.',
    },
  },
]

export default function Discuss() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const isAr = lang === 'ar'

  function openTopic(t: Topic) {
    navigate(`/chat?q=${encodeURIComponent(t.seed[lang])}`)
  }

  return (
    <>
      <AppHeader isSubPage />
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
          onClick={() => navigate('/teachings')}
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
          ↩ {isAr ? 'التعاليم' : 'Teachings'}
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.6rem' }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: 8,
            }}
          >
            {isAr ? 'حوار' : 'Discussion'}
          </div>
          <h1
            style={{
              fontSize: 26,
              color: 'var(--gold)',
              fontWeight: 700,
              margin: 0,
              fontFamily: isAr ? 'var(--font-arabic)' : undefined,
              lineHeight: 1.4,
            }}
          >
            {isAr ? 'تحاور مع الرفيق' : 'Discuss with the Companion'}
          </h1>
          <div
            style={{
              fontSize: 12,
              color: 'var(--dim)',
              marginTop: 6,
              fontStyle: 'italic',
              maxWidth: 460,
              marginInline: 'auto',
              lineHeight: 1.55,
            }}
          >
            {isAr
              ? 'اختر باباً لتبدأ محادثة تأمّلية مع الرفيق حول تعاليم الإمام علي (عليه السلام).'
              : "Choose a doorway to begin a reflective conversation with the companion about Imam Ali's teachings."}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {TOPICS.map((t) => (
            <button
              key={t.id}
              onClick={() => openTopic(t)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
                textAlign: isAr ? 'right' : 'left',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderInlineStart: '3px solid var(--gold)',
                borderRadius: 12,
                padding: '16px 18px',
                cursor: 'pointer',
                color: 'var(--text)',
                direction: isAr ? 'rtl' : 'ltr',
              }}
            >
              <span style={{ fontSize: 26, lineHeight: 1, flex: '0 0 auto' }}>
                {t.emoji}
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span
                  style={{
                    display: 'block',
                    fontSize: 16,
                    fontWeight: 700,
                    color: 'var(--cream)',
                    marginBottom: 4,
                    fontFamily: isAr ? 'var(--font-arabic-ui)' : undefined,
                  }}
                >
                  {t.title[lang]}
                </span>
                <span
                  style={{
                    display: 'block',
                    fontSize: 12.5,
                    color: 'var(--gold)',
                    lineHeight: 1.5,
                    fontStyle: 'italic',
                  }}
                >
                  {t.blurb[lang]}
                </span>
              </span>
            </button>
          ))}
        </div>
      </main>
      <ServiceNav />
    </>
  )
}
