import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAreas } from "@/lib/data/repository";
import { Reveal } from "@/components/motion/Reveal";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Communities",
  description:
    "Guides to Dubai's most exclusive communities, Palm Jumeirah, Al Barari and Jumeirah Islands. Track records, available homes and local insight.",
  alternates: { canonical: "/areas" },
};

export default async function AreasIndexPage() {
  const areas = await getAreas();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Communities", path: "/areas" },
        ]}
      />

      <section className="container-lux pb-16 pt-40">
        <p className="eyebrow mb-5">Where we operate</p>
        <h1 className="display-hero max-w-[18ch] text-ink" style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)" }}>
          Dubai&apos;s most sought-after communities
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted">
          We focus, deliberately, on four addresses, so we know each one
          completely. Explore the guides, the track record, and what&apos;s
          currently available.
        </p>
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
                <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ backgroundColor: "rgba(214,205,182,0.82)" }} />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h2 className="font-display text-2xl text-ink">{area.label}</h2>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{area.headline}</p>
                  <p className="mt-3 text-sm text-accent-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    Explore the guide →
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
