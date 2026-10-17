import type { Species } from '@/types/models'

/**
 * V1 species catalog. Each species has a stage-1 (base) and stage-2
 * (evolved) entry sharing the same name/flavor, linked via evolvesToId.
 * Art for each lives at src/assets/animals/{id}/stage-{1|2}.svg — see
 * src/lib/assets.ts for the swap-in-place loading contract.
 */
export const SPECIES_CATALOG: Species[] = [
  {
    id: 'panda',
    name: 'Panda',
    rarity: 'common',
    stage: 1,
    evolvesToId: 'panda-evolved',
    flavorCategories: ['gym'],
    assetKey: 'panda',
  },
  {
    id: 'panda-evolved',
    name: 'Panda',
    rarity: 'common',
    stage: 2,
    evolvesToId: null,
    flavorCategories: ['gym'],
    assetKey: 'panda',
  },
  {
    id: 'bear',
    name: 'Bear',
    rarity: 'uncommon',
    stage: 1,
    evolvesToId: 'bear-evolved',
    flavorCategories: ['gym'],
    assetKey: 'bear',
  },
  {
    id: 'bear-evolved',
    name: 'Bear',
    rarity: 'uncommon',
    stage: 2,
    evolvesToId: null,
    flavorCategories: ['gym'],
    assetKey: 'bear',
  },
  {
    id: 'fox',
    name: 'Fox',
    rarity: 'common',
    stage: 1,
    evolvesToId: 'fox-evolved',
    flavorCategories: ['school', 'library'],
    assetKey: 'fox',
  },
  {
    id: 'fox-evolved',
    name: 'Fox',
    rarity: 'common',
    stage: 2,
    evolvesToId: null,
    flavorCategories: ['school', 'library'],
    assetKey: 'fox',
  },
  {
    id: 'owl',
    name: 'Owl',
    rarity: 'uncommon',
    stage: 1,
    evolvesToId: 'owl-evolved',
    flavorCategories: ['library'],
    assetKey: 'owl',
  },
  {
    id: 'owl-evolved',
    name: 'Owl',
    rarity: 'uncommon',
    stage: 2,
    evolvesToId: null,
    flavorCategories: ['library'],
    assetKey: 'owl',
  },
  {
    id: 'bunny',
    name: 'Bunny',
    rarity: 'common',
    stage: 1,
    evolvesToId: 'bunny-evolved',
    flavorCategories: ['coffee', 'club'],
    assetKey: 'bunny',
  },
  {
    id: 'bunny-evolved',
    name: 'Bunny',
    rarity: 'common',
    stage: 2,
    evolvesToId: null,
    flavorCategories: ['coffee', 'club'],
    assetKey: 'bunny',
  },
  {
    id: 'otter',
    name: 'Otter',
    rarity: 'rare',
    stage: 1,
    evolvesToId: 'otter-evolved',
    flavorCategories: ['coffee', 'club'],
    assetKey: 'otter',
  },
  {
    id: 'otter-evolved',
    name: 'Otter',
    rarity: 'rare',
    stage: 2,
    evolvesToId: null,
    flavorCategories: ['coffee', 'club'],
    assetKey: 'otter',
  },
]

/** One entry per species family (the stage-1 row) — used by the Collection
 * screen to know what's discoverable at all, regardless of which stage a
 * user's owned instance is currently at. */
export const SPECIES_FAMILIES: Species[] = SPECIES_CATALOG.filter((species) => species.stage === 1)

export function getSpeciesById(id: string): Species | undefined {
  return SPECIES_CATALOG.find((species) => species.id === id)
}
