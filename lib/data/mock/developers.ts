import type { Developer } from "../types";

/**
 * Dubai master-developer guides. EQT transacts across every developer, primary
 * (off-plan) and resale, so these pages capture developer-led search intent
 * ("Emaar properties", "Nakheel villas") and route it into an enquiry. Copy is
 * genuine, indexable prose + FAQ blocks; logos live in /public/brand/developers.
 */
export const mockDevelopers: Developer[] = [
  {
    slug: "emaar",
    name: "Emaar Properties",
    tagline: "The developer behind Downtown Dubai",
    logo: "/brand/developers/Emaar-Properties-Logo-1.png",
    intro:
      "Emaar Properties is Dubai's largest and most established master developer, responsible for landmark destinations including Downtown Dubai, the Burj Khalifa, Dubai Marina, Dubai Hills Estate, Emaar Beachfront and Dubai Creek Harbour. Its developments are known for quality construction, reliable handovers and strong resale liquidity, which makes Emaar stock a default choice for both end-users and investors.",
    keyFacts: [
      { label: "Founded", value: "1997" },
      { label: "Signature", value: "Burj Khalifa, Downtown Dubai" },
      { label: "Segments", value: "Apartments, villas, branded residences" },
      { label: "Best for", value: "Blue-chip primary & resale assets" },
    ],
    signature: [
      "Downtown Dubai & Burj Khalifa",
      "Dubai Hills Estate",
      "Emaar Beachfront",
      "Dubai Creek Harbour",
      "Arabian Ranches",
    ],
    relatedAreas: [
      "downtown-dubai",
      "dubai-hills-estate",
      "emaar-beachfront",
      "dubai-creek-harbour",
      "arabian-ranches",
      "dubai-marina",
    ],
    faqs: [
      {
        question: "Is Emaar a good developer to buy from in Dubai?",
        answer:
          "Emaar is Dubai's largest and most established developer, with a strong record of on-time handovers, build quality and resale liquidity. Its communities such as Downtown, Dubai Hills and Emaar Beachfront are among the most sought-after in the city.",
      },
      {
        question: "What are Emaar's most famous developments?",
        answer:
          "Emaar built the Burj Khalifa and Downtown Dubai, and developed Dubai Marina, Arabian Ranches, Dubai Hills Estate, Emaar Beachfront and Dubai Creek Harbour, among many others.",
      },
    ],
    keywords: [
      "Emaar properties for sale",
      "Emaar off-plan Dubai",
      "Emaar Beachfront apartments",
      "Dubai Hills Emaar villa",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1920&q=80",
      alt: "Downtown Dubai skyline developed by Emaar at night",
      tone: "#151721",
    },
  },
  {
    slug: "nakheel",
    name: "Nakheel",
    tagline: "The creator of Palm Jumeirah",
    logo: "/brand/developers/nakheel-1.webp",
    intro:
      "Nakheel is the master developer behind Dubai's most iconic waterfront landmarks, including Palm Jumeirah, Palm Jebel Ali, The World Islands, Jumeirah Islands and Jumeirah Park. Its projects have defined Dubai's coastline and continue to command premium values thanks to their scarcity and landmark status.",
    keyFacts: [
      { label: "Signature", value: "Palm Jumeirah" },
      { label: "Segments", value: "Beachfront villas, apartments, plots" },
      { label: "Now developing", value: "Palm Jebel Ali, Dubai Islands" },
      { label: "Best for", value: "Waterfront & landmark assets" },
    ],
    signature: [
      "Palm Jumeirah",
      "Palm Jebel Ali",
      "The World Islands",
      "Jumeirah Islands",
      "Jumeirah Park",
    ],
    relatedAreas: ["palm-jumeirah", "palm-jebel-ali", "jumeirah-islands", "jumeirah-park"],
    faqs: [
      {
        question: "Which developer built Palm Jumeirah?",
        answer:
          "Palm Jumeirah was developed by Nakheel, Dubai's master developer of waterfront destinations. Nakheel is now delivering the larger Palm Jebel Ali as well.",
      },
      {
        question: "Can I buy off-plan from Nakheel on Palm Jebel Ali?",
        answer:
          "Yes. Nakheel is releasing beachfront villas and mansions on Palm Jebel Ali in phases, available to international buyers on a freehold basis. EQT can advise on availability and allocations.",
      },
    ],
    keywords: [
      "Nakheel properties for sale",
      "Palm Jebel Ali Nakheel",
      "Nakheel villas Dubai",
      "Palm Jumeirah Nakheel",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80",
      alt: "Aerial view of a palm-shaped island developed by Nakheel",
      tone: "#12212b",
    },
  },
  {
    slug: "sobha-realty",
    name: "Sobha Realty",
    tagline: "Backward-integrated, detail-obsessed builders",
    logo: "/brand/developers/sobha-realty-logo.webp",
    intro:
      "Sobha Realty is a premium developer known for its backward-integrated model, controlling design and construction in-house to deliver exceptional finish quality. Its flagship master community, Sobha Hartland in MBR City, and the newer Sobha Hartland II have made it a favourite for buyers who prioritise build quality and waterfront living.",
    keyFacts: [
      { label: "Signature", value: "Sobha Hartland, MBR City" },
      { label: "Known for", value: "In-house build & finish quality" },
      { label: "Segments", value: "Apartments, villas, waterfront homes" },
      { label: "Best for", value: "Quality-focused buyers & investors" },
    ],
    signature: [
      "Sobha Hartland",
      "Sobha Hartland II",
      "Sobha One",
      "Sobha SeaHaven",
    ],
    relatedAreas: ["district-one"],
    faqs: [
      {
        question: "Why is Sobha Realty considered high quality?",
        answer:
          "Sobha Realty uses a backward-integrated model, handling architecture, engineering and construction in-house, which gives it tight control over finish quality. This reputation for detail is a key reason buyers pay a premium for Sobha homes.",
      },
    ],
    keywords: [
      "Sobha Realty properties for sale",
      "Sobha Hartland apartment",
      "Sobha off-plan Dubai",
      "Sobha SeaHaven",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1920&q=80",
      alt: "Refined contemporary apartment interior with waterfront view",
      tone: "#d9d6cf",
    },
  },
  {
    slug: "damac",
    name: "DAMAC Properties",
    tagline: "Branded, amenity-rich master communities",
    logo: "/brand/developers/Damac_logo.svg.webp",
    intro:
      "DAMAC Properties is one of Dubai's largest private developers, known for branded residences in partnership with names such as Cavalli and de GRISOGONO, and for large master communities including DAMAC Hills and DAMAC Lagoons. Its projects combine accessible entry prices with resort-style amenities, appealing strongly to investors.",
    keyFacts: [
      { label: "Signature", value: "DAMAC Hills, DAMAC Lagoons" },
      { label: "Known for", value: "Branded residences & amenities" },
      { label: "Segments", value: "Apartments, villas, townhouses" },
      { label: "Best for", value: "Amenity-led value & investment" },
    ],
    signature: [
      "DAMAC Hills",
      "DAMAC Lagoons",
      "Cavalli Tower",
      "DAMAC Islands",
    ],
    relatedAreas: ["damac-hills"],
    faqs: [
      {
        question: "What is DAMAC known for in Dubai?",
        answer:
          "DAMAC is known for branded residences with partners such as Cavalli, and for large amenity-rich master communities like DAMAC Hills and DAMAC Lagoons, offering accessible prices with resort-style facilities.",
      },
    ],
    keywords: [
      "DAMAC properties for sale",
      "DAMAC Hills villa",
      "DAMAC Lagoons townhouse",
      "DAMAC off-plan Dubai",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=80",
      alt: "Modern villa in a landscaped DAMAC master community",
      tone: "#d8d4cc",
    },
  },
  {
    slug: "meraas",
    name: "Meraas",
    tagline: "Lifestyle-led urban destinations",
    logo: "/brand/developers/Meraas-logo.svg.webp",
    intro:
      "Meraas is a Dubai developer behind some of the city's most design-led lifestyle destinations, including City Walk, Bluewaters Island, La Mer, Port de La Mer and Jumeirah Bay Island. Its projects are known for architectural character, walkability and prime beachfront and urban locations.",
    keyFacts: [
      { label: "Signature", value: "City Walk, Bluewaters Island" },
      { label: "Known for", value: "Design-led lifestyle destinations" },
      { label: "Segments", value: "Apartments, penthouses, mansions" },
      { label: "Best for", value: "Lifestyle & beachfront living" },
    ],
    signature: [
      "City Walk",
      "Bluewaters Island",
      "Port de La Mer",
      "Jumeirah Bay Island",
    ],
    relatedAreas: ["city-walk", "bluewaters-island", "port-de-la-mer", "jumeirah-bay-island"],
    faqs: [
      {
        question: "What developments has Meraas built in Dubai?",
        answer:
          "Meraas developed City Walk, Bluewaters Island (home to Ain Dubai), La Mer, Port de La Mer and the ultra-prime Jumeirah Bay Island, all known for their design and prime locations.",
      },
    ],
    keywords: [
      "Meraas properties for sale",
      "City Walk Meraas apartment",
      "Bluewaters Island Meraas",
      "Meraas off-plan Dubai",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
      alt: "Contemporary lifestyle apartment interior in a Meraas district",
      tone: "#ddd9d1",
    },
  },
  {
    slug: "omniyat",
    name: "OMNIYAT",
    tagline: "Ultra-luxury, art-led architecture",
    logo: "/brand/developers/omniyat-logo.webp",
    intro:
      "OMNIYAT is a boutique developer of ultra-luxury, architecturally significant projects, including The Lana and One at Palm Jumeirah, home to some of the highest per-square-foot values in Dubai. Working with world-class architects and hospitality brands such as Dorchester Collection, OMNIYAT sits firmly at the top of the market.",
    keyFacts: [
      { label: "Signature", value: "One at Palm Jumeirah, The Lana" },
      { label: "Known for", value: "Art-led, ultra-prime residences" },
      { label: "Partners", value: "Dorchester Collection" },
      { label: "Best for", value: "Trophy branded residences" },
    ],
    signature: [
      "One at Palm Jumeirah",
      "The Lana Residences",
      "AVA at Palm Jumeirah",
      "Vela",
    ],
    relatedAreas: ["palm-jumeirah", "business-bay"],
    faqs: [
      {
        question: "What is OMNIYAT known for?",
        answer:
          "OMNIYAT is a boutique ultra-luxury developer behind landmark residences such as One at Palm Jumeirah and The Lana, working with leading architects and hospitality brands like the Dorchester Collection, and commands some of Dubai's highest prices per square foot.",
      },
    ],
    keywords: [
      "OMNIYAT properties for sale",
      "One at Palm Jumeirah",
      "The Lana Residences Dubai",
      "ultra-luxury Dubai developer",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1546412414-e1885259563a?w=1920&q=80",
      alt: "Ultra-luxury waterfront residence facing the sea",
      tone: "#cdd6d6",
    },
  },
  {
    slug: "ellington",
    name: "Ellington Properties",
    tagline: "Design-first boutique residences",
    logo: "/brand/developers/Ellington-properties-Logo-1024x408.webp",
    intro:
      "Ellington Properties is a design-led boutique developer known for beautifully detailed apartments and villas across communities such as Palm Jumeirah, Jumeirah Village Circle, MBR City and Emaar Beachfront. Its focus on architecture, amenities and finish has built a loyal following among end-users and investors alike.",
    keyFacts: [
      { label: "Known for", value: "Design-led boutique residences" },
      { label: "Segments", value: "Apartments, townhouses, villas" },
      { label: "Focus", value: "Architecture, amenities & finish" },
      { label: "Best for", value: "Design-conscious buyers" },
    ],
    signature: [
      "Ellington Beach House, Palm Jumeirah",
      "Belgravia, JVC",
      "The Highbury, MBR City",
    ],
    relatedAreas: ["palm-jumeirah", "jumeirah-village-circle", "emaar-beachfront"],
    faqs: [
      {
        question: "Is Ellington a good developer in Dubai?",
        answer:
          "Ellington Properties is a respected design-led developer known for well-detailed, amenity-rich residences. Its projects across Palm Jumeirah, JVC and MBR City are popular with buyers who prioritise architecture and finish quality.",
      },
    ],
    keywords: [
      "Ellington properties for sale",
      "Ellington Beach House Palm",
      "Ellington JVC apartment",
      "Ellington off-plan Dubai",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&q=80",
      alt: "Design-led apartment interior with warm materials",
      tone: "#ddd9d1",
    },
  },
  {
    slug: "majid-al-futtaim",
    name: "Majid Al Futtaim",
    tagline: "Master communities anchored by lifestyle",
    logo: "/brand/developers/MAF-crop.png",
    intro:
      "Majid Al Futtaim is a leading regional developer whose communities, most notably Tilal Al Ghaf, pair contemporary homes with world-class retail and leisure. Backed by the group behind Mall of the Emirates and City Centre malls, its master communities are built around amenities, lagoons and long-term placemaking.",
    keyFacts: [
      { label: "Signature", value: "Tilal Al Ghaf" },
      { label: "Group", value: "Mall of the Emirates, City Centre" },
      { label: "Segments", value: "Villas, mansions, townhouses" },
      { label: "Best for", value: "Amenity-rich new master communities" },
    ],
    signature: [
      "Tilal Al Ghaf",
      "Alaya Mansions",
      "Elan & Harmony",
    ],
    relatedAreas: ["tilal-al-ghaf"],
    faqs: [
      {
        question: "What is Majid Al Futtaim's flagship community?",
        answer:
          "Majid Al Futtaim's flagship residential community is Tilal Al Ghaf, a master plan built around a recreational lagoon and beaches, including sought-after villa collections and the ultra-prime Alaya mansions.",
      },
    ],
    keywords: [
      "Majid Al Futtaim properties",
      "Tilal Al Ghaf villa",
      "Alaya mansion Tilal Al Ghaf",
      "MAF communities Dubai",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80",
      alt: "Modern villa beside a lagoon in a master community",
      tone: "#d7d3cb",
    },
  },
  {
    slug: "select-group",
    name: "Select Group",
    tagline: "Waterfront towers in Dubai Marina",
    intro:
      "Select Group is a leading private developer best known for its waterfront residential towers in Dubai Marina, including the landmark Marina Gate and Jumeirah Living Marina Gate. Its focus on prime, well-connected waterfront locations and hospitality-grade amenities has made it a trusted name for apartments and penthouses.",
    keyFacts: [
      { label: "Signature", value: "Marina Gate, Dubai Marina" },
      { label: "Segments", value: "Apartments, penthouses, branded residences" },
      { label: "Known for", value: "Prime waterfront towers" },
      { label: "Best for", value: "Marina & Harbour apartments" },
    ],
    signature: [
      "Marina Gate",
      "Jumeirah Living Marina Gate",
      "Six Senses Residences",
      "Peninsula, Business Bay",
    ],
    relatedAreas: ["dubai-marina", "business-bay"],
    faqs: [
      {
        question: "What is Select Group known for in Dubai?",
        answer:
          "Select Group is known for prime waterfront residential towers, especially the Marina Gate development in Dubai Marina, as well as branded and hospitality-led residences across the city.",
      },
    ],
    keywords: [
      "Select Group properties for sale",
      "Marina Gate apartment",
      "Six Senses Residences Dubai",
      "Peninsula Business Bay",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1920&q=80",
      alt: "Contemporary waterfront apartment interior in Dubai Marina",
      tone: "#d8d6d0",
    },
  },
  {
    slug: "binghatti",
    name: "Binghatti",
    tagline: "Bold design and hyper-branded towers",
    intro:
      "Binghatti is a fast-growing Dubai developer known for its distinctive architecture and a wave of high-profile branded partnerships, including Bugatti, Mercedes-Benz and Jacob & Co. With a large pipeline across JVC, Business Bay and Downtown, it has become one of the most active names in the off-plan market.",
    keyFacts: [
      { label: "Known for", value: "Distinctive design, branded towers" },
      { label: "Partners", value: "Bugatti, Mercedes-Benz, Jacob & Co" },
      { label: "Segments", value: "Apartments, branded residences" },
      { label: "Best for", value: "Off-plan & branded investment" },
    ],
    signature: [
      "Bugatti Residences, Business Bay",
      "Mercedes-Benz Places",
      "Binghatti Hills",
      "Jacob & Co Residences",
    ],
    relatedAreas: ["business-bay", "jumeirah-village-circle", "downtown-dubai"],
    faqs: [
      {
        question: "Is Binghatti a good developer to invest with?",
        answer:
          "Binghatti is one of Dubai's most active developers, known for eye-catching architecture and branded residences with partners like Bugatti and Mercedes-Benz, offering a broad off-plan pipeline aimed at investors.",
      },
    ],
    keywords: [
      "Binghatti properties for sale",
      "Bugatti Residences Dubai",
      "Binghatti off-plan",
      "Binghatti JVC apartment",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1512699355324-f07e3106dae5?w=1920&q=80",
      alt: "Striking illuminated residential tower at dusk",
      tone: "#161822",
    },
  },
  {
    slug: "dubai-properties",
    name: "Dubai Properties",
    tagline: "Master communities across the city",
    intro:
      "Dubai Properties, part of Dubai Holding, has shaped some of the city's best-known destinations, including Jumeirah Beach Residence (JBR), Business Bay, Dubailand and Villanova. Its large-scale master communities span waterfront apartments to family villas, offering breadth across price points and lifestyles.",
    keyFacts: [
      { label: "Group", value: "Dubai Holding" },
      { label: "Signature", value: "JBR, Business Bay" },
      { label: "Segments", value: "Apartments, villas, townhouses" },
      { label: "Best for", value: "Established master communities" },
    ],
    signature: [
      "Jumeirah Beach Residence (JBR)",
      "Business Bay",
      "Villanova",
      "Mudon",
    ],
    relatedAreas: ["business-bay", "dubai-marina"],
    faqs: [
      {
        question: "What has Dubai Properties developed?",
        answer:
          "Dubai Properties, part of Dubai Holding, developed Jumeirah Beach Residence (JBR) and major districts within Business Bay and Dubailand, along with family communities such as Villanova and Mudon.",
      },
    ],
    keywords: [
      "Dubai Properties for sale",
      "JBR apartment",
      "Villanova townhouse",
      "Dubai Holding developer",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1920&q=80",
      alt: "Waterfront residential district beside the sea",
      tone: "#c9cdcf",
    },
  },
  {
    slug: "aldar",
    name: "Aldar Properties",
    tagline: "Abu Dhabi's leading developer, now in Dubai",
    intro:
      "Aldar Properties is the largest developer in Abu Dhabi and an increasingly significant player in Dubai, with landmark acquisitions and launches on Palm Jumeirah and beyond. Known for institutional-grade delivery and design partnerships, Aldar brings a blue-chip profile to Dubai's prime market.",
    keyFacts: [
      { label: "Base", value: "Abu Dhabi, expanding in Dubai" },
      { label: "Known for", value: "Institutional-grade delivery" },
      { label: "Segments", value: "Apartments, villas, branded residences" },
      { label: "Best for", value: "Blue-chip primary launches" },
    ],
    signature: [
      "Aldar on Palm Jumeirah",
      "Haven by Aldar",
      "Verdes, Dubai",
    ],
    relatedAreas: ["palm-jumeirah"],
    faqs: [
      {
        question: "Is Aldar active in Dubai?",
        answer:
          "Yes. Aldar Properties, Abu Dhabi's largest developer, has expanded into Dubai with prime acquisitions and launches, including projects on Palm Jumeirah, bringing an institutional-grade track record to the market.",
      },
    ],
    keywords: [
      "Aldar properties Dubai",
      "Aldar Palm Jumeirah",
      "Haven by Aldar",
      "Aldar off-plan",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1920&q=80",
      alt: "Modern waterfront residence with pool at dusk",
      tone: "#dcdad3",
    },
  },
];
