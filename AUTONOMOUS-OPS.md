# 🤖 Autonomous Operations — How AI Runs Everything

## The Promise

**Kwame's weekly time commitment: 2-3 hours.**

Everything else runs autonomously. This document explains exactly what the AI does each day, how it makes decisions, and when it escalates to Kwame.

---

## Daily Autonomous Schedule

### 🌅 Morning Block (9:00 AM UTC) — Prospecting

| Time | Action | Decision Logic |
|------|--------|---------------|
| 9:00 | Trigger prospect scraping | n8n cron — runs automatically |
| 9:05 | Scrape 50-100 prospects per client from Apollo | ICP filters pre-configured per client |
| 9:15 | Deduplicate against existing contacts | Exact email match + fuzzy company name |
| 9:20 | Verify emails via Hunter.io | Keep only "deliverable" status |
| 9:30 | AI personalizes email copy | Claude writes custom opening per prospect |
| 9:45 | Push to Instantly.ai campaigns | Queued for sending throughout the day |

**AI decision-making:**
- If Apollo returns <20 results → widen search criteria automatically
- If Hunter rejects >30% of emails → flag data quality issue to Kwame
- If personalization quality seems low → fall back to top-performing template

---

### ☀️ Midday Block (1:00 PM UTC) — Reply Management

| Time | Action | Decision Logic |
|------|--------|---------------|
| 13:00 | Fetch all new replies from Instantly | API pull, classify each |
| 13:05 | AI classifies reply sentiment | Positive / Neutral / Negative / OOO |
| 13:10 | Route positive replies | Auto-send booking link + notify Kwame |
| 13:15 | Handle neutral replies | Add to nurture sequence |
| 13:20 | Process negative replies | Auto-unsubscribe, never contact again |
| 13:25 | Process OOO replies | Parse return date, schedule follow-up |

**AI decision-making:**
- Positive reply → AI drafts a warm response with booking link, sends immediately
- Ambiguous reply → Flags for Kwame review before responding
- Angry reply → Apologize, unsubscribe, log for quality review

---

### 🌙 Evening Block (6:00 PM UTC) — Reporting & Optimization

| Time | Action | Decision Logic |
|------|--------|---------------|
| 18:00 | Compile daily metrics | Pulls from Instantly API |
| 18:05 | Analyze A/B test performance | Statistical significance check |
| 18:10 | Generate daily report | Format for Discord delivery |
| 18:15 | Send report to Kwame on Discord | Includes action items if needed |
| 18:20 | Update prospect database | New statuses, engagement scores |
| 18:25 | Prepare next day's batch | Pre-personalize for morning send |

**AI decision-making:**
- Open rate drops below 25% → Auto-switch to backup subject lines
- Reply rate exceeds 5% → Scale up sending volume by 20%
- Bounce rate exceeds 3% → Pause campaign, switch to backup domain
- Weekly: Kill worst-performing sequences, double down on winners

---

## Reply Handling Decision Tree

```
New Reply Received
│
├── Contains: "interested" / "tell me more" / "let's talk" / "when are you free"
│   └── ACTION: Send booking link immediately
│         Notify Kwame: "🔥 Hot lead: [Name] at [Company]"
│
├── Contains: "not right now" / "maybe later" / "busy" / "Q3" / "next quarter"
│   └── ACTION: Add to nurture sequence
│         Follow up in 30 days with new angle
│
├── Contains: "not interested" / "no thanks" / "remove me" / "unsubscribe" / "stop"
│   └── ACTION: Unsubscribe immediately
│         Send polite confirmation: "Removed! Sorry for the interruption."
│
├── Contains: "out of office" / "OOO" / "on vacation" / "back on [date]"
│   └── ACTION: Parse return date
│         Reschedule follow-up for return date + 2 business days
│
├── Contains: "who is this" / "how did you get my email" / "spam"
│   └── ACTION: Send transparent response
│         "Found your profile on LinkedIn. Happy to remove you."
│         Flag for Kwame review
│
├── Contains question about pricing / services / how it works
│   └── ACTION: Send detailed response (pre-written template)
│         Book a call link included
│         Notify Kwame: "💬 Engaged lead asking questions"
│
└── Cannot classify / ambiguous
    └── ACTION: Flag for Kwame review
          Draft suggested response for approval
```

---

## Escalation Matrix — When AI Pings Kwame

| Situation | Urgency | How Kwame is Notified |
|-----------|---------|----------------------|
| Hot lead wants a call | 🔴 High | Discord DM + emoji alert |
| Prospect asks complex question | 🟡 Medium | Discord message with draft response |
| Deliverability drops below 30% | 🔴 High | Discord alert — "domain health issue" |
| First client of the month signs | 🟢 Info | Discord celebration message |
| Weekly report ready | 🟢 Info | Discord message every Friday |
| New A/B test winner found | 🟢 Info | Included in daily report |
| Angry prospect / complaint | 🟡 Medium | Discord alert with context |
| Budget/tool upgrade needed | 🟡 Medium | Discord message with recommendation |

**Rule: AI handles 95% of operations. Kwame only sees what requires a human.**

---

## Autonomous Optimization (AI Learns & Improves)

### Email Copy Optimization
```
Week 1: Send 3 subject line variations (A/B/C test)
Week 2: Kill worst performer, create new variation from winner
Week 3: Repeat — best-performing copy evolves over time
Week 4: Report winning formulas to Kwame
```

### Prospect Quality Scoring
```
AI assigns scores based on:
- Company size (sweet spot: 20-200 employees = higher score)
- Title match (VP/Director/Head = higher than Manager)
- Industry match (primary niche = higher)
- Engagement signals (opened emails, clicked links)
- Reply sentiment (positive history = nurture priority)
```

### Campaign Health Monitoring
```
Every hour, AI checks:
- Sending rate vs. plan limits
- Bounce rate trending (stop before damage)
- Domain reputation (via Instantly health score)
- Reply categorization accuracy
```

---

## What AI Cannot Do (Kwame's Territory)

| Task | Why It Needs Kwame | Frequency |
|------|-------------------|-----------|
| **Sales calls** | Human trust required to close deals | 2-4 calls/week |
| **Approve new niche** | Strategic decision | Monthly |
| **Sign client contracts** | Legal authority | Per new client |
| **Handle complaints** | Human empathy needed | Rare |
| **Set up bank/payments** | Financial access | One-time |
| **Review angry replies** | Brand protection | As flagged |

---

## Failure Recovery (Self-Healing)

| Failure | Auto-Recovery | Escalation |
|---------|---------------|------------|
| n8n workflow crashes | Auto-restart in 5 min | If crashes 3x → alert Kwame |
| API rate limited | Exponential backoff | If blocked >24hr → alert |
| Email bounces spike | Pause sending, check list | If >5% → alert immediately |
| Claude API down | Use cached/template copy | If >2hr → switch to GPT-4o |
| Domain blacklisted | Switch to backup domain | Alert Kwame immediately |
| Prospect data empty | Widen search criteria | If still empty → check Apollo credits |
