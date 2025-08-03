

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, description, monthlyAmount, totalMonths, totalMembers, cardPrefix } = body

    const scheme = await db.scheme.create({
      data: {
        name,
        description,
        monthlyAmount,
        totalMonths,
        totalMembers,
        cardPrefix,
      },
    })

    return NextResponse.json(scheme)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error creating scheme' }, { status: 500 })
  }
}
