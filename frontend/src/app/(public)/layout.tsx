import Box from "@mui/material/Box";
import PublicHeader from "@/components/layout/public-header";

type PublicLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <PublicHeader />
      {children}
    </Box>
  );
}
