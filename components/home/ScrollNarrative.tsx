import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Editorial narrative — oversized statements paired with real photography.
 * A gentle reveal on scroll (no flowing lines); image + text fade up in place.
 */
const beats = [
  {
    kicker: "01 — Access",
    line: "The best homes in Dubai are never advertised.",
    body: "A significant share of prime transactions happen off-market. Our relationships across Palm Jumeirah, Al Barari and Jumeirah Islands mean you see them first — quietly, and before anyone else.",
    image: {
      url: "/images/palm-jumeirah/1.jpg",
      alt: "Palm Jumeirah signature villa with a long infinity pool",
      tone: "#dfe3e6",
    },
  },
  {
    kicker: "02 — Discretion",
    line: "Private sales, handled privately.",
    body: "From confidential introductions to closing, we protect your identity and your interests. No leaks, no noise — only the right buyer or the right home.",
    image: {
      url: "/images/al-barari/1.jpg",
      alt: "Al Barari villa entrance framed by mature palms",
      tone: "#e2e5df",
    },
  },
  {
    kicker: "03 — Proof",
    line: "A track record you can verify.",
    body: "Every mandate is backed by real, completed transactions across Dubai's most exclusive communities — with the numbers, and the homes, to prove it.",
    image: {
      url: "/images/al-barari/3.jpg",
      alt: "Double-height villa living room opening onto a garden",
      tone: "#e6e6e2",
    },
  },
];

export function ScrollNarrative() {
  return (
    <section className="container-lux py-[var(--section-py)]">
      <div className="space-y-24 md:space-y-32">
        {beats.map((beat, i) => {
          const imageRight = i % 2 === 1;
          return (
            <div
              key={beat.kicker}
              className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24"
            >
              {/* Image */}
              <Reveal className={imageRight ? "md:order-2" : ""}>
                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-lg"
                  style={{ backgroundColor: beat.image.tone }}
                >
                  <Image
                    src={beat.image.url}
                    alt={beat.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>

              {/* Text */}
              <Reveal delay={140} className={imageRight ? "md:order-1" : ""}>
                <p className="eyebrow">{beat.kicker}</p>
                <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,3.25rem)] leading-[1.05] text-ink">
                  {beat.line}
                </h2>
                <p className="mt-6 max-w-xl text-lg text-muted">{beat.body}</p>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
