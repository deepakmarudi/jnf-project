# Backend Documentation

This folder contains backend-specific planning and handoff documents for the JNF Portal.

The goal of these files is to help a backend developer start the project with clear requirements, module boundaries, and API expectations without needing to infer the design from scattered notes.

## Documents in this folder

- `docs/backend-overview.md`
- `docs/backend-architecture.md`
- `docs/backend-modules.md`
- `docs/backend-implementation-plan.md`
- `docs/openapi.yaml`

## How to use these docs

1. Read `docs/backend-overview.md` to understand the backend scope.
2. Read `docs/backend-architecture.md` to understand how the backend should be structured.
3. Read `docs/backend-modules.md` to build module by module.
4. Read `docs/backend-implementation-plan.md` to decide the development order.
5. Use `docs/openapi.yaml` as the backend API outline when creating routes and requests.

## Relationship with root project docs

The root `docs/` folder defines the full product.

The backend folder narrows that into backend-only guidance:

- business modules to implement
- backend architecture
- auth and review rules
- route groups
- implementation order
- API outline

## Recommended audience

- backend developer
- Laravel developer
- API developer
- project lead reviewing implementation scope
