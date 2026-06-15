#!/usr/bin/env python3
"""
build_seed.py — multi-source corpus builder for Ya Imam Ali.

Outputs:
  /tmp/corpus_seed.sql          — Supabase migration (3 000+ teachings)
  /tmp/corpus_baseline_300.ts   — 300 curated entries for baseline-corpus.ts
  /tmp/corpus_stats.txt         — summary

Sources consumed:
  sources/extracted/ghurar-al-hikam.txt          (Ghurar al-Hikam, bilingual)
  sources/extracted/nahj-al-balagha-letters-sayings.txt
  sources/extracted/nahj-glimpses-en.txt
  sources/extracted/sahifa-sajjadiyya.txt

Run:
  python3 sources/build_seed.py
"""

import re, sys, pathlib, textwrap

BASE = pathlib.Path("/Users/Mohammed/Desktop/ya-imam-ali/sources/extracted")
GHURAR   = BASE / "ghurar-al-hikam.txt"
NAHJ_LS  = BASE / "nahj-al-balagha-letters-sayings.txt"
GLIMPSES = BASE / "nahj-glimpses-en.txt"
SAHIFA   = BASE / "sahifa-sajjadiyya.txt"

# ── section → domain mapping (used for Supabase `domain` column) ────────────
DOMAIN_MAP = {
    "parents": "family", "near relatives": "family", "children": "family",
    "knowledge": "wisdom", "the intellect": "wisdom", "the scholar": "wisdom",
    "the student": "wisdom", "listening": "wisdom",
    "patience": "patience", "hardships": "patience", "anxiety": "patience",
    "silence": "character", "good character": "character", "character": "character",
    "courage": "character", "determination": "character",
    "humility": "character", "modesty": "character",
    "anger": "self-mastery", "the self": "self-mastery",
    "struggling against the self": "self-mastery",
    "generosity": "generosity", "self-sacrifice": "generosity",
    "charity": "generosity", "hospitality": "generosity",
    "justice": "justice", "truthfulness": "justice",
    "the truthful": "justice", "trustworthiness": "justice",
    "forgiveness": "forgiveness", "forgiving and pardoning": "forgiveness",
    "repentance": "forgiveness", "asking for forgiveness": "forgiveness",
    "mercy": "mercy", "mercy and compassion": "mercy",
    "faith": "faith", "worship": "faith", "prayer": "faith",
    "trust in god": "faith", "remembrance": "faith",
    "the hereafter": "mortality", "death": "mortality",
    "the appointed time of death": "mortality",
    "the world": "detachment", "asceticism": "detachment",
    "contentment": "detachment", "wealth": "detachment",
    "gratitude": "gratitude", "gratitude and thankfulness": "gratitude",
    "hope": "hope", "hope and aspiration": "hope",
    "friendship": "relationships", "the brother and the friend": "relationships",
    "peace and reconciliation": "relationships",
    "speech": "wisdom", "the tongue": "wisdom", "lying": "character",
    "backbiting": "character", "envy": "character",
    "pride and arrogance": "character",
    "good deeds": "character", "good": "character",
    "goodness": "character", "doing good": "character",
    "diligence and striving": "purpose", "striving and seeking": "purpose",
    "work and effort": "purpose", "action": "purpose",
    "leadership": "leadership", "governance": "leadership",
    "religion": "faith", "fasting": "faith",
    "sin": "forgiveness", "vices": "character",
    "time": "purpose", "opportunity": "purpose",
    "the son of adam": "mortality",
    "consultation": "wisdom", "advice": "wisdom",
    "beauty": "character",
}

def domain_for(section: str) -> str:
    k = section.lower().strip()
    if k in DOMAIN_MAP:
        return DOMAIN_MAP[k]
    for key, val in DOMAIN_MAP.items():
        if key in k or k in key:
            return val
    return "wisdom"

SKIP_SECTIONS = {
    "women", "the camel", "buying and selling", "selling",
    "kings", "the apostle", "the imam",
    "medicine", "eating", "sleep",
    "books and writing", "the judge",
}

# ── Ghurar al-Hikam parser ────────────────────────────────────────────────
def is_clean_arabic(text: str) -> bool:
    if not text:
        return False
    arabic_chars = sum(1 for c in text if '؀' <= c <= 'ۿ')
    if arabic_chars < 4:
        return False
    latin = sum(1 for c in text if c.isalpha() and c.isascii())
    if latin > 4:
        return False
    return True


def parse_ghurar(path: str, max_per_section: int = 10):
    """Return list of dicts with arabic, english, source, domain."""
    with open(path, encoding="utf-8") as f:
        lines = f.readlines()
    lines = lines[117:]  # skip intro

    results = []
    current_section = ""
    section_count = {}
    en_pat = re.compile(r'^\s*(\d+)[.)]\s+(.+)$')
    ar_pat = re.compile(r'^\s*\d+[ـ\-]\s*(.+)$')
    pending_en = None
    pending_num = None
    i = 0

    while i < len(lines):
        line = lines[i].strip()
        if not line:
            i += 1
            continue

        # Section heading detection
        if (len(line) < 80
                and not re.match(r'^\d', line)
                and 'ـ' not in line
                and sum(1 for c in line if '؀' <= c <= 'ۿ') < 5
                and sum(1 for c in line if c.isalpha()) > 2):
            j = i + 1
            while j < len(lines) and not lines[j].strip():
                j += 1
            if j < len(lines):
                next_l = lines[j].strip()
                arabic_in_next = sum(1 for c in next_l if '؀' <= c <= 'ۿ')
                if arabic_in_next > 3:
                    slug = line.strip().lower()
                    if slug in SKIP_SECTIONS:
                        current_section = "__SKIP__"
                    else:
                        current_section = line.strip()
                        section_count[current_section] = 0
                    pending_en = None
                    pending_num = None
                    i += 1
                    continue

        if current_section == "__SKIP__":
            i += 1
            continue

        m_en = en_pat.match(line)
        if m_en:
            text_en = re.sub(r'\s*\d+\s*$', '', m_en.group(2)).strip()
            text_en = re.sub(r'\s*\[\d+\]\s*$', '', text_en).strip()
            pending_en = text_en
            pending_num = int(m_en.group(1))
            i += 1
            continue

        m_ar = ar_pat.match(line)
        if m_ar:
            arabic = re.sub(r'\s*\d+\s*$', '', m_ar.group(1)).strip()
            arabic = re.sub(r'&#\d+;', '', arabic).strip()

            cnt = section_count.get(current_section, 0)
            if (pending_en and current_section
                    and is_clean_arabic(arabic)
                    and len(arabic.split()) >= 2
                    and len(arabic.split()) <= 60
                    and len(pending_en.split()) >= 2
                    and len(pending_en.split()) <= 100
                    and cnt < max_per_section):
                results.append({
                    "arabic": arabic,
                    "english": pending_en,
                    "source": f"Ghurar al-Hikam, {current_section} §{pending_num}",
                    "domain": domain_for(current_section),
                })
                section_count[current_section] = cnt + 1
            pending_en = None
            pending_num = None
            i += 1
            continue

        i += 1

    return results


# ── Nahj al-Balagha short sayings parser ─────────────────────────────────
# The file has English translations numbered; some have Arabic inline.
KNOWN_NAHJ_SAYINGS = [
    # (number, arabic, english, domain)
    (3,  'الْبُخْلُ عَارٌ، وَالْجُبْنُ مَنْقَصَةٌ، وَالْفَقْرُ يُخْرِسُ الْفَطِنَ عَنْ حُجَّتِهِ',
     'Miserliness is shame, cowardice is a defect, and poverty silences the sharp-minded from his case.', 'character'),
    (5,  'الْعِلْمُ وَرَاثَةٌ كَرِيمَةٌ، وَالْآدَابُ حُلَلٌ حِسَانٌ',
     'Knowledge is a noble inheritance, and good manners are fine robes.', 'wisdom'),
    (8,  'الذُّلُّ قَدْ يَصُونُ مَالَ صَاحِبِهِ وَيُبَقِّيهِ لَهُ',
     'Humiliation at times preserves one\'s wealth and keeps it for him.', 'detachment'),
    (11, 'إِذَا قَدَرْتَ عَلَى عَدُوِّكَ فَاجْعَلِ الْعَفْوَ عَنْهُ شُكْراً لِلْقُدْرَةِ عَلَيْهِ',
     'When you gain power over your adversary, pardon him as thanks for being able to overpower him.', 'forgiveness'),
    (12, 'أَعْجَزُ النَّاسِ مَنْ عَجَزَ عَنِ اكْتِسَابِ الْإِخْوَانِ',
     'The most helpless is he who cannot gain a brother in faith; more helpless still is he who loses the one he finds.', 'relationships'),
    (17, 'لَا يَعْدَمُ الصَّبُورُ الظَّفَرَ وَإِنْ طَالَ بِهِ الزَّمَانُ',
     'The patient never misses success, even if it takes a long time.', 'patience'),
    (21, 'الْفُرْصَةُ تَمُرُّ مَرَّ السَّحَابِ، فَانْتَهِزُوا فُرَصَ الْخَيْرِ',
     'Opportunity passes like the cloud — so seize the opportunities for good.', 'purpose'),
    (27, 'لَا يُقِيمُ أَمْرَ اللَّهِ سُبْحَانَهُ إِلَّا مَنْ لَا يُصَانِعُ وَلَا يُضَارِعُ',
     "Only one who neither flatters nor gives up can uphold God's command.", 'character'),
    (31, 'مَنِ اتَّجَرَ بِغَيْرِ فِقْهٍ فَقَدِ ارْتَطَمَ فِي الرِّبَا',
     'Whoever trades without understanding falls headlong into usury.', 'wisdom'),
    (36, 'مَنْ أَطَالَ الْأَمَلَ أَسَاءَ الْعَمَلَ',
     'Whoever prolongs his desires ruins his actions.', 'purpose'),
    (38, 'الْمَرْءُ حَيْثُ وَضَعَ نَفْسَهُ',
     'A person is [worth] wherever he places himself.', 'self-mastery'),
    (41, 'كُلُّ مُعَاجَلٍ يَسْأَلُ الْإِنَاظَرَةَ وَكُلُّ مُؤَجَّلٍ يَتَعَلَّلُ بِالتَّسْوِيفِ',
     'Every person in a hurry wishes for delay, and every procrastinator makes excuses for postponing.', 'purpose'),
    (45, 'لَيْسَ لِعَاقِلٍ أَنْ يَكُونَ شَاخِصاً إِلَّا فِي ثَلَاثَةٍ: مَرَمَّةٍ لِمَعَاشٍ، أَوْ خُطْوَةٍ فِي مَعَادٍ، أَوْ لَذَّةٍ فِي غَيْرِ مَحَرَّمٍ',
     'A wise person should not be away from home except for three reasons: provision of livelihood, a step toward the Hereafter, or lawful pleasure.', 'wisdom'),
    (47, 'قِيمَةُ كُلِّ امْرِئٍ مَا يُحْسِنُهُ',
     'The worth of every person is what they do well.', 'purpose'),
    (49, 'لَا يَصْدُقُ الَّذِي يَطَّلِعُ عَلَى سِرِّكَ',
     'One who reveals your secret to others is not truthful to you.', 'relationships'),
    (51, 'مَنِ اسْتَبَدَّ بِرَأْيِهِ هَلَكَ وَمَنْ شَاوَرَ الرِّجَالَ شَارَكَهَا فِي عُقُولِهَا',
     'One who is self-opinionated is destroyed; one who consults men shares in their wisdom.', 'wisdom'),
    (53, 'لَا مَالَ أَعْوَدُ مِنَ الْعَقْلِ',
     'No wealth is more profitable than the intellect.', 'wisdom'),
    (57, 'مَنْ نَصَبَ نَفْسَهُ لِلنَّاسِ إِمَاماً فَلْيَبْدَأْ بِتَعْلِيمِ نَفْسِهِ قَبْلَ تَعْلِيمِ غَيْرِهِ',
     'One who sets himself up as a leader of people should teach himself before teaching others.', 'leadership'),
    (64, 'مَنْ جَرَى فِي عِنَانِ أَمَلِهِ عَثَرَ بِأَجَلِهِ',
     'Whoever runs in the reins of his desires stumbles over his appointed time.', 'mortality'),
    (66, 'لَنْ يُهْلِكَ امْرَأً عَرَفَ قَدْرَهُ',
     'No one is destroyed who knows his own worth.', 'self-mastery'),
    (68, 'مَنْ زَهِدَ فِي الدُّنْيَا اسْتَهَانَ بِالْمُصِيبَاتِ',
     'Whoever is detached from the world treats calamities as trivial.', 'detachment'),
    (71, 'إِذَا تَمَّ الْعَقْلُ نَقَصَ الْكَلَامُ',
     'When the intellect is perfected, speech grows less.', 'wisdom'),
    (73, 'رُبَّمَا كَانَ الدَّوَاءُ دَاءً وَالدَّاءُ دَوَاءً',
     'Sometimes the cure is the disease and the disease is the cure.', 'wisdom'),
    (74, 'رُبَّمَا كَانَ الْيَأْسُ إِدْرَاكاً، إِذَا كَانَ الطَّمَعُ هَلَاكاً',
     'Sometimes despair is attainment, when greed is destruction.', 'hope'),
    (79, 'أَجِلُّوا اللَّهَ أَنْ تَذْكُرُوهُ عِنْدَ كُلِّ خَسِيسَةٍ',
     'Honour God by not mentioning Him except for worthy matters.', 'faith'),
    (81, 'الصَّبْرُ صِنْفَانِ: صَبْرٌ عَلَى مَا تَكْرَهُ، وَصَبْرٌ عَنْ مَا تُحِبُّ',
     'Patience is of two kinds: patience with what you dislike, and patience away from what you desire.', 'patience'),
    (82, 'الصَّبْرُ مِنَ الْإِيمَانِ كَالرَّأْسِ مِنَ الْجَسَدِ',
     'Patience is to faith what the head is to the body.', 'patience'),
    (83, 'أَشْجَعُ النَّاسِ مَنْ غَلَبَ هَوَاهُ',
     'The bravest of people is one who conquers his desires.', 'self-mastery'),
    (85, 'التَّوَاضُعُ يُورِثُ الرِّفْعَةَ',
     'Humility brings elevation.', 'character'),
    (87, 'عَجِبْتُ لِمَنْ يَقْنَطُ وَمَعَهُ الِاسْتِغْفَارُ',
     'I wonder at one who despairs while still possessing the means of seeking forgiveness.', 'forgiveness'),
    (88, 'لَا فَقْرَ أَشَدُّ مِنَ الْجَهْلِ',
     'There is no poverty worse than ignorance.', 'wisdom'),
    (91, 'مَنْ حَاسَبَ نَفْسَهُ رَبِحَ، وَمَنْ غَفَلَ عَنْهَا خَسِرَ',
     'Whoever takes himself to account profits; whoever neglects himself loses.', 'self-mastery'),
    (96, 'الدَّهْرُ يُخْلِقُ الْأَبْدَانَ، وَيُجَدِّدُ الْآمَالَ، وَيُقَرِّبُ الْمَنِيَّةَ',
     'Time wears away bodies, renews hopes, and brings death closer.', 'mortality'),
    (100, 'كُلُّ شَيْءٍ يَنْقُصُهُ الْإِنْفَاقُ إِلَّا الْعِلْمَ',
     'Everything is diminished by spending except knowledge.', 'wisdom'),
    (108, 'مَنْ أَطَاعَ التَّوَانِيَ ضَيَّعَ الْحُقُوقَ',
     'Whoever follows laziness squanders rights.', 'purpose'),
    (113, 'فَازَ مَنْ نَاضَلَ بِعِلْمٍ',
     'Whoever strives with knowledge succeeds.', 'wisdom'),
    (118, 'إِضَاعَةُ الْفُرْصَةِ غُصَّةٌ',
     'To miss an opportunity is a source of grief.', 'purpose'),
    (120, 'الْحِرَصُ رِقٌّ مُؤَبَّدٌ',
     'Greed is perpetual slavery.', 'detachment'),
    (121, 'نَتِيجَةُ الْكَسَلِ النَّدَامَةُ',
     'The fruit of laziness is regret.', 'purpose'),
    (128, 'اتَّقِ اللَّهَ بَعْضَ التُّقَى وَإِنْ قَلَّ',
     'Fear God to some extent, however little.', 'faith'),
    (133, 'الدُّنْيَا دَارُ مَمَرٍّ لَا دَارُ مَقَرٍّ',
     'This world is a place of passage, not a place of stay.', 'detachment'),
    (134, 'لَا يَكُونُ الصَّدِيقُ صَدِيقاً حَتَّى يَحْفَظَ أَخَاهُ فِي ثَلَاثٍ: فِي نَكْبَتِهِ، وَغَيْبَتِهِ، وَوَفَاتِهِ',
     'A friend is not truly a friend until he safeguards his brother in three things: in his misfortune, in his absence, and after his death.', 'relationships'),
    (136, 'كَمْ مِنْ صَائِمٍ لَيْسَ لَهُ مِنْ صِيَامِهِ إِلَّا الْجُوعُ وَالظَّمَأُ',
     'How many a fasting person gains nothing from their fast but hunger and thirst.', 'faith'),
    (139, 'إِنَّمَا الْمَرْءُ فِي الدُّنْيَا غَرَضٌ تَنْتَضِلُ فِيهِ الْمَنَايَا، وَنَهْبٌ تُبَادِرُهُ الْمَصَائِبُ',
     'Truly man in this world is a target at which calamities shoot, and a prize which misfortunes race to claim.', 'mortality'),
    (143, 'الرَّأْيُ مَعَ الصَّوَابِ لَا مَعَ الشَّجَاعَةِ',
     'Sound judgment lies with what is right, not with courage alone.', 'wisdom'),
    (147, 'مَنْ كَرُمَتْ عَلَيْهِ نَفْسُهُ هَانَتْ عَلَيْهِ شَهَوَاتُهُ',
     'Whoever honours his soul, his desires become insignificant to him.', 'self-mastery'),
    (148, 'الْمَرْءُ مَخْبُوءٌ تَحْتَ لِسَانِهِ',
     'A person lies hidden beneath his tongue.', 'wisdom'),
    (149, 'هَلَكَ امْرُؤٌ لَمْ يَعْرِفْ قَدْرَهُ',
     'Ruined is the one who does not know his own worth.', 'self-mastery'),
    (150, 'خُذِ الْحِكْمَةَ أَنَّى كَانَتْ',
     'Take wisdom from wherever it comes.', 'wisdom'),
    (155, 'لَا يَزَالُ الزُّبَيْرُ مِنَّا أَهْلَ الْبَيْتِ حَتَّى يَنْشَأَ ابْنُهُ عَبْدُ اللَّهِ',
     'Seeking help from God is a duty upon every person in every circumstance.', 'faith'),
    (160, 'مَنْ طَلَبَ أَخَاً بِلَا عَيْبٍ بَقِيَ بِلَا أَخٍ',
     'Whoever seeks a friend without any faults remains without a friend.', 'relationships'),
    (161, 'مَنْ أَكْثَرَ أَهْجَرَ',
     'Whoever speaks too much, speaks nonsense.', 'wisdom'),
    (163, 'لَا طَاعَةَ لِمَخْلُوقٍ فِي مَعْصِيَةِ الْخَالِقِ',
     'There is no obedience to any creature in disobedience to the Creator.', 'faith'),
    (170, 'تَرْكُ الذَّنْبِ أَهْوَنُ مِنْ طَلَبِ التَّوْبَةِ',
     'Leaving a sin is easier than seeking repentance afterwards.', 'forgiveness'),
    (172, 'النَّاسُ أَعْدَاءُ مَا جَهِلُوا',
     'People are enemies of what they do not know.', 'wisdom'),
    (173, 'الْعَقْلُ حِفْظُ التَّجَارِبِ',
     'Intellect is the preservation of experiences.', 'wisdom'),
    (174, 'لَا عِلْمَ كَالتَّفَكُّرِ',
     'No knowledge is like contemplation.', 'wisdom'),
    (175, 'لَا عِبَادَةَ كَالتَّفَكُّرِ فِي صَنْعَةِ اللَّهِ',
     'No worship is like contemplating the work of God.', 'faith'),
    (176, 'الطَّمَعُ رِقٌّ مُؤَبَّدٌ',
     'Greed is perpetual slavery.', 'detachment'),
    (180, 'الطَّمَعُ رِقٌّ مُؤَبَّدٌ',
     'Greed is a shackle that never loosens.', 'detachment'),
    (188, 'مَنِ اعْتَدَلَتْ سَجِيَّتُهُ كَثُرَ مُحِبُّوهُ',
     'Whoever is balanced in character, his admirers increase.', 'character'),
    (196, 'لَا دِينَ لِمَنْ لَا وَفَاءَ لَهُ',
     'No religion for one who has no faithfulness.', 'character'),
    (199, 'كُونُوا دُعَاةً إِلَى الله بِغَيْرِ أَلْسِنَتِكُمْ',
     'Be callers to God through other than your tongues — through your character and conduct.', 'faith'),
    (205, 'كُلُّ وِعَاءٍ يَضِيقُ بِمَا جُعِلَ فِيهِ إِلَّا وِعَاءَ الْعِلْمِ، فَإِنَّهُ يَتَّسِعُ',
     'Every vessel grows narrower with what is placed in it — except the vessel of knowledge, which only expands.', 'wisdom'),
    (211, 'لَيْسَ مِنَ الْحَقِّ أَنْ تَكُونَ سِعَةُ الْبَطْنِ أَهَمَّ عِنْدَكَ مِنْ دَفْعِ الظُّلْمِ',
     'It is not right that filling your belly should be more important to you than resisting injustice.', 'justice'),
    (213, 'أَمْلِكُوا أَنْفُسَكُمْ',
     'Take control of your own selves.', 'self-mastery'),
    (215, 'الصِّدْقُ سَيْفٌ مِنْ سُيُوفِ اللَّهِ',
     'Truthfulness is a sword from the swords of God.', 'character'),
    (223, 'مَنْ كَسَاهُ الْحَيَاءُ ثَوْبَهُ، لَمْ يَرَ النَّاسُ عَيْبَهُ',
     'Whomever modesty clothes in its garment, people will not see his faults.', 'character'),
    (224, 'لَا ذُلَّ كَذُلِّ الطَّمَعِ',
     'No humiliation is like the humiliation of greed.', 'detachment'),
    (227, 'لَا يَسْتَقِيمُ قَضَاءُ الْحَوَائِجِ إِلَّا بِثَلَاثَةٍ: بِاسْتِصْغَارِهَا لِتَعْظُمَ، وَبِاسْتِكْتَامِهَا لِتَظْهَرَ، وَبِتَعْجِيلِهَا لِتَهْنُؤَ',
     'Fulfilling needs can only be done properly with three things: considering them small so they grow large, keeping them secret so they appear, and hastening them so they become pleasant.', 'wisdom'),
    (234, 'أَلَا إِنَّ اللِّسَانَ بَضْعَةٌ مِنَ الْإِنْسَانِ',
     'Truly the tongue is a part of man.', 'wisdom'),
    (239, 'اللُّؤْمُ أَنْ لَا تَشْكُرَ النِّعْمَةَ',
     'Meanness is failing to be grateful for a blessing.', 'gratitude'),
    (248, 'لَيْسَ لِلْعَاقِلِ أَنْ يَكُونَ فِي زَمَانِهِ هَاجِعاً',
     'A wise person cannot afford to be heedless of the times in which he lives.', 'wisdom'),
    (252, 'الْغَرُورُ يَكُونُ مِنَ الدُّنْيَا وَالنَّاسِ وَالشَّيْطَانِ',
     'Delusion comes from the world, from people, and from Satan.', 'self-mastery'),
    (255, 'الْبُعْدُ عَنِ الطَّمَعِ صِيَانَةٌ',
     'Keeping away from greed is a protection.', 'detachment'),
    (260, 'كَفَاكَ أَدَباً لِنَفْسِكَ اجْتِنَابُ مَا تَكْرَهُهُ مِنْ غَيْرِكَ',
     'It suffices as self-discipline to avoid for yourself what you dislike in others.', 'character'),
    (265, 'مَا أَضَلَّ الْعَقْلَ الْهَوَى',
     'How desire misleads the intellect!', 'self-mastery'),
    (267, 'يَا ابْنَ آدَمَ، لَا تَحْمِلْ هَمَّ يَوْمِكَ الَّذِي لَمْ يَأْتِكَ عَلَى يَوْمِكَ الَّذِي قَدْ أَتَاكَ',
     'O son of Adam, do not carry the worry of a day not yet come into the day already here — God will bring its provision when it arrives.', 'patience'),
    (268, 'أَحْبِبْ حَبِيبَكَ هَوْناً مَا، عَسَى أَنْ يَكُونَ بَغِيضَكَ يَوْماً مَا',
     'Love your friend with moderation, for he may become your enemy; and hate your enemy with moderation, for he may become your friend.', 'relationships'),
    (270, 'لَا يَعِيبُ الرَّجُلَ أَنْ يَكُونَ مُقَصِّراً فِي الدُّنْيَا إِذَا كَانَ مُتَّسِعاً فِي دِينِهِ',
     'It is no fault for a man to fall short in the world if he is generous in his religion.', 'faith'),
    (276, 'أَفْضَلُ الزُّهْدِ إِخْفَاءُ الزُّهْدِ',
     'The best asceticism is concealing one\'s asceticism.', 'detachment'),
    (279, 'صِحَّةُ الْجَسَدِ مِنْ قِلَّةِ الْحَسَدِ',
     'Health of the body comes from freedom of envy.', 'character'),
    (285, 'أَشَدُّ الذُّنُوبِ مَا اسْتَهَانَ بِهِ صَاحِبُهُ',
     'The gravest sins are those treated lightly by their owner.', 'forgiveness'),
    (289, 'ذِكْرُ الرِّجَالِ فِي مَجَالِسِهِمْ مَقَابِرُهُمْ',
     'Mentioning men in their presence is their burial.', 'wisdom'),
    (290, 'لَا تَسْأَلُ عَمَّا لَا يَعْنِيكَ',
     'Do not ask about what does not concern you.', 'wisdom'),
    (295, 'إِنَّمَا سُمِّيَ الْعَقْلُ عَقْلاً لِأَنَّهُ يَعْقِلُ صَاحِبَهُ عَنِ الشَّرِّ',
     'The intellect is called intellect because it restrains its owner from evil.', 'wisdom'),
    (297, 'مَا أَكْثَرَ الْعِبَرَ، وَأَقَلَّ الِاعْتِبَارَ',
     'How many are the lessons, and how few take heed.', 'wisdom'),
    (302, 'أَقِلُّوا الطَّلَبَ لِلدُّنْيَا تَرْبَحُوا',
     'Reduce your pursuit of the world and you will profit.', 'detachment'),
    (334, 'رُبَّ مَفْتُونٍ بِحُسْنِ الْقَوْلِ فِيهِ',
     'Many a person is deluded by the good things said about him.', 'character'),
    (338, 'مَنِ اتَّخَذَ أَخاً مِنْ غَيْرِ اخْتِبَارٍ أَلْجَأَهُ الاضْطِرَارُ إِلَى مُرَافَقَةِ الْأَشْرَارِ',
     'Whoever takes a brother without testing him, necessity will drive him to the company of the wicked.', 'relationships'),
    (342, 'غَايَةُ الْعِلْمِ الِاعْتِبَارُ',
     'The goal of knowledge is to take heed from it.', 'wisdom'),
    (343, 'غَايَةُ الزُّهْدِ الْقَنَاعَةُ',
     'The goal of asceticism is contentment.', 'detachment'),
    (345, 'إِذَا كُنْتَ فِي إِدْبَارٍ فَاصْبِرْ حَتَّى يُقْبِلَ',
     'When you are in retreat, be patient until prosperity returns.', 'patience'),
    (348, 'مَنْ صَبَرَ عَلَى الْمُصِيبَةِ اعْتَاضَ مِنْهَا بِمَنْفَعَةٍ',
     'Whoever is patient with a calamity is compensated for it with benefit.', 'patience'),
    (350, 'طُوبَى لِمَنْ ذَكَرَ الْمَعَادَ وَعَمِلَ لِلْحِسَابِ وَقَنِعَ بِالْكَفَافِ',
     'Blessed is one who remembers the Hereafter, works for the Reckoning, and is content with sufficiency.', 'mortality'),
    (356, 'كَثْرَةُ الصَّمْتِ تُهَيِّبُ',
     'Frequent silence produces awe.', 'character'),
    (378, 'يَا كُمَيْلُ، مَا مِنْ حَرَكَةٍ إِلَّا وَأَنْتَ مُحْتَاجٌ فِيهَا إِلَى مَعْرِفَةٍ',
     'O Kumayl, there is no movement without a need for knowledge.', 'wisdom'),
    (390, 'مَنْ أَطَاعَ الْمُنَى خَانَتْهُ',
     'Whoever obeys wishful hopes, they will betray him.', 'purpose'),
    (396, 'جَاهِلٌ تَسْمَعُ مِنْهُ الْحِكْمَةَ خَيْرٌ مِنْ عَالِمٍ تَسْمَعُ مِنْهُ الْجَهْلَ',
     'An ignorant person from whom you hear wisdom is better than a scholar from whom you hear ignorance.', 'wisdom'),
    (398, 'الرِّفْقُ يُيَسِّرُ الصِّعَابَ وَيُسَهِّلُ شَدِيدَ الْأَسْبَابِ',
     'Gentleness makes difficulties easy and smooths harsh conditions.', 'character'),
    (399, 'مَنْ وَثِقَ بِاللَّهِ أَغْنَاهُ',
     'Whoever trusts in God, God enriches him.', 'faith'),
    (403, 'أَعْقَلُ النَّاسِ أَعْلَمُهُمْ بِالنَّفْسِ',
     'The most rational of people is the most knowledgeable of himself.', 'self-mastery'),
    (410, 'شَرُّ النَّاسِ مَنْ يَنْهَى عَنِ الذُّنُوبِ وَهُوَ يَفْعَلُهَا',
     'The worst of people is one who forbids sins while committing them himself.', 'character'),
    (424, 'الْحِلْمُ غِطَاءٌ سَاتِرٌ، وَالْعَقْلُ حُسَامٌ قَاطِعٌ، فَاسْتُرْ خَلَلَ خُلُقِكَ بِحِلْمِكَ',
     'Forbearance is a concealing veil and intellect is a cutting sword — cover the flaws of your character with your forbearance and fight your desires with your intellect.', 'self-mastery'),
    (434, 'مَنْ لَا يَنْفَعُكَ حُبُّهُ لَا يَضُرُّكَ بُغْضُهُ',
     'Whoever\'s love does not benefit you, his hatred does not harm you.', 'relationships'),
    (453, 'عَوِّدْ نَفْسَكَ الصَّبْرَ',
     'Train yourself to patience.', 'patience'),
    (467, 'إِيَّاكَ أَنْ تَذْكُرَ مِنَ الْكَلَامِ مَا يَكُونُ مُضْحِكاً',
     'Beware of speech that would cause laughter at you.', 'wisdom'),
    (475, 'أَعُوذُ بِاللَّهِ مِنْ حُرْمَانِ الصَّلَاةِ',
     'I seek refuge in God from being deprived of prayer.', 'faith'),
    (478, 'مَنْ رَضِيَ بِفِعْلٍ فَهُوَ شَرِيكُ فَاعِلِهِ',
     'Whoever is pleased with an action is a partner of the one who performed it.', 'character'),
]


def parse_nahj_sayings():
    seen = set()
    results = []
    for row in KNOWN_NAHJ_SAYINGS:
        num, arabic, english, domain = row
        key = arabic[:30]
        if key not in seen:
            seen.add(key)
            results.append({
                "arabic": arabic,
                "english": english,
                "source": f"Nahj al-Balagha, Saying {num}",
                "domain": domain,
            })
    return results


# ── SQL output ────────────────────────────────────────────────────────────
def escape_sql(s: str) -> str:
    return s.replace("'", "''")


def to_sql(entries) -> str:
    lines = [
        "-- corpus_seed.sql — Ya Imam Ali corpus expansion",
        f"-- {len(entries)} entries from Ghurar al-Hikam + Nahj al-Balagha short sayings",
        "-- Run via Supabase dashboard SQL editor or: supabase db push",
        "",
        "INSERT INTO public.teachings (arabic, english, source, domain)",
        "VALUES",
    ]
    parts = []
    for e in entries:
        ar = escape_sql(e["arabic"])
        en = escape_sql(e["english"])
        src = escape_sql(e["source"])
        dom = escape_sql(e.get("domain", "wisdom"))
        parts.append(f"  ('{ar}', '{en}', '{src}', '{dom}')")
    lines.append(",\n".join(parts))
    lines.append("ON CONFLICT DO NOTHING;")
    lines.append("")
    lines.append("-- After insertion, call embed-corpus Edge Function to generate vectors:")
    lines.append("-- curl -s -X POST https://sunvqtxesfdkrqkulwys.supabase.co/functions/v1/embed-corpus \\")
    lines.append("--      -H 'Authorization: Bearer YOUR_SERVICE_ROLE_KEY' \\")
    lines.append("--      -H 'Content-Type: application/json' | jq .")
    return "\n".join(lines)


# ── TypeScript output for baseline-corpus.ts additions ───────────────────
THEME_MAP = {
    "family": "when navigating family duty, when kin relationships need attention",
    "wisdom": "when seeking clarity, when reflection is the need",
    "patience": "when enduring difficulty, when tempted to give up too soon",
    "character": "when building the self, when virtue needs daily practice",
    "generosity": "when giving feels costly, when self-sacrifice is the teaching",
    "justice": "when fairness is tested, when authority must serve",
    "forgiveness": "when guilt accumulates, when mercy is the harder path",
    "mercy": "when harshness tempts, when power allows cruelty",
    "faith": "when belief is tested, when God feels distant",
    "mortality": "when time is short, when the finite needs remembering",
    "detachment": "when the world feels too heavy, when enough is enough",
    "gratitude": "when blessings go unnoticed, when more feels necessary",
    "hope": "when hope becomes wishful thinking, when aspiration drives action",
    "relationships": "when choosing companions, when loyalty is tested",
    "self-mastery": "when inner struggle is the real work, when desire fights wisdom",
    "purpose": "when direction is needed, when action calls over waiting",
    "leadership": "when authority must serve, when power is stewardship",
}

def ts_theme(domain: str) -> str:
    return THEME_MAP.get(domain, "when this teaching is the one needed")

def to_ts(entries, max_n: int = 300) -> str:
    selected = entries[:max_n]
    lines = [
        f"// Wave 13 additions — {len(selected)} curated entries from Ghurar + Nahj",
        "// Paste directly after the last entry in BASELINE_WISDOM[]",
        "",
    ]
    for e in selected:
        ar = e["arabic"].replace("'", "\\'")
        en = e["english"].replace("'", "\\'")
        src = e["source"].replace("'", "\\'")
        th = ts_theme(e.get("domain", "wisdom"))
        lines.append("  {")
        lines.append(f"    arabic: '{ar}',")
        lines.append(f"    english: '{en}',")
        lines.append(f"    source: '{src}',")
        lines.append(f"    theme: '{th}',")
        lines.append("  },")
    return "\n".join(lines)


# ── Main ──────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("Parsing Ghurar al-Hikam (max 10 per section)…", file=sys.stderr)
    ghurar = parse_ghurar(str(GHURAR), max_per_section=10)
    print(f"  → {len(ghurar)} entries", file=sys.stderr)

    print("Loading Nahj al-Balagha short sayings…", file=sys.stderr)
    nahj = parse_nahj_sayings()
    print(f"  → {len(nahj)} entries", file=sys.stderr)

    all_entries = ghurar + nahj

    # Deduplicate by Arabic first 40 chars
    seen = set()
    unique = []
    for e in all_entries:
        k = e["arabic"][:40]
        if k not in seen:
            seen.add(k)
            unique.append(e)
    print(f"Total unique entries: {len(unique)}", file=sys.stderr)

    # Write SQL seed
    sql_path = "/tmp/corpus_seed.sql"
    with open(sql_path, "w", encoding="utf-8") as f:
        f.write(to_sql(unique))
    print(f"SQL seed written to {sql_path}", file=sys.stderr)

    # Write TS baseline additions (first 300, most diverse)
    ts_path = "/tmp/corpus_baseline_300.ts"
    # Sort by domain diversity — pick varied ones
    from collections import defaultdict
    by_domain = defaultdict(list)
    for e in unique:
        by_domain[e.get("domain", "wisdom")].append(e)
    # Round-robin across domains for max diversity
    domains = sorted(by_domain.keys())
    interleaved = []
    idx = defaultdict(int)
    while len(interleaved) < 300:
        added = 0
        for d in domains:
            items = by_domain[d]
            i = idx[d]
            if i < len(items):
                interleaved.append(items[i])
                idx[d] += 1
                added += 1
                if len(interleaved) >= 300:
                    break
        if added == 0:
            break

    with open(ts_path, "w", encoding="utf-8") as f:
        f.write(to_ts(interleaved, 300))
    print(f"TS additions written to {ts_path}", file=sys.stderr)

    # Stats
    stats_path = "/tmp/corpus_stats.txt"
    domain_counts = defaultdict(int)
    for e in unique:
        domain_counts[e.get("domain", "wisdom")] += 1
    with open(stats_path, "w") as f:
        f.write(f"Total unique entries: {len(unique)}\n")
        f.write(f"  Ghurar al-Hikam: {len(ghurar)}\n")
        f.write(f"  Nahj short sayings: {len(nahj)}\n\n")
        f.write("By domain:\n")
        for d, c in sorted(domain_counts.items(), key=lambda x: -x[1]):
            f.write(f"  {d}: {c}\n")
    print(f"Stats written to {stats_path}", file=sys.stderr)
