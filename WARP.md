# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Turborepo monorepo containing multiple Next.js applications and shared packages. The main applications are:

- **v1**: Feature-rich Next.js application (port 3001) with extensive Radix UI components, drag-and-drop functionality, and Tailwind CSS
- **web**: Lightweight Next.js application (port 3000) with minimal dependencies

## Essential Commands

### Development
```bash
# Start all applications
npm run dev

# Start specific application
npm run dev:v1                    # Only v1 app
npm run dev -- --filter=web       # Only web app

# Turbo filter examples
turbo dev --filter=v1             # Direct turbo command
turbo dev --filter=web            # Web app only
```

### Build & Deployment
```bash
# Build all apps and packages
npm run build

# Build specific app
turbo build --filter=v1
```

### Code Quality
```bash
# Format all code
npm run format

# Lint all code
npm run lint

# Type check all code
npm run check-types

# Lint specific app
turbo lint --filter=v1
```

### Package-Specific Commands
```bash
# Run single app commands
cd apps/v1 && npm run dev    # Runs on port 3001 with Turbopack
cd apps/web && npm run dev   # Runs on port 3000 with Turbopack
```

### Component Registry (shadcn/ui Style)
```bash
# Components are managed via a registry system in apps/v1/registry/
# Available component categories:
ls apps/v1/registry/default/ui/    # UI components
ls apps/v1/registry/default/lib/   # Utility functions

# Copy components from registry to your app
cp apps/v1/registry/default/ui/button.tsx apps/v1/components/ui/
cp apps/v1/registry/default/lib/cn.ts apps/v1/lib/
```

## Architecture Overview

### Monorepo Structure
- **apps/**: Contains Next.js applications
  - `v1/`: Main application with rich UI components and complex interactions
  - `web/`: Simplified Next.js application
- **packages/**: Shared packages across applications
  - `@repo/eslint-config`: Shared ESLint configurations
  - `@repo/typescript-config`: Shared TypeScript configurations

### Technology Stack
- **Framework**: Next.js 15.5+ with App Router and Turbopack
- **Language**: TypeScript 5.9.2
- **UI Libraries**: 
  - v1 app: Extensive Radix UI components (@radix-ui/react-*)
  - Tailwind CSS 4.1+ with custom configuration
  - Lucide React icons
- **Build System**: Turborepo for monorepo management
- **Package Manager**: npm with workspaces

### Key Dependencies (v1 app)
- **Drag & Drop**: @dnd-kit/core and @dnd-kit/sortable
- **UI Components**: Comprehensive Radix UI suite (accordion, avatar, checkbox, etc.)
- **Styling**: class-variance-authority, clsx, tailwind-merge
- **Carousel**: embla-carousel-react
- **Registry System**: Built-in component registry with shadcn/ui architecture
- **Utility Functions**: `cn()` for conditional class merging (clsx + tailwind-merge)

### Development Architecture
- **Configuration Sharing**: ESLint and TypeScript configs shared via respective packages  
- **Port Allocation**: v1 (3001), web (3000)
- **Type Safety**: Strict TypeScript with `--max-warnings 0` policy
- **Code Style**: Prettier formatting with consistent rules

### Build Configuration
- **Turborepo Tasks**: Defined in turbo.json with dependency graph
- **Next.js**: Modern configuration with Turbopack for fast development
- **Caching**: Turbo handles build caching and dependency management

### Package Dependencies Flow
```
apps/v1 -> @repo/eslint-config -> linting rules  
apps/v1 -> @repo/typescript-config -> TS config
apps/web -> @repo/eslint-config -> linting rules
apps/web -> @repo/typescript-config -> TS config
```

## Development Context

### Component Development

#### shadcn/ui Registry System
The v1 app implements a comprehensive component registry system similar to shadcn/ui:

- **Registry Location**: `apps/v1/registry/default/`
- **UI Components**: 30+ pre-built components in `registry/default/ui/`
- **Utilities**: Shared utilities like `cn()` in `registry/default/lib/`
- **Component Types**: UI components, blocks, charts, and utility functions

#### Available Components
```bash
# Core UI Components (apps/v1/registry/default/ui/)
accordion, avatar, badge, button, calendar, card, carousel, checkbox,
collapsible, combobox, dialog, drawer, dropdown, input, kanban, label,
navmenu, pagination, popover, progress, radiogroup, resizable, scrollarea,
scrollpsy, select, separator, sheet, skeleton, slider, stepper, switch,
tabs, textarea, toast, toggle, togglegroup, tooltip, typography
```

#### Component Architecture
- **Radix UI Foundation**: All components built on Radix UI primitives
- **CVA Variants**: Using `class-variance-authority` for type-safe styling
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **TypeScript**: Full type safety with proper prop interfaces

### Application-Specific Features
- **v1 app**: Complex UI with forms, drag-and-drop, navigation menus, and comprehensive Radix UI component usage
- **web app**: Minimal setup for simpler use cases with basic shared dependencies
- Both apps share the same React 19+ and Next.js 15+ foundation with Turbopack

### Code Organization
- Apps follow Next.js App Router structure
- Shared utilities and types can be found in respective app directories
- Registry pattern used in v1 for component organization
- No shared component library - components are app-specific

#### Registry Workflow
1. **Source**: Components stored in `apps/v1/registry/default/`
2. **Usage**: Copy components to your app structure as needed
3. **Customization**: Modify copied components for specific use cases
4. **Utilities**: Use `cn()` utility for conditional class merging
