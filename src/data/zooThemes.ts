export interface ZooTheme {
  id: 'meadow' | 'beach' | 'snow'
  label: string
  ground: string
  outerGround: string
  sky: string
}

/** Colors stay within the existing app palette — just recombined.
 * `outerGround` rings the main `ground` disc for depth (and, on the beach
 * theme, doubles as the surrounding water). */
export const ZOO_THEMES: ZooTheme[] = [
  { id: 'meadow', label: 'Meadow', ground: '#CEE2B1', outerGround: '#98C48D', sky: '#FFFED6' },
  { id: 'beach', label: 'Beach', ground: '#F8F4C9', outerGround: '#71BCB7', sky: '#71BCB7' },
  { id: 'snow', label: 'Snow', ground: '#FFFDF0', outerGround: '#7078A4', sky: '#7078A4' },
]

export function getZooTheme(id: string): ZooTheme {
  return ZOO_THEMES.find((theme) => theme.id === id) ?? ZOO_THEMES[0]
}
