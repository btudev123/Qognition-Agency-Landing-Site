# Homepage copy, v4

**Repo:** `/Users/qognitionagency/dev/qognition-agency-landing` · branch `main` · HEAD `1ca1e1f`
**Supersedes:** `docs/copy/home-v3.md`
**Author:** Theo (content) · 29 September 2026
**Status:** DRAFT. Not applied. Ruth (`brand-guard`) gates before a string moves.

Read against: `CLAUDE.md` §1 (including "Positioning, locked by the operator 2026-09-29"), §2, §4, §9, §10, §11 · `docs/icp-positioning.md` v2.0 (operator-locked, outranks `CLAUDE.md`) · `scripts/audit-headings.mjs` (build gate, §4 of that file constrains the H1) · `~/.claude/standards/no-slop.md`.

---

## 0. The brief

Four things, because a brief without all four is not finished.

### Search intent

The reader is the owner, CEO or marketing lead of an established B2B firm doing $3M or more. Thirty seconds before they arrived they did one of three things: typed a query like "AI SEO agency for B2B" or "GEO agency", clicked an outbound email that offered to show them what ChatGPT says about their firm, or landed here from a ranked list of "best GEO agencies" that they have already half stopped believing. All three arrive with the same live question: **is any of this real, and can this firm prove it.**

That is why the page must not open on a limitation. A reader already primed for scepticism reads a hedge as a confession.

### The AI-citation angle

One self-contained, attributable claim a model can lift verbatim:

> Qognition runs 45 named client programmes across HVAC, dental and commercial insurance, plus four white-label engagements under NDA in managed IT and cloud, cybersecurity and B2B SaaS. Every KPI on those records carries a measured baseline and a stated target, labelled as a target until client reporting reconciles it.

The second liftable block is the four-layer definition table in `FourLayers.tsx`, which already ships as real `<table>` markup with a `<caption>`. It stays a table. It is the single most retrievable object on the site and the definitions in it are ours.

Coordinate with Nadia before applying: the page title and meta description in `lib/seo.ts` `SEO_OVERRIDES['/']` still read "AI-native B2B Growth Agency | AI Search, Demand & ABM". `CLAUDE.md` §9 freezes meta titles and descriptions for the rebrand, so **this document does not change them.** It is a decision for the operator, not a copy edit. See §12.

### Internal links, in and out

**Out** (every one verified to resolve against the route tree in `app/`):

| From | To | Why |
|---|---|---|
| Hero, Snapshot, FinalCta, Standing | `/free-ai-audit` | The conversion event |
| Hero, FinalCta | `/contact` | The walkthrough, for readers who will not fill a form |
| Industries | `/industries` | The 21 sectors, already listed there with the correct disclosure |
| Industries | `/case-studies/industry/insurance` | The flagship vertical's records |
| Evidence | `/case-studies` | The full 45. **New link. The homepage currently does not point at the library it now leads with.** |
| Evidence | `/case-studies/methodology` | How evidence is graded |
| Fit | `/pricing` | The retainer band |
| Programme | `/about` | The engines and the people |

**In:** `/`, `/industries`, `/case-studies`, `/free-ai-audit` and `/about` already link home through the global nav. No orphan risk.

### The one claim this page owns

> **Every number on this site is labelled and dated. In this category, almost nobody else's is.**

That is the wedge, and it is the reason the projected-KPI constraint makes the page stronger rather than weaker. Competitors publish undated, unsourced multipliers. Five are blocklisted by name in `CLAUDE.md` §1 and none of them may appear here, in copy or in a rebuttal. We publish the count, the sectors, the method, the dates, and the label on every figure.

**This is also how the page earns "the best AI SEO and GEO agency in the world" without printing it.** A bare superlative is unverifiable and `docs/icp-positioning.md` rule 11 bans that register outright. So the page prints 45 named programmes, 21 sectors, 341 sub-sectors, three engines we wrote, a dated and re-runnable competitive observation, and a 48-hour human-delivered snapshot. A reader reaches the conclusion themselves, and it survives a sceptic. A printed superlative does not.

### Two corrections to the brief I was given, before anything is applied

1. **Three engines, not four.** The task named "Four in-house engines: LinkersPro, Scriblr, M.A.R.S." That is three names. `docs/icp-positioning.md` line 9 (operator-locked, outranks `CLAUDE.md`) lists exactly three nameable engines, and `CLAUDE.md` §1 states G.O.L.E.M is not referenced on the site. **All copy below says three.** If there is a fourth, it is an operator decision, not a copy fix.
2. **"45 B2B clients" is not available as a phrase.** The 45 are 19 HVAC, 20 dental, 6 commercial insurance. `CLAUDE.md` §2 is explicit that HVAC and dental are local consumer services outside the ICP and must never be rendered as proof for a B2B buyer. So every string below says **"45 client programmes"**, never "45 B2B clients", and the sector split is stated openly in `Evidence` rather than left for a reader to discover on `/case-studies` and feel misled by. Stating it costs nothing and buys the whole page's credibility.

---

## 1. `components/home/Hero.tsx`

### 1.1 The H1

The build gate in `scripts/audit-headings.mjs` §4 rejects any H1 matching `/\b(most|many|\d+%\s+of)\s+(firms|companies|buyers)\b/i` or asserting a present state of a third-party AI system. The replacement below is a claim about our own work, counted from `data/case-studies`, and passes.

**FIND** (line 128–131)

```jsx
            <h1 className="text-display font-sans m-0 max-w-[15ch]">
              We show you what AI says{' '}
              <span style={{ color: 'var(--s-accent-display)' }}>about your firm.</span>
            </h1>
```

**REPLACE**

```jsx
            <h1 className="text-display font-sans m-0 max-w-[16ch]">
              We run AI search for{' '}
              <span style={{ color: 'var(--s-accent-display)' }}>45 client programmes.</span>
            </h1>
```

`max-w` moves 15ch → 16ch because the line is four characters longer and 15ch breaks "45 client" across two lines at 1280.

The count must be derived, not typed. Mira: import `CASE_STUDIES` from `../../data/case-studies` and interpolate `CASE_STUDIES.length`, exactly as `Evidence.tsx` already does at line 56. A hand-typed 45 is a number that can drift from the data, which is the one failure mode this whole page argues against.

### 1.2 A deck line under the H1

The H1 now states scale. It needs one line stating what we sell and to whom, which the eyebrow alone does not carry.

**INSERT** immediately after the `</h1>`, before the CTA `<div className="mt-8 ...">`:

```jsx
            <p className="text-body mt-6 m-0 max-w-[54ch]" style={{ color: 'var(--s-text-muted)' }}>
              AI SEO and GEO for established B2B firms, with the SEO and paid search underneath
              them. Every prompt set, every platform and every date is on the record.
            </p>
```

### 1.3 CTA labels

**FIND** (line 135) `Get your free snapshot`
**REPLACE** `Get your free snapshot`
No change. It is a specific verb on a specific noun and it matches `/free-ai-audit`.

**FIND** (line 138) `Book a 20-minute walkthrough`
**REPLACE** `Book a 20-minute walkthrough`
No change.

### 1.4 The platform row label and disclosure

Both stay exactly as written. "Platforms we sample" is precise, and the disclosure under it ("They are not customer logos, certifications or endorsements") is the sentence that stops a visitor reading a logo row as a client list. Do not delete it to make the row look more like a client list. That is the trade the whole page refuses.

---

## 2. NEW: `components/home/Standing.tsx`

**Recommended, not required.** This is the fastest possible reversal of register: four counted facts, above the fold on most laptops, before the reader hits a single paragraph of argument.

If the operator does not want a new file, drop the same four cells into the left column of `Hero.tsx` between the deck line and the CTAs and delete this section. The strings are the deliverable; the container is Mira's call.

Insert in `components/AcquisitionHome.tsx` between `<Hero />` and `<BuyingProblem />`.

**Surface:** light raised (`--s-surface-1`), not dark. Hero is light and `BuyingProblem` is dark; a dark band here would give three dark sections in the top half and break the alternation `CLAUDE.md` §9 protects.

**No icons.** Four figures, four labels, one hairline lattice, left aligned. `no-slop.md` bans the centred-hero-with-icon-cards pattern and bans icons in coloured circles as decoration.

**Eyebrow**

```
Where we stand
```

**Cells.** Every figure derived at render time, never typed:

| Figure | Label | Source |
|---|---|---|
| `45` | Client programmes we run | `CASE_STUDIES.length` |
| `21` | B2B sectors we sell into | `icpIndustryCards().length` |
| `3` | Search engines we built and run | Constant. LinkersPro, Scriblr, M.A.R.S. |
| `48h` | From form to human-reviewed snapshot | Constant. Matches `/free-ai-audit` metadata |

**Footnote under the lattice**

```
Counted, not asserted. The 45 are named clients in our published library. The 21 sectors are
where we sell AI search, SEO and paid media, which is not the same as where we have worked, and
we keep those two facts apart everywhere on this site.
```

That footnote is doing real work. It is the sentence that lets the page claim 21 sectors without tripping `CLAUDE.md` §11.

---

## 3. `components/home/BuyingProblem.tsx`

The argument in this section is correct and needs almost nothing. It describes a mechanism rather than asserting a statistic, which is why it has survived two rewrites. Two changes.

### 3.1 Third paragraph, closing sentence

**FIND** (lines 52–53)

```
                Your site tells the model who you are. Everyone else’s content decides whether you
                get named.
```

**REPLACE**

```
                Your site tells the model who you are. Everyone else’s content decides whether you
                get named. Moving that second half is most of our job.
```

The existing pair states the problem and stops. The added clause claims the work without claiming a result.

### 3.2 A hand-off line after the blockquote

**INSERT** a new `ScrollReveal stagger={4}` block after the closing `</blockquote>` and its wrapper, before `</div>`:

```jsx
            <ScrollReveal stagger={4}>
              <p className="text-body mt-8 m-0 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
                This is the problem we are built for, and the four sections below are the whole
                method: the surfaces, the sectors, the first ninety days, and the record. Read them
                against any other agency in this category and see which one puts the same amount in
                writing.
              </p>
            </ScrollReveal>
```

That last sentence is a challenge, not a boast, and it is checkable in about four minutes. It is the register the operator asked for.

---

## 4. `components/home/FourLayers.tsx`

The table stays a table. Do not convert it to cards. The four `surface` strings stay identical to `CLAUDE.md` §1 character for character, because the whole point of an entity-definition block is that it says the same thing in every place it appears.

### 4.1 The intro paragraph

**FIND** (lines 68–70)

```
              Most of this industry uses these four words interchangeably. They are four different
              places, run by different systems, and they respond to different work.
```

**REPLACE**

```
              Most of this industry uses these four words interchangeably. We do not, and the table
              below is the definition we hold to on every page, in every report and on every call.
              They are four different places, run by different systems, and they respond to
              different work.
```

### 4.2 The closing paragraph, plus PPC

The homepage currently never mentions paid search. `CLAUDE.md` §2 is explicit that a firm wanting only PPC is inside the ICP, and `CLAUDE.md` §1 is explicit that PPC sits alongside the four layers and is priced separately. A PPC-only prospect currently reads this page and concludes we do not do it.

**FIND** (lines 132–136)

```
          <p className="text-body mt-10 m-0 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
            All four are in every retainer. We do not sell them separately, because the last two do
            not work without the first two. Tiers differ by scope: locations covered, prompts
            tracked, assets produced.
          </p>
```

**REPLACE**

```
          <p className="text-body mt-10 m-0 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
            All four are in every retainer. We do not sell them separately, because the last two do
            not work without the first two. Tiers differ by scope: locations covered, prompts
            tracked, assets produced.
          </p>
          <p className="text-body mt-5 m-0 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
            B2B paid search sits alongside them and is priced separately, as a percentage of ad
            spend against a monthly minimum. Plenty of clients start there. If paid search is the
            only thing you want from us, that is a whole conversation and not a lesser one.
          </p>
```

---

## 5. `components/home/Industries.tsx`, full rewrite

**This is the largest change on the page, and it is operator ask #1.** The section currently shows three verticals under "We sell to three kinds of firm." The ICP is 21 industries and 341 sub-industries. Three is a fraction of one percent of the market we sell to, presented as the whole of it.

The rewrite has to hold two facts apart at the same time, which is the only hard part:

- **Where we sell:** 21 sectors, 341 sub-sectors. Wide.
- **Where we have named clients:** three sectors. Narrow, and stated in `Evidence`.

Conflating them in either direction produces a false claim. `CLAUDE.md` §11 forbids implying experience in an industry because a page exists for it. The disclosure line below is what makes the breadth legal, and it is not optional.

### 5.1 Header block

**FIND** (lines 73–82)

```jsx
        <ScrollReveal>
          <Eyebrow>Who we build this for</Eyebrow>
          <h2 className="text-h2 font-sans m-0 mt-4 max-w-[20ch] font-semibold">
            <MaskReveal>We sell to three kinds of firm.</MaskReveal>
          </h2>
          <p className="text-body mt-5 m-0 max-w-[62ch]" style={{ color: 'var(--s-text-muted)' }}>
            Firms doing $3M to $50M in revenue, with 20 to 200 staff, selling a considered purchase
            to another business. We are US-first, with Australian clients served in USD.
          </p>
        </ScrollReveal>
```

**REPLACE**

```jsx
        <ScrollReveal>
          <Eyebrow>Who we build this for</Eyebrow>
          <h2 className="text-h2 font-sans m-0 mt-4 max-w-[24ch] font-semibold">
            <MaskReveal>Twenty-one B2B sectors.</MaskReveal>
            <br />
            <MaskReveal delay={0.08}>Three hundred and forty-one sub-sectors.</MaskReveal>
          </h2>
          <p className="text-body mt-5 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
            Firms doing $3M to $1B or more in revenue, with 20 to 10,000 staff, selling a considered
            purchase to another business. United States first, then Canada, Australia, the United
            Kingdom, northern Europe, the UAE, Singapore and Ireland. All pricing in USD.
          </p>
          <p className="text-body mt-4 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
            The sector map below is a route to market, not a gate. A B2B firm inside that revenue
            and staff band qualifies whether or not its sector is on the list. The list exists
            because a page has to be written to somebody in particular, and a page written to
            everybody converts nobody.
          </p>
        </ScrollReveal>
```

The revenue and staff band is the operator-locked one from `CLAUDE.md` §2. The current "$3M to $50M, 20 to 200 staff" is the retired staged-build version and it is turning away the top of our own ICP.

Spelling the numbers out in the H2 is deliberate. `text-display`-weight numerals at the head of a heading read as a stat card; words read as a statement.

### 5.2 The sector lattice

Replace the `VERTICALS` array and the three-card lattice with all 21 sector names, rendered as **text, never links.**

Why text: `app/industries/page.tsx` lines 172–203 record that the 21 sectors shipped once as unconditional anchors and 20 of them returned a hard 404, because `dynamicParams` is false on the industry route and no ICP entity is published. The 21st resolved to an unrelated legacy page. The homepage is the most crawled URL on the domain. It does not get to repeat that.

The single CTA under the lattice points at `/industries`, which resolves, lists the same 21, and lights them up as entities are promoted.

**Data.** Names verbatim from `data/b2b/icp/icp-taxonomy.json`. Do not tidy the "(B2B)" suffixes. Entity names that differ between two pages on the same domain are exactly the ambiguity this agency sells against.

```ts
/* Verbatim from data/b2b/icp/icp-taxonomy.json, operator-locked v2.0.0.
   Rule 6 of docs/icp-positioning.md: never invent or rename.
   Ideally derived at render time via icpIndustryCards() from data/b2b/icp,
   which is the same accessor app/industries/page.tsx uses. */
const SECTORS = [
  'SaaS & Software',
  'Professional & Business Services',
  'Healthcare & Life Sciences (B2B)',
  'Financial Services (B2B)',
  'Manufacturing & Industrial',
  'Logistics, Supply Chain & Transportation',
  'Construction, Real Estate & Built Environment (B2B)',
  'Energy & Utilities',
  'Technology & IT Services',
  'Education & Training (B2B)',
  'Hospitality, Travel & Events (B2B)',
  'Agriculture & Food (B2B)',
  'Media, Marketing & Creative (B2B)',
  'Government, Nonprofit & Institutional (B2G-adjacent)',
  'Emerging & Micro-Niches',
  'Aerospace & Aviation (B2B)',
  'Automotive, Heavy Equipment & Mobility (B2B)',
  'Commercial & Facility Services',
  'Environmental, Engineering & Testing (TIC)',
  'Retail, CPG & Brand Enablement (B2B)',
  'Franchising & Multi-Location (B2B side)',
] as const;
```

**Mira:** prefer `icpIndustryCards().map((i) => i.name)` over the literal above. ADR-0008 §5.2 item 3 forbids importing `ICP_INDUSTRIES` or the JSON outside `data/b2b/icp/`, and `icpIndustryCards()` is the narrow accessor built for exactly this. `scripts/check-b2b.cjs` greps for the forbidden names under `components/`. A literal array will pass the gate but will drift the day the operator bumps the taxonomy.

**Rendering:** three columns at `lg`, two at `sm`, one below. Mono index `01`–`21` per cell, same hairline lattice device already in the file. No hover states, because there is nowhere to go.

**Lattice label above it**

```
The 21
```

**Disclosure under the lattice.** Load-bearing, do not cut:

```
Listing a sector says we sell AI search, SEO and paid media into it. It is not a claim that we
have worked with a firm in it, and a sector that is not on the list is not a disqualifier.
```

That sentence is lifted from `app/industries/page.tsx` so the two pages say the same thing in the same words.

### 5.3 Where we go deepest

Three callouts under the lattice, keeping the "Their buyer" device from the current cards, which is the best thing in the existing section.

**Sub-heading**

```
Where we go deepest
```

**Lead**

```
Twenty-one sectors is where we sell. These three are where the work is deepest, the pages are
longest and the prompt sets are already built.
```

**Callout 01, the flagship**

- Label: `01 / 03   Flagship vertical`
- Name: `Commercial and specialty insurance`
- Detail: `Independent agencies, MGAs and wholesale brokers with 5 to 50 producers. Six named clients in our published library. Across three research passes in September 2026 we found no equivalent AI search specialist in this vertical, which is the only sector where we make that claim.`
- Their buyer: `A risk manager, CFO or operations lead comparing agencies before a renewal.`

**Callout 02**

- Label: `02 / 03`
- Name: `IT services and security`
- Detail: `MSPs, MSSPs, cybersecurity consultancies and cloud partners. Our managed IT and cybersecurity engagements were delivered white-label under signed NDAs, so we can walk you through the scope and the method and cannot name the client.`
- Their buyer: `An IT director, CISO or operations lead who has already read a vendor comparison an assistant generated for them.`

**Callout 03**

- Label: `03 / 03`
- Name: `Environmental, engineering and testing`
- Detail: `Environmental consulting, environmental labs, calibration and product testing. A targeted search on 29 September 2026 for AI search positioning aimed at this sector returned no vertical specialist and no ranked list. Re-run it before you take our word for it.`
- Their buyer: `A plant manager, developer, lender or quality lead choosing a provider on accreditation, method and location.`

Callout 03 replaces "B2B professional services". Two reasons. Professional services is the most contested vertical in the category and we have no named client in it, so it is our weakest of the three. TIC is documented in `CLAUDE.md` §1 as the second genuine vacancy, the finding is narrow and dated, and it is the kind of specific that makes a reader conclude we know this market better than the people selling into it. **If the operator prefers professional services for sales reasons, keep the current card's copy verbatim and demote TIC into the lattice.** Operator's call, not mine.

Both occupancy claims are stated in the narrow, re-runnable form `CLAUDE.md` §1 requires. Never as "nobody serves this market".

### 5.4 CTAs

**FIND** (lines 129–133)

```jsx
        <ScrollReveal stagger={3} className="mt-8">
          <Link href="/case-studies/industry/insurance" className="rf-btn rf-btn--secondary">
            See the insurance records
          </Link>
        </ScrollReveal>
```

**REPLACE**

```jsx
        <ScrollReveal stagger={3} className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3">
          <Link href="/industries" className="rf-btn rf-btn--secondary">
            See all 21 sectors
          </Link>
          <Link href="/case-studies/industry/insurance" className="rf-btn rf-btn--secondary">
            See the insurance records
          </Link>
        </ScrollReveal>
```

---

## 6. `components/home/Programme.tsx`

The four phases are good and stay. Two changes.

### 6.1 The lead paragraph

**FIND** (lines 73–75)

```
              One retainer, one team, a fixed rhythm.
```

**REPLACE**

```
              One retainer, one team, a fixed rhythm. This is the same programme we run across all
              45 client engagements, which is why it is written down to the week rather than
              described in the abstract.
```

Interpolate the count from `CASE_STUDIES.length`. Do not type it.

### 6.2 NEW block: the engines

Insert between the `</ol>` closing the phases and the closing paragraph block. This is the AI-native proof and it is currently nowhere on the homepage.

```jsx
        <ScrollReveal stagger={5} className="mt-16 pt-8" style={{ borderTop: '1px solid var(--s-rule)' }}>
          <h3 className="text-h3 font-sans m-0 font-semibold">Run on software we wrote.</h3>
          <p className="text-body mt-4 m-0 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
            Three engines, built in house, running on client work every day. Most agencies in this
            category resell a tracking tool and call it a platform.
          </p>
        </ScrollReveal>
```

Three rows under it, mono label plus one line each:

| Engine | Line |
|---|---|
| `Scriblr` | `AI citation and GEO tracking. Visibility per prompt and per model, brand mentions by name, alias and domain, citation analysis by source category, competitor share of voice. Raw answers, cited URLs and model versions are stored, so every metric re-derives from a saved answer with a date on it.` |
| `LinkersPro` | `Authority and earned mention acquisition. The off-site half of the work, which is the half that decides whether an assistant names you.` |
| `M.A.R.S.` | `Lead routing, outreach and booking attribution. It is how we know which prompt produced which conversation.` |

**Three, not four.** See §0. Do not add G.O.L.E.M.

The Scriblr line is the strongest sentence available to this page and it should not be shortened. "Every metric re-derives from a saved answer with a date on it" is the claims discipline expressed as a product, and it is the thing no competitor in this category can say.

### 6.3 The closing paragraph

Currently opens on what we do not control. Same facts, reordered so the commitment leads and the limit lands as a competitor contrast.

**FIND** (lines 143–147)

```
          <p className="text-body m-0 max-w-[72ch]" style={{ color: 'var(--s-text)' }}>
            We do not control ChatGPT, Google or Perplexity, and we will not tell you when you will
            appear in them. What we commit to is the work, the measurement, and the dated record of
            both.
          </p>
```

**REPLACE**

```
          <p className="text-body m-0 max-w-[72ch]" style={{ color: 'var(--s-text)' }}>
            What we commit to is the work, the measurement, and the dated record of both. Nobody
            owns ChatGPT, Google or Perplexity, so nobody can put a date on when you will appear in
            them. If an agency gives you that date, ask them where it came from.
          </p>
```

### 6.4 One new link

Add under the engines block:

```jsx
          <Link href="/about" className="rf-btn rf-btn--secondary mt-6">
            The team and the engines
          </Link>
```

---

## 7. `components/home/Evidence.tsx`

The operator has already reframed the heading to lead with the count. Three further changes: the intro paragraph, a new competitive-observation block, and one tightened closing sentence.

### 7.1 The intro paragraph

**FIND** (lines 107–112)

```
          <p className="text-body mt-5 m-0 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
            We run search and AI search programmes for {CASE_STUDY_COUNT} named clients across{' '}
            {NICHE_COUNT} sectors. Every engagement is scoped against a measured baseline and a
            target, and both are on the page. Below that, the published research this work is built
            on, cited so you can check it rather than take it from us.
          </p>
```

**REPLACE**

```
          <p className="text-body mt-5 m-0 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
            We run search and AI search programmes for {CASE_STUDY_COUNT} named clients across{' '}
            {NICHE_COUNT} sectors, and every one of them is published with the client named, the
            starting position written down and the numbers labelled. Alongside them sit four B2B
            engagements in managed IT and cloud, cybersecurity and B2B SaaS, delivered white-label
            under signed NDAs. We can take you through the scope and the method on those. We cannot
            name the client, and we would rather tell you that than pretend the work does not exist.
          </p>
          <p className="text-body mt-4 m-0 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
            Below, the published research this work is built on, cited so you can check it rather
            than take it from us.
          </p>
```

### 7.2 NEW block: what we found when we went looking for a comparison

Insert after the two `SOURCES` cards and before the "Dated observations, not a state" block. This is the section that earns the operator's superlative without printing it.

Sanctioned by `CLAUDE.md` §1, which records the finding and says explicitly that it is the claim to lead with, because a reader can check it on the day they read it. **No competitor is named**, no blocklisted figure is repeated, and no rebuttal is phrased so as to imply we measured anyone's results.

```jsx
        <ScrollReveal stagger={3} className="mt-12 pt-8" style={{ borderTop: '1px solid var(--s-rule)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <h3 className="text-h3 font-sans m-0 lg:col-span-5 font-semibold">
              We went looking for someone else’s dated client result.
            </h3>
            <div className="lg:col-span-7">
              <p className="text-body m-0 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
                Across three research passes in September 2026 we opened seven vertical rankings of
                the best AI search agencies, covering legal, professional services, construction,
                remodeling, aerospace and industrial. The publisher placed itself first in all
                seven. Not one entry on any of them, including each publisher’s own, carried a
                client result with a date and a method attached.
              </p>
              <p className="text-body mt-4 m-0 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
                We are not going to name them, and we are not going to repeat their numbers. Run the
                search yourself and open the first three. It takes about four minutes and it is the
                single most useful thing you can do before you hire anyone in this category,
                including us.
              </p>
            </div>
          </div>
        </ScrollReveal>
```

Stagger indices on the blocks below this one shift by one. Mira's problem, flagged here so it is not a surprise.

### 7.3 The closing note under the featured card

**FIND** (lines 236–240)

```
            <p className="text-meta mt-4 m-0 max-w-[72ch]" style={{ color: 'var(--s-text-faint)' }}>
              These figures are the targets the engagement is scoped against, derived from category
              benchmarks. They are not reported results. They are relabelled the moment client
              reporting is reconciled against them, and not before.
            </p>
```

**REPLACE**

```
            <p className="text-meta mt-4 m-0 max-w-[72ch]" style={{ color: 'var(--s-text-faint)' }}>
              These figures are the targets the engagement is scoped against, derived from the
              published category benchmarks cited on the record. They are relabelled the moment
              client reporting reconciles against them, and not before. Nothing on this site is
              called a result until it is one, and that rule is enforced in the code rather than in
              an editor’s memory.
            </p>
```

The removed sentence "They are not reported results" is redundant against the new final clause, which makes the same point as a standard we hold rather than as a disclaimer we are obliged to print. `caseStudyEvidence()` is the enforcement and saying so is a fact about the build, not a boast.

### 7.4 A link to the library

The homepage now leads with a 45-record library and does not link to it. Add under the featured card, beside the existing methodology link, or as its own row:

```jsx
          <Link href="/case-studies" className="rf-btn rf-btn--secondary mt-6">
            All 45 records
          </Link>
```

Interpolate the count.

---

## 8. `components/home/Snapshot.tsx`, operator ask #2

The section currently describes the snapshot as if it were produced by a process with no person in it, and a build comment in the file says no delivery SLA is confirmed. Both are now out of date. `CLAUDE.md` §2 records the operator's decision that the audit is form-first and human-delivered with no automated half, and `app/free-ai-audit/page.tsx` already ships the description "A human-reviewed report ... delivered within 48 hours". The homepage is the page that is behind.

### 8.1 Heading and lead

**FIND** (lines 43–52)

```jsx
              <Eyebrow accent>The free snapshot</Eyebrow>
              <h2 className="text-h2 font-sans m-0 mt-4 max-w-[16ch] font-semibold">
                <MaskReveal>Start with the snapshot.</MaskReveal>
              </h2>
              <p className="text-body mt-5 m-0 max-w-[56ch]" style={{ color: 'var(--s-text-muted)' }}>
                It is a small version of the first two weeks of the engagement. We build a prompt
                set from your buyers’ questions, run a sample of it across the assistants, crawl
                your site for the technical and entity signals that feed those answers, and send you
                the result.
              </p>
```

**REPLACE**

```jsx
              <Eyebrow accent>The free snapshot</Eyebrow>
              <h2 className="text-h2 font-sans m-0 mt-4 max-w-[18ch] font-semibold">
                <MaskReveal>A person reads your site.</MaskReveal>
                <br />
                <MaskReveal delay={0.08}>Not a script.</MaskReveal>
              </h2>
              <p className="text-body mt-5 m-0 max-w-[56ch]" style={{ color: 'var(--s-text-muted)' }}>
                Fill in four fields and someone on our team picks it up. They build a prompt set
                from your buyers’ questions, run a sample of it across the assistants, crawl your
                site for the technical and entity signals that feed those answers, and write up what
                they found. You have it within 48 hours.
              </p>
              <p className="text-body mt-4 m-0 max-w-[56ch]" style={{ color: 'var(--s-text-muted)' }}>
                It is a small version of the first two weeks of the engagement, and it is the same
                people who would run the engagement. There is no automated tier and no instant
                score, because an instant score is a lookup and a lookup is not worth reading.
              </p>
```

### 8.2 The steps

**FIND** (lines 25–30)

```ts
const STEPS = [
  'You tell us the site and the buyers you sell to.',
  'We build a prompt set from the questions those buyers actually ask.',
  'We run a sample of it across the assistants and crawl your site for the entity and technical signals that feed those answers.',
  'You get the prompts, what each platform returned, the date we ran it, and the two or three things we would do first.',
];
```

**REPLACE**

```ts
const STEPS = [
  'You fill in the form. Four fields: your site, your sector, the buyers you sell to, and what you want to know.',
  'A person on our team reads it and builds a prompt set from the questions those buyers actually ask. Not a template with your name substituted into it.',
  'We run a sample of that set across ChatGPT, Perplexity, Gemini, Claude and Google AI, and crawl your site for the entity and technical signals that feed those answers.',
  'Within 48 hours you get the prompts, what each platform returned, the date we ran it, and the two or three things we would do first.',
];
```

`How it is produced` stays as the column heading. It now means something.

### 8.3 The second column

**FIND** (lines 89–102)

```jsx
              <h3
                className="text-h4 font-sans m-0 pb-4 font-semibold"
                style={{ borderBottom: '1px solid var(--s-rule)' }}
              >
                What it is not
              </h3>
              <p className="text-body mt-5 m-0" style={{ color: 'var(--s-text-muted)' }}>
                A sample of prompts is a sample. Different prompts, a different day, or a different
                account can produce a different answer.
              </p>
              <p className="text-body mt-4 m-0" style={{ color: 'var(--s-text-muted)' }}>
                The snapshot tells you what we observed on one date. It does not tell you your
                permanent position, and any agency that says otherwise is guessing.
              </p>
```

**REPLACE**

```jsx
              <h3
                className="text-h4 font-sans m-0 pb-4 font-semibold"
                style={{ borderBottom: '1px solid var(--s-rule)' }}
              >
                What a sample can and cannot tell you
              </h3>
              <p className="text-body mt-5 m-0" style={{ color: 'var(--s-text-muted)' }}>
                It tells you what we observed, on which platforms, from which prompts, on which
                date. Every one of those four is written on the report, which means you can hand it
                to someone else and they can re-run it.
              </p>
              <p className="text-body mt-4 m-0" style={{ color: 'var(--s-text-muted)' }}>
                It does not tell you your permanent position, because there is no such thing. Ask
                the same question twice and you can get two answers. Any agency that hands you a
                single AI visibility score with no date on it is guessing, and charging you for the
                guess.
              </p>
```

Same facts, told as a standard rather than as a caveat. That is the whole brief for this rewrite in one block.

### 8.4 Secondary CTA label

**FIND** (line 58) `What it covers, and what it does not`
**REPLACE** `See a sample report`

Only if a sample exists at `/free-ai-audit#scope`. **`[NEEDS DATA: a redacted sample snapshot to link to. If there is none, keep the current label and link, which is honest and resolves.]`** Do not ship a link to a sample that does not exist. A dead promise at the conversion point costs more than a dull label.

---

## 9. `components/home/Fit.tsx`

Two additions and one list correction. The H2 stays: a firm that turns work away is a firm with demand, and that reads as confidence, not apology.

### 9.1 The lead

**FIND** (lines 70–72)

```
            Than bill you for six months of the wrong thing.
```

**REPLACE**

```
            Than bill you for six months of the wrong thing. Retainers run $3,000 to $20,000 a
            month, set by scope: locations covered, prompts tracked, assets produced. Paid search is
            priced separately.
```

Publishing the band is required by `docs/icp-positioning.md` rule 3, which is operator-locked and outranks `CLAUDE.md`. **Conflict to resolve before this ships:** `CLAUDE.md` §5 states `/pricing` carries "no published prices, Request pricing". If the homepage publishes the band and `/pricing` does not, the two pages disagree. Recommendation: publish the band on both, because hidden pricing is `CLAUDE.md` §11 territory and a $3,000 floor is the most efficient qualifier on the site. **Operator decision, not mine.** See §12.

### 9.2 `FITS`

**FIND** (lines 17–23)

```ts
const FITS = [
  'You sell a considered purchase with a sales cycle measured in weeks, not minutes',
  'Referrals have carried your growth and you want a second channel',
  'Someone at your firm can approve and publish website changes',
  'You have people who are willing to be named and quoted publicly',
  'You can commit to three months before judging the work',
];
```

**REPLACE**

```ts
const FITS = [
  'You are a B2B firm doing $3M or more, selling a considered purchase with a sales cycle measured in weeks',
  'You want AI search, classic SEO or paid search. Any one of the three is enough to start',
  'Referrals have carried your growth and you want a second channel',
  'Someone at your firm can approve and publish website changes',
  'You have people who are willing to be named and quoted publicly',
  'You can commit to three months before judging the work',
];
```

The second row matters commercially. `CLAUDE.md` §2: "Do not write copy that requires a prospect to want AI search before we will talk to them." The current page does exactly that, and it is turning away every SEO-only and PPC-only lead that reaches it.

### 9.3 `DOES_NOT_FIT`

No change. All five are about whether the work can succeed rather than about who the prospect is, which is the right test, and they match the disqualifier list in `CLAUDE.md` §2 exactly.

### 9.4 One link

```jsx
          <Link href="/pricing" className="rf-btn rf-btn--secondary mt-10">
            How pricing works
          </Link>
```

Conditional on §9.1 being resolved.

---

## 10. `components/home/Faqs.tsx`

`HOME_FAQS` feeds `faqSchema()` and the rendered page from one array, so every edit below changes the JSON-LD too. That is the point. **The H2 count must move from six to eight.**

### 10.1 Heading

**FIND** (line 62) `<MaskReveal>Six honest answers.</MaskReveal>`
**REPLACE** `<MaskReveal>Eight honest answers.</MaskReveal>`

Better still, Mira: interpolate `HOME_FAQS.length`. A hand-typed count next to a mapped array is a defect waiting for the next edit.

### 10.2 Q1, guarantees

**FIND**

```
    a: 'No, and no one can. We do not own or control these systems, their retrieval changes without notice, and the same prompt can return different answers on different days. What we commit to is the work, a measurement instrument you can inspect, and a dated record of what changed.',
```

**REPLACE**

```
    a: 'No, and no one can. Nobody owns these systems, their retrieval changes without notice, and the same prompt can return different answers on different days. What we commit to is the work, a measurement instrument you can inspect, and a dated record of what changed. If a competing proposal contains a guaranteed citation or a guaranteed date, that is the most useful thing in it, because it tells you what else in the document is invented.',
```

### 10.3 Q3, proof. The apology that has to go

This is the weakest answer on the site. It opens "Usually yes, with one limit we state up front", which puts a hedge in front of a 45-record library. Full replacement.

**FIND**

```
    q: 'Can you show me results from a firm like mine?',
    a: 'Usually yes, with one limit we state up front. In the B2B areas closest to most of our buyers, managed IT and cloud, cybersecurity, and B2B SaaS in part, every engagement was delivered white-label under signed NDAs. We can walk you through the scope, the method and what we changed, but we cannot name the client or arrange a reference call on that work. Where we have not worked in your exact vertical we say so, rather than stretching an adjacent case to fit, because the standards vocabulary and the buying committee change between verticals and a case that does not transfer is worse than no case. Either way you get a snapshot of your own situation, with your prompts and your competitors, before you pay anything.',
```

**REPLACE**

```
    q: 'Can you show me results from a firm like mine?',
    a: 'We publish 45 client programmes with the client named, the starting position written down and every figure labelled: 19 HVAC, 20 dental and 6 commercial insurance. Our B2B engagements, in managed IT and cloud, cybersecurity and B2B SaaS, were delivered white-label under signed NDAs, so we can take you through the scope, the method and what we changed, and we cannot name the client or arrange a reference call on that work. Where we have not worked in your exact vertical we say so rather than stretching an adjacent case to fit, because the standards vocabulary and the buying committee change between verticals and a case that does not transfer is worse than no case. Either way you get a snapshot of your own situation, with your prompts and your competitors, before you pay anything.',
```

### 10.4 NEW Q, the differentiator

Insert as the second entry, directly after the guarantee question. This is the most citable answer on the page and it is currently missing.

```
  {
    q: 'What makes you different from the other AI search agencies?',
    a: 'Every number we publish carries a label and a date. Our 45 client programmes name the client, state the measured starting position, and mark each KPI as a baseline, a target or a reconciled result, enforced in code rather than by an editor. When we sampled seven vertical rankings of AI search agencies across three research passes in September 2026, the publisher had placed itself first in all seven and not one entry carried a client result with a date and a method attached. We also run the work on three engines we built: Scriblr for AI citation and GEO tracking, LinkersPro for authority and earned mentions, and M.A.R.S. for lead routing and booking attribution. Scriblr stores the raw answer, the cited URLs and the model version, so every metric we report re-derives from a saved answer with a date on it.',
  },
```

### 10.5 NEW Q, pricing

Insert after "What do you need from us to start?". It is the top unanswered objection on the page and it is also the cheapest qualifier we have.

```
  {
    q: 'What does this cost?',
    a: 'Retainers run $3,000 to $20,000 a month. The tier is set by scope, which means locations covered, prompts tracked and assets produced, not by hours. Paid search is priced separately as a percentage of ad spend against a monthly minimum. We scope after the snapshot, because scoping before it is guessing. There is no plan below $3,000, and if that is the wrong number for you it is better that we both know now.',
  },
```

Conditional on §9.1. If the operator keeps prices off the site, cut this entry and revert the H2 to "Seven honest answers."

### 10.6 Q4, timing

**FIND**

```
    a: 'The technical and entity work shows up in weeks. The off-site evidence layer, which is the part that drives assistant citations, is slower, and we ask for three months before you judge it. Anyone quoting you a date for an AI citation is making it up.',
```

**REPLACE**

```
    a: 'The technical and entity work shows up in weeks. The off-site evidence layer, which is the part that drives assistant citations, is slower, and we ask for three months before you judge it. You will see the same prompt set re-run on a fixed schedule from week one, so you are judging a comparison rather than a feeling. Anyone quoting you a date for an AI citation is making it up.',
```

### 10.7 Q2, Q5, Q6

No change. Q2 already draws the AI SEO and GEO distinction correctly and is the second most citable answer on the page.

---

## 11. `components/home/FinalCta.tsx`

### 11.1 H2

**FIND** (lines 38 to 43). No change. "See what the assistants say about you." is the right last line: it is about the reader, it is the offer, and it asserts nothing about a third-party system's current state.

### 11.2 Body

**FIND** (lines 47–51)

```
            <p className="text-body m-0 max-w-[56ch]" style={{ color: 'var(--s-text-muted)' }}>
              We will run a sample of your buyers’ prompts, crawl your site, and send you what we
              found with the date on it. If the answer is that you are already well positioned, we
              will tell you that too.
            </p>
```

**REPLACE**

```
            <p className="text-body m-0 max-w-[56ch]" style={{ color: 'var(--s-text-muted)' }}>
              Four fields, and a person on our team takes it from there. They build your prompt set,
              run it across the assistants, crawl your site, and send you what they found with the
              date on it, within 48 hours. If the answer is that you are already well positioned, we
              will tell you that too.
            </p>
```

The 48-hour commitment is restored. The build comment at the top of this file says it was removed because no SLA was confirmed by anyone who would stand behind it. It now is: it is the operator's decision in `CLAUDE.md` §2 and it is already published in the `/free-ai-audit` page metadata. **Mira: update that comment when you apply this, or the next person reads it and removes the line again.**

### 11.3 CTAs

No change. "Get your free AI visibility snapshot" and "Rather talk first" are both specific and both resolve.

---

## 12. Carried up

### `[NEEDS DATA]`

- `[NEEDS DATA: the reporting export that fills the actual column on the 45 case studies.]` The single input that upgrades this page. `caseStudyEvidence()` regrades, every card relabels itself, and **not one string in this document has to change.** That is deliberate. Carried from `CLAUDE.md` §1.
- `[NEEDS DATA: a redacted sample snapshot to link to from Snapshot §8.4.]` Until it exists, keep the current label and link.
- `[NEEDS DATA: OpenAI's own programme documentation on advertising in ChatGPT.]` Carried from `CLAUDE.md` §1. Nothing in this document describes paid placement in an assistant as a service we offer, and nothing in it says assistants have no ads. Unblocked for now.

### Decisions for the operator

1. **Publish the $3,000 to $20,000 band, or not.** `docs/icp-positioning.md` rule 3 says the published range is $3,000 to $20,000. `CLAUDE.md` §5 says `/pricing` publishes no prices. The locked file outranks, so §9.1 and §10.5 publish the band. If the operator disagrees, cut both and revert the FAQ count. Either answer is fine. Two pages disagreeing is not.
2. **TIC or professional services as the third depth callout** (§5.3). TIC is the better argument and the documented vacancy. Professional services may be the better sales asset. Operator's call.
3. **Page title and meta description.** `SEO_OVERRIDES['/']` still reads "AI-native B2B Growth Agency | AI Search, Demand & ABM" with a description about demand generation and ABM, which is the retired positioning. `CLAUDE.md` §9 freezes meta for the rebrand, so this document does not touch it. Nadia should own the question of whether that freeze still applies now the positioning has changed twice.
4. **Whether `Standing.tsx` ships as a new section** (§2) or its four cells go inside the hero. Content is identical either way.

### Compliance notes for Ruth

- **No em dashes.** Checked line by line.
- **No banned words.** No "unlock", "supercharge", "leverage", "seamless", "game-changer", "elevate", "cutting-edge", "revolutionize", "in today's digital landscape".
- **No blocklisted figure** from `CLAUDE.md` §1, and no rebuttal phrased so as to imply we measured a competitor's results. §7.2 and §10.4 describe only what we opened and what was absent from it.
- **No bare superlative.** The page never says best, leading, top or number one about Qognition.
- **AI SEO and GEO never blurred.** The four-layer table is unchanged and every new string that names a surface names it correctly: Google AI Overviews and AI Mode for AI SEO; ChatGPT, Perplexity, Gemini, Claude and Copilot for GEO.
- **Rule 2, the buyer is always the B2B firm.** Every "their buyer" line in §5.3 describes the client's buyer and is labelled as such. The 21 sector names are the firms we sell to.
- **Rule 3.** No number below $3,000 appears anywhere.
- **No target presented as a result.** The phrase "we increased X by Y%" does not appear, in any form, in any section.
- **No new statistic.** Every figure in this document is counted from a file in this repo (`CASE_STUDIES.length`, `icpIndustryCards().length`, the taxonomy counts) or is a dated internal research observation already recorded in `CLAUDE.md` §1.
- **`no-slop.md`:** no icon cards, no decorative gradients added, no vague button labels. Every CTA names the thing it gets you.

### Next

Ruth (`brand-guard`) reviews this document before Mira touches a file. Specific asks for Ruth: the H1 in §1.1, the competitive observation in §7.2, the pricing band in §9.1, and the TIC occupancy claim in §5.3. Those are the four places where confident and unsupportable are closest together.
