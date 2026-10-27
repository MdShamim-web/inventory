"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type UseApiOptions = {
  method?: HttpMethod;
  // Send the request automatically when the component mounts (handy for GET).
  auto?: boolean;
};

type ApiResult<T> = {
  ok: boolean;
  status: number;
  data: T | null;
  message: string;
};

/**
 * Plain fetch wrapper (no React state).
 * Sends JSON and always resolves to the same result shape, even on errors.
 */
async function request<T>(
  url: string,
  method: HttpMethod,
  body?: unknown
): Promise<ApiResult<T>> {
  try {
    const response = await fetch(url, {
      method,
      headers:
        body !== undefined ? { "Content-Type": "application/json" } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    // Some failures (e.g. a crashed server) don't return JSON.
    const json = await response.json().catch(() => ({}));

    // Every API route responds in FreeAPI's shape: { success, message, data }
    return {
      ok: response.ok,
      status: response.status,
      data: json.data ?? null,
      message: json.message || (response.ok ? "" : "Request failed"),
    };
  } catch {
    // fetch itself failed (no internet, server down, ...)
    return { ok: false, status: 0, data: null, message: "Network error" };
  }
}

/**
 * One hook for every API call in the app.
 *
 * It only calls OUR Next.js routes (/api/...), never FreeAPI directly.
 * Those server routes add the token and forward the request to FreeAPI.
 *
 * Load data when the component mounts:
 *   const { data, loading, error } = useApi<Profile>("/api/backend/ecommerce/profile", { auto: true });
 *
 * Send data on demand (e.g. a form submit):
 *   const { execute, loading, error } = useApi("/api/auth/login", { method: "POST" });
 *   const { ok } = await execute({ username, password });
 */
export function useApi<T = unknown>(
  url: string,
  { method = "GET", auto = false }: UseApiOptions = {}
) {
  const router = useRouter();

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(auto);

  // Saves a finished request into state. Shared by `execute` and the auto-load effect.
  const handleResult = useCallback(
    (result: ApiResult<T>) => {
      // Session missing or expired → go to the login page.
      // Skip auth routes: there 401 just means "wrong username or password".
      if (result.status === 401 && !url.startsWith("/api/auth")) {
        const current = window.location.pathname;
        router.replace(`/login?redirect=${encodeURIComponent(current)}`);
      }

      if (result.ok) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.message);
      }

      setLoading(false);
    },
    [url, router]
  );

  // Call this yourself (e.g. on form submit). Returns the result so you can react to it.
  const execute = useCallback(
    async (body?: unknown) => {
      setLoading(true);
      setError(null);

      const result = await request<T>(url, method, body);
      handleResult(result);

      return result;
    },
    [url, method, handleResult]
  );

  // Auto-load on mount (and again if the url changes).
  useEffect(() => {
    if (!auto) return;

    // If the component unmounts or the url changes before the response arrives,
    // ignore the old response so it can't overwrite newer data.
    let ignore = false;

    request<T>(url, method).then((result) => {
      if (!ignore) handleResult(result);
    });

    return () => {
      ignore = true;
    };
  }, [auto, url, method, handleResult]);

  return { data, error, loading, execute };
}
