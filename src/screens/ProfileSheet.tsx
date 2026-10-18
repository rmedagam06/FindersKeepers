import { useRef, useState, type ChangeEvent } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { AchievementBadge } from '@/components/ui/AchievementBadge'
import { getAvatarArt } from '@/lib/assets'
import { useAppStore } from '@/store/useAppStore'
import { useAchievementsStore } from '@/store/useAchievementsStore'
import { useVisitsStore } from '@/store/useVisitsStore'
import { computeVisitStreak } from '@/lib/game/achievements'
import { ACHIEVEMENTS } from '@/data/achievements'
import { signOutCurrentUser } from '@/lib/auth'
import { isNotificationSupported, requestNotificationPermission, showLocalNotification } from '@/lib/notifications'
import { exportBackup, importBackup } from '@/lib/backup'

export function ProfileSheet({ onClose }: { onClose: () => void }) {
  const user = useAppStore((state) => state.user)
  const signOut = useAppStore((state) => state.signOut)
  const notificationsEnabled = useAppStore((state) => state.notificationsEnabled)
  const setNotificationsEnabled = useAppStore((state) => state.setNotificationsEnabled)
  const unlockedIdsFor = useAchievementsStore((state) => state.unlockedIdsFor)
  const visits = useVisitsStore((state) => state.visits)
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null)
  const [backupMessage, setBackupMessage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleSignOut() {
    await signOutCurrentUser()
    signOut()
    onClose()
  }

  async function handleEnableNotifications() {
    const granted = await requestNotificationPermission()
    setNotificationsEnabled(granted)
    if (granted) {
      showLocalNotification('Finders Keepers', "You're all set! We'll nudge you to go explore.")
      setNotificationMessage("Reminders on — note: this works while the app is open, not when it's fully closed. Closed-app push needs a backend we haven't connected yet.")
    } else {
      setNotificationMessage('Reminders stayed off — you can turn them on later from your browser settings.')
    }
  }

  async function handleImportFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (!window.confirm('This replaces your current data with the backup file. Continue?')) return
    try {
      await importBackup(file)
      window.location.reload()
    } catch {
      setBackupMessage("That file didn't look like a Finders Keepers backup.")
    }
  }

  if (!user) return null

  const unlockedIds = new Set(unlockedIdsFor(user.id))
  const streak = computeVisitStreak(visits.filter((v) => v.userId === user.id))

  return (
    <Modal label="Your profile" onClose={onClose}>
      {user.avatarId && <img src={getAvatarArt(user.avatarId)} alt="" width={88} height={88} />}
      <h2 className="sheet-title">{user.displayName}</h2>
      {streak > 0 && <p className="auth-subtitle">{streak}-day visit streak</p>}

      <p className="auth-subtitle" style={{ marginBottom: 8 }}>
        Achievements ({unlockedIds.size}/{ACHIEVEMENTS.length})
      </p>
      <div className="achievement-grid">
        {ACHIEVEMENTS.map((achievement) => (
          <AchievementBadge key={achievement.id} achievement={achievement} unlocked={unlockedIds.has(achievement.id)} />
        ))}
      </div>

      {isNotificationSupported() && !notificationsEnabled && (
        <div className="auth-actions">
          <Button variant="secondary" onClick={handleEnableNotifications}>
            Enable reminders
          </Button>
        </div>
      )}
      {notificationsEnabled && <p className="auth-subtitle">Reminders are on.</p>}
      {notificationMessage && <p className="auth-hint">{notificationMessage}</p>}

      <p className="auth-hint" style={{ marginTop: 14 }}>
        Everything is saved only in this browser. Back it up so you don't lose it.
      </p>
      <div className="auth-actions">
        <Button variant="secondary" onClick={exportBackup}>
          Download backup
        </Button>
        <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
          Restore from file
        </Button>
      </div>
      <input ref={fileInputRef} type="file" accept="application/json" hidden onChange={handleImportFile} />
      {backupMessage && <p className="auth-hint">{backupMessage}</p>}

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
