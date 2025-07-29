import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const schemes = await prisma.scheme.findMany()
    return NextResponse.json(schemes);
  } catch (error) {
    console.error("Error fetching schemes:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
