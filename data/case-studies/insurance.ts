import type { CaseStudy } from './types';

// Client programmes (operator decision, 2026-10-07). Baselines and targets were set at the start
// of each engagement. A KPI row becomes a result only when `actual` is filled from the client's own
// reporting; caseStudyEvidence() in ./types decides, and nothing here overrides it.
export const INSURANCE_CASE_STUDIES: CaseStudy[] = [
  {
    "id": "alliance-insurance-group",
    "caseId": "QA-CO-INSU-11",
    "client": "Alliance Insurance Group",
    "domain": "allinsgrp.com",
    "market": "Colorado & Florida",
    "state": "CO",
    "stateName": "Colorado",
    "niche": "insurance",
    "services": [
      "ai-seo"
    ],
    "tier": "Growth",
    "retainerBand": "Tailored scope",
    "headline": "Alliance Insurance Group: Insurance client programme",
    "snapshot": "Alliance Insurance Group (allinsgrp.com) is an insurance business serving Colorado & Florida. Its Qognition programme covers AI SEO.",
    "startingPosition": "The programme focuses on the intended policyholder, service jurisdiction, coverage explanations and the information a broker needs before advising.",
    "coreProblem": "How would a buyer evaluating coverage or a broker find enough relevant information to make a qualified insurance enquiry?",
    "diagnosis": "The work separates informational research from an active qualified insurance enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Colorado & Florida market and the insurance context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "AI assistant mention rate",
        "baseline": "10%",
        "target": "23%",
        "change": "+13 pts",
        "unit": "share of prompts naming the agency, across 4 assistants; 22% category median"
      },
      {
        "label": "Local Pack coverage on '[line] insurance [city]'",
        "baseline": "26%",
        "target": "50%",
        "change": "+92%",
        "unit": "share of grid points in the top 3"
      },
      {
        "label": "Non-branded quote requests",
        "baseline": "index 100",
        "target": "index 150",
        "change": "+50%",
        "unit": "indexed to engagement start = 100"
      },
      {
        "label": "Commercial-line enquiry share",
        "baseline": "18%",
        "target": "34%",
        "change": "+16 pts",
        "unit": "share of enquiries from commercial lines"
      }
    ],
    "benchmarkKeys": [
      "ins_aio_comm",
      "aeo_median_fin",
      "earned_media",
      "ins_ai_journey",
      "localpack_factors"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/insurance-office.jpg",
      "alt": "Insurance agent reviewing policy documents with a client across a desk"
    },
    "publishGate": "publish"
  },
  {
    "id": "a-citywide-insurance",
    "caseId": "QA-CO-INSU-13",
    "client": "A CityWide Insurance",
    "domain": "acitywide.com",
    "market": "Denver, CO",
    "state": "CO",
    "stateName": "Colorado",
    "niche": "insurance",
    "services": [
      "ppc",
      "ai-seo"
    ],
    "tier": "Dominance",
    "retainerBand": "Tailored scope",
    "headline": "A CityWide Insurance: Insurance client programme",
    "snapshot": "A CityWide Insurance (acitywide.com) is an insurance business serving Denver, CO. Its Qognition programme covers PPC and AI SEO.",
    "startingPosition": "The programme focuses on the intended policyholder, service jurisdiction, coverage explanations and the information a broker needs before advising.",
    "coreProblem": "How would a buyer evaluating coverage or a broker find enough relevant information to make a qualified insurance enquiry?",
    "diagnosis": "The work separates informational research from an active qualified insurance enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Denver, CO market and the insurance context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Cost per quote request",
        "baseline": "$135",
        "target": "$92",
        "change": "-32%",
        "unit": "USD, non-branded paid search"
      },
      {
        "label": "Quote-form completion rate",
        "baseline": "12.0%",
        "target": "22.0%",
        "change": "+10 pts",
        "unit": "percentage of started forms completed, against a 16% category baseline"
      },
      {
        "label": "Cost per bound policy",
        "baseline": "$1,124",
        "target": "$417",
        "change": "-63%",
        "unit": "USD per acquired customer"
      },
      {
        "label": "AI assistant mention rate",
        "baseline": "4%",
        "target": "19%",
        "change": "+15 pts",
        "unit": "share of prompts naming the agency, across 4 assistants; 22% category median"
      }
    ],
    "benchmarkKeys": [
      "ins_cpl",
      "ins_abandon",
      "ins_quotes",
      "ins_cac",
      "ins_aio_comm",
      "aeo_median_fin",
      "localpack_factors",
      "ins_retention"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/insurance-paperwork.jpg",
      "alt": "Policy paperwork and a calculator on a desk"
    },
    "publishGate": "publish"
  },
  {
    "id": "gengler-insurance-agencies",
    "caseId": "QA-VA-INSU-10",
    "client": "Gengler Insurance Agencies",
    "domain": "ginsurance.net",
    "market": "Fairfax, VA",
    "state": "VA",
    "stateName": "Virginia",
    "niche": "insurance",
    "services": [
      "ai-seo",
      "ppc"
    ],
    "tier": "Dominance",
    "retainerBand": "Tailored scope",
    "headline": "Gengler Insurance Agencies: Insurance client programme",
    "snapshot": "Gengler Insurance Agencies (ginsurance.net) is an insurance business serving Fairfax, VA. Its Qognition programme covers AI SEO and PPC.",
    "startingPosition": "The programme focuses on the intended policyholder, service jurisdiction, coverage explanations and the information a broker needs before advising.",
    "coreProblem": "How would a buyer evaluating coverage or a broker find enough relevant information to make a qualified insurance enquiry?",
    "diagnosis": "The work separates informational research from an active qualified insurance enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Fairfax, VA market and the insurance context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "AI assistant mention rate",
        "baseline": "4%",
        "target": "19%",
        "change": "+15 pts",
        "unit": "share of prompts naming the agency, across 4 assistants; 22% category median"
      },
      {
        "label": "Local Pack coverage on '[line] insurance [city]'",
        "baseline": "11%",
        "target": "37%",
        "change": "+236%",
        "unit": "share of grid points in the top 3"
      },
      {
        "label": "Non-branded quote requests",
        "baseline": "index 100",
        "target": "index 190",
        "change": "+90%",
        "unit": "indexed to engagement start = 100"
      },
      {
        "label": "Cost per quote request",
        "baseline": "$135",
        "target": "$92",
        "change": "-32%",
        "unit": "USD, non-branded paid search"
      }
    ],
    "benchmarkKeys": [
      "ins_aio_comm",
      "aeo_median_fin",
      "earned_media",
      "ins_ai_journey",
      "ins_cpl",
      "ins_abandon"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/insurance-office.jpg",
      "alt": "Insurance agent reviewing policy documents with a client across a desk"
    },
    "publishGate": "publish"
  },
  {
    "id": "suffolk-insurance-corporation",
    "caseId": "QA-VA-INSU-11",
    "client": "Suffolk Insurance Corporation",
    "domain": "suffolkinsurance.com",
    "market": "Suffolk, VA",
    "state": "VA",
    "stateName": "Virginia",
    "niche": "insurance",
    "services": [
      "ai-seo"
    ],
    "tier": "Essential",
    "retainerBand": "Tailored scope",
    "headline": "Suffolk Insurance Corporation: Insurance client programme",
    "snapshot": "Suffolk Insurance Corporation (suffolkinsurance.com) is an insurance business serving Suffolk, VA. Its Qognition programme covers AI SEO.",
    "startingPosition": "The programme focuses on the intended policyholder, service jurisdiction, coverage explanations and the information a broker needs before advising.",
    "coreProblem": "How would a buyer evaluating coverage or a broker find enough relevant information to make a qualified insurance enquiry?",
    "diagnosis": "The work separates informational research from an active qualified insurance enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Suffolk, VA market and the insurance context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "AI assistant mention rate",
        "baseline": "4%",
        "target": "19%",
        "change": "+15 pts",
        "unit": "share of prompts naming the agency, across 4 assistants; 22% category median"
      },
      {
        "label": "Local Pack coverage on '[line] insurance [city]'",
        "baseline": "11%",
        "target": "37%",
        "change": "+236%",
        "unit": "share of grid points in the top 3"
      },
      {
        "label": "Non-branded quote requests",
        "baseline": "index 100",
        "target": "index 190",
        "change": "+90%",
        "unit": "indexed to engagement start = 100"
      },
      {
        "label": "Commercial-line enquiry share",
        "baseline": "18%",
        "target": "34%",
        "change": "+16 pts",
        "unit": "share of enquiries from commercial lines"
      }
    ],
    "benchmarkKeys": [
      "ins_aio_comm",
      "aeo_median_fin",
      "earned_media",
      "ins_ai_journey"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/insurance-commercial.jpg",
      "alt": "Commercial building exterior on an overcast day"
    },
    "publishGate": "publish"
  },
  {
    "id": "rl-insurance-agency",
    "caseId": "QA-VA-INSU-12",
    "client": "RL Insurance Agency",
    "domain": "rlinsuranceagency.com",
    "market": "Annandale / Arlington, VA",
    "state": "VA",
    "stateName": "Virginia",
    "niche": "insurance",
    "services": [
      "ai-seo",
      "ppc"
    ],
    "tier": "Dominance",
    "retainerBand": "Tailored scope",
    "headline": "RL Insurance Agency: Insurance client programme",
    "snapshot": "RL Insurance Agency (rlinsuranceagency.com) is an insurance business serving Annandale / Arlington, VA. Its Qognition programme covers AI SEO and PPC.",
    "startingPosition": "The programme focuses on the intended policyholder, service jurisdiction, coverage explanations and the information a broker needs before advising.",
    "coreProblem": "How would a buyer evaluating coverage or a broker find enough relevant information to make a qualified insurance enquiry?",
    "diagnosis": "The work separates informational research from an active qualified insurance enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Annandale / Arlington, VA market and the insurance context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "AI assistant mention rate",
        "baseline": "10%",
        "target": "23%",
        "change": "+13 pts",
        "unit": "share of prompts naming the agency, across 4 assistants; 22% category median"
      },
      {
        "label": "Local Pack coverage on '[line] insurance [city]'",
        "baseline": "26%",
        "target": "50%",
        "change": "+92%",
        "unit": "share of grid points in the top 3"
      },
      {
        "label": "Non-branded quote requests",
        "baseline": "index 100",
        "target": "index 150",
        "change": "+50%",
        "unit": "indexed to engagement start = 100"
      },
      {
        "label": "Cost per quote request",
        "baseline": "$114",
        "target": "$89",
        "change": "-22%",
        "unit": "USD, non-branded paid search"
      }
    ],
    "benchmarkKeys": [
      "ins_aio_comm",
      "aeo_median_fin",
      "earned_media",
      "ins_ai_journey",
      "ins_cpl",
      "ins_abandon"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/insurance-office.jpg",
      "alt": "Insurance agent reviewing policy documents with a client across a desk"
    },
    "publishGate": "publish"
  },
  {
    "id": "dulles-insurance-services",
    "caseId": "QA-VA-INSU-13",
    "client": "Dulles Insurance Services",
    "domain": "dullesinsurance.com",
    "market": "Leesburg, VA",
    "state": "VA",
    "stateName": "Virginia",
    "niche": "insurance",
    "services": [
      "ppc",
      "ai-seo"
    ],
    "tier": "Dominance",
    "retainerBand": "Tailored scope",
    "headline": "Dulles Insurance Services: Insurance client programme",
    "snapshot": "Dulles Insurance Services (dullesinsurance.com) is an insurance business serving Leesburg, VA. Its Qognition programme covers PPC and AI SEO.",
    "startingPosition": "The programme focuses on the intended policyholder, service jurisdiction, coverage explanations and the information a broker needs before advising.",
    "coreProblem": "How would a buyer evaluating coverage or a broker find enough relevant information to make a qualified insurance enquiry?",
    "diagnosis": "The work separates informational research from an active qualified insurance enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Leesburg, VA market and the insurance context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Cost per quote request",
        "baseline": "$100",
        "target": "$86",
        "change": "-14%",
        "unit": "USD, non-branded paid search"
      },
      {
        "label": "Quote-form completion rate",
        "baseline": "19.0%",
        "target": "29.0%",
        "change": "+10 pts",
        "unit": "percentage of started forms completed, against a 16% category baseline"
      },
      {
        "label": "Cost per bound policy",
        "baseline": "$529",
        "target": "$298",
        "change": "-44%",
        "unit": "USD per acquired customer"
      },
      {
        "label": "AI assistant mention rate",
        "baseline": "17%",
        "target": "30%",
        "change": "+13 pts",
        "unit": "share of prompts naming the agency, across 4 assistants; 22% category median"
      }
    ],
    "benchmarkKeys": [
      "ins_cpl",
      "ins_abandon",
      "ins_quotes",
      "ins_cac",
      "ins_aio_comm",
      "aeo_median_fin",
      "ins_cpc",
      "ins_retention"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/insurance-commercial.jpg",
      "alt": "Commercial building exterior on an overcast day"
    },
    "publishGate": "publish"
  },
  {
    "id": "1st-american-insurance-agency",
    "caseId": "QA-CO-INSU-10",
    "client": "1st American Insurance Agency",
    "domain": "1aia.com",
    "market": "Longmont, CO",
    "state": "CO",
    "stateName": "Colorado",
    "niche": "insurance",
    "services": [
      "ai-seo",
      "ppc"
    ],
    "tier": "Diagnostic",
    "retainerBand": "Tailored scope",
    "headline": "1st American Insurance Agency: Insurance client programme",
    "snapshot": "1st American Insurance Agency (1aia.com) is an insurance business serving Longmont, CO. Its Qognition programme covers AI SEO and PPC.",
    "startingPosition": "The programme focuses on the intended policyholder, service jurisdiction, coverage explanations and the information a broker needs before advising.",
    "coreProblem": "How would a buyer evaluating coverage or a broker find enough relevant information to make a qualified insurance enquiry?",
    "diagnosis": "The work separates informational research from an active qualified insurance enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Longmont, CO market and the insurance context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "AI assistant mention rate",
        "baseline": "4%",
        "target": "19%",
        "change": "+15 pts",
        "unit": "share of prompts naming the agency, across 4 assistants; 22% category median"
      },
      {
        "label": "Local Pack coverage on '[line] insurance [city]'",
        "baseline": "11%",
        "target": "37%",
        "change": "+236%",
        "unit": "share of grid points in the top 3"
      },
      {
        "label": "Non-branded quote requests",
        "baseline": "index 100",
        "target": "index 190",
        "change": "+90%",
        "unit": "indexed to engagement start = 100"
      },
      {
        "label": "Cost per quote request",
        "baseline": "$113",
        "target": "$77",
        "change": "-32%",
        "unit": "USD, non-branded paid search"
      }
    ],
    "benchmarkKeys": [
      "ins_aio_comm",
      "aeo_median_fin",
      "earned_media",
      "ins_cpl"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/insurance-office.jpg",
      "alt": "Insurance agent reviewing policy documents with a client across a desk"
    },
    "publishGate": "hold",
    "dataFlag": "DOMAIN REDIRECTS"
  },
  {
    "id": "fci-colorado",
    "caseId": "QA-CO-INSU-12",
    "client": "FCI Colorado",
    "domain": "fcicolorado.com",
    "market": "Broomfield, CO",
    "state": "CO",
    "stateName": "Colorado",
    "niche": "insurance",
    "services": [
      "ai-seo",
      "social"
    ],
    "tier": "Diagnostic",
    "retainerBand": "Tailored scope",
    "headline": "FCI Colorado: Insurance client programme",
    "snapshot": "FCI Colorado (fcicolorado.com) is an insurance business serving Broomfield, CO. Its Qognition programme covers AI SEO and social.",
    "startingPosition": "The programme focuses on the intended policyholder, service jurisdiction, coverage explanations and the information a broker needs before advising.",
    "coreProblem": "How would a buyer evaluating coverage or a broker find enough relevant information to make a qualified insurance enquiry?",
    "diagnosis": "The work separates informational research from an active qualified insurance enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Broomfield, CO market and the insurance context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "AI assistant mention rate",
        "baseline": "4%",
        "target": "19%",
        "change": "+15 pts",
        "unit": "share of prompts naming the agency, across 4 assistants; 22% category median"
      },
      {
        "label": "Local Pack coverage on '[line] insurance [city]'",
        "baseline": "11%",
        "target": "37%",
        "change": "+236%",
        "unit": "share of grid points in the top 3"
      },
      {
        "label": "Non-branded quote requests",
        "baseline": "index 100",
        "target": "index 190",
        "change": "+90%",
        "unit": "indexed to engagement start = 100"
      },
      {
        "label": "Review volume and recency",
        "baseline": "index 100",
        "target": "index 240",
        "change": "+140%",
        "unit": "new reviews per month, indexed"
      }
    ],
    "benchmarkKeys": [
      "ins_aio_comm",
      "aeo_median_fin",
      "earned_media",
      "reviews_recency"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/insurance-paperwork.jpg",
      "alt": "Policy paperwork and a calculator on a desk"
    },
    "publishGate": "hold",
    "dataFlag": "DOMAIN REDIRECTS"
  },
  {
    "id": "onebeacon",
    "caseId": "QA-CO-INSU-14",
    "client": "OneBeacon",
    "domain": "onebeacon.com",
    "market": "Legacy carrier domain",
    "state": "CO",
    "stateName": "Colorado",
    "niche": "insurance",
    "services": [
      "ai-seo"
    ],
    "tier": "Diagnostic",
    "retainerBand": "Tailored scope",
    "headline": "OneBeacon: Insurance client programme",
    "snapshot": "OneBeacon (onebeacon.com) is an insurance business serving Legacy carrier domain. Its Qognition programme covers AI SEO.",
    "startingPosition": "The programme focuses on the intended policyholder, service jurisdiction, coverage explanations and the information a broker needs before advising.",
    "coreProblem": "How would a buyer evaluating coverage or a broker find enough relevant information to make a qualified insurance enquiry?",
    "diagnosis": "The work separates informational research from an active qualified insurance enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Legacy carrier domain market and the insurance context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "AI assistant mention rate",
        "baseline": "4%",
        "target": "19%",
        "change": "+15 pts",
        "unit": "share of prompts naming the agency, across 4 assistants; 22% category median"
      },
      {
        "label": "Local Pack coverage on '[line] insurance [city]'",
        "baseline": "11%",
        "target": "37%",
        "change": "+236%",
        "unit": "share of grid points in the top 3"
      },
      {
        "label": "Non-branded quote requests",
        "baseline": "index 100",
        "target": "index 190",
        "change": "+90%",
        "unit": "indexed to engagement start = 100"
      },
      {
        "label": "Commercial-line enquiry share",
        "baseline": "18%",
        "target": "34%",
        "change": "+16 pts",
        "unit": "share of enquiries from commercial lines"
      }
    ],
    "benchmarkKeys": [
      "ins_aio_comm",
      "aeo_median_fin"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/insurance-commercial.jpg",
      "alt": "Commercial building exterior on an overcast day"
    },
    "publishGate": "hold",
    "dataFlag": "NOT AN AGENCY / DORMANT",
    "excludeFromLibrary": true
  },
  {
    "id": "americas-insurance-company",
    "caseId": "QA-VA-INSU-14",
    "client": "Americas Insurance Company",
    "domain": "americas-insurance.com",
    "market": "New Orleans, LA",
    "state": "VA",
    "stateName": "Virginia",
    "niche": "insurance",
    "services": [
      "ai-seo",
      "social"
    ],
    "tier": "Diagnostic",
    "retainerBand": "Tailored scope",
    "headline": "Americas Insurance Company: Insurance client programme",
    "snapshot": "Americas Insurance Company (americas-insurance.com) is an insurance business serving New Orleans, LA. Its Qognition programme covers AI SEO and social.",
    "startingPosition": "The programme focuses on the intended policyholder, service jurisdiction, coverage explanations and the information a broker needs before advising.",
    "coreProblem": "How would a buyer evaluating coverage or a broker find enough relevant information to make a qualified insurance enquiry?",
    "diagnosis": "The work separates informational research from an active qualified insurance enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The New Orleans, LA market and the insurance context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "AI assistant mention rate",
        "baseline": "4%",
        "target": "19%",
        "change": "+15 pts",
        "unit": "share of prompts naming the agency, across 4 assistants; 22% category median"
      },
      {
        "label": "Local Pack coverage on '[line] insurance [city]'",
        "baseline": "11%",
        "target": "37%",
        "change": "+236%",
        "unit": "share of grid points in the top 3"
      },
      {
        "label": "Non-branded quote requests",
        "baseline": "index 100",
        "target": "index 190",
        "change": "+90%",
        "unit": "indexed to engagement start = 100"
      },
      {
        "label": "Review volume and recency",
        "baseline": "index 100",
        "target": "index 240",
        "change": "+140%",
        "unit": "new reviews per month, indexed"
      }
    ],
    "benchmarkKeys": [
      "ins_aio_comm",
      "aeo_median_fin",
      "earned_media",
      "reviews_recency"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/insurance-paperwork.jpg",
      "alt": "Policy paperwork and a calculator on a desk"
    },
    "publishGate": "hold",
    "dataFlag": "CARRIER, NOT AN AGENCY"
  }
];
