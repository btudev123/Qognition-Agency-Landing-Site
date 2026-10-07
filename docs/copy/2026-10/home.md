# Homepage `/` · copy v5

**Author:** Theo (content) · 2026-10-07 · plan step 2.7
**Status:** DRAFT. Not applied. Ruth (`brand-guard`) gates, then Mira wires. No `.tsx` edited.
**Supersedes:** `docs/copy/home-v4.md` (kept, not deleted). v4 led with "45 client programmes", a published price band and a 48-hour promise. All three are now blocked (O7, the 2026-10-03 no-prices rule, the unconfirmed SLA).
**Components:** `components/AcquisitionHome.tsx` order is unchanged. One section per heading below, in render order.
**Objection codes:** Marcus `03-paid-and-cro.md` §5.1 CEO rows C1 to C7 (hype, firms like mine, cost, what happens on the call, who does the work, lock-in, guarantee) and §5.2 CMO rows M1 to M6 (report upward, measuring random answers, GEO vs SEO, clash with team, my category, paid too).

---

## Brief

1. **Search intent.** A referral or a brand search. Referral has been about 100% of acquisition (`CLAUDE.md` §3), so most readers already have our name from someone they trust. Thirty seconds ago they were reading an email or a LinkedIn message that mentioned us. Their question: what exactly do these people do, and is it real.
2. **AI-citation angle.** One liftable sentence: "Qognition Agency runs AI SEO and GEO for B2B companies and reports every AI answer with the prompt, the platform, the date and the sources it cited." Second liftable object: the four-layer table, verbatim from `CLAUDE.md` §1.
3. **Internal links.** Out: `/book` (via `#book`), `/contact#enquiry`, `/free-ai-audit`, `/free-ai-audit#scope`, `/services/ai-seo`, `/services/seo`, `/services/ppc`, `/industries`, `/industries/environmental-engineering-and-testing` (live on this branch, 404 in production until deploy), `/process`, `/case-studies`, `/case-studies/methodology`. In: global nav, footer, every location page. No orphan risk.
4. **The one claim this page owns.** Every AI answer we report carries its prompt, platform, date and cited sources, so the reader can re-run it. Iris (`01` §A.4) found no competitor of the seven publishing that set. It is a method commitment, not a result, so it survives O7 either way.

---

## Audit of the current page (working tree, 2026-10-07)

| Section | What it says now | Positioning | Objections not answered | §1 / §4 issues | Banned words, em dashes |
|---|---|---|---|---|---|
| Hero | Eyebrow "AI SEO and GEO for B2B firms". H1 "Get found. Get shortlisted. Build pipeline." Sub: "Help buyers discover your business across Google and AI search…" | AI SEO and GEO named in the eyebrow only. H1 could sit on any agency site | C1, C2 | None | None in strings. "guaranteed" appears negated in the platform disclosure (Ruth: prohibited-term grep will hit it) |
| HeroSnapshotPanel | Example buyer prompts by sector, "3 example questions", "Your buyer, your market, your next conversation." | Good. Shows Family B prompts as examples, clearly labelled | n/a | None. UK spellings ("moulding", "specialise") on an en-US site | None |
| BuyingProblem | "Make the shortlist worth finding." Three general paragraphs | Generic. Never says what an AI answer is or why you cannot see it | C1 | None | None |
| FourLayers | Four-layer table, PPC "scoped separately" | Correct. Local SEO surface string differs slightly from `CLAUDE.md` §1 | M3 answered | None | None |
| Industries | "Find the approach that fits your buyers." 3 cards (SaaS, manufacturing, professional services) + 18 names each captioned "AI SEO and GEO around your buying journey" | Card copy is generic. The repeated caption is boilerplate 18 times | M5 | Constant is named `EVIDENCED`; nothing is evidenced. Copy does not claim it, so no breach | None |
| Programme | Four phases, closing no-promise paragraph | Good. Closing paragraph is the best line on the page | C5 | None | None |
| Evidence | "Understand the work. Inspect the evidence." Two link cards, comparison note, library card | Right idea, abstract wording. Does not show what a report contains | M1, M2 partly | Cards open internal pages in a new tab with "↗" | None |
| BookCall | "Pick a time that works." Three generic bullets | No agenda, no length, no "who", no "what you leave with" | C3, C4, C5 | None | None |
| Snapshot | Eyebrow "Explore the audit", "Want to examine your website first?" | Name inconsistent with ads and audit page ("audit", "review", "report") | C1 | None | None |
| Fit | Left: who fits. Right list titled "Questions to bring" (constant named `DOES_NOT_FIT`) | Right column is the wrong content for a fit section | ICP disqualifiers missing | None | None |
| Faqs | "Six honest answers." Hard-coded count. Six Q&As | Good on guarantee and PPC. Misses cost, firms-like-mine, clash with agency, measurement | C2, C3, M2, M4 | None | "guarantee" in Q and A (negated) |
| FinalCta | "Make your expertise easier to discover." | Generic | n/a | None | None |

**Verdict: edit.** The structure and the evidence discipline are right. The words are general where they should be specific, and five buyer objections have no answer on the page.

---

## 1. Hero · `components/home/Hero.tsx`

**Eyebrow** (line 44). Nadia's string, `02-search-sprint.md` §3.3:

> AI-native growth agency for B2B: AI SEO and GEO

**H1** (lines 50 to 53). **Unchanged.** Nadia's §3.3 records "keep" for `/`, and her H1 decisions are final.

> Get found. Get shortlisted. Build pipeline.

**Decision D4, flagged, not pre-empted.** Marcus §5.6 rank 5 calls this H1 generic and asks for the locked `CLAUDE.md` §1 H1. That H1 cannot ship: `scripts/audit-headings.mjs` `HERO_BANNED` rejects "buyers are asking ChatGPT" (pattern 1) and "never checked the answer" (pattern 4). If the operator wants a more specific H1, this one passes all four gate patterns and keeps the §1 tension:

> Find out what AI search says when your buyers ask who to hire.

**Subhead** (line 55). Replaces "Help buyers discover your business…":

> We run AI SEO and GEO for B2B companies, including SaaS, with SEO and local SEO as the supporting layers and B2B PPC alongside. Every AI answer we report comes with the prompt, the platform and the date, so you can check it yourself.

**CTAs** (lines 59 to 69). Unchanged: `Book a call` (primary, `#book`), `Send an enquiry` (secondary, `/contact#enquiry`).

**Platform row label** (line 80). Unchanged: "Google and AI search platforms".

**Platform disclosure** (line 104). Removes the word "guaranteed":

> We agree which platforms matter for your market. A name here is not a partnership, and no one can promise you a place in any platform's answers.

---

## 2. Hero panel · `components/home/HeroSnapshotPanel.tsx`

| Line | Now | Replace with |
|---|---|---|
| 94 | Your buyers' questions | keep |
| 110 | Start with the questions behind the shortlist. | keep |
| 113 | Choose a sector to explore example research questions. These are prompts, not observed AI answers. | Pick a sector to see example buyer questions. These are prompts we would test, not answers we observed. |
| 31 | Compare injection moulding vendors with ITAR registration | Compare injection molding vendors with ITAR registration |
| 39 | Which law firms specialise in cross-border M&A under $50M? | Which law firms specialize in cross-border M&A under $50M? |
| 198 | Platforms to consider | Platforms we would test |
| 250 to 252 | Your buyer, your market, / your next conversation. | Your free audit uses your buyers' / questions, not these. |
| 289 | Use these examples to frame your own buying journey. A visibility review records actual answers, sources and dates separately. | These are examples. A free AI visibility audit records the actual answers, the sources they cited and the date we ran them. |
| 281 | Book a call | keep |

Mira: the "3" at line 243 is typed. Derive it from `sector.prompts.length` so it cannot drift.

---

## 3. The buying problem · `components/home/BuyingProblem.tsx`

**Eyebrow:** keep "The buying problem".

**H2** (line 17):

> Your analytics can't show you what an assistant said about you.

**Paragraph 1** (line 23):

> A buyer can ask ChatGPT, Perplexity or Google's AI Mode for a shortlist before visiting a single vendor site. The answer draws on your pages and on what other sites say about you.

**Paragraph 2** (line 26):

> Your analytics only see the buyers who click through. They cannot show you an answer that named a competitor instead, or one that described your firm wrongly. The only way to know is to ask the question yourself, on each platform, and write down the date.

**Paragraph 3** (line 29):

> That is where we start. We test the questions your buyers ask and record what each platform returned. Then we work on what you control: your site, your company facts and the sources that describe you.

**Blockquote** (line 39):

> We work on what you can control, and we date what you can't.

---

## 4. The four layers · `components/home/FourLayers.tsx`

**Eyebrow, H2:** keep ("The four layers", "Four surfaces, / four different jobs.").

**Intro** (line 46):

> AI SEO and GEO are different surfaces from SEO, and from each other. We use the definitions below on every page, in every report and on every call.

**Table.** `surface` strings verbatim from `CLAUDE.md` §1. One change, Local SEO, to match it character for character. `moves` strings: one edit (GEO).

| `layer` | `surface` | `moves` |
|---|---|---|
| AI SEO | Google AI Overviews and AI Mode | keep: "Passage-level clarity, entity definition, content Google can extract and attribute" |
| GEO | ChatGPT, Perplexity, Gemini, Claude, Copilot | What your site states, what third-party sources say about you, and whether your company name resolves to you |
| SEO | Google search results | keep: "Technical health, page structure, topical depth, links" |
| Local SEO | **Google Maps, local pack, Bing Places, Business Profile, reviews, listings** | keep: "Accurate profiles, relevant categories, authentic reviews and consistent listings" |

**Closing paragraph** (line 110):

> Start with the layer you need. We scope the work around your products and markets, and add local SEO only where location shapes the buying decision. B2B PPC runs alongside the four layers and is scoped separately, priced as a share of ad spend with a monthly minimum. A firm that wants only PPC is a full client.

Two flags for Ruth and the operator:
- **D5.** "Priced as a share of ad spend with a monthly minimum" states a pricing model, not a price, range or tier. `CLAUDE.md` §1 and Marcus's RSA ("Priced on Ad Spend") both say it publicly. Ruth rules whether the 2026-10-03 no-prices rule covers it. If yes, cut the clause after "scoped separately". **Ruth, 2026-10-07: allowed.** It is a pricing basis, not a price, range or tier. Never add the percentage or the minimum figure.
- **D6.** "Start with the layer you need" follows `CLAUDE.md` §2 (ICP lock, 2026-09-28: any one of AI SEO, SEO or PPC qualifies). It contradicts the older §1 line "All four are in every retainer and are never sold separately". **D6 decided (operator, 2026-10-07): a client can start with any one layer. `CLAUDE.md` §1 updated; hold released.** The PPC-only sentence is not part of D6: PPC sits outside the four layers (`CLAUDE.md` §1) and a PPC-only firm is in the ICP (§2).

---

## 5. Industries · `components/home/Industries.tsx`

**Eyebrow:** keep "Who we build this for".

**H2** (line 52):

> A software demo, an RFQ and a consultation need different pages.

**Intro** (line 55):

> We write to the person who approves the purchase: an engineer checking a spec, an IT lead comparing integrations, a finance leader looking for sector expertise. Each one needs a different page and a different next step.

**Cards** (the `EVIDENCED` array, lines 20 to 37). Mira: rename the constant to `FEATURED`. Nothing in it is evidence, and the name invites someone to write copy that says it is.

| `name` | `detail` | `buyer` |
|---|---|---|
| B2B SaaS and software | Pages that answer the integration, security and implementation questions a buying team asks before the demo. We test the comparison prompts they run, such as one vendor against another for a company their size. | A buying team comparing integrations, security reviews and implementation effort. |
| Industrial and manufacturing | Pages built on process, material, tolerance and certification, so an engineer can shortlist you before asking for a quote. We test supplier prompts such as "ISO 9001 and AS9100 certified CNC machining suppliers". | An engineer or sourcing lead checking certifications, capacity and lead times. |
| Professional B2B services | Practice pages that show what you do, for whom and where. We test the prompts a CFO or general counsel uses to find a firm for a specific deal or problem. | A CFO, general counsel or founder choosing an adviser for a specific matter. |

**Card label** (line 90): keep "Buyer journey".

**Other sectors.** The caption "AI SEO and GEO around your buying journey" repeats 18 times (line 125). Replace it with the first three sub-sector names from the same accessor, which `app/industries/page.tsx` already uses: `card.subNames.slice(0, 3).join(' · ')`. Mira's call; no new data.

**Label** (line 118): keep "Explore other B2B sectors".

**Disclosure** (line 131):

> Listing a sector means we sell AI SEO, GEO, SEO and PPC into it. It is not a claim that we have worked with a firm in it. If your sector is not listed, you can still book a call.

**Buttons** (line 136). Keep "See every sector" (`/industries`). Add a second, text-style, **only once this branch is deployed**:

> Read our environmental testing and TIC pages → `/industries/environmental-engineering-and-testing`

---

## 6. Programme · `components/home/Programme.tsx`

**Eyebrow, H2:** keep ("How the programme works", "From buyer questions to sales conversations.").

**Lead** (line 44):

> One scope and one review rhythm, agreed in writing before work starts.

**Phases** (`PHASES`, lines 6 to 27):

| `n` · `window` | `title` | `body` | `deliverable` |
|---|---|---|---|
| 01 · Discovery | Understand the buying decision | We learn what you sell, who approves it and which questions put a firm on their shortlist. Then we fix a prompt set and run the first baseline. | A buyer brief, the prompt set and a dated baseline on the agreed platforms. |
| 02 · Foundations | Make your firm easy to read | We fix what stops search engines and assistants reading you correctly: crawl and indexing problems, unclear service pages and inconsistent company facts. | A prioritized list of fixes, each with an owner and a date. |
| 03 · Authority | Support the claims buyers check | AI answers cite sources beyond your own site. We find the publications, directories and associations your buyers trust, and work on getting them to describe you accurately. | An authority plan built on real expertise, with every external claim checked. |
| 04 · Review | Compare against the baseline | We re-run the same prompt set on the agreed schedule. AI answers, rankings and qualified enquiries are reported in separate columns. | A dated comparison and the next priorities. |

**Closing paragraph** (lines 113 to 117). Keep, one comma removed:

> We do not control ChatGPT, Google or Perplexity, and we will not tell you when you will appear in them. What we commit to is the work, the measurement and the dated record of both.

**C5 "Who does the work?"** Not answerable today. `[NEEDS DATA: who runs client engagements, by role]`. Add a line here only when the operator supplies it.

---

## 7. Evidence · `components/home/Evidence.tsx`

**Eyebrow** (line 28): How we report

**H2** (line 30):

> Every answer we report has a date on it.

**Intro** (lines 33 to 35):

> AI answers change with the prompt, the platform and the day, so a single visibility score tells you little. We report each observation with the prompt we used, the platform, the date and the sources the answer cited. You can re-run any of it yourself.

`[CONFIRM before ship: whether the free audit and client reports also record the model version per answer. If yes, add "the model version" after "the platform". That is the column Iris found no competitor publishes.]`

**Cards** (`SOURCES`, lines 7 to 20):

| Field | Card 1 | Card 2 |
|---|---|---|
| `kicker` | Before we start | In every report |
| `title` | We fix what to measure | Separate columns, never blended |
| `body` | The prompt set, platforms, markets and review dates go into your proposal. Changing any of them needs a recorded reason, so this month compares with last month. | Technical fixes delivered, Google rankings, AI answers observed, referral visits and qualified enquiries. Each has its own column, because a citation is not a lead and a ranking is not a citation. |
| `caveat` | Fixed before the baseline run. | Targets are labelled as targets until results replace them. |
| `source` | How an engagement runs | How we handle evidence |
| `date` | Process | Methodology |
| `href` | `/process` | `/case-studies/methodology` |

Mira: both cards link internal pages with `target="_blank"` and "↗". Open in the same tab and drop the arrow (Marcus §5.6 rank 6c makes the same point for `/pricing`).

**"A record you can compare"** H3: keep. Paragraphs (lines 89 and 92):

> Ask the same question twice and you can get two answers. So we fix the sampling method first, and we record the answers and sources behind every report.

> A mention in an answer does not prove a buyer became a customer. We review AI answers next to your enquiries and sales feedback, and say which is which.

Button: keep "How we handle evidence".

**Library card** (lines 102 to 111). O7 decided 2026-10-07: these are client programmes. No count (operator has not confirmed the B2B-relevant number) and no result claims (KPIs are targets):

- Label: Client programmes
- H3: See how we plan and measure a client programme.
- Body: Each client programme sets out the business problem, our approach and a measured baseline. Every KPI is labelled as a target until client reporting fills in the result. These programmes are for HVAC, dental and commercial insurance businesses, so read them for the method, not as proof of work in your sector.
- Three labels: "Business problem", "Our approach" (was "Proposed approach"), "Evidence status".

**Optional method line, gated (D9).** Ship only if the operator confirms Scriblr does this in production today. `docs/icp-positioning.md` v2.1: describe the engines "only through verified capabilities".

> We run this on Scriblr, software built by our sister company Qognition Labs. It stores each raw answer, the cited URLs and the model version, so every figure traces back to a saved answer with a date.

**Proof band (Marcus §5.1 C2).** Still withheld. O7 now allows "client programmes", but Marcus's band leads with a count ("45"), and the operator has not confirmed the B2B-relevant number. HVAC and dental never appear as B2B proof (authority block, 2026-10-07). Revisit when the count arrives.

---

## 8. Book a call · `components/home/BookCall.tsx`

**Eyebrow:** keep "Book a call".

**H2** (line 19):

> 30 minutes. Here is what we cover.

Dependency: 30 matches the calendar ("Discovery Call, 30 min", commit `c95b929`). If the calendar changes, this changes.

**Body** (line 22):

> Bring your website and the buyers you want to reach. It is a working conversation about your situation, not a slide deck.

Add when known: "You will speak with [NEEDS DATA: name and role of who takes the call]." (C5)

**Agenda bullets** (lines 26 to 29):

1. Who you sell to, and the questions your buyers ask before they shortlist.
2. What we would check first in Google and AI search, and why.
3. Whether we are the right fit. If we are not, we will say so.

**Line under the bullets, new** (C3):

> After the call you get a written scope and fee [NEEDS DATA: within N business days].

Ship it with N filled, or ship "After the call you get a written scope and fee." without a time. Never with a guessed N.

**Fallback line** (line 43): keep "Prefer to write? Send an enquiry with the challenge you want to solve."

---

## 9. Snapshot · `components/home/Snapshot.tsx`

N1 decided 2026-10-07: "Free AI visibility audit" everywhere. O5 decided: free, no turnaround promise.

**Eyebrow** (line 25): Free AI visibility audit

**H2** (line 27):

> Want to see the answers first?

**Body** (line 30):

> Send us your website and the buyers you want to reach. A person on our team tests a sample of their questions on the agreed AI platforms and Google, checks your site's technical readiness, and sends you what they found, with dates. It is free, and there is no obligation to book.

**Buttons** (lines 33 to 38):
- Primary: `Request your free audit` → `/free-ai-audit#request` (Mira: the form needs that id)
- Secondary: `What the audit covers` → `/free-ai-audit#scope` (keep the anchor; confirm the id exists)

**Steps H3** (line 49): How it works

**Steps** (`STEPS`, lines 7 to 12). No turnaround promise:

1. You send your website and the buyers you want to reach.
2. A person on our team reviews it and chooses the buyer questions to test.
3. We test those questions on the agreed platforms and record each answer with its date and cited sources.
4. You get the findings and the first fixes we would make. We confirm timing when we reply.

**Second column H3** (line 72): keep "Read findings in context". Paragraph 1: keep. Paragraph 2 (line 79):

> Each finding carries its date, method and scope. A clean technical check does not mean AI platforms will name you, and a citation does not mean revenue.

---

## 10. Fit · `components/home/Fit.tsx`

**Eyebrow, H2:** keep ("Fit", "Start with the business you want to win.").

**Intro** (line 60):

> A short check before you book. It saves us both a call.

**Left list** (`FITS`). Title: keep "Worth a conversation if".

1. You sell to other businesses, and a purchase takes weeks of evaluation, not minutes
2. You want AI search, SEO or PPC. Any one of them is enough to start
3. Referrals have carried your growth and you want a second channel
4. Someone at your firm can approve and publish website changes
5. You want enquiry quality measured, not just traffic

**Right list.** Mira: rename `DOES_NOT_FIT` to `NOT_A_FIT` and change the title. The current "Questions to bring" content moves into the BookCall agenda (§8). Title:

> Probably not a fit if

Items, from the `CLAUDE.md` §2 disqualifiers. No revenue floor, per `docs/icp-positioning.md` v2.1 ("rather than exposing … revenue floors"):

1. You are pre-revenue
2. You sell mainly to consumers, or sell low-ticket products online
3. You need leads this week
4. You want a one-off project rather than ongoing work
5. You cannot edit your own website
6. No one at your firm follows up on enquiries

---

## 11. FAQs · `components/home/Faqs.tsx`

`HOME_FAQS` feeds both the page and `faqSchema()`. Every edit here changes the JSON-LD too.

**Eyebrow:** keep "Before we talk".

**H2** (line 48). Count-free, so it cannot go stale:

> Before you book a call.

**Entries:**

| # | Code | `q` | `a` |
|---|---|---|---|
| 1 | M3 | What is the difference between AI SEO and GEO? | AI SEO is the work on Google AI Overviews and AI Mode. GEO is the work on assistants: ChatGPT, Perplexity, Gemini, Claude and Copilot. SEO covers Google search results, and local SEO covers Maps, the local pack, Business Profile, reviews and listings. They share foundations, but we measure each one separately. |
| 2 | C7 | Can you guarantee AI recommendations or rankings? | No. Google and the AI platforms control their own answers. We commit to the agreed work and a dated record of what we observed: the prompt, the platform, the date and the sources cited. A single citation is not a permanent position, and it is not revenue. |
| 3 | M2, M1 | How do you measure something that changes every time you ask? | We fix the prompt set and the platforms before the first run, then re-run the same set on the agreed schedule. Each answer is recorded with its date and cited sources, so changes can be compared and checked. AI answers, rankings, referral visits and qualified enquiries are reported in separate columns. |
| 4 | C2 | Have you worked with firms like mine? | Ask us on the call and we will answer for your sector specifically. Where we have not worked in your category, we say so. Either way, your free AI visibility audit tests your own buyers' questions against your own competitors before you commit to anything. |
| 5 | C3 | What does it cost? | We don't publish prices, because the fee depends on scope: how many buyer questions we track, which platforms and markets, and how many pages and assets we produce. You get a written scope and fee after the call. PPC management is priced separately, as a share of ad spend with a monthly minimum. |
| 6 | M4 | Will this clash with our team or current agency? | It shouldn't. We can work as the specialist layer beside your marketing team, your developers or another agency. The proposal names who owns each task, who approves content and who follows up on enquiries. |
| 7 | M6 | Can you run PPC too? | Yes. We run Google Ads and LinkedIn campaigns for B2B firms, built around the same buyers and pages as the search work. A firm that wants only PPC is a full client. Ad spend is agreed with you and kept separate from our fee. |
| 8 | C6 | Is there a minimum term? | **Ship only when filled.** `[NEEDS DATA: minimum term and how a client ends the engagement]`. Until then, cut this entry. |

Notes for Ruth:
- Q2 keeps the word "guarantee" because it is the buyer's own question and the answer is "No". The guardrail grep for "guaranteed" will not hit it. Ruth decides whether the verb form is acceptable.
- Q4 makes no claim about past clients and no count. It stays as written under O7 (client programmes, no count yet).
- Q5 and Q7 carry the D5 pricing-model clause. Cut both clauses together if Ruth rules it out.
- Q7: Microsoft Advertising cut by Ruth (2026-10-07) as unconfirmed. Add it back only when `[CONFIRM: the team runs Microsoft Advertising accounts today]` is answered yes.

---

## 12. Final CTA · `components/home/FinalCta.tsx`

**H2** (lines 14 to 17). Two `MaskReveal` spans; the second takes the accent colour:

> See what AI search says about you, / **with the date on it.**

**Body** (line 23):

> Book a 30-minute call. Bring your website and the buyers you want to reach, and we will tell you where we would start.

**CTAs:** keep `Book a call` (`#book`) and `Send an enquiry` (`/contact#enquiry`).

---

## Not changed

- `components/shared/ExitIntentPopup.tsx`: out of scope for this pass.
- Title and meta description (`SEO_OVERRIDES['/']`): Nadia's, final.

## Decisions this page depends on

- **O7** decided: "client programmes" allowed (library card). Still no count and no result claims. Proof band withheld until the operator confirms the B2B-relevant count.
- **N1** decided: "Free AI visibility audit".
- **O5** decided: free, no turnaround promise. "We confirm timing when we reply."
- **D4** homepage H1: keep (Nadia) or the gate-safe alternative above.
- **D5** publishing the PPC pricing model.
- **D6** decided 2026-10-07: start with any one layer. FourLayers closing sentence and Fit item 2 released.
- **D9** naming Scriblr before its capability is verified.

## NEEDS DATA

- Who takes the walkthrough call (name, role).
- Days from call to written scope and fee (N).
- Minimum term and exit terms.
- Whether reports record the model version per answer.
- Whether Scriblr stores raw answers, cited URLs and model versions in production today.
- Whether the team runs Microsoft Advertising accounts.
