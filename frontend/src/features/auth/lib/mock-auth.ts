import { routes } from "@/lib/routes";
import { clearAuthToken } from "./auth-token";
import type { RecruiterSession } from "../types";

const RECRUITER_SESSION_KEY = "recruiter_session_snapshot";

type RecruiterProtectedAccessResult =
  | {
      allowed: true;
    }
  | {
      allowed: false;
      redirectTo: string;
    };

type RegisterRecruiterInput = Readonly<{
  name: string;
  email: string;
  password: string;
}>;

type LoginRecruiterInput = Readonly<{
  email: string;
  password: string;
}>;

type LegacyAuthResult =
  | {
      ok: true;
      session: RecruiterSession;
    }
  | {
      ok: false;
      message: string;
    };

function canUseStorage() {
  return typeof window !== "undefined";
}

export function setRecruiterSession(session: RecruiterSession) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(
    RECRUITER_SESSION_KEY,
    JSON.stringify(session)
  );
}

export function getRecruiterSession() {
  if (!canUseStorage()) {
    return null;
  }

  const rawValue = window.localStorage.getItem(RECRUITER_SESSION_KEY);

  if (!rawValue) {
    return null;
  }

  return JSON.parse(rawValue) as RecruiterSession;
}

export function clearRecruiterSession() {
  if (!canUseStorage()) {
    return;
  }

  clearAuthToken();
  window.localStorage.removeItem(RECRUITER_SESSION_KEY);
}

export function updateRecruiterCompanyCompletion(
  recruiterId: number,
  companyProfileCompleted: boolean
) {
  const currentSession = getRecruiterSession();

  if (!currentSession || currentSession.recruiter_id !== recruiterId) {
    return;
  }

  setRecruiterSession({
    ...currentSession,
    company_profile_completed: companyProfileCompleted,
  });
}

export function getRecruiterLandingPath(
  session: Pick<RecruiterSession, "company_profile_completed">
) {
  return session.company_profile_completed
    ? routes.recruiter.dashboard
    : routes.recruiter.company;
}

export function canAccessRecruiterPath(
  pathname: string,
  session: RecruiterSession | null
): RecruiterProtectedAccessResult {
  if (!session?.is_logged_in) {
    return {
      allowed: false,
      redirectTo: routes.public.login,
    };
  }

  if (
    !session.company_profile_completed &&
    pathname !== routes.recruiter.company
  ) {
    return {
      allowed: false,
      redirectTo: routes.recruiter.company,
    };
  }

  return { allowed: true };
}

export function shouldRedirectRecruiterFromPublicAuth(
  session: RecruiterSession | null
) {
  if (!session?.is_logged_in) {
    return null;
  }

  return getRecruiterLandingPath(session);
}

/*
  Temporary compatibility exports so older files still compile
  while we migrate them to the real backend auth flow.
*/
export function registerRecruiter(): LegacyAuthResult {
  return {
    ok: false,
    message:
      "Recruiter registration is being migrated to the backend OTP flow. Update the register form to use auth-api.ts.",
  };
}

export function loginRecruiter(): LegacyAuthResult {
  return {
    ok: false,
    message:
      "Recruiter login now uses the backend auth API. Update callers to use auth-api.ts.",
  };
}
