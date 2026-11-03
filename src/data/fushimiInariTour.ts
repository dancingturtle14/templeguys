import type { Route } from '../types'

/** Stable ids for the Phase 2 voice player. Phase 1 has no audio. */
export const FUSHIMI_INARI_TOUR_ID = 'fushimi-inari'

export const FUSHIMI_TOUR_STOP_IDS = [
  'arrival',
  'senbon-torii',
  'path-pauses',
  'yotsutsuji',
  'summit',
  'descent',
] as const

export type FushimiTourStopId = (typeof FUSHIMI_TOUR_STOP_IDS)[number]

export type TourChip = {
  label: string
  to?: Route
  href?: string
}

export type TourImage = {
  src: string
  alt: string
  credit: string
  caption: string
  /** Portrait crop. Summit images also stay low priority while collapsed. */
  tall?: boolean
}

export type TourStop = {
  id: FushimiTourStopId
  index: string
  nav: string
  plate: string
  caption: string
  sentences: string[]
  chips: TourChip[]
  images: TourImage[]
  optional?: boolean
}

const etiquette: Route = { name: 'temple', id: FUSHIMI_INARI_TOUR_ID, chapter: 'etiquette' }
const gettingThere: Route = {
  name: 'temple',
  id: FUSHIMI_INARI_TOUR_ID,
  chapter: 'getting-there',
}

export const FUSHIMI_INARI_TOUR: { stops: TourStop[] } = {
  stops: [
    {
      id: 'arrival',
      index: '01',
      nav: 'Arrival',
      plate: 'From the station to the gate',
      caption: 'Romon, the main gate, then the temizuya.',
      sentences: [
        'JR Nara Line local trains stop at Inari, two stops south of Kyoto Station.',
        'Many rapid trains skip Inari, so read the platform screen before you board, then walk a few minutes up to the shrine.',
        'You pass the vermilion romon, the main gate, and a temizuya basin for rinsing hands before the sanctuary buildings.',
        'There is no admission fee for the grounds or the mountain paths.',
      ],
      chips: [
        { label: 'JR Inari' },
        { label: 'Local train' },
        { label: 'Romon' },
        { label: 'Temizuya' },
        { label: 'Free precinct' },
      ],
      images: [
        {
          src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Kyoto_Fushimi_Inari-taisha_Romon_5.jpg/1280px-Kyoto_Fushimi_Inari-taisha_Romon_5.jpg',
          alt: 'Vermilion two-storey romon gate at Fushimi Inari Taisha in Kyoto',
          credit: 'Zairon / Wikimedia Commons (CC BY-SA 4.0)',
          caption: 'Romon, the main gate.',
        },
        {
          src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/Hushimi-inari-taisha_kitune_no_chozu.jpg/1280px-Hushimi-inari-taisha_kitune_no_chozu.jpg',
          alt: 'Fox-shaped temizuya water basin at Fushimi Inari Taisha',
          credit: 'KENPEI / Wikimedia Commons (CC BY 3.0)',
          caption: 'Fox-shaped temizuya in the precinct.',
        },
      ],
    },
    {
      id: 'senbon-torii',
      index: '02',
      nav: 'Senbon',
      plate: 'The dense tunnels',
      caption: 'Donated vermilion gates on the lower mountain path.',
      sentences: [
        'Behind the main sanctuary the path enters Senbon Torii, two close tunnels of gates given by companies and worshippers.',
        'The dense stretch is often about ten to fifteen minutes of walking, longer when people stop to photograph.',
        'The gates are narrow. Keep to the side and keep moving so others can pass.',
        'Names on the pillars record donors. The gates are offerings, not something to climb.',
      ],
      chips: [
        { label: 'Two tunnels' },
        { label: 'About 10–15 min' },
        { label: 'Keep moving' },
        { label: 'Donated gates' },
      ],
      images: [
        {
          src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/Fushimi-Inari-Shrine-Senbon-Torii-2016-Luka-Peternel.jpg/1280px-Fushimi-Inari-Shrine-Senbon-Torii-2016-Luka-Peternel.jpg',
          alt: 'Dense vermilion Senbon Torii tunnel at Fushimi Inari Taisha',
          credit: 'Luka Peternel / Wikimedia Commons (CC BY-SA 4.0)',
          caption: 'North-eastern wing of Senbon Torii.',
        },
        {
          src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f9/FUS_-_Senbon_torii_path_at_Fushimi_Inari-taisha%2C_Kyoto%2C_Japan%2C_2015.jpg/960px-FUS_-_Senbon_torii_path_at_Fushimi_Inari-taisha%2C_Kyoto%2C_Japan%2C_2015.jpg',
          alt: 'Path of red Senbon torii gates at Fushimi Inari-taisha',
          credit: 'Josep M. Gracia / Wikimedia Commons (CC BY-SA 4.0)',
          caption: 'The donated-gate path.',
          tall: true,
        },
      ],
    },
    {
      id: 'path-pauses',
      index: '03',
      nav: 'Pauses',
      plate: 'Foxes, stones, and forks',
      caption: 'Messengers and votive stones along the climb.',
      sentences: [
        'Stone foxes stand along the climb as messengers of Inari, sometimes with a key or a jewel in the mouth.',
        'Clusters of small otsuka are private votive stones, not one altar you are expected to finish.',
        'Where the path forks, follow the signed route and do not cut between the trees.',
        'If someone is praying, lower your voice and give them room.',
      ],
      chips: [
        { label: 'Kitsune' },
        { label: 'Otsuka' },
        { label: 'Signed forks' },
        { label: 'Quiet near prayer' },
      ],
      images: [
        {
          src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Kitsune_Statue_at_Fushimi_Inari_%282615371311%29.jpg/800px-Kitsune_Statue_at_Fushimi_Inari_%282615371311%29.jpg',
          alt: 'Stone kitsune statue at Fushimi Inari Taisha',
          credit: 'syvwlch / Wikimedia Commons (CC BY 2.0)',
          caption: 'A kitsune beside the path.',
          tall: true,
        },
        {
          src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/Collection_of_inscribed_stones_at_Fushimi_Inari-taisha_%28164%29.jpg/1280px-Collection_of_inscribed_stones_at_Fushimi_Inari-taisha_%28164%29.jpg',
          alt: 'Rows of inscribed votive stones at Fushimi Inari-taisha',
          credit: 'Savannah Rivka / Wikimedia Commons (CC BY-SA 4.0)',
          caption: 'Inscribed stones on the mountain.',
        },
      ],
    },
    {
      id: 'yotsutsuji',
      index: '04',
      nav: 'Yotsutsuji',
      plate: 'The practical turnaround',
      caption: 'The four-way junction, and the view over southern Kyoto.',
      sentences: [
        'Yotsutsuji is the crossroads partway up Inariyama, and the turnaround most first visits need.',
        'From the lower gates the climb commonly takes thirty to forty-five minutes, depending on pace and crowds.',
        'The junction looks over southern Kyoto. On an ordinary day there is a small place to rest and buy a drink — do not count on the same services higher up.',
        'Short on time, or uneasy on uneven steps? Stop here. The walk above is a different outing.',
      ],
      chips: [
        { label: 'About 30–45 min up' },
        { label: 'Viewpoint' },
        { label: 'Turn around here' },
        { label: 'Rest stop' },
      ],
      images: [
        {
          src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/View_on_Fushimi_on_Fushimi_Inari-taisha.jpg/1280px-View_on_Fushimi_on_Fushimi_Inari-taisha.jpg',
          alt: 'View over Kyoto from Yotsutsuji on Mount Inari at Fushimi Inari-taisha',
          credit: 'Ryuch / Wikimedia Commons (CC BY-SA 3.0)',
          caption: 'Kyoto from Yotsutsuji.',
        },
      ],
    },
    {
      id: 'summit',
      index: '05',
      nav: 'Summit',
      plate: 'Above Yotsutsuji',
      caption: 'Forest, sub-shrines, and the inner sanctuary.',
      optional: true,
      sentences: [
        'Past Yotsutsuji the route becomes a forest hike around the upper shrines, including Okumiya, the inner sanctuary.',
        'A full circuit is often about two to three hours with rests, on roots and stone steps rather than another dense tunnel of gates.',
        'Carry water, and a light if you may still be on the mountain after dusk.',
        'The upper paths are quieter, and they are still part of the working shrine. Stay on the marked route.',
      ],
      chips: [
        { label: 'Optional' },
        { label: 'About 2–3 hours' },
        { label: 'Uneven forest' },
        { label: 'Bring a light' },
      ],
      images: [
        {
          src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Okunomiya_Shrine_in_Fushimi_Inari_Grand_Shrine.jpg/1280px-Okunomiya_Shrine_in_Fushimi_Inari_Grand_Shrine.jpg',
          alt: 'Okunomiya, the inner shrine at Fushimi Inari Taisha',
          credit: 'そらみみ / Wikimedia Commons (CC BY-SA 4.0)',
          caption: 'Okumiya, above the Yotsutsuji turnaround.',
        },
      ],
    },
    {
      id: 'descent',
      index: '06',
      nav: 'Exit',
      plate: 'Down, then the office',
      caption: 'The paths stay open when the counters do not.',
      sentences: [
        'Descend the way you came, or follow the signed loop back toward the main shrine and the station.',
        'The mountain paths are not on the same clock as the shrine office. Omamori, ema, and goshuin are daytime counter services even when the trails are still walkable.',
        'Read the hours posted at the office, or check inari.jp, before you count on a stamp or a charm.',
        'Rules about eating and conduct are in the etiquette chapter. Trains back to Kyoto are under Getting there.',
      ],
      chips: [
        { label: 'Office hours differ' },
        { label: 'Omamori and goshuin' },
        { label: 'Etiquette', to: etiquette },
        { label: 'Getting there', to: gettingThere },
        { label: 'inari.jp', href: 'https://inari.jp/en/' },
      ],
      images: [
        {
          src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/79/Ema_at_Fushimi_Inari-taisha_02.jpg/1280px-Ema_at_Fushimi_Inari-taisha_02.jpg',
          alt: 'Wooden ema plaques hanging at Fushimi Inari-taisha',
          credit: 'Immanuel Giel / Wikimedia Commons (CC BY-SA 4.0)',
          caption: 'Ema at the shrine. The counters that sell them keep daytime hours.',
        },
      ],
    },
  ],
}
