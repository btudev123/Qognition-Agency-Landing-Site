# Cohort 3: Cybersecurity SaaS, narrowed to GRC (01.05.04)

**DRAFT v0.1 · 2026-10-06 · Rafael · Not sent. Ruth gate pending.** Shared rules are in `docs/outbound/2026-10-outbound-system.md`.

**Scope change (coordinator; Iris §C.2 row 4 and §C.3):** GRC and compliance only, with a dated compliance requirement as the hook. Generic cybersecurity SaaS is contested: Powered by Search shows named cyber SaaS clients (Iris §A.1, observed). No competitor appears in copy.

## Taxonomy mapping (verified against `icp-taxonomy.json` v2.0.0)

| Level | ID | Name | Wave 1 |
|---|---|---|---|
| Industry | 01 | SaaS & Software | |
| Sub-industry | 01.05 | Cybersecurity SaaS | |
| Niche | 01.05.04 | GRC (A, Both) | Yes |
| Sub-niche | 01.05.04.01 | Compliance automation (SOC 2, ISO 27001) | **Yes** |
| Sub-niche | 01.05.04.02 | Enterprise GRC suites | **Yes** |
| Sub-niche | 01.05.04.03 | Third-party risk management | Later, own prompt |
| Sub-niche | 01.05.04.04 | Security questionnaires & trust centers | Later, own prompt |
| Sub-niche | 01.05.04.05 | Policy & audit management | Later, own prompt |

## List spec, cohort deltas

| Field | Value |
|---|---|
| Titles (JSON) | CMO, VP Marketing, Head of Demand Generation, Director of Product Marketing. Add Founder/CEO under 50 staff |
| Floor (JSON) | $5M+ ARR or Series A+ |
| Keywords | compliance automation, GRC, SOC 2, ISO 27001, CMMC, continuous compliance, audit readiness, Cyber Resilience Act |
| **Variant field** | `grc_framework_variant` = CMMC, CRA or SOC2, set from the frameworks **the prospect's own site** lists. No listing, no variant: default SOC2 |
| Exclude | endpoint, SIEM, IAM and other 01.05 niches (not wave 1); GRC consultancies (09.04, a services cohort); any agency partner's clients (system D11) |
| Markets, wave 1 | US for CMMC and SOC2. UK corporate subscribers for CRA. EU prospects get the CRA variant through LinkedIn only |

## The dated hooks: sources and rules

| Variant | Fact used in copy | Source and label | Fits |
|---|---|---|---|
| CMMC | "The CMMC acquisition rule took effect on 10 November 2025." | Research pass 1 §3.3: 48 CFR CMMC acquisition rule effective 10 November 2025. **observed** | Vendors whose site lists CMMC support |
| CRA | "The EU Cyber Resilience Act's reporting obligations have applied since 11 September 2026." | Research pass 2: Reg (EU) 2024/2847, reporting obligations apply from 11 September 2026, digital-strategy.ec.europa.eu. **observed** | Vendors whose site lists CRA support |
| SOC2 | None. SOC 2 is an attestation, not a deadline | Research pass 2: AICPA, attestation not certification | Default |

**Rules.** Re-check each date at the primary source on the day the batch goes (system §2, rule 1a). NIS2 and DORA appear by name only, never with a date: their dates are **reported**, not observed, in pass 2. Do not use the CMMC phase schedule beyond "four phases": no phase date is established in the research.

## Pain: hypotheses, not buyer speech

| Hypothesis | Source and label | Question that confirms or kills it |
|---|---|---|
| CISOs and IT leads ask assistants which tools satisfy SOC 2, ISO 27001, NIS2 or cyber-insurance requirements | JSON 01.05 `geo_angle`. Operator-authored | "When a CISO shortlists compliance tools, which framework are they solving for first?" |
| A marketing leader wants to know why a rival is listed for SOC 2 automation and they are not | Iris §B.2, Family Q **[I]**: "Why does ChatGPT list [competitor] for SOC 2 automation and never us?" | "Who do you lose SOC 2 deals to, and do you know why?" |
| Dated requirements create bursts of buyer research | Iris §B.2, Family Q **[I]**: "Are we named when buyers ask an assistant how to get NIS2 or DORA ready?" | "Did CMMC or the CRA change your pipeline? When?" |

## Family-B prompts

| Variant | Prompt | Label |
|---|---|---|
| CMMC | "best compliance automation tool for CMMC Level 2" | **Adapted** from JSON 01.05 ("best compliance automation tool to get SOC 2 in 90 days") and JSON 09.04 ("best CMMC Level 2 consultant for a small defense subcontractor") |
| CRA | "best compliance software for Cyber Resilience Act reporting" | **Adapted**. No CRA prompt exists in the JSON |
| SOC2 | "best compliance automation tool to get SOC 2 in 90 days" | JSON 01.05, verbatim |

## Sequence

E1 has three variants. E2 to LI-2 are shared; `{framework}` is CMMC, the Cyber Resilience Act or SOC 2.

| Step | Day | Channel | Sender | Subject / opener | Body | Exit condition |
|---|---|---|---|---|---|---|
| E1-CMMC | 0 | Email, new thread | {sender}, S1 | CMMC tools ChatGPT named | Hi {first_name},<br><br>The CMMC acquisition rule took effect on 10 November 2025. On {run_date} I asked ChatGPT: "best compliance automation tool for CMMC Level 2". It named {n_named} tools. {company} was not one of them.<br><br>One prompt, one run, one platform. An observation, not a verdict.<br><br>I can run the questions your buyers ask on ChatGPT, Perplexity, Gemini and Google AI Overviews, record who gets named and which pages get cited, and send you the snapshot. A person checks it.<br><br>Want one?<br><br>{sender_first_name} | Standard exit (system §6.1) |
| E1-CRA | 0 | Email, new thread (UK only) | {sender} | CRA reporting tools ChatGPT named | Hi {first_name},<br><br>The EU Cyber Resilience Act's reporting obligations have applied since 11 September 2026. On {run_date} I asked ChatGPT: "best compliance software for Cyber Resilience Act reporting". It named {n_named} tools. {company} was not one of them.<br><br>One prompt, one run, one platform. An observation, not a verdict.<br><br>I can run the questions your buyers ask on ChatGPT, Perplexity, Gemini and Google AI Overviews, record who gets named and which pages get cited, and send you the snapshot. A person checks it.<br><br>Want one?<br><br>{sender_first_name} | Standard exit |
| E1-SOC2 | 0 | Email, new thread | {sender} | SOC 2 tools ChatGPT named | Hi {first_name},<br><br>On {run_date} I asked ChatGPT: "best compliance automation tool to get SOC 2 in 90 days". It named {n_named} tools. {company} was not one of them.<br><br>One prompt, one run, one platform. An observation, not a verdict.<br><br>I can run the questions your buyers ask on ChatGPT, Perplexity, Gemini and Google AI Overviews, record who gets named and which pages get cited, and send you the snapshot. A person checks it.<br><br>Want one?<br><br>{sender_first_name} | Standard exit |
| LI-C | 1 | LinkedIn connection | {sender} | Note | Hi {first_name}, I look at how AI assistants answer buyer questions about compliance software. I ran one for your category this week and would like to share what came back. | Standard exit |
| E2 | 3 | Email, threaded under E1 | {sender} | (thread) | Hi {first_name},<br><br>One more detail from the {run_date} answer. It cited {k_cited} sources: {cited_mix}. None were on {company_domain}.<br><br>When an assistant cites pages, those pages shaped the answer. Which pages get picked for compliance-tool questions is checkable, and the snapshot records it prompt by prompt.<br><br>Reply "yes" and I will run the full set. If someone else owns search at {company}, tell me who.<br><br>{sender_first_name}<br><br>*No citations: E2-B. Optional signal line: system §6.4.* | Standard exit |
| CALL-1 | 4 | Phone, T1 only | {caller} | See opener below | | Standard exit, plus `dnc-call` |
| E3 | 7 | Email, new subject | {sender} | wrong framework? | Hi {first_name},<br><br>I may have picked the wrong framework. If the compliance leads who buy from {company} ask an assistant about NIS2, DORA or something else, send me their question and I will run that instead.<br><br>The snapshot lists the prompts, dates and platforms, what each answer said and cited, and what we could not see. It does not promise {company} a place in any answer. Nobody controls those systems.<br><br>{sender_first_name} | Standard exit |
| LI-1 | 8, or accept +2 | LinkedIn message | {sender} | | Thanks for connecting, {first_name}. The question was "{prompt}". On {run_date}, ChatGPT named {n_named} tools, not {company}. One run, so an observation, not a verdict. Would a full snapshot across the main assistants be useful? A person reviews it before it is sent. *(EU and UK contacts: add the privacy line from system §9.)* | Standard exit |
| CALL-2 | 10 | Phone, T1 only | {caller} | Same opener | | Standard exit |
| E4 | 12 | Email, threaded under E1 | {sender} | (thread) | Hi {first_name},<br><br>I will stop here so this does not turn into noise.<br><br>If AI answers are not on the list at {company} this quarter, a one-word reply ("later" or "no") helps me file it properly and I will not follow up. If they are, reply "yes" and I will put the snapshot together.<br><br>{sender_first_name} | Email track ends |
| LI-2 | 15 | LinkedIn message | {sender} | | Last note from me on this. If the snapshot is useful later, reply here any time. If someone else at {company} owns search, I would be glad of the name. | Sequence ends |

**Word counts:** E1-CMMC 83 · E1-CRA 86 · E1-SOC2 76 · E2 72 maximum, 84 with a signal line · E3 71 · E4 54.

## Cold call opener (CMMC variant; swap the fact and the prompt for the others)

> Hi {first_name}, it's {sender_first_name} from Qognition Agency. This is a cold call. Can I have 30 seconds, and then you tell me whether it's worth another minute?
>
> *(Yes.)*
>
> The CMMC acquisition rule took effect in November 2025. On {run_day} I asked ChatGPT for the best compliance automation tool for CMMC Level 2. It named {n_named} tools, and {company} wasn't one. One run, so not a verdict. I'm calling to ask: is that the question your buyers ask, or would they ask it differently?

## Objections

| Objection | What is really being said | Response | Proof we can show |
|---|---|---|---|
| "We're one of the known names for SOC 2." | I doubt there's a gap | "Then the snapshot should show it, and I'll tell you if it does. If you're named everywhere, there may be nothing cheap to fix, and I'd say so." | The snapshot. The "already correct" no-fit rule (SOP §05) |
| "Our buyers trust analyst reports and peer reviews, not ChatGPT." | Not convinced assistants matter | "You may be right. Where does the shortlist form? If the assistants cite those review pages, the snapshot shows which ones. If they don't, I'd rather know." | The cited-sources list in the snapshot |
| "Every agency says they do GEO now." | Sceptical of the category | "Fair. Whoever you talk to, ask for the run dates, model versions, full prompt set and stored answers. Ours has all four, and you can check them." | The snapshot's run file. Iris §A.4 is internal; never cite it to a prospect |

## DM variant (SOC 2 shown)

> Hi {first_name}. On {run_date} I asked ChatGPT for the best compliance automation tool to get SOC 2 in 90 days. {company} was not in the answer. One run, so an observation, not a verdict. Would a fuller snapshot across the main assistants be useful? Happy to send it.

## Add to the 30-minute walkthrough script

1. "Which framework brings you the most pipeline today, and which do you expect next year?"
2. "Which comparison pages about you do you own, and which are written by someone else?"
3. "Who signs off on anything published about compliance coverage: marketing, product or legal?"

## Cohort NEEDS DATA

- A primary-source re-check of the CMMC and CRA dates on each batch day.
- Observed (not reported) NIS2 and DORA dates, if a variant for them is wanted.
- Family-B prompts for 01.05.04.03 to .05.
- Operator agreement to the agency-partner client suppression (system D11), because Powered by Search's cyber SaaS clients overlap this list.
