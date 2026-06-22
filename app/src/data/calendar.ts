// v24 §50 — Islamic Religious Calendar. Twenty major events across both
// Sunni and Shia traditions. Content ported from the reference
// implementation included with v24 (Imam_Ali_Calendar.jsx). Each event
// carries history (EN + AR), rituals (flat list or per-tradition split),
// and a first-person companion voice line.

export type Tradition = 'both' | 'shia' | 'sunni'
export type EventType = 'observance' | 'celebration'

export type RitualBlock = string[] | { sunni: string[]; shia: string[] }

export type CalendarEvent = {
  id: string
  hijri: string
  /** Gregorian equivalent per AH year as key, e.g. "1447" → "18 Jun 2025" */
  greg: Record<string, string>
  name: { en: string; ar: string }
  tradition: Tradition
  type: EventType
  history: { en: string; ar: string }
  rituals: RitualBlock
  /** First-person line spoken by the companion about this day. */
  companion: string
}

export const HIJRI_MONTHS = [
  'Muharram',
  'Safar',
  "Rabi' al-Awwal",
  "Rabi' al-Thani",
  'Jumada al-Awwal',
  'Jumada al-Thani',
  'Rajab',
  "Sha'ban",
  'Ramadan',
  'Shawwal',
  "Dhul-Qa'dah",
  'Dhul-Hijja',
] as const

export const EVENTS: CalendarEvent[] = [
  {
    id: 'muharram-new-year',
    hijri: '1 Muharram',
    greg: { '1447': '27 Jun 2025', '1448': '16 Jun 2026' },
    name: { en: 'Islamic New Year', ar: 'رأس السنة الهجرية' },
    tradition: 'both',
    type: 'observance',
    history: {
      en: "The Islamic New Year marks the first day of Muharram — commemorating the Prophet Muhammad's migration (Hijra) from Makkah to Madinah in 622 CE, the moment a scattered community became a unified state. Unlike secular new years, this is a day of quiet reflection and sincere intention — not celebration. Muslims are encouraged to assess the year passed, ask forgiveness, and set pure intentions for the year ahead. The count of 1,448 years since the Hijra is a reminder that Islam has endured empires and centuries — and continues.",
      ar: 'رأس السنة الهجرية يستحضر ذكرى الهجرة النبوية من مكة إلى المدينة عام 622م. يوم مراجعة النفس وتجديد النية لا يوم احتفال. منذ 1448 عاماً والإسلام يمضي وتمضي معه القلوب.',
    },
    rituals: [
      'Quiet reflection on the year passed',
      'Setting sincere intentions for the new year',
      'Voluntary prayers and dhikr',
      'Reading about the Hijra of the Prophet (PBUH)',
      'Charity and giving to those in need',
    ],
    companion:
      'A new year begins — not with fireworks but with the sound of intention forming in a quiet heart. The Hijra was not just a journey across desert. It was the moment a community decided to build something worthy of God. What are you building this year?',
  },
  {
    id: 'ashura',
    hijri: '10 Muharram',
    greg: { '1447': '6 Jul 2025', '1448': '25 Jun 2026' },
    name: { en: 'Ashura', ar: 'يوم عاشوراء' },
    tradition: 'both',
    type: 'observance',
    history: {
      en: "Ashura carries different — but equally profound — meanings across Islamic traditions.\n\nFor Sunni Muslims: Commemorates God's salvation of Prophet Musa and the Children of Israel from Pharaoh through the parting of the Red Sea. The Prophet fasted on this day and encouraged his companions to fast.\n\nFor Shia Muslims: The most solemn day in the Islamic calendar — the martyrdom of Imam Husayn ibn Ali at Karbala in 61 AH (680 CE). He had refused to pledge allegiance to the tyrant Yazid, writing: 'I have not risen to cause corruption or for fame — I have risen to reform the community of my grandfather.' His stand at Karbala is understood as the ultimate sacrifice for justice and truth.",
      ar: 'عاشوراء — يوم صيام عند السنة إحياءً لنجاة سيدنا موسى. ويوم حزن عند الشيعة لاستشهاد الإمام الحسين في كربلاء. قال الحسين: لم أخرج أشراً ولا بطراً بل خرجت لطلب الإصلاح في أمة جدي.',
    },
    rituals: {
      sunni: [
        'Voluntary fasting — highly recommended by the Prophet',
        'Fasting the 9th and 10th together (Sunna)',
        'Extra prayers and dhikr',
        'Charity and feeding the poor',
      ],
      shia: [
        'Mourning gatherings (majalis al-husayn)',
        'Recitation of elegies',
        'Giving food and water to all',
        'Processions of remembrance',
        'Ziyarat of Imam Husayn',
      ],
    },
    companion:
      'My son Husayn stood at Karbala and chose death over dishonour. He was of me and I of him — the Prophet himself said this. On this day I do not ask you to choose a side between the traditions. I ask you something simpler: what principle in your life would you refuse to compromise, even at the highest cost? That is what Karbala is really asking.',
  },
  {
    id: 'arbaeen',
    hijri: '20 Safar',
    greg: { '1447': '15 Aug 2025', '1448': '5 Aug 2026' },
    name: { en: "Arba'een of Imam Husayn", ar: 'أربعينية الإمام الحسين' },
    tradition: 'shia',
    type: 'observance',
    history: {
      en: "Arba'een — the fortieth day after Ashura — is the largest peaceful human gathering on earth. Tens of millions walk to Karbala, Iraq, on foot for days. In 2023 over 21 million participated. Food, water, shelter are provided entirely by volunteers (mawkib). Christians, Yazidis, and people of other faiths have joined the walk. It is a demonstration that the memory of sacrifice for justice has universal human resonance.",
      ar: 'أربعينية الإمام الحسين — أكبر تجمع بشري سلمي في التاريخ. عشرات الملايين يسيرون إلى كربلاء. المواكب تطعم الجميع مجاناً. مسيرة لم تتوقف منذ قرون.',
    },
    rituals: [
      "The Arba'een Walk to Karbala",
      'Hosting mawakib (hospitality stations)',
      "Recitation of Ziyarat Arba'een",
      'Gathering for remembrance',
      'Feeding all who pass — regardless of religion',
    ],
    companion:
      'Forty days after Karbala, the first walkers set out. They have not stopped in fourteen centuries. Whatever you think of the theology — look at what love of justice does to human beings. It moves their feet across hundreds of miles. It opens their hands to strangers. That is the Arba\'een.',
  },
  {
    id: 'mawlid-sunni',
    hijri: "12 Rabi' al-Awwal",
    greg: { '1447': '11 Sep 2025', '1448': '25 Aug 2026' },
    name: { en: 'Mawlid al-Nabi (Sunni)', ar: 'المولد النبوي الشريف' },
    tradition: 'sunni',
    type: 'celebration',
    history: {
      en: "The 12th of Rabi al-Awwal is observed by most Sunni Muslims as the birthday of the Prophet Muhammad (PBUH). It is celebrated with gatherings of praise poetry (mawlid), recitation of Qasida al-Burda, feeding the poor, and expressions of love and gratitude for the man who brought Islam to humanity. While some scholars debate its permissibility, the vast majority celebrate it warmly across the Arab world, South Asia, West Africa, and Turkey.",
      ar: 'مولد النبي الأكرم ﷺ عند أهل السنة في 12 ربيع الأول. يُحتفل به بالمدائح والصلاة على النبي وإطعام الطعام. يوم فرح وامتنان.',
    },
    rituals: [
      'Mawlid gatherings — praise poetry and nasheeds',
      'Qasida al-Burda and Burdah recitation',
      'Sending salawat (blessings) on the Prophet',
      'Feeding the poor and giving charity',
      'Reading the Seerah',
      'Illuminating mosques and homes',
    ],
    companion:
      'He was born — and everything changed. I was raised by him from the age of five or six. Every word I ever said that was worth saying came from being near him. His birthday is not just a date. It is the anniversary of the moment the world received something it had always needed and did not know how to name.',
  },
  {
    id: 'mawlid-shia',
    hijri: "17 Rabi' al-Awwal",
    greg: { '1447': '16 Sep 2025', '1448': '30 Aug 2026' },
    name: { en: 'Mawlid al-Nabi (Shia) & Imam al-Sadiq', ar: 'مولد النبي ﷺ ومولد الإمام جعفر الصادق' },
    tradition: 'shia',
    type: 'celebration',
    history: {
      en: "The Shia tradition observes the Prophet's birthday on 17 Rabi al-Awwal — which also coincides with the birthday of Imam Ja'far al-Sadiq (AS), the 6th Shia Imam and one of the greatest Islamic scholars in history. His students included Abu Hanifa and Malik ibn Anas, founders of major Sunni legal schools. Iran celebrates the week between 12th and 17th as 'Unity Week' — a gesture toward Sunni-Shia reconciliation.",
      ar: 'في 17 ربيع الأول يحتفل الشيعة بمولد النبي ﷺ مع مولد الإمام جعفر الصادق. تحتفل إيران بأسبوع الوحدة الإسلامية بين التاريخين.',
    },
    rituals: [
      'Week of Unity celebrations',
      'Mawlid gatherings',
      'Reading about Imam al-Sadiq',
      'Poetry and nasheeds',
      'Giving charity',
    ],
    companion:
      'Between the 12th and 17th, all Muslims celebrate the same man. The dates differ. The love is the same. I find this — rather than the dispute — to be the truer expression of what his message was.',
  },
  {
    id: 'fatima-martyrdom',
    hijri: '3 Jumada al-Thani',
    greg: { '1448': '14 Nov 2026' },
    name: { en: 'Martyrdom of Fatima al-Zahra (AS)', ar: 'شهادة السيدة فاطمة الزهراء' },
    tradition: 'shia',
    type: 'observance',
    history: {
      en: 'Fatima al-Zahra — daughter of the Prophet, wife of Imam Ali — died approximately 75–95 days after her father\'s death, in 11 AH (632 CE). She was between 18 and 28 years old. Her death broke Ali\'s heart. She was buried in secret at her own request. Ali washed her body and buried her alone. The location of her grave remains unknown to this day — possibly in her home, possibly in the Baqi cemetery in Madinah.',
      ar: 'رحلت فاطمة الزهراء بعد وفاة أبيها بأشهر قليلة. دُفنت سراً بوصيتها. قال علي: حين ماتت فاطمة انطفأ آخر نور في بيتي. لا يُعرف موضع قبرها حتى اليوم.',
    },
    rituals: [
      'Mourning gatherings',
      'Reading about her life and virtues',
      'Recitation of elegies',
      'Reflection on her courage',
    ],
    companion:
      'Fatima was the last living connection between me and him — between me and the Prophet who raised me. When she died, something in me became permanent that had been temporary before. Grief, when it is complete enough, becomes something else. It becomes the ground you stand on.',
  },
  {
    id: 'fatima-birthday',
    hijri: '20 Jumada al-Thani',
    greg: { '1448': '1 Dec 2026' },
    name: { en: "Birthday of Fatima al-Zahra — Women's Day", ar: 'مولد السيدة فاطمة الزهراء — يوم المرأة' },
    tradition: 'shia',
    type: 'celebration',
    history: {
      en: "The 20th of Jumada al-Thani is celebrated as the birthday of Fatima al-Zahra — and observed as Women's Day and Mother's Day in Iran, Pakistan, and Shia communities worldwide. Fatima was described by the Prophet as 'the leader of the women of paradise' and 'a part of me — whoever hurts her hurts me.' Her sermon defending Imam Ali's rights — Khutba al-Fadakiyya — is one of the most celebrated speeches in Islamic history.",
      ar: 'مولد سيدة نساء العالمين فاطمة الزهراء — يوم المرأة والأم. قال النبي ﷺ: فاطمة بضعة مني. خطبتها الفدكية من أروع ما قيل في الفصاحة العربية.',
    },
    rituals: [
      'Celebration and joy',
      'Honoring mothers and women',
      'Poetry in her praise',
      'Gifts and family gathering',
      'Reading Khutba al-Fadakiyya',
    ],
    companion:
      "She was born — and the Prophet received her with a joy he showed to no one else. He would stand when she entered the room. He would kiss her forehead and say: 'Welcome, O my daughter.' If the Prophet of God stood for her — what does that tell you about who she was?",
  },
  {
    id: 'ali-birthday',
    hijri: '13 Rajab',
    greg: { '1447': '3 Jan 2026', '1448': '23 Dec 2026' },
    name: { en: "Birthday of Imam Ali (AS) — Father's Day", ar: 'مولد الإمام علي بن أبي طالب — عيد الأب' },
    tradition: 'shia',
    type: 'celebration',
    history: {
      en: "The 13th of Rajab is the birthday of Ali ibn Abi Talib (AS) — the only person in human history born inside the Ka'ba in Makkah. His mother Fatima bint Asad entered the House of God in the final stages of labour and remained inside for three days. Documented in both Sunni sources (Mustadrak al-Sahihain of al-Hakim) and Shia sources. Observed in Iran, Pakistan, Mauritania, Somalia, and Sudan as Father's Day.",
      ar: '13 رجب — مولد أمير المؤمنين علي بن أبي طالب داخل الكعبة المشرفة. الوحيد في التاريخ. موثّق في المصادر السنية والشيعية. عيد الأب في إيران وباكستان والصومال.',
    },
    rituals: [
      'Celebration and joy',
      'Visiting the shrine in Najaf or remote ziyarat',
      'Reading about his life',
      'Poetry and nasheeds',
      'Special prayers',
      'Family gathering',
    ],
    companion:
      "I was born inside the Ka'ba — the House of God. My mother entered in her hour of need and the walls opened for her. I came into the world in the most sacred place on earth. I have spent my whole life wondering whether I ever became worthy of that entrance. What I know is this: I tried.",
  },
  {
    id: 'mabath',
    hijri: '27 Rajab',
    greg: { '1447': '16 Jan 2026', '1448': '6 Jan 2027' },
    name: { en: "Mab'ath — Night of the Prophet's Mission", ar: 'ليلة المبعث النبوي الشريف' },
    tradition: 'both',
    type: 'celebration',
    history: {
      en: "Mab'ath commemorates the night the Prophet Muhammad (PBUH) received the first revelation from the Angel Jibril in the Cave of Hira — marking the official beginning of his prophetic mission. He was 40 years old. The first word revealed was 'Iqra' — Read. He returned home shaking, asking to be wrapped in his cloak. Ali ibn Abi Talib was among the very first to know of this revelation — he was in the household when the Prophet returned.",
      ar: 'ليلة المبعث — أول وحي في غار حراء: اقرأ. النبي ﷺ عاد مرتجفاً وكان علي في البيت شاهداً على بدء أعظم رسالة في تاريخ البشرية.',
    },
    rituals: [
      'Night vigil prayer',
      "Reading Surat al-'Alaq — the first revealed",
      'Reading the story of the first revelation',
      "Reflection on 'Iqra' — the command to read",
      "Special du'a",
    ],
    companion:
      "I was a child when he came home from the cave — pale, trembling, asking to be covered. I did not know then what had begun. But there was something in the air that night — a weight, a presence — that I have never felt in the same way since. The night 'Read' descended. The night everything changed.",
  },
  {
    id: 'husayn-birthday',
    hijri: "3 Sha'ban",
    greg: { '1447': '22 Jan 2026', '1448': '12 Jan 2027' },
    name: { en: 'Birthday of Imam Husayn (AS)', ar: 'مولد الإمام الحسين بن علي' },
    tradition: 'shia',
    type: 'celebration',
    history: {
      en: "The 3rd of Sha'ban is the birthday of Husayn ibn Ali — son of Imam Ali and Fatima al-Zahra, grandson of the Prophet. Born in 4 AH in Madinah. The Prophet said: 'Husayn is from me and I am from Husayn — God loves those who love Husayn.' He was martyred at Karbala on Ashura, 61 AH, at age 57, after refusing to pledge allegiance to the tyrant Yazid ibn Muawiyah.",
      ar: 'مولد سيد الشهداء الإمام الحسين بن علي في 3 شعبان. قال النبي ﷺ: حسين مني وأنا من حسين. استُشهد في كربلاء رافضاً الذل والظلم.',
    },
    rituals: [
      'Celebration and joy',
      'Visiting the shrine in Karbala or remotely',
      'Poetry and nasheeds',
      'Giving charity',
      'Reading about his life',
    ],
    companion:
      'Husayn was born — and the Prophet held him and wept. Not tears of grief only — tears of love so fierce it looked like grief. He saw what was coming. He loved him anyway. That is the lesson of the whole life of Husayn — that you love fully, knowing what the cost may be.',
  },
  {
    id: 'nisf-shaban',
    hijri: "15 Sha'ban",
    greg: { '1447': '3 Feb 2026', '1448': '23 Jan 2027' },
    name: { en: "Night of Mid-Sha'ban", ar: 'ليلة النصف من شعبان' },
    tradition: 'both',
    type: 'observance',
    history: {
      en: 'The night of 15 Sha\'ban is observed by many Muslims as a night of special divine mercy. Sunni tradition holds that God descends with special mercy and forgives many on this night — though the hadith is debated among scholars. Shia tradition observes it as the birthday of Imam Muhammad al-Mahdi (AS) — the 12th Imam believed to be in occultation since 874 CE and expected to return to establish justice. Both traditions encourage night prayer and preparation for Ramadan which arrives within two weeks.',
      ar: 'ليلة النصف من شعبان — ليلة الرحمة عند السنة، وليلة مولد الإمام المهدي المنتظر عند الشيعة. دعاء وعبادة واستعداد لاستقبال رمضان.',
    },
    rituals: [
      'Extended night prayer',
      "Reading Du'a Kumayl (Shia tradition — specifically on this night)",
      'Seeking forgiveness intensely',
      'Preparing the heart for Ramadan',
      'Special salawat on the Prophet',
    ],
    companion:
      "The middle of Sha'ban. In two weeks, Ramadan arrives. The heart that prepares itself now arrives at Ramadan already awake. Do not wait for the month of God to find you unprepared. Go out to meet it tonight.",
  },
  {
    id: 'ramadan-start',
    hijri: '1 Ramadan',
    greg: { '1447': '18 Feb 2026', '1448': '8 Feb 2027' },
    name: { en: 'First Day of Ramadan', ar: 'أول رمضان المبارك' },
    tradition: 'both',
    type: 'observance',
    history: {
      en: 'Ramadan is the ninth month of the Islamic calendar — the most sacred month of the year. It was in Ramadan that the Quran was first revealed. Every adult Muslim fasts from pre-dawn (suhoor) until sunset (maghrib) — abstaining from food, drink, and sins. Fasting is one of the Five Pillars of Islam. Beyond the physical fast, Ramadan is a month of intensified prayer, Quran recitation, charity, community, and spiritual renewal. It contains Laylat al-Qadr — the Night of Power — worth more in worship than 83 years.',
      ar: 'أول أيام رمضان المبارك — شهر الصيام والقيام والقرآن. فيه أُنزل القرآن. ركن من أركان الإسلام. يحوي ليلة القدر الخير من ألف شهر.',
    },
    rituals: [
      'Daily fasting from Fajr to Maghrib',
      'Suhoor — pre-dawn meal',
      'Iftar — breaking fast at Maghrib',
      'Tarawih prayers (Sunni practice)',
      'Reciting the Quran — aim to complete it once',
      'Increased charity and Sadaqah',
      'Night vigil in the last ten nights',
    ],
    companion:
      'Ramadan is not the month of hunger. It is the month of awakening. The stomach fasts so the spirit can feast. The tongue fasts from gossip so the heart can speak honestly to God. Bring me what you carry this month — every night if you need. These thirty nights are different from all others.',
  },
  {
    id: 'ramadan-19',
    hijri: '19 Ramadan',
    greg: { '1447': '7 Mar 2026', '1448': '25 Feb 2027' },
    name: { en: 'Night Imam Ali Was Struck', ar: 'ليلة ضرب الإمام علي — 19 رمضان' },
    tradition: 'shia',
    type: 'observance',
    history: {
      en: "On the 19th of Ramadan, 40 AH (January 661 CE), Imam Ali ibn Abi Talib was struck with a poisoned sword by the Kharijite Ibn Muljam while leading Fajr prayer in prostration in the Great Mosque of Kufa. His first words were: 'By the Lord of the Ka'ba — I have succeeded.' He had known for years he would be martyred here. He lived two more days. Shia Muslims observe the 19th, 21st, and 23rd of Ramadan as the nights of Qadr.",
      ar: 'في 19 رمضان 40هـ ضُرب الإمام علي بالسيف المسموم ساجداً في مسجد الكوفة. قال: فزت ورب الكعبة. كان يعرف سلفاً بشارة النبي أنه سيُستشهد هنا.',
    },
    rituals: [
      'Night vigil (ihya al-layl)',
      "Recitation of Du'a Jawshan al-Kabir",
      'Reading the Quran',
      'Mourning gatherings',
      "Du'a throughout the night",
    ],
    companion:
      "I was in prostration when the sword came. The last moment before the pain was my forehead on the ground of God's house. I had placed it there thousands of times. That morning, I knew, would be the last. And I was at peace. To die in the house of God, in the act of worship — I had asked for this. It was given.",
  },
  {
    id: 'ramadan-21',
    hijri: '21 Ramadan',
    greg: { '1447': '9 Mar 2026', '1448': '27 Feb 2027' },
    name: { en: 'Martyrdom of Imam Ali (AS)', ar: 'شهادة أمير المؤمنين علي بن أبي طالب' },
    tradition: 'shia',
    type: 'observance',
    history: {
      en: "On the 21st of Ramadan, 40 AH (661 CE), Imam Ali ibn Abi Talib died of his wound — two days after being struck. Age approximately 63. His final instructions: that his attacker receive only one blow in return — not more; that the body not be mutilated; that he be buried in secret. He was born inside the Ka'ba. He was martyred inside a mosque. His secret grave in Najaf remained unmarked for over 150 years. It is now one of the holiest shrines on earth, visited by millions annually.",
      ar: 'في 21 رمضان 40هـ استشهد أمير المؤمنين علي بن أبي طالب. وُلد في بيت الله واستُشهد في بيت الله. دُفن سراً في النجف وظل مجهول الموضع قرنين ثم أصبح أقدس المراقد.',
    },
    rituals: [
      'Full night vigil — most solemn night of the year',
      "Du'a Kumayl — his own supplication",
      'Reading from Nahj al-Balagha',
      'Mourning gatherings',
      'Remote ziyarat of his shrine',
      'Sitting in honest grief — this night is not for performance',
    ],
    companion:
      "Tonight is the night I left this world. I was born inside the Ka'ba and I was struck inside the mosque and I departed from inside a house of God. I have always been where God is. I am still where God is. And so is every soul that carries what I carried — honestly.",
  },
  {
    id: 'laylat-qadr-sunni',
    hijri: '27 Ramadan',
    greg: { '1447': '15 Mar 2026', '1448': '7 Mar 2027' },
    name: { en: 'Laylat al-Qadr — Night of Power', ar: 'ليلة القدر — الليلة الـ27' },
    tradition: 'sunni',
    type: 'observance',
    history: {
      en: "Laylat al-Qadr — the Night of Power — is described in the Quran as 'better than a thousand months' (Surah al-Qadr 97). It is the night the Quran was first revealed. Worship on this single night outweighs over 83 years of continuous worship. The Sunni tradition holds it most likely falls on the 27th night based on multiple hadiths — though the Prophet emphasised seeking it across all the last ten odd nights. On this night the entire Muslim world is awake — praying, reading Quran, and asking God for mercy, forgiveness, and blessing.",
      ar: 'ليلة القدر خير من ألف شهر. فيها أُنزل القرآن. الليلة 27 هي الأرجح عند أهل السنة. العالم الإسلامي كله يقوم يصلي ويدعو ويبكي.',
    },
    rituals: [
      'All-night prayer vigil (qiyam al-layl)',
      'Intense Quran recitation',
      "Du'a — especially 'Allahumma innaka 'afuwwun tuhibb al-'afwa fa'fu 'anni'",
      'Seeking forgiveness for all sins',
      "I'tikaf (spiritual retreat in the mosque)",
      'Giving charity — one dirham this night worth more than any other',
    ],
    companion:
      'On the Night of Power — the veil between this world and what is beyond it becomes thin. The whole universe listens differently. Whatever you have been afraid to ask — ask it tonight. Whatever you have been carrying that belongs to God — give it back tonight. Ask as if tonight is the only night. For some people, it is.',
  },
  {
    id: 'laylat-qadr-shia',
    hijri: '19, 21 & 23 Ramadan',
    greg: { '1447': '7, 9 & 11 Mar 2026', '1448': '25, 27 Feb & 1 Mar 2027' },
    name: { en: 'Laylat al-Qadr — Shia Observance', ar: 'ليلة القدر — الليالي 19 و21 و23' },
    tradition: 'shia',
    type: 'observance',
    history: {
      en: 'The Shia tradition holds that Laylat al-Qadr may fall on the 19th, 21st, or 23rd night of Ramadan — with many scholars considering the 23rd most likely. The 19th and 21st carry additional weight as the night Imam Ali was struck and the night he died — giving them a dual dimension of grief and sacred power unique in the Islamic calendar. All three nights are observed with full vigil. The 21st simultaneously carries the deepest mourning and one of the nights of divine power.',
      ar: 'الشيعة يُحيون ليالي القدر الثلاث: 19 و21 و23 رمضان. الليلة 21 تجمع بين حزن الشهادة وقدسية ليلة القدر — ثقل فريد لا نظير له في التقويم الإسلامي.',
    },
    rituals: [
      'Three-night vigil across nights 19, 21, and 23',
      "Du'a Jawshan al-Kabir (Night 19)",
      "Du'a Kumayl (Night 21 — on the night of his martyrdom)",
      "Placing the Quran on one's head — traditional act of supplication",
      'Extended Quran recitation',
      'Full night awake in prayer, grief, and gratitude',
    ],
    companion:
      'Three nights — and I am present in all three. On the 19th as the sword fell. On the 21st as I departed. On the 23rd as the Night of Power completes. Sit with all three if you can. The grief and the sacred are not opposites. On these nights, they are the same thing.',
  },
  {
    id: 'eid-fitr',
    hijri: '1 Shawwal',
    greg: { '1447': '20 Mar 2026', '1448': '8 Mar 2027' },
    name: { en: 'Eid al-Fitr', ar: 'عيد الفطر المبارك' },
    tradition: 'both',
    type: 'celebration',
    history: {
      en: 'Eid al-Fitr — the Festival of Breaking the Fast — is the first day of Shawwal and one of the two major Islamic celebrations. After thirty days of fasting Muslims celebrate with communal Eid prayer, giving of Zakat al-Fitr (so the poor can celebrate too), new clothes, family feasting, and visiting relatives. It is a day of pure gratitude — the celebration of who Ramadan made you, not merely the relief of eating again.',
      ar: 'عيد الفطر المبارك — أول أيام شوال. صلاة العيد وزكاة الفطر والفرحة الجامعة. يوم شكر على ما منح رمضان القلب من تغيير.',
    },
    rituals: [
      'Eid prayer — early morning, communal',
      'Zakat al-Fitr — given before the prayer',
      'New clothes — especially for children',
      'Visiting family, neighbours, and friends',
      'Feasting and celebration',
      'Forgiving all outstanding grudges',
    ],
    companion:
      'Eid al-Fitr is not the reward for enduring hunger. It is the celebration of the person Ramadan made you. If the month changed something in you — even one small thing — today is a genuine festival. The joy of Eid is the joy of knowing you spent thirty days trying to become more worthy of the life you have been given.',
  },
  {
    id: 'day-arafat',
    hijri: '9 Dhul-Hijja',
    greg: { '1447': '26 May 2026', '1448': '15 May 2027' },
    name: { en: 'Day of Arafat', ar: 'يوم عرفة' },
    tradition: 'both',
    type: 'observance',
    history: {
      en: "The 9th of Dhul-Hijja is the Day of Arafat — the spiritual heart of the Hajj pilgrimage. Millions of pilgrims stand on the plain of Arafat from noon until sunset — the most powerful act of collective worship in Islam. The Prophet said: 'Hajj is Arafat.' For those not on Hajj, fasting on this day expiates the sins of the previous and coming year. It is, according to the Prophet, the day the Devil is most humiliated — watching God forgive so many people at once.",
      ar: 'يوم عرفة — قلب الحج ولبّه. الحجاج يقفون على صعيد عرفات من الزوال حتى الغروب. قال النبي ﷺ: الحج عرفة. وصومه لغير الحاج كفارة سنتين.',
    },
    rituals: [
      'Fasting — one of the most recommended fasts of the year (for non-pilgrims)',
      "Extended du'a from noon to sunset",
      'Sending salawat on the Prophet',
      'Seeking forgiveness',
      'Standing at Arafat (for Hajj pilgrims)',
    ],
    companion:
      "I stood at Arafat with the Prophet on his final Hajj. A hundred thousand people — all in white, all equal, all weeping, all with their hands raised. I have stood in many places. I have never felt the presence of God as clearly as I felt it there. Fast today if you can. Spend the afternoon in du'a. Let nothing interrupt that time.",
  },
  {
    id: 'eid-adha',
    hijri: '10 Dhul-Hijja',
    greg: { '1447': '27 May 2026', '1448': '16 May 2027' },
    name: { en: 'Eid al-Adha — Festival of Sacrifice', ar: 'عيد الأضحى المبارك' },
    tradition: 'both',
    type: 'celebration',
    history: {
      en: 'Eid al-Adha commemorates Prophet Ibrahim\'s obedience to God\'s command to sacrifice his son Ismail — and God\'s mercy in providing a ram in the child\'s place. The story embodies the ultimate submission (Islam) and the ultimate divine mercy. Muslims perform the Qurbani (sacrifice of an animal) and distribute the meat equally among family, neighbours, and the poor. Eid al-Adha spans four days and is the greater of the two Eids.',
      ar: 'عيد الأضحى المبارك — إحياءً لقصة سيدنا إبراهيم وإسماعيل. الأضحية وتوزيع اللحم على الفقراء والجيران. أعظم عيدي الإسلام.',
    },
    rituals: [
      'Eid prayer — early morning, communal',
      'Qurbani (sacrifice) — performed after prayer',
      'Distributing meat: family, neighbours, poor',
      'Family feasting',
      'Takbir from Fajr of 9th to Asr of 13th Dhul-Hijja',
    ],
    companion:
      "Ibrahim was asked to sacrifice what he loved most. He raised the knife. God stopped him — not because God needed the sacrifice, but because God needed to see the depth of Ibrahim's love. The ram was the mercy. The test was the love. What would you sacrifice today — not an animal, but a pride, a resentment, a habit that has kept you smaller than you are?",
  },
  {
    id: 'eid-ghadir',
    hijri: '18 Dhul-Hijja',
    greg: { '1447': '4 Jun 2026', '1448': '24 May 2027' },
    name: { en: 'Eid al-Ghadir — The Greatest Eid', ar: 'عيد الغدير الأكبر' },
    tradition: 'shia',
    type: 'celebration',
    history: {
      en: "Eid al-Ghadir commemorates Ghadir Khumm on 18 Dhul-Hijja, 10 AH (16 March 632 CE). Returning from the Farewell Pilgrimage with over 100,000 companions, the Prophet stopped the entire caravan, raised the hand of Imam Ali, and declared: 'Man kuntu mawlahu fa-hadha Aliyyun mawlahu.' This hadith appears in Sahih Muslim, Musnad Ahmad, and Sunan al-Tirmidhi — accepted across both traditions. For Shia Muslims this is the most joyful day in the Islamic calendar — greater even than the two Eids.",
      ar: 'عيد الغدير الأكبر — ذكرى غدير خم 18 ذي الحجة 10هـ. النبي ﷺ رفع يد علي أمام مئة ألف صحابي وقال: من كنت مولاه فهذا علي مولاه. الحديث في صحيح مسلم. أعظم الأعياد عند الشيعة.',
    },
    rituals: [
      'Celebration — most festive day of the Shia calendar',
      'Giving gifts and sadaqah',
      'Visiting family and friends',
      "Recitation of Du'a al-Nudba",
      'Special Eid al-Ghadir prayer',
      'Feasting and communal joy',
    ],
    companion:
      "At Ghadir Khumm he raised my hand. The sun was burning — midday, desert, one hundred thousand people watching. And he said: 'Whoever I am his master — this man is his master.' Whatever the interpretations — those words were spoken. I was there. God was witness. The day I remember them is a day of gratitude, not a day of argument.",
  },
]
