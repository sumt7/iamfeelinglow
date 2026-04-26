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
- Expanded the Dangerous tier from 3 to 7 verified hotlines (added Tele-MANAS, 7 Cups, Befrienders, 988). Updated Vandrevala number to verified `+91 9999 666 555` and added a WhatsApp pre-fill so the user lands in chat with a draft message ready.
- OG image iterated 4 times: text-only → watercolor + "open me" CTA → calm typography → final author-quote card with the homepage's strongest line ("I built the thing I wish someone had given me. — Sumeet"). Aligned title, description, og:* and twitter:* meta to match.
- Added JSON-LD `WebApplication` structured data in `<head>` for SEO/AIO/GEO — names creator, declares free + accessible, lists hotlines.
- Shipped `sitemap.xml`, `robots.txt`, and a small SVG favicon (italic serif "i" on dusk-blue).
- Added a subtle `<noscript>` fallback near the Start button.
- Cleaned up `.gitignore` (now ignores node_modules, package*.json, .vercel, .agents, handbook backups).
- Set up a Stop-hook in `~/.claude/settings.json` that plays the Windows Asterisk sound when Claude finishes a turn.
- **Built v2 — guided 4-question check-in at `/v2`.** Same stack, same styles, same crisis floor. Scoring maps Q1+Q2+Q3 (range 2–8) to the existing 4 tiers; Q4=Yes overrides to Dangerous. Decision: don't link from `/` → `/v2`. The two surfaces serve two audiences (letter readers vs. search arrivals via "feeling low quiz" type queries).

_Future entries: one-line wins, one-line blockers, one decision per day. Don't pad it._

## later checklist (Sumeet does these on his own time — no nudging)

- [ ] **Refresh cached social previews.** Image and metadata are already live. These validators force the platforms to re-fetch the new card.
  - Twitter card validator: https://cards-dev.twitter.com/validator
  - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
  - Paste `https://iamfeelinglow.today/` into each and click Inspect/Preview.
- [ ] **Read Vercel Analytics dashboard.** First 24h+ of post-launch traffic — visit count, tier-pick rate, per-tier breakdown.
- [ ] **Validate Vandrevala WhatsApp pre-fill on a real phone** if not already done — open Dangerous tier, tap WhatsApp, confirm the message reads "Hi there, I am coming from https://iamfeelinglow.today and my situation is quite dangerous now."
- [ ] **Delete the redundant `preview-seo-tagline` branch on GitHub** when convenient: `! git push origin --delete preview-seo-tagline`.

## improvement queue (both versions, v1-only, v2-only)

Track ideas as one-liners. Move to a side branch when actively working. See CLAUDE.md "Two versions: v1 and v2" for which file owns what and the workflow.

### Both versions (changes need to land in `index.html` AND `v2/index.html`)

- [ ] _(empty — add ideas here)_

### v1 only (`index.html` + `app.js`)

- [ ] _(empty — add ideas here)_

### v2 only (`v2/index.html` + `v2/app.js`)

- [ ] _(empty — add ideas here)_

### Cross-cutting / infrastructure

- [ ] _(empty — add ideas here, e.g. analytics, hosting, fonts, etc.)_
