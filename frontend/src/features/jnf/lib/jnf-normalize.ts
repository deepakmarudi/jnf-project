import {
  createEmptyJnfAdditionalDetails,
  createEmptyJnfDeclaration,
  createEmptyJnfEligibility,
  createEmptyJnfSalaryDetails,
  createEmptyJnfSelectionProcess,
  emptyJnfRecord,
  type JnfRecord,
} from "../types";

export function normalizeJnfRecord(record: Partial<JnfRecord>): JnfRecord {
  return {
    ...emptyJnfRecord,
    ...record,
    recruiter_id: record.recruiter_id ?? "",
    required_skills: Array.isArray(record.required_skills)
      ? record.required_skills
      : [],
    contacts: Array.isArray(record.contacts) ? record.contacts : [],
    eligibility: {
      ...createEmptyJnfEligibility(),
      ...record.eligibility,
      eligible_degree_ids: Array.isArray(record.eligibility?.eligible_degree_ids)
        ? record.eligibility.eligible_degree_ids
        : [],
      eligible_branch_ids: Array.isArray(record.eligibility?.eligible_branch_ids)
        ? record.eligibility.eligible_branch_ids
        : [],
    },

    salary_details: {
      ...createEmptyJnfSalaryDetails(),
      ...record.salary_details,
      salary_rows: Array.isArray(record.salary_details?.salary_rows)
        ? record.salary_details.salary_rows
        : [],
    },
    selection_process: {
      ...createEmptyJnfSelectionProcess(),
      ...record.selection_process,
      rounds: Array.isArray(record.selection_process?.rounds)
        ? record.selection_process.rounds
        : [],
    },
    additional_details: {
      ...createEmptyJnfAdditionalDetails(),
      ...record.additional_details,
      extra_document_paths: Array.isArray(
        record.additional_details?.extra_document_paths
      )
        ? record.additional_details.extra_document_paths
        : [],
    },
    declaration: {
      ...createEmptyJnfDeclaration(),
      ...record.declaration,
    },
  };
}

export function normalizeJnfRecords(records: Partial<JnfRecord>[]) {
  return records.map((record) => normalizeJnfRecord(record));
}
