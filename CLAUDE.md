# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DePix Blog is a multilingual Hugo static site used for SEO content marketing. It publishes educational articles about DePix (a Brazilian stablecoin on the Liquid Network) in Portuguese and English. The blog drives organic traffic to the main app at https://depixapp.com/.

**Live URL**: `https://blog.depixapp.com`
**Main App**: `https://depixapp.com/`
**Stack**: Hugo static site generator, deployed via GitHub Pages with GitHub Actions.

## How to Create a Blog Post

Every post must exist in **both languages**. Create two Markdown files with the same slug:

```
content/pt/posts/<slug-in-portuguese>.md
content/en/posts/<slug-in-english>.md
```

The slugs do NOT need to match between languages — each should be a natural, keyword-rich slug in its own language.

### Frontmatter Template

Every post file must start with this YAML frontmatter:

```yaml
---
title: "Title Here (max 60 characters)"
description: "Meta description for SEO (50-155 characters)"
date: 2026-03-28
tags: ["tag1", "tag2", "tag3"]
author: "DePix"
slug: "descriptive-kebab-case-slug"
draft: false
---
```

**Field rules:**
- `title`: Max 60 characters. Must contain a primary keyword.
- `description`: 50-155 characters. Compelling summary for search engine snippets.
- `date`: ISO format (YYYY-MM-DD). Use the actual publication date.
- `tags`: 2-5 relevant tags as a YAML list.
- `author`: Always `"DePix"`.
- `slug`: Descriptive, kebab-case. Must contain the primary keyword.
- `draft`: Set to `false` for published posts, `true` for work in progress.

## Context Sources

Before writing or editing blog posts, read the following files from sibling repos for up-to-date product context:

- **Landing page & FAQ**: `../depix/index.html` — contains the landing page (`<section data-view="landing">`) and the full FAQ (`<section data-view="faq">`) with 12 `<template>` elements (e.g., `tpl-faq-what-is`, `tpl-faq-deposit`, `tpl-faq-fees`, etc.).
- **Frontend architecture**: `../depix/CLAUDE.md` — overview of the DePix App frontend.
- **Backend architecture**: `../depix-backend/CLAUDE.md` — overview of the API, database schema, and transaction flow.

Use these to ensure blog content is accurate and consistent with the product. If the FAQ answers a question, the blog post should not contradict it.

## Product Facts (DePix App)

These are verified facts about the DePix App. **Blog content must never contradict them.** When in doubt, check the source repos above for the latest information.

### What DePix is
- DePix is a BRL-pegged stablecoin (1 DePix = 1 real) on the Liquid Network (Bitcoin sidechain by Blockstream).
- The DePix App is a web app (PWA) that connects Pix to the Liquid Network.
- **Non-custodial**: users need an external Liquid wallet (e.g., SideSwap) to receive and hold DePix. The app does NOT store user funds.
- Registration requires only an email — no KYC, no documents.
- Two user modes: **merchant** (lojista/autônomo) and **individual** (pessoa física).

### How deposits work
- User chooses an amount → DePix App generates a Pix QR code → user pays from their bank app → DePix is sent to the user's Liquid wallet.
- **Processing time: up to 24 hours (D+1)** — this delay is a security measure to detect fraud/scam reports before releasing crypto.
- Fee: **2% + R$ 0.99** per deposit.
- Limits: **R$ 5 minimum**, **R$ 6,000/day per CPF** maximum.

### How withdrawals work
- User informs value + Pix key → DePix App generates a Liquid address → user sends DePix from their wallet → value is transferred via Pix to bank account.

### Ecosystem
- **SideSwap**: recommended Liquid wallet, also used for swaps (DePix ↔ USDt ↔ L-BTC).
- **P2P.Land / BrSwap.me**: cross-chain swaps (Liquid → Ethereum, Polygon, etc.).
- **Enor Securities**: tokenized securities on Liquid.
- **Kast**: crypto debit/credit card (requires converting to USDT on Polygon first).
- Affiliate program: users earn commission on referrals' deposit volume.

### For merchants
- Customer pays via regular Pix — zero crypto knowledge required on their end.
- Built-in sales reports with date filters, search, and PDF/CSV export.
- No hardware (maquininha) needed — just a cellphone.
- Competitive with debit card rates (2% + R$0.99 vs typical 0.59%–1.99% debit + hardware costs).

### Security
- The 24h deposit delay protects against Pix scams (fake sellers generate QR codes to defraud victims). During this window, fraud reports (MED — Mecanismo Especial de Devolução) can be processed and funds blocked.
- Auth: JWT + PBKDF2 password hashing, HTTPS, no storage of bank credentials.
- Liquid Network: federated sidechain with no single point of failure + Confidential Transactions (hidden amounts).

### Style rules
- Always write **"Pix"** (capitalized, not all-caps "PIX") in all blog content.
- Always write **"DePix"** or **"DePix App"** (never "Depix", "DEPIX", or "de pix").

## Content Rules

- **Minimum 800 words** per post.
- **Use H2 headings** (`##`) to structure the article into clear sections (at least 3-4 H2s per post).
- **Do NOT use H1** — Hugo templates generate H1 from the title.
- **End every post with a CTA** linking to `https://depixapp.com/`. The CTA must reinforce DePix's core positioning: **privacidade e soberania financeira**. Use the template below, podendo variar levemente o texto para manter relevância com o tema do artigo:
  ```markdown
  ## Sua privacidade financeira começa aqui

  Pix tem praticidade — DePix tem privacidade. Pare de expor cada transação ao sistema bancário e comece a usar dinheiro digital que só você controla. Acesse [depixapp.com](https://depixapp.com/).
  ```
  English version:
  ```markdown
  ## Your financial privacy starts here

  Pix has convenience — DePix has privacy. Stop exposing every transaction to the banking system and start using digital money that only you control. Visit [depixapp.com](https://depixapp.com/).
  ```
- **Tone**: Accessible, friendly, educational. Write for non-technical Brazilian users (PT) and international crypto-curious readers (EN). Avoid excessive jargon — when a technical term is necessary, explain it briefly.
- **No promotional hype** — be informative and honest.
- **Images**: If needed, place them in `static/images/` and reference as `/images/filename.png`. But prefer text-only posts unless images add real value.

## SEO Rules

- **Slug**: Always descriptive and in kebab-case. Include the primary keyword. Example: `como-receber-pix-em-bitcoin`, not `post-2`.
- **Keywords**: Include primary keywords in the title, at least one H2, and naturally throughout the body (2-3% density, never forced).
- **Internal links**: Link to other blog posts where relevant. Use relative paths:
  - PT posts: `/pt/posts/slug-here/`
  - EN posts: `/en/posts/slug-here/`
- **External links**: Link to `https://depixapp.com/` in the CTA and anywhere it makes sense. Don't overdo it.
- **Meta description**: Write a unique, compelling description for every post. Never duplicate descriptions across posts.

## Translation Rules

- **Portuguese is the original** — write the PT version first as the primary content.
- **English is adapted, not literally translated** — the EN version should read naturally to a native English speaker. Adapt examples, phrasing, and cultural references. The structure and key points should match, but sentences don't need to be 1:1.
- **Both versions must be independently high quality** — the EN version is not a second-class citizen.

## Publishing

1. Create or edit the Markdown files in `content/pt/posts/` and `content/en/posts/`.
2. Commit and push to `main`.
3. Pushes to `main` run Markdown lint, post validation, and a Hugo build.
4. If all checks pass, GitHub Actions deploys to GitHub Pages automatically.

That's it. No manual build step needed.

## What NOT to Do

- **Do NOT edit Hugo config** (`hugo.toml`) unless explicitly asked.
- **Do NOT edit layouts** in `layouts/` — the theme handles rendering.
- **Do NOT edit theme files** in `themes/`.
- **Do NOT manually update the sitemap** — Hugo generates it automatically.
- **Do NOT add npm/node dependencies** — this is a pure Hugo site.
- **Do NOT change the GitHub Actions workflow** unless explicitly asked.

## Commands

```bash
hugo server -D    # Local dev server with drafts enabled (http://localhost:1313)
hugo              # Build the site to public/
```

Requires Hugo installed locally for preview. Not needed for publishing (CI handles it).

## Local Dev Environment

The blog is also available via the Docker dev environment at `../depix-dev/`:

```bash
cd ../depix-dev && docker compose up -d
# Blog with live reload: http://localhost:2324
```

Content changes reflect automatically via Hugo live reload. See `../depix-dev/CLAUDE.md` for full instructions.

## Git

- **Remote**: `git@github-personal:dadafros/depix-blog.git`
- **SSH key alias**: `github-personal` maps to `~/.ssh/id_ed25519_outlook`
- **Commit as**: `dadafros <davi_bf@outlook.com>`
- **Branch**: Commit directly to `main` unless explicitly asked to branch.
- **Branch naming**: `feat/*` for features, `claude/*` for Claude Code branches.
