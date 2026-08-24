import type { Area } from "../types";
import uk from "./area-uk.json";
import ru from "./area-ru.json";

/** Translatable fields of an area guide. label, slug, heroImage are inherited
 * from the English base. Missing slug => English fallback. */
export type AreaOverlay = Partial<
  Pick<Area, "headline" | "intro" | "keyFacts" | "faqs" | "sections" | "keywords">
>;

const MAPS: Record<string, Record<string, AreaOverlay>> = {
  uk: uk as Record<string, AreaOverlay>,
  ru: ru as Record<string, AreaOverlay>,
};

/** Overlay a locale's translated fields onto an English area (fallback = English). */
export function localizeArea(area: Area, locale?: string): Area {
  if (!locale || locale === "en") return area;
  const overlay = MAPS[locale]?.[area.slug];
  return overlay ? { ...area, ...overlay } : area;
}

/** True only when a real translation exists for this area in this locale, so we
 * index localized area pages only once they are fully translated. */
export function hasAreaTranslation(slug: string, locale?: string): boolean {
  if (!locale || locale === "en") return true;
  return Boolean(MAPS[locale]?.[slug]);
}
