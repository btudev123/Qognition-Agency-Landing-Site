import type { HubBody } from '../../types';

/* Type A body — /industries/manufacturing-industrial.
 *
 * FILE NAMING. ADR-0007 §4.1 puts one file per authored entity at
 * `bodies/<meta>/<slug>.ts`. A hub's slug IS its meta id, which would give
 * `bodies/manufacturing-industrial/manufacturing-industrial.ts`. `hub.ts` is
 * used instead. `hub` is not a valid sub-niche id anywhere in the locked
 * taxonomy, so the two namespaces cannot collide, and scripts/check-b2b.cjs
 * asserts that.
 *
 * EVERY FACT BELOW IS SOURCED FROM docs/research/b2b-vertical-substance.md §3,
 * which carries the URL, the publisher, the access date and the observed-versus-
 * reported distinction for each one. Nothing here was recalled and nothing was
 * rounded. Where that document says `[NEEDS DATA: ...]` — reshoring volume,
 * sales-cycle length, deal size, verbatim buyer quotes — this file is silent
 * rather than approximate. CLAUDE.md §4.
 */

export const MANUFACTURING_INDUSTRIAL_HUB: HubBody = {
  kind: 'hub',

  /* Family Q. The question OUR buyer asks — a marketing or commercial leader at
     the manufacturer. Not the engineer's supplier-discovery prompt, which is
     Family B and which this page can never be the cited answer to. */
  buyerQuestion: 'Why do assistants name directories instead of my machine shop?',

  /* 149 characters. Leads with the mechanism, not the service name, because
     the reader scanning a SERP already knows what an agency is. */
  metaDescription:
    'Assistants name directories, not manufacturers. We run your buyers\u2019 prompts on four platforms and publish who got named, with the date.',

  opener:
    'Manufacturing and industrial firms lose the AI answer at specification, not at quote. ' +
    'A design engineer builds a shortlist from an assistant, then sends the RFQ to the names it ' +
    'gave. This page sets out who those buyers are, what they filter on, and what we observed ' +
    'when we ran their prompts.',

  buyers: [
    {
      title: 'Design or mechanical engineer',
      researches:
        'Tolerance capability stated as an achievable range, material designations by grade rather ' +
        'than family, machine envelope and axis count. They arrive with a drawing and leave when a ' +
        'site cannot tell them whether the part is makeable.',
    },
    {
      title: 'Commodity manager or strategic sourcing lead',
      researches:
        'Scope certificates and their exact coverage, audit history, second-source capacity and ' +
        'lead time. They are qualifying a supplier, not buying a part, and the question behind ' +
        'every click is whether this firm survives an approved-vendor-list review.',
    },
    {
      title: 'Supplier quality engineer',
      researches:
        'First article inspection evidence, CMM reports, certificates of conformance, and ' +
        'traceability back to heat lot. This role can veto a supplier the engineer already wants.',
    },
    {
      title: 'Marketing or commercial leader at the manufacturer',
      researches:
        'Whether any of the above can find the firm at all. This is the person who buys from us, ' +
        'and the only one on this list who is our customer.',
    },
  ],

  facts: [
    {
      claim:
        'Technical buyers complete 62% of the buying journey before contacting a vendor. For ' +
        'engineers aged 35 and under it is approximately 66%. The publisher does not state the sample size.',
      source: {
        url: 'https://www.trewmarketing.com/state-of-marketing-to-engineers-research-report',
        publisher: 'GlobalSpec, TREW Marketing and Elektor International Media, 2026 State of Marketing to Engineers',
        accessedAt: '2026-09-28',
        confidence: 'observed',
      },
    },
    {
      claim:
        '69% of technical buyers use generative AI during purchasing decisions and 75% notice ' +
        'AI-generated search summaries. The same report records those buyers rating AI ' +
        'trustworthiness at 4.7 out of 10, and 69% continuing on to the actual search results ' +
        'after reading a summary. The publisher does not state the sample size.',
      source: {
        url: 'https://www.trewmarketing.com/state-of-marketing-to-engineers-research-report',
        publisher: 'GlobalSpec, TREW Marketing and Elektor International Media, 2026 State of Marketing to Engineers',
        accessedAt: '2026-09-28',
        confidence: 'observed',
      },
    },
    {
      claim:
        'EETech surveyed 750 engineers and found 84% are decision-makers or strong influencers, ' +
        'while identifying a distinct procurement handoff problem: engineers champion a product and ' +
        'the approved-vendor-list process then blocks it. Engineers under those constraints can ' +
        'often introduce a new vendor if given proper justification materials.',
      source: {
        url: 'https://www.eetech.com/buyer-journey-study-2026',
        publisher: 'EETech Buyer Journey Study 2026',
        accessedAt: '2026-09-28',
        confidence: 'observed',
      },
    },
    {
      claim:
        'The 48 CFR CMMC acquisition rule took effect on 10 November 2025, and the Department of ' +
        'Defense published the final DFARS rule integrating CMMC 2.0 into contracts on 10 September ' +
        '2025 under clause DFARS 252.204-7021. Contractors handling federal contract information ' +
        'and controlled unclassified information must hold the required level as a condition of award.',
      source: {
        url: 'https://www.federalregister.gov/documents/2025/09/10/2025-17359/defense-federal-acquisition-regulation-supplement-assessing-contractor-implementation-of',
        publisher: 'Federal Register 2025-17359',
        accessedAt: '2026-09-28',
        confidence: 'observed',
      },
    },
    {
      claim:
        'ISO 9001:2026 was published on 16 September 2026 and supersedes ISO 9001:2015. Every ' +
        'certified manufacturer has a transition to plan.',
      source: {
        url: 'https://www.iso.org/news/2026/09/ISO9001-2026',
        publisher: 'International Organization for Standardization',
        accessedAt: '2026-09-28',
        confidence: 'reported',
      },
    },
  ],

  whyTheAnswerIsLost:
    'Directories and marketplaces occupy the cited slots. Ask an assistant for a supplier with a ' +
    'capability and a certification and it answers with the aggregators that publish structured, ' +
    'filterable supplier data, because that is the shape of content the question needs and almost ' +
    'no manufacturer publishes it. Most industrial sites publish capability: what machines are on ' +
    'the floor. Almost none publish qualification: what auditing this firm actually involves, which ' +
    'certificate covers which scope, what the real minimum order is. The second is what the buyer ' +
    'filters on, and its absence is why the directory gets named instead.',

  faqs: [
    {
      question: 'Will this bring traffic from ChatGPT?',
      answer:
        'Probably not much, and we will not sell it that way. Semrush analysed over a billion lines ' +
        'of US clickstream data from a 200 million user panel covering October 2024 to February ' +
        '2026, published on 7 April 2026, and found over 30% of all ChatGPT referral traffic goes ' +
        'to ten domains, with online services, software, media and education receiving the most. ' +
        'Industrial ' +
        'domains are not in that shape of distribution. In manufacturing, AI search is a ' +
        'shortlist-formation channel, not a traffic channel. What matters is whether your name ' +
        'appears in the two or three suggestions the assistant offers, because that decides which ' +
        'sites the engineer then visits through Google. A manufacturer measuring this by AI referral ' +
        'sessions will conclude it does not matter, and will be wrong.',
    },
    {
      question: 'How do you measure something that does not send traffic?',
      answer:
        'On a fixed prompt panel. We agree a set of prompts your buyers plausibly type, run them ' +
        'across ChatGPT, Perplexity, Gemini and Google AI Overviews on a schedule, and record which ' +
        'firms were named and which URLs were cited on each date. The raw answers are stored, so ' +
        'every row re-derives rather than being taken on trust. That is the observation block on ' +
        'this page and on every sub-niche page under it.',
    },
    {
      question: 'Have you worked with manufacturers before?',
      answer:
        'Not in a published engagement. Our delivered work is in managed IT and cloud, ' +
        'cybersecurity, and B2B SaaS in part, all white-label under NDA, which is why no client is ' +
        'named anywhere on this site. We are telling you that rather than implying a history, ' +
        'because the alternative is a claim we cannot evidence. What is transferable is the method: ' +
        'the prompt panel, the citation analysis and the entity work do not change with the vertical, ' +
        'and the standards vocabulary on these pages is sourced and dated so you can check it.',
    },
    {
      question: 'Is this SEO or is it something else?',
      answer:
        'Both, and they are not sold apart. Search, local search, AI Overviews and the assistants ' +
        'are four different surfaces, and the work that earns a citation in an assistant is largely ' +
        'the work that earns a position in Google, done against a different retrieval model. Every ' +
        'retainer covers all four. Paid media sits alongside them and is priced separately, because ' +
        'it is priced against ad spend rather than against scope.',
    },
    {
      question: 'What would you actually change on our site?',
      answer:
        'The first pass is almost never content volume. It is making the qualification facts ' +
        'machine-readable: certificate scope as text rather than a scanned PDF, tolerance and ' +
        'material capability as stated ranges and grades rather than adjectives, quantity bands ' +
        'named, and the entity (one company name, one description, one address) consistent ' +
        'everywhere it appears. Most industrial sites have the facts. They have them in a brochure ' +
        'download that nothing can read.',
    },
    {
      question: 'Can you guarantee we get named?',
      answer:
        'No, and nobody can. These are third-party systems we do not control, their answers change ' +
        'between runs, and a firm promising you placement in one is either misunderstanding the ' +
        'mechanism or misrepresenting it. What we commit to is the measurement: a dated, ' +
        'reproducible record of what was said on each platform on each run, and the work that ' +
        'makes your firm easier to retrieve and cite.',
    },
  ],

  proof: {
    kind: 'none',
    statement:
      'No Qognition client has been published in manufacturing. We have not run this work for a ' +
      'named manufacturer, and a page existing for a vertical is not evidence of experience in it. ' +
      'What we can show you is the method, and the first observation run on your own prompt set.',
  },

  snapshotQuestion:
    'How many of your capabilities and certificate scopes sit on a page an assistant can read, ' +
    'rather than inside a PDF or behind a form?',
};
