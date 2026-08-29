import type { Metadata } from 'next';
import HomePage from './HomePage';

export const metadata: Metadata = {
  title: 'Qognition | AI Growth Marketing Partner for Founders',
  description:
    'Qognition helps founders grow with AI-native marketing, SEO, web design, paid media, and conversion strategy built to generate qualified pipeline.',
  alternates: { canonical: '/' },
};

export default function Page() {
  return <HomePage />;
}
