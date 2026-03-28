# JNF Portal Specification

## Objective

Build a recruiter-facing Job Notification Form portal for campus placements using Next.js on the frontend and Laravel on the backend, based on the IIT (ISM) Dhanbad JNF portal proposal deck.

## Primary users

- Recruiter
- Career Development Centre admin
- Placement team reviewer

## Product goals

- Digitize the full JNF flow from recruiter onboarding to final submission.
- Keep the form structured enough for reporting and flexible enough for different salary and selection models.
- Reduce incomplete submissions with progressive onboarding, draft saving, and preview before submit.

## Screens mapped from the PPT

### 01 Landing Page

- Public portal entry
- Institute branding, recruiter value proposition, stats, and quick links
- Clear entry points for registration and login

### 02 Login and Registration

- Recruiter authentication
- Three-step registration flow
- Email OTP placeholder in the UI layer
- Company profile onboarding before first JNF

### 03 Company Profile

- Core organization details
- Company metadata needed for CDC and reporting
- Industry tags and social profile support

### 04 Contact and HR Details

- Head HR
- Primary point of contact
- Secondary point of contact

### 05 Job Profile

- Profile name and designation
- Place of posting and work mode
- Expected and minimum hires
- Joining month, JD summary, required skills, bond, onboarding notes

### 06 Eligibility and Courses

- Min CGPA
- Backlog policy
- High school criterion
- Gender filter
- Programme and discipline selection
- PhD and special programme toggles

### 07 Salary Details

- Salary matrix by programme
- Currency selector
- Additional compensation breakup
- Bond, deductions, ESOP, and first-year CTC details

### 08 Selection Process

- PPT, resume shortlisting, tests, GD, interviews
- Mode per stage
- Test duration
- Interview duration
- Infra requirements
- Medical and psychometric toggles

### 09 Declaration and Submit

- Policy acceptance
- Signatory metadata
- Preview before final submission

## Recommended architecture

## Frontend

- Next.js App Router
- MUI theme system
- NextAuth.js credentials provider
- API integration against Laravel JSON endpoints

## Backend

- Laravel 12 REST API
- Sanctum token authentication for recruiter sessions
- MySQL or MariaDB persistence
- JSON section storage for flexible JNF payloads

## Data model summary

### Recruiter

- Belongs to a company
- Logs into the portal
- Creates and updates JNFs

### Company

- Stores organization profile data used across multiple JNFs

### JNF

- Owns all form sections
- Draft and submitted status
- JSON sections for contacts, eligibility, salary details, selection process, and declaration

## API surface

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/dashboard`
- `GET /api/jnfs`
- `POST /api/jnfs`
- `GET /api/jnfs/{jnf}`
- `PUT /api/jnfs/{jnf}`
- `POST /api/jnfs/{jnf}/submit`

## Non-functional requirements

- Mobile-friendly recruiter experience
- Draft-first workflow
- Structured API validation on every section
- Role-safe access so recruiters can only view their own company data
- Easy reporting exports for CDC admin workflows

## Implementation note

Because the local environment did not have the frontend or PHP toolchain available, the repository contains a production-oriented scaffold and blueprint rather than a generator-created full runtime. The frontend files are ready to install and run once Node.js is available; the backend files are organized to drop into a Laravel 12 project.
