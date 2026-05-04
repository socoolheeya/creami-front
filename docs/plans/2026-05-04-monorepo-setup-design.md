# Monorepo Setup Design for creami-front

## Overview

Restructured creami-front to manage three independent React applications using pnpm workspaces in a monorepo architecture.

## Project Structure

```
creami-front/
├── apps/
│   ├── accommodation/     # Accommodation management app (port 3000)
│   ├── ari/              # ARI app (port 3001)
│   └── discount/         # Discount management app (port 3002)
├── docs/
│   └── plans/           # Design documentation
├── pnpm-workspace.yaml  # Workspace configuration
└── package.json         # Root scripts and workspace management
```

## Architecture Decisions

### Package Manager: pnpm

Selected pnpm for:
- Fast and disk-efficient dependency management
- Strong monorepo support with workspaces
- Dependency deduplication
- Modern tooling standard

### Project Independence

Each app is completely independent:
- Own dependencies in separate `package.json`
- Own build configuration
- Own Next.js setup with Tailwind CSS
- No shared code packages (can be added later if needed)

### Port Configuration

- **accommodation**: `http://localhost:3000` (default)
- **ari**: `http://localhost:3001`
- **discount**: `http://localhost:3002`

## Workspace Configuration

### pnpm-workspace.yaml

```yaml
packages:
  - 'apps/*'
```

### Root package.json Scripts

```json
{
  "dev:accommodation": "pnpm --filter accommodation dev",
  "dev:ari": "pnpm --filter ari dev",
  "dev:discount": "pnpm --filter discount dev",
  "build:accommodation": "pnpm --filter accommodation build",
  "build:ari": "pnpm --filter ari build",
  "build:discount": "pnpm --filter discount build",
  "build:all": "pnpm -r build",
  "lint:all": "pnpm -r lint"
}
```

## Technology Stack

All apps use consistent versions:
- **Next.js**: 16.2.4 (with Turbopack)
- **React**: 19.2.4
- **TypeScript**: ^5
- **Tailwind CSS**: ^4
- **ESLint**: ^9

## Development Workflow

### Running Individual Apps

```bash
pnpm dev:accommodation  # Run accommodation app
pnpm dev:ari           # Run ari app
pnpm dev:discount      # Run discount app
```

### Building

```bash
pnpm build:all         # Build all apps
pnpm build:accommodation  # Build specific app
```

### Installing Dependencies

```bash
pnpm install           # Install all workspace dependencies
```

## Future Enhancements

Potential improvements to consider:
- Shared UI component library (`packages/shared-ui`)
- Common utilities package (`packages/common-utils`)
- Shared TypeScript configurations
- Shared ESLint/Prettier configurations
- Centralized testing setup

## Migration Notes

- Original Next.js app at root was removed
- All apps created fresh using create-next-app
- Each app includes AGENTS.md and CLAUDE.md for AI tooling
- Duplicate pnpm-workspace.yaml files in app directories removed to avoid warnings
