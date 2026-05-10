import { NextResponse } from "next/server"
import { z } from "zod"
import { getPrisma } from "@/lib/prisma"
import { hashPassword, verifyPassword } from "@/lib/password"
import { clearSessionCookie, getSessionUserId } from "@/lib/session"

const patchSchema = z.object({
  name: z.string().trim().min(1).max(120).optional(),
  email: z.string().trim().email().max(255).optional(),
  currentPassword: z.string().min(1).max(128).optional(),
  newPassword: z.string().min(8).max(128).optional(),
})

export async function PATCH(req: Request) {
  try {
    const userId = await getSessionUserId()
    if (!userId) {
      return NextResponse.json({ error: "Não autenticado." }, { status: 401 })
    }

    const json = await req.json()
    const parsed = patchSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ error: "Dados inválidos." }, { status: 400 })
    }

    const { name, email, currentPassword, newPassword } = parsed.data
    if (name === undefined && email === undefined && newPassword === undefined) {
      return NextResponse.json({ error: "Nada para atualizar." }, { status: 400 })
    }

    const prisma = getPrisma()
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 })
    }

    const nextEmail = email !== undefined ? email.toLowerCase() : user.email
    const emailChanging = nextEmail !== user.email
    const passwordChanging = Boolean(newPassword)

    if (emailChanging || passwordChanging) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: "Informe a senha atual para alterar e-mail ou senha." },
          { status: 400 },
        )
      }
      const ok = await verifyPassword(currentPassword, user.passwordHash)
      if (!ok) {
        return NextResponse.json({ error: "Senha atual incorreta." }, { status: 400 })
      }
    }

    if (emailChanging) {
      const taken = await prisma.user.findFirst({
        where: { email: nextEmail, NOT: { id: userId } },
      })
      if (taken) {
        return NextResponse.json({ error: "Este e-mail já está em uso." }, { status: 409 })
      }
    }

    const data: { name?: string; email?: string; passwordHash?: string } = {}
    if (name !== undefined) data.name = name
    if (emailChanging) data.email = nextEmail
    if (passwordChanging && newPassword) {
      data.passwordHash = await hashPassword(newPassword)
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    })

    return NextResponse.json({
      user: {
        ...updated,
        createdAt: updated.createdAt.toISOString(),
      },
    })
  } catch (e) {
    console.error("patch user", e)
    return NextResponse.json({ error: "Erro ao atualizar perfil." }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    const userId = await getSessionUserId()
    if (!userId) {
      return NextResponse.json({ error: "Não autenticado." }, { status: 401 })
    }

    const prisma = getPrisma()
    await prisma.user.delete({ where: { id: userId } })
    await clearSessionCookie()

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("delete user", e)
    return NextResponse.json({ error: "Erro ao excluir conta." }, { status: 500 })
  }
}
