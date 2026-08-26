import Link from "next/link";
import Image from "next/image";
import { getAreas } from "@/lib/data/repository";
import { Reveal } from "@/components/motion/Reveal";

/** Curated communities strip, primary internal linking to area guides. */
export async function AreasStrip() {
  const areas = await getAreas();
  return (
    <section className="container-lux py-[var(--section-py)]">
      <Reveal>
        <p className="eyebrow mb-4">Where we operate</p>
        <h2 className="display-h2 max-w-[18ch] text-ink">
          Four communities. Every one, definitively covered.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                className="object-cover opacity-80 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ backgroundColor: "rgba(227,231,240,0.82)" }} />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-2xl text-ink">{area.label}</h3>
                <p className="mt-1 text-sm text-accent-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  Explore the guide →
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
