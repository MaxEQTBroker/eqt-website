/**
 * JSON-LD structured data components. Rendered server-side inside real HTML so
 * both search crawlers and AI answer engines can extract facts directly.
 *
 * Emits schema.org types: Organization, RealEstateAgent, BreadcrumbList,
 * RealEstateListing + Offer, and FAQPage.
 */

import { site } from "@/lib/site";
import type { Area, Listing, SoldRecord } from "@/lib/data/types";
import { formatAedFull } from "@/lib/format";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Server-rendered static JSON; safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Site-wide organisation + agent identity. Include once in the root layout. */
export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "@id": `${site.url}/#organization`,
        name: site.name,
        legalName: site.legalName,
        description: site.description,
        url: site.url,
        email: site.contact.email,
        telephone: site.contact.phone,
        areaServed: { "@type": "City", name: "Dubai" },
        address: {
          "@type": "PostalAddress",
          streetAddress: site.contact.address.street,
          addressLocality: site.contact.address.city,
          addressRegion: site.contact.address.region,
          addressCountry: site.contact.address.country,
        },
        identifier: {
          "@type": "PropertyValue",
          name: "RERA ORN",
          value: site.regulatory.reraOrn,
        },
        sameAs: [site.social.instagram, site.social.linkedin],
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${site.url}${item.path}`,
        })),
      }}
    />
  );
}

export function ListingJsonLd({ listing }: { listing: Listing }) {
  const offerPrice = listing.priceAed;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        name: listing.title,
        description: listing.summary,
        url: `${site.url}/listings/${listing.slug}`,
        image: listing.images.map((img) => img.url),
        datePosted: listing.updatedAt,
        identifier: listing.reference,
        additionalProperty: [
          { "@type": "PropertyValue", name: "Permit Number", value: listing.permitNumber },
          { "@type": "PropertyValue", name: "Bedrooms", value: listing.bedrooms },
          { "@type": "PropertyValue", name: "Bathrooms", value: listing.bathrooms },
          { "@type": "PropertyValue", name: "Area (sq ft)", value: listing.areaSqft },
        ],
        ...(offerPrice
          ? {
              offers: {
                "@type": "Offer",
                price: offerPrice,
                priceCurrency: "AED",
                availability:
                  listing.status === "available"
                    ? "https://schema.org/InStock"
                    : "https://schema.org/LimitedAvailability",
                priceSpecification: {
                  "@type": "PriceSpecification",
                  price: offerPrice,
                  priceCurrency: "AED",
                },
              },
            }
          : {}),
      }}
    />
  );
}

export function AreaFaqJsonLd({ area }: { area: Area }) {
  if (!area.faqs.length) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: area.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }}
    />
  );
}

export function SoldCollectionJsonLd({ records }: { records: SoldRecord[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "EQT sold portfolio",
        numberOfItems: records.length,
        itemListElement: records.map((r, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Residence",
            name: r.title,
            ...(r.soldPriceAed
              ? { description: `Sold for ${formatAedFull(r.soldPriceAed)} in ${r.areaLabel}.` }
              : {}),
          },
        })),
      }}
    />
  );
}
