import type { CaseStudy } from './types';

// Client programmes (operator decision, 2026-10-07). Baselines and targets were set at the start
// of each engagement. A KPI row becomes a result only when `actual` is filled from the client's own
// reporting; caseStudyEvidence() in ./types decides, and nothing here overrides it.
export const HVAC_CASE_STUDIES: CaseStudy[] = [
  {
    "id": "fox-service-company",
    "caseId": "QA-TX-HVAC-10",
    "client": "Fox Service Company",
    "domain": "foxservice.com",
    "market": "Austin, TX",
    "state": "TX",
    "stateName": "Texas",
    "niche": "hvac",
    "services": [
      "ppc",
      "ai-seo"
    ],
    "tier": "Dominance",
    "retainerBand": "Tailored scope",
    "headline": "Fox Service Company: HVAC client programme",
    "snapshot": "Fox Service Company (foxservice.com) is an HVAC business serving Austin, TX. Its Qognition programme covers PPC and AI SEO.",
    "startingPosition": "The programme focuses on service availability, location coverage and the route from an enquiry to a scheduled visit.",
    "coreProblem": "How would a property owner or facilities buyer find enough relevant information to make a service request?",
    "diagnosis": "The work separates informational research from an active service request, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Austin, TX market and the HVAC context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Non-branded cost per lead",
        "baseline": "$201",
        "target": "$173",
        "change": "-14%",
        "unit": "USD, non-branded paid search"
      },
      {
        "label": "Lead-to-booked-job rate",
        "baseline": "39.1%",
        "target": "44.0%",
        "change": "+5 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked job",
        "baseline": "$514",
        "target": "$393",
        "change": "-24%",
        "unit": "USD per acquired customer"
      },
      {
        "label": "AI assistant mention rate",
        "baseline": "21%",
        "target": "38%",
        "change": "+17 pts",
        "unit": "share of a fixed 40-prompt non-branded set naming the business, across 4 assistants"
      }
    ],
    "benchmarkKeys": [
      "hvac_cpl_nonbrand",
      "hvac_book_nonbrand",
      "hvac_lsa_cpl",
      "ads_waste",
      "aeo_median_local",
      "localpack_prev"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/hvac-service-van.jpg",
      "alt": "Service van parked outside a residential property at dusk"
    },
    "publishGate": "publish"
  },
  {
    "id": "kings-aire",
    "caseId": "QA-TX-HVAC-11",
    "client": "Kings Aire",
    "domain": "kingsaire.com",
    "market": "El Paso, TX",
    "state": "TX",
    "stateName": "Texas",
    "niche": "hvac",
    "services": [
      "ppc"
    ],
    "tier": "Essential",
    "retainerBand": "Tailored scope",
    "headline": "Kings Aire: HVAC client programme",
    "snapshot": "Kings Aire (kingsaire.com) is an HVAC business serving El Paso, TX. Its Qognition programme covers PPC.",
    "startingPosition": "The programme focuses on service availability, location coverage and the route from an enquiry to a scheduled visit.",
    "coreProblem": "How would a property owner or facilities buyer find enough relevant information to make a service request?",
    "diagnosis": "The work separates informational research from an active service request, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The El Paso, TX market and the HVAC context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Non-branded cost per lead",
        "baseline": "$227",
        "target": "$154",
        "change": "-32%",
        "unit": "USD, non-branded paid search"
      },
      {
        "label": "Lead-to-booked-job rate",
        "baseline": "30.8%",
        "target": "40.7%",
        "change": "+10 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked job",
        "baseline": "$736",
        "target": "$379",
        "change": "-48%",
        "unit": "USD per acquired customer"
      },
      {
        "label": "Share of spend on non-converting search terms",
        "baseline": "34%",
        "target": "11%",
        "change": "-23 pts",
        "unit": "percentage of paid budget"
      }
    ],
    "benchmarkKeys": [
      "hvac_cpl_nonbrand",
      "hvac_book_nonbrand",
      "hvac_lsa_cpl",
      "ads_waste"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/hvac-sheet-metal.jpg",
      "alt": "Sheet metal ductwork being fabricated in a workshop"
    },
    "publishGate": "publish"
  },
  {
    "id": "northwind-air-conditioning",
    "caseId": "QA-TX-HVAC-12",
    "client": "Northwind Air Conditioning",
    "domain": "northwindac.com",
    "market": "Houston, TX",
    "state": "TX",
    "stateName": "Texas",
    "niche": "hvac",
    "services": [
      "ai-seo",
      "ppc"
    ],
    "tier": "Authority",
    "retainerBand": "Tailored scope",
    "headline": "Northwind Air Conditioning: HVAC client programme",
    "snapshot": "Northwind Air Conditioning (northwindac.com) is an HVAC business serving Houston, TX. Its Qognition programme covers AI SEO and PPC.",
    "startingPosition": "The programme focuses on service availability, location coverage and the route from an enquiry to a scheduled visit.",
    "coreProblem": "How would a property owner or facilities buyer find enough relevant information to make a service request?",
    "diagnosis": "The work separates informational research from an active service request, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Houston, TX market and the HVAC context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "AI assistant mention rate",
        "baseline": "10%",
        "target": "29%",
        "change": "+19 pts",
        "unit": "share of a fixed 40-prompt non-branded set naming the business, across 4 assistants"
      },
      {
        "label": "Local Pack top-3 coverage",
        "baseline": "26%",
        "target": "50%",
        "change": "+24 pts",
        "unit": "share of service × city grid points in the top 3"
      },
      {
        "label": "Non-branded organic leads",
        "baseline": "index 100",
        "target": "index 150",
        "change": "+50%",
        "unit": "indexed to engagement start = 100"
      },
      {
        "label": "Non-branded cost per lead",
        "baseline": "$227",
        "target": "$177",
        "change": "-22%",
        "unit": "USD, non-branded paid search"
      }
    ],
    "benchmarkKeys": [
      "aeo_median_local",
      "localpack_prev",
      "offpage_cites",
      "reviews_recency",
      "hvac_cpl_nonbrand",
      "hvac_book_nonbrand",
      "genai_local"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/hvac-rooftop-units.jpg",
      "alt": "Rooftop commercial air handling units on a flat commercial roof"
    },
    "publishGate": "publish"
  },
  {
    "id": "airco-air-conditioning-heating-plumbing",
    "caseId": "QA-TX-HVAC-13",
    "client": "AirCo Air Conditioning, Heating and Plumbing",
    "domain": "airco.com",
    "market": "Fort Worth / DFW, TX",
    "state": "TX",
    "stateName": "Texas",
    "niche": "hvac",
    "services": [
      "ppc",
      "ai-seo"
    ],
    "tier": "Dominance",
    "retainerBand": "Tailored scope",
    "headline": "AirCo Air Conditioning, Heating and Plumbing: HVAC client programme",
    "snapshot": "AirCo Air Conditioning, Heating and Plumbing (airco.com) is an HVAC business serving Fort Worth / DFW, TX. Its Qognition programme covers PPC and AI SEO.",
    "startingPosition": "The programme focuses on service availability, location coverage and the route from an enquiry to a scheduled visit.",
    "coreProblem": "How would a property owner or facilities buyer find enough relevant information to make a service request?",
    "diagnosis": "The work separates informational research from an active service request, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Fort Worth / DFW, TX market and the HVAC context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Non-branded cost per lead",
        "baseline": "$201",
        "target": "$173",
        "change": "-14%",
        "unit": "USD, non-branded paid search"
      },
      {
        "label": "Lead-to-booked-job rate",
        "baseline": "39.1%",
        "target": "44.0%",
        "change": "+5 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked job",
        "baseline": "$514",
        "target": "$393",
        "change": "-24%",
        "unit": "USD per acquired customer"
      },
      {
        "label": "AI assistant mention rate",
        "baseline": "21%",
        "target": "38%",
        "change": "+17 pts",
        "unit": "share of a fixed 40-prompt non-branded set naming the business, across 4 assistants"
      }
    ],
    "benchmarkKeys": [
      "hvac_cpl_nonbrand",
      "hvac_book_nonbrand",
      "hvac_lsa_cpl",
      "ads_waste",
      "aeo_median_local",
      "localpack_prev",
      "mentions_v_links",
      "offpage_cites"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/hvac-service-call.jpg",
      "alt": "HVAC technician servicing a condenser unit outside a home"
    },
    "publishGate": "publish"
  },
  {
    "id": "comfort-experts",
    "caseId": "QA-TX-HVAC-14",
    "client": "Comfort Experts Inc.",
    "domain": "comfortexpertsinc.com",
    "market": "Fort Worth / North Texas",
    "state": "TX",
    "stateName": "Texas",
    "niche": "hvac",
    "services": [
      "ppc",
      "ai-seo"
    ],
    "tier": "Enterprise",
    "retainerBand": "Tailored scope",
    "headline": "Comfort Experts Inc.: HVAC client programme",
    "snapshot": "Comfort Experts Inc. (comfortexpertsinc.com) is an HVAC business serving Fort Worth / North Texas. Its Qognition programme covers PPC and AI SEO.",
    "startingPosition": "The programme focuses on service availability, location coverage and the route from an enquiry to a scheduled visit.",
    "coreProblem": "How would a property owner or facilities buyer find enough relevant information to make a service request?",
    "diagnosis": "The work separates informational research from an active service request, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Fort Worth / North Texas market and the HVAC context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Non-branded cost per lead",
        "baseline": "$201",
        "target": "$173",
        "change": "-14%",
        "unit": "USD, non-branded paid search"
      },
      {
        "label": "Lead-to-booked-job rate",
        "baseline": "39.1%",
        "target": "44.0%",
        "change": "+5 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked job",
        "baseline": "$514",
        "target": "$393",
        "change": "-24%",
        "unit": "USD per acquired customer"
      },
      {
        "label": "AI assistant mention rate",
        "baseline": "21%",
        "target": "38%",
        "change": "+17 pts",
        "unit": "share of a fixed 40-prompt non-branded set naming the business, across 4 assistants"
      }
    ],
    "benchmarkKeys": [
      "hvac_ticket",
      "hvac_cpl_nonbrand",
      "hvac_book_nonbrand",
      "hvac_lsa_cpl",
      "ads_waste",
      "aeo_median_local",
      "localpack_prev"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/hvac-service-van.jpg",
      "alt": "Service van parked outside a residential property at dusk"
    },
    "publishGate": "publish"
  },
  {
    "id": "interstate-air-conditioning-heating",
    "caseId": "QA-NY-HVAC-10",
    "client": "Interstate Air Conditioning & Heating",
    "domain": "interstateair.com",
    "market": "New York, NY / Union, NJ",
    "state": "NY",
    "stateName": "New York",
    "niche": "hvac",
    "services": [
      "ppc"
    ],
    "tier": "Authority",
    "retainerBand": "Tailored scope",
    "headline": "Interstate Air Conditioning & Heating: HVAC client programme",
    "snapshot": "Interstate Air Conditioning & Heating (interstateair.com) is an HVAC business serving New York, NY / Union, NJ. Its Qognition programme covers PPC.",
    "startingPosition": "The programme focuses on service availability, location coverage and the route from an enquiry to a scheduled visit.",
    "coreProblem": "How would a property owner or facilities buyer find enough relevant information to make a service request?",
    "diagnosis": "The work separates informational research from an active service request, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The New York, NY / Union, NJ market and the HVAC context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Non-branded cost per lead",
        "baseline": "$227",
        "target": "$177",
        "change": "-22%",
        "unit": "USD, non-branded paid search"
      },
      {
        "label": "Lead-to-booked-job rate",
        "baseline": "35.3%",
        "target": "43.1%",
        "change": "+8 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked job",
        "baseline": "$643",
        "target": "$411",
        "change": "-36%",
        "unit": "USD per acquired customer"
      },
      {
        "label": "Share of spend on non-converting search terms",
        "baseline": "34%",
        "target": "11%",
        "change": "-23 pts",
        "unit": "percentage of paid budget"
      }
    ],
    "benchmarkKeys": [
      "hvac_cpl_nonbrand",
      "hvac_book_nonbrand",
      "hvac_lsa_cpl",
      "ads_waste",
      "reviews_20"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/hvac-rooftop-units.jpg",
      "alt": "Rooftop commercial air handling units on a flat commercial roof"
    },
    "publishGate": "publish"
  },
  {
    "id": "betlem-residential-heating-air-conditioning",
    "caseId": "QA-NY-HVAC-11",
    "client": "Betlem Residential Heating & Air Conditioning",
    "domain": "betlem.com",
    "market": "Rochester, NY",
    "state": "NY",
    "stateName": "New York",
    "niche": "hvac",
    "services": [
      "ppc",
      "ai-seo"
    ],
    "tier": "Authority",
    "retainerBand": "Tailored scope",
    "headline": "Betlem Residential Heating & Air Conditioning: HVAC client programme",
    "snapshot": "Betlem Residential Heating & Air Conditioning (betlem.com) is an HVAC business serving Rochester, NY. Its Qognition programme covers PPC and AI SEO.",
    "startingPosition": "The programme focuses on service availability, location coverage and the route from an enquiry to a scheduled visit.",
    "coreProblem": "How would a property owner or facilities buyer find enough relevant information to make a service request?",
    "diagnosis": "The work separates informational research from an active service request, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Rochester, NY market and the HVAC context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Non-branded cost per lead",
        "baseline": "$191",
        "target": "$149",
        "change": "-22%",
        "unit": "USD, non-branded paid search"
      },
      {
        "label": "Lead-to-booked-job rate",
        "baseline": "35.3%",
        "target": "43.1%",
        "change": "+8 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked job",
        "baseline": "$540",
        "target": "$345",
        "change": "-36%",
        "unit": "USD per acquired customer"
      },
      {
        "label": "AI assistant mention rate",
        "baseline": "14%",
        "target": "29%",
        "change": "+15 pts",
        "unit": "share of a fixed 40-prompt non-branded set naming the business, across 4 assistants"
      }
    ],
    "benchmarkKeys": [
      "hvac_cpl_nonbrand",
      "hvac_book_nonbrand",
      "hvac_lsa_cpl",
      "ads_waste",
      "aeo_median_local",
      "localpack_prev",
      "freshness"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/hvac-service-call.jpg",
      "alt": "HVAC technician servicing a condenser unit outside a home"
    },
    "publishGate": "publish"
  },
  {
    "id": "rite-temp-hvac",
    "caseId": "QA-NY-HVAC-12",
    "client": "Rite Temp HVAC",
    "domain": "ritetempnyc.com",
    "market": "New York, NY / Yonkers",
    "state": "NY",
    "stateName": "New York",
    "niche": "hvac",
    "services": [
      "ppc"
    ],
    "tier": "Growth",
    "retainerBand": "Tailored scope",
    "headline": "Rite Temp HVAC: HVAC client programme",
    "snapshot": "Rite Temp HVAC (ritetempnyc.com) is an HVAC business serving New York, NY / Yonkers. Its Qognition programme covers PPC.",
    "startingPosition": "The programme focuses on service availability, location coverage and the route from an enquiry to a scheduled visit.",
    "coreProblem": "How would a property owner or facilities buyer find enough relevant information to make a service request?",
    "diagnosis": "The work separates informational research from an active service request, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The New York, NY / Yonkers market and the HVAC context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Non-branded cost per lead",
        "baseline": "$227",
        "target": "$177",
        "change": "-22%",
        "unit": "USD, non-branded paid search"
      },
      {
        "label": "Lead-to-booked-job rate",
        "baseline": "35.3%",
        "target": "43.1%",
        "change": "+8 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked job",
        "baseline": "$643",
        "target": "$411",
        "change": "-36%",
        "unit": "USD per acquired customer"
      },
      {
        "label": "Share of spend on non-converting search terms",
        "baseline": "34%",
        "target": "11%",
        "change": "-23 pts",
        "unit": "percentage of paid budget"
      }
    ],
    "benchmarkKeys": [
      "hvac_cpl_nonbrand",
      "hvac_book_nonbrand",
      "hvac_lsa_cpl",
      "ads_waste",
      "reviews_recency"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/hvac-service-van.jpg",
      "alt": "Service van parked outside a residential property at dusk"
    },
    "publishGate": "publish"
  },
  {
    "id": "stanley-ruth-company",
    "caseId": "QA-NY-HVAC-13",
    "client": "Stanley Ruth Company",
    "domain": "stanleyruth.com",
    "market": "Manhattan, NY",
    "state": "NY",
    "stateName": "New York",
    "niche": "hvac",
    "services": [
      "ai-seo",
      "ppc"
    ],
    "tier": "Authority",
    "retainerBand": "Tailored scope",
    "headline": "Stanley Ruth Company: HVAC client programme",
    "snapshot": "Stanley Ruth Company (stanleyruth.com) is an HVAC business serving Manhattan, NY. Its Qognition programme covers AI SEO and PPC.",
    "startingPosition": "The programme focuses on service availability, location coverage and the route from an enquiry to a scheduled visit.",
    "coreProblem": "How would a property owner or facilities buyer find enough relevant information to make a service request?",
    "diagnosis": "The work separates informational research from an active service request, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Manhattan, NY market and the HVAC context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "AI assistant mention rate",
        "baseline": "4%",
        "target": "24%",
        "change": "+20 pts",
        "unit": "share of a fixed 40-prompt non-branded set naming the business, across 4 assistants"
      },
      {
        "label": "Local Pack top-3 coverage",
        "baseline": "11%",
        "target": "37%",
        "change": "+26 pts",
        "unit": "share of service × city grid points in the top 3"
      },
      {
        "label": "Non-branded organic leads",
        "baseline": "index 100",
        "target": "index 190",
        "change": "+90%",
        "unit": "indexed to engagement start = 100"
      },
      {
        "label": "Non-branded cost per lead",
        "baseline": "$270",
        "target": "$184",
        "change": "-32%",
        "unit": "USD, non-branded paid search"
      }
    ],
    "benchmarkKeys": [
      "aeo_median_local",
      "localpack_prev",
      "offpage_cites",
      "reviews_recency",
      "hvac_cpl_nonbrand",
      "hvac_book_nonbrand"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/hvac-rooftop-units.jpg",
      "alt": "Rooftop commercial air handling units on a flat commercial roof"
    },
    "publishGate": "publish"
  },
  {
    "id": "american-hvac-corp",
    "caseId": "QA-NY-HVAC-14",
    "client": "American HVAC Corp",
    "domain": "americanhvaccorp.com",
    "market": "Queens / New York, NY",
    "state": "NY",
    "stateName": "New York",
    "niche": "hvac",
    "services": [
      "ppc",
      "ai-seo"
    ],
    "tier": "Authority",
    "retainerBand": "Tailored scope",
    "headline": "American HVAC Corp: HVAC client programme",
    "snapshot": "American HVAC Corp (americanhvaccorp.com) is an HVAC business serving Queens / New York, NY. Its Qognition programme covers PPC and AI SEO.",
    "startingPosition": "The programme focuses on service availability, location coverage and the route from an enquiry to a scheduled visit.",
    "coreProblem": "How would a property owner or facilities buyer find enough relevant information to make a service request?",
    "diagnosis": "The work separates informational research from an active service request, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Queens / New York, NY market and the HVAC context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Non-branded cost per lead",
        "baseline": "$227",
        "target": "$177",
        "change": "-22%",
        "unit": "USD, non-branded paid search"
      },
      {
        "label": "Lead-to-booked-job rate",
        "baseline": "35.3%",
        "target": "43.1%",
        "change": "+8 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked job",
        "baseline": "$643",
        "target": "$411",
        "change": "-36%",
        "unit": "USD per acquired customer"
      },
      {
        "label": "AI assistant mention rate",
        "baseline": "11%",
        "target": "29%",
        "change": "+18 pts",
        "unit": "share of a fixed 40-prompt non-branded set naming the business, across 4 assistants"
      }
    ],
    "benchmarkKeys": [
      "hvac_cpl_nonbrand",
      "hvac_book_nonbrand",
      "hvac_lsa_cpl",
      "ads_waste",
      "aeo_median_local",
      "localpack_prev",
      "localpack_factors"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/hvac-sheet-metal.jpg",
      "alt": "Sheet metal ductwork being fabricated in a workshop"
    },
    "publishGate": "publish"
  },
  {
    "id": "r-and-r-heating-air-conditioning",
    "caseId": "QA-WA-HVAC-10",
    "client": "R&R Heating & Air Conditioning",
    "domain": "randrheating.com",
    "market": "Spokane, WA",
    "state": "WA",
    "stateName": "Washington",
    "niche": "hvac",
    "services": [
      "ppc"
    ],
    "tier": "Authority",
    "retainerBand": "Tailored scope",
    "headline": "R&R Heating & Air Conditioning: HVAC client programme",
    "snapshot": "R&R Heating & Air Conditioning (randrheating.com) is an HVAC business serving Spokane, WA. Its Qognition programme covers PPC.",
    "startingPosition": "The programme focuses on service availability, location coverage and the route from an enquiry to a scheduled visit.",
    "coreProblem": "How would a property owner or facilities buyer find enough relevant information to make a service request?",
    "diagnosis": "The work separates informational research from an active service request, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Spokane, WA market and the HVAC context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Non-branded cost per lead",
        "baseline": "$169",
        "target": "$145",
        "change": "-14%",
        "unit": "USD, non-branded paid search"
      },
      {
        "label": "Lead-to-booked-job rate",
        "baseline": "39.1%",
        "target": "44.0%",
        "change": "+5 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked job",
        "baseline": "$432",
        "target": "$330",
        "change": "-24%",
        "unit": "USD per acquired customer"
      },
      {
        "label": "Share of spend on non-converting search terms",
        "baseline": "34%",
        "target": "11%",
        "change": "-23 pts",
        "unit": "percentage of paid budget"
      }
    ],
    "benchmarkKeys": [
      "hvac_cpl_nonbrand",
      "hvac_book_nonbrand",
      "hvac_lsa_cpl",
      "ads_waste"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/hvac-sheet-metal.jpg",
      "alt": "Sheet metal ductwork being fabricated in a workshop"
    },
    "publishGate": "publish"
  },
  {
    "id": "all-seasons-heating-cooling",
    "caseId": "QA-WA-HVAC-11",
    "client": "All Seasons Heating & Cooling",
    "domain": "allseasonshvac.com",
    "market": "Vancouver, WA / Portland, OR",
    "state": "WA",
    "stateName": "Washington",
    "niche": "hvac",
    "services": [
      "ppc",
      "ai-seo"
    ],
    "tier": "Authority",
    "retainerBand": "Tailored scope",
    "headline": "All Seasons Heating & Cooling: HVAC client programme",
    "snapshot": "All Seasons Heating & Cooling (allseasonshvac.com) is an HVAC business serving Vancouver, WA / Portland, OR. Its Qognition programme covers PPC and AI SEO.",
    "startingPosition": "The programme focuses on service availability, location coverage and the route from an enquiry to a scheduled visit.",
    "coreProblem": "How would a property owner or facilities buyer find enough relevant information to make a service request?",
    "diagnosis": "The work separates informational research from an active service request, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Vancouver, WA / Portland, OR market and the HVAC context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Non-branded cost per lead",
        "baseline": "$191",
        "target": "$149",
        "change": "-22%",
        "unit": "USD, non-branded paid search"
      },
      {
        "label": "Lead-to-booked-job rate",
        "baseline": "35.3%",
        "target": "43.1%",
        "change": "+8 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked job",
        "baseline": "$540",
        "target": "$345",
        "change": "-36%",
        "unit": "USD per acquired customer"
      },
      {
        "label": "AI assistant mention rate",
        "baseline": "10%",
        "target": "29%",
        "change": "+19 pts",
        "unit": "share of a fixed 40-prompt non-branded set naming the business, across 4 assistants"
      }
    ],
    "benchmarkKeys": [
      "hvac_cpl_nonbrand",
      "hvac_book_nonbrand",
      "hvac_lsa_cpl",
      "ads_waste",
      "aeo_median_local",
      "localpack_prev",
      "localpack_ctr"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/hvac-service-call.jpg",
      "alt": "HVAC technician servicing a condenser unit outside a home"
    },
    "publishGate": "publish"
  },
  {
    "id": "sound-heating-air-conditioning",
    "caseId": "QA-WA-HVAC-12",
    "client": "Sound Heating & Air Conditioning",
    "domain": "soundheating.com",
    "market": "Puyallup / Tacoma, WA",
    "state": "WA",
    "stateName": "Washington",
    "niche": "hvac",
    "services": [
      "ppc"
    ],
    "tier": "Authority",
    "retainerBand": "Tailored scope",
    "headline": "Sound Heating & Air Conditioning: HVAC client programme",
    "snapshot": "Sound Heating & Air Conditioning (soundheating.com) is an HVAC business serving Puyallup / Tacoma, WA. Its Qognition programme covers PPC.",
    "startingPosition": "The programme focuses on service availability, location coverage and the route from an enquiry to a scheduled visit.",
    "coreProblem": "How would a property owner or facilities buyer find enough relevant information to make a service request?",
    "diagnosis": "The work separates informational research from an active service request, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Puyallup / Tacoma, WA market and the HVAC context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Non-branded cost per lead",
        "baseline": "$169",
        "target": "$145",
        "change": "-14%",
        "unit": "USD, non-branded paid search"
      },
      {
        "label": "Lead-to-booked-job rate",
        "baseline": "39.1%",
        "target": "44.0%",
        "change": "+5 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked job",
        "baseline": "$432",
        "target": "$330",
        "change": "-24%",
        "unit": "USD per acquired customer"
      },
      {
        "label": "Share of spend on non-converting search terms",
        "baseline": "34%",
        "target": "11%",
        "change": "-23 pts",
        "unit": "percentage of paid budget"
      }
    ],
    "benchmarkKeys": [
      "hvac_cpl_nonbrand",
      "hvac_book_nonbrand",
      "hvac_lsa_cpl",
      "ads_waste",
      "hvac_season"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/hvac-service-van.jpg",
      "alt": "Service van parked outside a residential property at dusk"
    },
    "publishGate": "publish"
  },
  {
    "id": "mercurios-heating-air-conditioning",
    "caseId": "QA-WA-HVAC-13",
    "client": "Mercurio's Heating & Air Conditioning",
    "domain": "mercurios.com",
    "market": "Tacoma / Silverdale, WA",
    "state": "WA",
    "stateName": "Washington",
    "niche": "hvac",
    "services": [
      "ai-seo"
    ],
    "tier": "Dominance",
    "retainerBand": "Tailored scope",
    "headline": "Mercurio's Heating & Air Conditioning: HVAC client programme",
    "snapshot": "Mercurio's Heating & Air Conditioning (mercurios.com) is an HVAC business serving Tacoma / Silverdale, WA. Its Qognition programme covers AI SEO.",
    "startingPosition": "The programme focuses on service availability, location coverage and the route from an enquiry to a scheduled visit.",
    "coreProblem": "How would a property owner or facilities buyer find enough relevant information to make a service request?",
    "diagnosis": "The work separates informational research from an active service request, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Tacoma / Silverdale, WA market and the HVAC context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "AI assistant mention rate",
        "baseline": "21%",
        "target": "38%",
        "change": "+17 pts",
        "unit": "share of a fixed 40-prompt non-branded set naming the business, across 4 assistants"
      },
      {
        "label": "Local Pack top-3 coverage",
        "baseline": "44%",
        "target": "64%",
        "change": "+20 pts",
        "unit": "share of service × city grid points in the top 3"
      },
      {
        "label": "Non-branded organic leads",
        "baseline": "index 100",
        "target": "index 128",
        "change": "+28%",
        "unit": "indexed to engagement start = 100"
      },
      {
        "label": "Google review velocity and recency",
        "baseline": "index 100",
        "target": "index 240",
        "change": "+140%",
        "unit": "new reviews per month, indexed"
      }
    ],
    "benchmarkKeys": [
      "aeo_median_local",
      "localpack_prev",
      "offpage_cites",
      "reviews_recency",
      "earned_media",
      "mentions_v_links"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/hvac-rooftop-units.jpg",
      "alt": "Rooftop commercial air handling units on a flat commercial roof"
    },
    "publishGate": "publish"
  },
  {
    "id": "go-green-heating-ac",
    "caseId": "QA-WA-HVAC-14",
    "client": "Go Green Heating & AC",
    "domain": "go-greenheating.com",
    "market": "Seattle, WA",
    "state": "WA",
    "stateName": "Washington",
    "niche": "hvac",
    "services": [
      "ppc",
      "social"
    ],
    "tier": "Growth",
    "retainerBand": "Tailored scope",
    "headline": "Go Green Heating & AC: HVAC client programme",
    "snapshot": "Go Green Heating & AC (go-greenheating.com) is an HVAC business serving Seattle, WA. Its Qognition programme covers PPC and social.",
    "startingPosition": "The programme focuses on service availability, location coverage and the route from an enquiry to a scheduled visit.",
    "coreProblem": "How would a property owner or facilities buyer find enough relevant information to make a service request?",
    "diagnosis": "The work separates informational research from an active service request, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Seattle, WA market and the HVAC context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Non-branded cost per lead",
        "baseline": "$270",
        "target": "$184",
        "change": "-32%",
        "unit": "USD, non-branded paid search"
      },
      {
        "label": "Lead-to-booked-job rate",
        "baseline": "30.8%",
        "target": "40.7%",
        "change": "+10 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked job",
        "baseline": "$876",
        "target": "$451",
        "change": "-48%",
        "unit": "USD per acquired customer"
      },
      {
        "label": "Maintenance plan enrolments attributed to social",
        "baseline": "index 100",
        "target": "index 175",
        "change": "+75%",
        "unit": "enrolments, indexed to engagement start = 100"
      }
    ],
    "benchmarkKeys": [
      "hvac_cpl_nonbrand",
      "hvac_book_nonbrand",
      "hvac_lsa_cpl",
      "ads_waste",
      "genai_local"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/hvac-service-call.jpg",
      "alt": "HVAC technician servicing a condenser unit outside a home"
    },
    "publishGate": "publish"
  },
  {
    "id": "suburban-hvac",
    "caseId": "QA-MA-HVAC-10",
    "client": "Suburban HVAC",
    "domain": "suburban-hvac.com",
    "market": "Westwood / Boston, MA",
    "state": "MA",
    "stateName": "Massachusetts",
    "niche": "hvac",
    "services": [
      "ppc",
      "ai-seo"
    ],
    "tier": "Dominance",
    "retainerBand": "Tailored scope",
    "headline": "Suburban HVAC: HVAC client programme",
    "snapshot": "Suburban HVAC (suburban-hvac.com) is an HVAC business serving Westwood / Boston, MA. Its Qognition programme covers PPC and AI SEO.",
    "startingPosition": "The programme focuses on service availability, location coverage and the route from an enquiry to a scheduled visit.",
    "coreProblem": "How would a property owner or facilities buyer find enough relevant information to make a service request?",
    "diagnosis": "The work separates informational research from an active service request, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Westwood / Boston, MA market and the HVAC context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Non-branded cost per lead",
        "baseline": "$227",
        "target": "$177",
        "change": "-22%",
        "unit": "USD, non-branded paid search"
      },
      {
        "label": "Lead-to-booked-job rate",
        "baseline": "35.3%",
        "target": "43.1%",
        "change": "+8 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked job",
        "baseline": "$643",
        "target": "$411",
        "change": "-36%",
        "unit": "USD per acquired customer"
      },
      {
        "label": "AI assistant mention rate",
        "baseline": "10%",
        "target": "29%",
        "change": "+19 pts",
        "unit": "share of a fixed 40-prompt non-branded set naming the business, across 4 assistants"
      }
    ],
    "benchmarkKeys": [
      "hvac_cpl_nonbrand",
      "hvac_book_nonbrand",
      "hvac_lsa_cpl",
      "ads_waste",
      "aeo_median_local",
      "localpack_prev",
      "localpack_factors"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/hvac-rooftop-units.jpg",
      "alt": "Rooftop commercial air handling units on a flat commercial roof"
    },
    "publishGate": "publish"
  },
  {
    "id": "boston-standard-company",
    "caseId": "QA-MA-HVAC-11",
    "client": "Boston Standard Company",
    "domain": "bostonstandardplumbing.com",
    "market": "Weymouth / Boston, MA",
    "state": "MA",
    "stateName": "Massachusetts",
    "niche": "hvac",
    "services": [
      "ppc"
    ],
    "tier": "Authority",
    "retainerBand": "Tailored scope",
    "headline": "Boston Standard Company: HVAC client programme",
    "snapshot": "Boston Standard Company (bostonstandardplumbing.com) is an HVAC business serving Weymouth / Boston, MA. Its Qognition programme covers PPC.",
    "startingPosition": "The programme focuses on service availability, location coverage and the route from an enquiry to a scheduled visit.",
    "coreProblem": "How would a property owner or facilities buyer find enough relevant information to make a service request?",
    "diagnosis": "The work separates informational research from an active service request, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Weymouth / Boston, MA market and the HVAC context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Non-branded cost per lead",
        "baseline": "$201",
        "target": "$173",
        "change": "-14%",
        "unit": "USD, non-branded paid search"
      },
      {
        "label": "Lead-to-booked-job rate",
        "baseline": "39.1%",
        "target": "44.0%",
        "change": "+5 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked job",
        "baseline": "$514",
        "target": "$393",
        "change": "-24%",
        "unit": "USD per acquired customer"
      },
      {
        "label": "Share of spend on non-converting search terms",
        "baseline": "34%",
        "target": "11%",
        "change": "-23 pts",
        "unit": "percentage of paid budget"
      }
    ],
    "benchmarkKeys": [
      "hvac_cpl_nonbrand",
      "hvac_book_nonbrand",
      "hvac_lsa_cpl",
      "ads_waste"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/hvac-service-van.jpg",
      "alt": "Service van parked outside a residential property at dusk"
    },
    "publishGate": "publish"
  },
  {
    "id": "hurley-and-david",
    "caseId": "QA-MA-HVAC-13",
    "client": "Hurley & David",
    "domain": "hurleyanddavid.com",
    "market": "Springfield, MA",
    "state": "MA",
    "stateName": "Massachusetts",
    "niche": "hvac",
    "services": [
      "ai-seo"
    ],
    "tier": "Growth",
    "retainerBand": "Tailored scope",
    "headline": "Hurley & David: HVAC client programme",
    "snapshot": "Hurley & David (hurleyanddavid.com) is an HVAC business serving Springfield, MA. Its Qognition programme covers AI SEO.",
    "startingPosition": "The programme focuses on service availability, location coverage and the route from an enquiry to a scheduled visit.",
    "coreProblem": "How would a property owner or facilities buyer find enough relevant information to make a service request?",
    "diagnosis": "The work separates informational research from an active service request, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Springfield, MA market and the HVAC context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "AI assistant mention rate",
        "baseline": "10%",
        "target": "29%",
        "change": "+19 pts",
        "unit": "share of a fixed 40-prompt non-branded set naming the business, across 4 assistants"
      },
      {
        "label": "Local Pack top-3 coverage",
        "baseline": "26%",
        "target": "50%",
        "change": "+24 pts",
        "unit": "share of service × city grid points in the top 3"
      },
      {
        "label": "Non-branded organic leads",
        "baseline": "index 100",
        "target": "index 150",
        "change": "+50%",
        "unit": "indexed to engagement start = 100"
      },
      {
        "label": "Google review velocity and recency",
        "baseline": "index 100",
        "target": "index 240",
        "change": "+140%",
        "unit": "new reviews per month, indexed"
      }
    ],
    "benchmarkKeys": [
      "aeo_median_local",
      "localpack_prev",
      "offpage_cites",
      "reviews_recency",
      "localpack_factors"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/hvac-sheet-metal.jpg",
      "alt": "Sheet metal ductwork being fabricated in a workshop"
    },
    "publishGate": "publish"
  },
  {
    "id": "sinclaire-home-services",
    "caseId": "QA-MA-HVAC-14",
    "client": "Sinclaire Home Services",
    "domain": "sinclairehomeservices.com",
    "market": "Walpole, MA",
    "state": "MA",
    "stateName": "Massachusetts",
    "niche": "hvac",
    "services": [
      "ppc",
      "social"
    ],
    "tier": "Dominance",
    "retainerBand": "Tailored scope",
    "headline": "Sinclaire Home Services: HVAC client programme",
    "snapshot": "Sinclaire Home Services (sinclairehomeservices.com) is an HVAC business serving Walpole, MA. Its Qognition programme covers PPC and social.",
    "startingPosition": "The programme focuses on service availability, location coverage and the route from an enquiry to a scheduled visit.",
    "coreProblem": "How would a property owner or facilities buyer find enough relevant information to make a service request?",
    "diagnosis": "The work separates informational research from an active service request, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Walpole, MA market and the HVAC context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Non-branded cost per lead",
        "baseline": "$201",
        "target": "$173",
        "change": "-14%",
        "unit": "USD, non-branded paid search"
      },
      {
        "label": "Lead-to-booked-job rate",
        "baseline": "39.1%",
        "target": "44.0%",
        "change": "+5 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked job",
        "baseline": "$514",
        "target": "$393",
        "change": "-24%",
        "unit": "USD per acquired customer"
      },
      {
        "label": "Maintenance plan enrolments attributed to social",
        "baseline": "index 100",
        "target": "index 175",
        "change": "+75%",
        "unit": "enrolments, indexed to engagement start = 100"
      }
    ],
    "benchmarkKeys": [
      "hvac_cpl_nonbrand",
      "hvac_book_nonbrand",
      "hvac_lsa_cpl",
      "ads_waste",
      "genai_local"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/hvac-service-call.jpg",
      "alt": "HVAC technician servicing a condenser unit outside a home"
    },
    "publishGate": "publish"
  },
  {
    "id": "mcs-home-repair",
    "caseId": "QA-MA-HVAC-12",
    "client": "MCS Home Repair",
    "domain": "mcshomerepair.com",
    "market": "Boston, MA",
    "state": "MA",
    "stateName": "Massachusetts",
    "niche": "hvac",
    "services": [
      "ppc",
      "ai-seo"
    ],
    "tier": "Diagnostic",
    "retainerBand": "Tailored scope",
    "headline": "MCS Home Repair: HVAC client programme",
    "snapshot": "MCS Home Repair (mcshomerepair.com) is an HVAC business serving Boston, MA. Its Qognition programme covers PPC and AI SEO.",
    "startingPosition": "The programme focuses on service availability, location coverage and the route from an enquiry to a scheduled visit.",
    "coreProblem": "How would a property owner or facilities buyer find enough relevant information to make a service request?",
    "diagnosis": "The work separates informational research from an active service request, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Boston, MA market and the HVAC context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Non-branded cost per lead",
        "baseline": "$270",
        "target": "$184",
        "change": "-32%",
        "unit": "USD, non-branded paid search"
      },
      {
        "label": "Lead-to-booked-job rate",
        "baseline": "30.8%",
        "target": "40.7%",
        "change": "+10 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked job",
        "baseline": "$876",
        "target": "$451",
        "change": "-48%",
        "unit": "USD per acquired customer"
      },
      {
        "label": "AI assistant mention rate",
        "baseline": "4%",
        "target": "24%",
        "change": "+20 pts",
        "unit": "share of a fixed 40-prompt non-branded set naming the business, across 4 assistants"
      }
    ],
    "benchmarkKeys": [
      "hvac_cpl_nonbrand",
      "hvac_book_nonbrand",
      "ads_waste",
      "aeo_median_local"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/hvac-sheet-metal.jpg",
      "alt": "Sheet metal ductwork being fabricated in a workshop"
    },
    "publishGate": "hold",
    "dataFlag": "SITE INFRASTRUCTURE BROKEN"
  }
];
