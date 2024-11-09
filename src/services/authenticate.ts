"use server";

import { AuthDto, Token } from "@/types/authenticate";
import { cookies } from "next/headers";

export async function authenticate(
  auth: AuthDto,
  type: "login" | "register"
): Promise<void> {
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

    if (!res.ok) {
      throw new Error("Authentication failed");
    }

    const token_value = (await res.json()) as Token;

    const cookieStore = cookies();
    cookieStore.set("token", token_value.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
}

export async function logout() {
  cookies().delete("token");
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
