/**
 * CRM property photos from Supabase storage are often CMYK JPEGs up to ~10k px
 * wide, which render dark/black in browsers and load very slowly. Supabase's
 * image-transform endpoint converts them to sRGB and resizes on its CDN, so we
 * route Supabase `/object/public/` URLs through `/render/image/public/`.
 *
 * Non-Supabase URLs (e.g. Property Finder listing photos) are returned as-is.
 */
export function crmPhoto(url: string | undefined, width = 1200): string {
  if (!url) return "";
  const marker = "/storage/v1/object/public/";
  if (url.includes(".supabase.co") && url.includes(marker)) {
    const rendered = url.replace(marker, "/storage/v1/render/image/public/");
    const sep = rendered.includes("?") ? "&" : "?";
    return `${rendered}${sep}width=${width}&quality=75`;
  }
  return url;
}
