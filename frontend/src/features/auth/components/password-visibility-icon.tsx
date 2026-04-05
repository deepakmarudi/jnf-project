import Box from "@mui/material/Box";

type PasswordVisibilityIconProps = Readonly<{
  visible: boolean;
}>;

export default function PasswordVisibilityIcon({
  visible,
}: PasswordVisibilityIconProps) {
  return visible ? (
    <Box component="span" sx={{ width: 20, height: 20, display: "inline-flex" }}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path
          d="M3 3L21 21"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M10.6 10.7A2 2 0 0 0 13.3 13.4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M9.4 5.2A10.7 10.7 0 0 1 12 4.9c5.1 0 8.7 4.1 9.8 6.1a.9.9 0 0 1 0 .9 15.4 15.4 0 0 1-4.2 4.7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.3 6.3A15.8 15.8 0 0 0 2.2 11a.9.9 0 0 0 0 .9c1.2 2.1 5 6.2 9.8 6.2 1 0 2-.2 2.8-.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  ) : (
    <Box component="span" sx={{ width: 20, height: 20, display: "inline-flex" }}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <path
          d="M2.2 12a.9.9 0 0 1 0-.9C3.4 9 7 4.9 12 4.9S20.6 9 21.8 11.1a.9.9 0 0 1 0 .9C20.6 14 17 18.1 12 18.1S3.4 14 2.2 12Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    </Box>
  );
}
