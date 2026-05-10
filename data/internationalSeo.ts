export type GlobalMarketPage = {
  slug: string;
  country: string;
  region: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  opportunities: string[];
  services: string[];
  faqs: { question: string; answer: string }[];
};

export type LanguageSeoPage = {
  slug: string;
  language: string;
  nativeName: string;
  countries: string[];
  title: string;
  description: string;
  intro: string;
  services: string[];
};

const faq = (market: string) => [
  {
    question: `Do you localize campaigns for ${market}?`,
    answer:
      'Yes. Qognition adapts keyword research, landing pages, ad copy, content, analytics, and conversion funnels to local buyer language and search behavior.'
  },
  {
    question: `Can Qognition support cross-border lead generation for ${market}?`,
    answer:
      'Yes. We build cross-border SEO, paid media, and CRM tracking for companies entering or expanding from priority markets.'
  },
  {
    question: `Do you claim local offices in every country?`,
    answer:
      'No. These are market and service-area pages. We avoid false office claims and focus on strategy, execution, and demand generation for the target market.'
  }
];

export const GLOBAL_MARKETS: GlobalMarketPage[] = [
  {
    slug: 'china-market-entry',
    country: 'China',
    region: 'APAC',
    title: 'China Market Entry Digital Marketing | Qognition Agency',
    description:
      'Digital marketing for companies entering China, including Baidu SEO planning, Mandarin content, local trust signals, paid media strategy, and cross-border lead capture.',
    h1: 'China Market Entry Digital Marketing',
    intro:
      'Qognition helps international companies prepare demand generation systems for China with localized positioning, Mandarin content strategy, China-specific search behavior, and conversion paths built for cross-border buyers.',
    opportunities: ['Baidu and local search readiness', 'Mandarin landing pages', 'China buyer trust signals', 'Cross-border CRM attribution'],
    services: ['Mandarin SEO strategy', 'China landing pages', 'Market-entry content', 'Paid media planning', 'HubSpot lead routing'],
    faqs: faq('China')
  },
  {
    slug: 'marketing-out-of-china',
    country: 'China outbound',
    region: 'APAC',
    title: 'Marketing Out of China | Global Expansion Marketing for Chinese Companies',
    description:
      'Qognition helps China-based and China-focused companies market internationally across English, Arabic, French, Spanish, Portuguese, Japanese, and other markets.',
    h1: 'Marketing Out of China to Global Markets',
    intro:
      'For companies expanding out of China, Qognition builds multilingual search, paid media, landing page, and lead capture systems for international demand generation.',
    opportunities: ['English-language positioning', 'International SEO', 'Localized paid campaigns', 'Global CRM and attribution'],
    services: ['Global SEO', 'Multilingual landing pages', 'LinkedIn B2B demand generation', 'Google Ads localization', 'International analytics'],
    faqs: faq('China outbound')
  },
  ...[
    ['united-states', 'United States', 'North America'],
    ['united-kingdom', 'United Kingdom', 'Europe'],
    ['canada', 'Canada', 'North America'],
    ['australia', 'Australia', 'Oceania'],
    ['france', 'France', 'Europe'],
    ['germany', 'Germany', 'Europe'],
    ['spain', 'Spain', 'Europe'],
    ['united-arab-emirates', 'United Arab Emirates', 'GCC'],
    ['saudi-arabia', 'Saudi Arabia', 'GCC'],
    ['india', 'India', 'APAC'],
    ['japan', 'Japan', 'APAC'],
    ['brazil', 'Brazil', 'LATAM'],
    ['portugal', 'Portugal', 'Europe'],
    ['mexico', 'Mexico', 'LATAM'],
    ['russia', 'Russia', 'Europe and Asia'],
    ['singapore', 'Singapore', 'APAC']
  ].map(([slug, country, region]) => ({
    slug,
    country,
    region,
    title: `Digital Marketing Agency for ${country} | Qognition Agency`,
    description: `SEO, Google Ads, AI search visibility, landing pages, and lead generation for companies targeting ${country}.`,
    h1: `Digital Marketing Agency for ${country}`,
    intro: `Qognition builds country-specific growth programs for companies entering, expanding in, or marketing from ${country}. Each strategy adapts search intent, buyer language, proof, landing pages, paid media, and CRM tracking to the market.`,
    opportunities: ['Country-specific SEO', 'Localized landing pages', 'Paid media testing', 'Industry and city targeting'],
    services: ['SEO strategy', 'Google Ads', 'AI search visibility', 'Conversion websites', 'Lead capture and CRM tracking'],
    faqs: faq(country)
  }))
];

export const LANGUAGE_SEO_PAGES: LanguageSeoPage[] = [
  {
    slug: 'arabic',
    language: 'Arabic',
    nativeName: 'العربية',
    countries: ['United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Egypt'],
    title: 'Arabic Digital Marketing and SEO | Qognition Agency',
    description: 'Arabic SEO, Arabic landing pages, GCC paid media, and Arabic-language lead generation for regional and global brands.',
    intro:
      'Qognition helps brands reach Arabic-speaking buyers with localized search intent, culturally fluent landing pages, paid media, and lead capture.',
    services: ['Arabic SEO', 'GCC Google Ads', 'Arabic landing pages', 'Regional content strategy']
  },
  {
    slug: 'french',
    language: 'French',
    nativeName: 'Français',
    countries: ['France', 'Canada', 'Belgium', 'Switzerland', 'Morocco'],
    title: 'French SEO and Digital Marketing | Qognition Agency',
    description: 'French SEO, French-language content, paid media, and localization for France, Canada, and Francophone markets.',
    intro:
      'Qognition builds French-language growth systems for companies targeting France, Canada, and wider Francophone demand.',
    services: ['French SEO', 'French content strategy', 'Localized ads', 'Francophone landing pages']
  },
  {
    slug: 'spanish',
    language: 'Spanish',
    nativeName: 'Español',
    countries: ['Spain', 'Mexico', 'Argentina', 'Chile', 'Colombia', 'United States'],
    title: 'Spanish SEO and Digital Marketing | Qognition Agency',
    description: 'Spanish SEO, Spanish-language content, LATAM paid media, and multilingual landing pages.',
    intro:
      'Qognition helps companies reach Spanish-speaking buyers through search, paid media, content, landing pages, and CRM-connected lead capture.',
    services: ['Spanish SEO', 'LATAM content', 'Spanish landing pages', 'Google Ads localization']
  },
  {
    slug: 'mandarin',
    language: 'Mandarin',
    nativeName: '中文',
    countries: ['China', 'Singapore', 'Taiwan', 'Malaysia'],
    title: 'Mandarin SEO and China Market Digital Marketing | Qognition Agency',
    description: 'Mandarin SEO, China market-entry content, Mandarin landing pages, and international campaigns for Chinese-speaking buyers.',
    intro:
      'Qognition supports Mandarin-language growth for companies entering China and China-based companies marketing globally.',
    services: ['Mandarin SEO', 'China market entry', 'Mandarin landing pages', 'Cross-border campaigns']
  },
  {
    slug: 'portuguese',
    language: 'Portuguese',
    nativeName: 'Português',
    countries: ['Brazil', 'Portugal', 'Angola'],
    title: 'Portuguese SEO and Digital Marketing | Qognition Agency',
    description: 'Portuguese SEO, Brazil and Portugal content strategy, paid media, and localized landing pages.',
    intro:
      'Qognition builds Portuguese-language SEO and paid media systems for Brazil, Portugal, and wider Lusophone markets.',
    services: ['Portuguese SEO', 'Brazil growth strategy', 'Portugal landing pages', 'Localized paid search']
  },
  {
    slug: 'russian',
    language: 'Russian',
    nativeName: 'Русский',
    countries: ['Russia', 'Kazakhstan', 'Armenia', 'Georgia'],
    title: 'Russian SEO and Digital Marketing | Qognition Agency',
    description: 'Russian-language SEO, content localization, paid media planning, and international lead generation.',
    intro:
      'Qognition helps companies localize search, landing pages, and conversion funnels for Russian-speaking buyers.',
    services: ['Russian SEO', 'Russian content', 'Localized landing pages', 'International demand generation']
  },
  {
    slug: 'japanese',
    language: 'Japanese',
    nativeName: '日本語',
    countries: ['Japan'],
    title: 'Japanese SEO and Digital Marketing | Qognition Agency',
    description: 'Japanese SEO, Japanese landing pages, market-entry content, and B2B lead generation for Japan.',
    intro:
      'Qognition supports Japan-focused growth with localized SEO, content, paid media, and trust-building landing pages.',
    services: ['Japanese SEO', 'Japan market entry', 'Japanese landing pages', 'B2B lead generation']
  }
];

export const getGlobalMarket = (slug: string) => GLOBAL_MARKETS.find((market) => market.slug === slug);
export const getLanguageSeoPage = (slug: string) => LANGUAGE_SEO_PAGES.find((page) => page.slug === slug);
