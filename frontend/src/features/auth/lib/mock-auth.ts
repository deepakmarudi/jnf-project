import { routes } from "@/lib/routes";
import type { MockRecruiterAccount, MockRecruiterSession } from "../types";

const RECRUITER_ACCOUNTS_KEY = "mock_recruiter_accounts";
const RECRUITER_SESSION_KEY = "mock_recruiter_session";

type RegisterRecruiterInput = Readonly<{
  name: string;
  email: string;
  password: string;
}>;

type LoginRecruiterInput = Readonly<{
  email: string;
  password: string;
}>;

type RegisterRecruiterResult =
  | {
      ok: true;
      account: MockRecruiterAccount;
      session: MockRecruiterSession;
    }
  | {
      ok: false;
      message: string;
    };

type LoginRecruiterResult =
  | {
      ok: true;
      account: MockRecruiterAccount;
      session: MockRecruiterSession;
    }
  | {
      ok: false;
      message: string;
    };

type RecruiterProtectedAccessResult =
  | {
      allowed: true;
    }
  | {
      allowed: false;
      redirectTo: string;
    };

function canUseStorage() {
  return typeof window !== "undefined";
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function buildRecruiterSession(
  account: MockRecruiterAccount
): MockRecruiterSession {
  return {
    recruiter_id: account.id,
    recruiter_name: account.name,
    recruiter_email: account.email,
    company_profile_completed: account.company_profile_completed,
    is_logged_in: true,
  };
}

function createRecruiterId() {
  return `recruiter_${Date.now()}`;
}

export function getStoredRecruiterAccounts(): MockRecruiterAccount[] {
  if (!canUseStorage()) {
    return [];
  }

  const rawValue = window.localStorage.getItem(RECRUITER_ACCOUNTS_KEY);

  if (!rawValue) {
    return [];
  }

  return JSON.parse(rawValue) as MockRecruiterAccount[];
}

export function saveStoredRecruiterAccounts(
  accounts: MockRecruiterAccount[]
) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(
    RECRUITER_ACCOUNTS_KEY,
    JSON.stringify(accounts)
  );
}

export function findRecruiterByEmail(email: string) {
  const normalizedEmail = normalizeEmail(email);

  return (
    getStoredRecruiterAccounts().find(
      (account) => account.email === normalizedEmail
    ) ?? null
  );
}

export function registerRecruiter(
  input: RegisterRecruiterInput
): RegisterRecruiterResult {
  if (!canUseStorage()) {
    return {
      ok: false,
      message: "Storage is unavailable in this browser session.",
    };
  }

  const normalizedEmail = normalizeEmail(input.email);

  if (findRecruiterByEmail(normalizedEmail)) {
    return {
      ok: false,
      message: "A recruiter account already exists with this email address.",
    };
  }

  const now = new Date().toISOString();

  const nextAccount: MockRecruiterAccount = {
    id: createRecruiterId(),
    name: input.name.trim(),
    email: normalizedEmail,
    password: input.password,
    company_profile_completed: false,
    created_at: now,
    updated_at: now,
  };

  const existingAccounts = getStoredRecruiterAccounts();

  saveStoredRecruiterAccounts([nextAccount, ...existingAccounts]);

  const nextSession = buildRecruiterSession(nextAccount);
  setRecruiterSession(nextSession);

  return {
    ok: true,
    account: nextAccount,
    session: nextSession,
  };
}

export function loginRecruiter(
  input: LoginRecruiterInput
): LoginRecruiterResult {
  if (!canUseStorage()) {
    return {
      ok: false,
      message: "Storage is unavailable in this browser session.",
    };
  }

  const normalizedEmail = normalizeEmail(input.email);
  const recruiterAccount = findRecruiterByEmail(normalizedEmail);

  if (!recruiterAccount) {
    return {
      ok: false,
      message: "No recruiter account exists with this email address.",
    };
  }

  if (recruiterAccount.password !== input.password) {
    return {
      ok: false,
      message: "Incorrect password. Please try again.",
    };
  }

  const nextSession = buildRecruiterSession(recruiterAccount);
  setRecruiterSession(nextSession);

  return {
    ok: true,
    account: recruiterAccount,
    session: nextSession,
  };
}

export function setRecruiterSession(session: MockRecruiterSession) {
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

  return JSON.parse(rawValue) as MockRecruiterSession;
}

export function clearRecruiterSession() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(RECRUITER_SESSION_KEY);
}

export function updateRecruiterCompanyCompletion(
  recruiterId: string,
  companyProfileCompleted: boolean
) {
  const updatedAccounts = getStoredRecruiterAccounts().map((account) =>
    account.id === recruiterId
      ? {
          ...account,
          company_profile_completed: companyProfileCompleted,
          updated_at: new Date().toISOString(),
        }
      : account
  );

  saveStoredRecruiterAccounts(updatedAccounts);

  const currentSession = getRecruiterSession();

  if (currentSession && currentSession.recruiter_id === recruiterId) {
    setRecruiterSession({
      ...currentSession,
      company_profile_completed: companyProfileCompleted,
    });
  }
}

export function getRecruiterLandingPath(
  session: Pick<MockRecruiterSession, "company_profile_completed">
) {
  return session.company_profile_completed
    ? routes.recruiter.dashboard
    : routes.recruiter.company;
}

export function canAccessRecruiterPath(
  pathname: string,
  session: MockRecruiterSession | null
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
  session: MockRecruiterSession | null
) {
  if (!session?.is_logged_in) {
    return null;
  }

  return getRecruiterLandingPath(session);
}
