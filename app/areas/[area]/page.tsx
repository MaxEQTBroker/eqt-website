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
          <div className="absolute inset-x-0 bottom-0 h-2/3" style={{ backgroundColor: "rgba(227,219,200,0.66)" }} />
        </div>
        <div className="container-lux relative z-10 pb-16 pt-40">
          <p className="eyebrow mb-4">Community guide</p>
          <h1 className="display-hero max-w-[16ch] text-ink" style={{ fontSize: "clamp(2.5rem,7vw,6rem)" }}>
            {area.label}
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-muted">{area.headline}</p>
        </div>
      </section>

      {/* Intro + key facts */}
      <section className="container-lux py-[var(--section-py)]">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
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
            <div className="rounded-lg border border-line bg-elevated p-8">
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
      </section>

      {/* Extended editorial: what the community is like */}
      {area.sections && area.sections.length > 0 && (
        <section className="border-t border-line bg-elevated">
          <div className="container-lux py-[var(--section-py)]">
            <div className="mx-auto max-w-3xl space-y-12">
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
          </div>
        </section>
      )}

      {/* Available listings in this area */}
      {listings.length > 0 && (
        <section className="border-t border-line bg-elevated">
          <div className="container-lux py-[var(--section-py)]">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <Reveal>
                <p className="eyebrow mb-4">Available now</p>
                <h2 className="display-h2 max-w-[16ch] text-ink">
                  Homes in {area.label}
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <Link href="/listings" className="btn btn-ghost">
                  All listings
                </Link>
              </Reveal>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing, i) => (
                <Reveal key={listing.slug} delay={(i % 3) * 90}>
                  <ListingCard listing={listing} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sold track record in this area */}
      {sold.length > 0 && (
        <section className="container-lux py-[var(--section-py)]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <p className="eyebrow mb-4">Proven in {area.label}</p>
              <h2 className="display-h2 max-w-[18ch] text-ink">Recent sales here</h2>
            </Reveal>
            <Reveal delay={100}>
              <Link href={`/sold?area=${area.slug}`} className="btn btn-ghost">
                Full track record
              </Link>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sold.map((record, i) => (
              <Reveal key={record.reference} delay={(i % 3) * 90}>
                <SoldCard record={record} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* FAQ, real Q&A, mirrored in FAQPage JSON-LD */}
      {area.faqs.length > 0 && (
        <section className="border-t border-line bg-elevated">
          <div className="container-lux py-[var(--section-py)]">
            <Reveal>
              <p className="eyebrow mb-4">Good to know</p>
              <h2 className="display-h2 max-w-[16ch] text-ink">
                {area.label} questions, answered
              </h2>
            </Reveal>
            <div className="mt-12 divide-y divide-line border-y border-line">
              {area.faqs.map((faq) => (
                <Reveal key={faq.question}>
                  <details className="group py-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-2xl text-ink">
                      {faq.question}
                      <span className="text-accent-500 transition-transform duration-300 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 max-w-3xl text-lg text-muted">{faq.answer}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Enquiry CTA, embedded lead form preselected to this community */}
      <section id="enquire" className="border-t border-line bg-elevated">
        <div className="container-lux grid gap-12 py-[var(--section-py)] lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-4">Considering {area.label}?</p>
            <h2 className="display-h2 max-w-[14ch] text-ink">
              Speak with our {area.label} specialist
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted">
              Tell us your brief and we&apos;ll respond personally, usually within the hour, with a
              private shortlist in {area.label}. Prefer to talk now?
            </p>
            <a
              href={whatsappLink(`Hello ${site.name}, I'd like to discuss ${area.label}.`)}
              className="link-whatsapp mt-6 inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Message us on WhatsApp
            </a>
          </Reveal>
          <Reveal delay={120}>
            <LeadForm defaultArea={area.label} source={`area:${area.slug}`} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
