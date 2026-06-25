// User-volunteered context, stored locally only. Optional and skippable —
// never gates entry. Used to give the companion a little more context on
// who it's speaking with, the same way `lang` already does.

export type AgeRange = '13-17' | '18-24' | '25-44' | '45-64' | '65+'
export type Gender = 'male' | 'female' | 'unspecified'

export type UserProfile = {
  ageRange: AgeRange | null
  gender: Gender | null
}

export const NEUTRAL_PROFILE: UserProfile = {
  ageRange: null,
  gender: null,
}

export const AGE_RANGE_LABELS: Record<AgeRange, { en: string; ar: string }> = {
  '13-17': { en: '13–17', ar: '١٣–١٧' },
  '18-24': { en: '18–24', ar: '١٨–٢٤' },
  '25-44': { en: '25–44', ar: '٢٥–٤٤' },
  '45-64': { en: '45–64', ar: '٤٥–٦٤' },
  '65+': { en: '65+', ar: '٦٥+' },
}

export const GENDER_LABELS: Record<Gender, { en: string; ar: string }> = {
  male: { en: 'Male', ar: 'ذكر' },
  female: { en: 'Female', ar: 'أنثى' },
  unspecified: { en: 'Prefer not to say', ar: 'أفضل عدم القول' },
}
