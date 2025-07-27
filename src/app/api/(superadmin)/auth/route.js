import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";

export async function GET(request, params) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const apikey = searchParams.get("apikey");

    const password = searchParams.get("password");
    const mobile = searchParams.get("mobile");

    if (!apikey || !mobile || !password || apikey !== "479693736527271") {
      throw new Error("Invalid credentials");
    }

    const user = await db.user.findUniqueOrThrow({
      where: { phone: mobile },
    });

    const passwordMatch = await bcrypt.compare(password, user.password);

    // if password does not match
    if (!passwordMatch) {
      throw new Error("Incorrect password");
    }

    // if mobile does not match
    if (mobile !== user.phone) {
      throw new Error("Incorrect Mobile Number");
    }
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log("user", error);
    return new NextResponse(JSON.stringify({ msg: error.message }), {
      status: 500,
    });
  }
}
