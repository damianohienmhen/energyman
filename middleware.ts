import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || null;

  // Protect /dashboard route
  if (request.nextUrl.pathname.startsWith("/dashboard") && !token) {
    const loginUrl = new URL("/account", request.url); // redirect to sign-in
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // apply to all /dashboard routes
};
