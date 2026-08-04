import type { Metadata } from "next";
import Link from "next/link";
import { getAreas, queryListings } from "@/lib/data/repository";
import type { AreaSlug, PropertyType } from "@/lib/data/types";
import { ListingCard } from "@/components/ui/ListingCard";
import { Reveal } from "@/components/motion/Reveal";
import {
  ListingFilterBar,
  listingBandFromToken,
  listingSizeFromToken,
  type ListingPriceBandToken,
  type ListingSizeToken,
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

const PER_PAGE = 9;

type SearchParams = {
  area?: string;
  band?: string;
  type?: string;
  beds?: string;
  sqft?: string;
  page?: string;
};

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
  const size = listingSizeFromToken(sp.sqft);
  const activeSize = size.token as ListingSizeToken;
  const activeBeds = /^[1-5]$/.test(sp.beds ?? "") ? (sp.beds as string) : "all";
  const minBedrooms = activeBeds === "all" ? undefined : Number(activeBeds);

  const all = await queryListings({
    area: activeArea === "all" ? undefined : activeArea,
    type: activeType === "all" ? undefined : activeType,
    minPriceAed: band.minPriceAed,
    maxPriceAed: band.maxPriceAed,
    minBedrooms,
    minAreaSqft: size.minAreaSqft,
    maxAreaSqft: size.maxAreaSqft,
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(all.length / PER_PAGE));
  const page = Math.min(Math.max(1, Number(sp.page) || 1), totalPages);
  const listings = all.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const hrefFor = (p: number) => {
    const params = new URLSearchParams();
    if (activeArea !== "all") params.set("area", activeArea);
    if (activeType !== "all") params.set("type", activeType);
    if (activeBand !== "all") params.set("band", activeBand);
    if (activeBeds !== "all") params.set("beds", activeBeds);
    if (activeSize !== "all") params.set("sqft", activeSize);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/listings?${qs}` : "/listings";
  };

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
          exclusive communities. Many of our best homes are off-market, ask us.
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
            activeBeds={activeBeds}
            activeSize={activeSize}
          />
        </div>
        <p className="mt-6 text-sm text-faint" aria-live="polite">
          {all.length} {all.length === 1 ? "residence" : "residences"}
          {totalPages > 1 && ` · page ${page} of ${totalPages}`}
        </p>
      </section>

      <section className="container-lux py-16">
        {listings.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing, i) => (
                <Reveal key={listing.slug} delay={(i % 3) * 90}>
                  <ListingCard listing={listing} />
                </Reveal>
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="mt-14 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
                {page > 1 && (
                  <Link href={hrefFor(page - 1)} className="rounded-md border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-accent-500 hover:text-ink">
                    ← Prev
                  </Link>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={hrefFor(p)}
                    aria-current={p === page ? "page" : undefined}
                    className="min-w-[2.5rem] rounded-md border px-3 py-2 text-center text-sm transition-colors"
                    style={
                      p === page
                        ? { backgroundColor: "var(--accent-500)", borderColor: "var(--accent-500)", color: "#fff" }
                        : { borderColor: "var(--line)", color: "var(--text-secondary)" }
                    }
                  >
                    {p}
                  </Link>
                ))}
                {page < totalPages && (
                  <Link href={hrefFor(page + 1)} className="rounded-md border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-accent-500 hover:text-ink">
                    Next →
                  </Link>
                )}
              </nav>
            )}
          </>
        ) : (
          <div className="rounded-lg border border-line bg-elevated p-12 text-center">
            <h2 className="font-display text-2xl text-ink">
              Nothing on-market matches, but we likely have it off-market.
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
