import type { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
  onClose?: () => void
  label: string
}

export function Modal({ children, onClose, label }: ModalProps) {
  return (
    <div className="ds-modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="ds-modal"
        role="dialog"
        aria-modal="true"
        aria-label={label}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
