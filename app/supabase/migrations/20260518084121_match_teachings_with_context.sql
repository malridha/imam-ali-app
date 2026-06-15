-- ============================================================
-- Update match_teachings to also return context + plain_bridge
-- so the Context Explainer can pass them through to the chat
-- function's augmented system prompt. (Postgres requires drop +
-- create when the function's return type changes.)
-- ============================================================

drop function if exists public.match_teachings(vector, float, int);

create function public.match_teachings(
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
  context text,
  plain_bridge text,
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
    t.context,
    t.plain_bridge,
    1 - (t.embedding <=> query_embedding) as similarity
  from public.teachings t
  where t.embedding is not null
    and 1 - (t.embedding <=> query_embedding) > match_threshold
  order by t.embedding <=> query_embedding
  limit match_count;
$$;
