# B2B PPC `/services/ppc` · copy v1

**Author:** Theo (content) · 2026-10-07 · plan step 2.7
**Status:** DRAFT. Ruth gates, then Mira wires. No `.tsx` edited. Marcus checks every method claim, because they describe his work.
**Data:** `data/services.ts`, entry `"id": "ppc"` (line 652). Shared template strings: `services-template.md`.
**Objection codes:** Marcus `03` §5.1 (C1 to C7) and §5.2 (M1 to M6).

---

## Brief

1. **Search intent.** Paid ad group 2B (`b2b ppc agency`, `b2b ppc management`, `b2b google ads agency`) and organic "PPC agency, paid media management" (Nadia §3.1 row 5). The reader has an ad account that produces form fills sales won't call back. They want someone who judges campaigns on meetings.
2. **AI-citation angle.** Nadia §4.1: "How is B2B PPC judged if not on clicks?" 40 to 60 words, no number.
3. **Internal links.** Out: `/services/ppc/google-ads-management`, `/services/ppc/linkedin-ads`, `/services/ppc/landing-page-cro`, `/services/cro-analytics`, `/services/ai-seo`. In: `/services` grid card 03, `/` FAQ 7, `/pricing`.
4. **The one claim this page owns.** B2B PPC is judged on qualified enquiries and booked meetings, and a firm that wants only PPC is a full client.

---

## Audit of the current page

| | |
|---|---|
| What it says now | H1 (Nadia, final) "B2B PPC and Paid Media Management". Lead: buyer, landing page, lead quality, "scoped separately". Good KPIs. Two deep-dives. Sixteen sub-services. Four FAQs |
| Positioning | The lead is right. The capability grid is half consumer: Google Shopping, Amazon Ads, TikTok Ads, Connected TV, Feed Management, "ROAS" on Google Search Ads, "win the retail shelf" |
| Objections not answered | C3, C7, M6 only via "scoped separately", "Do you need our accounts?" not asked |
| §1 / §4 issues | `CLAUDE.md` §2 lists "low-ticket transactional" as not a fit, and the grid sells to it. "Paid Media Analytics" says click ID capture and offline import "are set up during the engagement". Marcus (`03` §3.4, citing `b2b-paid-structure.md` §1.2) says the page must not claim click-ID capture until §2.4 ships. Production no longer shows "15% of total ad spend" (Nadia §2.1); keep it that way |
| Banned words, em dashes | None |

**Verdict: edit.** Lead and KPIs stay. The grid and the method need B2B register and one held claim.

---

## Copy, field by field

**`title`:** keep "B2B PPC". **H1:** Nadia's, final.

**`kpis`:** keep ("Qualified enquiry share", "Cost per qualified enquiry", "Sales-accepted opportunities").

**`fullDescription`.** Answer-first block. 55 words, no number:

> B2B PPC should be judged on qualified enquiries and booked meetings, not clicks or form fills. That means bidding on the right queries, excluding the wrong ones, and sending each campaign to a page that makes the same promise. Management is scoped separately from AI SEO and GEO, and ad spend stays separate from our fee.

**`deepDive`** (four sections, replacing two):

1. **Separate research from buying intent.** Search terms tell you who is learning and who is choosing a supplier. We split campaigns by intent and match each ad to a page that makes the same promise.
2. **Build the exclusion list first.** In the first weeks, the search terms report is the work. We exclude job seekers, students, bargain hunters and consumer searches, so more of the budget reaches buyers.
3. **Use sales outcomes to improve campaigns.** We tie each enquiry to the campaign that produced it and review why leads were disqualified. **[HOLD for Marcus, see below]** Where your CRM and consent settings allow, we send later sales outcomes back to the ad platform, so bidding learns from meetings instead of forms.
4. **How management is priced.** Management is priced as a share of ad spend, with a monthly minimum. Your written scope gives both figures. **(D5, Ruth 2026-10-07: allowed. A pricing basis is not a price, range or tier. Never publish the percentage or the minimum figure.)**

**HOLD.** The last sentence of deep-dive 3 describes the method we run in client accounts. Marcus asked that the page not claim click-ID capture until his §2.4 ships, so the line does not read as a capability of this site. Marcus decides whether it ships now, ships reworded, or waits.

**`subServices[].description`.** Names and slugs unchanged; URLs preserved.

| `name` | New `description` | Note |
|---|---|---|
| Google Search Ads | Search campaigns built on exact and phrase match, with exclusions treated as part of the work. | Removes "ROAS" |
| Google Shopping Ads | For B2B suppliers with a product catalog: parts, materials and equipment. | **D8** |
| Performance Max | keep | |
| Microsoft / Bing Ads | keep | |
| Meta Ads | Facebook and Instagram retargeting for B2B buyers who have already visited your site. | |
| LinkedIn Ads | Targeting by job title, company size and industry, with lead gen forms connected to your CRM. | Removes "ABM campaigns" |
| TikTok Ads | **D8: remove from the grid.** URL stays live. | Consumer |
| YouTube Ads | Video campaigns that retarget site visitors and reach buyers researching your category. | |
| Amazon Ads | **D8: remove from the grid.** URL stays live. | Consumer |
| Retargeting Campaigns | keep | |
| Programmatic Advertising | keep | |
| Connected TV (CTV) Ads | **D8: remove from the grid.** URL stays live. | Consumer |
| Ad Creative Production | Static and video ad creative, produced in sets so variants can be compared. | Removes "High-velocity" |
| Feed Management | **D8:** keep only with Shopping. Product feed cleanup for B2B catalogs. | |
| Landing Page CRO | keep | |
| Paid Media Analytics | GA4, Looker Studio, UTM rules and reporting by campaign, qualified enquiry and sales outcome. | Click-ID clause held (see HOLD) |

**`process`** (four steps):

| `title` | `description` |
|---|---|
| Audit the account | Review search terms, exclusions, conversion actions and landing pages before changing any bid. |
| Rebuild on intent | Group campaigns by buying intent, with exact and phrase match first. |
| Read search terms early | Read the search terms report often in the first weeks and add exclusions as the work. |
| Reallocate on quality | Move budget on cost per qualified enquiry, never on clicks or raw form volume. |

**`techStack`.** `[NEEDS DATA: tools in active use]`. Recommendation: replace "TikTok Ads Manager" with "LinkedIn Campaign Manager" and "Microsoft Advertising" if those are what the team uses. Do not list a tool nobody logs into.

**`faqs`:**

| `question` | `answer` | Code |
|---|---|---|
| Is PPC included with AI SEO and GEO? | No. PPC is scoped and priced separately. A firm that wants only PPC is a full client, and it can run beside search work or on its own. | M6 (not D6: PPC sits outside the four layers, `CLAUDE.md` §1, and PPC-only is in the ICP, §2) |
| Will you guarantee a cost per lead? | No. We commit to the account work and to reporting cost per qualified enquiry in a form you can check yourself. We won't name a figure before we have seen your data. | C7 |
| Do you need access to our ad accounts? | Yes, plus analytics and your CRM if you want campaigns judged on sales outcomes. `[CONFIRM: accounts stay in the client's name and ownership. If yes, add "The accounts stay in your name."]` | C6 |
| Which platforms do you run? | Google Ads and LinkedIn, with Meta for retargeting where it fits. We recommend platforms after seeing where your buyers search. `[Ruth 2026-10-07: Microsoft Advertising cut as unconfirmed. Add it back only when confirmed in active use.]` | n/a |
| How does AI support the work? | keep the current answer | n/a |
| What happens on the first call? | It takes 30 minutes. Bring your account access, or a recent export, and the cost per lead you want to reach. We tell you what we would check first and whether we are a fit. | C4 |

---

## Decisions

- **D5** publishing "share of ad spend with a monthly minimum".
- **D8** removing TikTok, Amazon and CTV from the capability grid; reframing Shopping and Feed for B2B catalogues.
- **HOLD** (Marcus) on the offline-conversion sentence.

## NEEDS DATA

- Tools in active use.
- Whether ad accounts stay in the client's name.
- Whether Microsoft Advertising is run today.
- Marcus §2.4 status, for the held sentence.
