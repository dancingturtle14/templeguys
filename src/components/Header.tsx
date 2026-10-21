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
    <header className="sticky top-0 z-20 border-b border-line bg-paper">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link to={{ name: 'home' }} className="group flex items-baseline gap-2 no-underline">
          <span className="font-display text-2xl font-medium tracking-normal text-ink sm:text-[1.65rem]">
            SanctaWay
          </span>
          <span className="hidden text-[0.65rem] font-medium uppercase text-ink-muted sm:inline">
            Atlas
          </span>
        </Link>

        <nav className="hidden items-center gap-6 sm:flex" aria-label="Primary">
          {nav.map((item) => {
            const active =
              (item.to.name === 'explore' &&
                (route.name === 'explore' || route.name === 'region' || route.name === 'religion')) ||
              (item.to.name === 'about' && route.name === 'about')
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`relative pb-0.5 text-sm font-medium no-underline transition-colors duration-150 ease-out ${
                  active ? 'text-ink' : 'text-ink-muted hover:text-ink'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
                {active && (
                  <span
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-cinnabar"
                    aria-hidden="true"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center border border-line sm:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-paper-deep px-4 py-3 sm:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="px-1 py-2.5 text-sm font-medium no-underline hover:text-cinnabar"
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
