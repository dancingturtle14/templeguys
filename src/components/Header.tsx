import { useEffect, useRef, useState } from 'react'
import { Link, useRouter } from '../lib/router'
import { regions, religions } from '../lib/temples'
import type { Route } from '../types'

function routeKey(route: Route) {
  switch (route.name) {
    case 'region':
    case 'religion':
      return `${route.name}:${route.slug}`
    case 'temple':
      return `temple:${route.id}:${route.chapter ?? ''}`
    case 'explore':
      return `explore:${route.q ?? ''}:${route.region ?? ''}:${route.religion ?? ''}`
    default:
      return route.name
  }
}

function hubCurrent(route: Route, to: Route) {
  if (to.name === 'region') return route.name === 'region' && route.slug === to.slug
  if (to.name === 'religion') return route.name === 'religion' && route.slug === to.slug
  return false
}

function HubMenu({
  label,
  active,
  items,
  layout,
  align = 'start',
  onNavigate,
}: {
  label: string
  active: boolean
  items: { label: string; to: Route }[]
  layout: 'bar' | 'drawer'
  align?: 'start' | 'end'
  onNavigate?: () => void
}) {
  const { route } = useRouter()
  const detailsRef = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    const details = detailsRef.current
    if (!details) return

    function onPointerDown(event: PointerEvent) {
      if (!details?.open) return
      if (event.target instanceof Node && details.contains(event.target)) return
      details.open = false
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && details) details.open = false
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const panel =
    layout === 'bar' ? (
      <div className={`absolute top-full z-30 min-w-52 pt-1 ${align === 'end' ? 'right-0' : 'left-0'}`}>
        <ul className="max-h-[70vh] overflow-y-auto border border-line bg-paper py-1">
          {items.map((item) => (
            <li key={item.to.name + ('slug' in item.to ? item.to.slug : item.label)}>
              <HubLink item={item} route={route} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <ul className="border-l border-line py-1 pl-3">
        {items.map((item) => (
          <li key={item.to.name + ('slug' in item.to ? item.to.slug : item.label)}>
            <HubLink item={item} route={route} onNavigate={onNavigate} drawer />
          </li>
        ))}
      </ul>
    )

  return (
    <details
      ref={detailsRef}
      className={layout === 'bar' ? 'relative' : undefined}
      onMouseEnter={
        layout === 'bar'
          ? () => {
              if (detailsRef.current) detailsRef.current.open = true
            }
          : undefined
      }
      onMouseLeave={
        layout === 'bar'
          ? () => {
              if (detailsRef.current) detailsRef.current.open = false
            }
          : undefined
      }
    >
      <summary
        className={`cursor-pointer list-none marker:content-none [&::-webkit-details-marker]:hidden ${
          layout === 'bar'
            ? `relative pb-0.5 text-sm font-medium ${active ? 'text-ink' : 'text-ink-muted hover:text-ink'}`
            : `px-1 py-2.5 text-sm font-medium ${active ? 'text-ink' : 'text-ink-soft'}`
        }`}
        onClick={(event) => {
          if (layout !== 'bar' || event.detail === 0) return
          if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) event.preventDefault()
        }}
      >
        <span className="inline-flex items-center gap-1">
          <span>{label}</span>
          <svg
            viewBox="0 0 12 12"
            className="size-2.5 opacity-70"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M2 4.5 6 8l4-3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        {active && layout === 'bar' ? (
          <span className="absolute inset-x-0 -bottom-0.5 h-px bg-cinnabar" aria-hidden="true" />
        ) : null}
      </summary>
      {panel}
    </details>
  )
}

function HubLink({
  item,
  route,
  onNavigate,
  drawer = false,
}: {
  item: { label: string; to: Route }
  route: Route
  onNavigate?: () => void
  drawer?: boolean
}) {
  const current = hubCurrent(route, item.to)
  return (
    <Link
      to={item.to}
      aria-current={current ? 'page' : undefined}
      onClick={onNavigate}
      className={
        drawer
          ? `block py-1.5 text-sm no-underline ${current ? 'text-ink' : 'text-ink-soft hover:text-cinnabar'}`
          : `block px-3 py-2 text-sm no-underline ${
              current ? 'bg-ink text-paper' : 'text-ink-soft hover:bg-cinnabar-wash/40 hover:text-ink'
            }`
      }
    >
      {item.label}
    </Link>
  )
}

const regionItems = regions.map((item) => ({
  label: item.label,
  to: { name: 'region' as const, slug: item.slug },
}))

const religionItems = religions.map((item) => ({
  label: item.label,
  to: { name: 'religion' as const, slug: item.slug },
}))

function PrimaryItems({
  layout,
  onNavigate,
}: {
  layout: 'bar' | 'drawer'
  onNavigate?: () => void
}) {
  const { route } = useRouter()
  const key = routeKey(route)
  const linkClass =
    layout === 'bar'
      ? 'relative pb-0.5 text-sm font-medium no-underline'
      : 'px-1 py-2.5 text-sm font-medium no-underline'

  return (
    <>
      <NavLink
        to={{ name: 'explore' }}
        label="Explore"
        active={route.name === 'explore'}
        className={linkClass}
        onNavigate={onNavigate}
        bar={layout === 'bar'}
      />
      <HubMenu
        key={`regions-${key}`}
        label="Regions"
        active={route.name === 'region'}
        items={regionItems}
        layout={layout}
        onNavigate={onNavigate}
      />
      <HubMenu
        key={`traditions-${key}`}
        label="Traditions"
        active={route.name === 'religion'}
        items={religionItems}
        layout={layout}
        align="end"
        onNavigate={onNavigate}
      />
      <NavLink
        to={{ name: 'about' }}
        label="About"
        active={route.name === 'about'}
        className={linkClass}
        onNavigate={onNavigate}
        bar={layout === 'bar'}
      />
    </>
  )
}

function NavLink({
  to,
  label,
  active,
  className,
  onNavigate,
  bar,
}: {
  to: Route
  label: string
  active: boolean
  className: string
  onNavigate?: () => void
  bar: boolean
}) {
  return (
    <Link
      to={to}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      className={`${className} transition-colors duration-150 ease-out ${
        active ? 'text-ink' : bar ? 'text-ink-muted hover:text-ink' : 'hover:text-cinnabar'
      }`}
    >
      {label}
      {active && bar ? (
        <span className="absolute inset-x-0 -bottom-0.5 h-px bg-cinnabar" aria-hidden="true" />
      ) : null}
    </Link>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

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
          <PrimaryItems layout="bar" />
        </nav>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center border border-line sm:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
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

      {open ? (
        <div className="fixed inset-x-0 top-14 z-30 max-h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain border-t border-line bg-paper-deep px-4 py-3 sm:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            <PrimaryItems layout="drawer" onNavigate={close} />
          </nav>
        </div>
      ) : null}
    </header>
  )
}
