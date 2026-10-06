import { CGI, CGI_STILL } from './cgi-media.js'

/**
 * 3D CASE STUDIES
 * ----------------------------------------------------------------
 * Built from the "3D" Drive folder (29 Sep 2026): an industrial explainer,
 * real-estate walkthroughs and floor plans, and product films. Same shape
 * as the UI/UX case studies (see case-studies.js), plus:
 *   · `bucket: '3d'` and a `credit`
 *   · `coverAsset` — the card and panel open on a film that plays on hover
 *   · shots may be films: { kind: 'video', src, poster, w, h, duration, caption }
 *
 * As with UI/UX, every sentence describes what is on screen — the claims
 * and numbers quoted are the ones the films themselves display.
 */

const TEAM = 'empty agency core team'
const clip = (slug, caption) => ({ kind: 'video', ...CGI[slug], caption })
const still = (slug, caption, extra = {}) => ({ ...CGI_STILL[slug], caption, ...extra })

export const CGI_STUDIES = [
  /* ------------------------------------------------------------------ */
  {
    slug: 'all-hub',
    bucket: '3d',
    credit: TEAM,
    title: 'All Hub — ISO tank depot explainer',
    client: 'AMFICO Agencies Pvt. Ltd.',
    role: '3D explainer film for a B2B liquid-logistics hub: ISO tank cleaning, repair and handling.',
    summary:
      'A five-minute 3D film that walks a logistics buyer through All Hub, AMFICO’s ISO tank depot — from the port to cleaning, repair, transfer and repainting — without a site visit.',
    coverAsset: clip('allhub-layout', 'The hub from above'),
    caseStudy: {
      platform: '3D explainer · 5:45 film',
      scope: ['3D facility model', 'industrial animation', 'process storyboard', 'on-screen graphics'],
      brief:
        'ISO tank services are hard to picture and harder to sell over a phone call. The film had to take a logistics manager through the whole facility in the order their tank would travel, so every service is understood before the first meeting.',
      sections: [
        {
          kicker: 'arrival',
          title: 'From the port to the gate',
          body: 'The film opens at the port and follows a tank by road, placing the hub a short drive from the port and listing what AMFICO handles along the way — transportation, tank management and customs clearance.',
          images: [clip('allhub-arrival', 'Port, road and customs')],
        },
        {
          kicker: 'the hub',
          title: 'Five acres on one map',
          body: 'A 3D model of the site introduces every building from above before the tour begins, with each service pinned to where it happens.',
          images: [clip('allhub-layout', 'The facility, service by service')],
        },
        {
          kicker: 'cleaning',
          title: 'Showing the inside of a tank',
          body: 'Cut-away views show the cleaning bay at work — steam, hot water at 80°, a 100-bar rotor jet and water-based chemicals — so the process is clear to someone who has never seen inside a tank.',
          images: [clip('allhub-cleaning', 'Cleaning bay and rotor jet')],
        },
        {
          kicker: 'repair & transfer',
          title: 'Every service in the order it happens',
          body: 'Maintenance and repair covers internal and external refurbishment, major shell repairs and spare parts for the major brands. Tank-to-tank transfer between ISO tanks and flexi bags is shown with the pneumatically operated double-diaphragm (AODD) pump.',
          images: [clip('allhub-repair', 'Maintenance and repair'), clip('allhub-transfer', 'Tank-to-tank transfer')],
        },
        {
          kicker: 'blasting & painting',
          title: 'Back to new',
          body: 'The blasting room strips the shell with aluminium oxide, then the first and final coats are applied under supervision — ending on tanks stacked and ready for dispatch.',
          images: [clip('allhub-painting', 'Blasting, first coat, final coat')],
        },
      ],
      deliverables: ['5:45 explainer film', '3D facility model', 'animated process sequences'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'real-estate-visualisation',
    bucket: '3d',
    credit: TEAM,
    title: 'real estate — walkthroughs & 3D floor plans',
    client: 'Romaa Majestic · residential developers',
    role: 'Interior walkthroughs, a township film and 3D floor plans for property marketing.',
    summary:
      'Visuals that let a buyer walk a home, read a floor plan and understand a plotted township before anything is built — made for developers and their sales teams.',
    coverAsset: clip('walkthrough-2bhk', '2BHK interior walkthrough'),
    caseStudy: {
      platform: '3D walkthrough · floor plans · film',
      scope: ['interior walkthrough', '3D floor plans', 'master-plan animation', 'interior renders'],
      brief:
        'Property is bought on trust long before possession. The visuals had to make an unbuilt home and an empty plot feel real — room by room, and plot by plot.',
      sections: [
        {
          kicker: 'walkthrough',
          title: 'Walk the home before it’s built',
          body: 'A continuous walkthrough of a furnished 2BHK — living room, dining, a child’s bedroom, the master bedroom and bath — with each room labelled as the camera enters it.',
          images: [clip('walkthrough-2bhk', '2BHK interior walkthrough')],
        },
        {
          kicker: 'township',
          title: 'Selling land with a map',
          body: 'For Romaa Majestic, a micro-township of residential plots over 5.41 acres, the film places the site on the map, walks the master plan plot by plot and lists the schools and colleges nearby.',
          images: [clip('romaa-majestic', 'Romaa Majestic — master plan and location')],
        },
        {
          kicker: 'floor plans',
          title: '3D floor plans a buyer can read',
          body: 'Isometric and top views of the same apartment, furnished to scale, and a whole-floor plan — so layouts can be compared at a glance in a brochure or on a site.',
          images: [
            still('realestate-floorplan-tilt-1', 'Isometric floor plan — view 1'),
            still('realestate-floorplan-tilt-2', 'Isometric floor plan — view 2'),
            still('realestate-floorplan-top', 'Top-view floor plan'),
            still('realestate-tower-plan', 'Whole-floor plan'),
          ],
        },
        {
          kicker: 'interiors',
          title: 'Finishes in their best light',
          body: 'Photoreal interior stills show materials and views the way the finished space will feel.',
          images: [still('realestate-bathroom', 'Bathroom interior render', { narrow: true })],
        },
      ],
      deliverables: ['interior walkthrough', 'township film', '3D floor plans', 'interior renders'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'clear-x',
    bucket: '3d',
    credit: TEAM,
    title: 'Clear X — clear case launch film',
    client: 'Clear X',
    role: '3D launch film and vertical reel for a clear MagSafe phone case.',
    summary:
      'A 3D launch film for a clear phone case, made for web and social, that proves each claim on screen: it stays clear, resists scratches and comes in every colour.',
    coverAsset: clip('clearx-film', 'Launch film'),
    caseStudy: {
      platform: '3D product film · 16:9 + 9:16',
      scope: ['3D product model', 'look development', 'animation', 'edit & type'],
      brief:
        'A clear case looks like every other clear case in a photo. The film had to make the differences visible — the coloured frames, the clarity over time, the scratch resistance.',
      sections: [
        {
          kicker: 'the film',
          title: 'One claim per shot',
          body: 'Each scene carries a single line — “designed to be yours”, “designed to stay clear, while others yellow over time”, “resist scratches, and handle whatever comes its way”, “designed to feel as good as it looks” — and shows it happening, on a desk, next to everyday objects, across the colour range.',
          images: [clip('clearx-film', 'Launch film — 16:9')],
        },
        {
          kicker: 'formats',
          title: 'Recomposed for vertical, not cropped',
          body: 'The reel reframes the same scenes for 9:16, so the product stays centred and the type stays readable on a phone.',
          images: [clip('clearx-reel', 'Reel — 9:16')],
        },
      ],
      deliverables: ['1:05 launch film', '9:16 reel'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'eume-cabin-pro',
    bucket: '3d',
    credit: TEAM,
    title: 'EUME Cabin Pro — luggage launch',
    client: 'EUME',
    role: '3D launch film for a cabin suitcase, in landscape and vertical.',
    summary:
      'A bright, fast 3D film for the EUME Cabin Pro that walks through its features one close-up at a time, cut for web and for social.',
    coverAsset: clip('eume-cabin-pro', 'Launch film'),
    caseStudy: {
      platform: '3D product film · 16:9 + 9:16',
      scope: ['3D product model', 'set design', 'animation', 'edit & type'],
      brief:
        'A suitcase is sold on details you can’t see in a catalogue photo. The film had to get close enough to show them, and keep the brand’s yellow unmistakable.',
      sections: [
        {
          kicker: 'the film',
          title: 'Feature by feature',
          body: 'The case arrives through a yellow set and the camera moves in on each feature — anti-theft zippers, the tech compartment with a charging port, and Japanese-imported Hinomoto SilentRun 360° wheels — before closing on the brand.',
          images: [clip('eume-cabin-pro', 'Launch film — 16:9')],
        },
        {
          kicker: 'formats',
          title: 'Made for the feed too',
          body: 'A 9:16 version reframes every shot for stories and reels.',
          images: [clip('eume-cabin-pro-vertical', 'Vertical — 9:16')],
        },
      ],
      deliverables: ['launch film', '9:16 version'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'stuffcool',
    bucket: '3d',
    credit: TEAM,
    title: 'Stuffcool — product film series',
    client: 'Stuffcool',
    role: 'Seven 3D films across a range of chargers, power banks, cables and cases.',
    summary:
      'A series of 3D product films for a mobile-accessories brand — one visual system across chargers, power banks, cables and cases, so the whole range feels like one family.',
    coverAsset: clip('stuffcool-click-duo', 'Click Duo'),
    caseStudy: {
      platform: '3D product films · 7 films',
      scope: ['3D product models', 'lighting & materials', 'animation', 'spec graphics'],
      brief:
        'Accessories compete on specs that all sound alike. Each film had to make one or two specs visible — size, wattage, what it charges — and end on the same brand sign-off.',
      sections: [
        {
          kicker: 'chargers',
          title: 'Size and power, side by side',
          body: 'The Nova 65W film compares the charger with the original MacBook charger and shows it powering laptops; Novus 33 leads with its titanium finish and fast charging for phones and a MacBook Air.',
          images: [clip('stuffcool-nova-65w', 'Nova 65W — vertical'), clip('stuffcool-novus-33', 'Novus 33 Titanium')],
        },
        {
          kicker: 'power banks',
          title: 'Three power banks, three stories',
          body: 'Click Duo shows its magnetic stand and Apple Watch module, the 20,000mAh power bank its built-in 65W cable, and Mega II its Type-C PD output — each placed in the setting it’s made for.',
          images: [
            clip('stuffcool-click-duo', 'Click Duo'),
            clip('stuffcool-powerbank-65w', '20,000mAh 65W power bank'),
            clip('stuffcool-mega-ii', 'Mega II'),
          ],
        },
        {
          kicker: 'cables & cases',
          title: 'Making the small things read',
          body: 'The USB4 cable film calls out 240W power delivery, 40Gbps transfer and its E-marker chip; the case film turns a MagSafe range into a colour story.',
          images: [clip('stuffcool-usb4-cable', 'USB4 cable'), clip('stuffcool-cases', 'MagSafe cases — vertical')],
        },
      ],
      deliverables: ['7 product films', '16:9 + 9:16'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'luca-chronograph',
    bucket: '3d',
    credit: TEAM,
    title: 'LUCA — chronograph product film',
    client: 'LUCA',
    role: 'Macro 3D film for a chronograph watch.',
    summary:
      'A 3D film that gets closer to a watch than a camera could — dial, bezel and strap in macro, ending on the full watch and the logo.',
    coverAsset: clip('luca-chronograph', 'LUCA chronograph'),
    caseStudy: {
      platform: '3D product film',
      scope: ['3D product model', 'look development', 'macro animation'],
      brief:
        'A watch sells on detail. The film had to make the dial, the bezel and the finish of the strap read as clearly as they do in the hand.',
      sections: [
        {
          kicker: 'the film',
          title: 'Close enough to read the dial',
          body: 'The camera moves across the dial, bezel and strap in macro before the full watch lands on the logo.',
          images: [clip('luca-chronograph', 'LUCA chronograph')],
        },
      ],
      deliverables: ['3D product film'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'protectli-vault-pro',
    bucket: '3d',
    credit: TEAM,
    title: 'Protectli — Vault Pro VP2410 film',
    client: 'Protectli',
    role: '3D product film for a network appliance.',
    summary:
      'A 3D film for the Protectli Vault Pro VP2410 that puts the specs on the product itself — every port labelled, every dimension drawn.',
    coverAsset: clip('protectli-vault-pro', 'Protectli Vault Pro VP2410'),
    caseStudy: {
      platform: '3D product film',
      scope: ['3D product model', 'animation', 'spec graphics'],
      brief:
        'Network hardware is bought on its ports and its size. The film had to show both without a spec sheet.',
      sections: [
        {
          kicker: 'the film',
          title: 'Specs you can see',
          body: 'The film labels the ports and draws the dimensions on the box as it turns.',
          images: [clip('protectli-vault-pro', 'Protectli Vault Pro VP2410')],
        },
      ],
      deliverables: ['3D product film'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'cougar-chair',
    bucket: '3d',
    credit: TEAM,
    title: 'Cougar — 2023 series chair film',
    client: 'Cougar',
    role: '3D product film for a gaming chair.',
    summary:
      'A 3D film for Cougar’s 2023 series chair that names each material as the camera passes over it.',
    coverAsset: clip('cougar-chair', 'Cougar 2023 series chair'),
    caseStudy: {
      platform: '3D product film',
      scope: ['3D product model', 'materials', 'animation', 'on-screen type'],
      brief:
        'Every gaming chair looks alike from across the room. The film had to get close enough to show what this one is made of.',
      sections: [
        {
          kicker: 'the film',
          title: 'Materials, named on screen',
          body: 'The camera passes over the chair and calls out its PRIME 2.0 PU leather and cold-cure foam as it goes.',
          images: [clip('cougar-chair', 'Cougar 2023 series chair')],
        },
      ],
      deliverables: ['3D product film'],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'product-spots',
    bucket: '3d',
    credit: TEAM,
    title: 'product spots — wine & payment device',
    client: 'Mswipe · undisclosed client',
    role: 'Short 3D spots for a red wine and a payment device.',
    summary:
      'Two short 3D spots — a slow-motion pour for a red wine, and a Mswipe payment device on a clean set.',
    coverAsset: clip('red-wine', 'Red wine spot'),
    caseStudy: {
      platform: '3D product films',
      scope: ['3D product models', 'look development', 'animation'],
      brief:
        'Short spots have one job: one product, one moment, shown so it sticks.',
      sections: [
        {
          kicker: 'wine',
          title: 'A pour in slow motion',
          body: 'The spot builds a pour in slow motion to the bottle and the line “red wine since 2003”.',
          images: [clip('red-wine', 'Red wine spot')],
        },
        {
          kicker: 'payment device',
          title: 'A clean turn',
          body: 'A Mswipe payment device turns on a clean set.',
          images: [clip('mswipe-pos-stand', 'Mswipe payment device')],
        },
      ],
      deliverables: ['two 3D spots'],
    },
  },
]

/** No 3D folders — each product film is its own project, so each gets its own card. */
export const CGI_FOLDERS = []
