# GEMINI.md

## Project Overview

This is a Turborepo monorepo containing two Next.js applications (`v1` and `web`) and several shared packages. The project is set up with TypeScript, ESLint, and Prettier for a consistent and type-safe codebase.

The `v1` application appears to be the main, feature-rich application, utilizing a wide range of UI components from `@radix-ui` and other libraries. The `web` application is a more lightweight Next.js app.

## Building and Running

### Development

To start the development servers for all applications, run:

```sh
npm run dev
```

This will start the `v1` app on port 3001 and the `web` app on port 3000.

To run a specific application, you can use the `--filter` flag with Turborepo:

```sh
# To run only the v1 app
npm run dev -- --filter=v1

# To run only the web app
npm run dev -- --filter=web
```

### Build

To build all applications and packages, run:

```sh
npm run build
```

## Development Conventions

### Code Style

The project uses Prettier for code formatting. To format the entire codebase, run:

```sh
npm run format
```

### Linting

ESLint is used for code linting. To check for linting errors, run:

```sh
npm run lint
```

### Type Checking

TypeScript is used for static type checking. To check for type errors, run:

```sh
npm run check-types
```