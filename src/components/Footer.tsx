import { Link } from '../lib/router'
import { regions, religions } from '../lib/temples'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-12 lg:px-8">
        <div className="md:col-span-5">
          <p className="font-display text-2xl text-cream">TempleGuys</p>
          <p className="mt-3 max-w-sm text-pretty text-sm text-cream/70">
            Clear visit guides for the world’s great temples — hours, etiquette, routes, and what to know before you go.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs font-semibold uppercase text-gold-soft">Browse</p>
          <ul className="mt-3 space-y-2 text-sm text-cream/80">
            <li>
              <Link to={{ name: 'explore' }} className="hover:text-cream">
                All temples
              </Link>
            </li>
            {regions.slice(0, 4).map((r) => (
              <li key={r.slug}>
                <Link to={{ name: 'region', slug: r.slug }} className="hover:text-cream">
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="text-xs font-semibold uppercase text-gold-soft">By tradition</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {religions.map((r) => (
              <li key={r.slug}>
                <Link
                  to={{ name: 'religion', slug: r.slug }}
                  className="inline-flex rounded-full border border-cream/15 px-3 py-1 text-sm text-cream/80 no-underline hover:border-gold-soft hover:text-cream"
                >
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-cream/50">
            Temple gifts?{' '}
            <a
              href="https://hktemplegifts.com"
              className="text-cream/70 underline decoration-cream/30 hover:text-cream"
              rel="noopener noreferrer"
            >
              hktemplegifts.com
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} TempleGuys. Informational guide — verify hours before you visit.</p>
          <p>
            Photos via Unsplash where credited on temple pages.{' '}
            <Link to={{ name: 'about' }} className="hover:text-cream/70">
              Credits & about
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
