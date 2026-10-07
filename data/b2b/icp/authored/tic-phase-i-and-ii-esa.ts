import type { IcpBody } from '../bodies';

/* LEVEL 3 · .../real-estate-and-transaction-due-diligence/phase-i-and-ii-esa-firms
 *
 * ────────────────────────────────────────────────────────────────────────────
 * THE DELTA, AND WHY IT IS WRITABLE HERE.
 *
 * The parent page is about the report being accepted by an institution. This one
 * is about the report being written to a recognised revision of a standard
 * practice, and about what happens to a portfolio when fifty of them are not.
 * Different committee, different axes, different vocabulary, and a fact set the
 * parent does not carry: the recognition of the two ASTM practices, and the date
 * that recognition took effect.
 *
 * SIX SCOPES SIT BELOW THIS NICHE AND NONE OF THEM IS PUBLISHED AS A PAGE. Each
 * is a row in the coverage grid with the one sentence that distinguishes it, and
 * an anchor a citation can point at. That is the default outcome at level 4
 * (Theo §3.4): a scope variant is a section, and only a change of buying trigger
 * earns a URL. Two entities in this wave cleared that bar and these six did not,
 * which is the screen working rather than the screen being skipped.
 * ────────────────────────────────────────────────────────────────────────────
 */

export const TIC_PHASE_I_AND_II_ESA: IcpBody = {
  kind: 'sub-niche',

  buyerQuestion: 'Every firm describes the same report. Why would an assistant pick ours?',

  metaDescription:
    'The report is defined by a standard, so what separates firms is everything around it. We test what AI assistants tell your buyers, and date every answer.',

  opener:
    'The deliverable is defined by a standard, so no firm wins this work by describing it. What ' +
    'separates providers is the revision cited, who signs, what happens when the assessment ' +
    'recommends more, and whether fifty of them will agree with each other. None of that is usually ' +
    'written down anywhere.',

  buyers: [
    {
      title: 'Environmental professional of record',
      researches:
        'Which revision of the practice a scope of work names, because their signature attaches the ' +
        'report either to a recognised standard or to nothing. They read the scope before they read ' +
        'the fee, and a scope that names a superseded revision is a scope they will send back.',
    },
    {
      title: 'Portfolio manager at a fund or REIT',
      researches:
        'Whether one provider can run fifty assessments to one standard on one calendar, and whether ' +
        'the findings return in a form that compares across assets. Consistency is worth more to them ' +
        'than depth on any single property, which is the opposite of what a single-asset buyer wants.',
    },
    {
      title: 'Seller’s counsel in a two-sided deal',
      researches:
        'What the report will say and who will see it. A finding changes price and disclosure ' +
        'obligations long before it changes anybody’s remediation plan, so this reader is ' +
        'interested in the report’s distribution as much as in its content.',
    },
    {
      title: 'Site contact at the property',
      researches:
        'What access is needed, when, and what will be visible to tenants. They cannot approve ' +
        'anything and they can delay everything, which makes them the role most often ignored and ' +
        'most often responsible for a missed closing date.',
    },
  ],

  vocabulary: [
    {
      term: 'ASTM E1527-21',
      issuedBy: 'ASTM International',
      gates:
        'The standard practice EPA recognises as compliant for a Phase I environmental site ' +
        'assessment. Citing it is what connects a report to the statutory defences, and citing a ' +
        'superseded revision does not.',
    },
    {
      term: 'ASTM E2247-23',
      issuedBy: 'ASTM International',
      gates:
        'The recognised practice for forestland or rural property. Choosing between this and E1527-21 ' +
        'is a scope decision made before fieldwork, and getting it wrong is a scope error rather than ' +
        'a quality one.',
    },
    {
      term: 'Final rule',
      issuedBy: 'US Environmental Protection Agency, published in the Federal Register',
      gates:
        'How a standard becomes recognised, and when. Recognition is an event with a date attached to ' +
        'it, so a claim that a practice is recognised should be checkable against a rule rather than ' +
        'against a brochure.',
    },
    {
      term: 'Brownfields programme',
      issuedBy: 'US Environmental Protection Agency',
      gates:
        'The programme the inquiry guidance is published under, and the grant context in which a ' +
        'large share of these assessments is commissioned. A firm active in grant-funded work is ' +
        'reading a different calendar from one working only on private transactions.',
    },
    {
      term: 'All Appropriate Inquiries',
      issuedBy: 'US Environmental Protection Agency, at 40 CFR Part 312',
      gates:
        'The rule the recognised practices sit under. It is the reason this niche has a standards ' +
        'vocabulary at all, and the reason the standards question is legal rather than editorial.',
    },
    {
      term: '40 CFR Part 312',
      issuedBy: 'US Environmental Protection Agency',
      gates:
        'The location of the rule, and the place a reader goes to confirm which practices are ' +
        'currently recognised rather than taking a provider’s word for it.',
    },
  ],

  comparisonAxes: [
    {
      axis: 'Which revision of the practice the scope of work names',
      whatBuyersAsk:
        'Is this scope written to the currently recognised revision, and will the report say so on its face?',
    },
    {
      axis: 'Consistency across a portfolio rather than quality on one asset',
      whatBuyersAsk:
        'Will fifty reports from you be comparable with each other, and how many different ' +
        'professionals will have signed them?',
    },
    {
      axis: 'The escalation path from assessment to subsurface work',
      whatBuyersAsk:
        'If further investigation is recommended, who performs it, on what timetable, and does the ' +
        'price for it already exist?',
    },
    {
      axis: 'Access and scheduling against a closing date',
      whatBuyersAsk:
        'Can the site visit happen inside the window we have, given everybody who has to be notified first?',
    },
  ],

  facts: [
    {
      claim:
        'EPA recognises ASTM E1527-21 and ASTM E2247-23 as compliant with the All Appropriate ' +
        'Inquiries rule. E1527-21 is the standard practice for a Phase I environmental site ' +
        'assessment and E2247-23 is the practice for forestland or rural property, so the choice ' +
        'between them is made at scoping and is a question about the property rather than about the ' +
        'provider.',
      source: {
        url: 'https://www.epa.gov/brownfields/brownfields-all-appropriate-inquiries',
        publisher: 'US Environmental Protection Agency, Brownfields All Appropriate Inquiries',
        accessedAt: '2026-09-29',
        confidence: 'observed',
      },
    },
    {
      claim:
        'EPA’s recognition of ASTM E1527-21 came by final rule in December 2022 and took effect ' +
        'on 13 February 2023. That sequence is reported rather than read in the rule itself. The ' +
        'practical consequence is that the revision cycle, not the existence of the standard, is the ' +
        'thing to watch: a report written to a superseded revision does not carry the recognition the ' +
        'current one does.',
      source: {
        url: 'https://www.epa.gov/brownfields/brownfields-all-appropriate-inquiries',
        publisher: 'US Environmental Protection Agency, Brownfields All Appropriate Inquiries',
        accessedAt: '2026-09-29',
        confidence: 'reported',
      },
    },
    {
      claim:
        'Bluelinks Agency published a ranked list of AI-search agencies for cleaning services on 3 ' +
        'September 2026, using eight weighted criteria. The publisher appears first and is labelled ' +
        'best overall. No dated named-client result appears for any agency on the list, and the page ' +
        'carries no sponsorship disclosure. It is the seventh page of that shape read across three ' +
        'research passes, and the publisher is first on all seven.',
      source: {
        url: 'https://www.bluelinks.agency/seo/listicles/aeo-geo-agencies-for-cleaning-services/',
        publisher: 'Bluelinks Agency',
        accessedAt: '2026-09-29',
        confidence: 'observed',
      },
    },
  ],

  whyTheAnswerIsLost:
    'Every firm in this niche describes the same deliverable in the same words, because a standard ' +
    'defines it. What actually differs between providers is the revision cited, the escalation path, ' +
    'the consistency across a portfolio and who signs, and none of those appears on a services page. ' +
    'An assistant asked to compare providers of a standardised report therefore has nothing to ' +
    'compare on, so it returns whichever names carry the most general brand weight. The comparison ' +
    'the buyer would have made never happens, and the firm that would have won it is not in the answer.',

  faqs: [
    {
      question: 'If the report is standardised, is there anything left to write about?',
      answer:
        'The report is standardised and the practice around it is not. How a scope is written, which ' +
        'revision is named, what triggers an escalation, how findings are normalised across a ' +
        'portfolio, and who carries the professional judgement are all decisions your firm makes ' +
        'differently from the firm next door. Publishing those decisions is a content programme that ' +
        'a competitor cannot copy by rewriting a services page, because copying it would mean ' +
        'changing how they work.',
    },
    {
      question: 'Would this compete with the portfolio content we already publish?',
      answer:
        'Only if it repeats it. The first pass checks what already exists against the questions ' +
        'your buyers actually ask, to find questions with several pages competing for them and ' +
        'questions with none. Where an existing page is the right ' +
        'answer we improve it rather than write a rival to it. Two pages competing for one question ' +
        'is a problem we would be creating, not solving.',
    },
    {
      question: 'How do you avoid getting a standards reference wrong?',
      answer:
        'By treating every reference as sourced rather than as known. Each one carries the publisher, ' +
        'the access date and whether the primary source was actually read, and where an edition or a ' +
        'date could not be confirmed the page names the standard and omits the number. That is the ' +
        'same discipline this page is written under, and you can check it: the recognition date in ' +
        'the facts above is labelled as reported because it was not read in the rule itself.',
    },
    {
      question: 'What do we get before we commit to anything?',
      answer:
        'A free AI visibility audit: we test your buyers’ questions on AI platforms, record each ' +
        'answer with its date, and note which firms were named and which pages were cited. There is ' +
        'no obligation. The limits are stated on the same page as the findings, because a single ' +
        'run is a reading on one day and not a trend, and anyone presenting one as a trend is selling you the ' +
        'wrong thing.',
    },
  ],

  scope: [
    {
      slug: 'phase-i-esas-for-commercial-lenders',
      distinguishes:
        'The report is ordered by the institution rather than by the buyer of the property, so the ' +
        'reliance structure and the lender’s own acceptance history decide the provider.',
    },
    {
      slug: 'sba-lender-environmental-reports',
      distinguishes:
        'A government-backed lending programme sets the screening tiers and the escalation rules, so ' +
        'the sequence of work is prescribed rather than proposed.',
    },
    {
      slug: 'phase-ii-subsurface-investigations',
      distinguishes:
        'Fieldwork rather than records review: drilling, sampling and laboratory turnaround land on ' +
        'the critical path, and the cost becomes uncertain in a way the assessment before it never was.',
    },
    {
      slug: 'vapor-intrusion-assessments',
      distinguishes:
        'The exposure pathway runs through an occupied building, so scheduling, occupant notification ' +
        'and seasonal timing govern the work more than the chemistry does.',
    },
    {
      slug: 'transaction-screens-and-desktop-reviews',
      distinguishes:
        'A deliberately lighter product bought where the transaction does not need the statutory ' +
        'defences, which makes it a commercial decision taken before any environmental question is asked.',
    },
    {
      slug: 'portfolio-due-diligence-for-reits',
      distinguishes:
        'Volume and comparability replace depth as the requirement: the buyer needs the same finding ' +
        'to mean the same thing on asset one and asset fifty.',
    },
  ],

  proof: {
    kind: 'none',
    statement:
      'Qognition has published no client programme in this niche. Our named case studies are in ' +
      'other sectors, and none of them is proof for assessment work. We would rather have this ' +
      'sentence on the page than let a reader infer a ' +
      'history from the fact that the page exists.',
  },

  snapshotQuestion:
    'Does your site name the revision your reports are written to, or does it say the standard and leave the revision out?',
};
