import { fetchJson } from "@/lib/fetch-json";
import type {
  RecruiterLoginResponse,
  RecruiterMeResponse,
} from "../types";

type SendOtpPayload = {
  recruiter_email: string;
};

type VerifyOtpPayload = {
  recruiter_email: string;
  otp_code: string;
};

import { normalizeRecruiterRegisterCompanyPayload } from "./recruiter-register-mappers";

type RegisterRecruiterPayload = {
  full_name: string;
  designation: string;
  email: string;
  mobile_number: string;
  alternative_mobile: string;
  password: string;
  confirm_password: string;
  company: ReturnType<typeof normalizeRecruiterRegisterCompanyPayload>;
};

type LogoutResponse = {
  logged_out: boolean;
};

export async function sendRecruiterOtp(payload: SendOtpPayload) {
  return fetchJson<{ recruiter_email: string; expires_at?: string }>(
    "/auth/send-otp",
    {
      method: "POST",
      body: payload,
    }
  );
}

export async function verifyRecruiterOtp(payload: VerifyOtpPayload) {
  return fetchJson<{ recruiter_email: string; verified: boolean }>(
    "/auth/verify-otp",
    {
      method: "POST",
      body: payload,
    }
  );
}

export async function registerRecruiter(payload: RegisterRecruiterPayload) {
  return fetchJson<{
    recruiter: {
      id: number;
      full_name: string;
      email: string;
      company_id: number | null;
    };
    company: {
      id: number;
      name: string;
    };
  }>("/auth/register", {
    method: "POST",
    body: payload,
  });
}

export async function loginRecruiter(payload: {
  email: string;
  password: string;
}) {
  return fetchJson<RecruiterLoginResponse>("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export async function getRecruiterMe() {
  return fetchJson<RecruiterMeResponse>("/auth/me", {
    method: "GET",
  });
}

export async function logoutRecruiter() {
  return fetchJson<LogoutResponse>("/auth/logout", {
    method: "POST",
  });
}
