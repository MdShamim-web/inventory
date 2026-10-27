import { NextResponse } from "next/server";
import { apiError, freeApi } from "@/lib/freeapi";

// POST /api/auth/register
// Creates a new account through FreeAPI.
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await freeApi("/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await response.json();

    // Pass FreeAPI's answer (success or error) straight to the browser.
    return NextResponse.json(json, { status: response.status });
  } catch {
    return apiError("Unable to connect to authentication server", 500);
  }
}
