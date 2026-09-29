# The conversion event is per-vertical

Owner: Marcus (performance). Dates: 2026-09-28, extended 2026-09-29 (§3A, §4A, §6.1). Branch: `b2b-ai-search`.
Status: typed input for ADR-0007. This is a data specification, not prose to be interpreted.
Nothing here is copy. Ruth runs before any sentence derived from it reaches a page.

Reads: `docs/research/b2b-vertical-substance.md` (Iris) §3.7, §4.4, §5.4, §6.1 to §6.6,
`data/b2b/verticals.ts`, `docs/adr/0007-b2b-niche-page-architecture.md` §3.1,
`docs/seo/b2b-niche-architecture.md` §4.3, `CLAUDE.md` §2 and §4.

---

## 0. The one distinction this whole file exists to protect

There are **two** conversion events in play on any vertical page and they belong to different
people. Collapsing them is the failure mode.

| | **Our client's conversion event** | **Qognition's conversion event** |
|---|---|---|
| Whose buyer | The client's buyer. Procurement, an engineer, a CISO, a General Counsel | Our buyer. The owner, CEO, marketing or growth leader |
| Prompt family | Family B (`verticals.ts` header) | Family Q |
| What it is | Per-vertical. A drawing upload, a sample request, a rate request, a bid invitation | Always the free snapshot, then a booked walkthrough. `CLAUDE.md` §3 |
| Where it appears on the page | As the **diagnosis**. "Here is the action your buyer takes, and here is why an assistant never gets them to it" | As the **call to action**. One primary CTA, per `docs/seo/b2b-niche-architecture.md` §4.3 |

**A machining page must never render "Upload your drawing" as its CTA.** That would be selling to the
client's buyer, on Qognition's own site, and it is the same category of error as the location pages.
The machining page describes the drawing upload and asks for the snapshot.

The reason the per-vertical field has to exist at all is the inverse error, which is the one that
prompted this document: a template rendering "Book a demo" on a machining page. Iris §3.7 is blunt
about it. None of the six manufacturing conversion events is a demo, and a commercial director who
reads "book a demo" on a page about their business concludes, correctly, that the author has never
sold anything industrial.

---

## 1. The type

Lift straight into `data/b2b/conversion-events.ts`. It follows the ADR-0007 §3.1 pattern: variants
rather than flags, payload travelling with the variant, and a state that cannot be published.

```ts
// data/b2b/conversion-events.ts

import type { IsoDate, ReviewerName, SourceRef } from './types';
import type { MetaVerticalId } from './verticals';

/**
 * The action the CLIENT'S buyer takes. Never Qognition's CTA.
 * A closed union, ADR-0006 SampleBrand pattern: an unlisted event is a compile
 * error, not a review finding. Adding a member is a reviewed change.
 */
export type ClientConversionEventId =
  // The buyer brings a file. Highest intent in any vertical that has one.
  | 'drawing-upload'
  | 'bom-enquiry'
  | 'sample-submission'
  // The buyer takes an artefact away. A conversion in its own right. Instrument it.
  | 'cad-download'
  | 'datasheet-download'
  | 'certification-pack-request'
  // The buyer asks for a specific commercial answer.
  | 'sample-request'
  | 'part-selection-request'
  | 'quote-on-part-number'
  | 'cross-reference-lookup'
  | 'scoped-quote-request'
  | 'spec-request'
  | 'credit-application'
  | 'utility-bill-analysis'
  | 'role-brief-submission'
  // The buyer asks for an engagement with a person.
  | 'application-review'
  | 'site-survey'
  | 'it-assessment'
  | 'security-assessment'
  | 'scoped-assessment'
  | 'clinical-evaluation'
  | 'evaluation-unit'
  | 'architecture-consultation'
  | 'named-consultation'
  | 'scoped-engagement-conversation'
  | 'discovery-call'
  // Software self-serve. Mutually destructive with each other; see §3.
  | 'sandbox-key'
  | 'self-serve-signup'
  | 'trial'
  | 'poc'
  | 'demo'
  // Procurement. A cold click cannot enter any of these. See b2b-paid-structure.md §3.
  | 'tender-invitation'
  | 'bid-invitation'
  | 'prequalification-submission'
  // Added 2026-09-29 by the 21-industry extension. Rationale per member in §3A.1.
  // The union is closed on purpose: an unlisted event is a compile error, so these
  // have to be added here before any §3A profile will typecheck.
  | 'capability-approval-lookup'
  | 'exchange-unit-request'
  | 'availability-check'
  | 'line-review-request'
  | 'emergency-dispatch-request'
  | 'compliance-inspection-booking'
  | 'franchise-candidate-application';

/** Where the action physically happens. Decides what the page must carry. */
export type CaptureSurface =
  | 'file-upload'      // needs an upload control and a file-size and format statement
  | 'gated-download'   // needs the asset to exist before the page ships
  | 'on-page-form'     // a form, and the qualifying question is the whole design
  | 'self-serve'       // no form. A gate here destroys the conversion
  | 'offline';         // happens in a procurement system. Not capturable on a website

/** How long from event to revenue. A band, never a number. Numbers need a source. */
export type CycleBand = 'same-week' | 'weeks' | 'months' | 'unknown';

export interface ClientConversionEvent {
  readonly id: ClientConversionEventId;
  readonly label: string;
  /** What the buyer brings, or takes away. One noun. */
  readonly artefact: string;
  readonly capture: CaptureSurface;
  readonly cycle: CycleBand;
}

/**
 * Where an assignment came from. `unknown` is a real, useful state: it says the
 * research has not been done and blocks publication rather than inviting a guess.
 */
export type ConversionProvenance =
  | { readonly kind: 'sourced'; readonly source: SourceRef; readonly section: string }
  | { readonly kind: 'inferred'; readonly by: ReviewerName; readonly at: IsoDate; readonly basis: string }
  | { readonly kind: 'unknown'; readonly needs: string };

export interface ConversionProfile {
  /** Absent subNiche = the meta-vertical default. Present = an override. */
  readonly meta: MetaVerticalId;
  readonly subNiche?: string;
  readonly primary: ClientConversionEventId;
  readonly secondary: readonly ClientConversionEventId[];
  /** Events that are actively wrong here. Rendering one is the bug this file prevents. */
  readonly prohibited: readonly ClientConversionEventId[];
  /** One sentence. What the page must therefore contain. Not marketing copy. */
  readonly pageImplication: string;
  readonly provenance: ConversionProvenance;
}
```

### 1.1 Resolution, and the rule that makes it safe

```ts
/** Sub-niche override wins. No inheritance beyond that. */
export function resolveConversionProfile(
  meta: MetaVerticalId,
  subNiche?: string,
): ConversionProfile | undefined { /* … */ }
```

**Gate rule, for `scripts/check-b2b.cjs`:** an entity may not reach `state: 'published'` when its
resolved profile is missing, or when `provenance.kind === 'unknown'`. An `inferred` profile may
publish only when the ADR-0007 `Review` block names a reviewer who has accepted the inference.

That rule is the point of the `unknown` variant. Seven of the fifteen meta-verticals have no
sourced conversion event (§4). The correct behaviour is that those pages cannot publish, not that
somebody writes a plausible one into a template.

### 1.2 A second field ADR-0007 needs at the same time

The Qognition-side CTA framing is also per-vertical, and `docs/seo/b2b-niche-architecture.md` §4.3
already specifies it for six verticals. It is a different field, and keeping it separate is what
enforces §0:

```ts
/** What the snapshot observes, phrased for this vertical. Never a promise. */
readonly snapshotFraming: string;
```

Nadia's six are sourced. The other nine are `[NEEDS DATA: snapshot framing, per vertical, from
Nadia]`.

---

## 2. The event catalogue

| id | label | artefact | capture | cycle |
|---|---|---|---|---|
| `drawing-upload` | Upload a drawing or STEP file for quotation | 2D drawing or 3D model | `file-upload` | `weeks` |
| `bom-enquiry` | Capability enquiry with a BOM or gerbers | BOM, gerbers | `file-upload` | `months` |
| `sample-submission` | Submit a sample for testing | The buyer's own material | `file-upload` | `weeks` |
| `cad-download` | Download a CAD or STEP model of the part | Supplier's model | `gated-download` | `months` |
| `datasheet-download` | Download a technical data sheet | TDS or SDS | `gated-download` | `weeks` |
| `certification-pack-request` | Request the quality certification pack | Certificates with registered scope | `on-page-form` | `months` |
| `sample-request` | Request a physical sample | Material or product sample | `on-page-form` | `weeks` |
| `part-selection-request` | Product selection or sizing request | A duty point or specification | `on-page-form` | `weeks` |
| `quote-on-part-number` | Quote against a part number | A part number or list | `on-page-form` | `same-week` |
| `cross-reference-lookup` | Cross-reference a competitor part number | A competitor's part number | `on-page-form` | `same-week` |
| `scoped-quote-request` | Request a scoped quote | A brief or volume statement | `on-page-form` | `weeks` |
| `spec-request` | Request specification or submittal documents | Spec section, submittal pack | `gated-download` | `months` |
| `credit-application` | Start a credit or facility application | Financials | `on-page-form` | `weeks` |
| `utility-bill-analysis` | Submit twelve months of bills for analysis | The buyer's own bills | `file-upload` | `weeks` |
| `role-brief-submission` | Submit a role brief or vacancy | A job specification | `on-page-form` | `weeks` |
| `application-review` | Application or line assessment | The buyer's process or line | `on-page-form` | `months` |
| `site-survey` | Book a site survey or site visit | Physical site access | `on-page-form` | `months` |
| `it-assessment` | IT assessment or network audit | Access to the estate | `on-page-form` | `weeks` |
| `security-assessment` | Security assessment or posture review | Access to the environment | `on-page-form` | `months` |
| `scoped-assessment` | Scoped assessment or gap analysis | A scope statement | `on-page-form` | `months` |
| `clinical-evaluation` | Clinical or technical evaluation | Clinical or technical access | `offline` | `months` |
| `evaluation-unit` | Request an evaluation unit or sample device | A device on loan | `on-page-form` | `months` |
| `architecture-consultation` | Technical or architecture consultation | A stack diagram | `on-page-form` | `months` |
| `named-consultation` | Consultation with a named individual | That person's time | `on-page-form` | `weeks` |
| `scoped-engagement-conversation` | Scoped engagement conversation | An engagement letter scope | `on-page-form` | `weeks` |
| `discovery-call` | Discovery call | A calendar slot | `on-page-form` | `weeks` |
| `sandbox-key` | Sandbox or API key | A working credential | `self-serve` | `weeks` |
| `self-serve-signup` | Self-serve account creation | An account | `self-serve` | `same-week` |
| `trial` | Time-boxed trial | A provisioned instance | `self-serve` | `weeks` |
| `poc` | Proof of concept in the buyer's environment | A scoped pilot | `on-page-form` | `months` |
| `demo` | Scheduled product demonstration | A calendar slot | `on-page-form` | `weeks` |
| `tender-invitation` | Invitation to tender or RFP | A place on the invitation list | `offline` | `months` |
| `bid-invitation` | Bid invitation | A place on the bid list | `offline` | `months` |
| `prequalification-submission` | Prequalification submission | A completed prequal record | `offline` | `months` |
| `capability-approval-lookup` | Check an approval, accreditation or scope against a need | The buyer's type, standard or method | `on-page-form` | `same-week` |
| `exchange-unit-request` | Request an exchange, loan or rotable unit | A serviceable unit against the buyer's core | `on-page-form` | `same-week` |
| `availability-check` | Check availability of a machine, crew or slot for a date and place | A confirmed date, unit and location | `on-page-form` | `same-week` |
| `line-review-request` | Present a product line or brand for stocking or representation | A line card, margin and programme terms | `on-page-form` | `months` |
| `emergency-dispatch-request` | Emergency call-out or mobilisation | A crew on site within a stated response time | `on-page-form` | `same-week` |
| `compliance-inspection-booking` | Book a mandated recurring inspection or test | A signed, dated compliance record | `on-page-form` | `weeks` |
| `franchise-candidate-application` | Franchise candidate application | A candidate profile carrying liquid capital and net worth | `on-page-form` | `months` |

The last seven were added on 2026-09-29 by the 21-industry extension. Their rationale, and why none
of them is an existing member wearing a different label, is in §3A.1.

`cycle` is a band and every band is `inferred` from the buying structure Iris describes. It is not a
measurement.
`[NEEDS DATA: sourced sales-cycle length by vertical and sub-niche. Iris §3.8 and §5.4 both record
this as unavailable and decline to estimate. So do I.]`

**`cycle` is on the wrong type, and §3A.1 makes the case.** It is fixed per event id here, but a
`site-survey` for a janitorial contract is `weeks` and a `site-survey` for an industrial automation
cell is `months`. `cycle` co-varies with the profile, not with the event, and should move to
`ConversionProfile` before 341 profiles are written against the current shape.

**`capture: 'offline'` is the finding that matters commercially.** Six events cannot be captured on a
website at all, because they happen inside a procurement system. Every one of them sits in a vertical
that `b2b-paid-structure.md` §3 marks not paid-viable, and it is the same fact seen from two angles.

---

## 3. Profiles, per meta-vertical

Column key: **P** primary, **S** secondary, **X** prohibited. Provenance is `sourced` (Iris, with
section), `inferred` (mine, with basis), or `unknown` (blocks publication).

### 3.1 Manufacturing and Industrial (tier S)

Meta default: `drawing-upload`. Sourced, Iris §3.7, whose first sentence is "RFQ, not demo, not
discovery call."

| Sub-niche | P | S | X | Page implication | Provenance |
|---|---|---|---|---|---|
| `cnc-machining` | `drawing-upload` | `certification-pack-request` | `demo`, `discovery-call` | An upload control above the fold, with accepted formats and an NDA statement next to it. The certification block states registered **scope**, not the bare standard | sourced §3.7; secondary inferred from §3.4 axis 2 |
| `sheet-metal` | `drawing-upload` | `certification-pack-request` | `demo` | As above | inferred: same file-first motion as §3.7 row 1 |
| `injection-moulding` | `drawing-upload` | `application-review` | `demo` | Tooling makes this a two-step. Part geometry first, then a tooling conversation | inferred, §3.7 row 1 extension |
| `additive-manufacturing` | `drawing-upload` | `sample-request` | `demo` | Material and process selection is the page's job before the upload | inferred |
| `metal-fabrication` | `drawing-upload` | `certification-pack-request` | `demo` | As CNC | inferred |
| `contract-manufacturing-ems` | `bom-enquiry` | `certification-pack-request` | `demo` | **Two distinct moments, both real conversions.** The page needs both paths, not one form | **sourced §3.7** |
| `oem-components` | `part-selection-request` | `cad-download` | `demo` | **The CAD download is a conversion, not a resource link. Instrument it.** A sizing or selection tool outranks a contact form | **sourced §3.7** |
| `industrial-automation` | `application-review` | `site-survey` | `demo`, `quote-on-part-number` | Capex. Nobody quotes a cell from a form. The page sells the assessment, not the machine | **sourced §3.7** |
| `chemical-specialty-materials` | `sample-request` | `datasheet-download` | `demo` | Sample request is the strongest intent signal in the vertical. TDS and SDS must be reachable without a form, then the sample request is the gate | **sourced §3.7** |
| `industrial-distributors` | `quote-on-part-number` | `cross-reference-lookup` | `demo`, `discovery-call` | Transactional. **Any friction kills it.** A cross-reference tool is the page | **sourced §3.7** |
| `packaging-manufacturers` | `sample-request` | `drawing-upload` | `application-review`, `demo` | **Do not borrow Iris's "packaging machinery" row. A packaging manufacturer makes packaging; a packaging machinery builder sells capex. Different buyer, different event** | inferred, and flagged as a trap |
| `textile-food-equipment` | `application-review` | `site-survey` | `demo` | Equipment is capex, same shape as automation | inferred, §3.7 machinery row |
| `quality-inspection-iso` | `scoped-assessment` | `named-consultation` | `demo`, `drawing-upload` | A service, not a part. The ISO 9001:2026 transition is the live trigger (Iris §3.5) | inferred |

### 3.2 SaaS and Software (tier S)

**No meta default. Assigning one would be the error.** Iris §4.4 records four different conversion
events inside this vertical and says getting it wrong is fatal.

| Sub-niche | P | S | X | Page implication | Provenance |
|---|---|---|---|---|---|
| `dev-tools-apis` | `sandbox-key` | `self-serve-signup` | **`demo`** | Docs, then a key, then pricing. **A demo gate destroys this outright.** If the page has a "book a demo" button as its primary action, the campaign behind it cannot work | **sourced §4.4** |
| `vertical-saas` | `demo` | `discovery-call` | `sandbox-key` | Demo is correct here and only here alongside fintech. The incumbent's data owner is the unaddressed blocker (§4.1) | **sourced §4.4** |
| `fintech-saas` | `demo` | `scoped-assessment` | `sandbox-key` | Demo, with the trust centre and SOC 1 or SOC 2 position reachable before it | **sourced §4.4** |
| `cybersecurity-saas` | `security-assessment` | `poc`, `trial` | **`demo`** | "Rarely a cold demo." The page answers "who runs this at 2am" before it offers anything | **sourced §4.4** |
| `data-analytics-platforms` | `architecture-consultation` | `trial` | `demo` | The conversation is about the stack, not the product | **sourced §4.4** |
| `horizontal-saas` | `demo` | `trial` | none | Category-comparison buying. The comparison page is the conversion path | inferred from §4.4 vertical-SaaS shape |
| `ai-ml-tooling` | `trial` | `sandbox-key`, `architecture-consultation` | `demo` | Technical evaluator leads. Legal and privacy on training data is the late blocker (§4.1) | inferred |
| `martech-adtech-salestech` | `demo` | `trial` | none | They understand the product; the bar on proof is higher | inferred |
| `productivity-collaboration` | `self-serve-signup` | `trial` | `demo` | Bottom-up adoption, then a procurement and security review that kills it late (§4.1) | inferred |
| `cybersecurity-saas` covered above | | | | | |
| `ecommerce-enablement` | `self-serve-signup` | `trial` | `demo` | The app marketplace listing is the real surface, not the website | inferred |

### 3.3 Professional and Business Services (tier S)

Meta default: `named-consultation`. Sourced, Iris §5.4: "consultation, and it must be framed as
consultation with a named person. Not book a demo, not get a quote."

| Sub-niche | P | S | X | Page implication | Provenance |
|---|---|---|---|---|---|
| `legal` | `named-consultation` | `scoped-engagement-conversation` | `demo`, `trial`, `discovery-call` | The named individual, their credential and their jurisdiction on the page. Bound by ABA Model Rule 7.1 as adopted state by state (Iris §5.3) | **sourced §5.4** |
| `accounting-finance` | `scoped-engagement-conversation` | `named-consultation` | `demo` | Scope, not a quote. The engagement letter is the artefact the buyer is imagining | **sourced §5.4** |
| `consulting` | `named-consultation` | `scoped-assessment` | `demo` | Named partner plus the bench behind them (§5.4 comparison axis) | inferred from §5.4 |
| `hr-talent` | `role-brief-submission` | `named-consultation` | `demo` | A vacancy is the conversion. A contact form is not | inferred |
| `marketing-adjacent-b2b` | `discovery-call` | `scoped-quote-request` | none | The one place in the vertical where a discovery call reads naturally | inferred, §5.4 fractional-CFO carve-out extended |
| `translation-localization` | `scoped-quote-request` | `sample-request` | `demo` | Word count and language pair, plus a sample translation | inferred |
| `market-research` | `scoped-quote-request` | `named-consultation` | `demo` | none | inferred |
| `mystery-shopping` | `scoped-quote-request` | none | `demo` | none | `unknown`: `[NEEDS DATA: verify]` |
| `facilities-management` | `site-survey` | `scoped-quote-request` | `demo` | none | inferred |

Note, for the fractional CFO row wherever it is filed: Iris §5.4 states a **discovery call is
genuinely correct** there, "the one place in this vertical where it is". Preserve that carve-out.
It currently sits in `emerging-micro-niches` as `fractional-executive-marketplaces`.

### 3.4 Technology and IT Services (tier S)

Meta default: `it-assessment`. Sourced, Iris §6.3.

| Sub-niche | P | S | X | Page implication | Provenance |
|---|---|---|---|---|---|
| `msp-mssp` | `it-assessment` | `security-assessment` | `demo` | Coverage, exclusions, response times and **exit terms**. Iris §6.3: exit terms are researched far more than MSP marketing assumes | **sourced §6.3** |
| `cloud-consultancies` | `it-assessment` | `architecture-consultation` | `demo` | Partner designation with the specific designation named (Iris §5.3, observed) | sourced §6.3 |
| `systems-integrators-vars` | `scoped-assessment` | `architecture-consultation` | `demo` | none | inferred |
| `it-staffing` | `role-brief-submission` | `scoped-quote-request` | `demo`, `it-assessment` | Meta default is wrong here. Staffing converts on a vacancy | inferred |
| `data-centre-colocation` | `site-survey` | `scoped-quote-request` | `demo` | A tour is the conversion. Capacity and power per rack is the comparison axis | inferred |
| `telecom-ucaas-ccaas` | `scoped-quote-request` | `demo` | none | Seat count drives the quote | inferred |
| `ai-implementation-consultancies` | `scoped-assessment` | `discovery-call` | `demo` | none | inferred |
| `hardware-av-distribution` | `quote-on-part-number` | `spec-request` | `demo` | Transactional, same shape as industrial distribution | inferred |

### 3.5 Logistics, Supply Chain and Transportation (tier A)

Meta default: `rate-request`, expressed here as `scoped-quote-request` on a lane. Sourced, Iris
§6.2: "rate request or lane quote, and tender invitation for enterprise. Not a demo."

| Sub-niche | P | S | X | Page implication | Provenance |
|---|---|---|---|---|---|
| `3pl-fulfilment` | `scoped-quote-request` | `site-survey` | `demo` | SKU profile and lane, not a contact form. Iris flags this as the fastest-moving sub-niche | **sourced §6.2** |
| `freight-brokerage-forwarding` | `scoped-quote-request` | none | `demo` | Lane, mode, commodity | **sourced §6.2** |
| `last-mile-cold-chain` | `scoped-quote-request` | `site-survey` | `demo` | Temperature control is the qualifying axis | sourced §6.2 |
| `warehousing-industrial-re` | `site-survey` | `scoped-quote-request` | `demo` | none | inferred |
| `customs-trade-compliance` | `named-consultation` | `scoped-quote-request` | `demo` | CTPAT status is the credential (Iris §6.2, observed) | inferred |
| `reverse-logistics` | `scoped-quote-request` | none | `demo` | none | inferred |
| `tms-wms-vendors` | `tender-invitation` | `demo` | `scoped-quote-request` | **Meta default is wrong. This is enterprise software bought through an RFP.** A cold click cannot enter it | **sourced §6.2** (enterprise carve-out) |
| `shipping-saas` | `self-serve-signup` | `demo` | `scoped-quote-request` | Meta default is wrong. Software, not freight | inferred |
| `fleet-telematics` | `demo` | `trial` | `scoped-quote-request` | Meta default is wrong. Software plus hardware | inferred |

### 3.6 Healthcare and Life Sciences (tier A)

Meta default: `clinical-evaluation`. Sourced, Iris §6.4: "clinical or technical evaluation, and for
devices a sample or evaluation unit. **A demo alone rarely moves a Value Analysis Committee.**"

| Sub-niche | P | S | X | Page implication | Provenance |
|---|---|---|---|---|---|
| `medtech-devices` | `evaluation-unit` | `clinical-evaluation` | `demo` | The Value Analysis Committee is the audience most vendor pages ignore entirely (§6.4). The page has to arm the internal champion, not the browser | **sourced §6.4** |
| `health-it` | `clinical-evaluation` | `demo`, `security-assessment` | none | Epic and Cerner integration named explicitly is the filter (§6.4) | inferred from §6.4 |
| `pharma-services` | `scoped-quote-request` | `named-consultation` | `demo` | CRO and CDMO selection runs on an RFI and capability fit | inferred |
| `medical-staffing-billing` | `role-brief-submission` | `scoped-assessment` | `demo` | **This row mixes two businesses.** Staffing converts on a vacancy, billing on an assessment. Split the row before publishing | inferred, and flagged |
| `dental-veterinary-b2b` | none | none | none | none | `unknown`: `[NEEDS DATA]` |
| `behavioral-health-ops` | none | none | none | none | `unknown`: `[NEEDS DATA]` |
| `longevity-clinic-vendors` | none | none | none | none | `unknown`: `[NEEDS DATA]` |

### 3.7 Financial Services (tier A)

Meta default: `named-consultation`, with `scoped-assessment` secondary. Sourced, Iris §6.5.
"Long procurement."

| Sub-niche | P | S | X | Page implication | Provenance |
|---|---|---|---|---|---|
| `wealth-asset-management` | `named-consultation` | `scoped-assessment` | `demo` | none | sourced §6.5 |
| `outsourced-finance` | `scoped-engagement-conversation` | `named-consultation` | `demo` | Same shape as accounting (§5.4) | inferred |
| `regtech-compliance` | `scoped-assessment` | `demo` | none | Third-party risk questionnaire is effectively a second sales cycle (§6.5) | inferred |
| **`commercial-insurance`** | none | none | `demo` | **Flagship page, and the conversion event is not sourced.** Our client is the broker or MGA; their buyer is a risk manager or CFO, and the likely event is a submission or a coverage review, not a consultation | `unknown`: `[NEEDS DATA: highest priority in this file. The insurance page is the deepest on the site per CLAUDE.md §5 and it cannot publish on a guessed conversion event]` |
| `commercial-banking-lending` | `credit-application` | `named-consultation` | `demo` | Meta default is probably wrong. A facility enquiry is an application, not a consultation | inferred, needs confirmation |
| `payments` | `scoped-quote-request` | `named-consultation` | `demo` | Meta default is probably wrong. Rate and interchange analysis is the real first ask | inferred, needs confirmation |
| `crypto-web3-b2b` | none | none | none | none | `unknown`: `[NEEDS DATA]` |

### 3.8 Construction, Real Estate and Built Environment (tier B)

Meta default: `bid-invitation`, with `prequalification-submission`. Sourced, Iris §6.6:
"**Emphatically not a demo, and only rarely a discovery call.**"

| Sub-niche | P | S | X | Page implication | Provenance |
|---|---|---|---|---|---|
| `commercial-contractors` | `bid-invitation` | `prequalification-submission` | **`demo`, `discovery-call`** | Both events are `offline`. The website's job is to survive prequalification, not to capture a lead. EMR is a hard filter (§6.6) | **sourced §6.6** |
| `aec-firms` | `bid-invitation` | `named-consultation` | `demo` | Relevant project type and size is the axis | sourced §6.6 |
| `modular-prefab` | `bid-invitation` | `application-review` | `demo` | none | inferred |
| `building-materials` | `spec-request` | `sample-request`, `quote-on-part-number` | `demo` | **Meta default is wrong.** Getting written into a specification is the conversion, and submittal documents are the artefact | inferred, and flagged |
| `hvac-electrical-roofing-distribution` | `quote-on-part-number` | `spec-request` | `demo` | Meta default is wrong. Distribution is transactional | inferred, and flagged |
| `proptech` | `demo` | `trial` | `bid-invitation` | **Meta default is wrong. This is software** | inferred, and flagged |
| `construction-tech` | `demo` | `trial` | `bid-invitation` | Meta default is wrong. Software | inferred, and flagged |
| `cre-services` | `named-consultation` | `site-survey` | `demo` | none | inferred |

### 3.9 The seven with no sourced conversion event

Iris covered eight meta-verticals. These seven she did not, and I am not filling them from
imagination. Each carries `provenance.kind === 'unknown'` at the meta level, which under §1.1
**blocks publication**. Where a sub-niche has an obvious and defensible shape I have marked it
`inferred` with the basis; everything else stays `unknown`.

| Meta-vertical | Meta default | Sub-niche exceptions I am willing to infer | Provenance |
|---|---|---|---|
| `energy-utilities` | `unknown` | `commercial-solar-storage` and `energy-procurement` convert on `utility-bill-analysis`: twelve months of bills is the buyer's own artefact and the strongest intent signal available. `ev-charging` on `site-survey` | meta `unknown`; the three `inferred` |
| `education-training` | `unknown` | `corporate-ld-lms` on `demo`; `compliance-training` on `trial`; `higher-ed-vendors` and `k12-vendors` on `tender-invitation`, which is `offline` and matches the "published procurement criteria" rationale in `verticals.ts` | meta `unknown`; four `inferred` |
| `hospitality-travel-events` | `unknown` | `hotel-tech` and `event-tech-venue-sourcing` on `demo` | meta `unknown`; two `inferred` |
| `agriculture-food` | `unknown` | `ingredients-copackers` on `sample-request`; `food-safety-testing` on **`sample-submission`**, which is the reverse direction and a genuinely different event | meta `unknown`; two `inferred` |
| `media-marketing-creative` | `unknown` | `print-promotional-distributors` on `quote-on-part-number`; `content-syndication-leadgen` on `scoped-quote-request` | meta `unknown`; two `inferred` |
| `government-nonprofit` | `tender-invitation` | All. Procurement is public and entered through solicitation response. Every event here is `offline` | `inferred`, basis: the `why` field in `verticals.ts` plus Iris §6.6's procurement shape |
| `emerging-micro-niches` | `unknown` | `fractional-executive-marketplaces` on `discovery-call` (Iris §5.4 carve-out); `bpo-nearshore-offshore` on `scoped-quote-request`; `private-equity-services` on `named-consultation` | meta `unknown`; three `inferred`. **Unknown is correct at the meta level here by definition**: `verticals.ts` says the category vocabulary is still forming, so the buying motion is not settled either |

---

## 3A. Extension to 21 industries — 2026-09-29

**This section extends §1 to §3. It replaces nothing.** Everything above stands and Ruth shipped it.
The operator's locked taxonomy v2.0.0 (`data/b2b/icp/icp-taxonomy.json`, 21 industries, 341
sub-industries, 2,376 niches, 8,823 sub-niches) supersedes `data/b2b/verticals.ts` as the entity
spine, and it supplies three fields per sub-industry that did not exist when §3 was written:
`buyer_titles`, `client_value` and `min_firm_size`. Those are real input. They are not a source for a
conversion event, but they constrain one, and §3A.0 says how.

Six industries need profiles: Aerospace & Aviation, Automotive/Heavy Equipment & Mobility, Commercial
& Facility Services, Environmental/Engineering & Testing (TIC), Retail/CPG & Brand Enablement, and
Franchising & Multi-Location. All six are `is_new_industry: true`. None is covered by Iris.

### 3A.0 What `client_value` and `buyer_titles` can and cannot settle

**They cannot name the conversion event.** A contract worth `$250k–$5M per heavy check` tells you the
stakes, not the action. Provenance rules are unchanged: an event is `sourced`, `inferred` with a
stated basis, or `unknown`, and `unknown` blocks publication under §1.1.

**They can falsify one, which is the useful direction.** Three tests I now run against every row
below, and they are the reason the rows here are `inferred` rather than `unknown`:

1. **Value floor versus capture surface.** A `self-serve` event cannot be the primary for a
   sub-industry whose `client_value` is `$500k–$20M per shipset program`. Nobody self-serves a
   shipset. Where the two disagree, the capture surface is wrong.
2. **Buyer title versus event.** `buyer_titles` of `VP Business Development, Chief Commercial Officer`
   is an enterprise relationship motion and rules out `self-serve-signup`. `VP Marketing, Head of
   Demand Generation` is a software motion and makes `demo` or `trial` plausible. This test alone
   separates the software rows from the service rows inside every one of the six industries, which is
   exactly the error §4 item 2 catalogued for logistics and construction.
3. **`min_firm_size` versus cycle.** A `$3M+ revenue or 15+ consultants` firm does not run a
   `months`-cycle procurement-led sale as its only motion; it needs something reachable sooner.

Where all three agree, I mark the row `inferred` and state the basis. Where they do not, `unknown`.

### 3A.1 Seven new events

Added to the §2 catalogue. Seven for six industries is a deliberate floor: every one of them is an
action that no existing member describes, and I reused an existing member wherever the artefact and
the capture surface matched.

| id | label | artefact | capture | cycle | Why it is not an existing member |
|---|---|---|---|---|---|
| `capability-approval-lookup` | Check an approval, accreditation or scope against a specific need | The buyer's aircraft type, standard or test method | `on-page-form` | `same-week` | `certification-pack-request` asks for a document. This asks a **question and expects a yes or no** before any document matters. In aerospace and TIC it is the gate, not the follow-up |
| `exchange-unit-request` | Request an exchange, loan or rotable unit | A serviceable unit shipped against the buyer's core | `on-page-form` | `same-week` | The highest-urgency event in the corpus. Not a quote and not a sample — the buyer is grounded and wants a part today |
| `availability-check` | Check availability of a machine, crew or slot for a date and place | A confirmed date, unit and location | `on-page-form` | `same-week` | `scoped-quote-request` answers *what does it cost*. This answers *can you actually be there*, and in rental and field services the second question is asked first |
| `line-review-request` | Present a product line or brand for stocking or representation | A line card, margin and program terms | `on-page-form` | `months` | The direction is inverted. Our client is being **evaluated as a supplier by a channel**, not selling to an end user. Distinct from `sample-request` |
| `emergency-dispatch-request` | Emergency call-out or mobilisation | A crew on site within a stated response time | `on-page-form` | `same-week` | The only event whose page implication is a **phone number rather than a form**. Treating it as a form fill is the failure |
| `compliance-inspection-booking` | Book a mandated recurring inspection or test | A signed, dated compliance record | `on-page-form` | `weeks` | Driven by a regulatory interval, not by a project. The buyer has a date they must hit and no discretion about whether to buy |
| `franchise-candidate-application` | Franchise candidate application | A candidate profile carrying liquid capital and net worth | `on-page-form` | `months` | The only event in the catalogue whose **qualification data is the conversion**. See §3A.7 |

One correction to the §2 catalogue that these expose: **`cycle` is on the wrong type.** It sits on
`ClientConversionEvent`, so it is fixed per event id. But a `site-survey` for a janitorial contract is
`weeks` and a `site-survey` for an industrial automation cell is `months` — same event, same artefact,
different vertical. `cycle` co-varies with the profile, not with the event.

```ts
/* Move `cycle` off ClientConversionEvent and onto ConversionProfile.
   The event says what the buyer does. The profile says how long it then takes. */
export interface ConversionProfile {
  // … existing fields …
  readonly cycle: CycleBand;
}
```

This is a one-line move and it should happen before 341 profiles are written against the current
shape, not after.

### 3A.2 Aerospace & Aviation (industry 16, 14 sub-industries)

Meta default: `scoped-quote-request`, with `capability-approval-lookup` secondary. `inferred`.
**Basis:** every `geo_angle` in this industry names an approval, a certification or a turnaround as the
thing the buyer checks — "approvals, slot availability and turnaround times", "STC ownership",
"AS9100 and NADCAP capability", "regulator approvals". The buyer establishes eligibility before price
in all fourteen. That is a strong enough regularity to default on.

| Sub-industry | P | S | X | Page implication | Provenance |
|---|---|---|---|---|---|
| `airframe-mro-and-line-maintenance` | `scoped-quote-request` | `capability-approval-lookup` | `demo`, `discovery-call` | Part 145 approval scope by aircraft type, hangar slot availability and turnaround, all above the fold. An operator with an aircraft due a check is buying a **date**, not a service | inferred, basis: `geo_angle` names slots and turnaround |
| `engine-and-component-mro` | `exchange-unit-request` | `scoped-quote-request` | `demo` | Exchange and loan pool availability is the page. The shop visit quote is the slower second path | inferred, basis: `client_value` spans `$50k–$3M per shop visit or annual component contract`, two motions |
| `avionics-completions-and-modifications` | `scoped-quote-request` | `capability-approval-lookup` | `demo` | Who owns the STC, what the downtime is, what it costs. `geo_angle` names all three | inferred |
| `aircraft-parts-distribution-and-aftermarket` | `quote-on-part-number` | `cross-reference-lookup`, `exchange-unit-request` | `demo`, `discovery-call` | **Identical shape to `industrial-distributors` in §3.1. Any friction kills it.** AOG response time is the differentiator and it belongs next to the search box | inferred, basis: §3.1 industrial distribution, sourced Iris §3.7 |
| `aerospace-component-manufacturing` | `drawing-upload` | `certification-pack-request` | `demo` | Archetype A exactly. AS9100 and NADCAP scope stated as **registered scope**, not the bare standard — same rule as §3.1 CNC | inferred, basis: §3.1 row 1, sourced Iris §3.7 |
| `aerospace-systems-and-interiors-suppliers` | `certification-pack-request` | `part-selection-request` | `demo`, `self-serve-signup` | TSO or production approval is the filter. `client_value` `$500k–$20M per shipset` rules out any self-serve surface | inferred, basis: 3A.0 test 1 |
| `business-aviation-services` | `scoped-quote-request` | `named-consultation` | `demo`, `self-serve-signup` | Charter, jet card, fractional and management are four different products at one price question. The page compares them or it converts nobody | inferred |
| `fbos-fuel-and-ground-handling` | `scoped-quote-request` | `availability-check` | `demo` | Archetype D. Geo-bounded to the airport. Fees and handling capability per station | inferred |
| `airport-infrastructure-and-equipment` | `tender-invitation` | `capability-approval-lookup` | `demo`, `self-serve-signup` | **`offline`.** Airport authorities tender. The site's job is to be shortlisted before the tender exists, not to capture a lead. Same shape as `commercial-contractors` §3.8 | inferred, basis: `geo_angle` says "ahead of tenders" |
| `aviation-software-and-technology` | `demo` | `trial` | `scoped-quote-request` | **Software filed under a services industry.** The meta default is wrong here. `buyer_titles` are `VP Marketing, Head of Demand Generation` — 3A.0 test 2 | inferred, and flagged |
| `commercial-drones-and-uas` | `poc` | `scoped-assessment` | `demo` | Enterprise drone programmes run a pilot before a contract. BVLOS approval and data handling are the blockers `geo_angle` names | inferred |
| `aviation-training-and-workforce` | `availability-check` | `scoped-quote-request` | `demo` | Simulator slot for a type on a date. `geo_angle`: "simulator availability and regulator approvals". The buyer needs a seat, not a brochure | inferred |
| `aircraft-leasing-and-asset-services` | none | none | `demo`, `self-serve-signup` | none | `unknown`: `[NEEDS DATA: lessor-to-airline origination. `client_value` `$1M–$30M per lease` and `buyer_titles` of CCO suggest a relationship market where the counterparty is known before any search. I will not guess between that and a searched lease enquiry]` |
| `aviation-consulting-and-certification` | `scoped-engagement-conversation` | `named-consultation` | `demo` | The named individual and their regulator experience. `geo_angle` says "proof of regulator experience" explicitly. Archetype C shape | inferred, basis: §3.3 professional services |

### 3A.3 Automotive, Heavy Equipment & Mobility (industry 17, 16 sub-industries)

**No meta default. Assigning one would repeat the §3.2 error.** This industry contains a Tier-1
program supplier, a parts distributor, a rental branch, a dealership software vendor and a transit
operator. Their conversion events have nothing in common. The `buyer_titles` field separates them
cleanly and that is the basis for every row below.

| Sub-industry | P | S | X | Page implication | Provenance |
|---|---|---|---|---|---|
| `automotive-tier-1-and-tier-2-suppliers` | `capability-approval-lookup` | `drawing-upload`, `certification-pack-request` | `demo`, `self-serve-signup` | **The RFQ itself is `offline`** — OEMs issue it to an already-qualified list. The website's job is to survive the shortlist that precedes it. The industry `note` says so: buyers "shortlist suppliers through Google and AI answers **before any RFQ**". IATF 16949 scope, process, part size and program volume | inferred, and flagged. Basis: industry `note` |
| `automotive-engineering-and-vehicle-software` | `scoped-assessment` | `named-consultation` | `demo` | ISO 26262 functional-safety credentials and the bench behind the named lead | inferred |
| `ev-components-and-battery-makers` | `part-selection-request` | `sample-request` | `demo`, `self-serve-signup` | Duty point first, then A- and B-sample. Qualification volume is the filter | inferred |
| `aftermarket-parts-manufacturers` | `line-review-request` | `certification-pack-request` | `demo`, `discovery-call` | **The buyer is a distributor deciding whether to stock a line, not an end user buying a part.** Coverage, fill rate and warranty are the comparison axes `geo_angle` names. A quote form is the wrong instrument | inferred, and flagged as the inverted-direction row |
| `powertrain-remanufacturers-and-engine-rebuilders` | `exchange-unit-request` | `quote-on-part-number` | `demo` | Reman runs on a core exchange. Availability and warranty next to the part number | inferred |
| `aftermarket-distribution-and-shop-equipment` | `quote-on-part-number` | `scoped-quote-request` | `demo`, `discovery-call` | Transactional, §3.1 industrial-distribution shape. Financing is a stated comparison axis and belongs on the page | inferred |
| `dealer-software-and-marketing-tech` | `demo` | `trial` | `scoped-quote-request` | Software. `buyer_titles`: `CMO, VP Marketing, Head of Demand Generation` — 3A.0 test 2 | inferred |
| `dealer-services-and-f-and-i-providers` | `scoped-assessment` | `named-consultation` | `demo` | Per-vehicle profit analysis against the dealer's own numbers. Reinsurance structures carry a regulatory layer — see §3A.8 | inferred |
| `vehicle-remarketing-and-auctions` | `self-serve-signup` | `scoped-quote-request` | `demo` | A consignor account is the conversion, and a gate on it destroys the volume side of the business. Net return and days-to-sell are the axes | inferred |
| `commercial-vehicle-upfitters-and-truck-bodies` | `spec-request` | `drawing-upload` | `demo` | Ship-thru capability and build slot. The buyer is specifying a chassis they have already ordered | inferred |
| `trailer-manufacturers-and-dealers` | `availability-check` | `scoped-quote-request` | `demo` | Lead time on a build slot is what the carrier is actually asking | inferred |
| `commercial-truck-dealers-and-service` | `scoped-quote-request` | `availability-check` | `demo` | Archetype D. Service-network coverage across the fleet's lanes, stated as geography | inferred |
| `heavy-equipment-dealers-and-parts` | `scoped-quote-request` | `quote-on-part-number`, `availability-check` | `demo` | Machine, parts and support are three businesses on one page. Uptime commitment is the axis | inferred |
| `equipment-rental-companies` | `availability-check` | `scoped-quote-request` | `demo`, `discovery-call` | **The question is "can you have a 60ft boom lift on this site Thursday", not "what does it cost".** A quote form that cannot answer availability loses to the branch that answers the phone | inferred, and the clearest case for the new event |
| `specialty-vehicle-manufacturers` | `spec-request` | `tender-invitation` | `demo`, `self-serve-signup` | **Two paths and they split by buyer.** Fleet is a spec conversation; municipal and agency is `offline` procurement. `geo_angle` says "before an RFP". Do not build one form for both | inferred, and flagged |
| `commercial-mobility-and-transit-services` | `scoped-quote-request` | `tender-invitation` | `demo` | Corporate shuttle is reachable cold. Transit-agency paratransit is `offline`. Same split as the row above | inferred, and flagged |

### 3A.4 Commercial & Facility Services (industry 18, 16 sub-industries)

Meta default: `site-survey`, with `scoped-quote-request` secondary, cycle `weeks`. `inferred`,
**high confidence** — this is the most internally consistent industry in the taxonomy. Sixteen
sub-industries, one buying motion: a facility or procurement lead needs a recurring multi-site service,
a contractor walks the building, a scoped bid follows. It is `b2b-paid-structure.md` §2's Archetype D
in its purest form, and `geo_angle` names a facility, property or security director as the searcher in
all sixteen.

The industry-wide page implication, which holds for every row: **coverage, exclusions, response times
and exit terms.** Iris §6.3 recorded exit terms as researched far more than vendors assume for MSPs;
the same is true for every multi-year service agreement here, and almost nobody publishes them.

| Sub-industry | P | S | X | Page implication | Provenance |
|---|---|---|---|---|---|
| `janitorial-and-contract-cleaning` | `site-survey` | `scoped-quote-request` | `demo`, `discovery-call` | Square footage, shift pattern, building type. Insurance and staff-vetting position on the page, because `geo_angle` says "vetted, insured" | inferred |
| `specialty-industrial-cleaning-and-restoration` | **split** | — | — | **This row mixes two businesses with opposite urgencies.** Restoration is `emergency-dispatch-request`, cycle `same-week`, and the page needs a phone number and a stated response time. Specialty industrial cleaning is `site-survey`, cycle `weeks`. Split before authoring — same finding as `packaging-manufacturers` in §3.1 | inferred, and flagged |
| `commercial-pest-control` | `site-survey` | `certification-pack-request` | `demo` | `geo_angle`: "passes food safety and healthcare audits". Audit-readiness documentation is the differentiator, not the treatment | inferred |
| `security-guarding-and-electronic-security` | `scoped-quote-request` | `site-survey` | `demo` | Post orders, hours, licensing by state. `client_value` separates guarding (`$100k–$3M/yr`) from integration projects (`$50k–$1M`) — two products, two paths | inferred |
| `fire-and-life-safety-services` | `compliance-inspection-booking` | `scoped-quote-request` | `demo`, `discovery-call` | **The buyer has a mandated date and no discretion.** Multi-site portfolio coverage and the inspection calendar are the page. Deficiency-repair capability is the upsell and belongs stated | inferred, and the clearest case for the new event |
| `elevator-door-and-loading-dock-services` | `site-survey` | `scoped-quote-request` | `demo` | The independent-alternative position `geo_angle` names: what an OEM contract locks in and what an independent does differently | inferred |
| `grounds-landscaping-and-snow-management` | `site-survey` | `availability-check` | `demo` | Snow is a **seasonal deadline with a capacity ceiling**. Crew and equipment availability before the season is the real question | inferred |
| `uniform-linen-and-route-based-supply-services` | `scoped-quote-request` | `site-survey` | `demo` | 3–5 year agreements. **Exit terms and price-escalation clauses decide this category** and the page that publishes them wins the comparison | inferred |
| `commercial-waste-and-recycling` | `scoped-quote-request` | `availability-check` | `demo` | Roll-off is a delivery date; portfolio hauling is a cost-and-diversion analysis. Two motions under one sub-industry | inferred |
| `hvac-mechanical-controls-and-water-treatment` | `site-survey` | `compliance-inspection-booking` | `demo` | Critical-environment credentials. The chief engineer is the searcher `geo_angle` names | inferred |
| `plumbing-electrical-and-critical-power-service` | `emergency-dispatch-request` | `scoped-quote-request` | `demo`, `discovery-call` | Uptime-critical. `geo_angle` names emergency response first. Phone number, response time, coverage map | inferred |
| `roofing-and-building-envelope-service` | `site-survey` | `scoped-quote-request` | `demo` | A roof inspection **is** the conversion, not a lead magnet. Multi-state service capability for asset managers | inferred |
| `parking-operations-and-campus-mobility` | `scoped-assessment` | `site-survey` | `demo` | A revenue audit against the facility's current numbers. `geo_angle`: "lift parking revenue" | inferred |
| `records-management-and-secure-destruction` | `scoped-quote-request` | `certification-pack-request` | `demo` | **Chain of custody is the product.** NAID or equivalent certification and destruction certificates are what compliance and IT leaders search for, per `geo_angle` | inferred |
| `workplace-furniture-design-and-relocation` | `site-survey` | `scoped-quote-request` | `demo` | Project-shaped, not recurring. The one row here whose cycle is a move date | inferred |
| `corporate-food-service-and-refreshments` | `site-survey` | `scoped-quote-request` | `demo` | Headcount, subsidy model, site count. `geo_angle`: "lower subsidy" is the buyer's actual frame | inferred |

### 3A.5 Environmental, Engineering & Testing / TIC (industry 19, 16 sub-industries)

Meta default: `scoped-quote-request`, with `capability-approval-lookup` secondary. `inferred`,
**high confidence.** The industry `note` states the mechanism directly: providers are picked "by
accreditation, method and location". That is a three-part eligibility check that happens *before*
price, in every one of the sixteen.

**The finding that matters most in this industry, and it inverts the usual advice:
`certification-pack-request` and `capability-approval-lookup` are primary-tier events here, not
housekeeping.** In §3.1 the accreditation block was a secondary that supported a drawing upload. In
TIC the accreditation **is the product**. A lab without the right ISO 17025 scope, NELAP certification
or accredited method cannot legally do the work, and the buyer establishes that first. A page that
leads with "request a quote" and buries the scope of accreditation has inverted its own funnel.

Two further structural notes:

- **`sample-submission` is the primary for every actual laboratory here**, and it is the reverse
  direction from most of the catalogue — the buyer ships their own material to our client. The page
  must carry sample submission instructions, chain-of-custody forms, container and preservation
  requirements and turnaround time. That is the conversion path, and most lab sites file it under
  "Resources" and never count it. Same class of finding as §4 item 6 on `cad-download`.
- **Every row in this industry is driven by a regulatory or transactional deadline**, not by a
  discretionary budget cycle. That makes TIC the most paid-viable of the six new industries, and
  `icp-keyword-audit.md` §5 finds two of the fifteen PPC-only priority-A niches sitting here.

| Sub-industry | P | S | X | Page implication | Provenance |
|---|---|---|---|---|---|
| `environmental-consulting` | `scoped-quote-request` | `named-consultation` | `demo` | Permit type, agency and jurisdiction. NEPA and state-programme experience named | inferred |
| `real-estate-and-transaction-due-diligence` | `scoped-quote-request` | `availability-check` | `demo`, `discovery-call` | **The highest-urgency row in the entire 21-industry set.** A Phase I sits inside a 30-day due-diligence window. Turnaround time and national field coverage are the two facts the page exists to state. `client_value` `$2k–$15k per report` also means this cannot carry a long qualification form | inferred, cycle `same-week` |
| `air-quality-emissions-and-stack-testing` | `compliance-inspection-booking` | `scoped-quote-request` | `demo` | Permit-driven annual testing. The buyer has a due date in their Title V permit | inferred |
| `stormwater-wetlands-and-water-compliance` | `scoped-quote-request` | `site-survey` | `demo` | SWPPP and delineation are permit-triggered. Jurisdiction and agency relationships | inferred |
| `remediation-and-abatement-contractors` | `site-survey` | `scoped-quote-request` | `demo` | **Bonding capacity is the filter** — `min_firm_size` says `bonding for $5M+ jobs`. State that, plus licensing per state | inferred |
| `industrial-hygiene-and-ehs-consulting` | `scoped-assessment` | `named-consultation` | `demo` | CIH and CSP credentials on named individuals. Archetype C | inferred |
| `industrial-hazardous-waste-management` | `scoped-quote-request` | `sample-submission` | `demo` | Waste profiling precedes any price. Permitted facility network and manifest handling | inferred |
| `environmental-testing-labs` | `sample-submission` | `certification-pack-request` | `demo`, `discovery-call` | Submission instructions, NELAP or state certification **scope by method**, turnaround. PFAS method capability is the live differentiator | inferred |
| `industrial-inspection-and-asset-integrity` | `compliance-inspection-booking` | `scoped-quote-request` | `demo` | API 653 and equivalent inspection intervals are mandated dates. Turnaround-window capacity is the constraint | inferred |
| `calibration-and-metrology-services` | `sample-submission` | `certification-pack-request` | `demo` | The instrument is shipped in. **ISO 17025 scope of accreditation by parameter and range** is the whole comparison, and publishing the scope table is the page | inferred |
| `product-testing-and-certification-labs` | `capability-approval-lookup` | `scoped-quote-request` | `demo` | "Is your chamber accredited for this standard, and when can you schedule me" — in that order. Chamber availability is a real constraint | inferred |
| `materials-and-analytical-testing-labs` | `sample-submission` | `capability-approval-lookup` | `demo` | As environmental labs. Fire and code listings are a distinct, longer product | inferred |
| `construction-materials-testing-and-inspection` | `compliance-inspection-booking` | `scoped-quote-request` | `demo` | Special inspection is code-mandated and scheduled against a pour date. **Branch-lab geography is the constraint**, and `min_firm_size` says `3+ accredited branch labs` | inferred |
| `geotechnical-engineering-and-surveying` | `scoped-quote-request` | `availability-check` | `demo` | **Mixes two products.** Geotech investigation and ALTA survey have different buyers and different triggers; a developer cannot file without either. Split before authoring | inferred, and flagged |
| `compliance-engineering-and-certification-bodies` | `capability-approval-lookup` | `scoped-engagement-conversation` | `demo` | Which directives, which notified-body scope, which markets. **An accredited certification body has independence obligations that constrain what it may advertise** — see §3A.8 | inferred |
| `forensic-engineering-and-failure-analysis` | `scoped-engagement-conversation` | `named-consultation` | `demo`, `trial` | Two motions: single assignment from an adjuster with an open claim, and **panel placement** with a carrier or law firm, which is a relationship sale. The named expert, their credentials and their testimony record | inferred |

### 3A.6 Retail, CPG & Brand Enablement (industry 20, 13 sub-industries)

Meta default: `scoped-quote-request`. `inferred`, **low confidence — treat the default as weak.** This
industry is less coherent than 18 or 19: it contains a sales agency, a contract manufacturer, a
fixture fabricator, a field-services network and a marketplace agency. The overrides below carry more
weight than the default does.

| Sub-industry | P | S | X | Page implication | Provenance |
|---|---|---|---|---|---|
| `cpg-brokerage-and-retail-sales-agencies` | `line-review-request` | `named-consultation` | `demo` | **Inverted direction.** The brand pitches the broker for representation, and the broker is selecting. Retailer relationships and category coverage are what the brand is buying | inferred |
| `private-label-and-contract-manufacturing` | `sample-request` | `scoped-quote-request` | `demo` | **MOQ is the qualifying axis and it must be on the page.** A brand below the minimum is not a lead. cGMP or ISO certification scope next to it | inferred, basis: §3.1 `chemical-specialty-materials`, sourced Iris §3.7 |
| `retail-fixtures-displays-and-pop` | `drawing-upload` | `sample-request` | `demo` | Archetype A with a prototype step. Rollout volume and store count | inferred |
| `trade-show-exhibits-and-brand-experiences` | `drawing-upload` | `availability-check` | `demo` | **Booth space plan in, design out, against a fixed show date.** The deadline is external and non-negotiable, which makes this the second most urgent row in the industry | inferred |
| `retail-merchandising-and-field-services` | `availability-check` | `scoped-quote-request` | `demo` | Coverage by market and store count is the question. A brand needs 400 stores visited monthly, or it does not | inferred |
| `retail-rollout-and-installation-services` | `availability-check` | `scoped-quote-request` | `demo` | National installer network coverage by state, against a rollout schedule | inferred |
| `in-store-technology-integrators` | `poc` | `scoped-assessment` | `demo` | Chain deployments pilot in a store set first. A cold demo does not move a multi-site rollout | inferred |
| `packaging-design-and-development` | `scoped-engagement-conversation` | `sample-request` | `demo` | Range scope and timeline. Structural versus graphic are different engagements | inferred |
| `marketplace-and-retail-media-agencies` | `scoped-assessment` | `discovery-call` | `demo` | Account audit against the brand's own marketplace data. **The `discovery-call` carve-out applies here**, same as `marketing-adjacent-b2b` in §3.3 and Iris §5.4 | inferred |
| `shopper-marketing-and-promotion-services` | `scoped-quote-request` | `named-consultation` | `demo` | Programme scope by retailer. Rebate and sampling are different operational products | inferred |
| `retail-consulting-and-category-management` | `named-consultation` | `scoped-assessment` | `demo` | Named partner with the retailer and category experience. Archetype C | inferred |
| `product-sourcing-and-development` | `scoped-quote-request` | `sample-request` | `demo` | Factory audit position and compliance regime. Golden sample is the trust step | inferred |
| `wholesale-marketplaces-and-consumer-goods-distribution` | `self-serve-signup` | `line-review-request` | `demo` | **Software and marketplace, not a service.** `buyer_titles` `VP Marketing, Head of Growth` and `min_firm_size` `$10M+ GMV or Series A+` — 3A.0 test 2. A gate here destroys the supply side | inferred, and flagged |

### 3A.7 Franchising & Multi-Location (industry 21, 17 sub-industries)

**This industry splits into two halves with two different buyers, and the split is the profile.**
`docs/icp-positioning.md` rule 2 already draws the line: the client is the franchisor, never the
franchisee and never the consumer.

- **Sub-industries 1 to 10 are franchisors.** Their buyer is a franchise candidate — an individual
  investor. Meta default for this half: `franchise-candidate-application`.
- **Sub-industries 11 to 17 are vendors to franchisors.** Their buyer is a Chief Development Officer
  or VP Franchise Development. No single default; the rows below carry it.

**The finding that matters, and it is the most important page-design consequence in this document.**
`icp-keyword-audit.md` §3.3(c) establishes that in franchise-candidate search the non-buyer and the
buyer **type the same words**, so negative keywords cannot separate them. The only instrument that
can is the liquid-capital and net-worth question on the application. That makes
`franchise-candidate-application` the one event in the catalogue where **the qualification data is the
conversion itself**, not a nice-to-have on a later screen. A four-field form here is not a
best-practice, it is a failure: it converts the entire unqualified population and hands the
franchisor's development team a list they cannot work.

This is also the sharpest illustration of the §1.1 gate having a second consequence. Under
`icp-keyword-audit.md` §4.3 the `capture` field decides paid viability; here the *form design* decides
lead quality, and no bid strategy survives getting it wrong.

**A regulatory layer sits above this whole half, and it binds us.** Franchise sales in the US are
governed by the FTC Franchise Rule and by state franchise registration and disclosure regimes, which
constrain when and how a Franchise Disclosure Document may be delivered and what may be represented
about financial performance. An ad or landing page we write for a franchisor is a franchise-sales
communication. **This is the same category of constraint as ABA Model Rule 7.1 for legal in
`b2b-paid-structure.md` §2.1, and it has the same consequence: no ad copy and no landing page ships in
this industry until it is answered by a named reviewer.**

`[NEEDS DATA: FTC Franchise Rule requirements and state franchise registration and disclosure
obligations for the target states, with a named reviewer. Specifically: whether an FDD may be offered
as a gated download at all, and what financial-performance representations a landing page may carry.
Same shape as OPERATOR-DECISIONS #7. Do not infer this from the category name.]`

**Franchisors, sub-industries 1 to 10.** One profile, applied to all ten, because the buying motion is
identical and only the vertical vocabulary changes.

| P | S | X | Page implication | Provenance |
|---|---|---|---|---|
| `franchise-candidate-application` | `named-consultation` | `demo`, `self-serve-signup`, `discovery-call`, **`datasheet-download` for the FDD** | Territory availability, total investment range, liquid-capital and net-worth minimums stated **before** the form, and the form carries both as required fields. The FDD is prohibited as a gated download pending the ruling above. Every `client_value` in this half is `$40k–$150k initial fee plus $250k–$1.5M lifetime royalties`, which is what justifies a long qualifying form where four fields would be right elsewhere | inferred, and the whole half is flagged pending the regulatory ruling |

**Vendors to franchisors, sub-industries 11 to 17.**

| Sub-industry | P | S | X | Page implication | Provenance |
|---|---|---|---|---|---|
| `franchise-development-consulting-and-brokerage` | `named-consultation` | `scoped-engagement-conversation` | `demo` | The named consultant and the systems they have built. `client_value` `$60k–$250k per programme build` | inferred |
| `franchise-sales-outsourcing-and-development-firms` | `scoped-engagement-conversation` | `named-consultation` | `demo` | Retainer plus commission per signed franchisee — state the model. Sits under the same FTC layer, because they are selling franchises on the franchisor's behalf | inferred, and flagged |
| `franchise-marketing-and-lead-generation-agencies` | `scoped-assessment` | `discovery-call` | `demo` | Development-funnel audit against the franchisor's own numbers. **`discovery-call` carve-out applies**, Iris §5.4. **Conflict note:** `icp-keyword-audit.md` §1.3 finds this sub-industry's own three keywords are Family Q — terms Qognition itself would bid on. Qognition is a potential vendor to and competitor of this row simultaneously. Operator's call, not mine | inferred, and flagged |
| `franchise-expos-media-and-lead-portals` | `availability-check` | `scoped-quote-request` | `demo` | Booth space and advertising inventory against a show or issue date. Audience numbers are the product and must be sourced | inferred |
| `franchise-finance-insurance-and-m-and-a` | `credit-application` | `named-consultation` | `demo` | ROBS and SBA franchise funding. **Financial-services platform policy applies on top** of the FTC layer | inferred, and flagged |
| `multi-unit-operator-and-area-developer-services` | `site-survey` | `scoped-quote-request` | `demo` | Site selection and opening support. Market and trade-area data is the artefact | inferred |
| `franchise-software-and-technology` | `demo` | `trial` | `franchise-candidate-application` | **Software. The franchisor half's default is actively wrong here** and would render a candidate application on a SaaS page. `buyer_titles` `VP Marketing, Head of Demand Gen, CMO` — 3A.0 test 2 | inferred, and flagged |

### 3A.8 Regulatory layers now sitting above the account, consolidated

`b2b-paid-structure.md` §2.1 recorded two (lawyer advertising, financial services). The six new
industries add four more, and each one binds the agency as well as the client:

| Industry | Layer | Status |
|---|---|---|
| Franchising, sub-industries 1–10 and 12 | FTC Franchise Rule and state registration and disclosure | `[NEEDS DATA]`, §3A.7. **Blocking all ad copy in the franchisor half** |
| Franchising, `franchise-finance-insurance-and-m-and-a` | Platform financial-services advertiser policy, on top of the above | Carried forward from §2.1, still open |
| TIC, `compliance-engineering-and-certification-bodies` | Accredited certification bodies carry independence and impartiality obligations under their own accreditation, which constrain marketing claims | `[NEEDS DATA: the impartiality and advertising constraints an accredited certification body operates under, and whether agency-written marketing claims fall inside them. Named reviewer required]` |
| Automotive, `dealer-services-and-f-and-i-providers` | Dealer-owned reinsurance and F&I products are insurance-adjacent and state-regulated | `[NEEDS DATA: whether F&I and reinsurance marketing falls under state insurance advertising regulation in target states]` |
| Aerospace, `aerospace-component-manufacturing` and defence-adjacent rows | ITAR constrains what technical detail may be published at all, which is a content constraint before it is an ads constraint | `[NEEDS DATA: ITAR publication constraints on capability pages. Nadia's off-page work flags the same issue at `docs/seo/b2b-offpage-authority.md` §3.15]` |


---

## 4. What this implies, beyond the field

1. **The field lives at sub-niche level with a meta default, not at meta level.** Manufacturing has
   six different conversion events inside it and SaaS has five. A single field per meta-vertical is
   wrong in the majority of cases. ADR-0007 §3.1 should carry `ConversionProfile` on the sub-niche
   entity, resolving upward.

2. **Four sub-niches sit under a meta default that is actively wrong for them**, and every one is a
   software row filed under a services vertical: `tms-wms-vendors`, `shipping-saas` and
   `fleet-telematics` under logistics, `proptech` and `construction-tech` under construction. A
   template that inherits the meta default will render "request a rate" on a software page. The
   override is not a nicety.

3. **Two rows in `data/b2b/verticals.ts` mix two businesses** and should be split before either is
   authored: `packaging-manufacturers` (packaging is not packaging machinery) and
   `medical-staffing-billing` (staffing is not billing).

4. **The flagship page has an unsourced conversion event.** `commercial-insurance` is, per
   `CLAUDE.md` §5, the deepest page on the site, and §1 of the research says it is the one genuinely
   uncontested vertical. Its conversion event is the one I could not source. That is the highest
   priority `[NEEDS DATA]` in this document.

5. **Six events are `capture: 'offline'`** and cannot be instrumented on a website at all. They are
   the same rows that `b2b-paid-structure.md` §3 marks not paid-viable. When a client's conversion
   event is offline, the honest advice is that neither paid search nor a website form is their
   acquisition channel, and saying so is worth more than a landing page.

6. **`cad-download` and `datasheet-download` are conversions, not resource links.** Iris §3.7 is
   explicit: "CAD download is a conversion event in its own right. Instrument it." Most industrial
   sites file these under Resources and never count them, which means the highest-intent action on
   the site is invisible in their analytics. That is a finding we can deliver in a snapshot without
   any measurement of our own.

---

## 4A. Is sub-niche still the right level? Re-answered at 21 industries — 2026-09-29

§4 item 1 said the field lives at sub-niche level with a meta default. **The finding holds. The name
has moved, and the resolution needs one more step than it had.**

### 4A.1 The level I called "sub-niche" is the operator's `sub_industry`, not their `niche`

When §4 was written the taxonomy was two levels: meta-vertical and sub-niche. The locked taxonomy has
four: industry (21), sub-industry (341), niche (2,376), sub-niche (8,823). "Sub-niche" now names
something three levels down from what §4 meant.

The mapping is settled by the data rather than by argument. **The operator independently attached
`ppc_keywords`, `buyer_titles`, `client_value` and `min_firm_size` to the sub-industry** — and those
four fields are precisely the ones that co-vary with the conversion event. `buyer_titles` is the
strongest single predictor of the event (3A.0 test 2 uses it in every one of the six new industries).
`client_value` falsifies capture surfaces. `min_firm_size` constrains cycle.

Meanwhile `fit` and `priority` are attached to the **niche**, and neither of those is a conversion
property — one is channel, the other is build order.

So two people working separately put the buying-motion fields at the same level. That is the level.
**`ConversionProfile` belongs on the sub-industry: 341 profiles, not 2,376 and not 8,823.**

**Kyle reached the same place from the page-architecture side, and I want the convergence on the
record rather than re-argued.** ADR-0008 §1.2 tabulates where the operator's substance actually sits —
all six prose fields populated on 341/341 sub-industries, `fit` and `priority` with *no prose field at
all* on the 2,376 niches, and a sub-niche record that is "a name; there is no fourth field to find".
Its §5 decision makes **the sub-industry cohort the promotion unit** — one sub-industry page plus its
priority-A niches, typically 4 pages, "the unit a human can actually review".

That is the same unit this document needs for a different reason. Kyle's constraint is what can be
authored without producing a templated page; mine is what can be reviewed without guessing a buying
motion. They land on the sub-industry because it is the only level carrying evidence about the buyer.
`ConversionProfile` should therefore be **promoted as part of the sub-industry cohort**, not on a
separate schedule — which also means the named reviewer §1.1 requires is the same person already
reviewing the cohort, rather than a second queue.

### 4A.2 But the default now needs a niche-level override, and the evidence is already in the file

§4 item 2 found four sub-niches sitting under a meta default that was actively wrong for them. At 341
sub-industries the same failure recurs, and §3A found seven more rows where a **single sub-industry
contains two different conversion events**:

| Sub-industry | The two events inside it |
|---|---|
| `specialty-industrial-cleaning-and-restoration` | `emergency-dispatch-request` (same-week) and `site-survey` (weeks) |
| `geotechnical-engineering-and-surveying` | Geotechnical investigation and ALTA survey: different buyer, different trigger |
| `specialty-vehicle-manufacturers` | `spec-request` for fleet, `tender-invitation` (`offline`) for municipal |
| `commercial-mobility-and-transit-services` | `scoped-quote-request` for corporate, `tender-invitation` for transit agencies |
| `security-guarding-and-electronic-security` | Guarding contract and integration project |
| `commercial-waste-and-recycling` | Roll-off delivery date and portfolio hauling analysis |
| `heavy-equipment-dealers-and-parts` | Machine sale, parts, and support contract |

Plus the two carried forward from §4 item 3, `packaging-manufacturers` and `medical-staffing-billing`,
which have the same shape.

**Recommendation: three levels of resolution, most specific wins.**

```ts
/** Industry default → sub-industry profile → niche override. Most specific wins.
 *  No inheritance below niche: an 8,823-deep sub-niche resolves to its niche's
 *  profile and may not carry its own. That ceiling is deliberate. */
export function resolveConversionProfile(
  industry: string,
  subIndustry?: string,
  niche?: string,
): ConversionProfile | undefined { /* … */ }
```

**Expected volume: 341 sub-industry profiles plus roughly 10 to 30 niche overrides.** Not 2,376. The
override is the exception and it has to stay the exception, because every one needs a named reviewer.

Note the interaction with ADR-0008 §5: a promoted cohort carries its priority-A niches as pages, and
ADR-0008 §1.6 measures priority-A niches per sub-industry at a mean of **2.6**. So a cohort needs one
profile plus, at most, two or three override decisions — and in the great majority of cohorts, zero.
That is the volume the override table has to stay inside.

The cheaper alternative in the seven cases above is to ask the operator to **split the sub-industry**
rather than override beneath it, exactly as §4 item 3 proposed for `packaging-manufacturers`. That is
a taxonomy edit under positioning rule 6, so it is the operator's call and not mine, but it produces
a cleaner file than a growing override table.

### 4A.3 The scale problem is review capacity, and the arithmetic is not close

The §1.1 gate says an entity cannot publish when its resolved profile is missing or its provenance is
`unknown`, and an `inferred` profile publishes only when a named reviewer has accepted the inference.
Applied to 341 sub-industries:

- Iris sourced **8** of the 21 industries (SaaS, professional services, healthcare, financial,
  manufacturing, logistics, construction, technology). Those 8 contain **136 sub-industries**.
- The other 13 industries contain **205 sub-industries with no sourced research of any kind.**
- Every profile in §3A is `inferred` or `unknown`. Not one is `sourced`.

**So at least 205 of 341 profiles currently block publication, and that is correct behaviour.** It is
the same conclusion §1.1 reached at 15 verticals, holding at 21 industries with a much larger number
attached to it. The constraint on this architecture was never the type — it is the number of hours a
named reviewer can spend confirming a buying motion, and that has not changed while the entity count
went up by two orders of magnitude.

The practical consequence for sequencing: **do not attempt 341 profiles.** Confirm the sub-industries
behind the 15 PPC-only priority-A niches in `icp-keyword-audit.md` §5 and the priority-A niches in the
industries already sourced. That is a few dozen rows, it is reviewable, and it covers everything that
could actually be built in the next wave.

### 4A.4 One consequence that is new since §4 was written

`icp-keyword-audit.md` §4.3 concludes that **paid viability is a property of the `capture` field, not
of the industry label** — where the resolved event is `offline`, a cold click cannot reach it and no
account should be built, whatever the vertical is called.

That gives the §1.1 gate a second job it did not have. It currently blocks **page publication**. It
should also block **a paid account build**, on the same condition and for a sharper reason: publishing
a thin page wastes reviewer time, whereas building an account against an unknown or `offline`
conversion event spends a client's money into a channel their market does not use.

`[NEEDS DATA: operator ruling on whether `provenance.kind === 'unknown'` blocks a paid account build
as well as page publication. `icp-keyword-audit.md` register item 23.]`

---

## 5. Instrumentation guidance we give the client

This is advice for the **client's** property, not events for `lib/analytics.ts`. Qognition's own
events are in `snapshot-funnel.md` §5.

- One primary conversion action per page, matching the profile above. Everything else secondary and
  excluded from bidding.
- `gated-download` and `self-serve` events are the ones most often uninstrumented and most often the
  real conversion. Count them before changing anything else.
- `offline` events cannot be a bid target. Where they are the real conversion, the on-site event is a
  proxy at best and must be labelled as a proxy in every report.
- Click IDs on the lead record at capture, or the offline import that closes the loop is impossible.
  Same rule as `b2b-paid-structure.md` §1.1, applied to the client.
- No sensitive data in analytics events. `CLAUDE.md` §8 binds our own property and it is the right
  standard to recommend.

---

## 6. NEEDS DATA register

1. **Conversion event for `commercial-insurance`.** Flagship page, unsourced. Highest priority.
2. Conversion events for the seven meta-verticals in §3.9, from primary research.
3. Sourced sales-cycle length by vertical and sub-niche. Iris §3.8 and §5.4 both decline to estimate.
4. `snapshotFraming` for the nine verticals not covered by
   `docs/seo/b2b-niche-architecture.md` §4.3, from Nadia.
5. Verification of every `inferred` row by a named reviewer before its page publishes. That is the
   gate rule in §1.1, and it is the whole reason `inferred` is a distinct variant rather than being
   folded into `sourced`.
6. Split decisions on `packaging-manufacturers` and `medical-staffing-billing`.

### 6.1 Added by the 21-industry extension, 2026-09-29

7. **FTC Franchise Rule and state franchise registration and disclosure obligations** for target
   states, with a named reviewer. Specifically whether an FDD may be offered as a gated download and
   what financial-performance representations a landing page may carry. **Blocking all ad copy and
   all landing pages in franchising sub-industries 1 to 10 and 12.** §3A.7.
8. **Conversion event for `aircraft-leasing-and-asset-services`.** The one `unknown` I left in the six
   new industries. §3A.2.
9. **Impartiality and advertising constraints on accredited certification bodies**, and whether
   agency-written marketing claims fall inside them. §3A.8.
10. **Whether F&I and dealer-owned reinsurance marketing falls under state insurance advertising
    regulation** in target states. §3A.8.
11. **ITAR publication constraints on aerospace and defence capability pages.** Content constraint
    before it is an ads constraint. §3A.8.
12. **Split decisions on the seven sub-industries in §4A.2** that contain two conversion events, or
    an operator ruling to handle them by niche-level override instead. Taxonomy edits fall under
    positioning rule 6, so this is the operator's call.
13. **Operator ruling on whether `provenance.kind === 'unknown'` also blocks a paid account build**,
    not only page publication. §4A.4.
14. **Named reviewers for the sub-industry profiles behind the 15 PPC-only priority-A niches.** The
    smallest set that unblocks anything buildable. §4A.3.
15. Conversion events for the 205 sub-industries with no sourced research, from primary research.
    Item 2 restated at the new scale. **Not a prerequisite for the next wave** — item 14 is.
