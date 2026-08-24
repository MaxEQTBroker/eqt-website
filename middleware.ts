import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Run on page routes only. Excludes /api, Next internals, and any path with a
  // dot (sitemap.xml, robots.txt, feed.xml, llms.txt, favicon.ico, icon.png,
  // BingSiteAuth.xml, the Google verification file, the IndexNow key .txt, etc.).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
