import { routes } from "@/lib/routes";
import type {
  PortalContactDetails,
  PortalHighlight,
  PortalLinkItem,
  PortalProcessStep,
} from "../types";

export const instituteWebsiteUrl = "https://www.iitism.ac.in/";

export const portalHighlights: PortalHighlight[] = [
  {
    title: "Strong academic foundation",
    description:
      "Students are trained across engineering, earth sciences, computing, analytics, and interdisciplinary domains.",
  },
  {
    title: "Professional readiness",
    description:
      "Project exposure, technical adaptability, and a practical mindset help students contribute effectively in different roles.",
  },
  {
    title: "Structured hiring communication",
    description:
      "The portal provides a clear and reliable process for registration, JNF submission, and review coordination.",
  },
];

export const recruitmentProcessSteps: PortalProcessStep[] = [
  {
    step: "01",
    title: "Register",
    description: "Create recruiter access through the portal.",
  },
  {
    step: "02",
    title: "Complete Company Profile",
    description: "Provide organization and contact details.",
  },
  {
    step: "03",
    title: "Submit JNF",
    description: "Share role, eligibility, and compensation details.",
  },
  {
    step: "04",
    title: "Admin Review",
    description: "The placement office reviews and follows up.",
  },
];

export const portalLinks: PortalLinkItem[] = [
  {
    title: "Institute Website",
    href: instituteWebsiteUrl,
    external: true,
  },
  {
    title: "Recruiter Login",
    href: routes.public.login,
    external: false,
  },
  {
    title: "Recruiter Registration",
    href: routes.public.register,
    external: false,
  },
  {
    title: "Admin Login",
    href: routes.public.adminLogin,
    external: false,
  },
];

export const portalContact: PortalContactDetails = {
  title: "Placement Office",
  description:
    "For recruiter coordination and JNF-related communication, placement office contact details can be shared here.",
  organization: "IIT (ISM) Dhanbad",
  website: instituteWebsiteUrl,
};

export const portalFooterCopy = {
  productName: "IIT (ISM) Dhanbad JNF Portal",
  organizationName:
    "Indian Institute of Technology (Indian School of Mines) Dhanbad",
} as const;
