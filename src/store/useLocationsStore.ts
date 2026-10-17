import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LocationCategory, SavedLocation } from '@/types/models'
import { DEFAULT_ARRIVAL_RADIUS_METERS } from '@/lib/game/location'

interface LocationsState {
  locations: SavedLocation[]
  addLocation: (input: { userId: string; label: string; category: LocationCategory; lat: number; lng: number }) => SavedLocation
  removeLocation: (id: string) => void
  claimLocation: (id: string) => void
}

export const useLocationsStore = create<LocationsState>()(
  persist(
    (set, get) => ({
      locations: [],
      addLocation: (input) => {
        const location: SavedLocation = {
          id: crypto.randomUUID(),
          userId: input.userId,
          label: input.label,
          category: input.category,
          lat: input.lat,
          lng: input.lng,
          radiusMeters: DEFAULT_ARRIVAL_RADIUS_METERS,
          visibility: 'private',
          lastClaimedAt: null,
        }
        set({ locations: [...get().locations, location] })
        return location
      },
      removeLocation: (id) => set({ locations: get().locations.filter((loc) => loc.id !== id) }),
      claimLocation: (id) =>
        set({
          locations: get().locations.map((loc) => (loc.id === id ? { ...loc, lastClaimedAt: Date.now() } : loc)),
        }),
    }),
    { name: 'finders-keepers-locations' },
  ),
)
