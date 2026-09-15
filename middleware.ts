import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Consolidate www -> apex so eqt.ae is the single canonical host. Without this,
  // www.eqt.ae serves the entire site in parallel: every page's canonical and
  // hreflang point to the apex, which conflicts with the www URL they are served
  // on (Semrush flagged ~500 "hreflang conflicts") and duplicates every page.
  // Loop-safe: the apex serves pages directly and never redirects back to www.
  const host = request.headers.get("host");
  if (host && host.startsWith("www.")) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = host.slice(4).split(":")[0];
    url.port = "";
    return NextResponse.redirect(url, 308);
  }
  return intlMiddleware(request);
}

export const config = {
  // Run on page routes only. Excludes /api, Next internals, and any path with a
  // dot (sitemap.xml, robots.txt, feed.xml, llms.txt, favicon.ico, icon.png,
  // BingSiteAuth.xml, the Google verification file, the IndexNow key .txt, etc.).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
