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

