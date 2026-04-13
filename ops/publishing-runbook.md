# Publishing Runbook

## Goal

Turn private capture into a public GitHub Pages post without blurring repository boundaries.

## Workflow

1. Capture the day's work in `journal/daily/YYYY/YYYY-MM-DD.md`.
2. Add or update the supporting knowledge pages in `wiki/`.
3. Decide whether the idea is public-worthy.
4. Create a canonical post in `publish/posts/<domain>/`.
5. Add or update the post metadata in `publish/metadata/`.
6. Preview the site locally from `site/`.
7. Publish through GitHub Actions.
8. Let n8n update Notion after publication.

## Promotion Checklist

- The note teaches or explains something worth reusing.
- The note is grounded in a knowledge page, source summary, or clear firsthand experience.
- Private details have been removed.
- The post has a stable title, slug, summary, and category.
- The post fits one primary domain.

## v1 Canonical Publishing Rule

- Canonical source: `publish/posts/`
- Canonical public channel: `GitHub Pages`
- Optional variants: `publish/variants/velog/`, `publish/variants/tistory/`
