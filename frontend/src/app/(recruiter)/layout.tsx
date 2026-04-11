import Box from "@mui/material/Box";
import RecruiterShell from "@/components/layout/recruiter-shell";

type RecruiterLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RecruiterLayout({
  children,
}: RecruiterLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <RecruiterShell>{children}</RecruiterShell>
    </Box>
  );
}
