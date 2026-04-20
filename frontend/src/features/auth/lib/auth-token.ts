const RECRUITER_AUTH_TOKEN_KEY = "recruiter_auth_token";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function getAuthToken() {
  if (!canUseStorage()) {
    return null;
  }

  return window.localStorage.getItem(RECRUITER_AUTH_TOKEN_KEY);
}

export function setAuthToken(token: string) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(RECRUITER_AUTH_TOKEN_KEY, token);
}

export function clearAuthToken() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(RECRUITER_AUTH_TOKEN_KEY);
}
