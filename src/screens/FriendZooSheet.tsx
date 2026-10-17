import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { useCollectionStore } from '@/store/useCollectionStore'
import { getSpeciesById } from '@/data/species'
import { AnimalArt } from '@/components/ui/AnimalArt'

const ZOO_COLUMNS = 3
const ZOO_ROWS = 3

export function FriendZooSheet({
  friendId,
  friendName,
  onClose,
}: {
  friendId: string
  friendName: string
  onClose: () => void
}) {
  const allAnimals = useCollectionStore((state) => state.animals)
  const friendAnimals = allAnimals.filter((animal) => animal.userId === friendId)

  const slots = Array.from({ length: ZOO_ROWS * ZOO_COLUMNS }, (_, index) => ({
    x: index % ZOO_COLUMNS,
    y: Math.floor(index / ZOO_COLUMNS),
  }))

  function animalAt(x: number, y: number) {
    return friendAnimals.find((animal) => animal.zooPosition?.x === x && animal.zooPosition?.y === y)
  }

  return (
    <Modal label={`${friendName}'s zoo`} onClose={onClose}>
      <h2 className="sheet-title">{friendName}'s zoo</h2>
      <p className="auth-subtitle">Read-only — you're just visiting.</p>

      {friendAnimals.length === 0 && <p className="auth-subtitle">Nothing placed here yet.</p>}

      <div className="zoo-yard zoo-yard--mini">
        <div className="map-pond" />
        <div className="map-green map-green--one" />
        <div className="map-green map-green--two" />
        <div className="zoo-grid">
          {slots.map(({ x, y }) => {
            const occupant = animalAt(x, y)
            const species = occupant ? getSpeciesById(occupant.speciesId) : undefined
            return (
              <div key={`${x}-${y}`} className={occupant ? 'zoo-slot is-filled' : 'zoo-slot'}>
                {occupant && species && (
                  <AnimalArt speciesId={species.assetKey} speciesName={species.name} stage={occupant.stage} size={48} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="auth-actions">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  )
}
