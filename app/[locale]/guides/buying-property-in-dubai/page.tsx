import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/lib/seo/jsonld";
import { site, whatsappLink } from "@/lib/site";
import { uiContent, hasUiTranslation } from "@/lib/data/i18n/ui";

type GuideCopy = {
  metaTitle: string;
  metaDescription: string;
  breadcrumb: string;
  breadcrumbShort: string;
  eyebrow: string;
  h1: string;
  intro: string;
  readGuide: string;
  groups: { title: string; blurb: string; items: { title: string; href: string; desc: string }[] }[];
  faqs: { question: string; answer: string }[];
  faqEyebrow: string;
  faqHeading: string;
  ctaHeading: string;
  ctaValuation: string;
  ctaListings: string;
  ctaWhatsapp: string;
};

const SLUG = "guidesBuying";
const PATH = "/guides/buying-property-in-dubai";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = uiContent<GuideCopy>(SLUG, locale);
  const canonical = locale === "en" ? PATH : `/${locale}${PATH}`;
  const languages: Record<string, string> = { "x-default": PATH, en: PATH };
  if (hasUiTranslation(SLUG, "uk")) languages.uk = `/uk${PATH}`;
  if (hasUiTranslation(SLUG, "ru")) languages.ru = `/ru${PATH}`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: [
      "buying property in Dubai",
      "Dubai property guide",
      "how to buy property in Dubai",
      "Dubai real estate guide 2026",
    ],
    alternates: { canonical, languages },
    robots: hasUiTranslation(SLUG, locale) ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function BuyingGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = uiContent<GuideCopy>(SLUG, locale);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: c.breadcrumb, path: PATH },
        ]}
      />
      <FaqJsonLd faqs={c.faqs} />

      <section className="container-lux pb-14 pt-40">
        <div className="mb-6">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: c.breadcrumbShort, href: PATH }]} />
        </div>
        <p className="eyebrow mb-5">{c.eyebrow}</p>
        <h1 className="display-hero max-w-[20ch] text-ink" style={{ fontSize: "clamp(2.25rem,6vw,4.75rem)" }}>
          {c.h1}
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted">{c.intro}</p>
      </section>

      <section className="container-lux pb-[var(--section-py)]">
        <div className="space-y-14">
          {c.groups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 60}>
              <div className="border-t border-line pt-10">
                <h2 className="display-h2 text-ink">{group.title}</h2>
                <p className="mt-2 max-w-2xl text-muted">{group.blurb}</p>
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group flex h-full flex-col rounded-lg border border-line bg-elevated p-6 transition-colors hover:border-accent-500"
                      >
                        <span className="font-display text-lg leading-snug text-ink group-hover:text-accent-500">
                          {item.title}
                        </span>
                        <span className="mt-2 text-sm text-muted">{item.desc}</span>
                        <span className="mt-4 text-sm text-accent-500">{c.readGuide} →</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-elevated">
        <div className="container-lux py-[var(--section-py)]">
          <Reveal>
            <p className="eyebrow mb-4">{c.faqEyebrow}</p>
            <h2 className="display-h2 max-w-[16ch] text-ink">{c.faqHeading}</h2>
          </Reveal>
          <div className="mt-12 divide-y divide-line border-y border-line">
            {c.faqs.map((faq) => (
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
          <Link href="/listings" className="btn btn-ghost">{c.ctaListings}</Link>
          <a
            href={whatsappLink(`Hello ${site.name}, I'm exploring buying in Dubai and have a question.`)}
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
