import { useLayoutEffect } from 'react'
import { Breadcrumb } from '../components/Breadcrumb'
import { FUSHIMI_INARI_TOUR, FUSHIMI_INARI_TOUR_ID } from '../data/fushimiInariTour'
import {
  MEIJI_SHRINE_MAPS_WALKING,
  MEIJI_SHRINE_TOUR,
  MEIJI_SHRINE_TOUR_END_COPY,
  MEIJI_SHRINE_TOUR_ID,
} from '../data/meijiShrineTour'
import {
  SENSO_JI_MAPS_WALKING,
  SENSO_JI_TOUR,
  SENSO_JI_TOUR_END_COPY,
  SENSO_JI_TOUR_ID,
} from '../data/sensoJiTour'
import { TourWalk } from '../components/TourWalk'
import {
  ULUWATU_MAPS_WALKING,
  ULUWATU_TOUR,
  ULUWATU_TOUR_END_COPY,
  ULUWATU_TOUR_ID,
} from '../data/uluwatuTour'
import { Link, useRouter } from '../lib/router'
import { getFushimiI18n, localizeFushimiTemple, tourChromeFor } from '../lib/fushimi-i18n'
import { getTemple } from '../lib/temples'
import { NotFoundPage } from './NotFound'
import {
  ISTIQLAL_MOSQUE_TOUR,
  ISTIQLAL_MOSQUE_TOUR_ID,
  ISTIQLAL_MOSQUE_MAPS_WALKING,
} from '../data/istiqlalMosqueTour'

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
  [MEIJI_SHRINE_TOUR_ID]: {
    title: 'Meiji Jingū on foot',
    lede: 'Six stops as a step player — one screen at a time — from the Harajuku entrance along Minami-sandō to the main shrine, with the Inner Garden as a paid last stop. Follow the route map, or open walking directions in Google Maps.',
    officialHref: 'https://www.meijijingu.or.jp/en/visit/',
    officialLabel: 'meijijingu.or.jp',
    officialNote:
      'Hours, fees, and access here follow official Meiji Jingu pages. The main precinct is free; the Inner Garden and Museum have their own clocks and fees. Confirm today\'s times at',
    stops: MEIJI_SHRINE_TOUR.stops,
    mapsWalking: MEIJI_SHRINE_MAPS_WALKING,
    endCopy: MEIJI_SHRINE_TOUR_END_COPY,
    cardTitle: 'On foot, stop by stop →',
    cardLede:
      'Six stops from the Harajuku gate along Minami-sandō to the main shrine. The Inner Garden is a paid add-on with its own hours.',
  },
  [ULUWATU_TOUR_ID]: {
    title: 'Pura Luhur Uluwatu on foot',
    lede: 'Six stops as a step player — one screen at a time — from the main gate along cliffside pathways to the Kecak amphitheatre. Follow the route map, or open walking directions in Google Maps.',
    officialHref: 'https://uluwatutemple.id/',
    officialLabel: 'uluwatutemple.id',
    officialNote:
      'Hours, fees, and access here follow official Uluwatu Temple pages. The temple ticket is separate from Kecak and parking. Sarong and sash are required and provided with the temple ticket. Published fares can change. Confirm hours and fares at',
    stops: ULUWATU_TOUR.stops,
    mapsWalking: ULUWATU_MAPS_WALKING,
    endCopy: ULUWATU_TOUR_END_COPY,
    cardTitle: 'On foot, stop by stop →',
    cardLede: 'Six stops from the main gate along cliffside pathways to the Kecak amphitheatre. The temple ticket is separate from the Kecak ticket and parking.',
  },
  [ISTIQLAL_MOSQUE_TOUR_ID]: {
    title: 'Istiqlal Mosque on foot',
    lede: 'Six stops as a step player — one screen at a time — from the main gate along the upper hallways to the inner courtyard. Follow the route map, or open walking directions in Google Maps.',
    officialHref: 'https://www.istiqlal.or.id/',
    officialLabel: 'istiqlal.or.id',
    officialNote:
      'Hours, fees, and access here follow official Istiqlal Mosque pages. No admission fee is published. Confirm hours and access at',
    stops: ISTIQLAL_MOSQUE_TOUR.stops,
    mapsWalking: ISTIQLAL_MOSQUE_MAPS_WALKING,
    endCopy: 'The six stops — named approach, entry, upper hallways, history, tunnel connection to Jakarta Cathedral, and visitor courtyard — form a complete walk through the permitted visitor areas. Allow approximately one to two hours. The mosque has no admission fee, but group visits may register through the official mosque site.',
    cardTitle: 'On foot, stop by stop →',
    cardLede: 'Six stops from the main gate along the upper hallways to the inner courtyard. The mosque has no admission fee, but group visits may register through the official mosque site.',
  },
} as const

export function TempleTourPage({ id }: { id: string }) {
  const { route } = useRouter()
  const locale = route.name === 'temple-tour' ? route.locale : undefined
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
  }, [id, locale])

  const base = TOURS[id as keyof typeof TOURS]
  if (!base) return <NotFoundPage />
  const found = getTemple(id)
  if (!found) return <NotFoundPage />
  const i18n = locale && id === 'fushimi-inari' ? getFushimiI18n(locale) : null
  const temple = i18n ? localizeFushimiTemple(found, locale!) : found
  const tour = i18n
    ? {
        ...base,
        title: i18n.tour.title,
        lede: i18n.tour.lede,
        officialHref: i18n.tour.officialHref,
        officialLabel: i18n.tour.officialLabel,
        officialNote: i18n.tour.officialNote,
        stops: i18n.stops,
        mapsWalking: i18n.tour.mapsUrl,
        endCopy: i18n.tour.endCopy,
      }
    : base
  const chrome = locale && id === 'fushimi-inari' ? tourChromeFor(locale) : undefined
  const walkKicker = i18n?.tour.walkKicker ?? i18n?.chrome.walk_kicker ?? 'Walk'
  const crumbHome = i18n?.chrome.crumb_home ?? 'Home'
  const crumbExplore = i18n?.chrome.crumb_explore ?? 'Explore'
  const crumbWalk = i18n?.chrome.on_foot_crumb ?? 'On foot'
  const crumbAria = i18n?.chrome.breadcrumb

  return (
    <article className="tour-page">
      <div className="border-b border-line bg-paper-deep/50">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8 lg:py-5">
          <Breadcrumb
            ariaLabel={crumbAria}
            items={[
              { label: crumbHome, to: { name: 'home' } },
              { label: crumbExplore, to: { name: 'explore' } },
              { label: temple.region, to: { name: 'region', slug: temple.regionSlug } },
              { label: temple.shortName, to: { name: 'temple', id: temple.id } },
              { label: crumbWalk },
            ]}
          />
        </div>
      </div>

      <div className="tour-page-body mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8 lg:py-12">
        <header className="tour-intro max-w-2xl">
          <p className="text-[0.65rem] font-semibold uppercase text-cinnabar">{walkKicker}</p>
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
            key={`${id}:${locale ?? 'en'}`}
            stops={[...tour.stops]}
            templeId={id}
            mapsWalking={tour.mapsWalking}
            endCopy={tour.endCopy}
            chrome={chrome}
          />
        </div>
      </div>
    </article>
  )
}

function TourCard({ id }: { id: keyof typeof TOURS }) {
  const { route } = useRouter()
  const locale = (route.name === 'temple' || route.name === 'temple-tour') ? route.locale : undefined
  const base = TOURS[id]
  const i18n = locale && id === 'fushimi-inari' ? getFushimiI18n(locale) : null
  const cardTitle = i18n?.tour.walkCardTitle ?? base.cardTitle
  const cardLede = i18n?.tour.walkCardLede ?? base.cardLede
  const walkKicker = i18n?.tour.walkKicker ?? i18n?.chrome.walk_kicker ?? 'Walk'
  return (
    <Link
      to={{ name: 'temple-tour', id }}
      className="block border border-cinnabar/40 bg-paper px-4 py-4 no-underline hover:border-ink"
    >
      <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-cinnabar">{walkKicker}</span>
      <span className="mt-1 block font-display text-2xl text-ink">{cardTitle}</span>
      <span className="mt-2 block max-w-xl text-sm text-ink-soft">{cardLede}</span>
    </Link>
  )
}

export function FushimiTourCard() {
  return <TourCard id={FUSHIMI_INARI_TOUR_ID} />
}

export function SensoJiTourCard() {
  return <TourCard id={SENSO_JI_TOUR_ID} />
}

export function MeijiShrineTourCard() {
  return <TourCard id={MEIJI_SHRINE_TOUR_ID} />
}

export function UluwatuTourCard() {
  return <TourCard id={ULUWATU_TOUR_ID} />
}

export function IstiqlalMosqueTourCard() {
  return <TourCard id={ISTIQLAL_MOSQUE_TOUR_ID} />
}