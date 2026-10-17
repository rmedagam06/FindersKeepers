import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { AnimalArt } from '@/components/ui/AnimalArt'
import { RarityBadge } from '@/components/ui/Badge'
import { XPBar } from '@/components/ui/XPBar'
import { getSpeciesById } from '@/data/species'
import { useCollectionStore } from '@/store/useCollectionStore'
import { isReadyToEvolve } from '@/lib/game/xp'
import type { AnimalInstance } from '@/types/models'

export function AnimalDetailSheet({ animal, onClose }: { animal: AnimalInstance; onClose: () => void }) {
  const species = getSpeciesById(animal.speciesId)
  const setNickname = useCollectionStore((state) => state.setNickname)
  const evolveAnimal = useCollectionStore((state) => state.evolveAnimal)
  const [nicknameDraft, setNicknameDraft] = useState(animal.nickname ?? '')
  const [justEvolved, setJustEvolved] = useState(false)

  if (!species) return null

  const readyToEvolve = isReadyToEvolve(animal.xp, animal.stage)
  const evolvesToId = species.evolvesToId

  function handleEvolve() {
    if (!evolvesToId) return
    evolveAnimal(animal.id, evolvesToId)
    setJustEvolved(true)
  }

  return (
    <Modal label={`${species.name} details`} onClose={onClose}>
      <RarityBadge rarity={species.rarity} />
      <div className="catch-reveal">
        <AnimalArt speciesId={species.assetKey} speciesName={species.name} stage={animal.stage} size={120} />
      </div>
      <h2 className="sheet-title">{animal.nickname || species.name}</h2>
      <p className="auth-subtitle">Level {animal.level}</p>
      <XPBar xp={animal.xp} />

      <input
        className="sheet-input"
        style={{ marginTop: 16 }}
        placeholder="Give them a nickname"
        value={nicknameDraft}
        onChange={(event) => setNicknameDraft(event.target.value)}
        onBlur={() => setNickname(animal.id, nicknameDraft.trim() || null)}
      />

      {justEvolved && <p className="auth-subtitle">Whoa — they evolved!</p>}

      {readyToEvolve && !justEvolved && (
        <div className="auth-actions">
          <Button variant="primary" onClick={handleEvolve}>
            Evolve!
          </Button>
        </div>
      )}

      <div className="auth-actions">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  )
}
