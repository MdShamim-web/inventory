import { NextResponse } from "next/server";
import { apiError, freeApi, TOKEN_COOKIE } from "@/lib/freeapi";

// POST /api/auth/login
// Logs in through FreeAPI and saves the access token in an httpOnly cookie.
// httpOnly = browser JavaScript can't read it, which protects it from XSS.
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await freeApi("/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await response.json();

    if (!response.ok) {
      return apiError(json.message ?? "Login failed", response.status);
    }

    // Send only the user to the browser. The tokens stay on the server.
    const res = NextResponse.json({
      success: true,
      message: json.message,
      data: { user: json.data.user },
    });

    res.cookies.set(TOKEN_COOKIE, json.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day (same as FreeAPI's access token lifetime)
    });

    return res;
  } catch {
    return apiError("Unable to connect to authentication server", 500);
  }
}
