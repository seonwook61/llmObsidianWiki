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

## Status Options

- `Idea`
- `Draft`
- `Review`
- `Scheduled`
- `Published`
- `Refresh Needed`

## Suggested Select Options

### Domain

- `it`
- `english`
- `travel`
- `reading`
- `economy`

### Category

- `engineering`
- `learning-log`
- `workflow`
- `travel-note`
- `book-note`
- `market-note`

## Suggested Views

- `Board / Status` — manage idea to publish flow
- `Calendar / Publish Date` — see release cadence
- `Table / Published` — track canonical URLs and refresh dates
- `Table / Refresh Needed` — review old posts that should be updated

## Recommended v1 Rule

Create the database now, but keep it intentionally light:

- Store post metadata only
- Do not paste article bodies into Notion
- Start with the required fields and add extras only after 2-3 weeks of real usage
- Use the starter schema in `ops/templates/notion-ops-database.sql`

## Rules

- Store metadata only.
- Do not treat a Notion page as the canonical article body.
- Sync from repository state into Notion rather than writing posts from Notion into the repo.

## Integration

- n8n upserts records after publish or review events.
- Future Notion MCP usage, if enabled, should stay limited to metadata maintenance.

## Create Database DDL

The initial schema is stored in:

- `ops/templates/notion-ops-database.sql`

When Notion MCP is available in-session again, create the database under a chosen parent page with that schema and then add views for:

- `Board / Status`
- `Calendar / Publish Date`
- `Table / Published`
- `Table / Refresh Needed`
