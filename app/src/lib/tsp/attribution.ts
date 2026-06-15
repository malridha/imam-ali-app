// v24 §49.2 — Verse-card attribution variants.
//
// The teaching content (Arabic + English + corpus source name) stays
// identical for every user. Only the honorific that follows Imam
// Ali's name on the verse-card source line changes per the user's
// resolved TSP attribution style.
//
// Three styles:
//   imam_ali_as — "Imam Ali (عليه السلام)"  — Shia register
//   ali_ra      — "Ali ibn Abi Talib (رضي الله عنه)"  — Sunni register
//   mawla_ali   — "Mawla Ali"  — mystical / cross-tradition reverence
//
// The function operates on the raw source string the LLM emitted. It
// only rewrites the honorific portion and leaves the corpus name
// (Nahj al-Balagha, Ghurar al-Hikam, Diwan) untouched.

import type { AttributionLock } from '../../types/tsp'

// Patterns the LLM emits naturally given the system prompt instructions.
// We're permissive on the honorific portion and conservative on
// everything outside it — we never edit the corpus name.
const HONORIFIC_PATTERNS = [
  // Arabic: عليه السلام (the Shia default the prompt uses)
  /Imam\s+Ali(?:\s+ibn\s+Abi\s+Talib)?\s*\(?\s*عليه\s+السلام\s*\)?/gi,
  // English-bracketed honorifics
  /Imam\s+Ali(?:\s+ibn\s+Abi\s+Talib)?\s*\(\s*(?:AS|peace\s+be\s+upon\s+him|PBUH|RA|RadiAllahu\s+anhu)\s*\)/gi,
  // "Imam Ali" alone
  /\bImam\s+Ali(?:\s+ibn\s+Abi\s+Talib)?\b/g,
]

const REPLACEMENT: Record<NonNullable<AttributionLock>, string> = {
  imam_ali_as: 'Imam Ali (عليه السلام)',
  ali_ra: 'Ali ibn Abi Talib (رضي الله عنه)',
  mawla_ali: 'Mawla Ali',
}

/**
 * Rewrite the honorific in a verse-card source string to match the
 * user's resolved attribution style. The corpus name stays exact.
 * No-op when style is null (keep what the LLM emitted).
 */
export function applyAttributionStyle(
  source: string,
  style: AttributionLock,
): string {
  if (!style) return source
  let out = source
  let rewritten = false
  for (const pat of HONORIFIC_PATTERNS) {
    if (rewritten) break
    if (pat.test(out)) {
      out = out.replace(pat, REPLACEMENT[style])
      rewritten = true
    }
  }
  return out
}
