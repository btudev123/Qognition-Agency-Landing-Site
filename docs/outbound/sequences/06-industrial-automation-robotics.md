# Cohort 6: Industrial automation and robotics (05.03)

**DRAFT v0.1 · 2026-10-06 · Rafael · Not sent. Ruth gate pending.** Shared rules are in `docs/outbound/2026-10-outbound-system.md`.

**Context (Iris §C.2 row 7):** occupied at the manufacturing level by WebFX, Directive, The ABM Agency and First Page Sage. None of them goes below sub-industry level with GEO content (Iris §A.3). This cohort competes on depth: one application, one prompt. No competitor appears in copy.

## Taxonomy mapping (verified against `icp-taxonomy.json` v2.0.0)

| Level | ID | Name | Wave 1 |
|---|---|---|---|
| Industry | 05 | Manufacturing & Industrial | |
| Sub-industry | 05.03 | Industrial Automation & Robotics | |
| Niche | 05.03.01 | Robotics & automation system integrators (A, Both) | |
| Sub-niche | 05.03.01.03 | Palletizing & end-of-line robotics | **Yes**, food and beverage served first, because the prompt names a food plant |
| Niche | 05.03.02 | Controls & PLC system integrators (A, Both) | |
| Sub-niche | 05.03.02.04 | Control system migrations | **Alternate sequence**, prompt below |
| Niche | 05.03.03 | Custom machine builders (A, AI SEO) | Later. `[NEEDS DATA: Family-B prompt]` |

## List spec, cohort deltas

| Field | Value |
|---|---|
| Titles (JSON) | President / Owner, VP Sales, Director of Business Development, Marketing Manager. Many firms have no CMO; the owner is the buyer |
| Floor (JSON) | $8M+ revenue or 40+ engineers |
| Keywords | robotic palletizing, end-of-line automation, robot integrator, system integrator, PLC migration, controls integration |
| Exclude | robot OEMs and distributors (05.03.05); panel builders (05.03.06); integrators with no palletizing or end-of-line work on their site |
| Markets, wave 1 | US, then Canada (CASL evidence), then UK |

## Pain: hypotheses, not buyer speech

| Hypothesis | Source and label | Question that confirms or kills it |
|---|---|---|
| Plant engineers and sourcing teams shortlist integrators by application (welding, palletizing, machine tending), backed by case studies, cycle-time results and partner certifications | JSON 05.03 `geo_angle`; JSON 05 buyer "engineers and sourcing teams" (Iris §B.2). Operator-authored | "When a plant engineer shortlists integrators for a palletizing line, what do they check first?" |
| Work arrives through robot OEM referrals and trade shows | **[I]** mine | "Where did your last five projects come from?" |
| Customer NDAs limit what an integrator can publish | **[I]** mine | "How many of your projects can you show publicly?" |

Iris's Family Q for industry 05 refers to contract manufacturing (05.02), not 05.03, so none is quoted here.

## Family-B prompts

- **Primary:** "best robotic palletizing integrator for a food plant" (JSON 05.03, verbatim).
- **Alternate (05.03.02.04):** "controls integrator to migrate a legacy PLC system with minimal downtime" (JSON 05.03, verbatim). Swap it into E1, LI-1, the call opener and the DM; in E3, use "a controls migration partner".

## Sequence (palletizing)

| Step | Day | Channel | Sender | Subject / opener | Body | Exit condition |
|---|---|---|---|---|---|---|
| E1 | 0 | Email, new thread | {sender}, S1 | palletizing integrators ChatGPT named | Hi {first_name},<br><br>On {run_date} I asked ChatGPT: "best robotic palletizing integrator for a food plant". It named {n_named} integrators. {company} was not one of them.<br><br>One prompt, one run, one platform. An observation, not a verdict.<br><br>I can run the questions your buyers ask on ChatGPT, Perplexity, Gemini and Google AI Overviews, record who gets named and which pages get cited, and send you the snapshot. A person reviews it before it goes out.<br><br>Want one?<br><br>{sender_first_name} | Standard exit (system §6.1) |
| LI-C | 1 | LinkedIn connection | {sender} | Note | Hi {first_name}, I look at how AI assistants answer buyer questions about robotic integrators. I ran one for your category this week and would like to share what came back. | Standard exit |
| E2 | 3 | Email, threaded under E1 | {sender} | (thread) | Hi {first_name},<br><br>One more detail from the {run_date} answer. It cited {k_cited} sources: {cited_mix}. None were on {company_domain}.<br><br>When an assistant cites pages, those pages shaped the answer. Which pages get picked for palletizing questions is checkable, and the snapshot records it prompt by prompt.<br><br>Reply "yes" and I will run the full set. If someone else owns search at {company}, tell me who.<br><br>{sender_first_name}<br><br>*No citations: E2-B. Optional signal line: system §6.4.* | Standard exit |
| CALL-1 | 4 | Phone, T1 only | {caller} | See opener below | | Standard exit, plus `dnc-call` |
| E3 | 7 | Email, new subject | {sender} | wrong question? | Hi {first_name},<br><br>I may have picked the wrong prompt. If the plant engineers who hire {company} ask an assistant something other than a palletizing integrator, send me their question and I will run that instead.<br><br>The snapshot lists the prompts, dates and platforms, what each answer said and cited, and what we could not see. It does not promise {company} a place in any answer. Nobody controls those systems.<br><br>{sender_first_name} | Standard exit |
| LI-1 | 8, or accept +2 | LinkedIn message | {sender} | | Thanks for connecting, {first_name}. The question was "best robotic palletizing integrator for a food plant". On {run_date}, ChatGPT named {n_named} integrators, not {company}. One run, so an observation, not a verdict. Would a full snapshot across the main assistants be useful? A person reviews it before it is sent. | Standard exit |
| CALL-2 | 10 | Phone, T1 only | {caller} | Same opener | | Standard exit |
| E4 | 12 | Email, threaded under E1 | {sender} | (thread) | Hi {first_name},<br><br>I will stop here so this does not turn into noise.<br><br>If AI answers are not on the list at {company} this quarter, a one-word reply ("later" or "no") helps me file it properly and I will not follow up. If they are, reply "yes" and I will put the snapshot together.<br><br>{sender_first_name} | Email track ends |
| LI-2 | 15 | LinkedIn message | {sender} | | Last note from me on this. If the snapshot is useful later, reply here any time. If someone else at {company} owns search, I would be glad of the name. | Sequence ends |

**Word counts:** E1 77 · E2 72 maximum, 84 with a signal line · E3 70 · E4 54.

## Cold call opener

> Hi {first_name}, it's {sender_first_name} from Qognition Agency. This is a cold call. Can I have 30 seconds, and then you tell me whether it's worth another minute?
>
> *(Yes.)*
>
> On {run_day} I asked ChatGPT for the best robotic palletizing integrator for a food plant. It named {n_named} integrators, and {company} wasn't one. One run, so I'm not calling with a verdict. I'm calling to ask: is that how plant engineers look for an integrator, or do they ask differently?

## Objections

| Objection | What is really being said | Response | Proof we can show |
|---|---|---|---|
| "Our work comes from OEM referrals and trade shows." | Search isn't our channel | "Makes sense. When a plant engineer hears your name at a show and checks you afterwards, what do they find? The snapshot shows the assistant part of that." | The snapshot |
| "Engineers don't use ChatGPT to pick integrators." | Not convinced assistants matter | "You may be right. Where do they build the shortlist? If it's OEM partner directories, that's worth knowing, and it changes what I'd look at." | Their answer. `[NEEDS DATA: no dated source on how engineers research integrators]` |
| "We can't publish customer projects. NDAs." | We have nothing to show | "Common in integration work. The snapshot shows which pages were cited for the integrators that were named, so you can judge what's possible without breaching an NDA." | The cited-pages list |

## DM variant

> Hi {first_name}. On {run_date} I asked ChatGPT for the best robotic palletizing integrator for a food plant. {company} was not in the answer. One run, so an observation, not a verdict. Would a fuller snapshot across the main assistants be useful? Happy to send it.

## Add to the 30-minute walkthrough script

1. "Which applications do you want more of: palletizing, welding, machine tending, controls migrations?"
2. "Which robot OEM partner tiers do you hold, and do those directories send you leads?"
3. "How many of your projects can you show publicly, with or without the customer's name?"

## Cohort NEEDS DATA

- A Family-B prompt for custom machine builders (05.03.03).
- Nadia's demand data (Iris names 09.07 ERP partners as the alternate if the data disagrees with 05.03).
