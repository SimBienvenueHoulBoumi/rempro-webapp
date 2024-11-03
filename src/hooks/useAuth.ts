import { useState } from "react";
import { AuthDto } from "@/types/authenticate";
import { authenticate, getProfile, logout } from "@/services/authenticate";
import { useRouter } from "next/navigation";

interface User {
  username: string;
  email?: string;
}

interface UseAuthReturn {
  loading: boolean;
  error: string | null;
  login: (auth: AuthDto) => Promise<void | null>;
  register: (auth: AuthDto) => Promise<void | null>;
  profileUser: () => Promise<User | null>;
  logout: () => Promise<void>;
  user: User | null;
}

export function useAuth(): UseAuthReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const handleAuth = async (
    auth: AuthDto,
    type: "login" | "register"
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await authenticate(auth, type);
      await new Promise((resolve) => setTimeout(resolve, 3000));

      router.push("/dashboard/home");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const profileUser = async (): Promise<User | null> => {
    setLoading(true);
    setError(null);

    try {
      const userProfile = await getProfile();
      setUser(userProfile); // Met à jour le state avec le profil utilisateur
      return userProfile;
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

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.push("/login");
  };

  return {
    loading,
    error,
    user,
    login,
    register,
    profileUser,
    logout: handleLogout,
  };
}
