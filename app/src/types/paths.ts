export type PathKey = 'wisdom' | 'poetry' | 'venting' | 'counsel'

export type EmotionalState = 'grief' | 'anxiety' | 'peace' | 'joy'

export const PATH_META: Record<
  PathKey,
  { ar: string; en: string; icon: string; desc: string }
> = {
  wisdom: {
    ar: 'الحِكْمَة',
    en: 'Wisdom',
    icon: '🕯️',
    desc: 'I want a teaching that speaks to where I am right now',
  },
  poetry: {
    ar: 'الشِّعْر',
    en: 'Poetry',
    icon: '📖',
    desc: 'I want to receive verse and sit with its beauty',
  },
  venting: {
    ar: 'البَوْح',
    en: 'Venting',
    icon: '🫀',
    desc: 'I need to be heard — not looking for answers yet',
  },
  counsel: {
    ar: 'المَشْوَرَة',
    en: 'Counsel',
    icon: '🤲',
    desc: 'I have a situation I need to think through',
  },
}
