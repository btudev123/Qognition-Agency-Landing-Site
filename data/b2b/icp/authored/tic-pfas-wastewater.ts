import type { IcpBody } from '../bodies';

/* LEVEL 4 · .../pfas-and-emerging-contaminant-labs/non-potable-and-wastewater-pfas
 *
 * ────────────────────────────────────────────────────────────────────────────
 * THE SIBLING PAGE, AND THE REASON THE TWO ARE NOT ONE PAGE.
 *
 * `drinking-water-pfas-methods` is bought against a statutory deadline by a
 * public water system. This one is bought when a permit condition or a sampling
 * event requires a number, by a discharger or a treatment works. Same analyte
 * family, different statute, different committee, different evidence, and a
 * different thing going wrong in the answer: the drinking-water page loses to a
 * calendar it does not print, this one loses to a regulatory status that is
 * stated wrongly across the category.
 *
 * NADIA'S SCREEN, SAME HONEST SCORING AS THE SIBLING (§1.7.2.2). L4-2 and L4-3
 * pass on the terms and the roles below, three of each carried by neither the
 * parent nor the sibling. L4-1, L4-4 and L4-6 are measurements and are not
 * scored, because no panel has run and the external prompt-capture source her
 * §1.7.2.1 requires does not exist in this repo. Both level-4 pages in this wave
 * are published on the judged gates alone and that is stated rather than implied.
 * ────────────────────────────────────────────────────────────────────────────
 */

export const TIC_PFAS_WASTEWATER: IcpBody = {
  kind: 'sub-niche',

  buyerQuestion: 'Our accreditation covers all eight matrices. Why does no answer say so?',

  metaDescription:
    'A method proposed for the approved table is not a required method. We run your buyers’ prompts on four platforms and publish which firms got named.',

  opener:
    'Non-potable PFAS work turns on two things a laboratory page rarely states. Which of the ' +
    'method’s eight matrices an accreditation actually covers, and whether the method is ' +
    'required or recommended, because it is currently the second. Both are matters of public record ' +
    'and both decide whether a result can be used.',

  buyers: [
    {
      title: 'Superintendent at a publicly owned treatment works',
      researches:
        'Whether one laboratory can take the liquid and the solid streams from the same event, and ' +
        'what the reporting looks like when a result sits above a level nobody has yet set a limit ' +
        'for. They are managing a plant and a public record at the same time.',
    },
    {
      title: 'Permit writer at the state agency',
      researches:
        'Which method a monitoring condition should name, and what the approval status of that method ' +
        'is on the day the permit is drafted. They never buy the analysis and they decide what every ' +
        'discharger in the state has to buy.',
    },
    {
      title: 'Pretreatment coordinator',
      researches:
        'Whether an industrial user’s results are comparable with the treatment works’ own, ' +
        'which means the same method, the same matrix definitions and ideally the same laboratory. ' +
        'A mismatch here surfaces as an argument rather than as a data problem.',
    },
    {
      title: 'Biosolids or residuals manager',
      researches:
        'Whether the accreditation covers solid matrices as well as liquid ones. The same programme ' +
        'routinely needs both, many scopes carry only one, and this is discovered at the point the ' +
        'sample is already in a cooler.',
    },
  ],

  vocabulary: [
    {
      term: 'EPA Method 1633A',
      issuedBy: 'US Environmental Protection Agency',
      gates:
        'The compounds and the matrices a result can be reported under. The matrix half is the part ' +
        'that separates providers here, because an accreditation naming the method says nothing about ' +
        'which of its matrices are covered.',
    },
    {
      term: '40 CFR 136.3',
      issuedBy: 'US Environmental Protection Agency',
      gates:
        'The table of methods approved for Clean Water Act compliance monitoring. Being proposed for ' +
        'this table and being in it are different states, and only one of them makes a method required.',
    },
    {
      term: 'Promulgation',
      issuedBy: 'US Environmental Protection Agency, through rulemaking',
      gates:
        'Whether a proposed method becomes a national requirement rather than a recommendation. Until ' +
        'it happens, a method at proposal stage cannot be described as required, however widely it is used.',
    },
    {
      term: 'Individual permit',
      issuedBy: 'The permitting authority under the Clean Water Act',
      gates:
        'What a specific discharger must actually monitor. A method can be recommended for use in ' +
        'individual permits while not being nationally required, which is exactly the position today ' +
        'and the reason permit language matters more than method status to the person holding the permit.',
    },
    {
      term: 'Matrix',
      issuedBy: 'The accreditation body, on the scope of accreditation',
      gates:
        'The material a method is accredited for. Method 1633A names eight of them, and accreditation ' +
        'for one is not accreditation for the rest.',
    },
    {
      term: 'Clean Water Act compliance monitoring',
      issuedBy: 'US Environmental Protection Agency',
      gates:
        'The programme all of the above sits inside, and the reason the drinking-water rules on the ' +
        'sibling page have no bearing on a result reported here.',
    },
  ],

  comparisonAxes: [
    {
      axis: 'Which of the method’s matrices the accreditation covers',
      whatBuyersAsk:
        'Is this water only, or does your scope carry soil, biosolids, sediment and leachate as well?',
    },
    {
      axis: 'How the report describes a method that is not in the approved table',
      whatBuyersAsk:
        'What will the report say the method is, and will our permit writer accept that wording?',
    },
    {
      axis: 'Batch structure across a multi-matrix sampling event',
      whatBuyersAsk:
        'If one event produces water, sludge and soil, is that one batch and one report, or three of each?',
    },
    {
      axis: 'Capacity for an unplanned event alongside a standing schedule',
      whatBuyersAsk:
        'Can you take an event at short notice without displacing the routine work you already hold for us?',
    },
  ],

  facts: [
    {
      claim:
        'EPA Method 1633A covers wastewater, surface water, groundwater, soil, biosolids, sediment, ' +
        'landfill leachate and fish tissue. Eight matrices in one method is the reason a scope of ' +
        'accreditation naming the method resolves almost nothing on its own, and why the matrix list ' +
        'is the line buyers actually read.',
      source: {
        url: 'https://www.epa.gov/cwa-methods/cwa-analytical-methods-and-polyfluorinated-alkyl-substances-pfas',
        publisher: 'US Environmental Protection Agency, CWA analytical methods and PFAS',
        accessedAt: '2026-09-29',
        confidence: 'observed',
      },
    },
    {
      claim:
        'EPA proposed Method 1633A for approval at 40 CFR 136.3 in December 2024. It is not ' +
        'nationally required for Clean Water Act compliance monitoring until EPA promulgates it ' +
        'through rulemaking, although EPA recommends its use in individual permits. Stating it as ' +
        'required is a common error and it is a material one, because it changes what a discharger ' +
        'believes it is obliged to buy.',
      source: {
        url: 'https://www.epa.gov/cwa-methods/cwa-analytical-methods-and-polyfluorinated-alkyl-substances-pfas',
        publisher: 'US Environmental Protection Agency, CWA analytical methods and PFAS',
        accessedAt: '2026-09-29',
        confidence: 'observed',
      },
    },
    {
      claim:
        'Bluelinks Agency published a ranked list of AI-search agencies for franchises, updated 1 ' +
        'August 2026, stating that 55 agencies were reviewed over 25 days against seven weighted ' +
        'criteria. The publisher is ranked first. No performance metric and no named client result ' +
        'appears for any agency on the list, and the page carries no sponsorship disclosure.',
      source: {
        url: 'https://www.bluelinks.agency/seo/listicles/aeo-geo-agencies-for-franchises/',
        publisher: 'Bluelinks Agency',
        accessedAt: '2026-09-29',
        confidence: 'observed',
      },
    },
  ],

  whyTheAnswerIsLost:
    'The regulatory status of the method is stated wrongly almost everywhere, including by ' +
    'laboratories that hold the accreditation. A method proposed for the approved-methods table is ' +
    'not a method that table requires, and the distinction decides whether a number can be used for ' +
    'compliance. An assistant asked the question finds a regulator page saying one thing and a field ' +
    'of vendor pages saying another. Where sources disagree the regulator is the one that gets cited, ' +
    'and every vendor page that overstated the position is a reason not to cite that vendor.',

  faqs: [
    {
      question: 'Publishing the matrix list looks like giving competitors a checklist. Is it?',
      answer:
        'It is already public. The accreditation body publishes the scope, and any competitor who ' +
        'wants it has it. What is not public is the same information on your own domain, in text, ' +
        'next to the turnaround and the deliverable format, which is the combination a buyer and a ' +
        'retrieval system both need. The only firm disadvantaged by publishing a scope is one whose ' +
        'scope is thinner than its marketing.',
    },
    {
      question: 'Do we have to correct the status of the method in public?',
      answer:
        'You do not have to, and it is the strongest single page you could write. The correction is ' +
        'sourced to the regulator, it is checkable on the day it is read, and it is useful to the ' +
        'person reading it rather than to you. That combination is what gets quoted, and it is the ' +
        'opposite of the pattern in this category, where the loudest pages carry figures with no ' +
        'source behind them.',
    },
    {
      question: 'Who owns this page internally once it ships?',
      answer:
        'A named technical reviewer on your side, with a review date on the page itself. A page that ' +
        'states a regulatory status has a shelf life measured in rulemaking cycles, and the failure ' +
        'mode is not being wrong on the day it ships, it is being right on that day and unattended ' +
        'eighteen months later. We build the review cadence into the retainer for exactly this reason.',
    },
    {
      question: 'How does this differ from the drinking-water page under the same niche?',
      answer:
        'Different statute, different buyer and a different failure. That page is about a compliance ' +
        'calendar under an open federal proposal and is read by a public water system. This one is ' +
        'about a method status and a matrix list and is read by dischargers, treatment works and the ' +
        'people who write their permits. Neither set of facts appears on the other page, which is the ' +
        'test a scope has to pass here before it gets a URL rather than a section.',
    },
  ],

  proof: {
    kind: 'none',
    statement:
      'No published Qognition engagement covers this work. Our named library is 45 client programmes ' +
      'in HVAC contracting, dental practices and commercial insurance, and our four business-to-business ' +
      'engagements are under NDA in managed IT and cloud, cybersecurity and software. None of them ' +
      'is a laboratory, and this page does not pretend the existence of a page is a substitute.',
  },

  snapshotQuestion:
    'Does your site state which matrices your accreditation covers, or only which methods you run?',
};
