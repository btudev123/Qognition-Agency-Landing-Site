import type { IcpBody } from '../bodies';

/* LEVEL 2 · /industries/environmental-engineering-and-testing/environmental-testing-labs
 *
 * ────────────────────────────────────────────────────────────────────────────
 * THE WORKHORSE LEVEL, AND THE ONE THE OPERATOR ACTUALLY FILLED IN.
 *
 * Six operator fields hang off this row and off no other: `geo_angle`,
 * `buyer_titles`, `min_firm_size`, `client_value`, `ai_prompts`,
 * `ppc_keywords`. The template renders all six, so what is authored here is the
 * delta on top of them: the buying committee, the axes, the vocabulary and the
 * facts.
 *
 * `buyer_titles` on this row is VP Sales, Director of Business Development, Lab
 * Director and Client Services Manager. Those are the people who hire US, and
 * they render in the qualification block. `buyers[]` below is the other
 * audience: the consultant's project manager, the data validator, the utility's
 * procurement lead. Wiring one into the other is the rule-2 trap Theo §2 is a
 * post-mortem for, and it is the most common way a page in this family goes
 * wrong without anybody typing a forbidden word.
 * ────────────────────────────────────────────────────────────────────────────
 */

export const TIC_ENVIRONMENTAL_TESTING_LABS: IcpBody = {
  kind: 'sub-niche',

  buyerQuestion: 'Why does an assistant name the state certification list instead of our laboratory?',

  metaDescription:
    'Consultants pick a laboratory on registered scope and data package, not price. We run your buyers’ prompts on four platforms and publish what came back.',

  opener:
    'A laboratory is selected on what its accreditation actually lists, then on whether the data ' +
    'package loads. Both live in documents most laboratories publish as scanned certificates or not ' +
    'at all. This page sets out the roles that read them, the four things they compare on, and what ' +
    'our panel for this category will record.',

  buyers: [
    {
      title: 'Environmental consultant’s project manager',
      researches:
        'Which laboratory the project’s data can be defended with. They are selecting on behalf ' +
        'of their own client and they carry the consequence if the data is challenged, so the ' +
        'registered scope and the turnaround commitment are read before any price list. In most ' +
        'of this category this role, not the end client, is the buyer.',
    },
    {
      title: 'Quality assurance manager or data validator',
      researches:
        'Whether the package can be validated at all: batch quality control, surrogate recoveries, ' +
        'qualifier conventions, and whether the electronic deliverable loads into the project ' +
        'database without hand editing. This role rarely selects a laboratory and routinely removes one.',
    },
    {
      title: 'Utility or municipal procurement lead',
      researches:
        'Certification under the specific state programme that governs the sample, contract terms, ' +
        'and whether a single laboratory can hold an entire monitoring schedule rather than part of ' +
        'it. Price is a real factor here and it arrives after the certification question is settled.',
    },
    {
      title: 'Site or facility environmental coordinator at the generator',
      researches:
        'Whether a sample kit, the right containers and the right preservation can be in their hands ' +
        'before the sampling window opens, and whether the hold time for the analyte they have been ' +
        'told to report survives the courier route back.',
    },
  ],

  vocabulary: [
    {
      term: 'ISO/IEC 17025',
      issuedBy: 'ISO and IEC',
      gates:
        'Competence of testing and calibration laboratories, and the base standard most other ' +
        'accreditation in this category is built on top of. No edition year appears here: iso.org ' +
        'returns HTTP 403 to automated retrieval and the current edition could not be read at the publisher.',
    },
    {
      term: 'Scope of accreditation',
      issuedBy: 'The accreditation body that granted it',
      gates:
        'The specific method, analyte and matrix combinations a laboratory may report under that ' +
        'accreditation. Work outside the listed combinations is unaccredited work whatever the ' +
        'certificate number says, and this is the document the buyer reads first.',
    },
    {
      term: 'ILAC MRA',
      issuedBy: 'International Laboratory Accreditation Cooperation',
      gates:
        'Recognition of an accredited laboratory’s results between signatory bodies. A2LA states ' +
        'it is a signatory for ISO/IEC 17025. That status was not confirmed at ILAC, so it belongs ' +
        'on a list of things to check on a certificate rather than in a claim.',
    },
    {
      term: 'IAF MLA',
      issuedBy: 'International Accreditation Forum',
      gates:
        'The equivalent arrangement on the certification side. A2LA states it is a signatory for ' +
        'ISO/IEC 17065. Also unconfirmed at the source, and listed here for the same reason.',
    },
    {
      term: 'IBC Special Inspections accreditation programme',
      issuedBy: 'A2LA',
      gates:
        'Accreditation of an agency to perform special inspections under the International Building ' +
        'Code. A2LA runs it separately from its ISO/IEC 17025 programme, so holding one says nothing ' +
        'about holding the other.',
    },
    {
      term: 'ISO/IEC 17020',
      issuedBy: 'ISO and IEC',
      gates:
        'Bodies performing inspection, as distinct from bodies performing testing. Listed without a ' +
        'year: one accreditation body page referenced a 2026 edition, which would mean a revision ' +
        'landed this year, and that was not confirmed at the publisher.',
    },
    {
      term: 'ISO/IEC 17065',
      issuedBy: 'ISO and IEC',
      gates:
        'Bodies certifying products, processes and services. Relevant to a laboratory group only ' +
        'where it also issues certificates, which is a different accreditation and a different audit.',
    },
  ],

  comparisonAxes: [
    {
      axis: 'Registered scope at method, analyte and matrix level',
      whatBuyersAsk:
        'Is this exact method, on this exact analyte, in this exact matrix, on your published scope, ' +
        'and under which accrediting body?',
    },
    {
      axis: 'Data package and electronic deliverable format',
      whatBuyersAsk:
        'Which deliverable formats do you produce, at which validation tier, and will the file load ' +
        'into our project database without anybody editing it by hand?',
    },
    {
      axis: 'Turnaround, with the method named and rush priced separately from standard',
      whatBuyersAsk:
        'What is standard turnaround for this method, what does rush cost, and what is the cut-off ' +
        'for a sample to make today’s batch?',
    },
    {
      axis: 'Sample logistics: kits, containers, preservation and hold time',
      whatBuyersAsk:
        'Can a kit reach the site before the sampling window opens, and does the hold time for this ' +
        'analyte survive the route back to you?',
    },
  ],

  facts: [
    {
      claim:
        'A2LA accredits to ISO/IEC 17025 and ISO/IEC 17065, runs a separate IBC Special Inspections ' +
        'accreditation programme, describes itself as the only independent non-profit internationally ' +
        'recognised accreditation body in the United States, and states it is an ILAC MRA signatory ' +
        'for 17025 and an IAF MLA signatory for 17065. Read at second hand: the A2LA page returns ' +
        'HTTP 403 to automated retrieval and the signatory status was not confirmed at ILAC or IAF.',
      source: {
        url: 'https://a2la.org',
        publisher: 'A2LA',
        accessedAt: '2026-09-29',
        confidence: 'reported',
      },
    },
    {
      claim:
        'ANAB, the ANSI National Accreditation Board, accredits to ISO/IEC 17025, ISO/IEC 17020 and ' +
        'ISO/IEC 17065 and operates the TNI environmental laboratory programs. A laboratory can ' +
        'therefore hold its testing accreditation and its environmental programme accreditation from ' +
        'the same body, which is not the same as holding one accreditation. Read at second hand.',
      source: {
        url: 'https://anab.ansi.org',
        publisher: 'ANSI National Accreditation Board',
        accessedAt: '2026-09-29',
        confidence: 'reported',
      },
    },
    {
      claim:
        'ISO/IEC 17025 is the competence standard for testing and calibration laboratories, issued ' +
        'jointly by ISO and IEC. Its current edition year is deliberately absent from this page: ' +
        'iso.org returned HTTP 403 on every research pass, so the edition could not be read at the ' +
        'publisher, and an edition year taken from a third party is a guess wearing a citation.',
      source: {
        url: 'https://www.iso.org',
        publisher: 'International Organization for Standardization',
        accessedAt: '2026-09-29',
        confidence: 'reported',
      },
    },
    {
      claim:
        'Gorilla 76 publishes an AI-search page for manufacturers with a measurement method close to ' +
        'ours: five buyer questions per buying intent, run monthly across four AI platforms, scored ' +
        'into four appearance states, with the explicit statements that any single run is noise and ' +
        'that the same question returns different answers run to run. The same firm states it ' +
        'anonymises its examples by policy, changing the industry, product and specifics of each one, ' +
        'so no named client result is published alongside the method.',
      source: {
        url: 'https://www.gorilla76.com/ai-search-aeo-geo-for-manufacturers',
        publisher: 'Gorilla 76',
        accessedAt: '2026-09-28',
        confidence: 'observed',
      },
    },
  ],

  whyTheAnswerIsLost:
    'The analyte list is published as a category rather than as a list. Ask an assistant which ' +
    'laboratory is certified for a named method on a named matrix in a named state and it needs a ' +
    'page that says that sentence back to it. What it finds on a laboratory site is a discipline ' +
    'heading, a capability grid with no accrediting body attached to any row, and a certificate ' +
    'linked as an image. The state programme list does say the sentence, in plain text, so the state ' +
    'programme list is what gets cited and the laboratory is a row inside it rather than the answer to it.',

  faqs: [
    {
      question: 'How do you measure something that does not send us sessions?',
      answer:
        'On a fixed panel. We agree a set of prompts your clients plausibly type, run them across ' +
        'ChatGPT, Perplexity, Gemini and Google AI Overviews on a schedule, and record which firms ' +
        'were named and which URLs were cited on each date. The raw answers are stored, so every row ' +
        'in the table re-derives instead of being taken on trust. In this category the win is a ' +
        'shortlist position rather than a session, and a laboratory measuring it by referral traffic ' +
        'will conclude it does not matter and be wrong.',
    },
    {
      question: 'Our scope is already public on the accreditation body’s site. Is that not enough?',
      answer:
        'It is enough for a person who already knows your name and goes looking. It is not enough for ' +
        'a retrieval system choosing between providers, because that entry is indexed as the ' +
        'accreditation body’s page rather than as yours, and it carries no turnaround, no ' +
        'deliverable format and no record of who has accepted the work. Republishing your own scope ' +
        'as text on your own domain, with the accrediting body and certificate number beside each ' +
        'capability, is the change that moves this category most. It is a publishing task before it ' +
        'is a marketing one.',
    },
    {
      question: 'Will your writers describe a method wrongly?',
      answer:
        'They would, unchecked, which is why the sign-off sits with somebody who reads scope ' +
        'documents for a living rather than with us. Every page in this vertical goes to a named ' +
        'technical reviewer on your side before it is published, and that review is in the schedule ' +
        'rather than offered as a courtesy. The alternative is finding out at month three that a ' +
        'matrix was described wrongly on forty pages, which costs more to unwind than it cost to write.',
    },
    {
      question: 'Do you run paid search as well?',
      answer:
        'Yes, and it is quoted separately from the retainer, against ad spend rather than against ' +
        'scope, because the two are priced on different bases. Paid buys the moment a sample is ' +
        'already in hand and somebody needs a provider this week. The retainer works on the moment ' +
        'before that, when a consultant is deciding which two or three names to call at all. They are ' +
        'different jobs and combining them into one number hides which one is working.',
    },
    {
      question: 'How quickly does anything move?',
      answer:
        'We will not put a number on it for your firm before the first run, because that number would ' +
        'be a forecast dressed as evidence. What is safe to say about the mechanism is that scope and ' +
        'entity publishing changes what is retrievable within a crawl cycle, and whether it changes ' +
        'what an assistant returns is exactly what the panel exists to record, on a date, against a ' +
        'prompt set that does not move between runs.',
    },
  ],

  proof: {
    kind: 'none',
    statement:
      'We have not run this work for an environmental laboratory. Our 45 published client programmes ' +
      'are HVAC contracting, dental practices and commercial insurance, and our four business-to-business ' +
      'engagements are under NDA in managed IT and cloud, cybersecurity and software. None of them is ' +
      'a laboratory. The first evidence specific to your firm is the first panel run on your own prompts.',
  },

  snapshotQuestion:
    'Which methods, analytes and matrices on your scope appear as text on your own domain, and which exist only on your accreditation body’s page?',
};
