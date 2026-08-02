import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Explicitly welcome search crawlers AND AI answer-engine crawlers.
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
