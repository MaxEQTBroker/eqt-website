import { getLocale } from "next-intl/server";
import { BackgroundVideo } from "@/components/motion/BackgroundVideo";
import { uiContent } from "@/lib/data/i18n/ui";

/** Full-bleed cinematic video moment between sections. */
export async function Interlude() {
  const locale = await getLocale();
  const c = uiContent<{ interlude: string }>("home", locale);
  return (
    <section className="relative flex min-h-[72svh] items-end overflow-hidden">
      <BackgroundVideo
        src="/videos/featured.mp4"
        poster="/videos/featured-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(12,19,36,0.42)" }} />
      <div className="container-lux relative z-10 pb-[10vh]">
        <h2
          className="max-w-[18ch] font-display text-[clamp(2rem,4.6vw,4.25rem)] font-medium leading-[1.05] text-white"
          style={{ textShadow: "0 2px 30px rgba(0,0,0,0.45)" }}
        >
          {c.interlude}
        </h2>
      </div>
    </section>
  );
}
