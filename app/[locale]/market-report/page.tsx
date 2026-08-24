import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/lib/seo/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dubai Prime Property Price Guide 2026",
  description:
    "Indicative 2026 price ranges for Dubai's prime communities, plus the key market facts (fees, tax, yields) for buyers and sellers. Compiled by EQT from public DLD data and market experience.",
  alternates: { canonical: "/market-report" },
};

/** Indicative orientation ranges (same figures published across the EQT guides).
 * These are starting points, not valuations. */
const COMMUNITIES = [
  { name: "Palm Jumeirah", from: "AED 12M", note: "Beachfront villas and sea-view apartments" },
  { name: "Emirates Hills", from: "AED 20M", note: "Gated golf-side mansions" },
  { name: "Al Barari", from: "AED 12M", note: "Low-density villas among botanical gardens" },
  { name: "Jumeirah Islands", from: "AED 8M", note: "Lake-set family villas" },
  { name: "Downtown Dubai", from: "AED 1.5M", note: "Burj Khalifa-view apartments and penthouses" },
  { name: "Dubai Marina", from: "AED 1.5M", note: "Waterfront apartments with strong liquidity" },
  { name: "Business Bay", from: "AED 1M", note: "Central, canal-side, accessible entry point" },
];

const FACTS = [
  { label: "DLD transfer fee", value: "4% of price", note: "Usually paid by the buyer" },
  { label: "Agency commission", value: "2% + 5% VAT", note: "Standard market rate" },
  { label: "Annual property tax", value: "None", note: "No annual property tax in Dubai" },
  { label: "Capital gains tax", value: "None", note: "No CGT on residential resale" },
  { label: "Prime apartment yields", value: "~5 to 7% gross", note: "Villas typically ~4 to 5%" },
  { label: "Golden Visa threshold", value: "AED 2M+", note: "Supports a 10-year renewable visa" },
];

const FAQS = [
  {
    question: "What is the most expensive area in Dubai?",
    answer:
      "Palm Jumeirah, Emirates Hills and Jumeirah Bay Island hold the highest values, where individual homes can exceed AED 100 to 200 million.",
  },
  {
    question: "Are these prices exact?",
    answer:
      "No. They are indicative starting points for orientation, compiled from public Dubai Land Department data and market experience. Actual value depends on the specific property, so request a valuation for a real figure.",
  },
  {
    question: "How can I get an accurate figure for my property?",
    answer:
      "Value it against genuine recent comparable sales recorded by the DLD. EQT prepares free, no-obligation valuations from real comparable evidence, usually within the hour.",
  },
];

export default function MarketReportPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Price Guide", path: "/market-report" },
        ]}
      />
      <FaqJsonLd faqs={FAQS} />

      <section className="container-lux pb-[var(--section-py)] pt-40">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5">Market data</p>
          <h1 className="display-hero text-ink" style={{ fontSize: "clamp(2.25rem,6vw,4rem)" }}>
            Dubai prime property price guide, 2026
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted">
            Indicative 2026 price ranges for Dubai&apos;s prime and super-prime communities, alongside
            the key facts that shape the cost of buying, owning and selling. Compiled by {site.name}
            from public Dubai Land Department data and our own market experience. These are starting
            points for orientation, not valuations.
          </p>
        </div>

        {/* Price by community */}
        <div className="mt-14 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-elevated text-faint">
                <th className="px-5 py-4 font-medium">Community</th>
                <th className="px-5 py-4 font-medium">From</th>
                <th className="px-5 py-4 font-medium">Character</th>
              </tr>
            </thead>
            <tbody>
              {COMMUNITIES.map((c) => (
                <tr key={c.name} className="border-b border-line last:border-0">
                  <td className="px-5 py-4 text-ink">{c.name}</td>
                  <td className="px-5 py-4 text-muted">{c.from}</td>
                  <td className="px-5 py-4 text-muted">{c.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key facts */}
        <div className="mt-16 max-w-3xl">
          <p className="eyebrow mb-8">The numbers that matter</p>
          <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {FACTS.map((f) => (
              <div key={f.label} className="border-t border-line pt-4">
                <dt className="text-sm text-faint">{f.label}</dt>
                <dd className="mt-1 font-display text-2xl text-ink">{f.value}</dd>
                <dd className="mt-1 text-sm text-muted">{f.note}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-wrap items-center gap-6">
          <Link href="/valuation" className="btn btn-accent">
            Request a free valuation
          </Link>
          <Link href="/market" className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
            See live market insights
          </Link>
        </div>
      </section>
    </>
  );
}
