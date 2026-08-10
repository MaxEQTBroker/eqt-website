import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllAreaSlugs,
  getAreaBySlug,
  getAvailableListings,
  getSoldRecords,
} from "@/lib/data/repository";
import { ListingCard } from "@/components/ui/ListingCard";
import { SoldCard } from "@/components/ui/SoldCard";
import { LeadForm } from "@/components/lead/LeadForm";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  AreaFaqJsonLd,
  BreadcrumbJsonLd,
} from "@/lib/seo/jsonld";
import { site, whatsappLink } from "@/lib/site";

/** Statically generate every area page at build time (SSG). */
export async function generateStaticParams() {
  const slugs = await getAllAreaSlugs();
  return slugs.map((area) => ({ area }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const { area: slug } = await params;
  const area = await getAreaBySlug(slug);
  if (!area) return {};
  return {
    title: `${area.label} Property Guide, Villas & Apartments for Sale`,
    description: area.intro.slice(0, 155),
    keywords: area.keywords,
    alternates: { canonical: `/areas/${area.slug}` },
    openGraph: {
      title: `${area.label}, ${site.name}`,
      description: area.headline,
      images: [area.heroImage.url],
    },
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area: slug } = await params;
  const area = await getAreaBySlug(slug);
  if (!area) notFound();

  const [listings, sold] = await Promise.all([
    getAvailableListings(area.slug),
    getSoldRecords({ area: area.slug }),
  ]);

  // Show only the 6 most valuable recent sales here; the rest live on /sold.
  const topSold = [...sold]
    .sort((a, b) => (b.soldPriceAed ?? 0) - (a.soldPriceAed ?? 0))
    .slice(0, 6);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Communities", path: "/areas" },
          { name: area.label, path: `/areas/${area.slug}` },
        ]}
      />
      <AreaFaqJsonLd area={area} />

      {/* Hero */}
      <section className="relative flex min-h-[70svh] items-end overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: area.heroImage.tone }}>
          <Image
            src={area.heroImage.url}
            alt={area.heroImage.alt}
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
        <div className="container-lux relative z-10 pb-16 pt-40">
          <h1 className="display-hero max-w-[16ch] text-ink" style={{ fontSize: "clamp(2.5rem,7vw,6rem)" }}>
            {area.label}
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-muted">{area.headline}</p>
          <p className="eyebrow mt-6">Community guide</p>
        </div>
      </section>

      {/* Below the hero: the lead form is a sticky LEFT rail that follows the
          whole page; every content block lives in the RIGHT column. */}
      <section className="container-lux py-[var(--section-py)]">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Communities", href: "/areas" },
              { name: area.label, href: `/areas/${area.slug}` },
            ]}
          />
        </div>
        <div className="grid gap-12 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-16 lg:items-start">
          {/* Lead form, left rail, sticky for the entire page */}
          <aside id="enquire" className="lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow mb-2">Considering {area.label}?</p>
            <p className="mb-4 text-sm text-muted">
              Tell us your brief and we&apos;ll respond personally, usually within the hour,
              with a private shortlist in {area.label}.
            </p>
            <a
              href={whatsappLink(`Hello ${site.name}, I'd like to discuss ${area.label}.`)}
              className="link-whatsapp mb-5 inline-block text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Message us on WhatsApp
            </a>
            <LeadForm defaultArea={area.label} source={`area:${area.slug}`} />
          </aside>

          {/* Right column: all page content */}
          <div className="min-w-0 space-y-16">
            {/* Intro + popular searches + key facts */}
            <div>
              <Reveal>
                <p className="text-lg leading-relaxed text-muted">{area.intro}</p>
                {area.keywords && area.keywords.length > 0 && (
                  <div className="mt-8">
                    <p className="eyebrow mb-3">Popular searches</p>
                    <ul className="flex flex-wrap gap-2">
                      {area.keywords.map((kw) => (
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
                    {area.keyFacts.map((fact) => (
                      <div key={fact.label} className="flex flex-col gap-1 border-b border-line pb-4 last:border-0 last:pb-0">
                        <dt className="text-sm text-faint">{fact.label}</dt>
                        <dd className="text-ink">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </div>

            {/* Extended editorial: what the community is like */}
            {area.sections && area.sections.length > 0 && (
              <div className="space-y-12 border-t border-line pt-16">
                {area.sections.map((s) => (
                  <Reveal key={s.heading}>
                    <div>
                      <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.25rem)] leading-tight text-ink">{s.heading}</h2>
                      <div className="mt-4 space-y-4">
                        {s.body.map((p, i) => (
                          <p key={i} className="text-lg leading-relaxed text-muted">{p}</p>
                        ))}
                      </div>
                      {s.bullets && s.bullets.length > 0 && (
                        <ul className="mt-4 space-y-2.5">
                          {s.bullets.map((b, i) => (
                            <li key={i} className="flex gap-3 text-lg leading-relaxed text-muted">
                              <span className="mt-1 text-accent-500">•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            )}

            {/* Available listings in this area */}
            {listings.length > 0 && (
              <div className="border-t border-line pt-16">
                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                  <Reveal>
                    <p className="eyebrow mb-4">Available now</p>
                    <h2 className="display-h2 max-w-[16ch] text-ink">Homes in {area.label}</h2>
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

            {/* Sold track record in this area */}
            {sold.length > 0 && (
              <div className="border-t border-line pt-16">
                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                  <Reveal>
                    <p className="eyebrow mb-4">Proven in {area.label}</p>
                    <h2 className="display-h2 max-w-[18ch] text-ink">Recent sales here</h2>
                  </Reveal>
                  <Reveal delay={100}>
                    <Link href={`/sold?area=${area.slug}`} className="btn btn-ghost">Full track record</Link>
                  </Reveal>
                </div>
                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                  {topSold.map((record, i) => (
                    <Reveal key={record.reference} delay={(i % 2) * 90}>
                      <SoldCard record={record} />
                    </Reveal>
                  ))}
                </div>
                {sold.length > topSold.length && (
                  <div className="mt-10 text-center">
                    <Link href={`/sold?area=${area.slug}`} className="btn btn-accent">
                      See all {sold.length} sales in {area.label}
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* FAQ, real Q&A, mirrored in FAQPage JSON-LD */}
            {area.faqs.length > 0 && (
              <div className="border-t border-line pt-16">
                <Reveal>
                  <p className="eyebrow mb-4">Good to know</p>
                  <h2 className="display-h2 max-w-[16ch] text-ink">
                    {area.label} questions, answered
                  </h2>
                </Reveal>
                <div className="mt-10 divide-y divide-line border-y border-line">
                  {area.faqs.map((faq) => (
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
          </div>
        </div>
      </section>
    </>
  );
}
