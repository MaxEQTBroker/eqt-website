import type { Metadata } from "next";
import Image from "next/image";
import { Link as LocaleLink } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import {
  getAllBudgetBandSlugs,
  getBudgetBand,
  filterListingsByBand,
  filterSoldByBand,
} from "@/lib/data/budgetBands";
import {
  getAreaBySlug,
  getAvailableListings,
  getSoldRecords,
} from "@/lib/data/repository";
import { ListingCard } from "@/components/ui/ListingCard";
import { SoldCard } from "@/components/ui/SoldCard";
import { LeadForm } from "@/components/lead/LeadForm";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { uiContent } from "@/lib/data/i18n/ui";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/lib/seo/jsonld";
import { site, whatsappLink } from "@/lib/site";

/** Per-band copy shape (mirrored across ui-en/uk/ru.json under buyByBudget.bands). */
type BandCopy = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  sections: { heading: string; body: string[] }[];
  faqs: { question: string; answer: string }[];
};

type BuyByBudgetCopy = {
  breadcrumb: string;
  eyebrow: string;
  leadFormEyebrow: string;
  leadFormBody: string;
  whatsapp: string;
  liveListingsEyebrow: string;
  liveListingsHeading: string;
  liveListingsCta: string;
  emptyLiveNote: string;
  soldEyebrow: string;
  soldHeading: string;
  soldCta: string;
  communitiesEyebrow: string;
  communitiesHeading: string;
  faqEyebrow: string;
  faqHeading: string;
  costs: { heading: string; body: string[] };
  ctaEyebrow: string;
  ctaHeading: string;
  ctaBody: string;
  valuationLabel: string;
  listingsLabel: string;
  relatedEyebrow: string;
  bands: Record<string, BandCopy>;
};

export function generateStaticParams() {
  return getAllBudgetBandSlugs().map((band) => ({ band }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; band: string }>;
}): Promise<Metadata> {
  const { band: slug, locale } = await params;
  const band = getBudgetBand(slug);
  if (!band) return {};
  const copy = uiContent<BuyByBudgetCopy>("buyByBudget", locale);
  const c = copy.bands[slug];
  if (!c) return {};
  const canonical = locale === "en" ? `/buy/${slug}` : `/${locale}/buy/${slug}`;
  const languages: Record<string, string> = {
    "x-default": `/buy/${slug}`,
    en: `/buy/${slug}`,
    uk: `/uk/buy/${slug}`,
    ru: `/ru/buy/${slug}`,
  };
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical, languages },
    // Fully translated in all three locales, so every locale indexes.
    robots: { index: true, follow: true },
    openGraph: {
      title: `${c.title}, ${site.name}`,
      description: c.metaDescription,
    },
  };
}

export default async function BuyByBudgetPage({
  params,
}: {
  params: Promise<{ locale: string; band: string }>;
}) {
  const { band: slug, locale } = await params;
  const band = getBudgetBand(slug);
  if (!band) notFound();

  const copy = uiContent<BuyByBudgetCopy>("buyByBudget", locale);
  const c = copy.bands[slug];
  if (!c) notFound();

  const [allListings, allSold, relatedAreas] = await Promise.all([
    getAvailableListings(),
    getSoldRecords(),
    Promise.all(band.relatedAreas.map((s) => getAreaBySlug(s, locale))).then((r) =>
      r.filter((a): a is NonNullable<typeof a> => a !== null),
    ),
  ]);

  const listings = filterListingsByBand(allListings, band).slice(0, 6);
  const sold = filterSoldByBand(allSold, band).slice(0, 6);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: copy.breadcrumb, path: "/listings" },
          { name: c.title, path: `/buy/${slug}` },
        ]}
      />
      <FaqJsonLd faqs={c.faqs} />

      {/* Hero (text-only; no fabricated imagery per budget). */}
      <section className="container-lux pb-4 pt-40">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1
          className="display-hero mt-4 max-w-[18ch] text-ink"
          style={{ fontSize: "clamp(2.25rem,6vw,5rem)" }}
        >
          {c.title}
        </h1>
      </section>

      <section className="container-lux py-[var(--section-py)]">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: copy.breadcrumb, href: "/listings" },
              { name: c.title, href: `/buy/${slug}` },
            ]}
          />
        </div>
        <div className="grid gap-12 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-16 lg:items-start">
          {/* Lead form, sticky left rail. */}
          <aside id="enquire" className="lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow mb-2">{copy.leadFormEyebrow}</p>
            <p className="mb-4 text-sm text-muted">{copy.leadFormBody}</p>
            <a
              href={whatsappLink(`Hello ${site.name}, I'm looking to buy in Dubai in this budget.`)}
              className="link-whatsapp mb-5 inline-block text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.whatsapp}
            </a>
            <LeadForm source={`buy:${slug}`} initialIntent="Buy" />
          </aside>

          {/* Right column: page content. */}
          <div className="min-w-0 space-y-16">
            {/* Answer-first lead. */}
            <div>
              <Reveal>
                <p className="mb-6 border-l-2 border-accent-500 pl-5 text-xl leading-relaxed text-ink">
                  {c.lead}
                </p>
              </Reveal>
            </div>

            {/* Evergreen guide sections. */}
            {c.sections.length > 0 && (
              <div className="space-y-12 border-t border-line pt-16">
                {c.sections.map((s) => (
                  <Reveal key={s.heading}>
                    <div>
                      <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.25rem)] leading-tight text-ink">
                        {s.heading}
                      </h2>
                      <div className="mt-4 space-y-4">
                        {s.body.map((p, i) => (
                          <p key={i} className="text-lg leading-relaxed text-muted">{p}</p>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}

            {/* Live listings in this band, or a graceful note when none exist. */}
            <div className="border-t border-line pt-16">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <Reveal>
                  <p className="eyebrow mb-4">{copy.liveListingsEyebrow}</p>
                  <h2 className="display-h2 max-w-[16ch] text-ink">{copy.liveListingsHeading}</h2>
                </Reveal>
                <Reveal delay={100}>
                  <LocaleLink href="/listings" className="btn btn-ghost">{copy.liveListingsCta}</LocaleLink>
                </Reveal>
              </div>
              {listings.length > 0 ? (
                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                  {listings.map((listing, i) => (
                    <Reveal key={listing.slug} delay={(i % 2) * 90}>
                      <ListingCard listing={listing} />
                    </Reveal>
                  ))}
                </div>
              ) : (
                <Reveal>
                  <p className="mt-8 rounded-lg border border-line bg-elevated p-6 text-lg leading-relaxed text-muted">
                    {copy.emptyLiveNote}
                  </p>
                </Reveal>
              )}
            </div>

            {/* Sold comps in this band (only when we have them). */}
            {sold.length > 0 && (
              <div className="border-t border-line pt-16">
                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                  <Reveal>
                    <p className="eyebrow mb-4">{copy.soldEyebrow}</p>
                    <h2 className="display-h2 max-w-[18ch] text-ink">{copy.soldHeading}</h2>
                  </Reveal>
                  <Reveal delay={100}>
                    <LocaleLink href="/sold" className="btn btn-ghost">{copy.soldCta}</LocaleLink>
                  </Reveal>
                </div>
                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                  {sold.map((record, i) => (
                    <Reveal key={record.reference} delay={(i % 2) * 90}>
                      <SoldCard record={record} />
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {/* Standard buying costs (shared; reuses the site's stated figures). */}
            <div className="border-t border-line pt-16">
              <Reveal>
                <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.25rem)] leading-tight text-ink">
                  {copy.costs.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {copy.costs.body.map((p, i) => (
                    <p key={i} className="text-lg leading-relaxed text-muted">{p}</p>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Communities that fit this budget (internal links to area pages). */}
            {relatedAreas.length > 0 && (
              <div className="border-t border-line pt-16">
                <Reveal>
                  <p className="eyebrow mb-4">{copy.communitiesEyebrow}</p>
                  <h2 className="display-h2 max-w-[18ch] text-ink">{copy.communitiesHeading}</h2>
                </Reveal>
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedAreas.map((area, i) => (
                    <Reveal key={area.slug} delay={i * 80}>
                      <LocaleLink
                        href={`/areas/${area.slug}`}
                        className="group relative block aspect-[3/4] overflow-hidden rounded-lg"
                        style={{ backgroundColor: area.heroImage.tone }}
                      >
                        <Image
                          src={area.heroImage.url}
                          alt={area.heroImage.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, 25vw"
                          className="object-cover opacity-85 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:opacity-100"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ backgroundColor: "rgba(227,231,240,0.82)" }} />
                        <div className="absolute inset-x-0 bottom-0 p-6">
                          <h3 className="font-display text-xl text-ink">{area.label}</h3>
                        </div>
                      </LocaleLink>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ + FAQPage JSON-LD. */}
            {c.faqs.length > 0 && (
              <div className="border-t border-line pt-16">
                <Reveal>
                  <p className="eyebrow mb-4">{copy.faqEyebrow}</p>
                  <h2 className="display-h2 max-w-[18ch] text-ink">{copy.faqHeading}</h2>
                </Reveal>
                <div className="mt-10 divide-y divide-line border-y border-line">
                  {c.faqs.map((faq) => (
                    <Reveal key={faq.question}>
                      <details className="group py-6">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl text-ink">
                          {faq.question}
                          <span className="text-accent-500 transition-transform duration-300 group-open:rotate-45">
                            +
                          </span>
                        </summary>
                        <p className="mt-4 text-lg text-muted">{faq.answer}</p>
                      </details>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {/* Closing CTA: valuation + listings. */}
            <div className="border-t border-line pt-16">
              <Reveal>
                <p className="eyebrow mb-4">{copy.ctaEyebrow}</p>
                <h2 className="display-h2 max-w-[20ch] text-ink">{copy.ctaHeading}</h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{copy.ctaBody}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <LocaleLink href="/valuation" className="btn btn-accent">{copy.valuationLabel}</LocaleLink>
                  <LocaleLink href="/listings" className="btn btn-ghost">{copy.listingsLabel}</LocaleLink>
                  <a href="#enquire" className="btn btn-ghost">{copy.leadFormEyebrow}</a>
                </div>
              </Reveal>
            </div>

            {/* Explore the other budgets (internal cross-links across the cluster). */}
            <div className="border-t border-line pt-16">
              <p className="eyebrow mb-5">{copy.relatedEyebrow}</p>
              <ul className="divide-y divide-line border-y border-line">
                {getAllBudgetBandSlugs()
                  .filter((s) => s !== slug)
                  .map((s) => (
                    <li key={s}>
                      <LocaleLink
                        href={`/buy/${s}`}
                        className="group flex items-center justify-between gap-4 py-4 text-lg text-ink transition-colors hover:text-accent-500"
                      >
                        <span>{copy.bands[s]?.title ?? s}</span>
                        <span className="text-accent-500 transition-transform group-hover:translate-x-0.5">→</span>
                      </LocaleLink>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
