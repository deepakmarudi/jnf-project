"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PageContainer from "@/components/layout/page-container";
import ErrorState from "@/components/ui/error-state";
import LoadingState from "@/components/ui/loading-state";
import SectionCard from "@/components/ui/section-card";
import StatusChip from "@/components/ui/status-chip";
import { getRecruiterSession } from "@/features/auth/lib/mock-auth";
import { getCompanyProfileForRecruiter } from "@/features/company/lib/company-storage";
import type { CompanyProfile } from "@/features/company/types";
import { routes } from "@/lib/routes";
import JnfPreviewAcknowledgement from "./components/jnf-preview-acknowledgement";
import {
  getStoredJnfById,
  setJnfFlashMessage,
  upsertStoredJnf,
} from "./lib/jnf-storage";
import { getJnfMissingRequiredFields } from "./lib/jnf-validation";
import type { JnfRecord } from "./types";
import {
  getBranchLabels,
  getDegreeLabels,
  getProgrammeLabel,
} from "./data/jnf-eligibility-options";

type JnfPreviewPageProps = Readonly<{
  id: string;
}>;

function PreviewGrid({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(2, minmax(0, 1fr))",
        },
        gap: 2,
      }}
    >
      {children}
    </Box>
  );
}

function toHumanLabel(value: string) {
  if (!value.trim()) {
    return "Not provided yet";
  }

  if (value === "yes") {
    return "Yes";
  }

  if (value === "no") {
    return "No";
  }

  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatPreviewValue(value: string | number | boolean | string[] | null) {
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(", ") : "Not provided yet";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (value === null || value === "") {
    return "Not provided yet";
  }

  if (typeof value === "string") {
    return toHumanLabel(value);
  }

  return String(value);
}

function formatDateOnly(value: string) {
  if (!value.trim()) {
    return "Not provided yet";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatDateTime(value: string | null) {
  if (!value) {
    return "Not submitted yet";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatRoundSchedule(value: string) {
  if (!value.trim()) {
    return "Not provided yet";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatMoney(value: number | "" | null, currency: string) {
  if (value === "" || value === null) {
    return "Not provided yet";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function formatContactRole(role: string) {
  if (role === "primary_poc") {
    return "Recruiter (PoC)";
  }

  if (role === "head_hr") {
    return "HR";
  }

  if (role === "secondary_poc") {
    return "Secondary PoC";
  }

  return toHumanLabel(role);
}

function formatCourseApplicability(value: string) {
  if (!value.trim()) {
    return "Not provided yet";
  }

  if (value === "all_courses") {
    return "All selected eligible candidates";
  }

  return toHumanLabel(value);
}

function PreviewField({
  label,
  value,
}: Readonly<{
  label: string;
  value: string | number | boolean | string[] | null;
}>) {
  return (
    <Stack spacing={0.5}>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        {label}
      </Typography>
      <Typography variant="body2">{formatPreviewValue(value)}</Typography>
    </Stack>
  );
}

export default function JnfPreviewPage({ id }: JnfPreviewPageProps) {
  const router = useRouter();

  const [record, setRecord] = useState<JnfRecord | null>(null);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const storedJnf = getStoredJnfById(id);

    if (!storedJnf) {
      setPageError("JNF not found.");
      setIsLoading(false);
      return;
    }

    const session = getRecruiterSession();

    if (session?.recruiter_id) {
      setCompanyProfile(getCompanyProfileForRecruiter(session.recruiter_id));
    }

    setRecord(storedJnf);
    setIsLoading(false);
  }, [id]);

  const missingRequiredFields = useMemo(
    () => (record ? getJnfMissingRequiredFields(record) : []),
    [record]
  );

  function handleFinalSubmit() {
    if (!record || !acknowledged) {
      return;
    }

    if (missingRequiredFields.length > 0) {
      setSubmitError(
        `Complete these required fields before final submission: ${missingRequiredFields.join(", ")}.`
      );
      return;
    }

    const now = new Date().toISOString();

    let nextSubmissionCount = record.submission_count;
    let nextSelfEditUsed = record.self_edit_used;

    if (record.status === "draft" && record.submission_count === 0) {
      nextSubmissionCount = 1;
    } else if (record.status === "draft" && record.submission_count >= 1) {
      nextSubmissionCount = record.submission_count + 1;
      nextSelfEditUsed = true;
    } else if (record.status === "changes_requested") {
      nextSubmissionCount = record.submission_count + 1;
    }

    const nextRecord: JnfRecord = {
      ...record,
      status: "submitted",
      preview_completed: true,
      submission_acknowledged: true,
      self_edit_used: nextSelfEditUsed,
      submission_count: nextSubmissionCount,
      admin_feedback:
        record.status === "changes_requested" ? "" : record.admin_feedback,
      updated_at: now,
      submitted_at: now,
    };

    upsertStoredJnf(nextRecord);

    setJnfFlashMessage({
      message:
        record.status === "changes_requested"
          ? "JNF resubmitted successfully."
          : nextSubmissionCount === 1
            ? "JNF submitted successfully."
            : "JNF resubmitted successfully.",
      severity: "success",
    });

    router.push(routes.recruiter.jnfs);
  }

  if (isLoading) {
    return (
      <PageContainer title="JNF Preview">
        <LoadingState message="Loading preview..." />
      </PageContainer>
    );
  }

  if (pageError || !record) {
    return (
      <PageContainer title="JNF Preview">
        <ErrorState message={pageError || "Unable to load preview."} />
      </PageContainer>
    );
  }

  const canSubmit =
    record.status === "draft" || record.status === "changes_requested";

  return (
    <PageContainer
      title="JNF Preview"
      description="Review the JNF in read-only mode before final submission."
    >
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{record.jnf_number || "Draft JNF"}</Typography>
          <StatusChip status={record.status} />
        </Stack>

        {record.admin_feedback ? (
          <Alert severity={record.status === "rejected" ? "error" : "warning"}>
            {record.admin_feedback}
          </Alert>
        ) : null}

        {canSubmit ? (
          <Alert severity="info">
            Review each section carefully. Final submission is allowed only after acknowledgement and completion of all required fields.
          </Alert>
        ) : (
          <Alert severity="info">
            This JNF is currently read-only. Preview remains available, but editing and submission are locked for this status.
          </Alert>
        )}

        {missingRequiredFields.length > 0 ? (
          <Alert severity="warning">
            Required fields still missing: {missingRequiredFields.join(", ")}.
          </Alert>
        ) : null}

        {submitError ? <Alert severity="error">{submitError}</Alert> : null}

        <SectionCard
          title="Submission Summary"
          description="Current submission state and review information."
        >
          <PreviewGrid>
            <PreviewField label="Submission Count" value={record.submission_count} />
            <PreviewField label="Self Edit Used" value={record.self_edit_used} />
            <PreviewField
              label="Last Submitted At"
              value={formatDateTime(record.submitted_at)}
            />
            <PreviewField label="Preview Completed" value={record.preview_completed} />
          </PreviewGrid>
        </SectionCard>

        <SectionCard
          title="Company Summary"
          description="Current recruiter company profile linked to this JNF."
        >
          {companyProfile ? (
            <PreviewGrid>
              <PreviewField label="Company Name" value={companyProfile.name} />
              <PreviewField label="Website" value={companyProfile.website} />
              <PreviewField label="Sector" value={companyProfile.sector} />
              <PreviewField
                label="Organization Type"
                value={companyProfile.category_or_org_type}
              />
              <PreviewField label="Headquarters City" value={companyProfile.hq_city} />
              <PreviewField
                label="Headquarters Country"
                value={companyProfile.hq_country}
              />
              <PreviewField
                label="Employee Count"
                value={companyProfile.employee_count}
              />
              <PreviewField
                label="Company Description"
                value={companyProfile.description}
              />
            </PreviewGrid>
          ) : (
            <Alert severity="warning">
              Company profile is not available for preview.
            </Alert>
          )}
        </SectionCard>

        <SectionCard
          title="Job Profile"
          description="Main job details entered by the recruiter."
        >
          <PreviewGrid>
            <PreviewField label="Recruitment Season" value={record.recruitment_season} />
            <PreviewField label="Job Title" value={record.job_title} />
            <PreviewField label="Job Designation" value={record.job_designation} />
            <PreviewField
              label="Department / Function"
              value={record.department_or_function}
            />
            <PreviewField label="Role Type" value={record.role_type} />
            <PreviewField label="Work Mode" value={record.work_mode} />
            <PreviewField label="Place of Posting" value={record.place_of_posting} />
            <PreviewField label="Expected Hires" value={record.expected_hires} />
            <PreviewField label="Minimum Hires" value={record.minimum_hires} />
            <PreviewField
              label="Tentative Joining Month"
              value={record.tentative_joining_month}
            />
            <PreviewField label="Required Skills" value={record.required_skills} />
            <PreviewField label="JD PDF Path" value={record.jd_pdf_path} />
          </PreviewGrid>

          <Stack spacing={2} sx={{ mt: 2.5 }}>
            <PreviewField label="Job Description" value={record.job_description_html} />
            <PreviewField
              label="Additional Job Information"
              value={record.additional_job_info}
            />
          </Stack>
        </SectionCard>

        <SectionCard
          title="Contacts"
          description="Recruiter and HR contacts attached to this JNF."
        >
          {record.contacts.length === 0 ? (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              No contacts added yet.
            </Typography>
          ) : (
            <Stack spacing={2}>
              {record.contacts.map((contact, index) => (
                <Box
                  key={contact.id || index}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {formatContactRole(contact.role)}
                    </Typography>

                    <PreviewGrid>
                      <PreviewField label="Full Name" value={contact.full_name} />
                      <PreviewField label="Designation" value={contact.designation} />
                      <PreviewField label="Email" value={contact.email} />
                      <PreviewField label="Phone" value={contact.phone} />
                      <PreviewField
                        label="Alternate Phone"
                        value={contact.alternate_phone}
                      />
                      <PreviewField
                        label="Preferred Contact Method"
                        value={contact.preferred_contact_method}
                      />
                      <PreviewField label="Remarks" value={contact.remarks} />
                    </PreviewGrid>
                  </Stack>
                </Box>
              ))}
            </Stack>
          )}
        </SectionCard>

        <SectionCard
          title="Eligibility and Courses"
          description="Academic eligibility and selection criteria."
        >
          <PreviewGrid>
            <PreviewField
              label="Eligible Batch"
              value={record.eligibility.eligible_batch}
            />
            <PreviewField
              label="Programme"
              value={getProgrammeLabel(record.eligibility.eligible_programme)}
            />
            <PreviewField
              label="Degree"
              value={getDegreeLabels(record.eligibility.eligible_degree_ids)}
            />
            <PreviewField
              label="Branches"
              value={getBranchLabels(
                record.eligibility.eligible_branch_ids,
                record.eligibility.eligible_programme,
                record.eligibility.eligible_degree_ids
              )}
            />
            <PreviewField
              label="Minimum CGPA"
              value={record.eligibility.minimum_cgpa}
            />
            <PreviewField
              label="Minimum Class 10 Percentage"
              value={record.eligibility.minimum_class_10_percentage}
            />
            <PreviewField
              label="Minimum Class 12 Percentage"
              value={record.eligibility.minimum_class_12_percentage}
            />
            <PreviewField
              label="Active Backlogs Allowed"
              value={record.eligibility.active_backlog_allowed}
            />
            {record.eligibility.active_backlog_allowed === "yes" ? (
              <PreviewField
                label="Maximum Total Backlogs"
                value={record.eligibility.max_total_backlogs}
              />
            ) : null}
            <PreviewField
              label="Gap Year Allowed"
              value={record.eligibility.gap_year_allowed}
            />
            <PreviewField
              label="History of Arrears Allowed"
              value={record.eligibility.history_of_arrears_allowed}
            />
            <PreviewField
              label="Eligibility Notes"
              value={record.eligibility.eligibility_notes}
            />
          </PreviewGrid>
        </SectionCard>

        <SectionCard
          title="Salary Details"
          description="Compensation structure for all eligible candidates."
        >
          <PreviewGrid>
            <PreviewField label="Currency" value={record.salary_details.currency} />
            <PreviewField
              label="Salary Structure"
              value="Same for all eligible candidates"
            />
            <PreviewField
              label="Benefits and Perks"
              value={record.salary_details.benefits_and_perks}
            />
          </PreviewGrid>

          {record.salary_details.salary_rows.length === 0 ? (
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 2.5 }}>
              No salary details added yet.
            </Typography>
          ) : (
            <Stack spacing={2} sx={{ mt: 2.5 }}>
              {record.salary_details.salary_rows.map((row, index) => (
                <Box
                  key={row.id || index}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      Common Salary Structure
                    </Typography>

                    <PreviewGrid>
                      <PreviewField
                        label="Applicable Candidates"
                        value={formatCourseApplicability(row.course_id)}
                      />
                      <PreviewField
                        label="CTC"
                        value={formatMoney(row.ctc, record.salary_details.currency)}
                      />
                      <PreviewField
                        label="Gross Salary"
                        value={formatMoney(
                          row.gross_salary,
                          record.salary_details.currency
                        )}
                      />
                      <PreviewField
                        label="Base Salary"
                        value={formatMoney(
                          row.base_salary,
                          record.salary_details.currency
                        )}
                      />
                      <PreviewField
                        label="Variable Pay"
                        value={formatMoney(
                          row.variable_pay,
                          record.salary_details.currency
                        )}
                      />
                      <PreviewField
                        label="Joining Bonus"
                        value={formatMoney(
                          row.joining_bonus,
                          record.salary_details.currency
                        )}
                      />
                      <PreviewField
                        label="Retention Bonus"
                        value={formatMoney(
                          row.retention_bonus,
                          record.salary_details.currency
                        )}
                      />
                      <PreviewField
                        label="Performance Bonus"
                        value={formatMoney(
                          row.performance_bonus,
                          record.salary_details.currency
                        )}
                      />
                      <PreviewField
                        label="ESOPs"
                        value={formatMoney(row.esops, record.salary_details.currency)}
                      />
                      <PreviewField
                        label="Stipend"
                        value={formatMoney(row.stipend, record.salary_details.currency)}
                      />
                      <PreviewField
                        label="Bond Amount"
                        value={formatMoney(
                          row.bond_amount,
                          record.salary_details.currency
                        )}
                      />
                      <PreviewField
                        label="Deductions or Notes"
                        value={row.deductions_or_notes}
                      />
                    </PreviewGrid>
                  </Stack>
                </Box>
              ))}
            </Stack>
          )}
        </SectionCard>

        <SectionCard
          title="Selection Process"
          description="Round-wise recruitment flow."
        >
          {record.selection_process.rounds.length === 0 ? (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              No selection rounds added yet.
            </Typography>
          ) : (
            <Stack spacing={2}>
              {record.selection_process.rounds.map((round, index) => (
                <Box
                  key={round.id || index}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      Round {index + 1}
                    </Typography>

                    <PreviewGrid>
                      <PreviewField label="Round No" value={round.order} />
                      <PreviewField
                        label="Hiring Stage"
                        value={round.round_name}
                      />
                      <PreviewField label="Mode" value={round.mode} />
                      <PreviewField
                        label="Date & Time"
                        value={formatRoundSchedule(round.scheduled_at)}
                      />
                      <PreviewField
                        label="Duration (minutes)"
                        value={round.duration_minutes}
                      />
                    </PreviewGrid>
                  </Stack>
                </Box>
              ))}
            </Stack>
          )}
        </SectionCard>

        <SectionCard
          title="Additional Details and Documents"
          description="Supporting information and document references."
        >
          <PreviewGrid>
            <PreviewField label="Bond Details" value={record.bond_details} />
            <PreviewField
              label="Registration Link"
              value={record.registration_link}
            />
            <PreviewField
              label="Onboarding Procedure"
              value={record.onboarding_procedure}
            />
            <PreviewField label="JD PDF Path" value={record.jd_pdf_path} />
            <PreviewField
              label="Application Deadline"
              value={formatDateOnly(record.additional_details.application_deadline)}
            />
            <PreviewField
              label="Required Documents"
              value={record.additional_details.required_documents}
            />
            <PreviewField
              label="CDC Instructions"
              value={record.additional_details.additional_instructions_for_cdc}
            />
            <PreviewField
              label="Recruiter Remarks"
              value={record.additional_details.recruiter_remarks}
            />
            <PreviewField
              label="Dress Code / Compliance Notes"
              value={record.additional_details.dress_code_or_compliance_notes}
            />
            <PreviewField
              label="Travel / Accommodation Policy"
              value={record.additional_details.travel_or_accommodation_policy}
            />
            <PreviewField
              label="Offer Validity Notes"
              value={record.additional_details.offer_validity_notes}
            />
            <PreviewField
              label="Brochure Path"
              value={record.additional_details.brochure_path}
            />
            <PreviewField
              label="Compensation Attachment Path"
              value={record.additional_details.compensation_attachment_path}
            />
            <PreviewField
              label="Extra Document Paths"
              value={record.additional_details.extra_document_paths}
            />
          </PreviewGrid>
        </SectionCard>

        <SectionCard
          title="Declaration"
          description="Authorized signatory and recruiter confirmations."
        >
          <PreviewGrid>
            <PreviewField
              label="Authorized Signatory Name"
              value={record.declaration.authorized_signatory_name}
            />
            <PreviewField
              label="Authorized Signatory Designation"
              value={record.declaration.authorized_signatory_designation}
            />
            <PreviewField
              label="Authorized Signatory Email"
              value={record.declaration.authorized_signatory_email}
            />
            <PreviewField
              label="Authorized Signatory Phone"
              value={record.declaration.authorized_signatory_phone}
            />
            <PreviewField
              label="Declaration Place"
              value={record.declaration.declaration_place}
            />
            <PreviewField
              label="Declaration Date"
              value={formatDateOnly(record.declaration.declaration_date)}
            />
            <PreviewField
              label="Information Confirmed"
              value={record.declaration.information_confirmed}
            />
            <PreviewField
              label="Authorization Confirmed"
              value={record.declaration.authorization_confirmed}
            />
            <PreviewField
              label="Policy Consent Confirmed"
              value={record.declaration.policy_consent_confirmed}
            />
            <PreviewField
              label="Typed Signature"
              value={record.declaration.typed_signature}
            />
          </PreviewGrid>
        </SectionCard>

        {canSubmit ? (
          <JnfPreviewAcknowledgement
            acknowledged={acknowledged}
            onAcknowledgedChange={setAcknowledged}
            onSubmit={handleFinalSubmit}
          />
        ) : null}
      </Stack>
    </PageContainer>
  );
}
