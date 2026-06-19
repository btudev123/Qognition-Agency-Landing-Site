// ── Single source of truth for contact + booking ────────────────────────────

// Booking. Cal.com is the booking system (API key lives server-side in env:
// CALCOM_API_KEY). BOOKING_LINK is the PUBLIC cal.com/<username>/<event> link
// used by the embed/widget. Until the public link is provided it falls back to
// the existing Calendly URL so nothing breaks. Swap CAL_LINK in one place.
export const CAL_LINK = "qognition-agency/15min"; // cal.com/qognition-agency/15min
const CALENDLY_FALLBACK = "https://calendly.com/hello-qognitionagency/30min";
export const BOOKING_LINK = CAL_LINK
  ? `https://cal.com/${CAL_LINK}`
  : CALENDLY_FALLBACK;
/** @deprecated alias → BOOKING_LINK (now Cal.com). Kept so existing imports book through Cal.com. */
export const CALENDLY_LINK = BOOKING_LINK;

// Contact — ONE number across the whole site (WhatsApp + click-to-call).
export const CONTACT_EMAIL = "hello@qognitionagency.com";
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;
export const WHATSAPP_NUMBER = "14372902549";
export const WHATSAPP_DISPLAY = "+1 437 290 2549";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

// Same number, click-to-call.
export const PHONE_NUMBER = WHATSAPP_NUMBER;
export const PHONE_DISPLAY = WHATSAPP_DISPLAY;
export const PHONE_LINK = `tel:+${WHATSAPP_NUMBER}`;
