/**
 * The EQT team. Bios for the five brokers are drawn from their public profiles;
 * Vlad's and Max's are drafts to confirm/replace. Order is intentional
 * (leadership first). Adds E-E-A-T + entity signal (rendered with Person schema).
 */
export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  languages?: string;
  areas?: string;
  /** RERA Broker Registration Number, where the member holds one (real, verified). */
  brn?: string;
}

export const team: TeamMember[] = [
  {
    slug: "vladyslav-franchuk",
    name: "Vladyslav Franchuk",
    role: "Founder & CEO",
    photo: "/team/vladyslav-franchuk.jpg",
    languages: "English, Ukrainian, Russian",
    bio: "Vladyslav Franchuk is the Founder and CEO of EQT Real Estate. Vlad built EQT as a private, client-first brokerage focused on Dubai's most sought-after communities, pairing discreet, personal service with genuine market expertise. Vlad leads the firm's vision and its handpicked team of multilingual advisors, with a commitment to honest guidance and long-term relationships over transactions.",
  },
  {
    slug: "masoud-raeissi",
    name: "Masoud Raeissi",
    role: "Senior Broker",
    photo: "/team/masoud-raeissi.jpg",
    brn: "87122",
    languages: "English, Arabic, Farsi",
    areas: "Palm Jumeirah, Business Bay, Dubai Creek Harbour, Jumeirah Islands",
    bio: "Masoud Raeissi is a RERA-licensed broker (BRN 87122) with more than six years advising buyers and investors across Dubai. Multilingual in English, Arabic and Farsi among other languages, Masoud specialises in Palm Jumeirah, Business Bay, Dubai Creek Harbour and Jumeirah Islands, across both luxury and off-plan homes, building long-term relationships on trust, transparency and genuine market insight.",
  },
  {
    slug: "max-karnaukh",
    name: "Max Karnaukh",
    role: "Property Advisor",
    photo: "/team/max-karnaukh.jpg",
    languages: "English, Ukrainian, Russian",
    bio: "Max Karnaukh advises buyers, sellers and investors across Dubai's prime communities. Before Dubai, Max worked as a real estate agent in Greater Vancouver, Canada, where he ranked in the top 10 percent of agents for three consecutive years. He combines a client-first approach with sharp local market knowledge, guiding clients discreetly and personally through every stage, from the first viewing to a smooth handover.",
  },
  {
    slug: "kateryna-babenko",
    name: "Kateryna Babenko",
    role: "Senior Broker",
    photo: "/team/kateryna-babenko.jpg",
    brn: "68203",
    languages: "Ukrainian, English, Russian, Italian",
    areas: "Palm Jumeirah, JLT, Dubai Creek Harbour, JBR, Maritime City",
    bio: "Kateryna Babenko is a RERA-licensed broker (BRN 68203) with over six years in Dubai real estate and a strong record of completed transactions. Speaking Ukrainian, English, Russian and Italian, Kateryna focuses on Palm Jumeirah, Jumeirah Lake Towers, Dubai Creek Harbour, JBR and Maritime City, guiding international clients with analytical rigour and integrity.",
  },
  {
    slug: "alexandra-shukhovtseva",
    name: "Alexandra Shukhovtseva",
    role: "Broker",
    photo: "/team/alexandra-shukhovtseva.jpg",
    languages: "English, Russian",
    areas: "Business Bay, Jumeirah Lake Towers",
    bio: "Alexandra Shukhovtseva is a licensed broker with more than seven years in Dubai real estate sales and leasing. Working in English and Russian, Alexandra specialises in Business Bay and Jumeirah Lake Towers, and is known for a smooth, transparent process, treating each property decision as part of a client's wider lifestyle and long-term financial goals.",
  },
  {
    slug: "turgun-massenova",
    name: "Turgun Massenova",
    role: "Senior Broker",
    photo: "/team/turgun-massenova.jpg",
    languages: "Russian, French, Kazakh",
    areas: "Dubai Marina, JBR",
    bio: "Turgun Massenova brings more than 18 years of real estate experience to EQT. Multilingual in Russian, French and Kazakh among other languages, Turgun specialises in Dubai Marina and Jumeirah Beach Residence, guiding international clients through both home and investment purchases with clarity, consistency and a focus on long-term cooperation.",
  },
  {
    slug: "asra-baig",
    name: "Asra Baig",
    role: "Broker",
    photo: "/team/asra-baig.jpg",
    languages: "English, Hindi, Urdu",
    areas: "Downtown Dubai, Business Bay",
    bio: "Asra Baig is a RERA-licensed broker with over five years in Dubai real estate. Speaking English, Hindi and Urdu among other languages, Asra focuses on Downtown Dubai and Business Bay, and is known for transparent communication and seamless transactions from the first viewing to final handover.",
  },
];
