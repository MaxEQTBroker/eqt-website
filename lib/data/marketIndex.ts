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
  recent: SoldRecord[];
};

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
  const median = prices[Math.floor((prices.length - 1) / 2)];

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
    recent,
  };
}
