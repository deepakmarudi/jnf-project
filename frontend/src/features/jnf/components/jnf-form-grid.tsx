import Box from "@mui/material/Box";

type JnfFormGridProps = Readonly<{
  children: React.ReactNode;
}>;

export default function JnfFormGrid({ children }: JnfFormGridProps) {
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
