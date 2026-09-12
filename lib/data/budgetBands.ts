/**
 * Dubai-wide "buy by budget" bands. Powers the /buy/[band] landing pages.
 *
 * Bands are half-open on price: [minAed, maxAed), except the top band which is
 * open-ended (maxAed === null). A listing/sold record with no numeric price is
 * excluded from every band (we never guess a price).
 *
 * `relatedAreas` are curated internal links; every slug here must exist in
 * lib/data/mock/areas.ts so the cross-links resolve to a real community page.
 */
import type { Listing, SoldRecord } from "./types";

export interface BudgetBand {
  /** URL segment: /buy/[slug]. */
  slug: string;
  /** Inclusive lower bound in AED. */
  minAed: number;
  /** Exclusive upper bound in AED, or null for the open-ended top band. */
  maxAed: number | null;
  /** Community slugs most associated with this budget (verified in mock/areas). */
  relatedAreas: string[];
}

export const BUDGET_BANDS: BudgetBand[] = [
  {
    slug: "under-5m",
    minAed: 0,
    maxAed: 5_000_000,
    relatedAreas: [
      "jumeirah-village-circle",
      "business-bay",
      "dubai-silicon-oasis",
      "al-furjan",
      "discovery-gardens",
    ],
  },
  {
    slug: "5m-to-15m",
    minAed: 5_000_000,
    maxAed: 15_000_000,
    relatedAreas: [
      "dubai-hills-estate",
      "dubai-marina",
      "business-bay",
      "arabian-ranches",
      "jumeirah-park",
    ],
  },
  {
    slug: "15m-to-30m",
    minAed: 15_000_000,
    maxAed: 30_000_000,
    relatedAreas: [
      "palm-jumeirah",
      "dubai-hills-estate",
      "jumeirah-islands",
      "tilal-al-ghaf",
      "emaar-beachfront",
    ],
  },
  {
    slug: "30m-plus",
    minAed: 30_000_000,
    maxAed: null,
    relatedAreas: [
      "palm-jumeirah",
      "emirates-hills",
      "al-barari",
      "district-one",
      "jumeirah-bay-island",
    ],
  },
];

export function getBudgetBand(slug: string): BudgetBand | undefined {
  return BUDGET_BANDS.find((b) => b.slug === slug);
}

export function getAllBudgetBandSlugs(): string[] {
  return BUDGET_BANDS.map((b) => b.slug);
}

/** Is a price inside the band's half-open [min, max) range? Undefined => false. */
export function priceInBand(price: number | undefined, band: BudgetBand): boolean {
  if (price == null) return false;
  if (price < band.minAed) return false;
  if (band.maxAed != null && price >= band.maxAed) return false;
  return true;
}

/** Active listings whose price falls in the band, cheapest first. */
export function filterListingsByBand(listings: Listing[], band: BudgetBand): Listing[] {
  return listings
    .filter((l) => priceInBand(l.priceAed, band))
    .sort((a, b) => (a.priceAed ?? 0) - (b.priceAed ?? 0));
}

/** Sold records whose sold price falls in the band, most valuable first. */
export function filterSoldByBand(records: SoldRecord[], band: BudgetBand): SoldRecord[] {
  return records
    .filter((s) => priceInBand(s.soldPriceAed, band))
    .sort((a, b) => (b.soldPriceAed ?? 0) - (a.soldPriceAed ?? 0));
}
