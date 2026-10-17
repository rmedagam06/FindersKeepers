import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AnimalInstance } from '@/types/models'
import { levelForXp } from '@/lib/game/xp'

interface CollectionState {
  animals: AnimalInstance[]
  catchAnimal: (input: { userId: string; speciesId: string; sourceLocationId: string }) => AnimalInstance
  grantXp: (animalInstanceId: string, amount: number) => void
}

export const useCollectionStore = create<CollectionState>()(
  persist(
    (set, get) => ({
      animals: [],
      catchAnimal: (input) => {
        const instance: AnimalInstance = {
          id: crypto.randomUUID(),
          userId: input.userId,
          speciesId: input.speciesId,
          nickname: null,
          xp: 0,
          level: 1,
          stage: 1,
          sourceLocationId: input.sourceLocationId,
          acquiredAt: Date.now(),
          zooPosition: null,
        }
        set({ animals: [...get().animals, instance] })
        return instance
      },
      grantXp: (animalInstanceId, amount) => {
        set({
          animals: get().animals.map((animal) =>
            animal.id === animalInstanceId
              ? { ...animal, xp: animal.xp + amount, level: levelForXp(animal.xp + amount) }
              : animal,
          ),
        })
      },
    }),
    { name: 'finders-keepers-collection' },
  ),
)
