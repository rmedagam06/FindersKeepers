import { getAchievementArt } from '@/lib/assets'
import type { Achievement } from '@/types/models'

export function AchievementBadge({
  achievement,
  unlocked,
  size = 56,
}: {
  achievement: Achievement
  unlocked: boolean
  size?: number
}) {
  const src = getAchievementArt(achievement.assetKey)
  return (
    <div className="achievement-badge" title={achievement.criteria}>
      {src ? (
        <img
          src={src}
          alt={achievement.name}
          width={size}
          height={size}
          className={unlocked ? '' : 'achievement-badge__art--locked'}
        />
      ) : (
        <div className="ds-animal-fallback" style={{ width: size, height: size }}>
          {achievement.name.charAt(0)}
        </div>
      )}
      <span className="achievement-badge__name">{achievement.name}</span>
    </div>
  )
}
