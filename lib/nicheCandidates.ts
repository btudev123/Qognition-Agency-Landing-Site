import { ICP_INDUSTRIES } from '../data/b2b/icp';
import { ICP_PUBLISHED } from './b2b/icpPublication';
import { isPreviewDeployment } from './deploymentMode';
import type { Metadata } from 'next';
export function findNicheCandidate(path: readonly string[]) {
  if (path.length < 1 || path.length > 4) return undefined;
  const industry = ICP_INDUSTRIES.find(i=>i.slug===path[0]);
  if (!industry) return undefined;
  const sub = industry.sub_industries.find(s=>s.slug===path[1]);
  if (path.length>1&&!sub) return undefined;
  const niche = sub?.niches.find(n=>n.slug===path[2]);
  if (path.length>2&&!niche) return undefined;
  const leaf = niche?.sub_niches.find(n=>n.slug===path[3]);
  if (path.length>3&&!leaf) return undefined;
  const entity = leaf || niche || sub || industry;
  const children = leaf ? [] : niche ? niche.sub_niches : sub ? sub.niches : industry.sub_industries;
  const view = (item: {id:string;slug:string;name:string}) => ({id:item.id,slug:item.slug,name:item.name});
  return {industry:view(industry),sub:sub?{...view(sub),ai_prompts:sub.ai_prompts}:undefined,niche:niche?view(niche):undefined,leaf:leaf?view(leaf):undefined,entity:view(entity),children:children.map(view),path:[...path],href:`/industries/${path.join('/')}`};
}
export function previewCandidate(path: readonly string[]) {
  if (!isPreviewDeployment() || ICP_PUBLISHED.has(path.join('/'))) return undefined;
  return findNicheCandidate(path);
}
export function previewCandidateMetadata(path: readonly string[]): Metadata | undefined {
  const c = previewCandidate(path);
  return c ? {title:`AI SEO & GEO for ${c.entity.name}`,description:`Explore AI SEO and GEO for ${c.entity.name}, with content, technical search foundations and clear enquiry paths.`,robots:{index:false,follow:false},alternates:{canonical:c.href}} : undefined;
}
