import type { AnimalInstance, Friendship, Visit } from '@/types/models'
import { SPECIES_FAMILIES, getSpeciesById } from '@/data/species'

export interface AchievementContext {
  animals: AnimalInstance[]
  visits: Visit[]
  friendships: Friendship[]
}

function countDistinctVisitDays(visits: Visit[]): number {
  const days = new Set(visits.map((visit) => new Date(visit.timestamp).toDateString()))
  return days.size
}

function ownsEveryFamily(animals: AnimalInstance[]): boolean {
  const ownedAssetKeys = new Set(
    animals.map((animal) => getSpeciesById(animal.speciesId)?.assetKey).filter(Boolean),
  )
  return SPECIES_FAMILIES.every((family) => ownedAssetKeys.has(family.assetKey))
}

/**
 * Current consecutive-day visit streak. Counts backward from today if
 * there's already a visit today, otherwise from yesterday (a grace day so
 * the streak doesn't visually vanish before today is even over) — stops at
 * the first missed day.
 */
export function computeVisitStreak(visits: Visit[], now: number = Date.now()): number {
  const days = new Set(visits.map((visit) => new Date(visit.timestamp).toDateString()))
  const cursor = new Date(now)
  if (!days.has(cursor.toDateString())) {
    cursor.setDate(cursor.getDate() - 1)
    if (!days.has(cursor.toDateString())) return 0
  }
  let streak = 0
  while (days.has(cursor.toDateString())) {
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

/**
 * Pure achievement rules — no store/UI access, same pattern as claimVisit.ts.
 * `alreadyUnlocked` filters out ids already granted so repeated checks don't
 * re-evaluate work that's already done; returns only the NEWLY qualifying ids.
 */
export function evaluateAchievements(context: AchievementContext, alreadyUnlocked: Set<string>): string[] {
  const qualifies: Record<string, boolean> = {
    'first-catch': context.animals.length >= 1,
    'first-evolution': context.animals.some((animal) => animal.stage === 2),
    'three-day-explorer': countDistinctVisitDays(context.visits) >= 3,
    'made-a-friend': context.friendships.length >= 1,
    'zoo-curator': context.animals.filter((animal) => animal.zooPosition !== null).length >= 5,
    'seven-day-streak': computeVisitStreak(context.visits) >= 7,
    'caught-em-all': ownsEveryFamily(context.animals),
  }

  return Object.entries(qualifies)
    .filter(([id, qualifies_]) => qualifies_ && !alreadyUnlocked.has(id))
    .map(([id]) => id)
}
