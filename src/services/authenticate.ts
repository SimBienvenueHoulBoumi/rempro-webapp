"use server";

import { AuthDto, Token } from "@/types/authenticate";

export async function authenticate(auth: AuthDto, type: "login" | "register"): Promise<Token> {
  const endpoint = type === "login" ? "/auth/login" : "/auth/register";

  const res = await fetch(`${process.env.NEXT_PUBLIC_REMPRO_API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(auth),
  });

  if (!res.ok) {
    throw new Error(`Failed to ${type}. Please try again.`);
  }

  return res.json();
}

