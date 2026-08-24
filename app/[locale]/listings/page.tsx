import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getAreas, queryListings } from "@/lib/data/repository";
import type { AreaSlug, PropertyType } from "@/lib/data/types";
import { ListingCard } from "@/components/ui/ListingCard";
import { LeadForm } from "@/components/lead/LeadForm";
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
import { uiContent, hasUiTranslation } from "@/lib/data/i18n/ui";

type ListingsCopy = {
  metaTitle: string; metaDescription: string; breadcrumb: string;
  eyebrowDefault: string; h1Default: string; h1Area: string; introDefault: string;
  introAreaLead: string; viewAllCommunities: string; residenceSingular: string;
  residencePlural: string; pageOf: string; prev: string; next: string;
  emptyHeading: string; emptyBody: string; emptyCta: string; advisoryEyebrow: string;
  advisoryHeadingDefault: string; advisoryHeadingArea: string; advisoryBody: string; advisoryWhatsapp: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = uiContent<ListingsCopy>("listings", locale);
  const canonical = locale === "en" ? "/listings" : `/${locale}/listings`;
  const languages: Record<string, string> = { "x-default": "/listings", en: "/listings" };
  if (hasUiTranslation("listings", "uk")) languages.uk = "/uk/listings";
  if (hasUiTranslation("listings", "ru")) languages.ru = "/ru/listings";
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical, languages },
    robots: hasUiTranslation("listings", locale) ? { index: true, follow: true } : { index: false, follow: true },
  };
}

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
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  const c = uiContent<ListingsCopy>("listings", locale);
  const sp = await searchParams;
  const [areas, everything] = await Promise.all([getAreas(locale), queryListings({})]);

  // Valid community filters = curated area pages ∪ every community present in the
  // live inventory (e.g. a CRM-only community such as The Valley). This lets
  // /listings?area=the-valley resolve even without a curated area guide.
  const areaOptionMap = new Map<string, string>();
  for (const a of areas) areaOptionMap.set(a.slug, a.label);
  for (const l of everything) {
    if (!areaOptionMap.has(l.area)) areaOptionMap.set(l.area, l.areaLabel || l.area);
  }
  const areaOptions = [...areaOptionMap.entries()]
    .map(([slug, label]) => ({ slug, label }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const activeArea: AreaSlug | "all" =
    sp.area && areaOptionMap.has(sp.area) ? (sp.area as AreaSlug) : "all";
  const activeAreaLabel = activeArea === "all" ? null : areaOptionMap.get(activeArea) ?? null;
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
        <p className="eyebrow mb-5">
          {activeAreaLabel ? activeAreaLabel : c.eyebrowDefault}
        </p>
        <h1 className="display-hero max-w-[16ch] text-ink" style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)" }}>
          {activeAreaLabel ? c.h1Area.replace("{area}", activeAreaLabel) : c.h1Default}
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted">
          {activeAreaLabel ? (
            <>
              {c.introAreaLead.replace("{area}", activeAreaLabel)}{" "}
              <Link href="/listings" className="text-accent-600 underline-offset-2 hover:underline">
                {c.viewAllCommunities}
              </Link>
              .
            </>
          ) : (
            <>{c.introDefault}</>
          )}
        </p>
      </section>

      <section className="container-lux">
        <div className="rounded-lg border border-line bg-elevated p-6 sm:p-8">
          <ListingFilterBar
            areas={areaOptions}
            types={TYPES}
            activeArea={activeArea}
            activeBand={activeBand}
            activeType={activeType}
            activeBeds={activeBeds}
            activeSize={activeSize}
          />
        </div>
        <p className="mt-6 text-sm text-faint" aria-live="polite">
          {all.length} {all.length === 1 ? c.residenceSingular : c.residencePlural}
          {totalPages > 1 && ` · ${c.pageOf.replace("{page}", String(page)).replace("{total}", String(totalPages))}`}
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
                    ← {c.prev}
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
                    {c.next} →
                  </Link>
                )}
              </nav>
            )}
          </>
        ) : (
          <div className="rounded-lg border border-line bg-elevated p-12 text-center">
            <h2 className="font-display text-2xl text-ink">
              {c.emptyHeading}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted">{c.emptyBody}</p>
            <a
              href={whatsappLink(`Hello ${site.name}, I'm looking for a specific home.`)}
              className="btn btn-accent mt-8"
              target="_blank"
              rel="noopener noreferrer"
            >
              {c.emptyCta}
            </a>
          </div>
        )}
      </section>

      {/* Lead form — every non-home page should give a direct way to enquire. */}
      <section className="border-t border-line bg-elevated">
        <div className="container-lux grid gap-12 py-[var(--section-py)] lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start lg:gap-16">
          <div>
            <p className="eyebrow mb-4">{c.advisoryEyebrow}</p>
            <h2 className="display-h2 max-w-[16ch] text-ink">
              {activeAreaLabel ? c.advisoryHeadingArea.replace("{area}", activeAreaLabel) : c.advisoryHeadingDefault}
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted">{c.advisoryBody}</p>
            <a
              href={whatsappLink(
                activeAreaLabel
                  ? `Hello ${site.name}, I'd like to discuss homes in ${activeAreaLabel}.`
                  : `Hello ${site.name}, I'm looking for a specific home.`,
              )}
              className="link-whatsapp mt-6 inline-block text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              {c.advisoryWhatsapp}
            </a>
          </div>
          <LeadForm
            defaultArea={activeAreaLabel ?? undefined}
            source={activeArea === "all" ? "listings" : `listings:${activeArea}`}
          />
        </div>
      </section>
    </>
  );
}
