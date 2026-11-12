import { useLayoutEffect } from 'react'
import { Breadcrumb } from '../components/Breadcrumb'
import { TourWalk } from '../components/TourWalk'
import { FUSHIMI_INARI_TOUR, FUSHIMI_INARI_TOUR_ID } from '../data/fushimiInariTour'
import {
  SENSO_JI_MAPS_WALKING,
  SENSO_JI_TOUR,
  SENSO_JI_TOUR_END_COPY,
  SENSO_JI_TOUR_ID,
} from '../data/sensoJiTour'
import { Link } from '../lib/router'
import { getTemple } from '../lib/temples'
import { NotFoundPage } from './NotFound'

const FUSHIMI_MAPS =
  'https://www.google.com/maps/dir/?api=1&destination=Fushimi+Inari+Taisha,+Kyoto&travelmode=walking'
const FUSHIMI_END =
  'The lower gates and Yotsutsuji are a complete visit for most people. The summit loop can wait for another morning.'

const TOURS = {
  [FUSHIMI_INARI_TOUR_ID]: {
    title: 'Fushimi Inari on foot',
    lede: 'Six stops as a step player — one screen at a time — from Inari Station to Yotsutsuji. Follow the route map, or open walking directions in Google Maps. The summit loop stays closed until you open it.',
    officialHref: 'https://inari.jp/en/',
    officialLabel: 'inari.jp',
    officialNote:
      'Times here are the usual visitor pattern, not a printed shrine timetable. Confirm office hours on the board or at',
    stops: FUSHIMI_INARI_TOUR.stops,
    mapsWalking: FUSHIMI_MAPS,
    endCopy: FUSHIMI_END,
    cardTitle: 'On foot, stop by stop →',
    cardLede:
      'Six stops, with must-see spots and named objects along the path. The summit loop stays closed until you open it.',
  },
  [SENSO_JI_TOUR_ID]: {
    title: 'Sensō-ji on foot',
    lede: 'Six stops as a step player — one screen at a time — from Kaminarimon along Nakamise to the Hondo and the five-storied pagoda. Follow the route map, or open walking directions in Google Maps.',
    officialHref: 'https://www.senso-ji.jp/',
    officialLabel: 'senso-ji.jp',
    officialNote:
      'Hours, offerings, and access here follow official Sensō-ji pages. Official visitor pages list no general admission ticket. Confirm hall hours and prayer offerings at',
    stops: SENSO_JI_TOUR.stops,
    mapsWalking: SENSO_JI_MAPS_WALKING,
    endCopy: SENSO_JI_TOUR_END_COPY,
    cardTitle: 'On foot, stop by stop →',
    cardLede:
      'Six stops along the Kaminarimon–Nakamise–Hondo axis, with must-see spots and named objects. The pagoda is viewed from the precinct.',
  },
} as const

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

  const tour = TOURS[id as keyof typeof TOURS]
  if (!tour) return <NotFoundPage />
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
          <h1 className="mt-3 font-display text-4xl text-balance sm:text-6xl">{tour.title}</h1>
          <p className="mt-4 text-pretty text-lg text-ink-soft">{tour.lede}</p>
          <p className="mt-3 text-sm text-ink-muted">
            {tour.officialNote}{' '}
            <a href={tour.officialHref} target="_blank" rel="noopener noreferrer">
              {tour.officialLabel}
            </a>
            .
          </p>
        </header>

        <div className="tour-walk-wrap mt-10">
          <TourWalk
            key={id}
            stops={[...tour.stops]}
            templeId={id}
            mapsWalking={tour.mapsWalking}
            endCopy={tour.endCopy}
          />
        </div>
      </div>
    </article>
  )
}

function TourCard({ id }: { id: keyof typeof TOURS }) {
  const tour = TOURS[id]
  return (
    <Link
      to={{ name: 'temple-tour', id }}
      className="block border border-cinnabar/40 bg-paper px-4 py-4 no-underline hover:border-ink"
    >
      <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-cinnabar">Walk</span>
      <span className="mt-1 block font-display text-2xl text-ink">{tour.cardTitle}</span>
      <span className="mt-2 block max-w-xl text-sm text-ink-soft">{tour.cardLede}</span>
    </Link>
  )
}

export function FushimiTourCard() {
  return <TourCard id={FUSHIMI_INARI_TOUR_ID} />
}

export function SensoJiTourCard() {
  return <TourCard id={SENSO_JI_TOUR_ID} />
}
