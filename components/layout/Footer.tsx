import Image from "next/image";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site, whatsappLink } from "@/lib/site";
import { uiContent } from "@/lib/data/i18n/ui";

type FooterCopy = {
  tagline: string;
  colExplore: string; colCompany: string; colLegal: string; colConnect: string;
  linkNeighbourhoods: string; linkPropertyTypes: string; linkDevelopers: string;
  linkListings: string; linkSold: string; linkMarket: string;
  linkAbout: string; linkTeam: string; linkContact: string; linkSell: string;
  linkValuation: string; linkPriceGuide: string; linkBuyingGuide: string;
  linkPrivacy: string; linkTerms: string; linkCookies: string; linkSitemap: string; linkPhotography: string;
  call: string; email: string; followGoogle: string;
};

/** Structured multi-column footer: brand + tagline, four link columns, and a
 * quiet legal bar. Everything is locale-aware and lays out cleanly on mobile. */
export async function Footer() {
  const locale = await getLocale();
  const c = uiContent<FooterCopy>("footer", locale);
  const tel = site.contact.phone.replace(/\s/g, "");
  const year = new Date().getFullYear();

  const explore = [
    { label: c.linkNeighbourhoods, href: "/areas" },
    { label: c.linkPropertyTypes, href: "/property" },
    { label: c.linkDevelopers, href: "/developers" },
    { label: c.linkListings, href: "/listings" },
    { label: c.linkSold, href: "/sold" },
    { label: c.linkMarket, href: "/market" },
  ];
  const company = [
    { label: c.linkAbout, href: "/about" },
    { label: c.linkTeam, href: "/team" },
    { label: c.linkContact, href: "/contact" },
    { label: c.linkSell, href: "/sell" },
    { label: c.linkValuation, href: "/valuation" },
    { label: c.linkPriceGuide, href: "/market-report" },
    { label: c.linkBuyingGuide, href: "/guides/buying-property-in-dubai" },
  ];
  const legal = [
    { label: c.linkPrivacy, href: "/privacy-policy" },
    { label: c.linkTerms, href: "/terms" },
    { label: c.linkCookies, href: "/cookies" },
    { label: c.linkSitemap, href: "/site-map" },
    { label: c.linkPhotography, href: "/credits" },
  ];

  return (
    <footer className="border-t border-line bg-elevated">
      <div className="container-lux py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + tagline */}
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
              <Image src="/brand/logo-mark.png" alt="EQT logo" width={28} height={28} className="h-7 w-7" />
              <span className="font-display text-2xl leading-none tracking-[0.3em] text-ink">{site.name}</span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-muted">{c.tagline}</p>
            <address className="mt-5 text-xs not-italic leading-relaxed text-faint">
              {site.contact.address.street}
              <br />
              {site.contact.address.city}, United Arab Emirates
            </address>
          </div>

          {/* Explore */}
          <FooterCol title={c.colExplore}>
            {explore.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-ink">{l.label}</Link>
              </li>
            ))}
          </FooterCol>

          {/* Company */}
          <FooterCol title={c.colCompany}>
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-ink">{l.label}</Link>
              </li>
            ))}
          </FooterCol>

          {/* Connect */}
          <FooterCol title={c.colConnect}>
            <li>
              <a href={`tel:${tel}`} className="whitespace-nowrap transition-colors hover:text-ink">
                {c.call} {site.contact.phone}
              </a>
            </li>
            <li><a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-ink">{c.email}</a></li>
            <li>
              <a href={whatsappLink(`Hello ${site.name}, I'd like to enquire.`)} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">WhatsApp</a>
            </li>
            <li><a href={site.social.google} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">Google</a></li>
            <li><a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">LinkedIn</a></li>
            <li><a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">Instagram</a></li>
            <li><a href="https://www.google.com/preferences/source?q=eqt.ae" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">{c.followGoogle}</a></li>
          </FooterCol>
        </div>

        <div className="hairline my-10" />

        {/* Legal bar */}
        <div className="flex flex-col gap-4 text-xs text-faint md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. RERA ORN {site.regulatory.reraOrn} · DED {site.regulatory.dedLicense}.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-ink">{l.label}</Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 text-[0.7rem] uppercase tracking-[0.2em] text-faint">{title}</p>
      <ul className="space-y-2.5 text-sm text-muted">{children}</ul>
    </div>
  );
}
