import { lazy, Suspense } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { useAppStore } from '@/store/useAppStore'
import { useCollectionStore } from '@/store/useCollectionStore'
import { isWebGLAvailable } from '@/lib/webgl'

const ZooScene3D = lazy(() =>
  import('@/components/zoo3d/ZooScene3D').then((module) => ({ default: module.ZooScene3D })),
)

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
  const zooThemeId = useAppStore((state) => state.zooThemeId)
  const friendAnimals = allAnimals.filter((animal) => animal.userId === friendId && animal.zooPosition !== null)
  const webGLAvailable = isWebGLAvailable()

  return (
    <Modal label={`${friendName}'s zoo`} onClose={onClose}>
      <h2 className="sheet-title">{friendName}'s zoo</h2>
      <p className="auth-subtitle">Read-only — you're just visiting.</p>

      {friendAnimals.length === 0 && <p className="auth-subtitle">Nothing placed here yet.</p>}

      <div className="zoo-yard zoo-yard--mini">
        {webGLAvailable ? (
          <Suspense fallback={<p className="auth-subtitle">Loading the yard…</p>}>
            <ZooScene3D animals={friendAnimals} themeId={zooThemeId} readOnly />
          </Suspense>
        ) : (
          <p className="auth-subtitle">Your browser doesn't support 3D graphics, so the zoo can't render here.</p>
        )}
      </div>

      <div className="auth-actions">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  )
}
