"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import {
  portalHighlights,
  recruitmentProcessSteps,
} from "./data/home-content";
import PortalAccessDialog from "./components/portal-access-dialog";
import PortalFooter from "./components/portal-footer";
import PortalHighlightsSection from "./components/portal-highlights-section";
import PortalHomeHero from "./components/portal-home-hero";
import PortalProcessSection from "./components/portal-process-section";

export default function PortalHomePage() {
  const [isAccessDialogOpen, setIsAccessDialogOpen] = useState(false);

  const openAccessDialog = () => setIsAccessDialogOpen(true);
  const closeAccessDialog = () => setIsAccessDialogOpen(false);

  return (
    <>
      <Stack spacing={0}>
        <PortalHomeHero onAccessClick={openAccessDialog} />
        
        <Box sx={{ width: "100%", bgcolor: "#f5f7fa" }}>
          <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
            <Stack spacing={{ xs: 5, md: 6 }}>
              <PortalHighlightsSection highlights={portalHighlights} />
              <PortalProcessSection steps={recruitmentProcessSteps} />
            </Stack>
          </Container>
        </Box>

        <PortalFooter />
      </Stack>

      <PortalAccessDialog open={isAccessDialogOpen} onClose={closeAccessDialog} />
    </>
  );
}
