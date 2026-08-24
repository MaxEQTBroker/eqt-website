import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPropertyTypeSlugs,
  getAreaBySlug,
  getPropertyGuideBySlug,
  queryListings,
} from "@/lib/data/repository";
import { ListingCard } from "@/components/ui/ListingCard";
import { LeadForm } from "@/components/lead/LeadForm";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EVERGREEN_GUIDES } from "@/lib/data/guideLinks";
import { hasPropertyTranslation } from "@/lib/data/i18n/propertyTranslations";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/lib/seo/jsonld";
import { site, whatsappLink } from "@/lib/site";

export async function generateStaticParams() {
  const slugs = await getAllPropertyTypeSlugs();
  return slugs.map((type) => ({ type }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; type: string }>;
}): Promise<Metadata> {
  const { type, locale } = await params;
  const guide = await getPropertyGuideBySlug(type, locale);
  if (!guide) return {};
  const translated = hasPropertyTranslation(type, locale);
  const canonical = locale === "en" ? `/property/${guide.slug}` : `/${locale}/property/${guide.slug}`;
  const languages: Record<string, string> = { "x-default": `/property/${guide.slug}`, en: `/property/${guide.slug}` };
  if (hasPropertyTranslation(type, "uk")) languages.uk = `/uk/property/${guide.slug}`;
  if (hasPropertyTranslation(type, "ru")) languages.ru = `/ru/property/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.intro.slice(0, 155),
    keywords: guide.keywords,
    alternates: { canonical, languages },
    robots: translated ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: `${guide.title}, ${site.name}`,
      description: guide.headline,
      images: [guide.heroImage.url],
    },
  };
}

export default async function PropertyTypePage({
  params,
}: {
  params: Promise<{ locale: string; type: string }>;
}) {
  const { type, locale } = await params;
  const guide = await getPropertyGuideBySlug(type, locale);
  if (!guide) notFound();

  const [listings, relatedAreas] = await Promise.all([
    guide.listingType ? queryListings({ type: guide.listingType }) : Promise.resolve([]),
    Promise.all((guide.relatedAreas ?? []).map((s) => getAreaBySlug(s))).then((r) =>
      r.filter((a): a is NonNullable<typeof a> => a !== null),
    ),
  ]);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Property types", path: "/property" },
          { name: guide.label, path: `/property/${guide.slug}` },
        ]}
      />
      <FaqJsonLd faqs={guide.faqs} />

      {/* Hero */}
      <section className="relative flex min-h-[62svh] items-end overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: guide.heroImage.tone }}>
          <Image
            src={guide.heroImage.url}
            alt={guide.heroImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[60%]"
            style={{ background: "linear-gradient(to top, rgba(227,219,200,0.96) 0%, rgba(227,219,200,0.7) 42%, rgba(227,219,200,0) 100%)" }}
          />
        </div>
        <div className="container-lux relative z-10 pb-14 pt-40">
          <h1 className="display-hero max-w-[16ch] text-ink" style={{ fontSize: "clamp(2.25rem,6vw,5rem)" }}>
            {guide.title}
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-muted">{guide.headline}</p>
          <p className="eyebrow mt-6">Property guide</p>
        </div>
      </section>

      {/* Below the hero: the lead form is a sticky LEFT rail that follows the
          whole page; every content block lives in the RIGHT column. */}
      <section className="container-lux py-[var(--section-py)]">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Property types", href: "/property" },
              { name: guide.label, href: `/property/${guide.slug}` },
            ]}
          />
        </div>
        <div className="grid gap-12 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-16 lg:items-start">
          {/* Lead form, left rail, sticky for the entire page */}
          <aside id="enquire" className="lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow mb-2">Looking for {guide.label.toLowerCase()}?</p>
            <p className="mb-4 text-sm text-muted">
              Share your brief and we&apos;ll send a private shortlist of {guide.label.toLowerCase()}
              {" "}matched to your budget and preferred communities, usually within the hour.
            </p>
            <a
              href={whatsappLink(`Hello ${site.name}, I'm looking for ${guide.label.toLowerCase()} in Dubai.`)}
              className="link-whatsapp mb-5 inline-block text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Message us on WhatsApp
            </a>
            <LeadForm source={`property:${guide.slug}`} />
          </aside>

          {/* Right column: all page content */}
          <div className="min-w-0 space-y-16">
            {/* Intro + popular searches + key facts */}
            <div>
              <Reveal>
                <p className="text-lg leading-relaxed text-muted">{guide.intro}</p>
                {guide.keywords && guide.keywords.length > 0 && (
                  <div className="mt-8">
                    <p className="eyebrow mb-3">Popular searches</p>
                    <ul className="flex flex-wrap gap-2">
                      {guide.keywords.map((kw) => (
                        <li
                          key={kw}
                          className="rounded-full border border-line bg-elevated px-4 py-1.5 text-sm text-muted"
                        >
                          {kw}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Reveal>
              <Reveal delay={100}>
                <div className="mt-10 rounded-lg border border-line bg-elevated p-8">
                  <p className="eyebrow mb-6">Key facts</p>
                  <dl className="space-y-5">
                    {guide.keyFacts.map((fact) => (
                      <div key={fact.label} className="flex flex-col gap-1 border-b border-line pb-4 last:border-0 last:pb-0">
                        <dt className="text-sm text-faint">{fact.label}</dt>
                        <dd className="text-ink">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </div>

            {/* Available listings of this type */}
            {listings.length > 0 && (
              <div className="border-t border-line pt-16">
                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                  <Reveal>
                    <p className="eyebrow mb-4">Available now</p>
                    <h2 className="display-h2 max-w-[16ch] text-ink">{guide.label} for sale</h2>
                  </Reveal>
                  <Reveal delay={100}>
                    <Link href="/listings" className="btn btn-ghost">All listings</Link>
                  </Reveal>
                </div>
                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                  {listings.map((listing, i) => (
                    <Reveal key={listing.slug} delay={(i % 2) * 90}>
                      <ListingCard listing={listing} />
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {/* Best communities for this type */}
            {relatedAreas.length > 0 && (
              <div className="border-t border-line pt-16">
                <Reveal>
                  <p className="eyebrow mb-4">Where to look</p>
                  <h2 className="display-h2 max-w-[18ch] text-ink">
                    Best communities for {guide.label.toLowerCase()}
                  </h2>
                </Reveal>
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedAreas.map((area, i) => (
                    <Reveal key={area.slug} delay={i * 80}>
                      <Link
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
                        <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ backgroundColor: "rgba(214,205,182,0.82)" }} />
                        <div className="absolute inset-x-0 bottom-0 p-6">
                          <h3 className="font-display text-xl text-ink">{area.label}</h3>
                          <p className="mt-2 text-sm text-accent-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            Explore →
                          </p>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            {guide.faqs.length > 0 && (
              <div className="border-t border-line pt-16">
                <Reveal>
                  <p className="eyebrow mb-4">Good to know</p>
                  <h2 className="display-h2 max-w-[18ch] text-ink">
                    {guide.label} in Dubai, answered
                  </h2>
                </Reveal>
                <div className="mt-10 divide-y divide-line border-y border-line">
                  {guide.faqs.map((faq) => (
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

            {/* Buyer guides, internal links (SEO). */}
            <div className="border-t border-line pt-16">
              <p className="eyebrow mb-5">Buyer guides</p>
              <ul className="divide-y divide-line border-y border-line">
                {EVERGREEN_GUIDES.map((g) => (
                  <li key={g.href}>
                    <Link
                      href={g.href}
                      className="group flex items-center justify-between gap-4 py-4 text-lg text-ink transition-colors hover:text-accent-500"
                    >
                      <span>{g.label}</span>
                      <span className="text-accent-500 transition-transform group-hover:translate-x-0.5">→</span>
                    </Link>
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
