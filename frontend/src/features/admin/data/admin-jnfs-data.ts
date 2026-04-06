import type { JnfStatus } from "@/types/status";

export type AdminJnfRecord = {
  id: string;
  company: string;
  recruiter: string;
  jobTitle: string;
  type: "Full-time" | "Internship";
  submittedDate: string;
  status: JnfStatus;
  location: string;
  workMode: "On-site" | "Hybrid" | "Remote";
  description: string;
  cgpa: string;
  courses: string;
  ctc: string;
  base: string;
  test: string;
  interview: string;
  declarationAccepted: boolean;
  session: string;
  reviewHistory: string[];
};

export const adminJnfRecords: AdminJnfRecord[] = [
  {
    id: "JNF-101",
    company: "TCS",
    recruiter: "Rahul Sharma",
    jobTitle: "Software Developer Engineer",
    type: "Full-time",
    submittedDate: "10 Apr 2026",
    status: "submitted",
    location: "Bengaluru",
    workMode: "Hybrid",
    description:
      "Backend and platform engineering role focused on scalable internal systems and campus hiring pipelines.",
    cgpa: "7.0 and above",
    courses: "B.Tech CSE, ECE, EE",
    ctc: "INR 11 LPA",
    base: "INR 8.5 LPA",
    test: "Online aptitude and coding test",
    interview: "Two technical interviews and one HR round",
    declarationAccepted: true,
    session: "2025-26",
    reviewHistory: [
      "Submitted by Rahul Sharma on 10 Apr 2026",
      "Awaiting admin review",
    ],
  },
  {
    id: "JNF-102",
    company: "Infosys",
    recruiter: "Neha Verma",
    jobTitle: "Systems Engineer",
    type: "Full-time",
    submittedDate: "08 Apr 2026",
    status: "under_review",
    location: "Pune",
    workMode: "On-site",
    description:
      "Graduate hiring role for engineering delivery teams working across cloud, enterprise apps, and support operations.",
    cgpa: "6.5 and above",
    courses: "B.Tech All Circuital Branches",
    ctc: "INR 9.2 LPA",
    base: "INR 6.8 LPA",
    test: "Online assessment",
    interview: "Technical plus managerial interview",
    declarationAccepted: true,
    session: "2025-26",
    reviewHistory: [
      "Submitted by Neha Verma on 08 Apr 2026",
      "Marked under review by Admin Ananya on 09 Apr 2026",
    ],
  },
  {
    id: "JNF-103",
    company: "Google",
    recruiter: "Arjun Patel",
    jobTitle: "Software Engineer Intern",
    type: "Internship",
    submittedDate: "05 Apr 2026",
    status: "approved",
    location: "Hyderabad",
    workMode: "Hybrid",
    description:
      "Summer internship for students interested in product engineering, distributed systems, and developer productivity.",
    cgpa: "8.0 and above",
    courses: "B.Tech CSE, M.Tech CSE",
    ctc: "INR 1.2 Lakh per month",
    base: "INR 1.0 Lakh per month",
    test: "Coding assessment",
    interview: "Two technical interviews",
    declarationAccepted: true,
    session: "2025-26",
    reviewHistory: [
      "Submitted by Arjun Patel on 05 Apr 2026",
      "Reviewed by Admin Kavya on 06 Apr 2026",
      "Approved by Admin Kavya on 06 Apr 2026",
    ],
  },
  {
    id: "JNF-104",
    company: "Amazon",
    recruiter: "Sneha Iyer",
    jobTitle: "Business Analyst",
    type: "Full-time",
    submittedDate: "02 Apr 2026",
    status: "rejected",
    location: "Chennai",
    workMode: "On-site",
    description:
      "Analytics and operations role supporting business intelligence, dashboards, and planning workflows.",
    cgpa: "7.0 and above",
    courses: "B.Tech, M.Sc Mathematics, MBA Analytics",
    ctc: "INR 14 LPA",
    base: "INR 10 LPA",
    test: "Analytical assessment",
    interview: "Case discussion and final interview",
    declarationAccepted: true,
    session: "2025-26",
    reviewHistory: [
      "Submitted by Sneha Iyer on 02 Apr 2026",
      "Reviewed by Admin Rohan on 03 Apr 2026",
      "Rejected by Admin Rohan on 03 Apr 2026 due to incomplete salary clarification",
    ],
  },
  {
    id: "JNF-105",
    company: "Microsoft",
    recruiter: "Priya Nair",
    jobTitle: "Product Engineer",
    type: "Full-time",
    submittedDate: "11 Apr 2026",
    status: "changes_requested",
    location: "Noida",
    workMode: "Hybrid",
    description:
      "Product engineering role covering full-stack development, service ownership, and customer-facing platform improvements.",
    cgpa: "7.5 and above",
    courses: "B.Tech CSE, IT, MnC",
    ctc: "INR 18 LPA",
    base: "INR 13 LPA",
    test: "Coding and problem-solving test",
    interview: "Technical rounds and hiring manager round",
    declarationAccepted: true,
    session: "2025-26",
    reviewHistory: [
      "Submitted by Priya Nair on 11 Apr 2026",
      "Changes requested by Admin Mehul on 12 Apr 2026 for selection process clarification",
    ],
  },
];

export function getAdminJnfById(id: string) {
  return adminJnfRecords.find((jnf) => jnf.id === id);
}
