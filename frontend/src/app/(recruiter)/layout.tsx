import Box from "@mui/material/Box";

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
      {children}
    </Box>
  );
}
