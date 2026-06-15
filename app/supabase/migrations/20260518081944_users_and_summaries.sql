-- ============================================================
-- Step 7f.2 · Memory architecture
--
-- `users` — one row per anonymous browser. The id is the UUID the
--   client generated and persists in localStorage.
-- `session_summaries` — one row per ended chat session. Used by the
--   chat function to inject "what we know about this person" into
--   the system prompt at the start of each new session.
--
-- RLS: closed. Only the Edge Functions (running as service_role)
-- read or write these tables.
-- ============================================================

create table if not exists public.users (
  id          uuid primary key,
  lang        text,
  name        text,
  created_at  timestamptz default now(),
  last_seen   timestamptz default now()
);

create table if not exists public.session_summaries (
  id          bigserial primary key,
  user_id     uuid not null references public.users(id) on delete cascade,
  path        text not null,                 -- wisdom | poetry | venting | counsel
  summary     text,                          -- 2-3 sentences, AI-generated
  themes      text[] default '{}',           -- e.g. ['anxiety', 'work', 'aging parent']
  domain      text,                          -- primary life domain visited
  ended_at    timestamptz default now()
);

create index if not exists session_summaries_user_idx
  on public.session_summaries (user_id, ended_at desc);

alter table public.users              enable row level security;
alter table public.session_summaries  enable row level security;
