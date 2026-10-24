import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`https://api.freeapi.app/api/v1/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = (await response.json()).data;

    console.log(data)

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    const responseBody = NextResponse.json({
      success: true,
      user: data.user,
    });

    responseBody.cookies.set("access_token", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: data.expires_in ?? 60 * 60 * 24 * 7, // 7 days
    });

    return responseBody;
  } catch {
    return NextResponse.json(
      {
        message: "Unable to connect to authentication server",
      },
      { status: 500 }
    );
  }
}