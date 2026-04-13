# Notion Ops Database

## Purpose

Use Notion as an operations dashboard for the publishing system.

Do not use Notion as the source of truth for writing or knowledge.

## Recommended Fields

| Field | Type | Purpose |
| --- | --- | --- |
| Title | Title | Human-readable post title |
| Domain | Select | Primary domain |
| Category | Select | Public category |
| Status | Select | Draft, Review, Published |
| Source Note Path | Text | Path to the canonical post source |
| Canonical URL | URL | Final public URL |
| Publish Date | Date | Public release date |
| Review Date | Date | Next scheduled refresh date |
| Adsense Ready | Checkbox | Monetization readiness flag |

## Rules

- Store metadata only.
- Do not treat a Notion page as the canonical article body.
- Sync from repository state into Notion rather than writing posts from Notion into the repo.

## Integration

- n8n upserts records after publish or review events.
- Future Notion MCP usage, if enabled, should stay limited to metadata maintenance.
