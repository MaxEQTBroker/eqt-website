import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getAreas } from "@/lib/data/repository";
import { Reveal } from "@/components/motion/Reveal";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { uiContent, hasUiTranslation } from "@/lib/data/i18n/ui";

type AreasIndexCopy = {
  metaTitle: string;
  metaDescription: string;
  breadcrumb: string;
  eyebrow: string;
  h1: string;
  intro: string;
  cardLink: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = uiContent<AreasIndexCopy>("areasIndex", locale);
  const canonical = locale === "en" ? "/areas" : `/${locale}/areas`;
  const languages: Record<string, string> = { "x-default": "/areas", en: "/areas" };
  if (hasUiTranslation("areasIndex", "uk")) languages.uk = "/uk/areas";
  if (hasUiTranslation("areasIndex", "ru")) languages.ru = "/ru/areas";
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical, languages },
    robots: hasUiTranslation("areasIndex", locale) ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function AreasIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = uiContent<AreasIndexCopy>("areasIndex", locale);
  const areas = await getAreas(locale);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: c.breadcrumb, path: "/areas" },
        ]}
      />

      <section className="container-lux pb-16 pt-40">
        <p className="eyebrow mb-5">{c.eyebrow}</p>
        <h1 className="display-hero max-w-[18ch] text-ink" style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)" }}>
          {c.h1}
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted">{c.intro}</p>
      </section>

      <section className="container-lux pb-[var(--section-py)]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((area, i) => (
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
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <div
                    className="rounded-md px-3.5 py-2.5 backdrop-blur-sm"
                    style={{ backgroundColor: "rgba(227,231,240,0.9)" }}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h2 className="font-display text-lg leading-tight text-ink">{area.label}</h2>
                      <span
                        className="shrink-0 text-sm text-accent-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        aria-label={c.cardLink}
                      >
                        →
                      </span>
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-xs text-muted">{area.headline}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
