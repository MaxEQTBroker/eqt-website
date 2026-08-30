import convertedSold from "@/lib/data/converted-sold.json";

/**
 * Sold-property photos live in Supabase storage. These are served through
 * next/image, so VERCEL'S optimizer is what fetches the source, converts any
 * CMYK JPEG to sRGB, resizes it, and re-encodes to AVIF/WebP, then caches the
 * result on its CDN for 30 days (see next.config.ts).
 *
 * crmPhoto therefore hands Vercel the RAW PUBLIC OBJECT url
 * (/storage/v1/object/public/...). It deliberately does NOT use Supabase's
 * render/transform endpoint (/storage/v1/render/image/public/...): that endpoint
 * bills as a Supabase "Image Transformation" for every source image, and with
 * Vercel already doing the transform it would be paying twice. Serving the plain
 * object means Supabase does ZERO image transformations and only the occasional
 * object download (roughly one per image per 30 days, thanks to Vercel's cache).
 *
 * When the daily conversion job (scripts/convert-sold-images.mjs) has written a
 * smaller, pre-converted sRGB copy under `sold-web/`, we point Vercel at that
 * instead, since a smaller source is cheaper for Vercel to fetch and process.
 * Either way the URL is a plain public object, never a transform.
 *
 * Non-Supabase URLs (e.g. Property Finder listing photos) are returned as-is.
 */
const OBJECT_MARKER = "/storage/v1/object/public/";
const converted = new Set(convertedSold as string[]);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function crmPhoto(url: string | undefined, _width = 1200): string {
  if (!url) return "";
  if (url.includes(".supabase.co") && url.includes(OBJECT_MARKER)) {
    const [origin, rest] = url.split(OBJECT_MARKER);
    const key = rest.split("?")[0]; // e.g. "property-photos/<uuid>/0.jpg"
    // Prefer the pre-converted sRGB web copy when the daily job has made one.
    // Both branches return a PLAIN PUBLIC OBJECT (no Supabase transform billing);
    // Vercel's next/image optimizer handles resizing and AVIF/WebP encoding.
    if (converted.has(key)) {
      const slash = key.indexOf("/");
      const bucket = key.slice(0, slash);
      const path = key.slice(slash + 1);
      return `${origin}${OBJECT_MARKER}${bucket}/sold-web/${path}`;
    }
    return `${origin}${OBJECT_MARKER}${key}`;
  }
  return url;
}
