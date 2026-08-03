import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPropertyGuides } from "@/lib/data/repository";
import { Reveal } from "@/components/motion/Reveal";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Property Types in Dubai, Villas, Penthouses, Off-Plan & More",
  description:
    "Explore Dubai property by type, villas, mansions, penthouses, apartments, townhouses and off-plan. Guides, prices and the best communities for each, from EQT.",
  alternates: { canonical: "/property" },
};

export default async function PropertyIndexPage() {
  const guides = await getPropertyGuides();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Property types", path: "/property" },
        ]}
      />

      <section className="container-lux pb-16 pt-40">
        <p className="eyebrow mb-5">Any property type, anywhere in Dubai</p>
        <h1 className="display-hero max-w-[18ch] text-ink" style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)" }}>
          Find your kind of home
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted">
          Whether it&apos;s a family villa, a trophy mansion, a skyline penthouse or
          an off-plan investment, explore the guide, the pricing and the best
          communities for each.
        </p>
      </section>

      <section className="container-lux pb-[var(--section-py)]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide, i) => (
            <Reveal key={guide.slug} delay={(i % 3) * 90}>
              <Link
                href={`/property/${guide.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-lg"
                style={{ backgroundColor: guide.heroImage.tone }}
              >
                <Image
                  src={guide.heroImage.url}
                  alt={guide.heroImage.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover opacity-85 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ backgroundColor: "rgba(214,205,182,0.82)" }} />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h2 className="font-display text-2xl text-ink">{guide.label}</h2>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{guide.headline}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
