import type { JnfStatus } from "@/types/status";
import {
  createEmptyJnfDeclaration,
  createEmptyJnfEligibility,
  createEmptyJnfSalaryBreakup,
  createEmptyJnfSelectionRound,
  emptyJnfRecord,
  type JnfContact,
  type JnfContactRole,
  type JnfDeclaration,
  type JnfRecord,
  type JnfSalaryBreakup,
  type JnfSelectionRound,
} from "../types";
import type {
  BackendJnfContact,
  BackendJnfCore,
  BackendJnfDeclaration,
  BackendJnfEligibilityResponse,
  BackendJnfRound,
  BackendJnfSalaryPackage,
} from "./jnf-api";

function normalizeStatus(status: string): JnfStatus {
  const validStatuses: JnfStatus[] = [
    "draft",
    "submitted",
    "under_review",
    "changes_requested",
    "approved",
    "rejected",
    "closed"
  ];

  if (validStatuses.includes(status as JnfStatus)) {
    return status as JnfStatus;
  }

  return "draft";
}

export function mapBackendJnfCoreToRecord(core: BackendJnfCore): JnfRecord {
  return {
    ...emptyJnfRecord,
    id: String(core.id),
    recruiter_id: String(core.created_by),
    jnf_number: core.jnf_number ?? "",
    recruitment_season: core.recruitment_season ?? "",
    job_title: core.job_title ?? "",
    job_designation: core.job_designation ?? "",
    department_or_function: (core as any).department_or_function ?? "",
    role_type: (core as any).role_type as any ?? "",
    place_of_posting: core.place_of_posting ?? "",
    work_location_mode: (core.work_location_mode as any) ?? "",
    expected_hires: core.expected_hires ?? "",
    minimum_hires: core.minimum_hires ?? "",
    tentative_joining_month: core.tentative_joining_month ?? "",
    job_description_html: core.job_description_html ?? "",
    additional_job_info: core.additional_job_info ?? "",
    bond_details: core.bond_details ?? "",
    registration_link: core.registration_link ?? "",
    onboarding_procedure: core.onboarding_procedure ?? "",
    jd_pdf_path: core.jd_pdf_path ?? "",
    status: normalizeStatus(core.status),
    preview_completed: core.preview_completed,
    admin_feedback: core.review_notes ?? "",
    updated_at: core.updated_at ?? "",
    submitted_at: core.submitted_at,
  };
}

export function mapBackendContactsToRecord(contacts: BackendJnfContact[]): JnfContact[] {
  return contacts.map((contact) => ({
    id: String(contact.id),
    contact_type:
      (contact.contact_type === "head_hr" ||
      contact.contact_type === "primary_poc" ||
      contact.contact_type === "secondary_poc"
        ? contact.contact_type
        : "other") as JnfContactRole,
    full_name: contact.full_name ?? "",
    designation: contact.designation ?? "",
    email: contact.email ?? "",
    mobile_number: contact.mobile_number ?? "",
    landline: contact.landline ?? "",
    preferred_contact_method: (contact.preferred_contact_method as any) ?? "",
    remarks: contact.remarks ?? "",
    is_optional: contact.is_optional,
  }));
}

export function mapEligibilityResponseToRecord(
  eligibility: BackendJnfEligibilityResponse
): JnfRecord["eligibility"] {
  const rule = eligibility.eligibility_rule;
  const next = createEmptyJnfEligibility();

  const degreeIds = eligibility.programme_rows.map(p => String(p.programme_id));
  const branchIds = eligibility.discipline_rows.map(d => String(d.discipline_id));

  return {
    ...next,
    eligible_degree_ids: degreeIds,
    eligible_branch_ids: branchIds,
    minimum_cgpa: rule?.minimum_cgpa != null ? Number(rule.minimum_cgpa) : "",
    max_backlogs: rule?.max_backlogs != null ? Number(rule.max_backlogs) : "",
    high_school_percentage_criterion: rule?.high_school_percentage_criterion != null ? Number(rule.high_school_percentage_criterion) : "",
    gender_filter: (rule?.gender_filter as any) ?? "all",
    backlogs_allowed: rule?.backlogs_allowed ?? false,
    gap_year_allowed: rule?.gap_year_allowed ?? false,
    history_of_arrears_allowed: rule?.history_of_arrears_allowed ?? false,
    phd_allowed: rule?.phd_allowed ?? false,
    phd_department_requirement: rule?.phd_department_requirement ?? "",
    slp_requirement: rule?.slp_requirement ?? "",
    ma_dhss_allowed: rule?.ma_dhss_allowed ?? false,
    other_specific_requirements: rule?.other_specific_requirements ?? "",
    active_backlog_allowed_bool: rule?.backlogs_allowed ?? false,
    eligible_programme: ((rule as any)?.eligible_programme as any) ?? "both",
    eligible_batch: (eligibility as any).eligible_batch ?? "",
  };
}

export function mapBackendSalaryToRecord(
  salaryPackages: BackendJnfSalaryPackage[]
): JnfRecord["salary_details"] {
  const firstPackage = salaryPackages[0];

  if (!firstPackage) {
    return emptyJnfRecord.salary_details;
  }

  const firstRow: JnfSalaryBreakup = {
    ...createEmptyJnfSalaryBreakup(),
    id: String(firstPackage.id),
    programme_id:
      firstPackage.programme_id === null
        ? "all_courses"
        : String(firstPackage.programme_id),
    ctc: firstPackage.ctc ?? firstPackage.ctc_annual ?? "",
    gross_salary: firstPackage.gross_salary ?? "",
    base_salary: firstPackage.base_salary ?? firstPackage.base_fixed ?? "",
    variable_pay: firstPackage.variable_pay ?? "",
    joining_bonus: firstPackage.joining_bonus ?? "",
    retention_bonus: firstPackage.retention_bonus ?? "",
    performance_bonus: firstPackage.performance_bonus ?? "",
    esops: firstPackage.esops ?? firstPackage.esops_value ?? "",
    stipend: firstPackage.stipend ?? "",
    bond_amount: firstPackage.bond_amount ?? "",
    deductions_or_notes: firstPackage.deductions_text ?? "",
  };

  return {
    currency: firstPackage.currency ?? "INR",
    salary_mode: (firstPackage.salary_structure_mode as any) ?? "same_for_all",
    same_for_all_courses: firstPackage.programme_id === null,
    salary_rows: [firstRow],
    benefits_and_perks: firstPackage.ctc_breakup_text ?? "",
  };
}

export function mapBackendRoundsToRecord(
  rounds: BackendJnfRound[]
): JnfSelectionRound[] {
  return rounds.map((round) => ({
    ...createEmptyJnfSelectionRound(),
    id: String(round.id),
    round_order: round.round_order ?? "",
    round_name: round.round_name ?? "",
    round_category: round.round_category ?? "",
    selection_mode: (round.selection_mode as any) ?? "",
    duration_minutes: round.duration_minutes ?? "",
    is_pre_offer_mandatory: round.is_pre_offer_mandatory,
    infrastructure_required: round.rooms_required ? String(round.rooms_required) : "",
    panel_count: round.team_members_required ?? "",
    instructions: round.other_screening_notes ?? "",
    description: "",
  }));
}

export function mapBackendDeclarationToRecord(
  declaration: BackendJnfDeclaration | null
): JnfDeclaration {
  if (!declaration) {
    return createEmptyJnfDeclaration();
  }

  return {
    ...createEmptyJnfDeclaration(),
    authorised_signatory_name: declaration.authorised_signatory_name ?? "",
    authorised_signatory_designation:
      declaration.authorised_signatory_designation ?? "",
    authorised_signatory_email: declaration.authorised_signatory_email ?? "",
    authorised_signatory_phone: declaration.authorised_signatory_phone ?? "",
    declaration_place: declaration.declaration_place ?? "",
    declaration_date: declaration.declaration_date ?? "",
    information_confirmed: declaration.information_confirmed ?? declaration.posted_information_verified,
    authorization_confirmed: declaration.authorization_confirmed ?? declaration.aipc_guidelines_accepted,
    policy_consent_confirmed: declaration.policy_consent_confirmed ?? declaration.accuracy_terms_accepted,
    typed_signature: declaration.typed_signature ?? "",
  };
}
