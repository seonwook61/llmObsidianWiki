# Blog Architecture

## Overview

This repository is a layered writing system based on the `llm-wiki` pattern.

The core flow is:

`raw -> wiki -> journal -> publish -> site -> GitHub Pages`

Each layer has one job.

## Layers

### raw

Stores inbound and canonical source material by domain.

### wiki

Stores source summaries, entities, concepts, and analyses that accumulate into durable knowledge.

### journal

Stores private daily capture and ongoing topic notes.

### publish

Stores public-ready Markdown, metadata, and optional channel variants.

### site

Builds a public website from `publish/posts/`.

### Notion

Tracks publishing operations only.

## Data Flow

1. Capture notes and artifacts privately.
2. Convert meaningful material into structured knowledge.
3. Derive public posts from knowledge and journal notes.
4. Build and deploy the public site.
5. Sync publishing metadata to Notion.

## Design Principles

- One source of truth per layer
- Private capture is never implicitly public
- Public output is reproducible from repository files
- External tooling must adapt to the repo, not the other way around
