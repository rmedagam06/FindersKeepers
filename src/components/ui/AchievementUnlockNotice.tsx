import { AchievementBadge } from './AchievementBadge'
import type { Achievement } from '@/types/models'

export function AchievementUnlockNotice({ achievements }: { achievements: Achievement[] }) {
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
