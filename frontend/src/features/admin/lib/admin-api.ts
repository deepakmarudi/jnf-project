import { fetchJson } from "@/lib/fetch-json";

export type AdminJnfOverview = {
  id: string;
  companyName: string;
  recruiterId: string;
  recruiterName: string;
  jobTitle: string;
  roleType: string;
  submittedAt: string;
  status: string;
};

export async function listAdminJnfs() {
  const response = await fetchJson<{ jnfs: Record<string, unknown>[] }>("/admin/jnfs", {
    method: "GET",
  });

  return response.data.jnfs.map((item: Record<string, unknown>): AdminJnfOverview => ({
    id: String(item.id),
    companyName: (item.company as Record<string, string>)?.name || "Unknown Company",
    recruiterId: String(item.created_by),
    recruiterName: (item.creator as Record<string, string>)?.full_name || "Unknown",
    jobTitle: item.job_title as string,
    roleType: (item.role_type as string) || "N/A",
    submittedAt: (item.submitted_at as string) || (item.created_at as string),
    status: item.status as string,
  }));
}
