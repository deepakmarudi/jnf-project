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

export type JnfFieldErrors = Partial<Record<string, string>>;

function findContactByRole(
  record: JnfRecord,
  role: "primary_poc" | "head_hr"
): JnfContact | null {
  return record.contacts.find((contact) => contact.role === role) ?? null;
}

function hasRequiredContact(
  record: JnfRecord,
  role: "primary_poc" | "head_hr"
) {
  const contact = findContactByRole(record, role);

  return Boolean(
    contact &&
      contact.full_name.trim() &&
      contact.email.trim() &&
      contact.phone.trim()
  );
}

function hasValidSalary(record: JnfRecord) {
  const firstRow = record.salary_details.salary_rows[0];

  return Boolean(
    firstRow &&
      record.salary_details.currency.trim() &&
      firstRow.ctc !== "" &&
      Number(firstRow.ctc) > 0 &&
      firstRow.gross_salary !== "" &&
      Number(firstRow.gross_salary) > 0 &&
      firstRow.base_salary !== "" &&
      Number(firstRow.base_salary) > 0
  );
}

function hasValidSelectionProcess(record: JnfRecord) {
  return record.selection_process.rounds.some(
    (round) =>
      round.round_name.trim() &&
      round.mode.trim() &&
      round.order !== "" &&
      round.scheduled_at.trim() &&
      round.duration_minutes !== ""
  );
}

export function getJnfFieldErrors(record: JnfRecord): JnfFieldErrors {
  const errors: JnfFieldErrors = {};

  if (!record.recruitment_season.trim()) {
    errors["recruitment_season"] = "Recruitment season is required.";
  }

  if (!record.job_title.trim()) {
    errors["job_title"] = "Job title is required.";
  }

  if (!record.job_designation.trim()) {
    errors["job_designation"] = "Job designation is required.";
  }

  if (!record.role_type.trim()) {
    errors["role_type"] = "Role type is required.";
  }

  if (!record.work_mode.trim()) {
    errors["work_mode"] = "Work mode is required.";
  }

  if (!record.place_of_posting.trim()) {
    errors["place_of_posting"] = "Place of posting is required.";
  }

  if (record.expected_hires === "" || Number(record.expected_hires) <= 0) {
    errors["expected_hires"] = "Enter expected hires greater than 0.";
  }

  if (
    record.minimum_hires !== "" &&
    record.expected_hires !== "" &&
    Number(record.minimum_hires) > Number(record.expected_hires)
  ) {
    errors["minimum_hires"] = "Minimum hires cannot exceed expected hires.";
  }

  if (!record.tentative_joining_month.trim()) {
    errors["tentative_joining_month"] = "Tentative joining month is required.";
  }

  if (!record.job_description_html.trim()) {
    errors["job_description_html"] = "Job description is required.";
  }

  const recruiterPoc = findContactByRole(record, "primary_poc");
  const hrContact = findContactByRole(record, "head_hr");

  if (!recruiterPoc?.full_name.trim()) {
    errors["contacts.primary_poc.full_name"] = "Recruiter (PoC) name is required.";
  }

  if (!recruiterPoc?.email.trim()) {
    errors["contacts.primary_poc.email"] = "Recruiter (PoC) email is required.";
  }

  if (!recruiterPoc?.phone.trim()) {
    errors["contacts.primary_poc.phone"] = "Recruiter (PoC) phone is required.";
  }

  if (!hrContact?.full_name.trim()) {
    errors["contacts.head_hr.full_name"] = "HR name is required.";
  }

  if (!hrContact?.email.trim()) {
    errors["contacts.head_hr.email"] = "HR email is required.";
  }

  if (!hrContact?.phone.trim()) {
    errors["contacts.head_hr.phone"] = "HR phone is required.";
  }

  record.contacts.forEach((contact, index) => {
    if (
      contact.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)
    ) {
      errors[`contacts.${index}.email`] = `Contact ${index + 1} email is invalid.`;
    }
  });

  if (!record.eligibility.eligible_programme.trim()) {
    errors["eligibility.eligible_programme"] = "Programme is required.";
  }

  if (record.eligibility.eligible_degree_ids.length === 0) {
    errors["eligibility.eligible_degree_ids"] = "Select at least one degree.";
  }

  if (record.eligibility.eligible_branch_ids.length === 0) {
    errors["eligibility.eligible_branch_ids"] = "Select at least one branch.";
  }

  if (record.eligibility.minimum_cgpa === "") {
    errors["eligibility.minimum_cgpa"] = "Minimum CGPA is required.";
  }

  if (!record.eligibility.active_backlog_allowed.trim()) {
    errors["eligibility.active_backlog_allowed"] =
      "Please select whether active backlogs are allowed.";
  }

  if (
    record.eligibility.active_backlog_allowed === "yes" &&
    record.eligibility.max_total_backlogs === ""
  ) {
    errors["eligibility.max_total_backlogs"] =
      "Maximum total backlogs is required when active backlogs are allowed.";
  }

  const firstSalaryRow = record.salary_details.salary_rows[0];

  if (!record.salary_details.currency.trim()) {
    errors["salary.currency"] = "Currency is required.";
  }

  if (!firstSalaryRow || firstSalaryRow.ctc === "" || Number(firstSalaryRow.ctc) <= 0) {
    errors["salary.ctc"] = "CTC is required.";
  }

  if (
    !firstSalaryRow ||
    firstSalaryRow.gross_salary === "" ||
    Number(firstSalaryRow.gross_salary) <= 0
  ) {
    errors["salary.gross_salary"] = "Gross salary is required.";
  }

  if (
    !firstSalaryRow ||
    firstSalaryRow.base_salary === "" ||
    Number(firstSalaryRow.base_salary) <= 0
  ) {
    errors["salary.base_salary"] = "Base salary is required.";
  }

  record.selection_process.rounds.forEach((round, index) => {
    if (!round.round_name.trim()) {
      errors[`selection.rounds.${index}.round_name`] =
        "Hiring stage is required.";
    }

    if (!round.mode.trim()) {
      errors[`selection.rounds.${index}.mode`] = "Mode is required.";
    }

    if (round.order === "") {
      errors[`selection.rounds.${index}.order`] = "Round number is required.";
    }

    if (!round.scheduled_at.trim()) {
      errors[`selection.rounds.${index}.scheduled_at`] =
        "Date and time are required.";
    }

    if (round.duration_minutes === "") {
      errors[`selection.rounds.${index}.duration_minutes`] =
        "Duration is required.";
    }
  });

  if (!record.declaration.authorized_signatory_name.trim()) {
    errors["declaration.authorized_signatory_name"] =
      "Authorized signatory name is required.";
  }

  if (!record.declaration.authorized_signatory_designation.trim()) {
    errors["declaration.authorized_signatory_designation"] =
      "Authorized signatory designation is required.";
  }

  if (!record.declaration.typed_signature.trim()) {
    errors["declaration.typed_signature"] = "Typed signature is required.";
  }

  if (!record.declaration.information_confirmed) {
    errors["declaration.information_confirmed"] =
      "Information confirmation is required.";
  }

  if (!record.declaration.authorization_confirmed) {
    errors["declaration.authorization_confirmed"] =
      "Authorization confirmation is required.";
  }

  if (!record.declaration.policy_consent_confirmed) {
    errors["declaration.policy_consent_confirmed"] =
      "Policy consent is required.";
  }

  return errors;
}

export function getJnfMissingRequiredFields(record: JnfRecord) {
  const missing: string[] = [];

  if (!record.recruitment_season.trim()) {
    missing.push("Recruitment Season");
  }

  if (!record.job_title.trim()) {
    missing.push("Job Title");
  }

  if (!record.job_designation.trim()) {
    missing.push("Job Designation");
  }

  if (!record.place_of_posting.trim()) {
    missing.push("Place of Posting");
  }

  if (!record.work_mode.trim()) {
    missing.push("Work Mode");
  }

  if (record.expected_hires === "" || Number(record.expected_hires) <= 0) {
    missing.push("Expected Hires");
  }

  if (!record.tentative_joining_month.trim()) {
    missing.push("Tentative Joining Month");
  }

  if (!record.job_description_html.trim()) {
    missing.push("Job Description");
  }

  if (!hasRequiredContact(record, "primary_poc")) {
    missing.push("Recruiter (PoC) Contact Details");
  }

  if (!hasRequiredContact(record, "head_hr")) {
    missing.push("HR Contact Details");
  }

  if (!record.eligibility.eligible_programme.trim()) {
    missing.push("Programme");
  }

  if (record.eligibility.eligible_degree_ids.length === 0) {
    missing.push("Degree");
  }

  if (record.eligibility.eligible_branch_ids.length === 0) {
    missing.push("Branches");
  }

  if (record.eligibility.minimum_cgpa === "") {
    missing.push("Minimum CGPA");
  }

  if (!record.eligibility.active_backlog_allowed.trim()) {
    missing.push("Active Backlogs Allowed");
  }

  if (
    record.eligibility.active_backlog_allowed === "yes" &&
    record.eligibility.max_total_backlogs === ""
  ) {
    missing.push("Maximum Total Backlogs");
  }

  if (!hasValidSalary(record)) {
    missing.push("Salary Details");
  }

  if (!hasValidSelectionProcess(record)) {
    missing.push("Selection Process");
  }

  if (!record.declaration.authorized_signatory_name.trim()) {
    missing.push("Authorized Signatory Name");
  }

  if (!record.declaration.authorized_signatory_designation.trim()) {
    missing.push("Authorized Signatory Designation");
  }

  if (!record.declaration.typed_signature.trim()) {
    missing.push("Typed Signature");
  }

  if (!record.declaration.information_confirmed) {
    missing.push("Information Confirmation");
  }

  if (!record.declaration.authorization_confirmed) {
    missing.push("Authorization Confirmation");
  }

  if (!record.declaration.policy_consent_confirmed) {
    missing.push("Policy Consent");
  }

  return missing;
}

export function getJnfValidationErrors(record: JnfRecord) {
  const errors: string[] = [];

  if (
    record.minimum_hires !== "" &&
    record.expected_hires !== "" &&
    Number(record.minimum_hires) > Number(record.expected_hires)
  ) {
    errors.push("Minimum hires cannot be greater than expected hires.");
  }

  record.contacts.forEach((contact, index) => {
    if (
      contact.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)
    ) {
      errors.push(`Contact ${index + 1} email address is invalid.`);
    }
  });

  if (
    record.eligibility.minimum_class_10_percentage !== "" &&
    Number(record.eligibility.minimum_class_10_percentage) > 100
  ) {
    errors.push("Class 10 percentage cannot be greater than 100.");
  }

  if (
    record.eligibility.minimum_class_12_percentage !== "" &&
    Number(record.eligibility.minimum_class_12_percentage) > 100
  ) {
    errors.push("Class 12 percentage cannot be greater than 100.");
  }

  return errors;
}
