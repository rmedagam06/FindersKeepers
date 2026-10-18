/** Tiny Web Audio chimes + haptic vibration for catch/evolve/achievement
 * moments. Best-effort only — silently no-ops if AudioContext/vibrate
 * aren't available or the browser blocks autoplay before a user gesture. */

let audioContext: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const AudioContextClass = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AudioContextClass) return null
  if (!audioContext) audioContext = new AudioContextClass()
  return audioContext
}

function playTone(frequency: number, durationMs: number, delayMs = 0) {
  const ctx = getAudioContext()
  if (!ctx) return
  try {
    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.value = frequency
    oscillator.connect(gain)
    gain.connect(ctx.destination)
    const startTime = ctx.currentTime + delayMs / 1000
    gain.gain.setValueAtTime(0.0001, startTime)
    gain.gain.exponentialRampToValueAtTime(0.2, startTime + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + durationMs / 1000)
    oscillator.start(startTime)
    oscillator.stop(startTime + durationMs / 1000 + 0.05)
  } catch {
    // ignore — e.g. autoplay policy blocked context resume
  }
}

export function playCatchSound() {
  playTone(660, 140)
  playTone(880, 160, 100)
}

export function playEvolveSound() {
  playTone(440, 120)
  playTone(660, 120, 90)
  playTone(880, 220, 180)
}

export function playAchievementSound() {
  playTone(784, 150)
  playTone(988, 220, 120)
}

export function vibrate(pattern: number | number[] = 40) {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(pattern)
  }
}
