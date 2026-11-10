# Pehle Aap — Product Requirements Document (PRD)
**Version:** 0.1 (MVP draft)  
**Date:** 4 November 2026  
**Target City:** Lucknow, Uttar Pradesh, India  

---

## 1. Product Overview
- **Vision:** Make professional short-form content as easy to order as a food delivery, starting in Lucknow.
- **Problem:** Small businesses need regular reels but agencies are expensive, freelancers are unreliable, and finding a trusted creator is slow. Meanwhile, local students and freelancers lack steady paid work.
- **Solution:** A two-sided marketplace with managed quality. Businesses book packages at fixed prices, creators receive nearby gigs, and the platform handles matching, payment, delivery, and ratings.
- **Differentiators:** Hyperlocal creators, 30-minute creator confirmation, fixed transparent pricing, WhatsApp-assisted booking for easy adoption, monthly content-partner model.

---

## 2. Goals & Success Metrics
| Goal | Metric | MVP Target (Assumption) |
|---|---|---|
| **Fast matching** | Median time from booking to creator confirmation | ≤ 30 minutes for 80% of bookings |
| **Reliable delivery** | Orders delivered within 48 hours of shoot | ≥ 85% |
| **Quality** | Average customer rating | ≥ 4.2 / 5.0 |
| **Adoption** | WhatsApp-started bookings that convert to app accounts | ≥ 60% |
| **Retention** | Customers who book a second time within 30 days | ≥ 40% |
| **Supply** | Active verified creators in Lucknow | 40 by end of pilot |
| **Revenue** | Platform commission per booking | 20% to 25% |

**Non-goals for MVP:** Cities outside Lucknow, live streaming, long-form video, in-app video editing tools, drone/premium film packages, influencer marketplace.

---

## 3. Users and Personas
1. **Business Owner:** Cafe, boutique, clinic, coaching centre, wedding vendor owner (usually non-technical). Needs regular reels without managing freelancers.
2. **Social Media Manager:** Manages several local accounts. Needs reliable shooters for multiple clients.
3. **Creator:** College student or freelancer with a smartphone and editing skills. Needs steady paid gigs near them with quick, reliable payouts.
4. **Admin / Operations:** Pehle Aap team keeping quality, matching, and disputes on track.

---

## 4. Scope and Phasing
- **Phase 0:** Clickable prototype, WhatsApp booking flow demo, manual concierge pilot of 2 to 3 real shoots.
- **Phase 1 (MVP):** Business app, creator app, admin panel, WhatsApp bridge, payments, ratings, delivery workflow.
- **Phase 2:** Subscriptions, SMM multi-account tools, content calendar, analytics, referral program.
- **Phase 3:** Other cities, premium packages, creator training academy, AI content ideas.

---

## 5. Core User Flows
### 5.1 Business Books a Creator (App / Web)
1. Sign up with phone number and OTP.
2. Add business profile: name, category (cafe, boutique, clinic, coaching, etc.), area (Hazratganj, Gomti Nagar, Alambagh, Indira Nagar, etc.), Instagram handle.
3. Choose package (Single Reel, 4-Reel Pack, 8-Reel Pack) and shoot type.
4. Pick date & time slot or choose "As soon as possible" (ASAP).
5. Brief builder: select template, offer, music/language preference, key highlights.
6. Review price, pay via UPI / Cards / Wallet.
7. System broadcasts job to nearby verified creators. First qualified acceptance confirms the booking (≤ 30 min SLA).
8. Business tracks live status: Finding Creator → Confirmed → On the way → Arrived → Shooting → Uploaded → Editing → Delivered.
9. Deliverable preview within 24–48 hours. Approve or request 1 free revision with timestamp notes.
10. Download HD reel, share directly to Instagram, rate creator.

### 5.2 Business Books via WhatsApp (Bridge)
1. Owner messages Pehle Aap WhatsApp bot or taps Instagram link.
2. Bot collects package, area, date, brief via interactive quick-replies.
3. Bot sends secure payment / confirmation link (lightweight webview).
4. Status updates sent directly via WhatsApp template messages.
5. Delivery link prompts owner to view, approve, rate, and rebook.

### 5.3 Creator Onboarding & Gig Flow
1. Sign up with phone and OTP; upload ID, selfie, and 3 sample reels.
2. Admin reviews & approves profile; creator passes short quality checklist.
3. Creator sets availability & active Lucknow service zones.
4. Gig alert arrives (push + WhatsApp) with zone, time, payout, and brief.
5. Creator accepts within 10-minute window, travels, checks in at business location via geo-confirmation.
6. Creator shoots, uploads raw clips, completes vertical 9:16 edit within 24–48 hours.
7. Payout credited to UPI/Bank upon customer approval.

### 5.4 Admin Quality & Dispute Flow
1. Admin reviews creator onboarding queue and verifies credentials.
2. Live Order Board with automated escalation timers (10m radius expansion, 20m manual alert, 30m fallback).
3. Reassign late/declined jobs, handle revision disputes, issue refunds, suspend creators.

---

## 6. Functional Requirements Matrix
- **AUTH-1 to AUTH-6:** Phone OTP, role selection (Business / Creator / Admin), business & creator profiles, verification.
- **BOOK-1 to BOOK-7:** Packages catalogue (Single, 4-pack, 8-pack), add-ons, slot/ASAP booking, category brief templates, reschedule/cancel policies.
- **MATCH-1 to MATCH-6:** Hyperlocal dispatch, first-acceptance wins, 10m/20m/30m escalation SLAs, live countdown, smart creator ranking.
- **SHOOT-1 to SHOOT-5:** Creator check-in/out, live status timeline, masked in-app chat, shoot checklist, raw footage upload.
- **DEL-1 to DEL-7:** 24–48h SLA timer, vertical 9:16 preview, caption & hashtag generator, 1 free revision loop, HD download & Instagram share shortcut.
- **PAY-1 to PAY-6:** UPI / Razorpay integration, escrow/hold model until approval, creator payouts (75–80%), GST invoices, admin refunds.
- **QUAL-1 to QUAL-5:** Two-way 5-star ratings & reviews, creator tiers (New, Trusted, Pro), first-3-orders audit, issue reporting.
- **NOTIF-1 to NOTIF-5:** Push notifications, WhatsApp Business API notifications & interactive booking bot, bilingual English/Hindi.
- **ADM-1 to ADM-6:** Creator verification queue, live dispatch board, pricing/commission controls, refund tools, analytics KPIs dashboard.

---

## 7. Business Rules & SLA Summary
- **Confirmation SLA:** 30 minutes from payment to creator confirmation (fallback to auto-refund or reschedule if unfilled).
- **Delivery SLA:** Final postable reel within 24 hours (hard cap 48 hours). Late alert fires at 75% elapsed time (18 hours).
- **Revisions:** 1 free revision included per reel.
- **Commission:** 20% to 25% platform cut.
- **Cancellation:** Free up to 2 hours before shoot slot.
- **Pricing:** Single reel ₹499–₹1,999; Monthly packs ₹3,999–₹7,999.

