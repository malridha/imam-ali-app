-- ============================================================
-- Step 7a · Corpus database
-- Enable pgvector, create the `teachings` table, seed it with
-- the verified corpus from the brief's Wisdom Domain Map.
-- ============================================================

create extension if not exists vector;

create table if not exists public.teachings (
  id          bigserial primary key,
  arabic      text not null,
  english     text not null,
  source      text not null,   -- e.g. 'Nahj al-Balagha', 'Ghurar al-Hikam', 'Diwan'
  domain      text,             -- e.g. 'anxiety', 'grief', 'anger'
  embedding   vector(384),      -- gte-small dim; populated in Step 7b
  created_at  timestamptz default now()
);

-- Row Level Security: closed to everyone. The Edge Function reads with
-- the service role key, which bypasses RLS. Anon clients have no access.
alter table public.teachings enable row level security;

-- Seed: 14 verified teachings drawn from the brief's Wisdom Domain Map
-- and the seed corpus in the conversation system prompts.
insert into public.teachings (arabic, english, source, domain) values
  ('لَا تَشْغَلْ قَلْبَكَ بِمَا لَمْ يَكُنْ، فَإِنَّ ذَلِكَ يُضْعِفُكَ عَمَّا قَدْ كَانَ',
   'Do not occupy your heart with what has not happened — it weakens you against what is already here.',
   'Ghurar al-Hikam',
   'anxiety'),

  ('الصَّبْرُ مِنَ الإِيمَانِ كَالرَّأْسِ مِنَ الجَسَدِ',
   'Patience is to faith what the head is to the body.',
   'Nahj al-Balagha',
   'grief'),

  ('أَشْجَعُ النَّاسِ مَنْ غَلَبَ هَوَاهُ',
   'The bravest of people is the one who conquers their own desires.',
   'Ghurar al-Hikam',
   'anger'),

  ('قِيمَةُ كُلِّ امْرِئٍ مَا يُحْسِنُهُ',
   'The worth of every person is in what they do well.',
   'Nahj al-Balagha Hikma 81',
   'purpose'),

  ('مَنْ كَرُمَتْ عَلَيْهِ نَفْسُهُ هَانَتْ عَلَيْهِ الدُّنْيَا',
   'Whoever honours their own self, the world becomes insignificant to them.',
   'Nahj al-Balagha',
   'self-worth'),

  ('لَا تَنْظُرْ إِلَى مَنْ فَاقَكَ فِي الدُّنْيَا',
   'Do not look upon those who are ahead of you in worldly things.',
   'Ghurar al-Hikam',
   'comparison'),

  ('الشَّكُّ جُزْءٌ مِنَ الطَّرِيقِ إِلَى اليَقِينِ',
   'Doubt is part of the path to certainty.',
   'Attributed tradition',
   'faith'),

  ('لَا وَحْشَةَ لِمَنْ أَنِسَ بِاللَّهِ',
   'There is no loneliness for one who finds intimacy with God.',
   'Diwan of Imam Ali',
   'loneliness'),

  ('الغِنَى فِي الغُرْبَةِ وَطَنٌ، وَالفَقْرُ فِي الوَطَنِ غُرْبَةٌ',
   'Wealth in a foreign land is home; poverty at home is exile.',
   'Nahj al-Balagha',
   'financial'),

  ('إِذَا قَدَرْتَ عَلَى عَدُوِّكَ فَاجْعَلِ العَفْوَ شُكْراً لِلْقُدْرَةِ',
   'When you have power over your enemy, make forgiveness your gratitude for that power.',
   'Nahj al-Balagha',
   'forgiveness'),

  ('خَيْرُكُمْ خَيْرُكُمْ لِأَهْلِهِ',
   'The best of you is the one who is best to their family.',
   'Transmitted tradition',
   'family'),

  ('مَا هَلَكَ مَنْ عَرَفَ قَدْرَهُ',
   'No one is destroyed who knows their own worth.',
   'Ghurar al-Hikam',
   'self-worth'),

  ('النَّاسُ صِنْفَانِ، إِمَّا أَخٌ لَكَ فِي الدِّينِ أَوْ نَظِيرٌ لَكَ فِي الخَلْقِ',
   'People are of two kinds: either your brother in faith or your equal in creation.',
   'Nahj al-Balagha Letter 53',
   'relationships'),

  ('مَنْ عَرَفَ نَفْسَهُ فَقَدْ عَرَفَ رَبَّهُ',
   'Whoever knows themselves, knows their Lord.',
   'Attributed to Imam Ali',
   'self-knowledge');
