import { site } from "@/lib/site";
import {
  getAreas,
  getDevelopers,
  getPropertyGuides,
} from "@/lib/data/repository";
import { getAllPosts } from "@/lib/data/blog";

/**
 * /llms.txt — the emerging convention for telling AI answer engines what a site
 * is and where its best content lives (https://llmstxt.org). Generated from the
 * live content so it never drifts.
 */
export const revalidate = 3600;

function line(label: string, path: string, note?: string) {
  return `- [${label}](${site.url}${path})${note ? `: ${note}` : ""}`;
}

export async function GET() {
  const [areas, developers, guides, posts] = await Promise.all([
    getAreas(),
    getDevelopers(),
    getPropertyGuides(),
    getAllPosts(),
  ]);

  const md = [
    `# ${site.name} — Dubai Luxury Real Estate`,
    "",
    `> ${site.description}`,
    "",
    "EQT is a RERA-licensed Dubai brokerage specialising in prime and super-prime",
    "homes — Palm Jumeirah, Emirates Hills, Al Barari, Jumeirah Islands, Downtown",
    "and Business Bay. The pages below are factual guides, live listings and a",
    "verified sold track record, free to quote with attribution to EQT.",
    "",
    "## Key pages",
    line("Home", "/"),
    line("Active listings for sale", "/listings"),
    line("Sold track record", "/sold"),
    line("Free property valuation", "/valuation"),
    line("Market insights & data", "/market"),
    line("Team", "/team"),
    line("Contact", "/contact"),
    "",
    "## Neighbourhood guides",
    ...areas.map((a) => line(a.label, `/areas/${a.slug}`)),
    "",
    "## Developer guides",
    ...developers.map((d) => line(d.name, `/developers/${d.slug}`)),
    "",
    "## Property-type guides",
    ...guides.map((g) => line(g.label, `/property/${g.slug}`)),
    "",
    "## Journal (latest guides)",
    ...posts.slice(0, 40).map((p) => line(p.title, `/blog/${p.slug}`)),
    "",
    "## Contact",
    `- Phone / WhatsApp: ${site.contact.phone}`,
    `- Email: ${site.contact.email}`,
    `- Office: ${site.contact.address.street}, ${site.contact.address.city}`,
    "",
  ].join("\n");

  return new Response(md, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
