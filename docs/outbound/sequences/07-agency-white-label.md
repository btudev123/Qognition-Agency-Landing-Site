# Cohort 7: Agency white-label, written to agency principals

**DRAFT v0.1 · 2026-10-06 · Rafael · Not sent. Ruth review is mandatory** (CLAUDE.md, 2026-09-29: agency copy and client copy must not be able to read each other). Shared rules are in `docs/outbound/2026-10-outbound-system.md`.

**Who this is for.** The principal of a B2B marketing, demand-gen, ABM, PR or franchise-development agency who buys **delivery capacity**. Every message is written to that person. No message addresses, names, describes or offers to contact any of their clients.

**Routing.** Replies go to the **Agency Partners** GHL pipeline, tagged `seg-agency` (system D5). The SOP §03 rule sending white-label enquiries to a partner inbox is superseded by the 2026-09-29 operator decision.

## Taxonomy mapping (verified against `icp-taxonomy.json` v2.0.0)

| ID | Name | Wave 1 | Family-B prompt for the agency's own category (JSON, verbatim) |
|---|---|---|---|
| 02.13.01 | Demand generation agencies | **Yes** | "best B2B demand generation agency for SaaS companies" |
| 02.13.02 | ABM agencies | **Yes** | "top ABM agencies for enterprise tech companies" |
| 02.14 | PR, Communications & Brand Agencies | Yes, low volume | "best B2B tech PR firms for a Series B startup" |
| 21.13.01 | Franchise development marketing agencies | Yes, low volume | "best franchise development marketing agency to generate qualified franchise leads" |
| 02.13.03 | B2B SEO & content agencies, incl. 02.13.03.02 GEO & AI search agencies | **Excluded.** Competitors for wave 1 | |

**The five head terms** (`b2b marketing agency`, `b2b seo agency`, `abm agency`, `franchise marketing agency`, `franchise development marketing`) are never targeted by a page or a paid campaign (CLAUDE.md §2). The franchise prompt above contains one of them. It is a prompt we **run** and report, not a term we target.

## Account profile, with named examples

Profile: an established B2B agency (JSON floor $3M+ revenue or 25+ staff for 02.13; $3M+ or 20+ staff for 02.14; $3M+ or 20+ franchise brand clients for 21.13) that sells to B2B marketing leaders and either lists AI search or GEO as a service or has clients likely to ask for it.

**Named examples of the profile (coordinator; Iris §A.1 and §A.7).** These illustrate who fits. **Whether they are contacted is the operator's decision (system D10).**

| Agency | Segment | Why it fits the profile (Iris §A.1, observed 2026-10-06) |
|---|---|---|
| Directive | 02.13.01 | B2B demand-gen agency across technology, industrial and services; 3 of 6 case studies on its index mention AI search |
| Powered by Search | 02.13.01 | B2B demand-gen agency weighted to SaaS and cybersecurity; publishes a GEO service page |
| The ABM Agency | 02.13.02 | Enterprise ABM agency; publishes a GEO services page |

**Rules for these three and any agency like them:**

- They get the **standard sequence below**. No comparison, no displacement messaging, no reference to their published claims, prices, guarantees or figures.
- **Nothing from Iris's teardown appears in anything sent to them.** It is an internal file.
- If one is named in the stored answer for its own category, use E2-named. Never present that as a weakness or a strength.
- Iris observed `www.abmagency.com` redirecting to a different registrable domain on 2026-10-06. Use the bare domain if anyone checks the site. Do not link to it.
- If any of them signs as a partner, its disclosed clients go on our outbound suppression list (system D11). Powered by Search's cybersecurity SaaS clients overlap cohort 3.

## Titles and list spec

| Field | Value |
|---|---|
| Titles (JSON) | 02.13: Founder/CEO, Managing Director, Head of Growth, New Business Director · 02.14: Founder/CEO, Managing Partner, Head of New Business, Marketing Director · 21.13: CEO/Founder, Managing Partner, VP Client Services, Head of Growth |
| Exclude | agencies serving mainly B2C or local consumer businesses; 02.13.03; any agency already a Qognition partner or client |
| Markets, wave 1 | US, UK (corporate subscribers), Canada (CASL evidence), Australia (Spam Act evidence) |

## Pain: hypotheses, not buyer speech

| Hypothesis | Source and label | Question that confirms or kills it |
|---|---|---|
| Agencies buy GEO for themselves first, then need to win "best B2B agency for X" answers | JSON 02.13 `geo_angle`. Operator-authored | "Have you looked at what assistants say when someone asks for an agency like yours?" |
| Clients are starting to ask their agency for AI search work, and the agency needs delivery capacity for it | **[I]** mine. No source | "Are clients asking you for AI search work yet?" (E3 asks this directly) |
| Partnerships with agencies are an acquisition channel for Qognition | CLAUDE.md §3 (channel #2); Iris §C.2 row 8 | Not a prospect question. It is why this sequence exists |

## Sequence

| Step | Day | Channel | Sender | Subject / opener | Body | Exit condition |
|---|---|---|---|---|---|---|
| E1 | 0 | Email, new thread | {sender}, S1 | white-label AI search capacity | Hi {first_name},<br><br>When a client of {agency} asks for AI search work, meaning how they show up in ChatGPT, Perplexity or Google AI Overviews, who delivers it?<br><br>We do that work white-label for agencies. Your brand on the deliverable, you keep the client, our team does the work. **[CONFIRM D8 before use, or delete:** We already work this way under NDA, which is why I can't name anyone.**]**<br><br>To show the format, I can run a snapshot on {agency}'s own category and send it to you.<br><br>Worth a look?<br><br>{sender_first_name} | Standard exit (system §6.1) |
| LI-C | 1 | LinkedIn connection | {sender} | Note | Hi {first_name}, we deliver AI search work white-label for B2B agencies, under the agency's brand. Never in front of your clients. Would be good to be connected. | Standard exit |
| E2-absent | 3 | Email, threaded under E1 | {sender} | (thread) | Hi {first_name},<br><br>I ran it. On {run_date} I asked ChatGPT: "{agency_prompt}". It named {n_named} agencies. {agency} was not one of them.<br><br>One run, one platform, so an observation, not a verdict. The full snapshot covers the main assistants and lists the pages each answer cited.<br><br>Same offer stands: reply "yes" and I will send it. It doubles as a sample of what your clients would receive under your brand.<br><br>{sender_first_name} | Standard exit |
| E2-named | 3 | Email, threaded under E1 | {sender} | (thread) | Hi {first_name},<br><br>I ran it. On {run_date} I asked ChatGPT: "{agency_prompt}". It named {n_named} agencies, {agency} among them.<br><br>One run, one platform, so an observation, not a verdict. The full snapshot covers the main assistants and lists the pages each answer cited.<br><br>Reply "yes" and I will send it. It doubles as a sample of what your clients would receive under your brand.<br><br>{sender_first_name} | Standard exit |
| CALL-1 | 4 | Phone, T1 only | {caller} | See opener below | | Standard exit, plus `dnc-call` |
| E3 | 7 | Email, new subject | {sender} | how white-label would work | Hi {first_name},<br><br>How it would work, briefly. You keep the client and the brand. We run the prompt tracking, the research and the delivery, and report through you. We never contact your clients, and that goes in the contract with a non-solicit. **[CONFIRM: non-solicit is standard in our white-label agreement]**<br><br>One question, since it decides whether this is worth a call: are your clients asking you for AI search work yet, or not yet?<br><br>{sender_first_name} | Standard exit |
| LI-1 | 8, or accept +2 | LinkedIn message | {sender} | | Thanks for connecting, {first_name}. Short version: when your clients want AI search work, we deliver it under your brand and never contact them. I can run a snapshot on {agency}'s own category to show the format. Useful? | Standard exit |
| CALL-2 | 10 | Phone, T1 only | {caller} | Same opener | | Standard exit |
| E4 | 12 | Email, threaded under E1 | {sender} | (thread) | Hi {first_name},<br><br>I will stop here so this does not turn into noise.<br><br>If white-label AI search is not on the list at {agency} this quarter, a one-word reply ("later" or "no") helps me file it properly and I will not follow up. If it is, reply "yes" and I will send the snapshot on your own category.<br><br>{sender_first_name} | Email track ends |
| LI-2 | 15 | LinkedIn message | {sender} | | Last note from me on this. If capacity for AI search work becomes useful later, reply here any time. | Sequence ends |

**Word counts:** E1 83 with the D8 line, 69 without · E2-absent 77, 79 with the longest agency prompt · E2-named 71, 73 · E3 67 · E4 58.

## Cold call opener

> Hi {first_name}, it's {sender_first_name} from Qognition Agency. This is a cold call. Can I have 30 seconds, and then you tell me whether it's worth another minute?
>
> *(Yes.)*
>
> We deliver AI search work white-label for B2B agencies: your brand, your client relationship, our team doing the work. I'm calling with one question. Are your clients asking you for AI search yet? If they are, who's doing it for you today?

## Objections

| Objection | What is really being said | Response | Proof we can show |
|---|---|---|---|
| "You sell to B2B firms directly. You'll compete for my clients." | Poaching risk | "Fair concern, and it should be in writing: NDA, non-solicit, and your clients go on our outbound suppression list the day we sign. From then on, we only reach them through you." | `[NEEDS DATA: white-label agreement with non-solicit clause]` · system D11 suppression policy |
| "We'd rather build this in-house." | We want to own the capability | "Reasonable. Then the useful thing I can offer is the snapshot on your own category, free. If you build in-house and need overflow later, you know where we are." | The snapshot |
| "Your margin leaves us nothing." | Price check | "Then we haven't scoped it right for you yet. What do clients pay you for search work today, and what do you need to keep?" Never discount on the call | None. `[NEEDS DATA: white-label pricing basis]` |

## DM variant

> Hi {first_name}. We deliver AI search work white-label for B2B agencies, under the agency's brand, never in front of your clients. Happy to run a snapshot on {agency}'s own category to show the format. Useful?

## Add to the 30-minute walkthrough script (agency version)

Replace the Need questions in system §11.3 with these. The ICP gate and disqualifiers still apply to the agency itself.

1. "How many clients have asked you for AI search work in the last six months?"
2. "Who delivers it today: in-house, a freelancer, another partner, or nobody?"
3. "What do you need from a white-label partner: reporting format, response times, who's on client calls?"
4. "Which of your clients' industries would come first?" Record the industries only. Never record or ask for client names on this call.

## Cohort NEEDS DATA

- The operator's decision on whether Directive, Powered by Search and The ABM Agency are contacted (D10).
- D8 confirmation, or delete the bracketed line in E1.
- A white-label agreement with NDA and non-solicit; the pricing basis.
- Operator agreement to the partner-client suppression policy (D11).
