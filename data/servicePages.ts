import {
  Ban,
  BadgeCheck,
  Bot,
  CalendarDays,
  ClipboardCheck,
  Columns2,
  Compass,
  FileText,
  Fingerprint,
  Link2,
  ListChecks,
  MapPin,
  MessageSquareText,
  Network,
  PenLine,
  Search,
  Split,
  Star,
  Tags,
  TrendingUp,
  Users,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import type { B2BService } from './case-studies/b2b';
import { B2B_PROOF_LINE } from './case-studies';
import type { ServiceKey } from './case-studies/types';

/* THE FIVE PLAIN-ENGLISH SERVICE PAGES.
 *
 * Source of every string: docs/copy/2026-10/plain-english-templates.md (Theo, Ruth verdict
 * FIX with edits applied, cleared to build). Section numbers below are that file's. Do not
 * reword here: a change to a string is a copy change and goes back through Ruth.
 *
 * Keyed by path. A path with an entry renders components/services/ServiceLanding.tsx; any
 * other /services/* path keeps the earlier template. Titles, metas, H1s, URLs and canonicals
 * are NOT here: they stay in lib/seo.ts (H1_OVERRIDES, SEO_OVERRIDES) and data/seoExpansion.ts,
 * because the priority pages fix them (memory/priority-pages-keywords.md).
 *
 * Server-only: lucide icons are components, and importing this file into a 'use client'
 * module would ship every icon below in the bundle. */

export type ServiceVisual = 'search-to-sale' | 'tracker-run' | 'answer-sources' | 'listings' | 'budget-loop';

export interface ServiceLink {
  readonly label: string;
  readonly href: string;
}

export interface ServiceFaq {
  readonly question: string;
  /** Plain text. This exact string is what faqSchema() emits, so the JSON-LD matches the page. */
  readonly answer: string;
  /** Renders one phrase of `answer` as a link. `text` must occur in `answer`. */
  readonly link?: { readonly text: string; readonly href: string };
}

export interface ServicePageContent {
  /** Funnel context, `service_id` on /book and /contact links. */
  readonly serviceId: string;
  readonly eyebrow: string;
  readonly promise: string;
  /** One line under the promise: the PPC scope line, the local-pack explainer. */
  readonly promiseNote?: string;
  readonly visual: ServiceVisual;
  /** The AI platform row. AI SEO and GEO only (copy §2.1). */
  readonly platforms: boolean;
  /** The four layers, verbatim from CLAUDE.md §1 (copy §5). */
  readonly layers?: boolean;
  readonly rightFor: readonly string[];
  readonly rightForNote?: string;
  readonly whatYouGet: readonly { readonly icon: LucideIcon; readonly title: string; readonly body: string }[];
  /** GEO only (copy §6). */
  readonly canAndCannot?: {
    readonly can: readonly string[];
    readonly cannot: readonly string[];
    readonly note: string;
  };
  readonly steps: readonly { readonly title: string; readonly body: string }[];
  readonly monthly: {
    readonly intro?: string;
    readonly items: readonly string[];
    readonly note?: string;
    /** "Want to see your answers first? Request a free AI visibility audit." (D1). */
    readonly auditLink?: boolean;
  };
  /** Proof rule, copy §2.2: B2B records whose `services` include `b2b`, then insurance
   *  records whose `services` include `insurance`. Omitted keys render no group. */
  readonly proof: { readonly b2b?: B2BService; readonly insurance?: ServiceKey; readonly evidenceButtons?: boolean };
  readonly faqs: readonly ServiceFaq[];
  /** The names-only list that replaces the capability grid. Every URL is live today. */
  readonly specialists?: { readonly heading: string; readonly links: readonly ServiceLink[] };
  /** Sub-pages: "Useful next steps". */
  readonly nextSteps?: readonly ServiceLink[];
  /** The services-template.md block, with this page's extra market link. */
  readonly markets?: { readonly extra?: ServiceLink };
}

/* ── Shared strings, copy §2.2. ─────────────────────────────────────────── */

/** The promise chips live in data/servicePromises.ts, shared with the earlier template. */
export { PROMISE_CHIPS } from './servicePromises';

/** The two caveat lines under the proof cards. Render only the line for a group that rendered. */
/* The B2B line is owned by data/case-studies (operator, 2026-10-08: the figures are confirmed
   by client reporting). Never hard-code it here. */
export const PROOF_LINE_B2B = B2B_PROOF_LINE;
export const PROOF_LINE_INSURANCE =
  'Insurance KPIs stay labelled as targets until client reporting fills in the result. Outside insurance, read those programmes for the method, not as proof of work in your sector.';

/** CLAUDE.md §1. Same strings as components/home/FourLayers.tsx; change all or none. */
export const LAYER_DEFINITIONS = [
  { layer: 'SEO', surface: 'Google search results' },
  { layer: 'Local SEO', surface: 'Google Maps, local pack, Bing Places, Business Profile, reviews, listings' },
  { layer: 'AI SEO', surface: 'Google AI Overviews and AI Mode' },
  { layer: 'GEO', surface: 'ChatGPT, Perplexity, Gemini, Claude, Copilot' },
] as const;

/** "Markets we serve". Market links only: a city here is NOT an office claim. Offices
 *  (operator via MARS, 2026-10-08, city only, no HQ): Toronto, New York, Dubai, Sydney,
 *  Gurugram. They are named in the sentence in ServiceLanding.tsx; never claim another. */
export const MARKETS: readonly ServiceLink[] = [
  { label: 'New York', href: '/locations/new-york' },
  { label: 'London', href: '/locations/london' },
  { label: 'Dubai', href: '/locations/dubai' },
  { label: 'Perth', href: '/locations/perth' },
];

/* ── §4 /services/seo ───────────────────────────────────────────────────── */

const SEO: ServicePageContent = {
  serviceId: 'seo',
  eyebrow: 'SEO · Google search results',
  promise:
    'We help B2B buyers find you on Google when they search for what you sell. We judge the work on enquiries, not traffic.',
  visual: 'search-to-sale',
  platforms: false,
  rightFor: [
    'You sell to other businesses, and buyers research online before they call.',
    "Your services don't show up for the searches that matter.",
    "You've paid for SEO before and got traffic, but few enquiries.",
    'Someone on your team can approve changes to the website.',
  ],
  whatYouGet: [
    {
      icon: Wrench,
      title: 'Technical fixes, in order',
      body: 'We find what stops Google finding and storing your key pages, and fix it, sales pages first.',
    },
    {
      icon: FileText,
      title: 'Pages buyers can compare',
      body: 'Service pages that answer what a buying team checks: what you do, who for, how it works and what it takes.',
    },
    {
      icon: Search,
      title: 'The searches that matter',
      body: 'A list of the searches your buyers make before they enquire, each matched to the page that should answer it.',
    },
    {
      icon: Link2,
      title: 'Other sites backing you',
      body: 'Mentions and links from trade press, associations and partners your buyers already trust.',
    },
    {
      icon: BadgeCheck,
      title: 'Who stands behind it',
      body: 'Named authors, real credentials and client evidence on the page, so buyers can see who did the work.',
    },
  ],
  steps: [
    { title: 'Check.', body: 'We review your site and your Google search data, and record where you stand today, with a date.' },
    { title: 'Fix.', body: 'We fix what blocks your key pages, in order, and every fix has an owner.' },
    {
      title: 'Build.',
      body: 'We write or improve the pages your buyers need with your experts, and win mentions on sites they trust.',
    },
    { title: 'Review.', body: 'We compare against the starting point and agree the next priorities.' },
  ],
  monthly: {
    intro: 'One report, in plain columns. Nothing blended into a single score.',
    items: [
      'Where you rank for the searches we agreed, against the starting point.',
      "Which key pages Google has stored, and which it hasn't yet.",
      'Visits from Google to the pages that matter.',
      'Enquiries from search, and how many your sales team rated as qualified: from a firm you would actually sell to.',
      'What we fixed, what we published, and what comes next.',
    ],
    note: "Where we can't trace an enquiry back to a search, the report says so.",
  },
  proof: { b2b: 'seo' },
  faqs: [
    {
      question: 'Do you guarantee rankings?',
      answer:
        'No. Google decides its own results. We commit to the agreed work, a dated starting point and a monthly report you can check.',
    },
    {
      question: 'How does SEO help with AI search?',
      answer:
        "Google's AI Overviews and AI Mode only link to pages Google has stored and can show in search. So the fixes and pages that help you rank are the base for AI SEO and GEO. We still report AI answers separately, because a page can rank and still not be named.",
      link: { text: 'AI SEO and GEO', href: '/services/ai-seo' },
    },
    {
      question: 'Do we have to buy AI SEO or GEO as well?',
      answer: 'No. You can start with SEO alone and add layers later. PPC is scoped separately.',
    },
    {
      question: 'Can you work with our developers or current agency?',
      answer: 'Yes. The proposal says who owns each task, so nothing gets done twice.',
    },
  ],
  specialists: {
    heading: 'Specialist SEO pages',
    links: [
      { label: 'Technical SEO', href: '/services/seo/technical-seo' },
      { label: 'Local SEO', href: '/services/seo/local-seo' },
      { label: 'On-page fixes', href: '/services/seo/on-page-seo' },
      { label: 'Mentions on other sites', href: '/services/seo/off-page-seo' },
      { label: 'Link building', href: '/services/seo/link-building' },
      { label: 'Keyword research', href: '/services/seo/keyword-research' },
      { label: 'Content planning', href: '/services/seo/content-strategy' },
      { label: 'Refreshing existing pages', href: '/services/seo/content-optimization' },
      { label: 'Showing your expertise', href: '/services/seo/eeat-seo' },
      { label: 'Page labels for Google (schema)', href: '/services/seo/schema-markup' },
      { label: 'SEO for several countries', href: '/services/seo/international-seo' },
      { label: 'Catalogue and product pages', href: '/services/seo/ecommerce-seo' },
      { label: 'Pages at scale', href: '/services/seo/programmatic-seo' },
      { label: 'SEO audits', href: '/services/seo/seo-audits' },
      { label: 'Site moves and redesigns', href: '/services/seo/site-migration-seo' },
    ],
  },
  markets: { extra: { label: 'Perth SEO', href: '/locations/perth/seo' } },
};

/* ── §5 /services/ai-seo ────────────────────────────────────────────────── */

const AI_SEO: ServicePageContent = {
  serviceId: 'ai-seo',
  eyebrow: 'AI SEO and GEO',
  promise:
    "Your buyers can ask Google's AI or ChatGPT which supplier to use. We work on what those answers draw from, and show you every answer we test, with its date.",
  visual: 'tracker-run',
  platforms: true,
  layers: true,
  rightFor: [
    'Your buyers research suppliers before they ever call you.',
    "You rank on Google, but you don't know what AI tools say about you.",
    'You asked ChatGPT about your category and it named a competitor.',
    'You want answers you can check, not a score.',
  ],
  whatYouGet: [
    {
      icon: MessageSquareText,
      title: "Your buyers' questions, tested",
      body: 'We agree the questions your buyers ask, then test them on Google\'s AI and the assistants you choose.',
    },
    {
      icon: CalendarDays,
      title: 'A dated starting point',
      body: 'The first answers are saved with their date and sources, so every later change can be checked.',
    },
    {
      icon: Fingerprint,
      title: 'One clear story about you',
      body: "Your name, services, locations and credentials stated the same way everywhere, so AI tools don't confuse you with someone else.",
    },
    {
      icon: FileText,
      title: 'Pages that answer first',
      body: "Pages that answer a buyer's question in the opening lines, and lead straight to your services and a way to book.",
    },
    {
      icon: Network,
      title: 'The sites answers rely on',
      body: "We find the directories, trade press and comparison pages AI answers use for your buyers' questions, and work on what they say about you.",
    },
  ],
  steps: [
    { title: 'Agree the questions.', body: "Your buyers' questions, the AI tools and the markets. Then the first test, dated." },
    { title: 'Fix your own site.', body: 'Company facts and pages that answer first.' },
    { title: 'Work on other sites.', body: 'Correct and strengthen the pages AI answers rely on.' },
    { title: 'Re-test and compare.', body: 'Same questions, same tools, on the agreed schedule.' },
  ],
  monthly: {
    items: [
      'Every question we tested (each one is a "prompt"), on every AI tool, with the date.',
      'Whether each answer named you, a competitor, or no one.',
      'The sources each answer linked to, grouped by type: your site, directories, trade press, review sites.',
      'What changed since the starting point, answer by answer.',
      'Visits from AI tools and qualified enquiries (from firms you would actually sell to), each in its own column.',
    ],
    note: 'A mention in an answer does not prove a buyer became a customer.',
    auditLink: true,
  },
  proof: { b2b: 'ai-seo', insurance: 'ai-seo', evidenceButtons: true },
  faqs: [
    {
      question: 'Can you guarantee ChatGPT or Google will recommend us?',
      answer: 'No. Each AI tool decides its own answers. We commit to the work and a dated record of every answer we check.',
    },
    {
      question: "What's the difference between AI SEO and GEO?",
      answer:
        'AI SEO is the work on Google AI Overviews and AI Mode. GEO is the work on assistants: ChatGPT, Perplexity, Gemini, Claude and Copilot. They share foundations, but we report them separately.',
    },
    {
      question: 'Is there a quick technical fix?',
      answer:
        'No. Some agencies sell a file or a code snippet as the answer. We add those where they describe your pages accurately, but none of them makes an AI tool recommend you.',
    },
    {
      question: 'How soon will we see a change?',
      answer:
        "Fixes on your site can be checked as soon as they go live. AI answers depend on each tool and on other sites, so we don't promise a date. You see the same questions re-tested from the start.",
    },
  ],
  specialists: {
    heading: 'Specialist AI search pages',
    links: [
      { label: 'GEO: AI assistants', href: '/services/ai-seo/generative-engine-optimization' },
      { label: "Answers for Google's AI (AEO)", href: '/services/ai-seo/answer-engine-optimization' },
      { label: 'Tracking AI answers', href: '/services/ai-seo/ai-citation-tracking' },
      { label: 'Ongoing AI answer checks', href: '/services/ai-seo/ai-search-monitoring' },
      { label: 'AI search review', href: '/services/ai-seo/ai-search-visibility' },
      { label: 'Consistent company facts', href: '/services/ai-seo/entity-optimization' },
      { label: 'Content for AI tools', href: '/services/ai-seo/llm-optimization' },
      { label: 'Rules for AI-assisted content', href: '/services/ai-seo/ai-content-governance' },
      { label: 'Voice search', href: '/services/ai-seo/voice-search-optimization' },
    ],
  },
  markets: { extra: { label: 'Perth AI SEO and GEO', href: '/locations/perth/ai-seo' } },
};

/* ── §6 /services/ai-seo/generative-engine-optimization ─────────────────── */

const GEO: ServicePageContent = {
  serviceId: 'ai-seo',
  eyebrow: 'GEO · ChatGPT, Perplexity, Gemini, Claude, Copilot',
  promise:
    'GEO is the work on what AI assistants say when a buyer asks them for a supplier. We work on what they draw from, and keep a dated record of what they say.',
  visual: 'answer-sources',
  platforms: true,
  rightFor: [
    'Your buyers use ChatGPT or Perplexity to research suppliers.',
    "You asked an assistant about your category and didn't like the answer.",
    "You're named, but described wrongly: old services, wrong location, someone else's strengths.",
  ],
  whatYouGet: [
    {
      icon: MessageSquareText,
      title: 'Questions from your sales team',
      body: 'We build the question list from what buyers actually ask your sales team, not from a keyword tool.',
    },
    {
      icon: Bot,
      title: 'Tests on the assistants that matter',
      body: 'ChatGPT, Perplexity, Gemini, Claude and Copilot, narrowed to the ones your market uses.',
    },
    {
      icon: Network,
      title: 'A map of who gets quoted',
      body: "The sites each assistant draws on for your buyers' questions, from directories to trade press.",
    },
    {
      icon: PenLine,
      title: "Corrections where you're described wrongly",
      body: 'Fixes to your own site and profiles, and requests to correct listings that describe you wrongly.',
    },
  ],
  canAndCannot: {
    can: ['What your site says about you', "How consistently you're described", 'Whether listings about you are accurate'],
    cannot: ['What an assistant decides to say', 'When it changes its answer', 'Whether it names you next time'],
    note: 'No one controls the assistants, so we never promise a mention or a date.',
  },
  steps: [
    {
      title: 'Build the list.',
      body: 'We agree the questions with your sales team, then lock them so every test compares like with like.',
    },
    { title: 'Test and map.', body: 'We save every answer and note the sites it relied on.' },
    {
      title: 'Fix and re-test.',
      body: 'We fix what you control, work on the sites you can honestly influence, and re-test on schedule.',
    },
  ],
  monthly: {
    items: [
      "Each assistant's answer to each question (prompt), with the date.",
      'Who was named: you, a competitor, or no one.',
      'Whether the answer described you accurately.',
      'The sources behind each answer.',
    ],
    auditLink: true,
  },
  proof: { b2b: 'geo', insurance: 'ai-seo' },
  faqs: [
    {
      question: 'Is GEO just SEO with a new name?',
      answer:
        "No. SEO is about Google's search results. GEO is about what assistants say when someone asks them a question. Good SEO helps, but a page can rank well and still not be named.",
    },
    {
      question: 'Can you get us recommended by ChatGPT?',
      answer:
        'No one can promise that. We work on what the assistants draw on and record what they say, with dates, so you can see whether it is changing.',
    },
    {
      question: 'How do you choose the questions?',
      answer:
        "From your sales team's notes, your buyers' language and the comparisons they make. Once agreed, the list stays fixed.",
    },
  ],
  nextSteps: [
    { label: 'AI SEO and GEO for B2B', href: '/services/ai-seo' },
    { label: 'Tracking AI answers', href: '/services/ai-seo/ai-citation-tracking' },
  ],
};

/* ── §7 /services/seo/local-seo ─────────────────────────────────────────── */

const LOCAL_SEO: ServicePageContent = {
  serviceId: 'seo',
  eyebrow: 'Local SEO · Google Maps, local pack, Bing Places, Business Profile, reviews, listings',
  promise:
    "If your buyers pick suppliers near them, we fix how you show up on Google Maps and in local listings. If location doesn't matter to them, we'll tell you.",
  promiseNote: 'The local pack is the short list of businesses Google shows with a map.',
  visual: 'listings',
  platforms: false,
  rightFor: [
    'Your buyers need you on site: installs, inspections, field service.',
    'Your buyers want you nearby: sample drop-off, a licence that applies in one state, a site visit before signing.',
    'You have real offices, branches or depots.',
  ],
  rightForNote:
    "If you sell software or advice that works anywhere, local SEO is rarely the priority. We'll say so on the call.",
  whatYouGet: [
    {
      icon: Compass,
      title: 'A straight answer first',
      body: "We check whether location shapes your buyers' choice before we touch a listing.",
    },
    {
      icon: MapPin,
      title: 'Accurate Google and Bing listings',
      body: 'Your Google Business Profile and Bing Places listing set up and corrected for every real address.',
    },
    {
      icon: Tags,
      title: 'The right categories',
      body: 'Categories and services that describe what you sell to businesses, not the nearest consumer category.',
    },
    {
      icon: ListChecks,
      title: 'The same details everywhere',
      body: 'One name, address and phone number across the directories your buyers use.',
    },
    {
      icon: Star,
      title: 'Reviews from real clients',
      body: 'A simple way to ask real clients for reviews, and a reply to every review. No paid or filtered reviews.',
    },
  ],
  steps: [
    { title: 'Check.', body: 'Confirm location matters, review every listing, and record a dated starting point.' },
    { title: 'Fix.', body: 'Correct listings, categories and details, and set up review requests.' },
    { title: 'Review.', body: 'Compare against the start each month and agree the next steps.' },
  ],
  monthly: {
    items: [
      'Calls, direction requests and website clicks from your Google listing.',
      'Where you appear in map results for the searches we agreed, by location.',
      'New reviews, and our replies.',
      'Listings fixed, and any still wrong.',
      'Qualified enquiries from local search (from firms you would actually sell to), where we can trace them.',
    ],
  },
  proof: {},
  faqs: [
    {
      question: 'Do B2B companies need local SEO?',
      answer:
        "Only when buyers choose by location. If they'd hire you from anywhere, we'll put the effort into SEO, AI SEO or GEO instead.",
    },
    {
      question: 'Can you list us in cities where we have no office?',
      answer:
        'No. A listing needs a real address where you serve clients. For markets you serve remotely, we can build pages that say exactly that.',
    },
    {
      question: 'Can we buy local SEO on its own?',
      answer: "Yes. If something else is holding back enquiries, we'll tell you on the call.",
    },
  ],
  nextSteps: [
    { label: 'B2B SEO services', href: '/services/seo' },
    { label: 'Perth SEO for B2B companies', href: '/locations/perth/seo' },
  ],
};

/* ── §8 /services/ppc ───────────────────────────────────────────────────── */

const PPC: ServicePageContent = {
  serviceId: 'ppc',
  eyebrow: 'B2B PPC · Google Ads and LinkedIn',
  promise:
    'Google Ads and LinkedIn campaigns for B2B firms, judged on qualified enquiries and booked meetings, not clicks.',
  promiseNote:
    'B2B PPC runs alongside the four layers and is scoped separately, priced as a share of ad spend with a monthly minimum. A firm that wants only PPC is a full client.',
  visual: 'budget-loop',
  platforms: false,
  rightFor: [
    "Your ads bring in form fills your sales team won't call back.",
    "You spend on Google Ads or LinkedIn and can't see which campaigns produce meetings.",
    'You want paid search working while SEO and AI search build up, or you want PPC on its own.',
  ],
  whatYouGet: [
    {
      icon: ClipboardCheck,
      title: 'An honest account review',
      body: 'We go through your searches, settings and landing pages before changing a single bid.',
    },
    {
      icon: Split,
      title: 'Researchers and buyers kept apart',
      body: 'People still learning are kept apart from people choosing a supplier, with ads written for each.',
    },
    {
      icon: Ban,
      title: 'Wasted searches blocked',
      body: 'We block searches from job seekers, students and consumers, so more of the budget reaches buyers.',
    },
    { icon: Columns2, title: 'Ads and pages that match', body: 'Each ad leads to a page that makes the same promise.' },
    {
      icon: Users,
      title: 'LinkedIn by job title',
      body: 'Ads shown to the job titles, company sizes and industries you sell to.',
    },
    {
      icon: TrendingUp,
      title: 'Budget moved on quality',
      body: 'Spend moves toward campaigns that produce qualified enquiries, not the cheapest clicks.',
    },
  ],
  steps: [
    { title: 'Review the account.', body: 'Searches, settings, tracking and landing pages, before any change.' },
    { title: 'Rebuild around buyers.', body: 'Bid only on searches that closely match what you sell.' },
    {
      title: 'Clean up early.',
      body: 'Read the real searches behind your ads often in the first weeks, and block the wrong ones.',
    },
    { title: 'Move budget on quality.', body: 'Shift spend by cost per qualified enquiry.' },
  ],
  monthly: {
    items: [
      'Spend, by campaign.',
      'Enquiries, and how many your sales team rated as qualified: from a firm you would actually sell to.',
      'Cost per qualified enquiry: ad spend divided by those qualified enquiries.',
      'Searches we blocked, and why.',
      'Meetings booked from paid campaigns, where your CRM records them.',
    ],
  },
  proof: { b2b: 'ppc', insurance: 'ppc' },
  faqs: [
    {
      question: 'Is PPC included with AI SEO and GEO?',
      answer:
        'No. PPC is scoped and priced separately, as a share of ad spend with a monthly minimum. You can run it alone or beside search work.',
    },
    {
      question: 'Will you guarantee a cost per lead?',
      answer:
        "No. We commit to the account work and to reporting cost per qualified enquiry in a way you can check. We won't name a figure before we've seen your data.",
    },
    {
      question: 'Do you need access to our ad accounts?',
      answer:
        'Yes, plus your analytics and CRM if you want campaigns judged on sales results. The accounts stay in your name.',
    },
    {
      question: 'Which platforms do you run?',
      answer:
        'Google Ads, Microsoft Advertising and LinkedIn, plus Meta ads shown to people who already visited your site, where that fits.',
    },
  ],
  specialists: {
    heading: 'Specialist PPC pages',
    links: [
      { label: 'Google search ads', href: '/services/ppc/google-ads-management' },
      { label: 'LinkedIn ads', href: '/services/ppc/linkedin-ads' },
      { label: 'Landing pages that match your ads', href: '/services/ppc/landing-page-cro' },
      { label: 'Ads to past visitors', href: '/services/ppc/retargeting-systems' },
      { label: 'Meta ads', href: '/services/ppc/meta-ads' },
      { label: 'YouTube ads', href: '/services/ppc/youtube-ads' },
      { label: "Google's automated campaigns", href: '/services/ppc/performance-max' },
      { label: 'Shopping ads for B2B catalogues', href: '/services/ppc/google-shopping-ads' },
      { label: 'Product lists for Google', href: '/services/ppc/feed-management' },
      { label: 'Ad creative', href: '/services/ppc/ad-creative-production' },
      { label: 'Display ads on other sites', href: '/services/ppc/programmatic-advertising' },
      { label: 'Paid media reporting', href: '/services/ppc/paid-media-analytics' },
      { label: 'Microsoft ads', href: '/services/ppc/bing-ads' },
      /* TikTok, Amazon and streaming-TV ads are not offered (operator, 2026-10-08) and are
         not listed. Their URLs stay live; see NOT_OFFERED_SUB_SERVICES in data/services.ts. */
    ],
  },
  markets: {},
};

export const SERVICE_PAGES: Readonly<Record<string, ServicePageContent>> = {
  '/services/seo': SEO,
  '/services/ai-seo': AI_SEO,
  '/services/ppc': PPC,
  '/services/ai-seo/generative-engine-optimization': GEO,
  '/services/seo/local-seo': LOCAL_SEO,
};

export const servicePageFor = (path: string): ServicePageContent | undefined => SERVICE_PAGES[path];
