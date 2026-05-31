'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Section from '../ui/Section';
import Heading from '../ui/Heading';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <Section spacing="md">
      <Heading level="h2" className="text-center mb-10">
        Frequently Asked Questions
      </Heading>
      <div className="max-w-2xl mx-auto space-y-3">
        {faqs.slice(0, 8).map((faq, i) => (
          <div
            key={i}
            className="border border-[var(--border)] rounded-xl bg-[var(--card-bg)] overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-[var(--text)] hover:bg-[var(--ink)]/5 transition-colors"
              aria-expanded={openIndex === i}
            >
              {faq.question}
              <ChevronDown
                size={18}
                className={`shrink-0 text-[var(--text-muted)] transition-transform duration-200 ${
                  openIndex === i ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 text-sm text-[var(--text-muted)] leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.slice(0, 8).map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </Section>
  );
}
