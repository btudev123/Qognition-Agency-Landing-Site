# Industries hub `/industries` · intro only · copy v1

**Author:** Theo (content) · 2026-10-07 · plan step 2.7
**Status:** DRAFT. Ruth gates, then Mira wires. No `.tsx` edited. `app/industries/*` is another developer's area (Nadia §3.3); Mira coordinates before wiring.
**File:** `app/industries/page.tsx`: hero (lines 50 to 56), the three intro cards (lines 61 to 65), the ICP section intro (lines 164 to 167), the closing CTA (lines 227 to 238). The legacy industry grid is out of scope.
**Objection codes:** Marcus `03` §5.2 (M1 to M6).

---

## Brief

1. **Search intent.** "b2b industries", or a reader from the homepage "See every sector" button checking whether we sell to firms like theirs (M5). Nadia's title targets "B2B industries we serve: AI SEO, SEO and PPC".
2. **AI-citation angle.** "Qognition Agency sells AI SEO, GEO, SEO and PPC into 21 B2B sectors; a sector page is published only after review." The 21 is a count of the locked taxonomy (`data/b2b/icp/icp-taxonomy.json`), a fact about where we sell. It is not a client claim. `docs/icp-positioning.md` v2.1 asks to avoid exposing taxonomy counts, so the visible copy below does not print it.
3. **Internal links.** Out: `/industries/environmental-engineering-and-testing` (auto-linked by the page once deployed), `/book`, `/services/*`. In: nav, `/` Industries, `/contact`.
4. **The one claim this page owns.** A sector name becomes a link only when its page has been written and reviewed. Listing a sector is not a claim of experience in it.

---

## Audit of the current intro

| | |
|---|---|
| What it says now | H1 "Industries We Serve". Sub: "AI SEO and GEO built around the questions your B2B buyers ask…" Three cards. "Core Services Across Industries". Legacy grid. ICP section "Built for specialist B2B businesses". CTA "Need a market-specific plan?" |
| Positioning | Sub-line is right. Card 2 says "founders, CMOs, operators, and revenue teams": correct buyer |
| Objections not answered | M5 partly, M6 (PPC not named in the intro) |
| §1 / §4 issues | None in the intro. The page never states that a listed sector is not a claim of experience, which `CLAUDE.md` §11 needs somewhere near a 21-sector list |
| CRO | Closing "Book a call" opens `/book` in a **new tab** (`target="_blank"`, line 233). Same-tab, please |
| Metadata | The schema `description` (line 38) still reads "AI growth marketing pages for SEO, PPC, web design, AI visibility, social, branding, and creative". Nadia owns; flagged |
| Banned words, em dashes | None |

**Verdict: edit.**

---

## Copy

**Badge:** keep "Industries". **H1:** keep "Industries We Serve" (Nadia §3.3).

**Sub-line** (line 54):

> AI SEO, GEO, SEO and PPC for B2B firms, written to the way your buyer decides: a software evaluation, an RFQ, a regulated purchase or a specialist consultation.

**Three cards** (lines 62 to 64):

1. We write to your buyer's decision: the spec an engineer checks, the integration an IT lead needs, the expertise a CFO looks for.
2. The pages speak to the people your sales team wants to meet, and we judge them on qualified enquiries, not traffic.
3. Every sector page ends with a clear next step: a call with us, and the evidence behind what we say.

**"Core Services Across Industries"** H2: keep.

**ICP section intro** (line 166). H2 "Built for specialist B2B businesses": keep. Paragraph:

> We sell AI SEO, GEO, SEO and PPC into every sector below. A name becomes a link once its page has been written and reviewed. Listing a sector is not a claim that we have worked with a firm in it, and a sector that isn't listed is no reason to stay away.

**Closing CTA** (lines 227 to 238). H2: keep "Need a market-specific plan?". Body:

> Bring your industry, your markets, your sales cycle and the buyers you want to reach. We'll tell you what we would check first.

Button: `Book a call` → `/book`, **same tab**.

---

## Out of scope, recorded

- The legacy `INDUSTRIES` grid renders `painPoints` in red boxes and links legacy sub-industries. Its copy is unaudited in this pass.
- The schema `description` string. Nadia.
