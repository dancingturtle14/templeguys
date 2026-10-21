import { Link } from '../lib/router'

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[50dvh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-sm font-semibold text-gold">404</p>
      <h1 className="mt-2 font-display text-3xl text-balance">Page not found</h1>
      <p className="mt-3 text-ink-soft">That path isn’t in the TempleGuys guide yet.</p>
      <Link
        to={{ name: 'explore' }}
        className="mt-6 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream no-underline"
      >
        Explore temples
      </Link>
    </div>
  )
}
