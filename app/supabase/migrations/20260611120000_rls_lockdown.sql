-- ============================================================
-- v41 §70.2 — Access Control · RLS hard lockdown
--
-- Every public table is configured so that ONLY the service_role
-- (used by Edge Functions) can read or write its rows. The anon and
-- authenticated roles are revoked from every privilege. RLS is on
-- with no permissive policies — the Postgres default of deny-all
-- becomes the enforced default.
--
-- Why this matters: per v41 §70.2, 83% of Supabase security
-- incidents involve RLS misconfiguration. Our anon key is in the
-- shipping React bundle; anyone with browser devtools has it. The
-- only thing standing between an anon-key holder and every user's
-- conversation summaries is RLS + grant revocation.
--
-- Why no policies are added here: the project does not currently
-- use Supabase Auth, so there is no auth.uid() to match against
-- the user_id column. All access today is mediated by Edge
-- Functions using the service_role key (which bypasses RLS).
-- When Supabase Auth is added in a later batch, this file should
-- be followed by a second migration that adds permissive policies
-- of the form `using (user_id = auth.uid())`.
-- ============================================================

-- ── public.users ────────────────────────────────────────────
alter table public.users enable row level security;

revoke all on public.users from anon;
revoke all on public.users from authenticated;
revoke all on public.users from public;

-- ── public.session_summaries ────────────────────────────────
alter table public.session_summaries enable row level security;

revoke all on public.session_summaries from anon;
revoke all on public.session_summaries from authenticated;
revoke all on public.session_summaries from public;

-- Sequence behind the bigserial id — also lock down.
revoke all on sequence public.session_summaries_id_seq from anon;
revoke all on sequence public.session_summaries_id_seq from authenticated;
revoke all on sequence public.session_summaries_id_seq from public;

-- ── public.teachings ────────────────────────────────────────
-- The authenticated wisdom corpus. Read-only via the retrieve
-- Edge Function (which uses service_role to call match_teachings).
-- Direct anon SELECT is denied — the corpus is not a public API.
alter table public.teachings enable row level security;

revoke all on public.teachings from anon;
revoke all on public.teachings from authenticated;
revoke all on public.teachings from public;

revoke all on sequence public.teachings_id_seq from anon;
revoke all on sequence public.teachings_id_seq from authenticated;
revoke all on sequence public.teachings_id_seq from public;

-- ── Belt-and-brace: revoke EXECUTE on the RPC from anon.
-- The retrieve Edge Function calls match_teachings via service_role,
-- which bypasses these grants. Direct anon-client invocation is
-- denied at the function level too.
revoke execute on function public.match_teachings(vector, float, int) from anon;
revoke execute on function public.match_teachings(vector, float, int) from public;

-- match_teachings_with_context — the second variant referenced
-- in 20260518084121. Revoke from anon if present (best-effort).
do $$
begin
  if exists (
    select 1 from pg_proc
    where proname = 'match_teachings_with_context'
    and pronamespace = 'public'::regnamespace
  ) then
    execute 'revoke execute on function public.match_teachings_with_context(vector, float, int) from anon';
    execute 'revoke execute on function public.match_teachings_with_context(vector, float, int) from public';
  end if;
end$$;
