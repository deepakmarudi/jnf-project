import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

type JnfEditorActionsProps = Readonly<{
  saveLabel: string;
  previewLabel: string;
  onSaveDraft: () => void;
  onPreview: () => void;
}>;

export default function JnfEditorActions({
  saveLabel,
  previewLabel,
  onSaveDraft,
  onPreview,
}: JnfEditorActionsProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Stack direction="row" spacing={1.5}>
        <Button variant="outlined" onClick={onSaveDraft}>
          {saveLabel}
        </Button>
        <Button variant="contained" onClick={onPreview}>
          {previewLabel}
        </Button>
      </Stack>
    </Box>
  );
}
