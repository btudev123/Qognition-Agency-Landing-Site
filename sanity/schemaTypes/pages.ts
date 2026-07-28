import { defineField, defineType } from 'sanity';

// Every page-shaped document carries the same SEO head fields, so they are
// factored out rather than repeated per type.
const seoFields = [
  defineField({
    name: 'title',
    title: 'SEO title',
    type: 'string',
    description: 'The <title> tag. Aim for under 60 characters.',
    validation: (r) => r.required(),
  }),
  defineField({
    name: 'description',
    title: 'Meta description',
    type: 'text',
    rows: 3,
    description: 'Aim for 140–160 characters.',
    validation: (r) => r.required(),
  }),
  defineField({
    name: 'slug',
    type: 'slug',
    options: { source: 'title', maxLength: 96 },
    validation: (r) => r.required(),
  }),
  defineField({ name: 'h1', title: 'H1', type: 'string' }),
];

export const pillarPage = defineType({
  name: 'pillarPage',
  title: 'Pillar / Guide Page',
  type: 'document',
  fields: [
    ...seoFields,
    defineField({ name: 'eyebrow', type: 'string' }),
    defineField({ name: 'summary', type: 'text', rows: 4 }),
    defineField({ name: 'sections', type: 'array', of: [{ type: 'contentSection' }] }),
    defineField({ name: 'checklist', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'faqs', type: 'array', of: [{ type: 'faq' }] }),
    defineField({ name: 'relatedLinks', type: 'array', of: [{ type: 'relatedLink' }] }),
  ],
  preview: { select: { title: 'title', subtitle: 'eyebrow' } },
});

export const servicePage = defineType({
  name: 'servicePage',
  title: 'Service Sub-Page',
  type: 'document',
  fields: [
    ...seoFields,
    defineField({ name: 'serviceId', title: 'Parent service ID', type: 'string' }),
    defineField({ name: 'intro', type: 'text', rows: 4 }),
    defineField({ name: 'deliverables', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'sections', type: 'array', of: [{ type: 'contentSection' }] }),
    defineField({ name: 'faqs', type: 'array', of: [{ type: 'faq' }] }),
    defineField({ name: 'relatedLinks', type: 'array', of: [{ type: 'relatedLink' }] }),
  ],
  preview: { select: { title: 'title', subtitle: 'serviceId' } },
});

export const freeToolPage = defineType({
  name: 'freeToolPage',
  title: 'Free Tool Page',
  type: 'document',
  fields: [
    ...seoFields,
    defineField({ name: 'intro', type: 'text', rows: 4 }),
    defineField({ name: 'inputs', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'outputs', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'useCases', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'faqs', type: 'array', of: [{ type: 'faq' }] }),
  ],
  preview: { select: { title: 'title' } },
});

export const comparisonPage = defineType({
  name: 'comparisonPage',
  title: 'Comparison Page',
  type: 'document',
  fields: [
    ...seoFields,
    defineField({
      name: 'category',
      type: 'string',
      options: { list: ['competitor', 'city', 'strategy'] },
    }),
    defineField({ name: 'summary', type: 'text', rows: 4 }),
    defineField({ name: 'decisionFactors', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'qognitionFit', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'alternatives', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'faqs', type: 'array', of: [{ type: 'faq' }] }),
  ],
  preview: { select: { title: 'title', subtitle: 'category' } },
});

export const resourcePage = defineType({
  name: 'resourcePage',
  title: 'Resource / Lead Magnet',
  type: 'document',
  fields: [
    ...seoFields,
    defineField({ name: 'format', type: 'string' }),
    defineField({ name: 'readingTime', type: 'string' }),
    defineField({ name: 'gated', type: 'boolean' }),
    defineField({ name: 'audience', type: 'string' }),
    defineField({ name: 'highlights', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'sections', type: 'array', of: [{ type: 'contentSection' }] }),
  ],
  preview: { select: { title: 'title', subtitle: 'format' } },
});

export const pageTypes = [pillarPage, servicePage, freeToolPage, comparisonPage, resourcePage];
