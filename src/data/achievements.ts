import type { Achievement } from '@/types/models'

/**
 * V1 achievement catalog — 5 simple, checkable milestones. Art lives at
 * src/assets/achievements/{id}.svg (see src/lib/assets.ts for the swap-in-place
 * loading contract, same pattern as animal art).
 */
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-catch',
    name: 'First Catch',
    assetKey: 'first-catch',
    criteria: 'Catch your first companion',
  },
  {
    id: 'first-evolution',
    name: 'First Evolution',
    assetKey: 'first-evolution',
    criteria: 'Evolve a companion',
  },
  {
    id: 'three-day-explorer',
    name: '3-Day Explorer',
    assetKey: 'three-day-explorer',
    criteria: 'Visit a saved place on 3 different days',
  },
  {
    id: 'made-a-friend',
    name: 'Made a Friend',
    assetKey: 'made-a-friend',
    criteria: 'Add your first friend',
  },
  {
    id: 'zoo-curator',
    name: 'Zoo Curator',
    assetKey: 'zoo-curator',
    criteria: 'Place 5 companions in your zoo',
  },
]

export function getAchievementById(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find((achievement) => achievement.id === id)
}
