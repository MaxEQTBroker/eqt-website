import { getLocale } from "next-intl/server";
import { reviews } from "@/lib/data/reviews";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Client testimonials. Renders only when lib/data/reviews.ts holds real reviews,
 * so there is never an empty or placeholder block. Visual only, by design: on a
 * brokerage's own site, Google no longer shows self-serving review rich results,
 * and the star-rating schema is handled (env-gated) in lib/seo/jsonld.tsx.
 */

const HEAD: Record<string, { eyebrow: string; title: string }> = {
  en: { eyebrow: "In their words", title: "What our clients say" },
  uk: { eyebrow: "Їхніми словами", title: "Що кажуть наші клієнти" },
  ru: { eyebrow: "Их словами", title: "Что говорят наши клиенты" },
};

function Stars({ rating }: { rating: number }) {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div aria-label={`${full} out of 5`} className="text-lg tracking-widest">
      <span className="text-accent-500">{"★".repeat(full)}</span>
      <span className="text-faint">{"★".repeat(5 - full)}</span>
    </div>
  );
}

export async function Testimonials() {
  if (!reviews.length) return null;
  const locale = await getLocale();
  const h = HEAD[locale] ?? HEAD.en;

  return (
    <section className="container-lux py-[var(--section-py)]">
      <p className="eyebrow mb-5">{h.eyebrow}</p>
      <h2 className="display-h2 max-w-[16ch] text-ink">{h.title}</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r, i) => (
          <Reveal key={`${r.author}-${i}`} delay={(i % 3) * 90}>
            <figure className="flex h-full flex-col rounded-lg border border-line bg-elevated p-8">
              <Stars rating={r.rating} />
              <blockquote className="mt-4 text-lg leading-relaxed text-ink">
                {r.text}
              </blockquote>
              <figcaption className="mt-6 text-sm text-faint">
                {r.author}
                {r.source ? ` · ${r.source}` : ""}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
