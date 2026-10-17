import { useState } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { SplashScreen } from '@/screens/SplashScreen'
import { SignInScreen } from '@/screens/SignInScreen'
import { AvatarPickScreen } from '@/screens/AvatarPickScreen'
import { PermissionIntroScreen } from '@/screens/PermissionIntroScreen'
import { HomeMapScreen } from '@/screens/HomeMapScreen'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const user = useAppStore((state) => state.user)
  const hasSeenPermissionIntro = useAppStore((state) => state.hasSeenPermissionIntro)

  if (showSplash) {
    return (
      <main className="app-shell">
        <SplashScreen onFinished={() => setShowSplash(false)} />
      </main>
    )
  }

  if (!user) {
    return (
      <main className="app-shell">
        <SignInScreen />
      </main>
    )
  }

  if (!user.avatarId) {
    return (
      <main className="app-shell">
        <AvatarPickScreen />
      </main>
    )
  }

  if (!hasSeenPermissionIntro) {
    return (
      <main className="app-shell">
        <PermissionIntroScreen />
      </main>
    )
  }

  return (
    <main className="app-shell">
      <HomeMapScreen />
    </main>
  )
}
