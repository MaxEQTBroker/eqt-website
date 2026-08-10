# Marketing-Site Blueprint & Replication Guide

**Purpose:** everything needed to rebuild the EQT site for a *new* brand — **High Point GPS** (a reseller of **GoTab**, the hospitality commerce / POS platform) — keeping the exact architecture, SEO/GEO, lead-gen, animations and rules, swapping only the content, palette and integrations.

> **Golden rule:** *Structure and system stay; content and brand change.* Every place that would need editing for a new brand is called out below.

---

## 1. Philosophy (why it's built this way)

- **SSR/SSG-first.** Every page renders real HTML on the server so crawlers and AI answer-engines get full content with zero JS. Animations are **progressive enhancement only** — never required to see content.
- **One data seam.** All content flows through a single repository module. Pages never know whether data is mock, from a CMS, or from a CRM. Swap the source in one file.
- **Tokens, not hard-coded styles.** The entire look is CSS variables in one block — reskin the whole site by editing that block.
- **No secrets in the repo.** API keys live in env vars / shell only. The build works with zero env vars (safe fallbacks), so a missing key never breaks a deploy.
- **Leads are never lost.** Every form posts to our API → CRM, and *also* falls back to WhatsApp even if the CRM is down.

---

## 2. Tech stack (exact)

| Thing | Choice |
|---|---|
| Framework | **Next.js 15** (App Router, RSC) — `^15.1.6` |
| Language | **TypeScript** `^5.7.3` (`tsc --noEmit` in CI) |
| React | `^19` |
| Styling | **Tailwind CSS v4** (`@tailwindcss/postcss`) with CSS-variable theme |
| Smooth scroll | **Lenis** `^1.1.18` |
| Component animation | **Framer Motion** `^11` (used sparingly, e.g. multi-step form) |
| Extra motion | **GSAP** `^3.12` (available; used lightly) |
| Hosting | **Vercel** (GitHub auto-deploy) |
| Fonts | `next/font/google` — a serif *display* + a sans *body* |

`package.json` scripts: `dev`, `build`, `start`, `lint`, `typecheck`.

---

## 3. Project structure

```
app/
  layout.tsx            # fonts, <Header>, <Footer>, WhatsApp FAB, Analytics, JSON-LD, metadataBase
  page.tsx              # home
  globals.css           # ALL design tokens + base styles
  sitemap.ts            # dynamic sitemap (static + all entity routes)
  robots.ts             # (or in metadata) index/follow
  <entity>/page.tsx           # list pages (e.g. /listings, /areas, /developers)
  <entity>/[slug]/page.tsx    # detail pages (SSG via generateStaticParams + ISR)
  api/lead/route.ts           # POST → forwards lead to CRM webhook
  api/<x>-status/route.ts     # diagnostics (env wiring checks)
components/
  layout/    Header.tsx, Footer.tsx, WhatsAppFab.tsx
  lead/      LeadForm.tsx (multi-step), ValuationForm.tsx (single-step magnet)
  motion/    Reveal.tsx (scroll-reveal), SmoothScroll.tsx (Lenis)
  ui/        Cards (ListingCard, SoldCard, …)
  <feature>/ FilterBar components, etc.
  analytics/ Analytics.tsx (gtag loader)
lib/
  site.ts              # brand name, nav, contact, socials, regulatory, whatsappLink()
  data/
    types.ts           # all content interfaces
    repository.ts      # THE SEAM — every getX()/queryX(); env-driven CRM fetch + mock fallback
    mock/              # seed/demo content + image maps
  seo/jsonld.tsx       # all JSON-LD components
  analytics.ts         # trackLead() → gtag generate_lead
  leads/               # postLead() + LeadPayload type
  images.ts            # crmPhoto() image-CDN helper
```

---

## 4. Design system — the token block

Everything visual is CSS variables in **one block at the top of `app/globals.css`**. Reskinning = editing only this block. Structure:

```css
:root {
  /* Surfaces (canvas + alternating sections + inputs + hairline) */
  --bg-base; --bg-elevated; --bg-inset; --line;
  /* Accent (400 light / 500 base / 600 dark) */
  --accent-400; --accent-500; --accent-600;
  /* Text (primary / secondary / tertiary / on-accent) */
  --text-primary; --text-secondary; --text-tertiary; --text-on-accent;
  /* Motion */  --ease-lux: cubic-bezier(0.22,1,0.36,1); --dur-fast:240ms; --dur:600ms; --dur-slow:1200ms;
  /* Radius */  --radius-sm/md/lg;
  /* Layout */  --content-max:1600px; --section-py: clamp(52px,6vw,112px);
}
@theme inline { /* maps vars → Tailwind utilities: bg-base, text-accent-500, text-ink, font-display… */ }
```

**Rules baked in:**
- **Master fluid scale** on `html`: `font-size: clamp(16px, 14.4px + 0.34vw, 21px)` — every rem-based size grows together on big monitors.
- `body { overflow-x: clip }` — **not `hidden`** (hidden turns body into a scroll container and *breaks `position: sticky`*). This was a real bug; keep `clip`.
- `* { border-color: var(--line) }`, `::selection`, `:focus-visible` outline all from tokens.

**For High Point GPS:** pick a GoTab-adjacent palette (GoTab brand is teal/near-black on light). Replace the 12 color vars — done. Keep the motion/radius/layout vars.

**EQT palette reference (to replace):** warm beige canvas `#e3dbc8`, espresso text `#282017`, bronze accent `#7a6a4d`. History note in the file shows prior palettes lived as git-swappable blocks — same approach.

---

## 5. Typography

- Two Google fonts via `next/font/google` with CSS-var output: a **serif display** (`--font-display`, used for h1–h3 + `.display-*` classes) and a **sans body** (`--font-body`).
- Headings inherit color (don't hard-code) so Tailwind `text-*` utilities can still win over them.
- Fluid heading sizes via `clamp()` (e.g. `clamp(2rem,5vw,4rem)`).

**For GPS:** a modern geometric sans for display + clean sans body reads more "tech/SaaS" than serif. Swap the two `next/font` imports; everything else follows.

---

## 6. Animation system

Four layers, all **enhancement-only**:

1. **Scroll reveal — `components/motion/Reveal.tsx`.**
   - Server renders children *fully visible*. A tiny inline script in `layout.tsx` sets `data-reveal-ready` **before paint**, but only when JS is on AND `prefers-reduced-motion` is not set — that's what activates the `.reveal{opacity:0}` hide rule. So crawlers, no-JS, and reduced-motion users **never** get hidden content and there's no flash.
   - `IntersectionObserver` adds `is-visible` when in view. Supports `delay`, `as`, `className`. Stagger with `delay={(i%3)*90}`.
2. **Smooth scroll — `components/motion/SmoothScroll.tsx` (Lenis).** Disabled on mobile and reduced-motion. **Gotcha:** Lenis eats wheel events — any internal scroll container (modals, dropdown lists) must have `data-lenis-prevent` or it won't scroll.
3. **Framer Motion** for stateful UI transitions (e.g. the multi-step form's `AnimatePresence` slide between steps). Respect `useReducedMotion()`.
4. **CSS transitions** for hover/state, all timed with `var(--ease-lux)` and `--dur*`. Common patterns: image `group-hover:scale-105` inside `overflow-hidden`, hairline borders that warm to accent on hover, arrow links `group-hover:translate-x-0.5`.

**Sticky patterns:** left-rail lead form uses `lg:sticky lg:top-24 lg:self-start` inside a `grid lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start`. Requires `overflow-x: clip` (not hidden) on body to work.

**Overlays that must sit above everything** (e.g. the community picker) are rendered via **React portal to `document.body`** with a very high z-index — otherwise ancestor stacking contexts (sticky/`transform`) paint content over them.

---

## 7. Content model & the data seam (the most important pattern)

**`lib/data/repository.ts` is the ONLY file that knows where content comes from.** Every page calls `getX()` / `queryX()` from here. Internally each getter does:

```ts
async function fetchFromCRM(): Promise<T[] | null> {
  const url = process.env.CRM_X_URL;
  if (!url) return null;                      // not configured → caller uses mock
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    next: { revalidate: 300 },                // ISR: refresh every 5 min
  });
  if (!res.ok) return [];                      // configured but erroring → empty (not mock)
  return (await res.json()).map(normalize);    // map raw → strict typed shape
}
export async function getX() {
  return (await fetchFromCRM()) ?? mockX;      // null=mock, []=genuinely empty
}
```

**Rules:** `null` = "not wired, show demo"; `[]` = "wired, genuinely empty". Normalizers are defensive (`String(r.x ?? "")`, accept `images` as `string[]` or `{url,alt}[]`). Mock data lives in `lib/data/mock/` so the site is fully browseable before any backend exists.

**EQT entities → map to High Point GPS / GoTab:**

| EQT | High Point GPS (GoTab reseller) |
|---|---|
| Areas (neighborhoods) `/areas/[slug]` | **Industries** `/industries/[slug]` — restaurants, bars, breweries, hotels, stadiums, food halls, golf/venues |
| Property types `/property/[type]` | **Solutions** `/solutions/[slug]` — POS, Online Ordering & QR, Handhelds, KDS, Kiosks, Payments, Reservations |
| Developers `/developers/[slug]` | **Products / Hardware** or **Integrations** `/products/[slug]` |
| Listings `/listings` | **Product catalog / packages** (optional) |
| Sold track record `/sold` | **Case studies / customer success** `/customers/[slug]` |
| Blog `/blog` | **Resources / Blog** `/blog` |
| Team `/team` | **About / Team** |
| Valuation lead magnet | **"Book a demo" / "Get a custom quote"** magnet |

Same page skeletons (hero + sticky lead rail + editorial sections + FAQ + related), new nouns.

---

## 8. Page types & routing

- **List page** (`/entity/page.tsx`): hero, filter bar (dropdown GET form), paginated grid (9/page), empty-state CTA.
- **Detail page** (`/entity/[slug]/page.tsx`): `generateStaticParams()` for SSG + ISR; hero; **sticky left lead rail** + right content column (intro, key facts, sections, gallery, FAQ); JSON-LD; breadcrumb; closing CTA that anchors back to `#enquire`.
- **Pagination**: `PER_PAGE=9`, `?page=n`, numbered links that **preserve all active filters** via a `hrefFor(p)` builder.
- **Filters**: a `<form method="get">` of `<select>`s (community/type/beds/size/price → your equivalents) with **Apply/Reset** — works with zero JS, produces shareable URLs.

---

## 9. SEO playbook

- `metadataBase: new URL(site.url)` in `layout.tsx`; title `template` + `default`.
- **Every page exports `metadata` / `generateMetadata`** with unique `title`, `description`, `keywords`, and **`alternates.canonical`** (filtered/paginated views keep a clean canonical to avoid dupes).
- `openGraph` + `twitter` cards; `robots: { index, follow, googleBot: { "max-image-preview":"large" } }`.
- **`app/sitemap.ts`** builds URLs for every static route + every entity slug (areas/developers/types/listings/posts/sold). Add your entities here.
- **JSON-LD** (`lib/seo/jsonld.tsx`) — components emitting `<script type="application/ld+json">`:
  `OrganizationJsonLd` (RealEstateAgent → change to `Organization`/`LocalBusiness`), `BreadcrumbJsonLd`, `FaqJsonLd` (FAQPage), `ArticleJsonLd` (BlogPosting), plus entity/collection/person graphs. **Reuse the pattern, change `@type` + fields** (for GPS: `Organization`, `Product`/`SoftwareApplication` for solutions, `FAQPage`, `BreadcrumbList`, `Article`, `Person`).
- Semantic HTML, real `<a>` links, alt text on every image, `<main id="main">`.

---

## 10. GEO / AEO playbook (getting cited by AI answer engines)

- **Answer-shaped content:** every entity page has a real **FAQ block mirrored in `FAQPage` JSON-LD** — this is what ChatGPT/Perplexity/Gemini quote. Write Q&As in natural language.
- **Entity consistency (NAP):** brand name, address, phone, socials identical everywhere (`lib/site.ts` is the single source) + in `Organization` JSON-LD `sameAs`.
- **Bing Webmaster Tools** = the feed behind **ChatGPT/Copilot**. Verify via env-driven meta tag `NEXT_PUBLIC_BING_SITE_VERIFICATION` → `<meta name="msvalidate.01">`. Fastest: "Import from Google Search Console."
- **GA4 "AI Traffic" channel group** to measure AI referrals: Admin → Data display → Channel groups → new group, rule **Source matches regex** `chatgpt|perplexity|gemini|copilot|claude`.
- SSR (not client-rendered) so answer engines see full text; fast, image-light pages.

---

## 11. Lead-generation system

**Client components:** `components/lead/LeadForm.tsx` (multi-step) and `ValuationForm.tsx` (single-step magnet).

Multi-step flow (adapt the questions to GPS):
- Step 1 **intent** → EQT: Buy/Sell/Invest/Relocate. **GPS: e.g. New POS / Switching / Add Online Ordering / Multi-location.**
- Branching steps (community, budget, timeframe) → **GPS: business type, # locations, # terminals, go-live timeframe.**
- **Auto-advance on selection**; final step = name + contact.
- **Honeypot** hidden field (bots fill it → drop). **WhatsApp fallback** built from the answers.
- On submit: **fire the analytics conversion FIRST** (`trackLead()` → `gtag('event','generate_lead')`) *before* the network call so it's captured even on slow networks, then `postLead()`.

**Pipeline:**
```
LeadForm → postLead(payload)                       // lib/leads/submit.ts, never throws → {ok}
         → POST /api/lead (app/api/lead/route.ts)  // server route
         → fetch CRM_LEAD_WEBHOOK_URL              // Bearer auth, server-side only
```
- `/api/lead` **GET** returns a diagnostic `{ ok, webhookConfigured, apiKeyConfigured }` — handy to verify wiring without exposing secrets.
- Placed on **every lead-capturing page** as a sticky left rail; also a dedicated magnet page (`/valuation` → GPS `/book-a-demo` or `/quote`).

---

## 12. Backend / CRM integration contract

Env-driven, mock-fallback (see §7). Three feeds + one intake:

| Purpose | Env vars | Notes |
|---|---|---|
| **Lead intake** | `CRM_LEAD_WEBHOOK_URL`, `CRM_LEAD_API_KEY`, `CRM_LEAD_AUTH_HEADER` (default `Authorization`), `CRM_LEAD_AUTH_SCHEME` (default `Bearer`) | POST JSON lead; server-side only |
| **Catalog feed** (listings) | `CRM_LISTINGS_URL`, `CRM_LISTINGS_TOKEN` | GET Bearer; returns array or `{listings:[…]}` |
| **Track record** (sold) | `CRM_SOLD_URL`, `CRM_SOLD_TOKEN` | same shape family |

**Feed item shape** (normalizer is defensive; send what you can): `slug, reference, title, area/category, areaLabel, type, status, priceAed|priceLabel, bedrooms/qty, areaSqft, summary, description, highlights[], images[] (string or {url,alt}), permitNumber, featured, updatedAt`. For GPS these become product/solution fields (name, category, blurb, features[], images[], etc.).

**Diagnostics pattern:** add `app/api/<feed>-status/route.ts` returning `{ urlConfigured, tokenConfigured, crmStatus, count }` so you can confirm env wiring on the live deploy instantly (env changes require a **redeploy** to take effect).

> The EQT CRM is custom + Supabase-backed and also (a) creates client+deal on inbound leads, (b) pings Telegram, (c) serves the listings/sold feeds, (d) surfaces website analytics. **High Point GPS uses a different CRM** — keep the same *contract* (URLs + Bearer + JSON shapes) and point the env vars at the GPS CRM's endpoints.

---

## 13. Images — where they come from & the rules

**Stock/editorial imagery → Pexels API (free).**
- Get a key: <https://www.pexels.com/api/> (also Unsplash: <https://unsplash.com/developers>).
- **Key is used in the shell/env only — never committed.**
- URL pattern used directly (no SDK needed):
  `https://images.pexels.com/photos/{ID}/pexels-photo-{ID}.jpeg?auto=compress&cs=tinysrgb&w=1920`
- Curate a fixed map of image IDs per section in `lib/data/mock/` (deterministic picker keeps layouts stable). **Verify each ID returns 200** — old Pixabay-style IDs 404.
- **`next.config.ts` must allowlist every image host** in `images.remotePatterns`:
  `images.pexels.com`, `images.unsplash.com`, your CMS/CRM host, `**.supabase.co`, etc. An un-allowlisted host → the optimizer returns **400** and the image renders blank.

**Backend/product photos → image CDN transform (`lib/images.ts` `crmPhoto()`).**
- If photos live in **Supabase Storage**, route `…/object/public/…` through `…/render/image/public/…?width=&quality=` to **convert colorspace + resize on the CDN** (fixes huge originals; serve with `unoptimized` since already transformed).
- **CMYK gotcha (learned the hard way):** CMYK JPEGs decode to near-black in *every* standard optimizer (Next/sharp, Supabase imgproxy, weserv). There is **no site-side fix** — the source must be re-exported as **sRGB, 3-channel** (`convert src.jpg -colorspace sRGB -strip out.jpg`). Bake sRGB into the upload pipeline.

---

## 14. Analytics & verification

- **GA4 via `gtag.js`** — `components/analytics/Analytics.tsx` loads it from `NEXT_PUBLIC_GA_ID` (with a hard-coded fallback ID during dev). Mounted in `layout.tsx <body>`.
- **Conversion event:** `lib/analytics.ts` `trackLead()` fires `gtag('event','generate_lead',{source,intent})` + pushes to `dataLayer`. In GA4: **Admin → Data display → Events → New key event → `generate_lead`** (mark it a key event/conversion). It only appears after it fires once — submit a test lead, check **Realtime**.
- **Google Search Console:** verify via `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` → `verification.google` in metadata (HTML-tag method). Submit `…/sitemap.xml`.
- **Bing:** `NEXT_PUBLIC_BING_SITE_VERIFICATION` → `other:{ "msvalidate.01": … }`. Import from GSC = no code.
- **AI Traffic channel group** — see §10.

---

## 15. Environment variables — full reference

```bash
# Public site
NEXT_PUBLIC_SITE_URL="https://highpointgps.com"
NEXT_PUBLIC_WHATSAPP_NUMBER="1XXXXXXXXXX"        # intl, no + or spaces
NEXT_PUBLIC_CONTACT_EMAIL="sales@highpointgps.com"
NEXT_PUBLIC_CONTACT_PHONE="+1 ..."
# (EQT-only regulatory vars — drop for GPS: NEXT_PUBLIC_RERA_ORN, NEXT_PUBLIC_DED_LICENSE)

# CRM lead intake (server-side; site still works + WhatsApp-falls-back if unset)
CRM_LEAD_WEBHOOK_URL=""; CRM_LEAD_API_KEY=""
CRM_LEAD_AUTH_HEADER="Authorization"; CRM_LEAD_AUTH_SCHEME="Bearer"

# CRM feeds (server-side)
CRM_LISTINGS_URL=""; CRM_LISTINGS_TOKEN=""
CRM_SOLD_URL="";     CRM_SOLD_TOKEN=""

# Verification & analytics (public)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=""
NEXT_PUBLIC_BING_SITE_VERIFICATION=""
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```
Ship a committed **`.env.example`** documenting each. **Never commit real values.** Non-`NEXT_PUBLIC_` vars are server-only.

---

## 16. Deployment

- **GitHub → Vercel auto-deploy on push to `main`.** Build needs **no env vars** (safe fallbacks), so a fresh clone builds green.
- `.gitignore`: `/videos/` masters, `.next`, `.env*`, `.vercel`; **do** track compressed runtime assets (`public/images`, small `public/videos`, `public/brand`).
- **Env-var changes don't apply until a redeploy** — after adding keys in Vercel, redeploy (or push an empty commit `git commit --allow-empty`).
- **Pitfall seen on EQT:** the Vercel *CLI* on a free auto-generated account produced `UNKNOWN`/`[0ms]` builds — **prefer Git integration, don't spam CLI deploys**; confirm you're looking at the right project's alias; turn off Deployment Protection if you need a public preview.
- Pre-push gate: `npx tsc --noEmit && npm run build`.

---

## 17. High Point GPS content-adaptation checklist

1. **`lib/site.ts`** — name "High Point GPS", nav (Home, Solutions, Industries, Products, Customers, Resources, About, Book a Demo), contact, socials, tagline. Drop RERA/DED.
2. **`globals.css` token block** — GoTab-adjacent palette (teal/near-black on light), keep motion/layout vars.
3. **Fonts** — swap to a SaaS-style geometric sans display + clean body.
4. **`lib/data/types.ts` + `mock/`** — rename entities (Areas→Industries, Property→Solutions, Sold→Customers…), write seed content: 6–8 Solutions, 6–10 Industries, 8–15 case studies, 20–40 blog posts (see EQT blog pipeline: subagents → strict JSON → generator).
5. **Routes** — rename folders to match; wire new slugs into `sitemap.ts`.
6. **JSON-LD** — `Organization`/`LocalBusiness`, `Product`/`SoftwareApplication` per solution, `FAQPage`, `Article`, `Person`.
7. **Lead form** — GoTab-relevant intents/branches ("Book a demo", business type, # locations/terminals, timeframe); source attribution `solution:`/`industry:`.
8. **Images** — Pexels IDs for hospitality/tech scenes; product/hardware shots from GoTab assets (allowlist that host).
9. **Integrations** — point `CRM_*` env vars at the GPS CRM; set GA4, GSC, Bing for the new domain.
10. **Copy for GEO** — FAQ blocks answering "best POS for breweries", "GoTab reseller near me", "GoTab vs Toast", etc.

---

## 18. Non-negotiable rules (the checklist)

- [ ] Content renders server-side; animations never gate content (reduced-motion + no-JS safe).
- [ ] All data via `repository.ts`; pages never fetch a backend directly.
- [ ] Look changes only via the token block; no hard-coded colors in components.
- [ ] Every page: unique title/description + `canonical`; entity pages have FAQ + JSON-LD.
- [ ] Every image host allowlisted in `next.config.ts`; alt text everywhere; store product photos as **sRGB**.
- [ ] Forms: honeypot + WhatsApp fallback + `generate_lead` fired before the network call.
- [ ] Secrets only in env; build works with none; `.env.example` committed.
- [ ] `body { overflow-x: clip }`; internal scrollers get `data-lenis-prevent`; overlays portal to body.
- [ ] Green `tsc --noEmit` + `next build` before every push; deploy via Git, redeploy after env changes.

---
*Generated from the EQT build. Keep this file with the new repo as `WEBSITE-BLUEPRINT.md`.*
