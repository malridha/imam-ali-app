// v45.2 — Baseline reference library baked into the system prompt.
//
// The Supabase corpus table is seeded with ~14 wisdom teachings but
// has no du'as and no poetry yet. v44 §56 calls for 13,000 enriched
// entries; until that content acquisition project completes, this
// file ships a curated minimum so the companion can deliver
// authentic du'as, supplementary wisdom, and a few Diwan poems when
// the user asks.
//
// All Arabic includes diacritics so ElevenLabs reads correctly.
// All English translations are faithful — not poeticised. Every
// entry has a source. The LLM is instructed (in unified.ts) to
// quote ONLY from this library or from retrieved RAG matches —
// never to fabricate.

export type BaselineEntry = {
  arabic: string
  english: string
  source: string
  /** Theme tag for the LLM to match against the user's situation */
  theme: string
}

// ── Du'as ──────────────────────────────────────────────────────────
// Short, universally-recognised supplications with strong attribution.
export const BASELINE_DUAS: BaselineEntry[] = [
  {
    arabic:
      'اللَّهُمَّ اغْفِرْ لِيَ الذُّنُوبَ الَّتِي تَهْتِكُ العِصَمَ، اللَّهُمَّ اغْفِرْ لِيَ الذُّنُوبَ الَّتِي تُنْزِلُ النِّقَمَ، اللَّهُمَّ اغْفِرْ لِيَ الذُّنُوبَ الَّتِي تُغَيِّرُ النِّعَمَ',
    english:
      "O God, forgive me the sins that tear away protections; O God, forgive me the sins that bring down calamities; O God, forgive me the sins that change blessings.",
    source: "Du'a Kumayl (taught to Kumayl ibn Ziyad)",
    theme: 'forgiveness, repentance, when carrying shame or guilt',
  },
  {
    arabic:
      'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    english:
      'Our Lord, give us in this world good, and in the next world good, and protect us from the fire.',
    source: "Qur'an, 2:201",
    theme: 'general, when wanting a complete prayer for both lives',
  },
  {
    arabic:
      'اللَّهُمَّ إِنِّي أَسْأَلُكَ رِضَاكَ وَالجَنَّةَ، وَأَعُوذُ بِكَ مِنْ سَخَطِكَ وَالنَّارِ',
    english:
      'O God, I ask You for Your pleasure and for Paradise, and I take refuge in You from Your displeasure and from the Fire.',
    source: "Authenticated hadith (al-Nasa'i)",
    theme: 'universal, simple, when wanting a short complete prayer',
  },
  {
    arabic:
      'اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الحَزْنَ إِذَا شِئْتَ سَهْلًا',
    english:
      'O God, nothing is easy except what You make easy, and You make the difficult — when You wish — easy.',
    source: "Authenticated hadith (Ibn Hibban)",
    theme: 'when carrying difficulty, when stuck, when overwhelmed',
  },
  {
    arabic:
      'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ',
    english:
      'O Living, O Sustaining — by Your mercy I seek help. Set right for me all of my affairs, and do not entrust me to myself for the blink of an eye.',
    source: "Authenticated hadith (al-Nasa'i, al-Hakim)",
    theme: 'when feeling alone, when needing strength, when in distress',
  },
  {
    arabic:
      'اللَّهُمَّ اجْعَلْ خَيْرَ عُمْرِي آخِرَهُ، وَخَيْرَ عَمَلِي خَوَاتِيمَهُ، وَخَيْرَ أَيَّامِي يَوْمَ أَلْقَاكَ فِيهِ',
    english:
      'O God, make the best of my life its end, and the best of my deeds their conclusions, and the best of my days the day I meet You.',
    source: "Authenticated hadith (al-Tabarani)",
    theme: 'when reflecting on time, on growing older, on the long view',
  },
  {
    arabic:
      'اللَّهُمَّ إِنِّي أَسْأَلُكَ الهُدَى وَالتُّقَى وَالعَفَافَ وَالغِنَى',
    english:
      'O God, I ask You for guidance, mindfulness, purity, and self-sufficiency.',
    source: "Authenticated hadith (Muslim)",
    theme: 'morning, evening, daily intention',
  },
  {
    arabic:
      'إِلَهِي هَبْ لِي كَمَالَ الانْقِطَاعِ إِلَيْكَ، وَأَنِرْ أَبْصَارَ قُلُوبِنَا بِضِيَاءِ نَظَرِهَا إِلَيْكَ',
    english:
      'O my God, grant me the perfection of devoting myself wholly to You, and illuminate the eyes of our hearts with the light of their gaze upon You.',
    source: "Munajat al-Sha'baniyya, traditionally attributed to Imam Ali (عليه السلام)",
    theme: 'on intimacy with God, on the inner journey, on prayer',
  },
  {
    arabic:
      'يَا مَنْ يَمْلِكُ حَوَائِجَ السَّائِلِينَ، يَا مَنْ يَعْلَمُ ضَمِيرَ الصَّامِتِينَ، صَلِّ عَلَى مُحَمَّدٍ وَآلِهِ، وَاسْتَجِبْ لِي دُعَائِي',
    english:
      'O You who holds the needs of those who ask, O You who knows the silent thoughts within, bless Muhammad and his family, and answer my prayer.',
    source: "Du'a al-Sabah (Morning Supplication), traditionally attributed to Imam Ali (عليه السلام)",
    theme: 'morning, when needing to be heard, when carrying silent things',
  },
  {
    arabic:
      'اللَّهُمَّ ارْزُقْنِي قَلْبًا تَقِيًّا نَقِيًّا، مِنَ الشِّرْكِ بَرِيًّا، لَا كَافِرًا وَلَا شَقِيًّا',
    english:
      'O God, provide me a heart mindful and pure — free of any partner ascribed to You, neither denying nor wretched.',
    source: "Du'a Yastashir excerpt, traditionally attributed to Imam Ali (عليه السلام)",
    theme: 'on the heart, on sincerity, on inner cleanliness',
  },
  {
    arabic:
      'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الهَمِّ وَالحَزَنِ، وَأَعُوذُ بِكَ مِنَ العَجْزِ وَالكَسَلِ، وَأَعُوذُ بِكَ مِنَ الجُبْنِ وَالبُخْلِ',
    english:
      'O God, I take refuge in You from anxiety and grief, and I take refuge in You from weakness and idleness, and I take refuge in You from cowardice and miserliness.',
    source: "Authenticated hadith (al-Bukhari)",
    theme: 'when carrying anxiety, when stuck, when afraid',
  },
  {
    arabic:
      'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ، عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ العَرْشِ العَظِيمِ',
    english:
      'Sufficient for me is God — there is no god but Him. On Him I rely, and He is the Lord of the great throne.',
    source: "Qur'an, 9:129",
    theme: 'when worn out, when overwhelmed, as a quiet shield',
  },
  {
    arabic:
      'اللَّهُمَّ أَصْلِحْ لِي دِينِيَ الَّذِي هُوَ عِصْمَةُ أَمْرِي، وَأَصْلِحْ لِي دُنْيَايَ الَّتِي فِيهَا مَعَاشِي، وَأَصْلِحْ لِي آخِرَتِيَ الَّتِي إِلَيْهَا مَعَادِي',
    english:
      'O God, set right for me my faith, which is the safeguard of my affairs. Set right for me my worldly life, in which I live. Set right for me my next life, to which I return.',
    source: "Authenticated hadith (Muslim)",
    theme: 'when wanting wholeness, when carrying many roles at once',
  },
  {
    arabic:
      'رَبِّ اشْرَحْ لِي صَدْرِي، وَيَسِّرْ لِي أَمْرِي، وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي، يَفْقَهُوا قَوْلِي',
    english:
      'My Lord, expand my chest, ease my task, and untie the knot of my tongue so they may understand what I say.',
    source: "Qur'an, 20:25-28 — the prayer of Musa (peace be upon him)",
    theme: 'before a difficult conversation, before speaking up, before clarity is needed',
  },
  // ── v46.1 corpus expansion · authentic du'as ───────────────────
  {
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ',
    english: 'All praise is for God, by whose blessing all good things are completed.',
    source: 'Authenticated hadith (Ibn Majah, 3803)',
    theme: 'when something good has arrived, gratitude, after receiving a blessing',
  },
  {
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    english: 'In Your name, O God, I die and I live.',
    source: 'Authenticated hadith (al-Bukhari, 6324)',
    theme: 'before sleeping, at night, settling into rest',
  },
  {
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    english: 'All praise is for God who gave us life after He had caused us to die, and to Him is the resurrection.',
    source: 'Authenticated hadith (al-Bukhari, 6325)',
    theme: 'upon waking, morning, beginning the day',
  },
  {
    arabic:
      'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ',
    english:
      'O God, we ask You on this journey of ours for righteousness and piety, and for deeds that please You. O God, make this journey easy for us and fold up its distance.',
    source: 'Authenticated hadith (Muslim, 1342)',
    theme: 'before travel, setting out on a journey, leaving home',
  },
  {
    arabic:
      'اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَأْسَ، اشْفِ أَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا',
    english:
      'O God, Lord of mankind, remove the affliction and cure, for You are the Healer. There is no cure but Your cure, a cure that leaves no illness behind.',
    source: 'Authenticated hadith (al-Bukhari, 5743; Muslim, 2191)',
    theme: 'when ill, visiting the sick, praying for healing',
  },
  {
    arabic:
      'اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ، وَعَافِهِ وَاعْفُ عَنْهُ، وَأَكْرِمْ نُزُلَهُ، وَوَسِّعْ مُدْخَلَهُ، وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ',
    english:
      'O God, forgive him and have mercy on him, give him strength and pardon him. Be generous to him, cause his entrance to be wide, and wash him with water, snow, and hail.',
    source: 'Authenticated hadith (Muslim, 963)',
    theme: 'for the deceased, at a funeral, remembering someone who has died',
  },
  {
    arabic: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    english: 'My Lord, have mercy upon them as they raised me when I was small.',
    source: "Qur'an, 17:24",
    theme: "for one's parents, when missing a parent, in gratitude for being raised",
  },
  {
    arabic:
      'اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ',
    english:
      'O God, suffice me with what You have made lawful so I have no need for what You have forbidden, and enrich me with Your grace so I have no need for anyone besides You.',
    source: 'Authenticated hadith (al-Tirmidhi, 3563)',
    theme: 'worry about provision, financial anxiety, seeking rizq with integrity',
  },
  {
    arabic:
      'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ جَهْدِ الْبَلَاءِ، وَدَرَكِ الشَّقَاءِ، وَسُوءِ الْقَضَاءِ، وَشَمَاتَةِ الْأَعْدَاءِ',
    english:
      'O God, I take refuge in You from the severity of affliction, from being overtaken by misery, from an evil decree, and from the gloating of enemies.',
    source: 'Authenticated hadith (al-Bukhari, 6347; Muslim, 2707)',
    theme: 'when overwhelmed, when fearful, in times of hardship',
  },
  {
    arabic:
      'اَلْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    english:
      'Praise belongs to God who gave us life after having caused us to die, and to Him is the resurrection.',
    source: 'Sahih al-Bukhari, 6312',
    theme: 'upon waking from sleep, first words of the morning, gratitude for a new day',
  },
  {
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    english: 'In Your name, O God, I die and I live.',
    source: 'Sahih al-Bukhari, 6324',
    theme: 'before sleeping, lying down at night, surrendering the day',
  },
  {
    arabic: 'اللَّهُمَّ بِاسْمِكَ أَحْيَا وَبِاسْمِكَ أَمُوتُ',
    english: 'O God, in Your name I live and in Your name I die.',
    source: 'Sahih al-Bukhari, 6325',
    theme: 'upon waking, beginning the day in God\'s name',
  },
  {
    arabic:
      'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    english:
      'In the name of God, I place my trust in God, and there is no power nor strength except by God.',
    source: 'Sunan Abi Dawud, 5095; Sunan al-Tirmidhi, 3426',
    theme: 'leaving the home, stepping out into the day, before any errand',
  },
  {
    arabic:
      'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أَضِلَّ أَوْ أُضَلَّ، أَوْ أَزِلَّ أَوْ أُزَلَّ، أَوْ أَظْلِمَ أَوْ أُظْلَمَ، أَوْ أَجْهَلَ أَوْ يُجْهَلَ عَلَيَّ',
    english:
      'O God, I seek refuge in You lest I stray or be led astray, lest I slip or be made to slip, lest I wrong or be wronged, lest I act ignorantly or have ignorance shown toward me.',
    source: 'Sunan Abi Dawud, 5094; Sunan al-Tirmidhi, 3427',
    theme: 'leaving the home, going out among people, guarding one\'s conduct',
  },
  {
    arabic:
      'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
    english:
      'In the name of God we enter, in the name of God we leave, and upon God, our Lord, we rely.',
    source: 'Sunan Abi Dawud, 5096',
    theme: 'entering one\'s home, returning at the end of the day, crossing the threshold',
  },
  {
    arabic:
      'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ',
    english:
      'O God, I seek refuge in You from anxiety and sorrow, from incapacity and laziness, from cowardice and miserliness, from the burden of debt and being overpowered by men.',
    source: 'Sahih al-Bukhari, 6369',
    theme: 'when worried, weighed down by anxiety, in financial strain, feeling powerless',
  },
  {
    arabic:
      'لَا إِلَٰهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَٰهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَٰهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ',
    english:
      'There is no god but God, the Magnificent, the Forbearing. There is no god but God, Lord of the Mighty Throne. There is no god but God, Lord of the heavens and Lord of the earth and Lord of the Noble Throne.',
    source: 'Sahih al-Bukhari, 6346; Sahih Muslim, 2730',
    theme: 'in distress, when overwhelmed by a crisis, the supplication of hardship',
  },
  {
    arabic:
      'اَلْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَٰذَا الثَّوْبَ وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
    english:
      'Praise belongs to God who has clothed me with this garment and provided it to me without any power or strength of my own.',
    source: 'Sunan Abi Dawud, 4023; Sunan al-Tirmidhi, 3458',
    theme: 'when wearing new clothes, upon putting on a fresh garment, gratitude for provision',
  },
  {
    arabic:
      'اَللَّهُ أَكْبَرُ، اَللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالْإِيمَانِ، وَالسَّلَامَةِ وَالْإِسْلَامِ، وَالتَّوْفِيقِ لِمَا تُحِبُّ وَتَرْضَىٰ، رَبِّي وَرَبُّكَ اللَّهُ',
    english:
      'God is greatest. O God, let this crescent rise upon us with safety and faith, with well-being and submission, and with success in what You love and are pleased with. My Lord and your Lord is God.',
    source: 'Sunan al-Tirmidhi, 3451',
    theme: 'upon sighting the new moon, the start of a new lunar month, monthly renewal',
  },
  {
    arabic:
      'اَللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَٰذَا الْبِرَّ وَالتَّقْوَىٰ، وَمِنَ الْعَمَلِ مَا تَرْضَىٰ، اَللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَٰذَا وَاطْوِ عَنَّا بُعْدَهُ، اَللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ وَالْخَلِيفَةُ فِي الْأَهْلِ',
    english:
      'O God, we ask You on this our journey for righteousness and God-consciousness, and for deeds that please You. O God, make easy for us this journey of ours and fold up its distance. O God, You are the Companion on the journey and the Successor over the family.',
    source: 'Sahih Muslim, 1342',
    theme: 'when traveling, setting out on a trip, beginning a journey',
  },
  {
    arabic: 'بِسْمِ اللَّهِ وَعَلَىٰ بَرَكَةِ اللَّهِ',
    english: 'In the name of God, and upon the blessing of God.',
    source: 'al-Kafi, vol. 6, Kitab al-At\'ima',
    theme: 'before eating, beginning a meal, sitting down at the table',
  },
  {
    arabic:
      'اَلْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مِنَ الْمُسْلِمِينَ',
    english:
      'Praise belongs to God who has fed us and given us drink, and made us among those who submit to Him.',
    source: 'Sunan Abi Dawud, 3850; Sunan al-Tirmidhi, 3457',
    theme: 'after finishing a meal, gratitude for food and drink',
  },
  {
    arabic:
      'اَللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَآلِ مُحَمَّدٍ، وَبَلِّغْنِي فِيهِ أَفْضَلَ مَا تُبَلِّغُ عِبَادَكَ الصَّالِحِينَ، وَبَلِّغْ بِي أَفْضَلَ آمَالِي بِرَحْمَتِكَ يَا أَرْحَمَ الرَّاحِمِينَ',
    english:
      'O God, send blessings upon Muhammad and the family of Muhammad, and convey me in this day to the best of what You convey Your righteous servants to, and bring me to the best of my hopes, by Your mercy, O Most Merciful of the merciful.',
    source: 'al-Sahifa al-Sajjadiyya, du\'a 6 (the morning and evening supplication)',
    theme: 'morning adhkar, beginning the day, asking for a noble day ahead',
  },
  // ── Hereafter, death, repentance ────────────────────────────────
  {
    arabic:
      'اَللَّهُمَّ اغْفِرْ لِيَ الذُّنُوبَ الَّتِي تَحْبِسُ الدُّعَاءَ',
    english:
      "O God, forgive me the sins that hold back supplication.",
    source: "Du'a Kumayl (taught to Kumayl ibn Ziyad)",
    theme: 'repentance, when feeling du\'as are unanswered, removing what blocks prayer',
  },
  {
    arabic:
      'اَللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، وَمِنْ عَذَابِ النَّارِ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ، وَمِنْ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ',
    english:
      'O God, I seek refuge in You from the punishment of the grave, from the punishment of the Fire, from the trial of life and death, and from the trial of the False Messiah.',
    source: 'Sahih al-Bukhari, 1377; Sahih Muslim, 588',
    theme: 'seeking refuge from the punishment of the grave, from the trials of death',
  },
  {
    arabic:
      'اَللَّهُمَّ ارْحَمْنِي إِذَا انْقَطَعَ مِنَ الدُّنْيَا أَثَرِي، وَامَّحَى مِنَ الْمَخْلُوقِينَ ذِكْرِي، وَكُنْتُ مِنَ الْمَنْسِيِّينَ كَمَنْ قَدْ نُسِيَ',
    english:
      'O God, have mercy on me when my trace is cut off from this world, my mention is erased from creatures, and I am among the forgotten as one already forgotten.',
    source: "al-Sahifa al-Sajjadiyya, du'a 22 (in hardship)",
    theme: 'asking for mercy in the grave, after being forgotten by the living',
  },
  {
    arabic:
      'يَا مَنْ يَقْبَلُ الْيَسِيرَ، وَيَعْفُو عَنِ الْكَثِيرِ، اقْبَلْ مِنِّي الْيَسِيرَ، وَاعْفُ عَنِّي الْكَثِيرَ، إِنَّكَ أَنْتَ الْعَفُوُّ الْغَفُورُ',
    english:
      'O You who accepts the little and pardons much, accept from me the little and pardon me the much. Truly You are the Oft-Pardoning, the Oft-Forgiving.',
    source: 'Mafatih al-Jinan (du\'a of the nights of Ramadan); al-Kafi vol. 4',
    theme: 'sincere repentance, hope in pardon despite few good deeds and many sins',
  },
  {
    arabic:
      'اَللَّهُمَّ إِنِّي أَسْأَلُكَ الثَّبَاتَ فِي الْأَمْرِ، وَالْعَزِيمَةَ عَلَى الرُّشْدِ، وَأَسْأَلُكَ شُكْرَ نِعْمَتِكَ، وَحُسْنَ عِبَادَتِكَ، وَأَسْأَلُكَ قَلْبًا سَلِيمًا وَلِسَانًا صَادِقًا',
    english:
      'O God, I ask You for steadfastness in the matter, resolve toward right guidance; I ask You for gratitude for Your blessing and excellence in Your worship; and I ask You for a sound heart and a truthful tongue.',
    source: "Sunan al-Nasa'i, 1304; al-Tirmidhi, 3407",
    theme: 'asking for a sound heart to meet God with, steadfastness until death',
  },
  {
    arabic:
      'إِلَهِي تَرَى حَالِي وَفَقْرِي وَفَاقَتِي وَمَسْكَنَتِي، وَأَنْتَ أَعْلَمُ بِسَرِيرَتِي مِنِّي، وَأَخْبَرُ بِمَا فِي ضَمِيرِي، وَلَا يَخْفَى عَلَيْكَ أَمْرُ مُنْقَلَبِي وَمَثْوَايَ',
    english:
      'My God, You see my state, my poverty, my destitution, and my lowliness. You know my inmost secret better than I do, and You are more aware of what is in my conscience. The matter of my returning and my final abode is not hidden from You.',
    source: 'Du\'a Abu Hamza al-Thumali (Imam al-Sajjad), Mafatih al-Jinan',
    theme: 'humble confession before death and the return to God',
  },
  {
    arabic:
      'اَللَّهُمَّ هَوِّنْ عَلَيَّ سَكَرَاتِ الْمَوْتِ، وَاجْعَلْهُ لِي رَاحَةً وَبُشْرَى، يَا أَرْحَمَ الرَّاحِمِينَ',
    english:
      'O God, ease for me the agonies of death, and make it for me a relief and glad tidings, O Most Merciful of the merciful.',
    source: "Mafatih al-Jinan — du'as of the dying; cf. al-Kafi vol. 3, Kitab al-Jana'iz",
    theme: 'asking for ease at the moment of death, relief during sakarāt al-mawt',
  },
  {
    arabic:
      'اَللَّهُمَّ اخْتِمْ لِي بِالسَّعَادَةِ، وَحَقِّقْ رَجَائِي فِي الرَّحْمَةِ، وَسَهِّلْ لِي سَبِيلَ الْعُبُودِيَّةِ، وَاحْشُرْنِي فِي زُمْرَةِ مُحَمَّدٍ وَآلِهِ',
    english:
      'O God, seal my life with felicity, realize my hope in Your mercy, ease for me the path of servanthood, and gather me among the company of Muhammad and his family.',
    source: "al-Sahifa al-Sajjadiyya, du'a 20 (Makarim al-Akhlaq)",
    theme: 'asking to be sealed with felicity (ḥusn al-khātima)',
  },
  {
    arabic:
      'اَللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ نَفْسٍ لَا تَشْبَعُ، وَمِنْ قَلْبٍ لَا يَخْشَعُ، وَمِنْ عِلْمٍ لَا يَنْفَعُ، وَمِنْ دُعَاءٍ لَا يُسْمَعُ',
    english:
      'O God, I seek refuge in You from a soul that is never satisfied, from a heart that does not feel awe, from knowledge that does not benefit, and from a supplication that is not heard.',
    source: 'Sahih Muslim, 2722',
    theme: 'seeking refuge from a hardened heart, asking for sincerity before the grave',
  },
  {
    arabic:
      'إِلَهِي إِنْ كُنْتُ غَيْرَ مُسْتَأْهِلٍ لِرَحْمَتِكَ، فَأَنْتَ أَهْلٌ أَنْ تَجُودَ عَلَيَّ بِفَضْلِ سَعَتِكَ',
    english:
      'My God, even if I am not worthy of Your mercy, You are worthy of bestowing upon me out of the bounty of Your vastness.',
    source: "Du'a Kumayl (from Imam Ali), Mafatih al-Jinan",
    theme: "hope in God's mercy despite unworthiness, repentance from grave sins",
  },
  {
    arabic:
      'اَللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ، وَآنِسْ فِي الْقَبْرِ وَحْشَتِي، وَاجْعَلْ لِي عِنْدَكَ عَهْدًا يَوْمَ أَلْقَاكَ مَنْشُورًا',
    english:
      'O God, send blessings upon Muhammad and the family of Muhammad, console my loneliness in the grave, and grant me with You a covenant unfolded on the day I meet You.',
    source: "Mafatih al-Jinan — du'a Adila and ta'qibat of the dying",
    theme: 'asking for companionship in the grave, easing the terror of the barzakh',
  },
  {
    arabic:
      'اَللَّهُمَّ إِنَّكَ أَمَرْتَ بِالدُّعَاءِ، وَتَكَفَّلْتَ بِالْإِجَابَةِ، فَيَا مَنْ أَمَرَ بِالدُّعَاءِ وَوَعَدَ بِالْإِجَابَةِ، صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ، وَالْقَنِي يَوْمَ أَلْقَاكَ وَقَدْ غَفَرْتَ لِي وَلِوَالِدَيَّ وَلِجَمِيعِ الْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ',
    english:
      'O God, You have commanded supplication and taken upon Yourself the answer. So, O You who commanded du\'a and promised response, send blessings upon Muhammad and the family of Muhammad, and let me meet You on the day I meet You having already forgiven me, my parents, and all the believing men and women.',
    source: 'Du\'a al-Iftitah, Mafatih al-Jinan',
    theme: 'asking for comprehensive forgiveness before meeting God',
  },
  {
    arabic:
      'يَا مَنْ أَرْجُوهُ لِكُلِّ خَيْرٍ، وَآمَنُ سَخَطَهُ عِنْدَ كُلِّ شَرٍّ، يَا مَنْ يُعْطِي الْكَثِيرَ بِالْقَلِيلِ، اغْفِرْ لِي ذُنُوبِي كُلَّهَا، صَغِيرَهَا وَكَبِيرَهَا، أَوَّلَهَا وَآخِرَهَا، عَلَانِيَتَهَا وَسِرَّهَا',
    english:
      'O You whom I hope for every good, and from whose wrath I seek safety against every evil; O You who gives much in return for little — forgive me all my sins: the small and the great, the first and the last, the open and the hidden.',
    source: 'Du\'a al-Mashlul (al-Shabb al-Mashlul, from Imam Ali); Mafatih al-Jinan',
    theme: 'comprehensive repentance for all sins, hope before the grave',
  },
  // ── Medium-length passages for quiet reading ────────────────────
  {
    arabic:
      'إِلَهِي لَا تُؤَدِّبْنِي بِعُقُوبَتِكَ\nوَلَا تَمْكُرْ بِي فِي حِيلَتِكَ\nمِنْ أَيْنَ لِيَ الْخَيْرُ يَا رَبِّ وَلَا يُوجَدُ إِلَّا مِنْ عِنْدِكَ\nوَمِنْ أَيْنَ لِيَ النَّجَاةُ وَلَا تُسْتَطَاعُ إِلَّا بِكَ\nلَا الَّذِي أَحْسَنَ اسْتَغْنَى عَنْ عَوْنِكَ وَرَحْمَتِكَ\nوَلَا الَّذِي أَسَاءَ وَاجْتَرَأَ عَلَيْكَ وَلَمْ يُرْضِكَ خَرَجَ عَنْ قُدْرَتِكَ',
    english:
      'My God, do not discipline me with Your punishment,\nand do not scheme against me through Your stratagem.\nFrom where shall I attain good, my Lord, when it is found nowhere but with You?\nFrom where shall I find deliverance, when it cannot be reached except through You?\nNeither the one who has done well can dispense with Your aid and mercy,\nnor the one who has done evil and dared against You can escape Your power.',
    source: "Du'a Kumayl (from Imam Ali, taught to Kumayl ibn Ziyad)",
    theme: 'on utter dependence on God, on humility before His power, for quiet reading',
  },
  {
    arabic:
      'يَا إِلَهِي وَسَيِّدِي وَمَوْلَايَ وَرَبِّي\nصَبَرْتُ عَلَى عَذَابِكَ فَكَيْفَ أَصْبِرُ عَلَى فِرَاقِكَ\nوَصَبَرْتُ عَلَى حَرِّ نَارِكَ فَكَيْفَ أَصْبِرُ عَنِ النَّظَرِ إِلَى كَرَامَتِكَ\nأَمْ كَيْفَ أَسْكُنُ فِي النَّارِ وَرَجَائِي عَفْوُكَ',
    english:
      'O my God, my Master, my Protector, my Lord —\nsuppose I am able to endure Your chastisement: how shall I endure separation from You?\nSuppose I can endure the heat of Your fire: how shall I endure being kept from gazing upon Your generosity?\nOr how shall I dwell in the Fire while my hope is Your pardon?',
    source: "Du'a Kumayl (from Imam Ali)",
    theme: 'on longing for God, on what hell truly is, for quiet reading',
  },
  {
    arabic:
      'اَللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِهِ\nوَحَلِّنِي بِحِلْيَةِ الصَّالِحِينَ\nوَأَلْبِسْنِي زِينَةَ الْمُتَّقِينَ\nفِي بَسْطِ الْعَدْلِ وَكَظْمِ الْغَيْظِ وَإِطْفَاءِ النَّائِرَةِ\nوَضَمِّ أَهْلِ الْفُرْقَةِ وَإِصْلَاحِ ذَاتِ الْبَيْنِ\nوَإِفْشَاءِ الْعَارِفَةِ وَسَتْرِ الْعَائِبَةِ',
    english:
      'O God, bless Muhammad and his family,\nadorn me with the adornment of the righteous,\nand clothe me with the ornaments of the God-wary —\nin spreading justice, restraining rage, and quenching the flames of hostility,\nin bringing together the people of division and reconciling those at odds,\nin spreading kindness and concealing faults.',
    source: "al-Sahifa al-Sajjadiyya, du'a 20 (Makarim al-Akhlaq)",
    theme: 'on noble character, on what to ask to become, for quiet reading',
  },
  {
    arabic:
      'اَللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِهِ\nوَاجْعَلْنِي أَصُولُ بِكَ عِنْدَ الضَّرُورَةِ\nوَأَسْأَلُكَ عِنْدَ الْحَاجَةِ\nوَأَتَضَرَّعُ إِلَيْكَ عِنْدَ الْمَسْكَنَةِ\nوَلَا تَفْتِنِّي بِالِاسْتِعَانَةِ بِغَيْرِكَ إِذَا اضْطُرِرْتُ\nوَلَا بِالْخُضُوعِ لِسُؤَالِ غَيْرِكَ إِذَا افْتَقَرْتُ',
    english:
      'O God, bless Muhammad and his family,\nand make me strike out with You at the time of necessity,\nask of You at the time of need,\nand plead before You in poverty.\nDo not try me by seeking help from any but You when I am driven to extremity,\nnor by humbling myself in asking from other than You when I fall into want.',
    source: "al-Sahifa al-Sajjadiyya, du'a 20 (Makarim al-Akhlaq)",
    theme: 'on trust in God alone, on dignity in need, for quiet reading',
  },
  {
    arabic:
      'إِلَهِي لَوْ بَكَيْتُ إِلَيْكَ حَتَّى تَسْقُطَ أَشْفَارُ عَيْنَيَّ\nوَانْتَحَبْتُ حَتَّى يَنْقَطِعَ صَوْتِي\nوَقُمْتُ لَكَ حَتَّى تَتَنَشَّرَ قَدَمَايَ\nوَرَكَعْتُ لَكَ حَتَّى يَنْخَلِعَ صُلْبِي\nوَسَجَدْتُ لَكَ حَتَّى تَتَفَقَّأَ حَدَقَتَايَ\nمَا اسْتَوْجَبْتُ بِذَلِكَ مَحْوَ سَيِّئَةٍ وَاحِدَةٍ مِنْ سَيِّئَاتِي',
    english:
      'My God, were I to weep to You until my eyelashes fell off,\nand to sob until my voice was cut off,\nand to stand for You until my feet swelled,\nand to bow to You until my backbone was dislocated,\nand to prostrate to You until my eyeballs burst from their sockets —\nI would not deserve thereby the erasure of a single one of my evil deeds.',
    source: "Du'a Abu Hamza al-Thumali (from Imam al-Sajjad)",
    theme: 'on the inadequacy of our repentance against the height of His pardon, for quiet reading',
  },
  {
    arabic:
      'إِلَهِي إِنَّكَ تَعْلَمُ مَا يُصْلِحُنِي مِنْ أَمْرِ دُنْيَايَ وَآخِرَتِي\nفَكُنْ بِحَوَائِجِي حَفِيًّا\nيَا سَيِّدِي يَا مَنْ بِذِكْرِهِ يَسْتَأْنِسُ الْمُحِبُّونَ\nوَإِلَى مُنَاجَاتِهِ يَفْزَعُ الْمُذْنِبُونَ\nوَبِذِكْرِهِ تَلَذَّذَ الذَّاكِرُونَ',
    english:
      'My God, You know what sets right my affair in this world and the next —\nso be gracious to my needs.\nO my Master, O You by whose remembrance the lovers find their solace,\nto whose intimate discourse the sinful flee,\nand in whose remembrance those who remember find their delight.',
    source: "Du'a Abu Hamza al-Thumali (from Imam al-Sajjad)",
    theme: 'on intimacy with God, on the comfort of dhikr, for quiet reading',
  },
  {
    arabic:
      'إِلَهِي مَنْ ذَا الَّذِي ذَاقَ حَلَاوَةَ مَحَبَّتِكَ فَرَامَ مِنْكَ بَدَلًا\nوَمَنْ ذَا الَّذِي أَنِسَ بِقُرْبِكَ فَابْتَغَى عَنْكَ حِوَلًا\nإِلَهِي فَاجْعَلْنَا مِمَّنِ اصْطَفَيْتَهُ لِقُرْبِكَ وَوِلَايَتِكَ\nوَأَخْلَصْتَهُ لِوُدِّكَ وَمَحَبَّتِكَ\nوَشَوَّقْتَهُ إِلَى لِقَائِكَ',
    english:
      'My God, who is it that has tasted the sweetness of Your love and then sought another in Your place?\nWho is it that has grown intimate with Your nearness and then sought to turn away from You?\nMy God, place us among those whom You have chosen for Your nearness and Your friendship,\nwhom You have made sincere for Your affection and Your love,\nand whom You have made to long for the meeting with You.',
    source: "al-Munajat al-Khamsa 'Ashara — Munajat al-Muhibbin (from Imam al-Sajjad)",
    theme: 'on divine love, on longing for the meeting, for quiet reading',
  },
  {
    arabic:
      'إِلَهِي قَصَدْتُ بَابَكَ قَاصِدًا\nوَنَزَلْتُ بِفِنَائِكَ مُسْتَكِينًا\nوَسَأَلْتُكَ مَسْأَلَةَ الْحَقِيرِ الذَّلِيلِ الْبَائِسِ الْفَقِيرِ\nالْخَائِفِ الْمُسْتَجِيرِ\nوَمَعَ ذَلِكَ مُسْتَحْيٍ مِنْ سُؤَالِي إِيَّاكَ\nوَمُسْتَجِيرٍ بِفَضْلِكَ مِنَ الِاتِّكَالِ عَلَى عَمَلِي',
    english:
      'My God, I have come on purpose to Your door,\nand alighted at Your courtyard in lowliness.\nI ask of You the asking of the contemptible, the abased, the wretched, the poor —\nthe fearful one seeking refuge —\nyet ashamed of my asking of You,\nand seeking sanctuary in Your bounty from reliance upon my own works.',
    source: "al-Munajat al-Khamsa 'Ashara — Munajat al-Raghibin (from Imam al-Sajjad)",
    theme: 'on humility before God, on not relying on one\'s own works, for quiet reading',
  },
  {
    arabic:
      'اَللَّهُمَّ إِنِّي أَسْأَلُكَ التَّوْفِيقَ لِمَا تُحِبُّ وَتَرْضَى\nمِنَ التَّوْبَةِ النَّصُوحِ\nالَّتِي لَا يَكُونُ بَعْدَهَا إِلْمَامٌ بِذَنْبٍ\nوَلَا مُعَاوَدَةٌ لِخَطِيئَةٍ\nمُوجِبَةٍ لِغُفْرَانِ مَا سَلَفَ\nوَالسَّلَامَةِ فِيمَا بَقِيَ',
    english:
      'O God, I ask of You the granting of success in what You love and are pleased with —\nthe sincere repentance\nafter which there is no inclination toward sin\nand no return to wrongdoing,\nrepentance that necessitates the forgiveness of what is past\nand safety in what remains.',
    source: "al-Sahifa al-Sajjadiyya, du'a 31 (on seeking forgiveness)",
    theme: 'on sincere repentance, on tawba naṣūḥ, for quiet reading',
  },
  // ── Protection, family, refuge ──────────────────────────────────
  {
    arabic:
      'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    english:
      'Our Lord, grant us from our spouses and offspring coolness of the eyes, and make us a leader for the God-conscious.',
    source: "Qur'an, 25:74",
    theme: "du'a for spouse and offspring, asking for a righteous family",
  },
  {
    arabic:
      'رَبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ، وَأَعُوذُ بِكَ رَبِّ أَنْ يَحْضُرُونِ',
    english:
      'My Lord, I seek refuge in You from the whisperings of the devils, and I seek refuge in You, my Lord, lest they be present with me.',
    source: "Qur'an, 23:97-98",
    theme: 'seeking refuge from satanic whispers, against waswasa',
  },
  {
    arabic:
      'اَللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَأْسَ، اشْفِ أَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا',
    english:
      'O God, Lord of mankind, remove the harm and heal — You are the Healer; there is no healing but Your healing — a healing that leaves no illness behind.',
    source: 'Sahih al-Bukhari, 5743; Sahih Muslim, 2191',
    theme: "du'a for family during illness, asking for cure",
  },
  {
    arabic:
      'أُعِيذُكُمَا بِكَلِمَاتِ اللَّهِ التَّامَّةِ، مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ',
    english:
      "I place you both under the protection of the perfect words of God from every devil, every venomous creature, and every envious eye.",
    source: "Sahih al-Bukhari, 3371 (the Prophet's du'a for al-Hasan and al-Husayn)",
    theme: "parent's du'a for their child, protection from the evil eye",
  },
  {
    arabic:
      'بِاسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ، وَهُوَ السَّمِيعُ الْعَلِيمُ',
    english:
      'In the name of God, with whose name nothing in the earth or the heaven can cause harm — and He is the All-Hearing, the All-Knowing.',
    source: "Sunan Abi Dawud, 5088; al-Tirmidhi, 3388",
    theme: 'protection from harm, daily refuge',
  },
  {
    arabic:
      'اَللَّهُمَّ إِذَا أَرَدْتَ بِقَوْمٍ فِتْنَةً فَاقْبِضْنِي إِلَيْكَ غَيْرَ مَفْتُونٍ',
    english:
      'O God, when You will a trial upon a people, take me unto You uncorrupted by the trial.',
    source: "al-Tirmidhi, 3233",
    theme: 'refuge from the trial of community, asking for an uncorrupted death',
  },
  {
    arabic:
      'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي، رَبَّنَا وَتَقَبَّلْ دُعَاءِ، رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ',
    english:
      'My Lord, make me an establisher of prayer, and from my offspring. Our Lord, accept my supplication. Our Lord, forgive me and my parents and the believers on the Day the account is established.',
    source: "Qur'an, 14:40-41",
    theme: "du'a for offspring and parents, for the prayer to take root",
  },
  {
    arabic:
      'اَللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا خَلَقْتَ، وَأَعُوذُ بِكَ مِنْ شَرِّ كُلِّ ذِي شَرٍّ، وَأَعُوذُ بِكَ مِنْ شَرِّ كُلِّ دَابَّةٍ أَنْتَ آخِذٌ بِنَاصِيَتِهَا، إِنَّ رَبِّي عَلَى صِرَاطٍ مُسْتَقِيمٍ',
    english:
      'O God, I seek refuge in You from the evil of what You have created, and from the evil of every evildoer, and from the evil of every creature You hold by its forelock. My Lord is on a straight path.',
    source: 'Musnad Ahmad, 15/402',
    theme: 'protection from wickedness of enemies, refuge from harm',
  },
  {
    arabic:
      'بِسْمِ اللَّهِ، أَغْلِقُوا الْأَبْوَابَ وَاذْكُرُوا اسْمَ اللَّهِ، فَإِنَّ الشَّيْطَانَ لَا يَفْتَحُ بَابًا مُغْلَقًا ذُكِرَ اسْمُ اللَّهِ عَلَيْهِ',
    english:
      "In the name of God — close the doors and mention the name of God, for Shayṭān does not open a closed door upon which God's name has been mentioned.",
    source: 'Sahih al-Bukhari, 3304; Sahih Muslim, 2012',
    theme: 'sealing the house at night, for the family at bedtime',
  },
]

// ── Additional wisdom teachings — supplement the corpus's 14 ───────
// All from Nahj al-Balagha or Ghurar al-Hikam, well-attested.
export const BASELINE_WISDOM: BaselineEntry[] = [
  {
    arabic: 'الدُّنْيَا مَزْرَعَةُ الآخِرَةِ',
    english: 'This world is the field of the next.',
    source: 'Reflected throughout the tradition; cf. Imam Ali (عليه السلام)',
    theme: 'on purpose, on action, on the long view',
  },
  {
    arabic: 'العِلْمُ خَيْرٌ مِنَ المَالِ، العِلْمُ يَحْرُسُكَ وَأَنْتَ تَحْرُسُ المَالَ',
    english:
      'Knowledge is better than wealth. Knowledge guards you while you guard wealth.',
    source: 'Nahj al-Balagha, Saying 147',
    theme: 'on learning, on what to invest in',
  },
  {
    arabic: 'مَنْ عَذُبَ لِسَانُهُ كَثُرَ إِخْوَانُهُ',
    english: 'Whose tongue is sweet, his brothers grow many.',
    source: 'Nahj al-Balagha, Saying 51',
    theme: 'on speech, on relationships, on friendship',
  },
  {
    arabic: 'الجَزَعُ أَتْعَبُ مِنَ الصَّبْرِ',
    english: 'Despair is more exhausting than patience.',
    source: 'Ghurar al-Hikam',
    theme: 'on patience, on grief, on hardship',
  },
  {
    arabic: 'مَنْ أَطَالَ الأَمَلَ أَسَاءَ العَمَلَ',
    english: 'Whoever lengthens his hopes corrupts his deeds.',
    source: 'Nahj al-Balagha, Saying 36',
    theme: 'on procrastination, on time, on intention',
  },
  {
    arabic: 'إِذَا قَدَرْتَ عَلَى عَدُوِّكَ فَاجْعَلِ العَفْوَ شُكْرًا لِلْقُدْرَةِ عَلَيْهِ',
    english:
      'When you have power over your enemy, make forgiveness the thanks for that power.',
    source: 'Nahj al-Balagha, Saying 11',
    theme: 'on anger, on forgiveness, on conflict',
  },
  {
    arabic: 'مَنْ نَصَبَ نَفْسَهُ لِلنَّاسِ إِمَامًا فَلْيَبْدَأْ بِتَعْلِيمِ نَفْسِهِ قَبْلَ تَعْلِيمِ غَيْرِهِ',
    english:
      'Whoever sets himself up as a leader for others must begin by teaching himself before he teaches anyone else.',
    source: 'Nahj al-Balagha, Saying 73',
    theme: 'on leadership, on parenting, on integrity',
  },
  {
    arabic: 'الصَّدِيقُ مَنْ صَدَقَ غَيْبُهُ',
    english: 'A friend is one whose absence is honest.',
    source: 'Ghurar al-Hikam',
    theme: 'on friendship, on loyalty, on trust',
  },
  {
    arabic: 'مَنْ لَانَ عُودُهُ كَثُفَتْ أَغْصَانُهُ',
    english: 'Whoever softens his bough, his branches grow many.',
    source: 'Nahj al-Balagha, Saying 214',
    theme: 'on humility, on temperament, on community',
  },
  {
    arabic: 'مَنْ تَأَخَّرَ عَنْ زَلَلِ اللِّسَانِ سَلِمَ مِنْ سُوءِ النَّدَمِ',
    english: 'Whoever holds back from a slip of the tongue is spared the worst regret.',
    source: 'Ghurar al-Hikam',
    theme: 'on speech, on restraint, on regret',
  },
  {
    arabic: 'لِكُلِّ شَيْءٍ آفَةٌ، وَآفَةُ العِلْمِ النِّسْيَانُ',
    english: 'Everything has a blight; the blight of knowledge is forgetting.',
    source: 'Ghurar al-Hikam',
    theme: 'on knowledge, on memory, on practice',
  },
  {
    arabic: 'مَنْ أَيْقَنَ بِالخَلَفِ جَادَ بِالعَطِيَّةِ',
    english: 'Whoever is certain of recompense gives generously.',
    source: 'Nahj al-Balagha, Saying 138',
    theme: 'on generosity, on trust in God, on giving',
  },
  {
    arabic: 'مَا اخْتَلَفَ دَعْوَتَانِ إِلَّا كَانَتْ إِحْدَاهُمَا ضَلَالَةً',
    english: 'No two calls ever differ but one of them is misguidance.',
    source: 'Nahj al-Balagha, Saying 183',
    theme: 'on discernment, on truth, on division',
  },
  {
    arabic: 'كَلَامُ الإِنْسَانِ مِيزَانُ عَقْلِهِ',
    english: 'A person\'s speech is the scale of their intellect.',
    source: 'Ghurar al-Hikam',
    theme: 'on speech, on intellect, on what reveals us',
  },
  {
    arabic: 'مَنْ أَحَبَّكَ نَهَاكَ، وَمَنْ أَبْغَضَكَ أَغْرَاكَ',
    english: 'Who loves you, restrains you; who hates you, eggs you on.',
    source: 'Nahj al-Balagha, Saying 254',
    theme: 'on real friendship, on flattery, on hearing the truth',
  },
  {
    arabic: 'إِنَّ المِسْكِينَ رَسُولُ اللَّهِ، فَمَنْ مَنَعَهُ فَقَدْ مَنَعَ اللَّهَ، وَمَنْ أَعْطَاهُ فَقَدْ أَعْطَى اللَّهَ',
    english:
      "Indeed the destitute one is God's messenger. Whoever refuses him has refused God; whoever gives to him has given to God.",
    source: 'Nahj al-Balagha, Saying 304',
    theme: 'on giving, on the poor, on charity',
  },
  {
    arabic: 'الصَّبْرُ صَبْرَانِ: صَبْرٌ عَلَى مَا تَكْرَهُ، وَصَبْرٌ عَمَّا تُحِبُّ',
    english: 'Patience is of two kinds: patience with what you dislike, and patience away from what you love.',
    source: 'Nahj al-Balagha, Saying 55',
    theme: 'on patience, on craving, on hardship',
  },
  {
    arabic: 'الرِّضَا بِفِعْلِ قَوْمٍ كَالدَّاخِلِ فِيهِ مَعَهُمْ',
    english: 'To approve of a people\'s deed is to be like one who joined them in it.',
    source: 'Nahj al-Balagha, Saying 154',
    theme: 'on complicity, on silence in the face of wrong, on responsibility',
  },
  {
    arabic: 'الرَّاحِلُ إِلَيْكَ قَرِيبُ المَسَافَةِ، وَأَنْتَ لَا تَحْتَجِبُ عَنْ خَلْقِكَ إِلَّا أَنْ تَحْجُبَهُمُ الأَعْمَالُ دُونَكَ',
    english:
      'The one travelling toward You has a near distance; and You do not veil Yourself from Your creation — but their deeds veil them from You.',
    source: "Du'a Arafah of Imam al-Husayn (transmitted through Imam Ali’s line); cf. Nahj al-Balagha sermons on God",
    theme: 'on nearness to God, on the veils within',
  },
  {
    arabic: 'إِيَّاكَ وَالعُجْبَ، وَسُوءَ الخُلُقِ، وَقِلَّةَ الصَّبْرِ',
    english: 'Beware of self-admiration, of bad character, and of little patience.',
    source: 'Nahj al-Balagha, Letter 31 (to his son al-Hasan)',
    theme: 'on inner correction, on character, on patience',
  },
  {
    arabic: 'لَا تُعَادِ أَحَدًا وَإِنْ ظَنَنْتَ أَنَّهُ لَا يَضُرُّكَ',
    english: 'Do not make enemies, even with one you think cannot harm you.',
    source: 'Nahj al-Balagha, Letter 31',
    theme: 'on enmity, on humility, on the long view',
  },
  {
    arabic: 'مَا أَكْثَرَ العِبَرَ وَأَقَلَّ الِاعْتِبَارَ',
    english: 'How many the lessons — and how few who learn from them.',
    source: 'Nahj al-Balagha, Saying 297',
    theme: 'on attention, on history, on learning',
  },
  {
    arabic: 'مِنْ كَنُوزِ الجَنَّةِ: البِرُّ، وَإِخْفَاءُ العَمَلِ، وَالصَّبْرُ عَلَى الرَّزَايَا، وَكِتْمَانُ المَصَائِبِ',
    english:
      "Among the treasures of paradise: doing good, hiding one's deed, patience with calamities, and concealing one's misfortunes.",
    source: 'Ghurar al-Hikam',
    theme: 'on dignity in hardship, on hidden virtue, on grief',
  },
  {
    arabic: 'مَنْ ظَنَّ بِكَ خَيْرًا فَصَدِّقْ ظَنَّهُ',
    english: "Whoever thinks well of you — prove their thought true.",
    source: 'Nahj al-Balagha, Saying 248',
    theme: 'on integrity, on what others see in us',
  },
  {
    arabic: 'إِذَا أَرَادَ اللَّهُ بِعَبْدٍ خَيْرًا فَقَّهَهُ فِي الدِّينِ، وَزَهَّدَهُ فِي الدُّنْيَا، وَبَصَّرَهُ بِعُيُوبِهِ',
    english:
      'When God wills good for a servant, He grants him understanding in religion, detachment from the world, and insight into his own faults.',
    source: 'Ghurar al-Hikam; cf. transmitted tradition',
    theme: 'on growth, on self-knowledge, on divine guidance',
  },
  {
    arabic: 'مَنْ أَصْلَحَ بَيْنَهُ وَبَيْنَ اللَّهِ أَصْلَحَ اللَّهُ بَيْنَهُ وَبَيْنَ النَّاسِ',
    english:
      'Whoever sets right what is between him and God — God sets right what is between him and people.',
    source: 'Nahj al-Balagha, Saying 89',
    theme: 'on relationships, on the inner work, on what fixes the outer',
  },
  {
    arabic: 'مَنْ تَرَكَ قَوْلَ لَا أَدْرِي أُصِيبَتْ مَقَاتِلُهُ',
    english: 'Whoever abandons saying "I do not know" is struck where it hurts.',
    source: 'Nahj al-Balagha, Saying 85',
    theme: 'on humility, on the limits of knowledge, on pretending',
  },
  {
    arabic: 'إِذَا تَمَّ العَقْلُ نَقَصَ الكَلَامُ',
    english: 'When the intellect is complete, speech becomes spare.',
    source: 'Nahj al-Balagha, Saying 71',
    theme: 'on wisdom, on silence, on what intellect looks like',
  },
  {
    arabic: 'الدَّهْرُ يَوْمَانِ: يَوْمٌ لَكَ وَيَوْمٌ عَلَيْكَ، فَإِذَا كَانَ لَكَ فَلَا تَبْطَرْ، وَإِذَا كَانَ عَلَيْكَ فَاصْبِرْ',
    english:
      'Time is two days: one for you and one against you. When it is for you, do not be reckless; when it is against you, be patient.',
    source: 'Nahj al-Balagha, Saying 396',
    theme: 'on fortune, on patience, on equanimity',
  },
  {
    arabic: 'الكَرِيمُ مَنْ بَدَأَ بِإِحْسَانِهِ، وَاللَّئِيمُ مَنْ كَافَأَ عَلَى إِحْسَانٍ',
    english:
      'The noble person is the one who gives first; the mean person is the one who only repays.',
    source: 'Ghurar al-Hikam',
    theme: 'on generosity, on character, on initiative',
  },
  {
    arabic: 'مَنْ شَكَا الحَاجَةَ إِلَى مُؤْمِنٍ فَكَأَنَّمَا شَكَاهَا إِلَى اللَّهِ',
    english:
      'Whoever complains of need to a believer — it is as though he complained to God.',
    source: 'Imam Ali, transmitted through hadith collections',
    theme: 'on asking for help, on trust between believers, on dignity',
  },
  {
    arabic: 'إِنَّ أَكْيَسَ النَّاسِ مَنْ كَانَ بِعَيْبِهِ بَصِيرًا، وَعَنْ عَيْبِ غَيْرِهِ ضَرِيرًا',
    english:
      'The wisest of people is the one who is sighted to his own faults and blind to the faults of others.',
    source: 'Ghurar al-Hikam',
    theme: 'on self-correction, on judging others, on humility',
  },
  {
    arabic: 'مَنْ مَلَكَ نَفْسَهُ عِنْدَ ثَلَاثٍ: الغَضَبِ وَالشَّهْوَةِ وَالخَوْفِ، حَرَّمَ اللَّهُ جَسَدَهُ عَلَى النَّارِ',
    english:
      'Whoever masters himself at three: anger, desire, and fear — God has forbidden his body to the Fire.',
    source: 'Transmitted from Imam Ali (عليه السلام)',
    theme: 'on self-mastery, on emotion, on inner work',
  },
  {
    arabic: 'الفَقْرُ المَوْتُ الأَكْبَرُ',
    english: 'Poverty is the greater death.',
    source: 'Nahj al-Balagha, Saying 163',
    theme: 'on poverty, on dignity, on the weight of need',
  },
  {
    arabic: 'العَفْوُ يُفْسِدُ مِنَ اللَّئِيمِ بِقَدْرِ مَا يُصْلِحُ مِنَ الكَرِيمِ',
    english:
      'Pardon corrupts a mean person to the same degree it reforms a noble one.',
    source: 'Nahj al-Balagha, Saying 220',
    theme: 'on mercy, on judgment, on whom to forgive',
  },
  {
    arabic: 'إِنَّ هَذِهِ القُلُوبَ تَمَلُّ كَمَا تَمَلُّ الأَبْدَانُ، فَابْتَغُوا لَهَا طَرَائِفَ الحِكْمَةِ',
    english:
      'These hearts tire as bodies tire — seek for them the curiosities of wisdom.',
    source: 'Nahj al-Balagha, Saying 91',
    theme: 'on the heart, on freshness, on what feeds us',
  },
  {
    arabic: 'لِكُلِّ امْرِئٍ فِي مَالِهِ شَرِيكَانِ: الوَارِثُ وَالحَوَادِثُ',
    english:
      'Every person has two partners in his wealth: the heir, and the misfortunes.',
    source: 'Nahj al-Balagha, Saying 333',
    theme: 'on wealth, on the long view, on letting go',
  },
  // ── v46.1 corpus expansion · patience, hardship, calamity ─────
  {
    arabic: 'إِذَا كُنْتَ فِي إِدْبَارٍ وَالْمَوْتُ فِي إِقْبَالٍ، فَمَا أَسْرَعَ الْمُلْتَقَى',
    english: 'When you are in retreat and death is in advance, how swift is the meeting.',
    source: 'Nahj al-Balagha, Saying 29',
    theme: 'on the long view, on mortality, on what hardship reveals',
  },
  {
    arabic:
      'إِنَّ لِلْقُلُوبِ إِقْبَالًا وَإِدْبَارًا، فَإِذَا أَقْبَلَتْ فَاحْمِلُوهَا عَلَى النَّوَافِلِ، وَإِذَا أَدْبَرَتْ فَاقْتَصِرُوا بِهَا عَلَى الْفَرَائِضِ',
    english:
      'Hearts have their advancing and their retreating; when they advance, drive them to the voluntary acts, and when they retreat, restrict them to the obligatory.',
    source: 'Nahj al-Balagha, Saying 312',
    theme: 'on grief, on heaviness, on dry seasons, on doing only what is required',
  },
  {
    arabic: 'لَا يَعْدَمُ الصَّبُورُ الظَّفَرَ وَإِنْ طَالَ بِهِ الزَّمَانُ',
    english: 'The patient one does not lack victory, even if the time stretches long for him.',
    source: 'Nahj al-Balagha, Saying 153',
    theme: 'on patience, on the slowness of relief, on endurance, on the long view',
  },
  {
    arabic: 'مَنْ صَبَرَ صَبْرَ الْأَحْرَارِ، وَإِلَّا سَلَا سُلُوَّ الْأَغْمَارِ',
    english: 'Whoever endures, endures as the free do; otherwise he forgets as the heedless forget.',
    source: 'Nahj al-Balagha, Saying 413',
    theme: 'on dignified endurance, on grief, on bearing loss well',
  },
  {
    arabic:
      'الْبُخْلُ عَارٌ، وَالْجُبْنُ مَنْقَصَةٌ، وَالْفَقْرُ يُخْرِسُ الْفَطِنَ عَنْ حُجَّتِهِ، وَالْمُقِلُّ غَرِيبٌ فِي بَلْدَتِهِ',
    english:
      'Miserliness is disgrace, cowardice is a defect, poverty silences the intelligent man from his proof, and the poor man is a stranger in his own town.',
    source: 'Nahj al-Balagha, Saying 3',
    theme: 'on hardship, on poverty, on feeling unseen, on calamity',
  },
  {
    arabic: 'وَلَا تَأْسَفَنَّ عَلَى شَيْءٍ مِنْهَا زُوِيَ عَنْكَ',
    english: 'Do not grieve over anything of this world that is withheld from you.',
    source: 'Nahj al-Balagha, Letter 31',
    theme: 'on grief, on loss, on letting go, on what is taken',
  },
  {
    arabic:
      'الدَّهْرُ يُخْلِقُ الْأَبْدَانَ، وَيُجَدِّدُ الْآمَالَ، وَيُقَرِّبُ الْمَنِيَّةَ، وَيُبَاعِدُ الْأُمْنِيَّةَ، مَنْ ظَفِرَ بِهِ نَصِبَ، وَمَنْ فَاتَهُ تَعِبَ',
    english:
      'Time wears bodies down, renews hopes, brings death closer, and pushes wishes further away. Whoever gains from it grows weary, and whoever misses it is exhausted.',
    source: 'Nahj al-Balagha, Saying 72',
    theme: 'on hardship, on the long view, on weariness, on time',
  },
  {
    arabic: 'مَنْ أَبْطَأَ بِهِ عَمَلُهُ لَمْ يُسْرِعْ بِهِ نَسَبُهُ',
    english: 'Whoever is held back by his deeds is not hurried forward by his lineage.',
    source: 'Nahj al-Balagha, Saying 23',
    theme: 'on the long view, on what carries you, on endurance',
  },
  {
    arabic: 'الْمُصِيبَةُ وَاحِدَةٌ، فَإِنْ جَزِعْتَ صَارَتِ اثْنَتَيْنِ',
    english: 'The calamity is one; if you panic, it becomes two.',
    source: 'Nahj al-Balagha',
    theme: 'on calamity, on grief, on not adding to suffering, on steadiness',
  },
  {
    arabic: 'إِذَا ازْدَحَمَ الْجَوَابُ خَفِيَ الصَّوَابُ',
    english: 'When answers crowd together, the right one is hidden.',
    source: 'Nahj al-Balagha, Saying 343',
    theme: 'on panic, on overwhelm, on slowing down in hardship',
  },
  {
    arabic: 'مَنْ ضَاقَ خُلُقُهُ مَلَّهُ أَهْلُهُ',
    english: 'Whoever has a narrow temperament, his own people grow weary of him.',
    source: 'Nahj al-Balagha, Saying 365',
    theme: 'on hardship, on temper under strain, on bearing well with others',
  },
  {
    arabic:
      'مَا أَضْمَرَ أَحَدٌ شَيْئًا إِلَّا ظَهَرَ فِي فَلَتَاتِ لِسَانِهِ وَصَفَحَاتِ وَجْهِهِ',
    english:
      'No one conceals anything in himself but it appears in the slips of his tongue and the lines of his face.',
    source: 'Nahj al-Balagha, Saying 26',
    theme: 'on grief, on what we hide, on being seen in hardship',
  },
  {
    arabic: 'مَنِ اسْتَقْبَلَ وُجُوهَ الْآرَاءِ عَرَفَ مَوَاقِعَ الْخَطَأِ',
    english: 'Whoever faces the many faces of opinions comes to know the places of error.',
    source: 'Nahj al-Balagha, Saying 173',
    theme: 'on bewilderment, on hardship clarifying, on learning from affliction',
  },
  {
    arabic:
      'الرِّزْقُ رِزْقَانِ: رِزْقٌ تَطْلُبُهُ، وَرِزْقٌ يَطْلُبُكَ، فَإِنْ لَمْ تَأْتِهِ أَتَاكَ',
    english:
      'Provision is of two kinds: provision you seek, and provision that seeks you — if you do not come to it, it comes to you.',
    source: 'Nahj al-Balagha, Saying 379',
    theme: 'on fear of want, on trust, on the slowness of relief, on hardship',
  },
  {
    arabic: 'أَوْلَى النَّاسِ بِالْعَفْوِ أَقْدَرُهُمْ عَلَى الْعُقُوبَةِ',
    english: 'The most deserving of pardoning is the one most able to punish.',
    source: 'Nahj al-Balagha, Saying 52',
    theme: 'on restraint under injury, on grief turned to anger, on dignified endurance',
  },
  {
    arabic:
      'لَا غِنَى كَالْعَقْلِ، وَلَا فَقْرَ كَالْجَهْلِ، وَلَا مِيرَاثَ كَالْأَدَبِ، وَلَا ظَهِيرَ كَالْمُشَاوَرَةِ',
    english:
      'There is no wealth like the intellect, no poverty like ignorance, no inheritance like cultivation, and no support like consultation.',
    source: 'Nahj al-Balagha, Saying 54',
    theme: 'on what carries you through hardship, on inner resources, on the long view',
  },
  {
    arabic: 'الصَّبْرُ مَطِيَّةٌ لَا تَكْبُو',
    english: 'Patience is a mount that does not stumble.',
    source: 'Nahj al-Balagha',
    theme: 'on patience, on endurance, on what carries you through hardship',
  },
  // ── v46.1 corpus expansion · knowledge, speech, intellect ─────
  {
    arabic: 'الْعِلْمُ وِرَاثَةٌ كَرِيمَةٌ، وَالْآدَابُ حُلَلٌ حِسَانٌ، وَالْفِكْرُ مِرْآةٌ صَافِيَةٌ',
    english:
      'Knowledge is a noble inheritance, refined manners are beautiful garments, and reflection is a clear mirror.',
    source: 'Nahj al-Balagha, Saying 5',
    theme: 'on knowledge, on learning, on reflection, on inheritance of the soul',
  },
  {
    arabic: 'الْمَرْءُ مَخْبُوءٌ تَحْتَ لِسَانِهِ',
    english: 'A person lies hidden beneath their tongue.',
    source: 'Nahj al-Balagha, Saying 148',
    theme: 'on speech, on the tongue, on what reveals us, on hidden character',
  },
  {
    arabic: 'الْعَاقِلُ مَنْ وَضَعَ الشَّيْءَ مَوَاضِعَهُ',
    english: 'The intelligent one is the one who puts each thing in its proper place.',
    source: 'Nahj al-Balagha, Saying 235',
    theme: 'on intellect, on wisdom, on right action, on discernment',
  },
  {
    arabic:
      'لِسَانُ الْعَاقِلِ وَرَاءَ قَلْبِهِ، وَقَلْبُ الْأَحْمَقِ وَرَاءَ لِسَانِهِ',
    english:
      'The tongue of the wise is behind their heart, and the heart of the fool is behind their tongue.',
    source: 'Nahj al-Balagha, Saying 40',
    theme: 'on speech, on the tongue, on the heart, on wisdom and folly',
  },
  {
    arabic: 'النَّاسُ أَعْدَاءُ مَا جَهِلُوا',
    english: 'People are enemies of what they do not know.',
    source: 'Nahj al-Balagha, Saying 172',
    theme: 'on ignorance, on hostility, on learning, on what we reject',
  },
  {
    arabic:
      'الْعِلْمُ عِلْمَانِ: مَطْبُوعٌ وَمَسْمُوعٌ، وَلَا يَنْفَعُ الْمَسْمُوعُ إِذَا لَمْ يَكُنِ الْمَطْبُوعُ',
    english:
      'Knowledge is of two kinds: that which is innate and that which is heard; what is heard does not benefit if the innate is not there.',
    source: 'Nahj al-Balagha, Saying 338',
    theme: 'on knowledge, on learning, on the heart, on inner readiness',
  },
  {
    arabic: 'رُبَّ قَوْلٍ أَنْفَذُ مِنْ صَوْلٍ',
    english: 'How often a word pierces deeper than an assault.',
    source: 'Nahj al-Balagha, Saying 394',
    theme: 'on speech, on the tongue, on the power of words',
  },
  {
    arabic: 'لَا تَرَى الْجَاهِلَ إِلَّا مُفْرِطًا أَوْ مُفَرِّطًا',
    english: 'You will not find the ignorant one but either going to excess or falling short.',
    source: 'Nahj al-Balagha, Saying 70',
    theme: 'on ignorance, on moderation, on balance',
  },
  {
    arabic: 'مَنْ حَاسَبَ نَفْسَهُ رَبِحَ، وَمَنْ غَفَلَ عَنْهَا خَسِرَ',
    english: 'Whoever holds themselves to account profits, and whoever neglects themselves loses.',
    source: 'Nahj al-Balagha, Saying 208',
    theme: 'on self-knowledge, on accountability, on inner work',
  },
  {
    arabic:
      'الْكَلَامُ فِي وَثَاقِكَ مَا لَمْ تَتَكَلَّمْ بِهِ، فَإِذَا تَكَلَّمْتَ بِهِ صِرْتَ فِي وَثَاقِهِ',
    english:
      'Speech is in your bond as long as you have not uttered it; once you utter it, you become bound by it.',
    source: 'Ghurar al-Hikam',
    theme: 'on speech, on silence, on holding back, on the weight of words',
  },
  {
    arabic:
      'مَنْ كَثُرَ كَلَامُهُ كَثُرَ خَطَؤُهُ، وَمَنْ كَثُرَ خَطَؤُهُ قَلَّ حَيَاؤُهُ، وَمَنْ قَلَّ حَيَاؤُهُ قَلَّ وَرَعُهُ، وَمَنْ قَلَّ وَرَعُهُ مَاتَ قَلْبُهُ',
    english:
      'Whoever speaks much errs much; whoever errs much loses modesty; whoever loses modesty loses scrupulousness; and whoever loses scrupulousness, their heart dies.',
    source: 'Nahj al-Balagha, Saying 349',
    theme: 'on speech, on the tongue, on modesty, on the death of the heart',
  },
  {
    arabic:
      'الْعِلْمُ مَقْرُونٌ بِالْعَمَلِ، فَمَنْ عَلِمَ عَمِلَ، وَالْعِلْمُ يَهْتِفُ بِالْعَمَلِ، فَإِنْ أَجَابَهُ وَإِلَّا ارْتَحَلَ عَنْهُ',
    english:
      'Knowledge is coupled with action: whoever knows, acts. Knowledge calls out to action; if action answers, it stays, otherwise it departs.',
    source: 'Nahj al-Balagha, Saying 366',
    theme: 'on knowledge, on action, on what makes learning real',
  },
  {
    arabic: 'لَا يُعْرَفُ الرَّأْيُ إِلَّا عِنْدَ الْغَضَبِ',
    english: "A person's true judgment is not known except at the moment of anger.",
    source: 'Ghurar al-Hikam',
    theme: 'on what reveals us, on anger, on character, on judgment',
  },
  {
    arabic: 'الصَّمْتُ حِكْمَةٌ وَقَلِيلٌ فَاعِلُهُ',
    english: 'Silence is wisdom, and few are those who practice it.',
    source: 'Ghurar al-Hikam',
    theme: 'on silence, on wisdom, on speech, on rare virtues',
  },
  // ── v46.1 corpus expansion · justice, power, leadership ───────
  {
    arabic:
      'وَأَيْمُ اللَّهِ لَأُنْصِفَنَّ الْمَظْلُومَ مِنْ ظَالِمِهِ، وَلَأَقُودَنَّ الظَّالِمَ بِخِزَامَتِهِ، حَتَّى أُورِدَهُ مَنْهَلَ الْحَقِّ وَإِنْ كَانَ كَارِهًا',
    english:
      'By God, I will give the oppressed his due from his oppressor, and I will drag the oppressor by his nose-ring until I bring him to the spring of truth, even if he be unwilling.',
    source: 'Nahj al-Balagha, Sermon 136',
    theme: 'on justice, on rulers, on the rights of the oppressed, on the duty of authority',
  },
  {
    arabic:
      'إِنَّ اللَّهَ فَرَضَ عَلَى أَئِمَّةِ الْعَدْلِ أَنْ يُقَدِّرُوا أَنْفُسَهُمْ بِضَعَفَةِ النَّاسِ كَيْلَا يَتَبَيَّغَ بِالْفَقِيرِ فَقْرُهُ',
    english:
      "God has imposed upon the leaders of justice that they hold themselves to the standard of the weakest of people, so that the poor man's poverty does not drive him to despair.",
    source: 'Nahj al-Balagha, Saying 209',
    theme: 'on rulers, on the poor, on solidarity with the weak, on the duty of authority',
  },
  {
    arabic:
      'وَلَوْ شِئْتُ لَاهْتَدَيْتُ الطَّرِيقَ إِلَى مُصَفَّى هَذَا الْعَسَلِ، وَلُبَابِ هَذَا الْقَمْحِ، وَنَسَائِجِ هَذَا الْقَزِّ، وَلَكِنْ هَيْهَاتَ أَنْ يَغْلِبَنِي هَوَايَ، وَيَقُودَنِي جَشَعِي إِلَى تَخَيُّرِ الْأَطْعِمَةِ، وَلَعَلَّ بِالْحِجَازِ أَوِ الْيَمَامَةِ مَنْ لَا طَمَعَ لَهُ فِي الْقُرْصِ، وَلَا عَهْدَ لَهُ بِالشِّبَعِ',
    english:
      'Had I wished, I could have found my way to refined honey, the choicest wheat, and woven silks. But far be it from me that my desires should overcome me or my greed lead me to choice foods, when perhaps in the Hijaz or Yamama there is one who has no hope of even a loaf, nor any acquaintance with satisfaction.',
    source: 'Nahj al-Balagha, Letter 45',
    theme: 'on rulers, on the far-from-court, on the discipline of authority, on solidarity with the poor',
  },
  {
    arabic:
      'أَأَقْنَعُ مِنْ نَفْسِي بِأَنْ يُقَالَ هَذَا أَمِيرُ الْمُؤْمِنِينَ، وَلَا أُشَارِكُهُمْ فِي مَكَارِهِ الدَّهْرِ، أَوْ أَكُونَ أُسْوَةً لَهُمْ فِي جُشُوبَةِ الْعَيْشِ',
    english:
      'Shall I content myself with being called Commander of the Faithful while not sharing with them the hardships of the age, or not being an example to them in the roughness of life?',
    source: 'Nahj al-Balagha, Letter 45',
    theme: 'on rulers, on shared hardship, on the cost of authority',
  },
  {
    arabic:
      'وَإِنَّ عَمَلَكَ لَيْسَ لَكَ بِطُعْمَةٍ، وَلَكِنَّهُ فِي عُنُقِكَ أَمَانَةٌ، وَأَنْتَ مُسْتَرْعًى لِمَنْ فَوْقَكَ',
    english:
      'Your office is not a morsel for you to feed on; rather it is a trust around your neck, and you are a shepherd answerable to one above you.',
    source: 'Nahj al-Balagha, Letter 5',
    theme: 'on rulers, on trust, on accountability, on office as duty not reward',
  },
  {
    arabic:
      'فَإِنَّ الْوَالِيَ إِذَا اخْتَلَفَ هَوَاهُ مَنَعَهُ ذَلِكَ كَثِيرًا مِنَ الْعَدْلِ، فَلْيَكُنْ أَمْرُ النَّاسِ عِنْدَكَ فِي الْحَقِّ سَوَاءً',
    english:
      "When a ruler's whims vary, this prevents him from much of justice; so let the affairs of the people, in what is right, be equal in your sight.",
    source: 'Nahj al-Balagha, Letter 59',
    theme: 'on justice, on rulers, on impartiality, on the discipline of authority',
  },
  {
    arabic:
      'وَلْيَكُنْ أَبْعَدَ رَعِيَّتِكَ مِنْكَ، وَأَشْنَأَهُمْ عِنْدَكَ، أَطْلَبُهُمْ لِمَعَايِبِ النَّاسِ، فَإِنَّ فِي النَّاسِ عُيُوبًا الْوَالِي أَحَقُّ مَنْ سَتَرَهَا',
    english:
      "Let the farthest of your subjects from you, and the most hateful to you, be the one most eager to seek out people's faults; for people have faults, and the ruler is the one most obligated to conceal them.",
    source: 'Nahj al-Balagha, Letter 53',
    theme: "on rulers, on guarding people's dignity, on choosing one's circle",
  },
  {
    arabic:
      'ثُمَّ اللَّهَ اللَّهَ فِي الطَّبَقَةِ السُّفْلَى مِنَ الَّذِينَ لَا حِيلَةَ لَهُمْ، مِنَ الْمَسَاكِينِ وَالْمُحْتَاجِينَ وَأَهْلِ الْبُؤْسَى وَالزَّمْنَى',
    english:
      'Then God, God, with regard to the lowest class — those who have no recourse — the destitute, the needy, the wretched, and the disabled.',
    source: 'Nahj al-Balagha, Letter 53',
    theme: 'on rulers, on the poor, on the duty to those without recourse',
  },
  {
    arabic:
      'وَاجْعَلْ لِذَوِي الْحَاجَاتِ مِنْكَ قِسْمًا تُفَرِّغُ لَهُمْ فِيهِ شَخْصَكَ، وَتَجْلِسُ لَهُمْ مَجْلِسًا عَامًّا، فَتَتَوَاضَعُ فِيهِ لِلَّهِ الَّذِي خَلَقَكَ',
    english:
      'Set aside for those in need a portion of yourself in which you give them your person, and sit for them in a public audience, humbling yourself therein before God who created you.',
    source: 'Nahj al-Balagha, Letter 53',
    theme: 'on rulers, on accessibility, on the rights of the petitioner, on humility in power',
  },
  {
    arabic:
      'وَلَا تَقُولَنَّ إِنِّي مُؤَمَّرٌ آمُرُ فَأُطَاعُ، فَإِنَّ ذَلِكَ إِدْغَالٌ فِي الْقَلْبِ، وَمَنْهَكَةٌ لِلدِّينِ، وَتَقَرُّبٌ مِنَ الْغِيَرِ',
    english:
      'Never say, "I have been given command, so I order and am obeyed" — for that is corruption seeping into the heart, weakening of the religion, and a step toward upheaval.',
    source: 'Nahj al-Balagha, Letter 53',
    theme: 'on rulers, on the corruption of power, on the danger of command',
  },
  {
    arabic:
      'وَإِيَّاكَ وَالِاسْتِئْثَارَ بِمَا النَّاسُ فِيهِ أُسْوَةٌ، وَالتَّغَابِيَ عَمَّا تُعْنَى بِهِ مِمَّا قَدْ وَضَحَ لِلْعُيُونِ، فَإِنَّهُ مَأْخُوذٌ مِنْكَ لِغَيْرِكَ',
    english:
      'Beware of monopolising for yourself that in which people share equally, and of feigning ignorance of what concerns you and is plain to all eyes; for it shall be taken from you and given to another.',
    source: 'Nahj al-Balagha, Letter 53',
    theme: 'on rulers, on equality before public goods, on accountability',
  },
  {
    arabic: 'فَإِنَّكَ فَوْقَهُمْ، وَوَالِي الْأَمْرِ عَلَيْكَ فَوْقَكَ، وَاللَّهُ فَوْقَ مَنْ وَلَّاكَ',
    english:
      'For you are above them, and the one in authority over you is above you, and God is above the one who appointed you.',
    source: 'Nahj al-Balagha, Letter 53',
    theme: 'on rulers, on accountability, on the chain of authority, on humility',
  },
  {
    arabic:
      'أَمَّا بَعْدُ، فَإِنَّ حَقًّا عَلَى الْوَالِي أَلَّا يُغَيِّرَهُ عَلَى رَعِيَّتِهِ فَضْلٌ نَالَهُ، وَلَا طَوْلٌ خُصَّ بِهِ، وَأَنْ يَزِيدَهُ مَا قَسَمَ اللَّهُ لَهُ مِنْ نِعَمِهِ دُنُوًّا مِنْ عِبَادِهِ، وَعَطْفًا عَلَى إِخْوَانِهِ',
    english:
      'It is the duty of the ruler that the favour he attains or the bounty singled out for him should not change him toward his subjects; rather, what God has apportioned to him of His blessings should only increase his nearness to His servants and his tenderness toward his brethren.',
    source: 'Nahj al-Balagha, Sermon 209',
    theme: 'on rulers, on power as a test, on staying close to the people',
  },
  {
    arabic:
      'بَلَغَنِي عَنْكَ أَمْرٌ إِنْ كُنْتَ فَعَلْتَهُ فَقَدْ أَسْخَطْتَ رَبَّكَ، وَأَغْضَبْتَ إِمَامَكَ، وَأَخْزَيْتَ أَمَانَتَكَ. فَارْفَعْ إِلَيَّ حِسَابَكَ، وَاعْلَمْ أَنَّ حِسَابَ اللَّهِ أَعْظَمُ مِنْ حِسَابِ النَّاسِ',
    english:
      'A report has reached me about you which, if you did it, you have angered your Lord, displeased your imam, and disgraced your trust. Send up to me your account, and know that the reckoning of God is greater than the reckoning of men.',
    source: 'Nahj al-Balagha, Letter 40',
    theme: 'on accountability, on corrupt officials, on the reckoning of God, on rulers',
  },
  {
    arabic:
      'فَإِذَا قَدِمْتَ عَلَيْهِمْ فَلَا تَبِعْ لَهُمْ كِسْوَةَ شِتَاءٍ وَلَا صَيْفٍ، وَلَا دَابَّةً يَعْتَمِلُونَ عَلَيْهَا، وَلَا عَبْدًا، وَلَا تَضْرِبَنَّ أَحَدًا سَوْطًا لِمَكَانِ دِرْهَمٍ',
    english:
      'When you come upon them, do not sell from them a garment of winter or summer, nor a beast they labour upon, nor a slave, and never strike anyone with a whip over a dirham.',
    source: 'Nahj al-Balagha, Letter 25',
    theme: 'on tax collection, on the rights of the governed, on restraint of authority',
  },
  {
    arabic:
      'فَاخْفِضْ لَهُمْ جَنَاحَكَ، وَأَلِنْ لَهُمْ جَانِبَكَ، وَابْسُطْ لَهُمْ وَجْهَكَ، وَآسِ بَيْنَهُمْ فِي اللَّحْظَةِ وَالنَّظْرَةِ، حَتَّى لَا يَطْمَعَ الْعُظَمَاءُ فِي حَيْفِكَ لَهُمْ، وَلَا يَيْأَسَ الضُّعَفَاءُ مِنْ عَدْلِكَ عَلَيْهِمْ',
    english:
      'Lower your wing to them, soften your side to them, brighten your face for them, and treat them equally even in a glance and a look — so that the great may not covet your tilting toward them, nor the weak despair of your justice toward them.',
    source: 'Nahj al-Balagha, Letter 27',
    theme: 'on rulers, on impartiality, on the great and the weak, on the dignity of the governed',
  },
  {
    arabic:
      'أَمَّا بَعْدُ، فَإِنِّي كُنْتُ أَشْرَكْتُكَ فِي أَمَانَتِي، وَجَعَلْتُكَ شِعَارِي وَبِطَانَتِي... فَلَمَّا رَأَيْتَ الزَّمَانَ عَلَى ابْنِ عَمِّكَ قَدْ كَلِبَ، قَلَبْتَ لِابْنِ عَمِّكَ ظَهْرَ الْمِجَنِّ',
    english:
      'I had made you a partner in my trust and taken you as my closest confidant. Yet when you saw the age turn savage against your cousin, you turned the back of the shield against your cousin.',
    source: 'Nahj al-Balagha, Letter 41',
    theme: 'on betrayal of trust, on corrupt officials, on accountability, on the weight of authority',
  },
  {
    arabic:
      'فَأَمَّا حَقُّكُمْ عَلَيَّ فَالنَّصِيحَةُ لَكُمْ، وَتَوْفِيرُ فَيْئِكُمْ عَلَيْكُمْ، وَتَعْلِيمُكُمْ كَيْلَا تَجْهَلُوا، وَتَأْدِيبُكُمْ كَيْمَا تَعْلَمُوا. وَأَمَّا حَقِّي عَلَيْكُمْ فَالْوَفَاءُ بِالْبَيْعَةِ، وَالنَّصِيحَةُ فِي الْمَشْهَدِ وَالْمَغِيبِ',
    english:
      'As for your right upon me: sincere counsel to you, the full delivery of your share of the spoils, your instruction so that you do not remain ignorant, and your discipline so that you may come to know. As for my right upon you: faithfulness to the allegiance, and sincere counsel in my presence and absence.',
    source: 'Nahj al-Balagha, Sermon 34',
    theme: 'on the mutual rights of ruler and ruled, on the duties of authority, on the social contract',
  },
  {
    arabic:
      'وَلَيْسَ امْرُؤٌ — وَإِنْ عَظُمَتْ فِي الْحَقِّ مَنْزِلَتُهُ — بِفَوْقِ أَنْ يُعَانَ عَلَى مَا حَمَّلَهُ اللَّهُ مِنْ حَقِّهِ. وَلَا امْرُؤٌ — وَإِنْ صَغَّرَتْهُ النُّفُوسُ — بِدُونِ أَنْ يُعِينَ عَلَى ذَلِكَ، أَوْ يُعَانَ عَلَيْهِ',
    english:
      'No man, however great his standing in the truth, is above being aided in the duty God has laid upon him. And no man, however much souls belittle him, is beneath being one who aids in that duty, or being aided in it.',
    source: 'Nahj al-Balagha, Sermon 216',
    theme: 'on mutual responsibility, on no one above duty, on the dignity of the small, on shared accountability',
  },

  // ── Humility & gratitude ─────────────────────────────────────────
  {
    arabic: 'مَنْ تَوَاضَعَ رَفَعَهُ اللَّهُ، وَمَنْ تَكَبَّرَ وَضَعَهُ اللَّهُ',
    english: 'Whoever humbles themselves, God raises them; whoever exalts themselves, God lowers them.',
    source: 'Nahj al-Balagha (saying)',
    theme: 'on humility before God, warning against pride, daily reminder',
  },
  {
    arabic: 'التَّوَاضُعُ يَرْفَعُ الْوَضِيعَ، وَالْكِبْرُ يَضَعُ الرَّفِيعَ',
    english: 'Humility raises the lowly, and arrogance brings down the high.',
    source: 'Ghurar al-Hikam',
    theme: 'on humility, on pride, on inner reform',
  },
  {
    arabic: 'ثَمَرَةُ الْعِلْمِ إِخْلَاصُ الْعَمَلِ، وَثَمَرَةُ التَّوَاضُعِ الْمَحَبَّةُ',
    english: 'The fruit of knowledge is sincerity of action; the fruit of humility is love.',
    source: 'Ghurar al-Hikam',
    theme: 'on humility, on being loved, on knowledge in practice',
  },
  {
    arabic: 'الشُّكْرُ زِينَةُ الْغِنَى',
    english: 'Gratitude is the adornment of wealth.',
    source: 'Ghurar al-Hikam',
    theme: 'on gratitude, on blessings, on wealth, on contentment',
  },
  {
    arabic:
      'إِذَا وَصَلَتْ إِلَيْكُمْ أَطْرَافُ النِّعَمِ فَلَا تُنَفِّرُوا أَقْصَاهَا بِقِلَّةِ الشُّكْرِ',
    english:
      'When the edges of blessings reach you, do not drive away their fullness by failing to give thanks.',
    source: 'Nahj al-Balagha, Saying 13',
    theme: 'on gratitude, on preserving blessings, on the duties of wealth, on keeping blessings',
  },
  {
    arabic:
      'مَا كَانَ اللَّهُ لِيَفْتَحَ عَلَى عَبْدٍ بَابَ الشُّكْرِ وَيُغْلِقَ عَنْهُ بَابَ الزِّيَادَةِ',
    english:
      'God does not open the door of gratitude for a servant and then close upon them the door of increase.',
    source: 'Nahj al-Balagha (saying)',
    theme: 'on gratitude, on the increase of blessings, on trust in God',
  },
  {
    arabic: 'الْكِبْرُ مَصْيَدَةُ الشَّيْطَانِ الْعُظْمَى',
    english: "Arrogance is Satan's greatest snare.",
    source: 'Ghurar al-Hikam',
    theme: 'on pride, on spiritual danger, on self-watchfulness',
  },
  {
    arabic:
      'اعْجَبُوا لِهَذَا الْإِنْسَانِ يَنْظُرُ بِشَحْمٍ، وَيَتَكَلَّمُ بِلَحْمٍ، وَيَسْمَعُ بِعَظْمٍ، وَيَتَنَفَّسُ مِنْ خَرْمٍ',
    english:
      'Marvel at this human: he sees through fat, speaks through flesh, hears through bone, and breathes through a slit.',
    source: 'Nahj al-Balagha, Saying 8',
    theme: 'on humility about the body, on wonder, on gratitude for the senses',
  },
  {
    arabic: 'شُكْرُ كُلِّ نِعْمَةٍ الْوَرَعُ عَنْ مَحَارِمِ اللَّهِ',
    english: 'Gratitude for every blessing is restraint from what God has forbidden.',
    source: 'Ghurar al-Hikam',
    theme: 'on gratitude in action, on piety, on blessings',
  },
  {
    arabic: 'مَنْ أُعْطِيَ الشُّكْرَ لَمْ يُحْرَمِ الزِّيَادَةَ',
    english: 'Whoever is granted gratitude is not denied increase.',
    source: 'Nahj al-Balagha, Saying 135',
    theme: 'on gratitude, on divine increase, on contentment',
  },
  {
    arabic: 'آفَةُ النِّعَمِ كُفْرَانُهَا',
    english: 'The blight of blessings is to be ungrateful for them.',
    source: 'Ghurar al-Hikam',
    theme: 'on gratitude, on losing blessings, on warning',
  },
  {
    arabic:
      'زَكَاةُ الْجَاهِ بَذْلُهُ، وَزَكَاةُ الْقُدْرَةِ الْإِنْصَافُ، وَزَكَاةُ النِّعَمِ اصْطِنَاعُ الْمَعْرُوفِ',
    english:
      'The alms of status is to spend it; the alms of power is fairness; the alms of blessings is doing good.',
    source: 'Ghurar al-Hikam',
    theme: 'on gratitude in action, on power, on generosity, on duties of wealth',
  },
  {
    arabic:
      'مَا أَحْسَنَ تَوَاضُعَ الْأَغْنِيَاءِ لِلْفُقَرَاءِ طَلَبًا لِمَا عِنْدَ اللَّهِ، وَأَحْسَنُ مِنْهُ تِيهُ الْفُقَرَاءِ عَلَى الْأَغْنِيَاءِ اتِّكَالًا عَلَى اللَّهِ',
    english:
      'How beautiful is the humility of the rich toward the poor in seeking what is with God; and more beautiful still is the dignity of the poor toward the rich in reliance upon God.',
    source: 'Nahj al-Balagha, Saying 406',
    theme: 'on humility, on wealth and poverty, on reliance on God',
  },
  {
    arabic: 'التَّوَاضُعُ سُلَّمُ الشَّرَفِ',
    english: 'Humility is the ladder of honour.',
    source: 'Ghurar al-Hikam',
    theme: 'on humility, on true honour, on character',
  },
  {
    arabic: 'بِالشُّكْرِ تَدُومُ النِّعَمُ',
    english: 'By gratitude, blessings endure.',
    source: 'Ghurar al-Hikam',
    theme: 'on gratitude, on preserving blessings',
  },
  {
    arabic: 'عَجِبْتُ لِمَنْ يَقْنَطُ وَمَعَهُ الِاسْتِغْفَارُ',
    english: 'I marvel at one who despairs while still possessing the means of seeking forgiveness.',
    source: 'Nahj al-Balagha, Saying 87',
    theme: 'on humility before God, on repentance, on hope',
  },
  {
    arabic:
      'إِيَّاكَ وَالْكِبْرَ، فَإِنَّهُ أَعْظَمُ الذُّنُوبِ وَأَلْأَمُ الْعُيُوبِ، وَهُوَ حِلْيَةُ إِبْلِيسَ',
    english:
      'Beware of arrogance, for it is the greatest of sins and the basest of faults, and it is the ornament of Iblis.',
    source: 'Nahj al-Balagha, Letter 31',
    theme: 'on warning against pride, on character, on self-correction',
  },
  {
    arabic: 'مَنْ شَكَرَ الْقَلِيلَ اسْتَحَقَّ الْجَزِيلَ',
    english: 'Whoever is grateful for the little deserves the abundant.',
    source: 'Ghurar al-Hikam',
    theme: 'on gratitude, on small mercies, on contentment',
  },
  {
    arabic: 'مَنْ تَوَاضَعَ فِي الدُّنْيَا لِإِخْوَانِهِ فَهُوَ عِنْدَ اللَّهِ مِنَ الصِّدِّيقِينَ',
    english:
      "Whoever humbles themselves in this world before their brethren is, in God's sight, among the truthful.",
    source: 'Attributed tradition',
    theme: 'on humility with people, on truthfulness, on brotherhood',
  },
  {
    arabic:
      'أَقَلُّ مَا يَلْزَمُكُمْ لِلَّهِ أَلَّا تَسْتَعِينُوا بِنِعَمِهِ عَلَى مَعَاصِيهِ',
    english:
      'The least you owe God is that you do not use His blessings as aid in disobeying Him.',
    source: 'Nahj al-Balagha (saying)',
    theme: 'on gratitude, on accountability, on blessings rightly used',
  },

  // ── Charity & generosity ─────────────────────────────────────────
  {
    arabic:
      'السَّخَاءُ مَا كَانَ ابْتِدَاءً، فَأَمَّا مَا كَانَ عَنْ مَسْأَلَةٍ فَحَيَاءٌ وَتَذَمُّمٌ',
    english:
      'Generosity is what is given unasked; what is given after being asked is merely shame and avoidance of blame.',
    source: 'Nahj al-Balagha, Saying 53',
    theme: 'on generosity, on giving before being asked, on the etiquette of giving',
  },
  {
    arabic:
      'لَا كَنْزَ أَنْفَعُ مِنَ الْعِلْمِ، وَلَا عِزَّ أَرْفَعُ مِنَ الْحِلْمِ، وَلَا حَسَبَ أَبْلَغُ مِنَ الْأَدَبِ، وَلَا قَرِينَ أَسْوَأُ مِنَ الْبُخْلِ',
    english:
      'No treasure is more beneficial than knowledge, no honour higher than forbearance, no lineage greater than refinement, and no companion worse than miserliness.',
    source: 'Nahj al-Balagha, Saying 113',
    theme: 'on miserliness, on the worst companion, when feeling stingy',
  },
  {
    arabic: 'الْبُخْلُ جَامِعٌ لِمَسَاوِئِ الْعُيُوبِ، وَهُوَ زِمَامٌ يُقَادُ بِهِ إِلَى كُلِّ سُوءٍ',
    english:
      'Miserliness gathers all evil defects, and it is a rein by which one is led to every wrong.',
    source: 'Nahj al-Balagha, Saying 378',
    theme: 'on miserliness, on the root of vices, warning against stinginess',
  },
  {
    arabic: 'السَّخَاءُ يَمْحَضُ الْمَحَبَّةَ، وَيُزَيِّنُ الْأَخْلَاقَ',
    english: "Generosity purifies love and adorns one's character.",
    source: 'Ghurar al-Hikam',
    theme: 'on generosity, on love through giving, on character',
  },
  {
    arabic:
      'إِذَا أَقْبَلَتِ الدُّنْيَا عَلَى أَحَدٍ أَعَارَتْهُ مَحَاسِنَ غَيْرِهِ، وَإِذَا أَدْبَرَتْ عَنْهُ سَلَبَتْهُ مَحَاسِنَ نَفْسِهِ',
    english:
      'When the world turns toward someone, it lends him the virtues of others; when it turns away, it strips him even of his own.',
    source: 'Nahj al-Balagha, Saying 9',
    theme: 'on the fickleness of wealth, on the duties of the wealthy',
  },
  {
    arabic: 'إِذَا أَمْلَقْتُمْ فَتَاجِرُوا اللَّهَ بِالصَّدَقَةِ',
    english: 'When poverty afflicts you, trade with God through charity.',
    source: 'Nahj al-Balagha, Saying 258',
    theme: 'on charity, on giving in hardship, when feeling poor',
  },
  {
    arabic: 'اسْتَنْزِلُوا الرِّزْقَ بِالصَّدَقَةِ',
    english: 'Draw down sustenance by means of charity.',
    source: 'Nahj al-Balagha, Saying 137',
    theme: 'on charity, on provision through giving, when fearing loss',
  },
  {
    arabic:
      'إِنَّ اللَّهَ سُبْحَانَهُ فَرَضَ فِي أَمْوَالِ الْأَغْنِيَاءِ أَقْوَاتَ الْفُقَرَاءِ، فَمَا جَاعَ فَقِيرٌ إِلَّا بِمَا مُتِّعَ بِهِ غَنِيٌّ',
    english:
      'God, glorified is He, has set in the wealth of the rich the sustenance of the poor; no poor person goes hungry except by what some rich one has hoarded.',
    source: 'Nahj al-Balagha, Saying 328',
    theme: 'on the right of the poor, on the duties of wealth, on hoarding',
  },
  {
    arabic: 'إِذَا أَعْطَيْتَ فَأَوْجِزْ، وَإِذَا حَرَمْتَ فَأَوْجِزْ',
    english: 'When you give, be brief about it; when you must refuse, be brief about that too.',
    source: 'Ghurar al-Hikam',
    theme: 'on the etiquette of giving, on dignity in refusal, on not lingering over the gift',
  },
  {
    arabic: 'تَمَامُ الْمَعْرُوفِ أَفْضَلُ مِنِ ابْتِدَائِهِ',
    english: 'Completing a kindness is better than merely beginning one.',
    source: 'Ghurar al-Hikam',
    theme: 'on follow-through in giving, on the etiquette of giving',
  },
  {
    arabic: 'لَا تُتْبِعِ الْعَطِيَّةَ الْمَنَّ',
    english: 'Do not follow a gift with the reminder of it.',
    source: 'Ghurar al-Hikam',
    theme: 'on not reminding the recipient, on the etiquette of giving, on hidden charity',
  },
  {
    arabic: 'الْمَنُّ يُكَدِّرُ الصَّنِيعَةَ',
    english: 'Reminding a person of your favour sullies the kindness itself.',
    source: 'Ghurar al-Hikam',
    theme: 'on not reminding the recipient, on the etiquette of giving, on ruining a good deed',
  },
  {
    arabic: 'أَفْضَلُ الصَّدَقَةِ صَدَقَةُ السِّرِّ',
    english: 'The best charity is the charity given in secret.',
    source: 'Ghurar al-Hikam',
    theme: 'on hidden charity, on secret giving, on the etiquette of giving',
  },
  {
    arabic:
      'الْكَرِيمُ يُخْفِي الْحَسَنَاتِ وَيُظْهِرُ السَّيِّئَاتِ، وَاللَّئِيمُ يُظْهِرُ الْحَسَنَاتِ وَيُخْفِي السَّيِّئَاتِ',
    english:
      'The generous one hides his good deeds and admits his faults; the base one parades his good deeds and conceals his faults.',
    source: 'Ghurar al-Hikam',
    theme: 'on hidden charity, on the noble character, on secrecy in giving',
  },
  {
    arabic:
      'السَّخِيُّ قَرِيبٌ مِنَ اللَّهِ، قَرِيبٌ مِنَ النَّاسِ، قَرِيبٌ مِنَ الْجَنَّةِ، بَعِيدٌ مِنَ النَّارِ',
    english:
      'The generous one is close to God, close to people, close to Paradise, and far from the Fire.',
    source: 'Attributed tradition',
    theme: 'on generosity, on nearness to God, on the reward of giving',
  },
  {
    arabic: 'الْكَرَمُ أَعْطَفُ مِنَ الرَّحِمِ',
    english: 'Generosity binds hearts more tenderly than blood-kinship.',
    source: 'Nahj al-Balagha, Saying 247',
    theme: 'on generosity, on building bonds, on the power of giving',
  },
  {
    arabic: 'الْكَرِيمُ مَنْ بَدَأَ بِإِحْسَانِهِ',
    english: 'The truly generous is the one who gives before he is asked.',
    source: 'Ghurar al-Hikam',
    theme: 'on giving before being asked, on generosity, on the etiquette of giving',
  },
  {
    arabic: 'أَحْسِنْ إِلَى مَنْ شِئْتَ تَكُنْ أَمِيرَهُ',
    english: 'Show kindness to whomever you wish, and you become his master.',
    source: 'Nahj al-Balagha, Saying 410',
    theme: 'on the power of giving, on generosity as strength, on kindness',
  },
  {
    arabic: 'مَنْ بَخِلَ بِمَالِهِ ذَلَّ، وَمَنْ بَخِلَ بِدِينِهِ جَلَّ',
    english:
      'Whoever is stingy with his wealth is debased; whoever is sparing with his religion is honoured.',
    source: 'Ghurar al-Hikam',
    theme: 'on miserliness, on the cost of stinginess, when feeling miserly',
  },

  // ── Jihad al-nafs (inner struggle) ───────────────────────────────
  {
    arabic:
      'حَاسِبُوا أَنْفُسَكُمْ قَبْلَ أَنْ تُحَاسَبُوا، وَزِنُوهَا قَبْلَ أَنْ تُوزَنُوا',
    english:
      'Take account of yourselves before you are called to account, and weigh your deeds before they are weighed for you.',
    source: 'Nahj al-Balagha, Sermon 90',
    theme: 'on muḥāsaba, on self-reckoning, on the inner struggle',
  },
  {
    arabic:
      'إِنَّمَا أَخَافُ عَلَيْكُمُ اثْنَتَيْنِ: اتِّبَاعَ الْهَوَى، وَطُولَ الْأَمَلِ. فَأَمَّا اتِّبَاعُ الْهَوَى فَيَصُدُّ عَنِ الْحَقِّ، وَأَمَّا طُولُ الْأَمَلِ فَيُنْسِي الْآخِرَةَ',
    english:
      'I fear for you two things: following desire and prolonged hopes. As for following desire — it bars from the truth; as for prolonged hopes — they make one forget the Hereafter.',
    source: 'Nahj al-Balagha, Saying 42',
    theme: 'on hawā, on long hopes, on procrastination, on the inner struggle',
  },
  {
    arabic:
      'مَنْ نَصَبَ نَفْسَهُ لِلنَّاسِ إِمَامًا فَلْيَبْدَأْ بِتَعْلِيمِ نَفْسِهِ قَبْلَ تَعْلِيمِ غَيْرِهِ',
    english:
      'Whoever sets himself up as a leader of people, let him begin with teaching himself before teaching others.',
    source: 'Nahj al-Balagha, Saying 73',
    theme: 'on disciplining oneself first, on the inner struggle',
  },
  {
    arabic: 'الْهَوَى شَرِيكُ الْعَمَى',
    english: 'Desire is the partner of blindness.',
    source: 'Ghurar al-Hikam',
    theme: 'on the dangers of hawā, on fighting desire, on the lower self',
  },
  {
    arabic:
      'أَفْضَلُ الْجِهَادِ جِهَادُ النَّفْسِ عَنِ الْهَوَى، وَفِطَامُهَا عَنْ لَذَّاتِ الدُّنْيَا',
    english:
      'The most excellent struggle is the struggle of the soul against desire, and weaning it from the pleasures of this world.',
    source: 'Ghurar al-Hikam',
    theme: 'on jihad al-nafs, on the inner struggle, on weaning the soul',
  },
  {
    arabic: 'مَنْ لَمْ يَتَعَاهَدْ نَفْسَهُ بِالْمُحَاسَبَةِ خَسِرَ',
    english: 'Whoever does not regularly take his soul to account, loses.',
    source: 'Ghurar al-Hikam',
    theme: 'on muḥāsaba, on reckoning with oneself, on the inner struggle',
  },
  {
    arabic:
      'إِنَّ هَذِهِ الْقُلُوبَ تَمَلُّ كَمَا تَمَلُّ الْأَبْدَانُ، فَابْتَغُوا لَهَا طَرَائِفَ الْحِكْمَةِ',
    english:
      'Truly these hearts grow weary as bodies grow weary; so seek for them rare gems of wisdom.',
    source: 'Nahj al-Balagha, Saying 91',
    theme: 'on caring for the heart, on the inner struggle',
  },
  {
    arabic: 'ثَمَرَةُ الْمُحَاسَبَةِ صَلَاحُ النَّفْسِ',
    english: 'The fruit of self-reckoning is the rectification of the soul.',
    source: 'Ghurar al-Hikam',
    theme: 'on muḥāsaba, on rectifying the soul, on the inner struggle',
  },
  {
    arabic: 'غَالِبُوا أَنْفُسَكُمْ عَلَى تَرْكِ الْعَادَاتِ تَغْلِبُوهَا',
    english: 'Struggle with your souls to abandon habits, and you will overcome them.',
    source: 'Ghurar al-Hikam',
    theme: 'on breaking the habits of the lower self, on the inner struggle',
  },
  {
    arabic: 'مَنِ اشْتَغَلَ بِعَيْبِ نَفْسِهِ اشْتَغَلَ عَنْ عَيْبِ غَيْرِهِ',
    english:
      'Whoever occupies himself with his own faults is freed from occupying himself with the faults of others.',
    source: 'Nahj al-Balagha, Saying 349',
    theme: 'on inner accountability, on muḥāsaba',
  },
  {
    arabic: 'كَمْ مِنْ عَقْلٍ أَسِيرٍ تَحْتَ هَوَىً أَمِيرٍ',
    english: 'How many an intellect is a captive beneath a desire that commands it.',
    source: 'Nahj al-Balagha, Saying 211',
    theme: 'on the tyranny of hawā, on the lower self, on fighting desire',
  },
  {
    arabic:
      'إِنَّ الْقَلْبَ لَيَصْدَأُ كَمَا يَصْدَأُ الْحَدِيدُ — قِيلَ: فَمَا جِلَاؤُهُ؟ قَالَ: ذِكْرُ الْمَوْتِ وَتِلَاوَةُ الْقُرْآنِ',
    english:
      "Truly the heart rusts as iron rusts. He was asked: 'What polishes it?' He said: 'Remembrance of death and recitation of the Qur'an.'",
    source: 'al-Kafi, cited in Bihar al-Anwar, vol. 70',
    theme: 'on the corrosion of the heart, on the inner struggle',
  },
  {
    arabic: 'إِيَّاكَ وَالِاتِّكَالَ عَلَى الْمُنَى، فَإِنَّهَا بَضَائِعُ النَّوْكَى',
    english: 'Beware of relying on wishful longings, for they are the merchandise of fools.',
    source: 'Nahj al-Balagha, Letter 31 (to Imam al-Hasan)',
    theme: 'on long hopes, on procrastination, on the inner struggle',
  },
  {
    arabic: 'الْأَمَلُ يُغْوِي، وَالْأَجَلُ يُفْنِي',
    english: 'Hope leads astray, and the appointed term annihilates.',
    source: 'Ghurar al-Hikam',
    theme: 'on ṭūl al-amal, on long hopes, on the inner struggle',
  },
  {
    arabic:
      'أَهْلِكِ النَّفْسَ الْأَمَّارَةَ بِالْمُخَالَفَةِ، وَعَوِّدْهَا حُسْنَ الْمُحَاسَبَةِ',
    english:
      'Destroy the soul that commands to evil by opposing it, and accustom it to the excellence of self-reckoning.',
    source: 'Ghurar al-Hikam',
    theme: 'on muḥāsaba, on resisting the nafs, on the inner struggle',
  },
  {
    arabic: 'مَنْ مَلَكَ شَهْوَتَهُ كَانَ عَفِيفًا',
    english: 'Whoever masters his appetite is chaste.',
    source: 'Ghurar al-Hikam',
    theme: 'on mastering appetite, on the inner struggle',
  },
  {
    arabic:
      'لَا تَجْعَلُوا عِلْمَكُمْ جَهْلًا، وَيَقِينَكُمْ شَكًّا؛ إِذَا عَلِمْتُمْ فَاعْمَلُوا، وَإِذَا تَيَقَّنْتُمْ فَأَقْدِمُوا',
    english:
      'Do not turn your knowledge into ignorance, nor your certainty into doubt. When you know, act; when you are certain, move forward.',
    source: 'Nahj al-Balagha, Saying 274',
    theme: 'on procrastination, on acting on what you know, on the inner struggle',
  },
  {
    arabic: 'مَنْ هَجَرَ الشَّهَوَاتِ كَانَ حُرًّا',
    english: 'Whoever forsakes the appetites is free.',
    source: 'Ghurar al-Hikam',
    theme: 'on freedom from the lower self, on the inner struggle',
  },

  // ── Dignity & self-respect ───────────────────────────────────────
  {
    arabic: 'الْقَنَاعَةُ مَالٌ لَا يَنْفَدُ',
    english: 'Contentment is wealth that does not run out.',
    source: 'Nahj al-Balagha, Saying 57',
    theme: 'on contentment, on sufficiency, on inner abundance, on the believer\'s standing',
  },
  {
    arabic:
      'مَنْ رَضِيَ بِالْعَافِيَةِ مِمَّنْ دُونَهُ رُزِقَ السَّلَامَةَ مِمَّنْ فَوْقَهُ',
    english:
      'Whoever is content with well-being from those beneath them is granted safety from those above them.',
    source: 'Nahj al-Balagha (saying)',
    theme: 'on contentment, on station, on dignity of place',
  },
  {
    arabic: 'الطَّمَعُ رِقٌّ مُؤَبَّدٌ',
    english: 'Greed is perpetual enslavement.',
    source: 'Nahj al-Balagha, Saying 180',
    theme: 'on greed enslaves, on dignity of restraint, on the believer\'s standing',
  },
  {
    arabic:
      'اسْتَغْنِ عَمَّنْ شِئْتَ تَكُنْ نَظِيرَهُ، وَاحْتَجْ إِلَى مَنْ شِئْتَ تَكُنْ أَسِيرَهُ، وَأَحْسِنْ إِلَى مَنْ شِئْتَ تَكُنْ أَمِيرَهُ',
    english:
      'Be independent of whomever you wish, and you will be their equal. Be in need of whomever you wish, and you will be their captive. Be generous to whomever you wish, and you will be their master.',
    source: 'Ghurar al-Hikam',
    theme: 'on the freedom of not needing, on dignity of independence, on need as captivity',
  },
  {
    arabic: 'مَا أَقْبَحَ الْخُضُوعَ عِنْدَ الْحَاجَةِ، وَالْجَفَاءَ عِنْدَ الْغِنَى',
    english: 'How ugly is grovelling in need, and harshness in plenty.',
    source: 'Nahj al-Balagha, Saying 225',
    theme: 'on the sting of need, on dignity in poverty, on not grovelling, on integrity',
  },
  {
    arabic: 'مَنْ كَرُمَتْ عَلَيْهِ نَفْسُهُ لَمْ يُهِنْهَا بِالْمَعْصِيَةِ',
    english: 'Whoever holds their own self dear will not debase it through disobedience.',
    source: 'Ghurar al-Hikam',
    theme: 'on honoring the self, on refusing to debase, on sin as self-betrayal, on inner standing',
  },
  {
    arabic: 'الْغِنَى الْأَكْبَرُ الْيَأْسُ عَمَّا فِي أَيْدِي النَّاسِ',
    english: "The greatest wealth is despairing of what is in people's hands.",
    source: 'Nahj al-Balagha, Saying 342',
    theme: 'on freedom from needing others, on dignity of detachment, on true wealth, on not asking',
  },
  {
    arabic: 'مَرَارَةُ الْيَأْسِ خَيْرٌ مِنَ التَّضَرُّعِ إِلَى النَّاسِ',
    english: 'The bitterness of despair is better than supplicating people.',
    source: 'Nahj al-Balagha, Saying 4',
    theme: 'on the sting of asking, on dignity over comfort, on refusal to beg',
  },
  {
    arabic:
      'الْحَاجَةُ إِلَى الْكَرِيمِ تَزِيدُهُ كَرَمًا، وَإِلَى اللَّئِيمِ تَزِيدُهُ لُؤْمًا',
    english:
      'Need before the noble increases their nobility; need before the base increases their baseness.',
    source: 'Ghurar al-Hikam',
    theme: 'on whom to ask, on asking from the unworthy, on exposure of character',
  },
  {
    arabic: 'لِسَانُ السُّؤَالِ ذُلٌّ، وَالْحِرْمَانُ مَعَهُ أَشَدُّ ذُلًّا',
    english: 'The tongue of asking is humiliation, and being refused after it is greater humiliation still.',
    source: 'Ghurar al-Hikam',
    theme: 'on the cost of begging, on why asking debases, on refusing to ask',
  },
  {
    arabic: 'الْمُؤْمِنُ نَفْسُهُ مِنْهُ فِي تَعَبٍ، وَالنَّاسُ مِنْهُ فِي رَاحَةٍ',
    english: "The believer's own self is in struggle from them, while people are in ease from them.",
    source: 'Nahj al-Balagha, Saying 333',
    theme: "on the believer's standing, on self-discipline, on ease for others, on inner labor",
  },
  {
    arabic: 'الْمُؤْمِنُ بِشْرُهُ فِي وَجْهِهِ، وَحُزْنُهُ فِي قَلْبِهِ',
    english: "The believer's cheer is on their face and their grief is in their heart.",
    source: 'Nahj al-Balagha, Saying 333',
    theme: "on the believer's standing, on dignity in sorrow, on composure",
  },
  {
    arabic: 'مَنِ اسْتَغْنَى كَرُمَ عَلَى أَهْلِهِ، وَمَنِ افْتَقَرَ هَانَ عَلَيْهِمْ',
    english:
      'Whoever is self-sufficient is honoured by their own people; whoever falls into need is belittled by them.',
    source: 'Ghurar al-Hikam',
    theme: 'on the sting of need, on family and standing, on why independence matters',
  },
  {
    arabic: 'الْفَقْرُ يُخْرِسُ الْفَطِنَ عَنْ حُجَّتِهِ',
    english: 'Poverty silences the sharp-minded from speaking their case.',
    source: 'Nahj al-Balagha, Saying 3',
    theme: 'on the sting of need, on poverty silences, on dignity stripped by want',
  },
  {
    arabic: 'الْقَنَاعَةُ تُؤَدِّي إِلَى الْعِزِّ',
    english: 'Contentment leads to honour.',
    source: 'Ghurar al-Hikam',
    theme: 'on contentment, on dignity, on qanāʿa as the path to ʿizza',
  },
  {
    arabic: 'مَنْ قَنِعَ عَزَّ، وَمَنْ طَمِعَ ذَلَّ',
    english: 'Whoever is content is honoured, and whoever is greedy is debased.',
    source: 'Ghurar al-Hikam',
    theme: 'on contentment as honour, on greed as disgrace, on dignity in restraint',
  },
  {
    arabic: 'مَنْ أَكْرَمَ نَفْسَهُ هَانَتْ عَلَيْهِ شَهَوَاتُهُ',
    english: 'Whoever honours their own self finds their lusts trivial.',
    source: 'Ghurar al-Hikam',
    theme: 'on self-respect, on refusing debasement, on mastery over appetite',
  },
  {
    arabic: 'لَا تَكُنْ عَبْدَ غَيْرِكَ وَقَدْ جَعَلَكَ اللَّهُ حُرًّا',
    english: 'Do not be the slave of another when God has made you free.',
    source: 'Nahj al-Balagha, Letter 31 (to Imam al-Hasan)',
    theme: "on the believer's standing, on refusal to be debased, on inner dignity",
  },
  {
    arabic: 'الْمَنِيَّةُ وَلَا الدَّنِيَّةُ، وَالتَّقَلُّلُ وَلَا التَّوَسُّلُ',
    english: 'Death rather than humiliation; making do with little rather than begging.',
    source: 'Nahj al-Balagha, Saying 396',
    theme: 'on the dignity of not asking, on refusing debasement, on death over disgrace',
  },
  {
    arabic: 'مَنْ هَانَتْ عَلَيْهِ نَفْسُهُ فَلَا تَرْجُ خَيْرَهُ',
    english: 'Whoever holds their own self cheap, do not hope for any good from them.',
    source: 'Nahj al-Balagha, Saying 168',
    theme: 'on self-respect as foundation, on character begins within, on dignity precedes virtue',
  },

  // ── Tawakkul, riḍā, rizq, qadar ─────────────────────────────────
  {
    arabic: 'التَّوَكُّلُ خَيْرُ عِمَادٍ',
    english: 'Reliance upon God is the best support.',
    source: 'Ghurar al-Hikam',
    theme: 'on reliance on God, on tawakkul, on seeking a foundation',
  },
  {
    arabic:
      'مَنْ تَوَكَّلَ عَلَى اللَّهِ ذَلَّتْ لَهُ الصِّعَابُ، وَتَسَهَّلَتْ عَلَيْهِ الْأَسْبَابُ',
    english:
      'Whoever relies upon God, difficulties are humbled before them, and the means are made easy for them.',
    source: 'Ghurar al-Hikam',
    theme: 'on reliance on God, on tawakkul, when facing difficulty',
  },
  {
    arabic: 'نِعْمَ الْمُعْتَمَدُ التَّوَكُّلُ',
    english: 'What an excellent thing to lean upon is tawakkul.',
    source: 'Ghurar al-Hikam',
    theme: 'on reliance on God, on tawakkul as a practice',
  },
  {
    arabic: 'التَّوَكُّلُ مِنْ قُوَّةِ الْإِيمَانِ',
    english: 'Reliance upon God is part of the strength of faith.',
    source: 'Ghurar al-Hikam',
    theme: 'on reliance on God, on tawakkul, on the strength of faith',
  },
  {
    arabic: 'كَفَى بِالتَّوَكُّلِ عِبَادَةً',
    english: 'Reliance upon God suffices as an act of worship.',
    source: 'Ghurar al-Hikam',
    theme: 'on reliance on God, on tawakkul as worship',
  },
  {
    arabic: 'الرِّضَا بِقَضَاءِ اللَّهِ يُهَوِّنُ عَظِيمَ الرَّزَايَا',
    english: "Contentment with God's decree makes the greatest calamities light.",
    source: 'Ghurar al-Hikam',
    theme: 'on contentment with the decree, on riḍā, when bearing calamity',
  },
  {
    arabic: 'نِعْمَ الطَّارِدُ لِلْهَمِّ الرِّضَا بِالْقَضَاءِ',
    english: 'What an excellent expeller of grief is contentment with the decree.',
    source: 'Ghurar al-Hikam',
    theme: 'on contentment with the decree, on riḍā, when grief-stricken',
  },
  {
    arabic: 'أَفْضَلُ الْأَعْمَالِ الرِّضَا عَنِ اللَّهِ بِمَا قَضَى',
    english: 'The best of deeds is to be content with God in what He has decreed.',
    source: 'Ghurar al-Hikam',
    theme: 'on contentment with the decree, on riḍā',
  },
  {
    arabic:
      'وَلَا تَحْمِلْ هَمَّ يَوْمِكَ الَّذِي لَمْ يَأْتِكَ عَلَى يَوْمِكَ الَّذِي قَدْ أَتَاكَ، فَإِنَّهُ إِنْ يَكُ مِنْ عُمُرِكَ يَأْتِ اللَّهُ فِيهِ بِرِزْقِكَ',
    english:
      'Do not carry the burden of a day that has not yet come upon the day that has come to you; for if it is among the days of your life, God will bring its provision in it.',
    source: 'Nahj al-Balagha, Letter 31 (to Imam al-Hasan)',
    theme: 'on provision, on reliance on God, when anxious about tomorrow',
  },
  {
    arabic:
      'الرِّزْقُ رِزْقَانِ: رِزْقٌ تَطْلُبُهُ، وَرِزْقٌ يَطْلُبُكَ، فَإِنْ لَمْ تَأْتِهِ أَتَاكَ',
    english:
      'Provision is of two kinds: provision you seek, and provision that seeks you — so if you do not go to it, it will come to you.',
    source: 'Nahj al-Balagha, Saying 379',
    theme: 'on provision, on rizq arriving by its own path, when worried about provision',
  },
  {
    arabic: 'قَدْ يُرْزَقُ الْعَبْدُ مِنْ حَيْثُ لَا يَحْتَسِبُ',
    english: 'The servant may be provided for from where he does not reckon.',
    source: 'Ghurar al-Hikam',
    theme: 'on provision, when the path is unclear',
  },
  {
    arabic: 'مَا قُضِيَ فَكَائِنٌ',
    english: 'What has been decreed will be.',
    source: 'Nahj al-Balagha (saying)',
    theme: 'on the decree, when fearing what is to come',
  },
  {
    arabic: 'لَا يَنْفَعُ الْحَذَرُ مِنَ الْقَدَرِ',
    english: 'Caution avails nothing against the decree.',
    source: 'Ghurar al-Hikam',
    theme: 'on the futility of fearing the decree, when anxious',
  },
  {
    arabic: 'كَيْفَ يَنْفَعُ الْحَذَرُ مَعَ الْقَدَرِ؟',
    english: 'How can caution be of any benefit against destiny?',
    source: 'Nahj al-Balagha (saying)',
    theme: 'on the futility of fearing the decree, when over-planning',
  },
  {
    arabic: 'الْأُمُورُ بِالتَّقْدِيرِ لَا بِالتَّدْبِيرِ',
    english: 'Matters proceed by divine decree, not by our planning.',
    source: 'Ghurar al-Hikam',
    theme: 'on the futility of fearing the decree, when over-planning',
  },
  {
    arabic:
      'الْإِيمَانُ وَالْعَمَلُ أَخَوَانِ تَوْأَمَانِ، وَرَفِيقَانِ لَا يَفْتَرِقَانِ، لَا يَقْبَلُ اللَّهُ أَحَدَهُمَا إِلَّا بِصَاحِبِهِ',
    english:
      'Faith and action are twin brothers and inseparable companions; God does not accept one without the other.',
    source: 'Ghurar al-Hikam',
    theme: 'on reliance on God, on effort coupled with surrender',
  },
  {
    arabic: 'اعْقِلْهَا وَتَوَكَّلْ',
    english: 'Tie it, and then rely upon God.',
    source: 'Well-attested transmission (Prophetic)',
    theme: 'on reliance on God, on effort coupled with surrender',
  },

  // ── Friendship & companionship ───────────────────────────────────
  {
    arabic: 'لَا تَتَّخِذَنَّ عَدُوَّ صَدِيقِكَ صَدِيقًا فَتُعَادِيَ صَدِيقَكَ',
    english:
      'Do not take the enemy of your friend as a friend, for you would thereby be at enmity with your friend.',
    source: 'Nahj al-Balagha, Letter 31',
    theme: 'on choosing companions, on loyalty, on the enemy of a friend, on discernment',
  },
  {
    arabic: 'وَأَمْحِضْ أَخَاكَ النَّصِيحَةَ، حَسَنَةً كَانَتْ أَوْ قَبِيحَةً',
    english: 'Give your brother sincere counsel, whether it be pleasing or unpleasant.',
    source: 'Nahj al-Balagha, Letter 31',
    theme: 'on rights of brotherhood, on sincere counsel, on honesty between friends',
  },
  {
    arabic:
      'احْمِلْ نَفْسَكَ مِنْ أَخِيكَ عِنْدَ صَرْمِهِ عَلَى الصِّلَةِ، وَعِنْدَ صُدُودِهِ عَلَى اللَّطَفِ وَالْمُقَارَبَةِ، وَعِنْدَ جُمُودِهِ عَلَى الْبَذْلِ، وَعِنْدَ تَبَاعُدِهِ عَلَى الدُّنُوِّ، وَعِنْدَ شِدَّتِهِ عَلَى اللِّينِ، وَعِنْدَ جُرْمِهِ عَلَى الْعُذْرِ',
    english:
      'Bear yourself toward your brother: when he severs, with connection; when he turns away, with gentleness and drawing near; when he withholds, with giving; when he distances himself, with closeness; when he is harsh, with softness; and when he wrongs you, with finding an excuse for him.',
    source: 'Nahj al-Balagha, Letter 31',
    theme: 'on rights of brotherhood, on patience with friends, on forbearance, on magnanimity',
  },
  {
    arabic:
      'وَإِيَّاكَ أَنْ تَضَعَ ذَلِكَ فِي غَيْرِ مَوْضِعِهِ، أَوْ أَنْ تَفْعَلَهُ بِغَيْرِ أَهْلِهِ',
    english:
      'Beware of putting that (the treatment of brotherhood) in other than its proper place, or of practicing it with one who is unworthy of it.',
    source: 'Nahj al-Balagha, Letter 31',
    theme: 'on choosing companions, on discernment, on misplaced loyalty',
  },
  {
    arabic: 'عَاتِبْ أَخَاكَ بِالْإِحْسَانِ إِلَيْهِ، وَارْدُدْ شَرَّهُ بِالْإِنْعَامِ عَلَيْهِ',
    english: 'Reprove your brother by being good to him, and repel his harm by bestowing favour upon him.',
    source: 'Nahj al-Balagha, Saying 158',
    theme: 'on rights of brotherhood, on repaying harm with kindness, on reconciliation',
  },
  {
    arabic:
      'أَعْجَزُ النَّاسِ مَنْ عَجَزَ عَنِ اكْتِسَابِ الْإِخْوَانِ، وَأَعْجَزُ مِنْهُ مَنْ ضَيَّعَ مَنْ ظَفِرَ بِهِ مِنْهُمْ',
    english:
      'The most incapable of people is the one who is incapable of acquiring brothers, and more incapable still is the one who loses those he has gained.',
    source: 'Nahj al-Balagha, Saying 12',
    theme: 'on value of brothers, on keeping friends, on loss of companions',
  },
  {
    arabic: 'إِذَا احْتَشَمَ الْمُؤْمِنُ أَخَاهُ فَقَدْ فَارَقَهُ',
    english: 'When a believer feels formality before his brother, he has already parted from him.',
    source: 'Nahj al-Balagha, Saying 480',
    theme: 'on intimacy of brothers, on formality kills friendship, on true closeness',
  },
  {
    arabic: 'صَدِيقُكَ مَنْ نَهَاكَ، وَعَدُوُّكَ مَنْ أَغْرَاكَ',
    english: 'Your friend is the one who restrains you, and your enemy is the one who incites you.',
    source: 'Ghurar al-Hikam',
    theme: 'on true friend versus flatterer, on restraint from sin, on marks of friendship',
  },
  {
    arabic:
      'لَا يَكُونُ الصَّدِيقُ صَدِيقًا حَتَّى يَحْفَظَ أَخَاهُ فِي ثَلَاثٍ: فِي نَكْبَتِهِ، وَغَيْبَتِهِ، وَوَفَاتِهِ',
    english:
      'A friend is not truly a friend until he safeguards his brother in three: in his calamity, in his absence, and after his death.',
    source: 'Nahj al-Balagha, Saying 134',
    theme: 'on rights of brotherhood, on defending in absence, on loyalty after death, on testing friendship',
  },
  {
    arabic: 'لَا يُعْرَفُ الصَّدِيقُ إِلَّا عِنْدَ حَاجَةِ الصَّدِيقِ',
    english: "A friend is not known except at the time of his friend's need.",
    source: 'Ghurar al-Hikam',
    theme: 'on testing a friend, on adversity reveals friends, on true companionship',
  },
  {
    arabic: 'فِي الشِّدَّةِ يُخْتَبَرُ الصَّدِيقُ',
    english: 'In hardship the friend is tested.',
    source: 'Ghurar al-Hikam',
    theme: 'on testing a friend, on adversity, on true companionship',
  },
  {
    arabic: 'صَدِيقُ كُلِّ امْرِئٍ عَقْلُهُ، وَعَدُوُّهُ جَهْلُهُ',
    english: "Every person's friend is their intellect, and their enemy is their ignorance.",
    source: 'Nahj al-Balagha, Saying 38',
    theme: 'on intellect as companion, on inner friendship, on wisdom',
  },
  {
    arabic: 'لَا تَصْحَبْ مَنْ لَا عَقْلَ لَهُ',
    english: 'Do not keep company with one who has no intellect.',
    source: 'Ghurar al-Hikam',
    theme: 'on choosing companions, on avoiding the foolish, on cost of bad company',
  },
  {
    arabic:
      'صَاحِبِ الْحُكَمَاءَ، وَجَالِسِ الْعُلَمَاءَ، وَأَعْرِضْ عَنِ الدُّنْيَا، تَسْكُنْ جَنَّةَ الْمَأْوَى',
    english:
      'Keep company with the wise, sit with the learned, and turn away from the world; you will dwell in the Garden of Refuge.',
    source: 'Ghurar al-Hikam',
    theme: 'on choosing companions, on sitting with the wise, on good company elevates',
  },
  {
    arabic: 'مُجَالَسَةُ الْأَشْرَارِ تُورِثُ سُوءَ الظَّنِّ بِالْأَخْيَارِ',
    english: 'Sitting with the wicked bequeaths an evil opinion of the righteous.',
    source: 'Ghurar al-Hikam',
    theme: 'on cost of bad companions, on corruption of judgment, on choosing companions',
  },
  {
    arabic:
      'أَعْجَزُ النَّاسِ مَنْ قَدَرَ عَلَى أَنْ يُزِيلَ الْفَقْرَ عَنْ نَفْسِهِ بِصِلَةِ إِخْوَانِهِ، فَلَمْ يَفْعَلْ',
    english:
      'The most incapable of people is one who is able to remove poverty from himself by maintaining the bond with his brothers, yet does not do so.',
    source: 'Ghurar al-Hikam',
    theme: 'on maintaining bonds, on visiting brothers, on rights of brotherhood',
  },
  {
    arabic: 'لَا خَيْرَ فِي صُحْبَةِ مَنْ يَرَى لَكَ مِنَ الْحَقِّ مَا يَرَى لِنَفْسِهِ',
    english: 'There is no good in the company of one who does not see for you the same right he sees for himself.',
    source: 'Nahj al-Balagha, Saying 113 (in part)',
    theme: 'on rights of brotherhood, on equality between friends, on choosing companions',
  },
  {
    arabic:
      'إِذَا كَانَ الرِّفْقُ خُرْقًا كَانَ الْخُرْقُ رِفْقًا، رُبَّمَا كَانَ الدَّوَاءُ دَاءً وَالدَّاءُ دَوَاءً، وَرُبَّمَا نَصَحَ غَيْرُ النَّاصِحِ وَغَشَّ الْمُسْتَنْصَحُ',
    english:
      'When gentleness becomes folly, then folly becomes gentleness; the remedy may be the disease and the disease the remedy; and sometimes one not counted as an adviser gives sincere counsel, while one whose counsel is sought betrays.',
    source: 'Nahj al-Balagha, Saying 397',
    theme: 'on flatterer versus true friend, on deception of counsel, on hidden sincerity',
  },
  {
    arabic: 'مَنْ لَانَ عُودُهُ كَثُفَتْ أَغْصَانُهُ',
    english: "Whoever's stem is supple, his branches grow thick — friends gather to the gentle.",
    source: 'Nahj al-Balagha, Saying 214',
    theme: 'on gentleness attracts friends, on character draws companions, on ease in company',
  },

  // ── Justice & speaking truth to power ────────────────────────────
  {
    arabic: 'الْعَدْلُ أَسَاسٌ بِهِ قِوَامُ الْعَالَمِ',
    english: 'Justice is the foundation upon which the world stands.',
    source: 'Ghurar al-Hikam',
    theme: 'on justice as foundation, on cosmic order, on the basis of authority',
  },
  {
    arabic: 'الْعَدْلُ حَيَاةٌ، وَالْجَوْرُ مَمَاتٌ',
    english: 'Justice is life, and tyranny is death.',
    source: 'Ghurar al-Hikam',
    theme: 'on justice gives life, on oppression as death',
  },
  {
    arabic:
      'الظُّلْمُ ثَلَاثَةٌ: ظُلْمٌ لَا يُغْفَرُ، وَظُلْمٌ لَا يُتْرَكُ، وَظُلْمٌ مَغْفُورٌ لَا يُطْلَبُ. فَأَمَّا الظُّلْمُ الَّذِي لَا يُغْفَرُ فَالشِّرْكُ بِاللَّهِ، وَأَمَّا الظُّلْمُ الَّذِي يُغْفَرُ فَظُلْمُ الْعَبْدِ نَفْسَهُ، وَأَمَّا الظُّلْمُ الَّذِي لَا يُتْرَكُ فَظُلْمُ الْعِبَادِ بَعْضِهِمْ بَعْضًا',
    english:
      'Oppression is of three kinds: an oppression that will not be forgiven, an oppression that will not be left unpunished, and an oppression that will be forgiven without being pursued. The unforgiven oppression is associating partners with God. The forgiven oppression is the servant\'s wrong against himself. The oppression that will not be left unpunished is the wrong of people against one another.',
    source: 'Nahj al-Balagha, Sermon 176',
    theme: 'on categories of oppression, on ẓulm, on divine accountability',
  },
  {
    arabic:
      'وَاللَّهِ لَوْ أُعْطِيتُ الْأَقَالِيمَ السَّبْعَةَ بِمَا تَحْتَ أَفْلَاكِهَا، عَلَى أَنْ أَعْصِيَ اللَّهَ فِي نَمْلَةٍ أَسْلُبُهَا جُلْبَ شَعِيرَةٍ، مَا فَعَلْتُهُ',
    english:
      'By God, were I given the seven climes with all that lies beneath their skies, that I might disobey God by snatching the husk of a barley grain from an ant — I would not do it.',
    source: 'Nahj al-Balagha, Sermon 224',
    theme: 'on absolute refusal of injustice, on even smallest injustice, on a ruler\'s restraint',
  },
  {
    arabic:
      'إِنَّ أَفْضَلَ قُرَّةِ عَيْنِ الْوُلَاةِ اسْتِقَامَةُ الْعَدْلِ فِي الْبِلَادِ، وَظُهُورُ مَوَدَّةِ الرَّعِيَّةِ',
    english:
      'The best delight of the eyes of rulers is the establishment of justice throughout the land, and the manifest love of the people.',
    source: 'Nahj al-Balagha, Letter 53 (to Malik al-Ashtar)',
    theme: 'on justice as foundation of authority, on legitimacy through justice',
  },
  {
    arabic: 'إِنَّ أَعْظَمَ الْخِيَانَةِ خِيَانَةُ الْأُمَّةِ، وَأَفْظَعَ الْغِشِّ غِشُّ الْأَئِمَّةِ',
    english:
      'The greatest betrayal is the betrayal of the community; the most heinous deception is the deception by leaders of their people.',
    source: 'Nahj al-Balagha, Letter 26',
    theme: 'on betrayal of the people, on accountability of rulers, on public trust',
  },
  {
    arabic:
      'وَلَا تَقُولَنَّ: إِنِّي مُؤَمَّرٌ آمُرُ فَأُطَاعُ، فَإِنَّ ذَلِكَ إِدْغَالٌ فِي الْقَلْبِ، وَمَنْهَكَةٌ لِلدِّينِ، وَتَقَرُّبٌ مِنَ الْغِيَرِ',
    english:
      "Never say, 'I am vested with command; I order and am obeyed' — for that is corruption in the heart, a weakening of the religion, and a drawing near to disaster.",
    source: 'Nahj al-Balagha, Letter 53',
    theme: 'on arrogance of power, on abuse of authority, on corruption of the heart',
  },
  {
    arabic:
      'وَلْيَكُنْ أَبْغَضُ الرَّعِيَّةِ إِلَيْكَ وَأَقْصَاهُمْ مِنْكَ أَطْلَبَهُمْ لِمَعَايِبِ النَّاسِ',
    english:
      'Let the most hated of the people to you, and the most distant from you, be the one most eager to search out the faults of others.',
    source: 'Nahj al-Balagha, Letter 53',
    theme: 'on guarding the people, on against informers, on justice in judging others',
  },
  {
    arabic:
      'وَلَا يَكُونَنَّ الْمُحْسِنُ وَالْمُسِيءُ عِنْدَكَ بِمَنْزِلَةٍ سَوَاءٍ، فَإِنَّ فِي ذَلِكَ تَزْهِيدًا لِأَهْلِ الْإِحْسَانِ فِي الْإِحْسَانِ، وَتَدْرِيبًا لِأَهْلِ الْإِسَاءَةِ عَلَى الْإِسَاءَةِ',
    english:
      'Let not the doer of good and the doer of evil stand equal before you; for that discourages the doers of good in their goodness, and trains the doers of evil in their evil.',
    source: 'Nahj al-Balagha, Letter 53',
    theme: 'on discerning justice, on moral consequence, on the duty to reward and punish',
  },
  {
    arabic:
      'وَإِيَّاكَ وَالدِّمَاءَ وَسَفْكَهَا بِغَيْرِ حِلِّهَا، فَإِنَّهُ لَيْسَ شَيْءٌ أَدْعَى لِنِقْمَةٍ، وَلَا أَعْظَمَ لِتَبِعَةٍ، وَلَا أَحْرَى بِزَوَالِ نِعْمَةٍ، وَانْقِطَاعِ مُدَّةٍ، مِنْ سَفْكِ الدِّمَاءِ بِغَيْرِ حَقِّهَا',
    english:
      'Beware of blood and of shedding it unlawfully; for nothing more swiftly invites retribution, nor carries greater consequence, nor more surely brings the removal of blessing and the cutting short of a reign, than the shedding of blood without right.',
    source: 'Nahj al-Balagha, Letter 53',
    theme: 'on sanctity of life, on gravity of bloodshed, on accountability for violence',
  },
  {
    arabic: 'الذُّلُّ مَعَ الْعَدْلِ خَيْرٌ مِنَ الْعِزِّ مَعَ الْجَوْرِ',
    english: 'Humiliation with justice is better than honour with tyranny.',
    source: 'Ghurar al-Hikam',
    theme: 'on preferring justice over power, on integrity, on the moral cost of complicity',
  },
  {
    arabic: 'مَنْ ظَلَمَ عِبَادَ اللَّهِ كَانَ اللَّهُ خَصْمَهُ دُونَ عِبَادِهِ',
    english: 'Whoever wrongs the servants of God, God Himself becomes his adversary in place of His servants.',
    source: 'Nahj al-Balagha, Letter 53',
    theme: 'on divine adversary of the oppressor, on accountability before God, on defense of the wronged',
  },
  {
    arabic: 'لَا تَرَى الْجَاهِلَ إِلَّا مُفْرِطًا أَوْ مُفَرِّطًا',
    english: 'You will not find the ignorant except in excess or in neglect.',
    source: 'Nahj al-Balagha, Saying 70',
    theme: 'on ignorance breeds injustice, on moderation, on the middle way',
  },
  {
    arabic: 'كُونَا لِلظَّالِمِ خَصْمًا، وَلِلْمَظْلُومِ عَوْنًا',
    english: 'Be both of you an adversary to the oppressor and a helper to the oppressed.',
    source: 'Nahj al-Balagha, Letter 47 (to al-Hasan and al-Husayn)',
    theme: 'on siding with the oppressed, on opposing the oppressor, on the believer\'s duty of witness',
  },
  {
    arabic: 'وَلَا تَخْشَ فِي اللَّهِ لَوْمَةَ لَائِمٍ',
    english: 'And do not fear, in matters of God, the blame of any blamer.',
    source: 'Nahj al-Balagha, Letter 47',
    theme: 'on speaking truth, on the courage of bearing witness, on fearlessness in justice',
  },
  {
    arabic:
      'الرَّاضِي بِفِعْلِ قَوْمٍ كَالدَّاخِلِ فِيهِ مَعَهُمْ، وَعَلَى كُلِّ دَاخِلٍ فِي بَاطِلٍ إِثْمَانِ: إِثْمُ الْعَمَلِ بِهِ، وَإِثْمُ الرِّضَا بِهِ',
    english:
      'Whoever is content with the deed of a people is as one who has joined them in it; and upon everyone who enters into falsehood are two sins — the sin of acting upon it and the sin of being pleased with it.',
    source: 'Nahj al-Balagha, Saying 154',
    theme: 'on silence as complicity, on consent to injustice, on the duty to dissent',
  },
  {
    arabic: 'أَفْضَلُ الْجِهَادِ كَلِمَةُ عَدْلٍ عِنْدَ إِمَامٍ جَائِرٍ',
    english: 'The greatest struggle is a word of justice before a tyrannical ruler.',
    source: 'Ghurar al-Hikam',
    theme: 'on speaking truth to power, on jihad of the tongue, on witness against tyranny',
  },
  {
    arabic: 'مَنْ أَسْرَعَ إِلَى النَّاسِ بِمَا يَكْرَهُونَ قَالُوا فِيهِ بِمَا لَا يَعْلَمُونَ',
    english: 'Whoever is quick to do to people what they detest, they will say of him what they do not even know.',
    source: 'Nahj al-Balagha, Saying 35',
    theme: 'on consequences of injustice, on reciprocity, on how small wrongs grow',
  },
  {
    arabic: 'يَوْمُ الْعَدْلِ عَلَى الظَّالِمِ أَشَدُّ مِنْ يَوْمِ الْجَوْرِ عَلَى الْمَظْلُومِ',
    english: 'The day of justice upon the oppressor will be more severe than the day of oppression upon the oppressed.',
    source: 'Nahj al-Balagha, Saying 341',
    theme: 'on divine reckoning, on the oppressor\'s fate, on hope for the wronged',
  },

  // ── Speech & silence ─────────────────────────────────────────────
  {
    arabic: 'اللِّسَانُ سَبُعٌ، إِنْ خُلِّيَ عَنْهُ عَقَرَ',
    english: 'The tongue is a beast of prey — if it is let loose, it wounds.',
    source: 'Nahj al-Balagha, Saying 60',
    theme: 'on the tongue as danger, on the power of the tongue',
  },
  {
    arabic: 'إِذَا تَمَّ الْعَقْلُ نَقَصَ الْكَلَامُ',
    english: 'When the intellect is complete, speech grows scarce.',
    source: 'Nahj al-Balagha, Saying 71',
    theme: 'on silence as wisdom, on the wise being brief',
  },
  {
    arabic:
      'الْكَلَامُ فِي وَثَاقِكَ مَا لَمْ تَتَكَلَّمْ بِهِ، فَإِذَا تَكَلَّمْتَ بِهِ صِرْتَ فِي وَثَاقِهِ',
    english: 'Speech is in your bond so long as you have not uttered it; once you have uttered it, you are in its bond.',
    source: 'Nahj al-Balagha (saying)',
    theme: 'on weighing words, on the irrevocability of speech',
  },
  {
    arabic: 'لِسَانُ الْعَاقِلِ وَرَاءَ قَلْبِهِ، وَقَلْبُ الْأَحْمَقِ وَرَاءَ لِسَانِهِ',
    english: 'The tongue of the wise lies behind his heart; the heart of the fool lies behind his tongue.',
    source: 'Nahj al-Balagha, Saying 40',
    theme: 'on weighing words, on speech reveals character',
  },
  {
    arabic:
      'مَا الْإِنْسَانُ لَوْلَا اللِّسَانُ إِلَّا صُورَةٌ مُمَثَّلَةٌ، أَوْ بَهِيمَةٌ مُهْمَلَةٌ',
    english:
      'Were it not for the tongue, the human being would be no more than a fashioned image, or an idle beast.',
    source: 'Nahj al-Balagha (saying)',
    theme: 'on the tongue as power, on what makes us human',
  },
  {
    arabic: 'الصَّمْتُ حِكْمَةٌ، وَالصَّمْتُ زَيْنُ الْعَالِمِ وَسِتْرُ الْجَاهِلِ',
    english: 'Silence is wisdom; silence is the adornment of the learned and the veil of the ignorant.',
    source: 'Ghurar al-Hikam',
    theme: 'on silence as wisdom, on the discipline of silence',
  },
  {
    arabic: 'احْفَظْ لِسَانَكَ كَمَا تَحْفَظُ ذَهَبَكَ وَوَرِقَكَ',
    english: 'Guard your tongue as you guard your gold and silver.',
    source: 'Ghurar al-Hikam',
    theme: 'on guarding the tongue',
  },
  {
    arabic: 'زِنْ كَلَامَكَ قَبْلَ أَنْ تُخْرِجَهُ مِنْ فِيكَ',
    english: 'Weigh your speech before you let it leave your mouth.',
    source: 'Ghurar al-Hikam',
    theme: 'on weighing words',
  },
  {
    arabic: 'مَا مِنْ شَيْءٍ أَحَقَّ بِطُولِ السِّجْنِ مِنَ اللِّسَانِ',
    english: 'Nothing is more deserving of long imprisonment than the tongue.',
    source: 'Ghurar al-Hikam',
    theme: 'on guarding the tongue',
  },
  {
    arabic: 'سِرُّكَ أَسِيرُكَ، فَإِنْ أَفْشَيْتَهُ صِرْتَ أَسِيرَهُ',
    english: 'Your secret is your captive; if you divulge it, you become its captive.',
    source: 'Nahj al-Balagha (saying)',
    theme: 'on secret-keeping, on kitmān al-sirr',
  },
  {
    arabic: 'صَدْرُ الْعَاقِلِ صُنْدُوقُ سِرِّهِ',
    english: 'The breast of the wise is the strongbox of his secret.',
    source: 'Nahj al-Balagha, Saying 6',
    theme: 'on secret-keeping, on the wise hold their counsel',
  },
  {
    arabic: 'كِتْمَانُ السِّرِّ مِنْ نَبَائِلِ الْخِصَالِ، وَإِفْشَاؤُهُ مِنْ أَرْذَلِ الْأَفْعَالِ',
    english: 'The keeping of a secret is among the noblest of traits; the divulging of it among the basest of deeds.',
    source: 'Ghurar al-Hikam',
    theme: 'on secret-keeping, on kitmān al-sirr',
  },
  {
    arabic:
      'مَا أَضْمَرَ أَحَدٌ شَيْئًا إِلَّا ظَهَرَ فِي فَلَتَاتِ لِسَانِهِ وَصَفَحَاتِ وَجْهِهِ',
    english:
      'No one conceals anything within but that it shows in the slips of his tongue and the pages of his face.',
    source: 'Nahj al-Balagha, Saying 26',
    theme: 'on the tongue reveals the heart',
  },
  {
    arabic: 'يَنَامُ الرَّجُلُ عَلَى الثُّكْلِ، وَلَا يَنَامُ عَلَى الْحَرَبِ',
    english: 'A man may sleep over the loss of a child, but he will not sleep over plundered words.',
    source: 'Nahj al-Balagha, Saying 307',
    theme: 'on weighing words, on the weight of speech',
  },
  {
    arabic:
      'إِيَّاكَ وَالْكَلَامَ فِيمَا لَا تَعْرِفُ، فَإِنَّ أَكْثَرَ الصَّوَابِ فِي أَنْ لَا تَتَكَلَّمَ إِذَا لَمْ تَعْلَمْ',
    english:
      'Beware of speaking about what you do not know — much of what is right lies in not speaking when you have no knowledge.',
    source: 'Ghurar al-Hikam',
    theme: 'on silence as wisdom, on not speaking without knowledge',
  },
  {
    arabic:
      'لَا تَتَكَلَّمْ بِكَلِمَةٍ فِي حَالِ الْغَضَبِ، فَإِنَّكَ تَنْدَمُ عَلَيْهَا إِذَا سَكَنَ غَضَبُكَ',
    english:
      'Do not utter a single word in the state of anger, for you will regret it once your anger has subsided.',
    source: 'Ghurar al-Hikam',
    theme: 'on speaking in anger',
  },
  {
    arabic: 'رُبَّ كَلَامٍ أَنْفَذُ مِنْ سِهَامٍ',
    english: 'Many a word pierces deeper than arrows.',
    source: 'Ghurar al-Hikam',
    theme: 'on the tongue as power, on the wound of words',
  },
  {
    arabic: 'لِسَانُكَ يَسْتَدْعِي لَكَ النِّعْمَةَ وَيَجْلِبُ عَلَيْكَ النِّقْمَةَ',
    english: 'Your tongue summons blessings to you, and it draws calamities upon you.',
    source: 'Ghurar al-Hikam',
    theme: 'on the tongue as power, on speech as cause',
  },
  {
    arabic: 'مَا يَنْطِقُ بِهِ لِسَانُكَ هُوَ مَا يَنْطَوِي عَلَيْهِ قَلْبُكَ',
    english: 'What your tongue gives voice to is what your heart folds within.',
    source: 'Ghurar al-Hikam',
    theme: 'on the tongue reveals the heart',
  },
  {
    arabic:
      'إِنَّ هَذَا اللِّسَانَ جَمُوحٌ بِصَاحِبِهِ، وَاللَّهِ مَا أَرَى عَبْدًا يَتَّقِي تَقْوًى تَنْفَعُهُ حَتَّى يَخْزُنَ لِسَانَهُ',
    english:
      'Truly this tongue runs away with its owner — by God, I do not see a servant attain a piety that profits him until he locks away his tongue.',
    source: 'Nahj al-Balagha, Saying 174',
    theme: 'on guarding the tongue, on piety begins at the lips',
  },

  // ── Specific hardships & sabr ───────────────────────────────────
  {
    arabic: 'الصَّبْرُ صَبْرَانِ: صَبْرٌ عَلَى مَا تَكْرَهُ، وَصَبْرٌ عَمَّا تُحِبُّ',
    english: 'Patience is of two kinds: patience over what you dislike, and patience away from what you love.',
    source: 'Nahj al-Balagha, Saying 55',
    theme: 'on the two faces of sabr',
  },
  {
    arabic:
      'إِنَّ عَظِيمَ الْأَجْرِ مَعَ عَظِيمِ الْبَلَاءِ، وَمَا أَحَبَّ اللَّهُ قَوْمًا إِلَّا ابْتَلَاهُمْ',
    english: 'Great reward comes with great trial; God does not love a people without testing them.',
    source: "al-Kafi, Kitab al-Iman wa al-Kufr",
    theme: 'on trial as a sign of love',
  },
  {
    arabic: 'الْمُؤْمِنُ مِنَ الْبَلَاءِ أَقْرَبُ مِنَ الْمَطَرِ إِلَى الْأَرْضِ',
    english: 'The believer is nearer to affliction than rain is to the earth.',
    source: "al-Kafi, Kitab al-Iman wa al-Kufr",
    theme: "on the believer's lot, on the closeness of trial",
  },
  {
    arabic:
      'لَوْ يَعْلَمُ الْمُؤْمِنُ مَا لَهُ فِي الْمَصَائِبِ مِنَ الْأَجْرِ لَتَمَنَّى أَنَّهُ قُرِّضَ بِالْمَقَارِيضِ',
    english: 'If the believer knew the reward stored for him in calamities, he would wish to be cut with shears.',
    source: "al-Kafi, Kitab al-Iman wa al-Kufr",
    theme: 'on the hidden wage of grief',
  },
  {
    arabic: 'الْمَرَضُ سَوْطُ اللَّهِ فِي الْأَرْضِ يُؤَدِّبُ بِهِ عِبَادَهُ',
    english: "Illness is God's whip in the earth, by which He disciplines His servants.",
    source: "al-Kafi, Kitab al-Jana'iz",
    theme: 'on what illness teaches, on the meaning of sickness',
  },
  {
    arabic: 'سَهَرُ لَيْلَةٍ مِنْ مَرَضٍ أَفْضَلُ مِنْ عِبَادَةِ سَنَةٍ',
    english: 'One sleepless night of sickness outweighs a year of worship.',
    source: "al-Kafi, Kitab al-Jana'iz",
    theme: 'on the worth of the sickbed, on illness',
  },
  {
    arabic:
      'إِنَّ لِلَّهِ فِي كُلِّ نِعْمَةٍ حَقًّا، فَمَنْ أَدَّاهُ زَادَهُ، وَمَنْ قَصَّرَ فِيهِ خَاطَرَ بِزَوَالِ نِعْمَتِهِ',
    english:
      'God has a right within every blessing — whoever pays it, He increases it; whoever neglects it risks its loss.',
    source: 'Nahj al-Balagha, Saying 244',
    theme: 'on gratitude in the trial of ease',
  },
  {
    arabic: 'إِذَا أَحَبَّ اللَّهُ عَبْدًا غَتَّهُ بِالْبَلَاءِ غَتًّا',
    english: 'When God loves a servant, He plunges him deep into affliction.',
    source: "al-Kafi, Kitab al-Iman wa al-Kufr",
    theme: 'on the depth of the test, on trial as nearness',
  },
  {
    arabic:
      'اصْبِرْ عَلَى مَرَارَةِ الْحَقِّ، وَإِيَّاكَ أَنْ تَنْخَدِعَ بِحَلَاوَةِ الْبَاطِلِ',
    english: 'Endure the bitterness of truth; beware being seduced by the sweetness of falsehood.',
    source: 'Ghurar al-Hikam',
    theme: 'on when the right path costs you',
  },
  {
    arabic:
      'وَاعْلَمْ أَنَّ الَّذِي بِيَدِهِ خَزَائِنُ السَّمَاوَاتِ وَالْأَرْضِ قَدْ أَذِنَ لَكَ فِي الدُّعَاءِ، وَتَكَفَّلَ لَكَ بِالْإِجَابَةِ',
    english:
      'Know that the One whose hand holds the treasuries of the heavens and earth has permitted you to ask, and pledged Himself to answer.',
    source: 'Nahj al-Balagha, Letter 31 (to Imam al-Hasan)',
    theme: "when du'a feels unanswered",
  },
  {
    arabic: 'وَقَدْ جَعَلَ مَفَاتِيحَهَا بِيَدِكَ، وَأَذِنَ لَكَ فِي قَرْعِ بَابِهِ',
    english: 'He placed the keys of His mercy in your hand and gave you leave to knock at His door.',
    source: 'Nahj al-Balagha, Letter 31',
    theme: "when du'a feels unanswered, on keep knocking",
  },
  {
    arabic:
      'لَا تَيْأَسَنَّ لِشَرِّ هَذِهِ الدُّنْيَا وَخَيْرِهَا، فَإِنَّ الشَّرَّ يَنْقَطِعُ وَالْخَيْرَ يَزُولُ',
    english: 'Despair not over the evil or the good of this world — its evil ends, and its good passes away.',
    source: 'Ghurar al-Hikam',
    theme: 'on the end of every grief, on impermanence',
  },
  {
    arabic: 'إِنَّ الْأُمُورَ إِذَا اشْتَبَهَتْ اعْتُبِرَ آخِرُهَا بِأَوَّلِهَا',
    english: 'When matters grow tangled, their end is to be judged by their beginning.',
    source: 'Nahj al-Balagha, Saying 168',
    theme: 'on long-stretched trial, on reading by the start',
  },
  {
    arabic:
      'الدَّهْرُ يَوْمَانِ: يَوْمٌ لَكَ وَيَوْمٌ عَلَيْكَ، فَإِذَا كَانَ لَكَ فَلَا تَبْطَرْ، وَإِذَا كَانَ عَلَيْكَ فَاصْبِرْ',
    english:
      'Time is two days: a day for you and a day against you. When it is for you, do not exult; when it is against you, be patient.',
    source: 'Nahj al-Balagha, Saying 396',
    theme: 'on the turning of days',
  },
  {
    arabic: 'مَنْ ضَاقَ بِهِ أَمْرٌ فَلْيَنْتَظِرْ فَرَجًا، فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',
    english: 'Whoever is constricted by an affair, let him await relief — for with hardship comes ease.',
    source: 'Ghurar al-Hikam',
    theme: 'on after every hardship is ease',
  },
  {
    arabic:
      'عِنْدَ تَنَاهِي الشِّدَّةِ تَكُونُ الْفُرْجَةُ، وَعِنْدَ تَضَايُقِ حَلَقَاتِ الْبَلَاءِ يَكُونُ الرَّخَاءُ',
    english:
      'At the utmost of hardship is the opening; when the rings of affliction close tightest, ease arrives.',
    source: 'Nahj al-Balagha, Saying 351',
    theme: 'on the dawn at the darkest hour, on long-stretched trial',
  },
  {
    arabic: 'كَفَى بِالْأَجَلِ حَارِسًا، مَا كُلُّ النَّاسِ يَدْعُو فَيُسْتَجَابُ لَهُ',
    english: 'The appointed term suffices as guardian; not every supplicant is answered in his moment.',
    source: 'Ghurar al-Hikam',
    theme: "on the delay of the answer, when du'a feels unanswered",
  },
  {
    arabic:
      'مَنْ صَبَرَ عَلَى مُصِيبَةٍ زَادَتْهُ عِزًّا، وَمَنْ شَكَرَ عَلَى نِعْمَةٍ زَادَتْهُ كَرَامَةً',
    english:
      'Whoever endures a calamity, it adds to his honour; whoever thanks for a blessing, it adds to his dignity.',
    source: 'Ghurar al-Hikam',
    theme: 'on what sabr leaves behind',
  },
  {
    arabic: 'احْتَمِلْ مَا يَمُرُّ بِكَ مِنْ لَأْوَاءَ، فَعَمَّا قَلِيلٍ تَنْكَشِفُ غَمَّتُكَ',
    english: 'Bear the hardship that passes over you — in a little while your gloom will be lifted.',
    source: 'Ghurar al-Hikam',
    theme: 'on the test stretches but ends',
  },
  {
    arabic:
      'إِنَّمَا الْمَرْءُ فِي الدُّنْيَا غَرَضٌ تَنْتَضِلُ فِيهِ الْمَنَايَا، وَنَهْبٌ تُبَادِرُهُ الْمَصَائِبُ',
    english: 'Man in this world is a target the arrows of fate aim at, a spoil the calamities race to seize.',
    source: 'Nahj al-Balagha, Saying 191',
    theme: 'on the human condition under trial',
  },

  // ── Tawba (repentance & return) ──────────────────────────────────
  {
    arabic:
      'التَّوْبَةُ نَدَمٌ بِالْقَلْبِ، وَاسْتِغْفَارٌ بِاللِّسَانِ، وَتَرْكٌ بِالْجَوَارِحِ، وَإِضْمَارُ أَلَّا يَعُودَ',
    english:
      'Repentance is regret with the heart, seeking forgiveness with the tongue, abandonment with the limbs, and the firm resolve never to return.',
    source: 'Ghurar al-Hikam',
    theme: 'on tawba, when wanting to know what real return is, when words feel empty',
  },
  {
    arabic:
      'وَيْحَكَ! أَتَدْرِي مَا الِاسْتِغْفَارُ؟ الِاسْتِغْفَارُ دَرَجَةُ الْعِلِّيِّينَ، وَهُوَ اسْمٌ وَاقِعٌ عَلَى سِتَّةِ مَعَانٍ',
    english:
      'Woe to you! Do you know what istighfar is? Seeking forgiveness is the rank of the highest ones, and it is a name that falls upon six meanings.',
    source: 'Nahj al-Balagha, Saying 417',
    theme: 'on istighfar, when reciting astaghfirullah without weight',
  },
  {
    arabic:
      'أَوَّلُهَا: النَّدَمُ عَلَى مَا مَضَى. وَالثَّانِي: الْعَزْمُ عَلَى تَرْكِ الْعَوْدِ إِلَيْهِ أَبَدًا. وَالثَّالِثُ: أَنْ تُؤَدِّيَ إِلَى الْمَخْلُوقِينَ حُقُوقَهُمْ حَتَّى تَلْقَى اللَّهَ أَمْلَسَ لَيْسَ عَلَيْكَ تَبِعَةٌ',
    english:
      'The first: regret for what has passed. The second: the firm resolve never to return to it. The third: to render to creatures their due rights until you meet God smooth, with no claim upon you.',
    source: 'Nahj al-Balagha, Saying 417',
    theme: 'on the six conditions of tawba, when there are wrongs to set right',
  },
  {
    arabic:
      'وَالرَّابِعُ: أَنْ تَعْمِدَ إِلَى كُلِّ فَرِيضَةٍ عَلَيْكَ ضَيَّعْتَهَا فَتُؤَدِّيَ حَقَّهَا. وَالْخَامِسُ: أَنْ تَعْمِدَ إِلَى اللَّحْمِ الَّذِي نَبَتَ عَلَى السُّحْتِ فَتُذِيبَهُ بِالْأَحْزَانِ. وَالسَّادِسُ: أَنْ تُذِيقَ الْجِسْمَ أَلَمَ الطَّاعَةِ كَمَا أَذَقْتَهُ حَلَاوَةَ الْمَعْصِيَةِ. فَعِنْدَ ذَلِكَ تَقُولُ: أَسْتَغْفِرُ اللَّهَ',
    english:
      'The fourth: to address every obligation you neglected and render its right. The fifth: to direct yourself to the flesh that grew upon what was unlawful and melt it away with grief. The sixth: to make the body taste the pain of obedience as you made it taste the sweetness of disobedience. Then say: I seek forgiveness from God.',
    source: 'Nahj al-Balagha, Saying 417',
    theme: 'on the six conditions of tawba, on the full path of return',
  },
  {
    arabic: 'الِاسْتِغْفَارُ بِاللِّسَانِ مِنْ غَيْرِ إِقْلَاعٍ عَنِ الذَّنْبِ تَوْبَةُ الْكَذَّابِينَ',
    english: "Seeking forgiveness with the tongue without ceasing from the sin is the repentance of liars.",
    source: 'Ghurar al-Hikam',
    theme: 'on tawba as more than words, when caught in the same sin again',
  },
  {
    arabic: 'تَرْكُ الذَّنْبِ أَيْسَرُ مِنْ طَلَبِ التَّوْبَةِ',
    english: 'Leaving the sin is easier than seeking repentance from it.',
    source: 'Ghurar al-Hikam',
    theme: 'on tawba, when tempted, when underestimating the weight of return',
  },
  {
    arabic:
      'كَمْ مِنْ صَائِمٍ لَيْسَ لَهُ مِنْ صِيَامِهِ إِلَّا الْجُوعُ وَالظَّمَأُ، وَكَمْ مِنْ قَائِمٍ لَيْسَ لَهُ مِنْ قِيَامِهِ إِلَّا السَّهَرُ وَالْعَنَاءُ',
    english:
      'How many a fasting one whose fast brings him nothing but hunger and thirst, and how many a one in prayer whose standing brings him nothing but sleeplessness and toil.',
    source: 'Nahj al-Balagha, Saying 145',
    theme: 'when worship feels hollow, when form is present but the heart is absent',
  },
  {
    arabic: 'لَا شَفِيعَ أَنْجَحُ مِنَ التَّوْبَةِ',
    english: 'There is no intercessor more successful than repentance.',
    source: 'Nahj al-Balagha, Saying 371',
    theme: 'on tawba, when feeling no one can plead for you',
  },
  {
    arabic:
      'لَا يَصْغُرُ مَا تَنْفَعُ مَعَهُ التَّوْبَةُ، وَلَا يَكْبُرُ مَا تَضُرُّ مَعَهُ التَّوْبَةُ',
    english: 'Nothing is small with which repentance benefits, and nothing is great with which repentance fails to benefit.',
    source: 'Ghurar al-Hikam',
    theme: 'on tawba, when feeling the sin is too great, when belittling a slip',
  },
  {
    arabic: 'النَّدَمُ عَلَى الْخَطِيئَةِ يَمْنَعُ مِنْ مُعَاوَدَتِهَا',
    english: 'Regret over the wrong prevents returning to it.',
    source: 'Ghurar al-Hikam',
    theme: 'on tawba, when wondering if your sorrow is real',
  },
  {
    arabic: 'الْحَيَاءُ مِنَ اللَّهِ يَمْحُو كَثِيرًا مِنَ الْخَطَايَا',
    english: 'Shame before God erases many of the wrongs.',
    source: 'Ghurar al-Hikam',
    theme: 'on tawba, when the burn of shame is the heart\'s last pulse',
  },
  {
    arabic:
      'مَنْ لَمْ يَسْتَحِ مِنَ اللَّهِ فِي عَلَانِيَتِهِ، لَمْ يَسْتَحِ مِنْهُ فِي سَرِيرَتِهِ',
    english: 'Whoever does not feel shame before God in his open conduct will not feel shame before Him in his hidden self.',
    source: 'Ghurar al-Hikam',
    theme: 'on tawba, on private sins, on the outer mask',
  },
  {
    arabic: 'التَّوْبَةُ تُطَهِّرُ الْقُلُوبَ وَتَغْسِلُ الذُّنُوبَ',
    english: 'Repentance purifies hearts and washes away sins.',
    source: 'Ghurar al-Hikam',
    theme: 'on tawba, when feeling stained, when the heart needs washing',
  },
  {
    arabic: 'ثَمَرَةُ التَّوْبَةِ اسْتِدْرَاكُ فَوَائِتِ الزَّمَانِ',
    english: 'The fruit of repentance is the recovery of what time has missed.',
    source: 'Ghurar al-Hikam',
    theme: 'on tawba, when grieving wasted years',
  },
  {
    arabic: 'سَوْفَ، وَلَعَلَّ، وَعَسَى، كَلِمَاتُ الْمُغْتَرِّينَ بِاللَّهِ',
    english: "'Soon,' 'perhaps,' and 'maybe' are the words of those deceived about God.",
    source: 'Ghurar al-Hikam',
    theme: 'on against postponing return, when telling yourself there is still time',
  },
  {
    arabic:
      'إِنَّ مِنْ أَحَبِّ عِبَادِ اللَّهِ إِلَيْهِ عَبْدًا أَعَانَهُ اللَّهُ عَلَى نَفْسِهِ، فَاسْتَشْعَرَ الْحُزْنَ، وَتَجَلْبَبَ الْخَوْفَ',
    english:
      "Among the most beloved of God's servants to Him is a servant whom God has helped against his own soul, so he wore sorrow as an undergarment and fear as an outer cloak.",
    source: 'Nahj al-Balagha, Sermon 87',
    theme: 'on the inner garment of the returning servant',
  },
  {
    arabic: 'أَفْضَلُ الِاسْتِغْفَارِ الْإِقْلَاعُ',
    english: 'The best form of seeking forgiveness is ceasing the sin.',
    source: 'Ghurar al-Hikam',
    theme: 'on istighfar, when stripping repentance to its essence',
  },
  {
    arabic: 'تَأْخِيرُ التَّوْبَةِ غُرُورٌ، وَطُولُ التَّسْوِيفِ حَيْرَةٌ',
    english: 'Delaying repentance is self-deception, and prolonged procrastination is bewilderment.',
    source: 'Ghurar al-Hikam',
    theme: 'on against postponing return, when waiting for a better moment',
  },
  {
    arabic: 'التَّائِبُ مِنَ الذَّنْبِ كَمَنْ لَا ذَنْبَ لَهُ',
    english: 'The one who repents from a sin is like one who has no sin.',
    source: "al-Kafi, Kitab al-Iman wa al-Kufr, Bab al-Tawba",
    theme: 'on tawba, when feeling unworthy after return',
  },

  // ── Rifq, ḥilm, mercy ───────────────────────────────────────────
  {
    arabic: 'الرِّفْقُ مِفْتَاحُ النَّجَاحِ',
    english: 'Gentleness is the key to success.',
    source: 'Ghurar al-Hikam',
    theme: 'on rifq, on gentleness',
  },
  {
    arabic: 'الرِّفْقُ يُيَسِّرُ الصِّعَابَ وَيُسَهِّلُ شَدِيدَ الْأَسْبَابِ',
    english: 'Gentleness makes the difficult easy and softens the hardest of matters.',
    source: 'Ghurar al-Hikam',
    theme: 'on rifq, on gentleness through hardship',
  },
  {
    arabic: 'الْحِلْمُ زِينَةٌ، وَالْوَفَاءُ مُرُوَّةٌ',
    english: 'Forbearance is an adornment; faithfulness is chivalry.',
    source: 'Nahj al-Balagha (saying)',
    theme: 'on ḥilm as character, on adornment',
  },
  {
    arabic:
      'إِذَا لَمْ تَكُنْ حَلِيمًا فَتَحَلَّمْ، فَإِنَّهُ قَلَّ مَنْ تَشَبَّهَ بِقَوْمٍ إِلَّا أَوْشَكَ أَنْ يَكُونَ مِنْهُمْ',
    english:
      'If you are not naturally forbearing, then pretend to be — for rarely does one imitate a people without soon becoming one of them.',
    source: 'Nahj al-Balagha, Saying 207',
    theme: 'on ḥilm as practice, on becoming what you imitate',
  },
  {
    arabic: 'أَوَّلُ عِوَضِ الْحَلِيمِ مِنْ حِلْمِهِ أَنَّ النَّاسَ أَنْصَارُهُ عَلَى الْجَاهِلِ',
    english: 'The first reward of the forbearing one for his forbearance is that people themselves become his allies against the ignorant.',
    source: 'Nahj al-Balagha, Saying 211',
    theme: 'on ḥilm as strength, on what hilm wins',
  },
  {
    arabic: 'الْحِلْمُ غِطَاءٌ سَاتِرٌ، وَالْعَقْلُ حُسَامٌ قَاطِعٌ، فَاسْتُرْ خَلَلَ خُلُقِكَ بِحِلْمِكَ',
    english: 'Forbearance is a covering veil, and intellect is a cutting sword — so cover the flaws of your character with your forbearance.',
    source: 'Nahj al-Balagha, Saying 424',
    theme: 'on ḥilm conceals flaws, on character',
  },
  {
    arabic: 'لَا حِلْمَ كَالصَّمْتِ',
    english: 'There is no forbearance like silence.',
    source: 'Nahj al-Balagha, Saying 113',
    theme: 'on ḥilm and silence, on gentleness in speech',
  },
  {
    arabic: 'الْحِلْمُ عَشِيرَةٌ',
    english: 'Forbearance is a whole tribe — it stands by you as kinsmen do.',
    source: 'Nahj al-Balagha, Saying 53',
    theme: 'on ḥilm as strength, on what hilm protects',
  },
  {
    arabic: 'ارْحَمُوا مَنْ دُونَكُمْ يَرْحَمْكُمْ مَنْ فَوْقَكُمْ',
    english: 'Show mercy to those beneath you, and the One above you will show mercy to you.',
    source: 'Ghurar al-Hikam',
    theme: 'on rifq with the weak, on mercy',
  },
  {
    arabic: 'الرَّفِيقُ مُوَافِقٌ، وَالرِّفْقُ رَافِقٌ',
    english: 'The gentle companion is in harmony with all, and gentleness itself walks beside him as a companion.',
    source: 'Ghurar al-Hikam',
    theme: 'on rifq, on gentleness in relationships',
  },
  {
    arabic: 'بِالرِّفْقِ تَدُومُ الصُّحْبَةُ',
    english: 'By gentleness, companionship endures.',
    source: 'Ghurar al-Hikam',
    theme: 'on rifq in relationships',
  },
  {
    arabic: 'الرِّفْقُ بِالْأَتْبَاعِ مِنْ كَرَمِ الطِّبَاعِ',
    english: "Gentleness with those under one's authority is the mark of a noble nature.",
    source: 'Ghurar al-Hikam',
    theme: 'on rifq with the weak, on gentleness in power',
  },
  {
    arabic: 'مَنْ تَرَكَ قَوْلَ «لَا أَدْرِي» أُصِيبَتْ مَقَاتِلُهُ',
    english: "Whoever abandons the saying 'I do not know' is struck in his vital places.",
    source: 'Nahj al-Balagha, Saying 85',
    theme: 'on gentleness in speech, on the humility of "I do not know"',
  },
  {
    arabic: 'الرِّفْقُ يُؤَدِّي إِلَى السَّلْمِ',
    english: 'Gentleness leads to peace.',
    source: 'Ghurar al-Hikam',
    theme: 'on rifq, on gentleness as the path to peace',
  },
  {
    arabic: 'أَفْضَلُ الْحِلْمِ كَظْمُ الْغَيْظِ وَمِلْكُ النَّفْسِ مَعَ الْقُدْرَةِ',
    english: 'The best forbearance is swallowing anger and mastering oneself when one has the power to strike.',
    source: 'Ghurar al-Hikam',
    theme: 'on ḥilm when provoked, on swallowing anger',
  },
  {
    arabic: 'الرِّفْقُ خَيْرُ قَرِينٍ، وَالْحِلْمُ خَيْرُ وَزِيرٍ',
    english: 'Gentleness is the best of companions, and forbearance the best of ministers.',
    source: 'Ghurar al-Hikam',
    theme: 'on rifq, on ḥilm',
  },
  {
    arabic: 'خَاتَمُ الْحِكْمَةِ الرِّفْقُ',
    english: 'The seal of wisdom is gentleness.',
    source: 'Ghurar al-Hikam',
    theme: 'on rifq as the seal of wisdom',
  },
  {
    arabic: 'مَنْ آتَاهُ اللَّهُ مَالًا فَلْيَصِلْ بِهِ الْقَرَابَةَ وَلْيُحْسِنْ مِنْهُ الضِّيَافَةَ',
    english: 'Whoever God has granted wealth, let him use it to join kin and to be generous in hospitality.',
    source: 'Nahj al-Balagha, Saying 142',
    theme: 'on kindness, on the duties of wealth',
  },

  // ── Family bonds, parents, kin ───────────────────────────────────
  {
    arabic: 'صِلْ مَنْ قَطَعَكَ، وَأَعْطِ مَنْ حَرَمَكَ، وَأَحْسِنْ إِلَى مَنْ أَسَاءَ إِلَيْكَ',
    english: 'Maintain ties with the one who has severed you, give to the one who has deprived you, and be kind to the one who has wronged you.',
    source: 'Nahj al-Balagha (saying)',
    theme: 'on ṣilat al-raḥim, on family at risk of fracture, on family bonds',
  },
  {
    arabic:
      'أَكْرِمْ عَشِيرَتَكَ، فَإِنَّهُمْ جَنَاحُكَ الَّذِي بِهِ تَطِيرُ، وَأَصْلُكَ الَّذِي إِلَيْهِ تَصِيرُ، وَيَدُكَ الَّتِي بِهَا تَصُولُ',
    english: 'Honour your kin, for they are the wing by which you fly, the root to which you return, and the hand by which you strike.',
    source: 'Nahj al-Balagha, Letter 31 (to Imam al-Hasan)',
    theme: 'on honouring kin, on family bonds',
  },
  {
    arabic:
      'وَلَا يَسْتَغْنِي الرَّجُلُ — وَإِنْ كَانَ ذَا مَالٍ — عَنْ عَشِيرَتِهِ وَدِفَاعِهِمْ عَنْهُ بِأَيْدِيهِمْ وَأَلْسِنَتِهِمْ',
    english: 'A man — even if he possesses wealth — is never independent of his kinsfolk, nor of their defence of him with their hands and their tongues.',
    source: 'Nahj al-Balagha, Sermon 23',
    theme: 'on the need for kin, on family bonds',
  },
  {
    arabic:
      'وَهُمْ أَعْظَمُ النَّاسِ حَيْطَةً مِنْ وَرَائِهِ، وَأَلَمُّهُمْ لِشَعَثِهِ، وَأَعْطَفُهُمْ عَلَيْهِ عِنْدَ نَازِلَةٍ إِنْ نَزَلَتْ بِهِ',
    english: 'They are the greatest of people in guarding his back, the most gathering of his scattered affairs, the most tender toward him when calamity descends.',
    source: 'Nahj al-Balagha, Sermon 23',
    theme: 'on what kin are for, on family bonds',
  },
  {
    arabic: 'أَكْرِمُوا أَوْلَادَكُمْ وَأَحْسِنُوا آدَابَهُمْ يُغْفَرْ لَكُمْ',
    english: 'Honour your children and refine their manners — you will be forgiven.',
    source: "al-Kafi, vol. 6, on the upbringing of children",
    theme: 'on the rights of the child, on parenting',
  },
  {
    arabic: 'إِنَّ اللَّهَ عَزَّ وَجَلَّ لَيَرْحَمُ الرَّجُلَ لِشِدَّةِ حُبِّهِ لِوَلَدِهِ',
    english: "God has mercy upon a man on account of the intensity of his love for his child.",
    source: "al-Kafi, vol. 6, on a man's love for his child",
    theme: "on a parent's love, on the rights of the child",
  },
  {
    arabic:
      'بِرُّوا آبَاءَكُمْ يَبَرَّكُمْ أَبْنَاؤُكُمْ، وَعِفُّوا عَنْ نِسَاءِ النَّاسِ تَعِفَّ نِسَاؤُكُمْ',
    english: 'Be dutiful to your fathers — your sons will be dutiful to you; and abstain from the women of others — your women will be kept chaste.',
    source: 'Nahj al-Balagha, Saying 259',
    theme: 'on birr al-wālidayn, on the rights of parents',
  },
  {
    arabic: 'وَحَقُّ الْوَلَدِ عَلَى الْوَالِدِ أَنْ يُحَسِّنَ اسْمَهُ، وَيُحَسِّنَ أَدَبَهُ، وَيُعَلِّمَهُ الْقُرْآنَ',
    english: 'The right of the child upon the parent is to give them a good name, refine their manners, and teach them the Qur\'an.',
    source: 'Nahj al-Balagha, Saying 399',
    theme: 'on the rights of the child, on parenting',
  },
  {
    arabic: 'وَحَقُّ الْوَالِدِ عَلَى الْوَلَدِ أَنْ يُطِيعَهُ فِي كُلِّ شَيْءٍ إِلَّا فِي مَعْصِيَةِ اللَّهِ سُبْحَانَهُ',
    english: 'The right of the parent upon the child is to obey him in everything — save in disobedience to God.',
    source: 'Nahj al-Balagha, Saying 399',
    theme: 'on the rights of parents, on birr al-wālidayn',
  },
  {
    arabic:
      'صِلَةُ الرَّحِمِ تَعْمُرُ الدِّيَارَ، وَتُطِيلُ الْأَعْمَارَ، وَإِنْ كَانَ أَهْلُهَا غَيْرَ أَخْيَارٍ',
    english: 'Maintaining the bonds of kinship populates the homes and lengthens the lifespans — even if its people are not of the righteous.',
    source: "al-Kafi, Bāb Ṣilat al-Raḥim",
    theme: 'on the fruits of ṣilat al-raḥim',
  },
  {
    arabic:
      'صِلْ رَحِمَكَ وَلَوْ بِشَرْبَةٍ مِنْ مَاءٍ، وَأَفْضَلُ مَا تُوصَلُ بِهِ الرَّحِمُ كَفُّ الْأَذَى عَنْهَا',
    english: 'Maintain your kinship even by a drink of water — and the best by which kinship is maintained is restraining harm from it.',
    source: "al-Kafi, Bāb Ṣilat al-Raḥim",
    theme: 'on ṣilat al-raḥim, on the minimum bond',
  },
  {
    arabic: 'قَطِيعَةُ الرَّحِمِ تُورِثُ الْفَقْرَ',
    english: 'The severing of kinship bequeaths poverty.',
    source: 'Ghurar al-Hikam',
    theme: 'on the cost of cutting bonds, on qaṭīʿat al-raḥim',
  },
  {
    arabic: 'إِنَّ أَعْجَلَ الشَّرِّ عُقُوبَةً قَطِيعَةُ الرَّحِمِ',
    english: 'The swiftest of evils in punishment is the severing of kinship.',
    source: 'Nahj al-Balagha, Saying 323',
    theme: 'on the cost of cutting bonds, on qaṭīʿat al-raḥim',
  },
  {
    arabic: 'إِيَّاكَ وَقَطِيعَةَ الرَّحِمِ، فَإِنَّهَا تُورِثُ الْمَقْتَ مِنَ اللَّهِ وَالنَّاسِ',
    english: 'Beware of severing the bond of kinship — it bequeaths the loathing of God and of people alike.',
    source: 'Ghurar al-Hikam',
    theme: 'on the cost of cutting bonds, on qaṭīʿat al-raḥim',
  },
  {
    arabic: 'وَتَوَاصَلُوا وَتَبَارُّوا، وَإِيَّاكُمْ وَالتَّقَاطُعَ وَالتَّدَابُرَ وَالتَّفَرُّقَ',
    english: 'Keep your bonds and be dutiful to one another — beware of severance, of turning your backs, and of dispersal.',
    source: 'Nahj al-Balagha, Sermon 192 (al-Qāṣiʿa)',
    theme: 'on family at risk of fracture, on ṣilat al-raḥim',
  },
  {
    arabic: 'لَا يَزْهَدَنَّ أَحَدُكُمْ فِي الْمَعْرُوفِ مَعَ أَقَارِبِهِ، يُرِيدُهُ مِنْ غَيْرِهِمْ',
    english: 'Let none of you renounce kindness toward his own relatives in order to seek it from others.',
    source: 'Nahj al-Balagha, Saying 311',
    theme: 'on family estrangement, on the duty when estranged',
  },
  {
    arabic:
      'وَالرَّحِمُ مُعَلَّقَةٌ بِالْعَرْشِ، تَقُولُ: اللَّهُمَّ صِلْ مَنْ وَصَلَنِي، وَاقْطَعْ مَنْ قَطَعَنِي',
    english: 'The womb-bond is suspended at the Throne, saying: O God, keep bonded the one who keeps me, and cut off the one who cuts me.',
    source: "al-Kafi, Bāb Ṣilat al-Raḥim",
    theme: 'on the raḥim at the Throne, on ṣilat al-raḥim',
  },
  {
    arabic: 'بِرُّ الْوَالِدَيْنِ أَكْبَرُ فَرِيضَةٍ',
    english: "Dutifulness to one's parents is the greatest of obligations.",
    source: 'Ghurar al-Hikam',
    theme: 'on birr al-wālidayn, on the rights of parents',
  },
  {
    arabic: 'صِلُوا أَرْحَامَكُمْ وَلَوْ بِالسَّلَامِ',
    english: 'Maintain your kinship — even if only by a greeting of peace.',
    source: "al-Kafi, Bāb Ṣilat al-Raḥim",
    theme: 'on ṣilat al-raḥim, on the minimum bond',
  },

  // ── Niyya (intention) & ikhlās (sincerity) ──────────────────────
  {
    arabic: 'نِيَّةُ الْمَرْءِ خَيْرٌ مِنْ عَمَلِهِ',
    english: "A person's intention is better than their action.",
    source: 'Nahj al-Balagha, Saying 38',
    theme: 'on niyya, on the inward outweighing the outward',
  },
  {
    arabic: 'لَا عَمَلَ لِمَنْ لَا نِيَّةَ لَهُ',
    english: 'There is no deed for one who has no intention.',
    source: 'Nahj al-Balagha (saying)',
    theme: 'on niyya, when acting mechanically',
  },
  {
    arabic: 'عَلَى قَدْرِ النِّيَّةِ تَكُونُ مِنَ اللَّهِ الْعَطِيَّةُ',
    english: 'According to the measure of the intention, so is the gift from God.',
    source: 'Ghurar al-Hikam',
    theme: 'on niyya, when the effort feels small',
  },
  {
    arabic: 'الْإِخْلَاصُ غَايَةُ الدِّينِ',
    english: 'Sincerity is the ultimate aim of religion.',
    source: 'Ghurar al-Hikam',
    theme: 'on ikhlās, on the destination of religion',
  },
  {
    arabic: 'الْإِخْلَاصُ أَعْلَى الْإِيمَانِ',
    english: 'Sincerity is the highest rank of faith.',
    source: 'Ghurar al-Hikam',
    theme: 'on ikhlās, on inner over outer',
  },
  {
    arabic: 'أَخْلِصِ الْعَمَلَ لِلَّهِ فَإِنَّ النَّاقِدَ بَصِيرٌ بَصِيرٌ',
    english: 'Make your action sincere for God, for the critic who inspects it is keenly seeing, keenly seeing.',
    source: 'Ghurar al-Hikam',
    theme: 'on ikhlās, when tempted to perform for an audience',
  },
  {
    arabic: 'غَايَةُ الْإِخْلَاصِ الْخَلَاصُ',
    english: 'The end of sincerity is deliverance.',
    source: 'Ghurar al-Hikam',
    theme: 'on ikhlās, on what sincerity yields',
  },
  {
    arabic: 'إِخْلَاصُ الْعَمَلِ مِنْ قُوَّةِ الْيَقِينِ وَصَلَاحِ النِّيَّةِ',
    english: 'Purity of action comes from strength of certainty and soundness of intention.',
    source: 'Ghurar al-Hikam',
    theme: 'on ikhlās, when worship feels hollow',
  },
  {
    arabic:
      'نِيَّةُ الْمُؤْمِنِ خَيْرٌ مِنْ عَمَلِهِ، وَنِيَّةُ الْفَاجِرِ شَرٌّ مِنْ عَمَلِهِ، وَكُلُّ عَامِلٍ يَعْمَلُ عَلَى نِيَّتِهِ',
    english:
      "The believer's intention is better than their action, the corrupt person's intention is worse than their action, and every doer acts according to their intention.",
    source: 'al-Kafi, Kitab al-Iman wa al-Kufr',
    theme: 'on niyya, on the law of intention',
  },
  {
    arabic: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
    english: 'Actions are only by intentions, and every person shall have only what they intended.',
    source: 'Well-attested Prophetic tradition (transmitted by Imam Ali)',
    theme: 'on niyya, the foundational tradition',
  },
  {
    arabic: 'الرِّيَاءُ شِرْكٌ خَفِيٌّ',
    english: 'Showing off is a hidden form of associating partners with God.',
    source: 'Ghurar al-Hikam',
    theme: 'on riyāʾ, on the silent corrupter',
  },
  {
    arabic: 'آفَةُ الْعِبَادَةِ الرِّيَاءُ',
    english: 'The blight of worship is showing off.',
    source: 'Ghurar al-Hikam',
    theme: 'on riyāʾ, when worship is performative',
  },
  {
    arabic:
      'مَنْ أَخْلَصَ لِلَّهِ أَرْبَعِينَ يَوْمًا فَجَّرَ اللَّهُ يَنَابِيعَ الْحِكْمَةِ مِنْ قَلْبِهِ عَلَى لِسَانِهِ',
    english:
      'Whoever is sincere to God for forty days, God will cause springs of wisdom to gush from their heart upon their tongue.',
    source: "Transmitted from Imam Ali ('Uyun Akhbar al-Rida; Bihar al-Anwar)",
    theme: 'on ikhlās, on what sustained sincerity produces',
  },
  {
    arabic: 'قِلَّةُ الْعَمَلِ مَعَ التَّقْوَى خَيْرٌ مِنْ كَثِيرِهِ بِلَا تَقْوَى',
    english: 'Little action with God-consciousness is better than much action without it.',
    source: 'Nahj al-Balagha (saying)',
    theme: 'on niyya, on the scale of acceptance',
  },
  {
    arabic: 'لَا يَقِلُّ عَمَلٌ مَعَ التَّقْوَى، وَكَيْفَ يَقِلُّ مَا يُتَقَبَّلُ',
    english: 'No action accompanied by God-consciousness is little — how can what is accepted be called little?',
    source: 'Nahj al-Balagha, Saying 95',
    theme: 'on niyya, when dismissing a small good deed',
  },
  {
    arabic:
      'طُوبَى لِمَنْ أَخْلَصَ لِلَّهِ عَمَلَهُ وَعِلْمَهُ وَحُبَّهُ وَبُغْضَهُ وَأَخْذَهُ وَتَرْكَهُ وَكَلَامَهُ وَصَمْتَهُ',
    english:
      'Blessed is the one who makes sincere for God their action, their knowledge, their love, their hatred, their taking, their leaving, their speech, and their silence.',
    source: 'Nahj al-Balagha (saying)',
    theme: 'on ikhlās in every faculty',
  },
  {
    arabic: 'مَنْ صَحَّتْ نِيَّتُهُ فَازَ بِالْجَزَاءِ الْأَوْفَى',
    english: "Whoever's intention is sound attains the fullest reward.",
    source: 'Ghurar al-Hikam',
    theme: 'on niyya, when a good deed was interrupted',
  },
  {
    arabic: 'الْأَعْمَالُ ثِمَارُ النِّيَّاتِ',
    english: 'Actions are the fruits of intentions.',
    source: 'Ghurar al-Hikam',
    theme: 'on niyya, on the root of every deed',
  },

  // ── Maʿrifat Allāh (intimate knowledge of God) ───────────────────
  {
    arabic: 'مَا كُنْتُ أَعْبُدُ رَبًّا لَمْ أَرَهُ',
    english: 'I would not worship a Lord I have not seen.',
    source: 'al-Kafi, Kitab al-Tawhid',
    theme: 'on maʿrifat Allāh, on knowing before worshipping',
  },
  {
    arabic:
      'لَمْ تَرَهُ الْعُيُونُ بِمُشَاهَدَةِ الْأَبْصَارِ، وَلَكِنْ رَأَتْهُ الْقُلُوبُ بِحَقَائِقِ الْإِيمَانِ',
    english: 'Eyes do not see Him by the witnessing of sight, but hearts see Him through the realities of faith.',
    source: 'Nahj al-Balagha, Sermon 179',
    theme: 'on maʿrifat Allāh, on the heart\'s recognition',
  },
  {
    arabic:
      'عَرَفْتُ اللَّهَ سُبْحَانَهُ بِفَسْخِ الْعَزَائِمِ وَحَلِّ الْعُقُودِ وَنَقْضِ الْهِمَمِ',
    english: 'I came to know God, glorified is He, by the dissolving of resolutions, the untying of contracts, and the breaking of intentions.',
    source: 'Nahj al-Balagha, Saying 250',
    theme: 'on maʿrifat Allāh, on the breaking of plans',
  },
  {
    arabic:
      'اعْرِفُوا اللَّهَ بِاللَّهِ، وَالرَّسُولَ بِالرِّسَالَةِ، وَأُولِي الْأَمْرِ بِالْمَعْرُوفِ وَالْعَدْلِ وَالْإِحْسَانِ',
    english: 'Know God through God, the Messenger through the message, and those in authority through what is right, just, and beautiful.',
    source: 'al-Kafi, Kitab al-Tawhid',
    theme: 'on maʿrifat Allāh, on the light by which He is known',
  },
  {
    arabic: 'غَايَةُ الْمَعْرِفَةِ الْخَشْيَةُ',
    english: 'The summit of knowing Him is awe.',
    source: 'Ghurar al-Hikam',
    theme: 'on khashya, on awe as the fruit of knowing',
  },
  {
    arabic: 'ثَمَرَةُ الْمَعْرِفَةِ الْعُزُوفُ عَنْ دَارِ الْفَنَاءِ',
    english: 'The fruit of knowing Him is turning away from the abode of perishing.',
    source: 'Ghurar al-Hikam',
    theme: 'on maʿrifat Allāh, on the fruit of knowing',
  },
  {
    arabic: 'الْعَارِفُ وَجْهُهُ مُسْتَبْشِرٌ مُتَبَسِّمٌ، وَقَلْبُهُ وَجِلٌ مَحْزُونٌ',
    english: "The gnostic's face is bright and smiling, while his heart is trembling and grief-stricken.",
    source: 'Ghurar al-Hikam',
    theme: 'on the gnostic, on the inner state',
  },
  {
    arabic: 'الْعَارِفُ مَنْ عَرَفَ نَفْسَهُ فَأَعْتَقَهَا وَنَزَّهَهَا عَنْ كُلِّ مَا يُبَعِّدُهَا',
    english: 'The gnostic is the one who knows his soul, sets it free, and purifies it of all that distances it from Him.',
    source: 'Ghurar al-Hikam',
    theme: 'on the gnostic, on self-knowledge and God-knowledge',
  },
  {
    arabic: 'أَفْضَلُ الْمَعْرِفَةِ مَعْرِفَةُ الْإِنْسَانِ نَفْسَهُ',
    english: "The noblest knowing is a person's knowing of his own self.",
    source: 'Ghurar al-Hikam',
    theme: 'on self-knowledge as the highest knowing',
  },
  {
    arabic: 'مَنْ عَرَفَ اللَّهَ تَوَحَّدَ',
    english: 'Whoever has come to know God has become solitary with Him.',
    source: 'Ghurar al-Hikam',
    theme: 'on maʿrifat Allāh, on solitude with God',
  },
  {
    arabic: 'مَنْ عَرَفَ اللَّهَ كَمُلَتْ مَعْرِفَتُهُ، وَمَنْ كَمُلَتْ مَعْرِفَتُهُ خَافَ الْحِسَابَ',
    english: "Whoever knows God, his knowing is made complete; and whoever's knowing is complete fears the reckoning.",
    source: 'Ghurar al-Hikam',
    theme: 'on maʿrifa, on the fear of the reckoning',
  },
  {
    arabic: 'مَنْ عَرَفَ اللَّهَ سُبْحَانَهُ لَمْ يَشْقَ أَبَدًا',
    english: 'Whoever knows God, glorified is He, will never be wretched.',
    source: 'Ghurar al-Hikam',
    theme: 'on maʿrifa, on the joy of the gnostic',
  },
  {
    arabic: 'مَنْ عَرَفَ اللَّهَ تَنَغَّصَتْ عَلَيْهِ مَعَايِشُهُ',
    english: 'Whoever knows God, his comforts in this life lose their savour.',
    source: 'Ghurar al-Hikam',
    theme: 'on maʿrifa, on the grief of the gnostic',
  },
  {
    arabic:
      'إِذَا أَحَبَّ اللَّهُ عَبْدًا أَلْهَمَهُ الطَّاعَةَ، وَأَلْزَمَهُ الْقَنَاعَةَ، وَفَقَّهَهُ فِي الدِّينِ، وَقَوَّاهُ بِالْيَقِينِ',
    english:
      'When God loves a servant, He inspires him to obedience, binds him to contentment, gives him understanding in religion, and strengthens him with certainty.',
    source: 'Ghurar al-Hikam',
    theme: "on love of God, on the signs of God's love",
  },
  {
    arabic:
      'إِنَّ قَوْمًا عَبَدُوا اللَّهَ رَغْبَةً فَتِلْكَ عِبَادَةُ التُّجَّارِ، وَإِنَّ قَوْمًا عَبَدُوا اللَّهَ رَهْبَةً فَتِلْكَ عِبَادَةُ الْعَبِيدِ، وَإِنَّ قَوْمًا عَبَدُوا اللَّهَ شُكْرًا فَتِلْكَ عِبَادَةُ الْأَحْرَارِ',
    english:
      'A people worshipped God out of desire — that is the worship of merchants. A people worshipped Him out of fear — that is the worship of slaves. A people worshipped Him out of gratitude — that is the worship of the free.',
    source: 'Nahj al-Balagha, Saying 237',
    theme: 'on the three worships, on the worship of the free',
  },
  {
    arabic: 'لَوْ كُشِفَ الْغِطَاءُ مَا ازْدَدْتُ يَقِينًا',
    english: 'Were the veil to be lifted, I would not increase in certainty.',
    source: 'Transmitted saying of Imam Ali',
    theme: 'on yaqīn, on certainty without the veil',
  },
  {
    arabic:
      'الْحَمْدُ لِلَّهِ الَّذِي لَا يَبْلُغُ مِدْحَتَهُ الْقَائِلُونَ، وَلَا يُحْصِي نَعْمَاءَهُ الْعَادُّونَ، وَلَا يُؤَدِّي حَقَّهُ الْمُجْتَهِدُونَ',
    english: 'Praise belongs to God, whose praise no speaker can reach, whose blessings no counter can number, whose right no striver can fulfil.',
    source: 'Nahj al-Balagha, Sermon 1 (opening)',
    theme: 'on hamd, on the limits of praise',
  },

  // ── Patience with those close — when wronged by your own ────────
  {
    arabic: 'أَشَدُّ الْمَصَائِبِ سُوءُ الْخَلَفِ',
    english: 'The most severe of calamities is the wickedness of those who succeed you.',
    source: 'Ghurar al-Hikam',
    theme: 'when wronged by your own, on betrayal by close ones',
  },
  {
    arabic: 'مَنْ وَثِقَ بِالنَّاسِ نَدِمَ',
    english: 'Whoever places his trust in people will come to regret it.',
    source: 'Ghurar al-Hikam',
    theme: 'on misplaced trust, on patience with the near',
  },
  {
    arabic: 'أَفْضَلُ الْحِلْمِ تَجَرُّعُ الْغَيْظِ',
    english: 'The most excellent forbearance is to swallow down anger.',
    source: 'Ghurar al-Hikam',
    theme: 'on ḥilm, when swallowing what comes from those close to you',
  },
  {
    arabic: 'احْتَمِلْ أَخَاكَ عَلَى مَا فِيهِ، وَلَا تُكَلِّفْهُ مَا لَيْسَ فِيهِ',
    english: 'Bear with your brother as he is, and do not burden him with what is not in him.',
    source: 'Ghurar al-Hikam',
    theme: 'on accepting people for what they are, on patience with the near',
  },
  {
    arabic: 'مَا أَكْثَرَ الْعِبَرَ وَأَقَلَّ الِاعْتِبَارَ',
    english: 'How many are the lessons, and how few are those who take heed.',
    source: 'Nahj al-Balagha, Saying 297',
    theme: 'when your own people will not listen',
  },
  {
    arabic:
      'اللَّهُمَّ إِنِّي أَسْتَعْدِيكَ عَلَى قُرَيْشٍ وَمَنْ أَعَانَهُمْ، فَإِنَّهُمْ قَطَعُوا رَحِمِي، وَصَغَّرُوا عَظِيمَ مَنْزِلَتِي',
    english: 'O God, I seek Your help against Quraysh and those who aided them — they have severed my kinship and belittled my great station.',
    source: 'Nahj al-Balagha, Sermon 172',
    theme: 'on betrayal by kin, on when family fails',
  },
  {
    arabic:
      'مَا زِلْتُ مَظْلُومًا مُنْذُ قَبَضَ اللَّهُ رَسُولَهُ صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ حَتَّى يَوْمِ النَّاسِ هَذَا',
    english: "I have not ceased to be wronged from the day God took His Messenger, peace be upon him and his family, until this very day.",
    source: 'Nahj al-Balagha, Sermon 6',
    theme: "Imam Ali's own lament, when wronged by your own",
  },
  {
    arabic: 'أَيُّهَا النَّاسُ الْمُجْتَمِعَةُ أَبْدَانُهُمْ، الْمُخْتَلِفَةُ أَهْوَاؤُهُمْ',
    english: 'O people whose bodies are gathered but whose desires are scattered.',
    source: 'Nahj al-Balagha, Sermon 29',
    theme: 'on disappointed loyalty, on the followers who fail',
  },
  {
    arabic: 'أُفٍّ لَكُمْ! لَقَدْ سَئِمْتُ عِتَابَكُمْ، أَرَضِيتُمْ بِالْحَيَاةِ الدُّنْيَا مِنَ الْآخِرَةِ عِوَضًا',
    english: 'Fie upon you! I am weary of rebuking you. Have you accepted this worldly life as a substitute for the Hereafter?',
    source: 'Nahj al-Balagha, Sermon 34',
    theme: "Imam Ali's lament, when companions fail",
  },
  {
    arabic: 'يَا أَشْبَاهَ الرِّجَالِ وَلَا رِجَالَ، حُلُومُ الْأَطْفَالِ وَعُقُولُ رَبَّاتِ الْحِجَالِ',
    english: 'O you who resemble men but are not men — with the dreams of children and the minds of those secluded in their bridal chambers.',
    source: 'Nahj al-Balagha, Sermon 27',
    theme: "Imam Ali's lament, on disappointment in those close",
  },
  {
    arabic: 'مَنْ رَضِيَ عَنْ نَفْسِهِ كَثُرَ السَّاخِطُ عَلَيْهِ',
    english: 'Whoever is pleased with himself, those displeased with him will be many.',
    source: 'Nahj al-Balagha, Saying 6',
    theme: 'on self-conceit, on relations with people',
  },
  {
    arabic: 'مَنْ أَمَّلَ إِنْسَانًا هَابَهُ، وَمَنْ جَهِلَ شَيْئًا عَابَهُ',
    english: 'Whoever places his hope in a person will come to fear him; whoever is ignorant of a thing will find fault with it.',
    source: 'Ghurar al-Hikam',
    theme: 'on misplaced hope, on patience with the near',
  },
  {
    arabic: 'مَنْ كَثُرَ عِتَابُهُ قَلَّ أَصْحَابُهُ',
    english: 'Whoever reproaches much, his companions will become few.',
    source: 'Ghurar al-Hikam',
    theme: 'on patience with friends, on the cost of constant rebuke',
  },
  {
    arabic: 'لَا تَطْلُبَنَّ مِنْ غَيْرِ اللَّهِ مَا لَا تَجِدُهُ إِلَّا عِنْدَهُ',
    english: 'Do not seek from other than God what you will find only with Him.',
    source: 'Ghurar al-Hikam',
    theme: 'on expecting from people what only God provides',
  },
  {
    arabic: 'الْمُؤْمِنُ أَلِفٌ مَأْلُوفٌ، وَلَا خَيْرَ فِيمَنْ لَا يَأْلَفُ وَلَا يُؤْلَفُ',
    english: 'The believer is one who befriends and is befriended; there is no good in one who neither befriends others nor is befriended by them.',
    source: 'al-Kafi, Kitab al-Iman wa al-Kufr',
    theme: 'on the believer\'s warmth, on the social posture',
  },
  {
    arabic: 'لَا يُعْدَمُ الصَّبُورُ الظَّفَرَ وَإِنْ طَالَ بِهِ الزَّمَانُ',
    english: 'The patient one is not deprived of victory, even though it take a long time to reach him.',
    source: 'Nahj al-Balagha, Saying 153',
    theme: 'on long patience, on long-stretched waiting',
  },
  {
    arabic:
      'مِنْ كَفَّارَاتِ الذُّنُوبِ الْعِظَامِ إِغَاثَةُ الْمَلْهُوفِ وَالتَّنْفِيسُ عَنِ الْمَكْرُوبِ',
    english: 'Among the expiations of grave sins is bringing relief to the distressed and easing the burden of the grieved.',
    source: 'Nahj al-Balagha, Saying 24',
    theme: 'on overlooking past wrongs, on relieving those who once wronged you',
  },

  // ── On the Qur'an ────────────────────────────────────────────────
  {
    arabic:
      'وَاعْلَمُوا أَنَّ هَذَا الْقُرْآنَ هُوَ النَّاصِحُ الَّذِي لَا يَغُشُّ، وَالْهَادِي الَّذِي لَا يُضِلُّ، وَالْمُحَدِّثُ الَّذِي لَا يَكْذِبُ',
    english: "Know that this Qur'an is the adviser who does not deceive, the guide who does not lead astray, and the narrator who does not lie.",
    source: 'Nahj al-Balagha, Sermon 176',
    theme: 'on the Qur\'an as guide',
  },
  {
    arabic:
      'وَمَا جَالَسَ هَذَا الْقُرْآنَ أَحَدٌ إِلَّا قَامَ عَنْهُ بِزِيَادَةٍ أَوْ نُقْصَانٍ: زِيَادَةٍ فِي هُدًى، أَوْ نُقْصَانٍ مِنْ عَمًى',
    english: "No one sits with this Qur'an except that he rises from it with an increase or a decrease — an increase in guidance, or a decrease in blindness.",
    source: 'Nahj al-Balagha, Sermon 176',
    theme: 'on the Qur\'an as measure, on sitting with the Qur\'an',
  },
  {
    arabic:
      'وَاعْلَمُوا أَنَّهُ لَيْسَ عَلَى أَحَدٍ بَعْدَ الْقُرْآنِ مِنْ فَاقَةٍ، وَلَا لِأَحَدٍ قَبْلَ الْقُرْآنِ مِنْ غِنًى',
    english: "No one has any poverty after the Qur'an, and no one had any wealth before it.",
    source: 'Nahj al-Balagha, Sermon 176',
    theme: 'on the Qur\'an as sufficiency',
  },
  {
    arabic:
      'فَاسْتَشْفُوهُ مِنْ أَدْوَائِكُمْ، وَاسْتَعِينُوا بِهِ عَلَى لَأْوَائِكُمْ، فَإِنَّ فِيهِ شِفَاءً مِنْ أَكْبَرِ الدَّاءِ',
    english: 'Seek cure from it for your maladies, and aid against your hardships, for in it is a cure for the greatest disease.',
    source: 'Nahj al-Balagha, Sermon 176',
    theme: 'on the Qur\'an as cure',
  },
  {
    arabic:
      'وَإِنَّ الْقُرْآنَ ظَاهِرُهُ أَنِيقٌ، وَبَاطِنُهُ عَمِيقٌ، لَا تَفْنَى عَجَائِبُهُ، وَلَا تَنْقَضِي غَرَائِبُهُ، وَلَا تُكْشَفُ الظُّلُمَاتُ إِلَّا بِهِ',
    english: "The Qur'an: its outward is elegant and its inward is deep; its wonders do not perish, its marvels do not cease, and the darknesses are not dispelled except by it.",
    source: 'Nahj al-Balagha, Sermon 18',
    theme: 'on the Qur\'an as depths',
  },
  {
    arabic:
      'تَعَلَّمُوا الْقُرْآنَ فَإِنَّهُ أَحْسَنُ الْحَدِيثِ، وَتَفَقَّهُوا فِيهِ فَإِنَّهُ رَبِيعُ الْقُلُوبِ، وَاسْتَشْفُوا بِنُورِهِ فَإِنَّهُ شِفَاءُ الصُّدُورِ',
    english: "Learn the Qur'an, for it is the best of speech; understand it deeply, for it is the spring of hearts; and seek cure through its light, for it is the healing of breasts.",
    source: 'Nahj al-Balagha, Sermon 110',
    theme: 'on the Qur\'an as cure, on learning it',
  },
  {
    arabic:
      'وَاعْلَمُوا أَنَّ هَذَا الْقُرْآنَ هُوَ الشَّافِعُ الْمُشَفَّعُ، وَالْقَائِلُ الْمُصَدَّقُ، وَأَنَّهُ مَنْ شَفَعَ لَهُ الْقُرْآنُ يَوْمَ الْقِيَامَةِ شُفِّعَ فِيهِ',
    english: "Know that this Qur'an is an intercessor whose intercession is accepted, a speaker whose word is confirmed. Whoever the Qur'an intercedes for on the Day of Resurrection, his intercession is accepted.",
    source: 'Nahj al-Balagha, Sermon 176',
    theme: 'on the Qur\'an as intercessor',
  },
  {
    arabic:
      'إِنَّ اللَّهَ سُبْحَانَهُ لَمْ يَعِظْ أَحَدًا بِمِثْلِ هَذَا الْقُرْآنِ، فَإِنَّهُ حَبْلُ اللَّهِ الْمَتِينُ، وَسَبَبُهُ الْأَمِينُ، وَفِيهِ رَبِيعُ الْقَلْبِ، وَيَنَابِيعُ الْعِلْمِ',
    english: "God has not admonished anyone with the like of this Qur'an — it is God's firm rope, His trustworthy means; in it is the spring of the heart and the wellsprings of knowledge.",
    source: 'Nahj al-Balagha, Sermon 176',
    theme: 'on the Qur\'an as God\'s firm rope',
  },
  {
    arabic: 'الْقُرْآنُ أَفْضَلُ الْهِدَايَةِ',
    english: "The Qur'an is the most excellent guidance.",
    source: 'Ghurar al-Hikam',
    theme: 'on the Qur\'an as guide',
  },
  {
    arabic:
      'عَلَيْكَ بِتِلَاوَةِ الْقُرْآنِ، وَالْعَمَلِ بِمَا فِيهِ، وَلُزُومِ فَرَائِضِهِ وَشَرَائِعِهِ، وَحَلَالِهِ وَحَرَامِهِ',
    english: "Hold fast to the recitation of the Qur'an, and to acting upon what is in it.",
    source: 'Nahj al-Balagha, Letter 69 (to al-Harith al-Hamdani)',
    theme: 'on Qur\'an recitation, on acting upon it',
  },
  {
    arabic:
      'وَأَحْسِنْ تِلَاوَتَهُ فَإِنَّهُ أَنْفَعُ الْقَصَصِ',
    english: 'And recite it beautifully, for it is the most beneficial of narratives.',
    source: 'Nahj al-Balagha, Letter 31 (to Imam al-Hasan)',
    theme: 'on Qur\'an recitation',
  },
  {
    arabic: 'أَلَا لَا خَيْرَ فِي قِرَاءَةٍ لَيْسَ فِيهَا تَدَبُّرٌ، أَلَا لَا خَيْرَ فِي عِبَادَةٍ لَيْسَ فِيهَا تَفَقُّهٌ',
    english: 'Behold, there is no good in a recitation without reflection; behold, there is no good in worship without understanding.',
    source: 'Nahj al-Balagha, Saying 47',
    theme: 'on Qur\'an reflection',
  },
  {
    arabic:
      'وَمَا لِلْقَلْبِ جَلَاءٌ غَيْرُهُ، مَعَ أَنَّهُ قَدْ ذَهَبَ الْمُتَذَكِّرُونَ، وَبَقِيَ النَّاسُونَ أَوِ الْمُتَنَاسُونَ',
    english: 'There is no polish for the heart other than it — yet those who remember have departed, and there remain only the forgetful or those who feign forgetfulness.',
    source: 'Nahj al-Balagha, Sermon 176',
    theme: 'on the Qur\'an as polish of the heart',
  },
  {
    arabic:
      'يَأْتِي فِي آخِرِ الزَّمَانِ قَوْمٌ يَحْمِلُونَ الْقُرْآنَ عَلَى أَكْتَافِهِمْ',
    english: 'In the last age there will come a people who carry the Qur\'an upon their shoulders — as mere words, not in their hearts.',
    source: 'Nahj al-Balagha, Saying 369',
    theme: 'on the danger of carrying the Qur\'an as letters only',
  },
  {
    arabic: 'نَوْمٌ عَلَى يَقِينٍ خَيْرٌ مِنْ صَلَاةٍ فِي شَكٍّ',
    english: 'Sleep upon certainty is better than prayer in doubt.',
    source: 'Nahj al-Balagha, Saying 97',
    theme: 'on certainty, on the inward state of worship',
  },

  // ── Dhikr (remembrance of God) ───────────────────────────────────
  {
    arabic: 'ذِكْرُ اللَّهِ جِلَاءُ الصُّدُورِ، وَطُمَأْنِينَةُ الْقُلُوبِ',
    english: 'The remembrance of God is the polish of breasts and the tranquillity of hearts.',
    source: 'Ghurar al-Hikam',
    theme: 'on dhikr, on polish of the heart, on tranquillity',
  },
  {
    arabic: 'ذِكْرُ اللَّهِ مَسَرَّةُ كُلِّ مُتَّقٍ، وَلَذَّةُ كُلِّ مُوقِنٍ',
    english: 'The remembrance of God is the delight of every God-wary one and the sweetness of every person of certainty.',
    source: 'Ghurar al-Hikam',
    theme: 'on dhikr, on its sweetness',
  },
  {
    arabic: 'مَنْ ذَكَرَ اللَّهَ سُبْحَانَهُ أَحْيَا اللَّهُ قَلْبَهُ، وَنَوَّرَ عَقْلَهُ وَلُبَّهُ',
    english: 'Whoever remembers God, God revives his heart and illuminates his intellect and inner core.',
    source: 'Ghurar al-Hikam',
    theme: 'on dhikr, on what it does to the heart',
  },
  {
    arabic: 'دَوَامُ الذِّكْرِ يُنِيرُ الْقَلْبَ وَالْفِكْرَ',
    english: 'Perpetuity of remembrance illuminates the heart and the thought.',
    source: 'Ghurar al-Hikam',
    theme: 'on perpetual dhikr',
  },
  {
    arabic: 'الذِّكْرُ مِفْتَاحُ الْأُنْسِ',
    english: 'Remembrance is the key of intimacy.',
    source: 'Ghurar al-Hikam',
    theme: 'on dhikr, on intimacy with God (uns)',
  },
  {
    arabic: 'الذِّكْرُ نُورُ الْعُقُولِ، وَحَيَاةُ النُّفُوسِ، وَجِلَاءُ الصُّدُورِ',
    english: 'Remembrance is the light of intellects, the life of souls, and the polish of breasts.',
    source: 'Ghurar al-Hikam',
    theme: 'on dhikr, on the life of the soul',
  },
  {
    arabic: 'ذِكْرُ اللَّهِ يَطْرُدُ الشَّيْطَانَ',
    english: 'The remembrance of God drives away Satan.',
    source: 'Ghurar al-Hikam',
    theme: 'on dhikr, on protection',
  },
  {
    arabic: 'مَنْ ذَكَرَ اللَّهَ سُبْحَانَهُ ذَكَرَهُ',
    english: 'Whoever remembers God, He remembers him.',
    source: 'Ghurar al-Hikam',
    theme: 'on dhikr, on mutual remembrance',
  },
  {
    arabic: 'نِعْمَ الطَّارِدُ لِلْهَمِّ ذِكْرُ اللَّهِ سُبْحَانَهُ',
    english: 'How excellent an expeller of grief is the remembrance of God.',
    source: 'Ghurar al-Hikam',
    theme: 'on dhikr, when grief-stricken, lifeline',
  },
  {
    arabic:
      'وَإِنَّ لِلذِّكْرِ لَأَهْلًا أَخَذُوهُ مِنَ الدُّنْيَا بَدَلًا، فَلَمْ تَشْغَلْهُمْ تِجَارَةٌ وَلَا بَيْعٌ عَنْهُ، يَقْطَعُونَ بِهِ أَيَّامَ الْحَيَاةِ',
    english: 'Remembrance has its own people who took it as a substitute for this world — no commerce or sale distracts them from it; they cut through the days of life with it.',
    source: 'Nahj al-Balagha, Saying 250',
    theme: 'on the people of dhikr',
  },
  {
    arabic: 'ذِكْرُ اللَّهِ قُوتُ النُّفُوسِ، وَمُجَالَسَةُ الْمَحْبُوبِ',
    english: 'The remembrance of God is the nourishment of souls and the sitting-companionship of the Beloved.',
    source: 'Ghurar al-Hikam',
    theme: 'on dhikr, on nourishment, on love',
  },
  {
    arabic: 'ذِكْرُ اللَّهِ دَوَاءُ أَعْلَالِ النُّفُوسِ',
    english: 'The remembrance of God is the cure for the maladies of souls.',
    source: 'Ghurar al-Hikam',
    theme: 'on dhikr, on healing',
  },
  {
    arabic: 'ذِكْرُ اللَّهِ رَأْسُ مَالِ كُلِّ مُؤْمِنٍ، وَرِبْحُهُ السَّلَامَةُ مِنَ الشَّيْطَانِ',
    english: 'The remembrance of God is the capital of every believer, and its profit is safety from Satan.',
    source: 'Ghurar al-Hikam',
    theme: 'on dhikr, on the believer\'s capital',
  },
  {
    arabic: 'مَنْ أَكْثَرَ ذِكْرَ اللَّهِ سُبْحَانَهُ أَحَبَّهُ',
    english: 'Whoever increases the remembrance of God, He loves him.',
    source: 'Ghurar al-Hikam',
    theme: 'on dhikr, on God\'s love',
  },
  {
    arabic:
      'مَا مِنْ شَيْءٍ إِلَّا وَلَهُ حَدٌّ يَنْتَهِي إِلَيْهِ إِلَّا الذِّكْرَ فَلَيْسَ لَهُ حَدٌّ يَنْتَهِي إِلَيْهِ',
    english: 'There is nothing except that it has a limit at which it ends, save remembrance — for it has no limit.',
    source: "al-Kafi, Kitab al-Du'a, Bab Dhikr Allah kathiran",
    theme: 'on dhikr, on its unboundedness',
  },
  {
    arabic: 'ذَاكِرُ اللَّهِ سُبْحَانَهُ مُجَالِسُهُ',
    english: 'The one who remembers God is His sitting-companion.',
    source: 'Ghurar al-Hikam',
    theme: 'on dhikr, on companionship with God',
  },

  // ── Rajāʾ (hope in God) ──────────────────────────────────────────
  {
    arabic: 'لَا يَرْجُوَنَّ أَحَدٌ مِنْكُمْ إِلَّا رَبَّهُ، وَلَا يَخَافَنَّ إِلَّا ذَنْبَهُ',
    english: 'Let none of you hope in any but his Lord, and let none of you fear any but his sin.',
    source: 'Nahj al-Balagha, Saying 82',
    theme: 'on placing hope only in God, on the balance of hope and fear',
  },
  {
    arabic: 'الرَّجَاءُ رَحْمَةٌ، وَالْقُنُوطُ نِقْمَةٌ',
    english: 'Hope is a mercy; despair is a punishment.',
    source: 'Ghurar al-Hikam',
    theme: 'on rajāʾ, on the inner state of the believer',
  },
  {
    arabic: 'لَا تَيْأَسْ مِنْ رَوْحِ اللَّهِ، فَإِنَّ الْيَأْسَ مِنْ رَوْحِ اللَّهِ كُفْرٌ',
    english: "Despair not of God's relief — for despair of God's relief is disbelief.",
    source: "Ghurar al-Hikam (echoing Qur'an 12:87)",
    theme: 'on the gravity of despair, on hope as a duty',
  },
  {
    arabic: 'الْيَأْسُ يُفْسِدُ الْعَمَلَ، وَالرَّجَاءُ يَحُثُّ عَلَيْهِ',
    english: 'Despair corrupts work; hope spurs it on.',
    source: 'Ghurar al-Hikam',
    theme: 'on rajāʾ as motive force, on despair as paralysis',
  },
  {
    arabic: 'مَنْ رَجَا اللَّهَ سُبْحَانَهُ ظَهَرَ ذَلِكَ فِي عَمَلِهِ',
    english: 'Whoever hopes in God — that hope shows itself in his work.',
    source: 'Ghurar al-Hikam',
    theme: 'on the proof of hope, on rajāʾ shown by deeds',
  },
  {
    arabic: 'لَا تَقْنَطْ مِنَ الرَّحْمَةِ، فَإِنَّ الْقُنُوطَ يُؤَيِّسُ مِنَ الْخَيْرِ',
    english: 'Do not despair of mercy — for despair drives away every hope of good.',
    source: 'Ghurar al-Hikam',
    theme: 'on rebuking despair, on the wider mercy of God',
  },
  {
    arabic: 'الرَّجَاءُ مَعَ الْعَمَلِ، وَالْأَمَلُ مَعَ الْبَطَالَةِ',
    english: 'Hope walks with work; wishful longing walks with idleness.',
    source: 'Ghurar al-Hikam',
    theme: 'on distinguishing rajāʾ from amal, on the labour of hope',
  },
  {
    arabic: 'إِنَّ أَرْجَى مَا أَرْجُو لَكُمْ رَحْمَةُ اللَّهِ',
    english: 'The most hoped-for thing I hope for you is the mercy of God.',
    source: 'Attributed to Imam Ali (Ghurar al-Hikam)',
    theme: 'on placing hope in the wider mercy of God',
  },
  {
    arabic: 'كُنْ لِمَا لَا تَرْجُو أَرْجَى مِنْكَ لِمَا تَرْجُو',
    english: 'Be more hopeful of what you do not hope for than of what you do hope for.',
    source: 'Nahj al-Balagha, Saying 269',
    theme: 'on the wider mercy of God, on relief from unexpected quarters',
  },
  {
    arabic: 'لَا خَيْرَ فِي شَيْءٍ مِنْ أُمُورِ الدُّنْيَا إِلَّا أَنْ يَكُونَ الرَّجَاءُ فِيهِ لِلَّهِ',
    english: 'There is no good in any worldly matter except that the hope within it is for God.',
    source: 'Ghurar al-Hikam',
    theme: 'on purifying hope, on the only worthy hope',
  },
  {
    arabic: 'مَنْ رَجَا فَضْلَ اللَّهِ لَانَ قَلْبُهُ، وَمَنْ يَئِسَ مِنْ رَحْمَتِهِ قَسَا قَلْبُهُ',
    english: "Whoever hopes in God's bounty, his heart grows soft; whoever despairs of His mercy, his heart grows hard.",
    source: 'Ghurar al-Hikam',
    theme: 'on rajāʾ as softener of the heart',
  },
  {
    arabic:
      'لَا يَنْبَغِي لِلْعَبْدِ أَنْ يَثِقَ بِخَصْلَتَيْنِ: الْعَافِيَةِ وَالْغِنَى. بَيْنَا تَرَاهُ مُعَافًى إِذْ سَقِمَ، وَبَيْنَا تَرَاهُ غَنِيًّا إِذِ افْتَقَرَ',
    english: 'The servant should not trust in two things: health and wealth. While you see him in good health, he falls ill; while you see him wealthy, he is impoverished.',
    source: 'Nahj al-Balagha, Saying 426',
    theme: 'on what cannot be trusted, on God as the only secure refuge',
  },
  {
    arabic: 'وَلْيَكُنْ رَجَاؤُكَ فِي اللَّهِ أَوْثَقَ مِنْ رَجَائِكَ فِي عَمَلِكَ',
    english: 'Let your hope in God be more firm than your hope in your own work.',
    source: 'Nahj al-Balagha, Letter 31',
    theme: 'on hope when burdened with sin, on not relying on one\'s deeds',
  },
  {
    arabic:
      'وَأَرْجُو لَكَ رَحْمَةً تَسَعُكَ، وَأَخَافُ عَلَيْكَ ذُنُوبًا تُوبِقُكَ — فَاجْعَلْ رَجَاءَكَ ثِقَةً، وَخَوْفَكَ يَقَظَةً',
    english: 'I hope for you a mercy wide enough to embrace you, and I fear for you sins that would destroy you — so let your hope be a trust, and your fear be a wakefulness.',
    source: 'Nahj al-Balagha, Letter 31',
    theme: 'on the balance of hope and fear, on the believer as a bird on two wings',
  },
  {
    arabic: 'كَفَى بِالرَّجَاءِ ثَوَابًا، وَكَفَى بِالْقُنُوطِ عَذَابًا',
    english: 'Hope alone is reward enough; despair alone is punishment enough.',
    source: 'Ghurar al-Hikam',
    theme: 'on rajāʾ as already reward, on despair as already punishment',
  },

  // ── Taqwā (God-consciousness) ────────────────────────────────────
  {
    arabic: 'اِتَّقُوا اللَّهَ تَقِيَّةَ مَنْ شَمَّرَ تَجْرِيدًا، وَجَدَّ تَشْمِيرًا',
    english: 'Fear God with the fearing of one who has stripped himself for action and girded up his loins with seriousness.',
    source: 'Nahj al-Balagha, Sermon 21',
    theme: 'on taqwā, on the believer\'s alertness',
  },
  {
    arabic:
      'إِنَّ تَقْوَى اللَّهِ مِفْتَاحُ سَدَادٍ، وَذَخِيرَةُ مَعَادٍ، وَعِتْقٌ مِنْ كُلِّ مَلَكَةٍ، وَنَجَاةٌ مِنْ كُلِّ هَلَكَةٍ. بِهَا يَنْجَحُ الطَّالِبُ، وَيَنْجُو الْهَارِبُ، وَتُنَالُ الرَّغَائِبُ',
    english: "The fear of God is the key to right guidance, a provision for the Hereafter, freedom from every bondage, and salvation from every destruction. Through it the seeker succeeds, the fugitive is delivered, and desires are attained.",
    source: 'Nahj al-Balagha, Sermon 230',
    theme: 'on taqwā as provision, on what taqwā unlocks',
  },
  {
    arabic:
      'اِعْلَمُوا عِبَادَ اللَّهِ أَنَّ التَّقْوَى دَارُ حِصْنٍ عَزِيزٍ، وَالْفُجُورَ دَارُ حِصْنٍ ذَلِيلٍ، لَا يَمْنَعُ أَهْلَهُ، وَلَا يُحْرِزُ مَنْ لَجَأَ إِلَيْهِ',
    english: 'Know, O servants of God, that taqwā is a fortress, mighty and impregnable, while wickedness is a fortress, weak and humiliated — it does not protect its people, nor shelter whoever takes refuge in it.',
    source: 'Nahj al-Balagha, Sermon 157',
    theme: 'on taqwā as fortress',
  },
  {
    arabic: 'أَلَا وَإِنَّ التَّقْوَى مَطَايَا ذُلُلٌ، حُمِلَ عَلَيْهَا أَهْلُهَا، وَأُعْطُوا أَزِمَّتَهَا، فَأَوْرَدَتْهُمُ الْجَنَّةَ',
    english: 'Behold, taqwā is a tame mount: its people are carried upon it and given its reins, and so it brings them into Paradise.',
    source: 'Nahj al-Balagha, Sermon 16',
    theme: 'on taqwā as mount',
  },
  {
    arabic:
      'إِنَّ مَنْ صَرَّحَتْ لَهُ الْعِبَرُ عَمَّا بَيْنَ يَدَيْهِ مِنَ الْمَثُلَاتِ، حَجَزَتْهُ التَّقْوَى عَنْ تَقَحُّمِ الشُّبُهَاتِ',
    english: 'Whoever is shown plainly by the lessons of the past what punishments lie before him, taqwā restrains him from plunging into doubts.',
    source: 'Nahj al-Balagha, Sermon 16',
    theme: 'on taqwā as restraint from doubt',
  },
  {
    arabic:
      'فَإِنَّ تَقْوَى اللَّهِ دَوَاءُ دَاءِ قُلُوبِكُمْ، وَبَصَرُ عَمَى أَفْئِدَتِكُمْ، وَشِفَاءُ مَرَضِ أَجْسَادِكُمْ، وَصَلَاحُ فَسَادِ صُدُورِكُمْ، وَطُهُورُ دَنَسِ أَنْفُسِكُمْ، وَجِلَاءُ عَشَا أَبْصَارِكُمْ',
    english: "The fear of God is the cure for the sickness of your hearts, the sight for the blindness of your inner cores, the healing for the illness of your bodies, the rectification of the corruption of your breasts, the purification of the filth of your souls, and the polish for the dimness of your eyes.",
    source: 'Nahj al-Balagha, Sermon 198',
    theme: 'on taqwā as cure',
  },
  {
    arabic:
      'إِنَّ تَقْوَى اللَّهِ حَمَتْ أَوْلِيَاءَ اللَّهِ مَحَارِمَهُ، وَأَلْزَمَتْ قُلُوبَهُمْ مَخَافَتَهُ، حَتَّى أَسْهَرَتْ لَيَالِيَهُمْ، وَأَظْمَأَتْ هَوَاجِرَهُمْ',
    english: "The fear of God has guarded God's friends from His forbidden things, and bound their hearts to His awe, until it has made their nights sleepless and their midday heats thirsty.",
    source: 'Nahj al-Balagha, Sermon 113',
    theme: 'on taqwā in the friends of God',
  },
  {
    arabic:
      'أُوصِيكُمْ عِبَادَ اللَّهِ بِتَقْوَى اللَّهِ، فَإِنَّهَا حَقُّ اللَّهِ عَلَيْكُمْ، وَالْمُوجِبَةُ عَلَى اللَّهِ حَقَّكُمْ',
    english: "I enjoin upon you the fear of God, for it is God's right upon you, and it makes your right upon God obligatory.",
    source: 'Nahj al-Balagha, Sermon 191',
    theme: 'on taqwā as right and rightful claim',
  },
  {
    arabic: 'فَإِنَّ التَّقْوَى فِي الْيَوْمِ الْحِرْزُ وَالْجُنَّةُ، وَفِي غَدٍ الطَّرِيقُ إِلَى الْجَنَّةِ',
    english: 'Taqwā today is a safeguard and a shield; tomorrow it is the road to Paradise.',
    source: 'Nahj al-Balagha, Sermon 191',
    theme: 'on taqwā as shield and road',
  },
  {
    arabic:
      'عِبَادَ اللَّهِ، أُوصِيكُمْ بِتَقْوَى اللَّهِ الَّتِي هِيَ الزَّادُ، وَبِهَا الْمَعَاذُ: زَادٌ مُبَلِّغٌ، وَمَعَاذٌ مُنْجِحٌ',
    english: 'O servants of God, I enjoin upon you the fear of God, which is the provision and the refuge: a provision that carries you through, and a refuge that delivers.',
    source: 'Nahj al-Balagha, Sermon 114',
    theme: 'on taqwā as provision and refuge',
  },
  {
    arabic: 'أَلَا فَصُونُوهَا وَتَصَوَّنُوا بِهَا',
    english: 'Guard taqwā, and let yourselves be guarded by it.',
    source: 'Nahj al-Balagha, Sermon 191',
    theme: 'on taqwā as mutual guarding',
  },
  {
    arabic:
      'فَمَنْ أَخَذَ بِالتَّقْوَى عَزَبَتْ عَنْهُ الشَّدَائِدُ بَعْدَ دُنُوِّهَا، وَاحْلَوْلَتْ لَهُ الْأُمُورُ بَعْدَ مَرَارَتِهَا، وَانْفَرَجَتْ عَنْهُ الْأَمْوَاجُ بَعْدَ تَرَاكُمِهَا',
    english: 'Whoever takes hold of taqwā — hardships withdraw from him after their nearness, affairs grow sweet after their bitterness, and waves part after their piling up.',
    source: 'Nahj al-Balagha, Sermon 198',
    theme: 'on what taqwā unlocks',
  },
  {
    arabic: 'اِتَّقِ اللَّهَ فِي السِّرِّ وَالْعَلَانِيَةِ',
    english: 'Fear God in secret and in the open.',
    source: 'Nahj al-Balagha, Letter 69',
    theme: 'on taqwā in private and in public',
  },
  {
    arabic:
      'أَلَا وَإِنَّ الْخَطَايَا خَيْلٌ شُمُسٌ حُمِلَ عَلَيْهَا أَهْلُهَا، وَخُلِعَتْ لُجُمُهَا، فَتَقَحَّمَتْ بِهِمْ فِي النَّارِ',
    english: 'Sins are unruly horses upon which their riders are mounted, with their bridles cast off, so they hurl them headlong into the Fire.',
    source: 'Nahj al-Balagha, Sermon 16',
    theme: 'on the metaphor of sins as runaway horses',
  },

  // ── Time, the worth of moments ──────────────────────────────────
  {
    arabic: 'إِنَّ اللَّيْلَ وَالنَّهَارَ يَعْمَلَانِ فِيكَ، فَاعْمَلْ فِيهِمَا، وَيَأْخُذَانِ مِنْكَ، فَخُذْ مِنْهُمَا',
    english: 'The night and the day work upon you, so work in them; they take from you, so take from them.',
    source: 'Nahj al-Balagha, Saying 380',
    theme: 'on time working on us',
  },
  {
    arabic: 'نَفَسُ الْمَرْءِ خُطَاهُ إِلَى أَجَلِهِ',
    english: "Each of a person's breaths is a step toward his appointed end.",
    source: 'Nahj al-Balagha, Saying 74',
    theme: 'on the value of one breath',
  },
  {
    arabic: 'الْفُرْصَةُ تَمُرُّ مَرَّ السَّحَابِ، فَانْتَهِزُوا فُرَصَ الْخَيْرِ',
    english: 'Opportunity passes by like a passing cloud, so seize the openings of good.',
    source: 'Nahj al-Balagha, Saying 21',
    theme: 'on the hour that does not return',
  },
  {
    arabic:
      'مَا مَضَى مِنْ عُمُرِكَ فَلَيْسَ بِعَائِدٍ إِلَيْكَ، فَاحْذَرْ أَنْ يَنْقَضِيَ وَأَنْتَ عَلَى غَيْرِ طَاعَةٍ',
    english: 'What has passed of your lifetime will not return to you, so beware lest the rest pass while you are upon other than obedience.',
    source: 'Ghurar al-Hikam',
    theme: 'on irrevocability of the passed hour',
  },
  {
    arabic: 'يَوْمُكَ أَمَامَكَ، وَأَمْسِكَ شَاهِدٌ عَلَيْكَ',
    english: 'Your today is before you, and your yesterday is a witness against you.',
    source: 'Nahj al-Balagha, Letter 69',
    theme: 'on today vs yesterday',
  },
  {
    arabic:
      'إِنَّمَا أَنْتَ عَدَدُ أَيَّامٍ، فَكُلُّ يَوْمٍ يَمْضِي عَلَيْكَ يَمْضِي بِبَعْضِكَ',
    english: 'You are nothing but a count of days; every day that passes over you takes a part of you with it.',
    source: 'Nahj al-Balagha, Saying 74',
    theme: 'on the believer as a count of days',
  },
  {
    arabic:
      'مَنْ كَانَ يَوْمُهُ خَيْرًا مِنْ أَمْسِهِ فَهُوَ رَابِحٌ، وَمَنْ كَانَ يَوْمُهُ مِثْلَ أَمْسِهِ فَهُوَ مَغْبُونٌ',
    english: "Whoever's today is better than his yesterday is a gainer; whoever's today is the same as his yesterday is cheated.",
    source: 'Ghurar al-Hikam',
    theme: 'on daily moral profit',
  },
  {
    arabic: 'الْأَيَّامُ تُوضِحُ لَكَ السَّرَائِرَ الْكَامِنَةَ',
    english: 'The days lay bare for you the hidden secrets.',
    source: 'Ghurar al-Hikam',
    theme: 'on time as revealer',
  },
  {
    arabic: 'الْأَيَّامُ صَحَائِفُ آجَالِكُمْ، فَخَلِّدُوهَا أَحْسَنَ أَعْمَالِكُمْ',
    english: 'The days are the pages of your appointed lives, so immortalize upon them your best deeds.',
    source: 'Ghurar al-Hikam',
    theme: 'on days as pages',
  },
  {
    arabic: 'لِيَكُنْ يَوْمُكَ خَيْرًا لَكَ مِنْ أَمْسِكَ',
    english: 'Let your today be better for you than your yesterday.',
    source: 'Ghurar al-Hikam',
    theme: 'on the daily ascent',
  },
  {
    arabic: 'يَوْمُكَ وَدِيعَةٌ عِنْدَكَ، فَأَحْسِنْ فِيهِ',
    english: 'Your day is a trust placed with you, so do well within it.',
    source: 'Ghurar al-Hikam',
    theme: 'on the day as amāna',
  },
  {
    arabic: 'الْأَيَّامُ تَنْهَبُ الْأَعْمَارَ',
    english: 'The days plunder the lifetimes.',
    source: 'Ghurar al-Hikam',
    theme: 'on time as thief',
  },
  {
    arabic:
      'مَنْ أَمْضَى يَوْمَهُ فِي غَيْرِ حَقٍّ قَضَاهُ، أَوْ فَرْضٍ أَدَّاهُ، أَوْ مَجْدٍ أَثَّلَهُ، أَوْ حَمْدٍ حَصَّلَهُ، أَوْ خَيْرٍ أَسَّسَهُ، أَوْ عِلْمٍ اقْتَبَسَهُ، فَقَدْ عَقَّ يَوْمَهُ وَظَلَمَ نَفْسَهُ',
    english: 'Whoever spends his day in other than a right he discharged, a duty he fulfilled, a noble work he established, praise he earned, good he founded, or knowledge he acquired, has wronged his day and oppressed his own soul.',
    source: 'Ghurar al-Hikam',
    theme: 'on the squandered day',
  },
  {
    arabic: 'بَادِرُوا بِالْعَمَلِ عُمُرًا نَاكِسًا، أَوْ مَرَضًا حَابِسًا، أَوْ مَوْتًا خَالِسًا',
    english: 'Hasten to work before a lifetime that bends low, or an illness that confines, or a death that snatches away.',
    source: 'Nahj al-Balagha, Sermon 190',
    theme: 'on the closing window',
  },
  {
    arabic: 'إِضَاعَةُ الْفُرْصَةِ غُصَّةٌ',
    english: 'The squandering of an opportunity is a choking grief.',
    source: 'Nahj al-Balagha, Saying 118',
    theme: 'on the bitterness of wasted time',
  },
  {
    arabic: 'مَنْ جَرَى فِي عِنَانِ أَمَلِهِ عَثَرَ بِأَجَلِهِ',
    english: 'Whoever runs loose at the rein of his expectation stumbles upon his appointed end.',
    source: 'Nahj al-Balagha, Saying 19',
    theme: 'on tomorrow that is not yet yours',
  },
  {
    arabic: 'الْأَيَّامُ تَنْهَبُ أَعْمَارَكُمْ، وَالْمَوْتُ يَطْوِي آجَالَكُمْ، فَبَادِرُوا أَوْقَاتَكُمْ بِالْأَعْمَالِ الصَّالِحَةِ',
    english: 'The days plunder your lifespans and death folds up your appointed terms — so race against your remaining time with righteous deeds.',
    source: 'Ghurar al-Hikam',
    theme: 'on hastening to deeds',
  },

  // ── The believer's character (mu'min sketches) ───────────────────
  {
    arabic: 'الْمُؤْمِنُ مِرْآةُ الْمُؤْمِنِ',
    english: 'The believer is the mirror of the believer.',
    source: 'Ghurar al-Hikam',
    theme: 'on brotherhood, on the mirror',
  },
  {
    arabic: 'الْمُؤْمِنُ صَمْتُهُ فِكْرٌ، وَنُطْقُهُ ذِكْرٌ',
    english: "The believer — his silence is thought, and his speech is remembrance of God.",
    source: 'Ghurar al-Hikam',
    theme: 'on the believer\'s silence',
  },
  {
    arabic: 'الْمُؤْمِنُ قَوِيٌّ فِي دِينِهِ، حَازِمٌ فِي لِينٍ',
    english: 'The believer is strong in his religion, resolute together with gentleness.',
    source: 'Nahj al-Balagha, Saying 333',
    theme: 'on the believer\'s strength with softness',
  },
  {
    arabic: 'الْمُؤْمِنُ يَوْمُهُ شُكْرٌ، وَلَيْلُهُ ذِكْرٌ',
    english: "The believer — his day is gratitude, and his night is remembrance.",
    source: 'Ghurar al-Hikam',
    theme: 'on the believer\'s day and night',
  },
  {
    arabic: 'الْمُؤْمِنُ لَا يَتَشَكَّى، وَلَا يَتَسَخَّطُ، وَلَا يَتَبَرَّمُ',
    english: 'The believer does not grumble, does not become enraged, and does not grow weary.',
    source: 'Ghurar al-Hikam',
    theme: 'on the believer never grumbling',
  },
  {
    arabic: 'الْمُؤْمِنُ رَجَاؤُهُ أَرْجَحُ مِنْ خَوْفِهِ',
    english: "The believer — his hope outweighs his fear.",
    source: 'Ghurar al-Hikam',
    theme: 'on the believer\'s balance, on hope outweighing fear',
  },
  {
    arabic: 'الْمُؤْمِنُ رَفِيقٌ بِمَنْ عَادَاهُ، رَحِيمٌ بِمَنْ آذَاهُ',
    english: 'The believer is gentle with the one who shows him enmity, merciful to the one who harms him.',
    source: 'Ghurar al-Hikam',
    theme: 'on the believer\'s kindness to enemies',
  },
  {
    arabic:
      'الْمُؤْمِنُ دَائِمُ الذِّكْرِ، كَثِيرُ الْفِكْرِ، عَلَى النَّعْمَاءِ شَاكِرٌ، وَفِي الْبَلَاءِ صَابِرٌ',
    english: 'The believer is constant in remembrance, abundant in thought, grateful in blessings, patient in trial.',
    source: 'Ghurar al-Hikam',
    theme: 'on the four-pillar sketch of the believer',
  },
  {
    arabic:
      'الْمُؤْمِنُ مَنْ وَسِعَ النَّاسَ حِلْمُهُ، وَكَفَاهُمْ عِلْمُهُ، وَأَنْصَفَهُمْ مِنْ نَفْسِهِ',
    english: 'The believer is one whose forbearance encompasses the people, whose knowledge suffices them, and who deals justly with them out of his own self.',
    source: 'Ghurar al-Hikam',
    theme: 'on the believer\'s justice toward people',
  },
  {
    arabic: 'الْمُؤْمِنُ هَيِّنٌ لَيِّنٌ، سَهْلُ الْخَلِيقَةِ، لَيِّنُ الْعَرِيكَةِ',
    english: 'The believer is easy-going and gentle, of pliant nature, of soft disposition.',
    source: 'Ghurar al-Hikam',
    theme: 'on the believer\'s gentleness',
  },
  {
    arabic: 'الْمُؤْمِنُ لَا يَغُشُّ أَخَاهُ، وَلَا يَخُونُهُ، وَلَا يَخْذُلُهُ، وَلَا يَتَّهِمُهُ',
    english: 'The believer does not deceive his brother, nor betray him, nor abandon him, nor accuse him.',
    source: 'Ghurar al-Hikam',
    theme: 'on the believer\'s loyalty to his brother',
  },
  {
    arabic: 'الْمُؤْمِنُ مَنْ سَلِمَ قَلْبُهُ مِنْ كُلِّ غِشٍّ، وَنَفْسُهُ مِنْ كُلِّ شَرٍّ',
    english: "The believer is one whose heart is safe from every deceit, and whose self is safe from every evil.",
    source: 'Ghurar al-Hikam',
    theme: 'on the believer\'s purity of heart',
  },
  {
    arabic: 'الْمُؤْمِنُ نَزِهُ الْأَخْلَاقِ، رَفِيعُ الْهِمَّةِ، كَرِيمُ الطَّبِيعَةِ',
    english: 'The believer is pure of character, lofty of resolve, noble of nature.',
    source: 'Ghurar al-Hikam',
    theme: 'on the believer\'s nobility',
  },
  {
    arabic: 'الْمُؤْمِنُ بَيْنَ نِعْمَةٍ وَخَطِيئَةٍ، لَا يُصْلِحُهُمَا إِلَّا الشُّكْرُ وَالِاسْتِغْفَارُ',
    english: 'The believer is between a blessing and a sin — nothing sets them right except gratitude and seeking forgiveness.',
    source: 'Ghurar al-Hikam',
    theme: 'on gratitude and repentance as daily medicines',
  },
  {
    arabic: 'الْمُؤْمِنُ إِذَا قَالَ صَدَقَ، وَإِذَا حَكَمَ عَدَلَ، وَإِذَا عَلِمَ عَمِلَ',
    english: 'The believer — when he speaks, he is truthful; when he judges, he is just; when he knows, he acts.',
    source: 'Ghurar al-Hikam',
    theme: 'on the believer\'s integrity',
  },
  {
    arabic: 'الْمُؤْمِنُ مَنْ كَانَ نَفْعُهُ يُرْجَى، وَشَرُّهُ يُؤْمَنُ',
    english: 'The believer is one whose benefit is hoped for and whose harm is felt safe from.',
    source: 'Ghurar al-Hikam',
    theme: 'on the believer\'s trustworthiness',
  },

  // ── Munāfiq (warnings against duplicity) ─────────────────────────
  {
    arabic:
      'شَرُّ النَّاسِ مَنْ كَانَ ذَا وَجْهَيْنِ وَلِسَانَيْنِ، يُطْرِي أَخَاهُ شَاهِدًا وَيَأْكُلُهُ غَائِبًا',
    english: 'The worst of people is the one with two faces and two tongues: he flatters his brother in his presence and devours him in his absence.',
    source: 'Nahj al-Balagha, Saying 35',
    theme: 'on the two-faced, on hypocrisy',
  },
  {
    arabic:
      'لَا تَكُنْ مِمَّنْ يَرْجُو الْآخِرَةَ بِغَيْرِ الْعَمَلِ، وَيُرَجِّي التَّوْبَةَ بِطُولِ الْأَمَلِ، يَقُولُ فِي الدُّنْيَا بِقَوْلِ الزَّاهِدِينَ، وَيَعْمَلُ فِيهَا بِعَمَلِ الرَّاغِبِينَ',
    english: 'Be not of those who hope for the Hereafter without action and postpone repentance by long-drawn hopes — who speak in this world with the speech of the ascetics yet act in it with the deeds of the covetous.',
    source: 'Nahj al-Balagha, Saying 150',
    theme: 'on hope without works, on hypocrisy of rajāʾ',
  },
  {
    arabic: 'الْمُنَافِقُ لِسَانُهُ يُخَالِفُ قَلْبَهُ، وَقَوْلُهُ يُخَالِفُ فِعْلَهُ',
    english: 'The hypocrite — his tongue contradicts his heart, and his speech contradicts his deed.',
    source: 'Ghurar al-Hikam',
    theme: 'on the hypocrite, on the tongue contradicting the heart',
  },
  {
    arabic: 'أَقْبَحُ شَيْءٍ النِّفَاقُ',
    english: 'The ugliest of all things is hypocrisy.',
    source: 'Ghurar al-Hikam',
    theme: 'on hypocrisy',
  },
  {
    arabic: 'بِئْسَ الْخَلِيقَةُ النِّفَاقُ',
    english: 'What an evil disposition is hypocrisy.',
    source: 'Ghurar al-Hikam',
    theme: 'on hypocrisy as character',
  },
  {
    arabic: 'النِّفَاقُ يُفْسِدُ الْإِيمَانَ',
    english: 'Hypocrisy corrupts faith.',
    source: 'Ghurar al-Hikam',
    theme: 'on the corruption of faith',
  },
  {
    arabic: 'النِّفَاقُ تَوْأَمُ الشِّرْكِ',
    english: 'Hypocrisy is the twin of polytheism.',
    source: 'Ghurar al-Hikam',
    theme: 'on hypocrisy and shirk',
  },
  {
    arabic: 'ذُو الْوَجْهَيْنِ لَا يَكُونُ وَجِيهًا عِنْدَ اللَّهِ',
    english: 'The two-faced one shall hold no standing with God.',
    source: 'Ghurar al-Hikam',
    theme: 'on the two-faced',
  },
  {
    arabic: 'شَرُّ النَّاسِ ذُو الْوَجْهَيْنِ وَاللِّسَانَيْنِ',
    english: 'The worst of people is the one of two faces and two tongues.',
    source: 'Ghurar al-Hikam',
    theme: 'on the two-faced',
  },
  {
    arabic:
      'مَنْ أَظْهَرَ لِلنَّاسِ مَا يُحِبُّ اللَّهُ، وَبَارَزَ اللَّهَ بِمَا يَكْرَهُ، لَقِيَ اللَّهَ وَهُوَ عَلَيْهِ غَضْبَانُ',
    english: 'Whoever shows the people what God loves and confronts God in private with what He detests — he shall meet God while He is wroth with him.',
    source: 'Nahj al-Balagha, Saying 273',
    theme: 'on hidden duplicity, on private sin',
  },
  {
    arabic: 'إِيَّاكَ وَالنِّفَاقَ، فَإِنَّ ذَا الْوَجْهَيْنِ لَا يَكُونُ وَجِيهًا عِنْدَ اللَّهِ',
    english: 'Beware of hypocrisy, for the two-faced one will hold no standing with God.',
    source: 'Ghurar al-Hikam',
    theme: 'on warning against hypocrisy',
  },
  {
    arabic: 'مَنْ كَسَاهُ الْحَيَاءُ ثَوْبَهُ، لَمْ يَرَ النَّاسُ عَيْبَهُ',
    english: 'Whoever modesty has clothed in its garment — people shall not see his fault.',
    source: 'Nahj al-Balagha, Saying 223',
    theme: 'on modesty as covering',
  },
  {
    arabic:
      'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ أَنْ تُحَسِّنَ فِي لَامِعَةِ الْعُيُونِ عَلَانِيَتِي، وَتُقَبِّحَ فِيمَا أُبْطِنُ لَكَ سَرِيرَتِي',
    english: "O God, I take refuge in You lest You beautify my outward appearance in the gleam of people's eyes while making ugly my inner self that I conceal before You.",
    source: 'Nahj al-Balagha, Saying 100',
    theme: 'on hidden hypocrisy, on the inner self',
  },
  {
    arabic: 'الْمُنَافِقُ قَوْلُهُ جَمِيلٌ وَفِعْلُهُ الدَّاءُ الدَّخِيلُ',
    english: 'The hypocrite — his speech is beautiful, but his action is the disease that creeps within.',
    source: 'Ghurar al-Hikam',
    theme: 'on the hypocrite\'s speech',
  },
  {
    arabic:
      'كَفَى بِالْمَرْءِ نِفَاقًا أَنْ يَكُونَ لَهُ وَجْهَانِ وَلِسَانَانِ، يَمْدَحُ أَخَاهُ شَاهِدًا، وَيَأْكُلُهُ غَائِبًا',
    english: 'Hypocrisy enough it is for a man that he have two faces and two tongues — praising his brother to his face and devouring him behind his back.',
    source: 'Ghurar al-Hikam',
    theme: 'on the marks of hypocrisy',
  },
  {
    arabic: 'مَنْ لَبِسَ الْكِبْرَ وَالسَّرَفَ خَلَعَ الْفَضْلَ',
    english: 'Whoever clothes himself in arrogance and excess strips off all excellence.',
    source: 'Ghurar al-Hikam',
    theme: 'on what arrogance strips away',
  },
  {
    arabic: 'ثَمَرَةُ النِّفَاقِ الْمَقْتُ',
    english: 'The fruit of hypocrisy is being despised.',
    source: 'Ghurar al-Hikam',
    theme: 'on the fruit of hypocrisy',
  },
  {
    arabic:
      'بِئْسَ الْعَبْدُ عَبْدٌ يَكُونُ ذَا وَجْهَيْنِ وَذَا لِسَانَيْنِ، يُطْرِي أَخَاهُ شَاهِدًا وَيَأْكُلُهُ غَائِبًا، إِنْ أُعْطِيَ حَسَدَهُ، وَإِنِ ابْتُلِيَ خَذَلَهُ',
    english: 'Wretched is the servant who is two-faced and two-tongued — flattering his brother when present and devouring him when absent; if his brother is given a favour he envies him, and if his brother is afflicted he forsakes him.',
    source: 'Ghurar al-Hikam',
    theme: 'on the wretchedness of duplicity',
  },

  // ── Death-readiness ──────────────────────────────────────────────
  {
    arabic:
      'تَجَهَّزُوا رَحِمَكُمُ اللَّهُ فَقَدْ نُودِيَ فِيكُمْ بِالرَّحِيلِ، وَأَقِلُّوا الْعُرْجَةَ عَلَى الدُّنْيَا، وَانْقَلِبُوا بِصَالِحِ مَا بِحَضْرَتِكُمْ مِنَ الزَّادِ',
    english: 'Prepare yourselves — the call to depart has gone out among you. Lessen your lingering over this world, and turn back with the good provision that is at hand.',
    source: 'Nahj al-Balagha, Sermon 204',
    theme: 'on preparing for death, on provision',
  },
  {
    arabic: 'فَإِنَّ الْغَايَةَ الْقِيَامَةُ، وَكَفَى بِذَلِكَ وَاعِظًا لِمَنْ عَقَلَ، وَمُعْتَبَرًا لِمَنْ جَهِلَ',
    english: 'The end is the Day of Resurrection. That alone suffices as a counsellor for the wise and a lesson for the ignorant.',
    source: 'Nahj al-Balagha, Sermon 190',
    theme: 'on preparing for death, on the end as reminder',
  },
  {
    arabic:
      'عِبَادَ اللَّهِ، الْآنَ فَاعْلَمُوا، وَالْأَلْسُنُ مُطْلَقَةٌ، وَالْأَبْدَانُ صَحِيحَةٌ، وَالْأَعْضَاءُ لَدْنَةٌ، وَالْمُنْقَلَبُ فَسِيحٌ، وَالْمَجَالُ عَرِيضٌ، قَبْلَ إِرْهَاقِ الْفَوْتِ، وَحُلُولِ الْمَوْتِ',
    english: 'Servants of God, act now while tongues are free, bodies sound, limbs supple, the way back open, and the field wide — before loss overtakes you and death descends.',
    source: 'Nahj al-Balagha, Sermon 196',
    theme: 'on act now, on the closing window',
  },
  {
    arabic: 'مَنْ كَتَبَ وَصِيَّتَهُ فَقَدِ اسْتَدْرَكَ، وَأَعَدَّ لِيَوْمِهِ الَّذِي إِلَيْهِ يَصِيرُ',
    english: 'Whoever writes his will has set his affairs in order and prepared for the day to which he is returning.',
    source: 'Ghurar al-Hikam',
    theme: 'on writing the will',
  },
  {
    arabic: 'يَا ابْنَ آدَمَ، إِنَّكَ لَمْ تَزَلْ فِي هَدْمِ عُمُرِكَ مُنْذُ سَقَطْتَ مِنْ بَطْنِ أُمِّكَ، فَخُذْ مِمَّا فِي يَدَيْكَ لِمَا بَيْنَ يَدَيْكَ',
    english: 'Son of Adam, you have been demolishing your life from the moment you fell from your mother\'s womb. So take from what is in your hands for what lies before you.',
    source: 'Nahj al-Balagha, Saying 64',
    theme: 'on the demolition of life, on taking from what is in your hands',
  },
  {
    arabic: 'أَكْثِرْ ذِكْرَ الْمَوْتِ وَمَا بَعْدَهُ، وَلَا تَتَمَنَّ الْمَوْتَ إِلَّا بِشَرْطٍ وَثِيقٍ',
    english: 'Increase the remembrance of death and what comes after it, and do not wish for death except on a firm condition of readiness.',
    source: 'Nahj al-Balagha, Letter 69',
    theme: 'on remembering death, on readiness',
  },
  {
    arabic:
      'مَا الْمُجَاهِدُ الشَّهِيدُ فِي سَبِيلِ اللَّهِ بِأَعْظَمَ أَجْرًا مِمَّنْ قَدَرَ فَعَفَّ، لَكَادَ الْعَفِيفُ أَنْ يَكُونَ مَلَكًا مِنَ الْمَلَائِكَةِ',
    english: 'The martyr is not greater in reward than the one who could sin but restrained himself; the chaste man is nearly an angel.',
    source: 'Nahj al-Balagha, Saying 474',
    theme: 'on self-restraint as a kind of martyrdom',
  },
  {
    arabic:
      'مَا حَقُّ امْرِئٍ مُسْلِمٍ لَهُ شَيْءٌ يُوصِي بِهِ يَبِيتُ لَيْلَتَيْنِ إِلَّا وَوَصِيَّتُهُ مَكْتُوبَةٌ عِنْدَهُ',
    english: 'It is not right for a Muslim who has something to bequeath to spend two nights without his will written and kept by him.',
    source: 'Prophetic tradition transmitted by Imam Ali; al-Kafi vol. 7',
    theme: 'on writing the will, on not postponing',
  },
  {
    arabic: 'بَادِرُوا الْعَمَلَ وَخَافُوا بَغْتَةَ الْأَجَلِ',
    english: 'Hasten to good works and fear the sudden arrival of the appointed end.',
    source: 'Nahj al-Balagha, Sermon 188',
    theme: 'on the sudden arrival of death',
  },
  {
    arabic: 'مَنْ أَيْقَنَ بِالْخَلَفِ جَادَ بِالْعَطِيَّةِ',
    english: 'Whoever is certain of the recompense is generous with giving.',
    source: 'Nahj al-Balagha, Saying 138',
    theme: 'on sending ahead, on certainty as a spur to giving',
  },
  {
    arabic:
      'مُسَوِّفُ نَفْسِهِ بِالتَّوْبَةِ مِنْ هُجُومِ الْأَجَلِ عَلَى أَعْظَمِ الْخَطَرِ',
    english: 'Whoever puts off repentance until later faces the gravest danger from the sudden assault of the appointed end.',
    source: 'Ghurar al-Hikam',
    theme: 'on postponement, on the danger of "tomorrow"',
  },
  {
    arabic: 'لِيَكُنْ كُلُّ يَوْمٍ مِنْ أَيَّامِكَ خَيْرًا مِنْ أَمْسِكَ، وَاجْعَلْ غَدًا تَوْبَةً وَتَزَوُّدًا',
    english: 'Let every one of your days be better than yesterday, and make tomorrow a day of repentance and gathering provision.',
    source: 'Ghurar al-Hikam',
    theme: 'on daily renewal, on live as if today is your last',
  },
  {
    arabic:
      'تَزَوَّدُوا فِي أَيَّامِ الْفَنَاءِ لِأَيَّامِ الْبَقَاءِ',
    english: 'Gather provision in the days of perishing for the days of permanence.',
    source: 'Nahj al-Balagha, Sermon 198',
    theme: 'on provision, on gathering for the Hereafter',
  },
  {
    arabic: 'مَا أَحْسَنَ تَوَاضُعَ الْغَنِيِّ، وَأَحْسَنَ مِنْهُ تِيهُ الْفَقِيرِ اتِّكَالًا عَلَى اللَّهِ',
    english: 'How beautiful is the humility of the rich, and more beautiful still is the pride of the poor in reliance upon God.',
    source: 'Nahj al-Balagha, Saying 406',
    theme: 'on dignity in poverty, on reliance on God before the grave',
  },

  // ── Intercession (shafāʿa) ───────────────────────────────────────
  {
    arabic: 'إِنَّ أَفْضَلَ الشُّفَعَاءِ لَكَ عَمَلُكَ',
    english: 'The best of intercessors for you is your own deed.',
    source: 'Ghurar al-Hikam',
    theme: 'on deeds as intercessor',
  },
  {
    arabic: 'نِعْمَ الشَّفِيعُ الْإِقْرَارُ بِالذَّنْبِ',
    english: 'What an excellent intercessor is the confession of sin.',
    source: 'Ghurar al-Hikam',
    theme: 'on confession as intercessor',
  },
  {
    arabic: 'الشَّفِيعُ جَنَاحُ الطَّالِبِ',
    english: 'The intercessor is the wing of the seeker.',
    source: 'Nahj al-Balagha, Saying 63',
    theme: 'on intercessor as the seeker\'s wing',
  },
  {
    arabic:
      'إِنَّهُ يُنَادِي مُنَادٍ يَوْمَ الْقِيَامَةِ: أَلَا إِنَّ كُلَّ حَارِثٍ مُبْتَلًى فِي حَرْثِهِ وَعَاقِبَةِ عَمَلِهِ غَيْرَ حَرَثَةِ الْقُرْآنِ',
    english: 'A caller will call out on the Day of Resurrection: Behold, every cultivator is tested in his crop and the end of his deed, save the cultivators of the Qur\'an.',
    source: 'Nahj al-Balagha, Sermon 176',
    theme: 'on the Qur\'an as exception, on the cultivators',
  },
  {
    arabic: 'فَكُونُوا مِنْ حَرَثَتِهِ وَأَتْبَاعِهِ',
    english: 'So be of its cultivators and its followers.',
    source: 'Nahj al-Balagha, Sermon 176',
    theme: 'on qualifying for intercession',
  },
  {
    arabic:
      'وَاسْتَشْفِعُوهُ إِلَى رَبِّكُمْ وَاسْتَنْصِحُوهُ عَلَى أَنْفُسِكُمْ',
    english: "Seek the Qur'an's intercession with your Lord, and seek its counsel against yourselves.",
    source: 'Nahj al-Balagha, Sermon 156',
    theme: 'on seeking the Qur\'an\'s intercession',
  },
  {
    arabic: 'وَاتَّهِمُوا عَلَيْهِ آرَاءَكُمْ وَاسْتَغِشُّوا فِيهِ أَهْوَاءَكُمْ',
    english: 'Distrust your own opinions against it, and consider your desires its betrayers.',
    source: 'Nahj al-Balagha, Sermon 156',
    theme: 'on surrendering opinion to the Qur\'an',
  },
  {
    arabic: 'إِنَّا أَهْلَ الْبَيْتِ شُفَعَاءُ يَوْمَ الْقِيَامَةِ',
    english: 'Verily we, the People of the House, are intercessors on the Day of Resurrection.',
    source: 'al-Kafi, vol. 8',
    theme: 'on Ahl al-Bayt as intercessors',
  },
  {
    arabic: 'مَنْ لَمْ يُؤْمِنْ بِشَفَاعَتِنَا فَلَيْسَ مِنَّا',
    english: 'Whoever does not believe in our intercession is not of us.',
    source: 'al-Kafi, vol. 8',
    theme: 'on belief in intercession',
  },
  {
    arabic: 'لَا تَنَالُ شَفَاعَتُنَا مَنِ اسْتَخَفَّ بِالصَّلَاةِ',
    english: 'Our intercession does not reach one who treats the prayer lightly.',
    source: 'al-Kafi, vol. 3',
    theme: 'on the conditions of intercession',
  },
  {
    arabic: 'مَنْ شَفَعَتْ لَهُ الْآخِرَةُ عَلَى الدُّنْيَا فَازَ بِالنَّصِيبَيْنِ',
    english: 'Whoever lets the Hereafter intercede for him over this world wins both portions.',
    source: 'Nahj al-Balagha, Saying 269',
    theme: 'on the Hereafter as intercessor',
  },

  // ── Health, body, moderation ─────────────────────────────────────
  {
    arabic: 'الصِّحَّةُ أَفْضَلُ النِّعَمِ',
    english: 'Health is the most excellent of blessings.',
    source: 'Ghurar al-Hikam',
    theme: 'on health as gift',
  },
  {
    arabic: 'بِالصِّحَّةِ تُسْتَكْمَلُ اللَّذَّةُ',
    english: 'It is through health that pleasure is made complete.',
    source: 'Ghurar al-Hikam',
    theme: 'on well-being',
  },
  {
    arabic: 'نِعْمَتَانِ مَجْهُولَتَانِ: الصِّحَّةُ وَالأَمَانُ',
    english: 'Two blessings whose worth is not known: health and security.',
    source: 'Attributed to Imam Ali; cf. Ghurar al-Hikam',
    theme: 'on hidden blessings, on noticing health',
  },
  {
    arabic: 'لَا صِحَّةَ مَعَ النَّهَمِ',
    english: 'There is no soundness of body with gluttony.',
    source: 'Ghurar al-Hikam',
    theme: 'on moderation in food',
  },
  {
    arabic:
      'مَنْ أَقَلَّ طَعَامَهُ صَحَّ بَدَنُهُ وَصَفَا قَلْبُهُ، وَمَنْ أَكْثَرَ طَعَامَهُ سَقُمَ بَدَنُهُ وَقَسَا قَلْبُهُ',
    english: 'Whoever lessens his food — his body is sound and his heart is clear; whoever increases his food — his body grows sick and his heart hardens.',
    source: 'Attributed to Imam Ali; Bihar al-Anwar',
    theme: 'on eating less, on the link between food and the heart',
  },
  {
    arabic: 'كُلْ وَأَنْتَ تَشْتَهِي، وَأَمْسِكْ وَأَنْتَ تَشْتَهِي',
    english: 'Eat while you still have appetite — and stop while you still have appetite.',
    source: "Attributed to Imam Ali; al-Kafi, Kitab al-At'ima",
    theme: 'on moderation, on the discipline of the table',
  },
  {
    arabic: 'مَا مِنْ شَيْءٍ أَبْغَضَ إِلَى اللَّهِ مِنْ بَطْنٍ مَمْلُوءٍ',
    english: 'Nothing is more hateful to God than a stomach filled full.',
    source: "al-Kafi, vol. 6, Kitab al-At'ima",
    theme: 'on the full stomach',
  },
  {
    arabic:
      'إِنَّ لِهَذِهِ الْقُلُوبَ إِقْبَالًا وَإِدْبَارًا، فَإِذَا أَقْبَلَتْ فَاحْمِلُوهَا عَلَى النَّوَافِلِ، وَإِذَا أَدْبَرَتْ فَاقْتَصِرُوا بِهَا عَلَى الْفَرَائِضِ',
    english: 'These hearts have an advancing and a retreating — when they advance, carry them to voluntary acts; when they retreat, restrict them to the obligatory.',
    source: 'Nahj al-Balagha, Saying 312',
    theme: 'on the rhythm of the heart, on not forcing the self',
  },
  {
    arabic: 'إِنَّ لِنَفْسِكَ عَلَيْكَ حَقًّا، وَلِأَهْلِكَ عَلَيْكَ حَقًّا، فَأَعْطِ كُلَّ ذِي حَقٍّ حَقَّهُ',
    english: 'Your self has a right upon you, and your family has a right upon you — so give each holder of a right his right.',
    source: 'Nahj al-Balagha, Saying 390',
    theme: 'on the rights of the self, on the rights of the body',
  },
  {
    arabic: 'وَإِنَّ بَدَنَكَ لَا يُعْطِيكَ فَوْقَ قُوَّتِهِ',
    english: 'Your body will not give you beyond its strength.',
    source: 'Nahj al-Balagha, Letter 31',
    theme: 'on the limits of the body',
  },
  {
    arabic: 'النَّوْمُ أَخُو الْمَوْتِ',
    english: 'Sleep is the brother of death.',
    source: 'Attributed to Imam Ali; cf. Nahj al-Balagha',
    theme: 'on sleep, on the daily small dying',
  },
  {
    arabic: 'النَّظَافَةُ مِنَ الْإِيمَانِ',
    english: 'Cleanliness is part of faith.',
    source: 'Transmitted through the Imams; cf. al-Kafi, Kitab al-Tahara',
    theme: 'on cleanliness',
  },
  {
    arabic:
      'تَعَهَّدُوا أَنْفُسَكُمْ بِالنَّظَافَةِ، فَإِنَّ اللَّهَ تَعَالَى يُبْغِضُ الْقَاذُورَةَ',
    english: 'Tend to yourselves with cleanliness — for God dislikes the unkempt.',
    source: "Transmitted from Imam Ali; al-Kafi, vol. 6, Kitab al-Zayy wa-l-Tajammul",
    theme: 'on grooming, on the believer\'s care for the body',
  },
  {
    arabic: 'اِجْعَلْ لِنَفْسِكَ فِيمَا بَيْنَكَ وَبَيْنَ اللَّهِ أَفْضَلَ تِلْكَ الْمَوَاقِيتِ، وَإِنْ كَانَتْ كُلُّهَا لِلَّهِ',
    english: 'Set aside for yourself, in what is between you and God, the best of those appointed times — though all of them belong to God.',
    source: 'Nahj al-Balagha, Letter 53',
    theme: 'on the body in worship, on rhythm of devotion',
  },

  // ── Prayer (ṣalāh) ───────────────────────────────────────────────
  {
    arabic: 'إِنَّ الصَّلَاةَ تَنْزِيهٌ عَنِ الْكِبْرِ',
    english: 'Truly prayer is a purification from arrogance.',
    source: 'Nahj al-Balagha, Saying 252',
    theme: 'on prayer as moral purification',
  },
  {
    arabic: 'تَعَاهَدُوا أَمْرَ الصَّلَاةِ وَحَافِظُوا عَلَيْهَا، وَاسْتَكْثِرُوا مِنْهَا، وَتَقَرَّبُوا بِهَا',
    english: 'Be mindful of the affair of prayer, guard it, perform it often, and draw near to God through it.',
    source: 'Nahj al-Balagha, Letter 27',
    theme: 'on guarding prayer',
  },
  {
    arabic:
      'وَإِنَّهَا لَتَحُتُّ الذُّنُوبَ حَتَّ الْوَرَقِ، وَتُطْلِقُهَا إِطْلَاقَ الرِّبَقِ',
    english: 'Prayer strips away sins as leaves are stripped from a tree, and unties them as ropes are loosed from the neck.',
    source: 'Nahj al-Balagha, Sermon 199',
    theme: 'on prayer as cleansing from sin',
  },
  {
    arabic:
      'شَبَّهَهَا رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ بِالْحَمَّةِ تَكُونُ عَلَى بَابِ الرَّجُلِ، فَهُوَ يَغْتَسِلُ مِنْهَا فِي الْيَوْمِ وَاللَّيْلَةِ خَمْسَ مَرَّاتٍ',
    english: "The Messenger of God likened the prayer to a hot-spring at a man's door, in which he bathes five times a day and night — what filth could possibly remain upon him?",
    source: 'Nahj al-Balagha, Sermon 199',
    theme: 'on the five prayers wash away sin',
  },
  {
    arabic: 'الصَّلَاةُ قُرْبَانُ كُلِّ تَقِيٍّ',
    english: 'Prayer is the offering by which every God-fearing person draws near.',
    source: 'Nahj al-Balagha, Saying 136',
    theme: 'on prayer as nearness to God',
  },
  {
    arabic: 'إِذَا قَامَ أَحَدُكُمْ إِلَى الصَّلَاةِ فَلْيُصَلِّ صَلَاةَ مُوَدِّعٍ',
    english: 'When one of you rises to pray, let him pray the prayer of one bidding farewell.',
    source: 'Ghurar al-Hikam',
    theme: 'on praying as if for the last time',
  },
  {
    arabic: 'الصَّلَاةُ حِصْنٌ مِنْ سَطَوَاتِ الشَّيْطَانِ',
    english: 'Prayer is a fortress against the assaults of Satan.',
    source: 'Ghurar al-Hikam',
    theme: 'on prayer as protection',
  },
  {
    arabic: 'الصَّلَاةُ مِفْتَاحُ كُلِّ خَيْرٍ',
    english: 'Prayer is the key to every good.',
    source: 'Ghurar al-Hikam',
    theme: 'on prayer opens every good',
  },
  {
    arabic: 'لَا قُرْبَةَ بِالنَّوَافِلِ إِذَا أَضَرَّتْ بِالْفَرَائِضِ',
    english: 'There is no drawing-near through supererogatory acts when they harm the obligatory ones.',
    source: 'Nahj al-Balagha, Saying 39',
    theme: 'on the priority of obligatory prayer',
  },
  {
    arabic: 'الصَّلَاةُ مَيْزَانٌ، مَنْ وَفَّى اسْتَوْفَى',
    english: 'Prayer is a balance: whoever fulfils it receives in full.',
    source: 'Nahj al-Balagha, Saying 139',
    theme: 'on prayer as the measure of recompense',
  },
  {
    arabic:
      'لَا يَقْبَلُ اللَّهُ صَلَاةَ عَبْدٍ لَا يَحْضُرُ قَلْبُهُ مَعَ بَدَنِهِ',
    english: 'God does not accept the prayer of a servant whose heart is not present with his body.',
    source: 'al-Kafi, Kitab al-Salah',
    theme: 'on presence of heart in prayer',
  },

  // ── Night vigil (qiyām al-layl) ──────────────────────────────────
  {
    arabic: 'نِعْمَ الْقُرَنَاءُ الْعِبَادَةُ فِي ظُلَمِ اللَّيْلِ',
    english: 'What excellent companions is worship in the darkness of the night.',
    source: 'Ghurar al-Hikam',
    theme: 'on qiyām al-layl',
  },
  {
    arabic: 'صَلَاةُ اللَّيْلِ مَكْسَبَةٌ لِلْجَنَّةِ',
    english: 'The night prayer is an acquisition of Paradise.',
    source: 'Ghurar al-Hikam',
    theme: 'on qiyām al-layl, on Paradise',
  },
  {
    arabic:
      'إِنَّ الْبُيُوتَ الَّتِي يُصَلَّى فِيهَا بِاللَّيْلِ بِتِلَاوَةِ الْقُرْآنِ تُضِيءُ لِأَهْلِ السَّمَاءِ كَمَا تُضِيءُ نُجُومُ السَّمَاءِ لِأَهْلِ الْأَرْضِ',
    english: 'The houses in which the night prayer is offered with the recitation of the Qur\'an shine for the people of heaven as the stars of heaven shine for the people of the earth.',
    source: 'al-Kafi, Kitab al-Salah, Bab Salat al-Layl',
    theme: 'on qiyām al-layl, on the light of the praying house',
  },
  {
    arabic:
      'شَرَفُ الْمُؤْمِنِ صَلَاتُهُ بِاللَّيْلِ، وَعِزُّهُ كَفُّ الْأَذَى عَنِ النَّاسِ',
    english: 'The honour of the believer is his prayer by night, and his might is restraining harm from people.',
    source: 'al-Kafi, Kitab al-Salah, Bab Salat al-Layl',
    theme: 'on the dawn believer, on what makes the believer noble',
  },
  {
    arabic:
      'عَلَيْكُمْ بِصَلَاةِ اللَّيْلِ، فَإِنَّهَا سُنَّةُ نَبِيِّكُمْ، وَمَطْرَدَةُ الدَّاءِ عَنْ أَجْسَادِكُمْ',
    english: 'Hold fast to the night prayer, for it is the practice of your Prophet, and a means of driving disease from your bodies.',
    source: 'al-Kafi, Kitab al-Salah, Bab Salat al-Layl',
    theme: 'on qiyām al-layl, on health',
  },
  {
    arabic: 'مَنْ صَلَّى بِاللَّيْلِ حَسُنَ وَجْهُهُ بِالنَّهَارِ',
    english: 'Whoever prays by night, his face becomes beautiful by day.',
    source: 'al-Kafi, Kitab al-Salah, Bab Salat al-Layl',
    theme: 'on the dawn believer',
  },
  {
    arabic:
      'كَذَبَ مَنْ زَعَمَ أَنَّهُ يُصَلِّي بِاللَّيْلِ وَهُوَ يَجُوعُ، إِنَّ اللَّهَ ضَمِنَ لَهُ قُوتَ النَّهَارِ وَنَوْمَ اللَّيْلِ',
    english: 'He lies who claims that he prays by night while remaining hungry; God has guaranteed him the sustenance of the day and the sleep of the night.',
    source: 'al-Kafi, Kitab al-Salah, Bab Salat al-Layl',
    theme: 'on qiyām al-layl, on God\'s provision',
  },
  {
    arabic:
      'إِنَّ الْعَبْدَ إِذَا تَخَلَّى بِسَيِّدِهِ فِي جَوْفِ اللَّيْلِ الْمُظْلِمِ وَنَاجَاهُ، أَثْبَتَ اللَّهُ النُّورَ فِي قَلْبِهِ',
    english: 'When the servant secludes himself with his Master in the depth of the dark night and whispers to Him, God fixes light within his heart.',
    source: 'al-Kafi, Kitab al-Salah, Bab Salat al-Layl',
    theme: 'on the last third of the night, on intimate prayer',
  },
  {
    arabic:
      'مَا مِنْ عَمَلٍ حَسَنٍ يَعْمَلُهُ الْعَبْدُ إِلَّا وَلَهُ ثَوَابٌ فِي الْقُرْآنِ، إِلَّا صَلَاةَ اللَّيْلِ، فَإِنَّ اللَّهَ لَمْ يُبَيِّنْ ثَوَابَهَا لِعِظَمِ خَطَرِهَا عِنْدَهُ',
    english: 'There is no good deed a servant performs but that its reward is stated in the Qur\'an, save the night prayer — God did not make its reward plain, due to its tremendous standing with Him.',
    source: 'al-Kafi, Kitab al-Salah, Bab Salat al-Layl',
    theme: 'on qiyām al-layl, on its hidden reward',
  },
  {
    arabic: 'خِيَارُ عِبَادِ اللَّهِ الَّذِينَ يُرَاعُونَ الشَّمْسَ وَالْقَمَرَ وَأَفْيَاءَ الْأَشْجَارِ لِذِكْرِ اللَّهِ',
    english: "The best of God's servants are those who watch the sun, the moon, and the shadows of the trees for the remembrance of God.",
    source: 'Attributed to Imam Ali; cf. Nahj al-Balagha',
    theme: 'on the dawn believer, on the rhythms of remembrance',
  },
  {
    arabic: 'السَّهَرُ فِي طَاعَةِ اللَّهِ رِبْحُ الْأَكْيَاسِ',
    english: 'Staying awake in obedience to God is the profit of the discerning.',
    source: 'Ghurar al-Hikam',
    theme: 'on the night vigil',
  },
  {
    arabic:
      'إِذَا قَامَ الْعَبْدُ الْمُؤْمِنُ إِلَى صَلَاتِهِ مِنْ آخِرِ اللَّيْلِ، نَزَلَتْ عَلَيْهِ الرَّحْمَةُ، وَحَفَّتْ بِهِ الْمَلَائِكَةُ',
    english: 'When the believing servant rises to his prayer in the last part of the night, mercy descends upon him and the angels encircle him.',
    source: 'al-Kafi, Kitab al-Salah, Bab Salat al-Layl',
    theme: 'on the last third of the night',
  },
  {
    arabic:
      'تَهَجَّدْ بِالْقُرْآنِ إِنْ كُنْتَ مُحِبًّا لِلَّهِ، وَاسْتَنِرْ بِهِ تَفُزْ يَوْمَ الْقِيَامَةِ بِجِوَارِ اللَّهِ',
    english: "Keep vigil with the Qur'an if you love God, and seek illumination by it — you shall triumph on the Day of Resurrection with nearness to Him.",
    source: 'Ghurar al-Hikam',
    theme: 'on tahajjud, on love of God',
  },

  // ── Envy (ḥasad) ────────────────────────────────────────────────
  {
    arabic: 'الْحَسَدُ شَرُّ الْأَمْرَاضِ',
    english: 'Envy is the worst of diseases.',
    source: 'Ghurar al-Hikam',
    theme: 'on envy as the worst illness',
  },
  {
    arabic: 'الْحَسُودُ لَا رَاحَةَ لَهُ',
    english: 'The envious one has no rest.',
    source: 'Ghurar al-Hikam',
    theme: 'on the envious one\'s exhaustion',
  },
  {
    arabic: 'الْحَسُودُ دَائِمُ السُّقْمِ وَإِنْ كَانَ صَحِيحَ الْجِسْمِ',
    english: 'The envious one is perpetually ill, even if his body is sound.',
    source: 'Ghurar al-Hikam',
    theme: 'on envy as sickness',
  },
  {
    arabic: 'عَجِبْتُ لِلْحَسُودِ كَيْفَ يَغْفُلُ عَنْ سَلَامَةِ الْأَجْسَادِ',
    english: 'I marvel at the envious one — how he is heedless of the well-being of bodies.',
    source: 'Nahj al-Balagha, Saying 225',
    theme: 'on envy as blindness to one\'s own blessings',
  },
  {
    arabic: 'صِحَّةُ الْجَسَدِ مِنْ قِلَّةِ الْحَسَدِ',
    english: 'The health of the body comes from the scarcity of envy.',
    source: 'Nahj al-Balagha, Saying 256',
    theme: 'on the cure for envy through gratitude',
  },
  {
    arabic: 'الْحَسَدُ يَأْكُلُ الْحَسَنَاتِ كَمَا تَأْكُلُ النَّارُ الْحَطَبَ',
    english: 'Envy devours good deeds just as fire devours firewood.',
    source: 'al-Kafi, vol. 2',
    theme: 'on envy as a fire that consumes',
  },
  {
    arabic: 'آفَةُ الدِّينِ الْحَسَدُ وَالْعُجْبُ وَالْفَخْرُ',
    english: 'The blight of religion is envy, conceit, and boasting.',
    source: 'al-Kafi, vol. 2',
    theme: 'on what destroys religion',
  },
  {
    arabic: 'إِنَّ الْحَسَدَ لَيَأْكُلُ الْإِيمَانَ كَمَا تَأْكُلُ النَّارُ الْحَطَبَ',
    english: 'Envy consumes faith just as fire consumes firewood.',
    source: 'al-Kafi, vol. 2',
    theme: 'on envy as a fire that consumes faith',
  },
  {
    arabic: 'الْحَاسِدُ مَغْمُومٌ، وَالْحَقُودُ مَذْمُومٌ',
    english: 'The envious one is grief-stricken; the spiteful one is blameworthy.',
    source: 'Ghurar al-Hikam',
    theme: 'on the envier\'s state',
  },
  {
    arabic: 'الْحَسَدُ يُذِيبُ الْجَسَدَ',
    english: 'Envy melts away the body.',
    source: 'Ghurar al-Hikam',
    theme: 'on envy consuming the body',
  },
  {
    arabic: 'الْحَسُودُ يُظْهِرُ وُدَّهُ فِي أَقْوَالِهِ وَيُخْفِي بُغْضَهُ فِي أَفْعَالِهِ',
    english: 'The envious one shows affection in his words and conceals his hatred in his actions.',
    source: 'Ghurar al-Hikam',
    theme: 'on the envier\'s hidden malice',
  },
  {
    arabic: 'رَاحَةُ الْجَسَدِ فِي قِلَّةِ الْحَسَدِ',
    english: 'The rest of the body lies in the scarcity of envy.',
    source: 'Ghurar al-Hikam',
    theme: 'on the cure for envy',
  },
  {
    arabic: 'لِلَّهِ دَرُّ الْحَسَدِ مَا أَعْدَلَهُ، بَدَأَ بِصَاحِبِهِ فَقَتَلَهُ',
    english: 'How just is envy! It begins with its own bearer and kills him first.',
    source: 'Ghurar al-Hikam',
    theme: 'on envy that consumes its bearer first',
  },
  {
    arabic: 'لَا رَاحَةَ لِحَسُودٍ وَلَا مَحَبَّةَ لِمَلُولٍ',
    english: 'There is no rest for the envious and no love for the weary-hearted.',
    source: 'Ghurar al-Hikam',
    theme: 'on the envier never at peace',
  },

  // ── Truthfulness (ṣidq) & honesty ────────────────────────────────
  {
    arabic: 'الصِّدْقُ أَمَانَةٌ وَالْكَذِبُ خِيَانَةٌ',
    english: 'Truthfulness is a trust, and lying is a betrayal.',
    source: 'Nahj al-Balagha, Saying 458',
    theme: 'on truthfulness, on honesty',
  },
  {
    arabic: 'الْكَذِبُ يُؤَدِّي إِلَى الْفُجُورِ، وَالْفُجُورُ يُؤَدِّي إِلَى النَّارِ',
    english: 'Lying leads to debauchery, and debauchery leads to the Fire.',
    source: 'Ghurar al-Hikam',
    theme: 'on lying as the door of every sin',
  },
  {
    arabic: 'الصِّدْقُ يَهْدِي إِلَى الْبِرِّ، وَالْبِرُّ يَهْدِي إِلَى الْجَنَّةِ',
    english: 'Truthfulness guides to righteousness, and righteousness guides to Paradise.',
    source: 'Ghurar al-Hikam',
    theme: 'on truthfulness, on the path to Paradise',
  },
  {
    arabic: 'مَنْ صَدَقَ لِسَانُهُ زَكَى عَمَلُهُ',
    english: "Whoever's tongue is truthful, his deeds are purified.",
    source: 'Ghurar al-Hikam',
    theme: 'on the tongue as the measure of the believer',
  },
  {
    arabic: 'الصِّدْقُ رَأْسُ الدِّينِ',
    english: 'Truthfulness is the head of religion.',
    source: 'Ghurar al-Hikam',
    theme: 'on truthfulness as the head of religion',
  },
  {
    arabic: 'الْكَذِبُ رَأْسُ النِّفَاقِ',
    english: 'Lying is the head of hypocrisy.',
    source: 'Ghurar al-Hikam',
    theme: 'on lying as the head of hypocrisy',
  },
  {
    arabic: 'الصِّدْقُ جَمَالُ الْإِنْسَانِ وَدَعَامَةُ الْإِيمَانِ',
    english: 'Truthfulness is the beauty of the human being and the pillar of faith.',
    source: 'Ghurar al-Hikam',
    theme: 'on honesty',
  },
  {
    arabic: 'الْكَذِبُ يُزْرِي بِالْإِنْسَانِ، وَالصِّدْقُ يُزِينُهُ',
    english: 'Lying disgraces the human being; truthfulness adorns him.',
    source: 'Ghurar al-Hikam',
    theme: 'on honesty as adornment',
  },
  {
    arabic: 'ثَمَرَةُ الصِّدْقِ الطُّمَأْنِينَةُ، وَثَمَرَةُ الْكَذِبِ الْحَيْرَةُ',
    english: 'The fruit of truthfulness is tranquillity; the fruit of lying is confusion.',
    source: 'Ghurar al-Hikam',
    theme: 'on the fruits of honesty',
  },
  {
    arabic: 'اِعْتِيَادُ الصِّدْقِ يُنْجِي مِنَ الْمَهَالِكِ',
    english: 'Habituating oneself to truthfulness delivers one from destructions.',
    source: 'Ghurar al-Hikam',
    theme: 'on honesty as deliverance',
  },
  {
    arabic:
      'الصَّادِقُ عَلَى شَفَا مَنْجَاةٍ وَكَرَامَةٍ، وَالْكَاذِبُ عَلَى شَفَا مَهْوَاةٍ وَمَهَانَةٍ',
    english: 'The truthful one is on the brink of deliverance and honour; the liar is on the brink of a chasm and humiliation.',
    source: 'Ghurar al-Hikam',
    theme: 'on honesty as deliverance',
  },
  {
    arabic: 'أَفْضَلُ الصِّدْقِ الْوَفَاءُ بِالْعَهْدِ',
    english: 'The most excellent truthfulness is fidelity to one\'s covenant.',
    source: 'Ghurar al-Hikam',
    theme: 'on keeping a promise',
  },
  {
    arabic:
      'لَا يَجِدُ عَبْدٌ طَعْمَ الْإِيمَانِ حَتَّى يَتْرُكَ الْكَذِبَ هَزْلَهُ وَجِدَّهُ',
    english: 'A servant does not taste the sweetness of faith until he abandons lying — both its jest and its earnest.',
    source: 'Nahj al-Balagha, Saying 458',
    theme: 'on lying as the door of every sin',
  },
  {
    arabic: 'مَنْ كَثُرَ كَذِبُهُ ذَهَبَ بَهَاؤُهُ',
    english: "Whoever's lying is much, his splendour departs.",
    source: 'Ghurar al-Hikam',
    theme: 'on the tongue as the measure of the believer',
  },

  // ── Worship (al-ʿibāda) ──────────────────────────────────────────
  {
    arabic: 'مَا عَبَدَ اللَّهَ سُبْحَانَهُ أَحَدٌ حَقَّ عِبَادَتِهِ',
    english: 'No one has worshipped God with the worship that is truly His due.',
    source: 'Ghurar al-Hikam',
    theme: 'on the inadequacy of our worship',
  },
  {
    arabic: 'غَايَةُ الْعِبَادَةِ الْمَعْرِفَةُ',
    english: 'The utmost end of worship is gnosis (maʿrifa).',
    source: 'Ghurar al-Hikam',
    theme: 'on the goal of worship',
  },
  {
    arabic: 'أَفْضَلُ الْعِبَادَةِ التَّفَكُّرُ',
    english: 'The most excellent worship is reflection.',
    source: 'Ghurar al-Hikam',
    theme: 'on worship as reflection',
  },
  {
    arabic: 'إِنَّ الْإِيمَانَ يَبْدُو لُمْظَةً فِي الْقَلْبِ، كُلَّمَا ازْدَادَ الْإِيمَانُ ازْدَادَتِ اللُّمْظَةُ',
    english: 'Faith appears as a white speck in the heart; the more faith increases, the more that speck grows.',
    source: 'Nahj al-Balagha, Saying 5',
    theme: 'on the believer\'s inner growth',
  },
  {
    arabic: 'ثَمَرَةُ الْعِبَادَةِ الْفَوْزُ بِالْجَنَّةِ',
    english: 'The fruit of worship is winning Paradise.',
    source: 'Ghurar al-Hikam',
    theme: 'on the fruit of worship',
  },
  {
    arabic: 'إِذَا أَحَبَّ اللَّهُ عَبْدًا أَلْهَمَهُ حُسْنَ الْعِبَادَةِ',
    english: 'When God loves a servant, He inspires in him the beauty of worship.',
    source: 'Ghurar al-Hikam',
    theme: 'on worship as divine gift',
  },
  {
    arabic: 'نِعْمَ الْعِبَادَةُ التَّفَقُّهُ',
    english: 'What an excellent worship is deep understanding of the religion.',
    source: 'Ghurar al-Hikam',
    theme: 'on worship as understanding',
  },
  {
    arabic: 'لَا عِبَادَةَ كَالتَّفَكُّرِ فِي صَنْعَةِ اللَّهِ',
    english: 'There is no worship like reflecting upon the handiwork of God.',
    source: 'Ghurar al-Hikam',
    theme: 'on worship as contemplation',
  },
  {
    arabic: 'أَصْلُ الْعِبَادَةِ الرَّجَاءُ وَالْخَشْيَةُ',
    english: 'The root of worship is hope and reverent fear.',
    source: 'Ghurar al-Hikam',
    theme: 'on the inner pillars of worship',
  },
  {
    arabic: 'مَنْ أَنِسَ بِاللَّهِ اسْتَوْحَشَ مِنَ النَّاسِ',
    english: 'Whoever finds intimacy with God grows estranged from the company of people.',
    source: 'Ghurar al-Hikam',
    theme: 'on the worshipper\'s intimacy with God',
  },
  {
    arabic:
      'طُوبَى لِمَنْ أَخْلَصَ لِلَّهِ عِبَادَتَهُ وَدُعَاءَهُ، وَلَمْ يَشْغَلْ قَلْبَهُ بِمَا تَرَى عَيْنَاهُ',
    english: 'Blessed is the one who makes his worship and supplication purely for God, and does not let what his eyes see preoccupy his heart.',
    source: 'Nahj al-Balagha, Saying 123',
    theme: 'on worship with sincerity',
  },
  {
    arabic:
      'لَا خَيْرَ فِي عِبَادَةٍ لَيْسَ فِيهَا تَفَكُّرٌ، وَلَا فِي قِرَاءَةٍ لَيْسَ فِيهَا تَدَبُّرٌ',
    english: 'There is no good in worship that contains no reflection, nor in a recitation that contains no pondering.',
    source: 'Ghurar al-Hikam',
    theme: 'on worship vs ritual',
  },
  {
    arabic:
      'طُوبَى لِمَنْ ذَكَرَ الْمَعَادَ، وَعَمِلَ لِلْحِسَابِ، وَقَنِعَ بِالْكَفَافِ، وَرَضِيَ عَنِ اللَّهِ',
    english: 'Blessed is the one who remembers the Return, works for the Reckoning, is content with sufficiency, and is pleased with God.',
    source: 'Nahj al-Balagha, Saying 44',
    theme: 'on the worshipper who tastes',
  },

  // ── Mercy (raḥma) ───────────────────────────────────────────────
  {
    arabic: 'سَبَقَتْ رَحْمَتُهُ غَضَبَهُ، وَوَسِعَتْ رَحْمَتُهُ كُلَّ شَيْءٍ',
    english: 'His mercy outstrips His wrath, and His mercy encompasses all things.',
    source: 'Nahj al-Balagha, Sermon 90',
    theme: 'on God\'s mercy',
  },
  {
    arabic: 'إِنَّ اللَّهَ تَعَالَى يَرْحَمُ مِنْ عِبَادِهِ الرُّحَمَاءَ',
    english: 'God shows mercy only to the merciful among His servants.',
    source: 'al-Kafi, vol. 2',
    theme: 'on mercy drawing mercy',
  },
  {
    arabic: 'مَنْ لَا يَرْحَمْ لَا يُرْحَمْ',
    english: 'Whoever does not show mercy will not be shown mercy.',
    source: 'al-Kafi, vol. 2',
    theme: 'on mercy',
  },
  {
    arabic: 'تَرَاحَمُوا تَعَاطَفُوا تَوَاصَلُوا تَبَارُّوا',
    english: 'Show mercy to one another, sympathize with one another, maintain ties, and act with kindness toward one another.',
    source: 'al-Kafi, vol. 2',
    theme: 'on mutual mercy',
  },
  {
    arabic:
      'الْمُؤْمِنُونَ فِي تَبَارِّهِمْ وَتَرَاحُمِهِمْ وَتَعَاطُفِهِمْ كَالْجَسَدِ الْوَاحِدِ، إِذَا اشْتَكَى تَدَاعَى لَهُ سَائِرُهُ بِالسَّهَرِ وَالْحُمَّى',
    english: 'The believers, in their kindness, mercy, and sympathy toward one another, are like a single body: when one limb complains, the rest of it responds with sleeplessness and fever.',
    source: 'al-Kafi, vol. 2',
    theme: 'on the believers as one body',
  },
  {
    arabic: 'الرَّحْمَةُ أَفْضَلُ الْفَضَائِلِ',
    english: 'Mercy is the most excellent of virtues.',
    source: 'Ghurar al-Hikam',
    theme: 'on mercy as the highest character',
  },
  {
    arabic: 'بِالرَّحْمَةِ تُسْتَنْزَلُ الرَّحْمَةُ',
    english: 'By mercy, mercy is drawn down.',
    source: 'Ghurar al-Hikam',
    theme: 'on mercy drawing mercy',
  },
  {
    arabic: 'ارْحَمْ تُرْحَمْ',
    english: 'Show mercy and you will be shown mercy.',
    source: 'Ghurar al-Hikam',
    theme: 'on mercy',
  },
  {
    arabic: 'عَلَيْكَ بِالرَّحْمَةِ لِلْأَيْتَامِ وَأَهْلِ الضَّعْفِ، فَإِنَّ لِكُلِّ كَبِدٍ حَرَّى أَجْرًا',
    english: 'Hold fast to mercy toward orphans and the weak — for in every parched liver there is a reward.',
    source: 'Ghurar al-Hikam',
    theme: 'on mercy toward the weak',
  },
  {
    arabic: 'الرَّحْمَةُ تُورِثُ الْمَحَبَّةَ',
    english: 'Mercy bequeaths love.',
    source: 'Ghurar al-Hikam',
    theme: 'on mercy bringing love',
  },
  {
    arabic:
      'اتَّقُوا اللَّهَ فِي عِبَادِهِ وَبِلَادِهِ، فَإِنَّكُمْ مَسْؤُولُونَ حَتَّى عَنِ الْبِقَاعِ وَالْبَهَائِمِ',
    english: 'Fear God concerning His servants and His lands — you will be questioned even about the open tracts of land and the beasts.',
    source: 'Nahj al-Balagha, Sermon 167',
    theme: 'on mercy toward creation, on accountability for the earth and animals',
  },
  {
    arabic: 'بِالرَّحْمَةِ تُحْرَزُ النِّعْمَةُ',
    english: 'Through mercy, blessings are safeguarded.',
    source: 'Ghurar al-Hikam',
    theme: 'on mercy as protection of blessings',
  },
  {
    arabic: 'لَيْسَ لِظَالِمٍ رَحْمَةٌ، وَلَا لِفَاجِرٍ نِعْمَةٌ',
    english: 'There is no mercy for an oppressor and no blessing for a corrupt one.',
    source: 'Ghurar al-Hikam',
    theme: 'on when mercy stops',
  },
  {
    arabic: 'رَحْمَةُ الضُّعَفَاءِ تَسْتَنْزِلُ الرَّحْمَةَ',
    english: 'Showing mercy to the weak brings down divine mercy.',
    source: 'Ghurar al-Hikam',
    theme: 'on mercy toward the weak',
  },

  // ── Hereafter (ākhira) ──────────────────────────────────────────
  {
    arabic: 'أَلَا وَإِنَّ الْجَنَّةَ حُفَّتْ بِالْمَكَارِهِ، وَإِنَّ النَّارَ حُفَّتْ بِالشَّهَوَاتِ',
    english: 'Behold, Paradise is surrounded by hardships, and the Fire is surrounded by lusts.',
    source: 'Nahj al-Balagha, Sermon 176',
    theme: 'on Paradise and Fire, on what each is surrounded by',
  },
  {
    arabic: 'فَإِنَّ الْيَوْمَ عَمَلٌ وَلَا حِسَابَ، وَغَدًا حِسَابٌ وَلَا عَمَلَ',
    english: 'Today is action without reckoning; tomorrow is reckoning without action.',
    source: 'Nahj al-Balagha, Sermon 42',
    theme: 'on today and tomorrow',
  },
  {
    arabic: 'إِنَّ الْغَايَةَ أَمَامَكُمْ، وَإِنَّ وَرَاءَكُمُ السَّاعَةَ تَحْدُوكُمْ',
    english: 'The goal is ahead of you, and behind you the Hour drives you on.',
    source: 'Nahj al-Balagha, Sermon 21',
    theme: 'on the Hour as the driver',
  },
  {
    arabic: 'تَخَفَّفُوا تَلْحَقُوا، فَإِنَّمَا يُنْتَظَرُ بِأَوَّلِكُمْ آخِرُكُمْ',
    english: 'Lighten your loads that you may catch up, for only the last of you are awaited by the first.',
    source: 'Nahj al-Balagha, Sermon 21',
    theme: 'on lightening for the journey',
  },
  {
    arabic:
      'إِنَّ أَهْوَنَ أَهْلِ النَّارِ عَذَابًا مَنْ يُنْتَعَلُ بِنَعْلَيْنِ مِنْ نَارٍ يَغْلِي مِنْهُمَا دِمَاغُهُ',
    english: 'The lightest in punishment among the people of the Fire is one shod with two sandals of fire from whose heat his brain boils.',
    source: 'Nahj al-Balagha, Sermon 85',
    theme: 'on the warning of the Fire',
  },
  {
    arabic:
      'أَلَا وَإِنَّكُمْ فِي أَيَّامِ أَمَلٍ مِنْ وَرَائِهِ أَجَلٌ، فَمَنْ عَمِلَ فِي أَيَّامِ أَمَلِهِ قَبْلَ حُضُورِ أَجَلِهِ فَقَدْ نَفَعَهُ عَمَلُهُ وَلَمْ يَضْرُرْهُ أَجَلُهُ',
    english: 'You are in days of hope behind which lies the appointed term. Whoever acts during the days of his hope before the coming of his term, his deeds benefit him and his term will not harm him.',
    source: 'Nahj al-Balagha, Sermon 28',
    theme: 'on acting before the term arrives',
  },
  {
    arabic: 'أَلَا وَإِنَّ الْيَوْمَ الْمِضْمَارَ وَغَدًا السِّبَاقَ، وَالسَّبَقَةُ الْجَنَّةُ وَالْغَايَةُ النَّارُ',
    english: 'Today is the training and tomorrow is the race. The prize is Paradise and the end-point is the Fire.',
    source: 'Nahj al-Balagha, Sermon 28',
    theme: 'on the race for the Hereafter',
  },
  {
    arabic:
      'إِنَّ أَمَامَكُمْ عَقَبَةً كَؤُودًا، الْمُخِفُّ فِيهَا أَحْسَنُ حَالًا مِنَ الْمُثْقِلِ، وَالْمُبْطِئُ عَلَيْهَا أَقْبَحُ حَالًا مِنَ الْمُسْرِعِ',
    english: 'Before you lies an arduous ascent; the lightly-burdened upon it fares better than the heavily-laden, and the slow fares worse than the swift.',
    source: 'Nahj al-Balagha, Saying 260',
    theme: 'on the arduous ascent of the Hereafter',
  },
  {
    arabic: 'مَنِ اشْتَاقَ إِلَى الْجَنَّةِ سَلَا عَنِ الشَّهَوَاتِ',
    english: 'Whoever yearns for Paradise turns away from lusts.',
    source: 'Ghurar al-Hikam',
    theme: 'on yearning for Paradise',
  },
  {
    arabic: 'مَنْ خَافَ النَّارَ اجْتَنَبَ الْمُحَرَّمَاتِ',
    english: 'Whoever fears the Fire abstains from the forbidden things.',
    source: 'Ghurar al-Hikam',
    theme: 'on fear of the Fire',
  },
  {
    arabic: 'بِالطَّاعَاتِ تُنَالُ الْجَنَّةُ، بِالْمَعَاصِي تُسْتَحَقُّ النَّارُ',
    english: 'By acts of obedience Paradise is attained; by acts of disobedience the Fire is deserved.',
    source: 'Ghurar al-Hikam',
    theme: 'on the two paths',
  },
  {
    arabic: 'الْجَنَّةُ غَايَةُ السَّابِقِينَ، النَّارُ غَايَةُ الْمُفَرِّطِينَ',
    english: 'Paradise is the goal of the foremost; the Fire is the end of the negligent.',
    source: 'Ghurar al-Hikam',
    theme: 'on the two ends',
  },
  {
    arabic:
      'طُوبَى لِنَفْسٍ أَدَّتْ إِلَى رَبِّهَا فَرْضَهَا، وَعَرَكَتْ بِجَنْبِهَا بُؤْسَهَا، وَهَجَرَتْ فِي اللَّيْلِ غُمْضَهَا، حَتَّى إِذَا غَلَبَ الْكَرَى عَلَيْهَا افْتَرَشَتْ أَرْضَهَا، وَتَوَسَّدَتْ كَفَّهَا',
    english: 'Blessed is the soul that has rendered to its Lord what is due, endured its hardship upon its side, forsaken sleep in the night, until when drowsiness overcame it, it spread the ground as its bed and took its palm as its pillow.',
    source: 'Nahj al-Balagha, Sermon 230',
    theme: 'on the soul prepared for the Hereafter',
  },

  // ── Sins, the danger of small wrongs ────────────────────────────
  {
    arabic: 'لَا صَغِيرَةَ مَعَ الْإِصْرَارِ، وَلَا كَبِيرَةَ مَعَ الِاسْتِغْفَارِ',
    english: 'There is no minor sin with persistence, and no major sin with seeking forgiveness.',
    source: 'Nahj al-Balagha, Saying 81',
    theme: 'on small sins persisted in, on great sins repented',
  },
  {
    arabic: 'أَشَدُّ الذُّنُوبِ مَا اسْتَهَانَ بِهِ صَاحِبُهُ',
    english: 'The gravest of sins is that which its doer makes light of.',
    source: 'Nahj al-Balagha, Saying 348',
    theme: 'on the sin one belittles',
  },
  {
    arabic:
      'اتَّقُوا الْمُحَقِّرَاتِ مِنَ الذُّنُوبِ فَإِنَّهَا لَا تُغْفَرُ، قِيلَ: وَمَا الْمُحَقِّرَاتُ؟ قَالَ: الرَّجُلُ يُذْنِبُ الذَّنْبَ فَيَقُولُ: طُوبَى لِي لَوْ لَمْ يَكُنْ لِي غَيْرُ ذَلِكَ',
    english: 'Beware the sins deemed trivial — they are not forgiven. It was asked: what are the trivial ones? He said: a man commits a sin and says, "How blessed I am if I had nothing else against me."',
    source: 'al-Kafi, vol. 2, Bab Istisghar al-Dhanb',
    theme: 'on the small sin grown great',
  },
  {
    arabic:
      'إِنَّ الْمُؤْمِنَ يَرَى ذَنْبَهُ كَأَنَّهُ صَخْرَةٌ يَخَافُ أَنْ تَقَعَ عَلَيْهِ، وَإِنَّ الْكَافِرَ يَرَى ذَنْبَهُ كَأَنَّهُ ذُبَابٌ مَرَّ عَلَى أَنْفِهِ',
    english: 'The believer sees his sin as though it were a boulder he fears will fall upon him; the disbeliever sees his sin as a fly that passed over his nose.',
    source: 'al-Kafi, vol. 2',
    theme: 'on the believer\'s fear of sin',
  },
  {
    arabic:
      'مَا مِنْ شَيْءٍ أَفْسَدَ لِلْقَلْبِ مِنْ خَطِيئَةٍ',
    english: 'Nothing corrupts the heart more than a sin.',
    source: 'al-Kafi, vol. 2',
    theme: 'on how sin corrupts the heart',
  },
  {
    arabic: 'إِيَّاكَ وَمُحَقَّرَاتِ الذُّنُوبِ فَإِنَّ صَغِيرَهَا كَبِيرٌ',
    english: 'Beware of sins deemed trivial — the small among them is great.',
    source: 'Ghurar al-Hikam',
    theme: 'on small sins',
  },
  {
    arabic: 'سُوءُ الظَّنِّ بِالْأَعْمَالِ مِنْ أَقْوَى حَصَانَةِ الْعُمَّالِ',
    english: 'Suspicion of one\'s own deeds is among the strongest fortresses of those who work for God.',
    source: 'Ghurar al-Hikam',
    theme: 'on not trusting one\'s own deeds',
  },
  {
    arabic:
      'إِذَا أَرَادَ اللَّهُ بِعَبْدٍ خَيْرًا جَعَلَ لَهُ وَاعِظًا مِنْ قَلْبِهِ يَأْمُرُهُ وَيَنْهَاهُ',
    english: 'When God wills good for a servant, He appoints for him a preacher from his own heart who commands and forbids him.',
    source: 'Ghurar al-Hikam',
    theme: 'on the inner preacher',
  },
  {
    arabic:
      'أَلَا وَإِنَّ مِنَ الْبَلَاءِ الْفَاقَةَ، وَأَشَدُّ مِنَ الْفَاقَةِ مَرَضُ الْبَدَنِ، وَأَشَدُّ مِنْ مَرَضِ الْبَدَنِ مَرَضُ الْقَلْبِ',
    english: 'Among trials is poverty; graver than poverty is sickness of the body; graver than sickness of the body is sickness of the heart.',
    source: 'Nahj al-Balagha, Saying 388',
    theme: 'on the gradation of trials',
  },
  {
    arabic: 'مَنْ أَطَالَ الْأَمَلَ أَسَاءَ الْعَمَلَ',
    english: 'Whoever prolongs his hopes corrupts his deeds.',
    source: 'Nahj al-Balagha, Saying 36',
    theme: 'on long hopes corrupting deeds',
  },
  {
    arabic:
      'إِذَا أَرَادَ اللَّهُ بِعَبْدٍ خَيْرًا إِذَا أَذْنَبَ ذَنْبًا أَتْبَعَهُ بِنِقْمَةٍ وَيُذَكِّرُهُ الِاسْتِغْفَارَ',
    english: 'When God wills good for a servant, He follows his sin with a punishment and reminds him to seek forgiveness.',
    source: 'al-Kafi, vol. 2',
    theme: 'on the sign of God\'s love after sin',
  },
  {
    arabic:
      'مَا مِنْ عَبْدٍ إِلَّا وَفِي قَلْبِهِ نُكْتَةٌ بَيْضَاءُ، فَإِذَا أَذْنَبَ ذَنْبًا خَرَجَ فِي النُّكْتَةِ نُكْتَةٌ سَوْدَاءُ، فَإِنْ تَابَ ذَهَبَ ذَلِكَ السَّوَادُ',
    english: "There is no servant but that in his heart is a white spot; when he sins, a black spot appears. If he repents, that blackness departs.",
    source: 'al-Kafi, vol. 2',
    theme: 'on the heart\'s blackening through sin',
  },
  {
    arabic: 'الذُّنُوبُ الدَّاءُ، وَالدَّوَاءُ الِاسْتِغْفَارُ، وَالشِّفَاءُ أَنْ لَا تَعُودَ',
    english: 'Sins are the disease, the medicine is seeking forgiveness, and the cure is that you do not return to them.',
    source: 'Ghurar al-Hikam',
    theme: 'on the cure for sin',
  },
  {
    arabic:
      'الذُّنُوبُ ثَلَاثَةٌ: ذَنْبٌ مَغْفُورٌ، وَذَنْبٌ غَيْرُ مَغْفُورٍ، وَذَنْبٌ نَرْجُو لِصَاحِبِهِ وَنَخَافُ عَلَيْهِ',
    english: 'Sins are three: a sin forgiven, a sin not forgiven, and a sin for whose doer we hope and fear.',
    source: 'al-Kafi, vol. 2, Bab Asnaf al-Dhunub',
    theme: 'on the three kinds of sins',
  },

  // ── The heart (al-qalb) ─────────────────────────────────────────
  {
    arabic: 'إِنَّ هَذِهِ الْقُلُوبَ أَوْعِيَةٌ، فَخَيْرُهَا أَوْعَاهَا',
    english: 'These hearts are vessels — and the best of them is the most retentive.',
    source: 'Nahj al-Balagha, Saying 147',
    theme: 'on the heart as vessel',
  },
  {
    arabic: 'الْقَلْبُ مُصْحَفُ الْبَصَرِ',
    english: 'The heart is the scripture of the sight.',
    source: 'Ghurar al-Hikam',
    theme: 'on the heart\'s faculty',
  },
  {
    arabic: 'لِلْقُلُوبِ خَوَاطِرُ سُوءٍ، وَالْعُقُولُ تَزْجُرُ مِنْهَا',
    english: 'Hearts have evil promptings, and intellects restrain them.',
    source: 'Ghurar al-Hikam',
    theme: 'on the heart and the intellect',
  },
  {
    arabic: 'إِنَّ لِلْقُلُوبِ شَهْوَةً وَإِقْبَالًا وَإِدْبَارًا، فَأْتُوهَا مِنْ قِبَلِ شَهْوَتِهَا وَإِقْبَالِهَا',
    english: 'Hearts have desire, advance, and retreat — so approach them through their desire and their advance.',
    source: 'Nahj al-Balagha, Saying 193',
    theme: 'on the heart\'s states',
  },
  {
    arabic:
      'مَا جَفَّتِ الدُّمُوعُ إِلَّا لِقَسْوَةِ الْقُلُوبِ، وَمَا قَسَتِ الْقُلُوبُ إِلَّا لِكَثْرَةِ الذُّنُوبِ',
    english: 'Tears do not dry up except through the hardness of hearts, and hearts do not harden except through the multitude of sins.',
    source: 'al-Kafi, vol. 2',
    theme: 'on the hardness of the heart',
  },
  {
    arabic: 'الْقَلْبُ يَتَحَمَّلُ مَا لَا تَتَحَمَّلُهُ الْجَوَارِحُ',
    english: 'The heart bears what the limbs cannot bear.',
    source: 'Ghurar al-Hikam',
    theme: 'on the heart as king of the body',
  },
  {
    arabic: 'صَلَاحُ الْقَلْبِ بِمُجَانَبَةِ الذُّنُوبِ، وَفَسَادُهُ بِمُلَابَسَةِ الْعُيُوبِ',
    english: 'The soundness of the heart is in shunning sins; its corruption in entanglement with faults.',
    source: 'Ghurar al-Hikam',
    theme: 'on the heart\'s soundness',
  },
  {
    arabic: 'مَا مِنْ عَبْدٍ مُؤْمِنٍ إِلَّا وَفِي قَلْبِهِ نُورَانِ: نُورُ خِيفَةٍ، وَنُورُ رَجَاءٍ',
    english: 'In every believing servant\'s heart there are two lights: the light of fear and the light of hope.',
    source: 'al-Kafi, Kitab al-Iman wa al-Kufr',
    theme: 'on the two lights of the heart',
  },
  {
    arabic: 'الْقَلْبُ الصَّحِيحُ أَنْفَعُ الْأَشْيَاءِ',
    english: 'The sound heart is the most beneficial of all things.',
    source: 'Ghurar al-Hikam',
    theme: 'on the sound heart',
  },
  {
    arabic: 'إِذَا أَحَبَّ اللَّهُ عَبْدًا أَلْهَمَهُ التَّقْوَى وَأَحْيَا قَلْبَهُ',
    english: 'When God loves a servant, He inspires him with God-wariness and gives life to his heart.',
    source: 'Ghurar al-Hikam',
    theme: 'on the living heart',
  },
  {
    arabic: 'وَكَمْ مِنْ إِنْسَانٍ يُصْبِحُ ضَاحِكًا وَقَلْبُهُ يَبْكِي',
    english: 'How many a person rises in the morning laughing while his heart is weeping.',
    source: 'Ghurar al-Hikam',
    theme: 'on the inner state of the heart',
  },
  {
    arabic: 'الْعِلْمُ يُنْجِدُ الْفِكْرَ، وَالْفِكْرُ يُنْجِدُ الْقَلْبَ، وَالْقَلْبُ مَوْضِعُ الْإِيمَانِ',
    english: 'Knowledge aids reflection, reflection aids the heart, and the heart is the seat of faith.',
    source: 'Ghurar al-Hikam',
    theme: 'on the heart as the seat of faith',
  },
  {
    arabic: 'لَا تَجْعَلُوا قُلُوبَكُمْ مَأْوًى لِلشَّهَوَاتِ',
    english: 'Do not make your hearts a dwelling-place for desires.',
    source: 'Ghurar al-Hikam',
    theme: 'on guarding the heart',
  },
  {
    arabic: 'مَنْ أَكْثَرَ ذِكْرَ الْمَوْتِ أَحْيَا اللَّهُ قَلْبَهُ، وَهَوَّنَ عَلَيْهِ الْمَوْتَ',
    english: 'Whoever remembers death often, God gives life to his heart and eases death upon him.',
    source: 'Ghurar al-Hikam',
    theme: 'on the heart alive through remembrance of death',
  },

  // ── Wisdom (ḥikma) ──────────────────────────────────────────────
  {
    arabic:
      'الْحِكْمَةُ ضَالَّةُ الْمُؤْمِنِ، فَخُذِ الْحِكْمَةَ وَلَوْ مِنْ أَهْلِ النِّفَاقِ',
    english: 'Wisdom is the lost property of the believer, so take wisdom even from the people of hypocrisy.',
    source: 'Nahj al-Balagha, Saying 80',
    theme: 'on wisdom as the believer\'s lost property',
  },
  {
    arabic:
      'خُذِ الْحِكْمَةَ أَنَّى كَانَتْ، فَإِنَّ الْحِكْمَةَ تَكُونُ فِي صَدْرِ الْمُنَافِقِ فَتَلَجْلَجُ فِي صَدْرِهِ حَتَّى تَخْرُجَ فَتَسْكُنَ إِلَى صَوَاحِبِهَا فِي صَدْرِ الْمُؤْمِنِ',
    english: 'Take wisdom wherever it may be — wisdom may exist in the breast of a hypocrite; it stirs restlessly in his breast until it comes out and settles with its sisters in the breast of the believer.',
    source: 'Nahj al-Balagha, Saying 80',
    theme: 'on the migration of wisdom',
  },
  {
    arabic: 'الْحِكْمَةُ شَجَرَةٌ تَنْبُتُ فِي الْقَلْبِ وَتُثْمِرُ عَلَى اللِّسَانِ',
    english: 'Wisdom is a tree that grows in the heart and bears fruit upon the tongue.',
    source: 'Ghurar al-Hikam',
    theme: 'on wisdom rooted in the heart',
  },
  {
    arabic: 'الْحِكْمَةُ ثَمَرَةُ الْعَقْلِ',
    english: 'Wisdom is the fruit of the intellect.',
    source: 'Ghurar al-Hikam',
    theme: 'on wisdom as the fruit of intellect',
  },
  {
    arabic: 'الْحِكْمَةُ رَوْضَةُ النُّبَلَاءِ، وَنُزْهَةُ الْعُقَلَاءِ',
    english: 'Wisdom is the garden of the noble and the recreation of those of intellect.',
    source: 'Ghurar al-Hikam',
    theme: 'on wisdom as the garden of the noble',
  },
  {
    arabic: 'بِالْحِكْمَةِ يُكْشَفُ غِطَاءُ الْعِلْمِ',
    english: 'By wisdom the veil over knowledge is lifted.',
    source: 'Ghurar al-Hikam',
    theme: 'on wisdom unveiling knowledge',
  },
  {
    arabic: 'الْحِكْمَةُ تُنْبِئُ عَنْ غَزَارَةِ الْعِلْمِ',
    english: 'Wisdom is a sign of the abundance of knowledge.',
    source: 'Ghurar al-Hikam',
    theme: 'on wisdom and knowledge',
  },
  {
    arabic: 'الْحِكْمَةُ صَيْدُ الْمُؤْمِنِ',
    english: "Wisdom is the believer's quarry — his hunt.",
    source: 'Ghurar al-Hikam',
    theme: 'on wisdom as the believer\'s hunt',
  },
  {
    arabic: 'كَثْرَةُ الْكَلَامِ تَسْتَهْلِكُ الْحِكْمَةَ',
    english: 'Excessive speech wears away wisdom.',
    source: 'Ghurar al-Hikam',
    theme: 'on wisdom vs idle talk',
  },
  {
    arabic: 'إِذَا أَرَادَ اللَّهُ بِعَبْدٍ خَيْرًا فَقَّهَهُ فِي الدِّينِ وَأَلْهَمَهُ الْحِكْمَةَ',
    english: 'When God wills good for a servant, He grants him understanding of the religion and inspires him with wisdom.',
    source: 'Ghurar al-Hikam',
    theme: 'on wisdom as divine gift',
  },
  {
    arabic: 'الْحِكْمَةُ تُورِثُ الْعِصْمَةَ',
    english: 'Wisdom bequeaths preservation from sin.',
    source: 'Ghurar al-Hikam',
    theme: 'on wisdom preserving from sin',
  },
  {
    arabic: 'الْحِكْمَةُ نُورُ الْقَلْبِ',
    english: 'Wisdom is the light of the heart.',
    source: 'Ghurar al-Hikam',
    theme: 'on wisdom as the heart\'s light',
  },

  // ── Wealth, poverty (unique sayings only) ────────────────────────
  {
    arabic: 'الْغِنَى وَالْفَقْرُ بَعْدَ الْعَرْضِ عَلَى اللَّهِ',
    english: 'Wealth and poverty will only be made manifest after the presentation before God.',
    source: 'Nahj al-Balagha, Saying 452',
    theme: 'on true wealth, on true poverty',
  },
  {
    arabic: 'الْفَقْرُ الْمَوْتُ الْأَكْبَرُ',
    english: 'Poverty is the greater death.',
    source: 'Nahj al-Balagha, Saying 163',
    theme: 'on poverty',
  },
  {
    arabic: 'كَفَى بِالْقَنَاعَةِ مُلْكًا، وَبِحُسْنِ الْخُلُقِ نَعِيمًا',
    english: 'Contentment is sufficient as a kingdom, and good character as a delight.',
    source: 'Nahj al-Balagha, Saying 229',
    theme: 'on contentment as kingdom',
  },
  {
    arabic: 'الْمَالُ مَادَّةُ الشَّهَوَاتِ',
    english: 'Wealth is the substance of desires.',
    source: 'Nahj al-Balagha, Saying 58',
    theme: 'on wealth and desire',
  },
  {
    arabic: 'الْقَنَاعَةُ أَهْنَأُ عَيْشٍ',
    english: 'Contentment is the most pleasant of livelihoods.',
    source: 'Ghurar al-Hikam',
    theme: 'on contentment as the sweetest life',
  },
  {
    arabic: 'لَا كَنْزَ أَغْنَى مِنَ الْقَنَاعَةِ',
    english: 'No treasure enriches more than contentment.',
    source: 'Nahj al-Balagha, Saying 371',
    theme: 'on contentment as treasure',
  },

  // ── Gratitude expanded ──────────────────────────────────────────
  {
    arabic:
      'إِنَّ لِلَّهِ فِي كُلِّ نِعْمَةٍ حَقًّا، فَمَنْ أَدَّاهُ زَادَهُ مِنْهَا، وَمَنْ قَصَّرَ فِيهِ خَاطَرَ بِزَوَالِ نِعْمَتِهِ',
    english: 'God has a right in every blessing — whoever fulfils it, He increases it; whoever falls short risks its loss.',
    source: 'Nahj al-Balagha, Saying 244',
    theme: 'on gratitude as discipline',
  },
  {
    arabic: 'إِذَا قَلَّ الشُّكْرُ زَالَتِ النِّعْمَةُ',
    english: 'When gratitude grows scarce, the blessing departs.',
    source: 'Ghurar al-Hikam',
    theme: 'on gratitude, on losing what we do not thank for',
  },
  {
    arabic: 'ثَمَرَةُ الشُّكْرِ زِيَادَةُ النِّعَمِ',
    english: 'The fruit of gratitude is the increase of blessings.',
    source: 'Ghurar al-Hikam',
    theme: 'on gratitude increasing blessings',
  },
  {
    arabic: 'أَعْجَزُ النَّاسِ مَنْ قَدَرَ عَلَى أَنْ يَشْكُرَ النِّعْمَةَ بِلِسَانِهِ وَلَمْ يَشْكُرْ',
    english: 'The most incapable of people is one who is able to thank for a blessing with his tongue and does not.',
    source: 'Ghurar al-Hikam',
    theme: 'on gratitude as the rarest virtue',
  },
  {
    arabic:
      'مَا أَنْعَمَ اللَّهُ عَلَى عَبْدٍ نِعْمَةً فَشَكَرَهَا بِقَلْبِهِ إِلَّا اسْتَوْجَبَ الْمَزِيدَ فِيهَا قَبْلَ أَنْ يُظْهِرَ شُكْرَهَا عَلَى لِسَانِهِ',
    english: 'God does not bestow a blessing upon a servant who then gives thanks for it in his heart, except that he becomes deserving of its increase before he even voices that gratitude on his tongue.',
    source: 'Ghurar al-Hikam',
    theme: 'on gratitude of the heart',
  },
  {
    arabic:
      'عَلَيْكَ بِشُكْرِ كُلِّ مُنْعِمٍ، فَإِنَّكَ إِنْ شَكَرْتَ صَغِيرًا اسْتَوْجَبْتَ كَبِيرًا',
    english: 'Hold fast to thanking every bestower of favour; if you give thanks for something small, you become deserving of something great.',
    source: 'Ghurar al-Hikam',
    theme: 'on gratitude as discipline',
  },
  {
    arabic: 'دَوَامُ النِّعَمِ بِدَوَامِ الشُّكْرِ',
    english: 'The endurance of blessings lies in the endurance of gratitude.',
    source: 'Ghurar al-Hikam',
    theme: 'on gratitude as discipline',
  },
  {
    arabic: 'أَفْضَلُ النِّعَمِ مَا عَظُمَ عَنِ الشُّكْرِ، وَجَلَّ عَنِ الْوَصْفِ',
    english: 'The most excellent of blessings are those too great for gratitude to encompass and too sublime for description to capture.',
    source: 'Ghurar al-Hikam',
    theme: 'on the blessings beyond words',
  },

  // ── The marks of the wise person (al-ʿāqil) ─────────────────────
  {
    arabic: 'الْعَاقِلُ مَنْ وَضَعَ الْأَشْيَاءَ مَوَاضِعَهَا',
    english: 'The wise person is the one who puts things in their proper places.',
    source: 'Ghurar al-Hikam',
    theme: 'on the marks of the wise',
  },
  {
    arabic: 'الْعَاقِلُ مَنْ غَلَبَ هَوَاهُ وَلَمْ يَبِعْ آخِرَتَهُ بِدُنْيَاهُ',
    english: 'The wise person is the one who conquers his desire and does not sell his Hereafter for his world.',
    source: 'Ghurar al-Hikam',
    theme: 'on the marks of the wise',
  },
  {
    arabic: 'الْعَاقِلُ مَنْ يَزْهَدُ فِيمَا يَرْغَبُ فِيهِ الْجَاهِلُ',
    english: 'The wise person is the one who abstains from what the ignorant person craves.',
    source: 'Ghurar al-Hikam',
    theme: 'on the marks of the wise',
  },
  {
    arabic: 'الْعَاقِلُ مَنْ عَقَلَ لِسَانَهُ',
    english: 'The wise person is the one who restrains his tongue.',
    source: 'Ghurar al-Hikam',
    theme: 'on the marks of the wise',
  },
  {
    arabic:
      'الْعَاقِلُ مَنِ اتَّهَمَ رَأْيَهُ وَلَمْ يَثِقْ بِكُلِّ مَا تُسَوِّلُ لَهُ نَفْسُهُ',
    english: 'The wise person is the one who distrusts his own opinion and does not put faith in everything his lower self entices him toward.',
    source: 'Nahj al-Balagha, Saying 211',
    theme: 'on the marks of the wise',
  },
  {
    arabic: 'الْعَاقِلُ مَنْ وَعَظَتْهُ التَّجَارِبُ',
    english: 'The wise person is the one whom experiences have admonished.',
    source: 'Ghurar al-Hikam',
    theme: 'on the marks of the wise',
  },
  {
    arabic:
      'الْعَاقِلُ مَنْ أَحْسَنَ صَنَائِعَهُ وَوَضَعَ سَعْيَهُ فِي صَلَاحِ مَعَادِهِ',
    english: 'The wise person is the one who perfects his deeds and directs his striving toward the welfare of his return to God.',
    source: 'Ghurar al-Hikam',
    theme: 'on the marks of the wise',
  },
  {
    arabic: 'اللَّبِيبُ مَنْ تَجَافَى عَنْ دَارِ الْفَنَاءِ إِلَى دَارِ الْبَقَاءِ',
    english: 'The sensible person is the one who turns away from the abode of perishing toward the abode of permanence.',
    source: 'Ghurar al-Hikam',
    theme: 'on the marks of the wise',
  },
  {
    arabic: 'الْعَاقِلُ مَنْ صَدَقَتْ أَقْوَالُهُ وَأَفْعَالُهُ',
    english: 'The wise person is the one whose words and deeds are truthful.',
    source: 'Ghurar al-Hikam',
    theme: 'on the marks of the wise',
  },
  {
    arabic: 'الْعَاقِلُ مَنْ أَمَاتَ شَهْوَتَهُ، وَالْجَاهِلُ مَنْ أَمَاتَ مُرُوءَتَهُ',
    english: 'The wise person is the one who puts his lust to death; the ignorant is the one who puts his honour to death.',
    source: 'Ghurar al-Hikam',
    theme: 'on the marks of the wise',
  },
  {
    arabic: 'الْعَاقِلُ مَنْ هَجَرَ شَهْوَتَهُ، وَبَاعَ دُنْيَاهُ بِآخِرَتِهِ',
    english: 'The wise person is the one who forsakes his lust and trades his world for his Hereafter.',
    source: 'Ghurar al-Hikam',
    theme: 'on the marks of the wise',
  },

  // ── Patience expanded ──────────────────────────────────────────
  {
    arabic: 'وَلَا إِيمَانَ لِمَنْ لَا صَبْرَ لَهُ',
    english: 'There is no faith for one who has no patience.',
    source: 'Nahj al-Balagha, Saying 82',
    theme: 'on sabr and faith',
  },
  {
    arabic: 'الصَّبْرُ مَطِيَّةٌ لَا تَكْبُو',
    english: 'Patience is a mount that never stumbles.',
    source: 'Ghurar al-Hikam',
    theme: 'on sabr as the believer\'s mount',
  },
  {
    arabic: 'الصَّبْرُ مُرٌّ مَذَاقُهُ، حُلْوَةٌ ثَمَرَتُهُ',
    english: 'Patience is bitter in taste, but sweet in its fruit.',
    source: 'Ghurar al-Hikam',
    theme: 'on the fruit of patience',
  },
  {
    arabic: 'الصَّبْرُ لِبَاسُ الْمُؤْمِنِ',
    english: 'Patience is the robe of the believer.',
    source: 'Ghurar al-Hikam',
    theme: 'on sabr as the believer\'s robe',
  },
  {
    arabic: 'بِالصَّبْرِ تُدْرَكُ مَعَالِي الْأُمُورِ',
    english: 'Through patience the loftiest of matters are attained.',
    source: 'Ghurar al-Hikam',
    theme: 'on sabr as path to the heights',
  },
  {
    arabic: 'الصَّبْرُ عَلَى الطَّاعَةِ أَيْسَرُ مِنَ الصَّبْرِ عَلَى الْعُقُوبَةِ',
    english: 'Patience in obedience is easier than patience under punishment.',
    source: 'Ghurar al-Hikam',
    theme: 'on the kinds of sabr',
  },
  {
    arabic: 'اصْبِرْ عَلَى طَاعَةِ اللَّهِ، وَتَصَبَّرْ عَنْ مَعْصِيَةِ اللَّهِ',
    english: 'Be patient in the obedience of God; restrain yourself with patience from disobedience to God.',
    source: 'Ghurar al-Hikam',
    theme: 'on the three kinds of sabr',
  },
  {
    arabic: 'الصَّبْرُ يُهَوِّنُ الْفَجِيعَةَ',
    english: 'Patience makes the calamity lighter to bear.',
    source: 'Ghurar al-Hikam',
    theme: 'on sabr in calamity',
  },
  {
    arabic: 'الصَّبْرُ أَحْسَنُ حُلَلِ الْإِيمَانِ',
    english: 'Patience is the finest of the garments of faith.',
    source: 'Ghurar al-Hikam',
    theme: 'on sabr as the garment of faith',
  },
  {
    arabic: 'مَنْ رَكِبَ مَرْكَبَ الصَّبْرِ اهْتَدَى إِلَى مَيْدَانِ النَّصْرِ',
    english: 'Whoever mounts the steed of patience is guided to the arena of victory.',
    source: 'Ghurar al-Hikam',
    theme: 'on sabr and victory',
  },
  {
    arabic:
      'الصَّابِرُونَ أَفْضَلُ النَّاسِ مَنْزِلَةً فِي الدُّنْيَا وَالْآخِرَةِ',
    english: 'The patient hold the highest rank among people, in this world and the next.',
    source: 'Ghurar al-Hikam',
    theme: 'on the rank of the patient',
  },

  // ── Ghība, slander, protecting honour ───────────────────────────
  {
    arabic: 'الْغِيبَةُ جُهْدُ الْعَاجِزِ',
    english: 'Backbiting is the effort of the incapable.',
    source: 'Nahj al-Balagha, Saying 461',
    theme: 'on ghība, on backbiting',
  },
  {
    arabic: 'مَنِ اغْتَابَ أَخَاهُ الْمُسْلِمَ بَطَلَ صَوْمُهُ وَنُقِضَ وُضُوؤُهُ',
    english: 'Whoever backbites his Muslim brother, his fast is invalidated and his ablution is broken.',
    source: 'al-Kafi, Bab al-Ghiba',
    theme: 'on the gravity of ghība',
  },
  {
    arabic: 'الْغِيبَةُ ذِكْرُكَ أَخَاكَ بِمَا يَكْرَهُ',
    english: 'Backbiting is your mentioning of your brother with that which he dislikes.',
    source: 'al-Kafi, Bab al-Ghiba',
    theme: 'on the definition of ghība',
  },
  {
    arabic: 'الْغِيبَةُ آيَةُ الْمُنَافِقِ',
    english: 'Backbiting is the mark of the hypocrite.',
    source: 'Ghurar al-Hikam',
    theme: 'on ghība as the mark of hypocrisy',
  },
  {
    arabic: 'الْبُهْتَانُ عَلَى الْبَرِيءِ أَثْقَلُ مِنَ الْجِبَالِ الرَّاسِيَاتِ',
    english: 'Slander against the innocent is heavier than the firmly-rooted mountains.',
    source: 'Ghurar al-Hikam',
    theme: 'on slander, on buhtān',
  },
  {
    arabic: 'مَنْ رَدَّ عَنْ عِرْضِ أَخِيهِ الْمُسْلِمِ وَجَبَتْ لَهُ الْجَنَّةُ الْبَتَّةَ',
    english: 'Whoever defends the honour of his Muslim brother, Paradise is decisively made obligatory for him.',
    source: 'al-Kafi, Bab al-Ghiba wa al-Buht',
    theme: 'on protecting honour',
  },
  {
    arabic: 'السَّامِعُ لِلْغِيبَةِ أَحَدُ الْمُغْتَابِينَ',
    english: 'The listener to backbiting is one of the two backbiters.',
    source: 'Ghurar al-Hikam',
    theme: 'on listening to ghība',
  },
  {
    arabic: 'الْغِيبَةُ تُفْسِدُ الْإِيمَانَ كَمَا تُفْسِدُ الْآكِلَةُ الْجَسَدَ',
    english: 'Backbiting corrupts faith as gangrene corrupts the body.',
    source: 'Ghurar al-Hikam',
    theme: 'on ghība corrupting faith',
  },
  {
    arabic:
      'مَنِ اغْتِيبَ عِنْدَهُ أَخُوهُ الْمُسْلِمُ فَلَمْ يَنْصُرْهُ وَهُوَ يَقْدِرُ عَلَى نَصْرِهِ خَذَلَهُ اللَّهُ فِي الدُّنْيَا وَالْآخِرَةِ',
    english: 'Whoever has his Muslim brother backbitten in his presence and does not aid him while able to do so, God will forsake him in this world and the next.',
    source: 'al-Kafi, Bab al-Ghiba',
    theme: 'on the duty to defend honour',
  },
  {
    arabic: 'إِيَّاكَ وَالْغِيبَةَ فَإِنَّهَا إِدَامُ كِلَابِ النَّارِ',
    english: 'Beware of backbiting, for it is the condiment of the dogs of Hellfire.',
    source: 'Ghurar al-Hikam',
    theme: 'on warning against ghība',
  },
  {
    arabic: 'الْبُهْتَانُ عَلَى الْبَرِيءِ مِنْ أَعْظَمِ الذُّنُوبِ',
    english: 'Slander against the innocent is among the gravest of sins.',
    source: 'Ghurar al-Hikam',
    theme: 'on slander as a grave sin',
  },
  {
    arabic: 'نَصْرُ الْمُؤْمِنِ بِظَهْرِ الْغَيْبِ يَزِيدُ فِي الرِّزْقِ',
    english: 'Aiding the believer behind his back increases sustenance.',
    source: 'Ghurar al-Hikam',
    theme: 'on defending the absent believer',
  },

  // ── Mosque, community, congregation ──────────────────────────────
  {
    arabic:
      'مَنِ اخْتَلَفَ إِلَى الْمَسْجِدِ أَصَابَ إِحْدَى الثَّمَانِ: أَخًا مُسْتَفَادًا فِي اللَّهِ، أَوْ عِلْمًا مُسْتَطْرَفًا، أَوْ آيَةً مُحْكَمَةً، أَوْ رَحْمَةً مُنْتَظَرَةً، أَوْ كَلِمَةً تَرُدُّهُ عَنْ رَدًى، أَوْ يَسْمَعُ كَلِمَةً تَدُلُّهُ عَلَى هُدًى، أَوْ يَتْرُكُ ذَنْبًا خَشْيَةً أَوْ حَيَاءً',
    english: "Whoever frequents the mosque attains one of eight: a brother gained for God's sake, a wondrous knowledge, a decisive verse, an awaited mercy, a word that turns him from ruin, a word he hears that guides him aright, or the abandoning of a sin out of fear or shame.",
    source: 'Nahj al-Balagha, Saying 390',
    theme: 'on the mosque, on the eight gains of attendance',
  },
  {
    arabic: 'وَالْزَمُوا السَّوَادَ الْأَعْظَمَ، فَإِنَّ يَدَ اللَّهِ مَعَ الْجَمَاعَةِ، وَإِيَّاكُمْ وَالْفُرْقَةَ',
    english: "Cleave to the great body of the believers — God's hand is with the congregation, and beware of separation.",
    source: 'Nahj al-Balagha, Sermon 127',
    theme: 'on the congregation, on the danger of isolation',
  },
  {
    arabic: 'فَإِنَّ الشَّاذَّ مِنَ النَّاسِ لِلشَّيْطَانِ، كَمَا أَنَّ الشَّاذَّ مِنَ الْغَنَمِ لِلذِّئْبِ',
    english: 'The one who strays from the people belongs to Satan, just as the sheep that strays from the flock belongs to the wolf.',
    source: 'Nahj al-Balagha, Sermon 127',
    theme: 'on the danger of straying from the community',
  },
  {
    arabic:
      'الْمُؤْمِنُ أَخُو الْمُؤْمِنِ، عَيْنُهُ وَدَلِيلُهُ، لَا يَخُونُهُ، وَلَا يَظْلِمُهُ، وَلَا يَغُشُّهُ، وَلَا يَعِدُهُ عِدَةً فَيُخْلِفَهُ',
    english: "The believer is the brother of the believer, his eye and his guide; he does not betray, wrong, deceive, or break his promise to him.",
    source: 'al-Kafi, Bab Ukhuwwat al-Mu\'minin',
    theme: 'on the believer as brother to the believer',
  },
  {
    arabic:
      'الْمُؤْمِنُ أَخُو الْمُؤْمِنِ كَالْجَسَدِ الْوَاحِدِ، إِنِ اشْتَكَى شَيْئًا مِنْهُ وَجَدَ أَلَمَ ذَلِكَ فِي سَائِرِ جَسَدِهِ، وَأَرْوَاحُهُمَا مِنْ رُوحٍ وَاحِدَةٍ',
    english: 'The believer is the brother of the believer, like a single body: if one part of him complains, he feels its pain in the rest of his body; and their spirits are from a single spirit.',
    source: 'al-Kafi, Bab Ukhuwwat al-Mu\'minin',
    theme: 'on the believers as one body and one spirit',
  },
  {
    arabic:
      'مَنْ مَشَى إِلَى مَسْجِدٍ يَطْلُبُ فِيهِ الْجَمَاعَةَ كَانَ لَهُ بِكُلِّ خُطْوَةٍ سَبْعُونَ أَلْفَ حَسَنَةٍ',
    english: 'Whoever walks to a mosque seeking the congregation in it, for every step there are seventy thousand good deeds.',
    source: 'al-Kafi, Kitab al-Salah',
    theme: 'on the steps to the mosque',
  },
  {
    arabic:
      'عَلَيْكُمْ بِإِتْيَانِ الْمَسَاجِدِ، فَإِنَّهَا بُيُوتُ اللَّهِ فِي الْأَرْضِ، وَمَنْ أَتَاهَا مُتَطَهِّرًا طَهَّرَهُ اللَّهُ مِنْ ذُنُوبِهِ',
    english: 'Keep to coming to the mosques — they are the houses of God upon the earth; whoever comes to them in a state of purity, God purifies him from his sins.',
    source: 'al-Kafi, Kitab al-Salah',
    theme: 'on the mosques as God\'s houses',
  },
  {
    arabic: 'جَالِسُوا أَهْلَ الدِّينِ تَسْعَدُوا، وَخَالِطُوهُمْ تَسْلَمُوا',
    english: 'Sit with the people of religion and you will attain felicity; mingle with them and you will be kept safe.',
    source: 'Ghurar al-Hikam',
    theme: 'on the companionship of the people of faith',
  },
  {
    arabic: 'مُجَالَسَةُ الصَّالِحِينَ تُلْحِقُ النَّاقِصَ بِالْكَامِلِ',
    english: 'Sitting with the righteous joins the deficient one to the perfect.',
    source: 'Ghurar al-Hikam',
    theme: 'on the company of the righteous',
  },
  {
    arabic:
      'بِئْسَ الْمَكَانُ الْمَسْجِدُ لِجِيرَانٍ لَا يَشْهَدُونَهُ مَعَ مَنْ يَشْهَدُهُ، وَلَا يَتَفَقَّدُونَ شَأْنَهُ',
    english: 'Wretched is the mosque as a neighbour to those who do not attend it with those who attend, nor look after its affair.',
    source: 'al-Kafi, Kitab al-Salah',
    theme: 'on rebuke of the absent neighbour',
  },

  // ── The rights of the neighbour, hospitality ────────────────────
  {
    arabic: 'الْجَارُ ثُمَّ الدَّارُ',
    english: 'The neighbour first, then the house.',
    source: 'Nahj al-Balagha, Letter 31 (to Imam al-Hasan)',
    theme: 'on the rights of the neighbour',
  },
  {
    arabic: 'مَا زَالَ جِبْرَائِيلُ يُوصِينِي بِالْجَارِ حَتَّى ظَنَنْتُ أَنَّهُ سَيُوَرِّثُهُ',
    english: 'Gabriel kept enjoining me concerning the neighbour until I thought he would make him an heir.',
    source: 'al-Kafi, Bab Haqq al-Jar (Prophetic, transmitted via Imam Ali)',
    theme: 'on the rights of the neighbour',
  },
  {
    arabic: 'حُسْنُ الْجِوَارِ يَعْمُرُ الدِّيَارَ وَيَزِيدُ فِي الْأَعْمَارِ',
    english: 'Good neighbourliness builds up homes and lengthens lifespans.',
    source: 'al-Kafi, Bab Haqq al-Jar',
    theme: 'on good neighbourliness',
  },
  {
    arabic: 'حُسْنُ الْجِوَارِ يُؤْنِسُ الْقُلُوبَ',
    english: 'Excellence in neighbourliness brings hearts into intimacy.',
    source: 'Ghurar al-Hikam',
    theme: 'on good neighbourliness',
  },
  {
    arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيُكْرِمْ جَارَهُ',
    english: 'Whoever believes in God and the Last Day, let him honour his neighbour.',
    source: 'al-Kafi, Bab Haqq al-Jar (Prophetic)',
    theme: 'on honouring the neighbour',
  },
  {
    arabic:
      'لَيْسَ الْجِوَارُ كَفَّ الْأَذَى، وَلَكِنَّ الْجِوَارَ الصَّبْرُ عَلَى الْأَذَى',
    english: 'Neighbourliness is not merely withholding harm; it is bearing patiently the harm of the neighbour.',
    source: 'al-Kafi, Bab Haqq al-Jar',
    theme: 'on patience with the neighbour',
  },
  {
    arabic: 'حُرْمَةُ الْجَارِ عَلَى الْجَارِ كَحُرْمَةِ أُمِّهِ',
    english: "The sanctity of a neighbour upon his neighbour is like the sanctity of his own mother.",
    source: 'al-Kafi, Bab Haqq al-Jar',
    theme: 'on the sanctity of the neighbour',
  },
  {
    arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيُكْرِمْ ضَيْفَهُ',
    english: 'Whoever believes in God and the Last Day, let him honour his guest.',
    source: 'al-Kafi (Prophetic)',
    theme: 'on hospitality toward guests',
  },
  {
    arabic: 'الضَّيْفُ يَأْتِي بِرِزْقِهِ وَيَرْتَحِلُ بِذُنُوبِ أَهْلِ الْبَيْتِ',
    english: 'The guest arrives with his own provision and departs carrying away the sins of the household.',
    source: 'al-Kafi (transmitted tradition)',
    theme: 'on the blessing of the guest',
  },
  {
    arabic: 'أَكْرِمْ ضَيْفَكَ وَإِنْ كَانَ حَقِيرًا، وَقُمْ عَنْ مَجْلِسِكَ لِأَبِيكَ وَمُعَلِّمِكَ وَإِنْ كُنْتَ أَمِيرًا',
    english: 'Honour your guest even if he be lowly, and rise from your seat for your father and your teacher even if you be a ruler.',
    source: 'Ghurar al-Hikam',
    theme: 'on honouring the guest, on rising for elders',
  },
  {
    arabic: 'خَيْرُكُمْ مَنْ أَطْعَمَ الطَّعَامَ وَأَفْشَى السَّلَامَ وَصَلَّى بِاللَّيْلِ وَالنَّاسُ نِيَامٌ',
    english: 'The best of you is the one who feeds others, spreads the greeting of peace, and prays by night while people are asleep.',
    source: 'al-Kafi, Kitab al-Iman wa al-Kufr',
    theme: 'on the believer\'s open door',
  },

  // ── Service to others ──────────────────────────────────────────
  {
    arabic: 'قَضَاءُ حُقُوقِ الْمُؤْمِنِينَ مِنْ أَفْضَلِ الْأَعْمَالِ',
    english: 'Fulfilling the rights of the believers is among the most excellent of deeds.',
    source: 'Ghurar al-Hikam',
    theme: 'on service to others',
  },
  {
    arabic: 'خَيْرُ النَّاسِ مَنْ نَفَعَ النَّاسَ',
    english: 'The best of people is the one who benefits people.',
    source: 'Ghurar al-Hikam',
    theme: 'on the doer of good',
  },
  {
    arabic: 'أَوْلَى النَّاسِ بِالْإِحْسَانِ مَنْ أَحْسَنَ اللَّهُ إِلَيْهِ',
    english: 'The most deserving of people to do good is the one to whom God has done good.',
    source: 'Ghurar al-Hikam',
    theme: 'on the doer of good',
  },
  {
    arabic: 'مَنْ كَثُرَ إِحْسَانُهُ أَحَبَّهُ إِخْوَانُهُ',
    english: "Whoever's beneficence is abundant, his brethren love him.",
    source: 'Ghurar al-Hikam',
    theme: 'on the doer of good',
  },
  {
    arabic: 'الْإِحْسَانُ يَسْتَرِقُّ الْإِنْسَانَ',
    english: 'Beneficence enslaves the human being.',
    source: 'Ghurar al-Hikam',
    theme: 'on what beneficence does',
  },
  {
    arabic: 'بِالْإِحْسَانِ تُمْلَكُ الْقُلُوبُ',
    english: 'Through beneficence, hearts are won over.',
    source: 'Ghurar al-Hikam',
    theme: 'on beneficence winning hearts',
  },
  {
    arabic: 'مَنْ قَضَى حَاجَةَ أَخِيهِ الْمُؤْمِنِ قَضَى اللَّهُ لَهُ حَوَائِجَ كَثِيرَةً',
    english: "Whoever fulfils the need of his believing brother, God fulfils many needs for him.",
    source: 'Ghurar al-Hikam',
    theme: 'on fulfilling needs',
  },
  {
    arabic: 'اِغْتَنِمْ مَنْ رَجَاكَ بِتَحْقِيقِ آمَالِهِ',
    english: 'Seize the opportunity of the one who has hoped in you by fulfilling his hopes.',
    source: 'Ghurar al-Hikam',
    theme: 'on fulfilling another\'s hope',
  },
  {
    arabic: 'مَنْ فَرَّجَ عَنْ مَكْرُوبٍ فَرَّجَ اللَّهُ عَنْهُ كُرَبَ الدُّنْيَا وَالْآخِرَةِ',
    english: 'Whoever relieves one in distress, God relieves him of the distresses of this world and the next.',
    source: 'Ghurar al-Hikam',
    theme: 'on removing distress from another',
  },
  {
    arabic: 'زَكَاةُ الْيَسَارِ بِرُّ الْجِيرَانِ وَصِلَةُ الْأَرْحَامِ',
    english: 'The alms of prosperity is kindness to neighbours and maintaining ties with kin.',
    source: 'Ghurar al-Hikam',
    theme: 'on the duties of prosperity',
  },
  {
    arabic: 'مَنْ قَضَى حَقَّ مَنْ لَا يَقْضِي حَقَّهُ فَقَدْ عَبَدَهُ',
    english: 'Whoever fulfils the right of one who does not fulfil his right has truly worshipped through service.',
    source: 'Ghurar al-Hikam',
    theme: 'on selfless service',
  },

  // ── Humility expanded ──────────────────────────────────────────
  {
    arabic: 'إِذَا رَأَيْتُمُ الْعَالِمَ مُحِبًّا لِدُنْيَاهُ فَاتَّهِمُوهُ عَلَى دِينِهِ',
    english: 'When you see a scholar enamoured with his worldly life, suspect him concerning his religion.',
    source: 'Nahj al-Balagha, Saying 5',
    theme: 'on suspicion of the worldly scholar',
  },
  {
    arabic: 'قَدْرُ الرَّجُلِ عَلَى قَدْرِ هِمَّتِهِ، وَتَوَاضُعُهُ عَلَى قَدْرِ نُبْلِهِ',
    english: "A man's worth is according to his aspiration, and his humility is according to his nobility.",
    source: 'Nahj al-Balagha, Saying 47',
    theme: 'on humility as the mark of nobility',
  },
  {
    arabic: 'ثَمَرَةُ الْعِلْمِ إِخْلَاصُ الْعَمَلِ',
    english: 'The fruit of knowledge is sincerity of action.',
    source: 'Ghurar al-Hikam',
    theme: 'on the fruit of knowledge',
  },
  {
    arabic: 'آفَةُ الْعِلْمِ الْكِبْرُ',
    english: 'The blight of knowledge is arrogance.',
    source: 'Ghurar al-Hikam',
    theme: 'on the danger of pride in knowledge',
  },
  {
    arabic: 'مَنْ تَوَاضَعَ عِنْدَ الْحَقِّ رَفَعَهُ اللَّهُ',
    english: 'Whoever humbles himself before the truth, God raises him.',
    source: 'Ghurar al-Hikam',
    theme: 'on humility before truth',
  },
  {
    arabic: 'بِالتَّوَاضُعِ تَتِمُّ النِّعْمَةُ',
    english: 'Through humility, blessings are completed.',
    source: 'Ghurar al-Hikam',
    theme: 'on humility completing blessings',
  },
  {
    arabic: 'أَفْضَلُ النَّاسِ مَنِ اعْتَرَفَ بِخَطَئِهِ وَرَجَعَ عَنْهُ',
    english: 'The best of people is the one who acknowledges his error and turns back from it.',
    source: 'Ghurar al-Hikam',
    theme: 'on admitting one is wrong, on humility before truth',
  },
  {
    arabic: 'رَأْسُ الْجَهْلِ مُعَادَاةُ النَّاسِ',
    english: 'The head of ignorance is to make enemies of people.',
    source: 'Ghurar al-Hikam',
    theme: 'on ignorance and enmity',
  },
  {
    arabic: 'لَا حَسَبَ أَرْفَعُ مِنَ التَّوَاضُعِ',
    english: 'There is no lineage more elevated than humility.',
    source: 'Ghurar al-Hikam',
    theme: 'on humility as the highest lineage',
  },

  // ── The strong believer ────────────────────────────────────────
  {
    arabic: 'أَقْوَى النَّاسِ مَنْ قَوِيَ عَلَى نَفْسِهِ',
    english: 'The strongest of people is the one who is strong over his own self.',
    source: 'Ghurar al-Hikam',
    theme: 'on inner strength',
  },
  {
    arabic: 'أَقْوَى النَّاسِ إِيمَانًا أَكْثَرُهُمْ تَوَكُّلًا عَلَى اللَّهِ',
    english: 'The strongest of people in faith is the one with the most reliance upon God.',
    source: 'Ghurar al-Hikam',
    theme: 'on strength in faith',
  },
  {
    arabic: 'قُوَّةُ سُلْطَانِ الْحُجَّةِ أَعْظَمُ مِنْ قُوَّةِ سُلْطَانِ الْقُدْرَةِ',
    english: 'The power of the authority of proof is greater than the power of the authority of force.',
    source: 'Ghurar al-Hikam',
    theme: 'on proof vs force',
  },
  {
    arabic: 'مِنْ أَقْوَى أَسْبَابِ الْعَقْلِ تَجَنُّبُ الْأَهْوَاءِ',
    english: 'Among the strongest causes of intellect is the avoidance of base desires.',
    source: 'Ghurar al-Hikam',
    theme: 'on strength of intellect through restraint',
  },
  {
    arabic: 'لَا قُوَّةَ كَغَلَبَةِ الْهَوَى',
    english: 'There is no strength like the conquering of base desire.',
    source: 'Ghurar al-Hikam',
    theme: 'on the strength of conquering desire',
  },
  {
    arabic: 'مَنْ قَوِيَ عَلَى نَفْسِهِ تَنَاهَى فِي الْقُوَّةِ',
    english: 'Whoever is strong over his own self has reached the utmost in strength.',
    source: 'Ghurar al-Hikam',
    theme: 'on the inner conquest',
  },
  {
    arabic: 'أَفْضَلُ الْقُوَّةِ غَلَبَةُ الْغَضَبِ',
    english: 'The most excellent strength is the overcoming of anger.',
    source: 'Ghurar al-Hikam',
    theme: 'on the strongest who controls anger',
  },
  {
    arabic: 'الْإِيمَانُ شَجَرَةٌ أَصْلُهَا الْيَقِينُ وَفَرْعُهَا التُّقَى',
    english: 'Faith is a tree whose root is certainty and whose branch is God-consciousness.',
    source: 'Ghurar al-Hikam',
    theme: 'on the tree of faith',
  },
  {
    arabic:
      'مَنْ مَلَكَ نَفْسَهُ عِنْدَ الرَّغْبَةِ وَالرَّهْبَةِ وَالشَّهْوَةِ وَالْغَضَبِ حَرَّمَ اللَّهُ جَسَدَهُ عَلَى النَّارِ',
    english: 'Whoever masters his self at times of desire, fear, lust, and anger — God forbids his body to the Fire.',
    source: 'Ghurar al-Hikam',
    theme: 'on the four moments of self-mastery',
  },
  {
    arabic: 'الْإِيمَانُ عَلَى أَرْبَعِ دَعَائِمَ: عَلَى الصَّبْرِ وَالْيَقِينِ وَالْعَدْلِ وَالْجِهَادِ',
    english: 'Faith stands upon four pillars: patience, certainty, justice, and striving.',
    source: 'Nahj al-Balagha, Saying 31',
    theme: 'on the four pillars of faith',
  },

  // ── Consultation (shūrā, mashūra) ──────────────────────────────
  {
    arabic: 'لَا ظَهِيرَ كَالْمُشَاوَرَةِ',
    english: 'There is no support like consultation.',
    source: 'Nahj al-Balagha, Saying 113',
    theme: 'on consultation, on seeking counsel',
  },
  {
    arabic: 'مَنِ اسْتَبَدَّ بِرَأْيِهِ هَلَكَ، وَمَنْ شَاوَرَ الرِّجَالَ شَارَكَهَا فِي عُقُولِهَا',
    english: 'He who acts solely on his own opinion is destroyed; he who consults with men shares in their intellects.',
    source: 'Nahj al-Balagha, Saying 161',
    theme: 'on the danger of acting alone',
  },
  {
    arabic: 'الِاسْتِشَارَةُ عَيْنُ الْهِدَايَةِ، وَقَدْ خَاطَرَ مَنِ اسْتَغْنَى بِرَأْيِهِ',
    english: 'Consultation is the very essence of guidance; he who is content with his own opinion alone has put himself in danger.',
    source: 'Nahj al-Balagha, Saying 211',
    theme: 'on consultation as guidance',
  },
  {
    arabic: 'مَنْ شَاوَرَ ذَوِي الْعُقُولِ اسْتَضَاءَ بِأَنْوَارِ الْعُقُولِ',
    english: 'He who consults possessors of intellect is illuminated by the lights of intellects.',
    source: 'Ghurar al-Hikam',
    theme: 'on consultation borrowing light',
  },
  {
    arabic: 'مَنِ اسْتَبَدَّ بِرَأْيِهِ خَفَّتْ وَطْأَتُهُ عَلَى أَصْحَابِهِ',
    english: 'He who acts independently in his opinion — his standing becomes weakened among his companions.',
    source: 'Nahj al-Balagha, Saying 161',
    theme: 'on the cost of acting alone',
  },
  {
    arabic:
      'وَلَا تَدْخُلَنَّ فِي مَشُورَتِكَ بَخِيلًا يَعْدِلُ بِكَ عَنِ الْفَضْلِ، وَيَعِدُكَ الْفَقْرَ',
    english: 'Do not include in your consultation a miser, for he will turn you away from generosity and frighten you with poverty.',
    source: 'Nahj al-Balagha, Letter 53',
    theme: 'on whom not to consult, on choosing counsellors',
  },
  {
    arabic:
      'وَلَا جَبَانًا يُضْعِفُكَ عَنِ الْأُمُورِ، وَلَا حَرِيصًا يُزَيِّنُ لَكَ الشَّرَهَ بِالْجَوْرِ',
    english: 'Nor a coward who weakens you in affairs, nor a greedy man who makes oppression seem fair through greed.',
    source: 'Nahj al-Balagha, Letter 53',
    theme: 'on whom not to consult',
  },
  {
    arabic: 'شَاوِرْ ذَوِي الْعُقُولِ تَأْمَنِ الزَّلَلَ وَالنَّدَمَ',
    english: 'Consult possessors of intellect and you will be safe from slips and regret.',
    source: 'Ghurar al-Hikam',
    theme: 'on consultation as safety',
  },
  {
    arabic: 'مَنْ شَاوَرَ ذَوِي الْأَلْبَابِ دُلَّ عَلَى الصَّوَابِ',
    english: 'He who consults the people of understanding is guided to what is correct.',
    source: 'Ghurar al-Hikam',
    theme: 'on consultation, on seeking the right way',
  },
  {
    arabic: 'مَنْ لَمْ يَسْتَشِرْ يَنْدَمْ',
    english: 'He who does not seek counsel will regret.',
    source: 'Ghurar al-Hikam',
    theme: 'on the cost of refusing counsel',
  },

  // ── Apology, accepting it, magnanimous overlooking ──────────────
  {
    arabic: 'اقْبَلْ عُذْرَ أَخِيكَ، وَإِنْ لَمْ يَكُنْ لَهُ عُذْرٌ فَالْتَمِسْ لَهُ عُذْرًا',
    english: 'Accept the excuse of your brother — and if he has no excuse, find one for him.',
    source: 'Ghurar al-Hikam',
    theme: 'on accepting apology, on giving the benefit of the doubt',
  },
  {
    arabic: 'مِنْ أَشْرَفِ أَفْعَالِ الْكَرِيمِ تَغَافُلُهُ عَمَّا يَعْلَمُ',
    english: 'Among the noblest acts of the generous person is feigning ignorance of what he knows.',
    source: 'Ghurar al-Hikam',
    theme: 'on magnanimous overlooking',
  },
  {
    arabic: 'اقْبَلِ الْعُذْرَ تَكُنْ مِنْ أَهْلِ الْفَضْلِ',
    english: 'Accept the apology — you will be among the people of virtue.',
    source: 'Ghurar al-Hikam',
    theme: 'on accepting apology',
  },
  {
    arabic: 'شَرُّ النَّاسِ مَنْ لَا يَقْبَلُ الْعُذْرَ، وَلَا يُقِيلُ الذَّنْبَ',
    english: 'The worst of people is one who neither accepts an apology nor overlooks a fault.',
    source: 'Ghurar al-Hikam',
    theme: 'on refusing apology, on being blameworthy',
  },
  {
    arabic: 'أَوْلَى النَّاسِ بِالْعَفْوِ أَقْدَرُهُمْ عَلَى الْعُقُوبَةِ',
    english: 'The most deserving of people to pardon is the one most able to punish.',
    source: 'Nahj al-Balagha, Saying 52',
    theme: 'on the magnanimity of the powerful',
  },
  {
    arabic:
      'عَوِّدْ نَفْسَكَ السَّمَاحَ، وَتَخَيَّرْ لَهَا مِنْ كُلِّ خُلُقٍ أَحْسَنَهُ، فَإِنَّ الْخَيْرَ عَادَةٌ',
    english: 'Habituate yourself to forbearance, and choose for yourself the finest of every character trait — for goodness is a habit.',
    source: 'Ghurar al-Hikam',
    theme: 'on cultivating forbearance, on character as habit',
  },
  {
    arabic: 'مَنِ اعْتَذَرَ إِلَيْكَ فَاقْبَلْ عُذْرَهُ، وَإِلَّا بَرِئْتَ مِنَ النِّفَاقِ',
    english: 'Whoever apologises to you, accept his apology — by doing so you free yourself from hypocrisy.',
    source: 'Ghurar al-Hikam',
    theme: 'on accepting apology, on avoiding hypocrisy',
  },
  {
    arabic: 'رُبَّ ذَنْبٍ مِقْدَارُ الْعَفْوِ عَنْهُ مِقْدَارُ الْعُقُوبَةِ عَلَيْهِ',
    english: 'Many a sin in which the measure of pardoning it equals the measure of punishing it — so pardon is the worthier choice.',
    source: 'Ghurar al-Hikam',
    theme: 'on weighing pardon and punishment',
  },
  {
    arabic: 'الْعَفْوُ عَنِ الْمُذْنِبِ مِنْ أَفْضَلِ الْأَعْمَالِ',
    english: 'Pardoning the wrongdoer is among the most excellent of deeds.',
    source: 'Ghurar al-Hikam',
    theme: 'on the virtue of pardon',
  },

  // ── Effort coupled with acceptance ──────────────────────────────
  {
    arabic:
      'اعْمَلْ لِدُنْيَاكَ كَأَنَّكَ تَعِيشُ أَبَدًا، وَاعْمَلْ لِآخِرَتِكَ كَأَنَّكَ تَمُوتُ غَدًا',
    english: 'Work for your worldly life as though you will live forever, and work for your Hereafter as though you will die tomorrow.',
    source: 'Attributed to Imam Ali (Nahj al-Balagha)',
    theme: 'on balancing effort, on living between the two worlds',
  },
  {
    arabic: 'مَنْ قَصَّرَ فِي الْعَمَلِ ابْتُلِيَ بِالْهَمِّ',
    english: 'Whoever falls short in action is afflicted with anxiety.',
    source: 'Nahj al-Balagha, Saying 127',
    theme: 'on falling short, on the cost of inaction',
  },
  {
    arabic: 'لَا يُدْرَكُ الْحَقُّ إِلَّا بِالْجِدِّ',
    english: 'Truth is not attained except through earnest striving.',
    source: 'Ghurar al-Hikam',
    theme: 'on the necessity of striving',
  },
  {
    arabic: 'بِالِاجْتِهَادِ تُنَالُ الْمَرَاتِبُ السَّنِيَّةُ',
    english: 'Through diligent striving the lofty ranks are attained.',
    source: 'Ghurar al-Hikam',
    theme: 'on the fruit of striving',
  },
  {
    arabic: 'الرِّضَا بِالْقَضَاءِ مِنْ كَمَالِ السَّعَادَةِ',
    english: 'Contentment with the divine decree is part of perfect happiness.',
    source: 'Ghurar al-Hikam',
    theme: 'on contentment with the decree',
  },
  {
    arabic: 'مَنْ رَضِيَ بِالْقَضَاءِ طَابَ عَيْشُهُ',
    english: 'Whoever is content with the decree, his life becomes pleasant.',
    source: 'Ghurar al-Hikam',
    theme: 'on the sweetness of acceptance',
  },
  {
    arabic: 'اِجْعَلْ هَمَّكَ لِمَا بَعْدَ الْمَوْتِ تَكْفَ مَا بَعْدَ الْمَوْتِ',
    english: 'Direct your concern to what comes after death, and you will be sufficed regarding what comes after death.',
    source: 'Ghurar al-Hikam',
    theme: 'on where to place concern',
  },
  {
    arabic: 'مَنْ أَطَاعَ التَّوَانِيَ ضَيَّعَ الْحُقُوقَ',
    english: 'Whoever obeys sluggishness squanders rights and duties.',
    source: 'Nahj al-Balagha, Saying 239',
    theme: 'on the cost of sluggishness',
  },
  {
    arabic: 'ثَمَرَةُ التَّسْلِيمِ الرَّاحَةُ',
    english: 'The fruit of submission to God is tranquillity.',
    source: 'Ghurar al-Hikam',
    theme: 'on the fruit of surrender',
  },

  // ── Istiqāma (uprightness) ──────────────────────────────────────
  {
    arabic: 'الِاسْتِقَامَةُ فَضِيلَةٌ',
    english: 'Uprightness is a virtue.',
    source: 'Ghurar al-Hikam',
    theme: 'on istiqāma',
  },
  {
    arabic: 'مَنِ اسْتَقَامَ فَإِلَى جَنَّةٍ، وَمَنْ زَلَّ فَإِلَى نَارٍ',
    english: 'Whoever stays upright is bound for Paradise; whoever slips is bound for the Fire.',
    source: 'Nahj al-Balagha, Sermon 157',
    theme: 'on istiqāma as the path',
  },
  {
    arabic: 'التَّقْوَى رَئِيسُ الْأَخْلَاقِ',
    english: 'God-wariness is the chief of all virtues.',
    source: 'Nahj al-Balagha, Saying 410',
    theme: 'on taqwā as the head of character',
  },
  {
    arabic: 'الِاسْتِقَامَةُ عَلَى الدِّينِ مِنْ أَفْضَلِ الْعِبَادَةِ',
    english: 'Steadfastness upon the religion is among the most excellent acts of worship.',
    source: 'Ghurar al-Hikam',
    theme: 'on istiqāma as worship',
  },
  {
    arabic: 'ثَمَرَةُ الدِّينِ قُوَّةُ الْيَقِينِ',
    english: 'The fruit of religion is the strength of certainty.',
    source: 'Ghurar al-Hikam',
    theme: 'on the fruit of religion',
  },
  {
    arabic: 'مَنْ أَكْثَرَ مُجَالَسَةَ الْعُلَمَاءِ أَطْنَبَ فِي السَّدَادِ',
    english: 'Whoever sits much with the learned will go far in rectitude.',
    source: 'Ghurar al-Hikam',
    theme: 'on what helps one stay on the path',
  },
  {
    arabic:
      'لَا يَتْرُكُ النَّاسُ شَيْئًا مِنْ أَمْرِ دِينِهِمْ لِاسْتِصْلَاحِ دُنْيَاهُمْ، إِلَّا فَتَحَ اللَّهُ عَلَيْهِمْ مَا هُوَ أَضَرُّ مِنْهُ',
    english: 'People do not abandon anything of the affair of their religion for the sake of bettering their worldly life, except that God opens upon them something more harmful than it.',
    source: 'Nahj al-Balagha, Saying 106',
    theme: 'on the cost of trading religion for the world',
  },

  // ── Muḥāsaba (self-reckoning, knowing one's own faults) ────────
  {
    arabic: 'مَنْ حَاسَبَ نَفْسَهُ رَبِحَ، وَمَنْ غَفَلَ عَنْهَا خَسِرَ',
    english: 'Whoever calls his soul to account profits; whoever is heedless of it loses.',
    source: 'Nahj al-Balagha, Saying 208',
    theme: 'on muḥāsaba, on profit and loss of the soul',
  },
  {
    arabic: 'ثَمَرَةُ الْمُحَاسَبَةِ إِصْلَاحُ النَّفْسِ',
    english: 'The fruit of self-reckoning is the reform of the soul.',
    source: 'Ghurar al-Hikam',
    theme: 'on the fruit of muḥāsaba',
  },
  {
    arabic: 'مَنْ حَاسَبَ نَفْسَهُ وَقَفَ عَلَى عُيُوبِهِ وَأَحَاطَ بِذُنُوبِهِ',
    english: 'Whoever takes account of his soul becomes aware of his faults and grasps the full extent of his sins.',
    source: 'Ghurar al-Hikam',
    theme: 'on muḥāsaba, on seeing one\'s sins clearly',
  },
  {
    arabic: 'أَفْضَلُ الْعِبَادَةِ مُحَاسَبَةُ النَّفْسِ',
    english: 'The most excellent worship is the reckoning of the soul.',
    source: 'Ghurar al-Hikam',
    theme: 'on muḥāsaba as the highest worship',
  },
  {
    arabic: 'كَفَى بِالْمَرْءِ جَهْلًا أَنْ لَا يَعْرِفَ قَدْرَهُ',
    english: 'It is enough ignorance for a man not to know his own measure.',
    source: 'Nahj al-Balagha, Saying 149',
    theme: 'on self-knowledge, on knowing one\'s own measure',
  },
  {
    arabic: 'مَنْ لَمْ يَتَعَاهَدِ النَّقْصَ مِنْ نَفْسِهِ غَلَبَ عَلَيْهِ الْهَوَى',
    english: 'Whoever does not regularly inspect the deficiency within himself, low desire overcomes him.',
    source: 'Nahj al-Balagha, Saying 348',
    theme: 'on watching oneself, on the danger of inattention',
  },
  {
    arabic: 'مَنْ رَاقَبَ نَفْسَهُ فِي السِّرِّ أَمِنَ مِنْ ذُنُوبِهِ فِي الْعَلَانِيَةِ',
    english: 'Whoever watches over his soul in private is kept safe from his sins in public.',
    source: 'Ghurar al-Hikam',
    theme: 'on watching oneself in private',
  },
  {
    arabic: 'يَنْبَغِي لِمَنْ عَرَفَ نَفْسَهُ أَنْ يَلْزَمَ الْقَنَاعَةَ وَالْعِفَّةَ',
    english: 'It behoves the one who has known his soul to cling fast to contentment and self-restraint.',
    source: 'Ghurar al-Hikam',
    theme: 'on self-knowledge leading to contentment',
  },

  // ── Three final classical sayings ──────────────────────────────
  {
    arabic:
      'خَالِطُوا النَّاسَ مُخَالَطَةً إِنْ مُتُّمْ مَعَهَا بَكَوْا عَلَيْكُمْ، وَإِنْ عِشْتُمْ حَنُّوا إِلَيْكُمْ',
    english:
      'Mix with people in such a way that if you die, they weep for you; and if you live, they yearn for you.',
    source: 'Nahj al-Balagha, Saying 10',
    theme: 'on how to live among people, on being missed when gone',
  },
  {
    arabic: 'الْبُخْلُ عَارٌ، وَالْجُبْنُ مَنْقَصَةٌ، وَالْفَقْرُ يُخْرِسُ الْفَطِنَ عَنْ حُجَّتِهِ',
    english:
      'Miserliness is shame, cowardice is a defect, and poverty silences the sharp-minded from his case.',
    source: 'Nahj al-Balagha, Saying 3',
    theme: 'on the three afflictions',
  },
  {
    arabic: 'الْعِلْمُ وَرَاثَةٌ كَرِيمَةٌ، وَالْآدَابُ حُلَلٌ حِسَانٌ',
    english: 'Knowledge is a noble inheritance, and good manners are fine robes.',
    source: 'Nahj al-Balagha, Saying 5',
    theme: 'on knowledge as inheritance, on good manners as adornment',
  },
]

// ── Letters & sermons — long-form excerpts ─────────────────────────
// These are substantial excerpts from the most famous letters and
// sermons in Nahj al-Balagha. Longer than wisdom maxims; each carries
// its own attribution and a brief lead-in.
export type LongFormEntry = {
  title: { en: string; ar: string }
  /** Arabic text — line breaks preserved */
  arabic: string
  /** English translation, faithful (not poeticised) */
  english: string
  /** Source citation */
  source: string
  /** 1-2 sentence brief description, bilingual */
  brief: { en: string; ar: string }
  /** Theme tag used by the LLM for matching */
  theme: string
}

export const BASELINE_LETTERS: LongFormEntry[] = [
  {
    title: {
      en: 'From the Letter to Malik al-Ashtar — On Governance',
      ar: 'من رسالة إلى مالك الأشتر — في الحكم',
    },
    arabic:
      'وَأَشْعِرْ قَلْبَكَ الرَّحْمَةَ لِلرَّعِيَّةِ، وَالمَحَبَّةَ لَهُمْ، وَاللُّطْفَ بِهِمْ، وَلَا تَكُونَنَّ عَلَيْهِمْ سَبُعًا ضَارِيًا تَغْتَنِمُ أَكْلَهُمْ، فَإِنَّهُمْ صِنْفَانِ: إِمَّا أَخٌ لَكَ فِي الدِّينِ، أَوْ نَظِيرٌ لَكَ فِي الخَلْقِ، يَفْرُطُ مِنْهُمُ الزَّلَلُ، وَتَعْرِضُ لَهُمُ العِلَلُ، وَيُؤْتَى عَلَى أَيْدِيهِمْ فِي العَمْدِ وَالخَطَأِ، فَأَعْطِهِمْ مِنْ عَفْوِكَ وَصَفْحِكَ مِثْلَ الَّذِي تُحِبُّ أَنْ يُعْطِيَكَ اللَّهُ مِنْ عَفْوِهِ وَصَفْحِهِ.',
    english:
      "And clothe your heart with mercy for the people, love for them, and kindness toward them. Do not become to them a beast of prey, seeking to devour them. For they are of two kinds: either your brother in faith, or your equal in creation. Slips will come from them. Illnesses will visit them. They will commit deliberate wrongs and unintentional ones. Give them, from your pardon and forgiveness, the same that you wish God to give you from His.",
    source: 'Nahj al-Balagha, Letter 53 — to Malik al-Ashtar on appointing him governor of Egypt',
    brief: {
      en: "The most-quoted document on Islamic ethics of governance. Written when Imam Ali sent his loyal commander Malik al-Ashtar to govern Egypt.",
      ar: 'أكثر وثيقة استشهاداً في الأخلاق السياسية الإسلامية. كُتبت حين أرسل الإمام عليّ قائده المخلص مالك الأشتر والياً على مصر.',
    },
    theme: 'on governance, on mercy, on power',
  },
  {
    title: {
      en: 'From the Letter to His Son Hasan',
      ar: 'من الرسالة إلى ولده الحسن',
    },
    arabic:
      'أَيْ بُنَيَّ، إِنِّي وَإِنْ لَمْ أَكُنْ عُمِّرْتُ عُمْرَ مَنْ كَانَ قَبْلِي، فَقَدْ نَظَرْتُ فِي أَعْمَالِهِمْ، وَفَكَّرْتُ فِي أَخْبَارِهِمْ، وَسِرْتُ فِي آثَارِهِمْ، حَتَّى عُدْتُ كَأَحَدِهِمْ، بَلْ كَأَنِّي بِمَا انْتَهَى إِلَيَّ مِنْ أُمُورِهِمْ قَدْ عُمِّرْتُ مَعَ أَوَّلِهِمْ إِلَى آخِرِهِمْ.',
    english:
      'My son — although I have not been given the lifespan of those before me, I have looked into their deeds, reflected on their stories, and walked through their traces — until I have become like one of them. Indeed, from what has reached me of their affairs, it is as though I have lived with the first of them through to the last.',
    source: 'Nahj al-Balagha, Letter 31 — to his son al-Hasan after returning from Siffin',
    brief: {
      en: "Written by Imam Ali to his son after the Battle of Siffin — a father's complete testament. The letter runs many pages and is one of the most cited documents on parenting and the inner life across the tradition.",
      ar: 'كتبها الإمام عليّ إلى ولده بعد صفّين — وصيّة أبٍ كاملة. تمتدّ الرسالة عبر صفحات كثيرة، وهي من أكثر الوثائق استشهاداً في التربية والحياة الداخلية في التقليد.',
    },
    theme: 'on parenting, on what to leave behind, on the inner work',
  },
  {
    title: {
      en: 'The Final Testament — to Hasan and Husayn',
      ar: 'الوصيّة الأخيرة — للحسن والحسين',
    },
    arabic:
      'أُوصِيكُمَا بِتَقْوَى اللَّهِ، وَأَلَّا تَبْغِيَا الدُّنْيَا وَإِنْ بَغَتْكُمَا، وَلَا تَأْسَفَا عَلَى شَيْءٍ مِنْهَا زُوِيَ عَنْكُمَا. وَقُولَا الحَقَّ، وَاعْمَلَا لِلْأَجْرِ، وَكُونَا لِلظَّالِمِ خَصْمًا، وَلِلْمَظْلُومِ عَوْنًا.',
    english:
      'I counsel you both with mindfulness of God: do not seek the world even when it seeks you, and do not grieve over anything of it withheld from you. Speak the truth. Work for what is rewarded. Be an opponent to the oppressor — and an aid to the oppressed.',
    source: 'Nahj al-Balagha, Letter 47 — written two days before his death',
    brief: {
      en: 'Imam Ali wrote this on his deathbed — to his two sons Hasan and Husayn, and through them to all who would come after. The line "Be an opponent to the oppressor and an aid to the oppressed" has echoed through fourteen centuries.',
      ar: 'كتبها الإمام عليّ على فراش الموت — إلى ابنَيه الحسن والحسين، وعبرهما إلى كلّ من يأتي بعدُه. وقد ترددت العبارة "كونا للظالم خصماً وللمظلوم عوناً" عبر أربعة عشر قرناً.',
    },
    theme: 'on what to leave behind, on justice, on dying well',
  },
  {
    title: {
      en: 'On Equity in Distribution',
      ar: 'في إنصاف القسمة',
    },
    arabic:
      'وَاللَّهِ لَوْ وَجَدْتُهُ قَدْ تُزُوِّجَ بِهِ النِّسَاءُ، وَمُلِكَ بِهِ الإِمَاءُ لَرَدَدْتُهُ. فَإِنَّ فِي العَدْلِ سَعَةً، وَمَنْ ضَاقَ عَلَيْهِ العَدْلُ فَالجَوْرُ عَلَيْهِ أَضْيَقُ.',
    english:
      'By God, were I to find that something had been given out improperly — even if it had been used to wed women or buy bondmaids — I would take it back. In justice there is room for all. And whoever finds justice constricting, will find injustice more constricting still.',
    source: 'Nahj al-Balagha, Sermon 15 — on returning property unfairly distributed under Uthman',
    brief: {
      en: "Said when Imam Ali, on taking the caliphate, faced calls to leave alone the inequitable land distributions made under the previous administration. His answer was firm — and his caliphate followed it.",
      ar: 'قاله الإمام عليّ حين تولّى الخلافة وواجه دعواتٍ ليترك تقسيمات الأرض غير العادلة تحت الإدارة السابقة. كان جوابه حازماً — وكانت خلافته تابعة لذلك.',
    },
    theme: 'on justice, on power, on what cannot be left alone',
  },
  {
    title: {
      en: 'To a Companion Doubting Sincerity',
      ar: 'إلى صاحبٍ شكّ في الإخلاص',
    },
    arabic:
      'فَأَفِقْ مِنْ سَكْرَتِكَ، وَاسْتَيْقِظْ مِنْ غَفْلَتِكَ، وَاخْتَصِرْ مِنْ عَجَلَتِكَ، وَأَنْعِمِ الفِكْرَ فِيمَا جَاءَكَ عَلَى لِسَانِ النَّبِيِّ الْأُمِّيِّ.',
    english:
      'Wake from your stupor. Rise from your distraction. Cut short your hurry. And give kindly thought to what has come to you through the tongue of the unlettered Prophet.',
    source: "Nahj al-Balagha, Letter 10 — to Mu'awiyah",
    brief: {
      en: 'A passage from a letter that combined firmness with an offer of return.',
      ar: 'مقطع من رسالة جمعت بين الحزم وعرض العودة.',
    },
    theme: 'on inner alertness, on hearing, on awakening',
  },
  {
    title: {
      en: 'From Letter 31 — On Teaching the Heart Early',
      ar: 'من الرسالة ٣١ — في تعليم القلب باكراً',
    },
    arabic:
      'وَإِنَّمَا قَلْبُ الْحَدَثِ كَالْأَرْضِ الْخَالِيَةِ، مَا أُلْقِيَ فِيهَا مِنْ شَيْءٍ قَبِلَتْهُ.\nفَبَادَرْتُكَ بِالْأَدَبِ قَبْلَ أَنْ يَقْسُوَ قَلْبُكَ، وَيَشْتَغِلَ لُبُّكَ،\nلِتَسْتَقْبِلَ بِجِدِّ رَأْيِكَ مِنَ الْأَمْرِ مَا قَدْ كَفَاكَ أَهْلُ التَّجَارِبِ بُغْيَتَهُ وَتَجْرِبَتَهُ،\nفَتَكُونَ قَدْ كُفِيتَ مَؤُونَةَ الطَّلَبِ، وَعُوفِيتَ مِنْ عِلَاجِ التَّجْرِبَةِ،\nفَأَتَاكَ مِنْ ذَلِكَ مَا قَدْ كُنَّا نَأْتِيهِ، وَاسْتَبَانَ لَكَ مَا رُبَّمَا أَظْلَمَ عَلَيْنَا مِنْهُ.\nأَيْ بُنَيَّ، إِنِّي وَإِنْ لَمْ أَكُنْ عُمِّرْتُ عُمْرَ مَنْ كَانَ قَبْلِي، فَإِنِّي قَدْ نَظَرْتُ فِي أَعْمَالِهِمْ،\nوَفَكَّرْتُ فِي أَخْبَارِهِمْ، حَتَّى صِرْتُ كَأَحَدِهِمْ.',
    english:
      'The heart of a young person is like empty ground — whatever is cast into it, it accepts. So I hurried to discipline you before your heart hardened and your mind became occupied, so that you would approach matters with the firmness of your own judgment, having been spared the trouble of seeking, since those of experience have already gathered for you what they sought and tested. Thus what we had to come to, has come to you ready — and what was sometimes dark to us has been made clear for you. My son, though I have not lived the span of those before me, I have looked into their deeds and reflected on their reports, until I became like one of them.',
    source: 'Nahj al-Balagha, Letter 31 — to his son al-Hasan',
    brief: {
      en: "Imam Ali's reason for writing his great testament so early: a young heart accepts whatever is planted in it, and he wished to plant before the soil hardened.",
      ar: 'سبب كتابة الإمام عليّ وصيّته الكبرى مبكّراً: قلب الحدث يقبل ما يُلقى فيه، فأراد أن يَغرس قبل أن تقسو الأرض.',
    },
    theme: 'on parenting, on raising sons, on what to invest in early',
  },
  {
    title: {
      en: 'From Letter 31 — Make Yourself the Scale',
      ar: 'من الرسالة ٣١ — اجعل نفسك ميزاناً',
    },
    arabic:
      'يَا بُنَيَّ، اجْعَلْ نَفْسَكَ مِيزَانًا فِيمَا بَيْنَكَ وَبَيْنَ غَيْرِكَ،\nفَأَحْبِبْ لِغَيْرِكَ مَا تُحِبُّ لِنَفْسِكَ، وَاكْرَهْ لَهُ مَا تَكْرَهُ لَهَا،\nوَلَا تَظْلِمْ كَمَا لَا تُحِبُّ أَنْ تُظْلَمَ، وَأَحْسِنْ كَمَا تُحِبُّ أَنْ يُحْسَنَ إِلَيْكَ،\nوَاسْتَقْبِحْ مِنْ نَفْسِكَ مَا تَسْتَقْبِحُهُ مِنْ غَيْرِكَ،\nوَارْضَ مِنَ النَّاسِ بِمَا تَرْضَاهُ لَهُمْ مِنْ نَفْسِكَ،\nوَلَا تَقُلْ مَا لَا تَعْلَمُ وَإِنْ قَلَّ مَا تَعْلَمُ،\nوَلَا تَقُلْ مَا لَا تُحِبُّ أَنْ يُقَالَ لَكَ.',
    english:
      'My son, make yourself a scale between you and others. Love for others what you love for yourself; hate for them what you hate for yourself. Do not wrong, as you would not wish to be wronged; do good, as you wish good to be done to you. Find ugly in yourself what you would find ugly in others. Be content from people with what you would be content for them to receive from you. Do not speak of what you do not know, even if what you know is little. And do not say of others what you would not wish said of you.',
    source: 'Nahj al-Balagha, Letter 31 — to his son al-Hasan',
    brief: {
      en: 'A practical rule for living among people, given by a father to his son: take yourself as the measure for how you treat everyone else.',
      ar: 'قاعدة عمليّة للعيش بين الناس، يعطيها أبٌ لولده.',
    },
    theme: 'on parenting, on character, on how to treat people',
  },
  {
    title: {
      en: 'From Letter 47 — Bind to the Rope of the Family',
      ar: 'من الرسالة ٤٧ — التمسّك بحبل الجماعة',
    },
    arabic:
      'اللَّهَ اللَّهَ فِي الْأَيْتَامِ، فَلَا تُغِبُّوا أَفْوَاهَهُمْ، وَلَا يَضِيعُوا بِحَضْرَتِكُمْ.\nوَاللَّهَ اللَّهَ فِي جِيرَانِكُمْ، فَإِنَّهُمْ وَصِيَّةُ نَبِيِّكُمْ، مَا زَالَ يُوصِي بِهِمْ حَتَّى ظَنَنَّا أَنَّهُ سَيُوَرِّثُهُمْ.\nوَاللَّهَ اللَّهَ فِي الْقُرْآنِ، لَا يَسْبِقْكُمْ بِالْعَمَلِ بِهِ غَيْرُكُمْ.\nوَاللَّهَ اللَّهَ فِي الصَّلَاةِ، فَإِنَّهَا عَمُودُ دِينِكُمْ.\nوَاللَّهَ اللَّهَ فِي بَيْتِ رَبِّكُمْ، لَا تُخَلُّوهُ مَا بَقِيتُمْ، فَإِنَّهُ إِنْ تُرِكَ لَمْ تُنَاظَرُوا.\nوَاللَّهَ اللَّهَ فِي الْجِهَادِ بِأَمْوَالِكُمْ وَأَنْفُسِكُمْ وَأَلْسِنَتِكُمْ فِي سَبِيلِ اللَّهِ.',
    english:
      'God, God, regarding the orphans — do not let their mouths go hungry between meals, and do not let them be lost in your presence. God, God, regarding your neighbours — they are the charge of your Prophet, who kept commending them until we thought he would make them heirs. God, God, regarding the Qur\'an — let no one outstrip you in acting by it. God, God, regarding prayer — it is the pillar of your faith. God, God, regarding the House of your Lord — do not leave it empty while you live, for if it is abandoned you will be granted no reprieve. God, God, regarding striving in God\'s way — with your wealth, your selves, and your tongues.',
    source: 'Nahj al-Balagha, Letter 47 — his final will, two days before his death',
    brief: {
      en: "From Imam Ali's dying testament: a list of things 'God, God' is invoked upon — the orphan, the neighbour, the Qur'an, prayer, the House, striving.",
      ar: 'من وصيّة الإمام عند موته: لائحة بما يُستحلَف عليه باسم الله — اليتيم، الجار، القرآن، الصلاة، البيت، الجهاد.',
    },
    theme: 'on what to leave behind, on dying well, on the rights upon us',
  },
  {
    title: {
      en: 'From Letter 53 — On the Common People',
      ar: 'من الرسالة ٥٣ — في عامّة الناس',
    },
    arabic:
      'وَلْيَكُنْ أَحَبَّ الْأُمُورِ إِلَيْكَ أَوْسَطُهَا فِي الْحَقِّ، وَأَعَمُّهَا فِي الْعَدْلِ،\nوَأَجْمَعُهَا لِرِضَى الرَّعِيَّةِ، فَإِنَّ سُخْطَ الْعَامَّةِ يُجْحِفُ بِرِضَى الْخَاصَّةِ،\nوَإِنَّ سُخْطَ الْخَاصَّةِ يُغْتَفَرُ مَعَ رِضَى الْعَامَّةِ.\nوَلَيْسَ أَحَدٌ مِنَ الرَّعِيَّةِ أَثْقَلَ عَلَى الْوَالِي مَؤُونَةً فِي الرَّخَاءِ،\nوَأَقَلَّ مَعُونَةً لَهُ فِي الْبَلَاءِ، وَأَكْرَهَ لِلْإِنْصَافِ،\nوَأَسْأَلَ بِالْإِلْحَافِ، وَأَقَلَّ شُكْرًا عِنْدَ الْإِعْطَاءِ،\nوَأَبْطَأَ عُذْرًا عِنْدَ الْمَنْعِ، وَأَضْعَفَ صَبْرًا عِنْدَ مُلِمَّاتِ الدَّهْرِ مِنْ أَهْلِ الْخَاصَّةِ.\nوَإِنَّمَا عِمَادُ الدِّينِ وَجِمَاعُ الْمُسْلِمِينَ، وَالْعُدَّةُ لِلْأَعْدَاءِ، الْعَامَّةُ مِنَ الْأُمَّةِ، فَلْيَكُنْ صِغْوُكَ لَهُمْ، وَمَيْلُكَ مَعَهُمْ.',
    english:
      "Let the dearest of affairs to you be the most balanced in truth, the most encompassing in justice, and the most gathering of the people's contentment. For the displeasure of the common people overrides the contentment of the elite, while the displeasure of the elite is excused when the common people are content. There is none of the people heavier in burden upon the governor in times of ease, less helpful to him in times of trial, more averse to fairness, more insistent in their asking, less grateful when given, slower to excuse when refused, and weaker in patience under the blows of time than the elite. For the pillar of the religion, the gathering of the Muslims, and the muster against enemies — these are the common people of the community. So let your leaning be toward them, and your inclination with them.",
    source: 'Nahj al-Balagha, Letter 53 — to Malik al-Ashtar',
    brief: {
      en: 'A passage from the Malik letter: Imam Ali ranks the contentment of the masses above the contentment of the elite, and gives reasons.',
      ar: 'مقطعٌ من رسالة مالك: يقدّم الإمامُ رضى العامّة على رضى الخاصّة، ويعلّل ذلك.',
    },
    theme: 'on governance, on the common people, on power',
  },
  {
    title: {
      en: 'From Letter 53 — On the Choice of Judges',
      ar: 'من الرسالة ٥٣ — في اختيار القضاة',
    },
    arabic:
      'ثُمَّ اخْتَرْ لِلْحُكْمِ بَيْنَ النَّاسِ أَفْضَلَ رَعِيَّتِكَ فِي نَفْسِكَ،\nمِمَّنْ لَا تَضِيقُ بِهِ الْأُمُورُ، وَلَا تُمَحِّكُهُ الْخُصُومُ،\nوَلَا يَتَمَادَى فِي الزَّلَّةِ، وَلَا يَحْصَرُ مِنَ الْفَيْءِ إِلَى الْحَقِّ إِذَا عَرَفَهُ،\nوَلَا تُشْرِفُ نَفْسُهُ عَلَى طَمَعٍ، وَلَا يَكْتَفِي بِأَدْنَى فَهْمٍ دُونَ أَقْصَاهُ،\nوَأَوْقَفَهُمْ فِي الشُّبُهَاتِ، وَآخَذَهُمْ بِالْحُجَجِ،\nوَأَقَلَّهُمْ تَبَرُّمًا بِمُرَاجَعَةِ الْخَصْمِ،\nوَأَصْبَرَهُمْ عَلَى تَكَشُّفِ الْأُمُورِ، وَأَصْرَمَهُمْ عِنْدَ اتِّضَاحِ الْحُكْمِ،\nمِمَّنْ لَا يَزْدَهِيهِ إِطْرَاءٌ، وَلَا يَسْتَمِيلُهُ إِغْرَاءٌ، وَأُولَئِكَ قَلِيلٌ.',
    english:
      'Then choose, to judge between people, the best of your subjects in your own estimation — one whom affairs do not overwhelm, whom adversaries do not provoke into stubbornness, who does not persist in his slip, who is not held back from returning to the truth once he sees it, whose soul does not lean toward greed, who is not satisfied with the lesser understanding before reaching the furthest, the most cautious of them in cases of doubt, the most binding to evidence, the least wearied by the litigant\'s coming back again, the most patient in waiting for matters to come clear, the most decisive once the ruling becomes plain — one whom praise does not delight and enticement does not sway. Such people are few.',
    source: 'Nahj al-Balagha, Letter 53 — to Malik al-Ashtar',
    brief: {
      en: "Imam Ali's standard for the judge — a portrait so demanding it ends with the admission, 'such people are few.'",
      ar: 'معيار الإمام للقاضي — صورةٌ مرتفعة في شروطها حتى ينتهي قائلاً: "وأولئك قليل".',
    },
    theme: 'on governance, on judgment, on choosing people',
  },
  {
    title: {
      en: 'From Letter 51 — To the Tax Collectors, on the Peasants',
      ar: 'من الرسالة ٥١ — إلى عمّال الخراج، في الفلّاحين',
    },
    arabic:
      'أَمَّا بَعْدُ، فَإِنَّ مَنْ لَمْ يَحْذَرْ مَا هُوَ صَائِرٌ إِلَيْهِ لَمْ يُقَدِّمْ لِنَفْسِهِ مَا يُحْرِزُهَا.\nوَاعْلَمُوا أَنَّ مَا كُلِّفْتُمْ بِهِ يَسِيرٌ، وَأَنَّ ثَوَابَهُ كَثِيرٌ.\nفَأَنْصِفُوا النَّاسَ مِنْ أَنْفُسِكُمْ، وَاصْبِرُوا لِحَوَائِجِهِمْ،\nفَإِنَّكُمْ خُزَّانُ الرَّعِيَّةِ، وَوُكَلَاءُ الْأُمَّةِ، وَسُفَرَاءُ الْأَئِمَّةِ.\nوَلَا تُحْشِمُوا أَحَدًا عَنْ حَاجَتِهِ، وَلَا تَحْبِسُوهُ عَنْ طَلِبَتِهِ،\nوَلَا تَبِيعُنَّ لِلنَّاسِ فِي الْخَرَاجِ كِسْوَةَ شِتَاءٍ وَلَا صَيْفٍ،\nوَلَا دَابَّةً يَعْتَمِلُونَ عَلَيْهَا، وَلَا عَبْدًا،\nوَلَا تَضْرِبُنَّ أَحَدًا سَوْطًا لِمَكَانِ دِرْهَمٍ.',
    english:
      'Now then — whoever does not take warning of what he is moving toward will not put forward for himself what would save him. Know that what is asked of you is little and its reward is much. So be fair to people from your own selves, and be patient with their needs — for you are the treasurers of the people, the agents of the community, and the envoys of the leaders. Do not deter anyone from his need, nor hold him back from his request. Do not sell off, for taxes, anyone\'s winter garment or summer garment, nor a beast he works with, nor a slave — and do not strike anyone with a single lash for the sake of a dirham.',
    source: 'Nahj al-Balagha, Letter 51 — to those collecting the land tax',
    brief: {
      en: 'A directive to his tax collectors: the limits of state power over the poor, laid down in concrete prohibitions — not the winter cloak, not the working animal, not a single lash for a coin.',
      ar: 'توجيهٌ لعمّال الخراج: حدود سلطة الدولة على الفقير، في محرّمات ملموسة — لا ثوب الشتاء، ولا دابّة العمل، ولا سوطٌ واحد لأجل درهم.',
    },
    theme: 'on governance, on the treatment of subjects, on the limits of state power',
  },
  {
    title: { en: 'Letter 25 — To the Zakāt Collectors', ar: 'الكِتاب ٢٥ — إلى عمّال الصَّدَقات' },
    arabic:
      'انْطَلِقْ عَلَى تَقْوَى اللَّهِ وَحْدَهُ لَا شَرِيكَ لَهُ، وَلَا تُرَوِّعَنَّ مُسْلِمًا، وَلَا تَجْتَازَنَّ عَلَيْهِ كَارِهًا،\nوَلَا تَأْخُذَنَّ مِنْهُ أَكْثَرَ مِنْ حَقِّ اللَّهِ فِي مَالِهِ.\nفَإِذَا قَدِمْتَ عَلَى الْحَيِّ فَانْزِلْ بِمَائِهِمْ مِنْ غَيْرِ أَنْ تُخَالِطَ أَبْيَاتَهُمْ،\nثُمَّ امْضِ إِلَيْهِمْ بِالسَّكِينَةِ وَالْوَقَارِ حَتَّى تَقُومَ بَيْنَهُمْ فَتُسَلِّمَ عَلَيْهِمْ، وَلَا تُخْدِجْ بِالتَّحِيَّةِ لَهُمْ.\nثُمَّ تَقُولَ: عِبَادَ اللَّهِ، أَرْسَلَنِي إِلَيْكُمْ وَلِيُّ اللَّهِ وَخَلِيفَتُهُ لِآخُذَ مِنْكُمْ حَقَّ اللَّهِ فِي أَمْوَالِكُمْ،\nفَهَلْ لِلَّهِ فِي أَمْوَالِكُمْ مِنْ حَقٍّ فَتُؤَدُّوهُ إِلَى وَلِيِّهِ؟\nفَإِنْ قَالَ قَائِلٌ: لَا، فَلَا تُرَاجِعْهُ، وَإِنْ أَنْعَمَ لَكَ مُنْعِمٌ فَانْطَلِقْ مَعَهُ مِنْ غَيْرِ أَنْ تُخِيفَهُ أَوْ تُوعِدَهُ أَوْ تَعْسِفَهُ أَوْ تُرْهِقَهُ.\nوَلَا تَأْخُذَنَّ دَابَّةً بِسَوْطٍ وَلَا تَضْرِبَنَّهَا، وَلَا تَأْخُذَنَّ مَرْكُوبَ الرَّجُلِ.\nوَآسِ بَيْنَ الْمُسْلِمِينَ بِوَجْهِكَ وَمَجْلِسِكَ، وَأَنْصِفْ لِلْمَظْلُومِ مِنَ الظَّالِمِ.',
    english:
      "Set forth in the fear of God alone, who has no partner. Do not frighten any Muslim, nor pass over his land against his will, nor take from him more than the right of God in his property.\nWhen you arrive at the tribe, alight at their watering-place; do not enter their houses. Then walk towards them with calm and dignity, until you stand in their midst and greet them — and do not be sparing in your salutation.\nThen say: 'Servants of God, the friend of God and his vicegerent has sent me to you, to take from you God's due in your wealth. Is there any due of God in your wealth, that you may render it to His friend?'\nIf anyone says no, do not press him. If anyone answers yes, go with him — without intimidating him, threatening him, treating him harshly, or burdening him.\nDo not strike his animal with a whip, nor beat it, and do not take the mount he rides.\nTreat the Muslims equally in your countenance and your seat, and grant the wronged his right against the wrongdoer.",
    source: 'Nahj al-Balagha, Letter 25 — to those appointed over the zakāt',
    brief: {
      en: "A protocol for tax collectors: arrive with dignity, ask not demand, never frighten, take only God's due, and never strike a man's beast.",
      ar: 'آدابٌ لجابي الصدقات: وقارٌ في الإقبال، وسؤالٌ لا انتزاع، ولا ترويع ولا عسف.',
    },
    theme: 'on governance, on the treatment of subjects, on justice in administration',
  },
  {
    title: { en: 'Letter 41 — To a Kinsman Who Betrayed the Trust', ar: 'الكِتاب ٤١ — إلى بعض عمّاله' },
    arabic:
      'أَمَّا بَعْدُ، فَإِنِّي كُنْتُ أَشْرَكْتُكَ فِي أَمَانَتِي، وَجَعَلْتُكَ شِعَارِي وَبِطَانَتِي،\nوَلَمْ يَكُنْ رَجُلٌ مِنْ أَهْلِي أَوْثَقَ مِنْكَ فِي نَفْسِي لِمُوَاسَاتِي وَمُوَازَرَتِي وَأَدَاءِ الْأَمَانَةِ إِلَيَّ.\nفَلَمَّا رَأَيْتَ الزَّمَانَ عَلَى ابْنِ عَمِّكَ قَدْ كَلِبَ، وَالْعَدُوَّ قَدْ حَرِبَ،\nقَلَبْتَ لِابْنِ عَمِّكَ ظَهْرَ الْمِجَنِّ،\nفَفَارَقْتَهُ مَعَ الْمُفَارِقِينَ، وَخَذَلْتَهُ مَعَ الْخَاذِلِينَ، وَخُنْتَهُ مَعَ الْخَائِنِينَ.\nفَلَا ابْنَ عَمِّكَ آسَيْتَ، وَلَا الْأَمَانَةَ أَدَّيْتَ.\nفَلَمَّا أَمْكَنَتْكَ الشِّدَّةُ فِي خِيَانَةِ الْأُمَّةِ أَسْرَعْتَ الْكَرَّةَ، وَعَاجَلْتَ الْوَثْبَةَ،\nوَاخْتَطَفْتَ مَا قَدَرْتَ عَلَيْهِ مِنْ أَمْوَالِهِمُ الْمَصُونَةِ لِأَرَامِلِهِمْ وَأَيْتَامِهِمُ،\nاخْتِطَافَ الذِّئْبِ الْأَزَلِّ دَامِيَةَ الْمِعْزَى الْكَسِيرَةَ.\nفَاتَّقِ اللَّهَ وَارْدُدْ إِلَى هَؤُلَاءِ الْقَوْمِ أَمْوَالَهُمْ، فَإِنَّكَ إِنْ لَمْ تَفْعَلْ ثُمَّ أَمْكَنَنِي اللَّهُ مِنْكَ لَأُعْذِرَنَّ إِلَى اللَّهِ فِيكَ.',
    english:
      'To proceed: I had made you a partner in my trust and taken you as my innermost confidant. No man of my own household was more trusted by me than you for sharing my burden, supporting me, and discharging the trust I placed in you.\nBut when you saw that the times had turned cruel against your cousin and that the enemy had grown fierce — you turned the back of your shield upon your cousin. You broke from him with those who broke away, deserted him with the deserters, and betrayed him with the betrayers.\nYou neither stood by your cousin nor delivered up the trust.\nThe moment you found an opening to betray the community, you sprang to it. You hurried the raid, leaped quickly, and snatched whatever you could of their money set aside for their widows and orphans —\nthe snatching of a fierce wolf at a maimed she-goat dripping with blood.\nSo fear God and return to these people their property. For if you do not, and God then gives me power over you, I will discharge my duty before God in your case.',
    source: 'Nahj al-Balagha, Letter 41 — to a kinsman-governor who stole from the public treasury',
    brief: {
      en: "A letter of bitter reproach to a relative who stole from the public treasury — money set aside for widows and orphans — and a warning that God's judgement, and the Imam's, are both coming.",
      ar: 'عتابٌ مريرٌ لعاملٍ من أهله خانَ بيتَ المال، وأخذَ مالَ الأرامل والأيتام، وتهديدٌ بقضاء الله.',
    },
    theme: 'on betrayal of trust, on accountability of those in power',
  },
  {
    title: { en: 'Letter 27 — To Muhammad ibn Abi Bakr, Governor of Egypt', ar: 'الكِتاب ٢٧ — إلى محمد بن أبي بكر' },
    arabic:
      'فَاخْفِضْ لَهُمْ جَنَاحَكَ، وَأَلِنْ لَهُمْ جَانِبَكَ، وَابْسُطْ لَهُمْ وَجْهَكَ، وَآسِ بَيْنَهُمْ فِي اللَّحْظَةِ وَالنَّظْرَةِ،\nحَتَّى لَا يَطْمَعَ الْعُظَمَاءُ فِي حَيْفِكَ لَهُمْ، وَلَا يَيْأَسَ الضُّعَفَاءُ مِنْ عَدْلِكَ عَلَيْهِمْ.\nفَإِنَّ اللَّهَ تَعَالَى يُسَائِلُكُمْ مَعْشَرَ عِبَادِهِ عَنِ الصَّغِيرَةِ مِنْ أَعْمَالِكُمْ وَالْكَبِيرَةِ، وَالظَّاهِرَةِ وَالْمَسْتُورَةِ.\nفَإِنْ يُعَذِّبْ فَأَنْتُمْ أَظْلَمُ، وَإِنْ يَعْفُ فَهُوَ أَكْرَمُ.\nوَاعْلَمُوا عِبَادَ اللَّهِ، أَنَّ الْمُتَّقِينَ ذَهَبُوا بِعَاجِلِ الدُّنْيَا وَآجِلِ الْآخِرَةِ،\nفَشَارَكُوا أَهْلَ الدُّنْيَا فِي دُنْيَاهُمْ، وَلَمْ يُشَارِكْهُمْ أَهْلُ الدُّنْيَا فِي آخِرَتِهِمْ.\nسَكَنُوا الدُّنْيَا بِأَفْضَلِ مَا سُكِنَتْ، وَأَكَلُوهَا بِأَفْضَلِ مَا أُكِلَتْ،\nثُمَّ انْقَلَبُوا عَنْهَا بِالزَّادِ الْمُبَلِّغِ وَالْمَتْجَرِ الرَّابِحِ.',
    english:
      "Lower your wing to them, soften your side, spread out your face for them, and be equal among them in the glance and the gaze — so that the great may not covet your bias toward them, nor the weak despair of your justice over them.\nFor God will question you — community of His servants — about the smallest of your deeds and the greatest, the open and the hidden. If He punishes, you have been the greater wrongdoers; if He pardons, He is the more generous.\nKnow, servants of God, that the God-fearing have carried off both this world's near reward and the next world's later one. They shared with the people of this world in their world, and the people of this world did not share with them in their hereafter.\nThey inhabited the world in the best of habitations, and ate of it in the best of ways. Then they departed from it with provision enough to reach the end, and a profitable trade.",
    source: 'Nahj al-Balagha, Letter 27 — to Muhammad ibn Abi Bakr on his appointment to Egypt',
    brief: {
      en: 'Instructions to a young governor: be equal among the people in your very glances, fear the audit of small deeds, and remember that the God-fearing won both worlds while the worldly won only one.',
      ar: 'وصايا لوالٍ شابّ: المساواة بين الناس حتى في اللحظة، وخوف المحاسبة، وأنّ المتّقين فازوا بالدنيا والآخرة.',
    },
    theme: 'on governance, on justice toward the people, on the two worlds',
  },
  {
    title: { en: "Letter 12 — To Ma'qil ibn Qays on the March", ar: 'الكِتاب ١٢ — إلى مَعقِل بن قَيس' },
    arabic:
      'اتَّقِ اللَّهَ الَّذِي لَا بُدَّ لَكَ مِنْ لِقَائِهِ، وَلَا مُنْتَهَى لَكَ دُونَهُ،\nوَلَا تُقَاتِلَنَّ إِلَّا مَنْ قَاتَلَكَ.\nوَسِرِ الْبَرْدَيْنِ، وَغَوِّرْ بِالنَّاسِ، وَرَفِّهْ فِي السَّيْرِ.\nوَلَا تَسِرْ أَوَّلَ اللَّيْلِ، فَإِنَّ اللَّهَ جَعَلَهُ سَكَنًا، وَقَدَّرَهُ مُقَامًا لَا ظَعْنًا،\nفَأَرِحْ فِيهِ بَدَنَكَ، وَرَوِّحْ ظَهْرَكَ.\nفَإِذَا وَقَفْتَ حِينَ يَنْبَطِحُ السَّحَرُ، أَوْ حِينَ يَنْفَجِرُ الْفَجْرُ، فَسِرْ عَلَى بَرَكَةِ اللَّهِ.\nفَإِذَا لَقِيتَ الْعَدُوَّ فَقِفْ مِنْ أَصْحَابِكَ وَسَطًا،\nوَلَا تَدْنُ مِنَ الْقَوْمِ دُنُوَّ مَنْ يُرِيدُ أَنْ يُنْشِبَ الْحَرْبَ،\nوَلَا تَبَاعَدْ عَنْهُمْ تَبَاعُدَ مَنْ يَهَابُ الْبَأْسَ.',
    english:
      'Fear God, whom you must inevitably meet, and beyond whom there is no destination.\nDo not fight any except those who fight you.\nMarch in the two cools of the day, give the people rest at midday, and go gently in the journey.\nDo not travel in the first part of the night, for God has made it a time of rest, ordained for stillness, not for moving —\nso ease your body in it, and give your mounts repose.\nThen when you halt at the stretching of the predawn, or at the breaking of dawn, set out upon the blessing of God.\nWhen you meet the enemy, stand in the middle of your companions:\ndo not draw near the foe like one who wishes to kindle battle,\nand do not stand off from them like one who dreads combat.',
    source: "Nahj al-Balagha, Letter 12 — to Ma'qil ibn Qays",
    brief: {
      en: 'March orders to a commander — fear God, fight only the aggressor, rest the men, stand neither too forward nor too far back.',
      ar: 'أوامر المسير لقائد: التقوى، وعدم البدء بالقتال، وإراحة الجند، والوقوف في الوسط بين الإقدام والإحجام.',
    },
    theme: 'on the ethics of command, on the conduct of war',
  },
  {
    title: { en: 'Letter 23 — His Final Will from the Death-Bed', ar: 'الكِتاب ٢٣ — وصيّتُه من فِراش الشهادة' },
    arabic:
      'وَصِيَّتِي لَكُمْ: أَلَّا تُشْرِكُوا بِاللَّهِ شَيْئًا،\nوَمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ فَلَا تُضَيِّعُوا سُنَّتَهُ.\nأَقِيمُوا هَذَيْنِ الْعَمُودَيْنِ، وَأَوْقِدُوا هَذَيْنِ الْمِصْبَاحَيْنِ،\nوَخَلَاكُمْ ذَمٌّ مَا لَمْ تَشْرُدُوا.\nحُمِّلَ كُلُّ امْرِئٍ مِنْكُمْ مَجْهُودَهُ، وَخُفِّفَ عَنِ الْجَهَلَةِ.\nرَبٌّ رَحِيمٌ، وَدِينٌ قَوِيمٌ، وَإِمَامٌ عَلِيمٌ.\nأَنَا بِالْأَمْسِ صَاحِبُكُمْ، وَالْيَوْمَ عِبْرَةٌ لَكُمْ، وَغَدًا مُفَارِقُكُمْ.\nإِنْ أَبْقَ فَأَنَا وَلِيُّ دَمِي، وَإِنْ أَفْنَ فَالْفَنَاءُ مِيعَادِي،\nوَإِنْ أَعْفُ فَالْعَفْوُ لِي قُرْبَةٌ، وَهُوَ لَكُمْ حَسَنَةٌ، فَاعْفُوا.\nأَلَا تُحِبُّونَ أَنْ يَغْفِرَ اللَّهُ لَكُمْ؟',
    english:
      'My will to you: associate nothing with God,\nand as for Muhammad — God\'s blessings upon him and his family — do not let his way be lost.\nHold up these two pillars, light these two lamps,\nand no blame is on you so long as you do not stray.\nEach of you has been charged only with what he can bear, and the ignorant have been given lightening.\nA merciful Lord, an upright religion, a knowing Imam.\nYesterday I was your companion, today I am a lesson for you, and tomorrow I depart from you.\nIf I survive, I am the master of my own blood; if I perish, perishing is my appointed time;\nand if I pardon, pardon is for me a nearness to God and for you a good deed — so pardon.\nWould you not love that God should forgive you?',
    source: 'Nahj al-Balagha, Letter 23 — spoken from his death-bed after the strike',
    brief: {
      en: "Imam Ali's last words to his community: hold the two pillars (Tawhid and the Prophet's way), and pardon — for it is dearer to God.",
      ar: 'آخر كلمات الإمام لأمّته: تمسّكوا بالعمودين (التوحيد وسنّة النبيّ)، واعفوا — فهو أحبّ إلى الله.',
    },
    theme: 'on the final testament, on pardon, on parting',
  },
  {
    title: { en: 'Letter 22 — To Ibn Abbas', ar: 'الكِتاب ٢٢ — إلى ابن عبّاس' },
    arabic:
      'أَمَّا بَعْدُ، فَإِنَّ الْمَرْءَ قَدْ يَسُرُّهُ دَرْكُ مَا لَمْ يَكُنْ لِيَفُوتَهُ،\nوَيَسُوؤُهُ فَوْتُ مَا لَمْ يَكُنْ لِيُدْرِكَهُ.\nفَلْيَكُنْ سُرُورُكَ بِمَا نِلْتَ مِنْ آخِرَتِكَ،\nوَلْيَكُنْ أَسَفُكَ عَلَى مَا فَاتَكَ مِنْهَا.\nوَمَا نِلْتَ مِنْ دُنْيَاكَ فَلَا تُكْثِرْ بِهِ فَرَحًا،\nوَمَا فَاتَكَ مِنْهَا فَلَا تَأْسَ عَلَيْهِ جَزَعًا،\nوَلْيَكُنْ هَمُّكَ فِيمَا بَعْدَ الْمَوْتِ.',
    english:
      'Now then — a man is sometimes pleased at attaining what was never going to slip from him, and grieved at losing what he was never going to attain.\nSo let your joy be in what you have gained for your hereafter,\nand let your sorrow be over what you have let slip of it.\nAs for what you have gained of this world, do not be excessive in delight at it;\nand what you have lost of it — do not give way to anguish over it.\nLet your concern be with what comes after death.',
    source: 'Nahj al-Balagha, Letter 22 — to Ibn Abbas',
    brief: {
      en: 'Discipline of joy and grief — measure them by the next world, not this one.',
      ar: 'تهذيب الفرح والحزن بميزان الآخرة لا الدنيا.',
    },
    theme: 'on detachment, on measuring joy and grief, on the discipline of the heart',
  },
]

export const BASELINE_SERMONS: LongFormEntry[] = [
  {
    title: {
      en: 'On the Pious',
      ar: 'في صفات المتّقين',
    },
    arabic:
      'فَالمُتَّقُونَ فِيهَا هُمْ أَهْلُ الفَضَائِلِ: مَنْطِقُهُمُ الصَّوَابُ، وَمَلْبَسُهُمُ الِاقْتِصَادُ، وَمَشْيُهُمُ التَّوَاضُعُ. غَضُّوا أَبْصَارَهُمْ عَمَّا حَرَّمَ اللَّهُ عَلَيْهِمْ، وَوَقَفُوا أَسْمَاعَهُمْ عَلَى العِلْمِ النَّافِعِ لَهُمْ. نُزِّلَتْ أَنْفُسُهُمْ مِنْهُمْ فِي البَلَاءِ كَالَّتِي نُزِّلَتْ فِي الرَّخَاءِ.',
    english:
      'The mindful are people of virtue: their speech is right, their dress moderate, their walking humble. They have lowered their gaze from what God has forbidden them, and stopped their ears at what is beneficial for them to hear. Their selves in hardship hold the same position they held in ease.',
    source: 'Nahj al-Balagha, Sermon 193 — "The Sermon of the Pious" (al-Muttaqin), delivered to Hammam',
    brief: {
      en: 'A companion named Hammam asked Imam Ali to describe the pious in such a way that he could see them as if before his eyes. The Imam hesitated, then delivered this sermon. It is said that on hearing it Hammam fell into a state from which he did not recover, and died on the spot.',
      ar: 'سأل صاحبٌ يُدعى همّامٌ الإمامَ عليّاً أن يصف المتّقين وصفاً يراهم به كأنّه ينظر إليهم. تردّد الإمام، ثمّ ألقى هذه الخطبة. ويُقال إنّ همّاماً سقط على إثرها مغشيّاً عليه ولم يُفِق، ومات في موضعه.',
    },
    theme: 'on character, on what mindfulness looks like, on integrity',
  },
  {
    title: {
      en: 'On the Beginning of Creation',
      ar: 'في بدء الخلق',
    },
    arabic:
      'الحَمْدُ لِلَّهِ الَّذِي لَا يَبْلُغُ مِدْحَتَهُ القَائِلُونَ، وَلَا يُحْصِي نَعْمَاءَهُ العَادُّونَ، وَلَا يُؤَدِّي حَقَّهُ المُجْتَهِدُونَ، الَّذِي لَا يُدْرِكُهُ بُعْدُ الهِمَمِ، وَلَا يَنَالُهُ غَوْصُ الفِطَنِ.',
    english:
      'Praise be to God whose praise no speaker reaches, whose blessings no counter exhausts, whose right no striver fulfils — who cannot be grasped by the reach of aspirations, nor caught by the dive of intellects.',
    source: 'Nahj al-Balagha, Sermon 1 — the opening sermon, on creation',
    brief: {
      en: 'The first sermon in Nahj al-Balagha — a sustained meditation on the nature of God, creation, the angels, and the human journey. Considered one of the high points of Arabic prose across all centuries.',
      ar: 'الخطبة الأولى في نهج البلاغة — تأمّل مستفيض في طبيعة الله، والخلق، والملائكة، ورحلة الإنسان. تُعدّ من قمم النثر العربيّ عبر العصور.',
    },
    theme: 'on God, on creation, on the limits of intellect',
  },
  {
    title: {
      en: 'On Why I Took the Caliphate',
      ar: 'في علّة قبول الخلافة',
    },
    arabic:
      'أَمَا وَالَّذِي فَلَقَ الحَبَّةَ وَبَرَأَ النَّسَمَةَ، لَوْلَا حُضُورُ الحَاضِرِ، وَقِيَامُ الحُجَّةِ بِوُجُودِ النَّاصِرِ، وَمَا أَخَذَ اللَّهُ عَلَى العُلَمَاءِ أَنْ لَا يُقَارُّوا عَلَى كِظَّةِ ظَالِمٍ، وَلَا سَغَبِ مَظْلُومٍ — لَأَلْقَيْتُ حَبْلَهَا عَلَى غَارِبِهَا.',
    english:
      'By the One who split the seed and brought forth the soul — were it not for the presence of those present, the standing of the proof by the availability of supporters, and the pledge God has taken from the learned not to remain content with the gluttony of an oppressor or the hunger of the oppressed — I would have cast its reins upon its withers.',
    source: 'Nahj al-Balagha, Sermon 3 — the Shaqshaqiyya Sermon',
    brief: {
      en: "Imam Ali's most famous sermon on power — explaining why he accepted the caliphate when the people came to him after the death of the third Caliph. The phrase 'gluttony of an oppressor or hunger of the oppressed' became a constant reference in Islamic political ethics.",
      ar: 'أشهر خطب الإمام عليّ في السلطة — يفسّر فيها لماذا قَبِل الخلافة حين جاءه الناس بعد مقتل الخليفة الثالث. وقد صارت عبارة "كِظّة ظالم وسَغَب مظلوم" مرجعاً ثابتاً في الأخلاق السياسية الإسلامية.',
    },
    theme: 'on power, on responsibility, on why one accepts a burden',
  },
  {
    title: {
      en: 'On the World',
      ar: 'في الدنيا',
    },
    arabic:
      'فَإِنَّ الدُّنْيَا قَدْ تَوَلَّتْ حَذَّاءَ، فَلَمْ يَبْقَ مِنْهَا إِلَّا صُبَابَةٌ كَصُبَابَةِ الإِنَاءِ اصْطَبَّهَا مُصْطَبُّهَا. أَلَا وَإِنَّ الدُّنْيَا قَدْ آذَنَتْ بِوَدَاعٍ، وَالآخِرَةَ قَدْ أَشْرَفَتْ بِاطِّلَاعٍ.',
    english:
      'This world has turned away in haste — nothing remains of it except a dribble like the dribble at the bottom of a vessel that has been emptied. The world has announced its farewell, and the next has overlooked from above.',
    source: 'Nahj al-Balagha, Sermon 28',
    brief: {
      en: 'A short reflection on the brevity of life — frequently read aloud by classical orators across the centuries.',
      ar: 'تأمّل قصير في قِصَر العمر — كثيراً ما يقرأه الخطباء الكلاسيكيّون عبر القرون.',
    },
    theme: 'on the brevity of life, on the long view, on death',
  },
  {
    title: {
      en: 'A Description of His Own Companions',
      ar: 'في وصف أصحابه',
    },
    arabic:
      'لَقَدْ رَأَيْتُ أَصْحَابَ مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ، فَمَا أَرَى أَحَدًا يُشْبِهُهُمْ. لَقَدْ كَانُوا يُصْبِحُونَ شُعْثًا غُبْرًا، وَقَدْ بَاتُوا سُجَّدًا وَقِيَامًا — يُرَاوِحُونَ بَيْنَ جِبَاهِهِمْ وَخُدُودِهِمْ، وَيَقِفُونَ عَلَى مِثْلِ الجَمْرِ مِنْ ذِكْرِ مَعَادِهِمْ.',
    english:
      'I knew the companions of Muhammad (peace be upon him and his family) — and I see none who resemble them. They would rise in the morning dishevelled and dust-covered, having spent the night in prostration and standing — alternating between their foreheads and cheeks — and stood on what felt like burning coals from remembering their return to God.',
    source: 'Nahj al-Balagha, Sermon 96',
    brief: {
      en: 'A witness from Imam Ali about the early companions he knew personally — and a measure of how he saw the generation after them.',
      ar: 'شهادة من الإمام عليّ في أصحاب النبيّ الذين عرفهم شخصيّاً — ومقياس لما يراه في الجيل الذي بعدهم.',
    },
    theme: 'on devotion, on the early generation, on what changed',
  },
  // ── v46.1 corpus expansion · sermons ──────────────────────────
  {
    title: {
      en: 'The Sermon of Jihad',
      ar: 'في الحثّ على الجهاد',
    },
    arabic:
      'أَمَّا بَعْدُ، فَإِنَّ الجِهَادَ بَابٌ مِنْ أَبْوَابِ الجَنَّةِ، فَتَحَهُ اللَّهُ لِخَاصَّةِ أَوْلِيَائِهِ، وَهُوَ لِبَاسُ التَّقْوَى، وَدِرْعُ اللَّهِ الحَصِينَةُ، وَجُنَّتُهُ الوَثِيقَةُ. فَمَنْ تَرَكَهُ رَغْبَةً عَنْهُ أَلْبَسَهُ اللَّهُ ثَوْبَ الذُّلِّ، وَشَمِلَهُ البَلَاءُ.',
    english:
      'To proceed: jihad is one of the gates of Paradise, which God has opened for His closest friends. It is the garment of mindfulness, the impenetrable armour of God, and His trustworthy shield. Whoever abandons it out of distaste, God clothes him in the garment of humiliation, and calamity envelops him.',
    source: 'Nahj al-Balagha, Sermon 27 — "The Sermon of Jihad"',
    brief: {
      en: 'Imam Ali delivered this after the Syrian forces of Muawiya raided Anbar and killed civilians; he rebuked the Kufans for their reluctance to mobilise in defence of the wronged.',
      ar: 'ألقى الإمامُ عليٌّ هذه الخطبةَ بعد إغارةِ جيوشِ الشّامِ على الأنبارِ وقتلِ أهلِها، موبِّخاً أهلَ الكوفةِ على تخاذلِهم عن نُصرةِ المظلومين.',
    },
    theme: 'on courage, on the cost of passivity, on standing for the wronged',
  },
  {
    title: {
      en: 'On the Prophet, Peace Be Upon Him',
      ar: 'في وصف النبيّ صلّى الله عليه وآله',
    },
    arabic:
      'أَرْسَلَهُ عَلَى حِينِ فَتْرَةٍ مِنَ الرُّسُلِ، وَطُولِ هَجْعَةٍ مِنَ الأُمَمِ، وَانْتِقَاضٍ مِنَ المُبْرَمِ، فَجَاءَهُمْ بِتَصْدِيقِ الَّذِي بَيْنَ يَدَيْهِ، وَالنُّورِ المُقْتَدَى بِهِ. ذَلِكَ القُرْآنُ فَاسْتَنْطِقُوهُ، وَلَنْ يَنْطِقَ، وَلَكِنْ أُخْبِرُكُمْ عَنْهُ: أَلَا إِنَّ فِيهِ عِلْمَ مَا يَأْتِي، وَالحَدِيثَ عَنِ المَاضِي، وَدَوَاءَ دَائِكُمْ، وَنَظْمَ مَا بَيْنَكُمْ.',
    english:
      'God sent him during an interval between messengers, during a long slumber of the nations, when firm covenants were unravelling. He came confirming what was before him and bearing a light to be followed. That is the Quran — so make it speak, though it will never speak. But I will tell you about it: in it is the knowledge of what is to come, the account of what is past, the cure for your ailment, and the ordering of all that lies between you.',
    source: 'Nahj al-Balagha, Sermon 158',
    brief: {
      en: "A celebrated passage on the timing of the Prophet's mission and the living function of the Quran as guidance, diagnosis, and remedy for every age.",
      ar: 'مقطعٌ مشهورٌ يصفُ زمنَ بعثةِ النبيِّ ومهمَّتَه، ووظيفةَ القرآنِ بوصفِه هدايةً ودواءً للأمَّةِ في كلِّ زمان.',
    },
    theme: 'on the Prophet, on the Quran, on guidance',
  },
  {
    title: {
      en: 'On Death and the Grave',
      ar: 'في ذكر الموت وما بعده',
    },
    arabic:
      'فَلَوْ رَأَيْتَ، عِبَادَ اللَّهِ، حَيْثُ يَتَرَدَّى بَعْدَ الحَيَاةِ ضِيقَ القَبْرِ، فَيَا لَهَا حَفِيرَةً، عَلَى سَاكِنِهَا مَا أَضْيَقَهَا، وَفِي أَيِّ بُقْعَةٍ بَلَدِهَا مَا أَوْحَشَهَا. وَإِنَّ لِلْمَوْتِ لَغَمَرَاتٍ هِيَ أَفْظَعُ مِنْ أَنْ تُسْتَغْرَقَ بِصِفَةٍ. كَأَنَّكَ بِالأَمْرِ قَدْ نَزَلَ بِكَ، فَأَعَدَّ لَهُ جَوَابَهُ، وَأَكْثِرْ زَادَهُ.',
    english:
      'O servants of God, if only you could see where, after life, one tumbles into the narrowness of the grave — what a pit it is, how cramped upon its inhabitant, what an isolating place in any land it occupies. Death has agonies too dreadful to be captured in description. It is as if the matter has already descended upon you — so prepare your answer for it, and pack abundant provision.',
    source: 'Nahj al-Balagha, Sermon 221',
    brief: {
      en: "A meditation on the moment of dying and the silence of the grave, delivered to shake hearts numbed by the routine of worldly life.",
      ar: 'تأمُّلٌ في لحظةِ الموتِ ووحشةِ القبرِ، ألقاه الإمامُ ليُنبِّهَ القلوبَ الَّتي ألهتْها الحياةُ الدّنيا.',
    },
    theme: 'on mortality, on preparation, on the grave',
  },
  {
    title: {
      en: 'The Mutual Right of Ruler and Ruled',
      ar: 'في حقّ الوالي والرعيّة',
    },
    arabic:
      'أَمَّا بَعْدُ، فَقَدْ جَعَلَ اللَّهُ سُبْحَانَهُ لِي عَلَيْكُمْ حَقًّا بِوِلَايَةِ أَمْرِكُمْ، وَلَكُمْ عَلَيَّ مِنَ الحَقِّ مِثْلُ الَّذِي لِي عَلَيْكُمْ. فَالحَقُّ أَوْسَعُ الأَشْيَاءِ فِي التَّوَاصُفِ، وَأَضْيَقُهَا فِي التَّنَاصُفِ. لَا يَجْرِي لِأَحَدٍ إِلَّا جَرَى عَلَيْهِ، وَلَا يَجْرِي عَلَيْهِ إِلَّا جَرَى لَهُ.',
    english:
      'God has placed a right upon you for me through my guardianship of your affair, and you have upon me a right equal to mine upon you. Right is the broadest of things in description and the narrowest in mutual fulfilment. It runs for no one without also running against him, and runs against no one without also running for him.',
    source: 'Nahj al-Balagha, Sermon 216',
    brief: {
      en: "A foundational statement on reciprocal rights: authority creates obligation in both directions, with no one excepted from mutual accountability except God.",
      ar: 'بيانٌ تأسيسيٌّ في الحقوقِ المتبادلةِ، يُعلِنُ فيه الإمامُ أنَّ الولايةَ تُنشئُ التزاماً في الاتِّجاهين، ولا يستثنى أحدٌ من المساءلةِ المتبادلةِ إلَّا الله.',
    },
    theme: 'on justice, on leadership, on mutual obligation',
  },
  {
    title: {
      en: 'On the Creation of the Peacock',
      ar: 'في خلق الطاووس',
    },
    arabic:
      'وَمِنْ أَعْجَبِهَا خَلْقًا الطَّاوُوسُ، الَّذِي أَقَامَهُ فِي أَحْكَمِ تَعْدِيلٍ، وَنَضَّدَ أَلْوَانَهُ فِي أَحْسَنِ تَنْضِيدٍ، بِجَنَاحٍ أَشْرَجَ قَصَبَهُ، وَذَنَبٍ أَطَالَ مَسْحَبَهُ. إِذَا دَرَجَ إِلَى الأُنْثَى نَشَرَهُ مِنْ طَيِّهِ، وَسَمَا بِهِ مُطِلًّا عَلَى رَأْسِهِ كَأَنَّهُ قِلْعُ دَارِيٍّ عَنَجَهُ نُوتِيُّهُ. يَخْتَالُ بِأَلْوَانِهِ، وَيَمِيسُ بِزَيَفَانِهِ.',
    english:
      "Among the most wondrous of God's creatures in form is the peacock, whom He set up in the most exquisite balance and whose colours He arranged in the finest arrangement, with a wing whose quills He fitted together, and a tail whose train He lengthened. When he struts toward the female, he unfurls it from its folds and raises it overhead like the sail of a Darian ship hauled up by its sailor. He swaggers with his colours and sways with his prancing.",
    source: 'Nahj al-Balagha, Sermon 165',
    brief: {
      en: "A famous passage of natural theology — Imam Ali contemplating the peacock as evidence of the Maker's artistry, dwelling on its colours, display, and design.",
      ar: 'مقطعٌ مشهورٌ من الخطبةِ يتأمَّلُ فيه الإمامُ خلقَ الطّاووسِ دليلاً على صنعِ الخالقِ، واصفاً ألوانَه ومشيتَه وبديعَ تركيبِه.',
    },
    theme: 'on creation, on the signs of God, on wonder',
  },
  {
    title: {
      en: 'On the Transience of This World',
      ar: 'في زهرة الدنيا وفنائها',
    },
    arabic:
      'أَيُّهَا النَّاسُ، انْظُرُوا إِلَى الدُّنْيَا نَظَرَ الزَّاهِدِينَ فِيهَا، الصَّادِفِينَ عَنْهَا، فَإِنَّهَا وَاللَّهِ عَمَّا قَلِيلٍ تُزِيلُ السَّاكِنَ الآمِنَ، وَتَفْجَعُ المُتْرَفَ الوَادِعَ. لَا يَرْجِعُ مَا تَوَلَّى مِنْهَا فَأَدْبَرَ. سُرُورُهَا مَشُوبٌ بِالحُزْنِ، وَجَلَدُ الرِّجَالِ فِيهَا إِلَى الضَّعْفِ وَالوَهْنِ. فَلَا يَغُرَّنَّكُمْ كَثْرَةُ مَا يُعْجِبُكُمْ فِيهَا، لِقِلَّةِ مَا يَصْحَبُكُمْ مِنْهَا.',
    english:
      'O people, look upon the world with the gaze of those who turn from it in detachment. For by God, before long it dislodges the settled and the secure, and strikes the comfortable with grief. What has gone from it and turned its back does not return. Its delight is mingled with sorrow, and the strength of men within it ends in feebleness. So do not let the multitude of things that please you in it deceive you, for little of it will accompany you.',
    source: 'Nahj al-Balagha, Sermon 103',
    brief: {
      en: 'A sober address urging the listener to look at the world with the detached eye of one who knows its impermanence — neither seduced by its pleasures nor surprised by its losses.',
      ar: 'خطابٌ رزينٌ يدعو السَّامعَ إلى النّظرِ إلى الدّنيا بعينِ الزّاهدِ العارفِ بفنائِها، فلا تخدعه ملذَّاتُها ولا تفجؤه مصائبُها.',
    },
    theme: 'on detachment, on impermanence, on inner clarity',
  },
  {
    title: {
      en: 'I Was Like a Mountain — Why I Held My Hand',
      ar: 'في الصبر على المظلمة',
    },
    arabic:
      'فَنَظَرْتُ فَإِذَا لَيْسَ لِي مُعِينٌ إِلَّا أَهْلُ بَيْتِي، فَضَنِنْتُ بِهِمْ عَنِ المَوْتِ، وَأَغْضَيْتُ عَلَى القَذَى، وَشَرِبْتُ عَلَى الشَّجَا، وَصَبَرْتُ عَلَى أَخْذِ الكَظَمِ، وَعَلَى أَمَرَّ مِنْ طَعْمِ العَلْقَمِ.',
    english:
      'I looked and found I had no helper but the people of my house — and I was unwilling to expose them to death. So I closed my eyes despite the dust in them, swallowed despite the lump in my throat, and bore patiently the choking grip and what was bitterer than the taste of colocynth.',
    source: 'Nahj al-Balagha, Sermon 26',
    brief: {
      en: "A wrenching account of why Imam Ali withheld his hand after the Prophet's death: lacking helpers beyond his immediate family, he chose patience over conflict.",
      ar: 'وصفٌ مؤثِّرٌ يبيِّن فيه الإمامُ سببَ صبرِه بعد وفاةِ النبيِّ، إذ لم يجدْ ناصراً سوى أهلِ بيتِه، فاختار الصّبرَ على القتالِ حفاظاً عليهم.',
    },
    theme: 'on patience, on principled restraint, on bearing injustice',
  },
  {
    title: { en: 'The Graveyard Address', ar: 'خِطابُ أَهْلِ القُبور' },
    arabic:
      'يَا أَهْلَ الدِّيَارِ الْمُوحِشَةِ، وَالمَحَالِّ المُقْفِرَةِ، وَالقُبُورِ المُظْلِمَةِ.\nيَا أَهْلَ التُّرْبَةِ، يَا أَهْلَ الغُرْبَةِ، يَا أَهْلَ الوَحْدَةِ، يَا أَهْلَ الوَحْشَةِ.\nأَنْتُمْ لَنَا فَرَطٌ سَابِقٌ، وَنَحْنُ لَكُمْ تَبَعٌ لَاحِقٌ.\nأَمَّا الدُّورُ فَقَدْ سُكِنَتْ، وَأَمَّا الأَزْوَاجُ فَقَدْ نُكِحَتْ، وَأَمَّا الأَمْوَالُ فَقَدْ قُسِّمَتْ.\nهَذَا خَبَرُ مَا عِنْدَنَا، فَمَا خَبَرُ مَا عِنْدَكُمْ؟\nثُمَّ الْتَفَتَ إِلَى أَصْحَابِهِ فَقَالَ: أَمَا لَوْ أُذِنَ لَهُمْ فِي الكَلَامِ لَأَخْبَرُوكُمْ أَنَّ خَيْرَ الزَّادِ التَّقْوَى.',
    english:
      'O people of the desolate dwellings, the empty quarters, the dark graves.\nO people of the dust, O people of estrangement, O people of solitude, O people of dread.\nYou have gone ahead of us, and we are following behind.\nAs for the houses — they have been inhabited. As for the spouses — they have been remarried. As for the wealth — it has been divided.\nThis is the news from our side; so what is the news from yours?\nThen he turned to his companions and said: If they were permitted to speak, they would tell you that the best provision is fear of God.',
    source: 'Nahj al-Balagha, Saying 130 (the graveyard address near Kufa)',
    brief: {
      en: 'Imam Ali stopped at the graves on his return from Siffin and addressed the dead — one of the most piercing passages on mortality in the tradition.',
      ar: 'وقف الإمامُ على المقابرِ عند رجوعِه من صفّين فخاطبَ الموتى، وهو من أبلغِ ما قيلَ في الموتِ.',
    },
    theme: 'on the grave, on visiting the dead, when sensing mortality',
  },
  {
    title: { en: 'What Death Truly Is', ar: 'حَقيقَةُ المَوْتِ' },
    arabic:
      'فَلَوْ رَأَيْتَ، عِبَادَ اللَّهِ، مَا قَدْ نَزَلُوا حَيْثُ نَزَلُوا.\nقَدِ ارْتَهَنَتْهُمْ هُنَاكَ الأَعْمَالُ، وَغَلَبَتْهُمُ الأَهْوَالُ.\nأَكَلَتِ الأَرْضُ مِنْ لُحُومِهِمْ، فَأَصْبَحُوا فِي حُفَرِ الأَجْدَاثِ جِيرَانًا لَا يَتَزَاوَرُونَ، وَنُدَمَاءَ لَا يَتَعَاشَرُونَ.\nبَلِيَتْ بَيْنَهُمْ عُرَى التَّعَارُفِ، وَانْقَطَعَتْ مِنْهُمْ أَسْبَابُ الإِخَاءِ.\nفَكُلُّهُمْ وَحِيدٌ وَهُمْ جَمِيعٌ، وَبِجَانِبِ الهَجْرِ وَهُمْ أَخِلَّاءُ.\nلَا يَتَعَارَفُونَ لِلَيْلٍ صَبَاحًا، وَلَا لِنَهَارٍ مَسَاءً.',
    english:
      'If you could only see, O servants of God, where they have descended and where they have come to rest.\nThere their deeds have taken them hostage, and the terrors have overwhelmed them.\nThe earth has eaten from their flesh, and they have become in the pits of the graves neighbours who do not visit one another, companions who do not converse.\nThe bonds of mutual acquaintance among them have worn away, and the ties of brotherhood have been severed.\nEach of them is alone though they are together, on the side of estrangement though they are intimates.\nThey do not know morning from a night, nor evening from a day.',
    source: "Nahj al-Balagha, Sermon 221 (after recitation of 'Vying for more distracts you')",
    brief: {
      en: 'From the sermon delivered after reciting Surat al-Takathur — a vivid description of the state of the dead in their graves.',
      ar: 'من الخطبةِ التي ألقاها بعد تلاوةِ سورةِ التكاثرِ، يصفُ فيها حالَ الموتى في قبورِهم.',
    },
    theme: 'on death, on the grave, on what waits in the earth',
  },
  {
    title: { en: 'What Did He Send Ahead?', ar: 'مَاذَا قَدَّمَ؟' },
    arabic:
      'أَيُّهَا النَّاسُ، إِنَّمَا الدُّنْيَا دَارُ مَجَازٍ، وَالآخِرَةُ دَارُ قَرَارٍ.\nفَخُذُوا مِنْ مَمَرِّكُمْ لِمَقَرِّكُمْ.\nوَلَا تَهْتِكُوا أَسْتَارَكُمْ عِنْدَ مَنْ يَعْلَمُ أَسْرَارَكُمْ.\nوَأَخْرِجُوا مِنَ الدُّنْيَا قُلُوبَكُمْ مِنْ قَبْلِ أَنْ تَخْرُجَ مِنْهَا أَبْدَانُكُمْ.\nفَفِي الدُّنْيَا حُيِّيتُمْ، وَلِغَيْرِهَا خُلِقْتُمْ.\nإِنَّ المَرْءَ إِذَا هَلَكَ قَالَ النَّاسُ: مَا تَرَكَ؟ وَقَالَتِ المَلَائِكَةُ: مَا قَدَّمَ؟\nفَلِلَّهِ آبَاؤُكُمْ، فَقَدِّمُوا بَعْضًا يَكُنْ لَكُمْ قَرْضًا، وَلَا تُخَلِّفُوا كُلًّا فَيَكُونَ عَلَيْكُمْ كَلًّا.',
    english:
      'O people, this world is only a place of passage, and the Hereafter is the abode of permanence.\nSo take from your thoroughfare for your dwelling.\nDo not tear away your veils before the One who knows your secrets.\nTake your hearts out of this world before your bodies leave it.\nFor in this world you have been kept alive, but for another you were created.\nWhen a man perishes, the people say: "What did he leave behind?" but the angels say: "What did he send ahead?"\nMay God bless your fathers — send something ahead so it may be a loan in your favour, and do not leave everything behind, lest it become a burden against you.',
    source: 'Nahj al-Balagha, Saying 203',
    brief: {
      en: 'A short address contrasting the two questions asked at death — the one the world asks, and the one the angels ask.',
      ar: 'خطابٌ قصيرٌ يقابلُ بين سؤالِ الناسِ وسؤالِ الملائكةِ عند موتِ الإنسانِ.',
    },
    theme: 'on death, on what we send ahead, when preparing for the journey',
  },
  {
    title: { en: 'The Pangs of Death', ar: 'سَكَرَاتُ المَوْتِ' },
    arabic:
      'اجْتَمَعَتْ عَلَيْهِمْ سَكْرَةُ المَوْتِ وَحَسْرَةُ الفَوْتِ.\nفَفَتَرَتْ لَهَا أَطْرَافُهُمْ، وَتَغَيَّرَتْ لَهَا أَلْوَانُهُمْ.\nثُمَّ ازْدَادَ المَوْتُ فِيهِمْ وُلُوجًا، فَحِيلَ بَيْنَ أَحَدِهِمْ وَبَيْنَ مَنْطِقِهِ.\nوَإِنَّهُ لَبَيْنَ أَهْلِهِ يَنْظُرُ بِبَصَرِهِ، وَيَسْمَعُ بِأُذُنِهِ، عَلَى صِحَّةٍ مِنْ عَقْلِهِ وَبَقَاءٍ مِنْ لُبِّهِ.\nيُفَكِّرُ فِيمَ أَفْنَى عُمُرَهُ، وَفِيمَ أَذْهَبَ دَهْرَهُ.\nوَيَتَذَكَّرُ أَمْوَالًا جَمَعَهَا، أَغْمَضَ فِي مَطَالِبِهَا، وَأَخَذَهَا مِنْ مُصَرَّحَاتِهَا وَمُشْتَبِهَاتِهَا.\nقَدْ لَزِمَتْهُ تَبِعَاتُ جَمْعِهَا، وَأَشْرَفَ عَلَى فِرَاقِهَا.\nتَبْقَى لِمَنْ وَرَاءَهُ يَنْعَمُونَ فِيهَا، وَيَتَمَتَّعُونَ بِهَا.\nفَيَكُونُ المَهْنَأُ لِغَيْرِهِ، وَالعِبْءُ عَلَى ظَهْرِهِ.',
    english:
      'The agony of death and the regret of loss come upon them together.\nTheir limbs grow slack at it, and their complexions change.\nThen death drives deeper into them, and a man is cut off from his own speech.\nYet he is among his family, still seeing with his eye, hearing with his ear, his mind sound, his intellect intact.\nHe ponders: in what did I waste my life? In what did I let my time pass?\nHe remembers wealth he gathered, closing his eyes to how he sought it, taking it from the lawful and the doubtful alike.\nThe consequences of gathering it now cling to him, and he is on the verge of departing from it.\nIt will remain for those after him to enjoy and take pleasure in.\nThe ease is for another, but the load is on his back.',
    source: 'Nahj al-Balagha, Sermon 109',
    brief: {
      en: 'Imam Ali describes the moment of death from the inside — the dying man still aware, watching what he built slip into other hands.',
      ar: 'يصفُ الإمامُ لحظةَ الموتِ من داخلِها، والمحتضرُ يرى مالَه ينتقلُ إلى غيرِه.',
    },
    theme: 'on death, on the deathbed, on what we leave behind',
  },
  {
    title: { en: 'The Bridge and the Day of Resurrection', ar: 'الصِّرَاطُ وَيَوْمُ القِيَامَةِ' },
    arabic:
      'وَاعْلَمُوا أَنَّ مَجَازَكُمْ عَلَى الصِّرَاطِ وَمَزَالِقِ دَحْضِهِ، وَأَهَاوِيلِ زَلَلِهِ، وَتَارَاتِ أَهْوَالِهِ.\nفَاتَّقُوا اللَّهَ عِبَادَ اللَّهِ تَقِيَّةَ ذِي لُبٍّ شَغَلَ التَّفَكُّرُ قَلْبَهُ.\nوَأَنْصَبَ الخَوْفُ بَدَنَهُ، وَأَسْهَرَ التَّهَجُّدُ غِرَارَ نَوْمِهِ.\nوَأَظْمَأَ الرَّجَاءُ هَوَاجِرَ يَوْمِهِ.\nوَظَلَفَ الزُّهْدُ شَهَوَاتِهِ، وَأَوْجَفَ الذِّكْرُ بِلِسَانِهِ.\nوَقَدَّمَ الخَوْفَ لِأَمَانِهِ، وَتَنَكَّبَ المَخَالِجَ عَنْ وَضَحِ السَّبِيلِ.\nوَسَلَكَ أَقْصَدَ المَسَالِكِ إِلَى النَّهْجِ المَطْلُوبِ.',
    english:
      'Know that your crossing is upon the Bridge — its slippery footing, the terrors of its stumbling, the waves of its horrors.\nSo fear God, O servants of God, with the fear of a man of reason whose heart is preoccupied with reflection.\nFear has wearied his body, and the night vigil has banished the snatches of his sleep.\nHope has parched his hot midday with thirst.\nAsceticism has restrained his desires, and remembrance has set his tongue in motion.\nHe has put fear forward for the sake of his security, turned aside from the deviations off the clear road,\nand traveled the straightest path toward the sought-after way.',
    source: "Nahj al-Balagha, Sermon 83 (al-Gharra')",
    brief: {
      en: "From the famed Gharra' sermon — the crossing of the Bridge on the Day of Resurrection and the portrait of the soul prepared for that day.",
      ar: 'من خطبةِ الغرّاءِ المشهورةِ، يصفُ المجازَ على الصراطِ وحالَ من استعدَّ لذلك اليومِ.',
    },
    theme: 'on the reckoning, on the Day of Judgment, on the Bridge',
  },
  {
    title: { en: 'The Gathering and the Reckoning', ar: 'المَحْشَرُ وَالحِسَابُ' },
    arabic:
      'اعْلَمُوا عِبَادَ اللَّهِ أَنَّ عَلَيْكُمْ رَصَدًا مِنْ أَنْفُسِكُمْ، وَعُيُونًا مِنْ جَوَارِحِكُمْ.\nوَحُفَّاظَ صِدْقٍ يَحْفَظُونَ أَعْمَالَكُمْ، وَعَدَدَ أَنْفَاسِكُمْ.\nلَا تَسْتُرُكُمْ مِنْهُمْ ظُلْمَةُ لَيْلٍ دَاجٍ، وَلَا يُكِنُّكُمْ مِنْهُمْ بَابٌ ذُو رِتَاجٍ.\nوَإِنَّ غَدًا مِنَ اليَوْمِ قَرِيبٌ.\nيَذْهَبُ اليَوْمُ بِمَا فِيهِ، وَيَجِيءُ الغَدُ لَاحِقًا بِهِ.\nفَكَأَنَّ كُلَّ امْرِئٍ مِنْكُمْ قَدْ بَلَغَ مِنَ الأَرْضِ مَنْزِلَ وَحْدَتِهِ، وَمَخَطَّ حُفْرَتِهِ.\nفَيَا لَهُ مِنْ بَيْتِ وَحْدَةٍ، وَمَنْزِلِ وَحْشَةٍ، وَمُفْرَدِ غُرْبَةٍ!\nوَكَأَنَّ الصَّيْحَةَ قَدْ أَتَتْكُمْ، وَالسَّاعَةَ قَدْ غَشِيَتْكُمْ.\nوَبَرَزْتُمْ لِفَصْلِ القَضَاءِ، قَدْ زَاحَتْ عَنْكُمُ الأَبَاطِيلُ، وَاضْمَحَلَّتْ عَنْكُمُ العِلَلُ.',
    english:
      'Know, O servants of God, that watchers from your own selves are upon you, and spies from your own limbs,\nand truthful keepers who record your deeds and the number of your breaths.\nNo darkness of a deep night conceals you from them, no bolted door shuts you off from them.\nTomorrow is near to today.\nToday goes with what is in it, and tomorrow follows it.\nIt is as if each of you has already reached his solitary station in the earth, the pit dug for him.\nO what a house of loneliness, what a dwelling of dread, what an abode of estrangement alone!\nIt is as if the Cry has reached you, the Hour has overtaken you,\nand you have emerged for the final judgment — falsehoods have departed from you, excuses have fallen away.',
    source: 'Nahj al-Balagha, Sermon 157',
    brief: {
      en: 'Imam Ali brings the Day of Gathering close — collapsing the distance between today and the moment of standing for judgment.',
      ar: 'يقرّبُ الإمامُ يومَ المحشرِ، فيلغي المسافةَ بين اليومِ ولحظةِ الوقوفِ للحسابِ.',
    },
    theme: 'on the reckoning, on the Day of Judgment, on the gathering',
  },
  {
    title: { en: 'He Is Not Known by Likeness', ar: 'لَا يُعْرَفُ بِالْمُمَاثَلَةِ' },
    arabic:
      'الْحَمْدُ لِلَّهِ الَّذِي لَا تُدْرِكُهُ الشَّوَاهِدُ، وَلَا تَحْوِيهِ الْمَشَاهِدُ.\nوَلَا تَرَاهُ النَّوَاظِرُ، وَلَا تَحْجُبُهُ السَّوَاتِرُ.\nالدَّالِّ عَلَى قِدَمِهِ بِحُدُوثِ خَلْقِهِ، وَبِحُدُوثِ خَلْقِهِ عَلَى وُجُودِهِ.\nوَبِاشْتِبَاهِهِمْ عَلَى أَنْ لَا شَبَهَ لَهُ.\nالَّذِي صَدَقَ فِي مِيعَادِهِ، وَارْتَفَعَ عَنْ ظُلْمِ عِبَادِهِ.\nوَقَامَ بِالْقِسْطِ فِي خَلْقِهِ، وَعَدَلَ عَلَيْهِمْ فِي حُكْمِهِ.\nوَاحِدٌ لَا بِعَدَدٍ، وَدَائِمٌ لَا بِأَمَدٍ، وَقَائِمٌ لَا بِعَمَدٍ.',
    english:
      'Praise be to God whom the senses cannot perceive, and whom no place can contain.\nWhom no eye can see, and whom no veil can hide.\nHe who proves His eternity by the origination of His creation, and by the origination of His creation upon His own existence,\nand by their resemblance to one another that He has no likeness.\nHe is the true keeper of His promise, far above wronging His servants.\nHe stands by equity among His creation and rules over them with justice.\nOne, not by number; everlasting, not by duration; standing, not by props.',
    source: 'Nahj al-Balagha, Sermon 152',
    brief: {
      en: 'Created things testify to their Creator precisely by their poverty: their origination proves His pre-eternity, their resemblance proves His unlikeness.',
      ar: 'المخلوقاتُ تدلُّ على خالقِها بفقرِها، وحدوثُها شاهدٌ على أزليّتِه.',
    },
    theme: 'on tawhid, on knowing God through creation',
  },
  {
    title: { en: 'The Foremost in Religion Is to Know Him', ar: 'أَوَّلُ الدِّينِ مَعْرِفَتُهُ' },
    arabic:
      'أَوَّلُ الدِّينِ مَعْرِفَتُهُ، وَكَمَالُ مَعْرِفَتِهِ التَّصْدِيقُ بِهِ.\nوَكَمَالُ التَّصْدِيقِ بِهِ تَوْحِيدُهُ، وَكَمَالُ تَوْحِيدِهِ الْإِخْلَاصُ لَهُ.\nوَكَمَالُ الْإِخْلَاصِ لَهُ نَفْيُ الصِّفَاتِ عَنْهُ.\nلِشَهَادَةِ كُلِّ صِفَةٍ أَنَّهَا غَيْرُ الْمَوْصُوفِ.\nوَشَهَادَةِ كُلِّ مَوْصُوفٍ أَنَّهُ غَيْرُ الصِّفَةِ.\nفَمَنْ وَصَفَ اللَّهَ سُبْحَانَهُ فَقَدْ قَرَنَهُ.\nوَمَنْ قَرَنَهُ فَقَدْ ثَنَّاهُ، وَمَنْ ثَنَّاهُ فَقَدْ جَزَّأَهُ.\nوَمَنْ جَزَّأَهُ فَقَدْ جَهِلَهُ.\nوَمَنْ جَهِلَهُ فَقَدْ أَشَارَ إِلَيْهِ.\nوَمَنْ أَشَارَ إِلَيْهِ فَقَدْ حَدَّهُ، وَمَنْ حَدَّهُ فَقَدْ عَدَّهُ.',
    english:
      'The foremost in religion is the knowledge of Him, and the perfection of knowing Him is to affirm Him.\nThe perfection of affirming Him is to declare His oneness, and the perfection of declaring His oneness is sincerity toward Him.\nThe perfection of sincerity toward Him is to deny attributes of Him —\nfor every attribute bears witness that it is other than that which it qualifies,\nand every qualified thing bears witness that it is other than the attribute.\nSo whoever ascribes an attribute to God has joined a partner to Him.\nWhoever joins a partner to Him has made Him two; whoever makes Him two has divided Him.\nWhoever divides Him is ignorant of Him.\nWhoever is ignorant of Him points to Him.\nWhoever points to Him has set a limit upon Him, and whoever sets a limit upon Him has numbered Him.',
    source: 'Nahj al-Balagha, Sermon 1 (the apophatic cascade)',
    brief: {
      en: "The opening cascade of Sermon 1: religion's beginning is knowing Him; the height of that knowing is to deny any attribute beside His essence.",
      ar: 'سلّمُ المعرفةِ من التصديقِ إلى نفيِ الصفاتِ، فكلُّ وصفٍ تحديدٌ.',
    },
    theme: 'on tawhid, on apophatic theology, on the divine attributes',
  },
  {
    title: { en: 'No State Precedes Another in Him', ar: 'لَمْ تَسْبِقْ لَهُ حَالٌ حَالًا' },
    arabic:
      'الْحَمْدُ لِلَّهِ الَّذِي لَمْ تَسْبِقْ لَهُ حَالٌ حَالًا.\nفَيَكُونَ أَوَّلًا قَبْلَ أَنْ يَكُونَ آخِرًا، وَيَكُونَ ظَاهِرًا قَبْلَ أَنْ يَكُونَ بَاطِنًا.\nكُلُّ مُسَمًّى بِالْوَحْدَةِ غَيْرَهُ قَلِيلٌ، وَكُلُّ عَزِيزٍ غَيْرَهُ ذَلِيلٌ.\nوَكُلُّ قَوِيٍّ غَيْرَهُ ضَعِيفٌ، وَكُلُّ مَالِكٍ غَيْرَهُ مَمْلُوكٌ.\nوَكُلُّ عَالِمٍ غَيْرَهُ مُتَعَلِّمٌ، وَكُلُّ قَادِرٍ غَيْرَهُ يَقْدِرُ وَيَعْجَزُ.\nلَمْ يَخْلُقْ مَا خَلَقَهُ لِتَشْدِيدِ سُلْطَانٍ، وَلَا خَوْفٍ مِنْ زَوَالٍ وَنُقْصَانٍ.\nوَلَا اسْتِعَانَةٍ عَلَى نِدٍّ مُكَاثِرٍ، وَلَا شَرِيكٍ مُكَابِرٍ.',
    english:
      'Praise be to God for whom no state precedes another state.\nSo that He should be First before being Last, or Manifest before being Hidden.\nEvery named-as-one besides Him is small; every powerful one besides Him is weak.\nEvery strong one besides Him is feeble; every owner besides Him is owned.\nEvery knower besides Him is a learner; every able one besides Him is by turns able and incapable.\nHe did not create what He created to consolidate a kingdom, nor from fear of decline and diminution,\nnor seeking aid against a rival who outnumbers Him, nor against a partner who would overreach Him.',
    source: 'Nahj al-Balagha, Sermon 65',
    brief: {
      en: 'A litany of contrasts: every attribute creatures share with Him collapses into limitation. He created from neither need nor fear.',
      ar: 'كلُّ صفةٍ في المخلوقِ محدودةٌ، وفيه سبحانه مطلقةٌ، وخلقَ لا لحاجةٍ.',
    },
    theme: 'on tawhid, on the divine attributes, on the contrast between Creator and creature',
  },
  {
    title: { en: 'Imaginations Cannot Reach Him', ar: 'لَا تَنَالُهُ الْأَوْهَامُ' },
    arabic:
      'الْحَمْدُ لِلَّهِ الَّذِي لَا تُدْرِكُهُ الْأَوْهَامُ بِالْحَدَسِ.\nوَلَا تَنَالُهُ الْأَفْهَامُ بِالتَّصَوُّرِ.\nوَلَيْسَ بِالَّذِي تَحُلُّهُ الْحَوَادِثُ، وَلَا بِالَّذِي يَخْفَى عَلَيْهِ شَيْءٌ.\nالَّذِي بَطَنَ مِنْ خَفِيَّاتِ الْأُمُورِ، وَظَهَرَ فِي الْعُقُولِ بِمَا يُرَى فِي خَلْقِهِ مِنْ عَلَامَاتِ التَّدْبِيرِ.\nالَّذِي سُئِلَتِ الْأَنْبِيَاءُ عَنْهُ فَلَمْ تَصِفْهُ بِحَدٍّ وَلَا بِنَقْصٍ، بَلْ وَصَفَتْهُ بِأَفْعَالِهِ.\nوَدَلَّتْ عَلَيْهِ بِآيَاتِهِ.\nلَا تَسْتَطِيعُ عُقُولُ الْمُتَفَكِّرِينَ جَحْدَهُ.\nالَّذِي عَجَزَتِ الْأَوْهَامُ أَنْ تَكْتَنِهَ صِفَتَهُ، وَانْحَسَرَتِ الْأَبْصَارُ أَنْ تَنَالَ كُنْهَ عَظَمَتِهِ.',
    english:
      'Praise be to God whom imaginations cannot grasp by their guesses.\nWhom understandings cannot reach by their conceiving.\nWho is not one whom events befall, nor one from whom anything is hidden.\nHe whose innermost reality lies behind concealed matters, and who appears to the intellects through what is seen in His creation of the signs of governance.\nHe of whom the prophets were asked, and they did not describe Him by any limit nor by any defect, but described Him by His acts —\nand pointed to Him by His signs.\nThe minds of those who reflect cannot deny Him.\nHe whose attribute imaginations are too weak to fathom, and whose greatness the eyes fall short, exhausted, of ever reaching.',
    source: 'Nahj al-Balagha, Sermon 49',
    brief: {
      en: 'Sermon 49 in full apophatic stride: He is inaccessible to guess and concept, yet His traces in creation make denial impossible for any honest mind.',
      ar: 'هو سبحانه خفيٌّ عن الأوهامِ، ظاهرٌ بآثارِ التدبيرِ، فلا تنالُه العقولُ ولا تنكرُه.',
    },
    theme: 'on tawhid, on apophatic theology, on the limits of reason',
  },
  {
    title: { en: 'He Is with Everything Without Adjacency', ar: 'مَعَ كُلِّ شَيْءٍ لَا بِمُقَارَنَةٍ' },
    arabic:
      'مَعَ كُلِّ شَيْءٍ لَا بِمُقَارَنَةٍ، وَغَيْرُ كُلِّ شَيْءٍ لَا بِمُزَايَلَةٍ.\nفَاعِلٌ لَا بِمَعْنَى الْحَرَكَاتِ وَالْآلَةِ.\nبَصِيرٌ إِذْ لَا مَنْظُورَ إِلَيْهِ مِنْ خَلْقِهِ.\nمُتَوَحِّدٌ إِذْ لَا سَكَنَ يَسْتَأْنِسُ بِهِ، وَلَا يَسْتَوْحِشُ لِفَقْدِهِ.\nأَنْشَأَ الْخَلْقَ إِنْشَاءً، وَابْتَدَأَهُ ابْتِدَاءً.\nبِلَا رَوِيَّةٍ أَجَالَهَا، وَلَا تَجْرِبَةٍ اسْتَفَادَهَا.\nوَلَا حَرَكَةٍ أَحْدَثَهَا، وَلَا هَمَامَةِ نَفْسٍ اضْطَرَبَ فِيهَا.\nأَحَالَ الْأَشْيَاءَ لِأَوْقَاتِهَا، وَلَأَمَ بَيْنَ مُخْتَلِفَاتِهَا.\nعَالِمًا بِهَا قَبْلَ ابْتِدَائِهَا، مُحِيطًا بِحُدُودِهَا وَانْتِهَائِهَا.',
    english:
      'He is with every thing, but not by adjacency; and other than every thing, but not by separation.\nHe acts, but not in the sense of motions and instruments.\nHe sees, even when there was nothing of His creation to be seen.\nHe is uniquely one, even when there was no companion to grow intimate with, nor any whose loss could leave Him desolate.\nHe brought creation into being and originated it from the start —\nwithout any reflection He turned over, without any experience He drew upon,\nwithout any motion He set going, without any anxious whisper of a soul throbbing in Him.\nHe set things to their times and joined together their differences,\nknowing them before their beginning, encompassing their limits and their end.',
    source: 'Nahj al-Balagha, Sermon 1 (second tawhid passage)',
    brief: {
      en: 'He is with everything without being beside it, and other than everything without being apart from it — His action requires no instrument, His creating no deliberation.',
      ar: 'معيّتُه سبحانه لا بملاصقةٍ، وفعلُه لا بآلةٍ، وخلقُه لا برويّةٍ.',
    },
    theme: 'on tawhid, on the divine attributes, on creation',
  },
  {
    title: { en: 'O World, Deceive Another', ar: 'يَا دُنْيَا غُرِّي غَيْرِي' },
    arabic:
      'إِلَيْكِ عَنِّي يَا دُنْيَا، فَحَبْلُكِ عَلَى غَارِبِكِ.\nقَدِ انْسَلَلْتُ مِنْ مَخَالِبِكِ، وَأَفْلَتُّ مِنْ حَبَائِلِكِ.\nأَيْنَ الْقُرُونُ الَّذِينَ غَرَرْتِهِمْ بِمَدَاعِبِكِ؟\nأَيْنَ الْأُمَمُ الَّذِينَ فَتَنْتِهِمْ بِزَخَارِفِكِ؟\nفَهَا هُمْ رَهَائِنُ الْقُبُورِ، وَمَضَامِينُ اللُّحُودِ.\nوَاللَّهِ لَوْ كُنْتِ شَخْصًا مَرْئِيًّا، وَقَالَبًا حِسِّيًّا،\nلَأَقَمْتُ عَلَيْكِ حُدُودَ اللَّهِ فِي عِبَادٍ غَرَرْتِهِمْ بِالْأَمَانِيِّ.\nإِلَيْكِ عَنِّي، فَوَاللَّهِ لَا أَذِلُّ لَكِ فَتَسْتَذِلِّينِي،\nوَلَا أَسْلَسُ لَكِ فَتَقُودِينِي.\nاعْزُبِي عَنِّي. عُمْرُكِ قَصِيرٌ، وَخَطَرُكِ يَسِيرٌ، وَأَمَلُكِ حَقِيرٌ.',
    english:
      'Away from me, O world — your reins are upon your own shoulder!\nI have slipped from your claws and escaped your snares.\nWhere are the generations whom you deceived with your trifles?\nWhere are the nations whom you tempted with your ornaments?\nThere they are — hostages of the graves, contents of the tombs.\nBy God, were you a visible person, a body that could be seen,\nI would have inflicted upon you the punishments of God for servants you misled with false hopes.\nAway from me! By God, I will not be humbled before you that you may degrade me,\nnor will I yield to you that you may lead me by the rein.\nBe gone from me. Your life is short, your danger is slight, and your aspiration is contemptible.',
    source: 'Nahj al-Balagha, Saying 77 (the address to the world)',
    brief: {
      en: 'Imam Ali directly addresses the world, refusing to be seduced by its trifles, asking where the generations it deceived have gone.',
      ar: 'خطابُ الإمامِ للدنيا، رافضاً غرورَها، سائلاً عن أممٍ خدعتهم.',
    },
    theme: 'on the world (dunyā), on zuhd, on refusing seduction',
  },
  {
    title: { en: 'The Reality of the World', ar: 'حَقيقَةُ الدُّنْيَا' },
    arabic:
      'أَمَّا بَعْدُ، فَإِنِّي أُحَذِّرُكُمُ الدُّنْيَا، فَإِنَّهَا حُلْوَةٌ خَضِرَةٌ،\nحُفَّتْ بِالشَّهَوَاتِ، وَتَحَبَّبَتْ بِالْعَاجِلَةِ،\nوَرَاقَتْ بِالْقَلِيلِ، وَتَحَلَّتْ بِالْآمَالِ، وَتَزَيَّنَتْ بِالْغُرُورِ.\nلَا تَدُومُ حَبْرَتُهَا، وَلَا تُؤْمَنُ فَجْعَتُهَا.\nغَرَّارَةٌ ضَرَّارَةٌ، حَائِلَةٌ زَائِلَةٌ، نَافِدَةٌ بَائِدَةٌ، أَكَّالَةٌ غَوَّالَةٌ.\nلَمْ يَكُنِ امْرُؤٌ مِنْهَا فِي حَبْرَةٍ، إِلَّا أَعْقَبَتْهُ بَعْدَهَا عَبْرَةً.',
    english:
      'Now then — I warn you of the world, for it is sweet and verdant,\nsurrounded by lusts, endearing itself by what is immediate,\nappearing pleasing through trifles, adorned with false hopes, decked with deception.\nIts delight does not endure, and one is not safe from its sudden blows.\nDeceitful, harmful — fleeting, transient — perishing, ruinous — devouring, destroying.\nNo person was ever in its joy except that it followed for him a tear thereafter.',
    source: 'Nahj al-Balagha, Sermon 111',
    brief: {
      en: 'A warning that the world is sweet and green on the outside but deceitful, fleeting, and ruinous, ending every joy with a tear.',
      ar: 'تحذيرٌ من الدنيا: حلوةٌ ظاهراً، غرّارةٌ زائلةٌ، تُعقبُ كلَّ فرحةٍ عبرةً.',
    },
    theme: 'on the world (dunyā), on zuhd, on the deception of the world',
  },
  {
    title: { en: 'The Patched Shoe', ar: 'النَّعْلُ المَخْصُوفَةُ' },
    arabic:
      'وَاللَّهِ لَهِيَ أَحَبُّ إِلَيَّ مِنْ إِمْرَتِكُمْ،\nإِلَّا أَنْ أُقِيمَ حَقًّا، أَوْ أَدْفَعَ بَاطِلًا.\nوَاللَّهِ لَدُنْيَاكُمْ هَذِهِ أَهْوَنُ فِي عَيْنِي مِنْ عُرَاقِ خِنْزِيرٍ فِي يَدِ مَجْذُومٍ.\nمَا لِعَلِيٍّ وَلِنَعِيمٍ يَفْنَى، وَلَذَّةٍ لَا تَبْقَى!\nأَأَقْنَعُ مِنْ نَفْسِي بِأَنْ يُقَالَ: هَذَا أَمِيرُ الْمُؤْمِنِينَ،\nوَلَا أُشَارِكُهُمْ فِي مَكَارِهِ الدَّهْرِ؟\nأَوْ أَكُونَ أُسْوَةً لَهُمْ فِي جُشُوبَةِ الْعَيْشِ؟\nفَمَا خُلِقْتُ لِيَشْغَلَنِي أَكْلُ الطَّيِّبَاتِ، كَالْبَهِيمَةِ الْمَرْبُوطَةِ هَمُّهَا عَلَفُهَا.',
    english:
      '(Of the patched shoe he was mending, he said:) By God, this is dearer to me than your authority over you,\nunless I establish a truth or repel a falsehood.\nBy God, this world of yours is more contemptible in my eye than the bone of a swine in the hand of a leper.\nWhat has Ali to do with delights that perish and a pleasure that does not remain?\nShall I be content with myself that it be said: "This is the Commander of the Faithful,"\nyet I not share with them in the hardships of the age,\nor be a model for them in the roughness of living?\nI was not created that the eating of fine food should occupy me, like the tethered beast whose concern is its fodder.',
    source: 'Nahj al-Balagha, Sermon 33; cf. Letter 45',
    brief: {
      en: "Imam Ali declares his patched shoe dearer than rulership, and the world more contemptible than swine-bone in a leper's hand.",
      ar: 'نعلُه المخصوفةُ أحبّ إليه من الإمارة، والدنيا أهونُ من عُراقِ خنزيرٍ.',
    },
    theme: "on the world (dunyā), on zuhd, on the Imam's own asceticism",
  },
  {
    title: { en: 'Look at the World with the Renunciant\'s Gaze', ar: 'انْظُرُوا إِلَى الدُّنْيَا' },
    arabic:
      'أَيُّهَا النَّاسُ، انْظُرُوا إِلَى الدُّنْيَا نَظَرَ الزَّاهِدِينَ فِيهَا، الصَّادِفِينَ عَنْهَا،\nفَإِنَّهَا وَاللَّهِ عَمَّا قَلِيلٍ تُزِيلُ الثَّاوِيَ السَّاكِنَ،\nوَتَفْجَعُ الْمُتْرَفَ الْآمِنَ.\nلَا يَرْجِعُ مَا تَوَلَّى مِنْهَا فَأَدْبَرَ،\nوَلَا يُدْرَى مَا هُوَ آتٍ مِنْهَا فَيُنْتَظَرَ.\nسُرُورُهَا مَشُوبٌ بِالْحُزْنِ، وَجَلَدُ الرِّجَالِ فِيهَا إِلَى الضَّعْفِ وَالْوَهْنِ.\nفَلَا يَغُرَّنَّكُمْ كَثْرَةُ مَا يُعْجِبُكُمْ فِيهَا، لِقِلَّةِ مَا يَصْحَبُكُمْ مِنْهَا.\nرَحِمَ اللَّهُ امْرَأً تَفَكَّرَ فَاعْتَبَرَ، وَاعْتَبَرَ فَأَبْصَرَ.\nفَكَأَنَّ مَا هُوَ كَائِنٌ مِنَ الدُّنْيَا عَنْ قَلِيلٍ لَمْ يَكُنْ،\nوَكَأَنَّ مَا هُوَ كَائِنٌ مِنَ الْآخِرَةِ عَمَّا قَلِيلٍ لَمْ يَزَلْ.',
    english:
      "O people, look at the world with the look of the renunciants, those who turn from it.\nFor by God, soon will it remove the dweller who has settled,\nand strike with calamity the affluent who feels secure.\nWhat has turned away from it and gone does not return,\nand what is to come from it is not known so as to be awaited.\nIts joy is mingled with sorrow, and men's vigour in it gives way to weakness and frailty.\nSo let not the abundance of what pleases you in it deceive you, for little of it accompanies you.\nMay God have mercy on a man who reflects and takes heed, takes heed and sees.\nIt is as if what is of the world will soon be as though it never was,\nand what is of the Hereafter will soon be as though it never ceased to be.",
    source: 'Nahj al-Balagha, Sermon 103',
    brief: {
      en: "Look at the world with the renunciant's gaze: it removes settled dwellers and what pleases you accompanies you only a little.",
      ar: 'انظروا إلى الدنيا نظرَ الزاهدين؛ تُزيل الآمنَ، ولا يصحبكم منها إلا قليل.',
    },
    theme: 'on the world (dunyā), on zuhd, on reflection',
  },
  {
    title: { en: 'The World Bids Farewell', ar: 'الدُّنْيَا مُؤْذِنَةٌ بِبَيْنٍ' },
    arabic:
      'أَمَّا بَعْدُ، فَإِنِّي أُحَذِّرُكُمُ الدُّنْيَا، فَإِنَّهَا مَنْزِلُ قُلْعَةٍ، وَلَيْسَتْ بِدَارِ نُجْعَةٍ.\nقَدْ تَزَيَّنَتْ بِغُرُورِهَا، وَغَرَّتْ بِزِينَتِهَا.\nدَارٌ هَانَتْ عَلَى رَبِّهَا، فَخَلَطَ حَلَالَهَا بِحَرَامِهَا، وَخَيْرَهَا بِشَرِّهَا،\nوَحَيَاتَهَا بِمَوْتِهَا، وَحُلْوَهَا بِمُرِّهَا.\nلَمْ يُصْفِهَا اللَّهُ تَعَالَى لِأَوْلِيَائِهِ، وَلَمْ يَضِنَّ بِهَا عَلَى أَعْدَائِهِ.\nخَيْرُهَا زَهِيدٌ، وَشَرُّهَا عَتِيدٌ، وَجَمْعُهَا يَنْفَدُ، وَمُلْكُهَا يُسْلَبُ، وَعَامِرُهَا يَخْرَبُ.\nأَلَا وَإِنَّ الدُّنْيَا قَدْ تَصَرَّمَتْ، وَآذَنَتْ بِانْقِضَاءٍ.\nفَهِيَ تَحْفِزُ بِالْفَنَاءِ سُكَّانَهَا، وَتَحْدُو بِالْمَوْتِ جِيرَانَهَا.',
    english:
      "Now then — I warn you of the world, for it is a station of departure, not a house of dwelling.\nIt has adorned itself with its deception and beguiled by its ornament.\nA house lowly in the eyes of its Lord — He mingled its lawful with its forbidden, its good with its evil,\nits life with its death, its sweetness with its bitterness.\nGod Most High did not purify it for His friends, nor did He withhold it from His enemies.\nIts good is scant, its evil is ready at hand, its gathering runs out, its dominion is stripped away, its flourishing falls to ruin.\nBehold — the world has cut its ties and announced its passing.\nIt drives its inhabitants toward annihilation and urges its neighbours toward death.",
    source: 'Nahj al-Balagha, Sermon 113',
    brief: {
      en: 'The world is a way-station of departure, not a dwelling. God did not purify it for His friends — it now bids farewell, driving its people to death.',
      ar: 'الدنيا منزلُ قُلعةٍ لا دارُ إقامةٍ؛ آذنت بانقضاءٍ، وتسوقُ سكّانَها إلى الفناء.',
    },
    theme: 'on the world (dunyā), on zuhd, on departure',
  },
  {
    title: { en: 'His Way Was Moderation', ar: 'سِيرَتُهُ الْقَصْدُ' },
    arabic:
      'سِيرَتُهُ الْقَصْدُ، وَسُنَّتُهُ الرُّشْدُ، وَكَلَامُهُ الْفَصْلُ، وَحُكْمُهُ الْعَدْلُ.\nأَرْسَلَهُ عَلَى حِينِ فَتْرَةٍ مِنَ الرُّسُلِ، وَطُولِ هَجْعَةٍ مِنَ الْأُمَمِ.\nفَجَاءَهُمْ بِتَصْدِيقِ الَّذِي بَيْنَ يَدَيْهِ، وَالنُّورِ الْمُقْتَدَى بِهِ — ذَلِكَ الْقُرْآنُ.\nفَاسْتَنْطِقُوهُ، وَلَنْ يَنْطِقَ، وَلَكِنْ أُخْبِرُكُمْ عَنْهُ:\nأَلَا إِنَّ فِيهِ عِلْمَ مَا يَأْتِي، وَالْحَدِيثَ عَنِ الْمَاضِي، وَدَوَاءَ دَائِكُمْ، وَنَظْمَ مَا بَيْنَكُمْ.\nثُمَّ اخْتَارَ سُبْحَانَهُ لِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ لِقَاءَهُ، وَرَضِيَ لَهُ مَا عِنْدَهُ.\nوَأَكْرَمَهُ عَنْ دَارِ الدُّنْيَا، وَرَغِبَ بِهِ عَنْ مَقَارَنَةِ الْبَلْوَى، فَقَبَضَهُ إِلَيْهِ كَرِيمًا.\nوَخَلَّفَ فِيكُمْ مَا خَلَّفَتِ الْأَنْبِيَاءُ فِي أُمَمِهَا، إِذْ لَمْ يَتْرُكُوهُمْ هَمَلًا، بِغَيْرِ طَرِيقٍ وَاضِحٍ، وَلَا عَلَمٍ قَائِمٍ.',
    english:
      "His way was moderation, his practice was right guidance, his speech was the decisive criterion, and his judgment was justice.\nGod sent him after an interval since the previous messengers, after a long slumber of the nations.\nHe came to them confirming what was before him, with the Light to be followed — that is the Qur'an.\nSo make it speak, though it will never speak; but I shall tell you about it:\nIn it is the knowledge of what is to come, the report of what has passed, the cure for your disease, and the order of what is between you.\nThen God, glorified is He, chose for Muhammad — God's blessings upon him and his family — to meet Him, and was pleased with what He had for him.\nHe honoured him above the abode of this world, and preferred for him to be far from being yoked to affliction, and took him to Himself in nobility.\nAnd he left among you what the prophets left in their nations: for they did not leave them neglected, without a clear path or a standing landmark.",
    source: 'Nahj al-Balagha, Sermon 158',
    brief: {
      en: "Imam Ali describes the Prophet's measured life, his mission after a long slumber of nations, his being taken by God in nobility, and the inheritance he left behind.",
      ar: 'وصفُ الإمامِ لسيرةِ النبيِّ ومبعثِه بعد فترةٍ من الرسلِ، ووفاتِه كريماً، وما خلَّفه في أمَّتِه.',
    },
    theme: "on the Prophet's life and mission, on the Prophet",
  },
  {
    title: { en: 'He Sent Him When Tongues Were in Dispute', ar: 'أَرْسَلَهُ وَالنَّاسُ ضُلَّالٌ' },
    arabic:
      'أَرْسَلَهُ عَلَى حِينِ فَتْرَةٍ مِنَ الرُّسُلِ، وَتَنَازُعٍ مِنَ الْأَلْسُنِ.\nفَقَفَّى بِهِ الرُّسُلَ، وَخَتَمَ بِهِ الْوَحْيَ.\nفَجَاهَدَ فِي اللَّهِ الْمُدْبِرِينَ عَنْهُ، وَالْعَادِلِينَ بِهِ.\nوَإِنَّمَا الدُّنْيَا مُنْتَهَى بَصَرِ الْأَعْمَى، لَا يُبْصِرُ مِمَّا وَرَاءَهَا شَيْئًا.\nوَالْبَصِيرُ يَنْفُذُهَا بَصَرُهُ، وَيَعْلَمُ أَنَّ الدَّارَ وَرَاءَهَا.\nفَالْبَصِيرُ مِنْهَا شَاخِصٌ، وَالْأَعْمَى إِلَيْهَا شَاخِصٌ.\nوَإِنَّمَا الْحِكْمَةُ كَالْحَيَاةِ لِلْقَلْبِ الْمَيِّتِ، وَبَصَرٌ لِلْعَيْنِ الْعَمْيَاءِ، وَسَمْعٌ لِلْأُذُنِ الصَّمَّاءِ.\nوَفِيهَا الْغِنَى كُلُّهُ وَالسَّلَامَةُ.',
    english:
      'He sent him at a time when the messengers had been long absent, when tongues were in dispute.\nSo He sealed the line of messengers with him and ended revelation through him,\nand he strove for God against those who turned from Him and those who set up rivals to Him.\nThis world is the farthest reach of the blind man\'s sight: he sees nothing beyond it.\nThe seeing one pierces it with his vision and knows that the true Abode lies beyond it.\nThe seeing one departs from it; the blind man heads for it.\nWisdom is to the dead heart what life is to it, what sight is to the blind eye, what hearing is to the deaf ear —\nand in it lies all sufficiency and safety.',
    source: 'Nahj al-Balagha, Sermon 133',
    brief: {
      en: 'The Prophet was sent after a long interval and divided tongues; he sealed prophecy and strove against deniers, while the world remains the horizon of the blind.',
      ar: 'أُرسِلَ النبيُّ بعد فترةٍ من الرسلِ، فختمَ به الوحي، وجاهدَ المُعرضين.',
    },
    theme: "on the Prophet's coming, on the state of the world before him",
  },
  {
    title: { en: 'He Used to Eat on the Ground', ar: 'كَانَ يَأْكُلُ عَلَى الْأَرْضِ' },
    arabic:
      'وَلَقَدْ كَانَ صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ يَأْكُلُ عَلَى الْأَرْضِ،\nوَيَجْلِسُ جِلْسَةَ الْعَبْدِ، وَيَخْصِفُ بِيَدِهِ نَعْلَهُ،\nوَيَرْقَعُ بِيَدِهِ ثَوْبَهُ، وَيَرْكَبُ الْحِمَارَ الْعَارِيَ، وَيُرْدِفُ خَلْفَهُ.\nوَيَكُونُ السِّتْرُ عَلَى بَابِ بَيْتِهِ فَتَكُونُ فِيهِ التَّصَاوِيرُ،\nفَيَقُولُ: يَا فُلَانَةُ — لِإِحْدَى أَزْوَاجِهِ — غَيِّبِيهِ عَنِّي،\nفَإِنِّي إِذَا نَظَرْتُ إِلَيْهِ ذَكَرْتُ الدُّنْيَا وَزَخَارِفَهَا.\nفَأَعْرَضَ عَنِ الدُّنْيَا بِقَلْبِهِ، وَأَمَاتَ ذِكْرَهَا مِنْ نَفْسِهِ،\nوَأَحَبَّ أَنْ تَغِيبَ زِينَتُهَا عَنْ عَيْنِهِ،\nلِكَيْلَا يَتَّخِذَ مِنْهَا رِيَاشًا، وَلَا يَعْتَقِدَهَا قَرَارًا، وَلَا يَرْجُوَ فِيهَا مُقَامًا.',
    english:
      "He — God's blessings upon him and his family — used to eat on the ground,\nsit like a servant, mend his sandal with his own hand,\npatch his garment with his own hand, ride the unsaddled donkey and let another ride behind him.\nA curtain on the door of his house once had figures upon it, and he said,\n'O so-and-so' — to one of his wives — 'remove it from my sight,\nfor when I look at it I am reminded of the world and its ornaments.'\nThus he turned from the world with his heart and put its remembrance to death within himself.\nHe loved that its adornment should vanish from his eye,\nso that he would not take finery from it, nor regard it as a fixed abode, nor hope to dwell in it.",
    source: 'Nahj al-Balagha, Sermon 160',
    brief: {
      en: "Imam Ali pictures the Prophet's daily life — eating on the ground, mending his sandal, patching his garment — and his radical detachment from the world.",
      ar: 'صورةُ النبيِّ في يومياتِه — يأكلُ على الأرض، يخصِفُ نعلَه، يرقعُ ثوبَه.',
    },
    theme: "on the Prophet's conduct, on the Prophet's asceticism",
  },
  {
    title: { en: 'Take the Prophet as Your Pattern', ar: 'تَأَسَّ بِنَبِيِّكَ' },
    arabic:
      'وَلَقَدْ كَانَ فِي رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ كَافٍ لَكَ فِي الْأُسْوَةِ،\nوَدَلِيلٌ لَكَ عَلَى ذَمِّ الدُّنْيَا وَعَيْبِهَا، وَكَثْرَةِ مَخَازِيهَا وَمَسَاوِيهَا.\nإِذْ قُبِضَتْ عَنْهُ أَطْرَافُهَا، وَوُطِّئَتْ لِغَيْرِهِ أَكْنَافُهَا، وَفُطِمَ عَنْ رَضَاعِهَا، وَزُوِيَ عَنْ زَخَارِفِهَا.\nفَتَأَسَّ بِنَبِيِّكَ الْأَطْيَبِ الْأَطْهَرِ صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ،\nفَإِنَّ فِيهِ أُسْوَةً لِمَنْ تَأَسَّى، وَعَزَاءً لِمَنْ تَعَزَّى.\nوَأَحَبُّ الْعِبَادِ إِلَى اللَّهِ الْمُتَأَسِّي بِنَبِيِّهِ، وَالْمُقْتَصُّ لِأَثَرِهِ.\nقَضَمَ الدُّنْيَا قَضْمًا، وَلَمْ يُعِرْهَا طَرْفًا.\nأَهْضَمُ أَهْلِ الدُّنْيَا كَشْحًا، وَأَخْمَصُهُمْ مِنَ الدُّنْيَا بَطْنًا.\nعُرِضَتْ عَلَيْهِ الدُّنْيَا فَأَبَى أَنْ يَقْبَلَهَا.',
    english:
      "In the Messenger of God — God's blessings upon him and his family — there was enough for you as a pattern,\nand a proof against this world: its blame, its defects, its many disgraces and evils.\nIts sides were withdrawn from him while its expanses were spread out for others; he was weaned from its suckling and removed from its ornaments.\nSo take as your pattern your Prophet, the most pure, the most pleasing — God's blessings upon him and his family —\nfor in him is a pattern for whoever would pattern themselves, and a consolation for whoever would seek consolation.\nThe most beloved of servants to God is the one who patterns themselves after His Prophet and follows his footsteps.\nHe merely nibbled the world and never gave it a glance —\nthe leanest of the people of the world in waist, the emptiest of them in belly.\nThe world was offered to him and he refused to accept it.",
    source: 'Nahj al-Balagha, Sermon 160',
    brief: {
      en: "Imam Ali insists the Prophet's life is the sufficient pattern: he was withdrawn from the world's ornaments and nibbled at it without ever giving it a glance.",
      ar: 'يؤكِّدُ الإمامُ أنَّ في رسولِ اللهِ كفايةً في الأُسوة، فقد زُوِيتْ عنه زخارفُ الدنيا فقضَمها قضماً.',
    },
    theme: "on the Prophet as exemplar, on the Prophet's asceticism",
  },
  {
    title: { en: 'We Are the Tree of Prophethood', ar: 'نَحْنُ شَجَرَةُ النُّبُوَّةِ' },
    arabic:
      'نَحْنُ شَجَرَةُ النُّبُوَّةِ، وَمَحَطُّ الرِّسَالَةِ،\nوَمُخْتَلَفُ الْمَلَائِكَةِ، وَمَعَادِنُ الْعِلْمِ، وَيَنَابِيعُ الْحُكْمِ.\nنَاصِرُنَا وَمُحِبُّنَا يَنْتَظِرُ الرَّحْمَةَ، وَعَدُوُّنَا وَمُبْغِضُنَا يَنْتَظِرُ السَّطْوَةَ.\nوَلَقَدْ رَأَيْتُ أَصْحَابَ مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ، فَمَا أَرَى أَحَدًا يُشْبِهُهُمْ مِنْكُمْ.\nلَقَدْ كَانُوا يُصْبِحُونَ شُعْثًا غُبْرًا، وَقَدْ بَاتُوا سُجَّدًا وَقِيَامًا،\nيُرَاوِحُونَ بَيْنَ جِبَاهِهِمْ وَخُدُودِهِمْ، وَيَقِفُونَ عَلَى مِثْلِ الْجَمْرِ مِنْ ذِكْرِ مَعَادِهِمْ.\nكَأَنَّ بَيْنَ أَعْيُنِهِمْ رُكَبَ الْمِعْزَى مِنْ طُولِ سُجُودِهِمْ.\nإِذَا ذُكِرَ اللَّهُ هَمَلَتْ أَعْيُنُهُمْ حَتَّى تَبُلَّ جُيُوبَهُمْ،\nوَمَادُوا كَمَا يَمِيدُ الشَّجَرُ يَوْمَ الرِّيحِ الْعَاصِفِ،\nخَوْفًا مِنَ الْعِقَابِ وَرَجَاءً لِلثَّوَابِ.',
    english:
      "We are the Tree of Prophethood, the resting-place of the Message,\nthe place visited by the angels, the mines of knowledge, the springs of wisdom.\nThe one who aids us and loves us awaits mercy; the one who is our enemy and hates us awaits chastisement.\nI have seen the companions of Muhammad — God's blessings upon him and his family — and I see no one among you who resembles them.\nThey would rise in the morning dust-stained and rough, having passed the night in prostration and standing,\nalternating between their foreheads and their cheeks, standing as if upon embers at the remembrance of their return.\nBetween their eyes were calluses like the knees of goats from the length of their prostrations.\nWhen God was mentioned, their eyes would flow until their collars were soaked,\nand they would sway as trees sway on the day of a roaring wind — out of fear of punishment and hope for reward.",
    source: 'Nahj al-Balagha, Sermon 96',
    brief: {
      en: "Imam Ali names the household of the Prophet — Tree of Prophethood, mines of knowledge — and remembers the Prophet's companions whose nights were spent in worship.",
      ar: 'يُسمّي الإمامُ أهلَ بيتِ النبوة شجرةَ النبوة، ويتذكّرُ أصحابَ النبيِّ وقيامَهم بالليل.',
    },
    theme: "on Ahl al-Bayt, on the Prophet's companions",
  },
  {
    title: { en: 'They Are the Place of His Secret', ar: 'هُمْ مَوْضِعُ سِرِّهِ' },
    arabic:
      'هُمْ مَوْضِعُ سِرِّهِ، وَلَجَأُ أَمْرِهِ، وَعَيْبَةُ عِلْمِهِ، وَمَوْئِلُ حُكْمِهِ، وَكُهُوفُ كُتُبِهِ، وَجِبَالُ دِينِهِ.\nبِهِمْ أَقَامَ انْحِنَاءَ ظَهْرِهِ، وَأَذْهَبَ ارْتِعَادَ فَرَائِصِهِ.\nلَا يُقَاسُ بِآلِ مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَآلِهِ مِنْ هَذِهِ الْأُمَّةِ أَحَدٌ،\nوَلَا يُسَوَّى بِهِمْ مَنْ جَرَتْ نِعْمَتُهُمْ عَلَيْهِ أَبَدًا.\nهُمْ أَسَاسُ الدِّينِ، وَعِمَادُ الْيَقِينِ.\nإِلَيْهِمْ يَفِيءُ الْغَالِي، وَبِهِمْ يُلْحَقُ التَّالِي.\nوَلَهُمْ خَصَائِصُ حَقِّ الْوِلَايَةِ، وَفِيهِمُ الْوَصِيَّةُ وَالْوِرَاثَةُ.',
    english:
      "They are the place of his secret, the refuge of his affair, the vessel of his knowledge,\nthe resort of his judgment, the caves of his books, and the mountains of his religion.\nThrough them he straightened the bending of his back and stilled the trembling of his sides.\nNo one of this Umma is to be compared with the family of Muhammad — God's blessings upon him and his family —\nnor is one upon whom their bounty has flowed ever to be set equal with them.\nThey are the foundation of the religion and the pillar of certainty.\nTo them the one who has gone too far must return, and the one who has fallen behind must catch up.\nTo them belong the special rights of guardianship; in them are the testament and the inheritance.",
    source: 'Nahj al-Balagha, Sermon 2',
    brief: {
      en: 'Imam Ali describes the family of the Prophet as the trustees of his secret, the foundation of religion, the place to which the wayward return.',
      ar: 'يصفُ الإمامُ آلَ محمدٍ بأنهم موضعُ سرِّ النبيِّ وأساسُ الدين، إليهم يفيءُ الغالي وبهم يلحقُ التالي.',
    },
    theme: "on Ahl al-Bayt, on the Prophet's family",
  },
  {
    title: { en: 'He Revived His Intellect and Put His Self to Death', ar: 'قَدْ أَحْيَا عَقْلَهُ وَأَمَاتَ نَفْسَهُ' },
    arabic:
      'قَدْ أَحْيَا عَقْلَهُ، وَأَمَاتَ نَفْسَهُ،\nحَتَّى دَقَّ جَلِيلُهُ، وَلَطُفَ غَلِيظُهُ.\nوَبَرَقَ لَهُ لَامِعٌ كَثِيرُ الْبَرْقِ،\nفَأَبَانَ لَهُ الطَّرِيقَ، وَسَلَكَ بِهِ السَّبِيلَ.\nوَتَدَافَعَتْهُ الْأَبْوَابُ إِلَى بَابِ السَّلَامَةِ، وَدَارِ الْإِقَامَةِ.\nوَثَبَتَتْ رِجْلَاهُ بِطُمَأْنِينَةِ بَدَنِهِ فِي قَرَارِ الْأَمْنِ وَالرَّاحَةِ،\nبِمَا اسْتَعْمَلَ قَلْبَهُ، وَأَرْضَى رَبَّهُ.',
    english:
      'He has revived his intellect and put his lower self to death,\nuntil what was coarse in him became fine, and what was rough became delicate.\nA flash of light, abundant in its flashing, broke before him —\nit made the road plain, and he walked the path.\nGate after gate pressed him onward to the gate of safety, to the abode of permanence.\nHis feet stood firm, his body at rest, in the lodging of security and ease,\nbecause he set his heart to work, and pleased his Lord.',
    source: 'Nahj al-Balagha, Sermon 220 (Subhi al-Salih) — on the wayfarer to God',
    brief: {
      en: 'A portrait of the inner human: revived intellect, mortified ego, and a sudden lightning that shows the road. One of the most cited passages on the inner life across the tradition.',
      ar: 'صورة الإنسان الباطن: عقلٌ حيٌّ، ونفسٌ ممَاتَةٌ، وبرقٌ يبين الطريق.',
    },
    theme: 'on the soul (nafs), on the inner work, on character',
  },
  {
    title: { en: 'On the Heedless — Cattle at a Poisoned Watering-Place', ar: 'في الغافلين' },
    arabic:
      'أَيُّهَا النَّاسُ، غَيْرُ الْمَغْفُولِ عَنْهُمْ، وَالتَّارِكُونَ الْمَأْخُوذُ مِنْهُمْ،\nمَا لِي أَرَاكُمْ عَنِ اللَّهِ ذَاهِبِينَ، وَإِلَى غَيْرِهِ رَاغِبِينَ؟\nكَأَنَّكُمْ نَعَمٌ أَرَاحَ بِهَا سَائِمٌ إِلَى مَرْعًى وَبِيٍّ، وَمَشْرَبٍ دَوِيٍّ.\nوَإِنَّمَا هِيَ كَالْمَعْلُوفَةِ لِلْمُدَى،\nلَا تَعْرِفُ مَاذَا يُرَادُ بِهَا.\nإِذَا أُحْسِنَ إِلَيْهَا تَظُنُّ يَوْمَهَا دَهْرَهَا، وَشِبَعَهَا أَمْرَهَا.',
    english:
      'O people, you who are not unwatched —\nyou who, while leaving things behind, are themselves being taken hold of —\nwhy do I see you going away from God, desiring what is other than Him?\nIt is as if you were cattle a herdsman has driven\nto a polluted pasture and a sickening watering-place.\nYou are like beasts being fattened for the knife,\nnot knowing what is wanted of you.\nWhen you are treated well, you take your day for the whole age, and your fill for the whole matter.',
    source: 'Nahj al-Balagha, Sermon 175',
    brief: {
      en: 'A piercing rebuke: the pursuit of the world likened to cattle led to a poisoned spring, fattened all the while for slaughter — mistaking a day of plenty for the whole of fate.',
      ar: 'توبيخٌ نافذ: شُبّه السامعون بالأنعام تُساق إلى مرعىً وبيء، تظنّ يومَ الشبَع كلَّ أمرها.',
    },
    theme: 'on the soul (nafs), on heedlessness, on inner awakening',
  },
  {
    title: { en: 'The Qur\'an — Counsellor Who Does Not Cheat', ar: 'القُرْآنُ النَّاصِحُ' },
    arabic:
      'وَاعْلَمُوا أَنَّ هَذَا الْقُرْآنَ هُوَ النَّاصِحُ الَّذِي لَا يَغُشُّ،\nوَالْهَادِي الَّذِي لَا يُضِلُّ، وَالْمُحَدِّثُ الَّذِي لَا يَكْذِبُ.\nوَمَا جَالَسَ هَذَا الْقُرْآنَ أَحَدٌ إِلَّا قَامَ عَنْهُ بِزِيَادَةٍ أَوْ نُقْصَانٍ:\nزِيَادَةٍ فِي هُدًى، أَوْ نُقْصَانٍ مِنْ عَمًى.\nوَاعْلَمُوا أَنَّهُ لَيْسَ عَلَى أَحَدٍ بَعْدَ الْقُرْآنِ مِنْ فَاقَةٍ،\nوَلَا لِأَحَدٍ قَبْلَ الْقُرْآنِ مِنْ غِنًى.\nفَاسْتَشْفُوهُ مِنْ أَدْوَائِكُمْ، وَاسْتَعِينُوا بِهِ عَلَى لَأْوَائِكُمْ،\nفَإِنَّ فِيهِ شِفَاءً مِنْ أَكْبَرِ الدَّاءِ:\nالْكُفْرِ وَالنِّفَاقِ، وَالْغَيِّ وَالضَّلَالِ.',
    english:
      "Know that this Qur'an is the counsellor who does not cheat,\nthe guide who does not mislead, the teller who does not lie.\nNo one sits with this Qur'an except that he rises with an increase or a loss —\nan increase in guidance, or a loss of some blindness.\nKnow that no one has want once he has the Qur'an,\nand no one had wealth before it.\nSeek cure from it for your ailments, and aid against your hardships,\nfor in it is a cure for the greatest disease:\ndisbelief and hypocrisy, error and going astray.",
    source: "Nahj al-Balagha, Sermon 176 — the passage on the Qur'an",
    brief: {
      en: "From Sermon 176: the Qur'an as an honest counsellor and physician — no one who sits with it leaves unchanged.",
      ar: 'من الخطبة ١٧٦: القرآن ناصحٌ لا يغشّ، وطبيبٌ يبلغ دواؤه أعمق الأمراض.',
    },
    theme: "on the Qur'an, on what heals the soul, on the inner life",
  },
  {
    title: { en: 'From al-Qāṣiʿa — The Lesson of Iblīs', ar: 'مِنَ القَاصِعَةِ — عِبْرَةُ إِبْلِيسَ' },
    arabic:
      'فَاعْتَبِرُوا بِمَا كَانَ مِنْ فِعْلِ اللَّهِ بِإِبْلِيسَ\nإِذْ أَحْبَطَ عَمَلَهُ الطَّوِيلَ وَجَهْدَهُ الْجَهِيدَ.\nوَكَانَ قَدْ عَبَدَ اللَّهَ سِتَّةَ آلَافِ سَنَةٍ —\nلَا يُدْرَى أَمِنْ سِنِي الدُّنْيَا أَمْ مِنْ سِنِي الْآخِرَةِ —\nعَنْ كِبْرِ سَاعَةٍ وَاحِدَةٍ.\nفَمَنْ ذَا بَعْدَ إِبْلِيسَ يَسْلَمُ عَلَى اللَّهِ بِمِثْلِ مَعْصِيَتِهِ؟\nكَلَّا — مَا كَانَ اللَّهُ سُبْحَانَهُ لِيُدْخِلَ الْجَنَّةَ بَشَرًا بِأَمْرٍ\nأَخْرَجَ بِهِ مِنْهَا مَلَكًا.\nإِنَّ حُكْمَهُ فِي أَهْلِ السَّمَاءِ وَأَهْلِ الْأَرْضِ لَوَاحِدٌ،\nوَمَا بَيْنَ اللَّهِ وَبَيْنَ أَحَدٍ مِنْ خَلْقِهِ هَوَادَةٌ\nفِي إِبَاحَةِ حِمًى حَرَّمَهُ عَلَى الْعَالَمِينَ.',
    english:
      'Take a lesson from what God did with Iblīs: He nullified his long deeds and his exhausting striving —\nfor he had worshipped God six thousand years (none knowing whether of the years of this world or of the Hereafter) —\nover the pride of a single moment.\nWho, then, after Iblīs, can remain safe with God after such a sin?\nNever — God will not admit a human into the Garden by the very thing for which He expelled an angel from it.\nHis ruling upon the people of heaven and the people of earth is one;\nthere is no leniency between God and any of His creatures in permitting a sanctuary He has forbidden to all the worlds.',
    source: 'Nahj al-Balagha, Sermon 192 (al-Qāṣiʿa)',
    brief: {
      en: "Iblīs lost millennia of worship to one moment of pride — God's law is one for angels and men.",
      ar: 'أحبطَ إبليسُ آلافَ السنينَ بكبرِ ساعةٍ، وحكمُ اللهِ واحدٌ في خلقِه.',
    },
    theme: 'on pride and its ruin, on the danger of arrogance',
  },
  {
    title: { en: 'The Lament for the Companions', ar: 'الحَنينُ إِلى الأَصْحابِ' },
    arabic:
      'أَيْنَ إِخْوَانِيَ الَّذِينَ رَكِبُوا الطَّرِيقَ وَمَضَوْا عَلَى الْحَقِّ؟\nأَيْنَ عَمَّارٌ؟ وَأَيْنَ ابْنُ التَّيِّهَانِ؟\nوَأَيْنَ ذُو الشَّهَادَتَيْنِ؟\nوَأَيْنَ نُظَرَاؤُهُمْ مِنْ إِخْوَانِهِمُ الَّذِينَ تَعَاقَدُوا عَلَى الْمَنِيَّةِ،\nوَأُبْرِدَ بِرُؤُوسِهِمْ إِلَى الْفَجَرَةِ؟\nثُمَّ ضَرَبَ بِيَدِهِ عَلَى لِحْيَتِهِ الشَّرِيفَةِ الْكَرِيمَةِ، فَأَطَالَ الْبُكَاءَ، ثُمَّ قَالَ:\nأَوِّهِ عَلَى إِخْوَانِيَ الَّذِينَ تَلَوُا الْقُرْآنَ فَأَحْكَمُوهُ،\nوَتَدَبَّرُوا الْفَرْضَ فَأَقَامُوهُ.\nأَحْيَوُا السُّنَّةَ وَأَمَاتُوا الْبِدْعَةَ.\nدُعُوا لِلْجِهَادِ فَأَجَابُوا، وَوَثِقُوا بِالْقَائِدِ فَاتَّبَعُوهُ.',
    english:
      'Where are my brothers who rode the road and travelled upon the truth?\nWhere is ʿAmmār? Where is Ibn al-Tayyihān?\nWhere is Dhū al-Shahādatayn?\nWhere are their like among their brethren who pledged themselves to death,\nwhose heads were sent off to the wicked?\nThen he struck his hand upon his noble, honoured beard and wept long, and said:\nAlas for my brothers who recited the Qurʾān and mastered it,\nwho pondered the obligation and upheld it.\nThey revived the Sunna and slew the innovation.\nThey were called to striving and answered; they trusted the leader and followed him.',
    source: 'Nahj al-Balagha, Sermon 182 (the lament for the companions)',
    brief: {
      en: "Imam Ali weeps for his fallen companions who lived the Qur'an, revived the Sunna, and answered the call.",
      ar: 'يبكي الإمامُ أصحابَه الذين أحكموا القرآن وأحيوا السنة ولبّوا الجهاد.',
    },
    theme: "on the loss of companions, on the Imam's grief, on longing for the righteous",
  },
  {
    title: { en: 'To Whom Should I Lie?', ar: 'فَعَلَى مَنْ أَكْذِبُ؟' },
    arabic:
      'أَمَّا بَعْدُ، يَا أَهْلَ الْعِرَاقِ،\nفَإِنَّمَا أَنْتُمْ كَالْمَرْأَةِ الْحَامِلِ،\nحَمَلَتْ فَلَمَّا أَتَمَّتْ أَمْلَصَتْ،\nوَمَاتَ قَيِّمُهَا، وَطَالَ تَأَيُّمُهَا، وَوَرِثَهَا أَبْعَدُهَا.\nأَمَا وَاللَّهِ مَا أَتَيْتُكُمُ اخْتِيَارًا، وَلَكِنْ جِئْتُ إِلَيْكُمْ سَوْقًا.\nوَلَقَدْ بَلَغَنِي أَنَّكُمْ تَقُولُونَ: عَلِيٌّ يَكْذِبُ.\nقَاتَلَكُمُ اللَّهُ تَعَالَى، فَعَلَى مَنْ أَكْذِبُ؟\nأَعَلَى اللَّهِ؟ فَأَنَا أَوَّلُ مَنْ آمَنَ بِهِ.\nأَمْ عَلَى نَبِيِّهِ؟ فَأَنَا أَوَّلُ مَنْ صَدَّقَهُ.\nكَلَّا وَاللَّهِ — لَكِنَّهَا لَهْجَةٌ غِبْتُمْ عَنْهَا، وَلَمْ تَكُونُوا مِنْ أَهْلِهَا.',
    english:
      "Now then, O people of Iraq —\nyou are like the pregnant woman who, on completing her term, miscarries her child,\nand her guardian dies, her widowhood is prolonged, and her distant relatives inherit her.\nBy God, I did not come to you by my own choice — I was driven to you.\nIt has reached me that you say, 'Ali tells lies.'\nMay God reckon with you — against whom would I lie?\nAgainst God? I am the first to have believed in Him.\nAgainst His Prophet? I am the first to have affirmed him.\nNo, by God — it is rather an eloquence you were absent from, and were not among its people.",
    source: 'Nahj al-Balagha, Sermon 71',
    brief: {
      en: "Imam Ali's piercing rebuke to the fickle people of Iraq who accused him of lying — his answer: against whom would I lie?",
      ar: 'توبيخ الإمام النافذ لأهل العراق الذين اتّهموه بالكذب — وجوابه: على من أكذب؟',
    },
    theme: 'on integrity under accusation, on the loneliness of the truthful',
  },
]

// ── Diwan poetry — verses traditionally attributed to Imam Ali ──────
// Note: attribution of the Diwan is traditional rather than uniformly
// scholarly-certified. We cite as "from the Diwan attributed to Imam
// Ali (عليه السلام)" — honest about the tradition.
export const BASELINE_POETRY: BaselineEntry[] = [
  {
    arabic:
      'إِذَا مَا خَلَوْتَ الدَّهْرَ يَوْمًا فَلَا تَقُلْ\nخَلَوْتُ، وَلَكِنْ قُلْ عَلَيَّ رَقِيبُ',
    english:
      "When you find yourself alone one day, do not say 'I am alone' — say 'One watches me.'",
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on solitude, on God-consciousness, on integrity in private',
  },
  {
    arabic:
      'لَنَا فِي كُلِّ نَائِبَةٍ صَبْرٌ\nوَفِي ثَوَابِ صَبْرِنَا الفَرَجُ',
    english:
      'In every affliction we have patience — and in the reward of our patience, relief.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on hardship, on patience, on hope',
  },
  {
    arabic:
      'وَدَوَاؤُكَ فِيكَ وَمَا تَشْعُرُ\nوَدَاؤُكَ مِنْكَ وَمَا تُبْصِرُ\nأَتَزْعُمُ أَنَّكَ جِرْمٌ صَغِيرٌ\nوَفِيكَ انْطَوَى العَالَمُ الأَكْبَرُ',
    english:
      "Your cure is within you, and you do not know — your sickness is from you, and you do not see. Do you imagine you are a small body, when within you the greater world is folded?",
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on self-knowledge, on the human condition, on the inner journey',
  },
  {
    arabic:
      'النَّاسُ مِنْ جِهَةِ التِّمْثَالِ أَكْفَاءُ\nأَبُوهُمُ آدَمٌ وَالأُمُّ حَوَّاءُ',
    english:
      'People in their fashioning are equals — their father is Adam, their mother Eve.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on dignity, on equality, on human kinship',
  },
  {
    arabic:
      'لَا تَبْذُلِ الوُدَّ لِمَنْ لَا يَسْتَحِقُّهُ\nلَيْسَ التَّوَدُّدُ مِنْ شِيَمِ الْكِرَامْ',
    english:
      "Do not give your love to one who does not deserve it — affection ill-placed is not the way of the noble.",
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on what relationships are worth, on dignity, on choosing',
  },
  {
    arabic:
      'إِذَا ضَاقَ صَدْرُ الْمَرْءِ لَمْ يَصْفُ عَيْشُهُ\nوَأَوْشَكَ أَنْ يَلْقَى مِنَ الْأَمْرِ مَا كَرِهَا',
    english:
      "When a person's chest is constricted, their life is not clear — and they will soon meet what they would have hated to meet.",
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on the heart, on suffering, on inner expansion',
  },
  {
    arabic:
      'تَوَكَّلْتُ فِي رِزْقِي عَلَى اللَّهِ خَالِقِي\nوَأَيْقَنْتُ أَنَّ اللَّهَ لَا شَكَّ رَازِقِي',
    english:
      'I have entrusted my provision to God my Creator — and I am certain that God, without doubt, will provide.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on trust, on provision, on worry about livelihood',
  },
  {
    arabic:
      'وَمَنْ يَفْتَقِرْ مِنْكُمْ فَلَيْسَ بِخَامِلٍ\nوَمَنْ يَكُ ذَا مَالٍ فَلَيْسَ بِسَيِّدِ',
    english:
      'Whoever among you is poor is not for that humble; whoever has wealth is not for that a master.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on dignity, on wealth and poverty, on real status',
  },
  {
    arabic:
      'لِسَانُ الْفَتَى نِصْفٌ، وَنِصْفٌ فُؤَادُهُ\nفَلَمْ يَبْقَ إِلَّا صُورَةُ اللَّحْمِ وَالدَّمِ',
    english:
      "The young man's tongue is half of him, and his heart the other half — what remains is only the shape of flesh and blood.",
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on what makes a person, on speech, on the heart',
  },
  {
    arabic:
      'إِذَا الْحَلْمُ لَمْ يَغْلِبْ لَكَ الْجَهْلَ لَمْ يَكُنْ\nلِعِرْضِكَ وَاقٍ مِنْ أَذَى يَوْمِ مَفْخَرِ',
    english:
      'If your forbearance does not overcome ignorance directed at you, your honour has no shield on the day of boasting.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on patience, on dignity in the face of insult',
  },
  {
    arabic:
      'فَلَا تَحْسَبَنَّ الْعِلْمَ يَنْفَعُ وَحْدَهُ\nمَا لَمْ يُتَوَّجْ رَبُّهُ بِخَلَاقِ',
    english:
      "Do not think knowledge alone is of benefit — until its owner is crowned with character.",
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on knowledge and character, on what completes learning',
  },
  {
    arabic:
      'وَإِذَا الصَّدِيقُ أَتَى يَزُورُكَ مَرَّةً\nفَأَتَتْكَ مِنْهُ كَرَامَةٌ مَنْ غَيْرِ سُؤَالْ',
    english:
      'When a friend comes to visit you once, a courtesy has come from him without your asking.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on friendship, on what is given freely',
  },
  // ── v46.1 corpus expansion · Diwan ────────────────────────────
  {
    arabic:
      'وَمَا الدَّهْرُ إِلَّا تَارَتَانِ فَتَارَةٌ\nأُسَرُّ بِهَا طَوْرًا وَأُخْرَى أَسُوءُهَا',
    english:
      'Time is nothing but two turns — one in which I am made glad, and another in which I am made to grieve.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on the changes of time, on patience through reversals, on the brevity of life',
  },
  {
    arabic:
      'لِكُلِّ امْرِئٍ فِي دَهْرِهِ مَا تَعَوَّدَا\nوَعَادَةُ سَيْفِ الْمَرْءِ أَنْ يَتَقَلَّدَا\nفَلَا تَجْزَعَنَّ مِنْ سُنَّةٍ أَنْتَ سِرْتَهَا\nفَأَوَّلُ رَاضٍ سُنَّةً مَنْ يَسِيرُهَا',
    english:
      'Every man in his time has what he has accustomed himself to. So do not complain of a path you yourself have walked — for the first to accept a custom is the one who walks it.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: "on responsibility for one's habits, on patience with consequences, on self-accountability",
  },
  {
    arabic:
      'تَزَوَّدْ مِنَ التَّقْوَى فَإِنَّكَ لَا تَدْرِي\nإِذَا جَنَّ لَيْلٌ هَلْ تَعِيشُ إِلَى الْفَجْرِ\nفَكَمْ مِنْ صَحِيحٍ مَاتَ مِنْ غَيْرِ عِلَّةٍ\nوَكَمْ مِنْ سَقِيمٍ عَاشَ حِينًا مِنَ الدَّهْرِ',
    english:
      'Take provision of God-consciousness, for you do not know — when night falls — whether you will live until dawn. How many healthy people have died without illness, and how many sick have lingered on for years.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: "on the brevity of life, on death's nearness, on preparing for the end, on God-consciousness",
  },
  {
    arabic:
      'إِذَا الْمَرْءُ لَا يَرْعَاكَ إِلَّا تَكَلُّفًا\nفَدَعْهُ وَلَا تُكْثِرْ عَلَيْهِ التَّأَسُّفَا\nفَفِي النَّاسِ أَبْدَالٌ وَفِي التَّرْكِ رَاحَةٌ\nوَفِي الْقَلْبِ صَبْرٌ لِلْحَبِيبِ وَلَوْ جَفَا',
    english:
      'When a person regards you only out of forced effort, let him go and do not pour out regret over him. Among people there are replacements, and in letting go there is rest — and in the heart there is patience even for a beloved who turns away.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on dignity, on letting go of those who do not value you, on self-respect in relationships',
  },
  {
    arabic:
      'إِذَا أَنْتَ لَمْ تَشْرَبْ مِرَارًا عَلَى الْقَذَى\nظَمِئْتَ وَأَيُّ النَّاسِ تَصْفُو مَشَارِبُهْ',
    english:
      'If you will not sometimes drink despite the dregs, you will go thirsty — for whose drinking-place among people is ever wholly pure?',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on tolerating imperfection in people, on patience with companions, on realistic expectations',
  },
  {
    arabic:
      'إِذَا كُنْتَ فِي حَاجَةٍ مُرْسِلًا\nفَأَرْسِلْ حَكِيمًا وَلَا تُوصِهِ\nوَإِنْ نَاصِحٌ مِنْكَ يَوْمًا دَنَا\nفَلَا تَنْأَ عَنْهُ وَلَا تُقْصِهِ',
    english:
      'When you send someone on a matter, send a wise person and do not need to instruct him. And if an advisor draws near to you one day, do not push him away or hold him at a distance.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on the company of the wise, on listening to counsel, on choosing trustworthy people',
  },
  {
    arabic:
      'إِذَا جَارَ الْأَمِيرُ وَكَاتِبَاهُ\nوَقَاضِي الْأَرْضِ أَجْحَفَ فِي الْقَضَاءِ\nفَوَيْلٌ ثُمَّ وَيْلٌ ثُمَّ وَيْلٌ\nلِقَاضِي الْأَرْضِ مِنْ قَاضِي السَّمَاءِ',
    english:
      'When the ruler is unjust, and his two scribes, and the earthly judge oppresses in his judgement — then woe, then woe, then woe to the judge of the earth from the Judge of the heavens.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on patience under injustice, on trust in divine justice, on God as ultimate judge',
  },
  {
    arabic:
      'لَا تَطْلُبَنَّ مَعِيشَةً بِمَذَلَّةٍ\nوَاقْنَعْ فَكُلُّ مُقَنَّعٍ مَلِكٌ\nوَالنَّفْسُ حُرَّةٌ مَا قَنِعْتَ بِهَا\nوَإِذَا اسْتَذَلَّتْ نَفْسُهَا هَلَكْتَ',
    english:
      "Do not seek a living through humiliation — be content, for every contented person is a king. The soul is free as long as you keep it content; once it lets itself be humbled, you have perished.",
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: "on dignity, on contentment as wealth, on the heart's true wealth, on self-respect",
  },
  {
    arabic:
      'إِذَا كُنْتَ فِي قَوْمٍ فَصَاحِبْ خِيَارَهُمْ\nوَلَا تَصْحَبِ الْأَرْدَى فَتَرْدَى مَعَ الرَّدِي',
    english:
      'When you are among a people, keep company with the best of them. Do not befriend the lowest, lest you fall together with the fallen.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on the company of the wise, on avoiding bad companions, on the influence of company',
  },
  {
    arabic:
      'وَلَا خَيْرَ فِي خِلٍّ يَخُونُ خَلِيلَهُ\nوَيَلْقَاهُ مِنْ بَعْدِ الْمَوَدَّةِ بِالْجَفَا\nوَيُنْكِرُ عَيْشًا قَدْ تَقَادَمَ عَهْدُهُ\nوَيُظْهِرُ سِرًّا كَانَ بِالْأَمْسِ قَدْ خَفَا',
    english:
      'There is no good in a friend who betrays his friend and meets him after affection with coldness; who denies a shared life now grown old between them, and discloses a secret that yesterday was kept hidden.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on disappointing love, on betrayal in friendship, on choosing companions, on loyalty',
  },
  {
    arabic:
      'وَمَنْ يَكُ ذَا فَضْلٍ فَيَبْخَلْ بِفَضْلِهِ\nعَلَى قَوْمِهِ يُسْتَغْنَ عَنْهُ وَيُذْمَمِ',
    english:
      'Whoever possesses some virtue and is miserly with it toward his people — they will do without him, and he will be censured.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on generosity with what one has, on serving others, on what to leave behind',
  },
  {
    arabic:
      'إِذَا كَانَ عَوْنُ اللَّهِ لِلْمَرْءِ شَامِلًا\nتَهَيَّأَ لَهُ مِنْ كُلِّ أَمْرٍ مُرَادُهُ\nوَإِنْ لَمْ يَكُنْ عَوْنٌ مِنَ اللَّهِ لِلْفَتَى\nفَأَكْثَرُ مَا يَجْنِي عَلَيْهِ اجْتِهَادُهُ',
    english:
      "When God's help encompasses a person, what he seeks in every matter is made ready for him. And when a young man has no help from God, the very most of his own striving turns against him.",
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on trust in divine timing, on what to seek from God, on reliance over self-striving',
  },
  {
    arabic:
      'إِذَا الْعِلْمُ لَمْ تَعْمَلْ بِهِ كَانَ حُجَّةً\nعَلَيْكَ وَلَمْ تُعْذَرْ بِمَا أَنْتَ جَاهِلُهْ',
    english:
      'When you do not act upon the knowledge you have, it becomes a proof against you — and you are not excused by what remains of your ignorance either.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on the difference between knowing and acting, on knowledge as responsibility, on hypocrisy',
  },

  // ── On the brevity of life and the nearness of death ───────────────
  {
    arabic:
      'النَّاسُ مِنْ جِهَةِ التِّمْثَالِ أَكْفَاءُ\nأَبُوهُمُ آدَمُ وَالأُمُّ حَوَّاءُ',
    english:
      'People, in the matter of their making, are equals / Their father is Adam and their mother is Hawwa.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on the shared origin and brevity of all human life',
  },
  {
    arabic:
      'فَإِنْ كَانَ لَهُمْ فِي أَصْلِهِمْ شَرَفٌ\nيُفَاخِرُونَ بِهِ فَالطِّينُ وَالْمَاءُ',
    english:
      'If there be in their origin any nobility by which they boast — it is but clay and water.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on the lowly origin of the body that death will soon reclaim, on humility',
  },
  {
    arabic:
      'النَّفْسُ تَبْكِي عَلَى الدُّنْيَا وَقَدْ عَلِمَتْ\nأَنَّ السَّلَامَةَ فِيهَا تَرْكُ مَا فِيهَا',
    english:
      'The soul weeps over the world, though it has known / that safety within it lies in leaving what is in it.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on the foolishness of clinging to a world we must soon leave',
  },
  {
    arabic:
      'لَا دَارَ لِلْمَرْءِ بَعْدَ الْمَوْتِ يَسْكُنُهَا\nإِلَّا الَّتِي كَانَ قَبْلَ الْمَوْتِ يَبْنِيهَا',
    english:
      'No dwelling has a man to inhabit after death / save the one he was building before death.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on building for the Hereafter while time remains',
  },
  {
    arabic:
      'فَإِنْ بَنَاهَا بِخَيْرٍ طَابَ مَسْكَنُهُ\nوَإِنْ بَنَاهَا بِشَرٍّ خَابَ بَانِيهَا',
    english:
      'If he built it with good, his dwelling shall be sweet / and if he built it with evil, its builder is undone.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on the swift accounting that follows the brief day of work',
  },
  {
    arabic:
      'يَا مَنْ بِدُنْيَاهُ اشْتَغَلْ\nقَدْ غَرَّهُ طُولُ الأَمَلْ',
    english:
      'O you whom this world has occupied / long hope has utterly deceived you.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on the deception of long hopes when life is short',
  },
  {
    arabic:
      'الْمَوْتُ يَأْتِي بَغْتَةً\nوَالْقَبْرُ صُنْدُوقُ الْعَمَلْ',
    english:
      'Death comes suddenly, without warning / and the grave is the chest that holds the deeds.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on death arriving unannounced and the grave as the ledger of works',
  },
  {
    arabic:
      'وَمَا الدُّنْيَا بِبَاقِيَةٍ لِحَيٍّ\nوَلَا حَيٌّ عَلَى الدُّنْيَا بِبَاقِي',
    english:
      'The world abides for no living soul / nor does any living soul abide upon the world.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on the impermanence of both the world and its inhabitants',
  },
  {
    arabic:
      'وَمَا الْمَالُ وَالْأَهْلُونَ إِلَّا وَدَائِعُ\nوَلَا بُدَّ يَوْمًا أَنْ تُرَدَّ الْوَدَائِعُ',
    english:
      'Wealth and family are nothing but entrusted things / and one day, inevitably, what is entrusted must be returned.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on the borrowed nature of every blessing in a brief life',
  },
  {
    arabic:
      'تَزَوَّدْ مِنَ التَّقْوَى فَإِنَّكَ لَا تَدْرِي\nإِذَا جَنَّ لَيْلٌ هَلْ تَعِيشُ إِلَى الْفَجْرِ',
    english:
      'Take provision of God-consciousness, for you do not know / when night falls, whether you will live until the dawn.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on the nearness of death and the worth of every remaining hour',
  },
  {
    arabic:
      'فَكَمْ مِنْ صَحِيحٍ مَاتَ مِنْ غَيْرِ عِلَّةٍ\nوَكَمْ مِنْ سَقِيمٍ عَاشَ حِينًا مِنَ الدَّهْرِ',
    english:
      'How many a healthy one has died without any illness / and how many a sick one has lived on for an age.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on death striking unpredictably and the folly of postponement',
  },
  {
    arabic:
      'وَكَمْ مِنْ فَتًى أَمْسَى وَأَصْبَحَ ضَاحِكًا\nوَأَكْفَانُهُ فِي الْغَيْبِ تُنْسَجُ وَلَا يَدْرِي',
    english:
      'How many a youth has passed his evening and morning laughing / while his shrouds, in the unseen, are being woven — and he does not know.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on the unseen approach of death amid the laughter of the living',
  },

  // ── On knowledge and the seeker ──────────────────────────────────
  {
    arabic:
      'شِفَاءُ الْعَمَى طُولُ السُّؤَالِ وَإِنَّمَا\nتَمَامُ صَلَاحِ المَرْءِ طُولُ تَدَبُّرِهْ',
    english:
      'The cure of blindness is to ask at length / and the perfection of a man is the length of his reflection.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on asking the learned, on reflection',
  },
  {
    arabic:
      'وَلَيْسَ بِعِلْمٍ مَا حَوَى القَمَطْرُ\nمَا العِلْمُ إِلَّا مَا حَوَاهُ الصَّدْرُ',
    english:
      'That which the satchel contains is not knowledge / knowledge is only what the breast contains.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on what knowledge truly is, on the heart as the seat of knowledge',
  },
  {
    arabic:
      'أَخِي لَنْ تَنَالَ العِلْمَ إِلَّا بِسِتَّةٍ\nسَأُنْبِيكَ عَنْ تَفْصِيلِهَا بِبَيَانِ\nذَكَاءٌ وَحِرْصٌ وَاجْتِهَادٌ وَبُلْغَةٌ\nوَصُحْبَةُ أُسْتَاذٍ وَطُولُ زَمَانِ',
    english:
      'My brother, you shall not attain knowledge save by six — I will inform you of their details in plain speech / intelligence, eagerness, striving, and sufficient means, the company of a teacher, and length of time.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on the conditions of seeking knowledge, on the student',
  },
  {
    arabic:
      'تَعَلَّمْ فَلَيْسَ المَرْءُ يُولَدُ عَالِمًا\nوَلَيْسَ أَخُو عِلْمٍ كَمَنْ هُوَ جَاهِلُ',
    english:
      'Learn — for no man is born already learned / and no companion of knowledge is like the ignorant.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on the worth of the learner, on no one born knowing',
  },
  {
    arabic:
      'وَإِنَّ كَبِيرَ القَوْمِ لَا عِلْمَ عِنْدَهُ\nصَغِيرٌ إِذَا الْتَفَّتْ عَلَيْهِ الجَحَافِلُ',
    english:
      'The elder of a people in whom there is no knowledge / is small when the gathered hosts crowd around him.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on the dignity of the scholar, on the worth of the learner',
  },
  {
    arabic:
      'العِلْمُ زَيْنٌ وَتَقْوَى اللَّهِ زِينَتُهُ\nوَالمُتَّقُونَ لَهُمْ فَضْلٌ عَلَى العُلَمَا',
    english:
      'Knowledge is an adornment, and the fear of God is its ornament / and the God-fearing have excellence over the learned.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on knowledge wedded to piety, on the dignity of the scholar',
  },
  {
    arabic:
      'مَا الفَضْلُ إِلَّا لِأَهْلِ العِلْمِ إِنَّهُمُ\nعَلَى الهُدَى لِمَنِ اسْتَهْدَى أَدِلَّاءُ',
    english:
      'There is no excellence except for the people of knowledge / they are guides to the right path for whoever seeks guidance.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on the dignity of the scholar, on guidance through the learned',
  },
  {
    arabic:
      'وَقَدْرُ كُلِّ امْرِئٍ مَا كَانَ يُحْسِنُهُ\nوَالجَاهِلُونَ لِأَهْلِ العِلْمِ أَعْدَاءُ',
    english:
      'The worth of each man is what he masters well / and the ignorant are the enemies of the people of knowledge.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on the worth of a person, on the enmity of the ignorant',
  },
  {
    arabic:
      'لَا تَحْسَبِ العِلْمَ يَنْفَعْ وَحْدَهُ أَبَدًا\nمَا لَمْ يُتَوَّجْ بِهِ أَخْلَاقُ صَاحِبِهِ',
    english:
      'Do not suppose knowledge alone will ever profit / so long as the conduct of its bearer is not crowned with it.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on knowledge without character, on confusing speech with knowledge',
  },
  {
    arabic:
      'يَا رُبَّ ذِي مَنْطِقٍ عَذْبٍ بَلَاغَتُهُ\nقَلْبٌ خَلِيٌّ مِنَ التَّقْوَى وَآدَابِهِ',
    english:
      'How many a one of sweet speech, his eloquence flowing / has a heart empty of piety and its disciplines.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on confusing speech with knowledge, on hollow eloquence',
  },
  {
    arabic:
      'وَلَوْ كَانَ هَذَا العِلْمُ يَحْصُلُ بِالمُنَى\nلَمَا كَانَ يَبْقَى فِي البَرِيَّةِ جَاهِلُ\nفَجِدَّ وَلَا تَكْسَلْ وَلَا تَكُ غَافِلًا\nفَنَدَامَةُ العُقْبَى لِمَنْ يَتَكَاسَلُ',
    english:
      'Were this knowledge to be attained by mere wishing / there would not remain among creation a single ignorant man. So strive, and be not slothful, and be not heedless / for the regret of the end is for the one who falls into idleness.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: "on the cost of seeking, on the student's effort",
  },
  {
    arabic:
      'إِذَا جَلَسْتَ إِلَى العُلَمَاءِ فَكُنْ عَلَى\nأَنْ تَسْمَعَ أَحْرَصَ مِنْكَ عَلَى أَنْ تَقُولَا\nوَتَعَلَّمِ الْإِنْصَاتَ حُسْنَ تَعَلُّمٍ\nكَمَا تَعَلَّمْتَ الكَلَامَ الجَمِيلَا',
    english:
      'When you sit before the learned, be more eager to listen than to speak / and learn good listening as a fine learning, just as you learned beautiful speech.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on the student-teacher relationship, on the etiquette of the seeker',
  },

  // ── On the virtuous life ────────────────────────────────────────
  {
    arabic:
      'إِذَا المَرْءُ لَمْ يَلْبَسْ لِبَاسًا مِنَ التُّقَى\nتَقَلَّبَ عُرْيَانًا وَإِنْ كَانَ كَاسِيَا',
    english:
      'When a man does not clothe himself in the garment of piety / he walks about naked, though he be richly dressed.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on piety as the true garment, on outward finery as nakedness',
  },
  {
    arabic:
      'وَخَيْرُ خِصَالِ المَرْءِ صِدْقُ لِسَانِهِ\nوَشَرُّ مَسَاعِيهِ السَّعَايَةُ بِالكَذِبِ',
    english:
      "The best of a man's traits is the truthfulness of his tongue / and the worst of his pursuits is the slander spread by lies.",
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on truthfulness as the highest trait',
  },
  {
    arabic:
      'وَلَا خَيْرَ فِي طُولِ الحَيَاةِ وَعَيْشِهَا\nإِذَا أَنْتَ مِنْهَا بِالتُّقَى لَمْ تُزَوَّدِ',
    english:
      'There is no good in a long life or its enjoyment / if you have not provisioned yourself from it with piety.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on what makes a life worth living',
  },
  {
    arabic:
      'وَمَنْ يَكُ ذَا عَقْلٍ وَلَمْ يَكُ ذَا تُقًى\nفَلَيْسَ لَهُ مِنْ عَقْلِهِ وَافِرُ الحَظِّ',
    english:
      'Whoever possesses intellect but possesses no piety / has gained no abundant share from his own intellect.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on intellect without piety',
  },
  {
    arabic:
      'إِذَا اعْتَادَ الفَتَى خَوْضَ المَعَالِي\nفَأَيْسَرُ مَا يَمُرُّ بِهِ الصِّعَابُ',
    english:
      'When a young man grows accustomed to wading into noble heights / the easiest of things he encounters is hardship.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on the life aimed at the noble',
  },

  // ── On the pilgrimage of life, on hope and awe ──────────────────
  {
    arabic:
      'إِذَا المَرْءُ لَمْ يَدَّخِرْ تَقْوَىً لِآخِرَتِهْ\nرَأَى الحَسْرَةَ الكُبْرَى غَدَاً عِنْدَ مَصْرَعِهْ',
    english:
      'If a man stores up no piety for his Hereafter / he will see the greatest anguish tomorrow at his fall.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on provisioning for the road ahead',
  },
  {
    arabic:
      'وَخَفْ رَبَّكَ الأَعْلَى وَأَحْسِنْ ظُنُونَكَا\nفَإِنَّ كَرِيمَ العَفْوِ يَقْبَلُ تَائِبَهْ',
    english:
      'Fear your Lord Most High, yet keep your hopes fair-thinking / for the Generous in pardon receives the one who turns.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on what to fear and what to hope, between awe and mercy',
  },
  {
    arabic:
      'أَطِعْ مَنْ يُعَلِّمْكَ وَإِنْ كَانَ ذَا كِبَرٍ\nفَفِي شَيْبَةِ الشَّيْخِ الحَكِيمِ تَجَارِبُهْ',
    english:
      "Obey the one who teaches you, though his years be many / for in the white hair of the wise old man lie his trials lived.",
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on heeding the wise old man\'s counsel',
  },
  {
    arabic:
      'وَسِرْ فِي طَرِيقِ الحَقِّ سَيْرَ مُسَافِرٍ\nيُعِدُّ لِيَوْمِ الرَّحْلِ مَا هُوَ نَافِعُهْ',
    english:
      'Walk in the road of truth as a traveller walks / preparing for the day of departure what will profit him.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on life as a journey toward home',
  },
  {
    arabic:
      'تَخَوَّفْ مِنَ الدُّنْيَا وَلَا تَأْمَنَنْ لَهَا\nفَكَمْ ضَاحِكٍ فِيهَا بَكَتْهُ مَآتِمُهْ',
    english:
      'Be wary of this world and feel no safety in her / for many a man who laughed in her was wept over at his wake.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: "on the world's smile, on distrust of safety",
  },
  {
    arabic:
      'وَشَاوِرْ ذَوِي الأَلْبَابِ مِنْ كُلِّ مَجْلِسٍ\nفَرَأْيُ الفَتَى الغِرِّ يَخُونُ صَوَاحِبَهْ',
    english:
      'Take counsel of the people of understanding in every gathering / for the green youth\'s opinion betrays its own companions.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on seeking the seasoned mind',
  },

  // ── Nasīḥa & character (Diwan ethics) ───────────────────────────
  {
    arabic:
      'أَخَاكَ أَخَاكَ إِنَّ مَنْ لَا أَخَا لَهُ\nكَسَاعٍ إِلَى الهَيْجَا بِغَيْرِ سِلَاحِ',
    english: 'Your brother, your brother! For he who has no brother / is like one rushing into battle without a weapon.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on brotherhood, on the worth of a sibling, nasīḥa',
  },
  {
    arabic:
      'وَإِنَّ ابْنَ عَمِّ المَرْءِ فَاعْلَمْ جَنَاحُهُ\nوَهَلْ يَنْهَضُ البَازِي بِغَيْرِ جَنَاحِ',
    english: "Know that a person's cousin is their very wing / and can the falcon ever rise without a wing?",
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on kinship, on the support of one\'s clan',
  },
  {
    arabic:
      'إِذَا المَرْءُ لَمْ يُدْنَسْ مِنَ اللُّؤْمِ عِرْضُهُ\nفَكُلُّ رِدَاءٍ يَرْتَدِيهِ جَمِيلُ',
    english: "If a man's honour is not soiled by baseness / then every cloak he wears is beautiful.",
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on character as the true adornment, on honour',
  },
  {
    arabic:
      'وَإِنْ هُوَ لَمْ يَحْمِلْ عَلَى النَّفْسِ ضَيْمَهَا\nفَلَيْسَ إِلَى حُسْنِ الثَّنَاءِ سَبِيلُ',
    english: 'If a man does not make his soul bear hardship / there is no path for him to noble praise.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on character through self-discipline',
  },
  {
    arabic:
      'وَلَمْ أَرَ فِي عُيُوبِ النَّاسِ عَيْبًا\nكَنَقْصِ القَادِرِينَ عَلَى التَّمَامِ',
    english: 'Among the faults of people I have seen no fault / like the shortcoming of those who had the power to complete.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on character, on excellence, on not falling short of what you could do',
  },
  {
    arabic:
      'اِصْبِرْ عَلَى مَضَضِ الحَسُو\nدِ فَإِنَّ صَبْرَكَ قَاتِلُهْ',
    english: 'Be patient with the bitterness of the envier / for your patience itself is what slays him.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on patience under envy, on adversity',
  },
  {
    arabic:
      'فَالنَّارُ تَأْكُلُ بَعْضَهَا\nإِنْ لَمْ تَجِدْ مَا تَأْكُلُهْ',
    english: 'Even fire consumes its own self / if it finds nothing else to consume.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on patience under envy, on the self-defeating nature of malice',
  },
  {
    arabic:
      'يَا أَيُّهَا النَّاسُ اِجْتَنِبُوا الكَذِبَ\nوَجَانِبُوا الجَاهِلَ وَالمُغْتَابَ',
    english: 'O people, shun lying altogether / and keep far from the ignorant and the backbiter.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on truthfulness, on avoiding backbiting, nasīḥa',
  },
  {
    arabic:
      'وَاصْحَبْ مِنَ النَّاسِ ذَوِي رَأْفَةٍ\nيَكُونُ مِنْهُمْ لَكَ أَصْحَابُ',
    english: 'Keep company among people with those of tender mercy / for from such people you will find true companions.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on companionship, nasīḥa',
  },
  {
    arabic:
      'وَكُنْ صَبُورًا عَلَى نَوْبِ الزَّمَانِ وَلَا\nتَجْزَعْ لِحَادِثَةٍ يَوْمًا مِنَ الزَّمَنِ',
    english: "Be enduring in the face of time's misfortunes / and do not despair, even for a day, at any event of this age.",
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on patience, on steadfastness through time',
  },

  // ── On tawakkul, surrender, contentment with the decree ──────────
  {
    arabic:
      'تَوَكَّلْ عَلَى الرَّحْمَنِ فِي كُلِّ حَاجَةٍ\nوَلَا تَرْجُ مِنْ عَبْدٍ سِوَاهُ قَضَاءَهَا\nفَإِنَّ الَّذِي يَكْفِيكَ مَا فَاتَ فِي الَّذِي\nمَضَى هُوَ يَكْفِيكَ الَّذِي أَنْتَ خَاشِيَهْ',
    english:
      'Rely upon the Merciful in every need / and hope for its fulfilment from no servant beside Him. The One who sufficed you in what has already passed / is the One who will suffice you in what you now fear.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on tawakkul, on reliance in every need',
  },
  {
    arabic:
      'إِذَا اشْتَمَلَتْ عَلَى الْيَأْسِ الْقُلُوبُ\nوَضَاقَ لِمَا بِهِ الصَّدْرُ الرَّحِيبُ\nوَأَوْطَنَتِ الْمَكَارِهُ وَاطْمَأَنَّتْ\nوَأَرْسَتْ فِي أَمَاكِنِهَا الْخُطُوبُ\nأَتَاكَ عَلَى قُنُوطٍ مِنْكَ غَوْثٌ\nيَمُنُّ بِهِ اللَّطِيفُ الْمُسْتَجِيبُ\nوَكُلُّ الْحَادِثَاتِ إِذَا تَنَاهَتْ\nفَمَوْصُولٌ بِهَا الْفَرَجُ الْقَرِيبُ',
    english:
      'When hearts are enveloped in despair / and the spacious breast grows narrow with what it bears, / when hardships settle in and take their rest / and calamities anchor firmly in their places — / there comes to you, upon your very despair, a rescue / bestowed by the Gentle, the Answerer of prayer. / And all events, when they reach their utmost limit / are joined to a nearness of relief at hand.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on relief after despair, on the dawn at the darkest hour',
  },
  {
    arabic:
      'وَمَا الْمَرْءُ إِلَّا حَيْثُ يَجْعَلُ نَفْسَهُ\nفَكُنْ طَالِبًا فِي النَّاسِ أَعْلَى الْمَرَاتِبِ\nوَوَطِّنْ عَلَى مَا نَابَكَ الدَّهْرُ نَفْسَهَا\nفَخَيْرُ خِلَالِ الْمَرْءِ صِدْقُ الرَّغَائِبِ',
    english:
      'A man is only what he makes of himself / so seek among people the loftiest of ranks. / Settle your soul to whatever fate has dealt you / for the best of a man\'s qualities is truthful contentment.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on contentment with the decree, on character',
  },
  {
    arabic:
      'رَضِيتُ بِمَا قَسَمَ اللَّهُ لِي\nوَفَوَّضْتُ أَمْرِي إِلَى خَالِقِي\nكَمَا أَحْسَنَ اللَّهُ فِيمَا مَضَى\nكَذَلِكَ يُحْسِنُ فِيمَا بَقِي',
    english:
      'I am content with what God has apportioned me / and I have entrusted my affair to my Creator. / Just as God did beautifully in what has passed / so too will He do beautifully in what remains.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on surrender to the decree, on resting in what He has set',
  },
  {
    arabic:
      'دَعِ الْحِرْصَ عَلَى الدُّنْيَا\nوَفِي الْعَيْشِ فَلَا تَطْمَعْ\nوَلَا تَجْمَعْ مِنَ الْمَالِ\nفَمَا تَدْرِي لِمَنْ تَجْمَعْ\nفَإِنَّ الرِّزْقَ مَقْسُومٌ\nوَسُوءُ الظَّنِّ لَا يَنْفَعْ',
    english:
      'Leave off greed for the world / and do not covet in your living. / Do not heap up wealth / for you know not for whom you heap it. / Provision is already apportioned / and suspicion of God avails you nothing.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on letting go of the world, on tawakkul in provision',
  },
  {
    arabic:
      'تَوَكَّلْتُ فِي رِزْقِي عَلَى اللَّهِ خَالِقِي\nوَأَيْقَنْتُ أَنَّ اللَّهَ لَا شَكَّ رَازِقِي\nوَمَا يَكُ مِنْ رِزْقِي فَلَيْسَ يَفُوتُنِي\nوَلَوْ كَانَ فِي قَاعِ الْبِحَارِ الْعَوَامِقِ',
    english:
      'I have placed my trust for my provision upon God my Creator / and I have known with certainty that God, without doubt, will provide for me. / Whatever is of my provision shall never escape me / though it lay in the depths of the deepest seas.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on certainty in provision, on tawakkul',
  },
  {
    arabic:
      'إِذَا الْمَقْدُورُ حَلَّ بِكَ الْبَلَاءُ\nفَلَيْسَ يَرُدُّهُ عَنْكَ احْتِيَالُ\nوَمَا لَكَ غَيْرُ تَقْوَى اللَّهِ حِصْنٌ\nإِذَا نَزَلَتْ بِسَاحَتِكَ النَّوَالُ',
    english:
      'When affliction descends upon you by decree / no scheming on your part can turn it away. / You have no fortress save the fear of God / when the decrees alight in your courtyard.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on the futility of resisting the decree',
  },
  {
    arabic:
      'إِذَا كُنْتَ ذَا قَلْبٍ قَنُوعٍ بِمَا تَرَى\nفَأَنْتَ وَمَنْ يَمْلِكُ بِلَادَ الْمَشَارِقِ\nوَإِنْ كُنْتَ تَبْغِي مَا تَرَى فَجَمِيعُ مَا\nحَوَتْهُ يَدَاكَ الْيَوْمَ لَيْسَ بِسَائِغِ',
    english:
      'If you possess a heart content with what it sees / then you and the one who owns the eastern lands are equal. / But if you crave whatever you behold / then all that your hands hold today will not go down sweetly.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on contentment as wealth',
  },
  {
    arabic:
      'وَمَنْ وَثِقَ بِاللَّهِ فِي كُلِّ أَمْرِهِ\nيَجِدْ كُلَّ خَيْرٍ عِنْدَهُ حِينَ يَطْلُبُ\nوَمَنْ يَتَوَكَّلْ فِي الْأُمُورِ عَلَى الَّذِي\nإِلَيْهِ مَآلُ الْخَلْقِ تَكْفِهِ النَّوَائِبُ',
    english:
      'Whoever places his trust in God in every affair / shall find every good with Him when he seeks. / Whoever entrusts his matters to the One / to whom all creation returns — calamities will be sufficed away from him.',
    source: 'Diwan attributed to Imam Ali (عليه السلام)',
    theme: 'on tawakkul, on the believer\'s tranquility',
  },
]

/**
 * Render the baseline content as a structured block to inject into
 * the system prompt. The LLM reads this once per call.
 */
export function renderBaselineCorpusBlock(): string {
  const renderList = (label: string, list: BaselineEntry[]) =>
    list
      .map(
        (e, i) =>
          `  ${label}-${i + 1}:\n    Arabic: ${e.arabic}\n    English: ${e.english}\n    Source: ${e.source}\n    Use when: ${e.theme}`,
      )
      .join('\n\n')

  const renderLongList = (label: string, list: LongFormEntry[]) =>
    list
      .map(
        (e, i) =>
          `  ${label}-${i + 1}: ${e.title.en}\n    Arabic: ${e.arabic}\n    English: ${e.english}\n    Source: ${e.source}\n    About: ${e.brief.en}\n    Use when: ${e.theme}`,
      )
      .join('\n\n')

  return `——— REFERENCE LIBRARY · BASELINE CORPUS ———

This is a curated set of authentic du'as, wisdom teachings, Diwan poetry, and excerpts from the most famous letters and sermons in Nahj al-Balagha. When the user asks for any of these categories, you MUST draw from these entries (or from RAG-retrieved teachings, if any are provided above) — never fabricate or guess. Cite the source exactly as written.

DU'AS — when the user asks to hear a du'a or for a prayer:
${renderList('DUA', BASELINE_DUAS)}

WISDOM TEACHINGS — short sayings from Nahj al-Balagha and Ghurar al-Hikam:
${renderList('WISDOM', BASELINE_WISDOM)}

POETRY FROM THE DIWAN — when the user asks for poetry or reflection:
${renderList('POEM', BASELINE_POETRY)}

LETTERS — substantial excerpts from Imam Ali's most famous letters in Nahj al-Balagha. When the user asks about parenting, governance, justice, or wants something deeper than a single saying:
${renderLongList('LETTER', BASELINE_LETTERS)}

SERMONS — substantial excerpts from the most famous sermons. When the user asks about character, the world, power, or the inner life:
${renderLongList('SERMON', BASELINE_SERMONS)}

——— END REFERENCE LIBRARY ———

`
}
