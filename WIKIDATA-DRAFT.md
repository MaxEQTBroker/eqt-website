# EQT — Wikidata entity draft (for you to submit)

Creating a Wikidata item helps Google's Knowledge Graph and AI answer engines recognise EQT as a real entity. Submit at <https://www.wikidata.org/wiki/Special:NewItem> (needs a free account). Keep every value identical to the website's `Organization` JSON-LD and Google Business Profile — consistency is the whole point.

> ⚠️ Notability: Wikidata prefers entities with third-party coverage. Adding a couple of independent references (a press mention, a directory listing, the DED licence record) before/at submission reduces deletion risk. If it's removed, it's low-cost to re-create once you have press coverage.

## Label / description / aliases
- **Label (en):** EQT
- **Description (en):** Real estate brokerage in Dubai, United Arab Emirates
- **Also known as (aliases):** EQT Real Estate; EQT Real Estate Brokerage LLC; EQT Dubai

## Statements (Property → Value)
- **instance of (P31):** real estate company (**Q1660104** — verified)
- **industry (P452):** real estate industry (**Q1660132** — verified)
- **country (P17):** United Arab Emirates (**Q878** — verified)
- **headquarters location (P159):** Dubai (**Q612** — verified)
- **located in the administrative territorial entity (P131):** Dubai (**Q612** — verified)
- **official website (P856):** https://eqt-website-ten.vercel.app  *(update to https://www.eqt.ae once the domain is live)*
- **inception (P571):** 2014
- **legal form (P1454):** OPTIONAL / skip — no clean generic "LLC" item exists on Wikidata (matches are country-specific, none for the UAE). If you want it, use "private limited company" (Q17376040, the generic parent). Otherwise omit; the legal name already states "…LLC".
- **industry regulator / regulated by:** Dubai Land Department (DLD) / RERA (add as qualifier or note)
- **Instagram username (P2003):** dubaieqt
- **phone number (P1329):** +971 50 630 8888
- **email address (P968):** sales@eqt.ae

## Identifiers / official references
- **RERA ORN:** 33039
- **DED trade licence:** 1123882
- **Address:** OPUS Tower, Business Bay, Tower A, 11th Floor, Office 22, Dubai, UAE

## sameAs links to add (these mirror the site's JSON-LD `sameAs`)
- https://www.instagram.com/dubaieqt/
- (Google Business Profile URL — add once claimed)
- (Property Finder broker profile URL)
- (LinkedIn company page, if created)

## To do before submitting
1. Fill in **2014**.
2. Claim **Google Business Profile** and paste its URL into `sameAs` (site + Wikidata).
3. Gather **2+ independent references** (press, directory, licence record) for notability.
4. After the domain goes live, update **official website (P856)** to the eqt.ae URL.
