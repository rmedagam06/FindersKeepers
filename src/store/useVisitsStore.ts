import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Visit, VisitMethod } from '@/types/models'

interface VisitsState {
  visits: Visit[]
  logVisit: (input: {
    userId: string
    locationId: string
    method: VisitMethod
    rewardGranted: Visit['rewardGranted']
  }) => void
  countManualVisitsThisWeek: (userId: string) => number
}

const WEEK_MS = 7 * 24 * 60 * 60 * 1000

export const useVisitsStore = create<VisitsState>()(
  persist(
    (set, get) => ({
      visits: [],
      logVisit: (input) => {
        const visit: Visit = {
          id: crypto.randomUUID(),
          userId: input.userId,
          locationId: input.locationId,
          timestamp: Date.now(),
          method: input.method,
          rewardGranted: input.rewardGranted,
        }
        set({ visits: [...get().visits, visit] })
      },
      countManualVisitsThisWeek: (userId) => {
        const cutoff = Date.now() - WEEK_MS
        return get().visits.filter((v) => v.userId === userId && v.method === 'manual' && v.timestamp >= cutoff).length
      },
    }),
    { name: 'finders-keepers-visits' },
  ),
)
