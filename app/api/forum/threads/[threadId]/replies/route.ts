import { NextResponse } from "next/server"
import { z } from "zod"
import { getPrisma } from "@/lib/prisma"
import { getSessionUserId } from "@/lib/session"

const replySchema = z.object({
  content: z.string().trim().min(2).max(20000),
})

export async function POST(req: Request, ctx: { params: Promise<{ threadId: string }> }) {
  try {
    const userId = await getSessionUserId()
    if (!userId) {
      return NextResponse.json({ error: "Faça login para responder." }, { status: 401 })
    }

    const { threadId } = await ctx.params
    const json = await req.json()
    const parsed = replySchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ error: "Mensagem inválida." }, { status: 400 })
    }

    const prisma = getPrisma()
    const thread = await prisma.forumThread.findUnique({
      where: { id: threadId },
      select: { id: true },
    })

    if (!thread) {
      return NextResponse.json({ error: "Tópico não encontrado." }, { status: 404 })
    }

    const reply = await prisma.forumReply.create({
      data: {
        threadId,
        userId,
        content: parsed.data.content,
      },
      include: { user: { select: { name: true, id: true } } },
    })

    await prisma.forumThread.update({
      where: { id: threadId },
      data: {
        replyCount: { increment: 1 },
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      reply: {
        id: reply.id,
        content: reply.content,
        author: reply.user.name,
        authorId: reply.user.id,
        createdAt: reply.createdAt.toISOString(),
      },
    })
  } catch (e) {
    console.error("POST forum reply", e)
    return NextResponse.json({ error: "Erro ao publicar resposta." }, { status: 500 })
  }
}
