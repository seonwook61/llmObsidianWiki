# Master Vault Policy

This vault uses an extended `llm-wiki` pattern for private capture, knowledge building, and public publishing.

## Purpose

Maintain a durable personal knowledge system that can safely produce public blog content without mixing private notes, source material, and rendered site code.

## Vault Boundaries

- `raw/` — immutable inbound source material grouped by domain
- `wiki/` — internal knowledge pages and analyses grouped by domain
- `journal/` — private daily and topic notes
- `publish/posts/` — public post source Markdown
- `publish/metadata/` — publishing metadata and channel state
- `publish/variants/` — optional channel-specific copies for non-canonical platforms
- `site/` — Astro site that renders `publish/posts/`
- `ops/` — architecture docs, templates, runbooks, automation definitions

## Hard Rules

- Never modify files inside `raw/` except to move reviewed inbox items into the matching `source/` folder.
- Never publish directly from `raw/` or `wiki/`.
- Keep private work logs in `journal/`; do not place diary-style content in `publish/posts/` unless it has been intentionally derived into a public post.
- Use `publish/posts/` as the only canonical public content source.
- Treat `site/` as rendering and deployment code only; do not store raw knowledge or journals there.
- Notion is an operations database only. Do not treat Notion as the canonical source for writing, knowledge, or publishing.
- Prefer updating an existing relevant knowledge page over creating near-duplicates.
- Use `[[wikilinks]]` within `wiki/` and `journal/`.
- Prefer standard Markdown links and frontmatter in `publish/posts/`.
- Keep claims in public posts attributable to `wiki/` pages or source summaries whenever possible.

## Domain Taxonomy

Every capture, knowledge page, and public post belongs to one primary domain:

- `it`
- `english`
- `travel`
- `reading`
- `economy`

Cross-domain content should still choose one primary domain and then add tags for the secondary topics.

## Naming

- Raw source: `YYYY-MM-DD-short-title.md`
- Source summary: `wiki/sources/<domain>/source-YYYY-MM-DD-short-title.md`
- Entity page: `wiki/entities/<domain>/slug.md`
- Concept page: `wiki/concepts/<domain>/slug.md`
- Analysis page: `wiki/analyses/<domain>/analysis-short-topic.md`
- Daily note: `journal/daily/YYYY/YYYY-MM-DD.md`
- Public post: `publish/posts/<domain>/YYYY-MM-DD-slug.md`
- Publishing metadata: `publish/metadata/slug.yaml`

## Publishing Contract

- Daily notes are private by default.
- Public posts must declare frontmatter and use `canonical_channel: github-pages`.
- Channel variants must never replace the canonical post source.
- The public site reads only from `publish/posts/`.

## Skill Boundary

- Knowledge ingestion and wiki maintenance should stay within this repository's rules even when external skills are used.
- Third-party skills may assist with Markdown, publishing, or Notion automation, but they must not redefine the repo structure.
- Repo-local policies and `ops/` docs always take precedence over external skill suggestions.
