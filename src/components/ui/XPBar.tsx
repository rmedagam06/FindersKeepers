import { xpTowardNextLevel } from '@/lib/game/xp'

export function XPBar({ xp }: { xp: number }) {
  const { current, required } = xpTowardNextLevel(xp)
  const percent = Math.round((current / required) * 100)
  return (
    <div className="ds-xp-bar" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
      <div className="ds-xp-bar__fill" style={{ width: `${percent}%` }} />
    </div>
  )
}
