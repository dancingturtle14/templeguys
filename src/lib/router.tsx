import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
  type MouseEvent,
  type AnchorHTMLAttributes,
} from 'react'
import type { Route, TempleChapter } from '../types'
import { parseLocaleFromPath, stripLocaleFromPath } from './fushimi-i18n'
import { isLocalizedTemple } from './senso-ji-i18n'

/** Vite BASE_URL, e.g. `/` on apex domain or project Pages path. */
function getBase(): string {
  return import.meta.env.BASE_URL || '/'
}

/** Strip deploy base so route matching uses app paths like `/explore`. */
function stripBase(pathname: string): string {
  const base = getBase().replace(/\/+$/, '')
  if (base && (pathname === base || pathname.startsWith(base + '/'))) {
    const rest = pathname.slice(base.length)
    return rest && rest !== '' ? rest : '/'
  }
  return pathname
}

/** Prefix app path with BASE_URL for History API and <a href>. */
function withBase(path: string): string {
  const base = getBase()
  if (path === '/') return base
  const q = path.indexOf('?')
  const pathname = q === -1 ? path : path.slice(0, q)
  const search = q === -1 ? '' : path.slice(q)
  return base.replace(/\/+$/, '') + pathname + search
}

const CHAPTERS = new Set<string>([
  'visit',
  'etiquette',
  'getting-there',
  'best-time',
  'notes',
])

export function parsePath(pathname: string, search: string): Route {
  const appPath = stripBase(pathname)
  const locale = parseLocaleFromPath(appPath)
  const path = stripLocaleFromPath(appPath).replace(/\/+$/, '') || '/'
  const params = new URLSearchParams(search)

  if (path === '/') {
    return locale ? { name: 'notfound' } : { name: 'home' }
  }
  if (path === '/explore') {
    if (locale) return { name: 'notfound' }
    return {
      name: 'explore',
      q: params.get('q') || undefined,
      region: params.get('region') || undefined,
      religion: params.get('religion') || undefined,
    }
  }
  if (path === '/about') {
    return locale ? { name: 'notfound' } : { name: 'about' }
  }

  const templeTour = path.match(/^\/temple\/([^/]+)\/tour$/)
  if (templeTour) {
    const id = decodeURIComponent(templeTour[1])
    if (locale && !isLocalizedTemple(id)) return { name: 'notfound' }
    if (locale) return { name: 'temple-tour', id, locale }
    return { name: 'temple-tour', id }
  }

  const templeChapter = path.match(/^\/temple\/([^/]+)\/([^/]+)$/)
  if (templeChapter && CHAPTERS.has(templeChapter[2])) {
    const id = decodeURIComponent(templeChapter[1])
    if (locale && !isLocalizedTemple(id)) return { name: 'notfound' }
    const chapter = templeChapter[2] as TempleChapter
    if (locale) return { name: 'temple', id, chapter, locale }
    return { name: 'temple', id, chapter }
  }

  const temple = path.match(/^\/temple\/([^/]+)$/)
  if (temple) {
    const id = decodeURIComponent(temple[1])
    if (locale && !isLocalizedTemple(id)) return { name: 'notfound' }
    if (locale) return { name: 'temple', id, chapter: 'overview', locale }
    return { name: 'temple', id, chapter: 'overview' }
  }

  const region = path.match(/^\/region\/([^/]+)$/)
  if (region) {
    return locale ? { name: 'notfound' } : { name: 'region', slug: decodeURIComponent(region[1]) }
  }

  const religion = path.match(/^\/religion\/([^/]+)$/)
  if (religion) {
    return locale ? { name: 'notfound' } : { name: 'religion', slug: decodeURIComponent(religion[1]) }
  }

  return { name: 'notfound' }
}

export function inheritLocale(current: Route, next: Route): Route {
  if (next.name !== 'temple' && next.name !== 'temple-tour') return next
  if (next.locale || !isLocalizedTemple(next.id)) return next
  if ((current.name === 'temple' || current.name === 'temple-tour') && current.locale) {
    return { ...next, locale: current.locale }
  }
  return next
}

/** Official app paths end with a trailing slash; query strings stay after it. */
function withTrailingSlash(path: string): string {
  const q = path.indexOf('?')
  const pathname = q === -1 ? path : path.slice(0, q)
  const search = q === -1 ? '' : path.slice(q)
  if (pathname === '/') return pathname + search
  return (pathname.endsWith('/') ? pathname : `${pathname}/`) + search
}

export function routeToUrl(route: Route): string {
  let path: string
  switch (route.name) {
    case 'home':
      path = '/'
      break
    case 'explore': {
      const p = new URLSearchParams()
      if (route.q) p.set('q', route.q)
      if (route.region) p.set('region', route.region)
      if (route.religion) p.set('religion', route.religion)
      const qs = p.toString()
      path = qs ? `/explore?${qs}` : '/explore'
      break
    }
    case 'temple': {
      const ch = route.chapter && route.chapter !== 'overview' ? `/${route.chapter}` : ''
      path = `/temple/${route.id}${ch}`
      break
    }
    case 'temple-tour':
      path = `/temple/${route.id}/tour/`
      break
    case 'region':
      path = `/region/${route.slug}`
      break
    case 'religion':
      path = `/religion/${route.slug}`
      break
    case 'about':
      path = '/about'
      break
    default:
      path = '/'
  }

  if (
    (route.name === 'temple' || route.name === 'temple-tour') &&
    route.locale &&
    isLocalizedTemple(route.id)
  ) {
    path = `/${route.locale}${path}`
  }

  return withBase(withTrailingSlash(path))
}

type RouterCtx = {
  route: Route
  navigate: (route: Route, opts?: { replace?: boolean }) => void
  href: (route: Route) => string
}

const Ctx = createContext<RouterCtx | null>(null)

export function RouterProvider({
  children,
  location,
}: {
  children: ReactNode
  /** Set during prerender so the first render does not touch `window`. */
  location?: { pathname: string; search: string }
}) {
  const [route, setRoute] = useState<Route>(() => {
    if (location) return parsePath(location.pathname, location.search)
    return parsePath(window.location.pathname, window.location.search)
  })

  useEffect(() => {
    const onPop = () => setRoute(parsePath(window.location.pathname, window.location.search))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback(
    (next: Route, opts?: { replace?: boolean }) => {
      const resolved = inheritLocale(route, next)
      const url = routeToUrl(resolved)
      if (opts?.replace) window.history.replaceState(null, '', url)
      else window.history.pushState(null, '', url)
      setRoute(resolved)
      window.scrollTo(0, 0)
    },
    [route],
  )

  const href = useCallback((next: Route) => routeToUrl(inheritLocale(route, next)), [route])

  const value = useMemo(
    () => ({ route, navigate, href }),
    [route, navigate, href],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useRouter() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useRouter outside provider')
  return ctx
}

export function Link({
  to,
  className,
  children,
  onClick,
  ...rest
}: {
  to: Route
  className?: string
  children: ReactNode
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const { href, navigate } = useRouter()
  return (
    <a
      href={href(to)}
      className={className}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e)
        if (e.defaultPrevented) return
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        e.preventDefault()
        navigate(to)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
