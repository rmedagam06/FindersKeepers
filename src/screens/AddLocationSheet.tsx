import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { LOCATION_CATEGORIES } from '@/data/locationCategories'
import type { LocationCategory, LocationVisibility } from '@/types/models'

interface AddLocationSheetProps {
  lat: number
  lng: number
  onSave: (input: { label: string; category: LocationCategory; visibility: LocationVisibility }) => void
  onCancel: () => void
}

export function AddLocationSheet({ onSave, onCancel }: AddLocationSheetProps) {
  const [label, setLabel] = useState('')
  const [category, setCategory] = useState<LocationCategory>('gym')
  const [shareWithFriends, setShareWithFriends] = useState(false)

  return (
    <Modal label="Add a place" onClose={onCancel}>
      <h2 className="sheet-title">Add this place</h2>
      <input
        className="sheet-input"
        placeholder="e.g. My gym"
        value={label}
        onChange={(event) => setLabel(event.target.value)}
        aria-label="Place name"
      />
      <div className="category-row category-row--wrap" aria-label="Category">
        {LOCATION_CATEGORIES.map((item) => (
          <button
            key={item.id}
            className={category === item.id ? 'category-pill is-active' : 'category-pill'}
            onClick={() => setCategory(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <label className="sheet-checkbox">
        <input type="checkbox" checked={shareWithFriends} onChange={(event) => setShareWithFriends(event.target.checked)} />
        Share this pin with friends (just the pin + name — never your exact address)
      </label>
      <div className="auth-actions">
        <Button
          variant="primary"
          disabled={!label.trim()}
          onClick={() => onSave({ label: label.trim(), category, visibility: shareWithFriends ? 'friends' : 'private' })}
        >
          Save place
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Modal>
  )
}
