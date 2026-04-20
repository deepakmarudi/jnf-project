const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error(
    "Missing NEXT_PUBLIC_API_BASE_URL. Set it in frontend/.env.local or frontend/.env.example."
  );
}

export const env = {
  apiBaseUrl,
} as const;
