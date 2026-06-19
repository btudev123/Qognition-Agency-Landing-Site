'use client';

import type { SpokeId } from '../../lib/spokes';
import CalBooking from './CalBooking';

// Booking moved from Calendly to Cal.com. This component is kept as a thin
// compatibility wrapper (same props) that renders the Cal.com embed, so every
// existing call site books through Cal.com with no per-file changes.
interface CalendlyEmbedProps {
  spoke?: SpokeId;
  url?: string;
  className?: string;
}

export default function CalendlyEmbed({ className = '' }: CalendlyEmbedProps) {
  return (
    <div className={`relative rounded-xl overflow-hidden border border-[var(--accent)]/20 ${className}`}>
      <CalBooking />
    </div>
  );
}
