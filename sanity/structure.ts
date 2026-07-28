import type { StructureResolver } from 'sanity/structure';

// A flat type list is unusable at ~900 documents, so the desk is grouped by what
// an editor is actually trying to find.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pages & SEO')
        .child(
          S.list()
            .title('Pages & SEO')
            .items([
              S.documentTypeListItem('pillarPage').title('Pillar / Guide Pages'),
              S.documentTypeListItem('servicePage').title('Service Sub-Pages'),
              S.documentTypeListItem('freeToolPage').title('Free Tool Pages'),
              S.documentTypeListItem('comparisonPage').title('Comparison Pages'),
              S.documentTypeListItem('resourcePage').title('Resources'),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Editorial')
        .child(
          S.list()
            .title('Editorial')
            .items([
              S.documentTypeListItem('post').title('Blog Posts'),
              S.documentTypeListItem('caseStudy').title('Case Studies'),
              S.documentTypeListItem('glossaryTerm').title('Glossary Terms'),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Offering')
        .child(
          S.list()
            .title('Offering')
            .items([
              S.documentTypeListItem('service').title('Services'),
              S.documentTypeListItem('industry').title('Industries'),
              S.documentTypeListItem('tool').title('Directory Tools'),
            ]),
        ),

      S.divider(),

      // 340 locations — grouped by region so the list stays navigable.
      S.listItem()
        .title('Locations')
        .child(
          S.list()
            .title('Locations')
            .items([
              S.listItem()
                .title('By region')
                .child(
                  S.documentTypeList('location')
                    .title('By region')
                    .defaultOrdering([{ field: 'region', direction: 'asc' }]),
                ),
              S.documentTypeListItem('location').title('All locations'),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Trust')
        .child(
          S.list()
            .title('Trust')
            .items([
              S.documentTypeListItem('teamMember').title('Team'),
              S.documentTypeListItem('testimonial').title('Testimonials'),
            ]),
        ),
    ]);
