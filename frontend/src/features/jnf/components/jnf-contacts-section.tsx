import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SectionCard from "@/components/ui/section-card";
import type { JnfFieldErrors } from "../lib/jnf-validation";
import { createEmptyJnfContact, type JnfContact, type JnfRecord } from "../types";
import JnfFormGrid from "./jnf-form-grid";

type JnfContactsSectionProps = Readonly<{
  form: JnfRecord;
  setForm: React.Dispatch<React.SetStateAction<JnfRecord>>;
  fieldErrors: JnfFieldErrors;
  embedded?: boolean;
}>;

const contactMethodOptions = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "either", label: "Either" },
] as const;

function createContactRow(role: JnfContact["role"], id: string): JnfContact {
  return {
    ...createEmptyJnfContact(),
    id,
    role,
  };
}

function ensureRequiredContacts(contacts: JnfContact[]) {
  const recruiterPoc =
    contacts.find((contact) => contact.role === "primary_poc") ??
    createContactRow("primary_poc", "primary_poc_contact");

  const hrContact =
    contacts.find((contact) => contact.role === "head_hr") ??
    createContactRow("head_hr", "head_hr_contact");

  return [recruiterPoc, hrContact];
}

export default function JnfContactsSection({
  form,
  setForm,
  fieldErrors,
  embedded = false,
}: JnfContactsSectionProps) {
  const contacts = ensureRequiredContacts(form.contacts);

  function handleUpdateContact(
    role: "primary_poc" | "head_hr",
    field: keyof JnfContact,
    value: string
  ) {
    setForm((current) => {
      const nextContacts = ensureRequiredContacts(current.contacts).map((contact) =>
        contact.role === role
          ? {
              ...contact,
              [field]: value,
            }
          : contact
      );

      return {
        ...current,
        contacts: nextContacts,
      };
    });
  }

  function getContactError(
    role: "primary_poc" | "head_hr",
    field: "full_name" | "email" | "phone"
  ) {
    return fieldErrors[`contacts.${role}.${field}`];
  }

  const content = (
    <Stack spacing={2}>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Both contacts are required before final submission.
      </Typography>

      {contacts.map((contact) => {
        const isRecruiterPoc = contact.role === "primary_poc";
        const role = isRecruiterPoc ? "primary_poc" : "head_hr";

        return (
          <Stack
            key={contact.id}
            spacing={2}
            sx={{
              p: 2,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {isRecruiterPoc ? "Recruiter (PoC)" : "HR Contact"}
            </Typography>

            <JnfFormGrid>
              <TextField
                label="Full Name"
                required
                value={contact.full_name}
                onChange={(event) =>
                  handleUpdateContact(role, "full_name", event.target.value)
                }
                error={Boolean(getContactError(role, "full_name"))}
                helperText={getContactError(role, "full_name")}
                fullWidth
              />

              <TextField
                label="Designation"
                value={contact.designation}
                onChange={(event) =>
                  handleUpdateContact(role, "designation", event.target.value)
                }
                fullWidth
              />

              <TextField
                label="Email"
                type="email"
                required
                value={contact.email}
                onChange={(event) =>
                  handleUpdateContact(role, "email", event.target.value)
                }
                error={Boolean(getContactError(role, "email"))}
                helperText={getContactError(role, "email")}
                fullWidth
              />

              <TextField
                label="Phone"
                required
                value={contact.phone}
                onChange={(event) =>
                  handleUpdateContact(role, "phone", event.target.value)
                }
                error={Boolean(getContactError(role, "phone"))}
                helperText={getContactError(role, "phone")}
                fullWidth
              />

              <TextField
                label="Alternate Phone"
                value={contact.alternate_phone}
                onChange={(event) =>
                  handleUpdateContact(role, "alternate_phone", event.target.value)
                }
                fullWidth
              />

              <TextField
                select
                label="Preferred Contact Method"
                value={contact.preferred_contact_method}
                onChange={(event) =>
                  handleUpdateContact(
                    role,
                    "preferred_contact_method",
                    event.target.value
                  )
                }
                fullWidth
              >
                {contactMethodOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Remarks"
                value={contact.remarks}
                onChange={(event) =>
                  handleUpdateContact(role, "remarks", event.target.value)
                }
                fullWidth
              />
            </JnfFormGrid>
          </Stack>
        );
      })}
    </Stack>
  );

  if (embedded) {
    return content;
  }

  return (
    <SectionCard
      title="Contacts"
      description="Fill the 2 required contacts for this JNF: Recruiter (PoC) and HR."
    >
      {content}
    </SectionCard>
  );
}
