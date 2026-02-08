# 📅 6-12 Month Roadmap — Play by Play

## Phase 1: Foundation (Week 1-2) — $0 Revenue

### Week 1: Infrastructure Setup

**Day 1-2: Domain & Email**
- [ ] Buy outreach domain (Namecheap/Cloudflare)
- [ ] Set up Google Workspace (3 email accounts)
- [ ] Configure DNS records:
  - SPF: `v=spf1 include:_spf.google.com ~all`
  - DKIM: Generated via Google Workspace admin
  - DMARC: `v=DMARC1; p=none; rua=mailto:dmarc@[domain]`
- [ ] Connect emails to Instantly.ai
- [ ] Start email warmup (14-day minimum — NON-NEGOTIABLE)

**Day 3-4: Tool Setup**
- [ ] Apollo.io account → Configure ideal customer filters
- [ ] Hunter.io account → Email verification API key
- [ ] Cal.com → Create booking page with professional branding
- [ ] n8n → Build prospect scraping workflow (v1)

**Day 5-7: Content & Positioning**
- [ ] AI writes 3-email cold sequence for target niche
- [ ] AI builds landing page for outreach service
- [ ] AI creates LinkedIn profile optimization for Kwame
- [ ] AI researches first 200 prospects in target niche

### Week 2: System Building

**Day 8-10: n8n Workflows**
- [ ] Build complete prospect → enrich → personalize → send pipeline
- [ ] Build reply monitoring workflow
- [ ] Build daily reporting workflow
- [ ] Test all workflows with dummy data

**Day 11-14: Warmup & Prep**
- [ ] Email warmup continues (monitor deliverability scores)
- [ ] AI writes email variations (A/B test versions)
- [ ] Prepare first batch of 200 personalized emails
- [ ] Set up tracking (open rates, reply rates, bounce rates)
- [ ] Build client proposal template

---

## Phase 2: Launch & Learn (Week 3-4) — $0-$500 Revenue

### Week 3: First Outreach

**Daily Operations (AI runs autonomously):**
- Send 30-50 emails/day (ramping up)
- Monitor replies within 30 minutes
- Route positive replies to booking link
- Flag hot leads for Kwame to review
- A/B test subject lines

**Metrics to Track:**
| Metric | Target | Red Flag |
|--------|--------|----------|
| Open rate | 40-60% | Below 25% |
| Reply rate | 3-8% | Below 1% |
| Bounce rate | < 3% | Above 5% |
| Positive reply rate | 1-3% | Below 0.5% |

### Week 4: Optimization

- Analyze first 500 emails sent
- Double down on what works (best subject lines, best personalization)
- Kill what doesn't (low-performing sequences)
- Ramp up to 75-100 emails/day
- **Goal: 3-5 positive conversations in pipeline**

**🎯 Kwame action:** Take 1-2 intro calls with interested prospects. AI provides talking points and proposal.

---

## Phase 3: First Clients (Month 2) — $2K-$8K Revenue

### Week 5-6: Close First Deals

- Pipeline from month 1 should yield 5-10 qualified conversations
- AI prepares custom proposals per prospect
- **Kwame action:** Close 1-3 deals on calls (15-30 min each)
- Set up client onboarding:
  - Ideal customer profile (ICP) questionnaire
  - Calendar integration
  - Reporting dashboard access

### Week 7-8: Deliver for First Clients

- AI builds custom prospect lists per client's ICP
- AI writes personalized sequences per client's value proposition
- Launch outreach campaigns for paying clients
- Daily monitoring and optimization
- Weekly client reports (automated)

**Revenue target: 2 clients × $3,000 = $6,000**

---

## Phase 4: Scale (Month 3-4) — $6K-$15K Revenue

### Operational Rhythm (AI runs daily):

```
Morning:
  - Scrape 50-100 new prospects per client
  - Enrich and verify emails
  - AI personalizes email copy
  - Queue for sending

Midday:
  - Monitor replies from previous sends
  - Route positive replies to booking
  - Handle "not now" replies (add to nurture)
  - Flag urgent items for Kwame

Evening:
  - Send daily metrics to Kwame (Slack/Discord)
  - Update prospect database
  - Prepare next day's batch
  - Run A/B test analysis
```

### Growth Activities:
- Increase sending volume to 100-200/day per client
- Add second email domain for capacity
- Launch LinkedIn outreach (manual + automated)
- Request testimonials from satisfied clients
- Raise prices for new clients based on proven results

**Revenue target: 4-5 clients × $3,000 = $12,000-$15,000**

---

## Phase 5: Systems & Team (Month 5-6) — $15K-$25K Revenue

### Automate More:
- Client onboarding fully automated (forms → n8n → campaign launch)
- Automated weekly reports per client
- Self-healing workflows (auto-restart on failure)
- Lead scoring model (AI ranks prospect quality)

### Scale Capacity:
- Add 3rd email domain
- Set up multi-channel: email + LinkedIn + Twitter DMs
- Build referral program (clients get discount for referrals)
- Create case studies from best-performing campaigns

### Consider Hiring:
- Virtual assistant for admin tasks ($500-$1,000/mo)
- Sales closer for calls if Kwame is too busy ($commission-based)

**Revenue target: 7-8 clients × $3,500 = $24,500-$28,000**

---

## Phase 6: Authority & Compound (Month 7-12) — $25K-$50K Revenue

### Build Authority:
- Publish case studies on website/LinkedIn
- Create "AI Outreach" content series (establish thought leadership)
- Speak on podcasts about AI-powered lead gen
- Build email list of potential clients

### Product-ize:
- Package best-performing workflows as templates ($500-$2,000)
- Offer "DIY" tier: client gets the system, runs it themselves ($500/mo)
- Create training program for other agencies wanting to use AI outreach

### Compound Growth:
- Referrals from happy clients (lowest CAC)
- Retainers stacking (each new client adds to MRR)
- Price increases as results prove out
- Expand to new niches

**Revenue target: 12-15 clients × $4,000 = $48,000-$60,000**

---

## 📊 Revenue Projection Summary

| Month | Clients | MRR | Cumulative Revenue |
|-------|---------|-----|-------------------|
| 1 | 0-1 | $0-$500 | $0-$500 |
| 2 | 1-3 | $2K-$8K | $2K-$8.5K |
| 3 | 3-5 | $6K-$15K | $8K-$23.5K |
| 4 | 4-6 | $10K-$18K | $18K-$41.5K |
| 5 | 5-8 | $15K-$24K | $33K-$65.5K |
| 6 | 7-10 | $20K-$30K | $53K-$95.5K |
| 9 | 10-15 | $30K-$45K | $143K-$230K |
| 12 | 15-20 | $40K-$60K | $263K-$410K |

**Year 1 total: $250K-$400K (realistic range)**

---

## ⚠️ Risks & Mitigation

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Email deliverability issues | High | Proper warmup, multiple domains, clean lists |
| Slow sales cycle | High | Start outreach ASAP, build pipeline early |
| Client churn | Medium | Deliver results fast, weekly reports, over-communicate |
| Market saturation | Low-Medium | AI personalization is your moat — stay ahead |
| Burnout on sales calls | Medium | Hire commission-based closer by month 4 |
| Tool API changes | Low | n8n is flexible, swap tools easily |

---

## 🎯 Key Milestones

- [ ] **Week 2:** All infrastructure live, warmup running
- [ ] **Week 4:** First 500 emails sent, first positive replies
- [ ] **Month 2:** First paying client signed
- [ ] **Month 3:** $10K MRR reached
- [ ] **Month 4:** 5 active clients
- [ ] **Month 6:** $25K MRR, consider first hire
- [ ] **Month 9:** $40K MRR, productized offering launched
- [ ] **Month 12:** $50K MRR, running on autopilot
