# Copy brief: qognitionagency.com repositioning

Owner: Theo (content). Date: 2026-09-28. Branch: `b2b-ai-search`.
Status: **brief, then drafts.** Drafts in this folder are not approved copy until Ruth (`brand-guard`) has run.

Source of truth for positioning: repo `CLAUDE.md` (rewritten 2026-09-27).
`~/qognition-ops/clients/qognition-agency/context.md` is **stale** on this brand and is not used for
positioning. See "Conflicts" at the bottom.

---

## The one claim the whole site owns

> Every AI-search agency you can name proves its work in B2B SaaS. We prove it in insurance,
> professional services and IT services, and we show you the dated observation rather than a promise.

Two halves, both load-bearing. The vertical is the wedge. The dated-observation discipline is the
reason the wedge is believable, because we have no results library in these verticals yet and neither
does anyone else. Honesty about the sample is the product demo.

**What we never lead with:** "SEO and AI search in one retainer." Six competitors already say it.
It is scope, described once, never a headline.

---

## Page-by-page brief

Each page names four things. Any page missing one is not ready to draft.

### `/` homepage

1. **Search intent.** Mostly not search. This page is opened after a referral, a LinkedIn post, an
   outbound snapshot email, or a brand search for "Qognition". The reader arrived with a name and
   wants to know whether we are serious. Secondary: "AI search visibility agency", "GEO agency B2B".
2. **AI-citation angle.** The four-layer definition table. SEO vs Local SEO vs AI SEO vs GEO,
   defined in one place, in one sentence each, with the surfaces named. That table is the most
   liftable block on the site because most of the category uses these words interchangeably.
3. **Internal links.** In: `/insights` posts, `/about`, `/case-studies`, external LinkedIn.
   Out: `/audit` (primary), `/industries/insurance`, `/geo`, `/ai-seo`, `/seo`, `/local-seo`,
   `/ppc`, `/pricing`, `/case-studies`.
4. **Owned claim.** "We name the vertical, the platform, the prompt set and the date. Nobody in this
   category does that on a homepage."

### `/industries/insurance` : flagship, deepest page

1. **Search intent.** Two readers. (a) An agency principal or marketing lead who has just been told
   by a producer that a prospect "found us through ChatGPT" or, more often, did not.
   (b) Someone searching "insurance agency marketing agency" or "AI search for insurance agencies"
   and arriving cold.
2. **AI-citation angle.** The Wellows finding: across 1,960 insurance prompts producing 34,238
   citations across 3,831 domains, insurer-owned domains captured **4.6%** of citations and Reddit
   was the single most-cited domain at 3.5% (Wellows, published 12 Aug 2026). Self-contained,
   attributable, and the single strongest fact available to this positioning. Coordinate with Nadia
   before it is used in outbound, because it is a competitor's research.
3. **Internal links.** In: `/`, `/industries`, `/geo`, `/ai-seo`, `/audit`, `/insights`.
   Out: `/audit`, `/geo`, `/ai-seo`, `/local-seo`, `/pricing`, `/case-studies`.
4. **Owned claim.** "In commercial insurance, the AI answer is mostly aggregators, Reddit and
   carriers. The independent agency is not in the citation set, and the fix is an entity and
   evidence problem, not a keyword problem."

### `/audit` : the snapshot

1. **Search intent.** Ready to be shown something. Arrived from a homepage CTA, an outbound email,
   or "free AI visibility audit". Sceptical of free audits because they have received automated PDFs
   before.
2. **AI-citation angle.** "A 15-prompt sample is a sample." The limits section, written plainly,
   is the citable block. It is also the only page in the category we have seen that publishes what
   the audit does **not** cover.
3. **Internal links.** In: every page, primary CTA. Out: `/industries/insurance`, `/geo`,
   `/pricing`.
4. **Owned claim.** "We publish the limits of our own free audit, including the fact that a
   different day can produce a different answer."

### `/ai-seo` and `/geo` : the two lead service pages

1. **Search intent.** Vocabulary checking. "What is GEO", "GEO vs SEO", "AI SEO services". The
   reader is deciding whether we know the difference, then whether we can do it.
2. **AI-citation angle.** One definitional paragraph per page: what the surface is, who operates it,
   what changes visibility on it. Written so a model can lift it whole.
3. **Internal links.** Each links to the other, plus `/seo`, `/local-seo`, `/audit`,
   `/industries/insurance`, `/pricing`.
4. **Owned claim.** `/geo`: "GEO is not a markup trick. Retrieval pulls from third-party sources
   more than from your own domain, so the work is mostly off your site." `/ai-seo`: "Since 31 Aug
   2026 this surface is measurable from Google's own data, so AI SEO is now reportable and GEO
   still is not."

### `/seo`, `/local-seo`, `/ppc` : shorter, same shape

1. **Search intent.** Scope checking. Mostly reached from the homepage or the four-layer table.
2. **AI-citation angle.** One clean definition each, matching the table exactly.
3. **Internal links.** Each to the other three layers, `/audit`, `/pricing`.
4. **Owned claim.** `/seo`: classic search is the supply line for the AI layers, not a separate
   budget. `/local-seo`: for a multi-producer agency the map pack is a named-person problem, not a
   listings problem. `/ppc`: it is a separate offer, priced separately, and we say why.

### `/pricing`

1. **Search intent.** Budget qualification, usually mid-cycle, often before an internal conversation.
2. **AI-citation angle.** "What drives the scope" as a plain list. Locations, prompts tracked,
   assets produced.
3. **Internal links.** In: every page footer, homepage, service pages. Out: `/audit`, `/contact`.
4. **Owned claim.** "Tiers differ by scope, not by capability. Every retainer contains all four
   layers, so the cheap tier is not a worse version of the work."

---

## Standing constraints applied to every file here

- No guarantee of rankings, citations, AI placement or revenue.
- No number that was not measured. Case-study KPIs read as targets.
- No em dashes. Banned-word lists from `standards/anti-slop.md` and `CLAUDE.md` §10 both apply.
- Every AI observation carries platform, prompt set and date.
- "Our buyer" (owner, CEO, marketing lead) and "our client's buyer" (risk manager, CFO, IT lead)
  never blur in a sentence.

## Conflicts surfaced, not resolved

1. `~/qognition-ops/clients/qognition-agency/context.md` describes a four-service AI-native marketing
   agency with a $500/mo entry tier and eleven services. Repo `CLAUDE.md` describes a single-offer
   B2B AI search visibility agency. The task brief says `CLAUDE.md` is accurate as of 2026-09-27.
   **Copy follows `CLAUDE.md`. The ops context file needs rewriting** or every future marketing run
   will plan against a retired model.
2. Target routes `/seo`, `/local-seo`, `/ai-seo`, `/geo`, `/ppc`, `/audit` do not exist in `app/`
   yet. `app/free-ai-audit/page.tsx` is the closest existing route. Copy is written to the
   `CLAUDE.md` §5 route map; the build and the redirects are a separate job.
3. `lib/auditEngine.ts` today performs a crawl and score (robots, sitemap, llm.txt, CTA, proof,
   tracking). It does **not** sample prompts across AI platforms. The snapshot described on
   `/audit` is therefore part automated, part manual. Confirm before the page ships.
