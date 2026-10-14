import Button from '../ui/Button';
import { appendFunnelContext, type FunnelContext } from '../../lib/funnelContext';
import { FUNNEL_ACTIONS, resolveLeadLocale } from '../../lib/leadCopy';

/* What a page shows where it used to embed a lead form. Operator, 2026-10-14: "all
 * leads should end up in /contact". Two links, never a form: Book a call (the GHL
 * calendar on /book) and Send an enquiry (the one form, on /contact). Both carry the
 * page's funnel context so the lead still says where it came from.
 *
 * Labels are FUNNEL_ACTIONS, so a localized page gets its own words. Server-safe: no
 * hooks, so it renders inside server and client components alike. */
export default function EnquiryLinks({
  context,
  className = '',
}: {
  context?: FunnelContext;
  className?: string;
}) {
  const [book, enquire] = FUNNEL_ACTIONS[resolveLeadLocale(context?.locale)];
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Button href={appendFunnelContext('/book', context)}>{book}</Button>
      <Button variant="secondary" href={appendFunnelContext('/contact', context)}>{enquire}</Button>
    </div>
  );
}
