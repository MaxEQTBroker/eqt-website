import Link from "next/link";
import type { Area, AreaSlug } from "@/lib/data/types";

/** Price bands used for filtering — kept as clean URL tokens, not raw numbers. */
export const PRICE_BANDS = [
  { token: "all", label: "Any price", minPriceAed: undefined, maxPriceAed: undefined },
  { token: "sub-30", label: "Under AED 30M", minPriceAed: undefined, maxPriceAed: 30_000_000 },
  { token: "30-75", label: "AED 30M – 75M", minPriceAed: 30_000_000, maxPriceAed: 75_000_000 },
  { token: "75-plus", label: "AED 75M+", minPriceAed: 75_000_000, maxPriceAed: undefined },
] as const;

export type PriceBandToken = (typeof PRICE_BANDS)[number]["token"];

export function bandFromToken(token?: string) {
  return PRICE_BANDS.find((b) => b.token === token) ?? PRICE_BANDS[0];
}

/** Build a /sold URL preserving the other active filter. */
function href(area?: string, band?: string) {
  const params = new URLSearchParams();
  if (area && area !== "all") params.set("area", area);
  if (band && band !== "all") params.set("band", band);
  const qs = params.toString();
  return qs ? `/sold?${qs}` : "/sold";
}

/**
 * Server-rendered filter bar. Filters are plain links that set query params, so
 * filtering works with zero JS and every filtered view is crawlable/shareable.
 */
export function SoldFilterBar({
  areas,
  activeArea,
  activeBand,
}: {
  areas: Area[];
  activeArea: AreaSlug | "all";
  activeBand: PriceBandToken;
}) {
  const areaOptions: { token: AreaSlug | "all"; label: string }[] = [
    { token: "all", label: "All communities" },
    ...areas.map((a) => ({ token: a.slug, label: a.label })),
  ];

  return (
    <div className="space-y-6">
      <FilterRow label="Community">
        {areaOptions.map((opt) => (
          <Chip
            key={opt.token}
            active={activeArea === opt.token}
            href={href(opt.token, activeBand)}
          >
            {opt.label}
          </Chip>
        ))}
      </FilterRow>

      <FilterRow label="Price">
        {PRICE_BANDS.map((band) => (
          <Chip
            key={band.token}
            active={activeBand === band.token}
            href={href(activeArea, band.token)}
          >
            {band.label}
          </Chip>
        ))}
      </FilterRow>
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <span className="w-28 shrink-0 text-xs uppercase tracking-[0.2em] text-faint">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className="rounded-full border px-4 py-2 text-sm transition-colors duration-300"
      style={{
        borderColor: active ? "var(--accent-500)" : "var(--line)",
        backgroundColor: active ? "rgba(11,79,158,0.10)" : "transparent",
        color: active ? "var(--accent-400)" : "var(--text-secondary)",
      }}
    >
      {children}
    </Link>
  );
}
