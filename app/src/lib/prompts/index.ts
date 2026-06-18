import type { Lang } from '../../types/lang'
import { UNIFIED_OPENER } from './unified'
import { UNIFIED_OPENER_AR } from './ar/unified'

// v50 (B1): the system prompt now lives server-side (in the chat Edge
// Function). The client only carries the opener — a user-message meta-prompt.
export type PathPrompt = {
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
  en: { opener: UNIFIED_OPENER },
  ar: { opener: UNIFIED_OPENER_AR },
}

export function getPrompt(lang: Lang): PathPrompt {
  return UNIFIED_PROMPTS[lang]
}
