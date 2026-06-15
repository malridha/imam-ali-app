// v46 §75 — Teachings organised by theme for the Teachings page.
//
// Single source of truth for the user-facing content. Aggregates:
//   1. The 14 wisdom entries in the corpus migration (the seed for RAG)
//   2. The BASELINE_WISDOM entries from baseline-corpus.ts (8 additional)
//   3. The BASELINE_POETRY entries (4 Diwan verses)
//   4. The BASELINE_DUAS entries (7 du'as)
//
// Themes are user-facing categories; the LLM uses the corpus
// independently for retrieval. Both sets are kept aligned so the
// Teachings page and the chat companion don't diverge.

import {
  BASELINE_DUAS,
  BASELINE_LETTERS,
  BASELINE_POETRY,
  BASELINE_SERMONS,
  BASELINE_WISDOM,
  type BaselineEntry,
  type LongFormEntry,
} from '../lib/prompts/baseline-corpus'

export type TeachingsTheme = {
  /** Slug for anchor / URL fragment */
  id: string
  /** Theme title, bilingual */
  title: { en: string; ar: string }
  /** One-line lead-in shown below the title */
  lead: { en: string; ar: string }
  /** Entries belonging to this theme */
  entries: BaselineEntry[]
}

// ── Mirror of the 14 corpus migration entries, in BaselineEntry shape.
// Single source of truth — keep aligned with
// supabase/migrations/20260514123046_init_corpus.sql
const CORPUS_WISDOM: BaselineEntry[] = [
  {
    arabic: 'لَا تَشْغَلْ قَلْبَكَ بِمَا لَمْ يَكُنْ، فَإِنَّ ذَلِكَ يُضْعِفُكَ عَمَّا قَدْ كَانَ',
    english: 'Do not occupy your heart with what has not happened — it weakens you against what is already here.',
    source: 'Ghurar al-Hikam',
    theme: 'anxiety',
  },
  {
    arabic: 'الصَّبْرُ مِنَ الإِيمَانِ كَالرَّأْسِ مِنَ الجَسَدِ',
    english: 'Patience is to faith what the head is to the body.',
    source: 'Nahj al-Balagha',
    theme: 'grief',
  },
  {
    arabic: 'أَشْجَعُ النَّاسِ مَنْ غَلَبَ هَوَاهُ',
    english: 'The bravest of people is the one who conquers their own desires.',
    source: 'Ghurar al-Hikam',
    theme: 'anger',
  },
  {
    arabic: 'قِيمَةُ كُلِّ امْرِئٍ مَا يُحْسِنُهُ',
    english: 'The worth of every person is in what they do well.',
    source: 'Nahj al-Balagha, Hikma 81',
    theme: 'purpose',
  },
  {
    arabic: 'مَنْ كَرُمَتْ عَلَيْهِ نَفْسُهُ هَانَتْ عَلَيْهِ الدُّنْيَا',
    english: 'Whoever honours their own self, the world becomes insignificant to them.',
    source: 'Nahj al-Balagha',
    theme: 'self-worth',
  },
  {
    arabic: 'لَا تَنْظُرْ إِلَى مَنْ فَاقَكَ فِي الدُّنْيَا',
    english: 'Do not look upon those who are ahead of you in worldly things.',
    source: 'Ghurar al-Hikam',
    theme: 'comparison',
  },
  {
    arabic: 'الشَّكُّ جُزْءٌ مِنَ الطَّرِيقِ إِلَى اليَقِينِ',
    english: 'Doubt is part of the path to certainty.',
    source: 'Attributed tradition',
    theme: 'faith',
  },
  {
    arabic: 'لَا وَحْشَةَ لِمَنْ أَنِسَ بِاللَّهِ',
    english: 'There is no loneliness for one who finds intimacy with God.',
    source: 'Diwan of Imam Ali',
    theme: 'loneliness',
  },
  {
    arabic: 'الغِنَى فِي الغُرْبَةِ وَطَنٌ، وَالفَقْرُ فِي الوَطَنِ غُرْبَةٌ',
    english: 'Wealth in a foreign land is home; poverty at home is exile.',
    source: 'Nahj al-Balagha',
    theme: 'financial',
  },
  {
    arabic: 'إِذَا قَدَرْتَ عَلَى عَدُوِّكَ فَاجْعَلِ العَفْوَ شُكْراً لِلْقُدْرَةِ',
    english: 'When you have power over your enemy, make forgiveness your gratitude for that power.',
    source: 'Nahj al-Balagha',
    theme: 'forgiveness',
  },
  {
    arabic: 'خَيْرُكُمْ خَيْرُكُمْ لِأَهْلِهِ',
    english: 'The best of you is the one who is best to their family.',
    source: 'Transmitted tradition',
    theme: 'family',
  },
  {
    arabic: 'مَا هَلَكَ مَنْ عَرَفَ قَدْرَهُ',
    english: 'No one is destroyed who knows their own worth.',
    source: 'Ghurar al-Hikam',
    theme: 'self-worth',
  },
  {
    arabic: 'النَّاسُ صِنْفَانِ، إِمَّا أَخٌ لَكَ فِي الدِّينِ أَوْ نَظِيرٌ لَكَ فِي الخَلْقِ',
    english: 'People are of two kinds: either your brother in faith or your equal in creation.',
    source: 'Nahj al-Balagha, Letter 53',
    theme: 'relationships',
  },
  {
    arabic: 'مَنْ عَرَفَ نَفْسَهُ فَقَدْ عَرَفَ رَبَّهُ',
    english: 'Whoever knows themselves, knows their Lord.',
    source: 'Attributed to Imam Ali',
    theme: 'self-knowledge',
  },
]

// ── Combined library — all wisdom from corpus + baseline.
export const ALL_WISDOM: BaselineEntry[] = [...CORPUS_WISDOM, ...BASELINE_WISDOM]

// Helper: gather entries whose theme tag contains any of the keywords.
function entriesMatching(keywords: string[]): BaselineEntry[] {
  const result: BaselineEntry[] = []
  for (const e of ALL_WISDOM) {
    const themeLower = e.theme.toLowerCase()
    if (keywords.some((k) => themeLower.includes(k))) result.push(e)
  }
  return result
}

// ── Themed library — what the user sees on the Teachings page.
export const TEACHINGS_THEMES: TeachingsTheme[] = [
  {
    id: 'patience-grief',
    title: { en: 'On Patience and Grief', ar: 'في الصبر والحزن' },
    lead: {
      en: 'When something heavy has arrived and there is nothing to do but bear it.',
      ar: 'حين يأتي الثقيلُ ولا شيء يُفعل إلا أن يُحتمَل.',
    },
    entries: entriesMatching(['grief', 'patience']),
  },
  {
    id: 'anger-forgiveness',
    title: { en: 'On Anger and Forgiveness', ar: 'في الغضب والعفو' },
    lead: {
      en: 'On what to do with what burns, and what to do with the power to retaliate.',
      ar: 'فيما يُفعل بما يحرق، وفيما يُفعل بالقدرة على الردّ.',
    },
    entries: entriesMatching(['anger', 'forgiveness']),
  },
  {
    id: 'self-knowledge',
    title: { en: 'On Knowing Yourself', ar: 'في معرفة النفس' },
    lead: {
      en: 'On the inward journey — and where it ends.',
      ar: 'في الطريق الداخليّ — وأين ينتهي.',
    },
    entries: entriesMatching(['self-knowledge', 'self-worth']),
  },
  {
    id: 'knowledge-wisdom',
    title: { en: 'On Knowledge and Worth', ar: 'في العلم وقدر المرء' },
    lead: {
      en: "On what is worth investing in, and what gives a person's life its weight.",
      ar: 'فيما يستحقّ أن يُستثمَر فيه، وما يمنح حياة المرء ثقلها.',
    },
    entries: entriesMatching(['purpose', 'on learning', 'on what to invest']),
  },
  {
    id: 'family-friendship',
    title: { en: 'On Family and Friendship', ar: 'في الأهل والصداقة' },
    lead: {
      en: 'On the people closest to you — what they deserve, what holds them.',
      ar: 'في أقرب الناس إليك — ما يستحقّون، وما يُمسكهم.',
    },
    entries: entriesMatching(['family', 'friendship', 'relationships', 'speech']),
  },
  {
    id: 'solitude-faith',
    title: { en: 'On Solitude and Faith', ar: 'في العزلة والإيمان' },
    lead: {
      en: 'On what is there when no one else is.',
      ar: 'فيما يبقى حين لا يبقى أحد سواه.',
    },
    entries: entriesMatching(['loneliness', 'faith']),
  },
  {
    id: 'long-view',
    title: { en: 'On the Long View', ar: 'في النظرة البعيدة' },
    lead: {
      en: 'On time, on hopes, on what corrupts when stretched too far.',
      ar: 'في الزمن، والآمال، وما يفسد إذا طال.',
    },
    entries: entriesMatching(['on time', 'on procrastination', 'on the long view']),
  },
  {
    id: 'world-wealth',
    title: { en: 'On the World and Wealth', ar: 'في الدنيا والمال' },
    lead: {
      en: 'On comparison, on what makes a place home, on what poverty actually is.',
      ar: 'في المقارنة، وما يُصيِّر مكاناً وطناً، وما هو الفقر حقيقةً.',
    },
    entries: entriesMatching(['financial', 'comparison']),
  },
  {
    id: 'humility-gratitude',
    title: { en: 'On Humility and Gratitude', ar: 'في التواضع والشكر' },
    lead: {
      en: 'On lowering the self, on receiving blessings without forgetting their source.',
      ar: 'في خفض الجناح، وفي تلقّي النعمة دون نسيان مُسديها.',
    },
    entries: entriesMatching(['humility', 'gratitude', 'tawāḍuʿ', 'shukr', 'blessings', 'pride']),
  },
  {
    id: 'charity-generosity',
    title: { en: 'On Charity and Generosity', ar: 'في الصدقة والكرم' },
    lead: {
      en: 'On the open hand — on giving in secret, on not following a gift with a reminder.',
      ar: 'في اليد المبسوطة — في العطاء في السرّ، وفي ألّا يُتبع العطاءُ المنُّ.',
    },
    entries: entriesMatching([
      'giving',
      'generosity',
      'charity',
      'hidden charity',
      'miserliness',
      'etiquette of giving',
      'duties of wealth',
      'sakhāʾ',
      'karam',
      'ṣadaqa',
    ]),
  },
  {
    id: 'inner-struggle',
    title: { en: 'On the Inner Struggle', ar: 'في جهاد النفس' },
    lead: {
      en: 'On the harder, inward war — against desire, against laziness, against the long hopes that quietly eat a life.',
      ar: 'في الحرب الأشدّ، الباطنة — على الهوى، وعلى الكسل، وعلى طول الأمل الذي يأكل العمر صامتاً.',
    },
    entries: entriesMatching([
      'lower self',
      'desire',
      'hawā',
      'reckoning with oneself',
      'muḥāsaba',
      'long hopes',
      'ṭūl al-amal',
      'procrastination',
      'inner struggle',
      'jihad al-nafs',
      'fighting desire',
      'heart',
    ]),
  },
  {
    id: 'dignity-self-respect',
    title: { en: 'On Dignity and Self-Respect', ar: 'في العزّة وكرامة النفس' },
    lead: {
      en: 'On the inner standing of the believer — on not begging, on contentment as a kind of wealth.',
      ar: 'في المقام الباطن للمؤمن — في ألّا يسأل، وفي القناعة بوصفها ثراءً.',
    },
    entries: entriesMatching([
      'dignity',
      'self-respect',
      'honor',
      'contentment',
      'qanāʿa',
      'ʿizza',
      'begging',
      'not asking',
      'standing of the believer',
      'inner standing',
    ]),
  },
  {
    id: 'tawakkul-reliance',
    title: { en: 'On Reliance and the Decree', ar: 'في التوكّل والقدر' },
    lead: {
      en: 'On resting in what has been decided — on provision arriving by its own paths, on the futility of fearing what God has set.',
      ar: 'في السكون إلى ما قُضي — في الرزق يأتي من طرقه، وفي عبثيّة الخوف ممّا قدّر الله.',
    },
    entries: entriesMatching([
      'reliance on God',
      'tawakkul',
      'on the decree',
      'qadar',
      'contentment with the decree',
      'riḍā',
      'provision',
      'rizq',
      'trust in God',
    ]),
  },
  {
    id: 'friendship-companionship',
    title: { en: 'On Friendship and Companionship', ar: 'في الصداقة والصحبة' },
    lead: {
      en: 'On the choosing of a friend, the testing of one, and what we owe the people who walk beside us.',
      ar: 'في اختيار الصاحب، وفي اختباره، وفيما ندينُ به لمن يسيرُ معنا.',
    },
    entries: entriesMatching([
      'friendship',
      'on friendship',
      'on brotherhood',
      'companionship',
      'ukhuwwa',
      'choosing a friend',
      'testing a friend',
      'rights of brotherhood',
      'bad companions',
      'true friend',
    ]),
  },
  {
    id: 'justice-truth',
    title: { en: 'On Justice and Speaking Truth', ar: 'في العدل والقول بالحقّ' },
    lead: {
      en: 'On what authority owes, on what silence in the face of wrong amounts to, on bearing witness.',
      ar: 'فيما تَدينُ به السلطةُ، وفي ما يَؤول إليه السكوتُ عند الظلمِ، وفي شهادةِ الحقّ.',
    },
    entries: entriesMatching([
      'justice',
      'oppression',
      'speaking truth',
      'truth',
      'bearing witness',
      'on the oppressed',
      'authority',
      'foundation of authority',
      'small injustices',
      'duty of witness',
      'ʿadl',
      'ẓulm',
    ]),
  },
  {
    id: 'speech-silence',
    title: { en: 'On Speech and Silence', ar: 'في الكلام والصمت' },
    lead: {
      en: 'On the tongue — the smallest member with the heaviest weight, on knowing when to speak and when to hold.',
      ar: 'في اللسان — أصغر الأعضاء وأثقلِها وزناً، وفي معرفةِ متى يُقال ومتى يُصمَت.',
    },
    entries: entriesMatching([
      'on speech',
      'on silence',
      'on the tongue',
      'on weighing words',
      'on speaking in anger',
      'on secret-keeping',
      'silence as wisdom',
      'kitmān al-sirr',
      'power of the tongue',
    ]),
  },
  {
    id: 'specific-hardship',
    title: { en: 'On Specific Hardship', ar: 'في المحن المخصوصة' },
    lead: {
      en: 'On the particular trials — illness, loss, being misunderstood, the prayer that feels unheard.',
      ar: 'في المحنِ المخصوصةِ — المرضِ، والفقدِ، وأن يُساءَ فهمُك، والدعاءِ الذي يبدو غيرَ مسموع.',
    },
    entries: entriesMatching([
      'illness',
      'sickness',
      'loss of a loved one',
      'on bereavement',
      'long-stretched trial',
      "du'a unanswered",
      'misunderstood',
      'slander',
      'end of every grief',
      'every hardship is ease',
      'after every hardship',
    ]),
  },
  {
    id: 'repentance-return',
    title: { en: 'On Repentance and Return', ar: 'في التوبة والرجوع' },
    lead: {
      en: 'On the door that is never closed — on the heart that turns back, on what tawba is and is not.',
      ar: 'في البابِ الذي لا يُغلَق — في القلبِ يَرجِع، وفي حقيقةِ التوبة.',
    },
    entries: entriesMatching([
      'tawba',
      'repentance',
      'when feeling guilt',
      'when struggling to return',
      'istighfar',
      'returning to God',
      'six conditions',
      'shame proves heart is alive',
      'proximity of God to the repentant',
      'against postponing return',
    ]),
  },
  {
    id: 'gentleness-mercy',
    title: { en: 'On Gentleness and Mercy', ar: 'في الرفق والرحمة' },
    lead: {
      en: 'On the softer disposition — on hilm in the face of provocation, on gentleness with the weak.',
      ar: 'في الخُلُقِ اللّيِّن — في الحلمِ عند الاستفزاز، وفي الرفقِ بالضعيف.',
    },
    entries: entriesMatching([
      'gentleness',
      'rifq',
      'ḥilm',
      'hilm',
      'forbearance',
      'kindness',
      'mercy',
      'rifq with the weak',
      'mercy with people',
      'gentleness in speech',
    ]),
  },
  {
    id: 'family-bonds',
    title: { en: 'On the Bonds of Blood', ar: 'في صلة الأرحام' },
    lead: {
      en: 'On what holds blood together — the rights of parents, the rights of the child, what is owed even when the bond strains.',
      ar: 'في ما يُمسِكُ الدمَ معاً — حقوقِ الوالدين، وحقوقِ الولد، وما يبقى مستحَقّاً حتى حين يتوتّر الحبل.',
    },
    entries: entriesMatching([
      'rights of parents',
      'rights of the child',
      'birr al-wālidayn',
      'ṣilat al-raḥim',
      'silat al-rahim',
      'maintaining bonds with kin',
      'cutting bonds',
      'qaṭīʿat al-raḥim',
      'family bonds',
      'family estrangement',
    ]),
  },
  {
    id: 'intention-sincerity',
    title: { en: 'On Intention and Sincerity', ar: 'في النيّة والإخلاص' },
    lead: {
      en: 'On the inner weight of an act — for whom, in what spirit, with what unseen motive.',
      ar: 'في الثقلِ الباطن للعمل — لمن، وبأيِّ روح، وبأيِّ نيّةٍ خفيّة.',
    },
    entries: entriesMatching([
      'niyya',
      'intention',
      'sincerity',
      'ikhlās',
      'ikhlas',
      'riyāʾ',
      'riya',
      'showing off',
      'for whom you act',
      'niyya in worship',
    ]),
  },
  {
    id: 'knowing-god',
    title: { en: 'On Knowing God', ar: 'في معرفة الله' },
    lead: {
      en: 'On the experiential knowledge — the heart\'s recognition, the awe, the love, the breaking of plans by which He makes Himself known.',
      ar: 'في المعرفةِ المُعاشَة — في تَعرُّفِ القلب، والخشية، والمحبّة، وفي كسرِ العزائمِ التي يُعرَفُ بها.',
    },
    entries: entriesMatching([
      'maʿrifa',
      'maʿrifat Allāh',
      'knowing God',
      'intimate knowledge',
      'awe',
      'khashya',
      'love of God',
      'recognising God',
      'gnostic',
      'breaking of resolutions',
    ]),
  },
  {
    id: 'prayer-worship',
    title: { en: 'On Prayer and Worship', ar: 'في الصلاة والعبادة' },
    lead: {
      en: 'On the pillar of religion — what prayer is, what worship does, the believer in standing.',
      ar: 'في عمودِ الدين — حقيقةِ الصلاة، وأثرِ العبادة، والمؤمنِ في مقامِ القنوت.',
    },
    entries: entriesMatching([
      'prayer',
      'on prayer',
      'on worship',
      'ṣalāh',
      'ʿibāda',
      'qiyām al-layl',
      'night vigil',
      'tahajjud',
      'the dawn believer',
      'last third of the night',
      'inner pillars of worship',
      'worship as reflection',
      'on the goal of worship',
    ]),
  },
  {
    id: 'qurʾan',
    title: { en: 'On the Qur\'an', ar: 'في القرآن' },
    lead: {
      en: 'On the counsellor who does not cheat — sitting with the Qur\'an, its depths, its cure for the heart.',
      ar: 'في الناصحِ الذي لا يغشّ — في مجالسةِ القرآن، وفي عمقِه، وفي شفائِه للقلب.',
    },
    entries: entriesMatching([
      'on the Qur\'an',
      'qurʾān',
      'Qur\'an as guide',
      'Qur\'an as cure',
      'Qur\'an as depths',
      'Qur\'an as polish',
      'Qur\'an reflection',
      'Qur\'an recitation',
      'Qur\'an as God\'s firm rope',
      'sitting with the Qur\'an',
    ]),
  },
  {
    id: 'dhikr-remembrance',
    title: { en: 'On Remembrance of God', ar: 'في ذكر الله' },
    lead: {
      en: 'On the constant refrain — what dhikr does to the heart, the believer\'s lifeline.',
      ar: 'في الترداد الدائم — في فعلِ الذكر في القلب، وفي حبلِ المؤمنِ المتين.',
    },
    entries: entriesMatching([
      'dhikr',
      'on dhikr',
      'remembrance',
      'polish of the heart',
      'tranquillity',
      'on intimacy with God',
      'the people of dhikr',
      'perpetual dhikr',
    ]),
  },
  {
    id: 'the-believer',
    title: { en: 'On the Believer\'s Character', ar: 'في خُلُق المؤمن' },
    lead: {
      en: 'Short portraits — the believer\'s silence, his strength, his day, his enemies, what holds him.',
      ar: 'صور موجزة — صمتُ المؤمن، وقوّتُه، ونهارُه، وعداواتُه، وما يُمسكُه.',
    },
    entries: entriesMatching([
      'the believer',
      'on the believer',
      'mu\'min',
      'the four-pillar sketch',
      'the believer\'s silence',
      'the believer\'s strength',
      'the believer\'s integrity',
      'the believer\'s gentleness',
      'the believer\'s trustworthiness',
      'the believer\'s nobility',
      'the believer\'s purity of heart',
    ]),
  },
  {
    id: 'on-the-heart',
    title: { en: 'On the Heart', ar: 'في القلب' },
    lead: {
      en: 'The seat of faith, the king of the body, the vessel that polishes or rusts.',
      ar: 'مَوضعُ الإيمان، ومَلكُ الجسد، والإناءُ الذي يُجلى أو يصدأ.',
    },
    entries: entriesMatching([
      'on the heart',
      'heart as vessel',
      'heart as king of the body',
      'heart as the seat of faith',
      'the heart\'s states',
      'hardness of the heart',
      'sound heart',
      'the living heart',
      'the inner state of the heart',
      'guarding the heart',
      'the lights of the heart',
    ]),
  },
  {
    id: 'hereafter-paradise',
    title: { en: 'On the Hereafter', ar: 'في الآخرة' },
    lead: {
      en: 'On Paradise surrounded by hardships, on the Fire surrounded by desires, on what awaits.',
      ar: 'في الجنّةِ مَحفوفةً بالمكاره، وفي النارِ محفوفةً بالشهوات، وفي ما ينتظرنا.',
    },
    entries: entriesMatching([
      'on Paradise',
      'on the Hereafter',
      'on the Fire',
      'on the warning of the Fire',
      'on the soul prepared',
      'yearning for Paradise',
      'fear of the Fire',
      'on the two paths',
      'on the arduous ascent',
      'on today and tomorrow',
      'the Hour as the driver',
    ]),
  },
]

// ── Browse-by-source view — a COMPLETE partition of every wisdom entry
// by its origin text. Unlike TEACHINGS_THEMES (a curated, keyword-matched
// subset), these four sections together contain all of ALL_WISDOM, so
// every authenticated saying has a browsable home — not only the ~12%
// that happen to match a curated theme's keywords.
function entriesFromSource(test: (source: string) => boolean): BaselineEntry[] {
  return ALL_WISDOM.filter((e) => test(e.source))
}

export const WISDOM_BY_SOURCE: TeachingsTheme[] = [
  {
    id: 'src-ghurar',
    title: { en: 'Ghurar al-Hikam', ar: 'غُرَر الحِكَم' },
    lead: {
      en: "The collected aphorisms of Imam Ali — al-Āmidī's classic compilation of his short wisdom.",
      ar: 'مجموعة حِكَم الإمام عليّ القصار — تصنيف الآمِدي.',
    },
    entries: entriesFromSource((s) => s.includes('Ghurar')),
  },
  {
    id: 'src-nahj-sayings',
    title: { en: 'Nahj al-Balagha — Sayings', ar: 'نهج البلاغة — الحِكَم' },
    lead: {
      en: 'The short sayings (ḥikam) gathered in Nahj al-Balagha.',
      ar: 'الحِكَم القِصار المجموعة في نهج البلاغة.',
    },
    entries: entriesFromSource(
      (s) => s.includes('Nahj') && !/sermon/i.test(s),
    ),
  },
  {
    id: 'src-nahj-sermons',
    title: { en: 'Nahj al-Balagha — Sermons', ar: 'نهج البلاغة — الخُطَب' },
    lead: {
      en: 'Excerpts from the sermons (khuṭab) of Nahj al-Balagha.',
      ar: 'مقاطع من خُطَب نهج البلاغة.',
    },
    entries: entriesFromSource((s) => s.includes('Nahj') && /sermon/i.test(s)),
  },
  {
    id: 'src-other',
    title: { en: 'Other Authenticated Traditions', ar: 'مرويات موثّقة أخرى' },
    lead: {
      en: 'From al-Kafi, the Ṣaḥīḥ collections, and other authenticated sources.',
      ar: 'من الكافي والصِّحاح ومصادر موثّقة أخرى.',
    },
    entries: entriesFromSource(
      (s) => !s.includes('Ghurar') && !s.includes('Nahj'),
    ),
  },
].filter((section) => section.entries.length > 0)

// ── Poetry section, drawn entirely from BASELINE_POETRY.
export const POETRY_SECTION = {
  id: 'poetry',
  title: { en: 'From the Diwan', ar: 'من الديوان' },
  lead: {
    en: 'Verses traditionally attributed to Imam Ali — short, dense, much-quoted across centuries.',
    ar: 'أبيات منسوبة تقليدياً إلى الإمام علي — قصيرة، كثيفة، كثيرة الاستشهاد عبر القرون.',
  },
  entries: BASELINE_POETRY,
}

// ── Du'a section, drawn entirely from BASELINE_DUAS.
export const DUA_SECTION = {
  id: 'duas',
  title: { en: "Du'as · Prayers", ar: 'أدعية' },
  lead: {
    en: 'Short authentic prayers that can be read, learned, or carried.',
    ar: 'أدعية قصيرة موثّقة يمكن أن تُقرأ أو تُحفظ أو تُحمَل.',
  },
  entries: BASELINE_DUAS,
}

// ── Letters and Sermons — long-form excerpts. These have a different
// shape from BaselineEntry (a title, an "about" brief). The Teachings
// page renders them as their own section type.
export type LongFormSection = {
  id: string
  title: { en: string; ar: string }
  lead: { en: string; ar: string }
  entries: LongFormEntry[]
}

export const LETTERS_SECTION: LongFormSection = {
  id: 'letters',
  title: { en: 'Letters', ar: 'الرسائل' },
  lead: {
    en: 'Substantial excerpts from his most famous letters — to his sons, to his governors, to companions.',
    ar: 'مقاطع جوهرية من أشهر رسائله — إلى ولدَيه، وإلى ولاته، وإلى الصحابة.',
  },
  entries: BASELINE_LETTERS,
}

export const SERMONS_SECTION: LongFormSection = {
  id: 'sermons',
  title: { en: 'Sermons', ar: 'الخطب' },
  lead: {
    en: 'Excerpts from the most celebrated sermons in Nahj al-Balagha.',
    ar: 'مقاطع من أشهر خطب نهج البلاغة.',
  },
  entries: BASELINE_SERMONS,
}
