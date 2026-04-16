import type { RecruiterRegisterCompanyValues } from "../types";

export function normalizeRecruiterRegisterCompanyPayload(
  company: RecruiterRegisterCompanyValues
) {
  return {
    ...company,
    employee_count:
      company.employee_count.trim() === ""
        ? null
        : Number(company.employee_count),
    annual_turnover:
      company.annual_turnover.trim() === ""
        ? null
        : Number(company.annual_turnover),
    industry_tag_ids: company.industry_tag_ids
      .map((value) => Number(value))
      .filter((value) => Number.isFinite(value)),
  };
}
