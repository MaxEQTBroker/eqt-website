import en from "./ui-en.json";
import uk from "./ui-uk.json";
import ru from "./ui-ru.json";

const MAPS: Record<string, Record<string, unknown>> = {
  en: en as Record<string, unknown>,
  uk: uk as Record<string, unknown>,
  ru: ru as Record<string, unknown>,
};

/**
 * Localized UI copy for a hardcoded page, keyed by page name. Falls back to the
 * English block whenever a locale or a specific page block is missing, so a page
 * never breaks while its translation is still pending.
 */
export function uiContent<T = unknown>(page: string, locale?: string): T {
  const loc = locale && MAPS[locale] ? locale : "en";
  const block = (MAPS[loc]?.[page] ?? (MAPS.en[page] as unknown)) as T;
  return block;
}

/** True only when a real translation block exists for this page + locale. */
export function hasUiTranslation(page: string, locale?: string): boolean {
  if (!locale || locale === "en") return true;
  return Boolean(MAPS[locale]?.[page]);
}
