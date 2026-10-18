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
}

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
    }),
    { name: 'finders-keepers-visits' },
  ),
)
