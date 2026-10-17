/**
 * A seeded demo friend so the social features are demoable without a real
 * second account or a backend. Entering DEMO_FRIEND_CODE in the Friends
 * sheet adds this as a friend and seeds a small pre-placed zoo for them.
 * Real friend lookup (by actual user id, including a second local guest
 * session sharing this browser's localStorage) also works — see
 * src/store/useFriendsStore.ts.
 */
export const DEMO_FRIEND_ID = 'demo-friend-alex'
export const DEMO_FRIEND_NAME = 'Alex'
export const DEMO_FRIEND_CODE = 'ALEX2016'

export const DEMO_FRIEND_ANIMALS: {
  speciesId: string
  stage: 1 | 2
  nickname: string | null
  xp: number
  level: number
  zooPosition: { x: number; y: number }
}[] = [
  { speciesId: 'fox', stage: 1, nickname: 'Rusty', xp: 40, level: 1, zooPosition: { x: 0, y: 0 } },
  { speciesId: 'owl-evolved', stage: 2, nickname: 'Hoots', xp: 160, level: 4, zooPosition: { x: 1, y: 0 } },
  { speciesId: 'bunny', stage: 1, nickname: null, xp: 20, level: 1, zooPosition: { x: 2, y: 1 } },
]
