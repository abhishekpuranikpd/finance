import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    cookies().delete("session");
    return new NextResponse(JSON.stringify({ msg: "Logged out successfully" }), { status: 200 });
  } catch (error) {
    console.error("Logout error:", error);
    return new NextResponse(JSON.stringify({ msg: "Logout failed" }), { status: 500 });
  }
}
