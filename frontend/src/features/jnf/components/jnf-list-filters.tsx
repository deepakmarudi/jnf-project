import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import type { JnfStatus } from "@/types/status";
import SectionCard from "@/components/ui/section-card";
import type { JnfListFilterValues } from "../types";

type JnfListFiltersProps = Readonly<{
  filters: JnfListFilterValues;
  seasonOptions: string[];
  onChange: (next: JnfListFilterValues) => void;
  onReset: () => void;
}>;

const statusOptions: Array<{ label: string; value: "all" | JnfStatus }> = [
  { label: "All Statuses", value: "all" },
  { label: "Draft", value: "draft" },
  { label: "Submitted", value: "submitted" },
//   { label: "Under Review", value: "under_review" },
  { label: "Changes Requested", value: "changes_requested" },
  { label: "Approved", value: "approved" },
//   { label: "Closed", value: "closed" },
];

export default function JnfListFilters({
  filters,
  seasonOptions,
  onChange,
  onReset,
}: JnfListFiltersProps) {
  const isResetDisabled =
    filters.search === "" &&
    filters.status === "all" &&
    filters.recruitment_season === "all";

  return (
    <SectionCard
      title="Filters"
      description="Narrow the list by status, recruitment season, or role title."
      actions={
        <Button onClick={onReset} disabled={isResetDisabled}>
          Clear Filters
        </Button>
      }
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(3, minmax(0, 1fr))",
          },
          gap: 2,
        }}
      >
        <TextField
          label="Search"
          placeholder="Search by JNF number, title, or designation"
          value={filters.search}
          onChange={(event) =>
            onChange({
              ...filters,
              search: event.target.value,
            })
          }
          fullWidth
        />

        <TextField
          select
          label="Status"
          value={filters.status}
          onChange={(event) =>
            onChange({
              ...filters,
              status: event.target.value as JnfListFilterValues["status"],
            })
          }
          fullWidth
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Recruitment Season"
          value={filters.recruitment_season}
          onChange={(event) =>
            onChange({
              ...filters,
              recruitment_season: event.target.value,
            })
          }
          fullWidth
        >
          <MenuItem value="all">All Seasons</MenuItem>
          {seasonOptions.map((season) => (
            <MenuItem key={season} value={season}>
              {season}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </SectionCard>
  );
}
