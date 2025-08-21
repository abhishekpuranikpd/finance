import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { encrypt } from "../../../../lib/getsession";

export async function POST(request, params) {
  try {
    const { email, password, mobile } = await request.json();
    const host = request.headers.get("host");
    let apiUrl = process.env.NEXT_PUBLIC_APP_URL;

    const resp = await fetch(
      `${apiUrl}/api/auth/?apikey=479693736527271&password=${password}&mobile=${mobile}`
    );

    if (!resp.ok) {
      const errorData = await resp.json(); // Capture the error response
      return new NextResponse(
        JSON.stringify({ msg: errorData.msg || "Failed to login an account" }),
        {
          status: resp.status, // Return the actual error status from API
        }
      );
    }

    const data = await resp.json();

    if (!data || !data.id) {
      throw new Error("Invalid response structure");
    }

    const payload = {
      password: data.password,
      mobile: data.phone,
    };

    // Create session
    const session = await encrypt({ ...payload });

    // Save session in a cookie
    cookies().set("session", session, { httpOnly: true });

    return new NextResponse(JSON.stringify({ msg: "Login Successfully!!" }));
  } catch (error) {
    console.error("Login error:", error);

    let errorMessage = "Something went wrong";

    // Handle different error types properly
    if (error instanceof SyntaxError) {
      errorMessage = "Invalid response from server";
    } else if (error.message) {
      errorMessage = error.message;
    }

    return new NextResponse(JSON.stringify({ msg: errorMessage }), {
      status: 500,
    });
  }
}
