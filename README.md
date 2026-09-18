# CODING AGENTS: READ THIS FIRST

This is a **handoff bundle** from Claude Design (claude.ai/design).

A user mocked up designs in HTML/CSS/JS using an AI design tool, then exported this bundle so a coding agent can implement the designs for real.

## What you should do — IMPORTANT

**Read the chat transcripts first.** There are 1 chat transcript(s) in `chats/`. The transcripts show the full back-and-forth between the user and the design assistant — they tell you **what the user actually wants** and **where they landed** after iterating. Don't skip them. The final HTML files are the output, but the chat is where the intent lives.

**Read `project/Pig.ai Website.dc.html` in full.** The user had this file open when they triggered the handoff, so it's almost certainly the primary design they want built. Read it top to bottom — don't skim. Then **follow its imports**: open every file it pulls in (shared components, CSS, scripts) so you understand how the pieces fit together before you start implementing.

**If anything is ambiguous, ask the user to confirm before you start implementing.** It's much cheaper to clarify scope up front than to build the wrong thing.

## About the design files

The design medium is **HTML/CSS/JS** — these are prototypes, not production code. Your job is to **recreate them pixel-perfectly** in whatever technology makes sense for the target codebase (React, Vue, native, whatever fits). Match the visual output; don't copy the prototype's internal structure unless it happens to fit.

**Don't render these files in a browser or take screenshots unless the user asks you to.** Everything you need — dimensions, colors, layout rules — is spelled out in the source. Read the HTML and CSS directly; a screenshot won't tell you anything they don't.

## Bundle contents

- `README.md` — this file
- `chats/` — conversation transcripts (read these!)
- `project/` — the `Design system setup` project files (HTML prototypes, assets, components)

---

## Implementation

The design above has been implemented as a real Next.js app at the repo root (`app/`, `components/`,
`lib/`). The original prototype files in `project/` are kept for reference only and are not part of
the build.

**Stack:** Next.js 15 (App Router, TypeScript), no CSS framework — styles closely mirror the
prototype's inline styles plus a small `app/globals.css` for hover/active states, keyframe
animations and responsive breakpoints. Fonts (Bricolage Grotesque, Figtree) load via
`next/font/google`.

**Routes:** `/`, `/services`, `/pricing`, `/ask-pig`, `/contact` — real routes with per-page
metadata/OG tags (see each route's `layout.tsx` or `page.tsx`).

**Pricing engine:** `lib/catalogue.js` is the original `catalogue.js` verbatim (services,
packages, prices, the guided-questionnaire rule engine, and `buildPlanView` for rendering a
computed plan). It's imported by both the client (guided mode) and the server (`/api/advisor`,
AI mode) so prices are always computed here — never by the model.

**Ask Pig advisor:**
- *Guided mode* runs entirely client-side (`lib/advisor-context.tsx`) — fixed questions, no
  network call, matches the original's "no AI involved" guided path.
- *Live AI mode* posts the conversation to `app/api/advisor/route.ts`, which calls the Anthropic
  API server-side (`claude-opus-5`) to draft a reply/question or propose service ids, then
  computes the actual plan and prices from `lib/catalogue.js` before returning it to the client.
  The model never sets a price.
- If the API call fails (including a missing key), the UI shows a friendly error with **Try
  again** / **Use guided questions** — the site works end-to-end with zero configuration.

### Deploying to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket and import it in Vercel (framework preset:
   Next.js — auto-detected).
2. In Project Settings → Environment Variables, add `ANTHROPIC_API_KEY` (from
   [console.anthropic.com](https://console.anthropic.com)) to enable Live AI mode. Without it,
   the site still works fully in guided mode.
3. Deploy. No other configuration is required — `next build` / `next start` are the default
   commands.

For local development: `npm install`, copy `.env.local.example` to `.env.local` and fill in
`ANTHROPIC_API_KEY` (optional), then `npm run dev`.

### Known gaps vs. the design

- The two demo videos ("3 ways", "Google vs ChatGPT") are still placeholder slots on the Home
  page, as in the original — the source `.mp4` files were never included in this bundle.
- Images are plain `<img>` tags rather than `next/image` (Next's build lint warns on this); this
  keeps `clamp()`-based fluid sizing identical to the source and avoids Vercel's image
  optimization billing by default — swap in `next/image` later if that tradeoff should flip.
