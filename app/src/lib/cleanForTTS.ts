import type { Lang } from '../types/lang'

/**
 * Strip text of things that would make ElevenLabs voices stumble or
 * vocalize weird sounds. We keep Arabic in both languages — the
 * multilingual voice model handles code-switching reasonably well, and
 * the user wants the verse spoken.
 */
export function cleanForTTS(text: string, _lang: Lang = 'en'): string {
  if (!text) return ''
  return text
    // Markdown emphasis — drop the wrappers, keep the text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    // Em-dash / en-dash → natural comma pause
    .replace(/[—–]/g, ', ')
    // Triple dot ellipsis → single ellipsis
    .replace(/\.{3,}/g, '… ')
    // Collapse whitespace
    .replace(/\s+/g, ' ')
    // Tidy stray punctuation
    .replace(/\s+([.,!?:;])/g, '$1')
    .replace(/,\s*([.,!?:;])/g, '$1')
    .trim()
}
