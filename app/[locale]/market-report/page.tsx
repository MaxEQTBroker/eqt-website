import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/lib/seo/jsonld";
import { uiContent, hasUiTranslation } from "@/lib/data/i18n/ui";

type MarketCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  tableCommunity: string;
  tableFrom: string;
  tableCharacter: string;
  communities: { name: string; from: string; note: string }[];
  factsHeading: string;
  facts: { label: string; value: string; note: string }[];
  faqs: { question: string; answer: string }[];
  ctaValuation: string;
  ctaMarket: string;
  breadcrumbHome: string;
  breadcrumbPriceGuide: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = uiContent<MarketCopy>("marketReport", locale);
  const translated = hasUiTranslation("marketReport", locale);
  const canonical = locale === "en" ? "/market-report" : `/${locale}/market-report`;
  const languages: Record<string, string> = { "x-default": "/market-report", en: "/market-report" };
  if (hasUiTranslation("marketReport", "uk")) languages.uk = "/uk/market-report";
  if (hasUiTranslation("marketReport", "ru")) languages.ru = "/ru/market-report";
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical, languages },
    robots: translated ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function MarketReportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = uiContent<MarketCopy>("marketReport", locale);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: c.breadcrumbHome, path: "/" },
          { name: c.breadcrumbPriceGuide, path: "/market-report" },
        ]}
      />
      <FaqJsonLd faqs={c.faqs} />

      <section className="container-lux pb-[var(--section-py)] pt-40">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5">{c.eyebrow}</p>
          <h1 className="display-hero text-ink" style={{ fontSize: "clamp(2.25rem,6vw,4rem)" }}>
            {c.h1}
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted">{c.intro}</p>
        </div>

        {/* Price by community */}
        <div className="mt-14 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-elevated text-faint">
                <th className="px-5 py-4 font-medium">{c.tableCommunity}</th>
                <th className="px-5 py-4 font-medium">{c.tableFrom}</th>
                <th className="px-5 py-4 font-medium">{c.tableCharacter}</th>
              </tr>
            </thead>
            <tbody>
              {c.communities.map((row) => (
                <tr key={row.name} className="border-b border-line last:border-0">
                  <td className="px-5 py-4 text-ink">{row.name}</td>
                  <td className="px-5 py-4 text-muted">{row.from}</td>
                  <td className="px-5 py-4 text-muted">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key facts */}
        <div className="mt-16 max-w-3xl">
          <p className="eyebrow mb-8">{c.factsHeading}</p>
          <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {c.facts.map((f) => (
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
            {c.ctaValuation}
          </Link>
          <Link href="/market" className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
            {c.ctaMarket}
          </Link>
        </div>
      </section>
    </>
  );
}
