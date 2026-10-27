import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { freeApi, TOKEN_COOKIE } from "@/lib/freeapi";

// POST /api/auth/logout
// Ends the session on FreeAPI and removes the token cookie.
export async function POST() {
  // If FreeAPI fails here we still log out locally, so ignore errors.
  await freeApi("/users/logout", { method: "POST" }).catch(() => null);

  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE);

  return NextResponse.json({ success: true, message: "Logged out" });
}
