"use server";

import { AuthDto, Token } from "@/types/authenticate";
import { cookies } from "next/headers";

export async function authenticate(
  auth: AuthDto,
  type: "login" | "register"
): Promise<Token> {
  const endpoint = type === "login" ? "/auth/login" : "/auth/register";

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REMPRO_API_URL}${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(auth),
      }
    );

    // Vérification de la réponse
    if (!res.ok) {
      throw new Error(`Failed to ${type}. Please try again.`);
    }

    const token: Token = await res.json();

    const cookieStore = cookies();
    cookieStore.set("token", token.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return token;
  } catch (error) {
    // Gérer l'erreur (log, relancer ou autre)
    console.error("Authentication error:", error);
    throw error; // Relancer l'erreur pour que l'appelant puisse la gérer
  }
}

export async function logout() {
  const cookieStore = cookies();
  cookieStore.delete("token");
}

export async function getProfile() {
  const token = cookies().get("token")?.value;

  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REMPRO_API_URL}/users/info`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch user profile.");
  }

  return await res.json();
}
