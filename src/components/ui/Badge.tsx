import type { Rarity } from '@/types/models'

export function RarityBadge({ rarity }: { rarity: Rarity }) {
  return <span className={`ds-badge ds-badge--${rarity}`}>{rarity}</span>
}
