// v50 §82 — "Our Stance on Unity."
//
// The app's anti-sectarian charter, made visible. Built ONLY from sound,
// uncontested sources: four Qur'anic verses on human equality and against
// division, and Imam Ali's own words (Nahj al-Balagha, Letter 53) that every
// person is "either a brother to you in religion, or your equal in creation."
//
// No contested claims appear here by design — this is the shared ground the
// whole product stands on. Verses can be heard in the app's selected voice.

import { useNavigate } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'
import { useReadAloud } from '../hooks/useReadAloud'
import ServiceNav from '../components/ServiceNav'

type Quote = {
  id: string
  arabic: string
  english: string
  ref: { en: string; ar: string }
}

const VERSES: Quote[] = [
  {
    id: 'q-49-13',
    arabic:
      'يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا ۚ إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ',
    english:
      'O mankind, We created you from a male and a female and made you peoples and tribes that you may know one another. The most noble of you before God is the most righteous.',
    ref: { en: 'Qur’an 49:13', ar: 'القرآن ٤٩:١٣' },
  },
  {
    id: 'q-3-103',
    arabic: 'وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا',
    english: 'Hold firmly to the rope of God, all together, and do not become divided.',
    ref: { en: 'Qur’an 3:103', ar: 'القرآن ٣:١٠٣' },
  },
  {
    id: 'q-6-159',
    arabic: 'إِنَّ الَّذِينَ فَرَّقُوا دِينَهُمْ وَكَانُوا شِيَعًا لَّسْتَ مِنْهُمْ فِي شَيْءٍ',
    english: 'Those who split their religion and became sects — you have nothing to do with them.',
    ref: { en: 'Qur’an 6:159', ar: 'القرآن ٦:١٥٩' },
  },
  {
    id: 'q-49-10',
    arabic: 'إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ',
    english: 'The believers are but brothers.',
    ref: { en: 'Qur’an 49:10', ar: 'القرآن ٤٩:١٠' },
  },
]

const ALI: Quote = {
  id: 'ali-letter-53',
  arabic: 'فَإِنَّهُمْ صِنْفَانِ: إِمَّا أَخٌ لَكَ فِي الدِّينِ، أَوْ نَظِيرٌ لَكَ فِي الْخَلْقِ',
  english: 'For they are of two kinds: either a brother to you in religion, or your equal in creation.',
  ref: { en: 'Nahj al-Balagha, Letter 53 (to Malik al-Ashtar)', ar: 'نهج البلاغة، الكتاب ٥٣ (إلى مالك الأشتر)' },
}

const COMMITMENTS: { en: string; ar: string }[] = [
  {
    en: 'We name division itself as the adversary — never Sunnis, never Shia, never any believer.',
    ar: 'نُسمّي الفُرقةَ نفسَها هي الخصم — لا أهل السنّة، ولا الشيعة، ولا أيّ مؤمن.',
  },
  {
    en: 'We lead with the shared ground before we ever touch a difference.',
    ar: 'نبدأ بالأرضيّة المشتركة قبل أن نقترب من أيّ خلاف.',
  },
  {
    en: 'We attribute each tradition’s view to its own sources, and we never declare one of them “the true one.”',
    ar: 'ننسب رأي كلّ تقليدٍ إلى مصادره، ولا نُعلن أنّ أحدها هو «الصحيح» دون الآخر.',
  },
  {
    en: 'We never disparage any companion or any revered figure of either tradition.',
    ar: 'لا ننتقص من أيّ صحابيّ أو أيّ شخصيّةٍ مُبجّلةٍ عند أيٍّ من التقليدَين.',
  },
  {
    en: 'We meet you within your own tradition, and we answer the person — not the argument.',
    ar: 'نلقاك داخل تقليدك أنت، ونُجيب الإنسانَ — لا الجدال.',
  },
]

export default function Unity() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const isAr = lang === 'ar'
  const { speakingId, toggle } = useReadAloud()

  function QuoteCard({ q, gold }: { q: Quote; gold?: boolean }) {
    const playing = speakingId === q.id
    return (
      <div
        style={{
          border: `1px solid ${gold ? 'rgba(233,201,122,0.45)' : 'var(--border)'}`,
          borderRadius: 14,
          padding: '16px 18px',
          marginBottom: 14,
          background: gold ? 'rgba(233,201,122,0.06)' : 'rgba(255,255,255,0.02)',
        }}
      >
        <p
          lang="ar"
          dir="rtl"
          style={{
            fontFamily: 'var(--font-arabic), serif',
            fontSize: 'clamp(19px, 4.6vw, 24px)',
            lineHeight: 1.85,
            color: 'var(--cream)',
            fontWeight: 600,
            margin: '0 0 12px',
          }}
        >
          {q.arabic}
        </p>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.65,
            color: 'var(--text)',
            margin: '0 0 10px',
            fontFamily: isAr ? 'var(--font-arabic-body)' : undefined,
          }}
        >
          {q.english}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--gold)', fontSize: 12.5, letterSpacing: '0.04em' }}>{q.ref[lang]}</span>
          <button
            onClick={() => toggle(q.id, q.arabic, lang, 'verse')}
            style={{
              marginInlineStart: 'auto',
              padding: '5px 12px',
              borderRadius: 8,
              border: '1px solid var(--border)',
              background: playing ? 'rgba(201, 74, 74, 0.18)' : 'transparent',
              color: playing ? '#ff8a8a' : 'var(--gold)',
              cursor: 'pointer',
              fontSize: 11,
              letterSpacing: '0.05em',
            }}
          >
            {playing ? (isAr ? '⏹ إيقاف' : '⏹ Stop') : isAr ? '🔊 استمع' : '🔊 Listen'}
          </button>
        </div>
      </div>
    )
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
          onClick={() => navigate('/')}
          style={{
            fontSize: 11,
            color: 'var(--gold)',
            padding: '6px 12px',
            border: '1px solid var(--border)',
            borderRadius: 20,
            background: 'transparent',
            cursor: 'pointer',
            marginBottom: '1.25rem',
          }}
        >
          ↩ {isAr ? 'عودة' : 'Back'}
        </button>

        <h1
          style={{
            fontSize: 24,
            color: 'var(--gold)',
            marginBottom: 6,
            fontWeight: 700,
            fontFamily: isAr ? 'var(--font-arabic)' : undefined,
          }}
        >
          {isAr ? 'موقفنا من الوحدة' : 'Our Stance on Unity'}
        </h1>

        <p
          style={{
            fontSize: 15,
            lineHeight: 1.8,
            color: 'var(--text)',
            margin: '0 0 22px',
            fontFamily: isAr ? 'var(--font-arabic-body)' : undefined,
          }}
        >
          {isAr
            ? 'بُني «الإمام علي» ليجمع الناس، لا ليأخذ جانباً. وحيث يختلف المسلمون، نحمل الرأيَين باحترام، وندَع كلام الله وكلام الإمام علي (عليه السلام) يتقدّم. خصومتنا للفُرقة نفسها — وهي ما سمّاه القرآن صراحةً — لا لمذهبٍ ولا لمؤمن.'
            : 'Imam Ali is built to bring people together, not to take a side. Where Muslims differ, we hold both views with respect and let the words of God and of Imam Ali (peace be upon him) lead. Our opposition is to division itself — a thing the Qur’an names plainly — not to any school, and not to any believer.'}
        </p>

        <h2 style={{ fontSize: 14, color: 'var(--cream)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 12px', fontFamily: isAr ? 'var(--font-arabic)' : undefined }}>
          {isAr ? 'ما يقوله القرآن' : 'What the Qur’an says'}
        </h2>
        {VERSES.map((v) => (
          <QuoteCard key={v.id} q={v} />
        ))}

        <h2 style={{ fontSize: 14, color: 'var(--cream)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '22px 0 12px', fontFamily: isAr ? 'var(--font-arabic)' : undefined }}>
          {isAr ? 'ما قاله الإمام عليّ' : 'What Imam Ali said'}
        </h2>
        <QuoteCard q={ALI} gold />

        <h2 style={{ fontSize: 14, color: 'var(--cream)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '22px 0 12px', fontFamily: isAr ? 'var(--font-arabic)' : undefined }}>
          {isAr ? 'التزاماتنا' : 'Our commitments'}
        </h2>
        <ul style={{ margin: 0, paddingInlineStart: 22, listStyle: 'none' }}>
          {COMMITMENTS.map((c, i) => (
            <li
              key={i}
              style={{
                position: 'relative',
                fontSize: 14.5,
                lineHeight: 1.75,
                color: 'var(--text)',
                marginBottom: 12,
                paddingInlineStart: 4,
                fontFamily: isAr ? 'var(--font-arabic-body)' : undefined,
              }}
            >
              <span style={{ position: 'absolute', insetInlineStart: -18, color: 'var(--gold)' }}>◈</span>
              {c[lang]}
            </li>
          ))}
        </ul>

        <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 28, lineHeight: 1.7, fontStyle: 'italic', fontFamily: isAr ? 'var(--font-arabic-body)' : undefined }}>
          {isAr
            ? '«وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا».'
            : '“Hold firmly to the rope of God, all together, and do not be divided.”'}
        </p>
      </main>
      <ServiceNav />
    </>
  )
}
