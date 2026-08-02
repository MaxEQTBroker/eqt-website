import type { Metadata } from "next";
import { LeadForm } from "@/components/lead/LeadForm";
import { Reveal } from "@/components/motion/Reveal";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Speak with a private advisor at EQT — WhatsApp, email or phone. Dubai luxury real estate across Palm Jumeirah, Al Barari and Jumeirah Islands.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const channels = [
    {
      label: "WhatsApp",
      value: "Message us directly",
      href: whatsappLink(`Hello ${site.name}, I'd like to enquire.`),
      primary: true,
    },
    { label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
    { label: "Phone", value: site.contact.phone, href: `tel:${site.contact.phone.replace(/\s/g, "")}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <section className="container-lux pb-12 pt-40">
        <p className="eyebrow mb-5">Begin the conversation</p>
        <h1 className="display-hero max-w-[14ch] text-ink" style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)" }}>
          Speak with a private advisor
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted">
          Tell us what you&apos;re looking for and we&apos;ll respond personally,
          usually within the hour, with a shortlist matched to your brief.
        </p>
      </section>

      <section className="container-lux grid gap-14 pb-[var(--section-py)] lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        {/* Channels + details */}
        <Reveal>
          <div className="space-y-4">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center justify-between gap-4 rounded-lg border border-line bg-elevated px-6 py-5 transition-colors duration-300 hover:border-accent-500"
              >
                <span>
                  <span className="block text-sm text-faint">{c.label}</span>
                  <span className={c.primary ? "text-lg text-accent-500" : "text-lg text-ink"}>
                    {c.value}
                  </span>
                </span>
                <span className="text-accent-500">→</span>
              </a>
            ))}
          </div>

          <div className="mt-10 rounded-lg border border-line bg-elevated p-8">
            <p className="eyebrow mb-5">Office</p>
            <address className="not-italic leading-relaxed text-muted">
              {site.contact.address.street}
              <br />
              {site.contact.address.city}, United Arab Emirates
            </address>
            <div className="mt-6 hairline" />
            <p className="mt-6 text-sm text-faint">
              Regulated by the {site.regulatory.authority}.<br />
              RERA ORN <span className="text-muted">{site.regulatory.reraOrn}</span> · DED
              License <span className="text-muted">{site.regulatory.dedLicense}</span>
            </p>
          </div>
        </Reveal>

        {/* Multi-step form */}
        <Reveal delay={120}>
          <LeadForm />
        </Reveal>
      </section>
    </>
  );
}
