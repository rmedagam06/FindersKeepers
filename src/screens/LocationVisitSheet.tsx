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
import { useAppStore } from '@/store/useAppStore'
import { useLocationsStore } from '@/store/useLocationsStore'
import { useCollectionStore } from '@/store/useCollectionStore'
import { useVisitsStore } from '@/store/useVisitsStore'
import type { Achievement, SavedLocation, Species } from '@/types/models'

type ViewState =
  | { step: 'idle' }
  | { step: 'checking' }
  | { step: 'caught'; species: Species }
  | { step: 'xp'; amount: number }
  | { step: 'blocked'; reason: string }

const REASON_COPY: Record<string, string> = {
  cooldown: "You've already checked in here recently — come back in a few hours.",
  'too-far': "You're not close enough yet. Get a little nearer and try again.",
  'manual-limit': "You've used your manual check-ins for this week.",
}

export function LocationVisitSheet({ location, onClose }: { location: SavedLocation; onClose: () => void }) {
  const user = useAppStore((state) => state.user)
  const claimLocation = useLocationsStore((state) => state.claimLocation)
  const animals = useCollectionStore((state) => state.animals)
  const catchAnimal = useCollectionStore((state) => state.catchAnimal)
  const grantXp = useCollectionStore((state) => state.grantXp)
  const logVisit = useVisitsStore((state) => state.logVisit)
  const countManualVisitsThisWeek = useVisitsStore((state) => state.countManualVisitsThisWeek)
  const checkAchievements = useAchievementCheck()

  const [view, setView] = useState<ViewState>({ step: 'idle' })
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([])

  function resolveClaim(method: 'gps' | 'manual', coords: { lat: number; lng: number } | null) {
    if (!user) return
    const result = claimVisit({
      location,
      method,
      userCoords: coords,
      catalog: SPECIES_CATALOG,
      existingInstances: animals.filter((a) => a.userId === user.id),
      recentManualVisits: countManualVisitsThisWeek(user.id),
    })

    if (!result.ok) {
      setView({ step: 'blocked', reason: REASON_COPY[result.reason] ?? 'Try again in a bit.' })
      return
    }

    claimLocation(location.id)

    if (result.kind === 'catch') {
      const instance = catchAnimal({ userId: user.id, speciesId: result.species.id, sourceLocationId: location.id })
      logVisit({ userId: user.id, locationId: location.id, method, rewardGranted: { type: 'catch', refId: instance.id } })
      setNewAchievements(checkAchievements())
      setView({ step: 'caught', species: result.species })
    } else {
      grantXp(result.animalInstanceId, result.xpGained)
      logVisit({ userId: user.id, locationId: location.id, method, rewardGranted: { type: 'xp', refId: result.animalInstanceId } })
      setNewAchievements(checkAchievements())
      setView({ step: 'xp', amount: result.xpGained })
    }
  }

  function handleCheckIn() {
    setView({ step: 'checking' })
    if (!navigator.geolocation) {
      resolveClaim('manual', null)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => resolveClaim('gps', { lat: position.coords.latitude, lng: position.coords.longitude }),
      () => resolveClaim('manual', null),
      { timeout: 10000 },
    )
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

      {view.step === 'checking' && <p className="auth-subtitle">Checking your location…</p>}

      {view.step === 'caught' && (
        <>
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

      {view.step === 'blocked' && (
        <>
          <h2 className="sheet-title">Not yet</h2>
          <p className="auth-subtitle">{view.reason}</p>
          <Button variant="secondary" onClick={onClose}>
            Got it
          </Button>
        </>
      )}
    </Modal>
  )
}
