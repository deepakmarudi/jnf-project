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

function createContactRow(contact_type: JnfContact["contact_type"], id: string): JnfContact {
  return {
    ...createEmptyJnfContact(),
    id,
    contact_type,
  };
}

function ensureRequiredContacts(contacts: JnfContact[]) {
  const recruiterPoc =
    contacts.find((contact) => contact.contact_type === "primary_poc") ??
    createContactRow("primary_poc", "primary_poc_contact");

  const hrContact =
    contacts.find((contact) => contact.contact_type === "head_hr") ??
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
    contact_type: "primary_poc" | "head_hr",
    field: keyof JnfContact,
    value: string
  ) {
    setForm((current) => {
      const nextContacts = ensureRequiredContacts(current.contacts).map((contact) =>
        contact.contact_type === contact_type
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
    contact_type: "primary_poc" | "head_hr",
    field: "full_name" | "email" | "mobile_number"
  ) {
    const errorKey = `contacts.${contact_type}.${field}`;
    return fieldErrors[errorKey as keyof typeof fieldErrors];
  }

  const content = (
    <Stack spacing={2}>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Both contacts are required before final submission.
      </Typography>

      {contacts.map((contact) => {
        const isRecruiterPoc = contact.contact_type === "primary_poc";
        const contact_type = isRecruiterPoc ? "primary_poc" : "head_hr";

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
                  handleUpdateContact(contact_type, "full_name", event.target.value)
                }
                error={Boolean(getContactError(contact_type, "full_name"))}
                helperText={getContactError(contact_type, "full_name")}
                fullWidth
              />

              <TextField
                label="Designation"
                value={contact.designation}
                onChange={(event) =>
                  handleUpdateContact(contact_type, "designation", event.target.value)
                }
                fullWidth
              />

              <TextField
                label="Email"
                type="email"
                required
                value={contact.email}
                onChange={(event) =>
                  handleUpdateContact(contact_type, "email", event.target.value)
                }
                error={Boolean(getContactError(contact_type, "email"))}
                helperText={getContactError(contact_type, "email")}
                fullWidth
              />

              <TextField
                label="Mobile Number"
                required
                value={contact.mobile_number}
                onChange={(event) =>
                  handleUpdateContact(contact_type, "mobile_number", event.target.value)
                }
                error={Boolean(getContactError(contact_type, "mobile_number"))}
                helperText={getContactError(contact_type, "mobile_number")}
                fullWidth
              />

              <TextField
                label="Landline / Alternate"
                value={contact.landline}
                onChange={(event) =>
                  handleUpdateContact(contact_type, "landline", event.target.value)
                }
                fullWidth
              />

              <TextField
                select
                label="Preferred Contact Method"
                value={contact.preferred_contact_method}
                onChange={(event) =>
                  handleUpdateContact(
                    contact_type,
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
                  handleUpdateContact(contact_type, "remarks", event.target.value)
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
