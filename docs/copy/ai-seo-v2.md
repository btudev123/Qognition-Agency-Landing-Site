# `/ai-seo` v2: delta against `docs/copy/ai-seo.md`

Owner: Theo (content). Date: 2026-09-28. Branch: `b2b-ai-search`.
Status: **draft. Not approved copy until Ruth (`brand-guard`) has run.**

Target route: `/ai-seo` (planned, `CLAUDE.md` §5). Blocks are named by the section numbering in
`docs/copy/ai-seo.md`. Brief: `docs/copy/00-brief-v2-b2b-universe.md`.

Meta title and description do not change. This page needed the least work of the five: it defines one
surface, separates it from GEO in the second paragraph, and never names a vertical. Three blocks
change.

---

## Delta 1. §3, passage-level clarity

Current closes:

> Most B2B service content fails on exactly this.

Replace that sentence with:

> Most B2B content fails on exactly this, and technical content fails hardest. A capability page that
> opens with a paragraph about a commitment to quality, then states the tolerance range in a table on
> screen three, has hidden the only extractable fact on the page.

Why. The section is about extraction and it was missing the concrete failure. The example is
recognisable to a manufacturer, a SaaS company documenting an API limit and a firm burying its fee
structure, so it widens without listing industries.

---

## Delta 2. §5, add the honest ceiling

The measurement section is the strongest on the page and its limit paragraph stays exactly as
written. **Add one paragraph after "What we pair it with":**

> One more limit, and it is the reason we do not sell this as a traffic line. Semrush analysed over a
> billion lines of US clickstream data from a 200 million user panel covering October 2024 to
> February 2026 and found that over 30% of all ChatGPT referral traffic goes to ten domains, and that
> 21.6% of ChatGPT referrals go to Google. AI surfaces are where a shortlist gets formed, not where
> your sessions come from. A firm measuring this by referral sessions will conclude it does not
> matter and will be wrong.
> Source: [Semrush, ChatGPT search insights, published 7 April 2026](https://www.semrush.com/blog/chatgpt-search-insights/)

Note that this paragraph cites assistant referral data on the AI SEO page, which covers a Google
surface. That is deliberate and the sentence says so: the point is about AI surfaces as a class, and
the Search Console reporting described directly above it is the one place where Google's own numbers
exist. Do not move this paragraph to `/geo` and delete it here. It belongs to the measurement
argument.

---

## Delta 3. §7, the closing FAQ

Current:

> **How is this different from the SEO we already buy?**
> Ask your current provider for the generative AI performance report from Search Console. If they do
> not know it exists, they are not working this surface.

Keep it. It is the sharpest test on the page. **Add two FAQs after it:**

> **We only want paid media. Why are you telling us about AI Overviews?**
> Because an AI Overview sits above your ad and answers the question the ad was bidding on. You do
> not have to buy this work to buy paid from us, and paid is quoted separately, priced against your
> media budget. But if your category now returns an AI answer for the query you are bidding on, your
> cost per click is being set by a page you do not appear in. [How paid works](/ppc)

> **Our industry is not one you have written a page for. Does the work change?**
> The method does not. The prompt set, the vocabulary and the buying committee do, and those are
> built in the first two weeks from your buyers' language rather than from a template. What we will
> tell you plainly is whether we have delivered in your vertical before. Where we have not, we say
> so rather than stretching an adjacent case to fit.

---

## Unchanged, and why

§1 hero, §2 definition, §4 the work, §6 where this sits, §8 CTA. The §2 paragraph separating AI SEO
from GEO is the single most liftable block on this page and the one `CLAUDE.md` §1 requires be
identical everywhere. It is not touched.

`[NEEDS DATA: the URL that carries the 31 August 2026 worldwide availability statement for Search
Console generative AI reporting. The link in §5 has a 2026/06 slug and contradicts the date in the
sentence. Same blocker as `components/home/Evidence.tsx` card 3. This page cannot argue that we date
our claims while citing a source whose date disagrees with the claim.]`
