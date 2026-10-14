# Current implementation authority — 2026-10-03

The user approved a sitewide copy and funnel update in the dev checkout. These decisions supersede contradictory historical instructions below:
- Keep the existing Qognition logo, colours, typography and design. Rewrite messaging for B2B AI SEO/GEO, including SaaS.
- No public agency prices, price ranges or tiers; retain /pricing with tailored-scope content.
- Primary conversion is Book a call; secondary is Send an enquiry. ~~The existing GHL calendar remains.~~ Superseded 2026-10-14, see below.
- **Lead and booking stack, operator 2026-10-14.** This supersedes every GHL and Upstash rule in this file, including the 2026-10-06 amendment below.
  - GoHighLevel and Upstash are removed everywhere: code, env, docs.
  - Leads: `/api/lead` reports success only when Resend accepts the notification to hello@. Resend is the only acceptance boundary.
  - Booking: Cal.com, `cal.com/qognition-agency/15min`, embedded on /book. The operator deleted the Upstash and `NEXT_PUBLIC_LEAD_TRANSPORT` Vercel env vars on 2026-10-14.
  - Funnel: one form on /contact (5 fields) and one calendar on /book. No other page renders a lead form.
- Cover all 8,823 sub-niche IDs with substantive TOFU/MOFU/BOFU journeys. Generated mappings are not completed reviewed content.
- Qualified regional expansion is authorized; empty permutations are not publication-ready.
- Existing URLs and uncommitted drafts remain preserved. Candidate preview routes never imply production sign-off.
- ~~GHL persistence must precede lead success.~~ (Superseded 2026-10-14.) No production writes or nurture from preview tests.
  **Amended by the operator 2026-10-06 (superseded 2026-10-14, kept for history):**
  - When GHL is unconfigured or erroring, `/api/lead` sends the Resend notification to hello@ synchronously, and reports success only if Resend accepts it.
  - `LEAD_EMAIL_FALLBACK=off` restores strict GHL-first.
  - The Upstash ledger is optional. It adds exactly-once email and CAPI on retries, and GHL capture works without it.
- **Consent model, operator 2026-10-06:** split by region.
  - Opt-out (tracking on by default) for the US, Canada, Australia, UAE and Singapore.
  - Opt-in for the EEA, UK, Switzerland, China and India, plus any unknown region.
  - Google Consent Mode v2 mirrors each visitor's choice.
- **Operator decisions, 2026-10-07:**
  - **Case studies.** The case studies in `data/case-studies` are real client programmes, not illustrative scenarios. Pages may say so, and the "illustrative planning scenario" labels come off.
    - Each KPI stays labelled a target until its `actual` is filled from client reporting. `caseStudyEvidence()` is unchanged.
    - HVAC and dental are still consumer sectors and never appear as B2B proof.
    - Case-study images come from Pexels (key in `.env.local`, never committed). Use places, equipment and abstract scenes, never people in offices (§9).
  - **The free offer** is named **"Free AI visibility audit"** everywhere. It is free, with no turnaround promise: "We confirm timing when we reply."
  - **Conversion pages carry one element each.** /book is the calendar only and /contact is the form only.
    - Exception, operator 2026-10-08: /contact also lists the five offices below the form, as information rather than a second conversion.
  - **The ROI calculator** (`HeroRoiCalculator`) is deleted.
  - **B2B pages show B2B and insurance case studies only** (amended later the same day, see the named B2B bullet below). HVAC and dental stay on /case-studies.
  - **Published programme count: 49.** 45 local and insurance (5 more held, not published) plus the 4 named B2B.
  - **Visual upgrade within the same brand is approved.** The logo, teal palette, Geist and the light/dark rhythm stay.
    - Pages may cut copy and add icons, SVG diagrams, illustrative product screens (ADR-0006 rules), Pexels industry photos and AI-generated abstract imagery.
    - This supersedes §9's "keep it exactly" for layout and visuals, not for brand assets.
    - Lead form and booking behaviour do not change.
  - **Work happens on `main`, committed locally.** Nothing is pushed until production is approved.
  - **White-label B2B case studies, named.** Falcon Security, Brixio, Talentera and Sophos are published by name. The operator states they hold written permission and that the funnel figures are real results. This supersedes §2's "unnameable" and the blocklist on this record.
    - Pipeline dollar values and organic-session growth stay off the site: the source document itself calls the deal values "illustrative" and the session series a "model". They go on when real deal values and analytics exports arrive.
    - The operator states each client has confirmed the figures from its own reporting. They therefore meet the methodology page's definition of a reported result, and pages say "confirmed by client reporting".
    - The operator re-confirmed on 2026-10-08 after reading the source lines that call the figures "estimated" or arithmetic outputs (Talentera clicks and forms, Sophos 2,400 contacts). Every figure publishes as built. The operator holds the clients' reporting.
    - These four may appear as B2B proof next to insurance on B2B pages. HVAC and dental still never do.
  - **Hero tracker run** (ADR-0006 §11). The hero cycles through all 21 industries with a verbatim taxonomy prompt each, tracking "Your firm". The operator chose it over a chat-style AI answer, so ADR-0006 R1 stands.
    - It is the one exception to §9's "no auto-rotating sliders". It needs a Pause button, pauses on hover and focus, and does not auto-advance under reduced motion.
    - The operator confirms Scriblr tracks Claude in production, so the run has five columns: ChatGPT, Perplexity, Gemini, Claude and Google AI Overviews.
  - **Operator decisions, 2026-10-08 (after the second preview):**
    - **No "Illustrative" label on product screens.** The badge and its banner are removed everywhere. This overrides ADR-0006's visible-badge rule and §1's "illustrative interface" disclosure. The operator was told the hero can then read as real data.
      - The data rules stand: sample brands only, "Your firm" only, no figures, and screens are still never client data.
    - **Positioning line, operator 2026-10-08:** Qognition is an AI-native growth marketing agency selling AI SEO, generative engine optimization (GEO) and SEO to B2B firms. Copy is written to attract high-intent buyers and sell, using the writer's own craft. It does not just restate a brief.
    - **Homepage H1, operator 2026-10-08:** "Be the firm {platform} names when your buyer asks who to hire." The platform word spins like a slot-machine reel through ChatGPT, Claude, Gemini and Perplexity, each with its logo and brand colour.
      - This changes the H1 of priority page #1 by operator decision. The title and meta are unchanged.
      - The served H1 text stays a complete, stable sentence. The reel is decorative.
      - **§4 amendment, this H1 only.** Ruth ruled "Be the firm … names" a placement promise. The operator was offered "Give {AI} reasons to name your firm" and chose to keep "Be the firm {AI} names", on 2026-10-08. The promise ban still applies everywhere else.
      - The reel spins once, settles in under 5 seconds and replays on hover, so it is not a second continuously rotating element under §9.
    - **Messaging: "AI search is winning."** Copy sells fear (buyers ask AI who to hire, competitors get named, the shortlist forms without you) and desire (be the firm the AI names). Sitewide.
      - §4 still applies: no invented statistics, no guarantees, and no "you are invisible" stated as fact about the reader. Fear the reader can check beats fear we assert.
    - **/industries is rebuilt on the 21 taxonomy industries**, with the 341 sub-industries under them. The legacy 11 hubs and 66 sub-pages keep their URLs and are mapped in; nothing is redirected without Search Console data. /industries title, meta and URL stay fixed (priority page).
    - **Industries rebuild decisions (Nadia's spec `docs/seo/2026-10-industries-rebuild.md`):**
      - All 21 industry and 341 sub-industry pages publish together, once every page passes §7. This overrides the 90-day wave rule and ADR-0008's wave size.
      - A page needs no stored Scriblr run to publish. With no run stored, the observation section is omitted entirely, with no "Not tested yet" placeholder (§4: omit, never placeholder).
      - Prabal is the named reviewer, recorded in data and not printed on the page.
      - The legacy 11-card grid comes off the /industries hub. Each legacy page stays live and links to its new owner page.
      - /industries/financial-services becomes the B2B Financial Services industry page at the same URL, once its Search Console data is pulled. No redirects.
    - **Niche and sub-niche pages (2,376 + 8,823) come next**, after the operator approves the industries design. They must be researched and substantive, never a name swapped into a template.
    - **No GeoNames stat tiles** on the markets page. The CC BY credit line stays.
  - **Homepage approved** (hero animation still in build). Service and industry pages are next: they read thin.
  - **Plain English everywhere.** No technical jargon. Every message must be clear to a CEO or marketing lead on first read.
  - **No Pexels credit lines** on the site.
  - **Offices, operator 2026-10-08.** Qognition has offices in Toronto, New York, Dubai, Sydney and Gurugram (Gurgaon). There is no headquarters, so the site names none. Show city and country only, never street addresses.
    - This supersedes the Gurugram-only HQ answer of 2026-09-28 and §4's "countries served are never presented as physical offices" for these five cities only.
    - Every other market is served remotely, and no other city may be presented as an office.
  - **Service facts, operator 2026-10-07.** Monthly reporting is standard on every retainer. We run Microsoft Advertising for clients. Clients own their ad accounts. We do not run TikTok, Amazon or streaming-TV ads: they are not listed or offered, though their old URLs stay live.
- Deploy a preview for review. Do not publish or promote to production before explicit approval.
- Canonical taxonomy: data/b2b/icp/icp-taxonomy.json. Existing industry briefs: docs/icp-industries/. Preserve IDs and source contents.

Historical context follows. Do not restore superseded pricing, audit-first or layout instructions.

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
tracking and prompt monitoring, delivered as one retainer or one layer at a time (operator, 2026-10-07).

**Wedge:** evidence quality, not vertical occupancy.

The earlier claim here was "no AI-search agency has published a case study outside B2B SaaS." That
was **falsified on 2026-09-28** (`docs/research/b2b-vertical-substance.md`). Gorilla 76 publishes a
dedicated AEO-for-manufacturers page with a measurement method close to ours; Thrive publishes an
industrial-equipment GEO case; ranked lists of manufacturing, legal and professional-services GEO
agencies now exist. Do not restore that sentence.

What survives every source, and it got stronger on second pass: **nobody publishes a named client
with a dated, reproducible measurement.**

Vertical AI-search positioning now exists in all fifteen meta-verticals, so occupancy is gone as an
argument. But in eleven of them the visible supply is **self-ranking listicles**: the publisher puts
itself at number one and no entry carries a dated client result, including the publisher's own.
Four opened directly, four times the same shape — First Page Sage (legal), RevenueZen (professional
services), Siana (remodeling), Bluelinks (construction). Bluelinks alone publishes these for eleven
verticals and by pass 3 had added aircraft sales, automotive manufacturing, franchises, cleaning
services, contractors, building materials, local services and remodeling. First Page Sage now runs
the same play with self-ranked lists for aerospace and industrial. Seven opened directly across three
passes, publisher first in all seven. Of the genuine vertical specialists opened (Spiral, Carnegie,
Fintel Connect, Siana), one names a client and none publishes a dated reproducible measurement.

One detail not to over-claim: the Bluelinks construction list's seven weighted criteria **sum to
105%**, but the two lists opened in pass 3 both sum to 100. That was one page, not a house style.
Cite it as one page or not at all.

That is the claim to lead with, because a reader can check it on the day they read it, it does not
require us to have run a panel, and it ages well.

**Where occupancy still holds, and where it does not.** Commercial insurance remains uncontested
across all three passes. **TIC (industry 19: environmental consulting, environmental labs,
calibration, product testing) is the second genuine vacancy** — a targeted search on 2026-09-29 for
AI-search positioning aimed at it returned no vertical specialist and no listicle, and First Page
Sage's industrial list names manufacturing, construction, automation, engineering and robotics but
not labs or environmental. State it in that narrow re-runnable form, never as "nobody serves this
market". **Aerospace is occupied**, contrary to the assumption: The ABM Agency, First Page Sage and
Bluelinks all publish for it.

**Blocklisted numbers.** None of these may appear in copy, a chart, a deck, an ad or a proposal, and
no rebuttal of one may be phrased so as to imply we measured it.

| Figure | Source | Why |
|---|---|---|
| "+5,556% increase in AI referral traffic" | Thrive | "2025 internal performance results". No client, method or date. Has crossed into manufacturing and construction carried by third parties who drop the caveat |
| "287-415% ROI within 90-120 days" | The ABM Agency, aerospace | No client, method or date. The page also ranks itself first |
| "AI-sourced traffic converting at rates 25x higher than traditional organic" | The ABM Agency | Same unsourced conversion-rate claim pass 1 traced and could not find in the Semrush study. Now crossed into aerospace |
| "average 9.1x ROI" | The ABM Agency | No client, method or date |
| "lead volume up 50% within 30 days, up to 160% within 90" | ChoiceLocal, franchisor AEO | No client, method or date |

**Original blocklist entry, kept for the detail:** Thrive's "+5,556%". Attributed on Thrive's
own page to "2025 internal performance results" with no client, no method and no date. It has now
travelled into manufacturing and construction carried by third parties who drop the caveat. It is
the most-travelled unverifiable figure in this category. Never repeat it, and never write a rebuttal
of it phrased so as to imply we measured it.

**Commercial insurance remains genuinely uncontested.** No equivalent entrant was found. Lead the
occupancy argument only there.

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

**Assistants are no longer an organic-only surface, and every layer definition above assumed they
were.** Scorpion announced on 23 July 2026 (PR Newswire 302832718, observed) that it is an OpenAI
technology partner supporting advertising in ChatGPT and managing ChatGPT ad campaigns for clients.
Scorpion sells into franchise and multi-location, which is industry 21. `[NEEDS DATA: OpenAI's own
programme documentation. We have the partner's release, not the source.]` Until that is confirmed,
no page may describe paid placement in an assistant as a service we offer. Marcus owns the
commercial question; this note exists so nobody writes "assistants have no ads" on a page.

**Superseded by the operator on 2026-10-07: a client can start with any one layer.**
- AI SEO, GEO, SEO, local SEO or PPC can each be bought alone, and layers are added as scope grows. Technical SEO, on-page, off-page and authority work sit inside whichever layer they serve.
- Scope differs by locations covered, prompts tracked and assets produced.
- The old rule ("All four are in every retainer and are never sold separately") is retired. Do not restore it.

**B2B PPC is a real service we run for these clients, not a footnote.** Operator, 2026-09-28: "they
are our customers, we run ppc ads and do seo, ai seo, geo for them." It sits alongside the four
layers rather than inside them, because it is priced as a percentage of ad spend with a monthly
minimum and the four layers are priced by scope. A vertical page may sell paid media in the same
breath as organic; it may not imply PPC is bundled into the retainer price.

### Positioning copy

- **H1:** "Your buyers are asking ChatGPT who to hire. Most firms have never checked the answer."
  (An earlier draft read "We make sure it says you." That promised placement in a third-party
  system, which §4 forbids. The current line keeps the tension, is verifiable, and makes the free
  snapshot the obvious next step.)
- **Sales line:** "You rank in Maps, but ChatGPT names your competitor."
- Emphasis order sitewide: AI SEO and GEO first; SEO and Local SEO as the supporting layers that make
  them work.

---

### The tools we build

Qognition Labs (qognitionlabs.com) is the engineering arm. Four products, and they are the AI-native
proof: we run the work on software we wrote.

| Product | Does |
|---|---|
| **Scriblr** | **AI citation and GEO tracking.** Visibility per prompt and model, brand mention detection by name, alias and domain, citation analysis by source category, competitor share of voice, query fan-out. Raw answers, cited URLs and model versions are persisted, so every metric re-derives from a stored answer with a date. |
| **LinkersPro** | Authority and link acquisition. |
| **M.A.R.S.** | Lead routing, outreach and booking attribution. |

**The ICP lock names three engines, not four, and Scriblr owns citation tracking.**
`docs/icp-positioning.md` (operator-locked v2.0.0, 2026-09-29) lists exactly LinkersPro, Scriblr and
M.A.R.S. as the in-house engines nameable as proof. G.O.L.E.M does not appear. This file previously
gave citation tracking to G.O.L.E.M and content production to Scriblr; the locked file is newer and
is the operator's own, so it wins and G.O.L.E.M is not referenced on the site. Do not reintroduce it
without an operator decision, and do not quietly split the citation-tracking job across two names.

**Not "Linkdex."** That was a real third-party SEO platform brand and carries a trademark question.
LinkersPro is also already the name in 38 strings across `data/case-studies/*.ts`, so it stays.

G.O.L.E.M's auditability is the line worth putting on the site: every number traces to a stored
answer with a date. That is the claims discipline in §4, expressed as a product.

**Product screens on the site are illustrative interface, never client data.** The contract in
`docs/adr/0006-product-screen-contract.md` enforces this structurally: sample brand names are a
closed union with `.example` domains, so a real company name is a compile error, and
`provenance: 'illustrative'` is a required single-member union rather than an optional flag.

## 2. Who we sell to

### The ICP, final. Locked by the operator 2026-09-28.

> **Any B2B company doing $3M to $1B+ in revenue, with 20 to 10,000+ staff, that needs AI SEO, SEO
> or PPC.**

That sentence is the gate, and it is the whole gate. Read it literally before narrowing it.

| | |
|---|---|
| Revenue | $3M to $1B+ |
| Staff | 20 to 10,000+ |
| Business model | B2B. Not B2C, not B2B2C where the buyer is a consumer |
| Need | AI SEO, SEO or PPC. **Any one of the three qualifies.** Not all three |
| Retainer | **$3,000 to $20,000 per month.** Never show, mention or build a plan below $3,000 |
| Markets | USA > Canada > Australia > UK > Netherlands > Germany > Sweden > Denmark > Norway > Finland > Switzerland > UAE, plus Singapore, Ireland, China and India (China and India added by the operator, 2026-10-06). USD only. Markets are served, never offices |
| Go-to-market taxonomy | **`data/b2b/icp/icp-taxonomy.json`**, operator-locked v2.0.0. 21 industries, 341 sub-industries, 2,376 niches, 8,823 sub-niches |

**The taxonomy is a route to market, not a qualifier.** This is the distinction that matters and it
is easy to get backwards. A B2B firm inside the revenue and staff band qualifies whether or not its
industry appears in the taxonomy. The verticals exist because a page has to be written to
somebody in particular and a generic page converts nobody — not because a prospect outside them is
disqualified. A well-fitting inbound lead from an industry we never listed is a lead, and it routes
to a qualification call like any other.

**Any one of the three services qualifies.** A firm that wants only PPC is in the ICP. A firm that
wants only classic SEO is in the ICP. Do not write copy that requires a prospect to want AI search
before we will talk to them; AI search is what we lead with, not a condition of entry.

The upper bound moved today. It previously read "20 to 1,000+ staff, building for 20–200 first."
The staged-build hedges are gone: the operator states the band plainly and the site should too.

### The ICP taxonomy is locked

**Superseded on 2026-09-29.** The authoritative taxonomy is now
`data/b2b/icp/icp-taxonomy.json` (operator-locked v2.0.0, 21/341/2,376/8,823). `data/b2b/verticals.ts`
is the earlier 15/120 draft and is **not a second source of truth**: under `docs/icp-positioning.md`
rule 6, slugs and ids come from the JSON, and `verticals.ts` ids were invented before that file
existed. It survives only as an alias map for the two `draft` entities already built against it, and
ADR-0008 §3 specifies the re-key. Do not add rows to it and do not cite it as the ICP.

The section below describes that earlier draft and is kept because the two draft pages still resolve
through it.

**These are our customers.** Every row is a kind of firm we sell to and for whom we run paid media,
SEO, AI SEO and GEO. A row is **not** evidence we have worked in that vertical. §11 forbids implying
experience because a page or a row exists.

The 15 meta-verticals, by demand tier:

| Tier | Meta-verticals |
|---|---|
| **S** | SaaS and Software · Professional and Business Services · Manufacturing and Industrial · Technology and IT Services |
| **A** | Healthcare and Life Sciences · Financial Services · Logistics, Supply Chain and Transportation · Emerging and Micro-Niches |
| **B** | Construction, Real Estate and Built Environment · Energy and Utilities · Education and Training · Hospitality, Travel and Events · Agriculture and Food · Media, Marketing and Creative · Government, Nonprofit and Institutional |

Commercial insurance is a sub-niche of Financial Services, and is the flagship because it is the one
vertical with no equivalent competitor. It is no longer the only vertical the site addresses.

**Nothing in that file generates a route.** Every entity defaults to `state: 'spine'`: no page, no
sitemap entry, 404 on request. Promotion to `published` requires a named reviewer, a review date,
and the published ceiling raised in the same commit. `data/industries.ts` has no publication field
at all, which is exactly how 2,161 location pages reached the sitemap. Do not repeat it.

**The buyer split governs every page built from this taxonomy.** Family B is the prompt our client's
buyer asks ("find ISO 9001 and AS9100 certified CNC machining suppliers") — we run it, record it,
publish the observation, and can never be the cited answer to it. Family Q is the prompt our buyer
asks ("why doesn't ChatGPT recommend my machine shop") — that is what a page targets. Confusing the
two rebuilds the location pages a second time.

**Our buyer:** owner, CEO, marketing or growth leader. **Our client's buyer:** procurement, engineers,
IT leaders, finance leaders. Keep these distinct on every page.

### Where we have actually delivered, as distinct from where we sell

Two records, and conflating them produces a false claim in either direction.

**The B2B record is white-label and unnameable.** Managed IT and cloud, cybersecurity, and B2B SaaS
(partial). Four engagements, and the source document states that the work "was delivered through
white-label arrangements under signed NDAs", so **every one of them** is unnameable. That is why no
client is named, and saying so in the sentence is worth doing: it explains the anonymity instead of
leaving the reader to assume the client does not exist.

The same document holds the scope and duration at arm's length too ("service scopes and durations
reflect Qognition's supplied account of its work"), so the honest label on the whole engagement
record is **reported**, not observed. Every figure in it is an illustrative model output and is
blocklisted in `docs/research/b2b-vertical-substance.md` §2.2. None may appear in copy, a chart, a
deck, an ad or a proposal.

**There is also a named record, and it is not under NDA.** 45 case studies: 19 HVAC, 20 dental, 6
commercial insurance. So **never write that all our delivery is white-label** — it is not, and the
case-study library contradicts it on the same domain. The quantifier is scoped to the three B2B
verticals or it is wrong. Insurance is diagnostic only and every KPI in it is a target, not a result.

HVAC and dental are local consumer services and fall outside the ICP in §2, so they are not proof
for a B2B buyer and must never be rendered as related proof on a B2B page. Eight of eleven industry
hubs did exactly that until 2026-09-28; `scripts/check-industry-gate.cjs` now freezes the mapping.

Everything outside these two records is capability and method, and the pages must say so rather than
implying a history.

**Not a fit**, and these are the only disqualifiers: pre-revenue, B2C, low-ticket transactional,
needs leads this week, wants a one-off project, cannot edit their own website, or has no sales
process that follows up. Every one of these is about whether the work can succeed, not about which
industry the prospect is in.

Firms above the band stay eligible as inbound and route to a qualification call.

---

### Positioning, locked by the operator 2026-09-29

**Qognition is an established AI SEO and GEO agency with a substantial client record.** Write from
that footing. The self-deprecating register is retired: no page says "nobody has a record including
us", "the category is two years old", or any variant that leads with what we cannot do.

**What backs it, counted not asserted:** 45 named clients in `data/case-studies` across three
sectors, plus four white-label engagements under NDA in managed IT and cloud, cybersecurity and B2B
SaaS. Lead with the programme count. It is a fact, it is large, and no competitor in this category
publishes a comparable named library.

**The one thing that does not change.** `caseStudyEvidence()` grades all 45 `projected`, because
every KPI carries a baseline and a target and an empty `actual`. So a page may say we run 45 client
programmes, and may not present a target as an achieved result. That is not caution, it is the
difference between a claim a prospect can check and one they can catch. The gap closes with one
input, not with better wording: **`[NEEDS DATA: the reporting export that fills the `actual` column
on the 45 case studies.]`** The moment it lands, the cards upgrade themselves and the copy does not
have to change.

**On "the best in the world".** Written as a bare superlative it is unverifiable, and the operator's
own rule 11 bans that register. So the site does not print it. What it prints instead is the thing
that makes a reader conclude it: 45 named programmes, 21 sectors, a dated and reproducible
measurement method, and four in-house engines. In this category, where the visible competition is
self-ranking listicles with no dated client result (§1), being the firm that shows its work IS the
market-leading claim. Say it that way and it survives contact with a sceptic.

---

### Two operator decisions, 2026-09-29

**We sell white-label to agencies.** B2B marketing, demand-gen, ABM, PR and franchise-development
agencies are a CLIENT SEGMENT, not a competitor set. Five strings are simultaneously their buyer's
language and our own head terms: `b2b marketing agency`, `b2b seo agency`, `abm agency`,
`franchise marketing agency`, `franchise development marketing`. We do not compete for them, and
the locked taxonomy's own `geo_angle` on that sub-industry already said so: "Agencies buy GEO for
themselves."

Consequences. Copy addressed to agencies is written to an agency principal buying capacity, never to
their client. No page targets those five strings. Ruth reviews any copy in
`professional-services/b2b-marketing-and-demand-gen-agencies` and the franchise equivalent before it
ships, because the two audiences must not be able to read each other's page.

**The free audit is form-first and human-delivered. There is no automated AI half.** Operator:
"just do the form for now, we get the details, review and then revert back to them, they are our
leads."

So the funnel is: form captures → a human reviews the prospect → we come back to them with the
snapshot. `lib/audit/aiVisibility.ts` stays wired and stays unconfigured, so it renders `not_checked`
rather than a guess, and no provider key is set. That is a deliberate product decision, not a gap.

What it makes load-bearing: **the form is now the entire lead channel.** A lead lost at the endpoint
is a lead lost outright, not a lead that arrives by another route. Every failure mode in
`/api/lead` is therefore a revenue defect rather than a monitoring one.

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
| `lib/leadDelivery.ts` | Resend delivery. The hello@ notification is the only acceptance boundary (operator, 2026-10-14). There is no CRM and no ledger |
| `app/api/cal/webhook/route.ts` | Cal.com `BOOKING_CREATED` webhook, HMAC-verified with `CALCOM_WEBHOOK_SECRET`. Records `walkthrough_booked` |
| `lib/leadQualification.ts` | MQL scoring. Constrains how short the form can be |
| `lib/analytics.ts` | `track()` → dataLayer + gtag + Meta with shared dedup `eventID`; UTM attribution |
| `lib/consent.ts` | Regional defaults via `consentDefaultFor()` (opt-out US/CA/AU/AE/SG, opt-in elsewhere), GPC honoured for advertising |

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
- `walkthrough_booked` is **server-side only**, from the Cal.com webhook (2026-10-14; it was GoHighLevel).
  The booking lives in an iframe, so the parent page cannot see a completed booking. Until a GA4 Measurement
  Protocol path exists, it is recorded in logs only. Count distinct `booking_uid`.
- Retries must not double-count. With no ledger, the browser reuses `event_id`, Meta merges CAPI by
  `event_id`, and success events fire once per success response. A lost 200 can still produce a second
  hello@ email; the operator accepted that.
- **No sensitive data in analytics events.** Never send `email`, `phone`, `name` or the free-text
  `message` field into GA4 or GTM.
- Capture click IDs (`gclid`, `wbraid`, `gbraid`, `li_fat_id`, `msclkid`) on the lead record, or
  offline conversion import is impossible.
  Implemented 2026-10-14: read with advertising consent only, validated by `lib/clickIds.ts` (invalid IDs dropped, never a 400), dropped again by `/api/lead` unless the server allows advertising, and shown with their capture date as "First ad click" and "Latest ad click" in the hello@ email. This code never adds them to an analytics or Meta event payload; when advertising is off, only the landing page_view is stripped; other GA4 hits sent while the visitor is still on the landing URL (events, scroll, engagement) carry the raw URL with the click IDs (observed 2026-10-14, headless browser, hits aborted). [UNVERIFIED: tags inside the GTM container, which loads under analytics, and Microsoft Clarity still see the raw landing URL.]
- Attribution must outlive the session. A multi-week consideration purchase loses first touch if it
  is stored in `sessionStorage`.
  Implemented 2026-10-14: with advertising consent, `getAttribution()` keeps click IDs in localStorage, and with analytics consent as well it keeps first touch there, for 90 days after the last campaign or ad click, and each click ID for 90 days after its own capture, never extended; without it, session-only as before.

---

## 9. Design

**The site alternates light and dark, and that rhythm is the design.** Light hero on warm off-white,
dark near-black CTA and feature bands, light content, dark again. Large display type, teal accents,
bordered card grids with mono uppercase labels. Do not flatten this to one surface. The operator
confirmed the existing qognitionagency.com treatment on 2026-09-28: keep it exactly.

Dark sections are scoped, never applied at `:root`, so the alternation stays expressible without an
`!important` war. `app/layout.tsx` imports at most two stylesheets.

**This is a rebrand, not a redesign.** Every template on qognitionagency.com is kept: the homepage,
`/case-studies`, `/services/[service]`, `/industries/[industry]`. **Meta titles, descriptions, URLs
and internal linking do not change.** The work is repositioning the copy from generalist digital
marketing to AI SEO and GEO for B2B firms, and widening the industry coverage.

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
