export type JnfEditorSectionKey =
  | "job_profile_and_contacts"
  | "eligibility_and_courses"
  | "salary_details"
  | "selection_process"
  | "additional_details_and_documents"
  | "declaration_and_submit";

export type JnfEditorSection = {
  key: JnfEditorSectionKey;
  title: string;
  description: string;
};

export const jnfEditorSections: JnfEditorSection[] = [
  {
    key: "job_profile_and_contacts",
    title: "Job Profile and Contacts",
    description: "Role information, hiring details, JD, and recruiter contact rows.",
  },
  {
    key: "eligibility_and_courses",
    title: "Eligibility and Courses",
    description: "Academic eligibility, CGPA and backlog rules, and course or branch selection.",
  },
  {
    key: "salary_details",
    title: "Salary Details",
    description: "Compensation structure, course-wise salary breakup, and benefits.",
  },
  {
    key: "selection_process",
    title: "Selection Process",
    description: "Campus visit, PPT, round builder, and interview or test flow.",
  },
  {
    key: "additional_details_and_documents",
    title: "Additional Details and Documents",
    description: "Deadlines, policy notes, attachments, and recruiter remarks.",
  },
  {
    key: "declaration_and_submit",
    title: "Declaration and Submit",
    description: "Authorized signatory, confirmations, signature, preview, and final submit.",
  },
];
