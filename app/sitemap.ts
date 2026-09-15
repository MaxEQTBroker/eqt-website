import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import {
  getAreas,
  getAllListingSlugs,
  getDevelopers,
  getPropertyGuides,
  getAllSoldReferences,
} from "@/lib/data/repository";
import { getAllPosts } from "@/lib/data/blog";
import { hasPostTranslation } from "@/lib/data/i18n/postTranslations";
import { hasAreaTranslation } from "@/lib/data/i18n/areaTranslations";
import { hasPropertyTranslation } from "@/lib/data/i18n/propertyTranslations";
import { hasDeveloperTranslation } from "@/lib/data/i18n/developerTranslations";
import { team } from "@/lib/data/team";
import { getAllBudgetBandSlugs } from "@/lib/data/budgetBands";

/**
 * Make a hero URL absolute and XML-safe for the image sitemap. We strip the query
 * string because stock URLs carry params like "?auto=compress&cs=..." and the raw
 * "&" is an illegal XML entity that breaks the whole sitemap (EntityRef error).
 * Base Pexels/Unsplash URLs still resolve to a valid image without the params.
 */
function absImage(url?: string): string[] {
  if (!url) return [];
  const abs = url.startsWith("http") ? url : `${site.url}${url}`;
  return [abs.split("?")[0]];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [areas, listingSlugs, developers, propertyGuides, posts, soldRefs] =
    await Promise.all([
      getAreas(),
      getAllListingSlugs(),
      getDevelopers(),
      getPropertyGuides(),
      getAllPosts(),
      getAllSoldReferences(),
    ]);

  const staticRoutes = ["", "/about", "/team", "/areas", "/developers", "/property", "/market", "/market-report", "/sold", "/listings", "/valuation", "/mortgage-calculator", "/sell", "/guides/buying-property-in-dubai", "/blog", "/site-map", "/contact", "/privacy-policy", "/terms", "/cookies"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
      // Homepage carries the branded social image.
      ...(path === "" ? { images: [`${site.url}/images/palm-jumeirah/1.jpg`] } : {}),
    }),
  );

  const areaRoutes = areas.map((area) => {
    const slug = area.slug;
    const languages: Record<string, string> = { en: `${site.url}/areas/${slug}` };
    if (hasAreaTranslation(slug, "uk")) languages.uk = `${site.url}/uk/areas/${slug}`;
    if (hasAreaTranslation(slug, "ru")) languages.ru = `${site.url}/ru/areas/${slug}`;
    return {
      url: `${site.url}/areas/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      images: absImage(area.heroImage?.url),
      ...(Object.keys(languages).length > 1 ? { alternates: { languages } } : {}),
    };
  });

  const listingRoutes = listingSlugs.map((slug) => ({
    url: `${site.url}/listings/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const developerRoutes = developers.map((dev) => {
    const slug = dev.slug;
    const languages: Record<string, string> = { en: `${site.url}/developers/${slug}` };
    if (hasDeveloperTranslation(slug, "uk")) languages.uk = `${site.url}/uk/developers/${slug}`;
    if (hasDeveloperTranslation(slug, "ru")) languages.ru = `${site.url}/ru/developers/${slug}`;
    return {
      url: `${site.url}/developers/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      images: absImage(dev.heroImage?.url),
      ...(Object.keys(languages).length > 1 ? { alternates: { languages } } : {}),
    };
  });

  const propertyTypeRoutes = propertyGuides.map((guide) => {
    const slug = guide.slug;
    const languages: Record<string, string> = { en: `${site.url}/property/${slug}` };
    if (hasPropertyTranslation(slug, "uk")) languages.uk = `${site.url}/uk/property/${slug}`;
    if (hasPropertyTranslation(slug, "ru")) languages.ru = `${site.url}/ru/property/${slug}`;
    return {
      url: `${site.url}/property/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      images: absImage(guide.heroImage?.url),
      ...(Object.keys(languages).length > 1 ? { alternates: { languages } } : {}),
    };
  });

  const postRoutes = posts.map((post) => {
    const slug = post.slug;
    // Advertise a localized alternate only where a real translation exists.
    const languages: Record<string, string> = { en: `${site.url}/blog/${slug}` };
    if (hasPostTranslation(slug, "uk")) languages.uk = `${site.url}/uk/blog/${slug}`;
    if (hasPostTranslation(slug, "ru")) languages.ru = `${site.url}/ru/blog/${slug}`;
    return {
      url: `${site.url}/blog/${slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      images: absImage(post.heroImage?.url),
      ...(Object.keys(languages).length > 1 ? { alternates: { languages } } : {}),
    };
  });

  const soldRoutes = soldRefs.map((reference) => ({
    url: `${site.url}/sold/${encodeURIComponent(reference)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  // Dubai-wide "buy by budget" landing pages. Fully translated, so each carries
  // uk/ru hreflang alternates.
  const budgetRoutes = getAllBudgetBandSlugs().map((slug) => ({
    url: `${site.url}/buy/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
    alternates: {
      languages: {
        en: `${site.url}/buy/${slug}`,
        uk: `${site.url}/uk/buy/${slug}`,
        ru: `${site.url}/ru/buy/${slug}`,
      },
    },
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
    ...budgetRoutes,
    ...teamRoutes,
  ];
}
