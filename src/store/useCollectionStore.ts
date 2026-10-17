import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AnimalInstance } from '@/types/models'
import { levelForXp } from '@/lib/game/xp'

interface CollectionState {
  animals: AnimalInstance[]
  catchAnimal: (input: { userId: string; speciesId: string; sourceLocationId: string }) => AnimalInstance
  grantXp: (animalInstanceId: string, amount: number) => void
  evolveAnimal: (animalInstanceId: string, evolvedSpeciesId: string) => void
  setNickname: (animalInstanceId: string, nickname: string | null) => void
  placeInZoo: (animalInstanceId: string, position: { x: number; y: number } | null) => void
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
      evolveAnimal: (animalInstanceId, evolvedSpeciesId) => {
        set({
          animals: get().animals.map((animal) =>
            animal.id === animalInstanceId ? { ...animal, speciesId: evolvedSpeciesId, stage: 2 } : animal,
          ),
        })
      },
      setNickname: (animalInstanceId, nickname) => {
        set({
          animals: get().animals.map((animal) => (animal.id === animalInstanceId ? { ...animal, nickname } : animal)),
        })
      },
      placeInZoo: (animalInstanceId, position) => {
        set({
          animals: get().animals.map((animal) =>
            animal.id === animalInstanceId ? { ...animal, zooPosition: position } : animal,
          ),
        })
      },
    }),
    { name: 'finders-keepers-collection' },
  ),
)
