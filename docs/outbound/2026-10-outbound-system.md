# Qognition Agency outbound system, October 2026

> **Superseded in part, operator 2026-10-14.** GoHighLevel and Upstash are removed. Leads are emailed to hello@ through Resend, and calls are booked through Cal.com on /book. Sections below that describe GHL or Upstash are kept for history.

**Status:** DRAFT v0.1, 2026-10-06. Author: Rafael (`sales`). **Not sent, not scheduled, not loaded into any tool.** A named human sends every message. Nothing here goes out before Ruth (`brand-guard`) returns SHIP, and the agency white-label sequence needs Ruth specifically (CLAUDE.md, 2026-09-29 operator decision).

**Primary conversion event:** booked qualified walkthrough calls (`walkthrough_booked`, CLAUDE.md §3 and §8). Every message below exists to get one, or to find out fast that it should not.

**Read for this draft:** `CLAUDE.md` (project, incl. 2026-10-03 authority block), `docs/icp-positioning.md` v2.1, `data/b2b/icp/icp-taxonomy.json` v2.0.0, `docs/icp-industries/01, 02, 04, 05, 06, 09`, `docs/research/b2b-vertical-substance*.md` (grep), `data/case-studies/*.ts` (headers), `data/siteConfig.ts`, `lib/leadQualification.ts`, `~/qognition-ops/clients/qognition-agency/{context,guardrails,brand-voice}.md`, `~/qognition-ops/standards/{anti-slop,output-contract}.md`, and the 2026-09-14 SOP `~/qognition-ops/clients/qognition-agency/deliverables/2026-q3/part-10-execution-artefacts/lead-to-signed-client-sop.md`.

**Reconciled with Iris's teardown** (`docs/strategy/2026-10/01-competitor-teardown-and-icp.md`, 2026-10-06) and the coordinator's cohort direction of the same day. Section 13 records what changed and what did not.

Sequence files, in send order:

| # | Cohort | File |
|---|---|---|
| 1 | Commercial insurance distribution (04.05) | `docs/outbound/sequences/01-commercial-insurance-distribution.md` |
| 2 | MSSP, MDR, SOC-as-a-service (09.02). Managed IT (09.01) dropped | `docs/outbound/sequences/02-mssp-managed-security.md` |
| 3 | Cybersecurity SaaS narrowed to GRC (01.05.04), dated compliance hook | `docs/outbound/sequences/03-cybersecurity-grc.md` |
| 4 | Transaction advisory (02.06.04) first; CPA (02.05) held | `docs/outbound/sequences/04-transaction-advisory-cpa.md` |
| 5 | Cold chain logistics (06.08). 3PL (06.01) dropped | `docs/outbound/sequences/05-cold-chain-logistics.md` |
| 6 | Industrial automation and robotics (05.03) | `docs/outbound/sequences/06-industrial-automation-robotics.md` |
| 7 | Agency white-label (principals) | `docs/outbound/sequences/07-agency-white-label.md` |

---

## 0. Decisions that block the first send

These are contradictions in the record or choices only the operator can make. I have not picked for you.

| # | Decision | What the record says | My default until you decide |
|---|---|---|---|
| D1 | **Client-record claim** | CLAUDE.md §2 (2026-09-29) says "45 named clients" and "lead with the programme count". But all three case-study files carry the opposite statement, 53 times: `data/case-studies/insurance.ts` line 3, *"Retained public-reference scenarios. These records do not establish client relationships."*, and each record says *"This page does not assert a client relationship, completed work or access to its reporting."* `docs/icp-positioning.md` v2.1 (2026-10-03, newer) says "No invented clients". | **No client count, client name, case-study figure or "programmes" claim appears anywhere in outbound.** Proof is the snapshot itself. Please correct CLAUDE.md §2 so the next writer does not reintroduce it. Iris's §C.1 lists "6 named commercial insurance programmes" as proof for cohort 1; the same contradiction applies there, and I have not used it. |
| D2 | **Salt conflict, cohort 4** | Salt Accounting Group (sister company, same CEO per `context.md`) sells bookkeeping, fractional CFO and *"white-label services for accountancy firms"* (`clients/salt-accounting-group/context.md`). Outsourced CFO firms (02.06.01) and bookkeeping firms (02.06.02) compete with Salt directly. CPA firms (02.05) are Salt's white-label buyers. QoE firms (02.06.04) overlap least. The SOP §03 also routes "accounting, tax or CFO enquiry" to Salt, which would misroute a firm replying to us as a marketing buyer. | **02.06.04 QoE may proceed** once (b), (c) and (d) below exist. **02.05, 02.06.01 and 02.06.02 stay held** pending (a). You need: (a) go or no-go on 02.05 and 02.06.01, (b) a disclosure line for "aren't you connected to an accounting firm?", (c) a written Agency and Salt data-separation statement, (d) a cross-brand suppression check against Salt's CRM. |
| D3 | **Where a "yes" goes** | There is no `/audit` route under `app/` on this branch, and the form-first snapshot flow is the whole lead channel (CLAUDE.md §2). | Outbound uses **reply-to-request**: the reply is the request. The human logs it in GHL (section 10). No link in E1 to E3. Tell me if a snapshot form URL should replace this. |
| D4 | **Sender identity in the footer** | CAN-SPAM, CASL, the Spam Act and PECR all require sender identification and, for CAN-SPAM and CASL, a postal address. HQ is Gurugram (`data/siteConfig.ts`); the public phone is Canadian. | `[NEEDS DATA: legal entity name and physical postal address for every footer]`. No send before this exists. |
| D5 | **Agency routing** | SOP §03 (2026-09-14) sends white-label enquiries to a partner inbox, "never the sales calendar". CLAUDE.md (2026-09-29) makes agencies a client segment. | Agencies get their own GHL pipeline, **Agency Partners**, and the same calendar until a partner calendar exists. Tag `seg-agency`. |
| D6 | **Saying $3,000 on a call** | The brief says the floor is internal only. CLAUDE.md: "Never show, mention or build a plan below $3,000." | Reps **do not state the number**. They ask for the prospect's budget range and disqualify below the floor without naming it. Say if reps may state it. |
| D7 | **Competing clients** | Every snapshot names the firms an assistant named instead. If we sign two firms in one sub-niche and market, one snapshot names the other client. | `[NEEDS DATA: operator policy on serving competitors in the same sub-niche and market]`. Until set, the pre-call conflict check (section 11) flags it to the operator. |
| D8 | **White-label record as proof** | CLAUDE.md §2: four B2B engagements in managed IT and cloud, cybersecurity and B2B SaaS, delivered white-label under NDA, labelled **reported** (Qognition's supplied account). | Used **verbally only**, on calls, as "work delivered under NDA that I can't name", and only after you confirm it may be referenced. One bracketed line in the agency E1 depends on it. |
| D10 | **Three named agencies as white-label prospects** | Iris §A.7: Directive and Powered by Search (02.13.01) and The ABM Agency (02.13.02) are competitors **and** sit in the white-label segment. The coordinator asked me to use them as named examples of the agency account profile. Whether they are actually contacted is still the operator's call (Iris §A.7). | Named in `07-agency-white-label.md` as **profile examples only**. If contacted, they get the standard agency sequence. They never receive comparison or displacement messaging, and nothing from Iris's teardown appears in anything sent to them. |
| D11 | **Partner-client conflict** | Powered by Search shows named cybersecurity SaaS clients (Iris §A.1). If an agency becomes a white-label partner while our cohort 3 cold-emails its clients, we are prospecting our partner's book. | Once any agency partner signs, its published and disclosed client list goes on the outbound suppression list. `[NEEDS DATA: operator agrees this as standing policy]` |
| D9 | **Snapshot before the call, or on it** | Your brief: snapshot leads to the call. SOP §02: give the snapshot after booking, because a pre-call snapshot spends human minutes on people who never book. | **Your brief wins.** I send a one-page written snapshot after a "yes", with the walkthrough invite. Here's the tradeoff: human minutes go to non-bookers. The control is the capacity throttle in section 7 and the count `snapshots sent` vs `walkthroughs booked`, reviewed once 30 snapshots have gone out. |

---

## 1. The offer

**Name in copy:** "AI visibility snapshot", shortened to "snapshot". Never "audit" in cohort 4 (statutory meaning for CPAs and QoE firms) and never "report card", "score" or "grade".

**What it is.** A dated record of what AI assistants said when asked the questions a prospect's buyers ask. Which firms were named. Which pages were cited. A person runs it, checks it and signs it.

**What it is not.** Not a ranking report. Not a forecast. Not a promise that the prospect will be named in any answer. Nobody controls those systems, and the copy says so (E3 in every sequence).

**Flow.** Prospect replies "yes" → human fit check on public data against the ICP gate (section 3) → snapshot built from the cohort prompt set → snapshot email with a 30-minute walkthrough invite → walkthrough call (section 11).

### 1.1 Snapshot contents (one page, plus the run file)

**Why the contents matter more than the offer.** Iris (§A.2): all seven agencies profiled run a free diagnostic leading to a call, so "free snapshot then walkthrough" is table stakes. What none of them publishes (§A.4) is **run dates, model versions, the full prompt set and the stored answers**. The snapshot carries all four. That is the wedge, delivered to one prospect at a time.

1. **Prompts run.** The **full** cohort prompt set (section 2), each prompt verbatim, with the run date and the model label each platform showed.
2. **AI SEO layer** (Google AI Overviews and AI Mode) and **GEO layer** (ChatGPT, Perplexity, Gemini, Claude, Copilot) reported **under separate headings**. CLAUDE.md §1: never blur them. `[NEEDS DATA: the exact platform list the snapshot team will run; E1 names ChatGPT, Perplexity, Gemini and Google AI Overviews and must be edited if this differs]`
3. **Per prompt:** firms named, frequency across runs (not a single sample; SOP §05 F), pages cited by URL, whether any cited page is on the prospect's domain.
4. **AI-crawler access** from the prospect's `robots.txt`: GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended. Binary. Note: Google-Extended governs Gemini grounding and does **not** remove a site from AI Overviews (SOP §05).
5. **What we could not see:** analytics, Search Console, CRM, ad accounts, server logs.
6. **Checked by:** `{name}`, `{date}`. Required. This line answers "is this AI-generated?".
7. **Stored answers available on request:** the verbatim answer text for every run, so the prospect can re-derive every line.

**Limits statement, verbatim on every snapshot:**

> Observed between {date_start} and {date_end} on {platforms}, using {n_prompts} prompts, each run {n_runs} times, from {location and account state}. Assistant answers vary between runs and change over time. This records what was said on those dates. It is not a ranking and does not predict future answers. It does not cover your analytics, Search Console, CRM, ad accounts or server logs.

`[NEEDS DATA: runs per prompt. The SOP example used 3; operator to confirm]` · `[NEEDS DATA: where run files are stored, Scriblr or a shared folder. Do not describe Scriblr as the snapshot engine in copy until confirmed (icp-positioning v2.1: verified capabilities only)]`

**Banned in any snapshot or message:** "you are invisible in AI search", any traffic or revenue figure attached to a finding, any "X% of buyers use AI" bridge, any closing-window urgency. (SOP §05, CLAUDE.md §4.)

### 1.2 Reply templates (human-written, sent from the same inbox)

**R1, on "yes":**

> Thanks, {first_name}. I'll put it together. Two quick questions so it's useful: which question would your buyers actually type, and which markets matter most? If you'd rather not say, I'll use the one from my first email.

R1 asks the buyer for their own pain. Their answer replaces our hypothesis in the GHL record.

**R2, snapshot delivery** (link allowed: they asked for it):

> Subject: your AI visibility snapshot, {run_date}
>
> Hi {first_name},
>
> Here is the snapshot for {company}: {snapshot_link}
>
> What we ran: {n_prompts} prompts, {n_runs} runs each, on {platforms}, {date_start} to {date_end}.
>
> What stood out:
> 1. {finding, with prompt and date}
> 2. {finding, with prompt and date}
> 3. {finding, with prompt and date}
>
> What we could not see: your analytics, Search Console, CRM and ad accounts.
>
> Whether any of this matters depends on whether your buyers ask these questions this way. That's the first thing I'd want to check with you. If a 30-minute walkthrough is useful, pick a time here: {booking_link_with_utm}
>
> {sender_full_name}

**R3, on "not me":** thank them, ask for the name, log the referral, start the new contact at E1 with "{referrer_first_name} suggested I write to you" **only if they actually said so**.

---

## 2. Family-B prompt runs: the evidence behind every first touch

CLAUDE.md §2 splits prompts in two. **Family B** is what our client's buyer asks ("best robotic palletizing integrator for a food plant"). We run it, record it, and report the observation. We are never the cited answer to it. **Family Q** is what our buyer asks ("why doesn't ChatGPT recommend us"). Outbound uses Family B as evidence and Family Q as the conversation.

**Rules for the run behind E1:**

1. **Prompt text** comes verbatim from `ai_prompts` in `icp-taxonomy.json`. Where a cohort file adapts it (cohort 3 keys it to a dated requirement; the held CPA list adds a metro), the file says so and the adaptation is labelled.
1a. **Dated requirements in copy** come only from the research passes where they are labelled **observed**, and are re-checked at the primary source on the day the batch goes. A wrong date is checkable and costs the account. `[NEEDS DATA: primary-source re-check log per batch]`
2. **One run per cohort, per market, per week.** ChatGPT, logged out or a clean account, location recorded. Store: verbatim answer text, screenshot, cited URLs, the model label shown, timestamp, operator name. File name: `{cohort_id}_{market}_{YYYY-MM-DD}_chatgpt.{txt,png}`.
3. **`{n_named}` and "{company} was not one of them" come from that file and nothing else.** If a prospect is named in the answer, they do not receive this sequence (see section 3).
4. **`{run_date}` is the date of the run actually used.** Re-run weekly. Never send E1 off a run older than 14 days (policy, not a measured threshold).
5. **The email says it is one run.** E1 carries "One prompt, one run, one platform. An observation, not a verdict." This is the line that separates us from the self-ranking listicles in CLAUDE.md §1, and it stays.
6. **`{cited_mix}` in E2** describes the cited sources by type, from the stored file ("two review sites and one vendor comparison page"). If the answer cited nothing, use E2-B (section 6.3).

---

## 3. Qualification: framework and disqualifiers

**Framework: BANT, with Need defined by the ICP gate in CLAUDE.md §2 and the seven disqualifiers as hard stops.** Applied three times: at list build (public data), at reply (before any snapshot minutes are spent), on the call (in full, section 11).

### 3.1 The ICP gate (CLAUDE.md §2, operator-locked 2026-09-28)

| Test | Pass |
|---|---|
| Business model | B2B. Not B2C, not B2B2C where the buyer is a consumer |
| Revenue | $3M to $1B+ |
| Staff | 20 to 10,000+ |
| Need | Any **one** of AI SEO, SEO or PPC |
| Budget | Retainer $3,000 to $20,000 a month. **Internal only.** Never in copy |
| Markets | USA > Canada > Australia > UK > Netherlands > Germany > Sweden > Denmark > Norway > Finland > Switzerland > UAE, plus Singapore and Ireland. USD only |

The taxonomy is a route to market, **not a qualifier**. An in-band B2B firm outside our six cohorts is still a lead. Firms above the band stay eligible.

### 3.2 Disqualifiers (CLAUDE.md §2, the only ones)

Pre-revenue · B2C · low-ticket transactional · needs leads this week · wants a one-off project · cannot edit their own website · has no sales process that follows up.

`[NEEDS DATA: operator's threshold for "low-ticket". The taxonomy's client_value fields are route-to-market notes, not qualifiers.]`

### 3.3 List-stage exclusions (not disqualifiers, just not this sequence)

| Exclude | Why |
|---|---|
| Firm **named** in the stored cohort run | E1 would be false. Park in a separate list for a later sequence |
| Existing clients, open opportunities, Closed Lost (Do Not Contact), any suppression | SOP §12 suppression rules, checked at send time |
| Salt Accounting Group clients and active Salt prospects | Cross-brand double contact. `[NEEDS DATA: Salt CRM export or shared suppression list]` |
| GEO and AI-search agencies (02.13.03.02) | Competitors, not buyers, for wave 1 |
| Clients of any signed agency partner | D11 |
| Managed IT (09.01) and 3PL (06.01) firms | Dropped for wave 1 (section 13). Still in the ICP; inbound from them is a lead |
| Sole traders and unincorporated partnerships in the UK | PECR consent rule (section 9) |
| Sites on a locked network or franchisor platform (common in insurance aggregator networks) | Disqualifier: cannot edit their own website |

### 3.4 Fit check on reply (before snapshot minutes)

Five minutes, public data only: B2B? Staff band on LinkedIn? Website editable (not a network template)? Any disqualifier visible? Conflict with an existing client (D7)? Pass → snapshot task in GHL. Fail → a polite one-paragraph decline with a reason, the single cohort-run observation, and no booking link (SOP §03 decline pattern).

---

## 4. Account list spec (Clay or Apollo)

Sources are limited to the client's CRM, public company information, and a licensed data tool the client already pays for. **No scraping, no bought lists.** `[NEEDS DATA: which of Apollo, Clay, Sales Navigator is licensed today]`

### 4.1 Firmographic filters

| Filter | Apollo field | Value |
|---|---|---|
| Employees | `# Employees` | 21-50, 51-100, 101-200, 201-500, 501-1,000, 1,001-2,000, 2,001-5,000, 5,001-10,000, 10,001+ (the band starts at 20; Apollo's ranges start at 21) |
| Revenue | `Revenue` | $3M and above **where present**. Do not exclude on a blank revenue field; staff band carries it |
| Cohort floor | per cohort file | Wave 1 uses the higher of the ICP floor and the cohort's `min_firm_size` from the JSON. Smaller in-band firms are later waves, not disqualified |
| HQ country | `Account Location` | In priority order: US, CA, AU, UK, NL, DE, SE, DK, NO, FI, CH, AE, SG, IE. Channel rules by country in section 9 |
| Industry | `Industry & Keywords` | Keywords per cohort file, taken from taxonomy sub-niche names |
| Exclude | `Industry & Keywords` (NOT) | consumer, retail store, restaurant, salon, residential, personal injury, plus each cohort's exclusions |

### 4.2 Titles

| Group | Titles | Seniority |
|---|---|---|
| Primary (brief) | Founder, CEO, CMO, VP Marketing, Head of Growth, Head of Demand Generation | Owner, Founder, C-suite, VP, Head |
| Cohort additions | From `buyer_titles` in the JSON, listed in each cohort file (for example President / Owner in 05.03, Managing Partner in 02.05, Head of Distribution in 04.05) | |
| One contact per account per channel at a time | If the first contact replies "not me", R3 moves to the named person | |

### 4.3 Signals

| Signal | How to check | Record in GHL | Use in copy |
|---|---|---|---|
| Running Google Ads | Google Ads Transparency Center, search the advertiser or domain. Screenshot | `sig_google_ads` = date + one ad keyword or headline | Optional line in E2 or E3 (section 6.4) |
| Running LinkedIn ads | Company page Ads tab or LinkedIn Ad Library. Screenshot | `sig_linkedin_ads` = date | Optional line |
| Hiring marketing roles | Careers page or LinkedIn Jobs, posted in the last 60 days: marketing, demand gen, SEO, content, growth | `sig_hiring` = title + post date + URL | Optional line, only with the exact title and date |
| 3+ competitors visible in AI answers | The stored cohort run names 3 or more firms in the prospect's sub-niche, and the prospect is not among them | `sig_named_count` + `run_file` | **E1 itself** |
| No in-house AI-search programme | LinkedIn people search at the company for titles containing GEO, AEO, "AI search", "LLM"; job posts with the same terms. Zero found | `sig_no_inhouse_ai` = date checked | **Never in copy.** It is an inference from absence |

**Tiering**

| Tier | Rule | Channels |
|---|---|---|
| T1 | ICP gate + not named in run + `sig_named_count` ≥ 3 + at least one paid signal + (hiring **or** no in-house AI search) | Full cadence including calls |
| T2 | ICP gate + not named in run + `sig_named_count` ≥ 3 | Email and LinkedIn, no calls |
| Hold | ICP gate passes, fewer than 3 firms named in the run | No sequence. The category is not contested in that answer; E1 has nothing to say |

**Hygiene.** Verify every email before load. Exclude catch-all domains unless the address is published on the company site. Record `source` for every contact (Apollo, Clay, company site, LinkedIn): GDPR Art. 14 and "how did you get my details?" both need it.

`[NEEDS DATA: account counts per cohort per market once the filters run. No list sizes are estimated here.]`

---

## 5. The six cohorts plus agencies

All IDs verified against `data/b2b/icp/icp-taxonomy.json` v2.0.0 on 2026-10-06.

| # | Cohort | Sub-industry | Wave-1 sub-niche(s) | Family-B prompt | Status |
|---|---|---|---|---|---|
| 1 | Commercial insurance | 04.05 | 04.05.01.01 Middle-market P&C brokers, 04.05.01.03 Industry-specialist agencies | "best commercial insurance broker for a mid-size manufacturing company" (JSON, verbatim) | Ready for Ruth |
| 2 | MSSP, MDR, SOC-as-a-service | 09.02 | 09.02.01.01, 09.02.01.02, 09.02.02.01, 09.02.03.01, 09.02.03.02 | "best managed detection and response for mid-market companies with a 24/7 SOC" (JSON, verbatim) | Ready for Ruth |
| 3 | Cybersecurity SaaS, **GRC only** | 01.05 | 01.05.04.01 Compliance automation, 01.05.04.02 Enterprise GRC suites | Three variants keyed to a dated requirement: CMMC (adapted), EU Cyber Resilience Act (adapted), SOC 2 (JSON, verbatim) | Ready for Ruth |
| 4 | Transaction advisory | 02.06 | 02.06.04.01 Quality of earnings (QoE) | "who does quality of earnings reports for lower middle market deals" (JSON, verbatim) | Ready for Ruth **after D2 (b) to (d)** |
| 4-held | CPA firms | 02.05 | 02.05.02.01 Construction & real estate CPAs | "best CPA firm for a $50M construction company" + metro (adapted) | **Held: D2 (a)** |
| 5 | Cold chain | 06.08 | 06.08.01.01 Frozen & chilled food 3PL, 06.08.03.01 Public refrigerated warehouses | "best refrigerated 3PL for a frozen food brand selling into grocery chains" (JSON, verbatim) | Ready for Ruth |
| 6 | Industrial automation | 05.03 | 05.03.01.03 Palletizing & end-of-line robotics (alt: 05.03.02.04 Control system migrations) | "best robotic palletizing integrator for a food plant" (JSON, verbatim) | Ready for Ruth |
| 7 | Agency principals | 02.13, 02.14, 21.13 | 02.13.01, 02.13.02, 02.14, 21.13.01 | Agency's own category, for example "best B2B demand generation agency for SaaS companies" (JSON, verbatim) | Ready for Ruth (mandatory) |

**The prompt must fit the sub-niche.** A SOC 2 prompt says nothing to an EDR vendor. Each wave-1 list is restricted to the sub-niche its prompt fits. `[NEEDS DATA: Family-B prompts for other sub-niches. The JSON carries ai_prompts at sub-industry level only.]`

**Pain.** Iris's Part B (§B.1) confirms there is **no buyer speech on file**: no call notes, no won/lost notes, no enquiry free text. What exists is the taxonomy's description of each client's buyer (operator-authored) and Iris's Family Q prompts, which she labels **[I] hypotheses** written in our buyer's voice. Each cohort file quotes both with those labels, and lists the call question that confirms or kills each one. No email asserts a pain. The emails report an observation and ask. The first 20 walkthrough calls are the validation set Iris names; `buyer_prompt_stated` in GHL (section 10.1) is where the real language lands.

---

## 6. Channel rules and the master cadence

### 6.1 Master cadence (US, CA, AU, UK; email allowed)

| Step | Day | Channel | Tier | Exit condition (applies across all channels) |
|---|---|---|---|---|
| E1 | 0 | Email, new thread | T1, T2 | Any reply on any channel · booking · opt-out on any channel · hard bounce · OOO with date pauses to return +1 |
| LI-C | 1 | LinkedIn connection request with note | T1, T2 | Same |
| E2 | 3 | Email, threaded under E1 with E1 quoted | T1, T2 | Same |
| CALL-1 | 4 | Phone, manual dial, business line only | T1 | Same, plus "don't call" → `dnc-call` |
| E3 | 7 | Email, new subject | T1, T2 | Same |
| LI-1 | 8, or accept +2 | LinkedIn message (connected only) | T1, T2 | Same |
| CALL-2 | 10 | Phone | T1 | Same |
| E4 | 12 | Email, threaded under E1 | T1, T2 | Ends the email track |
| LI-2 | 15 | LinkedIn message | T1, T2 | Ends the sequence. Contact goes to a 90-day rest list, not nurture (no opt-in) |
| DM | 1 | X, Instagram or Facebook, **only** when the person has no LinkedIn profile and uses that account publicly in their business role | T1, T2 | One message. No follow-up on that channel |

Four emails is the ceiling. That matches the SOP's four-touch rule (§12) and the brief.

### 6.2 Cadence for the EU, Switzerland, UAE and Singapore (no cold email in wave 1)

| Step | Day | Channel | Note |
|---|---|---|---|
| LI-C | 0 | LinkedIn connection request | |
| LI-1 | accept +2 | LinkedIn message, E1 content adapted, **plus the privacy line** (section 9) | |
| CALL-1 | 5 | Phone, T1 only | **Not Germany.** Not UAE or Singapore until counsel clears it |
| LI-2 | LI-1 +7 | LinkedIn message | Ends the sequence |

### 6.3 Shared blocks

**E2-B (use when the stored answer cited no sources).** Replace the second and third paragraphs of E2-A with:

> The answer cited no sources, so there is no page to point at. That calls for different work from a cited answer, and the snapshot separates the two.

**Email footer (not counted in the 90 words):**

> {sender_full_name}, Qognition Agency · {legal_entity_name}, {postal_address}
> This is a sales email. Reply "no" and I won't write again, or unsubscribe: {unsubscribe_link}
> UK only, add: How we got your details and your rights: {privacy_notice_url}

### 6.4 Optional signal lines (one per sequence, max 12 words, E2 or E3 only, only when verified)

| Signal | Line |
|---|---|
| Google Ads | You're also bidding on "{ad_keyword}" on Google (checked {date}). |
| LinkedIn ads | You're also running LinkedIn ads (Ad Library, checked {date}). |
| Hiring | You're hiring a {job_title} (posted {post_date}); this gives them a baseline. |

### 6.5 Rules for every channel

- **Threading.** E2 and E4 are genuine replies in our own thread with the earlier email quoted below. Never add "Re:" to a new thread.
- **Links.** None in E1 to E4. The booking link appears only after a reply (R2). This also protects deliverability.
- **Placeholders.** Every `{…}` is filled from a stored record. An unfilled or guessed placeholder blocks the send.
- **LinkedIn.** Manual only. No automation tools: LinkedIn's User Agreement prohibits them, and the sender's account is the asset. Connection notes under 200 characters. Stay under each account's invitation limit `[NEEDS DATA: the limit each sender's account shows]`.
- **Calls.** Manual dial. No prerecorded or "ringless" voicemail. Business lines from the company site or the licensed tool. "Don't call me" is honoured immediately and logged.
- **DMs** on X, Instagram and Facebook follow the email jurisdiction rules for that person's country. One message. Never to a personal or family account.

---

## 7. Daily cadence and volume plan (team of 2 to 3)

`context.md`: team of 2 to 3, own media spend $0. Roles below are seats, not hires. `[NEEDS DATA: who holds each seat]`

| Seat | Owns |
|---|---|
| **S1 Sender and closer** | Named sender on email and LinkedIn, all replies, walkthrough calls, proposals |
| **S2 Researcher** | List builds, signal checks, weekly cohort runs, fit checks, snapshots |
| **S3 Caller** (optional third person) | CALL-1 and CALL-2, LinkedIn connection requests if S1 delegates the clicking only. Messages still go under S1's name and S1 reads every reply |

### 7.1 Prospect business hours in IST, October 2026

Clock changes: Australia moved to AEDT on 4 Oct, which moved its IST window one hour earlier (already reflected below). UK and EU change on 25 Oct; US and Canada on 1 Nov. Each of those pushes that market's IST window one hour later.

| Market | 09:00 to 17:00 local, in IST (until 25 Oct) |
|---|---|
| Australia (Sydney, AEDT) | 03:30 to 11:30 |
| Singapore | 06:30 to 14:30 |
| UAE | 10:30 to 18:30 |
| NL, DE, SE, DK, NO, CH (CEST) | 12:30 to 20:30 |
| FI (EEST) | 11:30 to 19:30 |
| UK, Ireland (BST, IST-Irish) | 13:30 to 21:30 |
| US and Canada Eastern | 18:30 to 02:30 |
| US Pacific | 21:30 to 05:30 |

### 7.2 Daily blocks (IST)

| Block | S1 | S2 | S3 |
|---|---|---|---|
| 07:00 to 11:00 | AU afternoon calls if AU is live; reply triage | List build, signal checks | AU and SG calls (T1) |
| 11:00 to 14:00 | Approve the day's E1 batch, LinkedIn messages | Fit checks, snapshots | UAE calls once counsel clears |
| 14:00 to 18:30 | LinkedIn (UK, EU), replies, R2 deliveries | Snapshots | UK and EU calls (not DE) |
| 18:30 to 22:30 | US Eastern walkthrough calls, replies | Weekly cohort runs (Mondays) | US Eastern calls |

Emails are scheduled to land in the recipient's morning. A human approves each batch; I do not load or schedule anything.

**The US shift problem is real.** SOP §04: a standard IST day overlaps the US Eastern business day by 30 minutes. If the US is live, S1 and S3 work the 18:30 block every weekday. That is a staffing decision, not a copy decision.

### 7.3 Volume arithmetic (example inputs, not a forecast)

| Input | Example | Rule |
|---|---|---|
| Secondary domains | 3 | Operator buys |
| Inboxes per domain | 2 | Each a real, named person |
| Cold sends per inbox per day | 30 | Hard cap 50, follow-ups included |
| **Sends per day** | 3 × 2 × 30 = **180** | |
| Emails per contact | 4 | |
| **New contacts per day at steady state** | 180 ÷ 4 = **up to 45** | Upper bound: early exits free capacity |

That is arithmetic on chosen inputs. Reply rates, snapshot requests and bookings are `[NEEDS DATA: none exist; count from week one]`. I have not used a benchmark.

### 7.4 The throttle: snapshots, not sends, are the bottleneck

- SOP §05 sets a **ceiling** of 20 human minutes per snapshot. It is prescribed, not measured. `[NEEDS DATA: measured minutes across the first ten snapshots]`
- At that ceiling, S2 produces 3 snapshots per hour of snapshot time.
- **Rule:** if the queue of "yes" replies awaiting a snapshot exceeds two working days of S2's capacity, pause **new E1 sends**. Follow-ups continue. Resume when the queue clears.
- **Rule:** reply to every "yes" with R1 the same business day, even when the snapshot is queued.

### 7.5 Weekly rhythm

| Day | Work |
|---|---|
| Monday | Re-run each live cohort prompt per market (section 2). Refresh suppression from GHL and Salt. Build next week's list |
| Tuesday to Thursday | Full send, LinkedIn and call blocks |
| Friday | Weekly counts (section 10.4). Objection tally. Prompt and copy changes go to Ruth before Monday |

### 7.6 Wave plan

| Weeks | What runs | Why |
|---|---|---|
| 1 to 2 | Domains bought, SPF/DKIM/DMARC set, inboxes warming. **LinkedIn and calls only**, T1 accounts, cohorts 1, 2, 3. US first, then UK | Warmup blocks cold email for at least 14 days. LinkedIn and phone need none |
| 3 onward | Email live for cohorts 1, 2, 3 in US, Canada (CASL evidence only), UK (corporate subscribers only). Agency sequence at low volume after Ruth | |
| After D2 (b) to (d) | Cohort 4 (QoE) | Salt disclosure and suppression must exist first |
| After the first counts | Cohorts 5 and 6 | Owner-led and commercial buyers; call-heavy |
| After D2 (a) | CPA (02.05) | Salt conflict |

**Why that order** (coordinator direction, matching Iris §C.2 and §C.3):

1. **Commercial insurance first.** It is the only position Iris and CLAUDE.md §1 both record as uncontested (passes 1 to 3, last checked 2026-09-29). `[NEEDS DATA: re-run the insurance vacancy search on the day the first batch goes, per Iris]`
2. **MSSP and MDR next.** It sits closest to the reported white-label cybersecurity record (D8). Iris dropped managed IT (09.01) because NUOPTIMA now publishes dated city-level MSP AI-visibility rankings; no MSSP-specific equivalent was seen.
3. **GRC, narrowed.** Generic cybersecurity SaaS is contested (Powered by Search shows named cyber SaaS clients, Iris §A.1). A dated compliance requirement gives the first email a reason to exist.
4. **Transaction advisory ahead of CPA.** Its A niches are AI-SEO-led (thin search, high-value prompts) per the JSON, and lower M&A advisers are also partnership channel #2 (CLAUDE.md §3). CPA waits on the Salt decision.
5. **Cold chain only.** Logistics GEO specialists aim at brokers and 3PLs (Iris §C.3, reported). Cold chain carries certification vocabulary (GDP, DEA, ISO 13485).
6. **Industrial automation last of the six.** It is occupied (WebFX, Directive, The ABM Agency, First Page Sage, Iris §C.2), so it competes on depth.

Australia ranks above the UK in the market order, but AU calls fall in the 03:30 to 11:30 IST window; AU runs email and LinkedIn first and calls in the IST morning (AU afternoon) once someone owns that block.

**Channel order context.** CLAUDE.md §3 ranks snapshot-led outbound **third**, after existing named accounts and partnerships with agency networks and M&A advisors. This system covers outbound and the agency segment. It does not replace a referral ask to every existing account, which costs nothing and is the channel that has produced clients.

---

## 8. Deliverability guardrails

| Rule | Detail |
|---|---|
| Never cold-send from `qognitionagency.com` | It carries GHL form confirmations, lead delivery (`lib/leadDelivery.ts`) and client mail. A spam reputation hit there breaks the lead channel CLAUDE.md §2 calls "the entire lead channel" |
| Secondary domains | Operator-registered, recognisably Qognition, each redirecting to qognitionagency.com. `[NEEDS DATA: domain names]` |
| Inboxes | 2 to 3 per domain. Each belongs to a real, named person who reads the replies. No personas |
| Authentication | SPF and DKIM (2048-bit) on every domain. DMARC from day one at `p=none` with `rua` reporting, moved to `quarantine` once reports are clean. Custom tracking domain only if tracking is used |
| Warmup | At least 14 days before the first cold send (policy). Warmup continues at low volume while live |
| Ramp (policy, change freely) | Week 1 live: up to 15 cold sends per inbox per day. Week 2: 25. Week 3: 35. Hard cap 50, follow-ups included |
| Content | Plain text. No images, no attachments, no links in E1 to E4, no URL shorteners. Open tracking off: Apple Mail Privacy Protection makes opens unreliable and the pixel costs deliverability |
| Unsubscribe | Working opt-out in every email. Add `List-Unsubscribe` and `List-Unsubscribe-Post` (one-click) headers: Google and Yahoo require them of bulk senders, and the cost of adding them below that threshold is zero |
| Monitoring | Google Postmaster Tools on every domain. Google's sender guidelines: keep the spam rate below 0.10% and never reach 0.30% |
| Pause triggers (policy) | Any inbox with hard bounces above 2% of a day's sends, any spam-rate reading at or above 0.10%, or any blocklist listing: pause that inbox, investigate, resume at the previous week's volume |
| Verification | Every address verified before load. Catch-alls excluded unless published on the company site |
| Suppression | Synced from GHL to the sending tool daily and **checked at send time**, not enrolment (SOP §12) |

---

## 9. Compliance by market

**This is an operating policy, not legal advice.** It is deliberately more conservative than the law in several places. `[NEEDS DATA: counsel review of every row before the market goes live]`

| Market | Cold email | Calls | LinkedIn and DMs | Required |
|---|---|---|---|---|
| **US** (CAN-SPAM) | Yes | Yes, manual dial, business lines. No prerecorded messages or ringless voicemail (TCPA). Mobiles that may be personal are checked against the National DNC Registry | Yes | Accurate From and header; non-deceptive subject; identified as a solicitation (footer line); valid physical postal address; working opt-out honoured within 10 business days and live for at least 30 days after sending. Call recording: disclose in the invite; two-party consent states include CA, FL, IL, MA, PA, WA (SOP §06) |
| **Canada** (CASL) | **Only** with implied consent by conspicuous publication: the address is published (company site or directory), with no statement refusing unsolicited messages, and the message is relevant to the person's role. Store the evidence URL, screenshot and date in GHL **before** the send | Check the National DNCL and keep an internal do-not-call list. B2B call exemptions exist; confirm with counsel | Yes | Sender name, mailing address and one other contact method; unsubscribe at no cost, processed within 10 business days, live for at least 60 days |
| **Australia** (Spam Act 2003) | Only with inferred consent by conspicuous publication, same evidence standard as Canada | Wash numbers against the Do Not Call Register; respect the telemarketing calling-hours standard | Yes | Sender identification; functional unsubscribe honoured within 5 working days |
| **UK** (PECR, UK GDPR) | **Corporate subscribers only**: limited companies, LLPs, public bodies. Not sole traders or unincorporated partnerships | Screen against TPS and CTPS before each call block | Yes | Sender identity and a valid opt-out in every message. Legitimate interests assessment on file `[NEEDS DATA: LIA document]`. Privacy notice link in the first message (Art. 14). An objection to direct marketing is absolute: suppress at once |
| **NL, SE, DK, NO, FI, IE** (GDPR plus national ePrivacy rules) | **No in wave 1** | Yes, T1, after checking national do-not-call registers | **LinkedIn-first** | LIA on file. Privacy line in LI-1: "Why I have your details and your rights: {privacy_notice_url}". DMs treated like email |
| **Germany** (UWG §7) | **No** | **No** until counsel confirms | LinkedIn only | As above |
| **Switzerland** (UWG, FADP) | No in wave 1 | After counsel | LinkedIn-first | As above |
| **UAE** | No in wave 1 | **No** until counsel clears the telemarketing rules | LinkedIn-first | `[NEEDS DATA: counsel on UAE PDPL and telemarketing rules]` |
| **Singapore** (Spam Control Act, PDPA) | No in wave 1. If enabled, unsolicited bulk email must carry `<ADV>` in the subject; counsel to confirm whether our volumes are "bulk" | After counsel | LinkedIn-first | `[NEEDS DATA: counsel]` |

**Also for counsel:** whether Qognition, as an India-based controller targeting EU and UK individuals, needs an Art. 27 representative in the EU and the UK; and India DPDP Act obligations for prospect data held in India (`context.md` flags DPDPA).

**Records that make this defensible.** Every contact in GHL carries `source`, `jurisdiction_rule`, and for Canada and Australia `consent_evidence_url` and `consent_evidence_date`. A contact without those fields does not get sent to.

---

## 10. Tracking in GoHighLevel

### 10.1 Contact fields (create before the first send)

| Field | Values |
|---|---|
| `ob_cohort_id` | Taxonomy ID, e.g. `04.05.01.01` |
| `ob_market` | ISO country |
| `jurisdiction_rule` | `US-CANSPAM`, `CA-CASL-PUBLISHED`, `AU-SPAM-PUBLISHED`, `UK-PECR-CORPORATE`, `EU-LI-ONLY`, `DE-LI-ONLY`, `AE-LI-ONLY`, `SG-LI-ONLY`, `CH-LI-ONLY` |
| `consent_evidence_url`, `consent_evidence_date` | CA and AU only |
| `source` | Apollo, Clay, Sales Navigator, company site, referral |
| `tier` | T1, T2 |
| `run_file`, `run_date`, `run_platform`, `run_prompt` | From section 2 |
| `sig_named_count`, `sig_google_ads`, `sig_linkedin_ads`, `sig_hiring`, `sig_no_inhouse_ai` | From section 4.3 |
| `seq_last_step`, `seq_status` | E1 to LI-2; active, paused, exited |
| `seq_exit_reason` | Closed choice: positive reply, negative reply, not me (referred), opt-out, hard bounce, booked, sequence complete |
| `buyer_prompt_stated` | Free text: the question the prospect says their buyers ask (from R1 or the call). This replaces our hypothesis |
| `snapshot_requested_date`, `snapshot_sent_date`, `snapshot_url`, `snapshot_checked_by` | |
| `sender_name` | |

**Tags:** `ob-2026-10`, `ob-{cohort_slug}`, `ob-ch-email`, `ob-ch-linkedin`, `ob-ch-call`, `ob-ch-dm`, `dnc-email`, `dnc-call`, `dnc-all`, `seg-agency`.

### 10.2 Opportunities follow the SOP stage test

A contact in a sequence is **not** an opportunity. "Contacted" fails the SOP §11 stage test.

| Event | GHL action |
|---|---|
| Positive reply, question, or "send it" | Opportunity created in Pipeline A at **New Lead**, `lead_source = outbound`, cohort fields copied |
| Fit check passed, snapshot task created | **Qualifying** |
| Fit check failed | Closed Lost (Disqualified), reason recorded |
| Walkthrough booked in the GHL calendar | **Call Booked** |
| Agency reply | Pipeline **Agency Partners** (D5), same stages |

### 10.3 Attribution

- Booking links sent in R2 carry `utm_source=outbound`, `utm_medium={email|linkedin|call|dm}`, `utm_campaign=2026-10_{cohort_slug}`, `utm_content={step}`.
- `walkthrough_booked` fires **server-side from the GHL webhook only** (CLAUDE.md §8). A booking-link click is never a booking.
- `[NEEDS DATA: whether the GHL booking widget writes UTM parameters onto the contact or appointment, and whether the walkthrough_booked webhook fires for bookings made from a direct widget link]`
- Never put email, phone, name or message text into GA4 or GTM (CLAUDE.md §8).

### 10.4 Weekly counts (Friday)

All counts, no rates. Rates only on a rolling 90-day window and only once the denominator reaches 30 (SOP §14).

1. New contacts started, by cohort and market
2. Emails sent; hard bounces; opt-outs
3. LinkedIn requests sent; accepted
4. Calls dialled; conversations
5. Positive replies
6. "Yes" to snapshot
7. Snapshots sent; median working days from "yes" to sent
8. Walkthroughs booked (`walkthrough_booked` count)
9. Walkthroughs held
10. Disqualified on the call, by reason
11. Objection tally, by objection

---

## 11. Walkthrough call script (30 minutes)

**Framework, stated on the record: BANT, with Need defined by the ICP gate (section 3.1) and the seven CLAUDE.md disqualifiers as hard stops.** Authority and timing come from the SOP's form gates (§03). The economics block is the SOP §07 model, on the prospect's numbers only.

### 11.1 Before the call (10 minutes, S1)

- Re-read the snapshot and `buyer_prompt_stated`.
- **Conflict check:** existing client in the same sub-niche and market (D7)? Salt client (D2)? If yes, operator decides before the call.
- Public-data check of the ICP gate. Note anything already disqualifying.
- Calendar invite carries the agenda and the recording line: "We may record this call for notes. Tell us at the start if you'd rather we didn't."

### 11.2 The call

| Time | Section | Script and questions | Answer that ends the call early |
|---|---|---|---|
| 0:00 to 2:00 | **Frame, with the exit stated** | "Thanks for the time. Plan for 30 minutes: ten on what the snapshot shows, fifteen on how you win work today, five on whether there's anything worth doing. If there isn't, I'll say so before we hang up. Still good for the full 30?" | Less than 15 minutes available: reschedule, do not compress |
| 2:00 to 10:00 | **Walk the snapshot** | "Here's what we ran: {prompts}, on {platforms}, on {dates}, {n_runs} runs each." Show the top two or three findings. Read the limits statement. Then: "Whether this matters depends on whether your buyers ask these questions this way. Do they?" Then: "What would they type instead?" | "Our buyers never ask assistants anything." Ask once where the shortlist forms. If it truly never touches search or assistants, say this isn't worth doing for AI search and test the PPC or SEO need before closing |
| 10:00 to 20:00 | **Situation and problem** | 1. "Where did your last five new clients come from?" 2. "Before a buyer contacts you, what do they check, and where?" 3. "Who owns search and paid today: in-house, an agency, or nobody?" 4. "Are you running Google or LinkedIn ads? Who manages them?" 5. "What have you tried on search or AI answers, and what stopped it working?" (Do not interrupt this one.) 6. "If nothing changes for two more quarters, what happens?" | None here. Listen. Write their words into `buyer_prompt_stated` and the call notes |
| 10:00 to 20:00 | **Qualification, woven in** | See 11.3 | Any hard stop in 11.3 |
| 20:00 to 25:00 | **Economics, prospect's numbers only** (only if they can state the inputs) | SOP §07: qualified enquiries a month today (A), close rate (B), first-year client value (C), gross margin (D), monthly capacity for new clients (E), and the additional enquiries a month that would make this worth doing (Δ, **they** set it). Then read the SOP §07 required language verbatim: "These are your numbers, not ours…" | Cannot state B or C: "You don't have that number. That's the first thing worth fixing, and it's cheaper than hiring us." Not a disqualifier, but the model does not run |
| 25:00 to 30:00 | **Recommendation and next step** | Fit: state the constraint back in their words, say what you'd do first **and what you would not start with**. "Two ways this goes. I send a scoped plan by {date} and you decide by {date}, or you tell me now it isn't for you." Put the decision date in the calendar on the call. Not a fit: name the reason, leave them the snapshot, refer out if you know someone | "Send me information" with no decision date: "What has to be in it for you to decide, and who else reads it?" No answer to either is a no; say so kindly |

### 11.3 Qualification checks and hard stops

| BANT | Question | Hard stop (CLAUDE.md §2) | What to say |
|---|---|---|---|
| Need: B2B | "When someone buys from you, who signs: a business or a consumer?" | B2C, or B2B2C where the buyer is a consumer | "Our work is built for firms selling to businesses, so I'd be the wrong hire. Better to say so now." |
| Need: size | "Roughly how many people are you, and is revenue above $3M? A band is fine." | Pre-revenue; or below both 20 staff and $3M | As above, naming size |
| Need: service | "If we did one thing, which matters most: being named in AI answers, Google rankings, or paid search?" | None of the three | End politely |
| Need: ticket | "What is a new client worth to you in the first year?" | Low-ticket transactional `[NEEDS DATA: operator threshold]` | "The economics of this work don't suit a low-ticket sale. I'd rather not take your money for it." |
| Timing | "When do you need this producing?" | Needs leads this week | "This work builds over months. If you need leads this week, I'm the wrong call." |
| Scope | "An ongoing programme, or a one-off project?" | Wants a one-off project (a site build, a single campaign) | If they want ongoing work but won't commit to three months, offer the **paid audit** as the entry point (CLAUDE.md §3). `[NEEDS DATA: paid audit scope and price]` |
| Can execute | "Can your team edit and publish on your own website, without a parent company, network or franchisor?" | Cannot edit their own website | "Then most of what would help is out of your hands. I'd tell you that now rather than in month two." |
| Can follow up | "When an enquiry comes in, who follows it up, and how fast?" | No sales process that follows up | "More enquiries won't help until someone owns the follow-up." |
| Authority | "Who else weighs in on a decision like this, and who signs?" | Not a stop | Champion only: book a second call with the signer (SOP §06 exception) |
| Budget | "Have you set a monthly budget for search or paid work? A range is fine." | Below the internal floor | Do **not** state the number (D6). "At that level I don't think we're the right fit, and I'd rather tell you now." |

### 11.4 After the call (within 4 working hours)

GHL: BANT fields, `buyer_prompt_stated`, stated economics inputs **with the date and "as stated by {name}"**, decision date (Y/N + date), disqualification reason (closed choice), next step and owner. Recap email in their words (SOP §12 S6).

---

## 12. Cross-cohort objections

Cohort-specific objections are in each sequence file.

| Objection | What is really being said | Response | Proof we can show |
|---|---|---|---|
| "Can you get us named in ChatGPT?" | Wants a promise to hold us to | "No one can promise that, and anyone who does is guessing. We control the work: what gets published, fixed and measured. The snapshot is how we'd measure it, on dated runs." | The snapshot and its run files. `/case-studies/methodology` `[NEEDS DATA: confirm the page is current and reachable]` |
| "Is this AI-generated?" | Afraid of paying for output a chat window gives free | "AI does parts of the research and drafting. A named person sets the plan, checks every finding and signs what leaves. The snapshot has a 'checked by' line with a name and date." | The `Checked by` line on their snapshot |
| "You're based in India." | Pricing the geography, or worried about availability | "Yes, Gurugram. We schedule calls in your business hours and price by scope, not by location." | `HQ_DISPLAY` in `data/siteConfig.ts`. `[NEEDS DATA: confirmed call-coverage windows per market]` |
| "What does it cost?" | Budget fit, or a price check | "It depends on scope: markets, prompts tracked, pages produced. I'll give you a written number after we've talked, not a guess now." | None needed. No public prices (icp-positioning v2.1) |
| "We tried SEO before and it didn't work." | Burned by a previous vendor | "What was it supposed to produce, what did it produce, and what did they tell you when it didn't?" Then say plainly whether you'd repeat that approach | Their own account |
| "We already have an agency." | Covered; don't want to manage a switch | "What are they accountable for, and is it arriving? If yes, the snapshot is something to hand them." | The snapshot |
| "How did you get my details?" | Privacy, possibly a complaint | "From {source}. I can delete them now and you won't hear from us again." If yes: erasure and `dnc-all` | `source` field in GHL |
| "Just send the snapshot. I don't want a call." | Time, or wants to judge the work first | "Done. The call is optional. If something in it raises a question, reply and I'll answer in writing." | The snapshot |
| "Is this one of those self-ranking lists?" | Has seen the listicles CLAUDE.md §1 describes | "No. We don't rank anyone. The snapshot records what the assistants said, with the prompt and the date, so you can rerun it yourself." | The run file: prompt, date, platform, verbatim answer |

---

## 13. Reconciliation with Iris (done 2026-10-06)

Iris's file landed while this was being written. The coordinator's direction and Iris's §C agree.

| Area | Before | After | Source |
|---|---|---|---|
| Cohort order | Cyber, MSSP, CPA, automation, 3PL and cold chain, insurance | Insurance, MSSP, GRC, transaction advisory, cold chain, automation | Coordinator; Iris §C.2 |
| Managed security | 09.02 | 09.02 only. 09.01 managed IT not targeted | Iris §C.3: NUOPTIMA publishes dated MSP city rankings |
| Cybersecurity SaaS | 01.05.04.01, SOC 2 prompt | 01.05.04 GRC only, with a dated compliance requirement in E1 | Coordinator; Iris §C.2 row 4; dates from research passes 1 and 2 |
| CPA and advisory | 02.05 and 02.06 together | 02.06.04 QoE first; 02.05 held | Coordinator; Iris §C.3 |
| Logistics | 06.01 and 06.08 | 06.08 only | Coordinator; Iris §C.3 |
| Agencies | 02.13, 02.14, 21.13 | Same, with Directive, Powered by Search and The ABM Agency named as profile examples only (D10) | Coordinator; Iris §A.7 |
| Snapshot | Prompts, platforms, dates | Adds model versions, the full prompt set and stored answers on request: the four columns no competitor publishes | Iris §A.4 |
| Pain | Brief-derived hypotheses | Taxonomy buyer descriptions plus Iris's Family Q, both labelled as not buyer speech | Iris §B.1 |

**What I did not take from Iris, and why:**

- **"6 named commercial insurance programmes" as proof** (Iris §C.1). The case-study files say these records do not establish client relationships (D1).
- **Scriblr "already stores all of these"** (Iris §0.2). That is CLAUDE.md's description of the product, not confirmation that snapshot runs go through it. icp-positioning v2.1 limits product claims to verified capabilities. Not in copy.
- **Any competitor name, figure or finding in sendable copy.** Iris's file is marked internal. Her competitor findings feed call preparation and objection handling only.
- **TIC (19.11), Iris's cohort 2.** Not in the operator's six. It is a page-publication cohort; it could join outbound later with its own Family-B prompt.
- **China and India markets** (Iris §B.3.1). Not in the CLAUDE.md §2 market list; no outbound there until the operator resolves the contradiction Iris flags.

---

## 14. Gate

Every file in `docs/outbound/` goes through Ruth (`/ship <file>`) before any send. Ruth reviews `07-agency-white-label.md` specifically against the rule that agency copy and client copy must not be able to read each other.

Word counts in the sequence files count the body from the greeting to the sender's first name. Footers are excluded.
