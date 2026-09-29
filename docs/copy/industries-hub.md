# `/industries` : the hub

Owner: Theo (content). Date: 2026-09-28. Branch: `b2b-ai-search`.
Status: **draft. Not approved copy until Ruth (`brand-guard`) has run.**

Target file: `app/industries/page.tsx`. Brief: `docs/copy/00-brief-v2-b2b-universe.md`.

---

## 0. What is frozen on this page, and one thing that is not obvious

**Frozen and not touched by this file:** the meta title and description (they come from
`SEO_OVERRIDES['/industries']` in `lib/seo.ts`), the URL, the `CollectionPage` and `BreadcrumbList`
JSON-LD, the card grid's hrefs, the services strip's hrefs, the sidebar links, and the external
booking URL.

**The non-obvious one.** The industry cards on this page render `industry.description` from
`data/industries.ts`, and the **same string is the meta description of every child page** through
`generateMetadata` in `app/industries/[industry]/page.tsx` line 36. So rewriting a card's visible
text rewrites eleven live meta descriptions. That is outside the constraint I was given, so no card
description is rewritten here. The fix, when someone wants it, is a separate `lead` field on the
`Industry` type, which is Kyle's call and not a copy decision. It is listed in NEEDS DATA.

Everything below is a block of visible page copy with no such coupling.

---

## 1. Badge and H1

**Badge**, line 45. Current: `Industries`. Unchanged.

**H1**, line 46.

Current:

```
Industries We Serve
```

Replace with:

```
Where we sell, and what that does and does not mean
```

Why. "Industries We Serve" is the title of every agency industries page on the internet. It is the
sentence `standards/anti-slop.md` calls out: it could appear on a competitor's site with the brand
name swapped. The replacement is the page's actual argument, it sets up the paragraph underneath it,
and it makes the `CLAUDE.md` §11 defence the headline rather than the small print.

One H1 on the page. Everything under it is H2 or lower, which the template already enforces.

---

## 2. Intro paragraph

Line 47 to 49. Current:

> AI growth marketing by buyer journey, compliance pressure, local demand, sales cycle, and proof
> requirements.

Replace with:

> We sell AI search, SEO and paid media to B2B companies doing $3M to $1B+ in revenue, with 20 to
> 10,000+ staff. These pages exist because a page written to everybody converts nobody. They are a
> route to market, not a qualifier, and your industry does not have to be on this list for the
> conversation to be the same one.

Four sentences, each doing one job: what we sell, to whom, why these pages exist, and the release
valve for the reader whose industry is missing.

---

## 3. The three cards under the intro

Lines 55 to 58. All three are replaced. The current set describes internal linking and rendering
technique to a buyer who does not care about either.

**Card 1**

> An industry page here says where we sell. It never says where we have worked. Where we have
> delivered, we name it on the page. Where we have not, the proof section is absent rather than
> filled.

**Card 2**

> Your buyer and our buyer are different people. These pages are written to the owner, CEO or growth
> leader. The prompts on them are the ones your procurement, engineering, IT and finance buyers type,
> which is a different question set entirely.

**Card 3**

> Fifteen meta-verticals and 120 sub-niches sit behind the pages that exist. Nothing publishes
> because a URL is possible. A page ships when it answers a question no other page answers and
> carries facts you cannot get by substituting a name into a template.

Card 1 is the claim this page owns. Card 2 is the distinction that makes the vertical pages readable.
Card 3 is the publishing discipline, stated to a buyer rather than to an engineer, and it is also the
answer to "have you just spun up two hundred pages", which is the first thing a sophisticated
prospect will suspect.

---

## 4. The services strip

Line 70. Current H2: `Core Services Across Industries`.

Replace with:

```
The same four search layers in every one of them
```

**Add one paragraph directly under that H2 and above the chip row.** New block, same
`text-[var(--text-muted)]` treatment as the cards:

> SEO is Google's results page. Local SEO is Maps, the local pack, Business Profile, reviews and
> listings. AI SEO is Google AI Overviews and AI Mode. GEO is the assistants: ChatGPT, Perplexity,
> Gemini, Claude and Copilot. All four are in every retainer and we do not sell them separately,
> because the last two do not work without the first two. What changes between industries is the
> prompt set, the vocabulary and who is on the buying committee. Paid media is quoted separately and
> priced against your media budget, not inside the retainer.

That paragraph is the AI-citation angle for this page. Four defined surfaces, one sentence each, in
plain text, in the DOM. It is the same definition as `components/home/FourLayers.tsx` and
`docs/copy/home-v3.md` §4, word for word on the four surfaces, deliberately. Two versions of a
definition is how a site ends up disagreeing with itself in a retrieval index.

**The chip row itself does not change.** It renders `SERVICES` from `data/services.ts` and every chip
is an internal link.
`[NEEDS DATA: operator decision on the eleven-service chip row. It still renders the retired service
set, including Branding & Creative, Video & Multimedia and Social Media Marketing, which is not what
§1 of CLAUDE.md says we sell. Changing it changes internal linking, so it is out of scope for me and
in scope for a routing decision.]`

---

## 5. The industry card grid

**Card content is not rewritten.** See §0.

**Two labels inside each card are visible copy with no coupling, and both change.**

Line 99. Current: `Specialist Verticals`.

Replace with:

```
Sub-niches on this branch
```

Line 131. Current: `View sector strategy`.

Replace with:

```
See how this one is bought
```

Why. "Specialist Verticals" claims specialism. "Sector strategy" promises a strategy document that is
not behind the link. Both are small, both are the kind of sentence that gets a page gated, and
neither costs anything to fix.

**The pain-point chips** rendered from `industry.painPoints` in a red-bordered box are visible copy
from the same data file, but unlike `description` they are not coupled to any meta tag. They are
legacy generalist marketing pain points. They should be rewritten per vertical, starting with the one
worked example in `docs/copy/industries-manufacturing.md` §4, and not before.

---

## 6. The closing block

Lines 140 to 151.

**H2.** Current: `Need a market-specific plan?`

Replace with:

```
Not sure your industry is on the list
```

No question mark. A rhetorical question as a section opener is banned in
`standards/anti-slop.md`, and the line works harder as a statement of the reader's actual position.

**Body.** Current:

> Bring your industry, location, offer, sales cycle, and current traffic. We will map the fastest
> route to qualified demand.

Replace with:

> It does not have to be. Tell us what you sell, who signs the contract, and what the last three
> deals had in common. We will build a prompt set from that, run a sample of it across the
> assistants, and send you what came back with the date on it. If the answer is that you are already
> well positioned, we will tell you that too.

**Button label.** Current: `Book a Strategy Call`. The href is the external booking widget and does
not change.

Replace the label with:

```
Book a 20-minute walkthrough
```

Why. "Strategy call" is what every agency calls it and it sets no expectation about length or
content. Twenty minutes is a lower ask, it matches the secondary CTA on the homepage and the layer
pages, and a consistent CTA label across the site is worth more than a varied one.

`[NEEDS DATA: whether the booking widget behind that button is configured for a 20-minute slot. If it
is set to 30 or 45, the label changes to match the calendar rather than the calendar changing to
match the label. A mismatch between a button and the booking screen it opens is a measurable
drop-off.]`

---

## 7. The conflict I am not resolving

The card grid renders all eleven published industries from `data/industries.ts`. Five of them are not
in the ICP: `care-homes`, `elder-care`, `coaching`, `real-estate` and `waste-management` are either
B2C or sell to a consumer through a business. `CLAUDE.md` §2 names "B2B, not B2C, not B2B2C where the
buyer is a consumer" as a disqualifier.

So the hub currently advertises five audiences the firm has decided not to sell to, on the page whose
whole argument is that we are precise about where we sell.

**I am not fixing it here**, because removing a card removes a live indexable URL from the internal
link graph, and both are frozen. `lib/industryPublication.ts` is the lever and its own comment
describes how to pull it. My one line for the operator: the five off-ICP branches should be demoted
in the publication gate and 301'd, or the ICP sentence on this page is contradicted by the grid
directly underneath it. The decision is the operator's, and Nadia should pull Search Console for those
URL groups first, per `CLAUDE.md` §7.

---

Checked against `standards/anti-slop.md` and `CLAUDE.md` §10: no em dashes, no banned words, no
rhetorical-question openers, no rule-of-three padding, no closing summary.
