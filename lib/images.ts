import convertedSold from "@/lib/data/converted-sold.json";

/**
 * Sold-property photos from Supabase storage are often CMYK JPEGs up to ~10k px
 * wide, which render dark/black in browsers and load slowly.
 *
 * A daily GitHub Action (scripts/convert-sold-images.mjs) converts them to sRGB,
 * web-sized JPEGs under `sold-web/` in the same bucket and records each converted
 * image in converted-sold.json. crmPhoto serves those converted originals DIRECTLY
 * (free: no Supabase image-transform billing). Any image not yet converted falls
 * back to Supabase's on-the-fly transform endpoint, so nothing ever renders black.
 *
 * Non-Supabase URLs (e.g. Property Finder listing photos) are returned as-is.
 */
const OBJECT_MARKER = "/storage/v1/object/public/";
const RENDER_MARKER = "/storage/v1/render/image/public/";
const converted = new Set(convertedSold as string[]);

export function crmPhoto(url: string | undefined, width = 1200): string {
  if (!url) return "";
  if (url.includes(".supabase.co") && url.includes(OBJECT_MARKER)) {
    const [origin, rest] = url.split(OBJECT_MARKER);
    const key = rest.split("?")[0]; // e.g. "property-photos/<uuid>/0.jpg"
    // Preconverted sRGB web image available -> serve it directly (no transform cost).
    if (converted.has(key)) {
      const slash = key.indexOf("/");
      const bucket = key.slice(0, slash);
      const path = key.slice(slash + 1);
      return `${origin}${OBJECT_MARKER}${bucket}/sold-web/${path}`;
    }
    // Fallback: on-the-fly transform until the daily job converts this image.
    return `${origin}${RENDER_MARKER}${key}?width=${width}&quality=75`;
  }
  return url;
}
