import type { SchemaTypeDefinition } from 'sanity';

import { post } from './post';
import { caseStudy } from './caseStudy';
import { tool } from './tool';
import { testimonial } from './testimonial';
import { objectTypes } from './objects';
import { pageTypes } from './pages';
import { taxonomyTypes } from './taxonomy';

export const schemaTypes: SchemaTypeDefinition[] = [
  // Nested objects must be registered before the documents that reference them.
  ...objectTypes,
  post,
  caseStudy,
  tool,
  testimonial,
  ...pageTypes,
  ...taxonomyTypes,
];
