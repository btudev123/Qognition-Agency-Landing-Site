import type { Niche, Playbook, ServiceKey } from './types';

const key = (niche: Niche, service: ServiceKey) => `${niche}:${service}`;
// How each service line runs for each sector in the client library (operator decision, 2026-10-07).
export const PLAYBOOKS: Record<string, Playbook> = {
  "hvac:ppc": {
    "niche": "hvac",
    "service": "ppc",
    "strategy": "For HVAC clients, the PPC work concentrates on paid-search intent and enquiry quality.",
    "whatWeDid": [
      "Review search queries and separate branded from non-branded demand.",
      "Check landing-page relevance and exclude queries outside the actual service scope.",
      "Define a qualified enquiry and reconcile campaign data with confirmed sales outcomes."
    ],
    "phases": [
      {
        "window": "Research",
        "work": "Confirm audience, service coverage and the evidence needed to evaluate paid-search intent and enquiry quality."
      },
      {
        "window": "Implementation",
        "work": "Agree and complete the selected changes, with technical and content review."
      },
      {
        "window": "Review",
        "work": "Reconcile observed discovery and enquiry data, discuss limitations and decide the next action."
      }
    ],
    "objections": [
      "We already run Google Ads and the leads are expensive."
    ],
    "proofAssets": [
      "Approved scope and change record",
      "Dated source observations and review notes",
      "Confirmed enquiry and sales-stage records where access is authorized"
    ]
  },
  "hvac:ai-seo": {
    "niche": "hvac",
    "service": "ai-seo",
    "strategy": "For HVAC clients, the AI SEO work concentrates on search accessibility, service content and observed AI citations.",
    "whatWeDid": [
      "Check crawl access, rendering and the accuracy of service and coverage information.",
      "Review whether useful pages answer specific buyer questions with supported facts.",
      "Define a commercial prompt set and record the platform, date, response and cited sources."
    ],
    "phases": [
      {
        "window": "Research",
        "work": "Confirm audience, service coverage and the evidence needed to evaluate search accessibility, service content and observed AI citations."
      },
      {
        "window": "Implementation",
        "work": "Agree and complete the selected changes, with technical and content review."
      },
      {
        "window": "Review",
        "work": "Reconcile observed discovery and enquiry data, discuss limitations and decide the next action."
      }
    ],
    "objections": [
      "Is AI search actually sending anyone? Nobody has proved it."
    ],
    "proofAssets": [
      "Approved scope and change record",
      "Dated source observations and review notes",
      "Confirmed enquiry and sales-stage records where access is authorized"
    ]
  },
  "hvac:social": {
    "niche": "hvac",
    "service": "social",
    "strategy": "For HVAC clients, the social work concentrates on useful expert content and referral journeys.",
    "whatWeDid": [
      "Choose an appropriate channel from actual audience behaviour.",
      "Publish approved expert explanations and obtain permission for any customer material.",
      "Connect relevant posts to useful pages and measure observable enquiries separately from engagement."
    ],
    "phases": [
      {
        "window": "Research",
        "work": "Confirm audience, service coverage and the evidence needed to evaluate useful expert content and referral journeys."
      },
      {
        "window": "Implementation",
        "work": "Agree and complete the selected changes, with technical and content review."
      },
      {
        "window": "Review",
        "work": "Reconcile observed discovery and enquiry data, discuss limitations and decide the next action."
      }
    ],
    "objections": [
      "Social media doesn't work for contractors."
    ],
    "proofAssets": [
      "Approved scope and change record",
      "Dated source observations and review notes",
      "Confirmed enquiry and sales-stage records where access is authorized"
    ]
  },
  "dental:ppc": {
    "niche": "dental",
    "service": "ppc",
    "strategy": "For dental clients, the PPC work concentrates on paid-search intent and enquiry quality.",
    "whatWeDid": [
      "Review search queries and separate branded from non-branded demand.",
      "Check landing-page relevance and exclude queries outside the actual service scope.",
      "Define a qualified enquiry and reconcile campaign data with confirmed sales outcomes."
    ],
    "phases": [
      {
        "window": "Research",
        "work": "Confirm audience, service coverage and the evidence needed to evaluate paid-search intent and enquiry quality."
      },
      {
        "window": "Implementation",
        "work": "Agree and complete the selected changes, with technical and content review."
      },
      {
        "window": "Review",
        "work": "Reconcile observed discovery and enquiry data, discuss limitations and decide the next action."
      }
    ],
    "objections": [
      "We tried Google Ads and got price shoppers."
    ],
    "proofAssets": [
      "Approved scope and change record",
      "Dated source observations and review notes",
      "Confirmed enquiry and sales-stage records where access is authorized"
    ]
  },
  "dental:ai-seo": {
    "niche": "dental",
    "service": "ai-seo",
    "strategy": "For dental clients, the AI SEO work concentrates on search accessibility, service content and observed AI citations.",
    "whatWeDid": [
      "Check crawl access, rendering and the accuracy of service and coverage information.",
      "Review whether useful pages answer specific buyer questions with supported facts.",
      "Define a commercial prompt set and record the platform, date, response and cited sources."
    ],
    "phases": [
      {
        "window": "Research",
        "work": "Confirm audience, service coverage and the evidence needed to evaluate search accessibility, service content and observed AI citations."
      },
      {
        "window": "Implementation",
        "work": "Agree and complete the selected changes, with technical and content review."
      },
      {
        "window": "Review",
        "work": "Reconcile observed discovery and enquiry data, discuss limitations and decide the next action."
      }
    ],
    "objections": [
      "Patients find us by referral. Search doesn't matter for dentistry."
    ],
    "proofAssets": [
      "Approved scope and change record",
      "Dated source observations and review notes",
      "Confirmed enquiry and sales-stage records where access is authorized"
    ]
  },
  "dental:social": {
    "niche": "dental",
    "service": "social",
    "strategy": "For dental clients, the social work concentrates on useful expert content and referral journeys.",
    "whatWeDid": [
      "Choose an appropriate channel from actual audience behaviour.",
      "Publish approved expert explanations and obtain permission for any customer material.",
      "Connect relevant posts to useful pages and measure observable enquiries separately from engagement."
    ],
    "phases": [
      {
        "window": "Research",
        "work": "Confirm audience, service coverage and the evidence needed to evaluate useful expert content and referral journeys."
      },
      {
        "window": "Implementation",
        "work": "Agree and complete the selected changes, with technical and content review."
      },
      {
        "window": "Review",
        "work": "Reconcile observed discovery and enquiry data, discuss limitations and decide the next action."
      }
    ],
    "objections": [
      "Our competitor posts constantly and it looks like it's working."
    ],
    "proofAssets": [
      "Approved scope and change record",
      "Dated source observations and review notes",
      "Confirmed enquiry and sales-stage records where access is authorized"
    ]
  },
  "insurance:ai-seo": {
    "niche": "insurance",
    "service": "ai-seo",
    "strategy": "For insurance clients, the AI SEO work concentrates on search accessibility, service content and observed AI citations.",
    "whatWeDid": [
      "Check crawl access, rendering and the accuracy of service and coverage information.",
      "Review whether useful pages answer specific buyer questions with supported facts.",
      "Define a commercial prompt set and record the platform, date, response and cited sources."
    ],
    "phases": [
      {
        "window": "Research",
        "work": "Confirm audience, service coverage and the evidence needed to evaluate search accessibility, service content and observed AI citations."
      },
      {
        "window": "Implementation",
        "work": "Agree and complete the selected changes, with technical and content review."
      },
      {
        "window": "Review",
        "work": "Reconcile observed discovery and enquiry data, discuss limitations and decide the next action."
      }
    ],
    "objections": [
      "Nobody searches for an insurance agent. They go to the comparison sites."
    ],
    "proofAssets": [
      "Approved scope and change record",
      "Dated source observations and review notes",
      "Confirmed enquiry and sales-stage records where access is authorized"
    ]
  },
  "insurance:ppc": {
    "niche": "insurance",
    "service": "ppc",
    "strategy": "For insurance clients, the PPC work concentrates on paid-search intent and enquiry quality.",
    "whatWeDid": [
      "Review search queries and separate branded from non-branded demand.",
      "Check landing-page relevance and exclude queries outside the actual service scope.",
      "Define a qualified enquiry and reconcile campaign data with confirmed sales outcomes."
    ],
    "phases": [
      {
        "window": "Research",
        "work": "Confirm audience, service coverage and the evidence needed to evaluate paid-search intent and enquiry quality."
      },
      {
        "window": "Implementation",
        "work": "Agree and complete the selected changes, with technical and content review."
      },
      {
        "window": "Review",
        "work": "Reconcile observed discovery and enquiry data, discuss limitations and decide the next action."
      }
    ],
    "objections": [
      "Insurance leads are expensive and they never close."
    ],
    "proofAssets": [
      "Approved scope and change record",
      "Dated source observations and review notes",
      "Confirmed enquiry and sales-stage records where access is authorized"
    ]
  },
  "insurance:social": {
    "niche": "insurance",
    "service": "social",
    "strategy": "For insurance clients, the social work concentrates on useful expert content and referral journeys.",
    "whatWeDid": [
      "Choose an appropriate channel from actual audience behaviour.",
      "Publish approved expert explanations and obtain permission for any customer material.",
      "Connect relevant posts to useful pages and measure observable enquiries separately from engagement."
    ],
    "phases": [
      {
        "window": "Research",
        "work": "Confirm audience, service coverage and the evidence needed to evaluate useful expert content and referral journeys."
      },
      {
        "window": "Implementation",
        "work": "Agree and complete the selected changes, with technical and content review."
      },
      {
        "window": "Review",
        "work": "Reconcile observed discovery and enquiry data, discuss limitations and decide the next action."
      }
    ],
    "objections": [
      "Our clients aren't on social media."
    ],
    "proofAssets": [
      "Approved scope and change record",
      "Dated source observations and review notes",
      "Confirmed enquiry and sales-stage records where access is authorized"
    ]
  }
};

export const getPlaybook = (niche: Niche, service: ServiceKey): Playbook | undefined => PLAYBOOKS[key(niche, service)];
export const getPlaybooks = (niche: Niche, services: ServiceKey[]): Playbook[] => services.map(service => getPlaybook(niche, service)).filter((playbook): playbook is Playbook => Boolean(playbook));
