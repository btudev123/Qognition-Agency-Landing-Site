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

// Contact — ONE number across the whole site (WhatsApp + click-to-call).
export const CONTACT_EMAIL = "hello@qognitionagency.com";
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;
export const WHATSAPP_NUMBER = "+918527661110";
export const WHATSAPP_DISPLAY = "+91 8527661110";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

// Same number, click-to-call.
export const PHONE_NUMBER = WHATSAPP_NUMBER;
export const PHONE_DISPLAY = WHATSAPP_DISPLAY;
export const PHONE_LINK = `tel:+${WHATSAPP_NUMBER}`;

