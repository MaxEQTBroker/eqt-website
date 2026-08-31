import Link from "next/link";
import Image from "next/image";
import type { Listing } from "@/lib/data/types";
import { agentForListing } from "@/lib/data/agents";
import { formatAed, formatSqft } from "@/lib/format";
import { site, whatsappLink } from "@/lib/site";

const telHref = `tel:${site.contact.phone.replace(/\s+/g, "")}`;

/** Server-rendered listing card. Real anchor + text for crawlers. */
export function ListingCard({ listing }: { listing: Listing }) {
  const cover = listing.images[0];
  const agent = agentForListing(listing);
  const wa = whatsappLink(
    `Hello ${site.name}, I'm interested in ${listing.title} (Ref ${listing.reference}). Could ${agent.name.split(" ")[0]} help me?`,
  );

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-line bg-elevated transition-colors duration-500 hover:border-accent-600">
      <Link href={`/listings/${listing.slug}`} className="block">
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
        <div className="px-6 pb-4 pt-6">
          <h3 className="font-display text-2xl leading-tight text-ink">{listing.title}</h3>
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

      {/* Agent + one-tap contact. Kept OUTSIDE the card link (no nested anchors). */}
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-line px-6 py-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <Image
            src={agent.photo}
            alt={agent.name}
            width={32}
            height={32}
            className="h-8 w-8 shrink-0 rounded-full object-cover"
          />
          <span className="truncate text-sm text-muted">{agent.name}</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${agent.name} about ${listing.title}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white transition-colors hover:bg-[#1ebe5b]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M12 0a11.9 11.9 0 0 0-10.2 18l-1.8 6 6.2-1.6A11.9 11.9 0 1 0 12 0zm0 21.8c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-3.7 1 1-3.6-.2-.4A9.9 9.9 0 1 1 12 21.8zm5.5-7.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.4.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.1 4.6 2.5 1 3 .8 3.6.8.5 0 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.4z" />
            </svg>
          </a>
          <a
            href={telHref}
            aria-label={`Call about ${listing.title}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent-500 hover:text-accent-600"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.2 2.2z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
