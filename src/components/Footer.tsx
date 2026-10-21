import { Link } from '../lib/router'
import { regions, religions } from '../lib/temples'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-12 lg:px-8">
        <div className="md:col-span-5">
          <p className="font-display text-3xl text-paper">SanctaWay</p>
          <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-paper/65">
            A quiet atlas of temples, churches, mosques, shrines, and pilgrimage sites — hours,
            etiquette, routes, and what to know before you go.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="text-[0.65rem] font-semibold uppercase text-cinnabar-wash/90">Browse</p>
          <ul className="mt-4 space-y-2.5 text-sm text-paper/75">
            <li>
              <Link to={{ name: 'explore' }} className="hover:text-paper">
                All places
              </Link>
            </li>
            {regions.slice(0, 4).map((r) => (
              <li key={r.slug}>
                <Link to={{ name: 'region', slug: r.slug }} className="hover:text-paper">
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="text-[0.65rem] font-semibold uppercase text-cinnabar-wash/90">By tradition</p>
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
            {religions.map((r) => (
              <li key={r.slug}>
                <Link
                  to={{ name: 'religion', slug: r.slug }}
                  className="text-sm text-paper/75 no-underline hover:text-paper"
                >
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-paper/45">
            Temple gifts?{' '}
            <a
              href="https://hktemplegifts.com"
              className="text-paper/65 underline decoration-paper/25 hover:text-paper"
              rel="noopener noreferrer"
            >
              hktemplegifts.com
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} SanctaWay. Informational guide — verify hours before you visit.</p>
          <p>
            Photos via Unsplash where credited.{' '}
            <Link to={{ name: 'about' }} className="hover:text-paper/70">
              Credits & about
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
