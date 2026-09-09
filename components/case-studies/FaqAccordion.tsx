'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Faq } from '../../data/case-studies';

/**
 * Accessible accordion: native <button> for keyboard operation, aria-expanded + aria-controls
 * wired to a real panel id, and `hidden` (not conditional unmount) so the panel id always
 * resolves for assistive tech. First item open by default so the page is never all-collapsed.
 */
export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  if (faqs.length === 0) {
    return (
      <p className="text-body text-[var(--text-muted)]">No FAQ is available for this engagement yet.</p>
    );
  }

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const buttonId = `${baseId}-faq-button-${i}`;
        const panelId = `${baseId}-faq-panel-${i}`;
        const isOpen = openIndex === i;

        return (
          <div key={faq.question} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)]"
              >
                <span className="text-body font-semibold text-[var(--ink)]">{faq.question}</span>
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={`shrink-0 text-[var(--text-muted)] transition-transform duration-200 motion-reduce:transition-none ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen} className="px-5 pb-5">
              <p className="text-body text-[var(--text-muted)]">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
