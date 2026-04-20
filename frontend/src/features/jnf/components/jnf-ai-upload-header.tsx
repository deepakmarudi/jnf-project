import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { type JnfRecord, createEmptyJnfSalaryBreakup } from "../types";
import { importJdWithAi, uploadJdPdf } from "../lib/jnf-api";

type JnfAiUploadHeaderProps = Readonly<{
  form: JnfRecord;
  setForm: React.Dispatch<React.SetStateAction<JnfRecord>>;
}>;

export default function JnfAiUploadHeader({ form, setForm }: JnfAiUploadHeaderProps) {
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState("");
  const [parseSuccess, setParseSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleParseJd = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setParseError("");
    setParseSuccess(false);
    setIsParsing(true);

    try {
      // 1. Upload for PDF Path
      const uploadResp = await uploadJdPdf(file);
      const jd_pdf_path = uploadResp.jd_pdf_path;

      // 2. Attempt parsing via AI
      let data = null;
      try {
        data = await importJdWithAi(file);
      } catch (err: any) {
        setParseError(err.message || "File uploaded, but failed to parse AI data.");
      }

      setForm((prev) => {
        const result = { ...prev, jd_pdf_path };
        
        if (data) {
          if (data.job_title) result.job_title = data.job_title;
          if (data.job_designation) result.job_designation = data.job_designation;
          if (data.place_of_posting) result.place_of_posting = data.place_of_posting;
          
          if (data.work_location_mode) {
            result.work_location_mode = data.work_location_mode as JnfRecord["work_location_mode"];
          }
          
          if (data.expected_hires) result.expected_hires = data.expected_hires;
          if (data.minimum_hires) result.minimum_hires = data.minimum_hires;
          if (data.tentative_joining_month) {
            result.tentative_joining_month = data.tentative_joining_month.slice(0, 7); // Ensure YYYY-MM format
          }

          if (data.ctc_annual || data.base_fixed) {
             const row = result.salary_details.salary_rows[0] ? { ...result.salary_details.salary_rows[0] } : createEmptyJnfSalaryBreakup();
             if (data.ctc_annual) row.ctc = data.ctc_annual;
             if (data.base_fixed) row.base_salary = data.base_fixed;
             result.salary_details.salary_rows[0] = row;
          }

          if (data.minimum_cgpa) {
             result.eligibility.minimum_cgpa = data.minimum_cgpa;
          }
        }
        return result;
      });
      
      if (data) {
        setParseSuccess(true);
      }
    } catch (err: any) {
      setParseError(err.message || "Failed to upload or parse PDF.");
    } finally {
      setIsParsing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <Box sx={{ p: 3, border: '1px dashed', borderColor: 'primary.main', borderRadius: 2, bgcolor: 'primary.50' }}>
      <Typography variant="subtitle1" sx={{ mb: 1, color: 'primary.dark', fontWeight: 600 }}>
        ✨ Fast-Track with AI
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        Upload your existing Job Description (JD) PDF. Our AI will instantly analyze the document to auto-fill the form, and attach the official file.
      </Typography>
      
      {parseError && <Alert severity="warning" sx={{ mb: 2 }}>{parseError}</Alert>}
      {parseSuccess && <Alert severity="success" sx={{ mb: 2 }}>Success! Matching form fields have been securely populated.</Alert>}
      
      <input 
        type="file" 
        accept="application/pdf" 
        ref={fileInputRef} 
        style={{ display: "none" }} 
        onChange={handleParseJd} 
      />
      
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => fileInputRef.current?.click()}
          disabled={isParsing}
          startIcon={isParsing ? <CircularProgress size={20} color="inherit" /> : undefined}
        >
          {isParsing ? "Analyzing PDF..." : "Upload JD PDF"}
        </Button>
        
        {form.jd_pdf_path && (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2" color="success.main" fontWeight={500}>
              ✓ Attached: {form.jd_pdf_path.split("/").pop()}
            </Typography>
            <Button 
              size="small" 
              component="a" 
              href={form.jd_pdf_path} 
              target="_blank" 
              rel="noopener noreferrer"
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              View File
            </Button>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
