
# Backend Overview

## 1. Purpose

This document defines what the backend must do for the JNF Portal and what the backend team is expected to deliver in the first implementation.

## 2. Backend Goal

Build a secure Laravel-based API that supports recruiter onboarding, company profile management, JNF creation and submission, admin review workflow, portal content delivery, and audit logging.

## 3. Recommended Backend Stack

- Laravel 12
- MySQL or MariaDB
- Laravel Sanctum for token authentication
- Laravel queues for email and background jobs
- Laravel notifications or mailables for submission and OTP emails
- Local or cloud file storage for logo, JD PDF, brochure, and other uploads

## 4. Backend Responsibilities

The backend must provide:

- recruiter authentication
- admin authentication
- OTP verification flow
- company profile CRUD for the authenticated recruiter
- recruiter dashboard data
- JNF CRUD and section-level updates
- JNF preview aggregation
- JNF submission workflow
- admin review workflow
- recruiter status management
- portal stats and quick links APIs
- audit logs for important actions
- validation, authorization, and structured error responses

## 5. Data Ownership

### Recruiter-owned data

- recruiter profile
- company profile for their company
- draft and submitted JNFs created by their company

### Admin-owned actions

- reviewing JNFs
- requesting changes
- approving or closing JNFs
- updating recruiter account status
- managing portal content if needed

## 6. Main Backend Modules

- Auth
- Admin Auth
- Company
- Recruiter Profile
- Dashboard
- JNF Core
- Contacts
- Skills
- Eligibility
- Salary
- Selection Process
- Declaration
- Documents
- Admin Review
- Portal Content
- Audit Logging

## 7. Key Backend Rules

- Use the relational schema from the project database design.
- Keep enum values exactly aligned with project documentation.
- Do not introduce a `rejected` JNF status in the first build.
- Treat `changes_requested` as the state that sends work back to the recruiter.
- Keep section data normalized in child tables instead of storing the entire JNF in one JSON field.
- Protect recruiter routes so a recruiter can access only their own company-owned records.
- Record major workflow actions in audit logs.

## 8. Deliverables for First Backend Milestone

The first backend milestone should include:

- health endpoint
- recruiter send OTP
- recruiter verify OTP
- recruiter register
- recruiter login/logout
- recruiter profile `me`
- company profile `me`
- dashboard summary
- create draft JNF
- list JNFs
- show JNF detail

## 9. Success Criteria

The backend is ready for frontend integration when:

- auth works end to end
- recruiter can create a draft JNF
- dashboard returns company and JNF summary data
- validation errors are structured
- status flow is enforced correctly
- core routes are documented and testable
