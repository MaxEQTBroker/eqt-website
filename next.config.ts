import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
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
