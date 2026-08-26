/**
 * Curated internal links from neighbourhood pages into the buyer-guide cluster.
 * Bidirectional linking (guides already link to areas) strengthens crawl paths
 * and topic authority. Area-specific guides first, then evergreen fill.
 */
export type GuideLink = { label: string; href: string };

export const EVERGREEN_GUIDES: GuideLink[] = [
  { label: "Can foreigners buy property in Dubai?", href: "/blog/can-foreigners-buy-property-dubai-freehold" },
  { label: "Golden Visa through Dubai property", href: "/blog/golden-visa-dubai-property-2026-guide" },
  { label: "Buying property in Dubai from abroad", href: "/blog/how-to-buy-property-in-dubai-from-abroad" },
  { label: "Off-plan vs ready property in Dubai", href: "/blog/off-plan-vs-ready-property-dubai" },
  { label: "Service charges & hidden costs explained", href: "/blog/dubai-property-service-charges-hidden-costs-explained" },
];

const AREA_GUIDES: Record<string, GuideLink[]> = {
  "palm-jumeirah": [
    { label: "Palm Jumeirah property prices: 2026 guide", href: "/blog/palm-jumeirah-property-prices-guide" },
    { label: "How much to buy a villa on Palm Jumeirah", href: "/blog/cost-to-buy-villa-palm-jumeirah" },
    { label: "Palm Jumeirah rental yields and ROI", href: "/blog/palm-jumeirah-rental-yields-and-roi" },
    { label: "Emirates Hills vs Palm Jumeirah", href: "/blog/emirates-hills-vs-palm-jumeirah-where-to-buy" },
  ],
  "emirates-hills": [
    { label: "Emirates Hills vs Palm Jumeirah", href: "/blog/emirates-hills-vs-palm-jumeirah-where-to-buy" },
    { label: "Best Dubai communities for families", href: "/blog/best-dubai-communities-for-families-2026" },
  ],
  "al-barari": [
    { label: "Best Dubai communities for families", href: "/blog/best-dubai-communities-for-families-2026" },
  ],
  "downtown-dubai": [
    { label: "Downtown Dubai vs Business Bay", href: "/blog/downtown-dubai-vs-business-bay-which-should-you-buy" },
    { label: "Best areas to buy an apartment in Dubai", href: "/blog/best-areas-buy-apartment-dubai-2026" },
  ],
  "business-bay": [
    { label: "Downtown Dubai vs Business Bay", href: "/blog/downtown-dubai-vs-business-bay-which-should-you-buy" },
    { label: "Rental yields in Dubai", href: "/blog/rental-yields-dubai-best-performing-luxury-communities" },
  ],
  "dubai-marina": [
    { label: "Best areas to buy an apartment in Dubai", href: "/blog/best-areas-buy-apartment-dubai-2026" },
    { label: "Rental yields in Dubai", href: "/blog/rental-yields-dubai-best-performing-luxury-communities" },
  ],
  "jumeirah-islands": [
    { label: "Best Dubai communities for families", href: "/blog/best-dubai-communities-for-families-2026" },
  ],
};

/** Up to 5 guide links for an area: specific first, then evergreen fill. */
export function guidesForArea(slug: string): GuideLink[] {
  const merged: GuideLink[] = [...(AREA_GUIDES[slug] ?? [])];
  for (const g of EVERGREEN_GUIDES) {
    if (merged.length >= 5) break;
    if (!merged.some((m) => m.href === g.href)) merged.push(g);
  }
  return merged.slice(0, 5);
}
