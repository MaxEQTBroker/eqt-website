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
  SoldQuery,
  SoldRecord,
  TrustSignal,
} from "./types";
import { mockListings } from "./mock/listings";
import { mockSold } from "./mock/sold";
import { mockAreas } from "./mock/areas";
import { mockDevelopers } from "./mock/developers";
import { mockTrustSignals } from "./mock/trust";

// ── Listings ──────────────────────────────────────────────────────────

export async function getFeaturedListings(limit = 3): Promise<Listing[]> {
  return mockListings
    .filter((l) => l.featured && l.status !== "sold")
    .slice(0, limit);
}

export async function getAvailableListings(area?: AreaSlug): Promise<Listing[]> {
  return mockListings.filter(
    (l) => l.status !== "sold" && (!area || l.area === area),
  );
}

export async function queryListings(query: ListingQuery = {}): Promise<Listing[]> {
  return mockListings
    .filter((l) => l.status !== "sold")
    .filter((l) => !query.area || l.area === query.area)
    .filter((l) => !query.type || l.type === query.type)
    .filter((l) => query.minPriceAed == null || (l.priceAed ?? 0) >= query.minPriceAed)
    .filter(
      (l) => query.maxPriceAed == null || (l.priceAed ?? Infinity) <= query.maxPriceAed,
    )
    .sort((a, b) => (b.priceAed ?? 0) - (a.priceAed ?? 0));
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  return mockListings.find((l) => l.slug === slug) ?? null;
}

export async function getAllListingSlugs(): Promise<string[]> {
  return mockListings.map((l) => l.slug);
}

// ── Sold track record ─────────────────────────────────────────────────

export async function getSoldRecords(query: SoldQuery = {}): Promise<SoldRecord[]> {
  return mockSold
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

// ── Areas ─────────────────────────────────────────────────────────────

export async function getAreas(): Promise<Area[]> {
  return mockAreas;
}

export async function getAreaBySlug(slug: string): Promise<Area | null> {
  return mockAreas.find((a) => a.slug === slug) ?? null;
}

export async function getAllAreaSlugs(): Promise<AreaSlug[]> {
  return mockAreas.map((a) => a.slug);
}

// ── Developers ────────────────────────────────────────────────────────

export async function getDevelopers(): Promise<Developer[]> {
  return mockDevelopers;
}

export async function getDeveloperBySlug(slug: string): Promise<Developer | null> {
  return mockDevelopers.find((d) => d.slug === slug) ?? null;
}

export async function getAllDeveloperSlugs(): Promise<string[]> {
  return mockDevelopers.map((d) => d.slug);
}

// ── Trust signals ─────────────────────────────────────────────────────

export async function getTrustSignals(): Promise<TrustSignal[]> {
  return mockTrustSignals;
}
