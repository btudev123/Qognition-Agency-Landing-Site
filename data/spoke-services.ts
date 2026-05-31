import type { SpokeId } from '../lib/spokes';

export interface SubService {
  slug: string;
  title: string;
  h1: string;
  summary: string;
  description: string;
  longDescription?: string;
  problem: string;
  approach: string[];
  deliverables: string[];
  timeline: string;
  icon: string;
  kpis: string[];
  whoItsFor?: string[];
  caseStudySnippet?: { metric: string; context: string; client: string } | null;
  relatedServices?: { label: string; href: string }[];
  faqs?: { question: string; answer: string }[];
}

export interface SpokePageData {
  spoke: SpokeId;
  hero: {
    badge: string;
    h1: string;
    subhead: string;
    cta: string;
    secondaryCta: string;
    stats: { value: string; label: string }[];
  };
  pains: { title: string; why: string; cost: string }[];
  process: { step: string; title: string; description: string; deliverables: string[] }[];
  outcomes: { metric: string; label: string; client: string; industry: string }[];
  subServices: SubService[];
  faqs: { question: string; answer: string }[];
  pricing: {
    tiers: { name: string; price: string; description: string; features: string[]; cta: string; highlighted?: boolean }[];
    note: string;
  };
  guarantee: { headline: string; body: string };
  proofLogos: { name: string }[];
  teamMember: { name: string; role: string; focus: string } | null;
}

// ── MARKETING SPOKE ────────────────────────────────────────────

const marketingSubServices: SubService[] = [
  {
    slug: 'seo',
    title: 'SEO',
    h1: 'Technical SEO That Drives Revenue, Not Just Rankings',
    summary: 'Full-spectrum SEO from technical foundations to content strategy — built for measurable organic growth.',
    description: 'We combine technical SEO audits, on-page optimization, off-page authority building, and content strategy into a single revenue-focused SEO program. Every recommendation ties back to a revenue metric.',
    problem: 'Most SEO agencies optimize for rankings. Rankings don\'t pay the bills — revenue does. Founders need SEO that connects the dots from keyword to close.',
    approach: [
      'Technical audit: crawl budget, Core Web Vitals, index bloat, schema gaps',
      'Keyword strategy: high-intent bottom-funnel terms first, then expand upward',
      'Content engine: programmatic + editorial content mapped to buyer journey',
      'Authority building: digital PR, link earning, and topical authority clustering',
      'Measurement: rankings → traffic → leads → pipeline → revenue attribution',
    ],
    longDescription: `SEO is not dead — but the playbook that worked five years ago is. AI Overviews, zero-click searches, and LLM citations have fundamentally changed how prospects find and evaluate vendors. A #1 ranking for a high-intent keyword is still the most valuable real estate on the internet. Getting there — and holding it — requires a different approach than what most agencies still sell.

We practice what we call revenue-first SEO. Every recommendation starts with the question: "If we fix this, does it move pipeline?" If the answer is no, we deprioritize it regardless of what the SEO tools say. We have seen too many companies burn six figures on content programs that drove traffic but not revenue, or technical audits that identified 300 issues but didn't tell the founder which five actually mattered.

Our SEO program spans four layers. The foundation is technical: crawl budget, index bloat, Core Web Vitals, structured data, internal linking architecture, and site speed — the infrastructure that determines whether search engines can even find and render your content properly. Layer two is keyword strategy, but flipped from the usual approach: we start with bottom-funnel, high-intent terms where a visitor is already evaluating a purchase, then expand upward to informational content that builds topical authority and feeds the top of the funnel. Layer three is content production — a mix of programmatic pages for scalable coverage and editorial deep-dive pieces that earn links and citations. Layer four is authority building: digital PR, link earning campaigns, and clustering content into topic hubs that signal to Google (and LLMs) that you are the definitive source in your category.

Measurement is where most SEO programs fall apart. We do not report rankings in isolation. We report the full chain: keyword position → organic clicks → landing page conversion → pipeline → closed revenue. When a keyword moves from position 7 to position 3, we can tell you exactly how much pipeline that unlocked. When it doesn't, we investigate why — and we fix it. SEO without revenue attribution is just an expensive hobby.`,
    whoItsFor: [
      'B2B SaaS founders whose organic traffic has plateaued or declined despite consistent content investment',
      'Growth-stage companies that rank on pages 2-3 for their most valuable keywords and need a systematic plan to break into the top 5',
      'Marketing leaders tired of SEO agencies that send monthly ranking reports with no connection to pipeline or revenue',
      'Founders who know their site has technical SEO debt (slow load times, index bloat, missing schema) but don\'t have the in-house expertise to fix it',
      'Companies launching a new product or entering a new market and needing to build organic visibility from scratch — the right way, from day one',
    ],
    caseStudySnippet: { metric: '247% organic traffic increase and 3.2× organic-attributed pipeline in 6 months', context: 'Full technical SEO overhaul followed by a content engine targeting 80 high-intent bottom-funnel keywords. Fixed crawl budget waste from 4,000+ thin parameter URLs, implemented programmatic SEO for 120 location + service pages, and built 12 cornerstone content pieces that earned 40+ referring domains in 90 days.', client: 'Professional Services Firm (200 employees)' },
    relatedServices: [
      { label: 'AI Search & LLM Visibility', href: '/marketing/ai-seo' },
      { label: 'Content Marketing', href: '/marketing/content' },
      { label: 'Conversion Rate Optimization', href: '/marketing/cro' },
      { label: 'Paid Media', href: '/marketing/paid-media' },
    ],
    faqs: [
      { question: 'How long does SEO take to show results?', answer: 'Meaningful ranking improvements for competitive keywords typically take 60-120 days from implementation — depending on your domain authority, the competitiveness of your target keywords, and how much technical debt we need to clean up first. Quick wins (fixing broken pages, optimizing existing content on page 2, implementing missing schema) can show movement in 30-45 days. Content-driven rankings and authority building are a 3-6 month game. We set realistic expectations upfront: month 1 is audit and fixes, month 2 is content production and optimization, months 3-6 is where the compounding starts. Clients who stick with it for 6+ months consistently see the hockey-stick trajectory.' },
      { question: 'Do you guarantee #1 rankings?', answer: 'No, and you should run from any agency that does. Google explicitly warns against ranking guarantees, and anyone making them is either lying or using vanity keywords that nobody searches for. What we guarantee is this: we will follow a disciplined, revenue-focused SEO process, we will measure everything transparently, and if we are not improving your organic-attributed pipeline within 90 days, we work for free until we do. We guarantee the effort, the methodology, and the measurement — not Google\'s algorithm.' },
      { question: 'What is the difference between your SEO approach and a traditional agency?', answer: 'Three differences. First, revenue attribution: we track SEO impact through to closed pipeline and revenue, not just rankings and traffic. Second, AI readiness: we optimize for LLM citations and AI Overviews alongside traditional search — it is not "SEO vs. AI" but a unified visibility strategy. Third, integration: because we also run paid media, content, and CRO for our clients, the SEO program feeds into — and is fed by — every other marketing channel. Traditional SEO agencies operate in a silo. We do not.' },
      { question: 'Do I need ongoing SEO, or can we do a one-time audit and fix?', answer: 'A one-time technical audit and fix is valuable — it clears the debt and gives you a clean foundation. But SEO is not a project with an endpoint; it is an ongoing program. Your competitors are not standing still. Google ships thousands of algorithm updates per year. Your content needs to stay current. New keywords emerge. Your market evolves. The companies that win organic search treat it like compound interest — consistent investment over time. We offer both a one-time audit engagement and an ongoing retainer. Most clients start with the audit, see what is possible, and then move to a retainer.' },
      { question: 'How do you handle off-page SEO and link building?', answer: 'We do not buy links, participate in link schemes, or use PBNs — those tactics are a great way to get a manual penalty. Our authority-building approach: digital PR (data-driven stories that journalists and industry publications want to cover), original research and benchmark reports that earn citations naturally, strategic guest contributions on reputable industry publications (not link farms), broken link reclamation, and building content assets — tools, calculators, frameworks — that people naturally link to because they are genuinely useful. It is slower than buying links. It also does not get you penalized. The links you earn this way compound for years.' },
    ],
    deliverables: [
      'Technical SEO audit with prioritized fix list',
      'Keyword opportunity map (volume × intent × competition)',
      'Content calendar with 90-day editorial plan',
      'Monthly performance dashboard with revenue attribution',
      'Weekly rank tracking for target keyword set',
    ],
    timeline: '90-day initial engagement, then ongoing monthly retainer',
    icon: 'Search',
    kpis: ['Organic traffic growth', 'Keyword rankings', 'Organic conversions', 'Revenue from organic', 'Domain authority'],
  },
  {
    slug: 'ai-seo',
    title: 'AI Search & LLM Visibility',
    h1: 'Get Cited by ChatGPT, Perplexity, and Google AI Overviews',
    summary: 'Optimize for AI-powered search — LLM citations, AI Overviews, and answer engine optimization.',
    description: 'AI search is reshaping how prospects find you. We optimize your content and entity presence so LLMs cite your brand when prospects ask "who should I hire for X?" — before they ever visit your site.',
    problem: 'Traditional SEO is losing ground to AI-generated answers. If ChatGPT, Perplexity, and Google AI Overviews don\'t know about your company, you\'re invisible to the fastest-growing search channel.',
    approach: [
      'Entity optimization: structured data, knowledge graph presence, Wikipedia/Wikidata entries',
      'Citation-worthy content: original research, definitive guides, benchmarks — content LLMs want to cite',
      'LLM.txt and machine-readable feeds: llms.txt, llms-full.txt, API catalogs for agent discovery',
      'Review + authority signals: third-party reviews, industry mentions, podcast appearances',
      'Monitoring: track brand mentions across ChatGPT, Perplexity, Google AI Overviews, Claude',
    ],
    longDescription: `The search landscape is undergoing the most significant transformation since Google displaced Yahoo. When a prospect asks ChatGPT "who should I hire for B2B SEO?" or types "best growth marketing agency for SaaS" into Perplexity, the answer they get is the new first page of Google. If your brand is not cited in that answer, you are invisible to the fastest-growing search channel — full stop.

AI search visibility is not a separate discipline from SEO. It is the next layer. Traditional SEO ensures Google can find, crawl, and rank your pages. AI search optimization ensures ChatGPT, Claude, Perplexity, Gemini, and Google AI Overviews cite your brand when answering questions in your domain. The two reinforce each other: the same entity optimization, structured data, original research, and authority signals that help you rank in Google also make you citable by LLMs. But there are new levers too — ones most companies have not touched.

We focus on five vectors. First, entity optimization: LLMs do not retrieve websites — they retrieve entities. Your company, your product, your founder, your methodology need to exist as recognized entities in knowledge graphs (Google Knowledge Graph, Wikidata, Wikipedia). Second, structured data: Schema.org markup at a depth most companies never approach — Organization, Service, Person, Article, FAQ, HowTo, and the new LLM-specific markup patterns. Third, citation-worthy content: original research, benchmark reports, definitive guides, and data journalism that LLMs are trained to cite because they represent unique information not available elsewhere. Fourth, machine-readable infrastructure: llms.txt, llms-full.txt, API catalogs, agent skills manifests — the files that tell LLM crawlers exactly what your company does and why it should be cited. Fifth, monitoring: we track brand mentions across ChatGPT, Perplexity, Google AI Overviews, Claude, and Gemini, measuring not just "are we cited?" but "what queries trigger our citation?" and "how does our citation frequency trend over time?"

This is early-stage work. The companies investing in AI search visibility today are building a moat that will take competitors years to cross. LLMs have memory — the brands they cite today shape the brands they cite tomorrow. Being first to establish entity presence and citation authority in your category is the single highest-leverage marketing investment you can make in 2026.`,
    whoItsFor: [
      'B2B founders who have noticed ChatGPT and Perplexity recommending competitors but not them — and want to fix that systematically',
      'Marketing leaders who understand that AI Overviews are eating organic click-through rates and need a strategy to capture AI-driven visibility instead',
      'Companies with strong traditional SEO that are watching their organic traffic erode as zero-click searches increase quarter over quarter',
      'Category-creating companies that need LLMs to understand and cite their novel product or service category accurately',
      'VC-backed companies preparing for Series B or later — where investor and enterprise buyer due diligence increasingly includes "what do the AIs say about this company?"',
    ],
    caseStudySnippet: { metric: 'Brand cited in 4 of 6 major LLMs within 90 days — zero to 18 LLM citations/week', context: 'Built entity presence across Wikidata, Google Knowledge Graph, Wikipedia, and Crunchbase. Published 3 original benchmark reports that became primary LLM citation sources for the category. Implemented llms.txt, llms-full.txt, and comprehensive Schema.org markup with entity linking. Brand went from invisible to the most-cited provider in their category across ChatGPT, Perplexity, and Google AI Overviews.', client: 'B2B SaaS Company (Series A)' },
    relatedServices: [
      { label: 'SEO', href: '/marketing/seo' },
      { label: 'Content Marketing', href: '/marketing/content' },
      { label: 'Brand Strategy', href: '/marketing/brand-strategy' },
      { label: 'Paid Media', href: '/marketing/paid-media' },
    ],
    faqs: [
      { question: 'Is AI search optimization just a different kind of SEO?', answer: 'It is an extension of SEO, not a replacement. Traditional SEO optimizes for search engines that crawl, index, and rank pages. AI search optimization ensures LLMs cite your brand when answering questions — which involves entity optimization, structured data, original research, and machine-readable content feeds. About 60% of the work overlaps with good technical SEO. The other 40% — knowledge graph presence, llms.txt, citation-worthy data, LLM-specific monitoring — is net-new discipline that most companies and agencies are not yet addressing. We do both under one roof because they are increasingly the same strategy.' },
      { question: 'Can you guarantee we will be cited by ChatGPT or Google AI Overviews?', answer: 'We cannot guarantee specific LLM citations any more than we can guarantee specific Google rankings — LLMs are black boxes, and their training data and retrieval mechanisms evolve. What we can guarantee: we will implement every optimization that is known to increase LLM citation likelihood, we will produce content that meets the criteria LLMs use for selecting cited sources, we will monitor citation frequency and trends, and we will continuously adapt our approach as the AI search landscape evolves. Our clients see meaningful citation growth within 90 days of implementing our framework.' },
      { question: 'How do you measure AI search visibility?', answer: 'We track four dimensions: (1) citation presence — does your brand appear when we query major LLMs with your top 50 target queries; (2) citation frequency — how many times per week your brand is cited across monitored LLMs; (3) citation quality — are you cited as a recommended provider, mentioned as an example, or listed as a source; (4) referral traffic — how much traffic arrives at your site from LLM sources (visible in server logs and analytics with proper UTM tagging of llms.txt links). We deliver a quarterly AI Search Landscape Report with all four metrics trended over time.' },
      { question: 'Do we need llms.txt? What does it actually do?', answer: 'llms.txt is a proposed standard (analogous to robots.txt but for LLMs) that tells AI crawlers what content on your site is important and how it should be interpreted. llms.txt provides a structured summary of your company, services, and key pages. llms-full.txt provides complete machine-readable content. While not yet universally adopted by all LLM providers, major players (Anthropic, OpenAI) are actively ingesting these files, and early adopters are seeing citation improvements. Setting it up is low-effort and high-upside — there is no downside to having it. We implement it as part of every AI search engagement.' },
      { question: 'Will optimizing for AI search hurt our traditional SEO?', answer: 'No — the opposite. Entity optimization, clean structured data, original research, and authority building improve both traditional SEO and AI search visibility. Google uses entities and structured data for ranking, Knowledge Graph panels, and AI Overviews. Content that LLMs cite is content that earns backlinks, which improves domain authority, which improves traditional rankings. The strategies are mutually reinforcing. The only thing you might "lose" is the illusion that traditional blue-link SEO alone is sufficient — but that ship has already sailed regardless of whether you invest in AI search optimization.' },
    ],
    deliverables: [
      'AI visibility audit — where you appear (or don\'t) across major LLMs',
      'Entity optimization plan with priority actions',
      'LLM-readable content infrastructure (llms.txt, API catalog, agent skills manifest)',
      'Quarterly AI search landscape report with citation tracking',
      'Citation-worthy content roadmap',
    ],
    timeline: '60-day initial optimization, then quarterly monitoring',
    icon: 'Bot',
    kpis: ['LLM brand citations', 'AI Overview appearances', 'Featured snippet wins', 'Branded search volume', 'Referral traffic from AI sources'],
  },
  {
    slug: 'paid-media',
    title: 'Paid Media',
    h1: 'Performance Paid Media — Google, Meta, LinkedIn',
    summary: 'Full-funnel paid acquisition across search, social, and display — optimized for ROAS, not vanity metrics.',
    description: 'We plan, build, and optimize paid campaigns across Google Ads, Meta (Facebook/Instagram), and LinkedIn. Every campaign ties to pipeline and revenue, not just clicks and impressions.',
    problem: 'Most agencies optimize paid media for CTR and CPC. Founders need campaigns optimized for customer acquisition cost and ROAS — the metrics that actually matter to the P&L.',
    approach: [
      'Account audit: campaign structure, conversion tracking, audience gaps, wasted spend',
      'Funnel-aligned campaign architecture: awareness → consideration → conversion → retention',
      'Creative testing framework: systematic ad creative testing with statistical significance',
      'Landing page optimization: post-click experience that matches ad promise',
      'Cross-channel attribution: understand which channels drive pipeline, not just last-click',
    ],
    longDescription: `Paid media is the fastest lever in marketing — and the easiest place to burn money if you are optimizing for the wrong metrics. Most agencies optimize for click-through rate and cost per click because those numbers look good in a monthly report. We optimize for cost per acquisition and return on ad spend because those are the numbers that show up on your P&L. The difference is not subtle: an agency optimizing for CTR will write clickbait ad copy that attracts curiosity-clickers who never buy. An agency optimizing for CAC will write qualifying ad copy that repels people who will never convert and attracts the ones who will.

Our paid media program runs across Google Ads (Search, Performance Max, Demand Gen, YouTube), Meta (Facebook and Instagram — feed, stories, Reels), and LinkedIn (Sponsored Content, Message Ads, Dynamic Ads). We do not spray budget across every platform because it is available. We select channels based on where your ICP actually spends attention and where the unit economics make sense for your average deal size and sales cycle. For a B2B SaaS company with a $20K ACV and a 6-week sales cycle, that might mean LinkedIn for demand generation and Google Search for intent capture. For a DTC e-commerce brand with a $75 AOV, that might mean Meta for prospecting and Google Shopping for bottom-funnel capture. The channel mix is a strategic decision, not a default template.

Campaign architecture is where most ad accounts leak money. We build funnel-aligned campaigns: awareness campaigns that introduce your brand to ICP audiences using content and social proof; consideration campaigns that retarget engaged visitors with case studies, comparisons, and demo offers; conversion campaigns that capture high-intent demand with optimized landing pages and clear calls to action; and retention campaigns that cross-sell and upsell existing customers. Each campaign has a specific job to do, a specific metric to be measured by, and a specific budget allocation. No campaigns exist just because "we should be on LinkedIn."

Creative testing is the engine that makes paid media compound over time. We run systematic creative testing — ad copy, imagery, video, headlines, CTAs, landing pages — with proper statistical methodology. We do not declare a winner after 500 impressions. We test to significance, kill underperformers fast, scale winners, and feed creative insights into organic content and messaging. The result: cost per acquisition trends down month over month instead of creeping up as audiences fatigue.`,
    whoItsFor: [
      'Founders who are currently spending $5K+/month on ads but cannot confidently say what their CAC is by channel',
      'B2B companies that have tried LinkedIn ads and "they didn\'t work" — usually because of targeting, creative, or landing page issues, not the platform',
      'E-commerce brands scaling beyond $1M/year who need to move from manual campaign management to a systematic paid media engine',
      'Companies investing in content and SEO that want to accelerate pipeline with paid while organic compounds — using paid to test messaging and audiences that inform the organic strategy',
      'Marketing leaders who have an in-house paid media buyer but need senior strategy, channel mix decisions, and creative testing frameworks their buyer can execute',
    ],
    caseStudySnippet: { metric: '3.2× ROAS and 58% reduction in CAC across Google and LinkedIn in 4 months', context: 'Restructured paid media accounts for a B2B SaaS company that had been running unoptimized campaigns for 18 months. Consolidated 40+ ad groups into 8 funnel-aligned campaigns, implemented conversion tracking that followed leads through to closed-won (not just form fills), and ran a systematic creative testing program that identified 3 winning ad variants. Wasted spend identified and reallocated: $4,200/month in non-converting search terms and audiences.', client: 'B2B SaaS Company (Series A)' },
    relatedServices: [
      { label: 'Conversion Rate Optimization', href: '/marketing/cro' },
      { label: 'Content Marketing', href: '/marketing/content' },
      { label: 'SEO', href: '/marketing/seo' },
      { label: 'Social Media', href: '/marketing/social' },
    ],
    faqs: [
      { question: 'How much ad spend do I need to make paid media worth it?', answer: 'For Google Ads, you can start testing with $2,000-3,000/month and get statistically meaningful data within 4-6 weeks. For LinkedIn, we recommend a minimum of $3,000-5,000/month because CPCs are higher and the sales cycle is longer — smaller budgets do not generate enough conversion volume to optimize against. For Meta, $3,000-5,000/month is the floor for meaningful testing. In all cases, the budget needs to be large enough to generate sufficient conversion data for the platform\'s algorithm to optimize. Below those thresholds, you are essentially gambling, not advertising. Our paid media audit includes a budget recommendation based on your ICP, average deal size, and competitive landscape.' },
      { question: 'Do you take a percentage of ad spend as your fee?', answer: 'No. Our management fee is a flat monthly retainer, independent of your ad spend. This removes the incentive to increase your budget unnecessarily — a common problem with percentage-of-spend pricing models. If we recommend increasing budget, it is because the marginal ROAS supports it, not because our fee goes up. Your ad spend goes directly to the platforms. Our retainer covers strategy, campaign management, creative testing, landing page optimization, and reporting.' },
      { question: 'What attribution model do you use?', answer: 'We default to a data-driven attribution model that uses first-touch, last-touch, and multi-touch data to understand the full customer journey — not just the last click before conversion. For B2B companies with longer sales cycles, we integrate CRM data (deal stage, closed-won revenue) into the attribution model so we are optimizing ads against pipeline and revenue, not just form fills. We set up proper UTM parameters, conversion tracking (Google Ads, Meta Pixel, LinkedIn Insight Tag), and offline conversion imports for CRM-attributed revenue. You will know what every dollar of ad spend produces in revenue — not just in clicks.' },
      { question: 'How do you handle creative production for ads?', answer: 'We develop the creative strategy, write copy, design static images, and provide storyboards and scripts for video ads. Actual video production, professional photography, and illustration are scoped separately or handled by your team. For most clients, we can produce high-performing static and text-based creative in-house. Video ads typically start with Loom-style founder videos or simple motion graphics — polished but authentic, not overproduced. The data shows that authentic, slightly rough creative often outperforms slick agency productions because it does not look like an ad.' },
      { question: 'How quickly can you get campaigns live?', answer: 'Within 2-4 weeks from kickoff. Week 1: account audit, conversion tracking setup and validation, audience research. Week 2: campaign architecture, ad creative production, landing page review and optimization. Week 3: campaign launch with conservative budgets, monitoring, and initial optimization. Week 4: first performance review with data-driven optimization recommendations. We do not launch until conversion tracking is verified end-to-end — launching without clean tracking is just advanced money burning.' },
    ],
    deliverables: [
      'Paid media audit with wasted spend analysis',
      'Campaign architecture document with funnel mapping',
      'Weekly performance dashboard with ROAS and CAC tracking',
      'Monthly creative testing report with winning variants',
      'Quarterly channel mix optimization recommendation',
    ],
    timeline: '30-day launch, then ongoing monthly management',
    icon: 'Target',
    kpis: ['ROAS', 'Cost per acquisition', 'Click-through rate', 'Conversion rate', 'Revenue attributed'],
  },
  {
    slug: 'content',
    title: 'Content & Brand',
    h1: 'Content Marketing That Builds Pipeline, Not Just Traffic',
    summary: 'Strategic content production — from blog posts to white papers to video scripts — mapped to your buyer journey.',
    description: 'We build content engines that attract, educate, and convert your ICP. Every piece of content serves a specific stage in the buyer journey and ties to a measurable outcome.',
    problem: 'Most content marketing produces traffic that never converts. Founders need content that attracts qualified buyers and moves them through a funnel — not just blog posts that get pageviews.',
    approach: [
      'Content strategy: topic clusters mapped to buyer journey stages and search intent',
      'Editorial planning: 90-day content calendar aligned with product launches and campaigns',
      'Production: writing, design, video scripts, interactive tools — whatever format serves the goal',
      'Distribution: organic search, social, email, paid amplification',
      'Measurement: content-attributed pipeline and revenue, not just traffic and shares',
    ],
    longDescription: `Most content marketing fails for a simple reason: it is produced for a keyword, not for a person. The writer targets a search volume number, produces a competent but indistinguishable article that says roughly what every other article on page one says, and the content attracts visitors who read for 90 seconds and leave — never to return, never to convert, never to remember the brand. This is not content marketing. This is filling the internet with words.

Real content marketing is a system for attracting, educating, and converting your ideal customer by being genuinely useful at every stage of their journey — before they are ready to buy, while they are evaluating options, and after they become a customer. It requires understanding not just what your ICP searches for, but why they search for it, what they need to believe before they will buy, and what format and depth will actually change their mind.

Our content engine operates on four principles. First, strategy before production: we build topic clusters mapped to buyer journey stages and validated by search intent, not just search volume. A bottom-funnel comparison piece that gets 200 visits/month but converts at 8% is more valuable than a top-funnel thought leadership piece that gets 5,000 visits and converts at 0.1%. Second, depth over volume: one genuinely definitive guide that becomes the reference for your industry is worth more than 20 surface-level blog posts. We would rather publish two exceptional pieces per week than five average ones. Third, format follows function: a technical topic might need an interactive calculator, a strategic topic might need a long-form essay, a product comparison might need a video walkthrough. We do not default to blog posts — we default to whatever format best serves the content's job. Fourth, distribution is not an afterthought: every piece of content has a distribution plan — organic search, social, email, paid amplification, partner syndication — built before the first word is written.

The outcome is a content library that compounds. Each piece earns search traffic, generates backlinks, feeds social content, powers email nurture sequences, and provides sales enablement material for your team. Content done right is not a cost center. It is an asset that appreciates over time.`,
    whoItsFor: [
      'Founders whose blog gets traffic but no pipeline — and are tired of hearing "content is a long game" with no evidence it is working',
      'B2B companies with complex products that require buyer education before a sale can happen — and whose current content does not bridge the knowledge gap',
      'Marketing teams that have a content writer but no content strategy — producing articles that are well-written but do not serve a specific funnel stage or business goal',
      'Companies launching a new product category that need to define the space, educate the market, and own the search landscape before competitors arrive',
      'Sales-led organizations where the sales team is creating their own one-off content (decks, one-pagers, email templates) because marketing is not producing what they need',
    ],
    caseStudySnippet: { metric: 'Content-attributed pipeline grew from $0 to $1.2M ARR in 12 months', context: 'Built a content engine for a B2B SaaS company that previously had no content strategy — just an inactive blog with 8 posts from 2019. Developed 5 topic clusters mapped to buyer journey stages, produced 48 long-form articles and 4 interactive tools (ROI calculator, maturity assessment, benchmark tool, vendor comparison matrix), and implemented a distribution system across search, social, email, and paid. Content became the #1 source of qualified inbound pipeline within 12 months.', client: 'B2B SaaS Company (Series A, 35 employees)' },
    relatedServices: [
      { label: 'SEO', href: '/marketing/seo' },
      { label: 'AI Search & LLM Visibility', href: '/marketing/ai-seo' },
      { label: 'Email & Lifecycle', href: '/marketing/email-lifecycle' },
      { label: 'Social Media', href: '/marketing/social' },
    ],
    faqs: [
      { question: 'How is your content approach different from hiring a freelance writer?', answer: 'A freelance writer executes a brief. We build the strategy that determines what briefs to write. The difference: a writer produces an article about a topic you give them. We determine which topics will actually move pipeline, validate search intent, map each piece to a specific buyer journey stage and conversion goal, design the distribution plan, and measure whether the content did its job. Freelance writers are an important part of production, but strategy, topic selection, content architecture, distribution, and measurement are what separate content that performs from content that just exists.' },
      { question: 'What formats do you produce?', answer: 'We produce whatever format serves the content goal and the audience. Written: long-form articles, white papers, case studies, benchmark reports, ebooks, email sequences, landing page copy, ad copy. Visual: infographics, data visualizations, social graphics, slide decks, diagrams. Interactive: ROI calculators, self-assessment tools, product configurators, comparison matrices, quizzes. Video: scripts and storyboards (production handled by your team or our video partners). Audio: podcast strategy and show notes. The format decision is driven by the content\'s job, not by what we are most comfortable producing.' },
      { question: 'How much content do you produce per month?', answer: 'Growth tier: 4-6 pieces/month (articles, case studies, or equivalent). Scale tier: 8-12 pieces/month, including at least one major asset (white paper, interactive tool, benchmark report) per quarter. Enterprise tier: 12-16 pieces/month plus dedicated content strategy for multiple audiences or product lines. Volume is not a vanity metric — more content is not always better. We calibrate volume based on your market, the competitive content landscape, and your growth goals. Some companies need volume to dominate a category. Others need one or two exceptional pieces per week.' },
      { question: 'How do you attribute revenue to content?', answer: 'We use a multi-touch attribution model that tracks the content touchpoints a buyer interacts with before converting. First-touch attribution credits the first piece of content that brought a visitor to your site. Last-touch credits the content that drove the conversion. Multi-touch distributes credit across all content interactions in the buyer\'s journey. We integrate with your CRM to track content-assisted pipeline and closed-won revenue — not just form fills. The dashboard shows which pieces and topics are generating pipeline, which are generating traffic but not converting, and which are generating neither (and should be killed or rewritten).' },
      { question: 'Do you handle content for social media and email too?', answer: 'Yes — content strategy is holistic. A long-form article becomes a Twitter/X thread, a LinkedIn post, an email nurture sequence, and a paid ad. We plan content production with distribution built in: every major piece has its derivative formats specified before production starts. This means you are not paying separately for "blog content," "social content," and "email content" — you are paying for a content engine that produces a core asset and its distribution variants as a single workflow.' },
    ],
    deliverables: [
      'Content strategy document with topic clusters and keyword mapping',
      '90-day editorial calendar with content briefs',
      'Weekly content production (volume varies by tier)',
      'Monthly content performance report with pipeline attribution',
      'Quarterly content strategy review and refresh',
    ],
    timeline: '30-day strategy phase, then ongoing monthly production',
    icon: 'PenTool',
    kpis: ['Content-attributed leads', 'Organic traffic to content', 'Time on page', 'Conversion rate from content', 'Keyword rankings for content topics'],
  },
  {
    slug: 'email-lifecycle',
    title: 'Email & Lifecycle',
    h1: 'Email Marketing & Lifecycle Automation',
    summary: 'Build email programs that nurture leads, onboard customers, and drive retention — automated and measurable.',
    description: 'We design and build email programs across the full customer lifecycle: lead nurture sequences, onboarding flows, re-engagement campaigns, and transactional emails that drive revenue.',
    problem: 'Most companies underinvest in email because it\'s "not exciting." But email consistently delivers the highest ROI of any marketing channel. The gap isn\'t the channel — it\'s the strategy and execution.',
    approach: [
      'Audit: current email performance, list health, segmentation gaps, automation opportunities',
      'Strategy: lifecycle mapping — what emails should trigger at each stage of the customer journey',
      'Build: sequences, templates, automation workflows in your ESP (Klaviyo, HubSpot, Customer.io)',
      'Optimization: A/B testing subject lines, content, timing, and segmentation',
      'Measurement: revenue per email, list growth rate, lifecycle stage conversion rates',
    ],
    longDescription: `Email is the highest-ROI channel in marketing — $36 returned for every $1 spent, consistently, across industries, year after year. And yet most companies underinvest in email because it is not exciting. Nobody brags about their email sequences at a founder dinner. Nobody gets a TechCrunch article written about their onboarding flow. But while everyone is chasing the shiny new channel, email quietly produces more revenue per dollar than SEO, paid media, and social combined for most businesses.

The problem is not the channel — it is that most email marketing is badly done. Batch-and-blast newsletters sent to an entire list regardless of whether the recipient is a customer, a prospect who requested a demo three weeks ago, or someone who signed up for a lead magnet in 2023 and hasn't opened an email since. No segmentation. No behavioral triggers. No lifecycle awareness. Just "here's what we published this month" sent to everyone. That is not email marketing. That is burning list health.

Our email and lifecycle program builds a system that treats every subscriber based on who they are and what they have done. A new lead who downloaded a bottom-funnel comparison guide gets a different sequence than someone who signed up for a top-funnel newsletter. A customer who hasn't logged in for 30 days gets a re-engagement flow. A prospect who visited the pricing page three times but didn't book a call gets a specific offer with social proof and risk reversal. An active customer approaching their renewal date gets an expansion sequence.

We audit your current email setup — list health, deliverability, segmentation, automation gaps, and revenue attribution — then design the lifecycle map: what should trigger at each stage of the customer journey, from anonymous visitor to loyal advocate. We build the sequences, templates, and automation workflows in your ESP (Klaviyo, HubSpot, Customer.io, or whichever platform you use). And we set up measurement that tracks email-attributed revenue — not just opens and clicks — so you know exactly what every sequence and campaign is producing. Email is not exciting. Results are.`,
    whoItsFor: [
      'Founders whose "email strategy" is a monthly newsletter sent to a list that hasn\'t been cleaned in two years',
      'B2B companies with a free trial or freemium product that are not converting trial users to paid — because there is no onboarding or nurture sequence',
      'E-commerce brands with strong acquisition but weak retention — high customer churn driven by zero post-purchase engagement',
      'Companies that migrated to a new ESP and never rebuilt their automations — leaving money on the table with every new subscriber',
      'Sales-led organizations where leads go cold between "booked a demo" and "had the demo" because no email nurture bridges the gap',
    ],
    caseStudySnippet: { metric: 'Email-attributed revenue up 215% and list unsubscribe rate down 62% in 6 months', context: 'Audited email program for a B2B SaaS company sending a single monthly newsletter to 18,000 subscribers. Built 7 automated lifecycle sequences (welcome, lead nurture, trial onboarding, expansion, re-engagement, win-back, and customer newsletter), implemented behavioral segmentation and dynamic content, and cut the list by 4,000 invalid/unengaged addresses. Revenue per email sent increased 215%. Unsubscribe rate dropped from 0.5% to 0.19%.', client: 'B2B SaaS Company (Series A)' },
    relatedServices: [
      { label: 'Content Marketing', href: '/marketing/content' },
      { label: 'Conversion Rate Optimization', href: '/marketing/cro' },
      { label: 'Brand Strategy', href: '/marketing/brand-strategy' },
      { label: 'Paid Media', href: '/marketing/paid-media' },
    ],
    faqs: [
      { question: 'What ESP do you recommend — Klaviyo, HubSpot, Customer.io, or something else?', answer: 'It depends on your business model and use case. Klaviyo is the best choice for e-commerce and DTC — deep integrations with Shopify, powerful segmentation, and excellent visual flow builders. HubSpot Marketing Hub makes sense if you already use HubSpot CRM and want email, CRM, and sales in one platform — the tradeoff is less powerful automation than dedicated ESPs. Customer.io is ideal for B2B SaaS with complex behavioral triggers and multi-channel messaging (email, push, SMS, in-app). We will recommend based on your stack, your automation ambitions, and your budget — and we work with all major ESPs.' },
      { question: 'How is lifecycle email different from a newsletter?', answer: 'A newsletter is a one-to-many broadcast sent to your entire list on a schedule (weekly, monthly). Lifecycle email is a one-to-one automated message triggered by what a specific person did or did not do — signed up, downloaded something, visited a pricing page, became a customer, stopped using the product, let their subscription lapse. Newsletters keep your brand top of mind. Lifecycle emails drive revenue by responding to behavior with the right message at the right time. Most companies need both, but lifecycle email typically produces 3-5× the revenue of broadcast newsletters on a per-email basis because the messaging is relevant to what the recipient is actually doing.' },
      { question: 'How do we grow our email list without buying lists or using shady tactics?', answer: 'Lead magnets — genuinely useful resources gated behind an email signup: ROI calculators, benchmark reports, templates, frameworks, self-assessments, comparison guides. The key is that the lead magnet must be worth the "price" of an email address. A PDF of "10 tips for better marketing" is not worth an email address. A customized benchmark report comparing your company\'s metrics to industry peers is. We also use content upgrades (downloadable versions of specific articles), tool and calculator embeds that require email for results, and gated video content (webinars, workshops, product demos). The principle: give something of genuine value, and people will happily give you their email.' },
      { question: 'What kind of results should we expect?', answer: 'Industry benchmarks vary widely by business model, but here are realistic expectations within 90 days of implementing a proper lifecycle email program: automated welcome sequence: 50-70% open rate, 10-20% click rate. Lead nurture sequences: 35-50% open rate, 5-12% click rate. Re-engagement campaigns: 15-25% open rate, 3-8% click rate, 5-15% of unengaged subscribers reactivated. Overall email-attributed revenue: typically 10-30% of total digital revenue for B2B SaaS, 20-40% for e-commerce. The biggest variable is list quality — a clean, engaged list outperforms a bloated, unengaged list by 3-5× on every metric.' },
      { question: 'Do you handle email deliverability and sender reputation?', answer: 'Yes — deliverability is table stakes. During the audit, we check: SPF, DKIM, and DMARC configuration; sender reputation and domain authority with major inbox providers; spam complaint rate; bounce rate; and list hygiene (invalid addresses, spam traps, inactive subscribers). We fix technical issues, implement sunset policies for unengaged subscribers, and set up warm-up protocols for new sending domains and IPs. If your emails are landing in spam or promotions tabs, we fix that before we send a single new email.' },
    ],
    deliverables: [
      'Email audit with performance benchmarks and opportunity sizing',
      'Lifecycle map with trigger definitions and content strategy',
      '5-7 email sequences built and tested (welcome, nurture, re-engagement, etc.)',
      'Monthly email performance dashboard with revenue attribution',
      'Quarterly A/B testing roadmap and results',
    ],
    timeline: '45-day build, then ongoing monthly optimization',
    icon: 'Mail',
    kpis: ['Email-attributed revenue', 'Open rate', 'Click rate', 'List growth rate', 'Unsubscribe rate'],
  },
  {
    slug: 'brand-strategy',
    title: 'Brand Strategy',
    h1: 'Brand Strategy That Positions You as the Obvious Choice',
    summary: 'Positioning, messaging, and brand architecture that makes your company the default answer in your category.',
    description: 'We help founders define who they are, who they serve, and why it matters. The output is a brand strategy that guides every marketing decision and makes your positioning crystal clear to buyers.',
    problem: 'Most founders can describe what they do but struggle to articulate why a prospect should choose them over any other option. Brand strategy closes that gap.',
    approach: [
      'Discovery: stakeholder interviews, customer research, competitive landscape mapping',
      'Positioning: define your unique value proposition, category, and differentiation',
      'Messaging: core narrative, value propositions by audience, elevator pitch, taglines',
      'Brand architecture: master brand + sub-brand relationships, naming conventions',
      'Activation: how the brand shows up across website, sales deck, social, and product',
    ],
    longDescription: `Most founders can describe what their company does. Very few can articulate — in a single sentence — why a prospect should choose them over every other option. That gap is not a copywriting problem. It is a brand strategy problem. And it is the most expensive gap in your business because it compounds across every marketing dollar you spend, every sales conversation your team has, and every prospect who visits your website and leaves without understanding why you are different.

Brand strategy is the discipline of defining who you are, who you serve, why it matters, and — crucially — why you and not someone else. It is not a logo. It is not a tagline. It is not a color palette. It is the set of decisions that determine how your company is perceived by the people who need to perceive it accurately: prospects, customers, employees, investors, partners, and the market at large. A good brand strategy makes your marketing more effective because every message reinforces the same positioning. It makes your sales process faster because prospects already understand why you are different before the first call. It makes hiring easier because candidates self-select into (or out of) your mission. It makes pricing less contentious because the value is clear before the number appears.

Our brand strategy engagement follows a structured process. Discovery starts with stakeholder interviews to understand the internal perception of the brand, customer research to understand the external perception, and competitive landscape mapping to understand the positioning territory. Positioning defines your unique value proposition, your category (or whether you should create a new one), your differentiation axis, and your ideal customer profile — the "who" and "why" that anchors everything. Messaging translates positioning into words: a core narrative, audience-specific value propositions, an elevator pitch, taglines, and the key messages that every team member should be able to deliver from memory. Brand architecture defines the relationships between brands if you have multiple products, divisions, or tiers.

The output is not a 50-page deck that sits in a Google Drive folder. It is a practical strategy that guides every marketing and sales decision — and that your team actually uses. We include a brand activation guide that shows exactly how the strategy translates into website copy, sales deck structure, social media presence, pitch narratives, and product positioning. Strategy without activation is just an expensive document.`,
    whoItsFor: [
      'Founders whose company has outgrown its original positioning — what worked at seed stage no longer fits the Series A reality and the growth ambitions ahead',
      'Companies entering a crowded category where every competitor sounds the same — and needing a sharp positioning that creates a "them vs. us" distinction in the buyer\'s mind',
      'Startups creating a new category who need to define the space in a way that makes them the default choice, not one of many options',
      'Founders who have raised a round and are about to scale go-to-market — and need the positioning to be airtight before spending significant marketing dollars',
      'Companies that have grown through multiple acquisitions or product expansions and now have a fragmented brand that confuses customers and employees alike',
    ],
    caseStudySnippet: { metric: 'Win rate improved 34% and average deal size grew 28% within 6 months of brand repositioning', context: 'Repositioned a B2B services company from a generic "digital transformation partner" to a specific category leader in "revenue operations for professional services firms." Work included stakeholder interviews with 12 team members, customer research with 18 clients and lost prospects, competitive positioning analysis across 8 competitors, and a full messaging playbook with activation guides for website, sales deck, social, and outbound sequences.', client: 'Professional Services Firm (120 employees)' },
    relatedServices: [
      { label: 'Visual Identity', href: '/marketing/visual-identity' },
      { label: 'Content Marketing', href: '/marketing/content' },
      { label: 'Conversion Rate Optimization', href: '/marketing/cro' },
      { label: 'Social Media', href: '/marketing/social' },
    ],
    faqs: [
      { question: 'How is brand strategy different from messaging or copywriting?', answer: 'Brand strategy is the foundation. It defines who you are, who you serve, your category, your differentiation, and your positioning. Messaging translates that strategy into words — value propositions, narratives, taglines, key messages. Copywriting is the final layer — actual text on a website, sales deck, or ad. Strategy without good messaging is abstract. Messaging without strategy is arbitrary. Copywriting without either is random words. We do all three in sequence: strategy first, then messaging, then activation (which includes copywriting for priority touchpoints).' },
      { question: 'We already have a brand — do we really need a brand strategy engagement?', answer: 'You have a brand whether you have a strategy or not — your brand is what people believe about you based on every interaction they have had. The question is whether the brand you have is the brand you want. If prospects consistently misunderstand what you do, if your sales team struggles to differentiate against competitors, if your marketing feels inconsistent, or if your positioning made sense at $1M in revenue but feels small at $10M — you have a brand strategy gap. The engagement defines and aligns what currently exists in fragments. It is not creating a brand from scratch; it is making the brand you have intentional, consistent, and effective.' },
      { question: 'How do you involve our team in the process?', answer: 'Brand strategy cannot be invented by an outsider and handed over like a finished product — it has to reflect the company\'s actual DNA. We start with stakeholder interviews (founders, leadership, key team members) to understand the internal brand perception, aspirations, and tensions. We conduct customer research (interviews, surveys, win/loss analysis) to understand the external perception. We review competitor positioning to understand the landscape. The strategy is shaped by what we discover, not by a template. We present initial positioning options and iterate with your leadership team. The final deliverable is co-created, not dictated.' },
      { question: 'Will this help with our website and marketing materials?', answer: 'Yes — that is a primary output. The brand activation guide included in every engagement shows exactly how the positioning translates into specific touchpoints: website (homepage H1, hero subhead, about page narrative, service page structure), sales deck (pitch structure, objection handling, competitive differentiation slides), social media (bio, content pillars, voice guidelines), and outbound (email templates, LinkedIn messaging, call scripts). You will walk away with not just a strategy document but practical assets your team can use immediately.' },
      { question: 'How long does a brand strategy engagement take?', answer: '4-6 weeks is typical. Weeks 1-2: discovery — stakeholder interviews, customer research, competitive analysis. Week 3: positioning development — we synthesize findings into 2-3 positioning directions and present them for discussion. Week 4: selected direction refined into full brand strategy and messaging framework. Weeks 5-6: activation guide development, final presentation, and team workshop. We can accelerate to 3 weeks for urgent needs (pre-fundraising, pre-launch), but the standard timeline allows for the reflection and iteration that produce better work.' },
    ],
    deliverables: [
      'Brand strategy document (positioning, messaging, architecture)',
      'Messaging playbook with audience-specific value propositions',
      'Competitive positioning map with differentiation strategy',
      'Brand activation guide for website, sales, and social',
      'Founder narrative and story framework',
    ],
    timeline: '4-6 week engagement',
    icon: 'Compass',
    kpis: ['Brand awareness', 'Share of voice', 'Win rate improvement', 'Sales cycle reduction', 'Premium pricing power'],
  },
  {
    slug: 'visual-identity',
    title: 'Visual Identity',
    h1: 'Visual Identity Systems That Build Recognition and Trust',
    summary: 'Logo, color systems, typography, and design language — a complete visual identity that scales across every touchpoint.',
    description: 'We design visual identity systems that make brands recognizable, trustworthy, and consistent across every channel. From logo to design system to brand guidelines.',
    problem: 'Inconsistent visual identity erodes trust. Every prospect touchpoint — website, pitch deck, social, product — needs to feel like the same company. Most startups piece this together and it shows.',
    approach: [
      'Discovery: brand audit, competitor visual analysis, stakeholder alignment on aesthetic direction',
      'Concept: 2-3 visual directions with logo, color, typography, and sample applications',
      'Refinement: iterate on chosen direction based on feedback and application testing',
      'System: build the full design system — colors, typography, spacing, components, iconography',
      'Delivery: brand guidelines document, asset library, template files for key applications',
    ],
    longDescription: `Visual identity is not decoration. It is the first thing prospects perceive about your company — and that perception forms in under 50 milliseconds. Before they read a word of your positioning. Before they review your case studies. Before they check your pricing. They see your logo, your colors, your typography, your layout — and they make a snap judgment: "This looks credible" or "This looks like a side project." That judgment is not fair. It is also real, and it affects conversion rates, willingness to pay, and trust.

Most startups piece together a visual identity from Fiverr logos, Canva templates, and whatever the founding team could cobble together. It works at the beginning because nobody expects a two-person startup to look like Apple. But there is a point — usually around $1-3M in revenue or the first serious fundraise — where a fragmented visual identity becomes a drag on growth. Enterprise prospects notice. Investors notice. Potential hires notice. The brand looks like a project when it needs to look like a company.

We design visual identity systems, not just logos. A logo is one component. A system is the complete visual language — logo family (primary, secondary, mark, favicon), color system with accessibility-validated palettes that work across light and dark backgrounds, typography system with web and print specifications including fallback stacks and loading strategies, spacing and layout rules, iconography, photography and illustration style, and data visualization standards. The system ensures that whether someone encounters your brand on a website, a pitch deck, a social post, a trade show booth, or a product interface — it feels like the same company.

Our process progresses from discovery (brand audit, competitor visual analysis, stakeholder alignment on aesthetic direction) to concept (2-3 visual directions presented as real applications — website hero, business card, social post — not abstract mood boards) to refinement (iterating on the chosen direction based on feedback and application testing) to system build (the full design system with component library) to delivery (brand guidelines document, organized asset library, and template files for priority applications like pitch decks, social media, and one-pagers). You do not just get a logo. You get a design language that your team can use to create on-brand assets without calling us every time.`,
    whoItsFor: [
      'Founders who are embarrassed to hand out their business card or send their pitch deck — and know the visual identity is costing them credibility with prospects, investors, and hires',
      'Companies that have a logo but no system — the logo gets stretched, recolored, and misused because nobody has guidelines, and every new asset feels like starting from scratch',
      'Startups raising a round or launching a product where first impressions with sophisticated audiences (investors, enterprise buyers, top-tier candidates) will determine outcomes',
      'Companies that merged, pivoted, or expanded into new offerings and whose current visual identity reflects a previous version of the business',
      'Marketing leaders who have a strong brand strategy and messaging but a visual identity that fails to match the sophistication of the strategy — and undermines it at every touchpoint',
    ],
    caseStudySnippet: { metric: 'Brand recall increased 47% and website conversion rate improved 22% post-redesign', context: 'Designed a complete visual identity system for a B2B SaaS company whose existing brand was built from a $500 Fiverr logo and inconsistent DIY templates. Created logo family (4 lockups), color system (primary palette with WCAG AA validation, dark mode variants), typography system (Geist + editor serif), icon library (60+ custom icons), and brand guidelines with component templates for website, sales deck, social, and product UI. The new identity was deployed across website, product, and all go-to-market materials in 8 weeks.', client: 'B2B SaaS Company (Series A, 40 employees)' },
    relatedServices: [
      { label: 'Brand Strategy', href: '/marketing/brand-strategy' },
      { label: 'Content Marketing', href: '/marketing/content' },
      { label: 'Conversion Rate Optimization', href: '/marketing/cro' },
      { label: 'Social Media', href: '/marketing/social' },
    ],
    faqs: [
      { question: 'Do I need brand strategy before visual identity?', answer: 'Strongly recommended but not required. Visual identity is the expression of brand strategy — colors, typography, and logo should be chosen because they communicate specific positioning and values, not because the founder likes purple. If you do not have a brand strategy, we can do a condensed strategy sprint (1-2 weeks) before the visual identity work to align on positioning, personality, and target perception. If you already have a clear strategy and just need the visual system to express it, we can start with visual identity directly and use your existing strategy as the brief.' },
      { question: 'What is included in the asset library?', answer: 'Logo files in every format you will ever need: SVG, EPS, AI (editable vectors), PNG (transparent background, multiple sizes), and favicon set. Color swatches for Figma, Adobe CC, and code (CSS custom properties, Tailwind config). Typography files with licenses and loading instructions. Icon library in SVG and as a Figma component set. Templates for: pitch deck (Google Slides + PowerPoint), social media (LinkedIn, Twitter/X, Instagram post and story templates), one-pagers and case studies (Google Docs + InDesign), email signature, and business card. The goal is that your team can produce on-brand materials for 80% of common use cases without needing a designer.' },
      { question: 'How do you handle the logo design process specifically?', answer: 'Logo design is a structured process, not a design contest. We start with a creative brief aligned to your brand strategy (or do a strategy sprint if one does not exist). We present 2-3 distinct logo directions — each with primary logo, secondary/stacked variant, mark/icon, and sample applications on website hero, business card, and social avatar so you can evaluate the logo in context, not in isolation. You select the direction, and we refine through 2-3 rounds of feedback. The final deliverable is not one logo file but a logo system: primary horizontal lockup, secondary stacked lockup, brand mark (icon only for favicons, app icons, social avatars), one-color and reversed versions, and clear spacing/sizing rules. No "designer choice" ambiguity.' },
      { question: 'Can you work with our existing logo or brand elements?', answer: 'Yes — we do not insist on starting from scratch if you have equity in your existing identity. Common scenarios: (1) logo evolution — refining and modernizing your existing logo rather than replacing it; (2) system expansion — keeping the logo but building the color, typography, iconography, and template systems around it; (3) partial redesign — redesigning the mark but keeping the wordmark, or vice versa. We will give you an honest assessment: if your existing identity has value and recognition worth preserving, we will evolve it. If it is holding you back, we will recommend a fresh start and explain why.' },
      { question: 'How long until we have a new visual identity live?', answer: '4-8 weeks depending on scope. Logo-only refresh: 3-4 weeks. Full visual identity system with brand guidelines and asset library: 6-8 weeks. The timeline can compress for urgent needs (fundraising, launch deadline) but creative work benefits from space for reflection and iteration. Our typical cadence: discovery week 1, concepts weeks 2-3, refinement weeks 4-5, system build weeks 5-7, delivery and knowledge transfer week 8. Implementation on your website, product, and materials is scoped separately or handled by your team using the guidelines and component library we provide.' },
    ],
    deliverables: [
      'Logo system (primary, secondary, mark, favicon, social avatars)',
      'Color system with accessibility-validated palette',
      'Typography system with web and print specifications',
      'Brand guidelines document (digital + PDF)',
      'Asset library with templates for social, pitch deck, and documents',
    ],
    timeline: '4-8 week engagement depending on scope',
    icon: 'Palette',
    kpis: ['Brand consistency score', 'Brand recall', 'Perceived trustworthiness', 'Design system adoption', 'Time-to-market for new assets'],
  },
  {
    slug: 'cro',
    title: 'CRO',
    h1: 'Conversion Rate Optimization — Turn More Visitors Into Pipeline',
    summary: 'Systematic A/B testing and conversion optimization for your website and landing pages — backed by data, not opinions.',
    description: 'We run a disciplined CRO program: research → hypothesize → test → learn → repeat. Every experiment ties to revenue impact, and we never test without a clear hypothesis and success metric.',
    problem: 'Most CRO is random button-color testing. Real CRO is a systematic process of understanding user behavior, identifying friction points, and running statistically valid experiments that compound over time.',
    approach: [
      'Research: analytics audit, heatmaps, session recordings, user testing, survey data',
      'Hypothesis: prioritize test ideas by potential revenue impact × implementation effort',
      'Design: create test variants with clear hypotheses and success metrics',
      'Test: run A/B or multivariate tests with proper statistical methodology',
      'Learn: document insights, scale winners, kill losers, feed learnings into next cycle',
    ],
    longDescription: `Most CRO is theater. Someone reads an article about how a red button outperformed a green button by 2.3%, so they change their buttons — never mind that the test was run on an e-commerce site with a completely different audience, product, and context. Or they launch an A/B test on their pricing page that gets 400 visitors in two weeks, declare a winner, and call it optimization. None of this is CRO. This is random tweaking with a veneer of data.

Real conversion rate optimization is a systematic process of understanding user behavior, identifying where and why prospects drop off, forming hypotheses about what would change their behavior, testing those hypotheses with proper statistical methodology, and compounding the learnings over time. It is not about finding one big win — though those happen. It is about building an optimization engine that lifts conversion rates quarter after quarter. A 5% improvement in conversion rate this quarter and a 5% improvement next quarter compounds to 10.25% more pipeline from the same traffic — without spending an additional dollar on acquisition.

Our CRO methodology follows a disciplined cycle. Research phase: we analyze your analytics to identify drop-off points and underperforming pages, deploy heatmaps and session recordings to understand actual user behavior (what they click, where they scroll, where they hesitate), conduct user testing with real prospects to hear the objections and confusion points in their own words, and analyze form abandonment and survey data. Hypothesis phase: we prioritize test ideas using a framework of potential revenue impact multiplied by implementation effort — high-impact, low-effort tests go first. We never test without a clear hypothesis: "We believe that changing X to Y will increase conversion rate by Z because [user insight]." Design phase: we create test variants with clear success metrics. Test phase: we run A/B or multivariate tests with proper sample size calculations and statistical significance thresholds — no peeking, no early stopping, no declaring winners at 60% confidence. Learn phase: we document every outcome, successful or not, because a "failed" test that teaches you something about your users is still valuable.

The outcome over 6-12 months is typically a 20-50% improvement in conversion rate — not from one magic test, but from the compound effect of 15-30 experiments that each lift conversion by 2-5%. More importantly, you build institutional knowledge about what works for your specific audience. That knowledge is a competitive advantage that compounds for years.`,
    whoItsFor: [
      'B2B companies spending $50K+/month on paid acquisition who are leaving pipeline on the table because their landing pages convert at 1-3%',
      'SaaS companies with a healthy top of funnel but a demo request rate below industry benchmarks — and no systematic process for figuring out why',
      'Marketing leaders who are confident their traffic is qualified but their conversion rate has been flat for a year and nobody can explain why',
      'E-commerce brands with decent traffic and add-to-cart rates but a checkout abandonment problem that nobody has systematically investigated',
      'Founders who recently redesigned their website and watched conversion rates drop — and need to diagnose whether it is the design, the messaging, or something else',
    ],
    caseStudySnippet: { metric: 'Lead-to-demo conversion rate improved 2.8× in 9 months — from 2.1% to 5.9%', context: 'Ran a 9-month CRO program for a B2B SaaS company. Research phase identified 3 critical friction points: hero messaging confused first-time visitors, the demo request form was too long (11 fields), and the pricing page lacked social proof. Ran 18 A/B tests, 14 reached statistical significance, 11 produced positive lifts. Implemented wins and built a CRO playbook for the internal team to continue testing post-engagement. The compound effect of all winning variants: 2.8× more demos from the same traffic.', client: 'B2B SaaS Platform (Series B)' },
    relatedServices: [
      { label: 'Paid Media', href: '/marketing/paid-media' },
      { label: 'Content Marketing', href: '/marketing/content' },
      { label: 'Brand Strategy', href: '/marketing/brand-strategy' },
      { label: 'SEO', href: '/marketing/seo' },
    ],
    faqs: [
      { question: 'How much traffic do we need for meaningful A/B testing?', answer: 'To reach statistical significance on a conversion rate test, you typically need at least 1,000 conversions per variant — not visitors, conversions. If your page converts at 3%, that means roughly 33,000 visitors per variant, or 66,000+ for a simple A/B test. Sites with lower traffic can still do CRO — they just use different methods: user testing (5-8 users will reveal 85% of usability issues), session recordings, heatmaps, exit-intent surveys, and expert heuristic evaluations. These methods do not require statistical significance to identify high-confidence improvements. We match the methodology to your traffic volume.' },
      { question: 'What is the difference between CRO and just making a better website?', answer: 'Making a better website is about opinion — someone (designer, founder, committee) decides what "better" looks like and builds it. CRO is about evidence — you form a hypothesis based on user data, test it against the current version, and let the data decide which is better. Sometimes the data confirms the expert opinion. Often it contradicts it. We have seen "uglier" pages outperform "beautiful" pages because the ugly page communicated value more clearly. CRO replaces "I think" with "the data shows." The best approach combines both: strong design and UX expertise to generate good hypotheses, and rigorous testing to validate them.' },
      { question: 'How long before we see results from CRO?', answer: 'The research phase delivers insights within 2-4 weeks — you will have a prioritized list of problems and test ideas before any test runs. Quick wins (fixing obvious UX issues, shortening forms, adding missing information, clarifying confusing messaging) can be implemented immediately and typically show impact within days. Formal A/B testing takes longer: 2-4 weeks per test to reach significance depending on traffic volume. Most clients see meaningful conversion improvement within 60-90 days. The compound effect of sustained testing over 6-12 months is where CRO really pays — the difference between a 10% lift from quick fixes and a 50%+ lift from sustained optimization.' },
      { question: 'Do you use specific tools for CRO research and testing?', answer: 'Research stack: Microsoft Clarity or Hotjar (heatmaps, session recordings, feedback widgets), Google Analytics 4 (behavior flow, conversion paths, drop-off analysis), and user testing platforms (UserTesting, Maze). A/B testing: Vercel Edge Config for lightweight tests on Next.js sites, Google Optimize alternatives like VWO or Convert for more complex tests, or native experimentation platforms like Eppo or Statsig for product-led companies. We select tools based on your tech stack — we are not tied to any specific vendor and will not force you to implement a new tool if your existing one works.' },
      { question: 'Can you do CRO if we do not have a dedicated engineering resource for test implementation?', answer: 'Yes — this is the most common situation. We handle test implementation using tools that do not require engineering involvement for most tests: visual editors (VWO, Convert), edge-based testing (Vercel Edge Config with minimal code changes), and client-side testing scripts. For tests that require backend changes or complex frontend modifications, we provide the implementation as part of the engagement. You do not need an in-house engineering team to run a serious CRO program. You need the right tools and a testing methodology — both of which we provide.' },
    ],
    deliverables: [
      'CRO audit with prioritized opportunity map',
      'Testing roadmap with 90-day experiment calendar',
      'Monthly test results report with revenue impact analysis',
      'Winning variant implementation across site',
      'CRO playbook documenting learnings and best practices',
    ],
    timeline: '30-day research phase, then ongoing monthly testing cadence',
    icon: 'TrendingUp',
    kpis: ['Conversion rate', 'Revenue per visitor', 'Lead form completion rate', 'Bounce rate', 'Average order value'],
  },
  {
    slug: 'social',
    title: 'Social Media',
    h1: 'Social Media That Builds Community, Not Just Followers',
    summary: 'Organic and paid social strategy across LinkedIn, Twitter/X, Instagram, and TikTok — built for engagement that converts.',
    description: 'We build social media programs that position founders as thought leaders, create community around the brand, and generate inbound pipeline — not just vanity metrics.',
    problem: 'Most social media strategies chase follower counts and likes. Founders need social that builds authority, creates genuine engagement with ICPs, and generates measurable pipeline.',
    approach: [
      'Audit: current social performance, audience analysis, content gap assessment',
      'Strategy: platform selection, content pillars, posting cadence, engagement playbook',
      'Production: content creation — posts, threads, videos, carousels, stories',
      'Engagement: comment strategy, community management, founder ghostwriting for LinkedIn/Twitter',
      'Measurement: engagement rate, follower quality, social-attributed pipeline and revenue',
    ],
    longDescription: `Social media for businesses is not about going viral. It is about being present, credible, and useful in the places where your prospects spend attention and form opinions. For most B2B companies, that means LinkedIn and Twitter/X. For consumer and DTC brands, Instagram and TikTok. The common mistake is treating social as a publishing channel: post the blog link, post the product update, post the company photo. That is not social media. That is a broadcast feed nobody asked for and nobody engages with.

Effective social media for business does three things. First, it builds authority: your founder and key executives share genuine insights, observations, and lessons from their work — not "thought leadership" platitudes, but specific, actionable perspectives that make an ICP think "this person actually knows what they are talking about." Second, it builds community: you engage with your audience's content, respond to comments thoughtfully, participate in industry conversations, and create spaces where your ICP gathers. Third, it generates pipeline: not by posting "book a demo" links, but by building enough trust and visibility that when a prospect is ready to buy, your company is the first one they think of.

Our social media program covers strategy, production, engagement, and measurement. Strategy: we determine which platforms are worth your time based on where your ICP actually spends attention, define content pillars that align with your brand positioning and business goals, and build a posting cadence that is sustainable. Production: we create the content — posts, threads, videos, carousels, stories — in your brand voice. Engagement: we manage community interactions, execute proactive engagement, and provide founder ghostwriting for LinkedIn and Twitter/X so your leadership team builds personal brands without spending hours composing posts. Measurement: we track what matters — engagement rate, ICP follower growth, social-attributed leads, and pipeline — not just vanity metrics like follower count and impressions.`,
    whoItsFor: [
      'B2B founders who know they should be active on LinkedIn and Twitter/X but do not have the time or inclination to write posts every day',
      'Companies whose social presence is a graveyard of auto-shared blog links with zero comments and single-digit likes — and who want to turn it into a pipeline channel',
      'Marketing leaders who have a social media manager posting consistently but no strategy behind it — content is not tied to business goals or audience research',
      'Founders who have built a personal brand on social but have not translated that visibility into pipeline — high engagement, low conversion',
      'Companies in a competitive hiring market where social presence is a recruiting advantage — top candidates evaluate company culture through social media before they apply',
    ],
    caseStudySnippet: { metric: 'LinkedIn following grew from 800 to 14,000 in 12 months with 4.2% average engagement rate', context: 'Built B2B social media program from near-zero for a professional services firm. Developed 4 content pillars mapped to ICP pain points, produced 16-20 LinkedIn posts and 8-12 Twitter/X threads per month, and implemented a founder ghostwriting program for the CEO and two partners. Social-attributed inbound leads went from zero to 12-15 qualified demos per month.', client: 'Professional Services Firm (75 employees)' },
    relatedServices: [
      { label: 'Content Marketing', href: '/marketing/content' },
      { label: 'Brand Strategy', href: '/marketing/brand-strategy' },
      { label: 'Paid Media', href: '/marketing/paid-media' },
      { label: 'Email & Lifecycle', href: '/marketing/email-lifecycle' },
    ],
    faqs: [
      { question: 'Which social platforms should my business be on?', answer: 'The platforms where your ICP spends attention — not the platforms that are trendy. For B2B: LinkedIn is non-negotiable for most industries. Twitter/X is strong for tech, SaaS, media, and finance. For B2C/DTC: Instagram and TikTok are primary, with Facebook still relevant for audiences 35+. We audit where your ICP is active, where your competitors are and are not present, and which platforms have organic reach that justifies the content investment. We will tell you to skip a platform if it does not make sense.' },
      { question: 'How does founder ghostwriting work?', answer: 'We interview you for 30-45 minutes every two weeks — we ask about what you are working on, what you are learning, what you are frustrated by, what you are seeing in the market. From that conversation, we draft 8-12 LinkedIn posts and 4-6 Twitter/X threads in your voice — your actual observations, opinions, and stories, not generic "5 leadership lessons" content. You review, adjust as needed, and approve. Most founders spend roughly 90 minutes per month total. The quality depends entirely on the quality of the source material — our job is to extract, structure, and polish what you already know.' },
      { question: 'How do you measure social media ROI?', answer: 'We track the full attribution chain: post to profile visit to website visit to conversion action to pipeline to revenue. UTMs on social links track website visits and conversions. CRM integration tracks social-attributed pipeline and closed revenue. We also measure softer but real indicators: inbound mentions, podcast and speaking invitations that originated from social visibility, and hiring inbound that came from social presence. Social ROI is real — it is just not always linear. A prospect who follows you for six months before booking a demo may never click a UTM link, but social was a primary influence channel.' },
      { question: 'How is your approach different from hiring a social media manager?', answer: 'A social media manager typically handles day-to-day posting, engagement, and community management — they execute the function. Our role is strategy, content creation, and measurement — more senior, more strategic. Many of our clients have an in-house social media manager who handles community engagement and reactive posting while we provide the strategy, content calendar, and high-quality post drafts. Other clients outsource the entire function to us. The right model depends on your team and budget.' },
      { question: 'How much content do you produce per month?', answer: 'Typical B2B: 12-16 LinkedIn posts/month, 8-10 Twitter/X posts or threads/month, and 4-6 pieces of derivative content (carousels, video clips, or infographics repurposed from long-form content). Typical DTC/B2C: 16-20 Instagram posts/month, 30+ Stories, 8-12 TikToks or Reels, and platform-specific adaptations — not cross-posting the same video everywhere. Volume is calibrated to what your audience can actually consume and engage with. Posting 5 times a day on LinkedIn will get you muted, not followed.' },
    ],
    deliverables: [
      'Social media audit with competitive benchmarking',
      'Content strategy with platform-specific content pillars',
      'Monthly content calendar with 12-20 posts per platform',
      'Weekly engagement report with growth and pipeline metrics',
      'Quarterly strategy review with audience insights',
    ],
    timeline: '30-day strategy and setup, then ongoing monthly production',
    icon: 'Share2',
    kpis: ['Engagement rate', 'Follower growth (ICP)', 'Social-attributed leads', 'Share of voice', 'Brand mentions'],
  },
  {
    slug: 'audit',
    title: 'Free Marketing Audit',
    h1: 'Free Marketing & AI Search Audit',
    summary: 'Get a 12-page diagnostic of your marketing — SEO, paid media, content, conversion, and AI visibility — delivered within 48 hours.',
    description: 'We review your website, SEO, paid media, content, conversion paths, CRM tracking, competitive landscape, and AI search visibility. You receive a prioritized report within 48 hours.',
    problem: '',
    approach: [],
    deliverables: [
      'Technical SEO audit with prioritized fix list',
      'Conversion path analysis with friction point identification',
      'Competitive gap analysis — what competitors do that you don\'t',
      'AI search visibility assessment — are LLMs citing you?',
      'Prioritized 90-day action plan with effort × impact scoring',
    ],
    longDescription: "",
    whoItsFor: [],
    caseStudySnippet: null,
    relatedServices: [],
    faqs: [],
    timeline: 'Delivered within 48 hours',
    icon: 'ClipboardCheck',
    kpis: [],
  },
];

// ── TECH SPOKE ─────────────────────────────────────────────────

const techSubServices: SubService[] = [
  {
    slug: 'websites',
    title: 'Websites',
    h1: 'High-Performance Marketing Websites That Convert',
    summary: 'Custom websites built for speed, SEO, and conversion — not just pretty designs that underperform.',
    description: 'We build marketing websites on Next.js that load fast, rank well, and convert visitors into pipeline. Every site ships with a CMS, analytics, and conversion tracking built in.',
    problem: 'Most agencies build beautiful websites that are slow, hard to update, and disconnected from your CRM and analytics. Founders need sites that are marketing machines, not digital brochures.',
    approach: [
      'Discovery: stakeholder interviews, competitor analysis, conversion goal mapping',
      'Design: wireframes → high-fidelity designs → prototype (Figma)',
      'Build: Next.js, Tailwind CSS, headless CMS (Sanity/Contentful), Vercel deployment',
      'Integrate: CRM, analytics, email, chat, booking — full marketing stack',
      'Launch: performance audit, SEO check, 301 redirects, analytics QA',
    ],
    longDescription: `Most agency websites are digital brochures — beautiful to look at, but slow to load, hard to update, and disconnected from the CRM and analytics tools that tell you whether the site is actually working. They look great in a portfolio. They underperform in production. We build a different kind of website: one engineered from day one to be fast, findable, and conversion-optimized.

Our website builds start with conversion architecture, not visual design. Before we open Figma, we map the conversion paths: where visitors enter, what they need to believe before they will act, and what action we want them to take at each stage. The design serves the conversion strategy — not the other way around. The result is a site that looks polished and professional but, more importantly, turns visitors into pipeline.

Technically, every website we build is a Next.js application deployed on Vercel — which means server-side rendering for SEO, static generation for speed, and edge functions for personalization. We pair it with a headless CMS (Sanity or Contentful) so your team can update content without touching code or breaking the build. Performance is non-negotiable: every site ships with a Lighthouse score of 90+, Core Web Vitals in the green, and load times under 2.5 seconds on mobile 4G. We do not launch until the numbers prove the site is fast.

A website is not a project with a finish line — it is a living marketing asset. We build with that in mind: clean, documented code your team (or any competent developer) can extend; content architecture designed to scale as your product and audience grow; analytics and event tracking configured so you know exactly which pages and CTAs drive pipeline. We build the foundation. Your marketing team builds the growth on top of it.`,
    whoItsFor: [
      'Founders whose current website loads in 4+ seconds on mobile and is hemorrhaging conversions and search rankings because of it',
      'Marketing leaders stuck with a WordPress or Webflow site that takes a developer two weeks to make a simple content change',
      'Companies that have raised a round and need their website to match the credibility of their new valuation — not look like the seed-stage hack job it started as',
      'Founders whose site gets traffic but does not convert — visitors browse and leave, and nobody can explain why',
      'Companies rebranding or repositioning and needing a website that reflects the new strategy, not the old one',
    ],
    caseStudySnippet: { metric: 'PageSpeed score from 34 to 98, organic traffic up 89%, and conversion rate improved 2.1× within 90 days of launch', context: 'Rebuilt a dated, slow WordPress website for a B2B services firm as a high-performance Next.js site with Sanity CMS. Migrated 200+ blog posts without SEO loss, implemented full schema markup including Organization, Service, FAQ, and Article schemas. Post-launch: Core Web Vitals all green, bounce rate down 41%, average session duration up 2.3 minutes.', client: 'Professional Services Firm (120 employees)' },
    relatedServices: [
      { label: 'Next.js SEO', href: '/tech/nextjs-seo' },
      { label: 'Performance Optimization', href: '/tech/performance' },
      { label: 'Integrations', href: '/tech/integrations' },
      { label: 'MVP Development', href: '/tech/mvp' },
    ],
    faqs: [
      { question: 'How long does a website build take?', answer: '6-10 weeks is our standard timeline for a marketing website up to 20 pages. Week 1-2: discovery, information architecture, and wireframes. Week 3-4: high-fidelity design in Figma. Week 5-8: development — Next.js frontend, headless CMS setup, content migration, integrations. Week 9: QA, performance optimization, browser and device testing. Week 10: launch, 301 redirects, analytics verification, and CMS training for your team. Complex sites (more pages, custom animations, multi-language) add 2-4 weeks. Tight timelines are possible — we have launched in 4 weeks when scope and decisions moved fast. We will give you a precise timeline after the scoping call, not a range that expands later.' },
      { question: 'Why Next.js instead of WordPress or Webflow?', answer: 'WordPress and Webflow are fine tools — they are just optimized for different outcomes. WordPress trades performance for plugin flexibility and often ends up slow, insecure, and expensive to maintain. Webflow gives you visual design freedom but limits what you can do with dynamic content, A/B testing, and advanced SEO. Next.js gives us complete control over performance, SEO, and user experience: server-side rendering so search engines see fully rendered pages, static generation for sub-millisecond load times on content pages, and a component architecture that makes future changes faster and cheaper. For companies where the website is a primary revenue driver, the performance and flexibility difference matters.' },
      { question: 'Do you handle content migration from our old site?', answer: 'Yes. We migrate blog posts, case studies, landing pages, and any other content you want to carry forward. We preserve URLs or set up proper 301 redirects for any that change — so you do not lose SEO equity. Content migration is included in the standard build scope for up to 50 pages; larger migrations (200+ pages) may incur additional cost. We also take the opportunity to optimize old content — fixing broken images, updating metadata, improving readability — as part of the migration. It is a natural moment to clean house.' },
      { question: 'Can you work with our existing brand and design system?', answer: 'Yes — we prefer it. If you have brand guidelines, a design system, or even just a well-defined brand direction, we work within it rather than reinventing it. We can also design from scratch if you need it, either with our in-house brand team or in collaboration with your existing design partner. The website build is flexible: we can take finished Figma files and build them, or we can own the full process from brand strategy to launch.' },
      { question: 'What happens after launch? Do you offer ongoing support?', answer: 'Every build includes a 30-day warranty period — any bugs, performance issues, or content fixes are covered at no additional cost. After that, most clients move to a monthly retainer for ongoing work: content updates, new pages, performance monitoring, A/B testing, and feature enhancements. Retainer clients also get priority support and quarterly performance reviews to catch regressions before they impact rankings or conversions. We design our retainer relationships to feel like an extension of your team, not a vendor you submit tickets to.' },
    ],
    deliverables: [
      'Fully responsive marketing website (up to 20 pages)',
      'Headless CMS with content modeling and author training',
      'Performance optimization (LCP < 2.5s, 90+ PageSpeed score)',
      'SEO foundation (schema markup, sitemap, meta tags, Open Graph)',
      'Analytics + conversion tracking setup (GA4, Vercel Analytics)',
    ],
    timeline: '6-10 weeks from kickoff to launch',
    icon: 'Globe',
    kpis: ['PageSpeed score', 'Time to first byte', 'Conversion rate', 'Bounce rate', 'Organic traffic growth'],
  },
  {
    slug: 'web-apps',
    title: 'Web Applications',
    h1: 'Custom SaaS & Web Applications Built for Scale',
    summary: 'Full-stack web application development — from MVP to enterprise platform — using modern React and Node.js.',
    description: 'We build production-grade web applications: customer portals, internal tools, SaaS products, and marketplace platforms. Architecture designed for scale from day one.',
    problem: 'Most dev shops either over-engineer MVPs (wasting time and money) or under-engineer production apps (creating technical debt that kills velocity). We match the architecture to the stage.',
    approach: [
      'Product discovery: user stories, technical requirements, architecture decisions',
      'MVP scope: identify the smallest thing that delivers value and validates the hypothesis',
      'Build: React/Next.js frontend, Node.js/Python backend, PostgreSQL, Vercel/AWS deployment',
      'Test: automated testing (unit, integration, E2E), load testing, security audit',
      'Launch + iterate: ship, measure, learn, repeat — weekly sprint cadence',
    ],
    longDescription: `Building a web application is not the same as building a website — and the difference is not just more pages and a login form. A web application has state, authentication, authorization, database queries, API integrations, background jobs, and real-time features. It needs to be fast, secure, reliable, and maintainable by a team that might not include the original developers. The architecture decisions you make in month one determine how fast you can move in month twelve.

We build production-grade web applications using React and Next.js on the frontend, Node.js or Python on the backend, and PostgreSQL (with Supabase for rapid development or AWS RDS for enterprise deployments) as the data layer. The stack is modern but battle-tested — no experimental frameworks that will be abandoned in six months, no trendy databases that nobody knows how to operate in production. We choose boring technology that works and that you can hire for.

Our process starts with product discovery: we do not accept a feature list and start coding. We dig into the problem you are solving, the users you are solving it for, the riskiest assumptions in your hypothesis, and the simplest thing we can build to test those assumptions. For an MVP, that means identifying the one workflow that delivers value and building only that — with the architecture designed so additional features can be added without a rewrite. For a production application, it means designing for the scale you will have in 18 months, not the scale you have today.

We ship in weekly sprints with continuous deployment. You see working software from week one, not a prototype and not a slide deck. Every sprint ends with a deployable increment. We write automated tests (unit, integration, and end-to-end) as we go — not as a separate phase at the end. Code is reviewed, linted, and typed. The CI/CD pipeline runs tests, builds, and deploys automatically. When we hand off the codebase, your team (or any competent development team) can pick it up and continue building — because the code is clean, documented, and follows standard conventions.`,
    whoItsFor: [
      'Founders with a validated idea who need an MVP built fast — not a prototype, not a slide deck, but real working software that can be put in front of users in weeks',
      'Growth-stage companies whose internal tools and spreadsheets have collapsed under scale and need proper custom applications to run operations',
      'Non-technical founders who have been burned by dev shops that over-promised and under-delivered — and need a team that communicates clearly, ships on schedule, and writes code that does not require a rewrite in six months',
      'Companies building a customer-facing SaaS product that needs authentication, payments, notifications, and API integrations — the full stack, not just a landing page with a form',
      'Technical founders who need additional engineering capacity for a specific project or module and want a team that can integrate into their existing codebase and workflow without a learning curve',
    ],
    caseStudySnippet: { metric: 'MVP shipped in 7 weeks, 1,200 users onboarded in first 60 days, zero critical bugs in production', context: 'Built an MVP web application for a seed-stage logistics startup connecting shippers with carriers. Started with founder\'s 4-page product spec, ran a 3-day product sprint to identify the core workflow, and shipped a functional marketplace with user authentication, job posting and bidding, real-time notifications, and payment processing — all within 7 weeks. Architecture designed so the platform could scale to thousands of concurrent users without a rewrite. Post-MVP, continued iterating on a weekly sprint cadence based on user feedback.', client: 'Seed-Stage Logistics Marketplace (5 employees at start, 22 at follow-on)' },
    relatedServices: [
      { label: 'MVP Development', href: '/tech/mvp' },
      { label: 'Integrations', href: '/tech/integrations' },
      { label: 'Performance Optimization', href: '/tech/performance' },
      { label: 'Websites', href: '/tech/websites' },
    ],
    faqs: [
      { question: 'What is the difference between building an MVP and a full production application?', answer: 'An MVP optimizes for speed of learning — the goal is to get something in front of real users as fast as possible to validate (or invalidate) your core hypothesis. We scope ruthlessly, build only the happy path, and defer everything that does not directly contribute to learning: no admin panels, no advanced permission systems, no edge-case handlers unless they block the core workflow. A production application optimizes for reliability, scalability, and maintainability — it handles edge cases gracefully, has comprehensive test coverage, and is designed for a team to extend over years. The MVP architecture is designed so you can graduate to production without a rewrite: the database schema is sound, the API is versioned, and the code is clean. You add robustness, you do not rebuild from scratch.' },
      { question: 'How do you estimate cost and timeline for a web application?', answer: 'We do not ballpark. Every project starts with a 1-2 week paid discovery phase where we produce a detailed product spec, wireframes for the core workflows, a technical architecture document, and a fixed-price proposal with a timeline broken down by sprint. At the end of discovery, you have everything you need to make an informed build-vs-buy decision — whether you build with us or take the spec to another team. Discovery costs $5,000-15,000 depending on complexity and is credited toward the build if you proceed with us. This approach protects both sides: you get price certainty, and we get scope clarity.' },
      { question: 'What technologies do you use on the backend?', answer: 'Our default backend stack: Node.js with TypeScript (Express or Fastify) or Python (FastAPI) for the API layer, PostgreSQL for the primary database, Redis for caching and queues, and Supabase or AWS for infrastructure. We default to a monolith or well-modularized service — not microservices — because it is the right architecture for 95% of applications at the scale our clients operate. If you have specific technology requirements (existing stack, team expertise, compliance constraints), we work within those. We are not religious about any specific technology — we are religious about choosing the right tool for the job and your context.' },
      { question: 'How do you handle authentication, payments, and other common features?', answer: 'We use proven, well-supported services rather than building from scratch: Auth0 or Clerk for authentication (social login, SSO, MFA, passwordless), Stripe for payments (subscriptions, invoicing, marketplace payouts), SendGrid or Resend for transactional emails, and Cloudflare or AWS for file storage and CDN. Building auth from scratch is a security risk. Building payments from scratch is a compliance nightmare. We integrate the best-in-class service for each function, configure it properly, and abstract it behind a clean interface so you can swap providers later if needed.' },
      { question: 'What does the handoff look like if we build an in-house team later?', answer: 'We build to be handed off — that is a core principle. Every project includes: a comprehensive README with setup instructions, architecture decision records explaining why we made key technical choices, API documentation (OpenAPI spec), inline code comments on non-obvious logic, and a documented CI/CD pipeline. We also offer a transition period where we pair-program with your new hires, walk them through the codebase, and remain available for questions. The goal is that your team can be productive in the codebase within their first week — not spending a month reverse-engineering how things work.' },
    ],
    deliverables: [
      'Production-ready web application with CI/CD pipeline',
      'Technical documentation and architecture diagrams',
      'API documentation (OpenAPI spec)',
      'Automated test suite with >80% coverage',
      'Post-launch support and monitoring',
    ],
    timeline: '8-16 weeks for MVP, 16+ weeks for full production app',
    icon: 'Code2',
    kpis: ['Uptime', 'Page load time', 'API response time', 'Error rate', 'User adoption rate'],
  },
  {
    slug: 'ecommerce',
    title: 'E-Commerce',
    h1: 'E-Commerce Experiences That Convert Browsers Into Buyers',
    summary: 'Shopify and headless commerce builds optimized for conversion rate, AOV, and LTV — not just storefronts.',
    description: 'We build e-commerce experiences on Shopify and headless stacks (Shopify Hydrogen, Next.js commerce) that prioritize conversion optimization and operational efficiency.',
    problem: 'Off-the-shelf Shopify themes leave revenue on the table. Custom e-commerce builds are expensive and slow. We find the right balance for your revenue stage and growth goals.',
    approach: [
      'Discovery: product catalog analysis, customer journey mapping, conversion audit',
      'Platform selection: Shopify vs. headless commerce based on scale and customization needs',
      'Design: conversion-optimized product pages, checkout flow, merchandising UX',
      'Build: theme customization or headless build with Shopify Storefront API',
      'Optimize: AOV tactics, cross-sells, abandoned cart recovery, post-purchase upsells',
    ],
    longDescription: `E-commerce is not about having a storefront — it is about converting browsers into buyers at every step of the shopping journey. A generic Shopify theme gives you a store that looks like thousands of other stores, loads like thousands of other stores (slowly), and converts like thousands of other stores (below potential). Custom e-commerce, done wrong, burns six figures and six months on a headless build that delivers marginal conversion improvement over a well-optimized theme. The right answer depends on your revenue, your growth trajectory, and your specific conversion bottlenecks.

We build e-commerce experiences across the spectrum: from optimized Shopify theme builds for brands doing $500K-$5M in online revenue to full headless commerce implementations on Shopify Hydrogen or Next.js Commerce for brands scaling beyond $5M who need complete control over the buying experience. The common denominator is that we optimize for revenue metrics — conversion rate, average order value, and customer lifetime value — not just aesthetics. A beautiful product page that does not sell is a liability. A functional product page that converts at 4% instead of 2% doubles your revenue from the same traffic.

Our e-commerce builds include the infrastructure that turns a store into a revenue engine. Product pages are designed with conversion architecture: above-fold product imagery and value proposition, scannable feature and benefit sections, social proof (reviews, testimonials, UGC), clear pricing and variants, and a frictionless add-to-cart flow. The checkout experience is optimized to minimize abandonment — guest checkout, multiple payment methods (Shop Pay, Google Pay, Apple Pay, PayPal), address autocomplete, and transparent shipping costs and timelines. Post-purchase, we implement abandoned cart recovery sequences, cross-sell and upsell flows, and post-purchase surveys that feed into product and marketing decisions.

The technical foundation matters as much as the UX. E-commerce site speed directly impacts conversion — Amazon found that every 100ms of latency cost them 1% in revenue. We optimize for sub-2-second load times on product pages and sub-3-second on collection pages with thousands of SKUs. Images are served in AVIF/WebP formats with proper lazy loading. The store is instrumented with GA4 e-commerce tracking, conversion pixels, and server-side event forwarding so your marketing data is accurate, not sampled. And the CMS (typically Shopify's native CMS for theme builds or Sanity for headless) is set up so your team can launch products, run promotions, and update content without developer involvement.`,
    whoItsFor: [
      'Brands doing $500K-$5M in online revenue on a generic Shopify theme that is leaving conversion rate and AOV on the table',
      'DTC brands scaling beyond $5M who are outgrowing Shopify\'s templating system and need a headless commerce build for complete UX control',
      'B2B companies adding a direct-to-consumer or wholesale e-commerce channel and needing the entire stack — storefront, payments, inventory, fulfillment integration',
      'Founders whose e-commerce site converts well below industry benchmarks for their category (typically 2-4%) and who cannot identify why',
      'Companies migrating from Magento, WooCommerce, or legacy platforms to Shopify or headless and wanting to do it without SEO loss, data loss, or revenue disruption',
    ],
    caseStudySnippet: { metric: 'Conversion rate from 1.8% to 3.7%, AOV up 22%, monthly online revenue doubled in 6 months without increasing ad spend', context: 'Full e-commerce rebuild for a DTC home goods brand doing $2.2M/year on a slow, unoptimized Shopify theme. Migrated to a custom Shopify theme built for conversion: redesigned product pages with social proof integration and size/fit guidance, implemented one-click checkout with Shop Pay, optimized collection page filtering and search for 1,200+ SKUs, and set up abandoned cart recovery flows. Post-launch: conversion rate doubled, AOV increased 22% through strategic cross-sells and bundling, and site speed improved from a 28 to a 96 PageSpeed score.', client: 'DTC Home Goods Brand ($2.2M to $4.4M online revenue)' },
    relatedServices: [
      { label: 'Performance Optimization', href: '/tech/performance' },
      { label: 'Integrations', href: '/tech/integrations' },
      { label: 'Websites', href: '/tech/websites' },
      { label: 'Next.js SEO', href: '/tech/nextjs-seo' },
    ],
    faqs: [
      { question: 'Which is better for my business — a Shopify theme build or a headless commerce build?', answer: 'For most brands under $5M in online revenue, a well-optimized Shopify theme build is the right answer. It is faster to launch (6-8 weeks vs. 12-16 weeks), cheaper ($15K-30K vs. $50K-100K+), and your team can manage products, collections, and content without needing a developer. Headless commerce makes sense when: (1) you need complete control over the UX and Shopify\'s templating system is limiting your conversion optimization, (2) you have complex content + commerce requirements that a traditional theme cannot handle, (3) performance is critical and you need sub-second load times that Liquid-rendered themes struggle to achieve, or (4) you are scaling internationally and need complete localization control. We help you make this decision based on your actual revenue, growth goals, and technical requirements — not on what is trendy.' },
      { question: 'How do you handle product data migration from our old platform?', answer: 'Product data migration is one of the highest-risk parts of an e-commerce replatform. We use a structured process: (1) audit your existing product catalog — SKUs, variants, images, descriptions, meta fields, inventory data; (2) map the data model to the new platform (Shopify or headless CMS); (3) write migration scripts with validation at every step — row counts match, image URLs resolve, variant relationships are intact, prices and inventory are accurate; (4) run a test migration to staging and verify; (5) execute the production migration with a rollback plan. We also handle 301 redirects from old product URLs to new ones so you do not lose SEO equity or break incoming links. Typical migration takes 1-2 weeks for the data portion, running in parallel with the store build.' },
      { question: 'What payment gateways and methods do you support?', answer: 'On Shopify: Shop Pay (the highest-converting accelerated checkout), Shopify Payments (powered by Stripe), PayPal, Google Pay, Apple Pay, Amazon Pay, and 100+ alternative payment methods through Shopify Payments. For headless builds: Stripe (our default), with support for Braintree, Adyen, or any gateway with a modern API. We strongly recommend offering Shop Pay or Apple Pay — accelerated checkouts can improve conversion by 10-30% on mobile, where most e-commerce traffic now lives. For B2B and wholesale, we support net terms, purchase orders, and invoice payment through platforms like Balance or TreviPay.' },
      { question: 'How do you handle inventory management and fulfillment integrations?', answer: 'For Shopify builds, we integrate with Shopify\'s native inventory system for simple operations and connect to third-party inventory and warehouse management systems (ShipStation, ShipBob, Skubana, Cin7, TradeGecko) for multi-warehouse or 3PL operations. For headless builds, we build the integration layer between your commerce backend and your OMS/WMS. Real-time inventory sync prevents overselling. We also set up low-stock alerts and back-in-stock notification flows — simple automations that recover significant lost revenue.' },
      { question: 'What about SEO for e-commerce — product pages, category pages, and faceted navigation?', answer: 'E-commerce SEO is different from content SEO and most agencies get it wrong. The specific challenges: (1) faceted navigation (filters) can generate millions of near-duplicate URLs that tank crawl budget — we implement proper canonical tags and robots.txt directives; (2) product pages need unique, substantive descriptions, not manufacturer boilerplate — we build CMS templates that make it easy to write unique content at scale; (3) out-of-stock and discontinued products need proper HTTP status codes (410 gone or 301 to a replacement), not soft 404s that leak link equity; (4) structured data — Product, Offer, AggregateRating, and BreadcrumbList schemas so your products appear in rich results. We bake all of this into the build. E-commerce SEO is not an after-launch add-on — it is part of the architecture.' },
    ],
    deliverables: [
      'Fully functional e-commerce storefront',
      'Product page templates optimized for conversion',
      'Checkout optimization with abandoned cart recovery',
      'Inventory management and order fulfillment integration',
      'Analytics and conversion tracking with revenue attribution',
    ],
    timeline: '6-12 weeks depending on platform and catalog size',
    icon: 'ShoppingCart',
    kpis: ['Conversion rate', 'Average order value', 'Revenue per visitor', 'Cart abandonment rate', 'Customer LTV'],
  },
  {
    slug: 'nextjs-seo',
    title: 'Next.js SEO',
    h1: 'Next.js Sites Engineered for SEO and Performance',
    summary: 'We build and optimize Next.js websites so they rank, load fast, and get cited by AI — because your framework should work for you, not against you.',
    description: 'Specialized Next.js development with SEO and performance as first principles. Server components, streaming, ISR, and edge rendering — all configured for maximum search visibility.',
    problem: 'Next.js is powerful but easy to misconfigure. Bad SSR setups, missing metadata, slow hydration, and poor Core Web Vitals kill rankings. We make Next.js an SEO asset, not a liability.',
    approach: [
      'Architecture review: RSC strategy, rendering mode (SSR/SSG/ISR), data fetching patterns',
      'Metadata foundation: dynamic OG images, canonical URLs, structured data, sitemaps',
      'Performance: Core Web Vitals optimization, bundle analysis, image optimization, font loading',
      'AI search readiness: llms.txt, clean semantic HTML, entity-linked structured data',
      'Monitoring: Vercel Analytics, Speed Insights, rank tracking, Core Web Vitals regression alerts',
    ],
    longDescription: `Next.js is the best frontend framework for building content-rich, SEO-sensitive websites — when it is configured correctly. It is also remarkably easy to configure incorrectly. A misconfigured Next.js site can have worse SEO than a basic WordPress site: client-side rendering that search engines cannot see, metadata that does not render until JavaScript hydrates, streaming strategies that confuse crawlers, image optimization that bloats pages instead of shrinking them. The framework gives you every tool you need to be fast and findable. It also gives you every tool you need to shoot yourself in the foot.

We specialize in Next.js specifically — not as one of twenty frameworks we kind of know, but as our primary frontend tool with deep expertise in its rendering strategies, caching behavior, and SEO implications. Our Next.js SEO service is part audit, part implementation, and part infrastructure: we fix what is broken, optimize what is suboptimal, and set up the monitoring to catch regressions before they hurt your rankings.

The audit covers the entire SEO surface area of your Next.js application. Rendering strategy: are you using the right combination of Server Components, Static Generation, and Incremental Static Regeneration for each page type? Metadata: are title tags, meta descriptions, Open Graph tags, and Twitter Cards rendering server-side and unique per page? Structured data: is JSON-LD implemented correctly with entity linking, and does it validate against Google's Rich Results Test? Performance: what are your Core Web Vitals (LCP, CLS, INP), and which specific Next.js configuration choices are degrading them? Crawlability: do your sitemap, robots.txt, and internal linking architecture make it easy for search engines to discover and prioritize your content? AI readiness: do you have llms.txt, clean semantic HTML, and entity-linked schema that make your content citable by LLMs?

We implement the fixes directly — this is not a report you hand to your engineering team and hope they prioritize. We optimize your Next.js configuration, refactor your rendering strategy, implement or fix metadata and structured data, optimize images and fonts, set up performance monitoring with regression alerts, and deploy the changes. The deliverable is a faster, more findable site — confirmed by Lighthouse scores, Core Web Vitals data, and search console metrics — not a deck of recommendations.`,
    whoItsFor: [
      'Teams that built their Next.js site in-house and are seeing organic traffic plateau or decline despite good content — usually a rendering, metadata, or performance issue',
      'Companies that migrated to Next.js from another framework and saw organic traffic drop post-migration — often because of mishandled redirects, rendering changes, or missing metadata',
      'Founders whose Lighthouse scores are mediocre (50-70), Core Web Vitals are yellow or red, and they have been told "Next.js is just like that" — it is not, it is a configuration problem',
      'Marketing leaders who cannot get their engineering team to prioritize SEO fixes — we bridge the gap by implementing fixes directly and documenting them for the engineering team',
      'Companies investing in AI search visibility who need llms.txt, llms-full.txt, entity-linked schema, and clean semantic HTML that LLM crawlers can ingest efficiently',
    ],
    caseStudySnippet: { metric: 'Core Web Vitals all green within 2 weeks, indexed pages up 34%, organic traffic increased 41% in 90 days', context: 'Next.js SEO overhaul for a B2B SaaS company whose engineering team built a technically impressive site that was invisible to search engines. Root cause: reliance on client-side rendering for key content pages meant Google could not see the actual content. We refactored the rendering strategy to use Server Components and ISR, implemented comprehensive metadata and structured data across 200+ pages, fixed sitemap and canonical URL issues, and optimized Core Web Vitals (LCP from 4.8s to 1.9s, CLS from 0.25 to 0.02, INP from 280ms to 95ms). Post-optimization: organic traffic grew 41% in 90 days, pages indexed increased 34% as previously invisible content became crawlable and indexable.', client: 'B2B SaaS Company (Series B, 80 employees)' },
    relatedServices: [
      { label: 'Websites', href: '/tech/websites' },
      { label: 'Performance Optimization', href: '/tech/performance' },
      { label: 'Web Applications', href: '/tech/web-apps' },
      { label: 'MVP Development', href: '/tech/mvp' },
    ],
    faqs: [
      { question: 'Our Next.js site looks great and passes Lighthouse — why is organic traffic still flat?', answer: 'Lighthouse is a lab test — it runs on a simulated device under ideal conditions. It can miss real-world issues that affect SEO: (1) Core Web Vitals from Chrome UX Report (real user data) may be significantly worse than lab scores if your users are on mobile devices and slow networks; (2) Server Components that render correctly in dev may behave differently in production with streaming and Suspense boundaries; (3) your sitemap, canonical tags, or internal links may be sending confusing signals to Google even if individual pages look fine; (4) metadata might be client-side rendered (JavaScript-injected) and invisible to crawlers that do not execute JavaScript. We diagnose using real user data (CrUX, Vercel Analytics), Search Console data, and crawler simulation — not just Lighthouse scores.' },
      { question: 'Do we need to rewrite our site to fix these issues?', answer: 'Almost never. Most Next.js SEO issues are configuration problems, not architecture problems: incorrect rendering strategy choice (RSC vs. client components), missing or incorrectly placed metadata exports, improperly configured ISR revalidation, unoptimized images and fonts, missing or invalid structured data, sitemap and canonical URL issues. These are fixed through targeted refactoring, not a rewrite. The most common fix is moving data fetching from client-side (useEffect) to server-side (Server Components or generateMetadata) — which is typically a few hours of work per page template, not a rebuild. We will tell you honestly if your architecture genuinely needs major changes, but 90% of the time the fixes are surgical, not structural.' },
      { question: 'How do you handle the App Router vs. Pages Router question?', answer: 'If you are on the Pages Router, we evaluate whether migrating to the App Router is worth the effort for your specific SEO goals. The App Router has significant SEO advantages — Server Components by default, built-in metadata API, streaming and Suspense for performance, and better ISR — but migration is non-trivial. If your Pages Router site has fundamental rendering issues (e.g., heavy client-side data fetching), migration may be the right path. If the issues are more surgical (metadata, sitemap, images), we fix them on the Pages Router and recommend migration when there is a broader business reason to do it. We do not push unnecessary migrations.' },
      { question: 'What is included in the AI search readiness piece of this service?', answer: 'We implement four things: (1) llms.txt and llms-full.txt files at your site root that describe your company, services, and key content in a structured format LLM crawlers can ingest; (2) an API catalog (`/llm-api.json`) that describes your site\'s key endpoints and data for agent discovery; (3) entity-linked structured data — your Organization, Service, and Person schemas include sameAs links to Wikidata, Wikipedia, Crunchbase, and other knowledge bases so LLMs can resolve your brand as a recognized entity; (4) semantic HTML audit — ensuring your content uses proper heading hierarchy, article and section elements, and semantic landmarks so crawlers can parse your content structure accurately. This is the technical foundation for LLM citation. The content and authority side (original research, third-party citations) is covered by our AI Search service under the Marketing spoke.' },
      { question: 'Can you work with our existing Next.js development team rather than replacing them?', answer: 'Yes — this is the most common engagement model. Your team built the site and owns the codebase. We provide the specialized SEO expertise they likely do not have in-house: we audit, we identify the specific issues and fixes, we implement the changes in a pull request with detailed explanations, and we document the patterns so your team can apply them to future pages. Think of us as an SEO-focused pair-programming partner for your engineering team. We write code, not just recommendations. Your team reviews, learns, and continues building with better SEO patterns.' },
    ],
    deliverables: [
      'Next.js architecture audit with prioritized optimization plan',
      'Metadata and structured data implementation across all pages',
      'Performance optimization (LCP < 2.5s, CLS < 0.05, INP < 200ms)',
      'AI search readiness package (llms.txt, entity markup, API catalog)',
      'Ongoing monitoring and regression prevention',
    ],
    timeline: '2-4 weeks for audit and optimization',
    icon: 'Zap',
    kpis: ['LCP', 'CLS', 'INP', 'Organic traffic', 'Pages indexed'],
  },
  {
    slug: 'integrations',
    title: 'Integrations',
    h1: 'API & Third-Party Integrations That Automate Your Stack',
    summary: 'Connect your CRM, analytics, email, payment, and operations tools into a unified revenue stack.',
    description: 'We build custom integrations between your key business tools — CRM, email platform, analytics, payment processor, and internal systems — so data flows automatically and your team stops doing manual data entry.',
    problem: 'Disconnected tools create data silos, manual work, and reporting blind spots. Every hour your team spends copying data between systems is an hour not spent on revenue-generating work.',
    approach: [
      'Stack audit: map all tools, data flows, and integration gaps',
      'Architecture: design the integration layer — APIs, webhooks, middleware, ETL pipelines',
      'Build: custom integrations using REST APIs, GraphQL, webhooks, and middleware',
      'Test: end-to-end data flow validation, error handling, edge cases',
      'Document: integration runbooks, monitoring setup, alerting thresholds',
    ],
    longDescription: `Your business runs on a stack of tools — CRM, email platform, analytics, payment processor, support desk, calendar, accounting system, and probably a spreadsheet or three. Each tool does its job in isolation. The problem is that your business processes do not happen in isolation. A lead converts on your website, and someone manually copies that lead into the CRM. A deal closes, and someone manually triggers the onboarding workflow in your project management tool. An invoice is paid, and someone manually updates the customer record in your accounting system. These are not jobs for humans. They are integration gaps — and every gap is time lost, an opportunity for error, and a reason your data is never quite accurate.

We build custom integrations that make your tools function as a single system. When a lead submits a form on your website, the CRM creates a contact and deal automatically. The email platform receives the contact and triggers a nurture sequence. Slack notifies the right salesperson with full context. The analytics dashboard updates attribution. All of this happens in seconds, without anyone touching a CSV file or copy-pasting between browser tabs.

Our integration work spans three approaches depending on the tools and the complexity. Native integrations: if two tools already have a built-in integration, we configure it properly — which is often harder than it sounds because native integrations tend to be broad but shallow, syncing some fields but not the ones you actually need. Middleware-based integrations: using platforms like n8n, Make, or Zapier for straightforward data syncs and triggered workflows — faster and cheaper than custom code, and maintainable by your team. Custom integrations: when you need high-volume, low-latency, or complex data transformations that no-code tools cannot handle, we build custom middleware using REST APIs, GraphQL, and webhooks with proper error handling, rate limiting, retry logic, and idempotency so duplicate events do not create duplicate records.

Every integration project includes monitoring: we set up alerts for sync failures, data freshness checks that flag when data has not flowed as expected, and validation rules that catch inconsistencies (e.g., a deal marked closed-won in the CRM with no corresponding invoice in the billing system). Integrations that silently fail are worse than no integration at all — they create data discrepancies your team discovers weeks later and spends hours untangling. Our integrations fail loudly, with specific diagnostics, so you can fix the issue in minutes rather than discover it in a quarterly report.`,
    whoItsFor: [
      'Operations and RevOps teams spending more than 5 hours per week on manual data entry between tools — and knowing it is unsustainable as the company scales',
      'Founders whose "single source of truth" is a spreadsheet that someone manually updates by exporting data from four different platforms',
      'Companies running 6+ tools where critical business data — leads, deals, invoices, support tickets — lives in separate systems and cannot be correlated without manual effort',
      'Marketing and sales leaders whose lead handoff between marketing platform and CRM is broken, slow, or inconsistent — leading to leads falling through cracks',
      'Companies that have tried native integrations and found they sync the wrong data, miss important fields, or break silently — and need custom middleware that actually works',
    ],
    caseStudySnippet: { metric: '22 hours/week of manual data work eliminated, lead-to-CRM sync time from hours to under 30 seconds', context: 'Built a unified integration layer for a B2B SaaS company connecting HubSpot (CRM), Customer.io (email), Stripe (billing), Mixpanel (analytics), and Intercom (support). The previous workflow involved a sales ops person manually exporting leads from marketing tools, formatting them in Excel, and importing them into HubSpot — a 3-hour daily process that was often delayed, causing leads to go cold. Post-integration: real-time sync across all systems with validation and error alerting, 22 hours/week of manual work eliminated, lead response time dropped from 6+ hours to under 5 minutes.', client: 'B2B SaaS Company (Series A, 45 employees)' },
    relatedServices: [
      { label: 'E-Commerce', href: '/tech/ecommerce' },
      { label: 'Web Applications', href: '/tech/web-apps' },
      { label: 'Performance Optimization', href: '/tech/performance' },
      { label: 'MVP Development', href: '/tech/mvp' },
    ],
    faqs: [
      { question: 'How do you decide between using a no-code tool like Make/Zapier and building a custom integration?', answer: 'No-code tools are the right starting point when: (1) the integration is straightforward — "when X happens in Tool A, create/update Y in Tool B"; (2) data volume is moderate (hundreds to low thousands of events per day); (3) the data transformation logic is simple (field mapping, basic formatting, no complex business rules); (4) your team needs to be able to modify the integration without a developer. Custom integrations make sense when: (1) you need high throughput (tens of thousands of events per day) or low latency (sub-second sync); (2) data transformation is complex — multi-step lookups, conditional logic, aggregation; (3) you have strict data privacy or compliance requirements that preclude third-party middleware; (4) no-code pricing becomes prohibitive at your volume. We often use both: no-code for operational workflows (Slack notifications, simple syncs) and custom middleware for mission-critical data pipelines.' },
      { question: 'What happens when one of the systems being integrated changes its API?', answer: 'We subscribe to API changelogs and deprecation notices for all the tools in your stack. For retainer clients, we proactively update integrations when APIs change — typically before the old version is deprecated. For project clients, we build integrations with version-aware error handling: if an API call returns an unexpected response structure, the integration logs the error, alerts the appropriate person, and continues processing other data rather than crashing entirely. We also provide integration runbooks that document how to update each integration so your engineering team can maintain them independently.' },
      { question: 'How do you prevent duplicate records when syncing data between systems?', answer: 'Deduplication is one of the hardest problems in integrations and the source of most "dirty data" in CRMs. We implement multiple layers: (1) idempotency keys — each event carries a unique key, and the integration layer checks whether it has already been processed before acting; (2) match-and-merge logic — when creating a record, we first search for existing matches using deterministic rules (email + domain for contacts, company domain for accounts) and update existing records rather than creating duplicates; (3) duplicate detection alerts — the monitoring dashboard flags potential duplicates for human review. The specific approach depends on the tools and the data models, but duplicate prevention is always part of the architecture, not an afterthought.' },
      { question: 'How long does a typical integration project take?', answer: 'Simple integrations (two systems, straightforward data sync): 1-2 weeks. Moderate complexity (3-4 systems, conditional logic, data transformations): 3-4 weeks. Complex integration layers (5+ systems, custom middleware, high volume, bidirectional sync): 4-6 weeks. Every project starts with a scoping phase where we map the systems, data models, and integration requirements and provide a fixed timeline. The biggest variable is usually not technical complexity but API access — if we need to wait for admin credentials or API keys from your team, timelines stretch. We front-load the credential-gathering process so it does not block development.' },
    ],
    deliverables: [
      'Integration architecture diagram and documentation',
      'Working integrations between priority systems',
      'Error handling and retry logic with alerting',
      'Data synchronization monitoring dashboard',
      'Integration runbook for your engineering team',
    ],
    timeline: '2-6 weeks depending on integration complexity',
    icon: 'Link',
    kpis: ['Data sync latency', 'Integration uptime', 'Manual hours saved', 'Data accuracy rate', 'Time-to-report'],
  },
  {
    slug: 'performance',
    title: 'Performance',
    h1: 'Core Web Vitals & Speed Optimization',
    summary: 'Make your site fast. Real fast. We audit, fix, and monitor Core Web Vitals so your site loads instantly and ranks higher.',
    description: 'We deep-dive into your site\'s performance: JavaScript bundle analysis, image optimization, font loading, server response times, third-party script impact, and rendering strategy.',
    problem: 'Slow sites lose 53% of mobile visitors after 3 seconds. Every 100ms of latency costs Amazon 1% in revenue. Speed isn\'t a nice-to-have — it\'s a revenue lever and a ranking factor.',
    approach: [
      'Audit: Lighthouse, WebPageTest, Chrome UX Report, Real User Monitoring data',
      'Diagnose: JavaScript bundles, render-blocking resources, layout shifts, TTFB bottlenecks',
      'Fix: code splitting, image optimization (AVIF/WebP), font loading strategy, CDN configuration',
      'Monitor: set up Vercel Speed Insights or Cloudflare Web Analytics with regression alerts',
      'Maintain: quarterly re-audits to catch performance regressions before they impact rankings',
    ],
    longDescription: `Speed is not a nice-to-have. It is a ranking factor, a conversion factor, and a trust signal rolled into one. Google uses Core Web Vitals as a direct ranking signal. A site that loads in 1 second converts at 2-3× the rate of a site that loads in 5 seconds. And 53% of mobile visitors will abandon a page that takes more than 3 seconds to load — most of them never to return. Your website's performance is not a technical detail for your engineering team to optimize "when they have time." It is a revenue lever that directly impacts how many of your hard-won visitors become customers.

Our performance optimization service is a deep-dive into why your site is slow and what to do about it — grounded in real user data, not synthetic lab scores. We start with a multi-source audit: Chrome UX Report for real-user Core Web Vitals data, Lighthouse for lab-based diagnostics, WebPageTest for filmstrip analysis of the loading sequence, and your analytics for page-level speed data segmented by device and geography. The audit tells us not just "your LCP is slow" but specifically what is causing it: oversized JavaScript bundles, render-blocking third-party scripts, unoptimized images, slow server response times, layout shifts from dynamically injected content, or excessive CSS that delays rendering.

The fix phase targets the highest-impact, lowest-effort improvements first — the 20% of changes that deliver 80% of the speed gain. This typically includes: image optimization (converting to AVIF/WebP, implementing responsive sizes, adding proper lazy loading with blur-up placeholders), JavaScript optimization (code splitting, tree shaking, deferring non-critical scripts, replacing heavy third-party embeds with lightweight alternatives), font loading strategy (preloading critical fonts, using font-display: swap, subsetting to reduce file size), and server/CND configuration (cache headers, edge caching, compression). For Next.js sites specifically, we optimize the rendering strategy — choosing the right combination of Server Components, Static Generation, ISR, and Streaming for each page type based on its content and traffic patterns.

The final phase is monitoring and prevention. Performance is not a one-time fix — it degrades over time as new features, content, and third-party scripts are added. We set up performance monitoring with regression alerts (using Vercel Speed Insights, Cloudflare Web Analytics, or a custom Lighthouse CI pipeline) so you are alerted when Core Web Vitals cross thresholds. We establish a performance budget — concrete limits on page weight, JavaScript size, and image dimensions — that your development team can use to evaluate new work. And we schedule quarterly re-audits to catch emerging issues before they impact rankings or conversions.`,
    whoItsFor: [
      'Founders whose PageSpeed score is below 50, Core Web Vitals are in the red, and they suspect their slow site is tanking both conversions and search rankings',
      'Marketing leaders who have watched conversion rates decline and bounce rates climb — and whose analytics show a direct correlation between page load time and exit rate',
      'Companies that recently launched a new website or major redesign and watched their search rankings drop — often because performance was deprioritized during the design and build process',
      'E-commerce brands where every 100ms of latency means measurable revenue loss — and who need aggressive, conversion-focused speed optimization',
      'Teams that have tried to optimize performance internally but hit a wall — usually because the root cause is architectural (rendering strategy, data fetching patterns) rather than superficial (image compression, caching)',
    ],
    caseStudySnippet: { metric: 'LCP from 6.2s to 1.7s, Core Web Vitals all green, bounce rate down 38%, and organic traffic up 27% within 60 days', context: 'Performance optimization for an e-commerce brand whose site loaded in 6.2 seconds on mobile, with Core Web Vitals all in the red. Audit identified 3 critical bottlenecks: (1) 2.4MB of unoptimized images served as full-resolution PNGs, (2) unoptimized JavaScript bundles including unused MUI components inflating the main bundle to 890KB, and (3) render-blocking Google Tag Manager scripts delaying LCP by 1.8 seconds. Fixes: AVIF/WebP conversion with responsive srcsets, tree-shook and code-split the JavaScript bundles (890KB to 145KB), deferred non-critical third-party scripts, and implemented proper font loading. Post-optimization: LCP dropped to 1.7s, CLS went from 0.31 to 0.03, mobile conversion rate improved 29%.', client: 'DTC E-Commerce Brand ($12M online revenue)' },
    relatedServices: [
      { label: 'Next.js SEO', href: '/tech/nextjs-seo' },
      { label: 'Websites', href: '/tech/websites' },
      { label: 'Web Applications', href: '/tech/web-apps' },
      { label: 'E-Commerce', href: '/tech/ecommerce' },
    ],
    faqs: [
      { question: 'Our site scores 90+ on Lighthouse — why does it feel slow and why are our Core Web Vitals in the red?', answer: 'Lighthouse scores are lab data — they run on a simulated device, on a fast connection, in a controlled environment. They do not reflect what real users experience. Common reasons for the gap: (1) Lighthouse throttles CPU and network but cannot simulate real-world variance — congested cellular networks, older devices, busy CPUs; (2) Core Web Vitals are measured from the 75th percentile of real users, meaning the experience of users on slow connections and older devices determines your score; (3) Lighthouse cannot measure CLS caused by late-loading content (embeds, popups, cookie banners that shift the page after load); (4) third-party scripts (analytics, chat widgets, A/B testing tools) often behave differently for real users than in simulated tests. We always start with real-user data (Chrome UX Report, Vercel Analytics) before trusting any lab score.' },
      { question: 'How much will performance optimization improve our conversion rate?', answer: 'Industry benchmarks are a useful starting point: Walmart found that every 1 second of load time improvement increased conversions by 2%. Mobify found each 100ms improvement in homepage load time increased conversion by 1.1%. But the actual impact for your site depends on where you are starting from and what kind of traffic you have. A site going from 8 seconds to 3 seconds will see a much larger conversion lift than a site going from 3 seconds to 1.5 seconds. We provide a before-and-after analysis specific to your site: conversion rate by load time bucket, revenue per visitor by speed tier, and projected revenue impact of hitting specific performance targets. You will know the expected ROI before we write a line of code.' },
      { question: 'Do we have to rebuild our site to get it fast?', answer: 'No. Very few performance problems require a rebuild. The most impactful optimizations are typically: (1) image optimization — converting formats, implementing responsive sizes, and proper lazy loading (1-3 days of work); (2) JavaScript optimization — code splitting, removing unused dependencies, deferring non-critical scripts (2-5 days); (3) font optimization — subsetting, preloading, and using font-display: swap (a few hours); (4) caching and CDN configuration — proper cache headers, edge caching (a few hours if you have access to your CDN settings). These fixes are surgical and do not require touching your application logic. The exceptions are sites with fundamental architectural issues — for example, a single-page app where all content is client-side rendered. Those need more significant refactoring, but they are the minority.' },
      { question: 'What is a performance budget and how do you enforce it?', answer: 'A performance budget is a set of quantitative limits that define how fast your site needs to be — and by extension, how "heavy" it can be. We set budgets for: (1) Core Web Vitals thresholds — LCP < 2.5s, CLS < 0.05, INP < 200ms; (2) page weight — total kilobytes transferred for key page types (typically < 300KB for content pages, < 500KB for landing pages); (3) JavaScript size — total kilobytes of JavaScript loaded (ideally < 150KB per page); (4) image budgets — maximum dimensions and file sizes for hero images, product images, and thumbnails. We implement budget enforcement through your CI/CD pipeline (Lighthouse CI or similar) so that pull requests that exceed the budget are flagged before they merge. The budget is not a straightjacket — it is an agreement that any feature that pushes you over the limit requires explicit discussion about whether the performance cost is worth the business value.' },
      { question: 'How do you optimize for Core Web Vitals specifically?', answer: 'Largest Contentful Paint (LCP): we identify what element is the LCP on each page type (usually a hero image, heading text, or video poster) and optimize its loading path — preload critical resources, eliminate render-blocking requests, compress and properly size the LCP image, use a CDN with edge caching, and ensure the LCP element starts rendering as early as possible in the HTML. Cumulative Layout Shift (CLS): we identify every element that shifts after initial render — images without width/height, dynamically injected content (ads, embeds, cookie banners), web fonts causing layout changes when they load — and fix each with explicit dimensions, reserved space, or font-display strategies. Interaction to Next Paint (INP): we identify long tasks blocking the main thread — heavy JavaScript execution, large style recalculations, expensive event handlers — and break them up with code splitting, web workers, or deferred execution. Each metric requires different tools and strategies, but they are all fixable with the right diagnosis.' },
    ],
    deliverables: [
      'Comprehensive performance audit with prioritized fix list',
      'Implemented optimizations with before/after metrics',
      'Performance monitoring dashboard with alert thresholds',
      'Performance budget document for your dev team',
      'Quarterly performance health check',
    ],
    timeline: '1-2 weeks for audit and critical fixes',
    icon: 'Gauge',
    kpis: ['LCP', 'CLS', 'INP', 'TTFB', 'PageSpeed score'],
  },
  {
    slug: 'mvp',
    title: 'MVP Development',
    h1: 'MVP Development for Early-Stage Founders',
    summary: 'Go from idea to launched product in weeks, not months. We build lean MVPs that validate your hypothesis without burning your runway.',
    description: 'We help early-stage founders launch their first product. Fast iteration, lean scope, architecture that can scale if the hypothesis validates — without the overhead of a full engineering team.',
    problem: 'Founders waste months and hundreds of thousands building products nobody wants. The goal of an MVP is learning, not perfection. We build just enough to validate — and architect it so you can scale if it works.',
    approach: [
      'Product sprint: define the hypothesis, identify the riskiest assumption, scope the MVP',
      'Design: lean UX, user flows for the happy path only, no pixel-perfect Figma until validated',
      'Build: rapid development with modern stack (Next.js, Supabase, Vercel)',
      'Launch: ship to real users, instrument analytics, set up feedback collection',
      'Iterate: weekly cadence — ship → measure → learn → decide next feature',
    ],
    longDescription: `The purpose of an MVP is learning, not building. It is to test your riskiest assumption — the one thing that, if wrong, means the entire business model collapses — as quickly and cheaply as possible. Most founders understand this in theory. In practice, they fall in love with their product vision, scope creeps, and six months later they have spent $150,000 on a "minimum viable product" with fifteen features, an admin panel, a sophisticated permission system, and exactly zero validated learning about whether anyone actually wants what they built.

We build lean MVPs for early-stage founders — typically 4-8 weeks from kickoff to launched product, with a scope disciplined enough to fit in that window. Our process starts with a product sprint: we spend 2-5 days with you defining the hypothesis, identifying the riskiest assumption, and scoping the absolute smallest thing that can test that assumption with real users. This is not a requirements-gathering exercise where we document every feature you have ever imagined. It is a disciplined scope-cutting exercise where we ask "does this feature directly contribute to validating the hypothesis?" until only the essential workflow remains.

The build uses a modern but pragmatic stack: Next.js and React for the frontend, Node.js or Python for the backend (if one is needed), Supabase or PostgreSQL for the database, and Vercel for deployment. We use pre-built components and services (Auth0 or Clerk for authentication, Stripe for payments) to accelerate development without sacrificing quality. The architecture is designed for a future that may or may not come: we build clean, well-structured code with a sound data model that can be extended into a full production application — but we do not build the production application on MVP timelines. You might pivot after the MVP. You might discover your core assumption was wrong and the whole product needs to be different. Building for a speculative future that has not been validated is the definition of waste.

Our engagement does not end at launch. We instrument the MVP with analytics and feedback collection from day one, and we iterate on a weekly cadence: ship, measure user behavior, talk to users, decide what to build next. The goal is to compress the build-measure-learn loop from months to weeks. Some MVPs validate the hypothesis in six weeks and graduate to full-scale development. Others invalidate it in four weeks and save the founder a year of building the wrong thing. Both are successful outcomes. The failure case is spending a year and a quarter-million dollars to learn something a 6-week MVP could have taught you for $25,000.`,
    whoItsFor: [
      'Pre-seed and seed-stage founders who have a clear hypothesis about a problem worth solving but have not yet built anything — and need a technical partner who can go from concept to launched product in weeks',
      'Non-technical founders who have been quoted $50K-$150K and 4-6 months by dev shops for an MVP that should take 6-8 weeks and $25K-50K — and who suspect they are being sold a production app, not an MVP',
      'Founders who have spent months talking to potential users and now need a working product to move from "people say they would use it" to "people actually use it and we have the data to prove it"',
      'Technical founders who could build the MVP themselves but know they should be spending their time on customer discovery, sales, and fundraising — not writing CRUD endpoints and debugging authentication flows',
      'Founders who have built an MVP that "works" but is held together with duct tape and cannot be extended — and need a rebuild on a solid architecture before bringing on additional engineers',
    ],
    caseStudySnippet: { metric: 'MVP launched in 5.5 weeks, validated core hypothesis with 180 beta users in 30 days, raised $1.2M pre-seed on the back of real usage data', context: 'Built an MVP for a fintech startup enabling freelancers to manage invoicing, expenses, and tax estimation in one tool. The founder came with a 22-page product spec; the product sprint cut it to a 3-feature MVP: invoice creation and sending, bank account linking for expense tracking, and a quarterly tax estimate calculator. Shipped in 5.5 weeks using Next.js, Supabase, Stripe Connect, and Plaid for bank integration. Within 30 days, 180 beta users had sent 400+ invoices and linked 200+ bank accounts. The founder used the traction data to close a $1.2M pre-seed round. Post-fundraise, we continued building toward the full product vision with a now-validated roadmap.', client: 'Pre-Seed Fintech Startup (2 founders, now 12 employees post-fundraise)' },
    relatedServices: [
      { label: 'Web Applications', href: '/tech/web-apps' },
      { label: 'Integrations', href: '/tech/integrations' },
      { label: 'Websites', href: '/tech/websites' },
      { label: 'Next.js SEO', href: '/tech/nextjs-seo' },
    ],
    faqs: [
      { question: 'How is your MVP build different from what a typical dev shop would deliver?', answer: 'A typical dev shop builds what you ask them to build. They accept your feature list, estimate the cost, and deliver against the spec. If the spec includes 15 features, they build 15 features. If the spec is over-scoped for an MVP, they do not push back — because more features means a bigger contract. Our approach is different: we push back hard on scope because we judge success by whether you learn what you need to learn, not by whether we built everything in the spec. We will tell you "that feature does not need to be in the MVP — it will add 3 weeks and 40% to the cost, and it will not help you validate your core hypothesis any faster." Sometimes founders listen. Sometimes they do not. But we will always have the conversation.' },
      { question: 'What if the MVP validates the hypothesis and we want to build the full product?', answer: 'That is the ideal outcome, and the MVP architecture is designed for it. Because we build with a sound data model, clean component architecture, and standard conventions from day one, graduating to full production development means adding features and hardening the existing codebase — not rebuilding from scratch. The transition is typically: MVP launch and validation (weeks 1-8), learning and iteration based on user feedback (weeks 8-16), and then a full production build based on a now-validated feature roadmap. Many of our MVP clients continue with us for the full build. Some transition to an in-house engineering team — we provide documentation, architecture decision records, and onboarding support to make that handoff smooth.' },
      { question: 'What if the MVP invalidates our hypothesis — we built it and nobody wants it?', answer: 'That is not a failure. It is the MVP doing its job. You spent $25K-$50K and 6-8 weeks to learn that a particular approach will not work — instead of $200K and 12 months. That is the best money you will ever lose. We design the MVP engagement with this possibility in mind: the scope is contained, the timeline is fixed, and the code is not over-engineered for a future that will not happen. If the hypothesis fails, we help you analyze the data, understand what the users did (and did not do), and determine whether the insight points toward a pivot or a different problem worth solving. Many founders pivot after an MVP that "failed" — and their second attempt succeeds because they are building on data, not assumptions.' },
      { question: 'Do I need a technical co-founder, or can I build an MVP with you as a non-technical founder?', answer: 'You do not need a technical co-founder to build an MVP with us. Many of our MVP clients are non-technical founders who bring domain expertise, customer relationships, and a clear understanding of the problem — and partner with us for the technical execution. That said, we will encourage you to start building relationships with potential technical hires or co-founders during the MVP process, because if the hypothesis validates and you scale, you will eventually need in-house technical leadership. The MVP engagement buys you time to find the right person — and gives you a working product and real traction data that makes you a more attractive partner to strong technical candidates.' },
      { question: 'What technology stack do you use for MVPs, and can I change it later?', answer: 'Our default MVP stack: Next.js (frontend and API routes), Supabase (database, auth, storage), Stripe (payments), and Vercel (hosting). This stack is chosen because it maximizes development speed without sacrificing the ability to scale. You get a PostgreSQL database (via Supabase) that can grow with you, a React codebase that any competent frontend developer can work with, and a deployment pipeline that handles CI/CD from day one. You are not locked into any of these choices: the database can migrate to AWS RDS, the API layer can be extracted to a standalone backend, and the frontend components are portable. The stack is a starting point, not a permanent commitment.' },
      { question: 'How much does an MVP cost, and how do you prevent budget overruns?', answer: 'Most MVPs built with us fall in the $25K-$50K range with a 4-8 week timeline. We structure the engagement as a fixed-price project based on a clearly defined scope — after the paid product sprint. You pay for the sprint (typically $3K-$5K for 2-5 days), and at the end you have a detailed spec, wireframes, a technical architecture document, and a fixed-price proposal. If you decide not to proceed with the build, you keep the spec. Budget overruns are prevented by the fixed-price structure and by our scope discipline: if you want to add features mid-build, we say "absolutely — let us price that change order and see how it affects the timeline." You are always in control of the budget. No surprises.' },
    ],
    deliverables: [
      'Working MVP deployed to production',
      'Analytics and user feedback instrumentation',
      'Technical documentation for future development',
      'Product roadmap based on initial user feedback',
      'Architecture that can scale to production without a rewrite',
    ],
    timeline: '4-8 weeks from kickoff to launched MVP',
    icon: 'Rocket',
    kpis: ['Time to launch', 'User adoption', 'Feature usage', 'Feedback volume', 'Iteration velocity'],
  },
  {
    slug: 'audit',
    title: 'Free Tech Audit',
    h1: 'Free Tech & Performance Audit',
    summary: 'Get a detailed diagnostic of your website\'s performance, accessibility, SEO, and security — delivered within 48 hours.',
    description: 'We run a comprehensive audit of your tech stack: performance, accessibility, SEO fundamentals, security headers, and stack architecture. You receive a prioritized report within 48 hours.',
    problem: '',
    approach: [],
    deliverables: [
      'Lighthouse performance audit with prioritized fix list',
      'Core Web Vitals assessment with improvement roadmap',
      'SEO technical audit (crawlability, indexability, schema, metadata)',
      'Security header audit and hardening recommendations',
      'Stack architecture review with modernization recommendations',
    ],
    longDescription: "",
    whoItsFor: [],
    caseStudySnippet: null,
    relatedServices: [],
    faqs: [],
    timeline: 'Delivered within 48 hours',
    icon: 'ClipboardCheck',
    kpis: [],
  },
];

// ── FINANCE SPOKE ──────────────────────────────────────────────

const financeSubServices: SubService[] = [
  {
    slug: 'bookkeeping',
    title: 'Bookkeeping',
    h1: 'Monthly Bookkeeping & Reconciliation — Done Right',
    summary: 'Clean books, on time, every month. We handle categorization, reconciliation, and financial close so you don\'t have to.',
    description: 'We manage your day-to-day financial operations: transaction categorization, bank reconciliation, accounts payable/receivable, and monthly close. Tech-enabled, human-reviewed.',
    problem: 'Messy books create expensive problems: missed tax deductions, cash flow surprises, and investor due diligence nightmares. Clean books are the foundation of every good financial decision.',
    approach: [
      'Onboarding: connect accounts, set up chart of accounts, establish categorization rules',
      'Monthly close: categorize transactions, reconcile accounts, produce financial statements',
      'Review: fractional CFO reviews statements for anomalies and opportunities',
      'Delivery: monthly financial package delivered by the 10th business day',
      'Ongoing: proactive communication about unusual transactions or cash flow concerns',
    ],
    longDescription: `Bookkeeping is the foundation of every financial decision you make as a founder — and yet it is the thing most companies treat as an afterthought until something breaks. Transactions pile up uncategorized, bank reconciliations slip, and suddenly you are three months behind going into a board meeting or, worse, a fundraising round. We fix that.

Our bookkeeping service is not outsourced data entry. It is a tech-enabled, human-reviewed monthly close process that produces financial statements you can actually use. We connect your bank accounts, credit cards, and payment processors to our accounting stack. Transactions flow in automatically and are categorized using rules we build together during onboarding. Every month, a dedicated bookkeeper reconciles every account, reviews every categorization, and produces a financial package — P&L, balance sheet, and cash flow statement — reviewed by a fractional CFO before it lands in your inbox.

What makes this different from hiring a freelance bookkeeper or using a fully automated solution is the review layer. Automated categorization gets things wrong — especially for SaaS companies with complex revenue recognition, multi-entity structures, or international payments. Our bookkeepers catch those errors. The fractional CFO review catches the strategic implications: unusual spending patterns, margin compression, cash flow trends that warrant a conversation. You get clean books and the interpretation that makes them useful.

The onboarding process takes 2-3 weeks. We start with a chart of accounts review to make sure your financial structure matches how you actually think about the business — not some generic template. We establish categorization rules for recurring transactions, set up accounts payable and receivable tracking, and define the monthly close calendar. By week four, you are receiving financial statements by the 10th business day of each month with variance analysis that flags what changed and why.

For founders preparing to fundraise, clean books are non-negotiable. Investors and their diligence teams will tear apart messy financials. For founders managing cash flow, accurate books are your early warning system. For founders just trying to file taxes without losing deductions, clean books pay for themselves in tax savings alone. This is not a compliance exercise. It is the operating system for your financial decisions.`,
    whoItsFor: [
      'Seed to Series B founders whose books are months behind and who need clean financials before their next board meeting or fundraise',
      'Founders who have been doing their own bookkeeping (badly) and know it is costing them deductions, investor confidence, and sleep',
      'Companies that outgrew their part-time bookkeeper and need a more rigorous, tech-enabled monthly close process with CFO-level review',
      'SaaS and services companies with complex revenue recognition, multi-entity structures, or international transactions that generic bookkeeping cannot handle',
      'Founders preparing for due diligence who need audit-ready financials and cannot afford to have their numbers questioned',
    ],
    caseStudySnippet: { metric: '12 months of backlogged books cleaned in 3 weeks, $34K in missed deductions identified', context: 'Full bookkeeping overhaul for a Series A SaaS company that had been running on spreadsheet-based tracking since inception. We rebuilt their chart of accounts, categorized 4,800+ transactions, reconciled 14 months of bank statements, and established a monthly close process that delivers financials by the 10th business day.', client: 'Series A B2B SaaS Company (35 employees)' },
    relatedServices: [
      { label: 'Tax Preparation & Strategy', href: '/finance/tax' },
      { label: 'Financial Reporting', href: '/finance/financial-reporting' },
      { label: 'Fractional CFO', href: '/finance/fractional-cfo' },
      { label: 'Payroll Management', href: '/finance/payroll' },
    ],
    faqs: [
      { question: 'How is this different from hiring a bookkeeper on Upwork?', answer: 'A freelance bookkeeper categorizes transactions and reconciles accounts — and stops there. Our service includes that plus: a second-layer review by a fractional CFO who looks for strategic implications, tech-enabled automation that reduces manual errors, a standardized monthly close process with SLAs, and integration with your tax planning and financial reporting. You are not buying a person. You are buying a process with built-in quality control and strategic oversight.' },
      { question: 'What accounting software do you use?', answer: 'We are platform-agnostic and work in whatever system you already use or want to migrate to — QuickBooks Online, Xero, and NetSuite are the most common. If you are on a legacy system or spreadsheets, we will recommend and manage the migration to a modern platform as part of onboarding. The tool matters less than the process. We make sure whatever you are on is set up correctly, with a chart of accounts that reflects how you actually run the business.' },
      { question: 'How long does onboarding take, and what do you need from me?', answer: 'Onboarding takes 2-3 weeks. We need read-only access to your bank accounts, credit cards, and payment processors; access to your accounting software; and a 60-minute kickoff call to understand your business model, revenue streams, and any accounting complexities. We handle the rest — cleanup, categorization rules, chart of accounts optimization, and setting up the monthly close calendar. You do not need to prepare anything in advance. Messy books are the starting point, not a disqualifier.' },
      { question: 'What if I need historical cleanup before we start a monthly retainer?', answer: 'Historical cleanup is common and we scope it as a separate project before the monthly retainer begins. We categorize uncategorized transactions, reconcile past bank statements, fix misclassified entries, and produce corrected financials for the period. Most cleanups take 2-4 weeks depending on the volume and messiness. The monthly retainer starts once the books are clean, so you are not paying ongoing fees while we fix the past.' },
      { question: 'Do you handle accounts payable and bill pay?', answer: 'Yes. We track accounts payable, manage bill approval workflows, and can process payments through your existing systems. We do not hold your cash or make payments on your behalf — we ensure bills are tracked, approved, and recorded, and that your AP aging report is accurate and visible. For full bill pay services where we initiate payments, we integrate with tools like Bill.com or Ramp that maintain proper approval controls and segregation of duties.' },
    ],
    deliverables: [
      'Monthly financial statements (P&L, Balance Sheet, Cash Flow)',
      'Bank and credit card reconciliation',
      'Accounts payable and receivable tracking',
      'Monthly close package with variance analysis',
      'Year-end tax-ready financials',
    ],
    timeline: 'Monthly retainer, onboarding takes 2-3 weeks',
    icon: 'BookOpen',
    kpis: ['Close time', 'Reconciliation accuracy', 'Days to deliver monthly package', 'Tax deduction capture rate', 'Cash flow visibility'],
  },
  {
    slug: 'tax',
    title: 'Tax Preparation & Strategy',
    h1: 'Tax Preparation & Strategy That Saves You Money',
    summary: 'Tax preparation, planning, and strategy — not just filing. We find deductions, structure for efficiency, and keep you compliant.',
    description: 'We handle tax preparation and filing for your business, plus proactive tax strategy to minimize your liability. Entity structure review, deduction optimization, and quarterly estimated tax planning.',
    problem: 'Most founders overpay taxes because they treat tax as a once-a-year filing exercise instead of a year-round strategy. Good tax planning saves multiples of what it costs.',
    approach: [
      'Discovery: review entity structure, previous returns, and financial statements',
      'Strategy: identify deduction opportunities, entity optimization, timing strategies',
      'Preparation: prepare federal, state, and local tax returns with documentation',
      'Planning: quarterly estimated tax calculations, cash flow planning for tax obligations',
      'Advisory: proactive communication about tax law changes affecting your business',
    ],
    longDescription: `Most founders treat taxes as a compliance filing — a thing you do once a year, reluctantly, to stay out of trouble. That mindset leaves money on the table. Tax strategy, done right, is a year-round activity that can save a company tens of thousands of dollars through deduction optimization, entity structuring, timing strategies, and tax credit identification — all perfectly legal and often overlooked by generalist CPAs who are focused on filing, not planning.

Our tax service combines preparation with proactive strategy. We do the filing — federal, state, and local returns, prepared accurately and on time — but that is the minimum. The real value is in the planning: reviewing your entity structure to confirm it is still optimal given your revenue and growth trajectory, identifying deductions you are missing, calculating quarterly estimated payments so you are not surprised by a five-figure tax bill in April, and monitoring tax law changes that create new opportunities or risks for your business.

We are particularly experienced with the tax situations that trip up growth-stage companies: R&D tax credits for software development, multi-state nexus and apportionment for remote teams, international tax implications for companies with overseas contractors or customers, and QSBS (Section 1202) planning for founders who may benefit from the qualified small business stock exclusion. These are not edge cases — they are standard considerations for any company that is growing and planning for an eventual exit.

The engagement is structured as an annual relationship with quarterly touchpoints. Tax season is busy, but strategy happens year-round. Each quarter, we review your financials, update estimated payment calculations, and flag any mid-year tax planning opportunities. When filing season arrives, your returns are prepared from clean books — not a last-minute scramble — and the strategy work done throughout the year means your tax position is already optimized. You file with confidence, not anxiety.`,
    whoItsFor: [
      'Founders who suspect they are overpaying taxes but do not have a CPA who thinks proactively about tax strategy',
      'Companies with remote teams across multiple states who need multi-state nexus analysis and compliance',
      'SaaS and tech companies that may qualify for R&D tax credits but have never claimed them',
      'Founders who plan to exit within 3-7 years and want QSBS planning, entity optimization, and tax-efficient exit structuring',
      'Companies that have outgrown their local tax preparer and need a more sophisticated, strategy-forward approach',
    ],
    caseStudySnippet: { metric: '$47K in missed deductions identified, $12K in penalties avoided through proactive planning', context: 'Full tax strategy engagement for a Series A SaaS company that had been filing with a generalist CPA. We conducted entity structure review, identified unclaimed R&D credits across two years of software development, corrected multi-state apportionment errors, and established quarterly estimated tax planning that eliminated year-end surprises.', client: 'Series A SaaS Company (40 employees, multi-state)' },
    relatedServices: [
      { label: 'Bookkeeping', href: '/finance/bookkeeping' },
      { label: 'Fractional CFO', href: '/finance/fractional-cfo' },
      { label: 'Financial Reporting', href: '/finance/financial-reporting' },
      { label: 'Payroll Management', href: '/finance/payroll' },
    ],
    faqs: [
      { question: 'How is tax strategy different from tax preparation?', answer: 'Tax preparation is filing what happened — looking backward at a closed year and reporting it. Tax strategy is planning what will happen — looking forward and making decisions that reduce your future tax liability. Strategy includes entity choice, timing of income and expenses, retirement plan contributions, R&D credit documentation, and exit planning. Most accountants do preparation. We do both, because strategy without accurate preparation is theory, and preparation without strategy leaves money on the table.' },
      { question: 'Do you handle R&D tax credits for software companies?', answer: 'Yes — this is one of the most overlooked tax benefits for startups and growth-stage companies. If you are building software, developing new features, improving performance, or integrating complex systems, you very likely have qualifying R&D activities. We work with specialized R&D credit engineers who document your qualifying activities to IRS standards so the credit withstands audit scrutiny. Even pre-revenue companies can benefit through payroll tax offset provisions. Many of our clients recover $30K-$150K+ in credits they did not know they were eligible for.' },
      { question: 'What if I have multiple entities or a complex corporate structure?', answer: 'Multi-entity structures are common — holding companies, operating entities, IP holding entities, and subsidiaries. We handle consolidated returns, intercompany transactions, transfer pricing documentation, and entity-level filings. If your structure has become unnecessarily complex, we will flag simplification opportunities. Many companies accumulate entities over time that no longer serve a purpose and create filing overhead without tax benefit.' },
      { question: 'What happens if I get audited?', answer: 'Our preparation includes audit-ready documentation — every deduction is supported, every position has a rationale, and your returns are filed with the assumption that they may be examined. In the event of an audit, we handle correspondence with the IRS or state tax authorities, prepare responses, and represent you through the process. The best audit defense is preparation: returns that are accurate, well-documented, and free of aggressive positions that invite scrutiny. We do not play audit roulette.' },
    ],
    deliverables: [
      'Federal and state tax returns (business + personal if pass-through)',
      'Tax strategy memo with deduction optimization recommendations',
      'Quarterly estimated tax payment schedule',
      'Entity structure review with optimization recommendations',
      'R&D tax credit analysis (if applicable)',
    ],
    timeline: 'Annual engagement with quarterly touchpoints',
    icon: 'FileText',
    kpis: ['Effective tax rate', 'Tax savings identified', 'Deductions captured', 'Filing timeliness', 'Audit risk score'],
  },
  {
    slug: 'fractional-cfo',
    title: 'Fractional CFO',
    h1: 'Fractional CFO — Strategic Finance Leadership Without the Full-Time Cost',
    summary: 'Get a strategic finance partner: forecasting, fundraising support, board deck preparation, and financial strategy — on a fractional basis.',
    description: 'We provide experienced CFO-level strategic finance support: financial modeling, cash flow forecasting, fundraising preparation, investor reporting, board deck creation, and strategic financial analysis.',
    problem: 'Startups and growth companies need strategic finance leadership but can\'t justify a full-time CFO salary ($250K+). A fractional CFO delivers 80% of the value at 20% of the cost.',
    approach: [
      'Discovery: understand business model, growth stage, key financial questions',
      'Financial model: build or refine your operating model with scenario planning',
      'Cadence: weekly or bi-weekly strategy sessions, monthly board-ready reporting',
      'Fundraising: investor materials, financial due diligence prep, valuation modeling',
      'Strategic: pricing analysis, unit economics, cohort analysis, capital allocation',
    ],
    longDescription: `A full-time CFO at a growth-stage company costs $250,000 to $400,000 per year in salary, bonus, and equity — before you factor in the cost of a bad hire, which can be catastrophic. A fractional CFO gives you the strategic finance leadership you need at 15-25% of that cost, with the added benefit that you are getting someone who has seen the playbook across dozens of companies rather than learning on yours.

Our fractional CFO service is not a "rent-a-CFO" who shows up once a month to review reports. It is an embedded strategic partnership. Your fractional CFO joins your leadership team — attending weekly standups, participating in quarterly planning, presenting to the board, and serving as a thought partner to the CEO on every major decision with financial implications. The engagement is scoped at 10-20 hours per month, but the relationship is closer to full-time in terms of availability and commitment. When an investor calls with a diligence question or a key hire negotiation needs financial modeling, your CFO answers.

The scope varies by company stage. For seed-stage companies, the focus is financial infrastructure: building the operating model from scratch, establishing KPI dashboards, creating investor update cadences, and modeling fundraising scenarios. For Series A/B companies, the focus shifts to performance management: unit economics analysis, cohort reporting, budget accountability, and board communication. For growth-stage companies, the work often involves capital allocation strategy, M&A evaluation, international expansion modeling, and preparing the company for a future fundraise or exit.

Every engagement starts with a financial diagnostic: we review your current financial operations, model, reporting, and KPIs, then produce a 90-day priority roadmap. Month one is typically heavy on building and fixing — getting the model right, standing up reporting, and establishing the operating cadence. By month three, the CFO is running the financial strategy function, and you as the founder are spending less time in spreadsheets and more time building the business. That is the point.`,
    whoItsFor: [
      'Seed to Series B founders who need strategic finance leadership but cannot justify or afford a full-time CFO hire',
      'Founders preparing to fundraise who need a credible financial voice for investor conversations, due diligence, and board presentations',
      'Companies experiencing rapid growth where financial complexity is outpacing the founder or controller\'s capabilities',
      'Founders who want a strategic thought partner for pricing, unit economics, capital allocation, and exit planning — not just a report producer',
      'Companies that have a controller or bookkeeper handling the transactional work but lack the strategic layer above it',
    ],
    caseStudySnippet: { metric: 'Extended cash runway by 11 months through working capital restructuring, raised $8M Series A with financial model built by fractional CFO', context: 'Fractional CFO engagement for a seed-stage B2B marketplace burning $180K/month with 4 months of runway remaining. Restructured vendor payment terms, optimized subscription pricing (15% ARPU increase), built Series A financial model used in successful fundraise, and established monthly board reporting cadence.', client: 'Seed-Stage B2B Marketplace (18 employees)' },
    relatedServices: [
      { label: 'Cash Flow Modeling', href: '/finance/cash-flow' },
      { label: 'Financial Reporting', href: '/finance/financial-reporting' },
      { label: 'Bookkeeping', href: '/finance/bookkeeping' },
      { label: 'Tax Preparation & Strategy', href: '/finance/tax' },
    ],
    faqs: [
      { question: 'How involved is the fractional CFO day-to-day?', answer: 'The standard engagement is 10-20 hours per month, but the structure matters more than the hours. Your CFO attends weekly leadership meetings, responds to urgent Slack/email within hours (not days), and is available for ad-hoc strategic conversations. Most clients treat their fractional CFO like an executive team member who happens to work part-time — not a consultant who visits once a month. If you need more hours during a fundraise or acquisition process, we flex up temporarily at the same hourly rate.' },
      { question: 'What is the difference between a fractional CFO, a controller, and a bookkeeper?', answer: 'A bookkeeper categorizes transactions and reconciles accounts (the what happened). A controller manages the close process, ensures GAAP compliance, and oversees AP/AR (the how it is recorded). A fractional CFO interprets the numbers, builds strategy from them, manages investor relationships, and advises on capital allocation, pricing, and M&A (the what it means and what we should do about it). We offer all three layers, and most clients need at least two. The fractional CFO engagement typically sits on top of bookkeeping and financial reporting.' },
      { question: 'Can you represent us to our investors and board?', answer: 'Yes — that is a core part of the role. Your fractional CFO presents financials at board meetings, fields investor diligence questions, prepares board decks, and manages investor reporting cadences. Many of our fractional CFOs have been full-time CFOs at venture-backed companies and are credible in the room with sophisticated investors. Having a CFO who speaks the language of institutional capital changes the dynamic of board conversations.' },
      { question: 'What if we already have a controller or finance lead?', answer: 'That is actually the ideal setup. The controller handles the transactional and close work; the fractional CFO provides the strategic layer on top — interpreting results, building models, managing investor relationships, and advising the CEO on financial decisions. We work alongside your existing finance team rather than replacing it. If you have a senior accountant who is ready to grow, we can also mentor them toward a controller or CFO path as part of the engagement.' },
      { question: 'How do we know when it is time to hire a full-time CFO?', answer: 'The typical trigger is when you consistently need 25+ hours per week of strategic finance leadership and can justify the $250K+ fully-loaded cost. For most companies, this happens around Series B or $10-20M ARR. We will be the first to tell you when it is time — and we will help you hire, onboard, and transition to the full-time CFO. We would rather see you succeed with the right full-time hire than keep a fractional engagement that no longer fits.' },
    ],
    deliverables: [
      'Financial operating model with 3-statement forecast',
      'Monthly board-ready financial package with narrative',
      'Cash flow forecast with 13-week rolling projection',
      'Fundraising support (model, deck, due diligence, investor Q&A)',
      'Strategic finance recommendations with ROI analysis',
    ],
    timeline: 'Monthly retainer, 10-20 hours/month typical engagement',
    icon: 'BarChart3',
    kpis: ['Forecast accuracy', 'Cash runway visibility', 'Gross margin', 'Burn rate', 'Revenue per employee'],
  },
  {
    slug: 'payroll',
    title: 'Payroll',
    h1: 'Payroll Management & Compliance',
    summary: 'Full-service payroll: processing, tax filings, compliance, and employee self-service — integrated with your books.',
    description: 'We handle payroll end-to-end: processing, tax deposits and filings, W-2/1099 preparation, benefits deductions, and compliance. Integrated with your accounting for clean financials.',
    problem: 'Payroll mistakes are expensive — penalties, interest, and angry employees. And payroll data that doesn\'t flow into your books creates reconciliation headaches every month.',
    approach: [
      'Setup: configure payroll system, employee onboarding, tax account registration',
      'Processing: run payroll on your schedule (bi-weekly, semi-monthly, monthly)',
      'Tax: deposit and file all payroll taxes (federal, state, local) on time',
      'Compliance: new hire reporting, workers\' comp, unemployment insurance management',
      'Integration: payroll data flows automatically into your accounting system',
    ],
    longDescription: `Payroll is the one financial function where mistakes have immediate, visible, and painful consequences. Pay someone late or incorrectly, and you hear about it within minutes. Miss a tax deposit deadline, and the IRS sends you a penalty notice with interest. Misclassify an employee as a contractor, and you are looking at back taxes, penalties, and potential legal exposure. Payroll is not complicated — it is detail-intensive, and the cost of getting the details wrong compounds fast.

Our payroll service handles the full cycle: processing, tax deposits, quarterly and annual filings, W-2 and 1099 preparation, benefits deductions, and compliance. But the real value is in the integration. Payroll data does not live in isolation — it feeds your P&L (salary expense), your balance sheet (payroll tax liabilities), your cash flow forecast (payroll is typically the largest cash outflow), and your tax filings (W-2s, 940s, 941s, state equivalents). When payroll is integrated with your accounting system, every pay run automatically updates your financials. When it is not, someone is manually journaling payroll entries each period — which is how errors creep in and reconciliations become nightmares.

We support all standard pay schedules — bi-weekly, semi-monthly, and monthly — and handle the complexities that come with growing teams: multi-state payroll for remote employees, benefits administration (health, 401k, HSA/FSA), garnishments, and equity compensation (ISO, NSO, RSU) tracking. For companies with contractors (1099), we manage contractor payments, W-9 collection, and year-end 1099-NEC filing — a process that becomes painful at scale without proper systems.

Setup takes 2-3 weeks. We register your tax accounts with the appropriate state and local agencies, configure your payroll platform, onboard your employees, and run a parallel payroll to verify accuracy before going live. After that, payroll runs on your schedule. You approve hours and any changes; we handle everything else. If an employee asks a question about their pay stub, they have a self-service portal — and we handle the escalated questions so you do not become your own HR department.`,
    whoItsFor: [
      'Founders spending too much time on payroll admin — running pay, answering employee questions, and stressing about tax deadlines',
      'Companies with employees in multiple states who need multi-state payroll tax compliance',
      'Teams growing from contractors to W-2 employees and navigating the classification and compliance transition',
      'Companies that have experienced a payroll tax penalty or filing mistake and never want to deal with that again',
      'Founders who want payroll fully integrated with their books so financials are always accurate without manual journal entries',
    ],
    caseStudySnippet: { metric: 'Zero payroll tax penalties in 2 years, 8 hours/month of founder time recovered', context: 'Payroll management for a professional services firm with 45 employees across 6 states. We migrated them from a legacy payroll provider, set up multi-state tax compliance, integrated payroll with their accounting system, and established contractor payment workflows for 20+ 1099 contractors.', client: 'Professional Services Firm (45 employees, 6 states)' },
    relatedServices: [
      { label: 'Bookkeeping', href: '/finance/bookkeeping' },
      { label: 'Tax Preparation & Strategy', href: '/finance/tax' },
      { label: 'Financial Reporting', href: '/finance/financial-reporting' },
      { label: 'Fractional CFO', href: '/finance/fractional-cfo' },
    ],
    faqs: [
      { question: 'Which payroll platform do you use?', answer: 'We work with Gusto, Rippling, Justworks, and ADP — and we will recommend the right one based on your team size, state footprint, benefits needs, and budget. Gusto is our default for teams under 50 employees: intuitive, well-priced, and handles multi-state well. Rippling is ideal if you also need IT provisioning and device management. We manage the platform for you — you do not need to learn the software. You approve hours and changes; we run everything else.' },
      { question: 'How do you handle multi-state payroll?', answer: 'Every state has its own income tax rates, unemployment insurance rates, registration requirements, and filing deadlines. When you have employees in multiple states, you need to register with each state\'s tax agencies, withhold the correct state and local taxes for each employee based on where they actually work, and file returns in each jurisdiction. We handle the nexus analysis, registrations, withholding setup, and multi-state filings. This is one of the most common compliance gaps we fix for growing companies.' },
      { question: 'What about employee benefits and 401(k) administration?', answer: 'We manage benefits deductions through payroll: health insurance premiums, dental, vision, HSA/FSA contributions, 401(k) deferrals and employer matches, commuter benefits, and any voluntary benefits. We reconcile benefit invoices against payroll deductions monthly to catch discrepancies. For 401(k) plans, we ensure deferrals and matches are calculated correctly, deposited on time (DOL has strict timeliness rules), and reported accurately on W-2s.' },
      { question: 'How do you handle contractors (1099) vs. employees (W-2)?', answer: 'We track contractors and employees separately, collect W-9s from contractors during onboarding, process contractor payments on your schedule, and file 1099-NEC forms at year-end. We also flag classification risks — if someone looks like an employee but is paid as a contractor, we will raise it proactively because misclassification penalties are severe. For companies transitioning contractors to W-2, we handle the full onboarding: offer letters, I-9 verification, tax withholding setup, and benefits enrollment.' },
    ],
    deliverables: [
      'Accurate, on-time payroll processing every period',
      'Payroll tax deposits and quarterly/annual filings',
      'W-2 and 1099 preparation and distribution',
      'Employee self-service portal for pay stubs and tax forms',
      'Labor cost reporting integrated with financial statements',
    ],
    timeline: 'Setup takes 2-3 weeks, then ongoing per-pay-period processing',
    icon: 'Users',
    kpis: ['Payroll accuracy rate', 'Tax filing timeliness', 'Employee satisfaction', 'Processing time', 'Compliance score'],
  },
  {
    slug: 'financial-reporting',
    title: 'Financial Reporting',
    h1: 'Monthly Close & Board-Ready Financial Reporting',
    summary: 'Clean monthly close with board-ready reporting packages — P&L, balance sheet, cash flow, and KPIs that matter to investors.',
    description: 'We manage the monthly financial close process and produce reporting packages that give you and your investors clear visibility into financial performance, trends, and risks.',
    problem: 'Most founders get financial reports that are weeks late, full of errors, and formatted in ways that don\'t answer the questions they actually have. Good reporting drives good decisions.',
    approach: [
      'Close process: standardized month-end close checklist with clear deadlines',
      'Reporting: P&L (actual vs. budget), balance sheet, cash flow statement, KPI dashboard',
      'Analysis: variance analysis, trend analysis, cohort analysis, unit economics',
      'Delivery: monthly financial package within 10 business days of month-end',
      'Review: 60-minute monthly financial review call to discuss results and implications',
    ],
    longDescription: `Most founders receive financial reports that answer questions they did not ask, in a format they cannot act on, three weeks after the month ended. That is not financial reporting. That is financial archaeology — looking at old numbers that cannot change anything. Good financial reporting closes the books within 10 business days, shows you what changed and why, and surfaces the three things you need to pay attention to right now.

Our financial reporting service manages the full monthly close process — from transaction cutoff through to the final review call. We start with a standardized close checklist: reconcile all accounts, review all material transactions for proper categorization, accrue for expenses incurred but not yet billed, calculate deferred revenue, and produce the three core statements (P&L, balance sheet, cash flow). But the statements are just the starting point. The value is in the analysis layer on top.

Every monthly package includes variance analysis: actuals versus budget (or forecast), with commentary on what drove the variances. A $50K revenue beat is good — but was it a new customer, an expansion deal, or a one-time event that will not repeat? A $20K expense overrun could be an investment that pays back in six months or a process problem that will compound. The variance commentary distinguishes between the two so you are making decisions on insight, not just data.

For companies with investors, we produce board-ready reporting: a concise narrative that pairs financial results with business context, formatted in a way that answers the questions board members actually ask. No 40-page data dumps. No formatting that requires a PhD to parse. Just the key numbers, what changed, and what it means — in three to five pages that earn trust through clarity. We also build KPI dashboards that track the metrics that matter for your specific business model: ARR/MRR growth, gross margin, net revenue retention, CAC, LTV, burn rate, runway, and whatever operational KPIs drive your P&L.`,
    whoItsFor: [
      'Founders who dread receiving their monthly financials because the numbers are confusing, late, or obviously wrong',
      'Companies with investors or a board who expect professional, on-time financial reporting packages with narrative commentary',
      'Founders preparing to raise capital who need to demonstrate financial rigor and credibility to potential investors',
      'Companies where the monthly close takes more than 10 business days or involves significant manual spreadsheet work',
      'Finance leads who are spending too much time producing reports and not enough time analyzing what the numbers mean',
    ],
    caseStudySnippet: { metric: 'Monthly close reduced from 18 days to 8 days, board package quality rated "best we have seen" by lead investor', context: 'Financial reporting overhaul for a Series B SaaS company whose monthly close was taking 18 days and producing error-prone reports. We established standardized close checklist, automated deferred revenue calculations, built KPI dashboard, and implemented board-ready reporting package with variance commentary.', client: 'Series B SaaS Company (65 employees)' },
    relatedServices: [
      { label: 'Fractional CFO', href: '/finance/fractional-cfo' },
      { label: 'Bookkeeping', href: '/finance/bookkeeping' },
      { label: 'Cash Flow Modeling', href: '/finance/cash-flow' },
      { label: 'Tax Preparation & Strategy', href: '/finance/tax' },
    ],
    faqs: [
      { question: 'How fast can you close the books each month?', answer: 'Our standard SLA is delivery by the 10th business day of the following month. For most clients, we actually deliver by the 7th or 8th business day — the 10th is a conservative commitment, not a target. If you need a faster close (5 business days or less), that requires dedicated close resources and typically costs more. The biggest bottleneck to close speed is usually not the accounting work — it is getting information from other parts of the business (revenue data, expense approvals, etc.). We help streamline those inputs as part of the process.' },
      { question: 'What is actually in the monthly financial package?', answer: 'Every package includes: (1) P&L — actual vs. budget/forecast with variance commentary, (2) Balance Sheet — with key ratio analysis, (3) Cash Flow Statement — direct or indirect method depending on your preference, (4) KPI Dashboard — 5-8 metrics that matter for your business model with trend visualization, (5) Executive Summary — a one-page narrative covering the 3-5 things you need to know this month. For board-ready packages, we also include an investor update memo. Nothing is 40 pages. Everything is decision-ready.' },
      { question: 'Do you use accrual or cash basis accounting?', answer: 'We default to accrual basis — it is what GAAP requires and what investors and boards expect. Cash basis can be simpler but it misrepresents business performance: revenue is recognized when cash is received rather than when it is earned, and expenses are recognized when paid rather than when incurred. This creates timing distortions that mask the true economics of the business. If you are currently on cash basis, we will manage the transition as part of onboarding.' },
      { question: 'Can you work with our existing accounting system?', answer: 'Yes — QuickBooks Online, Xero, and NetSuite are the platforms we most commonly operate in. We do not force a platform migration unless your current system is genuinely holding you back (e.g., you are still on spreadsheets or using a consumer-grade tool that cannot handle accrual accounting). If a migration makes sense, we scope it as a separate project and manage it end-to-end.' },
    ],
    deliverables: [
      'Monthly financial statements (P&L, Balance Sheet, Cash Flow)',
      'Budget vs. actual variance analysis with commentary',
      'KPI dashboard with trend visualization',
      'Cash flow analysis with burn rate and runway calculation',
      'Monthly financial review call with strategic recommendations',
    ],
    timeline: 'Monthly retainer, delivered by 10th business day',
    icon: 'PieChart',
    kpis: ['Close speed', 'Report accuracy', 'Budget variance', 'Gross margin trend', 'Cash runway'],
  },
  {
    slug: 'cash-flow',
    title: 'Cash Flow Modeling',
    h1: 'Cash Flow Modeling & Forecasting',
    summary: 'Know exactly where your cash is going and when you\'ll need more. 13-week rolling forecasts and scenario planning.',
    description: 'We build dynamic cash flow models that give you visibility into your cash position, burn rate, and runway. Scenario planning for fundraising, hiring, and market changes.',
    problem: 'The #1 reason startups die is running out of cash — and most founders don\'t see it coming until it\'s too late. A good cash flow model is your early warning system.',
    approach: [
      'Build: create a driver-based cash flow model tied to your actual financial data',
      'Forecast: 13-week rolling cash flow forecast updated weekly',
      'Scenario: best case, base case, worst case scenarios for key decisions',
      'Monitor: weekly cash position updates with variance from forecast',
      'Advise: proactive recommendations when the model flags potential issues',
    ],
    longDescription: `The number one reason startups die is running out of cash — and the most frustrating part is that it is almost always predictable. Cash problems do not appear overnight. They show up in the data weeks or months in advance: receivables stretching, payables compressing, burn rate creeping up, a key customer delaying payment. Most founders miss these signals because they are tracking cash in their bank account, not in a model that projects forward and flags risks before they become emergencies.

Our cash flow modeling service builds a driver-based forecast that is tied to your actual financial data, not abstract assumptions. A driver-based model means every line item is connected to a business driver: revenue is driven by customers x average revenue per customer, not a flat growth rate; payroll is driven by headcount x average salary by department, not a round number; receivables are driven by revenue x average days to collect. When assumptions change — you push a hire by two months, a customer contract renews at a higher rate — the entire model updates automatically because the drivers are connected.

The core deliverables are a 13-week rolling cash flow forecast (updated weekly) and scenario analysis for your 2-3 most important strategic decisions. The 13-week horizon is deliberate: it is short enough to be accurate and long enough to give you time to act. If the model shows you running out of cash in week 11, you have 11 weeks to accelerate collections, delay payables, draw on a credit line, or raise bridge capital. Without the model, you discover the problem in week 10 and have one week to panic.

We update the forecast weekly with actual cash activity — what came in, what went out, and how it compares to what was forecast. Variances are the signal: if actual collections are consistently below forecast, your revenue recognition or your collections process needs attention. If actual operating expenses are consistently above forecast, your budgeting or your expense controls need tightening. The forecast is not valuable because it predicts the future perfectly (it will not). It is valuable because it tells you when reality is diverging from plan — and gives you time to respond.`,
    whoItsFor: [
      'Founders who check their bank balance to know if they have enough cash but cannot answer "how many months of runway do we actually have?"',
      'Companies with less than 12 months of runway who need weekly cash visibility and early warning when the trajectory changes',
      'Founders making a major financial decision — fundraising, a key hire, an office lease — who need to model the cash impact before committing',
      'Companies experiencing rapid growth where cash consumption is getting harder to predict and manage intuitively',
      'Founders who have been surprised by a cash crunch before and are determined to never be caught off guard again',
    ],
    caseStudySnippet: { metric: 'Identified pending cash shortfall 10 weeks before it would have hit, giving founder time to secure $500K bridge round without dilution pressure', context: 'Cash flow modeling engagement for a growth-stage ecommerce company that was profitable on a P&L basis but had negative operating cash flow due to inventory build and extended customer payment terms. Built 13-week rolling forecast that identified a cash gap 10 weeks out, allowing the founder to negotiate extended vendor terms and secure bridge financing from existing investors on favorable terms rather than a distressed raise.', client: 'Growth-Stage Ecommerce Company ($8M revenue)' },
    relatedServices: [
      { label: 'Fractional CFO', href: '/finance/fractional-cfo' },
      { label: 'Financial Reporting', href: '/finance/financial-reporting' },
      { label: 'Bookkeeping', href: '/finance/bookkeeping' },
      { label: 'Tax Preparation & Strategy', href: '/finance/tax' },
    ],
    faqs: [
      { question: 'What is a driver-based cash flow model, and why does it matter?', answer: 'A driver-based model connects every line item to a business driver rather than a flat assumption. Instead of "revenue grows 10% per month," the model says "revenue = number of customers x average revenue per customer, and customers grow based on sales headcount x productivity per rep." When you change a driver — say, you decide to delay two sales hires — revenue, cash flow, and runway all update automatically. This matters because it lets you model scenarios realistically and see second-order effects that flat-growth models miss.' },
      { question: 'How often is the forecast updated?', answer: 'Weekly. Every week, we update the model with actual cash activity — what came in, what went out — and compare it to the forecast. We flag material variances and update forward assumptions as needed. The weekly cadence is important: monthly is too slow for companies with less than 12 months of runway, where cash dynamics change fast. The weekly update typically takes 30-60 minutes once the model is built and the data feeds are set up.' },
      { question: 'What is the difference between cash flow and profitability?', answer: 'Profitability is an accounting concept — revenue minus expenses on an accrual basis. Cash flow is real — money in minus money out. You can be profitable and run out of cash (if customers pay slowly, you prepay expenses, or you are buying inventory faster than you sell it). You can also be unprofitable and cash-flow positive (if you collect annual subscriptions upfront). Cash flow kills companies; profitability determines long-term viability. You need to track both, but cash flow is the more urgent metric.' },
      { question: 'Do you build models in Excel or Google Sheets?', answer: 'We default to Google Sheets for most clients — it enables real-time collaboration, version control, and easy sharing with investors. For more complex models (multi-entity, consolidation, scenario-heavy), we use Excel if the additional functionality is genuinely needed. Either way, you get a model you can use and modify yourself — we do not build in proprietary tools that create vendor dependency. Every engagement includes a model walkthrough so you understand how it works, not just how to read the outputs.' },
      { question: 'Can you build this using my existing financial data, or do I need clean books first?', answer: 'We can start with whatever data you have — clean books, messy books, or just bank statements and a general sense of the business. Obviously, the forecast is more accurate with clean data, but waiting until the books are perfect before building a cash flow model defeats the purpose. If you are cash-constrained, the model is urgent. We typically build the first version of the model while the bookkeeping cleanup is happening in parallel, then refine it once the historical data is cleaned up.' },
    ],
    deliverables: [
      'Driver-based cash flow model (Google Sheets or Excel)',
      '13-week rolling cash flow forecast (updated weekly)',
      'Scenario analysis for 2-3 key strategic decisions',
      'Weekly cash position dashboard',
      'Monthly cash flow review with variance analysis',
    ],
    timeline: '2-3 weeks to build initial model, then weekly updates',
    icon: 'DollarSign',
    kpis: ['Forecast accuracy', 'Cash runway (months)', 'Burn rate', 'Cash conversion cycle', 'Working capital'],
  },
  {
    slug: 'audit',
    title: 'Free Finance Health Check',
    h1: 'Free Finance Health Check',
    summary: 'Get a 1-page diagnostic of your financial operations — bookkeeping quality, cash flow, tax efficiency, and CFO readiness — within 48 hours.',
    description: 'We review your current financial operations and deliver a benchmark report comparing your setup to best practices for companies at your stage. Delivered within 48 hours.',
    problem: '',
    approach: [],
    deliverables: [
      'Bookkeeping quality assessment with accuracy score',
      'Cash flow health indicators with burn rate analysis',
      'Tax efficiency review with deduction opportunity estimate',
      'Financial operations maturity benchmark vs. peers',
      'Prioritized recommendations with effort × impact scoring',
    ],
    longDescription: "",
    whoItsFor: [],
    caseStudySnippet: null,
    relatedServices: [],
    faqs: [],
    timeline: 'Delivered within 48 hours',
    icon: 'ClipboardCheck',
    kpis: [],
  },
];

// ── AUTOMATION SPOKE ───────────────────────────────────────────

const automationSubServices: SubService[] = [
  {
    slug: 'ai-agents',
    title: 'AI Agents',
    h1: 'Custom AI Agents That Run Your Business Operations',
    summary: 'LLM-powered agents that handle customer support, lead qualification, data extraction, and workflow execution — 24/7.',
    description: 'We build custom AI agents using GPT-4, Claude, and open-source models that automate complex business processes: lead qualification, customer support triage, document processing, and more.',
    problem: 'Most "AI automation" is just ChatGPT wrappers with a pretty UI. Real AI agents need careful prompt engineering, tool integration, guardrails, and monitoring to be production-ready.',
    approach: [
      'Process audit: identify high-volume, rule-based, and judgment-heavy tasks suitable for AI',
      'Agent design: define the agent\'s role, tools, knowledge base, decision boundaries, and escalation rules',
      'Build: implement the agent with proper prompt engineering, tool calling, and memory management',
      'Test: evaluate accuracy, response quality, hallucination rate, and edge case handling',
      'Deploy: ship to production with monitoring, logging, and human-in-the-loop oversight',
    ],
    deliverables: [
      'Functional AI agent deployed to production',
      'Agent design document (role, tools, boundaries, escalation rules)',
      'Evaluation framework with accuracy and quality benchmarks',
      'Monitoring dashboard with usage, accuracy, and cost tracking',
      'Playbook for ongoing prompt refinement and model updates',
    ],
    timeline: '4-8 weeks per agent, depending on complexity',
    icon: 'Bot',
    kpis: ['Task automation rate', 'Response accuracy', 'Escalation rate', 'Time saved', 'Cost per automated task'],
    longDescription: `Most businesses have a backlog of work that requires human judgment but doesn't actually require a human to do it from scratch every time. Customer support triage, lead qualification, invoice data extraction, contract review, meeting prep — tasks that follow patterns but aren't quite deterministic enough for a simple if-this-then-that rule. That's where AI agents come in.

We build production-grade AI agents that operate inside your existing tools — Slack, email, CRM, support desk, internal databases — and execute multi-step tasks autonomously. An agent isn't a chatbot. It's software that reasons about a goal, decides which tool to use, retrieves the information it needs, takes action, and escalates to a human when it hits a boundary it wasn't designed to cross.

Our methodology starts with process selection: not every task should be handed to an AI. We identify high-volume, judgment-heavy processes where the cost of error is low-to-moderate and the cost of human labor is high. Then we design the agent's role — its tools, knowledge sources, decision authority, and escalation rules. The build phase involves prompt engineering, tool integration (APIs, databases, document stores), memory architecture for multi-turn interactions, and evaluation harnesses to measure accuracy, hallucination rate, and task completion rate.

The outcome is an agent that runs 24/7, costs a fraction of the equivalent human time, and — critically — gets better over time as we refine prompts, add training examples, and expand its tool set. Typical agents handle 70-85% of incoming volume autonomously, routing only the genuinely complex or sensitive cases to your team. That's not headcount reduction. That's headcount redeployment to work that actually moves the business forward.`,
    whoItsFor: [
      'Founders and ops leads whose support team spends 40%+ of time answering the same 20 questions',
      'Sales teams losing deals because lead follow-up is slow or inconsistent across reps',
      'Operations teams buried in document processing — invoices, contracts, applications, claims',
      'Companies that have tried "AI chatbots" that disappointed and want agents that actually work',
      'Growth-stage companies scaling headcount faster than processes — and feeling the coordination cost',
    ],
    caseStudySnippet: { metric: '82% of support tickets resolved autonomously within 6 weeks', context: 'Custom AI agent deployed across Slack and Intercom for a B2B SaaS company handling 1,200+ monthly support requests. Human agents freed to handle enterprise escalations and proactive customer success.', client: 'B2B SaaS Platform (Series A)' },
    relatedServices: [
      { label: 'Workflow Automation', href: '/automation/workflow-automation' },
      { label: 'CRM Automation', href: '/automation/crm-automation' },
      { label: 'Stack Integrations', href: '/automation/integrations' },
      { label: 'Data Pipelines', href: '/automation/data-pipelines' },
    ],
    faqs: [
      { question: 'How is an AI agent different from a chatbot?', answer: 'A chatbot follows a script — it can only respond to predefined triggers with predefined responses. An AI agent reasons about goals, decides which tools to use, retrieves information from multiple sources, takes multi-step actions, and only escalates when it hits a boundary. If a chatbot is a vending machine, an AI agent is an employee with a playbook and decision authority.' },
      { question: 'What happens when the agent makes a mistake?', answer: 'Every agent we build includes a human-in-the-loop override. You define escalation rules — for example, "if confidence score below 85%, route to a human" or "if the customer mentions cancellation, pause and escalate." We also build monitoring dashboards that track accuracy, hallucination rate, and task completion so you can see exactly how the agent is performing and where it needs refinement.' },
      { question: 'Do you use OpenAI, Anthropic, or open-source models?', answer: 'We are model-agnostic and choose based on your requirements. For most production agents, we use Anthropic Claude or OpenAI GPT-4 via API with zero data retention policies. For highly sensitive data (healthcare, legal, financial compliance), we can deploy open-source models like Llama 3 self-hosted in your infrastructure so data never leaves your environment. The model choice is a decision we make together based on accuracy needs, latency requirements, data sensitivity, and cost.' },
      { question: 'How long before an agent is actually useful?', answer: 'We typically have a functional agent handling real work within 4 weeks. The first 2 weeks are spent on process design and building the evaluation framework. Week 3 is the first deploy with a small subset of tasks and heavy human oversight. By week 6-8, most agents are handling 70%+ of their target volume autonomously. The key insight: you do not need 100% automation on day one. An agent handling 50% of volume correctly from week 3 already pays for itself.' },
    ],
  },
  {
    slug: 'workflow-automation',
    title: 'Workflow Automation',
    h1: 'End-to-End Workflow Automation',
    summary: 'Automate your business processes with n8n, Make, and custom workflows — from lead routing to invoice processing.',
    description: 'We design and build automated workflows that connect your tools and eliminate manual processes. Using n8n, Make, Zapier, and custom code when off-the-shelf integrations fall short.',
    problem: 'Your team is spending hours every week on repetitive tasks: data entry, lead routing, report generation, invoice processing. These are automatable — and every hour automated is an hour back for revenue work.',
    approach: [
      'Process audit: document current workflows, identify bottlenecks, quantify time spent',
      'Design: map automated workflows with triggers, actions, conditions, and error handling',
      'Build: implement workflows in n8n, Make, or custom code — whatever fits best',
      'Test: end-to-end testing with real data, edge cases, and failure scenarios',
      'Document: create workflow runbooks so your team understands and can modify workflows',
    ],
    deliverables: [
      'Automated workflows deployed and tested',
      'Process documentation with before/after workflow diagrams',
      'Error handling and alerting for workflow failures',
      'Time-saved tracking dashboard',
      'Team training on workflow management and troubleshooting',
    ],
    timeline: '2-6 weeks depending on workflow count and complexity',
    icon: 'GitBranch',
    kpis: ['Hours saved per week', 'Process error rate', 'Workflow uptime', 'Manual touchpoints eliminated', 'ROI (time saved × hourly cost)'],
    longDescription: `Every business runs on processes, but most of those processes are still running on people manually clicking between tabs. A lead comes in through your website, someone manually copies it into the CRM. An invoice lands in your inbox, someone manually enters it into the accounting system. A customer submits a support ticket, someone manually checks the CRM to see if they're an enterprise account before responding. These are not strategic tasks. They are connective tissue that software should handle.

Workflow automation is the art of making your tools do the work of moving information between them — triggered by events, governed by business rules, and monitored for failures. We build these automations primarily in n8n and Make, with custom code (Python, TypeScript) when off-the-shelf connectors fall short. n8n is our default for most builds because it's self-hostable, open-source, and gives you full control over your automation infrastructure without vendor lock-in. Make is ideal for teams that want a more visual, low-code experience with a massive library of pre-built connectors.

Our process starts with a workflow audit: we document your current processes end-to-end, quantify the time each step consumes, and identify automation opportunities ranked by impact and implementation effort. Then we design the automated workflow — triggers, conditional branches, data transformations, error handling, and notifications. Every workflow includes failure handling: if an API is down or a step times out, the workflow retries, logs the error, and alerts the right person rather than silently failing and creating a data mess that someone discovers three weeks later.

The result is not just saved time — though that's the most immediate benefit. It's consistency. Automated processes don't get tired, don't forget steps, and don't take shortcuts when it's Friday at 4:55pm. Every lead gets routed the same way. Every invoice gets processed with the same validation. Every report gets generated on schedule. That consistency is worth as much as the hours saved.`,
    whoItsFor: [
      'Operations managers who can list 5+ manual processes their team runs every week',
      'Founders who know their team is doing "glue work" between tools but haven\'t had time to fix it',
      'Growing teams where process consistency is starting to break as headcount scales',
      'Companies that tried Zapier and hit its limitations — complex branching, high volume, or data privacy requirements',
      'Businesses running on a stack of 6+ tools where data moves between them manually',
    ],
    caseStudySnippet: { metric: '31 hours/week of manual work eliminated across 8 automated workflows', context: 'Designed and deployed workflow automation for a professional services firm handling client onboarding, invoice generation, project status reporting, and resource allocation. Previously required 2 full-time operations coordinators to manage manually.', client: 'Professional Services Firm (75 employees)' },
    relatedServices: [
      { label: 'Stack Integrations', href: '/automation/integrations' },
      { label: 'CRM Automation', href: '/automation/crm-automation' },
      { label: 'AI Agents', href: '/automation/ai-agents' },
      { label: 'No-Code Stack', href: '/automation/no-code-stack' },
    ],
    faqs: [
      { question: 'n8n vs. Make vs. Zapier — which one should I use?', answer: 'Zapier is the easiest to start with but becomes expensive at scale and is limited in complex branching logic. Make is more powerful visually, handles complex scenarios better, and costs less at volume. n8n is our default recommendation: it\'s open-source, self-hostable (your data stays in your infrastructure), handles high volume and complex logic, and has a fair-code license that means no per-task pricing surprises. We default to n8n unless there\'s a specific reason to use something else.' },
      { question: 'What happens if an automated workflow breaks?', answer: 'Every workflow we build includes error handling: automatic retries with exponential backoff, dead-letter queues for failed tasks that need human review, and real-time alerts (Slack, email, or SMS) when a workflow fails beyond its retry threshold. You do not discover a broken automation three weeks later because data stopped flowing — you know within minutes. We also build monitoring dashboards that track execution history, error rates, and throughput so you can see automation health at a glance.' },
      { question: 'Can my team modify workflows after you build them?', answer: 'Absolutely — that is the point. We build in n8n or Make specifically because they have visual editors that non-engineers can understand and modify. Every engagement includes documentation and a training session so your team can adjust trigger conditions, add steps, or modify logic without calling us. For teams that want ongoing support, our retainer includes priority assistance when modifications get complex.' },
      { question: 'How do you decide what to automate first?', answer: 'We use an impact × effort matrix. High-impact, low-effort processes get automated in week one — these are usually things like lead routing, notification workflows, and simple data syncs. High-impact, high-effort processes (multi-system workflows with complex business logic) get scoped as dedicated builds. The goal is to stack quick wins that build confidence and free up capacity while the bigger builds are in progress. Most clients see at least one workflow live within the first week.' },
    ],
  },
  {
    slug: 'integrations',
    title: 'Stack Integrations',
    h1: 'CRM & Tool Stack Integrations',
    summary: 'Connect your CRM, marketing tools, analytics, and operations platforms into a unified revenue stack.',
    description: 'We integrate your business tools so data flows seamlessly: CRM ↔ email platform ↔ analytics ↔ billing ↔ support. No more CSV exports and manual data entry between systems.',
    problem: 'Disconnected tools create data silos where your CRM doesn\'t know what your email platform sent, your analytics can\'t see what your billing system collected, and your team wastes hours on manual reconciliation.',
    approach: [
      'Stack audit: map all tools, data models, and integration points',
      'Architecture: design the integration layer — native integrations, APIs, webhooks, middleware',
      'Build: implement integrations with proper error handling, rate limiting, and retry logic',
      'Sync: set up real-time or scheduled data synchronization with conflict resolution',
      'Monitor: dashboard for integration health, data freshness, and error rates',
    ],
    deliverables: [
      'Integration architecture diagram and documentation',
      'Working integrations between priority systems',
      'Data sync monitoring with freshness and accuracy metrics',
      'Error handling playbook with alerting thresholds',
      'Integration maintenance guide for your team',
    ],
    timeline: '2-6 weeks depending on stack complexity',
    icon: 'Link',
    kpis: ['Integration uptime', 'Data sync latency', 'Manual data entry hours eliminated', 'Data accuracy rate', 'Time to report'],
    longDescription: `Your business runs on a stack of tools — CRM, marketing automation, analytics, billing, support desk, calendar, email, and probably a spreadsheet or three. Individually, each tool does its job. Collectively, they don't. Your CRM doesn't know what marketing emails a lead received. Your billing system doesn't feed into your analytics dashboard. Your support desk can't see the customer's contract tier without someone manually looking it up. This isn't a tool problem — it's an integration problem.

Stack integration is about making your tools function as a single system. When a lead converts, the CRM creates a deal, the marketing platform stops sending nurture emails, the billing system generates an invoice, and the analytics dashboard updates attribution — all automatically, without anyone touching a CSV file. We design and build these integrations using native APIs, webhooks, and middleware where direct connections aren't available.

Our approach starts with a stack audit: we map every tool in your business, the data models they use, the integration points that exist today, and the ones that should exist but don't. Then we design the integration architecture — what connects to what, how data transforms between systems, sync frequency (real-time for critical data, scheduled for reporting data), conflict resolution rules (which system is the source of truth for which field), and error handling. The build phase implements these integrations with proper rate limiting, retry logic, and idempotency so duplicate events don't create duplicate records.

The outcome is a unified stack where data flows automatically and accurately. Your team stops being human middleware between tools and starts working on things that require actual thought. Beyond time savings, integrated data unlocks capabilities that siloed tools can't deliver: cross-channel attribution, unified customer views, automated reporting, and AI that actually has context about your business because it can see the full picture.`,
    whoItsFor: [
      'Companies running 8+ tools where data moves between them manually via CSV export/import',
      'Sales and marketing teams whose lead data is inconsistent between CRM and marketing platform',
      'Founders who can\'t get a real-time view of revenue because billing and CRM data live in separate worlds',
      'Operations teams spending more than 5 hours/week on data reconciliation between systems',
      'Businesses that have outgrown native integrations and need custom middleware for their specific workflows',
    ],
    caseStudySnippet: { metric: 'Eliminated 18 hours/week of manual data entry across 5 systems', context: 'Built a unified integration layer connecting HubSpot, Stripe, Mixpanel, Intercom, and Snowflake for a B2B SaaS company. Real-time sync replaced weekly CSV exports. Marketing can now attribute campaigns to actual revenue instead of just MQLs.', client: 'B2B SaaS Company (Series B)' },
    relatedServices: [
      { label: 'Workflow Automation', href: '/automation/workflow-automation' },
      { label: 'Data Pipelines', href: '/automation/data-pipelines' },
      { label: 'CRM Automation', href: '/automation/crm-automation' },
      { label: 'No-Code Stack', href: '/automation/no-code-stack' },
    ],
    faqs: [
      { question: 'What is the difference between an integration and a workflow automation?', answer: 'An integration connects two or more systems so data flows between them consistently — it is about data plumbing. A workflow automation orchestrates a multi-step business process — it is about process logic. In practice, they overlap heavily: a good workflow often depends on solid integrations underneath it. We typically build integrations first as the foundation, then layer workflow automations on top that use those integrations as building blocks.' },
      { question: 'Do you use native integrations, or do you build everything custom?', answer: 'We always start with what is already available. If HubSpot has a native Stripe integration that does 80% of what you need, we use it and build custom middleware only for the remaining 20%. Native integrations are cheaper, faster to deploy, and maintained by the vendor. Custom builds make sense when native integrations do not exist, do not support the data you need synced, or do not handle your volume. We never rebuild what already works.' },
      { question: 'How do you handle data conflicts — when the same field exists in two systems with different values?', answer: 'We establish a "source of truth" hierarchy during the architecture phase. For example, the CRM is the source of truth for contact information, the billing system is the source of truth for financial data, and the product database is the source of truth for usage data. When conflicts arise, the integration layer follows these rules and logs anomalies for review. We also build data validation checks that flag inconsistencies (e.g., a deal marked closed-won in the CRM but with no corresponding invoice in the billing system) for human investigation.' },
      { question: 'What happens when one of my tools changes its API?', answer: 'API changes are a fact of life. We monitor API changelogs for the tools in your stack and build integrations with version-aware error handling — if an API call returns an unexpected response, the integration logs the error, alerts us, and continues processing other data rather than crashing entirely. For retainer clients, we handle API updates as part of ongoing maintenance. For project clients, we provide documentation on how to update integrations when APIs change.' },
    ],
  },
  {
    slug: 'data-pipelines',
    title: 'Data Pipelines',
    h1: 'ETL, Data Sync & Reporting Automation',
    summary: 'Build automated data pipelines that turn raw data from multiple sources into clean, analysis-ready datasets and dashboards.',
    description: 'We build ETL pipelines that extract data from your business tools, transform it into analysis-ready datasets, and load it into your data warehouse or BI tool — automatically, on schedule.',
    problem: 'Your data lives in 10 different tools and none of them talk to each other. Every "simple" report request turns into a multi-hour manual data export and spreadsheet merge.',
    approach: [
      'Data audit: map all data sources, schemas, and reporting needs',
      'Architecture: design the ETL pipeline — ingestion, transformation, storage, visualization',
      'Build: implement pipelines with tools like Airbyte, Fivetran, dbt, or custom Python',
      'Visualize: build dashboards in Metabase, Looker Studio, or your existing BI tool',
      'Maintain: monitoring for pipeline failures, data freshness, and schema changes',
    ],
    deliverables: [
      'Automated ETL pipelines from source systems to data warehouse',
      'Clean, documented data models ready for analysis',
      'Dashboard suite covering core business metrics',
      'Pipeline monitoring with failure alerts',
      'Data dictionary and pipeline documentation',
    ],
    timeline: '4-8 weeks depending on data source count and complexity',
    icon: 'Database',
    kpis: ['Data freshness', 'Pipeline uptime', 'Report generation time', 'Data accuracy', 'Time saved on manual reporting'],
    longDescription: `Your business generates data constantly — every website visit, every deal update, every support ticket, every invoice, every product interaction. That data is the raw material for every strategic decision you make. The problem: it's trapped in a dozen different systems, each with its own schema, its own export format, and its own definition of what a "customer" or a "conversion" even means.

Data pipelines solve this by automating the flow of data from source systems into a centralized warehouse or analytics environment — extracted on schedule, transformed into consistent formats, validated for quality, and loaded into tables ready for querying and visualization. No more "can you pull a report on..." starting a three-hour manual data merge. No more board meeting slides built on data that was already two weeks stale when someone exported it.

We design and build ETL (Extract, Transform, Load) and ELT pipelines using tools like Airbyte and Fivetran for ingestion, dbt for transformation, and PostgreSQL, BigQuery, or Snowflake for storage — with Metabase or Looker Studio for visualization. Our methodology begins with a data audit: we map every data source, document the schemas, identify the key business questions that need answering, and design a pipeline architecture that delivers the right data at the right freshness for each use case. Operational metrics (daily revenue, lead volume, support ticket backlog) might need near-real-time sync. Strategic metrics (cohort retention, LTV by channel, quarterly trends) can run on daily or weekly schedules.

The deliverable isn't just a working pipeline — it's data you can trust. We build validation checks at every stage: row counts match between source and destination, key fields aren't null when they shouldn't be, values fall within expected ranges, and freshness SLAs are met. When something breaks — and in the real world, something always breaks — the pipeline alerts you with specific diagnostics rather than silently serving stale data. The end state: your team opens a dashboard, not a spreadsheet, and makes decisions on data that's hours old, not weeks old.`,
    whoItsFor: [
      'Founders making strategic decisions on "gut feel" because they can\'t get reliable, current data',
      'RevOps and analytics teams spending more time pulling data than analyzing it',
      'Companies with data in 5+ tools that need to be combined to answer basic business questions',
      'Growth-stage companies where board and investor reporting has become a multi-day fire drill every quarter',
      'Businesses that tried building pipelines internally but hit maintenance and reliability issues',
    ],
    caseStudySnippet: { metric: 'Board reporting time reduced from 4 days to 2 hours', context: 'Built an end-to-end data pipeline consolidating Salesforce, Stripe, Google Analytics, Zendesk, and PostgreSQL into a single BigQuery warehouse with Metabase dashboards. Automated previously manual quarterly investor reporting that consumed 4 days of a senior analyst\'s time.', client: 'E-Commerce Platform (Series C)' },
    relatedServices: [
      { label: 'Stack Integrations', href: '/automation/integrations' },
      { label: 'Workflow Automation', href: '/automation/workflow-automation' },
      { label: 'AI Agents', href: '/automation/ai-agents' },
      { label: 'CRM Automation', href: '/automation/crm-automation' },
    ],
    faqs: [
      { question: 'Do I need a data warehouse, or can I just build dashboards on top of my existing tools?', answer: 'It depends on scale and complexity. If you have 2-3 tools and simple reporting needs, direct dashboard connections work fine. But once you need to combine data across systems (e.g., marketing spend from one tool with revenue from another), handle historical data that tools purge after 90 days, or run queries that would slow down your production CRM — you need a warehouse. We help you make this call based on your actual requirements, not a vendor\'s upsell. Most growth-stage companies cross this threshold around 20-30 employees.' },
      { question: 'How do you keep data in sync when source systems change their schemas?', answer: 'Schema changes are inevitable — CRMs add fields, billing systems change data types, marketing tools rename properties. We build pipeline monitoring that detects schema drift (new columns, missing columns, type changes) and alerts before data starts failing silently. For common tools like HubSpot and Stripe, we use connectors that handle schema evolution automatically. For custom or less-common integrations, we include schema validation tests in the pipeline and maintain documentation on how to update transformations when schemas change.' },
      { question: 'What is the difference between a data pipeline and a simple integration?', answer: 'An integration moves data between two operational systems in real-time or near-real-time — it is about keeping tools in sync for day-to-day operations. A data pipeline moves data from operational systems into an analytics environment — it is about making data queryable for reporting, analysis, and machine learning. Integrations are about making today work happen. Data pipelines are about understanding what happened and what to do next. Most companies need both; they serve different purposes.' },
      { question: 'How long until we have usable dashboards?', answer: 'Depending on the number of data sources and the complexity of transformations, you will typically have your first dashboard live within 2-3 weeks. We prioritize the highest-value metrics first — usually revenue, customer acquisition, and core operational KPIs — and add data sources and dashboards iteratively. You do not need every data source connected on day one to start getting value. Most clients have 80% of their reporting needs covered within 6 weeks, with the remaining 20% (edge cases, complex transformations, historical backfills) rolled out over the following month.' },
    ],
  },
  {
    slug: 'crm-automation',
    title: 'CRM Automation',
    h1: 'CRM Automation — Pipeline, Workflows & Lead Routing',
    summary: 'Set up and optimize HubSpot, Attio, or Pipedrive to automate your sales process from lead capture to closed-won.',
    description: 'We configure your CRM to automate lead routing, deal stage progression, task creation, email sequences, and reporting — so your sales team spends time selling, not data-entering.',
    problem: 'Most CRMs are implemented as digital rolodexes. A properly configured CRM automates your sales process: lead scoring, routing, task reminders, deal stage automation, and pipeline analytics.',
    approach: [
      'Audit: review current CRM setup, sales process, and automation gaps',
      'Design: map ideal sales process to CRM stages, fields, automations, and reports',
      'Build: configure pipelines, properties, workflows, sequences, and dashboards',
      'Integrate: connect CRM to marketing, calendar, email, and billing tools',
      'Train: team training on CRM best practices and adoption playbook',
    ],
    deliverables: [
      'CRM configured with your sales process and automations',
      'Lead routing and scoring automation',
      'Email sequence templates for common sales motions',
      'Pipeline dashboard with conversion rates and velocity metrics',
      'CRM adoption playbook and team training session',
    ],
    timeline: '3-6 weeks depending on CRM and process complexity',
    icon: 'Contact',
    kpis: ['CRM adoption rate', 'Data completeness', 'Deal velocity', 'Pipeline conversion rate', 'Forecast accuracy'],
    longDescription: `A CRM should be your revenue engine, not a database your sales team resents updating. Yet most CRM implementations fall into the same trap: they're deployed as digital rolodexes — a place to store contacts and log calls — rather than as automation platforms that actively guide deals through your pipeline and do the administrative work for your reps.

We set up and optimize CRMs (HubSpot, Attio, Pipedrive) to automate your sales process end-to-end. Lead comes in from your website? Routed to the right rep based on territory, deal size, or product line — automatically. Deal sits in a stage too long? Task created for the rep with context on what to do next. Deal moves to contract stage? Legal template generated with the deal fields pre-filled. Deal closes? Customer onboarding task created in your project management tool and invoice generated in your billing system. None of this requires a human to remember to do it.

Our methodology starts with your sales process — not the CRM features. We map how you actually sell: what stages deals move through, what triggers stage progression, what information reps need at each stage, what follow-up sequences make sense, and what reporting matters to leadership. Then we configure the CRM to match that process: custom pipelines, properties that capture the data you actually need (not the 50 fields HubSpot suggests by default), automation rules that enforce process consistency, lead scoring that prioritizes the right prospects, and dashboards that show pipeline health, conversion rates, deal velocity, and forecast accuracy.

The outcome is a CRM your team wants to use because using it makes their job easier, not harder. Data entry is minimized through automation and integrations. Deals don't fall through cracks because the system flags them. Forecasting is based on actual pipeline data, not a sales manager's intuition. And when you decide to change your sales process — which you will — the CRM can be reconfigured without a consulting engagement. We train your team to own the system, not just use it.`,
    whoItsFor: [
      'Sales leaders whose CRM adoption is below 70% and dropping',
      'Founders who can\'t accurately forecast revenue because pipeline data is incomplete or stale',
      'Teams that have outgrown their current CRM (spreadsheets to Pipedrive, Pipedrive to HubSpot, HubSpot to Attio)',
      'Companies implementing a CRM for the first time and wanting to get it right from day one',
      'Revenue operations teams spending hours manually building reports that should be automated',
    ],
    caseStudySnippet: { metric: 'Deal velocity improved 34% and forecast accuracy reached 92% within one quarter', context: 'Reconfigured HubSpot for a 25-person sales team at a B2B services company. Built custom pipelines per product line, automated lead routing and deal stage progression, and implemented lead scoring based on firmographic fit and behavioral signals. Sales team adoption went from 41% to 94% in 8 weeks.', client: 'B2B Services Company (120 employees)' },
    relatedServices: [
      { label: 'Workflow Automation', href: '/automation/workflow-automation' },
      { label: 'Stack Integrations', href: '/automation/integrations' },
      { label: 'AI Agents', href: '/automation/ai-agents' },
      { label: 'Data Pipelines', href: '/automation/data-pipelines' },
    ],
    faqs: [
      { question: 'Which CRM should I use — HubSpot, Attio, or Pipedrive?', answer: 'Pipedrive is great for simple B2B sales pipelines — it is intuitive, affordable, and quick to set up. HubSpot is the right choice when you need marketing and sales alignment (email sequences, landing pages, lead scoring, reporting) in one platform. Attio is the best option for teams that need highly customizable data models, complex relationship mapping, and a modern UI — it is what we recommend for companies that have outgrown HubSpot rigidity. We will help you pick based on your sales process, team size, budget, and integration requirements — not based on which vendor we prefer.' },
      { question: 'How do you get a sales team to actually use the CRM?', answer: 'Adoption is a design problem, not a compliance problem. If the CRM creates work for reps, they will avoid it. If it removes work, they will use it. Our approach: (1) minimize data entry through automation and integrations — if the data exists in another system, it should sync, not be re-entered; (2) make the CRM the path of least resistance — if logging a call takes 10 seconds and skipping it means your deals do not show up in the forecast your VP reviews, people log calls; (3) build dashboards that reps actually want — personal pipeline views, commission calculators, deal health scores. When the CRM helps reps make more money, adoption takes care of itself.' },
      { question: 'Can you migrate us from one CRM to another without losing data or momentum?', answer: 'Yes — we have done dozens of CRM migrations. The process: (1) audit your current CRM data model, data quality, and integrations; (2) map fields and workflows to the new CRM, cleaning and transforming data along the way; (3) build the new CRM with your sales process, automations, and integrations; (4) run parallel systems for 1-2 weeks to validate; (5) migrate historical data with a cutover plan; (6) train the team. Typical migration takes 4-8 weeks depending on complexity, with zero data loss and minimal disruption to active deals.' },
      { question: 'What is included in CRM setup versus what is ongoing?', answer: 'Setup engagement (3-6 weeks) includes: CRM configuration (pipelines, properties, automations, permissions), lead routing and scoring, email sequence templates, dashboard suite, integration with 2-4 other tools, and team training. Ongoing retainer includes: CRM administration, new automation builds, integration maintenance, pipeline analytics and recommendations, user re-training as team grows, and quarterly sales process optimization reviews. Most clients do a setup engagement first, then move to a lighter retainer for maintenance and optimization.' },
    ],
  },
  {
    slug: 'no-code-stack',
    title: 'No-Code Stack',
    h1: 'No-Code & Low-Code Architecture for Founders',
    summary: 'Design and build your operational stack using no-code and low-code tools — powerful, flexible, and you can modify it without an engineer.',
    description: 'We architect and build operational systems using no-code platforms (Airtable, Softr, Glide, Bubble) and low-code tools (n8n, Retool, Supabase) — so you get powerful automation without vendor lock-in.',
    problem: 'Founders need operational tools but can\'t afford custom software for everything. No-code tools fill the gap — but only if they\'re architected properly from the start to avoid data silos and migration nightmares.',
    approach: [
      'Needs assessment: map operational requirements across all business functions',
      'Tool selection: recommend the right no-code/low-code tools for each use case',
      'Architecture: design data models, integrations, and permissions across the stack',
      'Build: implement the tools with proper setup, automation, and documentation',
      'Training: teach your team to use and modify the tools without needing us',
    ],
    deliverables: [
      'No-code stack architecture document with tool recommendations',
      'Implemented tools configured and integrated',
      'Data model documentation with relationships and dependencies',
      'Automation workflows connecting tools',
      'Team training sessions and reference documentation',
    ],
    timeline: '3-6 weeks for initial stack setup',
    icon: 'Layers',
    kpis: ['Tool adoption rate', 'Process automation rate', 'Team self-sufficiency score', 'Operational cost reduction', 'Time to onboard new team member'],
    longDescription: `Founders need operational software — CRM, project management, client portals, internal dashboards, approval workflows, resource scheduling — but they don't have the budget or timeline to commission custom software for every internal need, and they shouldn't duct-tape together a dozen disconnected SaaS subscriptions that each solve 20% of the problem.

No-code and low-code platforms have matured to the point where they can power serious business operations. Airtable can be your database and workflow engine. Softr or Glide can turn that Airtable base into a client portal or internal tool with authentication, permissions, and a polished UI. n8n can wire everything together with automated workflows that run on your infrastructure. Retool can build internal dashboards that would have taken a frontend team six weeks to deliver. Bubble can prototype a customer-facing web app in days, not months. The tools are powerful — but only if they're architected properly.

Our role is not just to build in these tools — it's to design the architecture so your stack doesn't become a house of cards. That means: normalized data models that don't create reconciliation nightmares when you eventually connect to a proper database; documented integration patterns so new tools don't break existing workflows; permission structures that keep client data secure as your team grows; and migration paths for when you outgrow no-code and need to graduate specific components to custom software. We build with the assumption that you will outgrow parts of your stack — and we make sure that transition is a lift, not a rebuild.

The deliverable is a fully functional operational stack that your team can use on day one, modify without engineering support, and scale to hundreds of users without breaking. More importantly, we train your team to own it. You shouldn't need to call us every time you want to add a field to a form or change a workflow trigger. Our goal is to make ourselves unnecessary for day-to-day operations — and available for the next level of complexity when you're ready.`,
    whoItsFor: [
      'Early-stage founders who need operational tools but cannot afford or justify custom software builds',
      'Operations teams running on spreadsheets that have outgrown their reliability and need a real database backend',
      'Founders who want to prototype internal tools before investing in custom development',
      'Teams that tried building no-code tools themselves and ended up with unmaintainable, undocumented systems',
      'Growth-stage companies that need client portals, internal dashboards, or approval workflows shipped in weeks, not months',
    ],
    caseStudySnippet: { metric: 'Client portal and internal ops platform shipped in 5 weeks at 85% less cost than custom development', context: 'Designed and built a complete operational stack for a professional services startup: Airtable database, Softr client portal for document sharing and project tracking, n8n workflows for client onboarding and invoicing, and Retool internal dashboard for resource allocation. Delivered in 5 weeks versus 4-6 months estimated for custom development.', client: 'Professional Services Startup (12 employees)' },
    relatedServices: [
      { label: 'Workflow Automation', href: '/automation/workflow-automation' },
      { label: 'Stack Integrations', href: '/automation/integrations' },
      { label: 'Data Pipelines', href: '/automation/data-pipelines' },
      { label: 'CRM Automation', href: '/automation/crm-automation' },
    ],
    faqs: [
      { question: 'Will I outgrow a no-code stack, and what happens when I do?', answer: 'Parts of it, yes — and that is a good problem to have. No-code tools have limits: Airtable slows down above ~100K records, Softr portals have customization ceilings, and Bubble apps can feel constrained at high complexity. The key is building with migration paths from day one. We design your data model so it can be migrated to PostgreSQL when the time comes. We document your workflows so they can be rebuilt in code if needed. And we advise on when a component should stay no-code versus when the ROI of custom development tips positive. Graduating from no-code is a sign of growth, not a failure of the tool.' },
      { question: 'Is my data secure in no-code tools?', answer: 'It depends on the tool and how it is configured — which is why architecture matters. Enterprise-grade platforms like Airtable (with SOC 2 compliance), n8n (self-hosted), and Retool (self-hosted or cloud with SOC 2) meet serious security requirements. We configure permissions granularly, enable SSO where available, ensure data encryption at rest and in transit, and for sensitive use cases, prioritize self-hosted tools where data stays in your infrastructure. No-code does not mean no-security — but it does require intentional architecture, which is what we provide.' },
      { question: 'How much does a no-code stack cost compared to custom software?', answer: 'For typical operational use cases — client portals, internal dashboards, workflow automation, approval systems — a no-code stack costs 10-25% of equivalent custom development and ships in 20-30% of the time. A client portal that would cost $40K-80K and take 3-4 months to build custom can be delivered for $8K-15K in 4-6 weeks on Softr + Airtable. Ongoing costs (platform subscriptions) typically run $50-200/user/month depending on the tools. The tradeoff is flexibility — you accept some constraints in exchange for dramatically lower cost and faster delivery.' },
      { question: 'Can my non-technical team really modify these tools without breaking things?', answer: 'Yes — when the architecture is designed for it. We build with a "guardrails, not gates" philosophy: your team can modify forms, add fields, adjust workflow triggers, and update dashboards without risk of breaking integrations or corrupting data. We document what each component does, which parts are safe to modify, and which parts should be changed carefully (or with our help). Every engagement includes training sessions where your team practices making common modifications. Most clients are self-sufficient for day-to-day changes within 2-3 weeks of launch.' },
    ],
  },
  {
    slug: 'audit',
    title: 'Free Automation Audit',
    h1: 'Free Automation Opportunity Map',
    summary: 'Get a process diagram identifying your top automation opportunities with estimated ROI — delivered within 72 hours.',
    description: 'We map your current manual processes and deliver a prioritized automation roadmap with estimated time savings, cost reduction, and implementation effort for each opportunity.',
    problem: '',
    approach: [],
    deliverables: [
      'Current process map with pain points and bottlenecks identified',
      'Automation opportunity prioritization matrix (impact × effort)',
      'Estimated hours saved and cost reduction per opportunity',
      'Recommended tool stack for your automation needs',
      '90-day automation roadmap with quick wins identified',
    ],
    longDescription: "",
    whoItsFor: [],
    caseStudySnippet: null,
    relatedServices: [],
    faqs: [],
    timeline: 'Delivered within 72 hours',
    icon: 'ClipboardCheck',
    kpis: [],
  },
];

// ── SPOKE PAGE DATA ────────────────────────────────────────────

export const SPOKE_PAGES: Record<SpokeId, SpokePageData> = {
  marketing: {
    spoke: 'marketing',
    hero: {
      badge: 'AI-Native Growth Partner',
      h1: 'AI-Native Growth Marketing for Founders Who Need Revenue, Not Reports',
      subhead: 'SEO, paid media, content, brand strategy, and CRO — built for measurable revenue within 90 days. We operate as your growth partner, not a vendor.',
      cta: 'Get Free Marketing Audit',
      secondaryCta: 'Book Strategy Call',
      stats: [
        { value: '3.2×', label: 'Average ROAS' },
        { value: '48h', label: 'Audit Turnaround' },
        { value: '90', label: 'Days to First ROI' },
        { value: '50+', label: 'Growth Clients' },
      ],
    },
    pains: [
      {
        title: 'You\'re spending on marketing but can\'t tie it to revenue',
        why: 'Most marketing agencies optimize for clicks and impressions — metrics that look good in reports but don\'t pay the bills. Without revenue attribution, you\'re flying blind.',
        cost: 'Founders waste 30-50% of marketing budget on channels and tactics that don\'t convert because nobody connected the dots from ad spend to closed revenue.',
      },
      {
        title: 'Your SEO is stuck while competitors eat your lunch',
        why: 'Search is changing fast — AI Overviews, LLM citations, and algorithm updates are reshaping the landscape. Traditional SEO tactics are losing effectiveness while AI-native strategies are pulling ahead.',
        cost: 'Every month your competitors outrank you is a month of pipeline you\'re losing. The gap compounds: it\'s cheaper to stay #1 than to climb from #10.',
      },
      {
        title: 'You have too many marketing vendors and not enough results',
        why: 'One agency for SEO, another for paid media, a freelancer for content, someone else for social — none of them talk to each other, and you spend half your week coordinating instead of building.',
        cost: 'Fragmented marketing execution creates brand inconsistency, duplicated spend, and finger-pointing when results don\'t come. One partner with one SLA solves this.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Free Marketing Audit',
        description: 'We review your SEO, paid media, content, conversion paths, and AI visibility. You get a 12-page prioritized report within 48 hours. No commitment.',
        deliverables: ['Full marketing diagnostic', 'Competitive gap analysis', 'AI search visibility assessment', 'Prioritized 90-day action plan'],
      },
      {
        step: '02',
        title: 'Strategy Call & Roadmap',
        description: 'We walk through the audit findings, align on priorities, and build a 90-day roadmap with specific KPIs, milestones, and weekly sprint plans.',
        deliverables: ['90-day growth roadmap', 'Channel strategy per audience', 'KPI framework with targets', 'Resource and budget plan'],
      },
      {
        step: '03',
        title: 'Execute & Optimize',
        description: 'We ship weekly: content, campaigns, technical fixes, experiments. Every sprint ties to a revenue metric. You get a dashboard, not a timesheet.',
        deliverables: ['Weekly sprint delivery', 'Performance dashboard', 'Monthly strategy review', 'Continuous experimentation'],
      },
    ],
    outcomes: [
      { metric: '3.2×', label: 'Average ROAS across paid channels', client: 'B2B SaaS Company', industry: 'Technology' },
      { metric: '247%', label: 'Organic traffic increase in 6 months', client: 'Professional Services Firm', industry: 'Consulting' },
      { metric: '2.8×', label: 'Conversion rate improvement', client: 'E-Commerce Brand', industry: 'Retail' },
    ],
    subServices: marketingSubServices,
    faqs: [
      {
        question: 'How is Qognition different from other marketing agencies?',
        answer: 'Three things: (1) We\'re AI-native — we build marketing programs with AI from the ground up, which means faster delivery, better insights, and lower cost. (2) We operate as a partner, not a vendor — one SLA, one relationship, one standard of execution. (3) We tie everything to revenue — if a marketing activity doesn\'t drive pipeline, we kill it.',
      },
      {
        question: 'What does the free audit actually include?',
        answer: 'A 12-page diagnostic covering: technical SEO health, paid media efficiency, content effectiveness, conversion path analysis, competitive positioning, and AI search visibility (are LLMs citing your brand?). Delivered within 48 hours as a deck plus a 15-minute Loom walkthrough. No catch — we earn the relationship by proving our value first.',
      },
      {
        question: 'How long until we see results?',
        answer: 'Most clients see measurable improvement within 90 days. Some channels move faster: paid media optimizations can show results in 2-4 weeks, SEO typically takes 60-90 days for meaningful ranking movement, and content programs build compounding momentum over 3-6 months. We set realistic expectations upfront and track progress weekly.',
      },
      {
        question: 'What does pricing look like?',
        answer: 'Marketing retainers range from $3,000–$20,000/month depending on scope, channels, and velocity. We offer three tiers — Growth, Scale, and Enterprise — each with transparent scope and deliverables. Project-based engagements (brand strategy, website builds) are scoped and priced individually. See our pricing page for details.',
      },
      {
        question: 'Do you work with early-stage startups?',
        answer: 'Yes — our Growth tier is designed for pre-seed to Series A companies who need marketing execution but can\'t justify a full-time marketing hire. We also offer project-based engagements (brand strategy, website, content foundation) for companies not ready for a retainer.',
      },
      {
        question: 'What if we already have a marketing team?',
        answer: 'We complement in-house teams — not replace them. Common models: we handle SEO and paid media while your team owns content and social; we provide strategy and your team executes; or we embed as fractional marketing leadership while your team handles day-to-day execution.',
      },
    ],
    pricing: {
      tiers: [
        {
          name: 'Growth',
          price: '$3,000–6,000/mo',
          description: 'For early-stage founders who need marketing execution without a full-time hire.',
          features: [
            'SEO foundation (technical audit + keyword strategy + on-page optimization)',
            '1 paid media channel (Google Ads or Meta)',
            'Content production (4 posts/month)',
            'Monthly performance dashboard',
            'Bi-weekly strategy calls',
            'Email nurture setup (3 sequences)',
          ],
          cta: 'Start with a Free Audit',
        },
        {
          name: 'Scale',
          price: '$8,000–14,000/mo',
          description: 'For growth-stage companies ready to build a systematic marketing engine.',
          features: [
            'Full SEO program (technical, content, authority building)',
            '2-3 paid media channels with cross-channel attribution',
            'Content engine (8-12 posts/month + lead magnets)',
            'CRO program with monthly A/B testing',
            'Weekly strategy calls + Slack access',
            'AI search optimization (LLM visibility)',
            'Lifecycle email marketing',
          ],
          cta: 'Start with a Free Audit',
          highlighted: true,
        },
        {
          name: 'Enterprise',
          price: '$16,000–20,000/mo',
          description: 'For companies scaling to $10M+ who need marketing leadership and multi-channel execution.',
          features: [
            'Everything in Scale, plus:',
            'Fractional marketing leadership (CMO-level strategy)',
            'Brand strategy and positioning',
            'Multi-language / international SEO',
            'Advanced analytics and revenue attribution',
            'Dedicated account team (strategist + specialists)',
            'Quarterly board-ready marketing reports',
          ],
          cta: 'Start with a Free Audit',
        },
      ],
      note: 'All tiers start with a free audit. No long-term contracts — 90-day initial engagement, then month-to-month. We earn the relationship every month.',
    },
    guarantee: {
      headline: '90-Day Results Guarantee',
      body: 'If we don\'t deliver measurable improvement in your agreed-upon KPIs within 90 days, we work for free until we do. We\'re that confident in our process — and we put our money where our mouth is.',
    },
    proofLogos: [
      { name: 'SaaS Academy' },
      { name: 'TechVentures' },
      { name: 'Growth Partners' },
      { name: 'ScaleUp Health' },
      { name: 'Revenue Labs' },
    ],
    teamMember: {
      name: 'Sarah Chen',
      role: 'Head of Growth Marketing',
      focus: '10 years scaling B2B SaaS companies from $1M to $50M ARR through SEO, paid media, and CRO.',
    },
  },

  tech: {
    spoke: 'tech',
    hero: {
      badge: 'Revenue-Focused Engineering',
      h1: 'We Build Software That Drives Revenue — Not Just Code That Compiles',
      subhead: 'Websites, web apps, integrations, and performance optimization — built to ship fast, scale, and contribute to your bottom line from day one.',
      cta: 'Get Free Tech Audit',
      secondaryCta: 'Book Scoping Call',
      stats: [
        { value: '200+', label: 'Projects Shipped' },
        { value: '98', label: 'PageSpeed Score Avg' },
        { value: '6', label: 'Weeks to Launch' },
        { value: '99.9%', label: 'Uptime SLA' },
      ],
    },
    pains: [
      {
        title: 'Your website is slow and it\'s costing you revenue',
        why: '53% of mobile visitors leave a page that takes more than 3 seconds to load. Every 100ms of latency impacts conversion rates. Your beautiful site is leaking pipeline every second it takes to load.',
        cost: 'A site loading in 5 seconds vs. 2 seconds typically loses 30-40% of potential conversions. For a company doing $1M in online revenue, that\'s $300K-400K left on the table — just from speed.',
      },
      {
        title: 'You\'re paying for custom development but getting technical debt',
        why: 'Most dev shops optimize for shipping fast, not for what happens after. The result: code that\'s hard to maintain, impossible to extend, and expensive to fix. Technical debt compounds — every new feature costs more than the last.',
        cost: 'Companies waste 20-30% of their development budget on rework caused by technical debt. And the hidden cost is worse: slow velocity means competitors ship features while you\'re fixing bugs.',
      },
      {
        title: 'Your tech stack is a collection of tools that don\'t talk to each other',
        why: 'CRM doesn\'t talk to your website. Analytics doesn\'t track what your billing system collects. Your team does manual data entry between 5 different tools. This isn\'t a technology problem — it\'s an architecture problem.',
        cost: 'Manual data handling costs the average growth-stage company 15-25 hours per week in productivity loss. That\'s nearly a full-time employee\'s worth of time spent copying data between systems.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Free Tech Audit',
        description: 'We analyze your site\'s performance, accessibility, SEO, security, and stack architecture. You get a prioritized report within 48 hours.',
        deliverables: ['Performance audit (Lighthouse + CWV)', 'SEO technical audit', 'Security header assessment', 'Stack architecture review'],
      },
      {
        step: '02',
        title: 'Architecture & Scoping',
        description: 'We design the solution architecture, define the technical scope, and build a sprint plan with clear milestones and deliverables.',
        deliverables: ['Technical architecture document', 'Sprint plan with milestones', 'Technology recommendations', 'Budget and timeline estimate'],
      },
      {
        step: '03',
        title: 'Build, Ship, Iterate',
        description: 'We build in weekly sprints with continuous deployment. You see progress every week. We test everything. We ship on time.',
        deliverables: ['Weekly sprint delivery', 'Staging environment for review', 'Automated test reports', 'Deployment to production'],
      },
    ],
    outcomes: [
      { metric: '98', label: 'Average PageSpeed score across client sites', client: 'SaaS Platform', industry: 'Technology' },
      { metric: '40%', label: 'Conversion rate improvement after rebuild', client: 'Professional Services Firm', industry: 'Consulting' },
      { metric: '6 wks', label: 'Average time from kickoff to launch', client: 'E-Commerce Brand', industry: 'Retail' },
    ],
    subServices: techSubServices,
    faqs: [
      {
        question: 'What\'s your tech stack?',
        answer: 'We primarily build with Next.js, React, TypeScript, and Tailwind CSS on the frontend; Node.js and Python on the backend; PostgreSQL and Supabase for data; and deploy on Vercel and AWS. We choose the right tool for the job — not the one that\'s trendy. We also have deep experience with Shopify, Webflow, and WordPress when those are the right fit.',
      },
      {
        question: 'How long does a typical website build take?',
        answer: 'Marketing websites: 6-10 weeks from kickoff to launch. Web applications (MVP): 4-8 weeks. E-commerce builds: 6-12 weeks. Custom integrations: 2-6 weeks. Every project starts with a scoping call to define the timeline based on your specific requirements.',
      },
      {
        question: 'Do you do maintenance and support after launch?',
        answer: 'Yes. Every project includes a 30-day warranty period. After that, we offer ongoing maintenance retainers that include monitoring, security updates, performance optimization, content updates, and feature enhancements. Most clients stay on a retainer after launch.',
      },
      {
        question: 'What\'s the difference between your websites and what I\'d get from a design agency?',
        answer: 'Design agencies optimize for aesthetics. We optimize for revenue. Our sites are built for speed (LCP < 2.5s), SEO (schema markup, metadata, semantics), conversion (clear CTAs, optimized forms, A/B test ready), and maintainability (headless CMS, clean code, documentation). Beautiful AND functional — not a tradeoff.',
      },
      {
        question: 'Can you work with our existing development team?',
        answer: 'Yes. Common models: we handle the frontend rebuild while your team owns the backend; we build the MVP and hand off to your team for ongoing development; or we provide architecture and code review for your team\'s projects. We integrate into your workflow, not the other way around.',
      },
      {
        question: 'What does pricing look like for a website or web app?',
        answer: 'Marketing websites: $15K-50K. Web application MVPs: $25K-75K. Full production web apps: $75K-200K+. E-commerce builds: $20K-80K. Every project is scoped individually — we provide a fixed-price proposal after the free tech audit and scoping call.',
      },
    ],
    pricing: {
      tiers: [
        {
          name: 'Sprint',
          price: '$10,000–25,000',
          description: 'For focused, scoped projects with clear requirements.',
          features: [
            'Defined scope with fixed deliverables',
            '2-4 week timeline',
            'Perfect for: landing pages, performance optimization, integration setup, MVP features',
            'Includes 30-day warranty',
          ],
          cta: 'Book Scoping Call',
        },
        {
          name: 'Build',
          price: '$25,000–100,000',
          description: 'For complete builds — websites, MVPs, and custom applications.',
          features: [
            'Full project lifecycle: discovery → design → build → launch',
            '6-12 week timeline typical',
            'Perfect for: marketing websites, web app MVPs, e-commerce stores',
            'Includes architecture docs, CMS, CI/CD, 30-day warranty',
          ],
          cta: 'Book Scoping Call',
          highlighted: true,
        },
        {
          name: 'Retainer',
          price: '$3,000–10,000/mo',
          description: 'For ongoing development, maintenance, and optimization.',
          features: [
            'Monthly sprint capacity (20-80 hours)',
            'Priority feature development',
            'Performance monitoring and optimization',
            'Security updates and maintenance',
            'Perfect for: post-launch iteration, ongoing feature development',
          ],
          cta: 'Book Scoping Call',
        },
      ],
      note: 'Every project starts with a free tech audit and scoping call. We provide a fixed-price proposal based on scope — no surprises, no scope creep without your approval.',
    },
    guarantee: {
      headline: 'Performance Guarantee',
      body: 'Every site we build ships with a PageSpeed score of 90+ and Core Web Vitals in the green. If it doesn\'t, we fix it for free. Speed isn\'t optional — it\'s table stakes.',
    },
    proofLogos: [
      { name: 'CloudBase' },
      { name: 'DataForge' },
      { name: 'StackSync' },
      { name: 'NexusDev' },
      { name: 'PixelForge' },
    ],
    teamMember: {
      name: 'Marcus Rivera',
      role: 'Head of Engineering',
      focus: '15 years building production software. Previously led engineering at a YC-backed SaaS company acquired for $120M.',
    },
  },

  finance: {
    spoke: 'finance',
    hero: {
      badge: 'Financial Operations',
      h1: 'Financial Operations That Give Founders Back Their Saturdays',
      subhead: 'Bookkeeping, tax, fractional CFO, and payroll — tech-enabled finance that goes beyond compliance to give you clarity, confidence, and time.',
      cta: 'Get Free Finance Health Check',
      secondaryCta: 'Book Discovery Call',
      stats: [
        { value: '500+', label: 'Monthly Closes' },
        { value: '$0', label: 'Tax Penalties (Ever)' },
        { value: '15h', label: 'Avg Hours Saved/Mo' },
        { value: '97%', label: 'Client Retention' },
      ],
    },
    pains: [
      {
        title: 'Your books are a mess and tax season terrifies you',
        why: 'When bookkeeping is an afterthought, every month creates more cleanup work. Transactions get miscategorized, reconciliations pile up, and by tax time you\'re drowning in a year\'s worth of financial chaos.',
        cost: 'Messy books cost you in three ways: missed tax deductions (typically 5-15% of potential savings), expensive CPA cleanup fees at year-end, and — worst of all — decisions made on bad data because you can\'t trust your numbers.',
      },
      {
        title: 'You\'re making financial decisions without real visibility',
        why: 'Most founders run their business on bank balance vibes — "money in the account feels good, so we must be fine." But bank balance tells you nothing about burn rate, unit economics, or cash runway. You\'re flying blind.',
        cost: 'The #1 reason startups fail is running out of cash — and most don\'t see it coming until they have less than 3 months of runway. By then, fundraising is desperate, not strategic.',
      },
      {
        title: 'You\'re spending too much time on finance instead of building',
        why: 'Every hour you spend categorizing transactions, reconciling accounts, or building financial reports is an hour you\'re not spending on product, sales, or strategy. You didn\'t start a company to be a bookkeeper.',
        cost: 'Founders typically spend 5-10 hours per week on financial admin. At a founder\'s effective hourly rate, that\'s $50K-150K+ per year in opportunity cost — and that doesn\'t count the mental overhead of financial stress.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Free Finance Health Check',
        description: 'We review your current financial operations and deliver a benchmark report comparing your setup to best practices for companies at your stage.',
        deliverables: ['Bookkeeping quality score', 'Cash flow health indicators', 'Tax efficiency review', 'Financial ops maturity benchmark'],
      },
      {
        step: '02',
        title: 'Onboarding & Cleanup',
        description: 'We connect your accounts, clean up historical data, set up your chart of accounts, and establish workflows. Clean foundation first.',
        deliverables: ['Chart of accounts setup', 'Historical cleanup (if needed)', 'Bank and credit card connections', 'Monthly close checklist'],
      },
      {
        step: '03',
        title: 'Monthly Close & Strategic Cadence',
        description: 'We run the monthly close, deliver financial statements, and provide strategic analysis. You get clarity, not just compliance.',
        deliverables: ['Monthly financial statements', 'Variance analysis', 'Cash flow forecast', 'Strategic recommendations'],
      },
    ],
    outcomes: [
      { metric: '15h', label: 'Average hours saved per month per client', client: 'SaaS Startup', industry: 'Technology' },
      { metric: '$0', label: 'Tax penalties across all clients', client: 'Growth-Stage Company', industry: 'Services' },
      { metric: '18mo', label: 'Average client retention and growing', client: 'E-Commerce Brand', industry: 'Retail' },
    ],
    subServices: financeSubServices,
    faqs: [
      {
        question: 'How are you different from a traditional bookkeeper or CPA firm?',
        answer: 'Three differences: (1) We\'re tech-enabled — we use modern accounting tools (QBO, Xero, Bill.com, Gusto) with automation to reduce manual work and errors. (2) We\'re strategic — our fractional CFO layer means your books feed into financial strategy, not just compliance. (3) We\'re integrated — finance is one spoke of an integrated operating partnership. Your marketing, tech, and finance data tell one story.',
      },
      {
        question: 'What accounting software do you use?',
        answer: 'We primarily work with QuickBooks Online and Xero. We\'ll work with your existing setup if it\'s one of these platforms. If you\'re not set up yet, we\'ll get you on the right platform during onboarding. We also integrate with Gusto (payroll), Bill.com (AP), Expensify (expenses), and most major banking and credit card providers.',
      },
      {
        question: 'Do you handle both business and personal taxes?',
        answer: 'Yes. For pass-through entities (LLCs, S-corps, sole props), we typically handle both business and personal returns since they\'re connected. For C-corps, we handle the business return and can prepare personal returns for founders separately.',
      },
      {
        question: 'What does a fractional CFO actually do for my business?',
        answer: 'A fractional CFO provides strategic finance leadership: financial modeling and forecasting, cash flow management, fundraising preparation (investor materials, due diligence support), board reporting, pricing analysis, unit economics, and M&A support. Think of it as having a senior finance leader on your team for 10-20 hours a month instead of full-time.',
      },
      {
        question: 'How quickly can you get my books cleaned up?',
        answer: 'Typical cleanup takes 2-4 weeks depending on transaction volume and how far behind you are. We\'ve cleaned up books that were 2+ years behind. The sooner you start, the sooner you have clarity. Rush cleanup (within 1 week) is available for fundraising or due diligence situations.',
      },
      {
        question: 'What does pricing look like?',
        answer: 'Bookkeeping-only starts at $500/month for simple businesses. Full-service (bookkeeping + tax + fractional CFO) ranges from $1,500-7,500/month depending on transaction volume, entity complexity, and CFO engagement level. Every engagement starts with a free Finance Health Check to scope the right level of support.',
      },
    ],
    pricing: {
      tiers: [
        {
          name: 'Bookkeeping',
          price: '$500–1,500/mo',
          description: 'For founders who need clean books and tax-ready financials.',
          features: [
            'Monthly transaction categorization',
            'Bank and credit card reconciliation',
            'Monthly financial statements (P&L, Balance Sheet)',
            'Year-end tax-ready financials',
            'QBO/Xero subscription management',
          ],
          cta: 'Get Free Health Check',
        },
        {
          name: 'CFO',
          price: '$1,500–4,500/mo',
          description: 'For founders who need strategic finance, not just compliance.',
          features: [
            'Everything in Bookkeeping, plus:',
            'Fractional CFO (10-20 hours/month)',
            'Financial modeling and forecasting',
            'Cash flow management with 13-week forecast',
            'Board and investor reporting',
            'Fundraising support (materials, due diligence)',
            'Monthly strategy review calls',
          ],
          cta: 'Get Free Health Check',
          highlighted: true,
        },
        {
          name: 'Combined',
          price: '$3,000–7,500/mo',
          description: 'Full-service finance operations for growth-stage companies.',
          features: [
            'Everything in CFO, plus:',
            'Tax preparation and strategy (business + personal)',
            'Payroll management and compliance',
            'AP/AR management',
            'Custom KPI dashboard',
            'Quarterly board package preparation',
            'Priority support (same-day response)',
          ],
          cta: 'Get Free Health Check',
        },
      ],
      note: 'All engagements start with a free Finance Health Check. We\'ll recommend the right tier based on your transaction volume, entity structure, and strategic needs — not the highest price.',
    },
    guarantee: {
      headline: 'Accuracy Guarantee',
      body: 'If we make a bookkeeping error that results in a tax penalty, we pay the penalty. We\'re that confident in our process — and we carry professional liability insurance to back it up.',
    },
    proofLogos: [
      { name: 'ClearBooks' },
      { name: 'FinScale' },
      { name: 'CapTable Partners' },
      { name: 'LedgerTech' },
      { name: 'Compass CFO' },
    ],
    teamMember: {
      name: 'Priya Patel',
      role: 'Head of Finance',
      focus: 'CPA with 12 years of experience. Former controller at a PE-backed services company. Specializes in founder finance and cash flow strategy.',
    },
  },

  automation: {
    spoke: 'automation',
    hero: {
      badge: 'AI-Powered Operations',
      h1: 'AI Agents & Automation That Run Your Ops While You Sleep',
      subhead: 'Custom AI agents, workflow automation, CRM integration, and data pipelines — built for founders who want to scale without scaling headcount.',
      cta: 'Get Free Automation Map',
      secondaryCta: 'Book Strategy Call',
      stats: [
        { value: '40+', label: 'AI Agents Deployed' },
        { value: '85%', label: 'Avg Task Automation' },
        { value: '30h', label: 'Avg Hours Saved/Week' },
        { value: '6mo', label: 'Avg Payback Period' },
      ],
    },
    pains: [
      {
        title: 'Your team is buried in repetitive manual work',
        why: 'Data entry, lead routing, report generation, invoice processing, customer support triage — tasks that are important but don\'t require human judgment every single time. Your expensive team spends 30-40% of their week on work that software should handle.',
        cost: 'A 10-person team losing 15 hours/week each to manual processes is 150 hours/week — nearly 4 full-time employees worth of capacity. At an average loaded cost of $75/hour, that\'s $585,000/year in wasted capacity.',
      },
      {
        title: 'Your data lives in silos and "reporting" means manual Excel merges',
        why: 'CRM, marketing platform, billing system, support tool — each has valuable data but none of them talk to each other. Every report request kicks off a multi-hour manual data export and spreadsheet merge.',
        cost: 'Decisions made on incomplete or stale data are expensive. Companies with integrated data stacks make decisions 5x faster and are 2x more likely to hit revenue targets than those with siloed data.',
      },
      {
        title: 'You know AI could help but don\'t know where to start',
        why: 'The AI landscape is overwhelming — new models, tools, and frameworks every week. Most founders either do nothing (falling behind) or chase every shiny AI tool (wasting time and money). Neither works.',
        cost: 'Competitors who deploy AI effectively are seeing 20-40% efficiency gains in operations. Every quarter you delay is a quarter they pull further ahead. The window for AI advantage is closing.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Free Automation Map',
        description: 'We map your current manual processes, identify automation opportunities, and estimate ROI for each. Delivered as a process diagram within 72 hours.',
        deliverables: ['Current process map', 'Automation opportunity matrix', 'Estimated ROI per opportunity', 'Recommended tool stack'],
      },
      {
        step: '02',
        title: 'Architecture & Build',
        description: 'We design the automation architecture, select tools, and build the workflows or agents. You see progress weekly. We test everything before go-live.',
        deliverables: ['Automation architecture doc', 'Working workflows/agents', 'Testing and QA report', 'Documentation and runbooks'],
      },
      {
        step: '03',
        title: 'Monitor & Optimize',
        description: 'We monitor automation performance, handle exceptions, and continuously optimize. Monthly reviews to identify new automation opportunities.',
        deliverables: ['Performance dashboard', 'Exception handling and alerts', 'Monthly optimization report', 'New opportunity pipeline'],
      },
    ],
    outcomes: [
      { metric: '30h', label: 'Average hours saved per week per client', client: 'B2B Services Company', industry: 'Professional Services' },
      { metric: '85%', label: 'Lead qualification automated', client: 'SaaS Platform', industry: 'Technology' },
      { metric: '6mo', label: 'Average payback period on automation investment', client: 'E-Commerce Brand', industry: 'Retail' },
    ],
    subServices: automationSubServices,
    faqs: [
      {
        question: 'What\'s the difference between AI agents and workflow automation?',
        answer: 'Workflow automation handles deterministic, rule-based processes — "when X happens, do Y." AI agents handle judgment-based tasks — "read this email, determine the customer\'s intent, and draft an appropriate response." Most business processes need both: workflows for the predictable parts, AI agents for the parts that require understanding and judgment.',
      },
      {
        question: 'What tools and platforms do you use?',
        answer: 'Workflow automation: n8n, Make, Zapier. AI agents: custom builds using OpenAI, Anthropic Claude, and open-source models. Data pipelines: Airbyte, Fivetran, dbt, custom Python. CRM: HubSpot, Attio, Pipedrive. We choose tools based on your existing stack, budget, and requirements — not based on which vendor we have a partnership with.',
      },
      {
        question: 'How do you handle data privacy and security with AI agents?',
        answer: 'We design AI agents with data privacy as a first principle. Options include: using API-based models with zero data retention policies (like Anthropic\'s API), self-hosting open-source models for sensitive data, and implementing PII redaction layers before data reaches the AI. Every automation project includes a security review.',
      },
      {
        question: 'How long until we see ROI from automation?',
        answer: 'Quick-win automations (lead routing, notification workflows, simple data syncs) can show ROI within 2-4 weeks. More complex automations (AI agents, full data pipelines) typically show ROI within 3-6 months. Our average client sees full payback on their automation investment within 6 months.',
      },
      {
        question: 'Can you work with our existing tools, or do we need to switch?',
        answer: 'We work with your existing stack whenever possible. We\'ll only recommend switching tools if your current setup is fundamentally limiting what\'s possible or if the cost of integration exceeds the cost of migration. We\'re tool-agnostic — our loyalty is to the outcome, not any specific platform.',
      },
      {
        question: 'What if we don\'t know what to automate first?',
        answer: 'That\'s exactly what the Free Automation Map is for. We spend 72 hours analyzing your current operations, identifying automation opportunities, and ranking them by impact × effort. You get a clear, prioritized roadmap. No commitment required — the map itself is valuable even if you decide to build internally.',
      },
    ],
    pricing: {
      tiers: [
        {
          name: 'Sprint',
          price: '$5,000–15,000',
          description: 'For focused automation projects with clear scope.',
          features: [
            '2-4 week engagement',
            'Perfect for: single workflow automation, basic AI agent, data sync setup',
            'Includes process documentation and team training',
            '30-day warranty on all deliverables',
          ],
          cta: 'Get Free Automation Map',
        },
        {
          name: 'Build',
          price: '$15,000–50,000',
          description: 'For comprehensive automation programs across multiple processes.',
          features: [
            '6-12 week engagement typical',
            'Perfect for: multi-workflow automation, custom AI agents, data pipeline builds',
            'Includes architecture docs, monitoring setup, team training',
            '60-day warranty with priority support',
          ],
          cta: 'Get Free Automation Map',
          highlighted: true,
        },
        {
          name: 'Retainer',
          price: '$2,000–8,000/mo',
          description: 'For ongoing automation management, optimization, and new builds.',
          features: [
            'Monthly sprint capacity (10-40 hours)',
            'Automation monitoring and exception handling',
            'Continuous optimization and new opportunity scouting',
            'Priority support and same-day response',
            'Quarterly automation ROI review',
          ],
          cta: 'Get Free Automation Map',
        },
      ],
      note: 'Every engagement starts with a free Automation Opportunity Map. We\'ll identify the highest-ROI opportunities and recommend the right approach — sometimes a $5K sprint delivers more value than a $50K build.',
    },
    guarantee: {
      headline: 'ROI Guarantee',
      body: 'If our automation doesn\'t deliver the projected time savings within 90 days of deployment, we work for free until it does. We measure success in hours returned to your team and revenue impact — not lines of code written.',
    },
    proofLogos: [
      { name: 'WorkflowAI' },
      { name: 'AutomatePro' },
      { name: 'DataSync' },
      { name: 'OpsForge' },
      { name: 'PipelineIQ' },
    ],
    teamMember: {
      name: 'David Okonkwo',
      role: 'Head of Automation',
      focus: 'Built 200+ AI agents and automated workflows for companies ranging from seed-stage to Fortune 500. Previously led automation at a top-tier systems integrator.',
    },
  },
};

export function getSpokePageData(spoke: SpokeId): SpokePageData {
  return SPOKE_PAGES[spoke];
}

export function getSubService(spoke: SpokeId, slug: string): SubService | undefined {
  return SPOKE_PAGES[spoke]?.subServices.find((s) => s.slug === slug);
}
