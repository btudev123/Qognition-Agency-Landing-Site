# Cohort 1: Commercial insurance distribution (04.05)

**DRAFT v0.1 · 2026-10-06 · Rafael · Not sent. Ruth gate pending.** Shared rules, footer, E2-B, signal lines, compliance and GHL fields are in `docs/outbound/2026-10-outbound-system.md`. This file has only what is specific to the cohort.

## Taxonomy mapping (verified against `icp-taxonomy.json` v2.0.0)

| Level | ID | Name | Wave 1 |
|---|---|---|---|
| Industry | 04 | Financial Services | |
| Sub-industry | 04.05 | Commercial insurance carriers & distribution | |
| Niche | 04.05.01 | Commercial insurance brokers (A, Both) | Yes |
| Sub-niche | 04.05.01.01 | Middle-market P&C brokers | **Yes** |
| Sub-niche | 04.05.01.03 | Industry-specialist agencies (construction, transportation, tech) | **Yes**, manufacturing-serving agencies first, because the prompt names manufacturing |
| Sub-niche | 04.05.01.04 | Regional independent agencies (commercial lines) | Later wave |
| Niche | 04.05.02 | MGAs (A, Both) | Later. Iris leads with MGAs too (§C.2), but the JSON has no MGA-specific prompt. `[NEEDS DATA: Family-B prompt for MGAs]` |

## List spec, cohort deltas

| Field | Value |
|---|---|
| Titles (JSON `buyer_titles`) | CMO, VP Marketing, Head of Distribution, Chief Growth Officer. Add President or Principal at independent agencies |
| Floor (JSON `min_firm_size`) | $10M+ revenue or $50M+ written premium |
| Keywords | commercial insurance broker, middle market P&C, commercial lines, business insurance, risk management, manufacturing insurance |
| Exclude | personal lines, auto insurance, home insurance, life insurance, health insurance, Medicare; agencies whose site is a network or carrier template they cannot edit (disqualifier) |
| Markets, wave 1 | US first. UK corporate subscribers second |

## Pain: hypotheses, not buyer speech

Iris's Part B has no row for 04.05, and no buyer speech exists on file (Iris §B.1). These are the hypotheses I am testing, with where each came from.

| Hypothesis | Source and label | Question that confirms or kills it |
|---|---|---|
| Businesses ask assistants which broker to call and what cover they need | JSON 04.05 `geo_angle`: "Cited as the broker, MGA or carrier to call when businesses ask AI how to insure their operation and what coverage they need". Operator-authored, not buyer speech | "Before a business calls you, what do they check, and where?" |
| Producers drive growth and the website plays a supporting part | **[I]** mine. No source | "Where did your last five commercial accounts come from?" |
| Industry-specialist agencies want to be found for their industry | **[I]** from the sub-niche name 04.05.01.03 | "Which industries do you want more of next year?" |

## Family-B prompt

**"best commercial insurance broker for a mid-size manufacturing company"** (JSON 04.05 `ai_prompts`, verbatim). Fits 04.05.01.01 and manufacturing-serving firms in 04.05.01.03. Run per section 2 of the system doc.

## Sequence

| Step | Day | Channel | Sender | Subject / opener | Body | Exit condition |
|---|---|---|---|---|---|---|
| E1 | 0 | Email, new thread | {sender}, S1 | brokers ChatGPT named for manufacturers | Hi {first_name},<br><br>On {run_date} I asked ChatGPT: "best commercial insurance broker for a mid-size manufacturing company". It named {n_named} brokers. {company} was not one of them.<br><br>One prompt, one run, one platform. An observation, not a verdict.<br><br>I can run the questions your prospective clients ask on ChatGPT, Perplexity, Gemini and Google AI Overviews, record who gets named and which pages get cited, and send you the snapshot. A person reviews it before it goes out.<br><br>Want one?<br><br>{sender_first_name} | Standard exit (system §6.1) |
| LI-C | 1 | LinkedIn connection | {sender} | Note | Hi {first_name}, I look at how AI assistants answer buyer questions about commercial insurance brokers. I ran one for your category this week and would like to share what came back. | Standard exit |
| E2 | 3 | Email, threaded under E1 | {sender} | (thread) | Hi {first_name},<br><br>One more detail from the {run_date} answer. It cited {k_cited} sources: {cited_mix}. None were on {company_domain}.<br><br>When an assistant cites pages, those pages shaped the answer. Which pages get picked for broker questions is checkable, and the snapshot records it prompt by prompt.<br><br>Reply "yes" and I will run the full set. If someone else owns search at {company}, tell me who.<br><br>{sender_first_name}<br><br>*No citations in the stored answer: use E2-B. Optional signal line: system §6.4.* | Standard exit |
| CALL-1 | 4 | Phone, T1 only | {caller} | See opener below | | Standard exit, plus "don't call" → `dnc-call` |
| E3 | 7 | Email, new subject | {sender} | wrong question? | Hi {first_name},<br><br>I may have picked the wrong prompt. If the business owners and CFOs who buy cover through {company} ask an assistant something other than a broker shortlist, send me their question and I will run that instead.<br><br>The snapshot lists the prompts, dates and platforms, what each answer said and cited, and what we could not see. It does not promise {company} a place in any answer. Nobody controls those systems.<br><br>{sender_first_name} | Standard exit |
| LI-1 | 8, or accept +2 | LinkedIn message | {sender} | | Thanks for connecting, {first_name}. The question was "best commercial insurance broker for a mid-size manufacturing company". On {run_date}, ChatGPT named {n_named} brokers, not {company}. One run, so an observation, not a verdict. Would a full snapshot across the main assistants be useful? A person reviews it before it is sent. | Standard exit |
| CALL-2 | 10 | Phone, T1 only | {caller} | Same opener | | Standard exit |
| E4 | 12 | Email, threaded under E1 | {sender} | (thread) | Hi {first_name},<br><br>I will stop here so this does not turn into noise.<br><br>If AI answers are not on the list at {company} this quarter, a one-word reply ("later" or "no") helps me file it properly and I will not follow up. If they are, reply "yes" and I will put the snapshot together.<br><br>{sender_first_name} | Email track ends |
| LI-2 | 15 | LinkedIn message | {sender} | | Last note from me on this. If the snapshot is useful later, reply here any time. If someone else at {company} owns search, I would be glad of the name. | Sequence ends. 90-day rest list |

**Word counts (greeting to first name):** E1 79 · E2 72 maximum with an 8-word `{cited_mix}`, 84 with a signal line · E3 74 · E4 54.

## Cold call opener (about 30 seconds)

> Hi {first_name}, it's {sender_first_name} from Qognition Agency. This is a cold call. Can I have 30 seconds, and then you tell me whether it's worth another minute?
>
> *(Yes.)*
>
> On {run_day} I asked ChatGPT for the best commercial insurance broker for a mid-size manufacturing company. It named {n_named} brokers, and {company} wasn't one. That's one run, so I'm not calling with a verdict. I'm calling to ask: is that how your clients look for a broker, or would they ask differently?

If they engage: "I can run the questions they actually ask across the main assistants and send you the snapshot. Best email?" If "not my area": "Who owns the website and search at {company}?" If "no": "Understood. I won't call again." Log `dnc-call`.

## Objections

| Objection | What is really being said | Response | Proof we can show |
|---|---|---|---|
| "Our producers bring in the business, not marketing." | I don't see how search connects to how we grow | "Agreed, producers close it. When a prospect hears a producer's name and checks the agency before the meeting, what do they find? The snapshot shows the assistant part of that." | The snapshot. `[NEEDS DATA: any dated source on how commercial insurance buyers research brokers. None on file]` |
| "Compliance has to approve everything we publish." | I'm worried about regulatory exposure | "It should. The snapshot publishes nothing and makes no statement about cover. Anything written later goes through your compliance review before it is live." | `[NEEDS DATA: a written client-approval step in the delivery process]` |
| "Our website is run by our network." | We may not control the site | "Then the first question is whether you can edit and publish on it. If you can't, I'd rather tell you now that this isn't worth doing." | None. This is the "cannot edit their own website" disqualifier |

## DM variant (X, Instagram, Facebook; one message)

> Hi {first_name}. On {run_date} I asked ChatGPT for the best commercial insurance broker for a mid-size manufacturing company. {company} was not in the answer. One run, so an observation, not a verdict. Would a fuller snapshot across the main assistants be useful? Happy to send it.

## Add to the 30-minute walkthrough script

1. "Which industries do you want more of next year: manufacturing, construction, transportation, tech?"
2. "Can you edit your own website, or does a network, aggregator or carrier platform control it?"
3. "When an enquiry comes in from the website, which producer gets it, and how fast?"

**Verbal only, and only if the vacancy search was re-run in the last 7 days:** "When we last checked, on {date}, we found no AI-search agency positioned specifically for commercial insurance." Narrow, dated and re-runnable, per CLAUDE.md §1. Never "nobody serves this market".

## Cohort NEEDS DATA

- Re-run the commercial insurance vacancy search on the day the first batch goes (Iris; last checked 2026-09-29).
- A Family-B prompt for MGAs (04.05.02).
- A written client-approval step for regulated clients' content.
- Buyer-voiced pain: the first walkthrough calls.
