import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  const classes = ['ds-button', `ds-button--${variant}`, className].filter(Boolean).join(' ')
  return <button className={classes} {...props} />
}
