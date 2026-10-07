import type { CaseStudy } from './types';

// Client programmes (operator decision, 2026-10-07). Baselines and targets were set at the start
// of each engagement. A KPI row becomes a result only when `actual` is filled from the client's own
// reporting; caseStudyEvidence() in ./types decides, and nothing here overrides it.
export const DENTAL_CASE_STUDIES: CaseStudy[] = [
  {
    "id": "the-super-dentists",
    "caseId": "QA-CA-DENT-10",
    "client": "The Super Dentists",
    "domain": "thesuperdentists.com",
    "market": "San Diego, CA",
    "state": "CA",
    "stateName": "California",
    "niche": "dental",
    "services": [
      "ai-seo",
      "ppc"
    ],
    "tier": "Enterprise",
    "retainerBand": "Tailored scope",
    "headline": "The Super Dentists: Dental client programme",
    "snapshot": "The Super Dentists (thesuperdentists.com) is a dental practice serving San Diego, CA. Its Qognition programme covers AI SEO and PPC.",
    "startingPosition": "The programme focuses on service information, accessibility, professional review and the route to an appointment enquiry.",
    "coreProblem": "How would a person evaluating a dental service find enough relevant information to make an appointment enquiry?",
    "diagnosis": "The work separates informational research from an active appointment enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The San Diego, CA market and the dental context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "AI assistant mention rate",
        "baseline": "17%",
        "target": "38%",
        "change": "+21 pts",
        "unit": "share of the practice's patient-question prompt set naming it, across 4 assistants"
      },
      {
        "label": "Local Pack top-3 coverage on '[treatment] near me'",
        "baseline": "40%",
        "target": "60%",
        "change": "+50%",
        "unit": "share of grid points in the top 3"
      },
      {
        "label": "Non-branded organic new-patient enquiries",
        "baseline": "index 100",
        "target": "index 128",
        "change": "+28%",
        "unit": "indexed to engagement start = 100"
      },
      {
        "label": "Cost per lead by intent tier",
        "baseline": "$99",
        "target": "$85",
        "change": "-14%",
        "unit": "USD, blended across intent tiers"
      }
    ],
    "benchmarkKeys": [
      "patient_ai",
      "health_aio",
      "patient_stars",
      "offpage_cites",
      "dental_cpl",
      "dental_call_conv"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/dental-reception.jpg",
      "alt": "Bright dental practice reception desk with waiting area seating"
    },
    "publishGate": "publish"
  },
  {
    "id": "oncall-dental-fresno",
    "caseId": "QA-CA-DENT-11",
    "client": "OnCall Dental Fresno",
    "domain": "oncalldentalfresno.com",
    "market": "Fresno, CA",
    "state": "CA",
    "stateName": "California",
    "niche": "dental",
    "services": [
      "ppc",
      "ai-seo"
    ],
    "tier": "Authority",
    "retainerBand": "Tailored scope",
    "headline": "OnCall Dental Fresno: Dental client programme",
    "snapshot": "OnCall Dental Fresno (oncalldentalfresno.com) is a dental practice serving Fresno, CA. Its Qognition programme covers PPC and AI SEO.",
    "startingPosition": "The programme focuses on service information, accessibility, professional review and the route to an appointment enquiry.",
    "coreProblem": "How would a person evaluating a dental service find enough relevant information to make an appointment enquiry?",
    "diagnosis": "The work separates informational research from an active appointment enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Fresno, CA market and the dental context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Cost per lead by intent tier",
        "baseline": "$93",
        "target": "$73",
        "change": "-22%",
        "unit": "USD, blended across intent tiers"
      },
      {
        "label": "Call-to-appointment conversion rate",
        "baseline": "52.0%",
        "target": "64.0%",
        "change": "+12 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked new patient",
        "baseline": "$180",
        "target": "$114",
        "change": "-37%",
        "unit": "USD per acquired patient"
      },
      {
        "label": "AI assistant mention rate",
        "baseline": "10%",
        "target": "29%",
        "change": "+19 pts",
        "unit": "share of the practice's patient-question prompt set naming it, across 4 assistants"
      }
    ],
    "benchmarkKeys": [
      "dental_cpl",
      "dental_cpl_emerg",
      "dental_call_conv",
      "dental_calls_missed",
      "dental_newpt_value",
      "dental_followup",
      "patient_ai",
      "health_aio"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/dental-operatory.jpg",
      "alt": "Dental operatory with chair and overhead light, prepared for a patient"
    },
    "publishGate": "publish"
  },
  {
    "id": "sacramento-dentistry-group",
    "caseId": "QA-CA-DENT-12",
    "client": "Sacramento Dentistry Group",
    "domain": "sacramentodentistry.com",
    "market": "Sacramento, CA",
    "state": "CA",
    "stateName": "California",
    "niche": "dental",
    "services": [
      "ai-seo"
    ],
    "tier": "Authority",
    "retainerBand": "Tailored scope",
    "headline": "Sacramento Dentistry Group: Dental client programme",
    "snapshot": "Sacramento Dentistry Group (sacramentodentistry.com) is a dental practice serving Sacramento, CA. Its Qognition programme covers AI SEO.",
    "startingPosition": "The programme focuses on service information, accessibility, professional review and the route to an appointment enquiry.",
    "coreProblem": "How would a person evaluating a dental service find enough relevant information to make an appointment enquiry?",
    "diagnosis": "The work separates informational research from an active appointment enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Sacramento, CA market and the dental context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "AI assistant mention rate",
        "baseline": "17%",
        "target": "38%",
        "change": "+21 pts",
        "unit": "share of the practice's patient-question prompt set naming it, across 4 assistants"
      },
      {
        "label": "Local Pack top-3 coverage on '[treatment] near me'",
        "baseline": "40%",
        "target": "60%",
        "change": "+50%",
        "unit": "share of grid points in the top 3"
      },
      {
        "label": "Non-branded organic new-patient enquiries",
        "baseline": "index 100",
        "target": "index 128",
        "change": "+28%",
        "unit": "indexed to engagement start = 100"
      },
      {
        "label": "Review rating, volume and recency",
        "baseline": "index 100",
        "target": "index 240",
        "change": "+140%",
        "unit": "new reviews per month, indexed"
      }
    ],
    "benchmarkKeys": [
      "patient_ai",
      "health_aio",
      "patient_stars",
      "offpage_cites",
      "freshness"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/dental-imaging.jpg",
      "alt": "Panoramic dental x-ray displayed on a clinic monitor"
    },
    "publishGate": "publish"
  },
  {
    "id": "midtown-dental-sacramento",
    "caseId": "QA-CA-DENT-13",
    "client": "Midtown Dental",
    "domain": "midtowndentalsacramento.com",
    "market": "Sacramento, CA",
    "state": "CA",
    "stateName": "California",
    "niche": "dental",
    "services": [
      "ai-seo",
      "social"
    ],
    "tier": "Growth",
    "retainerBand": "Tailored scope",
    "headline": "Midtown Dental: Dental client programme",
    "snapshot": "Midtown Dental (midtowndentalsacramento.com) is a dental practice serving Sacramento, CA. Its Qognition programme covers AI SEO and social.",
    "startingPosition": "The programme focuses on service information, accessibility, professional review and the route to an appointment enquiry.",
    "coreProblem": "How would a person evaluating a dental service find enough relevant information to make an appointment enquiry?",
    "diagnosis": "The work separates informational research from an active appointment enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Sacramento, CA market and the dental context shape the service coverage and buyer needs the programme addresses.",
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
        "unit": "share of the practice's patient-question prompt set naming it, across 4 assistants"
      },
      {
        "label": "Local Pack top-3 coverage on '[treatment] near me'",
        "baseline": "11%",
        "target": "37%",
        "change": "+236%",
        "unit": "share of grid points in the top 3"
      },
      {
        "label": "Non-branded organic new-patient enquiries",
        "baseline": "index 100",
        "target": "index 190",
        "change": "+90%",
        "unit": "indexed to engagement start = 100"
      },
      {
        "label": "Instagram engagement rate",
        "baseline": "0.6%",
        "target": "1.9%",
        "change": "+1.3 pts",
        "unit": "against the 1.8% health and wellness category benchmark"
      }
    ],
    "benchmarkKeys": [
      "patient_ai",
      "health_aio",
      "patient_stars",
      "offpage_cites",
      "freshness",
      "dental_meta",
      "social_health_eng"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/dental-clinician.jpg",
      "alt": "Dentist in scrubs and loupes reviewing a chart with a colleague"
    },
    "publishGate": "publish"
  },
  {
    "id": "crown-dental-bakersfield",
    "caseId": "QA-CA-DENT-14",
    "client": "Crown Dental",
    "domain": "thecrowndental.com",
    "market": "Bakersfield, CA",
    "state": "CA",
    "stateName": "California",
    "niche": "dental",
    "services": [
      "ppc",
      "social"
    ],
    "tier": "Essential",
    "retainerBand": "Tailored scope",
    "headline": "Crown Dental: Dental client programme",
    "snapshot": "Crown Dental (thecrowndental.com) is a dental practice serving Bakersfield, CA. Its Qognition programme covers PPC and social.",
    "startingPosition": "The programme focuses on service information, accessibility, professional review and the route to an appointment enquiry.",
    "coreProblem": "How would a person evaluating a dental service find enough relevant information to make an appointment enquiry?",
    "diagnosis": "The work separates informational research from an active appointment enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Bakersfield, CA market and the dental context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Cost per lead by intent tier",
        "baseline": "$95",
        "target": "$65",
        "change": "-32%",
        "unit": "USD, blended across intent tiers"
      },
      {
        "label": "Call-to-appointment conversion rate",
        "baseline": "44.0%",
        "target": "58.0%",
        "change": "+14 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked new patient",
        "baseline": "$216",
        "target": "$112",
        "change": "-48%",
        "unit": "USD per acquired patient"
      },
      {
        "label": "Instagram engagement rate",
        "baseline": "0.6%",
        "target": "1.9%",
        "change": "+1.3 pts",
        "unit": "against the 1.8% health and wellness category benchmark"
      }
    ],
    "benchmarkKeys": [
      "dental_cpl",
      "dental_call_conv",
      "dental_calls_missed",
      "dental_newpt_value",
      "dental_meta",
      "social_health_eng"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/dental-reception.jpg",
      "alt": "Bright dental practice reception desk with waiting area seating"
    },
    "publishGate": "publish"
  },
  {
    "id": "gateway-dental-miami",
    "caseId": "QA-FL-DENT-10",
    "client": "Gateway Dental",
    "domain": "gatewaydentalinc.com",
    "market": "Miami / Hialeah, FL",
    "state": "FL",
    "stateName": "Florida",
    "niche": "dental",
    "services": [
      "ppc",
      "ai-seo"
    ],
    "tier": "Dominance",
    "retainerBand": "Tailored scope",
    "headline": "Gateway Dental: Dental client programme",
    "snapshot": "Gateway Dental (gatewaydentalinc.com) is a dental practice serving Miami / Hialeah, FL. Its Qognition programme covers PPC and AI SEO.",
    "startingPosition": "The programme focuses on service information, accessibility, professional review and the route to an appointment enquiry.",
    "coreProblem": "How would a person evaluating a dental service find enough relevant information to make an appointment enquiry?",
    "diagnosis": "The work separates informational research from an active appointment enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Miami / Hialeah, FL market and the dental context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Cost per lead by intent tier",
        "baseline": "$111",
        "target": "$87",
        "change": "-22%",
        "unit": "USD, blended across intent tiers"
      },
      {
        "label": "Call-to-appointment conversion rate",
        "baseline": "52.0%",
        "target": "64.0%",
        "change": "+12 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked new patient",
        "baseline": "$214",
        "target": "$136",
        "change": "-37%",
        "unit": "USD per acquired patient"
      },
      {
        "label": "AI assistant mention rate",
        "baseline": "10%",
        "target": "29%",
        "change": "+19 pts",
        "unit": "share of the practice's patient-question prompt set naming it, across 4 assistants"
      }
    ],
    "benchmarkKeys": [
      "dental_cpl",
      "dental_call_conv",
      "dental_calls_missed",
      "dental_newpt_value",
      "patient_ai",
      "health_aio"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/dental-reception.jpg",
      "alt": "Bright dental practice reception desk with waiting area seating"
    },
    "publishGate": "publish"
  },
  {
    "id": "dentistry-of-orlando",
    "caseId": "QA-FL-DENT-11",
    "client": "Dentistry of Orlando",
    "domain": "dentistryoforlando.com",
    "market": "Orlando, FL",
    "state": "FL",
    "stateName": "Florida",
    "niche": "dental",
    "services": [
      "ppc"
    ],
    "tier": "Authority",
    "retainerBand": "Tailored scope",
    "headline": "Dentistry of Orlando: Dental client programme",
    "snapshot": "Dentistry of Orlando (dentistryoforlando.com) is a dental practice serving Orlando, FL. Its Qognition programme covers PPC.",
    "startingPosition": "The programme focuses on service information, accessibility, professional review and the route to an appointment enquiry.",
    "coreProblem": "How would a person evaluating a dental service find enough relevant information to make an appointment enquiry?",
    "diagnosis": "The work separates informational research from an active appointment enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Orlando, FL market and the dental context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Cost per lead by intent tier",
        "baseline": "$111",
        "target": "$87",
        "change": "-22%",
        "unit": "USD, blended across intent tiers"
      },
      {
        "label": "Call-to-appointment conversion rate",
        "baseline": "52.0%",
        "target": "64.0%",
        "change": "+12 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked new patient",
        "baseline": "$214",
        "target": "$136",
        "change": "-37%",
        "unit": "USD per acquired patient"
      },
      {
        "label": "New patients per month",
        "baseline": "index 100",
        "target": "index 150",
        "change": "+50%",
        "unit": "indexed to engagement start = 100; category average 46/mo"
      }
    ],
    "benchmarkKeys": [
      "dental_cpl",
      "dental_call_conv",
      "dental_calls_missed",
      "dental_newpt_value",
      "dental_implant",
      "dental_newpt_vol"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/dental-operatory.jpg",
      "alt": "Dental operatory with chair and overhead light, prepared for a patient"
    },
    "publishGate": "publish"
  },
  {
    "id": "miami-best-dental",
    "caseId": "QA-FL-DENT-12",
    "client": "Miami Best Dental",
    "domain": "miamibestdental.com",
    "market": "South Miami, FL",
    "state": "FL",
    "stateName": "Florida",
    "niche": "dental",
    "services": [
      "ai-seo",
      "social"
    ],
    "tier": "Authority",
    "retainerBand": "Tailored scope",
    "headline": "Miami Best Dental: Dental client programme",
    "snapshot": "Miami Best Dental (miamibestdental.com) is a dental practice serving South Miami, FL. Its Qognition programme covers AI SEO and social.",
    "startingPosition": "The programme focuses on service information, accessibility, professional review and the route to an appointment enquiry.",
    "coreProblem": "How would a person evaluating a dental service find enough relevant information to make an appointment enquiry?",
    "diagnosis": "The work separates informational research from an active appointment enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The South Miami, FL market and the dental context shape the service coverage and buyer needs the programme addresses.",
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
        "unit": "share of the practice's patient-question prompt set naming it, across 4 assistants"
      },
      {
        "label": "Local Pack top-3 coverage on '[treatment] near me'",
        "baseline": "26%",
        "target": "50%",
        "change": "+92%",
        "unit": "share of grid points in the top 3"
      },
      {
        "label": "Non-branded organic new-patient enquiries",
        "baseline": "index 100",
        "target": "index 150",
        "change": "+50%",
        "unit": "indexed to engagement start = 100"
      },
      {
        "label": "Instagram engagement rate",
        "baseline": "0.6%",
        "target": "1.9%",
        "change": "+1.3 pts",
        "unit": "against the 1.8% health and wellness category benchmark"
      }
    ],
    "benchmarkKeys": [
      "patient_ai",
      "health_aio",
      "patient_stars",
      "offpage_cites",
      "dental_implant",
      "dental_meta",
      "social_health_eng",
      "ba_compliance"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/dental-imaging.jpg",
      "alt": "Panoramic dental x-ray displayed on a clinic monitor"
    },
    "publishGate": "publish"
  },
  {
    "id": "dentists-at-midtown-miami",
    "caseId": "QA-FL-DENT-13",
    "client": "Dentists at Midtown",
    "domain": "dentistsatmidtown.com",
    "market": "Miami, FL",
    "state": "FL",
    "stateName": "Florida",
    "niche": "dental",
    "services": [
      "ppc",
      "ai-seo"
    ],
    "tier": "Authority",
    "retainerBand": "Tailored scope",
    "headline": "Dentists at Midtown: Dental client programme",
    "snapshot": "Dentists at Midtown (dentistsatmidtown.com) is a dental practice serving Miami, FL. Its Qognition programme covers PPC and AI SEO.",
    "startingPosition": "The programme focuses on service information, accessibility, professional review and the route to an appointment enquiry.",
    "coreProblem": "How would a person evaluating a dental service find enough relevant information to make an appointment enquiry?",
    "diagnosis": "The work separates informational research from an active appointment enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Miami, FL market and the dental context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Cost per lead by intent tier",
        "baseline": "$111",
        "target": "$87",
        "change": "-22%",
        "unit": "USD, blended across intent tiers"
      },
      {
        "label": "Call-to-appointment conversion rate",
        "baseline": "52.0%",
        "target": "64.0%",
        "change": "+12 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked new patient",
        "baseline": "$214",
        "target": "$136",
        "change": "-37%",
        "unit": "USD per acquired patient"
      },
      {
        "label": "AI assistant mention rate",
        "baseline": "10%",
        "target": "29%",
        "change": "+19 pts",
        "unit": "share of the practice's patient-question prompt set naming it, across 4 assistants"
      }
    ],
    "benchmarkKeys": [
      "dental_cpl",
      "dental_call_conv",
      "dental_calls_missed",
      "dental_newpt_value",
      "patient_ai",
      "health_aio",
      "offpage_cites",
      "earned_media"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/dental-clinician.jpg",
      "alt": "Dentist in scrubs and loupes reviewing a chart with a colleague"
    },
    "publishGate": "publish"
  },
  {
    "id": "emerald-coast-family-dentistry",
    "caseId": "QA-FL-DENT-14",
    "client": "Emerald Coast Family Dentistry",
    "domain": "emeraldcoastfamilydentistry.com",
    "market": "Pensacola, FL",
    "state": "FL",
    "stateName": "Florida",
    "niche": "dental",
    "services": [
      "ai-seo",
      "social"
    ],
    "tier": "Essential",
    "retainerBand": "Tailored scope",
    "headline": "Emerald Coast Family Dentistry: Dental client programme",
    "snapshot": "Emerald Coast Family Dentistry (emeraldcoastfamilydentistry.com) is a dental practice serving Pensacola, FL. Its Qognition programme covers AI SEO and social.",
    "startingPosition": "The programme focuses on service information, accessibility, professional review and the route to an appointment enquiry.",
    "coreProblem": "How would a person evaluating a dental service find enough relevant information to make an appointment enquiry?",
    "diagnosis": "The work separates informational research from an active appointment enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Pensacola, FL market and the dental context shape the service coverage and buyer needs the programme addresses.",
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
        "unit": "share of the practice's patient-question prompt set naming it, across 4 assistants"
      },
      {
        "label": "Local Pack top-3 coverage on '[treatment] near me'",
        "baseline": "11%",
        "target": "37%",
        "change": "+236%",
        "unit": "share of grid points in the top 3"
      },
      {
        "label": "Non-branded organic new-patient enquiries",
        "baseline": "index 100",
        "target": "index 190",
        "change": "+90%",
        "unit": "indexed to engagement start = 100"
      },
      {
        "label": "Instagram engagement rate",
        "baseline": "0.6%",
        "target": "1.9%",
        "change": "+1.3 pts",
        "unit": "against the 1.8% health and wellness category benchmark"
      }
    ],
    "benchmarkKeys": [
      "patient_ai",
      "health_aio",
      "patient_stars",
      "offpage_cites",
      "dental_meta",
      "social_health_eng"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/dental-operatory.jpg",
      "alt": "Dental operatory with chair and overhead light, prepared for a patient"
    },
    "publishGate": "publish"
  },
  {
    "id": "jersey-city-dental",
    "caseId": "QA-NJ-DENT-10",
    "client": "Jersey City Dental",
    "domain": "jerseycitydentalcenter.com",
    "market": "Jersey City / Hoboken, NJ",
    "state": "NJ",
    "stateName": "New Jersey",
    "niche": "dental",
    "services": [
      "ppc",
      "ai-seo"
    ],
    "tier": "Dominance",
    "retainerBand": "Tailored scope",
    "headline": "Jersey City Dental: Dental client programme",
    "snapshot": "Jersey City Dental (jerseycitydentalcenter.com) is a dental practice serving Jersey City / Hoboken, NJ. Its Qognition programme covers PPC and AI SEO.",
    "startingPosition": "The programme focuses on service information, accessibility, professional review and the route to an appointment enquiry.",
    "coreProblem": "How would a person evaluating a dental service find enough relevant information to make an appointment enquiry?",
    "diagnosis": "The work separates informational research from an active appointment enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Jersey City / Hoboken, NJ market and the dental context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Cost per lead by intent tier",
        "baseline": "$99",
        "target": "$85",
        "change": "-14%",
        "unit": "USD, blended across intent tiers"
      },
      {
        "label": "Call-to-appointment conversion rate",
        "baseline": "58.0%",
        "target": "69.0%",
        "change": "+11 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked new patient",
        "baseline": "$170",
        "target": "$123",
        "change": "-28%",
        "unit": "USD per acquired patient"
      },
      {
        "label": "AI assistant mention rate",
        "baseline": "17%",
        "target": "38%",
        "change": "+21 pts",
        "unit": "share of the practice's patient-question prompt set naming it, across 4 assistants"
      }
    ],
    "benchmarkKeys": [
      "dental_cpl",
      "dental_call_conv",
      "dental_calls_missed",
      "dental_newpt_value",
      "patient_ai",
      "health_aio"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/dental-clinician.jpg",
      "alt": "Dentist in scrubs and loupes reviewing a chart with a colleague"
    },
    "publishGate": "publish"
  },
  {
    "id": "newark-dentist",
    "caseId": "QA-NJ-DENT-11",
    "client": "Newark Dentist",
    "domain": "newark-dentist.com",
    "market": "Newark, NJ",
    "state": "NJ",
    "stateName": "New Jersey",
    "niche": "dental",
    "services": [
      "ppc"
    ],
    "tier": "Essential",
    "retainerBand": "Tailored scope",
    "headline": "Newark Dentist: Dental client programme",
    "snapshot": "Newark Dentist (newark-dentist.com) is a dental practice serving Newark, NJ. Its Qognition programme covers PPC.",
    "startingPosition": "The programme focuses on service information, accessibility, professional review and the route to an appointment enquiry.",
    "coreProblem": "How would a person evaluating a dental service find enough relevant information to make an appointment enquiry?",
    "diagnosis": "The work separates informational research from an active appointment enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Newark, NJ market and the dental context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Cost per lead by intent tier",
        "baseline": "$132",
        "target": "$90",
        "change": "-32%",
        "unit": "USD, blended across intent tiers"
      },
      {
        "label": "Call-to-appointment conversion rate",
        "baseline": "44.0%",
        "target": "58.0%",
        "change": "+14 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked new patient",
        "baseline": "$301",
        "target": "$155",
        "change": "-48%",
        "unit": "USD per acquired patient"
      },
      {
        "label": "New patients per month",
        "baseline": "index 100",
        "target": "index 190",
        "change": "+90%",
        "unit": "indexed to engagement start = 100; category average 46/mo"
      }
    ],
    "benchmarkKeys": [
      "dental_cpl",
      "dental_call_conv",
      "dental_calls_missed",
      "dental_newpt_value",
      "dental_newpt_vol"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/dental-reception.jpg",
      "alt": "Bright dental practice reception desk with waiting area seating"
    },
    "publishGate": "publish"
  },
  {
    "id": "west-broadway-dental",
    "caseId": "QA-NJ-DENT-12",
    "client": "West Broadway Dental",
    "domain": "westbroadwaydental.com",
    "market": "Paterson, NJ",
    "state": "NJ",
    "stateName": "New Jersey",
    "niche": "dental",
    "services": [
      "ai-seo"
    ],
    "tier": "Growth",
    "retainerBand": "Tailored scope",
    "headline": "West Broadway Dental: Dental client programme",
    "snapshot": "West Broadway Dental (westbroadwaydental.com) is a dental practice serving Paterson, NJ. Its Qognition programme covers AI SEO.",
    "startingPosition": "The programme focuses on service information, accessibility, professional review and the route to an appointment enquiry.",
    "coreProblem": "How would a person evaluating a dental service find enough relevant information to make an appointment enquiry?",
    "diagnosis": "The work separates informational research from an active appointment enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Paterson, NJ market and the dental context shape the service coverage and buyer needs the programme addresses.",
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
        "unit": "share of the practice's patient-question prompt set naming it, across 4 assistants"
      },
      {
        "label": "Local Pack top-3 coverage on '[treatment] near me'",
        "baseline": "11%",
        "target": "37%",
        "change": "+236%",
        "unit": "share of grid points in the top 3"
      },
      {
        "label": "Non-branded organic new-patient enquiries",
        "baseline": "index 100",
        "target": "index 190",
        "change": "+90%",
        "unit": "indexed to engagement start = 100"
      },
      {
        "label": "Review rating, volume and recency",
        "baseline": "index 100",
        "target": "index 240",
        "change": "+140%",
        "unit": "new reviews per month, indexed"
      }
    ],
    "benchmarkKeys": [
      "patient_ai",
      "health_aio",
      "patient_stars",
      "offpage_cites"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/dental-imaging.jpg",
      "alt": "Panoramic dental x-ray displayed on a clinic monitor"
    },
    "publishGate": "publish"
  },
  {
    "id": "north-broad-family-dental",
    "caseId": "QA-NJ-DENT-13",
    "client": "North Broad Family Dental & Orthodontics",
    "domain": "dentist-elizabeth.com",
    "market": "Elizabeth, NJ",
    "state": "NJ",
    "stateName": "New Jersey",
    "niche": "dental",
    "services": [
      "ppc",
      "social"
    ],
    "tier": "Authority",
    "retainerBand": "Tailored scope",
    "headline": "North Broad Family Dental & Orthodontics: Dental client programme",
    "snapshot": "North Broad Family Dental & Orthodontics (dentist-elizabeth.com) is a dental practice serving Elizabeth, NJ. Its Qognition programme covers PPC and social.",
    "startingPosition": "The programme focuses on service information, accessibility, professional review and the route to an appointment enquiry.",
    "coreProblem": "How would a person evaluating a dental service find enough relevant information to make an appointment enquiry?",
    "diagnosis": "The work separates informational research from an active appointment enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Elizabeth, NJ market and the dental context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Cost per lead by intent tier",
        "baseline": "$93",
        "target": "$73",
        "change": "-22%",
        "unit": "USD, blended across intent tiers"
      },
      {
        "label": "Call-to-appointment conversion rate",
        "baseline": "52.0%",
        "target": "64.0%",
        "change": "+12 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked new patient",
        "baseline": "$180",
        "target": "$114",
        "change": "-37%",
        "unit": "USD per acquired patient"
      },
      {
        "label": "Instagram engagement rate",
        "baseline": "0.6%",
        "target": "1.9%",
        "change": "+1.3 pts",
        "unit": "against the 1.8% health and wellness category benchmark"
      }
    ],
    "benchmarkKeys": [
      "dental_cpl",
      "dental_call_conv",
      "dental_calls_missed",
      "dental_newpt_value",
      "dental_meta",
      "social_health_eng"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/dental-reception.jpg",
      "alt": "Bright dental practice reception desk with waiting area seating"
    },
    "publishGate": "publish"
  },
  {
    "id": "rana-dental",
    "caseId": "QA-NJ-DENT-14",
    "client": "RANA Dental",
    "domain": "ranadental.com",
    "market": "Lincoln Park, NJ",
    "state": "NJ",
    "stateName": "New Jersey",
    "niche": "dental",
    "services": [
      "ai-seo",
      "ppc"
    ],
    "tier": "Authority",
    "retainerBand": "Tailored scope",
    "headline": "RANA Dental: Dental client programme",
    "snapshot": "RANA Dental (ranadental.com) is a dental practice serving Lincoln Park, NJ. Its Qognition programme covers AI SEO and PPC.",
    "startingPosition": "The programme focuses on service information, accessibility, professional review and the route to an appointment enquiry.",
    "coreProblem": "How would a person evaluating a dental service find enough relevant information to make an appointment enquiry?",
    "diagnosis": "The work separates informational research from an active appointment enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Lincoln Park, NJ market and the dental context shape the service coverage and buyer needs the programme addresses.",
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
        "unit": "share of the practice's patient-question prompt set naming it, across 4 assistants"
      },
      {
        "label": "Local Pack top-3 coverage on '[treatment] near me'",
        "baseline": "26%",
        "target": "50%",
        "change": "+92%",
        "unit": "share of grid points in the top 3"
      },
      {
        "label": "Non-branded organic new-patient enquiries",
        "baseline": "index 100",
        "target": "index 150",
        "change": "+50%",
        "unit": "indexed to engagement start = 100"
      },
      {
        "label": "Cost per lead by intent tier",
        "baseline": "$93",
        "target": "$73",
        "change": "-22%",
        "unit": "USD, blended across intent tiers"
      }
    ],
    "benchmarkKeys": [
      "patient_ai",
      "health_aio",
      "patient_stars",
      "offpage_cites",
      "dental_implant",
      "dental_cpl",
      "dental_call_conv"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/dental-imaging.jpg",
      "alt": "Panoramic dental x-ray displayed on a clinic monitor"
    },
    "publishGate": "publish"
  },
  {
    "id": "rivertown-dental-care",
    "caseId": "QA-GA-DENT-10",
    "client": "Rivertown Dental Care",
    "domain": "rivertowndentalcare.com",
    "market": "Columbus, GA",
    "state": "GA",
    "stateName": "Georgia",
    "niche": "dental",
    "services": [
      "ai-seo",
      "ppc"
    ],
    "tier": "Authority",
    "retainerBand": "Tailored scope",
    "headline": "Rivertown Dental Care: Dental client programme",
    "snapshot": "Rivertown Dental Care (rivertowndentalcare.com) is a dental practice serving Columbus, GA. Its Qognition programme covers AI SEO and PPC.",
    "startingPosition": "The programme focuses on service information, accessibility, professional review and the route to an appointment enquiry.",
    "coreProblem": "How would a person evaluating a dental service find enough relevant information to make an appointment enquiry?",
    "diagnosis": "The work separates informational research from an active appointment enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Columbus, GA market and the dental context shape the service coverage and buyer needs the programme addresses.",
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
        "unit": "share of the practice's patient-question prompt set naming it, across 4 assistants"
      },
      {
        "label": "Local Pack top-3 coverage on '[treatment] near me'",
        "baseline": "44%",
        "target": "64%",
        "change": "+45%",
        "unit": "share of grid points in the top 3"
      },
      {
        "label": "Non-branded organic new-patient enquiries",
        "baseline": "index 100",
        "target": "index 128",
        "change": "+28%",
        "unit": "indexed to engagement start = 100"
      },
      {
        "label": "Cost per lead by intent tier",
        "baseline": "$71",
        "target": "$61",
        "change": "-14%",
        "unit": "USD, blended across intent tiers"
      }
    ],
    "benchmarkKeys": [
      "patient_ai",
      "health_aio",
      "patient_stars",
      "offpage_cites",
      "dental_cpl",
      "dental_call_conv",
      "reviews_respond"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/dental-clinician.jpg",
      "alt": "Dentist in scrubs and loupes reviewing a chart with a colleague"
    },
    "publishGate": "publish"
  },
  {
    "id": "marietta-dental-professionals",
    "caseId": "QA-GA-DENT-11",
    "client": "Marietta Dental Professionals",
    "domain": "mariettadentalpros.com",
    "market": "Marietta, GA",
    "state": "GA",
    "stateName": "Georgia",
    "niche": "dental",
    "services": [
      "ppc"
    ],
    "tier": "Authority",
    "retainerBand": "Tailored scope",
    "headline": "Marietta Dental Professionals: Dental client programme",
    "snapshot": "Marietta Dental Professionals (mariettadentalpros.com) is a dental practice serving Marietta, GA. Its Qognition programme covers PPC.",
    "startingPosition": "The programme focuses on service information, accessibility, professional review and the route to an appointment enquiry.",
    "coreProblem": "How would a person evaluating a dental service find enough relevant information to make an appointment enquiry?",
    "diagnosis": "The work separates informational research from an active appointment enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Marietta, GA market and the dental context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Cost per lead by intent tier",
        "baseline": "$99",
        "target": "$85",
        "change": "-14%",
        "unit": "USD, blended across intent tiers"
      },
      {
        "label": "Call-to-appointment conversion rate",
        "baseline": "58.0%",
        "target": "69.0%",
        "change": "+11 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked new patient",
        "baseline": "$170",
        "target": "$123",
        "change": "-28%",
        "unit": "USD per acquired patient"
      },
      {
        "label": "New patients per month",
        "baseline": "index 100",
        "target": "index 128",
        "change": "+28%",
        "unit": "indexed to engagement start = 100; category average 46/mo"
      }
    ],
    "benchmarkKeys": [
      "dental_cpl",
      "dental_cpl_emerg",
      "dental_call_conv",
      "dental_calls_missed",
      "dental_newpt_value",
      "dental_newpt_vol"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/dental-operatory.jpg",
      "alt": "Dental operatory with chair and overhead light, prepared for a patient"
    },
    "publishGate": "publish"
  },
  {
    "id": "savannah-dental",
    "caseId": "QA-GA-DENT-12",
    "client": "Savannah Dental",
    "domain": "savannah.dental",
    "market": "Savannah, GA",
    "state": "GA",
    "stateName": "Georgia",
    "niche": "dental",
    "services": [
      "ai-seo",
      "social"
    ],
    "tier": "Growth",
    "retainerBand": "Tailored scope",
    "headline": "Savannah Dental: Dental client programme",
    "snapshot": "Savannah Dental (savannah.dental) is a dental practice serving Savannah, GA. Its Qognition programme covers AI SEO and social.",
    "startingPosition": "The programme focuses on service information, accessibility, professional review and the route to an appointment enquiry.",
    "coreProblem": "How would a person evaluating a dental service find enough relevant information to make an appointment enquiry?",
    "diagnosis": "The work separates informational research from an active appointment enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Savannah, GA market and the dental context shape the service coverage and buyer needs the programme addresses.",
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
        "unit": "share of the practice's patient-question prompt set naming it, across 4 assistants"
      },
      {
        "label": "Local Pack top-3 coverage on '[treatment] near me'",
        "baseline": "26%",
        "target": "50%",
        "change": "+92%",
        "unit": "share of grid points in the top 3"
      },
      {
        "label": "Non-branded organic new-patient enquiries",
        "baseline": "index 100",
        "target": "index 150",
        "change": "+50%",
        "unit": "indexed to engagement start = 100"
      },
      {
        "label": "Instagram engagement rate",
        "baseline": "0.6%",
        "target": "1.9%",
        "change": "+1.3 pts",
        "unit": "against the 1.8% health and wellness category benchmark"
      }
    ],
    "benchmarkKeys": [
      "patient_ai",
      "health_aio",
      "patient_stars",
      "offpage_cites",
      "dental_meta",
      "social_health_eng"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/dental-imaging.jpg",
      "alt": "Panoramic dental x-ray displayed on a clinic monitor"
    },
    "publishGate": "publish"
  },
  {
    "id": "midtown-dental-care-columbus",
    "caseId": "QA-GA-DENT-13",
    "client": "Midtown Dental Care",
    "domain": "midtowndentalcare.com",
    "market": "Columbus, GA",
    "state": "GA",
    "stateName": "Georgia",
    "niche": "dental",
    "services": [
      "ppc",
      "ai-seo"
    ],
    "tier": "Essential",
    "retainerBand": "Tailored scope",
    "headline": "Midtown Dental Care: Dental client programme",
    "snapshot": "Midtown Dental Care (midtowndentalcare.com) is a dental practice serving Columbus, GA. Its Qognition programme covers PPC and AI SEO.",
    "startingPosition": "The programme focuses on service information, accessibility, professional review and the route to an appointment enquiry.",
    "coreProblem": "How would a person evaluating a dental service find enough relevant information to make an appointment enquiry?",
    "diagnosis": "The work separates informational research from an active appointment enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Columbus, GA market and the dental context shape the service coverage and buyer needs the programme addresses.",
    "engines": [
      "Review search accessibility and service information",
      "Capture enquiry context and verify receipt",
      "Record dated AI-search observations where monitoring is commissioned"
    ],
    "kpis": [
      {
        "label": "Cost per lead by intent tier",
        "baseline": "$95",
        "target": "$65",
        "change": "-32%",
        "unit": "USD, blended across intent tiers"
      },
      {
        "label": "Call-to-appointment conversion rate",
        "baseline": "44.0%",
        "target": "58.0%",
        "change": "+14 pts",
        "unit": "percentage of leads and calls converted"
      },
      {
        "label": "Cost per booked new patient",
        "baseline": "$216",
        "target": "$112",
        "change": "-48%",
        "unit": "USD per acquired patient"
      },
      {
        "label": "AI assistant mention rate",
        "baseline": "4%",
        "target": "24%",
        "change": "+20 pts",
        "unit": "share of the practice's patient-question prompt set naming it, across 4 assistants"
      }
    ],
    "benchmarkKeys": [
      "dental_cpl",
      "dental_call_conv",
      "dental_calls_missed",
      "dental_newpt_value",
      "patient_ai",
      "health_aio"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/dental-reception.jpg",
      "alt": "Bright dental practice reception desk with waiting area seating"
    },
    "publishGate": "publish"
  },
  {
    "id": "gwinnett-family-dental-care",
    "caseId": "QA-GA-DENT-14",
    "client": "Gwinnett Family Dental Care",
    "domain": "gwinnettfamilydentalcare.com",
    "market": "Lawrenceville, GA",
    "state": "GA",
    "stateName": "Georgia",
    "niche": "dental",
    "services": [
      "ai-seo"
    ],
    "tier": "Authority",
    "retainerBand": "Tailored scope",
    "headline": "Gwinnett Family Dental Care: Dental client programme",
    "snapshot": "Gwinnett Family Dental Care (gwinnettfamilydentalcare.com) is a dental practice serving Lawrenceville, GA. Its Qognition programme covers AI SEO.",
    "startingPosition": "The programme focuses on service information, accessibility, professional review and the route to an appointment enquiry.",
    "coreProblem": "How would a person evaluating a dental service find enough relevant information to make an appointment enquiry?",
    "diagnosis": "The work separates informational research from an active appointment enquiry, then reviews the relevant pages, contact path and follow-up responsibilities before changes are made.",
    "differentiator": "The Lawrenceville, GA market and the dental context shape the service coverage and buyer needs the programme addresses.",
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
        "unit": "share of the practice's patient-question prompt set naming it, across 4 assistants"
      },
      {
        "label": "Local Pack top-3 coverage on '[treatment] near me'",
        "baseline": "26%",
        "target": "50%",
        "change": "+92%",
        "unit": "share of grid points in the top 3"
      },
      {
        "label": "Non-branded organic new-patient enquiries",
        "baseline": "index 100",
        "target": "index 150",
        "change": "+50%",
        "unit": "indexed to engagement start = 100"
      },
      {
        "label": "Review rating, volume and recency",
        "baseline": "index 100",
        "target": "index 240",
        "change": "+140%",
        "unit": "new reviews per month, indexed"
      }
    ],
    "benchmarkKeys": [
      "patient_ai",
      "health_aio",
      "patient_stars",
      "offpage_cites"
    ],
    "auditedAt": "2026-09-01",
    "image": {
      "src": "/case-studies/dental-clinician.jpg",
      "alt": "Dentist in scrubs and loupes reviewing a chart with a colleague"
    },
    "publishGate": "publish"
  }
];
