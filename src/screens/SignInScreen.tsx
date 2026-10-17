import { useState } from 'react'
import { CompassMark } from '@/components/ui/CompassMark'
import { Button } from '@/components/ui/Button'
import { createGuestUser, isGoogleSignInAvailable, signInWithGoogle } from '@/lib/auth'
import { useAppStore } from '@/store/useAppStore'

export function SignInScreen() {
  const setUser = useAppStore((state) => state.setUser)
  const [error, setError] = useState<string | null>(null)
  const [isSigningIn, setIsSigningIn] = useState(false)

  async function handleGoogleSignIn() {
    setError(null)
    setIsSigningIn(true)
    try {
      const user = await signInWithGoogle()
      setUser(user)
    } catch {
      setError('Google sign-in didn’t go through. Try again, or continue as a guest.')
    } finally {
      setIsSigningIn(false)
    }
  }

  function handleGuest() {
    setUser(createGuestUser())
  }

  return (
    <section className="auth-screen" aria-label="Sign in to Finders Keepers">
      <CompassMark />
      <h1 className="auth-title">Finders Keepers</h1>
      <p className="auth-subtitle">Collect companions. Explore your world.</p>

      <div className="auth-actions">
        <Button
          variant="primary"
          onClick={handleGoogleSignIn}
          disabled={!isGoogleSignInAvailable || isSigningIn}
          title={isGoogleSignInAvailable ? undefined : 'Google sign-in turns on once Firebase is connected'}
        >
          {isSigningIn ? 'Signing in…' : 'Continue with Google'}
        </Button>
        <Button variant="secondary" onClick={handleGuest}>
          Continue as Guest
        </Button>
      </div>

      {!isGoogleSignInAvailable && (
        <p className="auth-hint">Google sign-in isn't connected yet — guest mode works fully offline.</p>
      )}
      {error && <p className="auth-error">{error}</p>}
    </section>
  )
}
