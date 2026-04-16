import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import SectionCard from "@/components/ui/section-card";
import type { JnfFieldErrors } from "../lib/jnf-validation";
import type { JnfRecord } from "../types";
import JnfCompanySummaryCard from "./jnf-company-summary-card";
import JnfContactsSection from "./jnf-contacts-section";
import JnfDeclarationSection from "./jnf-declaration-section";
import JnfEligibilitySection from "./jnf-eligibility-section";
import JnfFormGrid from "./jnf-form-grid";
import JnfJobProfileSection from "./jnf-job-profile-section";
import JnfSalarySection from "./jnf-salary-section";
import JnfSelectionProcessSection from "./jnf-selection-process-section";

type JnfFormProps = Readonly<{
  form: JnfRecord;
  setForm: React.Dispatch<React.SetStateAction<JnfRecord>>;
  fieldErrors: JnfFieldErrors;
}>;

export default function JnfForm({
  form,
  setForm,
  fieldErrors,
}: JnfFormProps) {
  return (
    <Stack spacing={3}>
      <JnfCompanySummaryCard />

      <JnfJobProfileSection
        form={form}
        setForm={setForm}
        fieldErrors={fieldErrors}
      />

      <JnfContactsSection
        form={form}
        setForm={setForm}
        fieldErrors={fieldErrors}
      />

      <JnfEligibilitySection
        form={form}
        setForm={setForm}
        fieldErrors={fieldErrors}
      />

      <JnfSalarySection
        form={form}
        setForm={setForm}
        fieldErrors={fieldErrors}
      />

      <JnfSelectionProcessSection
        form={form}
        setForm={setForm}
        fieldErrors={fieldErrors}
      />

      <SectionCard
        title="Additional Details and Documents"
        description="Add supporting details, onboarding information, and document references."
      >
        <Stack spacing={2.5}>
          <JnfFormGrid>
            <TextField
              label="Bond Details"
              value={form.bond_details}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  bond_details: event.target.value,
                }))
              }
              fullWidth
            />

            <TextField
              label="Registration Link"
              type="url"
              placeholder="https://example.com/apply"
              value={form.registration_link}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  registration_link: event.target.value,
                }))
              }
              fullWidth
            />

            <TextField
              label="Onboarding Procedure"
              value={form.onboarding_procedure}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  onboarding_procedure: event.target.value,
                }))
              }
              multiline
              minRows={3}
              fullWidth
            />

            <TextField
              label="JD PDF Path"
              placeholder="/uploads/jd.pdf"
              value={form.jd_pdf_path}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  jd_pdf_path: event.target.value,
                }))
              }
              fullWidth
            />
          </JnfFormGrid>

          <TextField
            label="Application Deadline"
            type="date"
            value={form.additional_details.application_deadline}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                additional_details: {
                  ...current.additional_details,
                  application_deadline: event.target.value,
                },
              }))
            }
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            label="Required Documents"
            value={form.additional_details.required_documents}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                additional_details: {
                  ...current.additional_details,
                  required_documents: event.target.value,
                },
              }))
            }
            multiline
            minRows={2}
            fullWidth
          />

          <TextField
            label="Additional Instructions for CDC"
            value={form.additional_details.additional_instructions_for_cdc}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                additional_details: {
                  ...current.additional_details,
                  additional_instructions_for_cdc: event.target.value,
                },
              }))
            }
            multiline
            minRows={3}
            fullWidth
          />

          <TextField
            label="Recruiter Remarks"
            value={form.additional_details.recruiter_remarks}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                additional_details: {
                  ...current.additional_details,
                  recruiter_remarks: event.target.value,
                },
              }))
            }
            multiline
            minRows={3}
            fullWidth
          />
        </Stack>
      </SectionCard>

      <JnfDeclarationSection
        form={form}
        setForm={setForm}
        fieldErrors={fieldErrors}
      />
    </Stack>
  );
}
