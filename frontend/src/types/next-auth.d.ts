import "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      company_id: string | null;
      company_name: string | null;
      accessToken: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string;
    company_id?: string | null;
    company_name?: string | null;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    company_id?: string | null;
    company_name?: string | null;
    accessToken: string;
  }
}
