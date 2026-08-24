import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import "../globals.css";

import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/lib/seo/jsonld";
import { Analytics } from "@/components/analytics/Analytics";

const display = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  return {
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
    alternates: { canonical: isEn ? "/" : `/${locale}` },
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
    // English pages index normally. Localized (uk/ru) pages that still render the
    // English base copy are noindexed here to avoid duplicate content; translated
    // blog posts override this back to index:true in their own generateMetadata.
    robots: isEn
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } }
      : { index: false, follow: true },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
      other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
        : {},
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Sets `data-reveal-ready` BEFORE first paint, but only when JS is on and the
 * user allows motion, so no-JS, crawlers and reduced-motion users never get
 * hidden content.
 */
const revealBootstrap = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.setAttribute('data-reveal-ready','true')}}catch(e){}`;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${display.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootstrap }} />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Analytics />
          <OrganizationJsonLd />
          <WebsiteJsonLd />
          <SmoothScroll />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFab />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
