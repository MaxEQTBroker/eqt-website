/**
 * Which advisor is shown on a listing (card + detail page).
 *
 * Assignment rule (Max, 2026-08-31), applied until the CRM sends a real
 * listing→agent mapping:
 *   • Palm Jumeirah listings  → Masoud Raeissi (luxury / Palm specialist)
 *   • Off-plan listings       → Alexandra Shukhovtseva (off-plan specialist)
 *   • Everything else         → deterministic rotation across the general
 *                               broker pool (stable per listing, never random
 *                               per render — SSR-safe, no Math.random()).
 */
import { team, type TeamMember } from "./team";
import type { Listing } from "./types";

function member(slug: string): TeamMember {
  const m = team.find((t) => t.slug === slug);
  if (!m) throw new Error(`agents.ts: unknown team slug "${slug}"`);
  return m;
}

const MASOUD = member("masoud-raeissi");
const ALEXANDRA = member("alexandra-shukhovtseva");

/**
 * General rotation pool: client-facing brokers excluding the two specialists
 * (kept for their own segments) and non-sales roles (CEO/CTO/admin).
 */
const GENERAL_POOL: TeamMember[] = [
  "kateryna-babenko",
  "turgun-massenova",
  "asra-baig",
  "carlos-abou-rjeily",
  "nazim-abidov",
].map(member);

/** Palm Jumeirah, matched loosely on slug/label so any Palm variant resolves. */
function isPalm(listing: Listing): boolean {
  const hay = `${listing.area} ${listing.areaLabel}`.toLowerCase();
  return hay.includes("palm");
}

/**
 * Off-plan detection. Listings carry no off-plan flag yet, so this returns
 * false for current (resale) inventory; once an off-plan stream exists (a
 * dedicated area slug or an `offPlan` field), extend this check and Alexandra
 * picks them up automatically.
 */
function isOffPlan(listing: Listing): boolean {
  const hay = `${listing.area} ${listing.areaLabel}`.toLowerCase();
  return hay.includes("off-plan") || hay.includes("off plan");
}

/** Stable, order-independent hash of a slug → index into a pool. */
function pick<T>(pool: T[], seed: string): T {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return pool[h % pool.length];
}

/** The advisor to attribute a listing to. */
export function agentForListing(listing: Listing): TeamMember {
  if (isPalm(listing)) return MASOUD;
  if (isOffPlan(listing)) return ALEXANDRA;
  return pick(GENERAL_POOL, listing.slug);
}
