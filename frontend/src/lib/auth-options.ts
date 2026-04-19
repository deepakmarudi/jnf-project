import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const defaultApiBaseUrl = "http://127.0.0.1:8000/api";

function buildAuthLoginUrl(role: string) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || defaultApiBaseUrl;

  if (role === "admin") {
    return `${apiBaseUrl}/admin/auth/login`;
  }

  return `${apiBaseUrl}/auth/login`;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const role = credentials.role === "admin" ? "admin" : "recruiter";
        const loginUrl = buildAuthLoginUrl(role);

        try {
          const res = await fetch(loginUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();

          if (res.ok && data?.data?.token) {
            const recruiter = data.data.recruiter;
            const admin = data.data.admin;

            return {
              id: recruiter?.id?.toString() || admin?.id?.toString() || "1",
              name: recruiter?.full_name || admin?.name || "User",
              email: credentials.email,
              role,
              company_id: recruiter?.company_id?.toString() || null,
              company_name: recruiter?.company?.name || null,
              accessToken: data.data.token,
            };
          }

          throw new Error(data?.message || "Invalid credentials provided");
        } catch (error: unknown) {
          const errMsg = error instanceof Error ? error.message : "Failed to authenticate";
          throw new Error(errMsg);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.company_id = user.company_id;
        token.company_name = user.company_name;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
          company_id: (token.company_id as string) || null,
          company_name: (token.company_name as string) || null,
          accessToken: token.accessToken as string,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "default_local_secret_for_development",
};
