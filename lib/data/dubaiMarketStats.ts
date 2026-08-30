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
  totalVolumeAed: number; // total AED transacted in the period
  avgPricePerSqftAed: number; // overall
  apartmentPricePerSqftAed?: number;
  villaPricePerSqftAed?: number;
  yoyPriceChangePct?: number; // overall YoY price change
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
export const DUBAI_MARKET: DubaiMarketIndex | null = null;
