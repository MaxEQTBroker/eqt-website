import type { SoldRecord } from "../types";

/**
 * Sold track-record across EQT's real portfolio communities. Palm Jumeirah and
 * Al Barari use real photography; Jumeirah Islands uses a flagged placeholder.
 * Replaced later by the CRM `public_sold` view.
 */
export const mockSold: SoldRecord[] = [
  {
    reference: "EQT-PJ-0981",
    title: "Signature Villa, Frond E",
    area: "palm-jumeirah",
    areaLabel: "Palm Jumeirah",
    type: "Villa",
    soldPriceAed: 110000000,
    bedrooms: 6,
    areaSqft: 11800,
    soldDate: "2026-05-12",
    image: {
      url: "/images/palm-jumeirah/1.jpg",
      alt: "Palm Jumeirah signature villa with infinity pool",
      tone: "#dfe3e6",
    },
    note: "Sold off-market for a private international family.",
  },
  {
    reference: "EQT-AB-0774",
    title: "Botanical Mansion, Al Barari",
    area: "al-barari",
    areaLabel: "Al Barari",
    type: "Mansion",
    soldPriceAed: 58000000,
    bedrooms: 6,
    areaSqft: 15500,
    soldDate: "2026-04-03",
    image: {
      url: "/images/al-barari/2.jpg",
      alt: "Al Barari mansion entrance with travertine and glass",
      tone: "#e4e7e1",
    },
    note: "Record price per sq ft in the community for 2026.",
  },
  {
    reference: "EQT-JI-0656",
    title: "Lakeside Villa, Jumeirah Islands",
    area: "jumeirah-islands",
    areaLabel: "Jumeirah Islands",
    type: "Villa",
    soldPriceAed: 19500000,
    bedrooms: 5,
    areaSqft: 6600,
    soldDate: "2026-06-01",
    // PLACEHOLDER IMAGE, no Jumeirah Islands photography yet.
    image: {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      alt: "Waterfront villa (placeholder for Jumeirah Islands)",
      tone: "#dfe4e6",
    },
    note: "Introduced a qualified buyer within one week.",
  },
  {
    reference: "EQT-PJ-0603",
    title: "Garden Home, Frond F",
    area: "palm-jumeirah",
    areaLabel: "Palm Jumeirah",
    type: "Villa",
    soldPriceAed: 41000000,
    bedrooms: 5,
    areaSqft: 8300,
    soldDate: "2026-02-08",
    image: {
      url: "/images/palm-jumeirah/5.jpg",
      alt: "Palm Jumeirah Garden Home exterior",
      tone: "#dfe3e6",
    },
    note: "Sold in 11 days at 98% of asking.",
  },
  {
    reference: "EQT-AB-0498",
    title: "Contemporary Villa, Al Barari",
    area: "al-barari",
    areaLabel: "Al Barari",
    type: "Villa",
    soldPriceAed: 34000000,
    bedrooms: 5,
    areaSqft: 11000,
    soldDate: "2026-01-22",
    image: {
      url: "/images/al-barari/3.jpg",
      alt: "Al Barari villa living room opening onto a garden",
      tone: "#e6e6e2",
    },
    note: "Confidential sale to an end-user family.",
  },
];
