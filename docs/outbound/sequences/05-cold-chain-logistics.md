# Cohort 5: Cold chain logistics (06.08)

**DRAFT v0.1 · 2026-10-06 · Rafael · Not sent. Ruth gate pending.** Shared rules are in `docs/outbound/2026-10-outbound-system.md`.

**Scope change (coordinator; Iris §C.3):** cold chain only. 3PL (06.01) is not targeted: per Iris (reported, not opened), logistics GEO specialists aim at brokers and 3PLs. Cold chain carries the certification vocabulary (GDP, DEA, ISO 13485) that gives a snapshot something specific to report.

## Taxonomy mapping (verified against `icp-taxonomy.json` v2.0.0)

| Level | ID | Name | Wave 1 |
|---|---|---|---|
| Industry | 06 | Logistics, Supply Chain & Transportation | |
| Sub-industry | 06.08 | Cold chain & life-sciences logistics | |
| Sub-niche | 06.08.01.01 | Frozen & chilled food 3PL | **Yes**, US email |
| Sub-niche | 06.08.01.02 | Multi-temperature distribution | **Yes**, same prompt fits |
| Sub-niche | 06.08.03.01 | Public refrigerated warehouses | **Yes**, same prompt fits. Use this ID, not its duplicate-named twin 12.14.01.01 in Agriculture & Food |
| Niche | 06.08.08 | Cell & gene therapy logistics | **LinkedIn variant** for UK and EU (prompt below) |
| Niche | 06.08.06 | Pharmaceutical 3PLs & GDP forwarders | Later. `[NEEDS DATA: Family-B prompt]` |

## List spec, cohort deltas

| Field | Value |
|---|---|
| Titles (JSON) | Chief Commercial Officer, VP Business Development, Director of Marketing. Head of Life Sciences Sales for the CGT variant only |
| Floor (JSON) | $15M+ revenue or a multi-facility cold or GDP network |
| Keywords | cold storage, refrigerated warehouse, frozen food logistics, temperature-controlled, multi-temperature distribution, cold chain 3PL |
| Exclude | refrigerated trucking only (06.08.02, not wave 1); temperature-monitoring software (06.08.05); single-facility operators below the floor |
| Markets, wave 1 | US (food prompt). UK and EU through LinkedIn (CGT prompt) |

## Pain: hypotheses, not buyer speech

| Hypothesis | Source and label | Question that confirms or kills it |
|---|---|---|
| Food and pharma shippers ask assistants for temperature-controlled or GxP-compliant partners, and certifications, temperature ranges and facility specs decide who is cited | JSON 06.08 `geo_angle`. Operator-authored | "When a shipper shortlists cold chain partners, which certifications and specs do they ask about first?" |
| A commercial leader wants to know whether they are named for GDP-compliant work in Europe | Iris §B.2, Family Q **[I]**: "Are we named when a pharma shipper asks for a GDP-compliant 3PL in Europe?" | "Which shipper segments do you want more of: food, pharma, clinical?" |
| Large contracts come through RFPs and consultants, and search only shapes the long list | **[I]** mine | "Before a shipper invites you to an RFP, where does the long list come from?" |

## Family-B prompts

- **Primary:** "best refrigerated 3PL for a frozen food brand selling into grocery chains" (JSON 06.08, verbatim).
- **CGT, LinkedIn only:** "cryogenic logistics providers for cell and gene therapy shipments in Europe" (JSON 06.08, verbatim).

## Sequence (food, US)

| Step | Day | Channel | Sender | Subject / opener | Body | Exit condition |
|---|---|---|---|---|---|---|
| E1 | 0 | Email, new thread | {sender}, S1 | frozen food 3PLs ChatGPT named | Hi {first_name},<br><br>On {run_date} I asked ChatGPT: "best refrigerated 3PL for a frozen food brand selling into grocery chains". It named {n_named} providers. {company} was not one of them.<br><br>One prompt, one run, one platform. An observation, not a verdict.<br><br>I can run the questions your buyers ask on ChatGPT, Perplexity, Gemini and Google AI Overviews, record who gets named and which pages get cited, and send you the snapshot. A person reviews it before it goes out.<br><br>Want one?<br><br>{sender_first_name} | Standard exit (system §6.1) |
| LI-C | 1 | LinkedIn connection | {sender} | Note | Hi {first_name}, I look at how AI assistants answer buyer questions about cold chain logistics. I ran one for your category this week and would like to share what came back. | Standard exit |
| E2 | 3 | Email, threaded under E1 | {sender} | (thread) | Hi {first_name},<br><br>One more detail from the {run_date} answer. It cited {k_cited} sources: {cited_mix}. None were on {company_domain}.<br><br>When an assistant cites pages, those pages shaped the answer. Which pages get picked for cold chain questions is checkable, and the snapshot records it prompt by prompt.<br><br>Reply "yes" and I will run the full set. If someone else owns search at {company}, tell me who.<br><br>{sender_first_name}<br><br>*No citations: E2-B. Optional signal line: system §6.4.* | Standard exit |
| CALL-1 | 4 | Phone, T1 only | {caller} | See opener below | | Standard exit, plus `dnc-call` |
| E3 | 7 | Email, new subject | {sender} | wrong question? | Hi {first_name},<br><br>I may have picked the wrong prompt. If the food brands that ship with {company} ask an assistant something other than a frozen-food 3PL shortlist, send me their question and I will run that instead.<br><br>The snapshot lists the prompts, dates and platforms, what each answer said and cited, and what we could not see. It does not promise {company} a place in any answer. Nobody controls those systems.<br><br>{sender_first_name} | Standard exit |
| LI-1 | 8, or accept +2 | LinkedIn message | {sender} | | Thanks for connecting, {first_name}. The question was "best refrigerated 3PL for a frozen food brand selling into grocery chains". On {run_date}, ChatGPT named {n_named} providers, not {company}. One run, so an observation, not a verdict. Would a full snapshot across the main assistants be useful? A person reviews it before it is sent. | Standard exit |
| CALL-2 | 10 | Phone, T1 only | {caller} | Same opener | | Standard exit |
| E4 | 12 | Email, threaded under E1 | {sender} | (thread) | Hi {first_name},<br><br>I will stop here so this does not turn into noise.<br><br>If AI answers are not on the list at {company} this quarter, a one-word reply ("later" or "no") helps me file it properly and I will not follow up. If they are, reply "yes" and I will put the snapshot together.<br><br>{sender_first_name} | Email track ends |
| LI-2 | 15 | LinkedIn message | {sender} | | Last note from me on this. If the snapshot is useful later, reply here any time. If someone else at {company} owns search, I would be glad of the name. | Sequence ends |

**Word counts:** E1 81 · E2 73 maximum, 85 with a signal line · E3 72 · E4 54.

**CGT LinkedIn variant (UK and EU, system §6.2).** LI-1: "Thanks for connecting, {first_name}. The question was "cryogenic logistics providers for cell and gene therapy shipments in Europe". On {run_date}, ChatGPT named {n_named} providers, not {company}. One run, so an observation, not a verdict. Would a full snapshot across the main assistants be useful? Why I have your details and your rights: {privacy_notice_url}"

## Cold call opener

> Hi {first_name}, it's {sender_first_name} from Qognition Agency. This is a cold call. Can I have 30 seconds, and then you tell me whether it's worth another minute?
>
> *(Yes.)*
>
> On {run_day} I asked ChatGPT for the best refrigerated 3PL for a frozen food brand selling into grocery chains. It named {n_named} providers, and {company} wasn't one. One run, so I'm not calling with a verdict. I'm calling to ask: is that how food brands look for a cold chain partner, or do they ask differently?

## Objections

| Objection | What is really being said | Response | Proof we can show |
|---|---|---|---|
| "We win through RFPs and consultants." | Search doesn't decide our deals | "Then the snapshot may matter less, and I'd rather know. Before a shipper invites you to an RFP, where does the long list come from?" | Their answer. `[NEEDS DATA: no dated source on shipper research behaviour]` |
| "Our capacity is full right now." | No need this quarter | "Then this isn't for now. Is there a facility or service line you'd want filled next, where the timing matters?" If not, close kindly | None. Possible "needs leads this week" inverse: no need at all is a no |
| "We already rank on Google for cold storage in our city." | We're covered | "Good, that's the SEO layer. Google results and assistant answers are separate surfaces, and the snapshot reports them separately, so you'd see whether the ranking carries over." | The snapshot's separate AI SEO and GEO headings (system §1.1) |

## DM variant

> Hi {first_name}. On {run_date} I asked ChatGPT for the best refrigerated 3PL for a frozen food brand selling into grocery chains. {company} was not in the answer. One run, so an observation, not a verdict. Would a fuller snapshot across the main assistants be useful? Happy to send it.

## Add to the 30-minute walkthrough script

1. "Which certifications do shippers ask you to prove first: GDP, SQF, BRCGS, FDA registration?"
2. "Which shipper segment do you want more of next year?"
3. "Where did your last five shipper contracts come from?"

**Verbal talking point, re-verify first:** research pass 3 records the FSMA 204 food traceability compliance date as moved to 20 July 2028 (**observed** there, with an extension proposed 7 August 2025). Confirm at FDA on the day before using it. Never in writing without that check.

## Cohort NEEDS DATA

- A targeted competition search for GxP and CGT logistics GEO specialists (Iris NEEDS DATA).
- A Family-B prompt for 06.08.06 pharma 3PLs.
- The current FSMA 204 status at FDA.
