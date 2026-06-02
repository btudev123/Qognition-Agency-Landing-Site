import { Location } from '../types';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const city = (name: string, country: string, region: string, marketFocus: string[]): Location => ({
  name,
  slug: slugify(name),
  country,
  region,
  type: 'city',
  marketFocus,
  intro: `Qognition builds service-area digital growth programs for brands targeting ${name}, with local SEO, paid media, content, and conversion systems tuned to the market.`,
  localModifiers: [`${name} agency`, `${name} SEO`, `${name} PPC`, `${name} web design`],
  canonicalParent: slugify(region),
  schemaType: 'City'
});

const area = (
  name: string,
  country: string,
  region: string,
  type: Location['type'],
  marketFocus: string[]
): Location => ({
  name,
  slug: slugify(name),
  country,
  region,
  type,
  marketFocus,
  intro: `Qognition supports companies across ${name} with search visibility, performance marketing, AI search optimization, and high-converting web experiences built around real buyer demand.`,
  localModifiers: [`${name} digital marketing`, `${name} SEO services`, `${name} growth agency`],
  schemaType: type === 'country' ? 'Country' : type === 'city' ? 'City' : 'AdministrativeArea'
});

export const LAUNCH_CITIES: Location[] = [
  city('New York', 'United States', 'North America', ['Finance', 'SaaS', 'Enterprise']),
  city('Los Angeles', 'United States', 'North America', ['Media', 'E-commerce', 'Luxury']),
  city('Chicago', 'United States', 'North America', ['B2B', 'Manufacturing', 'Professional Services']),
  city('Houston', 'United States', 'North America', ['Energy', 'Industrial', 'Healthcare']),
  city('Dallas', 'United States', 'North America', ['B2B', 'Real Estate', 'Technology']),
  city('Miami', 'United States', 'North America', ['Real Estate', 'Luxury', 'Hospitality']),
  city('San Francisco', 'United States', 'North America', ['SaaS', 'AI', 'Fintech']),
  city('Seattle', 'United States', 'North America', ['Technology', 'E-commerce', 'Cloud']),
  city('Boston', 'United States', 'North America', ['Healthcare', 'Education', 'Fintech']),
  city('Washington DC', 'United States', 'North America', ['Government', 'Legal', 'Consulting']),
  city('Toronto', 'Canada', 'North America', ['Finance', 'SaaS', 'Professional Services']),
  city('Vancouver', 'Canada', 'North America', ['Technology', 'Real Estate', 'Tourism']),
  city('Montreal', 'Canada', 'North America', ['AI', 'Creative', 'E-commerce']),
  city('London', 'United Kingdom', 'Europe', ['Fintech', 'Professional Services', 'Luxury']),
  city('Manchester', 'United Kingdom', 'Europe', ['B2B', 'E-commerce', 'SaaS']),
  city('Birmingham', 'United Kingdom', 'Europe', ['Manufacturing', 'Professional Services', 'Local Services']),
  city('Paris', 'France', 'Europe', ['Luxury', 'Retail', 'Finance']),
  city('Lyon', 'France', 'Europe', ['B2B', 'Healthcare', 'Manufacturing']),
  city('Marseille', 'France', 'Europe', ['Logistics', 'Tourism', 'Trade']),
  city('Berlin', 'Germany', 'Europe', ['Startups', 'SaaS', 'AI']),
  city('Munich', 'Germany', 'Europe', ['Enterprise', 'Automotive', 'Finance']),
  city('Hamburg', 'Germany', 'Europe', ['Logistics', 'Media', 'B2B']),
  city('Frankfurt', 'Germany', 'Europe', ['Finance', 'B2B', 'Enterprise']),
  city('Dubai', 'United Arab Emirates', 'GCC', ['Real Estate', 'Luxury', 'Tourism']),
  city('Abu Dhabi', 'United Arab Emirates', 'GCC', ['Government', 'Finance', 'Energy']),
  city('Riyadh', 'Saudi Arabia', 'GCC', ['Government', 'Real Estate', 'Enterprise']),
  city('Jeddah', 'Saudi Arabia', 'GCC', ['Retail', 'Hospitality', 'Trade']),
  city('Doha', 'Qatar', 'GCC', ['Finance', 'Sports', 'Luxury']),
  city('Singapore', 'Singapore', 'Asia Pacific', ['Fintech', 'SaaS', 'B2B']),
  city('Sydney', 'Australia', 'Oceania', ['Finance', 'Retail', 'Professional Services']),
  city('Melbourne', 'Australia', 'Oceania', ['Retail', 'Education', 'Healthcare']),
  city('Brisbane', 'Australia', 'Oceania', ['Local Services', 'Tourism', 'Real Estate']),
  city('Perth', 'Australia', 'Oceania', ['Mining', 'Industrial', 'B2B']),
  city('Auckland', 'New Zealand', 'Oceania', ['Tourism', 'SaaS', 'Local Services']),
  city('Mumbai', 'India', 'Asia Pacific', ['Finance', 'Entertainment', 'Enterprise']),
  city('Delhi', 'India', 'Asia Pacific', ['Government', 'Education', 'B2B']),
  city('Bengaluru', 'India', 'Asia Pacific', ['SaaS', 'AI', 'Startups']),
  city('Hyderabad', 'India', 'Asia Pacific', ['Technology', 'Healthcare', 'Real Estate']),
  city('Chennai', 'India', 'Asia Pacific', ['Manufacturing', 'SaaS', 'Automotive']),
  city('Sao Paulo', 'Brazil', 'South America', ['Finance', 'E-commerce', 'B2B']),
  city('Rio de Janeiro', 'Brazil', 'South America', ['Tourism', 'Entertainment', 'Local Services']),
  city('Mexico City', 'Mexico', 'North America', ['Fintech', 'Retail', 'B2B']),
  city('Buenos Aires', 'Argentina', 'South America', ['SaaS', 'Creative', 'Professional Services']),
  city('Santiago', 'Chile', 'South America', ['Finance', 'Mining', 'B2B']),
  city('Bogota', 'Colombia', 'South America', ['Retail', 'Fintech', 'Local Services']),
  city('Johannesburg', 'South Africa', 'Africa', ['Finance', 'B2B', 'Enterprise']),
  city('Cape Town', 'South Africa', 'Africa', ['Tourism', 'SaaS', 'Creative']),
  city('Lagos', 'Nigeria', 'Africa', ['Fintech', 'Entertainment', 'E-commerce']),
  city('Nairobi', 'Kenya', 'Africa', ['Fintech', 'Startups', 'Local Services']),
  city('Cairo', 'Egypt', 'Africa', ['Education', 'Tourism', 'B2B'])
];

const usStates = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York State', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington State', 'West Virginia', 'Wisconsin', 'Wyoming'
];

const canadaAreas = [
  'Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba', 'Saskatchewan', 'Nova Scotia',
  'New Brunswick', 'Newfoundland and Labrador', 'Prince Edward Island', 'Northwest Territories',
  'Yukon', 'Nunavut'
];

const australiaAreas = [
  'New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania',
  'Australian Capital Territory', 'Northern Territory'
];

const germanyAreas = [
  'Baden Wurttemberg', 'Bavaria', 'Berlin State', 'Brandenburg', 'Bremen', 'Hamburg State', 'Hesse',
  'Lower Saxony', 'Mecklenburg Vorpommern', 'North Rhine Westphalia', 'Rhineland Palatinate',
  'Saarland', 'Saxony', 'Saxony Anhalt', 'Schleswig Holstein', 'Thuringia'
];

const franceAreas = [
  'Auvergne Rhone Alpes', 'Bourgogne Franche Comte', 'Brittany', 'Centre Val de Loire', 'Corsica',
  'Grand Est', 'Hauts de France', 'Ile de France', 'Normandy', 'Nouvelle Aquitaine', 'Occitanie',
  'Pays de la Loire', 'Provence Alpes Cote d Azur'
];

const gccCountries = ['United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman'];
const ukAreas = ['England', 'Scotland', 'Wales', 'Northern Ireland'];
const continentHubs = ['North America', 'South America', 'Europe', 'Africa', 'Oceania'];

export const STATE_AND_REGION_LOCATIONS: Location[] = [
  ...usStates.map((name) => area(name, 'United States', 'North America', 'state', ['Local SEO', 'PPC', 'Web Development'])),
  ...canadaAreas.map((name) => area(name, 'Canada', 'North America', 'province', ['B2B', 'SaaS', 'Professional Services'])),
  ...australiaAreas.map((name) => area(name, 'Australia', 'Oceania', 'state', ['Retail', 'Local Services', 'Industrial'])),
  ...germanyAreas.map((name) => area(name, 'Germany', 'Europe', 'state', ['B2B', 'Manufacturing', 'Enterprise'])),
  ...franceAreas.map((name) => area(name, 'France', 'Europe', 'region', ['Luxury', 'Retail', 'Professional Services'])),
  ...gccCountries.map((name) => area(name, name, 'GCC', 'country', ['Real Estate', 'Luxury', 'Government'])),
  ...ukAreas.map((name) => area(name, 'United Kingdom', 'Europe', 'region', ['Professional Services', 'SaaS', 'Local Services'])),
  ...continentHubs.map((name) => area(name, 'Global', name, 'continent', ['SEO', 'Performance Marketing', 'AI Search']))
];

// ── EXPANSION: comprehensive city coverage ──────────────────────────────────
// [name, country, region, marketFocus]
const expansionCityData: [string, string, string, string[]][] = [
  // United States
  ['Atlanta', 'United States', 'North America', ['B2B', 'Media', 'Logistics']],
  ['Phoenix', 'United States', 'North America', ['Real Estate', 'Healthcare', 'Local Services']],
  ['Philadelphia', 'United States', 'North America', ['Healthcare', 'Education', 'Professional Services']],
  ['San Diego', 'United States', 'North America', ['Biotech', 'Tourism', 'Defense']],
  ['San Jose', 'United States', 'North America', ['SaaS', 'Hardware', 'AI']],
  ['Austin', 'United States', 'North America', ['SaaS', 'Startups', 'Music']],
  ['Denver', 'United States', 'North America', ['B2B', 'Energy', 'Outdoor']],
  ['Nashville', 'United States', 'North America', ['Healthcare', 'Music', 'Hospitality']],
  ['Charlotte', 'United States', 'North America', ['Finance', 'B2B', 'Real Estate']],
  ['Columbus', 'United States', 'North America', ['Insurance', 'Retail', 'Logistics']],
  ['Indianapolis', 'United States', 'North America', ['Manufacturing', 'Healthcare', 'Sports']],
  ['Detroit', 'United States', 'North America', ['Automotive', 'Manufacturing', 'B2B']],
  ['Portland', 'United States', 'North America', ['E-commerce', 'Outdoor', 'Creative']],
  ['Las Vegas', 'United States', 'North America', ['Hospitality', 'Entertainment', 'Real Estate']],
  ['Minneapolis', 'United States', 'North America', ['Retail', 'Healthcare', 'B2B']],
  ['Sacramento', 'United States', 'North America', ['Government', 'Healthcare', 'Local Services']],
  ['Kansas City', 'United States', 'North America', ['Logistics', 'B2B', 'Agritech']],
  ['Orlando', 'United States', 'North America', ['Hospitality', 'Tourism', 'Real Estate']],
  ['Tampa', 'United States', 'North America', ['Finance', 'Healthcare', 'Real Estate']],
  ['Pittsburgh', 'United States', 'North America', ['Healthcare', 'Robotics', 'Education']],
  ['Cincinnati', 'United States', 'North America', ['Consumer Goods', 'B2B', 'Healthcare']],
  ['Cleveland', 'United States', 'North America', ['Healthcare', 'Manufacturing', 'B2B']],
  ['St Louis', 'United States', 'North America', ['Healthcare', 'Agritech', 'B2B']],
  ['Salt Lake City', 'United States', 'North America', ['SaaS', 'Outdoor', 'Fintech']],
  ['Raleigh', 'United States', 'North America', ['Technology', 'Biotech', 'Education']],
  ['San Antonio', 'United States', 'North America', ['Healthcare', 'Military', 'Tourism']],
  ['Jacksonville', 'United States', 'North America', ['Logistics', 'Finance', 'Healthcare']],
  ['Memphis', 'United States', 'North America', ['Logistics', 'Healthcare', 'B2B']],
  ['Baltimore', 'United States', 'North America', ['Healthcare', 'Government', 'Biotech']],
  ['Milwaukee', 'United States', 'North America', ['Manufacturing', 'B2B', 'Healthcare']],
  ['Oklahoma City', 'United States', 'North America', ['Energy', 'Local Services', 'B2B']],
  ['Louisville', 'United States', 'North America', ['Logistics', 'Healthcare', 'Manufacturing']],
  ['Buffalo', 'United States', 'North America', ['Healthcare', 'Education', 'Local Services']],
  // Canada
  ['Calgary', 'Canada', 'North America', ['Energy', 'B2B', 'Real Estate']],
  ['Ottawa', 'Canada', 'North America', ['Government', 'Technology', 'Defense']],
  ['Edmonton', 'Canada', 'North America', ['Energy', 'Local Services', 'B2B']],
  ['Winnipeg', 'Canada', 'North America', ['Agritech', 'Logistics', 'B2B']],
  ['Quebec City', 'Canada', 'North America', ['Tourism', 'Government', 'Professional Services']],
  // Europe
  ['Madrid', 'Spain', 'Europe', ['Finance', 'Tourism', 'B2B']],
  ['Barcelona', 'Spain', 'Europe', ['Startups', 'Tourism', 'Creative']],
  ['Valencia', 'Spain', 'Europe', ['Logistics', 'Tourism', 'Agritech']],
  ['Seville', 'Spain', 'Europe', ['Tourism', 'Local Services', 'Trade']],
  ['Rome', 'Italy', 'Europe', ['Tourism', 'Government', 'Luxury']],
  ['Milan', 'Italy', 'Europe', ['Luxury', 'Finance', 'Fashion']],
  ['Naples', 'Italy', 'Europe', ['Tourism', 'Logistics', 'Local Services']],
  ['Turin', 'Italy', 'Europe', ['Automotive', 'Manufacturing', 'B2B']],
  ['Amsterdam', 'Netherlands', 'Europe', ['Fintech', 'SaaS', 'Logistics']],
  ['Rotterdam', 'Netherlands', 'Europe', ['Logistics', 'Trade', 'B2B']],
  ['Brussels', 'Belgium', 'Europe', ['Government', 'Professional Services', 'B2B']],
  ['Antwerp', 'Belgium', 'Europe', ['Logistics', 'Luxury', 'Trade']],
  ['Zurich', 'Switzerland', 'Europe', ['Finance', 'Luxury', 'B2B']],
  ['Geneva', 'Switzerland', 'Europe', ['Finance', 'Luxury', 'Government']],
  ['Vienna', 'Austria', 'Europe', ['Finance', 'Tourism', 'B2B']],
  ['Stockholm', 'Sweden', 'Europe', ['SaaS', 'Fintech', 'Startups']],
  ['Gothenburg', 'Sweden', 'Europe', ['Automotive', 'Logistics', 'B2B']],
  ['Oslo', 'Norway', 'Europe', ['Energy', 'Maritime', 'B2B']],
  ['Copenhagen', 'Denmark', 'Europe', ['SaaS', 'Design', 'Green Energy']],
  ['Helsinki', 'Finland', 'Europe', ['SaaS', 'Gaming', 'B2B']],
  ['Dublin', 'Ireland', 'Europe', ['SaaS', 'Fintech', 'Pharma']],
  ['Lisbon', 'Portugal', 'Europe', ['Startups', 'Tourism', 'SaaS']],
  ['Porto', 'Portugal', 'Europe', ['Tourism', 'B2B', 'Trade']],
  ['Warsaw', 'Poland', 'Europe', ['SaaS', 'B2B', 'Logistics']],
  ['Krakow', 'Poland', 'Europe', ['Technology', 'Tourism', 'B2B']],
  ['Prague', 'Czech Republic', 'Europe', ['Technology', 'Tourism', 'B2B']],
  ['Athens', 'Greece', 'Europe', ['Tourism', 'Maritime', 'Local Services']],
  ['Budapest', 'Hungary', 'Europe', ['Technology', 'Tourism', 'B2B']],
  ['Bucharest', 'Romania', 'Europe', ['SaaS', 'B2B', 'Outsourcing']],
  ['Cologne', 'Germany', 'Europe', ['Media', 'B2B', 'Logistics']],
  ['Stuttgart', 'Germany', 'Europe', ['Automotive', 'Manufacturing', 'Enterprise']],
  ['Dusseldorf', 'Germany', 'Europe', ['B2B', 'Fashion', 'Trade']],
  ['Nice', 'France', 'Europe', ['Tourism', 'Luxury', 'Tech']],
  ['Bordeaux', 'France', 'Europe', ['Luxury', 'Tourism', 'Agritech']],
  ['Edinburgh', 'United Kingdom', 'Europe', ['Fintech', 'Tourism', 'Education']],
  ['Glasgow', 'United Kingdom', 'Europe', ['B2B', 'Local Services', 'Education']],
  ['Leeds', 'United Kingdom', 'Europe', ['Finance', 'B2B', 'Healthcare']],
  ['Liverpool', 'United Kingdom', 'Europe', ['Tourism', 'Local Services', 'Trade']],
  ['Bristol', 'United Kingdom', 'Europe', ['Technology', 'Creative', 'Aerospace']],
  // Middle East
  ['Kuwait City', 'Kuwait', 'Middle East', ['Government', 'Finance', 'Retail']],
  ['Manama', 'Bahrain', 'Middle East', ['Finance', 'Fintech', 'B2B']],
  ['Muscat', 'Oman', 'Middle East', ['Energy', 'Tourism', 'Government']],
  ['Sharjah', 'United Arab Emirates', 'Middle East', ['Manufacturing', 'Education', 'Trade']],
  ['Dammam', 'Saudi Arabia', 'Middle East', ['Energy', 'Industrial', 'Logistics']],
  ['Mecca', 'Saudi Arabia', 'Middle East', ['Hospitality', 'Tourism', 'Local Services']],
  ['Medina', 'Saudi Arabia', 'Middle East', ['Hospitality', 'Tourism', 'Local Services']],
  ['Amman', 'Jordan', 'Middle East', ['SaaS', 'Tourism', 'B2B']],
  ['Beirut', 'Lebanon', 'Middle East', ['Creative', 'Banking', 'Trade']],
  ['Istanbul', 'Turkey', 'Middle East', ['E-commerce', 'Manufacturing', 'Tourism']],
  ['Ankara', 'Turkey', 'Middle East', ['Government', 'Defense', 'B2B']],
  ['Tel Aviv', 'Israel', 'Middle East', ['SaaS', 'Cybersecurity', 'Fintech']],
  // Australia & New Zealand
  ['Adelaide', 'Australia', 'Oceania', ['Defense', 'Wine', 'Healthcare']],
  ['Gold Coast', 'Australia', 'Oceania', ['Tourism', 'Real Estate', 'Local Services']],
  ['Canberra', 'Australia', 'Oceania', ['Government', 'Education', 'Professional Services']],
  ['Newcastle', 'Australia', 'Oceania', ['Energy', 'Industrial', 'B2B']],
  ['Hobart', 'Australia', 'Oceania', ['Tourism', 'Agritech', 'Local Services']],
  ['Darwin', 'Australia', 'Oceania', ['Mining', 'Defense', 'Logistics']],
  ['Wellington', 'New Zealand', 'Oceania', ['Government', 'Creative', 'SaaS']],
  ['Christchurch', 'New Zealand', 'Oceania', ['Agritech', 'Tourism', 'B2B']],
  // India
  ['Kolkata', 'India', 'Asia Pacific', ['B2B', 'Education', 'Manufacturing']],
  ['Pune', 'India', 'Asia Pacific', ['SaaS', 'Automotive', 'Education']],
  ['Ahmedabad', 'India', 'Asia Pacific', ['Manufacturing', 'Textiles', 'B2B']],
  ['Surat', 'India', 'Asia Pacific', ['Textiles', 'Diamonds', 'Trade']],
  ['Jaipur', 'India', 'Asia Pacific', ['Tourism', 'Handicrafts', 'Local Services']],
  ['Lucknow', 'India', 'Asia Pacific', ['Government', 'Education', 'Local Services']],
  ['Nagpur', 'India', 'Asia Pacific', ['Logistics', 'Agritech', 'B2B']],
  ['Indore', 'India', 'Asia Pacific', ['Education', 'Manufacturing', 'Startups']],
  ['Coimbatore', 'India', 'Asia Pacific', ['Manufacturing', 'Textiles', 'SaaS']],
  ['Kochi', 'India', 'Asia Pacific', ['Tourism', 'IT', 'Maritime']],
  ['Chandigarh', 'India', 'Asia Pacific', ['Government', 'Education', 'IT']],
  ['Gurugram', 'India', 'Asia Pacific', ['SaaS', 'Startups', 'B2B']],
  ['Noida', 'India', 'Asia Pacific', ['IT', 'Manufacturing', 'B2B']],
  ['Visakhapatnam', 'India', 'Asia Pacific', ['Maritime', 'Energy', 'B2B']],
];

const EXPANSION_CITIES: Location[] = expansionCityData.map(([name, country, region, focus]) =>
  city(name, country, region, focus)
);

const indiaStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
  'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];

const spainRegions = [
  'Catalonia', 'Community of Madrid', 'Andalusia', 'Valencian Community', 'Basque Country', 'Galicia',
];

const italyRegions = [
  'Lombardy', 'Lazio', 'Veneto', 'Campania', 'Piedmont', 'Tuscany', 'Sicily', 'Emilia Romagna',
];

const europeanCountries = [
  'Spain', 'Italy', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Sweden', 'Norway',
  'Denmark', 'Finland', 'Ireland', 'Portugal', 'Poland', 'Czech Republic', 'Greece', 'Hungary',
  'Romania', 'Luxembourg',
];

const middleEastCountries = ['Kuwait', 'Bahrain', 'Oman', 'Jordan', 'Lebanon', 'Turkey', 'Israel', 'Qatar'];

const EXPANSION_AREAS: Location[] = [
  ...indiaStates.map((name) => area(name, 'India', 'Asia Pacific', 'state', ['Local SEO', 'PPC', 'Web Development'])),
  ...spainRegions.map((name) => area(name, 'Spain', 'Europe', 'region', ['Tourism', 'Retail', 'B2B'])),
  ...italyRegions.map((name) => area(name, 'Italy', 'Europe', 'region', ['Luxury', 'Manufacturing', 'Tourism'])),
  ...europeanCountries.map((name) => area(name, name, 'Europe', 'country', ['SEO', 'Performance Marketing', 'B2B'])),
  ...middleEastCountries.map((name) => area(name, name, 'Middle East', 'country', ['Real Estate', 'Luxury', 'Government'])),
];

const ALL_LOCATIONS: Location[] = [
  ...LAUNCH_CITIES,
  ...STATE_AND_REGION_LOCATIONS,
  ...EXPANSION_CITIES,
  ...EXPANSION_AREAS,
];

// De-duplicate by slug so generateStaticParams never produces conflicting paths.
const seenSlugs = new Set<string>();
export const LOCATIONS: Location[] = ALL_LOCATIONS.filter((location) => {
  if (seenSlugs.has(location.slug)) return false;
  seenSlugs.add(location.slug);
  return true;
});

export const getLocationBySlug = (slug: string) => LOCATIONS.find((location) => location.slug === slug);
