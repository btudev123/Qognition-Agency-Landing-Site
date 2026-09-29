export type PublicationStatus = 'draft' | 'review' | 'published';
export type Publication = {
  status: PublicationStatus;
  indexable: boolean;
  inNavigation: boolean;
  updatedAt: string;
  reviewedAt?: string;
  reviewer?: string;
  evidence: string[];
};
export type GrowthSector = { id: string; slug: string; name: string; summary: string; buyer: string; proof: string[]; metrics: string[] };
export type GrowthNiche = {
  id: string; slug: string; name: string; sectorId: string; parentId?: string;
  aliases: string[]; brief: string; buyerQuestion: string; evidence: string;
  relatedSectorIds: string[];
};
export type GrowthService = { id: string; slug: string; name: string; pillarId: string; summary: string; deliverables: string[]; metric: string };
export type GrowthPillar = { id: string; slug: string; name: string; promise: string; description: string; stages: string[]; measures: string[] };
export type GrowthMarket = {
  id: string; code: string; slug: string; name: string; priority: number;
  role: 'acquisition' | 'export'; languages: string[]; planning: string; clusterExamples: string[];
};
export type GrowthProgram = {
  id: string; slug: string; title: string; sectorId: string; nicheId: string;
  marketId: string; pillarId: string; place?: { id: string; name: string };
  context: string; buyerTask: string; contentBrief: string; conversion: string;
  measurement: string; sourceUrls: string[]; publication: Publication;
};
