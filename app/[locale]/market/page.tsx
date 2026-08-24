import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
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
import { uiContent, hasUiTranslation } from "@/lib/data/i18n/ui";

type MarketCopy = {
  metaTitle: string; metaDescription: string; breadcrumb: string; eyebrow: string; h1: string;
  intro: string; statActive: string; statCommunities: string; statEntry: string; statVerified: string;
  fromPrefix: string; onRequest: string; disclaimer: string; byCommunityEyebrow: string;
  byCommunityHeading: string; tableCommunity: string; tableActive: string; tableFrom: string;
  listingSingular: string; listingPlural: string; browseAll: string; seeTrackRecord: string;
  faqEyebrow: string; faqHeading: string; faqFromClause: string;
  faqs: { question: string; answer: string }[];
  ctaHeading: string; ctaValuation: string; ctaWhatsapp: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = uiContent<MarketCopy>("market", locale);
  const canonical = locale === "en" ? "/market" : `/${locale}/market`;
  const languages: Record<string, string> = { "x-default": "/market", en: "/market" };
  if (hasUiTranslation("market", "uk")) languages.uk = "/uk/market";
  if (hasUiTranslation("market", "ru")) languages.ru = "/ru/market";
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: [
      "Dubai luxury property prices",
      "Palm Jumeirah villa prices",
      "Dubai prime real estate market",
      "Dubai property market insights",
      "cost of property in Dubai",
    ],
    alternates: { canonical, languages },
    robots: hasUiTranslation("market", locale) ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function MarketPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = uiContent<MarketCopy>("market", locale);
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
    { value: String(listings.length), label: c.statActive },
    { value: String(communityCount), label: c.statCommunities },
    { value: minAll ? `${c.fromPrefix} ${formatAed(minAll)}` : c.onRequest, label: c.statEntry },
    { value: String(sold.length), label: c.statVerified },
  ];

  const fromClause = minAll ? c.faqFromClause.replace("{price}", formatAed(minAll)) : "";
  const topCommunities = rows.slice(0, 8).map((r) => r.label).join(", ") + (rows.length > 8 ? " …" : "");
  const fill = (s: string) =>
    s
      .replace("{count}", String(listings.length))
      .replace("{communityCount}", String(communityCount))
      .replace("{fromClause}", fromClause)
      .replace("{min}", minAll ? formatAed(minAll) : "")
      .replace("{max}", maxAll ? formatAed(maxAll) : "")
      .replace("{soldCount}", String(sold.length))
      .replace("{topCommunities}", topCommunities);
  const faqs = c.faqs.map((f) => ({ question: f.question, answer: fill(f.answer) }));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: c.breadcrumb, path: "/market" },
        ]}
      />
      <FaqJsonLd faqs={faqs} />

      {/* Hero */}
      <section className="container-lux pb-14 pt-40">
        <div className="mb-6">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: c.breadcrumb, href: "/market" }]} />
        </div>
        <p className="eyebrow mb-5">{c.eyebrow}</p>
        <h1 className="display-hero max-w-[18ch] text-ink" style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)" }}>
          {c.h1}
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted">{c.intro}</p>
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
        <p className="mt-4 text-xs text-faint">{c.disclaimer}</p>
      </section>

      {/* Community table */}
      {rows.length > 0 && (
        <section className="container-lux py-[var(--section-py)]">
          <Reveal>
            <p className="eyebrow mb-4">{c.byCommunityEyebrow}</p>
            <h2 className="display-h2 max-w-[18ch] text-ink">{c.byCommunityHeading}</h2>
          </Reveal>
          <div className="mt-10 overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-elevated text-xs uppercase tracking-[0.16em] text-faint">
                  <th className="px-5 py-4 font-medium">{c.tableCommunity}</th>
                  <th className="px-5 py-4 font-medium">{c.tableActive}</th>
                  <th className="px-5 py-4 font-medium">{c.tableFrom}</th>
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
                        {r.active} {r.active === 1 ? c.listingSingular : c.listingPlural}
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-muted">{r.from ? formatAed(r.from) : c.onRequest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/listings" className="btn btn-ghost">{c.browseAll}</Link>
            <Link href="/sold" className="btn btn-ghost">{c.seeTrackRecord}</Link>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="border-t border-line bg-elevated">
        <div className="container-lux py-[var(--section-py)]">
          <Reveal>
            <p className="eyebrow mb-4">{c.faqEyebrow}</p>
            <h2 className="display-h2 max-w-[16ch] text-ink">{c.faqHeading}</h2>
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
        <h2 className="display-h2 max-w-[18ch] text-ink">{c.ctaHeading}</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/valuation" className="btn btn-accent">{c.ctaValuation}</Link>
          <a
            href={whatsappLink(`Hello ${site.name}, I'd like current market figures for a specific community.`)}
            className="btn btn-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            {c.ctaWhatsapp}
          </a>
        </div>
      </section>
    </>
  );
}
