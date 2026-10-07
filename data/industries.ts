import type { Industry } from '../types';

// Legacy routes remain stable; current ICP coverage is managed in data/b2b.
export const INDUSTRIES: Industry[] = [
  {
    "id": "law-legal",
    "name": "Law Firms & Legal Services",
    "description": "AI SEO and GEO for business law firms whose buyers need to assess expertise, jurisdiction and fit before speaking to a lawyer.",
    "subIndustries": [
      {
        "name": "Corporate Law Firms",
        "slug": "corporate-law",
        "description": "AI SEO and GEO planning for corporate law firms. B2B lead generation for M&A, compliance, and corporate governance.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a corporate law firms page explain?",
            "answer": "General counsel, founders and business leaders need the relevant practice, jurisdiction and experience to be clear before they make contact."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Criminal Defense Attorneys",
        "slug": "criminal-defense",
        "description": "Legacy resource for criminal defense attorneys: useful service information, accessible contact paths and careful claims review. This page does not describe a verified client engagement.",
        "features": [
          "Audience-specific information",
          "Accessible contact journeys",
          "Claims review"
        ],
        "benefits": [
          "Clear next steps",
          "Relevant information"
        ],
        "faqs": [
          {
            "question": "What should a criminal defense attorneys page explain?",
            "answer": "Keep the original audience clear and explain eligibility, service scope and how to request information. Do not imply clinical, legal or financial outcomes."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Family & Divorce Lawyers",
        "slug": "family-divorce",
        "description": "Legacy resource for family & divorce lawyers: useful service information, accessible contact paths and careful claims review. This page does not describe a verified client engagement.",
        "features": [
          "Audience-specific information",
          "Accessible contact journeys",
          "Claims review"
        ],
        "benefits": [
          "Clear next steps",
          "Relevant information"
        ],
        "faqs": [
          {
            "question": "What should a family & divorce lawyers page explain?",
            "answer": "Keep the original audience clear and explain eligibility, service scope and how to request information. Do not imply clinical, legal or financial outcomes."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Intellectual Property (IP) Lawyers",
        "slug": "ip-law",
        "description": "AI SEO and GEO planning for intellectual property (ip) lawyers. Authority building for patent and trademark attorneys targeting innovators.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a intellectual property (ip) lawyers page explain?",
            "answer": "General counsel, founders and business leaders need the relevant practice, jurisdiction and experience to be clear before they make contact."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Real Estate Legal Services",
        "slug": "real-estate-law",
        "description": "AI SEO and GEO planning for real estate legal services. Connecting firms with developers and commercial investors.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a real estate legal services page explain?",
            "answer": "General counsel, founders and business leaders need the relevant practice, jurisdiction and experience to be clear before they make contact."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Litigation & Arbitration Firms",
        "slug": "litigation",
        "description": "AI SEO and GEO planning for litigation & arbitration firms. Positioning firms for high-stakes dispute resolution.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a litigation & arbitration firms page explain?",
            "answer": "General counsel, founders and business leaders need the relevant practice, jurisdiction and experience to be clear before they make contact."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      }
    ],
    "painPoints": [
      "Practice pages do not answer commercial buyer questions",
      "Credentials and matter experience are difficult to verify",
      "Consumer enquiries obscure business demand"
    ],
    "solutions": [
      "Practice and sector content",
      "Verified lawyer and firm information",
      "Enquiry qualification"
    ],
    "relatedServices": [
      "ai-seo",
      "seo",
      "ppc"
    ],
    "faqs": [
      {
        "question": "What should buyers understand before contacting us?",
        "answer": "General counsel, founders and business leaders need the relevant practice, jurisdiction and experience to be clear before they make contact."
      },
      {
        "question": "What does Qognition measure?",
        "answer": "We distinguish search discovery, observed AI mentions and citations, relevant enquiries and sales outcomes. An appearance in an AI answer is not evidence of a completed sale."
      },
      {
        "question": "How do we discuss our requirements?",
        "answer": "Book a call or send an enquiry with your services, audience and current acquisition problem. We agree the relevant scope before proposing work."
      }
    ]
  },
  {
    "id": "accounting-cpa",
    "name": "Accounting & CPA Firms",
    "description": "AI SEO and GEO for accounting, tax and advisory firms selling expertise to business owners and finance teams.",
    "subIndustries": [
      {
        "name": "Chartered Accounting Firms",
        "slug": "chartered-accounting",
        "description": "AI SEO and GEO planning for chartered accounting firms. Full-service digital presence for accounting houses.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a chartered accounting firms page explain?",
            "answer": "Finance leaders compare the scope of advice, applicable jurisdictions, sector experience and the practical requirements of an engagement."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Tax Consultancy & Filing",
        "slug": "tax-consultancy",
        "description": "AI SEO and GEO planning for tax consultancy & filing. Seasonal scaling strategies to maximize tax-season revenue.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a tax consultancy & filing page explain?",
            "answer": "Finance leaders compare the scope of advice, applicable jurisdictions, sector experience and the practical requirements of an engagement."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Audit & Assurance Firms",
        "slug": "audit-assurance",
        "description": "AI SEO and GEO planning for audit & assurance firms. Trust-based marketing for corporate audit services.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a audit & assurance firms page explain?",
            "answer": "Finance leaders compare the scope of advice, applicable jurisdictions, sector experience and the practical requirements of an engagement."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Payroll & Compliance",
        "slug": "payroll-services",
        "description": "AI SEO and GEO planning for payroll & compliance. B2B lead generation for outsourced payroll providers.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a payroll & compliance page explain?",
            "answer": "Finance leaders compare the scope of advice, applicable jurisdictions, sector experience and the practical requirements of an engagement."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Bookkeeping Services",
        "slug": "bookkeeping",
        "description": "AI SEO and GEO planning for bookkeeping services. Local and remote SEO for outsourced bookkeeping.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a bookkeeping services page explain?",
            "answer": "Finance leaders compare the scope of advice, applicable jurisdictions, sector experience and the practical requirements of an engagement."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "GST / VAT Advisory",
        "slug": "tax-advisory",
        "description": "AI SEO and GEO planning for gst / vat advisory. Niche authority building for complex tax code consulting.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a gst / vat advisory page explain?",
            "answer": "Finance leaders compare the scope of advice, applicable jurisdictions, sector experience and the practical requirements of an engagement."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      }
    ],
    "painPoints": [
      "Specialist advisory services look interchangeable",
      "Useful expertise sits outside the website",
      "Enquiries lack business and engagement context"
    ],
    "solutions": [
      "Service and problem-led content",
      "Expert-reviewed explanations",
      "Business enquiry routing"
    ],
    "relatedServices": [
      "ai-seo",
      "seo",
      "ppc"
    ],
    "faqs": [
      {
        "question": "What should buyers understand before contacting us?",
        "answer": "Finance leaders compare the scope of advice, applicable jurisdictions, sector experience and the practical requirements of an engagement."
      },
      {
        "question": "What does Qognition measure?",
        "answer": "We distinguish search discovery, observed AI mentions and citations, relevant enquiries and sales outcomes. An appearance in an AI answer is not evidence of a completed sale."
      },
      {
        "question": "How do we discuss our requirements?",
        "answer": "Book a call or send an enquiry with your services, audience and current acquisition problem. We agree the relevant scope before proposing work."
      }
    ]
  },
  {
    "id": "financial-services",
    "name": "Financial Services & Investment",
    "description": "Search visibility for financial-services businesses, with clear audience boundaries and claims reviewed by the appropriate specialists.",
    "subIndustries": [
      {
        "name": "Wealth Management",
        "slug": "wealth-management",
        "description": "Legacy resource for wealth management: useful service information, accessible contact paths and careful claims review. This page does not describe a verified client engagement.",
        "features": [
          "Audience-specific information",
          "Accessible contact journeys",
          "Claims review"
        ],
        "benefits": [
          "Clear next steps",
          "Relevant information"
        ],
        "faqs": [
          {
            "question": "What should a wealth management page explain?",
            "answer": "Keep the original audience clear and explain eligibility, service scope and how to request information. Do not imply clinical, legal or financial outcomes."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Investment Advisory",
        "slug": "investment-advisory",
        "description": "Legacy resource for investment advisory: useful service information, accessible contact paths and careful claims review. This page does not describe a verified client engagement.",
        "features": [
          "Audience-specific information",
          "Accessible contact journeys",
          "Claims review"
        ],
        "benefits": [
          "Clear next steps",
          "Relevant information"
        ],
        "faqs": [
          {
            "question": "What should a investment advisory page explain?",
            "answer": "Keep the original audience clear and explain eligibility, service scope and how to request information. Do not imply clinical, legal or financial outcomes."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "FinTech Companies",
        "slug": "fintech",
        "description": "AI SEO and GEO planning for fintech companies. user acquisition for financial technology startups.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a fintech companies page explain?",
            "answer": "Separate institutional and business propositions from any legacy consumer-facing material. Product eligibility, risk statements and permissions need review by your qualified advisers."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Mutual Fund Managers",
        "slug": "mutual-funds",
        "description": "Legacy resource for mutual fund managers: useful service information, accessible contact paths and careful claims review. This page does not describe a verified client engagement.",
        "features": [
          "Audience-specific information",
          "Accessible contact journeys",
          "Claims review"
        ],
        "benefits": [
          "Clear next steps",
          "Relevant information"
        ],
        "faqs": [
          {
            "question": "What should a mutual fund managers page explain?",
            "answer": "Keep the original audience clear and explain eligibility, service scope and how to request information. Do not imply clinical, legal or financial outcomes."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Insurance Advisory",
        "slug": "insurance",
        "description": "AI SEO and GEO planning for insurance advisory. Lead generation for life, health, and commercial insurance.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a insurance advisory page explain?",
            "answer": "Separate institutional and business propositions from any legacy consumer-facing material. Product eligibility, risk statements and permissions need review by your qualified advisers."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Financial Planning",
        "slug": "financial-planning",
        "description": "Legacy resource for financial planning: useful service information, accessible contact paths and careful claims review. This page does not describe a verified client engagement.",
        "features": [
          "Audience-specific information",
          "Accessible contact journeys",
          "Claims review"
        ],
        "benefits": [
          "Clear next steps",
          "Relevant information"
        ],
        "faqs": [
          {
            "question": "What should a financial planning page explain?",
            "answer": "Keep the original audience clear and explain eligibility, service scope and how to request information. Do not imply clinical, legal or financial outcomes."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      }
    ],
    "painPoints": [
      "Retail and business audiences overlap",
      "Financial claims need substantiation",
      "Long evaluations create attribution gaps"
    ],
    "solutions": [
      "Audience-specific service pages",
      "Evidence and review workflows",
      "CRM-connected enquiry journeys"
    ],
    "relatedServices": [
      "ai-seo",
      "seo",
      "ppc"
    ],
    "faqs": [
      {
        "question": "What should buyers understand before contacting us?",
        "answer": "Separate institutional and business propositions from any legacy consumer-facing material. Product eligibility, risk statements and permissions need review by your qualified advisers."
      },
      {
        "question": "What does Qognition measure?",
        "answer": "We distinguish search discovery, observed AI mentions and citations, relevant enquiries and sales outcomes. An appearance in an AI answer is not evidence of a completed sale."
      },
      {
        "question": "How do we discuss our requirements?",
        "answer": "Book a call or send an enquiry with your services, audience and current acquisition problem. We agree the relevant scope before proposing work."
      }
    ]
  },
  {
    "id": "consulting",
    "name": "Management & Business Consultancy",
    "description": "Help B2B buyers find and evaluate your consulting expertise through AI SEO, GEO and useful decision-stage content.",
    "subIndustries": [
      {
        "name": "Strategy Consulting",
        "slug": "strategy-consulting",
        "description": "AI SEO and GEO planning for strategy consulting. Blue-chip positioning for high-level strategic advisors.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a strategy consulting page explain?",
            "answer": "A buyer needs to understand the business problem, your method, the responsibilities on both sides and the evidence supporting your recommendations."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Operations Consulting",
        "slug": "operations-consulting",
        "description": "AI SEO and GEO planning for operations consulting. Case-study driven marketing for efficiency experts.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a operations consulting page explain?",
            "answer": "A buyer needs to understand the business problem, your method, the responsibilities on both sides and the evidence supporting your recommendations."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "HR & Talent Consulting",
        "slug": "hr-consulting",
        "description": "AI SEO and GEO planning for hr & talent consulting. B2B lead gen for recruitment and organizational design.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a hr & talent consulting page explain?",
            "answer": "A buyer needs to understand the business problem, your method, the responsibilities on both sides and the evidence supporting your recommendations."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Startup Advisory",
        "slug": "startup-advisory",
        "description": "AI SEO and GEO planning for startup advisory. Growth marketing for incubator and accelerator consultants.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a startup advisory page explain?",
            "answer": "A buyer needs to understand the business problem, your method, the responsibilities on both sides and the evidence supporting your recommendations."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Risk & Compliance",
        "slug": "risk-compliance",
        "description": "AI SEO and GEO planning for risk & compliance. Authority building for regulatory consultants.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a risk & compliance page explain?",
            "answer": "A buyer needs to understand the business problem, your method, the responsibilities on both sides and the evidence supporting your recommendations."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Digital Transformation",
        "slug": "digital-transformation",
        "description": "AI SEO and GEO planning for digital transformation. Lead gen for IT and change management firms.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a digital transformation page explain?",
            "answer": "A buyer needs to understand the business problem, your method, the responsibilities on both sides and the evidence supporting your recommendations."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      }
    ],
    "painPoints": [
      "Methodology is difficult to assess",
      "Partner expertise is not visible in search",
      "Enquiries arrive before the problem is defined"
    ],
    "solutions": [
      "Problem and application pages",
      "Expert interviews and selection guides",
      "Clear discovery-call paths"
    ],
    "relatedServices": [
      "ai-seo",
      "seo",
      "ppc"
    ],
    "faqs": [
      {
        "question": "What should buyers understand before contacting us?",
        "answer": "A buyer needs to understand the business problem, your method, the responsibilities on both sides and the evidence supporting your recommendations."
      },
      {
        "question": "What does Qognition measure?",
        "answer": "We distinguish search discovery, observed AI mentions and citations, relevant enquiries and sales outcomes. An appearance in an AI answer is not evidence of a completed sale."
      },
      {
        "question": "How do we discuss our requirements?",
        "answer": "Book a call or send an enquiry with your services, audience and current acquisition problem. We agree the relevant scope before proposing work."
      }
    ]
  },
  {
    "id": "real-estate",
    "name": "Real Estate & Property",
    "description": "Search and enquiry journeys for commercial property, facilities and property-management businesses, with legacy residential resources retained.",
    "subIndustries": [
      {
        "name": "Commercial Real Estate",
        "slug": "commercial-real-estate",
        "description": "AI SEO and GEO planning for commercial real estate. Lead generation for office, retail, and industrial leasing.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a commercial real estate page explain?",
            "answer": "Commercial property buyers compare asset types, service coverage, operating requirements and procurement fit. Residential content keeps its original audience and is not presented as B2B proof."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Residential Agencies",
        "slug": "residential-agencies",
        "description": "Legacy resource for residential agencies: useful service information, accessible contact paths and careful claims review. This page does not describe a verified client engagement.",
        "features": [
          "Audience-specific information",
          "Accessible contact journeys",
          "Claims review"
        ],
        "benefits": [
          "Clear next steps",
          "Relevant information"
        ],
        "faqs": [
          {
            "question": "What should a residential agencies page explain?",
            "answer": "Keep the original audience clear and explain eligibility, service scope and how to request information. Do not imply clinical, legal or financial outcomes."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Property Management",
        "slug": "property-management",
        "description": "AI SEO and GEO planning for property management. B2B marketing to attract landlords and asset owners.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a property management page explain?",
            "answer": "Commercial property buyers compare asset types, service coverage, operating requirements and procurement fit. Residential content keeps its original audience and is not presented as B2B proof."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Facility Management",
        "slug": "facility-management",
        "description": "AI SEO and GEO planning for facility management. Contract acquisition for maintenance services.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a facility management page explain?",
            "answer": "Commercial property buyers compare asset types, service coverage, operating requirements and procurement fit. Residential content keeps its original audience and is not presented as B2B proof."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Leasing Consultants",
        "slug": "leasing-consultants",
        "description": "AI SEO and GEO planning for leasing consultants. Digital presence for rental market experts.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a leasing consultants page explain?",
            "answer": "Commercial property buyers compare asset types, service coverage, operating requirements and procurement fit. Residential content keeps its original audience and is not presented as B2B proof."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Real Estate Investment",
        "slug": "real-estate-investment",
        "description": "AI SEO and GEO planning for real estate investment. Attracting LPs and capital for RE funds.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a real estate investment page explain?",
            "answer": "Commercial property buyers compare asset types, service coverage, operating requirements and procurement fit. Residential content keeps its original audience and is not presented as B2B proof."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      }
    ],
    "painPoints": [
      "Commercial and residential intent overlap",
      "Service coverage is unclear",
      "Enquiries omit property and project requirements"
    ],
    "solutions": [
      "Commercial application content",
      "Accurate service-area information",
      "Project-specific enquiry capture"
    ],
    "relatedServices": [
      "ai-seo",
      "seo",
      "ppc"
    ],
    "faqs": [
      {
        "question": "What should buyers understand before contacting us?",
        "answer": "Commercial property buyers compare asset types, service coverage, operating requirements and procurement fit. Residential content keeps its original audience and is not presented as B2B proof."
      },
      {
        "question": "What does Qognition measure?",
        "answer": "We distinguish search discovery, observed AI mentions and citations, relevant enquiries and sales outcomes. An appearance in an AI answer is not evidence of a completed sale."
      },
      {
        "question": "How do we discuss our requirements?",
        "answer": "Book a call or send an enquiry with your services, audience and current acquisition problem. We agree the relevant scope before proposing work."
      }
    ]
  },
  {
    "id": "manufacturing",
    "name": "Manufacturing & Industrial",
    "description": "AI SEO and GEO for manufacturers whose buyers research specifications, applications and supplier capability before requesting a quote.",
    "subIndustries": [
      {
        "name": "B2B Manufacturing",
        "slug": "b2b-manufacturing",
        "description": "AI SEO and GEO planning for b2b manufacturing. Global SEO for contract manufacturing and fabrication.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a b2b manufacturing page explain?",
            "answer": "Engineers and procurement teams need supported specifications, tolerances, materials, delivery capabilities and a useful route to a technical enquiry."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Industrial Equipment",
        "slug": "industrial-equipment",
        "description": "AI SEO and GEO planning for industrial equipment. E-commerce and quote-generation for heavy machinery.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a industrial equipment page explain?",
            "answer": "Engineers and procurement teams need supported specifications, tolerances, materials, delivery capabilities and a useful route to a technical enquiry."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "OEM Manufacturers",
        "slug": "oem",
        "description": "AI SEO and GEO planning for oem manufacturers. Supply chain visibility and partner acquisition.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a oem manufacturers page explain?",
            "answer": "Engineers and procurement teams need supported specifications, tolerances, materials, delivery capabilities and a useful route to a technical enquiry."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Raw Material Suppliers",
        "slug": "raw-materials",
        "description": "AI SEO and GEO planning for raw material suppliers. Commodity marketing and bulk order generation.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a raw material suppliers page explain?",
            "answer": "Engineers and procurement teams need supported specifications, tolerances, materials, delivery capabilities and a useful route to a technical enquiry."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Factory Automation",
        "slug": "factory-automation",
        "description": "AI SEO and GEO planning for factory automation. Marketing Industry 4.0 solutions to plant managers.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a factory automation page explain?",
            "answer": "Engineers and procurement teams need supported specifications, tolerances, materials, delivery capabilities and a useful route to a technical enquiry."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Engineering Units",
        "slug": "engineering-fabrication",
        "description": "AI SEO and GEO planning for engineering units. Niche targeting for specialized engineering services.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a engineering units page explain?",
            "answer": "Engineers and procurement teams need supported specifications, tolerances, materials, delivery capabilities and a useful route to a technical enquiry."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      }
    ],
    "painPoints": [
      "Product detail is difficult to retrieve",
      "Buyers cannot assess application fit",
      "RFQs arrive without useful technical context"
    ],
    "solutions": [
      "Application and capability pages",
      "Expert-reviewed technical content",
      "RFQ and supplier-enquiry journeys"
    ],
    "relatedServices": [
      "ai-seo",
      "seo",
      "ppc"
    ],
    "faqs": [
      {
        "question": "What should buyers understand before contacting us?",
        "answer": "Engineers and procurement teams need supported specifications, tolerances, materials, delivery capabilities and a useful route to a technical enquiry."
      },
      {
        "question": "What does Qognition measure?",
        "answer": "We distinguish search discovery, observed AI mentions and citations, relevant enquiries and sales outcomes. An appearance in an AI answer is not evidence of a completed sale."
      },
      {
        "question": "How do we discuss our requirements?",
        "answer": "Book a call or send an enquiry with your services, audience and current acquisition problem. We agree the relevant scope before proposing work."
      }
    ]
  },
  {
    "id": "coaching",
    "name": "Coaching & Consultancy",
    "description": "Search content for training and advisory providers, distinguishing business learning programs from legacy consumer education pages.",
    "subIndustries": [
      {
        "name": "Exam Coaching Centers",
        "slug": "exam-coaching",
        "description": "Legacy resource for exam coaching centers: useful service information, accessible contact paths and careful claims review. This page does not describe a verified client engagement.",
        "features": [
          "Audience-specific information",
          "Accessible contact journeys",
          "Claims review"
        ],
        "benefits": [
          "Clear next steps",
          "Relevant information"
        ],
        "faqs": [
          {
            "question": "What should a exam coaching centers page explain?",
            "answer": "Keep the original audience clear and explain eligibility, service scope and how to request information. Do not imply clinical, legal or financial outcomes."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Career Coaching",
        "slug": "career-coaching",
        "description": "AI SEO and GEO planning for career coaching. Personal branding and lead gen for career mentors.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a career coaching page explain?",
            "answer": "An organizational buyer compares the skills gap, delivery format, trainer experience and the way progress will be assessed. Individual learning resources retain their original context."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Business Coaching",
        "slug": "business-coaching",
        "description": "AI SEO and GEO planning for business coaching. High-ticket funnel optimization for executive coaches.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a business coaching page explain?",
            "answer": "An organizational buyer compares the skills gap, delivery format, trainer experience and the way progress will be assessed. Individual learning resources retain their original context."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Corporate Training",
        "slug": "corporate-training",
        "description": "AI SEO and GEO planning for corporate training. B2B sales enablement for training providers.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a corporate training page explain?",
            "answer": "An organizational buyer compares the skills gap, delivery format, trainer experience and the way progress will be assessed. Individual learning resources retain their original context."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Skill Institutes",
        "slug": "skill-development",
        "description": "AI SEO and GEO planning for skill institutes. Enrollment campaigns for vocational training.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a skill institutes page explain?",
            "answer": "An organizational buyer compares the skills gap, delivery format, trainer experience and the way progress will be assessed. Individual learning resources retain their original context."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Certification Coaching",
        "slug": "certification-coaching",
        "description": "AI SEO and GEO planning for certification coaching. SEO for professional credential training.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a certification coaching page explain?",
            "answer": "An organizational buyer compares the skills gap, delivery format, trainer experience and the way progress will be assessed. Individual learning resources retain their original context."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      }
    ],
    "painPoints": [
      "Business and individual audiences are mixed",
      "Learning outcomes lack supporting evidence",
      "Buyers cannot assess delivery requirements"
    ],
    "solutions": [
      "Audience-specific program pages",
      "Trainer and method information",
      "Corporate training enquiry paths"
    ],
    "relatedServices": [
      "ai-seo",
      "seo",
      "ppc"
    ],
    "faqs": [
      {
        "question": "What should buyers understand before contacting us?",
        "answer": "An organizational buyer compares the skills gap, delivery format, trainer experience and the way progress will be assessed. Individual learning resources retain their original context."
      },
      {
        "question": "What does Qognition measure?",
        "answer": "We distinguish search discovery, observed AI mentions and citations, relevant enquiries and sales outcomes. An appearance in an AI answer is not evidence of a completed sale."
      },
      {
        "question": "How do we discuss our requirements?",
        "answer": "Book a call or send an enquiry with your services, audience and current acquisition problem. We agree the relevant scope before proposing work."
      }
    ]
  },
  {
    "id": "industrial-trade",
    "name": "Industrial & Trade",
    "description": "AI SEO and GEO for industrial suppliers, distributors and logistics businesses that need qualified specification and sourcing enquiries.",
    "subIndustries": [
      {
        "name": "Manufacturing Units",
        "slug": "manufacturing-units",
        "description": "AI SEO and GEO planning for manufacturing units. Local visibility for SME production units.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a manufacturing units page explain?",
            "answer": "A sourcing team needs accurate product information, service coverage and a way to discuss specification, availability and delivery requirements."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Heavy Equipment",
        "slug": "heavy-equipment",
        "description": "AI SEO and GEO planning for heavy equipment. Global reach for large-scale machinery sales.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a heavy equipment page explain?",
            "answer": "A sourcing team needs accurate product information, service coverage and a way to discuss specification, availability and delivery requirements."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "B2B Factories",
        "slug": "b2b-factories",
        "description": "AI SEO and GEO planning for b2b factories. Contract acquisition for specialized factories.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a b2b factories page explain?",
            "answer": "A sourcing team needs accurate product information, service coverage and a way to discuss specification, availability and delivery requirements."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Industrial Supplies",
        "slug": "industrial-supplies",
        "description": "AI SEO and GEO planning for industrial supplies. E-commerce solutions for MRO and components.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a industrial supplies page explain?",
            "answer": "A sourcing team needs accurate product information, service coverage and a way to discuss specification, availability and delivery requirements."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Exporters & Importers",
        "slug": "export-import",
        "description": "AI SEO and GEO planning for exporters & importers. International trade marketing and trade compliance SEO.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a exporters & importers page explain?",
            "answer": "A sourcing team needs accurate product information, service coverage and a way to discuss specification, availability and delivery requirements."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Logistics & Supply Chain",
        "slug": "logistics",
        "description": "AI SEO and GEO planning for logistics & supply chain. Brand authority for 3PL and freight forwarders.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a logistics & supply chain page explain?",
            "answer": "A sourcing team needs accurate product information, service coverage and a way to discuss specification, availability and delivery requirements."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      }
    ],
    "painPoints": [
      "Catalogues hide application information",
      "Cross-border requirements are unclear",
      "Sales receives poorly specified requests"
    ],
    "solutions": [
      "Supplier and application content",
      "Technical catalogue accessibility",
      "Qualified quote paths"
    ],
    "relatedServices": [
      "ai-seo",
      "seo",
      "ppc"
    ],
    "faqs": [
      {
        "question": "What should buyers understand before contacting us?",
        "answer": "A sourcing team needs accurate product information, service coverage and a way to discuss specification, availability and delivery requirements."
      },
      {
        "question": "What does Qognition measure?",
        "answer": "We distinguish search discovery, observed AI mentions and citations, relevant enquiries and sales outcomes. An appearance in an AI answer is not evidence of a completed sale."
      },
      {
        "question": "How do we discuss our requirements?",
        "answer": "Book a call or send an enquiry with your services, audience and current acquisition problem. We agree the relevant scope before proposing work."
      }
    ]
  },
  {
    "id": "care-homes",
    "name": "Care Homes",
    "description": "Legacy search-planning resources for care providers. These pages retain their care audience and are not evidence of a B2B client engagement.",
    "subIndustries": [
      {
        "name": "Assisted Living",
        "slug": "assisted-living",
        "description": "Legacy resource for assisted living: useful service information, accessible contact paths and careful claims review. This page does not describe a verified client engagement.",
        "features": [
          "Audience-specific information",
          "Accessible contact journeys",
          "Claims review"
        ],
        "benefits": [
          "Clear next steps",
          "Relevant information"
        ],
        "faqs": [
          {
            "question": "What should a assisted living page explain?",
            "answer": "Keep the original audience clear and explain eligibility, service scope and how to request information. Do not imply clinical, legal or financial outcomes."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Home Nursing",
        "slug": "home-nursing",
        "description": "Legacy resource for home nursing: useful service information, accessible contact paths and careful claims review. This page does not describe a verified client engagement.",
        "features": [
          "Audience-specific information",
          "Accessible contact journeys",
          "Claims review"
        ],
        "benefits": [
          "Clear next steps",
          "Relevant information"
        ],
        "faqs": [
          {
            "question": "What should a home nursing page explain?",
            "answer": "Keep the original audience clear and explain eligibility, service scope and how to request information. Do not imply clinical, legal or financial outcomes."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Medical Care Homes",
        "slug": "medical-care-homes",
        "description": "Legacy resource for medical care homes: useful service information, accessible contact paths and careful claims review. This page does not describe a verified client engagement.",
        "features": [
          "Audience-specific information",
          "Accessible contact journeys",
          "Claims review"
        ],
        "benefits": [
          "Clear next steps",
          "Relevant information"
        ],
        "faqs": [
          {
            "question": "What should a medical care homes page explain?",
            "answer": "Keep the original audience clear and explain eligibility, service scope and how to request information. Do not imply clinical, legal or financial outcomes."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Rehabilitation Centers",
        "slug": "rehab-centers",
        "description": "Legacy resource for rehabilitation centers: useful service information, accessible contact paths and careful claims review. This page does not describe a verified client engagement.",
        "features": [
          "Audience-specific information",
          "Accessible contact journeys",
          "Claims review"
        ],
        "benefits": [
          "Clear next steps",
          "Relevant information"
        ],
        "faqs": [
          {
            "question": "What should a rehabilitation centers page explain?",
            "answer": "Keep the original audience clear and explain eligibility, service scope and how to request information. Do not imply clinical, legal or financial outcomes."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Disability Care",
        "slug": "disability-care",
        "description": "Legacy resource for disability care: useful service information, accessible contact paths and careful claims review. This page does not describe a verified client engagement.",
        "features": [
          "Audience-specific information",
          "Accessible contact journeys",
          "Claims review"
        ],
        "benefits": [
          "Clear next steps",
          "Relevant information"
        ],
        "faqs": [
          {
            "question": "What should a disability care page explain?",
            "answer": "Keep the original audience clear and explain eligibility, service scope and how to request information. Do not imply clinical, legal or financial outcomes."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Post-Hospital Care",
        "slug": "post-hospital",
        "description": "Legacy resource for post-hospital care: useful service information, accessible contact paths and careful claims review. This page does not describe a verified client engagement.",
        "features": [
          "Audience-specific information",
          "Accessible contact journeys",
          "Claims review"
        ],
        "benefits": [
          "Clear next steps",
          "Relevant information"
        ],
        "faqs": [
          {
            "question": "What should a post-hospital care page explain?",
            "answer": "Keep the original audience clear and explain eligibility, service scope and how to request information. Do not imply clinical, legal or financial outcomes."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      }
    ],
    "painPoints": [
      "Service information is difficult to assess",
      "Referral and family enquiries need different paths",
      "Sensitive claims require specialist review"
    ],
    "solutions": [
      "Accessible service information",
      "Clear referral pathways",
      "Consent-aware contact journeys"
    ],
    "relatedServices": [
      "ai-seo",
      "seo",
      "ppc"
    ],
    "faqs": [
      {
        "question": "What should buyers understand before contacting us?",
        "answer": "Care and referral decisions require clear service information, accessibility and careful handling of sensitive enquiries. Medical claims need review by qualified professionals."
      },
      {
        "question": "What does Qognition measure?",
        "answer": "We distinguish search discovery, observed AI mentions and citations, relevant enquiries and sales outcomes. An appearance in an AI answer is not evidence of a completed sale."
      },
      {
        "question": "How do we discuss our requirements?",
        "answer": "Book a call or send an enquiry with your services, audience and current acquisition problem. We agree the relevant scope before proposing work."
      }
    ]
  },
  {
    "id": "elder-care",
    "name": "Elder Home Services",
    "description": "Legacy resources on clear, accessible information for elder-care services, retained alongside Qognition’s current B2B focus.",
    "subIndustries": [
      {
        "name": "Senior Living Communities",
        "slug": "senior-living",
        "description": "Legacy resource for senior living communities: useful service information, accessible contact paths and careful claims review. This page does not describe a verified client engagement.",
        "features": [
          "Audience-specific information",
          "Accessible contact journeys",
          "Claims review"
        ],
        "benefits": [
          "Clear next steps",
          "Relevant information"
        ],
        "faqs": [
          {
            "question": "What should a senior living communities page explain?",
            "answer": "Keep the original audience clear and explain eligibility, service scope and how to request information. Do not imply clinical, legal or financial outcomes."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Retirement Homes",
        "slug": "retirement-homes",
        "description": "Legacy resource for retirement homes: useful service information, accessible contact paths and careful claims review. This page does not describe a verified client engagement.",
        "features": [
          "Audience-specific information",
          "Accessible contact journeys",
          "Claims review"
        ],
        "benefits": [
          "Clear next steps",
          "Relevant information"
        ],
        "faqs": [
          {
            "question": "What should a retirement homes page explain?",
            "answer": "Keep the original audience clear and explain eligibility, service scope and how to request information. Do not imply clinical, legal or financial outcomes."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Memory Care",
        "slug": "memory-care",
        "description": "Legacy resource for memory care: useful service information, accessible contact paths and careful claims review. This page does not describe a verified client engagement.",
        "features": [
          "Audience-specific information",
          "Accessible contact journeys",
          "Claims review"
        ],
        "benefits": [
          "Clear next steps",
          "Relevant information"
        ],
        "faqs": [
          {
            "question": "What should a memory care page explain?",
            "answer": "Keep the original audience clear and explain eligibility, service scope and how to request information. Do not imply clinical, legal or financial outcomes."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Independent Living",
        "slug": "independent-living",
        "description": "Legacy resource for independent living: useful service information, accessible contact paths and careful claims review. This page does not describe a verified client engagement.",
        "features": [
          "Audience-specific information",
          "Accessible contact journeys",
          "Claims review"
        ],
        "benefits": [
          "Clear next steps",
          "Relevant information"
        ],
        "faqs": [
          {
            "question": "What should a independent living page explain?",
            "answer": "Keep the original audience clear and explain eligibility, service scope and how to request information. Do not imply clinical, legal or financial outcomes."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Palliative Care",
        "slug": "palliative-care",
        "description": "Legacy resource for palliative care: useful service information, accessible contact paths and careful claims review. This page does not describe a verified client engagement.",
        "features": [
          "Audience-specific information",
          "Accessible contact journeys",
          "Claims review"
        ],
        "benefits": [
          "Clear next steps",
          "Relevant information"
        ],
        "faqs": [
          {
            "question": "What should a palliative care page explain?",
            "answer": "Keep the original audience clear and explain eligibility, service scope and how to request information. Do not imply clinical, legal or financial outcomes."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Long-Term Care",
        "slug": "long-term-care",
        "description": "Legacy resource for long-term care: useful service information, accessible contact paths and careful claims review. This page does not describe a verified client engagement.",
        "features": [
          "Audience-specific information",
          "Accessible contact journeys",
          "Claims review"
        ],
        "benefits": [
          "Clear next steps",
          "Relevant information"
        ],
        "faqs": [
          {
            "question": "What should a long-term care page explain?",
            "answer": "Keep the original audience clear and explain eligibility, service scope and how to request information. Do not imply clinical, legal or financial outcomes."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      }
    ],
    "painPoints": [
      "Families cannot easily compare care information",
      "Recruitment and service enquiries are mixed",
      "Accessibility affects contact journeys"
    ],
    "solutions": [
      "Plain-language service pages",
      "Separate enquiry types",
      "Accessible forms and next steps"
    ],
    "relatedServices": [
      "ai-seo",
      "seo",
      "ppc"
    ],
    "faqs": [
      {
        "question": "What should buyers understand before contacting us?",
        "answer": "These resources address care-service information and remain distinct from B2B acquisition work. They do not establish a client relationship or promise care outcomes."
      },
      {
        "question": "What does Qognition measure?",
        "answer": "We distinguish search discovery, observed AI mentions and citations, relevant enquiries and sales outcomes. An appearance in an AI answer is not evidence of a completed sale."
      },
      {
        "question": "How do we discuss our requirements?",
        "answer": "Book a call or send an enquiry with your services, audience and current acquisition problem. We agree the relevant scope before proposing work."
      }
    ]
  },
  {
    "id": "waste-management",
    "name": "Waste Management",
    "description": "AI SEO and GEO for commercial waste, recycling and environmental-service businesses with specific material and service-area requirements.",
    "subIndustries": [
      {
        "name": "Solid Waste Collection",
        "slug": "waste-collection",
        "description": "AI SEO and GEO planning for solid waste collection. Local SEO for residential and commercial pickup.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a solid waste collection page explain?",
            "answer": "Facilities and procurement teams compare material acceptance, service coverage, documented permissions and collection requirements before approaching a provider."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Recycling & Scrap",
        "slug": "recycling-scrap",
        "description": "AI SEO and GEO planning for recycling & scrap. B2B sourcing for scrap metal and recycling plants.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a recycling & scrap page explain?",
            "answer": "Facilities and procurement teams compare material acceptance, service coverage, documented permissions and collection requirements before approaching a provider."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "E-Waste Management",
        "slug": "e-waste",
        "description": "AI SEO and GEO planning for e-waste management. Corporate partnerships for electronic disposal.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a e-waste management page explain?",
            "answer": "Facilities and procurement teams compare material acceptance, service coverage, documented permissions and collection requirements before approaching a provider."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Biomedical Waste",
        "slug": "biomedical-waste",
        "description": "AI SEO and GEO planning for biomedical waste. Compliance-focused marketing for medical disposal.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a biomedical waste page explain?",
            "answer": "Facilities and procurement teams compare material acceptance, service coverage, documented permissions and collection requirements before approaching a provider."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Hazardous Waste",
        "slug": "hazardous-waste",
        "description": "AI SEO and GEO planning for hazardous waste. Industrial safety marketing for hazmat services.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a hazardous waste page explain?",
            "answer": "Facilities and procurement teams compare material acceptance, service coverage, documented permissions and collection requirements before approaching a provider."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      },
      {
        "name": "Scrap Processing",
        "slug": "scrap-processing",
        "description": "AI SEO and GEO planning for scrap processing. Supply chain visibility for processing units.",
        "features": [
          "Buyer-question research",
          "Service and application content",
          "Enquiry and booking paths"
        ],
        "benefits": [
          "Clearer buyer evaluation",
          "Better enquiry context"
        ],
        "faqs": [
          {
            "question": "What should a scrap processing page explain?",
            "answer": "Facilities and procurement teams compare material acceptance, service coverage, documented permissions and collection requirements before approaching a provider."
          },
          {
            "question": "Does this page demonstrate a client result?",
            "answer": "No. This page explains an approach and intended audience. Any client result must have separate, attributable evidence."
          }
        ]
      }
    ],
    "painPoints": [
      "Buyers cannot confirm accepted materials",
      "Service and permit information is fragmented",
      "Enquiries omit quantities and collection needs"
    ],
    "solutions": [
      "Material and application pages",
      "Verified capability information",
      "Qualified collection and contract enquiries"
    ],
    "relatedServices": [
      "ai-seo",
      "seo",
      "ppc"
    ],
    "faqs": [
      {
        "question": "What should buyers understand before contacting us?",
        "answer": "Facilities and procurement teams compare material acceptance, service coverage, documented permissions and collection requirements before approaching a provider."
      },
      {
        "question": "What does Qognition measure?",
        "answer": "We distinguish search discovery, observed AI mentions and citations, relevant enquiries and sales outcomes. An appearance in an AI answer is not evidence of a completed sale."
      },
      {
        "question": "How do we discuss our requirements?",
        "answer": "Book a call or send an enquiry with your services, audience and current acquisition problem. We agree the relevant scope before proposing work."
      }
    ]
  }
];
