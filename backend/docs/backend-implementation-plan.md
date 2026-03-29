# Backend Implementation Plan

## 1. Purpose

This document gives the backend developer a practical order for implementation so the API can be built in stable, testable phases.

## 2. Phase 0: Project Setup

- create Laravel project
- configure database connection
- install Sanctum
- configure mail
- configure file storage
- add API response conventions
- add auth guard and middleware plan

## 3. Phase 1: Database and Master Data

- create migrations from the project database design
- add foreign keys and indexes
- create seeders for:
  - programmes
  - disciplines
  - skills
  - industry tags
  - portal stats
  - portal quick links

## 4. Phase 2: Auth and Company Onboarding

- recruiter send OTP
- recruiter verify OTP
- recruiter registration
- recruiter login/logout
- admin login/logout
- recruiter `me`
- company `me`

### Goal

At the end of this phase, a recruiter should be able to create an account and maintain their company profile.

## 5. Phase 3: Recruiter Dashboard and JNF Core

- dashboard endpoint
- create draft JNF
- list JNFs
- get one JNF
- update top-level JNF fields
- delete draft JNF

### Goal

At the end of this phase, the recruiter can create and manage a basic draft JNF.

## 6. Phase 4: JNF Section Modules

Build these modules one by one:

1. contacts
2. skills
3. eligibility
4. salary
5. selection rounds
6. declaration
7. documents
8. preview
9. submit

### Goal

At the end of this phase, the recruiter can complete the entire JNF workflow.

## 7. Phase 5: Admin Review

- admin dashboard
- admin JNF list
- admin JNF detail
- start review
- request changes
- approve
- close
- recruiter status update

### Goal

At the end of this phase, the admin team can operate the review workflow end to end.

## 8. Phase 6: Quality and Production Readiness

- add request validation classes
- add policies and authorization checks
- add audit log creation everywhere needed
- add email confirmation on submit
- add file validation
- add error handling standards
- add API tests

## 9. Suggested First Working Milestone

If the developer wants the smallest professional milestone, build only:

- `/api/health`
- `/api/auth/send-otp`
- `/api/auth/verify-otp`
- `/api/auth/register`
- `/api/auth/login`
- `/api/auth/me`
- `/api/companies/me`
- `/api/dashboard`
- `/api/jnfs`

That is enough to begin frontend integration while keeping the scope manageable.

## 10. Handoff Notes

- Build from the project database and API docs, not from assumptions.
- Keep route names, field names, and enum values aligned with the documented spec.
- Do not change status names casually because they affect database, API, UI, and workflow logic together.
