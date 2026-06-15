// v24 §49.7 — Vocabulary keyword catalogue.
//
// Each keyword carries a delta tuple applied per detection to the
// three TSP axes. Matching is case-insensitive, whole-word for Latin
// strings, substring for the Arabic forms. Scores are smoothed at
// the application layer — see applySignals().

import type { TSP } from '../../types/tsp'

export type Delta = { sr?: number; sur?: number; smr?: number }

export type Keyword = {
  /** The form to look for in the user message. Compared case-insensitively. */
  match: string
  /** Whether to require a word boundary (Latin) or allow substring (Arabic). */
  boundary: 'word' | 'substring'
  /** Delta applied per detection. */
  delta: Delta
}

// ── Shia-resonance triggers (per §49.7 keyword list) ───────────────
export const SHIA_KEYWORDS: Keyword[] = [
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
  // Arabic forms — substring match is fine in script with no inter-word spaces around terms.
  { match: 'مولى علي',     boundary: 'substring', delta: { sr: 3, sur: -1 } },
  { match: 'مولاي علي',    boundary: 'substring', delta: { sr: 3, sur: -1 } },
  { match: 'كربلاء',       boundary: 'substring', delta: { sr: 3, sur: -1 } },
  { match: 'الإمام الحسين', boundary: 'substring', delta: { sr: 3, sur: -1 } },
  { match: 'أهل البيت',    boundary: 'substring', delta: { sr: 3, sur: -1 } },
  { match: 'الغدير',       boundary: 'substring', delta: { sr: 3, sur: -1 } },
  { match: 'عليه السلام',  boundary: 'substring', delta: { sr: 2, sur: -1 } },
]

// ── Sunni-resonance triggers ────────────────────────────────────────
export const SUNNI_KEYWORDS: Keyword[] = [
  { match: 'Ali RA',           boundary: 'word', delta: { sur: 3, sr: -1 } },
  { match: 'Sayyiduna Ali',    boundary: 'word', delta: { sur: 3, sr: -1 } },
  { match: 'fourth Caliph',    boundary: 'word', delta: { sur: 3, sr: -1 } },
  { match: 'Rashidun',         boundary: 'word', delta: { sur: 3, sr: -1 } },
  { match: 'the companions',   boundary: 'word', delta: { sur: 2, sr: -1 } },
  { match: 'Abu Bakr',         boundary: 'word', delta: { sur: 2 } },
  { match: 'Umar ibn',         boundary: 'word', delta: { sur: 2 } },
  { match: 'authentic narration', boundary: 'word', delta: { sur: 2 } },
  // Arabic forms
  { match: 'رضي الله عنه',     boundary: 'substring', delta: { sur: 3, sr: -1 } },
  { match: 'الخلفاء الراشدين', boundary: 'substring', delta: { sur: 3, sr: -1 } },
  { match: 'سيدنا علي',        boundary: 'substring', delta: { sur: 3, sr: -1 } },
  { match: 'الصحابة',          boundary: 'substring', delta: { sur: 2 } },
]

// ── Sufi / mystical-resonance triggers ─────────────────────────────
export const SUFI_KEYWORDS: Keyword[] = [
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
  // Arabic forms
  { match: 'الصوفية',     boundary: 'substring', delta: { smr: 4 } },
  { match: 'العشق',       boundary: 'substring', delta: { smr: 4 } },
  { match: 'الفناء',      boundary: 'substring', delta: { smr: 4 } },
  { match: 'الباطن',      boundary: 'substring', delta: { smr: 3 } },
  { match: 'القلب',       boundary: 'substring', delta: { smr: 2 } },
]

export const ALL_KEYWORDS: Keyword[] = [
  ...SHIA_KEYWORDS,
  ...SUNNI_KEYWORDS,
  ...SUFI_KEYWORDS,
]

// ── Self-identification — hard overrides (§49.7) ───────────────────
// These are matched as full-message patterns. When detected, the
// caller sets self_identified and (optionally) lock_attribution.

const SHIA_SELF_ID = [
  /\bi['’]?m\s+shia\b/i,
  /\bi\s+am\s+(a\s+)?shia\b/i,
  /\bas\s+a\s+shia\b/i,
  /أنا\s*شيعي/,
  /أنا\s*شيعية/,
]

const SUNNI_SELF_ID = [
  /\bi['’]?m\s+sunni\b/i,
  /\bi\s+am\s+(a\s+)?sunni\b/i,
  /\bas\s+a\s+sunni\b/i,
  /أنا\s*سني/,
  /أنا\s*سنية/,
]

const SUFI_SELF_ID = [
  /\bi['’]?m\s+sufi\b/i,
  /\bi\s+am\s+(a\s+)?sufi\b/i,
  /\bas\s+a\s+sufi\b/i,
  /أنا\s*صوفي/,
]

export function detectSelfIdentification(
  message: string,
): 'shia' | 'sunni' | 'sufi' | null {
  if (SHIA_SELF_ID.some((r) => r.test(message))) return 'shia'
  if (SUNNI_SELF_ID.some((r) => r.test(message))) return 'sunni'
  if (SUFI_SELF_ID.some((r) => r.test(message))) return 'sufi'
  return null
}

// ── Signal application — per-session smoothing ────────────────────
// Maximum delta per axis per session is ±15 to prevent a single
// unusual session from distorting the long-running profile.
const PER_SESSION_CAP = 15

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
  // Word boundary: case-insensitive, allow any non-word separator.
  const pattern = new RegExp(
    `(?:^|[^\\p{L}\\p{N}])${escapeRegExp(kw.match)}(?:$|[^\\p{L}\\p{N}])`,
    'giu',
  )
  return (message.match(pattern) ?? []).length
}

export type SignalResult = {
  /** Aggregated raw deltas before per-session capping. */
  raw: { sr: number; sur: number; smr: number }
  /** Capped deltas actually applied. */
  applied: { sr: number; sur: number; smr: number }
  /** Self-identification detected on this turn, if any. */
  selfId: 'shia' | 'sunni' | 'sufi' | null
}

export function applySignals(message: string): SignalResult {
  const raw = { sr: 0, sur: 0, smr: 0 }
  for (const kw of ALL_KEYWORDS) {
    const hits = countMatches(message, kw)
    if (!hits) continue
    if (kw.delta.sr) raw.sr += kw.delta.sr * hits
    if (kw.delta.sur) raw.sur += kw.delta.sur * hits
    if (kw.delta.smr) raw.smr += kw.delta.smr * hits
  }
  const cap = (v: number) => Math.max(-PER_SESSION_CAP, Math.min(PER_SESSION_CAP, v))
  const applied = { sr: cap(raw.sr), sur: cap(raw.sur), smr: cap(raw.smr) }
  return { raw, applied, selfId: detectSelfIdentification(message) }
}

// ── Combine a signal result with an existing TSP ───────────────────
export function applyResultToTSP(tsp: TSP, result: SignalResult): TSP {
  const clamp = (v: number) => Math.max(0, Math.min(100, v))
  let next: TSP = {
    ...tsp,
    sr: clamp(tsp.sr + result.applied.sr),
    sur: clamp(tsp.sur + result.applied.sur),
    smr: clamp(tsp.smr + result.applied.smr),
    last_updated: new Date().toISOString(),
  }

  // Self-identification hard override (per §49.7).
  if (result.selfId === 'shia') {
    next = {
      ...next,
      sr: Math.max(next.sr, 90),
      self_identified: 'shia',
      lock_attribution: 'imam_ali_as',
    }
  } else if (result.selfId === 'sunni') {
    next = {
      ...next,
      sur: Math.max(next.sur, 90),
      self_identified: 'sunni',
      lock_attribution: 'ali_ra',
    }
  } else if (result.selfId === 'sufi') {
    next = { ...next, smr: Math.max(next.smr, 90) }
  }

  return next
}
