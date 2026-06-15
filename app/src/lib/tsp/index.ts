// v24 §49 — TSP barrel exports for client + Edge Function consumers.

export type {
  TSP,
  SelfIdentified,
  AttributionLock,
  DominantAxis,
} from '../../types/tsp'

export {
  NEUTRAL_TSP,
  computeDominantAxis,
  resolveAttributionStyle,
} from '../../types/tsp'

export {
  applySignals,
  applyResultToTSP,
  detectSelfIdentification,
  ALL_KEYWORDS,
  SHIA_KEYWORDS,
  SUNNI_KEYWORDS,
  SUFI_KEYWORDS,
} from './keywords'

export type { Delta, Keyword, SignalResult } from './keywords'

export { priorFromLocale, applyCountryPrior } from './country'
