# Backend Architecture

## 1. Architectural Style

The backend should be built as a Laravel REST API with clear separation between routing, validation, business logic, persistence, and authorization.

## 2. Recommended Application Layers

### Routes

- Define route groups by module.
- Keep recruiter and admin route groups separate.
- Apply auth middleware only where required.

### Controllers

- Keep controllers thin.
- Controllers should accept requests, call services or actions, and return formatted responses.
- Controllers should not contain large business workflows directly.

### Form Requests

- Use Laravel Form Request classes for validation.
- Keep request validation centralized per endpoint or per update flow.

### Services or Actions

- Place workflow logic in service or action classes.
- Good candidates:
  - OTP generation and verification
  - recruiter registration
  - JNF submission
  - admin review transitions
  - audit log creation

### Models

- Use Eloquent models for table mapping and relationships.
- Keep fillable fields, casts, and relationships inside models.

### Policies or Gates

- Use policies for access control.
- Recruiters should only see their own company data.
- Admin-only actions should be protected at the route and policy levels.

### Notifications and Jobs

- Use jobs or notifications for:
  - OTP sending
  - JNF submission email confirmation
  - any delayed email or long-running process

## 3. Recommended Module Structure

Suggested backend modules:

- `Auth`
- `Admin/Auth`
- `Company`
- `Recruiter`
- `Dashboard`
- `Jnf`
- `Jnf/Contacts`
- `Jnf/Skills`
- `Jnf/Eligibility`
- `Jnf/Salary`
- `Jnf/Rounds`
- `Jnf/Declaration`
- `Jnf/Documents`
- `Admin/Review`
- `Portal`
- `Audit`

## 4. Authentication Design

### Recruiter Auth

- OTP verification before registration completes
- token-based API authentication
- current-user endpoint

### Admin Auth

- separate login flow
- separate guard or clear role enforcement
- token-based API authentication

## 5. Authorization Rules

### Recruiter permissions

- view and update own recruiter profile
- view and update own company profile
- create and manage own company JNFs
- cannot review or approve JNFs

### Admin permissions

- view all recruiters, companies, and JNFs
- move JNF status through review flow
- update recruiter status

## 6. Data and Persistence Strategy

- use normalized relational tables
- use foreign keys for ownership
- use enums or controlled string values for statuses
- keep repeatable rows in dedicated child tables
- aggregate JNF detail in API responses rather than flattening data into a single table

## 7. File Handling Strategy

The backend should support:

- company logo uploads
- JD PDF uploads
- brochure and other documents

Recommended handling:

- validate mime type and file size
- store file metadata in `jnf_documents`
- separate file path storage from business fields

## 8. Audit and Workflow Tracking

Major actions should create audit log rows:

- created
- updated
- autosaved
- submitted
- reviewed
- approved
- changes_requested
- closed

## 9. Error Handling

All APIs should return a consistent error shape:

- validation errors
- unauthorized responses
- forbidden responses
- not found responses
- business-rule violations

## 10. Environment Dependencies

Backend implementation should plan for:

- database configuration
- mail configuration
- queue configuration
- storage driver
- captcha secret if used

## 11. Recommended Engineering Practices

- build module by module
- keep migrations small and reviewable
- write seeders for master data
- define policies early
- test routes in Postman or Insomnia before frontend integration