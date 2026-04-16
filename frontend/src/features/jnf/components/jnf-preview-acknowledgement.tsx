import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import SectionCard from "@/components/ui/section-card";

type JnfPreviewAcknowledgementProps = Readonly<{
  acknowledged: boolean;
  onAcknowledgedChange: (value: boolean) => void;
  onSubmit: () => void;
}>;

export default function JnfPreviewAcknowledgement({
  acknowledged,
  onAcknowledgedChange,
  onSubmit,
}: JnfPreviewAcknowledgementProps) {
  return (
    <SectionCard
      title="Final Acknowledgement"
      description="Please review the JNF carefully before final submission."
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={acknowledged}
            onChange={(event) => onAcknowledgedChange(event.target.checked)}
          />
        }
        label="I confirm that all filled details are correct."
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={onSubmit} disabled={!acknowledged}>
          Submit JNF
        </Button>
      </Box>
    </SectionCard>
  );
}
