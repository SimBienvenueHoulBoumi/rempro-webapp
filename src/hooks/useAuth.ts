import { useState } from "react";
import { AuthDto, Token } from "@/types/authenticate";
import { authenticate } from "@/services/authenticate";

interface UseAuthReturn {
  loading: boolean;
  error: string | null;
  login: (auth: AuthDto) => Promise<Token | null>;
  register: (auth: AuthDto) => Promise<Token | null>;
}

export function useAuth(): UseAuthReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (
    auth: AuthDto,
    type: "login" | "register"
  ): Promise<Token | null> => {
    setLoading(true);
    setError(null);

    try {
      const token = await authenticate(auth, type);
      return token;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "An error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const login = (auth: AuthDto) => handleAuth(auth, "login");
  const register = (auth: AuthDto) => handleAuth(auth, "register");

  return { loading, error, login, register };
}
