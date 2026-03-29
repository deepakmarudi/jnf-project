# JNF Portal Project Specification

## 1. Project Overview

The JNF Portal is a web-based system for IIT (ISM) Dhanbad that digitizes recruiter onboarding, company profile collection, Job Notification Form submission, and admin review.

This specification is based on the approved database design PDF and the `IIT_ISM_JNF v2.0.pptx` presentation. Together, they define the product scope, workflow, and data model for the first implementation of the portal.

## 2. Project Objectives

- Replace manual or scattered JNF collection with a structured portal.
- Give recruiters a guided, professional submission workflow.
- Give the CDC/admin team a clean review and tracking process.
- Capture data in a reporting-friendly relational format.
- Support future analytics, exports, and dashboard features.

## 3. User Roles

### Recruiter

- Registers using company email
- Verifies email through OTP
- Creates and maintains company profile
- Creates, edits, previews, and submits JNFs
- Tracks JNF status from dashboard

### Admin

- Logs in through a separate admin flow
- Reviews submitted JNFs
- Requests changes, approves, or closes records
- Manages recruiter account status
- Maintains portal content such as stats and quick links

## 4. Product Modules

### Public Portal

- Landing page
- Institute branding and recruiter value proposition
- Placement statistics
- Quick links such as brochure, policies, past recruiters, and manuals

### Recruiter Onboarding

- Three-step registration flow
- Email OTP verification
- Recruiter details capture
- Company profile setup

### Recruiter Workspace

- Recruiter dashboard
- Company profile management
- JNF list and status tracking
- New JNF creation
- Draft editing
- Preview before submission

### Admin Workspace

- Admin dashboard
- Review queue
- Recruiter management
- Company and JNF detail views
- Audit trail visibility

## 5. Functional Design

### 5.1 Landing Page

- Public-facing portal entry
- Clear `Register` and `Recruiter Login` actions
- Placement statistics cards
- Institute highlights and recruiter value proposition
- Quick link section for brochure, policies, contact, and manuals

### 5.2 Registration and Login

- Step 1: email verification with OTP
- Step 2: recruiter details
- Step 3: company profile
- Separate admin login
- Optional reCAPTCHA on public auth endpoints

### 5.3 Company Profile

- Company identity, sector, and address
- Logo upload
- Category or organization type
- Date of establishment
- Annual turnover
- Social media or LinkedIn URL
- Nature of business and description
- Industry tag selection
- MNC indicator with HQ country and city

### 5.4 Contact and HR Details

- Head HR
- Primary point of contact
- Secondary point of contact
- Landline support per contact
- Character counters for long text inputs in the UI

### 5.5 Job Profile

- Job title and formal designation
- Place of posting
- Work location mode
- Expected hires and minimum hires
- Tentative joining month
- Skills tag input
- Rich-text job description
- JD PDF upload
- Additional job information
- Bond details
- Registration link
- Onboarding procedure

### 5.6 Eligibility and Courses

- Minimum CGPA
- Backlog policy
- High-school percentage criterion
- Gender filter
- Specific SLP requirement
- Programme-level eligibility
- Discipline-level eligibility
- PhD allowed flag and department requirement
- MA/DHSS allowed flag

### 5.7 Salary Details

- Programme-wise salary packages
- Same structure for all programmes or different structure per programme
- Currency selector
- Base, gross, take-home, first-year CTC
- ESOP and stock details
- Bond amount and duration
- Deductions and free-text breakup
- Additional salary components

### 5.8 Selection Process

- Pre-placement talk
- Resume shortlisting
- Online or written tests
- Group discussion
- Technical or personal interviews
- Psychometric or medical test toggles
- Stage-wise mode, duration, and infrastructure needs

### 5.9 Declaration and Submission

- Policy acceptance checkboxes
- Authorized signatory details
- Typed signature
- Preview before final submit
- Inline policy and recruiter guideline links
- Email confirmation after successful submission

## 6. Workflow Design

### Recruiter Workflow

1. Register with email OTP verification.
2. Complete recruiter and company profile.
3. Log in and reach recruiter dashboard.
4. Create a new JNF and save draft data section by section.
5. Preview the full form.
6. Submit the JNF.
7. Track status updates and respond if changes are requested.

### Admin Workflow

1. Log in to admin portal.
2. View submitted JNFs in review queue.
3. Open full JNF detail page.
4. Start review and add remarks.
5. Request changes, approve, or close the JNF.
6. Review recruiter and company information when needed.

## 7. Status Model

### Recruiter Status

- `pending`
- `active`
- `blocked`

### Admin Status

- `active`
- `inactive`

### JNF Status

- `draft`
- `submitted`
- `under_review`
- `changes_requested`
- `approved`
- `closed`

### Recommended Status Flow

- `draft -> submitted`
- `submitted -> under_review`
- `under_review -> changes_requested`
- `under_review -> approved`
- `approved -> closed`
- `changes_requested -> submitted`

## 8. Technical Architecture

### Frontend

- Next.js application
- Responsive recruiter and admin interfaces
- Multi-step and multi-section form UI
- Autosave and preview support

### Backend

- Laravel REST API
- Separate recruiter and admin auth flows
- OTP verification for recruiter onboarding
- Audit logging for JNF activity

### Database

- MySQL or MariaDB
- Normalized relational schema
- Separate tables for company, contacts, eligibility, salary, rounds, declaration, documents, and audit logs

### File Storage

- Company logo
- JD PDF
- Brochure and other recruiter uploads

## 9. Data Design Principles

- Use normalized business tables instead of storing JNF sections as large JSON blobs.
- Keep enum values stable across database, API, and UI.
- Keep company profile separate from JNF records so multiple JNFs can reuse the same company data.
- Use child tables for repeatable and matrix-style sections such as contacts, salary, eligibility, and rounds.
- Track major JNF actions in audit logs.

## 10. Delivery Scope for First Build

### Core Build

- Public landing page
- Recruiter auth and onboarding
- Company profile
- Recruiter dashboard
- JNF create, edit, preview, submit
- Admin login and review dashboard
- Database migrations and seed data for master tables

### Useful Early Enhancements

- Public search by year, company, or discipline
- Autofill help for returning recruiters
- User manual page
- Better reporting exports

## 11. Implementation Phases

### Phase 1

- Project setup
- Auth flows
- Company profile
- Master data migrations and seeders

### Phase 2

- Recruiter dashboard
- JNF core module
- Contacts, eligibility, salary, rounds, declaration, and documents

### Phase 3

- Admin review workflow
- Audit views
- Portal content management
- Notification and email confirmation flow

## 12. Project Documentation Set

- `docs/requirements.md` defines the business and functional requirements.
- `docs/database.md` defines the relational data model and implementation constraints.
- `docs/api.md` defines the API contract for frontend and backend development.
- `docs/ui.md` defines pages, flows, and interaction behavior for the UI.
