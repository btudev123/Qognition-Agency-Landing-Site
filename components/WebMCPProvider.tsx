'use client';

import { useEffect } from 'react';
import { AUDIT_OFFERS } from '../data/auditOffers';
import { CALENDLY_LINK } from '../data/siteConfig';

declare global {
  interface Navigator {
    modelContext?: {
      provideContext?: (context: unknown) => void | Promise<void>;
    };
  }
}

const WebMCPProvider = () => {
  useEffect(() => {
    const provider = navigator.modelContext?.provideContext;
    if (!provider) return;

    provider({
      name: 'Qognition Website Tools',
      tools: [
        {
          name: 'run_qognition_audit',
          description: 'Run a free Qognition website audit for SEO, AI visibility, branding, social media, or LLM discovery.',
          inputSchema: {
            type: 'object',
            properties: {
              url: { type: 'string', description: 'Public website URL to audit.' },
              email: { type: 'string', description: 'Work email for the audit report.' },
              auditType: { type: 'string', enum: AUDIT_OFFERS.map((offer) => offer.type) }
            },
            required: ['url', 'email']
          },
          execute: async (input: { url: string; email: string; auditType?: string }) => {
            const response = await fetch('/api/audit', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...input, source: 'WebMCP' })
            });
            return response.json();
          }
        },
        {
          name: 'find_case_studies',
          description: 'Open Qognition case studies and proof assets.',
          inputSchema: { type: 'object', properties: {} },
          execute: () => {
            window.location.href = '/case-studies';
            return { ok: true, url: '/case-studies' };
          }
        },
        {
          name: 'find_resources',
          description: 'Open Qognition free audits and lead magnets.',
          inputSchema: { type: 'object', properties: {} },
          execute: () => {
            window.location.href = '/resources';
            return { ok: true, url: '/resources' };
          }
        },
        {
          name: 'book_strategy_call',
          description: 'Open the Qognition Calendly strategy call page.',
          inputSchema: { type: 'object', properties: {} },
          execute: () => {
            window.open(CALENDLY_LINK, '_blank', 'noopener,noreferrer');
            return { ok: true, url: CALENDLY_LINK };
          }
        }
      ]
    });
  }, []);

  return null;
};

export default WebMCPProvider;
