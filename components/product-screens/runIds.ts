/* Element ids shared by the server-rendered run rows and the client player, so a
 * progress segment can take its name from the row it shows (aria-labelledby)
 * without the player receiving any data (ADR-0006 §11.4.7). One run per page. */
export const RUN_SHOW_ID = 'scriblr-run-show';
export const runIndustryId = (index: number): string => `scriblr-run-industry-${index}`;
