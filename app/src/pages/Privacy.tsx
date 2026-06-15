// v41 §70.3 + §70.4 — Privacy Policy.
//
// Plain English (and Arabic), not legal boilerplate. Reflects the five
// non-negotiable commitments in §70.3: no selling, no advertisers, no
// model training without explicit opt-in, no proactive sharing with
// governments, conversations are as private as therapy sessions.
//
// Names third-party data processors explicitly (§70.4): Anthropic for
// the model that generates replies, ElevenLabs for the voice, Supabase
// for storage, Vercel for hosting. Stripe is intentionally omitted
// until payments ship — the policy must reflect current truth.
//
// Items that exist in §70.4 but require server work not yet done are
// listed honestly: a "Delete my account" UI is on the roadmap and the
// policy says so without claiming it's already live.

import { useNavigate } from 'react-router-dom'
import { useLang } from '../contexts/LangContext'
import ServiceNav from '../components/ServiceNav'

export default function Privacy() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const isAr = lang === 'ar'

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
          letterSpacing: isAr ? 0 : '0.01em',
          fontFamily: isAr ? 'var(--font-arabic)' : undefined,
        }}
      >
        {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
      </h1>
      <p style={{ fontSize: 10, color: 'var(--muted)', marginBottom: '1.5rem' }}>
        {isAr ? 'آخر تحديث: ١١ يونيو ٢٠٢٦' : 'Last updated: 11 June 2026'}
      </p>

      {isAr ? <ArabicPolicy /> : <EnglishPolicy />}
    </main>
    <ServiceNav />
    </>
  )
}

// ── English ──────────────────────────────────────────────────────────

function EnglishPolicy() {
  return (
    <Body lang="en">
      <Lead>
        This is a spiritual companion app. People bring grief, doubt, anger,
        love, and prayer to it. Our commitment to you is simple: what you
        share with this companion stays as private as a conversation with
        a trusted friend or a therapy session.
      </Lead>

      <Lead>
        This policy is written in plain English. There is no fine print.
        Where we make a promise, we mean it.
      </Lead>

      <H2>Five commitments — never to be broken</H2>

      <P>
        <strong>1. We never sell your data. Ever.</strong> Not now. Not if
        the company is acquired. Not if the company needs revenue. No user
        data is sold under any circumstances.
      </P>
      <P>
        <strong>2. We never share data with advertisers.</strong> The app
        has no advertising and never will. No user data is shared with
        advertising networks, data brokers, or marketing platforms.
      </P>
      <P>
        <strong>3. We never use conversations to train AI models without
        your explicit opt-in.</strong> Anthropic (the company behind the
        model that generates replies) does not train on API data by
        default. We never use conversation content to train our own
        models without a clear, specific opt-in from you.
      </P>
      <P>
        <strong>4. We never share data with governments unless legally
        required to.</strong> If we are served with a valid court order,
        we will comply with the law. We will notify you where legally
        permitted. We do not proactively cooperate with any surveillance
        programme.
      </P>
      <P>
        <strong>5. Your conversations are as private as therapy
        sessions.</strong> Our staff do not read individual conversations.
        Scholar advisors do not have access to user conversations. Quality
        review is performed on anonymised, synthetic examples only.
      </P>

      <H2>What we collect</H2>

      <P>
        <strong>An anonymous user ID</strong> generated in your browser
        the first time you open the app. This ID stays in your browser's
        local storage. It is not linked to your name, email, phone, or
        any other identifier.
      </P>
      <P>
        <strong>The text of your conversations</strong> with the
        companion. Stored on our servers so that the app can remember
        what was discussed and personalise future sessions.
      </P>
      <P>
        <strong>Short summaries of past sessions</strong> generated by
        the app to help the companion pick up where you left off.
      </P>
      <P>
        <strong>Your language preference and chosen voice settings.</strong>
      </P>
      <P>
        <strong>A silent "tradition sensitivity" profile</strong> the app
        builds from the language you use, so the companion can address
        you in a register that fits your tradition. This profile is never
        shown to you and never asked about directly. You can reset it at
        any time from the "My Story" page.
      </P>

      <H2>What we do NOT collect</H2>

      <P>
        We do not collect your name, email address, phone number, postal
        address, location data, contacts, photos, microphone audio
        recordings, or browser history. We do not use cookies for tracking
        or analytics.
      </P>

      <H2>Who else processes your data</H2>

      <P>
        We use a small number of trusted infrastructure providers. Each
        is named here. None of them sees your identity — only the data
        they need to do their part.
      </P>
      <List>
        <Li>
          <strong>Anthropic</strong> — provider of the Claude language
          model that generates the companion's replies. They receive the
          text of your conversation. They do not receive any user ID or
          personal identifier. SOC 2 Type II certified.
        </Li>
        <Li>
          <strong>ElevenLabs</strong> — provider of the voice. They
          receive only the text we ask them to speak. They do not receive
          the rest of your conversation or any identifier.
        </Li>
        <Li>
          <strong>Supabase</strong> — provider of our database and edge
          compute infrastructure. Storage is encrypted at rest with
          AES-256. All traffic uses TLS 1.3.
        </Li>
        <Li>
          <strong>Vercel</strong> — hosts the web application bundle.
          Serves the app itself; does not process conversation content.
        </Li>
      </List>

      <H2>How long we keep your data</H2>

      <P>
        While your account is active, we keep your conversation history
        and summaries so the companion can know you across sessions.
        When you ask us to delete everything (see "Your rights" below),
        we wipe your data within 30 days.
      </P>

      <H2>Your rights (GDPR)</H2>

      <P>
        You have the right to access, correct, delete, and export your
        data. The "My Story" page already lets you delete individual
        memories or all of them, and reset the silent tradition profile.
        Full account deletion and a one-click data export are on the
        product roadmap and will be available before any payment
        features go live. In the meantime, you can email us to request
        either, and we will action it within 30 days.
      </P>

      <H2>Security</H2>

      <P>
        Data is encrypted in transit (TLS 1.3) and at rest (AES-256) by
        default at the infrastructure level. Access to the database is
        restricted: anonymous users can never directly read or write
        another user's rows. All sensitive operations are mediated by
        server-side edge functions running with elevated privileges
        that are not exposed to the browser.
      </P>

      <H2>Breach notification</H2>

      <P>
        In the unlikely event of a data breach affecting your
        information, we will notify you and the UK Information
        Commissioner's Office (ICO) within 72 hours, as required by
        GDPR Article 33.
      </P>

      <H2>Children</H2>

      <P>
        This app is intended for users aged 16 and over. We do not
        knowingly collect data from anyone younger.
      </P>

      <H2>Changes to this policy</H2>

      <P>
        If we change this policy, we will post the new version here with
        an updated "Last updated" date and surface a notice on the
        welcome screen the next time you open the app.
      </P>

      <H2>Contact</H2>

      <P>
        Questions about your data, or to request deletion or export,
        email <strong>privacy@yaimamali.app</strong>. We will respond
        within seven days.
      </P>
    </Body>
  )
}

// ── Arabic ───────────────────────────────────────────────────────────

function ArabicPolicy() {
  return (
    <Body lang="ar">
      <Lead>
        هذا تطبيق رفيق روحي. يأتي إليه الناس بالحزن، والشكّ، والغضب، والحبّ،
        والدعاء. التزامنا لك بسيط: ما تشاركه مع هذا الرفيق يبقى خاصاً كحديثٍ
        مع صديق موثوق أو جلسة مع معالج نفسي.
      </Lead>
      <Lead>
        هذه السياسة مكتوبة بلغة واضحة. لا يوجد بنود مخفية. وعدنا حقيقي.
      </Lead>

      <H2>خمسة التزامات — لا تُكسَر أبداً</H2>

      <P>
        <strong>١. لا نبيع بياناتك. أبداً.</strong> ليس الآن. ليس إن
        استُحوذت الشركة. ليس إن احتاجت الشركة إلى دخل. لا تُباع بيانات أيّ
        مستخدم في أيّ ظرف.
      </P>
      <P>
        <strong>٢. لا نشارك البيانات مع المعلنين.</strong> التطبيق لا يحوي
        إعلانات ولن يحوي. لا تُشارك بيانات المستخدم مع شبكات الإعلانات أو
        سماسرة البيانات.
      </P>
      <P>
        <strong>٣. لا نستخدم المحادثات لتدريب نماذج الذكاء الاصطناعي دون
        موافقتك الصريحة.</strong> شركة Anthropic (التي تقف وراء النموذج الذي
        يولّد ردود الرفيق) لا تدرّب على بيانات API افتراضياً. ولا نستخدم
        محتوى المحادثات لتدريب نماذجنا الخاصة دون موافقتك الواضحة المحدّدة.
      </P>
      <P>
        <strong>٤. لا نشارك البيانات مع أيّ حكومة إلا بأمر قضائي.</strong>
        إن وصلَنا أمر قضائي صحيح، نمتثل للقانون. ونُعلمك حيث يسمح القانون
        بذلك. لا نتعاون بشكلٍ استباقي مع أيّ برنامج مراقبة.
      </P>
      <P>
        <strong>٥. محادثاتك خاصة كجلسات المعالجة النفسية.</strong>
        موظفونا لا يقرؤون المحادثات الفردية. والمستشارون العلميون لا
        يستطيعون الوصول إلى محادثات المستخدمين. وتُجرى مراجعة الجودة على
        أمثلة مجهولة الهوية أو مُصطنعة فقط.
      </P>

      <H2>ما نجمعه</H2>
      <P>
        <strong>معرّف مستخدم مجهول</strong> يُنشَأ في متصفحك أول مرة تفتح
        فيها التطبيق. يبقى هذا المعرّف في التخزين المحلي لمتصفّحك. لا
        يرتبط باسمك أو بريدك أو هاتفك أو أيّ معرّف آخر.
      </P>
      <P>
        <strong>نصوص محادثاتك</strong> مع الرفيق. تُخزَّن على خوادمنا لكي
        يتذكّر التطبيق ما نوقش ويُخصِّص الجلسات القادمة.
      </P>
      <P>
        <strong>ملخّصات قصيرة لجلساتك السابقة</strong> يُولّدها التطبيق
        ليُكمل الرفيق من حيث توقّفت.
      </P>
      <P>
        <strong>لغتك المفضّلة وإعدادات الصوت التي اخترتها.</strong>
      </P>
      <P>
        <strong>ملف "حساسية تقليدية" صامت</strong> يبنيه التطبيق من اللغة
        التي تستخدمها، ليخاطبك الرفيق بنبرة تناسب تقليدك. لا يُعرَض هذا
        الملف عليك أبداً ولا يُسألك عنه مباشرة. يمكنك إعادة تعيينه في أيّ
        وقت من صفحة "حكايتي".
      </P>

      <H2>ما لا نجمعه</H2>
      <P>
        لا نجمع اسمك، أو بريدك، أو هاتفك، أو عنوانك، أو موقعك، أو جهات
        اتصالك، أو صورك، أو تسجيلات الميكروفون، أو سجلّ تصفّحك. ولا
        نستخدم ملفّات تعريف ارتباط للتتبّع أو التحليلات.
      </P>

      <H2>مَن يعالج بياناتك أيضاً</H2>
      <P>
        نستخدم عدداً قليلاً من مزوّدي البنية التحتية الموثوقين. كلٌّ منهم
        مذكور هنا. ولا يرى أيٌّ منهم هويتك — فقط البيانات التي يحتاجها
        لأداء دوره.
      </P>
      <List>
        <Li>
          <strong>Anthropic</strong> — مزوّد نموذج Claude اللغوي الذي
          يولّد ردود الرفيق. يستقبل نصّ محادثتك دون أيّ معرّف. حاصل على
          شهادة SOC 2 Type II.
        </Li>
        <Li>
          <strong>ElevenLabs</strong> — مزوّد الصوت. يستقبل فقط النصّ
          المطلوب نطقه. لا يستقبل بقيّة محادثتك ولا أيّ معرّف.
        </Li>
        <Li>
          <strong>Supabase</strong> — مزوّد قاعدة البيانات والحوسبة
          الطرفية. التخزين مشفّر في الاستراحة بمعيار AES-256، وكلّ
          الحركة مشفّرة بمعيار TLS 1.3.
        </Li>
        <Li>
          <strong>Vercel</strong> — يستضيف حزمة التطبيق. يُقدّم
          التطبيق نفسه دون معالجة محتوى المحادثات.
        </Li>
      </List>

      <H2>مدّة الاحتفاظ بالبيانات</H2>
      <P>
        أثناء فعالية حسابك، نحتفظ بسجلّ محادثاتك والملخّصات لكي يعرفك
        الرفيق عبر الجلسات. عندما تطلب حذف كلّ شيء (انظر "حقوقك" أدناه)،
        نمحو بياناتك خلال ٣٠ يوماً.
      </P>

      <H2>حقوقك (وفق GDPR)</H2>
      <P>
        لك الحقّ في الوصول إلى بياناتك وتصحيحها وحذفها وتصديرها. تُتيح
        صفحة "حكايتي" بالفعل حذف ذكريات فردية أو كلّها وإعادة تعيين الملف
        الصامت. حذف الحساب كاملاً وتصدير البيانات بنقرة واحدة على خارطة
        الطريق، وسيكونان متاحَين قبل أيّ ميزات دفع. في الوقت الحالي، يمكنك
        مراسلتنا لطلب أيٍّ منهما، وسنُنفّذه خلال ٣٠ يوماً.
      </P>

      <H2>الأمان</H2>
      <P>
        البيانات مشفّرة أثناء النقل (TLS 1.3) وفي الاستراحة (AES-256)
        افتراضياً على مستوى البنية التحتية. الوصول إلى قاعدة البيانات
        مقيّد: لا يمكن للمستخدمين المجهولين قراءة أو كتابة صفوف مستخدم
        آخر. كلّ العمليات الحسّاسة تمرّ عبر دوال طرفية على الخادم تعمل
        بصلاحيات مرتفعة لا تظهر للمتصفّح.
      </P>

      <H2>الإشعار بالاختراق</H2>
      <P>
        في حال وقوع اختراق بيانات يؤثّر على معلوماتك — وهو أمر مستبعد —
        نُعلمك ونُعلم مكتب مفوّض المعلومات في المملكة المتحدة (ICO) خلال
        ٧٢ ساعة، كما تقتضي المادة ٣٣ من GDPR.
      </P>

      <H2>الأطفال</H2>
      <P>
        هذا التطبيق مُعدّ للمستخدمين من سنّ ١٦ فأكبر. ولا نجمع عن علم
        بيانات من هم أصغر سناً.
      </P>

      <H2>تعديلات هذه السياسة</H2>
      <P>
        إن غيّرنا هذه السياسة، ننشر الإصدار الجديد هنا مع تاريخ "آخر
        تحديث" مُحدَّث، ونعرض إشعاراً على شاشة الترحيب في زيارتك التالية.
      </P>

      <H2>التواصل</H2>
      <P>
        للأسئلة حول بياناتك أو لطلب الحذف أو التصدير، راسلنا على{' '}
        <strong>privacy@yaimamali.app</strong>. نردّ خلال سبعة أيام.
      </P>
    </Body>
  )
}

// ── Layout primitives ────────────────────────────────────────────────

function Body({ children, lang }: { children: React.ReactNode; lang: 'en' | 'ar' }) {
  return (
    <div
      style={{
        fontSize: 13,
        lineHeight: 1.85,
        color: 'var(--text)',
        fontFamily: lang === 'ar' ? 'var(--font-arabic-body)' : 'var(--font-sans)',
      }}
    >
      {children}
    </div>
  )
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 13,
        lineHeight: 1.85,
        margin: '0 0 14px',
        color: 'var(--cream)',
      }}
    >
      {children}
    </p>
  )
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: 15,
        color: 'var(--gold)',
        fontWeight: 600,
        marginTop: '1.6rem',
        marginBottom: '0.6rem',
        letterSpacing: '0.02em',
      }}
    >
      {children}
    </h2>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ margin: '0 0 12px' }}>{children}</p>
}

function List({ children }: { children: React.ReactNode }) {
  return (
    <ul style={{ margin: '0 0 14px', paddingInlineStart: '1.2rem' }}>
      {children}
    </ul>
  )
}

function Li({ children }: { children: React.ReactNode }) {
  return <li style={{ margin: '0 0 8px' }}>{children}</li>
}
