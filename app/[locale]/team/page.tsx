import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { team } from "@/lib/data/team";
import { Reveal } from "@/components/motion/Reveal";
import { BreadcrumbJsonLd, TeamJsonLd } from "@/lib/seo/jsonld";
import { site, whatsappLink } from "@/lib/site";
import { uiContent, hasUiTranslation } from "@/lib/data/i18n/ui";

type TeamCopy = {
  metaTitle: string;
  metaDescription: string;
  breadcrumb: string;
  eyebrow: string;
  h1: string;
  intro: string;
  languagesLabel: string;
  focusLabel: string;
  ctaEyebrow: string;
  ctaHeading: string;
  ctaWhatsapp: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = uiContent<TeamCopy>("team", locale);
  const canonical = locale === "en" ? "/team" : `/${locale}/team`;
  const languages: Record<string, string> = { "x-default": "/team", en: "/team" };
  if (hasUiTranslation("team", "uk")) languages.uk = "/uk/team";
  if (hasUiTranslation("team", "ru")) languages.ru = "/ru/team";
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical, languages },
    robots: hasUiTranslation("team", locale) ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = uiContent<TeamCopy>("team", locale);
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: c.breadcrumb, path: "/team" },
        ]}
      />
      <TeamJsonLd members={team} />

      {/* Header */}
      <section className="container-lux pb-16 pt-40">
        <p className="eyebrow mb-5">{c.eyebrow}</p>
        <h1 className="display-hero max-w-[16ch] text-ink" style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)" }}>
          {c.h1}
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted">{c.intro}</p>
      </section>

      {/* Team grid */}
      <section className="container-lux pb-[var(--section-py)]">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.slug} delay={(i % 3) * 90}>
              <article id={m.slug} className="scroll-mt-32">
                <Link
                  href={`/team/${m.slug}`}
                  className="relative mb-5 block h-28 w-28 overflow-hidden rounded-full"
                  style={{ backgroundColor: "var(--bg-inset)" }}
                >
                  <Image
                    src={m.photo}
                    alt={`${m.name}, ${m.role} at ${site.name}`}
                    fill
                    sizes="112px"
                    className="object-cover object-top transition-transform duration-500 hover:scale-[1.05]"
                  />
                </Link>
                <h2 className="font-display text-2xl text-ink">
                  <Link href={`/team/${m.slug}`} className="transition-colors hover:text-accent-600">
                    {m.name}
                  </Link>
                </h2>
                <p className="mt-1 text-sm uppercase tracking-[0.18em] text-accent-600">{m.role}</p>
                <p className="mt-4 text-muted">{m.bio}</p>
                {(m.languages || m.areas) && (
                  <dl className="mt-5 space-y-2 border-t border-line pt-5 text-sm">
                    {m.languages && (
                      <div className="flex gap-2">
                        <dt className="shrink-0 text-faint">{c.languagesLabel}</dt>
                        <dd className="text-muted">{m.languages}</dd>
                      </div>
                    )}
                    {m.areas && (
                      <div className="flex gap-2">
                        <dt className="shrink-0 text-faint">{c.focusLabel}</dt>
                        <dd className="text-muted">{m.areas}</dd>
                      </div>
                    )}
                  </dl>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-elevated">
        <div className="container-lux flex flex-col items-start gap-8 py-[var(--section-py)] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow mb-4">{c.ctaEyebrow}</p>
            <h2 className="display-h2 max-w-[16ch] text-ink">{c.ctaHeading}</h2>
          </div>
          <a
            href={whatsappLink(`Hello ${site.name}, I'd like to speak with an advisor.`)}
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
