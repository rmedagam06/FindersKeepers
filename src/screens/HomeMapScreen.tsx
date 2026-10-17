import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import { CompassMark } from '@/components/ui/CompassMark'
import { useAppStore } from '@/store/useAppStore'
import { useLocationsStore } from '@/store/useLocationsStore'
import { categoryMeta } from '@/data/locationCategories'
import { AddLocationSheet } from './AddLocationSheet'
import { ProfileSheet } from './ProfileSheet'
import { LocationVisitSheet } from './LocationVisitSheet'
import type { LocationCategory, SavedLocation } from '@/types/models'

const DEFAULT_CENTER: [number, number] = [40.7128, -74.006]

function divIcon(html: string, size: number) {
  return L.divIcon({ html, className: 'leaflet-div-icon-reset', iconSize: [size, size], iconAnchor: [size / 2, size / 2] })
}

function userIcon() {
  return divIcon(
    '<div class="you-marker" style="position:static; top:auto; left:auto; transform:none;"><span></span></div>',
    40,
  )
}

function pinIcon(category: LocationCategory) {
  const color = categoryMeta(category).color
  return divIcon(`<div class="map-pin" style="--pin-color:${color}; position:static; transform:none;"><span></span></div>`, 42)
}

function ClickHandler({ active, onPick }: { active: boolean; onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (event) => {
      if (active) onPick(event.latlng.lat, event.latlng.lng)
    },
  })
  return null
}

/** MapContainer's center/zoom props only apply on first mount — recentering
 * after async geolocation resolves needs an imperative setView via useMap(). */
function RecenterMap({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center)
  }, [center, map])
  return null
}

export function HomeMapScreen() {
  const user = useAppStore((state) => state.user)
  const locationPermission = useAppStore((state) => state.locationPermission)
  const locations = useLocationsStore((state) => state.locations)
  const addLocation = useLocationsStore((state) => state.addLocation)

  const [center, setCenter] = useState<[number, number]>(DEFAULT_CENTER)
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null)
  const [isPlacing, setIsPlacing] = useState(false)
  const [pendingCoords, setPendingCoords] = useState<[number, number] | null>(null)
  const [showProfile, setShowProfile] = useState(false)
  const [comingSoonTab, setComingSoonTab] = useState<string | null>(null)
  const [visitingLocation, setVisitingLocation] = useState<SavedLocation | null>(null)

  useEffect(() => {
    if (locationPermission !== 'granted') return
    navigator.geolocation.getCurrentPosition((position) => {
      const next: [number, number] = [position.coords.latitude, position.coords.longitude]
      setUserPosition(next)
      setCenter(next)
    })
  }, [locationPermission])

  useEffect(() => {
    if (!comingSoonTab) return
    const timer = setTimeout(() => setComingSoonTab(null), 1800)
    return () => clearTimeout(timer)
  }, [comingSoonTab])

  const myLocations = locations.filter((loc) => loc.userId === user?.id)

  return (
    <section className="app-content" aria-label="Finders Keepers companion map">
      <header className="top-bar">
        <div className="brand-lockup">
          <CompassMark small />
          <span>Finders Keepers</span>
        </div>
        <button className="profile-button" aria-label="Open your profile" onClick={() => setShowProfile(true)}>
          {user?.displayName.charAt(0) ?? 'FK'}
        </button>
      </header>

      <div className="welcome-copy">
        <p className="eyebrow">Ready to wander?</p>
        <h1>Little companions are waiting nearby.</h1>
      </div>

      <div className="leaflet-shell">
        <MapContainer center={center} zoom={15} scrollWheelZoom className="leaflet-container--themed">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickHandler
            active={isPlacing}
            onPick={(lat, lng) => {
              setPendingCoords([lat, lng])
              setIsPlacing(false)
            }}
          />
          <RecenterMap center={center} />
          {userPosition && <Marker position={userPosition} icon={userIcon()} />}
          {myLocations.map((loc) => (
            <Marker
              key={loc.id}
              position={[loc.lat, loc.lng]}
              icon={pinIcon(loc.category)}
              eventHandlers={{ click: () => !isPlacing && setVisitingLocation(loc) }}
            />
          ))}
        </MapContainer>

        <button className="map-fab" onClick={() => setIsPlacing((v) => !v)} aria-pressed={isPlacing}>
          {isPlacing ? 'Tap the map…' : '+ Add a place'}
        </button>
      </div>

      {pendingCoords && user && (
        <AddLocationSheet
          lat={pendingCoords[0]}
          lng={pendingCoords[1]}
          onCancel={() => setPendingCoords(null)}
          onSave={({ label, category }) => {
            addLocation({ userId: user.id, label, category, lat: pendingCoords[0], lng: pendingCoords[1] })
            setPendingCoords(null)
          }}
        />
      )}

      {showProfile && <ProfileSheet onClose={() => setShowProfile(false)} />}

      {visitingLocation && (
        <LocationVisitSheet location={visitingLocation} onClose={() => setVisitingLocation(null)} />
      )}

      {comingSoonTab && <p className="toast">{comingSoonTab} is coming in a later build.</p>}

      <nav className="bottom-nav" aria-label="Primary navigation">
        <button className="nav-item is-active">
          <span className="nav-symbol nav-symbol--explore" />
          Explore
        </button>
        <button className="nav-item" onClick={() => setComingSoonTab('Collection')}>
          <span className="nav-symbol nav-symbol--my-finds" />
          Collection
        </button>
        <button className="nav-item" onClick={() => setComingSoonTab('Zoo')}>
          <span className="nav-symbol nav-symbol--collection" />
          Zoo
        </button>
      </nav>
    </section>
  )
}
