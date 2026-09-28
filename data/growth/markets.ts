import type { GrowthMarket } from './types';
type MarketRow = [string,string,string,string[],string,string[]];
const rows: MarketRow[] = [
 ['US','united-states','United States',['en'],'Choose buyer markets and buying groups before campaign regions. A nationwide service does not require a claim of a local office.',['Texas','California','Midwest','Rust Belt','New York','Boston','Washington DC']],
 ['CA','canada','Canada',['en','fr'],'Treat language, province and customer market as separate planning inputs. Review both English and French content requirements for the intended audience.',['Toronto','Vancouver','Montreal','Calgary']],
 ['AU','australia','Australia',['en'],'Match industrial, software or professional-service messages to the actual buyer and project location. Make remote delivery and time-zone coordination explicit.',['Sydney','Melbourne','Brisbane','Perth']],
 ['GB','united-kingdom','United Kingdom',['en'],'Describe the client’s target market and delivery model clearly. Keep country, constituent nation, city and economic cluster distinct.',['London','Cambridge','Oxford','Manchester']],
 ['NL','netherlands','Netherlands',['nl','en'],'Decide whether the audience is domestic or international before choosing the page language and campaign message.',['Amsterdam','Rotterdam','Utrecht']],
 ['DE','germany','Germany',['de','en'],'Technical products need accurate German terminology and expert-reviewed specifications when addressing German-language buyers. Cross-border programs need a separate customer-market brief.',['Munich','Stuttgart','Frankfurt','Hamburg','Berlin']],
 ['SE','sweden','Sweden',['sv','en'],'Choose Swedish or English content from the buying context rather than treating language as a proxy for company location.',['Stockholm','Gothenburg']],
 ['DK','denmark','Denmark',['da','en'],'Align the message to the product, buyer group and target market. Review the terminology of technical and regulated offers with a qualified specialist.',['Copenhagen']],
 ['NO','norway','Norway',['nb','en'],'Use the actual operating and procurement context to shape content. The Norwegian locale currently supports Bokmål; other language needs require a separate content brief.',['Oslo','Stavanger']],
 ['FI','finland','Finland',['fi','en'],'Separate the company’s home market from the countries in which it wants to win customers. Review Finnish technical language before publication.',['Helsinki']],
 ['CH','switzerland','Switzerland',['de','fr','it','en'],'Use audience language and canton-level context when relevant, without inferring language from a single national page.',['Zurich','Geneva','Basel']],
 ['AE','united-arab-emirates','United Arab Emirates',['ar','en'],'Explain whether the offer targets a domestic buyer, a regional headquarters or international customers. Support Arabic layouts where Arabic content is published.',['Dubai','Abu Dhabi']],
 ['SG','singapore','Singapore',['en','zh-Hans'],'Distinguish Singapore-based account targeting from regional expansion programs. Language and intended customer market remain explicit inputs.',['Singapore']],
 ['IE','ireland','Ireland',['en'],'Clarify whether the program addresses domestic buyers or internationally selling businesses. Keep Ireland and Northern Ireland geographically distinct.',['Dublin','Cork','Galway','Limerick']],
 ['AT','austria','Austria',['de','en'],'Include Austria in DACH planning while keeping its country, buyer and language requirements explicit.',['Vienna','Graz','Linz']],
 ['CN','china','China',['zh-Hans','en'],'For export programs, build content for the destination buyer’s language and procurement needs. Confirm platform availability and operating requirements instead of assuming all markets use the same search products.',['Shenzhen','Guangzhou','Shanghai']],
 ['IN','india','India',['en'],'For internationally selling software and service firms, separate headquarters location from the customer markets and languages the campaign must serve.',['Bengaluru','Pune','Hyderabad','Chennai']],
];
export const growthMarkets: GrowthMarket[] = rows.map(([code,slug,name,languages,planning,clusterExamples], index) => ({ id: `country:${code}`, code, slug, name, languages, planning, clusterExamples, priority: index + 1, role: ['CN','IN'].includes(code) ? 'export' : 'acquisition' }));
export const growthMarketClusters = [
  { id: 'cluster:dach', name: 'DACH', countries: ['DE','AT','CH'], type: 'economic-region' },
  { id: 'cluster:nordics', name: 'Nordics', countries: ['SE','DK','NO','FI','IS'], type: 'cross-border-region' },
  { id: 'cluster:us-midwest', name: 'US Midwest', countries: ['US'], type: 'economic-region' },
  { id: 'cluster:rust-belt', name: 'Rust Belt', countries: ['US'], type: 'economic-region' },
  { id: 'cluster:silicon-valley', name: 'Silicon Valley', countries: ['US'], type: 'economic-region' },
] as const;
