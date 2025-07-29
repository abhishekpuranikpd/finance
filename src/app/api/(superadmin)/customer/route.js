import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, phone, email, address, userId,cardNo,  schemeId } = await req.json();

    if (!name || !phone || !userId || !schemeId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const existing = await db.customer.findUnique({
      where: { phone },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Customer already exists" },
        { status: 409 }
      );
    }

    const customer = await db.customer.create({
      data: {
        name,
        phone,
        email,
        address,
        user: {
          connect: { id: userId },
        },
        scheme: {
          connect: { id: schemeId },
        },
        cardNo,
      },
      include: {
        user: true,
        scheme: true,
      },
    });

    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.error("[CUSTOMER_CREATE_ERROR]", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
