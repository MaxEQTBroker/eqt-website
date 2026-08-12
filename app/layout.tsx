import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

import { site } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/lib/seo/jsonld";
import { Analytics } from "@/components/analytics/Analytics";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}, Dubai Luxury Real Estate`,
    template: `%s, ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Dubai luxury real estate",
    "Palm Jumeirah villas",
    "Al Barari villas",
    "Al Barari mansions",
    "Jumeirah Islands waterfront villas",
    "luxury property Dubai",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name}, Dubai Luxury Real Estate`,
    description: site.description,
    images: [
      {
        url: "https://images.pexels.com/photos/29470840/pexels-photo-29470840.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "EQT, Dubai luxury real estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}, Dubai Luxury Real Estate`,
    description: site.description,
    images: ["https://images.pexels.com/photos/29470840/pexels-photo-29470840.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // Google Search Console verification. Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  // (in Vercel env vars) to the token Google gives you under the "HTML tag"
  // method; when unset, no tag is emitted.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    // Bing Webmaster Tools "meta tag" verification (feeds ChatGPT/Copilot).
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : {},
  },
};

/**
 * Sets `data-reveal-ready` BEFORE first paint, but only when JS is on and the
 * user allows motion. This is what activates the reveal hide-rule, so no-JS,
 * crawlers, and reduced-motion users never get hidden content (no flash either).
 */
const revealBootstrap = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.setAttribute('data-reveal-ready','true')}}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootstrap }} />
      </head>
      <body>
        <Analytics />
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
