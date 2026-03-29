# Requirements

## Project

Build a Job Notification Form portal for IIT (ISM) Dhanbad that supports recruiter onboarding, company profile management, JNF creation, admin review, and reporting.

## Goal

Replace a scattered/manual JNF submission workflow with a structured web portal that is easy for recruiters to complete and easy for CDC/admin users to review.

## Primary users

- Recruiter
- CDC/Admin

## Core modules

### Public portal

- Landing page
- Placement stats
- Quick links
- Recruiter and admin entry points

### Recruiter onboarding

- Recruiter registration
- Email OTP verification
- Recruiter login/logout
- Company profile setup

### Recruiter workspace

- Dashboard
- Company profile management
- JNF list
- JNF detail page
- New JNF creation
- Draft and submit workflow

### JNF form sections

- Company profile
- Contact and HR details
- Job profile
- Eligibility and courses
- Salary details
- Selection process
- Declaration and submit

### Admin workspace

- Admin login/logout
- Admin dashboard
- JNF review queue
- JNF detail and review actions
- Recruiter management
- Reports

## Functional requirements

### Recruiter

- Register with company email
- Verify email via OTP
- Create and manage company profile
- Create JNF draft
- Update JNF draft
- Submit JNF
- View JNF history and status
- Upload company logo and JD PDF

### Admin

- Login securely
- View all recruiter JNFs
- Review and approve/reject/request changes
- Change recruiter account status
- View dashboard metrics
- Access reports and exports

## JNF data requirements

The portal must capture:

- company information
- recruiter and HR contacts
- role title and designation
- place of posting
- work mode
- expected and minimum hires
- joining month
- required skills
- job description
- bond details
- registration link
- eligibility by programme and discipline
- CGPA/CPI and backlog rules
- high school criteria
- gender filter
- salary breakup by programme
- bonuses, ESOPs, deductions, gross salary, bond amount
- selection rounds, mode, test type, duration, infra needs
- declarations, signatory, consent, preview state

## Non-functional requirements

- Responsive on desktop and mobile
- Clear form structure for long workflows
- Secure auth
- Role-based access
- Draft-first workflow
- Good reporting support
- Maintainable API contract

## Success criteria

- Recruiter can register, log in, create, edit, and submit a JNF
- Admin can review and manage JNFs and recruiters
- Frontend and backend follow the same API contract
- Data model supports future reporting and filtering
