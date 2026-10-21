import type { ReactNode } from 'react'
import { Link } from '../lib/router'
import type { Route } from '../types'

const base =
  'inline-flex items-center border px-3 py-1.5 text-sm font-medium transition-colors duration-150 ease-out'

const tones = {
  idle: 'border-line bg-paper text-ink-soft hover:border-ink hover:text-ink',
  active: 'border-ink bg-ink text-paper',
  accent: 'border-cinnabar/35 bg-cinnabar-wash text-ink',
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
