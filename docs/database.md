# Database Design

## 1. System Overview

The database is designed for a JNF portal with two working tracks:

- API/backend developer
- Database developer

The structure below mirrors the API modules so both developers can stay synchronized.

Database type:

- MySQL or MariaDB

Design principles:

- Normalize repeated business data
- Use foreign keys for ownership and review flow
- Keep lookup/master data separate
- Support reporting and filtering

## 2. Auth Module Tables

### `recruiters`

- id
- company_id
- full_name
- designation
- email
- mobile_number
- alternative_mobile
- password
- status
- email_verified_at

### `recruiter_otps`

- id
- recruiter_email
- otp_code
- expires_at
- verified_at

### `admins`

- id
- name
- email
- designation
- password
- status

## 3. Company Module Tables

### `companies`

- id
- name
- website
- postal_address
- employee_count
- sector
- logo_path
- category_or_org_type
- date_of_establishment
- annual_turnover
- hq_country
- hq_city
- nature_of_business
- description
- is_mnc

### `company_social_links`

- id
- company_id
- platform
- url

### `industry_tags`

- id
- name

### `company_industry_tags`

- id
- company_id
- industry_tag_id

## 4. Recruiter Module Tables

Recruiter profile updates rely mainly on:

- `recruiters`
- `companies`

## 5. JNF Core Module Tables

### `jnfs`

- id
- company_id
- created_by
- reviewed_by
- jnf_number
- recruitment_season
- job_title
- job_designation
- place_of_posting
- work_location_mode
- expected_hires
- minimum_hires
- tentative_joining_month
- job_description_html
- additional_job_info
- bond_details
- registration_link
- onboarding_procedure
- jd_pdf_path
- status
- preview_completed
- submitted_at
- reviewed_at
- review_notes

## 6. JNF Contacts Tables

### `jnf_contacts`

- id
- jnf_id
- contact_type
- full_name
- designation
- email
- mobile_number
- landline
- is_optional

## 7. Skills Tables

### `skills`

- id
- name

### `jnf_skills`

- id
- jnf_id
- skill_id

## 8. Eligibility Tables

### `programmes`

- id
- code
- name
- level
- duration_years
- admission_channel

### `disciplines`

- id
- programme_id
- name
- short_name

### `jnf_eligibility_rules`

- id
- jnf_id
- minimum_cgpa
- backlogs_allowed
- max_backlogs
- high_school_percentage_criterion
- gender_filter
- slp_requirement
- phd_allowed
- phd_department_requirement
- ma_dhss_allowed
- other_specific_requirements

### `jnf_eligibility_programmes`

- id
- jnf_id
- programme_id
- is_eligible
- min_cpi_for_programme

### `jnf_eligibility_disciplines`

- id
- jnf_id
- programme_id
- discipline_id
- is_eligible
- min_cpi_for_discipline

## 9. Salary Tables

### `jnf_salary_packages`

- id
- jnf_id
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

### `jnf_salary_components`

- id
- salary_package_id
- component_type
- component_label
- amount
- currency
- notes

## 10. Selection Process Tables

### `jnf_selection_rounds`

- id
- jnf_id
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
- is_enabled
- is_pre_offer_mandatory

## 11. Documents Tables

### `jnf_documents`

- id
- jnf_id
- document_type
- original_name
- stored_name
- file_path
- mime_type
- file_size
- uploaded_by_type
- uploaded_by_id

## 12. Declaration Tables

### `jnf_declarations`

- id
- jnf_id
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
- email_confirmation_sent_at

## 13. Admin Module Tables

### `jnf_audit_logs`

- id
- jnf_id
- actor_type
- actor_id
- action
- old_values_json
- new_values_json
- remarks

Admin dashboard and review rely on:

- `admins`
- `recruiters`
- `companies`
- `jnfs`
- `jnf_audit_logs`

## 14. Portal Features Tables

### `portal_stats`

- id
- metric_key
- metric_label
- metric_value
- display_order
- is_active

### `portal_quick_links`

- id
- title
- url
- link_type
- display_order
- is_active

### `policy_links`

- id
- title
- url
- description
- display_order
- is_active

## 15. Flow Summary Mapping

Recruiter flow touches:

- `recruiter_otps`
- `recruiters`
- `companies`
- `jnfs`
- `jnf_contacts`
- `jnf_skills`
- `jnf_eligibility_*`
- `jnf_salary_*`
- `jnf_selection_rounds`
- `jnf_documents`
- `jnf_declarations`

Admin flow touches:

- `admins`
- `jnfs`
- `jnf_audit_logs`
- `recruiters`

## 16. Synchronization Rules

The DB developer must keep these exactly aligned with the API document:

- table ownership
- foreign keys
- enum values
- field names
- nullable vs required behavior
- one-to-one vs one-to-many assumptions

If the API uses `status = submitted`, the database must store the same literal value.

## 17. Recommended Foreign Keys

- `recruiters.company_id -> companies.id`
- `company_social_links.company_id -> companies.id`
- `company_industry_tags.company_id -> companies.id`
- `company_industry_tags.industry_tag_id -> industry_tags.id`
- `disciplines.programme_id -> programmes.id`
- `jnfs.company_id -> companies.id`
- `jnfs.created_by -> recruiters.id`
- `jnfs.reviewed_by -> admins.id`
- `jnf_contacts.jnf_id -> jnfs.id`
- `jnf_skills.jnf_id -> jnfs.id`
- `jnf_skills.skill_id -> skills.id`
- `jnf_eligibility_rules.jnf_id -> jnfs.id`
- `jnf_eligibility_programmes.jnf_id -> jnfs.id`
- `jnf_eligibility_programmes.programme_id -> programmes.id`
- `jnf_eligibility_disciplines.jnf_id -> jnfs.id`
- `jnf_eligibility_disciplines.programme_id -> programmes.id`
- `jnf_eligibility_disciplines.discipline_id -> disciplines.id`
- `jnf_salary_packages.jnf_id -> jnfs.id`
- `jnf_salary_packages.programme_id -> programmes.id`
- `jnf_salary_components.salary_package_id -> jnf_salary_packages.id`
- `jnf_selection_rounds.jnf_id -> jnfs.id`
- `jnf_documents.jnf_id -> jnfs.id`
- `jnf_declarations.jnf_id -> jnfs.id`
- `jnf_audit_logs.jnf_id -> jnfs.id`

## 18. Index Recommendations

- recruiters.email
- admins.email
- companies.name
- jnfs.company_id
- jnfs.created_by
- jnfs.reviewed_by
- jnfs.status
- jnfs.tentative_joining_month
- jnf_contacts.jnf_id
- jnf_salary_packages.jnf_id
- jnf_selection_rounds.jnf_id
- jnf_eligibility_programmes.jnf_id
- jnf_eligibility_disciplines.jnf_id

## 19. Source of Truth Files

- `docs/api.md`
- `backend/docs/openapi.yaml`
- `backend/routes/api.php`
