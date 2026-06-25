// Local-only user profile (age range, gender). Same pattern as TSPContext:
// in-memory state mirrored to localStorage, never sent anywhere unless a
// caller explicitly reads it (the chat call does, to give the companion a
// little context). No account, no server round-trip to set it.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { NEUTRAL_PROFILE, type UserProfile } from '../types/profile'

const STORAGE_KEY = 'ya-imam-ali:profile'
const ONBOARDED_KEY = 'ya-imam-ali:onboarded'

type Ctx = {
  profile: UserProfile
  /** Merge a partial update and persist it locally. */
  setProfile: (patch: Partial<UserProfile>) => void
  /** Wipe back to unset — used by the Settings reset/privacy control. */
  resetProfile: () => void
  /** True once the first-time onboarding screen has been completed. */
  onboarded: boolean
  /** Marks onboarding complete so it never shows again on this device. */
  completeOnboarding: () => void
}

const ProfileContext = createContext<Ctx | null>(null)

function loadStored(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return NEUTRAL_PROFILE
    const parsed = JSON.parse(raw)
    return { ...NEUTRAL_PROFILE, ...parsed }
  } catch {
    return NEUTRAL_PROFILE
  }
}

function loadOnboarded(): boolean {
  try {
    return localStorage.getItem(ONBOARDED_KEY) === '1'
  } catch {
    return false
  }
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile>(loadStored)
  const [onboarded, setOnboarded] = useState<boolean>(loadOnboarded)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    } catch {
      // Quota exceeded or private mode — silently ignore.
    }
  }, [profile])

  const setProfile = useCallback((patch: Partial<UserProfile>) => {
    setProfileState((prev) => ({ ...prev, ...patch }))
  }, [])

  const resetProfile = useCallback(() => {
    setProfileState(NEUTRAL_PROFILE)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  const completeOnboarding = useCallback(() => {
    setOnboarded(true)
    try {
      localStorage.setItem(ONBOARDED_KEY, '1')
    } catch {
      // ignore — worst case the screen reappears next launch
    }
  }, [])

  const value = useMemo<Ctx>(
    () => ({ profile, setProfile, resetProfile, onboarded, completeOnboarding }),
    [profile, setProfile, resetProfile, onboarded, completeOnboarding],
  )

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export function useProfile(): Ctx {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfile must be used inside <ProfileProvider>')
  return ctx
}
