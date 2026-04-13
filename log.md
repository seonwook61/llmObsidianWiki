# Log

Append-only timeline for master vault operations.

## [2026-04-13] setup | initialized master vault structure

- Created domain-based `raw/`, `wiki/`, `journal/`, and `publish/` folders
- Added root policy and starting documentation
- Reserved `site/` for the Astro-based GitHub Pages site
- Reserved `ops/` for architecture docs, templates, and automation mapping

## [2026-04-13] bootstrap | added publishing templates and public site scaffold

- Added daily note and public post templates under `ops/templates/`
- Added nested policy files for `journal/`, `publish/`, and `site/`
- Added a sample daily note and a sample published post
- Added an Astro site that reads from `publish/posts/`
- Added GitHub Pages deployment workflow

## [2026-04-13] docs | expanded operational setup guidance

- Added `ops/git-workflow.md` for trunk-based branch management
- Added `ops/github-pages-setup.md` to document required Pages and Actions settings
- Expanded `ops/notion-ops-db.md` with concrete status options and suggested views

## [2026-04-13] docs | added reusable setup templates

- Expanded `ops/github-pages-setup.md` with a practical Actions checklist and no-secret guidance
- Added `ops/templates/notion-ops-database.sql` for creating the publishing ops database
- Linked the Notion DDL template from the vault index and operations docs

## [2026-04-13] docs | captured Pages deployment retrospective

- Added `ops/reports/2026-04-13-github-pages-ci-cd-retro.md` as a Notion-friendly setup note
- Added `ops/reports/2026-04-13-github-pages-settings-checklist.csv` for checklist import into Notion
- Recorded the difference between CI and CD, required repository settings, and deferred follow-up items
