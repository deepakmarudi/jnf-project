import type { JnfRecord } from "../types";

export type JnfSectionProgressItem = {
  key:
    | "job_profile"
    | "contacts"
    | "eligibility"
    | "salary"
    | "selection_process"
    | "declaration";
  label: string;
  completed: boolean;
};

function hasRecruiterPoc(record: JnfRecord) {
  return record.contacts.some(
    (contact) =>
      contact.contact_type === "primary_poc" &&
      contact.full_name.trim() &&
      contact.email.trim() &&
      contact.mobile_number.trim()
  );
}

function hasHrContact(record: JnfRecord) {
  return record.contacts.some(
    (contact) =>
      contact.contact_type === "head_hr" &&
      contact.full_name.trim() &&
      contact.email.trim() &&
      contact.mobile_number.trim()
  );
}

function isJobProfileComplete(record: JnfRecord) {
  return Boolean(
    record.recruitment_season.trim() &&
      record.job_title.trim() &&
      record.job_designation.trim() &&
      record.place_of_posting.trim() &&
      record.work_location_mode.trim() &&
      record.expected_hires !== "" &&
      Number(record.expected_hires) > 0 &&
      record.tentative_joining_month.trim() &&
      record.job_description_html.trim()
  );
}

function isContactsComplete(record: JnfRecord) {
  return hasRecruiterPoc(record) && hasHrContact(record);
}

function isEligibilityComplete(record: JnfRecord) {
  const hasBacklogRule =
    record.eligibility.backlogs_allowed
      ? record.eligibility.max_backlogs !== ""
      : true;

  return Boolean(
    record.eligibility.eligible_programme.trim() &&
      record.eligibility.eligible_degree_ids.length > 0 &&
      record.eligibility.eligible_branch_ids.length > 0 &&
      record.eligibility.minimum_cgpa !== "" &&
      hasBacklogRule
  );
}

function isSalaryComplete(record: JnfRecord) {
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

function isSelectionProcessComplete(record: JnfRecord) {
  return record.selection_process.rounds.length > 0 && record.selection_process.rounds.every(
    (round) =>
      round.round_order !== "" &&
      round.round_name.trim() &&
      (round.round_category === "resume_shortlisting" || round.selection_mode.trim()) &&
      round.duration_minutes !== ""
  );
}

function isDeclarationComplete(record: JnfRecord) {
  return Boolean(
    record.declaration.authorised_signatory_name.trim() &&
      record.declaration.authorised_signatory_designation.trim() &&
      record.declaration.typed_signature.trim() &&
      record.declaration.information_confirmed &&
      record.declaration.authorization_confirmed &&
      record.declaration.policy_consent_confirmed
  );
}

export function getJnfSectionProgress(record: JnfRecord): JnfSectionProgressItem[] {
  return [
    {
      key: "job_profile",
      label: "Job Profile",
      completed: isJobProfileComplete(record),
    },
    {
      key: "contacts",
      label: "Contacts",
      completed: isContactsComplete(record),
    },
    {
      key: "eligibility",
      label: "Eligibility",
      completed: isEligibilityComplete(record),
    },
    {
      key: "salary",
      label: "Salary Details",
      completed: isSalaryComplete(record),
    },
    {
      key: "selection_process",
      label: "Selection Process",
      completed: isSelectionProcessComplete(record),
    },
    {
      key: "declaration",
      label: "Declaration",
      completed: isDeclarationComplete(record),
    },
  ];
}

export function getJnfProgressSummary(record: JnfRecord) {
  const items = getJnfSectionProgress(record);
  const completedCount = items.filter((item) => item.completed).length;

  return {
    items,
    completedCount,
    totalCount: items.length,
  };
}
