/** Formatting helpers for prices and areas (AED / sq ft), used site-wide. */

export function formatAed(value?: number, fallback = "Price on application"): string {
  if (value == null) return fallback;
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    const trimmed = Number.isInteger(m) ? m.toString() : m.toFixed(1);
    return `AED ${trimmed}M`;
  }
  return `AED ${value.toLocaleString("en-AE")}`;
}

/** Full precision for structured data / legal contexts. */
export function formatAedFull(value?: number): string | undefined {
  if (value == null) return undefined;
  return `AED ${value.toLocaleString("en-AE")}`;
}

export function formatSqft(value: number): string {
  return `${value.toLocaleString("en-AE")} sq ft`;
}
