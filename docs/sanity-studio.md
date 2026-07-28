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

## CORS origins — DONE (2026-07-29)

All three origins are registered with credentials allowed. Verified returning
`access-control-allow-origin`. Nothing further is needed here.

Kept for reference, because it will bite again on a new project: adding a CORS
origin requires the `sanity.project.cors/create` grant, which **no API token
carries** — not an editor token, not an access-manager token. It needs an
authenticated *administrator user* session. `npx sanity login` stores one in
`~/.config/sanity/config.json` (`authType: normal`), and the CLI picks it up
automatically. If `sanity cors add` fails with a grant error, check whether
`SANITY_AUTH_TOKEN` is set in the environment — it overrides the stored session
with a robot token that cannot do this.

Go to <https://sanity.io/manage/project/ngv93z0z/api> → *CORS origins* → *Add*,
and add each of these with **Allow credentials** checked:

- `https://www.qognitionagency.com`
- `https://qognitionagency.com`
- `http://localhost:3000`

Or from a terminal. This must be a **real interactive terminal** (Terminal.app,
iTerm) — `sanity login` needs a TTY to open the browser OAuth flow, and fails
with "Multiple login providers available" when piped through a non-interactive
shell:

```bash
npx sanity login   # opens a browser; pick google / github / sanity
npx sanity cors add https://www.qognitionagency.com --credentials -p ngv93z0z
npx sanity cors add https://qognitionagency.com     --credentials -p ngv93z0z
npx sanity cors add http://localhost:3000           --credentials -p ngv93z0z
```

The flag is `-p` / `--project-id`; there is no `--project`.

Setting `SANITY_AUTH_TOKEN` instead of logging in does **not** work here: the
CLI authenticates fine but the API still rejects the write, because neither an
editor nor an access-manager token carries `sanity.project.cors/create`. Only an
administrator session can add origins.

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

909 documents across 14 types. The desk is grouped in `sanity/structure.ts` —
a flat type list is unusable at this volume.

| Group | Type | Mirrors | Count |
|---|---|---|---|
| Pages & SEO | `pillarPage` | `data/b2bPages.ts` | 7 |
| | `servicePage` | `SERVICE_SUB_PAGES` | 119 |
| | `freeToolPage` | `FREE_TOOLS` | 7 |
| | `comparisonPage` | `COMPARISONS` | 9 |
| | `resourcePage` | `RESOURCES` | 5 |
| Editorial | `post` | `data/blog.ts` | 11 |
| | `caseStudy` | `data/work.ts` | 25 |
| | `glossaryTerm` | `GLOSSARY_TERMS` | 320 |
| Offering | `service` | `data/services.ts` | 11 |
| | `industry` | `data/industries.ts` | 11 |
| | `tool` | `data/tools.ts` | 25 |
| Locations | `location` | `data/locations.ts` | 340 |
| Trust | `teamMember` | `TEAM_MEMBERS` | 7 |
| | `testimonial` | `data/trust.ts` | 12 |

Every page-shaped type carries the same SEO head fields — `title` (the `<title>`
tag), `description` (meta description), `slug`, and `h1` — so the whole search
surface is editable in one place.

Nested objects (`faq`, `contentSection`, `relatedLink`, `subService`,
`processStep`, `expertQuote`) live in `sanity/schemaTypes/objects.ts` and are
registered before the documents that reference them.

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

## Live content: edit in Studio -> live on the site

Cut over so far: **blog posts, case studies, pillar/guide pages**. Editing any of
these in the studio and hitting Publish updates the live page.

How it works:

1. Pages read through `lib/sanityContent.ts`, which tags every query
   (`sanity:<type>` and `sanity:<type>:<slug>`) and sets a 60s ISR window.
2. On publish, Sanity POSTs to `/api/revalidate`. The route verifies the
   signature and calls `revalidateTag` for the document's own tag and its type
   tag — so one edit refreshes its detail page and any listing containing it,
   without dumping the whole cache.
3. The next request re-renders that page. Expect a few seconds.

The webhook is already registered (`Next.js revalidate`, id `k7OG5sffr3vZlmIe`,
rule `_type in ['post','caseStudy','pillarPage','glossaryTerm']`). Its secret
must match `SANITY_REVALIDATE_SECRET` in the deployment env — **without that env
var the route returns 503** and edits fall back to the 60s ISR window instead of
being near-instant.

`dynamicParams` is `true` on these routes, so a brand-new document added in the
studio renders on first request rather than waiting for a rebuild.

### Every read falls back to `data/*.ts`

Deliberate. A Sanity outage, a network blip, or an unmigrated document must
never blank a page that used to render. Sanity is the source of truth when it
answers; the committed data is the floor when it does not. This also means a
cutover cannot take the site down — worst case it serves the old copy.

## Still reading from `data/*.ts`

Migrating the content **did not** change what the site renders. Every page still
imports from `data/*.ts`. Sanity is now the populated system of record, but
cutting each surface over is a separate change — swap the import for a GROQ
query through `sanityClient`, page by page, verifying output as you go. Doing it
in one sweep would put every page on an unverified data path at once.
