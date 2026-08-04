import Link from "next/link";
import type { Area, AreaSlug, PropertyType } from "@/lib/data/types";

/** Price bands used for filtering, clean URL tokens, not raw numbers. */
export const LISTING_PRICE_BANDS = [
  { token: "all", label: "Any price", minPriceAed: undefined, maxPriceAed: undefined },
  { token: "sub-30", label: "Under AED 30M", minPriceAed: undefined, maxPriceAed: 30_000_000 },
  { token: "30-75", label: "AED 30M – 75M", minPriceAed: 30_000_000, maxPriceAed: 75_000_000 },
  { token: "75-plus", label: "AED 75M+", minPriceAed: 75_000_000, maxPriceAed: undefined },
] as const;

export type ListingPriceBandToken = (typeof LISTING_PRICE_BANDS)[number]["token"];

export function listingBandFromToken(token?: string) {
  return LISTING_PRICE_BANDS.find((b) => b.token === token) ?? LISTING_PRICE_BANDS[0];
}

/** Size (built-up area) bands. */
export const LISTING_SIZE_BANDS = [
  { token: "all", label: "Any size", minAreaSqft: undefined, maxAreaSqft: undefined },
  { token: "sub-1500", label: "Under 1,500 sqft", minAreaSqft: undefined, maxAreaSqft: 1500 },
  { token: "1500-3000", label: "1,500 – 3,000 sqft", minAreaSqft: 1500, maxAreaSqft: 3000 },
  { token: "3000-6000", label: "3,000 – 6,000 sqft", minAreaSqft: 3000, maxAreaSqft: 6000 },
  { token: "6000-plus", label: "6,000 sqft +", minAreaSqft: 6000, maxAreaSqft: undefined },
] as const;

export type ListingSizeToken = (typeof LISTING_SIZE_BANDS)[number]["token"];

export function listingSizeFromToken(token?: string) {
  return LISTING_SIZE_BANDS.find((b) => b.token === token) ?? LISTING_SIZE_BANDS[0];
}

export const BED_OPTIONS = [
  { value: "all", label: "Any bedrooms" },
  { value: "1", label: "1+ bedrooms" },
  { value: "2", label: "2+ bedrooms" },
  { value: "3", label: "3+ bedrooms" },
  { value: "4", label: "4+ bedrooms" },
  { value: "5", label: "5+ bedrooms" },
] as const;

const selectStyle = {
  borderColor: "var(--line)",
  backgroundColor: "var(--bg-inset)",
  color: "var(--text-primary)",
} as const;
const selectCls = "w-full rounded-md border px-3 py-2.5 text-sm";

/**
 * A GET <form> of dropdowns. Works with zero JS (pick, then "Apply"); each
 * submission produces a shareable /listings?… URL.
 */
export function ListingFilterBar({
  areas,
  types,
  activeArea,
  activeBand,
  activeType,
  activeBeds,
  activeSize,
}: {
  areas: Area[];
  types: PropertyType[];
  activeArea: AreaSlug | "all";
  activeBand: ListingPriceBandToken;
  activeType: PropertyType | "all";
  activeBeds: string;
  activeSize: ListingSizeToken;
}) {
  return (
    <form method="get" action="/listings" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Field label="Community">
        <select name="area" defaultValue={activeArea} className={selectCls} style={selectStyle}>
          <option value="all">All communities</option>
          {areas.map((a) => (
            <option key={a.slug} value={a.slug}>
              {a.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Type">
        <select name="type" defaultValue={activeType} className={selectCls} style={selectStyle}>
          <option value="all">All types</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Bedrooms">
        <select name="beds" defaultValue={activeBeds} className={selectCls} style={selectStyle}>
          {BED_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Size">
        <select name="sqft" defaultValue={activeSize} className={selectCls} style={selectStyle}>
          {LISTING_SIZE_BANDS.map((b) => (
            <option key={b.token} value={b.token}>
              {b.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Price">
        <select name="band" defaultValue={activeBand} className={selectCls} style={selectStyle}>
          {LISTING_PRICE_BANDS.map((b) => (
            <option key={b.token} value={b.token}>
              {b.label}
            </option>
          ))}
        </select>
      </Field>

      <div className="flex items-end gap-3">
        <button type="submit" className="btn btn-accent flex-1 sm:flex-none">
          Apply filters
        </button>
        <Link href="/listings" className="btn btn-ghost">
          Reset
        </Link>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-faint">{label}</span>
      {children}
    </label>
  );
}
