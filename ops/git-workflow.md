# Git Workflow

## Default strategy

Use a trunk-based workflow.

- `main` is the long-lived stable branch.
- `codex/*` branches are short-lived work branches for system changes, structural content changes, and agent-driven work.

## Branch rules

- Keep `main` deployable.
- Rebase work branches on the latest `main` before merging.
- Use conventional commits.
- Avoid force-pushing shared branches. If needed, use `--force-with-lease`.

## Branch naming

- `codex/bootstrap-master-vault`
- `codex/site-search-improvements`
- `codex/notion-sync-workflow`
- `codex/publish-audit-automation`

## When to commit directly to main

Direct commits to `main` are acceptable only for low-risk solo content operations after the system is stable, such as:

- adding a single new public post
- updating a typo in an existing post
- refreshing metadata without structural changes

## When to use a work branch

Create a `codex/*` branch when the change affects any of these:

- site code
- deployment workflow
- AGENTS or ops documentation
- automation specs
- multiple posts or metadata files
- repository structure

## Current bootstrap state

- Local stable branch reserved: `main`
- Current bootstrap branch: `codex/master-vault-bootstrap`
- Recommended next step: push the bootstrap branch, verify remote state, then merge or fast-forward into `main`
