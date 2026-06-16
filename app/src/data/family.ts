// v49 §80 — The family of Imam Ali (عليه السلام).
//
// Authenticated, mainstream historical facts. Dates marked "~" are
// approximate or vary across accounts (Hijri ↔ Gregorian conversions and
// early-Islamic dating differ between sources). On points where Sunni and
// Shia traditions narrate differently (notably the cause of Sayyida
// Fatima's death), this stays neutral and states only what is agreed —
// consistent with the app's cross-tradition standard. Never assert a
// contested cause as fact.

export type Bilingual = { en: string; ar: string }

export type FamilyGroup = 'parents' | 'spouse' | 'child'

export type FamilyMember = {
  id: string
  group: FamilyGroup
  name: Bilingual
  /** Short relationship label, e.g. "Father", "Wife", "Son (2nd Imam)". */
  relation: Bilingual
  born?: Bilingual
  died?: Bilingual
  /** Cause / manner of death. Omitted or neutral where accounts differ. */
  howDied?: Bilingual
  /** One line of context — lineage, significance, or which mother. */
  note?: Bilingual
}

// ── Imam Ali himself (the centre of the tree) ─────────────────────────
export const IMAM_ALI_SELF: FamilyMember = {
  id: 'ali',
  group: 'parents',
  name: { en: 'Ali ibn Abi Talib (عليه السلام)', ar: 'عليّ بن أبي طالب (عليه السلام)' },
  relation: { en: 'Commander of the Faithful · 4th Caliph · 1st Imam', ar: 'أمير المؤمنين · الخليفة الرابع · الإمام الأول' },
  born: { en: '~600 CE · 13 Rajab · born inside the Kaaba, Makkah', ar: '~٦٠٠م · ١٣ رجب · وُلد داخل الكعبة بمكة' },
  died: { en: '661 CE · 21 Ramadan 40 AH · Kufa', ar: '٦٦١م · ٢١ رمضان ٤٠هـ · الكوفة' },
  howDied: {
    en: 'Martyred — struck with a poisoned sword by Ibn Muljam during the dawn prayer in the mosque of Kufa; he passed two days later.',
    ar: 'استُشهد — ضربه ابن مُلجم بسيف مسموم في صلاة الفجر بمسجد الكوفة، وتُوفّي بعد يومين.',
  },
}

// ── Parents & the Prophet who raised him ──────────────────────────────
export const PARENTS: FamilyMember[] = [
  {
    id: 'abu-talib',
    group: 'parents',
    name: { en: 'Abu Talib ibn Abd al-Muttalib', ar: 'أبو طالب بن عبد المطّلب' },
    relation: { en: 'Father — chief of Banu Hashim; the Prophet’s uncle and protector', ar: 'الأب — سيّد بني هاشم، عمّ النبيّ وكافله وحاميه' },
    died: { en: '~619 CE · Makkah (the "Year of Sorrow")', ar: '~٦١٩م · مكة (عام الحزن)' },
    howDied: { en: 'Natural death, in old age — the same year as the Prophet’s wife Khadija.', ar: 'وفاة طبيعية في كِبَره — في العام نفسه الذي تُوفّيت فيه السيدة خديجة.' },
  },
  {
    id: 'fatima-bint-asad',
    group: 'parents',
    name: { en: 'Fatima bint Asad', ar: 'فاطمة بنت أسد' },
    relation: { en: 'Mother — among the early Muslims; she raised the Prophet too', ar: 'الأم — من السابقين إلى الإسلام، وقد ربّت النبيّ أيضاً' },
    died: { en: '~626 CE · Madinah', ar: '~٦٢٦م · المدينة' },
    howDied: { en: 'Natural death. The Prophet shrouded her in his own cloak and prayed over her, honouring her as a mother.', ar: 'وفاة طبيعية. كفّنها النبيّ بثوبه وصلّى عليها، مُكرِّماً إيّاها كأمّ له.' },
  },
  {
    id: 'prophet',
    group: 'parents',
    name: { en: 'The Prophet Muhammad (ﷺ)', ar: 'النبيّ محمّد (ﷺ)' },
    relation: { en: 'Cousin, guardian, and father-in-law — Ali was raised in his household', ar: 'ابن العم والكافل وحَمُو الإمام — نشأ عليٌّ في بيته' },
    died: { en: '632 CE · 11 AH · Madinah', ar: '٦٣٢م · ١١هـ · المدينة' },
    note: { en: 'He raised Ali from boyhood, gave him his daughter Fatima in marriage, and called him "brother."', ar: 'ربّاه منذ صِغره، وزوّجه ابنته فاطمة، وسمّاه أخاه.' },
  },
]

// ── His wives ─────────────────────────────────────────────────────────
// He took no other wife during the lifetime of Fatima al-Zahra; the
// others followed after her passing.
export const WIVES: FamilyMember[] = [
  {
    id: 'fatima-zahra',
    group: 'spouse',
    name: { en: 'Fatima al-Zahra (عليها السلام)', ar: 'فاطمة الزهراء (عليها السلام)' },
    relation: { en: 'First wife — daughter of the Prophet; mother of Hasan, Husayn, Zaynab & Umm Kulthum', ar: 'الزوجة الأولى — بنت النبيّ، وأمّ الحسن والحسين وزينب وأمّ كلثوم' },
    born: { en: '~605 CE · Makkah', ar: '~٦٠٥م · مكة' },
    died: { en: '632 CE · 11 AH · Madinah — only months after her father', ar: '٦٣٢م · ١١هـ · المدينة — بعد أشهر قليلة من أبيها' },
    howDied: { en: 'She passed grieving for her father, the first of his family to follow him. By her own wish she was buried at night; the exact cause is narrated differently across traditions.', ar: 'تُوفّيت حزناً على أبيها، وكانت أوّل أهله لحاقاً به. ودُفنت ليلاً بوصيّةٍ منها، وتختلف الروايات في تفصيل سبب وفاتها.' },
  },
  {
    id: 'umm-al-banin',
    group: 'spouse',
    name: { en: 'Fatima bint Hizam — "Umm al-Banin"', ar: 'فاطمة بنت حزام — «أمّ البنين»' },
    relation: { en: 'Wife (after al-Zahra) — mother of al-Abbas and his three brothers', ar: 'زوجة (بعد الزهراء) — أمّ العبّاس وإخوته الثلاثة' },
    note: { en: 'Four of her sons were martyred at Karbala; her devotion to the household is deeply honoured.', ar: 'استُشهد بنوها الأربعة بكربلاء، وتُكرَّم لوفائها لأهل البيت.' },
  },
  {
    id: 'umama',
    group: 'spouse',
    name: { en: 'Umama bint Abi al-As', ar: 'أُمامة بنت أبي العاص' },
    relation: { en: 'Wife (after al-Zahra) — granddaughter of the Prophet (via Zaynab)', ar: 'زوجة (بعد الزهراء) — حفيدة النبيّ من ابنته زينب' },
  },
  {
    id: 'asma',
    group: 'spouse',
    name: { en: 'Asma bint Umays', ar: 'أسماء بنت عُميس' },
    relation: { en: 'Wife — a noble early Muslim and companion of Fatima al-Zahra', ar: 'زوجة — من فضليات المسلمات الأُوَل ورفيقة فاطمة الزهراء' },
  },
  {
    id: 'khawla',
    group: 'spouse',
    name: { en: 'Khawla bint Ja’far al-Hanafiyya', ar: 'خولة بنت جعفر الحنفيّة' },
    relation: { en: 'Wife — mother of Muhammad ibn al-Hanafiyya', ar: 'زوجة — أمّ محمّد بن الحنفيّة' },
  },
]

// ── His children (well-established) ───────────────────────────────────
export const CHILDREN: FamilyMember[] = [
  {
    id: 'hasan',
    group: 'child',
    name: { en: 'al-Hasan ibn Ali (عليه السلام)', ar: 'الحسن بن عليّ (عليه السلام)' },
    relation: { en: 'Son — the 2nd Imam · mother: Fatima al-Zahra', ar: 'الابن — الإمام الثاني · أمّه فاطمة الزهراء' },
    born: { en: '~625 CE · 3 AH · Madinah', ar: '~٦٢٥م · ٣هـ · المدينة' },
    died: { en: '~670 CE · ~50 AH · Madinah', ar: '~٦٧٠م · ~٥٠هـ · المدينة' },
    howDied: { en: 'Widely reported to have been poisoned; he is buried in al-Baqi.', ar: 'تواترت الروايات بأنه دُسّ إليه السمّ، ودُفن بالبقيع.' },
  },
  {
    id: 'husayn',
    group: 'child',
    name: { en: 'al-Husayn ibn Ali (عليه السلام)', ar: 'الحسين بن عليّ (عليه السلام)' },
    relation: { en: 'Son — the 3rd Imam · mother: Fatima al-Zahra', ar: 'الابن — الإمام الثالث · أمّه فاطمة الزهراء' },
    born: { en: '~626 CE · 4 AH · Madinah', ar: '~٦٢٦م · ٤هـ · المدينة' },
    died: { en: '680 CE · 10 Muharram 61 AH · Karbala', ar: '٦٨٠م · ١٠ محرّم ٦١هـ · كربلاء' },
    howDied: { en: 'Martyred at Karbala with his companions and family, standing against tyranny — the defining sacrifice of Ashura.', ar: 'استُشهد بكربلاء مع أهله وأصحابه واقفاً في وجه الظلم — تضحية عاشوراء الخالدة.' },
  },
  {
    id: 'zaynab',
    group: 'child',
    name: { en: 'Zaynab bint Ali (عليها السلام)', ar: 'زينب بنت عليّ (عليها السلام)' },
    relation: { en: 'Daughter — heroine of Karbala · mother: Fatima al-Zahra', ar: 'الابنة — بطلة كربلاء · أمّها فاطمة الزهراء' },
    born: { en: '~627 CE · ~6 AH · Madinah', ar: '~٦٢٧م · ~٦هـ · المدينة' },
    died: { en: '~682 CE · ~62 AH (place varies in accounts)', ar: '~٦٨٢م · ~٦٢هـ (يختلف موضع قبرها في الروايات)' },
    howDied: { en: 'Survived Karbala and carried its message; her sermons in Kufa and Damascus shook the powerful. Natural death.', ar: 'نجت من كربلاء وحملت رسالتها، وزلزلت خُطبها في الكوفة والشام عروش الطغاة. تُوفّيت وفاةً طبيعية.' },
  },
  {
    id: 'umm-kulthum',
    group: 'child',
    name: { en: 'Umm Kulthum bint Ali', ar: 'أمّ كلثوم بنت عليّ' },
    relation: { en: 'Daughter · mother: Fatima al-Zahra', ar: 'الابنة · أمّها فاطمة الزهراء' },
    note: { en: 'Present at Karbala alongside her sister Zaynab.', ar: 'كانت حاضرة بكربلاء إلى جانب أختها زينب.' },
  },
  {
    id: 'abbas',
    group: 'child',
    name: { en: 'al-Abbas ibn Ali (عليه السلام)', ar: 'العبّاس بن عليّ (عليه السلام)' },
    relation: { en: 'Son — the standard-bearer at Karbala · mother: Umm al-Banin', ar: 'الابن — حامل لواء كربلاء · أمّه أمّ البنين' },
    born: { en: '~647 CE · 26 AH · Madinah', ar: '~٦٤٧م · ٢٦هـ · المدينة' },
    died: { en: '680 CE · 10 Muharram 61 AH · Karbala', ar: '٦٨٠م · ١٠ محرّم ٦١هـ · كربلاء' },
    howDied: { en: 'Martyred at Karbala carrying water to the children; a byword for loyalty and courage.', ar: 'استُشهد بكربلاء وهو يحمل الماء للأطفال؛ مَضرِب المثل في الوفاء والشجاعة.' },
  },
  {
    id: 'karbala-brothers',
    group: 'child',
    name: { en: 'Abdullah, Ja’far & Uthman ibn Ali', ar: 'عبد الله وجعفر وعثمان بنو عليّ' },
    relation: { en: 'Sons — brothers of al-Abbas · mother: Umm al-Banin', ar: 'الأبناء — إخوة العبّاس · أمّهم أمّ البنين' },
    died: { en: '680 CE · 10 Muharram 61 AH · Karbala', ar: '٦٨٠م · ١٠ محرّم ٦١هـ · كربلاء' },
    howDied: { en: 'All three martyred at Karbala alongside their brother al-Abbas, defending al-Husayn.', ar: 'استُشهدوا الثلاثة بكربلاء إلى جانب أخيهم العبّاس دفاعاً عن الحسين.' },
  },
  {
    id: 'muhammad-hanafiyya',
    group: 'child',
    name: { en: 'Muhammad ibn al-Hanafiyya', ar: 'محمّد بن الحنفيّة' },
    relation: { en: 'Son — a learned figure · mother: Khawla al-Hanafiyya', ar: 'الابن — من أهل العلم · أمّه خولة الحنفيّة' },
    born: { en: '~636 CE · ~16 AH', ar: '~٦٣٦م · ~١٦هـ' },
    died: { en: '~700 CE · ~81 AH · Madinah', ar: '~٧٠٠م · ~٨١هـ · المدينة' },
    howDied: { en: 'Natural death. He carried his father’s banner at the Battle of the Camel.', ar: 'وفاة طبيعية. حمل راية أبيه في معركة الجمل.' },
  },
]
