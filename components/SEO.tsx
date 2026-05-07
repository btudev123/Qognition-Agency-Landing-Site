import React from 'react';
import { SchemaData } from '../types';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  schemaData?: SchemaData;
  image?: string;
}

const SEO: React.FC<SEOProps> = () => null;

export default SEO;
