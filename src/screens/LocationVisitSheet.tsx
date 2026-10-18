import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { AnimalArt } from '@/components/ui/AnimalArt'
import { RarityBadge } from '@/components/ui/Badge'
import { AchievementUnlockNotice } from '@/components/ui/AchievementUnlockNotice'
import { categoryMeta } from '@/data/locationCategories'
import { SPECIES_CATALOG } from '@/data/species'
import { claimVisit } from '@/lib/game/claimVisit'
import { useAchievementCheck } from '@/lib/game/useAchievementCheck'
import { playCatchSound, vibrate } from '@/lib/feedback'
import { useAppStore } from '@/store/useAppStore'
import { useCollectionStore } from '@/store/useCollectionStore'
import { useVisitsStore } from '@/store/useVisitsStore'
import type { Achievement, SavedLocation, Species } from '@/types/models'

type ViewState =
  | { step: 'idle' }
  | { step: 'caught'; species: Species; wildcard: boolean }
  | { step: 'xp'; amount: number }

export function LocationVisitSheet({ location, onClose }: { location: SavedLocation; onClose: () => void }) {
  const user = useAppStore((state) => state.user)
  const animals = useCollectionStore((state) => state.animals)
  const catchAnimal = useCollectionStore((state) => state.catchAnimal)
  const grantXp = useCollectionStore((state) => state.grantXp)
  const logVisit = useVisitsStore((state) => state.logVisit)
  const checkAchievements = useAchievementCheck()

  const [view, setView] = useState<ViewState>({ step: 'idle' })
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([])

  // No distance check, no cooldown, no manual-checkin limit — every check-in
  // succeeds by design, so demo/test runs can check in as many times as needed.
  function handleCheckIn() {
    if (!user) return
    const result = claimVisit({
      location,
      catalog: SPECIES_CATALOG,
      existingInstances: animals.filter((a) => a.userId === user.id),
    })

    if (result.kind === 'catch') {
      const instance = catchAnimal({ userId: user.id, speciesId: result.species.id, sourceLocationId: location.id })
      logVisit({ userId: user.id, locationId: location.id, method: 'manual', rewardGranted: { type: 'catch', refId: instance.id } })
      setNewAchievements(checkAchievements())
      playCatchSound()
      vibrate(50)
      setView({ step: 'caught', species: result.species, wildcard: result.wildcard })
    } else {
      grantXp(result.animalInstanceId, result.xpGained)
      logVisit({ userId: user.id, locationId: location.id, method: 'manual', rewardGranted: { type: 'xp', refId: result.animalInstanceId } })
      setNewAchievements(checkAchievements())
      setView({ step: 'xp', amount: result.xpGained })
    }
  }

  const meta = categoryMeta(location.category)

  return (
    <Modal label={`Check in at ${location.label}`} onClose={onClose}>
      {view.step === 'idle' && (
        <>
          <h2 className="sheet-title">{location.label}</h2>
          <p className="auth-subtitle" style={{ color: meta.color }}>
            {meta.label}
          </p>
          <div className="auth-actions">
            <Button variant="primary" onClick={handleCheckIn}>
              Check in
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Not now
            </Button>
          </div>
        </>
      )}

      {view.step === 'caught' && (
        <>
          {view.wildcard && <p className="wildcard-banner">Wildcard encounter!</p>}
          <RarityBadge rarity={view.species.rarity} />
          <div className="catch-reveal">
            <AnimalArt speciesId={view.species.assetKey} speciesName={view.species.name} stage={1} size={120} />
          </div>
          <h2 className="sheet-title">You found a {view.species.name}!</h2>
          <AchievementUnlockNotice achievements={newAchievements} />
          <Button variant="primary" onClick={onClose}>
            Nice!
          </Button>
        </>
      )}

      {view.step === 'xp' && (
        <>
          <h2 className="sheet-title">+{view.amount} XP</h2>
          <p className="auth-subtitle">Your companion here grew a little stronger.</p>
          <AchievementUnlockNotice achievements={newAchievements} />
          <Button variant="primary" onClick={onClose}>
            Nice!
          </Button>
        </>
      )}
    </Modal>
  )
}
