/* THE BARREL. Hand-written, and asserted rather than trusted.
 *
 * ADR-0007 §4.1 item 4: `data/b2b/index.ts` is hand-written, and the gate
 * asserts that every `.ts` file under `bodies/**` is reachable from it. That
 * catches the page authored and never wired up, and — more usefully — the body
 * file deleted while its entity still claims `state: 'published'`, which would
 * otherwise be a runtime undefined on a live URL.
 *
 * KEY FORMAT. A hub is keyed by its meta-vertical id. A sub-niche is keyed
 * `<meta>/<sub>`, which is exactly its URL path below `/industries/`. One key
 * shape for both page types means the registry does no string surgery and the
 * observation store can use the same key.
 *
 * This map is DELIBERATELY not derived from the filesystem. A derived map agrees
 * with the files by construction and therefore gates nothing — the same argument
 * lib/industryPublication.ts makes for enumerating the published industries by
 * hand instead of generating them from `data/industries.ts`.
 */

import type { B2BBody } from './types';
import { MANUFACTURING_INDUSTRIAL_HUB } from './bodies/manufacturing-industrial/hub';
import { CNC_MACHINING } from './bodies/manufacturing-industrial/cnc-machining';

export const B2B_BODIES: ReadonlyMap<string, B2BBody> = new Map<string, B2BBody>([
  ['manufacturing-industrial', MANUFACTURING_INDUSTRIAL_HUB],
  ['manufacturing-industrial/cnc-machining', CNC_MACHINING],
]);

/** The key for an entity. Sub-niche when `subNicheId` is present, hub otherwise. */
export function bodyKey(verticalId: string, subNicheId?: string): string {
  return subNicheId ? `${verticalId}/${subNicheId}` : verticalId;
}

export function getBody(verticalId: string, subNicheId?: string): B2BBody | undefined {
  return B2B_BODIES.get(bodyKey(verticalId, subNicheId));
}

export type { B2BBody };
