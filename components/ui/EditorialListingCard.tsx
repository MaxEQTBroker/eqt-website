import Link from "next/link";
import Image from "next/image";
import type { Listing } from "@/lib/data/types";
import { ScrollScale } from "@/components/motion/ScrollScale";
import { formatAed, formatSqft } from "@/lib/format";
import { site, whatsappLink } from "@/lib/site";

/**
 * Editorial listing card: image that slowly scales on scroll, minimal specs,
 * and a WhatsApp enquiry button beneath (mira-style). Real anchors for crawlers.
 */
export function EditorialListingCard({ listing }: { listing: Listing }) {
  const cover = listing.images[0];
  const wa = whatsappLink(
    `Hello ${site.name}, I'd like to enquire about ${listing.title} (Ref ${listing.reference}).`,
  );

  return (
    <div className="group flex flex-col">
      <Link href={`/listings/${listing.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden" style={{ backgroundColor: cover.tone }}>
          <ScrollScale from={1.14} to={1.0}>
            <Image src={cover.url} alt={cover.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
          </ScrollScale>
        </div>
      </Link>

      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-baseline justify-between gap-4">
          <Link href={`/listings/${listing.slug}`} className="font-display text-2xl leading-tight text-ink transition-colors hover:text-accent-600">
            {listing.title}
          </Link>
          <span className="whitespace-nowrap text-accent-600">{listing.priceLabel ?? formatAed(listing.priceAed)}</span>
        </div>
        <p className="mt-2 text-sm text-faint">
          {listing.areaLabel} · {listing.bedrooms} bed · {formatSqft(listing.areaSqft)}
        </p>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="link-quiet mt-6 self-start">
          Enquire on WhatsApp
        </a>
      </div>
    </div>
  );
}
