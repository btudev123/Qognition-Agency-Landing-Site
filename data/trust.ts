import type { ClientLogo } from '../types';

// Platform / ad partners we run campaigns and certified work across.
// [UNVERIFIED: Google/Meta/TikTok/Snapchat/LinkedIn certifications need confirming before this
// row ships again as "Certified partners across" — treat as ad-account access, not certification,
// until someone attaches proof.]
export const PARTNER_LOGOS: ClientLogo[] = [
  { name: "Google", url: "/brand-logos/google.svg" },
  { name: "Meta", url: "/brand-logos/meta.svg" },
  { name: "TikTok", url: "/brand-logos/tiktok.svg" },
  { name: "Snapchat", url: "/brand-logos/snapchat.svg" },
  { name: "LinkedIn", url: "/brand-logos/linkedin.svg" }
];
