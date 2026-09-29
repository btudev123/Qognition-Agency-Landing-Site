import type { IcpBody } from '../bodies';

/* LEVEL 1 · /industries/environmental-engineering-and-testing
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHY THIS INDUSTRY WENT FIRST.
 *
 * Iris measured it on 2026-09-29 (docs/research/b2b-vertical-substance-pass-3.md
 * §5): the densest certification vocabulary in the locked taxonomy, and the one
 * vertical where a targeted search for AI-search positioning returned no
 * specialist and no listicle. Both halves matter. Dense vocabulary is what makes
 * a page constructible from sourced fact rather than from adjectives; an empty
 * competitive field is what makes it worth constructing first.
 *
 * WHAT THIS PAGE DOES NOT DO. It carries no vocabulary block and no comparison
 * axes, by type. This industry spans a PFAS laboratory, a pile-load-testing
 * crew, a notified body and a forensic engineer. A standards list written to
 * hold all four would be written to none of them, so those live one level down
 * where they are true (Theo §3.1).
 *
 * EVERY FACT BELOW COMES FROM IRIS, WITH HER LABEL KEPT. `observed` means
 * somebody read the primary source; `reported` means a secondary restated it and
 * the primary could not be reached. Several standards bodies return HTTP 403 to
 * automated retrieval, so `reported` is a real and common state in this vertical
 * and collapsing it into `observed` would be a claims defect. Where she wrote
 * `[NEEDS DATA: edition year]` this file names the standard and omits the year.
 * ────────────────────────────────────────────────────────────────────────────
 */

export const TIC_HUB: IcpBody = {
  kind: 'hub',

  /* Family Q. The question OUR buyer asks: a commercial or marketing lead at a
     laboratory, an inspection body or a certification body. Never the client's
     buyer's supplier-discovery prompt, which this page can never answer. */
  buyerQuestion: 'Why do assistants name the accreditation registry instead of our firm?',

  metaDescription:
    'Buyers here filter on scope of accreditation before price. We run your buyers’ prompts across four platforms and publish who got named, and on what date.',

  opener:
    'Testing, inspection and certification firms lose the AI answer at qualification, not at quote. ' +
    'The buyer filters on scope of accreditation before price is discussed, and almost no firm ' +
    'publishes that scope in a form a machine can read. This page sets out who those buyers are ' +
    'and what they filter on.',

  buyers: [
    {
      title: 'Environmental or EHS manager at the plant, site or facility',
      researches:
        'Whether a provider is accredited for the exact method, analyte and matrix the permit names, ' +
        'and whether the deliverable has been accepted by the agency holding the file. They arrive ' +
        'with a regulatory driver and a date, and they leave when a page lists services instead of scopes.',
    },
    {
      title: 'Quality or metrology manager',
      researches:
        'The published scope document itself, because their own next audit reads it. A certificate ' +
        'number with no registered scope behind it is treated as unverified, and a capability quoted ' +
        'outside the registered scope is worse than no capability at all.',
    },
    {
      title: 'The reviewer who has to accept the deliverable',
      researches:
        'Whether this provider’s reports have been accepted before, by whom and in which ' +
        'jurisdiction. A state agency protocol reviewer, a building official, a lender’s ' +
        'environmental risk officer and a notified body are four different versions of this role, ' +
        'they rarely hold the budget, and each of them can end a selection after it was made.',
    },
    {
      title: 'Business development or marketing lead at the provider',
      researches:
        'Whether any of the three roles above can find the firm at all, and what an assistant returns ' +
        'when they ask. This is the person who buys from us, and the only one on this list who is our ' +
        'customer rather than our client’s.',
    },
  ],

  facts: [
    {
      claim:
        'First Page Sage’s "The Top Industrial GEO/AEO Agencies of 2026", updated 11 September ' +
        '2026, reviews 54 agencies against five weighted benchmarks and names manufacturing, ' +
        'construction and AEC, automation and technical services, engineering firms and robotics as ' +
        'the sub-sectors it covers. Environmental consulting and testing laboratories appear nowhere ' +
        'on it, and the publisher ranks itself first.',
      source: {
        url: 'https://firstpagesage.com/seo-blog/the-top-industrial-geo-aeo-agencies/',
        publisher: 'First Page Sage',
        accessedAt: '2026-09-29',
        confidence: 'observed',
      },
    },
    {
      claim:
        'Regulation (EU) 2023/1230 on machinery was adopted on 14 June 2023 and repeals Directive ' +
        '2006/42/EC. It applies from 20 January 2027, and the notified body requirements have applied ' +
        'since 20 January 2024. The characterisation that there is no overlap period at the cut-over ' +
        'is reported rather than read in the instrument itself.',
      source: {
        url: 'https://osha.europa.eu/en/legislation/directive/regulation-20231230eu-machinery',
        publisher: 'EU-OSHA legislation register',
        accessedAt: '2026-09-29',
        confidence: 'observed',
      },
    },
    {
      claim:
        'The International Accreditation Service, a subsidiary of the International Code Council, ' +
        'publishes AC291 as the accreditation criteria for special inspection agencies, built on IBC ' +
        'Chapter 17 and applicable parts of ISO/IEC 17020, and AC89 as the criteria for testing ' +
        'laboratories. The pair is routinely quoted the wrong way round, including by firms that hold one.',
      source: {
        url: 'https://www.iasonline.org',
        publisher: 'International Accreditation Service',
        accessedAt: '2026-09-29',
        confidence: 'reported',
      },
    },
    {
      claim:
        'ISO 9001:2026 was published on 16 September 2026 and supersedes ISO 9001:2015. A laboratory ' +
        'or certification body holding ISO 9001 alongside an accreditation standard therefore has two ' +
        'transitions to plan rather than one. Read at second hand: iso.org returns HTTP 403 to ' +
        'automated retrieval, so the publication was not confirmed at the publisher.',
      source: {
        url: 'https://www.iso.org/news/2026/09/ISO9001-2026',
        publisher: 'International Organization for Standardization',
        accessedAt: '2026-09-29',
        confidence: 'reported',
      },
    },
  ],

  whyTheAnswerIsLost:
    'The qualification document is a scanned certificate. Across this vertical the selection turns on ' +
    'scope of accreditation, and the scope sits in a PDF the firm links as an image, or behind a ' +
    'contact form, or nowhere at all. An assistant asked which provider is accredited for a named ' +
    'method in a named state has no provider-published text to retrieve, so it answers with the ' +
    'accreditation body’s own directory, a state agency list, or whichever aggregator republished ' +
    'the registry as HTML. The firm is inside all three of those. The firm is not the thing that gets named.',

  faqs: [
    {
      question: 'Have you run this work for a laboratory or an inspection body?',
      answer:
        'No. Our named record is 45 client programmes in HVAC contracting, dental practices and ' +
        'commercial insurance, and our four business-to-business engagements are white label under ' +
        'signed NDAs in managed IT and cloud, cybersecurity and software. None of them is a ' +
        'laboratory, an inspection body or a certification body. A page existing for a vertical is ' +
        'not evidence of experience in it, so we say that here rather than let the page imply ' +
        'otherwise. What carries across is the method: the prompt panel, the citation analysis and ' +
        'the entity work do not change with the vertical, and every standard named on these pages ' +
        'carries its publisher and the date we read it so you can check the work before you check us.',
    },
    {
      question: 'Can you guarantee an assistant will name us?',
      answer:
        'No, and nobody can. These are third-party systems we do not control, their answers move ' +
        'between runs, and a firm promising placement inside one is either misunderstanding the ' +
        'mechanism or misrepresenting it. What we commit to is the measurement: a dated, reproducible ' +
        'record of what each platform returned on each run, stored so that every row can be ' +
        're-derived rather than taken on trust, and the work that makes a firm easier to retrieve ' +
        'and easier to cite.',
    },
    {
      question: 'What is the first thing you would change on our site?',
      answer:
        'Almost never the volume of content. The first pass is making the qualification record ' +
        'machine readable: the scope of accreditation as text rather than a scanned certificate, ' +
        'methods and matrices named individually rather than folded into a service category, the ' +
        'accrediting body and the certificate number in the same block as the capability they cover, ' +
        'and one company name, one description and one address everywhere the firm appears. Most ' +
        'firms in this vertical already hold the facts. They hold them in a document nothing can read.',
    },
    {
      question: 'Which search surfaces does a retainer cover?',
      answer:
        'Four, and they are not sold apart. Google results, the local pack, Google AI Overviews and ' +
        'the assistants are different surfaces with different retrieval, and the work that earns a ' +
        'citation in one is largely the work that earns a position in another, done against a ' +
        'different model. Paid search sits alongside them and is priced separately, against ad spend ' +
        'rather than against scope, so it is quoted on its own line rather than folded into the retainer.',
    },
    {
      question: 'What does this cost?',
      answer:
        'Retainers run from three thousand to twenty thousand US dollars a month and are priced by ' +
        'scope: how many prompts are tracked, how many locations and branches are covered, how much ' +
        'is produced each month. The variable that moves the number most in this vertical is how many ' +
        'accredited scopes, methods and matrices have to be published as text and then kept current ' +
        'as the registry changes.',
    },
  ],

  proof: {
    kind: 'none',
    statement:
      'No Qognition client has been published in testing, inspection or certification. Our named ' +
      'library is 45 programmes in HVAC contracting, dental practices and commercial insurance, and ' +
      'none of those is proof for a laboratory or an inspection body. We would rather write that ' +
      'sentence than let a page in this vertical stand in for a history it does not have.',
  },

  snapshotQuestion:
    'How many of your accredited scopes and methods sit on a page an assistant can read, rather than inside a certificate PDF?',
};
