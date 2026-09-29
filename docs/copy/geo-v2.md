# `/geo` v2: delta against `docs/copy/geo.md`

Owner: Theo (content). Date: 2026-09-28. Branch: `b2b-ai-search`.
Status: **draft. Not approved copy until Ruth (`brand-guard`) has run.**

Target route: `/geo` (planned, `CLAUDE.md` §5). Blocks are named by the section numbering in
`docs/copy/geo.md`. Brief: `docs/copy/00-brief-v2-b2b-universe.md`.

Meta title and description do not change. Four blocks change. The largest is §3, which currently
rests the entire mechanism argument on a single insurance study.

---

## Delta 1. §3, the markup myth

Current second paragraph:

> The mechanism is that these systems assemble an answer from sources they retrieve, and most of
> those sources are not your domain. In the largest published sample we have found, across 1,960
> insurance prompts producing 34,238 citations, insurer-owned domains accounted for **4.6%** of
> citations and the single most-cited domain was Reddit at 3.5%
> ([Wellows, 12 August 2026](https://wellows.com/blog/ai-visibility-for-insurance-marketing-agencies/)).
> That is one vertical, from a vendor with an interest in the finding, and it still points at the
> thing that matters: your own website is a minority of the answer.

Replace with:

> The mechanism is that these systems assemble an answer from sources they retrieve, and most of
> those sources are not your domain.
>
> Two published measurements, from different directions, say the same thing. In the largest citation
> sample we have found, 1,960 insurance prompts produced 34,238 citations across 3,831 domains, and
> insurer-owned domains accounted for **4.6%** of them. The single most-cited domain was Reddit, at
> 3.5%
> ([Wellows, 12 August 2026](https://wellows.com/blog/ai-visibility-for-insurance-marketing-agencies/)).
> That is one vertical, published by a vendor with an interest in the finding, and we cite it because
> the method is published rather than because the number flatters us.
>
> From the other side, Semrush analysed over a billion lines of US clickstream data from a 200 million
> user panel covering October 2024 to February 2026 and found that **over 30% of all ChatGPT referral
> traffic goes to ten domains**, and that between **65% and 85% of prompts matched no keyword** in a
> 27 billion keyword database
> ([Semrush, published 7 April 2026](https://www.semrush.com/blog/chatgpt-search-insights/)). A
> handful of large sources carry most of the retrieval, and most of what people actually ask is not a
> keyword anyone has ever tracked.
>
> Your own website is a minority of the answer. If an agency is selling you GEO as an on-page
> technique, they are selling you the small part.

Why. The §3 argument was correct and single-sourced from one vertical, which made it easy to dismiss
as "that is insurance". Two independent measurements, one about citation share and one about
retrieval concentration, make the mechanism claim hold for any category. The Semrush finding on
unmatched prompts also does quiet work: it is the reason a prompt set has to be built from a client's
buyers rather than from a keyword tool.

The existing closing line "they are selling you the 5%" becomes "the small part", because 5% was an
arithmetic gesture at the insurance figure and does not survive being generalised.

---

## Delta 2. §4, third-party evidence

The list of retrieval sources stays. **Replace the paragraph under it:**

Current:

> Named people do a disproportionate amount of the work here. A system retrieving commentary on a
> niche topic finds a person who wrote it. Firms without public experts are represented only by their
> marketing copy, which is the least retrievable kind of content there is.

Replace with:

> Named people do a disproportionate amount of the work here. A system retrieving commentary on a
> niche topic finds the person who wrote it. This is also the one place where the research is
> unambiguous: in the 2026 State of Marketing to Engineers report, 66% of technical buyers rated
> engineering experts at vendor companies as very or extremely trustworthy content authors, ahead of
> every other source type. Firms without public experts are represented only by their marketing copy,
> which is the least retrievable and least trusted kind of content there is.
> Source: [GlobalSpec, TREW Marketing and Elektor, accessed 28 September 2026](https://www.trewmarketing.com/state-of-marketing-to-engineers-research-report)

`[NEEDS DATA: the report's sample size and field dates. The summary page does not state n. If that is
judged fatal, the sentence carrying 66% comes out and the paragraph reverts to the original wording,
which was already true without it.]`

---

## Delta 3. §7, measurement, the limits

The limits paragraph is the best writing on the page and does not change. **Add one sentence to the
end of "Referral traffic":**

Current:

> **Referral traffic.** Visits arriving from `chatgpt.com`, `perplexity.ai` and the other assistant
> domains are visible in your analytics. Volumes are usually small. The intent is usually high,
> because the visitor arrived already shortlisted.

Add:

> Judge the programme on mention and citation share in the prompt set, not on these sessions. The
> concentration in the Semrush data above is the reason: referral volume to a specialist B2B domain
> will be small whether the work is succeeding or not.

Why. It closes the loop between the evidence in §3 and the reporting the client will receive, and it
inoculates the engagement against the most likely reason a good programme gets cancelled in month
four.

---

## Delta 4. §9, add one FAQ

The five existing FAQs stay. Add:

> **Our competitors in a completely different industry get named. Is this only working in tech?**
> Agencies now market this work to manufacturers, law firms and accountants, so the category is no
> longer only tech. What none of them publishes is a named client with a dated, reproducible
> measurement. Thrive's manufacturing case is unnamed and undated. Gorilla 76 anonymises by its own
> published policy. RevenueZen's professional-services list carries no dated client result for any
> agency on it, including RevenueZen. We are in the same position on named clients, because most of
> our delivery is white-label under NDA, and the difference is that we publish the platform, the
> prompt set and the date on every observation we hand you, so you can rerun it yourself.

This is the one claim the site owns, placed where a sceptical reader asks for it. Every sentence in
it is checkable on the day it is read.

---

## Unchanged, and why

§1 hero, §2 definition, §5 the work, §6 the line on fake reviews and sock puppets, §8 where this
sits, §10 CTA. §6 is the block on this page that no competitor will copy, because copying it would
cost them a tactic.

One correction to §8 for consistency with `seo-v2.md` and `local-seo-v2.md`: the sentence "All four
layers are in every retainer, because GEO on its own does not work" is accurate and stays, and it is
not a refusal to talk to a prospect who only wants one layer. If Ruth reads it as one, the fix is the
wording already approved in `seo-v2.md` Delta 3, used verbatim.
