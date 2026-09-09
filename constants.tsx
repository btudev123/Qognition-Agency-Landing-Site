
import { NavItem } from './types';
import { CONTACT_MAILTO } from './data/siteConfig';

// Re-export data from separate files
export { SERVICES } from './data/services';
export { INDUSTRIES } from './data/industries';
export { REGIONS } from './data/regions';
export { LOCATIONS } from './data/locations';
export { CASE_STUDIES } from './data/case-studies';
export { TOOLS } from './data/tools';
export { DIRECTORY_PRODUCTS } from './data/directoryProducts';
export { TOOL_CATEGORIES } from './data/toolCategories';
export { CALENDLY_LINK, CONTACT_EMAIL, CONTACT_MAILTO, WHATSAPP_DISPLAY, WHATSAPP_LINK, WHATSAPP_NUMBER } from './data/siteConfig';
export {
  COMPARISONS,
  FREE_TOOLS,
  GLOSSARY_TERMS,
  PRICING_PACKAGES,
  RESOURCES,
  SERVICE_SUB_PAGES,
  TEAM_MEMBERS
} from './data/seoExpansion';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Services', path: '/services' },
  { label: 'Industries', path: '/industries' },
  { label: 'Regions', path: '/regions' },
  { label: 'Case Studies', path: '/case-studies' },
  { label: 'Resources', path: '/resources' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: CONTACT_MAILTO },
];

export const ABOUT_DATA = {
  mission: "To be the AI growth marketing partner ambitious companies call when they need qualified leads, stronger search visibility, better creative, and measurable revenue systems.",
  vision: "A world where growth marketing is intelligent, beautifully designed, measurable, and built around real buyer trust.",
  values: [
    { title: "Radical Transparency", desc: "No black boxes. We share our code, our data, and our logic." },
    { title: "Speed as a Habit", desc: "We move faster than the market. Velocity is our primary currency." },
    { title: "Aesthetic Integrity", desc: "Performance without beauty is spam. We refuse to ship ugly code." },
    { title: "Data Sovereignty", desc: "Your data is your asset. We build systems that you own and control." }
  ],
  // Revenue Generated ($500M+), Global Hubs (12) and Client Retention (94%) were removed —
  // unsourced, and inconsistent with the numbers quoted elsewhere on the site. "AI Growth
  // Leads" is the real team headcount (data/seoExpansion.ts TEAM_MEMBERS).
  stats: [
    { label: "AI Growth Leads", value: "7" }
  ]
};
