# G2 "The Answer Economy": source verification

**Author:** Iris (research) · 2026-10-08
**Requested by:** MARS, to clear or kill the G2 holds Ruth placed on F2, D2 and the 29% note in `docs/copy/2026-10/ai-search-is-winning.md`.
**Decision this informs:** which G2 figures, if any, can render on the site, in what exact wording and with what scope.
**Scope:** public pages only. No login, no form submission, no gated download.

## Method, and its limit

All pages were opened on **2026-10-08** with a fetch tool that returns page text through a summarising model. To reduce the risk of paraphrase, each quote below was requested verbatim in at least two separate passes, and the passes agreed. The tool returns the page as text, so it may miss text inside images or charts drawn by JavaScript.

**Before anything ships, a human should open the two 2026 URLs in a browser and match the exact strings.** That takes five minutes, and it is the only step this method cannot replace.

Confidence labels:
- **observed:** the text is on the page, quoted.
- **reported:** G2 says it about its own survey. We cannot audit the underlying data.
- **inferred:** my own reasoning.

## Sources opened

| # | Source | URL | Accessed | Gated? |
|---|---|---|---|---|
| S1 | G2 news post, "In the Answer Economy, Don't Win the Click — Win the Answer", Tim Sanders (Chief Innovation Officer, G2) | https://company.g2.com/news/g2-research-the-answer-economy | 2026-10-08 | No |
| S2 | Report landing page, "The Answer Economy: G2's 2026 AI Search Insight Report" (S1 links it as *The Answer Economy: How AI Search Is Rewiring B2B Software Buying*) | https://learn.g2.com/g2-2026-ai-search-insight-report | 2026-10-08 | Findings and methodology readable on the page. No PDF link found |
| S3 | G2 news post, "New G2 Research: How AI is Redefining the Buyer Journey in 2025 and How Sellers Can Adapt", Tim Sanders | https://company.g2.com/news/buyer-behavior-in-2025 | 2026-10-08 | No |
| S4 | 2025 G2 Buyer Behavior Report landing page | https://learn.g2.com/2025-g2-buyer-behavior-report | 2026-10-08 | Yes, download behind a form. **Not opened beyond the landing page** |

## Study facts

| Item | Verbatim | Source | Label |
|---|---|---|---|
| Publication date | "April 15, 2026". S1 also says: "Our new report, *The Answer Economy: How AI Search Is Rewiring B2B Software Buying*, was published today." | S1 | observed |
| Publication date on the report itself | None found on S2. | S2 | observed (absence) |
| Fieldwork | "The survey was conducted in March 2026" | S2 | observed |
| Sample (S1 wording) | "In March 2026, we surveyed 1,076 B2B software buyers and decision-makers to quantify their shift in behavior." | S1 | observed |
| Sample (S2 methodology wording) | "G2 fielded an online survey among 1,076 B2B decision makers responsible for, or influencing, purchase decisions for departments, multiple departments, operating units, or entire businesses." | S2 | observed |
| Roles | "Respondents had job titles ranging from individual contributor to manager, director, vice president, or higher." | S2 | observed |
| Region | "includes a global pool of respondents across North America, EMEA, and APAC." | S2 | observed |
| Company size | "this survey defines small-medium business (SMB) as a company with 1-250 employees, mid-market as a company with 250-1,000 employees, enterprise as a company with 1,000-5,000 employees, and large enterprise as a company with 5,000+ employees." No split of the 1,076 across these bands was found. | S2 | observed |
| Qualitative arm | "Qualitative research was conducted through over 39 interviews with B2B software marketers through G2's AI Custom Research (AICR)." | S2 | observed |
| AI in the method | "Generative AI reasoning models were used to define the study's focus areas, optimize survey design, and analyze results to inspire writing and data visualizations." | S2 | observed |
| Not disclosed | No margin of error, weighting, panel provider, sampling frame, or count of respondents per region or size band was found. | S2 | observed (absence) |

**On "B2B software buyers".** The methodology does not say "software". It says "B2B decision makers responsible for, or influencing, purchase decisions". S1 and the S2 headline statistics call the same people "B2B software buyers". *Inferred:* the survey is about software purchasing, so "software buyers" is a fair scope label, and it is G2's own. Any sentence we write should keep "software" in it and should not widen it to "B2B buyers". Better still, say "B2B decision-makers surveyed by G2 about software buying".

## Verdicts on the candidate claims

### (a) 51% start research with an AI chatbot more often than with Google: **VERIFIED**

- S1: "Half of B2B software buyers (51%) now start their research with an AI chatbot more often than with Google." **observed**
- S2: "51% of B2B software buyers start their research with an AI chatbot more often than Google." and "51% now start their software research with an AI chatbot more often than Google." **observed**
- The figure is **reported**, meaning G2's own survey. We cannot audit it.
- Wording note: S1 says "than with Google" and S2 says "than Google". Either is a faithful quote if attributed to the page it came from.

### (b) 69% chose a different vendor than planned because of a chatbot's recommendation: **VERIFIED in S1, with a MISMATCH in strength between S1 and S2**

G2 states this three ways, and they are not equally strong.

| Where | Verbatim | Strength |
|---|---|---|
| S1 (news post) | "69% of buyers chose a different vendor than initially planned, simply because it was part of the chatbot's recommendation." | Strong causal: "simply because" |
| S2 (report) | "69% report that AI chatbots have surfaced information that led them to choose a different vendor than expected." | Weaker: "surfaced information that led them" |
| S2 (report) | "69% of software buyers we polled said that an AI chatbot led them to select a different software vendor than initially planned." | Middle |

All three are **observed** on the page. The finding is **reported**.

*Inferred:* the report's own wording describes respondents saying a chatbot surfaced information that changed their choice. "Simply because it was part of the chatbot's recommendation" is the news post's gloss, and it is stronger than the report. The candidate text in D2 ("because it appeared in the chatbot's recommendation") follows the stronger gloss.

**Recommendation:** if D2 is used at all, quote S2's methodology-adjacent wording and link S2: "69% of software buyers we polled said that an AI chatbot led them to select a different software vendor than initially planned." Do not use "because it appeared".

### (c) "One in three": **VERIFIED in S1 only. NOT FOUND in S2**

- S1: "Perhaps just as shocking to marketing leaders is that one in three purchased from a vendor they'd never previously heard of." **observed**
- S2: "one in three", "1 in 3", "never previously heard" and "never heard of" were all absent across two passes. **observed (absence, with the tool limit above)**
- S2 does carry a response label: "Yes — chose a vendor I hadn't considered 33%". **observed**

*Inferred:* that 33% response is probably the source of S1's "one in three". If so, S1 changed it in two ways. "Hadn't considered" became "never previously heard of", and "chose" became "purchased". Those are different claims. A vendor can be known and still not considered, and choosing is not buying. I cannot confirm which question the 33% answers without the full chart and question text.

**Recommendation:** do not use "one in three bought from a vendor they had never heard of". It appears only in the marketing post, and the report's nearest figure measures something narrower. `[NEEDS DATA: the S2 survey question behind "Yes — chose a vendor I hadn't considered 33%", from a human reading the report in a browser.]`

### (d) "Top source influencing shortlists": **VERIFIED, with one qualifier unsupported in S2**

- S1: "AI chatbots are now the top source influencing buyer shortlists, ahead of review sites, analyst firms, and vendor websites" **observed**
- S2: "AI chatbots are the #1 source influencing which vendors make buyer shortlists." **observed**
- S2: "ahead of review sites" and "analyst" were absent. **observed (absence)**

The ranking is **reported**. The "ahead of review sites, analyst firms, and vendor websites" comparison appears only in S1. It may sit in an S2 chart the tool could not read. Either way, quote only the S2 sentence, or attribute the longer line to S1 by name.

## The 14 May 2025 figure of 29%: **VERIFIED, as a different measure**

- S3 dateline and byline: "May 14, 2025", "by Tim Sanders". **observed**
- S3 sample: "an online survey of 1,169 B2B decision-makers fielded by G2 in April 2025." **observed**
- S3: "Nearly **8 in 10** respondents say AI search has changed how they conduct research, with **29%** noting they start research via platforms like ChatGPT more often than Google." **observed**
- S1 links the two figures itself: "When we published our 2025 Buyer Behavior Report, that number was just 29%." **observed**

What it measured: the share of 1,169 B2B decision-makers, surveyed in April 2025, who said they start research "via platforms like ChatGPT" more often than Google. The 2026 item asks about "an AI chatbot".

*Inferred:* two different samples, a year apart, with question wording that is at least reported differently. G2 presents 29% to 51% as a trend. We should not. Ruth's ruling stands: do not set the two figures side by side. The 29% is real, but using it would turn two samples into a growth claim.

S4, the full 2025 report, is gated and was not opened. Its methodology and its exact question wording are therefore unread.

## G2's commercial interest

- **Observed.** G2 runs a software review marketplace and sells to software vendors. S1 tells vendors to "Win on G2". It says "Being included on a G2's Best Software Awards list is a top trust signal that AI chatbots look for". It also says "citations from a software review site stood out as their top trust signal".
- **Observed.** S1 quotes a third party, Kevin Indig, saying "there is a strong case for vendors to maintain a steady presence across the G2 ecosystem."
- **Inferred.** G2 benefits commercially if vendors believe AI answers drive vendor choice and that reviews feed those answers. That does not make the figures false. It does mean every figure we use should be attributed to G2 in the same sentence, and none of the review-site findings should be used.

## Methodology caveats to carry with any use

1. G2 designed, fielded and analysed the survey itself. It is not independent. **observed**
2. Generative AI reasoning models were used for study design and analysis. **observed**
3. No margin of error, weighting, panel source or regional mix is disclosed. **observed (absence)**
4. Respondents are self-reported decision-makers or influencers, ranging from individual contributor to VP and above. They are not verified purchasers. **observed**
5. The headline items are self-reported behaviour and attribution ("led them to"), not observed purchasing. **inferred**
6. The S1 and S2 wording differs on (b), (c) and (d). S1 is consistently the stronger version. **observed**

## Cleared wording, if MARS and Ruth want to use any of it

These are candidates for Ruth, not approvals.

- **F2 (51%):** "In G2's March 2026 survey of 1,076 B2B decision-makers about software buying, 51% said they start research with an AI chatbot more often than with Google." Source: S1 or S2, accessed 2026-10-08.
- **F2 second line (shortlists):** "G2 reports that AI chatbots are the #1 source influencing which vendors make buyer shortlists." Source: S2.
- **D2 (69%):** "69% of software buyers G2 polled said an AI chatbot led them to select a different software vendor than initially planned." Source: S2.
- **Do not use:** "one in three" in any form, "simply because", "ahead of review sites, analyst firms, and vendor websites" without naming S1, or 29% beside 51%.

## NEEDS DATA

- `[NEEDS DATA: a human read of S1 and S2 in a browser, to match the quoted strings exactly before anything renders.]`
- `[NEEDS DATA: the S2 survey question and chart behind "Yes — chose a vendor I hadn't considered 33%".]`
- `[NEEDS DATA: the breakdown of the 1,076 respondents by region and company size. Not published on S2.]`
- `[NEEDS DATA: the exact 2025 question wording behind 29%, from the gated S4 report. Not opened: it needs a form submission.]`

## Browser check, 2026-10-08 (MARS, via Chrome, page DOM text, not a summariser)

Page: https://learn.g2.com/g2-2026-ai-search-insight-report, title "The Answer Economy: G2's 2026 AI Search Insight Report". Each string below was found verbatim in the rendered page text (observed):

- "half (51%) now start their software research with an AI chatbot more often than Google": VERIFIED
- "AI chatbots are the #1 source influencing which vendors make buyer shortlists": VERIFIED
- "69% of software buyers we polled said that an AI chatbot led them to select a different software vendor than initially planned": VERIFIED
- Methodology: "G2 fielded an online survey among 1,076 B2B decision makers responsible for, or influencing, purchase decisions" and "The survey was conducted in March 2026": VERIFIED

Correction to the pass above: the report itself does contain "33% purchased from a vendor they'd never previously heard of before." (observed). The site still does not use it; Ruth's copy dropped it and nothing re-adds it without a new gate.

The three cleared strings in docs/copy/2026-10/ai-search-is-winning.md match the source. The G2 production blocker is closed.
