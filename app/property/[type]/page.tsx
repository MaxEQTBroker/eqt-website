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
import { BreadcrumbJsonLd, FaqJsonLd } from "@/lib/seo/jsonld";
import { site, whatsappLink } from "@/lib/site";

export async function generateStaticParams() {
  const slugs = await getAllPropertyTypeSlugs();
  return slugs.map((type) => ({ type }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const guide = await getPropertyGuideBySlug(type);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.intro.slice(0, 155),
    keywords: guide.keywords,
    alternates: { canonical: `/property/${guide.slug}` },
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
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const guide = await getPropertyGuideBySlug(type);
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
          <div className="absolute inset-x-0 bottom-0 h-2/3" style={{ backgroundColor: "rgba(227,219,200,0.68)" }} />
        </div>
        <div className="container-lux relative z-10 pb-14 pt-40">
          <p className="eyebrow mb-4">Property guide</p>
          <h1 className="display-hero max-w-[16ch] text-ink" style={{ fontSize: "clamp(2.25rem,6vw,5rem)" }}>
            {guide.title}
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-muted">{guide.headline}</p>
        </div>
      </section>

      {/* Intro + key facts */}
      <section className="container-lux py-[var(--section-py)]">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
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
            <div className="rounded-lg border border-line bg-elevated p-8">
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
      </section>

      {/* Available listings of this type */}
      {listings.length > 0 && (
        <section className="border-t border-line bg-elevated">
          <div className="container-lux py-[var(--section-py)]">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <Reveal>
                <p className="eyebrow mb-4">Available now</p>
                <h2 className="display-h2 max-w-[16ch] text-ink">{guide.label} for sale</h2>
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

      {/* Best communities for this type */}
      {relatedAreas.length > 0 && (
        <section className="container-lux py-[var(--section-py)]">
          <Reveal>
            <p className="eyebrow mb-4">Where to look</p>
            <h2 className="display-h2 max-w-[18ch] text-ink">
              Best communities for {guide.label.toLowerCase()}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        </section>
      )}

      {/* FAQ */}
      {guide.faqs.length > 0 && (
        <section className="border-t border-line bg-elevated">
          <div className="container-lux py-[var(--section-py)]">
            <Reveal>
              <p className="eyebrow mb-4">Good to know</p>
              <h2 className="display-h2 max-w-[18ch] text-ink">
                {guide.label} in Dubai, answered
              </h2>
            </Reveal>
            <div className="mt-12 divide-y divide-line border-y border-line">
              {guide.faqs.map((faq) => (
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

      {/* Enquiry CTA with embedded lead form */}
      <section id="enquire" className="container-lux grid gap-12 py-[var(--section-py)] lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow mb-4">Looking for {guide.label.toLowerCase()}?</p>
          <h2 className="display-h2 max-w-[14ch] text-ink">
            Tell us your brief
          </h2>
          <p className="mt-6 max-w-md text-lg text-muted">
            Share what you&apos;re after and we&apos;ll send a private shortlist of
            {" "}
            {guide.label.toLowerCase()} matched to your budget and preferred
            communities, usually within the hour.
          </p>
          <a
            href={whatsappLink(`Hello ${site.name}, I'm looking for ${guide.label.toLowerCase()} in Dubai.`)}
            className="link-whatsapp mt-6 inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Message us on WhatsApp
          </a>
        </Reveal>
        <Reveal delay={120}>
          <LeadForm source={`property:${guide.slug}`} />
        </Reveal>
      </section>
    </>
  );
}
