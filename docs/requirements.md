# Project Requirements

## 1. Business Goal

Build a professional JNF portal for IIT (ISM) Dhanbad that allows recruiters to complete the full submission process online and allows the CDC/admin team to review submissions in a structured workflow.

## 2. Project Basis

The requirements in this document are derived from the approved JNF database design and the `IIT_ISM_JNF v2.0.pptx` presentation. The aim is to convert those references into implementation-ready product requirements.

## 3. Primary Users

- Recruiter
- Admin

## 4. In-Scope Modules

### Public Portal

- Landing page
- Statistics section
- Recruiter entry points
- Quick links section

### Recruiter Onboarding

- Email OTP verification
- Recruiter details capture
- Company profile creation
- Recruiter login and logout

### Recruiter Workspace

- Dashboard
- Company profile management
- JNF list and detail
- New JNF creation
- Draft save and resume
- Preview and submit

### Admin Workspace

- Admin login and logout
- Admin dashboard
- JNF review queue
- Recruiter status management
- Company and JNF detail views

## 5. Functional Requirements

### 5.1 Public Portal

- Show institute branding and recruiter value proposition.
- Show placement statistics such as companies, placement rate, highest CTC, and departments.
- Show quick links for brochure, past recruiters, contact, policy, and manual items.
- Provide clear actions for recruiter registration and login.

### 5.2 Recruiter Registration

- Registration must follow a three-step flow.
- The recruiter must verify email through OTP before proceeding.
- OTP should support expiry handling.
- Public registration endpoints should support security controls such as reCAPTCHA.

### 5.3 Recruiter Profile

- Capture recruiter full name, designation, email, mobile number, and alternative mobile.
- Recruiter must be linked to a company profile.
- Recruiter account should support `pending`, `active`, and `blocked` states.

### 5.4 Company Profile

- Capture company name, website, postal address, employee count, and sector.
- Capture company logo and organization type.
- Capture date of establishment and annual turnover.
- Capture social media or LinkedIn URL.
- Capture HQ location for MNCs.
- Capture nature of business and description.
- Support industry tag mapping.

### 5.5 Recruiter Dashboard

- Show all JNFs created by the recruiter's company.
- Show status chips and last updated timestamps.
- Provide `+ New JNF` action.
- Allow opening draft, submitted, and changes-requested records.

### 5.6 JNF Creation and Editing

- Recruiter must be able to create a new draft JNF.
- The form must support autosave behavior.
- The form must support editing by section.
- The form must support full preview before submission.
- The recruiter must receive a submission confirmation after submit.

### 5.7 Contact and HR Details

- Capture Head HR details.
- Capture Primary PoC details.
- Capture Secondary PoC details as optional.
- Each contact must support full name, designation, email, mobile, and landline.

### 5.8 Job Profile

- Capture job title and formal designation separately.
- Capture place of posting and work location mode.
- Capture expected hires and minimum hires.
- Capture tentative joining month.
- Capture required skills as selectable tags.
- Capture job description using rich text or uploaded JD PDF.
- Capture additional job information.
- Capture bond details, registration link, and onboarding procedure.

### 5.9 Eligibility and Courses

- Capture minimum CGPA.
- Capture backlog policy.
- Capture high-school percentage criterion.
- Capture gender filter.
- Capture SLP requirement if applicable.
- Capture programme-level eligibility.
- Capture discipline-level eligibility.
- Capture PhD toggle and required departments.
- Capture MA/DHSS toggle.

### 5.10 Salary Details

- Support same salary structure for all programmes or different structure per programme.
- Support currency selection.
- Support salary data by programme.
- Capture base, gross, monthly take-home, first-year CTC, and annual CTC.
- Capture ESOPs, stock options, bond amount, bond duration, deductions, and breakup notes.
- Support additional salary component rows such as joining bonus or relocation allowance.

### 5.11 Selection Process

- Support pre-placement talk, resume shortlisting, tests, group discussion, and interview rounds.
- Support test type and interview mode selection.
- Support selection mode per stage.
- Support duration in minutes.
- Support infrastructure data such as team members and rooms required.
- Support psychometric and medical test options.
- Support free-text notes for other screening modes.

### 5.12 Declaration and Submit

- Show all declaration checkboxes before submission.
- Capture authorized signatory name, designation, date, and typed signature.
- Show preview with edit links before final submit.
- Show policy and recruiter guideline links inline.
- Send email confirmation after successful submission.

### 5.13 Admin Review

- Admin must see a list of submitted JNFs.
- Admin must be able to open a full JNF detail page.
- Admin must be able to move a JNF through `under_review`, `changes_requested`, `approved`, and `closed`.
- Admin must be able to record remarks or review notes.
- Admin must be able to change recruiter account status.

### 5.14 Portal Content

- Portal stats should be configurable.
- Quick links should be configurable.
- Policies and manuals should be delivered through quick-link types rather than a separate policy module.

## 6. Business Rules

- A recruiter belongs to one company.
- A company can have multiple recruiters over time.
- A company can create multiple JNFs.
- A JNF belongs to one company and one creator recruiter.
- A JNF must stay editable while it is `draft` or `changes_requested`.
- A JNF should not use a `rejected` status in the first design because the workflow uses `changes_requested` and `closed`.
- Repeatable sections such as contacts, salary components, and rounds must be stored as separate rows.

## 7. Non-Functional Requirements

- Responsive for desktop and mobile
- Clean, readable, form-first UX
- Secure auth and role-based access
- Reliable draft save behavior
- Audit logging for important actions
- Reporting-friendly normalized data
- Support for file uploads and email notifications
- Consistent naming across database, API, and UI

## 8. First Release Acceptance Criteria

- Recruiter can register, verify email, and log in.
- Recruiter can create, edit, preview, and submit a JNF.
- Admin can review and update JNF status.
- Company, recruiter, JNF, eligibility, salary, round, document, and declaration data are stored in dedicated relational tables.
- Docs are sufficient for frontend and backend development to begin without returning to the reference files for basic design decisions.
