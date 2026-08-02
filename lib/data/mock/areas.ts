import type { Area } from "../types";

/**
 * Area guides for EQT's real portfolio communities. Copy is genuine, indexable
 * prose + FAQ blocks for SEO/AEO.
 *
 * Imagery: Palm Jumeirah + Al Barari use real photography from the brokerage's
 * sold-listing brochures (in /public/images). Jumeirah Islands has no photos in
 * the asset library yet — its hero image is a flagged placeholder to replace.
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
      "There is nowhere else in Dubai quite like Al Barari. In a city defined by ambition and density, this is the deliberate exception — more than 60% of the land surrendered to nature. Gardens, lakes and mature trees frame a small collection of custom villas and mansions, each opening onto green. The air is cooler, quieter, unhurried, and yet it is minutes from everything Dubai offers.",
    keyFacts: [
      { label: "Property types", value: "Custom villas & botanical mansions" },
      { label: "Typical price range", value: "AED 20M – 120M+" },
      { label: "Setting", value: "60%+ landscaped — private gardens & lakes" },
      { label: "Connectivity", value: "≈15 min to DIFC & Burj Khalifa" },
    ],
    faqs: [
      {
        question: "What is Al Barari known for?",
        answer:
          "Al Barari is Dubai's greenest luxury community — more than 60% of its land is given over to landscaped gardens, themed lakes and mature trees, surrounding a limited number of large custom villas. It is prized for privacy, low density and a nature-led lifestyle.",
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
      "Jumeirah Islands is a gated community of villa clusters set among landscaped, man-made lakes. Mature planting, waterfront plots and a genuine sense of community make it one of Dubai's most liveable villa addresses — architecturally varied, family-oriented, and moments from Dubai Marina and the beaches of JBR.",
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
    // PLACEHOLDER IMAGE (client pick JI-03) — no real Jumeirah Islands
    // photography yet. Replace with a real brochure/photo when available.
    heroImage: {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
      alt: "Contemporary luxury villa with pool (placeholder for Jumeirah Islands)",
      tone: "#e4e7e6",
    },
  },
];
