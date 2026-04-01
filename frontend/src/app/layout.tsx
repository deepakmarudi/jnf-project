import type { Metadata } from "next";
import AppProviders from "@/providers/app-providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "JNF Portal",
    template: "%s | JNF Portal",
  },
  description:
    "Job Notification Form portal for recruiter onboarding, company profile management, JNF submission, and admin review.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
