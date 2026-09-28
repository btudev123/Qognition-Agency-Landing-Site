# Qognition Agency — Project Bible

> **qognitionagency.com**. A B2B AI search visibility agency. We get established B2B firms found when
> their buyers ask an AI which vendor to hire. Single Next.js codebase, single deploy, single lead
> endpoint.

**This file was rewritten 2026-09-27.** The previous version described a "Hub + 4 Spokes" model
(marketing / tech / finance / automation) that has been retired and 301'd. If you find code or docs
referring to spokes, they are dead. Do not rebuild them.

---

## 1. What we sell

**Offer:** AI search visibility for B2B firms. GEO, AI SEO, AEO, entity optimisation, citation
tracking and prompt monitoring, delivered as one retainer.

**Wedge:** verticals where no AI-search agency has published a single case study. Every serious
competitor (Radyant, LoudFace, Omnius, Minuttia, Graphite, Omniscient) proves exclusively in B2B
SaaS. We prove in insurance, professional services, IT services and manufacturing.

**Bundling is not a differentiator.** Six competitors already sell "SEO and AI search as one motion".
Describe the scope, never lead with it. Lead with the vertical.

### The four layers, defined identically everywhere

Never blur AI SEO and GEO. They are different surfaces.

| Layer | Surface |
|---|---|
| **SEO** | Google search results |
| **Local SEO** | Google Maps, local pack, Bing Places, Business Profile, reviews, listings |
| **AI SEO** | Google AI Overviews and AI Mode |
| **GEO** | ChatGPT, Perplexity, Gemini, Claude, Copilot |

All four are in every retainer and are never sold separately. Technical SEO, on-page, off-page and
authority work are in the box too. Tiers differ by **scope only**: locations covered, prompts
tracked, assets produced.

**B2B PPC** is a separate offer, priced as a percentage of ad spend with a monthly minimum.

### Positioning copy

- **H1:** "Your buyers are asking ChatGPT who to hire. Most firms have never checked the answer."
  (An earlier draft read "We make sure it says you." That promised placement in a third-party
  system, which §4 forbids. The current line keeps the tension, is verifiable, and makes the free
  snapshot the obvious next step.)
- **Sales line:** "You rank in Maps, but ChatGPT names your competitor."
- Emphasis order sitewide: AI SEO and GEO first; SEO and Local SEO as the supporting layers that make
  them work.

---

## 2. Who we sell to

| | |
|---|---|
| Revenue | $3M to $1B+, **building for $3M–$50M first** |
| Staff | 20 to 1,000+, **building for 20–200 first** |
| Flagship vertical | US commercial and specialty insurance agencies, MGAs, wholesale brokers, 5–50 producers |
| Secondary | B2B professional services (CPA/tax advisory, corporate law boutiques, management advisory); IT services (MSPs, MSSPs, cybersecurity consultancies, cloud partners) |
| Markets | US primary, Australia secondary. USD only |

**Our buyer:** owner, CEO, marketing or growth leader. **Our client's buyer:** procurement, engineers,
IT leaders, finance leaders. Keep these distinct on every page.

**Not a fit:** pre-revenue, low-ticket transactional, needs leads this week, wants a one-off project,
cannot edit their own website, or has no sales process that follows up.

Larger firms stay eligible as inbound and route to a qualification call.

---

## 3. The funnel

```
Free snapshot  →  walkthrough call  →  scoped proposal  →  retainer
```

**North Star: booked qualified walkthroughs per month.** Retainers signed is the lagging measure.
Traffic, rankings and AI mentions are supporting indicators, never the target.

The snapshot's job is the appointment, not revenue. The paid audit is offered **on the call**, as the
entry point for prospects who will not commit to three months. It is not a headline product.

**Acquisition is not inbound.** At current volumes the site cannot produce clients this quarter.
Channel order: existing named accounts (referral has been ~100% of acquisition) → partnerships with
agency networks and M&A advisors → snapshot-led outbound → podcasts → associations → paid, last.

---

## 4. Claims discipline

This is the rule that outranks every growth idea in this file.

- **No number appears anywhere that was not measured.** Not in copy, not in a chart, not in an ad.
- **No guarantee.** No promise of rankings, citations, placement in any AI system, or revenue. We do
  not control third-party systems and we do not pretend to.
- **Case-study KPIs are labelled targets until `actual` is populated** from client reporting.
  `caseStudyEvidence()` enforces this in one place. Do not weaken it. Do not put a benchmark-derived
  figure in `actual`.
- **Countries served are never presented as physical offices.**
- **A sampled AI result is an observation on a date, not a state.** Always state the platform, the
  date, the prompt set and the limits. "We tested 15 prompts on 12 Oct" is honest. "You are invisible
  in AI search" is not.
- Where evidence does not exist, omit the section. Never fill it with a placeholder.

---

## 5. Architecture

**Stack:** Next.js 16.2.5 (App Router, Turbopack) · React 19.2.6 · TypeScript 5.9.3 ·
Tailwind 3.4.18 · Sanity 6 · Zod 4 · **pnpm**. Hosted on Vercel.

### Routes

```
/                              Homepage
/seo  /local-seo  /ai-seo  /geo  /ppc     One page per layer, plus PPC
/pricing                       Tiers by scope, no published prices, "Request pricing"
/audit                         The AI visibility snapshot
/industries/insurance          Flagship, deepest page
/industries/professional-services
/industries/it-services
/case-studies  /insights  /about  /contact
/api/lead                      Single lead endpoint, every form
```

Legacy `/services/*`, `/industries/*`, `/locations/*`, `/directory/*`, `/glossary/*` are being
consolidated. See §7 before touching any of them.

### Key files

| Path | Role |
|---|---|
| `lib/seo.ts` | `SITE_URL`, `metadataFor()`, `SEO_OVERRIDES`, canonical + robots |
| `lib/legacy-publication.ts` | **The demotion lever.** Gates both `<meta robots>` and sitemap inclusion from one map |
| `lib/sitemap.ts` | Multi-family sitemap index |
| `lib/growth/publication.ts` | Route gate: `status` / `indexable` / `inNavigation`, three orthogonal flags |
| `data/growth/taxonomy.ts` | Sector → niche → subniche entity spine |
| `components/growth/GrowthPage.tsx` | Discriminated switch on `page.kind`. New page types are a new kind plus a branch, never a new route |
| `lib/auditEngine.ts` | Crawl + scoring for the snapshot. `normalizeTargetUrl` is the SSRF guard, keep it |
| `lib/leadDelivery.ts` | Resend delivery. Email is the durable record |
| `lib/leadCrm.ts` | GoHighLevel, optional side-channel |
| `lib/leadQualification.ts` | MQL scoring. Constrains how short the form can be |
| `lib/analytics.ts` | `track()` → dataLayer + gtag + Meta with shared dedup `eventID`; UTM attribution |
| `lib/consent.ts` | Opt-out model, defaults to allow |

---

## 6. Environment gotchas (read before debugging a build)

**The repo currently lives in iCloud Drive on a near-full disk.** This causes real, repeatable
failures that look like code bugs and are not:

- `git status`, `git diff` and recursive `grep` hang for minutes.
- Files get evicted to placeholders. `ls` shows a size, the content is gone.
- iCloud creates conflict duplicates named `<name> 2.tsx`. `tsconfig.json` globs `**/*.ts`, so these
  reach the build. **Stage by explicit path. Never `git add .`**
- `node_modules/next` has been clobbered this way and hand-patched to a `/tmp` symlink, which breaks
  Turbopack's workspace-root inference with a misleading error. If the build says it cannot find
  `next/package.json` from the `app` directory, check `ls -la node_modules/next` first.

**Build verification happens on Vercel, not locally**, until the repo is moved off iCloud.

**Build command:** gates run before `next build`. Keep them there. `scripts/audit-headings.mjs`
enforces typography; `scripts/test-growth.cjs` and `scripts/check-publication.cjs` enforce the
publication invariants.

---

## 7. Programmatic SEO — when to expand, when to stop

September 2026 standard. Google's spam policy judges **unoriginal content that adds no value,
regardless of how it was created**. The method is not the offence.

**Expand a branch only when all are true:**
1. ≥90 days since its last publication wave.
2. ≥60% of its indexable pages have ≥1 impression in the last 28 days.
3. ≥1 page ranks top-20 for its primary query, or has produced a conversion.
4. Median position flat or improving.
5. Site-wide indexable pages ÷ monthly organic sessions within the agreed ratio.

**If any fail, improve or prune that branch. Do not add pages to it.**

**Before `indexable: true`, a page must:** answer one buyer question no other indexable page answers ·
carry ≥3 entity-specific facts not derivable by substituting a name into a template · be ≥40% unique
against its closest sibling · have a named reviewer and review date · cite real evidence. Geo pages
additionally need a named client, a case study, or documented local demand.

**Kill rule:** zero impressions after 180 days → consolidate and 301.

**Before removing, redirecting or noindexing anything:** pull Search Console data for that URL group
first. Backlinked URLs are never 410'd regardless of clicks. A large URL count alone does not prove
the pages are low quality — one of the highest-ranking pages on this domain was a glossary URL.

**Never:** publish a combination because the URL exists · substitute a city or industry name into a
template and call it a page · generate industry × service × city pages.

---

## 8. Measurement

Events, `snake_case`, defined once in `lib/analytics.ts`:

`snapshot_started` · `snapshot_completed` · **`walkthrough_booked`** (North Star) ·
`audit_purchased` · `contact_submitted`

- **A booking-link click is never a booking.** `CalBooking.tsx` fires `booking_widget_view` and says
  so in a comment. That comment is load-bearing. Do not "improve" it into a booking event.
- `walkthrough_booked` is **server-side only**, from the GoHighLevel webhook. The booking lives in an
  iframe; the parent page cannot see a completed booking.
- `/api/lead` returns `duplicate`; retries must not double-count.
- **No sensitive data in analytics events.** Never send `email`, `phone`, `name` or the free-text
  `message` field into GA4 or GTM.
- Capture click IDs (`gclid`, `wbraid`, `gbraid`, `li_fat_id`, `msclkid`) on the lead record, or
  offline conversion import is impossible.
- Attribution must outlive the session. A multi-week consideration purchase loses first touch if it
  is stored in `sessionStorage`.

---

## 9. Design

**Dark is the primary surface.** Near-black ground, large display type, teal accents, bordered card
grids with mono uppercase labels. This is the language of the design the operator chose, and it is
already built in the repo. Light is retained for long-form reading surfaces (articles, docs, legal).

Dark tokens are scoped to `[data-theme="dark"]`, never `:root`, so a per-route split stays
expressible without an `!important` war. `app/layout.tsx` imports at most two stylesheets.

Strong typography, generous spacing, restrained motion, accessible contrast and visible focus states,
excellent mobile.

**The focus ring is `--accent-deep` (#0F766E, 5.47:1), never `--accent` (#14B8A6, 2.49:1).** The
brighter teal fails WCAG 2.1 SC 1.4.11 and was the site-wide focus indicator until 2026-09-28. Use
`--accent-fill` for graphics that are not text or indicators.

- Real screenshots, diagrams and evidence. **No decorative dashboards with invented metrics.**
- No stock photography of people in offices.
- No carousels or auto-rotating sliders.
- Respect `prefers-reduced-motion`.
- WCAG AA minimum on all text.

## 10. Copy rules

Plain, specific, short sentences. **No em dashes.**

Never use: "unlock", "supercharge", "leverage", "seamless", "game-changer", "in today's digital
landscape". No superlatives without a cited, dated source. No claim we cannot prove. Only numbers
that have a source.

---

## 11. Anti-patterns

- Rebuilding the retired 4-spoke model.
- Leading with "one retainer, four layers" as the differentiator. It is table stakes.
- Generating industry × service × city pages.
- Publishing a page because a URL combination exists.
- Presenting targets as achieved results.
- Claiming offices that do not exist.
- Promising rankings, citations or AI placement.
- Selling GEO as a secret markup technique.
- Implying experience in an industry because a page exists for it.
- Counting a booking-link click as a booking.
- `git add .` in this repo.
