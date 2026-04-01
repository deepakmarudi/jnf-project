# Frontend

This folder contains the Next.js frontend for the JNF Portal.

## Stack

- Next.js
- React
- TypeScript
- MUI
- NextAuth.js

## Source Structure

- `src/app` = routes, layouts, and route groups
- `src/components` = shared reusable UI
- `src/features` = business modules
- `src/providers` = app-wide providers
- `src/theme` = MUI theme setup
- `src/lib` = utilities and helpers
- `src/types` = shared TypeScript types

## Route Surfaces

- `(public)` = landing, login, registration
- `(recruiter)` = recruiter portal pages
- `(admin)` = admin portal pages

## Environment

Copy `.env.example` to `.env.local` and update values for your local machine.

## Team Rule

Do not place business-specific code directly inside shared folders unless it is truly reusable.
Feature logic should go into the appropriate folder under `src/features`.
