import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Statement } from "@/components/home/Statement";
import { Metrics } from "@/components/home/Metrics";
import { Communities } from "@/components/home/Communities";
import { FeaturedEditorial } from "@/components/home/FeaturedEditorial";
import { Approach } from "@/components/home/Approach";
import { Voice } from "@/components/home/Voice";
import { Interlude } from "@/components/home/Interlude";
import { Partners } from "@/components/home/Partners";
import { Enquire } from "@/components/home/Enquire";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { site } from "@/lib/site";
import { hasUiTranslation } from "@/lib/data/i18n/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = locale === "en" ? "/" : `/${locale}`;
  const languages: Record<string, string> = { "x-default": "/", en: "/" };
  if (hasUiTranslation("home", "uk")) languages.uk = "/uk";
  if (hasUiTranslation("home", "ru")) languages.ru = "/ru";
  return {
    title: `${site.name}, Dubai Luxury Real Estate`,
    description: site.description,
    alternates: { canonical, languages },
    robots: hasUiTranslation("home", locale) ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default function HomePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }]} />
      <Hero />
      <Statement />
      <Metrics />
      <Communities />
      <FeaturedEditorial />
      <Approach />
      <Voice />
      <Interlude />
      <Partners />
      <Enquire />
    </>
  );
}
