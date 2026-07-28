import { defineField, defineType } from 'sanity';

const labelledValue = {
  type: 'object',
  fields: [
    { name: 'label', type: 'string' },
    { name: 'value', type: 'string' },
  ],
  preview: { select: { title: 'label', subtitle: 'value' } },
};

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'client', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'industry', type: 'string' }),
    defineField({ name: 'summary', type: 'text', rows: 3 }),
    defineField({ name: 'imagePath', title: 'Image path', type: 'string' }),
    defineField({ name: 'image', title: 'Image (upload)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({
      name: 'stats',
      title: 'Headline stats',
      description: 'Hard numbers. These carry the page — avoid vague claims.',
      type: 'array',
      of: [labelledValue],
    }),
    defineField({ name: 'timeline', type: 'string' }),
    defineField({ name: 'roi', title: 'ROI', type: 'string' }),
    defineField({ name: 'challenge', type: 'text', rows: 4 }),
    defineField({ name: 'solution', type: 'text', rows: 4 }),
    defineField({ name: 'implementation', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'results', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'clientJourney', title: 'Client journey', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'beforeAfter',
      title: 'Before / after',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'before', type: 'string' },
            { name: 'after', type: 'string' },
          ],
          preview: { select: { title: 'before', subtitle: 'after' } },
        },
      ],
    }),
    defineField({
      name: 'funnelStages',
      title: 'Funnel stages',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'stage', type: 'string' },
            { name: 'before', type: 'string' },
            { name: 'after', type: 'string' },
          ],
          preview: { select: { title: 'stage', subtitle: 'after' } },
        },
      ],
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string' },
            { name: 'value', type: 'string' },
            { name: 'note', type: 'string' },
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'client', subtitle: 'title', media: 'image' },
  },
});
