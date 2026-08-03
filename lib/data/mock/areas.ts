import type { Area } from "../types";

/**
 * Area guides for EQT's real portfolio communities. Copy is genuine, indexable
 * prose + FAQ blocks for SEO/AEO.
 *
 * Imagery: Palm Jumeirah + Al Barari use real photography from the brokerage's
 * sold-listing brochures (in /public/images). Jumeirah Islands has no photos in
 * the asset library yet, its hero image is a flagged placeholder to replace.
 */
export const mockAreas: Area[] = [
  {
    slug: "palm-jumeirah",
    label: "Palm Jumeirah",
    headline: "Life on the world's most iconic island",
    intro:
      "Palm Jumeirah is Dubai's landmark man-made archipelago, home to beachfront villas on the fronds, the Signature Villas, and a growing collection of ultra-prime penthouses along the crescent. Residents enjoy private beach access, five-star hospitality on their doorstep, and some of the strongest capital appreciation in the emirate.",
    keyFacts: [
      { label: "Property types", value: "Signature & Garden Homes villas, penthouses" },
      { label: "Typical price range", value: "AED 12M – 200M+" },
      { label: "Beachfront", value: "Private beach on frond villas" },
      { label: "Best for", value: "Waterfront living, landmark trophy assets" },
    ],
    faqs: [
      {
        question: "How much does a villa on Palm Jumeirah cost?",
        answer:
          "Frond villas on Palm Jumeirah typically trade from around AED 12 million for a Garden Home, rising well beyond AED 100 million for renovated Signature Villas and custom mansions with private beach frontage.",
      },
      {
        question: "Can foreigners buy property on Palm Jumeirah?",
        answer:
          "Yes. Palm Jumeirah is a designated freehold area, so non-UAE nationals can buy, own and sell property with full title registered at the Dubai Land Department.",
      },
    ],
    heroImage: {
      url: "/images/palm-jumeirah/5.jpg",
      alt: "Palm Jumeirah villa dining room with designer lighting and sea views",
      tone: "#e7e6e2",
    },
  },
  {
    slug: "al-barari",
    label: "Al Barari",
    headline: "Where Dubai exhales",
    intro:
      "There is nowhere else in Dubai quite like Al Barari. In a city defined by ambition and density, this is the deliberate exception, more than 60% of the land surrendered to nature. Gardens, lakes and mature trees frame a small collection of custom villas and mansions, each opening onto green. The air is cooler, quieter, unhurried, and yet it is minutes from everything Dubai offers.",
    keyFacts: [
      { label: "Property types", value: "Custom villas & botanical mansions" },
      { label: "Typical price range", value: "AED 20M – 120M+" },
      { label: "Setting", value: "60%+ landscaped, private gardens & lakes" },
      { label: "Connectivity", value: "≈15 min to DIFC & Burj Khalifa" },
    ],
    faqs: [
      {
        question: "What is Al Barari known for?",
        answer:
          "Al Barari is Dubai's greenest luxury community, more than 60% of its land is given over to landscaped gardens, themed lakes and mature trees, surrounding a limited number of large custom villas. It is prized for privacy, low density and a nature-led lifestyle.",
      },
      {
        question: "How far is Al Barari from Downtown Dubai?",
        answer:
          "Al Barari is roughly 15 minutes from DIFC and the Burj Khalifa, about 20 minutes from Palm Jumeirah and La Mer, and around 20 minutes from Dubai International Airport.",
      },
    ],
    heroImage: {
      url: "/images/al-barari/9.jpg",
      alt: "Al Barari villa living room with double-height glazing onto the garden",
      tone: "#e6e6e2",
    },
  },
  {
    slug: "jumeirah-islands",
    label: "Jumeirah Islands",
    headline: "Villa living, wrapped in water",
    intro:
      "Jumeirah Islands is a gated community of villa clusters set among landscaped, man-made lakes. Mature planting, waterfront plots and a genuine sense of community make it one of Dubai's most liveable villa addresses, architecturally varied, family-oriented, and moments from Dubai Marina and the beaches of JBR.",
    keyFacts: [
      { label: "Property types", value: "Lakeside & waterfront villas" },
      { label: "Typical price range", value: "AED 8M – 40M+" },
      { label: "Setting", value: "Gated villa clusters around lakes" },
      { label: "Best for", value: "Waterfront family living" },
    ],
    faqs: [
      {
        question: "Is Jumeirah Islands freehold?",
        answer:
          "Yes. Jumeirah Islands is a freehold community, so international buyers can purchase, own and sell villas with title registered at the Dubai Land Department.",
      },
      {
        question: "What makes Jumeirah Islands special?",
        answer:
          "Its villas are arranged in clusters around landscaped man-made lakes, giving many homes direct water frontage. Combined with mature greenery, gated security and proximity to Dubai Marina, it is a rare family-focused waterfront community.",
      },
    ],
    // PLACEHOLDER IMAGE (client pick JI-03), no real Jumeirah Islands
    // photography yet. Replace with a real brochure/photo when available.
    heroImage: {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
      alt: "Contemporary luxury villa with pool (placeholder for Jumeirah Islands)",
      tone: "#e4e7e6",
    },
  },

  {
    slug: "emirates-hills",
    label: "Emirates Hills",
    headline: "The Beverly Hills of Dubai",
    intro:
      "Emirates Hills is Dubai's most established gated villa community, built around the Montgomerie golf course. Large freehold plots, fully bespoke mansions and absolute privacy make it the address of choice for the emirate's most prominent families. Supply of prime mansions is scarce, which keeps values among the highest in the city.",
    keyFacts: [
      { label: "Property types", value: "Custom mansions & villa plots" },
      { label: "Typical price range", value: "AED 30M – 300M+" },
      { label: "Setting", value: "Gated, golf-course frontage" },
      { label: "Best for", value: "Ultra-private family estates" },
    ],
    faqs: [
      {
        question: "How much is a villa in Emirates Hills?",
        answer:
          "Mansions in Emirates Hills typically trade from around AED 30 million and rise beyond AED 200 million for large, renovated homes with golf-course frontage. Empty plots trade at a premium given how rarely they become available.",
      },
      {
        question: "Can foreigners buy in Emirates Hills?",
        answer:
          "Yes. Emirates Hills is a designated freehold area, so non-UAE nationals can buy, own and sell with full title registered at the Dubai Land Department.",
      },
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
      alt: "Contemporary white mansion with landscaped gardens in Dubai",
      tone: "#dcd8cf",
    },
  },
  {
    slug: "downtown-dubai",
    label: "Downtown Dubai",
    headline: "At the centre of it all",
    intro:
      "Downtown Dubai is the beating heart of the city, home to the Burj Khalifa, The Dubai Mall and the Opera District. Branded residences and high-floor apartments here command premium rents and enduring liquidity, making it one of the most resilient investment locations in Dubai.",
    keyFacts: [
      { label: "Property types", value: "Branded & luxury apartments, penthouses" },
      { label: "Typical price range", value: "AED 2.5M – 80M+" },
      { label: "Landmark", value: "Burj Khalifa & Dubai Opera" },
      { label: "Best for", value: "Investment, pied-à-terre, walkability" },
    ],
    faqs: [
      {
        question: "Is Downtown Dubai a good investment?",
        answer:
          "Downtown Dubai offers strong rental demand, high liquidity and branded-residence premiums, making it one of the most resilient locations in the city for luxury apartments and penthouses.",
      },
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1920&q=80",
      alt: "Downtown Dubai skyline with the Burj Khalifa at night",
      tone: "#151721",
    },
  },
  {
    slug: "dubai-hills-estate",
    label: "Dubai Hills Estate",
    headline: "Green, connected, family-first",
    intro:
      "Dubai Hills Estate is a master-planned community wrapped around an 18-hole championship golf course and a central park. It balances contemporary villas, townhouses and apartments with schools, healthcare and retail, and offers easy access to both Downtown and Dubai Marina.",
    keyFacts: [
      { label: "Property types", value: "Villas, townhouses, apartments" },
      { label: "Typical price range", value: "AED 2M – 60M+" },
      { label: "Setting", value: "Golf, parks, family amenities" },
      { label: "Best for", value: "Growing families, end-user living" },
    ],
    faqs: [
      {
        question: "Is Dubai Hills Estate good for families?",
        answer:
          "Yes. Dubai Hills Estate is designed around parks, schools, healthcare and a golf course, with a wide mix of villas and townhouses, making it one of Dubai's most popular family communities.",
      },
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
      alt: "Modern family villa with pool in Dubai Hills Estate",
      tone: "#dfe0da",
    },
  },
  {
    slug: "jumeirah-bay-island",
    label: "Jumeirah Bay Island",
    headline: "Dubai's most exclusive seahorse",
    intro:
      "Shaped like a seahorse and connected to the mainland by a private bridge, Jumeirah Bay Island is one of Dubai's rarest ultra-prime addresses, home to the Bulgari Resort & Residences and a small collection of custom beachfront mansions. Scarcity and prestige place it at the very top of the market.",
    keyFacts: [
      { label: "Property types", value: "Beachfront mansions & branded residences" },
      { label: "Typical price range", value: "AED 25M – 400M+" },
      { label: "Icon", value: "Bulgari Resort & Residences" },
      { label: "Best for", value: "Trophy beachfront assets" },
    ],
    faqs: [
      {
        question: "What makes Jumeirah Bay Island special?",
        answer:
          "Jumeirah Bay is a tightly controlled island with very few plots, private beach frontage and the Bulgari brand, giving it a level of exclusivity and privacy unmatched in Dubai, reflected in some of the highest prices per square foot in the emirate.",
      },
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1546412414-e1885259563a?w=1920&q=80",
      alt: "Luxury beachfront residence on the water in Dubai",
      tone: "#cdd6d6",
    },
  },
  {
    slug: "emaar-beachfront",
    label: "Emaar Beachfront",
    headline: "Private beachfront living, by the Marina",
    intro:
      "Emaar Beachfront is a gated island community of contemporary towers set between Dubai Marina and Palm Jumeirah, with private beach access and skyline-and-sea views. It has become one of the most sought-after addresses for waterfront apartments and penthouses.",
    keyFacts: [
      { label: "Property types", value: "Beachfront apartments & penthouses" },
      { label: "Typical price range", value: "AED 2.5M – 50M+" },
      { label: "Setting", value: "Private beach, gated island" },
      { label: "Best for", value: "Waterfront investment & lifestyle" },
    ],
    faqs: [
      {
        question: "Is Emaar Beachfront a good investment?",
        answer:
          "Emaar Beachfront combines private beach access, branded developments and a location between Dubai Marina and Palm Jumeirah, giving it strong rental demand and appeal to both end-users and investors.",
      },
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80",
      alt: "Aerial view of a Dubai waterfront community at dusk",
      tone: "#12212b",
    },
  },
  {
    slug: "dubai-marina",
    label: "Dubai Marina",
    headline: "The city on the water",
    intro:
      "Dubai Marina is a vibrant, high-rise waterfront district built around a man-made canal, lined with restaurants, a promenade and yacht berths. It offers a deep, liquid market of apartments and penthouses with strong rental yields and round-the-clock energy.",
    keyFacts: [
      { label: "Property types", value: "Apartments, penthouses, some villas" },
      { label: "Typical price range", value: "AED 1.5M – 40M+" },
      { label: "Setting", value: "Canal-front, marina promenade" },
      { label: "Best for", value: "Rental yield, lifestyle, first purchase" },
    ],
    faqs: [
      {
        question: "What are rental yields like in Dubai Marina?",
        answer:
          "Dubai Marina is known for some of the strongest rental yields among prime districts, supported by high tenant demand, walkability and its waterfront lifestyle, which is why it remains a favourite with investors.",
      },
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1920&q=80",
      alt: "Contemporary Dubai waterfront apartment living space",
      tone: "#d8d6d0",
    },
  },
];
