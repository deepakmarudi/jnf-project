import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import type { PortalLinkItem } from "../types";
import PortalSectionHeading from "./portal-section-heading";

type PortalLinksCardProps = Readonly<{
  links: PortalLinkItem[];
}>;

export default function PortalLinksCard({ links }: PortalLinksCardProps) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <Box sx={{ p: { xs: 3, md: 4 } }}>
        <Stack spacing={2.5}>
          <PortalSectionHeading
            eyebrow="Important Links"
            title="Essential access points for users of the portal."
          />

          <Stack spacing={1.5}>
            {links.map((link) =>
              link.external ? (
                <Button
                  key={link.title}
                  component="a"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  variant="text"
                  sx={{ justifyContent: "flex-start", px: 0 }}
                >
                  {link.title}
                </Button>
              ) : (
                <Button
                  key={link.title}
                  component={Link}
                  href={link.href}
                  variant="text"
                  sx={{ justifyContent: "flex-start", px: 0 }}
                >
                  {link.title}
                </Button>
              )
            )}
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}
