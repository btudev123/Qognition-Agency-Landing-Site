# `/seo` v2: delta against `docs/copy/seo.md`

Owner: Theo (content). Date: 2026-09-28. Branch: `b2b-ai-search`.
Status: **draft. Not approved copy until Ruth (`brand-guard`) has run.**

Target route: `/seo` (planned, `CLAUDE.md` §5). No component exists yet, so this file names blocks by
the section numbering in `docs/copy/seo.md`. Brief: `docs/copy/00-brief-v2-b2b-universe.md`.

**Most of `seo.md` survives.** It was written about a surface, not about a vertical, which is why it
travels. Four blocks change.

---

## Delta 1. The meta title, §0

Current:

```html
<title>B2B SEO for Insurance, Professional and IT Services Firms</title>
```

This is the one meta tag I am raising, and I am raising it rather than changing it, because the
standing constraint is that meta titles do not change.

**The situation is that this page does not exist yet**, so this string is a proposal for a future
page and not a live tag. If the operator reads the freeze as applying only to live pages, the title
should become:

```html
<title>B2B SEO for Firms That Need to Be in the AI Candidate Set</title>
```

59 characters. It drops three named verticals that no longer describe the ICP and keeps the one
differentiated idea on the page.

If the operator reads the freeze as absolute, the title stays and the body copy below still corrects
the positioning. **Operator decision. I have not changed it.** The meta description is unaffected and
does not change either way.

---

## Delta 2. §3, reason one

Current:

> **Reason one.** Buyers still search. A CFO comparing advisory firms still opens ten tabs. The blue
> links are still where a considered B2B purchase gets researched in depth.

Replace with:

> **Reason one.** Buyers still search, and the technical ones search hardest. A design engineer
> checking whether a supplier can hold a tolerance opens ten tabs. So does a CFO comparing advisory
> firms and an IT director shortlisting an MSP. The blue links are still where a considered B2B
> purchase gets researched in depth.

Why. One example implied one audience. Three named roles cover the three Tier S verticals without
listing industries, and the engineer leads because that is the buyer most agencies in this category
have never written for.

---

## Delta 3. §6, the entry-gate FAQ

This is the most important change in the file. Current:

> **Can we buy SEO on its own?**
> No. All four layers are in every retainer. Tiers differ by scope. [See pricing](/pricing).

A prospect who wants classic SEO is inside the ICP. `CLAUDE.md` §2: any one of AI SEO, SEO or PPC
qualifies. The answer as written reads as a refusal at the door and turns away a qualified buyer over
what is actually a packaging decision.

Replace with:

> **Can we buy SEO on its own?**
> You can come to us wanting only classic SEO, and plenty of clients do. What you will be quoted is
> one retainer that includes all four search layers, because the AI layers are built on the same
> technical, structural and authority work and separating them would mean charging you twice for it.
> There is no upsell inside that. Tiers differ by scope: locations covered, prompts tracked, assets
> produced. [See pricing](/pricing)

**Add one more FAQ under it:**

> **Can we run paid media with you instead?**
> Yes, and it is quoted separately. Paid is priced against your media budget rather than against
> scope, and you pay the platforms directly. [How that works](/ppc)

---

## Delta 4. §5, what we will not do

Current text is correct and stays. **Add one sentence to the end of the paragraph**, because the
15-vertical taxonomy makes the obvious next question "so are you about to publish two hundred
industry pages":

> We hold ourselves to the same rule on our own site. An industry page here ships when it answers a
> question no other page answers and carries facts that cannot be produced by substituting a name
> into a template. Everything else stays in a data file with no route attached to it.

That sentence is true of `data/b2b/verticals.ts`, where every entity defaults to `state: 'spine'`
with no page and no sitemap entry. It is a claim we can prove from the repo, which is the only kind
worth making.

---

## Unchanged, and why

§1 hero, §2 definition, §4 the work, §7 CTA. All four describe a surface and the work on it. None
names a vertical, promises a ranking, or blurs SEO with AI SEO. The internal links out to
`/local-seo`, `/ai-seo`, `/geo`, `/audit` and `/pricing` are the existing set and do not change.
