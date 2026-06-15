// v24 §49.3 + §50.5 — Home-screen calendar surfacing.
//
// On the welcome screen, surface today's matching calendar event if
// one exists and the user's TSP indicates resonance with it. Pure
// function — given today's Gregorian date and a TSP, return the event
// to surface or null.
//
// Logic per the brief:
//   - Universal events (tradition = 'both') surface to everyone.
//   - Shia-only events surface when SR > 55.
//   - Sunni-only events surface when SuR > 55.
//   - No event surfaces if today is not a listed date.
//
// Today's match is found by comparing today's "DD MMM YYYY" against
// the Gregorian column in each event. We try every AH year present
// in the data (1447, 1448) — whichever matches today wins.

import { EVENTS, type CalendarEvent } from '../../data/calendar'
import type { TSP } from '../../types/tsp'

function today(): Date {
  return new Date()
}

const MONTH_ABBR = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

function formatToday(d: Date): string {
  return `${d.getDate()} ${MONTH_ABBR[d.getMonth()]} ${d.getFullYear()}`
}

function matchesToday(event: CalendarEvent, todayStr: string): boolean {
  for (const greg of Object.values(event.greg)) {
    // The Gregorian strings sometimes contain multiple dates separated
    // by commas (e.g. "25, 27 Feb & 1 Mar 2027") — match the date part
    // as a substring.
    if (greg.includes(todayStr)) return true
    // Match against just "DD MMM" prefix for ranges that omit the year.
    const dayMonthOnly = todayStr.replace(/\s+\d{4}$/, '')
    if (greg.includes(dayMonthOnly)) return true
  }
  return false
}

function shouldSurface(event: CalendarEvent, tsp: TSP): boolean {
  switch (event.tradition) {
    case 'both':
      return true
    case 'shia':
      return tsp.sr > 55
    case 'sunni':
      return tsp.sur > 55
  }
}

export type SurfacedEvent = {
  event: CalendarEvent
  /** Why this event surfaced — useful for analytics and the empty case. */
  reason: 'universal' | 'tsp-aligned'
}

export function findTodaysSurfacedEvent(tsp: TSP): SurfacedEvent | null {
  const todayStr = formatToday(today())
  for (const event of EVENTS) {
    if (!matchesToday(event, todayStr)) continue
    if (!shouldSurface(event, tsp)) continue
    return {
      event,
      reason: event.tradition === 'both' ? 'universal' : 'tsp-aligned',
    }
  }
  return null
}
