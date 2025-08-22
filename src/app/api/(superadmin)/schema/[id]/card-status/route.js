import { NextResponse } from "next/server";
import { db } from "../../../../../../lib/db";

export async function GET(req, context) {
  try {
    // ✅ Await params to avoid Next.js warning
    const { id } = await context.params;

    const scheme = await db.scheme.findUnique({
      where: { id },
      include: {
        customers: true, // fetch members with cardNo
      },
    });

    if (!scheme) {
      return NextResponse.json({ error: "Scheme not found" }, { status: 404 });
    }

    const totalMembers = scheme.totalMembers || 0;

const prefix = scheme.cardPrefix
const allCards = Array.from({ length: totalMembers }, (_, i) => {
  const cardNo = `${prefix}${String(i + 1).padStart(3, "0")}`;
  const booked = scheme.customers.some((c) => c.cardNo === cardNo);
  return { cardNo, status: booked ? "BOOKED" : "AVAILABLE" };
});
    console.log(allCards)

    return NextResponse.json(allCards);
  } catch (error) {
    console.error("Error fetching card status:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
