import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import {
  getAllAreaSlugs,
  getAllDeveloperSlugs,
  getAllPropertyTypeSlugs,
  getAllListingSlugs,
  getAllSoldReferences,
} from "@/lib/data/repository";
import { getAllPostSlugs } from "@/lib/data/blog";
import { rateLimit, clientIp } from "@/lib/security/rateLimit";

/**
 * IndexNow submitter — pings Bing/Yandex to crawl our URLs instantly.
 * Hit GET /api/indexnow to push the full URL set (after big content changes).
 * Key is public by design (also hosted at /<key>.txt for ownership).
 */
export const dynamic = "force-dynamic";

const KEY = "b234b1cb5cae4932b89e0fbd11565717";

export async function GET(req: Request) {
  // Optional gate: if INDEXNOW_TRIGGER_KEY is set, require ?token= to match, so a
  // stranger can't spam-trigger full search-engine pings. Left open if unset so
  // existing manual/cron usage keeps working until the key is configured.
  const gate = process.env.INDEXNOW_TRIGGER_KEY;
  if (gate) {
    const token = new URL(req.url).searchParams.get("token");
    if (token !== gate) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }
  // Rate limit regardless: at most 3 pings per 5 minutes per IP.
  if (!rateLimit(`indexnow:${clientIp(req)}`, 3, 300_000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const host = new URL(site.url).host;

  const [areas, developers, types, listings, sold, posts] = await Promise.all([
    getAllAreaSlugs(),
    getAllDeveloperSlugs(),
    getAllPropertyTypeSlugs(),
    getAllListingSlugs(),
    getAllSoldReferences(),
    getAllPostSlugs(),
  ]);

  const paths = [
    "",
    "/about",
    "/team",
    "/areas",
    "/developers",
    "/property",
    "/market",
    "/sold",
    "/listings",
    "/valuation",
    "/blog",
    "/contact",
    ...areas.map((s) => `/areas/${s}`),
    ...developers.map((s) => `/developers/${s}`),
    ...types.map((s) => `/property/${s}`),
    ...listings.map((s) => `/listings/${s}`),
    ...sold.map((r) => `/sold/${encodeURIComponent(r)}`),
    ...posts.map((s) => `/blog/${s}`),
  ];
  const urlList = paths.map((p) => `${site.url}${p}`);

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key: KEY,
        keyLocation: `${site.url}/${KEY}.txt`,
        urlList,
      }),
    });
    return NextResponse.json({ submitted: urlList.length, indexNowStatus: res.status });
  } catch (e) {
    return NextResponse.json(
      { submitted: 0, error: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }
}
