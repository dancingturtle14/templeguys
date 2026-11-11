import { useLayoutEffect } from 'react'
import { Breadcrumb } from '../components/Breadcrumb'
import { TourWalk } from '../components/TourWalk'
import { FUSHIMI_INARI_TOUR_ID } from '../data/fushimiInariTour'
import { Link } from '../lib/router'
import { getTemple } from '../lib/temples'
import { NotFoundPage } from './NotFound'

export function TempleTourPage({ id }: { id: string }) {
  // Mobile walk CSS clips document scroll and moves it to #main. Reset both
  // after the tour is in the DOM so a client entry from a scrolled overview
  // cannot leave the window stuck mid-page behind overflow:clip.
  useLayoutEffect(() => {
    const reset = () => {
      window.scrollTo(0, 0)
      document.getElementById('main')?.scrollTo(0, 0)
    }
    reset()
    const frame = requestAnimationFrame(reset)
    return () => cancelAnimationFrame(frame)
  }, [id])

  if (id !== FUSHIMI_INARI_TOUR_ID) return <NotFoundPage />
  const temple = getTemple(id)
  if (!temple) return <NotFoundPage />

  return (
    <article className="tour-page">
      <div className="border-b border-line bg-paper-deep/50">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8 lg:py-5">
          <Breadcrumb
            items={[
              { label: 'Home', to: { name: 'home' } },
              { label: 'Explore', to: { name: 'explore' } },
              { label: temple.region, to: { name: 'region', slug: temple.regionSlug } },
              { label: temple.shortName, to: { name: 'temple', id: temple.id } },
              { label: 'On foot' },
            ]}
          />
        </div>
      </div>

      <div className="tour-page-body mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8 lg:py-12">
        <header className="tour-intro max-w-2xl">
          <p className="text-[0.65rem] font-semibold uppercase text-cinnabar">Walk</p>
          <h1 className="mt-3 font-display text-4xl text-balance sm:text-6xl">Fushimi Inari on foot</h1>
          <p className="mt-4 text-pretty text-lg text-ink-soft">
            Six stops as a step player — one screen at a time — from Inari Station to Yotsutsuji. Follow the route map, or open walking directions in Google Maps. The summit loop stays closed until you open it.
          </p>
          <p className="mt-3 text-sm text-ink-muted">
            Times here are the usual visitor pattern, not a printed shrine timetable. Confirm office hours on the board or at{' '}
            <a href="https://inari.jp/en/" target="_blank" rel="noopener noreferrer">
              inari.jp
            </a>
            .
          </p>
        </header>

        <div className="tour-walk-wrap mt-10">
          <TourWalk />
        </div>
      </div>
    </article>
  )
}

export function FushimiTourCard() {
  return (
    <Link
      to={{ name: 'temple-tour', id: FUSHIMI_INARI_TOUR_ID }}
      className="block border border-cinnabar/40 bg-paper px-4 py-4 no-underline hover:border-ink"
    >
      <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-cinnabar">Walk</span>
      <span className="mt-1 block font-display text-2xl text-ink">On foot, stop by stop →</span>
      <span className="mt-2 block max-w-xl text-sm text-ink-soft">
        Six stops, with must-see spots and named objects along the path. The summit loop stays closed until you open it.
      </span>
    </Link>
  )
}
