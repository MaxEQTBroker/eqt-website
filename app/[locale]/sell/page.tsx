import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/lib/seo/jsonld";
import { getTrustSignals, getAreas } from "@/lib/data/repository";
import { site, whatsappLink } from "@/lib/site";
import { uiContent, hasUiTranslation } from "@/lib/data/i18n/ui";

type SellCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  points: { title: string; body: string }[];
  regulated: string;
  faqsHeading: string;
  faqs: { question: string; answer: string }[];
  ctaValuation: string;
  ctaWhatsapp: string;
  breadcrumbHome: string;
  breadcrumbSell: string;
  whyHeading: string;
  whySub: string;
  proofHeading: string;
  proofBody: string;
  proofCta: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = uiContent<SellCopy>("sell", locale);
  const translated = hasUiTranslation("sell", locale);
  const canonical = locale === "en" ? "/sell" : `/${locale}/sell`;
  const languages: Record<string, string> = { "x-default": "/sell", en: "/sell" };
  if (hasUiTranslation("sell", "uk")) languages.uk = "/uk/sell";
  if (hasUiTranslation("sell", "ru")) languages.ru = "/ru/sell";
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical, languages },
    robots: translated ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function SellPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = uiContent<SellCopy>("sell", locale);
  const regulated = c.regulated
    .replace("{authority}", site.regulatory.authority)
    .replace("{orn}", site.regulatory.reraOrn);

  // Real, firm-confirmed track-record figures; reuse the home page's localized
  // labels so we don't duplicate translations.
  const signals = await getTrustSignals();
  const homeMetrics = uiContent<{ metrics?: { label: string; detail: string }[] }>("home", locale).metrics;
  const stats = signals.map((s, i) => ({
    value: s.value,
    label: homeMetrics?.[i]?.label ?? s.label,
    detail: homeMetrics?.[i]?.detail ?? s.detail,
  }));

  // A few prime-community images as proof of the calibre we handle.
  const areas = await getAreas(locale);
  const showcaseSlugs = ["palm-jumeirah", "emirates-hills", "downtown-dubai"];
  const showcase = showcaseSlugs
    .map((slug) => areas.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: c.breadcrumbHome, path: "/" },
          { name: c.breadcrumbSell, path: "/sell" },
        ]}
      />
      <FaqJsonLd faqs={c.faqs} />

      <section className="container-lux pb-[var(--section-py)] pt-40">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5">{c.eyebrow}</p>
          <h1 className="display-hero text-ink" style={{ fontSize: "clamp(2.25rem,6vw,4.5rem)" }}>
            {c.h1}
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted">{c.intro}</p>

          <div className="mt-12 space-y-8">
            {c.points.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="flex gap-4">
                  <span className="font-display text-2xl text-accent-500">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h2 className="font-display text-xl text-ink">{p.title}</h2>
                    <p className="mt-2 max-w-md text-muted">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-12 text-sm text-faint">{regulated}</p>
        </div>

        {/* Why sell with EQT — track record + proof */}
        <div className="mt-24 border-t border-line pt-16">
          <Reveal>
            <p className="eyebrow mb-4">{c.whyHeading}</p>
            <h2 className="display-h2 max-w-[20ch] text-ink">{c.whySub}</h2>
          </Reveal>

          <dl className="mt-12 grid gap-8 sm:grid-cols-3">
            {stats.map((s) => (
              <Reveal key={s.label}>
                <div className="border-t border-accent-500 pt-5">
                  <dd className="font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-none text-accent-500">
                    {s.value}
                  </dd>
                  <dt className="mt-3 text-ink">{s.label}</dt>
                  <p className="mt-1 text-sm text-muted">{s.detail}</p>
                </div>
              </Reveal>
            ))}
          </dl>

          {/* Prime-community imagery */}
          {showcase.length > 0 && (
            <div className="mt-14 grid gap-4 sm:grid-cols-3">
              {showcase.map((a) => (
                <Reveal key={a.slug}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg" style={{ backgroundColor: a.heroImage.tone }}>
                    <Image
                      src={a.heroImage.url}
                      alt={a.heroImage.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <span className="rounded-md px-3 py-1.5 text-sm font-medium text-ink backdrop-blur-sm" style={{ backgroundColor: "rgba(227,231,240,0.9)" }}>
                        {a.label}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {/* Sold-portfolio proof */}
          <Reveal>
            <div className="mt-14 flex flex-col items-start gap-5 rounded-lg border border-line bg-elevated p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div className="max-w-xl">
                <h3 className="font-display text-2xl text-ink">{c.proofHeading}</h3>
                <p className="mt-2 text-muted">{c.proofBody}</p>
              </div>
              <Link href="/sold" className="btn btn-ghost shrink-0">
                {c.proofCta}
              </Link>
            </div>
          </Reveal>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl border-t border-line pt-16">
          <p className="eyebrow mb-8">{c.faqsHeading}</p>
          <div className="space-y-8">
            {c.faqs.map((f) => (
              <div key={f.question}>
                <h2 className="font-display text-xl text-ink">{f.question}</h2>
                <p className="mt-3 max-w-2xl text-muted">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-wrap items-center gap-6">
          <Link href="/valuation" className="btn btn-accent">
            {c.ctaValuation}
          </Link>
          <a
            href={whatsappLink(`Hello ${site.name}, I'd like to sell my Dubai property.`)}
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
