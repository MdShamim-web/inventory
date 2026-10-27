// Prevents this file from ever being imported into a Client Component
// (it reads cookies and env variables that must stay on the server).
import "server-only";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Name of the httpOnly cookie that stores the FreeAPI access token.
export const TOKEN_COOKIE = "access_token";

// Base URL comes from .env (no NEXT_PUBLIC_ prefix → never sent to the browser).
const API_BASE_URL = process.env.API_BASE_URL;

/**
 * Calls FreeAPI from the server.
 * - Builds the full URL from API_BASE_URL
 * - Attaches the access token from the cookie (if the user is logged in)
 *
 * Returns the raw fetch Response, so each route handler decides what to send back.
 */
export async function freeApi(path: string, init: RequestInit = {}) {
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is missing in .env");
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE)?.value;

  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
    cache: "no-store", // user-specific data should never be cached
  });
}

/**
 * Error response in the same shape FreeAPI uses ({ success, message }),
 * so the frontend can handle every error the same way.
 */
export function apiError(message: string, status: number) {
  return NextResponse.json({ success: false, message }, { status });
}
