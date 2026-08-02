import type { Metadata } from "next";
import { getAreas, getSoldRecords } from "@/lib/data/repository";
import type { AreaSlug } from "@/lib/data/types";
import { SoldCard } from "@/components/ui/SoldCard";
import { Reveal } from "@/components/motion/Reveal";
import {
  SoldFilterBar,
  bandFromToken,
  type PriceBandToken,
} from "@/components/sold/SoldFilterBar";
import {
  BreadcrumbJsonLd,
  SoldCollectionJsonLd,
} from "@/lib/seo/jsonld";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sold Portfolio",
  description:
    "EQT's verified track record of completed luxury sales across Palm Jumeirah, Al Barari and Jumeirah Islands. Filter by community and price.",
  // Canonical stays clean so filtered views don't create duplicate content.
  alternates: { canonical: "/sold" },
};

type SearchParams = { area?: string; band?: string };

export default async function SoldPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const areas = await getAreas();
  const areaSlugs = areas.map((a) => a.slug);

  const activeArea: AreaSlug | "all" =
    sp.area && areaSlugs.includes(sp.area as AreaSlug)
      ? (sp.area as AreaSlug)
      : "all";
  const band = bandFromToken(sp.band);
  const activeBand = band.token as PriceBandToken;

  const records = await getSoldRecords({
    area: activeArea === "all" ? undefined : activeArea,
    minPriceAed: band.minPriceAed,
    maxPriceAed: band.maxPriceAed,
  });

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Sold Portfolio", path: "/sold" },
        ]}
      />
      <SoldCollectionJsonLd records={records} />

      {/* Header */}
      <section className="container-lux pb-16 pt-40">
        <p className="eyebrow mb-5">Proven results</p>
        <h1 className="display-hero max-w-[16ch] text-ink" style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)" }}>
          The sold portfolio
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted">
          A record you can verify — completed sales across Dubai&apos;s most
          exclusive communities. Confidential where required, always real.
        </p>
      </section>

      {/* Filters */}
      <section className="container-lux">
        <div className="rounded-lg border border-line bg-elevated p-6 sm:p-8">
          <SoldFilterBar
            areas={areas}
            activeArea={activeArea}
            activeBand={activeBand}
          />
        </div>
        <p className="mt-6 text-sm text-faint" aria-live="polite">
          {records.length} {records.length === 1 ? "result" : "results"}
          {activeArea !== "all" &&
            ` in ${areas.find((a) => a.slug === activeArea)?.label}`}
          {band.token !== "all" && ` · ${band.label}`}
        </p>
      </section>

      {/* Results */}
      <section className="container-lux py-16">
        {records.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {records.map((record, i) => (
              <Reveal key={record.reference} delay={(i % 3) * 90}>
                <SoldCard record={record} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-line bg-elevated p-12 text-center">
            <h2 className="font-display text-2xl text-ink">
              No sales match this filter — yet.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              We complete confidential transactions regularly. Tell us what
              you&apos;re after and we&apos;ll share relevant, comparable results.
            </p>
            <a
              href={whatsappLink(`Hello ${site.name}, I'd like to see your track record.`)}
              className="btn btn-accent mt-8"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask on WhatsApp
            </a>
          </div>
        )}
      </section>

      {/* Closing CTA */}
      <section className="border-t border-line bg-elevated">
        <div className="container-lux flex flex-col items-start gap-8 py-[var(--section-py)] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow mb-4">Thinking of selling?</p>
            <h2 className="display-h2 max-w-[16ch] text-ink">
              Your home deserves the same result
            </h2>
          </div>
          <a
            href={whatsappLink(`Hello ${site.name}, I'd like a valuation.`)}
            className="btn btn-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Request a valuation
          </a>
        </div>
      </section>
    </>
  );
}
