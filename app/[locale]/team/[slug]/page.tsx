import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { team } from "@/lib/data/team";
import { BreadcrumbJsonLd, PersonJsonLd } from "@/lib/seo/jsonld";
import { site, whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return team.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = team.find((t) => t.slug === slug);
  if (!m) return {};
  const desc = `${m.name}, ${m.role} at EQT Real Estate in Dubai.${
    m.areas ? ` Focus: ${m.areas}.` : ""
  }${m.languages ? ` Languages: ${m.languages}.` : ""}`;
  return {
    title: `${m.name}, ${m.role} at EQT`,
    description: desc.slice(0, 300),
    alternates: { canonical: `/team/${m.slug}` },
    openGraph: { images: [m.photo] },
  };
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = team.find((t) => t.slug === slug);
  if (!m) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Team", path: "/team" },
          { name: m.name, path: `/team/${m.slug}` },
        ]}
      />
      <PersonJsonLd member={m} />

      <section className="container-lux pb-[var(--section-py)] pt-40">
        <Link
          href="/team"
          className="eyebrow mb-8 inline-block text-muted transition-colors hover:text-ink"
        >
          ← Back to the team
        </Link>

        <div className="max-w-3xl">
          <div
            className="relative mb-8 h-36 w-36 overflow-hidden rounded-full"
            style={{ backgroundColor: "var(--bg-inset)" }}
          >
            <Image
              src={m.photo}
              alt={`${m.name}, ${m.role} at ${site.name}`}
              fill
              priority
              sizes="144px"
              className="object-cover object-top"
            />
          </div>

          <p className="eyebrow mb-4 text-accent-600">{m.role}</p>
          <h1 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] font-medium leading-[1.05] text-ink">
            {m.name}
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-muted">{m.bio}</p>

          <dl className="mt-8 space-y-3 border-t border-line pt-8 text-sm">
            {m.brn && (
              <div className="flex gap-3">
                <dt className="w-28 shrink-0 text-faint">RERA BRN</dt>
                <dd className="text-muted">{m.brn}</dd>
              </div>
            )}
            {m.languages && (
              <div className="flex gap-3">
                <dt className="w-28 shrink-0 text-faint">Languages</dt>
                <dd className="text-muted">{m.languages}</dd>
              </div>
            )}
            {m.areas && (
              <div className="flex gap-3">
                <dt className="w-28 shrink-0 text-faint">Focus areas</dt>
                <dd className="text-muted">{m.areas}</dd>
              </div>
            )}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href={whatsappLink(`Hello ${site.name}, I'd like to speak with ${m.name}.`)}
              className="btn btn-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              Message us on WhatsApp
            </a>
            <a
              href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
              className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
            >
              Call {site.contact.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
