import type { Metadata } from "next";
import { getAreas, queryListings } from "@/lib/data/repository";
import type { AreaSlug, PropertyType } from "@/lib/data/types";
import { ListingCard } from "@/components/ui/ListingCard";
import { Reveal } from "@/components/motion/Reveal";
import {
  ListingFilterBar,
  listingBandFromToken,
  type ListingPriceBandToken,
} from "@/components/listings/ListingFilterBar";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Listings",
  description:
    "Curated luxury residences for sale across Palm Jumeirah, Al Barari and Jumeirah Islands. Filter by community, type and price.",
  alternates: { canonical: "/listings" },
};

const TYPES: PropertyType[] = ["Villa", "Mansion", "Penthouse", "Apartment", "Townhouse", "Plot"];

type SearchParams = { area?: string; band?: string; type?: string };

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const areas = await getAreas();
  const areaSlugs = areas.map((a) => a.slug);

  const activeArea: AreaSlug | "all" =
    sp.area && areaSlugs.includes(sp.area as AreaSlug) ? (sp.area as AreaSlug) : "all";
  const activeType: PropertyType | "all" =
    sp.type && TYPES.includes(sp.type as PropertyType) ? (sp.type as PropertyType) : "all";
  const band = listingBandFromToken(sp.band);
  const activeBand = band.token as ListingPriceBandToken;

  const listings = await queryListings({
    area: activeArea === "all" ? undefined : activeArea,
    type: activeType === "all" ? undefined : activeType,
    minPriceAed: band.minPriceAed,
    maxPriceAed: band.maxPriceAed,
  });

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Listings", path: "/listings" },
        ]}
      />

      <section className="container-lux pb-16 pt-40">
        <p className="eyebrow mb-5">Curated collection</p>
        <h1 className="display-hero max-w-[16ch] text-ink" style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)" }}>
          Residences for sale
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted">
          A deliberately small, hand-selected collection across Dubai&apos;s most
          exclusive communities. Many of our best homes are off-market — ask us.
        </p>
      </section>

      <section className="container-lux">
        <div className="rounded-lg border border-line bg-elevated p-6 sm:p-8">
          <ListingFilterBar
            areas={areas}
            types={TYPES}
            activeArea={activeArea}
            activeBand={activeBand}
            activeType={activeType}
          />
        </div>
        <p className="mt-6 text-sm text-faint" aria-live="polite">
          {listings.length} {listings.length === 1 ? "residence" : "residences"}
        </p>
      </section>

      <section className="container-lux py-16">
        {listings.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing, i) => (
              <Reveal key={listing.slug} delay={(i % 3) * 90}>
                <ListingCard listing={listing} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-line bg-elevated p-12 text-center">
            <h2 className="font-display text-2xl text-ink">
              Nothing on-market matches — but we likely have it off-market.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              A large share of prime Dubai stock never gets advertised. Tell us
              your brief and we&apos;ll share matching homes privately.
            </p>
            <a
              href={whatsappLink(`Hello ${site.name}, I'm looking for a specific home.`)}
              className="btn btn-accent mt-8"
              target="_blank"
              rel="noopener noreferrer"
            >
              Send us your brief
            </a>
          </div>
        )}
      </section>
    </>
  );
}
