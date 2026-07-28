import { defineField, defineType } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'shortDescription',
      type: 'text',
      rows: 2,
      description: 'Front-load the primary keyword — this is used in cards and meta descriptions.',
    }),
    defineField({ name: 'fullDescription', type: 'text', rows: 6 }),
    defineField({ name: 'icon', type: 'string' }),
    defineField({ name: 'kpis', title: 'KPIs', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'subServices', type: 'array', of: [{ type: 'subService' }] }),
    defineField({ name: 'process', type: 'array', of: [{ type: 'processStep' }] }),
    defineField({ name: 'deepDive', type: 'array', of: [{ type: 'contentSection' }] }),
    defineField({ name: 'expertQuote', type: 'expertQuote' }),
    defineField({ name: 'techStack', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'relatedIndustries', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'faqs', type: 'array', of: [{ type: 'faq' }] }),
  ],
  preview: { select: { title: 'title', subtitle: 'shortDescription' } },
});

export const industry = defineType({
  name: 'industry',
  title: 'Industry',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'description', type: 'text', rows: 4 }),
    defineField({ name: 'painPoints', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'solutions', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'relatedServices', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'expertQuote', type: 'expertQuote' }),
    defineField({ name: 'faqs', type: 'array', of: [{ type: 'faq' }] }),
  ],
  preview: { select: { title: 'name', subtitle: 'description' } },
});

export const location = defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'country', type: 'string' }),
    defineField({ name: 'region', type: 'string' }),
    defineField({
      name: 'type',
      type: 'string',
      options: { list: ['city', 'state', 'province', 'country', 'continent', 'region'] },
    }),
    defineField({ name: 'intro', type: 'text', rows: 3 }),
    defineField({ name: 'marketFocus', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'localModifiers', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'canonicalParent', type: 'string' }),
    defineField({ name: 'schemaType', type: 'string' }),
  ],
  preview: { select: { title: 'name', subtitle: 'region' } },
});

export const glossaryTerm = defineType({
  name: 'glossaryTerm',
  title: 'Glossary Term',
  type: 'document',
  fields: [
    defineField({ name: 'term', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'term', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'definition', type: 'text', rows: 4 }),
    defineField({ name: 'category', type: 'string' }),
    defineField({ name: 'relatedTerms', type: 'array', of: [{ type: 'string' }] }),
  ],
  preview: { select: { title: 'term', subtitle: 'category' } },
});

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'role', type: 'string' }),
    defineField({ name: 'focus', type: 'string' }),
    defineField({ name: 'bio', type: 'text', rows: 4 }),
    defineField({ name: 'imagePath', title: 'Image path', type: 'string' }),
    defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
  ],
  preview: { select: { title: 'name', subtitle: 'role' } },
});

export const taxonomyTypes = [service, industry, location, glossaryTerm, teamMember];
