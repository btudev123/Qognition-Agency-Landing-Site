# "AI search is winning" · sitewide message and selling copy

**Author:** Theo (content) · 2026-10-08
**Status:** Wired into the preview build on `main`, committed locally 2026-10-14. Applied except Ruth FIX items: the B2B card service-mix label (ProgrammeCard.tsx:82) and two plain-English lines (Programme.tsx:10, Faqs.tsx:29). Production still needs operator approval.
**Gate:** Ruth, 2026-10-08. **FIX**, with edits applied in place below.
- **G2 holds:** lifted on Iris's verification (`docs/research/2026-10-g2-answer-economy-verification.md`), in the report's own wording. "One in three" and the 29% stay out.
- **H1:** the operator kept "Be the firm {platform} names ..." as a written §4 amendment for that H1 only. See D-H1.
- **Cleared for Mira's preview build.** One condition remains before production: a human matches the three G2 strings on the report page in a browser.
**Authority:** `CLAUDE.md` authority block, 2026-10-08 "Messaging: AI search is winning" and "Plain English everywhere"; §1, §2, §4, §10. Operator course correction via MARS, 2026-10-08: sell AI SEO, GEO and SEO as an AI-native growth agency to B2B firms, write for high-intent search, structure every page as a selling page.
**Supersedes, where they conflict:** `docs/copy/2026-10/home.md` v5 and the strings in `docs/copy/2026-10/plain-english-templates.md` for the fields named below. Everything not named here stays as built.
**Fixed and not touched:** titles, meta descriptions, H1s and URLs on all priority pages (`memory/priority-pages-keywords.md`). H1 alternatives appear only as operator decisions.

---

## 0. The brief

1. **Search intent.** Two readers. (a) A referral or brand search: someone heard our name and is checking whether we are real. (b) A B2B owner, CEO or marketing lead searching for an agency right now: "AI-native growth agency", "GEO services", "AI search optimization", "enterprise SEO agency", "PPC agency", or asking an assistant "how do I get my company recommended by ChatGPT". Thirty seconds ago (b) typed their category into ChatGPT, saw a competitor named, and went looking for someone who fixes that.
2. **AI-citation angle.** One liftable sentence: "Qognition Agency is an AI-native growth agency that runs AI SEO, GEO and SEO for B2B firms and reports every AI answer with the prompt, the platform, the date and the sources it cited." Second liftable object: the four-layer table from §1, unchanged. Nadia owns the citation-led FAQs in §2.10 and §7.
3. **Internal links.** Out from `/`: `#book`, `/contact#enquiry`, `/free-ai-audit`, `/services/ai-seo`, `/services/seo`, `/services/ppc`, `/industries`, `/case-studies`, `/case-studies/brixio`, `/case-studies/methodology`. Out from service pages: `/book`, `/contact#enquiry`, `/free-ai-audit`, `/case-studies/<id>` for the proof shown. In: global nav, footer, every location page, every §7 article. No orphan risk.
4. **The one claim this message owns.** We show our work. Named B2B clients with dated results, and every AI answer we report on the record with its prompt, platform, date and sources. In this category the visible competition is mostly self-ranking lists with no dated client result (§1, observed 2026-09-28 and 2026-09-29). Being the firm that shows its work is the market-leading claim, stated in a form a sceptic can check.

**How fear and desire are used.** Fear is never asserted about the reader. The reader runs the check and supplies the fear themselves. Desire is stated as what we work toward, never as an outcome we promise. That is how the copy stays urgent and still passes §4.

---

## 1. The message house

### Core line

> **Be the firm AI names when your buyers ask who to hire.**

Ruth, 2026-10-08: this is an internal brief line. Never render it as a standalone headline. On its own under our name, it says we deliver placement (§4, §11). On the page, say it as the work: "give it reasons to name you", as §2.11 already does.

### The check (the fear device, used everywhere)

> **Ask ChatGPT who to hire in your category. Is your name in the answer?**

### The proof line

> **Named B2B clients. Dated results. Every AI answer on the record.**

### Positioning sentence (for About, schema descriptions, LinkedIn bios)

> Qognition Agency is an AI-native growth agency. We run AI SEO, GEO and SEO for B2B firms, with B2B PPC alongside, and we report every AI answer with the prompt, the platform, the date and the sources it cited.

### Three fear proofs

| # | Proof | Why it is safe | Where it is used |
|---|---|---|---|
| F1 | **The answer names firms. Check it.** Ask ChatGPT, Perplexity, Gemini, Claude or Google's AI Mode who to hire for what you sell. The answer comes back with names. | The reader runs it today. We claim nothing about their result. | Hero, BuyingProblem, FinalCta, every service `whyNow` |
| F2 | **Software buying already starts there.** In G2's survey of 1,076 B2B decision-makers, fielded in March 2026 and published 15 April 2026, 51% said they start their software research with an AI chatbot more often than Google. In the same report, AI chatbots are the #1 source influencing which vendors make buyer shortlists. Source: [G2, "The Answer Economy"](https://learn.g2.com/g2-2026-ai-search-insight-report). | **Hold lifted by Ruth, 2026-10-08, on Iris's verification** (`docs/research/2026-10-g2-answer-economy-verification.md`). The wording is the report's own: "start their software research with an AI chatbot more often than Google" and "the #1 source influencing which vendors make buyer shortlists". The sample is described as the methodology describes it ("B2B decision makers"), and "software" stays inside the finding, so the scope cannot widen. Removed: "now the top source" and "ahead of review sites …" (news-post gloss only). **Scope is software buying.** Never write "B2B buyers start with AI". G2 sells to software vendors and has a commercial interest in this finding; attribute it to G2 in the sentence every time. **Before production:** a human matches both strings in a browser (Iris's stated method limit). | BuyingProblem P2, `/services/ai-seo` whyNow, SaaS industry pages |
| F3 | **Your analytics cannot see it.** An answer that named a competitor leaves no trace in your reports. Analytics only count the buyers who click. | A mechanism the reader can confirm in their own GA4. No number. | BuyingProblem P3, GEO whyNow |

**Ruth's call on the optional point: declined, and it stays declined.** Iris verified that the 29% exists (2026-10-08). It measures a different item ("via platforms like ChatGPT") on a different sample. Even verified, putting 29% (2025) beside 51% (2026) invites the reader to do the subtraction the note forbids. That makes it a growth claim drawn from two different samples. Do not use it. Original note: G2's May 2025 survey (1,169 B2B decision-makers, April 2025) put the "start with ChatGPT more often than Google" figure at 29%. Source: [G2, 2025 Buyer Behavior Report](https://company.g2.com/news/buyer-behavior-in-2025). Different sample and year, so it may be cited **beside** the 2026 figure but never subtracted from it as a growth rate.

### Three desire proofs

| # | Proof | Source | Where it is used |
|---|---|---|---|
| D1 | **Named B2B clients, dated results.** Brixio (enterprise security and cloud, UAE): 92 qualified leads, 32 meetings booked and 9 sales opportunities, 3 March to 21 September 2026, from AI SEO, GEO, expert content and LinkedIn outreach. Sophos (managed detection and response, US): 111 qualified leads and 10 sales opportunities, 1 January to 21 September 2026, from LinkedIn outreach, lead generation, AI SEO and GEO. Talentera (recruitment software, Saudi Arabia): 124 qualified leads, 15 June to 21 September 2026, from LinkedIn ads, lead generation and AI SEO. LinkedIn ads on US$20,000 media spend produced 58 of them, at US$345 per qualified lead. | `data/case-studies/b2b.ts`. "Confirmed by the client's own reporting, for the dates shown." | Evidence, service proof, PPC FAQ, optional hero proof line |
| D2 | **The answer can change which vendor gets picked.** In G2's survey of 1,076 B2B decision-makers, fielded in March 2026 and published 15 April 2026, 69% said that an AI chatbot led them to select a different software vendor than initially planned. Source: [G2, "The Answer Economy"](https://learn.g2.com/g2-2026-ai-search-insight-report). | **Hold lifted by Ruth, 2026-10-08, on Iris's verification.** The wording is the report's, verbatim from "said that". Cut: "because it appeared in the chatbot's recommendation" (the news post's stronger "simply because" gloss), and "one in three" (not in the report). Theo's heading "can win deals you did not know were open" rested on "one in three", so it is replaced. It is a self-reported attribution, not observed purchasing, so never write "AI chatbots changed 69% of purchases". **Before production:** a human browser match, as for F2. | `/services/ai-seo` whyNow, §7 articles |
| D3 | **You can check our work.** Every AI answer we report carries the prompt, the platform, the date and the sources it cited, so you can re-run it yourself. | Our method, verifiable on any report we send. | Evidence, Programme, FAQs, chips |

**Attribution rule for D1, non-negotiable.** Each client's results came from a mix of services. Every line names the mix. Never write "AI SEO produced 92 leads". Falcon Security's programme was outreach and lead generation with no search work, so Falcon never appears as AI SEO, GEO or SEO proof.

**Not used, and why.** A summed total across the four clients (441 qualified leads) was considered and dropped. The four windows differ, and Falcon's total would be read as search proof on an AI-search page.

### Objections, with the answer the copy gives

| Objection | Answer on the site | Where |
|---|---|---|
| "Can you guarantee ChatGPT will recommend us?" | No. No one controls what an AI tool says. We commit to the work and a dated record of every answer, so you can see what moved. | Home FAQ, service FAQs, chips |
| "Our buyers don't use ChatGPT." | Maybe not. Ask your sales team where new prospects say they first heard of you. Then ask ChatGPT the question your buyer would ask, and see which firms come back. If you sell software: in G2's March 2026 survey of 1,076 B2B decision-makers, published 15 April 2026, 51% said they start their software research with an AI chatbot more often than Google. | AI SEO whyNow, home FAQ |
| "Isn't this just SEO with a new name?" | No. SEO is Google's results. AI SEO is Google's AI Overviews and AI Mode. GEO is assistants such as ChatGPT. They share foundations, and we measure each one apart, because a page can rank and still not be named. | Home FAQ, GEO FAQ |
| "We get all our work from referrals." | Good. A referred buyer still checks you before they call. Ask what ChatGPT says when they do. | Fit list |
| "AI traffic is too small to matter." | The answer can shape the shortlist without sending a click, so traffic undercounts it. That is why we report answers, visits and qualified enquiries in separate columns. | Evidence, GEO page |
| "How do you measure something that changes every time?" | A fixed question list, fixed platforms, the same schedule, every answer stored with its date and sources. | Home FAQ |
| "Can't we just add a file or some code?" | No single file or snippet makes an AI tool recommend you. We add them where they describe your pages accurately. | AI SEO FAQ |
| "Have you done this in my industry?" | Ask us on the call. Where we have not, we say so. Your free AI visibility audit tests your own buyers' questions either way. | Home FAQ |
| "What does it cost?" | Scoped, not published. A written scope and fee after the call. PPC is priced as a share of ad spend with a monthly minimum. | Home FAQ |
| "Will this clash with our agency?" | No. We work as the specialist layer beside your team or agency, and the proposal names who owns each task. | Home FAQ, chips |
| "How fast?" | Fixes on your site can be checked the day they go live. AI answers depend on each tool and on other sites, so we do not promise a date. Paid search is the lever you can pull this month. | AI SEO FAQ, PPC whyNow |

---

## 2. Homepage `/`

**Title and meta: unchanged.** `SEO_OVERRIDES['/']` in `lib/seo.ts` line 32 to 34 stays: "AI-Native B2B Growth Agency: AI SEO & GEO | Qognition Agency". Note for Mira, not a copy change: `app/page.tsx` lines 8 to 10 carry a different fallback title and description that the override replaces. No proposal.

Section order in `components/AcquisitionHome.tsx` is unchanged. It already runs offer, why now, what we do, who for, how it works, proof, book, audit, fit, objections, CTA.

### 2.1 Hero · `components/home/Hero.tsx`

| Line | Now | Replace with |
|---|---|---|
| 46 | AI-native growth agency for B2B: AI SEO and GEO | AI-native growth agency for B2B · AI SEO, GEO and SEO |
| 52 to 55 (H1) | Get found. Get shortlisted. Build pipeline. | **Unchanged.** See decision D-H1 below. |
| 57 (subhead) | We run AI SEO and GEO for B2B companies, including SaaS, with SEO and local SEO as the supporting layers and B2B PPC alongside. Every AI answer we report comes with the prompt, the platform and the date, so you can check it yourself. | When a buyer asks ChatGPT or Google's AI who to hire, the answer names firms. We run AI SEO, GEO and SEO for B2B firms, including SaaS, with B2B PPC alongside. The work is on the pages and sources those answers draw from, and every AI answer we report comes with its prompt, platform and date. |
| 62 | Book a call | keep |
| 70 | Send an enquiry | keep |
| 82 | Google and AI search platforms | keep (Ruth: "Where we check your name" sits in the same section as the tracker panel and frames it as a check on the reader's firm. R7.) |
| 106 | We agree which platforms matter for your market. A name here is not a partnership, and no one can promise you a place in any platform's answers. | keep |

**Optional new proof line (operator decision D-PROOF, new element for Mira).** Proof near the button is the strongest conversion move left on this page.

Ruth, 2026-10-08: **not inside the hero `<section>`.** The hero holds the unlabelled tracker panel. A named client's figures under the CTAs, a few centimetres from a screen with no badge, reads as that client's data (ADR-0006 §12.3 "Not client data", §12.6). Place it as the first line of `BuyingProblem` or at the top of `Evidence`. The wording itself is cleared against `data/case-studies/b2b.ts`.

> Brixio, UAE: 92 qualified leads and 9 sales opportunities, 3 March to 21 September 2026, from AI SEO, GEO, content and outreach. Confirmed by Brixio's own reporting. [Read the case study](/case-studies/brixio)

**Decision D-H1, for the operator. The H1 is locked; these are alternatives, not changes.** All three pass `scripts/audit-headings.mjs` `HERO_BANNED` as written (checked against the four patterns: none says "buyers ask(ing) AI", none says "AI is naming", none says "most/many firms").

| Option | H1 | Case for it | Risk |
|---|---|---|---|
| Current (keep) | Get found. Get shortlisted. Build pipeline. | Approved, passes the gate, carries the desire. | Could sit on any agency's site. Does not contain the page's target keyword. |
| A · keyword | The AI-native growth agency for B2B. Be the firm AI search names. | Puts the priority keyword "AI-native growth agency" in the H1, where it currently appears only in the eyebrow and title. Core line in seven words. | Ruth may read "Be the firm AI search names" as a promise. It is an imperative, the same register as "Get found". Nadia holds the H1 decision for `/`. |
| B · the check | Ask ChatGPT who to hire in your category. Is your name in the answer? | Fear the reader verifies, in the most visible line on the site. Nothing asserted. | No service named in the H1; the subhead has to carry the offer. |
| C · desire | Be the firm ChatGPT names when your buyer asks who to hire. | The core line, personal and concrete. | Same promise reading as A, and it names one platform. |

**Recommendation: A**, if the operator wants a change. It is the only option that improves both the message and the ranking for the page's own keyword.

**Ruth's rulings under §4, 2026-10-08.** The test is the net impression of the line under our name, not its grammar. "Get found" names no third-party system and promises no state in one. "Be the firm X names" does both.

| Option | Ruling | Why | Cleared alternative |
|---|---|---|---|
| Current | **Passes.** | No third-party system, no outcome promised. | n/a |
| A | **Fails §4 as written.** | "Be the firm AI search names", under the agency's own name, says that hiring us gets you named. That is placement in a third-party system: §4 "No guarantee", §11 "Promising ... AI placement". It is the same promise §1 records the operator rejecting ("We make sure it says you"); the imperative only changes the grammar. "The AI-native growth agency" also claims a market position with the definite article (guardrails: superlative or market-position claims without a source). | **AI-native growth agency for B2B. Give AI search reasons to name you.** It keeps the keyword, describes the work rather than the result, and passes `HERO_BANNED`. |
| B | **Passes §4. Fails R7 in this position.** | Asserts nothing, promises nothing. But the H1 shares the hero `<section>` with the tracker panel, which shows "Your firm" against five platforms. The question "Is your name in the answer?" next to a panel that looks like the answer is the read-through ADR-0006 §12.6 warns about, and §12.3 says fear lines "never point at the screen as evidence about the reader". | Usable only if the panel leaves the hero, or if the operator adopts the §12.5 visible disclosure. Both are operator decisions. |
| C | **Fails §4.** | Same promise as A, more personal. "When your buyer asks who to hire" also presupposes the reader's buyers' behaviour, which `HERO_BANNED` exists to block (the regex misses it only because of "asks"). It names one platform. | See the operator variant below. |

**Operator variant of C (chosen 2026-10-08, relayed by MARS, Mira building).** Visible: "Be the firm {ChatGPT | Claude | Gemini | Perplexity} names when your buyer asks who to hire.", with the platform word on a rotating reel with logos. Accessible text: "Be the firm ChatGPT, Claude, Gemini or Perplexity names when your buyer asks who to hire."

**DECISION, operator 2026-10-08: kept, as a written §4 amendment for this H1 only** (CLAUDE.md authority block, "Homepage H1, operator 2026-10-08"). The operator saw Ruth's ruling below and the cleared alternative ("Give {AI} reasons to name your firm"), and chose to keep this line.
- **Built H1, final:** "Be the firm {ChatGPT | Claude | Gemini | Perplexity} names when your buyer asks who to hire."
- **Served H1 text, stable and complete:** "Be the firm ChatGPT, Claude, Gemini or Perplexity names when your buyer asks who to hire."
- **Motion:** the reel spins once, settles in under 5 seconds and replays on hover. It is therefore not a second continuously rotating element under §9, which closes Ruth's §9 flag below. Under reduced motion, render the served sentence and no spin.
- **The amendment does not travel.** Every other line on the site stays under §4's ban on promising placement, including the core line in §1, FinalCta, the CTAs, service pages, ads, decks and outbound. Nobody may cite this H1 as precedent for a second "Be the firm … names" line. Ruth will fail any line that does.
- **Conditions the amendment does not lift:**
  - The platform row's "A name here is not a partnership …" (`Hero.tsx` line 106) stays in the hero section. It is now the only thing in that section separating four third-party logos from an endorsement.
  - No subhead, chip or caption in the hero may say whether the reader is named (R7).
  - ADR-0006 §12.8 still applies. One report that a reader took the panel as their own result goes to the operator.

Ruth's original ruling, kept for the record:

**Ruling: fails §4. Not cleared.** It is option C with four platforms instead of one, so it promises more, not less. The reel makes it worse in two ways:
- The words that spin are the platforms' names and logos, set in the H1 directly beside a panel tracking "Your firm" in those same columns. That points the headline at the screen (R7).
- Four third-party logos in our H1 read as an association. The platform row needs "A name here is not a partnership" for exactly that reason, and the H1 has no such line.

The 2026-10-08 messaging bullet allows desire, and in the same breath says §4 still applies: no guarantees. A desire line passes when it describes the work. It fails when it describes the result in a system we do not control.

**Cleared wording, same mechanic, same reel:**
- Visible: **Give {ChatGPT | Claude | Gemini | Perplexity} reasons to name your firm.**
- Accessible H1 text: **Give ChatGPT, Claude, Gemini and Perplexity reasons to name your firm.**
- Optional tail, if the operator wants the buyer moment: "...when a buyer asks who to hire." Use "a buyer", not "your buyer", so the line does not assert anything about the reader's own buyers.

This passes `HERO_BANNED`. It describes what we do, and it keeps the desire and the reel.

If the operator wants "Be the firm ... names" anyway, that is an amendment to §4, and the operator has to make it in writing in the authority block. A gate cannot grant it. (Done by the operator on 2026-10-08. See DECISION above.)

Two non-copy flags for MARS:
1. A second auto-rotating element in the hero needs an operator exception to §9's no-auto-rotation rule. The tracker run is currently the only one. It also needs reduced-motion handling and a pause control, and the accessible text must not change as the reel moves.
2. Under reduced motion, the static H1 should render the accessible sentence, not a single platform name.

**Housekeeping for MARS.** `CLAUDE.md` §1 "Positioning copy" still lists the H1 "Your buyers are asking ChatGPT who to hire. Most firms have never checked the answer." That line fails `HERO_BANNED` patterns 1, 3 and 4 and is not what is built. §1 should point at the built H1 so nobody restores it.

### 2.2 Why now · `components/home/BuyingProblem.tsx`

| Line | Now | Replace with |
|---|---|---|
| 16 | The buying problem | Why now |
| 18 (H2) | Your analytics can't show you what an assistant said about you. | The shortlist can form before anyone visits your website. |
| 24 | A buyer can ask ChatGPT, Perplexity or Google's AI Mode for a shortlist before visiting a single vendor site. The answer draws on your pages and on what other sites say about you. | A buyer asks ChatGPT, Perplexity, Gemini, Claude or Google's AI Mode which firms to consider. The answer names a few. That can be the whole shortlist, and the buyer has not opened a single vendor site. |
| new, after 24 (one `<p>`, inline link) | (none) | Software buying already works this way. In G2's survey of 1,076 B2B decision-makers, fielded in March 2026 and published 15 April 2026, 51% said they start their software research with an AI chatbot more often than Google. [Source: G2, "The Answer Economy"](https://learn.g2.com/g2-2026-ai-search-insight-report) |
| 36 | Your analytics only see the buyers who click through. | Your analytics only count the buyers who click. An answer that named a competitor leaves no trace in your reports. |
| 40 (blockquote) | We work on what you can control, and we date what you can't. | Try it now. Ask ChatGPT who to hire for what you sell. Is your name in the answer? |

Mira: the diagram (`DiagramBlindSpot`) is unchanged.

### 2.3 What we do · `components/home/FourLayers.tsx`

Plain English replaces the jargon in the `moves` lines. Layer names and surfaces stay verbatim from §1.

| Line | Now | Replace with |
|---|---|---|
| 76 | The four layers | What we do |
| 78 to 80 (H2) | Four surfaces, / four different jobs. | AI SEO, GEO and SEO. / Four surfaces, four jobs. |
| 15 (AI SEO moves) | Passage-level clarity, entity definition, content Google can extract and attribute | Pages Google's AI can quote: a clear answer up front, plain facts about your firm, and proof it can point to |
| 21 (GEO moves) | What your site states, what third-party sources say about you, and whether your company name resolves to you | What your site says, what trusted sites say about you, and whether an assistant can tell you apart from firms with similar names |
| 30 (SEO moves) | Technical health, page structure, topical depth, links | A site Google can read, pages for the searches buyers make, and links from sites they trust |
| 36 (Local SEO moves) | Accurate profiles, relevant categories, authentic reviews and consistent listings | Accurate listings, the right categories and real reviews, where location matters to your buyers |
| 87 | Answer layers | Where buyers get answers |
| 99 | Supporting layers | What those answers draw on |
| 107 | Start with the layer you need. B2B PPC runs alongside the four layers and is scoped separately, priced as a share of ad spend with a monthly minimum. A firm that wants only PPC is a full client. | Start with one layer and add the rest as you grow. B2B PPC runs alongside and is priced separately, as a share of ad spend with a monthly minimum. A firm that wants only PPC is a full client. |

### 2.4 Who for · `components/home/Industries.tsx`

| Line | Now | Replace with |
|---|---|---|
| 51 | Who we build this for | Industries we serve |
| 53 (H2) | A software demo, an RFQ and a consultation need different pages. | keep |
| 17, 22, 27 | buyer lines | keep |
| 86 | Listing a sector means we sell AI SEO, GEO, SEO and PPC into it. It is not a claim that we have worked with a firm in it. If your sector is not listed, you can still book a call. | keep |
| 92 | See every sector | See every industry |

### 2.5 How it works · `components/home/Programme.tsx`

| Line | Now | Replace with |
|---|---|---|
| 41 | How the programme works | How it works |
| 43 (H2) | From buyer questions to sales conversations. | keep |
| 48 | One scope and one review rhythm, agreed in writing before work starts. | keep |
| 9 to 22 | four phases | keep |
| 100 to 102 | We do not control ChatGPT, Google or Perplexity, and we will not tell you when you will appear in them. What we commit to is the work, the measurement and the dated record of both. | No one controls what ChatGPT or Google says, and anyone who promises you a placement is guessing. We commit to the work, the measurement and a dated record of both, so you can see what moved. |

### 2.6 Proof · `components/home/Evidence.tsx`

| Line | Now | Replace with |
|---|---|---|
| 35 | How we report | Proof |
| 37 (H2) | Every answer we report has a date on it. | Named clients. Dated results. Every AI answer on the record. |
| 42 | We report each observation with the prompt we used, the platform, the date and the sources the answer cited. You can re-run any of it yourself. | Four named B2B programmes, with results confirmed by each client's own reporting. And every AI answer we report carries the prompt, the platform, the date and the sources it cited, so you can re-run it yourself. |
| 46 and 61 | A mention in an answer does not prove a buyer became a customer. | We report AI mentions and sales results in separate columns, because a mention is not a customer. |
| 71 | B2B client results | keep |
| 82 | Insurance programmes | keep |
| 97 | Insurance KPIs stay labelled as targets until client reporting fills in the result. If you are not in insurance, read the insurance programmes for the method, not as proof of work in your sector. | keep |
| 102, 105 | How we handle evidence · Client programmes | keep · See all case studies |

### 2.7 Book a call · `components/home/BookCall.tsx`

| Line | Now | Replace with |
|---|---|---|
| 28 | Book a call | keep |
| 30 (H2) | 30 minutes. Here is what we cover. | 15 minutes. You leave knowing where we would start. (Shipped 2026-10-14: the call is now 15 minutes, operator.) |
| 12 | Who you sell to, and the questions your buyers ask before they shortlist. | The questions your buyers ask before they shortlist, and which ones we would test first. |
| 13 | What we would check first in Google and AI search, and why. | Where you can win soonest: AI answers, Google or paid search, and why. |
| 14 | Whether we are the right fit. If we are not, we will say so. | keep |
| 44 | After the call you get a written scope and fee. | keep |
| 48 | Prefer to write? Send an enquiry with the challenge you want to solve. | keep |

**Superseded 2026-10-14:** the operator moved booking to Cal.com `15min`, and the site now says 15 minutes everywhere. The note below is kept for history.

"30 minutes" was existing copy (`BookCall.tsx` line 30, `FinalCta.tsx` line 23). Cleared: MARS relays commit c95b929 ("the call is 30 minutes. The site said 20."), recording the operator fixing it at 30. Ruth did not open the commit (no git access) and accepts the operator's statement as the source.

### 2.8 Free AI visibility audit · `components/home/Snapshot.tsx`

| Line | Now | Replace with |
|---|---|---|
| 35 | Free AI visibility audit | keep |
| 37 (H2) | Want to see the answers first? | See who AI names in your category before you commit. |
| 40 | It is free, and there is no obligation to book. | Free, with no obligation to book. Someone on our team reviews your firm, then sends you what AI platforms said when asked your buyers' questions, with dates and sources. |
| 44 | Request your free audit | Request your free AI visibility audit |
| 47 | What the audit covers | keep |
| 11 to 14 | four steps | keep (step 4 already reads "We confirm timing when we reply.") |
| 92 | Each finding carries its date, method and scope. | keep |

### 2.9 Fit · `components/home/Fit.tsx`

| Line | Now | Replace with |
|---|---|---|
| 56 (H2) | Start with the business you want to win. | keep |
| 10 | You sell to other businesses, and a purchase takes weeks of evaluation, not minutes | keep |
| new, after 10 | (none) | You asked an AI tool who to hire in your category, and did not like the answer |
| 12 | Referrals have carried your growth and you want a second channel | Referrals have carried your growth, and you know referred buyers still check you online |
| 14 | You want enquiry quality measured, not just traffic | You judge marketing on qualified enquiries, not traffic |
| 19 to 24 | not-a-fit list | keep (§2 disqualifiers) |

Line 14 change removes a "not just" construction (anti-slop).

### 2.10 Questions · `components/home/Faqs.tsx`

`HOME_FAQS` feeds `faqSchema()`, so every change below changes the JSON-LD. Mira: no other wiring.

| Line | Change |
|---|---|
| 55, 57 | keep "Before we talk" / "Before you book a call." |
| new, first | **Q:** What does an AI-native growth agency do? **A:** We sell AI SEO, GEO and SEO to B2B firms, with B2B PPC alongside, and we track and report the work on software we built. Scriblr tracks what AI tools say about you, question by question, platform by platform, with a date on every answer. LinkersPro is our tool for authority and link work. |
| new, second | **Q:** What is the difference between an AI SEO agency and an SEO agency? **A:** An SEO agency works on Google's search results. An AI SEO agency also works on the answers: Google's AI Overviews and AI Mode, and assistants such as ChatGPT, Perplexity, Gemini and Claude. The foundations overlap. The difference is measurement. We test the questions your buyers ask AI and report who each answer names, separately from rankings. |
| 12 to 14 | keep (AI SEO vs GEO definitions) |
| 16 to 18 | keep (no guarantee) |
| 20 to 22 | keep (measurement) |
| 24 to 26 | keep (firms like mine) |
| 28 to 30 | keep (cost) |
| 32 to 34 | keep (clash) |
| 36 to 38 | keep (PPC) |

Guardrail note for Ruth: the AI-native answer describes our tools only. It makes no claim about how much of the writing is human or machine. `[NEEDS DATA: the operator's description of the editorial process]` before any copy says more.

### 2.11 Closing CTA · `components/home/FinalCta.tsx`

| Line | Now | Replace with |
|---|---|---|
| 14 to 16 (H2) | See what AI search says about you, / with the date on it. | Find out who AI names when your buyers ask. / Then give it reasons to name you. |
| 23 | Book a 30-minute call. | Book a 15-minute call. We tell you where we would start, and whether we are the right fit. (Shipped 2026-10-14.) |
| 27, 30 | Book a call · Send an enquiry | keep |

---

## 3. The five service pages · `data/servicePages.ts`

Titles, metas, H1s and URLs stay fixed (`lib/seo.ts` `SEO_OVERRIDES` and `H1_OVERRIDES`). Keyword note: "b2b seo agency" is one of the five white-label strings in `CLAUDE.md` §2 and appears nowhere below. Use "enterprise SEO agency" and "SEO services".

### New fields for Mira (code change, flagged)

The selling structure (offer, why now, what we do, proof, how it works, objections, CTA) needs three optional fields on `ServicePageContent`. Each falls back to today's behaviour when absent, so the sub-pages are untouched.

| Field | Renders | Fallback |
|---|---|---|
| `chips?` | Replaces `PROMISE_CHIPS` in the hero chip row (`ServiceLanding.tsx` line 364) | `PROMISE_CHIPS` from `data/servicePromises.ts` |
| `whyNow?` | One `<p>` at the top of the "Right for you if" band, above the H2 (`ServiceLanding.tsx` line 378), under a mono label "Why now" | nothing |
| `ctaHeadline?` | Passed to `FunnelCTA` as the headline (`ServiceLanding.tsx` line 645) | `getFunnelCTA('bofu')` headline |

Plus one shared string: `ServiceLanding.tsx` line 541 "Want to see your answers first?" becomes **"Want to see who gets named first?"**, link text unchanged ("Request a free AI visibility audit").

### 3.1 `/services/ai-seo` · target "GEO services / AI search optimization" · `AI_SEO` line 239

| Field | Now | Replace with |
|---|---|---|
| `eyebrow` | AI SEO and GEO | GEO services and AI search optimization |
| `promise` | Your buyers can ask Google's AI or ChatGPT which supplier to use. We work on what those answers draw from, and show you every answer we test, with its date. | When a buyer asks ChatGPT, Perplexity or Google's AI which firm to use, the answer names a few. We work on the pages and sources those answers draw from, so your firm has a reason to be one of them. Then we show you every answer, with its date. |
| `promiseNote` (new) | (none) | Try it first. Ask ChatGPT who to hire for what you sell, and note which firms it names. |
| `whyNow` (new) | (none) | In G2's survey of 1,076 B2B decision-makers, fielded in March 2026 and published 15 April 2026, 51% said they start their software research with an AI chatbot more often than Google. In the same survey, 69% said that an AI chatbot led them to select a different software vendor than initially planned. If you sell software, those are your buyers. If you sell something else, ask your sales team where new prospects first heard of you. [Source: G2, "The Answer Economy"](https://learn.g2.com/g2-2026-ai-search-insight-report) |
| `chips` (new) | shared | `CalendarDays` Every AI answer dated and re-runnable · `BadgeCheck` Named B2B clients, dated results · `ShieldCheck` No placement promises |
| `ctaHeadline` (new) | Find out where you stand in Google and AI search. | See who ChatGPT and Google's AI name for what you sell. |
| `faqs` add, after the guarantee question | | **Q:** What do GEO services include? **A:** Four parts. We agree the questions your buyers ask and test them on the AI tools your market uses. We fix how your own site describes you. We work on the other sites those answers rely on: directories, trade press, review sites and associations. Then we re-test the same questions on a schedule and report who each answer named, with dates. AI search optimization for Google's AI Overviews and AI Mode runs on the same pages. |
| `faqs` add | | **Q:** How do I choose a GEO agency? **A:** Ask for three things. One stored AI answer with its prompt, platform and date. One named client with dated results. And a straight answer on placement: an agency that promises it is promising something no one controls. If the agency publishes a list of the best agencies, check who it ranks first. |

`rightFor`, `whatYouGet`, `steps`, `monthly` and `proof` stay. Proof renders Brixio, Talentera and Sophos (tagged `ai-seo`), each card already naming its service mix.

### 3.2 `/services/ai-seo/generative-engine-optimization` · `GEO` line 338

| Field | Now | Replace with |
|---|---|---|
| `eyebrow` | GEO · ChatGPT, Perplexity, Gemini, Claude, Copilot | Generative engine optimization · ChatGPT, Perplexity, Gemini, Claude, Copilot |
| `promise` | GEO is the work on what AI assistants say when a buyer asks them for a supplier. We work on what they draw from, and keep a dated record of what they say. | Generative engine optimization (GEO) is the work on what AI assistants say when a buyer asks them who to hire. We work on what they draw from, check whether they describe you correctly, and keep a dated record of every answer. |
| `whyNow` (new) | (none) | An assistant's answer is a shortlist with no click attached. Your analytics count the buyers who click through. They show nothing about the answers that named someone else. |
| `chips` (new) | shared | `Bot` One fixed question list, on the assistants we agree · `Network` Who was named, and the sources behind it · `ShieldCheck` No placement promises |
| `ctaHeadline` (new) | Find out where you stand in Google and AI search. | Find out what the assistants say about you, and whether it is right. |
| `faqs[1]` replace | Q: Can you get us recommended by ChatGPT? A: No one can promise that... | **Q:** How do I get my company recommended by ChatGPT? **A:** No one can make ChatGPT recommend you. You can change what it draws on. State plainly on your own site what you do, for whom and where, in the words your buyers use. Get the sites your buyers trust, such as trade press, directories, review sites and associations, to describe you the same way. Make sure search engines can find your key pages, because some assistants search the web before they answer. Then test the same questions on a schedule and record what changes. |

The `canAndCannot` block stays exactly as built. It is the honesty that makes the confident lines above believable.

### 3.3 `/services/seo` · target "SEO services / enterprise SEO agency" · `SEO` line 132

| Field | Now | Replace with |
|---|---|---|
| `eyebrow` | SEO · Google search results | Enterprise SEO services · Google search results |
| `promise` | We help B2B buyers find you on Google when they search for what you sell. We judge the work on enquiries, not traffic. | Google's AI answers are built from web pages Google can find. We fix and build the pages your buyers search for, so you rank for the searches that lead to enquiries and give Google's AI something worth quoting. We judge the work on qualified enquiries, not traffic. |
| `whyNow` (new) | (none) | Google now shows an AI Overview above the first result for some searches. Search your main service on Google and look at what sits above your listing. |
| `chips` (new) | shared | `TrendingUp` Judged on qualified enquiries · `Columns3` Rankings and AI answers reported apart · `ShieldCheck` No ranking promises |
| `ctaHeadline` (new) | Find out where you stand in Google and AI search. | Find out which searches you should be winning, and what is in the way. |
| `faqs[1]` question only | How does SEO help with AI search? | Is SEO still worth paying for with AI search? (answer unchanged, prefixed with "Yes. ") |
| `faqs` add | | **Q:** What does an enterprise SEO agency do differently? **A:** The work is the same kind. The scale is not: more pages, more markets and more people who approve changes. We agree owners and approvals in the proposal, fix the issues that block the most important pages first, and report by market. |

Proof renders Brixio only (the one B2B record tagged `seo`). That is correct; do not widen it.

### 3.4 `/services/ppc` · target "PPC agency / paid media management" · `PPC` line 504

| Field | Now | Replace with |
|---|---|---|
| `eyebrow` | B2B PPC · Google Ads and LinkedIn | B2B PPC agency · Google Ads, Microsoft Advertising and LinkedIn |
| `promise` | Google Ads and LinkedIn campaigns for B2B firms, judged on qualified enquiries and booked meetings, not clicks. | Paid media management for B2B firms. Google Ads, Microsoft Advertising and LinkedIn campaigns, judged on qualified enquiries and booked meetings, not clicks. |
| `promiseNote` | (keep as built) | keep |
| `whyNow` (new) | (none) | Search and AI answers take months to move. Paid search and LinkedIn can put you in front of buyers this month, while that work builds. |
| `chips` (new) | shared | `TrendingUp` Judged on cost per qualified enquiry · `BadgeCheck` Your ad accounts stay in your name · `Users` Works beside your team or agency |
| `ctaHeadline` (new) | Find out where you stand in Google and AI search. | Find out what your ad spend is buying, in qualified enquiries. |
| `faqs` add, first | | **Q:** What does good B2B paid media management look like? **A:** Judge it on cost per qualified enquiry, not cost per click. For Talentera, LinkedIn ads on US$20,000 of media spend produced 58 qualified leads at US$345 each, 15 June to 21 September 2026, confirmed by Talentera's own reporting. |

"Your ad accounts stay in your name" rests on the operator's 2026-10-07 service fact ("Clients own their ad accounts").

### 3.5 `/services/seo/local-seo` · `LOCAL_SEO` line 423

Light touch. Local SEO is the supporting layer, and the page's honesty ("If location doesn't matter to them, we'll tell you") is its best selling line.

| Field | Now | Replace with |
|---|---|---|
| `eyebrow` | Local SEO · Google Maps, local pack, Bing Places, Business Profile, reviews, listings | keep (verbatim §1 surface) |
| `promise` | keep | keep |
| `whyNow` (new) | (none) | If your buyers need you on site, the map is part of their shortlist. Search your service and your city in Google Maps and see who appears. |
| `chips` (new) | shared | `Compass` A straight answer on whether location matters · `MapPin` Real addresses only · `Star` No paid or filtered reviews |
| `ctaHeadline` (new) | Find out where you stand in Google and AI search. | Find out whether location shapes your buyers' choice, before you spend on it. |

---

## 4. Industry template, the 21 industries and below

### 4.1 Hero promise · `components/b2b/IcpBlocks.tsx` `IcpHero` (lines 538 to 652)

H1 stays: `AI search visibility for {name}.` (line 581). The authored `buyerQuestion` (line 587) and `opener` (line 589) stay per page. Two fixed lines are added; both are generic over the taxonomy fields.

**Promise line (new `<p>`, after the H1, before `buyerQuestion`):**

> Buyers can ask ChatGPT, Perplexity, Gemini, Claude or Google's AI which firm to use. We offer AI SEO, GEO, SEO and PPC to firms in {name}, working on the pages and sources those answers draw from, and we show you every answer with its date.

Ruth, 2026-10-08: Theo's draft read "We run AI SEO, GEO, SEO and PPC for firms in {name}". Rendered on 21 industry pages and 341 sub-industry pages, that claims current work in every sector. CLAUDE.md §11 forbids that ("Implying experience in an industry because a page exists for it"), and `Industries.tsx` line 86 already says the opposite. "Offer ... to" is the cleared verb.

`{name}` is the taxonomy `name` verbatim, never lowercased (the comment at line 575 explains why).

**Check line (new `<p>`, after `opener`, levels 2 to 4 only, where the sub-industry has `ai_prompts`):**

> Try a question your buyers might ask an AI tool: "{ai_prompts[0]}". Which firms does the answer name?

At level 1, which has no `ai_prompts`, use the first published sub-industry's prompt and name it: `Try a question a buyer of {sub.name} might ask an AI tool: "{prompt}". Which firms does the answer name?` If no sub-industry is published, omit the line.

`[vendor]` in a prompt renders through the existing `PromptText` chip ("a named vendor").

**Family B check.** `scripts/check-icp.cjs` R10 forbids `ai_prompts` strings in `metaDescription`, `buyerQuestion`, `snapshotQuestion` and FAQ questions, and allows them "in prose that attributes it to the client's buyer". The check line is attributed prose ("a question your buyers might ask"), so it passes. Mira: it must stay a `<p>`, never a heading.

### 4.2 Why the answer names someone else · `components/b2b/blocks.tsx` `WhyLostBlock` (lines 250 to 273)

| Element | Now | Replace with |
|---|---|---|
| Heading (line 259) | Why firms like yours get left out | Why the answer names someone else |
| New lead-in `<p>` above the authored text | (none) | An AI answer draws on pages, and on mentions on other sites, that match the buyer's question. In {name}, this is one place the match can break: (Ruth, 2026-10-14: was "this is where the match often breaks". "Often" is a frequency claim with no data, the same fault struck from §7 piece 5, and it renders on every industry and sub-industry page.) |
| Authored `whyTheAnswerIsLost` (line 264) | per body | per body, unchanged (rules below for new bodies) |
| New close `<p>` below the authored text | (none) | Check it yourself. Ask the question above and see who is named. Then ask what the answer would need to find on your site to name you. |

`{name}` is the page's own entity name at every level.

**Authoring rules for new bodies in the new voice.** These keep the 2,376 niche and 8,823 sub-niche pages substantive rather than templated (§7).

1. `buyerQuestion` is the question **our** buyer asks, phrased as the fear they already feel. Pattern: "Why does an assistant name {a specific kind of competitor} instead of us?" The TIC bodies already do this well ("Why does an assistant name a competitor whose analyte list is shorter than ours?").
2. `opener` states how this work is bought, in that sector's nouns: the standard, the certificate, the compliance date, the integration. Sixty words or fewer. No sentence that would survive swapping the sector name.
3. `whyTheAnswerIsLost` names **one** mechanism: the gap between the words in the buyer's question and the words on a typical firm's page. Specific nouns only. It never says the reader is invisible or unnamed.
4. `snapshotQuestion` ends the page with a check the reader can do on their own site in under a minute. The TIC pattern is the model: "Does your site name the revision your reports are written to?"

---

## 4b. `/industries` hub · target "digital marketing by industry" · `app/industries/page.tsx`

The page is being rebuilt on the 21 industries (2026-10-08). These strings carry into the rebuild. H1 "Industries We Serve" and title, meta and URL stay fixed.

| Line | Now | Replace with |
|---|---|---|
| 54 | AI SEO, GEO, SEO and PPC for B2B firms, written to the way your buyer decides: a software evaluation, an RFQ, a regulated purchase or a specialist consultation. | Digital marketing by industry, built for B2B. AI SEO, GEO, SEO and PPC, written to the way your buyer decides: a software evaluation, an RFQ, a regulated purchase or a specialist consultation. |
| 62 | We write to your buyer's decision: the spec an engineer checks, the integration an IT lead needs, the expertise a CFO looks for. | keep |
| 63 | The pages speak to the people your sales team wants to meet, and we judge them on qualified enquiries, not traffic. | keep |
| 64 | Every sector page ends with a clear next step: a call with us, and the evidence behind what we say. | Industry pages show questions their buyers might ask an AI tool, so you can run them yourself. |
| 229 (H2) | Need a market-specific plan? | Ask AI who to hire in your industry. Then talk to us. |
| 231 | Bring your industry, your markets, your sales cycle and the buyers you want to reach. We'll tell you what we would check first. | keep |

## 4c. `/case-studies` · target "marketing case studies" · `app/case-studies/page.tsx`

H1 "Case Studies", title, meta and URL stay fixed.

| Line | Now | Replace with |
|---|---|---|
| 71 | B2B client programmes with dated results, then our programmes for local service businesses and commercial insurance. | Marketing case studies from named B2B clients, with qualified leads, meetings and sales opportunities for stated dates. Then our programmes for local service businesses and commercial insurance. |
| 85 | {n} programmes for B2B firms selling to senior buyers. Each one shows qualified leads, meetings and sales opportunities for a stated date range, confirmed by each client's own reporting. | keep |

---

## 5. Shared CTAs

### 5.1 `lib/funnel.ts` `getFunnelCTA`

Every stage now leads with Book a call and follows with Send an enquiry (authority block, 2026-10-03).

| Stage, line | Field | Now | Replace with |
|---|---|---|---|
| tofu, 45 | eyebrow | Free resource | Next step |
| tofu, 46 | headline | Make your next growth decision clearer. | Ask ChatGPT who to hire in your category. Then talk to us. |
| tofu, 47 | primary | Explore our approach → `/process` | Book a call → `/book` |
| tofu, 48 | secondary | Send an enquiry → `/contact#enquiry` | keep |
| tofu, 49 | reassurance | Practical guidance for B2B teams | No obligation · Written scope and fee after the call |
| bofu, 54 | eyebrow | Next step | keep |
| bofu, 55 | headline | Find out where you stand in Google and AI search. | Find out who AI names in your category, and what it takes to be one of them. |
| bofu, 59 | reassurance | No obligation · Scope agreed in writing before work starts | keep |
| mofu, 65 | eyebrow | Your next step | keep |
| mofu, 66 | headline, with service | Explore your ${service} opportunity | Find out what ${service} could win for your firm |
| mofu, 66 | headline, no service | See where your buyers can find you | Find out who AI names when your buyers ask |
| mofu, 69 | reassurance | Tell us who you sell to, where you want to grow and what needs to improve. | Tell us who you sell to and where you want to grow. We tell you what we would test first. |

### 5.2 `FinalCta` and `BookCall`

See §2.11 and §2.7. Buttons stay "Book a call" and "Send an enquiry".

### 5.3 `components/b2b/blocks.tsx` `SnapshotCta`, line 487

| Now | Replace with |
|---|---|
| Book a call and we'll show you what we'd test first. Or send an enquiry if you prefer. | Book a call and we'll show you which questions we would test first, and on which platforms. Or send an enquiry if you prefer. |

---

## 6. Hero tracker panel

With the "Illustrative" badge gone, three cues now tell the reader the panel is a demonstration: the tracked brand reads "Your firm", the run label reads "Sample run", and no row carries a date. The caption makes the third cue explicit, and turns the panel into a lead-in to the audit.

| Location | Now | Replace with |
|---|---|---|
| `components/product-screens/ProductScreen.tsx` line 24, `TITLE['tracker-run']` | Prompt run | What we check |
| `components/product-screens/labels.ts` line 24, `RUN_LABEL` | Sample run | keep |
| `labels.ts` line 28, `TRACKED_LABEL` | Tracking | keep |
| `data/product-screens/tracker-run.ts` line 40, `caption` | Every answer is stored with its prompt, platform, date and cited sources. | A sample run: one buyer question per industry, on five AI platforms. In a real run, every answer carries its date and the sources it cited. |
| `Hero.tsx` line 82, platform row label | Google and AI search platforms | keep (see §2.1) |

**Ruth, 2026-10-08.** The title "What we check" is cleared: it describes the capability in the present tense, which R7 allows. The caption is cleared with one cut. Theo's clause "and whether 'Your firm' is named" was removed. It is a sentence about whether "Your firm" is named, written beside a panel the reader can take as being about them, and the new R7 scan fails that kind of sentence. "A sample run" and "In a real run" now carry the disclosure. The caption has no digits and no banned words.

**Fallback caption: not cleared without an operator decision.** "Sample data, shown to explain the method" is the "Sample data" figcaption line that ADR-0006 §12.5 lists as the not-adopted alternative: "a smaller Illustrative label is still the label the operator removed." It is the first fallback if §12.8 fires, and only the operator can choose it. Theo's fallback text, for reference:

> Sample data, shown to explain the method. Your free AI visibility audit runs your own buyers' questions, and every answer it reports carries a date.

Mira: `TITLE` and `caption` strings are on the served-screen allowlist (`scripts/lib/served-screens.mjs`). Changing them is a reviewed change to that list. None of the new strings uses "Live", "Scanning", "Checking", "Loading" or "Real-time" (`labels.ts` lines 4 to 5). The ADR-0006 data rules are unchanged: sample brands only, "Your firm" only, no figures, no dates.

The same panel renders on `/services/ai-seo` (`ServiceLanding.tsx` line 202). The caption change applies there too, which is intended.

---

## 7. Content to attract high-intent traffic

For Nadia to slot into the architecture. Search volumes are not included because none was pulled this run: `[NEEDS DATA: volume and difficulty for every target query below, from Nadia's keyword tooling]`. Every piece ends with Book a call (primary) and Send an enquiry (secondary), and links the free AI visibility audit inline once. None targets the five white-label strings in `CLAUDE.md` §2.

| # | Target query and close variants | Intent | Angle, and the one claim the piece owns | Proof it uses | Links out | CTA |
|---|---|---|---|---|---|---|
| 1 | how to get my company recommended by ChatGPT · get mentioned by ChatGPT · ChatGPT recommend my business | Problem-aware, owner or CEO, high intent | The ten-minute self-check, then the four things an assistant draws on. Owns: "You cannot make ChatGPT recommend you. You can change what it reads." | Brixio (AI SEO, GEO, content, outreach), dated. Ruth: cite its leads only with that mix, and never as "ChatGPT recommended Brixio". No dated Brixio AI-answer observation is on record. `[NEEDS DATA: Brixio's dated AI-answer observations, if the piece shows an answer]` | `/services/ai-seo/generative-engine-optimization`, `/free-ai-audit` | Book a call |
| 2 | how to choose a GEO agency · best GEO agency for B2B · GEO agency questions to ask | Commercial, comparing vendors | A vetting checklist: ask for a stored answer with prompt, platform and date, a named client with dated results, and a no-placement answer. Owns: "Of seven vertical 'top GEO agency' lists we opened in September 2026, all seven ranked their own publisher first." Ruth: Theo's "Most published lists" generalised from seven to the whole category. Use only the counted form, with the access dates from `docs/research/` (2026-09-28 and 2026-09-29). | Our method; Brixio, Sophos and Talentera, each with its service mix. Not Falcon Security (no search work) | `/services/ai-seo`, `/case-studies` | Book a call |
| 3 | AI SEO agency vs SEO agency · do I need an AI SEO agency | Commercial, category confusion | The four-surface table, and which layer to buy first by buyer type. Owns: "A page can rank on Google and still not be named in the answer." | Four-layer table (§1) | `/services/seo`, `/services/ai-seo` | Book a call |
| 4 | what is generative engine optimization · GEO vs SEO · GEO meaning marketing | Informational, citation-led | Definition in the first 40 words, then what GEO work is and is not. Owns: "GEO is not a markup trick." Nadia coordinates for citation. | none needed | `/services/ai-seo/generative-engine-optimization` | Book a call |
| 5 | why doesn't ChatGPT recommend my company · ChatGPT names my competitor | Problem-aware, Family Q (`CLAUDE.md` §2), high intent | Five mechanisms we check (Ruth: "common" was a frequency claim with no data behind it): a name shared with other firms, thin service pages, no mentions on trusted sites, outdated facts, pages Google cannot read. Each one with a check the reader can run. | none, method only | `/free-ai-audit`, `/services/ai-seo` | Book a call |
| 6 | track brand mentions in ChatGPT · AI visibility tracking · AI search monitoring | Tool-seeking, marketing lead | How to measure an answer that changes every time: fixed questions, fixed platforms, dated, stored, sources recorded. Owns: "A sampled AI result is an observation on a date, not a state." | Scriblr, method | `/services/ai-seo/ai-citation-tracking`, `/case-studies/methodology` | Book a call |
| 7 | is SEO still worth it with AI search · SEO vs AI search B2B | Skeptical decision-maker | Yes, and why: AI Overviews and some assistants draw on pages search engines can find. Owns: "SEO is the base AI search stands on." | Brixio (SEO in the mix) | `/services/seo` | Book a call |
| 8 | enterprise SEO agency · how to choose an enterprise SEO agency · enterprise SEO services | Commercial, priority page #3 support | What changes at scale: approvals, markets, owners, reporting by market. Questions to ask before signing. | none beyond method `[NEEDS DATA: a named enterprise SEO result before claiming one]` | `/services/seo` | Book a call |
| 9 | LinkedIn ads cost per lead B2B · B2B PPC agency · paid media management B2B | Commercial, marketing lead with budget | A worked, dated example: Talentera, US$20,000 LinkedIn media spend, 58 qualified leads from ads, US$345 per qualified lead, 15 June to 21 September 2026. How jobseekers were screened out. Owns: "Judge paid media on cost per qualified enquiry." | Talentera, confirmed by client reporting | `/services/ppc`, `/case-studies/talentera` | Book a call |
| 10 | cybersecurity marketing agency · AI search for cybersecurity companies · GEO for cybersecurity firms | Vertical, commercial | Three of our four named B2B clients sell security (Falcon Security, Brixio, Sophos). How CISOs and CIOs shortlist, and what an assistant needs to find on a security firm's site. Each client named with its own service mix. `[NEEDS DATA: a sourced, dated account of how CISOs and CIOs build a shortlist. Without one, cut that section]` | Search proof: Brixio and Sophos only, each with its mix. Ruth: Falcon Security may appear only as sector experience, in its own sentence, stated as "outreach and lead generation, no search work". It never appears in a sentence, table or chart about AI search or GEO results. The query targets GEO, so a reader will take any figure on this page as search proof. | `/industries/<technology-and-it-services path>` when published, `/case-studies` | Book a call |
| 11 | AI search for commercial insurance brokers · insurance broker marketing agency | Vertical, uncontested (`CLAUDE.md` §1) | A dated observation: we ran a fixed set of broker-selection prompts on named platforms on a stated date and publish who was named. Owns the one vertical where no equivalent entrant was found. Ruth: state it only as "in our searches of September 2026, we found no equivalent", never as "nobody serves brokers". | Insurance programmes as method, targets labelled as targets | `/industries/insurance`, `/case-studies` | Book a call |
| 12 | marketing for testing laboratories · environmental lab marketing · AI search for testing labs | Vertical, second vacancy (TIC, industry 19) | Built on the authored TIC bodies: accreditation scope, methods and compliance dates as the words assistants need to find. State the vacancy only in its narrow re-runnable form (search of 2026-09-29). | none in sector; say so | `/industries/environmental-engineering-and-testing` | Book a call |

Pieces 11 and 12 need a dated prompt run before they publish: `[NEEDS DATA: a dated run of the agreed prompt set, platforms and date, for insurance brokers and for testing labs]`. Without it they are opinion pieces and lose the claim they own.

---

## Checks run on this document

- No em dashes in any proposed string.
- None of: unlock, supercharge, leverage, seamless, game-changer, elevate, landscape, navigate, harness, transform, empower, robust, "when it comes to", "not just". The one "not just" in current copy (Fit line 14) is removed.
- No guarantee. "guarantee" appears only inside existing, negated FAQ questions.
- No statement that the reader is invisible or not named. Every fear line is a check the reader runs, a sourced figure scoped to software buyers, or a mechanism.
- Every figure has a source and a date: G2 (15 April 2026; 14 May 2025), or `data/case-studies/b2b.ts` (client-confirmed, dated windows).
  - Ruth, 2026-10-08: **corrected.** G2: the 51%, the #1-shortlist-source line and the 69% are verified by Iris on 2026-10-08 and rendered in the report's wording. "One in three" is dropped, because it is not in the report. The 29% stays declined. The `b2b.ts` figures were checked line by line: Brixio 92/32/9, 3 March to 21 September 2026; Sophos 111/10, 1 January to 21 September 2026; Talentera 124, US$20,000, 58, US$345, 15 June to 21 September 2026. All match.
  - Ruth, 2026-10-08: the hero subhead, `/services/ai-seo` `promiseNote` and platform-row label were also corrected. Each asked the reader whether they are named, in the same section as the tracker panel.

---

## Closing block (added at the gate, 2026-10-08)

**WHAT CHANGED.** The draft sitewide "AI search is winning" copy has been gated, with edits applied in place:
- the G2 figures are held;
- reader-named lines are out of the hero sections;
- the industry template no longer claims work in every sector;
- the Falcon Security and D1 attribution is tightened;
- H1 rulings are recorded, including the operator's reel variant.

**WHY.** Primary conversion is Book a call. The copy works the check the reader can run into booked walkthroughs, the North Star in `CLAUDE.md` §3. Every held line is held because it would hand a prospect a claim they can catch on the call.

**NEEDS DATA.**
- `[NEEDS DATA: a human match, in a browser, of the three G2 strings on https://learn.g2.com/g2-2026-ai-search-insight-report: "start their software research with an AI chatbot more often than Google", "the #1 source influencing which vendors make buyer shortlists", "said that an AI chatbot led them to select a different software vendor than initially planned". Iris's tool returns text through a summarising model. This blocks production, not preview.]`
- `[NEEDS DATA: OpenAI, Anthropic and Google brand-guideline check for using their logos and colours in a headline reel]`
- `[NEEDS DATA: the operator's description of the editorial process, before any copy says more about how the work is produced]`
- `[NEEDS DATA: volume and difficulty for every §7 target query, from Nadia]`
- `[NEEDS DATA: a dated prompt run for insurance brokers and for testing labs (§7 pieces 11 and 12)]`
- `[NEEDS DATA: a named enterprise SEO result (§7 piece 8)]`
- `[NEEDS DATA: a sourced account of CISO and CIO shortlisting (§7 piece 10)]`
- `[NEEDS DATA: Brixio's dated AI-answer observations, if §7 piece 1 shows an answer]`

**NEXT.** Mira wires the cleared strings into the preview, with the H1 as amended. A human runs the G2 browser match before production. Owner: MARS.
- Free offer named "Free AI visibility audit"; no turnaround promised.
- Primary CTA Book a call, secondary Send an enquiry, everywhere.
- No office claims. No HVAC or dental as B2B proof. Falcon Security never used as search proof.
- H1s, titles, metas and URLs on priority pages unchanged; H1 alternatives in §2.1 are operator decisions only.
