import type { RecruiterSession } from "../types";

const RECRUITER_SESSION_KEY = "recruiter_session_snapshot";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function setRecruiterSessionSnapshot(session: RecruiterSession) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(RECRUITER_SESSION_KEY, JSON.stringify(session));
}

export function getRecruiterSessionSnapshot() {
  if (!canUseStorage()) {
    return null;
  }

  const rawValue = window.localStorage.getItem(RECRUITER_SESSION_KEY);

  if (!rawValue) {
    return null;
  }

  return JSON.parse(rawValue) as RecruiterSession;
}

export function clearRecruiterSessionSnapshot() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(RECRUITER_SESSION_KEY);
}

export function updateRecruiterSessionCompanyCompletion(
  companyProfileCompleted: boolean
) {
  const currentSession = getRecruiterSessionSnapshot();

  if (!currentSession) {
    return;
  }

  setRecruiterSessionSnapshot({
    ...currentSession,
    company_profile_completed: companyProfileCompleted,
  });
}
