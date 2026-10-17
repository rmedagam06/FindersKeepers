import { useAppStore } from '@/store/useAppStore'
import { useCollectionStore } from '@/store/useCollectionStore'
import { useVisitsStore } from '@/store/useVisitsStore'
import { useFriendsStore } from '@/store/useFriendsStore'
import { useAchievementsStore } from '@/store/useAchievementsStore'
import { getAchievementById } from '@/data/achievements'
import type { Achievement } from '@/types/models'

/**
 * Call the returned `check()` right after any store action that might unlock
 * an achievement (catch, evolve, friend added, zoo placement) — in the same
 * event handler, not in an effect. It reads via `.getState()` rather than
 * the hook's own React-subscribed values specifically so it sees the
 * just-applied update immediately, instead of the stale pre-update snapshot
 * React hasn't re-rendered with yet. Returns the newly-unlocked achievements
 * (empty if none) so the caller can show an inline "Achievement unlocked!" notice.
 */
export function useAchievementCheck() {
  const user = useAppStore((state) => state.user)
  const checkAndUnlock = useAchievementsStore((state) => state.checkAndUnlock)

  return function check(): Achievement[] {
    if (!user) return []
    const animals = useCollectionStore.getState().animals.filter((a) => a.userId === user.id)
    const visits = useVisitsStore.getState().visits.filter((v) => v.userId === user.id)
    const friendships = useFriendsStore
      .getState()
      .friendships.filter((f) => f.userId === user.id && f.status === 'accepted')

    const newIds = checkAndUnlock(user.id, { animals, visits, friendships })
    return newIds.map(getAchievementById).filter((achievement): achievement is Achievement => Boolean(achievement))
  }
}
