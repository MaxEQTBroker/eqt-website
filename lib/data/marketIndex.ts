import type { SoldRecord } from "./types";

export type AreaIndex = {
  /** Number of verified sales with a disclosed price. */
  count: number;
  totalVolumeAed: number;
  avgPriceAed: number;
  medianPriceAed: number;
  minPriceAed: number;
  maxPriceAed: number;
  /** Average AED per sq ft across records that disclose both price and size. */
  avgPerSqft: number | null;
  /** Most recent completion date in the set (ISO). */
  latestDate: string;
  byType: { type: string; count: number; avgPriceAed: number }[];
  /**
   * Price by bedroom count, computed only from sales that record a bedroom count.
   * Empty when bedrooms aren't recorded, or when fewer than two distinct bedroom
   * groups exist (nothing meaningful to compare), so the block is skipped.
   */
  byBedroom: {
    bedrooms: number;
    count: number;
    avgPriceAed: number;
    minPriceAed: number;
    maxPriceAed: number;
  }[];
  /** Sales grouped by completion year, oldest first. Empty when dates are missing. */
  byYear: { year: number; count: number; avgPriceAed: number; medianPriceAed: number }[];
  /**
   * Year-on-year change in MEDIAN price between the two most recent CONSECUTIVE
   * years that each carry at least two sales. Median + a per-year floor keep a
   * single outlier from inventing a trend. Null when not genuinely computable.
   */
  yoy: { fromYear: number; toYear: number; changePct: number } | null;
  recent: SoldRecord[];
};

/** Median of a numeric array that is already sorted ascending. */
function medianOf(sortedAsc: number[]): number {
  return sortedAsc[Math.floor((sortedAsc.length - 1) / 2)];
}

/**
 * Compute a proprietary "market index" for an area purely from EQT's own verified
 * sold records. Returns null when there aren't enough priced sales to be
 * meaningful (< minCount), so a sparse area shows nothing rather than a shaky stat.
 */
export function computeAreaIndex(sold: SoldRecord[], minCount = 3): AreaIndex | null {
  const priced = sold.filter((s) => typeof s.soldPriceAed === "number" && (s.soldPriceAed as number) > 0);
  if (priced.length < minCount) return null;

  const prices = priced.map((s) => s.soldPriceAed as number).sort((a, b) => a - b);
  const sum = prices.reduce((a, b) => a + b, 0);
  const median = medianOf(prices);

  const perSqft = priced
    .filter((s) => s.areaSqft > 0)
    .map((s) => (s.soldPriceAed as number) / s.areaSqft);
  const avgPerSqft = perSqft.length
    ? Math.round(perSqft.reduce((a, b) => a + b, 0) / perSqft.length)
    : null;

  const typeMap = new Map<string, { count: number; sum: number }>();
  for (const s of priced) {
    const t = typeMap.get(s.type) ?? { count: 0, sum: 0 };
    t.count += 1;
    t.sum += s.soldPriceAed as number;
    typeMap.set(s.type, t);
  }
  const byType = [...typeMap.entries()]
    .map(([type, v]) => ({ type, count: v.count, avgPriceAed: Math.round(v.sum / v.count) }))
    .sort((a, b) => b.count - a.count);

  // Price by bedroom count. Only priced sales that actually record bedrooms
  // (> 0) count; we skip the whole block below when fewer than two groups exist.
  const bedMap = new Map<number, number[]>();
  for (const s of priced) {
    if (typeof s.bedrooms === "number" && s.bedrooms > 0) {
      const arr = bedMap.get(s.bedrooms) ?? [];
      arr.push(s.soldPriceAed as number);
      bedMap.set(s.bedrooms, arr);
    }
  }
  const bedGroups = [...bedMap.entries()]
    .map(([bedrooms, vals]) => {
      const sorted = [...vals].sort((a, b) => a - b);
      return {
        bedrooms,
        count: sorted.length,
        avgPriceAed: Math.round(sorted.reduce((a, b) => a + b, 0) / sorted.length),
        minPriceAed: sorted[0],
        maxPriceAed: sorted[sorted.length - 1],
      };
    })
    .sort((a, b) => a.bedrooms - b.bedrooms);
  // Two or more bedroom groups make the breakdown worth showing; one group would
  // just repeat the headline average.
  const byBedroom = bedGroups.length >= 2 ? bedGroups : [];

  // Sales by completion year (median is mix-resistant, so we lean on it for YoY).
  const yearMap = new Map<number, number[]>();
  for (const s of priced) {
    const year = Number((s.soldDate || "").slice(0, 4));
    if (year > 0) {
      const arr = yearMap.get(year) ?? [];
      arr.push(s.soldPriceAed as number);
      yearMap.set(year, arr);
    }
  }
  const byYear = [...yearMap.entries()]
    .map(([year, vals]) => {
      const sorted = [...vals].sort((a, b) => a - b);
      return {
        year,
        count: sorted.length,
        avgPriceAed: Math.round(sorted.reduce((a, b) => a + b, 0) / sorted.length),
        medianPriceAed: medianOf(sorted),
      };
    })
    .sort((a, b) => a.year - b.year);

  // Year-on-year only when the two most recent years are consecutive and each
  // has >= 2 sales, so we never call a trend off a single deal.
  let yoy: AreaIndex["yoy"] = null;
  if (byYear.length >= 2) {
    const prev = byYear[byYear.length - 2];
    const last = byYear[byYear.length - 1];
    if (
      last.year - prev.year === 1 &&
      prev.count >= 2 &&
      last.count >= 2 &&
      prev.medianPriceAed > 0
    ) {
      yoy = {
        fromYear: prev.year,
        toYear: last.year,
        changePct: Math.round(((last.medianPriceAed - prev.medianPriceAed) / prev.medianPriceAed) * 100),
      };
    }
  }

  const latestDate = [...sold.map((s) => s.soldDate)].sort().at(-1) ?? "";
  const recent = [...priced].sort((a, b) => b.soldDate.localeCompare(a.soldDate)).slice(0, 6);

  return {
    count: priced.length,
    totalVolumeAed: sum,
    avgPriceAed: Math.round(sum / priced.length),
    medianPriceAed: median,
    minPriceAed: prices[0],
    maxPriceAed: prices[prices.length - 1],
    avgPerSqft,
    latestDate,
    byType,
    byBedroom,
    byYear,
    yoy,
    recent,
  };
}
