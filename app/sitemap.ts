import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import {
  getAllAreaSlugs,
  getAllListingSlugs,
} from "@/lib/data/repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [areaSlugs, listingSlugs] = await Promise.all([
    getAllAreaSlugs(),
    getAllListingSlugs(),
  ]);

  const staticRoutes = ["", "/areas", "/sold", "/listings", "/contact"].map(
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

  return [...staticRoutes, ...areaRoutes, ...listingRoutes];
}
