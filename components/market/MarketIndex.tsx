import type { DubaiMarketIndex } from "@/lib/data/dubaiMarketStats";
import { site } from "@/lib/site";

export type MarketIndexCopy = {
  eyebrow: string;
  heading: string;
  intro: string;
  updated: string; // "Updated {date}"
  source: string; // "Source: {source}"
  statPricePerSqft: string;
  statYoy: string;
  statTransactions: string;
  statVolume: string;
  statYield: string;
  statDaysOnMarket: string;
  statApartmentSqft: string;
  statVillaSqft: string;
  byAreaHeading: string;
  colCommunity: string;
  colPricePerSqft: string;
  colYoy: string;
  colYield: string;
  colDays: string;
  colTransactions: string;
  perSqft: string; // "/ sq ft"
  days: string; // "days"
  disclaimer: string; // "{date}" placeholder for last-updated
};

/** Compact AED: billions -> "AED 5.1B", millions -> "AED 12M", else grouped. */
function aed(v?: number): string {
  if (v == null) return "-";
  if (v >= 1_000_000_000) return `AED ${(v / 1_000_000_000).toFixed(1)}B`;
  if (v >= 1_000_000) { const m = v / 1_000_000; return `AED ${Number.isInteger(m) ? m : m.toFixed(1)}M`; }
  return `AED ${v.toLocaleString("en-AE")}`;
}
function pct(v?: number): string {
  if (v == null) return "-";
  return `${v > 0 ? "+" : ""}${v}%`;
}
function fmtDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y) return iso;
  return new Date(Date.UTC(y, (m || 1) - 1, d || 1)).toLocaleDateString("en-GB", { year: "numeric", month: "short", timeZone: "UTC" });
}

/**
 * The "EQT Dubai Market Index": research-grade stats (price per sq ft, YoY,
 * transaction volume, rental yield, days on market) city-wide and per prime
 * community. Rendered high on /market and emitted as a schema.org Dataset so AI
 * answer engines and search can extract and attribute the numbers.
 */
export function MarketIndex({ data, copy, path }: { data: DubaiMarketIndex; copy: MarketIndexCopy; path: string }) {
  const { city, areas } = data;
  const has = {
    yield: areas.some((a) => a.rentalYieldPct != null) || city.avgRentalYieldPct != null,
    days: areas.some((a) => a.avgDaysOnMarket != null) || city.avgDaysOnMarket != null,
    yoy: areas.some((a) => a.yoyChangePct != null),
    tx: areas.some((a) => a.transactions != null),
  };

  const tiles = [
    { label: copy.statPricePerSqft, value: aed(city.avgPricePerSqftAed), sub: copy.perSqft },
    ...(city.yoyPriceChangePct != null ? [{ label: copy.statYoy, value: pct(city.yoyPriceChangePct) }] : []),
    { label: copy.statTransactions, value: city.transactions.toLocaleString("en-AE") },
    { label: copy.statVolume, value: aed(city.totalVolumeAed) },
    ...(city.avgRentalYieldPct != null ? [{ label: copy.statYield, value: `${city.avgRentalYieldPct}%` }] : []),
    ...(city.avgDaysOnMarket != null ? [{ label: copy.statDaysOnMarket, value: `${city.avgDaysOnMarket} ${copy.days}` }] : []),
    ...(city.apartmentPricePerSqftAed != null ? [{ label: copy.statApartmentSqft, value: aed(city.apartmentPricePerSqftAed), sub: copy.perSqft }] : []),
    ...(city.villaPricePerSqftAed != null ? [{ label: copy.statVillaSqft, value: aed(city.villaPricePerSqftAed), sub: copy.perSqft }] : []),
  ];

  const dataset = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "EQT Dubai Market Index",
    description: `Dubai prime property market statistics for ${city.period}: average price per sq ft, year-on-year change, transaction volume and rental yield, city-wide and by community. Compiled by EQT from ${data.source}.`,
    url: `${site.url}${path}`,
    creator: { "@type": "Organization", name: site.name, url: site.url },
    isAccessibleForFree: true,
    dateModified: data.updated,
    temporalCoverage: city.period,
    variableMeasured: [
      { "@type": "PropertyValue", name: "Average price per sq ft (AED)", value: city.avgPricePerSqftAed, unitText: "AED per sq ft" },
      { "@type": "PropertyValue", name: "Transactions", value: city.transactions },
      { "@type": "PropertyValue", name: "Total transacted (AED)", value: city.totalVolumeAed, unitText: "AED" },
      ...(city.yoyPriceChangePct != null ? [{ "@type": "PropertyValue", name: "Year-on-year price change (%)", value: city.yoyPriceChangePct, unitText: "PERCENT" }] : []),
      ...(city.avgRentalYieldPct != null ? [{ "@type": "PropertyValue", name: "Average gross rental yield (%)", value: city.avgRentalYieldPct, unitText: "PERCENT" }] : []),
    ],
  };

  return (
    <section className="border-t border-line bg-elevated">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dataset) }} />
      <div className="container-lux py-[var(--section-py)]">
        <p className="eyebrow mb-4">{copy.eyebrow}</p>
        <h2 className="display-h2 max-w-[20ch] text-ink">{copy.heading}</h2>
        <p className="mt-5 max-w-2xl text-lg text-muted">{copy.intro}</p>
        <p className="mt-3 text-sm text-faint">
          {copy.updated.replace("{date}", fmtDate(data.updated))} &middot; {city.period} &middot; {copy.source.replace("{source}", data.source)}
        </p>

        {/* City stat tiles */}
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
          {tiles.map((t) => (
            <div key={t.label} className="bg-base p-6">
              <p className="font-display text-2xl text-ink lg:text-[1.75rem]">{t.value}</p>
              <p className="mt-2 text-sm text-faint">{t.label}{t.sub ? ` ${t.sub}` : ""}</p>
            </div>
          ))}
        </div>

        {/* Per-community research table */}
        {areas.length > 0 && (
          <div className="mt-12">
            <p className="eyebrow mb-5">{copy.byAreaHeading}</p>
            <div className="overflow-x-auto rounded-lg border border-line">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line bg-base text-xs uppercase tracking-[0.14em] text-faint">
                    <th className="px-5 py-3 font-medium">{copy.colCommunity}</th>
                    <th className="px-5 py-3 font-medium">{copy.colPricePerSqft}</th>
                    {has.yoy && <th className="px-5 py-3 font-medium">{copy.colYoy}</th>}
                    {has.yield && <th className="px-5 py-3 font-medium">{copy.colYield}</th>}
                    {has.days && <th className="px-5 py-3 font-medium">{copy.colDays}</th>}
                    {has.tx && <th className="px-5 py-3 font-medium">{copy.colTransactions}</th>}
                  </tr>
                </thead>
                <tbody>
                  {areas.map((a) => (
                    <tr key={a.label} className="border-b border-line last:border-0">
                      <td className="px-5 py-3 text-ink">{a.label}</td>
                      <td className="px-5 py-3 text-ink">{aed(a.avgPricePerSqftAed)}</td>
                      {has.yoy && <td className={`px-5 py-3 ${a.yoyChangePct != null && a.yoyChangePct < 0 ? "text-muted" : "text-muted"}`}>{pct(a.yoyChangePct)}</td>}
                      {has.yield && <td className="px-5 py-3 text-muted">{a.rentalYieldPct != null ? `${a.rentalYieldPct}%` : "-"}</td>}
                      {has.days && <td className="px-5 py-3 text-muted">{a.avgDaysOnMarket != null ? `${a.avgDaysOnMarket} ${copy.days}` : "-"}</td>}
                      {has.tx && <td className="px-5 py-3 text-muted">{a.transactions != null ? a.transactions.toLocaleString("en-AE") : "-"}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <p className="mt-6 text-xs text-faint">{copy.disclaimer.replace("{date}", fmtDate(data.updated))}</p>
      </div>
    </section>
  );
}
