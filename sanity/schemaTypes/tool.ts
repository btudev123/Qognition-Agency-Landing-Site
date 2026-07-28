import { defineField, defineType } from 'sanity';

export const tool = defineType({
  name: 'tool',
  title: 'Directory Tool',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'category', type: 'string' }),
    defineField({ name: 'categorySlug', title: 'Category slug', type: 'string' }),
    defineField({ name: 'shortDescription', title: 'Short description', type: 'string' }),
    defineField({ name: 'fullDescription', title: 'Full description', type: 'text', rows: 8 }),
    defineField({
      name: 'agencyVerdict',
      title: 'Agency verdict',
      type: 'text',
      rows: 4,
      description: 'Our first-hand opinion. This is the original value the page carries — never generic.',
    }),
    defineField({
      name: 'pricing',
      type: 'string',
      options: { list: ['Free', 'Freemium', 'Paid', 'Enterprise', 'Open Source'] },
    }),
    defineField({ name: 'websiteUrl', title: 'Website URL', type: 'url' }),
    defineField({ name: 'rating', type: 'number', validation: (r) => r.min(0).max(5) }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'relatedServiceId', title: 'Related service ID', type: 'string' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'category' },
  },
});
