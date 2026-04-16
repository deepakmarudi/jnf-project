import { fetchJson } from "@/lib/fetch-json";
import type { CompanyProfile } from "../types";

type CompanyApiResponse = CompanyProfile;

function normalizeCompanyPayload(profile: CompanyProfile) {
  return {
    ...profile,
    employee_count:
      profile.employee_count.trim() === ""
        ? null
        : Number(profile.employee_count),
    annual_turnover:
      profile.annual_turnover.trim() === ""
        ? null
        : Number(profile.annual_turnover),
    industry_tag_ids: profile.industry_tag_ids
      .map((value) => Number(value))
      .filter((value) => Number.isFinite(value)),
  };
}

function normalizeCompanyResponse(data: CompanyApiResponse): CompanyProfile {
  return {
    ...data,
    employee_count:
      data.employee_count === null || data.employee_count === undefined
        ? ""
        : String(data.employee_count),
    annual_turnover:
      data.annual_turnover === null || data.annual_turnover === undefined
        ? ""
        : String(data.annual_turnover),
    industry_tag_ids: Array.isArray(data.industry_tag_ids)
      ? data.industry_tag_ids.map((value) => String(value))
      : [],
  };
}

export async function getMyCompanyProfile() {
  const response = await fetchJson<CompanyApiResponse>("/companies/me", {
    method: "GET",
  });

  return normalizeCompanyResponse(response.data);
}

export async function updateMyCompanyProfile(profile: CompanyProfile) {
  const response = await fetchJson<CompanyApiResponse>("/companies/me", {
    method: "PUT",
    body: normalizeCompanyPayload(profile),
  });

  return normalizeCompanyResponse(response.data);
}
