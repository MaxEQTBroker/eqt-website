import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/lib/seo/jsonld";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Buying Property in Dubai: The Complete Guide (2026)",
  description:
    "The complete guide to buying property in Dubai — freehold ownership, costs and fees, the Golden Visa, where to buy, investing, and selling. EQT's full library, in one place.",
  keywords: [
    "buying property in Dubai",
    "Dubai property guide",
    "how to buy property in Dubai",
    "Dubai real estate guide 2026",
  ],
  alternates: { canonical: "/guides/buying-property-in-dubai" },
};

const GROUPS: { title: string; blurb: string; items: { title: string; href: string; desc: string }[] }[] = [
  {
    title: "Ownership & residency",
    blurb: "Who can buy, how freehold works, and the residency it can unlock.",
    items: [
      { title: "Can foreigners buy property in Dubai? Freehold explained", href: "/blog/can-foreigners-buy-property-dubai-freehold", desc: "Freehold vs leasehold, designated zones, and the buying process for non-nationals." },
      { title: "Golden Visa through Dubai property: the 2026 guide", href: "/blog/golden-visa-dubai-property-2026-guide", desc: "The AED 2M threshold, eligibility, and how residency works." },
      { title: "How to buy property in Dubai from abroad", href: "/blog/how-to-buy-property-in-dubai-from-abroad", desc: "Buying remotely by power of attorney, funds, and safeguards." },
    ],
  },
  {
    title: "Costs & fees",
    blurb: "What you actually pay to buy and to own, beyond the price.",
    items: [
      { title: "How much to buy a villa on Palm Jumeirah", href: "/blog/cost-to-buy-villa-palm-jumeirah", desc: "Villa types, price ranges, and total transaction costs." },
      { title: "Service charges & hidden costs explained", href: "/blog/dubai-property-service-charges-hidden-costs-explained", desc: "The 4% DLD fee, agency, trustee, and annual service charges." },
    ],
  },
  {
    title: "Where to buy",
    blurb: "Choosing the right community for your budget and lifestyle.",
    items: [
      { title: "Best areas to buy an apartment in Dubai (2026)", href: "/blog/best-areas-buy-apartment-dubai-2026", desc: "Balancing yield, lifestyle and liquidity across the leading districts." },
      { title: "Best Dubai communities for families", href: "/blog/best-dubai-communities-for-families-2026", desc: "Schools, greenery and villa space, community by community." },
      { title: "Downtown Dubai vs Business Bay", href: "/blog/downtown-dubai-vs-business-bay-which-should-you-buy", desc: "Prestige vs value in central Dubai." },
      { title: "Emirates Hills vs Palm Jumeirah", href: "/blog/emirates-hills-vs-palm-jumeirah-where-to-buy", desc: "Gated golf mansions vs beachfront living at the ultra-prime top." },
      { title: "Emaar vs Nakheel vs Meraas: developers compared", href: "/blog/emaar-vs-nakheel-vs-meraas-dubai-developers-compared", desc: "How the master developers differ, and which suits your brief." },
    ],
  },
  {
    title: "Investing",
    blurb: "Yields, off-plan strategy, and the branded-residence question.",
    items: [
      { title: "Rental yields in Dubai: best luxury communities", href: "/blog/rental-yields-dubai-best-performing-luxury-communities", desc: "Gross vs net yield and where prime income performs." },
      { title: "Off-plan vs ready property in Dubai", href: "/blog/off-plan-vs-ready-property-dubai", desc: "Price, payment plans, risk and returns compared." },
      { title: "Branded residences: are they worth it?", href: "/blog/branded-residences-dubai-worth-it", desc: "The premium, the service, and when it pays off." },
    ],
  },
  {
    title: "Selling",
    blurb: "Getting the best price when it's time to exit.",
    items: [
      { title: "How to sell your Dubai property for the best price", href: "/blog/how-to-sell-your-dubai-property-best-price", desc: "Form A, pricing to data, the NOC, and the DLD transfer." },
    ],
  },
];

const faqs = [
  {
    question: "Can foreigners buy property in Dubai?",
    answer: "Yes. Non-UAE nationals can own property outright (freehold) in Dubai's designated freehold zones, with no residency requirement. See the ownership guide for the full process.",
  },
  {
    question: "What are the costs of buying property in Dubai?",
    answer: "Budget roughly 6-8% of the price in one-off costs, led by the 4% Dubai Land Department transfer fee, plus agency commission and registration. There is no annual property tax or capital gains tax.",
  },
  {
    question: "Does buying property give me UAE residency?",
    answer: "A property purchase of AED 2 million or more can support a renewable 10-year Golden Visa, extendable to family. Lower values may support a shorter property-linked visa.",
  },
  {
    question: "Which area of Dubai should I buy in?",
    answer: "It depends on your goal: prestige and liquidity (Downtown), all-round balance (Dubai Marina), beachfront luxury (Palm Jumeirah), value and yield (Business Bay), or gated family villas (Dubai Hills, Arabian Ranches, Emirates Hills).",
  },
];

export default function BuyingGuidePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Buying Property in Dubai", path: "/guides/buying-property-in-dubai" },
        ]}
      />
      <FaqJsonLd faqs={faqs} />

      <section className="container-lux pb-14 pt-40">
        <div className="mb-6">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Buying guide", href: "/guides/buying-property-in-dubai" }]} />
        </div>
        <p className="eyebrow mb-5">The complete guide</p>
        <h1 className="display-hero max-w-[20ch] text-ink" style={{ fontSize: "clamp(2.25rem,6vw,4.75rem)" }}>
          Buying property in Dubai
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted">
          Everything you need, in one place — ownership and residency, the true costs, where to buy,
          how to invest, and how to sell. Each section links to a detailed, answer-first guide from
          EQT&apos;s RERA-licensed advisors.
        </p>
      </section>

      <section className="container-lux pb-[var(--section-py)]">
        <div className="space-y-14">
          {GROUPS.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 60}>
              <div className="border-t border-line pt-10">
                <h2 className="display-h2 text-ink">{group.title}</h2>
                <p className="mt-2 max-w-2xl text-muted">{group.blurb}</p>
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group flex h-full flex-col rounded-lg border border-line bg-elevated p-6 transition-colors hover:border-accent-500"
                      >
                        <span className="font-display text-lg leading-snug text-ink group-hover:text-accent-500">
                          {item.title}
                        </span>
                        <span className="mt-2 text-sm text-muted">{item.desc}</span>
                        <span className="mt-4 text-sm text-accent-500">Read guide →</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-elevated">
        <div className="container-lux py-[var(--section-py)]">
          <Reveal>
            <p className="eyebrow mb-4">Quick answers</p>
            <h2 className="display-h2 max-w-[16ch] text-ink">Buying in Dubai, in brief</h2>
          </Reveal>
          <div className="mt-12 divide-y divide-line border-y border-line">
            {faqs.map((faq) => (
              <Reveal key={faq.question}>
                <details className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl text-ink">
                    {faq.question}
                    <span className="text-accent-500 transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 max-w-3xl text-lg text-muted">{faq.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-lux flex flex-col items-start gap-6 py-[var(--section-py)] md:flex-row md:items-center md:justify-between">
        <h2 className="display-h2 max-w-[18ch] text-ink">Ready to talk to an advisor?</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/valuation" className="btn btn-accent">Free valuation</Link>
          <Link href="/listings" className="btn btn-ghost">Browse listings</Link>
          <a
            href={whatsappLink(`Hello ${site.name}, I'm exploring buying in Dubai and have a question.`)}
            className="btn btn-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ask on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
