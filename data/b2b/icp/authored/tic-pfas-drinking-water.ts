import type { IcpBody } from '../bodies';

/* LEVEL 4 · .../pfas-and-emerging-contaminant-labs/drinking-water-pfas-methods
 *
 * ────────────────────────────────────────────────────────────────────────────
 * A LEVEL-4 ENTITY IS `{id, slug, name}`. THIS PAGE EARNS THE URL ON THE TRIGGER.
 *
 * Theo §3.4 allows a sub-niche a page only where the buying TRIGGER changes, not
 * where the scope narrows. It changes here, and the change is statutory. The
 * sibling scopes under this niche are bought when a permit condition or a
 * project requires a number. This one is bought against a compliance date under
 * the Safe Drinking Water Act, by a public water system, with a federal proposal
 * open that would change what has to be met. Different statute, different buyer,
 * different clock, different evidence.
 *
 * NADIA'S LEVEL-4 SCREEN, HONESTLY SCORED (§1.7.2.2):
 *
 *   L4-2 discriminating standards   PASS. Four of the six terms below appear on
 *                                   neither the parent nor the sibling page.
 *   L4-3 discriminating specifier   PASS. The utility finance director and the
 *                                   treatment-side consulting engineer are on no
 *                                   page above this one.
 *   L4-5 prose not the parent's     PASS by construction: every fact, axis and
 *                                   FAQ here is about one statute the parent
 *                                   deliberately does not resolve.
 *   L4-1, L4-4, L4-6                NOT SCORED. All three are measurements, and
 *                                   they need a panel run and an external
 *                                   prompt-capture source that do not exist yet.
 *                                   Nadia's §1.7.2.1 names L4-6 as the binding
 *                                   gate and says it is 0% until that source
 *                                   lands. This page is published on the three
 *                                   that can be judged today, and the three that
 *                                   cannot are named here rather than assumed.
 * ────────────────────────────────────────────────────────────────────────────
 */

export const TIC_PFAS_DRINKING_WATER: IcpBody = {
  kind: 'sub-niche',

  buyerQuestion: 'Why is our name absent when a water system asks who can carry its monitoring to the deadline?',

  metaDescription:
    'This work is bought against a compliance date under an open federal proposal. We test what AI assistants tell your buyers, and date every answer.',

  opener:
    'Drinking-water PFAS work is bought against a date. A public water system is planning to a ' +
    'compliance deadline under a rule the regulator has proposed to change, and the laboratory it ' +
    'picks has to be certified by the agency that reads the reports. This page sets out that ' +
    'calendar and who is watching it.',

  buyers: [
    {
      title: 'Operator of record at a public water system',
      researches:
        'Whether a laboratory holds its certification with the agency that receives their monitoring ' +
        'reports, and whether a queried result can be re-run inside the reporting window. Their name ' +
        'is on the submission, so an unrecognised certification is not a discount, it is a failure.',
    },
    {
      title: 'Utility finance director or rate analyst',
      researches:
        'What the compliance date means for a capital plan, and what changes if the date moves. This ' +
        'reader is not buying analysis at all. They are pricing a treatment decision against a ' +
        'deadline, and a laboratory page that states the dates plainly is doing part of their job for them.',
    },
    {
      title: 'State drinking-water programme reviewer',
      researches:
        'Whether the certification covers the compounds on the report, and whether the data package ' +
        'arrives in the format the programme accepts. They do not select the laboratory and they ' +
        'decide whether its work counts.',
    },
    {
      title: 'Consulting engineer on the treatment side',
      researches:
        'Which compounds are being reported and at what limits, because a treatment selection follows ' +
        'the analyte list rather than the other way round. They will often name the laboratory in the ' +
        'design, which makes them a referral channel the laboratory never speaks to.',
    },
  ],

  vocabulary: [
    {
      term: 'Proposed PFAS Rescission Rule',
      issuedBy: 'US Environmental Protection Agency',
      gates:
        'Whether four PFAS entries stay regulated under the Safe Drinking Water Act. Proposed on 18 ' +
        'May 2026 and not finalised, which means it gates planning rather than compliance today.',
    },
    {
      term: 'Proposed PFOA and PFOS Compliance Extension Rule',
      issuedBy: 'US Environmental Protection Agency',
      gates:
        'How long a public water system has to reach compliance for PFOA and PFOS. Proposed on the ' +
        'same day as the rescission and also not finalised.',
    },
    {
      term: 'Regulatory determination',
      issuedBy: 'US Environmental Protection Agency, under the Safe Drinking Water Act',
      gates:
        'Whether a contaminant is regulated at all. Removing a determination is a different act from ' +
        'changing a limit, and the proposal on the table does the first rather than the second.',
    },
    {
      term: 'Hazard Index',
      issuedBy: 'US Environmental Protection Agency',
      gates:
        'How a mixture of PFAS is evaluated together rather than compound by compound. Named in the ' +
        'May 2026 proposal alongside PFHxS, PFNA, HFPO-DA and PFBS.',
    },
    {
      term: 'Maximum contaminant level',
      issuedBy: 'US Environmental Protection Agency, under the Safe Drinking Water Act',
      gates:
        'The concentration at which a system is out of compliance, and the thing a compliance date ' +
        'is a date for.',
    },
    {
      term: 'Safe Drinking Water Act',
      issuedBy: 'Administered by the US Environmental Protection Agency',
      gates:
        'The statute every date on this page sits under. A laboratory certification granted under a ' +
        'discharge programme is not a certification under this one.',
    },
  ],

  comparisonAxes: [
    {
      axis: 'Certification held with the agency that reads the reports',
      whatBuyersAsk:
        'Are you certified by the programme that receives our monitoring submissions, for these ' +
        'compounds, this year?',
    },
    {
      axis: 'Capacity for a whole monitoring schedule rather than a batch',
      whatBuyersAsk:
        'Can you hold the entire sampling calendar, including the quarters where we expect to detect nothing?',
    },
    {
      axis: 'Turnaround measured against the reporting deadline',
      whatBuyersAsk:
        'Does the result land early enough that a queried sample can be re-run before the submission is due?',
    },
    {
      axis: 'Position on results taken under a determination that may be withdrawn',
      whatBuyersAsk:
        'If a determination is rescinded, what happens to the results we have already filed and to ' +
        'the format of the next report?',
    },
  ],

  facts: [
    {
      claim:
        'EPA held a virtual public hearing on the proposed PFAS Rescission Rule on 7 July 2026 and ' +
        'the comment period closed on 20 July 2026. As of 29 September 2026 no final action had been ' +
        'observed. The final rule as it currently stands requires maximum contaminant level ' +
        'compliance by April 2029, so the deadline in force is unchanged while the proposal is open.',
      source: {
        url: 'https://www.epa.gov/sdwa/proposed-pfas-rescission-rule',
        publisher: 'US Environmental Protection Agency, Safe Drinking Water Act programme',
        accessedAt: '2026-09-29',
        confidence: 'observed',
      },
    },
    {
      claim:
        'A companion proposal published on the same day, 18 May 2026, would extend the compliance ' +
        'timeline for PFOA and PFOS. The extension is restated by a secondary source as running to ' +
        '2031. That year was not read in the proposal itself, so it is carried here with that label ' +
        'attached and is not a date to plan against.',
      source: {
        url: 'https://www.epa.gov/sdwa/proposed-pfas-rescission-rule',
        publisher: 'US Environmental Protection Agency, Safe Drinking Water Act programme',
        accessedAt: '2026-09-29',
        confidence: 'reported',
      },
    },
    {
      claim:
        'First Page Sage’s "The Top Aerospace GEO Agencies of 2026", updated 4 September 2026, ' +
        'states that 38 agencies were reviewed over five months ending August 2026 and eight ' +
        'selected, with the publisher ranked first. The only client-shaped evidence on the page is ' +
        'qualitative: a measurable jump in enquiries, with no number, no client name and no date ' +
        'attached to it.',
      source: {
        url: 'https://firstpagesage.com/seo-blog/top-aerospace-geo-agencies',
        publisher: 'First Page Sage',
        accessedAt: '2026-09-29',
        confidence: 'observed',
      },
    },
  ],

  whyTheAnswerIsLost:
    'The question has a date in it and the laboratory page does not. A system planning to a ' +
    'compliance deadline is asking about a calendar, a certification and a rule that may move, and ' +
    'the site it lands on answers with a list of compounds. The pages that do carry the dates belong ' +
    'to the regulator and to trade press, so those are what an assistant cites, and the laboratory ' +
    'is absent from an answer about work it performs every week for the people asking.',

  faqs: [
    {
      question: 'What would you publish that we have not already?',
      answer:
        'A dated page that separates three things most sites run together: the limits and deadlines ' +
        'in force today, the proposals that are open and unresolved, and the certifications you hold ' +
        'with each agency that reads a report. Each one sourced, each one carrying the date it was ' +
        'checked, and each one written so a reader can re-check it without calling you. That page is ' +
        'the answer to the question being asked.',
    },
    {
      question: 'Is it not risky to publish a page about a rule that might be withdrawn?',
      answer:
        'It is riskier to publish one that implies the rule is settled. Everything on a page like ' +
        'this carries the date it was checked and the status of the thing it describes, so a reader ' +
        'can see the page is current or see that it is not. The failure mode to avoid is the one that ' +
        'is common in this category: a confident paragraph with no date, written once, still live two ' +
        'rule changes later.',
    },
    {
      question: 'Our clients are utilities. Do they really use assistants?',
      answer:
        'We do not know for your accounts and will not claim we do. What we can say is that the ' +
        'question has the shape assistants are used for: it is research-led, it spans a statute and a ' +
        'calendar, and answering it properly means reading several sources. Our free AI visibility ' +
        'audit exists to test that with evidence rather than assume it.',
    },
    {
      question: 'How is this page different from the one above it?',
      answer:
        'The page above covers work under two statutes and deliberately does not resolve which one ' +
        'applies. This one is only the drinking-water programme: a different buyer, a different ' +
        'certification, a different clock and its own set of dated facts. If those had turned out to ' +
        'be the same, this would be a section on the page above rather than a page, which is how the ' +
        'rest of the scopes under that niche are handled.',
    },
  ],

  proof: {
    kind: 'none',
    statement:
      'We have not done this work for a laboratory serving public water systems. Our published ' +
      'client results are named and dated, and none of them comes from a laboratory. The page ' +
      'exists because the argument is checkable, not because the history is.',
  },

  snapshotQuestion:
    'Does any page on your site state the compliance date in force, the proposals that are open, and the agencies you are certified with, all on the same screen?',
};
