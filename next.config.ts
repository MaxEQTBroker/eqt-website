import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 301 every hit on the old Vercel URL (or www) to the canonical apex domain,
  // so ranking/indexing signals consolidate onto eqt.ae after the domain switch.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "eqt-website-ten.vercel.app" }],
        destination: "https://eqt.ae/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.eqt.ae" }],
        destination: "https://eqt.ae/:path*",
        permanent: true,
      },
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
