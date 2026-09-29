import type { ClientLogo } from '../types';

// Ad platforms we run. Not certifications, not partnerships, not endorsements.
//
// This row shipped for months labelled "Certified partners across", over a
// comment in this file that said it must not. The certifications were never
// confirmed and no proof was ever attached, so the label is now the thing that
// is true: we hold ad-account access and run campaigns on these platforms.
// Resolved 2026-09-28. If a certification is ever confirmed, it goes on a page
// that can show the credential, with the issuing body and the date, not on a
// logo row.
//
// TikTok and Snapchat are removed. Neither is where a commercial-insurance or
// MSP buyer is reached, and an off-audience logo on a page selling AI search to
// B2B firms costs credibility rather than lending it.
export const PARTNER_LOGOS: ClientLogo[] = [
  { name: "Google", url: "/brand-logos/google.svg" },
  { name: "Meta", url: "/brand-logos/meta.svg" },
  { name: "LinkedIn", url: "/brand-logos/linkedin.svg" }
];
