// v24 §49 Phase A — Tradition Sensitivity Profile types.
//
// Three independent 0-100 axes. A user can score high on multiple
// axes simultaneously (e.g. SR 70 / SuR 40 / SMR 80 — a Shia-leaning
// Sufi from Iran). The profile is silent — never shown to the user,
// never asked about directly. Built from behavioural signals and
// optional self-identification.

export type SelfIdentified = 'shia' | 'sunni' | 'mixed' | null

export type AttributionLock =
  | 'imam_ali_as'   // "Imam Ali (عليه السلام)" — Shia register
  | 'ali_ra'        // "Ali ibn Abi Talib (رضي الله عنه)" — Sunni register
  | 'mawla_ali'     // "Mawla Ali" — mystical / cross-tradition reverence
  | null

export type DominantAxis = 'shia' | 'sunni' | 'sufi' | 'mixed' | 'neutral'

export type TSP = {
  /** Shia Resonance, 0-100. */
  sr: number
  /** Sunni Resonance, 0-100. */
  sur: number
  /** Sufi / Mystical Resonance, 0-100. */
  smr: number
  /** Total completed sessions used for expansion-layer gating. */
  session_count: number
  /** True after session_count >= 20 — triggers the gentle expansion layer. */
  expansion_active: boolean
  /** Hard override set when the user volunteers their tradition. */
  self_identified: SelfIdentified
  /** When set, the verse-card attribution style is fixed regardless of axes. */
  lock_attribution: AttributionLock
  /** Highest-scoring axis. 'neutral' when no axis exceeds 60 with separation. */
  dominant_axis: DominantAxis
  /** Whether the initial country prior has been applied. */
  country_prior_applied: boolean
  /** ISO timestamp of the last update, or null if never updated. */
  last_updated: string | null
}

export const NEUTRAL_TSP: TSP = {
  sr: 50,
  sur: 50,
  smr: 50,
  session_count: 0,
  expansion_active: false,
  self_identified: null,
  lock_attribution: null,
  dominant_axis: 'neutral',
  country_prior_applied: false,
  last_updated: null,
}

/**
 * Decide the dominant axis. A profile is 'neutral' when no axis is
 * substantially elevated above the others; otherwise the highest one
 * wins. Threshold: must exceed 60 AND lead the runner-up by 10+.
 */
export function computeDominantAxis(tsp: TSP): DominantAxis {
  const { sr, sur, smr } = tsp
  const max = Math.max(sr, sur, smr)
  const sorted = [sr, sur, smr].sort((a, b) => b - a)
  const gap = sorted[0] - sorted[1]
  if (max < 60 || gap < 10) return 'neutral'
  if (max === sr) return 'shia'
  if (max === sur) return 'sunni'
  return 'sufi'
}

/**
 * Resolve the verse-card attribution style for this user. Honours an
 * explicit lock when present, otherwise reads dominant_axis.
 */
export function resolveAttributionStyle(tsp: TSP): AttributionLock {
  if (tsp.lock_attribution) return tsp.lock_attribution
  switch (tsp.dominant_axis) {
    case 'shia':
      return 'imam_ali_as'
    case 'sunni':
      return 'ali_ra'
    case 'sufi':
      return 'mawla_ali'
    default:
      // Neutral / mixed → use the universally-respectful AS form.
      return 'imam_ali_as'
  }
}
