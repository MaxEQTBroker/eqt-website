import Link from "next/link";
import { getFeaturedListings } from "@/lib/data/repository";
import { EditorialListingCard } from "@/components/ui/EditorialListingCard";
import { RevealText } from "@/components/motion/RevealText";

/** Featured residences, editorial grid, images scale on scroll, WhatsApp under each. */
export async function FeaturedEditorial() {
  const listings = await getFeaturedListings(3);
  if (!listings.length) return null;

  return (
    <section className="border-t border-line bg-elevated">
      <div className="container-lux py-[var(--section-py)]">
        <div className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <RevealText
            as="h2"
            text="A curated few"
            className="block font-display text-[clamp(2rem,4.2vw,3.75rem)] font-medium leading-tight text-ink"
          />
          <Link href="/listings" className="text-xs uppercase tracking-[0.22em] text-accent-600 transition-opacity hover:opacity-60">
            View all residences →
          </Link>
        </div>

        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <EditorialListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
}
