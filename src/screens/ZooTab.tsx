import { lazy, Suspense, useEffect, useState } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { useCollectionStore } from '@/store/useCollectionStore'
import { getSpeciesById } from '@/data/species'
import { ZOO_THEMES } from '@/data/zooThemes'
import { AnimalArt } from '@/components/ui/AnimalArt'
import { Button } from '@/components/ui/Button'
import { useAchievementCheck } from '@/lib/game/useAchievementCheck'
import { isWebGLAvailable } from '@/lib/webgl'

const ZooScene3D = lazy(() =>
  import('@/components/zoo3d/ZooScene3D').then((module) => ({ default: module.ZooScene3D })),
)

const YARD_BOUNDS = 4
const MAX_PLACED = 9

function randomYardPoint() {
  return {
    x: (Math.random() * 2 - 1) * YARD_BOUNDS,
    y: (Math.random() * 2 - 1) * YARD_BOUNDS,
  }
}

export function ZooTab() {
  const user = useAppStore((state) => state.user)
  const allAnimals = useCollectionStore((state) => state.animals)
  const placeInZoo = useCollectionStore((state) => state.placeInZoo)
  const zooThemeId = useAppStore((state) => state.zooThemeId)
  const setZooThemeId = useAppStore((state) => state.setZooThemeId)
  const checkAchievements = useAchievementCheck()
  const [unlockToast, setUnlockToast] = useState<string | null>(null)
  const [canvasEl, setCanvasEl] = useState<HTMLCanvasElement | null>(null)
  const webGLAvailable = isWebGLAvailable()

  useEffect(() => {
    if (!unlockToast) return
    const timer = setTimeout(() => setUnlockToast(null), 2600)
    return () => clearTimeout(timer)
  }, [unlockToast])

  const myAnimals = allAnimals.filter((animal) => animal.userId === user?.id)
  const placed = myAnimals.filter((animal) => animal.zooPosition !== null)
  const unplaced = myAnimals.filter((animal) => animal.zooPosition === null)
  const yardFull = placed.length >= MAX_PLACED

  function handlePlace(animalId: string) {
    if (yardFull) return
    placeInZoo(animalId, randomYardPoint())
    const unlocked = checkAchievements()
    if (unlocked.length > 0) setUnlockToast(`Achievement unlocked: ${unlocked.map((a) => a.name).join(', ')}!`)
  }

  function handleRemove(animalId: string) {
    placeInZoo(animalId, null)
  }

  function handleSnapshot() {
    if (!canvasEl) return
    const link = document.createElement('a')
    link.href = canvasEl.toDataURL('image/png')
    link.download = 'my-zoo.png'
    link.click()
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
                  className="zoo-tray-item"
                  onClick={() => handlePlace(animal.id)}
                  disabled={yardFull}
                  aria-label={`${animal.nickname || species.name} — tap to place in the yard`}
                >
                  <AnimalArt speciesId={species.assetKey} speciesName={species.name} stage={animal.stage} size={48} />
                </button>
              )
            })}
          </div>
        )}

        {yardFull && <p className="zoo-hint">Your yard is full — remove a companion to make room for another.</p>}

        <div className="zoo-toolbar">
          <div className="category-row category-row--wrap" aria-label="Zoo backdrop">
            {ZOO_THEMES.map((theme) => (
              <button
                key={theme.id}
                className={zooThemeId === theme.id ? 'category-pill is-active' : 'category-pill'}
                onClick={() => setZooThemeId(theme.id)}
              >
                {theme.label}
              </button>
            ))}
          </div>
          <Button variant="secondary" onClick={handleSnapshot} disabled={!canvasEl}>
            Save a photo
          </Button>
        </div>

        <div className="zoo-yard">
          {webGLAvailable ? (
            <Suspense fallback={<p className="auth-subtitle">Loading the yard…</p>}>
              <ZooScene3D animals={placed} themeId={zooThemeId} onRemove={handleRemove} onCanvasReady={setCanvasEl} />
            </Suspense>
          ) : (
            <p className="auth-subtitle">
              Your browser doesn't support 3D graphics, so the zoo can't render here. Try a different browser.
            </p>
          )}
        </div>
      </div>

      {unlockToast && <p className="toast">{unlockToast}</p>}
    </>
  )
}
