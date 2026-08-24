import { getLocale } from "next-intl/server";
import { HeroVideo } from "@/components/motion/HeroVideo";
import { uiContent } from "@/lib/data/i18n/ui";

/**
 * Full-bleed hero: a single big video with clean white serif text over it, and
 * nothing else, no buttons, no scroll cue (enquiry lives in the header).
 * The title is real, server-rendered HTML; the video is a decorative layer.
 */
export async function Hero() {
  const locale = await getLocale();
  const c = uiContent<{ heroH1: string }>("home", locale);
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <HeroVideo
        desktopSrc="/videos/hero.mp4"
        mobileSrc="/videos/hero-mobile.mp4"
        poster="/videos/hero-poster.jpg"
        tone="#241d14"
      />

      <div className="container-lux relative z-10 flex min-h-[100svh] items-end pb-[12vh]">
        <h1
          className="max-w-[20ch] font-display text-[clamp(2.75rem,6.5vw,6.5rem)] font-medium leading-[1.02] tracking-[0.005em] text-white"
          style={{ textShadow: "0 2px 30px rgba(0,0,0,0.4)" }}
        >
          {c.heroH1}
        </h1>
      </div>
    </section>
  );
}
