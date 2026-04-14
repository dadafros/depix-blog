# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DePix Blog is a multilingual Hugo static site used for SEO content marketing. It publishes educational articles about DePix (a Brazilian stablecoin on the Liquid Network) in Portuguese and English. The blog drives organic traffic to the main app at https://depixapp.com/.

**Live URL**: `https://blog.depixapp.com`
**Main App**: `https://depixapp.com/`
**Stack**: Hugo static site generator, deployed via GitHub Pages with GitHub Actions.

## Code Language

All new code must be written in English — variable names, function names, table/column names, comments, error messages. Existing Portuguese names (e.g., `criado_em`, `valor_centavos`) are not renamed (breaking change), but all new additions must use English.

## How to Create a Blog Post

Every post must exist in **both languages**, and the workflow should stay fully automatic. If the user gives only a topic, you must do the rest: choose the keywords, write the PT version first, adapt it to EN, create the shared article images, fill the frontmatter correctly, validate the result, and commit directly to `main` unless the user says otherwise.

Create two Markdown files:

```
content/pt/posts/<slug-em-portugues>.md
content/en/posts/<slug-in-english>.md
```

The slugs do NOT need to match between languages — each should be a natural, keyword-rich slug in its own language. What must match is the `translationKey`, which links the PT and EN versions as the same article for Hugo and for SEO signals like `hreflang`.

### Frontmatter Template

Every post file must start with this YAML frontmatter:

```yaml
---
title: "Title Here (max 60 characters)"
description: "Meta description for SEO (50-155 characters)"
date: 2026-03-28
lastmod: 2026-03-28
tags: ["tag1", "tag2", "tag3"]
author: "DePix"
slug: "descriptive-kebab-case-slug"
translationKey: "shared-article-key"
image: "/images/posts/shared-article-key/shared-article-key-16x9.png"
images:
  - "/images/posts/shared-article-key/shared-article-key-1x1.png"
  - "/images/posts/shared-article-key/shared-article-key-4x3.png"
  - "/images/posts/shared-article-key/shared-article-key-16x9.png"
draft: false
---
```

**Field rules:**
- `title`: Max 60 characters. Must contain a primary keyword.
- `description`: 50-155 characters. Compelling summary for search engine snippets.
- `date`: ISO format (YYYY-MM-DD). Use the actual publication date.
- `tags`: 2-5 relevant tags as a YAML list. **PT tags must NOT contain accented characters** (use `comparacao` not `comparação`, `seguranca` not `segurança`). Accents cause Hugo to generate duplicate taxonomy pages with different URL encodings.
- `author`: Always `"DePix"`.
- `slug`: Descriptive, kebab-case. Must contain the primary keyword.
- `translationKey`: Shared kebab-case key used by both PT and EN versions of the same article.
- `image`: Primary social/share image. Always point it to the `16x9` variant.
- `images`: Always include the three Google-recommended article image variants: `1x1`, `4x3`, and `16x9`.
- `lastmod`: ISO format (YYYY-MM-DD). Set to the same value as `date` on new posts. **Must be updated to today's date whenever the post content is meaningfully changed** (content edits, new sections, updated facts). Do not update for trivial changes (typo fixes, formatting).
- `draft`: Set to `false` for published posts, `true` for work in progress.

### Required Image Workflow

Every article pair must have a shared image pack stored here:

```
static/images/posts/<translationKey>/<translationKey>-1x1.png
static/images/posts/<translationKey>/<translationKey>-4x3.png
static/images/posts/<translationKey>/<translationKey>-16x9.png
```

When the user gives only a topic, create these images as part of the same workflow. Do not ask the user to create them manually.

Use the [$imagegen](/Users/davifrossard/.codex/skills/.system/imagegen/SKILL.md) skill when image generation is available. If it is unavailable, create clean branded fallback social images yourself so the post still ships with valid SEO metadata, but prefer topic-relevant images whenever possible.

**Google-aligned image rules for article pages:**
- Create **raster** assets (`.png`, `.webp`, `.jpg`, or `.jpeg`), not SVGs as the primary article images.
- The images must be **relevant to the article topic**, not just a generic logo on a blank background.
- Always provide the three aspect ratios Google recommends for articles: `1x1`, `4x3`, and `16x9`.
- Use high-resolution assets suitable for previews. Preferred targets: `1200x1200`, `1200x900`, and `1200x675` or larger in the same ratios.
- Keep the images crawlable under `static/images/posts/...` so they are published as normal site assets.
- Avoid walls of text, tiny unreadable captions, watermarks, fake UI chrome, and anything misleading.
- If you include text, keep it minimal and large enough to survive social preview crops.
- Keep the main subject centered and readable even in tighter crops.

### In-Body Diagrams and Illustrations

Beyond the social/OG image pack, posts should include **visual elements within the article body** to improve engagement, comprehension, and SEO signals (time on page, lower bounce rate).

**When to add visuals:**

- **Tutorial/how-to posts**: Step-by-step flow diagrams (e.g., deposit flow: bank → DePix App → Liquid wallet).
- **Concept explanations**: Comparison diagrams (e.g., DePix vs Pix, privacy levels across systems).
- **Cost/feature comparisons**: Side-by-side cards with color-coded indicators.
- **Decision flows**: Branch diagrams showing multiple paths (e.g., gift card purchase routes).

**Frequency**: Aim for **1 diagram per post** at minimum. Place it after the section it illustrates, not before.

#### Diagram Shortcode (PREFERRED METHOD)

**Always use the `{{</* diagram */>}}` Hugo shortcode** for flowcharts, comparisons, and technical diagrams. This renders HTML/CSS directly in the page, which is **superior to PNG images** for SEO because:

- Text is **indexable by Google** (PNG text is not).
- Diagrams are **responsive** and adapt to any screen size.
- Visual style is **integrated with the blog's dark theme** automatically.
- No external files to manage, compress, or optimize.
- Captions are styled professionally inside the diagram card.

**Do NOT use Mermaid-rendered PNGs** — they look amateur (ugly scrollbars, inconsistent colors, text cutoff, poor integration with the dark theme). Do NOT use `{{</* figure */>}}` with PNG diagrams for flowcharts or comparisons.

**Shortcode usage:**

```markdown
{{</* diagram alt="Descriptive alt text with keywords" caption="Short explanatory caption." */>}}
<div class="d-flow-row">
  <div class="d-step accent">Step 1</div>
  <div class="d-arrow">label</div>
  <div class="d-step dark">Step 2</div>
</div>
{{</* /diagram */>}}
```

**Available CSS classes:**

Step colors (use to convey meaning):
- `d-step accent` — green, for DePix/positive/primary elements
- `d-step dark` — dark card, for neutral steps
- `d-step muted` — subtle gray, for secondary/background elements
- `d-step warn` — orange, for intermediate/caution steps
- `d-step danger` — red, for negative/problem elements
- `d-step success` — green outline, for positive outcomes

Layout types:
- `d-flow-row` — horizontal flow with arrows (wraps on overflow, no scrollbar)
- `d-flow-col` — vertical flow
- `d-compare` — side-by-side comparison cards (grid, stacks on mobile)
- `d-branch` — decision fork with multiple paths
- `d-branch-options` + `d-branch-path` — branch path containers
- `d-branch-label` — small uppercase label for branch paths
- `d-decision` — decision/question box

Arrows: `d-arrow` (horizontal, with optional label text inside), `d-arrow down` (vertical)

Comparison cards: `d-compare-card positive|negative|neutral`, `d-compare-title`, `d-compare-item` (with `<span class="icon">✓|✗|⚠|→</span>`), `d-result` (bold total/conclusion)

**Design rules:**
- The shortcode renders inside a `blog-diagram-card` with rounded corners (16px), the blog's card background, and a subtle border.
- The caption sits inside the card at the bottom with a `border-top` separator — no gap between body and caption.
- Flow rows use `flex-wrap: wrap` + `justify-content: center` — steps wrap to a new line on narrow screens instead of creating a scrollbar.
- Always provide `alt` (descriptive, with keywords) and `caption` (short, informative).
- Captions should be concise (1 sentence) and reinforce the diagram's key takeaway.

**Alt text rules:**
- Every diagram **must** have descriptive alt text via the `alt` parameter.
- Include a relevant keyword naturally — but prioritize describing what the diagram shows.
- Never use "imagem de..." or "image of..." — go straight to the description.

#### Illustrative Images (Photos, Artwork)

For decorative/illustrative images (not technical diagrams), use the `{{</* figure */>}}` shortcode with raster images.

**How to create:**
- Use the [$imagegen](/Users/davifrossard/.codex/skills/.system/imagegen/SKILL.md) skill for AI-generated illustrations when available.
- **Do NOT use $imagegen for technical diagrams** — AI cannot reliably render precise text, arrows, or flowchart layouts. Use the `diagram` shortcode instead.

**Sourcing images from the web:**

When you need a real photo or public-domain illustration, you can search for and download images online.

**⚠️ COPYRIGHT — REGRA ABSOLUTA:**

Usar uma imagem sem licença adequada expõe o projeto a processos judiciais e takedowns. **Na dúvida, não use.** Prefira sempre gerar a imagem em vez de buscar online — imagens geradas são 100% livres de direitos autorais.

- **NUNCA** use imagens do Google Images, Pinterest, Instagram, blogs, sites de notícias ou qualquer fonte que não declare explicitamente uma licença livre.
- **NUNCA** assuma que uma imagem é livre só porque está "na internet" ou "não tem marca d'água".
- **NUNCA** use imagens de bancos pagos (Shutterstock, Getty, Adobe Stock, iStock) — mesmo as previews com marca d'água são protegidas.
- **NUNCA** use logos, marcas registradas ou material de terceiros sem autorização (exceto para fins de informação/educação cobertos por fair use, como mencionar o logo do Pix/Banco Central em contexto educacional).

**Fontes permitidas** — use APENAS estas (busque via WebSearch/WebFetch):

- `unsplash.com` — fotos de alta qualidade, licença livre para uso comercial, sem atribuição obrigatória.
- `pexels.com` — similar ao Unsplash, licença livre para uso comercial.
- `pixabay.com` — fotos, ilustrações e vetores, licença Pixabay (uso comercial livre).
- `commons.wikimedia.org` — mídia em domínio público ou CC. **Verifique a licença específica de cada arquivo** — nem tudo no Wikimedia é livre.

**Antes de usar qualquer imagem da web, verifique:**

1. A licença está explicitamente declarada na página da imagem?
2. A licença permite uso comercial sem restrições?
3. A licença exige atribuição? Se sim, adicione a atribuição conforme regra abaixo.

Se a resposta para 1 ou 2 for "não" ou "não tenho certeza", **não use a imagem**. Gere uma alternativa com $imagegen ou o shortcode `diagram`.

**Regras de uso após verificação de licença:**

- Use WebSearch para encontrar imagens nas fontes permitidas com keywords específicas (e.g., `site:unsplash.com brazilian currency digital payment`). Use WebFetch para baixar.
- **Nunca hotlink** — sempre baixe a imagem e commite no repo em `static/images/posts/<translationKey>/`.
- **Renomeie** para nomes semânticos: `pagamento-digital-smartphone.jpg`, não `photo-1234567.jpg`.
- **Comprima** para < 200 KB. Prefira WebP.
- **Atribuição**: Se a licença exigir (CC-BY), adicione caption: `Foto: [Autor] via [Fonte] (CC-BY 4.0)`.
- **Relevância > beleza**: Imagem mediocre mas relevante > foto linda mas genérica.

### Automatic Publishing Flow

When asked to create a new post from only a topic, follow this order without unnecessary follow-up questions:

1. Read the context sources in sibling repos.
2. Define the PT slug, EN slug, and a shared `translationKey`.
3. Write the PT article first.
4. Write the EN version as a natural adaptation.
5. Create the three shared article images under `static/images/posts/<translationKey>/`.
6. Fill `image` and `images` in both frontmatters using those files.
7. Add at least one `{{</* diagram */>}}` shortcode per post with a relevant flowchart, comparison, or process diagram using HTML/CSS classes. See "In-Body Diagrams and Illustrations" section for available classes and design rules.
8. Add footnote references to official sources (see "Reference Citations" below).
9. Run the SEO audit checklist (see "Pre-Publication SEO Audit" below).
10. Run validation/build checks.
11. Commit and push directly to `main` unless the user explicitly asks for a branch or PR.

### Reference Citations

Every post must include numbered footnote references linking to authoritative external sources. This is critical for EEAT (Experience, Expertise, Authoritativeness, Trustworthiness) signals, especially for YMYL content about finances, taxes, investment, or security.

**Format:**

1. In the body text, use superscript numbers (`¹`, `²`, `³`, etc.) immediately after the claim or fact being sourced.
2. At the end of the post, add a `## Referências` (PT) or `## References` (EN) section **before** the final CTA section.
3. Each reference is a numbered list item with the source name and a hyperlink:

```markdown
## Referências

1. [Banco Central — Regulamento do Pix](https://www.bcb.gov.br/estabilidadefinanceira/pix)
2. [Blockstream — Liquid Network: visão geral técnica](https://docs.blockstream.com/liquid/technical_overview.html)
3. [Receita Federal — Declaração de criptoativos](https://www.gov.br/receitafederal/pt-br)
```

**Source criteria (in order of preference):**

1. **Official government sources**: Banco Central, Receita Federal, CVM, SEC, IRS — for regulatory/tax/legal claims.
2. **Official technical documentation**: Blockstream docs, Bitcoin whitepaper, protocol specs — for technical claims about Liquid, Bitcoin, cryptography.
3. **Product official pages**: depixapp.com, sideswap.io, enorsecurities.com — for product-specific facts (fees, limits, features).
4. **Recognized news/research portals**: major financial newspapers, academic papers, industry reports — for market data, statistics, trends.

**Rules:**

- Every post must have **at least 2 references**, regardless of topic.
- YMYL posts (finances, taxes, investment, security) must have **at least 3 references** including at least one official government or regulatory source.
- Only cite sources you can verify exist. Do not invent URLs or reference pages that may not exist.
- Prefer primary sources over secondary commentary (e.g., link to the actual BCB regulation, not a blog post about the regulation).
- References in PT and EN versions may differ — use the most relevant source for each language's audience (e.g., Receita Federal for PT, IRS for EN when discussing taxes).
- Superscript numbers in the body should appear at the end of the specific sentence or clause being sourced, not at the end of a paragraph.

### Pre-Publication SEO Audit

Before committing any new or updated post, verify every item on this checklist. Do not skip items — each one addresses a real SEO issue found in past audits.

**Frontmatter:**

- [ ] `title` is ≤ 60 characters and contains the primary keyword
- [ ] `description` is 50–155 characters, unique across all posts, and compelling for search snippets
- [ ] `slug` is descriptive kebab-case containing the primary keyword
- [ ] `tags` has 2–5 entries; PT tags have **no accented characters**
- [ ] `translationKey` matches between PT and EN versions
- [ ] `image` and `images` point to existing files under `static/images/posts/<translationKey>/`
- [ ] `date` is set to the actual publication date (ISO format)
- [ ] `lastmod` is present and set to the publication date (new posts) or today's date (updated posts)
- [ ] `draft` is `false` for posts intended to be published

**Content structure:**

- [ ] Post has ≥ 800 words
- [ ] Uses only H2 (`##`) for sections — no H1, no skipped heading levels (H2 → H4)
- [ ] At least 3–4 H2 sections with clear, descriptive headings
- [ ] Primary keyword appears in at least one H2 heading
- [ ] Primary keyword density is 2–3% (natural, never forced)
- [ ] At least one `{{</* diagram */>}}` shortcode with `alt` text containing natural keywords and a `caption`
- [ ] Final section is the CTA linking to `https://depixapp.com/`

**References:**

- [ ] Post has a `## Referências` (PT) / `## References` (EN) section before the CTA
- [ ] At least 2 references (3+ for YMYL content)
- [ ] YMYL posts include at least one official government/regulatory source
- [ ] Superscript footnote numbers (`¹`, `²`) in the body match the numbered references
- [ ] All reference URLs are real and point to authoritative sources

**Internal linking:**

- [ ] Links to at least 1–2 other blog posts where relevant
- [ ] Internal links use relative paths: `/posts/slug/` (PT), `/en/posts/slug/` (EN)
- [ ] No broken internal links (referenced posts exist)
- [ ] External link to `https://depixapp.com/` in the CTA (and elsewhere if natural)

**Translation pair:**

- [ ] Both PT and EN versions exist with matching `translationKey`
- [ ] EN version reads naturally (adapted, not literally translated)
- [ ] Both versions share the same image pack
- [ ] Both versions have their own References section with language-appropriate sources

**Technical:**

- [ ] `npx --yes markdownlint-cli2@0.18.1 "content/**/*.md"` passes with 0 errors
- [ ] `hugo` builds with no errors or warnings
- [ ] No accented characters in PT tag values

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

### Asset positioning & editorial honesty

Blog posts must be precise and honest about the role of each asset/tool. Never oversimplify or diminish one to promote another. Educate readers so they can choose the right tool for each use case.

- **Bitcoin (BTC)**: The best asset for financial sovereignty and permissionless money. Has proven itself as the best store of value over the past two decades. **Never** call Bitcoin a "proof of concept", "experiment", or imply it is outdated/superseded. Its limitations are specific: transactions are public on-chain (weak privacy) and its price volatility makes it impractical for everyday payments.
- **L-BTC (Liquid Bitcoin)**: Bitcoin on the Liquid Network. Inherits Bitcoin's sovereignty with superior privacy via Confidential Transactions. Trade-off: the Liquid Network is operated by a federation, making it more centralized than mainchain Bitcoin. Always acknowledge this trade-off when discussing Liquid.
- **DePix**: A stablecoin pegged to the Brazilian real — designed for **sovereign, private payments**, not for accumulation. DePix is **not a store of value** (the real loses purchasing power to inflation). Its strengths over Pix/traditional banking are privacy and self-custody. Posts should explicitly tell readers: use Bitcoin for long-term savings, use DePix for day-to-day spending with privacy.
- **General rule**: Each tool in the ecosystem solves a different problem. Posts must help readers understand which tool fits which need, not push a single narrative. Be honest about trade-offs (centralization, volatility, inflation exposure, privacy levels).

### Naming: DePix vs DePix App

These are two different things — never confuse them:

- **DePix**: The stablecoin itself (the digital asset, 1 DePix = 1 BRL, on the Liquid Network). Use "DePix" when referring to the token, the currency, or the asset.
- **DePix App**: The application/platform that lets users buy, sell, and manage DePix. Use "DePix App" when referring to the product, the team, the website, the blog, or the service.

Examples:
- "O DePix App Blog é mantido pela equipe do DePix App." (the blog belongs to the app/company)
- "Equipe DePix App" / "DePix App Team" (the team runs the app, not the coin)
- "Compre DePix usando o DePix App." (buy the coin using the app)
- "DePix é uma stablecoin na Liquid Network." (the coin is a stablecoin)

**Common mistakes to avoid:**
- "Equipe DePix" — wrong, it's "Equipe DePix App" (the team is behind the app)
- "DePix blog" — wrong, it's "DePix App Blog"
- Using "DePix App" when referring to the stablecoin itself

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
- **Images are required for every post pair**: place them under `static/images/posts/<translationKey>/` and reference them through `image` and `images` in frontmatter.
- **Do not skip article images** — they are part of the publishing workflow, not an optional extra.
- **YMYL sourcing**: Posts about finances, taxes, investment, or security (**YMYL** — Your Money or Your Life) must cite official sources. Use numbered superscript footnotes in the body text (e.g., `¹`, `²`) that point to a "Referências" (PT) / "References" (EN) section at the end of the post. Only use authoritative sources: official government sites (Receita Federal, Banco Central), recognized news portals, official technical documentation, and specialized publications. Prefer primary sources over secondary commentary.
- **About page**: The blog has an About page at `/about/` (PT) and `/en/about/` (EN). The author byline in posts links to this page automatically via the template.

## SEO Rules

- **Slug**: Always descriptive and in kebab-case. Include the primary keyword. Example: `como-receber-pix-em-bitcoin`, not `post-2`.
- **Keywords**: Include primary keywords in the title, at least one H2, and naturally throughout the body (2-3% density, never forced).
- **Internal links**: Link to other blog posts where relevant. Use relative paths:
  - PT posts: `/posts/slug-here/`
  - EN posts: `/en/posts/slug-here/`
- **External links**: Link to `https://depixapp.com/` in the CTA and anywhere it makes sense. Don't overdo it.
- **Meta description**: Write a unique, compelling description for every post. Never duplicate descriptions across posts.
- **Diagram SEO**: Every post must have at least one `{{</* diagram */>}}` shortcode with descriptive `alt` text containing natural keywords and a concise `caption`. Use the HTML/CSS diagram shortcode (not PNG images) for flowcharts and comparisons — the text is indexable by Google. For illustrative photos, use `{{</* figure */>}}` with raster images and descriptive alt text.

## Translation Rules

- **Portuguese is the original** — write the PT version first as the primary content.
- **English is adapted, not literally translated** — the EN version should read naturally to a native English speaker. Adapt examples, phrasing, and cultural references. The structure and key points should match, but sentences don't need to be 1:1.
- **Both versions must be independently high quality** — the EN version is not a second-class citizen.
- **Both versions must share the same `translationKey` and image pack** — only the localized text and slug differ.

## Publishing

1. Create or edit the Markdown files in `content/pt/posts/` and `content/en/posts/`.
2. Create the shared article images in `static/images/posts/<translationKey>/`.
3. **Run `npx --yes markdownlint-cli2@0.18.1 "content/**/*.md"` and fix any errors before committing.** This is the same linter that CI runs — never push without passing it locally first.
4. Commit and push to `main`.
5. Pushes to `main` run Markdown lint, post validation, and a Hugo build.
6. If all checks pass, GitHub Actions deploys to GitHub Pages automatically.

That's it. No manual build step needed.

## What NOT to Do

- **Do NOT edit Hugo config** (`hugo.toml`) unless explicitly asked.
- **Do NOT edit layouts** in `layouts/` — the theme handles rendering.
- **Do NOT edit theme files** in `themes/`.
- **Do NOT manually update the sitemap** — Hugo generates it automatically.
- **Do NOT add npm/node dependencies** — this is a pure Hugo site.
- **Do NOT change the GitHub Actions workflow** unless explicitly asked.
- **Do NOT use accented characters in PT tags** — causes duplicate taxonomy pages in Hugo (one with accent, one without).
- **Do NOT set `defaultContentLanguageInSubdir = true`** in `hugo.toml` — PT content must serve from the domain root, not from `/pt/`.
- **Do NOT remove the `cp public/index.html public/pt/index.html` step** from the CI workflow — Hugo generates a redirect alias at `/pt/index.html` that causes a redirect loop with CDN caches during deploy. The copy overwrites it with the real homepage.

## Commands

```bash
hugo server -D    # Local dev server with drafts enabled (http://localhost:1313)
hugo              # Build the site to public/
npx --yes markdownlint-cli2@0.18.1 "content/**/*.md"  # Lint all posts
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
- **Branch**: Commit and push directly to `main` unless explicitly asked to branch.
- **Branch naming**: `feat/*` for features, `claude/*` for Claude Code branches.
