# 🔧 Tools, APIs & MCPs — Complete Reference

## Core Stack Overview

```
PROSPECT DATA          ENRICHMENT          PERSONALIZATION       OUTREACH           BOOKING
Apollo.io      →    Hunter.io      →    Claude/GPT (AI)   →  Instantly.ai   →   Cal.com
LinkedIn SNav        Clearbit             n8n orchestrates     3-5 email seq      Auto-books
Google Maps          DropContact                               Multi-account      Calendly alt
```

---

## Tool-by-Tool Breakdown

### 1. Apollo.io — Prospect Database

**Purpose:** Find companies and decision-makers matching your ideal customer profile (ICP). The backbone of your prospect data.

**What it does:**
- Search 270M+ contacts by title, company size, industry, location, tech stack
- Filter by buying signals (recent funding, hiring, tech changes)
- Export contact lists with emails, phone numbers, LinkedIn URLs
- Track prospect engagement

**API/Integration:**
- REST API: `https://api.apollo.io/v1/`
- n8n node: Built-in Apollo node
- API Key: Settings → API → Generate Key

**Cost:**
| Plan | Price | Credits/mo | Best For |
|------|-------|-----------|----------|
| Free | $0 | 10,000 | Starting out |
| Basic | $49/mo | 25,000 | 1-3 clients |
| Professional | $99/mo | 50,000 | 5+ clients |

**Why this tool:** Best free-tier prospect database. 10K credits/month is enough for 500-1,000 fully enriched prospects — plenty for launch.

---

### 2. Instantly.ai — Email Sending & Warmup

**Purpose:** Send cold emails at scale without landing in spam. Handles warmup, sending, tracking, and reply detection.

**What it does:**
- Connects unlimited email accounts
- Auto-warms emails for 14+ days (mimics human email behavior)
- Sends sequences (3-5 emails with delays between)
- Tracks opens, clicks, replies, bounces
- Auto-pauses when someone replies (prevents awkward double-sends)
- A/B tests subject lines and email body

**API/Integration:**
- REST API: `https://api.instantly.ai/api/v1/`
- n8n: HTTP Request node → Instantly API
- API Key: Settings → Integrations → API

**Cost:**
| Plan | Price | Accounts | Contacts | Best For |
|------|-------|----------|----------|----------|
| Growth | $30/mo | Unlimited | 1,000 | Starting |
| Hypergrowth | $77/mo | Unlimited | 25,000 | 3+ clients |
| Light Speed | $286/mo | Unlimited | 100,000 | 10+ clients |

**Why this tool:** Cheapest cold email tool with unlimited sending accounts. Built-in warmup saves you from needing a separate tool. The $30/mo plan handles everything for months 1-3.

---

### 3. Hunter.io — Email Verification

**Purpose:** Verify that email addresses are real before sending. Prevents bounces that destroy your sender reputation.

**What it does:**
- Verify individual emails (deliverable/undeliverable/risky)
- Find emails for a domain (CEO@company.com patterns)
- Bulk verification (upload CSV, get verified list back)
- Domain search (find all public emails for a company)

**API/Integration:**
- REST API: `https://api.hunter.io/v2/`
- n8n node: Built-in Hunter node
- API Key: Dashboard → API

**Cost:**
| Plan | Price | Verifications/mo | Best For |
|------|-------|-----------------|----------|
| Free | $0 | 25 | Testing |
| Starter | $49/mo | 1,000 | Active use |
| Growth | $149/mo | 5,000 | Scale |

**Why this tool:** Industry standard for email verification. Even a 1% bounce rate reduction pays for the subscription by protecting your domain reputation.

---

### 4. n8n — Workflow Orchestration (The Brain)

**Purpose:** Connects all tools together into automated pipelines. The central nervous system that runs everything.

**What it does:**
- Visual workflow builder (drag-and-drop)
- 400+ built-in integrations
- Custom code nodes (JavaScript/Python)
- Cron triggers (run workflows on schedule)
- Webhook triggers (react to events in real-time)
- Error handling and retry logic

**API/Integration:**
- Self-hosted on your EC2 instance
- REST API for triggering workflows externally
- MCP: n8n can call Claude/GPT APIs directly

**Cost:** $0 (self-hosted)

**Workflows we'll build:**

| Workflow | Trigger | What It Does |
|----------|---------|-------------|
| `prospect-scraping` | Daily cron (9 AM) | Pull new prospects from Apollo matching ICP |
| `email-enrichment` | After scraping | Verify emails via Hunter, discard bad ones |
| `personalization` | After enrichment | AI writes custom opening line per prospect |
| `outreach-sequence` | After personalization | Push to Instantly.ai campaign |
| `reply-monitor` | Every 30 min | Check for replies, route positive ones |
| `booking-handler` | On positive reply | Send booking link, notify Kwame |
| `daily-report` | Daily cron (6 PM) | Send metrics summary to Discord |
| `weekly-report` | Weekly (Friday) | Comprehensive performance report |

**Why this tool:** Free, self-hosted, infinitely customizable. Unlike Zapier ($50+/mo with limits), n8n has no execution limits and you own your data.

---

### 5. Cal.com — Meeting Booking

**Purpose:** Prospects book meetings directly on the calendar. Zero back-and-forth scheduling.

**What it does:**
- Shareable booking link (embed in emails)
- Syncs with Google Calendar
- Sends automatic reminders
- Handles timezone conversion
- Collects pre-meeting info via custom questions

**API/Integration:**
- REST API: `https://api.cal.com/v1/`
- Embed: iframe or direct link in email signatures
- Webhook: Triggers on new booking → notify n8n

**Cost:** $0 (free tier)

**Why this tool:** Free Calendly alternative. Open source. Professional enough for client-facing use.

---

### 6. Claude API (Anthropic) — AI Personalization

**Purpose:** Write hyper-personalized email copy for each prospect. The secret weapon that makes your outreach 3-5x more effective than templates.

**What it does:**
- Researches prospect's company (from scraped data)
- Identifies pain points relevant to your client's service
- Writes a custom opening line that references something specific
- Generates email variations for A/B testing
- Handles objection responses for replies

**API/Integration:**
- API: `https://api.anthropic.com/v1/messages`
- n8n: HTTP Request node with Anthropic API
- Model: Claude Sonnet (best cost/quality for email writing)

**Cost:** ~$0.003 per email personalized (Sonnet pricing)
- 1,000 emails/month = ~$3

**Why this tool:** Best writing quality for cold emails. Understands nuance, avoids sounding robotic, and can reference specific company details naturally.

---

## APIs & Keys Needed (Complete List)

| Service | API Key Location | Required |
|---------|-----------------|----------|
| Apollo.io | Settings → API | ✅ Yes |
| Instantly.ai | Settings → Integrations | ✅ Yes |
| Hunter.io | Dashboard → API | ✅ Yes |
| Cal.com | Settings → Developer → API Keys | ✅ Yes |
| Anthropic (Claude) | console.anthropic.com → API Keys | ✅ Yes |
| Google Workspace | Admin console (for email) | ✅ Yes |
| OpenAI (backup) | platform.openai.com → API Keys | Optional |

---

## MCP (Model Context Protocol) Integrations

For Claude Code / Clawdbot to operate autonomously:

| MCP Server | Purpose | Priority |
|------------|---------|----------|
| **n8n MCP** | Trigger/monitor workflows from Claude | High |
| **Google Calendar MCP** | Check bookings, manage schedule | Medium |
| **Slack/Discord MCP** | Send reports, receive commands | Medium |
| **Email MCP** | Read replies, draft responses | High |
| **Apollo MCP** | Search prospects, manage lists | Medium |

---

## Monthly Cost Summary

### Month 1 (Minimum Viable)
| Tool | Cost |
|------|------|
| Domain | $10 (one-time) |
| Google Workspace (3 accounts) | $18 |
| Instantly.ai Growth | $30 |
| Apollo.io Free | $0 |
| Hunter.io Free | $0 |
| Cal.com Free | $0 |
| n8n Self-hosted | $0 |
| Claude API (~500 emails) | $1.50 |
| **Total** | **~$60** |

### Month 3 (Scaled)
| Tool | Cost |
|------|------|
| Google Workspace (3 accounts) | $18 |
| Instantly.ai Hypergrowth | $77 |
| Apollo.io Basic | $49 |
| Hunter.io Starter | $49 |
| Cal.com Free | $0 |
| n8n Self-hosted | $0 |
| Claude API (~3,000 emails) | $9 |
| **Total** | **~$202** |

### Profit Margin
```
Month 3 revenue: $12,000
Month 3 costs:   $202
Profit margin:   98.3%
```
