/**
 * Asset-swap contract: every animal SVG lives at
 * `src/assets/animals/{speciesId}/stage-{n}.svg`, every achievement at
 * `src/assets/achievements/{achievementId}.svg`. Nothing in the app imports
 * a filename directly — species/achievement rows only carry an id, and this
 * manifest resolves it. Dropping in real supplied artwork later means
 * replacing files at these same paths; no component changes.
 */

const animalModules = import.meta.glob<{ default: string }>('../assets/animals/*/stage-*.svg', {
  eager: true,
})
const achievementModules = import.meta.glob<{ default: string }>('../assets/achievements/*.svg', {
  eager: true,
})
const avatarModules = import.meta.glob<{ default: string }>('../assets/avatars/*.svg', {
  eager: true,
})

function buildAnimalManifest(): Record<string, Record<number, string>> {
  const manifest: Record<string, Record<number, string>> = {}
  for (const [path, mod] of Object.entries(animalModules)) {
    const match = path.match(/animals\/([^/]+)\/stage-(\d+)\.svg$/)
    if (!match) continue
    const [, speciesId, stage] = match
    manifest[speciesId] ??= {}
    manifest[speciesId][Number(stage)] = mod.default
  }
  return manifest
}

function buildAchievementManifest(): Record<string, string> {
  const manifest: Record<string, string> = {}
  for (const [path, mod] of Object.entries(achievementModules)) {
    const match = path.match(/achievements\/([^/]+)\.svg$/)
    if (!match) continue
    manifest[match[1]] = mod.default
  }
  return manifest
}

function buildAvatarManifest(): Record<string, string> {
  const manifest: Record<string, string> = {}
  for (const [path, mod] of Object.entries(avatarModules)) {
    const match = path.match(/avatars\/([^/]+)\.svg$/)
    if (!match) continue
    manifest[match[1]] = mod.default
  }
  return manifest
}

export const ANIMAL_ASSETS = buildAnimalManifest()
export const ACHIEVEMENT_ASSETS = buildAchievementManifest()
export const AVATAR_ASSETS = buildAvatarManifest()
export const AVATAR_IDS = Object.keys(AVATAR_ASSETS).sort()

export function getAnimalArt(speciesId: string, stage: 1 | 2): string | undefined {
  return ANIMAL_ASSETS[speciesId]?.[stage]
}

export function getAchievementArt(achievementId: string): string | undefined {
  return ACHIEVEMENT_ASSETS[achievementId]
}

export function getAvatarArt(avatarId: string): string | undefined {
  return AVATAR_ASSETS[avatarId]
}
