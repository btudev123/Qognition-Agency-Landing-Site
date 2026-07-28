'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import { apiVersion, dataset, projectId } from './sanity/env';
import { schemaTypes } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

// Studio is mounted inside the Next app at /studio so it lives on the same
// domain as the site (www.qognitionagency.com/studio) rather than a separate
// *.sanity.studio host.
export default defineConfig({
  name: 'qognition',
  title: 'Qognition',
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
