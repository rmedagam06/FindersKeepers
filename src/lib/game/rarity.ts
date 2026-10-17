import type { LocationCategory, Rarity, Species } from '@/types/models'

export const RARITY_WEIGHTS: Record<Rarity, number> = {
  common: 70,
  uncommon: 25,
  rare: 5,
}

/** Rolls one species from the pool of species flavored for this location category, weighted by rarity. `random` is injectable for deterministic tests. */
export function rollSpeciesForCategory(
  category: LocationCategory,
  catalog: Species[],
  random: () => number = Math.random,
): Species {
  const pool = catalog.filter((species) => species.flavorCategories.includes(category) && species.stage === 1)
  if (pool.length === 0) {
    throw new Error(`No stage-1 species configured for category "${category}"`)
  }

  const totalWeight = pool.reduce((sum, species) => sum + RARITY_WEIGHTS[species.rarity], 0)
  let roll = random() * totalWeight
  for (const species of pool) {
    roll -= RARITY_WEIGHTS[species.rarity]
    if (roll <= 0) return species
  }
  return pool[pool.length - 1]
}
