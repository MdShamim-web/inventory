import { NextRequest, NextResponse } from "next/server";
import { apiError, freeApi, TOKEN_COOKIE } from "@/lib/freeapi";

// Generic proxy for logged-in requests:
//   /api/backend/<anything>  →  FreeAPI /<anything>
// Example:
//   GET /api/backend/ecommerce/profile  →  GET {API_BASE_URL}/ecommerce/profile
async function handler(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  // Stop early if the user is not logged in.
  if (!request.cookies.has(TOKEN_COOKIE)) {
    return apiError("Unauthenticated", 401);
  }

  const { path } = await context.params;

  // Rebuild the FreeAPI path and keep the query string (?page=1&limit=10).
  const endpoint =
    "/" + path.map(encodeURIComponent).join("/") + request.nextUrl.search;

  const headers = new Headers();
  const contentType = request.headers.get("content-type");

  if (contentType) {
    headers.set("Content-Type", contentType);
  }

  // GET and HEAD requests can't have a body.
  const hasBody = !["GET", "HEAD"].includes(request.method);

  try {
    const response = await freeApi(endpoint, {
      method: request.method,
      headers,
      body: hasBody ? await request.arrayBuffer() : undefined,
    });

    // Send FreeAPI's response back to the browser unchanged.
    const res = new NextResponse(response.body, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") ?? "application/json",
      },
    });

    // Token expired or invalid → remove the cookie. Otherwise proxy.ts would
    // still think the user is logged in and bounce them away from /login.
    if (response.status === 401) {
      res.cookies.delete(TOKEN_COOKIE);
    }

    return res;
  } catch {
    return apiError("Unable to connect to the API server", 502);
  }
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
