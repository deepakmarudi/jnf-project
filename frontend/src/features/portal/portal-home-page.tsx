"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import PublicHeader from "@/components/layout/public-header";
import {
  portalContact,
  portalHighlights,
  portalLinks,
  recruitmentProcessSteps,
} from "./data/home-content";
import PortalAccessDialog from "./components/portal-access-dialog";
import PortalContactCard from "./components/portal-contact-card";
import PortalFooter from "./components/portal-footer";
import PortalHighlightsSection from "./components/portal-highlights-section";
import PortalHomeHero from "./components/portal-home-hero";
import PortalLinksCard from "./components/portal-links-card";
import PortalProcessSection from "./components/portal-process-section";

export default function PortalHomePage() {
  const [isAccessDialogOpen, setIsAccessDialogOpen] = useState(false);

  const openAccessDialog = () => setIsAccessDialogOpen(true);
  const closeAccessDialog = () => setIsAccessDialogOpen(false);

  return (
    <>
      <PublicHeader onAccessClick={openAccessDialog} />

      <Stack spacing={{ xs: 5, md: 6 }}>
        <PortalHomeHero onAccessClick={openAccessDialog} />
        <PortalHighlightsSection highlights={portalHighlights} />
        <PortalProcessSection steps={recruitmentProcessSteps} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) 360px" },
            gap: 3,
            alignItems: "stretch",
          }}
        >
          <PortalLinksCard links={portalLinks} />
          <PortalContactCard contact={portalContact} />
        </Box>

        <PortalFooter />
      </Stack>

      <PortalAccessDialog open={isAccessDialogOpen} onClose={closeAccessDialog} />
    </>
  );
}
