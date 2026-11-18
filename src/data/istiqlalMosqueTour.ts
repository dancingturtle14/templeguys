import type { Route } from '../types'
import type { TourStop } from './fushimiInariTour'

/** Stable ids for the six-stop on-foot walk at Istiqlal Mosque, Jakarta. */
export const ISTIQLAL_MOSQUE_TOUR_ID = 'istiqlal-mosque'

export const ISTIQLAL_MOSQUE_TOUR_STOP_IDS = [
  'approach-gates',
  'entry-etiquette',
  'upper-hallways',
  'history-founding',
  'cathedral-silaturahmi',
  'visiting-hours',
] as const

export type IstiqlalMosqueTourStopId = (typeof ISTIQLAL_MOSQUE_TOUR_STOP_IDS)[number]

const etiquette: Route = { name: 'temple', id: ISTIQLAL_MOSQUE_TOUR_ID, chapter: 'etiquette' }
const gettingThere: Route = { name: 'temple', id: ISTIQLAL_MOSQUE_TOUR_ID, chapter: 'getting-there' }

export const ISTIQLAL_MOSQUE_MAPS_WALKING =
  'https://www.google.com/maps/dir/?api=1&destination=Masjid+Istiqlal,+Jakarta&travelmode=walking'

export const ISTIQLAL_MOSQUE_TOUR_END_COPY =
  'The six stops — named approach, entry, upper hallways, history, tunnel connection to Jakarta Cathedral, and visitor courtyard — form a complete walk through the permitted visitor areas. The mosque has no admission fee, but group visits may register through the official mosque site.'

export const ISTIQLAL_MOSQUE_TOUR: { stops: TourStop[] } = {
  stops: [
    {
      id: 'approach-gates',
      index: '01',
      nav: 'Approach Gates & Transport',
      plate: 'Official walking gates and current transport access',
      caption:
        'Visitors approach Istiqlal Mosque via official gates including Al-Fattah (opposite Jakarta Cathedral) and As-Salam 1/2 (opposite Halte Juanda), with current transport directions from KRL Juanda, TransJakarta, and MRT Jakarta.',
      sentences: [
        'Official tourism gives current transport access: KRL Commuter Line — Stasiun Juanda then walk; TransJakarta — Halte Juanda or Halte Istiqlal; MRT Jakarta then onward toward Pasar Baru; private vehicle via Jalan Lapangan Banteng Barat or Jalan Veteran.',
        'Official event notices name walking gates including Al-Fattah (opposite Jakarta Cathedral), As-Salam 1 and 2 (opposite Halte Juanda), and Al-Mukmin (Gambir / Pasar Baru). The Terowongan Silaturahmi tunnel links the mosque and Jakarta Cathedral; confirm on the day whether it is open to casual visitors.',
      ],
      chips: [
        { label: 'KRL Juanda, then walk' },
        { label: 'TransJakarta Halte Juanda / Istiqlal' },
        { label: 'MRT Jakarta onward toward Pasar Baru' },
        { label: 'Getting there', to: gettingThere },
        { label: 'istiqlal.or.id', href: 'https://www.istiqlal.or.id/' },
      ],
      checkpoints: [
        {
          id: 'transport-juanda',
          kind: 'must-see',
          title: 'KRL Juanda station access',
          sentences: [
            'The main transport hub for most visitors is Stasiun Juanda on the KRL Commuter Line. From there, walk to the mosque gates.',
            'Public signage and official tourism materials guide visitors from the station to the Al-Fattah gate (opposite Jakarta Cathedral) and As-Salam gates.',
          ],
          lookFor: [
            'Station signage directing to Masjid Istiqlal via walk or shuttle.',
            'Official tourism maps showing the walking route from Juanda station to the mosque gates.',
            'Transport information boards at the station indicating Istiqlal Mosque as a destination.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Masjid_Istiqlal.jpg/1280px-Masjid_Istiqlal.jpg',
            alt: 'The exterior of Istiqlal Mosque (Masjid Istiqlal) in Jakarta.',
            credit: 'Michael Coghlan / Wikimedia Commons (CC BY-SA 4.0)',
            caption: 'The exterior of Istiqlal Mosque (Masjid Istiqlal) in Jakarta.',
          },
        },
        {
          id: 'transport-transjakarta',
          kind: 'must-see',
          title: 'TransJakarta access',
          sentences: [
            'TransJakarta bus system provides direct access to Halte Juanda and Halte Istiqlal, both within walking distance of the mosque gates.',
            'Official tourism indicates these stops as primary access points for visitors using public transportation.',
          ],
          lookFor: [
            'TransJakarta route information showing stops at Juanda and Istiqlal.',
            'Bus shelter signage indicating directions to Istiqlal Mosque.',
            'Official tourism maps highlighting TransJakarta access points.',
          ],
        },
        {
          id: 'transport-mrt',
          kind: 'object',
          title: 'MRT Jakarta access',
          sentences: [
            'For visitors using the MRT Jakarta system, the nearest station is Blok M, with onward travel via connecting transport toward the Pasar Baru area.',
            'Official tourism provides guidance for completing the journey to the mosque from the MRT system.',
          ],
          lookFor: [
            'MRT Jakarta maps showing connections to Istiqlal Mosque.',
            'Official tourism information about MRT access routes.',
            'Signage at MRT stations providing directions to the mosque.',
          ],
        },
        {
          id: 'transport-gate-names',
          kind: 'story',
          title: 'Named walking gates',
          sentences: [
            'Official event notices identify specific gates by name: Al-Fattah (opposite Jakarta Cathedral), As-Salam 1 and 2 (opposite Halte Juanda), and Al-Mukmin (Gambir / Pasar Baru direction).',
            'These named gates serve as official entry points for visitors and are marked on official tourism maps and signage.',
          ],
          lookFor: [
            'Gate name signs indicating Al-Fattah, As-Salam 1/2, and Al-Mukmin.',
            'Official tourism maps showing the locations of named gates.',
            'Wayfinding signage directing visitors to specific gates.',
          ],
        },
      ],
    },
    {
      id: 'entry-etiquette',
      index: '02',
      nav: 'Entry & Visitor Etiquette',
      plate: 'Shoes off and modest dress required',
      caption:
        'Visitors must remove shoes before entering the mosque and follow modest dress codes covering aurat, with women required to wear head coverings (jilbab or selendang).',
      sentences: [
        'Official visitor rules (Ketentuan Pengunjung) require modest dress covering aurat for everyone who visits or worships; women wear a head covering (jilbab or selendang).',
        'Shoes must be removed before entering the building. Eat and drink only in Selasar Tengah (the mid-arcade); Lantai Utama is for worship only.',
        'The official notice says the mosque is open to everyone, with no age limit, and that foreign and domestic visitor services continue as usual — it remains a living place of worship.',
      ],
      chips: [
        { label: 'Shoes off before entry' },
        { label: 'Modest dress: cover aurat' },
        { label: 'Women: head covering (jiljab/selendang)' },
        { label: 'Etiquette', to: etiquette },
        { label: 'istiqlal.or.id', href: 'https://www.istiqlal.or.id/' },
      ],
      checkpoints: [
        {
          id: 'entry-shoe-racks',
          kind: 'must-see',
          title: 'Shoe disposal area',
          sentences: [
            'Visitors are required to remove their shoes before entering the mosque building.',
            'Designated shoe storage areas or racks are provided for this purpose.',
          ],
          lookFor: [
            'Signage indicating shoe removal requirements.',
            'Provided shoe storage areas or racks near entry points.',
            'Staff directing visitors to shoe disposal areas.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Ablution_fountain_Istiqlal_Mosque_Jakarta.jpg/1280px-Ablution_fountain_Istiqlal_Mosque_Jakarta.jpg',
            alt: 'The ablution fountain at Istiqlal Mosque in Jakarta.',
            credit: 'Aisha Tanduk / Wikimedia Commons (CC BY-SA 4.0)',
            caption: 'The ablution fountain at Istiqlal Mosque in Jakarta.',
          },
        },
        {
          id: 'entry-modest-dress',
          kind: 'must-see',
          title: 'Modest dress requirements',
          sentences: [
            'Official notices require modest clothing covering aurat for visitors and worshippers.',
            'Women are specifically required to wear head coverings (jilbab or selendang).',
          ],
          lookFor: [
            'Signs indicating modest dress requirements.',
            'Staff or volunteers reminding visitors of dress code requirements.',
            'Information materials about dress code for visitors.',
          ],
        },
        {
          id: 'entry-eating-area',
          kind: 'object',
          title: 'Designated eating area',
          sentences: [
            'Visitors are instructed to eat and drink only in Selasar Tengah (the mid-arcade area).',
            'Lantai Utama (main floor) is reserved exclusively for worship activities.',
          ],
          lookFor: [
            'Signage indicating Selasar Tengah as the only eating area.',
            'Barriers or signage preventing eating in worship areas.',
            'Official materials stating eating restrictions.',
          ],
        },
        {
          id: 'entry-loaner-garment-info',
          kind: 'story',
          title: 'About loaner garments',
          sentences: [
            'Loaner robes and scarves are mentioned in news interviews but were not listed on the official pages cited here — do not rely on them being offered.',
            'Visitors should arrive already prepared with appropriate modest clothing and head coverings.',
          ],
          lookFor: [
            'Information materials stating loaner garment availability.',
            'Staff information about loaner garments.',
            'Official notices about loaner options for visitors.',
          ],
        },
      ],
    },
    {
      id: 'upper-hallways',
      index: '03',
      nav: 'Upper Hallways & Terraces',
      plate: 'Non-Muslim accessible areas',
      caption:
        'The upper hallways and terraces are visitable areas for non-Muslims, while the main prayer hall remains restricted to Muslim worshippers only.',
      sentences: [
        'Non-Muslims may not enter the main prayer hall; upper hallways and terraces are visitable.',
        'Official guides and educational tours are offered according to schedule; no published guide fee exists.',
        'The mosque is a living place of worship — daily prayer, Friday congregation, and state-level Eid prayers are conducted here, and visitors should be respectful of ongoing worship activities.',
      ],
      chips: [
        { label: 'Upper hallways visitable' },
        { label: 'Main prayer hall: Muslim only' },
        { label: 'Official guides according to schedule' },
        { label: 'Live place of worship' },
        { label: 'istiqlal.or.id', href: 'https://www.istiqlal.or.id/' },
      ],
      checkpoints: [
        {
          id: 'upper-hallway-access',
          kind: 'must-see',
          title: 'Upper hallway access points',
          sentences: [
            'Visitors access the upper hallways and terraces through designated entry points that are clearly marked and supervised by staff.',
            'These areas provide panoramic views of the mosque complex and are the primary visitor areas for non-Muslim guests.',
          ],
          lookFor: [
            'Clearly marked entrance points to upper hallways and terraces.',
            'Staff or volunteers directing visitors to visitor-accessible areas.',
            'Signage indicating which areas are open to non-Muslim visitors.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Hallway_Istiqlal_Mosque_Jakarta.jpg/1280px-Hallway_Istiqlal_Mosque_Jakarta.jpg',
            alt: 'An upper hallway at Istiqlal Mosque in Jakarta.',
            credit: 'Aisha Tanduk / Wikimedia Commons (CC BY-SA 4.0)',
            caption: 'An upper hallway at Istiqlal Mosque in Jakarta.',
          },
        },
        {
          id: 'upper-terrace-views',
          kind: 'must-see',
          title: 'Terrace viewpoints',
          sentences: [
            'The upper terraces offer panoramic views of the mosque complex and Jakarta skyline.',
            'Official tourism materials highlight these viewpoints as key visitor experiences.',
          ],
          lookFor: [
            'Viewpoints overlooking the mosque complex and city.',
            'Railings or barriers ensuring visitor safety on elevated areas.',
            'Signage identifying specific viewpoints and their features.',
          ],
        },
        {
          id: 'guide-services-info',
          kind: 'object',
          title: 'Official guide services',
          sentences: [
            'Educational tours with a guide are offered according to schedule.',
            'Official guides provide information about the mosque, its architecture, and worship practices.',
          ],
          lookFor: [
            'Schedule information for guided tours.',
            'Staff or volunteers providing guide service information.',
            'Official materials listing guided tour options.',
          ],
        },
        {
          id: 'upper-story-etiquette',
          kind: 'story',
          title: 'Worship respect in visitor areas',
          sentences: [
            'The mosque remains an active place of worship with daily prayers, Friday congregation, and state-level Eid prayers.',
            'Visitors should maintain respectful behavior and be mindful of ongoing worship activities while in visitor areas.',
          ],
          lookFor: [
            'Staff directing visitor behavior in worship areas.',
            'Signs indicating respectful conduct requirements.',
            'Volunteer guidance for visitor conduct in active worship spaces.',
          ],
        },
      ],
    },
    {
      id: 'history-founding',
      index: '04',
      nav: 'History & Founding',
      plate: 'Founder inscriptions and capacity details',
      caption:
        'The 1978 inauguration inscription at the As-Salaam entrance commemorates President Soeharto\'s inauguration, separate from President Soekarno\'s 1961 first stone laying.',
      sentences: [
        'President Soekarno laid the first stone on 24 August 1961; President Soeharto inaugurated the mosque on 22 February 1978 — two separate events from official sources.',
        'Official tourism notes that the English Indonesia Travel destination page instead attributes the 22 February 1978 public opening to President Soekarno — a conflict in official narratives.',
      ],
      chips: [
        { label: 'Soekarno: 24 August 1961 (first stone)' },
        { label: 'Soeharto: 22 February 1978 (inauguration)' },
        { label: 'Official conflict: English page attributes 1978 opening to Soekarno' },
        { label: 'Friedrich vs Frederich (architect)' },
        { label: '200 Ribu capacity (official figure)' },
        { label: 'Original design: 1954; construction: 17 years' },
      ],
      checkpoints: [
        {
          id: 'history-1978-inscription',
          kind: 'must-see',
          title: '1978 inauguration inscription',
          sentences: [
            'The inscription at the As-Salaam entrance commemorates President Soeharto\'s inauguration of the mosque on 22 February 1978.',
            'This is the photo shown here — the 1978 inscription at Pintu As-Salaam — do not caption it as a Soekarno 1961 stone-laying scene.',
          ],
          lookFor: [
            'The 1978 inauguration inscription at the As-Salaam entrance.',
            'Text identifying President Soeharto and the date February 22, 1978.',
            'Architectural details indicating the official inauguration ceremony.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/Prasasti_Peresmian_Masjid_Istiqlal_tahun_1978-Pintu-As-Salaam.jpg/1280px-Prasasti_Peresmian_Masjid_Istiqlal_tahun_1978-Pintu-As-Salaam.jpg',
            alt: 'The 1978 inauguration inscription at the As-Salaam entrance of Istiqlal Mosque.',
            credit: 'Syusuf2016 / Wikimedia Commons (CC BY-SA 4.0)',
            caption: 'The 1978 inauguration inscription at the As-Salaam entrance of Istiqlal Mosque.',
          },
        },
        {
          id: 'history-1961-first-stone',
          kind: 'must-see',
          title: '1961 first stone laying',
          sentences: [
            'President Soekarno laid the first stone on 24 August 1961, marking the beginning of the mosque\'s construction.',
            'This historical moment is documented in official sources and records.',
          ],
          lookFor: [
            'Documentation or records of President Soekarno\'s participation in the ceremony.',
            'Historical references to the 24 August 1961 ceremony.',
            'Official sources mentioning the first stone laying event.',
          ],
        },
        {
          id: 'history-architect-name',
          kind: 'object',
          title: 'Architect Friedrich vs Frederich',
          sentences: [
            'Official pilgrimage sources prefer Friedrich Silaban; the English destination page spells the given name Frederich.',
            'The pilgrimage page additionally identifies him as Batak / Protestant Christian, information not present on the English page.',
          ],
          lookFor: [
            'Architect name variations in different official sources.',
            'Additional biographical details in pilgrimage vs destination sources.',
            'Official sources identifying architect heritage and religious background.',
          ],
        },
        {
          id: 'history-capacity-conflict',
          kind: 'story',
          title: 'Official capacity figures',
          sentences: [
            'Official sources conflict: mosque homepage lists “200 Ribu” (200,000) capacity; older tourism pages mention ~120,000 — flag this discrepancy.',
            'Both figures are official, but the current mosque figure is 200,000.',
          ],
          lookFor: [
            'Official sources listing different capacity figures.',
            'Discrepancies between current mosque figures and tourism statistics.',
            'References to both 200,000 and ~120,000 capacity figures.',
          ],
        },
      ],
    },
    {
      id: 'cathedral-silaturahmi',
      index: '05',
      nav: 'Cathedral Connection & Tunnel',
      plate: 'Silaturahmi tunnel inauguration',
      caption:
        'The Terowongan Silaturahmi tunnel links Istiqlal Mosque with Jakarta Cathedral, inaugurated in 2021 (official name Silaturahmi).',
      sentences: [
        'The Terowongan Silaturahmi, a pedestrian tunnel between the mosque and Jakarta Cathedral, was inaugurated in 2021.',
        'Official tourism context mentions this tunnel as part of the architectural and social connection between the two religious sites.',
        'Confirm on the day whether the tunnel is open to casual visitors; its accessibility may vary based on religious activities.',
      ],
      chips: [
        { label: 'Terowongan Silaturahmi (2021)' },
        { label: 'Links to Jakarta Cathedral' },
        { label: 'Open to casual visitors? Confirm on the day' },
        { label: 'Official tourism context only' },
      ],
      checkpoints: [
        {
          id: 'tunnel-inauguration',
          kind: 'must-see',
          title: 'Tunnel inauguration details',
          sentences: [
            'The Terowongan Silaturahmi tunnel was officially inaugurated in 2021, creating a physical connection between Istiqlal Mosque and Jakarta Cathedral.',
            'Official tourism highlights this tunnel as an architectural and social achievement between the two religious sites.',
          ],
          lookFor: [
            'Documentation or markers indicating the 2021 inauguration date.',
            'Architectural features highlighting the tunnel\'s design and purpose.',
            'Official tourism information about the tunnel\'s significance.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Terowongan_Silaturahim_di_Sisi_Katedral_Jakarta_2024_%281%29.jpg/1280px-Terowongan_Silaturahim_di_Sisi_Katedral_Jakarta_2024_%281%29.jpg',
            alt: 'The Silaturahmi tunnel on the Jakarta Cathedral side, photographed in 2024.',
            credit: 'Medelam / Wikimedia Commons (CC BY-SA 4.0)',
            caption: 'The Silaturahmi tunnel on the Jakarta Cathedral side, photographed in 2024.',
          },
        },
        {
          id: 'tunnel-access-status',
          kind: 'object',
          title: 'Current tunnel access',
          sentences: [
            'The tunnel\'s accessibility to casual visitors should be confirmed on the day of visit.',
            'Religious activities and schedule may affect tunnel opening hours.',
          ],
          lookFor: [
            'Current access information for the tunnel.',
            'Staff guidance about tunnel accessibility on the day.',
            'Official notices about tunnel opening hours.',
          ],
        },
        {
          id: 'tunnel-christian-eid-reciprocity',
          kind: 'story',
          title: 'Christmas/Eid parking reciprocity',
          sentences: [
            'Official tourism recounts a long-standing parking arrangement with Jakarta Cathedral at Christmas and Eid.',
            'This reciprocity is part of the broader social relationship between the two religious sites.',
          ],
          lookFor: [
            'Official tourism materials mentioning parking reciprocity.',
            'Historical context about shared parking arrangements.',
            'Social relationship documentation between the two sites.',
          ],
        },
      ],
    },
    {
      id: 'visiting-hours',
      index: '06',
      nav: 'Visiting Hours & Access',
      plate: 'Daily access with prayer considerations',
      caption:
        'The mosque is open daily with no admission fee, but tourist hours can differ from prayer and religious events, so confirmation on the day is recommended.',
      sentences: [
        'Open daily; no admission fee (Indonesia Travel states “there is no admission fee to enter”).',
        'Tourist visiting hours may differ from prayer and religious events — confirm on the day.',
        'SIAPMI 04:00–22:00 is contact hours only, not a visitor timetable. Mosque office hours are administrative only.',
      ],
      chips: [
        { label: 'Daily open' },
        { label: 'Free admission' },
        { label: 'Tourist hours differ from prayer times' },
        { label: 'SIAPMI contact hours (not visitor timetable)' },
        { label: 'Ramadan/Eid hours are year-specific' },
        { label: 'istiqlal.or.id & turis.istiqlal.or.id for info' },
      ],
      checkpoints: [
        {
          id: 'hours-daily-open',
          kind: 'must-see',
          title: 'Daily opening status',
          sentences: [
            'The mosque is open daily, accommodating both worshippers and visitors throughout the week.',
            'Official tourism confirms this daily accessibility for all interested parties.',
          ],
          lookFor: [
            'Signs indicating daily opening status.',
            'Official materials confirming daily accessibility.',
            'Staff information about daily opening hours.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Inner_courtyard_of_the_Masjid_Istiqlal_Jakarta.jpg/1280px-Inner_courtyard_of_the_Masjid_Istiqlal_Jakarta.jpg',
            alt: 'The inner courtyard of Istiqlal Mosque in Jakarta.',
            credit: 'Aisha Tanduk / Wikimedia Commons (CC BY-SA 4.0)',
            caption: 'The inner courtyard of Istiqlal Mosque in Jakarta.',
          },
        },
        {
          id: 'hours-no-admission-fee',
          kind: 'must-see',
          title: 'No admission fee',
          sentences: [
            'Official sources consistently state there is no admission fee to enter the mosque.',
            'This free access is part of the mosque\'s mission as Indonesia\'s national mosque.',
          ],
          lookFor: [
            'Official statements confirming no admission fee.',
            'Information materials emphasizing free entry.',
            'Staff guidance about free access for visitors.',
          ],
        },
        {
          id: 'hours-prayer-time-considerations',
          kind: 'object',
          title: 'Prayer time considerations',
          sentences: [
            'Visitor circulation may be affected by the five daily prayers and Friday noon prayer.',
            'Friday congregation (Jumat) and national Eid prayers are major worship events that may impact visitor access.',
          ],
          lookFor: [
            'Information about prayer times affecting visitor access.',
            'Signs or notices about restricted access during prayer times.',
            'Staff guidance about prayer time considerations for visitors.',
          ],
        },
        {
          id: 'hours-ramadan-specificity',
          kind: 'story',
          title: 'Ramadan and Eid hour variations',
          sentences: [
            'Ramadan and Eid hours are announced year by year — they are not standing timetables.',
            'Official notices provide specific hour ranges for each Ramadan and Eid period.',
            'These seasonal variations require visitors to verify current hours before their visit.',
          ],
          lookFor: [
            'Seasonal hour announcements for Ramadan and Eid.',
            'Official sources providing year-specific hour ranges.',
            'Guidance materials about verifying current seasonal hours.',
          ],
        },
      ],
    },
  ]
}