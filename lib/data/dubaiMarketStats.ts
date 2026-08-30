/**
 * Dubai market RESEARCH stats (the "EQT Dubai Market Index").
 *
 * This is the citable, extractable data that journalists and AI answer engines
 * quote: price per sq ft, year-on-year change, transaction volume, rental yield
 * and days on market, city-wide and per prime community. It is separate from the
 * live inventory shown lower on /market.
 *
 * SOURCE: figures are compiled from Dubai Land Department transaction data (e.g.
 * via dxbinteract) and are updated periodically. Fill in the numbers below, set
 * `updated` and `source`, and the market page renders the whole index plus a
 * schema.org Dataset automatically. While `DUBAI_MARKET` is null the page shows
 * only the live inventory, so no placeholder/fake numbers are ever published.
 *
 * All money is AED. Percentages are plain numbers (12 = +12%, -3 = -3%).
 */

export type CityMarketStats = {
  /** Period the figures cover, e.g. "12 months to Jun 2026" or "Q2 2026". */
  period: string;
  transactions: number; // number of sales in the period
  avgPricePerSqftAed: number; // median AED per sq ft
  medianPriceAed?: number; // median sale price
  totalVolumeAed?: number; // total AED transacted (omit if unknown)
  apartmentPricePerSqftAed?: number;
  villaPricePerSqftAed?: number;
  yoyPriceChangePct?: number; // YoY change in price per sq ft
  avgRentalYieldPct?: number; // gross
  avgDaysOnMarket?: number;
};

export type AreaMarketStat = {
  /** AreaSlug when it maps to one of our community pages, else undefined. */
  slug?: string;
  label: string; // community name shown in the table
  avgPricePerSqftAed: number;
  avgSalePriceAed?: number;
  yoyChangePct?: number;
  transactions?: number;
  rentalYieldPct?: number; // gross
  avgDaysOnMarket?: number;
};

export type DubaiMarketIndex = {
  updated: string; // ISO date the figures were compiled, e.g. "2026-08-31"
  source: string; // e.g. "Dubai Land Department (compiled via dxbinteract)"
  city: CityMarketStats;
  areas: AreaMarketStat[]; // prime communities, richest-first is fine
};

/**
 * POPULATE THIS to switch the research index on. Example shape (numbers are
 * placeholders, replace with real dxbinteract figures):
 *
 * export const DUBAI_MARKET: DubaiMarketIndex | null = {
 *   updated: "2026-08-31",
 *   source: "Dubai Land Department (compiled via dxbinteract)",
 *   city: {
 *     period: "12 months to Aug 2026",
 *     transactions: 0,
 *     totalVolumeAed: 0,
 *     avgPricePerSqftAed: 0,
 *     apartmentPricePerSqftAed: 0,
 *     villaPricePerSqftAed: 0,
 *     yoyPriceChangePct: 0,
 *     avgRentalYieldPct: 0,
 *   },
 *   areas: [
 *     { slug: "palm-jumeirah", label: "Palm Jumeirah", avgPricePerSqftAed: 0, yoyChangePct: 0, transactions: 0, rentalYieldPct: 0 },
 *     // ...one row per prime community
 *   ],
 * };
 */
export const DUBAI_MARKET: DubaiMarketIndex | null = {
  updated: "2026-08-30",
  source: "Dubai Land Department (compiled via dxbinteract)",
  city: {
    period: "12 months to Aug 2026",
    transactions: 111473,
    avgPricePerSqftAed: 1690, // median price / sq ft
    medianPriceAed: 1432000,
    yoyPriceChangePct: 0,
    avgRentalYieldPct: 7,
  },
  // Prime communities, most premium first. Figures are medians from DLD sales
  // via dxbinteract; YoY is the change in median price per sq ft. Thin-transaction
  // luxury enclaves (Jumeirah Bay, Emirates Hills) have small samples, so their
  // medians move more between periods.
  areas: [
    { slug: "jumeirah-bay-island", label: "Jumeirah Bay Island", avgPricePerSqftAed: 6720, avgSalePriceAed: 38300000, yoyChangePct: -41, transactions: 11, rentalYieldPct: 7 },
    { slug: "palm-jumeirah", label: "Palm Jumeirah", avgPricePerSqftAed: 3640, avgSalePriceAed: 6000000, yoyChangePct: 10, transactions: 777, rentalYieldPct: 6 },
    { slug: "emaar-beachfront", label: "Emaar Beachfront", avgPricePerSqftAed: 3590, avgSalePriceAed: 4100000, yoyChangePct: -3, transactions: 251, rentalYieldPct: 7 },
    { slug: "emirates-hills", label: "Emirates Hills", avgPricePerSqftAed: 3460, avgSalePriceAed: 60000000, yoyChangePct: -11, transactions: 17, rentalYieldPct: 6 },
    { slug: "district-one", label: "District One", avgPricePerSqftAed: 2860, avgSalePriceAed: 19200000, yoyChangePct: -3, transactions: 40, rentalYieldPct: 5 },
    { slug: "downtown-dubai", label: "Downtown Dubai", avgPricePerSqftAed: 2840, avgSalePriceAed: 3155000, yoyChangePct: -9, transactions: 1477, rentalYieldPct: 6 },
    { slug: "business-bay", label: "Business Bay", avgPricePerSqftAed: 2520, avgSalePriceAed: 2291000, yoyChangePct: 0, transactions: 4530, rentalYieldPct: 7 },
    { slug: "dubai-hills-estate", label: "Dubai Hills Estate", avgPricePerSqftAed: 2340, avgSalePriceAed: 2400000, yoyChangePct: -2, transactions: 1215, rentalYieldPct: 7 },
    { slug: "dubai-marina", label: "Dubai Marina", avgPricePerSqftAed: 2090, avgSalePriceAed: 2000000, yoyChangePct: -6, transactions: 1550, rentalYieldPct: 7 },
  ],
};
