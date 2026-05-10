import { NextResponse } from "next/server"
import { z } from "zod"
import { getPrisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/password"
import { createSessionToken, setSessionCookie } from "@/lib/session"

const registerSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(128),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const parsed = registerSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ error: "Dados inválidos. Verifique nome, e-mail e senha (mín. 8 caracteres)." }, { status: 400 })
    }

    const { name, email, password } = parsed.data
    const prisma = getPrisma()
    const normalized = email.toLowerCase()

    const existing = await prisma.user.findUnique({ where: { email: normalized } })
    if (existing) {
      return NextResponse.json({ error: "Este e-mail já está cadastrado." }, { status: 409 })
    }

    const passwordHash = await hashPassword(password)
    const user = await prisma.user.create({
      data: {
        name,
        email: normalized,
        passwordHash,
      },
    })

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
    console.error("register", e)
    return NextResponse.json({ error: "Erro ao criar conta." }, { status: 500 })
  }
}
