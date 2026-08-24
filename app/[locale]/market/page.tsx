import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllAreaSlugs,
  getSoldRecords,
  queryListings,
} from "@/lib/data/repository";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/lib/seo/jsonld";
import { formatAed } from "@/lib/format";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dubai Luxury Property Market Insights & Prices",
  description:
    "A live snapshot of Dubai's prime property market from EQT's own inventory and verified sales: entry prices, active listings and transaction counts by community (Palm Jumeirah, Downtown, Business Bay and more).",
  keywords: [
    "Dubai luxury property prices",
    "Palm Jumeirah villa prices",
    "Dubai prime real estate market",
    "Dubai property market insights",
    "cost of property in Dubai",
  ],
  alternates: { canonical: "/market" },
};

export default async function MarketPage() {
  const [listings, sold, areaSlugs] = await Promise.all([
    queryListings({}),
    getSoldRecords(),
    getAllAreaSlugs(),
  ]);
  const areaSet = new Set(areaSlugs);

  const prices = listings
    .map((l) => l.priceAed)
    .filter((p): p is number => typeof p === "number" && p > 0)
    .sort((a, b) => a - b);
  const minAll = prices[0];
  const maxAll = prices[prices.length - 1];

  // Per-community aggregation from live inventory + verified sales.
  type Row = { label: string; slug: string; active: number; from?: number; sold: number };
  const map = new Map<string, Row>();
  for (const l of listings) {
    const key = l.areaLabel || l.area;
    const row = map.get(key) ?? { label: key, slug: l.area, active: 0, sold: 0 };
    row.active += 1;
    if (typeof l.priceAed === "number" && l.priceAed > 0) {
      row.from = row.from == null ? l.priceAed : Math.min(row.from, l.priceAed);
    }
    map.set(key, row);
  }
  const soldByLabel = new Map<string, number>();
  for (const s of sold) soldByLabel.set(s.areaLabel, (soldByLabel.get(s.areaLabel) ?? 0) + 1);
  for (const row of map.values()) row.sold = soldByLabel.get(row.label) ?? 0;

  const rows = [...map.values()].sort((a, b) => b.active - a.active || b.sold - a.sold);
  const communityCount = map.size;

  const stats = [
    { value: String(listings.length), label: "Active listings" },
    { value: String(communityCount), label: "Communities covered" },
    { value: minAll ? `from ${formatAed(minAll)}` : "On request", label: "Entry price" },
    { value: String(sold.length), label: "Verified sales (track record)" },
  ];

  const faqs = [
    {
      question: "How many luxury homes does EQT have for sale in Dubai right now?",
      answer: `EQT currently lists ${listings.length} active homes across ${communityCount} Dubai communities${minAll ? `, from ${formatAed(minAll)}` : ""}. The full, live collection is on our listings page.`,
    },
    {
      question: "What is the price range of EQT's Dubai listings?",
      answer: minAll && maxAll
        ? `Active listings currently range from ${formatAed(minAll)} to ${formatAed(maxAll)}, depending on community, size and finish.`
        : "Prices vary widely by community, size and finish; contact us for current figures.",
    },
    {
      question: "Does EQT have a verified sales track record?",
      answer: `Yes. ${sold.length} completed transactions across Dubai's prime communities are published on our Sold page. It's a verifiable record, not marketing claims.`,
    },
    {
      question: "Which Dubai communities does EQT specialise in?",
      answer: `EQT is active across ${rows.slice(0, 8).map((r) => r.label).join(", ")}${rows.length > 8 ? " and more" : ""}, all prime and super-prime addresses across the emirate.`,
    },
    {
      question: "How can I find out what my Dubai property is worth?",
      answer: "Use EQT's free, no-obligation valuation. A RERA-licensed advisor prepares a figure from real comparable sales, usually within the hour.",
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Market Insights", path: "/market" },
        ]}
      />
      <FaqJsonLd faqs={faqs} />

      {/* Hero */}
      <section className="container-lux pb-14 pt-40">
        <div className="mb-6">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Market Insights", href: "/market" }]} />
        </div>
        <p className="eyebrow mb-5">Market insights</p>
        <h1 className="display-hero max-w-[18ch] text-ink" style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)" }}>
          Dubai&apos;s prime market, in real numbers
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted">
          A live snapshot drawn from EQT&apos;s own inventory and verified transactions:
          entry prices, active supply and completed sales by community. Updated continuously,
          not quarterly guesswork.
        </p>
      </section>

      {/* Stat tiles */}
      <section className="container-lux">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="h-full bg-elevated p-7">
                <p className="font-display text-3xl text-ink lg:text-4xl">{s.value}</p>
                <p className="mt-2 text-sm text-faint">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-xs text-faint">
          Figures reflect EQT&apos;s live listings and published sold record, not the whole market.
          Indicative only; contact us for a tailored valuation or comparables.
        </p>
      </section>

      {/* Community table */}
      {rows.length > 0 && (
        <section className="container-lux py-[var(--section-py)]">
          <Reveal>
            <p className="eyebrow mb-4">By community</p>
            <h2 className="display-h2 max-w-[18ch] text-ink">Where the value is</h2>
          </Reveal>
          <div className="mt-10 overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-elevated text-xs uppercase tracking-[0.16em] text-faint">
                  <th className="px-5 py-4 font-medium">Community</th>
                  <th className="px-5 py-4 font-medium">Active listings</th>
                  <th className="px-5 py-4 font-medium">From</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className="border-b border-line last:border-0">
                    <td className="px-5 py-4 text-ink">
                      <Link
                        href={areaSet.has(r.slug) ? `/areas/${r.slug}` : `/listings?area=${r.slug}`}
                        className="transition-colors hover:text-accent-500"
                      >
                        {r.label}
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-muted">
                      <Link
                        href={`/listings?area=${r.slug}`}
                        className="text-accent-600 underline-offset-2 transition-colors hover:text-accent-500 hover:underline"
                      >
                        {r.active} {r.active === 1 ? "listing" : "listings"}
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-muted">{r.from ? formatAed(r.from) : "On request"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/listings" className="btn btn-ghost">Browse all listings</Link>
            <Link href="/sold" className="btn btn-ghost">See the full track record</Link>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="border-t border-line bg-elevated">
        <div className="container-lux py-[var(--section-py)]">
          <Reveal>
            <p className="eyebrow mb-4">Good to know</p>
            <h2 className="display-h2 max-w-[16ch] text-ink">Dubai market questions, answered</h2>
          </Reveal>
          <div className="mt-12 divide-y divide-line border-y border-line">
            {faqs.map((faq) => (
              <Reveal key={faq.question}>
                <details className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl text-ink">
                    {faq.question}
                    <span className="text-accent-500 transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 max-w-3xl text-lg text-muted">{faq.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-lux flex flex-col items-start gap-6 py-[var(--section-py)] md:flex-row md:items-center md:justify-between">
        <h2 className="display-h2 max-w-[18ch] text-ink">Want figures for your specific home?</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/valuation" className="btn btn-accent">Free valuation</Link>
          <a
            href={whatsappLink(`Hello ${site.name}, I'd like current market figures for a specific community.`)}
            className="btn btn-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ask on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
