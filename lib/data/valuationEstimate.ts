/**
 * Indicative valuation ranges computed from EQT's OWN sold records (first-party,
 * truthful). We group priced sales by community + property type, derive a price
 * per sqft band (25th / median / 75th percentile), and multiply by the user's
 * size to show an indicative range. A range only appears where enough real
 * comparables exist; otherwise the form simply captures the lead.
 *
 * DLD open data (Dubai Pulse dld_transactions / residential sale index) can
 * enrich or extend this later. Its API needs a Dubai Pulse OAuth key/secret
 * (account-gated), so this MVP uses our own records, which need no credentials.
 */
import type { PropertyType } from "./types";
import { getSoldRecords } from "./repository";

/** Minimum comparable sales before a range is shown (avoids noisy tiny samples). */
export const MIN_COMPARABLES = 4;

export type Benchmark = {
  perSqftP25: number;
  perSqftMedian: number;
  perSqftP75: number;
  count: number;
};

/** { [community label]: { [property type]: Benchmark } } */
export type BenchmarkMap = Record<string, Partial<Record<PropertyType, Benchmark>>>;

function percentile(sorted: number[], q: number): number {
  if (sorted.length === 0) return 0;
  const idx = Math.round(q * (sorted.length - 1));
  return sorted[Math.max(0, Math.min(sorted.length - 1, idx))];
}

/** Build the benchmark map from real sold records. Server-side only. */
export async function buildValuationBenchmarks(): Promise<BenchmarkMap> {
  const records = await getSoldRecords();
  // Group perSqft values by "areaLabel" then property type.
  const groups = new Map<string, Map<PropertyType, number[]>>();
  for (const r of records) {
    if (!r.soldPriceAed || r.soldPriceAed <= 0 || !r.areaSqft || r.areaSqft <= 0) continue;
    const perSqft = r.soldPriceAed / r.areaSqft;
    // Guard against obviously bad rows.
    if (!isFinite(perSqft) || perSqft < 200 || perSqft > 50000) continue;
    const byType = groups.get(r.areaLabel) ?? new Map<PropertyType, number[]>();
    const arr = byType.get(r.type) ?? [];
    arr.push(perSqft);
    byType.set(r.type, arr);
    groups.set(r.areaLabel, byType);
  }

  const map: BenchmarkMap = {};
  for (const [areaLabel, byType] of groups) {
    for (const [type, values] of byType) {
      if (values.length < MIN_COMPARABLES) continue;
      const sorted = [...values].sort((a, b) => a - b);
      (map[areaLabel] ??= {})[type] = {
        perSqftP25: Math.round(percentile(sorted, 0.25)),
        perSqftMedian: Math.round(percentile(sorted, 0.5)),
        perSqftP75: Math.round(percentile(sorted, 0.75)),
        count: sorted.length,
      };
    }
  }
  return map;
}

export type Estimate = { low: number; mid: number; high: number; count: number };

/** Pure, client-safe: multiply the size by the per-sqft band. Null if no benchmark. */
export function estimateFromBenchmark(
  bm: BenchmarkMap,
  community: string,
  type: string,
  sizeSqft: number,
): Estimate | null {
  if (!community || !type || !sizeSqft || sizeSqft <= 0) return null;
  const b = bm[community]?.[type as PropertyType];
  if (!b) return null;
  return {
    low: Math.round(b.perSqftP25 * sizeSqft),
    mid: Math.round(b.perSqftMedian * sizeSqft),
    high: Math.round(b.perSqftP75 * sizeSqft),
    count: b.count,
  };
}

/** Compact AED formatter, e.g. "AED 12.5M" / "AED 850K". */
export function formatAed(n: number): string {
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return `AED ${m >= 10 ? Math.round(m) : m.toFixed(1)}M`;
  }
  return `AED ${Math.round(n / 1000)}K`;
}
