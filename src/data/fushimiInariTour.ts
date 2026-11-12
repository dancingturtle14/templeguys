import type { Route } from '../types'

/** Stable ids for the six-stop walk. Each stop surfaces a Wikimedia image already attached to a checkpoint. */
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

/** must-see is the pin. object is a named thing. story is labeled folklore. practice is a house rule. */
export type CheckpointKind = 'must-see' | 'object' | 'story' | 'practice'

export type TourPrompt = {
  question: string
  choices: { label: string; reply: string }[]
}

export type TourCheckpoint = {
  id: string
  kind: CheckpointKind
  title: string
  sentences: string[]
  /** Concrete things to find on site. Required for must-sees. */
  lookFor?: string[]
  /** A tap choice. Every reply is a reading, not a score. */
  prompt?: TourPrompt
  image?: TourImage
}

export type TourStop = {
  id: string
  index: string
  nav: string
  plate: string
  caption: string
  sentences: string[]
  chips: TourChip[]
  checkpoints: TourCheckpoint[]
  optional?: boolean
}

export function tourStopImage(stop: TourStop): TourImage | undefined {
  return stop.checkpoints.find((item) => item.image)?.image
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
      checkpoints: [
        {
          id: 'arrival-station',
          kind: 'must-see',
          title: 'JR Inari Station',
          sentences: [
            'Take a JR Nara Line local. Inari is two stops south of Kyoto Station, and many rapid trains skip it.',
            'From the ticket gates the shrine is a short walk uphill. Follow the crowd and the vermilion ahead.',
          ],
          lookFor: [
            'On the platform, read the train type before you board. Locals stop at Inari. Rapids often do not.',
            'Walk out toward the shrine. It is a few uphill minutes on foot, not a bus ride.',
            'Food stalls line this street. Eat here if you are hungry. The mountain paths restrict eating while you walk.',
          ],
        },
        {
          id: 'arrival-romon',
          kind: 'must-see',
          title: 'Romon, the main gate',
          sentences: [
            'The romon is the two-storey gate at the foot of the precinct. You walk through it, not around a ticket booth.',
            'Shrine accounts date this gate to 1589 and credit the donation to Toyotomi Hideyoshi. There is still no admission fee past it.',
          ],
          lookFor: [
            'Stand in the center of the approach only long enough for the gate to frame the halls, then step to the side.',
            'Look up: two storeys of vermilion. The upper floor is part of the gate, not a deck you climb.',
            'There is no ticket window in the gate. You walk through.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Kyoto_Fushimi_Inari-taisha_Romon_5.jpg/1280px-Kyoto_Fushimi_Inari-taisha_Romon_5.jpg',
            alt: 'Vermilion two-storey romon gate at Fushimi Inari Taisha in Kyoto',
            credit: 'Zairon / Wikimedia Commons (CC BY-SA 4.0)',
            caption: 'Romon, the main gate.',
          },
        },
        {
          id: 'arrival-temizuya',
          kind: 'object',
          title: 'Fox temizuya',
          sentences: [
            'The temizuya just inside is a water basin, here shaped with a fox. It is for rinsing hands before you go on, not a fountain to drink from.',
            'The usual shrine order is left hand, right hand, mouth, then the handle of the ladle. If the board shows another order, follow the board.',
          ],
          lookFor: [
            'Hold the ladle in your right hand for that usual order: left hand, right hand, mouth, then the handle.',
            'Do not drink the water, and do not touch your mouth to the ladle.',
            'The fox is the shape of the basin. The water is only for the rinse.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/Hushimi-inari-taisha_kitune_no_chozu.jpg/1280px-Hushimi-inari-taisha_kitune_no_chozu.jpg',
            alt: 'Fox-shaped temizuya water basin at Fushimi Inari Taisha',
            credit: 'KENPEI / Wikimedia Commons (CC BY 3.0)',
            caption: 'Fox-shaped temizuya in the precinct.',
          },
        },
        {
          id: 'arrival-tofu',
          kind: 'story',
          title: 'Fried tofu on the approach',
          sentences: [
            'Traditional story: foxes are said to like fried tofu, which is why inari-zushi — tofu pouches — fills the shops between the station and the gate.',
            'That is folk explanation, not a rite. The stalls are ordinary food. Eat here or after you leave the mountain paths, not while you are walking them.',
          ],
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
      checkpoints: [
        {
          id: 'senbon-tunnels',
          kind: 'must-see',
          title: 'The two close tunnels',
          sentences: [
            'Behind the main sanctuary the path splits into two parallel corridors of gates, close enough that you are in shade the whole way.',
            'The dense stretch is often ten to fifteen minutes of walking. Step aside for photographs so the corridor keeps moving.',
          ],
          lookFor: [
            'The two corridors run side by side. Walk one, then the other if you want both.',
            'If you stop, stand at the edge. The middle is the walking line.',
            'Look back: the gates stack into a tunnel. Ahead, they open into the climb.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/Fushimi-Inari-Shrine-Senbon-Torii-2016-Luka-Peternel.jpg/1280px-Fushimi-Inari-Shrine-Senbon-Torii-2016-Luka-Peternel.jpg',
            alt: 'Dense vermilion Senbon Torii tunnel at Fushimi Inari Taisha',
            credit: 'Luka Peternel / Wikimedia Commons (CC BY-SA 4.0)',
            caption: 'One wing of the Senbon Torii tunnels.',
          },
        },
        {
          id: 'senbon-name',
          kind: 'object',
          title: 'Why it is called Senbon',
          sentences: [
            'Senbon means “a thousand gates.” The name stuck. The mountain carries many more than a thousand, and no posted count is the one to memorize.',
            'After the dense tunnels the gates thin out and the path becomes a climb between them, not a roof.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f9/FUS_-_Senbon_torii_path_at_Fushimi_Inari-taisha%2C_Kyoto%2C_Japan%2C_2015.jpg/960px-FUS_-_Senbon_torii_path_at_Fushimi_Inari-taisha%2C_Kyoto%2C_Japan%2C_2015.jpg',
            alt: 'Path of red Senbon torii gates at Fushimi Inari-taisha',
            credit: 'Josep M. Gracia / Wikimedia Commons (CC BY-SA 4.0)',
            caption: 'Gates spaced along the climb after the tightest tunnel.',
            tall: true,
          },
        },
        {
          id: 'senbon-pillars',
          kind: 'object',
          title: 'The writing on the pillars',
          sentences: [
            'Black characters on the vermilion pillars name the donor and usually a date. Most donors are companies and guilds, not anonymous pilgrims.',
            'Read them as you pass. They are the record of the gift, not a backdrop to climb or to hang anything on.',
          ],
          lookFor: [
            'Step beside a gate and read the pillar you see when you look back downhill.',
            'Expect a name, often a company, and a date. Not a price, and not a prayer you have to recite.',
            'The characters are cut into the vermilion. They label the gift.',
          ],
          prompt: {
            question: 'What are you most likely reading on a pillar?',
            choices: [
              {
                label: 'A company name and a date',
                reply: 'Yes. Most inscriptions name a business or a group, and a date. That is the donor record.',
              },
              {
                label: 'An admission price',
                reply: 'No. The characters are not a fare. The precinct has no admission fee.',
              },
              {
                label: 'A prayer you must recite',
                reply: 'No set prayer is printed there for visitors to perform. The writing records who gave the gate.',
              },
            ],
          },
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6a/FUS_-_Inscribed_Senbon_torii_at_Fushimi_Inari-taisha%2C_Kyoto%2C_Japan%2C_2015.jpg/1280px-FUS_-_Inscribed_Senbon_torii_at_Fushimi_Inari-taisha%2C_Kyoto%2C_Japan%2C_2015.jpg',
            alt: 'Inscribed pillar of a Senbon torii at Fushimi Inari-taisha',
            credit: 'Josep M. Gracia / Wikimedia Commons (CC BY-SA 4.0)',
            caption: 'Donor inscription on a torii pillar.',
          },
        },
        {
          id: 'senbon-gift',
          kind: 'story',
          title: 'A gate given for prosperity',
          sentences: [
            'Traditional account: Inari is tied to rice and, from that, to trade. A business gives a gate and has its name cut into the wood as the offering.',
            'The gift is the practice. It is not a promise that trade will improve, and the shrine does not sell the corridor as a ticketed tunnel.',
          ],
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
      checkpoints: [
        {
          id: 'pauses-kitsune',
          kind: 'must-see',
          title: 'The stone foxes',
          sentences: [
            'The fox is Inari’s messenger, not the kami itself. Statues stand along the climb, often with a key, a jewel, or a scroll in the mouth.',
            'The key is commonly read as the key to the rice storehouse. That is the usual explanation of the object. Not every statue is labeled.',
          ],
          lookFor: [
            'Stand beside the statue, not between it and someone who is offering.',
            'Look at the mouth: a key, a jewel, or a scroll. Some mouths are empty or worn smooth.',
            'A red bib on a fox was tied by a worshipper. Leave it tied.',
          ],
          prompt: {
            question: 'What is this fox holding?',
            choices: [
              {
                label: 'A key',
                reply: 'Often. The usual reading is the key to the rice storehouse. Check the statue in front of you, not a diagram.',
              },
              {
                label: 'A jewel or a scroll',
                reply: 'Also common. The mouth carries one object, not a fixed set. A jewel or a scroll is the same messenger, differently equipped.',
              },
              {
                label: 'Nothing you can see',
                reply: 'Some mouths are empty or worn. The storehouse reading belongs to the statues that still hold a key.',
              },
            ],
          },
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Kitsune_Statue_at_Fushimi_Inari_%282615371311%29.jpg/1280px-Kitsune_Statue_at_Fushimi_Inari_%282615371311%29.jpg',
            alt: 'Stone kitsune statue at Fushimi Inari Taisha',
            credit: 'syvwlch / Wikimedia Commons (CC BY 2.0)',
            caption: 'A kitsune beside the path.',
            tall: true,
          },
        },
        {
          id: 'pauses-otsuka',
          kind: 'object',
          title: 'Otsuka stones',
          sentences: [
            'Otsuka are private votive stones, given by a person, a family, or a group, and carved with a name. They cluster by the hundred.',
            'They are not one altar you are meant to finish. Pause if someone is praying, and do not treat the rows as a seating wall.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/Collection_of_inscribed_stones_at_Fushimi_Inari-taisha_%28164%29.jpg/1280px-Collection_of_inscribed_stones_at_Fushimi_Inari-taisha_%28164%29.jpg',
            alt: 'Rows of inscribed votive stones at Fushimi Inari-taisha',
            credit: 'Savannah Rivka / Wikimedia Commons (CC BY-SA 4.0)',
            caption: 'Inscribed otsuka on the mountain.',
          },
        },
        {
          id: 'pauses-forks',
          kind: 'must-see',
          title: 'Where the path forks',
          sentences: [
            'Side paths peel off toward small shrines and more stones. The through-route is the signed one back toward Yotsutsuji.',
            'Do not cut between the trees to rejoin a switchback. The ground is roots and loose stone, and the shortcut is how people get lost.',
          ],
          lookFor: [
            'At a split, follow the signed way toward Yotsutsuji, not the gap between trees.',
            'If the gates have opened from a tunnel into spaced posts, you are past the dense Senbon stretch.',
            'A narrow side path usually ends at more stones or a small shrine, then stops.',
          ],
        },
        {
          id: 'pauses-messenger',
          kind: 'story',
          title: 'The white fox',
          sentences: [
            'Traditional story: kitsune serve Inari, and the white fox is the form the statues usually take. People leave fried tofu because the fox is said to favor it.',
            'Pray toward Inari, at the shrines. The statue is the messenger’s image, not a separate deity with its own rite.',
          ],
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
      checkpoints: [
        {
          id: 'yotsutsuji-cross',
          kind: 'must-see',
          title: 'The four-way junction',
          sentences: [
            'Yotsutsuji means the four-way crossroads. Paths come in from the lower gates and go on toward the upper shrines.',
            'From the dense tunnels this is commonly thirty to forty-five minutes of climbing, longer in a crowd.',
          ],
          lookFor: [
            'Stop in the middle of the junction and count the paths. The name means four ways.',
            'The way down is the path you climbed. The way on is signed toward the upper shrines.',
            'You are at a meeting of paths, not inside a single hall.',
          ],
        },
        {
          id: 'yotsutsuji-view',
          kind: 'must-see',
          title: 'Kyoto from the ledge',
          sentences: [
            'The junction looks south over Kyoto. On a clear day the city sits below the vermilion and the trees.',
            'It is a viewpoint, not a platform with a rail everywhere. Watch your footing at the edge.',
          ],
          lookFor: [
            'Face the open side, away from the wooded climb, for the city.',
            'Keep a step back from the edge when people are passing. It is not railed everywhere.',
            'The view is the must-see. The stalls are the rest, not the sight.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/View_on_Fushimi_on_Fushimi_Inari-taisha.jpg/1280px-View_on_Fushimi_on_Fushimi_Inari-taisha.jpg',
            alt: 'View over Kyoto from Yotsutsuji on Mount Inari at Fushimi Inari-taisha',
            credit: 'Ryuch / Wikimedia Commons (CC BY-SA 3.0)',
            caption: 'Kyoto from Yotsutsuji.',
          },
        },
        {
          id: 'yotsutsuji-rest',
          kind: 'object',
          title: 'The last easy rest',
          sentences: [
            'Small rest stalls and drink machines are usually at this junction. Do not count on the same services once you continue up.',
            'If you are carrying water, top it up here. The upper circuit is a longer walk than the view suggests.',
          ],
        },
        {
          id: 'yotsutsuji-mountain',
          kind: 'story',
          title: 'Inariyama, and the turn',
          sentences: [
            'The mountain is about 233 meters. The paths are a pilgrimage climb that happens to contain a famous tunnel, not a tunnel with a mountain attached.',
            'Most first visits are complete at this crossroads. Continuing is a choice, not the required end of the walk.',
          ],
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
      checkpoints: [
        {
          id: 'summit-okumiya',
          kind: 'must-see',
          title: 'Okumiya, the inner shrine',
          sentences: [
            'Okumiya, also written Okunomiya, is the inner sanctuary on the upper mountain, past the Yotsutsuji turnaround.',
            'It is quieter than the tunnels and still a place of worship. The same path rules apply.',
          ],
          lookFor: [
            'The hall is smaller than the lower sanctuary. Stay out of the worship space if people are praying.',
            'The omokaru stone is nearby, on its base, not inside the hall and not a loose rock from the path.',
            'Wish first if you are going to lift it, then put it back on the same base.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Okunomiya_Shrine_in_Fushimi_Inari_Grand_Shrine.jpg/1280px-Okunomiya_Shrine_in_Fushimi_Inari_Grand_Shrine.jpg',
            alt: 'Okunomiya, the inner shrine at Fushimi Inari Taisha',
            credit: 'そらみみ / Wikimedia Commons (CC BY-SA 4.0)',
            caption: 'Okumiya, the inner shrine.',
          },
        },
        {
          id: 'summit-omokaru',
          kind: 'story',
          title: 'The omokaru stone',
          sentences: [
            'Traditional custom, near the inner shrine: make a wish, then lift the stone. If it feels lighter than you expected, the wish is said to be favored; if heavier, less so.',
            'It is a custom of the place, not a result the shrine guarantees. Lift with your legs, and put the stone back as you found it.',
          ],
          lookFor: [
            'Find the stone on its base near the inner shrine. Do not pick up a random rock from the path.',
            'There is no posted weight. You compare the lift with what you expected.',
            'Set it back on the same base before you walk on.',
          ],
          prompt: {
            question: 'After the wish, how did the stone feel?',
            choices: [
              {
                label: 'Lighter than I expected',
                reply: 'Tradition says a light lift favors the wish. The shrine does not guarantee the outcome.',
              },
              {
                label: 'Heavier than I expected',
                reply: 'Tradition says a heavy lift is the less favored reading. It is still only a custom.',
              },
            ],
          },
        },
        {
          id: 'summit-forest',
          kind: 'object',
          title: 'Forest, not another tunnel',
          sentences: [
            'Above Yotsutsuji the gates thin into a wooded circuit of sub-shrines, roots, and stone steps. A full loop is often two to three hours with rests.',
            'Carry water. If you may still be descending after dusk, carry a light. The mountain has no street lighting.',
          ],
        },
        {
          id: 'summit-peaks',
          kind: 'object',
          title: 'Several peaks, one circuit',
          sentences: [
            'The upper walk is a loop around the sacred mountain’s shrines, not a single summit platform with one view.',
            'Stay on the signed circuit. Side trails look like shortcuts and are how a calm hike becomes a search.',
          ],
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
      checkpoints: [
        {
          id: 'descent-ways',
          kind: 'must-see',
          title: 'Two ways down',
          sentences: [
            'You can reverse the path you climbed, or follow the signed loop back toward the main shrine and the station.',
            'Both end at the precinct, not at a separate exit gate. Leave time for the walk itself, not only the train you hope to catch.',
          ],
          lookFor: [
            'Signs point back the way you came and around the loop. Either returns to the main shrine.',
            'There is no second station exit on the mountain. You finish in the precinct, then walk down to the trains.',
            'Leave daylight for the descent if you are without a light.',
          ],
        },
        {
          id: 'descent-ema',
          kind: 'object',
          title: 'Ema, the wish plaques',
          sentences: [
            'Ema are small wooden plaques. At Inari they are often fox-shaped. You write a wish and hang the plaque where the staff show you.',
            'They are sold at the counters, which keep daytime hours. The trails can still be open after the rack has closed for the night.',
          ],
          lookFor: [
            'Many plaques here are fox-shaped or fox-faced, not only rectangles.',
            'Write, then hang on the rack the staff point to. Leave other people’s plaques where they are.',
            'The rack closes with the counters. The paths do not share that clock.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/79/Ema_at_Fushimi_Inari-taisha_02.jpg/1280px-Ema_at_Fushimi_Inari-taisha_02.jpg',
            alt: 'Wooden ema plaques hanging at Fushimi Inari-taisha',
            credit: 'Immanuel Giel / Wikimedia Commons (CC BY-SA 4.0)',
            caption: 'Ema at the shrine.',
          },
        },
        {
          id: 'descent-office',
          kind: 'object',
          title: 'Omamori and the goshuin desk',
          sentences: [
            'Omamori charms and goshuin stamp books are office services, not trail services. Read the hours on the board, or check inari.jp, before you count on either.',
            'Ignore anyone outside the station selling an “entry ticket.” The precinct does not charge admission.',
          ],
          lookFor: [
            'Charms are small brocade bags on shelves, grouped by the wish printed on the tag. The price is on the shelf, not in this guide.',
            'Goshuin is a stamp desk and a book, not the same shelf as the bags.',
            'If the tags are only in Japanese, ask. Do not guess a charm’s purpose from the color of the cloth.',
          ],
        },
        {
          id: 'descent-eating',
          kind: 'practice',
          title: 'Where you may eat',
          sentences: [
            'The shrine’s conduct rules restrict eating while you walk the paths. A snack at Yotsutsuji’s rest spot is not the same as eating in the tunnel.',
            'The etiquette chapter lists the conduct rules. Getting there covers the trains back to Kyoto Station.',
          ],
        },
      ],
    },
  ],
}
