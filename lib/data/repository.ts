/**
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  THE DATA SEAM                                                        │
 * │                                                                      │
 * │  This is the ONLY module that knows where data comes from. Today it  │
 * │  returns mock data. To wire the CRM later, replace the bodies below  │
 * │  with fetches to the `public_listings` / `public_sold` views, the   │
 * │  function signatures and return types stay identical, so no          │
 * │  component or page needs to change.                                  │
 * │                                                                      │
 * │  All functions are async and return Promises on purpose, so the      │
 * │  swap to a network/DB call is a drop-in.                             │
 * └─────────────────────────────────────────────────────────────────────┘
 */

import type {
  Area,
  AreaSlug,
  Developer,
  Listing,
  ListingQuery,
  PropertyGuide,
  SoldQuery,
  SoldRecord,
  TrustSignal,
} from "./types";
import { mockListings } from "./mock/listings";
import { mockSold } from "./mock/sold";
import { mockAreas } from "./mock/areas";
import { mockDevelopers } from "./mock/developers";
import { mockPropertyTypes } from "./mock/propertyTypes";
import { mockTrustSignals } from "./mock/trust";
import { heroImages } from "./mock/heroImages";
import { areaContent } from "./mock/areaContent";
import { developerContent } from "./mock/developerContent";

/**
 * Overlay the central Pexels hero image onto a record if one exists for its
 * slug. Keeps the mock data files clean and gives one place to swap stock for
 * real photography later. Records without an override keep their own image
 * (e.g. Palm Jumeirah / Al Barari use real brochure photos).
 */
function withHero<T extends { slug: string; heroImage: import("./types").MediaImage }>(item: T): T {
  const hero = heroImages[item.slug];
  return hero ? { ...item, heroImage: hero } : item;
}

/** Overlay extended sections (and any extra FAQs) from a content map by slug. */
function withContent<
  T extends { slug: string; faqs: { question: string; answer: string }[]; sections?: import("./types").GuideSection[] },
>(item: T, map: Record<string, import("./types").GuideContent>): T {
  const c = map[item.slug];
  if (!c) return item;
  return {
    ...item,
    sections: c.sections,
    faqs: c.faqs && c.faqs.length ? [...item.faqs, ...c.faqs] : item.faqs,
  };
}

// ── Listings ──────────────────────────────────────────────────────────

/**
 * Map CRM community slugs onto our neighbourhood-page slugs so those listings
 * cross-link to a real area page (better internal linking + indexing). Only
 * true synonyms — distinct communities (e.g. DAMAC Hills 2) are left alone.
 */
const AREA_SLUG_ALIASES: Record<string, string> = {
  bluewaters: "bluewaters-island",
  "dubai-creek-harbour-the-lagoons": "dubai-creek-harbour",
  "the-lagoons": "dubai-creek-harbour",
  jbr: "jumeirah-beach-residence",
};
function normalizeArea(area: string): AreaSlug {
  return (AREA_SLUG_ALIASES[area] ?? area) as AreaSlug;
}

/**
 * Fetch active listings from the CRM/scraper public endpoint. Returns null when
 * not configured (fall back to mock), [] on error. 5-minute ISR cache.
 * CONFIG (Vercel env, server-side): CRM_LISTINGS_URL, CRM_LISTINGS_TOKEN.
 */
async function fetchListingsFromCRM(): Promise<Listing[] | null> {
  const url = process.env.CRM_LISTINGS_URL;
  if (!url) return null;
  try {
    const res = await fetch(url, {
      headers: process.env.CRM_LISTINGS_TOKEN
        ? { Authorization: `Bearer ${process.env.CRM_LISTINGS_TOKEN}` }
        : {},
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      console.error("[listings] CRM responded", res.status);
      return [];
    }
    const data = await res.json();
    const arr: unknown[] = Array.isArray(data) ? data : (data?.listings ?? data?.records ?? []);
    return arr.map((raw): Listing => {
      const r = raw as Record<string, unknown>;
      const rawImgs = Array.isArray(r.images) ? (r.images as unknown[]) : [];
      const images = rawImgs
        .map((im) => {
          const o = im as { url?: string; alt?: string };
          const u = typeof im === "string" ? im : o?.url;
          return u ? { url: String(u), alt: String(o?.alt ?? r.title ?? "") } : null;
        })
        .filter((x): x is { url: string; alt: string } => x !== null);
      const description = String(r.description ?? r.summary ?? "");
      // The CRM import has full descriptions but no separate short summary,
      // so derive one (first sentence, capped) when it's missing.
      const summaryRaw = typeof r.summary === "string" ? r.summary.trim() : "";
      const summary =
        summaryRaw ||
        (description.split(/(?<=[.!?])\s/)[0] || description).slice(0, 180).trim();
      return {
        slug: String(r.slug ?? r.reference ?? ""),
        reference: String(r.reference ?? ""),
        title: String(r.title ?? ""),
        area: normalizeArea(String(r.area ?? "")),
        areaLabel: String(r.areaLabel ?? r.area ?? ""),
        community: typeof r.community === "string" ? r.community : undefined,
        type: (r.type as Listing["type"]) ?? "Apartment",
        status: (r.status as Listing["status"]) ?? "available",
        priceAed: typeof r.priceAed === "number" ? r.priceAed : undefined,
        priceLabel: typeof r.priceLabel === "string" ? r.priceLabel : undefined,
        bedrooms: Number(r.bedrooms ?? 0),
        bathrooms: Number(r.bathrooms ?? 0),
        areaSqft: Number(r.areaSqft ?? 0),
        plotSqft: typeof r.plotSqft === "number" ? r.plotSqft : undefined,
        summary,
        description,
        highlights: Array.isArray(r.highlights) ? (r.highlights as unknown[]).map(String) : [],
        images,
        permitNumber: String(r.permitNumber ?? ""),
        featured: Boolean(r.featured),
        updatedAt: String(r.updatedAt ?? ""),
      };
    });
  } catch (err) {
    console.error("[listings] fetch failed", err);
    return [];
  }
}

/** Real CRM listings when configured; mock data otherwise (demo/preview). */
async function listingsSource(): Promise<Listing[]> {
  return (await fetchListingsFromCRM()) ?? mockListings;
}

export async function getFeaturedListings(limit = 3): Promise<Listing[]> {
  return (await listingsSource())
    .filter((l) => l.featured && l.status !== "sold")
    .slice(0, limit);
}

export async function getAvailableListings(area?: AreaSlug): Promise<Listing[]> {
  return (await listingsSource()).filter(
    (l) => l.status !== "sold" && (!area || l.area === area),
  );
}

export async function queryListings(query: ListingQuery = {}): Promise<Listing[]> {
  return (await listingsSource())
    .filter((l) => l.status !== "sold")
    .filter((l) => !query.area || l.area === query.area)
    .filter((l) => !query.type || l.type === query.type)
    .filter((l) => query.minPriceAed == null || (l.priceAed ?? 0) >= query.minPriceAed)
    .filter(
      (l) => query.maxPriceAed == null || (l.priceAed ?? Infinity) <= query.maxPriceAed,
    )
    .filter((l) => query.minBedrooms == null || (l.bedrooms ?? 0) >= query.minBedrooms)
    .filter((l) => query.minAreaSqft == null || (l.areaSqft ?? 0) >= query.minAreaSqft)
    .filter(
      (l) => query.maxAreaSqft == null || (l.areaSqft ?? Infinity) <= query.maxAreaSqft,
    )
    .sort((a, b) => (b.priceAed ?? 0) - (a.priceAed ?? 0));
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  return (await listingsSource()).find((l) => l.slug === slug) ?? null;
}

export async function getAllListingSlugs(): Promise<string[]> {
  return (await listingsSource()).map((l) => l.slug);
}

// ── Sold track record ─────────────────────────────────────────────────

/**
 * Fetch published sold records from the CRM's public read endpoint. Returns
 * null when not configured (so we fall back to mock data), or [] on error/empty.
 * Cached for 5 minutes via Next's fetch revalidation.
 *
 * CONFIG (Vercel env, server-side): CRM_SOLD_URL, CRM_SOLD_TOKEN.
 */
/** Sold records whose first photo is a blank/marble placeholder to be dropped. */
const SOLD_DROP_FIRST_PHOTO = new Set<string>(["EQT-3096", "EQT-3122"]);

async function fetchSoldFromCRM(): Promise<SoldRecord[] | null> {
  const url = process.env.CRM_SOLD_URL;
  if (!url) return null;
  try {
    const res = await fetch(url, {
      headers: process.env.CRM_SOLD_TOKEN
        ? { Authorization: `Bearer ${process.env.CRM_SOLD_TOKEN}` }
        : {},
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      console.error("[sold] CRM responded", res.status);
      return [];
    }
    const data = await res.json();
    const arr: unknown[] = Array.isArray(data) ? data : (data?.records ?? []);
    return arr.map((raw): SoldRecord => {
      const r = raw as Record<string, unknown>;
      const reference = String(r.reference ?? "");
      const title = String(r.title ?? "");
      const rawImgs = Array.isArray(r.images) ? (r.images as unknown[]) : [];
      let images = rawImgs
        .map((im) => {
          const o = im as { url?: string; alt?: string };
          const u = typeof im === "string" ? im : o?.url;
          return u ? { url: String(u), alt: String(o?.alt ?? title) } : null;
        })
        .filter((x): x is { url: string; alt: string } => x !== null);
      // A few records lead with a blank marble/placeholder cover — drop it so the
      // real first photo becomes the cover (list page) and gallery lead.
      const dropFirst = SOLD_DROP_FIRST_PHOTO.has(reference) && images.length > 1;
      if (dropFirst) images = images.slice(1);
      const single = r.image as { url?: string; alt?: string } | undefined;
      const cover = dropFirst
        ? images[0]
        : ((single?.url ? { url: single.url, alt: single.alt ?? title } : undefined) ??
          images[0]);
      return {
        reference,
        title,
        area: normalizeArea(String(r.area ?? "")),
        areaLabel: String(r.areaLabel ?? r.area ?? ""),
        type: (r.type as SoldRecord["type"]) ?? "Villa",
        soldPriceAed: typeof r.soldPriceAed === "number" ? r.soldPriceAed : undefined,
        priceLabel: typeof r.priceLabel === "string" ? r.priceLabel : undefined,
        bedrooms: Number(r.bedrooms ?? 0),
        areaSqft: Number(r.areaSqft ?? 0),
        soldDate: String(r.soldDate ?? ""),
        image: cover,
        images: images.length > 0 ? images : cover ? [cover] : [],
        note: typeof r.note === "string" ? r.note : undefined,
      };
    });
  } catch (err) {
    console.error("[sold] fetch failed", err);
    return [];
  }
}

export async function getSoldRecords(query: SoldQuery = {}): Promise<SoldRecord[]> {
  // Real CRM data when configured; mock data otherwise (for demo/preview).
  const source = (await fetchSoldFromCRM()) ?? mockSold;
  return source
    .filter((s) => (!query.area || s.area === query.area))
    .filter((s) =>
      query.minPriceAed == null || (s.soldPriceAed ?? 0) >= query.minPriceAed,
    )
    .filter((s) =>
      query.maxPriceAed == null || (s.soldPriceAed ?? Infinity) <= query.maxPriceAed,
    )
    .sort((a, b) => b.soldDate.localeCompare(a.soldDate));
}

export async function getSoldTeaser(limit = 3): Promise<SoldRecord[]> {
  return (await getSoldRecords()).slice(0, limit);
}

/** A single sold record by its CRM reference (for the sold detail page). */
export async function getSoldByReference(
  reference: string,
): Promise<SoldRecord | null> {
  const all = (await fetchSoldFromCRM()) ?? mockSold;
  return all.find((s) => s.reference === reference) ?? null;
}

/** All sold references that can back a detail page (non-empty). */
export async function getAllSoldReferences(): Promise<string[]> {
  const all = (await fetchSoldFromCRM()) ?? mockSold;
  return all.map((s) => s.reference).filter(Boolean);
}

// ── Areas ─────────────────────────────────────────────────────────────

export async function getAreas(): Promise<Area[]> {
  return mockAreas.map(withHero);
}

export async function getAreaBySlug(slug: string): Promise<Area | null> {
  const area = mockAreas.find((a) => a.slug === slug);
  return area ? withContent(withHero(area), areaContent) : null;
}

export async function getAllAreaSlugs(): Promise<AreaSlug[]> {
  return mockAreas.map((a) => a.slug);
}

// ── Developers ────────────────────────────────────────────────────────

export async function getDevelopers(): Promise<Developer[]> {
  return mockDevelopers.map(withHero);
}

export async function getDeveloperBySlug(slug: string): Promise<Developer | null> {
  const dev = mockDevelopers.find((d) => d.slug === slug);
  return dev ? withContent(withHero(dev), developerContent) : null;
}

export async function getAllDeveloperSlugs(): Promise<string[]> {
  return mockDevelopers.map((d) => d.slug);
}

// ── Property-type guides ──────────────────────────────────────────────

export async function getPropertyGuides(): Promise<PropertyGuide[]> {
  return mockPropertyTypes.map(withHero);
}

export async function getPropertyGuideBySlug(slug: string): Promise<PropertyGuide | null> {
  const guide = mockPropertyTypes.find((p) => p.slug === slug);
  return guide ? withHero(guide) : null;
}

export async function getAllPropertyTypeSlugs(): Promise<string[]> {
  return mockPropertyTypes.map((p) => p.slug);
}

// ── Trust signals ─────────────────────────────────────────────────────

export async function getTrustSignals(): Promise<TrustSignal[]> {
  return mockTrustSignals;
}
