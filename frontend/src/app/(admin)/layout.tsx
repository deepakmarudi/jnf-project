import Box from "@mui/material/Box";

type AdminLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <Box>{children}</Box>;
}
