"use client";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { routes } from "@/lib/routes";

const menuItems = [
  { text: "Dashboard", icon: "📊", href: routes.admin.dashboard },
  { text: "Recruiters", icon: "👥", href: routes.admin.recruiters },
  { text: "Companies", icon: "🏢", href: routes.admin.companies },
  { text: "JNFs", icon: "📄", href: routes.admin.jnfs },
];

export default function AdminSidebar() {
  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
        background: "#ffffff",
        color: "#374151",
        position: "fixed",
        left: 0,
        top: 0,
        overflowY: "auto",
        borderRight: "1px solid #e5e7eb",
        boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
      }}
    >
      <Box
        sx={{
          p: 3,
          background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
          color: "white",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Admin Panel
        </Typography>
        <Typography variant="body2" sx={{ color: "#bfdbfe", opacity: 0.9 }}>
          IIT (ISM) Dhanbad
        </Typography>
      </Box>
      <List sx={{ px: 1, py: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <Link href={item.href} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemButton
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  "&:hover": {
                    bgcolor: "#f3f4f6",
                    color: "#1e3a8a",
                    transform: "translateX(2px)",
                  },
                  transition: "all 0.2s ease",
                  py: 1.5,
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                  <Typography variant="h6">{item.icon}</Typography>
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    fontSize: "0.95rem",
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mx: 2, my: 1 }} />
      <List sx={{ px: 1 }}>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              borderRadius: 2,
              mx: 1,
              "&:hover": {
                bgcolor: "#fee2e2",
                color: "#dc2626",
                transform: "translateX(2px)",
              },
              transition: "all 0.2s ease",
              py: 1.5,
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
              <Typography variant="h6">🚪</Typography>
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{
                fontWeight: 500,
                fontSize: "0.95rem",
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}