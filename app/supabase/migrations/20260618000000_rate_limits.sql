-- v50 §security — Abuse rate limiting (NOT a usage cap).
--
-- The anon key ships in the public bundle, so chat/speak are callable by
-- anyone. This protects the Claude + ElevenLabs spend from automated abuse
-- without limiting real users: thresholds are set far above any human's pace
-- (see the functions), and the check fails OPEN — if anything errors, the
-- request is allowed. When Supabase Auth + paid tiers land, paying users
-- should be exempted entirely (skip the check for authenticated/paid callers).
--
-- Fixed-window counter, locked down like every other table (service_role only).

create table if not exists public.rate_limits (
  bucket text primary key,
  count int not null default 0,
  reset_at timestamptz not null default now()
);

alter table public.rate_limits enable row level security;
revoke all on public.rate_limits from anon;
revoke all on public.rate_limits from authenticated;
revoke all on public.rate_limits from public;

-- Atomic increment-and-check. Returns TRUE when the request is allowed
-- (count within the window is <= p_max), FALSE when the limit is exceeded.
create or replace function public.rate_limit_hit(
  p_bucket text,
  p_max int,
  p_window_seconds int
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count int;
begin
  insert into public.rate_limits as r (bucket, count, reset_at)
    values (p_bucket, 1, now() + make_interval(secs => p_window_seconds))
  on conflict (bucket) do update set
    count    = case when r.reset_at < now() then 1
                    else r.count + 1 end,
    reset_at = case when r.reset_at < now() then now() + make_interval(secs => p_window_seconds)
                    else r.reset_at end
  returning r.count into v_count;
  return v_count <= p_max;
end;
$$;

revoke all on function public.rate_limit_hit(text, int, int) from anon;
revoke all on function public.rate_limit_hit(text, int, int) from authenticated;
revoke all on function public.rate_limit_hit(text, int, int) from public;
grant execute on function public.rate_limit_hit(text, int, int) to service_role;
