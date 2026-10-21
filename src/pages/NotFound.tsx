import { Link } from '../lib/router'

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[50dvh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-[0.7rem] font-semibold uppercase text-cinnabar">404</p>
      <h1 className="mt-3 font-display text-4xl text-balance">Page not found</h1>
      <p className="mt-4 text-ink-soft">That path isn’t on the SanctaWay atlas yet.</p>
      <Link
        to={{ name: 'explore' }}
        className="mt-8 bg-ink px-5 py-2.5 text-sm font-semibold text-paper no-underline"
      >
        Explore places
      </Link>
    </div>
  )
}
