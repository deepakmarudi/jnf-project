import { JnfPreviewPage } from "@/features/jnf";

type JnfPreviewRouteProps = Readonly<{
  params: Promise<{ id: string }>;
}>;

export default async function JnfPreviewRoute({
  params,
}: JnfPreviewRouteProps) {
  const { id } = await params;
  return <JnfPreviewPage id={id} />;
}
