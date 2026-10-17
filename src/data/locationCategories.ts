import type { LocationCategory } from '@/types/models'

export const LOCATION_CATEGORIES: { id: LocationCategory; label: string; color: string }[] = [
  { id: 'gym', label: 'Gym', color: '#F292AA' },
  { id: 'work', label: 'Work', color: '#7078A4' },
  { id: 'school', label: 'School', color: '#71BCB7' },
  { id: 'coffee', label: 'Coffee', color: '#CEE2B1' },
  { id: 'library', label: 'Library', color: '#98C48D' },
  { id: 'club', label: 'Club', color: '#F292AA' },
  { id: 'custom', label: 'Custom', color: '#7078A4' },
]

export function categoryMeta(category: LocationCategory) {
  return LOCATION_CATEGORIES.find((c) => c.id === category) ?? LOCATION_CATEGORIES[6]
}
