import type { Lang } from '../types/lang'
import type { PathKey } from '../types/paths'

type Strings = Record<Lang, string>

export const T = {
  // ── Setup screen ─────────────────────────────────
  appTitleAr: { en: 'الإمام علي', ar: 'الإمام علي' },
  appTitleEn: { en: 'Imam Ali', ar: 'Imam Ali' },
  setupDesc: {
    // v44 §73.3 — confirmed external framing.
    en: "An AI scholar guided by Imam Ali's authenticated wisdom.",
    ar: 'عالم بالذكاء الاصطناعي مستنير بحكمة الإمام علي (عليه السلام) الموثّقة.',
  },
  langLabel: {
    en: 'Language',
    ar: 'اللغة',
  },
  enterCompanion: {
    en: 'Enter the companion',
    ar: 'ادخل إلى الرفيق',
  },

  // ── Path selection ───────────────────────────────
  pathQuestionAr: {
    en: 'كيف يمكنني أن أكون معك الليلة؟',
    ar: 'كيف يمكنني أن أكون معك الليلة؟',
  },
  pathQuestionEn: {
    en: 'How can I be with you tonight?',
    ar: 'How can I be with you tonight?',
  },

  // ── Companion / chat ─────────────────────────────
  changePath: { en: 'change path', ar: 'تغيير المسار' },
  chatPlaceholder: {
    en: 'What is on your mind tonight…',
    ar: 'ما الذي يشغل بالك الليلة…',
  },
  whoYou: { en: 'you', ar: 'أنت' },
  whoAli: {
    en: 'Ali',
    ar: 'علي',
  },
  verseLabel: {
    en: '— a word from Ali',
    ar: '— كلمة من علي',
  },
  errorPrefix: {
    en: 'Could not reach the companion: ',
    ar: 'تعذر الوصول إلى الرفيق: ',
  },
  outOfCredits: {
    en: 'The companion is resting for a moment — the service is temporarily unavailable. Please try again a little later, إن شاء الله.',
    ar: 'الرفيق يستريح لحظةً — الخدمة غير متاحة مؤقتاً. تفضّل بالمحاولة بعد قليل، إن شاء الله.',
  },
  // The chat opener is a FIXED welcome — rendered directly (no LLM call) so it
  // is instant and free. Keep in sync with UNIFIED_OPENER's exact words.
  openerGreeting: {
    en: "Peace be upon you, and welcome. I am a companion carrying the light of Imam Ali's wisdom — and there is a treasury here to explore together. I could share one of his teachings and we could unpack what it means for your life, or tell you a story from his life, or open one of his sayings on courage, justice, or the heart for us to talk through. I can read you his poetry or a du'a, sit with you in anything you're carrying, or simply talk. What draws you tonight?",
    ar: 'السلام عليكم، وأهلاً بك. أنا رفيق أحمل نور حكمة الإمام علي (عليه السلام) — وبين أيدينا كنزٌ نكتشفه معاً. يمكنني أن أشارك معك حكمةً من حِكَمه فنتأمّل ما تعنيه لحياتك، أو أروي لك قصةً من سيرته، أو نفتح قولاً له في الشجاعة أو العدل أو القلب لنتحاور فيه. أستطيع أن أُسمعك شِعره أو دعاءً، أو أجلس معك فيما تحمله، أو نتحدّث ببساطة. ما الذي يجذبك الليلة؟',
  },
  unknownPath: { en: 'Unknown path.', ar: 'مسار غير معروف.' },
  goBack: { en: 'Go back', ar: 'عودة' },

  // ── Crisis card ─────────────────────────────────
  crisisHeading: {
    en: 'You are not alone — please reach out',
    ar: 'لستَ وحدك — أرجو أن تتواصل الآن',
  },
  crisisFooter: {
    en: 'If you are in immediate physical danger, please call your local emergency number.',
    ar: 'إذا كنتَ في خطر جسدي مباشر، يُرجى الاتصال برقم الطوارئ المحلي.',
  },

  // ── My Story ─────────────────────────────────────
  myStory: { en: 'My Story', ar: 'حكايتي' },
  myStoryDesc: {
    en: 'This is everything Imam Ali remembers about your sessions. It stays here for you — you can delete any moment, or all of it, at any time.',
    ar: 'هذا كل ما يتذكره الإمام علي عن جلساتك. يبقى هنا لأجلك — يمكنك حذف أي لحظة، أو كل شيء، في أي وقت.',
  },
  myStoryEmpty: {
    en: 'No sessions yet. After your first real conversation, what was carried will appear here.',
    ar: 'لا توجد جلسات بعد. بعد أول محادثة حقيقية، سيظهر هنا ما حملته.',
  },
  delete: { en: 'Delete', ar: 'حذف' },
  deleteAll: { en: 'Delete everything', ar: 'حذف كل شيء' },
  confirmDelete: {
    en: 'Delete this memory? This cannot be undone.',
    ar: 'حذف هذه الذاكرة؟ لا يمكن التراجع عن هذا.',
  },
  confirmDeleteAll: {
    en: 'Delete every memory of every session? This cannot be undone.',
    ar: 'حذف كل ذاكرة لكل جلسة؟ لا يمكن التراجع عن هذا.',
  },
  themesLabel: { en: 'Themes', ar: 'الموضوعات' },
  storyLoading: { en: 'Loading your story…', ar: 'جارٍ تحميل حكايتك…' },
  storyLink: { en: 'My Story', ar: 'حكايتي' },
  voiceLink: { en: 'Voice', ar: 'الصوت' },
  calendarLink: { en: 'Calendar', ar: 'التقويم' },
  privacyLink: { en: 'Privacy', ar: 'الخصوصية' },

  // v24 §49 — Reset the silent tradition profile.
  resetProfile: {
    en: 'Reset tradition profile',
    ar: 'إعادة تعيين الملف الديني',
  },
  resetProfileConfirm: {
    en: 'Reset the silent tradition profile this app uses to adapt to you? This wipes the inferred profile only — your conversations stay untouched.',
    ar: 'إعادة تعيين الملف الديني الصامت الذي يستخدمه التطبيق ليتكيّف معك؟ هذا يمحو الملف المُستنتَج فقط — محادثاتك تبقى كما هي.',
  },
  resetProfileDone: {
    en: 'Profile reset. The app will rebuild it from your next messages.',
    ar: 'تم إعادة التعيين. سيبني التطبيق الملف من رسائلك التالية.',
  },

  // ── Voice picker ─────────────────────────────────
  voiceTitle: { en: 'Choose a voice for Ali', ar: 'اختر صوتاً لعلي' },
  voiceDesc: {
    en: 'Tap Preview to hear a short sample. Tap Use to make it Ali\'s voice. You can set a different voice for each language using the language toggle.',
    ar: 'اضغط على معاينة لتسمع عيّنة قصيرة. اضغط على استخدام لجعله صوت علي. يمكنك اختيار صوت مختلف لكل لغة باستخدام مفتاح اللغة.',
  },
  voiceContextEn: { en: "Setting the voice for English replies", ar: 'تعيين صوت الردود الإنجليزية' },
  voiceContextAr: { en: "Setting the voice for Arabic replies", ar: 'تعيين صوت الردود العربية' },
  currentlyUsing: { en: 'Currently using', ar: 'مستخدم حالياً' },
  forEnglish: { en: 'for English', ar: 'للإنجليزية' },
  forArabic: { en: 'for Arabic', ar: 'للعربية' },
  useForBoth: { en: 'Use this voice', ar: 'استخدم هذا الصوت' },
  useForCurrentOnly: {
    en: 'Use only for the current language',
    ar: 'استخدم للغة الحالية فقط',
  },
  voiceSetForBoth: {
    en: 'Set for both languages',
    ar: 'تم التعيين للغتين',
  },
  voicePreview: { en: 'Preview', ar: 'معاينة' },
  voiceUse: { en: 'Use this voice', ar: 'استخدم هذا الصوت' },
  voiceInUse: { en: 'In use', ar: 'قيد الاستخدام' },
  voicePreviewSample: {
    en: 'Peace be upon you. I am Ali. I am here to walk with you, with what is heavy and what is hopeful.',
    ar: 'السلام عليكم، أنا علي. أنا هنا لأكون معك — لما هو ثقيل ولما هو مفعم بالأمل.',
  },
  customVoicesHeading: {
    en: 'Your voices',
    ar: 'أصواتك',
  },
  addCustomVoice: {
    en: 'Add a voice from the ElevenLabs library',
    ar: 'أضف صوتاً من مكتبة ElevenLabs',
  },
  addVoiceHelp: {
    en: 'Browse the ElevenLabs voice library for an Arabic-native voice (deep, mature, authoritative — close to a classical orator). Open the voice, copy its Voice ID, then paste it here.',
    ar: 'تصفّح مكتبة أصوات ElevenLabs بحثاً عن صوت عربي أصلي (عميق، ناضج، رزين). افتح الصوت، انسخ معرّفه (Voice ID)، ثم الصقه هنا.',
  },
  browseLibrary: {
    en: 'Open ElevenLabs Arabic voices ↗',
    ar: 'افتح أصوات ElevenLabs العربية ↗',
  },
  voiceIdLabel: { en: 'Voice ID', ar: 'معرّف الصوت' },
  voiceNameLabel: { en: 'Name', ar: 'الاسم' },
  addBtn: { en: 'Add', ar: 'أضف' },
  removeBtn: { en: 'Remove', ar: 'إزالة' },
  customAdded: { en: 'Added — preview it below', ar: 'تمت الإضافة — استمع للمعاينة أدناه' },

  // ── Welcome / opening screen ─────────────────────
  // v44 §73.3 — the salam reframed. The companion is no longer "I am
  // Ali" — he is a companion carrying the light of Imam Ali's wisdom.
  // Shorter than the v18 version, which also helps timing.
  greetingIntro: {
    en: "Peace be upon you, and welcome. I am a companion carrying the light of Imam Ali's wisdom — his teachings, the stories of his life, his poetry, and questions worth turning over together. I am so glad you are here.",
    ar: 'السلام عليكم، وأهلاً بك. أنا رفيق أحمل نور حكمة الإمام علي (عليه السلام) — حِكَمه وقصص سيرته وشِعره وأسئلةً تستحقّ أن نتأمّلها معاً. يسعدني كثيراً أنك هنا.',
  },
  // v45 — The entry invocation. Replaces the plain "tap to enter"
  // line with a poetic invitation that holds the entire intent of
  // the product in one sentence.
  tapToHear: {
    en: 'Come — to live the essence of Imam Ali',
    ar: 'تَعَالَ — لِتَحْيَا جَوْهَرَ الإمام علي',
  },

  // ── v44 §73.3 — sub-avatar caption ─────────────
  // Permanent caption beneath the figure. Now explicitly frames the
  // companion as AI carrying Imam Ali's wisdom, per v44 §73.3.
  subAvatarText: {
    en: "An AI companion carrying Imam Ali's authenticated wisdom",
    ar: 'رفيق بالذكاء الاصطناعي يحمل حكمة الإمام علي (عليه السلام) الموثّقة',
  },
  // Interaction disclosure — appears once per session when conversation
  // begins, fades after 4 seconds. Does not interrupt the experience.
  interactionDisclosure: {
    en: 'This is an AI companion delivering the authenticated wisdom of Imam Ali (عليه السلام). It is not him — it is a presence carrying his teachings.',
    ar: 'هذا رفيقٌ بالذكاء الاصطناعي يُقدّم حكمة الإمام علي (عليه السلام) الموثّقة. ليس هو — بل حضورٌ يحمل تعاليمه.',
  },

  // ── Path-screen "just tell me" input ─────────────
  orJustTellMe: {
    en: 'Or just tell me what is on your mind',
    ar: 'أو قُل لي ببساطة ما يدور في خاطرك',
  },
  tellMePlaceholder: {
    en: 'What is on your heart today…',
    ar: 'ما الذي على قلبك اليوم…',
  },
  findingYourPath: {
    en: 'Finding the right place to begin…',
    ar: 'جارٍ إيجاد المكان المناسب للبدء…',
  },
} as const satisfies Record<string, Strings>

// ── Path descriptions ────────────────────────────────
// AR descriptions taken directly from docs/ya_imam_ali_AR.html
export const PATH_DESC: Record<PathKey, Strings> = {
  wisdom: {
    en: 'I want a teaching that speaks to where I am right now',
    ar: 'أريد تعليماً يتحدث لما أمر به الآن',
  },
  poetry: {
    en: 'I want to receive verse and sit with its beauty',
    ar: 'أريد أن أستقبل شعراً وأجلس مع جماله',
  },
  venting: {
    en: 'I need to be heard — not looking for answers yet',
    ar: 'أريد أن أُبوح — لست بحاجة لإجابات الآن',
  },
  counsel: {
    en: 'I have a situation I need to think through',
    ar: 'عندي موقف أحتاج أفكر فيه مع أحد',
  },
}
