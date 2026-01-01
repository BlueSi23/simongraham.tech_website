import { NextResponse } from "next/server";
import { SignJWT } from "jose";

export async function POST(req: Request) {
    try {
        const { password } = await req.json();

        if (password === process.env.ADMIN_PASSWORD) {
            // Create JWT token
            const secret = new TextEncoder().encode(
                process.env.ADMIN_PASSWORD || "fallback-secret"
            );
            const alg = "HS256";

            const token = await new SignJWT({ role: "admin" })
                .setProtectedHeader({ alg })
                .setIssuedAt()
                .setExpirationTime("24h")
                .sign(secret);

            const response = NextResponse.json({ success: true });

            // Set HTTP-only cookie
            response.cookies.set("admin_session", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 24, // 24 hours
            });

            return response;
        }

        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
