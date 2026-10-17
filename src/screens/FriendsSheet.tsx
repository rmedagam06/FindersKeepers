import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { AchievementUnlockNotice } from '@/components/ui/AchievementUnlockNotice'
import { useAppStore } from '@/store/useAppStore'
import { useFriendsStore } from '@/store/useFriendsStore'
import { useAchievementCheck } from '@/lib/game/useAchievementCheck'
import { DEMO_FRIEND_CODE, DEMO_FRIEND_ID, DEMO_FRIEND_NAME } from '@/data/demoFriend'
import type { Achievement } from '@/types/models'

export function friendDisplayName(friendId: string): string {
  if (friendId === DEMO_FRIEND_ID) return DEMO_FRIEND_NAME
  return `Explorer #${friendId.slice(-6)}`
}

export function FriendsSheet({
  onClose,
  onViewFriend,
}: {
  onClose: () => void
  onViewFriend: (friendId: string) => void
}) {
  const user = useAppStore((state) => state.user)
  const friendships = useFriendsStore((state) => state.friendships)
  const addFriendByCode = useFriendsStore((state) => state.addFriendByCode)
  const checkAchievements = useAchievementCheck()
  const [codeInput, setCodeInput] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([])

  if (!user) return null
  const userId = user.id

  const myFriends = friendships.filter((f) => f.userId === userId && f.status === 'accepted')

  function handleAdd() {
    const result = addFriendByCode(userId, codeInput)
    setMessage(result.message)
    if (result.ok) {
      setCodeInput('')
      setNewAchievements(checkAchievements())
    }
  }

  return (
    <Modal label="Friends" onClose={onClose}>
      <h2 className="sheet-title">Friends</h2>
      <p className="auth-subtitle friend-code">Your code: {userId}</p>

      <input
        className="sheet-input"
        placeholder="Enter a friend's code"
        value={codeInput}
        onChange={(event) => setCodeInput(event.target.value)}
      />
      <div className="auth-actions">
        <Button variant="primary" onClick={handleAdd}>
          Add friend
        </Button>
      </div>
      {message && <p className="auth-subtitle">{message}</p>}
      <AchievementUnlockNotice achievements={newAchievements} />

      <div className="friends-list">
        {myFriends.length === 0 && (
          <p className="auth-subtitle">No friends yet — try code {DEMO_FRIEND_CODE} to see a sample zoo.</p>
        )}
        {myFriends.map((friendship) => (
          <button key={friendship.id} className="friend-row" onClick={() => onViewFriend(friendship.friendId)}>
            {friendDisplayName(friendship.friendId)}
          </button>
        ))}
      </div>

      <div className="auth-actions">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  )
}
