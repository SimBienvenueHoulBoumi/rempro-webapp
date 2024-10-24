"use client";

import { useState } from "react";
import FormInput from "./FormInput";
import { useAuth } from "@/hooks/useAuth";
import { AuthDto } from "@/types/authenticate";
import toast from "react-hot-toast"; // Importer toast
// import { useRouter } from "next/navigation"; // Pour redirection

const LoginForm: React.FC = () => {
  const { loading, login, error } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const authData: AuthDto = {
      username,
      password,
    };

    try {
      await login(authData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("An error occurred during login."); // Toast en cas d'erreur
    }
  };

  return (
    <div className="card w-full bg-white/70 shadow-xl rounded-2xl relative backdrop-blur-md flex flex-col p-6">
      <form className="card-body space-y-5" onSubmit={handleSubmit}>
        {error && <div className="text-red-500">{error}</div>}
        <FormInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormInput
          label="Password"
          type="password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="form-control mt-6">
          <button
            className="btn btn-primary w-full py-3 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
