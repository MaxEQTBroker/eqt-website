import type { Listing } from "../types";

/**
 * Available listings across EQT's real portfolio communities. Palm Jumeirah and
 * Al Barari use real photography from the brokerage's brochures; Jumeirah
 * Islands uses a flagged placeholder image pending real photos.
 *
 * Replaced later by the CRM `public_listings` view — field shapes mirror it.
 */
export const mockListings: Listing[] = [
  {
    slug: "signature-villa-frond-e-palm-jumeirah",
    reference: "EQT-PJ-1042",
    title: "Renovated Signature Villa, Frond E",
    area: "palm-jumeirah",
    areaLabel: "Palm Jumeirah",
    community: "Signature Villas",
    type: "Villa",
    status: "available",
    priceAed: 135000000,
    bedrooms: 6,
    bathrooms: 8,
    areaSqft: 12500,
    plotSqft: 14200,
    summary:
      "A fully rebuilt Signature Villa on Palm Jumeirah's Frond E with private beach and a long infinity pool facing the Marina skyline.",
    description:
      "This custom-rebuilt Signature Villa sits on one of the most sought-after fronds of Palm Jumeirah. Rebuilt to the highest specification, it offers vast entertaining spaces, a private beach, a long infinity pool facing the Marina skyline, home cinema, spa and staff accommodation. A rare turnkey trophy asset in Dubai's most recognised address.",
    highlights: [
      "Private beach frontage",
      "Full skyline & sea views",
      "Long infinity pool and landscaped gardens",
      "Home cinema, spa and gym",
      "Smart-home and staff quarters",
    ],
    images: [
      {
        url: "/images/palm-jumeirah/1.jpg",
        alt: "Modern Palm Jumeirah signature villa with long infinity pool",
        tone: "#dfe3e6",
      },
      {
        url: "/images/palm-jumeirah/3.jpg",
        alt: "Villa entrance with black marble water features and palms",
        tone: "#d9dde0",
      },
      {
        url: "/images/palm-jumeirah/5.jpg",
        alt: "Contemporary Palm Jumeirah villa exterior",
        tone: "#dfe3e6",
      },
      {
        url: "/images/palm-jumeirah/6.jpg",
        alt: "Palm Jumeirah villa with pool and sea views",
        tone: "#dfe3e6",
      },
    ],
    permitNumber: "7115551042",
    featured: true,
    updatedAt: "2026-07-20",
  },
  {
    slug: "botanical-mansion-al-barari",
    reference: "EQT-AB-2208",
    title: "Botanical Mansion with private garden, Al Barari",
    area: "al-barari",
    areaLabel: "Al Barari",
    community: "Al Barari",
    type: "Mansion",
    status: "available",
    priceAed: 62000000,
    bedrooms: 6,
    bathrooms: 8,
    areaSqft: 16000,
    plotSqft: 21000,
    summary:
      "A newly delivered contemporary mansion wrapped in mature planting, with a double-height living gallery opening onto a private landscaped garden and pool.",
    description:
      "Set within Dubai's greenest community, this contemporary mansion is enveloped by mature trees and landscaped gardens. A travertine-framed entrance opens to a double-height living gallery, a chef's kitchen, and full-height glazing that dissolves the line between inside and garden. Wellness suite, cinema and generous bedroom suites complete a home built for privacy and calm — minutes from DIFC and the Burj Khalifa.",
    highlights: [
      "Enveloped in mature landscaping",
      "Double-height living gallery",
      "Private garden, pool and lawn",
      "Wellness suite and cinema",
      "≈15 min to DIFC & Downtown",
    ],
    images: [
      {
        url: "/images/al-barari/1.jpg",
        alt: "Al Barari mansion entrance framed by palms and greenery",
        tone: "#e2e5df",
      },
      {
        url: "/images/al-barari/2.jpg",
        alt: "Travertine and glass villa entrance with landscaped steps",
        tone: "#e4e7e1",
      },
      {
        url: "/images/al-barari/3.jpg",
        alt: "Double-height living room opening onto a garden and pool",
        tone: "#e6e6e2",
      },
    ],
    permitNumber: "6529882208",
    featured: true,
    updatedAt: "2026-07-19",
  },
  {
    slug: "garden-home-frond-f-palm-jumeirah",
    reference: "EQT-PJ-1108",
    title: "Upgraded Garden Home, Frond F",
    area: "palm-jumeirah",
    areaLabel: "Palm Jumeirah",
    community: "Garden Homes",
    type: "Villa",
    status: "available",
    priceAed: 42000000,
    bedrooms: 5,
    bathrooms: 6,
    areaSqft: 8300,
    plotSqft: 9200,
    summary:
      "A tastefully upgraded Garden Home on a quiet frond, with private beach access, pool and open-plan living.",
    description:
      "A bright, tastefully upgraded Garden Home on one of Palm Jumeirah's quieter fronds. Open-plan living spaces flow to a private garden, pool and direct beach access. A turnkey home for waterfront family living in a landmark address.",
    highlights: [
      "Private beach access",
      "Upgraded open-plan interiors",
      "Garden and pool",
      "Quiet frond position",
    ],
    images: [
      {
        url: "/images/palm-jumeirah/2.jpg",
        alt: "Palm Jumeirah Garden Home exterior with pool",
        tone: "#dfe3e6",
      },
      {
        url: "/images/palm-jumeirah/4.jpg",
        alt: "Bright open-plan villa interior on Palm Jumeirah",
        tone: "#e0e3e5",
      },
      {
        url: "/images/palm-jumeirah/7.jpg",
        alt: "Palm Jumeirah villa terrace and garden",
        tone: "#dfe3e6",
      },
    ],
    permitNumber: "7115551108",
    featured: false,
    updatedAt: "2026-07-15",
  },
  {
    slug: "lakeside-villa-jumeirah-islands",
    reference: "EQT-JI-3305",
    title: "Renovated Lakeside Villa, Jumeirah Islands",
    area: "jumeirah-islands",
    areaLabel: "Jumeirah Islands",
    community: "Jumeirah Islands",
    type: "Villa",
    status: "available",
    priceAed: 22000000,
    bedrooms: 5,
    bathrooms: 6,
    areaSqft: 6800,
    plotSqft: 9000,
    summary:
      "A fully renovated villa with direct lake frontage, landscaped garden and pool in a gated waterfront community.",
    description:
      "A fully renovated family villa positioned directly on the water in Jumeirah Islands. Reconfigured for open, light-filled living, it opens onto a landscaped garden, pool and private lake frontage, within a gated, mature community moments from Dubai Marina.",
    highlights: [
      "Direct lake frontage",
      "Fully renovated interiors",
      "Landscaped garden and pool",
      "Gated, near Dubai Marina",
    ],
    // PLACEHOLDER IMAGE — no Jumeirah Islands photography yet.
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
        alt: "Contemporary waterfront villa with pool (placeholder for Jumeirah Islands)",
        tone: "#dfe4e6",
      },
    ],
    permitNumber: "7118773305",
    featured: false,
    updatedAt: "2026-07-12",
  },
];
