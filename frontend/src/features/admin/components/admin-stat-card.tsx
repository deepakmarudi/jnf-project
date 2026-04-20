import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type AdminStatCardProps = Readonly<{
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  iconColor?: string;
  iconBgColor?: string;
}>;

export default function AdminStatCard({
  label,
  value,
  icon,
  iconColor = "#2563EB",
  iconBgColor = "#EFF6FF",
}: AdminStatCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        transition: "0.2s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        },
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Stack spacing={2} alignItems="flex-start">
          {icon && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: "12px",
                backgroundColor: iconBgColor,
                color: iconColor,
                "& > svg": {
                  fontSize: 24,
                },
              }}
            >
              {icon}
            </Box>
          )}
          <Stack spacing={0.5}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {label}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {value}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

