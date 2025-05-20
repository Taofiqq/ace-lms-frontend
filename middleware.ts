// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // More verbose debugging
  const token = request.cookies.get("token")?.value;
  console.log("URL:", request.nextUrl.pathname);
  console.log("Token exists:", !!token);

  // Check if the path is public
  const isPublicPath =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup" ||
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/api");

  if (isPublicPath) {
    return NextResponse.next();
  }

  // For all other paths, redirect if no token
  if (!token) {
    console.log("Redirecting to login...");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Apply middleware to ALL routes, with explicit exceptions
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
