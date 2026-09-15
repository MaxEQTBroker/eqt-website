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
    aeoAnswer:
      "Palm Jumeirah is Dubai's landmark man-made island, home to beachfront frond villas and branded apartments, and one of the emirate's most prestigious addresses for luxury buyers and investors.",
    intro:
      "Palm Jumeirah is Dubai's landmark man-made archipelago, home to beachfront villas on the fronds, the Signature Villas, and a growing collection of ultra-prime penthouses along the crescent. Residents enjoy private beach access, five-star hospitality on their doorstep, and some of the strongest capital appreciation in the emirate.",
    keyFacts: [
      { label: "Property types", value: "Signature & Garden Homes villas, penthouses" },
      { label: "Typical price range", value: "AED 12M - 200M+" },
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
    slug: "palm-jumeirah-signature-villas",
    label: "Palm Jumeirah Signature Villas",
    headline: "The trophy tier of Palm Jumeirah villas",
    aeoAnswer:
      "Palm Jumeirah Signature Villas are the largest and most exclusive beachfront villas on the island's fronds, built on wider plots with grander proportions and direct private beach frontage, making them the island's trophy villa tier.",
    intro:
      "Signature Villas sit at the very top of the Palm Jumeirah villa market. Positioned along the tips and outer edges of the fronds, they occupy noticeably larger plots than the more numerous Garden Homes, with wider frontages, higher ceilings and enough land for private pools, gardens and generous entertaining space. Many have been comprehensively rebuilt into bespoke contemporary mansions, and it is here that Palm Jumeirah's headline sales tend to be set. For buyers who want a landmark address with true scale and privacy, this is the rarest and most sought-after tier on the island.",
    keyFacts: [
      { label: "Property type", value: "Large custom beachfront villas" },
      { label: "Position", value: "Frond tips and outer edges" },
      { label: "Plots", value: "Wider plots, grander proportions than Garden Homes" },
      { label: "Beach", value: "Direct private beach frontage" },
      { label: "Best for", value: "Trophy assets, end-users and collectors" },
      { label: "Tenure", value: "Freehold, registered at Dubai Land Department" },
    ],
    faqs: [
      {
        question: "What is a Palm Jumeirah Signature Villa?",
        answer:
          "A Signature Villa is the largest villa type on Palm Jumeirah's fronds. Compared with the more common Garden Homes, Signature Villas sit on wider plots with grander proportions and direct private beach frontage, and many have been rebuilt into bespoke mansions, which places them at the top of the island's villa market.",
      },
      {
        question: "How are Signature Villas different from Garden Homes?",
        answer:
          "Both are beachfront frond villas with private beach access, but Signature Villas occupy larger plots with more generous internal space, while Garden Homes are the more numerous, standard-plan villas built to Nakheel's original designs. Signature Villas are rarer and typically command a meaningful premium per property.",
      },
      {
        question: "Can foreigners buy a Signature Villa on Palm Jumeirah?",
        answer:
          "Yes. Palm Jumeirah is a designated freehold area, so non-UAE nationals can buy, own and sell Signature Villas with full title registered at the Dubai Land Department. Purchases carry the standard one-off DLD transfer fee, and there is no annual property tax on the home.",
      },
      {
        question: "Are Signature Villas a good investment?",
        answer:
          "Signature Villas are scarce trophy assets on one of Dubai's most recognised addresses, which historically supports resilient demand and strong resale interest among international buyers. They tend to suit end-users and long-term holders rather than yield-focused investors, since the largest villas are held more often than rented.",
      },
    ],
    keywords: [
      "Palm Jumeirah Signature Villa for sale",
      "Signature Villa Palm Jumeirah",
      "Palm Jumeirah beachfront mansion",
      "custom villa Palm Jumeirah",
      "trophy villa Dubai",
      "luxury Palm Jumeirah villa",
    ],
    relatedLinks: [
      { label: "Palm Jumeirah", href: "/areas/palm-jumeirah" },
      { label: "Palm Jumeirah Garden Homes", href: "/areas/palm-jumeirah-garden-homes" },
      { label: "Palm Jumeirah Fronds", href: "/areas/palm-jumeirah-fronds" },
      { label: "Signature Villas vs Garden Homes", href: "/blog/palm-jumeirah-signature-villas-vs-garden-homes" },
    ],
    heroImage: {
      url: "/images/palm-jumeirah/1.jpg",
      alt: "Large contemporary Palm Jumeirah beachfront villa with pool and sea views",
      tone: "#e7e6e2",
    },
  },
  {
    slug: "palm-jumeirah-garden-homes",
    label: "Palm Jumeirah Garden Homes",
    headline: "Beachfront family villas along the fronds",
    aeoAnswer:
      "Palm Jumeirah Garden Homes are the more numerous beachfront frond villas, smaller than the Signature Villas but offering private beach access, family-friendly layouts and several architectural styles and orientations.",
    intro:
      "Garden Homes are the backbone of villa living on Palm Jumeirah. Built to Nakheel's original designs, they are far more numerous than the Signature Villas and line the fronds in a range of styles, from Mediterranean and Arabic to more contemporary interpretations, each with its own beach frontage. Typically offered with four or five bedrooms, they are sized for family living rather than sheer scale, and the choice of frond position and orientation shapes both the view and the pattern of light through the day. For many buyers, a Garden Home is the most attainable route to a private beachfront address on the island.",
    keyFacts: [
      { label: "Property type", value: "Standard-plan beachfront frond villas" },
      { label: "Layouts", value: "Commonly four and five bedrooms" },
      { label: "Styles", value: "Mediterranean, Arabic and contemporary designs" },
      { label: "Beach", value: "Private beach access on the fronds" },
      { label: "Best for", value: "Families seeking beachfront living" },
      { label: "Tenure", value: "Freehold, registered at Dubai Land Department" },
    ],
    faqs: [
      {
        question: "What are Garden Homes on Palm Jumeirah?",
        answer:
          "Garden Homes are the most common villa type on Palm Jumeirah's fronds, built to Nakheel's original designs. They are typically four or five bedroom beachfront villas with private beach access, offered in several architectural styles, and are smaller than the island's Signature Villas.",
      },
      {
        question: "How many styles of Garden Home are there?",
        answer:
          "Garden Homes come in a range of facade styles across the fronds, including Mediterranean, Arabic and more contemporary designs, along with different orientations. The style and frond position influence the outlook and how sunlight moves through the villa across the day.",
      },
      {
        question: "Are Garden Homes cheaper than Signature Villas?",
        answer:
          "Generally yes. Garden Homes sit on standard plots and are the more numerous, more attainable villa tier, while Signature Villas occupy larger plots and command a premium. Actual pricing depends on frond, orientation, condition and whether the villa has been upgraded or extended.",
      },
      {
        question: "Do Garden Homes have private beach access?",
        answer:
          "Yes. Garden Homes line the fronds of Palm Jumeirah with direct access to a private stretch of beach, which is one of the main reasons buyers choose villa living on the island over apartments on the trunk or crescent.",
      },
    ],
    keywords: [
      "Palm Jumeirah Garden Homes for sale",
      "Garden Home Palm Jumeirah",
      "Palm Jumeirah frond villa",
      "beachfront family villa Dubai",
      "4 bedroom villa Palm Jumeirah",
      "Nakheel Garden Homes",
    ],
    relatedLinks: [
      { label: "Palm Jumeirah", href: "/areas/palm-jumeirah" },
      { label: "Palm Jumeirah Signature Villas", href: "/areas/palm-jumeirah-signature-villas" },
      { label: "Palm Jumeirah Fronds", href: "/areas/palm-jumeirah-fronds" },
      { label: "Signature Villas vs Garden Homes", href: "/blog/palm-jumeirah-signature-villas-vs-garden-homes" },
    ],
    heroImage: {
      url: "/images/palm-jumeirah/2.jpg",
      alt: "Palm Jumeirah Garden Home villa with garden and private beach frontage",
      tone: "#e7e6e2",
    },
  },
  {
    slug: "palm-jumeirah-fronds",
    label: "Palm Jumeirah Fronds",
    headline: "How frond living works on Palm Jumeirah",
    aeoAnswer:
      "The fronds of Palm Jumeirah are the residential branches where beachfront villas line each side, giving every home private beach access, with the frond's east or west orientation shaping its sunrise or sunset outlook.",
    intro:
      "The fronds are what make villa living on Palm Jumeirah distinctive. Branching off the island's central trunk, each frond is lined on both sides with villas, and every home opens onto its own stretch of private beach. Which side of a frond a villa sits on matters: an easterly aspect tends to favour sunrise and calmer inner-island views, while a westerly aspect leans towards sunset and more open water. Both Garden Homes and the larger Signature Villas sit along the fronds, so the frond you choose shapes the light, the outlook and the sense of privacy far more than any single specification. This overview is about frond living in general rather than claims about any individual lettered frond.",
    keyFacts: [
      { label: "What they are", value: "Residential branches lined with villas" },
      { label: "Beach", value: "Private beach access on both sides" },
      { label: "Orientation", value: "East favours sunrise, west favours sunset" },
      { label: "Villa types", value: "Garden Homes and Signature Villas" },
      { label: "Best for", value: "Private beachfront villa living" },
      { label: "Tenure", value: "Freehold, registered at Dubai Land Department" },
    ],
    faqs: [
      {
        question: "How do the fronds on Palm Jumeirah work?",
        answer:
          "The fronds are the residential branches of Palm Jumeirah that extend from the central trunk. Villas line both sides of each frond, and every villa has direct access to a private stretch of beach, which is the defining feature of frond living on the island.",
      },
      {
        question: "Is it better to be on the east or west side of a frond?",
        answer:
          "It depends on what you value. An east-facing villa generally favours sunrise and calmer inner-island views, while a west-facing villa leans towards sunset and more open water. Neither is objectively better; the right choice comes down to your preferred light, outlook and privacy.",
      },
      {
        question: "What kind of villas are on the fronds?",
        answer:
          "The fronds hold both Garden Homes, the more numerous standard-plan villas, and the larger, rarer Signature Villas. All are beachfront homes with private beach access, differing mainly in plot size, scale and how extensively they have been upgraded.",
      },
      {
        question: "Who does frond living suit?",
        answer:
          "Frond living suits buyers who want a private, beachfront villa lifestyle rather than lock-up-and-leave apartment living. It appeals to families and end-users who value space, privacy and direct beach access over the more social energy of the trunk and crescent.",
      },
    ],
    keywords: [
      "Palm Jumeirah fronds",
      "Palm Jumeirah frond villa",
      "frond orientation Palm Jumeirah",
      "beachfront villa Palm Jumeirah",
      "east vs west frond Palm Jumeirah",
      "Palm Jumeirah villa living",
    ],
    relatedLinks: [
      { label: "Palm Jumeirah", href: "/areas/palm-jumeirah" },
      { label: "Palm Jumeirah Garden Homes", href: "/areas/palm-jumeirah-garden-homes" },
      { label: "Palm Jumeirah Signature Villas", href: "/areas/palm-jumeirah-signature-villas" },
      { label: "Living on Palm Jumeirah", href: "/blog/living-on-palm-jumeirah" },
    ],
    heroImage: {
      url: "/images/palm-jumeirah/3.jpg",
      alt: "Aerial-style view of Palm Jumeirah frond villas lining a private beach",
      tone: "#e7e6e2",
    },
  },
  {
    slug: "palm-jumeirah-apartments",
    label: "Palm Jumeirah Apartments",
    headline: "Beach-access apartments on the island",
    aeoAnswer:
      "Palm Jumeirah apartments are the Shoreline and trunk residences plus branded apartments along the crescent, offering beach access and a lock-up-and-leave lifestyle for buyers who prefer apartment living to a villa.",
    intro:
      "Not everyone on Palm Jumeirah wants a villa, and the island's apartments answer that demand. The Shoreline and other residences along the trunk sit close to the island's retail and dining, while the crescent is home to a growing collection of branded residences attached to five-star hotels and resorts. These homes suit buyers who want beach access and a Palm address without the upkeep of a villa and garden, whether as a lock-up-and-leave second home, a full-time residence or an income-producing asset. Apartments generally rent more actively than the larger villas, which is part of their appeal to investors.",
    keyFacts: [
      { label: "Property type", value: "Trunk and Shoreline apartments, branded residences" },
      { label: "Location", value: "Trunk and crescent of the island" },
      { label: "Lifestyle", value: "Lock-up-and-leave with beach access" },
      { label: "Amenities", value: "Resort facilities, retail and dining nearby" },
      { label: "Best for", value: "Second homes, end-users and investors" },
      { label: "Tenure", value: "Freehold, registered at Dubai Land Department" },
    ],
    faqs: [
      {
        question: "What apartments are available on Palm Jumeirah?",
        answer:
          "Palm Jumeirah offers apartments in the Shoreline and other residences along the trunk, plus branded residences along the crescent that are attached to five-star hotels and resorts. Options range from more attainable apartments to ultra-prime branded and penthouse homes.",
      },
      {
        question: "Do Palm Jumeirah apartments have beach access?",
        answer:
          "Many do. Apartment communities on the island typically provide residents with beach access alongside pools and resort-style amenities, which is a key reason buyers choose a Palm apartment over other Dubai waterfront locations.",
      },
      {
        question: "Are apartments a good alternative to a Palm villa?",
        answer:
          "For many buyers, yes. Apartments offer a Palm Jumeirah address and beach access with far less maintenance than a villa and garden, making them well suited to lock-up-and-leave second homes. They also tend to rent more actively than the larger villas, which appeals to investors.",
      },
      {
        question: "Can foreigners buy an apartment on Palm Jumeirah?",
        answer:
          "Yes. Palm Jumeirah is a designated freehold area, so non-UAE nationals can buy, own and sell apartments with full title registered at the Dubai Land Department. Purchases carry the standard one-off DLD transfer fee, and there is no annual property tax on the home.",
      },
    ],
    keywords: [
      "Palm Jumeirah apartments for sale",
      "Shoreline apartments Palm Jumeirah",
      "Palm Jumeirah branded residences",
      "beach access apartment Dubai",
      "Palm Jumeirah penthouse",
      "lock up and leave Palm Jumeirah",
    ],
    relatedLinks: [
      { label: "Palm Jumeirah", href: "/areas/palm-jumeirah" },
      { label: "Palm Jumeirah Fronds", href: "/areas/palm-jumeirah-fronds" },
      { label: "Palm Jumeirah Garden Homes", href: "/areas/palm-jumeirah-garden-homes" },
      { label: "Palm Jumeirah property investment", href: "/blog/palm-jumeirah-property-investment-2026" },
    ],
    heroImage: {
      url: "/images/palm-jumeirah/6.jpg",
      alt: "Palm Jumeirah apartment terrace with sea view and resort amenities",
      tone: "#e7e6e2",
    },
  },
  {
    slug: "al-barari",
    label: "Al Barari",
    headline: "Where Dubai exhales",
    aeoAnswer:
      "Al Barari is Dubai's greenest luxury community, a low-density enclave of custom villas and mansions set among landscaped gardens and lakes, ideal for buyers who want privacy and a nature-led lifestyle close to the city.",
    intro:
      "There is nowhere else in Dubai quite like Al Barari. In a city defined by ambition and density, this is the deliberate exception, more than 60% of the land surrendered to nature. Gardens, lakes and mature trees frame a small collection of custom villas and mansions, each opening onto green. The air is cooler, quieter, unhurried, and yet it is minutes from everything Dubai offers.",
    keyFacts: [
      { label: "Property types", value: "Custom villas & botanical mansions" },
      { label: "Typical price range", value: "AED 20M - 120M+" },
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
    aeoAnswer:
      "Jumeirah Islands is a gated community of waterfront villas set around landscaped lakes near Dubai Marina, suited to families who want established, low-rise villa living by the water.",
    intro:
      "Jumeirah Islands is a gated community of villa clusters set among landscaped, man-made lakes. Mature planting, waterfront plots and a genuine sense of community make it one of Dubai's most liveable villa addresses, architecturally varied, family-oriented, and moments from Dubai Marina and the beaches of JBR.",
    keyFacts: [
      { label: "Property types", value: "Lakeside & waterfront villas" },
      { label: "Typical price range", value: "AED 8M - 40M+" },
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
    aeoAnswer:
      "Emirates Hills is Dubai's most established gated mansion community, built around the Montgomerie golf course, and the address of choice for prominent families seeking large bespoke homes and absolute privacy.",
    intro:
      "Emirates Hills is Dubai's most established gated villa community, built around the Montgomerie golf course. Large freehold plots, fully bespoke mansions and absolute privacy make it the address of choice for the emirate's most prominent families. Supply of prime mansions is scarce, which keeps values among the highest in the city.",
    keyFacts: [
      { label: "Property types", value: "Custom mansions & villa plots" },
      { label: "Typical price range", value: "AED 30M - 300M+" },
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
    aeoAnswer:
      "Downtown Dubai is the city's central district around the Burj Khalifa and The Dubai Mall, offering branded and luxury apartments prized by investors and buyers who want walkability and enduring liquidity.",
    intro:
      "Downtown Dubai is the beating heart of the city, home to the Burj Khalifa, The Dubai Mall and the Opera District. Branded residences and high-floor apartments here command premium rents and enduring liquidity, making it one of the most resilient investment locations in Dubai.",
    keyFacts: [
      { label: "Property types", value: "Branded & luxury apartments, penthouses" },
      { label: "Typical price range", value: "AED 2.5M - 80M+" },
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
    aeoAnswer:
      "Dubai Hills Estate is a master-planned golf-and-parks community of villas, townhouses and apartments, designed for families and end-users who want green, connected living between Downtown and Dubai Marina.",
    intro:
      "Dubai Hills Estate is a master-planned community wrapped around an 18-hole championship golf course and a central park. It balances contemporary villas, townhouses and apartments with schools, healthcare and retail, and offers easy access to both Downtown and Dubai Marina.",
    keyFacts: [
      { label: "Property types", value: "Villas, townhouses, apartments" },
      { label: "Typical price range", value: "AED 2M - 60M+" },
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
    aeoAnswer:
      "Jumeirah Bay Island is an ultra-prime, seahorse-shaped island reached by a private bridge, home to the Bulgari Residences and a handful of beachfront mansions for buyers seeking trophy waterfront assets.",
    intro:
      "Shaped like a seahorse and connected to the mainland by a private bridge, Jumeirah Bay Island is one of Dubai's rarest ultra-prime addresses, home to the Bulgari Resort & Residences and a small collection of custom beachfront mansions. Scarcity and prestige place it at the very top of the market.",
    keyFacts: [
      { label: "Property types", value: "Beachfront mansions & branded residences" },
      { label: "Typical price range", value: "AED 25M - 400M+" },
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
    aeoAnswer:
      "Emaar Beachfront is a gated island community of contemporary towers between Dubai Marina and Palm Jumeirah, offering private-beach apartments and penthouses for waterfront lifestyle buyers and investors.",
    intro:
      "Emaar Beachfront is a gated island community of contemporary towers set between Dubai Marina and Palm Jumeirah, with private beach access and skyline-and-sea views. It has become one of the most sought-after addresses for waterfront apartments and penthouses.",
    keyFacts: [
      { label: "Property types", value: "Beachfront apartments & penthouses" },
      { label: "Typical price range", value: "AED 2.5M - 50M+" },
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
    relatedLinks: [
      { label: "Dubai Islands", href: "/areas/dubai-islands" },
      { label: "Jumeirah Beach Residence", href: "/areas/jumeirah-beach-residence" },
      { label: "Bluewaters Island", href: "/areas/bluewaters-island" },
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
    aeoAnswer:
      "Dubai Marina is a vibrant high-rise waterfront district built around a canal, offering a deep, liquid market of apartments and penthouses favoured by investors and lifestyle buyers seeking strong rental yields.",
    intro:
      "Dubai Marina is a vibrant, high-rise waterfront district built around a man-made canal, lined with restaurants, a promenade and yacht berths. It offers a deep, liquid market of apartments and penthouses with strong rental yields and round-the-clock energy.",
    keyFacts: [
      { label: "Property types", value: "Apartments, penthouses, some villas" },
      { label: "Typical price range", value: "AED 1.5M - 40M+" },
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
    relatedLinks: [
      { label: "Jumeirah Lake Towers", href: "/areas/jumeirah-lake-towers" },
      { label: "Jumeirah Beach Residence", href: "/areas/jumeirah-beach-residence" },
      { label: "Bluewaters Island", href: "/areas/bluewaters-island" },
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
    aeoAnswer:
      "District One, in Mohammed Bin Rashid City, is a gated, low-density community built around a crystal lagoon, offering contemporary mansions and villas minutes from Downtown Dubai.",
    intro:
      "District One, at the heart of Mohammed Bin Rashid City, is built around one of the world's largest man-made crystal lagoons. Gated and low-density, it offers contemporary mansions and villas with lagoon or skyline views, just minutes from Downtown Dubai and Meydan.",
    keyFacts: [
      { label: "Property types", value: "Contemporary mansions & villas" },
      { label: "Typical price range", value: "AED 12M - 150M+" },
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
    aeoAnswer:
      "Dubai Creek Harbour is a large Emaar waterfront district on the historic Creek, offering contemporary apartments and penthouses popular with off-plan investors seeking capital growth and skyline views.",
    intro:
      "Dubai Creek Harbour is a large master-planned waterfront destination on the historic Creek, offering contemporary apartments and penthouses with views of the skyline, the marina and the wildlife sanctuary. It is one of Emaar's flagship growth districts and a favourite for off-plan investors.",
    keyFacts: [
      { label: "Property types", value: "Apartments & penthouses" },
      { label: "Typical price range", value: "AED 1.5M - 30M+" },
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
    relatedLinks: [
      { label: "Dubai Islands", href: "/areas/dubai-islands" },
      { label: "Downtown Dubai", href: "/areas/downtown-dubai" },
      { label: "Emaar Beachfront", href: "/areas/emaar-beachfront" },
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
    aeoAnswer:
      "Business Bay is Dubai's central business and lifestyle district along the Dubai Water Canal, offering a liquid market of apartments and branded residences favoured by professionals and yield-focused investors.",
    intro:
      "Business Bay is Dubai's central business and lifestyle district, wrapped around the Dubai Water Canal and moments from Downtown. A dense mix of branded residences, offices and apartments makes it one of the most liquid rental markets in the city, popular with professionals and investors alike.",
    keyFacts: [
      { label: "Property types", value: "Apartments, branded residences, offices" },
      { label: "Typical price range", value: "AED 1.2M - 25M+" },
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
    aeoAnswer:
      "Bluewaters Island is a low-rise waterfront community anchored by Ain Dubai, offering private-beach apartments, penthouses and townhouses for buyers who want a walkable beachfront lifestyle near JBR.",
    intro:
      "Bluewaters Island is a stylish, low-rise waterfront community anchored by Ain Dubai, the world's largest observation wheel. Its residences and penthouses offer private beach access, marina views and a walkable lifestyle of dining and retail, just off the JBR coastline.",
    keyFacts: [
      { label: "Property types", value: "Apartments, penthouses, townhouses" },
      { label: "Typical price range", value: "AED 3M - 60M+" },
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
    relatedLinks: [
      { label: "Jumeirah Beach Residence", href: "/areas/jumeirah-beach-residence" },
      { label: "Dubai Marina", href: "/areas/dubai-marina" },
      { label: "Palm Jumeirah", href: "/areas/palm-jumeirah" },
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
    aeoAnswer:
      "City Walk is a low-rise, pedestrian-friendly community in central Jumeirah that blends contemporary apartments with boutique retail and dining, ideal for end-users who value walkability close to the beach and Downtown.",
    intro:
      "City Walk is a low-rise, pedestrian-friendly community in the heart of Jumeirah, blending contemporary apartments with boutique retail, dining and green boulevards. Its central location and lifestyle appeal make it a favourite for owner-occupiers who want walkability close to the beach and Downtown.",
    keyFacts: [
      { label: "Property types", value: "Low-rise apartments & penthouses" },
      { label: "Typical price range", value: "AED 1.8M - 30M+" },
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
    aeoAnswer:
      "Jumeirah Golf Estates is a gated, resort-style community set around two championship golf courses, offering villas and mansions for families and buyers who want a tranquil golf lifestyle.",
    intro:
      "Jumeirah Golf Estates is a gated, resort-style community set around two championship courses, including the DP World Tour Championship venue. Villas and mansions here look over fairways and lakes, offering a tranquil, green lifestyle with strong family appeal.",
    keyFacts: [
      { label: "Property types", value: "Villas, mansions, some apartments" },
      { label: "Typical price range", value: "AED 4M - 80M+" },
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
    aeoAnswer:
      "Arabian Ranches is one of Dubai's most established family villa communities, a low-rise master plan of villas and townhouses around a golf course, schools and parks, prized for suburban family living.",
    intro:
      "Arabian Ranches is one of Dubai's most loved family villa communities, a low-rise, desert-inspired master plan of villas and townhouses around a golf course, schools and parks. Its maturity, greenery and community feel make it a benchmark for suburban family living.",
    keyFacts: [
      { label: "Property types", value: "Villas & townhouses" },
      { label: "Typical price range", value: "AED 3M - 30M+" },
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
    aeoAnswer:
      "Tilal Al Ghaf is a contemporary master community built around a swimmable lagoon and beaches, offering in-demand villas, mansions and townhouses for buyers who want a modern, resort-style lifestyle.",
    intro:
      "Tilal Al Ghaf is a contemporary master community built around a swimmable recreational lagoon and white-sand beaches. Its signature Lanai and Alaya mansions have become some of the most in-demand new villas in Dubai, blending resort amenities with modern architecture.",
    keyFacts: [
      { label: "Property types", value: "Villas, mansions, townhouses" },
      { label: "Typical price range", value: "AED 3M - 90M+" },
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
    aeoAnswer:
      "DAMAC Hills is a large master community around the Trump International Golf Club, offering villas, townhouses and apartments with resort amenities for families and investors seeking space and value.",
    intro:
      "DAMAC Hills is a large master community centred on the Trump International Golf Club Dubai, offering villas, townhouses and apartments alongside parks, sports facilities and retail. It appeals to families and investors looking for space and amenities at accessible prices.",
    keyFacts: [
      { label: "Property types", value: "Villas, townhouses, apartments" },
      { label: "Typical price range", value: "AED 1.2M - 40M+" },
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
    relatedLinks: [
      { label: "Dubai South", href: "/areas/dubai-south" },
      { label: "DAMAC Hills 2", href: "/areas/damac-hills-2" },
      { label: "Arabian Ranches", href: "/areas/arabian-ranches" },
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
    aeoAnswer:
      "Jumeirah Park is a landscaped, family-focused villa community of generous plots near Dubai Marina and JLT, suited to families upgrading from apartments who want space and greenery.",
    intro:
      "Jumeirah Park is a landscaped, family-focused villa community of generous plots and mature greenery, centrally located near Dubai Marina, JLT and the Metro. Its large gardens and range of villa styles make it a perennial favourite with families upgrading from apartments.",
    keyFacts: [
      { label: "Property types", value: "Family villas" },
      { label: "Typical price range", value: "AED 4M - 25M+" },
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
    aeoAnswer:
      "The Meadows is an established, gated villa community of tree-lined streets and lakes within Emirates Living, offering spacious independent villas for families who want mature, upscale suburban living.",
    intro:
      "The Meadows is an established, gated villa community of tree-lined streets and lakes within Emirates Living. Spacious independent villas, mature landscaping and proximity to schools and Dubai Marina keep it consistently in demand among families.",
    keyFacts: [
      { label: "Property types", value: "Independent family villas" },
      { label: "Typical price range", value: "AED 5M - 35M+" },
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
    aeoAnswer:
      "The Springs is a gated, lakeside townhouse-and-villa community within Emirates Living, whose accessible entry prices make it one of Dubai's most popular first villa purchases for young families.",
    intro:
      "The Springs is a gated townhouse-and-villa community within Emirates Living, arranged around lakes and green walkways. Affordable entry points, a strong community feel and proximity to Dubai Marina make it one of the most popular first villa purchases in the city.",
    keyFacts: [
      { label: "Property types", value: "Townhouses & small villas" },
      { label: "Typical price range", value: "AED 2.5M - 12M+" },
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
    aeoAnswer:
      "The Lakes is a low-density, gated villa community within Emirates Living, known for calm, leafy streets and larger plots, suited to families who want space and privacy close to the city.",
    intro:
      "The Lakes is a low-density, gated villa community within Emirates Living, known for its calm, leafy streets and shimmering lakes. Larger plots and a peaceful setting beside Emirates Hills make it a discreet choice for families who want space close to the city.",
    keyFacts: [
      { label: "Property types", value: "Family villas" },
      { label: "Typical price range", value: "AED 6M - 40M+" },
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
    aeoAnswer:
      "Palm Jebel Ali is Dubai's second, larger palm-shaped island, now under development with off-plan beachfront villas and mansions for early buyers seeking ground-floor entry to a landmark waterfront destination.",
    intro:
      "Palm Jebel Ali is Dubai's second, larger palm-shaped island, now under active development with a new collection of beachfront villas and mansions. Early buyers gain ground-floor access to a landmark waterfront destination set to rival Palm Jumeirah in scale and prestige.",
    keyFacts: [
      { label: "Property types", value: "Beachfront villas & mansions (off-plan)" },
      { label: "Typical price range", value: "AED 18M - 200M+" },
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
    aeoAnswer:
      "Pearl Jumeirah is an exclusive man-made island off the historic Jumeirah coast, offering rare beachfront plots, mansions and residences for buyers who want bespoke, low-density waterfront living near the city.",
    intro:
      "Pearl Jumeirah is an exclusive man-made island off the historic Jumeirah coast, offering rare beachfront plots and custom mansions alongside the Nikki Beach Residences. Its central location and low density make it a discreet home for bespoke waterfront living.",
    keyFacts: [
      { label: "Property types", value: "Beachfront plots, mansions, residences" },
      { label: "Typical price range", value: "AED 15M - 150M+" },
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
    aeoAnswer:
      "Jumeirah Village Circle (JVC) is a fast-growing, centrally located community of apartments, townhouses and villas, popular with investors and first-time buyers for its accessible prices and strong rental yields.",
    intro:
      "Jumeirah Village Circle (JVC) is a fast-growing, centrally located community of apartments, townhouses and villas. Competitive prices and some of the strongest rental yields in Dubai have made it one of the most active investment districts in the city.",
    keyFacts: [
      { label: "Property types", value: "Apartments, townhouses, villas" },
      { label: "Typical price range", value: "AED 700K - 12M+" },
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
    aeoAnswer:
      "Port de La Mer is a Mediterranean-inspired marina community on the La Mer peninsula in Jumeirah, offering low-rise sea-view apartments and penthouses for buyers who want a beachfront lifestyle near Downtown.",
    intro:
      "Port de La Mer is a Mediterranean-inspired marina community on the La Mer peninsula in Jumeirah, offering low-rise apartments and penthouses with sea views, a yacht marina and private beach access, minutes from Downtown and the city's best beaches.",
    keyFacts: [
      { label: "Property types", value: "Apartments & penthouses" },
      { label: "Typical price range", value: "AED 2.5M - 40M+" },
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
  {
    slug: "dubai-silicon-oasis",
    label: "Dubai Silicon Oasis",
    headline: "Mid-market living in a tech-driven free zone",
    aeoAnswer:
      "Dubai Silicon Oasis is a mixed-use technology free zone in south-east Dubai, offering affordable apartments plus some villas and townhouses, suited to value buyers, families and buy-to-let investors.",
    intro:
      "Dubai Silicon Oasis is a mixed-use technology free zone in south-east Dubai that pairs affordable apartments with a smaller selection of villas and townhouses, making it a practical, value-focused address for families, professionals and buy-to-let investors. Home to a large business park, schools and everyday retail, the community is largely self-contained and well connected to Academic City and the wider road network. Its accessible entry prices and steady tenant demand have made it a popular choice for first-time buyers and yield-focused investors.",
    keyFacts: [
      { label: "Property types", value: "Apartments, villas, townhouses" },
      { label: "Setting", value: "Mixed-use technology free zone" },
      { label: "Best for", value: "Value buyers, families, buy-to-let investors" },
      { label: "Ownership", value: "Freehold, open to foreign buyers" },
      { label: "Connectivity", value: "Close to Academic City and major highways" },
    ],
    faqs: [
      {
        question: "Is Dubai Silicon Oasis a good area for investors?",
        answer:
          "Dubai Silicon Oasis appeals to investors thanks to accessible entry prices, steady tenant demand and a deep pool of professionals and families drawn by its schools, business park and everyday amenities. This combination supports reliable occupancy and makes it a popular choice for buy-to-let and first-time investors.",
      },
      {
        question: "What types of property are available in Dubai Silicon Oasis?",
        answer:
          "The community is mostly apartment-led, from studios to larger family units, alongside villa and townhouse sub-communities such as Cedre Villas. This mix lets buyers enter at a range of price points, from compact rental apartments to family homes with private gardens.",
      },
      {
        question: "Can foreigners buy property in Dubai Silicon Oasis?",
        answer:
          "Yes. Dubai Silicon Oasis is a freehold area, so non-UAE nationals can buy, own and sell apartments and villas outright, with title registered at the Dubai Land Department.",
      },
      {
        question: "Is Dubai Silicon Oasis good for families?",
        answer:
          "Dubai Silicon Oasis is well suited to families, offering schools, parks, clinics and everyday retail within a largely self-contained community. Its quiet residential streets, green spaces and value pricing make it a practical base for households wanting space without a central-Dubai premium.",
      },
    ],
    keywords: [
      "Dubai Silicon Oasis apartments for sale",
      "Dubai Silicon Oasis villas",
      "affordable property Dubai",
      "Cedre Villas Dubai Silicon Oasis",
      "DSO investment property",
      "family community Dubai Silicon Oasis",
    ],
    heroImage: {
      url: "https://images.pexels.com/photos/10569403/pexels-photo-10569403.jpeg?auto=compress&cs=tinysrgb&w=1920",
      alt: "Aerial view of a Dubai residential community with towers and greenery",
      tone: "#d8d4cc",
      credit: "Abid  Ali",
      creditUrl: "https://www.pexels.com/@abid-ali-150086727",
    },
  },
  {
    slug: "al-furjan",
    label: "Al Furjan",
    headline: "Connected mid-market villas, townhouses and apartments",
    aeoAnswer:
      "Al Furjan is a connected, mid-market community in south-west Dubai offering villas, townhouses and apartments served by its own metro stations, suited to families, commuters and mid-market investors.",
    intro:
      "Al Furjan is a popular mid-market community in south-west Dubai offering a mix of villas, townhouses and apartments within easy reach of Discovery Gardens, Dubai Marina and Ibn Battuta. Served by its own metro stations and framed by parks and low-rise streets, it appeals to families and commuters who want space and connectivity at accessible prices. Ongoing development and strong rental demand have kept it a steady choice for both end-users and investors.",
    keyFacts: [
      { label: "Property types", value: "Villas, townhouses, apartments" },
      { label: "Setting", value: "Low-rise family community" },
      { label: "Connectivity", value: "Metro stations, near Sheikh Zayed Road" },
      { label: "Best for", value: "Families, commuters, mid-market investors" },
      { label: "Ownership", value: "Freehold, open to foreign buyers" },
    ],
    faqs: [
      {
        question: "Where is Al Furjan located?",
        answer:
          "Al Furjan sits in south-west Dubai, next to Discovery Gardens and close to Jebel Ali, Dubai Marina and Ibn Battuta. It has direct metro access and quick links to Sheikh Zayed Road, giving residents an easy commute to the coast and the wider city.",
      },
      {
        question: "What types of property does Al Furjan offer?",
        answer:
          "Al Furjan offers a broad mix of villas, townhouses and apartments across several sub-communities. This range lets buyers choose between family villas with gardens, more affordable townhouses and apartment homes, all within one connected master plan.",
      },
      {
        question: "Is Al Furjan connected to the metro?",
        answer:
          "Yes. Al Furjan is served by metro stations on the Route 2020 line, which links the community towards Dubai Marina, Expo City and the wider network. This connectivity is a key reason the area is popular with commuters and tenants.",
      },
      {
        question: "Is Al Furjan a good area for families?",
        answer:
          "Al Furjan is well suited to families, with parks, community retail, mosques and nearby schools set among quiet, low-rise streets. The mix of villas and townhouses provides space and gardens, while accessible pricing and metro access add everyday convenience.",
      },
    ],
    keywords: [
      "Al Furjan villas for sale",
      "Al Furjan townhouse",
      "Al Furjan apartments",
      "property near Discovery Gardens",
      "Al Furjan metro community",
      "mid-market villa Dubai",
    ],
    heroImage: {
      url: "https://images.pexels.com/photos/10628470/pexels-photo-10628470.jpeg?auto=compress&cs=tinysrgb&w=1920",
      alt: "Row of modern townhouses in a Dubai residential community",
      tone: "#d8d4cc",
      credit: "Curtis Adams",
      creditUrl: "https://www.pexels.com/@curtis-adams-1694007",
    },
  },
  {
    slug: "discovery-gardens",
    label: "Discovery Gardens",
    headline: "Affordable, rental-focused apartment living",
    aeoAnswer:
      "Discovery Gardens is an established, affordable apartment community in south-west Dubai arranged around themed gardens, popular with renters, newcomers and first-time buy-to-let investors.",
    intro:
      "Discovery Gardens is an established, affordable apartment community in south-west Dubai, arranged around themed gardens and low-rise buildings that make it one of the city's most popular addresses for renters and first-time buyers. Its accessible prices, green landscaping and metro connectivity draw a steady stream of professionals and newcomers relocating to Dubai. High occupancy and dependable tenant demand give it a resilient buy-to-let profile.",
    keyFacts: [
      { label: "Property types", value: "Studio and apartment homes" },
      { label: "Setting", value: "Landscaped, low-rise garden clusters" },
      { label: "Connectivity", value: "Metro station, near Ibn Battuta" },
      { label: "Best for", value: "Renters, relocation, first-time investors" },
      { label: "Ownership", value: "Freehold, open to foreign buyers" },
    ],
    faqs: [
      {
        question: "Is Discovery Gardens a good place to rent or invest?",
        answer:
          "Discovery Gardens is one of Dubai's most popular affordable apartment communities, with strong tenant demand, high occupancy and accessible prices. That depth of rental demand makes it a dependable option for buy-to-let investors and a practical, budget-friendly choice for renters.",
      },
      {
        question: "What types of property are in Discovery Gardens?",
        answer:
          "The community is made up almost entirely of studios and one and two-bedroom apartments set in low-rise buildings around landscaped, themed gardens. This focus on compact, affordable homes is central to its appeal for tenants and first-time buyers.",
      },
      {
        question: "Is Discovery Gardens connected to the metro?",
        answer:
          "Yes. Discovery Gardens has its own metro station on the Route 2020 line, close to Ibn Battuta Mall and with quick access to Sheikh Zayed Road. This connectivity is a major reason the community remains popular with commuters and newcomers.",
      },
      {
        question: "Who typically lives in Discovery Gardens?",
        answer:
          "Discovery Gardens is popular with professionals, young families and newcomers relocating to Dubai, thanks to its affordability, greenery and transport links. It is often chosen as an easy first move into the city before residents buy or upgrade elsewhere.",
      },
    ],
    keywords: [
      "Discovery Gardens apartments for sale",
      "Discovery Gardens studio",
      "affordable apartment Dubai",
      "Discovery Gardens rental",
      "property near Ibn Battuta",
      "relocation apartment Dubai",
    ],
    heroImage: {
      url: "https://images.pexels.com/photos/12558848/pexels-photo-12558848.jpeg?auto=compress&cs=tinysrgb&w=1920",
      alt: "Modern low-rise residential building with palm trees in Dubai",
      tone: "#d8d4cc",
      credit: "Christopher Moon",
      creditUrl: "https://www.pexels.com/@cmoon",
    },
  },
  {
    slug: "damac-hills-2",
    label: "DAMAC Hills 2",
    headline: "Value family villas by DAMAC",
    aeoAnswer:
      "DAMAC Hills 2, formerly Akoya, is a large, value-focused family villa community by DAMAC on the city's outskirts, offering affordable villas and townhouses around water and sports amenities for families and investors.",
    intro:
      "DAMAC Hills 2, formerly known as Akoya, is a large, value-focused family villa community by DAMAC on the outskirts of Dubai, offering affordable villas and townhouses around water attractions, sports amenities and green open space. It is a distinct and more budget-friendly community to the established DAMAC Hills, aimed at families and investors seeking space and amenities at accessible price points. Its self-contained lifestyle, with retail, schools and leisure planned within the master plan, has made it a popular entry point into villa ownership.",
    keyFacts: [
      { label: "Property types", value: "Villas, townhouses, apartments" },
      { label: "Developer", value: "DAMAC Properties" },
      { label: "Formerly", value: "Akoya by DAMAC" },
      { label: "Setting", value: "Self-contained community with water and sports amenities" },
      { label: "Best for", value: "Value family living, first villa purchase" },
      { label: "Ownership", value: "Freehold, open to foreign buyers" },
    ],
    faqs: [
      {
        question: "What is the difference between DAMAC Hills 2 and DAMAC Hills?",
        answer:
          "DAMAC Hills 2, formerly Akoya, is a separate and generally more affordable master community set further from the city, while the original DAMAC Hills is built around the Trump International Golf Club closer in. Both are developed by DAMAC, but DAMAC Hills 2 is positioned as the value-focused, family villa option.",
      },
      {
        question: "Who develops DAMAC Hills 2?",
        answer:
          "DAMAC Hills 2 is developed by DAMAC Properties, one of Dubai's largest private developers, which also delivered the original DAMAC Hills. The community was launched under the Akoya name before being rebranded as DAMAC Hills 2.",
      },
      {
        question: "What types of property are in DAMAC Hills 2?",
        answer:
          "The community is led by villas and townhouses, with some apartment options, spanning a range of sizes and price points. This makes it one of the more accessible ways to buy a villa or townhouse in Dubai while still enjoying community amenities.",
      },
      {
        question: "Is DAMAC Hills 2 good for families and investors?",
        answer:
          "DAMAC Hills 2 suits families and investors looking for value, offering affordable villas and townhouses alongside water features, sports facilities, parks and planned schools and retail. Its accessible pricing and self-contained lifestyle support both owner-occupier demand and rental interest.",
      },
    ],
    keywords: [
      "DAMAC Hills 2 villas for sale",
      "DAMAC Hills 2 townhouse",
      "Akoya Dubai property",
      "affordable villa Dubai",
      "DAMAC family community",
      "DAMAC Hills 2 investment",
    ],
    relatedLinks: [
      { label: "DAMAC Hills", href: "/areas/damac-hills" },
      { label: "DAMAC Lagoons", href: "/areas/damac-lagoons" },
      { label: "DAMAC Properties (developer)", href: "/developers/damac" },
    ],
    heroImage: {
      url: "https://images.pexels.com/photos/33977060/pexels-photo-33977060.jpeg?auto=compress&cs=tinysrgb&w=1920",
      alt: "Mediterranean-style family villas with tile roofs and palm trees in Dubai",
      tone: "#d8d4cc",
      credit: "Ayrat",
      creditUrl: "https://www.pexels.com/@ayrat-244411276",
    },
  },
  {
    slug: "damac-lagoons",
    label: "DAMAC Lagoons",
    headline: "Mediterranean-themed lagoon living by DAMAC",
    aeoAnswer:
      "DAMAC Lagoons is a Mediterranean-themed, largely off-plan villa and townhouse community by DAMAC built around swimmable lagoons, suited to families and off-plan investors seeking a resort-style waterfront lifestyle.",
    intro:
      "DAMAC Lagoons is an off-plan, Mediterranean-inspired villa and townhouse community by DAMAC, arranged around swimmable lagoons, sandy shores and water-based amenities. Its clusters are themed after destinations such as Santorini, Venice and Portofino, offering families and investors modern homes with a resort-style waterfront lifestyle. As a largely off-plan development, it appeals to buyers seeking staged payment plans and capital growth potential as the master plan completes.",
    keyFacts: [
      { label: "Property types", value: "Villas & townhouses (largely off-plan)" },
      { label: "Developer", value: "DAMAC Properties" },
      { label: "Theme", value: "Mediterranean-inspired lagoon clusters" },
      { label: "Setting", value: "Swimmable lagoons and waterfront amenities" },
      { label: "Best for", value: "Off-plan buyers, families, waterfront lifestyle" },
      { label: "Ownership", value: "Freehold, open to foreign buyers" },
    ],
    faqs: [
      {
        question: "What is DAMAC Lagoons known for?",
        answer:
          "DAMAC Lagoons is known for its Mediterranean theming, with clusters inspired by destinations such as Santorini, Venice and Portofino arranged around swimmable lagoons, beaches and water-based amenities. It offers villas and townhouses in a resort-style waterfront setting.",
      },
      {
        question: "Who is the developer of DAMAC Lagoons?",
        answer:
          "DAMAC Lagoons is developed by DAMAC Properties, one of Dubai's largest private developers, which also built communities such as DAMAC Hills. The project sits alongside the wider DAMAC portfolio of master-planned lifestyle communities.",
      },
      {
        question: "What types of property does DAMAC Lagoons offer?",
        answer:
          "The community is built around villas and townhouses, released mostly off-plan across its themed clusters. Layouts and sizes vary between clusters, giving buyers a choice of family homes centred on the lagoons and their amenities.",
      },
      {
        question: "Is DAMAC Lagoons a good off-plan investment?",
        answer:
          "DAMAC Lagoons draws off-plan buyers with staged payment plans, distinctive theming and lagoon-led amenities in a growing area of Dubai. As with any off-plan purchase, returns depend on completion and market conditions, but its lifestyle positioning and DAMAC backing underpin its appeal for both end-users and investors.",
      },
    ],
    keywords: [
      "DAMAC Lagoons villas for sale",
      "DAMAC Lagoons townhouse",
      "off-plan villa Dubai",
      "Mediterranean community Dubai",
      "DAMAC Lagoons Santorini",
      "lagoon community Dubai",
    ],
    relatedLinks: [
      { label: "DAMAC Properties (developer)", href: "/developers/damac" },
      { label: "DAMAC Hills 2", href: "/areas/damac-hills-2" },
      { label: "DAMAC Hills", href: "/areas/damac-hills" },
    ],
    heroImage: {
      url: "https://images.pexels.com/photos/10647349/pexels-photo-10647349.jpeg?auto=compress&cs=tinysrgb&w=1920",
      alt: "Modern villa with swimming pool in a lagoon-themed Dubai community",
      tone: "#d8d4cc",
      credit: "Abid  Ali",
      creditUrl: "https://www.pexels.com/@abid-ali-150086727",
    },
  },
  {
    slug: "dubai-islands",
    label: "Dubai Islands",
    headline: "Beachfront island living off historic Deira",
    aeoAnswer:
      "Dubai Islands is Nakheel's waterfront master community off the Deira coastline, a group of connected islands planned around open beaches, marinas and resorts, with apartments, townhouses, villas and penthouses available largely off plan.",
    intro:
      "Dubai Islands is one of the emirate's most talked about waterfront destinations, a Nakheel master plan set across a group of connected islands just off historic Deira. The vision brings together long stretches of open beach, marinas, parks and resort hotels alongside a growing residential offer that spans apartments, townhouses, villas and penthouses. Much of the community is still off plan, which gives early buyers a wide choice of layouts, views and payment plans, and its position places residents within easy reach of Dubai International Airport, the historic Deira souks and the wider city. For buyers who want a beach address with room to grow, Dubai Islands sits at the front of the current market.",
    keyFacts: [
      { label: "Developer", value: "Nakheel" },
      { label: "Property types", value: "Apartments, townhouses, villas, penthouses" },
      { label: "Setting", value: "Connected islands with open beaches and marinas" },
      { label: "Status", value: "Largely off plan" },
      { label: "Connectivity", value: "Minutes from Dubai International Airport and Deira" },
      { label: "Tenure", value: "Freehold, registered at Dubai Land Department" },
    ],
    faqs: [
      {
        question: "Where is Dubai Islands?",
        answer:
          "Dubai Islands sits just off the Deira coastline in the north of the city, a short drive from Dubai International Airport and the historic Deira souks. It was previously known as Deira Islands before Nakheel relaunched it as Dubai Islands.",
      },
      {
        question: "What property types are available on Dubai Islands?",
        answer:
          "The master plan includes beachfront apartments, townhouses, villas and penthouses, with several off plan releases from Nakheel and other developers. Layouts and price points vary widely, so the choice suits both end users and investors.",
      },
      {
        question: "Can foreigners buy property on Dubai Islands?",
        answer:
          "Yes. Dubai Islands is a designated freehold area, so non-UAE nationals can buy, own and sell property with full title registered at the Dubai Land Department.",
      },
    ],
    keywords: [
      "Dubai Islands apartments for sale",
      "Dubai Islands property",
      "Dubai Islands villas",
      "Dubai Islands Nakheel",
      "beachfront apartments Dubai",
    ],
    relatedLinks: [
      { label: "Dubai Creek Harbour", href: "/areas/dubai-creek-harbour" },
      { label: "Emaar Beachfront", href: "/areas/emaar-beachfront" },
      { label: "Palm Jumeirah", href: "/areas/palm-jumeirah" },
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80",
      alt: "Waterfront residential district on the Dubai coastline at dusk",
      tone: "#dfe3e6",
    },
  },
  {
    slug: "jumeirah-lake-towers",
    label: "Jumeirah Lake Towers",
    headline: "Lakeside apartment living beside Dubai Marina",
    aeoAnswer:
      "Jumeirah Lake Towers, or JLT, is a large mixed use community of residential and commercial towers arranged in clusters around four landscaped lakes, offering some of the best value apartments and rental yields in central Dubai.",
    intro:
      "Jumeirah Lake Towers, known to residents simply as JLT, is one of Dubai's most established apartment communities. Its towers are arranged in clusters around four landscaped lakes, with cafes, shops and everyday services at street level and two metro stations linking it to the rest of the city. Sitting directly across Sheikh Zayed Road from Dubai Marina, it offers a similar central location at more accessible prices, which has long made it a favourite with tenants, first time buyers and yield focused investors. Homes range from studios to larger three bedroom apartments, and the community is also a DMCC free zone hub, giving it a steady daytime population and reliable rental demand.",
    keyFacts: [
      { label: "Property types", value: "Studios to 3 bedroom apartments, penthouses" },
      { label: "Setting", value: "Tower clusters around four landscaped lakes" },
      { label: "Connectivity", value: "Two metro stations, beside Dubai Marina" },
      { label: "Best for", value: "First time buyers, tenants and rental yield" },
      { label: "Tenure", value: "Freehold, registered at Dubai Land Department" },
    ],
    faqs: [
      {
        question: "Is JLT a good place to invest?",
        answer:
          "JLT is popular with investors because it offers a central location, everyday amenities and consistently strong rental demand at more accessible prices than neighbouring Dubai Marina. Apartments here have historically delivered some of the healthier rental yields in central Dubai.",
      },
      {
        question: "What is the difference between JLT and Dubai Marina?",
        answer:
          "The two communities sit opposite each other across Sheikh Zayed Road. Dubai Marina is a waterfront promenade address with a premium to match, while JLT offers lakeside towers, similar connectivity and everyday amenities at generally lower prices, which appeals to value focused buyers and tenants.",
      },
      {
        question: "Can foreigners buy apartments in JLT?",
        answer:
          "Yes. Jumeirah Lake Towers is a designated freehold area, so non-UAE nationals can buy, own and sell apartments with full title registered at the Dubai Land Department.",
      },
    ],
    keywords: [
      "JLT apartments for sale",
      "Jumeirah Lake Towers apartments",
      "flats for rent in JLT",
      "buy apartment JLT Dubai",
      "JLT property",
    ],
    relatedLinks: [
      { label: "Dubai Marina", href: "/areas/dubai-marina" },
      { label: "Jumeirah Village Circle", href: "/areas/jumeirah-village-circle" },
      { label: "Discovery Gardens", href: "/areas/discovery-gardens" },
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1920&q=80",
      alt: "Residential towers beside a landscaped lake in Dubai",
      tone: "#d9dee3",
    },
  },
  {
    slug: "jumeirah-beach-residence",
    label: "Jumeirah Beach Residence",
    headline: "Beachfront apartments on The Walk",
    aeoAnswer:
      "Jumeirah Beach Residence, or JBR, is a waterfront community of apartment and penthouse towers set along a lively public beach and promenade, prized for beachfront living, strong lifestyle amenities and high short stay rental demand.",
    intro:
      "Jumeirah Beach Residence, known as JBR, is one of Dubai's best loved beachfront addresses. A run of residential towers lines a wide public beach and two popular promenades, The Walk and The Beach, where restaurants, cafes and shops open straight onto the sand. Homes are mostly one to four bedroom apartments, with penthouses on the upper floors enjoying open sea views towards Bluewaters Island and the Ain Dubai wheel. The combination of beach, dining and a central Marina location gives JBR year round energy and consistently strong demand from both residents and holiday visitors, which makes it a favourite for lifestyle buyers and short stay investors alike.",
    keyFacts: [
      { label: "Property types", value: "1 to 4 bedroom apartments, penthouses" },
      { label: "Setting", value: "Beachfront towers on The Walk and The Beach" },
      { label: "Outlook", value: "Sea views towards Bluewaters and Ain Dubai" },
      { label: "Best for", value: "Lifestyle living and short stay rental income" },
      { label: "Tenure", value: "Freehold, registered at Dubai Land Department" },
    ],
    faqs: [
      {
        question: "What kind of property can you buy in JBR?",
        answer:
          "JBR is made up of apartment towers offering one to four bedroom homes, along with larger penthouses on the upper floors. Many enjoy direct sea views, and the beachfront position makes them popular for both living and holiday letting.",
      },
      {
        question: "Is JBR good for short stay rentals?",
        answer:
          "JBR is one of Dubai's strongest short stay locations thanks to its public beach, dining promenades and central position beside Dubai Marina and Bluewaters Island, which supports steady visitor demand throughout the year.",
      },
      {
        question: "Can foreigners buy property in JBR?",
        answer:
          "Yes. Jumeirah Beach Residence is a designated freehold area, so non-UAE nationals can buy, own and sell apartments and penthouses with full title registered at the Dubai Land Department.",
      },
    ],
    keywords: [
      "JBR apartments for sale",
      "Jumeirah Beach Residence apartments",
      "beachfront apartment Dubai",
      "JBR penthouse",
      "buy property JBR Dubai",
    ],
    relatedLinks: [
      { label: "Dubai Marina", href: "/areas/dubai-marina" },
      { label: "Bluewaters Island", href: "/areas/bluewaters-island" },
      { label: "Palm Jumeirah", href: "/areas/palm-jumeirah" },
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920&q=80",
      alt: "Beachfront apartment towers along the Dubai coast",
      tone: "#dfe3e6",
    },
  },
  {
    slug: "dubai-south",
    label: "Dubai South",
    headline: "A growing city around the new airport and Expo",
    aeoAnswer:
      "Dubai South is a master planned district in southern Dubai built around Al Maktoum International Airport and Expo City, with residential communities such as Emaar South offering well priced villas, townhouses and apartments.",
    intro:
      "Dubai South is one of the emirate's largest and fastest developing districts, planned as a full city around Al Maktoum International Airport and the site of Expo City Dubai. It brings together residential neighbourhoods, business and logistics parks and an aviation hub, all connected to central Dubai by Sheikh Zayed Road and the Expo metro line. Its best known residential community is Emaar South, a golf focused neighbourhood of villas, townhouses and apartments set around an eighteen hole championship course. With ongoing airport expansion and steady infrastructure investment nearby, Dubai South appeals to buyers looking for newer homes and long term growth potential at prices below the established coastal communities.",
    keyFacts: [
      { label: "Property types", value: "Villas, townhouses and apartments" },
      { label: "Flagship community", value: "Emaar South, around an 18 hole golf course" },
      { label: "Setting", value: "Master planned city district in southern Dubai" },
      { label: "Connectivity", value: "Al Maktoum International Airport, Expo metro, Sheikh Zayed Road" },
      { label: "Best for", value: "Newer homes and long term growth" },
      { label: "Tenure", value: "Freehold, registered at Dubai Land Department" },
    ],
    faqs: [
      {
        question: "What is Emaar South?",
        answer:
          "Emaar South is the flagship residential community within Dubai South, developed by Emaar around an eighteen hole championship golf course. It offers villas, townhouses and apartments, and is one of the most established neighbourhoods in the wider district.",
      },
      {
        question: "Is Dubai South a good place to buy?",
        answer:
          "Dubai South suits buyers who want newer homes and long term growth at more accessible prices than the coastal communities. Its position beside Al Maktoum International Airport and Expo City, along with continued infrastructure investment, underpins its longer term appeal.",
      },
      {
        question: "Can foreigners buy property in Dubai South?",
        answer:
          "Yes. The main residential communities in Dubai South, including Emaar South, are designated freehold, so non-UAE nationals can buy, own and sell property with full title registered at the Dubai Land Department.",
      },
    ],
    keywords: [
      "Emaar South villas for sale",
      "Dubai South property",
      "Dubai South townhouses",
      "Emaar South apartments",
      "Dubai South residential district",
    ],
    relatedLinks: [
      { label: "Emaar (developer)", href: "/developers/emaar" },
      { label: "DAMAC Hills", href: "/areas/damac-hills" },
      { label: "Dubai Hills Estate", href: "/areas/dubai-hills-estate" },
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80",
      alt: "Modern family villa in a Dubai golf community",
      tone: "#e3e0d9",
    },
  },
];
