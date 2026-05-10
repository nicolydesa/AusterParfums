import { NextResponse } from "next/server"
import { z } from "zod"
import { getPrisma } from "@/lib/prisma"
import { verifyPassword } from "@/lib/password"
import { createSessionToken, setSessionCookie } from "@/lib/session"

const loginSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(1).max(128),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const parsed = loginSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ error: "E-mail ou senha inválidos." }, { status: 400 })
    }

    const { email, password } = parsed.data
    const prisma = getPrisma()
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json({ error: "E-mail ou senha inválidos." }, { status: 401 })
    }

    const token = await createSessionToken(user.id)
    await setSessionCookie(token)

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt.toISOString(),
      },
    })
  } catch (e) {
    console.error("login", e)
    return NextResponse.json({ error: "Erro ao entrar." }, { status: 500 })
  }
}
