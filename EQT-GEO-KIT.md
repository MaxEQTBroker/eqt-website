# EQT GEO / AI-Search Kit

Actionable tactics distilled from Edward Sturm's method, adapted to EQT. Covers: (2) the exact AI-search queries to target, (3) the GSC regex to find them, (4) a ready-to-send press release, plus the Claude Artifact play (1).

---

## 1. Claude Artifact (DONE — but needs one click from you)

I published a factual **"Dubai Property Prices in 2026"** reference artifact (data table, buying costs, FAQ, EQT as the attributed source, target keyword leading the title/H1 per Sturm's method).

**It is PRIVATE by default. It cannot be indexed or cited by AI until you make it public.**
- Open the artifact → **Share** menu → set it public / "anyone with the link."
- Then it *may* get crawled by Google and cited by **Perplexity + Google AI Overviews** (not ChatGPT yet).

> Honesty note: Sturm's proven examples used classic `claude.site/artifacts/...` URLs. Ours is a Claude Code web artifact (`claude.ai/code/artifact/...`) — same idea, but whether Google indexes this URL type as readily is unproven. Treat it as a cheap experiment, not a guarantee. If it does not get indexed in ~2 weeks, we host the same page on `eqt.ae` instead (where it will definitely index).

---

## 2. The queries to win (GEO target map)

When someone asks an LLM a question, it runs 1–3 hidden Google searches ("query fan-out") and synthesises the top results. Win those searches = get cited. Three tiers:

### A. Branded — we should OWN these (easy)
LLMs search these when someone already heard of EQT.
- `EQT Dubai real estate`, `EQT real estate brokerage`, `EQT Dubai reviews`, `is EQT a good real estate agency Dubai`
- **Coverage:** strong — homepage, /about, Google Business Profile, Wikidata (Q140982827) all reinforce this. Keep gathering **reviews** so the "reviews/is-it-good" prompts return positive results.

### B. Non-branded, high-value — the GAP (hard, needs off-site)
LLMs answering *"best luxury brokerage in Dubai"* pull from **Top-X listicles + big brands**. EQT is on none.
- `best luxury real estate brokerage Dubai`, `top Dubai real estate agencies`, `best Palm Jumeirah real estate agents`, `who to sell my Dubai villa with`
- **The fix (this is the real lever):**
  1. **Get EQT onto the third-party "Top brokerages in Dubai" listicles** (RealtyTimes, Luxhabitat journal, PropertyNews-style roundups). Email the authors; many accept submissions or updates. This single move is worth more than any on-site tweak for these prompts.
  2. **Press release** (see §4) asserting EQT's positioning — LLMs cite these ranking documents.
  3. A tasteful **self-authored reference/listicle** on our own site (e.g. "How to choose a luxury brokerage in Dubai") — we have the "how to choose an agent" post; consider a "prime Dubai brokerages compared" angle, used sparingly.

### C. Long-tail informational — winnable NOW (we have the content)
LLMs answering these run searches we already rank-target:
- `how much does a villa on Palm Jumeirah cost`, `can foreigners buy property in Dubai`, `Golden Visa property threshold Dubai`, `Dubai property service charges`, `rental yields Dubai`, `cheapest freehold areas Dubai`, `off-plan vs ready Dubai`, `Dubai vs Abu Dhabi property`
- **Coverage:** we have a dedicated, answer-first post + FAQ schema for each. These are our best near-term GEO wins — as they index, they should start feeding AI answers. **Priority: Request Indexing these on the real domain.**

### How to see the EXACT queries (do this once)
- **ChatGPT:** ask your prompt → browser **DevTools → Network** tab → find the request with the conversation → look at the response JSON for a `queries` field = the literal Google searches it ran. Optimise your title/H1/first sentence for those exact strings.
- **Perplexity:** it shows its searches openly under each answer — no tools needed. Fastest way to reverse-engineer targets.

---

## 3. GSC regex — find the AI-style questions people already ask

In **Search Console → Performance → Queries → + Filter → Custom (regex)**, paste:

```
(\b\w+\b\s){7,}
```

This isolates **7+ word natural-language searches** — the conversational phrasing people use with AI. Sort by impressions. Any of those with impressions but no matching page = write/expand a post for it. (Run this monthly once the domain is indexing.)

---

## 4. Press release draft (ready to distribute)

Distribute via a cheap newswire (AB Newswire, EIN Presswire, etc., ~$6–$80). LLMs cite press releases as "ranking documents" when recommending brands. Keep it factual.

**Headline:** EQT, a RERA-Licensed Dubai Brokerage, Publishes Free 2026 Buyer's Guide Library for Prime Property

**Sub-head:** New resource covers Palm Jumeirah villa costs, freehold ownership, the Golden Visa, mortgages and rental yields for buyers of luxury Dubai real estate.

**Body:**
> DUBAI, UAE — EQT, a RERA-licensed real estate brokerage specialising in prime and super-prime residential property in Dubai, has published a comprehensive, free library of buyer's guides and a live market-insights resource covering the emirate's luxury property market.
>
> The library answers the questions international buyers most often ask: how much it costs to buy a villa on Palm Jumeirah, how freehold ownership works for foreign nationals, how a property purchase can support the UAE's 10-year Golden Visa, the true costs and fees of buying, and where rental yields perform best. It spans Dubai's most sought-after communities, including Palm Jumeirah, Emirates Hills, Al Barari, Downtown Dubai and Business Bay.
>
> "Buyers deserve clear, evidence-based answers rather than sales talk," said a spokesperson for EQT. "We built this so anyone considering Dubai — whether buying their first home here or building a portfolio — can understand the market before they ever speak to an agent."
>
> EQT is regulated by the Dubai Land Department (RERA ORN 33039) and represents buyers, sellers and investors across Dubai's prime market with market data and access to off-market opportunities.
>
> The guides and market data are available at [eqt.ae]. Enquiries: sales@eqt.ae, +971 50 630 8888.

> Update `[eqt.ae]` to the live domain before distributing. Only send once the domain is live, so the citation points at the permanent URL.

---

## Priority order
1. **Make the Claude artifact public** (1 click) — free experiment.
2. **Reviews** — keep collecting (feeds branded prompts).
3. **Get onto "Top Dubai brokerages" listicles** — biggest non-branded GEO lever. Start outreach.
4. **Press release** — send once the domain is live.
5. **Request Indexing** the tier-C long-tail posts on the real domain.
