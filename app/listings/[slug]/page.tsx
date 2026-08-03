import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllListingSlugs,
  getListingBySlug,
} from "@/lib/data/repository";
import { Reveal } from "@/components/motion/Reveal";
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

      {/* Gallery */}
      <section className="container-lux pt-32">
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg" style={{ backgroundColor: cover.tone }}>
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1400px"
            className="object-cover"
          />
        </div>
        {rest.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {rest.map((img) => (
              <div key={img.url} className="relative aspect-[4/3] overflow-hidden rounded-lg" style={{ backgroundColor: img.tone }}>
                <Image src={img.url} alt={img.alt} fill sizes="(max-width: 640px) 50vw, 33vw" className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Header + details */}
      <section className="container-lux py-[var(--section-py)]">
        <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          {/* Main */}
          <div>
            <Link href={`/areas/${listing.area}`} className="eyebrow hover:underline">
              {listing.areaLabel}
            </Link>
            <h1 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] text-ink">
              {listing.title}
            </h1>
            <p className="mt-4 text-2xl text-accent-500">
              {listing.priceLabel ?? formatAed(listing.priceAed)}
            </p>

            <div className="mt-10 hairline" />

            <p className="mt-10 text-lg leading-relaxed text-muted">{listing.description}</p>

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
          </div>

          {/* Sticky enquiry / specs */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg border border-line bg-elevated p-8">
              <dl className="space-y-4">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex items-baseline justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0">
                    <dt className="text-sm text-faint">{spec.label}</dt>
                    <dd className="text-right text-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <a href={enquiry} className="btn btn-whatsapp mt-8 w-full" target="_blank" rel="noopener noreferrer">
                Enquire on WhatsApp
              </a>
              <a href={`mailto:${site.contact.email}?subject=${encodeURIComponent(`Enquiry: ${listing.title} (${listing.reference})`)}`} className="btn btn-ghost mt-3 w-full">
                Email us
              </a>

              {/* Permit number, legally required on Dubai listings */}
              <p className="mt-6 text-center text-xs text-faint">
                Permit No.{" "}
                <span className="text-muted">{listing.permitNumber}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
