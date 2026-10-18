import type { AnimalInstance, SavedLocation, Species } from '@/types/models'
import { rollSpeciesForCategory, rollWildcardSpecies, WILDCARD_CHANCE } from './rarity'
import { XP_PER_VISIT } from './xp'

export type ClaimResult =
  | { kind: 'catch'; species: Species; wildcard: boolean }
  | { kind: 'xp'; animalInstanceId: string; xpGained: number }

interface ClaimVisitInput {
  location: SavedLocation
  catalog: Species[]
  existingInstances: AnimalInstance[]
  random?: () => number
}

/**
 * Pure reward-claim logic — no store/UI access. By design every check-in
 * succeeds: no distance check, no cooldown, no manual-checkin limit, so a
 * demo/test run can check in as many times as needed. First visit to a
 * location always catches; every later check-in grants XP to that
 * location's buddy animal.
 */
export function claimVisit(input: ClaimVisitInput): ClaimResult {
  const buddy = input.existingInstances.find((instance) => instance.sourceLocationId === input.location.id)
  if (buddy) {
    return { kind: 'xp', animalInstanceId: buddy.id, xpGained: XP_PER_VISIT }
  }

  const random = input.random ?? Math.random
  const isWildcard = random() < WILDCARD_CHANCE
  const species = isWildcard
    ? rollWildcardSpecies(input.catalog, random)
    : rollSpeciesForCategory(input.location.category, input.catalog, random)
  return { kind: 'catch', species, wildcard: isWildcard }
}
