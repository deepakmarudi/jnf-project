import { fetchJson } from "@/lib/fetch-json";
import type { CompanyProfile } from "../types";

type CompanyApiResponse = { company: CompanyProfile | null };

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

function normalizeCompanyResponse(payload: CompanyApiResponse): CompanyProfile {
  const data = payload.company;

  if (!data) {
    return {
      name: "",
      website: "",
      postal_address: "",
      sector: "",
      logo_path: "",
      category_or_org_type: "",
      date_of_establishment: "",
      social_media_url: "",
      hq_country: "",
      hq_city: "",
      nature_of_business: "",
      description: "",
      is_mnc: false,
      employee_count: "",
      annual_turnover: "",
      industry_tag_ids: [],
    };
  }

  return {
    ...data,
    name: data.name ?? "",
    website: data.website ?? "",
    postal_address: data.postal_address ?? "",
    sector: data.sector ?? "",
    logo_path: data.logo_path ?? "",
    category_or_org_type: data.category_or_org_type ?? "",
    date_of_establishment: data.date_of_establishment ?? "",
    social_media_url: data.social_media_url ?? "",
    hq_country: data.hq_country ?? "",
    hq_city: data.hq_city ?? "",
    nature_of_business: data.nature_of_business ?? "",
    description: data.description ?? "",
    is_mnc: Boolean(data.is_mnc),
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
