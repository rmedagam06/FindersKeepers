import { useEffect, useRef } from 'react'
import { AchievementBadge } from './AchievementBadge'
import { playAchievementSound, vibrate } from '@/lib/feedback'
import type { Achievement } from '@/types/models'

export function AchievementUnlockNotice({ achievements }: { achievements: Achievement[] }) {
  const hasPlayedRef = useRef(false)

  useEffect(() => {
    if (achievements.length === 0) {
      hasPlayedRef.current = false
      return
    }
    if (hasPlayedRef.current) return
    hasPlayedRef.current = true
    playAchievementSound()
    vibrate([40, 60, 80])
  }, [achievements])

  if (achievements.length === 0) return null
  return (
    <div className="achievement-unlock">
      <p className="achievement-unlock__label">Achievement unlocked!</p>
      <div className="achievement-grid">
        {achievements.map((achievement) => (
          <AchievementBadge key={achievement.id} achievement={achievement} unlocked />
        ))}
      </div>
    </div>
  )
}
