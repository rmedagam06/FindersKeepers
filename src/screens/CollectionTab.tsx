import { useMemo, useState } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { useCollectionStore } from '@/store/useCollectionStore'
import { getSpeciesById, SPECIES_FAMILIES } from '@/data/species'
import { AnimalArt } from '@/components/ui/AnimalArt'
import { MoodDot } from '@/components/ui/MoodDot'
import { computeMood } from '@/lib/game/mood'
import { useVisitsStore } from '@/store/useVisitsStore'
import { AnimalDetailSheet } from './AnimalDetailSheet'
import type { AnimalInstance, Rarity } from '@/types/models'

type RarityFilter = 'all' | Rarity
type SortMode = 'level' | 'recent' | 'rarity'

const RARITY_ORDER: Record<Rarity, number> = { rare: 0, uncommon: 1, common: 2 }

export function CollectionTab() {
  const user = useAppStore((state) => state.user)
  const allAnimals = useCollectionStore((state) => state.animals)
  const visits = useVisitsStore((state) => state.visits)
  const [selected, setSelected] = useState<AnimalInstance | null>(null)
  const [rarityFilter, setRarityFilter] = useState<RarityFilter>('all')
  const [sortMode, setSortMode] = useState<SortMode>('recent')

  const myAnimals = allAnimals.filter((animal) => animal.userId === user?.id)
  const ownedFamilyKeys = new Set(
    myAnimals.map((animal) => getSpeciesById(animal.speciesId)?.assetKey).filter(Boolean),
  )
  const undiscovered = SPECIES_FAMILIES.filter((family) => !ownedFamilyKeys.has(family.assetKey))

  const visibleAnimals = useMemo(() => {
    const withSpecies = myAnimals
      .map((animal) => ({ animal, species: getSpeciesById(animal.speciesId) }))
      .filter((entry): entry is { animal: AnimalInstance; species: NonNullable<ReturnType<typeof getSpeciesById>> } =>
        Boolean(entry.species),
      )

    const filtered =
      rarityFilter === 'all' ? withSpecies : withSpecies.filter((entry) => entry.species.rarity === rarityFilter)

    const sorted = [...filtered].sort((a, b) => {
      if (sortMode === 'level') return b.animal.level - a.animal.level
      if (sortMode === 'rarity') return RARITY_ORDER[a.species.rarity] - RARITY_ORDER[b.species.rarity]
      return b.animal.acquiredAt - a.animal.acquiredAt
    })

    return sorted
  }, [myAnimals, rarityFilter, sortMode])

  return (
    <>
      <div className="welcome-copy">
        <p className="eyebrow">Your creatures</p>
        <h1>Collection</h1>
      </div>

      <div className="tab-panel collection-panel">
        {myAnimals.length > 0 && (
          <div className="collection-filters">
            {(['all', 'common', 'uncommon', 'rare'] as const).map((option) => (
              <button
                key={option}
                className={rarityFilter === option ? 'category-pill is-active' : 'category-pill'}
                onClick={() => setRarityFilter(option)}
              >
                {option === 'all' ? 'All' : option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
            <button
              className="category-pill"
              onClick={() => setSortMode((mode) => (mode === 'recent' ? 'level' : mode === 'level' ? 'rarity' : 'recent'))}
            >
              Sort: {sortMode === 'recent' ? 'Newest' : sortMode === 'level' ? 'Level' : 'Rarity'}
            </button>
          </div>
        )}

        <div className="collection-grid">
          {myAnimals.length === 0 && undiscovered.length === SPECIES_FAMILIES.length && (
            <p className="auth-subtitle">Visit a saved place to catch your first companion.</p>
          )}

          {visibleAnimals.map(({ animal, species }) => (
            <button key={animal.id} className="collection-card" onClick={() => setSelected(animal)}>
              <MoodDot mood={computeMood(animal, visits)} />
              <AnimalArt speciesId={species.assetKey} speciesName={species.name} stage={animal.stage} size={64} />
              <span className="collection-card__name">{animal.nickname || species.name}</span>
              <span className="collection-card__level">Lv {animal.level}</span>
            </button>
          ))}

          {rarityFilter === 'all' &&
            undiscovered.map((family) => (
              <div
                key={family.id}
                className="collection-card collection-card--locked"
                aria-label={`Undiscovered companion: ${family.name}`}
              >
                <div className="collection-locked-icon">?</div>
                <span className="collection-card__name">???</span>
              </div>
            ))}
        </div>
      </div>

      {selected && <AnimalDetailSheet animal={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
