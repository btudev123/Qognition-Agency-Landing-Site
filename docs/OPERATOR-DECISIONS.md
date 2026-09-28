# Open decisions and blockers

Consolidated from Kyle (architect), Elena (creative), Theo (content), Nadia (search),
Iris (research), Marcus (performance), Rafael (sales), Owen (quality) and Ruth
(brand-guard). Updated 2026-09-28. Nothing publishes until the items marked
**BLOCKER** are resolved.

## Only you can answer these

| # | Decision | Blocks |
|---|---|---|
| 1 | **Which office claim is true.** `/contact` says London, New York, Dubai, **Mumbai**. `/about` and `/team` say London, New York, Dubai, **Bangalore**, Sydney. DesignRush and Tracxn say **Gurugram**. | `ProfessionalService` schema, the trust section, and any outbound that points at the site |
| 2 | **Snapshot delivery SLA** the team can actually hold at current volume | `/audit` and the homepage both promise a turnaround |
| 3 | **Is the 15-minute recorded walkthrough actually produced?** If not the bullet is cut | `/audit` |
| 4 | **Final platform list**, and whether Claude is in the free tier. Today the copy sells five platforms in one place and four in another | `/audit`, `/geo`, homepage |
| 5 | **Every pricing tier scope figure** (locations, prompts tracked, assets per month) | `/pricing` — Ruth's ruling is ship the prose section and cut the table until every cell is real |
| 6 | **PPC management fee percentage and monthly minimum**, or say "Request pricing" there too | `/ppc` |
| 7 | **Named compliance reviewer** for the insurance page, and which states' advertising rules apply | Ruth will not clear `/industries/insurance` above FIX without one |
| 8 | **Can the six published insurance case studies be used by client name?** | The flagship page's only proof |
| 9 | **Monthly spend ceiling for the snapshot** in dollars | The snapshot cannot open to the public without it |
| 10 | **Is a durable KV/Postgres store provisioned on Vercel?** | The spend ceiling cannot be enforced without one |

## Blockers the team can clear, once the above land

- **BLOCKER — the Google citation.** Copy cites `developers.google.com/search/blog/2026/06/gen-ai-performance-reports` for a "worldwide 31 August 2026" rollout. The slug is dated 2026/06, which is the launch post. Either cite a source that carries the August statement or drop the date. A page arguing "we date our claims" cannot ship a link that contradicts its own sentence.
- **BLOCKER — the insurance H1.** "Right now it's sending them to an aggregator" asserts a present state of ChatGPT with no platform, prompt set or date, and breaches the guard 38 lines below it on the same page.
- **BLOCKER — snapshot copy overstates the engine.** `runAudit()` fetches one page plus robots, sitemap and `llm.txt`, then regex-scores it. It does not sample prompts. Three lines in `/audit` claim more than that.
- **BLOCKER — legacy families still live.** `lib/legacy-publication.ts` demotes exactly one URL. `/services/*/[subService]`, `/industries/*`, `/locations/*`, `/regions/*`, `/directory/*` and `/free-tools/*` are all still indexable. New copy arguing "we do not publish a page because a URL combination exists" is one click from 2,161 pages that do.
- **BLOCKER — redirects fail the build.** `scripts/check-publication.cjs` asserts every baseline URL stays discoverable, so `lib/legacy-publication.ts` must change in the same commit as any redirect.
- **BLOCKER — 18 rules in `next.config.mjs` point at `/free-ai-audit`.** All must re-point to `/audit` together or they become two-hop chains.

## Claims defects found in live code

- `components/interactive/AICitationSimulator.tsx` fabricates an AI answer with invented citations. Delete.
- Seven ROI and traffic calculators output projected numbers with no measurement behind them.
- `data/trust.ts` carries five platform "partner" logos marked `[UNVERIFIED]`.

## Accessibility defects on the live site

| Issue | Measured | Fix |
|---|---|---|
| `--accent: #14B8A6` used as text | 2.49:1 | re-point to the existing `--accent-deep: #0F766E` (5.47:1) |
| `Button` primary | 2.20:1 | token change |
| `Input` focus indicator | none meeting 3:1 | `focus:outline-none` with a 20% opacity ring |
| `growth.css` | olive/sage, not brand; text to 9px | hides the header CTA below 760px, roughly 60% of traffic |
