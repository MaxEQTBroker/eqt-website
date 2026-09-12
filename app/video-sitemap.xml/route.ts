import { site } from "@/lib/site";

/**
 * Video sitemap (Google video extension). The homepage embeds several editorial
 * videos; this advertises them so they can surface in Google Video / rich
 * results. Submit alongside sitemap.xml in Search Console. Served at
 * /video-sitemap.xml.
 */

type Vid = { file: string; poster: string; title: string; description: string };

const VIDEOS: Vid[] = [
  {
    file: "hero.mp4",
    poster: "hero-poster.jpg",
    title: "EQT, Dubai luxury real estate",
    description:
      "A cinematic look at EQT's Dubai luxury real estate: Palm Jumeirah, Al Barari and the emirate's most exclusive addresses.",
  },
  {
    file: "featured.mp4",
    poster: "featured-poster.jpg",
    title: "Featured Dubai properties by EQT",
    description: "A tour of EQT's featured prime and super-prime homes across Dubai's leading communities.",
  },
  {
    file: "stats.mp4",
    poster: "stats-poster.jpg",
    title: "Dubai prime market at a glance",
    description: "Key figures behind Dubai's prime property market, from EQT's own transactions and market data.",
  },
  {
    file: "sold.mp4",
    poster: "sold-poster.jpg",
    title: "Recently sold by EQT in Dubai",
    description: "A look at homes recently sold by EQT across Dubai's most sought-after communities.",
  },
];

function xmlEscape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function GET() {
  const items = VIDEOS.map(
    (v) => `    <video:video>
      <video:thumbnail_loc>${site.url}/videos/${v.poster}</video:thumbnail_loc>
      <video:title>${xmlEscape(v.title)}</video:title>
      <video:description>${xmlEscape(v.description)}</video:description>
      <video:content_loc>${site.url}/videos/${v.file}</video:content_loc>
      <video:family_friendly>yes</video:family_friendly>
      <video:live>no</video:live>
    </video:video>`,
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${site.url}/</loc>
${items}
  </url>
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
