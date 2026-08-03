import type { Area } from "../types";

/**
 * Area guides for the communities EQT covers. Copy is genuine, indexable prose
 * plus FAQ blocks and keyword phrases for SEO/AEO. EQT transacts across ANY
 * Dubai community, developer and property type, so this list is broad by design
 * and easy to extend, add an object and the page, sitemap and nav pick it up.
 *
 * Imagery: Palm Jumeirah + Al Barari use real photography from the brokerage's
 * sold-listing brochures (in /public/images). Every other community uses a
 * verified editorial photograph as a placeholder, swap for real shoots later.
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
    keywords: [
      "Palm Jumeirah villas for sale",
      "Palm Jumeirah Signature Villa",
      "Garden Homes Palm Jumeirah",
      "Palm Jumeirah penthouse",
      "beachfront property Dubai",
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
    keywords: [
      "Al Barari villas for sale",
      "Al Barari mansion",
      "green community Dubai",
      "botanical villa Dubai",
      "private garden villa Dubai",
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
    keywords: [
      "Jumeirah Islands villas for sale",
      "lakeside villa Dubai",
      "Jumeirah Islands mansion",
      "gated villa community Dubai",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
      alt: "Contemporary luxury villa with pool beside water",
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
    keywords: [
      "Emirates Hills villas for sale",
      "Emirates Hills mansion",
      "luxury villa Dubai golf",
      "Montgomerie villa Dubai",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
      alt: "Contemporary white mansion with landscaped gardens",
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
    keywords: [
      "Downtown Dubai apartments for sale",
      "Burj Khalifa apartment",
      "branded residence Dubai",
      "Downtown Dubai penthouse",
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
    keywords: [
      "Dubai Hills Estate villas for sale",
      "Dubai Hills mansion",
      "Dubai Hills apartment",
      "golf community Dubai",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&q=80",
      alt: "Modern family villa with pool and lawn",
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
    keywords: [
      "Jumeirah Bay Island mansion",
      "Bulgari Residences Dubai",
      "beachfront mansion Dubai",
      "ultra-prime Dubai property",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1546412414-e1885259563a?w=1920&q=80",
      alt: "Luxury beachfront residence on the water",
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
    keywords: [
      "Emaar Beachfront apartments for sale",
      "beachfront apartment Dubai",
      "Emaar Beachfront penthouse",
      "Dubai Harbour property",
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
    keywords: [
      "Dubai Marina apartments for sale",
      "Dubai Marina penthouse",
      "marina view apartment Dubai",
      "high rental yield Dubai",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1920&q=80",
      alt: "Contemporary Dubai waterfront apartment living space",
      tone: "#d8d6d0",
    },
  },
  {
    slug: "district-one",
    label: "District One",
    headline: "Mansions on a crystal lagoon",
    intro:
      "District One, at the heart of Mohammed Bin Rashid City, is built around one of the world's largest man-made crystal lagoons. Gated and low-density, it offers contemporary mansions and villas with lagoon or skyline views, just minutes from Downtown Dubai and Meydan.",
    keyFacts: [
      { label: "Property types", value: "Contemporary mansions & villas" },
      { label: "Typical price range", value: "AED 12M – 150M+" },
      { label: "Setting", value: "Crystal lagoon, gated, low-density" },
      { label: "Best for", value: "Modern waterfront mansions near Downtown" },
    ],
    faqs: [
      {
        question: "Where is District One in Dubai?",
        answer:
          "District One sits within Mohammed Bin Rashid (MBR) City, roughly 10 minutes from Downtown Dubai and the Burj Khalifa, arranged around a swimmable crystal lagoon and beach.",
      },
    ],
    keywords: [
      "District One villas for sale",
      "MBR City mansion",
      "Meydan lagoon villa",
      "District One mansion Dubai",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1920&q=80",
      alt: "Modern white villa with infinity pool beside water",
      tone: "#dcdad3",
    },
  },
  {
    slug: "dubai-creek-harbour",
    label: "Dubai Creek Harbour",
    headline: "A new waterfront skyline",
    intro:
      "Dubai Creek Harbour is a large master-planned waterfront destination on the historic Creek, offering contemporary apartments and penthouses with views of the skyline, the marina and the wildlife sanctuary. It is one of Emaar's flagship growth districts and a favourite for off-plan investors.",
    keyFacts: [
      { label: "Property types", value: "Apartments & penthouses" },
      { label: "Typical price range", value: "AED 1.5M – 30M+" },
      { label: "Setting", value: "Creek-front, marina & promenade" },
      { label: "Best for", value: "Off-plan investment, waterfront views" },
    ],
    faqs: [
      {
        question: "Is Dubai Creek Harbour a good place to invest?",
        answer:
          "Dubai Creek Harbour is a flagship Emaar waterfront district with a growing skyline, strong off-plan demand and competitive entry prices, making it popular with investors seeking capital growth and rental income.",
      },
    ],
    keywords: [
      "Dubai Creek Harbour apartments for sale",
      "Creek Harbour off-plan",
      "Creek Beach apartment",
      "waterfront apartment Dubai",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1920&q=80",
      alt: "Waterfront high-rise district reflected in calm water",
      tone: "#c9cdcf",
    },
  },
  {
    slug: "business-bay",
    label: "Business Bay",
    headline: "Canal-side city living",
    intro:
      "Business Bay is Dubai's central business and lifestyle district, wrapped around the Dubai Water Canal and moments from Downtown. A dense mix of branded residences, offices and apartments makes it one of the most liquid rental markets in the city, popular with professionals and investors alike.",
    keyFacts: [
      { label: "Property types", value: "Apartments, branded residences, offices" },
      { label: "Typical price range", value: "AED 1.2M – 25M+" },
      { label: "Setting", value: "Dubai Water Canal, central" },
      { label: "Best for", value: "Rental yield, city professionals" },
    ],
    faqs: [
      {
        question: "Is Business Bay a good area to buy in Dubai?",
        answer:
          "Business Bay offers a central location beside Downtown and the Dubai Canal, strong tenant demand and a wide price range, making it a liquid choice for both investors and owner-occupiers.",
      },
    ],
    keywords: [
      "Business Bay apartments for sale",
      "Business Bay branded residence",
      "Dubai Canal apartment",
      "Business Bay investment",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1512699355324-f07e3106dae5?w=1920&q=80",
      alt: "Illuminated high-rise district at dusk",
      tone: "#161822",
    },
  },
  {
    slug: "bluewaters-island",
    label: "Bluewaters Island",
    headline: "Beachfront, beside Ain Dubai",
    intro:
      "Bluewaters Island is a stylish, low-rise waterfront community anchored by Ain Dubai, the world's largest observation wheel. Its residences and penthouses offer private beach access, marina views and a walkable lifestyle of dining and retail, just off the JBR coastline.",
    keyFacts: [
      { label: "Property types", value: "Apartments, penthouses, townhouses" },
      { label: "Typical price range", value: "AED 3M – 60M+" },
      { label: "Icon", value: "Ain Dubai observation wheel" },
      { label: "Best for", value: "Beachfront lifestyle & branded living" },
    ],
    faqs: [
      {
        question: "What is Bluewaters Island known for?",
        answer:
          "Bluewaters Island is known for Ain Dubai, private beaches and a walkable mix of dining and retail, with sought-after residences and penthouses offering sea and marina views close to JBR.",
      },
    ],
    keywords: [
      "Bluewaters Island apartments for sale",
      "Bluewaters penthouse",
      "beachfront residence Dubai",
      "Ain Dubai property",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920&q=80",
      alt: "Bright modern living room opening onto a terrace",
      tone: "#dedbd4",
    },
  },
  {
    slug: "city-walk",
    label: "City Walk",
    headline: "European-style urban living",
    intro:
      "City Walk is a low-rise, pedestrian-friendly community in the heart of Jumeirah, blending contemporary apartments with boutique retail, dining and green boulevards. Its central location and lifestyle appeal make it a favourite for owner-occupiers who want walkability close to the beach and Downtown.",
    keyFacts: [
      { label: "Property types", value: "Low-rise apartments & penthouses" },
      { label: "Typical price range", value: "AED 1.8M – 30M+" },
      { label: "Setting", value: "Walkable urban village, central Jumeirah" },
      { label: "Best for", value: "Lifestyle, walkability, end-users" },
    ],
    faqs: [
      {
        question: "Is City Walk a good place to live in Dubai?",
        answer:
          "City Walk is a low-rise, walkable community in central Jumeirah with boutique retail, dining and parks, close to the beach and Downtown, making it popular with residents who value lifestyle and location.",
      },
    ],
    keywords: [
      "City Walk apartments for sale",
      "City Walk Dubai property",
      "walkable community Dubai",
      "Jumeirah apartment",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
      alt: "Contemporary open-plan apartment interior with warm tones",
      tone: "#ddd9d1",
    },
  },
  {
    slug: "jumeirah-golf-estates",
    label: "Jumeirah Golf Estates",
    headline: "Championship golf living",
    intro:
      "Jumeirah Golf Estates is a gated, resort-style community set around two championship courses, including the DP World Tour Championship venue. Villas and mansions here look over fairways and lakes, offering a tranquil, green lifestyle with strong family appeal.",
    keyFacts: [
      { label: "Property types", value: "Villas, mansions, some apartments" },
      { label: "Typical price range", value: "AED 4M – 80M+" },
      { label: "Setting", value: "Two championship golf courses, gated" },
      { label: "Best for", value: "Golf lifestyle, family villas" },
    ],
    faqs: [
      {
        question: "Is Jumeirah Golf Estates freehold?",
        answer:
          "Yes. Jumeirah Golf Estates is a freehold community, so international buyers can own villas and apartments outright, with title registered at the Dubai Land Department.",
      },
    ],
    keywords: [
      "Jumeirah Golf Estates villas for sale",
      "golf villa Dubai",
      "JGE mansion",
      "fairway villa Dubai",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1920&q=80",
      alt: "Modern villa with pool overlooking green fairways",
      tone: "#dcded4",
    },
  },
  {
    slug: "arabian-ranches",
    label: "Arabian Ranches",
    headline: "The established family villa community",
    intro:
      "Arabian Ranches is one of Dubai's most loved family villa communities, a low-rise, desert-inspired master plan of villas and townhouses around a golf course, schools and parks. Its maturity, greenery and community feel make it a benchmark for suburban family living.",
    keyFacts: [
      { label: "Property types", value: "Villas & townhouses" },
      { label: "Typical price range", value: "AED 3M – 30M+" },
      { label: "Setting", value: "Golf, schools, mature landscaping" },
      { label: "Best for", value: "Families, end-user villa living" },
    ],
    faqs: [
      {
        question: "Is Arabian Ranches a good area for families?",
        answer:
          "Arabian Ranches is one of Dubai's most established family communities, with villas and townhouses set around a golf course, schools, parks and retail, prized for its greenery and community atmosphere.",
      },
    ],
    keywords: [
      "Arabian Ranches villas for sale",
      "Arabian Ranches townhouse",
      "family villa Dubai",
      "Arabian Ranches 3",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80",
      alt: "Contemporary family villa exterior at dusk",
      tone: "#d9d4cb",
    },
  },
  {
    slug: "tilal-al-ghaf",
    label: "Tilal Al Ghaf",
    headline: "Resort living around a crystal lagoon",
    intro:
      "Tilal Al Ghaf is a contemporary master community built around a swimmable recreational lagoon and white-sand beaches. Its signature Lanai and Alaya mansions have become some of the most in-demand new villas in Dubai, blending resort amenities with modern architecture.",
    keyFacts: [
      { label: "Property types", value: "Villas, mansions, townhouses" },
      { label: "Typical price range", value: "AED 3M – 90M+" },
      { label: "Setting", value: "Recreational lagoon & beaches" },
      { label: "Best for", value: "New-build resort lifestyle" },
    ],
    faqs: [
      {
        question: "What is Tilal Al Ghaf known for?",
        answer:
          "Tilal Al Ghaf is known for its central recreational lagoon and beaches, and for sought-after villa collections such as Lanai and the ultra-prime Alaya mansions, offering a resort lifestyle in a modern master plan.",
      },
    ],
    keywords: [
      "Tilal Al Ghaf villas for sale",
      "Alaya mansion Tilal Al Ghaf",
      "lagoon villa Dubai",
      "Tilal Al Ghaf Lanai",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80",
      alt: "Modern villa with large glazing beside a pool at dusk",
      tone: "#d7d3cb",
    },
  },
  {
    slug: "damac-hills",
    label: "DAMAC Hills",
    headline: "Golf-course living with resort amenities",
    intro:
      "DAMAC Hills is a large master community centred on the Trump International Golf Club Dubai, offering villas, townhouses and apartments alongside parks, sports facilities and retail. It appeals to families and investors looking for space and amenities at accessible prices.",
    keyFacts: [
      { label: "Property types", value: "Villas, townhouses, apartments" },
      { label: "Typical price range", value: "AED 1.2M – 40M+" },
      { label: "Setting", value: "Golf course, parks, gated" },
      { label: "Best for", value: "Family living, value & amenities" },
    ],
    faqs: [
      {
        question: "Is DAMAC Hills freehold?",
        answer:
          "Yes. DAMAC Hills is a freehold community where foreign nationals can buy villas, townhouses and apartments outright, with title registered at the Dubai Land Department.",
      },
    ],
    keywords: [
      "DAMAC Hills villas for sale",
      "DAMAC Hills townhouse",
      "golf community villa Dubai",
      "DAMAC Hills apartment",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=80",
      alt: "Modern villa exterior with clean lines and lawn",
      tone: "#d8d4cc",
    },
  },
  {
    slug: "jumeirah-park",
    label: "Jumeirah Park",
    headline: "Green, spacious family villas",
    intro:
      "Jumeirah Park is a landscaped, family-focused villa community of generous plots and mature greenery, centrally located near Dubai Marina, JLT and the Metro. Its large gardens and range of villa styles make it a perennial favourite with families upgrading from apartments.",
    keyFacts: [
      { label: "Property types", value: "Family villas" },
      { label: "Typical price range", value: "AED 4M – 25M+" },
      { label: "Setting", value: "Landscaped, generous plots" },
      { label: "Best for", value: "Families wanting space & greenery" },
    ],
    faqs: [
      {
        question: "What are villas like in Jumeirah Park?",
        answer:
          "Jumeirah Park villas sit on generous, landscaped plots with a choice of layouts and styles, in a green, family-oriented setting close to Dubai Marina, JLT and the Metro.",
      },
    ],
    keywords: [
      "Jumeirah Park villas for sale",
      "family villa Dubai",
      "Jumeirah Park Legacy villa",
      "large plot villa Dubai",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1920&q=80",
      alt: "Modern villa with landscaped garden and pool",
      tone: "#dad6cd",
    },
  },
  {
    slug: "the-meadows",
    label: "The Meadows",
    headline: "Lakeside villas in a mature community",
    intro:
      "The Meadows is an established, gated villa community of tree-lined streets and lakes within Emirates Living. Spacious independent villas, mature landscaping and proximity to schools and Dubai Marina keep it consistently in demand among families.",
    keyFacts: [
      { label: "Property types", value: "Independent family villas" },
      { label: "Typical price range", value: "AED 5M – 35M+" },
      { label: "Setting", value: "Gated, lakes, mature trees" },
      { label: "Best for", value: "Established family villa living" },
    ],
    faqs: [
      {
        question: "Where is The Meadows in Dubai?",
        answer:
          "The Meadows is part of Emirates Living, next to The Lakes and Emirates Hills, close to Sheikh Zayed Road, Dubai Marina and a choice of leading schools.",
      },
    ],
    keywords: [
      "The Meadows villas for sale",
      "Emirates Living villa",
      "lakeside family villa Dubai",
      "The Meadows Dubai",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=1920&q=80",
      alt: "Modern villa with pool and evening lighting",
      tone: "#d7d3ca",
    },
  },
  {
    slug: "the-springs",
    label: "The Springs",
    headline: "Dubai's favourite starter villa community",
    intro:
      "The Springs is a gated townhouse-and-villa community within Emirates Living, arranged around lakes and green walkways. Affordable entry points, a strong community feel and proximity to Dubai Marina make it one of the most popular first villa purchases in the city.",
    keyFacts: [
      { label: "Property types", value: "Townhouses & small villas" },
      { label: "Typical price range", value: "AED 2.5M – 12M+" },
      { label: "Setting", value: "Gated, lakes, walkways" },
      { label: "Best for", value: "First villa, young families" },
    ],
    faqs: [
      {
        question: "Is The Springs a good first villa in Dubai?",
        answer:
          "The Springs is one of Dubai's most popular entry-level villa communities, offering gated, lakeside townhouses at accessible prices, with strong tenant demand and easy access to Dubai Marina.",
      },
    ],
    keywords: [
      "The Springs villas for sale",
      "The Springs townhouse",
      "affordable villa Dubai",
      "Emirates Living Springs",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=1920&q=80",
      alt: "Row of modern townhouses with landscaped frontage",
      tone: "#d9d5cc",
    },
  },
  {
    slug: "the-lakes",
    label: "The Lakes",
    headline: "Quiet, green and centrally connected",
    intro:
      "The Lakes is a low-density, gated villa community within Emirates Living, known for its calm, leafy streets and shimmering lakes. Larger plots and a peaceful setting beside Emirates Hills make it a discreet choice for families who want space close to the city.",
    keyFacts: [
      { label: "Property types", value: "Family villas" },
      { label: "Typical price range", value: "AED 6M – 40M+" },
      { label: "Setting", value: "Gated, low-density, lakes" },
      { label: "Best for", value: "Quiet upscale family living" },
    ],
    faqs: [
      {
        question: "What makes The Lakes different from The Meadows?",
        answer:
          "The Lakes is generally lower-density and more secluded than The Meadows, with larger plots and a quieter, leafier feel, while both sit within Emirates Living beside Emirates Hills.",
      },
    ],
    keywords: [
      "The Lakes villas for sale",
      "Emirates Living villa",
      "The Lakes Dubai property",
      "low-density villa Dubai",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&q=80",
      alt: "Contemporary villa with pool and lounge terrace",
      tone: "#d8d4cb",
    },
  },
  {
    slug: "palm-jebel-ali",
    label: "Palm Jebel Ali",
    headline: "The next generation of Palm living",
    intro:
      "Palm Jebel Ali is Dubai's second, larger palm-shaped island, now under active development with a new collection of beachfront villas and mansions. Early buyers gain ground-floor access to a landmark waterfront destination set to rival Palm Jumeirah in scale and prestige.",
    keyFacts: [
      { label: "Property types", value: "Beachfront villas & mansions (off-plan)" },
      { label: "Typical price range", value: "AED 18M – 200M+" },
      { label: "Setting", value: "New palm island, private beaches" },
      { label: "Best for", value: "Early-stage landmark investment" },
    ],
    faqs: [
      {
        question: "Can I buy on Palm Jebel Ali?",
        answer:
          "Yes. Palm Jebel Ali is being released in phases as off-plan beachfront villas and mansions from Nakheel, available to international buyers on a freehold basis, with title registered at the Dubai Land Department.",
      },
    ],
    keywords: [
      "Palm Jebel Ali villas for sale",
      "Palm Jebel Ali off-plan",
      "new palm island Dubai",
      "beachfront villa Dubai",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80",
      alt: "Aerial view of a palm-shaped waterfront development",
      tone: "#12212b",
    },
  },
  {
    slug: "pearl-jumeirah",
    label: "Pearl Jumeirah",
    headline: "Beachfront plots in old Jumeirah",
    intro:
      "Pearl Jumeirah is an exclusive man-made island off the historic Jumeirah coast, offering rare beachfront plots and custom mansions alongside the Nikki Beach Residences. Its central location and low density make it a discreet home for bespoke waterfront living.",
    keyFacts: [
      { label: "Property types", value: "Beachfront plots, mansions, residences" },
      { label: "Typical price range", value: "AED 15M – 150M+" },
      { label: "Setting", value: "Man-made island, private beaches" },
      { label: "Best for", value: "Bespoke beachfront mansions" },
    ],
    faqs: [
      {
        question: "Is Pearl Jumeirah freehold?",
        answer:
          "Yes. Pearl Jumeirah is a freehold island community where foreign buyers can purchase beachfront plots, mansions and residences with title registered at the Dubai Land Department.",
      },
    ],
    keywords: [
      "Pearl Jumeirah plots for sale",
      "Pearl Jumeirah mansion",
      "beachfront plot Dubai",
      "Nikki Beach Residences Dubai",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1546412414-e1885259563a?w=1920&q=80",
      alt: "Contemporary beachfront mansion facing the sea",
      tone: "#cdd6d6",
    },
  },
  {
    slug: "jumeirah-village-circle",
    label: "Jumeirah Village Circle",
    headline: "Dubai's value-driven investment hub",
    intro:
      "Jumeirah Village Circle (JVC) is a fast-growing, centrally located community of apartments, townhouses and villas. Competitive prices and some of the strongest rental yields in Dubai have made it one of the most active investment districts in the city.",
    keyFacts: [
      { label: "Property types", value: "Apartments, townhouses, villas" },
      { label: "Typical price range", value: "AED 700K – 12M+" },
      { label: "Setting", value: "Central, landscaped villages" },
      { label: "Best for", value: "High rental yield, first investment" },
    ],
    faqs: [
      {
        question: "Why do investors like Jumeirah Village Circle?",
        answer:
          "JVC offers accessible entry prices, a central location and some of the highest rental yields in Dubai, with a deep, liquid market of apartments and townhouses, making it a favourite for first-time and yield-focused investors.",
      },
    ],
    keywords: [
      "JVC apartments for sale",
      "Jumeirah Village Circle townhouse",
      "high yield property Dubai",
      "JVC investment",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&q=80",
      alt: "Bright modern apartment interior with soft furnishings",
      tone: "#ddd9d1",
    },
  },
  {
    slug: "port-de-la-mer",
    label: "Port de La Mer",
    headline: "Mediterranean marina living",
    intro:
      "Port de La Mer is a Mediterranean-inspired marina community on the La Mer peninsula in Jumeirah, offering low-rise apartments and penthouses with sea views, a yacht marina and private beach access, minutes from Downtown and the city's best beaches.",
    keyFacts: [
      { label: "Property types", value: "Apartments & penthouses" },
      { label: "Typical price range", value: "AED 2.5M – 40M+" },
      { label: "Setting", value: "Marina, private beach, low-rise" },
      { label: "Best for", value: "Beachfront lifestyle near the city" },
    ],
    faqs: [
      {
        question: "What is Port de La Mer known for?",
        answer:
          "Port de La Mer is known for its Mediterranean-style, low-rise architecture, a private beach and yacht marina, and sea-view apartments in Jumeirah, close to Downtown Dubai and La Mer's dining and beaches.",
      },
    ],
    keywords: [
      "Port de La Mer apartments for sale",
      "La Mer penthouse",
      "marina apartment Dubai",
      "beachfront apartment Jumeirah",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1920&q=80",
      alt: "Elegant apartment interior opening to a sea-view balcony",
      tone: "#d9d6cf",
    },
  },
];
