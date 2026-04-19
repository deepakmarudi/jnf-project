export type RecruiterSession = {
  recruiter_id: number;
  recruiter_name: string;
  recruiter_email: string;
  company_id: number | null;
  company_name: string | null;
  is_logged_in: boolean;
};

export type RecruiterRegisterCompanyValues = {
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

export type RecruiterRegisterFormValues = {
  full_name: string;
  designation: string;
  email: string;
  mobile_number: string;
  alternative_mobile: string;
  otp_code: string;
  otp_verified: boolean;
  password: string;
  confirm_password: string;
  company: RecruiterRegisterCompanyValues;
};

export type RecruiterRegisterFormErrors = {
  full_name?: string;
  designation?: string;
  email?: string;
  mobile_number?: string;
  alternative_mobile?: string;
  otp_code?: string;
  password?: string;
  confirm_password?: string;
  company?: Partial<Record<keyof RecruiterRegisterCompanyValues, string>>;
};

export const initialRecruiterRegisterCompanyValues: RecruiterRegisterCompanyValues = {
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

export const initialRecruiterRegisterFormValues: RecruiterRegisterFormValues = {
  full_name: "",
  designation: "",
  email: "",
  mobile_number: "",
  alternative_mobile: "",
  otp_code: "",
  otp_verified: false,
  password: "",
  confirm_password: "",
  company: initialRecruiterRegisterCompanyValues,
};

export type RecruiterLoginFormValues = {
  email: string;
  password: string;
};

export type RecruiterLoginFormErrors = Partial<
  Record<keyof RecruiterLoginFormValues, string>
>;

export const initialRecruiterLoginFormValues: RecruiterLoginFormValues = {
  email: "",
  password: "",
};

export type RecruiterLoginResponse = {
  recruiter: {
    id: number;
    full_name: string;
    email: string;
    company_id: number | null;
  };
  token: string;
  token_type: "Bearer";
};

export type AdminSession = {
  admin_id: number;
  admin_name: string;
  admin_email: string;
  is_logged_in: boolean;
};

export type RecruiterMeResponse = {
  recruiter: {
    id: number;
    full_name: string;
    email: string;
    company_id: number | null;
    company?: {
      id: number;
      name: string;
      website: string | null;
      postal_address: string | null;
      employee_count: number | null;
      sector: string | null;
      logo_path: string | null;
      category_or_org_type: string | null;
      date_of_establishment: string | null;
      annual_turnover: string | number | null;
      social_media_url: string | null;
      hq_country: string | null;
      hq_city: string | null;
      nature_of_business: string | null;
      description: string | null;
      is_mnc: boolean;
    } | null;
  };
};
