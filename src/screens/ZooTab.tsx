import { useEffect, useState } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { useCollectionStore } from '@/store/useCollectionStore'
import { getSpeciesById } from '@/data/species'
import { AnimalArt } from '@/components/ui/AnimalArt'
import { useAchievementCheck } from '@/lib/game/useAchievementCheck'

const ZOO_COLUMNS = 3
const ZOO_ROWS = 3

export function ZooTab() {
  const user = useAppStore((state) => state.user)
  const allAnimals = useCollectionStore((state) => state.animals)
  const placeInZoo = useCollectionStore((state) => state.placeInZoo)
  const checkAchievements = useAchievementCheck()
  const [selectedForPlacement, setSelectedForPlacement] = useState<string | null>(null)
  const [unlockToast, setUnlockToast] = useState<string | null>(null)

  useEffect(() => {
    if (!unlockToast) return
    const timer = setTimeout(() => setUnlockToast(null), 2600)
    return () => clearTimeout(timer)
  }, [unlockToast])

  const myAnimals = allAnimals.filter((animal) => animal.userId === user?.id)
  const unplaced = myAnimals.filter((animal) => animal.zooPosition === null)
  const slots = Array.from({ length: ZOO_ROWS * ZOO_COLUMNS }, (_, index) => ({
    x: index % ZOO_COLUMNS,
    y: Math.floor(index / ZOO_COLUMNS),
  }))

  function animalAt(x: number, y: number) {
    return myAnimals.find((animal) => animal.zooPosition?.x === x && animal.zooPosition?.y === y)
  }

  function handleSlotTap(x: number, y: number) {
    const occupant = animalAt(x, y)
    if (occupant) {
      placeInZoo(occupant.id, null)
      return
    }
    if (selectedForPlacement) {
      placeInZoo(selectedForPlacement, { x, y })
      setSelectedForPlacement(null)
      const unlocked = checkAchievements()
      if (unlocked.length > 0) setUnlockToast(`Achievement unlocked: ${unlocked.map((a) => a.name).join(', ')}!`)
    }
  }

  return (
    <>
      <div className="welcome-copy">
        <p className="eyebrow">Show it off</p>
        <h1>Your zoo</h1>
      </div>

      <div className="tab-panel zoo-panel">
        {unplaced.length > 0 && (
          <div className="zoo-tray" aria-label="Unplaced companions">
            {unplaced.map((animal) => {
              const species = getSpeciesById(animal.speciesId)
              if (!species) return null
              return (
                <button
                  key={animal.id}
                  className={selectedForPlacement === animal.id ? 'zoo-tray-item is-selected' : 'zoo-tray-item'}
                  onClick={() => setSelectedForPlacement(animal.id === selectedForPlacement ? null : animal.id)}
                  aria-label={`${animal.nickname || species.name} — tap to place in the yard`}
                >
                  <AnimalArt speciesId={species.assetKey} speciesName={species.name} stage={animal.stage} size={48} />
                </button>
              )
            })}
          </div>
        )}

        {selectedForPlacement && <p className="zoo-hint">Tap an empty spot in the yard to place them.</p>}

        <div className="zoo-yard">
          <div className="map-pond" />
          <div className="map-green map-green--one" />
          <div className="map-green map-green--two" />
          <div className="map-green map-green--three" />
          <div className="zoo-grid">
            {slots.map(({ x, y }) => {
              const occupant = animalAt(x, y)
              const species = occupant ? getSpeciesById(occupant.speciesId) : undefined
              return (
                <button
                  key={`${x}-${y}`}
                  className={occupant ? 'zoo-slot is-filled' : 'zoo-slot'}
                  onClick={() => handleSlotTap(x, y)}
                  aria-label={occupant && species ? `${species.name} placed here — tap to remove` : 'Empty spot'}
                >
                  {occupant && species && (
                    <AnimalArt speciesId={species.assetKey} speciesName={species.name} stage={occupant.stage} size={56} />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {unlockToast && <p className="toast">{unlockToast}</p>}
    </>
  )
}
