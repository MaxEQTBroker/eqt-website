import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Statement } from "@/components/home/Statement";
import { Metrics } from "@/components/home/Metrics";
import { Communities } from "@/components/home/Communities";
import { FeaturedEditorial } from "@/components/home/FeaturedEditorial";
import { Approach } from "@/components/home/Approach";
import { Voice } from "@/components/home/Voice";
import { Partners } from "@/components/home/Partners";
import { Enquire } from "@/components/home/Enquire";
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
      <Statement />
      <Metrics />
      <Communities />
      <FeaturedEditorial />
      <Approach />
      <Voice />
      <Partners />
      <Enquire />
    </>
  );
}
