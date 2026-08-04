import type { Metadata } from "next";
import { ValuationForm } from "@/components/lead/ValuationForm";
import { Reveal } from "@/components/motion/Reveal";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Dubai Property Valuation",
  description:
    "Find out what your Dubai property is worth. Get a free, no-obligation valuation from EQT's RERA-licensed advisors, based on real transaction data across Palm Jumeirah, Dubai Marina, Downtown and beyond.",
  alternates: { canonical: "/valuation" },
};

const POINTS = [
  {
    title: "Priced on real data",
    body: "We value against genuine comparable sales and current market activity, not guesswork or an automated estimate.",
  },
  {
    title: "Discreet and no-obligation",
    body: "A private figure prepared for you. No pressure, no listing commitment, and your details stay with EQT.",
  },
  {
    title: "From advisors who transact here",
    body: "RERA-licensed specialists who sell in your community every week, so the number reflects what buyers will actually pay.",
  },
];

export default function ValuationPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Valuation", path: "/valuation" },
        ]}
      />

      <section className="container-lux pb-[var(--section-py)] pt-40">
        <div className="grid gap-14 lg:grid-cols-[420px_minmax(0,1fr)] lg:gap-20">
          {/* Right on desktop: pitch (kept first in the DOM for the H1/reading order) */}
          <div className="lg:order-2">
            <p className="eyebrow mb-5">Thinking of selling?</p>
            <h1 className="display-hero text-ink" style={{ fontSize: "clamp(2.25rem,6vw,4.5rem)" }}>
              What is your Dubai property worth?
            </h1>
            <p className="mt-8 max-w-xl text-lg text-muted">
              Get a free, no-obligation valuation from {site.name}. Tell us about your home and a
              RERA-licensed advisor will prepare a considered figure based on real, comparable sales,
              usually within the hour.
            </p>

            <div className="mt-12 space-y-8">
              {POINTS.map((p, i) => (
                <Reveal key={p.title} delay={i * 90}>
                  <div className="flex gap-4">
                    <span className="font-display text-2xl text-accent-500">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h2 className="font-display text-xl text-ink">{p.title}</h2>
                      <p className="mt-2 max-w-md text-muted">{p.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="mt-12 text-sm text-faint">
              Regulated by the {site.regulatory.authority}. RERA ORN {site.regulatory.reraOrn}.
            </p>
          </div>

          {/* Left on desktop: the form */}
          <Reveal delay={120} className="lg:order-1 lg:sticky lg:top-24 lg:self-start">
            <ValuationForm source="valuation" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
