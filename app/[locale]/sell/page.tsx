import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/lib/seo/jsonld";
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
