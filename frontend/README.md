# Frontend

This folder contains the Next.js frontend for the JNF Portal.

## Stack

- Next.js
- React
- TypeScript
- MUI
- NextAuth.js

## Source Structure

- `src/app` = route entry files, layouts, and route groups. Keep these files thin and focused on routing.
- `src/components` = shared reusable UI and layout primitives used across multiple features
- `src/features` = business modules. Each feature can contain its own components, data, hooks, helpers, and page-level composition
- `src/providers` = app-wide providers
- `src/theme` = MUI theme setup
- `src/lib` = cross-feature utilities and helpers
- `src/types` = shared TypeScript types used in multiple features

### Recommended Feature Pattern

Use `src/features/<feature-name>` as the main home for user-facing functionality.

Example:

```text
src/features/portal/
  components/
  data/
  portal-home-page.tsx
```

This keeps route files simple:

```text
src/app/(public)/page.tsx -> imports and renders portal home page
src/app/(public)/login/page.tsx -> imports and renders recruiter login page
```

## Route Surfaces

- `(public)` = landing, login, registration
- `(recruiter)` = recruiter portal pages
- `(admin)` = admin portal pages

Route group names organize code but do not appear in the URL.

## Environment

Copy `.env.example` to `.env.local` and update values for your local machine.

## Team Rule

- Do not place business-specific code directly inside shared folders unless it is truly reusable
- Feature logic should go into the appropriate folder under `src/features`
- Prefer small route files in `src/app` that only wire layouts and feature entry components
- Keep page-specific sections inside their feature folder instead of growing one large `page.tsx`
- Move helpers or types to `src/lib` or `src/types` only when they are shared by multiple features
