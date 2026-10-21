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

/** Vite BASE_URL, e.g. `/templeguys/` on Pages or `/` locally with default. */
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

function parsePath(pathname: string, search: string): Route {
  const path = stripBase(pathname).replace(/\/+$/, '') || '/'
  const params = new URLSearchParams(search)

  if (path === '/') return { name: 'home' }
  if (path === '/explore') {
    return {
      name: 'explore',
      q: params.get('q') || undefined,
      region: params.get('region') || undefined,
      religion: params.get('religion') || undefined,
    }
  }
  if (path === '/about') return { name: 'about' }

  const templeChapter = path.match(/^\/temple\/([^/]+)\/([^/]+)$/)
  if (templeChapter && CHAPTERS.has(templeChapter[2])) {
    return {
      name: 'temple',
      id: decodeURIComponent(templeChapter[1]),
      chapter: templeChapter[2] as TempleChapter,
    }
  }

  const temple = path.match(/^\/temple\/([^/]+)$/)
  if (temple) {
    return { name: 'temple', id: decodeURIComponent(temple[1]), chapter: 'overview' }
  }

  const region = path.match(/^\/region\/([^/]+)$/)
  if (region) return { name: 'region', slug: decodeURIComponent(region[1]) }

  const religion = path.match(/^\/religion\/([^/]+)$/)
  if (religion) return { name: 'religion', slug: decodeURIComponent(religion[1]) }

  return { name: 'notfound' }
}

function routeToUrl(route: Route): string {
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
  return withBase(path)
}

type RouterCtx = {
  route: Route
  navigate: (route: Route, opts?: { replace?: boolean }) => void
  href: (route: Route) => string
}

const Ctx = createContext<RouterCtx | null>(null)

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() =>
    parsePath(window.location.pathname, window.location.search),
  )

  useEffect(() => {
    const onPop = () => setRoute(parsePath(window.location.pathname, window.location.search))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((next: Route, opts?: { replace?: boolean }) => {
    const url = routeToUrl(next)
    if (opts?.replace) window.history.replaceState(null, '', url)
    else window.history.pushState(null, '', url)
    setRoute(next)
    window.scrollTo(0, 0)
  }, [])

  const value = useMemo(
    () => ({ route, navigate, href: routeToUrl }),
    [route, navigate],
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
