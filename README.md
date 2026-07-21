# SaudaBook — explainer site

A standalone marketing/explainer page for **SaudaBook**, the deal book for
Indian real-estate brokers and property agents.

> **Every buyer, scored to every flat.** — pricing on discovery, subscription basis

This is *not* the product UI. It is a polished, self-contained landing page that
makes the idea instantly clear to a non-technical broker and to an investor
skimming for 30 seconds.

## What the product does

A broker's edge is memory — who wants what, which listing fits whose budget, who
to call back first. SaudaBook turns that memory into a real deal book:

- **0–100 match scoring** — every buyer scored against every listing on property
  type, budget fit, area, deal and BHK, with the reasons spelled out.
- **Hot matches** — pairs scoring 70+ surface at the top, each with its "why".
- **Site-visit scheduling** — book a visit off any match; a WhatsApp confirmation
  with the address and asking price is staged in the outbox.
- **Follow-ups that don't slip** — dated follow-ups per buyer; overdue ones light
  up; one click nudges everyone due today and never double-sends.
- **Deal pipeline by stage** — leads → visits planned → visited → closed.
- **Dashboard** — hot matches, visits lined up, follow-ups due, pipeline counts.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page markup — all sections, inline SVG only. |
| `styles.css` | All styling. Palette built around the amber accent `#ca8a04`. |
| `app.js` | Sticky-nav highlight, smooth scroll, and the animated hero "match card" that scores a buyer and drives the visit. No dependencies. |
| `favicon.svg` | Deal-book mark. |
| `og.svg` / `og.png` | 1200×630 social share card. |

## Design notes

- Palette: amber accent `#ca8a04`, deep warm-black ink, off-white deal-book paper,
  a soft gold tint, plus a green for hot matches / closed and a red for overdue
  follow-ups.
- **Signature:** match scores are set in tabular monospace, so the whole page
  reads like a scored deal book. The hero widget is a live match card where the
  top buyer scores 100 and the site visit is booked and confirmed.
- Fully self-contained: no CDNs, no external fonts, images or scripts. System
  font stack only. Renders correctly opened as a local `file://` and deploys to
  any static host unchanged.
- Responsive down to mobile with no horizontal page scroll; the wide dashboard
  table scrolls inside its own container.
- Respects `prefers-reduced-motion` (the hero animation freezes on its end-state).

## Run it

Just open `index.html` in a browser. No build step. To serve locally:

```sh
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploy

Pushed to GitHub Pages via the workflow in `.github/workflows/deploy-pages.yml`
(GitHub Actions Pages, `.nojekyll` so files are served verbatim). Also deploys to
any static host (Netlify, Cloudflare Pages, S3) with no configuration.

---

A **KARYA** studio build · sreeni.nintendo@gmail.com
