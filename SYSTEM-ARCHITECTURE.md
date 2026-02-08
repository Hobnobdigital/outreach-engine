# 🏗️ System Architecture — How Everything Connects

## High-Level Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        DAILY CYCLE (Autonomous)                  │
│                                                                   │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────────┐ │
│  │  SCRAPE   │──▶│  ENRICH  │──▶│ PERSONAL │──▶│   OUTREACH   │ │
│  │ Apollo.io │   │ Hunter.io│   │  -IZE    │   │ Instantly.ai │ │
│  │ 50-100/day│   │ Verify   │   │ Claude AI│   │ 3-5 emails   │ │
│  └──────────┘   └──────────┘   └──────────┘   └──────┬───────┘ │
│                                                        │         │
│  ┌──────────────────────────────────────────────────────▼───────┐│
│  │                     REPLY HANDLING                            ││
│  │                                                               ││
│  │  Positive Reply ──▶ Send booking link ──▶ Cal.com ──▶ 📅     ││
│  │  "Not now"     ──▶ Add to nurture sequence (30/60/90 day)   ││
│  │  Negative      ──▶ Remove from list, mark as unsubscribe    ││
│  │  Out of office ──▶ Reschedule follow-up for return date     ││
│  └──────────────────────────────────────────────────────────────┘│
│                                                                   │
│  ┌──────────────────────────────────────────────────────────────┐│
│  │                     REPORTING                                 ││
│  │  Daily: Metrics summary → Discord                            ││
│  │  Weekly: Full report → Discord + Email to Kwame              ││
│  │  Monthly: Revenue + pipeline forecast → Kwame                ││
│  └──────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## Workflow 1: Prospect Scraping

**Trigger:** Daily cron at 9:00 AM UTC
**Input:** Client ICP (industry, company size, titles, location)
**Output:** Raw prospect list in Airtable/Google Sheets

```
CRON (9 AM)
  │
  ▼
Apollo.io API ──▶ Search people matching ICP
  │                 - Title: CEO, VP Sales, Head of Marketing
  │                 - Company size: 10-200 employees
  │                 - Industry: Marketing agencies
  │                 - Location: US/UK/Canada
  │
  ▼
Deduplicate ──▶ Check against existing contacts (no double-sends)
  │
  ▼
Store in Google Sheets / Airtable
  │
  ▼
Trigger: Email Enrichment workflow
```

---

## Workflow 2: Email Enrichment & Verification

**Trigger:** After prospect scraping completes
**Input:** Raw prospect list with names + companies
**Output:** Verified email addresses

```
Receive prospect batch
  │
  ▼
Hunter.io API ──▶ Find email for each prospect
  │                 - email-finder endpoint
  │                 - Confidence score check (>90%)
  │
  ▼
Hunter.io API ──▶ Verify each email
  │                 - email-verifier endpoint
  │                 - Status: deliverable ✅ / risky ⚠️ / undeliverable ❌
  │
  ▼
Filter: Keep only "deliverable" emails
  │
  ▼
Update prospect database with verified emails
  │
  ▼
Trigger: Personalization workflow
```

---

## Workflow 3: AI Personalization

**Trigger:** After enrichment completes
**Input:** Prospect data (name, company, title, industry, company description)
**Output:** Custom email opening line + full personalized email

```
Receive verified prospect batch
  │
  ▼
For each prospect:
  │
  ├──▶ Scrape company website (first 500 words)
  │
  ├──▶ Check for recent news/announcements
  │
  ▼
Claude API ──▶ Generate personalized email
  │
  │  Prompt: "Write a cold email opening line for [Name],
  │           [Title] at [Company]. They do [description].
  │           Reference something specific about their business.
  │           Tone: casual professional, not salesy.
  │           Max 2 sentences."
  │
  ▼
Store personalized copy with prospect record
  │
  ▼
Trigger: Outreach Sequence workflow
```

**Example output:**
```
To: Sarah Chen, VP Marketing at GrowthStack
Opening: "Sarah — saw GrowthStack just expanded into the UK market.
Scaling outbound in a new region is a beast. We automated that exact
process for two agencies this quarter."
```

---

## Workflow 4: Outreach Sequence

**Trigger:** After personalization completes
**Input:** Personalized prospect data
**Output:** Campaigns created in Instantly.ai

```
Receive personalized prospect batch
  │
  ▼
Instantly.ai API ──▶ Add leads to campaign
  │                     - Lead email, name, company
  │                     - Custom variables (personalized line)
  │
  ▼
Campaign sends automatically:
  │
  ├── Day 0: Email 1 (personalized intro + value prop)
  ├── Day 3: Email 2 (case study / social proof)
  ├── Day 7: Email 3 (different angle / pain point)
  ├── Day 12: Email 4 (quick follow-up)
  └── Day 18: Email 5 (breakup email — last chance)
  │
  ▼
Instantly tracks: opens, clicks, replies, bounces
```

---

## Workflow 5: Reply Handling

**Trigger:** Every 30 minutes (cron)
**Input:** New replies from Instantly.ai
**Output:** Categorized replies with appropriate follow-up actions

```
CRON (every 30 min)
  │
  ▼
Instantly.ai API ──▶ Fetch new replies
  │
  ▼
Claude AI ──▶ Classify reply sentiment
  │
  ├── POSITIVE ("interested", "tell me more", "let's chat")
  │     ▼
  │     Send booking link email (automated)
  │     Notify Kwame on Discord: "🔥 Hot lead: [Name] at [Company]"
  │
  ├── NEUTRAL ("not right now", "maybe later", "send more info")
  │     ▼
  │     Add to 30-day nurture sequence
  │     Auto-follow-up in 30 days
  │
  ├── NEGATIVE ("not interested", "unsubscribe", "stop emailing")
  │     ▼
  │     Remove from all lists immediately
  │     Mark as "do not contact"
  │
  └── OUT OF OFFICE
        ▼
        Parse return date
        Reschedule follow-up for return date + 2 days
```

---

## Workflow 6: Daily & Weekly Reporting

**Trigger:** Daily at 6 PM UTC / Weekly on Fridays

```
DAILY REPORT (Discord message to Kwame):
┌─────────────────────────────────────┐
│ 📊 Daily Outreach Report            │
│                                     │
│ Emails sent today: 87               │
│ Open rate: 52%                      │
│ Replies: 4                          │
│ Positive replies: 1                 │
│ Meetings booked: 1                  │
│                                     │
│ 🔥 Hot lead: Sarah Chen @ GrowthStack│
│ 📅 Meeting booked: Feb 12, 2pm EST │
│                                     │
│ Pipeline: 3 warm leads nurturing    │
└─────────────────────────────────────┘

WEEKLY REPORT (Detailed):
┌─────────────────────────────────────┐
│ 📈 Weekly Performance Report        │
│                                     │
│ Total sent: 487                     │
│ Open rate: 48.2%                    │
│ Reply rate: 3.7%                    │
│ Positive reply rate: 1.4%           │
│ Meetings booked: 3                  │
│ Revenue: $0 (month 1)              │
│                                     │
│ Best performing:                    │
│ - Subject: "Quick question about    │
│   [company]" (62% open rate)       │
│ - Sequence B outperforming A by 23% │
│                                     │
│ Recommendations:                    │
│ - Kill Sequence A, scale B          │
│ - Add new niche: SaaS companies    │
│ - Consider LinkedIn DM channel      │
└─────────────────────────────────────┘
```

---

## Data Flow Diagram

```
                    ┌────────────────┐
                    │   APOLLO.IO    │
                    │  (Prospect DB) │
                    └───────┬────────┘
                            │ Raw prospects
                            ▼
                    ┌────────────────┐
                    │   HUNTER.IO    │
                    │  (Verify Email)│
                    └───────┬────────┘
                            │ Verified emails
                            ▼
              ┌─────────────────────────────┐
              │         n8n (BRAIN)          │
              │                             │
              │  ┌─────────────────────┐    │
              │  │    Claude API       │    │
              │  │ (Personalization)   │    │
              │  └──────────┬──────────┘   │
              │             │               │
              └─────────────┼───────────────┘
                            │ Personalized emails
                            ▼
                    ┌────────────────┐
                    │  INSTANTLY.AI  │
                    │  (Send + Track)│
                    └───────┬────────┘
                            │ Replies
                            ▼
                    ┌────────────────┐
                    │  REPLY HANDLER │──── Positive ──▶ Cal.com ──▶ 📅
                    │  (AI Classify) │──── Nurture ──▶ 30-day drip
                    └───────┬────────┘──── Negative ──▶ Unsubscribe
                            │
                            ▼
                    ┌────────────────┐
                    │   REPORTING    │──▶ Discord (Kwame)
                    │  (Daily/Weekly)│──▶ Google Sheets (data)
                    └────────────────┘
```

---

## Error Handling

| Error | Detection | Auto-Recovery |
|-------|-----------|---------------|
| Apollo API rate limit | HTTP 429 | Exponential backoff, retry in 1hr |
| Hunter verification fails | API timeout | Skip prospect, retry next cycle |
| Instantly sending blocked | Bounce rate spike | Pause campaign, alert Kwame |
| Claude API down | HTTP 500/503 | Fall back to template personalization |
| n8n workflow crash | Execution error | Auto-restart, log error, alert Discord |
| Domain blacklisted | Deliverability drop | Switch to backup domain, alert Kwame |

---

## Security & Compliance

- **CAN-SPAM compliance:** Every email includes unsubscribe option
- **GDPR:** Prospect data stored securely, deleted on request
- **Opt-out handling:** Automated — replies with "unsubscribe" instantly removed
- **Data retention:** Prospect data purged after 90 days of no engagement
- **API keys:** Stored as environment variables, never in code
