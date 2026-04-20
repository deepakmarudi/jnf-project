import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import SectionCard from "@/components/ui/section-card";
import type { JnfFieldErrors } from "../lib/jnf-validation";
import type { JnfRecord } from "../types";
import JnfFormGrid from "./jnf-form-grid";

type JnfDeclarationSectionProps = Readonly<{
  form: JnfRecord;
  setForm: React.Dispatch<React.SetStateAction<JnfRecord>>;
  fieldErrors: JnfFieldErrors;
  embedded?: boolean;
}>;

export default function JnfDeclarationSection({
  form,
  setForm,
  fieldErrors,
  embedded = false,
}: JnfDeclarationSectionProps) {
  const content = (
    <Stack spacing={2.5}>
      <Alert severity="info">
        Final submission is completed from the preview page, but the declaration
        details and confirmations should be completed here first.
      </Alert>

      <JnfFormGrid>
        <TextField
          label="Authorised Signatory Name"
          required
          value={form.declaration.authorised_signatory_name}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              declaration: {
                ...current.declaration,
                authorised_signatory_name: event.target.value,
              },
            }))
          }
          error={Boolean(fieldErrors["declaration.authorised_signatory_name"])}
          helperText={fieldErrors["declaration.authorised_signatory_name"]}
          fullWidth
        />

        <TextField
          label="Authorised Signatory Designation"
          required
          value={form.declaration.authorised_signatory_designation}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              declaration: {
                ...current.declaration,
                authorised_signatory_designation: event.target.value,
              },
            }))
          }
          error={Boolean(fieldErrors["declaration.authorised_signatory_designation"])}
          helperText={fieldErrors["declaration.authorised_signatory_designation"]}
          fullWidth
        />

        <TextField
          label="Authorised Signatory Email"
          type="email"
          value={form.declaration.authorised_signatory_email}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              declaration: {
                ...current.declaration,
                authorised_signatory_email: event.target.value,
              },
            }))
          }
          fullWidth
        />

        <TextField
          label="Authorised Signatory Phone"
          value={form.declaration.authorised_signatory_phone}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              declaration: {
                ...current.declaration,
                authorised_signatory_phone: event.target.value,
              },
            }))
          }
          fullWidth
        />

        <TextField
          label="Declaration Place"
          value={form.declaration.declaration_place}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              declaration: {
                ...current.declaration,
                declaration_place: event.target.value,
              },
            }))
          }
          fullWidth
        />

        <TextField
          label="Declaration Date"
          type="date"
          value={
            form.declaration.declaration_date
              ? String(form.declaration.declaration_date).substring(0, 10)
              : ""
          }
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              declaration: {
                ...current.declaration,
                declaration_date: event.target.value,
              },
            }))
          }
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </JnfFormGrid>

      <Stack spacing={1}>
        <FormControlLabel
          control={
            <Checkbox
              checked={form.declaration.information_confirmed}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  declaration: {
                    ...current.declaration,
                    information_confirmed: event.target.checked,
                  },
                }))
              }
            />
          }
          label="I confirm that the information provided in this JNF is correct."
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={form.declaration.authorization_confirmed}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  declaration: {
                    ...current.declaration,
                    authorization_confirmed: event.target.checked,
                  },
                }))
              }
            />
          }
          label="I am authorised to submit this JNF on behalf of the company."
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={form.declaration.policy_consent_confirmed}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  declaration: {
                    ...current.declaration,
                    policy_consent_confirmed: event.target.checked,
                  },
                }))
              }
            />
          }
          label="I agree to the relevant placement and recruiter submission guidelines."
        />
      </Stack>

      <TextField
        label="Typed Signature"
        required
        placeholder="Type your full name as signature"
        value={form.declaration.typed_signature}
        onChange={(event) =>
          setForm((current) => ({
            ...current,
            declaration: {
              ...current.declaration,
              typed_signature: event.target.value,
            },
          }))
        }
        error={Boolean(fieldErrors["declaration.typed_signature"])}
        helperText={fieldErrors["declaration.typed_signature"]}
        fullWidth
      />
    </Stack>
  );

  if (embedded) {
    return content;
  }

  return (
    <SectionCard
      title="Declaration and Submit Readiness"
      description="Capture the authorised signatory and the required recruiter confirmations."
    >
      {content}
    </SectionCard>
  );
}
