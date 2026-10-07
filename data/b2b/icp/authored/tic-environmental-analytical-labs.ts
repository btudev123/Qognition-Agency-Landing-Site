import type { IcpBody } from '../bodies';

/* LEVEL 3 · .../environmental-testing-labs/environmental-analytical-labs
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHY THIS NICHE EARNED A URL, WRITTEN OUT SO IT CAN BE ARGUED WITH.
 *
 * Theo §3.3 sets three tests and one blocker. Against the parent page at
 * `environmental-testing-labs`:
 *
 *   Committee   four roles, none of them on the parent's list. The licensed site
 *               professional signing the report, the project chemist, the
 *               consultant's data manager and the state programme auditor. The
 *               parent's buyer is a consultant's project manager choosing a
 *               supplier; this page's buyer is the person whose signature or
 *               audit the result has to survive.
 *   Axes        all four replaced, not narrowed. Reporting limit against an
 *               action level, state recognition, MDL currency and historical
 *               comparability. None of those is the parent's axis with an
 *               adjective on it.
 *   Vocabulary  seven terms, none on the parent. Five are issued by TNI, which
 *               is the point: NELAP is what this niche is accredited under and
 *               the parent covers laboratories that are not.
 *   Blocker     three sourced facts not inherited from the parent. Present.
 *
 * `fit` on this niche is `Both`, so the citation argument leads and the paid
 * argument follows it. That is the only thing `fit` does here and it is never
 * rendered as a label.
 * ────────────────────────────────────────────────────────────────────────────
 */

export const TIC_ENVIRONMENTAL_ANALYTICAL_LABS: IcpBody = {
  kind: 'sub-niche',

  buyerQuestion: 'Why is our name missing from the two or three a consultant calls first?',

  metaDescription:
    'State recognition, reporting limits and deliverable format decide this work. We test what AI assistants tell your buyers, and date every answer.',

  opener:
    'Analytical work is awarded on whether the result will stand up, not on whether the laboratory ' +
    'can run the method. Recognition by the state programme holding the file, a reporting limit ' +
    'under the action level, and a deliverable a validator can score are the three gates. This page ' +
    'sets out who applies them.',

  buyers: [
    {
      title: 'Licensed site professional or consultant of record',
      researches:
        'Whether a laboratory’s accreditation is recognised by the environmental programme in ' +
        'the state the site sits in, because a result from an unrecognised laboratory does not close ' +
        'a file. This is the person whose signature goes on the report, and the risk of a rejected ' +
        'submittal lands on them rather than on the laboratory.',
    },
    {
      title: 'Project chemist',
      researches:
        'Reporting limits set against the action level for that programme and analyte, and how the ' +
        'laboratory handles matrix interference and dilution. A reporting limit sitting above the ' +
        'action level turns a clean result into no result, which is the most expensive way to ' +
        'discover a laboratory was the wrong choice.',
    },
    {
      title: 'Data manager on the consultant’s side',
      researches:
        'The deliverable specification field by field, and whether historical batches from this ' +
        'laboratory already load into the project database without mapping work. Ten years of a ' +
        'monitoring record are worth more than a cheaper batch.',
    },
    {
      title: 'State programme auditor',
      researches:
        'Method detection limit studies, chain of custody records, corrective actions and ' +
        'proficiency testing history. This role never buys anything and can remove a field from a ' +
        'scope, which makes it the only reader on this list who can end the relationship without ' +
        'talking to anyone in it.',
    },
  ],

  vocabulary: [
    {
      term: 'The TNI Standard',
      issuedBy: 'The NELAC Institute (TNI)',
      gates:
        'Environmental laboratory accreditation in NELAP states. It builds on ISO/IEC 17025 and adds ' +
        'a documented quality system, method validation, method detection limit studies, chain of ' +
        'custody, data integrity and corrective action, and proficiency testing.',
    },
    {
      term: 'NELAP accreditation',
      issuedBy: 'State NELAP Accreditation Bodies',
      gates:
        'Whether an environmental programme in that state will accept the data. TNI writes the ' +
        'standard and the states grant the accreditation, so accreditation is held state by state ' +
        'rather than once.',
    },
    {
      term: 'Fields of Proficiency Testing tables',
      issuedBy: 'The NELAC Institute (TNI)',
      gates:
        'Which proficiency test a laboratory has to pass to keep a given field on its scope. Updated ' +
        'tables take effect on 1 January 2026.',
    },
    {
      term: 'Method detection limit study',
      issuedBy: 'The NELAC Institute, as a requirement of the TNI Standard',
      gates:
        'The lowest concentration the laboratory may claim to detect for a method and matrix. TNI ' +
        'names it among the environmental-specific requirements the standard adds on top of ISO/IEC 17025.',
    },
    {
      term: 'Chain of custody',
      issuedBy: 'The NELAC Institute, as a requirement of the TNI Standard',
      gates:
        'Whether a result survives being challenged. The unbroken documented record from collection ' +
        'to analysis, named by TNI among the requirements the standard adds.',
    },
    {
      term: 'Data integrity and corrective action',
      issuedBy: 'The NELAC Institute, as a requirement of the TNI Standard',
      gates:
        'The documented response when a result is found to be wrong, and the evidence an auditor ' +
        'reads to decide whether the response was real.',
    },
    {
      term: 'NVLAP',
      issuedBy: 'National Institute of Standards and Technology',
      gates:
        'A United States government laboratory accreditation programme. Its current programme scope ' +
        'is not stated on this page because it was not verified at the publisher.',
    },
  ],

  comparisonAxes: [
    {
      axis: 'Reporting limit against the programme’s action level',
      whatBuyersAsk:
        'Can you report below the action level for this analyte in this matrix, and what does the ' +
        'limit become on a diluted sample?',
    },
    {
      axis: 'Recognition by the state programme holding the file',
      whatBuyersAsk:
        'Is your accreditation recognised by the agency that will read this submittal, and on what basis?',
    },
    {
      axis: 'Currency of the method detection limit study',
      whatBuyersAsk:
        'When was the study for this method last run, and does it cover the matrix we are sending you?',
    },
    {
      axis: 'Comparability with an existing monitoring record',
      whatBuyersAsk:
        'If we move this programme to you, will the new results be comparable with the years of data ' +
        'already in the file?',
    },
  ],

  facts: [
    {
      claim:
        'The TNI Standard is written by The NELAC Institute, and accreditation against it is granted ' +
        'by state NELAP Accreditation Bodies rather than by TNI itself. It builds on ISO/IEC 17025 ' +
        'and adds environmental-specific requirements: a documented quality system, method validation ' +
        'and method detection limit studies, chain of custody, data integrity and corrective action, ' +
        'and proficiency testing. Read at second hand rather than at the publisher.',
      source: {
        url: 'https://www.nelac-institute.org',
        publisher: 'The NELAC Institute (TNI)',
        accessedAt: '2026-09-29',
        confidence: 'reported',
      },
    },
    {
      claim:
        'TNI announced on 18 August 2025 that updated Fields of Proficiency Testing tables take ' +
        'effect on 1 January 2026, which changes what a NELAP-accredited laboratory has to pass to ' +
        'keep a field on its scope. Reported rather than confirmed at the publisher, and worth ' +
        'checking against your own accreditation body before it is quoted to a client.',
      source: {
        url: 'https://www.nelac-institute.org',
        publisher: 'The NELAC Institute (TNI)',
        accessedAt: '2026-09-29',
        confidence: 'reported',
      },
    },
    {
      claim:
        'NVLAP is a United States government laboratory accreditation programme operated by the ' +
        'National Institute of Standards and Technology. Its current programme scope was not ' +
        'verified, so this page names the programme and the body that runs it and stops there rather ' +
        'than describing coverage it did not read.',
      source: {
        url: 'https://www.nist.gov/nvlap',
        publisher: 'National Institute of Standards and Technology',
        accessedAt: '2026-09-29',
        confidence: 'reported',
      },
    },
    {
      claim:
        'Apollo Technical, a trade publisher, ran a ranked list of manufacturing generative-engine ' +
        'optimisation agencies on 16 August 2026, stating a methodology of six months and 49 agencies ' +
        'assessed on client depth, AI citation strength, verified case studies and research output. ' +
        'Several entries are described inside the list itself as still accumulating case studies, ' +
        'which is a useful reminder that a ranked position in this category is not a measurement.',
      source: {
        url: 'https://www.apollotechnical.com/the-top-ranked-manufacturing-geo-agencies/',
        publisher: 'Apollo Technical',
        accessedAt: '2026-09-28',
        confidence: 'observed',
      },
    },
  ],

  whyTheAnswerIsLost:
    'State-by-state recognition is the question, and nobody publishes it as a sentence. A laboratory ' +
    'holds accreditation granted separately by each state programme it works in, and the site ' +
    'usually says so as a map graphic or a logo row. An assistant asked which laboratory is ' +
    'recognised for a method in a named state cannot read a map, so it returns the state agency’s ' +
    'own accredited-laboratory list, which is text, is authoritative, and is updated by somebody ' +
    'else. Being on that list is necessary and is not the same thing as being the name the assistant says.',

  faqs: [
    {
      question: 'Is publishing our state recognitions really worth the effort?',
      answer:
        'It is the change with the clearest reason behind it. The question a buyer asks names a ' +
        'method, a matrix and a state, and a page that answers in those three terms gives an ' +
        'assistant something to quote, while a map graphic does not. It is also the version of the work that ' +
        'survives an audit, because you are publishing what the accreditation body already says ' +
        'rather than a marketing summary of it. We would do that before anything else, and we would ' +
        'not write a blog post first.',
    },
    {
      question: 'Who keeps it current when a field comes off our scope?',
      answer:
        'You do, and the process has to be designed for that on day one rather than retrofitted. A ' +
        'published scope that has gone stale is worse than no published scope: it is a claim your own ' +
        'accreditation body contradicts, and a buyer who catches it will assume everything else on ' +
        'the site is the same age. We build the scope pages so a field can be removed without ' +
        'touching anything else, and the review schedule goes in the retainer rather than in a document.',
    },
    {
      question: 'Who checks the technical writing?',
      answer:
        'A named person on your side who reads scope documents for a living, before anything is ' +
        'published. Nothing in this niche is publishable on the strength of a writer ' +
        'being careful, because the errors that matter are the ones that look fine to a careful ' +
        'writer: a matrix that does not belong to a method, a limit quoted without the basis, a ' +
        'programme named as though it were national.',
    },
    {
      question: 'What happens if the first run shows we are already being named?',
      answer:
        'Then we say so, and the work changes shape rather than the report changing wording. Being ' +
        'named for your strongest method does not mean you are named for the others, and the run ' +
        'shows which ones you are missing. We would rather find that at the start than defend a ' +
        'programme that was solving a problem you did not have.',
    },
  ],

  scope: [
    {
      slug: 'soil-and-groundwater-analysis',
      distinguishes:
        'The default matrix pair for a site investigation, and the one where the reporting limit has ' +
        'to sit under an action level that differs between states for the same analyte.',
    },
    {
      slug: 'air-and-soil-vapor-analysis',
      distinguishes:
        'Sampling media and hold times govern this work more than instrumentation does, because a ' +
        'canister or sorbent tube that misses its window cannot be re-run from the same event.',
    },
    {
      slug: 'hazardous-waste-characterization',
      distinguishes:
        'Analysis run to answer a disposal question rather than a risk question, so the output that ' +
        'matters is a waste profile the receiving facility will accept, not a package a validator will score.',
    },
    {
      slug: 'radiochemistry',
      distinguishes:
        'Long counting times put this on a different turnaround clock from the rest of the ' +
        'laboratory, so a programme that mixes it with routine analysis is running two schedules.',
    },
    {
      slug: 'dioxin-and-high-resolution-analysis',
      distinguishes:
        'High-resolution instrumentation and a distinct field on the scope of accreditation, so ' +
        'holding a general environmental accreditation says nothing about whether this can be reported.',
    },
  ],

  proof: {
    kind: 'none',
    statement:
      'No published Qognition engagement covers an analytical laboratory. Our named client results ' +
      'come from other sectors, and none of them is evidence for this niche. The method is ' +
      'transferable and the record is not, and those are different sentences.',
  },

  snapshotQuestion:
    'For how many of the states you are recognised in can a buyer find that stated, in text, on your own site?',
};
