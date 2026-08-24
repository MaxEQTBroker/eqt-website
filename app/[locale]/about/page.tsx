import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { site, whatsappLink } from "@/lib/site";
import { uiContent, hasUiTranslation } from "@/lib/data/i18n/ui";

type AboutCopy = {
  metaTitle: string;
  metaDescription: string;
  breadcrumb: string;
  eyebrow: string;
  h1: string;
  intro1: string;
  intro2: string;
  principles: { title: string; body: string }[];
  credentialsEyebrow: string;
  credentialsHeading: string;
  credentialsBody: string;
  factLegalName: string;
  factHeadOffice: string;
  factReraOrn: string;
  factDedLicence: string;
  factRegulatedBy: string;
  factSpecialisation: string;
  specialisationValue: string;
  ctaEyebrow: string;
  ctaHeading: string;
  ctaTeam: string;
  ctaContact: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = uiContent<AboutCopy>("about", locale);
  const translated = hasUiTranslation("about", locale);
  const canonical = locale === "en" ? "/about" : `/${locale}/about`;
  const languages: Record<string, string> = { "x-default": "/about", en: "/about" };
  if (hasUiTranslation("about", "uk")) languages.uk = "/uk/about";
  if (hasUiTranslation("about", "ru")) languages.ru = "/ru/about";
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical, languages },
    robots: translated ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = uiContent<AboutCopy>("about", locale);
  const facts = [
    { label: c.factLegalName, value: site.legalName },
    { label: c.factHeadOffice, value: `${site.contact.address.street}, ${site.contact.address.city}` },
    { label: c.factReraOrn, value: site.regulatory.reraOrn },
    { label: c.factDedLicence, value: site.regulatory.dedLicense },
    { label: c.factRegulatedBy, value: site.regulatory.authority },
    { label: c.factSpecialisation, value: c.specialisationValue },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: c.breadcrumb, path: "/about" },
        ]}
      />

      <section className="container-lux pb-14 pt-40">
        <div className="mb-6">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: c.breadcrumb, href: "/about" }]} />
        </div>
        <p className="eyebrow mb-5">{c.eyebrow}</p>
        <h1 className="display-hero max-w-[20ch] text-ink" style={{ fontSize: "clamp(2.5rem,7vw,5rem)" }}>
          {c.h1}
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted">{c.intro1}</p>
        <p className="mt-5 max-w-2xl text-lg text-muted">{c.intro2}</p>
      </section>

      {/* Principles */}
      <section className="container-lux pb-[var(--section-py)]">
        <div className="grid gap-6 md:grid-cols-3">
          {c.principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <div className="h-full rounded-lg border border-line bg-elevated p-8">
                <span className="font-display text-2xl text-accent-500">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-4 font-display text-xl text-ink">{p.title}</h2>
                <p className="mt-3 text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Credentials / entity facts */}
      <section className="border-t border-line bg-elevated">
        <div className="container-lux grid gap-12 py-[var(--section-py)] lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-4">{c.credentialsEyebrow}</p>
            <h2 className="display-h2 max-w-[16ch] text-ink">{c.credentialsHeading}</h2>
            <p className="mt-6 max-w-md text-muted">{c.credentialsBody}</p>
          </Reveal>
          <Reveal delay={100}>
            <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.label} className="border-b border-line pb-4">
                  <dt className="text-sm text-faint">{f.label}</dt>
                  <dd className="mt-1 text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="container-lux flex flex-col items-start gap-6 py-[var(--section-py)] md:flex-row md:items-center md:justify-between">
        <div>
          <p className="eyebrow mb-4">{c.ctaEyebrow}</p>
          <h2 className="display-h2 max-w-[18ch] text-ink">{c.ctaHeading}</h2>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/team" className="btn btn-ghost">{c.ctaTeam}</Link>
          <a
            href={whatsappLink(`Hello ${site.name}, I'd like to learn more about working with you.`)}
            className="btn btn-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            {c.ctaContact}
          </a>
        </div>
      </section>
    </>
  );
}
