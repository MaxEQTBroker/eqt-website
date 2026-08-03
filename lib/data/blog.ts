import type { MediaImage } from "./types";

/**
 * Editorial / SEO + AEO journal. Content is intentionally "answer-first" (the
 * intro directly answers the target query) with FAQ blocks, so it's easy for
 * both search engines and AI answer engines to extract and cite. Behind the
 * same data seam — swap the mock array for a CMS/MDX source later without
 * touching pages.
 */
export interface Author {
  name: string;
  role: string;
  credential?: string;
}

export interface BlogSection {
  heading: string;
  body: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  /** Answer-first summary (also the meta description). */
  excerpt: string;
  category: "Buyer Guides" | "Community Guides" | "Market & Data" | "Investment";
  author: Author;
  publishedAt: string; // ISO
  updatedAt: string; // ISO
  readingMinutes: number;
  heroImage: MediaImage;
  /** The direct answer to the query, first thing on the page. */
  intro: string;
  sections: BlogSection[];
  faqs: { question: string; answer: string }[];
  keywords: string[];
}

const EQT_TEAM: Author = {
  name: "The EQT Private Office",
  role: "Dubai luxury real estate advisors",
  credential: "RERA-registered brokerage",
};

export const mockPosts: BlogPost[] = [
  {
    slug: "how-to-buy-property-in-dubai-as-a-foreigner",
    title: "How to buy property in Dubai as a foreigner (2026 guide)",
    excerpt:
      "Foreigners can buy, own and sell property in Dubai's designated freehold areas with full title at the Dubai Land Department. Here is the step-by-step process, the costs, and what to watch for.",
    category: "Buyer Guides",
    author: EQT_TEAM,
    publishedAt: "2026-07-10",
    updatedAt: "2026-08-03",
    readingMinutes: 7,
    heroImage: {
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1920&q=80",
      alt: "Downtown Dubai skyline at night",
      tone: "#151721",
    },
    intro:
      "Yes, foreigners can buy property in Dubai. Non-UAE nationals can purchase, own and sell real estate outright in the emirate's designated freehold areas, with title registered in their name at the Dubai Land Department (DLD). The process is fast, transparent and typically completes in two to six weeks.",
    sections: [
      {
        heading: "Where foreigners can buy (freehold areas)",
        body: [
          "Dubai grants foreign nationals full freehold ownership in designated areas, which include Palm Jumeirah, Downtown Dubai, Dubai Marina, Emirates Hills, Dubai Hills Estate, Al Barari, Jumeirah Islands, Emaar Beachfront and many more.",
          "Outside these zones, foreigners may hold leasehold or usufruct rights. For most buyers seeking a home or investment, the freehold areas cover the entire prime market.",
        ],
      },
      {
        heading: "The step-by-step process",
        body: [
          "1. Agree terms and sign a Memorandum of Understanding (Form F), paying a deposit (typically 10%).",
          "2. The seller obtains a No Objection Certificate (NOC) from the developer.",
          "3. Both parties attend the DLD (or a registration trustee) to transfer title; the balance is paid and a new title deed is issued in your name.",
        ],
      },
      {
        heading: "What it costs",
        body: [
          "Budget roughly 6–8% of the purchase price in transaction costs: a 4% DLD transfer fee, agency commission (usually 2%), plus registration and trustee fees.",
          "Buyers can pay cash or, subject to eligibility, obtain a mortgage from a UAE bank — typically up to 50–80% loan-to-value for non-residents and residents respectively.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can foreigners own property in Dubai outright?",
        answer:
          "Yes. In Dubai's designated freehold areas, foreign nationals can own property outright with a title deed registered in their name at the Dubai Land Department, with no requirement for a local partner.",
      },
      {
        question: "How much are the fees to buy property in Dubai?",
        answer:
          "Expect around 6–8% of the price in total: a 4% Dubai Land Department transfer fee, approximately 2% agency commission, and registration and trustee fees.",
      },
      {
        question: "Does buying property in Dubai give you residency?",
        answer:
          "Property purchases above certain thresholds can qualify buyers for a UAE residence visa, including the 10-year Golden Visa for investments of AED 2 million or more.",
      },
    ],
    keywords: [
      "buy property in Dubai as a foreigner",
      "Dubai freehold areas",
      "foreigners buying property Dubai",
      "Dubai property purchase process",
      "cost of buying property in Dubai",
    ],
  },
  {
    slug: "dubai-golden-visa-through-property",
    title: "Dubai Golden Visa through property: the complete guide",
    excerpt:
      "You can obtain a 10-year UAE Golden Visa by investing AED 2 million or more in Dubai real estate. Here's who qualifies, how it works, and what it includes.",
    category: "Buyer Guides",
    author: EQT_TEAM,
    publishedAt: "2026-06-22",
    updatedAt: "2026-08-03",
    readingMinutes: 6,
    heroImage: {
      url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80",
      alt: "Aerial view of a Dubai waterfront community at dusk",
      tone: "#12212b",
    },
    intro:
      "You can obtain a 10-year UAE Golden Visa by investing AED 2 million (about USD 545,000) or more in Dubai property. The visa is renewable, lets you sponsor your family and staff, and does not require you to live in the UAE full-time.",
    sections: [
      {
        heading: "Who qualifies",
        body: [
          "Any individual owning Dubai real estate with a value of at least AED 2 million qualifies for the 10-year Golden Visa. This can be one property or several, and off-plan properties from approved developers can count.",
          "The property can be mortgaged, provided the required equity threshold is met.",
        ],
      },
      {
        heading: "What the Golden Visa includes",
        body: [
          "A 10-year renewable residence permit, the ability to sponsor your spouse, children and household staff, and the freedom to live, work and study in the UAE — or simply hold the visa without residing full-time.",
          "There is no personal income tax in the UAE, which is a major draw for international investors.",
        ],
      },
      {
        heading: "How to apply",
        body: [
          "Once your property is registered at the Dubai Land Department, you apply through the DLD or ICP channels with your title deed, passport and photographs. EQT can coordinate the process alongside your purchase.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much property do I need to buy for a Dubai Golden Visa?",
        answer:
          "You need to own Dubai real estate worth at least AED 2 million to qualify for the 10-year Golden Visa. This can be a single property or a combination of properties.",
      },
      {
        question: "Do you have to live in Dubai to keep the Golden Visa?",
        answer:
          "No. The Golden Visa does not require full-time residency; holders can maintain it without living in the UAE year-round, subject to the standard renewal conditions.",
      },
    ],
    keywords: [
      "Dubai Golden Visa property",
      "UAE Golden Visa real estate",
      "Golden Visa AED 2 million",
      "residency by property Dubai",
    ],
  },
  {
    slug: "palm-jumeirah-villa-prices-2026",
    title: "Palm Jumeirah villa prices in 2026: what to expect",
    excerpt:
      "Frond villas on Palm Jumeirah typically trade from around AED 12 million for a Garden Home, rising beyond AED 100 million for renovated Signature Villas. Here's the current picture.",
    category: "Community Guides",
    author: EQT_TEAM,
    publishedAt: "2026-07-28",
    updatedAt: "2026-08-03",
    readingMinutes: 5,
    heroImage: {
      url: "/images/palm-jumeirah/1.jpg",
      alt: "Palm Jumeirah signature villa with a long infinity pool",
      tone: "#dfe3e6",
    },
    intro:
      "In 2026, villa prices on Palm Jumeirah generally start from around AED 12 million for a Garden Home and rise well beyond AED 100 million for renovated Signature Villas and custom mansions with private beach frontage. The Palm remains one of Dubai's most liquid and sought-after villa markets.",
    sections: [
      {
        heading: "Garden Homes vs Signature Villas",
        body: [
          "Garden Homes — the more numerous frond villas — typically trade from roughly AED 12–40 million depending on frond, condition and view.",
          "Signature Villas, which sit at the tip of the fronds with the largest plots and beaches, command a significant premium, with renovated examples trading well above AED 100 million.",
        ],
      },
      {
        heading: "What drives price on the Palm",
        body: [
          "Frond position, plot and beach width, skyline versus open-sea views, and above all the quality of renovation. A fully rebuilt villa can trade at a large premium to an original-condition home of the same size.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much does a villa on Palm Jumeirah cost?",
        answer:
          "Frond villas on Palm Jumeirah typically start from around AED 12 million for a Garden Home and rise beyond AED 100 million for renovated Signature Villas and custom mansions with private beach frontage.",
      },
      {
        question: "Are Palm Jumeirah villas a good investment?",
        answer:
          "Palm Jumeirah combines scarcity, private beach frontage and landmark status, and has shown some of the strongest capital appreciation in Dubai, making its villas a resilient long-term asset.",
      },
    ],
    keywords: [
      "Palm Jumeirah villa prices",
      "Palm Jumeirah villas for sale",
      "Signature Villa Palm Jumeirah price",
      "Garden Homes Palm Jumeirah",
    ],
  },
];

// ── Repository (the seam) ────────────────────────────────────────────────
export async function getAllPosts(): Promise<BlogPost[]> {
  return [...mockPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return mockPosts.find((p) => p.slug === slug) ?? null;
}

export async function getAllPostSlugs(): Promise<string[]> {
  return mockPosts.map((p) => p.slug);
}

export async function getRelatedPosts(slug: string, limit = 2): Promise<BlogPost[]> {
  const current = mockPosts.find((p) => p.slug === slug);
  return mockPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => (b.category === current?.category ? 1 : 0) - (a.category === current?.category ? 1 : 0))
    .slice(0, limit);
}
