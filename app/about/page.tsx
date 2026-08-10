import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "About EQT — Dubai Luxury Real Estate Brokerage",
  description:
    "EQT is a RERA-licensed Dubai brokerage specialising in prime and super-prime residential property — Palm Jumeirah, Emirates Hills, Al Barari, Downtown and Business Bay. Our credentials, approach and contacts.",
  alternates: { canonical: "/about" },
};

const facts = [
  { label: "Legal name", value: site.legalName },
  { label: "Head office", value: `${site.contact.address.street}, ${site.contact.address.city}` },
  { label: "RERA ORN", value: site.regulatory.reraOrn },
  { label: "DED trade licence", value: site.regulatory.dedLicense },
  { label: "Regulated by", value: site.regulatory.authority },
  { label: "Specialisation", value: "Prime & super-prime residential sales" },
];

const principles = [
  {
    title: "Off-market access",
    body: "A large share of Dubai's finest homes never reach the portals. Our relationships put private, pre-market opportunities in front of clients first.",
  },
  {
    title: "Evidence, not adjectives",
    body: "We advise from real comparable transactions and a verifiable sold record — not sentiment. Every valuation is grounded in data.",
  },
  {
    title: "Discretion by default",
    body: "Confidential representation for buyers and sellers who value privacy, from first enquiry to completion.",
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      <section className="container-lux pb-14 pt-40">
        <div className="mb-6">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
        </div>
        <p className="eyebrow mb-5">About EQT</p>
        <h1 className="display-hero max-w-[20ch] text-ink" style={{ fontSize: "clamp(2.5rem,7vw,5rem)" }}>
          A private office for Dubai&apos;s prime market
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted">
          {site.name} ({site.legalName}) is a RERA-licensed brokerage focused exclusively on Dubai&apos;s
          most sought-after addresses — Palm Jumeirah, Emirates Hills, Al Barari, Jumeirah Islands,
          Downtown and Business Bay. We represent buyers, sellers and investors with the discretion,
          data and access the segment demands.
        </p>
      </section>

      {/* Principles */}
      <section className="container-lux pb-[var(--section-py)]">
        <div className="grid gap-6 md:grid-cols-3">
          {principles.map((p, i) => (
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
            <p className="eyebrow mb-4">Credentials</p>
            <h2 className="display-h2 max-w-[16ch] text-ink">Licensed, regulated, accountable</h2>
            <p className="mt-6 max-w-md text-muted">
              EQT operates under Dubai&apos;s regulatory framework. Our registration details are public
              and verifiable with the Dubai Land Department.
            </p>
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
          <p className="eyebrow mb-4">Work with us</p>
          <h2 className="display-h2 max-w-[18ch] text-ink">Meet the team or start a conversation</h2>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/team" className="btn btn-ghost">Meet the team</Link>
          <a
            href={whatsappLink(`Hello ${site.name}, I'd like to learn more about working with you.`)}
            className="btn btn-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact us
          </a>
        </div>
      </section>
    </>
  );
}
