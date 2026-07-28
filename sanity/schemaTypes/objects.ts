import { defineField, defineType } from 'sanity';

// Shared nested objects. Registering them as named types (rather than inlining)
// keeps _type stable across documents, which matters for GROQ projections later.

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({ name: 'question', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'answer',
      type: 'text',
      rows: 4,
      description: '60–120 words. Answer the question directly in the first sentence.',
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: 'question', subtitle: 'answer' } },
});

export const contentSection = defineType({
  name: 'contentSection',
  title: 'Section',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'content', type: 'text', rows: 6, validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'title', subtitle: 'content' } },
});

export const relatedLink = defineType({
  name: 'relatedLink',
  title: 'Related link',
  type: 'object',
  fields: [
    defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'href', type: 'string', validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'label', subtitle: 'href' } },
});

export const subService = defineType({
  name: 'subService',
  title: 'Sub-service',
  type: 'object',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'string' }),
    defineField({ name: 'description', type: 'text', rows: 2 }),
  ],
  preview: { select: { title: 'name', subtitle: 'description' } },
});

export const processStep = defineType({
  name: 'processStep',
  title: 'Process step',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'text', rows: 2 }),
  ],
  preview: { select: { title: 'title', subtitle: 'description' } },
});

export const expertQuote = defineType({
  name: 'expertQuote',
  title: 'Expert quote',
  type: 'object',
  fields: [
    defineField({ name: 'quote', type: 'text', rows: 3, validation: (r) => r.required() }),
    defineField({ name: 'author', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', type: 'string' }),
  ],
  preview: { select: { title: 'author', subtitle: 'quote' } },
});

export const objectTypes = [
  faq,
  contentSection,
  relatedLink,
  subService,
  processStep,
  expertQuote,
];
