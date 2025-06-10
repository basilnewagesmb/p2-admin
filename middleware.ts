import { publicRoutes } from "@/routes";

import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { auth as sessionAuth } from "@/auth";
import { authOptions } from "./auth.config";

export const { auth } = NextAuth(authOptions);

export default auth(async (request) => {
  const { nextUrl } = request;
  const isLoggedIn = !!request.auth;
  await sessionAuth();
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const { pathname } = request.nextUrl;
  if (!isLoggedIn && !isPublicRoute) {
    const loginUrl = new URL("/login", request.url);
    // loginUrl.searchParams.set("callbackUrl", pathname); // Optional: redirect after login
    return NextResponse.redirect(loginUrl);
  }
  if (isLoggedIn && pathname === "/") {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }
  return NextResponse.next();
});

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
