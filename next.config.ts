import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Allow remote luxury imagery; tighten to your real CDN/domains before launch.
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.eqt.ae" },
      // CRM property photos are served from Supabase storage.
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
};

export default nextConfig;
