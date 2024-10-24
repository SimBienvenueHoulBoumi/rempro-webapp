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

  // Si un token existe, vérifier sa validité
  if (token) {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Temps actuel en secondes

      // Si le token a expiré, rediriger vers la page d'accueil
      if (decoded.exp < currentTime) {
        cookieStore.set("token", "", {
          path: "/",
          maxAge: -1, // Expire immédiatement
        });
        return NextResponse.redirect(new URL("/", request.url));
      }

      // Si l'utilisateur est connecté et essaie d'accéder à une page de login/register, le rediriger vers /dashboard/home
      if (
        ["/login", "/register", "/"].includes(currentPath) &&
        currentPath !== "/dashboard/home"
      ) {
        return NextResponse.redirect(new URL("/dashboard/home", request.url));
      }

      // Si l'utilisateur est déjà sur /dashboard/home, ne pas rediriger
      if (currentPath === "/dashboard/home") {
        return NextResponse.next();
      }

      return NextResponse.next();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // Si le décodage du token échoue, rediriger vers la page d'accueil
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Si l'utilisateur n'est pas connecté et essaie d'accéder à une page protégée
  if (currentPath.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Si l'utilisateur n'est pas connecté et sur une page publique, ne pas rediriger
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/"],
};
