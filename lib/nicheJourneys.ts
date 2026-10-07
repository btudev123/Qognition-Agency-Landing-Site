import { ICP_INDUSTRIES, ICP_VERSION } from '../data/b2b/icp';
import { ICP_PUBLISHED } from './b2b/icpPublication';
import { SECTOR_BRIEFS } from '../data/funnels/sectorBriefs';
import { appendFunnelContext, type FunnelContext } from './funnelContext';
export type JourneyAsset = { href: string; stage: 'tofu'|'mofu'|'bofu'; status: 'draft'|'published'; rationale: string };
export type SubNicheJourney = {
  id: string; name: string; path: string; industryId: string; subindustryId: string; nicheId: string;
  industry: string; subindustry: string; niche: string; agencyBuyer: readonly string[];
  problem: string; commercialOutcome: string; qualificationQuestion: string;
  tofu: JourneyAsset; mofu: JourneyAsset; bofu: JourneyAsset;
  evidence: readonly string[]; contentComplete: boolean; previewReady: boolean; candidateBrowsable: boolean; published: boolean;
  context: FunnelContext; bookHref: string; contactHref: string;
};
export const SUBNICHE_JOURNEYS: readonly SubNicheJourney[] = ICP_INDUSTRIES.flatMap(industry => industry.sub_industries.flatMap(sub => sub.niches.flatMap(niche => niche.sub_niches.map(leaf => {
  const path = `/industries/${industry.slug}/${sub.slug}/${niche.slug}/${leaf.slug}`;
  const resource = `/resources/b2b-search/${industry.slug}/${sub.slug}`;
  const brief = SECTOR_BRIEFS[industry.id];
  const context: FunnelContext = {industry_id:industry.id,subindustry_id:sub.id,niche_id:niche.id,subniche_id:leaf.id,stage:'bofu',page_id:path};
  const published = ICP_PUBLISHED.has(path.replace('/industries/',''));
  return {
    id:leaf.id,name:leaf.name,path,industryId:industry.id,subindustryId:sub.id,nicheId:niche.id,
    industry:industry.name,subindustry:sub.name,niche:niche.name,agencyBuyer:sub.buyer_titles ?? [],
    problem:brief.problem,commercialOutcome:brief.outcome,qualificationQuestion:brief.qualification,
    tofu:{href:appendFunnelContext(`${resource}/learn`,{...context,stage:'tofu'}),stage:'tofu' as const,status:'draft' as const,rationale:`A shared ${sub.name} buyer-research guide; the ${leaf.name} application needs editorial validation.`},
    mofu:{href:appendFunnelContext(`${resource}/evaluate`,{...context,stage:'mofu'}),stage:'mofu' as const,status:'draft' as const,rationale:`Evaluate search work for ${niche.name}, including the ${leaf.name} scope.`},
    bofu:{href:path,stage:'bofu' as const,status:published?'published' as const:'draft' as const,rationale:`Commercial scope for ${leaf.name} within ${niche.name}.`},
    evidence:[`operator-taxonomy:${ICP_VERSION}:${leaf.id}`,`docs/icp-industries/${industry.id}-${industry.slug}.md`],
    // Mapping, rendering and substantive editorial completion are separate facts.
    contentComplete:false,previewReady:false,candidateBrowsable:true,published:false,context,
    bookHref:appendFunnelContext('/book',context),contactHref:appendFunnelContext('/contact#enquiry',context),
  };
}))));
const byId = new Map(SUBNICHE_JOURNEYS.map(j=>[j.id,j]));
const byPath = new Map(SUBNICHE_JOURNEYS.map(j=>[j.path,j]));
export const getSubNicheJourney = (id: string) => byId.get(id);
export const getSubNicheJourneyByPath = (path: string) => byPath.get(path);
export const journeyCoverage = () => ({taxonomyVersion:ICP_VERSION,total:SUBNICHE_JOURNEYS.length,mapped:SUBNICHE_JOURNEYS.length,contentComplete:SUBNICHE_JOURNEYS.filter(j=>j.contentComplete).length,previewReady:SUBNICHE_JOURNEYS.filter(j=>j.previewReady).length,candidateBrowsable:SUBNICHE_JOURNEYS.filter(j=>j.candidateBrowsable).length,published:SUBNICHE_JOURNEYS.filter(j=>j.published).length,publishedCommercialPages:SUBNICHE_JOURNEYS.filter(j=>j.bofu.status==='published').length});
