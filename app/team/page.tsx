import type { Metadata } from "next";
import Image from "next/image";
import { team } from "@/lib/data/team";
import { Reveal } from "@/components/motion/Reveal";
import { BreadcrumbJsonLd, TeamJsonLd } from "@/lib/seo/jsonld";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Team, Dubai Real Estate Advisors",
  description:
    "Meet the EQT team, a handpicked group of multilingual, RERA-licensed Dubai real estate advisors led by founder Vladyslav Franchuk, covering Palm Jumeirah, Dubai Marina, Downtown and beyond.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Team", path: "/team" },
        ]}
      />
      <TeamJsonLd members={team} />

      {/* Header */}
      <section className="container-lux pb-16 pt-40">
        <p className="eyebrow mb-5">The people behind EQT</p>
        <h1 className="display-hero max-w-[16ch] text-ink" style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)" }}>
          Meet the team
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted">
          A private, handpicked team of multilingual, RERA-licensed advisors, chosen for genuine
          market knowledge and a client-first way of working. Between us we speak your language and
          know every prime community in Dubai.
        </p>
      </section>

      {/* Team grid */}
      <section className="container-lux pb-[var(--section-py)]">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.slug} delay={(i % 3) * 90}>
              <article id={m.slug} className="scroll-mt-32">
                <div
                  className="relative mb-6 aspect-[4/5] overflow-hidden rounded-lg"
                  style={{ backgroundColor: "var(--bg-inset)" }}
                >
                  <Image
                    src={m.photo}
                    alt={`${m.name}, ${m.role} at ${site.name}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <h2 className="font-display text-2xl text-ink">{m.name}</h2>
                <p className="mt-1 text-sm uppercase tracking-[0.18em] text-accent-600">{m.role}</p>
                <p className="mt-4 text-muted">{m.bio}</p>
                {(m.languages || m.areas) && (
                  <dl className="mt-5 space-y-2 border-t border-line pt-5 text-sm">
                    {m.languages && (
                      <div className="flex gap-2">
                        <dt className="shrink-0 text-faint">Languages</dt>
                        <dd className="text-muted">{m.languages}</dd>
                      </div>
                    )}
                    {m.areas && (
                      <div className="flex gap-2">
                        <dt className="shrink-0 text-faint">Focus</dt>
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
            <p className="eyebrow mb-4">Work with us</p>
            <h2 className="display-h2 max-w-[16ch] text-ink">Speak with a private advisor</h2>
          </div>
          <a
            href={whatsappLink(`Hello ${site.name}, I'd like to speak with an advisor.`)}
            className="btn btn-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Message us on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
