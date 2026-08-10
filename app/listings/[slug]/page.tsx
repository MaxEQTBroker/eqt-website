import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllListingSlugs,
  getListingBySlug,
} from "@/lib/data/repository";
import { LeadForm } from "@/components/lead/LeadForm";
import {
  BreadcrumbJsonLd,
  ListingJsonLd,
} from "@/lib/seo/jsonld";
import { formatAed, formatSqft } from "@/lib/format";
import { site, whatsappLink } from "@/lib/site";

/** Statically generate every listing page at build time (SSG). */
export async function generateStaticParams() {
  const slugs = await getAllListingSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) return {};
  return {
    title: `${listing.title}, ${listing.areaLabel}`,
    description: listing.summary,
    alternates: { canonical: `/listings/${listing.slug}` },
    openGraph: {
      title: `${listing.title}, ${site.name}`,
      description: listing.summary,
      images: listing.images.map((img) => img.url),
    },
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) notFound();

  const [cover, ...rest] = listing.images;
  const enquiry = whatsappLink(
    `Hello ${site.name}, I'd like to enquire about ${listing.title} (Ref ${listing.reference}).`,
  );

  const specs = [
    { label: "Bedrooms", value: String(listing.bedrooms) },
    { label: "Bathrooms", value: String(listing.bathrooms) },
    { label: "Built-up area", value: formatSqft(listing.areaSqft) },
    ...(listing.plotSqft ? [{ label: "Plot", value: formatSqft(listing.plotSqft) }] : []),
    { label: "Type", value: listing.type },
    { label: "Community", value: listing.community ?? listing.areaLabel },
    { label: "Reference", value: listing.reference },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Listings", path: "/listings" },
          { name: listing.title, path: `/listings/${listing.slug}` },
        ]}
      />
      <ListingJsonLd listing={listing} />

      <article className="container-lux pt-40">
        <Link href="/listings" className="eyebrow inline-block transition-opacity hover:opacity-60">
          ← All listings
        </Link>

        {/* Lead form left rail; photos + details on the right (matches /sold). */}
        <div className="mt-8 grid gap-12 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-16 lg:items-start">
          {/* Left: enquiry form */}
          <aside id="enquire" className="lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow mb-2">Interested in this home?</p>
            <p className="mb-4 text-sm text-muted">
              Tell us your brief and an advisor will be in touch about this{" "}
              {listing.type.toLowerCase()} in {listing.areaLabel}, and similar homes.
            </p>
            <a
              href={enquiry}
              className="link-whatsapp mb-5 inline-block text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Message us on WhatsApp
            </a>
            <LeadForm defaultArea={listing.community ?? listing.areaLabel} source={`listing:${listing.slug}`} />
          </aside>

          {/* Right: gallery + details */}
          <div className="min-w-0">
            {cover && (
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg" style={{ backgroundColor: cover.tone }}>
                <Image
                  src={cover.url}
                  alt={cover.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-cover"
                />
              </div>
            )}
            {rest.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                {rest.map((img) => (
                  <div key={img.url} className="relative aspect-[4/3] overflow-hidden rounded-lg" style={{ backgroundColor: img.tone }}>
                    <Image src={img.url} alt={img.alt} fill sizes="(max-width: 1024px) 50vw, 400px" className="object-cover" />
                  </div>
                ))}
              </div>
            )}

            <Link href={`/areas/${listing.area}`} className="eyebrow mt-8 inline-block hover:underline">
              {listing.areaLabel}
            </Link>
            <h1 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] leading-tight text-ink">
              {listing.title}
            </h1>
            <p className="mt-4 text-2xl text-accent-500">
              {listing.priceLabel ?? formatAed(listing.priceAed)}
            </p>

            <p className="mt-8 text-lg leading-relaxed text-muted">{listing.description}</p>

            {listing.highlights.length > 0 && (
              <div className="mt-10">
                <p className="eyebrow mb-5">Highlights</p>
                <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {listing.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-line pt-8 sm:grid-cols-3">
              {specs.map((spec) => (
                <div key={spec.label}>
                  <dt className="text-sm text-faint">{spec.label}</dt>
                  <dd className="mt-1 text-ink">{spec.value}</dd>
                </div>
              ))}
            </dl>

            {/* Permit number, legally required on Dubai listings */}
            <p className="mt-8 text-xs text-faint">
              Permit No. <span className="text-muted">{listing.permitNumber}</span>
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
