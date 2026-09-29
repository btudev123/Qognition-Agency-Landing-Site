# `/` homepage v3: the B2B universe, not one flagship vertical

Owner: Theo (content). Date: 2026-09-28. Branch: `b2b-ai-search`.
Status: **draft. Not approved copy until Ruth (`brand-guard`) has run.**

Supersedes `docs/copy/home-v2.md`, which was written against an eight-sector taxonomy and a narrower
ICP. Brief: `docs/copy/00-brief-v2-b2b-universe.md`.

**This file changes strings and data arrays inside existing components. It changes no layout, no
class, no token, no route and no meta tag.** Where a change has a structural consequence (an array
length, a hard-coded count) it is called out by line so Mira can see it before she opens the file.

Section order in `components/AcquisitionHome.tsx` does not change:
Hero → BuyingProblem → FourLayers → Industries → Programme → Evidence → Snapshot → Fit → Faqs →
FinalCta.

---

## 1. `components/home/Hero.tsx`

**Unchanged:** the H1, both CTAs, the `ENGINES` array, the "Platforms we sample" label, the
disclaimer under the platform row. The H1 describes our work rather than the state of a third-party
system, which is the rule the heading gate enforces. Do not touch it.

**One change. The badge, line 122.**

Current:

```
AI SEO and GEO for B2B firms
```

Replace with:

```
AI search, SEO and paid media for B2B firms
```

Why. The badge is the first line on the page and it currently reads as an entry condition. Under the
ICP locked on 2026-09-28, a firm that wants only PPC is in the ICP and a firm that wants only classic
SEO is in the ICP. AI search is what we lead with, not what we require. The new badge keeps AI search
first in the reading order and stops the page disqualifying two thirds of the buyers it is for.

Character count is 44 against the current 27. It sits in `rf-eyebrow` above a `max-w-[15ch]` H1, so
it wraps to two lines at 360px. That is acceptable for an eyebrow and is already the behaviour of the
`Free AI visibility snapshot` label in the panel beside it. If Mira judges the wrap ugly, the fallback
is `AI search, SEO and PPC for B2B firms` at 36 characters.

---

## 2. `components/home/HeroSnapshotPanel.tsx`

**Keep the pattern exactly.** Four sector chips, real buyer prompts, the platform list, the 48-hour
figure, the process bar, the limit line at the bottom. The interaction is the persuasion and the
operator approved it.

**One recommended swap, and the operator can decline it in one line.**

The four chips are Manufacturing, Legal, IT and MSP, Logistics. Three of those are Tier S in
`data/b2b/verticals.ts`. Logistics is Tier A. The largest Tier S vertical, SaaS and Software, is
absent from the single most-read control on the page.

Recommended `SECTORS` array, replacing lines 47 to 84. Chip order is the demand tier, left to right.

```ts
const SECTORS: readonly Sector[] = [
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    prompts: [
      'Find ISO 9001 and AS9100 certified CNC machining suppliers in the Midwest',
      'Which contract manufacturers handle low-volume medical device parts?',
      'Compare injection moulding vendors with ITAR registration',
    ],
  },
  {
    id: 'saas',
    label: 'SaaS and software',
    prompts: [
      'Best SIEM platforms for a 400-seat company without a full SOC',
      'Which AP automation tools integrate with NetSuite and handle multi-entity?',
      'Compare auth providers with SOC 2 Type II and self-hosted deployment',
    ],
  },
  {
    id: 'msp',
    label: 'IT and MSP',
    prompts: [
      'Managed security providers with SOC 2 Type II and 24/7 SOC coverage',
      'Which MSPs support Epic environments for regional hospital systems?',
      'Compare co-managed IT providers for 200-seat manufacturers',
    ],
  },
  {
    id: 'professional',
    label: 'Professional services',
    prompts: [
      'Which CPA firms handle R&D tax credits for hardware startups?',
      'Best commercial litigation firms for mid-market SaaS disputes',
      'Employment counsel with experience defending WARN Act claims',
    ],
  },
] as const;
```

Every prompt is Family B: a sentence our client's buyer would type, with no Qognition mention and no
superlative that we are asserting. The reader can paste any line into ChatGPT and check it, which is
the whole offer.

The existing Logistics prompts are good and are not being deleted for quality reasons. If the
operator wants five chips, the array supports it and the `flex-wrap` chip row already wraps.

**One line of body copy changes. Line 139.**

Current:

```
Pick your sector. These are real prompts we run — no email required to look.
```

Replace with:

```
Pick your sector. These are real prompts we run. No email required to look.
```

Why. An em dash, banned by `CLAUDE.md` §10. Two sentences instead.

**Unchanged and load-bearing:** the 48-hour figure is a turnaround commitment we control, and the
comment above it says so. If the snapshot SLA is still unconfirmed, the figure comes out of both this
panel and `/free-ai-audit` together, never one of them.
`[NEEDS DATA: confirmed snapshot turnaround the team can hold at current volume. Carried forward from
home-v2.md. Unresolved.]`

---

## 3. `components/home/BuyingProblem.tsx`

This section is the argument of the page and it currently carries no evidence by design, because in
September the only figures in circulation were vendor blogs citing vendor blogs. Iris has since
sourced primary, dated research. The section can now name the buyer and stand on a source.

**Replace the H2, line 32.**

Current:

```
Your buyer shortlists before they ever contact you.
```

Replace with:

```
Your buyer finishes most of the decision before they contact you.
```

Why. "Shortlists" is the mechanism. "Finishes most of the decision" is the loss, and it is the
sentence the evidence below now supports directly. It is 64 characters against a `max-w-[22ch]`
heading, so it sets to three lines at desktop instead of two. That is within the block.

**Replace all three body paragraphs, lines 37 to 54.**

Paragraph 1:

> The buyer is a procurement director, an engineer, an IT leader or a finance leader. They describe
> their situation to an assistant in one sentence, get three or four named firms back, and start
> there. In manufacturing, published research puts 62% of the technical buying journey behind them
> before they contact any vendor, rising to about 66% for engineers aged 35 and under.

Paragraph 2:

> That is a different problem from ranking. A results page gives the buyer ten options and lets them
> choose. An assistant gives them three and explains why. If you are not one of the three, there is
> no page two to be on.

Paragraph 3:

> The mechanics are not mysterious. An assistant assembles an answer from sources it retrieves, and
> most of those sources are not your website. They are directories, association listings, review
> platforms, trade press, forums and comparison pages. Your site tells the model who you are.
> Everyone else's content decides whether you get named.

**Add a fourth paragraph, new, directly after paragraph 3 and before the blockquote.** It carries the
source and the honesty that makes the first three believable.

> Source, and the part of it that argues against us: the 2026 State of Marketing to Engineers report
> from GlobalSpec, TREW Marketing and Elektor found 69% of technical buyers use generative AI during
> purchasing decisions and 75% notice AI-generated summaries. The same report has them rating AI
> trustworthiness at 4.7 out of 10, and 69% of them read on into the classic results anyway. So this
> is a shortlist channel, not a traffic channel, and anyone selling it to you as traffic has not read
> the research.

Render that paragraph at `text-meta` in `--s-text-faint`, matching the caveat treatment already used
in `Evidence.tsx`, with "2026 State of Marketing to Engineers report" as an outbound link to
`https://www.trewmarketing.com/state-of-marketing-to-engineers-research-report`.

`[NEEDS DATA: the report's sample size and field dates. The summary page does not state n. If Ruth
judges an unstated n fatal, the whole fourth paragraph and the 62% sentence in paragraph 1 come out
together, and the section returns to carrying no number, which is where it is today. They are one
unit.]`

**Unchanged:** the blockquote. "You cannot sell to a buyer who never reached your website." It is the
best sentence in the section and it is true for every vertical.

**Update the file comment, lines 12 to 18.** It currently states that no statistic appears here
deliberately. That reasoning is now out of date and the comment will actively mislead the next
person. Replace with the source, the label, and the rule that the adoption figure and the trust
figure ship together or not at all.

---

## 4. `components/home/FourLayers.tsx`

**Unchanged:** the `<table>`, the `caption`, the scoped headers, the four rows, the H2, the intro.
This is the most liftable block on the site and it is correct. Do not turn it into a card grid.

**Replace the closing paragraph, lines 132 to 136.**

Current:

> All four are in every retainer. We do not sell them separately, because the last two do not work
> without the first two. Tiers differ by scope: locations covered, prompts tracked, assets produced.

Replace with:

> All four are in every retainer. We do not sell them separately, because the last two do not work
> without the first two. Tiers differ by scope: locations covered, prompts tracked, assets produced.
>
> Come to us for classic SEO alone and you will still get all four, at no extra cost and with no
> extra decision to make. Paid media is the one thing that sits outside this table. It is priced
> against your media budget rather than against scope, it is quoted separately, and it is not inside
> the retainer price.

Why. Two jobs in one block. The first paragraph answers "what am I buying". The second closes the two
holes the ICP opened: a prospect who only wants SEO must not read this table as a refusal, and a
prospect who wants paid must not read it as an upsell hidden in a retainer.

**Do not add a PPC row to the table.** PPC is not a search surface. Putting it in the four-layer
table is the fastest way to destroy the one block on the site that a model can lift cleanly.

**Internal linking note.** `/ppc` does not exist in `app/` yet, and internal linking does not change
in this workstream. The paragraph above deliberately carries no link. When `/ppc` ships, the words
"Paid media" become the anchor and nothing else in the paragraph moves.

---

## 5. `components/home/Industries.tsx`

The heaviest rewrite on the page, and the reason this file exists. The section currently says "We
sell to three kinds of firm", names a revenue band that the operator replaced on 2026-09-28, and puts
commercial insurance in the full-width flagship row at the top, which makes the whole site read as an
insurance agency's site.

**Design survives exactly.** One hairline lattice, mono index per cell, `sm:grid-cols-2`, one cell
carrying `sm:col-span-2`. What changes is the array and three strings.

### 5.1 Eyebrow and H2

Eyebrow, line 74. Unchanged: `Who we build this for`.

H2, line 76. Current: `We sell to three kinds of firm.`

Replace with:

```
We sell to B2B firms, not to one industry.
```

42 characters into a `max-w-[20ch]` heading. Sets to two lines.

### 5.2 Section intro, lines 78 to 81

Current:

> Firms doing $3M to $50M in revenue, with 20 to 200 staff, selling a considered purchase to another
> business. We are US-first, with Australian clients served in USD.

Replace with:

> Any B2B company doing $3M to $1B+ in revenue, with 20 to 10,000+ staff, that needs AI search, SEO
> or paid media. Any one of those three is enough. We are US-first, with Australian clients served in
> USD.

That is the ICP sentence from `CLAUDE.md` §2, in the reader's grammar. It is the gate and it is the
whole gate.

### 5.3 The `VERTICALS` array, lines 42 to 61

Seven entries, replacing three. Six two-column cells fill three rows exactly, then the flagship takes
the full-width seventh row. The lattice closes at every breakpoint, which is the constraint the
existing comment on line 99 records.

**Commercial insurance moves from first to last and keeps the flagship row.** It is still the one
vertical where `CLAUDE.md` §1 permits the occupancy argument, so it keeps the emphasis. Putting it
last means the page opens on the universe and closes on the sharpest single case, instead of opening
on an industry that is not most readers' industry.

```ts
const VERTICALS: Vertical[] = [
  {
    name: 'SaaS and software',
    buyer: 'A VP of Engineering, CISO or CFO who has already read a comparison an assistant wrote for them.',
    detail:
      'Horizontal and vertical SaaS, dev tools and APIs, cybersecurity software, fintech. The category comparison query is where their buyers start, and that answer is assembled rather than ranked.',
  },
  {
    name: 'Professional and business services',
    buyer: 'A founder, CFO or general counsel looking for a specialist, usually against a deadline.',
    detail:
      'Law, accounting and tax advisory, consulting, HR and talent, and the agencies that buy this work for themselves. Referral-dependent firms whose buyers now shortlist by assistant before they ask a peer.',
  },
  {
    name: 'Manufacturing and industrial',
    buyer: 'A design engineer first, then procurement, then a quality manager who can kill the deal after it is won.',
    detail:
      'CNC and precision machining, contract manufacturing and EMS, automation and robotics, components, industrial distribution. Certification scope, tolerance and lead time are the filters, long before price.',
  },
  {
    name: 'Technology and IT services',
    buyer: 'An IT director, CISO or operations lead comparing providers before a contract renewal.',
    detail:
      'MSPs, MSSPs, cloud and infrastructure partners, cybersecurity consultancies, data and integration specialists.',
  },
  {
    name: 'Healthcare and life sciences',
    buyer: 'A supplier-qualification, clinical operations or business development lead with a compliance gate behind them.',
    detail:
      'MedTech and devices, CROs and CDMOs, health IT, medical billing and staffing. Long cycles, high lifetime value, and a buying committee that includes someone who can stop a signed deal.',
  },
  {
    name: 'Logistics, supply chain and transportation',
    buyer: 'A shipper or supply chain manager settling mode, lane and handling fit before anyone asks for a rate.',
    detail:
      'Freight forwarding, 3PL and warehousing, cold chain, last mile, customs and trade compliance, fleet and equipment.',
  },
  {
    name: 'Commercial and specialty insurance',
    buyer: 'A risk manager, CFO or operations lead comparing agencies before a renewal.',
    detail:
      'Independent agencies, MGAs, wholesale brokers and insurtech. This is the one vertical where we have found no AI-search agency competing at all, so we lead the argument hardest here. Everywhere else the argument is evidence quality, not who got there first.',
    flagship: true,
  },
];
```

### 5.4 Two structural consequences Mira has to handle

1. **Line 113 hard-codes `/ 03`.** It becomes `/ 0{VERTICALS.length}` or `/ 07`. A count that
   disagrees with the grid is the kind of defect a careful reader notices and a careless one does
   not, which makes it worse, not better.
2. **The flagship label on line 114 reads `Flagship vertical`.** Replace with `Uncontested`. "Flagship"
   says nothing a reader can check. "Uncontested" is the actual claim and the cell body now explains
   the basis for it in the same breath.

### 5.5 New closing line, under the grid and above the button

Add one paragraph between the lattice and the CTA, at `text-meta` in `--s-text-faint`:

> Fifteen meta-verticals and 120 sub-niches sit behind these seven, in one file we keep as the route
> to market. It is not a list of industries we have worked in, and your industry does not have to be
> on it. If you are a B2B firm inside the band above, the conversation is the same one.

This sentence is the repositioning. It is also the `CLAUDE.md` §11 defence: it states plainly that a
page existing is not a claim of experience, which no competitor publishes.

### 5.6 The CTA button, line 130 to 132

Label currently reads `See the insurance records` and points at
`/case-studies/industry/insurance`.

**The href does not change.** Internal linking is frozen and that URL resolves.

**The label changes** to:

```
See how we document an engagement
```

Why. The button sits under seven verticals now. A label naming one of them tells six sevenths of the
readership the button is not for them, when in fact what is behind it is the evidence discipline,
which is for all of them. The destination page is still an insurance index, so the label must not
promise otherwise. "How we document an engagement" is true of what they will find, whatever vertical
it is drawn from.

---

## 6. `components/home/Programme.tsx`

Nearly all of this survives. It describes a method, and the method does not change by vertical.

**One replacement. Phase 03 deliverable, lines 46 to 47.**

Current:

> Named people matter more here than the firm does. A model retrieving commentary on contractor
> liability will find a person who wrote it, not a logo.

Replace with:

> Named people matter more here than the firm does. A model retrieving commentary on CMMC readiness,
> or on what a supplier audit now asks for, will find the person who wrote it, not a logo.

Why. "Contractor liability" is an insurance example in the one paragraph of the method section that
carries a subject. Two examples replace it, both from live 2026 compliance events, and both usable
in front of a manufacturer, an MSP or a law firm without translation.

**Unchanged and load-bearing:** the closing paragraph. "We do not control ChatGPT, Google or
Perplexity, and we will not tell you when you will appear in them." That is the differentiator, not a
hedge, and the file comment says so.

---

## 7. `components/home/Evidence.tsx`

Three changes. The section's job is unchanged and its structure is unchanged.

### 7.1 Section intro, lines 78 to 82

Current:

> Nobody in this category has a long results record in insurance or professional services, including
> us. The category is roughly two years old. Rather than fill that gap with numbers, here is the
> evidence that does exist.

Replace with:

> Agencies now market AI search to manufacturers, law firms and accountants. Not one of them
> publishes a named client with a dated, reproducible measurement, and neither does anyone else in a
> category that is roughly two years old. Rather than fill that gap with numbers, here is the
> evidence that does exist.

Why. This is the one claim the site owns, stated where the reader is already looking for proof. It is
checkable on the day it is read, it does not depend on being first into a vertical, and a competitor
naming one client does not falsify it.

### 7.2 The `SOURCES` array, lines 42 to 63: two cards become four

The grid is `lg:grid-cols-2`, so four cards render as a clean two by two. Three would leave a hole.
No class changes.

Cards 1 and 3 are the existing two, unchanged in wording. Cards 2 and 4 are new.

**Card 1.** Unchanged. Wellows insurance citation study.

**Card 2. New. Order it second, so the page is not two insurance-adjacent facts in a row.**

```ts
{
  kicker: 'The behaviour is measured',
  title: 'The decision is mostly over before you hear about it',
  body: 'The 2026 State of Marketing to Engineers report puts 62% of the technical buying journey behind the buyer before they contact any vendor, and about 66% for engineers aged 35 and under. 69% of technical buyers use generative AI during purchasing decisions and 75% notice AI-generated summaries.',
  caveat:
    'The same report rates AI trustworthiness at 4.7 out of 10, and 69% read on into the classic results anyway. This is a shortlist channel, not a traffic channel. The publisher does not state the sample size.',
  source: 'GlobalSpec, TREW Marketing and Elektor, State of Marketing to Engineers 2026',
  date: 'Accessed 28 September 2026',
  href: 'https://www.trewmarketing.com/state-of-marketing-to-engineers-research-report',
},
```

**Card 3.** Unchanged. Google Search Console generative AI reporting.
`[NEEDS DATA: the URL that carries the 31 August 2026 worldwide availability statement. The current
href slug is dated 2026/06 and contradicts the sentence in the card. Carried forward from home-v2.md
and still a blocker. A page arguing that we date our claims cannot ship a link that disagrees with
its own date.]`

**Card 4. New.**

```ts
{
  kicker: 'The volume is small and the concentration is extreme',
  title: 'Most AI referral traffic goes to ten domains',
  body: 'Semrush analysed over a billion lines of US clickstream data from a 200 million user panel covering October 2024 to February 2026. Over 30% of all ChatGPT referral traffic goes to 10 domains. 21.6% of ChatGPT referrals go to Google. Between 65% and 85% of prompts matched no keyword in a 27 billion keyword database.',
  caveat:
    'Which is why we measure mention and citation share on a fixed prompt panel rather than AI referral sessions. A firm measuring this by sessions will conclude it does not matter. The study contains no conversion-rate comparison, and anyone quoting you one from it is quoting something that is not in it.',
  source: 'Semrush, ChatGPT search insights, published 7 April 2026',
  date: 'Accessed 28 September 2026',
  href: 'https://www.semrush.com/blog/chatgpt-search-insights/',
},
```

Card 4 does real commercial work. It is the honest reason the product is prompt monitoring and not a
traffic promise, and it pre-empts the objection a sceptical CEO raises on the call.

### 7.3 New block: what we have delivered, and why we cannot name it

Add between the "Dated observations, not a state" block and the featured case-study card. Same
two-column `lg:grid-cols-12` shape as the block above it, H3 in columns 1 to 5, body in 7 to 12. No
new components.

**H3**

```
What we have delivered, and why we cannot name it
```

**Body, paragraph 1**

> Most of our delivery has been white-label under signed NDAs. We can walk you through the scope, the
> method and what we changed. We cannot name the client or arrange a reference call on that work, and
> we will not imply otherwise by describing it vaguely enough that you assume more than there is.

**Body, paragraph 2**

> Where we have delivered: managed IT and cloud, cybersecurity, and B2B SaaS in part. Where we have
> not worked in your vertical we will say so on the call, rather than stretching an adjacent case to
> fit. The standards vocabulary and the buying committee change between verticals, and a case that
> does not transfer is worse than no case.

Why this goes on the homepage and not only in the FAQ. The operator's rewrite of `Faqs.tsx` line 32
is the strongest paragraph on the site, and it is currently behind a closed `<details>`. The NDA
framing explains the absence of named clients instead of leaving a reader to infer the worse
explanation. It should be visible without an interaction. The wording here is deliberately the same
argument in fewer words, so the two cannot drift.

### 7.4 The featured case study stays, with its framing

`FEATURED_CASE_STUDY_ID` remains `alliance-insurance-group`. It is the only `publishGate: 'publish'`
record on the site whose client's buyer is a business. Featuring an HVAC or dental record on a page
addressed to B2B firms would argue against the page.

The closing paragraph under the card, lines 206 to 210, stays exactly as written. One sentence is
added to its front, because the card is now the only insurance artefact left in a section that opens
on the whole category:

> One record, from the vertical where our published diagnostic work is deepest. These figures are the
> targets the engagement is scoped against, derived from category benchmarks. They are not reported
> results. They are relabelled the moment client reporting is reconciled against them, and not
> before.

`[NEEDS DATA: a publishable B2B record from managed IT, cloud or cybersecurity. Until one exists,
this card is an insurance record on a page addressed to twelve verticals, and the added sentence is
the honest patch rather than the fix.]`

---

## 8. `components/home/Snapshot.tsx`

**No changes.** Every sentence is vertical-neutral, the "What it is not" column is at full weight
beside "How it is produced", and no turnaround SLA appears. The only dependency is the 48-hour figure
in the hero panel: if that ships, this section and `/free-ai-audit` have to agree with it, and if it
does not ship it comes out of the panel rather than being added here.

---

## 9. `components/home/Fit.tsx`

The disqualifier column already matches `CLAUDE.md` §2 exactly and does not change. The qualifier
column is written for one kind of buyer and now excludes people the ICP includes.

**Replace the `FITS` array, lines 17 to 23.**

```ts
const FITS = [
  'You are a B2B company doing $3M or more in revenue, with 20 or more staff',
  'You want AI search, classic SEO or paid media. Any one of the three is a conversation',
  'You sell a considered purchase with a sales cycle measured in weeks, not minutes',
  'Someone at your firm can approve and publish website changes',
  'You have people who are willing to be named and quoted publicly',
  'You can commit to three months before judging the organic work',
];
```

Six items against the existing five. Both columns are independent `<ul>`s in a
`lg:grid-cols-2`, so an uneven pair is already the rendered behaviour at some breakpoints.

Two deliberate edits inside the list. "Referrals have carried your growth and you want a second
channel" is gone: it is true of professional services and is not the entry condition for a
manufacturer or a SaaS company, and the ICP does not contain it. "Three months before judging the
work" becomes "the organic work", because a paid engagement is judged inside a month and the sentence
as written was quietly promising a three-month lock on something that does not need one.

**Unchanged:** the H2, the sub-line, and the `DOES_NOT_FIT` array. Those five disqualifiers are the
five in `CLAUDE.md` §2, and every one is about whether the work can succeed rather than about which
industry the prospect is in.

---

## 10. `components/home/Faqs.tsx`

**Do not touch the first answer** ("No, and no one can") or the third
(the NDA answer at line 32). The third is the operator's own wording and the rest of the site is now
written to be consistent with it, not the other way round.

**Two new entries, inserted after the existing question 3.** They answer the two objections the
widened ICP creates, and both are questions a real prospect asks on the first call.

```ts
{
  q: 'We only want paid media. Is that a conversation?',
  a: 'Yes. Paid search and paid social are a real service we run for these clients, not a footnote, and you do not have to want AI search to work with us. Paid is quoted separately from the search retainer, priced against your media budget rather than against scope, and you pay the platforms directly. We keep the two separate on purpose: an agency paid a percentage of ad spend has an obvious incentive to recommend more ad spend, and separating the offers is what keeps that conversation honest. The same is true in the other direction. Come to us for classic SEO alone and you will still get all four search layers, at no extra cost.',
},
{
  q: 'Our industry is not on your list. Does that rule us out?',
  a: 'No. The industry pages exist because a page has to be written to somebody in particular, and a page written to everybody converts nobody. They are a route to market, not a qualifier. What we actually screen on is whether you are a B2B company doing $3M or more in revenue with 20 or more staff, whether there is a real sales process behind the enquiries, and whether someone at your end can publish changes to the website. If that fits, the conversation is the same one, and the snapshot will tell us both inside a week whether the work is worth doing.',
},
```

**Consequence.** The H2 on line 62 reads `Six honest answers.` With eight entries it becomes:

```
Eight honest answers.
```

`HOME_FAQS` also feeds `faqSchema()` in `lib/schema.ts`, so both new entries appear in the FAQPage
JSON-LD from the same strings the page renders. That is the existing design and it is correct. Two
self-contained, specifically-worded answers is the cheapest citation gain available on this page.

---

## 11. `components/home/FinalCta.tsx`

**No changes.** The H2 closes the loop the hero opens, the body paragraph promises a dated
observation and nothing else, and the "if you are already well positioned we will tell you that too"
line is the sentence that makes the offer credible. Nothing in it is vertical-specific.

---

## What must not come back onto this page

- "We sell to three kinds of firm."
- "$3M to $50M in revenue, with 20 to 200 staff."
- "Every quarter your CAC drops."
- "Built to win citations in."
- "Receipts, not promises."
- "Industries we dominate. Globally."
- Any variant of "no AI-search agency has published a case study outside B2B SaaS."
- Any sentence asserting what an assistant currently returns, without a platform, a prompt set and a
  date.
- `AICitationSimulator.tsx`, which fabricates an AI answer with invented citations.
- `StatBand`, unless every figure in it is measured.
  `[NEEDS DATA: what StatBand renders. Carried from home-v2.md. It is not in the current
  AcquisitionHome section list, so this may already be resolved by deletion. Confirm.]`

Checked against `standards/anti-slop.md` and `CLAUDE.md` §10: no em dashes in any copy in this file,
no banned words, no rhetorical-question openers, no paragraph opening by restating its heading, no
closing summary.
