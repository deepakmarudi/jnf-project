# Backend Modules and Responsibilities

## 1. Auth Module

### Purpose

Handles recruiter OTP verification, registration, login, logout, and current-user lookup.

### Main tables

- `recruiters`
- `recruiter_otps`
- `companies`
- `personal_access_tokens`

### Main endpoints

- `POST /api/auth/send-otp`
- `POST /api/auth/verify-otp`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`

### Notes

- registration creates recruiter and company together
- OTP expiry and single-use behavior must be enforced

## 2. Admin Auth Module

### Purpose

Handles admin login, logout, and current-user lookup.

### Main tables

- `admins`
- `personal_access_tokens`

### Main endpoints

- `POST /api/admin/auth/login`
- `GET /api/admin/auth/me`
- `POST /api/admin/auth/logout`

## 3. Company Module

### Purpose

Returns and updates the authenticated recruiter’s company profile.

### Main tables

- `companies`
- `industry_tags`
- `company_industry_tags`

### Main endpoints

- `GET /api/companies/me`
- `PUT /api/companies/me`

### Notes

- one company row can be reused by multiple JNFs
- industry tags should be managed through mapping rows

## 4. Recruiter Module

### Purpose

Returns and updates recruiter profile fields.

### Main tables

- `recruiters`

### Main endpoints

- `GET /api/recruiters/me`
- `PUT /api/recruiters/me`

## 5. Dashboard Module

### Purpose

Provides recruiter dashboard summary data.

### Main tables

- `recruiters`
- `companies`
- `jnfs`

### Main endpoints

- `GET /api/dashboard`

### Expected response blocks

- recruiter summary
- company summary
- JNF counts by status
- recent JNFs

## 6. JNF Core Module

### Purpose

Creates, lists, returns, updates, previews, submits, and deletes JNFs.

### Main tables

- `jnfs`

### Main endpoints

- `POST /api/jnfs`
- `GET /api/jnfs`
- `GET /api/jnfs/{jnf}`
- `PUT /api/jnfs/{jnf}`
- `DELETE /api/jnfs/{jnf}`
- `POST /api/jnfs/{jnf}/preview`
- `POST /api/jnfs/{jnf}/submit`

### Notes

- delete should be restricted by status rules
- preview should aggregate all child section data

## 7. Contacts Module

### Purpose

Stores recruiter contact and HR contact rows for a JNF.

### Main tables

- `jnf_contacts`

### Main endpoints

- `POST /api/jnfs/{jnf}/contacts`
- `GET /api/jnfs/{jnf}/contacts`
- `PUT /api/contacts/{contact}`
- `DELETE /api/contacts/{contact}`

## 8. Skills Module

### Purpose

Stores required skills for a JNF.

### Main tables

- `skills`
- `jnf_skills`

### Main endpoints

- `GET /api/skills`
- `GET /api/jnfs/{jnf}/skills`
- `PUT /api/jnfs/{jnf}/skills`

## 9. Eligibility Module

### Purpose

Stores JNF eligibility rules and programme or discipline-level eligibility rows.

### Main tables

- `jnf_eligibility_rules`
- `jnf_eligibility_programmes`
- `jnf_eligibility_disciplines`

### Main endpoints

- `GET /api/jnfs/{jnf}/eligibility`
- `PUT /api/jnfs/{jnf}/eligibility`

## 10. Salary Module

### Purpose

Stores salary packages and additional salary components.

### Main tables

- `jnf_salary_packages`
- `jnf_salary_components`

### Main endpoints

- `GET /api/jnfs/{jnf}/salary`
- `PUT /api/jnfs/{jnf}/salary`

### Notes

- support same-for-all and per-programme structures

## 11. Selection Process Module

### Purpose

Stores selection round rows with order and stage configuration.

### Main tables

- `jnf_selection_rounds`

### Main endpoints

- `POST /api/jnfs/{jnf}/rounds`
- `GET /api/jnfs/{jnf}/rounds`
- `PUT /api/rounds/{round}`
- `DELETE /api/rounds/{round}`

## 12. Declaration Module

### Purpose

Stores final declaration and submission confirmation fields.

### Main tables

- `jnf_declarations`

### Main endpoints

- `GET /api/jnfs/{jnf}/declaration`
- `PUT /api/jnfs/{jnf}/declaration`

## 13. Documents Module

### Purpose

Stores upload metadata for logos, JD PDFs, brochures, and other files.

### Main tables

- `jnf_documents`

### Main endpoints

- `POST /api/jnfs/{jnf}/documents`
- `GET /api/jnfs/{jnf}/documents`
- `DELETE /api/documents/{document}`

## 14. Admin Review Module

### Purpose

Handles review queue, JNF status transitions, and recruiter status changes.

### Main tables

- `jnfs`
- `admins`
- `recruiters`
- `jnf_audit_logs`

### Main endpoints

- `GET /api/admin/dashboard`
- `GET /api/admin/jnfs`
- `GET /api/admin/jnfs/{jnf}`
- `POST /api/admin/jnfs/{jnf}/start-review`
- `POST /api/admin/jnfs/{jnf}/request-changes`
- `POST /api/admin/jnfs/{jnf}/approve`
- `POST /api/admin/jnfs/{jnf}/close`
- `GET /api/admin/recruiters`
- `PATCH /api/admin/recruiters/{recruiter}/status`

## 15. Portal Content Module

### Purpose

Returns landing-page content such as stats and quick links.

### Main tables

- `portal_stats`
- `portal_quick_links`

### Main endpoints

- `GET /api/portal/stats`
- `GET /api/portal/quick-links`

## 16. Audit Module

### Purpose

Stores and exposes audit history for important JNF actions.

### Main tables

- `jnf_audit_logs`

### Notes

- audit logging should happen inside workflow services, not only inside controllers