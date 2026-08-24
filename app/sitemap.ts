import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import {
  getAllAreaSlugs,
  getAllListingSlugs,
  getAllDeveloperSlugs,
  getAllPropertyTypeSlugs,
  getAllSoldReferences,
} from "@/lib/data/repository";
import { getAllPostSlugs } from "@/lib/data/blog";
import { hasPostTranslation } from "@/lib/data/i18n/postTranslations";
import { team } from "@/lib/data/team";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [areaSlugs, listingSlugs, developerSlugs, propertyTypeSlugs, postSlugs, soldRefs] =
    await Promise.all([
      getAllAreaSlugs(),
      getAllListingSlugs(),
      getAllDeveloperSlugs(),
      getAllPropertyTypeSlugs(),
      getAllPostSlugs(),
      getAllSoldReferences(),
    ]);

  const staticRoutes = ["", "/about", "/team", "/areas", "/developers", "/property", "/market", "/market-report", "/sold", "/listings", "/valuation", "/sell", "/guides/buying-property-in-dubai", "/blog", "/site-map", "/contact", "/privacy-policy", "/terms", "/cookies"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const areaRoutes = areaSlugs.map((slug) => ({
    url: `${site.url}/areas/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const listingRoutes = listingSlugs.map((slug) => ({
    url: `${site.url}/listings/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const developerRoutes = developerSlugs.map((slug) => ({
    url: `${site.url}/developers/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const propertyTypeRoutes = propertyTypeSlugs.map((slug) => ({
    url: `${site.url}/property/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const postRoutes = postSlugs.map((slug) => {
    // Advertise a localized alternate only where a real translation exists.
    const languages: Record<string, string> = { en: `${site.url}/blog/${slug}` };
    if (hasPostTranslation(slug, "uk")) languages.uk = `${site.url}/uk/blog/${slug}`;
    if (hasPostTranslation(slug, "ru")) languages.ru = `${site.url}/ru/blog/${slug}`;
    return {
      url: `${site.url}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      ...(Object.keys(languages).length > 1 ? { alternates: { languages } } : {}),
    };
  });

  const soldRoutes = soldRefs.map((reference) => ({
    url: `${site.url}/sold/${encodeURIComponent(reference)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const teamRoutes = team.map((m) => ({
    url: `${site.url}/team/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...areaRoutes,
    ...developerRoutes,
    ...propertyTypeRoutes,
    ...listingRoutes,
    ...postRoutes,
    ...soldRoutes,
    ...teamRoutes,
  ];
}
