/* ADR-0006 R2, §4.1. Invented firms on RFC 2606 `.example` domains.
 * Trading-name check: docs/design/2026-10-sample-brand-check.md (Iris, 2026-10-07). Quillmark
 * Software and Stroud & Fenner clashed with real firms and were renamed; the gate bans both.
 * Adding one is a reviewed change: scripts/check-b2b.cjs reads this array. */
export const SAMPLE_BRANDS = [
  'Ondrell Software', // tab: saas           ondrell.example
  'Thornbury Precision', // tab: manufacturing  thornbury-precision.example
  'Corran & Whitlow', // tab: legal          corranwhitlow.example
  'Pellman IT Group', // tab: msp            pellman-it.example
  'Harbour & Vane', // tab: logistics      harbourvane.example
  'Calderwood Risk', // unused in this build
  'Varrowfield Group', // unused in this build. Replaces Northgate Mutual
] as const;
export type SampleBrand = (typeof SAMPLE_BRANDS)[number];

/** RFC 2606 reserved TLD. Cannot resolve. */
export type SampleDomain = `${string}.example`;
