import type { IcpBody } from '../bodies';

/* LEVEL 2 · .../environmental-engineering-and-testing/real-estate-and-transaction-due-diligence
 *
 * ────────────────────────────────────────────────────────────────────────────
 * THE SECOND COHORT IN THIS WAVE, AND IT IS DELIBERATELY THE SHALLOWER ONE.
 *
 * Nadia §1.7.4 makes level 2 unconditional for any sub-industry with a
 * priority-A child, so this page exists on the same footing as the laboratories
 * cohort. Its evidence base is not the same size. Iris's research carries one
 * dense, primary-read cluster for this sub-industry, the All Appropriate
 * Inquiries rule and the CERCLA defences it secures, and that cluster is split
 * across this page and its one published child rather than repeated on both.
 *
 * The third fact here is about the agency category rather than about property
 * diligence, and that is a deliberate choice rather than padding: the reader of
 * this page assesses evidence for a living, and the state of published evidence
 * in the category they are about to buy from is on-argument for them in a way it
 * would not be for a plant manager.
 * ────────────────────────────────────────────────────────────────────────────
 */

export const TIC_TRANSACTION_DUE_DILIGENCE: IcpBody = {
  kind: 'sub-niche',

  buyerQuestion: 'Why does an assistant name the three largest firms and never ours?',

  metaDescription:
    'Acceptability decides this work and almost nobody publishes it. We run your buyers’ prompts across four platforms and publish who got named, with the date.',

  opener:
    'Transaction diligence is bought on whether the report will be accepted, not on whether it is ' +
    'correct. The defences it protects are statutory, they attach to the standard the report cites, ' +
    'and the last reader is a credit committee. This page sets out who reads the report and what ' +
    'each of them is checking for.',

  buyers: [
    {
      title: 'Environmental risk officer at the lender',
      researches:
        'Whether this firm’s reports have been accepted by this institution before, what its ' +
        'professional liability limits are, and whether a reliance letter will be issued to the ' +
        'parties the credit file needs. Turnaround is assumed rather than compared. Acceptability is ' +
        'the decision.',
    },
    {
      title: 'Credit committee',
      researches:
        'The report as a risk instrument rather than a technical document: liability terms, reliance ' +
        'parties, and whether the standard used is the one the statutory defence depends on. This is ' +
        'the room where a provider is dropped after the deal team already chose them.',
    },
    {
      title: 'Acquisitions analyst or closing coordinator',
      researches:
        'Whether a report can be ordered in minutes rather than quoted in a day, and whether the due ' +
        'date on the order is the date it actually arrives. A quote request that takes a day loses to ' +
        'a competitor’s order form, and nothing about the analysis changes that.',
    },
    {
      title: 'Borrower’s counsel',
      researches:
        'Which standard the report was written to and whether that version is the recognised one, ' +
        'because the statutory defences attach to a standard and a date rather than to a ' +
        'consultant’s judgement. They read the first two pages and the signature block.',
    },
  ],

  vocabulary: [
    {
      term: 'All Appropriate Inquiries',
      issuedBy: 'US Environmental Protection Agency, at 40 CFR Part 312',
      gates:
        'Whether a purchaser’s pre-acquisition investigation qualifies it for the statutory ' +
        'defences. It is a rule rather than a standard, and it works by recognising standards written ' +
        'by others.',
    },
    {
      term: '40 CFR Part 312',
      issuedBy: 'US Environmental Protection Agency',
      gates:
        'Where the rule lives in the Code of Federal Regulations, and where the standards recognised ' +
        'as compliant are listed. A page citing the rule without the part number is harder to check ' +
        'and gets checked less.',
    },
    {
      term: 'CERCLA',
      issuedBy: 'Administered by the US Environmental Protection Agency',
      gates:
        'The liability regime this entire product exists to manage. The defences below are statutory ' +
        'and attach to conduct before purchase, which is why the timing of an inquiry matters as much ' +
        'as its content.',
    },
    {
      term: 'Innocent landowner defence',
      issuedBy: 'US Environmental Protection Agency, under CERCLA',
      gates:
        'One of the three defences All Appropriate Inquiries compliance secures. Named by EPA ' +
        'alongside the other two rather than as a standalone concept.',
    },
    {
      term: 'Bona fide prospective purchaser defence',
      issuedBy: 'US Environmental Protection Agency, under CERCLA',
      gates:
        'The defence most commercial transactions are actually relying on. Because it is secured by ' +
        'inquiry compliance, the standard a report cites is a legal question before it is a technical ' +
        'preference.',
    },
    {
      term: 'Contiguous property owner defence',
      issuedBy: 'US Environmental Protection Agency, under CERCLA',
      gates:
        'The third of the three, engaged where contamination originates next door. It is the reason a ' +
        'report’s boundary description is read closely by counsel and skimmed by everybody else.',
    },
    {
      term: '70 FR 66070',
      issuedBy: 'US Environmental Protection Agency, in the Federal Register',
      gates:
        'The citation for the All Appropriate Inquiries final rule as published. It is what a counsel ' +
        'reaches for when a report’s basis is challenged, and it is a useful thing to have on ' +
        'your own page rather than only in a footnote of theirs.',
    },
  ],

  comparisonAxes: [
    {
      axis: 'Acceptability to the specific institution that will read the report',
      whatBuyersAsk:
        'Have your reports been accepted by this lender before, and can you name the programme they ' +
        'were accepted under?',
    },
    {
      axis: 'Reliance parties and professional liability limits',
      whatBuyersAsk:
        'Who is permitted to rely on this report, for how long, and what are your limits?',
    },
    {
      axis: 'The standard the report is written to, and whether that version is current',
      whatBuyersAsk:
        'Which standard is this written to, and is that the version currently recognised by the rule?',
    },
    {
      axis: 'Ordering as a transaction rather than as a quotation',
      whatBuyersAsk:
        'Can we place an order with an address and a due date, without waiting for a proposal first?',
    },
  ],

  facts: [
    {
      claim:
        'The All Appropriate Inquiries final rule was published on 1 November 2005 at 70 FR 66070 and ' +
        'took effect on 1 November 2006. It sits at 40 CFR Part 312, and it is the instrument that ' +
        'decides which standards a pre-acquisition investigation may be written to.',
      source: {
        url: 'https://www.epa.gov/brownfields/brownfields-all-appropriate-inquiries',
        publisher: 'US Environmental Protection Agency, Brownfields All Appropriate Inquiries',
        accessedAt: '2026-09-29',
        confidence: 'observed',
      },
    },
    {
      claim:
        'Compliance with All Appropriate Inquiries is what secures the CERCLA innocent landowner, ' +
        'contiguous property owner and bona fide prospective purchaser defences. The defences attach ' +
        'to the inquiry rather than to the transaction, which is why the standard a report cites is ' +
        'read by counsel and not only by an environmental reviewer.',
      source: {
        url: 'https://www.epa.gov/brownfields/brownfields-all-appropriate-inquiries',
        publisher: 'US Environmental Protection Agency, Brownfields All Appropriate Inquiries',
        accessedAt: '2026-09-29',
        confidence: 'observed',
      },
    },
    {
      claim:
        'The ABM Agency published a ranked list of AI-search agencies for aerospace and defence on 25 ' +
        'March 2026, placing itself first and attaching return-on-investment and conversion claims to ' +
        'no client, no method and no date. The figures themselves are not reproduced here: they sit ' +
        'on an internal blocklist precisely because a page that ranks itself first and quotes hard ' +
        'numbers with no basis is worse than one that does either alone.',
      source: {
        url: 'https://abmagency.com/2026-top-5-aeo-and-geo-agencies-for-aerospace-and-defense-companies/',
        publisher: 'The ABM Agency',
        accessedAt: '2026-09-29',
        confidence: 'observed',
      },
    },
  ],

  whyTheAnswerIsLost:
    'Acceptability is the product and nobody publishes it. The report is a commodity in form and a ' +
    'risk instrument in function, so what a buyer needs is whether this firm’s work has been ' +
    'accepted by this institution, in this jurisdiction, before now. Only the provider can write that ' +
    'sentence and almost none of them does. An assistant asked for a national provider whose reports ' +
    'lenders accept therefore has nothing to separate one firm from another, so it falls back on the ' +
    'largest names and on directories, and a firm with a better acceptance record than any of them is ' +
    'invisible because the record was never written down.',

  faqs: [
    {
      question: 'We cannot name the lenders who accept our reports. Does that end the argument?',
      answer:
        'No, it changes the unit. Institution names are usually confidential and the acceptance ' +
        'pattern is not: programme types, jurisdictions, report counts by year, the standards cited, ' +
        'the reliance structures offered. That is a publishable, checkable description of an ' +
        'acceptance record without naming a single client, and it is far more than anybody in this ' +
        'market currently publishes. If even that is restricted, we would rather say so on the page ' +
        'than write around it.',
    },
    {
      question: 'Is this not just a faster ordering form?',
      answer:
        'The ordering form is a real and separate problem, and it is a conversion problem rather than ' +
        'a visibility one. What this work addresses is earlier: whether your firm is among the names ' +
        'in front of the analyst before an order is placed anywhere. Both matter and they are not the ' +
        'same project. If the ordering path is the weaker of the two we will say so after the first ' +
        'run rather than sell the one we were hired for.',
    },
    {
      question: 'Our competitors publish large numbers. Why do you not?',
      answer:
        'Because the numbers in this category almost never carry a client, a method or a date, and a ' +
        'reader who works in diligence recognises that immediately. We publish 45 named client ' +
        'programmes across three sectors, and we say plainly that the targets in them are targets ' +
        'rather than reported results, because no reporting export has closed that gap yet. A buyer ' +
        'whose profession is reading unsupported claims is the last audience to try it on.',
    },
    {
      question: 'What does the first month look like?',
      answer:
        'A prompt panel agreed with you and run across four platforms, an entity audit covering every ' +
        'place your firm is described online, and a pass over the pages that describe what a report ' +
        'is written to and who may rely on it. The output is a dated record of what the assistants ' +
        'returned and a list of changes ordered by what they would move. No forecast, because we ' +
        'would be forecasting a system we do not control.',
    },
  ],

  proof: {
    kind: 'none',
    statement:
      'We have not run a programme for a diligence provider. Our 45 published client programmes are ' +
      'HVAC contracting, dental practices and commercial insurance, and the four business-to-business ' +
      'engagements behind those are under NDA in managed IT and cloud, cybersecurity and software. ' +
      'This page is an argument and a method, and it is not a track record in this sub-industry.',
  },

  snapshotQuestion:
    'Can a lender reading your site tell which standard your reports are written to and who is permitted to rely on them?',
};
