/**
 * JSON-LD structured data components. Rendered server-side inside real HTML so
 * both search crawlers and AI answer engines can extract facts directly.
 *
 * Emits schema.org types: Organization, RealEstateAgent, BreadcrumbList,
 * RealEstateListing + Offer, and FAQPage.
 */

import { site } from "@/lib/site";
import type { Area, Developer, Listing, SoldRecord } from "@/lib/data/types";
import type { BlogPost } from "@/lib/data/blog";
import { formatAedFull } from "@/lib/format";

/** Resolve a possibly-relative asset URL to an absolute one for schema/OG. */
function absUrl(url: string): string {
  return url.startsWith("http") ? url : `${site.url}${url}`;
}

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
        sameAs: [site.social.instagram],
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

/** Developer as an Organization (with the brands/communities it builds). */
export function DeveloperJsonLd({ developer }: { developer: Developer }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: developer.name,
        description: developer.intro,
        ...(developer.logo ? { logo: absUrl(developer.logo) } : {}),
        url: `${site.url}/developers/${developer.slug}`,
        knowsAbout: developer.signature,
      }}
    />
  );
}

/** Team members as Person entities (E-E-A-T + entity signal for search/AI). */
export function TeamJsonLd({
  members,
}: {
  members: { name: string; role: string; photo: string; slug: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": members.map((m) => ({
          "@type": "Person",
          name: m.name,
          jobTitle: m.role,
          image: absUrl(m.photo),
          url: `${site.url}/team`,
          worksFor: { "@type": "RealEstateAgent", name: site.name, url: site.url },
        })),
      }}
    />
  );
}

/** Generic FAQPage — used by blog posts (and anywhere a Q&A list appears). */
export function FaqJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  if (!faqs.length) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }}
    />
  );
}

/** BlogPosting — lets search + AI engines attribute and cite the article. */
export function ArticleJsonLd({ post }: { post: BlogPost }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: [absUrl(post.heroImage.url)],
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        author: { "@type": "Organization", name: post.author.name, url: site.url },
        publisher: {
          "@type": "Organization",
          name: site.name,
          logo: { "@type": "ImageObject", url: `${site.url}/brand/logo-mark.png` },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/blog/${post.slug}` },
        keywords: post.keywords.join(", "),
        articleSection: post.category,
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
