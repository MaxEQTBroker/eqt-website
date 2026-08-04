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

  const staticRoutes = ["", "/team", "/areas", "/developers", "/property", "/sold", "/listings", "/valuation", "/blog", "/contact"].map(
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

  const postRoutes = postSlugs.map((slug) => ({
    url: `${site.url}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const soldRoutes = soldRefs.map((reference) => ({
    url: `${site.url}/sold/${encodeURIComponent(reference)}`,
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
  ];
}
