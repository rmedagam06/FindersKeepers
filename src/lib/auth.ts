import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth'
import { auth, isFirebaseConfigured } from '@/lib/firebase'
import type { AppUser } from '@/types/models'

/**
 * Guest mode is always available and never touches Firebase — it's the fast
 * demo path. Google sign-in requires Firebase to be configured (see
 * src/lib/firebase.ts); callers should check isGoogleSignInAvailable first.
 */
export const isGoogleSignInAvailable = isFirebaseConfigured

export function createGuestUser(): AppUser {
  return {
    id: `guest-${crypto.randomUUID()}`,
    displayName: 'Guest Explorer',
    avatarId: '',
    createdAt: Date.now(),
  }
}

export async function signInWithGoogle(): Promise<AppUser> {
  if (!auth) {
    throw new Error('Google sign-in is not available until Firebase is configured.')
  }
  const result = await signInWithPopup(auth, new GoogleAuthProvider())
  return {
    id: result.user.uid,
    displayName: result.user.displayName ?? 'Explorer',
    avatarId: '',
    createdAt: Date.now(),
  }
}

export async function signOutCurrentUser(): Promise<void> {
  if (auth) {
    await firebaseSignOut(auth)
  }
}
