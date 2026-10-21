import { useState } from 'react'
import { Link, useRouter } from '../lib/router'

const nav = [
  { label: 'Explore', to: { name: 'explore' as const } },
  { label: 'About', to: { name: 'about' as const } },
]

export function Header() {
  const { route } = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 border-b border-line/80 bg-cream/90 backdrop-blur-md supports-backdrop-filter:bg-cream/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to={{ name: 'home' }} className="flex items-center gap-2.5 no-underline">
          <span className="flex size-8 items-center justify-center rounded-lg bg-ink text-gold-soft" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
              <path d="M12 3l7 8h-3v8H8v-8H5l7-8z" />
            </svg>
          </span>
          <span className="font-display text-lg font-semibold text-ink">TempleGuys</span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex" aria-label="Primary">
          {nav.map((item) => {
            const active =
              (item.to.name === 'explore' && (route.name === 'explore' || route.name === 'region' || route.name === 'religion')) ||
              (item.to.name === 'about' && route.name === 'about')
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium no-underline transition-colors duration-150 ease-out ${
                  active ? 'bg-ink text-cream' : 'text-ink-soft hover:bg-cream-deep hover:text-ink'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg border border-line sm:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.75">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-line px-4 py-3 sm:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="rounded-lg px-3 py-2.5 text-sm font-medium no-underline hover:bg-cream-deep"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
