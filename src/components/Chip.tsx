import type { ReactNode } from 'react'
import { Link } from '../lib/router'
import type { Route } from '../types'

const base =
  'inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors duration-150 ease-out'

const tones = {
  idle: 'border-line bg-cream text-ink-soft hover:border-gold-soft hover:bg-gold-wash',
  active: 'border-ink bg-ink text-cream',
  gold: 'border-gold/40 bg-gold-wash text-ink',
} as const

export function Chip({
  children,
  active,
  tone = 'idle',
  to,
  onClick,
  type = 'button',
}: {
  children: ReactNode
  active?: boolean
  tone?: keyof typeof tones
  to?: Route
  onClick?: () => void
  type?: 'button' | 'submit'
}) {
  const className = `${base} ${active ? tones.active : tones[tone]}`
  if (to) {
    return (
      <Link to={to} className={className} aria-current={active ? 'page' : undefined}>
        {children}
      </Link>
    )
  }
  return (
    <button type={type} className={className} onClick={onClick} aria-pressed={active}>
      {children}
    </button>
  )
}
