import { AdminJnfDetailPage } from "@/features/admin";

type AdminJnfDetailRouteProps = Readonly<{
  params: Promise<{
    id: string;
  }>;
}>;

export default async function AdminJnfDetailRoute({
  params,
}: AdminJnfDetailRouteProps) {
  const { id } = await params;

  return <AdminJnfDetailPage id={id} />;
}
