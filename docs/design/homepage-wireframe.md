# Homepage wireframe

Owner: Elena (creative). Written 2026-09-28. Route `/`.

Eleven sections, in the order the operator's plan specifies. Copy below is copy on frame: the exact
words, as they will appear, unless marked `[NEEDS DATA]`. All copy is subject to Ruth
(`brand-guard`) before it ships.

---

## Open question the operator must settle before build

**The mandated H1 reads as a guarantee.**

CLAUDE.md §1 sets the H1 as:

> "Your buyers are asking ChatGPT who to hire. We make sure it says you."

CLAUDE.md §4 says:

> **No guarantee.** No promise of rankings, citations, placement in any AI system, or revenue. We do
> not control third-party systems and we do not pretend to.

"We make sure it says you" is a promise of placement in a third-party AI system. These two sections
of the same file contradict each other, and the contradiction sits on the first line of the site, so
it is not something I can quietly resolve. Ruth will stop it.

The wireframe below carries the mandated H1 as written, because CLAUDE.md states it. Two compliant
alternates, either of which keeps the sentence structure and the hook:

- A: "Your buyers are asking ChatGPT who to hire. We find out what it says, then go to work on it."
- B: "Your buyers are asking ChatGPT who to hire. Most firms have never checked the answer."

B is stronger. It keeps the tension, it is verifiable, it makes the free snapshot the obvious next
action rather than an afterthought, and it does not promise an outcome we do not control.

**Operator decision required: keep the mandated H1, or switch to A or B.**

---

## Full page structure

```
┌────────────────────────────────────────────────────────────────────────────┐
│ [ SKIP TO CONTENT ]                                              (focus)   │
├────────────────────────────────────────────────────────────────────────────┤
│ 0  HEADER                                                                  │
│    Qognition        AI SEO  GEO  SEO  Local SEO  Insurance  Pricing        │
│                                                     [ Run the snapshot ]   │
└────────────────────────────────────────────────────────────────────────────┘
```

### 1. Positioning and CTA

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│   AI SEARCH VISIBILITY FOR B2B FIRMS                            [meta,upper]│
│                                                                            │
│   Your buyers are asking ChatGPT                                [display]  │
│   who to hire. We make sure it                                             │
│   says you.                                                                │
│                                                                            │
│   We measure four surfaces: Google search, Google Maps and the      [body] │
│   local pack, Google AI Overviews and AI Mode, and the assistants          │
│   your buyers use. Then we work on all four as one programme.              │
│                                                                            │
│   [ Run the snapshot ]   [ See how we measure ]                            │
│                                                                            │
│   ────────────────────────────────────────────────────────────────────     │
│   PLATFORMS WE MEASURE                                          [meta,upper]│
│   ChatGPT · Perplexity · Gemini · Claude · Copilot · Google AI Overviews    │
│   · Google AI Mode · Google Search · Google Maps · Bing Places             │
│                                                                            │
│   Platform names identify discovery surfaces. They are not customer   [meta]│
│   logos, certifications or endorsements.                                   │
└────────────────────────────────────────────────────────────────────────────┘
```

- H1 `text-display`, `max-w-[18ch]`, three lines at desktop, `--ink-900`.
- Subhead `text-body`, `--ink-500`, `max-w-measure`. It names the platforms, which is the device
  taken from the reference: it converts "AI search" from a slogan into something checkable.
- Primary `Run the snapshot` links to `/audit`. Secondary `See how we measure` links to
  `/audit#method`, not to case studies, because there are none to see.
- No hero image, no aurora, no gradient, no floating card. The first screen is type, two buttons and
  a platform list.
- Mobile: single column, display type at the 44px `clamp()` floor, CTAs stacked full width, platform
  list wraps to three lines.

### 2. Evidence

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│                    THIS SECTION IS NOT RENDERED                            │
│                                                                            │
│  `EvidenceStrip` returns null. There are no client logos with written       │
│  permission and no reconciled results to show. Per CLAUDE.md §4, the        │
│  section is omitted rather than filled.                                     │
│                                                                            │
│  [NEEDS DATA: client logos with written permission, or one reconciled       │
│   case study, or one named reference.]                                      │
│                                                                            │
│  When it exists: logos at a uniform 28px optical height on white, 1px       │
│  hairline separators, plus one text-meta line stating how many clients      │
│  and since when. No "trusted by", no counts without logos, no greyscale.    │
└────────────────────────────────────────────────────────────────────────────┘
```

Until then, section 3 follows section 1 directly. The page must read correctly with this section
absent, which it does: the hero states the position and the next section states the problem.

### 3. The buying problem

```
┌────────────────────────────────────────────────────────────────────────────┐
│  THE PROBLEM                                                    [meta,upper]│
│                                                                            │
│  You rank in Maps, but ChatGPT names your competitor.               [h2]   │
│                                                                            │
│  ┌──────────────────────┬──────────────────────┬──────────────────────┐    │
│  │ WHAT YOU HAVE  [meta]│ WHAT CHANGED   [meta]│ WHAT IT COSTS  [meta]│    │
│  │                      │                      │                      │    │
│  │ Years of SEO.  [h3]  │ Your buyer   [h3]    │ You are not   [h3]   │    │
│  │ A Business           │ asks an              │ on the                │    │
│  │ Profile with         │ assistant            │ shortlist             │    │
│  │ reviews. A site      │ first.               │ before the            │    │
│  │ that ranks.          │                      │ shortlist exists.     │    │
│  │                      │                      │                      │    │
│  │ It works when  [body]│ The answer     [body]│ A vendor named [body]│    │
│  │ someone searches.    │ names three or       │ in the answer is     │    │
│  │ It is doing its      │ four firms and       │ in the conversation. │    │
│  │ job.                 │ cites a handful      │ A firm that is not   │    │
│  │                      │ of sources. It is    │ never gets the       │    │
│  │                      │ assembled from       │ chance to be         │    │
│  │                      │ what is indexed,     │ compared.            │    │
│  │                      │ but it is not the    │                      │    │
│  │                      │ same list.           │                      │    │
│  └──────────────────────┴──────────────────────┴──────────────────────┘    │
│                                                                            │
│  Most firms have never checked what the answer says about them.     [body] │
│  That is what the snapshot is for.                                         │
└────────────────────────────────────────────────────────────────────────────┘
```

- No statistic here. Every "62% of B2B buyers now start with AI" line on the internet traces back to
  a vendor survey with no method. If the operator supplies a source with a date and a sample, one
  sentence can carry it. `[NEEDS DATA: a citable, dated source for AI-assisted B2B vendor
  discovery, or this section stays argument-only.]` Argument-only is fine. It is the buyer's own
  experience.
- Mobile: three blocks stack, 32px gaps, labels stay.

### 4. The layers

```
┌────────────────────────────────────────────────────────────────────────────┐
│  THE FOUR LAYERS                                                [meta,upper]│
│                                                                            │
│  Four surfaces, one programme.                                      [h2]   │
│                                                                            │
│  The answer surfaces are assembled from the indexed ones. That is   [body] │
│  why all four are in every retainer and none is sold on its own.           │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    FourLayersDiagram                                 │  │
│  │              see docs/design/four-layers-diagram.md                  │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐                 │
│  │ 01          │ 02          │ 03          │ 04          │  LayerCard ×4   │
│  │ AI SEO      │ GEO         │ SEO         │ LOCAL SEO   │                 │
│  │ Google AI   │ ChatGPT,    │ Google      │ Maps, local │                 │
│  │ Overviews   │ Perplexity, │ search      │ pack, Bing  │                 │
│  │ and AI Mode │ Gemini,     │ results     │ Places,     │                 │
│  │             │ Claude,     │             │ Business    │                 │
│  │             │ Copilot     │             │ Profile,    │                 │
│  │             │             │             │ reviews     │                 │
│  │ [link →]    │ [link →]    │ [link →]    │ [link →]    │                 │
│  └─────────────┴─────────────┴─────────────┴─────────────┘                 │
└────────────────────────────────────────────────────────────────────────────┘
```

- Card order is the CLAUDE.md §1 emphasis order: AI SEO and GEO first, SEO and Local SEO as the
  supporting layers. The diagram above shows the dependency running the other way, which is the
  point: the supporting layers come first mechanically and second commercially.
- Mobile: diagram stacks vertically, cards go to a single column in the same order.

### 5. How the programme works

```
┌────────────────────────────────────────────────────────────────────────────┐
│  HOW IT RUNS                                                    [meta,upper]│
│                                                                            │
│  What the first ninety days look like.                              [h2]   │
│                                                                            │
│  ──────────────────      ──────────────────      ──────────────────        │
│  01                      02                      03                        │
│  Measure           [h3]  Fix the inputs    [h3]  Work the answer   [h3]    │
│                                                  surfaces                  │
│                                                                            │
│  We run the full   [body] Technical, on-page,    Entity records,           │
│  prompt set across  │     local records,         source pages,             │
│  all four surfaces  │     reviews, the things    the assets an             │
│  and record what    │     the answer layers      answer draws on,          │
│  each one returns.  │     draw from.             and monitoring that       │
│                     │                            shows what changed.       │
│                                                                            │
│  You get: the      [meta] You get: a prioritised  You get: a monthly       │
│  prompt set, the          list of fixes with     re-run of the same        │
│  findings and the         owners and dates.      prompt set, side by       │
│  screenshots.                                    side with the last one.   │
│                                                                            │
│  We do not promise rankings, citations or placement in any AI       [meta] │
│  system. We do not control them. We report what moved and what did not.    │
└────────────────────────────────────────────────────────────────────────────┘
```

`[NEEDS DATA: the real cadence and the real first-90-days deliverables.]` The three phases above are
derived from CLAUDE.md §1 scope and are structurally right, but the deliverable lines are promises
and the operator has to confirm each one.

Mobile: three steps stack with a left rule instead of a top rule, 32px gaps.

### 6. Industries

```
┌────────────────────────────────────────────────────────────────────────────┐
│  WHERE WE PROVE IT                                              [meta,upper]│
│                                                                            │
│  Every AI search agency proves in B2B SaaS. We do not.              [h2]   │
│                                                                            │
│  ┌───────────────────────────────────────┬──────────────────────────────┐  │
│  │ COMMERCIAL AND SPECIALTY      [meta]  │ PROFESSIONAL SERVICES [meta] │  │
│  │ INSURANCE                             │                              │  │
│  │                                 [h3]  │ CPA and tax advisory,  [h3]  │  │
│  │ Agencies, MGAs and wholesale          │ corporate law boutiques,     │  │
│  │ brokers with 5 to 50 producers.       │ management advisory.         │  │
│  │                                       │                              │  │
│  │ Your buyer is a risk manager,  [body] │ [link →]                     │  │
│  │ a CFO or an operations lead,          ├──────────────────────────────┤  │
│  │ and they are asking an assistant      │ IT SERVICES           [meta] │  │
│  │ which broker handles their class      │                              │  │
│  │ of business.                          │ MSPs, MSSPs,           [h3]  │  │
│  │                                       │ cybersecurity                │  │
│  │ [ See the insurance page → ]          │ consultancies, cloud         │  │
│  │                                       │ partners.                    │  │
│  │                                       │ [link →]                     │  │
│  └───────────────────────────────────────┴──────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────┘
```

- The H2 is a competitive claim about competitors' published case studies, which is checkable and
  therefore allowed. It becomes false the day a competitor publishes outside SaaS.
  `[Ruth: confirm this claim is checkable and dated at time of writing, or soften to "Most AI search
  agencies prove in B2B SaaS."]`
- Insurance is visually twice the size of the other two. The wedge should look like a wedge.
- A vertical with no page is not listed here.
- Mobile: insurance card first and full width, the other two stacked below.

### 7. Audit preview

```
┌────────────────────────────────────────────────────────────────────────────┐
│  THE SNAPSHOT                                                   [meta,upper]│
│                                                                            │
│  You against three competitors, on four surfaces, with the          [h2]   │
│  prompts we used.                                                          │
│                                                                            │
│  This is the form the result takes. It is empty because we do not   [body] │
│  publish a client's snapshot without written permission, and we do         │
│  not have one to publish yet. Yours arrives filled in.                     │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │           SnapshotResult variant="specimen"                          │  │
│  │           see docs/design/snapshot-result.md                         │  │
│  │                                                                      │  │
│  │  ┌────────────┬──────────┬──────────┬──────────┬──────────┐          │  │
│  │  │            │ MAP PACK │ ORGANIC  │ GOOGLE   │ ASSIST-  │          │  │
│  │  │            │ Google   │ TOP 10   │ AI OVER- │ ANTS     │          │  │
│  │  │            │ Maps     │ Google   │ VIEW     │ ChatGPT, │          │  │
│  │  │            │          │          │          │ Perplex. │          │  │
│  │  ├────────────┼──────────┼──────────┼──────────┼──────────┤          │  │
│  │  ┃ Your brand │ ▨        │ ▨        │ ▨        │ ▨        │          │  │
│  │  │ Competitor1│ ▨        │ ▨        │ ▨        │ ▨        │          │  │
│  │  │ Competitor2│ ▨        │ ▨        │ ▨        │ ▨        │          │  │
│  │  │ Competitor3│ ▨        │ ▨        │ ▨        │ ▨        │          │  │
│  │  └────────────┴──────────┴──────────┴──────────┴──────────┘          │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  Every finding links to the verbatim prompt, the platform, the date   [body]│
│  and a screenshot. Where an answer named someone else, we list the         │
│  domains it cited instead of you.                                          │
│                                                                            │
│  [ Run the snapshot ]                                                      │
└────────────────────────────────────────────────────────────────────────────┘
```

Mobile: the specimen renders as the four per-surface blocks from the snapshot spec §4, not as a
scrolling table.

### 8. Who it suits

```
┌────────────────────────────────────────────────────────────────────────────┐
│  FIT                                                            [meta,upper]│
│                                                                            │
│  This is not for everyone, and we would rather say so now.          [h2]   │
│                                                                            │
│  ┌─────────────────────────────────┬──────────────────────────────────┐    │
│  │ THIS FITS                 [meta]│ THIS DOES NOT FIT          [meta]│    │
│  │                                 │                                  │    │
│  │ ▪ $3M to $50M in revenue [body] │ ▪ Pre-revenue                    │    │
│  │ ▪ 20 to 200 staff               │ ▪ Low-ticket transactional       │    │
│  │ ▪ A sales process that          │ ▪ You need leads this week       │    │
│  │   follows up on a lead          │ ▪ You want a one-off project     │    │
│  │ ▪ Someone who can edit          │ ▪ You cannot edit your own       │    │
│  │   your website                  │   website                        │    │
│  │ ▪ US or Australia               │ ▪ No process behind the lead     │    │
│  │ ▪ Commercial insurance,         │                                  │    │
│  │   professional services         │ Larger firms are still           │    │
│  │   or IT services                │ eligible. Tell us the size       │    │
│  │                                 │ and we will route you to a       │    │
│  │                                 │ qualification call.              │    │
│  └─────────────────────────────────┴──────────────────────────────────┘    │
└────────────────────────────────────────────────────────────────────────────┘
```

Both columns carry equal weight. No red, no green, no crosses. Mobile: stacks, `does not fit`
second, neither collapsed.

### 9. FAQs

```
┌────────────────────────────────────────────────────────────────────────────┐
│  QUESTIONS                                                      [meta,upper]│
│                                                                            │
│  ▸ Is the snapshot really free, and what is the catch?              [h4]   │
│  ▸ Can you guarantee we will show up in ChatGPT?                           │
│  ▸ How is this different from the SEO we already pay for?                  │
│  ▸ AI SEO and GEO sound like the same thing. What is the difference?       │
│  ▸ How long before anything changes?                                       │
│  ▸ Do you work with our industry?                                          │
└────────────────────────────────────────────────────────────────────────────┘
```

Answer 2 is the most important answer on the site and is fixed copy:

> No, and nobody can. We do not control ChatGPT, Perplexity, Gemini, Claude, Copilot or Google. What
> we can do is measure what those systems currently say, work on the things they draw from, and
> re-measure on the same prompt set so you can see what moved and what did not. Any agency that
> guarantees placement in a system it does not own is telling you something it cannot know.

Answer 4 uses the CLAUDE.md §1 definitions verbatim. `FAQPage` JSON-LD. Six questions, native
`<details>`, first one closed like the rest.

Mobile: full width, 44px minimum summary height.

### 10. Final CTA

```
┌════════════════════════════════════════════════════════════════════════════┐
║  (the one dark band on the page: --surface-invert, .on-invert)             ║
║                                                                            ║
║  Find out what the answer says about you.                           [h2]   ║
║                                                                            ║
║  We run the prompt set, compare you against three competitors on    [body] ║
║  four surfaces, and send you the findings with the prompts and             ║
║  screenshots. [NEEDS DATA: turnaround].                                    ║
║                                                                            ║
║  [ Run the snapshot ]   [ Book a walkthrough ]                             ║
║                                                                            ║
║  No card, no commitment. One follow-up email to offer a walkthrough. [meta] ║
└════════════════════════════════════════════════════════════════════════════┘
```

Primary `--teal-300` fill with `--ink-900` text (13.22:1). Secondary is a white-bordered ghost.
`StickyCta` hides once this section enters the viewport. Mobile: buttons stacked full width, 64px
vertical padding.

### 11. Footer

Four columns desktop, two mobile. Layers, industries, company, legal. Carries the platform-names
disclosure and the markets-not-offices line.

---

## Section rhythm

| Section | Background | Top padding | Rule above |
|---|---|---|---|
| 1 Hero | white | header height + 64/96/128 | none |
| 3 Problem | white | `--section-y` | 1px `--rule-hairline` |
| 4 Layers | `--ink-050` | `--section-y` | none, the fill does the separating |
| 5 Programme | white | `--section-y` | none |
| 6 Industries | white | `--section-y` | 1px `--rule-hairline` |
| 7 Snapshot | `--ink-050` | `--section-y` | none |
| 8 Fit | white | `--section-y` | 1px `--rule-hairline` |
| 9 FAQ | white | `--section-y` | 1px `--rule-hairline` |
| 10 Final CTA | `--surface-invert` | 80/112/144 | none |

Two tinted sections and one dark. Alternating every section is what makes a page look like a
template.

## Load and motion budget

- Above the fold: type, two buttons, a platform list. No image, no video, no embed. LCP is a text
  node.
- One reveal pattern sitewide: 8px rise, 200ms, once, first viewport only. The hero does not reveal.
- No section animates on scroll position. No parallax. No counters.
- `prefers-reduced-motion: reduce` removes all of it.
