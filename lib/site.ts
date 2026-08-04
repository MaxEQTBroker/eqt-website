/**
 * Central site configuration. Single source of truth for brand facts,
 * contact/regulatory details, and navigation. Reads public env vars so the
 * same build works across environments without code changes.
 */

export const site = {
  name: "EQT",
  legalName: "EQT Real Estate Brokerage LLC",
  tagline: "Dubai's most exceptional addresses",
  description:
    "EQT is a Dubai luxury real estate brokerage specialising in the emirate's most exclusive communities, Palm Jumeirah, Al Barari and Jumeirah Islands. Private sales, curated portfolios and a proven track record.",
  // TEMP: live Vercel URL so sitemap/canonicals/robots match where the site is
  // actually hosted. Switch to "https://www.eqt.ae" once that domain is attached.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://eqt-website-ten.vercel.app",
  locale: "en_AE",

  contact: {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971500000000",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@eqt.ae",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+971 4 000 0000",
    address: {
      street: "One Central, DWTC",
      city: "Dubai",
      region: "Dubai",
      country: "AE",
    },
  },

  // Regulatory proof, critical for trust signals & AEO fact extraction.
  regulatory: {
    reraOrn: process.env.NEXT_PUBLIC_RERA_ORN ?? "33039",
    dedLicense: process.env.NEXT_PUBLIC_DED_LICENSE ?? "1123882",
    authority: "Dubai Land Department (DLD), RERA",
  },

  social: {
    instagram: "https://instagram.com/eqt",
    linkedin: "https://linkedin.com/company/eqt",
  },
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Neighborhoods", href: "/areas" },
  { label: "Developers", href: "/developers" },
  { label: "Sold Properties", href: "/sold" },
  { label: "Active Properties", href: "/listings" },
  { label: "Property Type", href: "/property" },
  { label: "Blog Posts", href: "/blog" },
];

/** Build a prefilled WhatsApp deep link. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
