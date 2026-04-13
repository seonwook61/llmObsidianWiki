# n8n GitHub to Notion Upsert

## Trigger

- GitHub push to `main`
- Or repository dispatch after a publish event

## Input

- changed files under `publish/posts/`
- matched metadata file under `publish/metadata/`

## Output

- create or update the Notion row for each canonical post
- refresh `Status`, `Canonical URL`, `Publish Date`, and `Review Date`

## Guardrails

- Ignore `draft` posts unless explicitly configured otherwise
- Never write article bodies into Notion
