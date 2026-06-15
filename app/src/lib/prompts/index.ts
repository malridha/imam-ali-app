import type { Lang } from '../../types/lang'
import { UNIFIED_SYSTEM, UNIFIED_OPENER } from './unified'
import { UNIFIED_SYSTEM_AR, UNIFIED_OPENER_AR } from './ar/unified'

export type PathPrompt = {
  system: string
  opener: string
}

/**
 * v15 — single open-conversation prompt per language. The four
 * path-specific prompts are gone. The companion reads what the person
 * needs from how they speak, not from a button they pressed.
 *
 * Section 25 + 35 of Ya_Imam_Ali_Brief_v15_Final.
 */
export const UNIFIED_PROMPTS: Record<Lang, PathPrompt> = {
  en: { system: UNIFIED_SYSTEM, opener: UNIFIED_OPENER },
  ar: { system: UNIFIED_SYSTEM_AR, opener: UNIFIED_OPENER_AR },
}

export function getPrompt(lang: Lang): PathPrompt {
  return UNIFIED_PROMPTS[lang]
}
