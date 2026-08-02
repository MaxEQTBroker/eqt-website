import Link from "next/link";
import { HeroVideo } from "@/components/motion/HeroVideo";
import { site, whatsappLink } from "@/lib/site";

/**
 * Cinematic full-bleed hero. A small tagline chip sits just under the logo; the
 * CTAs anchor the bottom. Both sit in frosted "bubbles" so they stay legible
 * over the video (the media is a decorative layer; text is real HTML).
 */
export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <HeroVideo
        desktopSrc="/videos/hero.mp4"
        mobileSrc="/videos/hero-mobile.mp4"
        poster="/videos/hero-poster.jpg"
        tone="#eae6df"
      />

      <div className="container-lux relative z-10 flex min-h-[100svh] flex-col">
        {/* Tagline chip — italic, tucked right under the logo */}
        <div className="pt-[84px]">
          <p className="inline-flex rounded-full border border-line/60 bg-base/75 px-5 py-2 font-display text-lg italic leading-none text-ink backdrop-blur-md">
            The only brokers you&apos;ll ever need in Dubai.
          </p>
        </div>

        {/* CTAs — anchored bottom */}
        <div className="mt-auto pb-24">
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink(`Hello ${site.name}, I'd like to enquire about a property.`)}
              className="btn btn-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enquire on WhatsApp
            </a>
            <Link href="/listings" className="btn btn-ghost bg-base/60 backdrop-blur-md">
              View the collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
