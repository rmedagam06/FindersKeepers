import { useState } from 'react'
import { AVATAR_IDS, getAvatarArt } from '@/lib/assets'
import { Button } from '@/components/ui/Button'
import { useAppStore } from '@/store/useAppStore'

export function AvatarPickScreen() {
  const setAvatar = useAppStore((state) => state.setAvatar)
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <section className="avatar-screen" aria-label="Choose your character">
      <p className="eyebrow">Who are you today?</p>
      <h1 className="avatar-title">Pick your look.</h1>

      <div className="avatar-grid">
        {AVATAR_IDS.map((avatarId) => (
          <button
            key={avatarId}
            className={selected === avatarId ? 'avatar-card is-selected' : 'avatar-card'}
            onClick={() => setSelected(avatarId)}
            aria-pressed={selected === avatarId}
            aria-label={`Avatar ${avatarId}`}
          >
            <img src={getAvatarArt(avatarId)} alt="" width={72} height={72} />
          </button>
        ))}
      </div>

      <Button variant="primary" disabled={!selected} onClick={() => selected && setAvatar(selected)}>
        Confirm
      </Button>
    </section>
  )
}
