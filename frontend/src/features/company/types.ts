export type CompanyProfile = {
  name: string;
  website: string;
  postal_address: string;
  employee_count: string;
  sector: string;
  logo_path: string;
  category_or_org_type: string;
  date_of_establishment: string;
  annual_turnover: string;
  social_media_url: string;
  hq_country: string;
  hq_city: string;
  nature_of_business: string;
  description: string;
  is_mnc: boolean;
  industry_tag_ids: string[];
};

export type CompanyProfileErrors = Partial<
  Record<keyof CompanyProfile, string>
>;

export type CompanyPageMode = "view" | "edit";

export const initialCompanyProfile: CompanyProfile = {
  name: "",
  website: "",
  postal_address: "",
  employee_count: "",
  sector: "",
  logo_path: "",
  category_or_org_type: "",
  date_of_establishment: "",
  annual_turnover: "",
  social_media_url: "",
  hq_country: "",
  hq_city: "",
  nature_of_business: "",
  description: "",
  is_mnc: false,
  industry_tag_ids: [],
};

export function isCompanyProfileComplete(profile: CompanyProfile) {
  if (!profile) return false;
  return Boolean(
    (profile.name ?? "").trim() &&
      (profile.website ?? "").trim() &&
      (profile.postal_address ?? "").trim() &&
      (profile.sector ?? "").trim() &&
      (profile.category_or_org_type ?? "").trim() &&
      (profile.hq_country ?? "").trim() &&
      (profile.hq_city ?? "").trim()
  );
}
