import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type AuthSidePanelProps = Readonly<{
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
}>;

export default function AuthSidePanel({
  eyebrow,
  title,
  description,
  bullets,
}: AuthSidePanelProps) {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 5,
        background:
          "linear-gradient(160deg, rgba(122,11,20,1) 0%, rgba(90,7,15,1) 100%)",
        color: "primary.contrastText",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Stack spacing={3}>
          <Stack spacing={1.25}>
            <Typography
              variant="overline"
              sx={{ color: "secondary.light", letterSpacing: "0.14em" }}
            >
              {eyebrow}
            </Typography>
            <Typography variant="h3" sx={{ color: "inherit" }}>
              {title}
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.82)" }}>
              {description}
            </Typography>
          </Stack>

          <Stack spacing={1.25}>
            {bullets.map((bullet) => (
              <Box
                key={bullet}
                sx={{
                  px: 2,
                  py: 1.5,
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.08)",
                }}
              >
                <Typography sx={{ color: "inherit" }}>{bullet}</Typography>
              </Box>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
