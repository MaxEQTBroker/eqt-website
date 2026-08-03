/**
 * Data contract for the public marketing site.
 *
 * These types are intentionally shaped to mirror the CRM's future
 * `public_listings` and `public_sold` read-only views. When we wire the CRM,
 * only `repository.ts` changes, components depend on these types, not on
 * where the data comes from.
 *
 * NOTE: Only publicly-permitted fields belong here. No internal CRM fields,
 * owner PII, or commission data may ever cross this seam.
 */

/** Dubai communities we operate in. Slugs are used in clean URLs. */
/**
 * Community slug used in clean URLs (/areas/[slug]). Kept as a string so we can
 * cover ANY Dubai community/area without touching the type — the repository
 * looks areas up by slug.
 */
export type AreaSlug = string;

export type PropertyType =
  | "Villa"
  | "Mansion"
  | "Penthouse"
  | "Apartment"
  | "Townhouse"
  | "Plot";

export type ListingStatus = "available" | "under-offer" | "sold";

/** A single image with alt text (alt text matters for SEO + accessibility). */
export interface MediaImage {
  url: string;
  alt: string;
  /** Optional blur/placeholder color for progressive loading. */
  tone?: string;
}

/** Core listing, maps to a row in `public_listings`. */
export interface Listing {
  /** Stable slug for the URL: /listings/[slug]. */
  slug: string;
  /** CRM reference id (public-safe). */
  reference: string;
  title: string;
  area: AreaSlug;
  areaLabel: string;
  community?: string;
  type: PropertyType;
  status: ListingStatus;

  /** Price in AED. `undefined` => "Price on application". */
  priceAed?: number;
  priceLabel?: string;

  bedrooms: number;
  bathrooms: number;
  /** Internal built-up area in square feet. */
  areaSqft: number;
  /** Optional plot size in square feet. */
  plotSqft?: number;

  /** Short marketing summary, real text for crawlers & AI engines. */
  summary: string;
  /** Longer narrative description. */
  description: string;
  highlights: string[];

  images: MediaImage[];

  /** Dubai regulatory permit number, legally required on listings. */
  permitNumber: string;

  /** Curated/featured flag for the home page. */
  featured?: boolean;

  /** ISO date the listing was published/updated (for sitemaps & freshness). */
  updatedAt: string;
}

/** A completed transaction, maps to a row in `public_sold`. */
export interface SoldRecord {
  reference: string;
  title: string;
  area: AreaSlug;
  areaLabel: string;
  type: PropertyType;

  /** Sold price in AED. May be withheld => undefined + priceLabel. */
  soldPriceAed?: number;
  priceLabel?: string;

  bedrooms: number;
  areaSqft: number;

  /** ISO date of completion. */
  soldDate: string;

  image?: MediaImage;
  /** Optional one-line proof/story. */
  note?: string;
}

/** Area guide content, maps to a curated CMS/CRM area record. */
export interface Area {
  slug: AreaSlug;
  label: string;
  headline: string;
  /** Rich, indexable guide copy. */
  intro: string;
  /** Q&A blocks power AEO / featured-snippet extraction. */
  faqs: { question: string; answer: string }[];
  keyFacts: { label: string; value: string }[];
  /** SEO keyword phrases for this community (meta keywords + on-page tags). */
  keywords?: string[];
  heroImage: MediaImage;
}

/** Trust / credibility signal shown across the site. */
export interface TrustSignal {
  label: string;
  value: string;
  detail?: string;
}

/** Filters accepted by the sold-portfolio query. */
export interface SoldQuery {
  area?: AreaSlug;
  minPriceAed?: number;
  maxPriceAed?: number;
}

/** Filters accepted by the available-listings query. */
export interface ListingQuery {
  area?: AreaSlug;
  type?: PropertyType;
  minPriceAed?: number;
  maxPriceAed?: number;
}
