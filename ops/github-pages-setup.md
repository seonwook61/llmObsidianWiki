# GitHub Pages Setup

## Required Repository Settings

To use the custom workflow in `.github/workflows/deploy-pages.yml`, the repository must be configured to publish with GitHub Actions.

## Pages Settings

In `Settings -> Pages`:

1. Under `Build and deployment`
2. Set `Source` to `GitHub Actions`
3. Do not keep it on `Deploy from a branch`

If `Source` stays on `Deploy from a branch`, the workflow can build but Pages deployment will fail.

## Actions Settings

In `Settings -> Actions -> General`:

1. Make sure GitHub Actions is enabled for the repository
2. Allow GitHub-authored actions, or allow all actions and reusable workflows
3. Do not block Marketplace actions used by the workflow:
   - `actions/checkout`
   - `actions/setup-node`
   - `actions/configure-pages`
   - `actions/upload-pages-artifact`
   - `actions/deploy-pages`
4. Leave the workflow-level permissions in the repo workflow file as the source of truth

The workflow already declares:

- `contents: read`
- `pages: write`
- `id-token: write`

## Extra Settings You Do Not Need

You do not need a Personal Access Token for GitHub Pages deployment.

You do not need custom repository secrets for the current workflow.

The workflow uses the built-in `GITHUB_TOKEN` together with Pages and OIDC permissions.

## Optional Repository Variables

The current build works without extra repository variables.

If you later want canonical URLs for SEO metadata, add:

- `PUBLIC_SITE_URL`
  - Example: `https://seonwook61.github.io/llmObsidianWiki`

For this repository, that URL is also the correct default project Pages address unless you later connect a custom domain.

## Quick Checklist

- `Settings -> Pages -> Source = GitHub Actions`
- `Settings -> Actions -> General -> Actions enabled`
- `Settings -> Actions -> General -> GitHub-authored actions allowed`
- workflow file exists on `main`
- push a new commit or run the workflow manually
- confirm a `github-pages` deployment environment appears

## Verification

After saving the Pages source as `GitHub Actions`, trigger one of these:

- push a new commit to `main`
- or run the workflow manually from the `Actions` tab

The success condition is:

- a green workflow run
- a deployed Pages environment
- a public site URL shown in the workflow summary
