/** Discovery surfaces, not partnerships or a promise of placement. */
export type AIPlatform = { id: string; name: string; url: string; icon?: string; monogram: string; group: 'primary' | 'extended'; markets: 'global' | 'china' | 'europe'; monitoring: 'scope-per-engagement' };
export const AI_PLATFORMS: readonly AIPlatform[] = [
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chatgpt.com/', icon: '/brand-logos/ai-openai.svg', monogram: 'O', group: 'primary', markets: 'global', monitoring: 'scope-per-engagement' },
  { id: 'google-ai', name: 'Google AI Overviews / AI Mode', url: 'https://www.google.com/search', icon: '/brand-logos/google.svg', monogram: 'G', group: 'primary', markets: 'global', monitoring: 'scope-per-engagement' },
  { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com/', icon: '/brand-logos/ai-gemini.svg', monogram: '✦', group: 'primary', markets: 'global', monitoring: 'scope-per-engagement' },
  { id: 'perplexity', name: 'Perplexity', url: 'https://www.perplexity.ai/', icon: '/brand-logos/ai-perplexity.svg', monogram: 'P', group: 'primary', markets: 'global', monitoring: 'scope-per-engagement' },
  { id: 'claude', name: 'Claude', url: 'https://claude.ai/', icon: '/brand-logos/ai-claude.svg', monogram: '✳', group: 'primary', markets: 'global', monitoring: 'scope-per-engagement' },
  { id: 'copilot', name: 'Microsoft Copilot', url: 'https://copilot.microsoft.com/', monogram: 'C', group: 'primary', markets: 'global', monitoring: 'scope-per-engagement' },
  { id: 'grok', name: 'Grok', url: 'https://grok.com/', monogram: '↗', group: 'primary', markets: 'global', monitoring: 'scope-per-engagement' },
  { id: 'meta-ai', name: 'Meta AI', url: 'https://www.meta.ai/', icon: '/brand-logos/meta.svg', monogram: '∞', group: 'extended', markets: 'global', monitoring: 'scope-per-engagement' },
  { id: 'mistral', icon: '/brand-logos/ai-mistral.svg', name: 'Mistral', url: 'https://mistral.ai/', monogram: 'M', group: 'extended', markets: 'europe', monitoring: 'scope-per-engagement' },
  { id: 'deepseek', icon: '/brand-logos/ai-deepseek.svg', name: 'DeepSeek', url: 'https://www.deepseek.com/', monogram: 'D', group: 'extended', markets: 'global', monitoring: 'scope-per-engagement' },
  { id: 'qwen', icon: '/brand-logos/ai-qwen.svg', name: 'Qwen', url: 'https://qwen.ai/', monogram: 'Q', group: 'extended', markets: 'china', monitoring: 'scope-per-engagement' },
  { id: 'kimi', icon: '/brand-logos/ai-kimi.svg', name: 'Kimi', url: 'https://www.kimi.com/', monogram: 'K', group: 'extended', markets: 'china', monitoring: 'scope-per-engagement' },
  { id: 'baidu', icon: '/brand-logos/ai-baidu.svg', name: 'Baidu / Wenxin', url: 'https://wenxin.baidu.com/', monogram: '文', group: 'extended', markets: 'china', monitoring: 'scope-per-engagement' },
];
