import type { PropertyGuide } from "../types";

/**
 * Property-type / buyer-intent landing pages. These capture high-volume
 * category searches ("villas for sale in Dubai", "off-plan Dubai") and route
 * them into the relevant listings, communities and an enquiry. Answer-first
 * copy plus FAQ blocks for SEO/AEO.
 */
export const mockPropertyTypes: PropertyGuide[] = [
  {
    slug: "villas",
    label: "Villas",
    title: "Villas for Sale in Dubai",
    headline: "Freehold family villas across Dubai's finest communities",
    intro:
      "Dubai offers freehold villas across a wide spectrum, from gated family communities like Arabian Ranches and Dubai Hills Estate to ultra-prime addresses such as Emirates Hills and Palm Jumeirah. Buyers can own villas outright, with title registered at the Dubai Land Department, and choose between ready homes and off-plan launches.",
    listingType: "Villa",
    keyFacts: [
      { label: "Ownership", value: "Freehold in designated areas" },
      { label: "Typical price range", value: "AED 2.5M – 100M+" },
      { label: "Popular communities", value: "Dubai Hills, Ranches, Palm Jumeirah" },
      { label: "Best for", value: "Families, end-users, lifestyle" },
    ],
    relatedAreas: [
      "dubai-hills-estate",
      "arabian-ranches",
      "palm-jumeirah",
      "jumeirah-islands",
      "tilal-al-ghaf",
      "the-meadows",
    ],
    faqs: [
      {
        question: "Can foreigners buy a villa in Dubai?",
        answer:
          "Yes. Foreign nationals can buy villas outright in Dubai's designated freehold areas, with full title registered at the Dubai Land Department, and no requirement for a local partner.",
      },
      {
        question: "How much does a villa cost in Dubai?",
        answer:
          "Dubai villas range from around AED 2.5 million in family communities to well over AED 100 million for prime mansions on Palm Jumeirah or in Emirates Hills. Price depends on community, plot size, condition and views.",
      },
    ],
    keywords: [
      "villas for sale in Dubai",
      "Dubai villa for sale",
      "freehold villa Dubai",
      "family villa Dubai",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&q=80",
      alt: "Contemporary Dubai villa with pool and garden",
      tone: "#dfe0da",
    },
  },
  {
    slug: "mansions",
    label: "Mansions",
    title: "Luxury Mansions for Sale in Dubai",
    headline: "Trophy estates in Dubai's most exclusive addresses",
    intro:
      "Dubai's mansion market is concentrated in a handful of ultra-prime communities, Emirates Hills, Palm Jumeirah, Jumeirah Bay Island, District One and Al Barari. These are large, often bespoke homes on generous plots, many with private beaches, golf frontage or lagoon views, and represent the top of the emirate's residential market.",
    listingType: "Mansion",
    keyFacts: [
      { label: "Typical price range", value: "AED 25M – 400M+" },
      { label: "Prime addresses", value: "Emirates Hills, Palm, Jumeirah Bay" },
      { label: "Features", value: "Private beach, golf or lagoon frontage" },
      { label: "Best for", value: "Trophy assets & bespoke estates" },
    ],
    relatedAreas: [
      "emirates-hills",
      "palm-jumeirah",
      "jumeirah-bay-island",
      "district-one",
      "al-barari",
    ],
    faqs: [
      {
        question: "Where are the best mansions in Dubai?",
        answer:
          "Dubai's finest mansions are found in Emirates Hills, on Palm Jumeirah's Signature Villa fronds, on Jumeirah Bay Island, in District One and in Al Barari, each offering privacy, scale and landmark settings.",
      },
    ],
    keywords: [
      "Dubai mansions for sale",
      "luxury mansion Dubai",
      "Emirates Hills mansion",
      "Palm Jumeirah mansion",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
      alt: "Grand contemporary mansion with landscaped grounds",
      tone: "#dcd8cf",
    },
  },
  {
    slug: "penthouses",
    label: "Penthouses",
    title: "Penthouses for Sale in Dubai",
    headline: "Sky-high living with skyline and sea views",
    intro:
      "Dubai's penthouses crown its most prestigious towers, in Downtown Dubai, Dubai Marina, Palm Jumeirah, Emaar Beachfront and Business Bay. Expect expansive floor plates, private terraces and pools, branded interiors and panoramic views of the skyline, sea or Burj Khalifa.",
    listingType: "Penthouse",
    keyFacts: [
      { label: "Typical price range", value: "AED 8M – 150M+" },
      { label: "Prime towers", value: "Downtown, Marina, Palm, Beachfront" },
      { label: "Features", value: "Private terraces, pools, branded interiors" },
      { label: "Best for", value: "Lock-up-and-leave luxury & views" },
    ],
    relatedAreas: [
      "downtown-dubai",
      "dubai-marina",
      "palm-jumeirah",
      "emaar-beachfront",
      "business-bay",
    ],
    faqs: [
      {
        question: "How much is a penthouse in Dubai?",
        answer:
          "Penthouses in Dubai typically start from around AED 8 million and rise beyond AED 100 million for branded, full-floor residences in landmark towers on Palm Jumeirah or in Downtown Dubai.",
      },
    ],
    keywords: [
      "penthouses for sale in Dubai",
      "Dubai penthouse",
      "Downtown Dubai penthouse",
      "Palm Jumeirah penthouse",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
      alt: "Penthouse living space with floor-to-ceiling city views",
      tone: "#ddd9d1",
    },
  },
  {
    slug: "apartments",
    label: "Apartments",
    title: "Apartments for Sale in Dubai",
    headline: "From investment studios to branded residences",
    intro:
      "Apartments are the most liquid segment of Dubai's market, spanning value-driven investment districts like Jumeirah Village Circle to branded residences in Downtown Dubai and beachfront homes at Emaar Beachfront. Strong rental yields and a deep resale market make apartments a popular entry point for investors and end-users alike.",
    listingType: "Apartment",
    keyFacts: [
      { label: "Typical price range", value: "AED 700K – 60M+" },
      { label: "For yield", value: "JVC, Business Bay, Dubai Marina" },
      { label: "For lifestyle", value: "Downtown, Beachfront, City Walk" },
      { label: "Best for", value: "Investment & first purchase" },
    ],
    relatedAreas: [
      "downtown-dubai",
      "dubai-marina",
      "business-bay",
      "emaar-beachfront",
      "jumeirah-village-circle",
      "dubai-creek-harbour",
    ],
    faqs: [
      {
        question: "Are apartments in Dubai a good investment?",
        answer:
          "Dubai apartments offer some of the strongest rental yields among global cities, a deep and liquid resale market, and no annual property tax, making them a popular choice for both income-focused and capital-growth investors.",
      },
    ],
    keywords: [
      "apartments for sale in Dubai",
      "Dubai apartment for sale",
      "Downtown Dubai apartment",
      "high yield apartment Dubai",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&q=80",
      alt: "Bright modern Dubai apartment interior",
      tone: "#ddd9d1",
    },
  },
  {
    slug: "townhouses",
    label: "Townhouses",
    title: "Townhouses for Sale in Dubai",
    headline: "The family-friendly step between apartment and villa",
    intro:
      "Townhouses offer Dubai families private, multi-storey living with gardens and community amenities at a more accessible price than standalone villas. They are concentrated in master communities such as Dubai Hills Estate, DAMAC Hills, Tilal Al Ghaf and Arabian Ranches, close to schools, parks and retail.",
    listingType: "Townhouse",
    keyFacts: [
      { label: "Typical price range", value: "AED 1.8M – 15M+" },
      { label: "Popular communities", value: "Dubai Hills, DAMAC Hills, Ranches" },
      { label: "Features", value: "Private garden, community amenities" },
      { label: "Best for", value: "Young families, first villa move" },
    ],
    relatedAreas: [
      "dubai-hills-estate",
      "damac-hills",
      "tilal-al-ghaf",
      "arabian-ranches",
      "the-springs",
    ],
    faqs: [
      {
        question: "What is the difference between a townhouse and a villa in Dubai?",
        answer:
          "A townhouse shares one or more walls with neighbouring homes and usually has a smaller plot, while a villa is standalone on its own plot. Townhouses are generally more affordable, making them a popular first step into villa-style living.",
      },
    ],
    keywords: [
      "townhouses for sale in Dubai",
      "Dubai townhouse",
      "family townhouse Dubai",
      "Dubai Hills townhouse",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=1920&q=80",
      alt: "Row of modern Dubai townhouses with landscaped frontage",
      tone: "#d9d5cc",
    },
  },
  {
    slug: "off-plan",
    label: "Off-Plan",
    title: "Off-Plan Property in Dubai",
    headline: "Buy early, from Dubai's leading developers",
    intro:
      "Off-plan property is bought directly from a developer before or during construction, often with attractive payment plans and entry prices. In Dubai, off-plan purchases are protected by escrow accounts regulated by RERA, and buyers can access the newest communities from Emaar, Nakheel, Sobha, DAMAC and others. EQT advises on allocations, payment plans and resale exit.",
    keyFacts: [
      { label: "Payment", value: "Staged plans during construction" },
      { label: "Protection", value: "RERA-regulated escrow accounts" },
      { label: "Entry", value: "Lower prices, newest communities" },
      { label: "Best for", value: "Capital growth & payment flexibility" },
    ],
    relatedAreas: [
      "dubai-creek-harbour",
      "emaar-beachfront",
      "palm-jebel-ali",
      "tilal-al-ghaf",
      "district-one",
    ],
    faqs: [
      {
        question: "Is buying off-plan in Dubai safe?",
        answer:
          "Off-plan purchases in Dubai are regulated by RERA, with buyer payments held in project-specific escrow accounts released to developers against construction milestones. Working with a registered brokerage and reputable developer further reduces risk.",
      },
      {
        question: "What are the benefits of buying off-plan in Dubai?",
        answer:
          "Off-plan buyers typically access lower entry prices, staged payment plans that ease cash flow, and the newest communities, with the potential for capital appreciation before completion.",
      },
    ],
    keywords: [
      "off-plan property Dubai",
      "off-plan Dubai for sale",
      "new developments Dubai",
      "Dubai off-plan payment plan",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1920&q=80",
      alt: "New waterfront towers under a bright Dubai sky",
      tone: "#c9cdcf",
    },
  },
];
