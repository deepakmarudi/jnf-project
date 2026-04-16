import { JnfEditorPage } from "@/features/jnf";

type JnfDetailRouteProps = Readonly<{
  params: Promise<{ id: string }>;
}>;

export default async function JnfDetailRoute({
  params,
}: JnfDetailRouteProps) {
  const { id } = await params;
  return <JnfEditorPage mode="edit" id={id} />;
}
