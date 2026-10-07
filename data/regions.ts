import type { Region } from '../types';
import { OFFICE_CITIES_TEXT, joinWithAnd, officesIn } from './siteConfig';

// Geographic coverage describes target markets. Offices are only the five in
// OFFICES (data/siteConfig.ts, operator 2026-10-08); the office sentence in each
// region's delivery FAQ is generated from that list below, never written here.
const REGION_SOURCE: Region[] = [
  {
    "id": "usa",
    "name": "USA",
    "slug": "usa",
    "description": "AI SEO and GEO for B2B companies for US buyers.",
    "marketFocus": [
      "SaaS",
      "Fintech",
      "Enterprise"
    ],
    "localStrategy": "Define the purchasing committee, serviceable market and commercial questions before choosing channels.",
    "officeCoordinates": "",
    "marketDynamics": "Define the purchasing committee, serviceable market and commercial questions before choosing channels.",
    "competitiveLandscape": "Review the actual alternatives your buyers shortlist, using dated search observations and sales feedback.",
    "localInsights": [
      "Separate national software demand from regional industrial service demand.",
      "Ask sales which objections delay a shortlist or procurement decision."
    ],
    "stats": [],
    "faqs": [
      {
        "question": "How is delivery scoped for this market?",
        "answer": "We agree the target buyers, languages, responsibilities and evidence needed before work begins."
      },
      {
        "question": "How do we discuss a search program?",
        "answer": "Book a call or send an enquiry with your services, priority buyers and target market. We agree the relevant content, language review and delivery responsibilities before proposing the scope."
      }
    ]
  },
  {
    "id": "uk",
    "name": "United Kingdom",
    "slug": "uk",
    "description": "AI SEO and GEO for B2B companies for the United Kingdom.",
    "marketFocus": [
      "Fintech",
      "Fashion",
      "Professional Services"
    ],
    "localStrategy": "Connect specialist expertise with the questions UK buying teams use to assess a provider.",
    "officeCoordinates": "",
    "marketDynamics": "Connect specialist expertise with the questions UK buying teams use to assess a provider.",
    "competitiveLandscape": "Review the actual alternatives your buyers shortlist, using dated search observations and sales feedback.",
    "localInsights": [
      "Distinguish corporate services from consumer enquiries.",
      "Confirm terminology, language and sales ownership for UK campaigns."
    ],
    "stats": [],
    "faqs": [
      {
        "question": "How is delivery scoped for this market?",
        "answer": "We agree the target buyers, languages, responsibilities and evidence needed before work begins."
      },
      {
        "question": "How do we discuss a search program?",
        "answer": "Book a call or send an enquiry with your services, priority buyers and target market. We agree the relevant content, language review and delivery responsibilities before proposing the scope."
      }
    ]
  },
  {
    "id": "uae",
    "name": "UAE & KSA",
    "slug": "uae-ksa",
    "description": "AI SEO and GEO for B2B companies for buyers in the UAE and Saudi Arabia.",
    "marketFocus": [
      "Real Estate",
      "Government",
      "Luxury Retail"
    ],
    "localStrategy": "Scope English and Arabic buyer journeys around the specific country and sector.",
    "officeCoordinates": "",
    "marketDynamics": "Scope English and Arabic buyer journeys around the specific country and sector.",
    "competitiveLandscape": "Review the actual alternatives your buyers shortlist, using dated search observations and sales feedback.",
    "localInsights": [
      "Validate Arabic terminology and right-to-left forms.",
      "Agree country coverage and local sales follow-up before launch."
    ],
    "stats": [],
    "faqs": [
      {
        "question": "How is delivery scoped for this market?",
        "answer": "We agree the target buyers, languages, responsibilities and evidence needed before work begins."
      },
      {
        "question": "How do we discuss a search program?",
        "answer": "Book a call or send an enquiry with your services, priority buyers and target market. We agree the relevant content, language review and delivery responsibilities before proposing the scope."
      }
    ]
  },
  {
    "id": "india",
    "name": "India",
    "slug": "india",
    "description": "AI SEO and GEO programs for India-based B2B businesses.",
    "marketFocus": [
      "Startups",
      "E-commerce",
      "EdTech"
    ],
    "localStrategy": "Separate the company’s headquarters from the countries where its buyers evaluate suppliers.",
    "officeCoordinates": "",
    "marketDynamics": "Separate the company’s headquarters from the countries where its buyers evaluate suppliers.",
    "competitiveLandscape": "Review the actual alternatives your buyers shortlist, using dated search observations and sales feedback.",
    "localInsights": [
      "For exporters, build content for destination-market buyer questions.",
      "For domestic programs, validate language and regional requirements separately."
    ],
    "stats": [],
    "faqs": [
      {
        "question": "How is delivery scoped for this market?",
        "answer": "We agree the target buyers, languages, responsibilities and evidence needed before work begins."
      },
      {
        "question": "How do we discuss a search program?",
        "answer": "Book a call or send an enquiry with your services, priority buyers and target market. We agree the relevant content, language review and delivery responsibilities before proposing the scope."
      }
    ]
  },
  {
    "id": "australia",
    "name": "Australia",
    "slug": "australia",
    "description": "AI SEO and GEO for B2B companies for Australian buyers.",
    "marketFocus": [
      "Mining",
      "Retail",
      "Tourism"
    ],
    "localStrategy": "Connect industrial, technology and professional-services capabilities to the relevant buying process.",
    "officeCoordinates": "",
    "marketDynamics": "Connect industrial, technology and professional-services capabilities to the relevant buying process.",
    "competitiveLandscape": "Review the actual alternatives your buyers shortlist, using dated search observations and sales feedback.",
    "localInsights": [
      "Distinguish national solutions from region-specific service capabilities.",
      "Validate the buyer’s procurement and delivery requirements."
    ],
    "stats": [],
    "faqs": [
      {
        "question": "How is delivery scoped for this market?",
        "answer": "We agree the target buyers, languages, responsibilities and evidence needed before work begins."
      },
      {
        "question": "How do we discuss a search program?",
        "answer": "Book a call or send an enquiry with your services, priority buyers and target market. We agree the relevant content, language review and delivery responsibilities before proposing the scope."
      }
    ]
  },
  {
    "id": "europe",
    "name": "Europe",
    "slug": "europe",
    "description": "AI SEO and GEO for B2B companies across European markets.",
    "marketFocus": [
      "SaaS",
      "Fintech",
      "Manufacturing"
    ],
    "localStrategy": "Treat language, buyer expectations and market coverage as separate planning decisions.",
    "officeCoordinates": "",
    "marketDynamics": "Treat language, buyer expectations and market coverage as separate planning decisions.",
    "competitiveLandscape": "Review the actual alternatives your buyers shortlist, using dated search observations and sales feedback.",
    "localInsights": [
      "Publish complete, reviewed translations rather than swapping country names.",
      "Confirm privacy and outreach requirements with the appropriate adviser."
    ],
    "stats": [],
    "faqs": [
      {
        "question": "How is delivery scoped for this market?",
        "answer": "We agree the target buyers, languages, responsibilities and evidence needed before work begins."
      },
      {
        "question": "How do we discuss a search program?",
        "answer": "Book a call or send an enquiry with your services, priority buyers and target market. We agree the relevant content, language review and delivery responsibilities before proposing the scope."
      }
    ]
  },
  {
    "id": "middle-east",
    "name": "Middle East",
    "slug": "middle-east",
    "description": "AI SEO and GEO for B2B companies for Middle Eastern markets.",
    "marketFocus": [
      "Real Estate",
      "Government",
      "Luxury Retail"
    ],
    "localStrategy": "Prioritize specific countries, languages and sectors before expanding a regional campaign.",
    "officeCoordinates": "",
    "marketDynamics": "Prioritize specific countries, languages and sectors before expanding a regional campaign.",
    "competitiveLandscape": "Review the actual alternatives your buyers shortlist, using dated search observations and sales feedback.",
    "localInsights": [
      "Map buying roles and the evidence they require.",
      "Use regional language expertise when reviewing claims and commercial terminology."
    ],
    "stats": [],
    "faqs": [
      {
        "question": "How is delivery scoped for this market?",
        "answer": "We agree the target buyers, languages, responsibilities and evidence needed before work begins."
      },
      {
        "question": "How do we discuss a search program?",
        "answer": "Book a call or send an enquiry with your services, priority buyers and target market. We agree the relevant content, language review and delivery responsibilities before proposing the scope."
      }
    ]
  },
  {
    "id": "canada",
    "name": "Canada",
    "slug": "canada",
    "description": "AI SEO and GEO for B2B companies for Canadian buyers.",
    "marketFocus": [
      "SaaS",
      "Finance",
      "Professional Services"
    ],
    "localStrategy": "Map English and French buyer journeys to the provinces and sectors you can serve.",
    "officeCoordinates": "",
    "marketDynamics": "Map English and French buyer journeys to the provinces and sectors you can serve.",
    "competitiveLandscape": "Review the actual alternatives your buyers shortlist, using dated search observations and sales feedback.",
    "localInsights": [
      "Review French content and form journeys before launching in Quebec.",
      "Clarify how the offer differs from cross-border alternatives."
    ],
    "stats": [],
    "faqs": [
      {
        "question": "How is delivery scoped for this market?",
        "answer": "We agree the target buyers, languages, responsibilities and evidence needed before work begins."
      },
      {
        "question": "How do we discuss a search program?",
        "answer": "Book a call or send an enquiry with your services, priority buyers and target market. We agree the relevant content, language review and delivery responsibilities before proposing the scope."
      }
    ]
  },
  {
    "id": "singapore",
    "name": "Singapore & SEA",
    "slug": "singapore-sea",
    "description": "AI SEO and GEO for B2B companies for Singapore and selected Southeast Asian markets.",
    "marketFocus": [
      "Fintech",
      "SaaS",
      "B2B"
    ],
    "localStrategy": "Use Singapore as a defined market, then assess each additional country on its own merits.",
    "officeCoordinates": "",
    "marketDynamics": "Use Singapore as a defined market, then assess each additional country on its own merits.",
    "competitiveLandscape": "Review the actual alternatives your buyers shortlist, using dated search observations and sales feedback.",
    "localInsights": [
      "Distinguish regional headquarters from end-customer locations.",
      "Validate language, payment and follow-up requirements before expansion."
    ],
    "stats": [],
    "faqs": [
      {
        "question": "How is delivery scoped for this market?",
        "answer": "We agree the target buyers, languages, responsibilities and evidence needed before work begins."
      },
      {
        "question": "How do we discuss a search program?",
        "answer": "Book a call or send an enquiry with your services, priority buyers and target market. We agree the relevant content, language review and delivery responsibilities before proposing the scope."
      }
    ]
  }
];

/** ISO alpha-2 codes of the countries each region page covers, for the office check only. */
const REGION_COUNTRY_CODES: Record<string, readonly string[]> = {
  usa: ['US'],
  uk: ['GB'],
  'uae-ksa': ['AE', 'SA'],
  india: ['IN'],
  australia: ['AU'],
  europe: [],
  'middle-east': ['AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'JO', 'LB', 'TR', 'IL'],
  canada: ['CA'],
  'singapore-sea': ['SG', 'MY', 'ID', 'TH', 'VN', 'PH'],
};

const DELIVERY_QUESTION = 'How is delivery scoped for this market?';

function regionOfficeSentence(slug: string): string {
  const cities = (REGION_COUNTRY_CODES[slug] ?? []).flatMap((code) => officesIn(code).map((office) => office.city));
  return cities.length
    ? `We have an office in ${joinWithAnd(cities)}, and serve the rest of this market remotely.`
    : `We serve this market remotely. Our offices are in ${OFFICE_CITIES_TEXT}.`;
}

export const REGIONS: Region[] = REGION_SOURCE.map((region) => ({
  ...region,
  faqs: region.faqs.map((faq) =>
    faq.question === DELIVERY_QUESTION ? { ...faq, answer: `${faq.answer} ${regionOfficeSentence(region.slug)}` } : faq,
  ),
}));
