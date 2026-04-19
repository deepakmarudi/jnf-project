import type { JnfStatus } from "@/types/status";
import {
  createEmptyJnfDeclaration,
  createEmptyJnfEligibility,
  createEmptyJnfSalaryBreakup,
  createEmptyJnfSelectionRound,
  emptyJnfRecord,
  type JnfContact,
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

function normalizeWorkMode(mode: string | null): JnfRecord["work_mode"] {
  if (mode === "on_site") {
    return "onsite";
  }

  if (mode === "hybrid" || mode === "remote") {
    return mode;
  }

  return "";
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
    place_of_posting: core.place_of_posting ?? "",
    work_mode: normalizeWorkMode(core.work_location_mode),
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

export function mapRecordCoreToBackendPayload(record: JnfRecord) {
  return {
    jnf_number: record.jnf_number || null,
    recruitment_season: record.recruitment_season || null,
    job_title: record.job_title || null,
    job_designation: record.job_designation || null,
    place_of_posting: record.place_of_posting || null,
    work_location_mode:
      record.work_mode === "onsite"
        ? "on_site"
        : record.work_mode || null,
    expected_hires: record.expected_hires === "" ? null : Number(record.expected_hires),
    minimum_hires: record.minimum_hires === "" ? null : Number(record.minimum_hires),
    tentative_joining_month: record.tentative_joining_month || null,
    job_description_html: record.job_description_html || null,
    additional_job_info: record.additional_job_info || null,
    bond_details: record.bond_details || null,
    registration_link: record.registration_link || null,
    onboarding_procedure: record.onboarding_procedure || null,
    jd_pdf_path: record.jd_pdf_path || null,
  };
}

export function mapBackendContactsToRecord(contacts: BackendJnfContact[]): JnfContact[] {
  return contacts.map((contact) => ({
    id: String(contact.id),
    role:
      contact.contact_type === "head_hr" ||
      contact.contact_type === "primary_poc" ||
      contact.contact_type === "secondary_poc"
        ? contact.contact_type
        : "other",
    full_name: contact.full_name ?? "",
    designation: contact.designation ?? "",
    email: contact.email ?? "",
    phone: contact.mobile_number ?? "",
    alternate_phone: contact.landline ?? "",
    preferred_contact_method: "",
    remarks: "",
  }));
}

export function mapContactToBackendPayload(contact: JnfContact) {
  return {
    contact_type: contact.role === "other" ? "secondary_poc" : contact.role,
    full_name: contact.full_name || null,
    designation: contact.designation || null,
    email: contact.email || null,
    mobile_number: contact.phone || null,
    landline: contact.alternate_phone || null,
    is_optional: contact.role === "secondary_poc",
  };
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
    max_total_backlogs: rule?.max_backlogs != null ? Number(rule.max_backlogs) : "",
    minimum_class_10_percentage: rule?.high_school_percentage_criterion != null ? Number(rule.high_school_percentage_criterion) : "",
    gender_filter:
      rule?.gender_filter === "others"
        ? "other"
        : ((rule?.gender_filter as typeof next.gender_filter) ?? "all"),
    active_backlog_allowed:
      rule?.backlogs_allowed === true
        ? "yes"
        : rule?.backlogs_allowed === false
          ? "no"
          : "",
  };
}

export function mapRecordEligibilityToBackendPayload(record: JnfRecord) {
  const programmeRows = record.eligibility.eligible_degree_ids.map(id => ({
    programme_id: id,
    is_eligible: true,
    min_cpi: null,
  }));

  const disciplineRows = record.eligibility.eligible_branch_ids.map(id => {
    // We need to know which programme this discipline belongs to.
    // For now, we'll send it as is and the backend resolve the hierarchy if needed.
    // But ideally, the frontend eligibility state should track this.
    return {
      discipline_id: id,
      programme_id: record.eligibility.eligible_degree_ids[0] || null, // Best effort fallback
      is_eligible: true,
      min_cpi: null,
    };
  });

  return {
    minimum_cgpa:
      record.eligibility.minimum_cgpa === ""
        ? null
        : Number(record.eligibility.minimum_cgpa),
    backlogs_allowed: record.eligibility.active_backlog_allowed === "yes",
    max_backlogs:
      record.eligibility.max_total_backlogs === ""
        ? null
        : Number(record.eligibility.max_total_backlogs),
    high_school_percentage_criterion:
      record.eligibility.minimum_class_10_percentage === ""
        ? null
        : Number(record.eligibility.minimum_class_10_percentage),
    gender_filter:
      record.eligibility.gender_filter === "other"
        ? "others"
        : record.eligibility.gender_filter,
    programme_rows: programmeRows,
    discipline_rows: disciplineRows,
  };
}

function getSalaryComponentAmount(
  salaryPackage: BackendJnfSalaryPackage,
  componentTypes: string[]
) {
  const component = salaryPackage.components?.find((item) =>
    componentTypes.includes(item.component_type)
  );

  return component?.amount ?? "";
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
    course_id:
      firstPackage.programme_id === null
        ? "all_courses"
        : String(firstPackage.programme_id),
    ctc: firstPackage.ctc_annual ?? "",
    gross_salary: firstPackage.gross_salary ?? "",
    base_salary: firstPackage.base_fixed ?? "",
    variable_pay: getSalaryComponentAmount(firstPackage, ["variable_bonus"]),
    joining_bonus: getSalaryComponentAmount(firstPackage, ["joining_bonus"]),
    retention_bonus: getSalaryComponentAmount(firstPackage, ["retention_bonus"]),
    performance_bonus: getSalaryComponentAmount(firstPackage, ["other"]),
    esops: firstPackage.esops_value ?? "",
    stipend: "",
    bond_amount: firstPackage.bond_amount ?? "",
    deductions_or_notes: firstPackage.deductions_text ?? "",
  };

  return {
    currency: firstPackage.currency ?? "INR",
    salary_mode:
      firstPackage.salary_structure_mode === "different_per_programme"
        ? "programme_wise"
        : "same_for_all",
    same_for_all_courses: firstPackage.programme_id === null,
    salary_rows: [firstRow],
    benefits_and_perks: firstPackage.ctc_breakup_text ?? "",
  };
}

export function mapRecordSalaryToBackendPayload(record: JnfRecord) {
  const packages = record.salary_details.salary_rows.map((row) => {
    const components = [];

    if (row.joining_bonus !== "" && Number(row.joining_bonus) > 0) {
      components.push({
        component_type: "joining_bonus",
        component_label: "Joining Bonus",
        amount: Number(row.joining_bonus),
        currency: record.salary_details.currency,
        notes: null,
      });
    }

    if (row.retention_bonus !== "" && Number(row.retention_bonus) > 0) {
      components.push({
        component_type: "retention_bonus",
        component_label: "Retention Bonus",
        amount: Number(row.retention_bonus),
        currency: record.salary_details.currency,
        notes: null,
      });
    }

    if (row.variable_pay !== "" && Number(row.variable_pay) > 0) {
      components.push({
        component_type: "variable_bonus",
        component_label: "Variable Pay",
        amount: Number(row.variable_pay),
        currency: record.salary_details.currency,
        notes: null,
      });
    }

    if (row.performance_bonus !== "" && Number(row.performance_bonus) > 0) {
      components.push({
        component_type: "other",
        component_label: "Performance Bonus",
        amount: Number(row.performance_bonus),
        currency: record.salary_details.currency,
        notes: null,
      });
    }

    return {
      programme_id: row.course_id === "all_courses" ? null : Number(row.course_id),
      salary_structure_mode:
        record.salary_details.salary_mode === "programme_wise"
          ? "different_per_programme"
          : "same_for_all",
      currency: record.salary_details.currency,
      ctc_annual: row.ctc === "" ? null : Number(row.ctc),
      base_fixed: row.base_salary === "" ? null : Number(row.base_salary),
      monthly_take_home: null,
      gross_salary: row.gross_salary === "" ? null : Number(row.gross_salary),
      first_year_ctc: null,
      stocks_options: null,
      esops_value: row.esops === "" ? null : Number(row.esops),
      esops_vest_period: null,
      bond_amount: row.bond_amount === "" ? null : Number(row.bond_amount),
      bond_duration_months: null,
      deductions_text: row.deductions_or_notes || null,
      ctc_breakup_text: record.salary_details.benefits_and_perks || null,
      components,
    };
  });

  return {
    salary_packages: packages,
  };
}

export function mapBackendRoundsToRecord(
  rounds: BackendJnfRound[]
): JnfSelectionRound[] {
  return rounds.map((round) => ({
    ...createEmptyJnfSelectionRound(),
    id: String(round.id),
    order: round.round_order,
    round_name: round.round_name ?? "",
    round_type: round.round_category ?? "",
    mode:
      round.selection_mode === "online" ||
      round.selection_mode === "offline" ||
      round.selection_mode === "hybrid"
        ? round.selection_mode
        : "",
    scheduled_at: "",
    platform_or_tool: "",
    duration_minutes: round.duration_minutes ?? "",
    elimination_round: round.is_pre_offer_mandatory ? "yes" : "no",
    infrastructure_required: round.rooms_required ? String(round.rooms_required) : "",
    panel_count: round.team_members_required ?? "",
    instructions: round.other_screening_notes ?? "",
    description: "",
  }));
}

function mapRoundCategory(round: JnfSelectionRound) {
  const value = round.round_type || round.round_name;
  const normalized = value.trim().toLowerCase().replace(/\s+/g, "_");
  const allowed = new Set([
    "ppt",
    "resume_shortlisting",
    "online_test",
    "written_test",
    "aptitude_test",
    "technical_test",
    "group_discussion",
    "technical_interview",
    "personal_interview",
    "psychometric_test",
    "medical_test",
    "other",
  ]);

  return allowed.has(normalized) ? normalized : "other";
}

export function mapRoundToBackendPayload(round: JnfSelectionRound) {
  return {
    round_category: mapRoundCategory(round),
    round_order: round.order === "" ? 1 : Number(round.order),
    round_name: round.round_name || null,
    selection_mode: round.mode || null,
    interview_mode: null,
    test_type: null,
    duration_minutes:
      round.duration_minutes === "" ? null : Number(round.duration_minutes),
    team_members_required: round.panel_count === "" ? null : Number(round.panel_count),
    rooms_required:
      round.infrastructure_required.trim() === ""
        ? null
        : Number(round.infrastructure_required),
    other_screening_notes: round.instructions || null,
    is_enabled: true,
    is_pre_offer_mandatory: round.elimination_round === "yes",
  };
}

export function mapBackendDeclarationToRecord(
  declaration: BackendJnfDeclaration | null
): JnfDeclaration {
  if (!declaration) {
    return createEmptyJnfDeclaration();
  }

  return {
    ...createEmptyJnfDeclaration(),
    authorized_signatory_name: declaration.authorised_signatory_name ?? "",
    authorized_signatory_designation:
      declaration.authorised_signatory_designation ?? "",
    declaration_date: declaration.declaration_date ?? "",
    information_confirmed: declaration.posted_information_verified,
    authorization_confirmed: declaration.aipc_guidelines_accepted,
    policy_consent_confirmed: declaration.accuracy_terms_accepted,
    typed_signature: declaration.typed_signature ?? "",
  };
}

export function mapRecordDeclarationToBackendPayload(record: JnfRecord) {
  return {
    aipc_guidelines_accepted: record.declaration.authorization_confirmed,
    shortlisting_timeline_accepted: false,
    posted_information_verified: record.declaration.information_confirmed,
    ranking_media_consent: false,
    accuracy_terms_accepted: record.declaration.policy_consent_confirmed,
    rti_nirf_consent: false,
    authorised_signatory_name:
      record.declaration.authorized_signatory_name || null,
    authorised_signatory_designation:
      record.declaration.authorized_signatory_designation || null,
    declaration_date: record.declaration.declaration_date || null,
    typed_signature: record.declaration.typed_signature || null,
    preview_confirmed: record.preview_completed,
  };
}

