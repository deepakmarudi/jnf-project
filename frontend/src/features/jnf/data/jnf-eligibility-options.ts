import type { JnfEligibilityProgramme } from "../types";

export type JnfEligibilityOption = {
  value: string;
  label: string;
};

export const jnfProgrammeOptions: JnfEligibilityOption[] = [
  { value: "ug", label: "Undergraduate (UG)" },
  { value: "pg", label: "Postgraduate (PG)" },
  { value: "both", label: "Both UG and PG" },
];

const allOption: JnfEligibilityOption = { value: "all", label: "All" };

const ugDegreeOptions: JnfEligibilityOption[] = [
  { value: "btech_4_year", label: "B.Tech (4-Year)" },
  { value: "integrated_dual_degrees", label: "Integrated & Dual Degrees" },
  { value: "integrated_bsc_bed", label: "4-year Integrated B.Sc.-B.Ed." },
];

const pgDegreeOptions: JnfEligibilityOption[] = [
  { value: "ma", label: "M.A" },
  { value: "mba", label: "MBA" },
  { value: "msc", label: "M.Sc" },
  { value: "executive_mba", label: "Executive MBA" },
  { value: "executive_mtech", label: "Executive M.Tech" },
  { value: "mtech", label: "M.Tech" },
];

const degreeBranchMap: Record<string, JnfEligibilityOption[]> = {
  btech_4_year: [
    { value: "chemical_engineering", label: "Chemical Engineering" },
    { value: "civil_engineering", label: "Civil Engineering" },
    { value: "computer_science_and_engineering", label: "Computer Science and Engineering" },
    { value: "electrical_engineering", label: "Electrical Engineering" },
    { value: "electronics_communication_engineering", label: "Electronics & Communication Engineering" },
    { value: "engineering_physics", label: "Engineering Physics" },
    { value: "environmental_engineering", label: "Environmental Engineering" },
    { value: "geological_engineering", label: "Geological Engineering" },
    { value: "mathematics_and_computing", label: "Mathematics and Computing" },
    { value: "mineral_metallurgical_engineering", label: "Mineral & Metallurgical Engg." },
    { value: "mechanical_engineering", label: "Mechanical Engineering" },
    { value: "mining_engineering", label: "Mining Engineering" },
    { value: "mining_machinery_engineering", label: "Mining Machinery Engg." },
    { value: "petroleum_engineering", label: "Petroleum Engineering" },
  ],
  integrated_dual_degrees: [
    { value: "integrated_mtech_applied_geology", label: "Integrated M.Tech in Applied Geology" },
    { value: "integrated_mtech_applied_geophysics", label: "Integrated M.Tech in Applied Geophysics" },
    { value: "integrated_mtech_mathematics_computing", label: "Integrated M.Tech in Mathematics & Computing" },
    { value: "integrated_bs_ms_physical_science", label: "5 Years, Integrated BS-MS in Physical Science" },
    { value: "integrated_bs_ms_chemical_science", label: "5 Years, Integrated BS-MS in Chemical Science" },
  ],
  integrated_bsc_bed: [
    { value: "bsc_physics_bed", label: "B.Sc. (Physics) - B.Ed." },
    { value: "bsc_chemistry_bed", label: "B.Sc. (Chemistry) - B.Ed." },
  ],
  ma: [{ value: "digital_humanities", label: "Digital Humanities" }],
  mba: [
    { value: "mba_master_of_business_analytics", label: "MBA (Master of Business Analytics)" },
    { value: "mba_business_analytics", label: "MBA (Business Analytics)" },
  ],
  msc: [
    { value: "msc_chemistry", label: "M.Sc in Chemistry" },
    { value: "msc_mathematics_and_computing", label: "M.Sc in Mathematics and Computing" },
    { value: "msc_physics", label: "M.Sc in Physics" },
    { value: "msc_tech", label: "M.Sc.Tech" },
    { value: "msc_tech_applied_geology", label: "M.Sc.Tech in Applied Geology" },
    { value: "msc_tech_applied_geophysics", label: "M.Sc.Tech in Applied Geophysics" },
  ],
  executive_mba: [{ value: "executive_mba_2_year", label: "2-Year Executive MBA" }],
  executive_mtech: [
    { value: "executive_mtech_cse_ai_ds", label: "Computer Science and Engineering (Artificial Intelligence & Data Science)" },
    { value: "executive_mtech_petroleum", label: "Petroleum Engineering (Petroleum Engineering)" },
    { value: "executive_mtech_mechanical", label: "Mechanical Engineering (Mechanical Engineering)" },
  ],
  mtech: [
    { value: "mtech_applied_geophysics", label: "Applied Geophysics" },
    { value: "mtech_chemical_engineering", label: "Chemical Engineering" },
    { value: "mtech_chemistry_chemical_biology", label: "Chemistry & Chemical Biology" },
    { value: "mtech_civil_engineering", label: "Civil Engineering" },
    { value: "mtech_computer_science_and_engineering", label: "Computer Science and Engineering" },
    { value: "mtech_electrical_engineering", label: "Electrical Engineering" },
    { value: "mtech_electronics_engineering", label: "Electronics Engineering" },
    { value: "mtech_environmental_science_and_engineering", label: "Environmental Science & Engineering" },
    { value: "mtech_fuel_minerals_and_metallurgical_engineering", label: "Fuel Minerals and Metallurgical Engineering" },
    { value: "mtech_management_studies_and_industrial_engineering", label: "Management Studies and Industrial Engineering" },
    { value: "mtech_mathematics_and_computing", label: "Mathematics and Computing" },
    { value: "mtech_mechanical_engineering", label: "Mechanical Engineering" },
    { value: "mtech_mining_engineering", label: "Mining Engineering" },
    { value: "mtech_petroleum_engineering", label: "Petroleum Engineering" },
  ],
};

const allDegreeOptions = [...ugDegreeOptions, ...pgDegreeOptions];

function buildUniqueOptions(options: JnfEligibilityOption[]) {
  const map = new Map<string, JnfEligibilityOption>();

  options.forEach((option) => {
    if (!map.has(option.value)) {
      map.set(option.value, option);
    }
  });

  return Array.from(map.values()).sort((first, second) =>
    first.label.localeCompare(second.label)
  );
}

function getAllowedDegreeOptions(programme: JnfEligibilityProgramme) {
  if (programme === "ug") {
    return ugDegreeOptions;
  }

  if (programme === "pg") {
    return pgDegreeOptions;
  }

  if (programme === "both") {
    return allDegreeOptions;
  }

  return [];
}

export function getDegreeOptionsForProgramme(
  programme: JnfEligibilityProgramme
): JnfEligibilityOption[] {
  const allowed = getAllowedDegreeOptions(programme);

  if (allowed.length === 0) {
    return [];
  }

  return [allOption, ...allowed];
}

export function getBranchOptionsForProgrammeAndDegrees(
  programme: JnfEligibilityProgramme,
  degreeIds: string[]
): JnfEligibilityOption[] {
  const allowedDegrees = getAllowedDegreeOptions(programme);

  if (allowedDegrees.length === 0 || degreeIds.length === 0) {
    return [];
  }

  const selectedDegreeIds = degreeIds.includes("all")
    ? allowedDegrees.map((option) => option.value)
    : degreeIds.filter((degreeId) =>
        allowedDegrees.some((option) => option.value === degreeId)
      );

  const combinedBranches = selectedDegreeIds.flatMap(
    (degreeId) => degreeBranchMap[degreeId] ?? []
  );

  const uniqueBranches = buildUniqueOptions(combinedBranches);

  if (uniqueBranches.length === 0) {
    return [];
  }

  return [allOption, ...uniqueBranches];
}

export function normalizeSelectionWithAll(values: string[]) {
  if (values.includes("all")) {
    return ["all"];
  }

  return values;
}

export function getProgrammeLabel(programme: string) {
  return (
    jnfProgrammeOptions.find((option) => option.value === programme)?.label ??
    programme
  );
}

export function getDegreeLabels(degreeIds: string[]) {
  if (degreeIds.includes("all")) {
    return ["All"];
  }

  return degreeIds.map((degreeId) => {
    return allDegreeOptions.find((option) => option.value === degreeId)?.label ?? degreeId;
  });
}

export function getBranchLabels(
  branchIds: string[],
  programme?: JnfEligibilityProgramme,
  degreeIds?: string[]
) {
  if (branchIds.includes("all")) {
    return ["All"];
  }

  const allBranches = programme && degreeIds
    ? getBranchOptionsForProgrammeAndDegrees(programme, degreeIds).filter(
        (option) => option.value !== "all"
      )
    : buildUniqueOptions(Object.values(degreeBranchMap).flat());

  return branchIds.map((branchId) => {
    return allBranches.find((option) => option.value === branchId)?.label ?? branchId;
  });
}
