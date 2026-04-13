# GitHub Pages CI/CD Setup Note

## Purpose

This note records what was implemented for the master vault public site, which settings were required in GitHub, and what remains optional or deferred.

Audience:

- me, as the operator of this personal blog system
- future me, when I need to reproduce the setup or explain it in Notion

Date:

- 2026-04-13

Status:

- GitHub Pages deployment succeeded

## Short Answer

The current setup is **CI/CD**, not just CI.

- **CI**: GitHub Actions runs on push, installs dependencies, and builds the Astro site
- **CD**: the built artifact is deployed automatically to GitHub Pages

More precisely, the current CI layer is still lightweight because it checks **build health**, not full test coverage.

## What Was Implemented

| Area | What was done | Result |
| --- | --- | --- |
| Vault architecture | Separated `raw/`, `wiki/`, `journal/`, `publish/`, `site/`, `ops/` | private capture and public publishing no longer mix |
| Public site | Built an Astro site under `site/` | public site reads only `publish/posts/` |
| Deployment workflow | Added `.github/workflows/deploy-pages.yml` | pushes to `main` can deploy |
| Git strategy | Standardized `main` and `codex/*` usage | stable publishing branch plus short-lived work branches |
| Pages setup | Switched Pages source to GitHub Actions | repository now uses workflow-based deployment |
| Environment rules | Allowed `main` for `github-pages` environment | deploy step is no longer blocked |
| Project Pages path | Configured Astro base path for `/llmObsidianWiki/` | assets and routes match GitHub project pages URL |
| Operations docs | Added setup and runbook docs under `ops/` | future setup is reproducible |

## Workflow

```mermaid
flowchart LR
  A["Write note in Obsidian"] --> B["Promote public-ready post into publish/posts"]
  B --> C["Push changes to main"]
  C --> D["GitHub Actions build job"]
  D --> E["GitHub Actions deploy job"]
  E --> F["GitHub Pages site"]
```

## CI vs CD Breakdown

| Layer | Current responsibility | Implemented now? | Notes |
| --- | --- | --- | --- |
| CI | install dependencies and build the site | Yes | verifies that the site can compile |
| CI | lint, test, content validation | Not yet | recommended future upgrade |
| CD | upload artifact and deploy to GitHub Pages | Yes | currently working |

## Required GitHub Settings

### 1. Settings > Pages

- `Source = GitHub Actions`

Why it mattered:

- the repository uses a workflow-based deployment, not branch publishing

### 2. Settings > Actions > General

- Actions must be enabled
- GitHub-authored actions must be allowed, or all actions allowed

Why it mattered:

- the workflow depends on standard GitHub actions such as checkout, setup-node, configure-pages, upload-pages-artifact, and deploy-pages

### 3. Settings > Environments > github-pages

- `Deployment branches and tags = main allowed`

Why it mattered:

- deployment was failing because the environment protection rule originally rejected `main`

## Environment Sections Explained

### Deployment protection rules

This is the gate in front of deployment.

Typical uses:

- require manual approval
- block self-approval
- add a wait timer
- restrict who can deploy

For a personal blog, keep this simple unless there is a strong reason to add approvals.

### Environment secrets

These are sensitive values used by workflows in a specific environment.

Examples:

- API keys
- deployment tokens
- service credentials

Current recommendation:

- leave empty for the GitHub Pages workflow

Reason:

- this Pages deployment already works with built-in `GITHUB_TOKEN`

### Environment variables

These are non-secret values available to workflows in that environment.

Examples:

- public URLs
- environment names
- display labels

Current recommendation:

- leave empty for now

Important detail:

- environment variables are only available to jobs that explicitly use that environment
- our `build` job does not run inside `github-pages`
- because of that, `PUBLIC_SITE_URL` is better stored as a **repository variable**, not an environment variable

## Settings That Were Easy to Miss

| Setting | Needed now? | Recommended state | Why |
| --- | --- | --- | --- |
| `PUBLIC_SITE_URL` repository variable | Optional | `https://seonwook61.github.io/llmObsidianWiki/` | useful later for canonical URL and SEO metadata |
| Custom domain | Not yet | defer | only needed after the site stabilizes |
| `ads.txt` | Not yet | defer | needed later for AdSense readiness |
| `About`, `Privacy`, `Contact` pages | Already prepared | keep | improves readiness and site trust |
| Branch protection on `main` | Optional | consider later | helpful once publishing becomes routine |
| Lint/test job in CI | Optional but recommended | add later | improves confidence beyond build success |

## Files Created or Updated During This Setup

### Core docs

- `README.md`
- `AGENTS.md`
- `index.md`
- `log.md`

### Operational docs

- `ops/blog-architecture.md`
- `ops/publishing-runbook.md`
- `ops/git-workflow.md`
- `ops/github-pages-setup.md`
- `ops/notion-ops-db.md`
- `ops/automation-map.md`
- `ops/templates/notion-ops-database.sql`

### Site and deployment

- `site/astro.config.mjs`
- `.github/workflows/deploy-pages.yml`

## Current State

### Verified

- local Astro build succeeds
- GitHub Actions build succeeds
- GitHub Pages deployment succeeds

### Deferred

- Notion operations database creation
- n8n sync
- custom domain
- AdSense
- richer CI checks such as lint and tests

## Recommended Next Steps

1. Create the Notion operations database from `ops/templates/notion-ops-database.sql`
2. Add repository variable `PUBLIC_SITE_URL`
3. Publish 3 to 5 real posts to validate the writing workflow
4. Add lint or content validation to CI
5. Prepare `ads.txt` and AdSense readiness after the site has enough real content

## Suggested Notion Capture Format

If storing this as a normal Notion page:

- paste this Markdown directly into the page body

If storing this as operations metadata:

- import `ops/reports/2026-04-13-github-pages-settings-checklist.csv` into Notion

