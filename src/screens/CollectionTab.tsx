import { useState } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { useCollectionStore } from '@/store/useCollectionStore'
import { getSpeciesById, SPECIES_FAMILIES } from '@/data/species'
import { AnimalArt } from '@/components/ui/AnimalArt'
import { AnimalDetailSheet } from './AnimalDetailSheet'
import type { AnimalInstance } from '@/types/models'

export function CollectionTab() {
  const user = useAppStore((state) => state.user)
  const allAnimals = useCollectionStore((state) => state.animals)
  const [selected, setSelected] = useState<AnimalInstance | null>(null)

  const myAnimals = allAnimals.filter((animal) => animal.userId === user?.id)
  const ownedFamilyKeys = new Set(
    myAnimals.map((animal) => getSpeciesById(animal.speciesId)?.assetKey).filter(Boolean),
  )
  const undiscovered = SPECIES_FAMILIES.filter((family) => !ownedFamilyKeys.has(family.assetKey))

  return (
    <>
      <div className="welcome-copy">
        <p className="eyebrow">Your creatures</p>
        <h1>Collection</h1>
      </div>

      <div className="tab-panel collection-grid">
        {myAnimals.length === 0 && undiscovered.length === SPECIES_FAMILIES.length && (
          <p className="auth-subtitle">Visit a saved place to catch your first companion.</p>
        )}

        {myAnimals.map((animal) => {
          const species = getSpeciesById(animal.speciesId)
          if (!species) return null
          return (
            <button key={animal.id} className="collection-card" onClick={() => setSelected(animal)}>
              <AnimalArt speciesId={species.assetKey} speciesName={species.name} stage={animal.stage} size={64} />
              <span className="collection-card__name">{animal.nickname || species.name}</span>
              <span className="collection-card__level">Lv {animal.level}</span>
            </button>
          )
        })}

        {undiscovered.map((family) => (
          <div key={family.id} className="collection-card collection-card--locked" aria-label={`Undiscovered companion: ${family.name}`}>
            <div className="collection-locked-icon">?</div>
            <span className="collection-card__name">???</span>
          </div>
        ))}
      </div>

      {selected && <AnimalDetailSheet animal={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
