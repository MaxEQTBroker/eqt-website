import Image from "next/image";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { RevealText } from "@/components/motion/RevealText";
import { ScrollScale } from "@/components/motion/ScrollScale";
import { uiContent } from "@/lib/data/i18n/ui";

/** Editorial narrative: text and image alternate; image scales slowly on scroll. */
const images = [
  { url: "/images/palm-jumeirah/1.jpg", alt: "Palm Jumeirah villa with a long infinity pool" },
  { url: "/images/al-barari/3.jpg", alt: "Double-height Al Barari living room opening onto a garden" },
];

export async function Voice() {
  const locale = await getLocale();
  const t = uiContent<{ voice: { kicker: string; line: string; body: string }[]; voiceCta: string }>("home", locale);
  const beats = t.voice.map((b, i) => ({ ...b, image: images[i] }));
  return (
    <section className="container-lux space-y-14 py-[var(--section-py)] md:space-y-20">
      {beats.map((b, i) => {
        const right = i % 2 === 1;
        return (
          <div key={b.kicker} className="grid items-center gap-10 md:grid-cols-2 md:gap-20">
            <div className={right ? "md:order-2" : ""}>
              <div className="relative aspect-[4/5] w-full overflow-hidden" style={{ backgroundColor: "#d7dce8" }}>
                <ScrollScale from={1.16} to={1.0}>
                  <Image src={b.image.url} alt={b.image.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </ScrollScale>
              </div>
            </div>
            <div className={right ? "md:order-1" : ""}>
              <p className="mb-6 text-xs uppercase tracking-[0.24em] text-faint">
                0{i + 1} / {b.kicker}
              </p>
              <RevealText
                as="h3"
                text={b.line}
                className="block font-display text-[clamp(1.9rem,4vw,3.25rem)] font-medium leading-[1.06] text-ink"
              />
              <p className="mt-6 max-w-md text-lg text-muted">{b.body}</p>
              {i === beats.length - 1 && (
                <Link href="/contact" className="btn btn-ghost mt-9">
                  {t.voiceCta}
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
