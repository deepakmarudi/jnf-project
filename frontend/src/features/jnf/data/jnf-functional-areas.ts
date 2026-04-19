export const jnfFunctionalAreaOptions = [
  "Core Functional Areas",
  "Software Engineering / IT",
  "Data Science / Analytics",
  "Product Management",
  "Marketing",
  "Sales / Business Development",
  "Finance / Accounting",
  "Human Resources (HR)",
  "Operations",
  "Consulting",
  "Research & Development (R&D)",
  "Design (UI/UX)",
] as const;

export type JnfFunctionalArea = (typeof jnfFunctionalAreaOptions)[number] | "Other";
