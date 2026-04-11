export const routes = {
  public: {
    home: "/",
    login: "/login",
    register: "/register",
    recruiterProcedure: "/recruiters/procedure",
    pastRecruiters: "/recruiters/past",
    team: "/team",
    adminLogin: "/admin/login",
  },
  recruiter: {
    dashboard: "/dashboard",
    company: "/company",
    jnfs: "/jnfs",
    newJnf: "/jnfs/new",
    jnfDetail: (id: string | number) => `/jnfs/${id}`,
    jnfPreview: (id: string | number) => `/jnfs/${id}/preview`,
  },
  admin: {
    dashboard: "/admin/dashboard",
    jnfs: "/admin/jnfs",
    jnfDetail: (id: string | number) => `/admin/jnfs/${id}`,
    recruiters: "/admin/recruiters",
    companies: "/admin/companies",
  },
} as const;
