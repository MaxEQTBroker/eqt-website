# EQT — Dubai Luxury Real Estate

Public marketing website for **EQT**, a Dubai luxury real estate brokerage.
Flashy, cinematic, mobile-first — and **fully readable by search engines and AI
answer engines** because all content is server-rendered as real HTML. Animation
is a progressive-enhancement layer, never the delivery mechanism.

> This repo is intentionally **separate from the CRM**. It reads placeholder data
> today through a single data-access seam, so it can later be wired to the CRM's
> `public_listings` / `public_sold` views **without touching any component**.

---

## Stack

| Concern     | Choice                                             |
| ----------- | -------------------------------------------------- |
| Framework   | Next.js (App Router) + TypeScript                  |
| Hosting     | Vercel                                             |
| Styling     | Tailwind CSS v4 + CSS-variable design tokens       |
| Animation   | GSAP + ScrollTrigger, Lenis smooth scroll, Framer Motion |
| Data        | Single `lib/data` seam (mock now → CRM later)      |

### Principles (non-negotiable)
- **Content-first / SSR-first.** Every page is a Server Component that renders
  full content + JSON-LD at build/request time. Crawlers and non-JS AI crawlers
  get complete HTML.
- **Animation is enhancement.** Reveals, parallax and smooth scroll only run
  after hydration, only when allowed. Content is never hidden for no-JS,
  reduced-motion, or crawler visits.
- **Transform/opacity only**, `prefers-reduced-motion` respected everywhere,
  heavy motion (parallax, Lenis) disabled on mobile.
- **Tokenized design.** The whole palette lives in CSS variables in
  [`app/globals.css`](app/globals.css). Swapping "dark & gold" for a warm
  "quiet luxury" palette is a one-file edit.

---

## Getting started

```bash
cp .env.example .env.local   # fill in WhatsApp number, RERA ORN, etc.
npm install
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`.

---

## Project structure

```
app/
  layout.tsx          Root shell: fonts, metadata, JSON-LD, header/footer, smooth scroll
  page.tsx            Home page (composes home sections)
  areas/  sold/  listings/  contact/   Route stubs (full pages built next)
  sitemap.ts  robots.ts                 SEO plumbing
  globals.css         ★ DESIGN TOKENS live here (swappable palette)

lib/
  site.ts             Brand facts, contact, regulatory, nav, WhatsApp link
  format.ts           AED / sq ft formatting
  data/
    types.ts          Data contract (mirrors future CRM public views)
    repository.ts     ★ THE DATA SEAM — the only file that knows the source
    mock/             Placeholder listings / sold / areas / trust signals
  seo/jsonld.tsx      Organization, RealEstateAgent, Breadcrumb, Listing/Offer, FAQ

components/
  layout/             Header, Footer, WhatsAppFab
  motion/             SmoothScroll (Lenis), Reveal, HeroMedia (GSAP) — all enhancement
  ui/                 ListingCard, SoldCard, ComingSoon
  lead/LeadForm.tsx   Multi-step, WhatsApp-first lead form
  home/               Hero, AreasStrip, ScrollNarrative, FeaturedListings,
                      SoldTeaser, TrustSignals, LeadSection
```

---

## Wiring the CRM later (the important part)

Only **`lib/data/repository.ts`** knows where data comes from. Every component
and page calls its async functions (`getFeaturedListings`, `getSoldRecords`,
`getAreaBySlug`, …). To go live:

1. Keep the function signatures and the types in `lib/data/types.ts`.
2. Replace each function body with a `fetch`/query against the CRM's
   `public_listings` / `public_sold` read-only views.
3. Delete `lib/data/mock/`.

No component changes required. Only publicly-permitted fields cross this seam —
no owner PII, no commission data.

---

## SEO / AEO foundations

- Per-page `generateMetadata` (title, description, canonical, OpenGraph/Twitter).
- JSON-LD via [`lib/seo/jsonld.tsx`](lib/seo/jsonld.tsx): `RealEstateAgent` +
  `Organization` (site-wide), `BreadcrumbList`, `RealEstateListing` + `Offer`,
  `FAQPage`, sold `ItemList`.
- Clean URLs, semantic landmarks, `app/sitemap.ts`, `app/robots.ts`.
- AEO: real indexable prose + FAQ Q&A blocks + concrete transaction proof so
  answer engines can extract facts directly.

---

## Design tokens — "Dark & Gold" (v1)

Deep charcoal/near-black surfaces + a gold accent ramp, oversized display serif
headings with wide tracking, huge whitespace, cinematic full-bleed media. All
defined as CSS variables at the top of [`app/globals.css`](app/globals.css). To
pivot to "quiet luxury" later, edit that token block only.

---

## Status

- [x] Repo scaffold, tokens, data seam, SEO/JSON-LD plumbing
- [x] Shared shell (header, footer, WhatsApp FAB, smooth scroll)
- [x] **Home page** (hero → narrative → featured → sold teaser → trust → lead form)
- [ ] Area pages (`/areas/[area]`)
- [ ] Sold portfolio (`/sold`, filterable)
- [ ] Listing detail (`/listings/[slug]`)
- [ ] Full contact page
```
