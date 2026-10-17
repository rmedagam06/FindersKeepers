import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { getAvatarArt } from '@/lib/assets'
import { useAppStore } from '@/store/useAppStore'
import { signOutCurrentUser } from '@/lib/auth'

export function ProfileSheet({ onClose }: { onClose: () => void }) {
  const user = useAppStore((state) => state.user)
  const signOut = useAppStore((state) => state.signOut)

  async function handleSignOut() {
    await signOutCurrentUser()
    signOut()
    onClose()
  }

  if (!user) return null

  return (
    <Modal label="Your profile" onClose={onClose}>
      {user.avatarId && <img src={getAvatarArt(user.avatarId)} alt="" width={88} height={88} />}
      <h2 className="sheet-title">{user.displayName}</h2>
      <div className="auth-actions">
        <Button variant="danger" onClick={handleSignOut}>
          Sign out
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  )
}
