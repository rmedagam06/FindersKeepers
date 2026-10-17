import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { useAppStore } from '@/store/useAppStore'

export function PermissionIntroScreen() {
  const setLocationPermission = useAppStore((state) => state.setLocationPermission)
  const markPermissionIntroSeen = useAppStore((state) => state.markPermissionIntroSeen)
  const [isRequesting, setIsRequesting] = useState(false)

  function handleAllow() {
    setIsRequesting(true)
    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationPermission('granted')
        markPermissionIntroSeen()
      },
      () => {
        setLocationPermission('denied')
        markPermissionIntroSeen()
      },
      { timeout: 10000 },
    )
  }

  function handleNotNow() {
    setLocationPermission('denied')
    markPermissionIntroSeen()
  }

  return (
    <section className="permission-screen" aria-label="Location permission">
      <h1 className="permission-title">We only check when you open the app.</h1>
      <p className="permission-body">
        Finders Keepers never tracks you in the background. We just check your distance to a saved
        place when you tap it — so you can catch a companion when you actually get there.
      </p>
      <p className="permission-body">
        Denied or no GPS? You can always use the "I'm here" button instead.
      </p>

      <div className="auth-actions">
        <Button variant="primary" onClick={handleAllow} disabled={isRequesting}>
          {isRequesting ? 'Checking…' : 'Allow location'}
        </Button>
        <Button variant="secondary" onClick={handleNotNow}>
          Not now
        </Button>
      </div>
    </section>
  )
}
