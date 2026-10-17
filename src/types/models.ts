export type LocationCategory = 'gym' | 'work' | 'school' | 'coffee' | 'library' | 'club' | 'custom'
export type Rarity = 'common' | 'uncommon' | 'rare'
export type LocationVisibility = 'private' | 'friends'
export type VisitMethod = 'gps' | 'manual'
export type FriendshipStatus = 'pending' | 'accepted'

export interface AppUser {
  id: string
  displayName: string
  avatarId: string
  createdAt: number
}

export interface SavedLocation {
  id: string
  userId: string
  label: string
  category: LocationCategory
  lat: number
  lng: number
  radiusMeters: number
  visibility: LocationVisibility
  lastClaimedAt: number | null
}

export interface Species {
  id: string
  name: string
  rarity: Rarity
  stage: 1 | 2
  evolvesToId: string | null
  flavorCategories: LocationCategory[]
  assetKey: string
}

export interface AnimalInstance {
  id: string
  userId: string
  speciesId: string
  nickname: string | null
  xp: number
  level: number
  stage: 1 | 2
  sourceLocationId: string
  acquiredAt: number
  zooPosition: { x: number; y: number } | null
}

export interface Achievement {
  id: string
  name: string
  assetKey: string
  criteria: string
}

export interface UserAchievement {
  id: string
  userId: string
  achievementId: string
  unlockedAt: number
}

export interface Friendship {
  id: string
  userId: string
  friendId: string
  status: FriendshipStatus
}

export interface Visit {
  id: string
  userId: string
  locationId: string
  timestamp: number
  method: VisitMethod
  rewardGranted: { type: 'catch' | 'xp'; refId: string } | null
}

export interface PushSubscriptionRecord {
  id: string
  userId: string
  fcmToken: string
}
