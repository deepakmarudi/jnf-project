# API Design

## 1. System Overview

This API supports the IIT (ISM) JNF Portal with two major actors:

- Recruiter
- Admin

Logical layers:

- Frontend portal
- API layer
- Database layer

Base path:

- `/api`

Auth model:

- Token-based auth
- Separate recruiter and admin login flows
- Bearer token in `Authorization` header

Standard response shape:

```json
{
  "message": "Optional message",
  "data": {},
  "meta": {}
}
```

Standard error shape:

```json
{
  "message": "Validation failed.",
  "errors": {
    "field_name": ["Error text"]
  }
}
```

## 2. Auth Module

### Endpoints

- `POST /api/auth/send-otp`
- `POST /api/auth/verify-otp`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`

### Purpose

- Validate recruiter email
- Create recruiter account
- Create company during first registration
- Return current recruiter session

### Main payload fields

- email
- otp
- recruiter name
- designation
- phone
- alternate phone
- password
- company object

## 3. Company Module

### Endpoints

- `POST /api/companies`
- `GET /api/companies/:id`
- `PUT /api/companies/:id`
- `GET /api/companies`

### Purpose

- Create company record
- Read company profile
- Update company profile
- List companies for admin/reporting

### Main payload fields

- name
- website
- postal_address
- employee_count
- sector
- logo_path
- category_or_org_type
- date_of_establishment
- annual_turnover
- social_media_url
- hq_country
- hq_city
- nature_of_business
- description
- is_mnc

## 4. Recruiter Module

### Endpoints

- `GET /api/recruiters/me`
- `PUT /api/recruiters/me`

### Purpose

- Return recruiter profile
- Update recruiter profile details

### Main payload fields

- full_name
- designation
- mobile_number
- alternative_mobile

## 5. JNF Core Module

### Endpoints

- `POST /api/jnfs`
- `GET /api/jnfs`
- `GET /api/jnfs/:id`
- `PUT /api/jnfs/:id`
- `DELETE /api/jnfs/:id`
- `POST /api/jnfs/:id/submit`
- `POST /api/jnfs/:id/preview`

### Purpose

- Create draft JNF
- List recruiter JNFs
- Get one JNF
- Update JNF
- Delete draft JNF
- Submit JNF for admin review
- Return preview-ready aggregated JNF data

### Main payload fields

- jnf_number
- recruitment_season
- job_title
- job_designation
- place_of_posting
- work_location_mode
- expected_hires
- minimum_hires
- tentative_joining_month
- registration_link
- status

## 6. JNF Contacts

### Endpoints

- `POST /api/jnfs/:id/contacts`
- `GET /api/jnfs/:id/contacts`
- `PUT /api/contacts/:id`
- `DELETE /api/contacts/:id`

### Purpose

- Add recruiter/HR contact rows to a JNF
- Read all contacts for a JNF
- Update a single contact
- Delete a contact

### Main payload fields

- contact_type
- full_name
- designation
- email
- mobile_number
- landline
- is_optional

## 7. Skills

### Endpoints

- `GET /api/skills`
- `POST /api/jnfs/:id/skills`

### Purpose

- Return available skill tags
- Attach selected skills to a JNF

### Main payload fields

- skill_ids

## 8. Eligibility

### Endpoints

- `POST /api/jnfs/:id/eligibility`
- `GET /api/jnfs/:id/eligibility`
- `PUT /api/jnfs/:id/eligibility`

### Purpose

- Create eligibility block
- Read eligibility block
- Update eligibility block

### Main payload fields

- minimum_cgpa
- backlogs_allowed
- max_backlogs
- high_school_percentage_criterion
- gender_filter
- slp_requirement
- phd_allowed
- phd_department_requirement
- ma_dhss_allowed
- programme rows
- discipline rows

## 9. Salary

### Endpoints

- `POST /api/jnfs/:id/salary`
- `GET /api/jnfs/:id/salary`
- `PUT /api/jnfs/:id/salary`

### Purpose

- Create salary section
- Read salary section
- Update salary section

### Main payload fields

- programme_id
- salary_structure_mode
- currency
- ctc_annual
- base_fixed
- monthly_take_home
- gross_salary
- first_year_ctc
- stocks_options
- esops_value
- esops_vest_period
- bond_amount
- bond_duration_months
- deductions_text
- ctc_breakup_text
- salary components

## 10. Selection Process

### Endpoints

- `POST /api/jnfs/:id/rounds`
- `GET /api/jnfs/:id/rounds`
- `PUT /api/rounds/:id`
- `DELETE /api/rounds/:id`

### Purpose

- Create round rows
- Read all rounds
- Update a round
- Delete a round

### Main payload fields

- round_category
- round_order
- round_name
- selection_mode
- interview_mode
- test_type
- duration_minutes
- team_members_required
- rooms_required
- other_screening_notes
- is_pre_offer_mandatory

## 11. Documents

### Endpoints

- `POST /api/jnfs/:id/documents`
- `GET /api/jnfs/:id/documents`
- `DELETE /api/documents/:id`

### Purpose

- Upload JNF documents
- Read JNF documents
- Delete JNF documents

### Main payload fields

- document_type
- file
- original_name
- stored_name
- file_path
- mime_type
- file_size

## 12. Declaration

### Endpoints

- `POST /api/jnfs/:id/declaration`
- `GET /api/jnfs/:id/declaration`

### Purpose

- Save final declaration block
- Read final declaration block

### Main payload fields

- aipc_guidelines_accepted
- shortlisting_timeline_accepted
- posted_information_verified
- ranking_media_consent
- accuracy_terms_accepted
- rti_nirf_consent
- authorised_signatory_name
- authorised_signatory_designation
- declaration_date
- typed_signature
- preview_confirmed

## 13. Admin Module

### Endpoints

- `POST /api/admin/auth/login`
- `GET /api/admin/auth/me`
- `POST /api/admin/auth/logout`
- `GET /api/admin/jnfs`
- `GET /api/admin/jnfs/:id`
- `POST /api/admin/jnfs/:id/review`
- `POST /api/admin/jnfs/:id/approve`
- `POST /api/admin/jnfs/:id/reject`
- `GET /api/admin/recruiters`
- `PATCH /api/admin/recruiters/:id/status`
- `GET /api/admin/dashboard`

### Purpose

- Admin login/session
- Review submitted JNFs
- Approve or reject JNFs
- View recruiter list
- Change recruiter status
- Dashboard reporting

### Main payload fields

- status
- review_notes
- recruiter status

## 14. Portal Features

### Endpoints

- `GET /api/stats`
- `GET /api/quick-links`
- `GET /api/policies`

### Purpose

- Landing page stats
- quick links
- recruiter/admin policies and manuals

## 15. Flow Summary

Recruiter flow:

- register
- verify OTP
- login
- create company
- create JNF
- fill section APIs
- preview
- submit

Admin flow:

- login
- list submitted JNFs
- view detail
- review
- approve or reject

## 16. Synchronization Rules

The API developer and DB developer must use the exact same names for:

- route paths
- request field names
- enum values
- object keys
- status values
- foreign key concepts

Do not rename fields in controller code without updating the database mapping document.

## 17. API to Database Sync Map

| API module | Main tables it depends on |
| --- | --- |
| Auth | `recruiters`, `recruiter_otps`, `companies` |
| Company | `companies`, `company_social_links`, `company_industry_tags` |
| Recruiter | `recruiters` |
| JNF Core | `jnfs` |
| Contacts | `jnf_contacts` |
| Skills | `skills`, `jnf_skills` |
| Eligibility | `jnf_eligibility_rules`, `jnf_eligibility_programmes`, `jnf_eligibility_disciplines` |
| Salary | `jnf_salary_packages`, `jnf_salary_components` |
| Selection Process | `jnf_selection_rounds` |
| Documents | `jnf_documents` |
| Declaration | `jnf_declarations` |
| Admin Review | `jnfs`, `admins`, `jnf_audit_logs` |
| Portal Features | `portal_stats`, `portal_quick_links`, `policy_links` |

## 18. Source of Truth Files

- `backend/docs/openapi.yaml`
- `backend/routes/api.php`
- `docs/database.md`
