import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type JnfSectionAccordionProps = Readonly<{
  title: string;
  description?: string;
  expanded: boolean;
  completed: boolean;
  canSave: boolean;
  onToggle: (expanded: boolean) => void;
  onSave: () => void;
  children: React.ReactNode;
  showSaveButton?: boolean;
}>;

export default function JnfSectionAccordion({
  title,
  description,
  expanded,
  completed,
  canSave,
  onToggle,
  onSave,
  children,
  showSaveButton = true,
}: JnfSectionAccordionProps) {
  return (
    <Accordion
      expanded={expanded}
      onChange={(_, isExpanded) => onToggle(isExpanded)}
      disableGutters
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: completed ? "success.light" : "divider",
        overflow: "hidden",
        "&::before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              color: "text.secondary",
              minWidth: 20,
              textAlign: "center",
            }}
          >
            {expanded ? "-" : "+"}
          </Typography>
        }
        sx={{
          px: 2.5,
          py: 0.5,
          bgcolor: completed ? "success.50" : "background.paper",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1.5}
          sx={{ width: "100%" }}
        >
          <Stack spacing={0.5}>
            <Typography variant="h6">{title}</Typography>
            {description ? (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {description}
              </Typography>
            ) : null}
          </Stack>

          <Chip
            label={completed ? "Completed" : "Incomplete"}
            color={completed ? "success" : "warning"}
            size="small"
            variant={completed ? "filled" : "outlined"}
          />
        </Stack>
      </AccordionSummary>

      <AccordionDetails sx={{ px: 2.5, py: 2.5 }}>
        <Stack spacing={2.5}>
          {children}

          {showSaveButton ? (
            <>
              <Divider />

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  onClick={onSave}
                  disabled={!canSave}
                >
                  Review Next Section
                </Button>
              </Box>
            </>
          ) : null}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
