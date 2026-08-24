import type { PropertyGuide } from "../types";
import uk from "./property-uk.json";
import ru from "./property-ru.json";

/** Translatable fields of a property-type guide. slug, label, listingType,
 * relatedAreas, heroImage are inherited from English. Missing slug => English. */
export type PropertyOverlay = Partial<
  Pick<PropertyGuide, "title" | "headline" | "intro" | "keyFacts" | "faqs" | "sections" | "keywords">
>;

const MAPS: Record<string, Record<string, PropertyOverlay>> = {
  uk: uk as Record<string, PropertyOverlay>,
  ru: ru as Record<string, PropertyOverlay>,
};

/** Overlay a locale's translated fields onto an English property guide. */
export function localizePropertyGuide(guide: PropertyGuide, locale?: string): PropertyGuide {
  if (!locale || locale === "en") return guide;
  const overlay = MAPS[locale]?.[guide.slug];
  return overlay ? { ...guide, ...overlay } : guide;
}

/** True only when a real translation exists, so localized property pages index
 * only once fully translated. */
export function hasPropertyTranslation(slug: string, locale?: string): boolean {
  if (!locale || locale === "en") return true;
  return Boolean(MAPS[locale]?.[slug]);
}
