# llm-wiki-master

Master Obsidian vault for a personal writing system built on the `llm-wiki` pattern.

## Purpose

This vault separates private capture, durable knowledge, and public publishing.

- `raw/` stores immutable source material by domain.
- `wiki/` stores internal knowledge that compounds over time.
- `journal/` stores private daily notes and topic logs.
- `publish/` stores public-ready posts and channel variants.
- `site/` renders `publish/posts/` into the GitHub Pages site.
- `ops/` documents architecture, runbooks, templates, and automation rules.

## Start Here

1. Drop new files into `raw/<domain>/inbox/`.
2. Move durable originals into `raw/<domain>/source/`.
3. Write source summaries into `wiki/sources/<domain>/`.
4. Update canonical knowledge pages in `wiki/entities/<domain>/`, `wiki/concepts/<domain>/`, or `wiki/analyses/<domain>/`.
5. Capture daily work in `journal/daily/YYYY/YYYY-MM-DD.md`.
6. Promote public-worthy ideas into `publish/posts/<domain>/`.
7. Build and preview the public site from `site/`.

## Domains

- `it`
- `english`
- `travel`
- `reading`
- `economy`

## Notes

- Obsidian is the writing and knowledge environment.
- Git is the source of truth for all Markdown content.
- GitHub Pages is the canonical public publishing channel for v1.
- Notion is an operations database, not a source-of-truth editor.
- n8n is reserved for sync and notification workflows.
- Git workflow is trunk-based with `main` as the stable branch and short-lived `codex/*` branches for substantial work.
