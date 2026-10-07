import { Columns3, ShieldCheck, Users, type LucideIcon } from 'lucide-react';

/* The three promise chips on every /services/* page and every /services/<service>/<sub>
 * page. They replace the three paragraph cards (docs/copy/2026-10/plain-english-templates.md
 * §2.2) and answer the same buyer objections (services-template.md; Marcus 03 §5.1, §5.2):
 *   C7  "Can you guarantee it?"
 *   M1  "How do I report this upward?"
 *   M4  "Will this clash with our team or agency?"
 * One list, so the templates cannot drift apart. Server-only: the icons are components. */
export const PROMISE_CHIPS: readonly { readonly icon: LucideIcon; readonly label: string }[] = [
  { icon: ShieldCheck, label: 'No ranking or AI placement promises' },
  { icon: Columns3, label: 'Every result reported separately' },
  { icon: Users, label: 'Works beside your team or agency' },
];
