---
title: "Building a master vault for private notes, knowledge, and public writing"
slug: "building-a-master-vault"
date: 2026-04-13
domain: it
category: engineering
tags:
  - obsidian
  - llm-wiki
  - github-pages
status: published
summary: "How I separated private capture, durable knowledge, and public publishing inside one master Obsidian vault."
canonical_channel: github-pages
source_notes:
  - "[[ops/blog-architecture]]"
  - "[[ops/publishing-runbook]]"
related_journal_notes:
  - "[[journal/daily/2026/2026-04-13]]"
adsense_ready: false
series: "master-vault"
---

# Building a master vault for private notes, knowledge, and public writing

I wanted one system that could do three jobs at once: capture my day, accumulate knowledge over time, and publish selected ideas without leaking private notes.

## The core problem

Most note systems break when private journaling, source material, and public posts all live in the same bucket. The boundaries get fuzzy, and writing becomes harder because every note feels like it might become public.

## The structure I chose

I split the repository into five layers:

- `raw/` for immutable source material
- `wiki/` for durable knowledge
- `journal/` for private daily and topic notes
- `publish/` for public post source Markdown
- `site/` for the rendered GitHub Pages site

## Why this helps

This structure makes each layer honest about its job. Private notes stay private. Knowledge pages can stay compact and reusable. Public posts can be shaped for readers without changing the underlying knowledge system.

## What happens next

The next steps are straightforward:

- keep capturing daily work in `journal/`
- promote stable insights into `wiki/`
- derive public posts into `publish/posts/`
- let the site render only from the publish layer

## References

- `ops/blog-architecture.md`
- `ops/publishing-runbook.md`
