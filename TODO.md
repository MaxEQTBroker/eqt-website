# EQT master to-do

Living tracker. Split by owner. See also `BACKLINK-TRACKER.md`, `Semrush reports/`, and the reports in `google reports/`.

Legend: 🔴 needs Max (accounts / outreach / spend / decision / login) · 🟢 Claude can do on-site · 🟡 Claude builds once Max provides one input.

---

## ⭐ Semrush findings (2026-09-15) — what changed

Data from the Pro trial (27 CSVs in `Semrush reports/`). Headline: Palm + Dubai villa-community + UK-market SERPs are genuinely winnable; our only rankings today are informational blog posts; the backlink gap is mostly noise but a few real targets stand out.

**🟢 Shipped from the data (typecheck green; deploy + verify):**
- [x] **www → apex redirect** (`middleware.ts`, 308, loop-safe). Root cause of the 517 "hreflang conflicts": www.eqt.ae was serving the whole site in parallel with the apex. Also cuts the duplicate-title/meta/content counts.
- [x] **Fixed 9 area 404s** — listing→area links now fall back to `/listings?area=` when no curated area page exists (JBR, JLT, Dubai Harbour, the-valley, etc.).

**🔴 Max (from the data):**
- [ ] Set eqt.ae as **Primary Domain in Vercel** (belt-and-suspenders www→apex) + confirm no redirect loop after deploy.
- [ ] Backlink outreach targets validated by the gap report: **zawya.com, arabianbusiness.com** (already on list), plus niche Dubai RE sites **estatemagazine.ae, gulfestategazette.com, whatson.ae, toprealtors.ae, dubaidirectory.com**. DROP startbusinessuae (AS2) + gccestateleaders (AS8).

**🟢 Shipped from Phase 2 data (2026-09-15; build green, 1073→1085 pages):**
- [x] **Built 4 new community pages** — Dubai Islands, JLT, JBR, Dubai South — trilingual (EN/UK/RU), factual, freehold/connectivity facts + FAQs + related links. Auto in /areas, sitemap, hreflang. JBR + JLT also turn 2 former dead links into real pages.
- [x] **Disavow file** (`disavow-eqt.txt`, 80 toxic domains) ready for Max to upload to GSC.
- [x] Title tweaks toward money terms on Emirates Hills + Jumeirah Park (they don't rank yet — no disruption risk).

**🔴 Max (from Phase 2):**
- [ ] Upload `disavow-eqt.txt` in Search Console → Disavow Links Tool (eqt.ae property).

**🟡 Still queued:**
- [ ] UK "for sale" + price landing pages (biggest UK gap) — repackage Area Index + off-plan inventory.
- [ ] 3 RU luxury landing pages (KD 7–14): элитная недвижимость / инвестиции / купить квартиру.
- [ ] AEO capture: answer-first + FAQ schema on pages sitting next to AI Overview / PAA (district-one, selling-fees, etc.).
- [ ] Strengthen JVC / other winnable existing pages as needed.

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
