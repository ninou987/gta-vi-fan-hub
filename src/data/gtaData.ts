import { Character, MapPoint, DatabaseItem, TimelineEvent, TrailerFrame, SocialPost } from '../types';

export const charactersData: Character[] = [
  {
    id: 'lucia',
    name: 'Lucia',
    role: 'Protagonist (Co-Lead)',
    actor: 'Speculated (Manni L. Perez)',
    tagline: 'Trust is a luxury in Vice City.',
    description: 'Lucia is the first female protagonist in the HD era of GTA. She represents a street-smart, ambitious criminal navigating the neon underworld of Leonida. Fresh out of prison (as shown in the trailer wearing an orange jumpsuit), she is determined to make a mark alongside her partner, Jason.',
    bio: 'Lucia possesses deep roots in Vice City\'s criminal networks. Her past is a mix of street-level hustling, grand theft auto, and a recent stretch in the Leonida Correctional Facility. She is quick-witted, fiercely loyal, but also cautious, warning Jason about the dangerous spiral of trust.',
    status: 'Active / Parole Watch',
    origin: 'Vice City (Little Haiti / Kelly County)',
    specialAbility: {
      name: 'Crowd Control / Seduction',
      description: 'Slows down time during armed robberies and hostage situations, allowing her to keep civilians intimidated and pinpoint security systems.'
    },
    stats: {
      stamina: 75,
      shooting: 68,
      stealth: 85,
      driving: 78,
      strength: 60
    },
    keyEquip: ['Parole Ankle Monitor', 'Duct Tape', 'Bandana', 'Sawn-Off Shotgun'],
    associates: ['Jason (Partner/Lover)', 'Stefanie (Prison Counselor)', 'Uncle Lu (Fence)'],
    voiceLines: [
      "Trust... partners. It's a big word, Jason.",
      "The only way we're getting through this is by sticking together.",
      "Bad luck, I guess."
    ],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800' // Abstract glowing neon pink/violet art matching Lucia vibe
  },
  {
    id: 'jason',
    name: 'Jason',
    role: 'Protagonist (Co-Lead)',
    actor: 'Speculated (Dylan Pronko)',
    tagline: 'All in. No turning back.',
    description: 'Jason is the male co-lead, a rugged drift-hustler and getaway driver who works hand-in-hand with Lucia. While Lucia brings calculated caution, Jason is more impulsive and street-forged, leading them into high-stakes gas station holdups and liquor store stickups.',
    bio: 'Raised in the dusty rural boundaries of Kelly County and the swampy outer fringes of the Keys, Jason understands the dark, high-risk side of the sunshine state. He is a master behind the wheel of muscle cars and high-speed off-roaders, willing to risk everything for Lucia\'s vision.',
    status: 'Active / Wanted for Questioning',
    origin: 'Kelly County / Leonida Swamps',
    specialAbility: {
      name: 'Eagle-Eye Drive',
      description: 'Enables hyper-focus while driving, highlighting getaway routes, shortcut opportunities, police roadblocks, and boosting vehicle torque.'
    },
    stats: {
      stamina: 80,
      shooting: 78,
      stealth: 60,
      driving: 92,
      strength: 75
    },
    keyEquip: ['Duffle Bag', 'Aviator Sunglasses', '9mm Pistol', 'Lockpick Set'],
    associates: ['Lucia (Partner/Lover)', 'Billy (Chop Shop Owner)', 'Swamp-Dog Dave (Mechanic)'],
    voiceLines: [
      "I'm with you, Lucia. Ride or die.",
      "We do this right, we never have to look back.",
      "Let's make some fast cash!"
    ],
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800' // Dark energetic golden sunset/neon gold art matching Jason
  }
];

export const mapPointsData: MapPoint[] = [
  {
    id: 'vice-beach',
    name: 'Vice Beach',
    category: 'coastal',
    coordinates: { x: 75, y: 45 },
    description: 'The iconic sparkling shoreline of Vice City. Bustling with rollerbladers, high-end oceanfront hotels on Ocean Drive, bodybuilders, and beautiful neon-lit nightlife. Inspired heavily by Miami Beach.',
    realLifeCounterpart: 'Miami Beach / South Beach',
    keySights: ['Ocean View Hotel', 'Beach Promenade', 'Starlet Strip Clubs', 'Sandcastle Contests'],
    speculatedActivities: ['Lowrider Cruising', 'Jet-Ski Racing', 'Beach Volleyball Hustling', 'Club Drug Peddling'],
    screenshotDescription: 'Seen at 0:13 of the trailer, showcasing a massive crowded beach with helicopters flying overhead and hyper-detailed sand graphics.',
    hazardLevel: 'Low'
  },
  {
    id: 'port-gellhorn',
    name: 'Port Gellhorn',
    category: 'urban',
    coordinates: { x: 25, y: 35 },
    description: 'A major industrial and commercial hub located further inland/west in the state of Leonida. This area serves as a contrast to the glamorous beach life, featuring heavy manufacturing, dirty dirt-bike mud circuits, and highway rest stops.',
    realLifeCounterpart: 'Tampa / Fort Myers area',
    keySights: ['Gellhorn Raceways', 'Industrial Shipyards', 'Trailer Parks', 'Waffle House Parody Diner'],
    speculatedActivities: ['Dirt Bike Street Takeovers', 'Cargo Robberies', 'Illegal Street Drifting', 'Meth Lab Heists'],
    screenshotDescription: 'Heavily featured in the 2022 leaks and visible in the trailer at the dirt racing scene and highway drift clips.',
    hazardLevel: 'High'
  },
  {
    id: 'leonida-grasslands',
    name: 'Leonida Swamps & Grasslands',
    category: 'nature',
    coordinates: { x: 45, y: 65 },
    description: 'The vast, dangerous, wild wetlands of the state. Packed with local wildlife including flamingo flocks, snapping turtles, and enormous alligators that frequently wander into urban swimming pools and convenience stores.',
    realLifeCounterpart: 'The Florida Everglades',
    keySights: ['Alligator Farm', 'Airboat Rental Docks', 'Sunken drug planes', 'Hillbilly outpost'],
    speculatedActivities: ['Airboat Hunting', 'Wildlife Smuggling', 'Swamp-Buggy Mud Racing', 'Foraging & Treasure Hunting'],
    screenshotDescription: 'Featured at 0:22 of the trailer with hovercrafts skimming across the water and a massive alligator being pulled from a pool by a professional wrangler.',
    hazardLevel: 'Extreme'
  },
  {
    id: 'the-keys',
    name: 'The Leonida Keys',
    category: 'coastal',
    coordinates: { x: 50, y: 90 },
    description: 'An archipelago of beautiful tropical islands linked by the majestic Overseas Highway. A paradise for drug smuggling, high-stakes fishing, and luxurious island mansions owned by shady international elites.',
    realLifeCounterpart: 'The Florida Keys / Key West',
    keySights: ['Seven-Mile Bridge', 'Key Gellhorn Yacht Marina', 'Sunken Spanish Galleons', 'Margarita Bars'],
    speculatedActivities: ['Yacht Heists', 'Deep-Sea Spearfishing', 'Contraband Sea Runs', 'Sunset Wing-suit Basejumping'],
    screenshotDescription: 'Seen at 0:25 with a sweeping shot of a dual-bridge causeway over turquoise ocean and speedboats sailing below.',
    hazardLevel: 'Medium'
  },
  {
    id: 'vice-downtown',
    name: 'Downtown Vice City',
    category: 'urban',
    coordinates: { x: 65, y: 35 },
    description: 'The sparkling commercial core. Massive banking skyscrapers, neon digital billboards, corporate espionage, high-end modern penthouses, and underground luxury car meets. This is where the extreme wealth resides.',
    realLifeCounterpart: 'Brickell / Downtown Miami',
    keySights: ['Maze Bank Tower Vice', 'Vantage Rooftop Bars', 'Leonida Art Museum', 'High-end Luxury Dealerships'],
    speculatedActivities: ['Stock Market Espionage', 'High-Rise Basejumping', 'Luxury Supercar Stealing', 'VIP Escort Missions'],
    screenshotDescription: 'Shown in multiple night-skyline shots showing towering skyscrapers and highways flowing with high-density realistic traffic.',
    hazardLevel: 'Medium'
  },
  {
    id: 'kelly-county',
    name: 'Kelly County',
    category: 'suburban',
    coordinates: { x: 35, y: 50 },
    description: 'Suburban sprawl mixed with country roads. Home to the legendary "Thrashers Mud Club", agricultural fields, trailer parks, and big-box store parking lot street meets. A wild environment where the eccentric residents of Leonida go full speed.',
    realLifeCounterpart: 'Hendry County / Polk County',
    keySights: ['Thrashers Mud Arena', 'Kelly Gas Station (Target of robberies)', 'Mega-Mart Superstore', 'Local Gun Shop'],
    speculatedActivities: ['Mud-pit Demolition Derbies', 'Store Holdups', 'ATV Trail Racing', 'Wildlife Poaching'],
    screenshotDescription: 'Seen at 0:38 in the trailer with the mud-covered crowd cheering and a giant truck doing donuts in thick brown sludge.',
    hazardLevel: 'High'
  }
];

export const databaseItemsData: DatabaseItem[] = [
  // VEHICLES
  {
    id: 'v1',
    name: 'Grotti Cheetah Classic',
    type: 'vehicle',
    category: 'Sports Classic',
    status: 'Confirmed',
    description: 'The definitive luxury sports icon of Vice City. With its sleek lines, wedge-shaped front, and screaming V12 engine, it screams 1980s retro-wave perfection updated for the modern era.',
    realLifeInspiration: 'Ferrari Testarossa',
    specs: {
      stat1Name: 'Top Speed',
      stat1Value: 90,
      stat2Name: 'Handling',
      stat2Value: 85,
      stat3Name: 'Acceleration',
      stat3Value: 88
    },
    trailerSceneTime: '0:14'
  },
  {
    id: 'v2',
    name: 'Pegassi Bati 801',
    type: 'vehicle',
    category: 'Motorcycle',
    status: 'Confirmed',
    description: 'A nimble, high-revving Italian sports bike designed to slice through Vice Beach traffic like a scalpel. Great for quick escapes and stunt jumps over bridge draws.',
    realLifeInspiration: 'Ducati 1098',
    specs: {
      stat1Name: 'Top Speed',
      stat1Value: 85,
      stat2Name: 'Handling',
      stat2Value: 90,
      stat3Name: 'Acceleration',
      stat3Value: 95
    },
    trailerSceneTime: '0:34'
  },
  {
    id: 'v3',
    name: 'Vapid Sandking XL',
    type: 'vehicle',
    category: 'Off-Road',
    status: 'Confirmed',
    description: 'A towering, four-door monster truck designed to tame the deep swamps of Leonida and crush smaller sports cars during highway pile-ups. Includes custom snorkel kits.',
    realLifeInspiration: 'Ford F-250 Super Duty Custom',
    specs: {
      stat1Name: 'Top Speed',
      stat1Value: 60,
      stat2Name: 'Handling',
      stat2Value: 55,
      stat3Name: 'Acceleration',
      stat3Value: 65
    },
    trailerSceneTime: '0:38'
  },
  {
    id: 'v4',
    name: 'Pfister Comet S2',
    type: 'vehicle',
    category: 'Sports',
    status: 'Confirmed',
    description: 'A precision-engineered rear-engine German track beast. Low stance, wider fenders, and incredible cornering speeds. Favored by Downtown\'s stockbrokers and getaway drivers who value surgical turns.',
    realLifeInspiration: 'Porsche 911 (992) Cabriolet',
    specs: {
      stat1Name: 'Top Speed',
      stat1Value: 92,
      stat2Name: 'Handling',
      stat2Value: 88,
      stat3Name: 'Acceleration',
      stat3Value: 91
    },
    trailerSceneTime: '1:02'
  },
  {
    id: 'v5',
    name: 'Declasse Tulip Custom',
    type: 'vehicle',
    category: 'Muscle',
    status: 'Confirmed',
    description: 'A modified vintage muscle sedan riding on enormous chrome rims (Donk style), highly popular in the suburban communities of South Vice City. Floats like a boat, roars like a lion.',
    realLifeInspiration: '1972 Chevrolet Chevelle (Donk Custom)',
    specs: {
      stat1Name: 'Top Speed',
      stat1Value: 72,
      stat2Name: 'Handling',
      stat2Value: 50,
      stat3Name: 'Acceleration',
      stat3Value: 80
    },
    trailerSceneTime: '0:35'
  },

  // WEAPONS
  {
    id: 'w1',
    name: 'Combat Pistol',
    type: 'weapon',
    category: 'Pistol',
    status: 'Confirmed',
    description: 'A lightweight polymer semi-automatic handgun. Highly reliable, moderate recoil, and customizable with extended magazines, flashlights, and suppressors.',
    realLifeInspiration: 'Glock 19 Gen 5',
    specs: {
      stat1Name: 'Damage',
      stat1Value: 40,
      stat2Name: 'Accuracy',
      stat2Value: 75,
      stat3Name: 'Fire Rate',
      stat3Value: 60
    },
    trailerSceneTime: '1:12'
  },
  {
    id: 'w2',
    name: 'Carbine Rifle',
    type: 'weapon',
    category: 'Assault Rifle',
    status: 'Confirmed',
    description: 'The staple assault rifle of both the Vice City Police Department (VCPD) and elite heist squads. Features excellent balance, controllable automatic spray, and immense versatility.',
    realLifeInspiration: 'Colt M4A1',
    specs: {
      stat1Name: 'Damage',
      stat1Value: 65,
      stat2Name: 'Accuracy',
      stat2Value: 82,
      stat3Name: 'Fire Rate',
      stat3Value: 75
    },
    trailerSceneTime: '1:14'
  },
  {
    id: 'w3',
    name: 'Micro SMG',
    type: 'weapon',
    category: 'Submachine Gun',
    status: 'Confirmed',
    description: 'A compact, hyper-fast automatic machine pistol. Incredibly lethal in close quarters, but has high muzzle climb. Can be fired comfortably while hanging out of getaway passenger windows.',
    realLifeInspiration: 'IMI Uzi / Micro Uzi',
    specs: {
      stat1Name: 'Damage',
      stat1Value: 35,
      stat2Name: 'Accuracy',
      stat2Value: 45,
      stat3Name: 'Fire Rate',
      stat3Value: 95
    },
    trailerSceneTime: '1:10'
  },
  {
    id: 'w4',
    name: 'Pump Shotgun',
    type: 'weapon',
    category: 'Shotgun',
    status: 'Confirmed',
    description: 'A classic pump-action shotgun. Perfect for blowing off doors, clearing rooms, or fending off stray swamp crocodiles. High scatter, extreme close-up impact.',
    realLifeInspiration: 'Remington 870',
    specs: {
      stat1Name: 'Damage',
      stat1Value: 85,
      stat2Name: 'Accuracy',
      stat2Value: 30,
      stat3Name: 'Fire Rate',
      stat3Value: 20
    },
    trailerSceneTime: '0:58'
  }
];

export const timelineEventsData: TimelineEvent[] = [
  {
    id: 't1',
    date: 'Sep 18, 2022',
    title: 'The Great Leak of 2022',
    category: 'leak',
    summary: 'The biggest leak in gaming history reveals early GTA VI builds.',
    details: 'An anonymous hacker leaks over 90 videos showing raw alpha footage of the game, confirming the Vice City setting, two protagonists named Lucia and Jason, and showing revolutionary physics, dialogue engines, and world density.',
    trustBadge: 'trusted',
    trustScore: 98,
    sources: ['Take-Two IR Security Report', 'Official Rockstar Games PR Statement', 'Bloomberg News Desk'],
    lastVerified: 'Sep 19, 2022',
    tags: ['leak', 'hack', 'pre-alpha', 'lucia', 'jason'],
    readingTime: 3,
    views: 24050,
    isMilestone: true,
    aiSummary: 'Unprecedented breach confirmed via Take-Two Interactive copyright strikes and secondary journalistic corroboration. Authentic code structures detected.',
    confidenceLevel: 'high',
    verificationStatus: 'verified',
    aiReasoning: 'Initial scoring was highly suspicious due to the sheer size of the raw footage. However, immediate DMCA takedown actions initiated by Take-Two legal counsels, paired with Jason Schreier\'s independent validation from interior developer circles, confirmed the material\'s authenticity with near-absolute precision.',
    scoreTimeline: [
      { date: 'Sep 18, 2022 09:00', score: 35, event: 'Anonymous posts 90GB of material on GTAForums' },
      { date: 'Sep 18, 2022 14:00', score: 70, event: 'Reputable journalists confirm matching build assets' },
      { date: 'Sep 19, 2022 10:00', score: 98, event: 'Take-Two issues official SEC report confirming cyber incident' }
    ]
  },
  {
    id: 't2',
    date: 'Nov 8, 2023',
    title: 'Rockstar Announces Trailer Release',
    category: 'official',
    summary: 'Sam Houser confirms first official look is coming in December.',
    details: 'In a brief social post on Rockstar\'s 25th Anniversary, founder Sam Houser thanks fans worldwide and confirms the very first trailer for the next Grand Theft Auto will debut in early December.',
    trustBadge: 'official',
    trustScore: 100,
    sources: ['Official Rockstar Games Twitter / X Feed', 'Rockstar Games Newswire Portal'],
    lastVerified: 'Nov 8, 2023',
    tags: ['announcement', 'trailer-1', 'newswire', 'official'],
    readingTime: 1,
    views: 18200,
    isMilestone: true,
    aiSummary: 'Verified primary source release. Disseminated across all formal developer feeds concurrently with digital cryptographic sign-offs.',
    confidenceLevel: 'absolute',
    verificationStatus: 'verified',
    aiReasoning: 'Primary post sourced directly from verified @RockstarGames handles. Cryptographic checking of the domain signatures and simultaneous updates across global media partners validates this update at the highest index tier of 100%.',
    scoreTimeline: [
      { date: 'Nov 8, 2023 08:00', score: 100, event: 'Direct publication across all corporate networks' }
    ]
  },
  {
    id: 't3',
    date: 'Dec 4, 2023',
    title: 'Trailer 1 Debuts Worldwide',
    category: 'official',
    summary: 'The historic first look breaks YouTube records in hours.',
    details: 'Due to an early leak on social media, Rockstar releases the gorgeous 90-second Trailer 1 ahead of schedule. Set to Tom Petty\'s "Love Is a Long Road", it confirms the name "Grand Theft Auto VI", the state of "Leonida", Lucia as protagonist, and a "Coming 2025" release year.',
    trustBadge: 'official',
    trustScore: 100,
    sources: ['Rockstar Games YouTube Official Channel', 'Take-Two Press Distribution'],
    lastVerified: 'Dec 4, 2023',
    tags: ['trailer-1', 'youtube', 'record-breaking', 'tom-petty', 'official'],
    readingTime: 2,
    views: 45000,
    isMilestone: true,
    aiSummary: 'Direct media release. Verified against Take-Two Interactive official streaming keys and high-definition video files.',
    confidenceLevel: 'absolute',
    verificationStatus: 'verified',
    aiReasoning: 'An initial leak on a burner Twitter account forced Rockstar to release the trailer 15 hours early on YouTube. The video matched early metadata frames exactly and was corroborated by official Take-Two press wires within minutes.',
    scoreTimeline: [
      { date: 'Dec 4, 2023 16:30', score: 40, event: 'Low-quality trailer leak on burner Twitter handle' },
      { date: 'Dec 4, 2023 17:10', score: 100, event: 'Official HD upload to Rockstar Games YouTube channel' }
    ]
  },
  {
    id: 't4',
    date: 'May 16, 2024',
    title: 'Take-Two Narrows Release Window',
    category: 'official',
    summary: 'Parent company Take-Two confirms Fall 2025 release target.',
    details: 'During its Q4 earnings call, Take-Two Interactive narrows down the launch window of Grand Theft Auto VI from "Calendar 2025" to "Fall 2025", sending shares up and exciting the gaming community.',
    trustBadge: 'official',
    trustScore: 100,
    sources: ['Take-Two FY2024 Earnings Call Transcript', 'SEC Filing Form 10-K Document'],
    lastVerified: 'May 16, 2024',
    tags: ['earnings-call', 'release-date', 'sec-filing', 'financial', 'official'],
    readingTime: 2,
    views: 15300,
    isMilestone: true,
    aiSummary: 'Legally binding corporate document. Verified through SEC filing system protocols and investor relations briefings.',
    confidenceLevel: 'absolute',
    verificationStatus: 'verified',
    aiReasoning: 'Official shareholder presentation and standard 10-K filings are strictly audited financial materials with legal liabilities for false statements. This solidifies the "Fall 2025" target as a primary verified directive.',
    scoreTimeline: [
      { date: 'May 16, 2024 16:00', score: 100, event: ' Take-Two IR releases FY24 earnings statement' }
    ]
  },
  {
    id: 't5',
    date: 'Current Target',
    title: 'Fall 2025 / Early 2026 Expectation',
    category: 'speculation',
    summary: 'Marketing campaign escalation anticipated mid-to-late 2025.',
    details: 'Analysts speculate Rockstar will release Trailer 2, official gameplay screenshots, and details on pre-orders in the coming months, keeping the title fully on track for its fiscal windows.',
    trustBadge: 'likely',
    trustScore: 85,
    sources: ['Take-Two Interactive FY2026 Strategic Guidance', 'Reuters Games Desk Analysis', 'Newzoo Market Researchers'],
    lastVerified: 'July 2, 2026',
    tags: ['release-date', 'speculation', 'trailer-2', 'pre-order'],
    readingTime: 3,
    views: 31200,
    isMilestone: false,
    aiSummary: 'Strong industry indicators backed by historic publisher marketing cadences and financial projection charts.',
    confidenceLevel: 'high',
    verificationStatus: 'unconfirmed',
    aiReasoning: 'Rockstar historically releases secondary trailers roughly 10 to 14 months before physical store release. Cross-referencing investor guidance targets for marketing capital expenditure in FY26 indicates a massive PR rollout is highly likely in this timeframe.',
    scoreTimeline: [
      { date: 'Mar 10, 2025', score: 60, event: 'Early budget speculations on investor forums' },
      { date: 'July 2, 2026', score: 85, event: 'Consolidated analyst forecasts from Take-Two strategic briefings' }
    ]
  },
  {
    id: 't6',
    date: 'Apr 12, 2025',
    title: 'Speculated Dual-Map Concept & Project Americas',
    category: 'speculation',
    summary: 'Rumors claim GTA VI will dynamically expand with downloadable Caribbean islands post-launch.',
    details: 'Popular community theories and insider claims suggest Rockstar plans to implement the "Project Americas" vision incrementally, offering access to parts of Cuba or parody Colombian islands via major seasonal map expansions.',
    trustBadge: 'rumor',
    trustScore: 45,
    sources: ['Reddit r/GTA6 Speculation Repository', 'Speculative Youtube Fan Breakdown Channels'],
    lastVerified: 'Apr 15, 2025',
    tags: ['map', 'project-americas', 'expansion', 'speculation'],
    readingTime: 4,
    views: 19800,
    isMilestone: false,
    aiSummary: 'Moderate community talk with limited technical corroboration. Relies primarily on old 2018 pre-production rumors.',
    confidenceLevel: 'low',
    verificationStatus: 'unconfirmed',
    aiReasoning: 'While early pre-production plans codenamed "Project Americas" did incorporate multi-state travel, recent developer leaks indicate the scope was consolidated to Leonida (Florida) at launch. Post-launch expansions remain highly speculative without system file backings.',
    scoreTimeline: [
      { date: 'Oct 12, 2018', score: 75, event: 'Original Project Americas code design leak rumors' },
      { date: 'Jul 20, 2022', score: 50, event: 'Bloomberg report suggests consolidated launch scope' },
      { date: 'Apr 12, 2025', score: 45, event: 'Revived rumors on TikTok and speculative subreddits' }
    ]
  },
  {
    id: 't7',
    date: 'Jan 24, 2026',
    title: 'Debunked $150 Pre-Order Deluxe Listing',
    category: 'speculation',
    summary: 'A viral video claiming retail chain Target listed the base game price at $150 goes viral.',
    details: 'A TikTok video showing a mock-up pre-order tag with a $150 price tag circulated widely, causing temporary panic. Verification specialists tracked the image back to a Photoshop design template posted on a GTA Fan Discord.',
    trustBadge: 'fake',
    trustScore: 5,
    sources: ['FactCheck Gaming News Agency', 'Target Corporate PR Statement'],
    lastVerified: 'Jan 26, 2026',
    tags: ['debunked', 'fake-news', 'pre-order', 'target'],
    readingTime: 2,
    views: 42300,
    isMilestone: false,
    aiSummary: 'Confirmed digital manipulation. Debunked via retail API scraping and target store visual matching systems.',
    confidenceLevel: 'absolute',
    verificationStatus: 'refuted',
    aiReasoning: 'Image forensics on the viral TikTok frame showed duplicate noise patterns around the barcode, matching a template created by user "GTA_Mockup_Creator" on Discord. Target corporate confirms no such entry exists in their inventory databases.',
    scoreTimeline: [
      { date: 'Jan 24, 2026 12:00', score: 80, event: 'Viral TikTok claims Target physical tag leak' },
      { date: 'Jan 24, 2026 18:00', score: 40, event: 'API checkers confirm no SKU matches in retail systems' },
      { date: 'Jan 26, 2026 09:00', score: 5, event: 'Target corporate PR issues denial; template source located' }
    ]
  }
];

export const trailerFramesData: TrailerFrame[] = [
  {
    id: 1,
    timestamp: '0:03',
    seconds: 3,
    title: 'Lucia in Prison',
    description: 'The trailer opens with Lucia in an orange jumpsuit talking to her counselor Stefanie. This establishes the beginning or end of her story, hinting at high-impact narrative stakes.',
    easterEggs: ['The prison is called Leonida Correctional Facility.', 'Lucia is wearing a standard wrist monitor.', 'The counselor asks "Do you know why you\'re here?" to which Lucia responds "Bad luck, I guess".'],
    impactRating: 10,
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 2,
    timestamp: '0:13',
    seconds: 13,
    title: 'Sweeping Vice Beach',
    description: 'A spectacular bird\'s-eye view of Vice Beach showcasing breathtaking water shaders, dynamic volumetric clouds, and highly-detailed human behavior (rolling, sunbathing, running).',
    easterEggs: ['A police helicopter is cruising low.', 'A dog is running down the beach with its owner.', 'Extreme crowds demonstrate a new NPC density engine.'],
    impactRating: 9,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 3,
    timestamp: '0:22',
    seconds: 22,
    title: 'Wild Swamp Life',
    description: 'A look at the state\'s diverse Everglades parody. Hovercrafts skim through swamp paths populated by wild flamingos, crocodiles, and cypress trees dripping in Spanish moss.',
    easterEggs: ['An airboat belongs to the "Leonida Depot".', 'Flamingo flock physics react to the airboat\'s noise.', 'Reflective swamp mud shows real-time ray-traced water.'],
    impactRating: 8,
    imageUrl: 'https://images.unsplash.com/photo-1504370805625-d32c54b16100?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 4,
    timestamp: '0:45',
    seconds: 45,
    title: 'Social Media Feed parody',
    description: 'A rapid-fire series of vertical TikTok/Instagram style short videos, representing the viral nature of Florida/Leonida culture in the modern era.',
    easterEggs: ['"Planet Leonida" account handles like @Choke_D_Chicken.', 'A woman twerking on top of a moving sedan on the highway.', 'A man pulling a giant alligator out of a local swimming pool.'],
    impactRating: 9,
    imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 5,
    timestamp: '1:08',
    seconds: 68,
    title: 'Jason and Lucia Car Drift',
    description: 'Jason is driving a classic muscle car at high speed while Lucia leans out of the window, smiling as wind blows through her hair. Displays the intimate couple dynamic.',
    easterEggs: ['The car dashboard has realistic dial mechanics.', 'They are driving past the "Port Gellhorn" freeway exit.', 'A package of cash and a bandanna rest on the back seat.'],
    impactRating: 10,
    imageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 6,
    timestamp: '1:12',
    seconds: 72,
    title: 'Diner Holdup',
    description: 'The final, climactic scene. Jason and Lucia kick open the glass door of a local convenience store, pistols raised, bandana masks on. This cements their criminal partnership.',
    easterEggs: ['The store is called "Uncle Jacks Liquor".', 'They coordinate their breach with eye contact.', 'The final frame cuts as they declare their trust.'],
    impactRating: 10,
    imageUrl: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=600'
  }
];

export const socialFeedData: SocialPost[] = [
  {
    id: 's1',
    username: 'Only In Leonida',
    handle: '@OnlyInLeonida',
    avatarSeed: 'leonida',
    content: '🚨 BREAKING: Neighbors report a giant 12-foot alligator taking a midnight dip in a Kelly County suburban swimming pool! Wrangler is on the way but currently stuck at a Waffle House eating bacon. #OnlyInLeonida #LeonidaMan',
    likes: '142K',
    comments: '4.8K',
    isLive: false,
    timestamp: '2 hours ago'
  },
  {
    id: 's2',
    username: 'Vice Beach Live 🌴',
    handle: '@ViceBeachLive',
    avatarSeed: 'beach',
    content: 'LIVE from Vice Beach! Weather is absolutely flawless. 88°F, neon sunset peaking early, and lowriders are already lining up on Ocean Drive. Tonight is about to go crazy! 🕶️🔥 #ViceBeach #NeonSunset',
    likes: '95K',
    comments: '2.1K',
    isLive: true,
    timestamp: 'STREAMING NOW'
  },
  {
    id: 's3',
    username: 'Leonida Highway Patrol',
    handle: '@LHP_Official',
    avatarSeed: 'police',
    content: '⚠️ CITIZEN WARNING: A localized "street takeover" is currently occurring on Port Gellhorn I-97 freeway. Suspects in custom Pfister Comet S2 and Tulip lowriders are doing high-speed drifts. Avoid the area. Units dispatched.',
    likes: '12K',
    comments: '3.5K',
    isLive: false,
    timestamp: '4 hours ago'
  },
  {
    id: 's4',
    username: 'Thrashers Mud Arena',
    handle: '@ThrashersMud',
    avatarSeed: 'muddy',
    content: 'If you aren\'t covered head-to-toe in kelly swamp mud right now, you are officially doing Sunday wrong! Heavy trucks doing massive donuts in the main pit. Beer is cold, engines are loud! 🛻💨 #KellyCounty #MudDerby',
    likes: '68K',
    comments: '912',
    isLive: false,
    timestamp: '5 hours ago'
  }
];
