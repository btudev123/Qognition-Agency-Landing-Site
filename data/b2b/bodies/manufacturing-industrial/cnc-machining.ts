import type { SubNicheBody } from '../../types';

/* Type B body — /industries/manufacturing-industrial/cnc-machining.
 *
 * Sourced from docs/research/b2b-vertical-substance.md §3.3, which carries the
 * URL, publisher, access date and observed-versus-reported status for every
 * standard named below.
 *
 * THE SILENCES ARE DELIBERATE. That document flags `[NEEDS DATA]` against the
 * current edition year of ASME Y14.5, the current revision of AS9102, the
 * current AIAG PPAP edition, the ISO 9001 transition deadline, and the IA9100
 * rename. None of those appear here. A wrong standard revision is a competence
 * signal to an engineer and an entity mismatch to a model, and it is the exact
 * failure mode a page like this exists to avoid. Write the standard, omit the
 * revision, until someone has the primary in hand.
 */

export const CNC_MACHINING: SubNicheBody = {
  kind: 'sub-niche',

  buyerQuestion: 'Why does an assistant recommend a marketplace instead of my machine shop?',

  /* 156 characters. Names the artefact the buyer cannot find, which is the
     specific thing this page is about and the reason to click it. */
  metaDescription:
    'Your tolerances and certificate scopes are in a PDF, so the marketplace gets named instead. We measure what assistants say about your shop, and date it.',

  opener:
    'A machine shop is absent from the assistant answer because its qualification facts are not ' +
    'readable. Tolerance ranges, certificate scope, material grades and quantity bands decide the ' +
    'shortlist, and on most shop websites they live in a brochure PDF. Marketplaces publish the ' +
    'same facts as structured text, so the marketplace gets named.',

  buyers: [
    {
      title: 'Design engineer at an OEM',
      researches:
        'Whether the part is makeable here before anyone is contacted: achievable tolerance stated ' +
        'as a range, material by designation such as 17-4 PH or Ti-6Al-4V rather than "exotic ' +
        'alloys", machine envelope, axis count and bar capacity. They have the STEP file already.',
    },
    {
      title: 'Supplier quality engineer',
      researches:
        'First article inspection practice, CMM capability and reporting format, certificates of ' +
        'conformance, material certificates and traceability to heat lot. This role rarely appears ' +
        'in a shop’s analytics and routinely decides the outcome.',
    },
    {
      title: 'Commodity manager or strategic buyer',
      researches:
        'Which certificate covers which scope, whether the registration is current, real minimum ' +
        'order quantity, and second-source capacity. They are assembling the justification pack ' +
        'that gets a new shop onto the approved vendor list.',
    },
    {
      title: 'NPI or programme manager',
      researches:
        'Whether the shop supports prototype through bridge to low-volume production without a ' +
        'transfer, and what documentation moves at each step.',
    },
  ],

  facts: [
    {
      claim:
        'The FDA’s Quality Management System Regulation became effective on 2 February 2026. It ' +
        'amends 21 CFR Part 820 and incorporates ISO 13485:2016 by reference together with clause 3 ' +
        'of ISO 9000:2015. From that date the FDA discontinued the Quality System Inspection ' +
        'Technique and began using Compliance Program 7382.850. Any shop machining device ' +
        'components is inside a customer’s supplier-qualification programme nobody has much ' +
        'practice with yet.',
      source: {
        url: 'https://www.fda.gov/medical-devices/postmarket-requirements-devices/quality-management-system-regulation-qmsr',
        publisher: 'U.S. Food and Drug Administration',
        accessedAt: '2026-09-28',
        confidence: 'observed',
      },
    },
    {
      claim:
        'Nadcap special-process accreditation for aviation, defense and space is administered by ' +
        'the Performance Review Institute and covers 24 critical process accreditations, each with ' +
        'its own task group, including heat treating, non-destructive testing, welding, chemical ' +
        'processing and additive manufacturing. A shop that outsources heat treat inherits its ' +
        'subcontractor’s accreditation gap.',
      source: {
        url: 'https://www.p-r-i.org/nadcap/',
        publisher: 'Performance Review Institute',
        accessedAt: '2026-09-28',
        confidence: 'observed',
      },
    },
    {
      claim:
        'The 48 CFR CMMC acquisition rule took effect on 10 November 2025 under clause DFARS ' +
        '252.204-7021. A shop holding federal contract information or controlled unclassified ' +
        'information needs the required level as a condition of award, which turns "which of my ' +
        'suppliers is CMMC ready" into a live supplier-discovery question with a compliance filter.',
      source: {
        url: 'https://www.acquisition.gov/dfars/252.204-7021-contractor-compliance-cybersecurity-maturity-model-certification-level-requirements.',
        publisher: 'Acquisition.gov, DFARS 252.204-7021',
        accessedAt: '2026-09-28',
        confidence: 'observed',
      },
    },
    {
      claim:
        'IATF 16949:2016 is the automotive quality management standard and is a first edition that ' +
        'cancels and replaces ISO/TS 16949:2009. Shops still describing themselves as TS 16949 ' +
        'certified are naming a standard that was withdrawn, which reads as an out-of-date site to ' +
        'a buyer and as a different entity to a model.',
      source: {
        url: 'https://www.iatfglobaloversight.org/iatf-169492016/about/',
        publisher: 'IATF Global Oversight',
        accessedAt: '2026-09-28',
        confidence: 'observed',
      },
    },
  ],

  vocabulary: [
    {
      term: 'AS9100',
      issuedBy: 'International Aerospace Quality Group, published through SAE',
      gates:
        'Aerospace and defense work. A revision of the series is expected; until the issuing body ' +
        'confirms the name and date, write AS9100 and do not print a successor designation.',
    },
    {
      term: 'Nadcap',
      issuedBy: 'Performance Review Institute, governed by the Nadcap Management Council',
      gates:
        'Special processes rather than the shop as a whole: heat treating, NDT, welding, chemical ' +
        'processing. Scope is per process, so \u201cNadcap accredited\u201d alone is not an answer.',
    },
    {
      term: 'AS9102 first article inspection',
      issuedBy: 'International Aerospace Quality Group',
      gates:
        'The first production part off a new process. The forms and the ballooned drawing are what ' +
        'the customer’s quality engineer actually asks for.',
    },
    {
      term: 'PPAP and APQP',
      issuedBy: 'Automotive Industry Action Group',
      gates:
        'Automotive production part approval. The submission level the customer requires changes ' +
        'the work substantially, and it is the single most common scoping surprise.',
    },
    {
      term: 'GD&T per ASME Y14.5',
      issuedBy: 'American Society of Mechanical Engineers',
      gates:
        'How the drawing states datums, position and profile. A shop that cannot discuss datum ' +
        'schemes is filtered out by the engineer before a quote is requested.',
    },
    {
      term: 'ITAR registration',
      issuedBy: 'U.S. State Department, Directorate of Defense Trade Controls',
      gates:
        'Defense-article work and who may see the drawing. Registration status is a hard yes or no ' +
        'filter, not a capability claim.',
    },
    {
      term: 'Certificate of conformance and heat-lot traceability',
      issuedBy: 'Customer quality agreement, referencing the applicable QMS',
      gates:
        'Whether the part can be accepted at goods-in. Traceability back to the mill certificate is ' +
        'the thing that fails an audit when it is missing.',
    },
    {
      term: 'ISO 13485',
      issuedBy: 'International Organization for Standardization',
      gates:
        'Medical device component work, and since February 2026 it is incorporated by reference ' +
        'into the FDA’s QMSR rather than sitting beside it.',
    },
  ],

  comparisonAxes: [
    {
      axis: 'Tolerance capability',
      whatBuyersAsk:
        'What can you hold, on what feature, repeatably? An achievable range against a feature ' +
        'type. \u201cTight tolerances\u201d is read as \u201cno\u201d.',
    },
    {
      axis: 'Certification scope',
      whatBuyersAsk:
        'Which certificate covers which processes and sites, and is the registration current? Scope ' +
        'is the question. The logo is not.',
    },
    {
      axis: 'Quantity band',
      whatBuyersAsk:
        'Prototype, bridge, or low-volume production, and what is the real minimum order? Buyers ' +
        'want this before they call, and its absence is a common reason they do not.',
    },
    {
      axis: 'Lead time and available capacity',
      whatBuyersAsk:
        'What is quoted now, and is there second-source capacity if a line stops? Supplier failure ' +
        'is the fastest trigger in this market and the search happens the same day.',
    },
    {
      axis: 'NPI support',
      whatBuyersAsk:
        'Will you engage on design for manufacture before the drawing is frozen, and what moves ' +
        'with the part as it transfers from prototype to production?',
    },
  ],

  whyTheAnswerIsLost:
    'The machining answer is a filtered list, and marketplaces publish filterable data. An ' +
    'assistant asked for a supplier with a process, a certification and a region needs facts it can ' +
    'compare across firms. Marketplaces and directories expose exactly that, as text, per supplier. ' +
    'A shop website typically exposes a machine list and a photograph of the floor, with the ' +
    'certificate as a scanned image and the tolerance claim as an adjective. There is nothing to ' +
    'compare, so the shop is not in the comparison. This is not a ranking problem and it is not ' +
    'fixed by publishing more pages; it is fixed by making the qualification facts readable.',

  faqs: [
    {
      question: 'Our work comes from referrals and repeat customers. Why does this matter?',
      answer:
        'Because the referral still checks. The introduction gets your name into an engineer’s ' +
        'hands, and what happens next is a search, which for many engineers now starts with an assistant. ' +
        'The 2026 State of Marketing to Engineers report, published by GlobalSpec, TREW Marketing ' +
        'and Elektor International Media and accessed on 28 September 2026, records technical ' +
        'buyers completing 62% of the journey before contacting a vendor. The publisher does not state the sample size. ' +
        'The risk is not that referrals stop working. It ' +
        'is that a referred buyer forms an impression from a summary you never saw.',
    },
    {
      question: 'We cannot publish our tolerances or our customers. Does that rule this out?',
      answer:
        'No, and the constraint is normal here. Almost nothing a buyer filters on is confidential: ' +
        'process capability as a range, certificate scope, material families, machine envelope, ' +
        'quantity bands and lead-time behaviour are all publishable without naming a customer or a ' +
        'price. Where a genuine restriction exists, such as ITAR-controlled work, the fact of the ' +
        'registration is itself the publishable signal.',
    },
    {
      question: 'Which questions do you test, and how often?',
      answer:
        'We agree the set with you rather than picking it for you, covering process, ' +
        'certification, material and region, and test it on the AI platforms that matter for your ' +
        'market, such as ChatGPT, Perplexity, Gemini and Google AI Overviews. Re-runs follow a ' +
        'schedule we agree, and every run is kept, so you see the full history rather than only the ' +
        'latest month. Each line stores the original answer so you can check it rather than take ' +
        'it on trust.',
    },
    {
      question: 'What does the first 90 days look like?',
      answer:
        'A first test of the questions agreed with you; a clean-up so your company name, ' +
        'description and address are identical everywhere they appear; and the qualification facts ' +
        'moved out of PDFs into readable pages. Then a second test on the same questions. The second ' +
        'run is the point: one run is a reading on one day, and two runs on the same questions are ' +
        'the beginning of a measurement.',
    },
    {
      question: 'Will you promise we appear in ChatGPT?',
      answer:
        'No. We do not control any of these systems, their answers vary between runs, and a ' +
        'guarantee of placement in a third-party system is not a thing anyone can honestly sell. ' +
        'What is committed is the run, the record and the date.',
    },
  ],

  proof: {
    kind: 'none',
    statement:
      'No Qognition client has been published in CNC machining or precision engineering. Our named ' +
      'B2B results are in cybersecurity, cloud and recruitment software. This page is capability and ' +
      'method, and says so rather than implying ' +
      'a track record it does not have.',
  },

  snapshotQuestion:
    'Are your tolerance ranges, certificate scopes and quantity bands on a readable page, or in a ' +
    'PDF nothing can parse?',
};
