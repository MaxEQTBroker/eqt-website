import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/lib/seo/jsonld";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sell Your Property in Dubai",
  description:
    "Sell your Dubai property with EQT, a RERA-licensed prime brokerage. Discreet, off-market reach, evidence-based pricing from real DLD comparables, and a full-service transfer.",
  alternates: { canonical: "/sell" },
};

const POINTS = [
  {
    title: "Priced on real evidence",
    body: "We price from genuine Dubai Land Department comparable sales, not guesswork, so your asking price is credible from day one and defensible in negotiation.",
  },
  {
    title: "Discreet, off-market reach",
    body: "Many of Dubai's finest homes sell privately. We can market your property quietly to a curated database of qualified buyers, protecting your privacy and your price.",
  },
  {
    title: "One accountable, RERA-licensed team",
    body: "An exclusive mandate concentrates professional photography, portal prominence and negotiation in one committed party, which typically achieves a cleaner, faster sale.",
  },
  {
    title: "Full service to completion",
    body: "We manage the listing, viewings, the developer NOC, and the transfer at the trustee office, keeping your sale on track from first enquiry to final handover.",
  },
];

const FAQS = [
  {
    question: "How much does it cost to sell a property in Dubai?",
    answer:
      "Selling typically costs the seller around 2 percent agency commission plus 5 percent VAT, a developer NOC fee of roughly AED 500 to 5,000, and small transfer and conveyancing charges. The 4 percent DLD transfer fee is normally the buyer's cost, and there is no capital gains tax on the sale.",
  },
  {
    question: "Can EQT sell my property off-market?",
    answer:
      "Yes. Discreet, off-market sales are a core specialism. We can market your home privately to vetted, qualified buyers with no public listing, which suits high-profile sellers and prime homes.",
  },
  {
    question: "How do you decide the asking price?",
    answer:
      "From real, recent comparable sales recorded by the Dubai Land Department, adjusted for floor, view, size and condition. We show you the evidence behind the figure, never an inflated number to win the listing.",
  },
  {
    question: "How long does it take to sell?",
    answer:
      "A well-priced, well-presented home with a committed agent can go under offer within days to a few weeks, with completion following once the developer NOC is issued and the transfer is booked at the trustee office.",
  },
];

export default function SellPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Sell", path: "/sell" },
        ]}
      />
      <FaqJsonLd faqs={FAQS} />

      <section className="container-lux pb-[var(--section-py)] pt-40">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5">Sell with EQT</p>
          <h1 className="display-hero text-ink" style={{ fontSize: "clamp(2.25rem,6vw,4.5rem)" }}>
            Sell your Dubai property
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted">
            {site.name} sells prime and off-market homes across Dubai&apos;s most sought-after
            communities. We price on real evidence, market with discretion, and manage every step to
            a clean, timely sale, whether you list publicly or sell privately.
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

        {/* FAQ */}
        <div className="mt-16 max-w-3xl border-t border-line pt-16">
          <p className="eyebrow mb-8">Common questions</p>
          <div className="space-y-8">
            {FAQS.map((f) => (
              <div key={f.question}>
                <h2 className="font-display text-xl text-ink">{f.question}</h2>
                <p className="mt-3 max-w-2xl text-muted">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-wrap items-center gap-6">
          <Link href="/valuation" className="btn btn-accent">
            Request a free valuation
          </Link>
          <a
            href={whatsappLink(`Hello ${site.name}, I'd like to sell my Dubai property.`)}
            className="btn btn-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Message us on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
