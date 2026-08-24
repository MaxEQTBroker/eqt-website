import type { Metadata } from "next";
import { ValuationForm } from "@/components/lead/ValuationForm";
import { Reveal } from "@/components/motion/Reveal";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { site } from "@/lib/site";
import { uiContent, hasUiTranslation } from "@/lib/data/i18n/ui";

type ValuationCopy = {
  metaTitle: string;
  metaDescription: string;
  breadcrumb: string;
  eyebrow: string;
  h1: string;
  intro: string;
  points: { title: string; body: string }[];
  regulated: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = uiContent<ValuationCopy>("valuation", locale);
  const canonical = locale === "en" ? "/valuation" : `/${locale}/valuation`;
  const languages: Record<string, string> = { "x-default": "/valuation", en: "/valuation" };
  if (hasUiTranslation("valuation", "uk")) languages.uk = "/uk/valuation";
  if (hasUiTranslation("valuation", "ru")) languages.ru = "/ru/valuation";
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical, languages },
    robots: hasUiTranslation("valuation", locale) ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function ValuationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = uiContent<ValuationCopy>("valuation", locale);
  const regulated = c.regulated
    .replace("{authority}", site.regulatory.authority)
    .replace("{orn}", site.regulatory.reraOrn);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: c.breadcrumb, path: "/valuation" },
        ]}
      />

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

        {/* The form, after all the text, with room to breathe */}
        <Reveal delay={120} className="mt-16 block max-w-2xl border-t border-line pt-16">
          <ValuationForm source="valuation" />
        </Reveal>
      </section>
    </>
  );
}
