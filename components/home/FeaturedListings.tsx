import Link from "next/link";
import { getFeaturedListings } from "@/lib/data/repository";
import { ListingCard } from "@/components/ui/ListingCard";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollFlipRow } from "@/components/motion/ScrollFlipRow";
import { BackgroundVideo } from "@/components/motion/BackgroundVideo";

/** Featured listings over villa footage; cards flip in one by one on scroll. */
export async function FeaturedListings() {
  const listings = await getFeaturedListings(3);
  if (!listings.length) return null;

  return (
    <section className="relative overflow-hidden py-[var(--section-py)]">
      <BackgroundVideo
        src="/videos/featured.mp4"
        poster="/videos/featured-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Flat wash (no gradient), lets the footage read through. */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(12,19,36,0.34)" }} />

      <div className="container-lux relative z-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow mb-4" style={{ color: "#cfe0f4", textShadow: "0 2px 14px rgba(0,0,0,0.6)" }}>
              Curated collection
            </p>
            <h2 className="display-h2 max-w-[16ch]" style={{ color: "#ffffff", textShadow: "0 2px 22px rgba(0,0,0,0.65)" }}>
              Featured residences
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <Link
              href="/listings"
              className="rounded-full border border-white/50 bg-black/20 px-6 py-3 text-sm text-white backdrop-blur-sm transition-colors duration-300 hover:border-accent-400 hover:text-accent-400"
            >
              View all listings
            </Link>
          </Reveal>
        </div>

        <ScrollFlipRow className="mt-14 grid gap-6 md:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </ScrollFlipRow>
      </div>
    </section>
  );
}
