import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getDevelopers } from "@/lib/data/repository";
import { Reveal } from "@/components/motion/Reveal";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { uiContent, hasUiTranslation } from "@/lib/data/i18n/ui";

type DevelopersIndexCopy = {
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
  const c = uiContent<DevelopersIndexCopy>("developersIndex", locale);
  const canonical = locale === "en" ? "/developers" : `/${locale}/developers`;
  const languages: Record<string, string> = { "x-default": "/developers", en: "/developers" };
  if (hasUiTranslation("developersIndex", "uk")) languages.uk = "/uk/developers";
  if (hasUiTranslation("developersIndex", "ru")) languages.ru = "/ru/developers";
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical, languages },
    robots: hasUiTranslation("developersIndex", locale) ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function DevelopersIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = uiContent<DevelopersIndexCopy>("developersIndex", locale);
  const developers = await getDevelopers(locale);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: c.breadcrumb, path: "/developers" },
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {developers.map((dev, i) => (
            <Reveal key={dev.slug} delay={(i % 3) * 90}>
              <Link
                href={`/developers/${dev.slug}`}
                className="group flex h-full flex-col justify-between rounded-lg border border-line bg-elevated p-8 transition-colors duration-300 hover:border-accent-500"
              >
                <div className="flex h-16 items-center">
                  {dev.logo ? (
                    <Image
                      src={dev.logo}
                      alt={`${dev.name} logo`}
                      width={200}
                      height={64}
                      className="max-h-12 w-auto object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  ) : (
                    <span className="font-display text-2xl text-ink opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                      {dev.name}
                    </span>
                  )}
                </div>
                <div className="mt-8">
                  <h2 className="font-display text-2xl text-ink">{dev.name}</h2>
                  <p className="mt-2 text-sm text-muted">{dev.tagline}</p>
                  <p className="mt-5 text-sm text-accent-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {c.cardLink} →
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
