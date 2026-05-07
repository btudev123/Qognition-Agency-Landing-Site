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
  intro: `Qognition supports companies across ${name} with programmatic SEO, performance marketing, AI search optimization, and high-converting web experiences.`,
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

export const LOCATIONS: Location[] = [...LAUNCH_CITIES, ...STATE_AND_REGION_LOCATIONS];

export const getLocationBySlug = (slug: string) => LOCATIONS.find((location) => location.slug === slug);
