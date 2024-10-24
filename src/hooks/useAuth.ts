"use client";

import { useState } from "react";
import { AuthDto } from "@/types/authenticate";
import { authenticate } from "@/services/authenticate";
import { useRouter } from "next/navigation"; // Pour la redirection côté client

interface UseAuthReturn {
  loading: boolean;
  error: string | null;
  login: (auth: AuthDto) => Promise<void | null>;
  register: (auth: AuthDto) => Promise<void | null>;
}

export function useAuth(): UseAuthReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAuth = async (
    auth: AuthDto,
    type: "login" | "register"
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await authenticate(auth, type);
      router.push("/dashboard/home");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const login = (auth: AuthDto) => handleAuth(auth, "login");
  const register = (auth: AuthDto) => handleAuth(auth, "register");

  return { loading, error, login, register };
}
