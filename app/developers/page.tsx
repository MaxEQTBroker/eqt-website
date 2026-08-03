import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getDevelopers } from "@/lib/data/repository";
import { Reveal } from "@/components/motion/Reveal";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Dubai Property Developers, Guides & Off-Plan for Sale",
  description:
    "Guides to Dubai's leading developers, Emaar, Nakheel, Sobha, DAMAC, Meraas, OMNIYAT, Ellington and Majid Al Futtaim. EQT advises on primary (off-plan) and resale across every developer.",
  alternates: { canonical: "/developers" },
};

export default async function DevelopersIndexPage() {
  const developers = await getDevelopers();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Developers", path: "/developers" },
        ]}
      />

      <section className="container-lux pb-16 pt-40">
        <p className="eyebrow mb-5">Primary &amp; resale, every developer</p>
        <h1 className="display-hero max-w-[18ch] text-ink" style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)" }}>
          Dubai&apos;s leading developers
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted">
          We work across every Dubai developer, on both off-plan launches and the
          resale market. Explore each builder&apos;s signature communities, what
          they&apos;re known for, and how to buy.
        </p>
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
                  <Image
                    src={dev.logo}
                    alt={`${dev.name} logo`}
                    width={200}
                    height={64}
                    className="max-h-12 w-auto object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
                <div className="mt-8">
                  <h2 className="font-display text-2xl text-ink">{dev.name}</h2>
                  <p className="mt-2 text-sm text-muted">{dev.tagline}</p>
                  <p className="mt-5 text-sm text-accent-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    View developer guide →
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
