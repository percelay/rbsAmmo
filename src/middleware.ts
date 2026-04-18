import { NextResponse, type NextRequest } from "next/server";

import { copyResponseCookies, updateSession } from "@/lib/supabase-middleware";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith("/admin");

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  const { user, isAdmin, response } = await updateSession(request);
  const isLoginRoute = pathname === "/admin/login";

  if (!user && !isLoginRoute) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("next", pathname);
    return copyResponseCookies(response, NextResponse.redirect(loginUrl));
  }

  if (user && isAdmin && isLoginRoute) {
    const adminUrl = request.nextUrl.clone();
    adminUrl.pathname = "/admin";
    adminUrl.search = "";
    return copyResponseCookies(response, NextResponse.redirect(adminUrl));
  }

  if (user && !isAdmin && !isLoginRoute) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("error", "unauthorized");
    return copyResponseCookies(response, NextResponse.redirect(loginUrl));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
