import type { Metadata } from 'next';
import HomePage from './HomePage';

export const metadata: Metadata = {
  title: 'Qognition | AI-Native Growth Partner',
  description:
    'Qognition engineers your presence inside Google AI Overviews, ChatGPT, Perplexity, and classic search — so your firm is the answer when buyers ask.',
  alternates: { canonical: '/' },
};

export default function Page() {
  return <HomePage />;
}
