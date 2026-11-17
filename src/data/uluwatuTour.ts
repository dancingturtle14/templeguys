import type { Route } from '../types'
import type { TourStop } from './fushimiInariTour'

/** Stable ids for the six-stop on-foot walk at Pura Luhur Uluwatu, Bali. */
export const ULUWATU_TOUR_ID = 'uluwatu'

export const ULUWATU_TOUR_STOP_IDS = [
  'main-gate',
  'sacred-forest',
  'cliffside-pathways',
  'temple-history',
  'restricted-inner',
  'kecak-amphitheatre',
] as const

export type UluwatuTourStopId = (typeof ULUWATU_TOUR_STOP_IDS)[number]

const etiquette: Route = { name: 'temple', id: ULUWATU_TOUR_ID, chapter: 'etiquette' }
const gettingThere: Route = { name: 'temple', id: ULUWATU_TOUR_ID, chapter: 'getting-there' }

export const ULUWATU_MAPS_WALKING =
  'https://www.google.com/maps/dir/?api=1&destination=Pura+Luhur+Uluwatu,+Pecatu,+Bali&travelmode=walking'

export const ULUWATU_TOUR_END_COPY =
  'The six stops — main gate, sacred forest, cliffside pathways, temple history, restricted inner shrine, and Kecak amphitheatre — form a complete walk through the visitor areas. Allow approximately one to two hours. Add more time for sunset or the Kecak performance. The temple ticket, Kecak ticket, and parking are three separate payments; payment is at the official booth near the main gate.'

export const ULUWATU_TOUR: { stops: TourStop[] } = {
  stops: [
    {
      id: 'main-gate',
      index: '01',
      nav: 'Main Gate / Official Ticket Booth',
      plate: 'The official entrance and ticket booth',
      caption:
        'Visitors enter Pura Luhur Uluwatu through the main gate near the ticket booth. Payment is at the official booth near the main gate.',
      sentences: [
        'The official ticket booth near the main gate is where the entrance fee is paid — the temple ticket is separate from the Kecak ticket and from parking fees.',
        'Sarong and sash are required and are provided free at the entrance with the temple ticket.',
        'The temple page and Indonesia Travel\'s Indonesian pilgrimage page give daily visitor hours as 07:00–19:00 WITA. An Indonesia Travel heritage list still says 09:00–19:00. Confirm on the day.',
      ],
      chips: [
        { label: 'Payment at official booth' },
        { label: 'Sarong and sash provided' },
        { label: '07:00–19:00 visitor hours', to: gettingThere },
        { label: 'Kecak 16:00 / 18:00–19:00' },
        { label: 'Getting there', to: gettingThere },
        {
          label: 'uluwatutemple.id',
          href: 'https://uluwatutemple.id/uluwatu-temple',
        },
      ],
      checkpoints: [
        {
          id: 'main-gate-booth',
          kind: 'must-see',
          title: 'Official ticket booth',
          sentences: [
            'This is where visitors pay the entrance fee. The temple ticket, Kecak ticket, and parking are three separate payments.',
            'Sarong and sash are provided free at the booth.',
            'Official visitor hours and fares: International adult IDR 60,000 / child IDR 40,000; Domestic adult IDR 40,000 / child IDR 30,000. Homepage FAQ and heritage lists also show older International 50,000/30,000; Domestic 30,000/20,000; and some English Indonesia Travel pages list foreign fares of 100,000/50,000. Prefer the temple page figures. Payment is at the official booth near the main gate. Published fares can change; confirm on the day.',
          ],
          lookFor: [
            'The ticket booth near the main gate.',
            'Sarong and sash rack provided at no extra charge.',
            'Signage directing visitors to keep sarong/sash on in the temple area.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/47/Pura_Luhur_Uluwatu%2C_Bali_%2815869659474%29.jpg/1280px-Pura_Luhur_Uluwatu%2C_Bali_%2815869659474%29.jpg',
            alt: 'Worshippers gathering at a gate of Pura Luhur Uluwatu',
            credit: 'Juan Antonio Segal / Wikimedia Commons (CC BY 2.0)',
            caption: 'Worshippers gathering at a gate of Pura Luhur Uluwatu',
          },
        },
        {
          id: 'main-gate-hours',
          kind: 'practice',
          title: 'Visitor hours 07:00–19:00',
          sentences: [
            'Official visitor hours (preferred): every day from 07:00 AM to 07:00 PM (07:00–19:00 WITA). Temple page and Indonesia Travel ID pilgrimage.',
            'A heritage list still prints 09:00–19:00; confirm on the day.',
          ],
          lookFor: [
            'Posted opening and closing times at the gate.',
            'The 07:00 start and 19:00 close on the official schedule.',
          ],
        },
      ],
    },
    {
      id: 'sacred-forest',
      index: '02',
      nav: 'Sacred Forest (Alas Kekeran)',
      plate: 'The sacred forest with long-tailed macaques',
      caption:
        'Alas Kekeran is the sacred forest within the Uluwatu Temple grounds, home to long-tailed macaques.',
      sentences: [
        'The sacred forest (Alas Kekeran) is part of the temple precinct. Official conservation wording: approximately 650 long-tailed macaques range around the temple.',
        'Do not feed the monkeys except under staff supervision. Do not touch, catch, or chase them. Secure glasses, hats, phones, and jewellery. If a monkey takes an item, do not chase — report to temple staff.',
      ],
      chips: [
        { label: '~650 long-tailed macaques' },
        { label: 'Do not feed the monkeys' },
        { label: 'Monkey rules', to: etiquette },
      ],
      checkpoints: [
        {
          id: 'forest-monkeys',
          kind: 'must-see',
          title: 'Long-tailed macaques',
          sentences: [
            'Official conservation / Tumrek article: the temple is home to approximately 650 long-tailed macaques (Macaca fascicularis). They are treated as sacred guardians.',
            'Do not feed the monkeys except under staff supervision. Do not touch, catch, or chase them. Secure glasses, hats, phones, and jewellery. If a monkey takes an item, do not chase — report to temple staff.',
          ],
          lookFor: [
            'Macaques in the canopy near the forest path.',
            'Signs warning visitors not to feed or chase the animals.',
            'Staff-supervised feeding areas, if present on the day.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Kuta_Bali_Indonesia_Pura-Luhur-Uluwatu-Monkeys-03.jpg/1280px-Kuta_Bali_Indonesia_Pura-Luhur-Uluwatu-Monkeys-03.jpg',
            alt: 'Long-tailed macaque at Pura Luhur Uluwatu in the sacred forest',
            credit: 'CEphoto, Uwe Aranas / Wikimedia Commons (CC BY-SA 3.0)',
            caption: 'Long-tailed macaques at Pura Luhur Uluwatu',
          },
        },
        {
          id: 'forest-rules',
          kind: 'practice',
          title: 'Monkey safety rules',
          sentences: [
            'Do not feed the monkeys except under staff supervision.',
            'Do not touch, catch, or chase monkeys.',
            'Secure glasses, hats, phones, and jewellery.',
            'If a monkey takes an item, do not chase — report to temple staff.',
          ],
          lookFor: [
            'Warning signs about monkey feeding and behaviour.',
            'Staff present to supervise and assist if needed.',
          ],
        },
      ],
    },
    {
      id: 'cliffside-pathways',
      index: '03',
      nav: 'Cliffside Pathways & Ocean Viewpoints',
      plate: 'Limestone cliff and ocean views',
      caption:
        'The temple sits on a limestone cliff about 70 metres above the Indian Ocean. Cliffside pathways and viewpoints run along the edge.',
      sentences: [
        'Pura Luhur Uluwatu perches on a limestone cliff approximately 70 metres above the Indian Ocean. The cliffside pathways offer ocean viewpoints along the southwest coast.',
        'Do not sit or climb on boundary walls. The cliffs are steep and the stone pathways are uneven — wear comfortable shoes with good grip.',
      ],
      chips: [
        { label: '~70 m limestone cliff' },
        { label: 'Comfortable shoes for uneven stone' },
        { label: 'Do not climb walls' },
      ],
      checkpoints: [
        {
          id: 'cliff-ocean-view',
          kind: 'must-see',
          title: 'Ocean viewpoint',
          sentences: [
            'The cliff offers uninterrupted ocean views toward the Indian Ocean from the southwest coast of Bali.',
            'The limestone cliff is approximately 70 metres above sea level. Official pages call the water the Indian Ocean — do not write "Timor Sea".',
          ],
          lookFor: [
            'The cliff edge with ocean view beyond.',
            'Limestone rock faces and coastal stone.',
            'Stay behind official viewpoint markers and follow staff guidance on cliff edge safety.'
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/Cliffs_of_Uluwatu%2C_Bali%2C_Indonesia%2C_20220826_1006_1038.jpg/1280px-Cliffs_of_Uluwatu%2C_Bali%2C_Indonesia%2C_20220826_1006_1038.jpg',
            alt: 'Cliffside ocean viewpoint at Pura Luhur Uluwatu',
            credit: 'Jakub Hałun / Wikimedia Commons (CC BY-SA 4.0)',
            caption: 'The limestone cliff and temple from a visitor viewpoint',
          },
        },
        {
          id: 'cliff-safety',
          kind: 'practice',
          title: 'Cliff and path safety',
          sentences: [
            "The official don'ts include: do not sit or climb on boundary walls. The cliffs are steep and stone pathways are uneven.",
            'Wear comfortable shoes with good grip for the stone pathways and steps.',
          ],
          lookFor: [
            'Uneven stone surfaces and steps along the cliff edge; follow staff guidance.',
          ],
        },
      ],
    },
    {
      id: 'temple-history',
      index: '04',
      nav: 'Temple History & Outer Precinct',
      plate: 'Sad Kahyangan, Shiva Rudra, and ancient chronogram',
      caption:
        'The outer precinct includes ancient candi kurung, Shiva Rudra, and the area linked to Mpu Kuturan and Danghyang Nirartha.',
      sentences: [
        'Pura Luhur Uluwatu is one of Bali\'s Sad Kahyangan sea temples, dedicated to Shiva Rudra. The site dates to a candi kurung chronogram of 808 Saka (about 886 AD). Development is often linked to Mpu Kuturan in the 11th century, and the saint Danghyang Nirartha is believed to have attained moksha on these cliffs.',
        'The outer precinct includes the candi kurung foundation and visitor pathways that outline the temple\'s sacred layout.',
      ],
      chips: [
        { label: 'Sad Kahyangan sea temple' },
        { label: 'Shiva Rudra' },
        { label: '808 Saka / 886 AD' },
        { label: 'Mpu Kuturan' },
        { label: 'Danghyang Nirartha' },
      ],
      checkpoints: [
        {
          id: 'history-sakaraja',
          kind: 'must-see',
          title: 'Candi kurung chronogram 808 Saka',
          sentences: [
            'The temple\'s earliest evidence is a candi kurung chronogram showing 808 Saka, approximately 886 AD.',
            'Development is often linked to Mpu Kuturan in the 11th century.',
            'The official temple page also honours Danghyang Nirartha, who is believed to have attained moksha (spiritual liberation) on these cliffs.',
          ],
          lookFor: [
            'Candi kurung chronogram markers or explanatory signage referencing 808 Saka.',
            'Statues or dedications to Mpu Kuturan and Danghyang Nirartha.',
            'Temple page citations to the 808 Saka chronogram.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/Kuta_Bali_Indonesia_Pura-Luhur-Uluwatu-03.jpg/1280px-Kuta_Bali_Indonesia_Pura-Luhur-Uluwatu-03.jpg',
            alt: 'A meru shrine of Pura Luhur Uluwatu on the cliff above the Indian Ocean',
            credit: 'CEphoto, Uwe Aranas / Wikimedia Commons (CC BY-SA 3.0)',
            caption: 'A meru shrine of Pura Luhur Uluwatu on the cliff above the Indian Ocean',
          },
        },
        {
          id: 'history-shiva-rudra',
          kind: 'story',
          title: 'Shiva Rudra and the sea temple',
          sentences: [
            'Pura Luhur Uluwatu is dedicated to Shiva Rudra, one of the Sad Kahyangan directional temples of Bali.',
            'As a sea temple, it faces the Indian Ocean and is linked to the spiritual geography of the island\'s six directional sanctuaries.',
          ],
          lookFor: [
            'Shiva Rudra dedications in the outer precinct.',
            'Ocean-facing orientation of the temple complex.',
          ],
        },
        {
          id: 'history-nirartha',
          kind: 'story',
          title: 'Danghyang Nirartha\'s moksha',
          sentences: [
            'Danghyang Nirartha, a 16th-century Hindu saint, is believed to have attained moksha (spiritual liberation) on the cliffs of Uluwatu.',
            'The temple page honours him with a statue and dedication.',
          ],
          lookFor: [
            'Statue or dedication to Danghyang Nirartha.',
            'Explanatory text about his moksha on the cliffs.',
          ],
        },
      ],
    },
    {
      id: 'restricted-inner',
      index: '05',
      nav: 'Restricted Inner Shrine',
      plate: 'Second smaller temple for Hindu followers only',
      caption:
        'The inner sanctuary has restrictions: only authorised personnel and worshippers in restricted temple zones.',
      sentences: [
        'The outer visitor areas are open to all, but the inner shrine has restricted access. Official Dinas Pariwisata Provinsi Bali (26 October 2021): "only a true Hindu follower can enter the second smaller temple inside." Temple and Indonesia Travel ID wording likewise reserves sacred zones for worshippers and authorised personnel.',
        'The temple and Indonesia Travel\'s pilgrimage page use different wording for restricted areas. Follow staff on the day.',
        'Modest dress is required: sarong and sash are provided with the temple ticket; cover shoulders and knees underneath.',
        'Photography is allowed in visitor areas but be mindful of restricted zones. Drones are prohibited unless authorised.',
      ],
      chips: [
        { label: 'Restricted inner shrine' },
        { label: 'Only Hindu followers in inner areas' },
        { label: 'Modest dress: shoulders/knees' },
        { label: 'Photography allowed, no drone' },
      ],
      checkpoints: [
        {
          id: 'inner-restricted',
          kind: 'must-see',
          title: 'Restricted inner shrine',
          sentences: [
            'Official Dinas Pariwisata Provinsi Bali (published 26 October 2021): "only a true Hindu follower can enter the second smaller temple inside."',
            'Temple and Indonesia Travel ID wording: women who are menstruating are customarily not permitted in the temple area under local adat. Follow staff on the day.',
          ],
          lookFor: [
            'Signage marking restricted and open zones.',
            'Staff directing visitors on acceptable areas.',
            'The second smaller temple inside the inner enclosure (visible from public viewpoints but restricted).',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Luhur_Uluwatu_Temple%2C_Bali%2C_20220826_0951_1007.jpg/1280px-Luhur_Uluwatu_Temple%2C_Bali%2C_20220826_0951_1007.jpg',
            alt: 'A stone sculpture in the precinct of Pura Luhur Uluwatu',
            credit: 'Jakub Hałun / Wikimedia Commons (CC BY-SA 4.0)',
            caption: 'A stone sculpture in the precinct of Pura Luhur Uluwatu',
          },
        },
        {
          id: 'inner-etiquette',
          kind: 'practice',
          title: 'Etiquette in restricted zones',
          sentences: [
            'Modest dress: sarong and sash provided with temple ticket; cover shoulders and knees.',
            'Follow staff instructions on which areas are open to visitors that day.',
            'Photography allowed in visitor areas; be mindful of restricted zones. No drones without permission.',
          ],
          lookFor: [
            'Staff on the day directing visitor flow.',
            'Signage marking which courtyards are restricted.',
            'The provided sarong and sash at the entrance.',
          ],
        },
      ],
    },
    {
      id: 'kecak-amphitheatre',
      index: '06',
      nav: 'Kecak Amphitheatre',
      plate: 'Cliffside Kecak performance',
      caption:
        'The daily Kecak show at the cliffside amphitheatre — separate ticket, gate 16:00, show 18:00–19:00.',
      sentences: [
        'The daily Kecak performance is staged at a cliffside amphitheatre. This is a separate product from the temple admission ticket. Gate opens at 16:00; the show runs 18:00–19:00 every day.',
        'Kecak is not a general visiting hour. The temple\'s visitor hours are 07:00–19:00 WITA. The Kecak gate 16:00 and show 18:00–19:00 are a performance timetable, never general visiting hours. Temple ticket, Kecak ticket, and parking are three separate payments.',
        'Preferred official Kecak fare: adult IDR 150,000; child ages 2–9 IDR 75,000. Generally cash-only. Temple admission and parking are not included. Some English Indonesia Travel pilgrimage pages list a 2025 foreign Kecak fare of IDR 200,000 — this is a conflicting figure.',
        'Arrive before 17:00 if also watching the Kecak: gives time to enter, wear the sarong and sash, and walk the cliff paths before the 18:00 show.',
      ],
      chips: [
        { label: 'Separate ticket from temple' },
        { label: 'Gate 16:00, show 18:00–19:00' },
        { label: 'Adult IDR 150,000; child 2–9 IDR 75,000' },
        { label: 'Cash generally' },
        { label: 'Arrive before 17:00' },
      ],
      checkpoints: [
        {
          id: 'kecak-gate',
          kind: 'must-see',
          title: 'Kecak gate 16:00, show 18:00–19:00',
          sentences: [
            'Official Kecak page: updated schedule — Open Gate 16:00 WITA; Showtime 18:00–19:00 every day.',
            'This is a performance timetable, not general visiting hours. The temple visitor hours are 07:00–19:00 WITA.',
            'Temple ticket, Kecak ticket, and parking are three separate payments.',
          ],
          lookFor: [
            'Kecak amphitheatre entrance gate.',
            'Posted gate open time (16:00) and show time (18:00–19:00).',
            'Cash booth for Kecak tickets (generally cash-only).',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Ramayana_Kecak_Dancers.jpg/1280px-Ramayana_Kecak_Dancers.jpg',
            alt: 'Kecak performance at Pura Luhur Uluwatu cliffside amphitheatre at sunset',
            credit: 'Johannnindito Adisuryo (Yohanes Nindito Adisuryo) / Wikimedia Commons (CC BY-SA 4.0)',
            caption: 'Kecak at the Uluwatu amphitheatre',
          },
        },
        {
          id: 'kecak-separate',
          kind: 'practice',
          title: 'Kecak is separate from temple admission',
          sentences: [
            'The temple ticket, Kecak ticket, and parking are three separate payments. No "Bali temple pass" includes all three.',
            'Kecak is a separate product: gate 16:00, show 18:00–19:00 daily. Not part of the 07:00–19:00 visitor hours.',
            'Preferred official Kecak fare: adult IDR 150,000; child ages 2–9 IDR 75,000. Generally cash-only.',
          ],
          lookFor: [
            'Separate Kecak ticket booth.',
            'Gate opening at 16:00 (independent of the temple\'s 07:00 start).',
            'Show schedule 18:00–19:00.',
          ],
        },
      ],
    },
  ],
}