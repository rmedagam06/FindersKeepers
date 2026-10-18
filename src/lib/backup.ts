/** Every localStorage key a zustand `persist` store in this app writes to.
 * Keep this in sync with each store's `persist(..., { name: '...' })` — see
 * memory.md for the current list if this file and the stores drift. */
const BACKUP_KEYS = [
  'finders-keepers-app',
  'finders-keepers-locations',
  'finders-keepers-collection',
  'finders-keepers-visits',
  'finders-keepers-friends',
  'finders-keepers-achievements',
]

export function exportBackup(): void {
  const data: Record<string, string> = {}
  for (const key of BACKUP_KEYS) {
    const value = localStorage.getItem(key)
    if (value !== null) data[key] = value
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `finders-keepers-backup-${new Date().toISOString().slice(0, 10)}.json`
  link.click()
  URL.revokeObjectURL(url)
}

export async function importBackup(file: File): Promise<void> {
  const text = await file.text()
  const data = JSON.parse(text) as Record<string, string>
  for (const key of BACKUP_KEYS) {
    if (typeof data[key] === 'string') {
      localStorage.setItem(key, data[key])
    }
  }
}
