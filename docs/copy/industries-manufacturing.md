# `/industries/manufacturing` : the one worked vertical example

Owner: Theo (content). Date: 2026-09-28. Branch: `b2b-ai-search`.
Status: **draft. Not approved copy until Ruth (`brand-guard`) has run.**

Target files: `app/industries/[industry]/page.tsx` (template strings) and the `manufacturing` entry in
`data/industries.ts`, lines 158 to 178.
Brief: `docs/copy/00-brief-v2-b2b-universe.md`. Substance: `docs/research/b2b-vertical-substance.md`
§3, by Iris, 2026-09-28.

**This is the worked example the operator asked for, and it is deliberately the hardest one.**
Manufacturing is Tier S demand, it has a live indexable URL with six live child pages, a named
competitor already publishing AEO content into it, and **no Qognition delivery history whatsoever**.
`b2b-vertical-substance.md` §2.3 is explicit: the HVAC records one directory away are HVAC
*contracting*, a local services business, not HVAC equipment manufacturing, and blurring them is the
`CLAUDE.md` §11 breach this vertical is most at risk of.

So this page has an empty proof block and has to carry itself on original substance. If the pattern
holds here it holds in the eleven verticals where there is more to work with. The easier variant, for
the verticals where delivery exists, is in §9.

---

## 0. What is frozen, and the two collisions

**Frozen and not touched:** the URL, the internal link graph, the `Service` and `BreadcrumbList`
JSON-LD shape, the sidebar links, the external booking URL.

**Collision 1. The H1 is the meta title.** `generateMetadata` on line 35 builds the title as
`` `${page.name} Digital Marketing | Qognition` `` and the template renders the same `page.name` as
the visible H1 on line 97. Changing the H1 changes a live meta title. **So the H1 stays
`Manufacturing & Industrial`.** It is not the headline I would write. It is also not worth a meta
change to fix.

**Collision 2. The lead paragraph is the meta description.** Line 36 uses `page.description` as the
meta description and line 99 renders the same string as the visible lead, inside an accent border.
The current string is:

> Bridging the gap between legacy industrial strength and modern digital discovery.

That sentence is the worst thing on the page. It is agency register, it says nothing a machine shop
owner would recognise, and "bridging the gap" is exactly the sentence `standards/anti-slop.md`
describes as swappable between competitors. **I have not changed it, because it is a live meta
description.**

The clean fix is a separate optional `lead` field on the `Industry` type, rendered at line 99 when
present and falling back to `description`. Then the meta description is untouched and the page reads
to a human. That is a one-line type change and a one-line template change, it is Kyle's call, and it
fixes eleven pages rather than one. **If that field exists, the manufacturing `lead` is:**

> Your buyer is a design engineer who will never call you. By the time an RFQ arrives, the shortlist
> was set by someone checking whether your tolerance range, your certification scope and your lead
> time were findable as facts.

---

## 1. The three intro cards

Template lines 103 to 106, currently hard-coded and rendered on all eleven industry pages. Two of the
three describe internal linking and static rendering to a buyer who does not care, and the first is a
sentence assembled from `industry.name`.

**Recommended change:** the template reads an optional per-industry `intro: readonly string[]` and
falls back to the current array. Same Kyle decision as §0, same one-line shape.

**Manufacturing `intro`:**

**Card 1**

> Technical buyers finish about 62% of the buying journey before they contact any vendor, and about
> 66% for engineers aged 35 and under. Source: the 2026 State of Marketing to Engineers report from
> GlobalSpec, TREW Marketing and Elektor.

**Card 2**

> 69% of technical buyers use generative AI during purchasing decisions and 75% notice AI-generated
> summaries. The same report has them rating AI trustworthiness at 4.7 out of 10, and 69% read on into
> the classic results anyway.

**Card 3**

> Which makes this a shortlist channel, not a traffic channel. We measure mention and citation share
> on a fixed prompt panel, with the platform and the date on every observation, because referral
> sessions to an industrial domain will be small whether the work is succeeding or not.

The three cards are one argument in three steps: the decision happens early, AI is in it but is not
trusted, therefore measure the shortlist and not the traffic. Card 3 is where the product is, and it
is the honest version, which is the persuasive one.

`[NEEDS DATA: the report's sample size and field dates. The summary page does not state n. If Ruth
judges that fatal, cards 1 and 2 come out together and card 3 stands alone, because card 3 does not
depend on them.]`

---

## 2. The sub-niche section

Template lines 118 to 121.

H2, current: `Specialized Verticals`. Replace with:

```
Sub-niches on this branch
```

Body line, current: `Select a specific niche to see tailored strategies:`. Replace with:

```
Six pages sit under this one. Each is written to a different buying committee.
```

Both are template-level strings and change on all eleven pages. The replacements are true on all
eleven, which is the test.

**Sub-industry display names are not changed**, because they are the anchor text of live internal
links. One observation for the operator: `Engineering Units` is not a term anyone in the industry
uses, and `B2B Manufacturing` is a category, not a niche. Both are display names rather than slugs, so
they can be corrected without touching a URL, when someone decides the anchor text is fair game.

---

## 3. `painPoints`: the diagnosis

Current array, line 170:

```ts
painPoints: ['Complex product specs', 'Niche audiences', 'Legacy sales channels'],
```

Three noun phrases, none of which is a problem anybody has. The template renders each one under a
red "THE PROBLEM" label in a full-width box, with body-text treatment, so the slot supports real
sentences and is currently wasting them.

**Replacement:**

```ts
painPoints: [
  'You are eliminated at specification, not at quote. An engineer checks whether you can hold the tolerance, in the material, to the certification scope their customer requires, and whether you can supply in the window. If any of those four facts is not findable, you are out of the set before anyone at your company knows a search happened. The RFQs you do receive are the ones where price is the only variable left, which is why they feel like a race to the bottom.',
  'Your certifications are listed, not scoped. A quality manager does not want to know that you are ISO 9001 certified. They want to know whether the certificate covers the process and the site in question, because that is what decides whether qualifying you takes six weeks or nine months. Almost every manufacturer publishes capability. Almost none publishes what qualification with them actually involves, and that is the step where procurement decides whether the risk is worth taking.',
  'Nobody can forward your website. Under an approved vendor list, an engineer who wants to introduce a new supplier has to justify it internally. EETech surveyed 750 engineers in 2026, found 84% are decision-makers or strong influencers, and identified a distinct procurement handoff problem where a championed product is blocked by the AVL process. The study also found engineers can often introduce a new vendor when they are given proper justification materials. That document is the highest-value asset on an industrial site and it is the one nobody writes.',
]
```

Three problems, in the order they happen: eliminated early, unqualifiable, unforwardable. The third
is the commercially useful one, because it is the only one with an obvious next step that we sell.

Sources named in prose, because these strings render as plain text with no markdown. EETech Buyer
Journey Study 2026, `eetech.com/buyer-journey-study-2026`, accessed 2026-09-28 by Iris.

---

## 4. `solutions`: the work

Current array, line 171:

```ts
solutions: ['Technical Catalog SEO', 'LinkedIn Sales Nav', 'Digital Catalogs'],
```

The template renders each as a single line beside a checkmark, so these stay short. Six replaces
three; the container is a `space-y-3` stack and takes any length.

```ts
solutions: [
  'Publish the four elimination facts as facts: process and tolerance range, materials by designation, certification scope by site, and real lead time by quantity band',
  'Write the supplier qualification page nobody writes: what your audit, first article and PPAP process actually involves, and how long each step takes',
  'Build the internal justification document an engineer can forward to procurement without rewriting it',
  'Reconcile your entity across your site, your schema, your Business Profile, your association and trade directory entries, and your engineers’ public profiles',
  'Put your engineers’ names on technical commentary, because 66% of technical buyers rate vendor engineering experts as very or extremely trustworthy authors',
  'Track a fixed prompt set across ChatGPT, Perplexity, Gemini, Claude and Google AI, rerun on a schedule, with the platform and the date on every observation',
]
```

Note what is absent. No promise of RFQ volume, no promise of an AI citation, no number describing a
result. `CLAUDE.md` §4.

---

## 5. `faqs`: the citation asset

This is the most valuable block on the page. `industry.faqs` renders under the "Expert Insights" H2
**and** feeds `faqSchema()` into the page's JSON-LD from the same strings, so every answer is both
read by a buyer and available to a retrieval system as a self-contained, attributable statement.

Current: one generic question plus two `COMMON_FAQS` shared across every industry, one of which
describes "a proprietary stack of LLMs for semantic entity mapping and predictive trend modeling".
That sentence is unverifiable, it is written in the register `standards/anti-slop.md` bans, and it is
identical on eleven pages, which makes it worthless for retrieval.

**Replacement. Seven entries. Answers are 60 to 120 words, answer-first, with the date and the
publisher named in prose because these strings render without markup.**

```ts
faqs: [
  {
    question: 'Why does AI search matter to a manufacturer when nobody buys a machined part from ChatGPT?',
    answer: 'Because the shortlist forms before the enquiry. The 2026 State of Marketing to Engineers report from GlobalSpec, TREW Marketing and Elektor found that 69% of technical buyers use generative AI during purchasing decisions and 75% notice AI-generated summaries, while 62% of the buying journey is complete before any vendor is contacted. The same report rates AI trustworthiness at 4.7 out of 10 and finds 69% read on into the classic results anyway. So this is not a traffic channel. It decides which two or three names an engineer then researches properly.',
  },
  {
    question: 'What does a device OEM ask a contract manufacturer for now that QSIT is gone?',
    answer: 'The FDA’s Quality Management System Regulation took effect on 2 February 2026. It amends 21 CFR Part 820 and incorporates ISO 13485:2016 by reference together with clause 3 of ISO 9000:2015. From that date the FDA discontinued the Quality System Inspection Technique and moved to Compliance Program 7382.850. The practical consequence for a supplier is that management review, quality audits and supplier audit reports are now inspectable, because the exceptions in the old regulation were not carried over. A page that sets out what your supplier-qualification pack contains under that regime answers a question your customer is being asked by their own auditor.',
  },
  {
    question: 'Is CMMC a marketing problem or a compliance problem?',
    answer: 'Both, and the marketing half is being ignored. The 48 CFR CMMC acquisition rule took effect on 10 November 2025 and DoD published the final DFARS rule integrating CMMC into contracts on 10 September 2025, at clause DFARS 252.204-7021, with a phased rollout reported to run about three years. Contractors handling federal contract information or controlled unclassified information must hold the required level as a condition of award. That creates a supplier-selection question with a compliance filter, which is exactly the shape an assistant answers well, and thousands of small suppliers have no page stating where they stand.',
  },
  {
    question: 'We are ISO 9001 certified. Is that enough to say?',
    answer: 'No, and a quality manager will tell you the same thing. What decides a qualification decision is the registered scope of the certificate: which processes it covers and which site. "ISO 9001 certified" without the scope is close to meaningless to the person who has to sign off on adding you. The same applies to AS9100 for aerospace, IATF 16949:2016 for automotive, ISO 13485 for medical, and to Nadcap, which is administered by the Performance Review Institute and covers 24 separate critical process accreditations rather than being one badge.',
  },
  {
    question: 'ISO 9001 was revised in September 2026. Does that change anything for us?',
    answer: 'ISO published ISO 9001:2026 on 16 September 2026, superseding the 2015 edition. Reported changes centre on quality culture and leadership, and on separating risks from opportunities so that beneficial results are pursued rather than only threats managed. We are labelling that as reported rather than observed, because iso.org blocks automated retrieval and we have not read the standard itself. We are also not printing a transition deadline, because the dates in circulation come from certification bodies who sell transition services. Ask your registrar for the deadline that applies to your certificate.',
  },
  {
    question: 'Have you done this for a manufacturer before?',
    answer: 'Not in manufacturing, and we are not going to imply otherwise because a page exists. Where we have delivered is managed IT and cloud, cybersecurity, and B2B SaaS in part, all white-label under signed NDAs, which means we can walk you through scope and method but cannot name a client or arrange a reference call. The standards vocabulary and the buying committee change between verticals, and an adjacent case that does not transfer is worse than no case. What we can do before you commit to anything is run your buyers’ prompts and show you what came back, with the date on it.',
  },
  {
    question: 'Can you guarantee we get recommended when a buyer asks an assistant for suppliers?',
    answer: 'No, and nobody can. We do not own or control these systems, their retrieval changes without notice, and the same prompt can return different answers on different days. Anyone quoting you a date for an AI citation is guessing. What we commit to is the work, a prompt set you build with us and can inspect, and a dated record of what changed. Every number we hand you carries the platform, the prompt set and the date it was observed, so you can rerun it yourself and get the same answer or find out that it moved.',
  },
]
```

**Remove `...COMMON_FAQS` from this entry.** Two identical answers across eleven pages is duplicate
content inside the FAQPage schema and it is the opposite of what this block is for.

**Why these seven.** Questions 2, 3, 4 and 5 each carry entity-specific facts that cannot be produced
by substituting an industry name into a template, which is the `CLAUDE.md` §7 bar for an indexable
page. Question 1 is the Family Q question our buyer actually asks. Questions 6 and 7 are the two
answers a competitor will not write, and they are the reason the other five are believed.

---

## 6. The "Expert Insights" heading

Template line 201. `Expert Insights` over a list of questions is a header that promises and does not
deliver, which `standards/anti-slop.md` bans by name. Replace with:

```
Questions a manufacturer asks before hiring us
```

Template-level, so it renders on all eleven pages. For the general case, use:

```
Questions we get asked before anyone signs anything
```

Operator picks one. Per-industry is better and needs the same optional-field pattern as §0 and §1.

---

## 7. Two data conflicts I am flagging, not fixing

**`relatedServices: ['seo', 'web-development']`.** This drives the "Recommended Services" card grid,
which is internal linking, so it is frozen. It is also wrong: it points a manufacturer at web
development and never at AI search or paid, which is most of what we would sell them.
`['seo', 'ai-seo', 'ppc', 'content']` is the right set.
`[NEEDS DATA: operator decision. Changing it changes internal linking.]`

**The sidebar case study.** Line 54 calls `studiesForTopic()` on the industry name, and the published
library is 20 HVAC contracting records, 20 dental and 10 insurance. Whatever it returns on this page
is either irrelevant or, worse, an HVAC record that a manufacturer reads as HVAC equipment
manufacturing. That is the precise §11 breach `b2b-vertical-substance.md` §2.3 warns about.
`[NEEDS DATA: what studiesForTopic('Manufacturing & Industrial manufacturing') actually returns
today. If it returns an HVAC contracting record, the sidebar block should render nothing on this page
rather than render that. CLAUDE.md §4: omit the section.]`

---

## 8. What must not appear on this page

- Any sentence implying we have worked in manufacturing.
- The HVAC case studies, in any framing.
- The Gorilla 76 figure of "92% of B2B professionals using AI said it shaped their vendor shortlist".
  It carries no source on their page and it contradicts the trust findings we do have.
- The TraceParts 82% and 90% CAD-download figures. Secondary restatement of a 2020-era infographic.
- "IA9100" as a fact. The rename is reported, not confirmed by IAQG or SAE. Write AS9100 and note a
  revision is expected.
- The ISO 9001 transition deadline of 30 September 2029. Certification-body sourcing with a
  commercial interest in urgency.
- Any CFR citation written from memory. ITAR's part range is unverified in the research file.
- Any promise of RFQ volume, ranking, citation or placement.

---

## 9. The variant, for the verticals that do have delivery

This template has an **empty proof block by design**. For IT services, cybersecurity and B2B SaaS in
part, there is reported delivery, and the page gains one block that this page does not have. It goes
between `solutions` and `faqs`, and the publishable shape is fixed by
`b2b-vertical-substance.md` §2.2:

> AI SEO and GEO for an enterprise cloud-security provider in the UAE. One year of content and
> technical work, six months of lead generation, ongoing. Delivered white-label under NDA, so the
> client is not named.

Scope and duration only. No numbers, no sector inference beyond what the engagement was, and the
phrase "white-label under NDA" stays in the sentence, because it explains the anonymity rather than
leaving the reader to assume the client does not exist.

**Do not add that block with a placeholder to any vertical that lacks it.** `CLAUDE.md` §4: omit the
section. That is why this page has no proof block and question 6 in §5 carries the answer instead.

---

## 10. Before `indexable` stays true on this page

`/industries/manufacturing` is already live and in the sitemap through
`lib/industryPublication.ts`, so nothing here publishes a new URL. The §7 bar still applies to the
rewrite, and it is met:

- Answers one buyer question no other indexable page answers: why a manufacturer is eliminated at
  specification rather than at quote.
- Carries more than three entity-specific facts not derivable by substituting a name: the QMSR
  effective date and what it changed, the CMMC clause and rule dates, the ISO 9001:2026 publication
  date with its reported label, Nadcap's 24 accreditations and its administrator, the certification
  scope argument.
- Is far more than 40% unique against its closest sibling, `/industries/industrial-trade`, which
  should be reviewed next because the two overlap and one of them may be a consolidation candidate.
- Cites real evidence, with publishers and dates.
- `[NEEDS DATA: named reviewer and review date. Required by CLAUDE.md §7 and not something I can
  supply. Ruth reviews the copy; the page also needs an owner of record.]`
