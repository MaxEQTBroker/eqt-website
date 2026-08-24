import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAreas } from "@/lib/data/repository";
import { HoverTile } from "@/components/ui/HoverTile";
import { RevealText } from "@/components/motion/RevealText";
import { uiContent } from "@/lib/data/i18n/ui";

/** Communities as editorial tiles that blur to black + draw a "View" box on hover. */
export async function Communities() {
  const locale = await getLocale();
  const c = uiContent<{ communitiesHeading: string; communitiesLink: string }>("home", locale);
  const areas = (await getAreas(locale)).slice(0, 3);
  return (
    <section className="container-lux py-[var(--section-py)]">
      <div className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <RevealText
          as="h2"
          text={c.communitiesHeading}
          className="block font-display text-[clamp(2rem,4.2vw,3.75rem)] font-medium leading-tight text-ink"
        />
        <Link href="/areas" className="text-xs uppercase tracking-[0.22em] text-accent-600 transition-opacity hover:opacity-60">
          {c.communitiesLink} →
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
