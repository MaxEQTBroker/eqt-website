import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 301 the old Vercel preview URL to the canonical apex domain, so ranking/indexing
  // signals consolidate onto eqt.ae. NOTE: apex<->www is handled by Vercel's own
  // "primary domain" redirect, NOT here. Do not add a www->apex rule: Vercel already
  // redirects apex->www by default, and a www->apex rule here creates an infinite loop.
  // Set eqt.ae as the Primary Domain in Vercel so Vercel redirects www->apex to match.
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
  images: {
    // Serve images without Vercel's optimizer. The Hobby plan's image-optimization
    // quota was being exceeded (402 Payment Required -> broken images). Source URLs
    // (Pexels, Supabase transform, Property Finder) are already sized, so we skip
    // Vercel optimization entirely for reliability. Re-enable on a Pro plan / domain.
    unoptimized: true,
    // Allow remote luxury imagery; tighten to your real CDN/domains before launch.
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.eqt.ae" },
      // CRM property photos: Supabase storage (sold) + Property Finder CDN (listings).
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "**.propertyfinder.ae" },
    ],
  },
};

export default nextConfig;
