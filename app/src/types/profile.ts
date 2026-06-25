// User-volunteered context, stored locally only. Optional and skippable —
// never gates entry to the app itself. Collected once at first launch
// (Onboarding) and editable any time after via Settings.

export type AgeRange = '13-17' | '18-24' | '25-44' | '45-64' | '65+'
export type Gender = 'male' | 'female' | 'unspecified'

export type UserProfile = {
  name: string | null
  /** ISO date string (YYYY-MM-DD). Never sent to the server — only the
   *  derived age-range bucket is (see computeAgeRange). */
  dob: string | null
  gender: Gender | null
}

export const NEUTRAL_PROFILE: UserProfile = {
  name: null,
  dob: null,
  gender: null,
}

export const GENDER_LABELS: Record<Gender, { en: string; ar: string }> = {
  male: { en: 'Male', ar: 'ذكر' },
  female: { en: 'Female', ar: 'أنثى' },
  unspecified: { en: 'Prefer not to say', ar: 'أفضل عدم القول' },
}

/**
 * Buckets a date of birth into a coarse age range for the companion's
 * context. Deliberately lossy — the server only ever sees the bucket,
 * never the raw date. Returns null for invalid/missing input or for an
 * implausible age (under 13), so no bucket is sent in that case.
 */
export function computeAgeRange(dob: string | null): AgeRange | null {
  if (!dob) return null
  const birth = new Date(dob)
  if (Number.isNaN(birth.getTime())) return null

  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  const monthDiff = now.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) age--

  if (age < 13) return null
  if (age <= 17) return '13-17'
  if (age <= 24) return '18-24'
  if (age <= 44) return '25-44'
  if (age <= 64) return '45-64'
  return '65+'
}
