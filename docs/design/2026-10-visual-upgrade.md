# Homepage visual upgrade, same brand (2026-10)

Owner: Elena (creative). Written 2026-10-07 for Mira (`frontend-dev`). Status: **Ruth reviewed 2026-10-07. Copy
fixes applied in place; the result of each §7 item is in §7.1. Build from this version.**

Authority: CLAUDE.md authority block, operator 2026-10-07 ("Visual upgrade within the same brand is
approved"). That decision replaces §9's "keep it exactly" for layout and visuals only. These stay as they are: the logo, the
teal palette, Geist, square corners (`--radius: 0px`) and the light/dark rhythm. Plan:
`~/.claude/plans/do-everything-in-main-piped-cocke.md`, step 2.

**Concept.** Stop describing the method and show it. The page shows the instruments we work with: a
dated tracker, a buyer-question diagram, sector tiles and real client-programme cards. Each visual
replaces a paragraph that described it.

**Reference.** Linear's homepage, https://linear.app. Take one thing from it: the product interface *is*
the hero visual. It is rendered as real UI, restrained, monochrome plus one accent, and no
illustration stands in for the product. Do not copy its gradients, its dark-only ground or
its motion.

---

## 1. Visual language

### 1.1 Icons: lucide-react 0.344.0 (already a dependency)

| Rule | Value |
|---|---|
| Stroke | `strokeWidth={1.5} absoluteStrokeWidth` on every icon, so a 20px and a 32px icon draw the same 1.5px line |
| Sizes | **20** inline (list bullets, links, badge) · **24** in grid tiles · **32** in featured cards, layer tiles and step markers. No other sizes |
| Colour | `currentColor`. Set `color: var(--s-accent)` on the parent (5.03:1 light, 8.16:1 dark). The one exception is Fit's not-a-fit `Minus`, which uses `var(--s-text-muted)` |
| Icon tile | Square. 40×40 for a 24px icon, 48×48 for a 32px icon. `border: 1px solid var(--s-rule)`, `background: var(--s-surface-1)`, `border-radius: var(--radius)` (0) |
| A11y | `aria-hidden="true"` always. The adjacent text carries the meaning. No icon without a text label |
| Imports | Named imports in **server components only**. An icon imported into a `'use client'` file ships in the bundle. `Map` shadows the global, so never import it |
| Banned | `Sparkles` and any "AI magic" glyph. Emoji |

All icon names in this brief were checked against
`node_modules/.pnpm/lucide-react@0.344.0_react@19.2.6/.../lucide-react.d.ts`.

### 1.2 Inline-SVG diagrams

Write every diagram with `var(--s-*)` roles only. Each role resolves to the dark ramp under
`data-theme="dark"`, so one SVG serves both grounds. Never write `--d-*` in a component.

| Element | Role token | Light resolves to | Dark resolves to |
|---|---|---|---|
| Node fill | `--s-surface-1` | `#FFFFFF` | `--d-surface-1` `#131312` |
| Node stroke, 1px | `--s-rule-strong` | `rgba(0,0,0,.45)` | `--d-rule-strong` `rgba(255,255,255,.34)` |
| Flow line, 1.5px | `--s-accent-graphic` | `#0D9488` | `--d-accent-graphic` `#14B8A6` |
| Emphasised node stroke / arrowhead | `--s-accent` | `#0F766E` | `--d-accent` `#2DD4BF` |
| Unknown / "is it you?" element | `--s-accent-graphic`, `stroke-dasharray="4 4"` | as above | as above |
| Label text | `--s-text-muted`, JetBrains Mono, uppercase, letter-spacing .14em | `#6B6760` | `--d-text-muted` `#A8A49B` |
| Ground | none (transparent; inherits the section) | | |

- Label font-size is 14 in viewBox units. A diagram must never render narrower than its viewBox
  width × 0.9, which keeps labels at or above the 13px mono floor. Below 768px, ship the vertical
  variant instead of scaling the horizontal one down.
- `<svg role="img" aria-labelledby="{id}-t {id}-d">` with `<title>` and `<desc>`. Labels are real
  `<text>`, never outlined paths.
- Motion is optional: a flow line may draw on reveal (`stroke-dashoffset`, 320ms, same curve as
  `.rf-rail`), triggered by `.js-anim .rf-reveal.is-in`. The global reduced-motion block already
  zeroes it. No looping animation.

### 1.3 Cards, tiles, hover (existing tokens and classes only)

| Pattern | Spec |
|---|---|
| Lattice grid | Reuse the 1px lattice from the current `Industries.tsx` comment: `border-top` and `border-left` on the container, `border-right` and `border-bottom` on each cell, all `var(--s-rule-hairline)`. Never `gap-px` over a background colour |
| Linked card | `<Link className="rf-card rf-hoverable">`. Hover and focus come from the existing `.rf-card` rule: fill steps to `--s-surface-3`, an inset 1px `--s-rule-strong` ring, and a teal bloom at 0.06. Add `ArrowUpRight` (20px) top-right with the class `rf-arrow` |
| Static card (no page yet) | `<li className="rf-cell">`. Hover is the existing `.rf-cell` rule: background steps to `--s-surface-3` and `.rf-cell-meta` turns `--s-accent`. No arrow, no pointer, not focusable. A static card must not look clickable |
| Icon tile inside a card on hover | Border goes from `--s-rule` to `--s-accent-graphic`. Icon goes from `--s-accent` to `--s-accent-display`. Add to globals.css as `.rf-card:hover .q-icon-tile, .rf-card:focus-visible .q-icon-tile, .rf-cell:hover .q-icon-tile` |
| Padding | `p-5 sm:p-6` grid cells; `p-6 sm:p-8` feature cells |
| No | Rounded corners, drop shadows other than the existing panel shadow, translateY on hover, gradients on cards |

New CSS goes in **`app/globals.css`**, in one block headed `VISUAL UPGRADE 2026-10`. `app/layout.tsx`
already imports its two-stylesheet maximum.

### 1.4 Pexels photo treatment: teal tint, CSS only

Photos sit on **dark bands only**. That covers Industries featured cards and Evidence cards. On a
light band, a photo goes above the text, never behind it.

```css
/* globals.css, VISUAL UPGRADE 2026-10 */
.q-tint { position: relative; overflow: hidden; isolation: isolate; background: var(--s-bg); }
.q-tint img { filter: grayscale(1) contrast(1.08) brightness(.92);
              transition: transform 500ms cubic-bezier(.22,1,.36,1); }
.q-tint::before { content: ''; position: absolute; inset: 0; z-index: 1; pointer-events: none;
                  background: var(--s-accent-graphic); mix-blend-mode: color; opacity: .55;
                  transition: opacity 450ms ease; }
.q-tint::after  { content: ''; position: absolute; inset: 0; z-index: 1; pointer-events: none;
                  background: linear-gradient(to top,
                    color-mix(in srgb, var(--s-bg) 88%, transparent) 0%,
                    color-mix(in srgb, var(--s-bg) 0%, transparent) 62%); }
.q-tint > .q-tint-copy { position: absolute; inset: auto 0 0 0; z-index: 2; padding: 20px; }
:is(a, .rf-cell):hover > .q-tint::before, :is(a, .rf-cell):focus-visible > .q-tint::before { opacity: .35; }
@media (prefers-reduced-motion: no-preference) {
  a:hover > .q-tint img, a:focus-visible > .q-tint img { transform: scale(1.03); }
}
```

- Component: `components/visual/TintedImage.tsx`, a server component wrapping `next/image`
  (`fill`, `sizes` per placement below, local files only, `alt` from the credits file).
- **Safe zone for text:** the bottom 45% of the frame, 20px inset, on the scrim. Keep the top-right
  48×48 clear for `ArrowUpRight`. Copy never sits in the top half.
- Photo credit is mandatory, rendered as on case studies (`PhotoCredit`). Under `data-theme="dark"`,
  pass `className="text-[color:var(--s-text-faint)]"`. Its default `--text-muted` is a light-page
  token and does not remap.
- **Content rules for any photo:** no people at all. That is stricter than §9, which bans people in offices, and it
  removes the judgement call. Also banned: legible third-party logos, brand names or signage; screens showing readable
  data; HVAC rooftop units, because they read as the HVAC case studies.

### 1.5 AI-generated imagery

Style: abstract, teal on near-black `#0A0A09` or warm off-white `#F8F5EF`, sparse and matte. Never
show people, text, letters, numerals, logos, UI, screens, chat bubbles or any assistant's interface. Generate
with the `ai-image-gen` skill. Inspect each output at 100% for letter-like artefacts and reject any
that has them. Export as JPG at quality 80, **≤ 300KB**. Decorative: `alt=""`, `aria-hidden`.

| File | Size | Placement |
|---|---|---|
| `public/images/brand/ai-signal-dark-2400x1000.jpg` | 2400×1000 | FinalCta background, right 60%, opacity .5, under `GradientMesh` |
| `public/images/brand/ai-sample-grid-dark-1600x1600.jpg` | 1600×1600 | Snapshot background, right half at ≥1024 only, opacity .4 |
| `public/images/brand/ai-strata-light-2400x900.jpg` | 2400×900 | Not on `/`. Reserved for the service-template banner (plan step 3) |

**Prompt 1, signal (dark):**
> Abstract editorial image, 12:5. Near-black background #0A0A09. Sparse network of very thin luminous
> teal lines (#14B8A6 fading to #5EEAD4) and small nodes, several paths converging on one point in the
> right third. Large empty negative space in the left half. Soft depth of field, fine film grain,
> matte, restrained, not neon. No people, no text, no letters, no numbers, no logos, no user
> interface, no screens, no chat bubbles, no devices.

**Prompt 2, sample grid (dark):**
> Abstract, 1:1. Near-black background #0A0A09. An orderly grid of small dots receding in perspective
> toward the top right, most dots dim warm grey, a scattered handful glowing teal (#14B8A6). Faint
> concentric rings around two of the teal dots. Calm, precise, scientific. Fine grain. No people, no
> text, no letters, no numbers, no logos, no user interface, no screens, no chat bubbles.

**Prompt 3, strata (light):**
> Abstract, 8:3. Warm off-white paper background #F8F5EF. Fine teal ink line drawing (#0F766E and
> #0D9488) of layered contour lines like a topographic survey, four distinct strata stacked from bottom
> to top, the upper two drawn slightly denser. Generous margins, lots of empty paper. Printmaking
> feel, no shading gradients. No people, no text, no letters, no numbers, no logos, no user interface,
> no screens.

### 1.6 The Illustrative badge (product screens)

> **Superseded by ADR-0006 §12 (operator, 2026-10-08).** The badge and its banner are removed from every product screen; this section is kept as history only.

The `ProductScreen` component renders the badge, never the data, using the exact ADR-0006 R3 string:

> **Illustrative** product interface. Sample data, not client results.

- `Info` icon at 20px, then the string. "Illustrative" is `font-medium` in `--s-accent`. The rest is `--s-text`.
  Box: `background: var(--s-surface-2)`, `border: 1px solid var(--s-rule-strong)`, `px-3 py-2`, text-meta.
- **Position:** first row inside the frame, directly under the title bar and full width. It wraps at 375 and
  is never truncated. Top placement is deliberate: the bottom-right of the viewport on mobile is
  covered by FloatingWhatsApp and the StickyCTA bar.
- It renders with `frame="none"` too (ADR-0006 §2).

---

## 2. Homepage, section by section

### 2.0 Rhythm

The current page runs four light sections in a row (BookCall, Snapshot, Fit, Faqs). With 11 sections
starting light and ending on a dark CTA, strict alternation is arithmetically impossible, so one
light pair is intended. It is fused into a single band.

| # | Section | Now | **Target** `data-theme` |
|---|---|---|---|
| 1 | Hero | light | light |
| 2 | BuyingProblem | dark | dark |
| 3 | FourLayers | light | light |
| 4 | Industries | dark | dark |
| 5 | Programme | light | light |
| 6 | Evidence | dark | dark |
| 7 | BookCall `#book` | light | light (the calendar is styled for light; do not move it) |
| 8 | Snapshot | light | **dark**. Keep `background: var(--s-surface-1)`, which resolves to `#131312` so it reads as a raised dark band |
| 9 | Fit | light | light, with 10 forming **one band** |
| 10 | Faqs | light | light. Drop its `borderTop`; use `pt-4 sm:pt-8` and a single `--s-rule-hairline` divider inside the Shell |
| 11 | FinalCta | dark | dark |

For Owen's Playwright check, the expected `data-theme` order is `L D L D L D L D L L D`, with sections 9
and 10 the only adjacent pair.

### 2.1 Word budget

Counts are rendered words, measured from the current components. FAQ answers are counted although they sit
collapsed.

| Section | Now | Target |
|---|---|---|
| Hero (incl. screen) | ~245 | **~150** |
| BuyingProblem (incl. diagram labels) | ~145 | **~85** |
| FourLayers | ~175 | **~115** |
| Industries | ~500 | **~275** |
| Programme | ~240 | **~140** |
| Evidence | ~290 | **~165** |
| BookCall | ~95 | **~65** |
| Snapshot | ~185 | **~105** |
| Fit | ~130 | **~120**, held: the not-a-fit list is the CLAUDE.md §2 disqualifier set and is not cut |
| Faqs | ~390 | **~390**, held: answers are collapsed, and they feed `faqSchema()`, which is a GEO asset for this site |
| FinalCta | ~40 | **~25** |
| **Total** | **~2,435** | **~1,635 (−33%)**. Visible on load without opening FAQs: about −45% |

No new claims anywhere. Every kept line below is an existing string, quoted from the component. A
line marked **[R]** is new or edited and is listed for Ruth in §7.

### 2.2 Hero (light)

- **Keep:** the eyebrow "AI-native growth agency for B2B: AI SEO and GEO" · the H1, unchanged ("Get found.
  Get shortlisted. Build pipeline.", which is a priority page H1) · both subhead sentences · the CTAs "Book a call" →
  `#book` and "Send an enquiry" → `/contact#enquiry` · "Google and AI search platforms", the logo chips and the
  disclaimer "We agree which platforms matter… in any platform's answers."
- **Cut:** every string in `HeroSnapshotPanel`. **Delete the file**, which removes a client component from `/`.
- **Visual:** the AI visibility tracker product screen (§3.1), with its five sector tabs.
- **375:** existing DOM order, which is eyebrow, H1, sub, CTAs (full width), tracker (full width, 2 rows per tab),
  then chips. **1440:** existing grid `1.05fr / 0.95fr`. Left: copy and chips. Right: tracker, `max-w-[560px]`,
  `justify-self-end`. Keep the comment about rendering once; the tracker is rendered once.

### 2.3 BuyingProblem (dark)

- **Keep:** the eyebrow "The buying problem" · the H2 "Your analytics can't show you what an assistant said about you."
  · the whole of paragraph 1 ("A buyer can ask ChatGPT… what other sites say about you.") · from paragraph 2, the first sentence only:
  "Your analytics only see the buyers who click through." · the blockquote "We work on what you can
  control, and we date what you can't."
- **Cut:** the rest of paragraph 2 and all of paragraph 3.
- **Visual:** `components/visual/DiagramBlindSpot.tsx`, inline SVG, horizontal at viewBox 720×300 and vertical at 320×560.
  ```
  [YOUR PAGES]──┐
                ├──▶ [AI ANSWER] ──▶ SHORTLIST ▭ ▭ ┆▭┆ ──▶ [CLICK-THROUGH] ──▶ ┆ YOUR ANALYTICS ┆
  [OTHER SITES]─┘        ▲                       YOUR FIRM?                     (dashed --s-accent box,
                  [BUYER QUESTION]                                              the only part it sees)
  ```
  Labels **[R]**: BUYER QUESTION · YOUR PAGES · OTHER SITES · AI ANSWER · SHORTLIST · YOUR FIRM? ·
  CLICK-THROUGH · YOUR ANALYTICS. The shortlist is three bars: two solid at `--s-rule-strong` and one dashed
  at `--s-accent-graphic` with the label "YOUR FIRM?". Use no platform names or logos in the diagram.
  **Ruth:** draw YOUR ANALYTICS as a solid `--s-accent` box (the emphasised-node role in §1.2), not dashed. Dashed
  means "unknown" in §1.2, and the one unknown in this diagram is YOUR FIRM?. Two dashed boxes make the
  analytics read as the uncertain part, which is the opposite of the paragraph.
  `<desc>` reuses paragraph 1 verbatim.
- **375:** eyebrow, H2, paragraph 1, vertical diagram (full width), the sentence, the quote. **1440:** 12 columns.
  Text in `lg:col-span-5`, diagram in `lg:col-span-7`, vertically centred.

### 2.4 FourLayers (light)

My 2026-09-28 brief (`four-layers-diagram.md` §1) still holds: four equal boxes say "we do four
things". So the tiles are grouped to show the **dependency**: the supporting layers feed the answer
layers.

- **Keep:** the eyebrow "The four layers" · the H2 "Four surfaces, four different jobs." · each `LAYERS` entry verbatim
  (`layer`, `surface`, `moves`) · the closing line, which now opens with the existing first sentence **[R, Ruth]**:
  "Start with the layer you need. B2B PPC runs alongside the four layers and is scoped separately,
  priced as a share of ad spend with a monthly minimum. A firm that wants only PPC is a full client."
  Reason: the new supporting-to-answer connector reads as a prerequisite. Without "Start with the layer you
  need." the section implies a client must buy SEO to get AI SEO, which reverses the operator's 2026-10-07
  decision that any one layer can be bought alone.
- **Cut:** the intro paragraph · "We scope the work around your products and markets, and add local SEO only where
  location shapes the buying decision."
- **Visual:** four tiles in two labelled groups. The group labels are `Eyebrow` components: "Answer layers" **[R]**
  over AI SEO and GEO, and "Supporting layers" (existing phrase from the Hero sub) over SEO and Local SEO.
  A 1px `--s-accent-graphic` connector with an arrowhead runs from the supporting group to the answer group.
  Icons at 32px in 48px tiles: AI SEO `ScanSearch` · GEO `MessageSquareText` · SEO `Search` · Local SEO `MapPin`.
  Tile contents: the layer name (text-h3, `--s-accent`), `surface` (text-body, `--s-text`), a hairline rule, then `moves`
  (text-meta, `--s-text-muted`).
  **No brand logos in these tiles.** Three of the four would carry the same Google mark, and the Hero
  already shows the logo row once with its disclaimer. This is a deliberate departure from the plan.
- **375:** one column, in the order Answer layers label, AI SEO, GEO, connector (vertical, arrow up), Supporting
  layers label, SEO, Local SEO. **1440:** two lattice rows of two tiles, answer row on top, with the connector between the rows
  pointing up. The PPC line sits below at `max-w-[72ch]`. Keep `GhostWord`.

### 2.5 Industries (dark): the full rebuild

- **Keep:** the eyebrow "Who we build this for" · the H2 "A software demo, an RFQ and a consultation need different
  pages." · each `FEATURED` card's `name` and `buyer` line · the button "See every sector" → `/industries`.
- **Cut:** the intro paragraph · every featured `detail` paragraph · the "01 / 03 Buyer journey" meta row ·
  the "Explore other B2B sectors" label.
- **Disclaimer, kept whole** **[R, Ruth]**. The existing three sentences stay, verbatim:
  "Listing a sector means we sell AI SEO, GEO, SEO and PPC into it. It is not a claim that we have
  worked with a firm in it. If your sector is not listed, you can still book a call." Use text-meta in
  `--s-text-faint`, under the grid. Two lines at 1440 is acceptable.
  Reason: the third sentence is the only line on `/` that says the taxonomy is a route to market, not a
  qualifier (CLAUDE.md §2), and it points at the primary conversion. Dropping it leaves the first two
  sentences reading as a list of who we will talk to, which turns away in-band leads from unlisted sectors.
- **Links:** a card is a link **only** when `publishedIcpPaths()` contains its slug, the same rule and
  reason as `app/industries/page.tsx`. Today that is **one card, TIC** (`environmental-engineering-and-testing`).
  Bind the Set once per render. Linked cards use `.rf-card`; the rest use `.rf-cell` (§1.3).

**A. Three featured image cards** (`IndustryCard variant="featured"`)

| Slug | Name (existing) | Icon | Photo |
|---|---|---|---|
| `saas-and-software` | B2B SaaS and software | `AppWindow` | `public/images/industries/featured/saas-and-software.jpg` |
| `manufacturing-and-industrial` | Industrial and manufacturing | `Factory` | `…/featured/manufacturing-and-industrial.jpg` |
| `professional-and-business-services` | Professional B2B services | `Briefcase` | `…/featured/professional-and-business-services.jpg` |

Card layout: `.q-tint` photo fills the card. In the bottom safe zone sit a 32px icon in `--s-accent`,
the name (text-h3, `--s-text`) and the buyer line (text-meta, `--s-text-muted`) under a mono label
"Their buyer". None of the three is published, so none is a link today. Hover lifts the tint only. `sizes`:
`(min-width: 768px) 33vw, 100vw`.
**375:** one column, `aspect-[16/10]`. **768+:** three columns, `aspect-[4/5]`. **1440:** three columns, about 440×550.

**B. The 18-card icon grid** (`IndustryCard variant="grid"`), in taxonomy order with 01, 02 and 05 removed.

Cards show a 24px icon in a 40px tile, the display name (text-h4, semibold, never truncated), and the first two
sub-industry names from `card.subNames.slice(0, 2)`, one per line, in text-meta with `rf-cell-meta`.
**Display name:** strip the exact suffix ` (B2B)` and nothing else **[R]**. Keep "(B2G-adjacent)", "(TIC)" and "(B2B side)".
Never edit `icp-taxonomy.json`. Icons live in `data/b2b/icp/industryVisuals.ts` as
`INDUSTRY_ICON: Record<slug, LucideIcon>`. Add a gate assertion that all 21 `icpIndustryCards()` slugs
have an entry.

**Even grid:** 18 divides by 1, 2, 3 and 6. **Never use 4 or 5 columns.**
`grid-cols-1 md:grid-cols-3 xl:grid-cols-6`, which gives 18×1 at 375, 6×3 at 768 and 3×6 at 1440 (cells about 226px).

| ID | Slug | Display name | Icon | Sub 1 | Sub 2 |
|---|---|---|---|---|---|
| 01 | saas-and-software | *(featured)* | `AppWindow` | Horizontal SaaS | Vertical SaaS |
| 02 | professional-and-business-services | *(featured)* | `Briefcase` | Corporate & Transactional Law Firms | Disputes, Employment & Regulatory Law Firms |
| 03 | healthcare-and-life-sciences | Healthcare & Life Sciences | `HeartPulse` | MedTech & Medical Devices | Medical Device Contract Manufacturing & Engineering |
| 04 | financial-services | Financial Services | `Banknote` | Business lending & credit services | Commercial real estate lending |
| 05 | manufacturing-and-industrial | *(featured)* | `Factory` | Precision Manufacturing & Machining | Contract Manufacturing & EMS |
| 06 | logistics-supply-chain-and-transportation | Logistics, Supply Chain & Transportation | `Truck` | 3PL & fulfillment | Freight brokerage & forwarding |
| 07 | construction-real-estate-and-built-environment | Construction, Real Estate & Built Environment | `Building2` | Commercial general contractors | Design-build & construction management |
| 08 | energy-and-utilities | Energy & Utilities | `Zap` | Commercial & industrial solar | Battery energy storage |
| 09 | technology-and-it-services | Technology & IT Services | `Server` | Managed IT services | Managed security services |
| 10 | education-and-training | Education & Training | `GraduationCap` | Corporate Learning Platforms | Learning Services & Custom Content |
| 11 | hospitality-travel-and-events | Hospitality, Travel & Events | `Hotel` | Hotel tech | Hotel management & advisory |
| 12 | agriculture-and-food | Agriculture & Food | `Wheat` | AgTech & Precision Agriculture | Ag & Food Software |
| 13 | media-marketing-and-creative | Media, Marketing & Creative | `Megaphone` | B2B publishing & trade media | B2B review sites & software directories |
| 14 | government-nonprofit-and-institutional | Government, Nonprofit & Institutional (B2G-adjacent) | `Landmark` | GovTech & Municipal Software | Civic Engagement & Digital Government |
| 15 | emerging-and-micro-niches | Emerging & Micro-Niches | `Telescope` | AI Implementation Consultancies | AI Data, Safety & Assurance |
| 16 | aerospace-and-aviation | Aerospace & Aviation | `Plane` | Airframe MRO & Line Maintenance | Engine & Component MRO |
| 17 | automotive-heavy-equipment-and-mobility | Automotive, Heavy Equipment & Mobility | `Car` | Automotive Tier 1 & Tier 2 Suppliers | Automotive Engineering & Vehicle Software |
| 18 | commercial-and-facility-services | Commercial & Facility Services | `Wrench` | Janitorial & Contract Cleaning | Specialty, Industrial Cleaning & Restoration |
| 19 | environmental-engineering-and-testing | Environmental, Engineering & Testing (TIC) | `FlaskConical` | Environmental Consulting | Real Estate & Transaction Due Diligence |
| 20 | retail-cpg-and-brand-enablement | Retail, CPG & Brand Enablement | `Package` | CPG brokerage & retail sales agencies | Private label & contract manufacturing (non-food) |
| 21 | franchising-and-multi-location | Franchising & Multi-Location (B2B side) | `Store` | Home services franchisors | Commercial & B2B services franchisors |

Sub-names are rendered from data, never typed into the component. Card 19 is the only link, with
`ArrowUpRight` top-right.

**Section order at every width:** header, featured row (`mt-12`), grid (`mt-6`), disclaimer (`mt-6`),
button (`mt-8`).

### 2.6 Programme (light)

- **Keep:** the eyebrow "How the programme works" · the H2 "From buyer questions to sales conversations." · "One scope and
  one review rhythm, agreed in writing before work starts." · for each phase, `n · window`, `title` and
  `deliverable` · the closing paragraph "We do not control ChatGPT, Google or Perplexity…" verbatim, because it is
  the point of the section.
- **Cut:** each phase `body`.
- **Fix the invisible numerals:** delete the ghost numeral span (`rgba(255,255,255,0.028)` on
  off-white). It is `aria-hidden` and duplicates the visible label, so nothing is lost. The
  step marker becomes a 48px icon tile sitting on the rail: 01 `Compass` · 02 `Blocks` · 03 `BadgeCheck` ·
  04 `CalendarCheck`. The label "01 · Discovery" changes from `--s-text-faint` to `--s-accent`.
- **375:** a vertical timeline. A 1px `--s-rule` rail runs down through the centres of the icon tiles at
  x = 24px, with content to the right (`pl-16`). **1440:** a horizontal four-column timeline. The existing `.rf-rail` runs
  through the tile centres, and the first tile's border is `--s-accent-graphic` while the rest are `--s-rule-strong`
  (existing logic). Keep `GhostWord`.

### 2.7 Evidence (dark)

- **Keep:** the eyebrow "How we report" · the H2 "Every answer we report has a date on it." · "We report each
  observation with the prompt we used, the platform, the date and the sources the answer cited. You
  can re-run any of it yourself." · "A mention in an answer does not prove a buyer became a customer." ·
  "Every KPI is labelled as a target until client reporting fills in the result." · the links "How we
  handle evidence" → `/case-studies/methodology` and "Client programmes" → `/case-studies`.
- **Edited [R, Ruth]:** "These programmes are for insurance businesses. Outside insurance, read them for the
  method, not as proof of work in your sector." Based on the existing sentence, with "HVAC, dental and" removed
  because only insurance renders here (operator 2026-10-07: B2B pages show insurance only).
  Ruth: "commercial" is dropped. The three records describe each client as "an insurance business" and
  name policyholders and bound policies, and A CityWide and Gengler carry no commercial-lines KPI, so
  "commercial" is not supported by the cards it sits above. The sentence is also split, because the old
  version told an insurance prospect that insurance programmes were not proof in their own sector.
- **Cut:** both `SOURCES` cards · the "A record you can compare" block, except the one kept sentence ·
  the old Client programmes card body.
- **Visual 1, the method strip:** a four-cell lattice, each cell a 24px icon plus a label **[R]**, with labels taken from the
  kept sentence: `Quote` "The prompt" · `Layers` "The platform" · `CalendarDays` "The date" ·
  `Link2` "The cited sources".
- **Visual 2, three insurance client-programme cards:** `byNiche('insurance').slice(0, 3)`, which is
  deterministic and today returns Alliance Insurance Group, A CityWide Insurance and Gengler Insurance Agencies. Their
  images come from `data/case-studies/images.json` (waterfront buildings, skyline, glass tower, none with people).
  **Do not reuse `CaseStudyCard`.** Its `--border`, `--surface` and `--ink` tokens do not remap under
  `data-theme="dark"`. Build `components/visual/ProgrammeCard.tsx` from `--s-*` roles. Reuse `PhotoCredit`.
  **Card content (Ruth, 2026-10-07): no KPI figures on `/`.** The card shows the mono label "Client programme",
  the client name as the stretched link (do not also render `headline`, which repeats the name and the label),
  `market`, the services from `study.services` as text ("AI SEO and PPC"), and this line **[R, Ruth]**:
  "KPI targets set at the start. Results pending client reporting." Do not import `pickHeadlineKpi` and never
  render `change`. Put the photo in `.q-tint` at `aspect-[16/10]` above the text, not behind it.
  `caseStudyEvidence()` is untouched, and the full baseline and target table stays on each case-study page.
  Why the figures do not come to `/`: §4 says no number appears that was not measured. The header of
  `data/case-studies/insurance.ts` says baselines were "set at the start of each engagement", not measured,
  and the values repeat across different firms. Gengler (Fairfax, VA) and Suffolk Insurance Corporation
  (Suffolk, VA) share four identical baseline and target pairs, and Gengler and A CityWide (Denver) share the
  same cost per quote, $135 to $92. `pickHeadlineKpi` would also put Local Pack grid share on two of three cards,
  one of them on an AI SEO-only programme, and "Cost per bound policy $1,124 → $417" on the third, beside a
  client name. When the per-client baseline source lands (NEEDS DATA),
  the figures can come back.
- **375:** header, lead, method strip (2×2), caveat, cards in one column, scoping lines, links.
  **1440:** a 12-column header (H2 in 6 columns, lead and caveat in 6), the method strip at 4×1, cards at 3×1, then the
  scoping lines on the left and both links on the right.

### 2.8 BookCall `#book` (light): copy column only

- **Keep:** the eyebrow "Book a call" · the H2 "30 minutes. Here is what we cover." · all three list lines verbatim ·
  "After the call you get a written scope and fee." · "Prefer to write? Send an enquiry…"
- **Cut:** "Bring your website and the buyers you want to reach. It is a working conversation…"
- **Visual:** the list bullets become 20px icons: `MessageSquareText`, `ScanSearch`, `Scale`. The scope line
  gets `FileText`.
- **Layout:** unchanged at both widths (`0.85fr / 1.15fr`). Do not touch the section `id`, `CalBooking`,
  `minHeight={680}`, the widget wrapper or anything in the right column.

### 2.9 Snapshot (dark, new)

- **Keep:** the eyebrow "Free AI visibility audit" · the H2 "Want to see the answers first?" · "It is free, and there is
  no obligation to book." · both CTAs ("Request your free audit" → `/free-ai-audit#request`, "What the
  audit covers" → `/free-ai-audit#scope`) · "How it works" · all four `STEPS` verbatim, because step 4 carries "We
  confirm timing when we reply." · "Each finding carries its date, method and scope."
- **Cut:** the long intro paragraph, except its last sentence · "Read findings in context" and its other
  sentences.
- **Visual:** a four-step icon rail: `Send` · `UserCheck` · `CalendarDays` · `FileText`, each icon a 48px tile
  joined by a `.rf-rail`. AI image 2 sits behind the right half at ≥1024. *Or*, instead of that image and never both,
  the optional prompt panel screen (§3.2).
- **375:** copy, CTAs (full width), then the steps as a vertical rail. **1440:** copy in `lg:col-span-5`, steps
  in `lg:col-span-7` as a 2×2 grid with the rail drawn along each row.

### 2.10 Fit (light, shared band with Faqs)

- **Keep:** the eyebrow "Fit" · the H2 "Start with the business you want to win." · both list titles · all 5 fits and
  all 6 not-a-fit items verbatim.
- **Cut:** "A short check before you book. It saves us both a call."
- **Visual:** fits get a 20px `Check` in `--s-accent`. Not-a-fit items get a 20px `Minus` in `--s-text-muted`.
  Each column sits in a lattice cell with `p-6 sm:p-8`, and the fits cell has a 2px top border in `--s-accent-graphic`.
- **375:** one column, fits first. **1440:** two equal columns.

### 2.11 Faqs (light, shared band with Fit)

- **Keep:** everything in `HOME_FAQS` verbatim, so the JSON-LD still matches the visible FAQs with no
  change. Keep the eyebrow "Before we talk" and the H2 "Before you book a call."
- **Visual:** none added. The visible change is the band merge (§2.0).
- **375 / 1440:** unchanged (4/8 split at lg).

### 2.12 FinalCta (dark)

- **Keep:** the H2 verbatim · "Book a 30-minute call." · both CTAs.
- **Cut:** "Bring your website and the buyers you want to reach, and we will tell you where we would start."
- **Visual:** `GradientMesh` stays. AI image 1 sits under it at the right 60%, opacity .5, masked with
  `mask-image: linear-gradient(to left, #000 40%, transparent)` so the text side stays clean.
- **Layout:** unchanged.

---

## 3. Product screens (maximum two)

Both follow ADR-0006: one `<ProductScreen>`, data in `data/product-screens/`, `provenance:
'illustrative'`, no state, no timers, no third-party UI, `.example` domains only. **Product name:
Scriblr**, per CLAUDE.md, which gives citation tracking to Scriblr. The operator confirmed on 2026-10-07 that
Scriblr is in production use, so it may be named on illustrative screens. ADR-0006's 2026-10-07 amendment has
already removed Linkdex and G.O.L.E.M. It does not yet cover the five tracker tabs or the two new sample brands
(see NEEDS DATA).

### 3.1 Hero: "AI visibility tracker" (required)

**Tabs without breaking R4.** The five existing sector tabs stay, as the approved plan says. The state
lives in `components/visual/SectorTabs.tsx` (`'use client'`, holding the active index and the full keyboard pattern copied
from `HeroSnapshotPanel`). Its panels are **server-rendered `<ProductScreen>` children** toggled with
the `hidden` attribute. `ProductScreen` stays stateless, and the gate's grep is scoped to
`components/product-screens/`. **`SectorTabs` must not import lucide or anything heavy.** Net client JS
on `/` is about flat, since `HeroSnapshotPanel` is deleted.

**Frame:** `frame="none"`, `--s-surface-1` field, 1px `--s-rule` border, and the existing panel shadow.

| Zone | Content |
|---|---|
| Title bar | "Scriblr" (mono, `--s-text-faint`) · "AI visibility tracker" **[R]** (text-h4) |
| Badge | ~~§1.6, full width~~ Superseded by ADR-0006 §12 (operator, 2026-10-08): no badge rendered |
| Tabs | B2B SaaS · Manufacturing · Legal · IT and MSP · Logistics (existing labels) |
| Context `<dl>` | Tracked brand · Domain · Prompt set: "Fixed before the baseline run." (existing) · Run: "Sample run" **[R, Ruth]**. No date of any kind: ADR-0006 R4 bans dates in screen data because a dated fictional run reads as an observation (CLAUDE.md §4), and R4 names "Sample run" as the replacement |
| Table | Columns: Prompt · ChatGPT · Perplexity · Gemini · Google AI Overviews **[R, Ruth]**. These are the four members of the `Engine` type in `lib/b2b/observations.ts`, which ADR-0006 R1 makes the only assistant vocabulary. "Google AI Mode" is not a member and would not compile. Platform names are **row and column labels only**, never logos and never their UI |
| Cell | Named: a filled 8px dot in `--s-accent-graphic` plus the word "Named". Not named: a hollow dot with a 1px `--s-rule-strong` ring plus "Not named". The word is always visible; the dot is never the only cue |
| Under each prompt | "Sources cited:" **[R, Ruth]** plus 1–2 source-type tags from: Own site · Directory · Trade publication · Review site · Association **[R]**. "Own site" may appear only on a row with at least one Named cell, because an answer cannot cite the brand's domain without naming it |
| Caption (ADR `caption`) | "Every answer is stored with its prompt, platform, date and cited sources." **[R, Ruth]**. Present tense and digit-free, as the ADR requires. Source: CLAUDE.md §1, Scriblr row ("Raw answers, cited URLs and model versions are persisted") |
| Summary strip | Do not render it on the hero. A "Prompts with a mention" count beside one brand is a visibility score in all but name, and the Evidence copy says a single score tells you little. If Kyle keeps it in `ProductScreen`, add a `summary={false}` prop for this call site |

**Never present:** a score, a percentage, a share of voice, a rank, a trend arrow, a delta, an
"answer" bubble or any quoted assistant text. The Evidence copy says a single visibility score tells you
little, so the screen must not contradict it.

**Sample data.** Prompts are the existing `HeroSnapshotPanel` strings, three per sector, with these replacements
**[R, Ruth]**. Copy them into `data/product-screens/` before `HeroSnapshotPanel.tsx` is deleted.

| Tab | Existing | Replace with | Why |
|---|---|---|---|
| IT and MSP, row 2 | "Which MSPs support Epic environments for regional hospital systems?" | "Which MSPs support EHR environments for regional hospital systems?" | Epic is a real company. ADR-0006 R2 and the prompt type say no real company names |
| Logistics, row 3 | "Compare 3PLs offering EDI integration with NetSuite" | "Compare 3PLs offering EDI integration with our ERP" | NetSuite is a real product brand. Same rule |
| B2B SaaS, row 1 | "Compare procurement software for a multi-site manufacturing business" | "Compare compliance automation platforms for a first SOC 2 audit" | One sample brand is tracked per tab. The three existing SaaS prompts cover procurement, compliance and payroll software, so one brand being named for all three reads as fake to any SaaS buyer |
| B2B SaaS, row 3 | "What should a mid-market finance team evaluate before changing payroll software?" | "What should a mid-market security team check before switching compliance platforms?" | As above. Row 2, "Which compliance platforms support our existing identity provider?", stays |

N = Named, – = Not named, with columns in table order. The patterns differ per tab, so switching tabs does not look
templated. Never use an all-N row.

| Tab | Tracked brand (`SampleBrand`) | Domain | Row 1 | Row 2 | Row 3 |
|---|---|---|---|---|---|
| B2B SaaS | **Ondrell Software** (new member) **[R]** | `ondrell.example` | N – N – | – – – N | N N – – |
| Manufacturing | **Thornbury Precision** (new member) **[R]** | `thornbury-precision.example` | – N – – | N – – N | – – N – |
| Legal | Corran & Whitlow | `corranwhitlow.example` | N – – – | – N N – | – – – N |
| IT and MSP | Pellman IT Group | `pellman-it.example` | – – N N | N – – – | – N – N |
| Logistics | Harbour & Vane | `harbourvane.example` | – N N – | – – N – | N – – – |

Kyle adds the two new members to `SampleBrand` in the ADR-0006 amendment. Ruth has no web access, so every
sample brand is **[UNVERIFIED: trading-name check]** until Iris runs it (NEEDS DATA). On reading, only
Northgate Mutual has an obvious near-miss to a well-known brand (§7.1). That is a reading, not a search.

**375:** the table reflows to stacked rows. Each `<tr>` becomes a block: the prompt (text-meta), then a 2×2 grid of
`platform · dot · word` cells (`data-label` on each `<td>`, label via `before:content-[attr(data-label)]`).
Show rows 1–2 only below 640 (`[&_tbody_tr:nth-child(n+3)]:hidden`). **1440:** a real table, prompt column
`w-[44%]`, and the four platform columns centred.

### 3.2 "Prompt panel" (optional; Snapshot, ≥1024 only)

This shows that the prompt set is fixed before work starts.

| Field | Value |
|---|---|
| Title bar | "Scriblr" · "Prompt set" **[R]** |
| Badge | ~~§1.6~~ Superseded by ADR-0006 §12 (operator, 2026-10-08): no badge rendered |
| Tracked brand | Pellman IT Group · `pellman-it.example` **[Ruth]** |
| Rows (3) | Prompt · Platforms (text chips, the four `Engine` labels) · Status "Fixed" **[R]** |
| Footer | "Changing any of them needs a recorded reason." (existing, from Evidence) |

**Ruth, 2026-10-07:** use the three IT and MSP prompts as amended in §3.1, with Pellman IT Group, so the panel and the
hero tracker show the same fixed prompt set. Not the insurance prompts: the Evidence band on the same page shows three
real insurance clients, and a fictional insurer's sample panel two sections later invites a reader to merge the two.
That also takes Northgate Mutual off `/`.

**The Buyer column is removed.** `buyer_titles` in `icp-taxonomy.json` lists *our* buyer at that firm. For
"Managed IT services" it is "CEO / Founder", "VP Sales & Marketing", "Marketing Director", "Head of Growth". Printing
those against Family B prompts such as "Managed security providers with SOC 2 Type II and 24/7 SOC coverage" tells
the reader an MSP's marketing director types that prompt. That is the Family B and Family Q confusion CLAUDE.md §2
warns about. ADR-0006's `PromptPanelEntry` has no buyer field either. Below 1024, do not render the panel.

---

## 4. Pexels queries

The workflow extends `scripts/fetch-case-study-images.mjs` with `--set industries`. Hub images are landscape,
`orientation=landscape`, ≥1600×1000, and go to `public/images/industries/<slug>.jpg`. Featured images are portrait,
`orientation=portrait`, ≥1200×1500, and go to `public/images/industries/featured/<slug>.jpg`. Credits go in
`data/b2b/icp/industryImages.json`, keyed by `<slug>` and `featured/<slug>`, in the same shape as
`data/case-studies/images.json`. Use the primary query first and fall back if no frame passes §1.4. A human
reviews every pick against §1.4 before commit, and the alt text is rewritten if Pexels' text mentions a person or a brand.

**Featured (portrait):**

| Slug | Primary | Fallback |
|---|---|---|
| saas-and-software | data center corridor | server rack blue light |
| manufacturing-and-industrial | cnc machine metal sparks | precision machined metal parts |
| professional-and-business-services | law library bookshelves | spiral staircase library |

**All 21 (landscape, hub pages, plan step 3):**

| ID | Slug | Primary | Fallback |
|---|---|---|---|
| 01 | saas-and-software | server room blue light | fiber optic cables close up |
| 02 | professional-and-business-services | library bookshelves interior | classical columns building facade |
| 03 | healthcare-and-life-sciences | laboratory glassware | pipettes test tubes rack |
| 04 | financial-services | bank vault door | bank building facade architecture |
| 05 | manufacturing-and-industrial | cnc machine milling metal | machined metal parts close up |
| 06 | logistics-supply-chain-and-transportation | shipping containers port aerial | empty warehouse racking |
| 07 | construction-real-estate-and-built-environment | steel beams building frame | construction crane skyline |
| 08 | energy-and-utilities | solar panel field aerial | electricity pylons sunset |
| 09 | technology-and-it-services | network switch cables rack | circuit board macro |
| 10 | education-and-training | empty lecture hall | stack of books library |
| 11 | hospitality-travel-and-events | empty conference hall chairs | empty hotel lobby |
| 12 | agriculture-and-food | wheat field aerial | crop rows aerial |
| 13 | media-marketing-and-creative | printing press machine | camera lens studio |
| 14 | government-nonprofit-and-institutional | government building columns | capitol dome architecture |
| 15 | emerging-and-micro-niches | abstract light trails long exposure | fiber optic light abstract |
| 16 | aerospace-and-aviation | aircraft engine close up | empty airplane hangar |
| 17 | automotive-heavy-equipment-and-mobility | excavator construction site | car assembly line robots |
| 18 | commercial-and-facility-services | polished floor empty building lobby | maintenance tools wall |
| 19 | environmental-engineering-and-testing | water sample vials laboratory | laboratory glassware chemistry |
| 20 | retail-cpg-and-brand-enablement | cardboard boxes pallets warehouse | empty store aisle shelves |
| 21 | franchising-and-multi-location | aerial city grid buildings | row of shopfronts street night |

Reject any frame for retail (20) or franchising (21) that shows a legible brand. Rows 10, 11 and 14 must show empty
rooms only.

---

## 5. Must not change

- `BookCall` keeps `id="book"`, `CalBooking` with its consent gating, and `minHeight={680}`. `check-funnel` asserts it.
- Every "Book a call" link (`#book` on `/`, `bookHref` elsewhere) and every "Send an enquiry" link.
- `StickyCTA` and `FloatingWhatsApp` positions and offsets (`bottom: 88px; right: 20px` desktop, and
  `--wa-bar-h`-based on mobile). Nothing new is `position: fixed` or `sticky`.
- `LeadForm`, `/api/lead`, `/book` (calendar only), `/contact` (form only), analytics events.
- `HOME_FAQS` content, and therefore the FAQ JSON-LD.
- Titles, metas, H1s, URLs and canonicals on the 18 priority pages. The homepage H1 is untouched.

## 6. Budget

- Every section stays a **server component** (ADR-0005). The only client code added is `SectorTabs`, and
  `HeroSnapshotPanel` is removed, so `/` stays inside **40KB client JS**. Owen verifies with
  `check-served-page`.
- Motion: CSS plus the existing `ScrollReveal` and `MaskReveal` only. No framer-motion, no new observers, no
  scroll listeners. Everything degrades through the existing `prefers-reduced-motion` block in
  globals.css, plus the `motion-safe` and `no-preference` guards in §1.4.
- Images: none above the fold, so the Hero LCP stays text. Everything uses `next/image`, lazy, with `sizes`
  set. Target transfer at 1440 is **≤ 600KB** of images on `/`. That is a budget, not a measurement; Owen
  measures it.

## 7. Ruth: strings and numbers inside visuals

1. **Tracker (§3.1):** the title "AI visibility tracker" · the caption · "As of September 1, 2026" · the Named/Not named
   values · the five source-type labels · the two new sample brands and their domains · platform names used
   as column labels.
2. **Prompt panel (§3.2), if built:** "Prompt set" · "Fixed" · the Buyer values.
3. **BuyingProblem diagram (§2.3):** all eight labels, especially "YOUR FIRM?".
4. **FourLayers:** "Answer layers".
5. **Industries:** the ` (B2B)` suffix strip · the disclaimer trimmed to two sentences.
6. **Evidence:** the method-strip labels · the edited scoping sentence · **three KPI baseline→target
   numbers newly on `/`**, each labelled "target".
7. **Photos:** the alt text on every new Pexels image.

### 7.1 Ruth's result, 2026-10-07

| # | Item | Verdict | Note |
|---|---|---|---|
| 1 | Tracker strings | SHIP as amended | Date → "Sample run"; "Google AI Mode" → "Google AI Overviews"; caption rewritten; "Sources cited:"; Epic, NetSuite and two SaaS prompts replaced; no summary strip |
| 1 | Ondrell Software, Thornbury Precision | FIX before merge | [UNVERIFIED: trading-name check]. No obvious match on reading. Not in `SAMPLE_BRANDS` yet |
| 2 | Prompt panel | SHIP as amended | Buyer column removed; IT and MSP prompts with Pellman IT Group |
| 3 | Diagram labels | SHIP | All eight clear. YOUR ANALYTICS drawn solid, not dashed |
| 4 | "Answer layers" | SHIP | With "Start with the layer you need." restored |
| 5 | ` (B2B)` strip | SHIP | Disclaimer restored to all three sentences |
| 6 | Evidence labels and sentence | SHIP as amended | "commercial" dropped; sentence split |
| 6 | Three KPI figures on `/` | **Not cleared** | Cards render without figures. Reason in §2.7 |
| 7 | New Pexels alt text | Not reviewable yet | The files do not exist. Ruth reviews `industryImages.json` before commit. Alt text must be literal, and colour words are false under `.q-tint`'s grayscale filter ("vibrant colors", "warm orange hues", "blue sky" on the three Evidence photos). On tinted images, use `alt=""` or drop the colour words in the component |

Sample brands, all **[UNVERIFIED: trading-name check]**:

| Brand | Read |
|---|---|
| Northgate Mutual | **Swap before any use.** "North… Mutual" in an insurance context reads as Northwestern Mutual, a large US insurer. "Northgate" is also a common trading name in UK vehicle hire and public-sector software. Now unused on `/` |
| Harbour & Vane | No obvious match |
| Calderwood Risk | No obvious match |
| Pellman IT Group | No obvious match |
| Corran & Whitlow | Low risk. "Fenner" is a known UK industrial name, though not in law. Worth a check, as law-firm names collide often |
| Ondrell Software | No obvious match |
| Thornbury Precision | No obvious match. Thornbury is a place name, so check for local machine shops using it |

## NEEDS DATA

- ~~`[NEEDS DATA: operator confirms Scriblr is in production use]`~~ Resolved: operator, 2026-10-07.
- `[NEEDS DATA: Kyle's ADR-0006 amendment]`, covering the `ScreenId` values for the five tracker tabs (the
  current union holds one tracker screen with one brand), the two new `SampleBrand` members, a source-type
  tag field, a constant "Fixed" status on the prompt panel, and how `MentionState` (`cited` / `mentioned` /
  `absent`) maps onto the two visible states "Named" and "Not named".
- `[NEEDS DATA: trading-name check on all seven sample brands, and a replacement for Northgate Mutual]`. Owner: Iris.
- `[NEEDS DATA: per-client source for the case-study baselines, and why distinct firms share identical figures]`.
  Until it lands, no KPI figure renders on `/`.
- `[NEEDS DATA: the reporting export that fills `actual` on the case studies]`.
- `[NEEDS DATA: written permission on file to name Alliance Insurance Group, A CityWide Insurance and Gengler
  Insurance Agencies on the homepage]`. `guardrails.md` requires it for named client results. The cards carry no
  results after this review, but the names move from `/case-studies` to the most-seen page on the site.
