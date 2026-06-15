// v24 §49.3 — Country-tradition density priors.
//
// Initial TSP scores applied at first login based on country (resolved
// from the request's `accept-language` header or a client-sent locale
// hint). These are STARTING POINTS only — they are updated rapidly
// within the first session based on actual vocabulary and behaviour.
// A Sunni user in Iraq will quickly be detected despite the high SR
// prior; a Shia user in Saudi Arabia will be detected within 2-3
// messages.
//
// Country codes are ISO 3166-1 alpha-2.

import type { TSP } from '../../types/tsp'

type Prior = { sr: number; sur: number; smr: number }

// Defaults when no country can be inferred — perfectly neutral.
const NEUTRAL: Prior = { sr: 50, sur: 50, smr: 50 }

// Per-country priors. These reflect rough demographic majorities and
// long-running mystical traditions per country. Numbers are deliberate
// starting points, not claims about individuals. The detection layer
// adjusts within a couple of messages.
const PRIORS: Record<string, Prior> = {
  // Shia-majority countries — high SR prior
  IR: { sr: 80, sur: 30, smr: 55 }, // Iran — Shia + strong mystical tradition
  IQ: { sr: 70, sur: 40, smr: 50 }, // Iraq — Shia majority but mixed
  AZ: { sr: 70, sur: 40, smr: 45 }, // Azerbaijan
  BH: { sr: 70, sur: 40, smr: 45 }, // Bahrain
  LB: { sr: 60, sur: 55, smr: 50 }, // Lebanon — mixed
  PK: { sr: 45, sur: 65, smr: 60 }, // Pakistan — Sunni majority but large Shia minority + Sufi
  IN: { sr: 45, sur: 60, smr: 55 }, // India — mixed + significant Sufi tradition
  // Sunni-majority countries — high SuR prior
  SA: { sr: 25, sur: 85, smr: 30 }, // Saudi Arabia
  EG: { sr: 30, sur: 80, smr: 60 }, // Egypt — Sunni majority + strong Sufi
  TR: { sr: 35, sur: 75, smr: 75 }, // Turkey — Sunni + very strong Sufi
  MA: { sr: 30, sur: 80, smr: 65 }, // Morocco — Sunni + Sufi (Idrisi)
  DZ: { sr: 30, sur: 80, smr: 55 }, // Algeria
  TN: { sr: 30, sur: 80, smr: 50 }, // Tunisia
  JO: { sr: 35, sur: 75, smr: 45 }, // Jordan
  SY: { sr: 45, sur: 65, smr: 55 }, // Syria
  YE: { sr: 50, sur: 60, smr: 45 }, // Yemen — mixed
  KW: { sr: 40, sur: 70, smr: 45 }, // Kuwait
  AE: { sr: 35, sur: 75, smr: 50 }, // UAE
  QA: { sr: 35, sur: 75, smr: 45 }, // Qatar
  OM: { sr: 30, sur: 70, smr: 50 }, // Oman (Ibadi majority — treat as Sunni-leaning here)
  // Sufi-strong countries (with Sunni majority)
  SN: { sr: 25, sur: 70, smr: 80 }, // Senegal — Tijani / Muridi orders
  ML: { sr: 25, sur: 70, smr: 75 }, // Mali
  NG: { sr: 30, sur: 70, smr: 60 }, // Nigeria
  // Western and global-diaspora countries — neutral; detection drives everything
  US: NEUTRAL,
  GB: NEUTRAL,
  CA: NEUTRAL,
  AU: NEUTRAL,
  FR: NEUTRAL,
  DE: NEUTRAL,
}

const RTL_LANG_TO_COUNTRY: Record<string, string> = {
  fa: 'IR',
  ur: 'PK',
  ar: 'SA', // Arabic without region → conservative default (Sunni majority globally)
}

/**
 * Resolve a prior from a country code OR from an accept-language tag.
 * Tries:
 *   1. Direct country code (ISO 3166-1 alpha-2)
 *   2. Language-region pair from the accept-language header, e.g. ar-IQ
 *   3. Language-only fallback (ar → SA, fa → IR, ur → PK)
 *   4. Neutral
 */
export function priorFromLocale(input: string | null | undefined): Prior {
  if (!input) return NEUTRAL
  const raw = input.trim()
  if (!raw) return NEUTRAL

  // Direct ISO country code (exactly 2 letters)
  if (/^[A-Za-z]{2}$/.test(raw)) {
    return PRIORS[raw.toUpperCase()] ?? NEUTRAL
  }

  // Accept-language can be: "ar-IQ", "ar-IQ,en-US;q=0.9", "fa", etc.
  const firstTag = raw.split(',')[0].split(';')[0].trim()
  const [lang, region] = firstTag.split('-')
  if (region && /^[A-Za-z]{2}$/.test(region)) {
    const fromRegion = PRIORS[region.toUpperCase()]
    if (fromRegion) return fromRegion
  }
  const fallbackCountry = RTL_LANG_TO_COUNTRY[lang?.toLowerCase()]
  if (fallbackCountry && PRIORS[fallbackCountry]) {
    return PRIORS[fallbackCountry]
  }
  return NEUTRAL
}

/**
 * Apply a country prior to a freshly-created TSP. Idempotent — only
 * runs when `country_prior_applied` is false. Leaves an already-tuned
 * profile alone (we never overwrite real signal with a demographic
 * guess).
 */
export function applyCountryPrior(tsp: TSP, locale: string | null | undefined): TSP {
  if (tsp.country_prior_applied) return tsp
  const prior = priorFromLocale(locale)
  return {
    ...tsp,
    sr: prior.sr,
    sur: prior.sur,
    smr: prior.smr,
    country_prior_applied: true,
  }
}
