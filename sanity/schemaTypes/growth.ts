import { defineField, defineType } from 'sanity';

const source = defineType({ name: 'growthSource', title: 'Growth content source', type: 'object', fields: [
  defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
  defineField({ name: 'url', type: 'url', validation: (rule) => rule.required() }),
  defineField({ name: 'accessedAt', type: 'date', validation: (rule) => rule.required() }),
  defineField({ name: 'supports', title: 'Claim or context supported', type: 'text', rows: 2, validation: (rule) => rule.required() }),
] });

const entity = defineType({ name: 'growthEntity', title: 'Growth taxonomy entity', type: 'document', fields: [
  defineField({ name: 'canonicalId', title: 'Stable canonical ID', type: 'string', description: 'Keep stable across translations and URL changes. Geographic records use geonames:123 or country:US.', validation: (rule) => rule.required() }),
  defineField({ name: 'name', type: 'string', validation: (rule) => rule.required() }),
  defineField({ name: 'kind', type: 'string', options: { list: ['sector','niche','subniche','pillar','service','country','administrative-area','populated-place','economic-cluster'] }, validation: (rule) => rule.required() }),
  defineField({ name: 'parent', type: 'reference', to: [{ type: 'growthEntity' }], description: 'Niche hierarchy is dependent; do not generate unrelated industry/niche combinations.' }),
  defineField({ name: 'aliases', type: 'array', of: [{ type: 'string' }] }),
  defineField({ name: 'relatedEntities', type: 'array', of: [{ type: 'reference', to: [{ type: 'growthEntity' }] }] }),
  defineField({ name: 'source', type: 'url' }),
  defineField({ name: 'license', type: 'url' }),
  defineField({ name: 'countryCode', type: 'string' }),
  defineField({ name: 'featureCode', type: 'string', description: 'Retain original GeoNames feature code, including historical status.' }),
], preview: { select: { title: 'name', subtitle: 'canonicalId' } } });

const publication = defineType({ name: 'growthPublication', title: 'Growth page publication', type: 'document', fields: [
  defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
  defineField({ name: 'path', type: 'string', description: 'One canonical path. English starts /growth/; localized paths must follow the locale route contract.', validation: (rule) => rule.required().regex(/^\/(?:[a-z]{2}(?:-[A-Za-z]+)?\/)?growth(?:\/|$)/) }),
  defineField({ name: 'language', type: 'string', initialValue: 'en', options: { list: ['en','de','fr','nl','sv','da','nb','fi','ar','it','zh-Hans'] }, validation: (rule) => rule.required() }),
  defineField({ name: 'entity', type: 'reference', to: [{ type: 'growthEntity' }] }),
  defineField({ name: 'relatedEntities', type: 'array', of: [{ type: 'reference', to: [{ type: 'growthEntity' }] }] }),
  defineField({ name: 'status', type: 'string', initialValue: 'draft', options: { list: ['draft','review','published'], layout: 'radio' }, validation: (rule) => rule.required() }),
  defineField({ name: 'indexable', title: 'Eligible for indexing', type: 'boolean', initialValue: false, description: 'Independent from navigation. Only published, reviewed pages may enter the XML sitemap.' }),
  defineField({ name: 'inNavigation', title: 'Visible in navigation', type: 'boolean', initialValue: false }),
  defineField({ name: 'description', type: 'text', rows: 3, validation: (rule) => rule.required() }),
  defineField({ name: 'buyerTask', type: 'text', rows: 3, validation: (rule) => rule.required() }),
  defineField({ name: 'originalContext', type: 'text', rows: 5, description: 'Specific use case, market context or evidence. City-name substitutions are insufficient.', validation: (rule) => rule.required() }),
  defineField({ name: 'body', type: 'array', of: [{ type: 'block' }], validation: (rule) => rule.required() }),
  defineField({ name: 'sources', type: 'array', of: [{ type: 'growthSource' }] }),
  defineField({ name: 'reviewer', type: 'string' }),
  defineField({ name: 'reviewedAt', type: 'datetime' }),
  defineField({ name: 'contentUpdatedAt', type: 'datetime', description: 'Actual content change date; do not update merely because a sitemap was requested.' }),
], validation: (rule) => rule.custom((value) => {
  const record = value as { status?: string; reviewer?: string; reviewedAt?: string; body?: unknown[]; originalContext?: string; indexable?: boolean; inNavigation?: boolean } | undefined;
  if (!record) return true;
  if (record.status !== 'published' && (record.indexable || record.inNavigation)) return 'Draft/review content cannot be indexable or visible in public navigation.';
  if (record.status === 'published' && (!record.reviewer || !record.reviewedAt || !record.body?.length || !record.originalContext)) return 'Publication requires original content and an explicit reviewer/date.';
  return true;
}), preview: { select: { title: 'title', subtitle: 'status' } } });

export const growthSchemaTypes = [source, entity, publication];
