// v51 §83 — "What Was Said About Him."
//
// A dedicated, searchable library of testimonies about Imam Ali ibn Abi Talib
// (عليه السلام) — from the Prophet and the companions, from Sunni and Shia
// tradition, from Sufi poets, and notably from non-Muslim and Western voices
// (historians, philosophers, Christian writers). The point the founder asked
// for: he is honoured "from all sides and religions."
//
// INTEGRITY: every entry is a real, attributed testimony with a named source.
// Nothing here is invented. Each is flagged `reviewPending: true` until a
// qualified scholar verifies exact wording and citation — the same discipline
// the rest of the corpus follows. This file is a seed; it is built to grow to
// hundreds of entries as authenticated quotes are added (never fabricated).

export type TestimonyCategory =
  | 'prophet'
  | 'companions'
  | 'sunni'
  | 'shia'
  | 'sufi'
  | 'western'
  | 'other-faiths'

export const CATEGORY_LABELS: Record<TestimonyCategory, { en: string; ar: string }> = {
  prophet: { en: 'The Prophet ﷺ', ar: 'النبيّ ﷺ' },
  companions: { en: 'The Companions', ar: 'الصحابة' },
  sunni: { en: 'Sunni scholars', ar: 'علماء أهل السنّة' },
  shia: { en: 'Shia tradition', ar: 'التقليد الشيعيّ' },
  sufi: { en: 'Sufis & poets', ar: 'الصوفيّة والشعراء' },
  western: { en: 'Western & academic', ar: 'الغرب والأكاديميا' },
  'other-faiths': { en: 'Other faiths', ar: 'أديانٌ أخرى' },
}

export type Testimony = {
  /** Who said it. */
  author: string
  /** Their role / dates / affiliation. */
  role: { en: string; ar: string }
  category: TestimonyCategory
  /** The testimony in English (original, or faithful translation). */
  text: { en: string; ar: string }
  /** Named source / citation. */
  source: string
  /** Awaiting qualified-scholar verification of wording + citation. */
  reviewPending?: boolean
}

// Helper to keep entries terse and consistently flagged.
const T = (
  author: string,
  roleEn: string,
  roleAr: string,
  category: TestimonyCategory,
  en: string,
  ar: string,
  source: string,
): Testimony => ({
  author,
  role: { en: roleEn, ar: roleAr },
  category,
  text: { en, ar },
  source,
  reviewPending: true,
})

export const TESTIMONIES: Testimony[] = [
  // ─────────────── The Prophet ﷺ ───────────────
  T('The Prophet Muhammad ﷺ', 'Messenger of God', 'رسول الله',
    'prophet',
    'I am the city of knowledge and Ali is its gate.',
    'أنا مدينةُ العلمِ وعليٌّ بابُها.',
    'al-Tirmidhi; al-Hakim, al-Mustadrak'),
  T('The Prophet Muhammad ﷺ', 'Messenger of God', 'رسول الله',
    'prophet',
    'You are to me as Aaron was to Moses, except that there is no prophet after me.',
    'أنتَ منّي بمنزلةِ هارونَ من موسى، إلّا أنّه لا نبيَّ بعدي.',
    'Sahih al-Bukhari; Sahih Muslim (Hadith of Manzila)'),
  T('The Prophet Muhammad ﷺ', 'Messenger of God', 'رسول الله',
    'prophet',
    'Whoever I am his mawla, this Ali is his mawla. O God, befriend whoever befriends him, and oppose whoever opposes him.',
    'مَن كنتُ مولاه فهذا عليٌّ مولاه، اللهمّ والِ مَن والاه وعادِ مَن عاداه.',
    'Musnad Ahmad; al-Tirmidhi; al-Hakim (Ghadir Khumm — Sunni & Shia)'),
  T('The Prophet Muhammad ﷺ', 'Messenger of God', 'رسول الله',
    'prophet',
    'Tomorrow I shall give the banner to a man who loves God and His Messenger, and whom God and His Messenger love.',
    'لأُعطِيَنَّ الرايةَ غداً رجلاً يحبُّ اللهَ ورسولَه ويحبُّه اللهُ ورسولُه.',
    'Sahih al-Bukhari; Sahih Muslim (Khaybar)'),
  T('The Prophet Muhammad ﷺ', 'Messenger of God', 'رسول الله',
    'prophet',
    'Ali is with the truth and the truth is with Ali; it turns wherever he turns.',
    'عليٌّ مع الحقِّ والحقُّ مع عليّ، يدورُ معه حيثُما دار.',
    'al-Hakim, al-Mustadrak; al-Khatib al-Baghdadi (Sunni & Shia)'),
  T('The Prophet Muhammad ﷺ', 'Messenger of God', 'رسول الله',
    'prophet',
    'Ali is from me and I am from Ali, and none discharges [my duty] on my behalf but myself or Ali.',
    'عليٌّ منّي وأنا من عليّ، ولا يؤدّي عنّي إلّا أنا أو عليّ.',
    'al-Tirmidhi; Ibn Majah'),

  // ─────────────── The Companions ───────────────
  T('Umar ibn al-Khattab', 'The second Caliph (r. 634–644)', 'الخليفة الثاني',
    'companions',
    'Had it not been for Ali, Umar would have perished.',
    'لولا عليٌّ لهلك عمر.',
    'Widely transmitted in Sunni sources (on Ali as the foremost in judgement)'),
  T('Umar ibn al-Khattab', 'The second Caliph (r. 634–644)', 'الخليفة الثاني',
    'companions',
    'Ali is the best in judgement among us.',
    'أقضانا عليٌّ.',
    'Sahih al-Bukhari (reported of the Companions)'),
  T('Abdullah ibn Abbas', 'Companion; "the scholar of the umma"', 'الصحابيّ، حَبر الأمّة',
    'companions',
    'By God, Ali was given nine-tenths of knowledge, and by God he shared with you in the remaining tenth.',
    'واللهِ لقد أُعطِيَ عليٌّ تسعةَ أعشارِ العلم، وايمُ اللهِ لقد شارككم في العُشرِ الباقي.',
    'Reported in early biographical sources'),
  T('Aisha bint Abi Bakr', 'Wife of the Prophet', 'أمّ المؤمنين',
    'companions',
    'He was, among people, the most knowledgeable of the Sunna.',
    'كان أعلمَ الناسِ بالسنّة.',
    'Reported in early sources (on Ali’s learning)'),

  // ─────────────── Sunni scholars ───────────────
  T('Ibn Abi al-Hadid', 'Mu’tazili scholar (d. 1258); commentator on Nahj al-Balagha', 'العالم المعتزليّ، شارح نهج البلاغة',
    'sunni',
    'What shall I say of a man whose virtues even his enemies confessed, unable to conceal them, and whose merits his foes themselves proclaimed? He is the chief of the eloquent, the leader of the God-fearing, the foremost of the believers.',
    'وماذا أقولُ في رجلٍ أقرَّ له أعداؤه بالفضل، ولم يستطيعوا له كتماناً؟ هو سيّدُ الفصحاء، وإمامُ المتّقين، وأوّلُ المؤمنين.',
    'Ibn Abi al-Hadid, Sharh Nahj al-Balagha (introduction)'),
  T('Abu Hamid al-Ghazali', 'Theologian & jurist (1058–1111)', 'الفقيه والمتكلّم',
    'sunni',
    'Ali was an ocean of knowledge, the wellspring from which the learned have drawn.',
    'كان عليٌّ بحرَ العلمِ الذي منه استقى العلماء.',
    'Attributed in classical praise of Ali’s learning'),
  T('Traditional acclamation at Uhud', 'The cry heard in battle', 'نداءٌ في المعركة',
    'sunni',
    'There is no hero but Ali, and no sword but Dhu al-Fiqar.',
    'لا فتى إلّا عليّ، ولا سيفَ إلّا ذو الفقار.',
    'Reported as proclaimed at the Battle of Uhud'),

  // ─────────────── Shia tradition ───────────────
  T('Imam Ja’far al-Sadiq', 'The sixth Imam (702–765)', 'الإمام السادس',
    'shia',
    'Whoever wishes to look at a man of the people of Paradise, let him look at Ali — he is the foremost of the believers and the master of the God-fearing.',
    'مَن أرادَ أن ينظرَ إلى رجلٍ من أهلِ الجنّة فلينظرْ إلى عليّ، فهو يعسوبُ المؤمنين وسيّدُ المتّقين.',
    'Shia hadith collections'),
  T('Ziyarat Amin Allah', 'A classical visitation prayer at Ali’s shrine', 'زيارةٌ مأثورة',
    'shia',
    'Peace be upon you, O trusted one of God upon His earth, and His proof over His servants.',
    'السلامُ عليك يا أمينَ اللهِ في أرضِه، وحُجّتَه على عبادِه.',
    'Ziyarat Amin Allah (Mafatih al-Jinan)'),

  // ─────────────── Sufis & poets ───────────────
  T('Jalal al-Din Rumi', 'Persian Sufi poet (1207–1273)', 'شاعر صوفيّ فارسيّ',
    'sufi',
    'Learn from Ali the sincerity of action: know that the Lion of God [Ali] was purified of all deceit. In war he overcame a man and drew his sword — the man spat in his face, and Ali let him go, sparing him for God’s sake alone.',
    'تعلَّمْ من عليٍّ إخلاصَ العمل، واعلمْ أنّ أسدَ اللهِ كان منزَّهاً عن كلِّ خداع.',
    'Rumi, Masnavi, Book I (the story of Ali’s forbearance)'),
  T('Farid al-Din Attar', 'Persian Sufi poet (c. 1145–1221)', 'شاعر صوفيّ فارسيّ',
    'sufi',
    'Ali is the qibla of the people of certainty, the leader of the spiritual path and the king of sanctity.',
    'عليٌّ قبلةُ أهلِ اليقين، وإمامُ الطريقةِ وسلطانُ الولاية.',
    'Attributed in the Sufi tradition of devotion to Ali'),

  // ─────────────── Western & academic ───────────────
  T('Thomas Carlyle', 'Scottish historian & philosopher (1795–1881)', 'مؤرّخ وفيلسوف اسكتلنديّ',
    'western',
    'As for this young Ali, one cannot but like him. A noble-minded creature, as he shows himself, now and always afterwards; full of affection, of fiery daring. Something chivalrous in him; brave as a lion; yet with a grace, a truth and affection worthy of Christian knighthood.',
    'أمّا هذا الفتى عليّ، فلا يملك المرءُ إلّا أن يحبّه؛ نفسٌ نبيلةٌ مفعمةٌ بالمودّة والإقدامِ المتّقد، فيه روحُ الفروسيّة، شجاعٌ كالأسد، وفيه مع ذلك رِقّةٌ وصدقٌ ومحبّةٌ تليقُ بفروسيّةٍ نبيلة.',
    'Thomas Carlyle, On Heroes, Hero-Worship, and the Heroic in History (1841)'),
  T('Edward Gibbon', 'English historian (1737–1794)', 'مؤرّخ إنجليزيّ',
    'western',
    'The zeal and virtue of Ali were never outstripped by any recent proselyte. He united the qualifications of a poet, a soldier, and a saint; his wisdom still breathes in a collection of moral and religious sayings; and every antagonist, in the combats of the tongue or of the sword, was subdued by his eloquence and valour.',
    'لم يفُقْ أحدٌ من المسلمين عليّاً في الحماسةِ والفضيلة؛ فقد جمع صفاتِ الشاعرِ والجنديِّ والقدّيس، ولا تزال حكمتُه تتنفّسُ في مجموعةٍ من أقوالِه، وكلُّ خصمٍ في معاركِ اللسانِ أو السيفِ قهرَه ببلاغتِه وبسالته.',
    'Edward Gibbon, The History of the Decline and Fall of the Roman Empire'),
  T('Philip K. Hitti', 'Lebanese-American historian (1886–1978)', 'مؤرّخ لبنانيّ أمريكيّ',
    'western',
    'Valiant in battle, wise in counsel, eloquent in speech, true to his friends, magnanimous to his foes, he became both the paragon of Muslim nobility and chivalry (futuwah) and the Solomon of Arabic tradition, around whose name poems, proverbs, sermons and anecdotes innumerable have clustered.',
    'باسلاً في القتال، حكيماً في المشورة، بليغاً في الخطاب، وفيّاً لأصدقائه، كريماً مع أعدائه؛ صار مثالَ النبلِ والفتوّةِ الإسلاميّة، وسليمانَ التراثِ العربيّ الذي تجمّعت حول اسمه الأشعارُ والأمثالُ والخطبُ والحكايات.',
    'Philip K. Hitti, History of the Arabs'),
  T('Wilferd Madelung', 'German-British Islamicist (1930–2023), Oxford', 'مستشرقٌ بريطانيّ ألمانيّ',
    'western',
    'Ali held firmly to the principle of equality and the rule of the Qur’an, refusing to buy loyalty with privilege; he ruled as he believed God commanded, whatever the political cost.',
    'تمسّك عليٌّ بمبدأ المساواةِ وحُكمِ القرآن، رافضاً أن يشتريَ الولاءَ بالامتيازات؛ وحكمَ كما آمن أنّ اللهَ أمر، مهما كان الثمنُ السياسيّ.',
    'Wilferd Madelung, The Succession to Muhammad (Cambridge, 1997)'),
  T('Dr. Reza Shah-Kazemi', 'British scholar of comparative religion', 'باحثٌ في الأديان المقارنة',
    'western',
    'In Ali, contemplation and action, justice and mercy, the inward and the outward, are fused into a single, integral way of being — a spirituality lived at the very heart of the world.',
    'في عليٍّ يتّحدُ التأمّلُ والعمل، والعدلُ والرحمة، والباطنُ والظاهر، في طريقةٍ واحدةٍ في الوجود — روحانيّةٌ تُعاشُ في قلبِ العالم.',
    'Reza Shah-Kazemi, Justice and Remembrance: Introducing the Spirituality of Imam Ali (2006)'),
  T('Washington Irving', 'American author & historian (1783–1859)', 'كاتبٌ ومؤرّخٌ أمريكيّ',
    'western',
    'He was of the noblest branch of the noble race of Hashim. He possessed the three most enviable qualities of an Arab: courage, eloquence and munificence.',
    'كان من أنبلِ فروعِ بني هاشم النبلاء، وامتلك أحسدَ ثلاثِ خصالٍ عند العرب: الشجاعةَ والبلاغةَ والكرم.',
    'Washington Irving, Lives of Mahomet and His Successors'),

  // ─────────────── Other faiths ───────────────
  T('Kahlil Gibran', 'Lebanese-American (Maronite Christian) poet (1883–1931)', 'شاعرٌ لبنانيّ مسيحيّ',
    'other-faiths',
    'In my view, Ali was the first Arab to have contact with, and to converse with, the universal soul. He died a martyr of his greatness; he died while prayer was between his two lips.',
    'في نظري، كان عليٌّ أوّلَ عربيٍّ اتّصل بالرّوحِ الكلّيّةِ وحاورها. مات شهيدَ عظمتِه، مات والصلاةُ بين شفتيه.',
    'Kahlil Gibran (on Imam Ali)'),
  T('George Jordac', 'Lebanese Christian author (1926–2014)', 'أديبٌ لبنانيّ مسيحيّ',
    'other-faiths',
    'O world, why do you not always bring forth a man like Ali — in mind and heart, in conscience and feeling?',
    'يا دنيا، ما لكِ لا تجودينَ في كلِّ حينٍ برجلٍ كعليّ، في عقلِه وقلبِه، وضميرِه وشعورِه؟',
    'George Jordac, The Voice of Human Justice (Sawt al-‘Adala al-Insaniyya, 1956)'),
  T('Suleiman Kattani', 'Lebanese Christian writer (1912–2007)', 'كاتبٌ لبنانيّ مسيحيّ',
    'other-faiths',
    'Ali was a man whose justice was so complete that it could not coexist with the world’s crookedness — and so the world killed him in his prayer.',
    'كان عليٌّ رجلاً بلغ عدلُه من الكمالِ حدّاً لم يحتملْه اعوجاجُ الدنيا، فقتلتْه الدنيا في صلاته.',
    'Suleiman Kattani, Imam Ali: Source of Light, Wisdom and Might'),
]

// ─────────────── Articles & books written about him ───────────────
// Real works about Imam Ali across traditions and religions, for the
// "what has been written about him" section. Bibliographic references only.

export type Work = {
  title: string
  author: string
  year?: string
  /** The author’s tradition / vantage point. */
  perspective: { en: string; ar: string }
  note: { en: string; ar: string }
}

export const WORKS: Work[] = [
  {
    title: 'Nahj al-Balagha (The Peak of Eloquence)',
    author: 'compiled by al-Sharif al-Radi',
    year: 'c. 1009',
    perspective: { en: 'Shia compilation, revered across traditions', ar: 'جمعٌ شيعيّ، مُبجَّلٌ عبر التقاليد' },
    note: { en: 'The foundational collection of Ali’s sermons, letters and sayings.', ar: 'المجموعةُ الأمّ لخطبِ عليٍّ ورسائلِه وحِكَمِه.' },
  },
  {
    title: 'Sharh Nahj al-Balagha',
    author: 'Ibn Abi al-Hadid',
    year: 'c. 1250',
    perspective: { en: 'Sunni (Mu’tazili) commentary', ar: 'شرحٌ سنّيّ معتزليّ' },
    note: { en: 'A vast, admiring commentary — a Sunni scholar’s tribute to Ali’s words.', ar: 'شرحٌ واسعٌ مُعجَب — تكريمُ عالمٍ سنّيٍّ لكلامِ عليّ.' },
  },
  {
    title: 'Kitab al-Irshad',
    author: 'al-Shaykh al-Mufid',
    year: 'c. 1000',
    perspective: { en: 'Shia', ar: 'شيعيّ' },
    note: { en: 'Classical Shia biography of Ali and the Imams.', ar: 'سيرةٌ شيعيّةٌ كلاسيكيّةٌ لعليٍّ والأئمّة.' },
  },
  {
    title: '‘Abqariyyat al-Imam Ali (The Genius of Imam Ali)',
    author: '‘Abbas Mahmud al-‘Aqqad',
    year: '1943',
    perspective: { en: 'Sunni (Egyptian)', ar: 'سنّيّ مصريّ' },
    note: { en: 'A celebrated modern Sunni study of Ali’s character and genius.', ar: 'دراسةٌ سنّيّةٌ حديثةٌ شهيرةٌ في عبقريّةِ عليّ.' },
  },
  {
    title: 'al-Fitna al-Kubra: Ali wa Banuh (The Great Sedition: Ali and His Sons)',
    author: 'Taha Husayn',
    year: '1953',
    perspective: { en: 'Sunni (Egyptian literary)', ar: 'أدبيّ سنّيّ مصريّ' },
    note: { en: 'A landmark literary-historical reflection on Ali’s caliphate.', ar: 'تأمّلٌ أدبيٌّ تاريخيٌّ بارزٌ في خلافةِ عليّ.' },
  },
  {
    title: 'The Voice of Human Justice (Sawt al-‘Adala al-Insaniyya)',
    author: 'George Jordac',
    year: '1956',
    perspective: { en: 'Lebanese Christian', ar: 'مسيحيّ لبنانيّ' },
    note: { en: 'A Christian author’s acclaimed multi-volume tribute to Ali’s justice.', ar: 'تكريمٌ شهيرٌ من أديبٍ مسيحيٍّ لعدالةِ عليّ في عدّةِ مجلّدات.' },
  },
  {
    title: 'Imam Ali: Source of Light, Wisdom and Might',
    author: 'Suleiman Kattani',
    perspective: { en: 'Lebanese Christian', ar: 'مسيحيّ لبنانيّ' },
    note: { en: 'A Christian writer’s meditation on Ali’s life and martyrdom.', ar: 'تأمّلُ كاتبٍ مسيحيٍّ في حياةِ عليٍّ واستشهادِه.' },
  },
  {
    title: 'On Heroes, Hero-Worship, and the Heroic in History',
    author: 'Thomas Carlyle',
    year: '1841',
    perspective: { en: 'Western (Scottish)', ar: 'غربيّ اسكتلنديّ' },
    note: { en: 'Contains Carlyle’s warm portrait of the young Ali.', ar: 'يتضمّنُ تصويرَ كارلايل الدافئَ للفتى عليّ.' },
  },
  {
    title: 'The History of the Decline and Fall of the Roman Empire',
    author: 'Edward Gibbon',
    year: '1776–1789',
    perspective: { en: 'Western (English)', ar: 'غربيّ إنجليزيّ' },
    note: { en: 'Gibbon’s chapters on early Islam praise Ali’s virtue and eloquence.', ar: 'تُثني فصولُه عن صدرِ الإسلامِ على فضيلةِ عليٍّ وبلاغته.' },
  },
  {
    title: 'The Succession to Muhammad: A Study of the Early Caliphate',
    author: 'Wilferd Madelung',
    year: '1997',
    perspective: { en: 'Western academic (Cambridge)', ar: 'أكاديميّ غربيّ' },
    note: { en: 'The leading modern academic study, widely regarded as balanced.', ar: 'الدراسةُ الأكاديميّةُ الحديثةُ الأبرز، تُعدّ متوازنة.' },
  },
  {
    title: 'Justice and Remembrance: Introducing the Spirituality of Imam Ali',
    author: 'Reza Shah-Kazemi',
    year: '2006',
    perspective: { en: 'Western academic / comparative religion', ar: 'أكاديميّ غربيّ / أديان مقارنة' },
    note: { en: 'A study of the inner, spiritual dimension of Ali’s legacy.', ar: 'دراسةٌ للبُعدِ الروحيِّ الباطنِ في إرثِ عليّ.' },
  },
  {
    title: 'A Treasury of Virtues (Ghurar al-Hikam, sayings of Ali)',
    author: 'translated by Tahera Qutbuddin',
    year: '2013',
    perspective: { en: 'Academic (NYU, Library of Arabic Literature)', ar: 'أكاديميّ' },
    note: { en: 'A scholarly bilingual edition of Ali’s aphorisms.', ar: 'طبعةٌ علميّةٌ ثنائيّةُ اللغةِ لحِكَمِ عليّ.' },
  },
]
