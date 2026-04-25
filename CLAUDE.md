# IamFeelingLow

## What this is

A single-page web tool for people who are feeling low. One question: how bad is it right now? Four honest answers. One action matched to the severity level.

Built by Sumeet, who lost his father on Feb 9, 2024, and went through the lowest points himself before building this.

The wedge: most mental wellness content is written for mild severity and handed to everyone. This product matches the intervention to the severity. Flat gets environment change. Heavy gets other-directed action. Drowning gets physical exhaustion. Dangerous gets a human on the phone.

## Non-negotiables (never compromise on these)

1. **No signup. No personal data stored. No payment. Ever.** Not now, not later. This is the promise on the homepage and it must be true. Anonymous, cookieless page-view counts via Vercel Analytics are allowed (no IPs stored, no cross-site tracking, no per-user identifiers). Anything that crosses into individual identification is out.
2. **The "Dangerous" tier routes to real crisis hotlines.** It must be visible in the footer of every page, not just the result card. Numbers must be verified before launch.
3. **No traffic-light colors for severity.** Do not use red for Dangerous, yellow for Heavy, etc. Someone at Dangerous does not need an alarm — they need a calm hand. All severity tiers use the same palette. Severity is communicated through copy, not color.
4. **No emoji in the product copy.** No upbeat marketing language. Never use "journey," "wellness," "super," "happy," or exclamation marks in severity-related copy.
5. **Respects `prefers-color-scheme: dark`** from day one. Most users will be using this late at night.
6. **Works with JavaScript disabled** for the core content. The home page should render as static HTML. Only the severity selector uses JS.

## Voice and tone

Plainspoken. Direct. Warm but not performative. Short sentences. The writing sounds like a letter, not a product.

If a line could appear in a generic meditation app, rewrite it. If it makes a reader feel slightly uncomfortable with how honest it is, keep it.

## Homepage copy (exact, do not paraphrase)

> Hi, I'm Sumeet.
>
> My father gave me this name. He died on Feb 9, 2024. I'm an only child.
>
> In the months after, I was low enough, more than once, that I thought about not being here.
>
> Reading every book and thread about "feeling low," I noticed almost all of it is written for one severity — mild — and handed to everyone. A walk and a journal prompt don't work when you're drowning. They insult you.
>
> So I built the thing I wish someone had given me.
>
> One question: how bad is it right now?
> Four honest answers.
> One action for each, matched to the level.
>
> No signup. No personal data stored. Ever.
>
> [ Start ]

Footer, italic, small:

> If you're thinking about hurting yourself, please call someone now. India: iCall 9152987821, Vandrevala 1860-2662-345. Outside India: findahelpline.com

## Severity taxonomy (the four tiers)

Each tier needs three pieces: the label, the italic subjective description (first-person, the way it actually feels), and the one action with a 2-3 sentence rationale in Sumeet's voice.

### Flat
*"I'm functioning but something's off. The color is drained out of things."*

**Action: Go outside for 15 minutes. No phone.**

Walk somewhere with trees or sky if you can. This tier responds to sensory input. You're not broken — your system is under-stimulated and over-thinking. The outside world is the quickest reset.

### Heavy
*"Getting through today feels like wading. I can do it but every task costs more than it should."*

**Action: Do one small thing for a stranger.**

Buy fruit from the vendor you usually walk past. Leave a bag of food where it'll be found. Tip someone more than you should. Heavy lifts when you briefly stop being the main character in your own head — and giving something small, physically, does that faster than thinking your way out.

### Drowning
*"I can't see a way through. I've been here for days and I don't trust that it'll pass."*

**Action: Move your body hard enough that it hurts a little. Then call one person.**

Run until you're out of breath. Pushups until your arms shake. Climb stairs. This tier doesn't respond to insight — your thoughts are the problem, not the solution. Physical exhaustion is the only thing that reliably quiets a mind at this level for an hour. Use that hour to call one person. Just one.

### Dangerous
*"I'm thinking about not being here anymore."*

**Don't do this alone. Please.**

- iCall (India): 9152987821
- Vandrevala Foundation (India, 24/7): 1860-2662-345
- Outside India: findahelpline.com

This tier is not something to journal through or walk off. It's a call. Make it. I've been here. The person on the other end isn't going to judge you, and the call itself is what breaks the spiral.

## Color palette — Option C (Dusk blue)

Represents late evening — the time most people are actually at their lowest.

### Light mode
- Background: `#EEF1F4` (pale sky)
- Primary text: `#1F2A3A` (deep navy)
- Secondary text: `#6B7585` (slate grey)
- Accent (buttons, links): `#C4854A` (soft amber)
- Hairline divider: `#D8DDE4`

### Dark mode
- Background: `#141821` (near-black navy)
- Primary text: `#D8DEE7` (pale slate)
- Secondary text: `#8B95A5` (muted slate)
- Accent: `#D89A5F` (warmer amber for dark backgrounds)
- Hairline divider: `#252C39`

Use CSS custom properties under `:root` and `@media (prefers-color-scheme: dark)` so the OS setting flips automatically.

## Typography

- Body: a serif from Google Fonts. Preferred order: **Lora**, then Source Serif Pro, then EB Garamond. Fall back to Georgia.
- Size: 17px base on desktop, 16px on mobile.
- Line height: 1.65 for body paragraphs. Do not go tighter.
- Content column: max-width 580px, centered on desktop. Full-width with 24px side padding on mobile.
- No text above 28px anywhere. This is not a marketing site. There are no "hero" headlines.
- Button: same serif as body, not sans-serif. 15px. No uppercase. No letter-spacing above 0.02em.

## Tech stack

Keep it boring. Keep it fast.

- **Plain HTML, CSS, vanilla JS.** No framework. No build step. No node_modules.
- Single page: `index.html`. Severity selection and result rendering handled with vanilla JS + DOM updates. No routing.
- No fonts except Google Fonts (Lora). Load with `<link>` in `<head>`, with `font-display: swap`.
- No images. This site has no images. The writing is the product.
- No external JS libraries. No jQuery. The only third-party script is Vercel's anonymous, cookieless analytics tag (`/_vercel/insights/script.js`) — added inline in `index.html`, no npm dependency.

## File structure

```
iamfeelinglow/
├── index.html       # Entire app: home + severity selector + result views
├── styles.css       # Palette, typography, layout
├── app.js           # Severity selection, view switching
├── CLAUDE.md        # This file
└── README.md        # Project readme for GitHub
```

## UX flow

1. User lands on home. Reads the copy. Clicks "Start."
2. "Start" reveals (does not navigate away from) the severity question: "How bad is it right now?" with four options shown as cards in a vertical stack: Flat / Heavy / Drowning / Dangerous.
3. User clicks their tier. The four cards are replaced by the single result card for that tier — italic subjective description, bold action, rationale paragraph.
4. Below the result card: a small "Go back" link (not button, link) in case they picked wrong.
5. Crisis footer is always visible, on every view.

All transitions are instant. No animations longer than 150ms. No fade effects on the result card — just show it.

## What not to add (resist the urge)

- No "feedback" form. No "share your story" section. No testimonials.
- No newsletter signup. No "bookmark this page" prompts.
- No "rate how you're feeling after" survey.
- No illustrations, no photos, no icons inside severity cards.
- No copy that says "you're not alone" — it's become meaningless through overuse.
- No dark-pattern "are you sure you want to leave?" modals.

Every addition dilutes the product. The minimalism is the design.

## Deploy

Vercel or Cloudflare Pages. Both free. Both fast in India. Connect the GitHub repo, deploy on push. Custom domain when ready.

# AI Weekender context

This project is part of the GrowthX AI Weekender sprint.

The full handbook lives at `./handbook/` — read files from there when the user asks about:
- ideas, tracks, difficulty (see `./handbook/06-pick-an-idea.md`)
- rubric, scoring, bonus points, tie-breakers (see `./handbook/09-scoring.md`)
- setup, Claude Code install, accounts (see `./handbook/04-setup.md`)
- skills Claude uses while building (see `./handbook/05-skills.md`)
- the build pipeline: local → github → vercel → user (see `./handbook/07-build-pipeline.md`)
- the build process: scope → POC → build (see `./handbook/08-build-process.md`)
- day-by-day outcomes (see `./handbook/02-how-the-week-runs.md`)

When in doubt, start at `./handbook/README.md` for the index.

To update the handbook later, the user re-runs:
  curl -fsSL https://raw.githubusercontent.com/GrowthX-Club/ai-weekender-handbook/main/install.sh | bash

Writing style for this project: lowercase headings, direct, no corporate tone.

# AI Weekender coaching mode

`./weekender.md` is the participant's working file for the sprint — their
track, idea, first user, stage, live URL, metrics, daily log. Read it at the
start of every session before giving coaching or build advice. Update the
"live state" and "daily log" sections as new facts land (URL shipped, stage
shifted, metric moved, decision made).

The participant writes and owns this file. Do not fill in their thinking for
them — same rule as the scope doc (`./handbook/08-build-process.md`). Ask,
don't assume. If a section is blank, probe for the answer; don't invent it.

Triggers that should make you re-read `./weekender.md` first:
"coach me", "check in", "where are we", "where am I", "what's next".
