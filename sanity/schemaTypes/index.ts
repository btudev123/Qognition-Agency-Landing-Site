import type { SchemaTypeDefinition } from 'sanity';

import { post } from './post';
import { caseStudy } from './caseStudy';
import { tool } from './tool';
import { testimonial } from './testimonial';

export const schemaTypes: SchemaTypeDefinition[] = [post, caseStudy, tool, testimonial];
