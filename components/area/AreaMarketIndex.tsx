import type { AreaIndex } from "@/lib/data/marketIndex";
import { formatSqft } from "@/lib/format";
import { uiContent } from "@/lib/data/i18n/ui";

type IndexCopy = {
  eyebrow: string; heading: string; intro: string;
  statSales: string; statVolume: string; statAvg: string; statPerSqft: string; statRange: string;
  byTypeHeading: string; colType: string; colCount: string;
  recentHeading: string; colDate: string; colHome: string; colSize: string; colPrice: string;
  methodology: string; bedShort: string;
};

/** Compact AED formatter: billions -> "AED 5.1B", millions -> "AED 12M". */
function aed(v?: number): string {
  if (v == null) return "-";
  if (v >= 1_000_000_000) return `AED ${(v / 1_000_000_000).toFixed(1)}B`;
  if (v >= 1_000_000) {
    const m = v / 1_000_000;
    return `AED ${Number.isInteger(m) ? m : m.toFixed(1)}M`;
  }
  return `AED ${v.toLocaleString("en-AE")}`;
}

function fmtDate(iso: string, locale: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y) return iso;
  return new Date(Date.UTC(y, (m || 1) - 1, d || 1)).toLocaleDateString(
    locale === "uk" ? "uk-UA" : locale === "ru" ? "ru-RU" : "en-GB",
    { year: "numeric", month: "short", timeZone: "UTC" },
  );
}

/**
 * "EQT [Area] Index" — proprietary market stats built purely from EQT's own
 * verified sold records for the area. Countable, extractable proof (strong for
 * AI citation) that updates as new deals complete.
 */
export function AreaMarketIndex({
  index,
  areaLabel,
  locale,
}: {
  index: AreaIndex;
  areaLabel: string;
  locale: string;
}) {
  const c = uiContent<IndexCopy>("areaIndex", locale);
  const fill = (s: string) => s.replace(/\{area\}/g, areaLabel).replace(/\{date\}/g, fmtDate(index.latestDate, locale));

  const stats = [
    { label: c.statSales, value: `${index.count}+` },
    { label: c.statVolume, value: aed(index.totalVolumeAed) },
    { label: c.statAvg, value: aed(index.avgPriceAed) },
    ...(index.avgPerSqft ? [{ label: c.statPerSqft, value: aed(index.avgPerSqft) }] : []),
    { label: c.statRange, value: `${aed(index.minPriceAed)} - ${aed(index.maxPriceAed)}` },
  ];

  return (
    <section className="border-t border-line pt-16">
      <p className="eyebrow mb-4">{fill(c.eyebrow)}</p>
      <h2 className="display-h2 max-w-[18ch] text-ink">{fill(c.heading)}</h2>
      <p className="mt-5 max-w-2xl text-lg text-muted">{fill(c.intro)}</p>

      {/* Stat tiles */}
      <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="bg-elevated p-6">
            <p className="font-display text-2xl text-ink lg:text-[1.75rem]">{s.value}</p>
            <p className="mt-2 text-sm text-faint">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Average price by property type — only when >1 type is represented, so
          a single-type area doesn't show a one-row table that repeats the average. */}
      {index.byType.length > 1 && (
        <div className="mt-12">
          <p className="eyebrow mb-5">{c.byTypeHeading}</p>
          <div className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-elevated text-xs uppercase tracking-[0.14em] text-faint">
                  <th className="px-5 py-3 font-medium">{c.colType}</th>
                  <th className="px-5 py-3 font-medium">{c.colCount}</th>
                  <th className="px-5 py-3 font-medium">{c.statAvg}</th>
                </tr>
              </thead>
              <tbody>
                {index.byType.map((t) => (
                  <tr key={t.type} className="border-b border-line last:border-0">
                    <td className="px-5 py-3 text-ink">{t.type}</td>
                    <td className="px-5 py-3 text-muted">{t.count}</td>
                    <td className="px-5 py-3 text-ink">{aed(t.avgPriceAed)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent verified sales */}
      {index.recent.length > 0 && (
        <div className="mt-12">
          <p className="eyebrow mb-5">{c.recentHeading}</p>
          <div className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-elevated text-xs uppercase tracking-[0.14em] text-faint">
                  <th className="px-5 py-3 font-medium">{c.colDate}</th>
                  <th className="px-5 py-3 font-medium">{c.colHome}</th>
                  <th className="px-5 py-3 font-medium">{c.colSize}</th>
                  <th className="px-5 py-3 font-medium">{c.colPrice}</th>
                </tr>
              </thead>
              <tbody>
                {index.recent.map((r) => (
                  <tr key={r.reference} className="border-b border-line last:border-0">
                    <td className="px-5 py-3 text-muted">{fmtDate(r.soldDate, locale)}</td>
                    <td className="px-5 py-3 text-ink">
                      {r.bedrooms ? `${r.bedrooms} ${c.bedShort} ` : ""}{r.type}
                    </td>
                    <td className="px-5 py-3 text-muted">{r.areaSqft ? formatSqft(r.areaSqft) : "-"}</td>
                    <td className="px-5 py-3 text-ink">{r.soldPriceAed ? aed(r.soldPriceAed) : (r.priceLabel ?? "-")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="mt-6 text-xs text-faint">{fill(c.methodology)}</p>
    </section>
  );
}
