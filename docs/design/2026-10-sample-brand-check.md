# Sample brand trading-name check

**Date run:** 2026-10-07. **By:** Iris (`research`). **For:** `SAMPLE_BRANDS` in ADR-0006 §4.1, the invented firms shown in illustrative product screens on `.example` domains.

**Decision this informs:** whether each sample name can stay, or needs replacing before the screens go to Ruth and to preview, so that no illustrative screen appears to show data about a real firm in the same sector.

This is a collision screen, not a legal trade mark clearance. It does not search USPTO, UKIPO or EUIPO registers.

## Method and limits

- **WebSearch** for the exact name, run once per name on 2026-10-07.
- **OpenCorporates** name search (`opencorporates.com/companies?q=`), public results page only, on 2026-10-07. Status is shown; incorporation dates and officers need a login and were not retrieved.
- **Companies House (UK) could not be reached.** Every request to `find-and-update.company-information.service.gov.uk` returned HTTP 502 on 2026-10-07, including a known-good company page. It was not retried by any other route. OpenCorporates ingests UK company records, so UK companies are partly covered through it, but that is OpenCorporates' copy, not the register. `[NEEDS DATA: Companies House name search for all seven names plus the two replacements, rerun when the service responds.]`
- OpenCorporates searches were read from page 1 only, except "pellman" (both pages, 51 results). "calderwood" returned 527 results; only page 1 was read.
- Confidence labels: **observed** (I read it on the page), **reported** (a third party's listing says so), **inferred** (my reasoning).

## Results

| Sample brand | Sector on screen | Verdict | Evidence |
|---|---|---|---|
| Quillmark Software | B2B SaaS | **CONFLICT** | See 1 |
| Thornbury Precision | Manufacturing | **NEAR** | See 2 |
| Stroud & Fenner | Law firm | **CONFLICT** | See 3 |
| Pellman IT Group | MSP | **NEAR** | See 4 |
| Harbour & Vane | Logistics | **CLEAR** | See 5 |
| Calderwood Risk | Insurance / risk | **NEAR** | See 6 |
| Varrowfield Group | Generic | **CLEAR** | See 7 |

### Proposed replacements

| Replaces | Proposed | Domain | Verdict | Evidence |
|---|---|---|---|---|
| Quillmark Software | **Ondrell Software** | `ondrell.example` | **CLEAR** | See R1 |
| Stroud & Fenner | **Corran & Whitlow** | `corranwhitlow.example` | **CLEAR** | See R2 |

## Evidence

### 1. Quillmark Software: CONFLICT

- **Observed.** "Quillmark" is a live software product: an open-source, schema-driven document engine published on crates.io, PyPI and npm, maintained by `borb-sh` (GitHub `borb-sh/quillmark`), with releases at least up to 0.102.0. It is the first result for the exact phrase "Quillmark Software". https://docs.rs/crate/quillmark/0.98.0/source/README.md , https://docs.rs/crate/quillmark-cli/latest (accessed 2026-10-07)
- **Observed (OpenCorporates).** No company named "Quillmark Software". Ten "Quillmark" entities, several active: QUILLMARK, INC. (New York, active), QUILLMARK LLC (Delaware, active), QUILLMARK LLC (Kentucky, active), Quillmark Trading Inc. (Texas, active), QUILLMARK BOOK PUBLISHING LLC (Illinois, active), QUILLMARK HOMES, INC. (Delaware, active). Their lines of business are not shown. https://opencorporates.com/companies?q=quillmark , https://opencorporates.com/companies?q=quillmark+software (accessed 2026-10-07)
- **Inferred.** A software product with the same name is the same sector as a SaaS sample brand. A reader who searches the name lands on a real product. Replace.

### 2. Thornbury Precision: NEAR

- **Observed.** No firm named "Thornbury Precision" in WebSearch or OpenCorporates (0 results). https://opencorporates.com/companies?q=thornbury+precision (accessed 2026-10-07)
- **Observed (OpenCorporates).** Thornbury Engineering LLC (Alabama, inactive) and THORNBURY HILL CONSULTING ENGINEERING LIMITED (UK, inactive). Both inactive. https://opencorporates.com/companies?q=thornbury+engineering (accessed 2026-10-07)
- **Reported.** Thornbury is a real place name with precision-engineering activity: a New Zealand directory category "Thornbury / Engineers – Precision" (page returned HTTP 403, so business names were not read), and Essilor's lens plant in Thornbury, UK. https://yellow.co.nz/thornbury/engineers-precision , https://www.opticianonline.net/content/news/essilor-celebrates-40-years-of-manufacturing-in-thornbury (accessed 2026-10-07)
- **Inferred.** No active same-name firm found. Keeping it is defensible. The residual risk is a small local engineering shop in Thornbury (UK, AU or NZ) that the NZ directory page would have shown.

### 3. Stroud & Fenner: CONFLICT

- **Observed (OpenCorporates).** STROUD FENNER LAW FIRM, PLLC. Florida LLC, number L16000154646, status **Active**, 2130 W. Brandon Blvd, Suite 100, Brandon, FL 33511. https://opencorporates.com/companies/us_fl/L16000154646 (accessed 2026-10-07)
- **Reported.** Directory listings show the firm practises personal injury and insurance disputes in Brandon, FL, and list attorney Natalie Michelle Stroud-Fenner. https://lawyers.law.cornell.edu/lawyer/natalie-michelle-stroud-fenner-1530900 , https://www.avvo.com/lawsuits-and-disputes-lawyer/fl/brandon.html (accessed 2026-10-07)
- **Inferred.** It is a live law firm with essentially the same name, in the sector the screen assigns it to. Replace.

### 4. Pellman IT Group: NEAR

- **Observed.** No firm named "Pellman IT Group" or "Pellman IT" in WebSearch or OpenCorporates (51 "Pellman" entities read across both pages).
- **Observed (OpenCorporates).** Two technology-named entities: PELLMAN TECHNOLOGY, INC. (Ohio, active, branch) and Pellman Technology Inc (Colorado, active). What they do is not shown and WebSearch returned nothing for them. https://opencorporates.com/companies?q=pellman&page=2 (accessed 2026-10-07)
- **Reported.** An IT professional, Brent Pellman, previously ran his own IT business before joining Summit IT Solutions. That business's name is not given. https://www.summititsolutions.com/?p=1014 (accessed 2026-10-07)
- **Reported.** Pellera Technologies, a merged IT services firm (Converge plus Mainline, about $4B revenue in 2024 per H.I.G.), sells managed services. "Pellman IT" and "Pellera" are not the same name, but they are close in an MSP context. https://hig.com/news/h-i-g-capital-completes-merger-of-converge-technology-solutions-and-mainline-information-systems-to-form-pellera-technologies/ (accessed 2026-10-07)
- **Inferred.** Keeping it is defensible. If the operator wants zero overlap with "Pellman Technology" in an IT context, rename it.

### 5. Harbour & Vane: CLEAR

- **Observed.** Exact-phrase WebSearch for "Harbour & Vane", "Harbour and Vane" and "Harbourvane" returned no company, only vessel listings, wind-vane products and museum objects. OpenCorporates: 0 results. https://opencorporates.com/companies?q=harbour+vane (accessed 2026-10-07)
- Unrelated "Harbour"-prefixed logistics firms exist (for example Harbour Link Container Services, Harbour International Inc). Neither uses "Vane". https://www.westac.com/organizations/harbour-link-container-services (accessed 2026-10-07)

### 6. Calderwood Risk: NEAR

- **Observed.** No firm named "Calderwood Risk" in WebSearch or OpenCorporates (0 results). https://opencorporates.com/companies?q=calderwood+risk (accessed 2026-10-07)
- **Observed.** "Calderwood Insurance Services, LLC" appears as the insurer in an insurance application form in the Kombai inspiration library, alongside "Ardenmoor Indemnity Company" and an address at "418 Kestrel Landing Road, Fairhaven Crossing, CT". https://agent.kombai.com/kombai-inspiration-library/sections/forms/web/85/index.html (accessed 2026-10-07)
  - **Inferred.** That is a UI template library, and the address and underwriter look invented, so this is probably another vendor's fictional insurance brand rather than a real firm. Even so, the same invented insurance name would be in use on two sites.
- **Observed (OpenCorporates).** "Calderwood" is a common surname and place name (527 entities). On page 1, one NZ company, now A BETTER MORTGAGE LIMITED, was formerly "CALDERWOOD MORTGAGES AND INVESTMENTS LIMITED". That is adjacent financial services under a former name. https://opencorporates.com/companies?q=calderwood (accessed 2026-10-07)
- **Inferred.** It is unused in this build (ADR-0006). Keep it parked. Rename it before it is ever rendered if the Kombai overlap matters to the operator.

### 7. Varrowfield Group: CLEAR

- **Observed.** WebSearch returned no "Varrowfield" entity, only similar place names (Barrowfield, Glasgow; Ravenfield; Arrowfield, NSW). OpenCorporates: 0 results. A follow-up search for "Barrowfield Group" found no company of that name. https://opencorporates.com/companies?q=varrowfield , https://en.wikipedia.org/wiki/Barrowfield (accessed 2026-10-07)

### R1. Ondrell Software: CLEAR

- **Observed.** Exact-phrase WebSearch for "Ondrell Software" and "Ondrell" found no entity. OpenCorporates: 0 results. https://opencorporates.com/companies?q=ondrell (accessed 2026-10-07)
- Software firms with different but similar-looking names exist: Ondeso (industrial PC management), Ondsel (open-source CAD, reported as shutting down), Ondorse (compliance), Onde (fleet software). None shares the name. https://www.ondsel.com/faq/ , https://www.htgf.de/portfolio/htgffamily/ondeso/ (accessed 2026-10-07)

### R2. Corran & Whitlow: CLEAR

- **Observed.** Exact-phrase WebSearch for "Corran & Whitlow" and "Corran and Whitlow" found no entity, only Corran as a place name (Corran Ferry, Scotland). OpenCorporates: 0 results. https://opencorporates.com/companies?q=corran+whitlow (accessed 2026-10-07)

## Not done

- No trade mark register search.
- No Companies House result (HTTP 502 throughout; see Method).
- No code edited. `data/product-screens/sample-entities.ts` and ADR-0006 §4.1 still list the original seven names. Under ADR-0006, a rename there is a reviewed change.
