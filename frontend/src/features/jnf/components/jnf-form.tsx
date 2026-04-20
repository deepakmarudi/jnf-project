import { useState } from "react";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import type { JnfFieldErrors } from "../lib/jnf-validation";
import {
  jnfSectionOrder,
  type JnfCompletedSections,
  type JnfSectionKey,
} from "../lib/jnf-section-validation";
import type { JnfRecord } from "../types";
import JnfCompanySummaryCard from "./jnf-company-summary-card";
import JnfContactsSection from "./jnf-contacts-section";
import JnfDeclarationSection from "./jnf-declaration-section";
import JnfEligibilitySection from "./jnf-eligibility-section";
import JnfFormGrid from "./jnf-form-grid";
import JnfJobProfileSection from "./jnf-job-profile-section";
import JnfSalarySection from "./jnf-salary-section";
import JnfSectionAccordion from "./jnf-section-accordion";
import JnfSelectionProcessSection from "./jnf-selection-process-section";

type JnfFormProps = Readonly<{
  form: JnfRecord;
  setForm: React.Dispatch<React.SetStateAction<JnfRecord>>;
  fieldErrors: JnfFieldErrors;
  sectionValidity: JnfCompletedSections;
}>;

export default function JnfForm({
  form,
  setForm,
  fieldErrors,
  sectionValidity,
}: JnfFormProps) {
  const [expandedSections, setExpandedSections] = useState<Partial<Record<JnfSectionKey, boolean>>>({
    company_summary: true,
  });
  const [touchedSections, setTouchedSections] = useState<Partial<Record<JnfSectionKey, boolean>>>({});

  function isSectionCompleted(sectionKey: JnfSectionKey) {
    return sectionValidity[sectionKey] === true;
  }

  function handleSectionToggle(sectionKey: JnfSectionKey, isExpanded: boolean) {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: isExpanded,
    }));
  }

  function handleSectionSave(sectionKey: JnfSectionKey) {
    setTouchedSections((current) => ({
      ...current,
      [sectionKey]: true,
    }));

    if (!sectionValidity[sectionKey]) {
      return;
    }

    const currentIndex = jnfSectionOrder.indexOf(sectionKey);
    const nextSection = jnfSectionOrder[currentIndex + 1] ?? false;
    
    setExpandedSections((prev) => {
      const nextState = { ...prev, [sectionKey]: false };
      if (nextSection) {
        nextState[nextSection] = true;
      }
      return nextState;
    });
  }

  const getSectionErrors = (sectionKey: JnfSectionKey) => {
    return (touchedSections[sectionKey] || sectionValidity[sectionKey]) 
      ? fieldErrors 
      : {};
  };

  function renderAdditionalDetails() {
    return (
      <Stack spacing={2.5}>
        <Divider />
        <Typography variant="h6">Additional Details and Documents</Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          These details are optional for now, but can still be added within the
          same Job Profile section.
        </Typography>

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
        </JnfFormGrid>

        <TextField
          label="Application Deadline"
          type="date"
          value={
            form.additional_details.application_deadline
              ? String(form.additional_details.application_deadline).substring(0, 10)
              : ""
          }
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
    );
  }

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <JnfSectionAccordion
          title="Company Summary"
          description="Review the company profile that will be used for this JNF."
          expanded={Boolean(expandedSections.company_summary)}
          completed={isSectionCompleted("company_summary")}
          canSave={sectionValidity.company_summary}
          onToggle={(isExpanded) =>
            handleSectionToggle("company_summary", isExpanded)
          }
          onSave={() => handleSectionSave("company_summary")}
          showSaveButton={false}
        >
          <JnfCompanySummaryCard embedded />
        </JnfSectionAccordion>

      <JnfSectionAccordion
        title="Job Profile"
        description="Fill the role information and optional supporting job details."
        expanded={Boolean(expandedSections.job_profile)}
        completed={isSectionCompleted("job_profile")}
        canSave={sectionValidity.job_profile}
        onToggle={(isExpanded) => handleSectionToggle("job_profile", isExpanded)}
        onSave={() => handleSectionSave("job_profile")}
      >
        <JnfJobProfileSection
          form={form}
          setForm={setForm}
          fieldErrors={getSectionErrors("job_profile") as JnfFieldErrors}
          embedded
        />
        {renderAdditionalDetails()}
      </JnfSectionAccordion>

      <JnfSectionAccordion
        title="Contacts"
        description="Add the Recruiter PoC and HR contact details."
        expanded={Boolean(expandedSections.contacts)}
        completed={isSectionCompleted("contacts")}
        canSave={sectionValidity.contacts}
        onToggle={(isExpanded) => handleSectionToggle("contacts", isExpanded)}
        onSave={() => handleSectionSave("contacts")}
      >
        <JnfContactsSection
          form={form}
          setForm={setForm}
          fieldErrors={getSectionErrors("contacts") as JnfFieldErrors}
          embedded
        />
      </JnfSectionAccordion>

      <JnfSectionAccordion
        title="Eligibility"
        description="Define the programme, degree, branch, CGPA, and backlog rules."
        expanded={Boolean(expandedSections.eligibility)}
        completed={isSectionCompleted("eligibility")}
        canSave={sectionValidity.eligibility}
        onToggle={(isExpanded) => handleSectionToggle("eligibility", isExpanded)}
        onSave={() => handleSectionSave("eligibility")}
      >
        <JnfEligibilitySection
          form={form}
          setForm={setForm}
          fieldErrors={getSectionErrors("eligibility") as JnfFieldErrors}
          embedded
        />
      </JnfSectionAccordion>

      <JnfSectionAccordion
        title="Salary Details"
        description="Set the single salary structure for all eligible candidates."
        expanded={Boolean(expandedSections.salary)}
        completed={isSectionCompleted("salary")}
        canSave={sectionValidity.salary}
        onToggle={(isExpanded) => handleSectionToggle("salary", isExpanded)}
        onSave={() => handleSectionSave("salary")}
      >
        <JnfSalarySection
          form={form}
          setForm={setForm}
          fieldErrors={getSectionErrors("salary") as JnfFieldErrors}
          embedded
        />
      </JnfSectionAccordion>

      <JnfSectionAccordion
        title="Selection Process"
        description="Configure the round-by-round hiring flow."
        expanded={Boolean(expandedSections.selection_process)}
        completed={isSectionCompleted("selection_process")}
        canSave={sectionValidity.selection_process}
        onToggle={(isExpanded) =>
          handleSectionToggle("selection_process", isExpanded)
        }
        onSave={() => handleSectionSave("selection_process")}
      >
        <JnfSelectionProcessSection
          form={form}
          setForm={setForm}
          fieldErrors={getSectionErrors("selection_process") as JnfFieldErrors}
          embedded
        />
      </JnfSectionAccordion>

      <JnfSectionAccordion
        title="Declaration"
        description="Finish the signatory details and required confirmations."
        expanded={Boolean(expandedSections.declaration)}
        completed={isSectionCompleted("declaration")}
        canSave={sectionValidity.declaration}
        onToggle={(isExpanded) => handleSectionToggle("declaration", isExpanded)}
        onSave={() => handleSectionSave("declaration")}
      >
        <JnfDeclarationSection
          form={form}
          setForm={setForm}
          fieldErrors={getSectionErrors("declaration") as JnfFieldErrors}
          embedded
        />
      </JnfSectionAccordion>
    </Stack>
    </Stack>
  );
}
