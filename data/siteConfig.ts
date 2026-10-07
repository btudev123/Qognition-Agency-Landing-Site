// ── Single source of truth for contact + booking ────────────────────────────
// Booking. LeadConnector (GoHighLevel) is the booking system. BOOKING_LINK is
// the PUBLIC widget URL used by both the inline embed and every "Book a call"
// anchor. Swap it in one place and the whole site follows.
export const BOOKING_LINK =
  "https://api.leadconnectorhq.com/widget/bookings/discovery-call-qognition-agency";
/** Script that drives the LeadConnector iframe auto-resize handshake. */
export const BOOKING_EMBED_SCRIPT = "https://link.msgsndr.com/js/form_embed.js";

/** @deprecated alias → BOOKING_LINK. Kept so existing imports keep working. */
export const CALENDLY_LINK = BOOKING_LINK;

// Offices. ONE list, everywhere. Operator decision 2026-10-08 (CLAUDE.md authority
// block): Qognition has offices in Toronto, New York, Dubai, Sydney and Gurugram.
// There is no headquarters, so nothing on the site names one and no office is
// marked as the main address, in copy or in schema. City and country only, never
// a street address. Every other market is served remotely, and no other city may
// be presented as an office. This supersedes the Gurugram-only HQ answer of
// 2026-09-28 (HQ_CITY, HQ_REGION, HQ_COUNTRY, HQ_COUNTRY_NAME and HQ_DISPLAY are
// retired). The order below is the display order on /about, /contact and /team.
export type Office = {
  readonly city: string;
  readonly country: string;
  /** ISO 3166-1 alpha-2. */
  readonly countryCode: string;
  readonly region?: string;
};

export const OFFICES = [
  { city: "Toronto", country: "Canada", countryCode: "CA", region: "Ontario" },
  { city: "New York", country: "United States", countryCode: "US", region: "New York" },
  { city: "Dubai", country: "United Arab Emirates", countryCode: "AE" },
  { city: "Sydney", country: "Australia", countryCode: "AU", region: "New South Wales" },
  { city: "Gurugram", country: "India", countryCode: "IN", region: "Haryana" },
] as const satisfies readonly Office[];

export type OfficeCity = (typeof OFFICES)[number]["city"];

/* Other spellings and slugs that name the same office city. Gurugram was Gurgaon
 * until 2016 and both are in use; GeoNames records New York as "New York City". */
const OFFICE_ALIASES: Readonly<Record<string, OfficeCity>> = {
  "gurgaon": "Gurugram",
  "new york city": "New York",
  "nyc": "New York",
};

const normaliseCity = (value: string) =>
  value.trim().toLowerCase().replace(/[-_]+/g, " ").replace(/\s+/g, " ");

/** The office for a city name or URL slug ("new-york", "Gurgaon", "Sydney"), or undefined.
 *  Pass `country` (ISO alpha-2 code or English name) whenever it is known, so
 *  Sydney, Nova Scotia or a Toronto in Ohio never reads as an office. */
export function officeFor(citySlugOrName: string, country?: string): Office | undefined {
  const key = normaliseCity(citySlugOrName);
  const city = OFFICE_ALIASES[key] ?? OFFICES.find((o) => normaliseCity(o.city) === key)?.city;
  const office = OFFICES.find((o) => o.city === city);
  if (!office) return undefined;
  if (country) {
    const wanted = country.trim().toLowerCase();
    if (wanted !== office.countryCode.toLowerCase() && wanted !== office.country.toLowerCase()) return undefined;
  }
  return office;
}

export function hasOffice(citySlugOrName: string, country?: string): boolean {
  return officeFor(citySlugOrName, country) !== undefined;
}

/** Offices in one country (ISO alpha-2). Empty for every market we serve remotely. */
export const officesIn = (countryCode: string): readonly Office[] =>
  OFFICES.filter((o) => o.countryCode === countryCode.toUpperCase());

/** "Toronto, New York, Dubai, Sydney and Gurugram". No serial comma, matching site copy. */
export const joinWithAnd = (items: readonly string[]): string =>
  items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

export const OFFICE_CITIES_TEXT = joinWithAnd(OFFICES.map((o) => o.city));

/** The one sentence every page uses when it states where the offices are. */
export const OFFICES_SENTENCE = `We have offices in ${OFFICE_CITIES_TEXT}, and serve every other market remotely.`;

/** The FAQ answer to "Do you have an office in <place>?" for a location page.
 *  `slugOrName` is the page's city slug or name; `country` its country. A yes
 *  only for the five offices; every other place gets the served-remotely answer. */
export function officeAnswerFor(placeName: string, slugOrName: string, country?: string): string {
  const office = officeFor(slugOrName, country);
  return office
    ? `Yes. Qognition has an office in ${office.city}, ${office.country}.`
    : `No. We serve companies targeting ${placeName} remotely. Our offices are in ${OFFICE_CITIES_TEXT}.`;
}

// Contact — ONE number across the whole site (WhatsApp + click-to-call).
export const CONTACT_EMAIL = "hello@qognitionagency.com";
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;
/* The Canadian number. Operator-confirmed 2026-09-29.
 *
 * origin/main had been pushed with "+918527661110"; I resolved the merge in its
 * favour and that was wrong on both counts. The number is the Canadian one, and
 * the pushed value also carried a leading `+` that broke both links, since
 * WHATSAPP_LINK interpolates this constant raw (https://wa.me/+91... which
 * WhatsApp rejects) and PHONE_LINK prepends its own plus (tel:++91...).
 *
 * So: store the machine-readable value WITHOUT a leading `+`, and keep the `+`
 * in the display string only. Both constants render on every page and both are
 * contact paths, so a broken one loses a lead rather than degrading a layout. */
export const WHATSAPP_NUMBER = "12363498449";
export const WHATSAPP_DISPLAY = "+1 (236) 349-8449";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
/* The opening line WhatsApp pre-fills. Generic on purpose: a click handler that
 * interpolated a company name would be the one place a visitor's identity could
 * reach a third-party URL, and wa.me logs the full link. */
export const WHATSAPP_PREFILL = "Hi Qognition, I'd like to talk about AI search, SEO or PPC for my company.";
export const WHATSAPP_CHAT_LINK = `${WHATSAPP_LINK}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`;

// Same number, click-to-call.
export const PHONE_NUMBER = WHATSAPP_NUMBER;
export const PHONE_DISPLAY = WHATSAPP_DISPLAY;
export const PHONE_LINK = `tel:+${WHATSAPP_NUMBER}`;

