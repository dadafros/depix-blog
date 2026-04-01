# DePix Blog

The official blog for [DePix App](https://depixapp.com/) — a non-custodial platform that connects Brazil's Pix payment system to the Liquid Network.

**Live:** [blog.depixapp.com](https://blog.depixapp.com/)

## About

This blog publishes educational content about DePix, financial privacy, and the Liquid Network ecosystem. All posts are written in both Portuguese and English, targeting non-technical Brazilian users and international crypto-curious readers.

**Core positioning:** *Pix tem praticidade. DePix tem privacidade.*

## Stack

| Component | Technology |
|-----------|-----------|
| Static site generator | [Hugo](https://gohugo.io/) |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |
| Languages | Portuguese (default) + English |
| Dependencies | None (zero npm, zero frameworks) |

## Features

- **Bilingual** — every post exists in PT and EN with independent, high-quality content
- **Client-side search** — JSON index per language with fuzzy matching and relevance scoring
- **Tag filtering** — filter posts by tag on the homepage
- **Table of Contents** — collapsible, auto-generated from H2/H3 headings
- **Related posts** — matched by shared tags at the bottom of each article
- **SEO optimized** — Open Graph, Twitter Cards, JSON-LD schema, sitemap, hreflang alternates
- **Dark fintech theme** — custom design, mobile-first, no external CSS/JS frameworks

## Content

14 posts per language covering:

| Category | Posts |
|----------|-------|
| Getting started | What is DePix, How to convert crypto to reais |
| Privacy & sovereignty | Financial privacy, Sovereign individual & permissionless money |
| Comparisons | DePix vs traditional Pix |
| Security | How DePix protects against scams |
| Use cases | Crypto cards, Gift cards, Invest in Bitcoin & tokenized stocks, International remittances, Pix payments without bank account, Private P2P payments |
| For business | Crypto business account, Affiliate program |

## Project structure

```
depix-blog/
├── content/
│   ├── pt/posts/          # Portuguese articles
│   └── en/posts/          # English articles
├── layouts/
│   ├── _default/
│   │   ├── baseof.html    # Base template (head, meta, scripts)
│   │   ├── single.html    # Post page (ToC, related posts, nav)
│   │   ├── list.html      # Section listing
│   │   └── index.json     # Search index template
│   ├── partials/          # Header, footer
│   └── index.html         # Homepage (search, tag filter, post list)
├── assets/
│   ├── css/style.css      # All styles (dark fintech theme)
│   └── js/blog.js         # Search, tag filter, ToC, back-to-top
├── static/                # Icons, verification files
├── hugo.toml              # Hugo configuration
└── CLAUDE.md              # AI assistant instructions
```

## Development

```bash
# Local dev server with drafts
hugo server -D

# Build to public/
hugo
```

Requires [Hugo](https://gohugo.io/installation/) (extended edition recommended).

## Publishing

Push to `main` runs Markdown lint, post validation, and a Hugo build. If all checks pass, GitHub Actions deploys automatically. No manual build step needed.

## Related repositories

| Repo | Description |
|------|-------------|
| [depix](https://github.com/dadafros/depix) | DePix App frontend (vanilla JS PWA) |
| [depix-backend](https://github.com/dadafros/depix-backend) | DePix API (Vercel serverless) |

## License

All rights reserved. Content is proprietary to DePix App.
