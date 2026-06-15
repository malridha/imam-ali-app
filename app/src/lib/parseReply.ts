import type { EmotionalState } from '../types/paths'

export type ParsedVerse = {
  arabic: string
  english: string
  source: string
}

export type ParsedReply = {
  text: string
  state?: EmotionalState
  verse?: ParsedVerse
  avatarVerse?: ParsedVerse
}

const KNOWN_STATES = new Set<EmotionalState>(['grief', 'anxiety', 'peace', 'joy'])

export function parseReply(raw: string): ParsedReply {
  let text = raw

  // STATE:::peace|grief|anxiety|joy
  let state: EmotionalState | undefined
  const stateMatch = text.match(/STATE:::\s*([a-zA-Z]+)/)
  if (stateMatch) {
    const candidate = stateMatch[1].toLowerCase() as EmotionalState
    if (KNOWN_STATES.has(candidate)) state = candidate
    text = text.replace(stateMatch[0], '')
  }

  // VERSE:::arabic:::english:::source
  let verse: ParsedVerse | undefined
  const verseMatch = text.match(/VERSE:::([^:\n]+):::([^:\n]+):::([^\n]+)/)
  if (verseMatch) {
    verse = {
      arabic: verseMatch[1].trim(),
      english: verseMatch[2].trim(),
      source: verseMatch[3].trim(),
    }
    text = text.replace(verseMatch[0], '')
  }

  // AVATAR:::arabic:::english:::source — small verse shown beside the avatar
  let avatarVerse: ParsedVerse | undefined
  const avatarMatch = text.match(/AVATAR:::([^:\n]+):::([^:\n]+):::([^\n]+)/)
  if (avatarMatch) {
    avatarVerse = {
      arabic: avatarMatch[1].trim(),
      english: avatarMatch[2].trim(),
      source: avatarMatch[3].trim(),
    }
    text = text.replace(avatarMatch[0], '')
  }

  text = text.replace(/\n{3,}/g, '\n\n').trim()
  return { text, state, verse, avatarVerse }
}
