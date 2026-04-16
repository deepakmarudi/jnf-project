import type { JnfStatus } from "@/types/status";

export type JnfYesNo = "" | "yes" | "no";

export type JnfWorkMode = "" | "onsite" | "hybrid" | "remote";

export type JnfRoleType =
  | ""
  | "full_time"
  | "internship"
  | "internship_ppo"
  | "contract"
  | "other";

export type JnfContactRole =
  | "head_hr"
  | "primary_poc"
  | "secondary_poc"
  | "other";

export type JnfPreferredContactMethod = "" | "email" | "phone" | "either";

export type JnfGenderFilter = "all" | "male" | "female" | "other";

export type JnfSelectionMode = "" | "online" | "offline" | "hybrid";

export type JnfSalaryMode = "" | "same_for_all" | "programme_wise";

export type JnfEligibilityProgramme = "" | "ug" | "pg" | "both";

export type JnfContact = {
  id: string;
  role: JnfContactRole;
  full_name: string;
  designation: string;
  email: string;
  phone: string;
  alternate_phone: string;
  preferred_contact_method: JnfPreferredContactMethod;
  remarks: string;
};

export type JnfEligibility = {
  eligible_batch: string;
  minimum_cgpa: number | "";
  max_total_backlogs: number | "";
  minimum_class_10_percentage: number | "";
  minimum_class_12_percentage: number | "";
  gender_filter: JnfGenderFilter;
  eligible_programme: JnfEligibilityProgramme;
  eligible_degree_ids: string[];
  eligible_branch_ids: string[];
  gap_year_allowed: JnfYesNo;
  active_backlog_allowed: JnfYesNo;
  history_of_arrears_allowed: JnfYesNo;
  eligibility_notes: string;
};

export type JnfSalaryBreakup = {
  id: string;
  course_id: string;
  ctc: number | "";
  gross_salary: number | "";
  base_salary: number | "";
  variable_pay: number | "";
  joining_bonus: number | "";
  retention_bonus: number | "";
  performance_bonus: number | "";
  esops: number | "";
  stipend: number | "";
  bond_amount: number | "";
  deductions_or_notes: string;
};

export type JnfSalaryDetails = {
  currency: string;
  salary_mode: JnfSalaryMode;
  same_for_all_courses: boolean;
  salary_rows: JnfSalaryBreakup[];
  benefits_and_perks: string;
};

export type JnfSelectionRound = {
  id: string;
  order: number | "";
  round_name: string;
  round_type: string;
  mode: JnfSelectionMode;
  scheduled_at: string;
  platform_or_tool: string;
  duration_minutes: number | "";
  elimination_round: JnfYesNo;
  infrastructure_required: string;
  panel_count: number | "";
  instructions: string;
  description: string;
};

export type JnfSelectionProcess = {
  selection_mode: JnfSelectionMode;
  campus_visit_required: JnfYesNo;
  pre_placement_talk_required: JnfYesNo;
  expected_hiring_timeline: string;
  preferred_ppt_date: string;
  preferred_interview_date: string;
  rounds: JnfSelectionRound[];
};

export type JnfAdditionalDetails = {
  application_deadline: string;
  required_documents: string;
  dress_code_or_compliance_notes: string;
  travel_or_accommodation_policy: string;
  offer_validity_notes: string;
  additional_instructions_for_cdc: string;
  recruiter_remarks: string;
  brochure_path: string;
  compensation_attachment_path: string;
  extra_document_paths: string[];
};

export type JnfDeclaration = {
  authorized_signatory_name: string;
  authorized_signatory_designation: string;
  authorized_signatory_email: string;
  authorized_signatory_phone: string;
  declaration_place: string;
  declaration_date: string;
  information_confirmed: boolean;
  authorization_confirmed: boolean;
  policy_consent_confirmed: boolean;
  typed_signature: string;
};

export type JnfRecord = {
  id: string;
  recruiter_id: string;
  jnf_number: string;

  recruitment_season: string;
  job_title: string;
  job_designation: string;
  department_or_function: string;
  role_type: JnfRoleType;
  place_of_posting: string;
  work_mode: JnfWorkMode;
  expected_hires: number | "";
  minimum_hires: number | "";
  tentative_joining_month: string;
  required_skills: string[];
  job_description_html: string;
  additional_job_info: string;

  bond_details: string;
  registration_link: string;
  onboarding_procedure: string;
  jd_pdf_path: string;

  contacts: JnfContact[];
  eligibility: JnfEligibility;
  salary_details: JnfSalaryDetails;
  selection_process: JnfSelectionProcess;
  additional_details: JnfAdditionalDetails;
  declaration: JnfDeclaration;

  status: JnfStatus;
  preview_completed: boolean;
  submission_acknowledged: boolean;
  self_edit_used: boolean;
  submission_count: number;
  admin_feedback: string;
  updated_at: string;
  submitted_at: string | null;
};

export type JnfListFilterValues = {
  search: string;
  status: "all" | JnfStatus;
  recruitment_season: "all" | string;
};

export const initialJnfListFilters: JnfListFilterValues = {
  search: "",
  status: "all",
  recruitment_season: "all",
};

export function createEmptyJnfContact(): JnfContact {
  return {
    id: "",
    role: "other",
    full_name: "",
    designation: "",
    email: "",
    phone: "",
    alternate_phone: "",
    preferred_contact_method: "",
    remarks: "",
  };
}

export function createEmptyJnfEligibility(): JnfEligibility {
  return {
    eligible_batch: "",
    minimum_cgpa: "",
    max_total_backlogs: "",
    minimum_class_10_percentage: "",
    minimum_class_12_percentage: "",
    gender_filter: "all",
    eligible_programme: "",
    eligible_degree_ids: [],
    eligible_branch_ids: [],
    gap_year_allowed: "",
    active_backlog_allowed: "",
    history_of_arrears_allowed: "",
    eligibility_notes: "",
  };
}

export function createEmptyJnfSalaryBreakup(): JnfSalaryBreakup {
  return {
    id: "",
    course_id: "",
    ctc: "",
    gross_salary: "",
    base_salary: "",
    variable_pay: "",
    joining_bonus: "",
    retention_bonus: "",
    performance_bonus: "",
    esops: "",
    stipend: "",
    bond_amount: "",
    deductions_or_notes: "",
  };
}

export function createEmptyJnfSalaryDetails(): JnfSalaryDetails {
  return {
    currency: "INR",
    salary_mode: "",
    same_for_all_courses: true,
    salary_rows: [],
    benefits_and_perks: "",
  };
}

export function createEmptyJnfSelectionRound(): JnfSelectionRound {
  return {
    id: "",
    order: "",
    round_name: "",
    round_type: "",
    mode: "",
    scheduled_at: "",
    platform_or_tool: "",
    duration_minutes: "",
    elimination_round: "",
    infrastructure_required: "",
    panel_count: "",
    instructions: "",
    description: "",
  };
}

export function createEmptyJnfSelectionProcess(): JnfSelectionProcess {
  return {
    selection_mode: "",
    campus_visit_required: "",
    pre_placement_talk_required: "",
    expected_hiring_timeline: "",
    preferred_ppt_date: "",
    preferred_interview_date: "",
    rounds: [],
  };
}

export function createEmptyJnfAdditionalDetails(): JnfAdditionalDetails {
  return {
    application_deadline: "",
    required_documents: "",
    dress_code_or_compliance_notes: "",
    travel_or_accommodation_policy: "",
    offer_validity_notes: "",
    additional_instructions_for_cdc: "",
    recruiter_remarks: "",
    brochure_path: "",
    compensation_attachment_path: "",
    extra_document_paths: [],
  };
}

export function createEmptyJnfDeclaration(): JnfDeclaration {
  return {
    authorized_signatory_name: "",
    authorized_signatory_designation: "",
    authorized_signatory_email: "",
    authorized_signatory_phone: "",
    declaration_place: "",
    declaration_date: "",
    information_confirmed: false,
    authorization_confirmed: false,
    policy_consent_confirmed: false,
    typed_signature: "",
  };
}

export function createEmptyJnfSections() {
  return {
    contacts: [] as JnfContact[],
    eligibility: createEmptyJnfEligibility(),
    salary_details: createEmptyJnfSalaryDetails(),
    selection_process: createEmptyJnfSelectionProcess(),
    additional_details: createEmptyJnfAdditionalDetails(),
    declaration: createEmptyJnfDeclaration(),
  };
}

export const emptyJnfRecord: JnfRecord = {
  id: "",
  recruiter_id: "",
  jnf_number: "",

  recruitment_season: "",
  job_title: "",
  job_designation: "",
  department_or_function: "",
  role_type: "",
  place_of_posting: "",
  work_mode: "",
  expected_hires: "",
  minimum_hires: "",
  tentative_joining_month: "",
  required_skills: [],
  job_description_html: "",
  additional_job_info: "",

  bond_details: "",
  registration_link: "",
  onboarding_procedure: "",
  jd_pdf_path: "",

  ...createEmptyJnfSections(),

  status: "draft",
  preview_completed: false,
  submission_acknowledged: false,
  self_edit_used: false,
  submission_count: 0,
  admin_feedback: "",
  updated_at: "",
  submitted_at: null,
};
