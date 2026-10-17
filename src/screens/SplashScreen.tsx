import { useEffect } from 'react'
import { CompassMark } from '@/components/ui/CompassMark'

export function SplashScreen({ onFinished }: { onFinished: () => void }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = setTimeout(onFinished, prefersReducedMotion ? 650 : 3300)
    return () => clearTimeout(timer)
  }, [onFinished])

  return (
    <section className="splash-screen" aria-label="Finders Keepers is opening">
      <div className="splash-blob splash-blob--pink" />
      <div className="splash-blob splash-blob--green" />
      <div className="splash-blob splash-blob--blue" />
      <div className="spark spark--one" />
      <div className="spark spark--two" />
      <div className="spark spark--three" />
      <div className="splash-logo">
        <CompassMark />
        <p className="splash-kicker">Go out. Look closer.</p>
        <h2>
          Finders
          <br />
          Keepers
        </h2>
        <p className="splash-subtitle">Tiny adventures are everywhere.</p>
      </div>
      <div className="splash-handle" />
    </section>
  )
}
