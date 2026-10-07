# Plain-English copy · service pages and industry template

**Author:** Theo (content) · 2026-10-07
**Status:** DRAFT. Ruth gates, then Mira builds the layout. No `.tsx` or `data/*.ts` edited. Nothing committed.
**Operator brief:** the homepage is fine. The other pages look thin, and "not too much technical mumbo jumbo, everything messaging needs to be clear."
**Supersedes, for visible copy only:** `services-seo.md`, `services-ai-seo.md`, `services-geo.md`, `services-local-seo.md`, `services-ppc.md` and the shared strings in `services-template.md`. Those files stay as the record of the objection codes and decisions (D5, D8, HOLD, N1). Everything decided there still holds unless this file says otherwise.
**Voice benchmark:** `components/home/*.tsx` as built. Short sentences, one idea each, the reader addressed as "you".

---

## 0. Brief

1. **Search intent.** A CEO, founder or marketing lead at a B2B firm lands from a Google result, an ad or the homepage. They want to know in under a minute: do you do this, is it for firms like mine, and can I trust you.
2. **AI-citation angle.** Each page keeps one self-contained line a model can lift: the §1 layer definition, verbatim, plus one plain sentence on what the work is.
3. **Internal links.** No URL changes. In and out links are listed per page. Nadia owns anchor text; plain labels below are proposals.
4. **The one claim this pass owns.** Every page says what we do in words a buyer would use, and says what we won't promise.

**No new keyword targeting.** Titles, metas, H1s and URLs on the 18 priority pages are fixed (`memory/priority-pages-keywords.md`). This is a clarity rewrite.

### 0.1 Rules applied on every page

- **Their words stay, our words go.** A cybersecurity CMO knows SOC 2, EDR and ARR. They do not need "entity optimisation" or "query fan-out". Client-industry vocabulary stays. Our trade jargon is replaced or cut (section 1).
- **The four layers are quoted exactly as `CLAUDE.md` §1.** Plain explanation goes beside the definition, never instead of it.
- **No guarantees. No unsourced numbers.** No "we'll get you cited". The verbs are "work on", "test", "fix", "report".
- **Two buttons only:** `Book a call` (primary), `Send an enquiry` (secondary). See decision D1 for the free audit link.
- **No em dashes.** None in this file either.
- **"Qualified enquiry"** is defined once per page, in the report block: an enquiry from a firm you would actually sell to.

### 0.2 Route check: the brief's URLs do not exist

The brief names `/seo`, `/local-seo`, `/ai-seo`, `/geo` and `/ppc`. There are no such routes in `app/` and no redirects for them in `next.config.mjs`. The live pages are:

| Brief said | Real URL | Template | H1 |
|---|---|---|---|
| `/seo` | `/services/seo` | `app/services/[service]/page.tsx` | **Fixed:** "Enterprise and B2B SEO Services" |
| `/local-seo` | `/services/seo/local-seo` | `app/services/[service]/[subService]/page.tsx` | "Local SEO for B2B Companies" (kept) |
| `/ai-seo` | `/services/ai-seo` | `app/services/[service]/page.tsx` | **Fixed:** "AI SEO and GEO Services for B2B" |
| `/geo` | `/services/ai-seo/generative-engine-optimization` | `[subService]` | "Generative Engine Optimization (GEO) for B2B Firms" (kept) |
| `/ppc` | `/services/ppc` | `app/services/[service]/page.tsx` | **Fixed:** "B2B PPC and Paid Media Management" |

Because the `/services/ai-seo` H1 names both AI SEO and GEO, that page sells both. The GEO sub-page goes deeper on the assistants only, so the two pages stay distinct.

`lib/b2b/graph.ts` `SERVICE_LINKS` links to the four non-existent short URLs from every industry page. See flag F2.

---

## 1. Jargon list

Every technical term currently rendered on these pages, from `data/services.ts` (seo, ai-seo, ppc), the two custom sub-pages in `data/seoExpansion.ts`, the shared template, `components/b2b/blocks.tsx`, `IcpBlocks.tsx` and `ObservationBlock.tsx`. Action is the plain replacement, a one-clause explanation, or **cut**.

### 1.1 Search basics

| Term | Where now | Plain version |
|---|---|---|
| crawl, crawlability | SEO fullDescription, Technical SEO card | "whether Google can find your pages" |
| index, indexable, "Indexable priority pages" | SEO fullDescription, SEO KPIs | "whether Google has stored the page" · KPI becomes "Key pages Google has stored" |
| status codes, canonicals, rendering, sitemaps | SEO deep-dive 1 | **cut.** Say "technical fixes" |
| JavaScript rendering | Technical SEO card | **cut** |
| Core Web Vitals | Technical SEO card | "page speed" |
| crawl budget | SEO FAQ (large sites) | **cut** |
| schema, schema markup, structured data | SEO card, AI SEO deep-dive 1, AI SEO FAQ, GEO deliverables | "labels in your page code that tell Google what the page is" · on main pages, **cut** and fold into "technical fixes" |
| entity, entity coverage, entity clarity, entity optimisation | SEO On-Page card, AI SEO cards, GEO subService, `/services` grid | "making sure Google and AI tools know exactly who you are: one name, one description, the same facts everywhere" |
| Knowledge Graph, "Entity & Knowledge Graph" | AI SEO card name, tech stack | "Google's record of facts about your company" · card label becomes "Consistent company facts" |
| "your name resolves to you" | GEO intro, homepage FourLayers | "AI tools connect your name to your company, not a similarly named one" |
| E-E-A-T, "trust architecture" | SEO card name and description | "showing who stands behind the work: named authors, real credentials, client evidence" |
| authority, authority signals, authority assets | SEO fullDescription, Off-Page and Link Building cards | "other trusted sites mentioning and linking to you" |
| backlinks, "risk-controlled backlink acquisition" | Link Building card | "links from other sites" · "risk-controlled" **cut** |
| Digital PR | Off-Page, Link Building | "getting covered in trade press" |
| hreflang | International SEO card | "showing the right page for each country and language" |
| programmatic SEO | SEO card | "pages at scale" (sub-page label only) |
| information gain | Content Optimization card | "something the reader can't get elsewhere" |
| topic clusters, internal link systems | Content Strategy card | "groups of related pages that link to each other" |
| "Forensic ... audits" | SEO Audits card | "a full check of your site" · "forensic" **cut** |
| redirect mapping, parity checks | Site Migration card | "moving a site without losing what already ranks" |
| keyword research, buyer-intent mapping | SEO card | "finding the searches your buyers make before they enquire" |
| commercial pages | SEO fullDescription | "service pages" |

### 1.2 AI search

| Term | Where now | Plain version |
|---|---|---|
| AI Overviews | everywhere | keep the name. Explain once: "the AI summaries at the top of some Google results" |
| AI Mode | everywhere | keep the name. Explain once: "Google's chat-style search" |
| GEO, generative engine optimization | AI SEO page, GEO page | keep (it is a layer name and a fixed H1). Explain with §1: "the work on assistants: ChatGPT, Perplexity, Gemini, Claude and Copilot" |
| AEO, answer engine optimization | AI SEO subService name | "answers Google's AI can quote" · acronym kept only in the sub-page label |
| LLM, LLM optimization | AI SEO subService | "AI tools such as ChatGPT" |
| llms.txt | AI SEO FAQ | **cut** from the question. FAQ becomes "Is there a quick technical fix?" |
| prompt, prompt set | AI SEO and GEO process, KPIs, homepage | "the questions your buyers ask AI" · keep "prompt" once per page, in the report block, because the report itself uses the word |
| baseline, dated baseline | process steps | "a dated starting point" |
| run, re-run, observation, observed | process, KPIs, ObservationBlock | "test", "re-test", "what the AI tool said on that date" |
| platform | throughout | "AI tool" or name the tool |
| mention | KPIs | "named": the answer says your firm's name |
| citation, cited, cited sources | KPIs, FAQ, homepage | "linked as a source": the answer links to a page it used |
| citation share, mention rate, share of voice | case-study KPI labels, `/insights` | "how often you are named, compared with competitors" · not used on these pages |
| query fan-out | `CLAUDE.md` §1 (Scriblr), not on these pages | if ever needed: "the extra searches an AI tool runs behind one question" · otherwise **cut** |
| answer-ready pages, answer-first | AI SEO and GEO cards, `/services/ai-seo` meta | "pages that answer the buyer's question in the first few lines" |
| retrieve, retrieval, extract and attribute, extractable | AEO card, homepage FourLayers, code comments | "pick up and quote" |
| passage-level clarity | homepage FourLayers | homepage is approved, left alone. Do not reuse on these pages |
| source map, source category | GEO deliverables, AI SEO KPI | "a list of the sites AI answers rely on" · "grouped by type of site" |
| referral visits | AI SEO and GEO | "visits that come from AI tools" |
| surface (as a noun) | layer table header, `ServiceLinksBlock` eyebrow "The four surfaces" | "where it shows up" (decision D2) |

### 1.3 Measurement and sales

| Term | Where now | Plain version |
|---|---|---|
| qualified enquiry | throughout | keep, define once: "an enquiry from a firm you would actually sell to" |
| "Qualified enquiry share" | PPC KPI | "Share of enquiries your sales team rated as a fit" |
| cost per qualified enquiry | PPC KPI | keep, define: "ad spend divided by the enquiries your team rated as a fit" |
| sales-accepted opportunities | PPC KPI | "enquiries your sales team agreed to pursue" |
| MQL, SQL | not rendered on these pages (`lib/leadQualification.ts` only) | if ever needed: "a lead that matches your target buyer" |
| attribution, "cannot be attributed" | SEO deep-dive 3 | "where we can't trace an enquiry back to a search, the report says so" |
| CRM | throughout | keep. Buyers know it |
| Search Console | SEO deep-dive 3, process | "your Google search data" |
| GA4, Looker Studio, Supermetrics, UTM rules | PPC card, tech stack | "your analytics" · tool names **cut** until confirmed in use |
| tech stack block (Ahrefs, Semrush, Screaming Frog, Clearscope, InLinks, Schema App, OpenAI API, Google Knowledge Graph API, Python scripts, TikTok Ads Manager) | every service page | **cut the block.** Unconfirmed since v1 (`NEEDS DATA`) and meaningless to a CEO |

### 1.4 Paid

| Term | Where now | Plain version |
|---|---|---|
| ABM, account-based, account-based outreach | `/services` pillar (removed in v1), white-label card | "campaigns aimed at a named list of target companies" |
| exact and phrase match | PPC card, process | "bidding only on searches that closely match what you sell" |
| exclusions, negative keywords | PPC deep-dive, process | "blocking searches from people who will never buy" |
| search terms report | PPC deep-dive, process | "the list of real searches that triggered your ads" |
| Performance Max, asset groups, audience signals | PPC card | "Google's automated campaign type" · "asset groups" and "audience signals" **cut** |
| ROAS | PPC (removed in v1), `StatBand` comment | **cut** |
| click IDs, offline conversion import | PPC deep-dive 3 (HOLD) | "sending won deals back to Google Ads so it learns which clicks became customers" · still under Marcus's HOLD |
| retargeting, remarketing | Meta, Retargeting cards | "showing ads to people who already visited your site" |
| DSP, programmatic, native, brand-safety controls | Programmatic card | "display ads on other websites" · rest **cut** |
| CTV | PPC card (D8: off the grid) | **cut** from grid. URL stays live |
| feed management | PPC card | "keeping your product list in Google accurate" (catalogue sellers only) |
| CRO, message match, conversion experimentation | Landing Page CRO card | "making sure the ad and the page it leads to say the same thing" |

### 1.5 Local

| Term | Where now | Plain version |
|---|---|---|
| local pack | §1 definition, local SEO page | keep in the §1 line. Explain once: "the short list of businesses Google shows with a map" |
| Business Profile | §1 definition | "your Google Business Profile, the listing that shows on Maps" |
| Bing Places | §1 definition | keep the name. Explain: "Microsoft's business listing for Bing" |
| NAP, "consistent name, address and phone" | local SEO deliverables | "the same name, address and phone number everywhere" (already plain) |
| Business Profile actions | local SEO measurement | "calls, direction requests and website clicks from your listing" |

### 1.6 Industry template internal labels (rendered today)

| Label | Block | Plain version |
|---|---|---|
| "The mechanism, not the symptom." | `WhyLostBlock` heading | "Why firms like yours get left out" |
| "Why this sector buys" / "What one won program is worth here." | `OperatorNoteBlock` | **cut the block** (section 9.3) |
| "Who shapes the scope" / "What makes a useful engagement" | `QualificationBlock`, `InheritedContextBlock` | **cut** (section 9.3) |
| "A considered purchase" / "Make the next conversation worth having." | `ClientValueBlock` | **cut** |
| "Questions to investigate" / "The questions behind a shortlist." | `PromptPanelBlock` | "The questions your buyers ask AI" |
| "Planning question", "Application-specific question", "Shortlist request", "How-to question" | `PromptPanelBlock` row labels | **cut.** One label for the whole list: "Your buyers' words, not ours" |
| "Observed AI answers" / "What the assistants actually said." | `ObservationBlock` | "What AI tools said" |
| "No run recorded" | `ObservationBlock` unobserved | "Not tested yet" |
| "Get the first run on your prompts" | `ObservationBlock` button | "Request a free AI visibility audit" (the operator's fixed name, 2026-10-07) |
| "What we look for" / "The shape of the answer we are checking against." | `GeoAngleBlock` | keep eyebrow, heading becomes "What we check for" |
| "Paid-search research" / "Commercial terms to validate." | `PaidDemandBlock` | "What your buyers type into Google" |
| "Who is actually searching" / "Understand the people behind the decision." | `BuyersBlock` | "Who your buyers are" |
| "What is true, and where it came from" / "Dated facts, each with the source it came from." | `FactsBlock` | "Facts we checked, with sources" |
| "Primary read" / "Reported by a secondary" | `FactsBlock` source label | "Read at the source" / "Read in a secondary report" |
| "Five axes, and none of them is 'quality'." | `AxesBlock` | "What buyers compare you on" (the hard-coded "Five" breaks on any other count) |
| "The four surfaces" / "Connect AI visibility with the search foundations." | `ServiceLinksBlock` | "Pick the layer you need" |
| "Covered elsewhere" / "The same buyer, under another branch." | `CrossTreeBlock` | merged into "Related pages" |
| "Inside this category", "Nearby" | `IcpChildrenBlock`, `SiblingsBlock` | merged into "Related pages" |
| "Asked on calls" / "The questions that actually come up." | `FaqsBlock` | "Questions buyers ask us" |
| "Start here" + "Your buyers / Your scope / Your evidence" list | `SnapshotCta` | eyebrow "Next step"; side list **cut** |

### 1.7 Client vocabulary that stays

SOC 2, ISO 27001, NIS2, EDR, SIEM, ARR, scope of accreditation, ISO/IEC 17025, method and matrix, and every other term from the client's own trade. These are the words their buyers filter on. Removing them makes a page less clear to the person reading it, not more.

---

## 2. Shared service-page structure

Same order on all five pages, so Mira builds one layout. Light and dark alternate as on the homepage.

| # | Section | Band | Visual element | Notes |
|---|---|---|---|---|
| 1 | Hero: eyebrow (the §1 layer line), fixed H1, one-line promise, two buttons | light | the page's one visual, right column on desktop | |
| 2 | Three promise chips | light | one icon each | replaces the three paragraph cards (`SERVICE_PROMISES`) |
| 3 | Right for you if | light | check icons, homepage `Fit` pattern | 3 or 4 items |
| 4 | What you get | dark | icon tile per item, homepage `FourLayers` lattice | 4 to 6 items |
| 5 | How it works | light | numbered rail, homepage `Programme` pattern | 3 or 4 steps |
| 6 | What you see each month | dark | list with icons, plus product screen where named | |
| 7 | Proof | light | `ProgrammeCard`, filtered (rule below) | omitted when the filter returns nothing |
| 8 | Questions buyers ask us | light | `<details>`, homepage `Faqs` pattern | 3 or 4 |
| 9 | Closing CTA | dark | `FunnelCTA` stage `bofu` | |
| 10 | Specialist pages | light | names-only link list | replaces the Capabilities grid and "Choose your service scope" |

### 2.1 Cut from the current template

| Element | Why |
|---|---|
| Banner of KPIs in mono caps | Repeats the aside and the report block. Three times on one page |
| Aside "What we measure" | Replaced by section 6. Keep the aside only as a sticky Book a call / Send an enquiry box on desktop |
| Capabilities grid descriptions | 9 to 16 cards of jargon, about 200 words a page. Names stay as links (section 10), so no sub-page loses its inbound link |
| "Choose your service scope" | Second list of the same sub-pages |
| Tech stack | Unconfirmed tools, meaningless to the reader |
| "Explore your industry" (legacy `data/industries.ts` links) | Not ICP-gated (v1 audit). Replace with one line: `See the industries we write for` → `/industries` |
| `AIPlatforms` logo row | Keep on AI SEO and GEO only. It is irrelevant on SEO, Local SEO and PPC |
| "How does AI support the work?" FAQ | Same answer on every page. Move it to `/process` or `/about` once, if anywhere |

### 2.2 Shared strings

**Promise chips** (replace the three cards in `data/servicePromises.ts`; same objections C7, M1, M4):

| Icon (lucide) | Chip |
|---|---|
| `ShieldCheck` | No ranking or AI placement promises |
| `Columns3` | Every result reported separately |
| `Users` | Works beside your team or agency |

**Closing CTA** (`lib/funnel.ts`, `bofu`): headline unchanged, "Find out where you stand in Google and AI search." Reassurance line becomes:

> No obligation · Scope agreed in writing before work starts

("Real strategist" is vague. No duration, because the calendar shows the real one, as the homepage hero comment says.)

**Proof rule, for Mira.** Two groups, the homepage `Evidence` pattern, both through `ProgrammeCard`. HVAC and dental never render (operator, 2026-10-07).

1. **B2B client results** (eyebrow, as homepage). The named records in `data/case-studies/b2b.ts` whose `services` include this page's service, library order. Cards show the two `B2B_CARD_STAGES` figures with dates and source, nothing more. No pipeline dollar values, no traffic figures, no Talentera spend or cost-per-lead figures on a card.
2. **Insurance programmes** (eyebrow, as homepage). Insurance records whose `services` include this page's service, first three in library order, no KPI figures.

Under the cards, the two homepage lines verbatim (`components/home/Evidence.tsx`; the B2B line is `B2B_PROOF_LINE` in `data/case-studies/b2b.ts`, updated by the operator decision of 2026-10-08):

> B2B results are confirmed by each client's own reporting, for the dates on each card.
>
> Insurance KPIs stay labelled as targets until client reporting fills in the result. Outside insurance, read those programmes for the method, not as proof of work in your sector.

Render only the line for a group that rendered. If both filters return nothing, omit the block and leave one text link: `See our client programmes` → `/case-studies`.

In today's data: SEO gets Brixio (B2B), no insurance. AI SEO gets Brixio, Talentera and Sophos, plus insurance. GEO gets Brixio and Sophos (`b2b.ts` tag `geo`), plus insurance tagged `ai-seo`. PPC gets Talentera, plus insurance. Local SEO gets nothing.

---

## 3. Word budget

Approximate hand counts of visible body copy, nav and footer excluded. Current counts are from `data/services.ts`, `data/seoExpansion.ts` and the template strings. Mira or Ruth should confirm with a word count on the preview.

| Page | Current | Target (−40%) | This draft | Sections now → after |
|---|---|---|---|---|
| `/services/seo` | ~1,050 | ~630 | ~640 (−39%) | 9 → 10, each with a visual element |
| `/services/ai-seo` | ~1,070 | ~640 | ~650 (−39%) | 9 → 10 |
| `/services/ppc` | ~1,000 | ~600 | ~610 (−39%) | 9 → 10 |
| `/services/ai-seo/generative-engine-optimization` | ~615 | ~370 | ~420 (−32%) | 6 → 10 |
| `/services/seo/local-seo` | ~535 | ~320 | ~390 (−27%) | 6 → 10 |
| Industry template (sub-industry level) | ~1,900 (TIC hub ~1,640) | ~1,100 | ~800 filled example (−58%) | 15 to 18 → 12 |

The two sub-pages miss the 40% target on purpose. They were already the shortest pages. Cutting further leaves one-sentence sections, which is the "thin" the operator is complaining about. MARS or the operator can push them down.

---

## 4. `/services/seo`

**Owned claim.** SEO for a B2B firm is judged on enquiries, and it is the base the AI layers need.
**Links out:** `/services/ai-seo` (FAQ 2), `/services/seo/local-seo` (specialist list), `/locations/perth/seo` (template market block), `/industries`, `/book`, `/contact#enquiry`. **In:** `/services` card 02, homepage FourLayers, `/services/ai-seo`.

### Hero

- **Eyebrow:** SEO · Google search results
- **H1 (fixed):** Enterprise and B2B SEO Services
- **Promise:**

> We help B2B buyers find you on Google when they search for what you sell. We judge the work on enquiries, not traffic.

- **Buttons:** `Book a call` · `Send an enquiry`
- **Visual (one per page):** an SVG diagram, "From search to sale". Four boxes left to right: *A buyer searches* → *Your service page* → *An enquiry* → *Your CRM*. Under it, three empty report columns labelled *Rankings*, *Visits*, *Enquiries*. No numbers, no positions, no sample results.

### Promise chips

Shared (section 2.2).

### Right for you if

- You sell to other businesses, and buyers research online before they call.
- Your services don't show up for the searches that matter.
- You've paid for SEO before and got traffic, but few enquiries.
- Someone on your team can approve changes to the website.

### What you get

| Icon | Title | Sentence |
|---|---|---|
| `Wrench` | Technical fixes, in order | We find what stops Google finding and storing your key pages, and fix it, sales pages first. |
| `FileText` | Pages buyers can compare | Service pages that answer what a buying team checks: what you do, who for, how it works and what it takes. |
| `Search` | The searches that matter | A list of the searches your buyers make before they enquire, each matched to the page that should answer it. |
| `Link2` | Other sites backing you | Mentions and links from trade press, associations and partners your buyers already trust. |
| `BadgeCheck` | Who stands behind it | Named authors, real credentials and client evidence on the page, so buyers can see who did the work. |

### How it works

1. **Check.** We review your site and your Google search data, and record where you stand today, with a date.
2. **Fix.** We fix what blocks your key pages, in order, and every fix has an owner.
3. **Build.** We write or improve the pages your buyers need with your experts, and win mentions on sites they trust.
4. **Review.** We compare against the starting point and agree the next priorities.

### What you see each month

One report, in plain columns. Nothing blended into a single score.

- Where you rank for the searches we agreed, against the starting point.
- Which key pages Google has stored, and which it hasn't yet.
- Visits from Google to the pages that matter.
- Enquiries from search, and how many your sales team rated as qualified: from a firm you would actually sell to.
- What we fixed, what we published, and what comes next.

Where we can't trace an enquiry back to a search, the report says so.

### Proof

Brixio (B2B, tagged `seo`), with the B2B source line only. No insurance programme is tagged `seo`, so that group and its line are omitted. Then `See our client programmes` → `/case-studies`.

### Questions buyers ask us

**Do you guarantee rankings?**
No. Google decides its own results. We commit to the agreed work, a dated starting point and a monthly report you can check.

**How does SEO help with AI search?**
Google's AI Overviews and AI Mode only link to pages Google has stored and can show in search. So the fixes and pages that help you rank are the base for [AI SEO and GEO](/services/ai-seo). We still report AI answers separately, because a page can rank and still not be named.

> Source for Ruth: Google Search Central, "AI features and your website", last updated 2025-12-10, accessed 2026-10-07: "To be eligible to be shown as a supporting link in AI Overviews or AI Mode, a page must be indexed and eligible to be shown in Google Search with a snippet." https://developers.google.com/search/docs/appearance/ai-features

**Do we have to buy AI SEO or GEO as well?**
No. You can start with SEO alone and add layers later. PPC is scoped separately.

**Can you work with our developers or current agency?**
Yes. The proposal says who owns each task, so nothing gets done twice.

### Closing CTA

Shared `FunnelCTA` (section 2.2).

### Specialist SEO pages

Names only, URLs unchanged. Plain labels are proposals; Nadia owns anchor text (D3).

| Current name | Plain label | URL |
|---|---|---|
| Technical SEO | Technical SEO | `/services/seo/technical-seo` |
| Local SEO | Local SEO | `/services/seo/local-seo` |
| On-Page SEO | On-page fixes | `/services/seo/on-page-seo` |
| Off-Page SEO | Mentions on other sites | `/services/seo/off-page-seo` |
| Link Building | Link building | `/services/seo/link-building` |
| Keyword Research | Keyword research | `/services/seo/keyword-research` |
| Content Strategy | Content planning | `/services/seo/content-strategy` |
| Content Optimization | Refreshing existing pages | `/services/seo/content-optimization` |
| E-E-A-T SEO | Showing your expertise | `/services/seo/eeat-seo` |
| Schema Markup | Page labels for Google (schema) | `/services/seo/schema-markup` |
| International SEO | SEO for several countries | `/services/seo/international-seo` |
| E-commerce SEO | Catalogue and product pages | `/services/seo/ecommerce-seo` |
| Programmatic SEO | Pages at scale | `/services/seo/programmatic-seo` |
| SEO Audits | SEO audits | `/services/seo/seo-audits` |
| Site Migration SEO | Site moves and redesigns | `/services/seo/site-migration-seo` |

Then one line: `See the industries we write for` → `/industries`. Then the template's "Markets we serve remotely" block (`services-template.md`), unchanged.

---

## 5. `/services/ai-seo`

**Owned claim.** AI SEO and GEO are different places, and every answer we report carries its question, AI tool and date.
**Links out:** `/services/ai-seo/generative-engine-optimization` (layer table and specialist list), `/services/seo` (FAQ), `/case-studies/methodology` (proof), `/locations/perth/ai-seo` (market block), `/book`, `/contact#enquiry`, `/free-ai-audit` (D1). **In:** `/services` card 01, homepage FourLayers and FAQ, `/services/seo` FAQ 2.

### Hero

- **Eyebrow:** AI SEO and GEO
- **H1 (fixed):** AI SEO and GEO Services for B2B
- **Promise:**

> Your buyers can ask Google's AI or ChatGPT which supplier to use. We work on what those answers draw from, and show you every answer we test, with its date.

- **Buttons:** `Book a call` · `Send an enquiry`
- **`AIPlatforms` row:** keep, with the homepage line under it: "A name here is not a partnership, and no one can promise you a place in any platform's answers."
- **Visual:** the `scriblr-tracker-run` product screen (ADR-0006, illustrative, already built for the homepage). If Mira wants it distinct from the homepage, filter it to four or five rows. Its caption already reads "Every answer is stored with its prompt, platform, date and cited sources."

### Where it shows up

The four layers, verbatim from `CLAUDE.md` §1. Column header per D2.

| Layer | Where it shows up |
|---|---|
| SEO | Google search results |
| Local SEO | Google Maps, local pack, Bing Places, Business Profile, reviews, listings |
| AI SEO | Google AI Overviews and AI Mode |
| GEO | ChatGPT, Perplexity, Gemini, Claude, Copilot |

Line under the table:

> AI Overviews are the AI summaries at the top of some Google results. AI Mode is Google's chat-style search. [More on GEO](/services/ai-seo/generative-engine-optimization).

### Promise chips

Shared.

### Right for you if

- Your buyers research suppliers before they ever call you.
- You rank on Google, but you don't know what AI tools say about you.
- You asked ChatGPT about your category and it named a competitor.
- You want answers you can check, not a score.

### What you get

| Icon | Title | Sentence |
|---|---|---|
| `MessageSquareText` | Your buyers' questions, tested | We agree the questions your buyers ask, then test them on Google's AI and the assistants you choose. |
| `CalendarDays` | A dated starting point | The first answers are saved with their date and sources, so every later change can be checked. |
| `Fingerprint` | One clear story about you | Your name, services, locations and credentials stated the same way everywhere, so AI tools don't confuse you with someone else. |
| `FileText` | Pages that answer first | Pages that answer a buyer's question in the opening lines, and lead straight to your services and a way to book. |
| `Network` | The sites answers rely on | We find the directories, trade press and comparison pages AI answers use for your buyers' questions, and work on what they say about you. |

### How it works

1. **Agree the questions.** Your buyers' questions, the AI tools and the markets. Then the first test, dated.
2. **Fix your own site.** Company facts and pages that answer first.
3. **Work on other sites.** Correct and strengthen the pages AI answers rely on.
4. **Re-test and compare.** Same questions, same tools, on the agreed schedule.

### What you see each month

- Every question we tested (each one is a "prompt"), on every AI tool, with the date.
- Whether each answer named you, a competitor, or no one.
- The sources each answer linked to, grouped by type: your site, directories, trade press, review sites.
- What changed since the starting point, answer by answer.
- Visits from AI tools and qualified enquiries (from firms you would actually sell to), each in its own column.

A mention in an answer does not prove a buyer became a customer.

Want to see your answers first? [Request a free AI visibility audit](/free-ai-audit).

### Proof

Proof rule (section 2.2): Brixio, Talentera and Sophos, then three insurance programmes tagged `ai-seo`, then both caveat lines. Buttons as on the homepage: `How we handle evidence` → `/case-studies/methodology` · `Client programmes` → `/case-studies`.

### Questions buyers ask us

**Can you guarantee ChatGPT or Google will recommend us?**
No. Each AI tool decides its own answers. We commit to the work and a dated record of every answer we check.

**What's the difference between AI SEO and GEO?**
AI SEO is the work on Google AI Overviews and AI Mode. GEO is the work on assistants: ChatGPT, Perplexity, Gemini, Claude and Copilot. They share foundations, but we report them separately.

**Is there a quick technical fix?**
No. Some agencies sell a file or a code snippet as the answer. We add those where they describe your pages accurately, but none of them makes an AI tool recommend you.

**How soon will we see a change?**
Fixes on your site can be checked as soon as they go live. AI answers depend on each tool and on other sites, so we don't promise a date. You see the same questions re-tested from the start.

### Closing CTA

Shared.

### Specialist AI search pages

| Current name | Plain label | URL |
|---|---|---|
| Generative Engine Optimization (GEO) | GEO: AI assistants | `/services/ai-seo/generative-engine-optimization` |
| Answer Engine Optimization (AEO) | Answers for Google's AI (AEO) | `/services/ai-seo/answer-engine-optimization` |
| AI Citation & Mention Tracking | Tracking AI answers | `/services/ai-seo/ai-citation-tracking` |
| AI Search Monitoring | Ongoing AI answer checks | `/services/ai-seo/ai-search-monitoring` |
| AI Search Visibility | AI search review | `/services/ai-seo/ai-search-visibility` |
| Entity & Knowledge Graph | Consistent company facts | `/services/ai-seo/entity-optimization` |
| LLM Optimization | Content for AI tools | `/services/ai-seo/llm-optimization` |
| AI Content Governance | Rules for AI-assisted content | `/services/ai-seo/ai-content-governance` |
| Voice Search Optimization | Voice search | `/services/ai-seo/voice-search-optimization` |

Then `See the industries we write for` → `/industries`, then the market block (with `Perth AI SEO and GEO` → `/locations/perth/ai-seo`).

---

## 6. `/services/ai-seo/generative-engine-optimization` (GEO)

**Owned claim.** GEO can be worked on and measured, never promised. We say what we can change and what we can't.
**Links out:** `/services/ai-seo`, `/services/ai-seo/ai-citation-tracking`, `/book`, `/contact#enquiry`, `/free-ai-audit` (D1). **In:** `/services/ai-seo` table line and specialist list, `/services` card 01.

### Hero

- **Eyebrow:** GEO · ChatGPT, Perplexity, Gemini, Claude, Copilot
- **H1 (kept):** Generative Engine Optimization (GEO) for B2B Firms
- **Promise:**

> GEO is the work on what AI assistants say when a buyer asks them for a supplier. We work on what they draw from, and keep a dated record of what they say.

- **Buttons:** `Book a call` · `Send an enquiry`
- **`AIPlatforms` row:** keep.
- **Visual:** an SVG diagram, "Where an answer comes from". A buyer's question goes into an assistant. Four lines feed the assistant from four boxes: *Your website*, *Directories*, *Trade press*, *Review and comparison sites*. One answer comes out. Three of the four boxes sit outside the "Your website" box, which is the point. No sample firm names, no counts.

### Promise chips

Shared.

### Right for you if

- Your buyers use ChatGPT or Perplexity to research suppliers.
- You asked an assistant about your category and didn't like the answer.
- You're named, but described wrongly: old services, wrong location, someone else's strengths.

### What you get

| Icon | Title | Sentence |
|---|---|---|
| `MessageSquareText` | Questions from your sales team | We build the question list from what buyers actually ask your sales team, not from a keyword tool. |
| `Bot` | Tests on the assistants that matter | ChatGPT, Perplexity, Gemini, Claude and Copilot, narrowed to the ones your market uses. |
| `Network` | A map of who gets quoted | The sites each assistant draws on for your buyers' questions, from directories to trade press. |
| `PenLine` | Corrections where you're described wrongly | Fixes to your own site and profiles, and requests to correct listings that describe you wrongly. |

### What we can change, and what we can't

Two columns, `Check` and `Minus` icons, homepage `Fit` pattern.

| We can change | We can't change |
|---|---|
| What your site says about you | What an assistant decides to say |
| How consistently you're described | When it changes its answer |
| Whether listings about you are accurate | Whether it names you next time |

Line under it: "No one controls the assistants, so we never promise a mention or a date."

### How it works

1. **Build the list.** We agree the questions with your sales team, then lock them so every test compares like with like.
2. **Test and map.** We save every answer and note the sites it relied on.
3. **Fix and re-test.** We fix what you control, work on the sites you can honestly influence, and re-test on schedule.

### What you see each month

- Each assistant's answer to each question (prompt), with the date.
- Who was named: you, a competitor, or no one.
- Whether the answer described you accurately.
- The sources behind each answer.

Want to see your answers first? [Request a free AI visibility audit](/free-ai-audit).

### Proof

Proof rule (section 2.2): Brixio and Sophos (`b2b.ts` tag `geo`), then three insurance programmes tagged `ai-seo`, then both caveat lines.

### Questions buyers ask us

**Is GEO just SEO with a new name?**
No. SEO is about Google's search results. GEO is about what assistants say when someone asks them a question. Good SEO helps, but a page can rank well and still not be named.

**Can you get us recommended by ChatGPT?**
No one can promise that. We work on what the assistants draw on and record what they say, with dates, so you can see whether it is changing.

**How do you choose the questions?**
From your sales team's notes, your buyers' language and the comparisons they make. Once agreed, the list stays fixed.

### Closing CTA

Shared. Then "Useful next steps" links: `AI SEO and GEO for B2B` → `/services/ai-seo` · `Tracking AI answers` → `/services/ai-seo/ai-citation-tracking`. Drop the sibling block "More AI SEO & GEO for B2B Sub-Services" and its paragraph; the parent page lists them.

---

## 7. `/services/seo/local-seo`

**Owned claim.** We tell you when local SEO isn't worth doing, and we never list a place where you have no presence.
**Links out:** `/services/seo`, `/services/ai-seo`, `/locations/perth/seo`, `/book`, `/contact#enquiry`. **In:** `/services/seo` specialist list, `/services` card 02.

### Hero

- **Eyebrow:** Local SEO · Google Maps, local pack, Bing Places, Business Profile, reviews, listings
- **H1 (kept):** Local SEO for B2B Companies
- **Promise:**

> If your buyers pick suppliers near them, we fix how you show up on Google Maps and in local listings. If location doesn't matter to them, we'll tell you.

- **Explainer line** (under the promise, small): "The local pack is the short list of businesses Google shows with a map."
- **Buttons:** `Book a call` · `Send an enquiry`
- **Visual:** an SVG diagram, "One set of details, everywhere". A centre card with a sample firm's name, address and phone (ADR-0006 sample brand, `.example` domain). Lines out to four listing cards: *Google Business Profile*, *Bing Places*, *Industry directories*, *Your website*. Every card shows the same details. No map pins with rank positions, no star counts.

### Promise chips

Shared.

### Right for you if

- Your buyers need you on site: installs, inspections, field service.
- Your buyers want you nearby: sample drop-off, a licence that applies in one state, a site visit before signing.
- You have real offices, branches or depots.

Line under the list: "If you sell software or advice that works anywhere, local SEO is rarely the priority. We'll say so on the call."

### What you get

| Icon | Title | Sentence |
|---|---|---|
| `Compass` | A straight answer first | We check whether location shapes your buyers' choice before we touch a listing. |
| `MapPin` | Accurate Google and Bing listings | Your Google Business Profile and Bing Places listing set up and corrected for every real address. |
| `Tags` | The right categories | Categories and services that describe what you sell to businesses, not the nearest consumer category. |
| `ListChecks` | The same details everywhere | One name, address and phone number across the directories your buyers use. |
| `Star` | Reviews from real clients | A simple way to ask real clients for reviews, and a reply to every review. No paid or filtered reviews. |

### How it works

1. **Check.** Confirm location matters, review every listing, and record a dated starting point.
2. **Fix.** Correct listings, categories and details, and set up review requests.
3. **Review.** Compare against the start each month and agree the next steps.

### What you see each month

- Calls, direction requests and website clicks from your Google listing.
- Where you appear in map results for the searches we agreed, by location.
- New reviews, and our replies.
- Listings fixed, and any still wrong.
- Qualified enquiries from local search (from firms you would actually sell to), where we can trace them.

### Proof

No B2B or insurance programme is tagged for local SEO. Cards omitted; text link `See our client programmes` → `/case-studies`.

### Questions buyers ask us

**Do B2B companies need local SEO?**
Only when buyers choose by location. If they'd hire you from anywhere, we'll put the effort into SEO, AI SEO or GEO instead.

**Can you list us in cities where we have no office?**
No. A listing needs a real address where you serve clients. For markets you serve remotely, we can build pages that say exactly that.

**Can we buy local SEO on its own?**
Yes. If something else is holding back enquiries, we'll tell you on the call.

### Closing CTA

Shared. "Useful next steps": `B2B SEO services` → `/services/seo` · `Perth SEO for B2B companies` → `/locations/perth/seo`. Drop the sibling sub-services block.

---

## 8. `/services/ppc`

**Owned claim.** B2B PPC is judged on qualified enquiries and booked meetings, and a firm that wants only PPC is a full client.
**Links out:** `/services/ppc/google-ads-management`, `/services/ppc/linkedin-ads`, `/services/ppc/landing-page-cro` (specialist list), `/services/ai-seo` (FAQ), `/book`, `/contact#enquiry`. **In:** `/services` card 03, homepage FAQ 7, `/pricing`.

### Hero

- **Eyebrow:** B2B PPC · Google Ads and LinkedIn
- **H1 (fixed):** B2B PPC and Paid Media Management
- **Promise:**

> Google Ads and LinkedIn campaigns for B2B firms, judged on qualified enquiries and booked meetings, not clicks.

- **Line under the promise** (homepage `FourLayers` wording, verbatim):

> B2B PPC runs alongside the four layers and is scoped separately, priced as a share of ad spend with a monthly minimum. A firm that wants only PPC is a full client.

- **Buttons:** `Book a call` · `Send an enquiry`
- **Visual:** an SVG loop, "Budget follows quality". Five steps in a circle: *A buyer searches* → *Your ad* → *A page that makes the same promise* → *An enquiry your sales team rates* → *Budget moves to what works* → back to the start. No figures.

### Promise chips

Shared.

### Right for you if

- Your ads bring in form fills your sales team won't call back.
- You spend on Google Ads or LinkedIn and can't see which campaigns produce meetings.
- You want paid search working while SEO and AI search build up, or you want PPC on its own.

### What you get

| Icon | Title | Sentence |
|---|---|---|
| `ClipboardCheck` | An honest account review | We go through your searches, settings and landing pages before changing a single bid. |
| `Split` | Researchers and buyers kept apart | People still learning are kept apart from people choosing a supplier, with ads written for each. |
| `Ban` | Wasted searches blocked | We block searches from job seekers, students and consumers, so more of the budget reaches buyers. |
| `Columns2` | Ads and pages that match | Each ad leads to a page that makes the same promise. |
| `Users` | LinkedIn by job title | Ads shown to the job titles, company sizes and industries you sell to. |
| `TrendingUp` | Budget moved on quality | Spend moves toward campaigns that produce qualified enquiries, not the cheapest clicks. |

### How it works

1. **Review the account.** Searches, settings, tracking and landing pages, before any change.
2. **Rebuild around buyers.** Bid only on searches that closely match what you sell.
3. **Clean up early.** Read the real searches behind your ads often in the first weeks, and block the wrong ones.
4. **Move budget on quality.** Shift spend by cost per qualified enquiry.

### What you see each month

- Spend, by campaign.
- Enquiries, and how many your sales team rated as qualified: from a firm you would actually sell to.
- Cost per qualified enquiry: ad spend divided by those qualified enquiries.
- Searches we blocked, and why.
- Meetings booked from paid campaigns, where your CRM records them.

The last line describes reporting from the client's CRM. It does not claim click-ID capture or offline import, so Marcus's HOLD on that sentence is untouched.

### Proof

Proof rule (section 2.2): Talentera, then three insurance programmes tagged `ppc`, then both caveat lines. Talentera's paid media ran on LinkedIn only; no line on this page may present it as Google Ads proof.

### Questions buyers ask us

**Is PPC included with AI SEO and GEO?**
No. PPC is scoped and priced separately, as a share of ad spend with a monthly minimum. You can run it alone or beside search work.

**Will you guarantee a cost per lead?**
No. We commit to the account work and to reporting cost per qualified enquiry in a way you can check. We won't name a figure before we've seen your data.

**Do you need access to our ad accounts?**
Yes, plus your analytics and CRM if you want campaigns judged on sales results. The accounts stay in your name.

**Which platforms do you run?**
Google Ads and LinkedIn, plus Meta ads shown to people who already visited your site, where that fits.

### Closing CTA

Shared.

### Specialist PPC pages

D8 grid (TikTok, Amazon and CTV off the grid; URLs stay live).

| Current name | Plain label | URL |
|---|---|---|
| Google Search Ads | Google search ads | `/services/ppc/google-ads-management` |
| LinkedIn Ads | LinkedIn ads | `/services/ppc/linkedin-ads` |
| Landing Page CRO | Landing pages that match your ads | `/services/ppc/landing-page-cro` |
| Retargeting Campaigns | Ads to past visitors | `/services/ppc/retargeting-systems` |
| Meta Ads | Meta ads | `/services/ppc/meta-ads` |
| YouTube Ads | YouTube ads | `/services/ppc/youtube-ads` |
| Performance Max | Google's automated campaigns | `/services/ppc/performance-max` |
| Google Shopping Ads | Shopping ads for B2B catalogues | `/services/ppc/google-shopping-ads` |
| Feed Management | Product lists for Google | `/services/ppc/feed-management` |
| Ad Creative Production | Ad creative | `/services/ppc/ad-creative-production` |
| Programmatic Advertising | Display ads on other sites | `/services/ppc/programmatic-advertising` |
| Paid Media Analytics | Paid media reporting | `/services/ppc/paid-media-analytics` |
| Microsoft / Bing Ads | Microsoft ads | `/services/ppc/bing-ads` (operator confirmed run today, 2026-10-07) |

Two `subServices` descriptions in `data/services.ts` are still consumer copy from before D8 and should not render even as hidden text: Google Shopping ("Feed optimization and Shopping campaigns for e-commerce revenue") and Feed Management. With descriptions cut from the list, they no longer render here; the sub-pages themselves still need the v1 descriptions applied.

---

## 9. Industry page template

### 9.1 Which template

The taxonomy fields the brief names (`buyer_titles`, `ai_prompts`, `geo_angle`) live on the **sub-industry** (`IcpSubIndustryPage.tsx`), not the industry (`IcpIndustryPage.tsx`). A level-1 industry record has one prose field, `note`. So the template below is the sub-industry page. Level 1 and levels 3 and 4 use the same section order and simply omit the slots they don't have (section 9.4).

### 9.2 The template

Light and dark alternate. Each row has one visual element. Slots in `{braces}`; **authored** means a person writes it per page, **taxonomy** means it renders from `icp-taxonomy.json`, **shared** means the same on every page.

| # | Section | Band | Slot source | Copy and limits | Visual |
|---|---|---|---|---|---|
| 1 | Hero | light | eyebrow `{industry.name}` (taxonomy) · H1 `AI search visibility for {sub.name}.` (existing form) · H2 `{buyerQuestion}` (authored, our buyer's question) · `{opener}` (authored, max 50 words) · "Written for: `{buyer_titles}`" joined with " · " (taxonomy, verbatim) · two buttons | The H1, H2 and opener may never contain an `ai_prompts`, `ppc_keywords` or `geo_angle` string (`icp-page-system.md` §1.1) | industry photo from `industryImages.json` (Pexels: places, equipment, abstract; never people in offices) |
| 2 | The questions your buyers ask AI | dark | `{ai_prompts}` (taxonomy, verbatim) · `{whatWeCheckFor}` (authored, one sentence, rewritten from `geo_angle`) · observation state | Shared intro and unobserved copy below | `scriblr-prompt-panel` product screen, or the observed table when a run exists |
| 3 | Why firms like yours get left out | light | `{whyTheAnswerIsLost}` (authored, max 60 words) | One mechanism, said plainly | pull-quote rule (existing accent border) |
| 4 | Who your buyers are | light | `{buyers[]}` (authored, max 3 roles, one sentence each) | The client's buyers, never `buyer_titles` | role icon per card |
| 5 | Pick the layer you need | dark | shared | The four §1 definitions verbatim, each linking to its real URL | icon tile per layer (homepage `FourLayers` icons) |
| 6 | Facts we checked, with sources | light | `{facts[]}` (authored, min 3, each with URL, publisher, access date, label) | Required by `CLAUDE.md` §7 before `indexable: true` | numbered list, source column |
| 7 | What your buyers type into Google | light | `{ppc_keywords}` (taxonomy, verbatim, mono) | Shared intro below. Ordered before section 2 when `fit` is `PPC` (rule 8, unchanged) | mono chips |
| 8 | Proof | dark | `{proofIds}` (authored) + placement rule | Named B2B results from `b2b.ts` chosen per page by a person, sector match first (never inferred from a template), then insurance cards (`ai-seo`), then the section 2.2 caveat lines. HVAC and dental never | `ProgrammeCard` |
| 9 | Questions buyers ask us | light | `{faqs[]}` (authored, 3 or 4) | No price, no range, no "not sold apart" | `<details>` |
| 10 | Closing CTA | dark | `{snapshotQuestion}` (authored) as headline | Shared body line and two buttons | none |
| 11 | Related pages | light | children (published only) + siblings + cross-tree, merged | One list, names only | link list |
| 12 | Draft notice | n/a | unchanged | Only on `draft` | unchanged |

**Shared strings for the template:**

- Section 2 intro: "These are questions your buyers might type into an AI tool. They are your buyers' words, not ours. We agree the final list with your sales team before we test anything."
- Section 2, unobserved state. Label: `Not tested yet`. Heading: `We haven't tested these questions for {sub.name} yet.` Body: "When we do, this space will show each question, each AI tool, who was named, the sources and the date. Until then it stays empty, because a sample table would look like a result." Button: `Request a free AI visibility audit` → `/free-ai-audit`.
- Section 2, prompts containing `[vendor]`: render the bracket as a styled chip reading "a named vendor". The JSON stays untouched.
- Section 5 intro: "Start with one layer or several. PPC is scoped separately."
- Section 7 intro: "Searches like these can come from people ready to buy. We check how often they're searched, and whether they fit, before we use any of them in a campaign." Link: `How we run B2B PPC` → `/services/ppc`.
- Section 10 body: "Book a call and we'll show you what we'd test first. Or send an enquiry if you prefer."

### 9.3 Blocks to cut or merge

| Block | Action | Why |
|---|---|---|
| `OperatorNoteBlock` (level 1) | **Cut** | Renders the taxonomy `note` verbatim. The notes are the operator's commercial read, not copy: 21 strings with em dashes, internal labels ("Tier S"), and unsourced figures ("$50k to $1M+", "six to eight figures") under the heading "What one won program is worth here." See F3 |
| `QualificationBlock` | **Cut.** `buyer_titles` moves into the hero as one "Written for" line | Its second column is one generic sentence on all 341 pages |
| `ClientValueBlock` | **Cut** | Never renders `client_value`; shows the same two generic sentences on every page. Zero unique words, and it counts against the 40% uniqueness bar |
| `InheritedContextBlock` (levels 3, 4) | **Cut** | Same generic sentence. The breadcrumb and opener already carry the up-link |
| Hero aside "What a buyer filters on here" + `min_firm_size` "Where the work pays for itself" | **Cut** | Duplicates `AxesBlock` on the same page, and "pays for itself" reads as a return promise. `min_firm_size` also narrows the ICP gate, which the homepage deliberately doesn't do |
| `GeoAngleBlock` | **Merge** into section 2 as the authored "What we check for" sentence | Raw `geo_angle` is shorthand with em dashes in 11 strings (F4) |
| `PromptPanelBlock` | **Merge** into section 2; drop the four per-row mono labels | Labels are internal classification |
| `ObservationBlock` | **Keep**, inside section 2; unobserved copy cut from ~130 to ~50 words | It is the page's only measurement |
| `CrossTreeBlock`, `SiblingsBlock`, `IcpChildrenBlock` | **Merge** into one "Related pages" list | Three link blocks with three headings for one job |
| `ServiceLinksBlock` | **Keep, fix** | Hrefs 404 and the Local SEO line is not §1 verbatim (F2) |
| `FactsBlock` intro | **Shorten** to: "Each fact links to where we read it, with the date." | 55 words of method explanation down to 10 |
| `ProofBlock` `kind: 'none'` statement | **Replace** with the placement rule | The TIC statement runs 60 words of what we haven't done. The homepage caveat line says the same in one sentence |
| `SnapshotCta` side list | **Cut** | Generic on every page |
| `AxesBlock`, `VocabularyBlock` | **Keep** at sub-niche level only; plain headings (1.6) | These carry the client's own vocabulary, which is what makes the page specific |

### 9.4 Other levels

- **Level 1 industry hub:** sections 1, 3, 4, 5, 6, 8, 9, 10, 11. No "Written for" line (no `buyer_titles` at this level), no section 2 or 7. The hero opener does the job the cut `note` was doing, in authored, sourced words.
- **Levels 3 and 4:** as the template, plus `AxesBlock` and `VocabularyBlock` after section 4. `buyer_titles` and `ppc_keywords` inherit from the sub-industry and render in the same slots, with no separate inherited-context block.

### 9.5 Filled example: Cybersecurity SaaS

`/industries/saas-and-software/cybersecurity-saas` · taxonomy id `01.05`. Today this entity is `spine` (no page). This is example copy for when it is promoted. Promotion still needs a named reviewer, a review date, three sourced facts and Ruth.

Taxonomy fields used, verbatim from `icp-taxonomy.json`:

- `buyer_titles`: CMO, VP Marketing, Head of Demand Generation, Director of Product Marketing
- `ai_prompts`: "best compliance automation tool to get SOC 2 in 90 days" · "[vendor] vs [vendor] EDR for a 500-seat company"
- `geo_angle`: see `icp-taxonomy.json` line 1233. It joins "Compliance-driven comparison queries" to "cited when CISOs and IT leads ask AI which tools satisfy SOC 2, ISO 27001, NIS2 or cyber-insurance requirements" with an em dash, so it does not render raw. The dash is left out of this file so Ruth's grep stays clean.
- `ppc_keywords`: soc 2 compliance software · privileged access management solutions · cloud security posture management
- Not rendered: `min_firm_size` ($5M+ ARR or Series A+), `client_value`.

**1. Hero** (light)

- Eyebrow: SaaS & Software
- H1: AI search visibility for Cybersecurity SaaS.
- H2: Why do AI tools recommend other security vendors to our buyers?
- Opener:

> When a security buyer asks an AI tool which products meet SOC 2, ISO 27001 or NIS2, the answer can only use what it finds. If your pages don't say which requirements you support, and how, there is little to quote. We test those questions and show you the answers, with dates.

- Written for: CMO · VP Marketing · Head of Demand Generation · Director of Product Marketing
- Buttons: `Book a call` · `Send an enquiry`
- Visual: Pexels image, server racks or network hardware, no people.

**2. The questions your buyers ask AI** (dark)

- Shared intro.
- The two prompts, verbatim, the second with "a named vendor" chips.
- What we check for:

> Whether AI answers name your product when buyers ask which tools meet SOC 2, ISO 27001, NIS2 or cyber-insurance requirements, and which sites those answers rely on.

- Unobserved state, shared copy, `{sub.name}` = Cybersecurity SaaS.
- Visual: `scriblr-prompt-panel`.

**3. Why firms like yours get left out** (light)

> If your pages list features but don't connect them to the requirement a buyer is checking, such as SOC 2 or NIS2, an AI tool fills the gap from somewhere else: review sites, comparison pages and analyst coverage. You may appear there. You may not be described the way you would describe yourself.

**4. Who your buyers are** (light)

| Role | What they check |
|---|---|
| CISO or head of security | Whether the tool meets the frameworks the company is audited against. |
| IT lead | Whether it fits the existing tools and the size of the team. |
| `[NEEDS DATA: Iris, a third buyer role in the buyer's words, sourced, e.g. compliance or GRC lead]` | |

The first two roles come from `geo_angle` ("CISOs and IT leads"). The "what they check" sentences are my draft and need Iris to confirm them in the buyer's own words before publication.

**5. Pick the layer you need** (dark). Shared, with fixed links.

**6. Facts we checked, with sources** (light)

`[NEEDS DATA: three facts for Cybersecurity SaaS, each with URL, publisher, access date and read-at-source or secondary label. Iris owns.]` Candidate topics for Iris to verify, not facts: the NIS2 Directive's application date and which entities it covers; the AICPA SOC 2 Trust Services Criteria; the ISO/IEC 27001:2022 transition deadline. Nothing from this list renders until Iris has read the source.

**7. What your buyers type into Google** (light)

- Shared intro.
- Chips: `soc 2 compliance software` · `privileged access management solutions` · `cloud security posture management`
- Link: `How we run B2B PPC` → `/services/ppc`

**8. Proof** (dark)

- `{proofIds}`: Falcon Security, Sophos, Brixio (security buyers), then three insurance programmes tagged `ai-seo`, then both caveat lines.
- These three sell security services (managed detection and response, enterprise security and cloud), not SaaS products. Card text stays as `b2b.ts` writes it and must not be reworded toward software.

**9. Questions buyers ask us** (light)

**Have you worked with security companies?**
Yes. Falcon Security, Sophos and Brixio are on this page, with dated results. They sell security services rather than software, but their buyers are the same: CISOs, CIOs and IT security leaders. On a call we'll walk you through what carries over to a product company.
*(Ships only while those three cards render in section 8. If they are removed, replace with: "Ask us on the call and we'll answer for your sector specifically.")*

**Can you guarantee an AI tool will recommend our product?**
No. Each AI tool decides its own answers. We commit to the work and to a dated record of every answer we check.

**We already have a demand gen agency. Will this clash?**
No. We can run AI search as a separate layer. The proposal says who owns each task.

**Where would you start?**
With the requirements your buyers ask about. We check whether your site says, in plain text, which frameworks you support and how, then test the questions on the AI tools your buyers use.

**10. Closing CTA** (dark)

- Headline: Do AI answers about compliance tools mention your product?
- Shared body line, two buttons.

**11. Related pages** (light). Published children, siblings and cross-links under SaaS & Software, names only. Today none are published, so the block omits itself.

Word count of this example: about 800 visible words, against about 1,900 for the current sub-industry template filled the same way.

---

## 10. Decisions for the operator

| # | Decision | Recommendation |
|---|---|---|
| D1 | The service-page hero carries a third link, "Request a free AI visibility audit", beside Book a call. The brief and the keep-funnel-simple rule say two | Remove it from all heroes. On AI SEO and GEO only, add one text link under the report block: "Want to see your answers first? Request a free AI visibility audit." Nadia asked for an above-the-fold `/free-ai-audit` link on `/services/ai-seo`; she confirms the below-fold position is acceptable |
| D2 | Layer table column header "Surface" → "Where it shows up" | Change the header only. The four definitions stay verbatim |
| D3 | Capability grids become names-only link lists with plain labels | Nadia approves the anchor labels; URLs unchanged |
| D4 | Tech stack block | Cut on all pages until the team confirms the tools in use |
| D5 | Industry template stops rendering `note`, `min_firm_size`, and the generic qualification and client-value blocks | Cut (section 9.3) |
| D6 | The brief says "what the client sees monthly". The site elsewhere says "on the agreed schedule" | **Cleared by the operator, 2026-10-07: monthly reporting is standard on every retainer.** Copy uses "each month" for the report and "agreed schedule" for re-tests |

---

## 11. Flags found on the way (not copy in this file; carried up)

| # | Where | What | Owner |
|---|---|---|---|
| F1 | `data/b2b/icp/authored/tic-hub.ts:188` | A published page's FAQ prints "Retainers run from three thousand to twenty thousand US dollars a month". Breaches the 2026-10-03 rule: no public prices, ranges or tiers | Theo rewrites, Ruth gates, before any push |
| F1b | `tic-hub.ts:179`, `data/b2b/bodies/manufacturing-industrial/hub.ts:178` | "Four, and they are not sold apart" / "they are not sold apart". Superseded by the 2026-10-07 decision that a client can start with any one layer | same |
| F2 | `lib/b2b/graph.ts` `SERVICE_LINKS` | Links to `/seo`, `/local-seo`, `/ai-seo`, `/geo`. None exist in `app/` and none redirect in `next.config.mjs`, so every industry page's service block links to 404s, including the published TIC pages. Real URLs in section 0.2. The Local SEO surface there ("Maps, local pack, Business Profile") is also not §1 verbatim | Mira |
| F3 | `components/b2b/IcpBlocks.tsx` `OperatorNoteBlock` | Renders taxonomy `note` verbatim. Notes carry unsourced figures, em dashes and internal labels. The TIC note renders on a published hub | Mira (cut), Ruth |
| F4 | `GeoAngleBlock` | 11 `geo_angle` strings contain em dashes and render verbatim | Mira (merge per 9.3) |
| F5 | `ObservationBlock` button | "Get the first run on your prompts" links to `/free-ai-audit`. The 2026-10-07 decision names the offer "Free AI visibility audit" everywhere | Mira |
| F6 | `data/case-studies/*` | 50 `caseId` entries (20 HVAC, 20 dental, 10 insurance). `CLAUDE.md` §2 says 45 (19, 20, 6), and the TIC pages print "45 client programmes". These pages print no count | Operator |
| F7 | `components/home/Hero.tsx` | References `PRODUCT_SCREENS['scriblr-visibility-tracker']`. The working-tree registry (`data/product-screens/index.ts`) has only `scriblr-tracker-run` and `scriblr-prompt-panel`, and `visibility-tracker.ts` is deleted (uncommitted). Likely a type error at build. Someone else's work in progress; noting it only | Mira, Owen |
| F8 | `lib/seo.ts` `/services/ai-seo` meta description (priority page, fixed) | Contains "entity work" and "answer-ready content", the jargon this pass removes from the body | Operator decides whether a fixed meta may change |
| F9 | `data/services.ts` PPC `subServices` | "Microsoft / Bing Ads" on the grid. **Cleared, operator 2026-10-07: Microsoft Advertising is run for clients today.** The row stays | closed |

---

## NEEDS DATA

- Three sourced facts for Cybersecurity SaaS (Iris), before that page can be promoted.
- A third buyer role for Cybersecurity SaaS, in the buyer's words (Iris), and confirmation of the two drafted "what they check" sentences.
- Tools in active use, if the tech stack block is ever restored (D4).
- The real case-study count (F6).
- Marcus §2.4 status, unchanged from v1, for the held PPC sentence.

Cleared by the operator, 2026-10-07 (relayed by MARS): monthly reporting is standard (D6); Microsoft Advertising is run today (F9); clients own their ad accounts (PPC FAQ 3). Superseded: the white-label card. Falcon Security, Brixio, Talentera and Sophos are now named B2B case studies (CLAUDE.md authority block), and section 9.5 uses them.
