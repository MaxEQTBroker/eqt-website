import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllListingSlugs,
  getListingBySlug,
} from "@/lib/data/repository";
import { agentForListing } from "@/lib/data/agents";
import { LeadForm } from "@/components/lead/LeadForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
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
    // listing.title often already ends with the area; only append it when absent
    // (avoids "..., Al Barari, Al Barari" and keeps the title under the length cap).
    title: listing.title.includes(listing.areaLabel)
      ? listing.title
      : `${listing.title}, ${listing.areaLabel}`,
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
  const agent = agentForListing(listing);
  const telHref = `tel:${site.contact.phone.replace(/\s+/g, "")}`;
  const enquiry = whatsappLink(
    `Hello ${site.name}, I'd like to enquire about ${listing.title} (Ref ${listing.reference}). Could ${agent.name.split(" ")[0]} help me?`,
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
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Listings", href: "/listings" },
            { name: listing.title, href: `/listings/${listing.slug}` },
          ]}
        />

        {/* Lead form left rail; photos + details on the right (matches /sold). */}
        <div className="mt-8 grid gap-12 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-16 lg:items-start">
          {/* Left: enquiry form */}
          <aside id="enquire" className="lg:sticky lg:top-24 lg:self-start">
            {/* Assigned advisor — one-tap WhatsApp / Call */}
            <div className="mb-6 flex items-center gap-4 rounded-lg border border-line bg-elevated p-4">
              <Image
                src={agent.photo}
                alt={agent.name}
                width={52}
                height={52}
                className="h-[52px] w-[52px] shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-lg leading-tight text-ink">{agent.name}</p>
                <p className="truncate text-xs text-muted">{agent.role}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={enquiry}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${agent.name}`}
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

            <p className="eyebrow mb-2">Interested in this home?</p>
            <p className="mb-4 text-sm text-muted">
              Tell us your brief and an advisor will be in touch about this{" "}
              {listing.type.toLowerCase()} in {listing.areaLabel}, and similar homes.
            </p>
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
            {/* Freshness signal (helps AI/search favour current pages) */}
            <p className="mt-2 text-xs text-faint">
              Updated{" "}
              {new Date(listing.updatedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
