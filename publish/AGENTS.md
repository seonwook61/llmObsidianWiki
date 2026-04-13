# Publish Policy

`publish/` is the canonical public writing layer.

## Purpose

Hold the Markdown source of public posts, publishing metadata, and optional platform-specific copies.

## Rules

- `publish/posts/` is the only canonical public source.
- Every public post must include frontmatter.
- `canonical_channel` is `github-pages` for v1.
- `status` must be one of `draft`, `review`, or `published`.
- `adsense_ready` is metadata only; do not add ad snippets to post Markdown.
- Use channel variants only when a platform needs a different formatting or CTA style.
- Keep public posts grounded in `wiki/` pages, source summaries, or explicit firsthand notes.

## Required Frontmatter

- `title`
- `slug`
- `date`
- `domain`
- `category`
- `tags`
- `status`
- `summary`
- `canonical_channel`
- `source_notes`
- `related_journal_notes`
- `adsense_ready`
