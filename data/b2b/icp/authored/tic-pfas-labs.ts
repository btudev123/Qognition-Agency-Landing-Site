import type { IcpBody } from '../bodies';

/* LEVEL 3 · .../environmental-testing-labs/pfas-and-emerging-contaminant-labs
 *
 * ────────────────────────────────────────────────────────────────────────────
 * THE ARGUMENT THIS PAGE MAKES, AND WHY IT IS NOT ITS PARENT'S.
 *
 * The parent page is about a laboratory being selected on registered scope. This
 * page is about one thing the scope has to distinguish that almost no site does:
 * PFAS work sits under two different statutes, the certification under one is
 * not the certification under the other, and the federal position on both moved
 * inside the last eighteen months.
 *
 * TWO CHILDREN BELOW THIS ONE ARE PUBLISHED AS PAGES, and the split between them
 * is the statute rather than the scope. That is the level-4 test Theo §3.4 sets:
 * not a narrower scope, a different buying trigger. A utility watching a
 * compliance date and an industrial permittee reading a permit condition are not
 * the same search on the same day.
 *
 * The other three children are scope rows below, with the sentence that
 * distinguishes each. A name with no sentence would be a dead list item, which
 * is the directory shape Nadia's C6 forbids.
 * ────────────────────────────────────────────────────────────────────────────
 */

export const TIC_PFAS_LABS: IcpBody = {
  kind: 'sub-niche',

  buyerQuestion: 'Why does an assistant name a competitor whose analyte list is shorter than ours?',

  metaDescription:
    'This work spans two statutes and one scope document. We test what AI assistants tell your buyers, and date every answer.',

  opener:
    'PFAS work is two regulatory programmes wearing one name. Drinking water sits under one statute ' +
    'with compliance dates and an open rescission proposal. Discharge monitoring sits under another, ' +
    'with a method the regulator recommends and has not required. A laboratory that publishes which ' +
    'of the two it is accredited for answers a question nobody else on the shortlist answers.',

  buyers: [
    {
      title: 'Utility water quality manager',
      researches:
        'Which programme a certification actually sits under, because the drinking-water and ' +
        'discharge programmes are governed by different statutes and one certificate rarely covers ' +
        'both. They are also watching a compliance date that a federal proposal may move, which ' +
        'makes the laboratory a planning decision rather than a purchasing one.',
    },
    {
      title: 'Environmental manager at an industrial permittee',
      researches:
        'Whether the laboratory can report the exact analyte list a permit condition names, and what ' +
        'happens to the numbers already filed if the federal method status changes before the next ' +
        'monitoring cycle. The permit, not the laboratory’s capability list, defines the job.',
    },
    {
      title: 'Coverage or litigation counsel',
      researches:
        'Whether a result would survive being challenged: the method named on the report, the field ' +
        'and laboratory blank controls, and the custody record. This reader treats a data package as ' +
        'an exhibit, and they are reading for what is missing rather than for what is reported.',
    },
    {
      title: 'Regulatory affairs lead on the product side',
      researches:
        'Whether the laboratory tests a material rather than an environment. That is a different ' +
        'sample preparation and frequently a different laboratory, and a page that does not separate ' +
        'the two sends this reader to a competitor who did.',
    },
  ],

  vocabulary: [
    {
      term: 'EPA Method 1633A',
      issuedBy: 'US Environmental Protection Agency',
      gates:
        'The compound list and the matrices a laboratory may report under that method. Published as ' +
        'EPA 820-R-24-007 in a December 2024 version.',
    },
    {
      term: '40 CFR 136.3',
      issuedBy: 'US Environmental Protection Agency',
      gates:
        'The table of methods approved for Clean Water Act compliance monitoring. A method proposed ' +
        'for that table is not yet required by it, and the difference decides what a result can be used for.',
    },
    {
      term: 'Clean Water Act compliance monitoring',
      issuedBy: 'US Environmental Protection Agency',
      gates:
        'The monitoring a discharge permit requires. This is the programme a method’s approval ' +
        'status at 40 CFR 136.3 speaks to, and it is not the drinking-water programme.',
    },
    {
      term: 'Safe Drinking Water Act',
      issuedBy: 'Administered by the US Environmental Protection Agency',
      gates:
        'The statute the drinking-water limits and their compliance dates sit under. A certification ' +
        'held under this programme is not a certification under the discharge programme, and the two ' +
        'are routinely conflated on laboratory websites.',
    },
    {
      term: 'Maximum contaminant level',
      issuedBy: 'US Environmental Protection Agency, under the Safe Drinking Water Act',
      gates:
        'The concentration at which a public water system is out of compliance. Compliance dates ' +
        'attach to the level rather than to the analysis, which is why a proposal to change one is a ' +
        'capital-planning event for the buyer.',
    },
    {
      term: 'ISO/IEC 17025',
      issuedBy: 'ISO and IEC',
      gates:
        'The competence standard underneath every accreditation named on this page. It says nothing ' +
        'on its own about which PFAS compounds or matrices are covered: that is on the scope, not on ' +
        'the standard.',
    },
    {
      term: 'Scope of accreditation',
      issuedBy: 'The accreditation body that granted it',
      gates:
        'Which method, which compound and which matrix. For this work the compound list is the part ' +
        'buyers read line by line, because a scope carrying most of a required list is a scope that ' +
        'fails the requirement.',
    },
  ],

  comparisonAxes: [
    {
      axis: 'Which statute the certification sits under',
      whatBuyersAsk:
        'Is this certification for the drinking-water programme, the discharge programme, or neither, ' +
        'and who recognises it?',
    },
    {
      axis: 'Compound coverage against the list the requirement names',
      whatBuyersAsk:
        'Does your scope carry every compound on the list we have been told to report, or most of them?',
    },
    {
      axis: 'Contamination control across sampling and the laboratory',
      whatBuyersAsk:
        'What do you supply for field blanks, what are your laboratory blank criteria, and what ' +
        'happens when a blank is not clean?',
    },
    {
      axis: 'Behaviour when the federal position moves mid-programme',
      whatBuyersAsk:
        'If the rule or the method status changes before our next cycle, what happens to the data we ' +
        'have already filed and to the price of the next batch?',
    },
  ],

  facts: [
    {
      claim:
        'EPA Method 1633A, in the December 2024 version published as EPA 820-R-24-007, covers 40 PFAS ' +
        'compounds. The compound count is the part a buyer compares against a permit condition or a ' +
        'monitoring requirement, and a scope of accreditation that carries some of the 40 does not ' +
        'satisfy a requirement that names all of them.',
      source: {
        url: 'https://www.epa.gov/cwa-methods/cwa-analytical-methods-and-polyfluorinated-alkyl-substances-pfas',
        publisher: 'US Environmental Protection Agency, CWA analytical methods and PFAS',
        accessedAt: '2026-09-29',
        confidence: 'observed',
      },
    },
    {
      claim:
        'EPA proposed the PFAS Rescission Rule on 18 May 2026. It would remove the regulatory ' +
        'determinations and related provisions for PFHxS, PFNA, HFPO-DA (also called GenX) and ' +
        'Hazard Index mixtures of those three plus PFBS. A proposal is not a rule, and as of 29 ' +
        'September 2026 no final action had been observed on it.',
      source: {
        url: 'https://www.epa.gov/sdwa/proposed-pfas-rescission-rule',
        publisher: 'US Environmental Protection Agency, Safe Drinking Water Act programme',
        accessedAt: '2026-09-29',
        confidence: 'observed',
      },
    },
    {
      claim:
        'RevenueZen published a ranked list of generative-engine-optimisation agencies for ' +
        'professional-services firms on 12 June 2026, naming itself and five others. The page carries ' +
        'no dated client result for any of the six, including the publisher, and four of the six are ' +
        'software content shops positioned sideways into the category.',
      source: {
        url: 'https://revenuezen.com/top-geo-agencies-professional-services-firms',
        publisher: 'RevenueZen',
        accessedAt: '2026-09-28',
        confidence: 'observed',
      },
    },
  ],

  whyTheAnswerIsLost:
    'The page says PFAS and the question says a statute. A buyer asking which laboratory can support ' +
    'a drinking-water monitoring schedule and a buyer asking which laboratory can report a permit ' +
    'condition are asking about two different programmes, two different certifications and two ' +
    'different sets of compounds. Almost every laboratory site answers both with one heading and a ' +
    'capability paragraph. An AI assistant given one heading for two questions returns the source ' +
    'that separated them, which is the regulator, so the regulator gets cited and the laboratory does not.',

  faqs: [
    {
      question: 'The federal position is still moving. Should we wait until it settles?',
      answer:
        'The movement is the demand. A proposal that is on the table and not finalised means every ' +
        'utility, consultant and permittee has to plan against two futures at once, and that means ' +
        'research. Whether your buyers do that research in an AI assistant is what a first test ' +
        'shows. A laboratory that publishes what is proposed, what is in force and what is ' +
        'unchanged, with dates against each, is answering the question that is actually being typed. ' +
        'Waiting means publishing into the same field once it is crowded.',
    },
    {
      question: 'Is it safe to publish a position on an unfinalised rule?',
      answer:
        'It is safe to publish the procedural facts and dangerous to publish a prediction. Proposal ' +
        'dates, hearing dates, comment closing dates and the compliance dates in the rule as it ' +
        'stands are all matters of record and can be sourced to the regulator. What the outcome will ' +
        'be, and what any given system will have to install, is not. We write the first and refuse ' +
        'the second, and we date every page so a reader can tell how old the position is.',
    },
    {
      question: 'Our competitors publish bigger numbers than we do. Does that not win the answer?',
      answer:
        'Not reliably, and it is the wrong thing to compete on. A compound count with no scope behind ' +
        'it is a marketing claim, and the buyers on this page read the scope. What gives an assistant ' +
        'something specific to cite is the pairing: this compound, in this matrix, under this method, recognised by ' +
        'this body. That is harder to write and much harder for a competitor to copy, because they ' +
        'would have to hold the accreditation to say it.',
    },
    {
      question: 'Does the same work help us in Google as well as in the assistants?',
      answer:
        'Largely yes, and you can buy either on its own or both together. A page that answers a ' +
        'statute-specific question in plain text is also the kind of page that ranks in Google for ' +
        'the detailed version of that question, and keeping your firm’s name and details consistent ' +
        'everywhere helps in both. Where they differ is measurement: Google rankings are tracked by ' +
        'position, AI answers by testing a fixed set of buyer questions, and we report them ' +
        'separately rather than averaging them into one score.',
    },
  ],

  scope: [
    {
      slug: 'pfas-in-products-and-packaging',
      distinguishes:
        'The sample is a material rather than an environment, so the preparation, the client and the ' +
        'reason for the test all change. This work is bought by a regulatory affairs team, not by a ' +
        'site or a utility.',
    },
    {
      slug: 'total-oxidizable-precursor-assays',
      distinguishes:
        'An assay run to estimate what a targeted compound list is missing, which makes it a ' +
        'complement to a target-analyte programme rather than a substitute for one.',
    },
    {
      slug: 'microplastics-analysis',
      distinguishes:
        'Grouped here by the buyer rather than by the chemistry: the same emerging-contaminant ' +
        'programmes ask for it, and it carries none of the statutory apparatus the PFAS work does.',
    },
  ],

  proof: {
    kind: 'none',
    statement:
      'Qognition has run no published programme for a laboratory doing this work. Our case studies ' +
      'name their clients, and none of them is relevant evidence here. What is on offer is a first ' +
      'dated test of your own buyers’ questions. A search we ran on 29 September 2026 for ' +
      'AI-search agencies aimed at this sector found no specialist and no ranked list.',
  },

  snapshotQuestion:
    'Does your site say which statute each of your certifications sits under, or does it say the word PFAS and leave the reader to guess?',
};
