import type { AnimalInstance, Visit } from '@/types/models'

export type Mood = 'happy' | 'content' | 'sleepy'

const DAY_MS = 24 * 60 * 60 * 1000

/** Purely cosmetic — no stat effect, nothing is ever lost or penalized. */
export function lastInteractionAt(animal: AnimalInstance, visits: Visit[]): number {
  const latestVisit = visits
    .filter((visit) => visit.rewardGranted?.refId === animal.id)
    .reduce((max, visit) => Math.max(max, visit.timestamp), 0)
  return Math.max(animal.acquiredAt, latestVisit)
}

export function computeMood(animal: AnimalInstance, visits: Visit[], now: number = Date.now()): Mood {
  const daysSince = (now - lastInteractionAt(animal, visits)) / DAY_MS
  if (daysSince <= 3) return 'happy'
  if (daysSince <= 9) return 'content'
  return 'sleepy'
}
