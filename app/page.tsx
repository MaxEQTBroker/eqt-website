import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { AreaShowcase } from "@/components/home/AreaShowcase";
import { ScrollNarrative } from "@/components/home/ScrollNarrative";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { SoldTeaser } from "@/components/home/SoldTeaser";
import { TrustSignals } from "@/components/home/TrustSignals";
import { LeadSection } from "@/components/home/LeadSection";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — Dubai Luxury Real Estate`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }]} />
      <Hero />
      <AreaShowcase />
      <TrustSignals />
      <ScrollNarrative />
      <FeaturedListings />
      <SoldTeaser />
      <LeadSection />
    </>
  );
}
