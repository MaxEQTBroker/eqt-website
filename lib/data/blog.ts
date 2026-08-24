import type { MediaImage } from "./types";

/**
 * Editorial / SEO + AEO journal. Content is intentionally "answer-first" (the
 * intro directly answers the target query) with FAQ blocks, so it's easy for
 * both search engines and AI answer engines to extract and cite. Behind the
 * same data seam, swap the mock array for a CMS/MDX source later without
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
  /** Optional bulleted list rendered after the body (steps, pros/cons, checklist). */
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  /** Answer-first summary (also the meta description). */
  excerpt: string;
  category: "Buyer Guides" | "Seller Guides" | "Community Guides" | "Market & Data" | "Investment";
  author: Author;
  publishedAt: string; // ISO
  updatedAt: string; // ISO
  readingMinutes: number;
  heroImage: MediaImage;
  /** The direct answer to the query, first thing on the page. */
  intro: string;
  /** Optional scannable summary box near the top (great for snippets + AEO). */
  keyTakeaways?: string[];
  sections: BlogSection[];
  faqs: { question: string; answer: string }[];
  /** Optional internal links to related guides/areas/developers for SEO + navigation. */
  relatedLinks?: { label: string; href: string }[];
  keywords: string[];
}

const EQT_TEAM: Author = {
  name: "The EQT Private Office",
  role: "Dubai luxury real estate advisors",
  credential: "RERA-registered brokerage",
};

export const mockPosts: BlogPost[] = [
  {
    slug: "palm-jumeirah-villa-prices-2026",
    title: "Palm Jumeirah villa prices in 2026: what to expect",
    excerpt:
      "Frond villas on Palm Jumeirah typically trade from around AED 12 million for a Garden Home, rising beyond AED 100 million for renovated Signature Villas. Here's the current picture.",
    category: "Community Guides",
    author: EQT_TEAM,
    publishedAt: "2026-07-28",
    updatedAt: "2026-08-03",
    readingMinutes: 7,
    heroImage: {
      url: "/images/palm-jumeirah/1.jpg",
      alt: "Palm Jumeirah signature villa with a long infinity pool",
      tone: "#dfe3e6",
    },
    intro:
      "In 2026, villa prices on Palm Jumeirah generally start from around AED 12 million for a Garden Home and rise well beyond AED 100 million for renovated Signature Villas and custom mansions with private beach frontage. The Palm remains one of Dubai's most liquid and sought-after villa markets. Here is what sets the price, and how to buy well.",
    keyTakeaways: [
      "Garden Homes (the frond villas) typically trade from roughly AED 12-40 million.",
      "Signature Villas, at the frond tips with the largest plots and beaches, trade well above AED 100 million.",
      "Renovation quality is the single biggest price driver on the Palm.",
      "Frond position, plot and beach width, and sea versus skyline views all move value.",
      "Palm Jumeirah is a designated freehold area, so foreigners can buy with full title at the DLD.",
    ],
    sections: [
      {
        heading: "Garden Homes vs Signature Villas",
        body: [
          "Palm Jumeirah's villas fall into two broad tiers. Garden Homes are the more numerous frond villas, while Signature Villas sit at the tips of the fronds with the largest plots and widest private beaches.",
          "The gap between them is significant, driven by plot size, beach frontage and scarcity. Within each tier, condition and renovation quality then set where a specific villa lands.",
        ],
        bullets: [
          "Garden Homes: typically AED 12-40 million depending on frond, condition and view.",
          "Signature Villas: a large premium, with renovated examples well above AED 100 million.",
          "Custom mansions and fully rebuilt homes: trade at the very top of the range.",
        ],
      },
      {
        heading: "What drives price on the Palm",
        body: [
          "Two identical-sized villas can trade at very different prices. The variables below explain most of the gap, and a good specialist prices against recent comparable sales rather than asking prices.",
        ],
        bullets: [
          "Renovation quality: a fully rebuilt villa commands a large premium over an original-condition home.",
          "Frond position and plot size: some fronds and plots are more sought-after than others.",
          "Beach width and orientation: wider beaches and better sun aspect add value.",
          "Views: open-sea and skyline views typically price above mid-frond outlooks.",
        ],
      },
      {
        heading: "Apartments and penthouses on the Palm",
        body: [
          "The Palm is not only villas. The crescent and trunk hold apartments, penthouses and branded residences, including ultra-prime schemes from developers such as OMNIYAT and others.",
          "Entry-level apartments start far below villa prices, while landmark penthouses and branded residences can reach into the tens or hundreds of millions, offering beachfront living with lock-up-and-leave convenience.",
        ],
      },
      {
        heading: "Is it a good time to buy on the Palm?",
        body: [
          "Palm Jumeirah combines scarcity, private beach frontage and landmark status, and has shown some of the strongest capital appreciation in Dubai. Supply of prime frond villas is fixed, which supports values through cycles.",
          "For long-term buyers and end-users, that scarcity and liquidity make the Palm one of the most resilient prime markets in the emirate, though the right villa and renovation still matter more than timing.",
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
        question: "What is the difference between Garden Homes and Signature Villas?",
        answer:
          "Garden Homes are the more numerous frond villas with standard plots, while Signature Villas sit at the frond tips with the largest plots and widest private beaches, commanding a significant premium.",
      },
      {
        question: "Are Palm Jumeirah villas a good investment?",
        answer:
          "Palm Jumeirah combines scarcity, private beach frontage and landmark status, and has shown some of the strongest capital appreciation in Dubai, making its villas a resilient long-term asset.",
      },
      {
        question: "Can foreigners buy property on Palm Jumeirah?",
        answer:
          "Yes. Palm Jumeirah is a designated freehold area, so non-UAE nationals can buy, own and sell property with full title registered at the Dubai Land Department.",
      },
    ],
    relatedLinks: [
      { label: "Palm Jumeirah luxury villas", href: "/areas/palm-jumeirah" },
      { label: "Dubai luxury villas", href: "/property/villas" },
      { label: "How to buy a villa in Dubai", href: "/blog/how-to-buy-a-villa-in-dubai" },
      { label: "Luxury property in Dubai: a price guide", href: "/blog/luxury-property-in-dubai-price-guide" },
      { label: "Waterfront property in Dubai: best areas", href: "/blog/waterfront-property-in-dubai-best-areas" },
      { label: "How to invest in Dubai real estate", href: "/blog/how-to-invest-in-dubai-real-estate" },
    ],
    keywords: [
      "Palm Jumeirah villa prices",
      "Palm Jumeirah villas for sale",
      "Signature Villa Palm Jumeirah price",
      "Garden Homes Palm Jumeirah",
    ],
  },
  {
    slug: "how-to-invest-in-dubai-real-estate",
    title: "How to invest in Dubai real estate: a 2026 beginner's guide",
    excerpt:
      "To invest in Dubai real estate, buy freehold property in a designated area, budget 6-8% in fees, and choose between ready homes for rental income or off-plan for capital growth. Here's the full step-by-step.",
    category: "Investment",
    author: EQT_TEAM,
    publishedAt: "2026-07-30",
    updatedAt: "2026-08-03",
    readingMinutes: 8,
    heroImage: {
      url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1920&q=80",
      alt: "Dubai waterfront skyline of residential towers",
      tone: "#c9cdcf",
    },
    intro:
      "To invest in Dubai real estate, buy a freehold property in one of the city's designated investment areas, budget around 6-8% of the price in one-off fees, and choose a strategy: ready homes for immediate rental income (often 6-9% gross yield) or off-plan for capital growth on a staged payment plan. There is no annual property tax and no tax on rental income, and an investment of AED 2 million or more can earn you a 10-year Golden Visa. This guide walks through the whole process, step by step.",
    keyTakeaways: [
      "Foreign nationals can own freehold property outright in Dubai's designated areas, with title registered at the Dubai Land Department.",
      "Budget roughly 6-8% of the price in one-off costs: a 4% DLD transfer fee, about 2% agency commission, plus registration and any mortgage fees.",
      "Ready property gives income now; off-plan gives capital growth on a payment plan, with buyer funds protected in escrow.",
      "Gross rental yields are commonly 6-9%, among the highest of any major global city, with no property tax and no tax on rental income.",
      "Entry ranges from about AED 700,000 (a JVC studio) to AED 100M+ for prime villas; AED 2M+ can qualify you for a 10-year Golden Visa.",
    ],
    sections: [
      {
        heading: "Step 1: Set your goal, income, growth, or both",
        body: [
          "Every good investment decision starts with the objective, because it determines what and where you buy. There are two core strategies, and many investors combine them.",
          "Income (ready property): buy a completed apartment or villa in a high-demand area and let it out. You earn rent from day one and can see the exact unit, view and finish before committing. Growth (off-plan): buy from a developer before completion, usually at a lower launch price and on a staged payment plan, aiming to benefit from appreciation between launch and handover.",
        ],
        bullets: [
          "Choose ready property if you want immediate cash flow and certainty.",
          "Choose off-plan if you want a lower entry price, payment flexibility and capital-growth potential.",
          "Blend both to balance income and growth across a small portfolio.",
        ],
      },
      {
        heading: "Step 2: Choose the right area for your strategy",
        body: [
          "Location does most of the work in real estate returns. The right community depends on your goal, budget and target tenant.",
          "For yield, investors gravitate to accessible, high-demand communities. For growth and prestige, they focus on scarce, landmark locations that hold value through cycles. A good broker narrows this down to specific buildings and layouts, not just communities, because two units in the same tower can perform very differently.",
        ],
        bullets: [
          "Higher yield: Jumeirah Village Circle (JVC), Business Bay, Dubai Marina, Dubai Creek Harbour.",
          "Growth & prestige: Downtown Dubai, Palm Jumeirah, Emaar Beachfront, Emirates Hills.",
          "Family end-users: Dubai Hills Estate, Arabian Ranches, Tilal Al Ghaf.",
        ],
      },
      {
        heading: "Step 3: Understand the full cost",
        body: [
          "The purchase price is not the total cost. Budget roughly 6-8% of the property value in one-off transaction fees, and factor in ongoing service charges when you model your return.",
          "If you are financing, UAE banks lend to residents up to about 80% loan-to-value and to non-residents up to roughly 50-60%, so many overseas buyers pay cash or arrange financing at home to move quickly.",
        ],
        bullets: [
          "Dubai Land Department (DLD) transfer fee: 4% of the price.",
          "Agency commission: about 2% plus VAT.",
          "Registration trustee fee: around AED 4,000 for properties above AED 500,000.",
          "If financing: ~1% bank arrangement fee, ~AED 2,500-3,500 valuation, 0.25% mortgage registration.",
          "Ongoing: annual service charges (per sq ft), which affect net yield.",
        ],
      },
      {
        heading: "Step 4: The buying process, step by step",
        body: [
          "For a ready (resale) property, the process is fast and typically completes in two to six weeks. Off-plan follows a slightly different path centred on the developer and escrow.",
          "Working with a RERA-registered broker keeps each stage compliant and protects your interests, particularly on price, contract terms and verification.",
        ],
        bullets: [
          "1. Agree terms and sign a Memorandum of Understanding (Form F), paying a ~10% deposit.",
          "2. The seller obtains a No Objection Certificate (NOC) from the developer.",
          "3. Both parties attend the DLD or a registration trustee to transfer title.",
          "4. Pay the balance; a new title deed is issued in your name.",
          "Off-plan variant: reserve the unit, sign the developer's SPA, register (Oqood), then pay instalments into escrow until handover.",
        ],
      },
      {
        heading: "Step 5: Residency, management and exit",
        body: [
          "Once you own, three things are worth planning: residency, management and your eventual exit. An investment of AED 2 million or more qualifies you for a renewable 10-year Golden Visa, which also lets you sponsor family.",
          "If you're letting the property, a management company can handle tenants, maintenance and (where permitted) short-term holiday lets, which can lift gross income. When you sell, there is no capital gains tax, and prime communities tend to offer the deepest, most liquid resale demand.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much money do I need to invest in Dubai real estate?",
        answer:
          "You can enter the Dubai market from around AED 700,000 for a studio or one-bedroom apartment in a value community like JVC, plus 6-8% in fees. Prime apartments and villas require significantly more, up to AED 100 million or beyond for trophy homes.",
      },
      {
        question: "Is Dubai real estate a good investment in 2026?",
        answer:
          "Dubai combines high rental yields, no annual property or rental income tax, a growing population and residency incentives such as the Golden Visa, which continue to make it one of the most attractive real estate markets globally for medium- to long-term investors.",
      },
      {
        question: "Can foreigners invest in and own Dubai real estate?",
        answer:
          "Yes. Foreign nationals can invest in and fully own property in Dubai's designated freehold areas, with title registered at the Dubai Land Department and no requirement for a local partner.",
      },
      {
        question: "What rental yield can I expect in Dubai?",
        answer:
          "Gross rental yields in Dubai commonly range from about 6% to 9% for well-chosen apartments, higher than most global cities, though net yield depends on service charges and vacancy.",
      },
      {
        question: "Do I pay tax on a Dubai investment property?",
        answer:
          "There is no annual property tax, no capital gains tax and no tax on rental income for individuals in Dubai. The main charge is a one-off 4% Dubai Land Department transfer fee at purchase. Always check your home country's tax rules on overseas income.",
      },
    ],
    relatedLinks: [
      { label: "Best areas to invest in Dubai for rental yield", href: "/blog/best-areas-to-invest-in-dubai-for-rental-yield" },
      { label: "Off-plan vs ready property in Dubai", href: "/blog/off-plan-vs-ready-property-in-dubai" },
      { label: "How much does it cost to buy property in Dubai?", href: "/blog/how-much-does-it-cost-to-buy-property-in-dubai" },
      { label: "Dubai Golden Visa through property", href: "/blog/dubai-golden-visa-through-property" },
      { label: "Explore Dubai communities", href: "/areas" },
      { label: "Browse property types", href: "/property" },
    ],
    keywords: [
      "how to invest in Dubai real estate",
      "invest in Dubai real estate",
      "Dubai real estate investment",
      "buy Dubai real estate",
      "Dubai property investment 2026",
    ],
  },
  {
    slug: "how-to-choose-a-real-estate-agent-in-dubai",
    title: "How to choose a real estate agent in Dubai (and what commission to expect)",
    excerpt:
      "Choose a RERA-registered Dubai agent with a verified track record, deep knowledge of your target community, and transparent fees, typically a 2% commission. Here's how to pick well and what to ask.",
    category: "Buyer Guides",
    author: EQT_TEAM,
    publishedAt: "2026-06-28",
    updatedAt: "2026-08-03",
    readingMinutes: 7,
    heroImage: {
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
      alt: "Elegant Dubai residence interior for a private consultation",
      tone: "#ddd9d1",
    },
    intro:
      "To choose a real estate agent in Dubai, look for a RERA-registered broker with a verified track record, genuine expertise in your target community, and transparent fees, the standard agency commission is around 2% of the purchase price. The right agent protects your interests, prices honestly, and often has access to off-market opportunities. Here is how to pick well, what to ask, and what to watch out for.",
    keyTakeaways: [
      "Use a RERA-registered broker working for a licensed, DED-registered brokerage, always verify the broker card.",
      "The standard buyer's agency commission in Dubai is about 2% of the price, plus VAT.",
      "Choose specialists in your target community; generalists often misprice niche markets.",
      "A good agent tells you when a property is overpriced, not just what you want to hear.",
      "Off-market access and honest pricing matter more than the size of the agency.",
    ],
    sections: [
      {
        heading: "How to verify an agent is legitimate",
        body: [
          "Dubai's market is regulated, so credentials are easy to check. Every practising broker must hold a RERA broker card and work for a licensed brokerage. Verifying this upfront protects you from unlicensed operators.",
        ],
        bullets: [
          "Ask for the agent's RERA broker card number and check it.",
          "Confirm the brokerage holds a valid DED trade licence.",
          "Look for the RERA permit (Trakheesi) number on any advertised listing.",
          "Request recent, verifiable transactions in your target community.",
        ],
      },
      {
        heading: "What separates a great agent from an average one",
        body: [
          "Credentials get you a licensed agent; judgement gets you a good one. The best agents combine deep local knowledge with honesty, because their long-term reputation depends on repeat clients and referrals, not a single deal.",
          "Community specialists price accurately, know which buildings and layouts perform, and often surface off-market opportunities that never reach the portals.",
        ],
        bullets: [
          "Deep expertise in one or two communities, not a scattergun approach.",
          "Willingness to say a property is overpriced or the wrong fit.",
          "Clear communication and responsiveness at every stage.",
          "Access to off-market and pre-launch opportunities.",
        ],
      },
      {
        heading: "Understanding commission and costs",
        body: [
          "The standard buyer's agency commission in Dubai is about 2% of the price plus 5% VAT on that commission. This sits alongside the 4% Dubai Land Department transfer fee and registration costs. Sellers typically pay their own agent a similar 2%.",
          "Be wary of anyone vague about fees or pushing a deal without a clear, written structure, transparency is a hallmark of a trustworthy brokerage.",
        ],
      },
      {
        heading: "Questions to ask before you sign",
        body: [
          "A short set of direct questions quickly reveals whether an agent is the right fit and genuinely working in your interest.",
        ],
        bullets: [
          "How many properties have you sold in this community in the last 12 months?",
          "What are the real service charges and expected net yield for this building?",
          "What is your commission, and what exactly does it cover?",
          "Can you show me comparable recent transactions to justify the price?",
          "Do you have any off-market options that fit my brief?",
        ],
      },
    ],
    faqs: [
      {
        question: "What commission do real estate agents charge in Dubai?",
        answer:
          "The standard real estate agency commission in Dubai is around 2% of the property price for the buyer's side, plus 5% VAT, in addition to the 4% Dubai Land Department transfer fee and registration costs.",
      },
      {
        question: "How do I know if a Dubai real estate agent is legitimate?",
        answer:
          "A legitimate Dubai agent holds a valid RERA broker card and works for a licensed, DED-registered brokerage. You can ask for their broker number, check the brokerage's licence, and verify recent transactions in your target community.",
      },
      {
        question: "Do I need to sign an exclusive agreement with an agent in Dubai?",
        answer:
          "Not necessarily. Buyers often work with more than one agent, though a trusted specialist with off-market access can be worth focusing on. Sellers sometimes sign exclusive listing agreements in exchange for a dedicated marketing effort.",
      },
      {
        question: "What is the best real estate agency in Dubai?",
        answer:
          "The 'best' agency depends on your needs, but the strongest choice is a RERA-registered brokerage with a verified track record in your target community, transparent fees, honest pricing advice and off-market access, rather than simply the largest name.",
      },
    ],
    relatedLinks: [
      { label: "How much does it cost to buy property in Dubai?", href: "/blog/how-much-does-it-cost-to-buy-property-in-dubai" },
      { label: "How to buy property in Dubai as a foreigner", href: "/blog/how-to-buy-property-in-dubai-as-a-foreigner" },
      { label: "How to invest in Dubai real estate", href: "/blog/how-to-invest-in-dubai-real-estate" },
      { label: "Explore Dubai communities", href: "/areas" },
    ],
    keywords: [
      "Dubai real estate agent",
      "Dubai real estate broker",
      "best real estate agents in Dubai",
      "Dubai real estate agent commission",
      "how to choose a real estate agent Dubai",
    ],
  },
  {
    slug: "can-foreigners-get-a-mortgage-in-dubai",
    title: "Can foreigners get a mortgage in Dubai? Non-resident financing explained",
    excerpt:
      "Yes, non-residents can get a Dubai mortgage, typically up to 50-60% loan-to-value, from UAE banks. Here's who qualifies, the rates, the documents and how the process works.",
    category: "Buyer Guides",
    author: EQT_TEAM,
    publishedAt: "2026-06-14",
    updatedAt: "2026-08-03",
    readingMinutes: 7,
    heroImage: {
      url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&q=80",
      alt: "Bright modern Dubai apartment interior",
      tone: "#ddd9d1",
    },
    intro:
      "Yes, foreigners and non-residents can get a mortgage in Dubai. UAE banks lend to non-residents at typically up to 50-60% loan-to-value, while residents can borrow up to 80%, so a non-resident usually needs a deposit of around 40-50% plus fees. Approval depends on your income, the bank's eligible-country list and the property itself.",
    keyTakeaways: [
      "Non-residents and foreigners can obtain mortgages from UAE banks.",
      "Non-residents borrow up to about 50-60% loan-to-value; residents up to 80%.",
      "That means a non-resident deposit of roughly 40-50%, plus the usual 6-8% buying fees.",
      "Terms run up to 25 years, with fixed and variable (EIBOR-linked) rate options.",
      "Approval hinges on income, the bank's approved-country and developer lists, and a valuation.",
    ],
    sections: [
      {
        heading: "Who qualifies and how much you can borrow",
        body: [
          "Lending limits are set by the UAE Central Bank and each bank's own policy. Residents with a UAE income can borrow the most; non-residents can still borrow, but at a lower loan-to-value and often from a shorter list of lenders.",
        ],
        bullets: [
          "Residents: up to 80% loan-to-value on a first home under AED 5 million (less above that or on a second property).",
          "Non-residents: typically up to 50-60% loan-to-value.",
          "Terms usually up to 25 years, subject to a maximum age at maturity.",
          "Lenders keep an approved-country list, so eligibility can depend on your nationality or residency.",
          "Off-plan and some developments may be financed only by certain banks.",
        ],
      },
      {
        heading: "Fixed vs variable mortgage rates",
        body: [
          "Dubai mortgages come as fixed-rate (a set rate for an introductory period, commonly one to five years) or variable-rate, which tracks the Emirates Interbank Offered Rate (EIBOR) plus a margin. After a fixed period ends, the loan usually reverts to a variable rate.",
          "Fixed rates give payment certainty in the early years; variable rates can be cheaper but move with the market. The right choice depends on your view of rates and how long you plan to hold.",
        ],
      },
      {
        heading: "The documents you'll need",
        body: [
          "Banks assess your income and existing commitments, so preparing paperwork upfront speeds up approval. Requirements are broadly similar for residents and non-residents, with non-residents sometimes asked for more.",
        ],
        bullets: [
          "Passport (and UAE visa plus Emirates ID if resident).",
          "Proof of income: recent payslips and a salary certificate, or audited accounts for the self-employed.",
          "Six to twelve months of personal and, if relevant, business bank statements.",
          "Details of existing liabilities (loans, cards) for affordability checks.",
        ],
      },
      {
        heading: "The mortgage process, step by step",
        body: [
          "The process runs alongside your purchase and typically adds a couple of weeks. A mortgage broker or your agent can coordinate lender selection to keep timelines tight.",
        ],
        bullets: [
          "1. Get a pre-approval, confirming how much the bank will lend.",
          "2. Find the property and agree terms; the bank commissions a valuation.",
          "3. Receive the final offer letter and sign the loan agreement.",
          "4. Register the mortgage at the DLD (0.25% of the loan plus a small fee).",
          "5. The bank disburses the loan at transfer, and title is issued in your name.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can a non-resident get a mortgage in Dubai?",
        answer:
          "Yes. UAE banks offer mortgages to non-residents, typically up to 50-60% loan-to-value, subject to income verification and the bank's eligible-country and approved-developer lists. Residents can usually borrow more, up to around 80%.",
      },
      {
        question: "How much deposit do I need to buy property in Dubai?",
        answer:
          "Residents typically need a deposit from around 20% of the price on a first home, while non-residents usually need around 40-50%, plus the 4% Dubai Land Department fee and other transaction costs.",
      },
      {
        question: "What are mortgage rates in Dubai?",
        answer:
          "Dubai mortgage rates vary with the market and are offered as fixed (for an introductory period) or variable rates linked to EIBOR plus a margin. Rates move over time, so compare current offers across banks rather than relying on a single figure.",
      },
      {
        question: "Can I get a mortgage on off-plan property in Dubai?",
        answer:
          "Some banks finance off-plan purchases from approved developers, though often at a lower loan-to-value and sometimes released at or near handover. Availability depends on the project and lender, so check before committing.",
      },
    ],
    relatedLinks: [
      { label: "How much does it cost to buy property in Dubai?", href: "/blog/how-much-does-it-cost-to-buy-property-in-dubai" },
      { label: "Cash vs mortgage: financing a Dubai property", href: "/blog/cash-vs-mortgage-buying-property-in-dubai" },
      { label: "Mortgage rates in Dubai explained", href: "/blog/mortgage-rates-in-dubai-explained" },
      { label: "How to buy property in Dubai as a foreigner", href: "/blog/how-to-buy-property-in-dubai-as-a-foreigner" },
    ],
    keywords: [
      "can foreigners get a mortgage in Dubai",
      "non-resident mortgage Dubai",
      "Dubai mortgage for foreigners",
      "Dubai home loan non-resident",
      "mortgage options non-residents Dubai",
    ],
  },
  {
    slug: "how-much-does-it-cost-to-buy-property-in-dubai",
    title: "How much does it cost to buy property in Dubai? (fees explained)",
    excerpt:
      "Beyond the price, budget around 6-8% of the property value in one-off costs: a 4% Dubai Land Department fee, ~2% agency commission, plus registration and mortgage fees. Here's the full breakdown.",
    category: "Buyer Guides",
    author: EQT_TEAM,
    publishedAt: "2026-08-01",
    updatedAt: "2026-08-03",
    readingMinutes: 7,
    heroImage: { url: "https://images.pexels.com/photos/5577693/pexels-photo-5577693.jpeg?auto=compress&cs=tinysrgb&w=1920", alt: "Dubai financial planning", tone: "#141821" },
    intro:
      "Beyond the purchase price, the cost of buying property in Dubai is roughly 6-8% of the property value in one-off fees. The largest is the 4% Dubai Land Department (DLD) transfer fee, followed by around 2% agency commission, plus registration, trustee and (if financing) mortgage fees. There is no annual property tax and no stamp duty beyond the DLD fee. Here is the full breakdown, including a worked example.",
    keyTakeaways: [
      "Total upfront cost is about 6-8% of the price, on top of the purchase price itself.",
      "The largest single fee is the 4% Dubai Land Department (DLD) transfer fee.",
      "Agency commission is typically 2% plus VAT; a registration trustee fee (~AED 4,000) also applies.",
      "If you use a mortgage, add roughly 1% bank arrangement, a valuation (~AED 3,000) and 0.25% mortgage registration.",
      "There is no property tax and no stamp duty beyond the DLD fee, you pay annual service charges instead.",
    ],
    sections: [
      {
        heading: "The upfront fees, line by line",
        body: [
          "These are the one-off costs you pay to complete a purchase. The buyer typically covers the DLD transfer fee, agency commission and trustee fee; the seller usually pays their own agency commission and any developer NOC charge.",
        ],
        bullets: [
          "DLD transfer fee: 4% of the purchase price (plus a small admin charge).",
          "Agency commission: about 2% of the price, plus 5% VAT on the commission.",
          "Registration trustee fee: around AED 4,000 for properties above AED 500,000, plus VAT.",
          "Title deed issuance: a few hundred dirhams.",
          "Developer NOC (No Objection Certificate): typically AED 500-5,000, usually paid by the seller.",
        ],
      },
      {
        heading: "Extra costs if you use a mortgage",
        body: [
          "Financing adds a handful of bank and registration costs. Non-residents can usually borrow up to about 50-60% loan-to-value and residents up to 80%, so the deposit is your largest single outlay.",
        ],
        bullets: [
          "Bank arrangement fee: around 1% of the loan amount.",
          "Property valuation: roughly AED 2,500-3,500.",
          "Mortgage registration at the DLD: 0.25% of the loan amount, plus a small admin fee.",
          "Life and property insurance: modest annual premiums required by most lenders.",
        ],
      },
      {
        heading: "Ongoing costs of ownership",
        body: [
          "Once you own, budget for annual running costs. The main one is the service charge, set per square foot and regulated by RERA through the Mollak system, which funds maintenance and amenities.",
          "Crucially, there is no annual property or council tax on residential real estate in Dubai, and no tax on rental income for individuals.",
        ],
        bullets: [
          "Service charges: an annual rate per square foot, varying by building and community.",
          "Utilities (DEWA): water and electricity, billed monthly.",
          "Housing fee: 5% of the property's annual rental value, applied via DEWA bills (mainly relevant to occupied homes).",
          "Property management: typically 5-10% of rent if you let the property out.",
        ],
      },
      {
        heading: "A worked example",
        body: [
          "Take a ready apartment bought for AED 2,000,000 in cash. The DLD fee is AED 80,000 (4%), agency commission is AED 40,000 (2%) plus AED 2,000 VAT, and the trustee fee is about AED 4,200.",
          "That totals roughly AED 126,000, or about 6.3% of the price. With a mortgage, add the bank, valuation and 0.25% mortgage-registration fees, pushing the all-in cost nearer 7-8%.",
        ],
      },
    ],
    faqs: [
      {
        question: "What are the total fees when buying property in Dubai?",
        answer:
          "Expect around 6-8% of the price in one-off fees: a 4% Dubai Land Department transfer fee, about 2% agency commission plus VAT, registration and trustee fees, and, if financing, mortgage arrangement, valuation and 0.25% mortgage-registration fees.",
      },
      {
        question: "How much is the Dubai Land Department fee?",
        answer:
          "The DLD transfer fee is 4% of the purchase price, plus a small administrative charge. It is the largest single transaction cost when buying property in Dubai.",
      },
      {
        question: "Do you pay stamp duty or property tax in Dubai?",
        answer:
          "There is no separate stamp duty beyond the 4% DLD transfer fee, and no annual property tax on residential real estate in Dubai. Owners pay annual service charges for maintenance instead.",
      },
      {
        question: "Who pays the agency commission in Dubai?",
        answer:
          "Typically the buyer pays around 2% commission plus VAT to their agent, and the seller pays their own agent a similar amount. This should be agreed clearly in writing before proceeding.",
      },
    ],
    relatedLinks: [
      { label: "How to invest in Dubai real estate", href: "/blog/how-to-invest-in-dubai-real-estate" },
      { label: "Can foreigners get a mortgage in Dubai?", href: "/blog/can-foreigners-get-a-mortgage-in-dubai" },
      { label: "Dubai property service charges explained", href: "/blog/dubai-property-service-charges-explained" },
      { label: "Property tax in Dubai", href: "/blog/property-tax-in-dubai" },
    ],
    keywords: [
      "cost of buying property in Dubai",
      "Dubai property fees",
      "DLD transfer fee",
      "Dubai real estate price",
      "how much to buy property Dubai",
    ],
  },
  {
    slug: "dubai-real-estate-market-outlook-2026",
    title: "Dubai real estate market outlook 2026: prices, trends & forecast",
    excerpt:
      "Dubai's market is expected to keep growing at a steadier pace in 2026, led by prime, low-supply communities. Here's the outlook on prices, transactions, rents and what's driving the market.",
    category: "Market & Data",
    author: EQT_TEAM,
    publishedAt: "2026-07-31",
    updatedAt: "2026-08-03",
    readingMinutes: 7,
    heroImage: { url: "https://images.pexels.com/photos/5577693/pexels-photo-5577693.jpeg?auto=compress&cs=tinysrgb&w=1920", alt: "Dubai skyline", tone: "#141821" },
    intro:
      "The outlook for Dubai real estate in 2026 is continued growth at a steadier, more sustainable pace than the rapid gains of previous years. Prime and low-supply communities are expected to lead on price, transaction volumes remain historically high, and rents stay firm on the back of population growth. The market is broadly moving from a sprint to a marathon.",
    keyTakeaways: [
      "The consensus is steady, moderate growth in 2026, not a boom or a crash.",
      "Prime, low-supply communities (Palm Jumeirah, Emirates Hills, Downtown) are expected to be most resilient.",
      "Higher-supply, off-plan-heavy segments may see flatter price growth.",
      "Rents are expected to hold up, keeping gross yields attractive at around 6-9%.",
      "Track the market via Dubai Land Department (DLD) data, not headlines.",
    ],
    sections: [
      {
        heading: "What's driving the 2026 market",
        body: [
          "Dubai's demand is underpinned by real, structural factors rather than speculation. Population growth, residency reforms and business migration keep adding end-users and tenants, while a cash-rich buyer base limits the leverage risk that drove past cycles.",
          "On the supply side, prime, land-constrained communities cannot easily add stock, which supports their values. Newer, mid-market districts are seeing more completions, so price growth there is likely to be more measured.",
        ],
        bullets: [
          "Population and business migration growing the tenant and buyer pool.",
          "Residency reforms, including the 10-year Golden Visa, anchoring long-term demand.",
          "A high share of cash transactions, reducing systemic leverage risk.",
          "Scarce prime supply supporting landmark communities.",
        ],
      },
      {
        heading: "Prices, rents and transactions",
        body: [
          "Expect divergence rather than a single market-wide trend. Prime areas such as Palm Jumeirah, Emirates Hills and Downtown are expected to remain resilient, while high-supply districts may see flatter growth. Rents are expected to hold up, keeping yields attractive.",
          "Transaction volumes remain historically high, a sign of genuine liquidity. For buyers, that means good stock is available but well-priced prime assets still move quickly.",
        ],
      },
      {
        heading: "What could change the picture",
        body: [
          "No forecast is guaranteed. The main variables to watch are global interest rates (which affect mortgage demand), the pace of new supply handovers, and global economic conditions that influence international buyers.",
          "Even so, Dubai's tax advantages and lifestyle appeal have proven resilient through previous global shocks, which is why long-term, end-user-led demand tends to hold.",
        ],
        bullets: [
          "Global interest rates and their effect on mortgage-financed demand.",
          "The volume and timing of off-plan handovers in specific districts.",
          "Currency and economic conditions in key source markets.",
        ],
      },
      {
        heading: "How to track the market objectively",
        body: [
          "The most reliable gauge is official data, not media headlines, which can lag or over-dramatise short-term moves. The Dubai Land Department publishes transaction data and price indices that reflect actual sales.",
          "For a specific decision, a good broker will show you real comparable transactions in your target building or community, which matters far more than a citywide average.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the forecast for Dubai real estate in 2026?",
        answer:
          "Most forecasts point to continued but more moderate growth in 2026, with prime, low-supply communities outperforming higher-supply segments, supported by population growth and residency reforms. A broad crash is not the consensus view.",
      },
      {
        question: "Will Dubai property prices go up or down in 2026?",
        answer:
          "The expectation is modest overall growth, with prime and waterfront areas most likely to rise and some high-supply, off-plan-heavy segments flatter. Outcomes vary widely by community and building, so local data matters more than citywide averages.",
      },
      {
        question: "How can I track Dubai property prices?",
        answer:
          "The most reliable sources are the Dubai Land Department's official transaction data and price indices, which reflect actual completed sales rather than asking prices or media headlines. A broker can also share comparable transactions for a specific building.",
      },
      {
        question: "Is 2026 a good time to invest in Dubai property?",
        answer:
          "For medium- to long-term investors, conditions remain attractive thanks to strong yields, tax advantages and population growth. Short-term speculators should be more selective as the market moves to a steadier pace.",
      },
    ],
    relatedLinks: [
      { label: "Is Dubai real estate going to crash? 2026 forecast", href: "/blog/is-dubai-real-estate-going-to-crash-2026" },
      { label: "Is it worth buying property in Dubai in 2026?", href: "/blog/is-it-worth-buying-property-in-dubai" },
      { label: "How to invest in Dubai real estate", href: "/blog/how-to-invest-in-dubai-real-estate" },
      { label: "Best areas to invest in Dubai for rental yield", href: "/blog/best-areas-to-invest-in-dubai-for-rental-yield" },
    ],
    keywords: [
      "Dubai real estate market",
      "Dubai real estate news",
      "Dubai real estate index",
      "Dubai property forecast 2026",
      "Dubai real estate market outlook",
    ],
  },
];

// ── Repository (the seam) ────────────────────────────────────────────────
import { heroImages } from "./mock/heroImages";
import { generatedPosts } from "./mock/posts-generated";
import { seoPosts } from "./mock/posts-seo";
import { localizePost } from "./i18n/postTranslations";
import { aeoIntros } from "./i18n/aeoIntros";

/** Hand-written posts plus the long-form generated set, one combined library. */
const allPosts: BlogPost[] = [...mockPosts, ...generatedPosts, ...seoPosts];

/** Overlay the central Pexels hero image if one exists for this post's slug. */
function withHero(post: BlogPost): BlogPost {
  const hero = heroImages[post.slug];
  return hero ? { ...post, heroImage: hero } : post;
}

/** Apply the answer-first intro rewrite (AEO) to the English base, if one exists.
 * Runs before localization; localized overlays carry their own translated intro. */
function withAeoIntro(post: BlogPost): BlogPost {
  const intro = aeoIntros[post.slug];
  return intro ? { ...post, intro } : post;
}

export async function getAllPosts(locale?: string): Promise<BlogPost[]> {
  return [...allPosts]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .map(withHero)
    .map(withAeoIntro)
    .map((p) => localizePost(p, locale));
}

export async function getPostBySlug(slug: string, locale?: string): Promise<BlogPost | null> {
  const post = allPosts.find((p) => p.slug === slug);
  return post ? localizePost(withAeoIntro(withHero(post)), locale) : null;
}

export async function getAllPostSlugs(): Promise<string[]> {
  return allPosts.map((p) => p.slug);
}

export async function getRelatedPosts(slug: string, limit = 2, locale?: string): Promise<BlogPost[]> {
  const current = allPosts.find((p) => p.slug === slug);
  return allPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => (b.category === current?.category ? 1 : 0) - (a.category === current?.category ? 1 : 0))
    .slice(0, limit)
    .map(withHero)
    .map(withAeoIntro)
    .map((p) => localizePost(p, locale));
}
