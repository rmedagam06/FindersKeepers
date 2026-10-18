export interface ZooTheme {
  id: 'meadow' | 'beach' | 'snow'
  label: string
  ground: string
  sky: string
}

/** Colors stay within the existing app palette — just recombined. */
export const ZOO_THEMES: ZooTheme[] = [
  { id: 'meadow', label: 'Meadow', ground: '#CEE2B1', sky: '#FFFED6' },
  { id: 'beach', label: 'Beach', ground: '#F8F4C9', sky: '#71BCB7' },
  { id: 'snow', label: 'Snow', ground: '#FFFDF0', sky: '#7078A4' },
]

export function getZooTheme(id: string): ZooTheme {
  return ZOO_THEMES.find((theme) => theme.id === id) ?? ZOO_THEMES[0]
}
