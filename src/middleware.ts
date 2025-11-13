import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/auth/sign-in", "/auth/sign-up"];
const protectedPaths = ["/dashboard"];

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token");
    const { pathname } = request.nextUrl;

    // Redirect authenticated users dari public pages
    if (token && publicPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Redirect unauthenticated users dari protected pages
    if (!token && protectedPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
    ],
};