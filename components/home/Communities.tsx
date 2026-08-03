import Link from "next/link";
import { getAreas } from "@/lib/data/repository";
import { HoverTile } from "@/components/ui/HoverTile";
import { RevealText } from "@/components/motion/RevealText";

/** Communities as editorial tiles that blur to black + draw a "View" box on hover. */
export async function Communities() {
  const areas = (await getAreas()).slice(0, 3);
  return (
    <section className="container-lux py-[var(--section-py)]">
      <div className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <RevealText
          as="h2"
          text="Where we operate"
          className="block font-display text-[clamp(2rem,4.2vw,3.75rem)] font-medium leading-tight text-ink"
        />
        <Link href="/areas" className="text-xs uppercase tracking-[0.22em] text-accent-600 transition-opacity hover:opacity-60">
          All communities →
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {areas.map((area) => (
          <HoverTile
            key={area.slug}
            href={`/areas/${area.slug}`}
            image={area.heroImage.url}
            alt={area.heroImage.alt}
            title={area.label}
            subtitle={area.headline}
            tone={area.heroImage.tone}
          />
        ))}
      </div>
    </section>
  );
}
