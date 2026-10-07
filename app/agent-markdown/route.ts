import { AUDIT_OFFERS } from '../../data/auditOffers';
import { B2B_MOFU_PAGES } from '../../data/b2bPages';
import {
  B2B_CASE_STUDIES,
  B2B_SERVICE_LABEL,
  CASE_STUDIES,
  FUNNEL_STAGES,
  FUNNEL_STAGE_LABEL,
  b2bMarket,
  formatCount,
  formatWindow,
  nicheLabel,
} from '../../data/case-studies';
import { BLOG_POSTS } from '../../data/blog';
import { SERVICES } from '../../data/services';
import { RESOURCES, FREE_TOOLS } from '../../data/seoExpansion';
import { SITE_URL, h1For } from '../../lib/seo';
import { servicePageFor } from '../../data/servicePages';
import { getServiceSubPage } from '../../data/seoExpansion';

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
  const b2bStudy = caseStudyMatch ? B2B_CASE_STUDIES.find((study) => study.id === caseStudyMatch[1]) : undefined;
  if (b2bStudy) {
    return [
      `# ${b2bStudy.headline}`,
      '',
      `${b2bStudy.client}, ${b2bMarket(b2bStudy)}, ${b2bStudy.sector}. B2B client programme.`,
      '',
      b2bStudy.engagement,
      '',
      '## Who they sell to',
      b2bStudy.sellsTo,
      '',
      '## The problem',
      b2bStudy.problem,
      '',
      '## What we did',
      ...b2bStudy.whatWeDid.map((item) => `- ${item}`),
      '',
      `## Results, ${formatWindow(b2bStudy)}`,
      b2bStudy.source,
      ...FUNNEL_STAGES.map(
        (stage) => `- ${FUNNEL_STAGE_LABEL[stage].label}: ${formatCount(b2bStudy.results[stage])} (${FUNNEL_STAGE_LABEL[stage].meaning})`
      ),
      ...(b2bStudy.paidMedia
        ? ['', `### ${b2bStudy.paidMedia.channel}, same dates`, ...b2bStudy.paidMedia.figures.map((f) => `- ${f.label}: ${f.value}${f.note ? ` (${f.note})` : ''}`)]
        : []),
      '',
      '## Services used',
      ...b2bStudy.services.map((s) => `- ${B2B_SERVICE_LABEL[s].label}: ${B2B_SERVICE_LABEL[s].meaning}`),
      '',
      `Canonical: ${SITE_URL}/case-studies/${b2bStudy.id}`
    ];
  }
  const caseStudy = caseStudyMatch ? CASE_STUDIES.find((study) => study.id === caseStudyMatch[1]) : undefined;
  if (caseStudy) {
    return [
      `# ${caseStudy.headline}`,
      '',
      `${caseStudy.client}, ${caseStudy.market}, ${nicheLabel(caseStudy.niche)}`,
      '',
      caseStudy.snapshot,
      '',
      '## Programme focus',
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
      ...caseStudy.benchmarks.map((b) => `- ${b.stat}: ${b.measures} (${b.source}, ${b.year}) ${b.url}`),
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
    return ['# Free audits and resources', '', ...RESOURCES.map((resource) => `- [${resource.title}](${SITE_URL}${resource.href || `/${resource.slug}`}) - ${resource.description}`)];
  }

  if (cleanPath === '/case-studies') {
    return [
      '# Case Studies',
      '',
      '## B2B client programmes, with dated results confirmed by client reporting',
      '',
      ...B2B_CASE_STUDIES.map(
        (study) =>
          `- [${study.headline}](${SITE_URL}/case-studies/${study.id}): ${study.client}, ${b2bMarket(study)} (${formatWindow(study)})`
      ),
      '',
      `## ${CASE_STUDIES.length} client programmes across HVAC, dental and insurance (KPIs are targets until client reporting confirms them)`,
      '',
      ...CASE_STUDIES.map(
        (study) =>
          `- [${study.headline}](${SITE_URL}/case-studies/${study.id}): ${study.client}, ${study.market} (${nicheLabel(study.niche)})`
      ),
    ];
  }

  if (cleanPath === '/free-tools') {
    return ['# Free Tools', '', ...FREE_TOOLS.map((tool) => `- [${tool.title}](${SITE_URL}/free-tools/${tool.slug}) - ${tool.description}`)];
  }

  /* The five plain-English service pages (data/servicePages.ts). Same strings as the
     visible page and the FAQ JSON-LD, so a reader and an agent see the same claims. */
  const servicePage = servicePageFor(cleanPath);
  if (servicePage) {
    const [, , serviceId, subSlug] = cleanPath.split('/');
    const service = SERVICES.find((item) => item.id === serviceId);
    const h1 = subSlug
      ? getServiceSubPage(serviceId, subSlug)?.h1 ?? service?.title ?? cleanPath
      : h1For(cleanPath, service?.title ?? cleanPath);
    const { monthly } = servicePage;
    return [
      `# ${h1}`,
      '',
      servicePage.eyebrow,
      '',
      servicePage.promise,
      ...(servicePage.promiseNote ? ['', servicePage.promiseNote] : []),
      '',
      `Canonical: ${SITE_URL}${cleanPath}`,
      '',
      '## What you get',
      ...servicePage.whatYouGet.map((item) => `- ${item.title}: ${item.body}`),
      '',
      '## What you see each month',
      ...(monthly.intro ? [monthly.intro, ''] : []),
      ...monthly.items.map((item) => `- ${item}`),
      ...(monthly.note ? ['', monthly.note] : []),
      ...(monthly.auditLink
        ? ['', `Want to see your answers first? [Request a free AI visibility audit](${SITE_URL}/free-ai-audit).`]
        : []),
      '',
      '## Questions buyers ask us',
      ...servicePage.faqs.flatMap((faq) => ['', `### ${faq.question}`, faq.answer]),
      '',
      `Book a call: ${SITE_URL}/book`,
      `Send an enquiry: ${SITE_URL}/contact#enquiry`
    ];
  }

  if (cleanPath === '/services') {
    return ['# Qognition Services', '', ...SERVICES.map((service) => `- [${service.title}](${SITE_URL}/services/${service.id}) - ${service.shortDescription}`)];
  }

  return [
    '# Qognition Agency',
    '',
    'Qognition Agency is a B2B AI search visibility agency. It runs AI SEO, GEO, SEO, local SEO and B2B PPC for established B2B companies, including SaaS.',
    '',
    `Canonical: ${SITE_URL}${cleanPath === '/' ? '' : cleanPath}`,
    '',
    '## Important Links',
    `- [Free AI visibility audit](${SITE_URL}/free-ai-audit)`,
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
