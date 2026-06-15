// v24 §49 Phase A — TSP detection and update logic.
//
// This file mirrors the client-side TSP module at src/lib/tsp/. It is
// intentionally inlined here (rather than imported across the
// monorepo) because Supabase Edge Functions bundle a function's
// folder on deploy and don't share code with the React app's tree.
// Keep the two copies semantically aligned — the keyword catalogue
// and signal mechanics must match. When updating either side, mirror
// the change across both files.

export type SelfIdentified = 'shia' | 'sunni' | 'mixed' | null
export type AttributionLock = 'imam_ali_as' | 'ali_ra' | 'mawla_ali' | null
export type DominantAxis = 'shia' | 'sunni' | 'sufi' | 'mixed' | 'neutral'

export type TSP = {
  sr: number
  sur: number
  smr: number
  session_count: number
  expansion_active: boolean
  self_identified: SelfIdentified
  lock_attribution: AttributionLock
  dominant_axis: DominantAxis
  country_prior_applied: boolean
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

// ── Keyword catalogue ──────────────────────────────────────────────

type Delta = { sr?: number; sur?: number; smr?: number }
type Keyword = { match: string; boundary: 'word' | 'substring'; delta: Delta }

const SHIA_KEYWORDS: Keyword[] = [
  { match: 'Mola Ali',     boundary: 'word',      delta: { sr: 3, sur: -1 } },
  { match: 'Mawla Ali',    boundary: 'word',      delta: { sr: 3, sur: -1 } },
  { match: 'Imam Husayn',  boundary: 'word',      delta: { sr: 3, sur: -1 } },
  { match: 'Imam Hussain', boundary: 'word',      delta: { sr: 3, sur: -1 } },
  { match: 'Karbala',      boundary: 'word',      delta: { sr: 3, sur: -1 } },
  { match: 'Ghadir',       boundary: 'word',      delta: { sr: 3, sur: -1 } },
  { match: 'Imamate',      boundary: 'word',      delta: { sr: 3, sur: -1 } },
  { match: 'Ahlul Bayt',   boundary: 'word',      delta: { sr: 3, sur: -1 } },
  { match: 'Ahl al-Bayt',  boundary: 'word',      delta: { sr: 3, sur: -1 } },
  { match: '21 Ramadan',   boundary: 'word',      delta: { sr: 3, sur: -1 } },
  { match: '13 Rajab',     boundary: 'word',      delta: { sr: 3, sur: -1 } },
  { match: 'مولى علي',     boundary: 'substring', delta: { sr: 3, sur: -1 } },
  { match: 'مولاي علي',    boundary: 'substring', delta: { sr: 3, sur: -1 } },
  { match: 'كربلاء',       boundary: 'substring', delta: { sr: 3, sur: -1 } },
  { match: 'الإمام الحسين', boundary: 'substring', delta: { sr: 3, sur: -1 } },
  { match: 'أهل البيت',    boundary: 'substring', delta: { sr: 3, sur: -1 } },
  { match: 'الغدير',       boundary: 'substring', delta: { sr: 3, sur: -1 } },
  { match: 'عليه السلام',  boundary: 'substring', delta: { sr: 2, sur: -1 } },
]

const SUNNI_KEYWORDS: Keyword[] = [
  { match: 'Ali RA',           boundary: 'word', delta: { sur: 3, sr: -1 } },
  { match: 'Sayyiduna Ali',    boundary: 'word', delta: { sur: 3, sr: -1 } },
  { match: 'fourth Caliph',    boundary: 'word', delta: { sur: 3, sr: -1 } },
  { match: 'Rashidun',         boundary: 'word', delta: { sur: 3, sr: -1 } },
  { match: 'the companions',   boundary: 'word', delta: { sur: 2, sr: -1 } },
  { match: 'Abu Bakr',         boundary: 'word', delta: { sur: 2 } },
  { match: 'Umar ibn',         boundary: 'word', delta: { sur: 2 } },
  { match: 'authentic narration', boundary: 'word', delta: { sur: 2 } },
  { match: 'رضي الله عنه',     boundary: 'substring', delta: { sur: 3, sr: -1 } },
  { match: 'الخلفاء الراشدين', boundary: 'substring', delta: { sur: 3, sr: -1 } },
  { match: 'سيدنا علي',        boundary: 'substring', delta: { sur: 3, sr: -1 } },
  { match: 'الصحابة',          boundary: 'substring', delta: { sur: 2 } },
]

const SUFI_KEYWORDS: Keyword[] = [
  { match: 'Rumi',         boundary: 'word', delta: { smr: 4 } },
  { match: 'Bulleh Shah',  boundary: 'word', delta: { smr: 4 } },
  { match: 'ishq',         boundary: 'word', delta: { smr: 4 } },
  { match: 'fana',         boundary: 'word', delta: { smr: 4 } },
  { match: 'annihilation', boundary: 'word', delta: { smr: 3 } },
  { match: 'the Sufi',     boundary: 'word', delta: { smr: 4 } },
  { match: 'inner meaning', boundary: 'word', delta: { smr: 3 } },
  { match: 'esoteric',     boundary: 'word', delta: { smr: 3 } },
  { match: 'batin',        boundary: 'word', delta: { smr: 4 } },
  { match: 'mystic',       boundary: 'word', delta: { smr: 3 } },
  { match: 'qalb',         boundary: 'word', delta: { smr: 3 } },
  { match: 'الصوفية',     boundary: 'substring', delta: { smr: 4 } },
  { match: 'العشق',       boundary: 'substring', delta: { smr: 4 } },
  { match: 'الفناء',      boundary: 'substring', delta: { smr: 4 } },
  { match: 'الباطن',      boundary: 'substring', delta: { smr: 3 } },
  { match: 'القلب',       boundary: 'substring', delta: { smr: 2 } },
]

const ALL_KEYWORDS: Keyword[] = [...SHIA_KEYWORDS, ...SUNNI_KEYWORDS, ...SUFI_KEYWORDS]

const SHIA_SELF_ID = [/\bi['’]?m\s+shia\b/i, /\bi\s+am\s+(a\s+)?shia\b/i, /\bas\s+a\s+shia\b/i, /أنا\s*شيعي/, /أنا\s*شيعية/]
const SUNNI_SELF_ID = [/\bi['’]?m\s+sunni\b/i, /\bi\s+am\s+(a\s+)?sunni\b/i, /\bas\s+a\s+sunni\b/i, /أنا\s*سني/, /أنا\s*سنية/]
const SUFI_SELF_ID = [/\bi['’]?m\s+sufi\b/i, /\bi\s+am\s+(a\s+)?sufi\b/i, /\bas\s+a\s+sufi\b/i, /أنا\s*صوفي/]

function detectSelfId(message: string): 'shia' | 'sunni' | 'sufi' | null {
  if (SHIA_SELF_ID.some((r) => r.test(message))) return 'shia'
  if (SUNNI_SELF_ID.some((r) => r.test(message))) return 'sunni'
  if (SUFI_SELF_ID.some((r) => r.test(message))) return 'sufi'
  return null
}

const PER_TURN_CAP = 8 // Per-turn signal cap (lower than per-session to avoid one message dominating).

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function countMatches(message: string, kw: Keyword): number {
  if (kw.boundary === 'substring') {
    let count = 0
    let i = 0
    const needle = kw.match
    while ((i = message.indexOf(needle, i)) !== -1) {
      count++
      i += needle.length
    }
    return count
  }
  const pattern = new RegExp(
    `(?:^|[^\\p{L}\\p{N}])${escapeRegExp(kw.match)}(?:$|[^\\p{L}\\p{N}])`,
    'giu',
  )
  return (message.match(pattern) ?? []).length
}

export function applySignals(message: string): {
  applied: { sr: number; sur: number; smr: number }
  selfId: 'shia' | 'sunni' | 'sufi' | null
} {
  const raw = { sr: 0, sur: 0, smr: 0 }
  for (const kw of ALL_KEYWORDS) {
    const hits = countMatches(message, kw)
    if (!hits) continue
    if (kw.delta.sr) raw.sr += kw.delta.sr * hits
    if (kw.delta.sur) raw.sur += kw.delta.sur * hits
    if (kw.delta.smr) raw.smr += kw.delta.smr * hits
  }
  const cap = (v: number) => Math.max(-PER_TURN_CAP, Math.min(PER_TURN_CAP, v))
  return {
    applied: { sr: cap(raw.sr), sur: cap(raw.sur), smr: cap(raw.smr) },
    selfId: detectSelfId(message),
  }
}

// ── Country priors (must match src/lib/tsp/country.ts) ────────────

type Prior = { sr: number; sur: number; smr: number }
const NEUTRAL: Prior = { sr: 50, sur: 50, smr: 50 }
const PRIORS: Record<string, Prior> = {
  IR: { sr: 80, sur: 30, smr: 55 },
  IQ: { sr: 70, sur: 40, smr: 50 },
  AZ: { sr: 70, sur: 40, smr: 45 },
  BH: { sr: 70, sur: 40, smr: 45 },
  LB: { sr: 60, sur: 55, smr: 50 },
  PK: { sr: 45, sur: 65, smr: 60 },
  IN: { sr: 45, sur: 60, smr: 55 },
  SA: { sr: 25, sur: 85, smr: 30 },
  EG: { sr: 30, sur: 80, smr: 60 },
  TR: { sr: 35, sur: 75, smr: 75 },
  MA: { sr: 30, sur: 80, smr: 65 },
  DZ: { sr: 30, sur: 80, smr: 55 },
  TN: { sr: 30, sur: 80, smr: 50 },
  JO: { sr: 35, sur: 75, smr: 45 },
  SY: { sr: 45, sur: 65, smr: 55 },
  YE: { sr: 50, sur: 60, smr: 45 },
  KW: { sr: 40, sur: 70, smr: 45 },
  AE: { sr: 35, sur: 75, smr: 50 },
  QA: { sr: 35, sur: 75, smr: 45 },
  OM: { sr: 30, sur: 70, smr: 50 },
  SN: { sr: 25, sur: 70, smr: 80 },
  ML: { sr: 25, sur: 70, smr: 75 },
  NG: { sr: 30, sur: 70, smr: 60 },
}
const RTL_LANG_TO_COUNTRY: Record<string, string> = { fa: 'IR', ur: 'PK', ar: 'SA' }

export function priorFromLocale(input: string | null | undefined): Prior {
  if (!input) return NEUTRAL
  const raw = input.trim()
  if (!raw) return NEUTRAL
  if (/^[A-Za-z]{2}$/.test(raw)) return PRIORS[raw.toUpperCase()] ?? NEUTRAL
  const firstTag = raw.split(',')[0].split(';')[0].trim()
  const [lang, region] = firstTag.split('-')
  if (region && /^[A-Za-z]{2}$/.test(region)) {
    const fromRegion = PRIORS[region.toUpperCase()]
    if (fromRegion) return fromRegion
  }
  const fallbackCountry = RTL_LANG_TO_COUNTRY[lang?.toLowerCase()]
  if (fallbackCountry && PRIORS[fallbackCountry]) return PRIORS[fallbackCountry]
  return NEUTRAL
}

// ── Main: produce next TSP given current TSP, message, and locale ─

export function updateTSP(
  current: TSP | null | undefined,
  message: string,
  locale: string | null,
): TSP {
  // Hydrate a fresh row that may have missing fields (e.g. older users
  // who existed before this column was added — defaults are baked into
  // the migration, but we belt-and-brace it here).
  let tsp: TSP = current ? { ...NEUTRAL_TSP, ...current } : { ...NEUTRAL_TSP }

  // Apply country prior on first contact only.
  if (!tsp.country_prior_applied) {
    const p = priorFromLocale(locale)
    tsp = { ...tsp, sr: p.sr, sur: p.sur, smr: p.smr, country_prior_applied: true }
  }

  // Apply signal deltas from this message.
  const { applied, selfId } = applySignals(message)
  const clamp = (v: number) => Math.max(0, Math.min(100, v))
  tsp = {
    ...tsp,
    sr: clamp(tsp.sr + applied.sr),
    sur: clamp(tsp.sur + applied.sur),
    smr: clamp(tsp.smr + applied.smr),
    last_updated: new Date().toISOString(),
  }

  // Hard self-identification override.
  if (selfId === 'shia') {
    tsp = { ...tsp, sr: Math.max(tsp.sr, 90), self_identified: 'shia', lock_attribution: 'imam_ali_as' }
  } else if (selfId === 'sunni') {
    tsp = { ...tsp, sur: Math.max(tsp.sur, 90), self_identified: 'sunni', lock_attribution: 'ali_ra' }
  } else if (selfId === 'sufi') {
    tsp = { ...tsp, smr: Math.max(tsp.smr, 90) }
  }

  // Refresh dominant axis and expansion gate.
  tsp.dominant_axis = computeDominantAxis(tsp)
  if (!tsp.expansion_active && tsp.session_count >= 20) {
    tsp.expansion_active = true
  }

  return tsp
}
