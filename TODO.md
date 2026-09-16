# EQT master to-do

Living tracker. Split by owner. See also `BACKLINK-TRACKER.md`, `Semrush reports/`, and the reports in `google reports/`.

Legend: 🔴 needs Max (accounts / outreach / spend / decision / login) · 🟢 Claude can do on-site · 🟡 Claude builds once Max provides one input.

---

## ⭐ Semrush findings (2026-09-15) — what changed

Data from the Pro trial (27 CSVs in `Semrush reports/`). Headline: Palm + Dubai villa-community + UK-market SERPs are genuinely winnable; our only rankings today are informational blog posts; the backlink gap is mostly noise but a few real targets stand out.

**🟢 Shipped from the data (typecheck green; deploy + verify):**
- [x] **www → apex redirect** (`middleware.ts`, 308, loop-safe). Root cause of the 517 "hreflang conflicts": www.eqt.ae was serving the whole site in parallel with the apex. Also cuts the duplicate-title/meta/content counts.
- [x] **Fixed 9 area 404s** — listing→area links now fall back to `/listings?area=` when no curated area page exists (JBR, JLT, Dubai Harbour, the-valley, etc.).

**🟢 Shipped from Phase 2 data (2026-09-15; all deployed, build green 1073→1085 pages):**
- [x] **Built 4 new community pages** — Dubai Islands, JLT, JBR, Dubai South — trilingual (EN/UK/RU), factual, freehold/connectivity facts + FAQs + related links. Auto in /areas, sitemap, hreflang. JBR + JLT also turn 2 former dead links into real pages.
- [x] **Internal-linking pass** — cross-linked the 4 new pages from 5 established areas (Emaar Beachfront, Dubai Marina, Dubai Creek Harbour, Bluewaters, DAMAC Hills) so they gain incoming topical authority.
- [x] **Disavow uploaded** — `disavow-eqt.txt` (80 toxic domains) live in GSC as of 15 Sep 2026. Google reprocessing over the coming weeks.
- [x] Title tweaks toward money terms on Emirates Hills + Jumeirah Park.

**⭐ KEY FINDING (2026-09-15): the site is content-complete. The lever is now OFF-SITE.**
Investigating the "gaps" showed the pages already exist — all 6 "for sale" property pages (`/property/villas`…), the crypto guide, the price guides, residency-by-buying, golden-visa, investment, luxury posts (177+ posts total). The Semrush gaps were about **rankings, not missing content**: we have the pages, we lack the **authority** to rank them. Building more posts = duplicates that dilute what's there. **On-site content work has hit diminishing returns; backlinks + reviews are now the whole game.**

**✅ AREA COVERAGE STATUS (checked against all 86 reports, 2026-09-16): gaps CLOSED.**
39 area pages live. Of the 25 communities Semrush analysed, 23 have pages; the 4 real gaps are now built (Dubai Islands, JLT, JBR, Dubai South). Only **Mira** (~4.4k total vol) and **The Views** (~1.3k) have no page — deliberately skipped as too small (fold into a Greens/Emirates Living hub later if ever). **Deliberately NOT built** (off boutique-luxury brand or thin-page risk): granular sub-communities (Springs 11, Meadows 7, Arabian Ranches sub-clusters) and budget/mid-market areas competitors farm for traffic (International City, Mirdif, Oud Metha, Al Karama, Town Square, Mudon). Building those chases volume against our positioning — optional, not recommended.
**Bottom line: no meaningful area page is missing. We are not ranking because of AUTHORITY, not coverage. More area pages will not fix rankings — backlinks will.**

**🔴 Max — the growth lever now (do these):**
- [x] ~~Upload disavow file~~ (done 15 Sep).
- [ ] Set eqt.ae as **Primary Domain in Vercel** (belt-and-suspenders www→apex) + confirm no loop.
- [ ] **Backlinks** — validated targets: **zawya.com, arabianbusiness.com** + niche Dubai RE sites **estatemagazine.ae, gulfestategazette.com, whatson.ae, toprealtors.ae, dubaidirectory.com** + recurring competitor ref-domains **propertyfinder, entrepreneur, hidubai, timeoutdubai, gulfbusiness, expat.com, internations, inman, citybiz**. DROP startbusinessuae (AS2) + gccestateleaders (AS8).
- [ ] **Reviews** — still the #1 ongoing lever (see below).

**🟢 Backlink assets (progress — full status in `BACKLINK-TRACKER.md`):**
- [x] Directory NAP block + A-list directories worked (hidubai, Crunchbase live; Apple/The Org/toprealtors/dubaidirectory in review).
- [x] Journalist platforms set up (Qwoted, Connectively, SoS live; Featured is AI-chat only).
- [x] **Press release DRAFTED** — `marketing/press-release-eqt-palm-2026-09.md` (factual, no invented figures). NEXT: 🔴 Max publishes via EIN Presswire (~$50-100) using the Chrome prompt; confirm the eqt.ae link is dofollow.
- [ ] Bylined columns (Gulf News, Forbes ME, AGBI) — 🟢 I draft next.
- [ ] Guest articles (The Arabian Post, architecture/legal/expat sites) — 🟢 I draft.
- [ ] Weekly journalist answers — 🟢 I draft as queries arrive.
- [ ] Data-led press release — blocked until `DUBAI_MARKET` index is populated with real DLD figures (🔴 Max sources them).

**🟡 On-site, only if a specific ranking need appears (NOT net-new content — everything exists):**
- [ ] AEO tweaks: answer-first + FAQ schema on pages beside an AI Overview / PAA (district-one, selling-fees) to capture the feature.
- [ ] Strengthen JVC (rare winnable head term) if desired.
- [ ] Off-plan project pages + quarterly market report PDF — bigger builds, need Max's data-source / numbers sign-off.

---

## ⭐ SEO audit follow-ups (2026-09-16, from "EQT real estate report")

Third-party homepage audit (grade B). It confirmed the thesis: On-Page A, GEO B+, **Links F** (authority is the bottleneck). Technical/schema/hreflang all green.

**🟢 Shipped autonomously (build green, deploying):**
- [x] Homepage title lengthened → "EQT | Palm Jumeirah & Prime Dubai Luxury Real Estate" (was 29 chars).
- [x] Optimized the two oversized logo PNGs (emaar-crop 110KB→10KB, MAF-crop 79KB→10KB) + recompressed the video poster.
- [x] Added a trilingual homepage FAQ (5 Q&A + FAQPage schema) — fixes the "no Q&A / thin content" flags + AEO.

**🔴 Max — needs DNS / account access:**
- [ ] **SPF + DMARC DNS records** ⚠️ PRIORITY before the outreach push — stops @eqt.ae email hitting spam (Khaleej Times already bounced). Claude can supply the exact record values to paste.
- [ ] **Google Business Profile — add the address** (currently missing; real local-SEO gap).
- [ ] Reviews (again) — audit shows 1; still the #1 lever.

---

## 🔴 Max

### Growth / off-page (highest leverage: reviews + press)
- [ ] **Reviews** — only 2 now. Target +3-5/month, some in RU/UK, reply to all. Blocks trust-wall, star schema, "best Palm broker" AI answers.
- [ ] **Press follow-ups** — bump the 8 Tier-1 Gulf pitches already sent. Send from @eqt.ae, not Gmail.
- [ ] **Forbes Global Properties** — chase the unclaimed Dubai slot.
- [ ] **Journalist platforms** — Qwoted, Connectively, Featured, Source of Sources (answer weekly).
- [ ] Reddit / Quora / forums presence + LinkedIn articles (named experts).
- [ ] Referral partners; paid: Google/Meta ads, Property Finder / Bayut featured listings, YouTube tours.
- [ ] **Speed-to-lead** — reply to Telegram leads within minutes.

### Tools & accounts (unblock Claude)
- [ ] Microsoft Clarity project ID (code wired, waiting on ID)
- [ ] OpenSEO OAuth / API key
- [ ] FreeSOV + Semrush accounts

### Entity / directories
- [ ] Wikidata Q140982827 — website (P856), inception, founder, description
- [ ] Directories: Apple Maps / finish Apple Business Connect · Foursquare · HERE WeGo · TomTom · Navmii · decide Dubai Chambers (paid) · Trustpilot
- [ ] GBP: Palm description EN/RU/UK, Services/Products, 5-10 Q&A, weekly posts, real photos

### Search / analytics logins
- [ ] GSC: verify eqt.ae, submit sitemap, Change of Address from old Vercel property
- [ ] Bing: verify + sitemap (unblocks IndexNow 403)
- [ ] GA4: mark `generate_lead` a key event; add AI-traffic channel group
- [ ] Vercel: confirm plan; re-enable image optimization if Pro; finish www->apex
- [ ] Turn on `NEXT_PUBLIC_REVIEW_RATING`/`_COUNT` once reviews > ~5
- [ ] Cookie-consent decision (GA4 + Clarity fire unconditionally now)

---

## 🟢 Claude (on-site)

- [x] Binghatti dev-page refresh + "Binghatti projects 2026" post
- [x] Dubailand explainer/hub post
- [x] AEO rollout — answer-line on all area/property/developer pages; FAQs present; ready-vs-off-plan comparison
- [x] Palm cluster — renting-on-palm, Palm vs Bluewaters, investment 2026 (more per-frond deep-dives still possible)
- [x] Richer Palm/Market Index — median tile, price-by-bedroom, sales-by-year + YoY
- [x] Ranking-cluster GSC posts (broker-vs-advisor #30 gap; deepened France relocation)
- [x] CTAs + trust signals on top Palm posts
- [x] Hyper-specific landing pages: Palm sub-community set (Signature Villas, Garden Homes, Fronds, Apartments) + budget-band pages /buy/[band] (under-5m, 5-15m, 15-30m, 30m+). DEFERRED: per-building (needs building-level data/photos — avoids thin/doorway pages)
- [x] DAMAC Hills 2 / Lagoons real hyperlinks (Area.relatedLinks)
- [x] Image sitemap + Video sitemap (/video-sitemap.xml)
- [x] Monthly post refresh (updatedAt bumped on 9 edited posts)
- [x] Deferred a11y — form-field border >=3:1 (--field-border)
- [x] Save this list as a live TODO.md tracker

---

## 🟡 Claude builds once Max provides one input

- [x] **Valuation tool** (submit -> price *range*) — BUILT on EQT's own sold comps (perSqft p25/median/p75 x size, >=4 comps). DLD open data can enrich later once Max supplies a Dubai Pulse OAuth key (or CSV).
- [ ] Quarterly Palm/Prime Market Report PDF (needs sign-off on numbers)
- [ ] Off-plan project pages (~300 to start) — confirm data feed
- [ ] "EQT Dubai Prime Index" recurring proprietary data
- [ ] "EQT by the numbers" proof block — needs Max's real figures (AED volume, deals, awards)
- [ ] Trust wall (real reviews + sold gallery + license + languages) — needs reviews
- [ ] Gated lead magnets (Palm Index PDF, off-market listings) — needs the data/PDF
- [ ] Swap remaining stock imagery — Max approved Pexels; most imagery is already stock, low priority

---

## Decisions / notes
- **dubaidirectory.com** (2026-09-16): the free plan gives no link to eqt.ae — only the $99/yr Starter unlocks it. Recommendation: **skip the $99**. It's AS 27; that money is far better spent on a newswire press release, which guarantees higher-authority dofollow links.
