import type { BlogPost } from "./blog";

/**
 * Finer "topic sections" for the blog index. The five schema categories
 * ("Buyer Guides" etc.) are too broad now that the corpus is large (150+ buyer
 * guides), so this maps each post to a browsable topic used for the filter chips
 * on /blog. Rules are ordered: the FIRST matching rule wins, so put the more
 * specific / higher-intent topics first. Falls back to a general bucket.
 *
 * Purely presentational: it does not change the post's schema `category`.
 */
export type BlogSection = { key: string; label: string };

export const BLOG_SECTIONS: BlogSection[] = [
  { key: "visas", label: "Visas & Residency" },
  { key: "moving", label: "Moving & Relocation" },
  { key: "work", label: "Working & Business" },
  { key: "buying", label: "Buying a Home" },
  { key: "selling", label: "Selling" },
  { key: "investment", label: "Investment" },
  { key: "areas", label: "Areas & Communities" },
  { key: "renting", label: "Renting" },
  { key: "money", label: "Money, Tax & Fees" },
  { key: "lifestyle", label: "Family & Lifestyle" },
  { key: "market", label: "Market & Trends" },
  { key: "advice", label: "Guides & Advice" },
];

// Ordered rules. Each tests the slug (lowercase). First hit wins.
const RULES: { key: string; re: RegExp }[] = [
  { key: "visas", re: /(visa|golden-visa|green-visa|blue-visa|residenc|emirates-id|sponsor|overstay|medical-test|tourist|cancel-uae|remote-work)/ },
  { key: "work", re: /(job|salary|salaries|company|free-zone|freelance|corporate-tax|start-a-business|hiring|recruit)/ },
  { key: "moving", re: /(relocating-to-dubai|moving-to-dubai|relocation|shipping|moving-.*pets|-with-pets|attest|cost-to-move|best-time-to-move|do-you-need-job-offer)/ },
  { key: "renting", re: /(renting|ejari|tenant|rental-law|deposit-to-rent|rent-in-dubai|rent-out)/ },
  { key: "selling", re: /(^sell|selling|how-to-sell|price-your|cost-to-sell|documents-you-need-to-sell|documents-to-sell)/ },
  { key: "investment", re: /(invest|roi|yield|appreciation|flip|good-investment|good-time-to-buy)/ },
  { key: "areas", re: /(palm|marina|downtown|emirates-hills|hills-estate|al-barari|jumeirah|arabian-ranches|business-bay|creek|bluewaters|city-walk|meadows|springs|the-lakes|district-one|tilal|damac|jvc|jebel-ali|pearl-jumeirah|port-de-la-mer|best-areas|best-neighbourhood|gated-communit|communit|living-in|living-on|frond|-areas|areas-)/ },
  { key: "money", re: /(tax|dld|-fee|fees|mortgage|cost-of-living|service-charge|escrow|payment-plan|send-money|bank-account|deposit|cost-guide|how-much-does-it-cost)/ },
  { key: "buying", re: /(buy|foreigner|freehold|leasehold|off-plan|purchase|conveyanc|title-deed|oqood|first-property|cash-vs|how-to-buy|nri)/ },
  { key: "lifestyle", re: /(school|child|baby|famil|married|marriage|single-woman|healthcare|health-insurance|is-dubai-safe|culture|etiquette|alcohol|ramadan|holiday|unmarried|retir|maid|transport|getting-around|sim-card|dewa|driving-licence|pets)/ },
  { key: "market", re: /(market|-prices|price-guide|forecast|report|index|hotspot|crash)/ },
];

/** Resolve a post's topic section key. */
export function sectionKeyFor(post: Pick<BlogPost, "slug" | "category">): string {
  const s = post.slug.toLowerCase();
  for (const r of RULES) if (r.re.test(s)) return r.key;
  // Category fallbacks map onto the closest section.
  switch (post.category) {
    case "Seller Guides": return "selling";
    case "Investment": return "investment";
    case "Market & Data": return "market";
    case "Community Guides": return "areas";
    default: return "advice";
  }
}
