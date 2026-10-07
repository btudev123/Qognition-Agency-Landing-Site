# Cohort 4: Transaction advisory first (02.06.04), CPA held (02.05)

**DRAFT v0.1 · 2026-10-06 · Rafael · Not sent. Ruth gate pending.** Shared rules are in `docs/outbound/2026-10-outbound-system.md`.

**Release conditions (system D2).** **QoE (02.06.04)** may go once three things exist: the Salt disclosure line, the Agency and Salt data-separation statement, and a cross-brand suppression check against Salt's CRM. **CPA (02.05), outsourced CFO (02.06.01) and bookkeeping (02.06.02) stay held** until the operator decides. Salt Accounting Group sells bookkeeping, fractional CFO and white-label services to accountancy firms, under the same CEO.

**Order change (coordinator; Iris §C.3):** 02.06 goes ahead of 02.05. Its A niches are AI-SEO-led in the JSON, and lower-middle-market M&A advisers are also partnership channel #2 in CLAUDE.md §3.

**Vocabulary.** Never "audit" for our offer in this cohort. To this buyer it has a statutory meaning. Use "snapshot".

## Taxonomy mapping (verified against `icp-taxonomy.json` v2.0.0)

| Level | ID | Name | Status |
|---|---|---|---|
| Industry | 02 | Professional & Business Services | |
| Sub-industry | 02.06 | Outsourced Finance & Transaction Advisory | |
| Sub-niche | 02.06.04.01 | Quality of earnings (QoE) | **Wave 1, after D2 (b) to (d)** |
| Sub-niche | 02.06.04.02 | Financial due diligence | Wave 1, same prompt fits |
| Sub-niche | 02.06.04.04 | Sell-side readiness & vendor diligence | Later, own prompt |
| Niche | 02.06.06 | Lower middle-market M&A advisors | **Not this sequence.** They are partnership prospects (CLAUDE.md §3 channel #2). `[NEEDS DATA: partnership offer for M&A advisers. Not drafted here]` |
| Niche | 02.06.01 | Outsourced CFO firms | **Held.** Competes with Salt |
| Niche | 02.06.02 | Bookkeeping-as-a-service | **Held.** Competes with Salt |
| Sub-industry | 02.05 | CPA, Tax & Audit Firms | **Held.** Salt's white-label buyers |
| Sub-niche | 02.05.02.01 | Construction & real estate CPAs | Held variant drafted below |

## List spec, cohort deltas (QoE)

| Field | Value |
|---|---|
| Titles (JSON 02.06) | Founder/CEO, Managing Director, Head of Marketing, Partner, Business Development |
| Floor (JSON) | $3M+ revenue or 20+ staff |
| Keywords | quality of earnings, QoE, financial due diligence, transaction advisory, buy-side diligence, sell-side diligence |
| Exclude | Big Four and other firms with 10,000+ staff (above the ICP band, so inbound only); Salt clients and prospects; firms where QoE is one line among general accounting services (these are 02.05, held) |
| Markets, wave 1 | US first |

## Pain: hypotheses, not buyer speech

| Hypothesis | Source and label | Question that confirms or kills it |
|---|---|---|
| Founders and PE firms ask assistants who to hire for QoE or a valuation | JSON 02.06 `geo_angle`: "Win AI answers when founders and PE firms ask who to hire for CFO work, QoE or a valuation". Operator-authored | "When a deal team needs a QoE provider, how does the shortlist form?" |
| Assistants default to the largest firms, and mid-size providers are left out | Iris §B.2, Family Q **[I]**: "Why does an assistant name only the Big Four when a PE associate asks who does QoE?" **Not in copy**: it asserts what assistants do | "When you lose a QoE engagement, who to?" |
| Work arrives through PE relationships and M&A advisers | **[I]** mine | "Where did your last five engagements come from?" |

## Family-B prompt

**"who does quality of earnings reports for lower middle market deals"** (JSON 02.06 `ai_prompts`, verbatim).

## Sequence (QoE)

| Step | Day | Channel | Sender | Subject / opener | Body | Exit condition |
|---|---|---|---|---|---|---|
| E1 | 0 | Email, new thread | {sender}, S1 | QoE providers ChatGPT named | Hi {first_name},<br><br>On {run_date} I asked ChatGPT: "who does quality of earnings reports for lower middle market deals". It named {n_named} firms. {company} was not one of them.<br><br>One prompt, one run, one platform. An observation, not a verdict.<br><br>I can run the questions your buyers ask on ChatGPT, Perplexity, Gemini and Google AI Overviews, record who gets named and which pages get cited, and send you the snapshot. A person reviews it before it goes out.<br><br>Want one?<br><br>{sender_first_name} | Standard exit (system §6.1) |
| LI-C | 1 | LinkedIn connection | {sender} | Note | Hi {first_name}, I look at how AI assistants answer buyer questions about quality of earnings work. I ran one for your category this week and would like to share what came back. | Standard exit |
| E2 | 3 | Email, threaded under E1 | {sender} | (thread) | Hi {first_name},<br><br>One more detail from the {run_date} answer. It cited {k_cited} sources: {cited_mix}. None were on {company_domain}.<br><br>When an assistant cites pages, those pages shaped the answer. Which pages get picked for QoE questions is checkable, and the snapshot records it prompt by prompt.<br><br>Reply "yes" and I will run the full set. If someone else owns search at {company}, tell me who.<br><br>{sender_first_name}<br><br>*No citations: E2-B. Optional signal line: system §6.4.* | Standard exit |
| CALL-1 | 4 | Phone, T1 only | {caller} | See opener below | | Standard exit, plus `dnc-call` |
| E3 | 7 | Email, new subject | {sender} | wrong question? | Hi {first_name},<br><br>I may have picked the wrong prompt. If the PE deal teams and founders who hire {company} ask an assistant something other than "who does QoE", send me their question and I will run that instead.<br><br>The snapshot lists the prompts, dates and platforms, what each answer said and cited, and what we could not see. It does not promise {company} a place in any answer. Nobody controls those systems.<br><br>{sender_first_name} | Standard exit |
| LI-1 | 8, or accept +2 | LinkedIn message | {sender} | | Thanks for connecting, {first_name}. The question was "who does quality of earnings reports for lower middle market deals". On {run_date}, ChatGPT named {n_named} firms, not {company}. One run, so an observation, not a verdict. Would a full snapshot across the main assistants be useful? A person reviews it before it is sent. | Standard exit |
| CALL-2 | 10 | Phone, T1 only | {caller} | Same opener | | Standard exit |
| E4 | 12 | Email, threaded under E1 | {sender} | (thread) | Hi {first_name},<br><br>I will stop here so this does not turn into noise.<br><br>If AI answers are not on the list at {company} this quarter, a one-word reply ("later" or "no") helps me file it properly and I will not follow up. If they are, reply "yes" and I will put the snapshot together.<br><br>{sender_first_name} | Email track ends |
| LI-2 | 15 | LinkedIn message | {sender} | | Last note from me on this. If the snapshot is useful later, reply here any time. If someone else at {company} owns search, I would be glad of the name. | Sequence ends |

**Word counts:** E1 80 · E2 72 maximum, 84 with a signal line · E3 73 · E4 54.

## Cold call opener

> Hi {first_name}, it's {sender_first_name} from Qognition Agency. This is a cold call. Can I have 30 seconds, and then you tell me whether it's worth another minute?
>
> *(Yes.)*
>
> On {run_day} I asked ChatGPT who does quality of earnings reports for lower-middle-market deals. It named {n_named} firms, and {company} wasn't one. One run, so I'm not calling with a verdict. I'm calling to ask: is that how deal teams look for a QoE provider, or do they ask differently?

## Objections

| Objection | What is really being said | Response | Proof we can show |
|---|---|---|---|
| "Our work comes from PE relationships and referrals." | Search isn't how we grow | "That's the strongest channel there is. When a referred deal team checks you before the first call, what do they find? The snapshot shows one part of that." | The snapshot |
| "Professional rules limit what we can say in marketing." | Fear of breaching our own conduct rules | "Understood. The snapshot makes no recommendation about your claims. It records what assistants say about firms like yours. Anything we wrote later would go through your review first." | `[NEEDS DATA: a written client-approval step in the delivery process]` |
| "Aren't you connected to an accounting firm?" | Conflict of interest; is our data safe | `[NEEDS DATA: operator-approved disclosure line (D2 b)]`. Draft for approval: "Yes. Qognition Agency and Salt Accounting Group share ownership. {data-separation statement}." Never deny or deflect | `[NEEDS DATA: written Agency and Salt data-separation statement (D2 c)]` |

## DM variant

> Hi {first_name}. On {run_date} I asked ChatGPT who does quality of earnings reports for lower middle market deals. {company} was not in the answer. One run, so an observation, not a verdict. Would a fuller snapshot across the main assistants be useful? Happy to send it.

## Add to the 30-minute walkthrough script

1. "Which deal sizes and sectors do you want more of next year?"
2. "Who in the firm approves marketing content: marketing, a partner, or risk?"
3. Pre-call, internal: Salt conflict check (system §11.1). Never ask the prospect about it.

---

## HELD: CPA variant (02.05.02.01). Do not send before D2 (a)

Prompt: **"best CPA firm for a $50M construction company in {metro}"**, adapted from JSON 02.05 (verbatim: "best CPA firm for a $50M construction company") by adding the metro. The JSON `geo_angle` says CPA firms are recommended "in each metro"; without a metro, a regional firm's absence tells it nothing. Titles: Managing Partner, CMO, Director of Marketing, Chief Growth Officer. Floor: $5M+ revenue or 40+ staff.

| Step | Day | Channel | Sender | Subject / opener | Body | Exit condition |
|---|---|---|---|---|---|---|
| E1 | 0 | Email, new thread | {sender} | construction CPA firms ChatGPT named | Hi {first_name},<br><br>On {run_date} I asked ChatGPT: "best CPA firm for a $50M construction company in {metro}". It named {n_named} firms. {company} was not one of them.<br><br>One prompt, one run, one platform. An observation, not a verdict.<br><br>I can run the questions your prospective clients ask on ChatGPT, Perplexity, Gemini and Google AI Overviews, record who gets named and which pages get cited, and send you the snapshot. A person reviews it before it goes out.<br><br>Want one?<br><br>{sender_first_name} | Standard exit |
| E3 | 7 | Email, new subject | {sender} | wrong question? | Hi {first_name},<br><br>I may have picked the wrong prompt. If the owners and CFOs who hire {company} ask an assistant something other than this one, send me their question and I will run that instead.<br><br>The snapshot lists the prompts, dates and platforms, what each answer said and cited, and what we could not see. It does not promise {company} a place in any answer. Nobody controls those systems.<br><br>{sender_first_name} | Standard exit |

E2, E4, LinkedIn, call and DM follow the QoE table, with the prompt swapped and "CPA" in place of "QoE". **Word counts:** E1 80 · E3 70.

## Cohort NEEDS DATA

- D2 (a) to (d): the go or no-go on 02.05 and 02.06.01, the disclosure line, the data-separation statement, and the Salt CRM suppression.
- A targeted competition search for QoE and valuation GEO specialists (Iris NEEDS DATA).
- A partnership offer for lower-middle-market M&A advisers (CLAUDE.md §3 channel #2).
- A written client-approval step for professional-services clients' content.
