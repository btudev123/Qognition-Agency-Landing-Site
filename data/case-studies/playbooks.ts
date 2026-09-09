import type { Niche, Playbook, ServiceKey } from './types';

/**
 * Shared engagement playbooks, keyed by niche × service.
 *
 * The execution is deliberately consistent within a niche and service — that is the point of
 * running a playbook rather than improvising per account. What differs per client is the
 * diagnosis and the starting position, which live on the individual record.
 *
 * Every statistic quoted in this file resolves to a row in `benchmarks.ts` with a live source URL.
 */

const key = (niche: Niche, service: ServiceKey) => `${niche}:${service}`;

export const PLAYBOOKS: Record<string, Playbook> = {
  // ── HVAC ───────────────────────────────────────────────────────────────────
  [key('hvac', 'ppc')]: {
    niche: 'hvac',
    service: 'ppc',
    strategy:
      'Stop reporting one blended cost per lead. Separate branded from non-branded, add Local Services Ads underneath search, and optimise to booked jobs instead of form fills.',
    whatWeDid: [
      'Split branded and non-branded into separate campaigns so a $34 branded CPL stops flattering the $149 non-branded number.',
      'Rebuilt the negative keyword list from a search-terms audit — 25% of Google Ads accounts have never added a single negative, and accounts that use them convert at 13.0% against 4.6%.',
      'Stood up Local Services Ads alongside paid search, where HVAC leads run $51 against $149 non-branded and book at 44.0% on a $2,110 average ticket.',
      "Rebuilt ad scheduling and geo bids around dual-peak seasonality — 'AC repair' runs +266% in July and 'furnace repair' +137% in January, so one flat annual bid overpays in shoulder months and under-buys the peak.",
      'Installed call tracking with recording and a missed-call text-back: home services answers 52% of inbound calls and 55% of businesses never ask the caller to book.',
      'Moved reporting to cost per booked job and revenue per job, because the average repair ticket is now $1,205 and lead count does not pay for anything.',
    ],
    phases: [
      {
        window: 'Days 0–14',
        work: 'Audit, conversion tracking rebuilt, negative keyword purge, campaign restructure by intent and line.',
      },
      {
        window: 'Days 15–45',
        work: 'Landing pages shipped, Local Services Ads or quote path live, call tracking and missed-call recovery in place.',
      },
      {
        window: 'Days 46–90',
        work: 'Budget reallocated on booked-job data rather than lead data; bid strategy set against seasonality.',
      },
    ],
    objections: ['We already run Google Ads and the leads are expensive.'],
    proofAssets: [
      'Google Ads change history export',
      'Search terms report, before and after',
      'LSA lead log with dispute credits',
      'Call recordings with booking outcome tagging',
      'CRM booked-job export matched to click ID',
    ],
  },

  [key('hvac', 'ai-seo')]: {
    niche: 'hvac',
    service: 'ai-seo',
    strategy:
      'Win the Local Pack first — it is still 93% of local-intent queries — then attack AI citation off-site, where 77% of it actually comes from.',
    whatWeDid: [
      'Built the service × city page grid properly: local-intent queries return a Local Pack 93% of the time and trigger an AI Overview only about 15% of the time, so this is a Local Pack fight, not an AI Overview panic.',
      'Rebuilt the Google Business Profile against the four factors that actually move the pack — primary category, proximity, keywords in the business title, address in the search city.',
      'Ran a citation baseline through Scriblr across ChatGPT, Gemini, Perplexity and AI Overviews on a fixed 40-prompt non-branded set, then tracked mention rate weekly.',
      'Went after off-site mentions through LinkersPro, because 77% of AI citations on branded queries come from off-page sources and branded web mentions correlate with AI visibility at 0.664 against 0.218 for backlinks.',
      "Installed a review engine: 47% of consumers won't use a business under 20 reviews, 68% now require 4+ stars, 74% want reviews from the last three months, and 80% are more likely to use a business that answers all of them.",
      'Skipped the schema-and-llms.txt theatre — a controlled test on 1,885 pages found JSON-LD produced no citation lift, and 97% of llms.txt files are never requested.',
    ],
    phases: [
      {
        window: 'Days 0–30',
        work: 'Citation baseline across four assistants, GBP rebuild, page architecture and entity cleanup.',
      },
      {
        window: 'Days 31–90',
        work: 'Service × city page grid shipped, review engine live, first off-site mention wave.',
      },
      {
        window: 'Days 91–180',
        work: 'Mention velocity sustained, citation rate compounds, freshness cycle running on service and city pages.',
      },
    ],
    objections: ['Is AI search actually sending anyone? Nobody has proved it.'],
    proofAssets: [
      'Scriblr prompt-set baseline and current export',
      'Local grid rank screenshots',
      'GBP insights export',
      'Review velocity chart',
      'Third-party mention log with live URLs',
    ],
  },

  [key('hvac', 'social')]: {
    niche: 'hvac',
    service: 'social',
    strategy:
      'Paid social does not buy emergency HVAC demand. It buys the maintenance plan, the replacement consideration and the recruiting pipeline — and it feeds proof back into search.',
    whatWeDid: [
      'Reframed social away from lead generation, because nobody scrolls Instagram into an emergency AC call — demand there is captured on search, not created on feed.',
      'Built the content system around the two things social can actually move: maintenance plan enrolment and planned replacement consideration, both of which have long decision windows.',
      'Ran a technician-led short-form cadence — real crews, real jobs, real diagnostics — which is the format that produces the third-party mention base AI citation depends on.',
    ],
    phases: [
      { window: 'Days 0–30', work: 'Channel audit, content system built, technician-led cadence set.' },
      { window: 'Days 31–90', work: 'Maintenance plan and replacement offers running; enrolment tagged to source.' },
      { window: 'Days 91–180', work: 'Mention base compounds into branded search volume and AI citation.' },
    ],
    objections: ["Social media doesn't work for contractors."],
    proofAssets: [
      'Meta Ads Manager export',
      'Plan enrolment log with source tagging',
      'Branded search volume trend from Search Console',
      'Content calendar with published URLs',
    ],
  },

  // ── Dental ─────────────────────────────────────────────────────────────────
  [key('dental', 'ppc')]: {
    niche: 'dental',
    service: 'ppc',
    strategy:
      'The dental ad account is rarely the problem. The phone is. Buy intent correctly, then fix the call path that loses a third of it.',
    whatWeDid: [
      'Split campaigns by intent tier, because emergency ($75.19 CPL, 8.89% conversion), general ($84.77, 7.74%) and orthodontic ($71.52, 14.21%) demand behave nothing alike and should never share a budget.',
      'Rebuilt landing pages per treatment against the 10.67% category conversion benchmark, with insurance and financing answered above the fold.',
      'Then fixed the leak that costs more than the entire ad account: 30–38% of practice calls go unanswered during business hours, and 60–65% of those are new-patient calls.',
      'Installed call tracking, recording and a missed-call text-back, and scored every call — call-to-appointment sits at 55% industry-wide against a 72% top decile.',
      'Built a same-week appointment offer into the ads, because top-decile practices seat new patients in 4.5 days against a 25-day average and speed-to-seat is the conversion lever nobody bids on.',
      'Moved reporting to cost per booked new patient against a $850–$1,300 first-year production value.',
    ],
    phases: [
      {
        window: 'Days 0–14',
        work: 'Audit, conversion tracking rebuilt, negative keyword purge, campaign restructure by intent tier.',
      },
      {
        window: 'Days 15–45',
        work: 'Treatment landing pages shipped, call tracking and missed-call recovery in place.',
      },
      {
        window: 'Days 46–90',
        work: 'Budget reallocated on booked-patient data rather than lead data; same-week seating offer live.',
      },
    ],
    objections: ['We tried Google Ads and got price shoppers.'],
    proofAssets: [
      'Google Ads export by campaign tier',
      'Call recordings with booking outcome scored',
      'Practice management new-patient export matched to source',
      'Appointment lead-time report',
    ],
  },

  [key('dental', 'ai-seo')]: {
    niche: 'dental',
    service: 'ai-seo',
    strategy:
      'Local health queries only return an AI Overview about 11% of the time. The AI risk to a practice is at discovery, not on the SERP — 47% of patients now research providers with AI and 36% say it changed their choice.',
    whatWeDid: [
      'Built page depth against the questions patients actually ask, not the treatments the practice sells — symptoms and decisions, because that is what gets cited.',
      'Held the Local Pack with a proper GBP rebuild: local health queries return an AI Overview only about 11% of the time against 93% for conditions and symptoms, so the money keywords are still a pack fight.',
      "Ran the Scriblr citation baseline across ChatGPT, Gemini, Perplexity and AI Overviews on the practice's real patient-question set, tracked weekly.",
      'Built review architecture as an AI input, not a vanity metric — 75% of patients refuse to book below 4.0 stars, 44% require 4.5+, and 55% have cancelled or avoided an appointment over reviews.',
      "Went after third-party mentions through LinkersPro, because 77% of AI citations come from sources that are not the practice's own website and 84% trace to earned media.",
      'Kept every clinical page current, since AI-cited content runs 25.7% fresher than the organic top ten.',
    ],
    phases: [
      {
        window: 'Days 0–30',
        work: 'Citation baseline across four assistants, GBP rebuild, page architecture and entity cleanup.',
      },
      {
        window: 'Days 31–90',
        work: 'Symptom and decision content shipped, review engine live, first off-site mention wave.',
      },
      {
        window: 'Days 91–180',
        work: 'Mention velocity sustained, citation rate compounds, freshness cycle running on clinical and service pages.',
      },
    ],
    objections: ["Patients find us by referral. Search doesn't matter for dentistry."],
    proofAssets: [
      'Scriblr prompt-set exports, before and after',
      'Local grid screenshots',
      'GBP insights',
      'Review dashboard',
      'Mention log with live third-party URLs',
    ],
  },

  [key('dental', 'social')]: {
    niche: 'dental',
    service: 'social',
    strategy:
      'Dental is the most expensive industry on Meta — $9.78 CPC and $76.71 CPL against a $1.92 / $27.66 average. So social does not run as a lead channel here. It runs as the proof engine feeding search.',
    whatWeDid: [
      'Stopped treating paid social as lead generation: dental carries the highest CPC of any industry on Meta at $9.78, roughly five times the cross-industry average, and the same money buys far more booked patients in search.',
      'Rebuilt social as the proof layer — cases, outcomes, team, technology — so the trust work happens before the search click, not after it.',
      'Ran a Reels-first cadence against the 1.8% health and wellness Instagram engagement benchmark, with static reserved for reach.',
    ],
    phases: [
      { window: 'Days 0–30', work: 'Channel audit, proof-layer content system built, photo authorisations collected.' },
      { window: 'Days 31–90', work: 'Reels-first cadence running; consultation log tagged to social source.' },
      { window: 'Days 91–180', work: 'Proof base compounds into branded search and consultation conversion.' },
    ],
    objections: ["Our competitor posts constantly and it looks like it's working."],
    proofAssets: [
      'Meta Ads Manager export',
      'Signed patient photo authorisations on file',
      'Engagement rate report vs category benchmark',
      'Consultation log with source attribution',
    ],
  },

  // ── Insurance ──────────────────────────────────────────────────────────────
  [key('insurance', 'ai-seo')]: {
    niche: 'insurance',
    service: 'ai-seo',
    strategy:
      'Two different fights. Local-intent insurance queries return a Local Pack 92–96% of the time. Commercial queries return an AI Overview about 63% of the time. One is a profile problem, the other is a citation problem.',
    whatWeDid: [
      'Separated the two battles, because they need opposite tactics: personal and local lines are won in the Local Pack, commercial lines are won in AI citations.',
      'Built line-level and city-level pages for the local book, and rebuilt the Google Business Profile against category, proximity, title and address-in-city.',
      'For the commercial book, went after earned mentions through LinkersPro — 84% of AI citations trace to earned media and branded web mentions out-correlate backlinks 0.664 to 0.218.',
      'Ran the Scriblr baseline across ChatGPT, Gemini, Perplexity and AI Overviews against a 22% category median and 44% top quartile mention rate.',
      'Built out carrier appointments, licensing footprint and named specialisms as structured, citable facts — an assistant recommending an agency names carriers and coverage areas, and cannot cite what is not stated.',
      'Wrote answer content for the categories buyers actually ask about — bonds, workers comp, coverage limits, claims process — where 29% of customers now bring AI into the journey and 42% of those go on to purchase.',
    ],
    phases: [
      {
        window: 'Days 0–30',
        work: 'Citation baseline across four assistants, GBP rebuild, page architecture and entity cleanup.',
      },
      {
        window: 'Days 31–90',
        work: 'Line × city page grid shipped, carrier and licensing facts structured, first earned-mention wave.',
      },
      {
        window: 'Days 91–180',
        work: 'Mention velocity sustained, citation rate compounds, freshness cycle running on line and city pages.',
      },
    ],
    objections: ['Nobody searches for an insurance agent. They go to the comparison sites.'],
    proofAssets: [
      'Scriblr prompt-set exports',
      'Local grid screenshots',
      'GBP insights',
      'Mention log with live URLs',
      'Quote-request source report',
    ],
  },

  [key('insurance', 'ppc')]: {
    niche: 'insurance',
    service: 'ppc',
    strategy:
      'Insurance search has the highest click-through rate of any vertical at 9.83% and nearly the lowest conversion at 2.64%. The money leaks after the click. So the work goes into the quote path, not the ad.',
    whatWeDid: [
      'Diagnosed the structural problem first: insurance earns clicks better than any other vertical and converts them worse than almost all of them, which means bidding harder makes it worse, not better.',
      'Rebuilt the quote path, where 84% of insurance forms are abandoned — cut the form to what actually binds, added progressive disclosure, and put a call fallback on every step.',
      'Split campaigns by line of business, because a commercial general liability search and an SR22 search share nothing except the word insurance and have entirely different economics.',
      'Built speed-to-first-contact into the routing: shoppers now pull 3.5 quotes each, an all-time high, and 48% of new policies are bought online — whoever responds first is usually the one who binds.',
      'Moved reporting to cost per bound policy against a ~$900 independent-agent acquisition benchmark, and set the payback window against 92% median retention rather than first-year commission alone.',
    ],
    phases: [
      {
        window: 'Days 0–14',
        work: 'Audit, conversion tracking rebuilt, negative keyword purge, campaign restructure by line of business.',
      },
      {
        window: 'Days 15–45',
        work: 'Quote path rebuilt, progressive disclosure live, speed-to-lead routing in place.',
      },
      {
        window: 'Days 46–90',
        work: 'Budget reallocated on bound-policy data rather than quote-request data.',
      },
    ],
    objections: ['Insurance leads are expensive and they never close.'],
    proofAssets: [
      'Google Ads export by line',
      'Form analytics funnel, before and after',
      'AMS bound-policy export matched to source',
      'First-response time log',
    ],
  },

  [key('insurance', 'social')]: {
    niche: 'insurance',
    service: 'social',
    strategy:
      'Social does not sell policies. It builds the local entity — the mention base, the review flow and the named-agent recognition that both the Local Pack and AI assistants read.',
    whatWeDid: [
      'Set the objective honestly: social is not a quote channel for an independent agency, it is an entity-building channel that makes the other two work.',
      'Built agent-led content — named people, local presence, community involvement — because assistants cite named humans and local recognition, and a logo posts nothing worth citing.',
      'Ran review generation off the back of every bind and every claim resolved well, feeding the profile signal that drives local pack position.',
    ],
    phases: [
      { window: 'Days 0–30', work: 'Channel audit, agent-led content system built, review request automation wired.' },
      { window: 'Days 31–90', work: 'Cadence running; review velocity and community mentions tracked.' },
      { window: 'Days 91–180', work: 'Entity signal compounds into Local Pack position and AI citation.' },
    ],
    objections: ["Our clients aren't on social media."],
    proofAssets: [
      'Review dashboard export',
      'AMS policies-per-household report',
      'Retention cohort report',
      'Community mention log with URLs',
    ],
  },
};

export const getPlaybook = (niche: Niche, service: ServiceKey): Playbook | undefined =>
  PLAYBOOKS[key(niche, service)];

export const getPlaybooks = (niche: Niche, services: readonly ServiceKey[]): Playbook[] =>
  services.map((s) => getPlaybook(niche, s)).filter((p): p is Playbook => Boolean(p));
