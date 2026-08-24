import { defineRouting } from "next-intl/routing";

/**
 * en = default, served at the root (no /en prefix) so existing indexed English
 * URLs are untouched. Ukrainian at /uk/... and Russian at /ru/... (lower-competition
 * SEO). localePrefix "as-needed" = only non-default locales get a prefix.
 */
export const routing = defineRouting({
  locales: ["en", "uk", "ru"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
