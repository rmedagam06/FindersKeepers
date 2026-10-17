import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppUser } from '@/types/models'

export type LocationPermissionState = 'unknown' | 'granted' | 'denied'

interface AppState {
  user: AppUser | null
  hasSeenPermissionIntro: boolean
  locationPermission: LocationPermissionState
  notificationsEnabled: boolean
  setUser: (user: AppUser) => void
  setAvatar: (avatarId: string) => void
  setLocationPermission: (state: LocationPermissionState) => void
  markPermissionIntroSeen: () => void
  setNotificationsEnabled: (enabled: boolean) => void
  signOut: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      hasSeenPermissionIntro: false,
      locationPermission: 'unknown',
      notificationsEnabled: false,
      setUser: (user) => set({ user }),
      setAvatar: (avatarId) =>
        set((state) => ({ user: state.user ? { ...state.user, avatarId } : state.user })),
      setLocationPermission: (locationPermission) => set({ locationPermission }),
      markPermissionIntroSeen: () => set({ hasSeenPermissionIntro: true }),
      setNotificationsEnabled: (notificationsEnabled) => set({ notificationsEnabled }),
      signOut: () => set({ user: null, hasSeenPermissionIntro: false, locationPermission: 'unknown' }),
    }),
    { name: 'finders-keepers-app' },
  ),
)
