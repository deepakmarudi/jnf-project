# API Design Specification

## 1. Purpose

This document defines the REST API contract for the JNF Portal. It is written for frontend and backend implementation and covers authentication, recruiter workflows, admin workflows, portal content, and the section-wise JNF data model.

The API design is based on the approved relational schema and the form behavior described in the `IIT_ISM_JNF v2.0.pptx` presentation.

## 2. API Standards

### Base Path

- `/api`

### Format

- JSON for standard requests and responses
- `multipart/form-data` for file uploads

### Naming Convention

- Use `snake_case` for request and response fields
- Use schema-aligned names wherever data maps directly to database columns

### Authentication

- Bearer token authentication
- Laravel Sanctum token storage
- Separate recruiter and admin login flows

### Common Success Response

```json
{
  "message": "Optional message",
  "data": {},
  "meta": {}
}
```

### Common Error Response

```json
{
  "message": "Validation failed.",
  "errors": {
    "field_name": ["Error text"]
  }
}
```

## 3. Security and Session Rules

- Recruiter registration uses OTP verification.
- Public registration endpoints may require `recaptcha_token`.
- Recruiter and admin access tokens are issued separately.
- Recruiters can only access their own company and company-owned JNFs.
- Admin users can view review and management endpoints.

## 4. Public Portal APIs

### `GET /api/portal/stats`

Returns the landing-page statistics from `portal_stats`.

### `GET /api/portal/quick-links`

Returns quick links from `portal_quick_links`.

### Query Parameters

- `link_type`
- `is_active`

## 5. Recruiter Authentication APIs

### `POST /api/auth/send-otp`

#### Request fields

- `recruiter_email`
- `recaptcha_token`

### `POST /api/auth/verify-otp`

#### Request fields

- `recruiter_email`
- `otp_code`

### `POST /api/auth/register`

#### Request fields

- `full_name`
- `designation`
- `email`
- `mobile_number`
- `alternative_mobile`
- `password`
- `confirm_password`
- `company`

#### `company` object

- `name`
- `website`
- `postal_address`
- `employee_count`
- `sector`
- `logo_path`
- `category_or_org_type`
- `date_of_establishment`
- `annual_turnover`
- `social_media_url`
- `hq_country`
- `hq_city`
- `nature_of_business`
- `description`
- `is_mnc`
- `industry_tag_ids`

### `POST /api/auth/login`

#### Request fields

- `email`
- `password`

### `GET /api/auth/me`

Returns authenticated recruiter profile and company summary.

### `POST /api/auth/logout`

Invalidates current recruiter token.

## 6. Recruiter Dashboard APIs

### `GET /api/dashboard`

Returns recruiter dashboard data.

### Expected response blocks

- recruiter summary
- company summary
- JNF counts by status
- recent JNFs

## 7. Company APIs

### `GET /api/companies/me`

Returns the recruiter's company profile.

### `PUT /api/companies/me`

Updates the recruiter's company profile.

### Main request fields

- `name`
- `website`
- `postal_address`
- `employee_count`
- `sector`
- `logo_path`
- `category_or_org_type`
- `date_of_establishment`
- `annual_turnover`
- `social_media_url`
- `hq_country`
- `hq_city`
- `nature_of_business`
- `description`
- `is_mnc`
- `industry_tag_ids`

## 8. Recruiter Profile APIs

### `GET /api/recruiters/me`

Returns recruiter profile fields.

### `PUT /api/recruiters/me`

Updates recruiter profile fields.

### Main request fields

- `full_name`
- `designation`
- `mobile_number`
- `alternative_mobile`

## 9. JNF Core APIs

### `POST /api/jnfs`

Creates a new draft JNF.

### `GET /api/jnfs`

Lists JNFs for the authenticated recruiter's company.

### Query Parameters

- `status`
- `recruitment_season`
- `search`

### `GET /api/jnfs/{jnf}`

Returns full aggregated JNF data for edit or view.

### `PUT /api/jnfs/{jnf}`

Updates top-level JNF fields.

### `DELETE /api/jnfs/{jnf}`

Deletes a JNF only when business rules allow it, typically in `draft`.

### `POST /api/jnfs/{jnf}/preview`

Returns a preview-ready aggregated JNF payload.

### `POST /api/jnfs/{jnf}/submit`

Marks the JNF as submitted and triggers submission-side actions such as audit log and email confirmation.

### Main JNF request fields

- `jnf_number`
- `recruitment_season`
- `job_title`
- `job_designation`
- `place_of_posting`
- `work_location_mode`
- `expected_hires`
- `minimum_hires`
- `tentative_joining_month`
- `job_description_html`
- `additional_job_info`
- `bond_details`
- `registration_link`
- `onboarding_procedure`
- `jd_pdf_path`

## 10. JNF Contacts APIs

### `POST /api/jnfs/{jnf}/contacts`

Creates a contact row.

### `GET /api/jnfs/{jnf}/contacts`

Lists all contact rows for the JNF.

### `PUT /api/contacts/{contact}`

Updates a contact row.

### `DELETE /api/contacts/{contact}`

Deletes a contact row.

### Main request fields

- `contact_type`
- `full_name`
- `designation`
- `email`
- `mobile_number`
- `landline`
- `is_optional`

## 11. JNF Skills APIs

### `GET /api/skills`

Returns the skill master list.

### `GET /api/jnfs/{jnf}/skills`

Returns selected skills for the JNF.

### `PUT /api/jnfs/{jnf}/skills`

Replaces the selected skill set.

### Main request fields

- `skill_ids`

## 12. JNF Eligibility APIs

### `GET /api/jnfs/{jnf}/eligibility`

Returns the aggregated eligibility block.

### `PUT /api/jnfs/{jnf}/eligibility`

Upserts the eligibility section.

### Main request fields

- `minimum_cgpa`
- `backlogs_allowed`
- `max_backlogs`
- `high_school_percentage_criterion`
- `gender_filter`
- `slp_requirement`
- `phd_allowed`
- `phd_department_requirement`
- `ma_dhss_allowed`
- `other_specific_requirements`
- `programme_rows`
- `discipline_rows`

### `programme_rows[]`

- `programme_id`
- `is_eligible`
- `min_cpi_for_programme`

### `discipline_rows[]`

- `programme_id`
- `discipline_id`
- `is_eligible`
- `min_cpi_for_discipline`

## 13. JNF Salary APIs

### `GET /api/jnfs/{jnf}/salary`

Returns salary packages and components.

### `PUT /api/jnfs/{jnf}/salary`

Upserts salary data.

### Main request fields

- `salary_packages`

### `salary_packages[]`

- `programme_id`
- `salary_structure_mode`
- `currency`
- `ctc_annual`
- `base_fixed`
- `monthly_take_home`
- `gross_salary`
- `first_year_ctc`
- `stocks_options`
- `esops_value`
- `esops_vest_period`
- `bond_amount`
- `bond_duration_months`
- `deductions_text`
- `ctc_breakup_text`
- `components`

### `components[]`

- `component_type`
- `component_label`
- `amount`
- `currency`
- `notes`

## 14. JNF Selection Process APIs

### `POST /api/jnfs/{jnf}/rounds`

Creates a round row.

### `GET /api/jnfs/{jnf}/rounds`

Lists all round rows in order.

### `PUT /api/rounds/{round}`

Updates a round row.

### `DELETE /api/rounds/{round}`

Deletes a round row.

### Main request fields

- `round_category`
- `round_order`
- `round_name`
- `selection_mode`
- `interview_mode`
- `test_type`
- `duration_minutes`
- `team_members_required`
- `rooms_required`
- `other_screening_notes`
- `is_enabled`
- `is_pre_offer_mandatory`

## 15. JNF Declaration APIs

### `GET /api/jnfs/{jnf}/declaration`

Returns declaration data.

### `PUT /api/jnfs/{jnf}/declaration`

Upserts declaration data.

### Main request fields

- `aipc_guidelines_accepted`
- `shortlisting_timeline_accepted`
- `posted_information_verified`
- `ranking_media_consent`
- `accuracy_terms_accepted`
- `rti_nirf_consent`
- `authorised_signatory_name`
- `authorised_signatory_designation`
- `declaration_date`
- `typed_signature`
- `preview_confirmed`

## 16. JNF Document APIs

### `POST /api/jnfs/{jnf}/documents`

Uploads a document.

### `GET /api/jnfs/{jnf}/documents`

Lists JNF documents.

### `DELETE /api/documents/{document}`

Deletes a document record.

### Main request fields

- `document_type`
- `file`
- `original_name`
- `stored_name`
- `file_path`
- `mime_type`
- `file_size`

## 17. Admin Authentication APIs

### `POST /api/admin/auth/login`

#### Request fields

- `email`
- `password`

### `GET /api/admin/auth/me`

Returns authenticated admin profile.

### `POST /api/admin/auth/logout`

Invalidates current admin token.

## 18. Admin Review APIs

### `GET /api/admin/dashboard`

Returns dashboard counts and summary cards.

### `GET /api/admin/jnfs`

Lists JNFs for review.

### Query Parameters

- `status`
- `company_id`
- `recruitment_season`
- `search`

### `GET /api/admin/jnfs/{jnf}`

Returns the full JNF, company, recruiter summary, documents, and audit log.

### `POST /api/admin/jnfs/{jnf}/start-review`

Moves the JNF into `under_review`.

### `POST /api/admin/jnfs/{jnf}/request-changes`

Moves the JNF into `changes_requested`.

### `POST /api/admin/jnfs/{jnf}/approve`

Moves the JNF into `approved`.

### `POST /api/admin/jnfs/{jnf}/close`

Moves the JNF into `closed`.

### Main request fields

- `review_notes`
- `remarks`

## 19. Admin Recruiter Management APIs

### `GET /api/admin/recruiters`

Lists recruiter accounts with company linkage.

### `PATCH /api/admin/recruiters/{recruiter}/status`

Updates recruiter account status.

### Main request fields

- `status`

## 20. Recommended State Rules

### Recruiter Status

- `pending`
- `active`
- `blocked`

### JNF Status

- `draft`
- `submitted`
- `under_review`
- `changes_requested`
- `approved`
- `closed`

### Recommended transitions

- `draft -> submitted`
- `submitted -> under_review`
- `under_review -> changes_requested`
- `under_review -> approved`
- `approved -> closed`
- `changes_requested -> submitted`

## 21. Aggregated JNF Response Shape

For edit, preview, and admin review screens, the API should aggregate:

- `jnf`
- `company`
- `recruiter_summary`
- `contacts`
- `skills`
- `eligibility`
- `salary`
- `selection_rounds`
- `declaration`
- `documents`
- `audit_logs`

## 22. Implementation Notes

- Use `portal_quick_links.link_type` for policy and manual links.
- Do not introduce a separate `policy_links` module in the first release.
- Keep request field names aligned with database column names when possible.
- Do not introduce a `rejected` JNF status in the first implementation.
