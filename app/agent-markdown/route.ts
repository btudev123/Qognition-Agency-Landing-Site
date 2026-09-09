import { AUDIT_OFFERS } from '../../data/auditOffers';
import { B2B_MOFU_PAGES } from '../../data/b2bPages';
import { CASE_STUDIES, nicheLabel } from '../../data/case-studies';
import { BLOG_POSTS } from '../../data/blog';
import { SERVICES } from '../../data/services';
import { RESOURCES, FREE_TOOLS } from '../../data/seoExpansion';
import { SITE_URL } from '../../lib/seo';

export const dynamic = 'force-dynamic';

const linesForPath = (path: string) => {
  const cleanPath = path.split('?')[0] || '/';
  const audit = AUDIT_OFFERS.find((offer) => `/${offer.slug}` === cleanPath);
  if (audit) {
    return [
      `# ${audit.h1}`,
      '',
      audit.description,
      '',
      `Canonical: ${SITE_URL}/${audit.slug}`,
      '',
      '## Checks',
      ...audit.checks.map((check) => `- ${check}`),
      '',
      '## Outcomes',
      ...audit.outcomes.map((outcome) => `- ${outcome}`),
      '',
      `Start audit: ${SITE_URL}/${audit.slug}`
    ];
  }

  const b2b = B2B_MOFU_PAGES.find((page) => `/${page.slug}` === cleanPath);
  if (b2b) {
    return [
      `# ${b2b.h1}`,
      '',
      b2b.summary,
      '',
      ...b2b.sections.flatMap((section) => [`## ${section.title}`, '', section.content, '']),
      '## Related Links',
      ...b2b.relatedLinks.map((link) => `- [${link.label}](${SITE_URL}${link.href})`)
    ];
  }

  const caseStudyMatch = cleanPath.match(/^\/case-studies\/([^/]+)$/);
  const caseStudy = caseStudyMatch ? CASE_STUDIES.find((study) => study.id === caseStudyMatch[1]) : undefined;
  if (caseStudy) {
    return [
      `# ${caseStudy.headline}`,
      '',
      `${caseStudy.client} — ${caseStudy.market} — ${nicheLabel(caseStudy.niche)}`,
      '',
      caseStudy.snapshot,
      '',
      `## What we verified (audited ${caseStudy.auditedAt})`,
      caseStudy.startingPosition,
      '',
      '## The problem',
      `${caseStudy.coreProblem} ${caseStudy.diagnosis}`,
      '',
      caseStudy.evidence === 'verified'
        ? '## Results, reconciled against client reporting'
        : '## Targets this programme was set and measured against (not reported results)',
      ...caseStudy.kpis.map((k) =>
        caseStudy.evidence === 'verified'
          ? `- ${k.label}: ${k.baseline} -> ${k.actual} (${k.unit})`
          : `- ${k.label}: baseline ${k.baseline}, target ${k.target} (${k.change}; ${k.unit})`
      ),
      '',
      '## Benchmarks cited',
      ...caseStudy.benchmarks.map((b) => `- ${b.stat} — ${b.measures} (${b.source}, ${b.year}) ${b.url}`),
      '',
      `Canonical: ${SITE_URL}/case-studies/${caseStudy.id}`
    ];
  }

  const blogMatch = cleanPath.match(/^\/blog\/([^/]+)$/);
  const blog = blogMatch ? BLOG_POSTS.find((post) => post.id === blogMatch[1]) : undefined;
  if (blog) {
    return [`# ${blog.title}`, '', blog.excerpt, '', `Author: ${blog.author.name}`, '', blog.content];
  }

  if (cleanPath === '/resources') {
    return ['# Free Audits and Lead Magnets', '', ...RESOURCES.map((resource) => `- [${resource.title}](${SITE_URL}${resource.href || `/${resource.slug}`}) - ${resource.description}`)];
  }

  if (cleanPath === '/case-studies') {
    return [
      '# Case Studies',
      '',
      `${CASE_STUDIES.length} engagements across HVAC, dental and insurance.`,
      '',
      ...CASE_STUDIES.map(
        (study) =>
          `- [${study.headline}](${SITE_URL}/case-studies/${study.id}) — ${study.client}, ${study.market} (${nicheLabel(study.niche)})`
      ),
    ];
  }

  if (cleanPath === '/free-tools') {
    return ['# Free Tools', '', ...FREE_TOOLS.map((tool) => `- [${tool.title}](${SITE_URL}/free-tools/${tool.slug}) - ${tool.description}`)];
  }

  if (cleanPath === '/services') {
    return ['# Qognition Services', '', ...SERVICES.map((service) => `- [${service.title}](${SITE_URL}/services/${service.id}) - ${service.shortDescription}`)];
  }

  return [
    '# Qognition Agency',
    '',
    'Qognition is an AI growth marketing partner for qualified leads, SEO, AI search visibility, PPC, social media, web design, branding, creative, and measurable revenue systems.',
    '',
    `Canonical: ${SITE_URL}${cleanPath === '/' ? '' : cleanPath}`,
    '',
    '## Important Links',
    `- [Free SEO Audit](${SITE_URL}/free-seo-audit)`,
    `- [Free AI Audit](${SITE_URL}/free-ai-audit)`,
    `- [Case Studies](${SITE_URL}/case-studies)`,
    `- [Services](${SITE_URL}/services)`,
    `- [Resources](${SITE_URL}/resources)`
  ];
};

export function GET(request: Request) {
  const url = new URL(request.url);
  const path = url.searchParams.get('path') || '/';
  const markdown = `${linesForPath(path).join('\n')}\n`;
  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'x-markdown-tokens': String(Math.ceil(markdown.split(/\s+/).length * 1.3)),
      'Cache-Control': 's-maxage=300, stale-while-revalidate=3600'
    }
  });
}
