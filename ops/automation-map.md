# Automation Map

## GitHub Actions

Owns site build and GitHub Pages deployment.

## n8n

Owns cross-system sync and notifications.

Recommended workflows:

- New canonical post published -> upsert Notion row
- Weekly digest -> summarize drafts, reviews, and stale posts

## Codex Automations

Owns repository-aware audits and writing support.

Recommended automations:

- Weekly wiki lint
- Weekly publish readiness audit
- Monthly stale post review

## MCP Policy

- GitHub MCP can assist with repo operations.
- Notion MCP is optional and should be scoped to ops metadata only.
- Obsidian MCP is optional and must never become a hard dependency.
- n8n MCP is optional; native n8n workflows remain the default integration surface.
