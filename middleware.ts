import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parseCookies, verifySessionToken, SESSION_COOKIE_NAME, JWT_SECRET_DEFAULT } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";
  const pathname = url.pathname;

  // Check if host is admin subdomain
  const isAdminDomain = /^admin\./i.test(host) || host.includes("admin.localhost");

  // Check session cookie for authentication
  const cookieHeader = request.headers.get("cookie");
  const cookies = parseCookies(cookieHeader);
  const sessionToken = cookies[SESSION_COOKIE_NAME];
  const secret = process.env.JWT_SECRET || JWT_SECRET_DEFAULT;
  const session = sessionToken ? await verifySessionToken(sessionToken, secret) : null;
  const isAuthenticated = !!session;

  if (isAdminDomain) {
    // 1. Admin Subdomain Logic
    // API Admin Route Security
    if (pathname.startsWith("/api/admin/") && pathname !== "/api/admin/login") {
      if (!isAuthenticated) {
        return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
      }
      return NextResponse.next();
    }

    // Admin Page Route Security & Rewrite
    if (pathname === "/login" || pathname === "/admin/login") {
      if (isAuthenticated) {
        url.pathname = "/admin/dashboard";
        return NextResponse.redirect(url);
      }
      url.pathname = "/admin/login";
      return NextResponse.rewrite(url);
    }

    // Root path on admin domain rewrites to dashboard or login
    if (pathname === "/") {
      url.pathname = isAuthenticated ? "/admin/dashboard" : "/admin/login";
      return NextResponse.rewrite(url);
    }

    // Protect all other admin pages
    if (!isAuthenticated && pathname.startsWith("/admin/") && pathname !== "/admin/login") {
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }

    // Rewrite admin path if needed
    if (!pathname.startsWith("/admin/") && !pathname.startsWith("/api/")) {
      url.pathname = `/admin${pathname}`;
      return NextResponse.rewrite(url);
    }
  } else {
    // 2. Public Apex/WWW Domain Logic
    // Protect admin API endpoints if called on public domain
    if (pathname.startsWith("/api/admin/") && pathname !== "/api/admin/login") {
      if (!isAuthenticated) {
        return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
