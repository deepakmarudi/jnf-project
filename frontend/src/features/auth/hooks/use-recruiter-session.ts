"use client";

import { useEffect, useState } from "react";
import { getRecruiterSession } from "../lib/mock-auth";
import type { MockRecruiterSession } from "../types";

export default function useRecruiterSession() {
  const [session, setSession] = useState<MockRecruiterSession | null>(null);

  useEffect(() => {
    setSession(getRecruiterSession());
  }, []);

  return session;
}
