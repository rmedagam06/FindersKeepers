import type { Mood } from '@/lib/game/mood'

const MOOD_LABEL: Record<Mood, string> = {
  happy: 'Happy',
  content: 'Content',
  sleepy: 'Sleepy — hasn’t seen you in a while',
}

export function MoodDot({ mood, showLabel }: { mood: Mood; showLabel?: boolean }) {
  return (
    <span className="mood-indicator" title={MOOD_LABEL[mood]}>
      <span className={`mood-dot mood-dot--${mood}`} aria-hidden="true" />
      {showLabel && <span className="mood-indicator__label">{MOOD_LABEL[mood]}</span>}
    </span>
  )
}
