import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 301 the old Vercel preview URL to the canonical apex domain, so ranking/indexing
  // signals consolidate onto eqt.ae. www -> apex is now handled loop-safely in
  // middleware.ts (a 308 host redirect), because www.eqt.ae was observed serving 200
  // in parallel with the apex (no Vercel apex->www redirect is active), which
  // duplicated every page and broke hreflang. Also set eqt.ae as the Primary Domain
  // in Vercel as a belt-and-suspenders redirect at the edge.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "eqt-website-ten.vercel.app" }],
        destination: "https://eqt.ae/:path*",
        permanent: true,
      },
      // Legal-page aliases: catch common spellings so they never 404.
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/privacypolicy", destination: "/privacy-policy", permanent: true },
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },
      { source: "/terms-conditions", destination: "/terms", permanent: true },
      { source: "/cookie-policy", destination: "/cookies", permanent: true },
      { source: "/cookies-policy", destination: "/cookies", permanent: true },
    ];
  },
  // Security headers (Screaming Frog flagged all four as missing). CSP is kept
  // permissive on purpose so it never blocks legit assets (Pexels/Supabase/Property
  // Finder images, background videos, GA) while still satisfying the header check.
  async headers() {
    // Analytics / tag hosts we actually load, reused for script-src + connect-src.
    const analytics = [
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://*.google-analytics.com",
      "https://*.analytics.google.com",
      "https://*.doubleclick.net",
      "https://*.clarity.ms", // Microsoft Clarity (enabled via NEXT_PUBLIC_CLARITY_ID)
    ].join(" ");
    const csp = [
      "default-src 'self'",
      "img-src 'self' data: blob: https:",
      "media-src 'self' https:",
      // 'unsafe-eval' removed: production Next/GSAP/Framer don't need it, and it's a
      // key XSS amplifier. 'unsafe-inline' kept (Next injects inline bootstrap/GA).
      `script-src 'self' 'unsafe-inline' ${analytics}`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      // Allowlisted instead of blanket https: so an injected script can't exfiltrate
      // to an arbitrary server. Covers same-origin API, analytics beacons, Supabase.
      `connect-src 'self' ${analytics} https://*.supabase.co`,
      // Allow the embedded Google Map on /contact (iframe from google maps).
      "frame-src 'self' https://www.google.com https://maps.google.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ");
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
  images: {
    // Vercel Image Optimization is ON (Pro plan). Vercel fetches each remote
    // source ONCE, transcodes to AVIF/WebP, and serves every visitor from its
    // CDN as /_next/image — so Supabase storage egress drops to ~one fetch per
    // image instead of one per visitor. Cache each optimized image for 30 days
    // before revalidating the source, since property photos live at stable,
    // content-addressed URLs (a changed photo gets a new URL).
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2_592_000,
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.eqt.ae" },
      // CRM property photos. Supabase storage (sold + some listings): allow both
      // the public-object and image-render paths so Vercel can fetch + cache them.
      { protocol: "https", hostname: "oquqfodpimubvrgkekah.supabase.co", pathname: "/storage/v1/object/public/**" },
      { protocol: "https", hostname: "oquqfodpimubvrgkekah.supabase.co", pathname: "/storage/v1/render/image/public/**" },
      { protocol: "https", hostname: "**.supabase.co" },
      // Property Finder listing-photo CDN.
      { protocol: "https", hostname: "**.propertyfinder.ae" },
    ],
  },
};

export default withNextIntl(nextConfig);
