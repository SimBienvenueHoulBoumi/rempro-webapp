"use server";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  iat: number;
  exp: number;
}

export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const currentPath = request.nextUrl.pathname;

  // Page de login pour éviter une redirection cyclique
  const loginPage = "/";

  // Si un token existe, vérifier sa validité
  if (token) {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Temps actuel en secondes

      // Si le token a expiré, rediriger vers la page de login
      if (decoded.exp < currentTime) {
        cookieStore.set("token", "", {
          path: "/",
          maxAge: -1, // Expire immédiatement
        });

        // Éviter les redirections cycliques si l’utilisateur est déjà sur la page de login
        if (currentPath !== loginPage) {
          return NextResponse.redirect(new URL(loginPage, request.url));
        }
      }

      // Rediriger les utilisateurs connectés qui tentent d'accéder à /login ou /register
      if (["/login", "/register"].includes(currentPath)) {
        return NextResponse.redirect(new URL("/dashboard/home", request.url));
      }

      return NextResponse.next();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      if (currentPath !== loginPage) {
        return NextResponse.redirect(new URL(loginPage, request.url));
      }
    }
  } else {
    // Si l'utilisateur n'est pas connecté et essaie d'accéder à une page protégée
    if (currentPath.startsWith("/dashboard") && currentPath !== loginPage) {
      return NextResponse.redirect(new URL(loginPage, request.url));
    }
  }

  // Laisser passer les pages publiques
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/"],
};
