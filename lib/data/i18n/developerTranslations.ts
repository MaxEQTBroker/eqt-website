import type { Developer } from "../types";
import uk from "./developer-uk.json";
import ru from "./developer-ru.json";

/** Translatable fields of a developer guide. slug, name, logo, relatedAreas,
 * heroImage are inherited from English. Missing slug => English fallback. */
export type DeveloperOverlay = Partial<
  Pick<Developer, "tagline" | "intro" | "keyFacts" | "signature" | "faqs" | "sections" | "keywords">
>;

const MAPS: Record<string, Record<string, DeveloperOverlay>> = {
  uk: uk as Record<string, DeveloperOverlay>,
  ru: ru as Record<string, DeveloperOverlay>,
};

/** Overlay a locale's translated fields onto an English developer guide. */
export function localizeDeveloper(dev: Developer, locale?: string): Developer {
  if (!locale || locale === "en") return dev;
  const overlay = MAPS[locale]?.[dev.slug];
  return overlay ? { ...dev, ...overlay } : dev;
}

/** True only when a real translation exists, so localized developer pages index
 * only once fully translated. */
export function hasDeveloperTranslation(slug: string, locale?: string): boolean {
  if (!locale || locale === "en") return true;
  return Boolean(MAPS[locale]?.[slug]);
}
