import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AnimalInstance, Friendship } from '@/types/models'
import { DEMO_FRIEND_ANIMALS, DEMO_FRIEND_CODE, DEMO_FRIEND_ID } from '@/data/demoFriend'
import { useCollectionStore } from './useCollectionStore'

interface FriendsState {
  friendships: Friendship[]
  addFriendByCode: (userId: string, code: string) => { ok: boolean; message: string }
  friendsOf: (userId: string) => string[]
}

function seedDemoFriendIfNeeded() {
  const { animals } = useCollectionStore.getState()
  if (animals.some((animal) => animal.userId === DEMO_FRIEND_ID)) return

  const now = Date.now()
  const seeded: AnimalInstance[] = DEMO_FRIEND_ANIMALS.map((demo) => ({
    id: crypto.randomUUID(),
    userId: DEMO_FRIEND_ID,
    speciesId: demo.speciesId,
    nickname: demo.nickname,
    xp: demo.xp,
    level: demo.level,
    stage: demo.stage,
    sourceLocationId: 'demo-location',
    acquiredAt: now,
    zooPosition: demo.zooPosition,
  }))
  useCollectionStore.setState({ animals: [...animals, ...seeded] })
}

export const useFriendsStore = create<FriendsState>()(
  persist(
    (set, get) => ({
      friendships: [],
      addFriendByCode: (userId, code) => {
        const trimmed = code.trim()
        if (!trimmed) return { ok: false, message: 'Enter a code first.' }

        const friendId = trimmed === DEMO_FRIEND_CODE ? DEMO_FRIEND_ID : trimmed
        if (friendId === userId) return { ok: false, message: "That's your own code!" }

        const alreadyFriends = get().friendships.some((f) => f.userId === userId && f.friendId === friendId)
        if (alreadyFriends) return { ok: false, message: "You're already friends." }

        if (friendId === DEMO_FRIEND_ID) seedDemoFriendIfNeeded()

        set({
          friendships: [...get().friendships, { id: crypto.randomUUID(), userId, friendId, status: 'accepted' }],
        })
        return { ok: true, message: 'Friend added!' }
      },
      friendsOf: (userId) =>
        get()
          .friendships.filter((f) => f.userId === userId && f.status === 'accepted')
          .map((f) => f.friendId),
    }),
    { name: 'finders-keepers-friends' },
  ),
)
