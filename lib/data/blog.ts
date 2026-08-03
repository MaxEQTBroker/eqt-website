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
  {
    slug: "how-to-invest-in-dubai-real-estate",
    title: "How to invest in Dubai real estate: a 2026 beginner's guide",
    excerpt:
      "To invest in Dubai real estate, buy freehold property in a designated area, budget 6–8% in fees, and choose between ready homes for rental income or off-plan for capital growth. Here's the full step-by-step.",
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
      "To invest in Dubai real estate, you buy freehold property in one of the city's designated investment areas, budget around 6–8% of the price in one-off fees, and choose your strategy: ready homes for immediate rental income, or off-plan for capital growth on a payment plan. There is no annual property tax and no tax on rental income, which is a large part of why Dubai attracts global investors.",
    sections: [
      {
        heading: "Step 1: Decide your strategy, income or growth",
        body: [
          "For rental income, buy a ready (completed) apartment or villa in a high-demand area and let it out, Dubai offers some of the strongest gross rental yields of any major city, often 6–9% for well-chosen apartments.",
          "For capital growth, buy off-plan directly from a developer on a staged payment plan, aiming to benefit from price appreciation between launch and handover. Many investors combine both.",
        ],
      },
      {
        heading: "Step 2: Choose the right area",
        body: [
          "Yield-focused investors look to communities like Jumeirah Village Circle, Business Bay and Dubai Marina. Growth and prestige buyers focus on Downtown Dubai, Palm Jumeirah, Dubai Creek Harbour and Emaar Beachfront.",
          "The right area depends on your budget, target tenant and time horizon. A good broker matches these to specific buildings rather than just communities.",
        ],
      },
      {
        heading: "Step 3: Budget for the true cost",
        body: [
          "Alongside the price, budget roughly 6–8%: a 4% Dubai Land Department transfer fee, about 2% agency commission, plus registration and, if financing, mortgage fees.",
          "Non-residents can obtain a mortgage from UAE banks, typically up to 50–60% loan-to-value, so cash-rich buyers or those financing abroad often move fastest.",
        ],
      },
      {
        heading: "Step 4: Buy, register and (optionally) get residency",
        body: [
          "Sign the sale agreement, pay the deposit, obtain the developer NOC, and transfer title at the Dubai Land Department. Your name goes on the title deed.",
          "Invest AED 2 million or more and you can also qualify for a 10-year Golden Visa, adding a residency benefit to the financial return.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much money do I need to invest in Dubai real estate?",
        answer:
          "You can enter the Dubai market from around AED 700,000 for a studio or one-bedroom apartment in a value community like JVC, plus 6–8% in fees. Prime areas and villas require significantly more.",
      },
      {
        question: "Is Dubai real estate a good investment in 2026?",
        answer:
          "Dubai combines high rental yields, no annual property or rental income tax, a growing population and residency incentives such as the Golden Visa, which continue to make it one of the most attractive real estate markets globally for investors.",
      },
      {
        question: "Can foreigners invest in Dubai real estate?",
        answer:
          "Yes. Foreign nationals can invest in and fully own property in Dubai's designated freehold areas, with title registered at the Dubai Land Department and no requirement for a local partner.",
      },
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
    slug: "why-invest-in-dubai-real-estate",
    title: "Why invest in Dubai real estate? 10 reasons in 2026",
    excerpt:
      "Investors choose Dubai for tax-free rental income, high yields, a stable dirham, residency visas, world-class infrastructure and strong population growth. Here are the ten reasons that matter most.",
    category: "Investment",
    author: EQT_TEAM,
    publishedAt: "2026-07-24",
    updatedAt: "2026-08-03",
    readingMinutes: 6,
    heroImage: {
      url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80",
      alt: "Dubai waterfront community viewed from above at dusk",
      tone: "#12212b",
    },
    intro:
      "Investors choose Dubai real estate for a rare combination: no annual property tax and no tax on rental income, some of the highest rental yields of any global city, a currency pegged to the US dollar, and residency visas tied to property ownership. Add world-class infrastructure, safety and a fast-growing population, and the case becomes clear.",
    sections: [
      {
        heading: "The financial reasons",
        body: [
          "1. No annual property tax and no tax on rental income. 2. Gross rental yields often between 6% and 9%, well above London, New York or Singapore. 3. A dirham pegged to the US dollar, removing currency risk for dollar-based investors.",
          "4. Transparent, regulated transactions through the Dubai Land Department and RERA, with buyer funds protected in escrow on off-plan purchases.",
        ],
      },
      {
        heading: "The lifestyle and residency reasons",
        body: [
          "5. A 10-year Golden Visa for investments of AED 2 million or more. 6. World-class schools, healthcare, dining and connectivity. 7. One of the safest major cities in the world, with very low crime.",
          "8. Year-round sunshine and a genuinely international community. 9. A strategic time zone and airport connecting Europe, Asia and Africa. 10. Sustained population and economic growth driving long-term housing demand.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why is Dubai real estate booming?",
        answer:
          "Dubai real estate is driven by strong population growth, investor-friendly tax rules, residency visas linked to property, and continued global demand for a safe, well-connected base, all of which support both prices and rental demand.",
      },
      {
        question: "Is rental income taxed in Dubai?",
        answer:
          "No. There is no tax on rental income for individuals in Dubai, and no annual property tax, which is a major reason investors favour the market for cash-flow returns.",
      },
    ],
    keywords: [
      "why invest in Dubai real estate",
      "why Dubai real estate is booming",
      "benefits of Dubai property investment",
      "Dubai real estate tax free",
    ],
  },
  {
    slug: "is-dubai-real-estate-going-to-crash-2026",
    title: "Is Dubai real estate going to crash? 2026 market forecast",
    excerpt:
      "Most analysts do not forecast a Dubai property crash in 2026, but expect the market to move from rapid growth to a more balanced, sustainable pace. Here's what the data and fundamentals actually show.",
    category: "Market & Data",
    author: EQT_TEAM,
    publishedAt: "2026-07-18",
    updatedAt: "2026-08-03",
    readingMinutes: 7,
    heroImage: {
      url: "https://images.unsplash.com/photo-1512699355324-f07e3106dae5?w=1920&q=80",
      alt: "Dubai skyline at dusk with illuminated towers",
      tone: "#161822",
    },
    intro:
      "Most analysts do not forecast a Dubai real estate crash in 2026. After several years of strong growth, the consensus view is a shift toward a more balanced, sustainable market, with prices in prime areas holding firm while some segments cool. Today's market is underpinned by cash buyers, population growth and tighter regulation, a very different picture from the debt-fuelled cycle that preceded the 2009 correction.",
    sections: [
      {
        heading: "Why this cycle is different from 2009",
        body: [
          "The 2009 downturn followed heavy speculation and easy mortgage leverage. Today, a large share of transactions are cash, mortgage lending is more conservative, and off-plan payments are protected in RERA-regulated escrow accounts.",
          "Supply is also more measured, and population growth, driven by residency reforms and business migration, continues to absorb new homes.",
        ],
      },
      {
        heading: "What to expect instead of a crash",
        body: [
          "Expect divergence: prime and waterfront communities with limited supply (Palm Jumeirah, Emirates Hills, Downtown) tend to be more resilient, while some high-supply, off-plan-heavy segments may see slower growth or minor price adjustments.",
          "For long-term buyers and end-users, short-term fluctuations matter far less than location, build quality and holding power.",
        ],
      },
      {
        heading: "How to invest wisely in any market",
        body: [
          "Focus on scarce, well-located assets, buy from reputable developers, and avoid over-leveraging. Prime, low-supply communities have historically protected value best through cycles.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will Dubai property prices drop in 2026?",
        answer:
          "Most forecasts expect Dubai's market to stabilise rather than drop sharply in 2026, with prime, low-supply areas holding value while some high-supply segments may cool. A broad crash is not the consensus scenario.",
      },
      {
        question: "Is Dubai real estate a bubble?",
        answer:
          "Today's market is supported by cash buyers, conservative lending, escrow-protected off-plan payments and real population growth, which is structurally different from the leverage-driven conditions that caused the 2009 correction.",
      },
      {
        question: "What is the forecast for Dubai real estate over the next 5 years?",
        answer:
          "Long-term forecasts generally point to continued, more moderate growth driven by population increase, residency reforms and limited prime supply, with prime communities expected to outperform higher-supply segments.",
      },
    ],
    keywords: [
      "will Dubai real estate crash",
      "Dubai real estate crash 2026",
      "Dubai property prices falling",
      "Dubai real estate bubble",
      "Dubai property forecast",
    ],
  },
  {
    slug: "is-it-worth-buying-property-in-dubai",
    title: "Is it worth buying property in Dubai in 2026?",
    excerpt:
      "For many buyers, yes, Dubai offers tax-free rental income, high yields, residency options and strong lifestyle value. But it depends on your goals and time horizon. Here's an honest breakdown.",
    category: "Buyer Guides",
    author: EQT_TEAM,
    publishedAt: "2026-07-12",
    updatedAt: "2026-08-03",
    readingMinutes: 6,
    heroImage: {
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1920&q=80",
      alt: "Downtown Dubai skyline with the Burj Khalifa at night",
      tone: "#151721",
    },
    intro:
      "For many buyers, it is worth buying property in Dubai in 2026, provided you buy for the medium to long term. The combination of tax-free rental income, strong yields, no annual property tax, residency visas and high lifestyle quality makes a compelling case. Whether it's right for you comes down to your goals, budget and how long you plan to hold.",
    sections: [
      {
        heading: "When buying in Dubai makes sense",
        body: [
          "If you want rental income, a Golden Visa, a lifestyle base, or exposure to a growing, tax-efficient market and can hold for at least three to five years, buying is usually worthwhile.",
          "End-users often find that owning costs little more than renting over time, while building equity in an appreciating asset.",
        ],
      },
      {
        heading: "The honest disadvantages to weigh",
        body: [
          "Service charges apply annually and vary by building, off-plan carries developer and completion risk, and short-term flipping is riskier as the market normalises.",
          "As with any market, buying the wrong unit in an oversupplied segment can underperform, which is why community and building selection matters more than timing.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is it a good time to invest in Dubai real estate now?",
        answer:
          "For medium- to long-term buyers, current conditions remain attractive thanks to strong yields, tax advantages and population growth. Short-term speculators should be more selective as the market moves to a steadier pace.",
      },
      {
        question: "What are the disadvantages of buying property in Dubai?",
        answer:
          "The main considerations are annual service charges, off-plan completion risk, and the need to choose the right building and community carefully, since some high-supply segments appreciate more slowly.",
      },
    ],
    keywords: [
      "is it worth buying property in Dubai",
      "is it worth buying real estate in Dubai",
      "good time to invest in Dubai property",
      "should I buy property in Dubai",
    ],
  },
  {
    slug: "best-areas-to-invest-in-dubai-for-rental-yield",
    title: "Best areas to invest in Dubai for rental yield (2026)",
    excerpt:
      "For rental yield, investors favour Jumeirah Village Circle, Business Bay, Dubai Marina and Dubai Creek Harbour, where gross yields often reach 6–9%. Here's where the numbers work best.",
    category: "Investment",
    author: EQT_TEAM,
    publishedAt: "2026-07-06",
    updatedAt: "2026-08-03",
    readingMinutes: 6,
    heroImage: {
      url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1920&q=80",
      alt: "Contemporary Dubai apartment interior with city views",
      tone: "#d8d6d0",
    },
    intro:
      "For rental yield, investors in Dubai typically favour Jumeirah Village Circle (JVC), Business Bay, Dubai Marina and Dubai Creek Harbour, where gross rental yields often range from 6% to 9%, among the highest of any major global city. The best area for you depends on budget, tenant demand and whether you prioritise yield or capital growth.",
    sections: [
      {
        heading: "Highest-yield communities",
        body: [
          "Jumeirah Village Circle (JVC) offers accessible entry prices and strong tenant demand, frequently producing the highest gross yields in the city. Business Bay and Dubai Marina combine solid yields with central, walkable locations that keep occupancy high.",
          "Dubai Creek Harbour, as a growing Emaar waterfront district, appeals to investors wanting both income and long-term capital growth.",
        ],
      },
      {
        heading: "Balancing yield with growth",
        body: [
          "Prime areas like Downtown Dubai and Palm Jumeirah usually show lower gross yields but stronger capital appreciation and liquidity. Many investors blend a yield asset with a growth asset.",
          "Whatever the area, the specific building, floor and layout drive the actual return, which is where local advice pays for itself.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which area in Dubai has the highest rental yield?",
        answer:
          "Value communities such as Jumeirah Village Circle (JVC) typically offer the highest gross rental yields in Dubai, often around 7–9%, supported by accessible prices and consistent tenant demand.",
      },
      {
        question: "What rental yield can I expect in Dubai?",
        answer:
          "Gross rental yields in Dubai commonly range from about 6% to 9% for well-chosen apartments, higher than most global cities, though net yields depend on service charges and vacancy.",
      },
    ],
    keywords: [
      "best areas to invest in Dubai",
      "Dubai rental yield",
      "highest rental yield Dubai",
      "where to invest in Dubai real estate",
      "Dubai buy to let",
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
    readingMinutes: 6,
    heroImage: {
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
      alt: "Elegant Dubai residence interior for a private consultation",
      tone: "#ddd9d1",
    },
    intro:
      "To choose a real estate agent in Dubai, look for a RERA-registered broker with a verified track record, genuine expertise in your target community, and transparent fees, the standard agency commission is around 2% of the purchase price. The right agent protects your interests, gives honest pricing advice, and often has access to off-market opportunities.",
    sections: [
      {
        heading: "What to check before you commit",
        body: [
          "Confirm the agent holds a valid RERA broker card and works for a licensed brokerage. Ask for recent, verifiable transactions in the community you're targeting, generalists rarely price a niche market correctly.",
          "A good agent should be comfortable telling you when a property is overpriced or the wrong fit, not just closing a deal.",
        ],
      },
      {
        heading: "Understanding commission and costs",
        body: [
          "The standard buyer's agency commission in Dubai is about 2% of the price, plus the 4% Dubai Land Department transfer fee and registration costs. Sellers typically also pay around 2%.",
          "Be wary of anyone promising results with no clear fee structure, transparency is a hallmark of a trustworthy brokerage.",
        ],
      },
    ],
    faqs: [
      {
        question: "What commission do real estate agents charge in Dubai?",
        answer:
          "The standard real estate agency commission in Dubai is around 2% of the property price for the buyer's side, in addition to the 4% Dubai Land Department transfer fee and registration costs.",
      },
      {
        question: "How do I know if a Dubai real estate agent is legitimate?",
        answer:
          "A legitimate Dubai agent holds a valid RERA broker card and works for a licensed, DED-registered brokerage. You can ask for their broker number and verify recent transactions in your target community.",
      },
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
    slug: "off-plan-vs-ready-property-in-dubai",
    title: "Off-plan vs ready property in Dubai: which is better?",
    excerpt:
      "Off-plan offers lower entry prices, payment plans and capital growth potential; ready property gives immediate rental income and no completion risk. The right choice depends on your goal. Here's the comparison.",
    category: "Buyer Guides",
    author: EQT_TEAM,
    publishedAt: "2026-06-20",
    updatedAt: "2026-08-03",
    readingMinutes: 6,
    heroImage: {
      url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1920&q=80",
      alt: "Modern Dubai villa with pool at dusk",
      tone: "#dcdad3",
    },
    intro:
      "Off-plan property in Dubai is bought from a developer before completion, offering lower entry prices, staged payment plans and capital-growth potential, while ready (completed) property provides immediate rental income and no completion risk. Which is better depends entirely on your goal: growth and flexibility, or income and certainty.",
    sections: [
      {
        heading: "When off-plan wins",
        body: [
          "Off-plan suits investors seeking capital growth and easier cash flow: you pay in instalments during construction, often at below-market launch prices, and buyer funds are protected in RERA-regulated escrow accounts.",
          "The trade-offs are completion risk and no rental income until handover, so developer reputation matters.",
        ],
      },
      {
        heading: "When ready property wins",
        body: [
          "Ready property suits investors who want immediate rental income and certainty, you can see the exact unit, finish and views, and start earning from day one.",
          "Prices are typically higher than launch-stage off-plan, but there's no construction risk and financing is more straightforward.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is off-plan property in Dubai safe?",
        answer:
          "Off-plan purchases in Dubai are regulated by RERA, with buyer payments held in project-specific escrow accounts released to developers against construction milestones, which significantly reduces risk when buying from a reputable developer.",
      },
      {
        question: "Is it better to buy off-plan or ready property in Dubai?",
        answer:
          "Off-plan is generally better for capital growth and payment flexibility, while ready property is better for immediate rental income and certainty. Many investors hold both to balance growth and cash flow.",
      },
    ],
    keywords: [
      "off-plan vs ready property Dubai",
      "off-plan property Dubai",
      "buying off-plan in Dubai",
      "ready property Dubai",
    ],
  },
  {
    slug: "can-foreigners-get-a-mortgage-in-dubai",
    title: "Can foreigners get a mortgage in Dubai? Non-resident financing explained",
    excerpt:
      "Yes, non-residents can get a Dubai mortgage, typically up to 50–60% loan-to-value, from UAE banks. Here's who qualifies, the rates, the documents and how the process works.",
    category: "Buyer Guides",
    author: EQT_TEAM,
    publishedAt: "2026-06-14",
    updatedAt: "2026-08-03",
    readingMinutes: 6,
    heroImage: {
      url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&q=80",
      alt: "Bright modern Dubai apartment interior",
      tone: "#ddd9d1",
    },
    intro:
      "Yes, foreigners and non-residents can get a mortgage in Dubai. UAE banks lend to non-residents at typically up to 50–60% loan-to-value (residents can borrow up to 80%), meaning a non-resident usually needs a deposit of around 40–50% plus fees. Approval depends on income, the bank's country list and the property itself.",
    sections: [
      {
        heading: "Who qualifies and how much you can borrow",
        body: [
          "Residents with a UAE salary can typically borrow up to 80% loan-to-value on a first home. Non-residents are generally capped nearer 50–60%, and lenders often maintain a list of eligible home countries and approved developers.",
          "Mortgage terms usually run up to 25 years, subject to age limits, with both fixed and variable rate options available.",
        ],
      },
      {
        heading: "The documents and process",
        body: [
          "Expect to provide passport, proof of income (payslips or audited accounts for the self-employed), bank statements and, for non-residents, sometimes a larger deposit and a credit check.",
          "The bank issues a pre-approval, values the property, then releases the loan at transfer. A broker can coordinate lender selection alongside the purchase to keep timelines tight.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can a non-resident get a mortgage in Dubai?",
        answer:
          "Yes. UAE banks offer mortgages to non-residents, typically up to 50–60% loan-to-value, subject to income verification and the bank's eligible-country and approved-developer lists. Residents can usually borrow more, up to around 80%.",
      },
      {
        question: "How much deposit do I need to buy property in Dubai?",
        answer:
          "Residents typically need a deposit from around 20% of the price on a first home, while non-residents usually need around 40–50%, plus the 4% Dubai Land Department fee and other transaction costs.",
      },
    ],
    keywords: [
      "can foreigners get a mortgage in Dubai",
      "non-resident mortgage Dubai",
      "Dubai mortgage for foreigners",
      "Dubai home loan non-resident",
      "mortgage options non-residents Dubai",
    ],
  },
];

// ── Repository (the seam) ────────────────────────────────────────────────
import { heroImages } from "./mock/heroImages";

/** Overlay the central Pexels hero image if one exists for this post's slug. */
function withHero(post: BlogPost): BlogPost {
  const hero = heroImages[post.slug];
  return hero ? { ...post, heroImage: hero } : post;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return [...mockPosts]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .map(withHero);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = mockPosts.find((p) => p.slug === slug);
  return post ? withHero(post) : null;
}

export async function getAllPostSlugs(): Promise<string[]> {
  return mockPosts.map((p) => p.slug);
}

export async function getRelatedPosts(slug: string, limit = 2): Promise<BlogPost[]> {
  const current = mockPosts.find((p) => p.slug === slug);
  return mockPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => (b.category === current?.category ? 1 : 0) - (a.category === current?.category ? 1 : 0))
    .slice(0, limit)
    .map(withHero);
}
