import { NextResponse } from "next/server"
import { getPrisma } from "@/lib/prisma"
import { getSessionUserId } from "@/lib/session"

export async function GET() {
  try {
    const userId = await getSessionUserId()
    if (!userId) {
      return NextResponse.json({ user: null })
    }

    const prisma = getPrisma()
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    })

    if (!user) {
      return NextResponse.json({ user: null })
    }

    return NextResponse.json({
      user: {
        ...user,
        createdAt: user.createdAt.toISOString(),
      },
    })
  } catch (e) {
    console.error("me", e)
    return NextResponse.json({ error: "Erro ao carregar sessão." }, { status: 500 })
  }
}
