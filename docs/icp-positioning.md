# Positioning & ICP rules — qognitionagency.com

Locked v2.0 · 29 Sep 2026. Claude Code can read everything in `docs/icp/` but cannot edit it. To change the ICP, edit these files by hand and bump `version` in `docs/icp/icp-taxonomy.json`.

## What the site sells
- Qognition is an **AI SEO / GEO and PPC agency for high-ticket B2B firms**.
- AI SEO / GEO means getting the client cited and recommended in ChatGPT, Gemini, Perplexity and Google AI Overviews. PPC means paid search that brings in qualified B2B pipeline.
- The client is a B2B firm that can pay **$3,000–$20,000 per month** on a retainer and stays for years.
- In-house engines that can be named as proof: LinkersPro (authority and link acquisition), Scriblr (AI citation and GEO tracking), M.A.R.S. (lead routing, outreach and booking attribution).

## Hard rules
1. **Only the 21 industries in INDEX.md.** No page, copy, example, FAQ, schema or case-study framing for an industry, sub-industry, niche or sub-niche that is not in `docs/icp/icp-taxonomy.json`.
2. **The buyer is always the B2B firm.** "Restaurant tech" is the software company, never a restaurant. "Home services franchisors" is the franchisor recruiting franchisees, never a homeowner.
3. **Pricing starts at $3,000/month.** Published range is $3,000–$20,000/month. Never show, mention or build a plan below $3,000.
4. **No consumer targeting.** No residential services, personal-injury or family law, consumer clinics, DTC brands or retail stores as clients.
5. **Local/city pages are legacy.** Don't add new city or local-business programmatic pages. Don't expand the existing ones, and don't delete, redirect or noindex them without explicit sign-off (ranking risk).
6. **Slugs and IDs come from `icp-taxonomy.json`.** Never invent or rename them. Follow the repo's existing routes; if there is no industry route yet, ask before creating one.
7. **Overlaps:** build under the canonical ID listed at the bottom of INDEX.md; the duplicate only links to it.
8. **Build order:** priority-A niches first. Lead each page with its `fit`: AI SEO → citation and comparison angle; PPC → paid-search angle; Both → both.
9. **Before writing about an industry, read `docs/icp/industries/<NN-slug>.md`** and use its buyer titles, client value, AI prompts and PPC keywords.
10. **Never fabricate.** No invented client names, logos, results, metrics, testimonials, reviews or case studies. Leave a clearly marked TODO and ask.
11. **Voice:** plain, specific, written like a senior B2B marketer talking to a CMO. Banned: unlock, elevate, leverage, seamless, cutting-edge, game-changer, revolutionize, supercharge, "in today's fast-paced world".
12. **Conflicts:** if a request conflicts with this file (a new industry, a sub-$3k plan, a consumer vertical), stop and ask before doing anything.
13. Never remove the two import lines from CLAUDE.md.

## Markets (priority order)
USA > Canada > Australia > UK > Netherlands > Germany > Sweden > Denmark > Norway > Finland > Switzerland > UAE, plus Singapore and Ireland. Prices in USD.

## Field definitions
- **Priority A** — their client contracts ≥ $50k/yr or projects ≥ $100k, firms commonly $10M+ revenue; $5k–$20k/mo is realistic.
- **Priority B** — solid fit, $3k–$8k/mo typical.
- **Priority C** — fits, but thinner budgets, low search demand or long cycles; opportunistic only.
- **Fit** — `AI SEO` (research-led buying, high-value prompts), `PPC` (clear commercial search demand), `Both`.
- **Affordability floor** — ~$3M+ revenue for $3k/mo, $10M+ for ~$8k/mo, $25M+ for $15–20k/mo.

## Counts (v2.0)
21 industries · 341 sub-industries · 2,376 niches · 8,823 sub-niches (2,371 unique niches). The original brief's 15 industries, 114 sub-industries, 280 niches and 6 sub-niches are all kept.
