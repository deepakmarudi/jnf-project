import { isCompanyProfileComplete, type CompanyProfile } from "@/features/company/types";
import type { JnfContact, JnfRecord } from "../types";

export type JnfSectionKey =
  | "company_summary"
  | "job_profile"
  | "contacts"
  | "eligibility"
  | "salary"
  | "selection_process"
  | "declaration";

export const jnfSectionOrder: JnfSectionKey[] = [
  "company_summary",
  "job_profile",
  "contacts",
  "eligibility",
  "salary",
  "selection_process",
  "declaration",
];

export type JnfCompletedSections = Record<JnfSectionKey, boolean>;

export const initialJnfCompletedSections: JnfCompletedSections = {
  company_summary: false,
  job_profile: false,
  contacts: false,
  eligibility: false,
  salary: false,
  selection_process: false,
  declaration: false,
};

function findContactByRole(
  record: JnfRecord,
  role: "primary_poc" | "head_hr"
): JnfContact | null {
  return record.contacts.find((contact) => contact.role === role) ?? null;
}

function isJobProfileSectionComplete(record: JnfRecord) {
  return Boolean(
    record.recruitment_season.trim() &&
      record.job_title.trim() &&
      record.job_designation.trim() &&
      record.role_type.trim() &&
      record.work_mode.trim() &&
      record.place_of_posting.trim() &&
      record.expected_hires !== "" &&
      Number(record.expected_hires) > 0 &&
      record.tentative_joining_month.trim() &&
      record.job_description_html.trim()
  );
}

function isContactsSectionComplete(record: JnfRecord) {
  const recruiterPoc = findContactByRole(record, "primary_poc");
  const hrContact = findContactByRole(record, "head_hr");

  return Boolean(
    recruiterPoc &&
      recruiterPoc.full_name.trim() &&
      recruiterPoc.email.trim() &&
      recruiterPoc.phone.trim() &&
      hrContact &&
      hrContact.full_name.trim() &&
      hrContact.email.trim() &&
      hrContact.phone.trim()
  );
}

function isEligibilitySectionComplete(record: JnfRecord) {
  const hasBacklogRule =
    record.eligibility.active_backlog_allowed === "yes"
      ? record.eligibility.max_total_backlogs !== ""
      : record.eligibility.active_backlog_allowed === "no";

  return Boolean(
    record.eligibility.eligible_programme.trim() &&
      record.eligibility.eligible_degree_ids.length > 0 &&
      record.eligibility.eligible_branch_ids.length > 0 &&
      record.eligibility.minimum_cgpa !== "" &&
      hasBacklogRule
  );
}

function isSalarySectionComplete(record: JnfRecord) {
  const firstSalaryRow = record.salary_details.salary_rows[0];

  return Boolean(
    record.salary_details.currency.trim() &&
      firstSalaryRow &&
      firstSalaryRow.ctc !== "" &&
      Number(firstSalaryRow.ctc) > 0 &&
      firstSalaryRow.gross_salary !== "" &&
      Number(firstSalaryRow.gross_salary) > 0 &&
      firstSalaryRow.base_salary !== "" &&
      Number(firstSalaryRow.base_salary) > 0
  );
}

function isSelectionProcessSectionComplete(record: JnfRecord) {
  return record.selection_process.rounds.some(
    (round) =>
      round.order !== "" &&
      round.round_name.trim() &&
      round.mode.trim() &&
      round.scheduled_at.trim() &&
      round.duration_minutes !== ""
  );
}

function isDeclarationSectionComplete(record: JnfRecord) {
  return Boolean(
    record.declaration.authorized_signatory_name.trim() &&
      record.declaration.authorized_signatory_designation.trim() &&
      record.declaration.typed_signature.trim() &&
      record.declaration.information_confirmed &&
      record.declaration.authorization_confirmed &&
      record.declaration.policy_consent_confirmed
  );
}

export function getJnfSectionValidity(
  record: JnfRecord,
  companyProfile: CompanyProfile | null
): JnfCompletedSections {
  return {
    company_summary: Boolean(
      companyProfile && isCompanyProfileComplete(companyProfile)
    ),
    job_profile: isJobProfileSectionComplete(record),
    contacts: isContactsSectionComplete(record),
    eligibility: isEligibilitySectionComplete(record),
    salary: isSalarySectionComplete(record),
    selection_process: isSelectionProcessSectionComplete(record),
    declaration: isDeclarationSectionComplete(record),
  };
}
