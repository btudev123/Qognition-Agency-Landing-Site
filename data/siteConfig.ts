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

// Location. ONE answer, everywhere. The live production build claimed offices in
// London, New York, Dubai and Mumbai on /contact, and London, New York, Dubai,
// Bangalore and Sydney on /about and /team, while DesignRush and Tracxn listed
// Gurugram. Three different India answers on pages one click apart. Gurugram is
// the real one, confirmed by the operator 2026-09-28. Countries served are never
// presented as offices.
export const HQ_CITY = "Gurugram";
export const HQ_REGION = "Haryana";
export const HQ_COUNTRY = "IN";
export const HQ_COUNTRY_NAME = "India";
export const HQ_DISPLAY = `${HQ_CITY}, ${HQ_COUNTRY_NAME}`;

// Contact — ONE number across the whole site (WhatsApp + click-to-call).
export const CONTACT_EMAIL = "hello@qognitionagency.com";
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;
/* The operator's number, taken from origin/main. Stored WITHOUT the leading `+`,
   which is what both consumers below require and what the previous value did.
   The pushed version was "+918527661110", and since WHATSAPP_LINK interpolates
   the constant raw it produced https://wa.me/+918527661110, which WhatsApp
   rejects, while PHONE_LINK prepends its own `+` and produced
   tel:++918527661110. Both are on every page, and both are contact paths, so a
   broken one loses a lead rather than degrading a layout. Display keeps the `+`;
   the machine-readable value does not carry it. */
export const WHATSAPP_NUMBER = "918527661110";
export const WHATSAPP_DISPLAY = "+91 85276 61110";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

// Same number, click-to-call.
export const PHONE_NUMBER = WHATSAPP_NUMBER;
export const PHONE_DISPLAY = WHATSAPP_DISPLAY;
export const PHONE_LINK = `tel:+${WHATSAPP_NUMBER}`;

