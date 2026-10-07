# AI SEO and GEO `/services/ai-seo` · copy v1

**Author:** Theo (content) · 2026-10-07 · plan step 2.7
**Status:** DRAFT. Ruth gates, then Mira wires. No `.tsx` edited.
**Data:** `data/services.ts`, entry `"id": "ai-seo"` (line 531). Template strings shared with other service pages are in `services-template.md`.
**Objection codes:** Marcus `03` §5.1 (C1 to C7) and §5.2 (M1 to M6).

---

## Brief

1. **Search intent.** Paid ad group 1A ("ai seo agency", "ai seo services", "llm seo agency") and organic "GEO services". Thirty seconds ago the reader saw a search ad or a result promising AI SEO for B2B. They are comparing agencies and are already sceptical of anyone who promises placement in ChatGPT.
2. **AI-citation angle.** Nadia §4.1: the answer to "What is the difference between AI SEO and GEO?", 40 to 60 words, no number, plus the four-layer definitions verbatim as a table. This page should be the source a model quotes when asked that question.
3. **Internal links.** Out: `/free-ai-audit` above the fold (Nadia), `/services/ai-seo/generative-engine-optimization`, `/services/ai-seo/answer-engine-optimization`, `/services/ai-seo/ai-citation-tracking`, `/services/seo`, `/case-studies/methodology`, `/locations/perth/ai-seo`. In: `/services` grid card 01, `/` FourLayers and Faqs, `/services/seo` deep-dive, GEO sub-page.
4. **The one claim this page owns.** AI SEO and GEO are different surfaces, and we report every answer on either with its prompt, platform, date and cited sources.

---

## Audit of the current page

| | |
|---|---|
| What it says now | H1 (Nadia, final) "AI SEO and GEO Services for B2B". Lead: "Buyers use search results and AI answers to research categories and compare suppliers…" KPIs "Observed mentions and citations · Documented source coverage · Relevant enquiries". Three deep-dives on facts, answers, next step. Nine capabilities. Generic three-step process. Five FAQs |
| Positioning | Right subject, generic wording. Never defines AI SEO against GEO on the page whose H1 names both |
| Objections not answered | C2, C3, C4, M1 (only via template), M2 (partly), M3 (not answered on the page most likely to be asked it) |
| §1 / §4 issues | GEO capability: "Optimize to be cited by ChatGPT, Gemini, and Perplexity". Reads as a placement promise. "AI Citation & Mention Tracking: … with prompt demand mapping" implies prompt volume data we do not have. Tech stack names tools with no confirmation they are in use |
| Banned words, em dashes | None |
| CRO (Marcus §5.6 rank 4) | First CTA is in the aside, after the article on mobile. Closing `FunnelCTA` is `mofu`. No method block. Both handled in `services-template.md` and below |

**Verdict: edit.** Keep the structure, replace the lead with the answer-first block and table, and rewrite the method into the deep-dives.

---

## Copy, field by field

**`title`:** keep "AI SEO & GEO for B2B" (feeds breadcrumbs and template strings; the visible H1 comes from Nadia's override).

**H1:** Nadia's, final. "AI SEO and GEO Services for B2B".

**`kpis`** (banner and aside):

```
"Answers observed, by prompt and date",
"Sources cited, by category",
"Qualified enquiries"
```

**`fullDescription`.** The answer-first block. 53 words, no number:

> AI SEO is the work on Google AI Overviews and AI Mode. GEO is the work on assistants: ChatGPT, Perplexity, Gemini, Claude and Copilot. Both depend on clear pages, consistent company facts and what other sites say about you. We run both for B2B firms and record every answer with its prompt, platform and date.

**Definitions table (new element, Nadia §4.1).** Directly under `fullDescription`. Real `<table>` with a `<caption>`, same markup pattern as `components/home/FourLayers.tsx`. Strings verbatim from `CLAUDE.md` §1. Mira: this needs a small new field (for example `definitionsTable`) or a one-off render for `ai-seo`. It is the only structural addition on this page and Nadia asked for it explicitly.

Caption: `The four search layers and the surface each one covers`

| Layer | Surface |
|---|---|
| SEO | Google search results |
| Local SEO | Google Maps, local pack, Bing Places, Business Profile, reviews, listings |
| AI SEO | Google AI Overviews and AI Mode |
| GEO | ChatGPT, Perplexity, Gemini, Claude, Copilot |

**`deepDive`** (four sections, replacing three):

1. **Make your company unambiguous.** Google and the assistants need to know exactly who you are. We align your name, services, locations, people and credentials across your site, your structured data and your main third-party profiles. Structured data describes what the page shows. It never adds a claim the page cannot support.
2. **Test the questions your buyers ask.** We agree the buyer questions, platforms, markets and language before the first run. Then we re-run the same set on a fixed schedule. Each answer is recorded with its date and cited sources, so a change can be examined instead of reduced to a score.
3. **Work on the sources answers draw from.** AI answers often cite pages other than yours: directories, trade publications, comparison pages and association listings. We find the ones that appear for your buyers' questions and work on getting them to describe you accurately.
4. **Connect answers to enquiries.** An answer that names you only helps if the buyer can act on it. We link answer-ready pages to your service pages and a clear way to book a call. Referral visits and enquiries are reported in their own columns.

**Optional method sentence, gated (D9).** Append to deep-dive 2 only if the operator confirms the capability in production today:

> We run this on Scriblr, built by our sister company Qognition Labs. It stores each raw answer, the cited URLs and the model version, so every figure traces back to a saved answer.

**`subServices[].description`** (names and slugs unchanged, URLs preserved):

| `name` | New `description` |
|---|---|
| Generative Engine Optimization (GEO) | Work on how ChatGPT, Perplexity, Gemini, Claude and Copilot describe your firm: entity clarity, third-party sources and answer-ready pages. |
| Answer Engine Optimization (AEO) | Direct answers, summaries and FAQ structure that Google AI Overviews and AI Mode can extract and attribute. |
| AI Citation & Mention Tracking | A fixed prompt set, re-run on schedule, recording which firms each platform names and which sources it cites. |
| Entity & Knowledge Graph | Consistent company facts across your site, schema and third-party profiles, so your name resolves to your company. |
| Voice Search Optimization | Short, spoken-style answers for conversational questions about your services. |
| AI Search Visibility | One view of how Google's AI features and the assistants answer your buyers' questions, by platform and date. |
| LLM Optimization | keep |
| AI Content Governance | keep |
| AI Search Monitoring | Scheduled re-runs of your prompt set, with competitor mentions and cited sources compared against the baseline. |

**`process`** (four steps, replacing the shared three):

| `title` | `description` |
|---|---|
| Fix the prompt set | Agree the buyer questions, platforms and markets. Run the baseline and date it. |
| Fix what you control | Correct company facts, structured data and answer-ready pages on your site. |
| Work on the sources | Improve the third-party pages that answers cite for your buyers' questions. |
| Re-run and compare | Re-run the same prompt set on schedule and report the changes next to your enquiries. |

**`techStack`.** `[NEEDS DATA: which of InLinks, Schema App, OpenAI API, Perplexity and Google Knowledge Graph API the team uses on client work today]`. Remove any that are not in use. Add "Scriblr (Qognition Labs)" only under D9.

**`faqs`:**

| `question` | `answer` | Code |
|---|---|---|
| Can you guarantee AI recommendations? | No. Each platform controls its own answers. We control the quality of the work and how each observation is recorded: the prompt, the platform, the date and the sources cited. | C7 |
| Will an llms.txt file or schema markup get us cited? | No. A text file or a schema type is not a shortcut. We treat llms.txt as optional housekeeping and use schema only to describe what the page already shows. | C1 |
| How long before we see a change? | Fixes on your own site can be checked as soon as they ship. Changes in AI answers depend on each platform and on third-party sources, so we don't put a date on them. You see the same prompt set re-run on the agreed schedule from the start, so you compare like with like. | M2 |
| Can you work alongside our SEO agency? | Yes. We can run AI SEO and GEO as a specialist layer while another team runs SEO. The proposal names who owns each task, so nothing is done twice. | M4 |
| How does AI support the work? | keep the current answer | n/a |
| What happens on the first call? | It takes 30 minutes. We cover who you sell to, what we would check first in Google and AI search, and whether we are a fit. You can send an enquiry instead if you prefer. | C4 |

**Proof band (Marcus §5.6 rank 4c).** Still withheld. O7 now allows "client programmes", but the band leads with a count the operator has not confirmed, and the existing programmes (HVAC, dental, commercial insurance) are not AI SEO or GEO proof for a B2B buyer. Revisit when the B2B-relevant count arrives.

---

## Decisions

- **O7** decided; proof band still withheld (no confirmed count).
- **D9** Scriblr sentence and tech-stack entry.

## NEEDS DATA

- Tools in active use on client work (tech stack).
- Scriblr production capability (D9).
