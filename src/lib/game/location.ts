const EARTH_RADIUS_METERS = 6371000

export interface Coordinates {
  lat: number
  lng: number
}

/** Great-circle distance between two coordinates, in meters. */
export function distanceMeters(a: Coordinates, b: Coordinates): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const sinDLat = Math.sin(dLat / 2)
  const sinDLng = Math.sin(dLng / 2)
  const h = sinDLat * sinDLat + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinDLng * sinDLng
  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(h))
}

export const DEFAULT_ARRIVAL_RADIUS_METERS = 120

export function isWithinArrivalRadius(
  userCoords: Coordinates,
  locationCoords: Coordinates,
  radiusMeters: number = DEFAULT_ARRIVAL_RADIUS_METERS,
): boolean {
  return distanceMeters(userCoords, locationCoords) <= radiusMeters
}

export const VISIT_COOLDOWN_MS = 4 * 60 * 60 * 1000

/** Whether a location is eligible for a new reward claim right now. Server-side logic must re-run this check — never trust a client-reported `lastClaimedAt`. */
export function isCooldownElapsed(lastClaimedAt: number | null, now: number = Date.now()): boolean {
  if (lastClaimedAt === null) return true
  return now - lastClaimedAt >= VISIT_COOLDOWN_MS
}

export const MAX_MANUAL_CHECKINS_PER_WEEK = 2
