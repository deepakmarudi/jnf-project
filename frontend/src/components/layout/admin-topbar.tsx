"use client";

import { useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import useAdminSession from "@/features/auth/hooks/use-admin-session";
import { routes } from "@/lib/routes";
import { signOut } from "next-auth/react";

export default function AdminTopbar() {
  const { session } = useAdminSession();
  const adminName = session?.admin_name?.trim() || "CDC Admin";
  const adminEmail = session?.admin_email?.trim() || "admin@iitism.ac.in";

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await signOut({ callbackUrl: routes.public.adminLogin, redirect: true });
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        px: { xs: 2, md: 4 },
        py: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ maxWidth: "1400px", mx: "auto" }}
      >
        <Typography 
          variant="h6" 
          component={Link} 
          href={routes.admin.dashboard}
          sx={{ 
            fontWeight: 700, 
            color: "text.primary",
            textDecoration: "none"
          }}
        >
          CDC Admin Portal
        </Typography>

        <Stack direction="row" spacing={3} alignItems="center">
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, mr: 1 }}>
            <Button 
              component={Link} 
              href={routes.admin.dashboard}
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              Dashboard
            </Button>
            <Button 
              component={Link} 
              href={routes.admin.jnfs}
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              JNF Queue
            </Button>
            <Button 
              component={Link} 
              href={routes.admin.companies}
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              Companies
            </Button>
            <Button 
              component={Link} 
              href={routes.admin.recruiters}
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              Recruiters
            </Button>
          </Box>

          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ p: 0.5 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ bgcolor: "#F59E0B", width: 40, height: 40 }}>
              {adminName.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        </Stack>
      </Stack>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
              mt: 1.5,
              minWidth: 220,
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 20,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {adminName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", wordBreak: "break-all" }}>
            {adminEmail}
          </Typography>
        </Box>
        
        <Divider />
        
        <MenuItem 
          component={Link} 
          href={routes.admin.dashboard} 
          onClick={handleClose}
          sx={{ py: 1.5, display: { xs: 'block', md: 'none' } }}
        >
          Dashboard
        </MenuItem>

        <MenuItem 
          component={Link} 
          href={routes.admin.jnfs} 
          onClick={handleClose}
          sx={{ py: 1.5, display: { xs: 'block', md: 'none' } }}
        >
          JNF Queue
        </MenuItem>

        <MenuItem 
          component={Link} 
          href={routes.admin.companies} 
          onClick={handleClose}
          sx={{ py: 1.5, display: { xs: 'block', md: 'none' } }}
        >
          Companies
        </MenuItem>

        <MenuItem 
          component={Link} 
          href={routes.admin.recruiters} 
          onClick={handleClose}
          sx={{ py: 1.5, display: { xs: 'block', md: 'none' } }}
        >
          Recruiters
        </MenuItem>
        
        <MenuItem 
          onClick={handleLogout}
          sx={{ color: "error.main", py: 1.5, fontWeight: 500 }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
