import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    // Protect /admin and /api/experiments (write operations)
    if (path.startsWith("/admin") || (path.startsWith("/api/experiments") && req.method !== "GET")) {
        const token = req.cookies.get("admin_session")?.value;

        if (!token) {
            if (path.startsWith("/api")) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
            return NextResponse.redirect(new URL("/login", req.url));
        }

        try {
            const secret = new TextEncoder().encode(
                process.env.ADMIN_PASSWORD || "fallback-secret"
            );
            await jwtVerify(token, secret);
            return NextResponse.next();
        } catch (error) {
            if (path.startsWith("/api")) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin", "/admin/:path*", "/api/experiments"],
};
