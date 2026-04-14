# T&C Prototypes

Storybook workspace for scaffolding T&C UI prototypes with the Envato Design System. Scaffolded from the [design-playground](../design-playground) starter kit.

## Prerequisites

- Node.js >= 20
- GitHub CLI (`gh`) — authenticates with GitHub Packages

## Setup

### 1. Authenticate with GitHub

```bash
gh auth login --scopes read:packages
export GITHUB_TOKEN=$(gh auth token)
```

> Add `export GITHUB_TOKEN=$(gh auth token)` to `~/.zshrc` so it persists.

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Start Storybook

```bash
npm run storybook
```

Storybook opens at [http://localhost:6006](http://localhost:6006).

## Creating a new prototype

1. Copy the closest layout example from `app/examples/` into `app/routes/your-page/`
2. Describe the UI you want in Cursor — paste a Figma URL or describe the layout
3. Check your story at the Storybook URL

Storybook auto-discovers any `app/**/*.stories.tsx` file.

## Layout examples

| Story | File | Use when… |
|---|---|---|
| **App Shell** | `app/examples/AppShell.stories.tsx` | Any page with a sidebar nav |
| **Content Grid** | `app/examples/ContentGrid.stories.tsx` | Browse, search results, galleries |
| **Settings Page** | `app/examples/SettingsPage.stories.tsx` | Forms, preferences, account pages |

## Figma integration

This workspace works with the Figma MCP in Cursor:

- **Pull designs**: Paste a Figma URL and Cursor translates it to code using the design system
- **Search tokens**: `search_design_system` finds components, variables, and styles from Envato libraries
- **Write to Figma**: `use_figma` creates or edits nodes directly in Figma files

## Build for static hosting

```bash
npm run build-storybook
```

Output goes to `storybook-static/`.

## Deploy to GitHub Pages (Envato org)

See `.github/workflows/deploy-storybook.yml` for the CI/CD pipeline. First-time setup:

```bash
gh repo create envato/<repo-name> --private --source=. --remote=origin --push
gh secret set NPM_TOKEN --body "$(gh auth token)" --repo envato/<repo-name>
gh api repos/envato/<repo-name>/pages --method POST -f build_type=workflow
```
