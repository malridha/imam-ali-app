// v24 §49 Phase A — TSP context.
//
// Holds the latest Tradition Sensitivity Profile for the current user
// in memory and mirrors it to localStorage so the welcome screen has
// it on next load without waiting for a chat call. The TSP is updated
// by the chat Edge Function on every turn and surfaced back to the
// client in the response payload — we just store and read it here.
//
// The TSP is NEVER displayed to the user. It silently drives display
// adaptations: the verse-card attribution variant and the calendar
// surfacing. A "reset profile" control in My Story clears it.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { NEUTRAL_TSP, type TSP } from '../types/tsp'

const STORAGE_KEY = 'ya-imam-ali:tsp'

type Ctx = {
  tsp: TSP
  /** Replace the in-memory TSP and persist it locally. */
  setTSP: (next: TSP) => void
  /** Wipe back to the neutral defaults — used by the My Story reset button. */
  resetTSP: () => void
}

const TSPContext = createContext<Ctx | null>(null)

function loadStored(): TSP {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return NEUTRAL_TSP
    const parsed = JSON.parse(raw)
    // Belt-and-brace: hydrate against neutral so older shapes still type-check.
    return { ...NEUTRAL_TSP, ...parsed }
  } catch {
    return NEUTRAL_TSP
  }
}

export function TSPProvider({ children }: { children: ReactNode }) {
  const [tsp, setTSPState] = useState<TSP>(loadStored)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tsp))
    } catch {
      // Quota exceeded or private mode — silently ignore.
    }
  }, [tsp])

  const setTSP = useCallback((next: TSP) => setTSPState(next), [])
  const resetTSP = useCallback(() => {
    setTSPState(NEUTRAL_TSP)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  const value = useMemo<Ctx>(() => ({ tsp, setTSP, resetTSP }), [tsp, setTSP, resetTSP])

  return <TSPContext.Provider value={value}>{children}</TSPContext.Provider>
}

export function useTSP(): Ctx {
  const ctx = useContext(TSPContext)
  if (!ctx) throw new Error('useTSP must be used inside <TSPProvider>')
  return ctx
}
