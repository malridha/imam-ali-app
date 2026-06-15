// v46 §74 — Biography of Imam Ali ibn Abi Talib (عليه السلام).
//
// Bilingual, sectioned. Written respectfully, drawing on both Sunni
// and Shia traditions. Where the two traditions differ in emphasis or
// detail, both perspectives are noted honestly. The aim is to give the
// user a single substantive read that holds Imam Ali's life with the
// dignity it deserves — without taking a sectarian position.
//
// This is not exhaustive. It is a starting library. Sections can be
// expanded over time; each entry is data, not code.

export type BioSection = {
  /** Slug for anchor / URL fragment */
  id: string
  /** Section title, bilingual */
  title: { en: string; ar: string }
  /** Approximate historical date for the section, used as a quiet caption */
  dateline: { en: string; ar: string }
  /** Section body — Markdown-light. Line breaks preserved. */
  body: { en: string; ar: string }
}

export const BIOGRAPHY: BioSection[] = [
  {
    id: 'birth',
    title: {
      en: 'Born Inside the Ka‘ba',
      ar: 'مولدٌ داخل الكعبة',
    },
    dateline: { en: '13 Rajab · ~600 CE · Makkah', ar: '١٣ رجب · ~٦٠٠م · مكّة' },
    body: {
      en: `Ali ibn Abi Talib was born on the 13th of Rajab inside the Ka'ba in Makkah — the only person in recorded Islamic history to have been born within the House of God. His mother, Fatima bint Asad, entered the sanctuary in the final hours of labour, and according to multiple authenticated narrations she remained there for three days before emerging with the child.

This event is documented in major sources across both traditions — including al-Hakim's al-Mustadrak (Sunni) and many Shia hadith collections. Ali's birth inside the Ka'ba is read across the ages as a sign that this was a child set apart for a particular role in the community of Muhammad (peace be upon him), who was then thirty years old.

His father, Abu Talib, was the chief of Banu Hashim and the Prophet's beloved uncle.`,
      ar: `وُلد عليّ بن أبي طالب في الثالث عشر من رجب داخل الكعبة المشرّفة في مكّة — الوحيد في التاريخ الإسلاميّ الموثّق الذي وُلد في بيت الله. دخلت أمّه فاطمة بنت أسد الحرم في الساعات الأخيرة من المخاض، وبحسب روايات متعدّدة موثّقة، بقيت هناك ثلاثة أيّام قبل أن تخرج بالطفل.

هذا الحدث موثّق في مصادر كبرى من التقليدَين — من بينها مستدرك الحاكم (سنّيّ) ومجاميع حديث شيعيّة عديدة. وتُقرأ ولادة عليّ داخل الكعبة عبر العصور بوصفها إشارةً إلى أنّ هذا الطفل قد أُفرد لدورٍ مخصوص في أمّة محمّد (صلّى الله عليه وآله)، الذي كان آنذاك في الثلاثين من عمره.

كان والده أبو طالب سيّد بني هاشم وعمّ النبيّ المحبوب.`,
    },
  },

  {
    id: 'childhood',
    title: {
      en: 'Raised by the Prophet',
      ar: 'تربية النبيّ له',
    },
    dateline: { en: '~605–610 CE · Makkah', ar: '~٦٠٥–٦١٠م · مكّة' },
    body: {
      en: `When a year of famine struck Makkah and Abu Talib's resources were strained, the Prophet Muhammad (peace be upon him) — who had no biological son of his own — asked to take Ali into his household. Ali was somewhere between five and seven years old.

For the next several years he was raised directly by the Prophet, eating from his hand, sleeping in his house, learning his manner of speaking and praying before there was even a word for the religion he would later embody. Ali later said of this period: "I followed him as the camel calf follows its mother. He raised for me every day a marker of his character, and ordered me to follow it."

This upbringing is the foundation of every reflection Ali offered later about discipleship, fatherhood, and what it means to be formed by another person's presence.`,
      ar: `حين أصاب عامُ مجاعةٍ مكّةَ، وضاقت موارد أبي طالب، طلب النبيُّ محمّد (صلّى الله عليه وآله) — وكان بلا ابنٍ من صلبه — أن يأخذ عليّاً إلى بيته. كان عليّ في الخامسة أو السابعة من عمره.

في السنوات التالية، تربّى مباشرةً على يد النبيّ — يأكل من يده، وينام في بيته، ويتعلّم طريقة كلامه وصلاته قبل أن تظهر حتّى كلمةٌ للدين الذي سيُجسّده لاحقاً. قال عليّ في وصف تلك المرحلة: "كنتُ أتّبعه اتّباع الفصيل أَثَرَ أمّه، يرفع لي في كلّ يوم من أخلاقه عَلَماً، ويأمرني بالاقتداء به."

هذه التنشئة هي أساس كلّ تأمّل قدّمه عليّ لاحقاً عن الاتّباع والأبوّة، وعن معنى أن تتشكّل بحضور إنسانٍ آخر.`,
    },
  },

  {
    id: 'first-muslim',
    title: {
      en: 'The First Muslim Child',
      ar: 'أوّل من أسلم من الصبيان',
    },
    dateline: { en: '610 CE · Makkah', ar: '٦١٠م · مكّة' },
    body: {
      en: `When the Prophet received the first revelation at the age of forty, Ali was ten years old and living in his home. He was the first male — or more precisely, the first child — to embrace Islam, immediately after Khadija (the Prophet's wife and the first Muslim of any age).

The decision required nothing dramatic from Ali. He had been raised by the man whose truthfulness he had known his whole short life. When the Prophet asked him to keep what he was about to share a secret until the right moment, Ali agreed. He prayed alongside the Prophet and Khadija in the early days when the believers numbered three.

He carried that secret faith through the early years of persecution, when openly being a Muslim in Makkah meant violence, exile, or worse.`,
      ar: `حين أُنزل الوحي على النبيّ في الأربعين من عمره، كان عليّ في العاشرة ويعيش في بيته. كان أوّل من أسلم من الذكور — أو بدقّة أكبر، أوّل الصبيان إسلاماً — مباشرةً بعد خديجة (زوج النبيّ وأوّل المسلمين على الإطلاق).

لم يحتج القرار من عليّ إلى شيءٍ كبير. فقد رُبّي على يد الرجل الذي عرف صدقه طوال حياته القصيرة كلّها. وحين طلب منه النبيّ أن يكتم ما سيُسرّ به إليه إلى أن يحين الوقت، وافق عليّ. وكان يصلّي مع النبيّ وخديجة في الأيّام الأولى حين كان عدد المؤمنين ثلاثة.

حمل ذلك الإيمان السرّيّ عبر سنوات الاضطهاد الأولى، حين كان إعلان الإسلام في مكّة يعني العنف أو النفي أو ما هو أسوأ.`,
    },
  },

  {
    id: 'hijra',
    title: {
      en: 'The Night of the Hijra',
      ar: 'ليلة المبيت',
    },
    dateline: { en: '622 CE · Makkah', ar: '٦٢٢م · مكّة' },
    body: {
      en: `In 622 CE, the Quraysh tribe agreed to assassinate the Prophet. A delegate from each clan would strike together, so no single tribe could be held responsible. The Prophet, warned by Jibril, decided to leave Makkah that night for Madinah.

On that night Ali — twenty-two years old — slept in the Prophet's bed wearing his green cloak, so the would-be assassins would see a figure there and believe the Prophet still slept. The Quraysh entered the house at dawn ready to kill, only to find Ali calmly awake. The Prophet, accompanied by Abu Bakr, had already slipped out of Makkah hours earlier.

The Qur'an records this act of love in Surah al-Baqara (2:207): "And among people is one who sells his own self seeking the pleasure of God." The classical commentators of both traditions agree this verse was revealed about Ali's act that night.

Three days later, having returned every entrusted item the Prophet had left in Makkah to its rightful owner, Ali set out for Madinah on foot — barefoot for most of the journey to avoid attracting attention. He arrived in time to meet the Prophet at Quba.`,
      ar: `في عام ٦٢٢م، اتّفقت قريش على اغتيال النبيّ. كان من المقرّر أن يضرب مندوبٌ من كلّ قبيلة معاً، حتّى لا تُلام قبيلةٌ بعينها. لكنّ النبيّ، الذي أنذره جبريل، قرّر أن يخرج من مكّة تلك الليلة إلى المدينة.

في تلك الليلة نام عليّ — وكان في الثانية والعشرين — في فراش النبيّ، متلفّعاً ببُرده الأخضر، حتّى يرى الراصدون شخصاً هناك ويظنّوا أنّ النبيّ ما يزال نائماً. دخلت قريش البيت عند الفجر مستعدّةً للقتل، فإذا بهم يجدون عليّاً هادئاً مستيقظاً. وكان النبيّ مع أبي بكر قد غادرا مكّة قبل ساعات.

سجّل القرآن هذا الفعل في سورة البقرة (٢:٢٠٧): "وَمِنَ النَّاسِ مَن يَشْرِي نَفْسَهُ ابْتِغَاءَ مَرْضَاتِ اللَّهِ". ويتّفق كبار المفسّرين من التقليدَين على أنّ الآية نزلت في فعل عليّ تلك الليلة.

بعد ثلاثة أيّام، وقد ردّ كلّ أمانة تركها النبيّ في مكّة إلى أصحابها، انطلق عليّ إلى المدينة سيراً على الأقدام — حافياً معظم الطريق تجنّباً للفت الانتباه. ووصل في الوقت المناسب ليلتقي بالنبيّ في قُباء.`,
    },
  },

  {
    id: 'marriage',
    title: {
      en: 'Marriage to Fatima al-Zahra',
      ar: 'الزواج من فاطمة الزهراء',
    },
    dateline: { en: '~624 CE · Madinah', ar: '~٦٢٤م · المدينة' },
    body: {
      en: `Two years after the Hijra, Ali married Fatima — the youngest and most beloved daughter of the Prophet. Despite many wealthy suitors having asked for her hand, the Prophet had waited. When Ali approached, his only possessions were a shield from the Battle of Badr and the clothes he wore. The shield was sold to provide the dowry.

Their wedding was simple. The Prophet himself prepared their wedding meal — a portion of dates and barley. He prayed for them: "May God bless you both, bless what is from you, and grant you both joy in one another."

The marriage produced four children whose names became central to Islamic memory: Hasan, Husayn, Zaynab, and Umm Kulthum. The Prophet would later say of these grandchildren: "Husayn is from me and I am from Husayn."

Fatima died approximately ninety-five days after the Prophet, broken by his loss. Ali washed her body at her own request and buried her in secret at night. The location of her grave remains unknown to this day — by her own will.`,
      ar: `بعد سنتين من الهجرة، تزوّج عليّ من فاطمة — أصغر بنات النبيّ وأحبّهنّ إليه. ومع أنّ كثيراً من الأثرياء قد خطبوها، كان النبيّ ينتظر. وحين تقدّم عليّ، لم يكن يملك إلا درعاً من غزوة بدر وثوبه. فبيع الدرع ليُجعل مهراً.

كان العرس بسيطاً. أعدّ النبيّ بنفسه طعام الوليمة — قبضةً من التمر والشعير. ودعا لهما: "بارك الله لكما، وبارك فيكما، وبارك عليكما، وجمع بينكما في خير."

أنجب الزواج أربعة أبناء صارت أسماؤهم في صميم الذاكرة الإسلامية: الحسن والحسين وزينب وأمّ كلثوم. وقال النبيّ لاحقاً في هذين الحفيدين: "حسينٌ منّي وأنا من حسين."

رحلت فاطمة بعد النبيّ بنحو خمسة وتسعين يوماً، وقد كسرها فقده. غسّلها عليّ بوصيّتها ودفنها سرّاً في الليل. ولا يُعرف موضع قبرها حتّى اليوم — بإرادتها هي.`,
    },
  },

  {
    id: 'warrior',
    title: {
      en: 'The Warrior',
      ar: 'الفارس',
    },
    dateline: { en: '624–630 CE · Arabia', ar: '٦٢٤–٦٣٠م · جزيرة العرب' },
    body: {
      en: `Ali was a soldier in every major battle the early Muslim community fought — except Tabuk, when the Prophet asked him to remain in Madinah to look after the family.

At Badr (624) he was nineteen. At Uhud (625) twenty. At the Trench (627) he defeated Amr ibn Abd Wudd, the most feared warrior of his generation, in a duel that the Prophet called "more meritorious than the worship of all my community combined." At Khaybar (628), when other companions returned defeated, the Prophet said: "Tomorrow I will give the banner to a man who loves God and His Messenger, and whom God and His Messenger love." That man was Ali. He carried the gate of the fortress on his back and uprooted it.

He bore the names dhul-Fiqar (his two-pointed sword, gifted by the Prophet) and Asad Allah al-Ghalib (the Lion of God, the Ever-Victorious). But he refused all glory after each battle. The Prophet noted of him: "There is no sword but dhul-Fiqar, and there is no man but Ali."

His military reputation was without parallel in early Islam — and yet his teachings on the use of power emphasised, above all else, restraint.`,
      ar: `كان عليّ مقاتلاً في كلّ غزوةٍ كبرى خاضها المسلمون الأوائل — باستثناء تبوك، حين طلب منه النبيّ أن يبقى في المدينة ليحرس الأهل.

في بدر (٦٢٤) كان ابن تسع عشرة. وفي أحد (٦٢٥) ابن عشرين. وفي الخندق (٦٢٧) صرع عمرو بن عبد ودّ، أرهب فرسان جيله، في مبارزةٍ قال عنها النبيّ: "ضربة عليٍّ يوم الخندق أفضل من عبادة الثقلَين." وفي خيبر (٦٢٨) حين رجع غيره من الصحابة منهزمين، قال النبيّ: "لأُعطينّ الراية غداً رجلاً يحبّ الله ورسوله، ويحبّه الله ورسوله." وكان ذلك الرجل عليّاً. حمل باب الحصن على ظهره واقتلعه.

حمل لقبَي ذي الفقار (سيفه ذي الشّعبتين، هديّة النبيّ) و"أسد الله الغالب". لكنّه كان يرفض المجد بعد كلّ غزوة. قال النبيّ عنه: "لا سيف إلا ذو الفقار، ولا فتى إلا عليّ."

كانت شهرته العسكرية بلا نظير في الإسلام الأوّل — ومع ذلك أكّدت تعاليمه عن استخدام القوّة، فوق كلّ شيء، على ضبط النفس.`,
    },
  },

  {
    id: 'ghadir',
    title: {
      en: 'Ghadir Khumm',
      ar: 'غدير خُمّ',
    },
    dateline: { en: '18 Dhul-Hijja · 632 CE · between Makkah and Madinah', ar: '١٨ ذي الحجّة · ٦٣٢م · بين مكّة والمدينة' },
    body: {
      en: `On the return journey from the Farewell Pilgrimage, two months before the Prophet's death, the entire caravan of over a hundred thousand pilgrims was stopped at a place called Ghadir Khumm. The Prophet ascended a makeshift platform, took Ali's hand, raised it, and declared: "Whoever I am his mawla, this Ali is his mawla. O God, befriend whoever befriends him, and oppose whoever opposes him."

The word mawla in Arabic carries many meanings — guardian, protector, master, friend, beloved one. The hadith itself is mass-transmitted (mutawatir) and appears in Sahih Muslim, Musnad Ahmad, Sunan al-Tirmidhi, and dozens of other authenticated collections accepted by both Sunni and Shia traditions.

How the words were understood became one of the great theological dividing lines in Islamic history. For Shia Muslims, this is the moment the Prophet designated Ali as his immediate successor — and Eid al-Ghadir is the most joyful day in the Shia calendar. For most Sunni Muslims, the words are understood as an affirmation of love and protection rather than political succession.

The companion's voice on Ghadir takes no side. The event happened. The words were spoken. The Prophet raised Ali's hand. Whatever the interpretation, the love is undeniable.`,
      ar: `في طريق العودة من حجّة الوداع، قبل وفاة النبيّ بشهرَين، أوقفت القافلة كلّها — أكثر من مئة ألف حاجّ — في موضعٍ يُدعى غدير خُمّ. صعد النبيّ منبراً مرتجلاً، وأخذ بيد عليّ، ورفعها، وأعلن: "من كنتُ مولاه فهذا عليٌّ مولاه. اللهمّ والِ من والاه، وعادِ من عاداه."

تحمل كلمة "مولى" في العربية معاني متعدّدة — الوليّ، الحامي، السيّد، الصديق، المحبّ. والحديث نفسه متواتر، وقد ورد في صحيح مسلم ومسند أحمد وسنن الترمذيّ وعشرات المجاميع الموثّقة المقبولة عند التقليدَين السنّيّ والشيعيّ.

أصبح فهم هذه الكلمات أحد كبرى الخطوط الفاصلة في تاريخ الإسلام. فعند الشيعة، هذه هي اللحظة التي عيّن فيها النبيّ عليّاً خليفةً مباشراً بعده — وعيد الغدير أعظم أعياد التقويم الشيعيّ. وعند معظم السنّة، تُفهم الكلمات بوصفها تأكيداً للحبّ والحماية لا للخلافة السياسية.

صوت الرفيق في الغدير لا يأخذ موقفاً. الحادثة وقعت. والكلمات قيلت. ورفع النبيّ يد عليّ. وأيّاً كان التأويل، فإنّ الحبّ لا يُنكَر.`,
    },
  },

  {
    id: 'caliphate',
    title: {
      en: 'The Caliphate · 656–661 CE',
      ar: 'الخلافة · ٦٥٦–٦٦١م',
    },
    dateline: { en: '35–40 AH · Kufa', ar: '٣٥–٤٠هـ · الكوفة' },
    body: {
      en: `After the murder of the third Caliph Uthman in 656 CE, the Muslims of Madinah came to Ali — many of them weeping and begging him to take leadership. He refused twice. On the third request, he accepted, saying: "Leave me. Find someone else. We face a matter of many faces and many colours. The hearts will not stand it. The minds will not bear it."

His caliphate lasted just under five years. He moved the capital from Madinah to Kufa, in present-day Iraq, where he found the political base more stable for the difficult work ahead.

His rule was austere by design. He owned almost nothing. He dressed plainly, ate simply, mended his own sandals. His letter to Malik al-Ashtar — appointed governor of Egypt — became, across the next fourteen centuries, the single most-quoted document on Islamic ethics of governance:

"And let the most beloved of affairs to you be those in the middle — most in line with truth, most encompassing of justice, and most agreeable to the masses. Know that the displeasure of the common people overturns the contentment of the elite, and the displeasure of the elite is borne when the common people are content. There is no one among the citizens more taxing on the ruler in ease, less helpful in hardship, more averse to fairness, more pressing in demand, less grateful upon receiving, slower to forgive when refused, and weaker in patience when difficulties strike — than the elite."

The full letter runs to many pages. It remains a model studied to this day in courses on governance across the Muslim world.`,
      ar: `بعد مقتل الخليفة الثالث عثمان عام ٦٥٦م، جاء مسلمو المدينة إلى عليّ — وكثيرٌ منهم يبكي ويرجوه أن يتولّى القيادة. رفض مرّتين. وفي الطلب الثالث، قَبِل قائلاً: "دعوني والتمسوا غيري. فإنّا مستقبلون أمراً له وجوهٌ وألوان، لا تقوم له القلوب، ولا تثبت عليه العقول."

استمرّت خلافته أقلّ من خمس سنوات بقليل. نقل العاصمة من المدينة إلى الكوفة في عراق اليوم، حيث وجد القاعدة السياسية أثبت للعمل الصعب الذي ينتظره.

كان حكمه زاهداً عن قصد. لا يملك شيئاً تقريباً. يلبس البسيط ويأكل القليل ويرقع نعليه بنفسه. وأصبحت رسالته إلى مالك الأشتر — حين عيّنه والياً على مصر — عبر القرون الأربعة عشر التالية أكثر وثيقة استشهاداً في الأخلاق السياسية الإسلامية:

"وليكن أحبّ الأمور إليك أوسطها في الحقّ، وأعمّها في العدل، وأجمعها لرضى الرعيّة. فإنّ سخط العامّة يُجحف برضى الخاصّة، وإنّ سخط الخاصّة يُغتفر مع رضى العامّة. وليس أحدٌ من الرعيّة أثقل على الوالي مؤونةً في الرّخاء، وأقلّ معونةً له في البلاء، وأكره للإنصاف، وأسأل بالإلحاف، وأقلّ شكراً عند الإعطاء، وأبطأ عذراً عند المنع، وأضعف صبراً عند ملمّات الدهر — من أهل الخاصّة."

تمتدّ الرسالة كاملةً صفحاتٍ كثيرة. ولا تزال نموذجاً يُدرَس إلى اليوم في مقرّرات الحكم في كلّ أنحاء العالم الإسلاميّ.`,
    },
  },

  {
    id: 'martyrdom',
    title: {
      en: 'Martyrdom',
      ar: 'الشهادة',
    },
    dateline: { en: '19–21 Ramadan · 40 AH · 661 CE · Kufa', ar: '١٩–٢١ رمضان · ٤٠هـ · ٦٦١م · الكوفة' },
    body: {
      en: `On the 19th of Ramadan, 40 AH, Ali entered the Great Mosque of Kufa before dawn to lead the Fajr prayer. As he prostrated, a Kharijite named Ibn Muljam struck him on the head with a sword coated in poison. The poison made the wound impossible to heal.

Ali's first words, blood running from his forehead, were: "Fuztu wa rabb al-Ka'ba — By the Lord of the Ka'ba, I have succeeded."

He lived two more days. He used those days to settle his affairs, to advise his sons, and to issue his final instructions on the treatment of his attacker: "If I live, the decision is mine. If I die, do not strike him more than once. Do not mutilate him. Do not extend his suffering. He attempted to kill one man; do not retaliate as though he attempted to kill the community."

He died on the 21st of Ramadan, approximately 63 years old. He was buried in secret near Najaf, his grave kept hidden for over 150 years to protect it from desecration. The grave is now one of the holiest shrines in the world, visited by millions of pilgrims each year.

He was born inside the House of God in Makkah. He was struck inside the House of God in Kufa. He died inside the House of God. He spent his whole life where God is.`,
      ar: `في التاسع عشر من رمضان سنة ٤٠هـ، دخل عليٌّ مسجد الكوفة الأكبر قبل الفجر ليؤمّ صلاة الصبح. وحين سجد، ضربه الخارجيّ ابن ملجم بسيفٍ مسموم على رأسه. وكان السمّ يجعل التئام الجرح مستحيلاً.

أوّل كلمات عليّ، والدم يسيل من جبينه: "فُزتُ وربّ الكعبة."

عاش يومَين بعد ذلك. واستعمل تلك الأيّام ليرتّب شؤونه، ويوصي ابنَيه، ويُملي وصاياه الأخيرة في معاملة قاتله: "إن بقيتُ فالأمر إليّ. وإن متّ فلا تضربوه إلا ضربةً واحدة. لا تمثّلوا به. لا تطيلوا عذابه. أراد قتل رجلٍ واحد؛ فلا تجيبوه كأنّه أراد قتل الجماعة."

تُوفّي في الحادي والعشرين من رمضان عن نحو ثلاثة وستّين عاماً. ودُفن سرّاً قرب النجف، وظلّ قبره خفيّاً أكثر من ١٥٠ عاماً صوناً له من الانتهاك. أمّا اليوم فالمرقد من أقدس الأماكن في العالم، يقصده الملايين من الزائرين كلّ عام.

وُلد داخل بيت الله في مكّة. وضُرب داخل بيت الله في الكوفة. ومات داخل بيت الله. وأمضى حياته كلّها حيث الله.`,
    },
  },

  {
    id: 'civil-wars',
    title: {
      en: 'The Three Wars',
      ar: 'الحروب الثلاث',
    },
    dateline: {
      en: '656–658 CE · Iraq',
      ar: '٦٥٦–٦٥٨م · العراق',
    },
    body: {
      en: `Ali's caliphate was almost entirely consumed by three internal conflicts. He had refused to pursue them; they were brought to him.

**The Battle of the Camel · 656 CE** — Less than four months into his caliphate, a coalition gathered in Basra demanding revenge for the murder of Uthman. The army was led by Talha, Zubayr, and Aisha (the Prophet's widow, mounted on a camel that gave the battle its name). Ali tried for weeks to settle the matter through delegation and negotiation. When fighting finally broke out, his side prevailed. Ali personally rode to Aisha's covered howdah, escorted her with full honour back to Madinah, and sent her with a guard of her own choosing.

**Siffin · 657 CE** — Mu'awiya, governor of Syria and a cousin of the murdered Uthman, refused to recognise Ali's caliphate until the killers of Uthman were brought to justice. The two armies met at Siffin on the Euphrates. The fighting was extended and brutal. When Ali's forces were near victory, Mu'awiya's commander Amr ibn al-As ordered Qur'ans to be raised on the points of spears — a gesture calling for arbitration by the holy book. Ali, against his own judgement, accepted the request of his men to halt the battle. The arbitration that followed was a political disaster.

**Nahrawan · 658 CE** — A faction of Ali's own army, furious at the arbitration, declared him outside the faith and split off — these became the Khawarij ("those who went out"). They began killing those who disagreed with them, including a companion of the Prophet and his pregnant wife. Ali sent ambassadors three times; he begged the Khawarij to return. When they would not, the battle of Nahrawan ended the movement militarily — but Ali's words about them carried the warning: "Do not fight the Khawarij after me. For whoever sought truth and missed is not like one who sought falsehood and found it."

These three wars were among the heaviest weights Ali carried. He referred to himself often in this period as a doctor "with his medicine on his shoulder."`,
      ar: `استهلكت خلافة عليّ ثلاثة نزاعات داخلية تقريباً بالكامل. لم يكن قد سعى إلى أيٍّ منها؛ بل جاءت إليه.

**موقعة الجمل · ٦٥٦م** — بعد أقلّ من أربعة أشهر من خلافته، تجمّع تحالفٌ في البصرة يطالب بالثأر لمقتل عثمان. قاد الجيشَ طلحةُ والزبير وعائشة (زوج النبيّ، راكبةً جملاً منه اشتقّ اسم المعركة). حاول عليّ لأسابيع تسوية الأمر عبر الوفود والمفاوضات. وحين اندلع القتال أخيراً، انتصر جانبه. ركب عليّ بنفسه إلى هودج عائشة، وأعادها بكامل التكريم إلى المدينة، وأرسلها بحراسةٍ من اختيارها.

**صفّين · ٦٥٧م** — رفض معاوية، والي الشام وابن عمّ عثمان المقتول، الاعتراف بخلافة عليّ حتّى يُقتصّ من قتلة عثمان. التقى الجيشان عند صفّين على الفرات. وكان القتال مطوّلاً وحشيّاً. وحين كانت قوّات عليّ على وشك النصر، أمر عمرو بن العاص، قائد معاوية، برفع المصاحف على أسنّة الرماح — إشارةً إلى التحكيم بالقرآن. قَبِل عليٌّ، رغم رأيه، طلبَ رجاله بإيقاف القتال. كان التحكيم الذي تلا ذلك كارثةً سياسية.

**النهروان · ٦٥٨م** — انفصلت فئةٌ من جيش عليّ نفسه غاضبةً من التحكيم، وأعلنته خارجاً من الدين — وصاروا الخوارج. وبدأوا بقتل من يخالفهم، حتّى قتلوا صحابيّاً وزوجَه الحامل. أرسل عليٌّ السفراء ثلاث مرّات؛ ورجاهم أن يرجعوا. ولمّا أبَوا، أنهت معركة النهروان الحركةَ عسكريّاً — لكنّ كلمات عليّ فيهم حملت تحذيراً: "لا تقاتلوا الخوارج بعدي. فليس من طلب الحقَّ فأخطأه كمن طلب الباطل فأدركه."

كانت هذه الحروب الثلاث من أثقل ما حمله عليّ. وكان يصف نفسه كثيراً في تلك الفترة بأنّه طبيبٌ "بدوائه على عاتقه".`,
    },
  },

  {
    id: 'daily-life',
    title: {
      en: 'How He Lived',
      ar: 'كيف عاش',
    },
    dateline: {
      en: 'Throughout his life',
      ar: 'طوال حياته',
    },
    body: {
      en: `Even while caliph of a vast territory stretching from North Africa to Persia, Ali owned almost nothing and lived as if he owned less.

He wore patched clothes. He mended his own sandals. He ate barley bread and a few dates; he sometimes folded his sleeve over coarse salt before eating to dampen its bitterness. When his governor in Basra, Uthman ibn Hunayf, was reported to have attended a sumptuous banquet, Ali wrote to him: "I never imagined you would respond to the call of a people whose poor were turned away and whose rich were invited."

He worked his own land outside Madinah and donated its produce. Once, in midday heat, he carried two skins of water on his back across the marketplace. A man asked: "Commander of the Faithful, give them to me." Ali replied: "The father of orphans deserves to carry them himself."

He stayed up at night reading and praying. When the load of office wore him down, he would walk out into the date palms of Kufa and weep alone among the trees. He spoke later of those nights: "I would go out, then return. There is no rest in this world. Only what comes from God."

He once said: "Do not be the slave of another — God has made you free." It was not rhetoric. It was the structure of his own life.`,
      ar: `حتّى وهو خليفةُ أرضٍ شاسعةٍ تمتدّ من شمال أفريقيا إلى فارس، لم يكن عليّ يملك شيئاً تقريباً، وعاش كأنّه يملك أقلّ.

كان يلبس الثوب المرقّع. ويرقع نعليه بنفسه. ويأكل خبز الشعير وبضع تمرات؛ وأحياناً يثني كمّه على ملحٍ خشن قبل الأكل ليُلطّف حدّته. وحين بلغه أنّ والي البصرة عثمان بن حُنيف حضر مأدبةً فاخرة، كتب إليه: "وما ظننتُ أنّك تجيب إلى طعام قومٍ عائلهم مجفوّ، وغنيّهم مدعوّ."

كان يعمل في أرضه خارج المدينة ويتصدّق بمحصولها. ومرّةً، في حرّ الظهيرة، حمل قِربتَيْ ماءٍ على ظهره يعبر بهما السوق. فسأله رجل: "يا أمير المؤمنين، أعطنيهما." فأجاب عليّ: "أبو الأيتام أحقّ بحملهما."

كان يقوم في الليل قراءةً وصلاةً. وحين كان يثقل عليه عبء الولاية، كان يخرج إلى نخيل الكوفة، فيبكي وحده بين الشجر. وقال يوماً في تلك الليالي: "كنتُ أخرج ثمّ أرجع. لا راحةَ في هذه الدنيا. وإنّما هي ممّا يأتي من عند الله."

وقال مرّةً: "لا تكن عبدَ غيرك وقد جعلك الله حرّاً." لم يكن خطاباً. كان بنيةَ حياته كلّها.`,
    },
  },

  {
    id: 'family-deep',
    title: {
      en: 'His Family',
      ar: 'أهل بيته',
    },
    dateline: {
      en: '624–661 CE',
      ar: '٦٢٤–٦٦١م',
    },
    body: {
      en: `From his marriage to Fatima came four children — Hasan, Husayn, Zaynab, and Umm Kulthum. After Fatima's death he married again and had more children — among them Muhammad ibn al-Hanafiyya, named for the Prophet but distinguished from his elder brothers by the affectionate suffix referring to his mother's tribe.

**Hasan ibn Ali** — Born 625 CE. The eldest. Quiet, gentle, deeply learned. After Ali's death in 661, Hasan accepted the caliphate, then surrendered it within six months in a treaty with Mu'awiya to spare Muslim blood. He died at 47, traditionally said to have been poisoned. The Prophet had said of him as a boy: "This son of mine is a sayyid — perhaps God will make peace between two great parties of the Muslims through him."

**Husayn ibn Ali** — Born 626 CE. The younger. Fiery, principled, beloved. When Yazid succeeded Mu'awiya in 680 and demanded allegiance, Husayn refused. He rode toward Kufa with his family and a small band of companions. They were intercepted at Karbala. On 10 Muharram 61 AH, after the women and children had been denied water for three days, Husayn fought and was killed. He was 57. His sister Zaynab, taken prisoner with the surviving family members, became the voice that carried what happened across the empire.

**Zaynab bint Ali** — Born 627 CE. Granddaughter of the Prophet. Wife of Abdullah ibn Ja'far. After Karbala, she stood in the court of Yazid in Damascus and delivered a speech that has been studied for fourteen centuries as a model of dignified resistance. She is honoured especially by Shia Muslims, who refer to her as "the heroine of Karbala."

**Umm Kulthum bint Ali** — Born ~630 CE. Married to Umar ibn al-Khattab — a union that some historians have noted as a moment of reconciliation between the Prophet's family and the second Caliph. She died in Madinah.

The family of Ali and Fatima — the Ahl al-Bayt as the tradition has called them — became one of the central spiritual lineages in Islam.`,
      ar: `من زواجه بفاطمة جاء أبناؤه الأربعة — الحسن والحسين وزينب وأمّ كلثوم. وبعد وفاة فاطمة تزوّج مرّةً أخرى، فرُزق بأبناء آخرين — منهم محمّد بن الحنفية، سُمّي باسم النبيّ ونُسب إلى قبيلة أمّه تمييزاً له عن إخوته الأكبر.

**الحسن بن عليّ** — وُلد ٦٢٥م. الأكبر. هادئ، رقيق، عميق العلم. بعد وفاة عليّ سنة ٦٦١م، قَبِل الحسنُ الخلافة، ثمّ سلّمها في غضون ستّة أشهر بصلحٍ مع معاوية حقناً لدماء المسلمين. تُوفّي عن سبع وأربعين سنة، ويُقال تقليدياً إنّه سُمّ. قال النبيّ فيه وهو طفل: "إنّ ابني هذا سيّد، ولعلّ الله أن يُصلح به بين فئتين عظيمتين من المسلمين."

**الحسين بن عليّ** — وُلد ٦٢٦م. الأصغر. حماسيّ، صاحب مبدأ، محبوب. حين خلف يزيدُ معاويةَ سنة ٦٨٠م وطلب البيعة، رفض الحسين. وانطلق نحو الكوفة مع أهله وعصبةٍ صغيرة من أصحابه. اعترضوهم في كربلاء. وفي ١٠ محرّم ٦١هـ، بعد أن مُنع النساء والأطفال من الماء ثلاثة أيّام، قاتل الحسين وقُتل. وكان في السابعة والخمسين. أمّا أخته زينب، التي أُسرت مع من بقي من الأهل، فصارت الصوت الذي حمل ما جرى عبر الإمبراطورية.

**زينب بنت عليّ** — وُلدت ٦٢٧م. حفيدة النبيّ. زوج عبدالله بن جعفر. بعد كربلاء، وقفت في بلاط يزيد بدمشق وألقت خطبةً صارت تُدرَس عبر أربعة عشر قرناً نموذجاً لمقاومةٍ كريمة. ويُكرّمها الشيعة خاصّةً، ويُلقّبونها "بطلة كربلاء".

**أمّ كلثوم بنت عليّ** — وُلدت ~٦٣٠م. تزوّجت عمر بن الخطّاب — زيجةٌ أشار إليها بعض المؤرّخين على أنّها لحظة مصالحةٍ بين أهل بيت النبيّ والخليفة الثاني. تُوفّيت في المدينة.

صارت عائلة عليٍّ وفاطمة — "أهل البيت" كما سمّتهم التقليد — واحدةً من أهمّ السلاسل الروحيّة المركزيّة في الإسلام.`,
    },
  },

  {
    id: 'about-him',
    title: {
      en: 'What Has Been Said About Him',
      ar: 'ممّا قيل فيه',
    },
    dateline: { en: '7th century to today', ar: 'من القرن السابع إلى اليوم' },
    body: {
      en: `Across fourteen centuries, men and women from every tradition — Sunni, Shia, Sufi, Christian, secular — have written about Ali ibn Abi Talib. A few of the more striking witnesses:

**The Prophet Muhammad (peace be upon him), speaking of Ali:**
"You are to me as Aaron was to Moses — except that there is no prophet after me."
"I am the city of knowledge and Ali is its gate."

**Umar ibn al-Khattab, the second Caliph:**
"O Ali, may God not let me live to face a problem you are not there to solve."

**Jibran Khalil Jibran, the Christian Arab poet (20th century):**
"In my view, Ali was the first Arab to bind himself in conversation with the universal spirit. He sang life until his last breath, and was killed because his prayer was longer than what people could bear."

**Edward Gibbon, English historian (18th century):**
"The genius of Muhammad expired with himself; and the weakness of his successors was glaringly contrasted with the merit of Ali, whose courage, eloquence, and humanity were the qualities of a hero."

**Thomas Carlyle, Scottish historian (19th century):**
"As for this young Ali, one cannot but like him. A noble-minded creature... full of affection, of fiery daring. Something chivalrous in him; brave as a lion; yet with a grace, a truth and affection worthy of Christian knighthood."

**Sayyid Husayn Nasr, Muslim philosopher (21st century):**
"Imam Ali is a figure whose stature transcends sectarian boundaries. Sunni and Shia, mystic and scholar, jurist and poet — all return to him."

The point is not that any one witness is decisive. The point is that across cultures, traditions, and centuries, those who studied his life have found in it something they did not want to let go of.`,
      ar: `عبر أربعة عشر قرناً، كتب الرجال والنساء من كلّ تقليد — سنّيّ وشيعيّ وصوفيّ ومسيحيّ وعلمانيّ — في عليّ بن أبي طالب. ومن أبلغ الشهادات:

**النبيّ محمّد (صلّى الله عليه وآله) قال في عليّ:**
"أنتَ منّي بمنزلة هارون من موسى — إلا أنّه لا نبيّ بعدي."
"أنا مدينة العلم وعليٌّ بابها."

**عمر بن الخطّاب، الخليفة الثاني:**
"لا أبقاني الله لمعضلةٍ ليس فيها أبو الحسن."

**جبران خليل جبران، الشاعر العربيّ المسيحيّ (القرن العشرون):**
"في رأيي كان عليّ أوّل عربيّ ربط نفسه بحديث الروح الكلّيّة. غنّى الحياة حتّى آخر نَفَس، وقُتل لأنّ صلاته كانت أطول ممّا يحتمل الناس."

**إدوارد جيبون، المؤرّخ الإنجليزيّ (القرن الثامن عشر):**
"انطفأت عبقريّة محمّد بانطفائه؛ وكان ضعف خلفائه على تباينٍ صارخ مع فضل عليّ، الذي كانت شجاعته وفصاحته وإنسانيّته من صفات الأبطال."

**توماس كارلايل، المؤرّخ الإسكتلنديّ (القرن التاسع عشر):**
"أمّا هذا الفتى عليّ، فلا يسع المرء إلا أن يحبّه. مخلوقٌ نبيلٌ في تفكيره... مفعمٌ بالحبّ، عظيم الإقدام. فيه شيءٌ من الفروسيّة؛ شجاعٌ كأسد؛ وفيه مع ذلك رفقٌ وصدقٌ وحبّ يليق بالفروسيّة المسيحيّة."

**السيّد حسين نصر، الفيلسوف المسلم (القرن الحادي والعشرون):**
"الإمام عليّ شخصيّةٌ تتجاوز قامتُها الحدود الطائفيّة. السنّيّ والشيعيّ، والمتصوّف والعالم، والفقيه والشاعر — كلٌّ يعود إليه."

ليست النقطة أنّ شاهداً واحداً حاسم. النقطة أنّ مَن درسوا حياته عبر الثقافات والتقاليد والقرون وجدوا فيها شيئاً لم يريدوا أن يفلتوه.`,
    },
  },
]
