-- ============================================================
-- Step 7h · Context Explainer
--
-- Adds two columns to the teachings corpus, per the brief's spec
-- (Section 14): every teaching should be stored with the historical
-- context (when said, to whom, in what circumstance) AND a plain-
-- language bridge to the modern user. The Context Explainer agent
-- surfaces both into the chat function's augmented system prompt so
-- the companion can frame the wisdom living rather than decorative.
--
-- Also backfills context for the 14 existing seed teachings and
-- adds 4 well-attested additions to bring us to 18 entries.
-- ============================================================

alter table public.teachings
  add column if not exists context       text,
  add column if not exists plain_bridge  text;

-- ── Backfill the 14 seed teachings ────────────────────────────

update public.teachings set
  context = 'Said in the aphorisms of Imam Ali on inner attention. He named anticipatory worry as a thief: the heart spent on what has not arrived is no longer present to meet what has.',
  plain_bridge = 'A precise diagnosis of anticipatory anxiety: rehearsing tomorrow''s dread weakens you for today''s actual demands.'
where arabic like 'لَا تَشْغَلْ قَلْبَكَ%';

update public.teachings set
  context = 'From Nahj al-Balagha. Imam Ali elevated sabr from passive endurance to the structural axis of faith — without it, faith collapses as a body collapses without its head.',
  plain_bridge = 'Patience is not resignation. It is the active capacity to carry grief while continuing to live.'
where arabic like 'الصَّبْرُ مِنَ الإِيمَانِ%';

update public.teachings set
  context = 'A defining maxim on courage. Said in the context of war as well as governance, Imam Ali redirected the meaning of bravery inward — the conquest of self over the conquest of others.',
  plain_bridge = 'The hardest fight is internal. The brave person is the one who governs themselves when anger or desire rises.'
where arabic like 'أَشْجَعُ النَّاسِ%';

update public.teachings set
  context = 'Nahj al-Balagha, Hikma 81. Spoken to his students about what determines a person''s worth — not lineage, wealth, or office, but capacity put into practice.',
  plain_bridge = 'Your worth is what you actually do well. The thread back to meaning is in what you genuinely excel at.'
where arabic like 'قِيمَةُ كُلِّ امْرِئٍ%';

update public.teachings set
  context = 'A teaching on self-respect. Imam Ali observed that when one honours their own dignity, the world loses its power to bend or shame them.',
  plain_bridge = 'When you honour your own self, the world''s opinions and pressures stop running your life.'
where arabic like 'مَنْ كَرُمَتْ عَلَيْهِ نَفْسُهُ%';

update public.teachings set
  context = 'From Ghurar al-Hikam. Imam Ali identified comparison as a specific trap and prescribed a direction of gaze rather than an emotion to suppress — look not upward at worldly things, look elsewhere.',
  plain_bridge = 'He named comparison as a trap to escape by where you look, not by what you feel.'
where arabic like 'لَا تَنْظُرْ إِلَى مَنْ فَاقَكَ%';

update public.teachings set
  context = 'Attributed tradition in the Ali corpus. Said in response to a companion troubled by doubt: doubt is not the enemy of faith but a stage on the road to certainty.',
  plain_bridge = 'Doubt is not failure of faith. It is often the road faith walks toward something more honest.'
where arabic like 'الشَّكُّ جُزْءٌ%';

update public.teachings set
  context = 'From his Diwan. Imam Ali spoke often of the soul''s solitude with God as a deeper companionship than any human presence — loneliness becomes a doorway, not a wound.',
  plain_bridge = 'Loneliness is a signal, not a verdict. It can point toward deeper intimacy, not just absence.'
where arabic like 'لَا وَحْشَةَ%';

update public.teachings set
  context = 'From Nahj al-Balagha. Imam Ali observed that wealth itself is no exile, and home itself is no shelter — circumstance, not place, is what makes a person free or trapped.',
  plain_bridge = 'Financial pressure is circumstance, not shame. It is not a verdict on who you are.'
where arabic like 'الغِنَى فِي الغُرْبَةِ%';

update public.teachings set
  context = 'Nahj al-Balagha. Imam Ali — who lived through deep betrayal, including his own murder — held that the highest expression of power is the forgiveness one chooses when they need not.',
  plain_bridge = 'Forgiveness here is not weakness or forgetting — it is the highest exercise of the strength you already have.'
where arabic like 'إِذَا قَدَرْتَ%';

update public.teachings set
  context = 'A widely transmitted teaching, central to Imam Ali''s teaching on family — exemplified by his own Letter 31 to his son Hassan. Public reputation matters far less than how one is at home.',
  plain_bridge = 'Your character is measured first by how you are at home, not by how the world sees you.'
where arabic like 'خَيْرُكُمْ خَيْرُكُمْ لِأَهْلِهِ';

update public.teachings set
  context = 'From Ghurar al-Hikam. A teaching on self-knowledge as protection: the person who understands their own worth — neither inflating nor diminishing it — cannot be undone.',
  plain_bridge = 'Knowing your own true worth is what makes you unshakeable. Not arrogance, just honest self-recognition.'
where arabic like 'مَا هَلَكَ مَنْ عَرَفَ قَدْرَهُ';

update public.teachings set
  context = 'From Letter 53, Imam Ali''s long instruction to his governor Malik al-Ashtar on just rule. He defines the moral horizon: every person is either family in faith or family in humanity.',
  plain_bridge = 'There is no third category. Every person you meet is either your kin in faith or your kin in being human.'
where arabic like 'النَّاسُ صِنْفَانِ%';

update public.teachings set
  context = 'A foundational saying in the Sufi and philosophical traditions, attributed to Imam Ali. Self-knowledge is named as the gateway to knowing the Divine.',
  plain_bridge = 'Self-knowledge is not navel-gazing — it is the doorway to the deepest knowledge there is.'
where arabic like 'مَنْ عَرَفَ نَفْسَهُ%';

-- ── 4 well-attested additions ─────────────────────────────────

insert into public.teachings (arabic, english, source, domain, context, plain_bridge) values
  ('الْعِلْمُ خَيْرٌ مِنَ الْمَالِ، الْعِلْمُ يَحْرُسُكَ وَأَنْتَ تَحْرُسُ الْمَالَ',
   'Knowledge is better than wealth: knowledge guards you, while you must guard wealth.',
   'Nahj al-Balagha Hikma 147',
   'purpose',
   'From his famous discourse to Kumayl ibn Ziyad on the priority of knowledge over material accumulation. Spoken late at night, walking in the cemetery outside Kufa.',
   'Wealth is something you have to protect. Knowledge protects you. The two have opposite directions of care.'),

  ('إِنَّ هَذِهِ الْقُلُوبَ تَمَلُّ كَمَا تَمَلُّ الْأَبْدَانُ، فَابْتَغُوا لَهَا طَرَائِفَ الْحِكْمَةِ',
   'These hearts grow weary as bodies grow weary — so seek for them refreshing pieces of wisdom.',
   'Nahj al-Balagha Hikma 91',
   'self-knowledge',
   'A pastoral teaching to his companions: the heart needs rest and renewal exactly as the body does, and the rest the heart needs is fresh wisdom — beauty, surprise, depth.',
   'Spiritual fatigue is real and normal. The remedy is not pushing harder — it is feeding the heart with something fresh.'),

  ('النَّاسُ أَعْدَاءُ مَا جَهِلُوا',
   'People are enemies of what they do not know.',
   'Nahj al-Balagha Hikma 172',
   'faith',
   'A diagnostic observation about human reactivity — rejection often comes from ignorance, not from substance. Imam Ali offered this as a caution against quick judgement of unfamiliar people, ideas, or paths.',
   'When you find yourself reflexively hostile to something, ask first whether you actually understand it.'),

  ('الصَّدِيقُ مَنْ صَدَقَ غَيْبُكَ',
   'A true friend is one who is honest about you in your absence.',
   'Imam Ali · Transmitted maxim',
   'relationships',
   'A definition of friendship widely cited from Imam Ali''s aphorisms. The measure is not what is said in your presence, where flattery is easy, but what is said when you are not there to hear it.',
   'A real friend is the one whose loyalty to your truth holds even when you are not in the room.');
