import type { Route } from '../types'
import type { TourStop } from './fushimiInariTour'

/** Stable ids for the six-stop walk from the Harajuku gate along Minami-sandō to the halls. */
export const MEIJI_SHRINE_TOUR_ID = 'meiji-shrine'

export const MEIJI_SHRINE_TOUR_STOP_IDS = [
  'harajuku-gate',
  'minami-sando',
  'ootorii',
  'temizusha',
  'main-shrine',
  'inner-garden',
] as const

export type MeijiShrineTourStopId = (typeof MEIJI_SHRINE_TOUR_STOP_IDS)[number]

const etiquette: Route = { name: 'temple', id: MEIJI_SHRINE_TOUR_ID, chapter: 'etiquette' }
const gettingThere: Route = { name: 'temple', id: MEIJI_SHRINE_TOUR_ID, chapter: 'getting-there' }

export const MEIJI_SHRINE_MAPS_WALKING =
  'https://www.google.com/maps/dir/?api=1&destination=Meiji+Jingu,+1-1+Yoyogi+Kamizono-cho,+Shibuya+City,+Tokyo&travelmode=walking'

export const MEIJI_SHRINE_TOUR_END_COPY =
  'The Harajuku gate, Minami-sandō, the Ōtorii, the temizuya, and the main shrine are a complete visit for most people — about an hour, on the official Q&A. The Inner Garden is a paid add-on with its own hours; the Museum is another, and is closed on Thursdays. The Treasure Museum is currently closed.'

export const MEIJI_SHRINE_TOUR: { stops: TourStop[] } = {
  stops: [
    {
      id: 'harajuku-gate',
      index: '01',
      nav: 'Harajuku Gate',
      plate: 'From the station to the first torii',
      caption: 'The Harajuku entrance is about a one-minute walk from JR Harajuku and Meiji-jingumae stations.',
      sentences: [
        'The official access diagram gives these walks to the shrine entrance: Harajuku Station (JR Yamanote Line) and Meiji-jingumae Station (Tokyo Metro Chiyoda Line), one minute; Sangubashi Station (Odakyu Line), three minutes; Yoyogi Station (JR Yamanote, JR Chūō-Sōbu, and Toei Ōedo) and Kita-sando Station (Tokyo Metro Fukutoshin Line), five minutes each.',
        'Those times are to the entrance only. Official English access text says it takes at least another ten minutes from the entrance to the main shrine buildings. The Japanese access page says about ten minutes from each entrance to the honden.',
        'The main precinct is free of charge and open every day from sunrise to sunset. Exact clock times change by month on the official visit page. Some places and facilities inside may have shorter hours, mainly 09:00 to 16:00.',
        'Official Q&A: about one hour for the shrine itself, and around two hours if you also visit the Inner Garden and the Meiji Jingu Museum. There are no official guided tours, and nowhere to store suitcases inside the grounds.',
      ],
      chips: [
        { label: 'Harajuku / Meiji-jingumae ~1 min' },
        { label: '+10 min to the halls' },
        { label: 'Precinct free' },
        { label: 'Getting there', to: gettingThere },
        { label: 'meijijingu.or.jp/en/access/', href: 'https://www.meijijingu.or.jp/en/access/' },
      ],
      checkpoints: [
        {
          id: 'harajuku-stations',
          kind: 'must-see',
          title: 'Stations and the Harajuku entrance',
          sentences: [
            'Most visitors use the south entrance, Harajuku Gate (原宿口), from JR Harajuku or Tokyo Metro Meiji-jingumae. The official New Year access note also groups Meiji-jingumae’s Fukutoshin Line platforms with that one-minute walk to the same gate; the regular access diagram labels the Fukutoshin Line at Kita-sando as a five-minute walk.',
            'The official address is 1-1, Yoyogi Kamizono-cho, Shibuya-ku, Tokyo 151-8557. Motorcycles and bicycles are not allowed in the shrine grounds; leave them in the parking area at the entrance. Wheelchairs are available at the entrance.',
          ],
          lookFor: [
            'Signs for Harajuku Entrance / 原宿口 just off the stations. The official access map marks this south gate separately from the Yoyogi and Sangubashi entrances.',
            'The first torii ahead, at the start of Minami-sandō. Official precinct-map text calls it the first of three torii on the south approach.',
            'Bicycle and motorcycle parking at the edge of the grounds, not on the gravel path. Official access text is explicit: vehicles of that kind stay at the entrance.',
          ],
        },
        {
          id: 'harajuku-first-torii',
          kind: 'must-see',
          title: 'The first torii on Minami-sandō',
          sentences: [
            'Official precinct-map text: a torii marks the entrance to a shrine, separating the sacred world from the secular. This gate is in the myōjin style, with a curved upper lintel, and three sixteen-petal chrysanthemum crests on that lintel — the Imperial Family crest, used around the grounds, including on lanterns.',
            'The same page says you will see people bowing as they pass under a torii when they enter and leave. An official visitor page on the former gate records that this first torii near Harajuku Station was rebuilt in commemoration of Meiji Jingu’s centennial in 2020, and that wood from the earlier gate is reused for amulets.',
          ],
          lookFor: [
            'The unpainted wooden myōjin torii at the south entrance, with three chrysanthemum crests on the upper lintel.',
            'A short bow as you pass under it, if you are following the custom the official map describes. There is no ticket gate here; the precinct itself is free.',
            'Stay on the gravel path once you are through. Official etiquette forbids leaving the path in the forest.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/The_entrance_to_Meiji_Jingu%2C_Tokyo%2C_Japan.jpg/1280px-The_entrance_to_Meiji_Jingu%2C_Tokyo%2C_Japan.jpg',
            alt: 'The first torii at the Harajuku entrance of Meiji Jingu, with the shrine forest behind it',
            credit: 'Joli Rumi / Wikimedia Commons (CC BY-SA 4.0)',
            caption: 'The first torii at the Harajuku entrance.',
          },
        },
        {
          id: 'harajuku-hours',
          kind: 'practice',
          title: 'Gate hours, and what is free',
          sentences: [
            'Official visit page: Meiji Jingu is open every day throughout the year, free of charge, from sunrise to sunset. The posted table runs from 06:40–16:20 in January to 05:00–18:30 in June, and 06:40–16:00 in December — always check the live table before an early or late visit.',
            'The Inner Garden and the Museum are not covered by that free, sunrise-to-sunset rule. They have their own fees and clocks, which this walk states at the last stop. Do not treat a garden or museum closing time as the shrine’s closing time.',
          ],
        },
      ],
    },
    {
      id: 'minami-sando',
      index: '02',
      nav: 'Minami-sandō',
      plate: 'The planted forest on the south approach',
      caption: 'Minami-sandō runs through a man-made forest of about 70 hectares, from the first torii toward the halls.',
      sentences: [
        'The official English forest page describes a man-made forest that can look natural, planted by 110,000 volunteers, covering 70 hectares, with 234 varieties of trees. The official Japanese midokoro page adds that about 100,000 trees were donated from across the country when the shrine was founded.',
        'The same Japanese page gives the founding count, including trees already on the land, as about 120,000 trees of 365 kinds, and the second precinct survey (published Heisei 25 / 2013) as about 36,000 trees of 234 kinds, as the canopy matured.',
        'Official etiquette: stay on the path in the forest; do not take living things, flowers, branches, or nuts into or out of the forest; do not run or play sports; eat, drink, or smoke only in designated areas.',
        'Official access text again: plan at least another ten minutes on this path from the entrance to the main shrine buildings.',
      ],
      chips: [
        { label: 'About 70 hectares' },
        { label: 'Stay on the path' },
        { label: 'Etiquette', to: etiquette },
        { label: 'meijijingu.or.jp/en/whattosee/forest/', href: 'https://www.meijijingu.or.jp/en/whattosee/forest/' },
      ],
      checkpoints: [
        {
          id: 'sando-path',
          kind: 'must-see',
          title: 'The gravel approach',
          sentences: [
            'This wide gravel road is Minami-sandō, the south approach. Official pages treat the forest as the threshold of the shrine, planned as a self-regenerating wood rather than a decorative park.',
            'Yoyogi Park, which the official access map labels beside the shrine, is not part of the precinct and is not a stop on this walk.',
          ],
          lookFor: [
            'A straight, shaded gravel path with tall evergreen canopy on both sides. Official English text says fallen trees are left to return to the soil.',
            'Path edges only. Official Japanese visitor notes say 林内に立ち入らないでください — do not go into the woods.',
            'The walk to the halls takes at least ten minutes from the entrance. There is no shortcut through the trees.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Meiji-jingu_Minamisando.jpg/1280px-Meiji-jingu_Minamisando.jpg',
            alt: 'The gravel south approach of Meiji Jingu, shaded by the shrine forest',
            credit: 'KENPEI / Wikimedia Commons (CC BY-SA 3.0)',
            caption: 'Minami-sandō, the south approach.',
          },
        },
        {
          id: 'sando-barrels',
          kind: 'object',
          title: 'Sake and wine barrels on the south approach',
          sentences: [
            'Official precinct-map text places decorative sake barrels along the south approach. They are offered each year by members of the Meiji Jingu Nationwide Sake Brewers Association, in respect for Emperor Meiji and Empress Shōken. The barrels on display are decorative and empty; sake in bottles is offered with them.',
            'The same page records barrels of wine offered to the shrine: wineries in Burgundy, France, first donated barrels in 2006 in memory of Emperor Meiji’s regard for French wine, and wine from Burgundy is still offered every year. Official sanctuary pages also list these barrels among things to see on the south approach.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/Meiji_Jingu_Sake_Barrels.jpg/1280px-Meiji_Jingu_Sake_Barrels.jpg',
            alt: 'Rows of decorative straw-covered sake barrels stacked along the south approach at Meiji Jingu',
            credit: 'Immanuelle / Wikimedia Commons (CC BY-SA 4.0)',
            caption: 'Sake barrels offered on Minami-sandō.',
          },
        },
        {
          id: 'sando-forest-story',
          kind: 'story',
          title: 'How this forest was planted',
          sentences: [
            'Official establishment and forest pages: the precinct was completed on 1 November 1920, after donations of trees from all over Japan and volunteer labour. Forestry experts, led on the English forest page by Honda Seiroku, planned a forest that would look natural at planting and still stand a hundred or two hundred years later, with no later adding or taking away.',
            'Official Japanese midokoro history: most of the shrine buildings burned in the air raids of April 1945, but the forest survived and sheltered people. The halls you will reach were rebuilt later, in 1958.',
          ],
        },
      ],
    },
    {
      id: 'ootorii',
      index: '03',
      nav: 'Ōtorii',
      plate: 'The great torii at the crossing of the approaches',
      caption: 'Official pages call this Ōtorii the largest wooden myōjin-style torii of its kind in Japan.',
      sentences: [
        'The official English precinct map gives the Ōtorii as 12 metres tall and 17.1 metres wide, each pillar 1.2 metres in diameter, the two pillars together 13 metric tons. The official Japanese precinct guide gives height 12 m, the span between pillars 9.1 m, pillar diameter 1.2 m, and a kasagi (upper lintel) 17 m long.',
        'It stands at the intersection of the northern and southern approaches to the main shrine, and is also called the ōtorii, or large torii. Official English text says this gate has come to symbolise Meiji Jingu for many visitors because of its size.',
        'The original Ōtorii, built in 1920 from a 1,200-year-old Japanese cypress from the Alishan range in Taiwan, was destroyed by lightning in 1966. The present gate, of a 1,500-year-old Japanese cypress also from Taiwan, was completed on 23 December 1975.',
      ],
      chips: [
        { label: 'Largest wooden myōjin torii' },
        { label: 'Rebuilt 1975' },
        { label: 'meijijingu.or.jp/en/map/', href: 'https://www.meijijingu.or.jp/en/map/' },
      ],
      checkpoints: [
        {
          id: 'ootorii-gate',
          kind: 'must-see',
          title: 'The great torii',
          sentences: [
            'This is the second of the three torii on Minami-sandō, not the entrance gate you already passed. Official map text describes the same myōjin style, with a curved upper lintel, as the first torii.',
            'From here the north approach (from Yoyogi Gate) meets the south approach. Continue toward the halls; the temizuya and Minami Shinmon are still ahead.',
          ],
          lookFor: [
            'The scale: official English figures are 12 m tall and 17.1 m wide, with pillars 1.2 m across.',
            'Three chrysanthemum crests on the curved upper lintel, as on the first torii.',
            'The crossing of the north and south approaches. If you arrived from Yoyogi or Kita-sando, this is where the paths join.',
            'A pause for a photograph is common. Step off the centre line once you have looked, so others can pass under the gate.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/2019-09-04_Torii_of_Meiji_Shrine.jpg/1280px-2019-09-04_Torii_of_Meiji_Shrine.jpg',
            alt: 'The great wooden Ōtorii of Meiji Jingu on the gravel approach, with forest on both sides',
            credit: 'Sergey Galyonkin / Wikimedia Commons (CC BY-SA 2.0)',
            caption: 'The Ōtorii, where the approaches meet.',
          },
        },
        {
          id: 'ootorii-rebuild',
          kind: 'story',
          title: 'Why this gate was rebuilt in 1975',
          sentences: [
            'Official precinct-map history: after lightning destroyed the 1920 gate in 1966, a Tokyo timber merchant who had vowed to help rebuild it searched for a tree of the right size. None could be found in Japan, so he looked in Taiwan, with help from many people, and the new torii was completed on 23 December 1975.',
            'This is a different rebuilding from the first torii at the Harajuku entrance, which official pages treat as a later, centennial project. Do not mix the two gates.',
          ],
        },
      ],
    },
    {
      id: 'temizusha',
      index: '04',
      nav: 'Temizusha',
      plate: 'Purify before the halls',
      caption: 'Official pages ask visitors to purify hands and mouth at a temizuya before going on to the main sanctuary.',
      sentences: [
        'Official precinct-map text: when entering a shrine, visitors purify themselves at a temizuya, a ritual purification building. Ladles are provided so that you can wash your hands and cleanse your mouth. Everyone, regardless of faith, is welcome to take part.',
        'The official Japanese visitor page says the temizuya stand near the shrine buildings, on the south, east, and west sides. The south pavilion is the one most people reach first from Minami-sandō.',
        'The official English “Temizu & Sampai” page, and the Japanese visitor page, give the same three-step form: wash your hands; pour water into both hands and rinse your mouth; wash your hands again.',
      ],
      chips: [
        { label: 'South, east, and west pavilions' },
        { label: 'Etiquette', to: etiquette },
        { label: 'meijijingu.or.jp/en/feelshinto/2.php', href: 'https://www.meijijingu.or.jp/en/feelshinto/2.php' },
      ],
      checkpoints: [
        {
          id: 'temizu-pavilion',
          kind: 'must-see',
          title: 'The south temizusha',
          sentences: [
            'This is the pavilion beside the approach to the halls, listed on the official map as Temizusha (water font). Official pages do not publish a separate opening time for the temizuya; they sit in the precinct and follow shrine hours, unless a notice on the day says otherwise.',
            'Use a ladle. Official text does not ask you to dip your hands into the basin.',
          ],
          lookFor: [
            'A timber pavilion over a stone basin, with wooden ladles (hishaku) laid on a grate.',
            'The water flowing from a spout into the basin. Take water with the ladle; do not touch the spout with your hands or mouth.',
            'Space for the next person. This is the last pause before Minami Shinmon and the main shrine.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Chozuya_at_Meiji-jingu.jpg/1280px-Chozuya_at_Meiji-jingu.jpg',
            alt: 'The temizusha at Meiji Jingu, a stone basin with wooden ladles for ritual purification',
            credit: 'Ray Tsang / Wikimedia Commons (CC BY-SA 2.0)',
            caption: 'Temizusha, the purification basin.',
          },
        },
        {
          id: 'temizu-steps',
          kind: 'practice',
          title: 'The official three steps',
          sentences: [
            'Official English wording: (1) wash your hands; (2) pour water into both hands and rinse your mouth; (3) wash your hands again. The official Japanese visitor page uses the same three steps.',
            'Official Meiji Jingu pages do not set out a longer left-hand, right-hand, handle-rinsing sequence here. Follow the three steps on the official site, and any diagram posted at the basin on the day. Do not swallow the water; rinse and spit beside the basin, not back into it, if a drain is provided.',
          ],
        },
      ],
    },
    {
      id: 'main-shrine',
      index: '05',
      nav: 'Main shrine',
      plate: 'Minami Shinmon and the honden',
      caption: 'Visitors pray at the gehaiden, the front hall of the main shrine, after passing Minami Shinmon.',
      sentences: [
        'Minami Shinmon is the main gate into the shrine complex. Official map text: a two-storey hinoki-cypress gate with a copper roof, built in 1920, and one of the few shrine structures to survive the 1945 air raids. Step over the wooden beam, not on it, and it is considered respectful to bow your head as you pass through.',
        'The honden is the most sacred building. The original halls of 1920 burned in the war; the present buildings were completed in 1958, in nagare-zukuri style, of Japanese cypress mainly from Kiso, with copper roofs instead of the original bark, for fireproofing. Visitors pray at the gehaiden, the outer shrine hall at the front.',
        'Official sampai: you may put coins in the offertory box, then bow twice, clap twice, and bow once. Official etiquette and Q&A: do not take photos or videos in front of the main shrine where people are praying, and refrain from photographing the amulet office.',
        'Official Q&A: goshuin are available at a counter near the main shrine building. The Japanese visitor page names that counter as Nagadono, in front of the Kaguraden, from 09:00 until closing. The amulet office, the Kaguraden, and the goshuin counter do not take credit cards.',
      ],
      chips: [
        { label: 'Bow twice, clap twice, bow once' },
        { label: 'No photos at the prayer line' },
        { label: 'Goshuin from 09:00' },
        { label: 'Etiquette', to: etiquette },
        { label: 'meijijingu.or.jp/en/map/', href: 'https://www.meijijingu.or.jp/en/map/' },
      ],
      checkpoints: [
        {
          id: 'honden-courtyard',
          kind: 'must-see',
          title: 'The main shrine courtyard',
          sentences: [
            'Once through Minami Shinmon you are in the courtyard in front of the gehaiden, where visitors stand to pray. Official map text: the inner sanctum is where the kami are enshrined, and daily rites including onikkusai — offerings of sacred food and prayer — are held there at 08:00 and 14:00. Official pages do not describe those inner rites as a public viewing.',
            'Photography is allowed on the grounds, with two official limits at this stop: no photos or videos in front of the main shrine where people are praying, and no photos of the amulet office. Official etiquette also forbids drones, running, and promotional filming without permission.',
          ],
          lookFor: [
            'The long-roofed gehaiden at the front of the main shrine, where people line up to pray. Do not photograph that prayer line.',
            'Minami Shinmon behind you: a two-storey cypress gate, taller than the single-storey gates on the other sides. Look for small heart-shaped inome patterns in the metal fittings, which official text links to an old fire-warding design.',
            'Meoto Kusu, the pair of camphor trees joined by a shimenawa. Official map text: they were planted as saplings when the shrine was established in 1920, and stand as a symbol of a solid marriage and a healthy family.',
            'The ema rack around a camphor tree. Official map text: ema are sold at the juyosho (amulet office) for ¥500. Official pages do not publish a yen price for a goshuin stamp; confirm the posted fee at the counter, and do not invent one.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Meiji_Jingu_2023-2.jpg/1280px-Meiji_Jingu_2023-2.jpg',
            alt: 'The courtyard of Meiji Jingu, with the main shrine hall and a large camphor tree',
            credit: 'Akonnchiroll / Wikimedia Commons (CC BY-SA 4.0)',
            caption: 'The main shrine courtyard and gehaiden.',
          },
        },
        {
          id: 'honden-sampai',
          kind: 'practice',
          title: 'Sampai, goshuin, and cash-only counters',
          sentences: [
            'Official English sampai steps at the main shrine: you may put some coins into the offertory box; bow twice; clap your hands twice; bow once again. The official Japanese visitor page uses the same form, 二拝二拍手一拝.',
            'For a goshuin, follow the Japanese visitor page to Nagadono (長殿), the offering office in front of the Kaguraden, from 09:00 until closing; the official English map also says vermillion seals are available in the Kaguraden. Entry to the Kaguraden itself is reserved for people taking part in a ceremony. Official Q&A: the amulet office, the Kaguraden, and the goshuin counter do not take credit cards. Reception may move on some days — follow the board.',
          ],
        },
        {
          id: 'honden-rebuild',
          kind: 'story',
          title: 'The halls of 1920 and 1958',
          sentences: [
            'Official map and establishment pages: the main shrine was first completed in 1920, when Meiji Jingu was dedicated to the souls of Emperor Meiji and Empress Shōken. Most of the complex burned in the air raids at the end of the Second World War. The present honden was completed in 1958. Minami Shinmon is one of the wooden structures that survived.',
            'A shrine-only visit, officially, is about one hour. The Inner Garden, next, is optional and ticketed, with shorter hours than the free precinct.',
          ],
        },
      ],
    },
    {
      id: 'inner-garden',
      index: '06',
      nav: 'Inner Garden',
      plate: 'A paid garden with its own hours',
      caption: 'The Inner Garden (Gyoen) is a separate, ticketed part of the precinct — ¥500, with hours shorter than the free shrine grounds.',
      sentences: [
        'The official English garden page: the Inner Garden was once imperial property, and was commissioned by Emperor Meiji in part for Empress Shōken. The maintenance contribution is ¥500. The official Japanese gyoen page states the same fee.',
        'Official Japanese hours, which the English garden page does not list: 09:00–16:30 from March to October; 09:00–16:00 from November to February; in June, 08:00–17:00 on weekdays and 08:00–18:00 on Saturday and Sunday. The garden is open every day of the year. These clocks are not the shrine’s sunrise-to-sunset table.',
        'Official Q&A: the shrine itself is about one hour; with the Inner Garden and the Meiji Jingu Museum, around two hours. The Museum is a separate indoor facility: ¥1,000 for adults and ¥900 for high-school students or younger; 10:00–16:30, last admission 16:00; closed on Thursdays. The Treasure Museum is currently closed.',
      ],
      chips: [
        { label: '¥500' },
        { label: 'Hours differ from the shrine' },
        { label: 'meijijingu.or.jp/midokoro/gyoen/', href: 'https://www.meijijingu.or.jp/midokoro/gyoen/' },
        { label: 'Museum ¥1,000 / ¥900, closed Thu', href: 'https://www.meijijingu.or.jp/en/whattosee/museum/' },
      ],
      checkpoints: [
        {
          id: 'gyoen-entry',
          kind: 'must-see',
          title: 'Entering the garden',
          sentences: [
            'The official precinct map marks the Inner Garden south of the main shrine, with a north gate (御苑北門) on the Japanese map. Pay the ¥500 maintenance contribution and check the hours posted for the day — especially in November–February, when the garden closes at 16:00, and in June, when official Japanese hours start earlier and finish later.',
            'This stop is optional. If you are leaving after the halls, you already have a complete shrine visit as the official Q&A describes it. Do not assume the garden stays open until the shrine gates close.',
          ],
          lookFor: [
            'The garden entrance and the posted ¥500 fee, separate from the free precinct.',
            'Today’s opening and closing times. Official Japanese hours change by season, and again in June.',
            'A path into a stroll garden, not the gravel approach you have already walked. Official Japanese text describes gentle paths and simple buildings on varied ground, rather than a heavily rock-ornamented garden.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Iris_garden_-_in_bloom_-_Meiji_shrine_2026_6_16.jpg/1280px-Iris_garden_-_in_bloom_-_Meiji_shrine_2026_6_16.jpg',
            alt: 'Iris beds in bloom in the Inner Garden of Meiji Jingu',
            credit: 'Nesnad / Wikimedia Commons (CC BY 4.0)',
            caption: 'Iris beds in the Inner Garden, in June.',
          },
        },
        {
          id: 'gyoen-sights',
          kind: 'must-see',
          title: 'Irises, Kiyomasa’s Well, and South Pond',
          sentences: [
            'Official Japanese precinct guide: the iris beds were planted at Emperor Meiji’s direction for Empress Shōken. There are now 150 varieties and 1,500 plants, at their best in early to mid-June. That season is popular; official hours in June start at 08:00.',
            'Kiyomasa’s Well is a noted spring in the garden, traditionally associated with Katō Kiyomasa. Official Japanese gyoen text: an average flow of about 60 litres a minute, and a water temperature of about 15°C through the year. South Pond, named for sitting south of the shrine buildings, is fed by the well; the same stream runs under the Shinkyō (sacred bridge) on Minami-sandō toward the Shibuya River.',
          ],
          lookFor: [
            'The iris fields if you are here in early or mid-June. At other times the beds are still part of the garden; official pages do not claim year-round bloom.',
            'Kiyomasa’s Well, a clear spring often with a small viewing queue. Official text does not turn this into a drinking fountain for visitors — follow the signs on the day.',
            'South Pond and, on the slope above it, Kakuun-tei, built as a rest house for Empress Shōken and rebuilt in 1958 (Shōwa 33) after it burned in the war. Official pages describe it as a teahouse; they do not, on the visitor pages checked for this walk, list a casual drop-in tea ticket.',
          ],
          image: {
            src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/80/Kiyomasas_well_Meiji_shrine_-_2024616.jpg/1280px-Kiyomasas_well_Meiji_shrine_-_2024616.jpg',
            alt: 'Kiyomasa’s Well, the spring in the Inner Garden of Meiji Jingu',
            credit: 'Nesnad / Wikimedia Commons (CC BY 4.0)',
            caption: 'Kiyomasa’s Well, in the Inner Garden.',
          },
        },
        {
          id: 'gyoen-origin',
          kind: 'story',
          title: 'Why this garden sits inside the shrine',
          sentences: [
            'Official Japanese gyoen history: the ground was an Edo-period lower-residence garden of the Katō and Ii families, later imperial land known as Minami-Toshima Imperial Property. Around Meiji 26 (1893) it was arranged as a stroll garden so that Empress Shōken, who was in poor health, could walk there. Official text says the presence of this garden was one reason the shrine was later sited at Yoyogi.',
            'The Meiji Jingu Museum, designed by Kuma Kengo and opened in 2019, is a separate paid visit in the precinct — not included in the garden contribution. Official hours and fees are on the museum page cited above. Official precinct maps mark the older Treasure Museum, in the north of the grounds, as currently closed; official visitor pages do not list a standing admission price for it, and this walk does not invent one.',
          ],
        },
      ],
    },
  ],
}
