import { defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
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
      name: 'excerpt',
      type: 'text',
      rows: 3,
      description: 'Used as the meta description and card summary. Aim for 140–160 characters.',
      validation: (r) => r.max(300),
    }),
    defineField({ name: 'category', type: 'string' }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'publishedAt', title: 'Published at', type: 'datetime' }),
    defineField({ name: 'readTime', title: 'Read time', type: 'string', description: 'e.g. "8 min read"' }),
    defineField({ name: 'authorName', title: 'Author name', type: 'string' }),
    defineField({ name: 'authorTitle', title: 'Author title', type: 'string' }),
    defineField({ name: 'authorAvatar', title: 'Author avatar path', type: 'string' }),
    defineField({ name: 'coverImagePath', title: 'Cover image path', type: 'string' }),
    defineField({ name: 'coverImage', title: 'Cover image (upload)', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'body',
      title: 'Body (Markdown)',
      type: 'text',
      rows: 30,
      description: 'Markdown. Rendered with the existing marked pipeline.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'coverImage' },
  },
});
