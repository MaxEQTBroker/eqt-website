import Link from "next/link";
import Image from "next/image";
import type { Listing } from "@/lib/data/types";
import { formatAed, formatSqft } from "@/lib/format";

/** Server-rendered listing card. Real anchor + text for crawlers. */
export function ListingCard({ listing }: { listing: Listing }) {
  const cover = listing.images[0];
  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group block overflow-hidden rounded-lg border border-line bg-elevated transition-colors duration-500 hover:border-accent-600"
    >
      <div className="relative aspect-[4/3] overflow-hidden" style={{ backgroundColor: cover?.tone }}>
        <Image
          src={cover.url}
          alt={cover.alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium tracking-wider text-ink shadow-sm">
          {listing.areaLabel}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl leading-tight text-ink">{listing.title}</h3>
        </div>
        <p className="mt-2 text-accent-400">{listing.priceLabel ?? formatAed(listing.priceAed)}</p>
        <p className="mt-3 line-clamp-2 text-sm text-muted">{listing.summary}</p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-faint">
          <span>{listing.bedrooms} bed</span>
          <span>{listing.bathrooms} bath</span>
          <span>{formatSqft(listing.areaSqft)}</span>
          <span>{listing.type}</span>
        </div>
      </div>
    </Link>
  );
}
