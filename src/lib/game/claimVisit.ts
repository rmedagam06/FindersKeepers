import type { AnimalInstance, SavedLocation, Species, VisitMethod } from '@/types/models'
import { isCooldownElapsed, isWithinArrivalRadius, MAX_MANUAL_CHECKINS_PER_WEEK, type Coordinates } from './location'
import { rollSpeciesForCategory } from './rarity'
import { XP_PER_VISIT } from './xp'

export type ClaimResult =
  | { ok: true; kind: 'catch'; species: Species }
  | { ok: true; kind: 'xp'; animalInstanceId: string; xpGained: number }
  | { ok: false; reason: 'cooldown' | 'too-far' | 'manual-limit' }

interface ClaimVisitInput {
  location: SavedLocation
  method: VisitMethod
  userCoords: Coordinates | null
  catalog: Species[]
  existingInstances: AnimalInstance[]
  recentManualVisits: number
  now?: number
  random?: () => number
}

/**
 * Pure reward-claim logic — no store/UI access. The caller (a screen today,
 * a Cloud Function once Firebase lands) re-checks cooldown/distance against
 * its own source of truth and applies the result. Never trust a client
 * timestamp for the cooldown check once this runs server-side.
 */
export function claimVisit(input: ClaimVisitInput): ClaimResult {
  const now = input.now ?? Date.now()

  if (!isCooldownElapsed(input.location.lastClaimedAt, now)) {
    return { ok: false, reason: 'cooldown' }
  }

  if (input.method === 'manual' && input.recentManualVisits >= MAX_MANUAL_CHECKINS_PER_WEEK) {
    return { ok: false, reason: 'manual-limit' }
  }

  if (input.method === 'gps') {
    const inRange =
      input.userCoords !== null &&
      isWithinArrivalRadius(
        input.userCoords,
        { lat: input.location.lat, lng: input.location.lng },
        input.location.radiusMeters,
      )
    if (!inRange) {
      return { ok: false, reason: 'too-far' }
    }
  }

  const buddy = input.existingInstances.find((instance) => instance.sourceLocationId === input.location.id)
  if (buddy) {
    return { ok: true, kind: 'xp', animalInstanceId: buddy.id, xpGained: XP_PER_VISIT }
  }

  const species = rollSpeciesForCategory(input.location.category, input.catalog, input.random)
  return { ok: true, kind: 'catch', species }
}
