-- ============================================================
-- Step 7c · match_teachings(query_embedding, threshold, k)
-- Returns the top-k teachings whose cosine similarity to the
-- query embedding is above `threshold`, ordered most-similar first.
-- Called via supabase.rpc('match_teachings', {...}) from the
-- retrieve Edge Function.
-- ============================================================

create or replace function public.match_teachings(
  query_embedding vector(384),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  arabic text,
  english text,
  source text,
  domain text,
  similarity float
)
language sql
stable
as $$
  select
    t.id,
    t.arabic,
    t.english,
    t.source,
    t.domain,
    1 - (t.embedding <=> query_embedding) as similarity
  from public.teachings t
  where t.embedding is not null
    and 1 - (t.embedding <=> query_embedding) > match_threshold
  order by t.embedding <=> query_embedding
  limit match_count;
$$;
