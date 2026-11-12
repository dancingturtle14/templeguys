import type { Route } from '../types'
import type { TourStop } from './fushimiInariTour'

/** Stable ids for the six-stop walk along the official Kaminarimon–Nakamise–Hondo axis. */
export const SENSO_JI_TOUR_ID = 'senso-ji'

export const SENSO_JI_TOUR_STOP_IDS = [
  'kaminarimon',
  'nakamise',
  'hozomon',
  'omizuya',
  'hondo',
  'pagoda',
] as const

export type SensoJiTourStopId = (typeof SENSO_JI_TOUR_STOP_IDS)[number]

const etiquette: Route = { name: 'temple', id: SENSO_JI_TOUR_ID, chapter: 'etiquette' }
const gettingThere: Route = { name: 'temple', id: SENSO_JI_TOUR_ID, chapter: 'getting-there' }

export const SENSO_JI_MAPS_WALKING =
  'https://www.google.com/maps/dir/?api=1&destination=Senso-ji,+2-3-1+Asakusa,+Taito+City,+Tokyo&travelmode=walking'

export const SENSO_JI_TOUR_END_COPY =
  'Kaminarimon, Nakamise, Hōzōmon, the omizuya, and the Hondo are a complete visit for most people. The five-storied pagoda is viewed from the precinct, not climbed as a casual route.'

export const SENSO_JI_TOUR: { stops: TourStop[] } = {
  stops: [
    {
      id: 'kaminarimon',
      index: '01',
      nav: 'Kaminarimon',
      plate: 'From the station to the outer gate',
      caption: 'Kaminarimon, officially Furaijin-mon, is the outer gate of Sensō-ji.',
      sentences: [
        'Tobu Skytree Line, Tokyo Metro Ginza Line, Tsukuba Express, and Toei Asakusa Line (Exit A4) all stop at Asakusa Station, about a five-minute walk from the temple.',
        'The temple has no parking. Official access points drivers to Taito Ward Kaminarimon Underground Parking and nearby lots.',
        'The official FAQ calls Kaminarimon the outer gate (sōmon). The path from here to the Hondo is the approach.',
        'Official visitor pages do not list a general admission ticket for the grounds or the gates.',
      ],
      chips: [
        { label: 'Asakusa Station' },
        { label: '~5 min walk' },
        { label: 'No temple parking' },
        { label: 'Getting there', to: gettingThere },
        { label: 'senso-ji.jp/access/', href: 'https://www.senso-ji.jp/access/' },
      ],
      checkpoints: [
        {
          id: 'kaminarimon-station',
          kind: 'must-see',
          title: 'Asakusa Station to the gate',
          sentences: [
            'Official access lists four rail approaches, each about a five-minute walk: Tobu Skytree Line, Tokyo Metro Ginza Line, Tsukuba Express, and Toei Asakusa Line from Exit A4.',
            'Toei Bus, Keisei Town Bus, and the Taito Ward Megurin also serve the area. The temple itself has no parking.',
          ],
          lookFor: [
            'From Toei Asakusa Line, use Exit A4. The official page names that exit specifically.',
            'Walk toward the large red lantern over the crossing. That gate is Kaminarimon.',
            'If you arrived by car, the official page sends you to Taito Ward Kaminarimon Underground Parking or another nearby lot, not a temple car park.',
          ],
        },
        {
          id: 'kaminarimon-gate',
          kind: 'must-see',
          title: 'Kaminarimon, the outer gate',
          sentences: [
            'The official name is Furaijin-mon, the Wind and Thunder God Gate. The FAQ states that Kaminarimon is the outer gate of Sensō-ji, and that the path from the gate to the Hondo is the approach.',
            'Temple accounts date an earlier outer gate to 942, when Taira no Kinmasa rebuilt the precinct. The present gate was rebuilt in 1960, after 95 years, with a donation by Matsushita Kōnosuke.',
          ],
          lookFor: [
            'The red lantern hangs in the center of the gate. Official measurements are 3.9 m high, 3.3 m wide, and about 700 kg.',
            'Fūjin and Raijin stand to the left and right as you face the gate. They are the wind and thunder gods that give Furaijin-mon its name.',
            'On the back of the gate, facing Nakamise, are the dragon deities Tenryū and Kinryū, dedicated in 1978.',
            'Stand in the crossing only long enough for a photograph, then step aside. The official English page notes that the gate is often crowded with people taking pictures.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1d/Senso-ji_Kaminarimon_1.jpg/1280px-Senso-ji_Kaminarimon_1.jpg',
            alt: 'Kaminarimon, the vermilion outer gate of Sensō-ji, with its large red lantern facing the Asakusa crossing',
            credit: 'Zairon / Wikimedia Commons (CC BY-SA 4.0)',
            caption: 'Kaminarimon, the outer gate.',
          },
        },
        {
          id: 'kaminarimon-story',
          kind: 'story',
          title: 'Why this gate was rebuilt in 1960',
          sentences: [
            'Official precinct history says the gate burned in 1865 and then stood unrestored for 95 years.',
            'The temple account is that Matsushita Kōnosuke, then president of Matsushita Electric (now Panasonic), recovered from joint pain after the abbot prayed to the temple’s Kannon, and donated the present gate in thanks. The official English page records the same donation.',
          ],
        },
      ],
    },
    {
      id: 'nakamise',
      index: '02',
      nav: 'Nakamise',
      plate: 'The front approach',
      caption: 'Nakamise is the official front approach, about 250 metres of shops between the two gates.',
      sentences: [
        'Official precinct pages call Nakamise the front approach (omotesandō) of Sensō-ji.',
        'From Kaminarimon to Hōzōmon it runs about 250 metres, with vermilion shopfronts on both sides. The same page calls it one of the oldest shopping streets in Japan.',
        'Official visitor pages do not publish Nakamise opening or closing hours. Do not treat a souvenir-guide closing time as a temple line.',
      ],
      chips: [
        { label: 'Front approach' },
        { label: 'About 250 m' },
        { label: 'senso-ji.jp/guide/guide02.html', href: 'https://www.senso-ji.jp/guide/guide02.html' },
      ],
      checkpoints: [
        {
          id: 'nakamise-street',
          kind: 'must-see',
          title: 'Nakamise as the approach',
          sentences: [
            'This street is not a detour around the temple. Official pages treat it as the approach that links the outer gate to Hōzōmon.',
            'The official English visit page says traditional toys, cakes, and other souvenirs are sold here. Shop hours are not listed on senso-ji.jp.',
          ],
          lookFor: [
            'Look down the street: Hōzōmon sits at the far end, about 250 metres from Kaminarimon.',
            'The shopfronts are vermilion. Official history dates the present reinforced-concrete, vermilion row to the rebuilding after the 1923 earthquake, repaired again after 1945.',
            'Keep to the side if you stop to look at a stall. This is still the front approach to the halls.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Senso-ji_Nakamise_1.jpg/1280px-Senso-ji_Nakamise_1.jpg',
            alt: 'Nakamise, the shop-lined front approach of Sensō-ji, looking toward Hōzōmon',
            credit: 'Zairon / Wikimedia Commons (CC BY-SA 4.0)',
            caption: 'Nakamise, looking toward Hōzōmon.',
          },
        },
        {
          id: 'nakamise-origin',
          kind: 'story',
          title: 'How the shops were first allowed',
          sentences: [
            'Official precinct history traces Nakamise to around 1685 (Jōkyō 2). Nearby residents were given permission to set out simple stalls along the approach in return for cleaning the precinct.',
            'The same account says the name Nakamise, “middle shops,” came from shops that stood between the stores toward Kaminarimon-dōri and those in front of the Kannon hall.',
          ],
        },
      ],
    },
    {
      id: 'hozomon',
      index: '03',
      nav: 'Hōzōmon',
      plate: 'The inner gate',
      caption: 'Hōzōmon, also called Niō-mon, is the temple’s inner gate and a storehouse for scriptures.',
      sentences: [
        'At the end of Nakamise stands a two-storey vermilion gate. Official pages name it Hōzōmon, also called Niō-mon after the guardian statues in the outer bays.',
        'The present gate was rebuilt in 1964 of steel and reinforced concrete, with a donation by Ōtani Yonetarō and his wife, and was renamed Hōzōmon because it stores inherited scriptures and temple treasures.',
        'Walk through the three central openings. The Niō stand in the bays at either end.',
      ],
      chips: [
        { label: 'Niō-mon' },
        { label: 'Rebuilt 1964' },
        { label: 'senso-ji.jp/guide/guide03.html', href: 'https://www.senso-ji.jp/guide/guide03.html' },
      ],
      checkpoints: [
        {
          id: 'hozomon-gate',
          kind: 'must-see',
          title: 'Hōzōmon, the inner gate',
          sentences: [
            'Official history traces a Niō gate here to 942 and to a 1649 rebuilding under Tokugawa Iemitsu. That gate burned in the 1945 air raid, together with the Kannon hall and the pagoda.',
            'The official English page records the 1964 rebuilding and the donation by Yonetaro Otani, founder of Otani Heavy Industries and Hotel New Otani.',
          ],
          lookFor: [
            'The large lantern in the center of the gate. Official measurements are 3.75 m high, 2.7 m wide, and about 450 kg.',
            'Niō statues fill the outer bays. Official figures give each a total height of 5.45 m, in Kiso cypress, at about 1,000 kg apiece.',
            'The plaque reads Sensō-ji. Past the gate you are in the inner precinct, with the Hondo ahead.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4f/Senso-ji_Hozomon_01.jpg/1280px-Senso-ji_Hozomon_01.jpg',
            alt: 'Hōzōmon, the two-storey vermilion inner gate of Sensō-ji, seen from Nakamise',
            credit: 'Zairon / Wikimedia Commons (CC BY-SA 4.0)',
            caption: 'Hōzōmon, from Nakamise.',
          },
        },
        {
          id: 'hozomon-waraji',
          kind: 'object',
          title: 'The giant straw sandals',
          sentences: [
            'Large straw sandals hang on the gate. Official measurements are 4.5 m high, 1.5 m wide, and 500 kg, using 2,500 kg of straw, most recently dedicated in October 2018 by volunteers from Murayama in Yamagata, the eighth offering since 1941.',
            'The official page says the sandals stand for the strength of the Niō, and that a tradition holds that demons leave when they see how large a pair this temple’s guardians wear.',
          ],
        },
        {
          id: 'hozomon-story',
          kind: 'story',
          title: 'A storehouse, not a viewing deck',
          sentences: [
            'Official history says that in the Edo period, on a few festival days, ordinary worshippers were allowed to climb to the upper storey for the view. The same page states that this is not done today.',
            'The upper storey now holds a storage room, including the Yuan-dynasty Chinese Buddhist canon (a National Important Cultural Property) that gives the gate its present name.',
          ],
        },
      ],
    },
    {
      id: 'omizuya',
      index: '04',
      nav: 'Omizuya',
      plate: 'Rinse before the hall',
      caption: 'The omizuya stands on the right in front of the Hondo, for rinsing hands and mouth before worship.',
      sentences: [
        'Official precinct pages place the omizuya on the right in front of the Hondo, and say it is for purifying the body before worship.',
        'The official how-to page asks you to complete every step with one scoop of water from the dragon’s mouth, and not to put your mouth on the ladle.',
        'The pavilion was dedicated in April 1964 by the Asakusa restaurant and food-service association.',
      ],
      chips: [
        { label: 'Right of the Hondo' },
        { label: 'Official how-to', href: 'https://www.senso-ji.jp/visit/howto.html' },
        { label: 'Etiquette', to: etiquette },
      ],
      checkpoints: [
        {
          id: 'omizuya-basin',
          kind: 'must-see',
          title: 'The omizuya pavilion',
          sentences: [
            'Use this basin before you go on to the Hondo. Official pages describe it as the place to purify yourself before worship, on the right in front of the hall.',
            'One scoop of water is enough for the whole sequence. The official how-to is written as a house rule, not as optional decoration.',
          ],
          lookFor: [
            'The octagonal granite basin, officially 2.3 m across and 1 m high, under the pavilion roof.',
            'The dragon deity on the basin is a statue of Sāgara-nāgarāja (Shakatsura Ryūō) by Takamura Kōun, first placed in 1903 on a fountain behind the Hondo and later moved here.',
            'Look up: the ceiling painting is “Sumi-e no Ryū,” a dragon in ink by Azuma Shōkō, dedicated in 1964.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/Asakusa_-_Senso-ji_89_%2815785533132%29.jpg/1280px-Asakusa_-_Senso-ji_89_%2815785533132%29.jpg',
            alt: 'The omizuya in front of the Sensō-ji Hondo, with the dragon statue on the stone basin and the main hall behind',
            credit: 'Joe Mabel / Wikimedia Commons (CC BY-SA 3.0)',
            caption: 'Omizuya, on the right in front of the Hondo.',
          },
        },
        {
          id: 'omizuya-practice',
          kind: 'practice',
          title: 'The official rinse',
          sentences: [
            'Official order: hold the ladle in your right hand and rinse the left hand; switch the ladle to your left hand and rinse the right; take the ladle in your right hand again, pour water into your left hand, and rinse your mouth from that palm.',
            'Do not touch the ladle to your mouth. Finally stand the ladle up, rinse the handle, and return it.',
          ],
          lookFor: [
            'One scoop only, taken from the water that comes from the dragon’s mouth, as the official page states.',
            'Mouth rinse goes into your cupped left hand, never onto the ladle itself.',
            'If a board on site shows another order, follow the board.',
          ],
        },
        {
          id: 'omizuya-story',
          kind: 'story',
          title: 'The dragon on the basin',
          sentences: [
            'Official pages identify the statue as Shakatsura Ryūō, one of the dragon kings who protect the Buddhist teaching, and a deity of water.',
            'It is a work by Takamura Kōun, dedicated in August 1903, and was first set on a fountain behind the Hondo before this pavilion was built.',
          ],
        },
      ],
    },
    {
      id: 'hondo',
      index: '05',
      nav: 'Hondo',
      plate: 'The Kannon hall',
      caption: 'The Hondo, also called Kannon-dō, is the main hall. Official opening is 06:00 to 17:00, or 06:30 from October to March.',
      sentences: [
        'The Hondo faces south and houses the temple’s principal image, Shō Kanzeon Bosatsu, kept as a hibutsu — a hidden Buddha. Official pages say even the abbot does not view it.',
        'Hall hours, repeated on the visit page and in the site footer, are 06:00 to 17:00, with a 06:30 opening from October to March. Hours for other halls are by enquiry.',
        'Official visitor pages list no general admission ticket and use no 拝観料 language. Prayer 志納金 start at ¥5,000 for a paper kito talisman and ¥3,000 for a memorial service — offerings for rites, not a gate fee.',
      ],
      chips: [
        { label: '06:00/06:30–17:00' },
        { label: 'No gate ticket listed' },
        { label: 'senso-ji.jp/visit/', href: 'https://www.senso-ji.jp/visit/' },
        { label: 'Etiquette', to: etiquette },
      ],
      checkpoints: [
        {
          id: 'hondo-hall',
          kind: 'must-see',
          title: 'The Hondo',
          sentences: [
            'The present hall was rebuilt in 1958, in reinforced concrete, after the 1945 air raid destroyed the earlier hall that had been a National Treasure. Official pages also record a 2010 reroofing in lightweight titanium tiles.',
            'The official hall page divides the interior into the gejin, the outer sanctum, and the naijin, the inner sanctum. It invites visitors who come to worship to go up into the naijin.',
          ],
          lookFor: [
            'The large lantern under the front canopy. Official measurements are 4.5 m high, 3.5 m wide, and about 600 kg.',
            'Inside the gejin, the plaque above reads Semui, “bestowing fearlessness,” a name used for Kannon. The official page asks you to look up at the ceiling paintings as well.',
            'Shoes come off if you step onto the tatami of the naijin. The principal image stays inside the palace shrine in the center — you will not be shown it.',
            'An elevator is on the left as you face the hall, for people who cannot use the stairs. Multipurpose toilets are to the right of Hōzōmon and behind the Hondo (senso-ji.jp/faq/).',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Hondo_%28Main_Hall%29_of_Sensoji_Temple.jpg/1280px-Hondo_%28Main_Hall%29_of_Sensoji_Temple.jpg',
            alt: 'The south front of the Sensō-ji Hondo, the main Kannon hall, with its steep roof and large lantern',
            credit: 'そらみみ (Soramimi) / Wikimedia Commons (CC BY-SA 3.0)',
            caption: 'The Hondo, seen from the precinct.',
          },
          prompt: {
            question: 'Will you go into the hall?',
            choices: [
              {
                label: 'Yes, if it is open',
                reply:
                  'Official opening is 06:00 to 17:00, or 06:30 from October to March. There is no general admission ticket listed on official visitor pages. Shoes come off on the tatami of the naijin. The official FAQ asks worshippers to place their hands together and chant “Namu Kanzeon Bosatsu.”',
              },
              {
                label: 'I will stay in the courtyard',
                reply:
                  'That is still a visit to the hall front. Keep clear of people who are praying, and do not block the steps for a photograph. Asakusa Shrine, to the east, is a separate Shinto site — official precinct pages include it in the guide, but it is not part of this temple walk.',
              },
            ],
          },
        },
        {
          id: 'hondo-hibutsu',
          kind: 'story',
          title: 'A principal image that is not shown',
          sentences: [
            'Official history says the image appeared in 628, when two brothers fishing in the Sumida River found it in their net, and that in 645 the priest Shōkai hid it from view after a dream. The official English page says it has remained never unveiled.',
            'The gohonzon page calls it an absolute hibutsu, locked in nested shrines, and says even the temple’s abbot refrains from viewing it. A standing substitute image by Ennin is also kept inside the palace shrine. The FAQ notes that this substitute is shown only once a year, at 14:00 on 13 December.',
          ],
        },
        {
          id: 'hondo-offerings',
          kind: 'practice',
          title: 'Hours, prayer offerings, and what is not a ticket',
          sentences: [
            'Kito and memorial rites are performed at the regular services: 06:00 (06:30 from October to March), 10:00, and 14:00, with extra services at New Year, on temple days, and on weekends. Reception in the Hondo runs from opening until 17:00. Official pages do not take those bookings by telephone.',
            'Published 志納金: paper talisman from ¥5,000; small wood from ¥10,000; large wood with red mizuhiki from ¥20,000; large wood with gold mizuhiki from ¥30,000; memorial from ¥3,000. These are offerings for services, not a gate fee. Third-party “Sensō-ji tickets” are typically tours or rentals, not admission.',
          ],
        },
      ],
    },
    {
      id: 'pagoda',
      index: '06',
      nav: 'Pagoda',
      plate: 'The five-storied pagoda, from the precinct',
      caption: 'The pagoda stands southwest of the Hondo. Official pages describe an exterior landmark, not a casual climb.',
      sentences: [
        'Official measurements put the pagoda at 53.32 m from the ground, rebuilt in 1973 in steel and reinforced concrete, on the southwest of the Hondo.',
        'The top storey holds Buddha relics formally received in 1966 from Isurumuniya in Sri Lanka. The memorial halls around the base are, as a rule, for people who have a memorial tablet here or who have booked a memorial service — not a general interior visit.',
        'Goshuin are not stamped in the pagoda. The desk is at Yōgōdō, west of the Hondo as you face it, from 08:00 to 16:30. Official pages list no yen amount; take the fee as posted at the desk.',
      ],
      chips: [
        { label: 'Exterior viewing' },
        { label: 'Yōgōdō 08:00–16:30' },
        { label: 'senso-ji.jp/guide/guide06.html', href: 'https://www.senso-ji.jp/guide/guide06.html' },
        { label: 'Goshuin', href: 'https://www.senso-ji.jp/visit/jumotsu3.html' },
      ],
      checkpoints: [
        {
          id: 'pagoda-exterior',
          kind: 'must-see',
          title: 'The five-storied pagoda',
          sentences: [
            'Stand in the precinct and look up. Official pages give the tower itself as 48.32 m, and 53.32 m from the ground including the base building.',
            'The first floor of that base is the temple office, with meeting rooms. Official pages do not list a general admission fee, a public stair, or a casual climb to the relics in the top storey.',
          ],
          lookFor: [
            'Five roofs and the metal spire, southwest of the Hondo — not on the Nakamise axis you just walked.',
            'The base looks like a plinth. Official text says the tower sits on this building, even though from a distance it can seem to rise from the ground.',
            'Do not treat a doorway into the office or the memorial halls as a ticketed lookout. Official memorial visiting days are for families and booked memorial services.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/Sens%C5%8D-ji_pagoda_2024.jpg/1280px-Sens%C5%8D-ji_pagoda_2024.jpg',
            alt: 'The five-storied pagoda of Sensō-ji against a blue sky, seen from the precinct',
            credit: 'Nacaru / Wikimedia Commons (CC BY-SA 4.0)',
            caption: 'The five-storied pagoda, from the precinct.',
            tall: true,
          },
        },
        {
          id: 'pagoda-yogodo',
          kind: 'practice',
          title: 'Yōgōdō, the goshuin desk',
          sentences: [
            'Official goshuin hours are 08:00 to 16:30, with special hours at New Year and on 9–10 July (Shiman-roku-sen-nichi). The desk is in Yōgōdō, on the west side of the Hondo — the left side as you face the hall.',
            'The temple stamps two seals here: the principal Kannon and Daikokuten of the Asakusa Seven Gods. Official pages also sell stamp books at this desk. They do not publish a yen price for the stamp — confirm the posted fee on site, and do not invent one.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5c/Yogodo_Hall_at_Sens%C5%8D-ji.jpg/1280px-Yogodo_Hall_at_Sens%C5%8D-ji.jpg',
            alt: 'Yōgōdō, the hall west of the Sensō-ji Hondo where goshuin are stamped',
            credit: 'Christophe95 / Wikimedia Commons (CC BY-SA 4.0)',
            caption: 'Yōgōdō, west of the Hondo.',
          },
        },
        {
          id: 'pagoda-relics',
          kind: 'story',
          title: 'Relics in the top storey',
          sentences: [
            'Official pages say Buddhist relics were formally received from Isurumuniya temple in Sri Lanka on 18 March 1966, and that they are enshrined in the fifth storey.',
            'The same pages list a few rite days when the memorial halls and the relics may be visited as part of a service. Those days are not a general public opening, and official text still limits coming to the halls, as a rule, to families with a tablet here or people who have booked a memorial service.',
          ],
        },
        {
          id: 'pagoda-light',
          kind: 'practice',
          title: 'Lighting, and a shrine next door',
          sentences: [
            'An official notice, “ライトアップのお知らせ,” says the Hondo, the five-storied pagoda, Hōzōmon, and Kaminarimon are lit every day from sunset until around 23:00. That clock is on the lighting page, not on the visit-hours table.',
            'Asakusa Shrine stands in the same precinct guide as a neighbour, but it is a separate Shinto shrine. Do not fold its rites into this walk.',
          ],
        },
      ],
    },
  ],
}
