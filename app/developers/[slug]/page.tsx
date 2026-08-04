import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllDeveloperSlugs,
  getAreaBySlug,
  getDeveloperBySlug,
} from "@/lib/data/repository";
import { LeadForm } from "@/components/lead/LeadForm";
import { Reveal } from "@/components/motion/Reveal";
import {
  BreadcrumbJsonLd,
  DeveloperJsonLd,
  FaqJsonLd,
} from "@/lib/seo/jsonld";
import { site, whatsappLink } from "@/lib/site";

export async function generateStaticParams() {
  const slugs = await getAllDeveloperSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dev = await getDeveloperBySlug(slug);
  if (!dev) return {};
  return {
    title: `${dev.name}, Developer Guide & Properties for Sale`,
    description: dev.intro.slice(0, 155),
    keywords: dev.keywords,
    alternates: { canonical: `/developers/${dev.slug}` },
    openGraph: {
      title: `${dev.name}, ${site.name}`,
      description: dev.tagline,
      images: [dev.heroImage.url],
    },
  };
}

export default async function DeveloperPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dev = await getDeveloperBySlug(slug);
  if (!dev) notFound();

  // Resolve related community labels (only those that exist as area guides).
  const relatedAreas = (
    await Promise.all((dev.relatedAreas ?? []).map((s) => getAreaBySlug(s)))
  ).filter((a): a is NonNullable<typeof a> => a !== null);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Developers", path: "/developers" },
          { name: dev.name, path: `/developers/${dev.slug}` },
        ]}
      />
      <DeveloperJsonLd developer={dev} />
      <FaqJsonLd faqs={dev.faqs} />

      {/* Hero */}
      <section className="relative flex min-h-[62svh] items-end overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: dev.heroImage.tone }}>
          <Image
            src={dev.heroImage.url}
            alt={dev.heroImage.alt}
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
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-4">Developer guide</p>
              <h1 className="display-hero max-w-[16ch] text-ink" style={{ fontSize: "clamp(2.25rem,6vw,5rem)" }}>
                {dev.name}
              </h1>
              <p className="mt-6 max-w-2xl text-xl text-muted">{dev.tagline}</p>
            </div>
            {dev.logo && (
              <div className="hidden shrink-0 items-center sm:flex">
                <Image
                  src={dev.logo}
                  alt={`${dev.name} logo`}
                  width={220}
                  height={64}
                  className="max-h-16 w-auto object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Intro + key facts */}
      <section className="container-lux py-[var(--section-py)]">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <Reveal>
            <p className="text-lg leading-relaxed text-muted">{dev.intro}</p>
            {dev.keywords && dev.keywords.length > 0 && (
              <div className="mt-8">
                <p className="eyebrow mb-3">Popular searches</p>
                <ul className="flex flex-wrap gap-2">
                  {dev.keywords.map((kw) => (
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
                {dev.keyFacts.map((fact) => (
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

      {/* Extended editorial: history, reputation, buyer guidance */}
      {dev.sections && dev.sections.length > 0 && (
        <section className="border-t border-line bg-elevated">
          <div className="container-lux py-[var(--section-py)]">
            <div className="mx-auto max-w-3xl space-y-12">
              {dev.sections.map((s) => (
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

      {/* Signature developments */}
      {dev.signature.length > 0 && (
        <section className="border-t border-line bg-elevated">
          <div className="container-lux py-[var(--section-py)]">
            <Reveal>
              <p className="eyebrow mb-4">Signature developments</p>
              <h2 className="display-h2 max-w-[18ch] text-ink">
                What {dev.name} is known for
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {dev.signature.map((item, i) => (
                <Reveal key={item} delay={(i % 3) * 80}>
                  <div className="flex items-start gap-4 rounded-lg border border-line bg-base p-6">
                    <span className="font-display text-2xl text-accent-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-ink">{item}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related communities */}
      {relatedAreas.length > 0 && (
        <section className="container-lux py-[var(--section-py)]">
          <Reveal>
            <p className="eyebrow mb-4">Where they build</p>
            <h2 className="display-h2 max-w-[18ch] text-ink">
              Communities by {dev.name}
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
      {dev.faqs.length > 0 && (
        <section className="border-t border-line bg-elevated">
          <div className="container-lux py-[var(--section-py)]">
            <Reveal>
              <p className="eyebrow mb-4">Good to know</p>
              <h2 className="display-h2 max-w-[16ch] text-ink">
                {dev.name} questions, answered
              </h2>
            </Reveal>
            <div className="mt-12 divide-y divide-line border-y border-line">
              {dev.faqs.map((faq) => (
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
          <p className="eyebrow mb-4">Interested in {dev.name}?</p>
          <h2 className="display-h2 max-w-[14ch] text-ink">
            Access {dev.name} launches &amp; resale
          </h2>
          <p className="mt-6 max-w-md text-lg text-muted">
            Tell us your brief and we&apos;ll send a private selection, from off-plan
            allocations to the best resale opportunities. Prefer to talk now?
          </p>
          <a
            href={whatsappLink(`Hello ${site.name}, I'd like to enquire about ${dev.name}.`)}
            className="link-whatsapp mt-6 inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Message us on WhatsApp
          </a>
        </Reveal>
        <Reveal delay={120}>
          <LeadForm source={`developer:${dev.slug}`} />
        </Reveal>
      </section>
    </>
  );
}
