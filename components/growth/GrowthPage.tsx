import Link from 'next/link';
import { appendFunnelContext } from '../../lib/funnelContext';
import type { ReactNode } from 'react';
import { growthSectors, growthNiches, growthPillars, growthServices, growthMarkets, growthPrograms, getNichePath, getServicePath, getSectorNiches, legacyGrowthServiceMappings } from '../../data/growth';
import { getGrowthBreadcrumbs, type GrowthPageRecord } from '../../lib/growth/publication';
import { growthStructuredData } from '../../lib/growth/metadata';
import { geographyCoverage, geographyManifest, getCountryCoverage, searchGrowthPlaces, getGrowthPlaceById } from '../../lib/growth/geo';
import styles from './GrowthPage.module.css';

type Params = Record<string, string | string[] | undefined>;
const action = '/book';
function Actions({ path }: { path: string }) { return <div className={styles.actions}><Link className={styles.primary} href={appendFunnelContext(action, { page_id: path, stage: "bofu" })}>Book a call <span aria-hidden="true">&nbsp;↗</span></Link><Link className={styles.secondary} href={appendFunnelContext("/contact#enquiry", { page_id: path, stage: "bofu" })}>Send an enquiry</Link></div>; }
function Section({ title, children }: { title: string; children: ReactNode }) { return <section className={styles.section}><h2>{title}</h2>{children}</section>; }
function List({ items, numbered = false }: { items: string[]; numbered?: boolean }) { return <ul className={`${styles.list} ${numbered ? styles.numbered : ''}`}>{items.map((item) => <li key={item}>{item}</li>)}</ul>; }
function Cards({ items, two = false }: { items: { title: string; text: string; href: string; label?: string }[]; two?: boolean }) { return <div className={two ? styles.gridTwo : styles.grid}>{items.map((item) => <article key={item.href} className={styles.card}><h3>{item.title}</h3><p>{item.text}</p><Link href={item.href}>{item.label || 'Explore the approach'} <span aria-hidden="true">↗</span></Link></article>)}</div>; }
const pillarCards = growthPillars.map((item) => ({ title: item.name, text: item.promise, href: `/growth/services/${item.slug}` }));
const sectorCards = growthSectors.map((item) => ({ title: item.name, text: item.summary, href: `/growth/industries/${item.slug}` }));
const programCards = (programs = growthPrograms) => programs.map((item) => ({ title: item.title, text: item.context, href: `/growth/programs/${item.slug}`, label: 'Read the program brief' }));

function SupportingCapabilities({ pillarId }: { pillarId: string }) {
  const items = legacyGrowthServiceMappings.filter((item) => item.pillarId === pillarId);
  return <Section title="Supporting capabilities"><p>The scope can include the capabilities below when they serve the buyer and the engagement objective. Availability, responsibilities and delivery depth are agreed in the proposal.</p><div>{items.map((item) => <span className={styles.tag} key={item.id}>{item.name}</span>)}</div></Section>;
}

async function PlaceContent({ entityId }: { entityId: string }) {
  const [country, id] = entityId.split(':');
  const place = await getGrowthPlaceById(country, Number(id));
  if (!place) return null;
  const market = growthMarkets.find((item) => item.code === country)!;
  const historical = /H$/.test(place.featureCode) || ['PPLQ','PPLW'].includes(place.featureCode);
  return <>
    <Section title="Geographic context"><p>{place.name} is classified by GeoNames as {place.featureClass === 'A' ? 'an administrative area' : 'a populated place'} in {market.name}. {historical ? 'The source classifies this record as historical, abandoned or destroyed; it is not an active-market recommendation.' : 'Confirm the relevant operating area and current status before using this record for account selection.'}</p><div className={styles.tableWrap}><table className={styles.table}><tbody><tr><th scope="row">Stable source ID</th><td>GeoNames {place.geonameId}</td></tr><tr><th scope="row">Source classification</th><td>{place.featureCode}</td></tr><tr><th scope="row">Coordinates</th><td>{place.latitude}, {place.longitude}</td></tr><tr><th scope="row">Time zone</th><td>{place.timezone || 'Not supplied'}</td></tr><tr><th scope="row">Source record updated</th><td>{place.modifiedAt}</td></tr></tbody></table></div>{place.aliases.length > 0 && <p className={styles.note}>Names supplied by the source: {place.aliases.slice(0,16).join(', ')}.</p>}</Section>
    <Section title="Use geography to clarify the market"><p>{market.planning}</p><List items={['Is this the company’s headquarters, the buyer’s location or a service-delivery area?','Which industries and actual accounts make the location relevant?','What language, operating footprint and local knowledge does the program require?']}/><p>A place record is geographic reference information. It does not imply a Qognition office, local client results or a dedicated service page for every possible industry.</p><Cards items={[{ title: `${market.name} growth planning`, text: market.planning, href: `/growth/markets/${market.slug}` }, { title: 'Explore industries', text: 'Start with the buyer’s decision and the evidence required in your sector.', href: '/growth/industries' }]}/></Section>
    <p className={styles.note}>Geographical data: <a href={`https://www.geonames.org/${place.geonameId}/`}>GeoNames</a>, <a href={geographyManifest.license}>CC BY 4.0</a>; filtered and reformatted by Qognition. Geographic classifications and names can change.</p>
  </>;
}

function ProgramContent({ id }: { id: string }) {
  const program = growthPrograms.find((item) => item.id === id)!;
  const niche = growthNiches.find((item) => item.id === program.nicheId)!;
  const market = growthMarkets.find((item) => item.id === program.marketId)!;
  const pillar = growthPillars.find((item) => item.id === program.pillarId)!;
  const sector = growthSectors.find((item) => item.id === program.sectorId)!;
  return <>
    <div><span className={styles.tag}>{niche.name}</span><span className={styles.tag}>{market.name}</span><span className={styles.tag}>{pillar.name}</span></div>
    <Section title="The buyer’s decision"><p>{program.buyerTask}</p><p>{niche.brief}</p><p>{market.planning}</p></Section>
    <Section title="The work this program would prioritize"><p>{program.contentBrief}</p><List numbered items={pillar.stages}/></Section>
    <Section title="Evidence that makes the work useful"><p>{niche.evidence}</p><List items={sector.proof}/><p className={styles.note}>This is a planning approach, not a client case study or a promise of rankings, AI recommendations or revenue. Scope follows a review of the company, market and available evidence.</p></Section>
    <Section title="From interest to a qualified conversation"><p>{program.conversion}</p><p>{program.measurement}</p><p>A downloaded guide is a sign of interest. A sales-qualified lead requires a conversation that confirms need, fit, an investment path and an agreed next step.</p></Section>
    <Section title="Continue your evaluation"><Cards items={[
      { title: pillar.name, text: pillar.description, href: `/growth/services/${pillar.slug}` },
      { title: niche.name, text: niche.brief, href: getNichePath(niche) },
      { title: market.name, text: market.planning, href: `/growth/markets/${market.slug}` },
    ]}/></Section>
  </>;
}

async function CatalogContent({ id, params }: { id: string; params: Params }) {
  const market = growthMarkets.find((item) => item.id === id)!;
  const query = typeof params.q === 'string' ? params.q.slice(0,100) : '';
  const type = params.type === 'A' ? 'A' : params.type === 'P' ? 'P' : undefined;
  const after = Math.max(0, Math.min(Math.floor(Number(typeof params.after === 'string' ? params.after : 0) || 0), getCountryCoverage(market.code)?.catalogRecords || 0));
  const includeHistorical = params.historical === '1';
  const { items, hasMore, nextOffset } = await searchGrowthPlaces(market.code, { query, type, after, limit: 30, includeHistorical });
  const coverage = getCountryCoverage(market.code)!;
  const next = new URLSearchParams({ q: query, type: type || '', after: String(nextOffset || 0), historical: includeHistorical ? '1' : '0' });
  return <>
    <p className={styles.note}>{coverage.catalogRecords.toLocaleString('en-US')} source records: {coverage.populatedPlaces.toLocaleString('en-US')} populated places and {coverage.administrativeAreas.toLocaleString('en-US')} administrative areas. Place names and classifications come from GeoNames; some records describe historical or abandoned places. Confirm operating geography before using a record in a campaign.</p>
    <form className={styles.form} action={`/growth/markets/${market.slug}/places`} method="get">
      <label className={styles.field}>Place name or GeoNames ID<input name="q" defaultValue={query} maxLength={100} placeholder="Search city, town or region"/></label>
      <label className={styles.field}>Place type<select name="type" defaultValue={type || ''}><option value="">All records</option><option value="P">Cities, towns & other populated places</option><option value="A">Administrative areas</option></select></label>
      <label className={styles.field}>Historical records<select name="historical" defaultValue={includeHistorical ? '1' : '0'}><option value="0">Exclude from results</option><option value="1">Include source historical records</option></select></label>
      <button className={styles.primary} type="submit">Search catalog</button>
    </form>
    {items.length ? <div className={styles.tableWrap}><table className={styles.table}><thead><tr><th scope="col">Place</th><th scope="col">Source classification</th><th scope="col">Source record</th></tr></thead><tbody>{items.map((place) => <tr key={place.id}><td><Link href={`/growth/markets/${market.slug}/places/${place.geonameId}`}>{place.name}</Link>{place.asciiName !== place.name && <div className={styles.note}>{place.asciiName}</div>}</td><td>{place.featureClass === 'A' ? 'Administrative area' : 'Populated place'} <span className={styles.tag}>{place.featureCode}</span></td><td><a href={`https://www.geonames.org/${place.geonameId}/`} target="_blank" rel="noreferrer">GeoNames {place.geonameId} ↗</a></td></tr>)}</tbody></table></div> : <p>No matching records in this source snapshot. Try an alternative spelling or a broader place name.</p>}
    {hasMore && <div className={styles.actions}><Link className={styles.secondary} href={`/growth/markets/${market.slug}/places?${next}`}>Next 30 records →</Link></div>}
    <Section title="About this catalog"><p>The directory supports geographic research. A place record does not imply a Qognition office, an active campaign, verified buyer demand or a dedicated local marketing program.</p><p className={styles.note}>Geographical data: <a href="https://www.geonames.org/">GeoNames</a>, <a href={geographyManifest.license}>CC BY 4.0</a>; filtered and reformatted by Qognition. Imported {coverage.importedAt.slice(0,10)} from the <a href={coverage.sourceUrl}>country export</a>. The source does not warrant complete or current coverage of every real-world place.</p><p><Link href={`/growth/markets/${market.slug}`}>Return to {market.name} growth planning →</Link></p></Section>
  </>;
}

export async function GrowthPage({ page, searchParams = {} }: { page: GrowthPageRecord; searchParams?: Params }) {
  let content: ReactNode;
  if (page.kind === 'home') content = <><Section title="AI search and the work that supports it"><Cards items={pillarCards} two/></Section><Section title="Built around the way your buyers decide"><p>Complex B2B purchases involve several people, technical questions and an evaluation process. Start with that reality: make your expertise discoverable, explain where it fits and give the right buyer a useful next step.</p><Cards items={sectorCards}/></Section><Section title="Start with a specific growth problem"><Cards items={programCards(growthPrograms.slice(0,3))}/></Section></>;
  else if (page.kind === 'services') content = <><Section title="Choose the problem you want to solve"><Cards items={pillarCards} two/></Section><Section title="An engagement with a clear purpose"><p>Begin with one audience, one commercial problem and an agreed definition of progress. Add connected services when they support that objective. Media spend, platforms and implementation responsibilities belong in the scope, not in assumptions.</p><List numbered items={['Review the current buyer journey and available evidence','Agree priorities, deliverables and responsibilities','Implement the work with clear review points','Measure qualified outcomes and decide what to improve']}/></Section></>;
  else if (page.kind === 'industries') content = <><Section title="Find your industry"><Cards items={sectorCards}/></Section><Section title="Specialist context matters"><p>The questions behind an industrial RFQ differ from the questions behind a software evaluation or a professional-services consultation. Industry, niche and subniche guides help define the buyer’s decision, the evidence required and the right conversion.</p><p>Company size is a planning input. The stronger fit is a B2B company with a considered purchase, a real growth challenge and the resources to act on a sustained program.</p></Section></>;
  else if (page.kind === 'pillar') {
    const pillar = growthPillars.find((item) => item.id === page.entityId)!;
    content = <><Section title={pillar.promise}><Cards items={growthServices.filter((item) => item.pillarId === pillar.id).map((item) => ({ title: item.name, text: item.summary, href: getServicePath(item) }))}/></Section><Section title="How the work fits together"><List items={pillar.stages} numbered/></Section><Section title="What we measure"><List items={pillar.measures}/><p className={styles.note}>Targets follow a baseline and agreed scope. Visibility, engagement and pipeline are different measures; none is a guarantee of revenue.</p></Section><Section title="See the approach in context"><Cards items={programCards(growthPrograms.filter((item) => item.pillarId === pillar.id).slice(0,6))}/></Section></>;
  } else if (page.kind === 'service') {
    const service = growthServices.find((item) => item.id === page.entityId)!;
    const pillar = growthPillars.find((item) => item.id === service.pillarId)!;
    content = <><Section title="A practical scope"><List numbered items={service.deliverables}/></Section><Section title="Connect the work to a useful outcome"><p>{service.metric} is the starting measurement focus. We agree a baseline, definitions and data sources before treating an increase as a business result.</p><p>Implementation starts with your offer, audience and existing systems. The scope should state required access, review responsibilities, delivery dependencies and the next commercial action for a visitor or account.</p></Section><Section title="Part of a connected growth program"><Cards items={[{ title: pillar.name, text: pillar.description, href: `/growth/services/${pillar.slug}` }, ...sectorCards.slice(0,2)]}/></Section></>;
  } else if (page.kind === 'sector') {
    const sector = growthSectors.find((item) => item.id === page.entityId)!;
    content = <><Section title="Who this is for"><p>{sector.buyer}</p></Section><Section title="Explore your niche"><Cards items={getSectorNiches(sector.id).map((item) => ({ title: item.name, text: item.brief, href: getNichePath(item) }))}/></Section><Section title="Evidence buyers can evaluate"><List items={sector.proof}/></Section><Section title="Measure the commercial next step"><List items={sector.metrics}/></Section><Section title="Relevant growth programs"><Cards items={programCards(growthPrograms.filter((item) => item.sectorId === sector.id))}/></Section></>;
  } else if (page.kind === 'niche') {
    const niche = growthNiches.find((item) => item.id === page.entityId)!;
    const sector = growthSectors.find((item) => item.id === niche.sectorId)!;
    const children = growthNiches.filter((item) => item.parentId === niche.id);
    const parent = niche.parentId ? growthNiches.find((item) => item.id === niche.parentId) : undefined;
    content = <><Section title="Start with the buyer’s question"><p>{niche.buyerQuestion}</p>{parent && <p>{parent.brief}</p>}<p>{sector.summary}</p></Section>{children.length > 0 && <Section title="Specialist areas"><Cards items={children.map((item) => ({ title: item.name, text: item.brief, href: getNichePath(item) }))}/></Section>}<Section title="Build the right evidence"><p>{niche.evidence}</p><List items={sector.proof}/></Section><Section title="From discovery to a useful inquiry"><List numbered items={[`Map the questions and comparisons relevant to ${niche.name.toLowerCase()}.`,'Review current technical access, page usefulness and brand accuracy.','Create a clear evaluation path with evidence a buyer can check.','Ask for the information sales needs to qualify the inquiry and agree the next step.']}/><p>Use AI search observations alongside conventional search, inquiry quality and sales feedback. A citation is not the same as a recommendation, and a visit is not the same as a qualified opportunity.</p></Section><Section title="Choose the work behind the outcome"><Cards items={pillarCards} two/></Section><Section title="Related industry context"><Cards items={[{ title: sector.name, text: sector.summary, href: `/growth/industries/${sector.slug}` }, ...(parent ? [{ title: parent.name, text: parent.brief, href: getNichePath(parent) }] : [])]}/></Section></>;
  } else if (page.kind === 'markets') content = <><div className={styles.stats}><div className={styles.stat}>{geographyCoverage.countries}<span>Country catalogs</span></div><div className={styles.stat}>{geographyCoverage.populatedPlaces.toLocaleString('en-US')}<span>GeoNames populated-place records</span></div><div className={styles.stat}>{geographyCoverage.administrativeAreas.toLocaleString('en-US')}<span>GeoNames administrative records</span></div></div><Section title="Choose a market"><Cards items={growthMarkets.map((item) => ({ title: item.name, text: item.planning, href: `/growth/markets/${item.slug}` }))}/></Section><Section title="Plan for the customer’s market"><p>A company’s headquarters, sales territory, buyer language and delivery footprint can be different. We keep those decisions separate so a cross-border program answers the right audience.</p><p>Country catalogs contain GeoNames populated-place and administrative records, without a population cutoff. Catalog coverage does not mean that every location has a dedicated campaign or local office.</p><p className={styles.note}>Geographical data: <a href="https://www.geonames.org/">GeoNames</a>, <a href={geographyManifest.license}>CC BY 4.0</a>; filtered and reformatted by Qognition. Source coverage may include historical entries and does not guarantee every real-world place is represented.</p></Section></>;
  else if (page.kind === 'market') {
    const market = growthMarkets.find((item) => item.id === page.entityId)!;
    const coverage = getCountryCoverage(market.code)!;
    content = <><Section title="Set the market brief"><p>{market.planning}</p><List numbered items={['Define headquarters, target customer market and actual service coverage.','Choose the buyer groups, language and commercial questions.','Confirm evidence, local terminology and delivery requirements.','Measure qualified inquiries by customer market and service.']}/></Section><Section title="Explore the geography"><p>Use the source catalog to research cities, towns and administrative areas. {coverage.catalogRecords.toLocaleString('en-US')} records are available for {market.name}.</p><Link className={styles.secondary} href={`/growth/markets/${market.slug}/places`}>Search the place catalog →</Link><p className={styles.note}>Example planning locations: {market.clusterExamples.join(', ')}. These are market references, not claims of Qognition offices.</p></Section><Section title="Relevant program briefs"><Cards items={programCards(growthPrograms.filter((item) => item.marketId === market.id))}/></Section><Section title="Choose the service for your objective"><Cards items={pillarCards} two/></Section></>;
  } else if (page.kind === 'programs') content = <Section title="A specific buyer, service and market"><Cards items={programCards()}/></Section>;
  else if (page.kind === 'program') content = <ProgramContent id={page.entityId!}/>;
  else if (page.kind === 'catalog') content = <CatalogContent id={page.entityId!} params={searchParams}/>;
  else if (page.kind === 'place') content = <PlaceContent entityId={page.entityId!}/>;

  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(growthStructuredData(page)).replace(/</g,'\\u003c') }}/>
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">{getGrowthBreadcrumbs(page).map((crumb,index,array) => <span key={crumb.path}>{index > 0 && <span aria-hidden="true"> / </span>}{index === array.length - 1 ? <span aria-current="page">{crumb.name}</span> : <Link href={crumb.path}>{crumb.name}</Link>}</span>)}</nav>
    <header className={styles.hero}><p className={styles.eyebrow}>{page.kind === 'program' ? 'Growth program brief' : 'Qognition / AI SEO & GEO for B2B'}</p><h1 className={styles.title}>{page.title}</h1><p className={styles.intro}>{page.description}</p>{page.kind !== 'catalog' && <Actions path={page.path}/>}</header>
    {content}
    {page.kind === 'pillar' && <SupportingCapabilities pillarId={page.entityId!}/>}
    {page.kind !== 'catalog' && <section className={styles.banner}><h2>Build around your next growth decision.</h2><p>Tell us what you sell, who you need to reach and where the current approach falls short. We will use the conversation to assess fit and define a useful next step.</p><Actions path={page.path}/></section>}
  </main>;
}
