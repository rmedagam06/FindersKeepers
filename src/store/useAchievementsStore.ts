import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserAchievement } from '@/types/models'
import { evaluateAchievements, type AchievementContext } from '@/lib/game/achievements'

interface AchievementsState {
  unlocked: UserAchievement[]
  checkAndUnlock: (userId: string, context: AchievementContext) => string[]
  unlockedIdsFor: (userId: string) => string[]
}

export const useAchievementsStore = create<AchievementsState>()(
  persist(
    (set, get) => ({
      unlocked: [],
      checkAndUnlock: (userId, context) => {
        const already = new Set(
          get()
            .unlocked.filter((u) => u.userId === userId)
            .map((u) => u.achievementId),
        )
        const newIds = evaluateAchievements(context, already)
        if (newIds.length === 0) return []

        const now = Date.now()
        const newRecords: UserAchievement[] = newIds.map((achievementId) => ({
          id: crypto.randomUUID(),
          userId,
          achievementId,
          unlockedAt: now,
        }))
        set({ unlocked: [...get().unlocked, ...newRecords] })
        return newIds
      },
      unlockedIdsFor: (userId) =>
        get()
          .unlocked.filter((u) => u.userId === userId)
          .map((u) => u.achievementId),
    }),
    { name: 'finders-keepers-achievements' },
  ),
)
