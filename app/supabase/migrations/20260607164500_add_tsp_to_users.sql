-- ============================================================
-- v24 §49 Phase A — Tradition Sensitivity Profile (TSP)
--
-- Adds a single JSONB column to public.users that holds the silent
-- per-user tradition profile. Three independent axes (each 0-100):
--   sr  — Shia Resonance
--   sur — Sunni Resonance
--   smr — Sufi / Mystical Resonance
--
-- The TSP is built up across sessions by Agent C3 (currently
-- implemented inline in the chat Edge Function). It is never shown
-- to the user. It drives silent product adaptations — currently the
-- verse-card attribution variant and the home-screen calendar
-- surfacing. Full schema documented in src/types/tsp.ts.
--
-- Schema rationale: a single JSONB column on the existing users
-- table — not a separate user_profiles table — because the
-- cardinality is strictly 1:1 and a join adds no value at this
-- scale. Easier to read in one round trip and easier to wipe on
-- account deletion. (Discussed with owner before applying.)
-- ============================================================

alter table public.users
  add column if not exists tsp jsonb not null default '{
    "sr": 50,
    "sur": 50,
    "smr": 50,
    "session_count": 0,
    "expansion_active": false,
    "self_identified": null,
    "lock_attribution": null,
    "dominant_axis": "neutral",
    "country_prior_applied": false,
    "last_updated": null
  }'::jsonb;
