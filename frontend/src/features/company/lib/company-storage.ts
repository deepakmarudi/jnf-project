import type { CompanyProfile } from "../types";

const COMPANY_PROFILES_KEY = "mock_company_profiles";

type CompanyProfileMap = Record<string, CompanyProfile>;

function canUseStorage() {
  return typeof window !== "undefined";
}

export function getStoredCompanyProfiles(): CompanyProfileMap {
  if (!canUseStorage()) {
    return {};
  }

  const rawValue = window.localStorage.getItem(COMPANY_PROFILES_KEY);

  if (!rawValue) {
    return {};
  }

  return JSON.parse(rawValue) as CompanyProfileMap;
}

export function saveStoredCompanyProfiles(profiles: CompanyProfileMap) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(
    COMPANY_PROFILES_KEY,
    JSON.stringify(profiles)
  );
}

export function getCompanyProfileForRecruiter(recruiterId: string) {
  return getStoredCompanyProfiles()[recruiterId] ?? null;
}

export function upsertCompanyProfileForRecruiter(
  recruiterId: string,
  profile: CompanyProfile
) {
  const profiles = getStoredCompanyProfiles();

  saveStoredCompanyProfiles({
    ...profiles,
    [recruiterId]: profile,
  });
}
