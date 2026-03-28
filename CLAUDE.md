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

## Content Rules

- **Minimum 800 words** per post.
- **Use H2 headings** (`##`) to structure the article into clear sections (at least 3-4 H2s per post).
- **Do NOT use H1** — Hugo templates generate H1 from the title.
- **End every post with a CTA** linking to `https://depixapp.com/`. Example:
  ```markdown
  ## Comece a usar o DePix agora

  Acesse [depixapp.com](https://depixapp.com/) e faça seu primeiro depósito em minutos.
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
3. GitHub Actions builds the Hugo site and deploys to GitHub Pages automatically.

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

## Git

- **Remote**: `git@github-personal:dadafros/depix-blog.git`
- **SSH key alias**: `github-personal` maps to `~/.ssh/id_ed25519_outlook`
- **Commit as**: `dadafros <davi_bf@outlook.com>`
- **Branch**: Commit directly to `main` unless explicitly asked to branch.
- **Branch naming**: `feat/*` for features, `claude/*` for Claude Code branches.
