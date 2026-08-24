import type { Metadata } from "next";
import { LeadForm } from "@/components/lead/LeadForm";
import { Reveal } from "@/components/motion/Reveal";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { site, whatsappLink } from "@/lib/site";
import { uiContent, hasUiTranslation } from "@/lib/data/i18n/ui";

type ContactCopy = {
  metaTitle: string;
  metaDescription: string;
  breadcrumb: string;
  eyebrow: string;
  h1: string;
  intro: string;
  channelWhatsapp: string;
  channelWhatsappValue: string;
  channelEmail: string;
  channelPhone: string;
  officeLabel: string;
  regulatedLine: string;
  reraLine: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = uiContent<ContactCopy>("contact", locale);
  const canonical = locale === "en" ? "/contact" : `/${locale}/contact`;
  const languages: Record<string, string> = { "x-default": "/contact", en: "/contact" };
  if (hasUiTranslation("contact", "uk")) languages.uk = "/uk/contact";
  if (hasUiTranslation("contact", "ru")) languages.ru = "/ru/contact";
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical, languages },
    robots: hasUiTranslation("contact", locale) ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = uiContent<ContactCopy>("contact", locale);
  const channels = [
    {
      label: c.channelWhatsapp,
      value: c.channelWhatsappValue,
      href: whatsappLink(`Hello ${site.name}, I'd like to enquire.`),
      primary: true,
    },
    { label: c.channelEmail, value: site.contact.email, href: `mailto:${site.contact.email}` },
    { label: c.channelPhone, value: site.contact.phone, href: `tel:${site.contact.phone.replace(/\s/g, "")}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: c.breadcrumb, path: "/contact" },
        ]}
      />

      <section className="container-lux pb-12 pt-40">
        <p className="eyebrow mb-5">{c.eyebrow}</p>
        <h1 className="display-hero max-w-[14ch] text-ink" style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)" }}>
          {c.h1}
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted">{c.intro}</p>
      </section>

      <section className="container-lux grid gap-14 pb-[var(--section-py)] lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        {/* Channels + details */}
        <Reveal>
          <div className="space-y-4">
            {channels.map((ch) => (
              <a
                key={ch.label}
                href={ch.href}
                target={ch.href.startsWith("http") ? "_blank" : undefined}
                rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center justify-between gap-4 rounded-lg border border-line bg-elevated px-6 py-5 transition-colors duration-300 hover:border-accent-500"
              >
                <span>
                  <span className="block text-sm text-faint">{ch.label}</span>
                  <span className={ch.primary ? "text-lg text-accent-500" : "text-lg text-ink"}>
                    {ch.value}
                  </span>
                </span>
                <span className="text-accent-500">→</span>
              </a>
            ))}
          </div>

          <div className="mt-10 rounded-lg border border-line bg-elevated p-8">
            <p className="eyebrow mb-5">{c.officeLabel}</p>
            <address className="not-italic leading-relaxed text-muted">
              {site.contact.address.street}
              <br />
              {site.contact.address.city}, United Arab Emirates
            </address>
            <div className="mt-6 hairline" />
            <p className="mt-6 text-sm text-faint">
              {c.regulatedLine.replace("{authority}", site.regulatory.authority)}
              <br />
              {c.reraLine
                .replace("{orn}", site.regulatory.reraOrn)
                .replace("{ded}", site.regulatory.dedLicense)}
            </p>
          </div>
        </Reveal>

        {/* Multi-step form */}
        <Reveal delay={120}>
          <LeadForm source="contact" />
        </Reveal>
      </section>
    </>
  );
}
