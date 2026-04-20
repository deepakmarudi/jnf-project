# Backend Database

This folder contains the database layer for the JNF Portal backend.

## Structure

- `migrations/` = Laravel schema migrations
- `seeders/` = Laravel seeders for master and initial data

## Migration Rule

Do not create placeholder migrations.

Each migration should be added only when:
- the table design is clear
- column names are aligned with project docs
- relationships and foreign keys are known
- enum/status values are confirmed

## First Planned Core Tables

The first backend database work should begin with:

- recruiters
- companies
- jnfs
- audit_logs

After that, add normalized JNF child tables such as:

- jnf_contacts
- jnf_skills
- jnf_eligibility
- jnf_salary_details
- jnf_selection_rounds
- jnf_declarations
- jnf_documents

## Our Source

Before writing migrations, always align with:

- `docs/database.md`
- `docs/jnf-portal-spec.md`
- `backend/docs/backend-overview.md`
- `backend/docs/backend-architecture.md`

## Seeder Rule

Seeders should be used for master/reference data only when needed, such as:

- programmes
- disciplines
- skills
- industry tags
- portal stats
- portal quick links
