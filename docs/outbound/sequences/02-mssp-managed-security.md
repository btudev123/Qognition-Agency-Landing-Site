# Cohort 2: MSSP, MDR and SOC-as-a-service (09.02)

**DRAFT v0.1 · 2026-10-06 · Rafael · Not sent. Ruth gate pending.** Shared rules are in `docs/outbound/2026-10-outbound-system.md`.

**Scope change (coordinator and Iris §C.3):** 09.02 only. Managed IT (09.01) is not targeted, because NUOPTIMA now publishes dated city-level MSP AI-visibility rankings. That is internal context. **It never appears in copy.**

## Taxonomy mapping (verified against `icp-taxonomy.json` v2.0.0)

| Level | ID | Name | Wave 1 |
|---|---|---|---|
| Industry | 09 | Technology & IT Services | |
| Sub-industry | 09.02 | Managed security services | |
| Sub-niche | 09.02.01.01 | Mid-market MSSPs | **Yes** |
| Sub-niche | 09.02.01.02 | Enterprise MSSPs | **Yes** |
| Sub-niche | 09.02.01.04 | Regulated-industry MSSPs (healthcare, finance) | Later, with its own prompt |
| Sub-niche | 09.02.01.03 | Channel MSSPs serving MSPs | **Excluded.** Their buyer is an MSP; the prompt does not fit |
| Sub-niche | 09.02.02.01 | Endpoint & XDR-based MDR | **Yes** |
| Sub-niche | 09.02.03.01 | 24/7 outsourced SOC | **Yes** |
| Sub-niche | 09.02.03.02 | Co-managed SIEM | **Yes** |

## List spec, cohort deltas

| Field | Value |
|---|---|
| Titles (JSON) | CMO, VP Marketing, Head of Demand Generation, Chief Revenue Officer. Add Founder/CEO under 100 staff |
| Floor (JSON) | $5M+ revenue or 40+ staff |
| Keywords | managed detection and response, MDR, MSSP, managed security services, SOC as a service, 24/7 SOC, co-managed SIEM, XDR |
| Exclude | firms whose primary positioning is managed IT or MSP (09.01); channel-only MSSPs; security product vendors (they are cohort 3 or not in wave 1) |
| Markets, wave 1 | US, then UK corporate subscribers, then Canada with CASL evidence |

## Pain: hypotheses, not buyer speech

| Hypothesis | Source and label | Question that confirms or kills it |
|---|---|---|
| Mid-market buyers compare MDR providers on 24/7 coverage, response times and compliance fit | JSON 09.02 `geo_angle` ("compare MSSP and MDR options on 24/7 coverage, response times and compliance fit"). Operator-authored | "When a mid-market IT director shortlists MDR providers, what do they compare you on?" |
| A marketing leader wants to know why a competitor is recommended for a specific vertical | Iris §B.2, Family Q **[I]**: "Why does ChatGPT recommend [competitor] as the MDR for manufacturers?" | "Which verticals do you want more of, and who do you lose those deals to?" |
| New logos come through channel and vendor partners as much as direct search | **[I]** mine | "What share of new logos came direct last year, and what share through MSPs or vendors?" |

## Family-B prompt

**"best managed detection and response for mid-market companies with a 24/7 SOC"** (JSON 09.02 `ai_prompts`, verbatim). Alternate for MSSP-led firms, also verbatim: "MSSP vs MDR provider for a 500-employee manufacturer with no in-house security team".

## Sequence

| Step | Day | Channel | Sender | Subject / opener | Body | Exit condition |
|---|---|---|---|---|---|---|
| E1 | 0 | Email, new thread | {sender}, S1 | MDR providers ChatGPT named | Hi {first_name},<br><br>On {run_date} I asked ChatGPT: "best managed detection and response for mid-market companies with a 24/7 SOC". It named {n_named} providers. {company} was not one of them.<br><br>One prompt, one run, one platform. An observation, not a verdict.<br><br>I can run the questions your buyers ask on ChatGPT, Perplexity, Gemini and Google AI Overviews, record who gets named and which pages get cited, and send you the snapshot. A person reviews it before it goes out.<br><br>Want one?<br><br>{sender_first_name} | Standard exit (system §6.1) |
| LI-C | 1 | LinkedIn connection | {sender} | Note | Hi {first_name}, I look at how AI assistants answer buyer questions about MDR and managed security. I ran one for your category this week and would like to share what came back. | Standard exit |
| E2 | 3 | Email, threaded under E1 | {sender} | (thread) | Hi {first_name},<br><br>One more detail from the {run_date} answer. It cited {k_cited} sources: {cited_mix}. None were on {company_domain}.<br><br>When an assistant cites pages, those pages shaped the answer. Which pages get picked for MDR questions is checkable, and the snapshot records it prompt by prompt.<br><br>Reply "yes" and I will run the full set. If someone else owns search at {company}, tell me who.<br><br>{sender_first_name}<br><br>*No citations: E2-B. Optional signal line: system §6.4.* | Standard exit |
| CALL-1 | 4 | Phone, T1 only | {caller} | See opener below | | Standard exit, plus `dnc-call` |
| E3 | 7 | Email, new subject | {sender} | wrong question? | Hi {first_name},<br><br>I may have picked the wrong prompt. If the IT directors who buy from {company} ask an assistant something other than MDR for the mid-market, send me their question and I will run that instead.<br><br>The snapshot lists the prompts, dates and platforms, what each answer said and cited, and what we could not see. It does not promise {company} a place in any answer. Nobody controls those systems.<br><br>{sender_first_name} | Standard exit |
| LI-1 | 8, or accept +2 | LinkedIn message | {sender} | | Thanks for connecting, {first_name}. The question was "best managed detection and response for mid-market companies with a 24/7 SOC". On {run_date}, ChatGPT named {n_named} providers, not {company}. One run, so an observation, not a verdict. Would a full snapshot across the main assistants be useful? A person reviews it before it is sent. | Standard exit |
| CALL-2 | 10 | Phone, T1 only | {caller} | Same opener | | Standard exit |
| E4 | 12 | Email, threaded under E1 | {sender} | (thread) | Hi {first_name},<br><br>I will stop here so this does not turn into noise.<br><br>If AI answers are not on the list at {company} this quarter, a one-word reply ("later" or "no") helps me file it properly and I will not follow up. If they are, reply "yes" and I will put the snapshot together.<br><br>{sender_first_name} | Email track ends |
| LI-2 | 15 | LinkedIn message | {sender} | | Last note from me on this. If the snapshot is useful later, reply here any time. If someone else at {company} owns search, I would be glad of the name. | Sequence ends |

**Word counts:** E1 81 · E2 72 maximum with an 8-word `{cited_mix}`, 84 with a signal line · E3 72 · E4 54.

## Cold call opener

> Hi {first_name}, it's {sender_first_name} from Qognition Agency. This is a cold call. Can I have 30 seconds, and then you tell me whether it's worth another minute?
>
> *(Yes.)*
>
> On {run_day} I asked ChatGPT for the best managed detection and response provider for a mid-market company with a 24/7 SOC. It named {n_named} providers, and {company} wasn't one. One run, so I'm not calling with a verdict. I'm calling to ask: is that how your buyers ask, or would they phrase it differently?

## Objections

| Objection | What is really being said | Response | Proof we can show |
|---|---|---|---|
| "Our deals come through partners and referrals, not search." | Channel-led; I doubt search matters here | "Then the snapshot may matter less, and I'd rather know. When a referred buyer checks you before the first call, where do they look?" | Their answer. `[NEEDS DATA: no dated source on MSSP buyer research behaviour]` |
| "We can't publish detail on how our SOC works." | Security limits what we can say publicly | "Understood. The snapshot shows which pages the assistants cited for the providers they named. You decide what, if anything, you're comfortable publishing in response." | The cited-pages list in the snapshot |
| "We get pitched by agencies every day." | You are one of twenty | "Fair. What I can show you is the record itself: prompt, date, platform and the answer text, so you can rerun it." | The stored run file |

**Verbal only, after D8 is confirmed:** "We've delivered security marketing work under white-label NDAs, so I can't name the firms." Labelled **reported** in CLAUDE.md §2. Never in writing.

## DM variant

> Hi {first_name}. On {run_date} I asked ChatGPT for the best managed detection and response provider for mid-market companies with a 24/7 SOC. {company} was not in the answer. One run, so an observation, not a verdict. Would a fuller snapshot across the main assistants be useful? Happy to send it.

## Add to the 30-minute walkthrough script

1. "When a mid-market IT director shortlists MDR providers, who else is on the list, and how did you find out?"
2. "What share of new logos come direct, and what share through MSPs or vendor programmes?"
3. "Which compliance frameworks do buyers ask you to evidence before they sign?"

## Cohort NEEDS DATA

- A targeted search for MSSP- and MDR-specific GEO competitors (Iris NEEDS DATA).
- A Family-B prompt for 09.02.01.04 regulated-industry MSSPs.
- D8 confirmation before the verbal white-label line is used.
