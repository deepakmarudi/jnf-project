import Box from "@mui/material/Box";

type RecruiterRegisterFormGridProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RecruiterRegisterFormGrid({
  children,
}: RecruiterRegisterFormGridProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(2, minmax(0, 1fr))",
        },
        gap: 2,
      }}
    >
      {children}
    </Box>
  );
}
