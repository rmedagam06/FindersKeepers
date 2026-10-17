export const XP_PER_VISIT = 50
export const MAX_LEVEL = 5
export const EVOLUTION_LEVEL = 3

export function levelForXp(xp: number): number {
  const level = Math.floor(xp / XP_PER_VISIT) + 1
  return Math.min(level, MAX_LEVEL)
}

export function isReadyToEvolve(xp: number, stage: 1 | 2): boolean {
  return stage === 1 && levelForXp(xp) >= EVOLUTION_LEVEL
}

export function xpTowardNextLevel(xp: number): { current: number; required: number } {
  const current = xp % XP_PER_VISIT
  return { current, required: XP_PER_VISIT }
}
