# Database Design Specification

## 1. Purpose

This document defines the relational database design for the JNF Portal. It translates the approved ERD into an implementation-ready table catalogue, enum list, relationship map, and database guidance for backend development.

The design supports recruiter onboarding, company profile management, structured JNF submission, admin review, portal content, and audit tracking.

## 2. Database Platform and Conventions

- Database: MySQL or MariaDB
- Backend style: Laravel-compatible schema conventions
- Primary keys: `bigint` unless noted otherwise
- Naming convention: `snake_case`
- Timestamps: use Laravel-style `created_at` and `updated_at` where defined
- Business sections such as eligibility, salary, rounds, and declaration are stored in dedicated relational tables

## 3. Schema Modules

- Authentication and user accounts
- Company master data
- Academic master data
- JNF transactional data
- Portal content data
- Framework and operational tables

## 4. Authentication and User Tables

### `admins`

- `id` bigint
- `name` varchar(255)
- `email` varchar(255)
- `designation` varchar(255)
- `password` varchar(255)
- `status` `admin_status`
- `remember_token` varchar(100)
- `created_at` timestamp
- `updated_at` timestamp

### `recruiters`

- `id` bigint
- `company_id` bigint
- `full_name` varchar(255)
- `designation` varchar(255)
- `email` varchar(255)
- `mobile_number` varchar(30)
- `alternative_mobile` varchar(30)
- `password` varchar(255)
- `status` `recruiter_status`
- `email_verified_at` datetime
- `remember_token` varchar(100)
- `created_at` timestamp
- `updated_at` timestamp

### `recruiter_otps`

- `id` bigint
- `recruiter_email` varchar(255)
- `otp_code` varchar(10)
- `expires_at` datetime
- `verified_at` datetime
- `created_at` timestamp

## 5. Company Master Tables

### `companies`

- `id` bigint
- `name` varchar(255)
- `website` varchar(255)
- `postal_address` text
- `employee_count` int
- `sector` varchar(255)
- `logo_path` varchar(255)
- `category_or_org_type` varchar(100)
- `date_of_establishment` date
- `annual_turnover` decimal(18,2)
- `social_media_url` varchar(255)
- `hq_country` varchar(100)
- `hq_city` varchar(100)
- `nature_of_business` varchar(255)
- `description` text
- `is_mnc` boolean
- `created_at` timestamp
- `updated_at` timestamp

### `industry_tags`

- `id` bigint
- `name` varchar(100)
- `created_at` timestamp
- `updated_at` timestamp

### `company_industry_tags`

- `id` bigint
- `company_id` bigint
- `industry_tag_id` bigint
- `created_at` timestamp

## 6. Academic Master Tables

### `programmes`

- `id` bigint
- `code` varchar(50)
- `name` varchar(255)
- `level` `programme_level`
- `duration_years` decimal(4,1)
- `admission_channel` varchar(100)
- `is_active` boolean
- `created_at` timestamp
- `updated_at` timestamp

### `disciplines`

- `id` bigint
- `programme_id` bigint
- `name` varchar(255)
- `short_name` varchar(50)
- `is_active` boolean
- `created_at` timestamp
- `updated_at` timestamp

### `skills`

- `id` bigint
- `name` varchar(100)
- `created_at` timestamp
- `updated_at` timestamp

## 7. JNF Core and Child Tables

### `jnfs`

- `id` bigint
- `company_id` bigint
- `created_by` bigint
- `reviewed_by` bigint
- `jnf_number` varchar(50)
- `recruitment_season` varchar(50)
- `job_title` varchar(255)
- `job_designation` varchar(255)
- `place_of_posting` varchar(255)
- `work_location_mode` `work_location_mode`
- `expected_hires` int
- `minimum_hires` int
- `tentative_joining_month` date
- `job_description_html` text
- `additional_job_info` text
- `bond_details` text
- `registration_link` varchar(255)
- `onboarding_procedure` text
- `jd_pdf_path` varchar(255)
- `status` `jnf_status`
- `preview_completed` boolean
- `submitted_at` datetime
- `reviewed_at` datetime
- `review_notes` text
- `created_at` timestamp
- `updated_at` timestamp

### `jnf_contacts`

- `id` bigint
- `jnf_id` bigint
- `contact_type` `contact_type`
- `full_name` varchar(255)
- `designation` varchar(255)
- `email` varchar(255)
- `mobile_number` varchar(30)
- `landline` varchar(30)
- `is_optional` boolean
- `created_at` timestamp
- `updated_at` timestamp

### `jnf_skills`

- `id` bigint
- `jnf_id` bigint
- `skill_id` bigint
- `created_at` timestamp

### `jnf_eligibility_rules`

- `id` bigint
- `jnf_id` bigint
- `minimum_cgpa` decimal(4,2)
- `backlogs_allowed` boolean
- `max_backlogs` int
- `high_school_percentage_criterion` decimal(5,2)
- `gender_filter` `gender_filter_type`
- `slp_requirement` text
- `phd_allowed` boolean
- `phd_department_requirement` text
- `ma_dhss_allowed` boolean
- `other_specific_requirements` text
- `created_at` timestamp
- `updated_at` timestamp

### `jnf_eligibility_programmes`

- `id` bigint
- `jnf_id` bigint
- `programme_id` bigint
- `is_eligible` boolean
- `min_cpi_for_programme` decimal(4,2)
- `created_at` timestamp
- `updated_at` timestamp

### `jnf_eligibility_disciplines`

- `id` bigint
- `jnf_id` bigint
- `programme_id` bigint
- `discipline_id` bigint
- `is_eligible` boolean
- `min_cpi_for_discipline` decimal(4,2)
- `created_at` timestamp
- `updated_at` timestamp

### `jnf_salary_packages`

- `id` bigint
- `jnf_id` bigint
- `programme_id` bigint
- `salary_structure_mode` `salary_structure_mode`
- `currency` `currency_code`
- `ctc_annual` decimal(18,2)
- `base_fixed` decimal(18,2)
- `monthly_take_home` decimal(18,2)
- `gross_salary` decimal(18,2)
- `first_year_ctc` decimal(18,2)
- `stocks_options` decimal(18,2)
- `esops_value` decimal(18,2)
- `esops_vest_period` varchar(100)
- `bond_amount` decimal(18,2)
- `bond_duration_months` int
- `deductions_text` text
- `ctc_breakup_text` text
- `created_at` timestamp
- `updated_at` timestamp

### `jnf_salary_components`

- `id` bigint
- `salary_package_id` bigint
- `component_type` `salary_component_type`
- `component_label` varchar(255)
- `amount` decimal(18,2)
- `currency` `currency_code`
- `notes` text
- `created_at` timestamp
- `updated_at` timestamp

### `jnf_selection_rounds`

- `id` bigint
- `jnf_id` bigint
- `round_category` `round_category`
- `round_order` int
- `round_name` varchar(255)
- `selection_mode` `selection_mode`
- `interview_mode` `interview_mode`
- `test_type` `test_type`
- `duration_minutes` int
- `team_members_required` int
- `rooms_required` int
- `other_screening_notes` text
- `is_enabled` boolean
- `is_pre_offer_mandatory` boolean
- `created_at` timestamp
- `updated_at` timestamp

### `jnf_declarations`

- `id` bigint
- `jnf_id` bigint
- `aipc_guidelines_accepted` boolean
- `shortlisting_timeline_accepted` boolean
- `posted_information_verified` boolean
- `ranking_media_consent` boolean
- `accuracy_terms_accepted` boolean
- `rti_nirf_consent` boolean
- `authorised_signatory_name` varchar(255)
- `authorised_signatory_designation` varchar(255)
- `declaration_date` date
- `typed_signature` varchar(255)
- `preview_confirmed` boolean
- `email_confirmation_sent_at` datetime
- `created_at` timestamp
- `updated_at` timestamp

### `jnf_documents`

- `id` bigint
- `jnf_id` bigint
- `document_type` `document_type`
- `original_name` varchar(255)
- `stored_name` varchar(255)
- `file_path` varchar(255)
- `mime_type` varchar(100)
- `file_size` bigint
- `uploaded_by_type` `uploaded_by_type`
- `uploaded_by_id` bigint
- `created_at` timestamp

### `jnf_audit_logs`

- `id` bigint
- `jnf_id` bigint
- `actor_type` `audit_actor_type`
- `actor_id` bigint
- `action` `audit_action`
- `old_values_json` json
- `new_values_json` json
- `remarks` text
- `created_at` timestamp

## 8. Portal Content Tables

### `portal_stats`

- `id` bigint
- `metric_key` varchar(100)
- `metric_label` varchar(100)
- `metric_value` varchar(100)
- `display_order` int
- `is_active` boolean
- `created_at` timestamp
- `updated_at` timestamp

### `portal_quick_links`

- `id` bigint
- `title` varchar(255)
- `url` varchar(255)
- `link_type` `quick_link_type`
- `display_order` int
- `is_active` boolean
- `created_at` timestamp
- `updated_at` timestamp

## 9. Framework and Operational Tables

### `personal_access_tokens`

- `id` bigint
- `tokenable_type` varchar(255)
- `tokenable_id` bigint
- `name` varchar(255)
- `token` varchar(64)
- `abilities` text
- `last_used_at` timestamp
- `expires_at` timestamp
- `created_at` timestamp
- `updated_at` timestamp

### `migrations`

- `id` int
- `migration` varchar(255)
- `batch` int

### `password_reset_tokens`

- `email` varchar(255)
- `token` varchar(255)
- `created_at` timestamp

### `jobs`

- `id` bigint
- `queue` varchar(255)
- `payload` longtext
- `attempts` tinyint
- `reserved_at` int
- `available_at` int
- `created_at` int

### `job_batches`

- `id` varchar(255)
- `name` varchar(255)
- `total_jobs` int
- `pending_jobs` int
- `failed_jobs` int
- `failed_job_ids` longtext
- `options` mediumtext
- `cancelled_at` int
- `created_at` int
- `finished_at` int

### `failed_jobs`

- `id` bigint
- `uuid` varchar(255)
- `connection` text
- `queue` text
- `payload` longtext
- `exception` longtext
- `failed_at` timestamp

### `cache`

- `key` varchar(255)
- `value` mediumtext
- `expiration` int

### `cache_locks`

- `key` varchar(255)
- `owner` varchar(255)
- `expiration` int

### `sessions`

- `id` varchar(255)
- `user_id` bigint
- `ip_address` varchar(45)
- `user_agent` text
- `payload` longtext
- `last_activity` int

## 10. Enum Catalogue

### `admin_status`

- `active`
- `inactive`

### `recruiter_status`

- `pending`
- `active`
- `blocked`

### `jnf_status`

- `draft`
- `submitted`
- `under_review`
- `changes_requested`
- `approved`
- `closed`

### `work_location_mode`

- `on_site`
- `remote`
- `hybrid`

### `programme_level`

- `ug`
- `pg`
- `doctoral`
- `other`

### `gender_filter_type`

- `all`
- `male`
- `female`
- `others`

### `salary_structure_mode`

- `same_for_all`
- `different_per_programme`

### `currency_code`

- `INR`
- `USD`
- `EUR`

### `contact_type`

- `head_hr`
- `primary_poc`
- `secondary_poc`

### `round_category`

- `ppt`
- `resume_shortlisting`
- `online_test`
- `written_test`
- `aptitude_test`
- `technical_test`
- `group_discussion`
- `technical_interview`
- `personal_interview`
- `psychometric_test`
- `medical_test`
- `other`

### `selection_mode`

- `online`
- `offline`
- `hybrid`

### `interview_mode`

- `on_campus`
- `telephonic`
- `video_conferencing`

### `test_type`

- `aptitude`
- `technical`
- `written`
- `other`

### `salary_component_type`

- `joining_bonus`
- `retention_bonus`
- `variable_bonus`
- `relocation_allowance`
- `medical_allowance`
- `deduction`
- `other`

### `document_type`

- `company_logo`
- `jd_pdf`
- `brochure`
- `other`

### `uploaded_by_type`

- `recruiter`
- `admin`
- `system`

### `audit_actor_type`

- `recruiter`
- `admin`
- `system`

### `audit_action`

- `created`
- `updated`
- `autosaved`
- `submitted`
- `reviewed`
- `approved`
- `changes_requested`
- `closed`

### `quick_link_type`

- `brochure`
- `past_recruiters`
- `contact`
- `policy`
- `manual`
- `other`

## 11. Relationship Map

- `recruiters.company_id -> companies.id`
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
- `jnf_declarations.jnf_id -> jnfs.id`
- `jnf_documents.jnf_id -> jnfs.id`
- `jnf_audit_logs.jnf_id -> jnfs.id`

## 12. Recommended Constraints and Indexes

### Recommended Unique Constraints

- `admins.email`
- `recruiters.email`
- `industry_tags.name`
- `skills.name`
- `jnfs.jnf_number`

### Recommended Indexes

- `recruiters.company_id`
- `recruiters.status`
- `companies.name`
- `jnfs.company_id`
- `jnfs.created_by`
- `jnfs.reviewed_by`
- `jnfs.status`
- `jnfs.recruitment_season`
- `jnf_contacts.jnf_id`
- `jnf_eligibility_programmes.jnf_id`
- `jnf_eligibility_disciplines.jnf_id`
- `jnf_salary_packages.jnf_id`
- `jnf_selection_rounds.jnf_id`
- `portal_quick_links.link_type`

## 13. Seed Data Expectations

The first implementation should seed:

- `programmes`
- `disciplines`
- `skills`
- `industry_tags`
- `portal_stats`
- `portal_quick_links`

## 14. Implementation Notes

- `companies` stores one `social_media_url`; this design does not use a separate social-links table.
- `portal_quick_links` handles policy and manual links through `quick_link_type`.
- `jnf_documents.uploaded_by_type` and `uploaded_by_id` are polymorphic metadata fields.
- `jnf_audit_logs.actor_type` and `actor_id` are polymorphic audit references.
- `email_confirmation_sent_at` in `jnf_declarations` supports the submission confirmation feature described in the presentation.
- `audit_action = autosaved` supports the autosave behavior described in the recruiter JNF form flow.
