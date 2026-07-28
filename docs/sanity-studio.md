# Sanity Studio

The studio is **embedded in this Next.js app**, not a standalone package. It is
served from `/studio`, so it lives at `https://www.qognitionagency.com/studio`
on the same domain as the site.

| | |
|---|---|
| Project ID | `ngv93z0z` |
| Dataset | `production` |
| Studio route | `app/studio/[[...tool]]/page.tsx` |
| Config | `sanity.config.ts` |
| Schemas | `sanity/schemaTypes/` |
| Read/write client | `lib/sanity.ts` |

## Required manual step: CORS origins

**The studio will not load in a browser until CORS origins are registered.**
This cannot be done with an API token — neither an editor token nor an
access-manager token carries the `sanity.project.cors/create` grant. It requires
a project **administrator** signed in to the dashboard.

Go to <https://sanity.io/manage/project/ngv93z0z/api> → *CORS origins* → *Add*,
and add each of these with **Allow credentials** checked:

- `https://www.qognitionagency.com`
- `https://qognitionagency.com`
- `http://localhost:3000`

Or from a terminal, after a browser login:

```bash
npx sanity login
npx sanity cors add https://www.qognitionagency.com --credentials --project ngv93z0z
npx sanity cors add https://qognitionagency.com     --credentials --project ngv93z0z
npx sanity cors add http://localhost:3000           --credentials --project ngv93z0z
```

To verify it worked, this should return an `access-control-allow-origin` header
(it returns none while CORS is unconfigured):

```bash
curl -s -D - -o /dev/null -X OPTIONS \
  "https://ngv93z0z.api.sanity.io/v2024-10-01/data/query/production?query=*" \
  -H "Origin: https://www.qognitionagency.com" \
  -H "Access-Control-Request-Method: GET" | grep -i access-control
```

## Environment variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=ngv93z0z
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
SANITY_API_WRITE_TOKEN=<server-only, never NEXT_PUBLIC_>
```

**These are optional in deployment.** `sanity/env.ts` falls back to the literals
`ngv93z0z` / `production` / `2024-10-01`, so the deployed studio resolves its
project without any Vercel configuration. Set them only when you want to point a
preview environment at a different dataset.

Project ID and dataset are public by design and ship in the browser bundle. The
write token is server-only, used by the migration script and any future write
paths — it is not needed to render the site or load the studio.

## Schemas

| Type | Mirrors | Count migrated |
|---|---|---|
| `post` | `data/blog.ts` (`BLOG_POSTS`) | 11 |
| `caseStudy` | `data/work.ts` (`CASE_STUDIES`) | 25 |
| `tool` | `data/tools.ts` (`TOOLS`) | 25 |
| `testimonial` | `data/trust.ts` (`TESTIMONIALS`) | 12 |

Post and case-study bodies are stored as **Markdown text**, not Portable Text,
because the site already renders Markdown through `marked`. Moving to Portable
Text later means changing both the schema and the renderers together.

## Migration

```bash
# preview without writing
npx tsx scripts/migrate-to-sanity.ts --dry

# write
SANITY_API_WRITE_TOKEN=<token> npx tsx scripts/migrate-to-sanity.ts
```

The script is **idempotent** — each document gets a deterministic `_id` derived
from its source id and writes go through `createOrReplace`, so re-running
reconciles rather than duplicating.

## Important: the site still reads from `data/*.ts`

Migrating the content **did not** change what the site renders. Every page still
imports from `data/*.ts`. Sanity is now the populated system of record, but
cutting each surface over is a separate change — swap the import for a GROQ
query through `sanityClient`, page by page, verifying output as you go. Doing it
in one sweep would put every page on an unverified data path at once.
