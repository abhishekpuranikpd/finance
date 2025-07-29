// src/app/api/(superadmin)/session/route.js
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decrypt } from "@/lib/getsession";

export async function GET() {
  try {
    // ✅ Must await
    const cookieStore = await cookies();
    const encryptedSession = cookieStore.get("session")?.value;

    if (!encryptedSession) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // ✅ Decrypt session cookie
    const sessionData = await decrypt(encryptedSession);

    return NextResponse.json({ user: sessionData }, { status: 200 });
  } catch (error) {
    console.error("Session fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 });
  }
}
