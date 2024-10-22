"use client";

import { useState } from "react";
import FormInput from "./FormInput";
import { useAuth } from "@/hooks/useAuth";
import { AuthDto } from "@/types/authenticate";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"; // Importer toast

const RegisterForm: React.FC = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifiez si les mots de passe correspondent
    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsLoading(true);

    const authData: AuthDto = {
      username: email,
      password,
    };

    try {
      const token = await register(authData);
      if (token) {
        toast.success("Utilisateur enregistré avec succès !");
        // Rediriger vers la page de connexion après un enregistrement réussi
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error("L'inscription a échoué. Veuillez réessayer.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Une erreur est survenue lors de l'inscription.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card w-full bg-white/70 shadow-xl rounded-2xl relative backdrop-blur-md flex flex-col p-6">
      <form className="card-body space-y-5" onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          label="Password"
          type="password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="form-control mt-6">
          <button
            className="btn btn-primary w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
            ) : (
              "Register"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
