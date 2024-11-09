"use server";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "./types/authenticate";

export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const currentPath = request.nextUrl.pathname;
  const loginPage = "/";

  if (token) {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp < currentTime) {
        cookieStore.set("token", "", {
          path: "/",
          maxAge: -1,
        });

        if (currentPath !== loginPage) {
          return NextResponse.redirect(new URL(loginPage, request.url));
        }
      }

      if (["/login", "/register"].includes(currentPath)) {
        return NextResponse.redirect(new URL("/dashboard/home", request.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Erreur lors du décodage du token :", error);

      if (currentPath !== loginPage) {
        return NextResponse.redirect(new URL(loginPage, request.url));
      }
    }
  } else if (
    currentPath.startsWith("/dashboard") &&
    currentPath !== loginPage
  ) {
    return NextResponse.redirect(new URL(loginPage, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/"],
};
