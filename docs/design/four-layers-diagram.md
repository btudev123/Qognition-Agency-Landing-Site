# `FourLayersDiagram` — how the four layers relate

Owner: Elena (creative). Written 2026-09-28. Homepage section 5, and reused at the top of each
layer page with the current layer emphasised.

---

## 1. What the diagram has to say

Four boxes in a row would be decoration. It would say "we do four things", which CLAUDE.md §1
explicitly calls table stakes and forbids leading with.

The meaningful relationship is a **dependency, not a set**. Google's index and a business's local
entity records are the corpus that AI Overviews and the assistants retrieve from. SEO and Local SEO
are therefore *inputs* to the answer layers, not siblings of them. That is the mechanism, and it
also happens to be the sales argument, which is how you know it is the right diagram:

> You rank in Maps, but ChatGPT names your competitor.

That sentence is a statement about this diagram. The inputs are working and the selection step is
not. A reader who understands the diagram understands why "just do more SEO" does not fix it, and
why the four layers are sold as one retainer rather than separately.

The diagram must also hold the line CLAUDE.md §1 draws: **AI SEO and GEO are different surfaces and
are never blurred.** They sit in the same band but in separate boxes, with different platform lists.

---

## 2. Structure

```
DESKTOP, >=1024px

   ONE BUYER QUESTION                 WHERE IT GETS ANSWERED                   WHAT THEY ACT ON

  ┌────────────────────┐        ┌───────────────────────────────────┐        ┌────────────────┐
  │                    │        │  INDEXED SURFACES                 │        │                │
  │  "Who should we    │        │  ┌─────────────┐ ┌─────────────┐  │        │                │
  │   hire for         │───────▶│  │ SEO         │ │ LOCAL SEO   │  │        │                │
  │   commercial       │        │  │ Google      │ │ Maps, local │  │        │                │
  │   insurance in     │        │  │ search      │ │ pack, Bing  │  │        │  The vendor    │
  │   Dallas?"         │        │  │ results     │ │ Places, GBP,│  │        │  they contact  │
  │                    │        │  │             │ │ reviews     │  │        │                │
  │  Asked once. The   │        │  └──────┬──────┘ └──────┬──────┘  │        │                │
  │  buyer does not    │        │         │               │         │───────▶│  One shortlist │
  │  know or care      │        │         └───────┬───────┘         │        │  either way    │
  │  which system      │        │                 │                 │        │                │
  │  answers it.       │        │        retrieved from             │        │                │
  │                    │        │                 ▼                 │        │                │
  │                    │        │  ANSWER SURFACES                  │        │                │
  │                    │        │  ┌─────────────┐ ┌─────────────┐  │        │                │
  │                    │        │  │ AI SEO      │ │ GEO         │  │        │                │
  │                    │        │  │ Google AI   │ │ ChatGPT,    │  │        │                │
  │                    │        │  │ Overviews,  │ │ Perplexity, │  │        │                │
  │                    │        │  │ AI Mode     │ │ Gemini,     │  │        │                │
  │                    │        │  │             │ │ Claude,     │  │        │                │
  │                    │        │  │             │ │ Copilot     │  │        │                │
  │                    │        │  └─────────────┘ └─────────────┘  │        │                │
  └────────────────────┘        └───────────────────────────────────┘        └────────────────┘

  Every retainer covers all four. They are not sold separately, because the answer surfaces
  are assembled from the indexed ones.                                                  [meta]
```

```
MOBILE, <768px — same mechanism, stacked. The vertical arrow does the work the
horizontal one does on desktop, so nothing is lost.

  ┌──────────────────────────────┐
  │ ONE BUYER QUESTION     [meta]│
  │ "Who should we hire for      │
  │  commercial insurance in     │
  │  Dallas?"                    │
  └──────────────┬───────────────┘
                 ▼
  ┌──────────────────────────────┐
  │ INDEXED SURFACES       [meta]│
  │ ┌──────────────────────────┐ │
  │ │ SEO                      │ │
  │ │ Google search results    │ │
  │ └──────────────────────────┘ │
  │ ┌──────────────────────────┐ │
  │ │ LOCAL SEO                │ │
  │ │ Maps, local pack, Bing   │ │
  │ │ Places, GBP, reviews     │ │
  │ └──────────────────────────┘ │
  └──────────────┬───────────────┘
                 │  retrieved from
                 ▼
  ┌──────────────────────────────┐
  │ ANSWER SURFACES        [meta]│
  │ ┌──────────────────────────┐ │
  │ │ AI SEO                   │ │
  │ │ Google AI Overviews,     │ │
  │ │ AI Mode                  │ │
  │ └──────────────────────────┘ │
  │ ┌──────────────────────────┐ │
  │ │ GEO                      │ │
  │ │ ChatGPT, Perplexity,     │ │
  │ │ Gemini, Claude, Copilot  │ │
  │ └──────────────────────────┘ │
  └──────────────┬───────────────┘
                 ▼
  ┌──────────────────────────────┐
  │ WHAT THEY ACT ON       [meta]│
  │ One shortlist either way     │
  └──────────────────────────────┘
```

---

## 3. Build

**HTML and CSS grid, with an SVG connector layer. Not an SVG illustration.** The text in this
diagram is positioning copy: it must be selectable, searchable, translatable, machine-readable for
the LLM citation work described in CLAUDE.md, and re-flowable at 400% zoom. Text baked into SVG
paths is none of those.

```
<figure class="four-layers">
  <figcaption>            visible, text-meta, sits above the diagram
  <ol>                    the semantic backbone, see §5
    <li> question
    <li> indexed surfaces  -> <ul> SEO, Local SEO
    <li> answer surfaces   -> <ul> AI SEO, GEO
    <li> outcome
  </ol>
  <svg aria-hidden="true"> connectors only, absolutely positioned, pointer-events none
</figure>
```

- Layer boxes: white, 1px `--rule-structural`, `--radius-md`, 20px padding, `--elev-0`.
- Band labels (`INDEXED SURFACES`, `ANSWER SURFACES`): `text-meta`, uppercase, `0.08em` tracking,
  `--ink-400`. The band itself is `--ink-050` at `--radius-md` with 24px padding.
- Layer name: `text-h4`, `--ink-900`, 600. Surface list under it: `text-meta`, `--ink-500`.
- Connectors: 1.5px `--rule-interactive` lines with a 6px solid arrowhead. The one connector that
  carries the argument, indexed to answer, is `--accent-fill` at 2px and is the only teal line in
  the diagram. Its label `retrieved from` is `text-meta` in `--accent` on a white chip.
- The answer-surface boxes carry a 2px `--accent` top rule. Nothing else is emphasised. Emphasising
  all four emphasises none.
- No gradients, no glows, no drop shadows, no icons inside the boxes. The platform names are the
  content.

### Emphasised variant

On `/seo`, `/local-seo`, `/ai-seo` and `/geo`, pass `emphasis="seo" | "local-seo" | "ai-seo" |
"geo"`. The named box gets `--accent` 1.5px border and `--accent-tint` background; the other three
drop to `--ink-400` text on white. The structure never changes, so a reader moving between layer
pages sees the same map with a different pin. That repetition is the point.

---

## 4. Motion

One reveal, or none.

- Boxes fade and rise 8px in reading order, three-item stagger at 40ms, `--dur-base`, once, on
  first entry into the viewport.
- The connector lines draw with `stroke-dashoffset` over `--dur-slow`, once, after the boxes settle.
- `prefers-reduced-motion: reduce`: everything renders final, connectors fully drawn, no transition.
- Nothing loops. Nothing responds to scroll position. Nothing responds to hover except the
  emphasised variant's links.

---

## 5. Accessibility and the non-visual reading

The `<ol>` is the diagram, and the SVG is `aria-hidden`. A screen reader gets this, in order, with
no additional markup:

> Figure. How a buyer's question gets answered, and which of the four layers answers it.
> 1. One buyer question. "Who should we hire for commercial insurance in Dallas?" Asked once. The
>    buyer does not know or care which system answers it.
> 2. Indexed surfaces. SEO: Google search results. Local SEO: Maps, local pack, Bing Places,
>    Business Profile, reviews.
> 3. Answer surfaces, retrieved from the indexed surfaces. AI SEO: Google AI Overviews and AI Mode.
>    GEO: ChatGPT, Perplexity, Gemini, Claude, Copilot.
> 4. What they act on. One shortlist either way.

That ordering is why the markup is a list and not a grid of divs: the dependency survives when the
picture is removed.

Contrast: every text pairing in the diagram is `--ink-900` (19.55), `--ink-500` (7.16) or
`--ink-400` (4.91) on white or `--ink-050`. The teal connector at `--accent-fill` is a 2px non-text
graphic and is not required to meet 4.5:1; its label is `--accent` at 5.47:1.

---

## 6. Copy on frame, exact

| Slot | Copy |
|---|---|
| Figure caption | How one buyer question gets answered, and which layer answers it |
| Column 1 label | ONE BUYER QUESTION |
| Column 1 body | "Who should we hire for commercial insurance in Dallas?" |
| Column 1 note | Asked once. The buyer does not know or care which system answers it. |
| Band 1 label | INDEXED SURFACES |
| Layer 1 | SEO / Google search results |
| Layer 2 | Local SEO / Google Maps, local pack, Bing Places, Business Profile, reviews, listings |
| Connector label | retrieved from |
| Band 2 label | ANSWER SURFACES |
| Layer 3 | AI SEO / Google AI Overviews and AI Mode |
| Layer 4 | GEO / ChatGPT, Perplexity, Gemini, Claude, Copilot |
| Column 3 label | WHAT THEY ACT ON |
| Column 3 body | One shortlist either way |
| Footnote | Every retainer covers all four. They are not sold separately, because the answer surfaces are assembled from the indexed ones. |

The layer definitions are copied from CLAUDE.md §1 verbatim and must stay identical on every page.
If that table changes, this diagram changes with it in the same commit.

`[NEEDS DATA: the example question.]` "Who should we hire for commercial insurance in Dallas?" is a
plausible buyer question, not a recorded one. If a real prompt exists from an insurance snapshot
that we have permission to quote, use it and mark it as real. If not, the diagram must not imply it
was observed, so the copy stays in the abstract with no date attached to it.
