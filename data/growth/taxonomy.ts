import type { GrowthNiche, GrowthSector } from './types';

export const growthSectors: GrowthSector[] = [
  { id: 'software', slug: 'b2b-software', name: 'B2B software & SaaS', summary: 'Connect product discovery to a serious evaluation, with content that explains fit, integrations and the cost of switching.', buyer: 'Marketing, growth and revenue leaders at companies selling considered software purchases.', proof: ['Product workflows and integration documentation', 'A specific implementation path and buying criteria', 'Customer evidence approved for the stated use case'], metrics: ['Qualified demos', 'Sales-accepted opportunities', 'Pipeline by product and use case'] },
  { id: 'industrial', slug: 'industrial-manufacturing', name: 'Industrial & manufacturing', summary: 'Make technical capabilities easier to find and assess, then give procurement and engineering teams a practical path to an RFQ.', buyer: 'Commercial directors, presidents and marketing teams at manufacturers, equipment suppliers and distributors.', proof: ['Capabilities, specifications and tolerances', 'Certifications with scope and current validity', 'Application evidence, service coverage and RFQ requirements'], metrics: ['Qualified RFQs', 'Engineering evaluations', 'Pipeline by application'] },
  { id: 'professional', slug: 'professional-services', name: 'Professional B2B services', summary: 'Turn specialist expertise into a clear reason to start a conversation, with precise service scope and credible expert-led content.', buyer: 'Managing partners, practice leaders and marketing directors at specialist firms.', proof: ['Named practitioner expertise and relevant credentials', 'Clearly bounded service scope and jurisdiction', 'Permissioned examples without confidential client detail'], metrics: ['Qualified consultations', 'Proposals by practice', 'Won engagement value'] },
  { id: 'cybersecurity', slug: 'cybersecurity', name: 'Cybersecurity', summary: 'Help security buyers assess coverage, operating responsibilities and implementation risk before they speak with sales.', buyer: 'Marketing and revenue leaders at security vendors, MSSPs and specialist consultancies.', proof: ['Documented coverage and exclusions', 'Deployment and escalation responsibilities', 'Verifiable independent assurance and technical evidence'], metrics: ['Qualified assessments', 'Technical evaluations', 'Sales-accepted pipeline'] },
  { id: 'logistics', slug: 'logistics-supply-chain', name: 'Logistics & supply chain', summary: 'Translate routes, operating capabilities and service limits into discoverable evidence for logistics buyers.', buyer: 'Commercial and marketing leaders at logistics providers and supply-chain technology companies.', proof: ['Lane and facility coverage', 'Handling requirements and operational service scope', 'Onboarding, escalation and integration information'], metrics: ['Qualified lane inquiries', 'Tender invitations', 'Contract pipeline'] },
  { id: 'compliance', slug: 'compliance-risk-govtech', name: 'Compliance, risk & GovTech', summary: 'Explain where a platform or advisory service fits a buyer’s controls, reporting obligations and procurement process.', buyer: 'Growth and commercial leaders in RegTech, GovTech, risk and compliance technology.', proof: ['Control and workflow mappings reviewed by an expert', 'Implementation responsibilities and limitations', 'Security, accessibility and procurement documentation'], metrics: ['Qualified evaluations', 'Stakeholder participation', 'Opportunity progression'] },
  { id: 'life-sciences', slug: 'life-sciences-biotech', name: 'Life sciences & biotech', summary: 'Make research capabilities, platform workflows and delivery requirements understandable without overstating scientific outcomes.', buyer: 'Business-development and marketing teams at CROs, research infrastructure providers and scientific software companies.', proof: ['Study, assay or platform capabilities', 'Scientific review and source attribution', 'Quality systems, data handling and project intake requirements'], metrics: ['Qualified study inquiries', 'Technical consultations', 'Proposal pipeline'] },
  { id: 'energy', slug: 'energy-mining', name: 'Energy & mining technology', summary: 'Connect complex infrastructure offers to the operational, commercial and technical questions that shape procurement.', buyer: 'Commercial leaders in EnergyTech, MiningTech and commercial renewables.', proof: ['Operating conditions and system specifications', 'Deployment dependencies and service responsibilities', 'Project economics with explicit assumptions'], metrics: ['Qualified project inquiries', 'Feasibility discussions', 'Sales-accepted project pipeline'] },
];

// Each row preserves a supplied category. Child entries have their own buyer
// question; repeated labels are aliases or cross-sector links, not new pages.
type Row = [string, string, string, string, string, string, Array<[string, string, string]>?];
const rows: Row[] = [
 ['software','cybersecurity-software','Cybersecurity SaaS','Security software evaluations depend on deployment fit, coverage and the effort required to operate the product.','What does the product protect, and who operates it?','Deployment diagrams, supported environments and bounded product claims.',[
  ['identity-access-software','Identity & access management software','Explain identity sources, provisioning, access review and supported authentication workflows.'],
  ['cloud-security-software','Cloud security software','Show supported cloud environments, detection coverage and how findings reach the people responsible for remediation.'],
  ['application-security-software','Application security software','Map testing or protection to the development lifecycle, supported languages and developer triage.'],
  ['data-security-software','Data security software','Describe data discovery, access governance and protection boundaries rather than implying universal coverage.']]],
 ['software','grc-compliance-software','GRC & compliance software','Compliance buyers need to understand which controls a platform supports and which responsibilities stay with their team.','Which evidence and control workflows can this platform support?','Control mappings, evidence collection workflows and qualified subject-matter review.',[
  ['soc-2-compliance-software','SOC 2 compliance software','Distinguish evidence management and readiness work from an independent auditor’s attestation.'],
  ['iso-compliance-software','ISO compliance software','Name the relevant standard and scope; show how policies, controls and evidence are maintained.'],
  ['hipaa-compliance-software','HIPAA compliance software','Explain the specific administrative or technical workflow supported without presenting software as a blanket compliance guarantee.'],
  ['esg-tracking-software','ESG tracking software','Clarify data collection, reporting boundaries, calculation methods and review responsibilities.']]],
 ['software','fintech-infrastructure','Fintech infrastructure & payments','Infrastructure marketing must make architecture, integration effort and operating responsibilities accessible to technical and commercial stakeholders.','How does this infrastructure fit our product and operating model?','Integration documentation, supported markets and clearly stated dependencies.',[
  ['banking-as-a-service','Banking-as-a-Service','Describe the partner model, product boundaries and allocation of operational responsibilities.'],
  ['core-banking','Core banking software','Explain migration, ledger integration and operational continuity considerations.'],
  ['payments-infrastructure','Payments infrastructure','Show payment flows, reconciliation, supported integrations and commercial assumptions.']]],
 ['software','hr-payroll-workforce','HR, payroll & workforce software','HR buyers compare the employees, locations and workflows a platform can support, along with the burden of migration.','Can this system support our workforce and reporting requirements?','Workflow examples, supported jurisdictions and migration documentation.',[
  ['hr-software','HR software','Show employee record, onboarding and reporting workflows relevant to the target organization.'],
  ['payroll-software','Payroll software','Specify supported payroll markets, integration responsibilities and review checkpoints.'],
  ['workforce-management','Workforce management software','Explain scheduling, time capture and operational reporting for the intended workforce.']]],
 ['software','revops-salestech','RevOps & SalesTech','Revenue teams need a clear picture of how a tool changes a selling workflow, rather than another dashboard claim.','Which sales decision becomes easier with this product?','CRM integration examples, data requirements and operating workflows.',[
  ['pipeline-analytics','Pipeline analytics','Connect reporting to concrete inspection decisions such as stage slippage, coverage and next actions.'],
  ['conversation-intelligence','Conversation intelligence','Explain capture, consent controls, review workflows and the intended coaching use case.']]],
 ['software','data-analytics','Data & analytics platforms','Analytics evaluation involves architecture, reliability and user adoption as well as the visible report.','How will data reach the people making decisions?','Architecture, lineage, governance and realistic implementation examples.',[
  ['data-mesh','Data mesh platforms','Clarify domain ownership, data contracts and governance responsibilities.'],
  ['etl','ETL & data integration','Show connectors, transformation workflows, refresh requirements and error handling.'],
  ['business-intelligence','Business intelligence','Explain the decisions and user roles a report supports, with transparent metric definitions.']]],
 ['software','developer-tools','Developer tools & DevOps','Developer-focused discovery needs working documentation and a credible adoption path, not only category-level claims.','How quickly can our team evaluate this in its own environment?','Documentation, supported stacks and realistic implementation examples.',[
  ['devops-infrastructure','DevOps infrastructure','Explain build, release and operating dependencies in a documented developer workflow.']]],
 ['software','procurement-spend','Procurement & spend management','Buying teams need to see how requests, supplier data and approvals move through an existing finance process.','Can this product fit our procurement controls and integrations?','Approval workflows, ERP integration scope and supplier onboarding examples.',[
  ['procurement-software','Procurement software','Describe requisition, sourcing and purchasing workflows with the responsible buyer roles.'],
  ['spend-management','Spend management software','Explain spend visibility, policy controls and the underlying data requirements.']]],
 ['software','supply-chain-software','Supply-chain software','Supply-chain platforms need a use-case-specific story that connects planning decisions to operational data.','Which operating decision will this platform improve?','Integration maps, supported workflows and implementation requirements.',[
  ['enterprise-supply-chain-platforms','Enterprise supply-chain platforms','Show how planning, execution and exception management connect across stakeholders.'],
  ['freight-management-software','Freight management software','Explain booking, visibility, rating and document workflows for the relevant transport modes.'],
  ['transportation-management','Transportation management software','Describe carrier selection, tendering, dispatch and freight audit requirements.'],
  ['warehouse-management','Warehouse management software','Explain receiving, inventory, picking and shipping workflows with hardware dependencies.'],
  ['fleet-management','Fleet management SaaS','Specify fleet types, telematics inputs and operational responsibilities.']]],
 ['software','legaltech','LegalTech','Legal software needs to demonstrate how sensitive documents and decisions move through a controlled workflow.','Can this product support our legal process and information controls?','Workflow demonstrations, security documentation and integration boundaries.',[
  ['contract-lifecycle-management','Contract lifecycle management','Show drafting, review, approval, signature and obligation tracking as distinct stages.'],
  ['e-discovery','E-discovery','Explain ingestion, review and production workflows with relevant handling limitations.'],
  ['ip-management-software','IP management software','Describe matter, portfolio and deadline management for the intended legal team.']]],
 ['software','constructiontech','ConstructionTech','Construction technology messaging should show the practical handoff between office planning and site execution.','How does this product fit the way our projects are delivered?','Project workflows, roles, supported integrations and deployment requirements.',[
  ['jobsite-management','Jobsite management','Explain field data capture, issue ownership and project reporting.'],
  ['bim-software','BIM software','Describe model coordination, supported formats and collaboration responsibilities.'],
  ['estimating-software','Estimating software','Explain quantity, cost and revision workflows and the assumptions behind estimates.']]],
 ['software','property-management','Property management & PropTech','Property technology buyers compare portfolios, operational workflows and financial integrations rather than a generic feature list.','Does this fit the property types and operating model we manage?','Portfolio-specific workflows, accounting integrations and onboarding detail.',[
  ['property-management-software','Property-management software','Show leasing, maintenance, reporting and financial workflows for the intended portfolio.'],
  ['proptech','PropTech','Explain the building or property workflow the technology changes and who owns deployment.']]],
 ['software','healthcare-administration','Healthcare administration & HealthTech','Administrative healthcare software needs clear workflow boundaries and careful treatment of sensitive information.','How does this fit our administrative process and data responsibilities?','Process diagrams, integration scope and qualified privacy/security review.',[
  ['healthcare-administration-saas','Healthcare administration SaaS','Describe administrative users, information flows and implementation dependencies.'],
  ['healthtech','HealthTech software','Bound the product’s intended use and distinguish operational functionality from clinical claims.']]],
 ['software','ai-infrastructure','AI infrastructure & software','AI infrastructure buyers need reproducible evaluation criteria, operating costs and clear boundaries around data handling.','Can we evaluate quality, cost and operating risk for our workload?','Architecture, workload assumptions and documented evaluation methods.',[
  ['mlops','Machine learning operations','Explain deployment, model monitoring, versioning and operational ownership.'],
  ['ai-software','AI software','Show a defined workflow and evaluation method instead of unsupported autonomous capability claims.']]],
 ['software','vertical-saas','Vertical SaaS','A vertical product earns consideration by explaining the details of the industry workflow it serves.','Does this understand our specialized process?','Industry-specific examples, terminology and implementation requirements.',[
  ['industry-erp','Industry-specific ERP','Map core finance and operations workflows to the target industry’s constraints.'],
  ['industry-workflow','Industry workflow software','Explain a specific handoff, approval or operational process in the customer’s language.']]],
 ['software','deeptech','DeepTech','DeepTech marketing must connect a technically defensible capability to a commercial evaluation a buyer can actually conduct.','What can we test, and what would a successful evaluation demonstrate?','Methodology, application boundaries and qualified technical review.'],
 ['industrial','industrial-equipment','Industrial equipment','Equipment buyers need a clear route from the intended application to a technically useful inquiry.','Can this equipment meet our application requirements?','Specifications, operating conditions and structured RFQ inputs.',[
  ['cnc-machinery','CNC machinery','Explain workpiece requirements, materials, tolerances and relevant machine capabilities.'],
  ['precision-equipment','Precision equipment','Document measurement or process requirements, tolerances and calibration considerations.']]],
 ['industrial','industrial-automation','Industrial automation & robotics','Automation content should explain the process being changed, integration dependencies and who owns commissioning.','Will this system fit our line, controls and operating environment?','Application diagrams, supported interfaces and commissioning responsibilities.',[
  ['automation-equipment','Automation equipment','Describe process inputs, outputs and interfaces with existing equipment.'],
  ['industrial-robotics','Industrial robotics','Explain payload, reach, environment and application-specific integration requirements.'],
  ['industrial-automation-suppliers','Industrial automation suppliers','Clarify supported control ecosystems, technical support and component availability.']]],
 ['industrial','fluid-motion-components','Pumps, valves, bearings & actuators','Component selection depends on the operating envelope and interfaces, not an undifferentiated catalog description.','Which specification determines whether this component fits?','Selection tables, materials and application-specific operating limits.',[
  ['pumps','Pumps','Help buyers specify flow, pressure, fluid compatibility and operating duty.'],
  ['valves','Valves','Explain pressure, temperature, material, actuation and connection requirements.'],
  ['bearings','Bearings','Document load, speed, lubrication and dimensional selection criteria.'],
  ['actuators','Actuators','Clarify force or torque, control interface, duty cycle and installation constraints.']]],
 ['industrial','electrical-components','Electrical components & distribution','Electrical buyers need usable specifications and clear supply/support boundaries to evaluate a component or distributor.','Can this supplier support the specification and supply requirements?','Product documentation, approvals with scope and ordering requirements.',[
  ['electrical-distributors','Electrical distributors','Explain product lines, service coverage, quotation requirements and technical support.']]],
 ['industrial','packaging-machinery','Packaging machinery & systems','Packaging buyers assess product format, throughput and integration with existing production.','Can this machinery handle our product and line requirements?','Format/changeover information, application examples and integration requirements.'],
 ['industrial','hvac-equipment','HVAC & industrial cooling','Commercial equipment pages should help engineers establish duty, environment and system compatibility.','Which system configuration suits this facility or process?','Performance conditions, selection parameters and support scope.'],
 ['industrial','water-treatment','Water & wastewater treatment','Treatment equipment needs application-specific context around feed conditions, process goals and ongoing operation.','What input conditions and treatment objectives define this project?','Process diagrams, input/output specifications and operating responsibilities.'],
 ['industrial','laboratory-equipment','Laboratory & analytical instrumentation','Laboratory equipment content should connect an instrument to the method, sample and operating workflow.','Is this instrument suitable for our method and sample requirements?','Method compatibility, performance conditions and support/calibration information.'],
 ['industrial','medical-equipment','Medical device & equipment manufacturing','Medical manufacturing inquiries require a clear statement of capabilities, intended scope and supplier qualification evidence.','Can this manufacturer meet our defined production requirements?','Capability scope, current certifications and controlled technical documentation.',[
  ['precision-medical-equipment','Precision medical equipment','Explain manufacturing capabilities, material requirements and verification processes without implying blanket approval.']]],
 ['industrial','construction-equipment','Construction & heavy equipment','Equipment selection depends on the job, terrain, duty and support requirements.','Does this equipment suit our project and operating conditions?','Operating specifications, maintenance requirements and support coverage.',[
  ['earthmoving-equipment','Heavy earthmoving equipment','Explain operating weight, capacity, site requirements and relevant attachments.']]],
 ['industrial','material-handling','Material-handling equipment','Handling systems need a practical picture of loads, movement, storage and system integration.','How will this system fit our flow of goods?','Layout requirements, load specifications and integration responsibilities.',[
  ['conveyors','Conveyors','Specify load, product dimensions, speed, environment and upstream/downstream interfaces.'],
  ['automated-warehousing','Automated warehousing equipment','Explain storage profiles, movement requirements and warehouse-system integration.']]],
 ['industrial','industrial-distributors','Industrial suppliers & distributors','Procurement teams need to determine range, technical support and fulfilment fit before sending a supplier inquiry.','Can this supplier meet our specification and procurement requirements?','Product range, service scope and a structured quotation process.',[
  ['industrial-components','Industrial components','Make component identification, interchange considerations and technical documentation easy to assess.']]],
 ['industrial','specialty-chemicals','Specialty chemicals & materials','Technical material selection requires application requirements and documented handling information.','Is this material suitable for our process and required properties?','Technical data, safety documentation and application limits.'],
 ['industrial','safety-equipment','Safety equipment & PPE','Safety procurement content should specify the intended application and evidence scope without presenting equipment as universal protection.','Which documented protection requirement does this product address?','Applicable product documentation, selection criteria and use limitations.',[
  ['ppe-distributors','PPE distributors','Explain product range, verified documentation and procurement support for specific workplace needs.']]],
 ['industrial','oem-components','OEM component suppliers','OEM buyers assess technical fit, production readiness and the ability to support a supplier qualification process.','Can this component supplier meet our design and production requirements?','Drawings, materials, quality-process scope and quotation inputs.'],
 ['industrial','precision-engineering','Precision engineering & tooling','Engineering procurement needs specific evidence of processes, materials and achievable requirements.','Which parts or tools are within your production capability?','Process and material capability, inspection scope and engineering intake.',[
  ['tooling','Tooling','Describe tool purpose, workpiece requirements and design-to-manufacture responsibilities.']]],
 ['industrial','contract-manufacturing','Contract manufacturing','Contract manufacturers need capability pages that make qualification easier for engineering, quality and procurement stakeholders.','Can this partner manufacture our product within the defined scope?','Production processes, quality systems and transfer requirements.',[
  ['electronics-manufacturing','Electronics manufacturing services','Explain board assembly, testing, sourcing and product-transfer requirements.']]],
 ['industrial','aerospace-defense','Aerospace & defense suppliers','Supplier content should make capability and qualification scope explicit without making unsupported program or certification claims.','What verified capabilities can this supplier contribute to our program?','Current qualification scope, processes and controlled inquiry procedures.',[
  ['aerospace-suppliers','Aerospace suppliers','Describe components, materials and manufacturing processes within the stated qualification scope.'],
  ['defense-suppliers','Defense suppliers','Explain production capabilities and inquiry handling without publishing restricted project detail.']]],
 ['industrial','renewable-manufacturing','Solar & renewable-energy manufacturing','Export-oriented renewable equipment content should clarify product specifications, application fit and commercial delivery boundaries.','Can this equipment supplier support our project requirements?','Technical documentation, certification scope and delivery responsibilities.',[
  ['solar-equipment','Solar equipment manufacturing','Distinguish component specifications, system compatibility and installation responsibilities.']]],
 ['industrial','ev-components','EV component manufacturing','EV supply-chain buyers need application-specific specifications and production qualification information.','Does this component meet our platform and manufacturing requirements?','Interface requirements, validation scope and production capability.'],
 ['industrial','white-label-electronics','White-label consumer electronics','B2B sourcing pages should explain customization, production scope and the buyer’s own compliance responsibilities.','What can be customized, manufactured and verified for our product?','Product options, testing scope and a clear manufacturing brief.'],
 ['professional','accounting-tax','Accounting, CPA & tax advisory','Specialist financial services need expertise-led content matched to a concrete business event and the relevant engagement scope.','Which team understands our transaction, reporting or tax issue?','Practitioner credentials, service boundaries and permissioned examples.',[
  ['corporate-tax','Corporate tax advisory','Explain the corporate event or recurring obligation addressed and the scope of professional review.'],
  ['international-tax','International tax','Identify the cross-border business issue and jurisdictions involved without giving generic tax conclusions.'],
  ['transfer-pricing','Transfer pricing','Explain documentation, policy and review work for intercompany transactions.'],
  ['ma-accounting','M&A accounting & transaction services','Describe transaction accounting, due-diligence scope and the required financial inputs.'],
  ['fractional-cfo','CFO & fractional CFO services','Define decision support, reporting cadence and the division of finance responsibilities.'],
  ['outsourced-accounting','Outsourced accounting','Explain reporting, close and control workflows along with handoff requirements.'],
  ['tax-advisory','Tax advisory','Bound the advisory scope to the business issue and responsible qualified professional.'],
  ['audit-compliance','Specialized audit & compliance','Identify assurance or review scope and distinguish it from ongoing advisory support.']]],
 ['professional','business-law','Business law','Business legal practices need jurisdiction-aware pages that explain matter fit and the people responsible for delivery.','Is this practice experienced in the type of matter we need to address?','Practitioner biographies, jurisdiction and accurate matter descriptions.',[
  ['corporate-law','Corporate law','Explain entity, governance and commercial advisory scope for business clients.'],
  ['ma-law','M&A law','Describe transaction stages, counsel responsibilities and the typical matter intake.'],
  ['employment-law','Employment & labor law','Explain employer-side matter types and jurisdiction-specific professional review.'],
  ['corporate-immigration','Corporate immigration law','Describe employer-sponsored and mobility services without promising immigration outcomes.'],
  ['tax-law','Tax law & controversy','Explain advisory or dispute scope and the records needed to assess a matter.'],
  ['technology-privacy-law','Technology & data privacy law','Connect legal support to transactions, data practices and operational decisions.'],
  ['intellectual-property','Intellectual property & patents','Distinguish portfolio strategy, patent prosecution and dispute support.'],
  ['regulatory-law','Regulatory & compliance counsel','Identify the regulated activity and the boundaries of the legal service.']]],
 ['professional','management-consulting','Management consulting','Consulting content earns attention when it names the decision, organizational constraint and delivery method.','What decision or operating change will this engagement support?','Method, deliverables and appropriately scoped engagement examples.'],
 ['professional','cybersecurity-consulting','Cybersecurity & risk advisory','Advisory positioning should distinguish assessment, recommendations and implementation responsibilities.','What will this engagement assess and what happens after the findings?','Assessment scope, methodology and practitioner expertise.'],
 ['professional','it-consulting','IT consulting & services','Technical service buyers need clear operating scope, delivery dependencies and transition responsibilities.','Which parts of our technology environment will this team own or support?','Architecture examples, service boundaries and transition plans.',[
  ['it-strategy','IT strategy & infrastructure','Connect technology recommendations to architecture, operations and a practical delivery roadmap.'],
  ['bespoke-it','Bespoke IT services','Describe the development or engineering scope and how requirements become accepted work.'],
  ['it-outsourcing','IT outsourcing','Define team responsibilities, handoffs, service scope and governance.']]],
 ['professional','erp-consulting','ERP consulting & integration','ERP marketing should explain the workflows, integration boundaries and migration responsibilities in an implementation.','Does this partner understand our process and ERP environment?','Relevant implementation scope, migration approach and verifiable partner status.',[
  ['sap-partners','SAP consultancies','Explain the SAP products, functional processes and delivery responsibilities supported.'],
  ['oracle-partners','Oracle consultancies','Specify the Oracle environment, integration scope and project dependencies.'],
  ['netsuite-partners','NetSuite consultancies','Show the finance or operations workflows and migration requirements addressed.']]],
 ['professional','crm-consulting','CRM & Salesforce consulting','CRM projects need an operating-process story before a configuration story.','Can this partner improve our revenue workflow and data reliability?','Process maps, integration scope and reporting definitions.',[
  ['salesforce-consultancies','Salesforce consultancies','Specify supported clouds, integration requirements and ownership after implementation.']]],
 ['professional','microsoft-partners','Microsoft consultancies','Microsoft ecosystem buyers need product-specific delivery scope and accurate descriptions of partner capabilities.','Which Microsoft products and operating workflows can this team support?','Documented expertise, project boundaries and verifiable credentials.'],
 ['professional','cloud-consulting','Cloud consulting & migration','Cloud-service pages should explain workload fit, migration dependencies and responsibility after deployment.','What needs to change before this workload can move or scale?','Architecture, migration plan and operating responsibility matrix.',[
  ['cloud-migration','Cloud migration','Describe discovery, migration waves, validation and rollback planning.'],
  ['cloud-architecture','Cloud architecture','Explain workload, reliability, security and operating-cost tradeoffs.']]],
 ['professional','ai-consulting','AI consulting & transformation','AI engagements need a bounded business workflow and a way to evaluate usefulness before wider rollout.','Which workflow can be tested and what would count as success?','Evaluation method, data requirements and human review responsibilities.'],
 ['cybersecurity','managed-security','Managed security services','Security service content should make monitoring coverage, response ownership and escalation responsibilities easy to compare.','Who detects, triages and responds to the events we care about?','Coverage matrix, onboarding requirements and escalation process.',[
  ['mssp','Managed Security Service Providers','Explain the systems monitored, service boundaries and customer responsibilities.'],
  ['mdr','Managed Detection & Response','Distinguish detection, investigation and response actions with clear authorization boundaries.'],
  ['soc-as-a-service','SOC-as-a-Service','Explain monitoring scope, handoffs and the service’s role within the customer’s security operation.']]],
 ['cybersecurity','security-specialists','Specialist security services','A specialist security page should define the environment, evidence and deliverables included in an engagement.','Does this service address our specific security environment?','Technical scope, methods and clear exclusions.',[
  ['iam-services','Identity & access management services','Explain identity architecture, access governance and implementation responsibilities.'],
  ['cloud-security-services','Cloud & infrastructure security services','Bound review or implementation work to the agreed environments and controls.'],
  ['application-security-services','Application security services','Describe the application lifecycle, assessment scope and remediation handoff.'],
  ['data-security-services','Data security services','Explain data discovery, access review and protection implementation scope.'],
  ['security-awareness','Security awareness training','Describe the audience, training objectives and appropriate outcome measurement.'],
  ['penetration-testing','Penetration testing','State authorized scope, methodology, reporting and retest expectations.'],
  ['vulnerability-assessment','Vulnerability assessment','Explain asset coverage, validation, prioritization and remediation responsibilities.']]],
 ['logistics','freight-forwarding','Freight forwarding','Forwarding pages should help shippers determine mode, lane and shipment fit before requesting a quote.','Can this provider handle our cargo and shipping lane?','Lane coverage, cargo requirements and quotation inputs.',[
  ['air-freight','Air freight','Explain cargo, timing and handling requirements for an air-freight inquiry.'],
  ['ocean-freight','Ocean freight','Distinguish shipment size, container requirements and port-to-door responsibilities.'],
  ['rail-freight','Rail freight','Clarify route availability, intermodal handoffs and cargo restrictions.']]],
 ['logistics','third-party-logistics','3PL services','3PL buyers assess inventory, fulfilment and service integration alongside capacity and price.','Can this provider support our inventory and fulfilment requirements?','Facility and handling capabilities, integration scope and onboarding process.'],
 ['logistics','fourth-party-logistics','4PL services','4PL positioning should explain governance across providers and the decisions managed on the customer’s behalf.','Which parts of our logistics network will this team coordinate?','Operating model, provider interfaces and accountability.'],
 ['logistics','cold-chain','Cold-chain logistics','Temperature-controlled logistics requires a precise account of the shipment conditions and handling scope.','Can this provider meet our defined handling and temperature requirements?','Handling processes, monitoring responsibilities and incident procedures.',[
  ['pharmaceutical-logistics','Pharmaceutical cold chain','Specify shipment qualification, temperature requirements and quality-review responsibilities.'],
  ['food-cold-chain','Food cold chain','Explain product handling, temperature management and receiving/delivery requirements.']]],
 ['logistics','warehousing','Warehousing & contract logistics','Warehouse buyers need to compare the goods handled, operational workflows and integration requirements.','Can this facility and operating model support our inventory?','Storage conditions, goods profiles, workflows and service boundaries.'],
 ['logistics','customs-brokerage','Customs brokerage','Brokerage pages should clarify shipment context, documentation and the scope of professional assistance.','What records and responsibilities are required for this shipment?','Service jurisdiction, document requirements and escalation process.'],
 ['logistics','global-logistics','Global logistics','Cross-border logistics marketing should make the end-to-end responsibility chain clear.','Where do responsibility and information pass between providers?','Lane-specific operating scope, documentation and partner handoffs.'],
 ['logistics','industrial-transportation','Industrial & heavy transportation','Industrial transport inquiries need cargo characteristics and route feasibility before a useful quotation can be produced.','What does this load require for safe and feasible transport planning?','Dimensions, handling requirements and route-planning inputs.'],
 ['logistics','energy-logistics','Energy logistics','Energy-sector shipments require project-specific planning around equipment, sites and delivery dependencies.','How will logistics fit the project schedule and equipment requirements?','Cargo specifications, site interfaces and project responsibility boundaries.'],
 ['compliance','regtech','RegTech & financial compliance','Financial compliance software needs an explicit description of the activity supported and the controls left with the customer.','Which regulated workflow does this product support?','Control mappings, implementation detail and qualified review.'],
 ['compliance','esg-technology','ESG technology','ESG tools need transparent data boundaries and reporting methods to support a credible evaluation.','Where does the reported information come from and how is it reviewed?','Data lineage, calculation assumptions and review workflows.'],
 ['compliance','risk-management','Risk-management platforms','Risk platforms should show how information becomes a decision, owner and follow-up action.','How does this system help us identify and act on risk?','Risk taxonomy, ownership workflows and reporting examples.'],
 ['compliance','govtech','GovTech & public-sector software','Public-sector software pages need procurement-ready information and a clear account of the public-service workflow.','Can this product fit our procurement and service-delivery requirements?','Accessibility, security, integration and implementation documentation.'],
 ['life-sciences','contract-research','Contract Research Organizations','Research service marketing needs clear capability scope and a scientifically reviewed path from study question to project inquiry.','Can this organization support the study we need to conduct?','Study capabilities, quality systems and project intake requirements.'],
 ['life-sciences','biotech-infrastructure','Biotech infrastructure & tooling','Research infrastructure content should explain the scientific workflow and operating dependencies it supports.','Does this infrastructure fit our research process and operating requirements?','Platform capabilities, sample or data requirements and technical support.',[
  ['lab-platforms','Biotech lab platforms','Explain supported workflows, required inputs and the boundaries of platform capabilities.']]],
 ['life-sciences','clinical-trial-technology','Clinical-trial technology','Trial technology buyers need a clear understanding of users, workflows and information handling.','How does this tool support the trial workflow and data responsibilities?','Workflow documentation, validation scope and qualified review.'],
 ['life-sciences','lab-informatics','Lab informatics & scientific software','Scientific software must connect data handling to the methods and review processes used by researchers.','Can this system preserve the information our scientific process depends on?','Data models, interoperability, auditability and user workflows.'],
 ['energy','energytech','EnergyTech','Energy technology buyers need a defined operating use case and transparent assumptions about deployment.','What changes in the operation when this system is deployed?','System requirements, interfaces and practical evaluation criteria.'],
 ['energy','miningtech','Mining technology','Mining technology content should distinguish site conditions, equipment interfaces and operational responsibilities.','Will this technology fit our site and operating environment?','Site requirements, deployment scope and evaluation criteria.'],
 ['energy','commercial-renewables','Commercial renewables','Commercial renewable projects need usable information on project fit, delivery scope and economic assumptions.','What inputs determine whether this project is worth evaluating?','Site requirements, project scope and explicit financial assumptions.'],
];

const aliasMap: Record<string, string[]> = {
  'transportation-management': ['TMS', 'Transportation management software'], 'warehouse-management': ['WMS'],
  'grc-compliance-software': ['GRC platforms', 'Compliance platforms', 'GRC / compliance SaaS'],
  'cybersecurity-software': ['Cybersecurity SaaS'], 'identity-access-software': ['IAM software'],
  'managed-security': ['Cybersecurity & managed services'], 'mssp': ['MSSPs', 'Managed Security Service Providers'],
  'mdr': ['MDR providers'], 'mlops': ['MLOps', 'AI infrastructure/software'],
  'fractional-cfo': ['CFO services', 'Fractional CFO & advisory services'],
  'contract-research': ['CROs', 'Contract Research Organizations (CROs)'],
  'electronics-manufacturing': ['EMS', 'Electronics manufacturing'],
  'property-management': ['Property-management software', 'PropTech software'],
  'industrial-robotics': ['Robotics'], 'water-treatment': ['Water-treatment equipment'],
  'hvac-equipment': ['HVAC equipment', 'Industrial cooling equipment'],
  'lab-informatics': ['Scientific software', 'Lab informatics'],
  'third-party-logistics': ['3PL', 'Third-party logistics'], 'fourth-party-logistics': ['4PL', 'Fourth-party logistics'],
  'bim-software': ['BIM'], 'erp-consulting': ['ERP systems integration'], 'business-intelligence': ['BI'],
  'white-label-electronics': ['White-label consumer electronics'], 'miningtech': ['Mining-Tech'],
};
const crossSectors: Record<string, string[]> = {
  'cybersecurity-software': ['cybersecurity'], 'grc-compliance-software': ['compliance','cybersecurity'],
  'supply-chain-software': ['logistics'], 'cybersecurity-consulting': ['cybersecurity'],
  'laboratory-equipment': ['life-sciences'], 'medical-equipment': ['life-sciences'],
  'renewable-manufacturing': ['energy'], 'ev-components': ['energy'], 'energy-logistics': ['energy'],
};

export const growthNiches: GrowthNiche[] = rows.flatMap(([sectorId, slug, name, brief, buyerQuestion, evidence, children]) => {
  const primary: GrowthNiche = { id: slug, slug, name, sectorId, aliases: aliasMap[slug] || [], brief, buyerQuestion, evidence, relatedSectorIds: crossSectors[slug] || [] };
  return [primary, ...(children || []).map(([childSlug, childName, focus]) => ({
    id: childSlug, slug: childSlug, name: childName, sectorId, parentId: slug,
    aliases: aliasMap[childSlug] || [], brief: focus,
    buyerQuestion: `What should a buyer verify when evaluating ${childName.toLowerCase()}?`,
    evidence: `${focus} Support the explanation with current first-party documentation and an expert-reviewed example.`,
    relatedSectorIds: crossSectors[slug] || [],
  }))];
});

export function getNichePath(niche: GrowthNiche): string {
  const sector = growthSectors.find((item) => item.id === niche.sectorId)!;
  return `/growth/industries/${sector.slug}/${niche.parentId ? `${niche.parentId}/` : ''}${niche.slug}`;
}
export function getSectorNiches(sectorId: string, includeCrossLinks = true) {
  return growthNiches.filter((niche) => !niche.parentId && (niche.sectorId === sectorId || (includeCrossLinks && niche.relatedSectorIds.includes(sectorId))));
}
