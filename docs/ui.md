# UI and UX Design

## 1. Design Goal

Create a recruiter and admin portal that feels professional, structured, and easy to use for long-form submission workflows. The UI should translate the approved JNF design into a practical web experience without making the form feel overwhelming.

## 2. UX Principles

- Keep long forms manageable through grouping and progression.
- Show status and progress clearly at all times.
- Make editing and review easy for both recruiters and admins.
- Use clean layouts with strong readability and obvious actions.
- Support desktop-first data entry while remaining usable on mobile.

## 3. Information Architecture

### Public Pages

- `/`
- `/login`
- `/register`
- `/admin/login`

### Recruiter Pages

- `/dashboard`
- `/company`
- `/jnfs`
- `/jnfs/new`
- `/jnfs/{id}`
- `/jnfs/{id}/preview`

### Admin Pages

- `/admin/dashboard`
- `/admin/jnfs`
- `/admin/jnfs/{id}`
- `/admin/recruiters`
- `/admin/companies`

## 4. Public Portal Design

### Landing Page Sections

- Header with institute branding and recruiter CTAs
- Hero section
- Placement statistics cards
- Why Recruit at IIT (ISM) section
- Quick links section
- Contact and footer area

### Landing Page Behavior

- Primary actions: `Register Now` and `Recruiter Login`
- Quick links should support brochure, past recruiters, policy, manual, and contact links
- Layout should be responsive and accessible

## 5. Registration and Login UX

### Registration Flow

- Step 1: Email OTP
- Step 2: Recruiter Information
- Step 3: Company Profile

### Registration Rules

- Show progress indicator for all three steps
- Require OTP verification before moving forward
- Support reCAPTCHA on public verification flow
- Use inline validation and concise field help text

### Login

- Separate recruiter and admin login pages
- Keep the login form minimal and clear

## 6. Recruiter Dashboard UX

### Dashboard Content

- Greeting or account summary
- `+ New JNF` button
- JNF cards or table rows
- Status chip for each JNF
- Last updated timestamp

### JNF List Filters

- Status
- Recruitment season
- Company role or title search

## 7. JNF Editor Design

### Recommended Editor Layout

Use a six-tab or six-section layout inspired by the presentation:

1. Job Profile and Contacts
2. Eligibility and Courses
3. Salary Details
4. Selection Process
5. Additional Details and Documents
6. Declaration and Submit

### Job Profile and Contacts

- Job title and designation
- Place of posting
- Work location mode
- Expected and minimum hires
- Joining month
- Skills tag input
- Rich-text JD editor
- JD PDF upload
- Contact rows for Head HR, Primary PoC, and Secondary PoC

### Eligibility and Courses

- Summary rule fields at the top
- Programme eligibility matrix
- Discipline eligibility matrix
- Select-all controls where useful

### Salary Details

- Same-for-all-programmes toggle
- Programme-wise accordion or table layout
- Salary component sub-rows
- Currency selector

### Selection Process

- Ordered stage builder
- Toggle-based and dropdown-based configuration
- Duration and infrastructure fields
- Ability to add multiple rounds

### Additional Details and Documents

- Bond details
- Registration link
- Onboarding procedure
- Document upload list

### Declaration and Submit

- Compliance checkboxes
- Authorized signatory inputs
- Typed signature
- Preview trigger
- Submit action

## 8. Key Interaction Patterns

### Autosave

- Save data after section updates
- Show a small saved-state indicator or toast
- Keep the save behavior non-blocking

### Validation

- Validate by section
- Preserve entered data when validation fails
- Highlight missing required fields clearly

### Character Counters

- Use counters on longer free-text fields such as additional job info
- Keep counters subtle but visible

### Repeatable Rows

- Contacts, salary components, and rounds should use repeatable row components
- Provide add, edit, and delete actions with clear labels

## 9. Preview Screen

### Preview Requirements

- Show the full JNF in read-only mode
- Group content in the same sequence as the editor
- Provide edit links back to each section
- Make the layout print-friendly

## 10. Admin Review UX

### Queue Page

- Filter by status, company, season, and date
- Show counts for submitted and under-review records
- Keep table layout compact and scannable

### Detail Page

- Show the full JNF in a structured review layout
- Show recruiter and company summary at the top
- Show remarks panel and review actions
- Show audit timeline

## 11. Status Presentation

### JNF Status Chips

- `draft`
- `submitted`
- `under_review`
- `changes_requested`
- `approved`
- `closed`

### Recruiter Status Chips

- `pending`
- `active`
- `blocked`

## 12. Reusable Components

- Status chip
- Section header
- Stepper or tab navigation
- Matrix selector for eligibility
- Repeatable row table
- File upload block
- Audit timeline
- Preview summary card

## 13. Responsive Behavior

- Keep main editing optimized for desktop and laptop
- Stack cards and tables carefully on mobile
- Preserve access to status, actions, and save state on smaller screens

## 14. Accessibility and Content Rules

- Use clear field labels and helper text
- Do not rely on color alone for status
- Keep keyboard navigation usable in tables and tabbed forms
- Use human-friendly labels in the UI even when database values use enum identifiers
