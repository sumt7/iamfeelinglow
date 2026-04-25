# weekender.md — IamFeelingLow

This is Sumeet's working file for the AI Weekender sprint. Update the live state and daily log as facts land.

## the basics

- **Track:** Virality
- **Idea:** IamFeelingLow — one-page tool. One question (how bad is it right now?), four honest answers (Flat / Heavy / Drowning / Dangerous), one action per tier matched to severity. The wedge: most "feeling low" content is written for mild severity and handed to everyone.
- **First user (one specific human):** Sumeet himself, in the version of himself two years ago — after his father's heart attack on Feb 9, 2024, as the only child, carrying ~10 lakh of debt. The product is the thing he wishes someone had handed him in those months.

## live state

- **Stage:** L2
- **Live URL:** https://iamfeelinglow.today/ (custom domain; old `iamfeelinglow.vercel.app` 308-redirects here)
- **GitHub:** https://github.com/sumt7/iamfeelinglow
- **Vercel project:** `sumt7s-projects/iamfeelinglow`
- **Local repo linked:** yes (as of 2026-04-25)

## metrics

_Fill in as they come in. Anonymous, cookieless page-view counts via Vercel Analytics only — no per-user data, ever._

- Visits (24h):
- Visits (7d):
- Tier-click rate (% of visitors who pick a tier):
- Per-tier breakdown:

## daily log

### 2026-04-25 (Sat)

- Installed Vercel CLI, logged in via GitHub (`sumt7`), linked local folder to the existing `iamfeelinglow` Vercel project.
- Confirmed live URL and connected GitHub repo (`sumt7/iamfeelinglow`).
- Decision: add anonymous, cookieless Vercel Analytics. Reason: need to know if anyone is reaching the page and which tier they pick, without breaking the privacy promise.
- Reconciled homepage copy — old line *"No data. No tracking. No payment. Ever."* replaced with *"No signup. No personal data stored. Ever."* CLAUDE.md non-negotiable #1 updated to match.
- Today's one move: ship anonymous analytics + the new copy, then verify on the live URL.

### 2026-04-26 (Sun)

- Pushed the 2 pending commits to `origin/main` (`ce5df78..3ed252d`). Live URL now matches local.
- Enabled Vercel Web Analytics in the dashboard. Page views will start recording from now.
- Shipped the launch post.
- Configured custom domain `iamfeelinglow.today`. Added `vercel.json` redirect so the old `iamfeelinglow.vercel.app` 308s to it.
- Added `<link rel="canonical">` pointing to the new domain.
- Renamed "Sumee" → "Sumeet" across homepage, README, CLAUDE.md. Split homepage opening so "Hi, I'm Sumeet." sits on its own line.
- Added `+91` country code to all `tel:` links so the dialer pre-fills the international format.
- Added Open Graph + Twitter meta tags so social-share previews render properly. (No og:image yet — possible follow-up.)
- Added "Back to home" link on the result view, beside the existing "Go back". Tested on phone, working.
- Mobile audit complete on a real phone; only issue found was the missing +91, now fixed.

_Future entries: one-line wins, one-line blockers, one decision per day. Don't pad it._

## later checklist (Sumeet does these on his own time — no nudging)

- [ ] **Refresh cached social previews.** Image and metadata are already live. These validators force the platforms to re-fetch the new card.
  - Twitter card validator: https://cards-dev.twitter.com/validator
  - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
  - Paste `https://iamfeelinglow.today/` into each and click Inspect/Preview.
- [ ] **Read Vercel Analytics dashboard.** First 24h+ of post-launch traffic — visit count, tier-pick rate, per-tier breakdown.
- [ ] **Validate Vandrevala WhatsApp pre-fill on a real phone** if not already done — open Dangerous tier, tap WhatsApp, confirm the message reads "Hi there, I am coming from https://iamfeelinglow.today and my situation is quite dangerous now."
