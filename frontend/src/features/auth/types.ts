export type MockRecruiterAccount = {
  id: string;
  name: string;
  email: string;
  password: string;
  company_profile_completed: boolean;
  created_at: string;
  updated_at: string;
};

export type MockRecruiterSession = {
  recruiter_id: string;
  recruiter_name: string;
  recruiter_email: string;
  company_profile_completed: boolean;
  is_logged_in: boolean;
};

export type RecruiterRegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type RecruiterRegisterFormErrors = Partial<
  Record<keyof RecruiterRegisterFormValues, string>
>;

export const initialRecruiterRegisterFormValues: RecruiterRegisterFormValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
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
